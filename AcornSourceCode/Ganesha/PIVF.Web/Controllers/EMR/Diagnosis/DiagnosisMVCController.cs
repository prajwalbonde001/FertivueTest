using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.EMR.Diagnosis
{
    public class DiagnosisMVCController : Controller
    {
        // GET: Dignosis
        public ActionResult AddDignosis()
        {
            return View();
        }
    }
}