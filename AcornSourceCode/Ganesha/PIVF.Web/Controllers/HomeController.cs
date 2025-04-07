using System.Web.Mvc;

namespace PIVF.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        
        public ActionResult Home()
        {
            ViewBag.Title = "Home Page";

            return PartialView();
        }


        public ActionResult Menu()
        {
            ViewBag.Title = "Menu Page";

            return PartialView();
        }
        public ActionResult DefaultPage()
        {
            ViewBag.Title = "Default Page";

            return PartialView();
        }

        public ActionResult ForgotPassword()
        {
            ViewBag.Title = "Forgot Password Page";

            return PartialView();
        }

    }
}