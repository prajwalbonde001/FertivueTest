using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.New_ART
{
    public class NewARTController : Controller
    {
        // GET: NewART
        public ActionResult NewART()
        {
            return View();
        }

        public ActionResult ARTCycle()
        {
            return PartialView();
        }

        public ActionResult CycleOverview()
        {
            return PartialView();
        }
    }
}