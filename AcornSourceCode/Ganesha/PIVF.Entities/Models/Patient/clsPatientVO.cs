using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Patient
{
    public class clsPatientVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }      
        public string PatientName { get; set; }
        public int GenderID { get; set; }
        public string Gender { get; set; }
        public string MRNo { get; set; }

        public string Email { get; set; }
        public long MobCountryCode { get; set; }
        public string MobileNo { get; set; }
        public int PatientCategoryID { get; set; }
        public long VisitID { get; set; }
        public long VisitUnitID { get; set; }
        public long VisitStatusID { get; set; }
        public int Age { get; set; }
        public int TotalCount { get; set; }
        public bool Status { get; set; }
        public bool IsDonorUsed { get; set; }
        public bool IsSurrogateUsed { get; set; }
        public DateTime? Date { get; set; }
        public List<clsPatientImagesVO> ListPatientImages = new List<clsPatientImagesVO>();
        public long VitriFicationID { get; set; }
        public long VitriFicationUnitID { get; set; }
        public Boolean Isdisable { get; set; }
        public bool IsSurrogateLinked { get; set; }    //Added by Nayan Kamble
        public bool IsDonorLinked { get; set; }   //Added by Nayan Kamble
        public long MobCountryCodeID { get; set; }
        public long ContactNo1 { get; set; }

    }
}
