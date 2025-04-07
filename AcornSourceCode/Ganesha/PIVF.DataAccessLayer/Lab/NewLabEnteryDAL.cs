using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Threading.Tasks;
using PIVF.BusinessLayer.Lab;
using PIVF.Entities.Models.Lab;

using Dapper;
using System.Transactions;
using PIVF.Entities.Models.Billing;

namespace PIVF.DataAccessLayer.Lab
{
    public class NewLabEnteryDAL : NewLabEnteryBAL
    {
        private Database dbServer = null;
        IDbConnection con;

        public NewLabEnteryDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public int SaveLabEntery(clsPathOrderBookingVO objLab)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    int Status = 0;
                    var Param = new DynamicParameters();


                    // Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    //Param.Add("@OrderID", objLab.OrderID);
                    Param.Add("@OrderUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@OrderNo", objLab.OrderNo);
                    Param.Add("@BillID", objLab.BillID);
                    Param.Add("@BillNo", objLab.BillNo);
                    // Param.Add("@BillUnitID", GenericSP.CurrentUser.UnitID);

                    // Param.Add("@MRNo", objLab.MRNo);
                    // Param.Add("@PatientName", objLab.PatientName);
                    //Param.Add("@Gender", objLab.Gender);
                    //Param.Add("@Age", objLab.Age);
                    //Param.Add("@MobileCountryCode", objLab.MobCountryCode);
                    //Param.Add("@MobileNo", objLab.MobileNo);
                    //Param.Add("@RefernceNo", objLab.RefernceNo);
                    //Param.Add("@ReportDate", objLab.ReportDate);
                    //Param.Add("@SampleCollectionDate", objLab.SampleCollectionDate);
                    // Param.Add("@DoneBy", objLab.DoneBy);
                    Param.Add("@Opd_Ipd_External", objLab.Opd_Ipd_External);
                    Param.Add("@PatientID", objLab.PatientId);
                    Param.Add("@PatientUnitID", objLab.PatientUnitID);
                    Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                    Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                    Param.Add("@AdmissionID", objLab.AdmissionID);
                    Param.Add("@AdmissionUnitID", objLab.AdmissionUnitID);
                    //Param.Add("@TestType", objLab.TestType);
                    //Param.Add("@DoneBy", objLab.DoneBy, DbType.Int32);
                    //Param.Add("@AuthorizedBy", objLab.AuthorizedBy, DbType.Int32);
                    Param.Add("@IsDelivered", objLab.IsDelivered, DbType.Boolean);
                    Param.Add("@IsCompleted", objLab.IsCompleted, DbType.Boolean);
                    Param.Add("@IsPrinted", objLab.IsPrinted, DbType.Boolean);
                    Param.Add("@IsCancelled", objLab.IsCancelled, DbType.Boolean);
                    Param.Add("@IsApproved", objLab.IsApproved, DbType.Boolean);
                    Param.Add("@IsResultEntry", objLab.IsResultEntry, DbType.Boolean);
                    Param.Add("@IsOrderGenerated", objLab.IsOrderGenerated, DbType.Boolean);
                    Param.Add("@IsExternalPatient", objLab.IsExternalPatient, DbType.Boolean);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Param.Add("@Date", DateTime.Now, DbType.DateTime);
                    Param.Add("@Time", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                    Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                    //Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                    //Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    //Param.Add("@UpdatedOn", Environment.MachineName);
                    //Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
                    Param.Add("@ReferredDoctorID", objLab.ReferredDoctorID);
                    Param.Add("@DoctorID", objLab.DoctorID);
                    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    Param.Add("@OrderID", 0, DbType.Int64, ParameterDirection.Output);
                    //this.con.Query<int>(GenericSP.AddPathOrderBooking, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    con.Execute(GenericSP.AddPathOrderBooking, Param, commandType: CommandType.StoredProcedure);
                    long OrderID = Param.Get<Int64>("@OrderID");


                    for (int Index = 0; Index < objLab.PathoOrderDetailsList.Count; Index++)
                    {
                        var Param1 = new DynamicParameters();

                        Param1.Add("@OrderID", OrderID);
                        Param1.Add("@OrderUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param1.Add("@TestID", objLab.PathoOrderDetailsList[Index].TestID);
                        Param1.Add("@ChargeID", objLab.PathoOrderDetailsList[Index].ChargeID);

                        Param1.Add("@ApproveBy", objLab.PathoOrderDetailsList[Index].ApproveBy);//donebyName
                        Param1.Add("@ApproveByUserID", objLab.PathoOrderDetailsList[Index].ApproveByUserID);//donebyID
                        Param1.Add("@ApproveDateTime", DateTime.Now, DbType.DateTime);
                        Param1.Add("@ResultEntryUserID", objLab.PathoOrderDetailsList[Index].ResultEntryUserID);//authorized by ID
                        Param1.Add("@ResultEntryBy", objLab.PathoOrderDetailsList[Index].ResultEntryBy);//authorized by Name
                        Param1.Add("@SampleCollectionLocationID", objLab.PathoOrderDetailsList[Index].SampleCollectionLocationID);//locationID
                        Param1.Add("@CollectionName", objLab.PathoOrderDetailsList[Index].CollectionName);//locationName
                        Param1.Add("@CollectionCenter", objLab.PathoOrderDetailsList[Index].CollectionCenter);
                        Param1.Add("@SampleCollectedDateTime", objLab.PathoOrderDetailsList[Index].SampleCollectedDateTime);//samplecoll date
                        Param1.Add("@ResultEntryDate", objLab.PathoOrderDetailsList[Index].ResultEntryDate);//samplecoll date
                        

                        Param1.Add("@ChargeUnitID", objLab.PathoOrderDetailsList[Index].ChargeUnitID);
                        Param1.Add("@TariffID", objLab.PathoOrderDetailsList[Index].TariffID);
                        Param1.Add("@ServiceID", objLab.PathoOrderDetailsList[Index].ServiceID);
                        Param1.Add("@TestCharges", objLab.PathoOrderDetailsList[Index].TestCharges);
                        Param1.Add("@IsEmergency", objLab.PathoOrderDetailsList[Index].IsEmergency, DbType.Boolean);
                        Param1.Add("@PathologistID", objLab.PathoOrderDetailsList[Index].PathologistID);
                        Param1.Add("@Specimen", objLab.PathoOrderDetailsList[Index].Specimen);
                        Param1.Add("@ClinicalNote", objLab.PathoOrderDetailsList[Index].ClinicalNote);
                        Param1.Add("@SampleNo", objLab.PathoOrderDetailsList[Index].SampleNo);
                        Param1.Add("@FirstLevel", objLab.PathoOrderDetailsList[Index].FirstLevel);
                        Param1.Add("@SecondLevel", objLab.PathoOrderDetailsList[Index].SecondLevel);
                        Param1.Add("@ThirdLevel", objLab.PathoOrderDetailsList[Index].ThirdLevel);
                        Param1.Add("@FirstLevelID", objLab.PathoOrderDetailsList[Index].FirstLevelID);
                        Param1.Add("@SecondLevelID", objLab.PathoOrderDetailsList[Index].SecondLevelID);
                        Param1.Add("@ThirdLevelID", objLab.PathoOrderDetailsList[Index].ThirdLevelID);
                        Param1.Add("@IsDelivered", objLab.PathoOrderDetailsList[Index].IsDelivered, DbType.Boolean);
                        Param1.Add("@IsCompleted", objLab.PathoOrderDetailsList[Index].IsCompleted, DbType.Boolean);
                        Param1.Add("@IsPrinted", objLab.PathoOrderDetailsList[Index].IsPrinted, DbType.Boolean);
                        Param1.Add("@IsApproved", objLab.PathoOrderDetailsList[Index].IsApproved, DbType.Boolean);
                        Param1.Add("@IsCompleted", objLab.PathoOrderDetailsList[Index].IsCompleted, DbType.Boolean);
                        Param1.Add("@IsOutSourced", objLab.PathoOrderDetailsList[Index].IsOutSourced, DbType.Boolean);
                        Param1.Add("@IsResultEntry", objLab.PathoOrderDetailsList[Index].IsResultEntry, DbType.Boolean);
                        //Param1.Add("@IsOrderGenerated", objLab.IsOrderGenerated, DbType.Boolean);
                        Param1.Add("ExtAgencyID", objLab.PathoOrderDetailsList[Index].ExtAgencyID);
                        Param1.Add("@Quantity", objLab.PathoOrderDetailsList[Index].Quantity);
                        Param1.Add("@IsSampleCollected", objLab.PathoOrderDetailsList[Index].IsSampleCollected, DbType.Boolean);
                        Param1.Add("@SampleCollected", objLab.PathoOrderDetailsList[Index].SampleCollected);
                        Param1.Add("@IsFinalized", objLab.PathoOrderDetailsList[Index].IsFinalized, DbType.Boolean);
                        Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param1.Add("@Date", DateTime.Now, DbType.DateTime);
                        Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param1.Add("@AddedOn", Environment.MachineName, DbType.String);
                        Param1.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param1.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                        Param1.Add("@Status", 1);
                        Param1.Add("@OrderDetailsUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Param1.Add("@OrderDetailsID", 0, DbType.Int64, ParameterDirection.Output);
                        //this.con.Query<int>(GenericSP.AddPathOrderBookingDetail, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        con.Execute(GenericSP.AddPathOrderBookingDetail, Param1, commandType: CommandType.StoredProcedure);
                        long OrderDetailsID = Param1.Get<Int64>("@OrderDetailsID");
                        objLab.PathoOrderDetailsList[Index].OrderDetailsID = OrderDetailsID;

                         }

                        for (int i = 0; i < objLab.PathoTestList.Count; i++)
                        {
                            var Param2 = new DynamicParameters();
                            Param2.Add("@OrderID", OrderID);
                            Param2.Add("@OrderUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Param2.Add("@OrderDetailsID", objLab.PathoOrderDetailsList[i].OrderDetailsID);
                            Param2.Add("@OrderDetailsUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Param2.Add("@SampleNo", objLab.PathoTestList[i].SampleNo);
                            Param2.Add("@SampleCollectionTime", objLab.PathoTestList[i].SampleCollectionTime);
                            Param2.Add("@PathologistID1", objLab.PathoTestList[i].PathologistID1);
                            Param2.Add("@ReferredBy", objLab.PathoTestList[i].ReferredBy);
                            Param2.Add("@IsFinalized", objLab.PathoTestList[i].IsFinalized, DbType.Boolean);
                            Param2.Add("@PathPatientReportUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Param2.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Param2.Add("@Status", 1);
                            Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                            Param2.Add("@AddedOn", Environment.MachineName, DbType.String);
                            Param2.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                            Param2.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                            //Param2.Add("@PathPatientReportID", objLab.PathoTestList[i].PathPatientReportID);
                      
                            Param2.Add("@RefDoctorID", objLab.PathoTestList[i].RefDoctorID);
                            Param2.Add("@IsFirstLevel", objLab.PathoTestList[i].IsFirstLevel, DbType.Boolean);
                            Param2.Add("@IsSecondLevel", objLab.PathoTestList[i].IsSecondLevel, DbType.Boolean);
                            Param2.Add("@IsThirdLevel", objLab.PathoTestList[i].IsThirdLevel, DbType.Boolean);
                            Param2.Add("@ResultAddedDate", objLab.PathoTestList[i].ResultAddedDate);
                            Param2.Add("@IsDoctorAuthorization", objLab.PathoTestList[i].IsDoctorAuthorization, DbType.Boolean);
                            Param2.Add("@DocAuthorizationID", objLab.PathoTestList[i].DocAuthorizationID);
                            Param2.Add("@IsAutoApproved", objLab.PathoTestList[i].IsAutoApproved, DbType.Boolean);
                            Param2.Add("@ApproveBy", objLab.PathoTestList[i].ApproveBy);
                            Param2.Add("@PathPatientReportID", 0, DbType.Int32, ParameterDirection.Output);
                        //this.con.Query<int>(GenericSP.AddPathPatientReport, Param2, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        con.Execute(GenericSP.AddPathPatientReport, Param2, commandType: CommandType.StoredProcedure);
                        long PathPatientReportID = Param2.Get<Int32>("@PathPatientReportID");
                        //long OrderDetailsID = Param1.Get<Int64>("@OrderDetailsID");
                        objLab.PathPatientReportID = PathPatientReportID;
                       //objLab.PathoTestList[i].PathPatientReportID = PathPatientReportID;

                    }




                    for (int Index1 = 0; Index1 < objLab.PathoTestListDetails.Count; Index1++)
                        {
                            var Param3 = new DynamicParameters();
                            Param3.Add("@OrderID", OrderID);
                            Param3.Add("@OrderUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Param3.Add("@PathPatientReportID", objLab.PathPatientReportID);
                            Param3.Add("@PathPatientReportUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            //Param3.Add("@PathPatientReportID", objLab.PathoTestListDetails[Index1].PathPatientReportID);
                            //Param3.Add("@PathPatientReportID", objLab.PathoTestList[Index1].PathPatientReportID);
                           // Param3.Add("@PathPatientReportID", PathPatientReportID);
                            Param3.Add("@IsNumeric", objLab.PathoTestListDetails[Index1].IsNumeric, DbType.Boolean);
                            Param3.Add("@TestID", objLab.PathoTestListDetails[Index1].TestID); //objLab.PathoTestListDetails[Index1]
                            Param3.Add("@ParameterID", objLab.PathoTestListDetails[Index1].ParameterID);
                            Param3.Add("@CategoryID", objLab.PathoTestListDetails[Index1].CategoryID);
                            Param3.Add("@Category", objLab.PathoTestListDetails[Index1].Category);
                            Param3.Add("@SubTestID", objLab.PathoTestListDetails[Index1].SubTestID);
                            //Param3.Add("@ParameterName", objLab.PathoTestListDetails[Index1].ParameterName);
                            Param3.Add("@ParameterName", objLab.PathoTestListDetails[Index1].Parameter);
                            //Param3.Add("@ParameterUnit", objLab.PathoTestListDetails[Index1].ParameterUnit);
                            Param3.Add("@ParameterUnit", objLab.PathoTestListDetails[Index1].Unit);
                            Param3.Add("@ParameterPrintName", objLab.PathoTestListDetails[Index1].ParameterPrintName);
                            Param3.Add("@ResultValue", objLab.PathoTestListDetails[Index1].ResultValue);
                            //Param3.Add("@ResultValue", objLab.PathoTestListDetails[Index1].PreviousResultValue);
                            Param3.Add("@DefaultValue", objLab.PathoTestListDetails[Index1].DefaultValue);
                            Param3.Add("@NormalRange ", objLab.PathoTestListDetails[Index1].NormalRange);
                            Param3.Add("@HelpValue", objLab.PathoTestListDetails[Index1].HelpValue);
                            Param3.Add("@SuggetionNote", objLab.PathoTestListDetails[Index1].FootNote);
                            Param3.Add("@FootNote ", objLab.PathoTestListDetails[Index1].NormalRange);
                            Param3.Add("@SubTest", objLab.PathoTestListDetails[Index1].SubTest);
                        //Param3.Add("@Status", 1);
                            Param3.Add("@Status", objLab.PathoTestListDetails[Index1].Status, DbType.Boolean);
                            Param3.Add("@PPPDUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            // Param3.Add("@Parameter", objLab.PathoTestListDetails[Index1].Parameter);
                            //Param3.Add("@PreviousResultValue", objLab.PathoTestListDetails[Index1].PreviousResultValue);
                            //Param3.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                            // Param3.Add("@Unit", objLab.PathoTestListDetails[Index1].Unit);
                            //Param3.Add("@LowerPanicValue", objLab.PathoTestListDetails[Index1].LowerPanicValue);
                            //Param3.Add("@UpperPanicValue", objLab.PathoTestListDetails[Index1].UpperPanicValue);
                            Param3.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            //Param3.Add("@Date", DateTime.Now, DbType.DateTime);
                            Param3.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                            Param3.Add("@AddedOn", Environment.MachineName, DbType.String);
                            Param3.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                            Param3.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                            Param3.Add("@LoginName", Environment.UserName, DbType.String);
                            Param3.Add("@IsFirstLevel", objLab.PathoTestListDetails[Index1].IsFirstLevel, DbType.Boolean);
                            Param3.Add("@IsSecondLevel", objLab.PathoTestListDetails[Index1].IsSecondLevel, DbType.Boolean);
                            Param3.Add("@ReferenceRange", objLab.PathoTestListDetails[Index1].ReferenceRange);
                            Param3.Add("@DeltaCheck", objLab.PathoTestListDetails[Index1].DeltaCheck, DbType.Boolean);
                            Param3.Add("@ParameterDefaultValueId", objLab.PathoTestListDetails[Index1].ParameterDefaultValueId);
                            Param3.Add("@PPPDID", 0, DbType.Int64, ParameterDirection.Output);
                        //this.con.Query<int>(GenericSP.AddPathPatientParameterDetails, Param3, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        con.Execute(GenericSP.AddPathPatientParameterDetails, Param3, commandType: CommandType.StoredProcedure);
                        //long ID = Param3.Get<Int64>("@PPPDID");
                    }

                    //}
                    transactionScope.Complete();
                    return Status = Param.Get<Int32>("@ResultStatus");
                }
            }
            catch (Exception ex)
            {
                return 0;
            }

        }


        public List<clsPathPatientReportVO> GetPathoTestParameterList(int PatientID, int PatientUnitID, int ServiceID, int TestID, int CategoryID)
        {
            List<clsPathPatientReportVO> _List = new List<clsPathPatientReportVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID);
                Param.Add("@PatientUnitID", PatientUnitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@TestID", TestID);
                Param.Add("@CategoryID", CategoryID);
                Param.Add("@ServiceID", ServiceID);
                _List = this.con.Query<clsPathPatientReportVO>(GenericSP.GetPathoTestParameterAndSubTestDetailsList, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }




        public List<clsPathOrderBookingDetailVO> getPatientList(clsPathOrderBookingDetailVO NewLabList, int index)
        {
            try
            {
                var Param = new DynamicParameters();

                Param.Add("@FromDate", NewLabList.FromDate);
                Param.Add("@ToDate", NewLabList.ToDate);
                Param.Add("@OrderID", NewLabList.OrderID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@DispatchToID", NewLabList.DispatchToID);
                Param.Add("@PatientSearch", Convert.ToString(NewLabList.PatientName) == "" ? null : Convert.ToString(NewLabList.PatientName));
                Param.Add("@SearchFromDispatch", NewLabList.SearchFromDispatch,DbType.Boolean);
                Param.Add("@SearchFromCollection", NewLabList.SearchFromCollection, DbType.Boolean);
                Param.Add("@SearchFromReceive", NewLabList.SearchFromReceive, DbType.Boolean);
                Param.Add("@SeacrhFromAcceptReject", NewLabList.SeacrhFromAcceptReject, DbType.Boolean);
                Param.Add("@SearchFromResult", NewLabList.SearchFromResult, DbType.Boolean);
                Param.Add("@SearchFromAutoriation", NewLabList.SearchFromAutoriation, DbType.Boolean);
                Param.Add("@SearchFromUpload", NewLabList.SearchFromUpload, DbType.Boolean);
                Param.Add("@TestCategoryID", NewLabList.TestCategoryID);
                Param.Add("@AuthenticationLevel", NewLabList.AuthenticationLevel);

                Param.Add("@CheckExtraCriteria", 1);
                Param.Add("@CheckSampleType", NewLabList.CheckSampleType,DbType.Boolean);
                Param.Add("@SampleType", NewLabList.SampleType, DbType.Boolean);
                Param.Add("@CheckUploadStatus", NewLabList.CheckUploadStatus, DbType.Boolean);
                Param.Add("@IsUploaded", NewLabList.IsUploaded, DbType.Boolean);
                Param.Add("@IsBilled", NewLabList.IsBilled, DbType.Boolean);
                Param.Add("@IsSampleCollected", NewLabList.IsSampleCollected, DbType.Boolean);
                Param.Add("@IsSampleDispatched", NewLabList.IsSampleDispatched, DbType.Boolean);
                Param.Add("@IsAccepted", NewLabList.IsAccepted, DbType.Boolean);
                Param.Add("@IsRejected", NewLabList.IsRejected, DbType.Boolean);
                Param.Add("@IsSubOptimal", NewLabList.IsSubOptimal, DbType.Boolean);
                Param.Add("@IsOutSourced", NewLabList.IsOutSourced, DbType.Boolean);
                Param.Add("@IsDelivered1", NewLabList.IsDelivered1, DbType.Boolean);
                Param.Add("@IsDeliverdthroughEmail", NewLabList.IsDeliverdthroughEmail, DbType.Boolean);
                //Param.Add("@IsDirectDeliveredred", NewLabList.IsDirectDelivered, DbType.Boolean);
                Param.Add("@AcceptedOrRejectedByName", NewLabList.AcceptedOrRejectedByName);
                Param.Add("@SampleReceiveBy", NewLabList.SampleReceiveBy);
                Param.Add("@SampleNo", NewLabList.SampleNo);
                Param.Add("@AgencyID", NewLabList.AgencyID);
                Param.Add("@IsExternalPatient", NewLabList.IsExternalPatient, DbType.Boolean);
                Param.Add("@IsClosedOrReported", NewLabList.IsClosedOrReported, DbType.Boolean);
                Param.Add("@CatagoryID", NewLabList.CatagoryID);
                Param.Add("@ResultEntryUserID", NewLabList.ResultEntryUserID);
                //Param.Add("@ServiceTest", NewLabList.ServiceTest);
                Param.Add("@CollectionID", NewLabList.SampleCollectionLocation);
                
                Param.Add("@PagingEnabled", 1);
                Param.Add("@IdColumnName", "ID");
                Param.Add("@startRowIndex", index);
                Param.Add("@maximumRows", 10);
                Param.Add("@sortExpression", NewLabList.sortExpression);
                //Param.Add("@PatientSearch", NewLabList.PatientSearch);

                Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);

                List<clsPathOrderBookingDetailVO> TestList = new List<clsPathOrderBookingDetailVO>();
                TestList = this.con.Query<clsPathOrderBookingDetailVO>(GenericSP.GetPathDetailListForResultEntry, Param, commandType: CommandType.StoredProcedure).AsList();
                TestList[0].TotalCount = Param.Get<Int32>("@TotalRows");

                if (TestList != null && TestList.Count > 0)
                {
                    TestList[0].TotalCount = TestList[0].TotalCount;
                }


                return TestList;

                //TestList[0].TotalCount= Param.Get<Int32>("@TotalRows");
                //return TestList;



                }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        
        public List<clsPathoTestParameterVO> HelpValuesesEntryList(int ParameterID)
        {
            List<clsPathoTestParameterVO> _List = new List<clsPathoTestParameterVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ParameterID",ParameterID);
                
                _List = this.con.Query<clsPathoTestParameterVO>(GenericSP.GetHelpValuesFroResultEntry, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }

        public clsPathOrderBookingDetailVO GetLabEntryDetails(int OrderID, int DetailID, int OrderUnitID)
        {
             clsPathOrderBookingDetailVO oBJ = new clsPathOrderBookingDetailVO();
            //List<clsPathOrderBookingDetailVO> oBJ = new List<clsPathOrderBookingDetailVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@OrderID", OrderID);
                Param.Add("@DetailID", DetailID);
                Param.Add("@OrderUnitID", OrderUnitID);


                // oBJ = this.con.Query<clsPathOrderBookingDetailVO>(GenericSP.GetPathoResultEntry, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                
                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetPathoResultEntry, Param, commandType: CommandType.StoredProcedure);
                oBJ = QueryMultiple.Read<clsPathOrderBookingDetailVO>().SingleOrDefault();

                if (oBJ != null)
                {
                    oBJ = new clsPathOrderBookingDetailVO();
                    oBJ = QueryMultiple.Read<clsPathOrderBookingDetailVO>().SingleOrDefault();
                }

                //if (oBJ == null)
                //{
                //    oBJ = new  clsPathOrderBookingDetailVO();


                //}

            }
            catch (Exception e)
            {
                oBJ = null;
            }
           
            return oBJ;

        }

    }
}

