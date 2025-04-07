using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Master.Clinic
{
    public class DepartmentController : Controller
    {
        // GET: Department
        public ActionResult Index()
        {
            return PartialView();
        }
    }
}