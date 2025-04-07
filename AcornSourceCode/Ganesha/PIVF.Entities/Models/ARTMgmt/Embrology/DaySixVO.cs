using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Embrology
{
   public class DaySixVO
    {
        public long ID { get; set; } //graphical representation ID
        public long DaySixID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public long OocyteNumber { get; set; }
        public long SerialOocyteNumber { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? Time { get; set; }
        public bool Finalize { get; set; }
        public bool Donor { get; set; }
        public bool Fresh { get; set; }
        public bool DonorEmb { get; set; }
        public bool opened { get; set; }
        public List<CommanEntity> BlastocystStage { get; set; }
        public int BlastocystStageID { get; set; }
        public List<CommanEntity> ICM { get; set; }
        public int ICMID { get; set; }
        public List<CommanEntity> TPD { get; set; }
        public int TPDID { get; set; }
        public List<CommanEntity> Plan { get; set; }
        public int PlanID { get; set; }

        public int FragmentationDistributionID { get; set; }
        public int GradeID { get; set; }
        public List<CommanEntity> Incubator { get; set; }
        public List<CommanEntity> Witness { get; set; }
        public bool AssistedHatching { get; set; }
        public bool HideAssistedHatching6 { get; set; }
        
        public int WitnessID { get; set; }
        public int IncubatorID { get; set; }
        public string Remarks { get; set; }
        public OocytesImage Img { get; set; }
        public string Day0Plan { get; set; }
        public Boolean Day1finalize { get; set; }
        public int Day1PlanID { get; set; }
        public Boolean activeOocytes { get; set; }
        

        public Boolean DisablePGDPGS6 { get; set; }

        public string Day1Plan { get; set; }
        public int Day1Fertilization { get; set; }
        public string daytwocellsatge { get; set; }
        public string daytwograde { get; set; }
        public string daythreecellsatge { get; set; }
        public string daythreegrade { get; set; }
        public string dayFourcellsatge { get; set; }
        public string dayfourgrade { get; set; }
        public string DayFive { get; set; }
        public List<CommanEntity> PGDPGSMethod { get; set; }

        public List<CommanEntity> FragmentationDistribution { get; set; }
        public List<CommanEntity> Grade { get; set; }
        public int PGDPGSMethodID { get; set; }
        public int PGD { get; set; }
        public int PGS { get; set; }
        public DateTime? PGDPGSDate { get; set; }
        public DateTime? PGDPGSTime { get; set; }
        public DayZeroForToolTip ZeroTooltip { get; set; }
        public Boolean IsExtend { get; set; }
        public Boolean SameDay { get; set; }
        public Boolean IsFromDonar { get; set; }
        public long DonarLinkCycleIsAvialble { get; set; }
        public long ISDonarEmbET { get; set; }
        public bool BIOPSYStatus1 { get; set; }
        public long ISEmbET { get; set; }
        public string PGDPGSDOC { get; set; }
        public byte[] PGDPGSbyte { get; set; }
        public Boolean ExtendPGDPGS { get; set; }
        public string EmbryologistDesc { get; set; }
        public long CoupleID { get; set; }
        public string MasFertilization { get; set; }
        public string MasCellStage { get; set; }
        public string MasNucleoli { get; set; }
        public int ResultID { get; set; }

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
        public string Day3Symmetry { get; set; }
        public string Day3FragmentationDistribution { get; set; }
        public string Day3Nuclei { get; set; }
        public string Day3Plan { get; set; }
        public string Day3Fragmentation { get; set; }
        public string Day4Symmetry { get; set; }
        public string Day4FragmentationDistribution { get; set; }
        public string Day4Nuclei { get; set; }
        public string Day4Plan { get; set; }
        public string Day4Fragmentation { get; set; }
        public string Day5FragmentationDistribution { get; set; }
        public string Day5Plan { get; set; }
        public string Day5Grade { get; set; }
        public string Day5Blastocyst { get; set; }
        public string Day5ICM { get; set; }
        public string Day5TPD { get; set; }
        public string GradeValue { get; set; }
        public List<LinkedPatientList> LinkPatientList { get; set; }
    }
}
