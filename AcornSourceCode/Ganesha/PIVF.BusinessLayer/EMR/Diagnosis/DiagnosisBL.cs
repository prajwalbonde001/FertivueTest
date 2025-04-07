using PIVF.Entities.Models.EMR.Diagnosis;
using PIVF.Entities.Models.EMR.Dignosis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.Diagnosis
{
    public interface DiagnosisBL
    {

        long SavePatientDiagnosis(List<DiagnosisVO> _OtherDiagnosisVO);
        int SaveOtherDiagnosis(OtherDiagnosisVO _OtherDiagnosisVO);
        int SetFavourite(DiagnosisVO _DiagnosisVO);
        int RemoveFavourite(long ID, long UnitID, bool IsOther, string Reason);
        int DeletePatientDiagnosis(long ID, long UnitID, string Reason);
        long DeleteOtherDiagnosis(long ID, long UnitID, bool IsOther, string Reason);
        List<DiagnosisDetailsVO> GetPatientDiagnosis(int PageIndex);
        List<DiagnosisVO> FillDiagnosis(int PageIndex, string Diagnosis,int GenderID);
        List<OtherDiagnosisVO> FillOtherDiagnosis(int PageIndex, string Diagnosis);
        List<DiagnosisVO> FillFavouriteDiagnosis(int PageIndex, string Diagnosis);
        int CheckIfDiagnosisAddedToPatient(List<DiagnosisVO> _DiagnosisVO);
        
    }

}
