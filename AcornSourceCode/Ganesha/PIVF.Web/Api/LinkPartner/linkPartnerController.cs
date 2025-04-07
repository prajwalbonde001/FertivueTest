using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PIVF.BusinessLayer.LinkPartner;

using System.Web.Http.Description;
using System.Web.Http.Results;
using PIVF.BusinessLayer.EMR.DesignEMR;
using PIVF.Entities.Models.LinkPartner;
using PIVF.Entities.Models.Patient;
using DataBaseConfiguration;
using NLog;
using System.Data.SqlClient;

namespace PIVF.Web.Api.LinkPartner
{
    public class linkPartnerController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        LinkPartnerBAL ObjSrv;
        public linkPartnerController(LinkPartnerBAL Obj)
        {
            ObjSrv = Obj;
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult linkPartner(LinkPartnerVO linkPartnerObj)
        {
            try
            {
                var Response = ObjSrv.linkPartner(linkPartnerObj);
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
        public IHttpActionResult linkDonor(int patientId,int UnitId,int GenderId,string Action)
        {   
            try
            {
                var Response = ObjSrv.linkDonor(patientId,UnitId,GenderId,Action);
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
