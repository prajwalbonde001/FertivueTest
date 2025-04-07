using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PIVF.Entities.Models.EMR.Vitals;
using System.Web.Http.Description;
using PIVF.BusinessLayer.EMR.Vitals;
using PIVF.Entities.Models.Patient;
using NLog;
using System.Data.SqlClient;
using System.Web.Http.Results;
using System.Web;
using DataBaseConfiguration;

namespace PIVF.Web.Api.EMR.Vitals
{
    [Authorize]
    public class VitalsAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        VitalsBAL _Obj;
        public VitalsAPIController(VitalsBAL Obj)
        {
            _Obj = Obj;
        }

        //Save Vitals
        [HttpPost]
        [ResponseType(typeof(int))]
        public IHttpActionResult SaveVitals(VitalsVO Data)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Obj.SaveVitals(Data));
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

        //Show The Previous vitals On Grid
        [HttpGet]
        [ResponseType(typeof(IEnumerable<VitalsVO>))]
        public IHttpActionResult GetVitals(long PatientID, long UnitID, int PageIndex)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Obj.GetVitals(PatientID,UnitID, PageIndex));
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

        [HttpGet]
        [ResponseType(typeof(int))]
        public IHttpActionResult DeleteVitalsWithReason(long ID, long UnitID,string Reason)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Obj.DeleteVitalsWithReason(ID,UnitID,Reason));
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
