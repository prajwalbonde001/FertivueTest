using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.FemaleHistory
{
    public class CorpusLeteumScan
    {
        public int ID { get; set; }
        public Nullable<Int32> UnitID { get; set; }  
        public Nullable<Int32> CLSPatientID { get; set; }
        public Nullable<Int32> CLSUserID { get; set; }
        public Nullable<Int32> TherapyId { get; set; }
        public string CycleDay { get; set; }
        public bool DisableEdit { get; set; } 
        public string Cyclecode { get; set; }
        public Nullable<DateTime> TherapyDate { get; set; }
        public Nullable<DateTime> CorpusLeteumScanDate { get; set; }
        public Nullable<decimal> RIRight { get; set; }
        public Nullable<decimal> RILeft { get; set; }
        public Nullable<decimal> PIRight { get; set; }
        public Nullable<decimal> PILeft { get; set; }
        public Nullable<decimal> PSVRight { get; set; }
        public Nullable<decimal> PSVLeft { get; set; }
        public string CorpusLeteumScanComment { get; set; }  
        public Nullable<bool> IsFinalize { get; set; }
        public string TVS1 { get; set; }
        public string TVS2 { get; set; }
        public string TVS3 { get; set; }  
        public string VCD { get; set; }




    }
}
