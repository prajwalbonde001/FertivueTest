using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.ARTMgmt.ARTCycleNavigation
{
    public class ARTCycleNavigationMVCController : Controller
    {
        // GET: ARTCycleNavigationMVC
        public ActionResult ARTCycleNavigation()
        {
            return View();
        }

        public ActionResult StimulationChart()
        {
            return PartialView();
        }
    }
}