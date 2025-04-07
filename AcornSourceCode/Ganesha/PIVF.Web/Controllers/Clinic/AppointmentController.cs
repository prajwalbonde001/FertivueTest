using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//namespace PIVF.Gemino.Web.Controllers.Clinic
namespace PIVF.Web.Controllers.Clinic
{
    public class AppointmentController : Controller
    {
        // GET: Appointment
        [Authorize]
        public ActionResult Appointment()
        {
            return View();
        }

        public ActionResult NewAppointments()
        {
            return View();
        }
        public ActionResult AppointmentList()
        {
            return View();
        }


       
       
    }
}