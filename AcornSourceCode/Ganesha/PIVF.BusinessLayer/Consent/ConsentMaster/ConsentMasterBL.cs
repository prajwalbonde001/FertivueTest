using PIVF.Entities.Models.Consent.ConsentMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Consent.ConsentMaster
{
    public interface ConsentMasterBL
    {
        int SaveConsent(ConsentMasterVO ConsentDetails);
        List<ConsentMasterVO> GetConsentList(long ARTTypeID, long ARTSubTypeID, int CurrentPage, string Code);
        ConsentMasterVO GetConsentByID(long ID);
        int ActivateDeactivateConsent(int ID, string reason);
    }
}
