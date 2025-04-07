using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.DesignEMR
{
    public class DesignEMRVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; } //for Transaction
        public long TID { get; set; } //for Transaction
        public long TUnitID { get; set; } //for Transaction
        public string SNO { get; set; }
        public string DICOMLink { get; set; }


        public string TempName { get; set; }
        public long GenderID { get; set; }
        public long FormID { get; set; }
        public string GenderDesc { get; set; }
        public string FormDesc { get; set; }
        public string FormTypeDesc { get; set; }
        public string ModelDescription { get; set; }
        public DateTime? TempDate { get; set; }
        public string EditorSchema { get; set; }
        public string SchemaDecription { get; set; }
        public string FormDecription { get; set; }
        public long TotalRows { get; set; }      
        public bool Status { get; set; }
        public int AddedBy { get; set; }
        public int AddedUnitID { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public int UpdatedBy { get; set; }
        public int UpdatedUnitID { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public string Reason { get; set; }
        public string ReasonDeactive { get; set; }
        public string DocName { get; set; }  //added by sujata cross clinic new paraameter add 
        public string Clinicname { get; set; }
        public long VisitID { get; set; }
        public long VisitUnitID { get; set; }


        public List<clsPatientImagesVO> ListPatientImages = new List<clsPatientImagesVO>();
    }

}
