﻿using Repository.Pattern.UnitOfWork;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;
using PIVF.Entities.Models;
using System.Web;
using Dapper;
using PIVF.DataAccessLayer.Security;
using DataBaseConfiguration;
using PIVF.BusinessLayer.Ticket;
//using PIVF.Service;

namespace PIVF.Web.Api.Authentication
{
    public class TicketsController : ODataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        private readonly ITicketsService _srvTicket;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        public string loggedInUser;
   //     HttpContext context = HttpContext.Current;

        public TicketsController(IUnitOfWorkAsync uofAsync,ITicketsService srvTicket)
        {
            _unitOfWorkAsync = uofAsync;
            _srvTicket = srvTicket;
            if(DataBaseConfiguration.GenericSP.CurrentUser!=null)
            loggedInUser = DataBaseConfiguration.GenericSP.CurrentUser.LoginName;

            
            // HttpContext.Current.Request.Cookies["ASP.NET_SessionId"].Value;
        }
        public static HttpResponse GetHttpResponse()
        {
            return HttpContext.Current.Response;
        }
        
        [AllowAnonymous]
        [HttpPut]
        [ODataRoute("GetActiveTickets(UserName={UserName},generatedToken={generatedToken}, checkStatus = {checkStatus} , flag= {flag})")]
        public int GetActiveTickets(string UserName, string generatedToken, bool checkStatus, int flag)
         {
            int countTickets;
            if (checkStatus == true && flag == 1)
            {
                HttpCookie AuthCookie = new HttpCookie("MyCookie");
                AuthCookie.Values["UserName"] = UserName;
                AuthCookie.Expires = DateTime.MinValue;

                HttpCookie TimeTrackerCookie = new HttpCookie("LoggedInTimeCookie");
                TimeTrackerCookie.Values["TimeCookie"] = DateTime.Now.ToString("mm");
                TimeTrackerCookie.Expires = DateTime.MinValue;

                GetHttpResponse().Cookies.Add(AuthCookie);
                GetHttpResponse().Cookies.Add(TimeTrackerCookie);

                string loggedInTime = HttpContext.Current.Request.Cookies["LoggedInTimeCookie"].Value;
                Tickets t = new Tickets();
                //string userName = HttpContext.Current.Request.Cookies["MyCookie"].Value;
                //int index = userName.IndexOf("=") + 1;
                //t.userName = userName.Substring(index);
                int index = UserName.IndexOf("=") + 1;
                t.userName = UserName.Substring(index);
                t.LastUpdate = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss");
                t.ConnectionId = HttpContext.Current.Request.Cookies["SessionContent"].Value;
                var dummyCookConnectValueie = HttpContext.Current.Request.Cookies["ConnectValue"];
                var ConnectKey = HttpContext.Current.Request.Cookies["ConnectKey"];

                try
                {
                    _srvTicket.Insert(t);
                    _unitOfWorkAsync.SaveChangesAsync();
                    return 0;
                }
                catch (Exception e)
                {
                    throw;
                }
            }
            else if (checkStatus == false && flag == 1)
           {
                var connectionId = HttpContext.Current.Request.Cookies["SessionContent"].Value;
                countTickets = _srvTicket.GetActiveTickets(UserName, connectionId);
                HttpContext.Current.Session["SelectedPatient"] = null;
                return 0;
            }
            else
            {
                string connectionId = "";
                if (HttpContext.Current.Request.Cookies["SessionContent"] == null)
                {
                        //   HttpContext context = HttpContext.Current;
                        connectionId = (string)(HttpContext.Current.Session.SessionID);

                        HttpCookie AuthCookie1 = new HttpCookie("SessionContent");
                        AuthCookie1.Value = connectionId;
                        AuthCookie1.Expires = DateTime.MinValue;

                        GetHttpResponse().Cookies.Add(AuthCookie1);
                   
                }
                else
                {
                    connectionId = HttpContext.Current.Request.Cookies["SessionContent"].Value;
                }
                //var connectionId = HttpContext.Current.Request.Cookies["ASP.NET_SessionId"].Value;
                countTickets = _srvTicket.CheckForDuplicateTickets(connectionId,UserName);
                return countTickets;
            }
        }

        [HttpPost]
        [ODataRoute("UpdateTicket")]
        public int UpdateTicket()
        {
            try
            {
                DapperConnection con = new DapperConnection();

                Tickets t = new Tickets();
                string userName = HttpContext.Current.Request.Cookies["MyCookie"].Value;
                int index = userName.IndexOf("=") + 1;
                t.userName = userName.Substring(index);
                t.LastUpdate = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss");
                t.ConnectionId = HttpContext.Current.Request.Cookies["SessionContent"].Value;
                t.sessionId = con.DapCon.Query<int>("SELECT SessionId FROM tickets WHERE ConnectionId=@ConnectionId", new { t.ConnectionId }).FirstOrDefault();

                var SessionTime = HttpContext.Current.Session.Timeout;

                _srvTicket.Update(t);
                _unitOfWorkAsync.SaveChangesAsync();

                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        [HttpGet]
        [ODataRoute("GetCurrentUserPatientID")]
        public int GetCurrentUserPatientID()
        {
            DapperConnection con = new DapperConnection();

            Tickets t = new Tickets();
            if (HttpContext.Current.Request.Cookies["SessionContent"] != null)
            {
                t.ConnectionId = HttpContext.Current.Request.Cookies["SessionContent"].Value;
            }
            var SessionloggedInUser = con.DapCon.Query<string>("SELECT UserName FROM tickets WHERE ConnectionId=@ConnectionId", new { t.ConnectionId }).FirstOrDefault();

            int crtPatientID = _srvTicket.GetCurrentPatientID(SecurityDAL.EncryptString(SessionloggedInUser));
            var session = HttpContext.Current.Session;

           

            t.sessionId = con.DapCon.Query<int>("SELECT SessionId FROM tickets WHERE ConnectionId=@ConnectionId", new { t.ConnectionId }).FirstOrDefault();
           

            return crtPatientID;
        }

    }
}
