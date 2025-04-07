using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.EMR.FemaleHistory
{
    public class CorpusLeteumScanController : Controller
    {
        public ActionResult CorpusLeteumScan() 
        {
            return PartialView();
        }
    }
}
