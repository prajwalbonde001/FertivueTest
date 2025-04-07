using PIVF.Entities.Models.ARTMgmt.SemenDetails;
using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.SemenDetails
{
    public interface SemenDetailsBAL
    {
        List<PartnerSperm> LoadPartnerSpermiogramData(int PatientID, int PatientUnitID);
        List<SemenDetailsVO> LoadDonorData(int LoadDonorData);
        List<SemenFreez> LoadDonorSpermiogram(string DonorCode);
        List<PartnerSperm> GetPartnerSpermiogramDataByMRNo(string DonorCode);
        SemenDetailsVO FetchPartnerPreparationAssesment(string SelectedSNo);
        int SaveORUpdateSemenDetails(SemenDetailsVO semenDetails);
        SemenDetailsVO LoadAllSemenDetailsData(int TherapyID, int TherapyUnitID, string SelectedTherapyCycleCode);
        List<MalePartnerSperm> LoadPartnerMaleSpermiogramData(int PatientID, int PatientUnitID);
    }
}
