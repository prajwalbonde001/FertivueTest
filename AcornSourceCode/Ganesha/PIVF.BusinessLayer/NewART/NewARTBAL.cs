using PIVF.Entities.Models.EMR.Investigation;
using PIVF.Entities.Models.NewART;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.NewART
{
    public interface NewARTBAL
    {
        int SaveUpdate(NewARTVO item);
        int SavePAC(PACDetails PACDetails);
        PACDetails GetPAC(long PatientID, long FemalePatientUnitID, long TherapyID, long TherapyUnitID);
        int UpdatePAC(int ID, int UnitID, bool IsPAC);
        List<ARTCycleVO> GetARTCycleList(long PatientID, long UnitID,long PatientUnitID);
        string GetLatestLMPDate();
        MedicalHistory GetMedicalHistory();
        NewARTVO GetCycleOverview();
        List<InvestigationVo> GetInvestigations();
        List<PIVF.Entities.Models.EMR.Prescription.DrugVO> GetPrescription();
        List<PIVF.BusinessLayer.NewART.BirthDetails> GetBirthDetails();
        PIVF.BusinessLayer.NewART.StimulationDetails GetStimulationDetails();
        PIVF.BusinessLayer.NewART.OPUDetails GetOPUDetails();
        PIVF.BusinessLayer.NewART.TriggerDetails GetTriggerDetails();
        List<PIVF.BusinessLayer.NewART.OutcomeDetails> GetOutcomeDetails();
        List<PIVF.BusinessLayer.NewART.ETDetails> GetETDetails();
        int CloseCycle(int ID, int UnitID);
        long newCyclebtnFlag(long ID, long UnitID);
    }

    public class MedicalHistory
    {
        public bool IsDiabetes { get; set; }
        public bool IsCardiacDisease { get; set; }
        public bool IsHypertension { get; set; }
        public bool IsThyroidDisorder { get; set; }
        public bool IsTuberculosis { get; set; }
        public bool IsPelvicInfection { get; set; }
        public bool IsBleedingDisorders { get; set; }
        public bool IsMalignancy { get; set; }
        public bool IsOther { get; set; }
        public bool PrevcycleStatus { get; set; }
        public int ArtTypeID { get; set; }
        public int ArtSubTypeID { get; set; }
        public int DonorID { get; set; }
        public int DonorUnitID { get; set; }
        public int InvID { get; set; }
    }

    public class BirthDetails
    {
        public string Pregnancy { get; set; }
        public string WeaksOfgestation { get; set; }
        public string DeliveryType { get; set; }
        public string BirthWeight { get; set; }
        public string Remark { get; set; }
        public string Score { get; set; }
        public bool IsCongiAbnorm { get; set; }
        public string Child { get; set; }
    }

    public class StimulationDetails
    {
        public string Dose { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? FollicleDate { get; set; }
        public string LeftSize { get; set; }
        public string RightSIze { get; set; }
        public bool IsFinalize { get; set; }
    }

    public class OPUDetails
    {
        public DateTime? OPUDate { get; set; }
        public string Oocytes { get; set; }
        public string Fertilized { get; set; }
        public string Cryo { get; set; }
        public string Discard { get; set; }
        public bool IsFinalize { get; set; }
    }

    public class TriggerDetails
    {
        public DateTime? TriggerDate { get; set; }
        public string TriggerDose { get; set; }
        public DateTime? TriggerTime { get; set; }

        public string TriggerDrugDose { get; set; }  //int

}

    public class OutcomeDetails
    {
        public DateTime? BHCGDate { get; set; }
        public string BHCGTitle { get; set; }
        public bool IsPositive { get; set; }
        public string Result { get; set; }
    }

    public class ETDetails
    {
        public int ETCount { get; set; }
        public string CellStage { get; set; }
        public string Grade { get; set; }
        public string TransferDay { get; set; }
        public bool Finalize { get; set; }
    }
}
