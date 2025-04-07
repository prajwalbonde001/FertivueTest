using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification
{
    public class IVF_VitrificationDetailsVO
    {

        public long ID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long VitrivicationID { get; set; }
        public long VitrificationUnitID { get; set; }
        public long EmbNumber { get; set; }
        public long EmbSerialNumber { get; set; }
        public DateTime? VitriDate { get; set; }
        public DateTime? VitriTime { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? ExpiryTime { get; set; }
        public long TankId { get; set; }
        public long OocyteMaturityID { get; set; }
        public long CanisterID { get; set; }
        public long ConistorID { get; set; }
        public long ColorCodeID { get; set; }
        public long GobletSizeId { get; set; }
        public long GlobletColorID { get; set; }
        public long GlobletSizeID { get; set; }
        public long CryolockID { get; set; }
        public string CyolockColor { get; set; }
        public string VisotubeColour { get; set; }
        public long EmbryologistID { get; set; }
        public bool Donor { get; set; }
        public bool Fresh { get; set; }
        public bool DonorEmb { get; set; }
        public bool IsFET { get; set; }
        public long Witness { get; set; }
        public long CoupleID { get; set; }
        public long Maturity { get; set; }
        public String Remarks { get; set; }
        public bool IsFinalized { get; set; }
        public DateTime? TransferDate { get; set; }
        public bool IsThawingDone { get; set; }
        public long OocyteDonorID { get; set; }
        public long OocyteDonorUnitID { get; set; }
        public bool UsedByOtherCycle { get; set; }
        public long UsedTherapyID { get; set; }
        public long UsedTherapyUnitID { get; set; }
        public DateTime? ReceivingDate { get; set; }
        public long TransferDayNo { get; set; }
        public bool IsFreezeOocytes { get; set; }
        public bool IsRefreeze { get; set; }
        public bool IsRefreezeFromOtherCycle { get; set; }
        public bool IsDiscard { get; set; }
        public bool IsDonate { get; set; }
        public long RecepientPatientID { get; set; }
        public long RecepientPatientUnitID { get; set; }
        public bool IsReceived { get; set; }
        public long DonorPatientID { get; set; }
        public long DonorPatientUnitID { get; set; }
        public bool IsDonateCryo { get; set; }
        public bool IsDonatedCryoReceived { get; set; }
        public bool IsDonorCycleDonateCryo { get; set; }
        public bool IsFreshEmbryoPGDPGS { get; set; }
        public bool IsFrozenEmbryoPGDPGS { get; set; }
        public string MaturityDesc { get; set; }
        public string StatusDesc { get; set; }
        //Code added by Manohar
        public string MRNo { get; set; }
        public string PatientName { get; set; }
        public string DonorCode { get; set; }
        public string VitrificationNo { get; set; }
        public string CycleCode { get; set; }
        public string CanistorDescription { get; set; }
        public string GlobletColorDescription { get; set; }
        public string GlobletSizeDescription { get; set; }
        public string TankDescription { get; set; }
        public long VitrificationDetailID { get; set; }
        public string CellStageDescription { get; set; }
        public string CryoLockDescription { get; set; }
        public string CustomStatus { get; set; }
        public string DoctorName { get; set; }
        public string WitnessName { get; set; }
        public string Clinician { get; set; }
        public int TotalRecords { get; set; }
        public string strReport { get; set; }
        public byte[] Report { get; set; }
        public string DocName { get; set; }
        public bool IsConsent { get; set; }
        public string ConsentDescription { get; set; }
        public string TransportDescription { get; set; }
        public DateTime? TransportDate { get; set; }
        public long TransportID { get; set; }

        public string TransportRemark { get; set; }
        public bool IsFromOocytesBank { get; set; }
        public string TransferDayNo1 { get; set; }

        public long MediaID { get; set; }
        public string LotNo { get; set; }
        public DateTime? MediaExpiryDate { get; set; }
        public string FreezingNo { get; set; }
        public string MediaUsed { get; set; }
        public long CellStageID { get; set; }
        public long GradeID { get; set; }
    }
}
