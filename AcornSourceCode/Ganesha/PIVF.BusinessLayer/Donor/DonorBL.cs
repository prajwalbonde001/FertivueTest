using PIVF.Entities.Models.Donor;
using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Donor
{
    public interface DonorBL
    {
        List<DonorVO> FillDonorList(int PageIndex, string DonorCode, long AgencyID, long BloodGroupID, long EyeColorID, long HairColorID, long SkinColorID, long HeightID, long BuiltID, bool IsPageEnable);
        int SaveDonor(DonorVO Donor);
        List<SemenFreez> GetSemenFreezListByFormNo(String FormNo, string Action, long ID, long UnitID);   //Added by Nayan Kamble
        List<SemenFreezDetails> GetSemenFreezDetailListByFormNo(String FormNo, string Action, long ID, long UnitID);    //Added by Nayan Kamble
    }
}
