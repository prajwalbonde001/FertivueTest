using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Cryo_Preservation
{
  public class EmbryoThowingVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long VitrivicationID { get; set; }
        public long VitrificationUnitID { get; set; }
        public string CycleCode { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public long EmbNumber { get; set; }
        public long EmbSerialNumber { get; set; }
        public DateTime? VitriDate { get; set; }
        public DateTime? VitriTime { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? ExpiryTime { get; set; }
        public DateTime? EmbDate { get; set; }
        public DateTime? EmbTime { get; set; }
        public string Tank { get; set; }
        public string Conistor { get; set; }
        public string GlobletColor { get; set; }
        public string GlobletSize { get; set; }
        public string Cryolock { get; set; }
        public string CellSatge { get; set; }
        public string Grade { get; set; }
        public string Day { get; set; }
        public bool IsFET { get; set; }
        public string Embryologist { get; set; }
        public string Witness { get; set; }
        public string Remarks { get; set; }
        public Boolean IsFinalized { get; set; }
        public long IsThawDone { get; set; }
        public Boolean Isfresh { get; set; }
        public string IsfreshStatus { get; set; }
        public Boolean IsThawFinalize { get; set; }
        public long coupleId { get; set; }
        public long CoupleUnitID { get; set; }
        public long PGDPGSDone { get; set; }
        //Thow Vo
        public DateTime? ThowDate { get; set; }
        public DateTime? ThowTime { get; set; }
        public int ThowEmbryologistID { get; set; }
        public int ThowWitnessID { get; set; }
        public string ThowRemark { get; set; }
        public Boolean ThowFinalize { get; set; }
        public int ThawingPlanID {get;set;}
        public bool Donor { get; set; }
        public bool Fresh { get; set; }
        public bool DonorEmb { get; set; }
        public List<CommanEntity> ThawingPlan { get; set; }
        public List<CommanEntity> ThowEmbryologist { get; set; }
        public List<CommanEntity> ThowWitness { get; set; }

        public string LotNo { get; set; }
        public DateTime? MediaExpiryDate { get; set; }
        public string FreezingNo { get; set; }
        public string MediaUsed { get; set; }

    }
}
