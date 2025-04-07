using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.CounterSale;
using PIVF.Entities.Models.CounterSale;
using PIVF.Entities.Models.Inventory;
using PIVF.Entities.Models.Master.Inventory;
using PIVF.Entities.Models.Master.IVF;
using System.Transactions;
using PIVF.BusinessLayer.ItemStock;
using System.Data;

namespace PIVF.DataAccessLayer.ItemStock
{
    public class ItemStockDAL : ItemStockBAL
    {
        private Database dbServer = null;
        IDbConnection con;

        public ItemStockDAL()

        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }





        public int SaveItemStockVO(ItemStockVO obj)

        {

            try
            {
                // using (var transactionScope = new TransactionScope())
                // {
                // for (int Index = 0; Index < obj.ItemStockVOList.Count; Index++)
                // {
                var Param = new DynamicParameters();
                // Param.Add("@Id", obj.ID);
                Param.Add("@UnitId", GenericSP.CurrentUser.UnitID);
                Param.Add("@Date", DateTime.UtcNow);
                Param.Add("@Time", DateTime.UtcNow);
                Param.Add("@StoreID", obj.StoreID);
                Param.Add("@DepartmentID", obj.DepartmentID);
                Param.Add("@ItemID", obj.ItemID);
                Param.Add("@BatchID", obj.BatchID);
                Param.Add("@BatchUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@TransactionTypeID", obj.TransactionTypeID);
                Param.Add("@TransactionID", obj.TransactionID);
                //Param.Add("@PreviousBalance", obj.PreviousBalance);
                Param.Add("@OperationType", obj.OperationType);
                Param.Add("@TransactionQuantity", obj.TransactionQuantity);
                // Param.Add("@AvailableStock", obj.AvailableStock);   
                Param.Add("@InputTransactionQuantity", obj.InputTransactionQuantity);
                Param.Add("@Remarks", obj.Remarks);
                Param.Add("@Status", 1);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                // Param.Add("@ServerDateTime", DateTime.UtcNow);
                Param.Add("@AddedWindowsLoginName", Environment.UserName);
                Param.Add("@StockingQuantity", Convert.ToDecimal(obj.StockingQuantity));
                Param.Add("@BaseUOMID", obj.BaseUOMID);
                Param.Add("@BaseCF", obj.BaseCF);
                Param.Add("@StockUOMID", obj.StockUOMID);
                Param.Add("@StockCF", Convert.ToDecimal(obj.StockCF));  //StockCF
                Param.Add("@TransactionUOMID", obj.TransactionUOMID);
                Param.Add("@PurchaseRate1", obj.PurchaseRate);
                Param.Add("@MRP1", obj.MRP);
                Param.Add("@ResultStatus", dbType: DbType.Int64, direction: ParameterDirection.Output);
                Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                this.con.Execute(GenericSP.AddItemStock, Param, commandType: CommandType.StoredProcedure);
                long ID1 = Param.Get<Int64>("@ID");
                obj.ID = ID1;
                // }
                //transactionScope.Complete();


                // }
                return 1;


            }
            catch (Exception ex)
            {
                return 0;
            }
        }


    }
}
