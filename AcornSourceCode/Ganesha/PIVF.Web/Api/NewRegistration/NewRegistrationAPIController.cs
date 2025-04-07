using DataBaseConfiguration;
using Newtonsoft.Json.Linq;
using NLog;
using PIVF.BusinessLayer.NewRegistration;
using PIVF.BusinessLayer.Patient;
using PIVF.Entities.Models.Master.Patient;
using PIVF.Entities.Models.NewRegistration;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web;
using System.Web.Http.Description;
using System.Web.Http.Results;

using System.Web.Script.Serialization;
using System.Configuration;
using System.IO;

namespace PIVF.Web.Api.NewRegistration
{
    [Authorize]
    public class NewRegistrationAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        NewRegistrationBAL srv;
        public NewRegistrationAPIController(NewRegistrationBAL _srv)
        {
            srv = _srv;
        }

       // public object ControllerContext { get; private set; }

        [ResponseType(typeof(string))]
        [HttpPost]

        public IHttpActionResult SaveUpdate(NewRegistrationVO obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                    ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.SaveUpdate(obj);

                string NewRegistrationImgIP = ConfigurationManager.AppSettings["NewRegistrationImgIP"].ToString();
                string NewRegistrationImgVirtualDir = ConfigurationManager.AppSettings["NewRegistrationImgVirtualDir"].ToString();
                string NewRegistrationImgSavingLocation = ConfigurationManager.AppSettings["NewRegistrationImgSavingLocation"].ToString();

                string NewRegistrationAttachVirtualDir = ConfigurationManager.AppSettings["NewRegistrationAttachVirtualDir"].ToString();
                string NewRegistrationAttachSavingLocation = ConfigurationManager.AppSettings["NewRegistrationAttachSavingLocation"].ToString();

                if (obj.GenderID1 == 2)
                {
                    string IMGPathReport = NewRegistrationImgSavingLocation + "/" + obj.PatientID1 + "_" + GenericSP.CurrentUser.UnitID + "_" + obj.FileName1;

                    try
                    {
                        if (!Directory.Exists(NewRegistrationImgSavingLocation))
                        {
                            Directory.CreateDirectory(NewRegistrationImgSavingLocation);
                        }

                        if (obj.strPhoto1 != null)
                        {
                            byte[] NewRegistrationImg = Convert.FromBase64String(obj.strPhoto1);
                            using (FileStream fs = new FileStream(IMGPathReport, FileMode.Create))
                            {
                                fs.Write(NewRegistrationImg, 0, NewRegistrationImg.Length);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.Warn($"Failed to save photo for GenderID1: {ex.Message}");
                    }
                }

                if (obj.GenderID1 == 2)
                {
                    string IMGPathReport = NewRegistrationAttachSavingLocation + "/" + obj.PatientID1 + "_" + GenericSP.CurrentUser.UnitID + "_" + obj.attFileName1;

                    try
                    {
                        if (!Directory.Exists(NewRegistrationAttachSavingLocation))
                        {
                            Directory.CreateDirectory(NewRegistrationAttachSavingLocation);
                        }

                        if (obj.strAttachment1 != null)
                        {
                            byte[] NewRegistrationImg = Convert.FromBase64String(obj.strAttachment1);
                            using (FileStream fs = new FileStream(IMGPathReport, FileMode.Create))
                            {
                                fs.Write(NewRegistrationImg, 0, NewRegistrationImg.Length);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.Warn($"Failed to save attachment for GenderID1: {ex.Message}");
                    }
                }

                if (obj.GenderIDPart1 == 1)
                {
                    string IMGPathReport = NewRegistrationImgSavingLocation + "/" + obj.PartnerID1 + "_" + GenericSP.CurrentUser.UnitID + "_" + obj.FileNamePartner1;

                    try
                    {
                        if (!Directory.Exists(NewRegistrationImgSavingLocation))
                        {
                            Directory.CreateDirectory(NewRegistrationImgSavingLocation);
                        }

                        if (obj.strPhotoPartner1 != null)
                        {
                            byte[] NewRegistrationImg = Convert.FromBase64String(obj.strPhotoPartner1);
                            using (FileStream fs = new FileStream(IMGPathReport, FileMode.Create))
                            {
                                fs.Write(NewRegistrationImg, 0, NewRegistrationImg.Length);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.Warn($"Failed to save photo for GenderIDPart1: {ex.Message}");
                    }
                }

                if (obj.GenderIDPart1 == 1)
                {
                    string IMGPathReport = NewRegistrationAttachSavingLocation + "/" + obj.PartnerID1 + "_" + GenericSP.CurrentUser.UnitID + "_" + obj.attFileNamePartner1;

                    try
                    {
                        if (!Directory.Exists(NewRegistrationAttachSavingLocation))
                        {
                            Directory.CreateDirectory(NewRegistrationAttachSavingLocation);
                        }

                        if (obj.strAttachmentPartner1 != null)
                        {
                            byte[] NewRegistrationImg = Convert.FromBase64String(obj.strAttachmentPartner1);
                            using (FileStream fs = new FileStream(IMGPathReport, FileMode.Create))
                            {
                                fs.Write(NewRegistrationImg, 0, NewRegistrationImg.Length);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.Warn($"Failed to save attachment for GenderIDPart1: {ex.Message}");
                    }
                }

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
        public IHttpActionResult getPatientList(string searchParams)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                NewPatient obj = new JavaScriptSerializer().Deserialize<NewPatient>(searchParams);
                var Response = srv.getPatientList(obj);
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

        //[HttpGet]
        //public IHttpActionResult getPatientByID(int id)

        [ResponseType(typeof(NewPatient))]
        [HttpPost]
        public IHttpActionResult getPatientByID(NewPatient obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.getPatientByID(obj);
                //NewPatient obj = new NewPatient();

                //For Registration Photo
                string NewRegistrationImgIP = ConfigurationManager.AppSettings["NewRegistrationImgIP"].ToString();
                string NewRegistrationImgVirtualDir = ConfigurationManager.AppSettings["NewRegistrationImgVirtualDir"].ToString();
                string NewRegistrationImgSavingLocation = ConfigurationManager.AppSettings["NewRegistrationImgSavingLocation"].ToString();

                //For Registration Attachment
                string NewRegistrationAttachVirtualDir = ConfigurationManager.AppSettings["NewRegistrationAttachVirtualDir"].ToString();
                string NewRegistrationAttachSavingLocation = ConfigurationManager.AppSettings["NewRegistrationAttachSavingLocation"].ToString();

                if (Response.GenderID == 2 || Response.GenderID == 1)
                {
                    if (Response.PhotoStatus == 1)
                    {
                        string IMGPatientPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationImgVirtualDir + "/" + obj.ID + "_" + GenericSP.CurrentUser.UnitID + "_" + Response.FileName;
                        Response.ImgPatientPath1 = IMGPatientPath1;
                    }
                    string AttachPatientPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationAttachVirtualDir + "/" + obj.ID + "_" + GenericSP.CurrentUser.UnitID + "_" + Response.attFileName;
                    Response.AttachPatientPath1 = AttachPatientPath1;
                    //string AttachPatientPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationAttachVirtualDir + "/" + obj.ID + "_" + GenericSP.CurrentUser.UnitID + "_" + obj.attFileName;
                    //obj.AttachPatientPath = AttachPatientPath1;
                }


                if (Response.PatientCategoryID == 7)
                {
                    if (Response.SpouseInfo.GenderID == 1 || Response.SpouseInfo.GenderID == 2)
                    {

                        if (Response.SpouseInfo.PhotoStatus == 1)
                        {
                            string ImgPartnerPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationImgVirtualDir + "/" + Response.SpouseInfo.ID + "_" + GenericSP.CurrentUser.UnitID + "_" + Response.SpouseInfo.FileName;
                            Response.SpouseInfo.ImgPartnerPath1 = ImgPartnerPath1;
                        }
                        string AttachPartnerPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationAttachVirtualDir + "/" + Response.SpouseInfo.ID + "_" + GenericSP.CurrentUser.UnitID + "_" + Response.SpouseInfo.attFileName;
                        Response.SpouseInfo.AttachPartnerPath1 = AttachPartnerPath1;
                        //string AttachPatientPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationAttachVirtualDir + "/" + obj.ID + "_" + GenericSP.CurrentUser.UnitID + "_" + obj.attFileName;
                        //obj.AttachPatientPath = AttachPatientPath1;
                    }
                }

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
        public IHttpActionResult getPatientInfo(int id)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.getPatientInfo(id);
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

        [ResponseType(typeof(NewPatient))]
        [HttpPost]
        public IHttpActionResult CheckExistingPatientDuplicacy(NewPatient obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.CheckExistingPatientDuplicacy(obj);
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
        public IHttpActionResult getPatientSpouseInfo(int id)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.getPatientSpouseInfo(id);
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

        [HttpPost]
        public IHttpActionResult updatePatientAddInfo(NewAddInfo obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.updatePatientAddInfo(obj);
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
        public IHttpActionResult getPatientAddInfo(int id)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.getPatientAddInfo(id);
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
        public IHttpActionResult getPatientRefInfo(int id)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.getPatientRefInfo(id);
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

        [HttpPost]
        public IHttpActionResult updatePatientRefInfo(NewRefInfo obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.updatePatientRefInfo(obj);
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

        [HttpPost]
        public IHttpActionResult updatePatientInfo(NewInfo obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.updatePatientInfo(obj);
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
        public IHttpActionResult getAddress(int id, bool? isOthr)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.getPatientAddress(id, isOthr);
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

        [HttpPost]
        public IHttpActionResult updateAddress(NewAddress obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.updatePatientAddress(obj);
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

        [HttpPost]
        public IHttpActionResult updatePhoto(string[] str)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.updatePatientPhoto(str);

                string NewRegistrationImgIP = ConfigurationManager.AppSettings["NewRegistrationImgIP"].ToString();
                string NewRegistrationImgVirtualDir = ConfigurationManager.AppSettings["NewRegistrationImgVirtualDir"].ToString();
                string NewRegistrationImgSavingLocation = ConfigurationManager.AppSettings["NewRegistrationImgSavingLocation"].ToString();

                string NewRegistrationAttachVirtualDir = ConfigurationManager.AppSettings["NewRegistrationAttachVirtualDir"].ToString();
                string NewRegistrationAttachSavingLocation = ConfigurationManager.AppSettings["NewRegistrationAttachSavingLocation"].ToString();

                if (str[4] == "1" || str[4] == "2")
                {
                    string IMGPathReport = NewRegistrationImgSavingLocation + "/" + str[0] + "_" + GenericSP.CurrentUser.UnitID + "_" + str[3];// +"_" //+ obj.FileName;

                    //string localPath = new Uri(IMGPathReport).LocalPath;
                    string localPath = IMGPathReport;
                    byte[] NewRegistrationImg;
                    if (str[2] != null)
                    {
                        NewRegistrationImg = Convert.FromBase64String(str[2]);
                        using (FileStream fs = new FileStream(localPath, FileMode.Create))
                        {
                            fs.Write(NewRegistrationImg, 0, (int)NewRegistrationImg.Length);
                        }
                    }
                }
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

        [HttpPost]
        public IHttpActionResult deletePhoto(string[] str)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.deletePatientPhoto(str);
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

        [HttpPost]
        public IHttpActionResult updateAttachment(string[] str)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.updateAttachment(str);

                string NewRegistrationImgIP = ConfigurationManager.AppSettings["NewRegistrationImgIP"].ToString();
                string NewRegistrationImgVirtualDir = ConfigurationManager.AppSettings["NewRegistrationImgVirtualDir"].ToString();
                string NewRegistrationImgSavingLocation = ConfigurationManager.AppSettings["NewRegistrationImgSavingLocation"].ToString();

                string NewRegistrationAttachVirtualDir = ConfigurationManager.AppSettings["NewRegistrationAttachVirtualDir"].ToString();
                string NewRegistrationAttachSavingLocation = ConfigurationManager.AppSettings["NewRegistrationAttachSavingLocation"].ToString();

                if (str[4] == "1" || str[4] == "2")
                {
                    string IMGPathReport = NewRegistrationAttachSavingLocation + "/" + str[0] + "_" + GenericSP.CurrentUser.UnitID + "_" + str[3];// +"_" //+ obj.FileName;

                    //string localPath = new Uri(IMGPathReport).LocalPath;
                    string localPath = IMGPathReport;
                    byte[] NewRegistrationImg;
                    if (str[2] != null)
                    {
                        NewRegistrationImg = Convert.FromBase64String(str[2]);


                        using (FileStream fs = new FileStream(localPath, FileMode.Create))
                        {
                            fs.Write(NewRegistrationImg, 0, (int)NewRegistrationImg.Length);
                        }
                    }
                }               
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
        public IHttpActionResult GetBankInformation(int id, int UnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetBankInformation(id, UnitID);
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

        [ResponseType(typeof(List<NewAppoinmentInput>))]
        [HttpPost]
        public IHttpActionResult GetAvailableAppointmentSlotsModified(List<NewAppoinmentInput> input)
        {
            try
            {
                //logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUnitList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetAvailableAppointmentSlotsModified(input);
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

        [ResponseType(typeof(NewPatient))]
        [HttpPost]
        public IHttpActionResult viewAttachment(NewPatient obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.viewAttachment(obj);
                string NewRegistrationImgIP = ConfigurationManager.AppSettings["NewRegistrationImgIP"].ToString();
                //For Registration Attachment
                string NewRegistrationAttachVirtualDir = ConfigurationManager.AppSettings["NewRegistrationAttachVirtualDir"].ToString();
                string NewRegistrationAttachSavingLocation = ConfigurationManager.AppSettings["NewRegistrationAttachSavingLocation"].ToString();

                if(Response.GenderIDPIP != null){

                    string AttachPatientPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationAttachVirtualDir + "/" + Response.PatientID + "_" + GenericSP.CurrentUser.UnitID + "_" + Response.attFileName;
                    Response.AttachPatientPath1 = AttachPatientPath1;
                }

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

        public IHttpActionResult InsertUpdateBankDetails(PatientRegistration patientRegistration)
        {
            logger.Info("PatientRegistrationController, Post UnitId={0} PRegTypeID={1}", GenericSP.CurrentUser.UnitID, patientRegistration.PRegTypeID);
            var data = patientRegistration;
            PatientRegistration objPatientRegistration = new PatientRegistration();
            objPatientRegistration = data;

            int result = 0;
            try
            {
                result = srv.InsertUpdateBankDetails(objPatientRegistration);
            }
            catch (Exception ex)
            {
                logger.Error("PatientRegistrationController, InsertUpdateBankDetails exception {0}", ex.Message);
                throw;
            }

            // return Created(patientRegistration);
            return Ok(result);
        }



        [ResponseType(typeof(PatientPersonalCharacteristicsVO))]
        [HttpPost]
        public IHttpActionResult GetPatientPersonalCharacteristics(PatientPersonalCharacteristicsVO obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.GetPatientPersonalCharacteristics(obj.PatientID,obj.PatientUnitID);
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

      
        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SavePatientPersonalCharacteristics(PatientPersonalCharacteristicsVO patientPersonalCharacteristicsVO)
        {
            try
            {
                var Response = srv.SavePatientPersonalCharacteristics(patientPersonalCharacteristicsVO);
                return Ok(Response);
            }
            catch (SqlException exception)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception exception)
            {
                return new NotFoundResult(Request);
            }
        }
    }
}