using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIVF.Web.Controllers.Master.Configuration
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult UserList()
        {
            return View();
        }

        public ActionResult NewUser()
        {
            return View();
        }
    }
}