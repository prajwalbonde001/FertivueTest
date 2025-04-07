using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.BusinessLayer.KPI;
using PIVF.Entities.Models.KPI;
using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.QueueMgt;
using PIVF.Entities.Models.QueueMgt;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Globalization;

namespace PIVF.DataAccessLayer.KPI
{
    public class KPIDAL : KPIBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public KPIDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<KPIVO> KPISelf(string fromDate, string toDate, int UnitiId, int AgeMin,int AgeMax,int Fresh)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@Action", "Self");
            Param.Add("@ToDate", toDate);
            Param.Add("@UnitID", UnitiId);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@Fresh", Fresh);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.SelfPregnancySucessRateNew, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public List<KPIVO> KPIDonor(string fromDate, string toDate, int UnitiId,int AgeMin, int AgeMax, int Fresh)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@Action", "Donor");
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            Param.Add("@Fresh", Fresh);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.SelfPregnancySucessRateNew, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public List<KPIVO> KPIImplantationRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax,string Action,int Fresh)
        {
          
            var Param = new DynamicParameters();
           
                Param.Add("@FromDate", fromDate);
                Param.Add("@Action", Action);
                Param.Add("@ToDate", toDate);
                Param.Add("@AgeMin", AgeMin);
                Param.Add("@AgeMax", AgeMax);
                Param.Add("@UnitID", UnitiId);
                Param.Add("@Fresh", Fresh);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_ImplantationRate, Param, commandType: CommandType.StoredProcedure).AsList();
           
           
            return KPI;

        }
        public List<KPIVO> KPIClinicalPregnancyRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@Action", "Donor");
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_ClinicalPregnancyRate, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public List<KPIVO> KPICleavageRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_CleavageRate, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public List<KPIVO> KPILiveBirthRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax,string Action,int Fresh)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            Param.Add("@Action", Action);
            Param.Add("@Fresh", Fresh);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_LiveBirthRate, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public List<KPIVO> KPIBiochemicalPregnancyRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_BiochemicalPregnancyRate, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public List<KPIVO> KPIOnGoingPregnancyRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_OnGoingPregnancyRate, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public List<KPIVO> KPIFertilizationRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_FertilizationRate, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }

        public List<KPIVO> KPIGoodGradeRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_GoodGradeRate, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public List<KPIVO> KPIIUIPregnancySucessRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax, string Action)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", fromDate);
            Param.Add("@ToDate", toDate);
            Param.Add("@AgeMin", AgeMin);
            Param.Add("@AgeMax", AgeMax);
            Param.Add("@UnitID", UnitiId);
            Param.Add("@Action", Action);
          //  Param.Add("@Fresh", Fresh);
            List<KPIVO> KPI = new List<KPIVO>();
            KPI = this.con.Query<KPIVO>(GenericSP.KPI_rpt_IUIPregnancySucessRate, Param, commandType: CommandType.StoredProcedure).AsList();
            return KPI;

        }
        public int KPIPDF(KPIPDFVO Obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@FromDate", Obj.FromDate);
            Param.Add("@ToDate", Obj.ToDate);
            Param.Add("@AgeMin", Obj.AgeMin);
            Param.Add("@AgeMax", Obj.AgeMax);
            Param.Add("@UnitID", Obj.clinicID);
            Param.Add("@Action", "KPIImage");
            byte[] aa = System.Convert.FromBase64String(Obj.Image);
            Param.Add("@Image", aa);
            Param.Add("@Type", Obj.reportType);
            Param.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            //  Param.Add("@Fresh", Fresh);
            con.Execute(GenericSP.KPI_rpt_PDF, Param, commandType: CommandType.StoredProcedure);
            string ResultStatus = Param.Get<string>("@Result");
            int res = Convert.ToInt32(ResultStatus);
            int res1 = 0;
            if (res == 1)
            {
                for(int i = 0; i < Obj.KPIInsertData.Count; i++)
                {
                    Param.Add("@label", Obj.KPIInsertData[i].label);
                    Param.Add("@success", Obj.KPIInsertData[i].Success);
                    Param.Add("@total", Obj.KPIInsertData[i].Total);
                    Param.Add("@data", Obj.KPIInsertData[i].data);
                    Param.Add("@Action", "KPIData");
                    Param.Add("@I", i);
                    Param.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
                    con.Execute(GenericSP.KPI_rpt_PDF, Param, commandType: CommandType.StoredProcedure);
                    string ResultStatus1 = Param.Get<string>("@Result");
                     res1 = Convert.ToInt32(ResultStatus);

                }
            }

            return res1;

        }

    }
}
