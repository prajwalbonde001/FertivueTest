﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.QueueMgt
{
    public class QueueMgtController : Controller
    {
        // GET: QueueMgt
        public ActionResult QueueList()
        {
            return View();
        }
    }
}