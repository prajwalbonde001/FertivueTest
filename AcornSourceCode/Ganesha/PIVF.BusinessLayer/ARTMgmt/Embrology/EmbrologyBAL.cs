using PIVF.Entities.Models.ARTMgmt.Embrology;
using PIVF.Entities.Models.ARTMgmt.OPU;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.Embrology
{
    public interface EmbrologyBAL
    {
        OPUVO GetOPUData(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        long SaveUpdateOcyte(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, int FolliclesAspirated, long OocytesRetrieved, Boolean OocytesFinalizeStatus, int Donor);
        IEnumerable<EmbrologyVO> fillDayOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        IEnumerable<DayOneVO> fillDayWiseOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, int day);
        DayOneVO FillDayOneMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        long SaveDayOneProcess(List<DayOneVO> DayOneData);
        IEnumerable<DayTwoVO> fillDayTwoOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        DayTwoVO FillDayTwoMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        long SaveDayTwoProcess(List<DayTwoVO> DaytwoData);
        DayThreeVO FillDayThreeMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        IEnumerable<DayThreeVO> fillDayThreeOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, long DonorId, long DonorCycleCode, long DonorUnitId);
        long SaveDayThreeProcess(List<DayThreeVO> DayThreeData);
        IEnumerable<DayFourVO> fillDayFourOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        DayFourVO FillDayFourMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        long SaveDayFourProcess(List<DayFourVO> DaytwoData);
        //Day Zero
        int SaveDayZeroProcess(List<DayZeroVO> DayZeroData);
        IEnumerable<DayZeroVO> FillDayZeroOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        IEnumerable<CommanEntity> GetOocytesForDay0(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, string CycleCode);
        DayZeroVO GetDay0DetailsByID(long ID, long UnitID, long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID);
        long CheckLinkCouplecycleAvialbleOrNot(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID);
        int SaveDayZeroFinalizeProcess(List<DayZeroVO> DayZeroData);
        List<SemenDetail> GetSemenDetails(int SemenID);
        //Day 5
        DayFiveVO FillDayFiveMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        IEnumerable<DayFiveVO> fillDayFiveOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, long DonorID, long DonorCycleCode, long DonorUnitID);
        long SaveDayFiveProcess(List<DayFiveVO> DayFiveData);
        //Day 6
        DaySixVO FillDaySixMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        IEnumerable<DaySixVO> fillDaySixOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        long SaveDaySixProcess(List<DaySixVO> DayFiveData);
        List<DayWiseInfoForBiopsy> GetDayWiseInfoForBiopsy(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID);

        int AddIVFDashboardBIOPSYDetails(EmbryoData obj);

        PGTUserAuth GetPGTUserAuthInfo(PGTUserAuthRequest request);
        PGTUserAuth GetPGTUserAuthInfoAccesstoken(long UserId);

        string GetPGTEmbryolgist(string accessToken);
        Task<TokenResponse> GetAccessToken(string code);
        string GetPGTClinicusers(string accessToken);
        string GetPGTPhysicians(string accessToken);
        int AddPGTUserAuthInfo(PGTUserAuthAdd objs);
        string ValidatePatientWithProgenesis(PGTUserAuthRequest obj);
        //Day 7 
        DaySevenVO FillDaySevenMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        IEnumerable<DaySevenVO> fillDaySevenOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        long SaveDaySevenProcess(List<DaySevenVO> DaySevenData);
        List<PGTRequisiteDetails> GetPGTRequisiteDetails();
        List<PGTRequisiteBiopsyDetails> GetPGTRequisiteBiopsyDetails(long PatientId, long PatientUnitId, long TherapyId, long TherapyUnitId);
    }
}
