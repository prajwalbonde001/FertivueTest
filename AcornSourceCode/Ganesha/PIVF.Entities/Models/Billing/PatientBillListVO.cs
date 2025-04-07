using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{   
   public class PatientBillListVO
    {
        [Key]
        public int ClinicID { get; set; } 
        public DateTime FromDate { get; set; } 
        public DateTime ToDate { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string MRNO { get; set; }
        public int BillNO { get; set; }  
        public string OPDNO { get; set; }
        public int BillStatus { get; set; } 
        public int BillType { get; set; }
        public int BillFormat { get; set; } 

    }

    public class CheckedInPatients
    {
        public long UnitId { get; set; }
        public long PatientCategoryID { get; set; }
        public long VisitID { get; set; }
        public long PatientID { get; set; } 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long PatientUnitID { get; set; }
        public string MRNo { get; set; }
        public string ContactNo1 { get; set; }
        public long DocId { get; set; }
        public string PatientName { get; set; }
        public int Age { get; set; }
        public string Prefix { get; set; }
        public string Gender { get; set; }
        public string PatientAddress { get; set; }
        public string CommunicationAddress { get; set; }
    }
}
