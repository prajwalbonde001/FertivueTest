using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.User;
using PIVF.Entities.Models.Master.Configuration;
//using PIVF.Service;
//using PIVF.Service.Master.Configuration;
//using PIVF.Web.Models.DTO.Audit;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.UI.WebControls;

namespace PIVF.Web.Api.Master.Configuration
{

    [Authorize]
    public class UserRoleController : ApiController
    {
        //UserRoleService objUserRole = new UserRoleService();
        private static Logger logger = LogManager.GetCurrentClassLogger();
        UserRoleServiceBAL objUserRole;
        public UserRoleController(UserRoleServiceBAL obj)
        {
            objUserRole = obj;
        }

        [ResponseType(typeof(UserRole))]
        [HttpGet]
        public IHttpActionResult RoleList(int PageIndex,string Code,string Description, bool PagingEnabled)   
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = objUserRole.GetRoleList(PageIndex,Code,Description,PagingEnabled);
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

        [ResponseType(typeof(Int32))]
        [HttpGet]
        public IHttpActionResult UpdateRoleStatus(int RoleId,bool Status)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = objUserRole.UpdateRoleStatus(RoleId, Status);
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

        [ResponseType(typeof(UserRole))]
        [HttpGet]
        public IHttpActionResult MenuList()
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
             HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
             ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = objUserRole.GetMenuList();
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


        [ResponseType(typeof(List<ClinicList>))]
        [HttpGet]
        public IHttpActionResult getClinic()
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
             HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
             ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = objUserRole.getClinic();
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

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SaveClinic(List<ClinicList> ClinicList)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
             HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
             ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = objUserRole.SaveClinic(ClinicList);
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

        public IHttpActionResult AddRole([FromBody] UserRole data)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                //data.RoleId = 0;
                DataTable dtMenus = new DataTable();
                dtMenus.Columns.Add("Id");
                dtMenus.Columns.Add("MenuId");
                dtMenus.Columns.Add("IsCreate");
                dtMenus.Columns.Add("IsUpdate");
                dtMenus.Columns.Add("IsAll");
                dtMenus.Columns.Add("IsRead");
                dtMenus.Columns.Add("IsPrint");
                dtMenus.Columns.Add("ParentId");
                dtMenus.Columns.Add("Status");

                int cnt = 1;
                foreach (var Menu in data.lstMenuForSave)
                {
                    DataRow dr = dtMenus.NewRow();
                    dr["Id"] = cnt;
                    dr["MenuId"] = Menu.MenuId;
                    dr["IsCreate"] = Menu.IsCreate;
                    dr["IsUpdate"] = Menu.IsUpdate;
                    dr["IsAll"] = Menu.IsAll;
                    dr["IsRead"] = Menu.IsRead;
                    dr["IsPrint"] = Menu.IsPrint;
                    dr["ParentId"] = Menu.ParentId;
                    if (!Menu.IsCreate && !Menu.IsUpdate && !Menu.IsRead && !Menu.IsPrint)
                    {
                        dr["Status"] = false;
                    }
                    else {
                        dr["Status"] = true;
                    }

                    dtMenus.Rows.Add(dr);
                    cnt++;
                }               
                var Response = objUserRole.AddRole(data,dtMenus);
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
        //public IHttpActionResult RoleAudit(List<AuditDTO> RoleAudit)
        //{
            
        //        logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
        //        HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
        //        ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
        //        try
        //        {
        //            if (RoleAudit != null)
        //            {
        //                JArray auditArray = new JArray();
        //                var auditScope = this.GetCurrentAuditScope();
        //                var auditdata = RoleAudit as IEnumerable<PIVF.Web.Models.DTO.Audit.AuditDTO>;
        //                foreach (var auditobj in auditdata)
        //                {
        //                    auditArray.Add(JObject.FromObject(auditobj));
        //                }
        //                auditScope.SetCustomField("ChangedObjects", auditdata);
        //            }
        //            return Ok(0);
        //        }
        //        catch (Exception ex)
        //        {
        //            logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
        //           + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
        //           ex.Message, ex.StackTrace);
        //            throw ex;
        //        }
            
        //}

        public IHttpActionResult CheckAlreadyExists([FromBody] UserRole data)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = objUserRole.CheckAlreadyExists(data);
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

        [ResponseType(typeof(UserRole))]
        [HttpGet]
        public IHttpActionResult RoleDetails(int RoleID)    
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                var Response = objUserRole.GetRoleDetails(RoleID);
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
    }
}
