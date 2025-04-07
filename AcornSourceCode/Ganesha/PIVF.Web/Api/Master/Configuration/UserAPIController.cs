﻿using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.UserBL;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.IVF;
//using PIVF.Service;
//using PIVF.Service.Master.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.Master.Configuration
{
   // [Authorize]
    public class UserAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        UserServiceBAL srv;
        public UserAPIController(UserServiceBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(Unit))]
        [HttpGet]
        public IHttpActionResult GetUnitList()
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUnitList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetUnitList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(PIVF.Entities.Models.Master.Configuration.Menu))]
        [HttpGet]
        public IHttpActionResult GetGrandParentList()
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetGrandParentList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetGrandParentList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetGrandParentList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetGrandParentList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(PIVF.Entities.Models.Master.Configuration.Menu))]
        [HttpGet]
        public IHttpActionResult GetParentList(int grandpaid)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetParentList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetParentList(grandpaid);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetParentList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetParentList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(PIVF.Entities.Models.Master.Configuration.Menu))]
        [HttpGet]
        public IHttpActionResult GetClildMenuList(int parentid)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetClildMenuList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetClildMenuList(parentid);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetClildMenuList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetClildMenuList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(PIVF.Entities.Models.Master.Configuration.UserRole))]
        [HttpGet]
        public IHttpActionResult GetRoleList()
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetRoleList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetRoleList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetRoleList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetRoleList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(UnitRoleID))]
        [HttpGet]
        public IHttpActionResult GetUnitRoleListUserwise(int UserID)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUnitRoleListUserwise,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetRoleListUserwise(UserID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetUnitRoleListUserwise Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetUnitRoleListUserwise Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        //Added by Nayan Kamble on 02/12/2019  START
        
        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult DeleteUnit(int UserID,int UnitID)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:DeleteUnit,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.DeleteUnit(UserID, UnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/DeleteUnit Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/DeleteUnit Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        //Added by Nayan Kamble on 02/12/2019  END

        [ResponseType(typeof(PIVF.Entities.Models.Master.Configuration.UserVO))]
        [HttpGet]
        public IHttpActionResult GetUserList(int index, string Name,string LogName,int UsrType,int UsrRole,bool PgEn)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUserList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetUserList(index, Name, LogName, UsrType, UsrRole, PgEn);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetUserList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetUserList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(PIVF.Entities.Models.Master.Configuration.UserVO))]
        [HttpGet]
        public IHttpActionResult GetUserByID(int id)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUserByID,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetUserByID(id);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetUserByID Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetUserByID Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        
        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult ActivateDeactivateUser(string[] user)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpPost,Method:ActivateDeactivateUser,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.ActivateDeactivateUser(user);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/ActivateDeactivateUser Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/ActivateDeactivateUser Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult LockUnlockUser(string[] user)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpPost,Method:LockUnlockUser,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.LockUnlockUser(user);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/LockUnlockUser Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/LockUnlockUser Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult LoginNameExists(string logName, int UID)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:LoginNameExists,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.LoginNameExists(logName,UID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/LoginNameExists Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/LoginNameExists Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetDocList()
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetDocList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetDocList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetDocList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetDocList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(CommanEntity))]
        [HttpGet]
        public IHttpActionResult GetEmployeeList()
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetEmployeeList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetStaffList();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetEmployeeList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetEmployeeList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult SaveUser(PIVF.Entities.Models.Master.Configuration.UserVO objuser)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpPost,Method:SaveUser,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                DataTable dtRoles = new DataTable();
                dtRoles.Columns.Add("ID");
                dtRoles.Columns.Add("UnitID");
                dtRoles.Columns.Add("RoleId");
                dtRoles.Columns.Add("PK");
                //dtMenus.Columns.Add("IsCreate");
                //dtMenus.Columns.Add("IsUpdate");
                //dtMenus.Columns.Add("IsAll");
                //dtMenus.Columns.Add("IsRead");
                //dtMenus.Columns.Add("IsPrint");
                int cnt = 1;
                for (int i = 0; i <= objuser.selectedRoles.GetUpperBound(0); i++)
                {
                    DataRow dr = dtRoles.NewRow();
                    dr["ID"] = cnt;
                    dr["UnitID"] = objuser.selectedRoles[i, 0];
                    dr["RoleId"] = objuser.selectedRoles[i, 1];
                    dr["PK"] = 0;
                    //dr["IsCreate"] = Menu.IsCreate;
                    //dr["IsUpdate"] = Menu.IsUpdate;
                    //dr["IsAll"] = Menu.IsAll;
                    //dr["IsRead"] = Menu.IsRead;
                    //dr["IsPrint"] = Menu.IsPrint;

                    dtRoles.Rows.Add(dr);
                    cnt++;
                }
                var Response = srv.SaveUpdateUser(objuser, dtRoles);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/SaveUser Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/SaveUser Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(PIVF.Entities.Models.Master.Configuration.Menu))]
        [HttpGet]
        public IHttpActionResult GetUserRoleRights()
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUserRoleRights,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetUserRoleRights();
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetUserRoleRights Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetUserRoleRights Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult clearSession()
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUserRoleRights,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                srv.clearSession();
                return Ok();
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetUserRoleRights Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetUserRoleRights Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }


        ////Added sujata for appointment 8/11/19
        [HttpGet]
        public IHttpActionResult GetDocListByDeptID(int ID, DateTime? AppDate)
        {
            try
            {
                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetRoleList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetDocListByDeptID(ID, AppDate);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error("UserAPI/GetDocListByDeptID Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                logger.Error("UserAPI/GetRoleList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
                return new NotFoundResult(Request);
            }
        }


    }
}
