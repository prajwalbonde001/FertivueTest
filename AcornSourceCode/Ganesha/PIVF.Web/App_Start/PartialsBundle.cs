using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace PIVF.Web.App_Start
{
    public class PartialsBundle : Bundle
    {
        public PartialsBundle(string moduleName, string virtualPath)
            : base(virtualPath, new[] { new PartialsTransform(moduleName) })
        {
        }

    }
}