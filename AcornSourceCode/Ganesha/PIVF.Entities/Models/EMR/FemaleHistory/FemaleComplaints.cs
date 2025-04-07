using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.FemaleHistory
{
    public class FemaleComplaints
    {
        public Int32 FCID { get; set; }
        public Nullable<Int32> FCPatientID { get; set; }
        public Nullable<Int32> FCUserID { get; set; }
        public Nullable<Int32> UnitID { get; set; }

        public Nullable<Int32> unitID { get; set; }
        public string PresentingComplaints { get; set; }
        public string OtherComplaints { get; set; }
        public DateTime? LMPDate { get; set; }
        public string FollowUpNotes { get; set; }
        public string CaseSummary { get; set; }        
        public DateTime? NFUpDate { get; set; }
        public string Reason { get; set; }
        public DateTime? FCDate { get; set; }
        public string UserName { get; set; }
        public List<clsPresentingComplaints> PresentingComplaintsSelected { get; set; }
        public List<ComplaintDetails> lstCompDetails { get; set; }
    }

    public class clsPresentingComplaints
    {
        public int id { get; set; }
    }

    public class ComplaintDetails
    {
        public int ID { get; set; }
        public int CompID { get; set; }
        public int PreComID { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string PreComplaints { get; set; }
        public int Onset { get; set; }
        public string Modality { get; set; }
        public string OtherComplaints { get; set; }
        public int ModID { get; set; }
        public string  OnsetDesc { get; set; }
    }
}
