using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.ARTMgmt.ReportUpload
{
    public class ReportUploadMVCController : Controller
    {
        // GET: ReportUploadMVC
        public ActionResult UploadReport()
        {
            return View();
        }
        public ActionResult PathalogyReport()
        {
            return View();
        }
    }
}