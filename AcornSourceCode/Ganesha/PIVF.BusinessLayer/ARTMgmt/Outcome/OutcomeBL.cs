using PIVF.Entities.Models.ARTMgmt.Outcome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.Outcome
{
    public interface OutcomeBL
    {
        int SaveOutcome(OutcomeVO obj);
        int SaveBirthDetail(OutcomeVO obj);
        string GetPregnancydate();
       string GetETPregnancydate();
        OutcomeVO GetOutcomeDetails();
        int UnLinkSurrogate();    //Added by Nayan Kamble
    }
}
