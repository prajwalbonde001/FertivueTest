using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;
using PIVF.Entities.Models.Master.Clinic;
using Repository.Pattern.UnitOfWork;
using Repository.Pattern.Infrastructure;
using System.Data.Entity.Infrastructure;
using NLog;
using Newtonsoft.Json.Linq;
using Audit.WebApi;
using DataBaseConfiguration;
using PIVF.BusinessLayer.Master.Clinic;

namespace PIVF.Web.Api.Master.Clinic
{
    /*
  The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

  using System.Web.Http.OData.Builder;
  using System.Web.Http.OData.Extensions;
  using PIVF.Gemino.Entities.Models.Master.Clinic;
  ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
  builder.EntitySet<Department>("Department");
  config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
  */
    [Authorize]
    public class DepartmentController : ODataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();


        private readonly IDepartmentService _departmentService;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        private static Logger logger = LogManager.GetCurrentClassLogger();


        public DepartmentController(IUnitOfWorkAsync unitOfWorkAsync,
            IDepartmentService DepartmentService)
        {
            _unitOfWorkAsync = unitOfWorkAsync;
            _departmentService = DepartmentService;
        }

        //Code For Get Data
        [HttpGet]
        //  [Queryable]
        public IQueryable<Department> GetDepartment()
        {
            logger.Info("Controller Name:DepartmentController,Action:HttpGet,Method:GetDepartment,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                return _departmentService.Queryable();
            }
            catch (Exception ex)
            {
                logger.Error("DepartmentController/GetDepartment Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }

        // PUT: odata/Department(5)

        //Code For Update Data

        [HttpPut]
        [ODataRoute("PutData(DeptID={DeptID},ChangedObject={ChangedObject})")]
        [AuditApi]
        public async Task<int> Put(int DeptID, string ChangedObject, Department data)
        {
            if (!ModelState.IsValid)
            {
                return 3;
            }

            if (DeptID != data.DeptID)
            {
                return 3;
            }

            data.ObjectState = ObjectState.Modified;

            //CODE FOR Audit Trial //            
            var jobjects = ChangedObject.Split('!');
            var fobj = jobjects[0].Split(',');
            var sobj = jobjects[1].Split(',');
            var tobj = jobjects[2].Split(',');

            JArray jarray = new JArray();

            JObject jobj = new JObject(
                    new JProperty(fobj[0], fobj[1]),
                    new JProperty(sobj[0], sobj[1]),
                    new JProperty(tobj[0], tobj[1])
                );

            //OldDataValue = "{ " + OldDataValue + " }";

            jarray.Add(jobj);

            var auditScope = this.GetCurrentAuditScope();

            auditScope.SetCustomField("ChangedObjects", jarray);
            try
            {
                logger.Info("Controller Name:DepartmentController,Action:HttpPut,Method:Put,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                if (!ExistsAtUpdate(data.DeptCode, data.Description, data.DeptID,data.UpdatedUnitID = GenericSP.CurrentUser.UnitID, data.UpdatedBy = GenericSP.CurrentUser.UserID, data.UpdatedOn = Environment.MachineName, data.UpdatedDateTime = DateTime.Now, data.UpdatedUTCDateTime = DateTime.UtcNow, data.UpdateWindowsLoginName = GenericSP.CurrentUser.UserName))
                {
                    data.ObjectState = ObjectState.Modified;
                    _departmentService.Update(data);
                    await _unitOfWorkAsync.SaveChangesAsync();
                    return 1;
                }
                else
                {
                    return 2;
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DepartmentController/Put Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }

        //Code For Save Data
        // POST: odata/Department
        public async Task<int> Post(Department department)
        {
            if (!ModelState.IsValid)
            {
                return 3;
            }
            if (!departmentExists(department.DeptCode, department.Description , department.CreatedUnitID = GenericSP.CurrentUser.UnitID, department.AddedBy = GenericSP.CurrentUser.UserID, department.AddedOn = Environment.MachineName, department.AddedDateTime = DateTime.Now, department.AddedUTCDateTime = DateTime.UtcNow, department.AddedWindowsLoginName = GenericSP.CurrentUser.UserName))
            {
                department.ObjectState = ObjectState.Added;
                _departmentService.Insert(department);
            }
            else
            {
                return 2;
            }

            try
            {
                logger.Info("Controller Name:DepartmentController,Action:HttpPost,Method:Post,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                await _unitOfWorkAsync.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException ex)
            {
                logger.Error("DepartmentController/Post Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }
        //Code For Check is Exists
        private bool departmentExists(string code, string description, Int32? CreatedUnitID, Int32? AddedBy, string AddedOn, DateTime? AddedDateTime, DateTime? AddedUTCDateTime, string AddedWindowsLoginName)
        {
            logger.Info("Controller Name:DepartmentController,Action:HttpGet,Method:departmentExists,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                return _departmentService.Query(e => e.DeptCode == code || e.Description == description).Select().Any();
            }
            catch (Exception ex)
            {
                logger.Error("DepartmentController/departmentExists Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }

        }
        //Code For Check is Exists
        private bool ExistsAtUpdate(string code, string description, int key, Int32? UpdatedUnitID, Int32? UpdatedBy, string UpdatedOn,DateTime? UpdatedDateTime, DateTime? UpdatedUTCDateTime, string UpdateWindowsLoginName)
        {
            logger.Info("Controller Name:DepartmentController,Action:HttpGet,Method:ExistsAtUpdate,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                bool temp = _departmentService.Query(e => (e.DeptCode == code || e.Description == description) && (e.DeptID != key)).Select().Any();
                return temp;
            }
            catch (Exception ex)
            {
                logger.Error("DepartmentController/ExistsAtUpdate Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }
    }

}
