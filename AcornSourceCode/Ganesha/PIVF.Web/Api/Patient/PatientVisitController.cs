using Audit.WebApi;
using DataBaseConfiguration;
using Newtonsoft.Json.Linq;
using NLog;
using PIVF.DataAccessLayer.Patient;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Patient;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
namespace PIVF.Web.Api.Patient
{
    public class PatientVisitController : ApiController
    {
        PatientVisitService PatVisitSer = new PatientVisitService();
        private static Logger logger = LogManager.GetCurrentClassLogger();

        [ResponseType(typeof(PatientVisit))]
        [HttpGet]

        //public IHttpActionResult GetPatientDetails(string Criteria, bool IsAppSearch)//Commented by AniketK on 28Nov2019
        public IHttpActionResult GetPatientDetails(string Criteria, bool IsAppSearch, int RegUnitID)//Added by AniketK on 28Nov2019
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                //var Response = PatVisitSer.GetPatientDetails(Criteria, IsAppSearch);//Commented by AniketK on 28Nov2019
                var Response = PatVisitSer.GetPatientDetails(Criteria, IsAppSearch, RegUnitID);//Added by AniketK on 28Nov2019
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(IEnumerable<VisitType>))]
        [HttpGet]
        public IHttpActionResult GetDDVisitTypeList()
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetDDVisitTypeList();
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(IEnumerable<Cabin>))]
        [HttpGet]
        public IHttpActionResult GetDDCabinList()
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetDDCabinList();
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(IEnumerable<Doctor>))]
        [HttpGet]
        public IHttpActionResult GetDoctorList()
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetDoctorList();
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(PatientVisit))]
        [HttpGet]
        public IHttpActionResult GetPayersDD()
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetPayersDD();
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(IEnumerable<PatientVisit>))]
        [HttpGet]
        public IHttpActionResult GetPatientCatBySrcID(int CatL1ID)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetPatientCatBySrcID(CatL1ID);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(List<PatientVisit>))]
        [HttpGet]
        public IHttpActionResult LoadRelationList(string Gender)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.LoadRelationList(Gender);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(IEnumerable<PatientVisit>))]
        [HttpGet]
        public IHttpActionResult GetAssCompany(int CompID)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetAssCompany(CompID);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(IEnumerable<PatientVisit>))]
        [HttpGet]
        public IHttpActionResult GetTariffByAssCompany(int CompAssID)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetTariffByAssCompany(CompAssID);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(IEnumerable<PatientVisit>))]
        [HttpGet]
        public IHttpActionResult GetVisits(int RegID, int RegUnitID, int PageIndex)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetVisits(RegID, RegUnitID, PageIndex);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(IEnumerable<PatientVisit>))]
        [HttpGet]
        public IHttpActionResult GetSponsers(int RegID, int PageIndex)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetSponsers(RegID, PageIndex);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpPost]
        public IHttpActionResult SaveVisit([FromBody] PatientVisit data)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
             HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
             ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                DataTable dtSponser = new DataTable();
                dtSponser.Columns.Add("Id");
                dtSponser.Columns.Add("VisitID");
                dtSponser.Columns.Add("VisitUnitId");
                dtSponser.Columns.Add("CatL2ID");
                dtSponser.Columns.Add("CompAssID");
                dtSponser.Columns.Add("CreditLimit");
                dtSponser.Columns.Add("VFromDate");
                dtSponser.Columns.Add("VToDate");
                dtSponser.Columns.Add("TID");
                dtSponser.Columns.Add("IsStaffDiscount");
                dtSponser.Columns.Add("StaffRelationID");
                dtSponser.Columns.Add("Remark");
                dtSponser.Columns.Add("SponserStatus");
                dtSponser.Columns.Add("PatientCategoryID");
                dtSponser.Columns.Add("PatientSourceID");
                dtSponser.Columns.Add("CompanyID");

                int cnt = 1;
                if (data.lstSponserForSave.Count > 0)
                {
                    foreach (var Sponser in data.lstSponserForSave)
                    {
                        DataRow dr = dtSponser.NewRow();
                        dr["Id"] = cnt;
                        dr["VisitID"] = Sponser.VisitID;
                        dr["VisitUnitId"] = Sponser.VisitUnitId;
                        dr["CatL2ID"] = Sponser.CatL2ID;
                        dr["CompAssID"] = Sponser.CompAssID;
                        dr["CreditLimit"] = Sponser.CreditLimit;
                        dr["VFromDate"] = Sponser.VFromDate;
                        dr["VToDate"] = Sponser.VToDate;
                        dr["TID"] = Sponser.TID;
                        dr["IsStaffDiscount"] = Sponser.IsStaffDiscount;
                        dr["StaffRelationID"] = Sponser.RelationId;
                        dr["Remark"] = Sponser.Remark;
                        dr["SponserStatus"] = Sponser.SponserStatus;
                        dr["PatientCategoryID"] = Sponser.CatL1ID;
                        dr["PatientSourceID"] = Sponser.CatL2ID;
                        dr["CompanyID"] = Sponser.CompID;

                        dtSponser.Rows.Add(dr);
                        cnt++;
                    }
                }

                if (data.lstPatientForSave.Count > 0)
                {
                    foreach (var Bank in data.lstPatientForSave)
                    {
                        data.BankID = Bank.BankID;
                        data.BranchName = Bank.BranchName;
                        data.IFSCCode = Bank.IFSCCode;
                        data.AccoutType = Bank.AccoutType;
                        data.AccountNo = Bank.AccountNo;
                        data.CustName = Bank.CustName;
                        data.Status = true;


                    }
                }

                var Response = PatVisitSer.SaveVisit(data, dtSponser);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [ResponseType(typeof(string))]
        [HttpGet]
        public IHttpActionResult GetTokenNo(int CabinID)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = PatVisitSer.GetTokenNo(CabinID);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        //[HttpPost]
        //[AuditApi]
        //public IHttpActionResult VisitAudit(List<AuditDTO> VisitAudit)
        //{

        //    logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
        //    HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
        //    ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
        //    try
        //    {
        //        if (VisitAudit != null)
        //        {
        //            JArray auditArray = new JArray();
        //            var auditScope = this.GetCurrentAuditScope();
        //            var auditdata = VisitAudit as IEnumerable<AuditDTO>;
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

        //Added by Nayan Kamble on 19/11/2019   START        
        [ResponseType(typeof(string))]
        [HttpPost]
        public IHttpActionResult SaveExternalDoc( Doctor data)     /*[FromBody]*/
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
             HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
             ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

            try {
                var Response = PatVisitSer.SaveExternalDoc(data);
                return Ok(Response);

            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }
            //Added by Nayan Kamble on 19/11/2019  END








        }
}
