using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.CounterSale
{
    public class clsItemSalesVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long VisitID { get; set; }
        public string ItemSaleNo { get; set; }
        public string Remarks { get; set; }
        public float ConcessionPercentage { get; set; }
        public float ConcessionAmount { get; set; }
        public float VATPercentage { get; set; }
        public float VATAmount { get; set; }
        public float TotalAmount { get; set; }
        public float NetAmount { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
        public long StoreID { get; set; }
        public long BillID { get; set; }
        public bool IsBilled { get; set; }
        public bool Synchronized { get; set; }
        public int DeliveredBY { get; set; }//tinyint
        public string DeliveryAddress { get; set; }
        public long PurcharseFrequency { get; set; }
        public long PurcharseFrequencyUnit { get; set; }
        public int TokenNo { get; set; }
        public bool IsReady { get; set; }
        public bool IsDelivered { get; set; }//tinyint
        public bool IsPrescribedDrug { get; set; }
        public long CostingDivisionID { get; set; }
        public string ReasonForVariance { get; set; }
        public long ReferenceDoctorID { get; set; }
        public string ReferenceDoctor { get; set; }
        public long AdmissionID { get; set; }
        public long AdmissionUnitID { get; set; }
        public long BillUnitID { get; set; }
        public float TaxAmount { get; set; }
    }

    public class clsItemSalesDetailsVO {
        //public long ID { get; set; }
        public long ItemSaleDetailsID { get; set; }
        public long UnitID { get; set; }
        public long ItemSaleId { get; set; }
        public long ItemId { get; set; }
        public long BatchId { get; set; }
        public float Quantity { get; set; }
        public float PendingQuantity { get; set; }
        public float MRP { get; set; }
        public float ConcessionPercentage { get; set; }
        public float ConcessionAmount { get; set; }
        public float VATPercentage { get; set; }
        public float VATAmount { get; set; }
        public float TotalAmount { get; set; }
        public float NetAmount { get; set; }
        public bool Status { get; set; }
        public float CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public long PrescriptionDetailsID { get; set; }
        public long PrescriptionDetailsUnitID { get; set; }
        public long PackageID { get; set; }
        public float BaseQuantity { get; set; }
        public float BaseCF { get; set; }
        public long TransactionUOMID { get; set; }
        //public long BaseUMID { get; set; }
        public long BaseUOMID { get; set; }
       // public long StockUOMID { get; set; }
        public float StockCF { get; set; }
       // public float StockingQuantity { get; set; }
        public float ActualNetAmt { get; set; }
        public int ItemVatType { get; set; }
        public float NetAmtCalculation { get; set; }
        public bool IsItemConsumption { get; set; }
        public bool ISForMaterialConsumption { get; set; }
        public long MaterialCStoreID { get; set; }
        public long PackageBillID { get; set; }
        public long PackageBillUnitID { get; set; }
        public float Tax1Percentage { get; set; }
        public float Tax1Amount { get; set; }
        public float Tax2Percentage { get; set; }
        public float Tax2Amount { get; set; }
        public float Tax3Percentage { get; set; }
        public float Tax3Amount { get; set; }
        public int Tax1TaxType { get; set; }
        public int Tax1ApplicableOn { get; set; }
        public int Tax2TaxType { get; set; }
        public int Tax2ApplicableOn { get; set; }
        public int Tax3TaxType { get; set; }
        public int Tax3ApplicableOn { get; set; }
        public float PackageConcessionPercentage { get; set; }
        public float PackageConcessionAmount { get; set; }
        public long ItemSaleUnitID { get; set; }
        public long SUMID { get; set; }
        public long SelectedUOMID { get; set; }
        public float ConversionFactor { get; set; }
        public float BaseConversionFactor { get; set; }
        public float AvailableQuantity { get; set; }
        public long SUOMID { get; set; }

    }
}
