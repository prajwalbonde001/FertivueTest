using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.ARTMgmt.Outcome;
using PIVF.Entities.Models.ARTMgmt.Outcome;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace PIVF.DataAccessLayer.ARTMgmt.Outcome
{
    public class OutcomeDAL: OutcomeBL
    {
        private Database dbServer = null;
        IDbConnection con;
        public OutcomeDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public int SaveOutcome(OutcomeVO obj)
        {
            using (var transactionScope = new TransactionScope())
            {
                int ID = 0;
                //int ResultStatus = 0;
                int Status = 0;
                var Param = new DynamicParameters();
                Param.Add("@Action", "SaveOutcome");  
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);              
                Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                Param.Add("@DateOfObservation", obj.DateOfObservation);
                Param.Add("@NoOfSacs", obj.NoOfSacs);
                Param.Add("@Complications", obj.Complications);
                Param.Add("@IsCycleClose", obj.IsCycleClose);
                Param.Add("@Remark", obj.Remark);
                Param.Add("@DeliveryID", obj.DeliveryID);
                Param.Add("@DeliveryTypeID", obj.DeliveryTypeID);
                Param.Add("@WeaksOfgestation", obj.WeaksOfgestation);
                if (!string.IsNullOrEmpty(Convert.ToString(obj.GeneticAnalysisReportImage)))
                {
                    obj.FinalGeneticAnalysisReportImage = System.Text.Encoding.UTF8.GetBytes(obj.GeneticAnalysisReportImage);
                }
                else
                {
                    obj.FinalGeneticAnalysisReportImage = System.Text.Encoding.UTF8.GetBytes("");
                }

                Param.Add("@FinalGeneticAnalysisReportImage", obj.FinalGeneticAnalysisReportImage);
                Param.Add("@GeneticAnalysisReportFileName", obj.GeneticAnalysisReportFileName);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedWindowsLoginName", Environment.UserName);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                Param.Add("@ID", obj.ID, dbType: DbType.Int32, direction: ParameterDirection.InputOutput);

                this.con.Query<int>(GenericSP.Outcome, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                Status = Param.Get<Int32>("@ResultStatus");
                ID = Param.Get<int>("@ID");
                
                if (ID > 0)
                {
                    var Param1D = new DynamicParameters();
                    Param1D.Add("@Action", "DeleteBHCG");
                    Param1D.Add("@OutcomeID", ID);
                    Param1D.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    this.con.Query<int>(GenericSP.Outcome, Param1D, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    foreach (BHCG item in obj.lstBHCG)
                    {
                        var Param1 = new DynamicParameters();
                        Param1.Add("@Action", "SaveBHCG");
                        Param1.Add("@ID", item.ID);
                        Param1.Add("@OutcomeID", ID);
                        Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@Title", item.BHCGTitle);
                        Param1.Add("@BHCGDate", item.HCGDate);
                        Param1.Add("@Result", item.Result);
                        Param1.Add("@TransferToID", item.TransferToID);    //Added by Nayan Kamble
                        Param1.Add("@IsPositive", item.IsPositive);
                        Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param1.Add("@AddedOn", Environment.MachineName);
                        Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        this.con.Query<int>(GenericSP.Outcome, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        Status = Param1.Get<Int32>("@ResultStatus");
                    }
                }
                if (Status > 0 && obj.lstUSG.Count>0)
                {
                    var ParamUSG = new DynamicParameters();
                    ParamUSG.Add("@Action", "DeleteUSG");
                    ParamUSG.Add("@OutcomeID", ID);
                    ParamUSG.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    this.con.Query<int>(GenericSP.Outcome, ParamUSG, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    foreach (USG i in obj.lstUSG)
                    {
                        var Param2 = new DynamicParameters();
                        Param2.Add("@Action", "SaveUSG");
                        Param2.Add("@ID", i.ID);
                        Param2.Add("@OutcomeID", ID);
                        Param2.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param2.Add("@Title", i.SacTitle);
                        Param2.Add("@IsFetalHeart", i.IsFetalHeart);
                        Param2.Add("@PregOutcomeID", i.OutcomeID);
                        Param2.Add("@Remark", i.USGRemark);
                        Param2.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param2.Add("@AddedOn", Environment.MachineName);
                        Param2.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param2.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        this.con.Query<int>(GenericSP.Outcome, Param2, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        Status = Param2.Get<Int32>("@ResultStatus");
                    }
                }
                if (Status > 0 && obj.lstBirthDetail.Count > 0)
                {
                    foreach (BirthDetail i in obj.lstBirthDetail)
                    {
                        var Param3 = new DynamicParameters();
                        Param3.Add("@Action", "SaveBirthDetail");
                        Param3.Add("@ID", i.ID);
                        Param3.Add("@OutcomeID", ID);
                        Param3.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param3.Add("@Title", i.Child);
                        Param3.Add("@GrimaceID", i.GrimaceID);
                        Param3.Add("@ActivityID", i.ActivityID);
                        Param3.Add("@PulseID", i.PulseID);
                        Param3.Add("@IsCongiAbnorm", i.IsCongiAbnorm);
                        Param3.Add("@AppearanceID", i.AppearanceID);
                        Param3.Add("@RespirationID", i.RespirationID);
                        Param3.Add("@Remark", i.Remark);
                        Param3.Add("@Score", i.Score);
                        Param3.Add("@TransferToID", i.TransferToID);  //Added by Nayan Kamble
                        Param3.Add("@BirthWeight", i.BirthWeight);
                        Param3.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param3.Add("@AddedOn", Environment.MachineName);
                        Param3.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param3.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        this.con.Query<int>(GenericSP.Outcome, Param3, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        Status = Param3.Get<Int32>("@ResultStatus");
                    }
                }
                transactionScope.Complete();
                return Status;
            }
            
        }

        public int SaveBirthDetail(OutcomeVO obj)
        {
            using (var transactionScope = new TransactionScope())
            {
                int Status = 0;
                var Param = new DynamicParameters();
                Param.Add("@Action", "SaveBirthDetailInto_T_OutCome");
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@OutcomeID", obj.ID);
                Param.Add("@DeliveryID", obj.DeliveryID);
                Param.Add("@DeliveryTypeID", obj.DeliveryTypeID);
                Param.Add("@WeaksOfgestation", obj.WeaksOfgestation);
                Param.Add("@IsCycleClose", obj.IsCycleClose);
                Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Query<int>(GenericSP.Outcome, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                Status = Param.Get<Int32>("@ResultStatus");
              
                if (Status == 1 && obj.lstBirthDetail.Count > 0)
                {
                    foreach (BirthDetail i in obj.lstBirthDetail)
                    {
                        var Param3 = new DynamicParameters();
                        Param3.Add("@Action", "SaveBirthDetail");
                        Param3.Add("@OutcomeID", obj.ID);
                        Param3.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param3.Add("@Title", i.Child);
                        Param3.Add("@GrimaceID", i.GrimaceID);
                        Param3.Add("@ActivityID", i.ActivityID);
                        Param3.Add("@PulseID", i.PulseID);
                        Param3.Add("@IsCongiAbnorm", i.IsCongiAbnorm);
                        Param3.Add("@AppearanceID", i.AppearanceID);
                        Param3.Add("@RespirationID", i.RespirationID);
                        Param3.Add("@Remark", i.Remark);
                        Param3.Add("@Score", i.Score);
                        Param3.Add("@BirthWeight", i.BirthWeight);
                        Param3.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param3.Add("@AddedOn", Environment.MachineName);
                        Param3.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param3.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        this.con.Query<int>(GenericSP.Outcome, Param3, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        Status = Param3.Get<Int32>("@ResultStatus");
                    }
                }
                transactionScope.Complete();
                return Status;
            }

        }

        public string GetPregnancydate()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPregnancyDate");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
           
            return this.con.Query<string>(GenericSP.Outcome, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public string GetETPregnancydate()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetETPregnancydate");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);

            return this.con.Query<string>(GenericSP.Outcome, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public OutcomeVO GetOutcomeDetails()
        {
            OutcomeVO obj = new OutcomeVO();
            obj.lstBHCG = new List<BHCG>();
            obj.lstUSG = new List<USG>();
            //obj.lstMainUSG = new List<MainUSG>();
            obj.lstBirthDetail = new List<BirthDetail>();
            obj.lstSurrogate = new List<SurrogateList>();  //Added by Nayan Kamble
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetOutcomeDetails");
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            var multi= this.con.QueryMultiple(GenericSP.Outcome, Param, commandType: CommandType.StoredProcedure);
            obj = multi.Read<OutcomeVO>().FirstOrDefault();
            if(obj != null)
            {
                obj.lstBHCG = multi.Read<BHCG>().ToList();
                obj.lstUSG = multi.Read<USG>().ToList();
                //obj.lstMainUSG = multi.Read<MainUSG>().ToList();
                obj.lstBirthDetail = multi.Read<BirthDetail>().ToList();
                obj.lstSurrogate = multi.Read<SurrogateList>().ToList();  //Added by Nayan Kamble
            }  
            else
            {
                //Added by Nayan Kamble
                obj = new OutcomeVO();
                obj.lstBHCG = multi.Read<BHCG>().ToList();
                obj.lstUSG = multi.Read<USG>().ToList();
               // obj.lstMainUSG = multi.Read<MainUSG>().ToList();
                obj.lstBirthDetail = multi.Read<BirthDetail>().ToList();
                obj.lstSurrogate = multi.Read<SurrogateList>().ToList();
                obj.lstBHCG = new List<BHCG>();
                obj.lstUSG = new List<USG>();
               // obj.lstMainUSG = new List<MainUSG>();
                obj.lstBirthDetail = new List<BirthDetail>();
                //obj.lstSurrogate = new List<SurrogateList>();   
            }
            if (obj.FinalGeneticAnalysisReportImage != null)
            {
                obj.GeneticAnalysisReportImage= System.Text.Encoding.UTF8.GetString(obj.FinalGeneticAnalysisReportImage);
            }       
            return obj;
        }

        //Added byNayan Kamble
        public int UnLinkSurrogate()
        {
            var Param = new DynamicParameters();
            int Status = 0;
            Param.Add("@Action", "UnLinkSurrogate");
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Outcome, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            Status = Param.Get<Int32>("@ResultStatus");
            return Status;
        }
    }
}
