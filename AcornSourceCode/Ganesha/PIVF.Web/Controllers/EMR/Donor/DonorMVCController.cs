using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Donor
{
    public class DonorMVCController : Controller
    {
        // GET: DonorMVC
        public ActionResult IndexDonor()
        {
            return View();
        }
        public ActionResult ViewDonor()
        {
            return View();
        }
        public ActionResult NewSample()
        {
            return View();
        }
    }
}