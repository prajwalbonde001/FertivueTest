using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Lab
{
    public class LabController : Controller
    {
        // GET: Lab
        public ActionResult LabTestList()
        {
            return View();
        }

        public ActionResult NewLabEntery()
        {
            return View();
        }
    }
}