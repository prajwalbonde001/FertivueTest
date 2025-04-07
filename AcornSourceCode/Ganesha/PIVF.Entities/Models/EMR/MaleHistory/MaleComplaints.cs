using PIVF.Entities.Models.EMR.FemaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.MaleHistory
{
    public class MaleComplaints
    {
        public Int32 MCID { get; set; }
        public Nullable<Int32> MCPatientID { get; set; }
        public Nullable<Int32> MCUserID { get; set; }
        public Nullable<Int32> UnitID { get; set; }
        public string PresentingComplaints { get; set; }
        public string OtherComplaints { get; set; }
        
        public string FollowUpNotes { get; set; }
        public Nullable<DateTime> NFUpDate { get; set; }
        public string Reason { get; set; }
        public Nullable<DateTime> MCDate { get; set; }
        public string UserName { get; set; }
        public List<clsPresentingComplaints> PresentingComplaintsSelected { get; set; }
        public List<ComplaintDetails> lstCompDetails { get; set; }
    }
    public class clsPresentingComplaints
    {
        public int id { get; set; }
    }
}
