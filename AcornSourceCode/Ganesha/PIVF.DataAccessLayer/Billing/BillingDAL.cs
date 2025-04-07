using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using NLog.Internal;
using PIVF.BusinessLayer.Billing;
using PIVF.Entities.Models.Billing;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Text.RegularExpressions;
using PIVF.Entities.Models.Master.Inventory;

namespace PIVF.DataAccessLayer.Billing
{
    public class BillingDAL : BillingBAL
    {
        private Database dbServer = null;
        IDbConnection Con;
        public BillingDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }

        public List<ServiceMasterVO> GetServiceList()
        {
            var Param = new DynamicParameters();
            // List<ServiceMasterVO> lstSrvMaster = new List<ServiceMasterVO>();
            return this.Con.Query<ServiceMasterVO>(GenericSP.BillingService, Param, commandType: CommandType.StoredProcedure).ToList();


        }

        public int SaveBill(BillVO obj)
        // public long SaveBill(List<BillVO> BillVO)
        {

            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    //foreach (BillVO obj in BillVO)
                    //{
                    long PaymentID = 0;
                    var Param = new DynamicParameters();
                    Param.Add("@Action", "InsertBill");
                    Param.Add("@BillID", obj.BillID);
                    Param.Add("@BillUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@Date", DateTime.Now, DbType.DateTime);
                    if (obj.IsFromCounterSale)           // Begin:: Added by yogita k on 9 Feb 2021
                    {
                        Param.Add("@BillType", 2);
                    }
                    else
                    {
                        Param.Add("@BillType", 1);              // END:: Added by yogita k on 9 Feb 2021
                    }
                    // Param.Add("@BillType", 1);
                    if (obj.IsFromCounterSale)           // Begin:: Added by yogita k on 9 Feb 2021
                    {
                        Param.Add("@VisitID", obj.VisitID);
                        Param.Add("@VisitUnitID", obj.VisitUnitID);
                        Param.Add("@PatientID", obj.PatientID);
                        Param.Add("@PatientUnitID", obj.PatientUnitID);
                    }
                    else
                    {
                        Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                        Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                        Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                        Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                    }

                    //Param.Add("@PatientCategoryID", GenericSP.SelectedPatient.PatientCategoryID);
                    Param.Add("@TotalBillAmount", obj.TotalBillAmount);

                    Param.Add("@NetBillAmount", obj.NetBillAmount);
                    Param.Add("@TotalConcessionAmount", obj.TotalConcessionAmount);
                    Param.Add("@BalanceAmountSelf", obj.BalanceAmountSelf);

                    #region extra params
                    //Param.Add("@CompanyId", obj.CompanyID);            // Begin:: Added by yogita k on 9 Feb 2021
                    //Param.Add("@PatientSourceId", obj.PatientSourceID);
                    //Param.Add("@PatientCategoryId",obj.PatientCategoryID);
                    //Param.Add("@TariffId", obj.TariffID);
                    //Param.Add("@CalculatedNetBillAmount", obj.CalculatedNetBillAmount);
                    //Param.Add("@SelfAmount", obj.SelfAmount);
                    //Param.Add("@NonSelfAmount", obj.NonSelfAmount);
                    //Param.Add("@BalanceAmountNonSelf", obj.BalanceAmountNonSelf);    // END:: Added by yogita k on 9 Feb 2021
                    #endregion

                    bool Freeze = obj.IsFreezed;
                    if (obj.IsFreezed)
                    {
                        Param.Add("@IsFreezed", 1);
                    }
                    else
                    {
                        Param.Add("@IsFreezed", 0);
                    }
                    Param.Add("@Synchronized", 0);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    //Param.Add("@Synchronized", 0);//commented this as added duplicate
                    Param.Add("@ResultStatus", dbType: DbType.Int64, direction: ParameterDirection.Output);
                    Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                    Param.Add("@tempUnitID", 0, DbType.Int64, ParameterDirection.Output);
                    Con.Execute(GenericSP.AddUpdateBill, Param, commandType: CommandType.StoredProcedure);
                    // return Param.Get<int>("@ResultStatus");
                    //int status = Param.Get<int>("@ResultStatus");
                    long ID = Param.Get<Int64>("@ID");
                    long UnitID = Param.Get<Int64>("tempUnitID");
                    obj.tempBillID = ID;
                    obj.tempBillUnitID = UnitID;
                    // }

                    for (int Index = 0; Index < obj.ChargeList.Count; Index++)
                    {
                        var Param1 = new DynamicParameters();
                        Param1.Add("@ChargeID", obj.ChargeList[Index].ChargeID);
                        Param1.Add("@ChargeUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@BillID", ID, DbType.Int64);          // obj.tempBillID);
                        Param1.Add("@BillUnitID", obj.tempBillUnitID);
                        Param1.Add("@Date", DateTime.Now, DbType.DateTime);
                        Param1.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                        Param1.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                        Param1.Add("@ServiceID", obj.ChargeList[Index].ServiceID);
                        Param1.Add("@ServiceName", obj.ChargeList[Index].ServiceName);   //
                        Param1.Add("@Status", 1);
                        Param1.Add("@DoctorID", obj.ChargeList[Index].DoctorID);
                        // Param1.Add("@DoctorName", obj.ChargeList[Index].DoctorName);
                        Param1.Add("@DoctorName", "");
                        Param1.Add("@Rate", obj.ChargeList[Index].Rate);
                        Param1.Add("@TotalAmount", obj.ChargeList[Index].TotalAmount);
                        Param1.Add("@ConcessionPercent", obj.ChargeList[Index].ConcessionPercent);
                        Param1.Add("@ConcessionAmount", obj.ChargeList[Index].ConcessionAmount);
                        Param1.Add("@NetAmount", obj.ChargeList[Index].NetAmount);

                        Param1.Add("@TotalPaidPatientAmount", obj.ChargeList[Index].TotalPaidPatientAmount);
                        Param1.Add("@TotalPatientBalanceAmount", obj.ChargeList[Index].TotalPatientBalanceAmount);

                        Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param1.Add("@AddedOn", Environment.MachineName);
                        Param1.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param1.Add("@Synchronized", 0);
                        Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Param1.Add("@tempChargeID1", 0, DbType.Int64, ParameterDirection.Output);
                        Param1.Add("@tempChargeUnitID1", 0, DbType.Int64, ParameterDirection.Output);
                        Con.Execute(GenericSP.AddCharge, Param1, commandType: CommandType.StoredProcedure);
                        long ChargeID = Param1.Get<Int64>("@tempChargeID1");
                        long ChargeUnitID = Param1.Get<Int64>("@tempChargeUnitID1");
                        obj.ChargeList[Index].tempChargeID1 = ChargeID;
                        obj.ChargeList[Index].tempChargeUnitID1 = ChargeUnitID;


                        //  }
                        // for (int Index = 0; Index < obj.ChargeDetailsList.Count; Index++) {
                        var Param2 = new DynamicParameters();
                        Param2.Add("@ChargeDetailID", obj.ChargeDetailsList[Index].ChargeDetailID);
                        Param2.Add("@ChargeDetailUnitID", GenericSP.CurrentUser.UnitID);
                        Param2.Add("@ChargeID", obj.ChargeList[Index].tempChargeID1);
                        Param2.Add("@ChargeUnitID", obj.ChargeList[Index].tempChargeUnitID1);
                        Param2.Add("@Date", DateTime.Now, DbType.DateTime);
                        Param2.Add("@BillID", obj.tempBillID);
                        Param2.Add("@BillUnitID", obj.tempBillUnitID);
                        //Param2.Add("@Rate", obj.ChargeDetailsList[Index].Rate);
                        //Param2.Add("@TotalAmount", obj.ChargeDetailsList[Index].TotalAmount);
                        //Param2.Add("@ConcessionAmount", obj.ChargeDetailsList[Index].ConcessionAmount);
                        //Param2.Add("@NetAmount", obj.ChargeDetailsList[Index].NetAmount);

                        Param2.Add("@Rate", obj.ChargeList[Index].Rate);
                        Param2.Add("@TotalAmount", obj.ChargeList[Index].TotalAmount);
                        Param2.Add("@ConcessionAmount", obj.ChargeList[Index].ConcessionAmount);
                        Param2.Add("@NetAmount", obj.ChargeList[Index].NetAmount);



                        Param2.Add("@Status", 1);

                        Param2.Add("@PatientPaidAmount", obj.ChargeList[Index].TotalPaidPatientAmount);    // obj.ChargeDetailsList[Index].PatientPaidAmount);
                        Param2.Add("@PatientBalanceAmount", obj.ChargeList[Index].TotalPatientBalanceAmount);   //  obj.ChargeDetailsList[Index].PatientBalanceAmount);

                        Param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param2.Add("@AddedOn", Environment.MachineName);
                        Param2.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param2.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param2.Add("@Synchronized", 0);
                        Con.Execute(GenericSP.AddChargeDetails, Param2, commandType: CommandType.StoredProcedure);
                    }
                    for (int Index = 0; Index < obj.Payment.Count; Index++)
                    {
                        var Param3 = new DynamicParameters();
                        // Param3.Add("@Action", "InsertPayment");
                        Param3.Add("@PaymentID", obj.Payment[Index].PaymentID);
                        Param3.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                        Param3.Add("@Date", DateTime.Now, DbType.DateTime);
                        Param3.Add("@BillID", obj.tempBillID);
                        Param3.Add("@BillAmount", obj.Payment[Index].BillAmount);
                        Param3.Add("@BillBalanceAmount", obj.Payment[Index].BillBalanceAmount);
                        Param3.Add("@Status", 1);
                        Param3.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param3.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param3.Add("@AddedOn", Environment.MachineName);
                        Param3.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param3.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param3.Add("@Synchronized", 0);
                        Param3.Add("@ReceiptNo", "");
                        if (obj.BalanceAmountSelf > 0) { Param3.Add("@IsBillSettlement", 0); }
                        else
                        {
                            Param3.Add("@IsBillSettlement", 1);
                        }


                        Param3.Add("@tempPaymentID1", 0, DbType.Int64, ParameterDirection.Output);
                        Param3.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Con.Execute(GenericSP.AddUpdatePayment, Param3, commandType: CommandType.StoredProcedure);
                        PaymentID = Param3.Get<Int64>("@tempPaymentID1");
                        obj.Payment[Index].tempPaymentID1 = PaymentID;
                        /********************************************************************************************/
                        //Added by AniketK on 08Oct2020 to avoid duplicate entry in payment table.
                        if (Index == 0)
                        {
                            break;
                        }
                        /********************************************************************************************/
                    }
                    for (int Index = 0; Index < obj.OtherSrvPaymentModeList.Count; Index++)
                    {
                        var Param4 = new DynamicParameters();
                        // Param4.Add("@Action", "InsertPaymentDetails");

                        //Begin :: Added by Aniket on 06Oct2020
                        //Param4.Add("@AdvanceID", obj.OtherSrvPaymentModeList[Index].AdvanceID);
                        //Param4.Add("@AdvanceUnitID", obj.OtherSrvPaymentModeList[Index].AdvanceUnitID);
                        //End :: Added by Aniket on 06Oct2020

                        Param4.Add("@PaymentDetailID", obj.OtherSrvPaymentModeList[Index].PaymentDetailID);
                        Param4.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                        //Param4.Add("@PaymentID", obj.Payment[Index].tempPaymentID1); //Commented and Modified by AniketK on 08Oct2020
                        Param4.Add("@PaymentID", PaymentID);
                        Param4.Add("@PaymentModeID", obj.OtherSrvPaymentModeList[Index].PaymentModeID);
                        Param4.Add("@Number", obj.OtherSrvPaymentModeList[Index].Number);
                        Param4.Add("@Date", obj.OtherSrvPaymentModeList[Index].Date);
                        Param4.Add("@BankID", obj.OtherSrvPaymentModeList[Index].BankID);
                        Param4.Add("@PaidAmount", obj.OtherSrvPaymentModeList[Index].PaidAmount);
                        Param4.Add("@Status", 1);
                        Param4.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param4.Add("@AddedOn", Environment.MachineName);
                        Param4.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param4.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param4.Add("@AdvanceID", obj.OtherSrvPaymentModeList[Index].AdvanceID);
                        Param4.Add("@AdvanceAmount", obj.OtherSrvPaymentModeList[Index].AdvanceBalance);
                        Param4.Add("@AdvanceUsed", obj.OtherSrvPaymentModeList[Index].PaidAmount);
                        //Param4.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                        //Param4.Add("@UpdatedOn", Environment.MachineName);
                        //Param4.Add("@UpdatedDateTime", DateTime.UtcNow);
                        //Param4.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                        Param4.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        // Param4.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param4.Add("@Synchronized", 0);
                        Param4.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Con.Execute(GenericSP.AddUpdatePaymentDetails, Param4, commandType: CommandType.StoredProcedure);
                        // return Param1.Get<int>("@ResultStatus");  
                    }
                    if (Freeze)
                    {
                        transactionScope.Complete();
                        return Convert.ToInt32(ID);
                    }

                    //  }
                    transactionScope.Complete();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }




