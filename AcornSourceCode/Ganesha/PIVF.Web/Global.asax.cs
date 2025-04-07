using System;
using System.Net.Http.Formatting;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.SessionState;
using Microsoft.AspNet.SignalR;
using PIVF.Web.Api;

namespace PIVF.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalHost.Configuration.ConnectionTimeout = TimeSpan.FromSeconds(30);
            GlobalHost.Configuration.DisconnectTimeout = TimeSpan.FromSeconds(30);
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(ODataConfig.Register);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

           

        }
        private void Application_BeginRequest(Object source, EventArgs e)
        {
            HttpApplication application = (HttpApplication)source;
            HttpContext context = application.Context;

            string culture = null;
            if (context.Request.UserLanguages != null && Request.UserLanguages.Length > 0)
            {
                culture = Request.UserLanguages[0];
                Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(culture);
                Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            }
        }
        protected void Application_PostAuthorizeRequest(object sender, EventArgs e)
        {
            System.Web.HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        }
        protected void Application_End()
        {
            HttpContext.Current.Session["SelectedPatient"] = null;
            System.Web.HttpContext.Current.Session.Clear();
        }
    }
}
