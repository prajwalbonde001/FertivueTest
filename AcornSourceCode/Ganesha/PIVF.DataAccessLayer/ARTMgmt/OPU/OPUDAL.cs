using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.ARTMgmt.OPU;
using PIVF.Entities.Models.ARTMgmt.OPU;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.ARTMgmt.OPU
{
    public class OPUDAL: OPUBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public OPUDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public int SaveOPU(OPUVO objOPU)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "SaveOPU");
            Param.Add("@ID", objOPU.ID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
            Param.Add("@StartDate", objOPU.StartDate);
            Param.Add("@StartTime", objOPU.StartTime);
            Param.Add("@EndTime", objOPU.EndTime);
            Param.Add("@ClinicianID", objOPU.ClinicianID);
            Param.Add("@EmbryologistID", objOPU.EmbryologistID);
            Param.Add("@WitEmbryologistID", objOPU.WitEmbryologistID);
            Param.Add("@AnesthetiaTypeID", objOPU.AnesthetiaTypeID);
            Param.Add("@AnesthetistID", objOPU.AnesthetistID);
            Param.Add("@IsPreAnesthesiaChecked", objOPU.IsPreAnesthesiaChecked);
            Param.Add("@TypeOfNeedleID", objOPU.TypeOfNeedleID);
            Param.Add("@NeedleSubTypeID", objOPU.NeedleSubTypeID);
            Param.Add("@OptimumFolicleLeftOvry", objOPU.OptimumFolicleLeftOvry);
            Param.Add("@OptimumFolicleRightOvry", objOPU.OptimumFolicleRightOvry);
            Param.Add("@LevelOfDifficultyID", objOPU.LevelOfDifficultyID);
            Param.Add("@ProcedureFindings", objOPU.ProcedureFindings);
            Param.Add("@IsFinalize", objOPU.IsFinalize);
            Param.Add("@TriggerDate", objOPU.TriggerDate);
            Param.Add("@TriggerTime", objOPU.TriggerTime);
            Param.Add("@Remark", objOPU.Remark);
            Param.Add("@OocytesRetrieved", objOPU.OocytesRetrieved ?? 0);
            Param.Add("@Reason", objOPU.Reason);
            Param.Add("@NeedlesUsed", objOPU.NeedlesUsed);
            Param.Add("@CancelReasonID", objOPU.CancelReasonID);
            Param.Add("@IsCycleCancel", objOPU.IsCycleCancel);
            Param.Add("@CloseCycleCancellation", objOPU.CloseCycleCancellation);
            Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

            using (var con = dbServer.CreateConnection()) // Ensure connection is created fresh
            {
                con.Open(); // Explicitly open the connection

                this.con.Query<int>(GenericSP.OPU, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                Status = Param.Get<Int32>("@ResultStatus");

                if (Status == 1)
                {
                    long oocytesRetrieved = objOPU.OocytesRetrieved ?? 0;
                    if (oocytesRetrieved > 0)
                    {
                        using (var transaction = con.BeginTransaction()) // Begin transaction
                        {
                            try
                            {
                                for (int i = 0; i < oocytesRetrieved; i++)
                                {
                                    var Param2 = new DynamicParameters();
                                    Param2.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID, DbType.Int64);
                                    Param2.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID, DbType.Int64);
                                    Param2.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID, DbType.Int64);
                                    Param2.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID, DbType.Int64);
                                    Param2.Add("@OocyteNumber", i + 1, DbType.Int64);
                                    Param2.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Param2.Add("@OocyteDonorID", 0, DbType.Int64);
                                    Param2.Add("@OocyteDonorUnitID", 0, DbType.Int64);
                                    Param2.Add("@ID", 0, DbType.Int64);
                                    con.Execute(GenericSP.IVFDashBoard_AddDay0OocList, Param2, commandType: CommandType.StoredProcedure, transaction: transaction);

                                    var Param3 = new DynamicParameters();
                                    Param3.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID, DbType.Int64);
                                    Param3.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID, DbType.Int64);
                                    Param3.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID, DbType.Int64);
                                    Param3.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID, DbType.Int64);
                                    Param3.Add("@Day0", true, DbType.Boolean);
                                    Param3.Add("@OocyteNumber", i + 1, DbType.Int64);
                                    Param3.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Param3.Add("@ID", 0, DbType.Int64);
                                    con.Execute(GenericSP.USP_IVFDashBoard_AddDay0OocListInGhaphicalRepresentationTable, Param3, commandType: CommandType.StoredProcedure, transaction: transaction);
                                }

                                transaction.Commit(); // Commit the transaction
                            }
                            catch (Exception)
                            {
                                transaction.Rollback(); // Rollback in case of an error
                                throw;
                            }
                        }
                    }
                }
            }
            return Status;
        }


        public TriggrData GetTriggerData()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetTrigerData");
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<TriggrData>(GenericSP.OPU, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public OPUVO GetOPUData()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetOPUData");
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<OPUVO>(GenericSP.OPU, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public bool IsStimulationFinalize()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "CheckIsStimulationFinalize");
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<bool>(GenericSP.OPU, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public int IsOPUFinalize()
        {
           
            var Param = new DynamicParameters();
            Param.Add("@Action", "CheckIsPAC");
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<int>(GenericSP.OPU, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
           
        }
    }
}
