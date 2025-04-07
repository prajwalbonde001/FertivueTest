using NLog;
using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation.OocyteVitrification;
using PIVF.BusinessLayer.EMR.Diagnosis;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.ARTMgmt.Cryo_Preservation.OocyteVitrification
{
    public class IVF_VitrificationAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        IVF_VitrificationBL _IVF_VitrificationBL;
        public IVF_VitrificationAPIController(IVF_VitrificationBL Obj)
        {
            _IVF_VitrificationBL = Obj;
        }
        [ResponseType(typeof(long))]
        [HttpPost]
        public IHttpActionResult UpdateVitriDetails(IVF_VitrificationVO _IVF_VitrificationVO)
        {
            try
            {
                var Response = _IVF_VitrificationBL.UpdateVitriDetails(_IVF_VitrificationVO);
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

        [ResponseType(typeof(IVF_VitrificationVO))]
        [HttpGet]
        public IHttpActionResult GetVitriDetails(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID, long UnitID)
        {
            try
            {
                var Response = _IVF_VitrificationBL.GetVitriDetails(PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID, UnitID);
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
