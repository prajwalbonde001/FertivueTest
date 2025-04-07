using PIVF.Entities.Models.NewRegistration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{
    public class PatientAdvanceVO
    {
        public long AdvanceID { get; set; }
        public long AdvanceUnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public int Refund { get; set; }
        public int Total { get; set; }
        public int Balance { get; set; }
        public DateTime Date { get; set; }
        public string AdvanceAgainst { get; set; }
        public string AdvanceType { get; set; }
        public string AdvanceNo { get; set; }
        public string UnitName { get; set; }
        public int Used { get; set; }
        public int CompanyID { get; set; }
        public int AdvAgID { get; set; }
        public int AdvTypeID { get; set; }
        public decimal Amount { get; set; }        
        public string PanCardNo { get; set; }        
        public string Remarks { get; set; }        
        public List<NewPatient> lstPatientDataDetails { get; set; }        
        public List<List<PaymentInfoVO>> lstPaymentModeDetails { get; set; }
        public int TotalRows { get; set; }

    }
    public class PaymentInfoVO
    {
        public int PaymentDetailID { get; set; }
        public int BankID { get; set; }
        public string AccountName { get; set; }
        public string BranchName { get; set; }
        public string IFSCCode { get; set; }
        public int PaymentAmount { get; set; }
        public decimal Amount { get; set; }
        public decimal RefundAmount { get; set; }
        public DateTime? PaymentDate { get; set; }
        public int PaymentModeID { get; set; }
        public string TransactionNo { get; set; }
        public int PaymentID { get; set; }
        public long ChargeID { get; set; }
    }


    public class AdvanceList
    {
        public long AdvanceID { get; set; }
        public long AdvanceUnitID { get; set; }
        public DateTime Date { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public string AdvanceNO { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal BalanceAmount { get; set; }
        public decimal Refund { get; set; }
        public decimal UsedAmount { get; set; }
        public string MRNo { get; set; }
        public string Name { get; set; }
        public int AdvanceAgainstID { get; set; }
        public int AdvanceTypeId { get; set; }
         public string UnitName { get; set; }
        public string AdvanceAgainst { get; set; }
        public string Remarks { get; set; }

    }


    public class AddAdvance
    {
        public long AdvanceID { get; set; }
        public long? UnitID { get; set; }
        public long? PatientID { get; set; }
        public long? PatientUnitID { get; set; }
        public long? CompanyID { get; set; }
        public DateTime? Date { get; set; }
        public float? Amount { get; set; }
        public long? AdvTypeID { get; set; }
        public long? AdvAgID { get; set; }
        public float? Used { get; set; }
        public float? Refund { get; set; }
        public float? Balance { get; set; }
        public bool? Status { get; set; }
        public long? CreatedUnitID { get; set; }
        public long? UpdatedUnitID { get; set; }
        public long? AddedBy { get; set; }
        public string AddedOn { get; set; } = null;
        public DateTime? AddedDateTime { get; set; }
        public long? UpdatedBy { get; set; }
        public string UpdatedOn { get; set; } = null;
        public DateTime? UpdatedDateTime { get; set; }
        public string Remarks { get; set; } = null;
        public bool? Synchronized { get; set; }
        public string AdvanceNO { get; set; }
        public List<NewPatient> lstPatientDataDetails { get; set; }
        public List<List<PaymentInfoVO>> lstPaymentModeDetails { get; set; }
    }

    public class AdvanceBalance
    {

        public float Balance { get; set; }
        public long AdvanceID { get; set; }

        public float AdvanceAmount { get; set; }

        public float AdvanceUsed { get; set; }

    }
}
