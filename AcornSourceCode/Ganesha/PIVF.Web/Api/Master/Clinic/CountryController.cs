using System.Data;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;
using PIVF.Entities.Models.Master.Clinic;
using Repository.Pattern.UnitOfWork;
using Repository.Pattern.Infrastructure;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;
using PIVF.BusinessLayer.Master.Clinic;

namespace PIVF.Gemino.Web.Api.Master.Clinic
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using PIVF.Gemino.Entities.Models.Master.Clinic;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Country>("Country");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [Authorize]
    public class CountryController : ODataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        private readonly ICountryService _srvCountry;
        //private readonly IStateService _srvState;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;

        public CountryController(IUnitOfWorkAsync unitOfWorkAsync, ICountryService CountryService)//, IStateService StateService
        {
            _unitOfWorkAsync = unitOfWorkAsync;
            _srvCountry = CountryService;
            //_srvState = StateService;
        }

        [HttpGet]
        //  [Queryable]
        public IQueryable<Country> GetCountry()
        {
            return _srvCountry.Queryable().OrderBy(e => e.CountryCode);
        }

        // PUT: odata/Countries(5)
        [HttpPut]
        [ODataRoute("Put(CountryId={CountryId},OldDataValue={OldDataValue})")]
        public async Task<int> Put(int CountryId, string OldDataValue, Country data)
        {
            if (!ModelState.IsValid)
            {
                return 3;
            }

            if (CountryId != data.CountryID)
            {
                return 3;
            }

            try
            {
                if (!ExistsAtUpdate(data.CountryCode, data.CountryName, data.CountryID))
                {
                    data.ObjectState = ObjectState.Modified;
                    _srvCountry.Update(data);
                    await _unitOfWorkAsync.SaveChangesAsync();
                    return 1;

                }
                else
                {
                    return 2;
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        // POST: odata/Countries
        public async Task<int> Post(Country country)
        {
            if (!ModelState.IsValid)
            {
                return 3;
            }
            if (!CountryExists(country.CountryCode, country.CountryName))
            {
                country.ObjectState = ObjectState.Added;
                _srvCountry.Insert(country);
            }
            else
            {
                return 2;
            }

            try
            {
                await _unitOfWorkAsync.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException obj)
            {
                throw;
            }
        }

        // PATCH: odata/Countries(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Country> delta)
        {
            //Validate(delta.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO: Get the entity here.

            // delta.Patch(country);

            // TODO: Save the patched entity.

            // return Updated(country);
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        // DELETE: odata/Countries(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            // TODO: Add delete logic here.

            // return StatusCode(HttpStatusCode.NoContent);
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        private bool CountryExists(string code, string desc)
        {
            return _srvCountry.Query(e => e.CountryCode == code || e.CountryName == desc).Select().Any();
        }

        private bool ExistsAtUpdate(string code, string description, int key)
        {
            bool temp = _srvCountry.Query(e => (e.CountryCode == code || e.CountryName == description) && (e.CountryID != key)).Select().Any();
            return temp;
        }
    }
}
