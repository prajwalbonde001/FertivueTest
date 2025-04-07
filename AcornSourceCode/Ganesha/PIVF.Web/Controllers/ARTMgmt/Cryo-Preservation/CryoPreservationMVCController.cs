using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.ARTMgmt.Cryo_Preservation
{
    public class CryoPreservationMVCController : Controller
    {
        // GET: IndexCryoPreser
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult OocyteVitrification()
        {
            return View();
        }
        public ActionResult EmbryoVitrification()
        {
            return View();
        }
        public ActionResult OocyteThowing()
        {
            return View();
        }
        public ActionResult EmbryoThowing()
        {
            return View();
        }
    }
}