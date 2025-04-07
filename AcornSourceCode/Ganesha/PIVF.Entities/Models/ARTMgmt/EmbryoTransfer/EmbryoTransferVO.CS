using PIVF.Entities.Models.ARTMgmt.Embrology;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.EmbryoTransfer
{
    public class EmbryoTransferVO
    {
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long TherapyID { get; set; }
        public long TherapyUnitID { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? OPUDate { get; set; }
        public DateTime? Time { get; set; }
        public List<CommanEntity> clinician { get; set; }
        public int clinicianID { get; set; }
        public List<CommanEntity> Embryologist { get; set; }
        public int EmbryologistID { get; set; }
        public List<CommanEntity> Witness { get; set; }
        public int WitnessID { get; set; }
        public List<CommanEntity> Anesthetist { get; set; }
        public int AnesthetistID { get; set; }
        public List<CommanEntity> Anesthesia { get; set; }
        public int AnesthesiaID { get; set; }
        public string EndometriumThickness { get; set; }
        public List<CommanEntity> EndometriumPattern { get; set; }
        public int EndometriumPatternID { get; set; }
        public List<CommanEntity> Catheter { get; set; }
        public int CatheterID { get; set; }
        public string DistanceFromfundus { get; set; }
        public List<CommanEntity> LevelOfDifficulty { get; set; }
        public int LevelOfDifficultyID { get; set; }
        public int Noofattempts { get; set; }
        public int Embryoresidue { get; set; }
        public Boolean PerformedunderAnesthesia { get; set; }
        public Boolean UseofStylet { get; set; }
        public Boolean UseofTenaculum { get; set; }
        public string Complications { get; set; }
        public string Remarks { get; set; }
        public DateTime? PregnancyDate { get; set; }
        public Boolean CancelCycleFlag { get; set; }
        public int CancelCycleRemark { get; set; } //change by mayur string to int
        public Boolean CloseCycle { get; set; }
        public Boolean Finalize { get; set; }
        public List<EmbryoDetailsVO> ETGrid { get; set; }
        public int EmbryosFertilized { get; set; }
        public int EmbryosCryopreserved { get; set; }
        public int FreshTransfer { get; set; }
        public int FrozenTransfer { get; set; }
        public string clinicianName { get; set; }
        public List<CommanEntity> ETCancelReason { get; set; }  // Added by mayur
        public int ReasonID { get; set; } // Added by mayur
    }
    public class EmbryoDetailsVO
    {
        public long ID { get; set; }
        public DateTime? Date { get; set; }
        public long EmbNumber { get; set; }
        public long EmbSerialNumber { get; set; }
        public string Grade { get; set; }
        public string EmbroDay { get; set; }
        public string CellStage { get; set; }
        public string ISfreshEmbro { get; set; }
        public string ISPGDPGS { get; set; }
        public string preview { get; set; }
        public OocytesImage Img { get; set; }
        public string SurrogateMrno { get; set; }  //Added by Nayan Kamble
        public int TransferToID { get; set; } = 0;  //Added by Nayan Kamble

    }
}
