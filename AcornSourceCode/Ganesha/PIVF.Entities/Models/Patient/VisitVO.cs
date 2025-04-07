using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Patient
{
    public class VisitVO
    {
        public long UnitID { get;set;}
        public long VisitID { get; set; }
        public long VisitUnitID { get; set; }
        public DateTime Date { get; set; }
        public string OPDNO { get; set; }
        public string DocName { get; set; }
        public string Clinicname { get; set; }
        public long VisitTypeID { get; set; }
        public long DepartmentID { get; set; }
        public long DoctorID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public bool IsEnablePriscription { get; set; }
        public bool IsEnablePathology{ get; set; }
        public bool IsEnableRadiology{ get; set; }
        public bool IsEnableHistory { get; set; }
        public int TotalRows { get; set; }
    }
}
