using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.ARTMgmt.Embrology
{
    public class EmbrologyMVCController : Controller
    {
        // GET: EmbrologyMVC
        public ActionResult EmbrologyView()
        {
            return View();

        }
        public ActionResult PGT()
        {
            return View();
        }
    }
}