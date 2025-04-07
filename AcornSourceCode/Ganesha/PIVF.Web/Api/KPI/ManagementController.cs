using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PIVF.BusinessLayer.KPI;
using DataBaseConfiguration;
using NLog;
using System.Data.SqlClient;
using PIVF.Entities.Models.KPI;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.KPI
{
    public class ManagementController : ApiController
    {
        ManagementBAL srv;
        private static Logger logger = LogManager.GetCurrentClassLogger();
        public ManagementController(ManagementBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(List<CumulativeCases>))]
        [HttpGet]
        public IHttpActionResult cumulativeCases(string FromDate, string ToDate)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.cumulativeCases(FromDate, ToDate);
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

        [ResponseType(typeof(SuccessRate))]
        [HttpGet]
        public IHttpActionResult ClinicWise(string FromDate, string ToDate,int UnitID)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.ClinicWise(FromDate, ToDate,UnitID);
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


        [ResponseType(typeof(List<OverallSuccessRate>))]
        [HttpGet]
        public IHttpActionResult OverallSuccessRate(string FromDate, string ToDate)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.OverallSuccessRate(FromDate, ToDate);
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

        [ResponseType(typeof(DoctorWiseComparasion))]
        [HttpGet]
        public IHttpActionResult DoctorWise(string FromDate, string ToDate)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.DoctorWise(FromDate, ToDate);
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
        [HttpPost]
        public IHttpActionResult ManagementCumulativeCasePDF(List<CumulativeCases> Obj)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.ManagementCumulativeCasePDF(Obj);
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
        [HttpPost]
        public IHttpActionResult ManagementPDFImage(ImageObj Obj)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.ManagementPDFImage(Obj, 2);
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
        [HttpPost]
        public IHttpActionResult ManagementPDFImage4(ImageObj Obj)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.ManagementPDFImage(Obj, 4);
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
        [HttpPost]
        public IHttpActionResult ManagementPDFImage6(ImageObj Obj)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.ManagementPDFImage(Obj, 6);
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
        [HttpPost]
        public IHttpActionResult ManagementPDFClinicWise(ManagementData Obj)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.ManagementPDFClinicWise(Obj);
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
        [HttpPost]
        public IHttpActionResult ManagementPDFDoctorWise(List<DoctorWise> Obj)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.ManagementPDFDoctorWise(Obj);
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

    }
}