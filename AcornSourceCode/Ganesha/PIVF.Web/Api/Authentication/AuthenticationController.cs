﻿using DataBaseConfiguration;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using PIVF.BusinessLayer.UserBL;
using PIVF.DataAccessLayer.Security;
using PIVF.Entities.Models.Login;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Configuration;
//using PIVF.Service;
//using PIVF.Service.Master.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using System.Web.Script.Serialization;

namespace PIVF.Web.Api.Authentication
{
    // [RoutePrefix("api/Account")]
    public class AuthenticationController : ApiController
    {


        private AuthRepository _repo = null;

        UserServiceBAL Srv;

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        public AuthenticationController(UserServiceBAL _Srv)
        {
            _repo = new AuthRepository();
            Srv = _Srv;
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(string[] user)
        {
            string un = user[0];
            string pwd = user[1];
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repo.RegisterUser(un, pwd);
            IHttpActionResult errorResult = GetErrorResult(result);
            if (errorResult != null)
            {
                foreach (string error in result.Errors)
                {
                    if (error == "Name " + un + " is already taken.")
                    {
                        return BadRequest("3");
                    }
                }

            }


            //if (!string.IsNullOrWhiteSpace(userModel.Email) && result.Succeeded == true)
            //{
            //    SendEmail(userModel);
            //}

            return Ok();

        }

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            string redirectUri = string.Empty;

            if (error != null)
            {
                return BadRequest(Uri.EscapeDataString(error));
            }

            if (!User.Identity.IsAuthenticated)
            {
                return new ChallengeResult(provider, this);
            }

            var redirectUriValidationResult = ValidateClientAndRedirectUri(this.Request, ref redirectUri);

            if (!string.IsNullOrWhiteSpace(redirectUriValidationResult))
            {
                return BadRequest(redirectUriValidationResult);
            }

            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                return new ChallengeResult(provider, this);
            }

            IdentityUser user = await _repo.FindAsync(new UserLoginInfo(externalLogin.LoginProvider, externalLogin.ProviderKey));

            bool hasRegistered = user != null;

            redirectUri = string.Format("{0}#external_access_token={1}&provider={2}&haslocalaccount={3}&external_user_name={4}",
                                            redirectUri,
                                            externalLogin.ExternalAccessToken,
                                            externalLogin.LoginProvider,
                                            hasRegistered.ToString(),
                                            externalLogin.UserName);

            return Redirect(redirectUri);

        }

        // POST api/Account/RegisterExternal
        [AllowAnonymous]
        [Route("RegisterExternal")]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var verifiedAccessToken = await VerifyExternalAccessToken(model.Provider, model.ExternalAccessToken);
            if (verifiedAccessToken == null)
            {
                return BadRequest("Invalid Provider or External Access Token");
            }

            IdentityUser user = await _repo.FindAsync(new UserLoginInfo(model.Provider, verifiedAccessToken.user_id));

            bool hasRegistered = user != null;

            if (hasRegistered)
            {
                return BadRequest("External user is already registered");
            }

            user = new IdentityUser() { UserName = model.UserName };

            IdentityResult result = await _repo.CreateAsync(user);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            var info = new ExternalLoginInfo()
            {
                DefaultUserName = model.UserName,
                Login = new UserLoginInfo(model.Provider, verifiedAccessToken.user_id)
            };

            result = await _repo.AddLoginAsync(user.Id, info.Login);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            //generate access token response
            var accessTokenResponse = GenerateLocalAccessTokenResponse(model.UserName);

