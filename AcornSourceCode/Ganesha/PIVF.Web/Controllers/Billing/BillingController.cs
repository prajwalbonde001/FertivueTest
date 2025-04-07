using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Billing
{
    public class BillingController : Controller
    {
        // GET: Billing
        public ActionResult NewBilling()
        {
            return View();
        }
        public ActionResult BillList()
        {
            return View();
        }
        public ActionResult PrescribedServices()   
        {
            return View();
        }
        public ActionResult PatientBillList() 
        {
            return View();
        }

        public ActionResult PatientNewBilling()
        {
            return View();
        }
        public ActionResult cancelmodalpopup()
        {
            return View();
        }
        public ActionResult AddStock()
        {
            return View();
        }
        public ActionResult Consumption()
        {
            return View();
        }
        public ActionResult PharmacySale()
        {
            return View();
        }
        public ActionResult SalesReturn()
        {
            return View();
        }
        public ActionResult ConsumptionList()
        {
            return View();
        }
        public ActionResult NewPharmacySale()
        {
            return View();
        }

    }
}