using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.CounterSale;
using PIVF.Entities.Models.CounterSale;
using PIVF.Entities.Models.Inventory;
using PIVF.Entities.Models.Master.Inventory;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

using PIVF.Entities.Models.NewRegistration;
using PIVF.BusinessLayer.NewRegistration;
using PIVF.Entities.Models.Billing;
using PIVF.DataAccessLayer.Patient;
using PIVF.Entities.Models.Patient;
using PIVF.DataAccessLayer.NewRegistration;
using PIVF.BusinessLayer.Billing;
using PIVF.BusinessLayer.ItemStock;

namespace PIVF.DataAccessLayer.CounterSale
{
    public class CounterSaleDAL : CounterSaleBAL
    {
        private Database dbServer = null;
        IDbConnection con;

        NewRegistrationBAL objBaseRegDAL;
        PatientVisitService PatVisitSer = new PatientVisitService();
        BillingBAL objBillingBAL;
        ItemStockBAL objItemStockBAL;

        public CounterSaleDAL(NewRegistrationBAL _objBaseRegDAL, BillingBAL _objBillingBAL, ItemStockBAL _objItemStockBAL)
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
            objBaseRegDAL = _objBaseRegDAL;
            objBillingBAL = _objBillingBAL;
            objItemStockBAL = _objItemStockBAL;
        }


        public CounterSaleDAL()

        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public List<ItemMasterVO> GetItemListofStore(long StoreID)
        {
            List<ItemMasterVO> List = new List<ItemMasterVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@StoreID", StoreID);
                List = this.con.Query<ItemMasterVO>(GenericSP.usp_GetItemsforAutocompleteSearch_New, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception E)
            {
                List = null;

            }
            return List;
        }


        public List<ItemStockVO> GetItemBatchwiseStock(long ItemID, long UnitID, long StoreID)
        {

            List<ItemStockVO> List = new List<ItemStockVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ItemID", ItemID);
                Param.Add("@UnitID", UnitID);
                Param.Add("@StoreID", StoreID);
                Param.Add("@IdColumnName", "ID");
                Param.Add("@PagingEnabled", 1);
                Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
                List = this.con.Query<ItemStockVO>(GenericSP.usp_GetItemBatchListForSearch, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception E)
            {
                List = null;
            }
            return List;
        }


        public ItemMasterVO GetItemDetailsByID(long ItemID, long StoreID)
        {

            ItemMasterVO ObjItemMasterVO = new ItemMasterVO();

            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ItemID", ItemID);
                Param.Add("@StoreID", StoreID);
                // ObjItemMasterVO = this.con.Query(GenericSP.usp_GetItemDetailsByID, Param, commandType: CommandType.StoredProcedure);
                ObjItemMasterVO = this.con.Query<ItemMasterVO>(GenericSP.usp_GetItemDetailsByID, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception E)
            {
                ObjItemMasterVO = null;
            }
            return ObjItemMasterVO;
        }

