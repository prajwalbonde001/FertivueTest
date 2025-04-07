using PIVF.Web.Api;
using System;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace PIVF.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Explicit OAuth callback route
            config.Routes.MapHttpRoute(
                name: "OAuthCallback",
                routeTemplate: "api/ProgenesisAPI/oauth/callback",
                defaults: new { controller = "ProgenesisApi", action = "OAuthCallback" }
            );
            config.Routes.MapHttpRoute(
               name: "OAuthRedirect",
               routeTemplate: "api/ProgenesisAPI/oauth/redirect",
               defaults: new { controller = "ProgenesisApi", action = "OAuthRedirect" }
           );
            // Default API route
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Print all registered routes
            PrintRoutes(config);
        }

        // Helper method to log routes
        private static void PrintRoutes(HttpConfiguration config)
        {
            var routeCollection = config.Routes;
            foreach (var route in routeCollection)
            {
                var routeData = route as System.Web.Http.Routing.IHttpRoute;
                if (routeData != null)
                {
                    System.Diagnostics.Debug.WriteLine($"Route: {routeData.RouteTemplate}");
                }
            }
        }

    }
}
