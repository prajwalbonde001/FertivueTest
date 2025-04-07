using PIVF.BusinessLayer.ARTMgmt.ReportUpload;
using PIVF.Entities.Models.Consent.ConsentAction;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Consent.ConsentAction
{
    public interface ConsentActionBL
    {
        List<CommanEntity> GetConsentList(long ARTTypeID, long ARTSubTypeID);
        ConsentDetailsVO GetConsentDetails(long UnitID, long ID, long ConsentID);
        int SaveConsent(ConsentDetailsVO ConsentDetails);
        List<ConsentDetailsVO> GetConsenGrid();
        int SaveUpdateFile(List<ConsentDetailsVO> _objConsentDetailsVO);
        tmpReport ViewReport(long ID, long UnitID);
    }
}
