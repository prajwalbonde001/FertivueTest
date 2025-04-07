using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//namespace PIVF.Gemino.Web.Controllers.Master.Clinic
namespace PIVF.Web.Controllers.Master.Clinic
{
    public class ClinicController : Controller
    {
        // GET: Clinic
        public ActionResult Clinic()
        {
            return View();
        }
        public ActionResult EditClinic()
        {
            return View();
        }
    }
}