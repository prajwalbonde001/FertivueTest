using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.Prescription
{
    public class PrescriptionVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long VisitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        //public DateTime? PrescriptionFollowUpDate { get; set; } // commented by sujata follupdata null sve
        public string PrescriptionFollowUpDate { get; set; }
        #region Common Properties  

        public bool Status { get; set; }
        //public long CreatedUnitID { get; set; }
        //public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        //public string AddedOn { get; set; }
        //public DateTime AddedDateTime { get; set; }
        //public long UpdatedBy { get; set; }
        //public string UpdatedOn { get; set; }
        //public string UpdatedDateTime { get; set; }
        //public string AddedWindowsLoginName { get; set; }
        //public string UpdatedWindowsLoginName { get; set; }
        //public bool Synchronized { get; set; }

        #endregion

        public List<DrugVO> DrugList { get; set; }
        public List<DrugVO> FavDrugList { get; set; }
        
        //public long DoctorID { get; set; }
        //public string Notes { get; set; }
        public long TemplateID { get; set; }
        public string TemplateName { get; set; }
       
        //public string Advice { get; set; }
        //public DateTime FollowUpDate { get; set; }

        //public string FollowUpRemark { get; set; }
        //public bool IsOPDIPD { get; set; }
        //public long RoundID { get; set; }
        //public int IsFrom { get; set; }
        //public bool NoFollowReq { get; set; }
        //public long AppoinmentReson { get; set; }

    }
}
