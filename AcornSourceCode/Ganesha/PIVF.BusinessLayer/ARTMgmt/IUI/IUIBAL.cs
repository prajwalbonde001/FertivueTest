using PIVF.Entities.Models.ARTMgmt.IUI;
using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.IUI
{
    public interface IUIBAL
    {
        int SaveUpdate(IUIVO objIUIVO);      
        IUIVO GetIUIDetails();
        //List<IUIVO> GetIUIVOListForTC();
        List<IUIVO> GetSemenThawingDetailFromIUIIDForTC(string formNo, string action);
        List<SemenFreez> GetDonorFrozenSamples(long DonorID, long DonorUnitID);
        List<DonorListVO> LoadDonorData();
        List<SemenThawing> GetThowSmaples(long ID, long UnitID, int IsFreezThaw);
    }
}
