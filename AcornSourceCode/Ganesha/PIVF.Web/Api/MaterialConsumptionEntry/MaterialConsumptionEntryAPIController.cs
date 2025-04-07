using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.MaterialConsumptionEntry;
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

namespace PIVF.Web.Api.MaterialConsumptionEntry
{
    //[Authorize]
    public class MaterialConsumptionEntryAPIController : ApiController
    {

        private static Logger logger = LogManager.GetCurrentClassLogger();
        MaterialConsumptionEntryBAL srv;
        public MaterialConsumptionEntryAPIController(MaterialConsumptionEntryBAL _srv)
        {
            srv = _srv;
        }
        [ResponseType(typeof(string))]
        [HttpPost]
        public IHttpActionResult SaveConsumptionDetails(clsMaterialConsumptionVO objMaterialConsumption)

        
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                  ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
               
                var Response = srv.SaveConsumptionDetails(objMaterialConsumption);
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
