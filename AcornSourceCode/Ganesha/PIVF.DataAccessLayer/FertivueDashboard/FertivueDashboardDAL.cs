using System;
using System.Collections.Generic;
using System.Linq;
using PIVF.BusinessLayer.FertivueDashboard;
using PIVF.Entities.Models.FertivueDashboard;
using Dapper;
using Microsoft.Practices.EnterpriseLibrary.Data;
using DataBaseConfiguration;
using System.Data;

namespace PIVF.DataAccessLayer.FertivueDashboad
{
    public class FertivueDashboardDAL : FertivueDashboardBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public FertivueDashboardDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public Trends GetRegistrationDashboardByTrendsCount(DateTime? FromDate, DateTime? ToDate)
        {
            var param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);

            var res = this.con.Query<Dashboardcount>(GenericSP.GetRegistrationDashboardByTrendCount, param, commandType: CommandType.StoredProcedure).ToList();

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

        public Trends GetRegistrationDashboardByAgeGroupCount(DateTime? FromDate, DateTime? ToDate)
        {
            var param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);

            var res = this.con.Query<Dashboardcount>(GenericSP.GetRegistrationDashboardByAgeGroupCount, param, commandType: CommandType.StoredProcedure).ToList();

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

        public Trends GetAppointmentDashboardCount(DateTime? FromDate, DateTime? ToDate, string AppType = null)
        {
            DynamicParameters param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);
            param.Add("@AppType", AppType);

            var res = this.con.Query<Dashboardcount>(GenericSP.GetAppointmentDashboardCount, param, commandType: CommandType.StoredProcedure).ToList();

            Trends trn = new Trends();
            List<string> lab = new List<string>();
            List<long> data = new List<long>();

            if (AppType.Contains("Type"))
            {
                foreach (var item in res)
                {
                    lab.Add(item.Label);
                    data.Add(item.Data);

                }
                List<BarchartData> BArcahrt = new List<BarchartData>();
                BarchartData bar = new BarchartData();
                bar.Dashboard = "Type";
                bar.Data = data;
                BArcahrt.Add(bar);
                trn.BarChart = lab;
                trn.BarData = BArcahrt;
            }
            else if (AppType.Contains("Department"))
            {
                foreach (var item in res)
                {
                    lab.Add(item.Label);
                    data.Add(item.Data);

                }
                List<BarchartData> BArcahrt = new List<BarchartData>();
                BarchartData bar = new BarchartData();
                bar.Dashboard = "Department";
                bar.Data = data;
                BArcahrt.Add(bar);
                trn.BarChart = lab;
                trn.BarData = BArcahrt;
            }

