using DataBaseConfiguration;
using Newtonsoft.Json.Linq;
using NLog;
using PIVF.BusinessLayer.Common;
using PIVF.Entities.Models.Billing;
using PIVF.Entities.Models.Dashboard;
using PIVF.Entities.Models.Donor;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Models.Master.IVF;
using PIVF.Entities.Models.Patient;
//using PIVF.Service;
//using PIVF.Service.Master.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using System.Web.Script.Serialization;

namespace PIVF.Web.Api.Master.Common
{
    [Authorize]
    public class CommonController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        //CommonService srv = new CommonService();
        CommonServiceBAL srv;
        public CommonController(CommonServiceBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetMasterList(string tblNm, string id, string desc)
        {
            try
            {
                //logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUnitList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetMasterList(tblNm, id, desc);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                // logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                // logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(List<clsPatientVO>))]
        [HttpGet]
        public IHttpActionResult GetPatientList(long UnitID, long PatientCategory)
       {
            try
            {
                var Response = srv.GetPatientList(UnitID, PatientCategory);
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

        //sujata
        [ResponseType(typeof(List<clsPatientVO>))]
        [HttpGet]
        public IHttpActionResult GetPatientListforLab()
        {
            try
            {
                var Response = srv.GetPatientListforLab();
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



        [ResponseType(typeof(List<clsPatientVO>))]
        [HttpGet]
        public IHttpActionResult GetPartnerList(long UnitID, long PatientCategory,int GenderId)
        {
            try
            {
                var Response = srv.GetPartnerList(UnitID, PatientCategory,GenderId);
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

        [ResponseType(typeof(clsCoupleVO))]
        [HttpGet]
        public IHttpActionResult GetCoupleDetails(string SelectedPatient)  //by rohini
        {
            try
            {
                clsPatientVO objPatient = new JavaScriptSerializer().Deserialize<clsPatientVO>(SelectedPatient);
                clsCoupleVO Obj = new clsCoupleVO();
                Obj = srv.GetCoupleDetails(objPatient.UnitID, objPatient.ID);
                //Begin:: Added by AniketK on 23Aug2019 To Get Image from Server Location  
                //string RegImgIP = ConfigurationManager.AppSettings["RegImgIP"].ToString();
                //string ImgSavingLocation1 = ConfigurationManager.AppSettings["ImgSavingLocation1"].ToString();
                //string ImgVirtualDir = ConfigurationManager.AppSettings["RegImgVirtualDir"].ToString();

                string NewRegistrationImgIP = ConfigurationManager.AppSettings["NewRegistrationImgIP"].ToString();
                string NewRegistrationImgVirtualDir = ConfigurationManager.AppSettings["NewRegistrationImgVirtualDir"].ToString();
                string NewRegistrationImgSavingLocation = ConfigurationManager.AppSettings["NewRegistrationImgSavingLocation"].ToString();

                if (Obj.FemalePatient.FemaleImgPath != null)
                {
                    string IMGPathFemale = "https://" + NewRegistrationImgIP + "/" + NewRegistrationImgVirtualDir + "/" + Obj.FemalePatient.FemalePatientID + "_" + GenericSP.CurrentUser.UnitID + "_" + Obj.FemalePatient.FemaleImgPath;
                    //string IMGPatientPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationImgVirtualDir + "/" + obj.ID + "_" + GenericSP.CurrentUser.UnitID + "_" + Response.FileName;


                    Obj.FemalePatient.FemalePhoto = Encoding.ASCII.GetBytes(IMGPathFemale);

                    // Obj.FemalePatient.FemalePhoto = File.ReadAllBytes(IMGPathFemale);

                    //  Obj.FemalePatient.FemalePhotoStr = Convert.ToBase64String(Obj.FemalePatient.FemalePhoto);

                    Obj.FemalePatient.FemalePhotoStr = IMGPathFemale;
                }
                
                if (Obj.MalePatient.MaleImgPath != null)
                {
                    string IMGPathMale = "https://" + NewRegistrationImgIP + "/" + NewRegistrationImgVirtualDir + "/" + Obj.MalePatient.MaleId + "_" + GenericSP.CurrentUser.UnitID + "_" + Obj.MalePatient.MaleImgPath;
                    Obj.MalePatient.MalePhoto = Encoding.ASCII.GetBytes(IMGPathMale);

                    // Obj.MalePatient.MalePhotoStr = Convert.ToBase64String(Obj.MalePatient.MalePhoto);
                    Obj.MalePatient.MalePhotoStr = IMGPathMale;
                }
                //End:: Added by AniketK on 23Aug2019 To Get Image from Server Location

                //Begin::Commented by AniketK on 23August2019
                //if (!string.IsNullOrEmpty(Convert.ToString(Obj.FemalePatient.FemalePhoto)))
                //{
                //    Obj.FemalePatient.FemalePhotoStr = "data:image/jpeg;base64," + Obj.FemalePatient.FemalePhotoStr; //System.Text.Encoding.UTF8.GetString(Obj.FemalePatient.FemalePhoto);
                //    //Obj.FemalePatient.FemalePhotoStr = "data:image/png;base64," + Obj.FemalePatient.FemalePhotoStr;// Convert.ToBase64String(Obj.FemalePatient.FemalePhoto, 0, Obj.FemalePatient.FemalePhoto.Length);
                //}
                //if (!string.IsNullOrEmpty(Convert.ToString(Obj.MalePatient.MalePhoto)))
                //{
                //    //Obj.MalePatient.MalePhotoStr = System.Text.Encoding.UTF8.GetString(Obj.MalePatient.MalePhoto);
                //    Obj.MalePatient.MalePhotoStr = "data:image/jpeg;base64," + Obj.MalePatient.MalePhotoStr;
                //}
                //End::Commented by AniketK on 23August2019

                GenericSP.SelectedPatient = objPatient;
                GenericSP.SelectedCouple = Obj;
                return Ok(Obj);

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
        [ResponseType(typeof(clsCoupleVO))]
        [HttpGet]
        public IHttpActionResult BindMaleFemaleCoupleDetails(long UnitID, long ID,int GenderID)  //by rohini
        {
            try
            {
               // clsPatientVO objPatient = new JavaScriptSerializer().Deserialize<clsPatientVO>(SelectedPatient);
                clsCoupleVO Obj = new clsCoupleVO();
                Obj = srv.BindMaleFemaleCoupleDetails(UnitID, ID, GenderID);
                //if (!string.IsNullOrEmpty(Convert.ToString(Obj.FemalePatient.FemalePhoto)))
                //{
                //    Obj.FemalePatient.FemalePhotoStr = System.Text.Encoding.UTF8.GetString(Obj.FemalePatient.FemalePhoto);
                //}
                //if (!string.IsNullOrEmpty(Convert.ToString(Obj.MalePatient.MalePhoto)))
                //{
                //    Obj.MalePatient.MalePhotoStr = System.Text.Encoding.UTF8.GetString(Obj.MalePatient.MalePhoto);
                //}
                //GenericSP.SelectedPatient = objPatient;
                //GenericSP.SelectedCouple = Obj;
                return Ok(Obj);

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
        [HttpPost]
        public IHttpActionResult SetSelectedMalePatient(JObject ObjSelectedPatient)  //by rohini to set Selected male female patient
        {

            #region/* Begin :: Added by AniketK on 04Feb2020 for Session */

            dynamic jsonData = ObjSelectedPatient;

            JObject SelectedPatientJson = jsonData;
            MalePatientVO SelectedPatient = SelectedPatientJson.ToObject<MalePatientVO>();

            

            #endregion/* End :: Added by AniketK on 04Feb2020 for Session */

            clsPatientVO Obj = new clsPatientVO();
            try
            {
                Obj.ID = SelectedPatient.MaleId;
                Obj.UnitID = SelectedPatient.MAleUnitID;
                Obj.MRNo = SelectedPatient.MaleMRNO;
                Obj.GenderID = SelectedPatient.GenderID;
                Obj.PatientCategoryID = SelectedPatient.PatientCategoryID;
                Obj.VisitID = SelectedPatient.Selectedvisit.VisitID; 
                Obj.VisitUnitID = SelectedPatient.Selectedvisit.VisitUnitID;


                GenericSP.SelectedPatient = Obj;
                GenericSP.SelectedPatient = Obj;
                if (Obj.PatientCategoryID == 9)
                {
                    GenericSP.SelectedCouple.MalePatient = new MalePatientVO();
                    GenericSP.SelectedCouple.MalePatient = SelectedPatient;
                }
                return Ok();
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
        [HttpPost]
        public IHttpActionResult SetSelectedFemalePatient(JObject ObjSelectedPatient)  //by rohini to set Selected male female patient
        {
            #region/* Begin :: Added by AniketK on 04Feb2020 for Session */

            dynamic jsonData = ObjSelectedPatient;

            JObject SelectedPatientJson = jsonData;
            FemalePatientVO SelectedPatient = SelectedPatientJson.ToObject<FemalePatientVO>();

            

            #endregion/* End :: Added by AniketK on 04Feb2020 for Session */
            clsPatientVO Obj = new clsPatientVO();
            try
            {
                Obj.ID = SelectedPatient.FemalePatientID;
                Obj.UnitID = SelectedPatient.FemalePatientUnitID;
                Obj.MRNo = SelectedPatient.FemalePatientMRNO;
                Obj.GenderID = SelectedPatient.GenderID;
                Obj.PatientCategoryID = SelectedPatient.PatientCategoryID;
                Obj.VisitID = SelectedPatient.Selectedvisit.VisitID;
                Obj.VisitUnitID = SelectedPatient.Selectedvisit.VisitUnitID;




                GenericSP.SelectedPatient = Obj;
                //if (Obj.PatientCategoryID == 8)
                //{
                //    GenericSP.SelectedCouple.FemalePatient = new FemalePatientVO();
                //    GenericSP.SelectedCouple.FemalePatient = SelectedPatient;
                //}

                return Ok();
            }
            catch (SqlException ex)
            {
                Obj = null;
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                Obj = null;
                return new NotFoundResult(Request);
            }
        }

        public IHttpActionResult GetDonorDetails(string SelectedPatient)  //by rohini
        {
            try
            {
                clsPatientVO objPatient = new JavaScriptSerializer().Deserialize<clsPatientVO>(SelectedPatient);
                DonorDetailsVO Obj = new DonorDetailsVO();
                Obj = srv.GetDonorDetails(objPatient.UnitID, objPatient.ID);

                //Begin:: Added by AniketK on 26August2019
                //string RegImgIP = ConfigurationManager.AppSettings["RegImgIP"].ToString();
                //string ImgSavingLocation1 = ConfigurationManager.AppSettings["ImgSavingLocation1"].ToString();
                //string ImgVirtualDir = ConfigurationManager.AppSettings["RegImgVirtualDir"].ToString();

                string NewRegistrationImgIP = ConfigurationManager.AppSettings["NewRegistrationImgIP"].ToString();
                string NewRegistrationImgVirtualDir = ConfigurationManager.AppSettings["NewRegistrationImgVirtualDir"].ToString();
                string NewRegistrationImgSavingLocation = ConfigurationManager.AppSettings["NewRegistrationImgSavingLocation"].ToString();

                if (Obj.ImgPath != null)
                {
                    string IMGPath = "https://" + NewRegistrationImgIP + "/" + NewRegistrationImgVirtualDir + "/" + Obj.ID + "_" + GenericSP.CurrentUser.UnitID + "_" + Obj.ImgPath;


                    Obj.Photo = Encoding.ASCII.GetBytes(IMGPath);

                    // Obj.FemalePatient.FemalePhoto = File.ReadAllBytes(IMGPathFemale);

                    //  Obj.FemalePatient.FemalePhotoStr = Convert.ToBase64String(Obj.FemalePatient.FemalePhoto);

                    Obj.PhotoString = IMGPath;
                }               
                //End:: Added by AniketK on 26August2019

                if (!string.IsNullOrEmpty(Convert.ToString(Obj.Photo)))
                {
                    Obj.PhotoString = System.Text.Encoding.UTF8.GetString(Obj.Photo);
                }

                GenericSP.SelectedPatient = objPatient;
                //   GenericSP.SelectedCouple = Obj;
                return Ok(Obj);

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

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetEmbryologyDoctorsList()
        {
            try
            {
                var Response = srv.GetEmbryologyDoctorsList();
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



        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetSampleCollectionLocList()
        {
            try
            {
                var Response = srv.GetSampleCollectionLocList();
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

        [ResponseType(typeof(ServiceMasterVO))]
        [HttpGet]
        public IHttpActionResult GetServiceList()
        {
            try
            {
                var Response = srv.GetServiceList();
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


        /*Added by AniketK on 10Oct2020*/
        [ResponseType(typeof(ServiceMasterVO))]
        [HttpGet]
        public IHttpActionResult GetServiceTestList()
        {
            try
            {
                var Response = srv.GetServiceTestList();
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
        /*Added by AniketK on 10Oct2020*/



        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetDoctorsList()
        {
            try
            {
                //if (GenericSP.CurrentUser == null)
                //{
                //    logger.Info("1_1_Controller Name:CommonController,Action:HttpGet,Method:GetDoctorsList,CurrentUser Is Null");
                //    logger.Info("1_2_Controller Name:CommonController,Action:HttpGet,Method:GetDoctorsList,CurrentUser:{0},CurrentUserObj:{1}", GenericSP.CurrentUser, GenericSP.CurrentUserObj);
                //}

                //if (GenericSP.CurrentUserObj == null)
                //{
                //    logger.Info("2_1_Controller Name:CommonController,Action:HttpGet,Method:GetDoctorsList,CurrentUserObj Is Null");
                //    logger.Info("2_2_Controller Name:CommonController,Action:HttpGet,Method:GetDoctorsList,CurrentUser:{0},CurrentUserObj:{1}", GenericSP.CurrentUser, GenericSP.CurrentUserObj);
                //}

                logger.Info("1_Controller Name:CommonController,Action:HttpGet,Method:GetDoctorsList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetEmbryologyDoctorsList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("2_SQLExc: Common/GetDoctorsList Message{0},StackTrace:{1},InnerExc:{2}", ex.Message, ex.StackTrace, ex.InnerException);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("3_Exc: Common/GetDoctorsList Message{0},StackTrace:{1},InnerExc:{2}", objException.Message, objException.StackTrace, objException.InnerException);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        //public IHttpActionResult GetDepartmentList() //Commented and Modified by AniketK on 05Feb2020
        public IHttpActionResult GetUltrasonographyTemplateList(string ObjCurrentUser)
        {
            var Response = srv.GetUltrasonographyTemplateList();
            return Ok(Response);
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetDepartmentList()
        {
            try
            {
                //if (GenericSP.CurrentUser == null)
                //{
                //    logger.Info("1_1_Controller Name:CommonController,Action:HttpGet,Method:GetDepartmentList,CurrentUser Is Null");
                //    logger.Info("1_2_Controller Name:CommonController,Action:HttpGet,Method:GetDepartmentList,CurrentUser:{0},CurrentUserObj:{1}", GenericSP.CurrentUser, GenericSP.CurrentUserObj);
                //}

                //if (GenericSP.CurrentUserObj == null)
                //{
                //    logger.Info("2_1_Controller Name:CommonController,Action:HttpGet,Method:GetDepartmentList,CurrentUserObj Is Null");
                //    logger.Info("2_2_Controller Name:CommonController,Action:HttpGet,Method:GetDepartmentList,CurrentUser:{0},CurrentUserObj:{1}", GenericSP.CurrentUser, GenericSP.CurrentUserObj);
                //}

                logger.Info("1_Controller Name:CommonController,Action:HttpGet,Method:GetDepartmentList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetDepartmentList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("2_SQLExc: Common/GetDepartmentList Message{0},StackTrace:{1},InnerExc:{2}", ex.Message, ex.StackTrace, ex.InnerException);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("3_Exc: Common/GetDepartmentList Message{0},StackTrace:{1},InnerExc:{2}", objException.Message, objException.StackTrace, objException.InnerException);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetSpeclRegTypeList()
        {
            try
            {
                //if (GenericSP.CurrentUser == null)
                //{
                //    logger.Info("1_1_Controller Name:CommonController,Action:HttpGet,Method:GetSpeclRegTypeList,CurrentUser Is Null");
                //    logger.Info("1_2_Controller Name:CommonController,Action:HttpGet,Method:GetSpeclRegTypeList,CurrentUser:{0},CurrentUserObj:{1}", GenericSP.CurrentUser, GenericSP.CurrentUserObj);
                //}

                //if (GenericSP.CurrentUserObj == null)
                //{
                //    logger.Info("2_1_Controller Name:CommonController,Action:HttpGet,Method:GetSpeclRegTypeList,CurrentUserObj Is Null");
                //    logger.Info("2_2_Controller Name:CommonController,Action:HttpGet,Method:GetSpeclRegTypeList,CurrentUser:{0},CurrentUserObj:{1}", GenericSP.CurrentUser, GenericSP.CurrentUserObj);
                //}

                logger.Info("1_Controller Name:CommonController,Action:HttpGet,Method:GetSpeclRegTypeList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetSpeclRegTypeList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("2_SQLExc: Common/GetSpeclRegTypeList Message{0},StackTrace:{1},InnerExc:{2}", ex.Message, ex.StackTrace, ex.InnerException);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("3_Exc: Common/GetSpeclRegTypeList Message{0},StackTrace:{1},InnerExc:{2}", objException.Message, objException.StackTrace, objException.InnerException);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult GetPatientInfo(JObject obj)
        {
            try
            {
                dynamic jsonData = obj;

                JObject CurrentUserJson = jsonData.CurrentUser;
                UserVO ObjCurrentUser = CurrentUserJson.ToObject<UserVO>();

                JObject SelectedPatientJson = jsonData.SelectedPatient;
                clsPatientVO ObjSelectedPatient = SelectedPatientJson.ToObject<clsPatientVO>();

                JObject SelectedCoupleJson = jsonData.SelectedCouple;
                clsCoupleVO ObjSelectedCouple = SelectedCoupleJson.ToObject<clsCoupleVO>();

                if (System.Web.HttpContext.Current.Session["CurrentUser"] == null || GenericSP.CurrentUser == null)
                {
                    System.Web.HttpContext.Current.Session["CurrentUser"] = ObjCurrentUser;
                    GenericSP.CurrentUser = ObjCurrentUser;
                }

               // if (System.Web.HttpContext.Current.Session["SelectedPatient"] == null || GenericSP.SelectedPatient.MRNo == null)
               if(ObjSelectedPatient.ID != 0)
                {
                    System.Web.HttpContext.Current.Session["SelectedPatient"] = ObjSelectedPatient;
                    GenericSP.SelectedPatient = ObjSelectedPatient;
                }

                if (System.Web.HttpContext.Current.Session["SelectedCouple"] == null || GenericSP.SelectedCouple == null)
                {
                    System.Web.HttpContext.Current.Session["SelectedCouple"] = ObjSelectedCouple;
                    GenericSP.SelectedCouple = ObjSelectedCouple;
                }

                return Ok(1);
            }
            catch(Exception ex)
            {
                return new NotFoundResult(Request);
            }
            
        }

        [ResponseType(typeof(long))]
        [HttpGet]
        public IHttpActionResult CheckTodayVisit(long PatientId, long PatientUnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.CheckTodayVisit(PatientId, PatientUnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }


        [ResponseType(typeof(IEnumerable<VisitVO>))]
        [HttpGet]
        public IHttpActionResult GetActiveVisitByPatient(long PatientId, long PatientUnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.GetActiveVisitByPatient(PatientId, PatientUnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(List<VisitVO>))]
        [HttpGet]
        public IHttpActionResult GetAllVisitByPatient(long PatientId, long PatientUnitID, int PageIndex)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.GetAllVisitByPatient(PatientId, PatientUnitID, PageIndex);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(bool))]
        [HttpPost]
        public IHttpActionResult PutSelectedvisitByPatient(JObject jsonData)
        {

            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                           ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                dynamic json = jsonData;
                var CoupleDetails = json.CoupleDetails.ToObject<clsCoupleVO>();
                var VisitInfo = json.VisitInfo.ToObject<VisitVO>();
                long gender = json.gender;
                if (gender == 1)
                {
                    //For Male
                    CoupleDetails.MalePatient.Selectedvisit = VisitInfo;
                    GenericSP.SelectedCouple = CoupleDetails;
                }
                else
                {
                    //For Female
                    CoupleDetails.FemalePatient.Selectedvisit = VisitInfo;
                    GenericSP.SelectedCouple = CoupleDetails;
                }
                return Ok(true);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SetTherapyDetails(int [] IDs)  //by rohini to set Selected male female patient
        {
            try
            {
                GenericSP.SelectedCouple.FemalePatient.TherapyID = IDs[0];
                GenericSP.SelectedCouple.FemalePatient.TherapyUnitID = IDs[1];
                GenericSP.SelectedCouple.FemalePatient.ArtTypeID = IDs[2];
                GenericSP.SelectedCouple.FemalePatient.ArtSubTypeID = IDs[3];
                return Ok();
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
        public IHttpActionResult AddvisitDetailIncoupleAPI(int Gender,long VisitID,long VisitUnitID)  //by vikrant to set Selected visit to patient
        {
            if(Gender == 2)
            {
                GenericSP.SelectedCouple.FemalePatient.Selectedvisit = new VisitVO();
                GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID = VisitID;
                GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID = VisitUnitID;
            }
            else
            {
                GenericSP.SelectedCouple.MalePatient.Selectedvisit = new VisitVO();
                GenericSP.SelectedCouple.MalePatient.Selectedvisit.VisitID = VisitID;
                GenericSP.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID = VisitUnitID;
            }
            return Ok();
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SetSelectedPatient(JObject ObjSelectedPatient) 
        {
            try
            {
                #region/* Begin :: Added by AniketK on 04Feb2020 for Session */

                dynamic jsonData = ObjSelectedPatient;

                JObject SelectedPatientJson = jsonData;
                clsPatientVO SelectedPatient = SelectedPatientJson.ToObject<clsPatientVO>();

                

                #endregion/* End :: Added by AniketK on 04Feb2020 for Session */

                GenericSP.SelectedPatient = SelectedPatient;
                return Ok();
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

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetArtSubTypeList(int ArtTypeID,int patientCatID)
        {
            try
            {
                var Response = srv.GetArtSubTypeList(ArtTypeID, patientCatID);
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

        [ResponseType(typeof(clsPatientVO))]
        [HttpGet]
        public IHttpActionResult GetPatientListByCatList(int idx,int ID, string param)
        {
            try
            {
                var Response = srv.GetPatientListByCatList(ID,idx,param);
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
        // Added DonorLinking
        [ResponseType(typeof(DonerDetailsVO))]
        [HttpGet]
        public IHttpActionResult GetActiveDonerList(int idx, int ID, string param)
        {
            try
            {
                var Response = srv.GetActiveDonerList(ID, idx, param);
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

        [ResponseType(typeof(PageConfig))]
        [HttpGet]
        public IHttpActionResult GetcycleType(int ArtTypeID, int ArtSubTypeID)
        {
            return Ok(srv.GetcycleType(ArtTypeID, ArtSubTypeID));
        }

        [ResponseType(typeof(DashboardVO))]
        [HttpGet]
        public IHttpActionResult GetDashBoardData()
        {
            try
            {
                var Response = srv.GetDashBoardData();
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

        //Added by Aniket on 10Sept2020 for Payment Mode validation
        [ResponseType(typeof(PaymentModeValidationVO))]
        [HttpGet]
        public IHttpActionResult GetPaymentModeValidation()
        {
            try
            {
                var Response = srv.GetPaymentModeValidation();
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

        [ResponseType(typeof(string))]
        [HttpGet]
        public IHttpActionResult GetGlobalData()
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetGlobalData();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        public IHttpActionResult GetBDMList()
        {
            try
            {
                var Response = srv.GetBDMList();
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

        [HttpGet]
        public IHttpActionResult GetCountryList()
        {
            try
            {
                var Response = srv.GetCountryList();
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

        //Begin:: Added by AniketK on 18OCT2019
        [HttpGet]
        public IHttpActionResult GetStateList(int countryID)
        {
            try
            {
                var Response = srv.GetStateList(countryID);
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

        [HttpGet]
        public IHttpActionResult GetCityList(int stateID)
        {
            try
            {
                var Response = srv.GetCityList(stateID);
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
        //End:: Added by AniketK on 18OCT2019

        //added sujata for schedule add
        [HttpGet]
        public IHttpActionResult GetUnitListDoctorIDForSchedule(int DOCID)
        {
            try
            {
                var Response = srv.GetUnitListDoctorIDForSchedule(DOCID);
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

        //added sujata for schedule add
        [HttpGet]
        public IHttpActionResult GetDeptIDListDoctorIDAndUnitID(int DOCID, int UnitID)
        {
            try
            {
                var Response = srv.GetDeptIDListDoctorIDAndUnitID(DOCID, UnitID);
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
        //added sujata for schedule add
        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetDoctorsList(bool docType)
        {
            try
            {
                var Response = srv.GetDoctorsList(docType);
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

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult getDoctorListForReg(int id)
        {
            try
            {
                var Response = srv.getDoctorListForReg(id);
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

        //   // added sujata for Appointment date 7/11/19
        [HttpGet]
        public IHttpActionResult GetDeptIDByUnitIDFOrAppointment(int UnitID)
        {
            try
            {
                var Response = srv.GetDeptIDByUnitIDFOrAppointment(UnitID);
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





        // ended sujata for Appointment date 7/11/19

    }
}
