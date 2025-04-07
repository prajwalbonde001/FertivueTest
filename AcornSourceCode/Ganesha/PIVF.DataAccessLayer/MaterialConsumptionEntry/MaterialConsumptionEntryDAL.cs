using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using PIVF.BusinessLayer.MaterialConsumptionEntry;
using PIVF.Entities.Models.MaterialConsumption;

namespace PIVF.DataAccessLayer.MaterialConsumptionEntry
{
    public class MaterialConsumptionEntryDAL : MaterialConsumptionEntryBAL
    {
        private Database dbServer = null;
        IDbConnection con;



        public MaterialConsumptionEntryDAL()

        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public int SaveConsumptionDetails(clsMaterialConsumptionVO objMaterialConsumption)
        {

            try
            {
                using (var transactionScope = new TransactionScope())
                {

                    var Param = new DynamicParameters();
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@StoreID", objMaterialConsumption.StoreID);
                    // Param.Add("@MaterialConsumptionID", objMaterialConsumption.MaterialConsumptionID);
                    Param.Add("@ConsumptionNo", objMaterialConsumption.MaterialConsumptionID);
                    Param.Add("@PatientID", objMaterialConsumption.PatientID);
                    Param.Add("@PatientUnitID", objMaterialConsumption.PatientUnitID);
                    Param.Add("@IsAgainstPatient", objMaterialConsumption.IsAgainstPatient);
                    Param.Add("@Date", DateTime.UtcNow);
                    Param.Add("@Time", DateTime.UtcNow);
                    Param.Add("@TotalAmount", objMaterialConsumption.TotalAmount);
                    Param.Add("@Remark", objMaterialConsumption.Remark);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    Param.Add("@TotalItems", objMaterialConsumption.TotalItems);
                    Param.Add("@Opd_Ipd_External_Id", objMaterialConsumption.Opd_Ipd_External_Id);
                    Param.Add("@Opd_Ipd_External_UnitId", objMaterialConsumption.Opd_Ipd_External_UnitId);
                    Param.Add("@Opd_Ipd_External", objMaterialConsumption.Opd_Ipd_External);
                    Param.Add("@PackageID", objMaterialConsumption.PackageID);
                    Param.Add("@TotalMRPAmount", objMaterialConsumption.TotalMRPAmount);
                    Param.Add("@IsAgainstPatientIndent", objMaterialConsumption.IsAgainstPatientIndent);
                    Param.Add("@IsPackageConsumable", objMaterialConsumption.IsPackageConsumable);
                    Param.Add("@LinkPatientID", objMaterialConsumption.LinkPatientID);
                    Param.Add("@LinkPatientUnitID", objMaterialConsumption.LinkPatientUnitID);
                    Param.Add("@MaterialConsumptionID", 0, DbType.Int64, ParameterDirection.Output);
                    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    this.con.Execute(GenericSP.AddMaterialConsumption, Param, commandType: CommandType.StoredProcedure);
                    long MaterialConsumptionID = Param.Get<Int64>("@MaterialConsumptionID");
                    long Result = Param.Get<Int64>("@ResultStatus");

                    for (int Index = 0; Index < objMaterialConsumption.ConsumptionItemDetailsList.Count; Index++)
                    {
                        var Param1 = new DynamicParameters();

                        Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@MaterialConsumptionID", MaterialConsumptionID);
                        //Param1.Add("@MaterialConsumptionUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@ItemId", objMaterialConsumption.ConsumptionItemDetailsList[Index].ItemId);
                        Param1.Add("@BatchID", objMaterialConsumption.ConsumptionItemDetailsList[Index].BatchID);
                        Param1.Add("@UsedQty", objMaterialConsumption.ConsumptionItemDetailsList[Index].UsedQty);
                        Param1.Add("@Rate", objMaterialConsumption.ConsumptionItemDetailsList[Index].PurchaseRate);
                        Param1.Add("@Amount", objMaterialConsumption.ConsumptionItemDetailsList[Index].Amount);
                        Param1.Add("@Remark", objMaterialConsumption.ConsumptionItemDetailsList[Index].Remark);
                        Param1.Add("@BatchCode", objMaterialConsumption.ConsumptionItemDetailsList[Index].BatchCode);
                        Param1.Add("@ExpiryDate", objMaterialConsumption.ConsumptionItemDetailsList[Index].ExpiryDate);
                        Param1.Add("@ItemName", objMaterialConsumption.ConsumptionItemDetailsList[Index].ItemName);
                        Param1.Add("@StockingOty", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockingOty);
                        Param1.Add("@BaseUOMID", objMaterialConsumption.ConsumptionItemDetailsList[Index].BaseUOMID);
                        //Param1.Add("@BaseCF", objMaterialConsumption.ConsumptionItemDetailsList[Index].BaseConversionFactor);
                        Param1.Add("@StockUOMID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockUOMID);
                        //Param1.Add("@StockCF", objMaterialConsumption.ConsumptionItemDetailsList[Index].ConversionFactor);
                        Param1.Add("@TransactionUOMID", objMaterialConsumption.ConsumptionItemDetailsList[Index].SelectedUOMID);
                        Param1.Add("@MRP", objMaterialConsumption.ConsumptionItemDetailsList[Index].MRP);
                        //Param1.Add("@PackageBillID", objMaterialConsumption.ConsumptionItemDetailsList[Index].PackageBillID);
                        //Param1.Add("@PackageBillUnitID", objMaterialConsumption.ConsumptionItemDetailsList[Index].PackageBillUnitID);
                        //Param1.Add("@TotalPatientIndentReceiveQty", objMaterialConsumption.ConsumptionItemDetailsList[Index].TotalPatientIndentReceiveQty);
                        //Param1.Add("UsedPatientIndentReceiveQty", objMaterialConsumption.ConsumptionItemDetailsList[Index].UsedQty * objMaterialConsumption.ConsumptionItemDetailsList[Index].BaseConversionFactor);
                        //Param.Add("@Date", DateTime.UtcNow);
                        //Param.Add("@Time", DateTime.UtcNow);
                        //Param1.Add("@Opd_Ipd_External_Id", objMaterialConsumption.ConsumptionItemDetailsList[Index].Opd_Ipd_External_Id);
                        //Param1.Add("@BaseCF", objMaterialConsumption.ConsumptionItemDetailsList[Index].BaseConversionFactor);
                        //Param1.Add("@StockUOMID", objMaterialConsumption.ConsumptionItemDetailsList[Index].SUOMID);
                        Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param1.Add("@AddedOn", Environment.MachineName);
                        Param1.Add("@AddedDateTime", DateTime.UtcNow);
                        Param1.Add("@MaterialConsumptionDetailsID", 0, DbType.Int64, ParameterDirection.Output);
                        Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        this.con.Execute(GenericSP.AddMaterialConsumptionItemDetail, Param1, commandType: CommandType.StoredProcedure);
                        long ID = Param1.Get<Int64>("@MaterialConsumptionDetailsID");
                        objMaterialConsumption.ConsumptionItemDetailsList[Index].MaterialConsumptionDetailsID = ID;
                        long ResultStatus = Param1.Get<Int64>("@ResultStatus");
                        if (ResultStatus == 2)
                        {
                            throw new InvalidOperationException($"Unavailable stock for item with ID {objMaterialConsumption.ConsumptionItemDetailsList[Index].ItemId}.");
                        }
                        else if (ResultStatus == 1)
                        {
                            Param1.Add("@UnitID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.UnitID);
                            Param1.Add("@Date", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.Date);
                            Param1.Add("@Time", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.Time);
                            Param1.Add("@StoreID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.StoreID);
                            Param1.Add("@DepartmentID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.DepartmentID);
                            Param1.Add("@ItemID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.ItemID);
                            Param1.Add("@BatchID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.BatchID);
                            Param1.Add("@TransactionType", "MaterialConsumption");
                            Param1.Add("@TransactionID", MaterialConsumptionID);
                            Param1.Add("@PreviousBalance", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.PreviousBalance);
                            //Param1.Add("@OperationType", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.OperationType);
                            Param1.Add("@TransactionQuantity", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.TransactionQuantity);
                            Param1.Add("@StockInHand", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.StockInHand);
                            Param1.Add("@BlockedStock", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.BlockedStock);
                            Param1.Add("@AvailableStock", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.AvailableStock);
                            //Param1.Add("@StockingQuantity", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.StockingQuantity);
                            Param1.Add("@BaseUOMID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.BaseUOMID);
                            //Param1.Add("@BaseCF", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.BaseCF);
                            Param1.Add("@StockUOMID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.StockUOMID);
                            //Param1.Add("@StockCF", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.StockCF);
                            Param1.Add("@TransactionUOMID", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.TransactionUOMID);
                            Param1.Add("@InputTransactionQuantity", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.InputTransactionQuantity);
                            Param1.Add("@Remarks", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.Remarks);
                            Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param1.Add("@AddedOn", Environment.MachineName);
                            Param1.Add("@AddedDateTime", DateTime.UtcNow);
                            Param1.Add("@IsFree", objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.IsFree);
                            this.con.Execute(GenericSP.AddItemStock, Param1, commandType: CommandType.StoredProcedure);
                            long ItemStockID = Param1.Get<Int64>("@ItemStockID");
                            objMaterialConsumption.ConsumptionItemDetailsList[Index].StockDetails.ID = ItemStockID;
                        }

                    }


                    transactionScope.Complete();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }




    }
}
