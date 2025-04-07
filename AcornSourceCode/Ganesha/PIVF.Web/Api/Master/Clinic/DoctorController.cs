using Audit.WebApi;
using DataBaseConfiguration;
using Newtonsoft.Json.Linq;
using NLog;
using PIVF.BusinessLayer.Master.Clinic;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Models.Master.Patient;
using Repository.Pattern.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;

namespace PIVF.Web.Api.Master.Clinic
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using PIVF.Gemino.Entities.Models.Master.Clinic;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Doctor>("Doctor");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [Authorize]
    public class DoctorController : ODataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        private readonly IDoctorService _srvDoctor;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        private static Logger logger = LogManager.GetCurrentClassLogger();
        //private AuditScope auditScope;//For Audit Trial


        public DoctorController(IUnitOfWorkAsync unitOfWorkAsync, IDoctorService srvDoctor)
        {
            _unitOfWorkAsync = unitOfWorkAsync;
            _srvDoctor = srvDoctor;
        }
        public IQueryable<Doctor> GetDoctor(int PageIndex, string FirstName, string Mobno, int SID,
                                            int DoctorTypeID, int SuID, int CFID, int UnitID,
                                            string EmailId, string RegestrationNumber,
                                            string Education, string Experience, int GenderId, int BDMID,
                                            int DocCatID, bool PagingEnabled)
        {

            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

            try
            {
                IQueryable<Doctor> lstDoc = _srvDoctor.GetDoctorsList(PageIndex, FirstName, Mobno, SID, DoctorTypeID,
                                                                         SuID, CFID, UnitID, EmailId, RegestrationNumber,
                                                                         Education, Experience, GenderId, BDMID, DocCatID, PagingEnabled);
                foreach (Doctor item in lstDoc)
                {
                    //  item.FirstName = item.FirstName);
                    // item.LastName = item.LastName);
                    item.FullName = item.FirstName + " " + item.LastName;
                }
                return lstDoc;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("GetDDGenderList")]
        public List<Entities.Mapping.Clinic.Gender> GetDDGenderList(bool IsListing)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<Entities.Mapping.Clinic.Gender> lstGender = _srvDoctor.GetDDGenderList();
                if (IsListing)
                {
                    lstGender.Insert(0, new Entities.Mapping.Clinic.Gender { GenderId = 0, GenderDescription = PIVF.LanguageResource.Resources.lblGender });
                }
                else
                {
                    lstGender.Insert(0, new Entities.Mapping.Clinic.Gender { GenderId = 0, GenderDescription = PIVF.LanguageResource.Resources.lblSelect });
                }

                return lstGender;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("GetDDMaritalStatusList")]
        public List<MaritalStatus> GetDDMaritalStatusList(bool IsListing)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
             HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
             ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<MaritalStatus> lstMaritalStatus = _srvDoctor.GetDDMaritalStatusList();
                if (IsListing)
                {
                    lstMaritalStatus.Insert(0, new MaritalStatus { MaritalStatusId = 0, MSDescription = PIVF.LanguageResource.Resources.lblMarryStatus });
                }
                else
                {
                    lstMaritalStatus.Insert(0, new MaritalStatus { MaritalStatusId = 0, MSDescription = PIVF.LanguageResource.Resources.lblSelect });
                }
                return lstMaritalStatus;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                  + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                  ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("GetDDDoctorTypeList")]
        public List<DoctorType> GetDDDoctorTypeList(bool IsListing)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
             HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
             ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<DoctorType> lstDoctorType = _srvDoctor.GetDDDoctorTypeList();
                if (IsListing)
                {
                    lstDoctorType.Insert(0, new DoctorType { DocTypeID = 0, DocTypeDescription = PIVF.LanguageResource.Resources.lblDocType });
                }
                else
                {
                    lstDoctorType.Insert(0, new DoctorType { DocTypeID = 0, DocTypeDescription = PIVF.LanguageResource.Resources.lblSelect });
                }
                return lstDoctorType;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                 + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                 ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("GetDDDoctorCategoryList")]
        public List<DoctorCategory> GetDDDoctorCategoryList(bool IsListing)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<DoctorCategory> lstDoctorCategory = _srvDoctor.GetDDDoctorCategoryList();
                if (IsListing)
                {
                    lstDoctorCategory.Insert(0, new DoctorCategory { DocCatID = 0, Description = PIVF.LanguageResource.Resources.lblDocCategory });
                }
                else
                {
                    lstDoctorCategory.Insert(0, new DoctorCategory { DocCatID = 0, Description = PIVF.LanguageResource.Resources.lblSelect });
                }
                return lstDoctorCategory;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("GetDDSpecializationList")]
        public List<Specialization> GetDDSpecializationList(bool IsListing)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<Specialization> lstSpecialization = _srvDoctor.GetDDSpecializationList();
                if (IsListing)
                {
                    lstSpecialization.Insert(0, new Specialization { SID = 0, Description = PIVF.LanguageResource.Resources.lblSpecialization });
                }
                else
                {
                    lstSpecialization.Insert(0, new Specialization { SID = 0, Description = PIVF.LanguageResource.Resources.lblSelect });
                }

                return lstSpecialization;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                 + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                 ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("GetSubSpecBySID")]
        public List<SubSpecialization> GetSubSpecBySID(int SID, bool IsListing)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<SubSpecialization> lstSubSpecialization = _srvDoctor.GetSubSpecBySID(SID, IsListing);
                if (IsListing)
                {
                    lstSubSpecialization.Insert(0, new SubSpecialization { SID = 0, Description = PIVF.LanguageResource.Resources.lblSubSpecialization });
                }
                else
                {
                    lstSubSpecialization.Insert(0, new SubSpecialization { SID = 0, Description = PIVF.LanguageResource.Resources.lblSelect });
                }
                return lstSubSpecialization;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                 + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                 ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("CalculateAge")]
        public IHttpActionResult CalculateAge(DateTime DOB)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = _srvDoctor.CalculateAge(DOB);
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

        [HttpGet]
        [ODataRoute("GetCountryCode")]
        public List<Country> GetCountryCode(string Filter, bool Flag)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<Country> lstCountry = _srvDoctor.GetCountryCode(Filter, Flag);
                if (Flag == true)
                {
                    lstCountry.Insert(0, new Country { CountryID = 0, CountryName = PIVF.LanguageResource.Resources.lblSelect });
                }
                return lstCountry;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("GetDepartmentListForDoc")]
        public List<DepartmentListForDoc> GetDepartmentListForDoc()
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<DepartmentListForDoc> ListForDoc = _srvDoctor.GetDepartmentListForDoc();
                //ListForDoc.Insert(0, new DepartmentListForDoc { DeptID = 0,  Description= "--Select--" });

                return ListForDoc;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

        [HttpGet]
        [ODataRoute("GetDDClassificationList")]
        public List<Classification> GetDDClassificationList(int ConsiderSelect)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                if (ConsiderSelect == 0)
                {
                    List<Classification> lstClassification = _srvDoctor.GetDDClassificationList();
                    return lstClassification;
                }
                else
                {
                    List<Classification> lstClassification = _srvDoctor.GetDDClassificationList();
                    lstClassification.Insert(0, new Classification { CFID = 0, Description = PIVF.LanguageResource.Resources.lblClassification });
                    return lstClassification;
                }
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
        [AuditApi]
        [ODataRoute("DoctorAudit")]
        public IHttpActionResult DoctorAudit(ODataActionParameters DoctorAudit)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                #region Audit Trail
                JArray jarray = new JArray();
                foreach (KeyValuePair<string, object> item in DoctorAudit)
                {
                    //List<AuditDTO> obj = (List<AuditDTO>)(item.Value);
                    foreach (AuditDTO feedback in (IEnumerable<AuditDTO>)item.Value)
                    {
                        JObject jobj = new JObject(
                                new JProperty("field", feedback.field),
                                new JProperty("oldvalue", feedback.oldvalue),
                                new JProperty("newvalue", feedback.newvalue)
                            );
                        jarray.Add(jobj);
                    }
                }
                var auditScope = this.GetCurrentAuditScope();
                auditScope.SetCustomField("ChangedObjects", jarray);
                #endregion

                return Ok(0);
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
        [ODataRoute("Post")]
        public IHttpActionResult Post(ODataActionParameters Data)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                object Obj = null;
                object Obj1 = null;
                foreach (object obj in Data.Values)
                {
                    List<Object> collection = new List<Object>((IEnumerable<Object>)obj);
                    Obj = (Doctor)collection[0];
                    if (collection.Count > 1)
                    {
                        Obj1 = (Doctor)collection[1];
                    }

                }
                Doctor parameters = (Doctor)Obj;
                var data = parameters;
                Int32 ResultStatus = 0;
                Doctor objDoc = new Doctor();
                objDoc = (Doctor)data;
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(objDoc.SignatureString))
                    {
                        objDoc.Signature = System.Text.Encoding.UTF8.GetBytes(objDoc.SignatureString);
                    }
                    if (!string.IsNullOrEmpty(objDoc.PhotoString))
                    {
                        objDoc.Photo = System.Text.Encoding.UTF8.GetBytes(objDoc.PhotoString);
                    }
                    ResultStatus = _srvDoctor.InsertUpdateDoctor(objDoc);
                    _unitOfWorkAsync.SaveChangesAsync();
                    return Ok(ResultStatus);
                }
                else
                {
                    return Ok(3);
                }
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                 + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                 ex.Message, ex.StackTrace);
                throw ex;
            }

        }






        [HttpGet]
        [ODataRoute("GetSpecificDoctor")]
        public Doctor GetSpecificDoctor(int DOCID)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                Doctor ObjDoc = _srvDoctor.GetSpecificDoctor(DOCID);

                if (!string.IsNullOrEmpty(Convert.ToString(ObjDoc.Photo)))
                {
                    ObjDoc.PhotoString = System.Text.Encoding.UTF8.GetString(ObjDoc.Photo);
                }
                if (!string.IsNullOrEmpty(Convert.ToString(ObjDoc.Signature)))
                {
                    ObjDoc.SignatureString = System.Text.Encoding.UTF8.GetString(ObjDoc.Signature);
                }

                if (ObjDoc != null)
                {
                    ObjDoc.FirstName = ObjDoc.FirstName;
                    ObjDoc.MiddleName = ObjDoc.MiddleName;
                    ObjDoc.LastName = ObjDoc.LastName;
                    ObjDoc.Mobno = ObjDoc.Mobno;
                    ObjDoc.AltMobno = ObjDoc.AltMobno;
                    ObjDoc.Address1 = ObjDoc.Address1;
                    ObjDoc.Address2 = ObjDoc.Address2;
                    ObjDoc.AltAddress1 = ObjDoc.AltAddress1;
                    ObjDoc.AltAddress2 = ObjDoc.AltAddress2;

                    ObjDoc.Street = ObjDoc.Street;
                    ObjDoc.AltStreet = ObjDoc.AltStreet;

                    ObjDoc.LandMark = ObjDoc.LandMark;
                    ObjDoc.AltLandMark = ObjDoc.AltLandMark;

                    ObjDoc.PinCode = ObjDoc.PinCode;
                    ObjDoc.AltPinCode = ObjDoc.AltPinCode;



                    ObjDoc.Area = ObjDoc.Area;
                    ObjDoc.AltArea = ObjDoc.AltArea;

                    ObjDoc.StdCode = ObjDoc.StdCode;
                    ObjDoc.LandLineNo = ObjDoc.LandLineNo;
                    ObjDoc.AltStdCode = ObjDoc.AltStdCode;
                    ObjDoc.AltLandLineNo = ObjDoc.AltLandLineNo;
                    ObjDoc.EmailId = ObjDoc.EmailId;
                    ObjDoc.RegestrationNumber = ObjDoc.RegestrationNumber;


                }

                return ObjDoc;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                 + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                 ex.Message, ex.StackTrace);
                throw ex;
            }
        }


        [HttpGet]
        [ODataRoute("GetDoctDetailByName")]
        public Doctor GetDoctDetailByName(int DOCID)
        {
            logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
            Doctor ObjDoc = _srvDoctor.GetDoctDetailByName(DOCID);

            if (!string.IsNullOrEmpty(Convert.ToString(ObjDoc.Photo)))
            {
                ObjDoc.PhotoString = System.Text.Encoding.UTF8.GetString(ObjDoc.Photo);
            }
            if (!string.IsNullOrEmpty(Convert.ToString(ObjDoc.Signature)))
            {
                ObjDoc.SignatureString = System.Text.Encoding.UTF8.GetString(ObjDoc.Signature);
            }

            return ObjDoc;
        }


        [HttpGet]
        [ODataRoute("GetDoctDetailByName")]
        public Doctor GetDoctDetailByName(string doctorName)
        {
            int DOCID = Convert.ToInt32(doctorName);
            logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
            Doctor ObjDoc = _srvDoctor.GetDoctDetailByName(DOCID);

            if (!string.IsNullOrEmpty(Convert.ToString(ObjDoc.Photo)))
            {
                ObjDoc.PhotoString = System.Text.Encoding.UTF8.GetString(ObjDoc.Photo);
            }
            if (!string.IsNullOrEmpty(Convert.ToString(ObjDoc.Signature)))
            {
                ObjDoc.SignatureString = System.Text.Encoding.UTF8.GetString(ObjDoc.Signature);
            }

            return ObjDoc;
        }

        [HttpGet]
        [ODataRoute("GetAllDoctorNames")]
        public List<Doctor> GetAllDoctorNames(string doctorName)
        {
            List<Doctor> ObjDoc = _srvDoctor.GetAllDoctorNames(doctorName);
            logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
            return ObjDoc;
        }


        [HttpGet]
        [ODataRoute("GetDayMaster")]
        public List<Doctor> GetDayMaster()
        {
            List<Doctor> ObjDoc = _srvDoctor.GetDayMaster();
            logger.Info("Controller Name: " + this.ControllerContext.RouteData.Values["controller"].ToString() + ",Action: " + HttpContext.Current.Request.HttpMethod + ",Method: " + this.ControllerContext.RouteData.Values["action"].ToString() + ",User: " + GenericSP.CurrentUser.LoginName + ",UnitID:" + GenericSP.CurrentUser.UnitID);
            return ObjDoc;
        }

        [HttpGet]
        [ODataRoute("GetDDUnitList")]
        public List<Unit> GetDDUnitList(bool IsListing)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                List<Unit> lstUnit = _srvDoctor.GetDDUnitList();
                if (IsListing)
                {
                    lstUnit.Insert(0, new Unit { UnitID = 0, UnitName = PIVF.LanguageResource.Resources.lblClinic });
                }
                else
                {
                    lstUnit.Insert(0, new Unit { UnitID = 0, UnitName = PIVF.LanguageResource.Resources.lblSelect });
                }

                return lstUnit;
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
                + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
                ex.Message, ex.StackTrace);
                throw ex;
            }
        }

    }
}