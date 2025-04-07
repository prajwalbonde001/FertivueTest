using PIVF.Entities.Models.Master.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.CounterSale
{
    public class CounterSaleVO
    {
        public long UnitID { get; set; }
        public long StoreID { get; set; }
        public long ID { get; set; }
        public long ItemID { get; set; }
        public string ItemName { get; set; }
        public string BatchCode { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int MRP { get; set; }
        public int PurchaseRate { get; set; }
        public int AvailableStock { get; set; }
        public long BatchID { get; set; }
        public bool ShowExpiredBatches { get; set; }
        public bool ShowZeroStockBatches { get; set; }
        public bool IsFree { get; set; }
        public DateTime? PlusThreeMonthExpDate { get; set; }
        public int TotalRows { get; set; }
        public string IdColumnName { get; set; }
        public int startRowIndex { get; set; }
        public long PagingEnabled { get; set; }
        public long TotalCount { get; set; }
    }
}
