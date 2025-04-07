using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.EMR.Investigation;
using PIVF.Entities.Models.EMR.Investigation;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.EMR.Investigation
{
    [Authorize]
    public class InvestigationAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        InvestigationBAL srv;
        public InvestigationAPIController(InvestigationBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(PIVF.Entities.Models.Master.IVF.ServiceMasterVO))]
        [HttpGet]
        public IHttpActionResult GetCatwiseServiceList(int catID, int? GenderID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetCatwiseServiceList(catID, GenderID);
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
        public IHttpActionResult SaveInvestigation(List<InvestigationVo> lstInvestigation)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                DataTable dt = new DataTable();
                dt.Columns.Add("ID");
                dt.Columns.Add("CategoryID");
                dt.Columns.Add("ServiceID"); 
                dt.Columns.Add("ServiceCode");
                dt.Columns.Add("Service");
                dt.Columns.Add("PlannedDate",typeof(DateTime));
                dt.Columns.Add("Instruction");
                dt.Columns.Add("Arttype");
                dt.Columns.Add("ArtSubtype");
                dt.Columns.Add("DonorID");
                dt.Columns.Add("DonorUnitID");               
                dt.Columns.Add("Template");
                dt.Columns.Add("TemplateID");
                dt.Columns.Add("OrderFrom");
                dt.Columns.Add("SurrogateID");
                dt.Columns.Add("SurrogateUnitID");
                dt.Columns.Add("IsMarkSurrogate");
                dt.Columns.Add("IsMarkDonor");
                dt.Columns.Add("VisitID"); //Added by AniketK on 14Feb2020 to save previous VisitID for previous VisitID
                int cnt = 1;
                foreach (InvestigationVo item in lstInvestigation.ToList()) 
                {

                    //if (item.ID > 0)
                   // {
                  //      lstInvestigation.Remove(item);
                   //     continue;
                   // }
                    DataRow row = dt.NewRow();
                    row["ID"] = cnt;
                    row["CategoryID"] = item.CategoryID;
                    row["ServiceID"] = item.ServiceID;
                    row["ServiceCode"] = item.ServiceCode;
                    row["Service"] = item.Service;
                    row["PlannedDate"] = item.PlannedDate==null? (object)DBNull.Value : item.PlannedDate;
                    row["Instruction"] = item.Instruction;
                    row["Arttype"] = item.ArttypeID;
                    row["ArtSubtype"] = item.ArtSubTypeID;
                    row["DonorID"] = item.DonorID;
                    row["DonorUnitID"] = item.DonorUnitID;                   
                    row["Template"] = item.Template;
                    row["TemplateID"] = item.TemplateID;
                    row["OrderFrom"] = item.OrderFrom;
                    row["SurrogateID"] = item.SurrogateID;
                    row["SurrogateUnitID"] = item.SurrogateUnitID;
                    row["IsMarkSurrogate"] = item.IsSurrogateLinked;
                    row["IsMarkDonor"] = item.IsDonorLinked;
                    row["VisitID"] = item.VisitID; //Added by AniketK on 14Feb2020 to save previous VisitID for previous VisitID
                    //if (row["PlannedDate"] is DBNull)
                    //    value = null;
                    //else
                    //    value = (DateTime)row["MyDateTimeColumn"];
                    dt.Rows.Add(row);
                    cnt++;
                }
                var Response = srv.SaveInvestigation(dt);
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

        [ResponseType(typeof(InvestigationVo))]
        [HttpGet]
        public IHttpActionResult GetPreviousInvestigation(int idx,int CatID,string para)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetPreviousInvestigation(idx, CatID, para);
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

        [ResponseType(typeof(InvestigationVo))]
        [HttpGet]
        public IHttpActionResult GetTodaysInvestigation(int CatID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetTodaysInvestigation(CatID);
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
        [HttpGet]
        public IHttpActionResult DeleteSavedService(int ID, int UnitID,string reason)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.DeleteSavedService(ID,UnitID,reason);
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
        public IHttpActionResult SetFavouriteInvestigation(InvestigationVo obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.SetFavouriteInvestigation(obj);
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
        public IHttpActionResult UploadReport(InvestigationVo obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.UploadReport(obj);
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

        [ResponseType(typeof(PIVF.BusinessLayer.ARTMgmt.ReportUpload.tmpReport))]
        [HttpGet]
        public IHttpActionResult ViewReport(int InvID,int UnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                PIVF.BusinessLayer.ARTMgmt.ReportUpload.tmpReport tmp = new PIVF.BusinessLayer.ARTMgmt.ReportUpload.tmpReport();
                var Response = srv.ViewReport(InvID, UnitID);

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
        public IHttpActionResult LinkDonor(int [] IDs)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.LinkDonor(IDs);
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
        public IHttpActionResult SaveFavourite(List<InvestigationVo> lstInvestigation)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                DataTable dt = new DataTable();
                dt.Columns.Add("ID");
                dt.Columns.Add("CategoryID");
                dt.Columns.Add("ServiceID");
                dt.Columns.Add("ServiceCode");
                dt.Columns.Add("Service");
                dt.Columns.Add("Template");
                dt.Columns.Add("TemplateID");
                int cnt = 1;
                foreach (InvestigationVo item in lstInvestigation)
                {
                    DataRow row = dt.NewRow();
                    row["ID"] = cnt;
                    row["CategoryID"] = item.CategoryID;
                    row["ServiceID"] = item.ServiceID;
                    row["ServiceCode"] = item.ServiceCode;
                    row["Service"] = item.Service;
                    row["Template"] = lstInvestigation[0].Template;
                    row["TemplateID"] = lstInvestigation[0].TemplateID;
                    dt.Rows.Add(row);
                    cnt++;
                }
                var Response = srv.SaveFavourite(dt);
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

        [ResponseType(typeof(TemplateVo))]
        [HttpGet]
        public IHttpActionResult GetFavouriteList(int idx,string param)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetFavouriteList(idx,param);
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

        //[ResponseType(typeof(ArtsubType))]
        //[HttpGet]
        //public IHttpActionResult GetArtsubTypeList(int id)
        //{
        //    try
        //    {
        //        logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
        //         ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
        //        var Response = srv.GetArtsubTypeList(id);
        //        return Ok(Response);
        //    }
        //    catch (SqlException ex)
        //    {
        //        logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
        //        return new NotFoundResult(Request);
        //    }
        //    catch (Exception ex)
        //    {
        //        logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
        //        return new NotFoundResult(Request);
        //    }
        //}
    }
}
