using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Billing
{
    public class PatientAdvanceController : Controller
    {
        // GET: PatientAdvance
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NewAdvance()
        {
            return View();
        }
    }
}