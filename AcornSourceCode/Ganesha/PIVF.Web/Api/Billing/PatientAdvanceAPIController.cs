using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.Billing;
using PIVF.Entities.Models.Billing;
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

namespace PIVF.Web.Api.Billing
{
    public class PatientAdvanceAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        IPatientAdvanceBAL srv;
        public PatientAdvanceAPIController(IPatientAdvanceBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(long))]
        [HttpPost]

        public IHttpActionResult savePatientAdvance(PatientAdvanceVO obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.savePatientAdvance(obj);  
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }

            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }

        }
        [ResponseType(typeof(List<PatientAdvanceVO>))]
        [HttpGet]
        public IHttpActionResult FillAdvanceList(int PatientID, int PatientUnitID)
        {
            try
            {
                var Response = srv.FillAdvanceList(PatientID, PatientUnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }


        // Added By Chetan 12-12-2024

        [ResponseType(typeof(AdvanceList))]
        [HttpPost]
        public IHttpActionResult GetAdvanceList(string[] AdvanceLists, int index, bool PgEn)
        {
            try
            {
                // Initialize totalCount to store the count of records
                int totalCount = 0;

                // Log the request details
                logger.Info("Controller Name:AdvanceCtrl, Action:HttpGet, Method:GetAdvanceList, User:{0}, UnitID:{1}",
                            GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                // Call the service layer to retrieve the advance list and total count
                var response = srv.GetPatientAdvanceList(AdvanceLists, index, PgEn, out totalCount);

                // Create a response object with the list and the total count
                var result = new
                {
                    AdvanceList = response,
                    TotalCount = totalCount
                };

                // Return the result as a 200 OK response
                return Ok(result);
            }
            catch (SqlException ex)
            {
                // Log SQL exceptions
                logger.Error("AdvanceAPI/GetAdvanceList Message:{0}, StackTrace:{1}", ex.Message, ex.StackTrace);
                // Return a NotFoundResult for SQL exceptions
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                // Log generic exceptions
                logger.Error("AdvanceAPI/GetAdvanceList Message:{0}, StackTrace:{1}", objException.Message, objException.StackTrace);
                // Return a NotFoundResult for general exceptions
                return new NotFoundResult(Request);
            }
        }




        // Added By Chetan 12-12-2024

        [ResponseType(typeof(long))]
        [HttpPost]
        public IHttpActionResult AddOrUpdateAdvance(AddAdvance obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.AddOrUpdateAdvance(obj);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }

            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }

        }

        [ResponseType(typeof(AdvanceBalance))]
        [HttpGet]
        public IHttpActionResult GetAdvanceBalanceAmount(int UnitID, int PatientID, int PatientUnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetAdvanceBalanceAmount(UnitID, PatientID, PatientUnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }

        }
    }
}
