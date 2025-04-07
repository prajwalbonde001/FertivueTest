using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.EMR.Vitals
{
    public class VitalsMVCController : Controller
    {
        // GET: VitalsMVC
        public ActionResult VitalsView()
        {
            return View();
        }
    }
}