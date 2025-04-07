using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Patient
{
    public class PatientVisitController : Controller
    {
        // GET: PatientVisit
        public ActionResult PatientVisit()
        {
            return PartialView();
        }
    }
}