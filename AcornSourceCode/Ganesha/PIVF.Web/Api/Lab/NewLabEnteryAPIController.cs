using DataBaseConfiguration;
using NLog;
using System.Web;
using System.Data.SqlClient;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;


using PIVF.BusinessLayer.Lab;
using PIVF.Entities.Models.Lab;
using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace PIVF.Web.Api.Lab
{
    [Authorize]
        public class NewLabEnteryAPIController : ApiController
        {
            private static Logger logger = LogManager.GetCurrentClassLogger();
            //CommonService srv = new CommonService();
            NewLabEnteryBAL srv;
            public NewLabEnteryAPIController(NewLabEnteryBAL _NewLabEnteryBAL)
            {
                srv = _NewLabEnteryBAL;
            }


        [ResponseType(typeof(long))]
        [HttpPost]
        public IHttpActionResult SaveLabEntery(clsPathOrderBookingVO NewLab)
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
            
                var Response = srv.SaveLabEntery(NewLab);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }




        [ResponseType(typeof(List<clsPathOrderBookingDetailVO>))]
        [HttpPost]

        ////[HttpGet]
        ////[ResponseType(typeof(IEnumerable<clsPathOrderBookingDetailVO>))]
        public IHttpActionResult getPatientList(clsPathOrderBookingDetailVO NewLabList,int index) 
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
               //clsPathOrderBookingDetailVO  obj = new JavaScriptSerializer().Deserialize<clsPathOrderBookingDetailVO>(searchParams);
                var Response = srv.getPatientList(NewLabList,index);
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


        [ResponseType(typeof(List<clsPathPatientReportVO>))]
        [HttpGet]
        public IHttpActionResult GetPathoTestParameterList (int PatientID, int PatientUnitID, int ServiceID, int TestID, int CategoryID)
        {
            try
            {
                var Response = srv.GetPathoTestParameterList(PatientID, PatientUnitID, ServiceID, TestID, CategoryID);
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

        [ResponseType(typeof(List<clsPathoTestParameterVO>))]
        [HttpGet]
        public IHttpActionResult HelpValuesesEntryList(int ParameterID)
        {
            try
            {
                var Response = srv.HelpValuesesEntryList(ParameterID);
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
        [ResponseType(typeof(clsPathOrderBookingDetailVO))]
        [HttpGet]
        public IHttpActionResult GetLabEntryDetails(int OrderID, int DetailID, int OrderUnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetLabEntryDetails(OrderID, DetailID, OrderUnitID);
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
