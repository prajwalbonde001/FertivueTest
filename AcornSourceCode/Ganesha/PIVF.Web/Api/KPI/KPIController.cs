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
    public class KPIController : ApiController
    {
        KPIBAL srv;
        private static Logger logger = LogManager.GetCurrentClassLogger();
        public KPIController(KPIBAL _srv)
        {
            srv = _srv;
        }


        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPISelf(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax, int Fresh)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPISelf(FromDate, ToDate, UnitId, AgeMin, AgeMax,Fresh);
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

        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPIDonor(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax, int Fresh)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIDonor(FromDate, ToDate, UnitId,AgeMin,AgeMax,Fresh);
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

        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPIImplantationRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax,string Action,int Fresh)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIImplantationRate(FromDate, ToDate, UnitId, AgeMin, AgeMax, Action,Fresh);
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
        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPIClinicalPregnancyRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIClinicalPregnancyRate(FromDate, ToDate, UnitId, AgeMin, AgeMax);
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
        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPICleavageRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPICleavageRate(FromDate, ToDate, UnitId, AgeMin, AgeMax);
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

        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPILiveBirthRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax,string Action,int Fresh)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPILiveBirthRate(FromDate, ToDate, UnitId, AgeMin, AgeMax,Action,Fresh);
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

        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPIBiochemicalPregnancyRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIBiochemicalPregnancyRate(FromDate, ToDate, UnitId, AgeMin, AgeMax);
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
        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPIOnGoingPregnancyRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIOnGoingPregnancyRate(FromDate, ToDate, UnitId, AgeMin, AgeMax);
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

        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPIFertilizationRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIFertilizationRate(FromDate, ToDate, UnitId, AgeMin, AgeMax);
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


        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPIGoodGradeRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIGoodGradeRate(FromDate, ToDate, UnitId, AgeMin, AgeMax);
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

        [ResponseType(typeof(KPIVO))]
        [HttpGet]
        public IHttpActionResult KPIIUIPregnancySucessRate(string FromDate, string ToDate, int UnitId, int AgeMin, int AgeMax, string Action)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIIUIPregnancySucessRate(FromDate, ToDate, UnitId, AgeMin, AgeMax, Action);
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
        public IHttpActionResult KPIPDF(KPIPDFVO Obj)
        {
            try
            {
                logger.Info("Controller Name:QueueMgt,Action:HttpPost,Method:GetQueueList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.KPIPDF(Obj);
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