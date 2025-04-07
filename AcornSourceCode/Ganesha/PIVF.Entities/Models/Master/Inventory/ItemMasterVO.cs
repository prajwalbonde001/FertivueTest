using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Inventory
{
    public class ItemMasterVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public string ItemCode { get; set; }
        public string BrandName { get; set; }
        public string Strength { get; set; }
        public string ItemName { get; set; }
        public long MoleculeName { get; set; }
        public int ItemGroupID { get; set; }
        public int ItemCategoryID { get; set; }
        public int DispencingTypeID { get; set; }
        public int StoreageTypeID { get; set; }
        public int PregnancyClassID { get; set; }
        public int TherapeuticClassID { get; set; }
        public int MfgByID { get; set; }
        public int MrkByID { get; set; }
        public string PUM { get; set; }//long
        public string SUM { get; set; }//long
        public double RegisteredPatientsDiscount { get; set; }
        public long Route { get; set; }
        public decimal PurchaseRate { get; set; }
        public decimal MRP { get; set; }
        public int ReorderQnt { get; set; }
        public bool BatchesRequired { get; set; }
        public bool InclusiveOfTax { get; set; }
        public bool ItemMarginID { get; set; }
        public bool ItemMovementID { get; set; }
        public decimal Margin { get; set; }
        public decimal HighestRetailPrice { get; set; }
        public decimal MinStock { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public float StorageDegree { get; set; }
        public float ConversionFactor { get; set; }
        public float DiscountOnSale { get; set; }
        public decimal SVatPer { get; set; }
        public int SItemVatType { get; set; }
        public string SUOM { get; set; }
        public string PUOM { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public string UpdatedOn { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public string BarCode { get; set; }
        public bool IsABC { get; set; }
        public bool IsFNS { get; set; }
        public bool IsVED { get; set; }
        public long StrengthUnitTypeID { get; set; }
        //public long BaseUM { get; set; }
        public string BaseUM { get; set; }
        //public long SellingUM { get; set; }
        public string SellingUM { get; set; }
        public string ConvFactStockBase { get; set; }
        public string ConvFactBaseSale { get; set; }
        public long ItemExpiredInDays { get; set; }
        public long HSNCodesID { get; set; }
        public long SUMID { get; set; }
        public long PUMID { get; set; }
        public string Manufacture { get; set; }
        public string PreganancyClass { get; set; }
        public int PurchaseTax { get; set; }//
        public int SalesTax { get; set; }//
        public decimal AbatedMRP { get; set; }
        public string ItemCategoryName { get; set; }
        public string ItemGroupName { get; set; }
        public long BaseUMID { get; set; }
        public long SellingUMID { get; set; }
        public float StockingCF { get; set; }
        public float SellingCF { get; set; }
        public float PTBCF { get; set; }
        public float STBCF { get; set; }
        public string Rack { get; set; }
        public string OriginalMRP { get; set; }
        public float PurTax1Percent { get; set; }
        public string PurTax1TaxType { get; set; }
        public string PurTax1ApplicableOn { get; set;}
        public float PurTax2Percent { get; set; }
        public string PurTax2TaxType { get; set; }
        public string PurTax2ApplicableOn { get; set; }
        public float PurTax3Percent { get; set; }
        public string PurTax3TaxType { get; set; }
        public string PurTax3ApplicableOn { get; set; }
        public float SaleTax1Percent { get; set; }
        public string SaleTax1TaxType { get; set; }
        public string SaleTax1ApplicableOn { get; set; }
        public float SaleTax2Percent { get; set; }
        public string SaleTax2TaxType { get; set; }
        public string SaleTax2ApplicableOn { get; set; }
        public float SaleTax3Percent { get; set; }
        public string SaleTax3TaxType { get; set; }
        public string SaleTax3ApplicableOn { get; set; }

    }
}
