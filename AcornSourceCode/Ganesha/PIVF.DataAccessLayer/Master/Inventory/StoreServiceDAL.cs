using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.Master.Inventory;
using PIVF.Entities.Models.Master.Inventory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.Master.Inventory
{
    public class StoreServiceDAL : IStoreService
    {
        private Database dbServer = null;
        IDbConnection Con;

        public StoreServiceDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }

        public List<StoreMaster> GetStoreList(StoreMaster obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetStoreList");
            Param.Add("@PagingEnabled",obj.IsPagingEnable);
            Param.Add("@PageIndex", obj.Pgindx);
            Param.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@UnitID", obj.ClinicId);
            Param.Add("@SearchExpression",obj.SearchExp);
            Param.Add("StoreType", obj.StoreType);

            List<StoreMaster> tmpList = new List<StoreMaster>();

            var MultiQuery = this.Con.QueryMultiple(GenericSP.StoreMaster, Param, commandType: CommandType.StoredProcedure);
            tmpList = MultiQuery.Read<StoreMaster>().ToList();

            if (tmpList.Count > 0)
                tmpList[0].TotalCount = Param.Get<int>("@TotalCount");

            tmpList.Insert(0, new StoreMaster { ID = 0, Description = "Select" });

            return tmpList;
        }

    }
}
