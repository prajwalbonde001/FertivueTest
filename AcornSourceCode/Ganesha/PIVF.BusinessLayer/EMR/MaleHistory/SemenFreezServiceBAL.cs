using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.MaleHistory
{
   public interface SemenFreezServiceBAL
    {
        int SaveUpdate(SemenFreez objSemenFreez);
        int GetMaxID();
        List<SemenFreez> GetSemenFreezList(long DonorID, long DonorUnitID);
        List<SemenFreez> GetSemenFreezListByFormNo(String FormNo, string Action, long ID, long UnitID);
        List<SemenFreezDetails> GetSemenFreezDetailListByFormNo(String FormNo, string Action, long ID, long UnitID);
        List<SemenFreez> GetSpermBankList(int pageIndex, bool IsSinglePatient, int UnitID, int TankID, int CanisterID, int CanID, int StrawId, string NameCodeMRNo,bool IsShowDiscard, string statusOption);
        int UpdateSemenFreezExpiryDates(List<SemenFreezDetails> SemenFreezList);
        int CheckDuplicateCryoNo(string Item);


    }
}
