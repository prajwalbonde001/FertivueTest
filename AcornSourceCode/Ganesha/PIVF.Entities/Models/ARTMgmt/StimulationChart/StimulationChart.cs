using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.StimulationChart
{
    public class StimulationChart
    {
        public Int32 StimulationID { get; set; }
        public Nullable<Int32> PatientID { get; set; }
        public Nullable<Int32> PatientUnitID { get; set; }
        public Nullable<Int32> CoupleID { get; set; }
        public Nullable<Int32> CoupleUnitID { get; set; }
        public Nullable<Int32> VisitID { get; set; }
        public Nullable<Int32> VisitUnitID { get; set; }
        public Nullable<Int32> TherapyID { get; set; }
        public string CycleCode { get; set; }
        public Nullable<Int32> TotalDose { get; set; }
        public Nullable<DateTime> OPUDate { get; set; }
        public Nullable<DateTime> StimulationStartDate { get; set; }
        public Nullable<DateTime> StimulationEndDate { get; set; }
        public bool IsCycleCancellation { get; set; }
        public bool IsCloseCycleOnCancellation { get; set; }
        public string Reason { get; set; }
        public Nullable<Int32> LastUpdatedBy { get; set; }
        public Nullable<DateTime> LastUpdatedByDate { get; set; }
        public Nullable<Int32> FinalizedBy { get; set; }
        public Nullable<DateTime> FinalizedByDate { get; set; }
        public bool IsFinalize { get; set; }
        public bool Status { get; set; }
        public string MedicalHistory { get; set; }
        public string CycleWarnings { get; set; }
        public Nullable<DateTime> SCLMP { get; set; }
        public Nullable<Int32> SCARTID { get; set; }
        public string SCARTDescription { get; set; }
        public Nullable<Int32> SCARTSubID { get; set; }
        public string SCARTSubDescription { get; set; }
        public string SCProtocol { get; set; }
        public string SCSourceOfSperm { get; set; }
        public Nullable<Int32> AntralFollicleCount { get; set; }
        public Nullable<DateTime> Date { get; set; }
        public float LeftDimensionLength { get; set; }
        public float LeftDimensionBreadth { get; set; }
        public float LeftSize { get; set; }
        public float RightDimensionLength { get; set; }
        public float RightDimensionBreadth { get; set; }
        public float RightSIze { get; set; }
        public float EndometriumThickness { get; set; }
        public String EndometriumMorphology { get; set; }
        public int LeftSizeCount { get; set; }
        public int RightSizeCount { get; set; }
        public string LeftFollicularNumber { get; set; }
        public string RightFollicularNumber { get; set; }
        public string TherapyIndications { get; set; }
        public List<StimulationDrugAdmin> DoctorNameList { get; set; }
    }

    public class StimulationE2
    {
        public int E2ID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<DateTime> E2Date { get; set; }
        public Nullable<float> E2Size { get; set; }
    }
    public class StimulationProgesterone
    {
        public int ProgesteroneID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<DateTime> ProgesteroneDate { get; set; }
        public Nullable<float> ProgesteroneSize { get; set; }
    }
    public class StimulationFSH
    {
        public int SDrugID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<DateTime> FSHDate { get; set; }
        public Nullable<float> FSHSize { get; set; }
    }
    public class StimulationDose1
    {
        public int SDrugID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<Int32> DrugID { get; set; }
        public Nullable<DateTime> DrugDate { get; set; }
        public Nullable<DateTime> DrugTime { get; set; }
        public Nullable<Int32> Days { get; set; }
        public Nullable<Int32> DrugDose { get; set; }
        public Nullable<DateTime> DrugStartDate { get; set; }
        public Nullable<DateTime> DrugStartTime { get; set; }

    }
    public class StimulationDose2
    {
        public int SDrugID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<Int32> DrugID { get; set; }
        public Nullable<DateTime> DrugDate { get; set; }
        public Nullable<DateTime> DrugTime { get; set; }
        public Nullable<Int32> Days { get; set; }
        public Nullable<Int32> DrugDose { get; set; }
        public Nullable<DateTime> DrugStartDate { get; set; }
        public Nullable<DateTime> DrugStartTime { get; set; }

    }
    public class StimulationDose3
    {
        public int SDrugID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<Int32> DrugID { get; set; }
        public Nullable<DateTime> DrugDate { get; set; }
        public Nullable<DateTime> DrugTime { get; set; }
        public Nullable<Int32> Days { get; set; }
        public Nullable<Int32> DrugDose { get; set; }
        public Nullable<DateTime> DrugStartDate { get; set; }
        public Nullable<DateTime> DrugStartTime { get; set; }

    }
    public class StimulationDoseTrigger
    {
        public int TriggerID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<Int32> DrugID { get; set; }
        public Nullable<DateTime> DrugDate { get; set; }
        public Nullable<DateTime> DrugTime { get; set; }
        public Nullable<Int32> Days { get; set; }
        public Nullable<Int32> DrugDose { get; set; }

    }
    public class StimulationRemark
    {
        public int RemarkID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<DateTime> RemarkDate { get; set; }
        public string Remark { get; set; }

    }
    public class StimulationPhysician
    {
        public int PhyID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public string Name { get; set; }
        public Nullable<Int32> LoggedUserID { get; set; }

    }
    public class StimulationDrugAdmin
    {
        public int DrugAdminID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<DateTime> DrugDate { get; set; }
        public bool Inhouse { get; set; }
        public bool Outside { get; set; }
        public string DrugAdminName { get; set; }
    }
}
