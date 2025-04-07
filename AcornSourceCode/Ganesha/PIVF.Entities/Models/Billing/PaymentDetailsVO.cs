using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{
   public class PaymentDetailsVO
    {
        [Key]
        public int PaymentDetailID { get; set; }
        public int PaymentDetailUnitID { get; set; }
        public int PaymentID { get; set; }
        public int PaymentModeID { get; set; } 
        public string Number { get; set; }
        public DateTime? Date { get; set; }
        public int BankID { get; set; }
        public int AdvanceID { get; set; }
        public decimal AdvanceAmount { get; set; }
        public decimal AdvanceBalance { get; set; }
        public decimal AdvanceUsed { get; set; }
        public int AdvanceUnitID { get; set; }
        public decimal PaidAmount { get; set; }
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

        public bool IsPaymentModeID { get; set; }
        public bool IsAmountNotFill { get; set; }
        public bool IsNumberNotFill { get; set; }
        public bool IsBankIDNotFill { get; set; }
        public bool IsDateIDNotFill { get; set; }
        public bool CashMode { get; set; }
        public bool dtpickropened { get; set; }
        public bool DisableAmount { get; set; } 




    }
}
