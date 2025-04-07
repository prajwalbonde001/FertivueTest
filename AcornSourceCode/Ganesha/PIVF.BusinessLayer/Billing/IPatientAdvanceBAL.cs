using PIVF.Entities.Models.Billing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Billing
{
    public interface IPatientAdvanceBAL
    {
        long savePatientAdvance(PatientAdvanceVO obj);
        List<PatientAdvanceVO> FillAdvanceList(int PatientID, int PatientUnitID);

        List<AdvanceList> GetPatientAdvanceList(string[] AdvanceLists, int index, bool PgEn, out int totalCount);

        long AddOrUpdateAdvance(AddAdvance obj);

        AdvanceBalance GetAdvanceBalanceAmount(int UnitID, int PatientID, int PatientUnitID);
    }
}
