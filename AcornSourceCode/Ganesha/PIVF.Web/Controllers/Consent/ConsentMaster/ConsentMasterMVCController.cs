using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Consent
{
    public class ConsentMasterMVCController : Controller
    {
        // GET: ConsentMasterMVC
        public ActionResult LandingPage()
        {
            return View();
        }
        public ActionResult ViewConcent()
        {
            return View();
        }
    }
}