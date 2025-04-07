using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.ARTMgmt.EmbryoTransfer;
using PIVF.Entities.Models.ARTMgmt.EmbryoTransfer;
using System;
using System.Data.SqlClient;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.ARTMgmt.EmbryoTransfer
{
    [Authorize]
    public class EmbryoTransferAPIController : ApiController
    {
        EmbryoTransferBAL _Embro;
        private static Logger logger = LogManager.GetCurrentClassLogger();
        public EmbryoTransferAPIController(EmbryoTransferBAL Embro)
        {
            _Embro = Embro;
        }

        [HttpGet]
        [ResponseType(typeof(EmbryoTransferVO))]
        public IHttpActionResult FillETMaster()   
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Embro.FillMasters());
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
        [ResponseType(typeof(EmbryoDetailsVO))]
        public IHttpActionResult FillETGrid(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Embro.FillETGrid(PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID));
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
        public IHttpActionResult SaveET(EmbryoTransferVO ETData)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_Embro.SaveET(ETData));
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
