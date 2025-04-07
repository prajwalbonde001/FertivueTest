using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.MaterialConsumptionList;
using PIVF.Entities.Models.MaterialConsumption;
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

namespace PIVF.Web.Api.MaterialConsumptionList
{  //[Authorize]
    public class MaterialConsumptionListAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        MaterialConsumptionListBAL srv;
        public MaterialConsumptionListAPIController(MaterialConsumptionListBAL _srv)
        {
            srv = _srv;
        }
        [ResponseType(typeof(clsMaterialConsumptionVO))]
        [HttpPost]
        
        public IHttpActionResult GetMaterialConsupmtionList(string[] ConsupmtionList, int index, bool PgEn)
        {
            try
            {
                logger.Info("Controller Name:MaterialConsumptionListController,Action:HttpPost,Method:GetMaterialConsupmtionList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
               
                var Response = srv.GetMaterialConsupmtionList(ConsupmtionList, index, PgEn);

                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("MaterialConsumptionListAPI/GetMaterialConsupmtionList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("MaterialConsumptionListAPI/GetMaterialConsupmtionList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        public IHttpActionResult GetMaterialConsumptionItemList(long MaterialConsumptionID, long MaterialConsumptionUnitID)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                //var Response = PatVisitSer.GetPatientDetails(Criteria, IsAppSearch);
                var Response = srv.GetMaterialConsumptionItemList(MaterialConsumptionID, MaterialConsumptionUnitID);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(UOMConversionVO))]
        [HttpGet]

        public IHttpActionResult GetUOMConcersionFactor(long BatchID, long ItemID, long FromUOMID, long ToUOMID)
        {
            try
            {
                logger.Info("Controller Name:MaterialConsumptionListController,Action:HttpPost,Method:GetMaterialConsupmtionList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.GetUOMConcersionFactor(BatchID, ItemID, FromUOMID, ToUOMID);

                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("MaterialConsumptionListAPI/GetMaterialConsupmtionList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("MaterialConsumptionListAPI/GetMaterialConsupmtionList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

    }
}