            return Ok(accessTokenResponse);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ObtainLocalAccessToken")]
        public async Task<IHttpActionResult> ObtainLocalAccessToken(string provider, string externalAccessToken)
        {

            if (string.IsNullOrWhiteSpace(provider) || string.IsNullOrWhiteSpace(externalAccessToken))
            {
                return BadRequest("Provider or external access token is not sent");
            }

            var verifiedAccessToken = await VerifyExternalAccessToken(provider, externalAccessToken);
            if (verifiedAccessToken == null)
            {
                return BadRequest("Invalid Provider or External Access Token");
            }

            IdentityUser user = await _repo.FindAsync(new UserLoginInfo(provider, verifiedAccessToken.user_id));

            bool hasRegistered = user != null;

            if (!hasRegistered)
            {
                return BadRequest("External user is not registered");
            }

            //generate access token response
            var accessTokenResponse = GenerateLocalAccessTokenResponse(user.UserName);

            return Ok(accessTokenResponse);

        }

        [AllowAnonymous]
        [Route("ResetPassword")]
        [HttpPost]
        public async Task<IHttpActionResult> ResetPassword(UserVO objUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //IdentityUser a = await _repo.FindUser(objUser.LoginName, objUser.Password);
            objUser.LoginName = SecurityDAL.EncryptString(objUser.LoginName);
            IdentityResult result = null;
            result = await _repo.ResetPassword(objUser);
            IHttpActionResult errorResult = GetErrorResult(result);
            if (errorResult != null)
            {
                return errorResult;
            }
            //if (objUser.Email != "" && result.Succeeded)
            //    SendEmail(objUser);
            return Ok();
        }

        [AllowAnonymous]
        [Route("ForgotPassword")]
        [HttpPost]
        public int ForgotPassword(BasicUser usr)
        {
            //IdentityUser a = await _repo.FindUser(objUser.LoginName, objUser.Password);
            try
            {
                SendEmail(usr.UserName);
                return 1;
            }
            catch (Exception ex)
            {
                //if (objUser.Email != "" && result.Succeeded)
                //    SendEmail(objUser);
                return 0;
            }
        }

        [AllowAnonymous]
        [Route("checkCurrentPassword")]
        [HttpPost]
        public int checkCurrentPassword(UserVO objUser)
        {
            int flag = _repo.checkCurrentPassword(objUser.LoginName, objUser.Password);
            if (flag == 0)
                return 0;
            else return 1;
        }

