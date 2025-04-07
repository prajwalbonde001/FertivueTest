using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.ARTMgmt.MediaConsumption;
using PIVF.Entities.Models.ARTMgmt.MediaConsumption;
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

namespace PIVF.Web.Api.MediaConsumption
{
    [Authorize]
    public class MediaConsumptionAPIController : ApiController
    {
        public static Logger logger = LogManager.GetCurrentClassLogger();
        MediaConsumptionBAL _MediaConsumptionBAL;
        public MediaConsumptionAPIController(MediaConsumptionBAL _Obj)
        {
            _MediaConsumptionBAL = _Obj;
        }
        [ResponseType(typeof(List<MediaItemVO>))]
        [HttpGet]
        public IHttpActionResult GetItemsByClinic(long? UnitID)
        {
            try
            {
                var Response = _MediaConsumptionBAL.GetItemsByClinic(UnitID);
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
        [ResponseType(typeof(List<MediaConsumptionVO>))]
        [HttpGet]
        public IHttpActionResult GetMediaList(string Search)
        {
            try
            {
                var Response = _MediaConsumptionBAL.GetMediaList(Search);
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
        [HttpPost]
        [ResponseType(typeof(int))]
        public IHttpActionResult SaveMedia(List<MediaConsumptionVO> ListMedia)
        {
            try   {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_MediaConsumptionBAL.SaveMedia(ListMedia));
            }
            catch (SqlException ex)    {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)     {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        [HttpPost]
        [ResponseType(typeof(int))]
        public IHttpActionResult SaveFinalizedMedia(List<MediaConsumptionVO> ListMedia)
        {
            try {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_MediaConsumptionBAL.SaveFinalizedMedia(ListMedia));
            }
            catch (SqlException ex)   {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)  {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
    }
}
