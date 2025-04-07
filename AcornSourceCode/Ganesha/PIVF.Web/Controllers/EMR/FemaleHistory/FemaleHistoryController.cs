using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.EMR
{
    public class FemaleHistoryController : Controller
    {
        // GET: FemaleHistory
        public ActionResult FemaleHistory()
        {
            return PartialView();
        }
    }
}