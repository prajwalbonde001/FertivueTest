using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.KPIs
{
    public class KPIController : Controller
    {
        // GET: KPI
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Management()
        {
            return View();
        }

    }
}