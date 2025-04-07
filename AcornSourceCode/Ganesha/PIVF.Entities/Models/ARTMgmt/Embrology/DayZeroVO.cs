using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Embrology
{
    public class DayZeroVO
    {
        public long ID { get; set; } //graphical representation ID
        public long Day0ID { get; set; }
        public long UnitID { get; set; }
        public long FemalePatientID { get; set; }
        public long FemalePatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public long OocyteNumber { get; set; }
        public long SerialOocuteNumber { get; set; }
        public int PlanID { get; set; }
        public int TypeCase { get; set; }
        public string CaseType { get; set; }
        public int DayID { get; set; }        
        public DateTime? Date { get; set; }
        public DateTime? Time { get; set; }
        public int OCD { get; set; }
        public int ECD { get; set; }
        public int OCC { get; set; }
        public int SpermMorphology { get; set; }
        public int PBLocation { get; set; }
        public int Location { get; set; }
        public int Attempts { get; set; }
        public int Maturity { get; set; }
        public int IVMPreMaturity { get; set; }
        public bool IVM { get; set; }
        public int Plan { get; set; }
        public int ZP { get; set; }
        public int PB { get; set; }
        public int PVS { get; set; }
        public int Cytoplasm { get; set; }
        public int Breakage { get; set; }
        public bool IMSI { get; set; }
        public bool Embryoscope { get; set; }
        public int Semen { get; set; }
        public int Incubator { get; set; }
        public string Remarks { get; set; }
        public long Embryologist { get; set; }
        public long Witness { get; set; }
        public bool Finalize { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public string UpdatedOn { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdatedWindowLoginName { get; set; }
        public DateTime? IVMDate { get; set; }
        public DateTime? IVMTime { get; set; }
        public int IVMMaturity { get; set; }
        public DateTime? SelectedDate { get; set; }
        public DateTime? SelectedTime { get; set; }
        public DateTime? PlanDate { get; set; }
        public DateTime? PlanStartTime { get; set; }
        public DateTime? PlanEndTime { get; set; }
        public DateTime? PlanTime { get; set; }
        public DateTime? PlanStartDate { get; set; }
        public DateTime? PlanEndDate { get; set; }
        //Drop Down Desc
        public string MaturityDesc { get; set; }
        public string PlanDesc { get; set; }
        public string IncubatorDesc { get; set; }
        public string IsIVMDesc { get; set; }
        public string EmbryologistDesc { get; set; }
        public string WitnessDesc { get; set; }
        public string CycleCode { get; set; }
        public string OCDDesc { get; set; }
        public string ECDDesc { get; set; }
        public string OCCDesc { get; set; }
        public string PBDesc { get; set; }
        public string PVSDesc { get; set; }
        public string CytoplasmDesc { get; set; }
        public string BreakageDesc { get; set; }
        public string ZPDesc { get; set; }
        public string PBLocationDesc { get; set; }
        public string LocationDesc { get; set; }
        //fo img
        public OocytesImage Img { get; set; }
        //copy incubator
        public bool IsCommonIncubator { get; set; }
        //for Semen Detail
        public SemenDetail SemenDetail = new SemenDetail();
        public int PreprationIDOrThawID { get; set; }
        public int IsPreprationID { get; set; }
        public long coupleID { get; set; }
        public bool Donor { get; set; }
        public bool Fresh { get; set; }
        public bool DonorEmb { get; set; }
        //public List<CommanEntity> IVFCytoplasmList { get; set; }

        public List<LinkedPatientList> LinkPatientList {get ;set;} //added linked couple list on doner cycle.
        public List<LinkedPatientMaleList> LinkedPatientMaleList { get; set; } //added linked couple list on doner cycle.


    }
    public class LinkedPatientList
    {
       public int LinkPatientID { get; set; }
        public int LinkPatientInvID { get; set; }
        public int LinkPatientTherapyID { get; set; }
        public int LinkPatientUnitID { get; set; }
        public int LinkePatientTherapyUnitID { get; set; }
        public string LinkedPatientName { get; set; }
        public bool IsCycleActive { get; set; }
    }

    public class LinkedPatientMaleList  //added sujata for cross clinic check flow sperm

    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public string SNo { get; set; }
        public Nullable<DateTime> CollectionDate { get; set; }
        public string TypeOfSperm { get; set; }
        public string WitnessedBy { get; set; }
        public string DoneBy { get; set; }
        public bool IsSelected { get; set; }

    }
    public class DayZeroForToolTip
    {
        public string CycleCode { get; set; }
        public Nullable<long> OocyteNumber { get; set; }
        public Nullable<long> SerialOocuteNumber { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? Time { get; set; }
        public string OCD { get; set; }
        public string ECD { get; set; }
        public string OCC { get; set; }
        public string ZP { get; set; }
        public string PB { get; set; }
        public string PVS { get; set; }
        public string Cytoplasm { get; set; }
        public string Breakage { get; set; }
        public Boolean IVM { get; set; }
        public string Embryologist { get; set; }
        public string Witness { get; set; }
        public string MaturityDesc { get; set; }
        public string PBLocationDesc { get; set; }
        public string LocationDesc { get; set; }

    }
    public class SemenDetail
    {
        public string Description { get; set; }
        public int ID { get; set; } 
        public bool Status { get; set; }
        public int IsPartner { get; set; }
        public int IsSemenPrepration { get; set; } //1 FOR PREPRATION 2 FOR THAW
    }

   
}
