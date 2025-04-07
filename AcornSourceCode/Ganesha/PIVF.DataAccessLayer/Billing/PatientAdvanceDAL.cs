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
    public class PatientAdvanceDAL : IPatientAdvanceBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public PatientAdvanceDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        /**********************************************************************************************************/
        public long savePatientAdvance(PatientAdvanceVO obj)
        {
            int ResultStatus = 0;
            long PaymentID = 0;
            long AdvanceID = 0;
            var Param = new DynamicParameters();
            
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    /*=======================================================================================================================*/
                    //Save Advance
                    foreach (var item in obj.lstPatientDataDetails)
                    {
                        Param.Add("@PatientID", item.RegID);
                        Param.Add("@PatientUnitID", item.RegUnitID);
                    }
                    Param.Add("@AdvanceId", obj.AdvanceID);                    
                    Param.Add("@AdvanceUnitId", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AdvanceTypeId", obj.AdvTypeID);
                    Param.Add("@AdvanceAgainstId", obj.AdvAgID);
                    Param.Add("@Balance", obj.Amount);
                    Param.Add("@Remarks", obj.Remarks);
                    Param.Add("@Total", obj.Amount);
                    Param.Add("@Refund", obj.Refund);
                    Param.Add("@Used", obj.Used);
                    //Param.Add("@PanCardNo", obj.PanCardNo);
                    Param.Add("@Date", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedUTCDateTime", DateTime.UtcNow);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);                   
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);                    
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);
                    
                    Param.Add("@AdvanceId", 0, DbType.Int64, ParameterDirection.Output);
                    con.Execute(GenericSP.PatientAdvance, Param, commandType: CommandType.StoredProcedure);
                    AdvanceID = Param.Get<Int64>("@AdvanceId");
                    //ResultStatus = Param.Get<Int32>("@ResultStatus");

                    /*=======================================================================================================================*/
                    
                    var Param1 = new DynamicParameters();
                    foreach (List<PaymentInfoVO> subList in obj.lstPaymentModeDetails)
                    {
                        foreach (var item in subList)
                        {
                            //Save Payment                        
                            Param1.Add("@PaymentUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@Date", DateTime.UtcNow);
                            Param1.Add("@AdvanceID", AdvanceID);
                            Param1.Add("@AdvanceUnitId", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@AdvanceAmount", item.Amount);
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

                    //Save Payment Details
                    foreach (List<PaymentInfoVO> subList in obj.lstPaymentModeDetails)
                    {
                        foreach (var item in subList)
                        {                            
                            var Param2 = new DynamicParameters();                                                     
                            Param2.Add("@PaymentID", PaymentID);
                            Param2.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@PaymentModeID", item.PaymentModeID);
                            Param2.Add("@Number", item.TransactionNo);
                            Param2.Add("@Date", item.PaymentDate);
                            Param2.Add("@BankID", item.BankID);
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
            return AdvanceID;
        }
        /**********************************************************************************************************/
        public List<PatientAdvanceVO> FillAdvanceList(int PatientID, int PatientUnitID)
        {
            List<PatientAdvanceVO> _List = new List<PatientAdvanceVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID);
                Param.Add("@PatientUnitID", PatientUnitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);               
                Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);
                _List = this.con.Query<PatientAdvanceVO>(GenericSP.GetAdvanceList, Param, commandType: CommandType.StoredProcedure).ToList();

                if (_List.Count > 0)
                    _List[0].TotalRows = Param.Get<Int32>("@TotalRows");
            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }
        /**********************************************************************************************************/


        public List<AdvanceList> GetPatientAdvanceList(string[] AdvanceLists, int index, bool PgEn, out int totalCount)
        {
            var Param = new DynamicParameters();

            Param.Add("@PageIndex", index);
            Param.Add("@PagingEnabled", PgEn);
            Param.Add("@FromDate", AdvanceLists[0]);
            Param.Add("@ToDate", AdvanceLists[1]);
            Param.Add("@PatientID", AdvanceLists[2]);
            Param.Add("@PatientUnitID", AdvanceLists[3]);
            Param.Add("@FirstName", AdvanceLists[4]);
            Param.Add("@LastName", AdvanceLists[5]);
            Param.Add("@MRNO", AdvanceLists[6]);
            Param.Add("@AdvanceNo", AdvanceLists[7]);
            // Query to get the patient advance list
            List<AdvanceList> lstAdvanceList = this.con.Query<AdvanceList>(GenericSP.GetPatientAdvanceList, Param, commandType: CommandType.StoredProcedure).AsList();

            // Count the total records manually using a for loop
            totalCount = 0;
            for (int i = 0; i < lstAdvanceList.Count; i++)
            {
                totalCount++;
            }

            return lstAdvanceList;
        }


        public long AddOrUpdateAdvance(AddAdvance obj)
        {
            int ResultStatus = 0;
            long PaymentID = 0;
            long AdvanceID = 0;
            var Param = new DynamicParameters();

            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    /*=======================================================================================================================*/
                    //Save Advance
                    foreach (var item in obj.lstPatientDataDetails)
                    {
                        Param.Add("@PatientID", item.PatientID);
                        Param.Add("@PatientUnitID", item.UnitID);
                    }
                    Param.Add("@AdvanceId", obj.AdvanceID);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@CompanyID", obj.CompanyID);
                    Param.Add("@AdvanceTypeId", obj.AdvTypeID);
                    Param.Add("@AdvanceAgainstId", obj.AdvAgID);

                    Param.Add("@Balance", obj.Amount);
                    Param.Add("@Remarks", obj.Remarks);
                    Param.Add("@Total", obj.Amount);
                    Param.Add("@Refund", obj.Refund);
                    Param.Add("@Used", obj.Used);
                    Param.Add("@Status", 1);

                    Param.Add("@Date", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedDateTime", DateTime.UtcNow);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    //Param.Add("@AddedWindowsLoginName", Environment.UserName);

                    Param.Add("@UpdatedUnitID", obj.UpdatedUnitID);
                    Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@UpdatedOn", obj.UpdatedOn ?? Environment.MachineName);
                    Param.Add("@UpdatedDateTime", obj.UpdatedDateTime ?? DateTime.UtcNow);
                    Param.Add("@Synchronized", obj.Synchronized ?? false);
                  //  Param.Add("@AdvanceNO", obj.AdvanceNO);
                    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);

                    Param.Add("@AdvanceId", 0, DbType.Int64, ParameterDirection.Output);
                    con.Execute(GenericSP.AddOrUpdateAdvance, Param, commandType: CommandType.StoredProcedure);
                    AdvanceID = Param.Get<Int64>("@AdvanceId");
                    //ResultStatus = Param.Get<Int32>("@ResultStatus");

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
                            Param1.Add("@AdvanceID", AdvanceID);
                           // Param1.Add("@AdvanceUnitId", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@AdvanceAmount", item.Amount);
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

                    //Save Payment Details
                    foreach (List<PaymentInfoVO> subList in obj.lstPaymentModeDetails)
                    {
                        foreach (var item in subList)
                        {
                            var Param2 = new DynamicParameters();
                            Param2.Add("@PaymentDetailID", item.PaymentDetailID);
                            Param2.Add("@PaymentID", PaymentID);
                            Param2.Add("@PaymentDetailUnitID", GenericSP.CurrentUser.UnitID);
                            Param2.Add("@PaymentModeID", item.PaymentModeID);
                            Param2.Add("@Number", item.TransactionNo);
                            Param2.Add("@Date", item.PaymentDate);
                          //  Param2.Add("@AdvanceID", AdvanceID);
                            Param2.Add("@AdvanceAmount", item.PaymentAmount);
                            Param2.Add("@BankID", item.BankID);
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
                AdvanceID = 0;
            }
            return AdvanceID;
        }

        public AdvanceBalance GetAdvanceBalanceAmount(int UnitID, int PatientID, int PatientUnitID)
        {
            AdvanceBalance obj = new AdvanceBalance();
            var param = new DynamicParameters();
            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@PatientID", PatientID);
            param.Add("@PatientUnitID", PatientUnitID);
            // return this.Con.Query<BillVO>(GenericSP.GetPaymentDetailsForSettleBill, paramBillBillList, commandType: CommandType.StoredProcedure).ToList();

            var QueryMultiple = this.con.QueryMultiple(GenericSP.GetAdvanceBalanceAmount, param, commandType: CommandType.StoredProcedure);
            obj = QueryMultiple.Read<AdvanceBalance>().SingleOrDefault();

            return obj;
        }



    }
}
