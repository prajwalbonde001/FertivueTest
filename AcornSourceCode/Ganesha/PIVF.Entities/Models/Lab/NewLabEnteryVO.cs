using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Lab
{
    public class NewLabEnteryVO
    {
        public int PatientID { get; set; }
        public int PatientUnitID { get; set; }
        public string TestID { get; set; }
        public int AgeInDays { get; set; }
        public string MRNo { get; set; }
       
        public string PatientName { get; set; }
        public string Gender { get; set; }
        public int  Age { get; set; }
        public string MobCountryCode { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public DateTime? ReportDate { get; set; }
        public DateTime? SampleCollectionDate { get; set; }
        public long RefernceNo { get; set; }
        public int DoneBy { get; set; }
        public int AuthorizedBy { get; set; }
        public int SampleCollectionId { get; set; }

    }
}
