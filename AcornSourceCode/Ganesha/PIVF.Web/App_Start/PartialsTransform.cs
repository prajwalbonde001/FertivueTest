﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Optimization;

namespace PIVF.Web.App_Start
{
    public class PartialsTransform : IBundleTransform
    {
        private const string JsContentType = "text/javascript";
        private readonly string moduleName;
        public PartialsTransform(string moduleName)
        {
            this.moduleName = moduleName;
        }

        public void Process(BundleContext context, BundleResponse response)
        {
            if (context == null)
                throw new ArgumentNullException("context");
            if (response == null)
                throw new ArgumentNullException("response");

            if (!context.EnableOptimizations)
            {
                response.Files = new List<BundleFile>();
                response.Content = string.Empty;
                return;
            }

            if (string.IsNullOrWhiteSpace(this.moduleName))
            {
                response.Content = "// No or wrong app name defined";
                response.ContentType = JsContentType;
                return;
            }

            var contentBuilder = new StringBuilder();
            contentBuilder.Append("(function(){");
            contentBuilder.AppendFormat("angular.module('{0}').run(['$templateCache',function(t){{", this.moduleName);

            foreach (BundleFile file in response.Files)
            {
                string fileId = VirtualPathUtility.ToAbsolute(file.IncludedVirtualPath);
                string filePath = HttpContext.Current.Server.MapPath(file.IncludedVirtualPath);
                string fileContent = File.ReadAllText(filePath);

                contentBuilder.AppendFormat("t.put({0},{1});",
                    JsonConvert.SerializeObject(fileId),
                    JsonConvert.SerializeObject(fileContent));
            }

            contentBuilder.Append("}]);");
            contentBuilder.Append("})();");

            response.Content = contentBuilder.ToString();
            response.ContentType = JsContentType;
        }
    }
}