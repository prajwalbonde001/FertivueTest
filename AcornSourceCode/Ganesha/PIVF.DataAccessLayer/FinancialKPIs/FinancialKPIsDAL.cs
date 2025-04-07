using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.FinancialKPIs;
using PIVF.Entities.Models.FinancialKPIs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.FinancialKPIs
{
    public class FinancialKPIsDAL: FinancialKPIsBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public FinancialKPIsDAL()

        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        /*---------------------------------------------------------------------------------------------------------------------------*/
        public List<FinancialKPIsVO> getPatientCountList(string FromDate, string ToDate, int UnitId)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientWiseList");
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@UnitID", UnitId);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<FinancialKPIsVO>(GenericSP.FinancialKPIsList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        /*---------------------------------------------------------------------------------------------------------------------------*/
        public List<FinancialKPIsVO> getPaymentModeWiseCollection(string FromDate, string ToDate, int UnitId)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPaymentModeWiseCollection");
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@UnitID", UnitId);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<FinancialKPIsVO>(GenericSP.FinancialKPIsList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        /*---------------------------------------------------------------------------------------------------------------------------*/
        public List<FinancialKPIsVO> getTodaysCollection(string FromDate, string ToDate, int UnitId)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetTodaysCollection");
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@UnitID", UnitId);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<FinancialKPIsVO>(GenericSP.FinancialKPIsList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        /*---------------------------------------------------------------------------------------------------------------------------*/
        public List<FinancialKPIsVO> getServiceOutStanding(string FromDate, string ToDate, int UnitId)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetServiceOutStanding");
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@UnitID", UnitId);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<FinancialKPIsVO>(GenericSP.FinancialKPIsList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        /*---------------------------------------------------------------------------------------------------------------------------*/
        public List<FinancialKPIsVO> getPharmacyOutStanding(string FromDate, string ToDate, int UnitId)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPharmacyOutStanding");
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@UnitID", UnitId);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<FinancialKPIsVO>(GenericSP.FinancialKPIsList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        /*---------------------------------------------------------------------------------------------------------------------------*/
        public List<FinancialKPIsVO> getSpecialityWiseRevenue(string FromDate, string ToDate, int UnitId)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetSpecialityWiseRevenue");
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@UnitID", UnitId);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<FinancialKPIsVO>(GenericSP.FinancialKPIsList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        /*---------------------------------------------------------------------------------------------------------------------------*/
    }
}
