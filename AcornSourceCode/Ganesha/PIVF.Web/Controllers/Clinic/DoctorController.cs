using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Gemino.Web.Controllers.Clinic
{
    public class DoctorController : Controller
    {
        // GET: Doctor
        public ActionResult DoctorList()
        {
            return PartialView();
        }
        public ActionResult AddDoctor()
        {
            return PartialView();
        }
    }
}