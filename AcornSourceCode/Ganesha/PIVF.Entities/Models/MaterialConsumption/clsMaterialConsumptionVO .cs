using PIVF.Entities.Models.Inventory;
using PIVF.Entities.Models.Master.Inventory;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.MaterialConsumption
{
    public class clsMaterialConsumptionVO
    {
        public long MaterialConsumptionID { get; set; }
        public long MaterialConsumptionUnitID { get; set; }
        public long StoreID { get; set; }
        public string ConsumptionNo { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public bool IsAgainstPatient { get; set; }
        public DateTime ConsumptionDate { get; set; }
        public DateTime Time { get; set; }
        public string MRNo { get; set; }
        public float TotalAmount { get; set; }
        public string Remark { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public float TotalItems { get; set; }
        public long BillID { get; set; }
        public bool IsEmailSend { get; set; }
        public long PackageID { get; set; }
        public long Opd_Ipd_External_Id { get; set; }

        public long Opd_Ipd_External_UnitId { get; set; }

        public long Opd_Ipd_External { get; set; }

        public float TotalMRPAmount { get; set; }

        public bool IsAgainstPatientIndent { get; set; }
        public bool IsPackageConsumable { get; set; }
        public bool LinkPatientID { get; set; }
        public bool LinkPatientUnitID { get; set; }
        public List<clsMaterialConsumptionItemDetailsVO> ConsumptionItemDetailsList { get; set; }

        public string PatientName { get; set; }
        public string StoreName { get; set; }
        public long TotalCount { get; set; }
    }
    public class clsMaterialConsumptionItemDetailsVO
    {
        public ItemStockVO StockDetails { get; set; }
        
        public long MaterialConsumptionDetailsID { get; set; }
        public long MaterialConsumptionDetailsUnitID { get; set; }
        public long MaterialConsumptionID { get; set; }
        public long MaterialConsumptionUnitID { get; set; }
        public long ItemId { get; set; }
        public long BatchID { get; set; }
        public float UsedQty { get; set; }
        public float Rate { get; set; }
        public float Amount { get; set; }
        public string Remark { get; set; }
        public bool Synchronized { get; set; }
        public string BatchCode { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string ItemName { get; set; }
        public float StockingOty { get; set; }
        public long BaseUOMID { get; set; }
        public float BaseCF { get; set; }
        public string StockUOM { get; set; }
        public long StockUOMID { get; set; }
        public float StockCF { get; set; }
        public long TransactionUOMID { get; set; }
        public float MRP { get; set; }
        public long PackageBillID { get; set; }
        public long PackageBillUnitID { get; set; }
        public float TotalPatientIndentReceiveQty { get; set; }
        public float UsedPatientIndentReceiveQty { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
        public string Description { get; set; }

        // #region  FOR CONVERSION FACTOR

        public List<CommanEntity> UOMList { get; set; }
        public List<clsConversionsVO> UOMConversionList { get; set; }
        public long SUOMID { get; set; }
        public float MainRate { get; set; }
        public float StockToBase { get; set; }
        public float MainMRP { get; set; }
        public float BaseMRP { get; set; }

        public float BaseQuantity { get; set; }
        public float BaseRate { get; set; }
        public float PurchaseRate { get; set; }
        public bool IsAgainstPatientIndent { get; set; }
        // public clsMaterialConsumptionVO objItemSalesVO { get; set; }
        public long SelectedUOMID { get; set; }
        public float ConversionFactor { get; set; }
        public float BaseConversionFactor { get; set; }

    }

    public class UOMConversionVO
    {
        public long ID { get; set; }
        public long ItemId { get; set; }
        public long FromUOMID { get; set; }
        public long ToUOMID { get; set; }
        public float ConversionFactor { get; set; }
        public float CostPrice { get; set; }
        public float MRP { get; set; }
    }

}
