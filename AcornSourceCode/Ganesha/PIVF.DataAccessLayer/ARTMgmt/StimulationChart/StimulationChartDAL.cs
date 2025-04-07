using PIVF.BusinessLayer.ARTMgmt.StimulationChart;
using System;
using System.Collections.Generic;
using System.Linq;
using PIVF.Entities.Models.ARTMgmt.StimulationChart;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using System.Transactions;

namespace PIVF.DataAccessLayer.ARTMgmt.StimulationChart
{
    public class StimulationChartDAL : StimulationChartBAL
    {
        private Microsoft.Practices.EnterpriseLibrary.Data.Database dbServer = null;
        IDbConnection con;
        public StimulationChartDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public StimulationChartVO GetStimulationChartDetails()
        {
            var Param = new DynamicParameters();
            StimulationChartVO obj = new StimulationChartVO();
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            // Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID); //commented sujata
            //Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);  //commented  sujata for cross clinic
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@CopuleID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@CopuleUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
            var QueryMultiple = this.con.QueryMultiple(GenericSP.GetStimulationChartDetails, Param, commandType: CommandType.StoredProcedure);
            obj = QueryMultiple.Read<StimulationChartVO>().SingleOrDefault();
            obj.FolliScanDaysCheckList = QueryMultiple.Read<FolliScanDaysList>().ToList();
            obj.EndometriumList = QueryMultiple.Read<Morphology>().ToList();
            obj.E2 = QueryMultiple.Read<StimulationE2>().ToList();
            obj.Progesterone = QueryMultiple.Read<StimulationProgesterone>().ToList();
            obj.FSH = QueryMultiple.Read<StimulationFSH>().ToList();
            obj.LH = QueryMultiple.Read<StimulationLH>().ToList();
            obj.TempAddDrugList = QueryMultiple.Read<AddDrugList>().ToList();
            obj.TempDrugNextDates = QueryMultiple.Read<DrugNextDates>().ToList();
            obj.AddDrugList = new List<AddDrugList>();
            obj.AddDrugList.AddRange(obj.TempAddDrugList);
            foreach (AddDrugList item in obj.AddDrugList)
            {
                item.DrugNextDates = new List<DrugNextDates>();
                item.DrugNextDates = obj.TempDrugNextDates.Where(p => p.AddDrugID == item.ID).ToList();
            }
            obj.TriggerDateDoseList = QueryMultiple.Read<StimulationDoseTrigger>().ToList();
            obj.RemarksList = QueryMultiple.Read<StimulationRemark>().ToList();
            obj.LatestDoctors = QueryMultiple.Read<StimulationPhysician>().ToList();
            obj.DoctorNameList = QueryMultiple.Read<StimulationDrugAdmin>().ToList();
            return obj;
        }
        public List<StimulationChartVO> GetStimulationChartSizeDetails()
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@CopuleID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@CopuleUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
            return this.con.Query<StimulationChartVO>(GenericSP.GetStimulationChartSizeDetails, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public int SaveUpdateStimulationChart(StimulationChartVO obj)
        {
            using (var transactionScope = new TransactionScope())
            {
                string ResultStatus = string.Empty;
                string OperationStatus = string.Empty;
                //Stimulation details
                var Param = new DynamicParameters();
                Param.Add("@StimulationID", obj.StimulationID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@PatientID", obj.PatientID);
                Param.Add("@PatientUnitID", obj.PatientUnitID);
                Param.Add("@CoupleID", obj.CoupleID);
                Param.Add("@CoupleUnitID", obj.CoupleUnitID);
                Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
                Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
                Param.Add("@TherapyID", obj.TherapyID);
                Param.Add("@TherapyUnitID", obj.TherapyUnitID);
                Param.Add("@CycleCode", obj.CycleCode);
                Param.Add("@SCARTID", obj.SCARTID);
                Param.Add("@SCARTSubID", obj.SCARTSubID);
                Param.Add("@AntralFollicleCount", obj.AntralFollicleCount);
                Param.Add("@TotalDose", obj.TotalDose);
                Param.Add("@OPUDate", obj.OPUDate);
                Param.Add("@StimulationStartDate", obj.SimulationCycleStartDate);
                Param.Add("@StimulationEndDate", obj.StimulationEndDate);
                Param.Add("@LMPDate", obj.SCLMP);
                Param.Add("@IsCycleCancellation", obj.IsCycleCancellation);
                Param.Add("@IsCloseCycleOnCancellation", obj.IsCloseCycleOnCancellation);
                Param.Add("@Reason", obj.Reason);
                Param.Add("@LastUpdatedBy", GenericSP.CurrentUser.UserID);
                //Param.Add("@LastUpdatedByDate", DateTime.Today); //Commented and modified by AniketK on 23Sept2019
                Param.Add("@LastUpdatedByDate", DateTime.Now);


                if (obj.IsFinalize)
                {
                    Param.Add("@FinalizedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@FinalizedByDate", DateTime.Today);
                }
                else
                {
                    Param.Add("@FinalizedBy", obj.FinalizedBy);
                    Param.Add("@FinalizedByDate", obj.FinalizedByDate);
                }
                Param.Add("@IsFinalize", obj.IsFinalize);
                Param.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
                Param.Add("@OperationStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
                try
                {
                    con.Execute(GenericSP.InsertStimulationChart, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus = Param.Get<string>("@ResultStatus");
                    OperationStatus = Param.Get<string>("@OperationStatus");

                    if (Convert.ToInt32(ResultStatus) > 0)
                    {
                        //delete first
                        //var ParamfolliD = new DynamicParameters();
                        //ParamfolliD.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
                        //ParamfolliD.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
                        //ParamfolliD.Add("@Action", "Delete");
                        //ParamfolliD.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
                        //con.Execute(GenericSP.InsertFollicularScanFromStimulation, ParamfolliD, commandType: CommandType.StoredProcedure);

                        //if dates are selected then need to insert follicular scan
                        for (int i = 0; i < obj.FolliScanDaysCheckList.Count; i++)
                        {
                            string Result = string.Empty;
                            var Paramfolli = new DynamicParameters();
                            Paramfolli.Add("@ID", 0);
                            Paramfolli.Add("@UnitID", obj.PatientUnitID);
                            Paramfolli.Add("@FCPatientID", obj.PatientID);
                            Paramfolli.Add("@FCUserID", GenericSP.CurrentUser.UserID);
                            Paramfolli.Add("@TherapyId", obj.TherapyID);
                            Paramfolli.Add("@TherapyUnitID", obj.TherapyUnitID);
                            Paramfolli.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
                            Paramfolli.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
                            Paramfolli.Add("@FollicularScanDate", Convert.ToDateTime(obj.FolliScanDaysCheckList[i].Date));
                            Paramfolli.Add("@FollicularScanTime", Convert.ToDateTime(obj.FolliScanDaysCheckList[i].Date));
                            Paramfolli.Add("@Cyclecode", obj.CycleCode);
                            Paramfolli.Add("@EndometriumThickness", Convert.ToDouble(obj.EndometriumThickness));
                            Paramfolli.Add("@EndometriumMorphologyID", obj.EndometriumMorphology);
                            Paramfolli.Add("@FollicularScanRemark", null);
                            Paramfolli.Add("@IsFinalize", false);
                            Paramfolli.Add("@PhysicianID", GenericSP.CurrentUser.UserID);
                            Paramfolli.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
                            if (obj.FolliScanDaysCheckList[i].IsChecked)
                            {
                                con.Execute(GenericSP.InsertFollicularScanFromStimulation, Paramfolli, commandType: CommandType.StoredProcedure);
                                Result = Param.Get<string>("@ResultStatus");
                            }
                        }
                        //Delete drugs against stimulation
                        var parmDrugdels = new DynamicParameters();
                        parmDrugdels.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                        con.Execute(GenericSP.DeleteStimulationDrugByID, parmDrugdels, commandType: CommandType.StoredProcedure);
                        //Drug dose details
                        for (int col = 0; col < obj.AddDrugList.Count; col++)
                        {
                            string Result = string.Empty;
                            var parmDrugs = new DynamicParameters();
                            parmDrugs.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            parmDrugs.Add("@DrugID", obj.AddDrugList[col].DrugID);
                            parmDrugs.Add("@DrugName", obj.AddDrugList[col].DrugName);
                            parmDrugs.Add("@DrugDate", obj.AddDrugList[col].DrugDate);
                            parmDrugs.Add("@DrugTime", obj.AddDrugList[col].DrugTime);
                            parmDrugs.Add("@DrugDays", obj.AddDrugList[col].DrugDays);
                            parmDrugs.Add("@DrugDose", obj.AddDrugList[col].DrugDose);
                            parmDrugs.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
                            con.Execute(GenericSP.InsertStimulationAddDrug, parmDrugs, commandType: CommandType.StoredProcedure);
                            Result = parmDrugs.Get<string>("@Result");
                            if (Convert.ToInt32(Result) > 0)
                            {
                                //insert datewise drug dose
                                for (int row = 0; row < obj.AddDrugList[col].DrugNextDates.Count; row++)
                                {
                                    var datewise = new DynamicParameters();
                                    datewise.Add("@AddDrugID", Convert.ToInt32(Result));
                                    datewise.Add("@NextDate", obj.AddDrugList[col].DrugNextDates[row].NextDate);
                                    datewise.Add("@DateWiseDose", obj.AddDrugList[col].DrugNextDates[row].DateWiseDose);
                                    datewise.Add("@LoggedUserName", obj.AddDrugList[col].DrugNextDates[row].LoggedUserName);
                                    con.Execute(GenericSP.InsertStimulationAddDatewiseDose, datewise, commandType: CommandType.StoredProcedure);
                                }
                            }

                        }
                        //E2
                        //delete e2
                        var paramE2D = new DynamicParameters();
                        paramE2D.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                        paramE2D.Add("@Action", "Delete");
                        con.Execute(GenericSP.InsertStimulationE2, paramE2D, commandType: CommandType.StoredProcedure);
                        //INSERT E2 AFTER DELETE RECORD
                        for (int col = 0; col < obj.E2.Count; col++)
                        {
                            var paramE2 = new DynamicParameters();
                            paramE2.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            paramE2.Add("@Date", obj.E2[col].Date);
                            paramE2.Add("@Size", obj.E2[col].Size);
                            if (obj.E2[col].Size != null)
                            {
                                con.Execute(GenericSP.InsertStimulationE2, paramE2, commandType: CommandType.StoredProcedure);
                            }
                        }
                        //Postregrone
                        //DELETE
                        var paramProgesteroneD = new DynamicParameters();
                        paramProgesteroneD.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                        paramProgesteroneD.Add("@Action", "Delete");
                        con.Execute(GenericSP.InsertStimulationProgesterone, paramProgesteroneD, commandType: CommandType.StoredProcedure);
                        //INSERT
                        for (int col = 0; col < obj.Progesterone.Count; col++)
                        {
                            var paramProgesterone = new DynamicParameters();
                            paramProgesterone.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            paramProgesterone.Add("@Date", obj.Progesterone[col].Date);
                            paramProgesterone.Add("@Size", obj.Progesterone[col].Size);
                            if (obj.Progesterone[col].Size != null)
                            {
                                con.Execute(GenericSP.InsertStimulationProgesterone, paramProgesterone, commandType: CommandType.StoredProcedure);
                            }
                        }
                        //FSH
                        //DELETE
                        var paramFSHD = new DynamicParameters();
                        paramFSHD.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                        paramFSHD.Add("@Action", "Delete");
                        con.Execute(GenericSP.InsertStimulationFSH, paramFSHD, commandType: CommandType.StoredProcedure);
                        //INSERT
                        for (int col = 0; col < obj.FSH.Count; col++)
                        {
                            var paramFSH = new DynamicParameters();
                            paramFSH.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            paramFSH.Add("@Date", obj.FSH[col].Date);
                            paramFSH.Add("@Size", obj.FSH[col].Size);
                            if (obj.FSH[col].Size != null)
                            {
                                con.Execute(GenericSP.InsertStimulationFSH, paramFSH, commandType: CommandType.StoredProcedure);
                            }
                        }

                        //LH
                        //DELETE
                        var paramLHD = new DynamicParameters();
                        paramLHD.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                        paramLHD.Add("@Action", "Delete");
                        con.Execute(GenericSP.InsertStimulationLH, paramLHD, commandType: CommandType.StoredProcedure);
                        //INSERT
                        for (int col = 0; col < obj.LH.Count; col++)
                        {
                            var paramLH = new DynamicParameters();
                            paramLH.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            paramLH.Add("@Date", obj.LH[col].Date);
                            paramLH.Add("@Size", obj.LH[col].Size);
                            if (obj.LH[col].Size != null)
                            {
                                con.Execute(GenericSP.InsertStimulationLH, paramLH, commandType: CommandType.StoredProcedure);
                            }
                        }

                        //INSERT Trigger  ADDED sujata AFTER DELETE RECORD
                        var Trigger = new DynamicParameters();
                        Trigger.Add("@Action", "Delete");
                        Trigger.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                        Trigger.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        con.Execute(GenericSP.InsertStimulationTrigger, Trigger, commandType: CommandType.StoredProcedure);
                        //INSERT end  ADDED sujata AFTER DELETE RECORD
                        //Trigger
                        for (int col = 0; col < obj.TriggerDateDoseList.Count; col++)
                        {
                            var paramTrigger = new DynamicParameters();
                            paramTrigger.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            paramTrigger.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                            paramTrigger.Add("@DrugID", obj.TriggerDateDoseList[col].DrugID);
                            paramTrigger.Add("@TriggerDate", obj.TriggerDateDoseList[col].TriggerDate);
                            paramTrigger.Add("@DrugTime", obj.TriggerDateDoseList[col].DrugTime);
                            paramTrigger.Add("@TriggerDose", obj.TriggerDateDoseList[col].TriggerDose);
                            if (obj.TriggerDateDoseList[col].TriggerDose != null)
                            {
                                con.Execute(GenericSP.InsertStimulationTrigger, paramTrigger, commandType: CommandType.StoredProcedure);
                            }

                            
                        }
                        //Remarks
                        //DELETE
                        paramFSHD = new DynamicParameters();
                        paramFSHD.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                        paramFSHD.Add("@Action", "Delete");
                        con.Execute(GenericSP.InsertStimulationRemark, paramFSHD, commandType: CommandType.StoredProcedure);
                        //INSERT
                        for (int col = 0; col < obj.RemarksList.Count; col++)
                        {
                            var paramFSH = new DynamicParameters();
                            paramFSH.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            paramFSH.Add("@Date", obj.RemarksList[col].Date);
                            paramFSH.Add("@Remark", obj.RemarksList[col].Remark);
                            if (!string.IsNullOrEmpty(obj.RemarksList[col].Remark))
                            {
                                con.Execute(GenericSP.InsertStimulationRemark, paramFSH, commandType: CommandType.StoredProcedure);
                            }
                        }
                        //Physician
                        for (int col = 0; col < obj.LatestDoctors.Count; col++)
                        {
                            var paramFSH = new DynamicParameters();
                            paramFSH.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            paramFSH.Add("@Date", obj.LatestDoctors[col].date);
                            paramFSH.Add("@Name", obj.LatestDoctors[col].Name);
                            paramFSH.Add("@UserID", obj.LatestDoctors[col].LoggedUserID);
                            if (!string.IsNullOrEmpty(obj.LatestDoctors[col].Name))
                            {
                                con.Execute(GenericSP.InsertStimulationPhysician, paramFSH, commandType: CommandType.StoredProcedure);
                            }
                        }
                        //Drug Administrator
                        for (int col = 0; col < obj.DoctorNameList.Count; col++)
                        {
                            var paramFSH = new DynamicParameters();
                            paramFSH.Add("@StimulationID", Convert.ToInt32(ResultStatus));
                            paramFSH.Add("@DrugDate", obj.DoctorNameList[col].date);
                            paramFSH.Add("@Inhouse", obj.DoctorNameList[col].Inhouse);
                            paramFSH.Add("@Outside", obj.DoctorNameList[col].Outside);
                            paramFSH.Add("@DrugAdminID", obj.DoctorNameList[col].DrugAdminID);
                            paramFSH.Add("@DrugAdminName", obj.DoctorNameList[col].DoctorName);
                            if (obj.DoctorNameList[col].IsChecked)
                            {
                                con.Execute(GenericSP.InsertStimulationDrugAdministration, paramFSH, commandType: CommandType.StoredProcedure);
                            }
                        }
                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }

                transactionScope.Complete();
                return Convert.ToInt32(OperationStatus);

            }
        }

        public int DeleteDrugWithReason(int drugID, int stimulationID, string reason)
        {
            var param = new DynamicParameters();
            param.Add("@drugID", drugID);
            param.Add("@stimulationID", stimulationID);
            param.Add("@reason", reason);
            return con.Execute(GenericSP.DeleteStimulationDrug, param, commandType: CommandType.StoredProcedure);
        }
        public List<RiPsvDetails> GetRIPSV(DateTime date,string size)
        {
            var param = new DynamicParameters();
            param.Add("@Date", date);
            param.Add("@Size", size);
            param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            return con.Query<RiPsvDetails>(GenericSP.GetRIPSV, param, commandType: CommandType.StoredProcedure).ToList();
            
        }
        public GraphData GetGraphData()
        {
            var Param = new DynamicParameters();
            GraphData obj = new GraphData(); 
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@CopuleID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@CopuleUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
            var QueryMultiple = this.con.QueryMultiple(GenericSP.GetGraphData, Param, commandType: CommandType.StoredProcedure);

            obj.harmones = QueryMultiple.Read<HarmonalData>().ToList();
            obj.follicleSizeDetails= QueryMultiple.Read<FollicleSizeDetials>().ToList();
            return obj;

        }
    }
}
