using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation;
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

namespace PIVF.Web.Api.ARTMgmt.Cryo_Preservation
{
    [Authorize]
    public class EmbryoThowingAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        EmbryoThowingBAL _Embryo;
        public EmbryoThowingAPIController(EmbryoThowingBAL Embro)
        {
            _Embryo = Embro;
        }
        [HttpGet]
        [ResponseType(typeof(EmbryoThowingVO))]
        public IHttpActionResult GetFreezeEmbryo(long PatientID, long PatientUnitID, long TherapyID,long TherapyUnitID)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Embryo.GetFreezeEmbryo(PatientID, PatientUnitID, TherapyID, TherapyUnitID));
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
        [ResponseType(typeof(EmbryoThowingVO))]
        public IHttpActionResult FillMaster()
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Embryo.FillMaster());
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

        [HttpPost]
        [ResponseType(typeof(long))]
        public IHttpActionResult SaveThawing(List<EmbryoThowingVO> ThawingData)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Embryo.SaveThawing(ThawingData));
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
        [ResponseType(typeof(EmbryoThowingVO))]
        public IHttpActionResult GetThawingData(long PatientID, long PatientUnitID,long TherapyID,long TherapyUnitID)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Embryo.GetThawingData(PatientID, PatientUnitID, TherapyID, TherapyUnitID));
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
