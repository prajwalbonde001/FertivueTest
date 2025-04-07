using System;
using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.ARTMgmt.Embrology;
using PIVF.Entities.Models.ARTMgmt.Embrology;
using PIVF.Entities.Models.Master.Clinic;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

using System.Threading.Tasks;

namespace PIVF.Web.Api.ARTMgmt.Progenesis
{


    public class ProgenesisApiController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        EmbrologyBAL _Embro;
        public ProgenesisApiController(EmbrologyBAL _srv)
        {
            _Embro = _srv;
        }

        [ResponseType(typeof(PGTUserAuth))]
        [HttpPost] // ✅ Change to POST
        public IHttpActionResult GetPGTUserAuthInfo([FromBody] PGTUserAuthRequest request)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] +
                    ", Action:" + HttpContext.Current.Request.HttpMethod +
                    ", Method:" + this.ControllerContext.RouteData.Values["action"] +
                    ", User:{0}, UnitID:{1}", "tejas", 2);

                if (request == null || request.UserID <= 0)
                {
                    return BadRequest("Invalid request data.");
                }

                // Store UserID in TempData before redirecting
                HttpContext.Current.Session["PGT_UserID"] = request.UserID;
                var response = _Embro.GetPGTUserAuthInfo(request);

                return Ok(response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpGet] // ✅ Change to POST
        public IHttpActionResult GetPGTUserAuthInfoAccessToken(long UserId)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] +
                    ", Action:" + HttpContext.Current.Request.HttpMethod +
                    ", Method:" + this.ControllerContext.RouteData.Values["action"] +
                    ", User:{0}, UnitID:{1}", "tejas", 2);

                if (UserId == null || UserId <= 0)
                {
                    return BadRequest("Invalid request data.");
                }

                // Store UserID in TempData before redirecting
                HttpContext.Current.Session["PGT_UserID"] = UserId;
                var response = _Embro.GetPGTUserAuthInfoAccesstoken(UserId);

                return Ok(response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpGet] // ✅ Change to POST
        public IHttpActionResult GetPGTEmbryolgist(string accessToken)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] +
                    ", Action:" + HttpContext.Current.Request.HttpMethod +
                    ", Method:" + this.ControllerContext.RouteData.Values["action"] +
                    ", User:{0}, UnitID:{1}", "tejas", 2);


                var response = _Embro.GetPGTEmbryolgist(accessToken);

                return Ok(response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        [HttpGet] // ✅ Change to POST
        public IHttpActionResult GetPGTClinicusers(string accessToken)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] +
                    ", Action:" + HttpContext.Current.Request.HttpMethod +
                    ", Method:" + this.ControllerContext.RouteData.Values["action"] +
                    ", User:{0}, UnitID:{1}", "tejas", 2);


                var response = _Embro.GetPGTClinicusers(accessToken);

                return Ok(response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        [HttpGet] // ✅ Change to POST
        public IHttpActionResult GetPGTPhysicians(string accessToken)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] +
                    ", Action:" + HttpContext.Current.Request.HttpMethod +
                    ", Method:" + this.ControllerContext.RouteData.Values["action"] +
                    ", User:{0}, UnitID:{1}", "tejas", 2);


                var response = _Embro.GetPGTPhysicians(accessToken);

                return Ok(response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                    this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        [HttpGet]
        public async Task<IHttpActionResult> OAuthRedirect(string code)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] +
                            ", Action:" + HttpContext.Current.Request.HttpMethod +
                            ", Method:" + this.ControllerContext.RouteData.Values["action"] +
                            ", UserID: " + 0);

                if (string.IsNullOrEmpty(code))
                {
                    return Content(HttpStatusCode.BadRequest, new
                    {
                        error = "missing_code",
                        error_description = "Authorization code is required."
                    });
                }

                var tokenResponse = await _Embro.GetAccessToken(code);

                if (!string.IsNullOrEmpty(tokenResponse.AccessToken))
                {
                    // Add a query parameter to indicate successful authentication
                    return Redirect("https://stage1.fertivue.com:8095/fertivue#/Embrology?status=success&closePopup=true");
                }

                if ((HttpStatusCode)tokenResponse.HttpStatusCode != HttpStatusCode.OK)
                {
                    return Content((HttpStatusCode)tokenResponse.HttpStatusCode, new
                    {
                        error = tokenResponse.Error,
                        error_description = tokenResponse.ErrorDescription,
                        json_request = tokenResponse.JsonRequest,
                        curl_command = tokenResponse.CurlCommand
                    });
                }

                return Redirect($"https://stage1.fertivue.com:8095/fertivue#/Embrology?error={tokenResponse.Error}");
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] +
                             ", Message: " + ex.Message + ", StackTrace: " + ex.StackTrace);

                return Content(HttpStatusCode.InternalServerError, new
                {
                    error = "sql_exception",
                    error_description = ex.Message
                });
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] +
                             ", Message: " + ex.Message + ", StackTrace: " + ex.StackTrace);

                return Content(HttpStatusCode.InternalServerError, new
                {
                    error = "exception",
                    error_description = ex.Message
                });
            }
        }

        [HttpPost]
        public IHttpActionResult ValidatePatientWithProgenesis(PGTUserAuthRequest requestData)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] +
                            ", Action:" + HttpContext.Current.Request.HttpMethod +
                            ", Method:" + this.ControllerContext.RouteData.Values["action"] +
                            ", User:{0}, UnitID:{1}", requestData.UserID, 2);

                if (requestData == null || requestData.UserID <= 0 || string.IsNullOrEmpty(requestData.AccessToken))
                {
                    return BadRequest("Invalid request data.");
                }

                // Call the BAL method
                var response = _Embro.ValidatePatientWithProgenesis(requestData);

                if (response == null)
                {
                    return NotFound();
                }

                return Ok(response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                             this.ControllerContext.RouteData.Values["action"] + ",Message:{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return InternalServerError(ex);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" +
                             this.ControllerContext.RouteData.Values["action"] + ",Message:{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return InternalServerError(ex);
            }
        }






        //[ResponseType(typeof(object))]
        //[HttpGet]
        //public async Task<IHttpActionResult> OAuthCallback(string code)
        //{
        //    try
        //    {
        //        logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ", Action:" + HttpContext.Current.Request.HttpMethod +
        //                    ", Method:" + this.ControllerContext.RouteData.Values["action"] + ", UserID: " + 0);

        //        if (string.IsNullOrEmpty(code))
        //        {
        //            return Content(HttpStatusCode.BadRequest, "Authorization code is missing.");
        //        }

        //        var tokenResponse = await _Embro.GetAccessToken(code);

        //        if (tokenResponse == 1)
        //        {
        //            return Ok(new { message = "Integration successful"});
        //        }

        //        return Content(HttpStatusCode.BadRequest, "Failed to retrieve access token.");
        //    }
        //    catch (SqlException ex)
        //    {
        //        logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] +
        //                     ", Message: " + ex.Message + ", StackTrace: " + ex.StackTrace);
        //        return NotFound();
        //    }
        //    catch (Exception ex)
        //    {
        //        logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] +
        //                     ", Message: " + ex.Message + ", StackTrace: " + ex.StackTrace);
        //        return NotFound();
        //    }
        //}


    }
}