using PIVF.Entities.Models.Billing;
using PIVF.Entities.Models.CounterSale;
using PIVF.Entities.Models.Inventory;
using PIVF.Entities.Models.Master.Inventory;
using PIVF.Entities.Models.NewRegistration;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.CounterSale
{
    public interface CounterSaleBAL

    {
        List<ItemMasterVO> GetItemListofStore(long StoreID);
        List<ItemStockVO> GetItemBatchwiseStock(long ItemID, long UnitID, long StoreID);
        //List<ItemMasterVO> GetItemDetailsByID(long ItemID, long StoreID);
        clsConversionsVO GetItemUOMConversionsByID(long ItemId);
        BillVO SaveCounterSaleBill(BillVO objBill);
        ItemMasterVO GetItemDetailsByID(long ItemID, long StoreID);
        PatientVisit GetPatientDetails(string Criteria, bool IsAppSearch, int RegUnitID);
    }
}
