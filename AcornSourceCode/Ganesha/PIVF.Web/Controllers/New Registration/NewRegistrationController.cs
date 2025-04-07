using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.New_Registration
{
    public class NewRegistrationController : Controller
    {
        // GET: NewRegistration
        public ActionResult New_Registration()
        {
            return View();
        }

        public ActionResult NewPatientList()
        {
            return View();
        }

        public ActionResult NewPatientViewUpdate()
        {
            return View();
        }

        public ActionResult PatientPersonalCharacteristics()
        {
           return View();
        }
        public ActionResult PatientAdditionalInfromation()
        {
            return View();
        }
        

    }
}