        [ResponseType(typeof(IEnumerable<UserVO>))]
        [HttpPost]
        public IHttpActionResult ValidateUser(UserVO login)
        {
            try
            {
                string clientAddress = HttpContext.Current.Request.UserHostAddress;
                var Response = _repo.CheckUser(login.UserName, login.Password, clientAddress, login.UnitID);
                //     HttpContext.Current.Session["SomeData"] = "";
                GenericSP.CurrentUser = Response;

                //#region User Session Issue added on 14thJun2020
                //if (Response != null && Response.ErrorStatus != 2)
                //{
                //    string json = Newtonsoft.Json.JsonConvert.SerializeObject(Response);
                //    GenericSP.CurrentUserObj = Newtonsoft.Json.JsonConvert.DeserializeObject<UserVO>(json);

                //    //HttpCookie UserCookie = new HttpCookie("UserInfoCookie");
                //    string userObjectJson = new JavaScriptSerializer().Serialize(Response);
                //    var UserCookie = new HttpCookie("UserInfoCookie", userObjectJson)
                //    {
                //        Expires = DateTime.Now.AddDays(1)
                //    };
                //    HttpContext.Current.Response.Cookies.Add(UserCookie);
                //}
                //#endregion

                GenericSP.CurrentUser.LoginName = SecurityDAL.DecryptString(GenericSP.CurrentUser.LoginName);
                GenericSP.CurrentUser.Password = login.Password;
                return Ok(Response);
            }
            catch (SqlException objSqlException)
            {
                //CustomException ce = new CustomException(objSqlException.Message, objSqlException.Source, CustomMessage.GetStringMessage("SQLException"), objSqlException.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                //CustomException ce = new CustomException(objException.Message, objException.Source, CustomMessage.GetStringMessage("UnExpectedError"), objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(Unit))]
        [HttpGet]
        public IHttpActionResult GetUnitListLogNameWise(string logName)
        {
            try
            {
                //UserService srv = new UserService();

                var Response = Srv.GetUnitListLogNameWise(logName);
                return Ok(Response);
            }
            catch (SqlException objSqlException)
            {
                //CustomException ce = new CustomException(objSqlException.Message, objSqlException.Source, CustomMessage.GetStringMessage("SQLException"), objSqlException.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                //CustomException ce = new CustomException(objException.Message, objException.Source, CustomMessage.GetStringMessage("UnExpectedError"), objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _repo.Dispose();
            }

            base.Dispose(disposing);
        }

        #region Helpers

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private string ValidateClientAndRedirectUri(HttpRequestMessage request, ref string redirectUriOutput)
        {

            Uri redirectUri;

            var redirectUriString = GetQueryString(Request, "redirect_uri");

            if (string.IsNullOrWhiteSpace(redirectUriString))
            {
                return "redirect_uri is required";
            }

            bool validUri = Uri.TryCreate(redirectUriString, UriKind.Absolute, out redirectUri);

            if (!validUri)
            {
                return "redirect_uri is invalid";
            }

            var clientId = GetQueryString(Request, "client_id");

            if (string.IsNullOrWhiteSpace(clientId))
            {
                return "client_Id is required";
            }

            var client = _repo.FindClient(clientId);

            if (client == null)
            {
                return string.Format("Client_id '{0}' is not registered in the system.", clientId);
            }

            if (!string.Equals(client.AllowedOrigin, redirectUri.GetLeftPart(UriPartial.Authority), StringComparison.OrdinalIgnoreCase))
            {
                return string.Format("The given URL is not allowed by Client_id '{0}' configuration.", clientId);
            }

            redirectUriOutput = redirectUri.AbsoluteUri;

            return string.Empty;

        }

        private string GetQueryString(HttpRequestMessage request, string key)
        {
            var queryStrings = request.GetQueryNameValuePairs();

            if (queryStrings == null) return null;

            var match = queryStrings.FirstOrDefault(keyValue => string.Compare(keyValue.Key, key, true) == 0);

            if (string.IsNullOrEmpty(match.Value)) return null;

            return match.Value;
        }

        private async Task<ParsedExternalAccessToken> VerifyExternalAccessToken(string provider, string accessToken)
        {
            ParsedExternalAccessToken parsedToken = null;

            var verifyTokenEndPoint = "";

            if (provider == "Facebook")
            {
                //You can get it from here: https://developers.facebook.com/tools/accesstoken/
                //More about debug_tokn here: http://stackoverflow.com/questions/16641083/how-does-one-get-the-app-access-token-for-debug-token-inspection-on-facebook
                var appToken = "xxxxxx";
                verifyTokenEndPoint = string.Format("https://graph.facebook.com/debug_token?input_token={0}&access_token={1}", accessToken, appToken);
            }
            else if (provider == "Google")
            {
                verifyTokenEndPoint = string.Format("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={0}", accessToken);
            }
            else
            {
                return null;
            }

            var client = new HttpClient();
            var uri = new Uri(verifyTokenEndPoint);
            var response = await client.GetAsync(uri);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                dynamic jObj = (JObject)Newtonsoft.Json.JsonConvert.DeserializeObject(content);

                parsedToken = new ParsedExternalAccessToken();

                if (provider == "Facebook")
                {
                    parsedToken.user_id = jObj["data"]["user_id"];
                    parsedToken.app_id = jObj["data"]["app_id"];

                    if (!string.Equals(PIVF.Web.Api.StartUp.facebookAuthOptions.AppId, parsedToken.app_id, StringComparison.OrdinalIgnoreCase))
                    {
                        return null;
                    }
                }
                else if (provider == "Google")
                {
                    parsedToken.user_id = jObj["user_id"];
                    parsedToken.app_id = jObj["audience"];

                    if (!string.Equals(PIVF.Web.Api.StartUp.googleAuthOptions.ClientId, parsedToken.app_id, StringComparison.OrdinalIgnoreCase))
                    {
                        return null;
                    }

                }

            }

            return parsedToken;
        }

        private JObject GenerateLocalAccessTokenResponse(string userName)
        {

            var tokenExpiration = TimeSpan.FromDays(1);

            ClaimsIdentity identity = new ClaimsIdentity(OAuthDefaults.AuthenticationType);

            identity.AddClaim(new Claim(ClaimTypes.Name, userName));
            identity.AddClaim(new Claim("role", "user"));

            var props = new AuthenticationProperties()
            {
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.Add(tokenExpiration),
            };

            var ticket = new AuthenticationTicket(identity, props);

            var accessToken = StartUp.OAuthBearerOptions.AccessTokenFormat.Protect(ticket);

            JObject tokenResponse = new JObject(
                                        new JProperty("userName", userName),
                                        new JProperty("access_token", accessToken),
                                        new JProperty("token_type", "bearer"),
                                        new JProperty("expires_in", tokenExpiration.TotalSeconds.ToString()),
                                        new JProperty(".issued", ticket.Properties.IssuedUtc.ToString()),
                                        new JProperty(".expires", ticket.Properties.ExpiresUtc.ToString())
        );

            return tokenResponse;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }
            public string ExternalAccessToken { get; set; }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer) || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name),
                    ExternalAccessToken = identity.FindFirstValue("ExternalAccessToken"),
                };
            }
        }

        #endregion

        //public void SendEmail(UserVO user)
        public void SendEmail(string userid)
        {
            try
            {
                string fromaddr = "medicoverpalash@gmail.com";
                string toaddr = "manoharc@palashivf.com";//TO ADDRESS HERE
                string password = "Palash@321";
                // string Email = Database.CurrentUser.Email;
                //   string email = Encrypt(Email);
                //DateTime dt = DateTime.Now;
                //DateTime Expiration = dt.AddDays(1);
                //  string exp = Encrypt(Expiration.ToString("d/M/yyyy"));
                //   string strPath = ConfigurationManager.AppSettings["ForgotPassPath"].ToString();
                //   string strLink = strPath + "ResetPassword.aspx?un=" + email + "&Type=" + ddlType.SelectedValue + "&id=" + objPwdVO.ID + "&exp=" + exp;
                //string body = "Dear" + " " + user.UserName + "," + "<br/><br/>Greetings from Palash IVF Solutions Pvt Ltd !<br/>" +
                //              "You received this email because you reset your password on " + DateTime.Now.ToString("dd/MMM/yy") + "." +
                //              "Your credintials are as follow <br/>" +
                //                    "User Name:" + user.LoginName + "<br/>" +
                //                    "Password:" + user.Password + "<br/>"

                //"<a href='" + strLink + "'><center><span style='color:blue'><h4>CLICK HERE TO RESET YOUR PASSWORD</h4></span></center></a>" +
                //+ "Thank You";

                string body = "Dear Admin, <br/><br/> User: " + userid + " has made a forgot password request. <br/> Please reset his/her password. <br/><br/> Thank you, <br/>Palash IVF Admin";
                MailMessage msg = new MailMessage();
                msg.IsBodyHtml = true;
                msg.Subject = "Forgot Password request";
                msg.From = new MailAddress(fromaddr);
                msg.Body = body;
                msg.To.Add(new MailAddress(toaddr));
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 25;
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                NetworkCredential nc = new NetworkCredential(fromaddr, password);
                smtp.Credentials = nc;
                smtp.Send(msg);
                // lblmsg.Text = body.ToString();
                //  btnSubmit.Enabled = false;
                //ddlType.SelectedValue = "0";
                //txtEmail.Text = "";
                //lblmsg.ForeColor = Color.Green;
                //lblmsg.Text = "Password reset link has been sent to your email and will expire tomorrow.";
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
