using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.EMR.MaleHistory
{
    public class SurgicalSpermRetrievalController : Controller
    {
        // GET: SurgicalSpermRetrieval
        public ActionResult SurgicalSpermRetrieval()
        {
            return PartialView();
        }
    }
}