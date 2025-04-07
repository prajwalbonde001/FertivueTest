using PIVF.Entities.Models.NewRegistration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{
    public class PatientAdvanceRefundVO
    {
        public long RefundID { get; set; }
        public long RefundUnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long RefundAmount { get; set; }
        public long TotalAdvance { get; set; }
        public long AdvancedConsumed { get; set; }
        public long TotalRefund { get; set; }
        public long AdvanceAvailableRefund { get; set; }
        public string AdvanceNO { get; set; }
        public string ReceiptNo { get; set; }
        public string Remarks { get; set; }
        public string UnitName { get; set; }
        public DateTime RefundDate { get; set; }
        public List<NewPatient> lstPatientDataDetails { get; set; }
        public List<List<PaymentInfoVO>> lstPaymentModeDetails { get; set; }
        public List<PatientAdvanceVO> lstPatientAdvanceDetails { get; set; }
        public int TotalRows { get; set; }
    }

    public class RefundList
    {

        public long RefundID { get; set; }
        public long RefundUnitID { get; set; }
        public DateTime Date { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public string MRNO { get; set; }
        public string PatientName { get; set; }
        public string ReceiptNo { get; set; }
        public decimal Amount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal BalanceAmount { get; set; }
        public string UnitName { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal TotalAdvanceUsed { get; set; }
        public decimal TotalAdvanceAmount { get; set; }
        public decimal TotalBillBalance { get; set; }
        public string Remarks { get; set; }

    }
    public class PatientBillRefundVO
    {
        public long RefundID { get; set; }
        public long ChargeID { get; set; }
        public long RefundUnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long RefundAmount { get; set; }
        public long TotalAdvance { get; set; }
        public long AdvancedConsumed { get; set; }
        public long TotalRefund { get; set; }
        //  public long AdvanceAvailableRefund { get; set; }
        // public string AdvanceNO { get; set; }
        public string ReceiptNo { get; set; }
        public string Remarks { get; set; }
        public string UnitName { get; set; }
        public DateTime RefundDate { get; set; }
        public List<NewPatient> lstPatientDataDetails { get; set; }
        public List<List<PaymentInfoVO>> lstPaymentModeDetails { get; set; }
        public List<BillVO> lstPatientBillDetails { get; set; }
        public int TotalRows { get; set; }
    }
    public class BillDetails
    {
        public long BillID { get; set; }
        public long BillUnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal NetBillAmount { get; set; }
        public string BillNo { get; set; }
        public string UnitName { get; set; }
        public long ChargeID { get; set; }
        public long ChargeUnitID { get; set; }
        public string ServiceName { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalRefundAmount { get; set; }
        public decimal ConcessionAmount { get; set; }
        public decimal ConcessionPercent { get; set; }
        public int TotalRows { get; set; }
        //public string BillNo { get; set; }
        //public string UnitName { get; set; }
    }
}
