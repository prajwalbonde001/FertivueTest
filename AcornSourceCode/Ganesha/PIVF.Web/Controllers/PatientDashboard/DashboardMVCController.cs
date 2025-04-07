using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace PIVF.Web.Controllers.PatientDashboard
{
    public class DashboardMVCController : Controller
    {
        // GET: DashboardMVC
        public ActionResult PatientDashboard()
        {
            return View();
        }
        public ActionResult PatientDashboardList()

        {
            return View();
        }
        public ActionResult fertivueDashboard()
        {
            return View();
        }

        public ActionResult clinicalDashboard()
        {
            return View();
        }
    }
}