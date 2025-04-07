using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Cryo_Preservation
{
   public class FreezeEmbryoVO
    {
        public long ID { get; set; } 
        public long UnitID { get; set; }
        public long VitrivicationID { get; set; }
        public long VitrificationUnitID { get; set; }
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
        public int TankID { get; set; }
        public int ConistorID { get; set; }
        public int GlobletColorID { get; set; }
        public int CryolockColourID { get; set; }
        public int VisotubeColourID { get; set; }
        public int GlobletSizeID { get; set; }
        public int CryolockID { get; set; }
        public string CellSatge { get; set; }
        public string Grade { get; set; }
        public String Day { get; set; }
        public long EmbryologistID { get; set; }
        public long WitnessID { get; set; }
        public string Remarks { get; set; }
        public Boolean IsFinalized { get; set; }
        public string Isfresh { get; set; }
        public List<CommanEntity> Tank { get; set; }
        public List<CommanEntity> Canister { get; set; }
        public List<CommanEntity> GobletColor { get; set; }
        public List<CommanEntity> GobletSize { get; set; }
        public List<CommanEntity> Cryolock { get; set; }
        public List<CommanEntity> VisotubeColour { get; set; }
        public List<CommanEntity> CryolockColour { get; set; }
        public List<CommanEntity> Embryologist { get; set; }
        public List<CommanEntity> Witness { get; set; }
        public List<CommanEntity> ListMediaUsed { get; set; }

        public long MediaID { get; set; }
        public string LotNo { get; set; }
        public DateTime? MediaExpiryDate { get; set; }
        public string FreezingNo { get; set; }
        public string MediaUsed { get; set; }
    }
}
