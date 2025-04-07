using NLog;
using PIVF.BusinessLayer.EMR.Diagnosis;
using PIVF.Entities.Models.EMR.Diagnosis;
using PIVF.Entities.Models.EMR.Dignosis;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.EMR.Dignosis
{
    [Authorize]
    public class DiagnosisAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
              
        DiagnosisBL _DiagnosisBL;
        public DiagnosisAPIController(DiagnosisBL Obj)
        {
            _DiagnosisBL = Obj;

        }
        [ResponseType(typeof(long))]
        [HttpPost]
        public IHttpActionResult SavePatientDiagnosis(List<DiagnosisVO> _DiagnosisVO)
        {
            try
            {
                var Response = _DiagnosisBL.SavePatientDiagnosis(_DiagnosisVO);
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

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SaveOtherDiagnosis(OtherDiagnosisVO _OtherDiagnosisVO)
        {
            try
            {
                var Response = _DiagnosisBL.SaveOtherDiagnosis(_OtherDiagnosisVO);
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

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SetFavourite(DiagnosisVO _DiagnosisVO)
        {
            try
            {
                var Response = _DiagnosisBL.SetFavourite(_DiagnosisVO);
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
        [HttpPost]
        public IHttpActionResult CheckIfDiagnosisAddedToPatient(List<DiagnosisVO> _DiagnosisVO)
        {
            try
            {
                var Response = _DiagnosisBL.CheckIfDiagnosisAddedToPatient(_DiagnosisVO);
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
        
        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult RemoveFavourite(long ID, long UnitID, bool IsOther, string Reason)
        {
            try
            {
                var Response = _DiagnosisBL.RemoveFavourite(ID, UnitID, IsOther, Reason);
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


        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult DeletePatientDiagnosis(long ID, long UnitID, string Reason)
        {
            try
            {
                var Response = _DiagnosisBL.DeletePatientDiagnosis(ID, UnitID, Reason);
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
        public IHttpActionResult DeleteOtherDiagnosis(long ID, long UnitID, bool IsOther, string Reason)
        {
            try
            {
                var Response = _DiagnosisBL.DeleteOtherDiagnosis(ID, UnitID, IsOther, Reason);
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

        [ResponseType(typeof(List<DiagnosisDetailsVO>))]
        [HttpGet]
        public IHttpActionResult GetPatientDiagnosis(int PageIndex)
        {
            try
            {
                var Response = _DiagnosisBL.GetPatientDiagnosis(PageIndex);
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
        [ResponseType(typeof(List<DiagnosisVO>))]
        [HttpGet]
        public IHttpActionResult FillDiagnosis(int PageIndex, string Diagnosis,int GenderID)
        {
            try
            {
                var Response = _DiagnosisBL.FillDiagnosis(PageIndex, Diagnosis, GenderID);
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
        [ResponseType(typeof(List<OtherDiagnosisVO>))]
        [HttpGet]
        public IHttpActionResult FillOtherDiagnosis(int PageIndex, string Diagnosis)
        {
            try
            {
                var Response = _DiagnosisBL.FillOtherDiagnosis(PageIndex, Diagnosis);
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
        [ResponseType(typeof(List<DiagnosisVO>))]
        [HttpGet]
        public IHttpActionResult FillFavouriteDiagnosis(int PageIndex, string Diagnosis)
        {
            try
            {
                var Response = _DiagnosisBL.FillFavouriteDiagnosis(PageIndex, Diagnosis);
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