            return trn;
        }

        public ChartData GetInvestigationDashboardCount(DateTime? FromDate, DateTime? ToDate)
        {
            DynamicParameters param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);


            var res = this.con.Query<DashboardcountInvestigation>(GenericSP.GetInvestigationDashboardCount, param, commandType: CommandType.StoredProcedure).ToList();

            // Initialize lists for each dataset
            var totalData = new List<long>();
            var billedData = new List<long>();
            var completedData = new List<long>();
            var labels = new List<string>();

            // Populate data
            foreach (var item in res)
            {
                if (!labels.Contains(item.Label))
                    labels.Add(item.Label);

                switch (item.Type)
                {
                    case "Total":
                        totalData.Add(item.Count);
                        break;
                    case "Billed":
                        billedData.Add(item.Count);
                        break;
                    case "Completed":
                        completedData.Add(item.Count);
                        break;
                }
            }

            // Prepare the final JSON structure
            var datasets = new List<BarDataset>
            {
                new BarDataset
                {
                    Data = totalData,
                    Label = "Total",
                    BackgroundColor = "#4D4D4D",
                    BorderColor = "#fff",
                    BarThickness = 30,
                    HoverBackgroundColor = "#4D4D4D",
                    BorderWidth = 5,
                    HoverBorderColor = "#4D4D4D"
                },
                new BarDataset
                {
                    Data = billedData,
                    Label = "Billed",
                    BackgroundColor = "#A3A3A3",
                    BarThickness = 30,
                    HoverBackgroundColor = "#A3A3A3",
                    HoverBorderColor = "#A3A3A3"
                },
                new BarDataset
                {
                    Data = completedData,
                    Label = "Completed",
                    BackgroundColor = "#FFDADA",
                    BarThickness = 30,
                    HoverBackgroundColor = "#FFDADA",
                    HoverBorderColor = "#FFDADA"
                }
            };

            var barChartData = new ChartData
            {
                Labels = labels,
                Datasets = datasets
            };

            return barChartData;

        }

        public BillingData GetBillingDashboardCount(DateTime? FromDate, DateTime? ToDate, string Breakdown = null)
        {
            DynamicParameters param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);
            param.Add("@Breakdown", Breakdown);

            var res = this.con.Query<Billingcount>(GenericSP.GetBillingDashboardCount, param, commandType: CommandType.StoredProcedure).ToList();

            BillingData trn = new BillingData();
            List<string> lab = new List<string>();
            List<float> data = new List<float>();
            List<string> unit = new List<string>();

            if (Breakdown.Contains("Collection"))
            {
                foreach (var item in res)
                {
                    lab.Add(item.Label);
                    data.Add(item.Data);
                    unit.Add(item.Value);

                }
                List<BillingBarchartData> BArcahrt = new List<BillingBarchartData>();
                BillingBarchartData bar = new BillingBarchartData();
                bar.Dashboard = "Collection Breakdown";
                bar.Data = data;
                BArcahrt.Add(bar);
                trn.BarChart = lab;
                trn.BarData = BArcahrt;
                trn.Units = unit;
            }
            else if (Breakdown.Contains("Charges"))
            {
                foreach (var item in res)
                {
                    lab.Add(item.Label);
                    data.Add(item.Data);
                    unit.Add(item.Value);

                }
                List<BillingBarchartData> BArcahrt = new List<BillingBarchartData>();
                BillingBarchartData bar = new BillingBarchartData();
                bar.Dashboard = "Charges Breakdown";
                bar.Data = data;
                BArcahrt.Add(bar);
                trn.BarChart = lab;
                trn.BarData = BArcahrt;
                trn.Units = unit;
            }

            return trn;
        }

        public BillingData GetTotalRevenueDashboardServiceTypeCount(DateTime? FromDate, DateTime? ToDate)
        {
            DynamicParameters param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);

            var res = this.con.Query<Billingcount>(GenericSP.GetTotalRevenueDashboardServiceTypeCount, param, commandType: CommandType.StoredProcedure).ToList();

            BillingData trn = new BillingData();
            List<string> lab = new List<string>();
            List<float> data = new List<float>();
            List<string> unit = new List<string>();


            foreach (var item in res)
            {
                lab.Add(item.Label);
                data.Add(item.Data);
                unit.Add(item.Value);

            }
            List<BillingBarchartData> BArcahrt = new List<BillingBarchartData>();
            BillingBarchartData bar = new BillingBarchartData();
            bar.Dashboard = "Collection Breakdown";
            bar.Data = data;
            BArcahrt.Add(bar);
            trn.BarChart = lab;
            trn.BarData = BArcahrt;
            trn.Units = unit;


            return trn;
        }


        public Trends GetToDoListDashboardCount(DateTime? FromDate, DateTime? ToDate)
        {
            var param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);

            var res = this.con.Query<Dashboardcount>(GenericSP.GetToDoListDashboardCount, param, commandType: CommandType.StoredProcedure).ToList();

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
            bar.Dashboard = "ToDoList";
            bar.Data = data;
            BArcahrt.Add(bar);
            trn.BarChart = lab;
            trn.BarData = BArcahrt;

            return trn;
        }

        public Trends GetFootFallDashboardCount(DateTime? FromDate, DateTime? ToDate)
        {
            var param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);

            var res = this.con.Query<Dashboardcount>(GenericSP.GetFootFallDashboardCount, param, commandType: CommandType.StoredProcedure).ToList();

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
            bar.Dashboard = "FootFall";
            bar.Data = data;
            BArcahrt.Add(bar);
            trn.BarChart = lab;
            trn.BarData = BArcahrt;

            return trn;
        }

        public List<PatientList> GetRegistrationDashboardByTrendPatientList(DateTime? FromDate, DateTime? ToDate, string Type = null)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@Type", Type);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetRegistrationDashboardByTrendPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }

        public List<PatientList> GetRegistrationDashboardByAgeGroupPatientList(DateTime? FromDate, DateTime? ToDate)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetRegistrationDashboardByAgeGroupPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }

        public List<PatientList> GetAppointmentDashboardPatientList(DateTime? FromDate, DateTime? ToDate, string AppType = null)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@AppType", AppType);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetAppointmentDashboardPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }

        public List<PatientList> GetInvestigationDashboardPatientLiast(DateTime? FromDate, DateTime? ToDate, string Specialization = null)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            //Param.Add("@Type", Type);
            Param.Add("@Specialization", Specialization);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetInvestigationDashboardPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }

        public List<PatientList> GetBillingDashboardPatientList(DateTime? FromDate, DateTime? ToDate, string Breakdown = null)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@Breakdown", Breakdown);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetBillingDashboardPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }

        public List<PatientList> GetTotalRevenueDashboardServiceTypePatientList(DateTime? FromDate, DateTime? ToDate, string Specialization = null)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@Specialization", Specialization);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetTotalRevenueDashboardServiceTypePatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }

        public List<PatientList> GetToDoListDashboardPatientList(DateTime? FromDate, DateTime? ToDate, string Type = null)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@Type", Type);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetToDoListDashboardPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }
        public List<PatientList> GetFootFallDashboardPatientList(DateTime? FromDate, DateTime? ToDate, string Type = null)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@Type", Type);
            List<PatientList> lstTask = new List<PatientList>();
            lstTask = this.con.Query<PatientList>(GenericSP.GetFootFallDashboardPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (lstTask != null && lstTask.Count > 0)
            {
                lstTask[0].TotalCount = lstTask.Count;
            }
            return lstTask;
        }

        public List<Datasetvo> GetAdminDashboardPercentageCounts(DateTime? FromDate, DateTime? ToDate, DateTime? LastFromDate, DateTime? LastToDate)
        {
            var param = new DynamicParameters();

            param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            param.Add("@FromDate", FromDate);
            param.Add("@ToDate", ToDate);
            param.Add("@LastFromDate", LastFromDate);
            param.Add("@LastToDate", LastToDate);

            var res = this.con.Query<Datasetvo>(GenericSP.GetAdminDashboardPercentageCounts, param, commandType: CommandType.StoredProcedure).ToList();

            List<Datasetvo> trn = new List<Datasetvo>();


            foreach (var item in res)
            {

                Datasetvo dataset = new Datasetvo
                {
                    Label = item.Label,
                    Value = item.Value,
                    Percentage = item.Percentage,
                    Flag = item.Flag
                };
                trn.Add(dataset);

            }

            return trn;
        }


    }
}
