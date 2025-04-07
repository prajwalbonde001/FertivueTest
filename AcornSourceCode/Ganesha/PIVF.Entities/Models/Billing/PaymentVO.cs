using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{
    public class PaymentVO
    {
        [Key]
        public int PaymentID { get; set; }
        public long tempPaymentID1 { get; set; }  
        public int PaymentUnitID { get; set; }
        public DateTime Date { get; set; }
        public string ReceiptNo { get; set; }
        public int BillID { get; set; }
        public decimal BillAmount { get; set; }
        public decimal BillBalanceAmount { get; set; }
        public int AdvanceID { get; set; } 
        public decimal AdvanceAmount { get; set; }
        public decimal AdvanceBalance { get; set; }
        public decimal AdvanceUsed { get; set; }
        public int RefundID { get; set; }
        public decimal RefundAmount { get; set; }
        public string Remarks { get; set; }
        public bool Status { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        //public bool Synchronized { get; set; }
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
        public int InvoiceID { get; set; }
        public decimal PaidAmount { get; set; }   //Added by Nayan Kamble on 18/02/2020
         

    }
}
