using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Consent.ConsentMaster
{
    public class ConsentLinkDetailsVO
    {
        public int ID { get; set; }
        public int ConsentID { get; set; }
        public int ARTTypeID { get; set; }
        public int ARTSubTypeID { get; set; }
        public int PatientCategoryID { get; set; }
        public string PCategoryDesc { get; set; }
        public string ARTTypeDesc { get; set; }
        public string ARTSubTypeDesc { get; set; }
        public string Reason { get; set; }
        public bool Status { get; set; }
        public int ResultStatus { get; set; }

    }
}
