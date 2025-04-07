using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Patient
{
    public class RegistrationController : Controller
    {
        // GET: Registration
        public ActionResult Registration()
        {
            return View();
        }

        public ActionResult PatientList()
        {
            return View();
        }

        public ActionResult PatientViewUpdate()
        {
            return View();
        }
    }
}