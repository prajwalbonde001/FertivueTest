using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.EMR.Investigation
{
    public class InvestigationMVCController : Controller
    {
        // GET: InvestigationMVC
        public ActionResult Investigation()
        {
            return View();
        }
        public ActionResult OrderCycle()
        {
            return View();
        }
    }
}