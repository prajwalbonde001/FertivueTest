using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.Http.OData.Routing;
using Repository.Pattern.UnitOfWork;
using System.Web.OData.Routing;
using NLog;
using System.Web;
using System.Web.Http.Description;
using System.Web.Http.Results;
using DataBaseConfiguration;
using System.Data.SqlClient;
using PIVF.Entities;
using PIVF.Entities.Models.Clinic;

namespace PIVF.Web.Api.Clinic
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using PIVF.Gemino.Entities.Models.Clinic;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Schedule>("Schedule");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [Authorize]
    public class ScheduleController : ODataController
    {


        private PIVFContext db = new PIVFContext();
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        private readonly DataAccessLayer.Clinic.ScheduleService _ScheduleService;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        private static Logger logger = LogManager.GetCurrentClassLogger();
        string hoursBuilder, minutesBuilder;

        public ScheduleController(IUnitOfWorkAsync unitOfWorkAsync, DataAccessLayer.Clinic.ScheduleService ScheduleService)
        {
            _unitOfWorkAsync = unitOfWorkAsync;
            _ScheduleService = ScheduleService;
        }


        
        [HttpGet]
        public IQueryable<Schedule> GetSchedule()
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                IQueryable<Schedule> LstOfschedule = _ScheduleService.ScheduleList();
                return LstOfschedule;
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw;
            }

        }
        
        //Added by Nayan Kamble on 21/11/2019
        [HttpGet]
        [ODataRoute("GetSlotMaster")]
        public List<Schedule> GetSlotMaster()
        {
            List<Schedule> ObjDoc = _ScheduleService.GetSlotMaster();
            logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
            return ObjDoc;           
        }
        //END


        [HttpGet]
        [ODataRoute("GetScheduleListByDoctorID")]
        public IQueryable<Schedule> GetScheduleListByDoctorID(int doctorID, DateTime scheduleDate)
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                IQueryable<Schedule> LstOfschedule = _ScheduleService.GetScheduleListByDoctorID(doctorID, scheduleDate);
                return LstOfschedule;

            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw;
            }

        }

        [HttpGet]
        [ODataRoute("GetScheduleListLanding")]
        public IQueryable<Schedule> GetScheduleListLanding(int PageIndex, DateTime ScheduleDate, int DOCID, int DeptId, int ScheduleUnitID, String ScheduleType)

        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                IQueryable<Schedule> LstOfschedule = _ScheduleService.GetScheduleListLanding(PageIndex, ScheduleDate, DOCID, DeptId, ScheduleUnitID, ScheduleType);
                return LstOfschedule;
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);

                throw;
            }

        }

        [HttpGet]
        [ODataRoute("GetDoctorScheduleDates")]
        public IQueryable<Schedule> GetDoctorScheduleDates(int DOCID)
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                IQueryable<Schedule> LstOfschedule = _ScheduleService.GetDoctorScheduleDates(DOCID);
                return LstOfschedule;
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw;
            }

        }


        ////Audit
        //[HttpPost]
        //[AuditApi]
        //public IHttpActionResult ScheduleAudit(List<AuditDTO> RoleAudit)
        //{

        //    logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
        //    HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
        //    ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
        //    try
        //    {
        //        if (RoleAudit != null)
        //        {
        //            JArray auditArray = new JArray();
        //            var auditScope = this.GetCurrentAuditScope();
        //            var auditdata = RoleAudit as IEnumerable<PIVF.Web.Models.DTO.Audit.AuditDTO>;
        //            foreach (var auditobj in auditdata)
        //            {
        //                auditArray.Add(JObject.FromObject(auditobj));
        //            }
        //            auditScope.SetCustomField("ChangedObjects", auditdata);
        //        }
        //        return Ok(0);
        //    }
        //    catch (Exception ex)
        //    {
        //        logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
        //       + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
        //       ex.Message, ex.StackTrace);
        //        throw ex;
        //    }

        //}


        [HttpGet]
        [ODataRoute("GetDepartmentsByID")]
        public List<Schedule> GetDepartmentsByID(int DOCID)
        {
            try
            {
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                List<Schedule> LstOfschedule = _ScheduleService.GetDepartmentsByID(DOCID);
                LstOfschedule.Insert(0, new Schedule { DeptID = 0, Description = PIVF.LanguageResource.Resources.lblSelect });

                return LstOfschedule;
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);

                throw;
            }

        }

        [HttpPut]
        // PUT: odata/Schedule(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<Schedule> delta)
        {
            //Validate(delta.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO: Get the entity here.

            // delta.Put(doctor);

            // TODO: Save the patched entity.

            // return Updated(doctor);
            return StatusCode(HttpStatusCode.NotImplemented);
        }


        [HttpPost]
        // POST: odata/Schedule
        public async Task<IHttpActionResult> Post(Schedule schedule)
        {
            try
            {
                var data = schedule;
                Int32 ResultStatus = 0;
                Schedule objSch = new Schedule();
                objSch = (Schedule)data;
                if (ModelState.IsValid)
                {

                    ResultStatus = _ScheduleService.UpdateSchedule(objSch);
                    //_unitOfWorkAsync.SaveChangesAsync();
                    return Ok(ResultStatus);
                }
                else
                {
                    return Ok(3);
                }
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpPost]
        [ODataRoute("AddDoctorScheduleDetails")]
        public async Task<IHttpActionResult> AddDoctorSchedule(Schedule schedule)
        {
            try
            {
                var data = schedule;
                Int32 ResultStatus = 0;
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                Schedule objSch = new Schedule();
                objSch = (Schedule)data;
                if (ModelState.IsValid)
                {
                    ResultStatus = _ScheduleService.AddDoctorScheduleDetails(objSch);
                    return Ok(ResultStatus);


                }
                else
                {
                    return Ok(3);
                }
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw ex;
            }
        }


        [HttpPost]
        [ODataRoute("AddScheduleDetail")]
        public async Task<IHttpActionResult> AddScheduleDetail(Schedule schedule)
        {
            try
            {
                var data = schedule;
                Int32 ResultStatus = 0;
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                Schedule objSch = new Schedule();
                objSch = (Schedule)data;
                if (ModelState.IsValid)
                {
                    ResultStatus = _ScheduleService.AddScheduleDetail(objSch);
                    return Ok(ResultStatus);


                }
                else
                {
                    return Ok(3);
                }
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw ex;
            }
        }


        [HttpPost]
        [ODataRoute("AddDoctorScheduleMaster")]
        public async Task<IHttpActionResult> AddDoctorScheduleMaster(Schedule schedule)
        {
            try
            {
                var data = schedule;
                Int32 ResultStatus = 0;
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                Schedule objSch = new Schedule();
                objSch = (Schedule)data;
                if (ModelState.IsValid)
                {

                    ResultStatus = _ScheduleService.AddDoctorScheduleMaster(objSch);
                    return Ok(ResultStatus);
                }
                else
                {
                    return Ok(3);
                }
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpPut]
        [ODataRoute("UpdateDoctorSchedule")]
        public async Task<IHttpActionResult> UpdateDoctorSchedule(Schedule schedule)
        {
            try
            {
                var data = schedule;
                Int32 ResultStatus = 0;
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                Schedule objSch = new Schedule();
                objSch = (Schedule)data;
                if (ModelState.IsValid)
                {

                    ResultStatus = _ScheduleService.UpdateDoctorSchedule(objSch);
                    return Ok(ResultStatus);
                }
                else
                {
                    return Ok(3);
                }
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw ex;
            }
        }


        [HttpPut]
        [ODataRoute("UpdateDSStatusLanding")]
        public async Task<IHttpActionResult> UpdateDSStatusLanding(Schedule schedule)
        {
            try
            {
                var data = schedule;
                Int32 ResultStatus = 0;
                logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
                Schedule objSch = new Schedule();
                objSch = (Schedule)data;
                if (ModelState.IsValid)
                {

                    ResultStatus = _ScheduleService.UpdateDSStatusLanding(objSch);
                    return Ok(ResultStatus);
                }
                else
                {
                    return Ok(3);
                }
            }
            catch (Exception ex)
            {
                logger.Error("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",/Action: " + HttpContext.Current.Request.HttpMethod + " Message{0}, StackTrace", ex.Message, ex.StackTrace);
                throw ex;
            }
        }


        // PATCH: odata/Schedule(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] string key, Delta<Schedule> delta)
        {
            //Validate(delta.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO: Get the entity here.

            // delta.Patch(schedule);

            // TODO: Save the patched entity.

            // return Updated(schedule);
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        // DELETE: odata/Schedule(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] string key)
        {
            // TODO: Add delete logic here.

            // return StatusCode(HttpStatusCode.NoContent);
            return StatusCode(HttpStatusCode.NotImplemented);
        }


        


    }
}
