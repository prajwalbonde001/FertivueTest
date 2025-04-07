using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.ARTMgmt.ARTCycle
{
    public class ARTCycleController : Controller
    {
        // GET: ARTCycle
        public ActionResult ARTCycle()
        {
            return PartialView();
        }
    }
}