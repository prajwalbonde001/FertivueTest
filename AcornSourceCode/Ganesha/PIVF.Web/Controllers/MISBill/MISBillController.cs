using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.MISBill
{
    public class MISBillController :Controller
    {
        public ActionResult MISBILL()
        {
            return View();
        }
        public ActionResult PatientAdvanceReport()
        {
            return View();
        }

        public ActionResult ServiceWiseBillingReport()
        {
            return View();
        }

        public ActionResult RefundReport()
        {
            return View();
        }

        public ActionResult DailyOutstandingReport()
        {
            return View();
        }

        public ActionResult DailyRevenueReport()
        {
            return View();
        }


        public ActionResult DiscountRegisterReport()
        {
            return View();
        }

        public ActionResult DailyCollectionReport()
        {
            return View();
        }
        public ActionResult PatientSummaryReport()
        {
            return View();
        }
    }
}