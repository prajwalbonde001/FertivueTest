using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.EMR.FemaleHistory;
using PIVF.Entities.Models.EMR.FemaleHistory;
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

namespace PIVF.Web.Api.EMR.FemaleHistory
{
    [Authorize]
    public class CorpusLeteumScanController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        CorpusLeteumScanBAL srv;
        public CorpusLeteumScanController(CorpusLeteumScanBAL CorpusLeteumScan)
        {
            srv = CorpusLeteumScan;
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SaveOrUpdateCLScan(CorpusLeteumScan corpusLeteumScan)
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                corpusLeteumScan.UnitID = Convert.ToInt32(GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                corpusLeteumScan.CLSPatientID = Convert.ToInt32(GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                corpusLeteumScan.CLSUserID  = GenericSP.CurrentUser.UserID;
                var Response = srv.SaveOrUpdateCLScan(corpusLeteumScan);
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


        [ResponseType(typeof(CorpusLeteumScan))]
        [HttpGet]
        public IHttpActionResult LoadPreviousCorpusLeteumScanData()
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.LoadPreviousCorpusLeteumScanData();
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


        [ResponseType(typeof(CorpusLeteumScan))]
        [HttpGet]
        public IHttpActionResult GetSingleCLScan(int ID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetSingleCLScan(ID);
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

        [ResponseType(typeof(CorpusLeteumScan))]
        [HttpGet]
        public IHttpActionResult LoadCycleCodeList()
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.LoadCycleCodeList();
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
