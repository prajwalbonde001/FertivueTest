using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.Master.Inventory;
using PIVF.Entities.Models.Master.Inventory;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using System.Web.Script.Serialization;

namespace PIVF.Web.Api.Master.Inventory
{
    [Authorize]
    public class StoreAPIController :ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        IStoreService _StoreSrc = null;

        public StoreAPIController(IStoreService Obj)
        {
            _StoreSrc = Obj;
        }

        [ResponseType(typeof(StoreMaster))]
        [HttpGet]
        public IHttpActionResult GetStoreList(string searchPara)     //
        {
            StoreMaster obj = new JavaScriptSerializer().Deserialize<StoreMaster>(searchPara);
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                    ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName,GenericSP.CurrentUser.UnitID);
                var Response = _StoreSrc.GetStoreList(obj);
                return Ok(Response);
            }
            catch(SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message:{0},StackTrace:{1}",ex.Message,ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch(Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message:{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
    }
}