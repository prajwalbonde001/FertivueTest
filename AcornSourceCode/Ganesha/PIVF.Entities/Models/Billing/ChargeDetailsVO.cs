using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{
   public class ChargeDetailsVO
    {
        [Key]
        public int ChargeDetailID { get; set; } 
        public int ChargeDetailUnitID { get; set; } 
        public int ChargeID { get; set; }
        public int ChargeUnitID { get; set; }
        public DateTime Date { get; set; }
        public float Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal ConcessionAmount { get; set; }
        public decimal ServiceTaxAmount { get; set; }
        public decimal NetAmount { get; set; }
        public decimal PatientPaidAmount { get; set; }
        public decimal SponsorPaidAmount { get; set; }
        public decimal PatientBalanceAmount { get; set; }
        public decimal SponsorBalanceAmount { get; set; }
        public int ParentID { get; set; }
        public int RefundID { get; set; }
        public float RefundAmount { get; set; }
        public bool Status { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
       // public bool Synchronized { get; set; }

        private bool? _Synchronized = false;

        public bool? Synchronized
        {
            get
            {
                return _Synchronized;
            }
            set
            {
                _Synchronized = value;
            }
        }
























    }
}
