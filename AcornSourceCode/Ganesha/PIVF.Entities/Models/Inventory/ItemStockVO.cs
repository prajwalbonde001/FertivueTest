using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Inventory
{
    public class ItemStockVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public long StoreID { get; set; }
        public int DepartmentID { get; set; }
        public long ItemID { get; set; }
        public string ItemName { get; set; }
        public string BatchCode { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public decimal MRP { get; set; }
        public decimal PurchaseRate { get; set; }
        public int TransactionTypeID { get; set; } //Smallint
        public long BatchID { get; set; }
        public long TransactionID { get; set; }
        public string TransactionType { get; set; }
        public float PreviousBalance { get; set; }
        public int OperationType { get; set; }//Smallint
        public float TransactionQuantity { get; set; }
        public float StockInHand { get; set; }
        public float BlockedStock { get; set; }
        public float AvailableStock { get; set; }
        public float StockingQuantity { get; set; }
        public float BaseCF { get; set; }
        public long BaseUOMID { get; set; }
        public long StockUOMID { get; set; }
        public float StockCF { get; set; }
        public long TransactionUOMID { get; set; }
        public float InputTransactionQuantity { get; set; }
        public string Remarks { get; set; }
        public bool Status { get; set; }
        public int CreatedUnitID { get; set; }
        public int UpdatedUnitID { get; set; }
        public int AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public DateTime AddedUTCDateTime { get; set; }
        public int UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public DateTime UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public bool IsFree { get; set; }
        public float Re_Order { get; set; }
        public float AvailableStockInBase { get; set; }
        public string StockUOM { get; set; }
        public float Tax1Percentage { get; set; }
        public decimal Tax1Amount { get; set; }
        public float Tax2Percentage { get; set; }
        public decimal Tax2Amount { get; set; }
        public float Tax3Percentage { get; set; }
        public decimal Tax3Amount { get; set; }
        public float StaffDiscount { get; set; }
        public float WalkinDiscount { get; set; }
        public float RegisteredPatientsDiscount { get; set; }
        public string Rack { get; set; }
        public string Shelf { get; set; }
        public string Container { get; set; }
        public long BatchUnitID { get; set; }
        public List<ItemStockVO> ItemStockVOList { get; set; }
    }
}
