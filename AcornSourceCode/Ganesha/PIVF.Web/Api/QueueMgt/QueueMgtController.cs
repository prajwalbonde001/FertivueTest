using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.QueueMgt;
using PIVF.Entities.Models.QueueMgt;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.QueueMgt
{
    [Authorize]
    public class QueueMgtController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        QueueMgtBAL srv;
        public QueueMgtController(QueueMgtBAL _srv)
        {
            srv = _srv;
        }
        [ResponseType(typeof(QueueVO))]
        [HttpPost]
        public IHttpActionResult GetQueueList(string[] Que) 
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetQueueList(Que);
                //var IsMarkSurrogate = ConfigurationManager.AppSettings["MarkSurrogate"].ToString();
                return Ok(Response);  
            }
            catch (SqlException ex)
            {
                logger.Error("QueueMgt/GetQueueList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("QueueMgt/GetQueueList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult CloseVisit(int vid,int UnitId)
        {
            try
            {
                logger.Info("Controller Name:QueueAPI,Action:HttpGet,Method:CloseVisit,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.CloseVisit(vid,UnitId);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("QueueAPI/CloseVisit Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("QueueAPI/CloseVisit Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SaveVisitRemark( string Remark, int VisitID, int UnitID)
        {
            try
            {
                logger.Info("Controller Name:QueueAPI,Action:HttpPost,Method:SaveVisitRemark,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.SaveVisitRemark(Remark, VisitID, UnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("QueueAPI/SaveVisitRemark Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("QueueAPI/SaveVisitRemark Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }
    }
}
