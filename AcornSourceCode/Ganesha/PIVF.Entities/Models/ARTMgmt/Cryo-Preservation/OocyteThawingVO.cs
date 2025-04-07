using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Cryo_Preservation
{
    public class OocyteThawingVO
    {
        public long VitriID { get; set; }
        public long VitriUnitID { get; set; }
        public long VitriDetailID { get; set; }
        public long VitriDetailUnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public bool IsFET { get; set; }
        public long ThawID { get; set; }
        public long ThawUnitID { get; set; }
        public long SelectedTherapyID { get; set; }
        public long SelectedTherapyUnitID { get; set; }
        public string SelectedCycleCode { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public string CycleCode { get; set; }
        public long OocyteNo { get; set; }
        public long EmbSerialNumber { get; set; }
        public string Tank { get; set; }
        public string Canister { get; set; }
        public string GlobetColor { get; set; }
        public string GlobetSize { get; set; }
        public string CryoLock { get; set; }
        public string Remark { get; set; }
        //public string ThawRemark { get; set; }
        public DateTime? VitriDate { get; set; }
        public DateTime? VitriTime { get; set; }
        public string EmbryoLogist { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? ExpiryTime { get; set; }
        //public DateTime? ThawingDate { get; set; }
        //public DateTime? ThawingTime { get; set; }
        public string WitnessEmbryoLogist { get; set; }
        public string CurrentStatus { get; set; }
        public bool IsthawDone { get; set; }
        public bool chkVitrification { get; set; }
        public long PostThawPlanID { get; set; }

        public int CellStageID { get; set; }
        public int GradeID { get; set; }
        public long EmbryologistID { get; set; }
        public long WitEmbryologistID { get; set; }
        public bool IsFinalize { get; set; }
        public bool TimeInvalid { get; set; }
        public bool DateInvalid { get; set; }
        public bool IsVitriDisable { get; set; }
        public long? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public bool Fresh { get; set; } = false;
        public bool Donor { get; set; }
        public bool DonorEmb { get; set; }
        public List<OocyteThawingVO> lstVitriSummary { get; set; }
        public List<OocyteThaw> lstThaw { get; set; }

        public string LotNo { get; set; }
        public DateTime? MediaExpiryDate { get; set; }
        public string FreezingNo { get; set; }
        public string MediaUsed { get; set; }
    }

    public class OocyteThaw
    {
        public long ThawID { get; set; }
        public long ThawUnitID { get; set; }
        public long VitriDetailID { get; set; }
        public long VitriDetailUnitID { get; set; }
        public bool IsFET { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public DateTime? ThawingDate { get; set; }
        public DateTime? ThawingTime { get; set; }
        public string Remark { get; set; }
        public long EmbryologistID { get; set; }
        public long WitEmbryologistID { get; set; }
        public bool TimeInvalid { get; set; }
        public bool DateInvalid { get; set; }
        public bool IsFinalize { get; set; }
        public long PostThawPlanID { get; set; }
        public int CellStageID { get; set; }
        public int GradeID { get; set; }
        public string CycleCode { get; set; }
        public string OocyteNo { get; set; }
        public long EmbSerialNumber { get; set; }
        public long VitriID { get; set; }
        public bool Fresh { get; set; } = false;
        public bool Donor { get; set; }
        public bool DonorEmb { get; set; }
    }
}
