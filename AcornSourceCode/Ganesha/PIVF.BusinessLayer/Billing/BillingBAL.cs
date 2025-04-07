using PIVF.Entities.Models.Billing;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Billing
{
    public interface BillingBAL
    {
        List<PIVF.Entities.Models.Master.IVF.ServiceMasterVO> GetServiceList();
        int SaveBill(BillVO obj);
        //long SaveBill(List<BillVO> obj);   
        int UpdateBill(BillVO obj);
        // List<BillVO> GetBillList(int PatID, int PatUnitID, int VisitID, int VisitUnitID);
        List<BillVO> GetBillList(string[] BillingList, int index, bool PgEn);
        List<BillVO> GetSavedBillList(int BillID, int BillUnitID, int VisitID, int VisitUnitID);
        int DeleteService(int BillID, int BillUnitID, int ServiceCode);
        BillVO GetPatientDetails(int PatID, int PatUnitID);
        //List<BillVO> GetPaymentDetailsForSettleBill(int BillID, int BillUnitID);
        BillVO GetPaymentDetailsForSettleBill(int BillID, int BillUnitID);
        int SaveUpdatePayment(BillVO obj);
        int AddUpdateChargeAndDetailsWhileSettle(BillVO obj, int i);     // UpdateChargeWhileSettle
        int UpdateChargeAndDetailsWhileSettle(BillVO obj, int i);
        List<ChargeVO> GetChargeList(int BillID, int BillUnitID, int VisitID, int VisitUnitID);
        int UpdateBillPaymentDetails(BillVO obj);
        List<BillVO> GetReceiptList(int BillID, int UnitID);
        List<CheckedInPatients> GetCheckedInPatientsList(string Search);
        int UpdateBillCancellationDetails(BillCancellationDetails obj);
        List<PatientAdvanceReport> GetPatientAdvanceReport(int? UnitID, DateTime? FromDate, DateTime? ToDate);
        List<ServiceWiseBillingReport> GetServiceWiseBillingReport(int? UnitID, DateTime? FromDate, DateTime? ToDate);
        List<DailyOutstandingReport> GetDailyOutstandingReport(int? UnitID, DateTime? FromDate, DateTime? ToDate);
        List<DiscountRegisterReport> GetDiscountRegisterReport(int? UnitID, DateTime? FromDate, DateTime? ToDate);
        List<DailyCollectionReport> GetDailyCollectionReport(int? UnitID);
        List<DailyRevenueReport> GetDailyRevenueReport(int? UnitID, DateTime? FromDate, DateTime? ToDate);
        List<RefundReportReciept> GetRefundReportReciept(int? UnitID, DateTime? FromDate, DateTime? ToDate);
        List<PatientVisitSummaryModel> GetPatientVisitSummaryModel(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID);
        List<FemaleComplaintsModel> GetCaseSummaryHistory(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID);
        List<InvestigationModel> GetInvestigationHistory(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID);
        List<PatientPrescriptionModel> GetPatientPrescriptionHistory(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID);
        List<Dictionary<string, string>> GetHistorySummary(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID);
        UnitDetailsModel GetUnitDetails();
        List<AdvanceReceipts> GetAdvanceReciept(long? PatientID, long? PatientUnitID, long? AdvanceID);
        List<RefundReceipts> GetAdvanceRefundReciept(long? PatientID, long? PatientUnitID, long? RefundID);
        List<ServiceCancellationReceipts> GetServiceCencellationReciept(long? PatientID, long? PatientUnitID, long? RefundID);
        List<UnitOfMeasure> GetUnitOfMeasure(long? ItemID);
        List<ItemMasterModel> GetItemListForPharmacy(long? StoreID, string Search = null);
        List<ItemBatchDetails> GetBatchCodeForPharmacy(long ItemID);
        List<StoreMaster> GetStoreMasterList();

        List<PrescribedItemList> GetPrescribedItemListForPharmacy(long PatientID);
        List<BilledPatientForPharmacy> GetBilledPatientListForPharmacy(DateTime? FromDate, DateTime? ToDate, string FirstName = null, string LastName = null, string MRNo = null, string BillNo = null);
        List<BilledPatientItemListForPharmacy> GetBilledPatientItemListForPharmacy(long BillID);
        List<ConcessionReasonForPharmacy> GetConcessionReason();

        int AddOrUpdateNewPatientForPharmacy(RegistraionForPharmacy obj);
        List<DailyCollectionRpt> GetDailyCollectionRpt(long UnitID, DateTime? FromDate, DateTime? ToDate);
        UnitDetailsModel GetUnitDetailsByUnitID(long UnitID);
        List<UnitListByUserID> GetUnitListByUserID(long UserID);
        List<InvestigationServiceDetail> GetServiceDetailForBill(long PatientID, long PatientUnitID);
    }
}
