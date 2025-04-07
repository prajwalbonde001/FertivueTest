using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Billing
{
    public class PatientAdvanceRefundController : Controller
    {
        // GET: PatientRefund
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AdvanceRefundlist()
        {
            return View();
        }

        public ActionResult NewPatientBillRefund()
        {
            return View();
        }

        public ActionResult PatientBillRefundList()
        {
            return View();
        }
    }
}