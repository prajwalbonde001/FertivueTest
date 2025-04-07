using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.EMR.FemaleHistory
{
    public class FemaleComplaintsController : Controller
    {
        // GET: FemaleComplaints
        public ActionResult FemaleComplaints()
        {
            return PartialView();
        }
    }
}