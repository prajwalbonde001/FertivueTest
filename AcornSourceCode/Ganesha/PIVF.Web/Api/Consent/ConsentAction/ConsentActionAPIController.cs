using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.ARTMgmt.ReportUpload;
using PIVF.BusinessLayer.Consent.ConsentAction;
using PIVF.Entities.Models.ARTMgmt.ReportUpload;
using PIVF.Entities.Models.Consent.ConsentAction;
using PIVF.Entities.Models.Master.IVF;
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

namespace PIVF.Web.Api.Consent.ConsentAction
{
    [Authorize]
    public class ConsentActionAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        ConsentActionBL _ConsentActionBL;
        public ConsentActionAPIController(ConsentActionBL Obj)
        {
            _ConsentActionBL = Obj;
        }
        [ResponseType(typeof(List<CommanEntity>))]
        [HttpGet]
        public  IHttpActionResult GetConsentList(long ARTTypeID,long ARTSubTypeID)
        {
            try
            {
                var Response = _ConsentActionBL.GetConsentList(ARTTypeID, ARTSubTypeID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(ConsentDetailsVO))]
        [HttpGet]
        public IHttpActionResult GetConsentDetails(long UnitID, long ID, long ConsentID)
        {
            try
            {
                var Response = _ConsentActionBL.GetConsentDetails(UnitID, ID,ConsentID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SaveConsent(ConsentDetailsVO ConsentDetails)
        {
            try
            {
                var Response = _ConsentActionBL.SaveConsent(ConsentDetails);
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
        [ResponseType(typeof(List<ConsentDetailsVO>))]
        [HttpGet]
        public IHttpActionResult GetConsenGrid()
        {
            try
            {
                var Response = _ConsentActionBL.GetConsenGrid();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SaveUpdateFile(List<ConsentDetailsVO> _objConsentDetailsVO)
        {
            try
            {
                var Response = _ConsentActionBL.SaveUpdateFile(_objConsentDetailsVO);
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
        [ResponseType(typeof(tmpReport))]
        [HttpGet]
        public IHttpActionResult ViewReport(long ID,long UnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                tmpReport tmp = new tmpReport();
                var Response = _ConsentActionBL.ViewReport(ID, UnitID);               

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
