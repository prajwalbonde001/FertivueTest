using NLog;
using PIVF.BusinessLayer.Consent.ConsentMaster;
using PIVF.Entities.Models.Consent.ConsentMaster;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.Consent.ConsentMaster
{
    [Authorize]
    public class ConsentMasterAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        ConsentMasterBL ObjSrv;
        public ConsentMasterAPIController(ConsentMasterBL obj)
        {
            ObjSrv = obj;
        }
        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SaveConsent(ConsentMasterVO ConsentDetails)
        {
            try
            {
                var Response = ObjSrv.SaveConsent(ConsentDetails);
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
        [ResponseType(typeof(List<ConsentMasterVO>))]
        [HttpGet]
        public IHttpActionResult GetConsentList(long ARTTypeID, long ARTSubTypeID, int CurrentPage,string Code)
        {
            try
            {
                var Response = ObjSrv.GetConsentList(ARTTypeID, ARTSubTypeID, CurrentPage, Code);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        
        [ResponseType(typeof(ConsentMasterVO))]
        [HttpGet]
        public IHttpActionResult GetConsentByID(long ID)
        {
            try
            {
                var Response = ObjSrv.GetConsentByID(ID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult ActivateDeactivateConsent(int ID,string reason)
        {
            try
            {
                var Response = ObjSrv.ActivateDeactivateConsent(ID,reason);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
    }
}
