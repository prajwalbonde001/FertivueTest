using PIVF.Entities.Models.ARTMgmt.Embrology;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.OPU
{
    public class OPUVO
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public int PatientID { get; set; }
        public int PatientUnitID { get; set; }
        public int TherapyID { get; set; }
        public int TherapyUnitID { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public DateTime? StartDate { get; set; }
       // public DateTime? EndDate { get; set; }
        public int ClinicianID { get; set; }
        public int EmbryologistID { get; set; }
        public int WitEmbryologistID { get; set; }
        public int AnesthetistID { get; set; }
        public int AnesthetiaTypeID { get; set; }
        public bool IsPreAnesthesiaChecked { get; set; }
        public int TypeOfNeedleID { get; set; }
        public int NeedleSubTypeID { get; set; }
        public int OptimumFolicleLeftOvry { get; set; }
        public int OptimumFolicleRightOvry { get; set; }
        public int LevelOfDifficultyID { get; set; }
        public string ProcedureFindings { get; set; }
        public DateTime? TriggerDate { get; set; }
        public DateTime? TriggerTime { get; set; }
        public string Remark { get; set; }
        public bool IsCycleCancel { get; set; }
        public string Reason { get; set; }
        public bool CloseCycleCancellation { get; set; }
        public bool IsFinalize { get; set; }
        public int CreatedUnitID { get; set; }
        public int AddedBy { get; set; }
        public DateTime? AddedDatetime { get; set; }
        public string AddedOn { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public int UpdatedUnitID { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string UpdatedOn { get; set; }
        public string UpdatedWindowLoginName { get; set; }
        public long SumOFFolicle { get; set; }
        public Boolean IsFinalizeOocytes { get; set; }
        public int CancelReasonID { get; set; }
        public int NeedlesUsed { get; set; }

        #region Added By vikrant To get Stimulation Information
        public StimulationForEmbro StimulationInfo { get; set; }
        public int? FolliclesAspirated { get; set; }
        public long? OocytesRetrieved { get; set; }
        public string DoneBy { get; set; }

        public string IsPACFlag { get; set; }
        #endregion
    }

    public class TriggrData
    {
        public string CycleWarning { get; set; }
        public DateTime? TriggerDate { get; set; }
        public DateTime? TriggerTime { get; set; }
        public DateTime? LMP { get; set; }
        public DateTime? OPUDate { get; set; }
        public string Dose { get; set; }
        public int LeftFollicles { get; set; }
        public int RightFollicles { get; set; }
    }
}
