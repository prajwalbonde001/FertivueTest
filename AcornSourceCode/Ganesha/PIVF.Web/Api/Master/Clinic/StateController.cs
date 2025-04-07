using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Repository.Pattern.UnitOfWork;
using System.Threading.Tasks;
//using PIVF.Gemino.Repository.Pattern.Infrastructure;
using System.Data.Entity.Infrastructure;
using NLog;
using Audit.WebApi;
using Newtonsoft.Json.Linq;
//using PIVF.Gemino.BusinessLayer.Master.Clinic;
using DataBaseConfiguration;
using Repository.Pattern.UnitOfWork;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.BusinessLayer.Master.Clinic;
using Repository.Pattern.Infrastructure;

//namespace PIVF.Gemino.Web.Api.Master.Clinic
namespace PIVF.Web.Api.Master.Clinic
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using PIVF.Gemino.Entities.Models.Master.Clinic;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<State>("State");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [Authorize]
    public class StateController : ODataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        private readonly IStateService _srvState;
        private readonly ICountryService _srvCountry;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        private static Logger logger = LogManager.GetCurrentClassLogger();

        public StateController(IUnitOfWorkAsync unitOfWorkAsync, IStateService StateService, ICountryService CountryService)
        {
            _unitOfWorkAsync = unitOfWorkAsync;
            _srvState = StateService;
            _srvCountry = CountryService;
        }

        //Code For Get Data
        [HttpGet]
        //  [Queryable]
        public IQueryable<State> GetState()
        {
            logger.Info("Controller Name:StateController,Action:HttpGet,Method:GetState,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                return _srvState.Queryable().OrderBy(e => e.StateCode);
            }
            catch (Exception ex)
            {
                logger.Error("StateController/GetState Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }

        //Code For Update Data
        [HttpPut]
        [ODataRoute("PutData(StateID={StateID},ChangedObject={ChangedObject})")]
        [AuditApi]
        public async Task<int> Put(int StateID, string ChangedObject, State data)
        {
            if (!ModelState.IsValid)
            {
                return 3;
            }

            if (StateID != data.StateID)
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
                logger.Info("Controller Name:StateController,Action:HttpPut,Method:Put,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                if (!ExistsAtUpdate(data.StateCode, data.StateName, data.StateID))
                {
                    data.ObjectState = ObjectState.Modified;
                    _srvState.Update(data);
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
                logger.Error("StateController/Put Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }

        }

        //Code For Save Data
        public async Task<int> Post(State state)
        {
            if (!ModelState.IsValid)
            {
                return 3;
            }
            if (!StateExists(state.StateCode, state.StateName))
            {
                state.ObjectState = ObjectState.Added;
                _srvState.Insert(state);
            }
            else
            {
                return 2;
            }

            try
            {
                logger.Info("Controller Name:StateController,Action:HttpPost,Method:Post,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                await _unitOfWorkAsync.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException ex)
            {
                logger.Error("StateController/Post Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }

        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<State> delta)
        {
            //Validate(delta.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO: Get the entity here.

            // delta.Patch(state);

            // TODO: Save the patched entity.

            // return Updated(state);
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        public IHttpActionResult Delete([FromODataUri] int key)
        {
            // TODO: Add delete logic here.

            // return StatusCode(HttpStatusCode.NoContent);
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        //Code For Check is Exists
        private bool StateExists(string code, string desc)
        {
            try
            {
                logger.Info("Controller Name:StateController,Action:HttpGet,Method:StateExists,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                bool t = false;
                t = _srvState.Query(e => e.StateCode == code || e.StateName == desc).Select().Any();
                return t;


            }
            catch (Exception ex)
            {
                logger.Error("StateController/StateExists Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }

        }

        //Code For Check is Exists
        private bool ExistsAtUpdate(string code, string description, int key)
        {
            logger.Info("Controller Name:StateController,Action:HttpGet,Method:ExistsAtUpdate,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

            try
            {
                bool temp = _srvState.Query(e => (e.StateCode == code || e.StateName == description) && (e.StateID != key)).Select().Any();
                return temp;
            }
            catch (Exception ex)
            {
                logger.Error("StateController/ExistsAtUpdate Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }
    }
}
