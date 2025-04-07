using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Master.Configuration
{
    public class UserRoleController : Controller
    {
        // GET: UserRole
        public ActionResult UserRoleList()
        {
            return PartialView();
        }
        public ActionResult AddUserRole()
        {
            return PartialView();
        }
        public ActionResult ClinicConfig()
        {
            return PartialView();
        }
        public ActionResult IPD()
        {
            return View();
        }
        public ActionResult IPDClass()
        {
            return View();
        }
        public ActionResult Ward()
        {
            return View();
        }
        public ActionResult Bed()
        {
            return View();
        }
        public ActionResult NewAdmission()
        {
            return View();
        }
        public ActionResult AdmissionList()
        {
            return View();
        }
    }
}