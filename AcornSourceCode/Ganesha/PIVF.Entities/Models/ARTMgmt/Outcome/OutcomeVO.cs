using PIVF.Entities.Models.ARTMgmt.Embrology;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Outcome
{
    public class OutcomeVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public string CycleCode { get; set; }
        public DateTime? DateOfObservation { get; set; }
        public int NoOfSacs { get; set; }
        public string Remark { get; set; }
        public string Complications { get; set; }
        public bool IsCycleClose { get; set; }
        public int DeliveryID { get; set; }
        public int DeliveryTypeID { get; set; }
        public int WeaksOfgestation { get; set; }
        public int? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string GeneticAnalysisReportImage { get; set; }

        public byte[] FinalGeneticAnalysisReportImage { get; set; }
        public string GeneticAnalysisReportFileName { get; set; }


        public List<BHCG> lstBHCG = new List<BHCG>();
        public List<USG> lstUSG = new List<USG>();
        public List<BirthDetail> lstBirthDetail = new List<BirthDetail>();

        //Added by Nayan Kamble
        public DateTime? DateOfObservationS { get; set; }
        public int NoOfSacsS { get; set; }
        public List<MainUSG> lstMainUSG = new List<MainUSG>();
        public List<SurrogateList> lstSurrogate = new List<SurrogateList>();

    }
    //Added by Nayan Kamble
    public class SurrogateList
    {
        public string SurrogateMrno { get; set; }
        public int TransferToID { get; set; }
        public int SurrogateUnitID { get; set; }
        public int SurrogateID { get; set; }
    }
    public class MainUSG
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public int OutcomeID { get; set; }
        public int OutcomeUnitID { get; set; }
        public string USGTitle { get; set; }
        public DateTime? DateOfObservation { get; set; }
        public DateTime? DateOfObservationS { get; set; }
        public int NoOfSacs { get; set; }
        public int NoOfSacsS { get; set; }
        public int NoofFH { get; set; }
        public int LinkID { get; set; }
        public int NoofFHS { get; set; }
    }

    public class BHCG
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public string BHCGTitle { get; set; }
        public DateTime? HCGDate { get; set; }
        public decimal Result { get; set; }
        public int IsPositive { get; set; }
       
        public bool DateInvalid { get; set; }
        public int TransferToID { get; set; }    //Added by Nayan Kamble
    }

    public class USG
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public string SacTitle { get; set; }
        public bool IsFetalHeart { get; set; }
        public long OutcomeID { get; set; }
        public string USGRemark { get; set; }
    }

    public class BirthDetail
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public string Child { get; set; }
        public int GrimaceID { get; set; }
        public bool IsCongiAbnorm { get; set; }
        public long ActivityID { get; set; }
        public long PulseID { get; set; }
        public long AppearanceID { get; set; }
        public long RespirationID { get; set; }
        public string Remark { get; set; }
        public string Score { get; set; }
        public decimal BirthWeight { get; set; }
        public int TransferToID { get; set; }   //Added by Nayan Kamble
    }
    
}
