using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.PatientDashboard;
using PIVF.Entities.Models.FertivueDashboard;
using PIVF.Entities.Models.PatientDashboard;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PIVF.DataAccessLayer.PatientDashboard

{
    public class PatientDashboardDAL : PatientDashboardBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public PatientDashboardDAL()

        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }



        public List<PatientDashboardClass> GetTriggerList(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetTriggerList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<PatientDashboardClass> GetOPUList(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetOPUList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<PatientDashboardClass> GetETList(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetETList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<PatientDashboardClass> GetPatientUnderStimulation(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientUnderStimulation");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetPatientTriggerCount(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientTriggerCount");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public Trends GetRemainingOPUList(DateTime? FromDate, DateTime? ToDate)
        {
            var param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);

            var res = this.con.Query<Dashboardcount>(GenericSP.GetRemainingOPUCount, param, commandType: CommandType.StoredProcedure).ToList();

            Trends trn = new Trends();

            List<string> lab = new List<string>();
            List<long> data = new List<long>();
            foreach (var item in res)
            {
                lab.Add(item.Label);
                data.Add(item.Data);

            }
            List<BarchartData> BArcahrt = new List<BarchartData>();
            BarchartData bar = new BarchartData();
            bar.Dashboard = "Registration Trends";
            bar.Data = data;
            BArcahrt.Add(bar);
            trn.BarChart = lab;
            trn.BarData = BArcahrt;

            return trn;
        }

        public List<PatientDashboardClass> GetDay0Patient(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay0Patient");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<PatientDashboardClass> GetDay1Patient(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay1Patient");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetDay2Patient(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay2Patient");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetDay3Patient(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay3Patient");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetDay4Patient(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay4Patient");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<PatientDashboardClass> GetDay5Patient(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay5Patient");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetDay6Patient(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay6Patient");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetBHCGList(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetBHCGList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetUCGList(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetUCGList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetPregnancyTestPatient(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPregnancyTestPatient");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<PatientDashboardClass> GetPregnancyUltrasound(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPregnancyUltrasound");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientDashboardClass> GetPregnancyOutcome(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPregnancyOutcome");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }



        public List<PatientDashboardClass> StimulationPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetStimulationPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        //public List<PatientDashboardClass> StimulationPatientList(long UnitID)   // long PatientID, long UnitID, long PatientUnitID       
        //{
        //    var Param = new DynamicParameters();
        //    //Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
        //   // Param.Add("@PatientId", PatientID);
        //    Param.Add("@UnitID", UnitID);
        //   // Param.Add("@PatientUnitID", PatientUnitID);  

        //    return this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
        //}

        public List<PatientDashboardClass> TriggerPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "TriggerPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetDay0PatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay0PatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }
        public List<PatientDashboardClass> GetDay1PatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay1PatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetDay2PatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay2PatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetDay3PatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay3PatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetDay4PatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay4PatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetDay5PatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay5PatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetDay6PatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDay6PatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetPregnancyTestPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPregnancyTestPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetPregnancyUltrasoundPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPregnancyUltrasoundPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetPregnancyOutcomePatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPregnancyOutcomePatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetETPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetETPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetTriggerPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetTriggerPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetOPUPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetOPUPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetBHCGPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetBHCGPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientDashboardClass> GetUSGPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetUSGPatientList");
            Param.Add("@IdColumnName", "ID");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<PatientDashboardClass> lstTask = new List<PatientDashboardClass>();
            lstTask = this.con.Query<PatientDashboardClass>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = Param.Get<Int32>("@TotalRows");
            }
            return lstTask;
        }

        public List<PatientList> GetRemainingOPUPatientList(DateTime? FromDate, DateTime? ToDate)

        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetRemainingOPUPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }


        public List<PatientDashboardClass> GetVisitTypeList(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetVisitTypeList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PatientDashboardClass>(GenericSP.usp_PatientDashboard, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PatientList> GetVisitTypePatientList(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetVisitTypePatientList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.usp_DashboardPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }

    }
}
