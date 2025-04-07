using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.EMR.MaleHistory;
//using PIVF.Service.EMR.MaleHistory;
using System;
using System.Data.SqlClient;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.EMR.MaleHistory
{
    [Authorize]
    public class MaleHistoryController : ApiController
    {
        //MaleHistoryService srv = new MaleHistoryService();
        private static Logger logger = LogManager.GetCurrentClassLogger();
        MaleHistoryServiceBAL srv;
        public MaleHistoryController(MaleHistoryServiceBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(PIVF.Entities.Models.EMR.MaleHistory.MaleHistory))]
        [HttpGet]
        public IHttpActionResult SetAllControls(int VID, int uID, int Prev)
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                var Response = srv.SetAllControls( VID,  uID,  Prev);
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

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult InsertMaleHistory(PIVF.Entities.Models.EMR.MaleHistory.MaleHistory maleHistory)
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                maleHistory.RegUnitID = GenericSP.CurrentUser.UnitID;                
                var Response = srv.InsertMaleHistory(maleHistory);
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

        [ResponseType(typeof(PIVF.Entities.Models.EMR.MaleHistory.MaleHistory))]
        [HttpGet]
        public IHttpActionResult GetHistoryList()
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                var Response = srv.GetHistoryList();
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
    }
}
