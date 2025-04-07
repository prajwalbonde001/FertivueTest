using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//namespace PIVF.Gemino.Web.Controllers.Master.Clinic
namespace PIVF.Web.Controllers.Master.Clinic
{
    public class StaffController : Controller
    {
        // GET: Staff
        public ActionResult StaffList()
        {
            return View();
        }

        public ActionResult NewStaff()
        {
            return View();
        }
    }
}