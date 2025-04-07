using PIVF.Entities.Models.CounterSale;
using PIVF.Entities.Models.Inventory;
using PIVF.Entities.Models.Master.Inventory;
using PIVF.Entities.Models.Master.IVF;
using PIVF.Entities.Models.NewRegistration;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{
    public class BillVO
    {
        [Key]
        public int BillID { get; set; }

        public long RegID { get; set; }
        public long GenderId { get; set; }
        public long RegUnitID { get; set; }

        public string Gender { get; set; }
        public string Prefix { get; set; }
        public long tempBillID { get; set; }
        public long tempBillUnitID { get; set; }
        public int BillUnitID { get; set; }
        public int UnitID { get; set; }
        public DateTime Date { get; set; }
        public int BillType { get; set; }
        public int VisitID { get; set; }
        public int VisitUnitID { get; set; }
        public int AdmissionID { get; set; }
        public int AdmissionUnitID { get; set; }
        public bool IsAgainstDonor { get; set; }
        public int PatientID { get; set; }
        public int PatientUnitID { get; set; }
        public int CashCounterID { get; set; }
        public int CompanyID { get; set; }
        public int PatientSourceID { get; set; }
        public int PatientCategoryID { get; set; }
        public int TariffID { get; set; }
        public string CompRefNo { get; set; }
        public DateTime Expirydate { get; set; }
        public int CampID { get; set; }
        public string BillNo { get; set; }
        public bool InterORFinal { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal TotalSettleDiscAmount { get; set; }
        public decimal TotalConcessionAmount { get; set; }
        public decimal NetBillAmount { get; set; }
        public decimal SelfAmount { get; set; }
        public decimal NonSelfAmount { get; set; }
        public decimal BalanceAmountSelf { get; set; }
        public decimal BalanceAmountNonSelf { get; set; }
        public decimal CrAmount { get; set; }
        public bool IsFree { get; set; }
        public bool IsSettled { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsPrinted { get; set; }
        public DateTime CancellationDate { get; set; }
        public DateTime CancellationTime { get; set; }
        public string CancellationReason { get; set; }
        public int ConcessionAuthorizedBy { get; set; }
        public bool SponserType { get; set; }
        public string BillCancellationRemark { get; set; }
        public string Remark { get; set; }
        public string ClaimNo { get; set; }
        public string BillRemark { get; set; }
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
        public bool IsFreezed { get; set; }
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
        public DateTime CompanyBillCancelDate { get; set; }
        public string CompanyBillCancelReason { get; set; }
        public bool IsInvoiceGenerated { get; set; }
        public decimal CalculatedNetBillAmount { get; set; }
        public int ConcessionReasonId { get; set; }
        public string ConcessionRemark { get; set; }
        public bool AgainstDonor { get; set; }

        public decimal BillBalanceAmount { get; set; }


        public int ServiceID { get; set; }
        public int ServiceCode { get; set; }
        public string Service { get; set; }
        public decimal Rate { get; set; }
        public decimal ConcessionPercent { get; set; }
        public decimal ConcessionAmount { get; set; }
        public decimal NetAmount { get; set; }
        public string DoctorName { get; set; }
        public int DoctorID { get; set; }
        public decimal TotalAmount { get; set; }
        public int ChargeID { get; set; }
        public int ChargeUnitID { get; set; }

        public decimal PaidAmount { get; set; }


        public string PatientName { get; set; }
        public string PartnerName { get; set; }
        public int PatientAge { get; set; }
        public int PartAge { get; set; }
        public string PatientGender { get; set; }
        public string PartnerGender { get; set; }
        public string PatientMRNo { get; set; }
        public string PartnerMRNo { get; set; }
        public long TotalCount { get; set; }
        public decimal Quantity { get; set; }
        public string PatientCommunicationAddress { get; set; }
        public string PartnerCommunicationAddress { get; set; }
        public string PatientMobileNo { get; set; }
        public string PartnerMobileNo { get; set; }
        public int PreviousOutstanding { get; set; }
        //public long TotalCount { get; set; }   

        public string MRNO { get; set; }
        public string OPDNo { get; set; }
        public string ReceiptNo { get; set; }   //Added by Nayan Kamble on 18/02/2020
        public int PaymentID { get; set; }   //Added by Nayan Kamble on 18/02/2020

        public List<PaymentVO> Payment { get; set; }
        public List<PaymentDetailsVO> OtherSrvPaymentModeList { get; set; }
        public List<ServiceMasterVO> SelectedOtherServiceList { get; set; }
        public List<ChargeVO> ChargeList { get; set; }
        public List<ChargeDetailsVO> ChargeDetailsList { get; set; }
        // CalTotalAmtList 
        public NewRegistrationVO objPatientRegistration { get; set; }

        public PatientVisit objPatientVisit { get; set; }
        public clsItemSalesVO objItemSalesVO { get; set; }
        //ItemStockVO
        public List<clsItemSalesDetailsVO> ItemSaleDetailsList { get; set; }
        //public List<ItemStockVO> ItemStockVOList { get; set; }
        public ItemStockVO objItemStockVO { get; set; }
        //ItemMasterVO

        public bool IsFromCounterSale { get; set; }
        public bool RateEditable { get; set; }

    }

    public class BillCancellationDetails
    {
        public long BillID { get; set; }
        public decimal PaymentAmount { get; set; }
        public bool IsCancelled { get; set; }
        public DateTime? CancellationDate { get; set; }
        public DateTime? CancellationTime { get; set; }
        public string BillCancellationRemark { get; set; }
        public List<NewPatient> lstPatientDataDetails { get; set; }
        public List<List<PaymentInfoVO>> lstPaymentModeDetails { get; set; }
        public List<PatientAdvanceVO> lstPatientAdvanceDetails { get; set; }

    }

    public class PatientAdvanceReport
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNO { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string PatientName { get; set; }
        public string MRNo { get; set; }
        public decimal Total { get; set; }
        public decimal Used { get; set; }
        public decimal Refund { get; set; }
        public decimal Balance { get; set; }
        public string AdvanceAgainst { get; set; }
        public string AdvanceNO { get; set; }
        public string CollectedBy { get; set; }
    }

    public class ServiceWiseBillingReport
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNO { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string PatientName { get; set; }
        public string MRNo { get; set; }
        public DateTime DateOfBill { get; set; }
        public string BillNo { get; set; }
        public string StateCode { get; set; }
        public string PatientState { get; set; }
        public string DoctorName { get; set; }
        public string Specialization { get; set; }
        public string SubSpecialization { get; set; }
        public string ServiceName { get; set; }
        public decimal TotalAmt { get; set; }
        public decimal DiscountAmt { get; set; }
        public decimal NetBillAmount { get; set; }
        public string BilledBy { get; set; }
    }

    public class DailyOutstandingReport
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNO { get; set; }
        public string Email { get; set; }
        public long ID { get; set; }
        public DateTime Date { get; set; }
        public string PatientName { get; set; }
        public string MRNo { get; set; }
        public DateTime PatientInvoiceDate { get; set; }
        public string PatientInvoiceNO { get; set; }
        public string PatientContactNo { get; set; }
        public decimal NetAmt { get; set; }
        public decimal PaidAmt { get; set; }
        public decimal BalanceAmt { get; set; }
        public string BilledBy { get; set; }
    }

    public class DiscountRegisterReport
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNO { get; set; }
        public string Email { get; set; }
        public long ID { get; set; }
        public DateTime Date { get; set; }
        public string PatientName { get; set; }
        public string MRNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string InvoiceNO { get; set; }
        public string ServiceName { get; set; }
        public decimal ServiceCost { get; set; }
        public decimal NetAmount { get; set; }
        public decimal Concession { get; set; }
        public string DoctorName { get; set; }
        public string BilledBy { get; set; }
    }

    public class DailyCollectionReport
    {

        public decimal MTD { get; set; }
        public decimal YTD { get; set; }
        public decimal MTDRefund { get; set; }
        public decimal YTDRefund { get; set; }
    }

    public class DailyRevenueReport
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNO { get; set; }
        public string Email { get; set; }
        public long ID { get; set; }
        public int Age { get; set; }
        public DateTime Date { get; set; }
        public string PatientName { get; set; }
        public string MRNo { get; set; }
        public DateTime PatientInvoiceDate { get; set; }
        public string PatientInvoiceNO { get; set; }
        public string PatientContactNo { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal Discount { get; set; }
        public decimal NetBillAmount { get; set; }
        public string BilledBy { get; set; }
    }

    public class RefundReportReciept
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNO { get; set; }
        public string Email { get; set; }
        //   public string MobileNo { get; set; } 
        public string RefundReceiptNo { get; set; }
        public DateTime RefundDate { get; set; }
        public string PatientName { get; set; }
        //   public string Doctor { get; set; } 
        public decimal Amount { get; set; }
        public string Remarks { get; set; }
        public string ModeOfPaymentDetails { get; set; }
        public string RefundBy { get; set; }
    }

    public class PatientVisitSummaryModel
    {
        public string RegistrationClinic { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string TodaysReasonForVisit { get; set; }
        public int TotalVisits { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal TotalPaidAmount { get; set; }
        public decimal BalanceAmount { get; set; }
        public DateTime? VisitDate { get; set; }

    }

    public class MaleHistoryModel
    {
        public string SexualDysfunction { get; set; }
        public string EjaculationErection { get; set; }
        public string SexualHistoryRemark { get; set; }
        public string SurgicalHistoryRemark { get; set; }
        public string PTHistoryRemark { get; set; }
        public string AllergiesDrugDescription { get; set; }
        public string Food { get; set; }
        public string Other { get; set; }
        public string CapturedBy { get; set; }
        public string DoctorSign { get; set; }
        public string RegNo { get; set; }
        public string BloodGroup { get; set; }
        public string MarriedLife { get; set; }
        public string SPWP { get; set; }
        public int? PWCPMonthsID { get; set; }
        public int? PWCPYearsID { get; set; }
        public string SPWPPRemark { get; set; }
        public int? ConsanguinityID { get; set; }
        public string DoctorName { get; set; }
        public string DoctorRegNo { get; set; }
    }

    public class FemaleHistoryModel
    {
        public string Consanguinity { get; set; }
        public int? AgeOfMenarchID { get; set; }
        public DateTime? LMPDate { get; set; }
        public string Ammenorhea { get; set; }
        public string AmenorrheaType { get; set; }
        public string MedicationUsedToBringPeriod { get; set; }
        public string Medication { get; set; }
        public int? CycleDuration { get; set; }
        public int? MenstrualDays { get; set; }
        public string MenstrualRegularity { get; set; }
        public string MenstrualFlow { get; set; }
        public string MenstrualFlowRemark { get; set; }
        public string Dysmennorhea { get; set; }
        public string IntermenstrualBleeding { get; set; }
        public string IntermenstrualBleedingRemark { get; set; }
        public string MenstrualRemarks { get; set; }
        public int? InRelationSinceYearsID { get; set; }
        public int? InRelationSinceMonthsID { get; set; }
        public int? TryingToConceiveYearsID { get; set; }
        public int? TryingToConceiveMonthsID { get; set; }
        public string BloodGroup { get; set; }
        public string MarriedLife { get; set; }
        public string Contraception { get; set; }
        public string MethodOfContraception { get; set; }
        public int? DurationYearsID { get; set; }
        public int? DurationMonthsID { get; set; }
        public string InfertilityType { get; set; }
        public string FemaleInfertility { get; set; }
        public string MaleInfertility { get; set; }
        public string FrequencyOfIntercourse { get; set; }
        public string SexualDysfunction { get; set; }
        public string SexualDysfunctionRemark { get; set; }
        public string Dyspareunia { get; set; }
        public string DyspareuniaRemark { get; set; }
        public string LubricationUsed { get; set; }
        public string LubricationUsedRemark { get; set; }
        public string SexualHistoryRemark { get; set; }
        public string STD { get; set; }
        public string DoctorName { get; set; }
        public string DoctorRegNo { get; set; }
    }

    public class FemaleComplaintsModel
    {
        public string CaseSummary { get; set; }
    }

    public class InvestigationModel
    {
        public string Investigations { get; set; }
    }

    public class PatientPrescriptionModel
    {
        public string ItemName { get; set; }
        public decimal Quantity { get; set; }
    }

    public class PatientSummary
    {
        public PatientVisitSummaryModel PatientBill { get; set; }
        public FemaleComplaintsModel CaseSummary { get; set; }
        public InvestigationModel Investigation { get; set; }
        public PatientPrescriptionModel Prescription { get; set; }
        public MaleHistoryModel MaleModel { get; set; }
        public FemaleHistoryModel FemaleModel { get; set; }


    }
    public class HistoryModelSummary
    {
        public string SexualDysfunction { get; set; }
        public string EjaculationErection { get; set; }
        public string SexualHistoryRemark { get; set; }
        public string SurgicalHistoryRemark { get; set; }
        public string PTHistoryRemark { get; set; }
        public string AllergiesDrugDescription { get; set; }
        public string Food { get; set; }
        public string Other { get; set; }
        public string CapturedBy { get; set; }
        public string DoctorSign { get; set; }
        public string RegNo { get; set; }
        public string BloodGroup { get; set; }
        public string MarriedLife { get; set; }
        public string SPWP { get; set; }
        public int? PWCPMonthsID { get; set; }
        public int? PWCPYearsID { get; set; }
        public string SPWPPRemark { get; set; }
        public int? ConsanguinityID { get; set; }
        public string DoctorName { get; set; }
        public string DoctorRegNo { get; set; }
        public string Consanguinity { get; set; }
        public int? AgeOfMenarchID { get; set; }
        public DateTime? LMPDate { get; set; }
        public string Ammenorhea { get; set; }
        public string AmenorrheaType { get; set; }
        public string MedicationUsedToBringPeriod { get; set; }
        public string Medication { get; set; }
        public string CycleDuration { get; set; }
        public string MenstrualDays { get; set; }
        public string MenstrualRegularity { get; set; }
        public string MenstrualFlow { get; set; }
        public string MenstrualFlowRemark { get; set; }
        public string Dysmennorhea { get; set; }
        public string IntermenstrualBleeding { get; set; }
        public string IntermenstrualBleedingRemark { get; set; }
        public string MenstrualRemarks { get; set; }
        public int? InRelationSinceYearsID { get; set; }
        public int? InRelationSinceMonthsID { get; set; }
        public int? TryingToConceiveYearsID { get; set; }
        public int? TryingToConceiveMonthsID { get; set; }

        public string Contraception { get; set; }
        public string MethodOfContraception { get; set; }
        public int? DurationYearsID { get; set; }
        public int? DurationMonthsID { get; set; }
        public string InfertilityType { get; set; }
        public string FemaleInfertility { get; set; }
        public string MaleInfertility { get; set; }
        public string FrequencyOfIntercourse { get; set; }

        public string SexualDysfunctionRemark { get; set; }
        public string Dyspareunia { get; set; }
        public string DyspareuniaRemark { get; set; }
        public string LubricationUsed { get; set; }
        public string LubricationUsedRemark { get; set; }

        public string STD { get; set; }

    }
    public class UnitDetailsModel
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public byte[] Logo { get; set; }
        public string Website { get; set; }
    }
    public class AdvanceReceipts
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string PatientName { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public string PatientContactNo { get; set; }
        public string MRNo { get; set; }
        public string Remarks { get; set; }
        public DateTime? AdvanceDate { get; set; }
        public string AdvanceReceiptNo { get; set; }
        public decimal? PaidAmount { get; set; }
        public string PaymentMode { get; set; }
        public string IssuedBy { get; set; }
        public byte[] Logo { get; set; }
        public string WebSite { get; set; }
        public bool IsUnitWithPrint { get; set; }
    }

    public class RefundReceipts
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string PatientName { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public string PatientContactNo { get; set; }
        public string MRNo { get; set; }
        public DateTime? RefundDate { get; set; }
        public string RefundReceiptNo { get; set; }
        public decimal? PaidAmount { get; set; }
        public string PaymentMode { get; set; }
        public string IssuedBy { get; set; }
        public byte[] Logo { get; set; }
        public string WebSite { get; set; }
        public bool IsUnitWithPrint { get; set; }
    }

    public class ServiceCancellationReceipts
    {
        public string UnitName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string PatientName { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public string PatientContactNo { get; set; }
        public string MRNo { get; set; }
        public DateTime? CancellationDate { get; set; }
        public string CancellationNo { get; set; }
        public string PatientAddress { get; set; }
        public string ServiceDescription { get; set; }
        public string SACCode { get; set; }
        public int? Quantity { get; set; }
        public string InvoiceNo { get; set; }
        public decimal? UnitRate { get; set; }
        public decimal? DiscAmt { get; set; }
        public decimal? NetAmount { get; set; }
        public decimal? RefundAmount { get; set; }
        public string IssuedBy { get; set; }
        public byte[] Logo { get; set; }
        public string WebSite { get; set; }
        public decimal? PaidAmount { get; set; }
        public string PaymentMode { get; set; }
        public string DoctorName { get; set; }
        public bool IsUnitWithPrint { get; set; }
    }

    public class UnitOfMeasure
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
    }
    public class ItemMasterModel
    {
        public int ID { get; set; }
        public string ItemCode { get; set; }
        public string BrandName { get; set; }
        public string ItemName { get; set; }

    }
    public class ItemBatchDetails
    {
        public long BatchID { get; set; }
        public long ItemID { get; set; }
        public string BatchCode { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int AvailableQuantity { get; set; }
        public decimal PurchaseRate { get; set; }
        public decimal MRP { get; set; }
        public string UOM { get; set; }
        public long UOMID { get; set; }
        public float SGSTPercentage { get; set; }
        public decimal SGSTAmount { get; set; }
        public float CGSTPercentage { get; set; }
        public decimal CGSTAmount { get; set; }
        public string Manufacture { get; set; }
    }
    public class PrescribedItemList
    {
        public string ItemName { get; set; }
        public long ID { get; set; }
        public int Quantity { get; set; }
    }
    public class BilledPatientForPharmacy
    {
        public long PatientID { get; set; }
        public DateTime Date { get; set; }
        public long BillID { get; set; }
        public string PatientName { get; set; }
        public int GenderID { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string MRNo { get; set; }
        public string BillNo { get; set; }
        public decimal TotalAmt { get; set; }
        public decimal ConcessionAmt { get; set; }
        public decimal NetAmt { get; set; }
        public decimal PaidAmt { get; set; }
        public decimal BalanceAmt { get; set; }
    }

    public class BilledPatientItemListForPharmacy
    {
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string BatchCode { get; set; }
        public decimal NetAmount { get; set; }
        public decimal Quantity { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal ConcessionPercentage { get; set; }
        public decimal ConcessionAmount { get; set; }
        public decimal CGSTPercentage { get; set; }
        public decimal CGSTAmount { get; set; }
        public decimal SGSTPercentage { get; set; }
        public decimal SGSTAmount { get; set; }
    }
    public class ConcessionReasonForPharmacy
    {
        public int ID { get; set; }
        public string ConcessionCode { get; set; }
        public string ConcessionReason { get; set; }
        public bool Status { get; set; }

    }

    public class RegistraionForPharmacy
    {
        public long PatientID { get; set; }
        public long? UnitID { get; set; }
        public string MRNo { get; set; } = null;
        public string FirstName { get; set; } = null;
        public string LastName { get; set; } = null;
        public int? Age { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ContactNo1 { get; set; } = null;
        public long? GenderID { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public bool? Synchronized { get; set; }
        public long? RegType { get; set; }
        public List<VisitForPharmacy> VisitModelForPharmacy { get; set; }
        public List<ItemSale> ItemSaleModelForPharmacy { get; set; }
        public List<ItemSaleDetails> ItemSaleDetailsModelForPharmacy { get; set; }
        public List<ItemStockForPharmacy> ItemStockModelForPharmacy { get; set; }
        public List<BillVO> BillModelForPharmacy { get; set; }

        public List<PaymentVO> Payment { get; set; }
        public List<PaymentDetailsVO> OtherSrvPaymentModeList { get; set; }
        public object VisitID { get; set; }
        public object PatientUnitID { get; set; }
    }

    public class VisitForPharmacy
    {
        public long VisitID { get; set; }
        public long? UnitID { get; set; }
        public DateTime? Date { get; set; }
        public long? SpouseID { get; set; }
        public long? PatientID { get; set; }
        public long? PatientUnitID { get; set; }
        public string OPDNO { get; set; } = null;
        public long? VisitTypeID { get; set; }
        public long? DoctorID { get; set; }
        public bool? Status { get; set; }
        public long? CreatedUnitID { get; set; }
        public long? AddedBy { get; set; }
        public string AddedOn { get; set; } = null;
        public DateTime? AddedDateTime { get; set; }
        public bool? Synchronized { get; set; }
    }

    public class ItemSale
    {
        public long ItemSaleID { get; set; }
        //   public long? UnitID { get; set; }
        public DateTimeOffset? Date { get; set; }
        public DateTimeOffset? Time { get; set; }

        public long? PatientID { get; set; }
        public long? PatientUnitID { get; set; }
        public long? VisitID { get; set; }
        //public string ItemSaleNo { get; set; } = null;

        //public string Remarks { get; set; } = null;
        public float? ConcessionPercentage { get; set; }
        public float? ConcessionAmount { get; set; }


        public float? TotalAmount { get; set; }
        public float? NetAmount { get; set; }
        // public bool? Status { get; set; }

        public long? CreatedUnitID { get; set; }
        public long? AddedBy { get; set; }
        // public string AddedOn { get; set; } 
        // public DateTimeOffset? AddedDateTime { get; set; }

        //  public string AddedWindowsLoginName { get; set; } 
        public long? StoreID { get; set; }
        // public long? BillID { get; set; }
        public decimal? SGSTAmount { get; set; }

        public decimal? CGSTAmount { get; set; }
        public decimal? IGSTAmount { get; set; }
        // public bool? IsBilled { get; set; }
        // public bool? Synchronized { get; set; }

        //public bool? IsPrescribedDrug { get; set; }
        //  public string ReasonForVariance { get; set; } 
        //  public long? ReferenceDoctorID { get; set; }
        // public string ReferenceDoctor { get; set; } 

    }

    public class ItemSaleDetails
    {
        public long? ID { get; set; }
        public long UnitID { get; set; }
        public long ItemSaleId { get; set; }
        public long ItemId { get; set; }

        public long BatchId { get; set; }
        public double? Quantity { get; set; }
        public double? PendingQuantity { get; set; }
        public double? MRP { get; set; }

        public double? ConcessionPercentage { get; set; }
        public double? ConcessionAmount { get; set; }

        public double? TotalAmount { get; set; }
        public double? NetAmount { get; set; }
        public bool? Status { get; set; }
        public long CreatedUnitID { get; set; }

        public long AddedBy { get; set; }
        public string AddedOn { get; set; } = null;
        public DateTime? AddedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; } = null;

        public bool? Synchronized { get; set; }
        public long? PrescriptionDetailsID { get; set; }
        public long? PrescriptionDetailsUnitID { get; set; }

        public double? BaseQuantity { get; set; }
        public double? BaseCF { get; set; }
        public long? TransactionUOMID { get; set; }
        public long? BaseUMID { get; set; }

        public long? StockUOMID { get; set; }
        public double? StockCF { get; set; }
        public double? StockingQuantity { get; set; }
        public double? ActualNetAmt { get; set; }

        public double? NetAmtCalculation { get; set; }
        public bool? IsItemConsumption { get; set; }
        public bool? ISForMaterialConsumption { get; set; }
        public long? MaterialCStoreID { get; set; }

        public double? SGSTPercentage { get; set; }
        public double? SGSTAmount { get; set; }
        public double? CGSTPercentage { get; set; }
        public double? CGSTAmount { get; set; }

        public double? IGSTPercentage { get; set; }
        public double? IGSTAmount { get; set; }
        public long? ConcessionReasonID { get; set; }
    }

    public class ItemStockForPharmacy
    {
        public long? ItemStockID { get; set; }
        public long? UnitID { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? Time { get; set; }
        public long? StoreID { get; set; }
        public long? DepartmentID { get; set; }
        public long? ItemID { get; set; }
        public long? BatchID { get; set; }
        public short? TransactionTypeID { get; set; }
        public long? TransactionID { get; set; }
        public float? PreviousBalance { get; set; }
        public short? OperationType { get; set; }
        public float? TransactionQuantity { get; set; }
        public float? StockInHand { get; set; }
        public float? BlockedStock { get; set; }
        public float? AvailableStock { get; set; }
        public float? StockingQuantity { get; set; }
        public long? BaseUOMID { get; set; }
        public float? BaseCF { get; set; }
        public long? StockUOMID { get; set; }
        public float? StockCF { get; set; }
        public long? TransactionUOMID { get; set; }
        public float? InputTransactionQuantity { get; set; }
        public string Remarks { get; set; } = null;
        public long? CreatedUnitID { get; set; }
        public long? AddedBy { get; set; }
        public string AddedOn { get; set; } = null;
        public DateTime? AddedDateTime { get; set; }
        public bool? Synchronized { get; set; }
        public bool? IsFree { get; set; }
    }

    public class DailyCollectionRpt
    {
        public string PatientName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string PatientContactNo { get; set; }
        public string MRNo { get; set; }
        public DateTime Date { get; set; }
        public string ReceiptNo { get; set; }
        public string InvoiceOrAdvanceNo { get; set; }
        public DateTime InvoiceOrAdvanceDate { get; set; }
        public string ReceiptCategory { get; set; }
        public decimal? InvoiceAmt { get; set; }
        public int AdvanceID { get; set; }

        // Payment Modes
        public decimal CashAmount { get; set; }
        public decimal ChequeAmount { get; set; }
        public string ChequeNumber { get; set; }
        public decimal CardAmount { get; set; }
        public string CardNumber { get; set; }
        public decimal OnlineAmount { get; set; }
        public string TransactionNumber { get; set; }
        public decimal UPI { get; set; }
        public string UPITransactionNumber { get; set; }

        public decimal AdvanceSettlement { get; set; }
        public string IssuedBy { get; set; }

        // Total Amount Calculation
        public decimal TotalAmount => CashAmount + ChequeAmount + CardAmount + OnlineAmount + UPI;
    }

    public class UnitListByUserID
    {
        public long UnitID { get; set; }
        public string UnitName { get; set; }

    }
    public class InvestigationServiceDetail
    {
        public string ServiceCode { get; set; }
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public decimal BaseServiceRate { get; set; }
        public bool RateEditable { get; set; }
        public decimal MinRate { get; set; }
        public decimal MaxRate { get; set; }
    }
}

