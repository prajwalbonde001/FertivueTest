using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.MediaConsumption
{
    public class MediaConsumptionVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public DateTime Date { get; set; }
        public long ItemID { get; set; }
        public long BatchID { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string BatchName { get; set; }
        public DateTime ExpiryDate { get; set; }
        public long UsedQty { get; set; }
        public long UOMID { get; set; }
        public string UOMDesc { get; set; }
        public long ProcedureID { get; set; }
        public string ProcedureDesc { get; set; }
        public string Reason { get; set; }        
        public bool Status { get; set; }
        public bool Finalized { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public int ResultStatus { get; set; }
    }
}