        public int UpdateBill(BillVO obj)
        {
            long PaymentID = 0;
            try
            {
                using (var transactionScope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.ReadCommitted }))
                {
                    // Add your existing logic here without any change, the only fix is in the transaction handling

                    var Param = new DynamicParameters();
                    Param.Add("@BillID", obj.BillID);
                    Param.Add("@BillUnitID", obj.BillUnitID);
                    Param.Add("@Date", DateTime.UtcNow);
                    Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@UpdatedOn", Environment.UserName);
                    Param.Add("@UpdatedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
                    Param.Add("@TotalBillAmount", obj.TotalBillAmount);
                    Param.Add("@NetBillAmount", obj.NetBillAmount);
                    Param.Add("@TotalConcessionAmount", obj.TotalConcessionAmount);
                    Param.Add("@BalanceAmountSelf", obj.BalanceAmountSelf);
                    Param.Add("@IsFreezed", obj.IsFreezed ? 1 : 0);

                    Con.Execute(GenericSP.UpdateBill, Param, commandType: CommandType.StoredProcedure);

                    for (int Index = 0; Index < obj.ChargeList.Count; Index++)
                    {
                        var Param1 = new DynamicParameters();
                        Param1.Add("@BillID", obj.BillID);
                        Param1.Add("@BillUnitID", obj.BillUnitID);
                        Param1.Add("@Date", DateTime.UtcNow);
                        Param1.Add("@ChargeID", obj.ChargeList[Index].ChargeID);
                        Param1.Add("@ChargeUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@ServiceID", obj.ChargeList[Index].ServiceID);
                        Param1.Add("@ServiceName", obj.ChargeList[Index].ServiceName);
                        Param1.Add("@DoctorID", obj.ChargeList[Index].DoctorID);
                        Param1.Add("@DoctorName", "");
                        Param1.Add("@Rate", obj.ChargeList[Index].Rate);
                        Param1.Add("@TotalAmount", obj.ChargeList[Index].TotalAmount);
                        Param1.Add("@ConcessionPercent", obj.ChargeList[Index].ConcessionPercent);
                        Param1.Add("@ConcessionAmount", obj.ChargeList[Index].ConcessionAmount);
                        Param1.Add("@NetAmount", obj.ChargeList[Index].NetAmount);
                        Param1.Add("@TotalPaidPatientAmount", obj.ChargeList[Index].TotalPaidPatientAmount);
                        Param1.Add("@TotalPatientBalanceAmount", obj.ChargeList[Index].TotalPatientBalanceAmount);
                        Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param1.Add("@AddedOn", Environment.UserName);
                        Param1.Add("@AddedDateTime", DateTime.UtcNow);
                        Param1.Add("@AddedWindowsLoginName", Environment.MachineName);
                        Param1.Add("@Synchronized", 0);
                        Param1.Add("@VisitID", obj.VisitID);
                        Param1.Add("@VisitUnitID", obj.VisitUnitID);
                        Param1.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                        Param1.Add("@UpdatedOn", Environment.UserName);
                        Param1.Add("@UpdatedDateTime", DateTime.UtcNow);
                        Param1.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                        Param1.Add("@ChargeIDOut", 0, DbType.Int64, ParameterDirection.Output);
                        Param1.Add("@ChargeUnitIDOut", 0, DbType.Int64, ParameterDirection.Output);

                        Con.Execute(GenericSP.UpdateCharge, Param1, commandType: CommandType.StoredProcedure);
                        long ChargeID = Param1.Get<Int64>("@ChargeIDOut");
                        obj.ChargeList[Index].tempChargeID1 = ChargeID;
                        long ChargeUnitID = Param1.Get<Int64>("@ChargeUnitIDOut");
                        obj.ChargeList[Index].tempChargeUnitID1 = ChargeUnitID;

                        var Param2 = new DynamicParameters();
                        Param2.Add("@ChargeID", obj.ChargeList[Index].tempChargeID1);
                        Param2.Add("@ChargeUnitID", obj.ChargeList[Index].tempChargeUnitID1);
                        Param2.Add("@ChargeDetailUnitID", GenericSP.CurrentUser.UnitID);
                        Param2.Add("@Date", DateTime.UtcNow);
                        Param2.Add("@Rate", obj.ChargeList[Index].Rate);
                        Param2.Add("@TotalAmount", obj.ChargeList[Index].TotalAmount);
                        Param2.Add("@ConcessionAmount", obj.ChargeList[Index].ConcessionAmount);
                        Param2.Add("@NetAmount", obj.ChargeList[Index].NetAmount);
                        Param2.Add("@PatientPaidAmount", obj.ChargeList[Index].TotalPaidPatientAmount);
                        Param2.Add("@PatientBalanceAmount", obj.ChargeList[Index].TotalPatientBalanceAmount);
                        Param2.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param2.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                        Param2.Add("@UpdatedOn", Environment.UserName);
                        Param2.Add("@UpdatedDateTime", DateTime.UtcNow);
                        Param2.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                        Param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param2.Add("@AddedOn", Environment.UserName);
                        Param2.Add("@AddedDateTime", DateTime.UtcNow);
                        Param2.Add("@AddedWindowsLoginName", Environment.MachineName);
                        Param2.Add("@Synchronized", 0);

                        Con.Execute(GenericSP.UpdateChargeDetails, Param2, commandType: CommandType.StoredProcedure);
                    }

                    for (int Index = 0; Index < obj.Payment.Count; Index++)
                    {
                        var Param3 = new DynamicParameters();
                        Param3.Add("@PaymentID", obj.Payment[Index].PaymentID);
                        Param3.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                        Param3.Add("@Date", DateTime.UtcNow);
                        Param3.Add("@BillID", obj.BillID);
                        Param3.Add("@BillAmount", obj.Payment[Index].BillAmount);
                        Param3.Add("@BillBalanceAmount", obj.Payment[Index].BillBalanceAmount);
                        Param3.Add("@Status", 1);
                        Param3.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param3.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param3.Add("@AddedOn", Environment.UserName);
                        Param3.Add("@AddedDateTime", DateTime.UtcNow);
                        Param3.Add("@AddedWindowsLoginName", Environment.MachineName);
                        Param3.Add("@Synchronized", 0);
                        Param3.Add("@ReceiptNo", "");
                        Param3.Add("@IsBillSettlement", 0);

                        Param3.Add("@tempPaymentID1", 0, DbType.Int64, ParameterDirection.Output);
                        Param3.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Con.Execute(GenericSP.AddUpdatePayment, Param3, commandType: CommandType.StoredProcedure);
                        PaymentID = Param3.Get<Int64>("@tempPaymentID1");
                        obj.Payment[Index].tempPaymentID1 = PaymentID;
                        break;
                    }

                    for (int Index = 0; Index < obj.OtherSrvPaymentModeList.Count; Index++)
                    {
                        var Param4 = new DynamicParameters();
                        Param4.Add("@PaymentDetailID", obj.OtherSrvPaymentModeList[Index].PaymentDetailID);
                        Param4.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                        Param4.Add("@PaymentID", PaymentID);
                        Param4.Add("@PaymentModeID", obj.OtherSrvPaymentModeList[Index].PaymentModeID);
                        Param4.Add("@Number", obj.OtherSrvPaymentModeList[Index].Number);
                        Param4.Add("@Date", obj.OtherSrvPaymentModeList[Index].Date);
                        Param4.Add("@BankID", obj.OtherSrvPaymentModeList[Index].BankID);
                        Param4.Add("@PaidAmount", obj.OtherSrvPaymentModeList[Index].PaidAmount);
                        Param4.Add("@AdvanceID", obj.OtherSrvPaymentModeList[Index].AdvanceID);
                        Param4.Add("@AdvanceAmount", obj.OtherSrvPaymentModeList[Index].AdvanceBalance);
                        Param4.Add("@AdvanceUsed", obj.OtherSrvPaymentModeList[Index].PaidAmount);
                        Param4.Add("@Status", 1);
                        Param4.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param4.Add("@AddedOn", Environment.UserName);
                        Param4.Add("@AddedDateTime", DateTime.UtcNow);
                        Param4.Add("@AddedWindowsLoginName", Environment.MachineName);
                        Param4.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param4.Add("@Synchronized", 0);
                        Param4.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Con.Execute(GenericSP.AddUpdatePaymentDetails, Param4, commandType: CommandType.StoredProcedure);
                    }

                    // Complete the transaction
                    transactionScope.Complete();

                    return 2; // Indicating success
                }
            }
            catch (Exception ex)
            {
                // Handle exception, log it if necessary
                return 0; // Indicating failure
            }
        }




        public BillVO GetPatientDetails(int PatID, int PatUnitID)
        {
            BillVO obj = new BillVO();
            var paramPatDetails = new DynamicParameters();
            paramPatDetails.Add("@PatientID", PatID);
            paramPatDetails.Add("@PatientUnitID", PatUnitID);

            var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetPatientDetails, paramPatDetails, commandType: CommandType.StoredProcedure);
            obj = QueryMultiple.Read<BillVO>().SingleOrDefault();
            return obj;
        }


        //public List<BillVO> GetBillList(int PatID,int PatUnitID,int VisitID,int VisitUnitID)
        //{
        //       var paramBill = new DynamicParameters();              
        //        paramBill.Add("@PatientID", PatID);
        //        paramBill.Add("@PatientUnitID", PatUnitID);
        //        paramBill.Add("@VisitID", VisitID);
        //        paramBill.Add("@VisitUnitID", VisitUnitID);
        //        return this.Con.Query<BillVO>(GenericSP.GetBillList, paramBill, commandType: CommandType.StoredProcedure).ToList();           

        //}

        //public List<BillVO> GetBillList(string[] BillingList)
        public List<BillVO> GetBillList(string[] BillingList, int index, bool PgEn)
        {
            var Param = new DynamicParameters();
            //    Param.Add("@PagingEnabled", 0); //commented by Nayan Kamble on 13/02/2020 
            Param.Add("@PageIndex", index);            //Added by Nayan Kamble on 13/02/2020 
            Param.Add("@PagingEnabled", PgEn);         //Added by Nayan Kamble on 13/02/2020 
            Param.Add("@FromDate", BillingList[0]);
            Param.Add("@ToDate", BillingList[1]);
            Param.Add("@PatientID", BillingList[2]);
            Param.Add("@PatientUnitID", BillingList[3]);
            // Param.Add("@PageIndex", BillingList[4]);        //commented by Nayan Kamble on 13/02/2020 
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);


            Param.Add("@FirstName", BillingList[4]);
            Param.Add("@MiddleName", BillingList[5]);
            Param.Add("@LastName", BillingList[6]);
            Param.Add("@MRNO", BillingList[7]);
            Param.Add("@BillNO", BillingList[8]);
            Param.Add("@OPDNO", BillingList[9]);
            Param.Add("@BillStatus", Convert.ToInt32(BillingList[10]));
            Param.Add("@BillType", Convert.ToInt32(BillingList[11]));
            Param.Add("@PrintFormat", Convert.ToInt32(BillingList[12]));

            List<BillVO> lstBillingList = new List<BillVO>();
            lstBillingList = this.Con.Query<BillVO>(GenericSP.GetBillListForSearch, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstBillingList != null && lstBillingList.Count > 0)
            {
                //lstBillingList[0].TotalCount = Param.Get<Int32>("@TotalRows");
                lstBillingList[0].TotalCount = lstBillingList[0].TotalCount;

            }

            // lstBillingList[0].TotalCount = Param.Get<Int32>("@TotalRows"); 
            return lstBillingList;
        }
        public List<BillVO> GetSavedBillList(int BillID, int BillUnitID, int VisitID, int VisitUnitID)
        {
            var paramBillBillList = new DynamicParameters();
            // param.Add("@Action", "LoadSpecificFemaleHistory");
            paramBillBillList.Add("@BillID", BillID);
            paramBillBillList.Add("@BillUnitID", BillUnitID);
            //paramBillBillList.Add("@VisitID", VisitID);
            //paramBillBillList.Add("@VisitUnitID", VisitUnitID);

            return this.Con.Query<BillVO>(GenericSP.GetSavedBillList, paramBillBillList, commandType: CommandType.StoredProcedure).ToList();

        }


        public int DeleteService(int BillID, int BillUnitID, int ServiceCode)
        {
            //  int ID = 0;
            //  try
            // {
            var paramDelete = new DynamicParameters();
            paramDelete.Add("@BillID", BillID);
            paramDelete.Add("@BillUnitID", BillUnitID);
            paramDelete.Add("@ServiceCode", ServiceCode);
            paramDelete.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.Con.Query<int>(GenericSP.DeleteService, paramDelete, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return paramDelete.Get<int>("@ResultStatus");

            //ID = paramDelete.Get<Int16>("@ResultStatus");
            //}
            //catch (Exception e) 
            //{
            //    ID = 0;
            //}
            //return ID;   
        }


        public BillVO GetPaymentDetailsForSettleBill(int BillID, int BillUnitID)
        {
            BillVO obj = new BillVO();
            var paramBillBillList = new DynamicParameters();
            paramBillBillList.Add("@BillID", BillID);
            paramBillBillList.Add("@BillUnitID", BillUnitID);
            // return this.Con.Query<BillVO>(GenericSP.GetPaymentDetailsForSettleBill, paramBillBillList, commandType: CommandType.StoredProcedure).ToList();

            var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetPaymentDetailsForSettleBill, paramBillBillList, commandType: CommandType.StoredProcedure);
            obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            return obj;
        }

        public List<ChargeVO> GetChargeList(int BillID, int BillUnitID, int VisitID, int VisitUnitID)
        {
            var paramChargeList = new DynamicParameters();
            paramChargeList.Add("@BillID", BillID);
            paramChargeList.Add("@BillUnitID", BillUnitID);
            paramChargeList.Add("@VisitID", VisitID);
            paramChargeList.Add("@VisitUnitID", VisitUnitID);
            return this.Con.Query<ChargeVO>(GenericSP.GetChargeList, paramChargeList, commandType: CommandType.StoredProcedure).ToList();

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetChargeList, paramChargeList, commandType: CommandType.StoredProcedure);
            //obj = QueryMultiple.Read<ChargeVO>().SingleOrDefault(); 

            //return obj;
        }


        public int SaveUpdatePayment(BillVO obj)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    var paramBillBillList = new DynamicParameters();
                    for (int Index = 0; Index < obj.Payment.Count; Index++)
                    {
                        var Param3 = new DynamicParameters();
                        // Param3.Add("@Action", "InsertPayment");
                        Param3.Add("@PaymentID", obj.Payment[Index].PaymentID);
                        Param3.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                        Param3.Add("@Date", DateTime.UtcNow);
                        //Param3.Add("@BillID", obj.tempBillID);
                        Param3.Add("@BillID", obj.Payment[Index].BillID);
                        Param3.Add("@BillAmount", obj.Payment[Index].BillAmount);
                        Param3.Add("@BillBalanceAmount", obj.Payment[Index].BillBalanceAmount);
                        Param3.Add("@Status", 1);
                        Param3.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param3.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param3.Add("@AddedOn", Environment.UserName);
                        Param3.Add("@AddedDateTime", DateTime.UtcNow);
                        Param3.Add("@AddedWindowsLoginName", Environment.MachineName);
                        Param3.Add("@Synchronized", 0);
                        Param3.Add("@ReceiptNo", "");
                        Param3.Add("@IsBillSettlement", 1);
                        Param3.Add("@tempPaymentID1", 0, DbType.Int64, ParameterDirection.Output);
                        Param3.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Con.Execute(GenericSP.AddUpdatePayment, Param3, commandType: CommandType.StoredProcedure);
                        long PaymentID = Param3.Get<Int64>("@tempPaymentID1");
                        long tempPayment = PaymentID;
                        obj.Payment[Index].tempPaymentID1 = PaymentID;


                    }
                    for (int Index = 0; Index < obj.OtherSrvPaymentModeList.Count; Index++)
                    {
                        var Param4 = new DynamicParameters();
                        // Param4.Add("@Action", "InsertPaymentDetails");
                        Param4.Add("@PaymentDetailID", obj.OtherSrvPaymentModeList[Index].PaymentDetailID);
                        Param4.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                        Param4.Add("@PaymentID", obj.Payment[0].tempPaymentID1);
                        Param4.Add("@PaymentModeID", obj.OtherSrvPaymentModeList[Index].PaymentModeID);
                        Param4.Add("@Number", obj.OtherSrvPaymentModeList[Index].Number);
                        Param4.Add("@Date", obj.OtherSrvPaymentModeList[Index].Date);
                        Param4.Add("@BankID", obj.OtherSrvPaymentModeList[Index].BankID);
                        Param4.Add("@PaidAmount", obj.OtherSrvPaymentModeList[Index].PaidAmount);
                        Param4.Add("@Status", 1);
                        Param4.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param4.Add("@AddedOn", Environment.UserName);
                        Param4.Add("@AddedDateTime", DateTime.UtcNow);
                        Param4.Add("@AddedWindowsLoginName", Environment.MachineName);
                        //Param4.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                        //Param4.Add("@UpdatedOn", Environment.MachineName);
                        //Param4.Add("@UpdatedDateTime", DateTime.UtcNow);
                        //Param4.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                        Param4.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        // Param4.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param4.Add("@Synchronized", 0);
                        Param4.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Con.Execute(GenericSP.AddUpdatePaymentDetails, Param4, commandType: CommandType.StoredProcedure);
                        // return 1;
                    }
                    transactionScope.Complete();
                    return Convert.ToInt32(obj.Payment[0].tempPaymentID1);  //1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }

        }

        public int AddUpdateChargeAndDetailsWhileSettle(BillVO obj, int i)       /* different date bill from settlement link of bill list */    //UpdateChargeWhileSettle
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    int Index = i;
                    //var paramBillBillList = new DynamicParameters();
                    //for (int Index = i; Index < obj.ChargeList.Count; Index++)
                    //{
                    var Param5 = new DynamicParameters();
                    //Param5.Add("@ChargeID", obj.ChargeList[Index].ChargeID);
                    // Param5.Add("@ChargeUnitID", GenericSP.CurrentUser.UnitID);
                    //Param5.Add("@BillID", obj.ChargeList[Index].BillID);
                    //Param5.Add("@BillUnitID", obj.ChargeList[Index].BillUnitID);

                    Param5.Add("@ChargeID", obj.ChargeList[Index].ChargeID);
                    Param5.Add("@ChargeUnitID", obj.ChargeList[Index].ChargeUnitID);
                    //Param5.Add("@ConcessionPercent", obj.ChargeList[Index].ConcessionPercent);
                    //Param5.Add("@ConcessionAmount", obj.ChargeList[Index].ConcessionAmount);
                    Param5.Add("@NetAmount", obj.ChargeList[Index].NetAmount);

                    Param5.Add("@TotalPaidPatientAmount", obj.ChargeList[Index].TotalPaidPatientAmount);
                    Param5.Add("@TotalPatientBalanceAmount", obj.ChargeList[Index].TotalPatientBalanceAmount);

                    Param5.Add("@Date", obj.ChargeList[Index].Date);
                    //Param5.Add("@tempChargeID1", 0, DbType.Int64, ParameterDirection.Output);
                    //Param5.Add("@tempChargeUnitID1", 0, DbType.Int64, ParameterDirection.Output);


                    Param5.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param5.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param5.Add("@UpdatedOn", Environment.UserName);
                    Param5.Add("@UpdatedDateTime ", DateTime.UtcNow);
                    Param5.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                    Param5.Add("@Synchronized", 0);


                    Con.Execute(GenericSP.UpdateChargeWhileSettle, Param5, commandType: CommandType.StoredProcedure);
                    //long ChargeID = Param5.Get<Int64>("@tempChargeID1");
                    //long ChargeUnitID = Param5.Get<Int64>("@tempChargeUnitID1");
                    //obj.ChargeList[Index].tempChargeID1 = ChargeID;
                    //obj.ChargeList[Index].tempChargeUnitID1 = ChargeUnitID;

                    var Param6 = new DynamicParameters();
                    //Param2.Add("@ChargeID", obj.ChargeList[Index].tempChargeID1);
                    //Param2.Add("@ChargeUnitID", obj.ChargeList[Index].tempChargeUnitID1);
                    Param6.Add("@ChargeID", obj.ChargeList[Index].ChargeID);
                    Param6.Add("@ChargeUnitID", obj.ChargeList[Index].ChargeUnitID);
                    Param6.Add("@ChargeDetailID", 0);     //obj.ChargeDetailsList[Index].ChargeDetailID
                    Param6.Add("@ChargeDetailUnitID", GenericSP.CurrentUser.UnitID);
                    Param6.Add("@Date", DateTime.UtcNow);
                    // Param6.Add("@Quantity", obj.ChargeDetailsList[Index].Quantity);


                    Param6.Add("@PatientPaidAmount", obj.ChargeList[Index].TotalPaidPatientAmount);
                    Param6.Add("@PatientBalanceAmount", obj.ChargeList[Index].TotalPatientBalanceAmount);

                    Param6.Add("@Status", 1);
                    Param6.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param6.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param6.Add("@AddedOn", Environment.UserName);
                    Param6.Add("@AddedDateTime", DateTime.UtcNow);
                    Param6.Add("@AddedWindowsLoginName", Environment.MachineName);
                    Param6.Add("@Synchronized", 0);
                    Con.Execute(GenericSP.InsertChargeDetailsWhileSettle, Param6, commandType: CommandType.StoredProcedure);

                    //}
                    transactionScope.Complete();
                    return 1;
                }
            }

            catch (Exception ex)
            {
                return 0;
            }
        }
        public int UpdateChargeAndDetailsWhileSettle(BillVO obj, int i)              //Update Charge & Update Charge Details   
        {

            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    var paramBillBillList = new DynamicParameters();
                    int Index = i;
                    // for (int Index = i; Index < obj.ChargeList.Count; Index++)
                    // {
                    var Param5 = new DynamicParameters();
                    Param5.Add("@ChargeID", obj.ChargeList[Index].ChargeID);
                    Param5.Add("@ChargeUnitID", obj.ChargeList[Index].ChargeUnitID);
                    //Param5.Add("@BillID", obj.ChargeList[Index].BillID);
                    //Param5.Add("@BillUnitID", obj.ChargeList[Index].BillUnitID);
                    // Param5.Add("@ConcessionPercent", obj.ChargeList[Index].ConcessionPercent);
                    // Param5.Add("@ConcessionAmount", obj.ChargeList[Index].ConcessionAmount);
                    Param5.Add("@NetAmount", obj.ChargeList[Index].NetAmount);

                    Param5.Add("@TotalPaidPatientAmount", obj.ChargeList[Index].TotalPaidPatientAmount);
                    Param5.Add("@TotalPatientBalanceAmount", obj.ChargeList[Index].TotalPatientBalanceAmount);

                    Param5.Add("@Date", obj.ChargeList[Index].Date);
                    //Param5.Add("@tempChargeID1", 0, DbType.Int64, ParameterDirection.Output);
                    //Param5.Add("@tempChargeUnitID1", 0, DbType.Int64, ParameterDirection.Output);

                    Param5.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param5.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param5.Add("@UpdatedOn", Environment.UserName);
                    Param5.Add("@UpdatedDateTime ", DateTime.UtcNow);
                    Param5.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                    Param5.Add("@Synchronized", 0);
                    Con.Execute(GenericSP.UpdateChargeWhileSettle, Param5, commandType: CommandType.StoredProcedure);

                    //long ChargeID = Param5.Get<Int64>("@tempChargeID1");
                    //long ChargeUnitID = Param5.Get<Int64>("@tempChargeUnitID1");
                    //obj.ChargeList[Index].tempChargeID1 = ChargeID;
                    //obj.ChargeList[Index].tempChargeUnitID1 = ChargeUnitID;

                    var Param6 = new DynamicParameters();
                    //Param2.Add("@ChargeID", obj.ChargeList[Index].tempChargeID1);
                    //Param2.Add("@ChargeUnitID", obj.ChargeList[Index].tempChargeUnitID1);
                    //Param6.Add("@ChargeID", obj.ChargeList[Index].tempChargeID1);
                    //Param6.Add("@ChargeUnitID", obj.ChargeList[Index].tempChargeUnitID1);

                    Param6.Add("@ChargeID", obj.ChargeList[Index].ChargeID);
                    Param6.Add("@ChargeUnitID", obj.ChargeList[Index].ChargeUnitID);

                    // Param6.Add("@ChargeDetailID", 0);     //obj.ChargeDetailsList[Index].ChargeDetailID
                    // Param6.Add("@ChargeDetailUnitID", GenericSP.CurrentUser.UnitID);
                    Param6.Add("@Date", DateTime.UtcNow);
                    // Param6.Add("@Quantity", obj.ChargeDetailsList[Index].Quantity);


                    Param6.Add("@PatientPaidAmount", obj.ChargeList[Index].TotalPaidPatientAmount);
                    Param6.Add("@PatientBalanceAmount", obj.ChargeList[Index].TotalPatientBalanceAmount);

                    //Param6.Add("@Status", 1);
                    Param6.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param6.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param6.Add("@UpdatedOn", Environment.UserName);
                    Param6.Add("@UpdatedDateTime ", DateTime.UtcNow);
                    Param6.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                    Param6.Add("@Synchronized", 0);
                    Con.Execute(GenericSP.UpdateChargeDetailsWhileSettle, Param6, commandType: CommandType.StoredProcedure);

                    //}
                    transactionScope.Complete();
                    return 1;
                }
            }

            catch (Exception ex)
            {
                return 0;
            }
        }
        public int UpdateBillPaymentDetails(BillVO obj)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    var paramBillPaymentDetails = new DynamicParameters();
                    paramBillPaymentDetails.Add("@BillID", obj.BillID);
                    paramBillPaymentDetails.Add("@BillUnitID", obj.BillUnitID);
                    paramBillPaymentDetails.Add("@BalanceAmountSelf", obj.BalanceAmountSelf);
                    //paramBillPaymentDetails.Add("@TotalConcessionAmount", obj.TotalConcessionAmount);
                    paramBillPaymentDetails.Add("@NetBillAmount", obj.NetBillAmount);
                    paramBillPaymentDetails.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    paramBillPaymentDetails.Add("@UpdatedOn", Environment.MachineName);
                    paramBillPaymentDetails.Add("@UpdatedDateTime", DateTime.UtcNow);
                    paramBillPaymentDetails.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                    paramBillPaymentDetails.Add("@IsFreezed", obj.IsFreezed);
                    // paramBillPaymentDetails.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    Con.Execute(GenericSP.UpdateBillPaymentDetails, paramBillPaymentDetails, commandType: CommandType.StoredProcedure);
                    //return paramBillPaymentDetails.Get<int>("@ResultStatus");

                    for (int Index = 0; Index < obj.ChargeList.Count; Index++)
                    {
                        if (obj.ChargeList[Index].IsSameDate && obj.ChargeList[Index].IsUpdate)     //Update Charge & Update Charge Details    same Date
                        {
                            UpdateChargeAndDetailsWhileSettle(obj, Index);
                        }
                        else if (obj.ChargeList[Index].IsSameDate == false && obj.ChargeList[Index].IsUpdate == false)
                        {                               // //Update Charge & Insert Charge Details   Diff Date
                            AddUpdateChargeAndDetailsWhileSettle(obj, Index);
                        }
                        else if ((obj.ChargeList[Index].IsUpdate == true) && (obj.ChargeList[Index].IsSameDate == false))
                        {
                            UpdateChargeAndDetailsWhileSettle(obj, Index);

                        }
                        else
                        {

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


        public List<BillVO> GetReceiptList(int BillID, int UnitID)
        {
            BillVO obj = new BillVO();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@BillID", BillID);
            paramReceiptList.Add("@UnitID", UnitID);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<BillVO>(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }


        //Added by Trupti Musale to get Checked-In Patients List  --On 3-12-2024
        public List<CheckedInPatients> GetCheckedInPatientsList(string Search)
        {
            var paramPatientList = new DynamicParameters();
            paramPatientList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramPatientList.Add("@Search", Search);


            return this.Con.Query<CheckedInPatients>(GenericSP.GetCheckInPatientsList, paramPatientList, commandType: CommandType.StoredProcedure).ToList();
        }

        public int UpdateBillCancellationDetails(BillCancellationDetails obj)
        {
            int resultStatus = 0;
            var param = new DynamicParameters();
            var param2 = new DynamicParameters();
            long AdvanceId = 0;
            long BillID = 0;
            long PaymentID = 0;
            long PaymentIDAdvance = 0;
            long RefundID = 0;
            try
            {
                // Create a transaction scope for the operation
                using (var transactionScope = new TransactionScope())
                {

                    param.Add("@BillID", obj.BillID);
                    // param.Add("@IsCancelled", obj.IsCancelled);
                    param.Add("@CancellationDate", DateTime.UtcNow);
                    param.Add("@CancellationTime", DateTime.UtcNow);
                    param.Add("@BillCancellationRemark", obj.BillCancellationRemark);

                    param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);

                    param.Add("@BillIDOUT", 0, DbType.Int64, ParameterDirection.Output);
                    Con.Execute(GenericSP.UpdateBillCancellationDetails, param, commandType: CommandType.StoredProcedure);
                    BillID = param.Get<Int64>("@BillIDOUT");

                    foreach (var item in obj.lstPatientDataDetails)
                    {
                        param2.Add("@PatientID", item.RegID);
                        param2.Add("@PatientUnitID", item.RegUnitID);
                    }
                    param2.Add("@BillId", obj.BillID);
                    param2.Add("@IsBillCancelled", 1);
                    param2.Add("@RefundID", 0);
                    param2.Add("@UnitId", GenericSP.CurrentUser.UnitID);
                    param2.Add("@Amount", obj.PaymentAmount);
                    param2.Add("@Remarks", obj.BillCancellationRemark);
                    param2.Add("@Date", DateTime.Now, DbType.DateTime);
                    param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    param2.Add("@AddedOn", Environment.MachineName);
                    param2.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    //Param.Add("@AddedUTCDateTime", DateTime.UtcNow);
                    param2.Add("@AddedWindowsLoginName", Environment.UserName);
                    param2.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);

                    param2.Add("@RefundID", 0, DbType.Int64, ParameterDirection.Output);
                    Con.Execute(GenericSP.AddOrUpdateRefundForBill, param2, commandType: CommandType.StoredProcedure);
                    RefundID = param2.Get<Int64>("@RefundID");
                    var Param1 = new DynamicParameters();
                    foreach (List<PaymentInfoVO> subList in obj.lstPaymentModeDetails)
                    {
                        foreach (var item in subList)
                        {
                            //Save Payment               
                            Param1.Add("@PaymentID", item.PaymentID);
                            Param1.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@Date", DateTime.UtcNow);
                            //Param1.Add("@BILLID", BillID);
                            Param1.Add("@RefundId", RefundID);
                            // Param1.Add("@RefundUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@RefundAmount", obj.PaymentAmount);
                            Param1.Add("@Status", 1);
                            Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param1.Add("@AddedOn", Environment.UserName);
                            //Param1.Add("@ChargeId", obj.ChargeID);
                            Param1.Add("@AddedDateTime", DateTime.UtcNow);
                            Param1.Add("@AddedWindowsLoginName", Environment.MachineName);
                            Param1.Add("@Synchronized", 0);
                            Param1.Add("@ReceiptNo", "");
                            Param1.Add("@IsBillSettlement", 0);
                            Param1.Add("@tempPaymentID1", 0, DbType.Int64, ParameterDirection.Output);
                            Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            Con.Execute(GenericSP.AddUpdatePayment, Param1, commandType: CommandType.StoredProcedure);
                            PaymentID = Param1.Get<Int64>("@tempPaymentID1");
                            break;
                        }
                    }
                    foreach (List<PaymentInfoVO> subList in obj.lstPaymentModeDetails)
                    {
                        foreach (var item in subList)
                        {
                            //Save Payment Details
                            var Param2 = new DynamicParameters();
                            Param2.Add("@PaymentDetailID", item.PaymentDetailID);
                            Param2.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@PaymentID", PaymentID);
                            Param2.Add("@PaymentModeID", item.PaymentModeID);
                            Param2.Add("@Number", item.TransactionNo);
                            Param2.Add("@Date", item.PaymentDate);
                            Param2.Add("@BankID", item.BankID);
                            Param2.Add("@AccountName", item.AccountName);
                            Param2.Add("@BranchName", item.BranchName);
                            Param2.Add("@IFSCCode", item.IFSCCode);
                            Param2.Add("@PaidAmount", obj.PaymentAmount);
                            //Param2.Add("@ChargeId", item.ChargeID);
                            Param2.Add("@Status", 1);
                            Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param2.Add("@AddedOn", Environment.UserName);
                            Param2.Add("@AddedDateTime", DateTime.UtcNow);
                            Param2.Add("@AddedWindowsLoginName", Environment.MachineName);
                            Param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@Synchronized", 0);
                            Param2.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            Con.Execute(GenericSP.AddUpdatePaymentDetails, Param2, commandType: CommandType.StoredProcedure);
                        }
                    }
                    foreach (List<PaymentInfoVO> subList1 in obj.lstPaymentModeDetails)
                    {
                        foreach (var item1 in subList1)
                        {
                            if (item1.PaymentModeID == 12)
                            {
                                var Param6 = new DynamicParameters();
                                foreach (var item2 in obj.lstPatientDataDetails)
                                {
                                    Param6.Add("@PatientID", item2.RegID);
                                    Param6.Add("@PatientUnitID", item2.RegUnitID);
                                }
                                //Param.Add("@AdvanceId", obj.AdvanceID);
                                Param6.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                                //Param.Add("@CompanyID", obj.CompanyID);
                                //Param.Add("@AdvanceTypeId", obj.AdvTypeID);
                                Param6.Add("@AdvanceAgainstId", 7);

                                Param6.Add("@Balance", obj.PaymentAmount);
                                Param6.Add("@Remarks", obj.BillCancellationRemark);
                                Param6.Add("@Total", obj.PaymentAmount);
                                //Param.Add("@Refund", obj.Refund);
                                //Param.Add("@Used", obj.Used);
                                Param6.Add("@Status", 1);

                                Param6.Add("@Date", DateTime.Now, DbType.DateTime);
                                Param6.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                Param6.Add("@AddedDateTime", DateTime.UtcNow);
                                Param6.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                                Param6.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                                Param6.Add("@AddedOn", Environment.MachineName);
                                //Param.Add("@AddedWindowsLoginName", Environment.UserName);

                                Param6.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                                Param6.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                                Param6.Add("@UpdatedOn", Environment.MachineName);
                                Param6.Add("@UpdatedDateTime", DateTime.UtcNow);
                                Param6.Add("@Synchronized", false);
                                //  Param.Add("@AdvanceNO", obj.AdvanceNO);
                                Param6.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);

                                Param6.Add("@AdvanceId", 0, DbType.Int64, ParameterDirection.Output);
                                Con.Execute(GenericSP.AddOrUpdateAdvance, Param6, commandType: CommandType.StoredProcedure);
                                AdvanceId = Param6.Get<Int64>("@AdvanceId");
                                //ResultStatus = Param.Get<Int32>("@ResultStatus");

                                /*=======================================================================================================================*/

                                var Param3 = new DynamicParameters();
                                foreach (List<PaymentInfoVO> subList4 in obj.lstPaymentModeDetails)
                                {
                                    foreach (var item2 in subList4)
                                    {
                                        //Save Payment       
                                        Param3.Add("@PaymentID", item2.PaymentID);
                                        Param3.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                                        Param3.Add("@Date", DateTime.UtcNow);
                                        Param3.Add("@AdvanceID", AdvanceId);
                                        // Param1.Add("@AdvanceUnitId", GenericSP.CurrentUser.UnitID);
                                        Param3.Add("@AdvanceAmount", obj.PaymentAmount);
                                        Param3.Add("@Status", 1);
                                        Param3.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                                        Param3.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                                        Param3.Add("@AddedOn", Environment.UserName);
                                        Param3.Add("@AddedDateTime", DateTime.UtcNow);
                                        Param3.Add("@AddedWindowsLoginName", Environment.MachineName);
                                        Param3.Add("@Synchronized", 0);
                                        Param3.Add("@ReceiptNo", "");
                                        Param3.Add("@IsBillSettlement", 0);
                                        Param3.Add("@tempPaymentID1", 0, DbType.Int64, ParameterDirection.Output);
                                        Param3.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                                        Con.Execute(GenericSP.AddUpdatePayment, Param3, commandType: CommandType.StoredProcedure);
                                        PaymentIDAdvance = Param3.Get<Int64>("@tempPaymentID1");

                                        break;
                                    }
                                }

                                //Save Payment Details
                                foreach (List<PaymentInfoVO> subList5 in obj.lstPaymentModeDetails)
                                {
                                    foreach (var item6 in subList5)
                                    {
                                        var Param5 = new DynamicParameters();
                                        Param5.Add("@PaymentDetailID", item6.PaymentDetailID);
                                        Param5.Add("@PaymentID", PaymentIDAdvance);
                                        Param5.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                                        Param5.Add("@PaymentModeID", item6.PaymentModeID);
                                        Param5.Add("@Number", item6.TransactionNo);
                                        Param5.Add("@Date", item6.PaymentDate);
                                        Param5.Add("@BankID", item6.BankID);
                                        Param5.Add("@AdvanceID", AdvanceId);
                                        Param5.Add("@AdvanceAmount", item6.PaymentAmount);
                                        Param5.Add("@PaidAmount", obj.PaymentAmount);
                                        Param5.Add("@Status", 1);
                                        Param5.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                                        Param5.Add("@AddedOn", Environment.UserName);
                                        Param5.Add("@AddedDateTime", DateTime.UtcNow);
                                        Param5.Add("@AddedWindowsLoginName", Environment.MachineName);
                                        Param5.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                                        Param5.Add("@Synchronized", 0);
                                        Param5.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                                        Con.Execute(GenericSP.AddUpdatePaymentDetails, Param5, commandType: CommandType.StoredProcedure);
                                        //ResultStatus = 1;
                                    }
                                }
                            }

                        }
                    }

                    // Commit the transaction
                    transactionScope.Complete();

                    // Return 1 for success
                    resultStatus = 1;
                }
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // Handle the error (e.g., log the exception, or rethrow as needed)
                resultStatus = 0;
            }

            return resultStatus;
        }


        public List<PatientAdvanceReport> GetPatientAdvanceReport(int? UnitID, DateTime? FromDate, DateTime? ToDate)
        {
            PatientAdvanceReport obj = new PatientAdvanceReport();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", UnitID);
            paramReceiptList.Add("@FromDate", FromDate);
            paramReceiptList.Add("@ToDate", ToDate);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<PatientAdvanceReport>(GenericSP.GetPatientAdvanceReport, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }


        public List<ServiceWiseBillingReport> GetServiceWiseBillingReport(int? UnitID, DateTime? FromDate, DateTime? ToDate)
        {
            ServiceWiseBillingReport obj = new ServiceWiseBillingReport();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", UnitID);
            paramReceiptList.Add("@FromDate", FromDate);
            paramReceiptList.Add("@ToDate", ToDate);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<ServiceWiseBillingReport>(GenericSP.GetServiceWiseBillingReport, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        // Reports

        public List<DailyOutstandingReport> GetDailyOutstandingReport(int? UnitID, DateTime? FromDate, DateTime? ToDate)
        {
            DailyOutstandingReport obj = new DailyOutstandingReport();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", UnitID);
            paramReceiptList.Add("@FromDate", FromDate);
            paramReceiptList.Add("@ToDate", ToDate);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<DailyOutstandingReport>(GenericSP.GetDailyOutstandingReport, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<DiscountRegisterReport> GetDiscountRegisterReport(int? UnitID, DateTime? FromDate, DateTime? ToDate)
        {
            DiscountRegisterReport obj = new DiscountRegisterReport();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", UnitID);
            paramReceiptList.Add("@FromDate", FromDate);
            paramReceiptList.Add("@ToDate", ToDate);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<DiscountRegisterReport>(GenericSP.GetDiscountRegisterReport, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<DailyCollectionReport> GetDailyCollectionReport(int? UnitID)
        {
            DailyCollectionReport obj = new DailyCollectionReport();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", UnitID);


            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<DailyCollectionReport>(GenericSP.GetDailyCollectionReport, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<DailyRevenueReport> GetDailyRevenueReport(int? UnitID, DateTime? FromDate, DateTime? ToDate)
        {
            DailyRevenueReport obj = new DailyRevenueReport();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", UnitID);
            paramReceiptList.Add("@FromDate", FromDate);
            paramReceiptList.Add("@ToDate", ToDate);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<DailyRevenueReport>(GenericSP.GetDailyRevenueReport, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<RefundReportReciept> GetRefundReportReciept(int? UnitID, DateTime? FromDate, DateTime? ToDate)
        {
            RefundReportReciept obj = new RefundReportReciept();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", UnitID);
            paramReceiptList.Add("@FromDate", FromDate);
            paramReceiptList.Add("@ToDate", ToDate);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<RefundReportReciept>(GenericSP.GetRefundReportReciept, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }


        // Bill

        public List<PatientVisitSummaryModel> GetPatientVisitSummaryModel(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID)
        {
            PatientVisitSummaryModel obj = new PatientVisitSummaryModel();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@VisitUnitID", VisitUnitID);
            paramReceiptList.Add("@VisitID", VisitID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@Type", "Bill");

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<PatientVisitSummaryModel>(GenericSP.GetPatientHistorySummary, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        //CaseSummary

        public List<FemaleComplaintsModel> GetCaseSummaryHistory(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID)
        {
            FemaleComplaintsModel obj = new FemaleComplaintsModel();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@VisitUnitID", VisitUnitID);
            paramReceiptList.Add("@VisitID", VisitID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@Type", "CaseSummary");

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<FemaleComplaintsModel>(GenericSP.GetPatientHistorySummary, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        // Investigation

        public List<InvestigationModel> GetInvestigationHistory(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID)
        {
            InvestigationModel obj = new InvestigationModel();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@VisitUnitID", VisitUnitID);
            paramReceiptList.Add("@VisitID", VisitID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@Type", "Investigation");

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<InvestigationModel>(GenericSP.GetPatientHistorySummary, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        // Prescription

        public List<PatientPrescriptionModel> GetPatientPrescriptionHistory(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID)
        {
            PatientPrescriptionModel obj = new PatientPrescriptionModel();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@VisitUnitID", VisitUnitID);
            paramReceiptList.Add("@VisitID", VisitID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@Type", "Prescription");

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<PatientPrescriptionModel>(GenericSP.GetPatientHistorySummary, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }
        // History

        public List<Dictionary<string, string>> GetHistorySummary(long? PatientID, long? VisitUnitID, long? VisitID, long? PatientUnitID)
        {
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@VisitUnitID", VisitUnitID);
            paramReceiptList.Add("@VisitID", VisitID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@Type", "History");

            // Fetch the results from the stored procedure
            var historySummaryList = this.Con.Query<HistoryModelSummary>(GenericSP.GetPatientHistorySummary, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();

            // Prepare the list of key-value pair structures
            var resultList = new List<Dictionary<string, string>>();

            foreach (var history in historySummaryList)
            {
                // Iterate through all the properties of HistoryModelSummary
                foreach (var property in typeof(HistoryModelSummary).GetProperties())
                {
                    var propertyName = FormatPropertyName(property.Name); // Format the property name to include spaces
                    var propertyValue = property.GetValue(history)?.ToString() ?? "N/A"; // Handle null values

                    // Create a dictionary for each key-value pair
                    var result = new Dictionary<string, string>
            {
                { "Key", propertyName },
                { "Value", propertyValue }
            };

                    // Add this result to the resultList
                    resultList.Add(result);
                }
            }

            return resultList;
        }

        // Helper method to format the property name to include spaces
        private string FormatPropertyName(string propertyName)
        {
            // Convert camelCase to normal word format by adding space before uppercase letters
            var formattedName = Regex.Replace(propertyName, @"([a-z0-9])([A-Z])", "$1 $2"); // Add space before uppercase letters

            // Handle specific abbreviations after adding spaces
            var abbreviations = new Dictionary<string, string>
    {
        { "P T", "PT" },
        { "S P W P", "SPWP" },
        { "P W C P", "PWCP" },
        { "S P W P P", "SPWPP" },
        { "S T D", "STD" },
        { "L M P", "LMP" },
        { "I D", "ID" },
        { "ID", " " },
                {"LMPDate","LMP Date" },
                {"SPWPPRemark","SPWPP Remark" },
                {"PWCPYears","PWCP Years" },
                {"PWCPMonths","PWCP Months" }
    };

            // Replace abbreviations after adding spaces
            foreach (var abbreviation in abbreviations)
            {
                formattedName = formattedName.Replace(abbreviation.Key, abbreviation.Value);
            }

            // Remove extra spaces if any
            formattedName = Regex.Replace(formattedName, @"\s+", " ").Trim();

            return formattedName;
        }
        public UnitDetailsModel GetUnitDetails()
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);

            return this.Con.Query<UnitDetailsModel>(GenericSP.GetUnitDetails, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }

        public List<AdvanceReceipts> GetAdvanceReciept(long? PatientID, long? PatientUnitID, long? AdvanceID)
        {
            AdvanceReceipts obj = new AdvanceReceipts();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@AdvanceID", AdvanceID);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<AdvanceReceipts>(GenericSP.GetAdvanceReciept, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<RefundReceipts> GetAdvanceRefundReciept(long? PatientID, long? PatientUnitID, long? RefundID)
        {
            RefundReceipts obj = new RefundReceipts();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@RefundID", RefundID);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<RefundReceipts>(GenericSP.GetAdvanceRefundReciept, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<ServiceCancellationReceipts> GetServiceCencellationReciept(long? PatientID, long? PatientUnitID, long? RefundID)
        {
            ServiceCancellationReceipts obj = new ServiceCancellationReceipts();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@RefundID", RefundID);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<ServiceCancellationReceipts>(GenericSP.GetServiceCencellationReciept, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<UnitOfMeasure> GetUnitOfMeasure(long? ItemID)
        {
            UnitOfMeasure obj = new UnitOfMeasure();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@ItemID", ItemID);
            return this.Con.Query<UnitOfMeasure>(GenericSP.GetUnitOfMeasure, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<ItemMasterModel> GetItemListForPharmacy(long? StoreID, string Search = null)
        {
            ItemMasterModel obj = new ItemMasterModel();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@StoreID", StoreID);
            paramReceiptList.Add("@Search", Search);
            return this.Con.Query<ItemMasterModel>(GenericSP.GetItemListForPharmacy, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<ItemBatchDetails> GetBatchCodeForPharmacy(long ItemID)
        {
            ItemBatchDetails obj = new ItemBatchDetails();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@ItemID", ItemID);

            return this.Con.Query<ItemBatchDetails>(GenericSP.GetBatchCodeForPharmacy, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<StoreMaster> GetStoreMasterList()
        {

            List<StoreMaster> List = new List<StoreMaster>();
            var Param = new DynamicParameters();
            Param.Add("@ClinicID", GenericSP.CurrentUser.UnitID);
            // obj = this.con.Query<clsMaterialConsumptionItemDetailsVO>(GenericSP.GetMaterialConsumptionItemList, Param, commandType: CommandType.StoredProcedure).AsList();
            List = this.Con.Query<StoreMaster>(GenericSP.GetStoreMasterList, Param, commandType: CommandType.StoredProcedure).ToList();

            return List;
        }

        public List<PrescribedItemList> GetPrescribedItemListForPharmacy(long PatientID)
        {
            PrescribedItemList obj = new PrescribedItemList();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);

            return this.Con.Query<PrescribedItemList>(GenericSP.GetPrescribedItemListForPharmacy, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<BilledPatientForPharmacy> GetBilledPatientListForPharmacy(DateTime? FromDate, DateTime? ToDate, string FirstName = null, string LastName = null, string MRNo = null, string BillNo = null)
        {
            BilledPatientForPharmacy obj = new BilledPatientForPharmacy();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@FromDate", FromDate);
            paramReceiptList.Add("@ToDate", ToDate);
            paramReceiptList.Add("@FirstName", FirstName);
            paramReceiptList.Add("@LastName", LastName);
            paramReceiptList.Add("@MRNo", MRNo);
            paramReceiptList.Add("@BillNo", BillNo);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<BilledPatientForPharmacy>(GenericSP.GetBilledPatientListForPharmacy, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<BilledPatientItemListForPharmacy> GetBilledPatientItemListForPharmacy(long BillID)
        {
            BilledPatientItemListForPharmacy obj = new BilledPatientItemListForPharmacy();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@BillID", BillID);


            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<BilledPatientItemListForPharmacy>(GenericSP.GetBilledPatientItemListForPharmacy, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<ConcessionReasonForPharmacy> GetConcessionReason()
        {
            ConcessionReasonForPharmacy obj = new ConcessionReasonForPharmacy();

            return this.Con.Query<ConcessionReasonForPharmacy>(GenericSP.GetConcessionReason, commandType: CommandType.StoredProcedure).ToList();
        }

        /********************************************************************************************************************************/
        //   Save For Pharmacy
        //   Save For Pharmacy
        public int AddOrUpdateNewPatientForPharmacy(RegistraionForPharmacy obj)
        {
            int resultStatus = 0;
            long PatientID = 0;
            long VisitID = 0;
            long ItemSaleID = 0;
            //long ItemSaleDetailsID = 0;
            long PaymentID = 0;
            long tempBillID = 0;
            long tempBillUnitID = 0;
            var param = new DynamicParameters();

            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    if (obj.PatientID == 0)
                    {


                        //  param.Add("@ExistingID", obj.PatientID);
                        param.Add("@PatientID", obj.PatientID);
                        param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        param.Add("@MRNo", obj.MRNo);
                        param.Add("@FirstName", obj.FirstName);
                        param.Add("@LastName", obj.LastName);
                        param.Add("@Age", obj.Age);
                        param.Add("@DateOfBirth", obj.DateOfBirth);
                        param.Add("@ContactNo1", obj.ContactNo1);
                        param.Add("@GenderID", obj.GenderID);
                        param.Add("@RegistrationDate", DateTime.Now, DbType.DateTime);
                        param.Add("@Synchronized", obj.Synchronized);
                        param.Add("@RegType", obj.RegType);
                        param.Add("@ResultStatus", direction: ParameterDirection.Output);
                        param.Add("@PatientID", 0, DbType.Int64, ParameterDirection.Output);
                        // Execute the stored procedure
                        Con.Execute(GenericSP.AddOrUpdateNewPatientForPharmacy, param, commandType: CommandType.StoredProcedure);

                        // Retrieve the result status
                        resultStatus = param.Get<int>("@ResultStatus");
                        PatientID = param.Get<Int64>("@PatientID");

                        // Commit the transaction

                    }

                    else
                    {
                        //var Param1 = new DynamicParameters();
                        //foreach (VisitForPharmacy subList in obj.VisitModelForPharmacy)
                        //{

                        //    Param1.Add("@VisitID", subList.VisitID);
                        //    Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        //    Param1.Add("@Date", DateTime.Now, DbType.DateTime);
                        //    //Param1.Add("@SpouseID", subList.SpouseID);

                        //    Param1.Add("@PatientID", subList.PatientID);
                        //    Param1.Add("@PatientUnitID", subList.PatientUnitID);
                        //    Param1.Add("@OPDNO", subList.OPDNO ?? (object)DBNull.Value, DbType.String, size: 50);
                        //    Param1.Add("@VisitTypeID", subList.VisitTypeID);

                        //    Param1.Add("@DoctorID", subList.DoctorID);
                        //    Param1.Add("@Status", 1);
                        //    Param1.Add("@CreatedUnitID", subList.CreatedUnitID);

                        //    Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        //    Param1.Add("@AddedOn", string.IsNullOrEmpty(Environment.MachineName) ? (object)DBNull.Value : Environment.MachineName, DbType.String, size: 255);
                        //    Param1.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);

                        //    Param1.Add("@Synchronized", 1);

                        //    Param1.Add("@VisitID", 0, DbType.Int64, ParameterDirection.Output);
                        //    Param1.Add("@ResultStatus", direction: ParameterDirection.Output);


                        //    Con.Execute(GenericSP.AddOrUpdateVisitForPharmacy, Param1, commandType: CommandType.StoredProcedure);
                        //    VisitID = Param1.Get<Int64>("@VisitID");

                        //    //resultStatus = Param1.Get<int>("@ResultStatus");
                        //    break;
                        //}

                        var Param2 = new DynamicParameters();
                        foreach (BillVO subList in obj.BillModelForPharmacy)
                        {
                            Param2.Add("@Action", "InsertBill");
                            Param2.Add("@BillID", subList.BillID);
                            Param2.Add("@BillUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@Date", DateTime.UtcNow);

                            Param2.Add("@BillType", 2);


                            Param2.Add("@VisitID", obj.VisitID);
                            Param2.Add("@VisitUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@PatientID", obj.PatientID);
                            Param2.Add("@PatientUnitID", obj.PatientUnitID);


                            //Param.Add("@PatientCategoryID", GenericSP.SelectedPatient.PatientCategoryID);
                            Param2.Add("@TotalBillAmount", subList.TotalBillAmount);

                            Param2.Add("@NetBillAmount", subList.NetBillAmount);
                            Param2.Add("@TotalConcessionAmount", subList.TotalConcessionAmount);
                            Param2.Add("@BalanceAmountSelf", subList.BalanceAmountSelf);


                            Param2.Add("@IsFreezed", 1);

                            Param2.Add("@Synchronized", 0);
                            Param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param2.Add("@AddedOn", Environment.MachineName);
                            Param2.Add("@AddedDateTime", DateTime.UtcNow);
                            Param2.Add("@AddedWindowsLoginName", Environment.UserName);
                            //Param.Add("@Synchronized", 0);//commented this as added duplicate
                            Param2.Add("@ResultStatus", dbType: DbType.Int64, direction: ParameterDirection.Output);
                            Param2.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                            Param2.Add("@tempUnitID", 0, DbType.Int64, ParameterDirection.Output);
                            Con.Execute(GenericSP.AddUpdateBill, Param2, commandType: CommandType.StoredProcedure);
                            // return Param.Get<int>("@ResultStatus");
                            //int status = Param.Get<int>("@ResultStatus");

                            tempBillID = Param2.Get<Int64>("@ID"); ;
                            tempBillUnitID = Param2.Get<Int64>("tempUnitID"); ;
                            // }
                        }

                        for (int Index = 0; Index < obj.Payment.Count; Index++)
                        {
                            var Param3 = new DynamicParameters();
                            // Param3.Add("@Action", "InsertPayment");
                            Param3.Add("@PaymentID", obj.Payment[Index].PaymentID);
                            Param3.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                            Param3.Add("@Date", DateTime.UtcNow);
                            Param3.Add("@BillID", tempBillID);
                            Param3.Add("@BillAmount", obj.Payment[Index].BillAmount);
                            Param3.Add("@BillBalanceAmount", obj.Payment[Index].BillBalanceAmount);
                            Param3.Add("@Status", 1);
                            Param3.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param3.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param3.Add("@AddedOn", Environment.MachineName);
                            Param3.Add("@AddedDateTime", DateTime.UtcNow);
                            Param3.Add("@AddedWindowsLoginName", Environment.UserName);
                            Param3.Add("@Synchronized", 0);
                            Param3.Add("@ReceiptNo", "");
                            Param3.Add("@IsBillSettlement", 0);

                            Param3.Add("@tempPaymentID1", 0, DbType.Int64, ParameterDirection.Output);
                            Param3.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            Con.Execute(GenericSP.AddUpdatePayment, Param3, commandType: CommandType.StoredProcedure);
                            PaymentID = Param3.Get<Int64>("@tempPaymentID1");
                            obj.Payment[Index].tempPaymentID1 = PaymentID;
                            /********************************************************************************************/
                            //Added by AniketK on 08Oct2020 to avoid duplicate entry in payment table.
                            if (Index == 0)
                            {
                                break;
                            }
                            /********************************************************************************************/
                        }
                        for (int Index = 0; Index < obj.OtherSrvPaymentModeList.Count; Index++)
                        {
                            var Param4 = new DynamicParameters();
                            // Param4.Add("@Action", "InsertPaymentDetails");

                            //Begin :: Added by Aniket on 06Oct2020
                            //Param4.Add("@AdvanceID", obj.OtherSrvPaymentModeList[Index].AdvanceID);
                            //Param4.Add("@AdvanceUnitID", obj.OtherSrvPaymentModeList[Index].AdvanceUnitID);
                            //End :: Added by Aniket on 06Oct2020

                            Param4.Add("@PaymentDetailID", obj.OtherSrvPaymentModeList[Index].PaymentDetailID);
                            Param4.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                            //Param4.Add("@PaymentID", obj.Payment[Index].tempPaymentID1); //Commented and Modified by AniketK on 08Oct2020
                            Param4.Add("@PaymentID", PaymentID);
                            Param4.Add("@PaymentModeID", obj.OtherSrvPaymentModeList[Index].PaymentModeID);
                            Param4.Add("@Number", obj.OtherSrvPaymentModeList[Index].Number);
                            Param4.Add("@Date", obj.OtherSrvPaymentModeList[Index].Date);
                            Param4.Add("@BankID", obj.OtherSrvPaymentModeList[Index].BankID);
                            Param4.Add("@PaidAmount", obj.OtherSrvPaymentModeList[Index].PaidAmount);
                            Param4.Add("@Status", 1);
                            Param4.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param4.Add("@AddedOn", Environment.MachineName);
                            Param4.Add("@AddedDateTime", DateTime.UtcNow);
                            Param4.Add("@AddedWindowsLoginName", Environment.UserName);
                            //Param4.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                            //Param4.Add("@UpdatedOn", Environment.MachineName);
                            //Param4.Add("@UpdatedDateTime", DateTime.UtcNow);
                            //Param4.Add("@UpdatedWindowsLoginName", Environment.MachineName);
                            Param4.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            // Param4.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param4.Add("@Synchronized", 0);
                            Param4.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            Con.Execute(GenericSP.AddUpdatePaymentDetails, Param4, commandType: CommandType.StoredProcedure);
                            // return Param1.Get<int>("@ResultStatus");  
                        }

                        var Param5 = new DynamicParameters();
                        foreach (ItemSale subList in obj.ItemSaleModelForPharmacy)
                        {
                            Param5.Add("@ItemSaleID", subList.ItemSaleID);
                            Param5.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                            Param5.Add("@Date", DateTime.Now, DbType.DateTime);
                            Param5.Add("@Time", DateTime.Now, DbType.DateTime);

                            Param5.Add("@PatientID", obj.PatientID);
                            Param5.Add("@PatientUnitID", obj.PatientUnitID);
                            Param5.Add("@VisitID", obj.VisitID);
                            //Param5.Add("@ItemSaleNo", subList.ItemSaleNo);

                            //Param5.Add("@Remarks", subList.Remarks);
                            Param5.Add("@ConcessionPercentage", subList.ConcessionPercentage);
                            Param5.Add("@ConcessionAmount", subList.ConcessionAmount);


                            Param5.Add("@TotalAmount", subList.TotalAmount);
                            Param5.Add("@NetAmount", subList.NetAmount);
                            // Param5.Add("@Status", subList.Status);

                            Param5.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);

                            Param5.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            //Param5.Add("@AddedOn", Environment.MachineName);
                            Param5.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);

                            // Param5.Add("@AddedWindowsLoginName", Environment.UserName);

                            Param5.Add("@StoreID", subList.StoreID);
                            Param5.Add("@BillID", tempBillID);
                            Param5.Add("@SGSTAmount", subList.SGSTAmount);

                            Param5.Add("@CGSTAmount", subList.CGSTAmount);
                            Param5.Add("@IGSTAmount", subList.IGSTAmount);
                            // Param5.Add("@IsBilled", subList.IsBilled);
                            // Param5.Add("@Synchronized", obj.Synchronized);

                            // Param5.Add("@IsPrescribedDrug", subList.IsPrescribedDrug);
                            //  Param5.Add("@ReasonForVariance", subList.ReasonForVariance);
                            //  Param5.Add("@ReferenceDoctorID", subList.ReferenceDoctorID);
                            //Param5.Add("@ReferenceDoctor", subList.ReferenceDoctor);


                            Param5.Add("@ItemSaleID", 0, DbType.Int64, ParameterDirection.Output);
                            Param5.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

                            // Execute the stored procedure
                            Con.Execute(GenericSP.AddOrUpdateItemSale, Param5, commandType: CommandType.StoredProcedure);

                            // Retrieve the result status
                            //resultStatus = Param1.Get<int>("@ResultStatus");
                            ItemSaleID = Param5.Get<Int64>("@ItemSaleID");
                            break;
                        }

                        var Param6 = new DynamicParameters();
                        foreach (ItemSaleDetails subList in obj.ItemSaleDetailsModelForPharmacy)
                        {
                            Param6.Add("@ID", subList.ID);
                            Param6.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                            Param6.Add("@ItemSaleId", ItemSaleID);
                            Param6.Add("@ItemId", subList.ItemId);

                            Param6.Add("@BatchId", subList.BatchId);
                            Param6.Add("@Quantity", subList.Quantity);
                            Param6.Add("@PendingQuantity", subList.PendingQuantity);
                            Param6.Add("@MRP", subList.MRP);

                            Param6.Add("@ConcessionPercentage", subList.ConcessionPercentage);
                            Param6.Add("@ConcessionAmount", subList.ConcessionAmount);

                            Param6.Add("@TotalAmount", subList.TotalAmount);
                            Param6.Add("@NetAmount", subList.NetAmount);
                            Param6.Add("@Status", subList.Status);
                            Param6.Add("@CreatedUnitID", GenericSP.CurrentUser.UserID);

                            Param6.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param6.Add("@AddedOn", Environment.MachineName);
                            Param6.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                            Param6.Add("@AddedWindowsLoginName", Environment.MachineName);

                            Param6.Add("@Synchronized", subList.Synchronized);
                            Param6.Add("@PrescriptionDetailsID", subList.PrescriptionDetailsID);
                            Param6.Add("@PrescriptionDetailsUnitID", subList.PrescriptionDetailsUnitID);

                            Param6.Add("@BaseQuantity", subList.BaseQuantity);
                            Param6.Add("@BaseCF", 1);
                            Param6.Add("@TransactionUOMID", subList.TransactionUOMID);
                            Param6.Add("@BaseUMID", subList.BaseUMID);

                            Param6.Add("@StockUOMID", subList.StockUOMID);
                            Param6.Add("@StockCF", subList.StockCF);
                            Param6.Add("@StockingQuantity", subList.StockingQuantity);
                            Param6.Add("@ActualNetAmt", subList.ActualNetAmt);

                            Param6.Add("@NetAmtCalculation", 0);
                            Param6.Add("@IsItemConsumption", 0);
                            Param6.Add("@ISForMaterialConsumption", 0);
                            Param6.Add("@MaterialCStoreID", subList.MaterialCStoreID);

                            Param6.Add("@SGSTPercentage", subList.SGSTPercentage);
                            Param6.Add("@SGSTAmount", subList.SGSTAmount);
                            Param6.Add("@CGSTPercentage", subList.CGSTPercentage);
                            Param6.Add("@CGSTAmount", subList.CGSTAmount);

                            Param6.Add("@IGSTPercentage", subList.IGSTPercentage);
                            Param6.Add("@IGSTAmount", subList.IGSTAmount);
                            Param6.Add("@ConcessionReasonID", subList.ConcessionReasonID);

                            Param6.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                            Param6.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

                            // Execute the stored procedure
                            Con.Execute(GenericSP.AddOrUpdateItemSaleDetails, Param6, commandType: CommandType.StoredProcedure);
                            //   ItemSaleDetailsID = Param6.Get<Int64>("@ID");
                            break;
                        }

                        var Param7 = new DynamicParameters();
                        foreach (ItemStockForPharmacy subList in obj.ItemStockModelForPharmacy)
                        {
                            //Param7.Add("@ItemStockID", subList.ItemStockID);
                            Param7.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                            Param7.Add("@Date", DateTime.Now, DbType.DateTime);
                            Param7.Add("@Time", DateTime.Now, DbType.DateTime);
                            Param7.Add("@StoreID", subList.StoreID);
                            Param7.Add("@DepartmentID", subList.DepartmentID);
                            Param7.Add("@ItemID", subList.ItemID);
                            Param7.Add("@BatchID", subList.BatchID);
                            Param7.Add("@TransactionID", ItemSaleID);
                            Param7.Add("@PreviousBalance", subList.PreviousBalance);
                            Param7.Add("@TransactionType", "Pharmacy");
                            Param7.Add("@TransactionQuantity", subList.TransactionQuantity);
                            Param7.Add("@StockInHand", subList.StockInHand);
                            Param7.Add("@BlockedStock", subList.BlockedStock);
                            Param7.Add("@AvailableStock", subList.AvailableStock);
                            Param7.Add("@StockingQuantity", subList.StockingQuantity);
                            Param7.Add("@BaseUOMID", subList.BaseUOMID);
                            Param7.Add("@StockUOMID", subList.StockUOMID);
                            Param7.Add("@TransactionUOMID", subList.TransactionUOMID);
                            Param7.Add("@InputTransactionQuantity", subList.InputTransactionQuantity);
                            Param7.Add("@Remarks", subList.Remarks);
                            Param7.Add("@CreatedUnitID", subList.CreatedUnitID);
                            Param7.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param7.Add("@AddedOn", Environment.MachineName);
                            Param7.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                            Param7.Add("@Synchronized", subList.Synchronized);
                            Param7.Add("@IsFree", subList.IsFree);

                            Param7.Add("@ItemStockID", 0, DbType.Int64, ParameterDirection.Output);

                            Param7.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

                            // Execute the stored procedure
                            Con.Execute(GenericSP.AddItemStockForPharmacy, Param7, commandType: CommandType.StoredProcedure);
                        }

                    }
                    transactionScope.Complete();
                }
            }

            catch (Exception ex)
            {
                // Log the exception (optional)
                // Handle the error (e.g., log the exception, or rethrow as needed)
                resultStatus = 0;
            }

            return resultStatus;
        }

        public List<DailyCollectionRpt> GetDailyCollectionRpt(long UnitID, DateTime? FromDate, DateTime? ToDate)
        {
            DailyCollectionRpt obj = new DailyCollectionRpt();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", UnitID);
            paramReceiptList.Add("@FromDate", FromDate);
            paramReceiptList.Add("@ToDate", ToDate);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<DailyCollectionRpt>(GenericSP.GetDailyCollectionRpt, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public UnitDetailsModel GetUnitDetailsByUnitID(long UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", UnitID);

            return this.Con.Query<UnitDetailsModel>(GenericSP.GetUnitDetails, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }
        public List<UnitListByUserID> GetUnitListByUserID(long UserID)
        {
            UnitListByUserID obj = new UnitListByUserID();
            var Param = new DynamicParameters();
            Param.Add("@UserID", UserID);

            return this.Con.Query<UnitListByUserID>(GenericSP.GetUnitListByUserID, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<InvestigationServiceDetail> GetServiceDetailForBill(long PatientID, long PatientUnitID)
        {
            InvestigationServiceDetail obj = new InvestigationServiceDetail();
            var paramReceiptList = new DynamicParameters();
            paramReceiptList.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<InvestigationServiceDetail>(GenericSP.GetServiceDetailForBill, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }
    }
}