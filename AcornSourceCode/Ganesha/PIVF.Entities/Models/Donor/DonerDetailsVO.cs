using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Donor
{
    public  class DonerDetailsVO
    {
       
      
        public string PatientName {get;set;}
        public string MRNo { get; set; }
        public int Age { get; set; }
        
       
        public long ID { get; set; }
        public long UnitID { get; set; }
      
        public int GenderID { get; set; }
        public string Gender { get; set; }
     
        public int PatientCategoryID { get; set; }
        public long VisitID { get; set; }
        public long VisitUnitID { get; set; }
        public long VisitStatusID { get; set; }
       
        public int TotalCount { get; set; }
        public bool Status { get; set; }
        public bool IsDonorUsed { get; set; }
        public bool IsSurrogateUsed { get; set; }
        public DateTime? Date { get; set; }
        public string OcyteRetrived { get; set; }
        public string RemainingOcytes { get; set; }
        public string RemainingEmbriyo { get; set; }
        public string Cycle { get; set; }

        public string CycleCode { get; set; }
        public bool CycleStatus { get; set; }
        public int CrayoEmbriyo { get; set; }
        public int CrayoOcyte { get; set; }
        public bool IsSurrogateLinked { get; set; }    //Added by Nayan Kamble
        public bool IsDonorLinked { get; set; }   //Added by Nayan Kamble   
    }
}