        public clsConversionsVO GetItemUOMConversionsByID(long ItemId)
        {

            //List<clsConversionsVO> List = new List<clsConversionsVO>();
            clsConversionsVO objConversion = new clsConversionsVO();

            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ItemID", ItemId);

                var MultiQuery = this.con.QueryMultiple(GenericSP.GetItemConversionsList, Param, commandType: CommandType.StoredProcedure);
                objConversion.UOMConversionList = MultiQuery.Read<clsConversionsVO>().ToList();
                objConversion.UOMConvertList = MultiQuery.Read<CommanEntity>().ToList();
            }
            catch (Exception E)
            {
                objConversion = null;
            }
            return objConversion;
        }

        public BillVO SaveCounterSaleBill(BillVO objBill)
        {
            var transactionOptions = new TransactionOptions()
            {
                IsolationLevel = System.Transactions.IsolationLevel.Serializable,
                Timeout = TimeSpan.FromMinutes(20),
            };

            using (var transactionScope = new TransactionScope(TransactionScopeOption.Required, transactionOptions))
            {
                //NewRegistrationBAL objBaseRegDAL;
                //PatientVisitService objBaseRegD;
                string strPatient = "";
                objBill.objPatientRegistration.IsFromCounterSale = true;
                //int PatientDuplicacy = objBaseRegDAL.CheckExistingPatientDuplicacy(objBill.objNewPatient);

                if (objBill.objPatientRegistration.lstPatient[0].MRNo == null)
                {
                    strPatient = objBaseRegDAL.SaveUpdate(objBill.objPatientRegistration);
                }

                var arr = strPatient.Split('/');

                if (objBill.objPatientVisit != null )
                {
                    PatientVisit objVisit = new PatientVisit();

                    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

                    DataTable dtSponser = new DataTable();
                    dtSponser.Columns.Add("Id");
                    dtSponser.Columns.Add("VisitID");
                    dtSponser.Columns.Add("VisitUnitId");
                    dtSponser.Columns.Add("CatL2ID");
                    dtSponser.Columns.Add("CompAssID");
                    dtSponser.Columns.Add("CreditLimit");
                    dtSponser.Columns.Add("VFromDate");
                    dtSponser.Columns.Add("VToDate");
                    dtSponser.Columns.Add("TID");
                    dtSponser.Columns.Add("IsStaffDiscount");
                    dtSponser.Columns.Add("StaffRelationID");
                    dtSponser.Columns.Add("Remark");
                    dtSponser.Columns.Add("SponserStatus");
                    dtSponser.Columns.Add("PatientCategoryID");
                    dtSponser.Columns.Add("PatientSourceID");
                    dtSponser.Columns.Add("CompanyID");

                    int cnt = 1;
                    if (objBill.objPatientVisit.lstSponserForSave.Count > 0)
                    {
                        foreach (var Sponser in objBill.objPatientVisit.lstSponserForSave)
                        {
                            DataRow dr = dtSponser.NewRow();
                            dr["Id"] = cnt;
                            dr["VisitID"] = Sponser.VisitID;
                            dr["VisitUnitId"] = Sponser.VisitUnitId;
                            dr["CatL2ID"] = Sponser.CatL2ID;
                            dr["CompAssID"] = Sponser.CompAssID;
                            dr["CreditLimit"] = Sponser.CreditLimit;
                            dr["VFromDate"] = Sponser.VFromDate;
                            dr["VToDate"] = Sponser.VToDate;
                            dr["TID"] = Sponser.TID;
                            dr["IsStaffDiscount"] = Sponser.IsStaffDiscount;
                            dr["StaffRelationID"] = Sponser.RelationId;
                            dr["Remark"] = Sponser.Remark;
                            dr["SponserStatus"] = Sponser.SponserStatus;
                            dr["PatientCategoryID"] = Sponser.CatL1ID;
                            dr["PatientSourceID"] = Sponser.CatL2ID;
                            dr["CompanyID"] = Sponser.CompID;

                            dtSponser.Rows.Add(dr);
                            cnt++;
                        }
                    }

                    if (objBill.objPatientVisit.lstPatientForSave.Count > 0)
                    {
                        foreach (var Bank in objBill.objPatientVisit.lstPatientForSave)
                        {
                            objBill.objPatientVisit.BankID = Bank.BankID;
                            objBill.objPatientVisit.BranchName = Bank.BranchName;
                            objBill.objPatientVisit.IFSCCode = Bank.IFSCCode;
                            objBill.objPatientVisit.AccoutType = Bank.AccoutType;
                            objBill.objPatientVisit.AccountNo = Bank.AccountNo;
                            objBill.objPatientVisit.CustName = Bank.CustName;
                            objBill.objPatientVisit.Status = true;


                        }
                    }

                    //var arr = strPatient.Split('/');
                    if (objBill.objPatientRegistration.lstPatient[0].MRNo == null)
                    {
                        int RegID = Convert.ToInt32(arr[5]);
                        objBill.objPatientVisit.RegID = RegID;
                        int RegUnitID = GenericSP.CurrentUser.UnitID;
                        objBill.objPatientVisit.RegUnitID = RegUnitID;
                    }
                    else
                     { 
                    int RegID1 = objBill.objPatientRegistration.lstPatient[0].RegID;
                    objBill.objPatientVisit.RegID = RegID1;
                    int RegUnitID1 = objBill.objPatientRegistration.lstPatient[0].RegUnitID;
                    objBill.objPatientVisit.RegUnitID = RegUnitID1;
                     }
                    string TokenNo = PatVisitSer.GetTokenNo(0);
                    objBill.objPatientVisit.TokenNo = TokenNo;


                    objVisit = PatVisitSer.SaveVisit(objBill.objPatientVisit, dtSponser);
                    objBill.VisitID = objVisit.VisitID;
                    objBill.VisitUnitID = GenericSP.CurrentUser.UnitID;
                }
                //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
                if (objBill.objPatientRegistration.lstPatient[0].MRNo == null)
                {
                    int PatientID = Convert.ToInt32(arr[5]);
                   objBill.objItemSalesVO.PatientID = PatientID;
                   objBill.objItemSalesVO.PatientUnitID = GenericSP.CurrentUser.UnitID;
                    objBill.PatientID = PatientID;
                    objBill.PatientUnitID= GenericSP.CurrentUser.UnitID;
                    //GenericSP.SelectedPatient = new clsPatientVO();

                    //GenericSP.SelectedPatient.ID = PatientID;
                    //GenericSP.SelectedPatient.UnitID = GenericSP.CurrentUser.UnitID;
                }
                else
                {
                int RegID2 = objBill.objPatientRegistration.lstPatient[0].RegID;
                objBill.objItemSalesVO.PatientID = RegID2;
                objBill.PatientID = RegID2;
                int RegUnitID2 = objBill.objPatientRegistration.lstPatient[0].RegUnitID;
                objBill.PatientUnitID = RegUnitID2;
                objBill.objItemSalesVO.PatientUnitID = RegUnitID2;
                    //GenericSP.SelectedPatient = new clsPatientVO();
                    //GenericSP.SelectedPatient.ID = RegID2;
                    //int RegUnitID2 = objBill.objPatientRegistration.lstPatient[0].RegUnitID;
                    // GenericSP.SelectedPatient.UnitID = RegUnitID2;
                }
             

                int BillID = 0;


                objBill.IsFreezed = true;
                objBill.IsFromCounterSale = true;
                BillID = objBillingBAL.SaveBill(objBill);
                //+++++++++++++++++++++++++++++++++++++++++++++++++++++++//

                objBill.objItemSalesVO.BillID = BillID;
                objBill.objItemSalesVO.BillUnitID = GenericSP.CurrentUser.UnitID;
                objBill.objItemSalesVO.ItemSaleNo = "";
                objBill.objItemSalesVO.VisitID = objBill.VisitID;
                objBill.objItemSalesVO.UnitID = objBill.VisitUnitID;
                clsItemSalesVO Itemsales = new clsItemSalesVO();

                // for (int Index = 0; Index < objBill.ItemStockDetails.Count; Index++)
                //{ 


                var Param = new DynamicParameters();

                Param.Add("@ItemSaleUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@StoreID", objBill.objItemSalesVO.StoreID);
                Param.Add("@BillID", objBill.objItemSalesVO.BillID);
                Param.Add("@BillUnitID", objBill.objItemSalesVO.BillUnitID);
                Param.Add("@Date", DateTime.UtcNow);
                Param.Add("@Time", DateTime.UtcNow);
                Param.Add("@PatientID", objBill.objItemSalesVO.PatientID);
                Param.Add("@PatientUnitID",objBill.objItemSalesVO.PatientUnitID );  //GenericSP.SelectedPatient.UnitID

                Param.Add("@VisitID", objBill.objItemSalesVO.VisitID);
                 Param.Add("@VisitUnitID", objBill.objItemSalesVO.UnitID);//GenericSP.SelectedPatient.VisitUnitID

                Param.Add("@ItemSaleNo", objBill.objItemSalesVO.ItemSaleNo);
                Param.Add("@Remarks", objBill.objItemSalesVO.Remarks);
                Param.Add("@ConcessionPercentage", objBill.objItemSalesVO.ConcessionPercentage);
                Param.Add("@ConcessionAmount", Convert.ToDecimal(objBill.objItemSalesVO.ConcessionAmount));
                Param.Add("@TaxAmount", Convert.ToDecimal(objBill.objItemSalesVO.TaxAmount));
                Param.Add("@TotalAmount", objBill.objItemSalesVO.TotalAmount);
                Param.Add("@NetAmount", Convert.ToDecimal(objBill.objItemSalesVO.NetAmount));
                Param.Add("@Status", 1);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                //  Param.Add("@ServerDateTime                 ", DateTime.UtcNow);
                Param.Add("@AddedWindowsLoginName", Environment.UserName);
                Param.Add("@IsBilled", objBill.objItemSalesVO.IsBilled);
                Param.Add("@ReferenceDoctorID", objBill.objItemSalesVO.ReferenceDoctorID);
                Param.Add("@ReferenceDoctor", objBill.objItemSalesVO.ReferenceDoctor);
                Param.Add("@AdmissionID", objBill.objItemSalesVO.AdmissionID);
                Param.Add("@AdmissionUnitID", GenericSP.CurrentUser.UnitID);
                //Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);

                Param.Add("@ItemSaleID", 0, DbType.Int64, ParameterDirection.Output);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Execute(GenericSP.AddItemSales, Param, commandType: CommandType.StoredProcedure);

                long ItemSaleId = Param.Get<Int64>("@ItemSaleID");
                //objBill.ItemSaleDetailsList.MaterialCStoreID = objBill.objItemSalesVO.StoreID;

                // }
                for (int Index = 0; Index < objBill.ItemSaleDetailsList.Count; Index++)
                {
                    //objBill.ItemSaleDetailsList[Index].MaterialCStoreID = objBill.objItemSalesVO.StoreID;
                    var Param1 = new DynamicParameters();

                    Param1.Add("@ItemSaleDetailsUnitID", GenericSP.CurrentUser.UnitID);
                    Param1.Add("@ItemSaleId", ItemSaleId);
                    Param1.Add("@ItemSaleUnitID", GenericSP.CurrentUser.UnitID);
                    Param1.Add("@ItemId", objBill.ItemSaleDetailsList[Index].ItemId);
                    Param1.Add("@BatchId", objBill.ItemSaleDetailsList[Index].BatchId);
                    Param1.Add("@Quantity", objBill.ItemSaleDetailsList[Index].Quantity);
                    Param1.Add("@PendingQuantity", objBill.ItemSaleDetailsList[Index].PendingQuantity);
                    Param1.Add("@MRP", objBill.ItemSaleDetailsList[Index].MRP);
                    Param1.Add("@ConcessionPercentage", objBill.ItemSaleDetailsList[Index].ConcessionPercentage);
                    Param1.Add("@ConcessionAmount", Convert.ToDecimal(objBill.ItemSaleDetailsList[Index].ConcessionAmount));
                    Param1.Add("@TotalAmount", objBill.ItemSaleDetailsList[Index].TotalAmount);
                    Param1.Add("@NetAmount", Convert.ToDecimal(objBill.ItemSaleDetailsList[Index].NetAmount));
                    Param1.Add("@Status", 1);
                    Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param1.Add("@AddedOn", Environment.MachineName);
                    // Param1.Add("@ServerDateTime", DateTime.UtcNow);
                    Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                    Param1.Add("@PrescriptionDetailsID", objBill.ItemSaleDetailsList[Index].PrescriptionDetailsID);
                    Param1.Add("@PrescriptionDetailsUnitID", objBill.ItemSaleDetailsList[Index].PrescriptionDetailsUnitID);
                    Param1.Add("@BaseQuantity", objBill.ItemSaleDetailsList[Index].BaseQuantity);
                    Param1.Add("@BaseCF", Convert.ToDecimal(objBill.ItemSaleDetailsList[Index].BaseConversionFactor));
                    Param1.Add("@TransactionUOMID", objBill.ItemSaleDetailsList[Index].SelectedUOMID);
                    Param1.Add("@BaseUOMID", objBill.ItemSaleDetailsList[Index].BaseUOMID);
                    Param1.Add("@StockUOMID", objBill.ItemSaleDetailsList[Index].SUOMID);//SUOMID
                    Param1.Add("@StockCF", Convert.ToDecimal(objBill.ItemSaleDetailsList[Index].ConversionFactor));
                    Param1.Add("@StockingQuantity", Convert.ToDecimal(objBill.ItemSaleDetailsList[Index].Quantity * objBill.ItemSaleDetailsList[Index].ConversionFactor));
                    Param1.Add("@ActualNetAmt", objBill.ItemSaleDetailsList[Index].ActualNetAmt);
                    Param1.Add("@ISForMaterialConsumption", objBill.ItemSaleDetailsList[Index].ISForMaterialConsumption);

                    Param1.Add("@StoreID", objBill.ItemSaleDetailsList[Index].MaterialCStoreID);
                    Param1.Add("@Tax1Percentage", objBill.ItemSaleDetailsList[Index].Tax1Percentage);
                    Param1.Add("@Tax1Amount", Convert.ToDecimal(objBill.ItemSaleDetailsList[Index].Tax1Amount));
                    Param1.Add("@Tax1TaxType", objBill.ItemSaleDetailsList[Index].Tax1TaxType);
                    Param1.Add("@Tax1ApplicableOn", objBill.ItemSaleDetailsList[Index].Tax1ApplicableOn);
                    Param1.Add("@Tax2Percentage", objBill.ItemSaleDetailsList[Index].Tax2Percentage);
                    Param1.Add("@Tax2Amount", Convert.ToDecimal(objBill.ItemSaleDetailsList[Index].Tax2Amount));
                    Param1.Add("@Tax2TaxType", objBill.ItemSaleDetailsList[Index].Tax2TaxType);
                    Param1.Add("@Tax2ApplicableOn", objBill.ItemSaleDetailsList[Index].Tax2ApplicableOn);
                    Param1.Add("@Tax3Percentage", objBill.ItemSaleDetailsList[Index].Tax3Percentage);
                    Param1.Add("@Tax3Amount", Convert.ToDecimal(objBill.ItemSaleDetailsList[Index].Tax3Amount));
                    Param1.Add("@Tax3TaxType", objBill.ItemSaleDetailsList[Index].Tax3TaxType);
                    Param1.Add("@Tax3ApplicableOn", objBill.ItemSaleDetailsList[Index].Tax3ApplicableOn);
                    //Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);

                    Param1.Add("@ItemSaleDetailsID", 0, DbType.Int64, ParameterDirection.Output);
                    Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    this.con.Execute(GenericSP.AddItemSalesDetails, Param1, commandType: CommandType.StoredProcedure);
                    long ID = Param1.Get<Int64>("@ItemSaleDetailsID");
                    objBill.ItemSaleDetailsList[Index].ItemSaleDetailsID = ID;



                    int Itemstock = 0;
                    objBill.objItemStockVO.TransactionID = ItemSaleId;
                    objBill.objItemStockVO.ItemID = objBill.ItemSaleDetailsList[Index].ItemId;
                    objBill.objItemStockVO.BatchID = objBill.ItemSaleDetailsList[Index].BatchId;
                    objBill.objItemStockVO.InputTransactionQuantity = objBill.ItemSaleDetailsList[Index].Quantity;
                    objBill.objItemStockVO.TransactionQuantity = objBill.ItemSaleDetailsList[Index].Quantity;
                    objBill.objItemStockVO.BaseUOMID = objBill.ItemSaleDetailsList[Index].BaseUOMID;
                    objBill.objItemStockVO.StoreID = objBill.ItemSaleDetailsList[Index].MaterialCStoreID;
                    objBill.objItemStockVO.StockUOMID = objBill.ItemSaleDetailsList[Index].SUOMID; //SUOMID
                    objBill.objItemStockVO.StockCF = objBill.ItemSaleDetailsList[Index].ConversionFactor;
                    objBill.objItemStockVO.TransactionUOMID = objBill.ItemSaleDetailsList[Index].SelectedUOMID;
                    objBill.objItemStockVO.BaseCF = objBill.ItemSaleDetailsList[Index].BaseConversionFactor;//BaseConversionFactor
                    //objBill.objItemStockVO.StockingQuantity = objBill.ItemSaleDetailsList[Index].AvailableQuantity;
                    objBill.objItemStockVO.StockingQuantity = (objBill.ItemSaleDetailsList[Index].Quantity * objBill.ItemSaleDetailsList[Index].ConversionFactor);



                    Itemstock = objItemStockBAL.SaveItemStockVO(objBill.objItemStockVO);

                }
                //if (objBill.IsFreezed)
                //{
                //    transactionScope.Complete();
                //    return Convert.ToInt32(objBill.PatientID) + "/"+ Convert.ToInt32(objBill.PatientUnitID) +"/"+ Convert.ToInt32(objBill.VisitID) + "/"+ Convert.ToInt32(objBill.VisitUnitID) + "/"+;
                //}
                //int Itemstock1 = 0;
                //objBill.objItemStockVO.TransactionID = ItemSaleId;

                //Itemstock1 = objItemStockBAL.SaveItemStockVO(objBill.objItemStockVO);

                //+++++++++++++++++++++++++++++++++++++++++++++++++++++++//
                transactionScope.Complete();
            }
            return objBill;
        }

        public PatientVisit GetPatientDetails(string Criteria, bool IsAppSearch, int RegUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@criteria", Criteria);
            Param.Add("@IsAppSearch", IsAppSearch);
            //Param.Add("@RegUnitID", GenericSP.CurrentUser.UnitID); 
            Param.Add("@RegUnitID", RegUnitID);

            PatientVisit obj = new PatientVisit();
            obj.lstPatientAutoComplete = new List<PatientVisit>();

            //using (this.con.DapCon)
            //{
                obj.lstPatientAutoComplete = this.con.Query<PatientVisit>(GenericSP.GetPatientForCounterSale, Param, commandType: CommandType.StoredProcedure).AsList();
           // }
            foreach (PatientVisit item in obj.lstPatientAutoComplete)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(item.Photo)))
                    item.PhotoString = System.Text.Encoding.UTF8.GetString(item.Photo);
                else
                    item.PhotoString = string.Empty;

            }
            return obj;
        }

    }
}
