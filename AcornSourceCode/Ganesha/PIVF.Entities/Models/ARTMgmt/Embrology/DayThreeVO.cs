using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Embrology
{
   public class DayThreeVO
    {
        public long ID { get; set; } //graphical representation ID
        public long DayThreeID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public bool Finalize1 { get; set; }
        public long PatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long DonorId { get; set; }
        public long DonorCycleCode { get; set; }
        public  long DonorUnitId { get; set; }
        public bool Donor { get; set; }
        public bool Fresh { get; set; }
        public bool DonorEmb { get; set; }

        public long PlanTherapyUnitID { get; set; }
        public long OocyteNumber { get; set; }
        public long SerialOocyteNumber { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? Time { get; set; }
        public bool Finalize { get; set; }
        public bool opened { get; set; }
        public List<CommanEntity> CellStage { get; set; }
        public List<CommanEntity> Grade { get; set; }
        public List<CommanEntity> Plan { get; set; }
        public List<CommanEntity> Incubator { get; set; }
        public int CleavageID { get; set; }      //Added by Nayan Kamble
        public List<CommanEntity> Symmetry { get; set; }
        public List<CommanEntity> Cleavage { get; set; }         //Added by Nayan Kamble
        public List<CommanEntity> FragmentationDistribution { get; set; }
        public List<CommanEntity> FragmentationList { get; set; }
        public int FragmentationID { get; set; }
        public List<CommanEntity> Nuclei { get; set; }

        public List<CommanEntity> Witness { get; set; }
        public List<CommanEntity> PGDPGSMethod { get; set; }
        public bool AssistedHatching { get; set; }
        public int CellStageID { get; set; }
        public int PlanID { get; set; }
        public int WitnessID { get; set; }
        public int IncubatorID { get; set; }
        public string Remarks { get; set; }
        public OocytesImage Img { get; set; }
        public int GradeID { get; set; }

        public string Fragmentation { get; set; }
        public int SymmetryID { get; set; }
        public int FragmentationDistributionID { get; set; }
        public int NucleiID { get; set; }

        public string Day0Plan { get; set; }
        public Boolean Day1finalize { get; set; }
        public int Day1PlanID { get; set; }
        public Boolean activeOocytes { get; set; }
        public string Day1Plan { get; set; }
        public int Day1Fertilization { get; set; }
        public string daytwocellsatge { get; set; }
        public string daytwograde { get; set; }
        public DayZeroForToolTip ZeroTooltip { get; set; }
        public Boolean IsExtend { get; set; }
        public Boolean SameDay { get; set; }
        public Boolean IsFromDonar { get; set; }
        public long DonarLinkCycleIsAvialble { get; set; }
        public long ISDonarEmbET { get; set; }
        public long ISEmbET { get; set; }
        public string EmbryologistDesc { get; set; }
        public Boolean FreezeEmbryo { get; set; }
        public int DonateDay { get; set; }
        public long CoupleID { get; set; }
        public string MasFertilization { get; set; }
        public string MasCellStage { get; set; }
        public string MasNucleoli { get; set; }
        //Add PGDPGS For Apollo
        public int PGD { get; set; }
        public int PGS { get; set; }
        public DateTime? PGDPGSDate { get; set; }
        public DateTime? PGDPGSTime { get; set; }
        public int PGDPGSMethodID { get; set; }
        public string PGDPGSDOC { get; set; }

       // public Boolean Day3Status { get; set; }
        public byte[] PGDPGSbyte { get; set; }
        public Boolean ExtendPGDPGS { get; set; }
        public int ResultID { get; set; }
        public List<BIOPSY> BIOPSYDetails { get; set; }

        public long BIOPSYStatus { get; set; }

        public string PolarBodyDay1Desc { get; set; }
        public string PNDesc { get; set; }
        public string PNSizeDesc { get; set; }
        public string NPBDesc { get; set; }
        public string CytoplasmicHaloDesc { get; set; }
        public string GradeDesc { get; set; }
        public string CleavageDesc { get; set; }
        public string Day2Symmetry { get; set; }
        public string Day2FragmentationDistribution { get; set; }
        public string Day2Nuclei { get; set; }
        public string Day2Plan { get; set; }
        public string Day2Fragmentation { get; set; }
        public List<LinkedPatientList> LinkPatientList { get; set; }
    }
 

    public class BIOPSY
    {
        public int EmbryoNo { get; set; }
        public string Monosomy { get; set; }
        public string Trisomy { get; set; }
       
    }


}
