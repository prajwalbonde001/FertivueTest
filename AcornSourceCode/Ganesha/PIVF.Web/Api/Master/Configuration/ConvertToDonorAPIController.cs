using NLog;
using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification;
using PIVF.Entities.Models.Master.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.Master.Configuration
{
    [Authorize]
    public class ConvertToDonorAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        IConvertToDonorBAL _Converttodonor;
        public ConvertToDonorAPIController(IConvertToDonorBAL Obj)
        {
            _Converttodonor = Obj;
        }

        [ResponseType(typeof(IEnumerable<PatientListVo>))]
        [HttpGet]
        public IHttpActionResult GetPatientList(int PageIndex,string NameCodeMRNo)
        {
            try
            {
                var Response = _Converttodonor.GetPatientList(PageIndex, NameCodeMRNo);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(long))]
        [HttpGet]
        public IHttpActionResult ConvertToDonorPatient(long PatientID, int GenderID)
        {
            try
            {
                var Response = _Converttodonor.ConvertToDonorPatient(PatientID, GenderID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }
    }
}
