using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.OData;
using System.Web.OData.Query;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Repository.Pattern.UnitOfWork;
using System.Web.OData.Routing;
using Audit.Core;
using System.Collections;
using System.Data.SqlClient;
using NLog;
//using PIVF.Gemino.BusinessLayer.Master.Clinic;
using DataBaseConfiguration;
using Repository.Pattern.UnitOfWork;
using PIVF.BusinessLayer.Master.Clinic;
using PIVF.Entities.Models.Master.Clinic;

//namespace PIVF.Gemino.Web.Api.Master.Clinic
namespace PIVF.Web.Api.Master.Clinic
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using PIVF.Gemino.Entities.Models.Master.Clinic;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Staff>("Staff");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [Authorize]
    public class StaffController : ODataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        private readonly IStaffService _srvStaff;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        private static Logger logger = LogManager.GetCurrentClassLogger();
        private AuditScope auditScope;//For Audit Trial

        public StaffController(IUnitOfWorkAsync unitOfWorkAsync, IStaffService srvStaff)
        {
            _unitOfWorkAsync = unitOfWorkAsync;
            //   _srvDoctor = srvDoctor;                       
            _srvStaff = srvStaff;
        }

        public IQueryable<Staff> GetStaff(int index, string N, int DptID, string mobno, int EID, int DegID, string Qua, string Exp, string EmailID, int MID, int GId, bool PgEn)
        {
            try
            {
                logger.Info("Controller Name:StaffController,Action:HttpGet,Method:GetStaff,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                IQueryable<Staff> lstStaff = _srvStaff.GetStaffList(index, N, DptID, mobno, EID, DegID, Qua, Exp, EmailID, MID, GId, PgEn).AsQueryable();
                foreach (Staff item in lstStaff)
                {
                    if (!string.IsNullOrEmpty(Convert.ToString(item.Photo)))
                    {
                        item.PhotoString = System.Text.Encoding.UTF8.GetString(item.Photo);
                    }
                }
                foreach (Staff item in lstStaff)
                {
                    item.FirstName = item.FirstName;
                    // item.MiddleName = item.MiddleName);
                    item.LastName = item.LastName;
                }

                return lstStaff;
            }
            catch (SqlException ex)
            {
                logger.Error("StaffController/GetStaff Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                throw ex;
            }
            catch (Exception objException)
            {
                logger.Error("StaffController/GetStaff Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                throw objException;
            }
        }

        [HttpGet]
        [ODataRoute("GetDesignationList")]
        public List<Designation> GetDesignationList(bool flag)
        {
            try
            {
                logger.Info("Controller Name:StaffController,Action:HttpGet,Method:GetDesignationList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                List<Designation> lstDeg = _srvStaff.GeDesignationList();
                if (flag)
                {
                    lstDeg.Insert(0, new Designation { DegID = 0, Description = PIVF.LanguageResource.Resources.lblDesignation });   // PIVF.Gemino.LanguageResource.Resources.lblDesignation
                }
                else
                {
                    lstDeg.Insert(0, new Designation { DegID = 0, Description = PIVF.LanguageResource.Resources.lblSelect }); // PIVF.Gemino.LanguageResource.Resources.lblSelect
                }

                return lstDeg;
            }
            catch (SqlException ex)
            {
                logger.Error("StaffController/GetDesignationList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                throw ex;
            }
            catch (Exception objException)
            {
                logger.Error("StaffController/GetDesignationList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                throw objException;
            }
        }

        [HttpGet]
        [ODataRoute("GetDepartmentListForStaff")]
        public List<Department> GetDepartmentListForStaff(int UID, bool flag)
        {
            try
            {
                logger.Info("Controller Name:StaffController,Action:HttpGet,Method:GetDepartmentListForStaff,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                List<Department> lstDept = _srvStaff.GetDepartmentListForStaff(UID);
                if (flag)
                {
                    lstDept.Insert(0, new Department { DeptID = 0, Description = PIVF.LanguageResource.Resources.lblDepartment });   // PIVF.Gemino.LanguageResource.Resources.lblDepartment
                }
                else
                {
                    lstDept.Insert(0, new Department { DeptID = 0, Description = PIVF.LanguageResource.Resources.lblSelect });   // PIVF.Gemino.LanguageResource.Resources.lblSelect
                }
                return lstDept;
            }
            catch (SqlException ex)
            {
                logger.Error("StaffController/GetDepartmentListForStaff Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                throw ex;
            }
            catch (Exception objException)
            {
                logger.Error("StaffController/GetDepartmentListForStaff Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                throw objException;
            }
        }

        [HttpPost]
        //[ODataRoute("InsertUpdateDoctor")]
        [ODataRoute("StaffPost")]
        //[AuditApi]
        public IHttpActionResult StaffPost(ODataActionParameters Data)
        {
            try
            {
                logger.Info("Controller Name:StaffController,Action:HttpPost,Method:StaffPost,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                // Added  By Sandeep code For Audit Trial //
                object Obj = null;
                object Obj1 = null;
                foreach (object obj in Data.Values)
                {
                    List<Object> collection = new List<Object>((IEnumerable<Object>)obj);
                    Obj = (Staff)collection[0];
                    if (collection.Count > 1)
                    {
                        Obj1 = (Staff)collection[1];
                    }

                }
                IList AuditData = new ArrayList();
                if (Obj1 != null)
                {
                    foreach (var item in Obj.GetType().GetProperties())
                    {
                        if (!Object.Equals(item.GetValue(Obj, null), Obj1.GetType().GetProperty(item.Name).GetValue(Obj1, null)))
                        {
                            if (Obj1.GetType().GetProperty(item.Name).GetValue(Obj1, null) != null && Convert.ToString(Obj1.GetType().GetProperty(item.Name).GetValue(Obj1, null)) != "System.Byte[]")
                            {
                                AuditData.Add(item.Name + ", Old Value: " + Obj1.GetType().GetProperty(item.Name).GetValue(Obj1, null) + ", New Value: " + Obj.GetType().GetProperty(item.Name).GetValue(Obj, null));
                            }
                        }
                    }
                    //CODE FOR Audit Trial //
                    auditScope = AuditScope.Create("StaffData:Put", () => AuditData, EventCreationPolicy.Manual);
                    auditScope.Save();
                }

                Staff parameters = (Staff)Obj;
                int status = 0;
                var data = parameters;//["Numbers"];          01/01/0001 00:00:00
                Staff objStaff = new Staff();
                objStaff = (Staff)data;
                if (ModelState.IsValid)
                {
                    if (!string.IsNullOrEmpty(objStaff.PhotoString))
                    {
                        objStaff.Photo = System.Text.Encoding.UTF8.GetBytes(objStaff.PhotoString);
                    }
                    if (objStaff.DOB == Convert.ToDateTime("01/01/0001 00:00:00")) objStaff.DOB = null;
                    status = _srvStaff.InsertUpdateStaff(objStaff);
                    _unitOfWorkAsync.SaveChangesAsync();
                    if (auditScope != null)
                    {
                        auditScope.Discard();
                    }
                    return Ok(status);
                }
                else
                {
                    if (auditScope != null)
                    {
                        auditScope.Discard();
                    }
                    return Ok(status);
                }
            }
            catch (Exception ex)
            {
                if (auditScope != null)
                {
                    auditScope.Discard();
                }
                logger.Error("StaffController/StaffPost Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                throw ex;
            }

        }

        [HttpGet]
        [ODataRoute("GetStaffByID")]
        public Staff GetStaffByID(int StaffID)
        {
            try
            {
                logger.Info("Controller Name:StaffController,Action:HttpGet,Method:GetStaffByID,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                Staff ObjStaff = _srvStaff.GetStaffByID(StaffID);

                if (!string.IsNullOrEmpty(Convert.ToString(ObjStaff.Photo)))
                {
                    ObjStaff.PhotoString = System.Text.Encoding.UTF8.GetString(ObjStaff.Photo);
                }
                //if (!string.IsNullOrEmpty(Convert.ToString(ObjStaff.Signature)))
                //{
                //    ObjStaff.SignatureString = System.Text.Encoding.UTF8.GetString(ObjDoc.Signature);
                //}
                if (ObjStaff != null)
                {
                    ObjStaff.FirstName = ObjStaff.FirstName;
                    ObjStaff.MiddleName = ObjStaff.MiddleName;
                    ObjStaff.LastName = ObjStaff.LastName;
                    ObjStaff.Mobno = ObjStaff.Mobno;
                    ObjStaff.AltMobno = ObjStaff.AltMobno;
                    ObjStaff.EmailId = ObjStaff.EmailId;
                    ObjStaff.AddressLine1 = ObjStaff.AddressLine1;
                    ObjStaff.AddressLine2 = ObjStaff.AddressLine2;
                    ObjStaff.Street = ObjStaff.Street;
                    ObjStaff.LandMark = ObjStaff.LandMark;
                    ObjStaff.Pincode = ObjStaff.Pincode;
                    ObjStaff.Area = ObjStaff.Area;
                    ObjStaff.StdCode = ObjStaff.StdCode;
                    ObjStaff.LandLineNo = ObjStaff.LandLineNo;
                    ObjStaff.AltAddressLine1 = ObjStaff.AltAddressLine1;
                    ObjStaff.AltAddressLine2 = ObjStaff.AltAddressLine2;
                    ObjStaff.AltStreet = ObjStaff.AltStreet;
                    ObjStaff.AltLandMark = ObjStaff.AltLandMark;
                    ObjStaff.AltPincode = ObjStaff.AltPincode;
                    ObjStaff.AltArea = ObjStaff.AltArea;
                    ObjStaff.AltStdCode = ObjStaff.AltStdCode;
                    ObjStaff.AltLandLineNo = ObjStaff.AltLandLineNo;
                }
                return ObjStaff;
            }
            catch (SqlException ex)
            {
                logger.Error("StaffController/GetStaffByID Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                throw ex;
            }
            catch (Exception objException)
            {
                logger.Error("StaffController/GetStaffByID Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                throw objException;
            }
        }

        [HttpGet]
        [ODataRoute("ActivateDeactivateStaff")]
        public IHttpActionResult ActivateDeactivateStaff(int id, bool st, string re)
        {
            try
            {
                logger.Info("Controller Name:StaffController,Action:HttpGet,Method:ActivateDeactivateStaff,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = _srvStaff.ActivateDeactivateStaff(id, st, re);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("StaffController/ActivateDeactivateStaff Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return BadRequest();
            }
            catch (Exception objException)
            {
                logger.Error("StaffController/ActivateDeactivateStaff Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return BadRequest();
            }
        }

        [HttpGet]
        [ODataRoute("GetCityList")]
        public List<City> GetCityList(string Filter, int StateID)
        {
            logger.Info("PatientRegistrationController, Get Filter={0} StateID={1}", Filter, StateID);
            List<City> CityList = _srvStaff.GetCityList(Filter, StateID);
            CityList.Insert(0, new City { CityID = 0, CityName = "Select" });
            return CityList;
        }
        [HttpGet]
        [ODataRoute("GetStateList")]
        public List<State> GetStateList(string Filter, int CountryId)
        {
            logger.Info("PatientRegistrationController, Get Filter={0} CountryId={1}", Filter, CountryId);
            List<State> StateList = _srvStaff.GetStateList(Filter, CountryId);
            StateList.Insert(0, new State { StateID = 0, StateName = "Select" });
            return StateList;
        }
    }
}
