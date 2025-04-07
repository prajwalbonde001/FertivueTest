using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.Billing;
using PIVF.Entities.Models.Billing;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace PIVF.DataAccessLayer.Billing
{
    public class PatientAdvanceRefundDAL : IPatientAdvanceRefundBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public PatientAdvanceRefundDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        /**********************************************************************************************************/
        public int savePatientAdvanceRefund(PatientAdvanceRefundVO obj)
        {
            int ResultStatus = 0;
            long PaymentID = 0;
            long RefundID = 0;
            var Param = new DynamicParameters();

            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    /*=======================================================================================================================*/
                    //Save Refund
                    foreach (var item in obj.lstPatientDataDetails)
                    {
                        Param.Add("@PatientID", item.RegID);
                        Param.Add("@PatientUnitID", item.RegUnitID);
                    }
                    foreach (var item in obj.lstPatientAdvanceDetails)
                    {
                        Param.Add("@AdvanceID", item.AdvanceID);
                       // Param.Add("@AdvanceUnitID", item.AdvanceUnitID);
                    }
                    Param.Add("@RefundID", obj.RefundID);
                    Param.Add("@UnitId", GenericSP.CurrentUser.UnitID);
                    Param.Add("@Amount", obj.RefundAmount);                    
                    Param.Add("@Remarks", obj.Remarks);                   
                    Param.Add("@Date", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    //Param.Add("@AddedUTCDateTime", DateTime.UtcNow);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);

                    Param.Add("@RefundID", 0, DbType.Int64, ParameterDirection.Output);
                    con.Execute(GenericSP.AddOrUpdateRefund, Param, commandType: CommandType.StoredProcedure);
                    RefundID = Param.Get<Int64>("@RefundID");                   

                    /*=======================================================================================================================*/

                    var Param1 = new DynamicParameters();
                    foreach (List<PaymentInfoVO> subList in obj.lstPaymentModeDetails)
                    {
                        foreach (var item in subList)
                        {
                            //Save Payment
                            Param1.Add("@PaymentID", item.PaymentID);
                            Param1.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@Date", DateTime.UtcNow);
                            Param1.Add("@RefundID", RefundID);
                            //Param1.Add("@RefundUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@RefundAmount", item.RefundAmount);
                            Param1.Add("@Status", 1);
                            Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param1.Add("@AddedOn", Environment.UserName);
                            Param1.Add("@AddedDateTime", DateTime.UtcNow);
                            Param1.Add("@AddedWindowsLoginName", Environment.MachineName);
                            Param1.Add("@Synchronized", 0);
                            Param1.Add("@ReceiptNo", "");
                            Param1.Add("@IsBillSettlement", 0);
                            Param1.Add("@tempPaymentID1", 0, DbType.Int64, ParameterDirection.Output);
                            Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            con.Execute(GenericSP.AddUpdatePayment, Param1, commandType: CommandType.StoredProcedure);
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
                            Param2.Add("@PaidAmount", item.PaymentAmount);
                            Param2.Add("@Status", 1);
                            Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param2.Add("@AddedOn", Environment.UserName);
                            Param2.Add("@AddedDateTime", DateTime.UtcNow);
                            Param2.Add("@AddedWindowsLoginName", Environment.MachineName);
                            Param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@Synchronized", 0);
                            Param2.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            con.Execute(GenericSP.AddUpdatePaymentDetails, Param2, commandType: CommandType.StoredProcedure);
                            ResultStatus = 1;
                        }
                    }
                    /*=======================================================================================================================*/

                    
                    transactionScope.Complete();
                }
            }
            catch (Exception ex)
            {
                ResultStatus = 0;
            }
            return ResultStatus;
        }
        /**********************************************************************************************************/
        public List<PatientAdvanceRefundVO> FillRefundList(int PatientID, int PatientUnitID)
        {
            List<PatientAdvanceRefundVO> _List = new List<PatientAdvanceRefundVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID);
                Param.Add("@PatientUnitID", PatientUnitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);
                _List = this.con.Query<PatientAdvanceRefundVO>(GenericSP.GetRefundList, Param, commandType: CommandType.StoredProcedure).ToList();

                if (_List.Count > 0)
                    _List[0].TotalRows = Param.Get<Int32>("@TotalRows");
            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }
        /*********************************************************************************************************New DAL logic by Chetan Pawar*/


        public List<RefundList> GetPatientRefundList(string[] RefundLists, int index, bool PgEn, out int totalCount)
        {
            var Param = new DynamicParameters();

            Param.Add("@PageIndex", index);
            Param.Add("@PagingEnabled", PgEn);
            Param.Add("@FromDate", RefundLists[0]);
            Param.Add("@ToDate", RefundLists[1]);
            Param.Add("@PatientID", RefundLists[2]);
            Param.Add("@PatientUnitID", RefundLists[3]);
            Param.Add("@FirstName", RefundLists[4]);
            Param.Add("@LastName", RefundLists[5]);
            Param.Add("@MRNO", RefundLists[6]);
            Param.Add("@ReceiptNo", RefundLists[7]);
            Param.Add("@Type", RefundLists[8]);
            // Query to get the patient advance list
            List<RefundList> lstRefundList = this.con.Query<RefundList>(GenericSP.GetPatientRefundList, Param, commandType: CommandType.StoredProcedure).AsList();

            // Count the total records manually using a for loop
            totalCount = 0;
            for (int i = 0; i < lstRefundList.Count; i++)
            {
                totalCount++;
            }

            return lstRefundList;
        }

        public List<BillVO> GetPatientDetails(int PatID, int PatUnitID)
        {
            BillVO obj = new BillVO();
            var paramPatDetails = new DynamicParameters();
            paramPatDetails.Add("@PatientID", PatID);
            paramPatDetails.Add("@PatientUnitID", PatUnitID);
            paramPatDetails.Add("@Type", "Advance");
            var QueryMultiple = this.con.QueryMultiple(GenericSP.GetPatientDetails, paramPatDetails, commandType: CommandType.StoredProcedure);
            var objList = QueryMultiple.Read<BillVO>().ToList();
            return objList;
        }

        public List<BillVO> GetPatientDetailsForBillCancellation(long BillID)
        {
            BillVO obj = new BillVO();
            var paramPatDetails = new DynamicParameters();
            paramPatDetails.Add("@BillID", BillID);
            var QueryMultiple = this.con.QueryMultiple(GenericSP.GetPatientDetailsForBillCancellation, paramPatDetails, commandType: CommandType.StoredProcedure);
            var objList = QueryMultiple.Read<BillVO>().ToList();
            return objList;
        }
        public List<BillVO> GetPatientDetailsForBillRefund(int PatID, int PatUnitID)
        {
            BillVO obj = new BillVO();
            var paramPatDetails = new DynamicParameters();
            paramPatDetails.Add("@PatientID", PatID);
            paramPatDetails.Add("@PatientUnitID", PatUnitID);
            paramPatDetails.Add("@Type", "Bill");
            var QueryMultiple = this.con.QueryMultiple(GenericSP.GetPatientDetails, paramPatDetails, commandType: CommandType.StoredProcedure);
            var objList = QueryMultiple.Read<BillVO>().ToList();
            return objList;
        }

        // Add Or Update Refund For == "Bill" (Refund Against Bill) 

        /**********************************************************************************************************/
        public int AddOrUpdateRefundForBill(PatientBillRefundVO obj)
        {
            int ResultStatus = 0;
            long PaymentID = 0;
            long PaymentIDAdvance = 0;
            long RefundID = 0;
            long AdvanceID = 0;
            var Param = new DynamicParameters();
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    /*=======================================================================================================================*/
                    //Save Refund
                    foreach (var item in obj.lstPatientDataDetails)
                    {
                        Param.Add("@PatientID", item.RegID);
                        Param.Add("@PatientUnitID", item.RegUnitID);
                    }
                    foreach (var item in obj.lstPatientBillDetails)
                    {
                        Param.Add("@BillId", item.BillID);
                        //Param.Add("@UnitID", item.UnitID);
                    }
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@RefundID", obj.RefundID);
                    //Param.Add("@RefundUnitId", GenericSP.CurrentUser.UnitID);
                    Param.Add("@Amount", obj.RefundAmount);
                    Param.Add("@Remarks", obj.Remarks);
                    Param.Add("@Date", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    //Param.Add("@AddedUTCDateTime", DateTime.UtcNow);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);

                    Param.Add("@RefundID", 0, DbType.Int64, ParameterDirection.Output);
                    con.Execute(GenericSP.AddOrUpdateRefundForBill, Param, commandType: CommandType.StoredProcedure);
                    RefundID = Param.Get<Int64>("@RefundID");

                    /*=======================================================================================================================*/

                    var Param1 = new DynamicParameters();
                    foreach (List<PaymentInfoVO> subList in obj.lstPaymentModeDetails)
                    {
                        foreach (var item in subList)
                        {
                            //Save Payment               
                            Param1.Add("@PaymentID", item.PaymentID);
                            Param1.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@Date", DateTime.UtcNow);
                            Param1.Add("@RefundID", RefundID);
                           // Param1.Add("@RefundUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@RefundAmount", obj.RefundAmount);
                            
                            Param1.Add("@Status", 1);
                            Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param1.Add("@AddedOn", Environment.UserName);
                            
                            Param1.Add("@AddedDateTime", DateTime.UtcNow);
                            Param1.Add("@AddedWindowsLoginName", Environment.MachineName);
                            Param1.Add("@Synchronized", 0);
                            Param1.Add("@ReceiptNo", "");
                            Param1.Add("@IsBillSettlement", 0);
                            Param1.Add("@tempPaymentID1", 0, DbType.Int64, ParameterDirection.Output);
                            Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            con.Execute(GenericSP.AddUpdatePayment, Param1, commandType: CommandType.StoredProcedure);
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
                            Param2.Add("@PaidAmount", item.PaymentAmount);
                            Param2.Add("@ChargeId", item.ChargeID);
                            Param2.Add("@RefundID1", RefundID);
                            Param2.Add("@RefundAmountCharge", item.RefundAmount);
                            //Param2.Add("@ChargeId", item.ChargeID);
                            Param2.Add("@Status", 1);
                            Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param2.Add("@AddedOn", Environment.UserName);
                            Param2.Add("@AddedDateTime", DateTime.UtcNow);
                            Param2.Add("@AddedWindowsLoginName", Environment.MachineName);
                            Param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@Synchronized", 0);
                            Param2.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            con.Execute(GenericSP.AddUpdatePaymentDetails, Param2, commandType: CommandType.StoredProcedure);
                            ResultStatus = 1;
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

                                Param6.Add("@Balance", obj.RefundAmount);
                                Param6.Add("@Remarks", obj.Remarks);
                                Param6.Add("@Total", obj.RefundAmount);
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
                                con.Execute(GenericSP.AddOrUpdateAdvance, Param6, commandType: CommandType.StoredProcedure);
                                AdvanceID = Param6.Get<Int64>("@AdvanceId");
                                //ResultStatus = Param.Get<Int32>("@ResultStatus");

                                /*=======================================================================================================================*/

                                var Param3 = new DynamicParameters();
                                foreach (List<PaymentInfoVO> subList4 in obj.lstPaymentModeDetails)
                                {
                                    foreach (var item in subList4)
                                    {
                                        //Save Payment       
                                        Param3.Add("@PaymentID", item.PaymentID);
                                        Param3.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                                        Param3.Add("@Date", DateTime.UtcNow);
                                        Param3.Add("@AdvanceID", AdvanceID);
                                        // Param1.Add("@AdvanceUnitId", GenericSP.CurrentUser.UnitID);
                                        Param3.Add("@AdvanceAmount", item.PaymentAmount);
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
                                        con.Execute(GenericSP.AddUpdatePayment, Param3, commandType: CommandType.StoredProcedure);
                                        PaymentIDAdvance = Param3.Get<Int64>("@tempPaymentID1");

                                        break;
                                    }
                                }

                                //Save Payment Details
                                foreach (List<PaymentInfoVO> subList5 in obj.lstPaymentModeDetails)
                                {
                                    foreach (var item in subList5)
                                    {
                                        var Param2 = new DynamicParameters();
                                        Param2.Add("@PaymentDetailID", item.PaymentDetailID);
                                        Param2.Add("@PaymentID", PaymentIDAdvance);
                                        Param2.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                                        Param2.Add("@PaymentModeID", item.PaymentModeID);
                                        Param2.Add("@Number", item.TransactionNo);
                                        Param2.Add("@Date", item.PaymentDate);
                                        Param2.Add("@BankID", item.BankID);
                                        Param2.Add("@PaidAmount", item.PaymentAmount);
                                        Param2.Add("@AdvanceID", AdvanceID);
                                        // Param1.Add("@AdvanceUnitId", GenericSP.CurrentUser.UnitID);
                                        Param2.Add("@AdvanceAmount", item.PaymentAmount);
                                        Param2.Add("@Status", 1);
                                        Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                                        Param2.Add("@AddedOn", Environment.UserName);
                                        Param2.Add("@AddedDateTime", DateTime.UtcNow);
                                        Param2.Add("@AddedWindowsLoginName", Environment.MachineName);
                                        Param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                                        Param2.Add("@Synchronized", 0);
                                        Param2.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                                        con.Execute(GenericSP.AddUpdatePaymentDetails, Param2, commandType: CommandType.StoredProcedure);
                                        ResultStatus = 1;
                                    }
                                }
                            }
                        }
                    }
                            /*=======================================================================================================================*/


                            transactionScope.Complete();
                }
            }
            catch (Exception ex)
            {
                ResultStatus = 0;
            }
            return ResultStatus;
        }

        public List<BillDetails> GetBillAndServiceLIst(int? PatientID, int? PatientUnitID, int? BillID, int? BillUnitID)
        {
            List<BillDetails> _List = new List<BillDetails>();
            try
            {


                if (BillID > 0)
                {
                    var Param = new DynamicParameters();

                    Param.Add("@BillID", BillID);
                    Param.Add("@BillUnitID", BillUnitID);
                    //Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);

                    _List = this.con.Query<BillDetails>(GenericSP.GetBillListForService, Param, commandType: CommandType.StoredProcedure).ToList();

                    if (_List.Count > 0)
                        _List[0].TotalRows = Param.Get<Int32>("@TotalRows");

                }
                else
                {
                    var Param = new DynamicParameters();
                    Param.Add("@PatientID", PatientID);
                    Param.Add("@PatientUnitID", PatientUnitID);

                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);

                    _List = this.con.Query<BillDetails>(GenericSP.GetBillListForRefund, Param, commandType: CommandType.StoredProcedure).ToList();

                    if (_List.Count > 0)
                        _List[0].TotalRows = Param.Get<Int32>("@TotalRows");

                }

            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }


    }
}
