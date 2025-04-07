using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Embrology
{
  public class DayOneVO
    {
        public long ID { get; set; } //graphical representation ID
        public long DayOneID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public long OocyteNumber { get; set; }
        public long SerialOocyteNumber { get; set; }
        public int Day0PlanID { get; set; }
        public string PlanName { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? Time { get; set; }
        public int FertilizationID { get; set; }
        public int CellStageID { get; set; }
        public int NucleoliID { get; set; }
        public int CleavageID { get; set; }

        public int PolarBodyDay1ID { get; set; }
        public int PNID { get; set; }
        public int PNSizeID { get; set; }
        public int NPBID { get; set; }
        public int CytoplasmicHaloID { get; set; }
        public int GradeID { get; set; }  
        public bool IsFET { get; set; } 
        public bool Donor { get; set; }
        public bool Fresh { get; set; }
        public bool DonorEmb { get; set; }

        public int PlanID { get; set; }
        public int IncubatorID { get; set; }
        public string Remarks { get; set; }
        public int WitnessID { get; set; }
        public bool Finalize { get; set; }
        public bool opened { get; set; }
        public List<CommanEntity> Fertilization { get; set; }
        public List<CommanEntity> CellStage { get; set; }
        public List<CommanEntity> Nucleoli { get; set; }
        public List<CommanEntity> Cleavage { get; set; }

        public List<CommanEntity> PolarBodyDay1 { get; set; }
        public List<CommanEntity> PN { get; set; }
        public List<CommanEntity> PNSize { get; set; }
        public List<CommanEntity> NPB { get; set; }
        public List<CommanEntity> CytoplasmicHalo { get; set; }
        public List<CommanEntity> Grade { get; set; }
        public string GradeDesc { get; set; }    //Added by Nayan Kamble



        public List<CommanEntity> Plan { get; set; }
        public List<CommanEntity> Incubator { get; set; }
        public List<CommanEntity> Witness { get; set; }
        public OocytesImage Img { get; set; }
        public OocytesImage ImgPreview { get; set; }
        public DayZeroForToolTip ZeroTooltip { get; set; }
        public Boolean IsExtend { get; set; }
        public Boolean SameDay { get; set; }
        public Boolean IsFromDonar { get; set; }
        public long DonarLinkCycleIsAvialble {get;set;}
        public long ISDonarEmbET { get; set; }
        public long ISEmbET { get; set; }
        public string EmbryologistDesc { get; set; }
        public long CoupleID { get; set; }
        public Boolean DonateFromBank { get; set; }
        public List<LinkedPatientList> LinkPatientList { get; set; } //added

       public List<LinkedPatientMaleList> LinkPatientMaleList { get; set; } //added sujata for cross clinic check flow sperm

    }
    public class OocytesImage
    {
        public int id { get; set; }
        public List<model1> model { get; set; }
    }
    public class model1
    {
        public long ID { get; set; }
        public string name { get; set; }
        public double percent { get; set; }
        public string preview { get; set; }
        public int size { get; set; }
        public Boolean rowdisable { get; set; }     
    }
}
