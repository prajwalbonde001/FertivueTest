using PIVF.Entities.Models.Billing;
using PIVF.Entities.Models.Dashboard;
using PIVF.Entities.Models.Donor;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.IVF;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Common
{
  public interface CommonServiceBAL
    {
        List<CommanEntity> GetMasterList(string tblNm, string id, string desc);
        List<clsPatientVO> GetPatientList(long UnitID, long PatientCategory);
        List<clsPatientVO> GetPatientListforLab(); //sujata

        List<clsPatientVO> GetPartnerList(long UnitID, long PatientCategory,int GenderId);
        clsCoupleVO GetCoupleDetails(long UnitID, long ID);
        clsCoupleVO BindMaleFemaleCoupleDetails(long UnitID, long ID, int GenderID);        
        DonorDetailsVO GetDonorDetails(long UnitID, long ID);
        DoctorList GetEmbryologyDoctorsList();
        List<CommanEntity> GetSampleCollectionLocList();
        List<ServiceMasterVO> GetServiceList();
        List<ServiceMasterVO> GetServiceTestList();  /*Added by AniketK on 10Oct2020*/
        List<CommanEntity> GetDoctorsList();
        List<CommanEntity> GetDepartmentList();
        List<CommanEntity> GetSpeclRegTypeList();
        long CheckTodayVisit(long PatientID, long PatientUnitID);
        IEnumerable<VisitVO> GetActiveVisitByPatient(long PatientID, long PatientUnitID);
        List<CommanEntity> GetArtSubTypeList(int ArtTypeID, int patientCatID);
        List<clsPatientVO> GetPatientListByCatList(int patientCatID, int idx, string param);
        // Added DonorLinking
        List<DonerDetailsVO> GetActiveDonerList(int patientCatID, int idx, string param);
        PageConfig GetcycleType(int ArtTypeID, int ArtSubTypeID);
        List<VisitVO> GetAllVisitByPatient(long PatientID, long PatientUnitID,int PageIndex);
        DashboardVO GetDashBoardData();
        List<PaymentModeValidationVO> GetPaymentModeValidation();
        string GetGlobalData();
        List<CommanEntity> GetBDMList();
        List<Country> GetCountryList();
        List<State> GetStateList(int countryID); //Added by AniketK on 18OCT2019 for Registration
        List<City> GetCityList(int stateID); //Added by AniketK on 18OCT2019 for Registration
        List<CommanEntity> GetUnitListDoctorIDForSchedule(int DOCID);  // added sujata for add schedule
        List<CommanEntity> GetDeptIDListDoctorIDAndUnitID(int DOCID, int UnitID); // added sujata for add schedule
        List<CommanEntity> GetDoctorsList(bool docType); // added sujata for add schedule
        List<CommanEntity> getDoctorListForReg(int id); //Added by AniketK on 31DEC2019 for Registration
        List<CommanEntity> GetDeptIDByUnitIDFOrAppointment(int UnitID);  // added sujata for add Appointment date 7/11/19
        List<CommanEntity> GetUltrasonographyTemplateList();
    }
}
