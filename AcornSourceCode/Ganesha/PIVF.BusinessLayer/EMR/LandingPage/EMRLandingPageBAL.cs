using PIVF.Entities.Models.EMR.LandingPage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.LandingPage
{
    public interface EMRLandingPageBAL
    {
        EMRLandingPageVO GetEMRLandingPageData(int PID,int UID);
        string GetGlobalData();
    }
}
