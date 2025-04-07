using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.ARTMgmt.SemenDetails
{
    public class SemenDetailsController : Controller
    {
        // GET: SemenDetails
        public ActionResult SemenDetails()
        {
            return PartialView();
        }
    }
}