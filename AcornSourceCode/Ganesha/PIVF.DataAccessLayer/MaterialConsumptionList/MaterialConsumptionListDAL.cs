
using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.MaterialConsumptionList;
using PIVF.Entities.Models.MaterialConsumption;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.MaterialConsumptionList
{
    public class MaterialConsumptionListDAL: MaterialConsumptionListBAL
    {
        private Database dbServer = null;
        IDbConnection con;

     
        public MaterialConsumptionListDAL()

        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public List<clsMaterialConsumptionVO> GetMaterialConsupmtionList(string[] ConsupmtionList, int index, bool PgEn)
        {
            List<clsMaterialConsumptionVO> List = new List<clsMaterialConsumptionVO>();
            var Param = new DynamicParameters();
            Param.Add("@PageIndex", index);
            Param.Add("@PagingEnabled", PgEn);
            Param.Add("@StoreID", ConsupmtionList[0]);
            Param.Add("@FromDate", ConsupmtionList[1]);
            Param.Add("@ToDate", ConsupmtionList[2]);
            Param.Add("@FirstName", ConsupmtionList[3]);
            Param.Add("@MiddleName", ConsupmtionList[4]);
            Param.Add("@LastName", ConsupmtionList[5]);
            Param.Add("@MRNo", ConsupmtionList[6]);
            Param.Add("@ConsumptionNo", ConsupmtionList[7]);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            // obj = this.con.Query<clsMaterialConsumptionItemDetailsVO>(GenericSP.GetMaterialConsumptionItemList, Param, commandType: CommandType.StoredProcedure).AsList();
            List = this.con.Query<clsMaterialConsumptionVO>(GenericSP.GetMaterialConsumption, Param, commandType: CommandType.StoredProcedure).ToList();

            return List;
        }

        public List<clsMaterialConsumptionItemDetailsVO> GetMaterialConsumptionItemList(long MaterialConsumptionID, long MaterialConsumptionUnitID)
        {
            List<clsMaterialConsumptionItemDetailsVO> List = new List<clsMaterialConsumptionItemDetailsVO>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", MaterialConsumptionUnitID);
            Param.Add("@ConsumptionID", MaterialConsumptionID);


           // obj = this.con.Query<clsMaterialConsumptionItemDetailsVO>(GenericSP.GetMaterialConsumptionItemList, Param, commandType: CommandType.StoredProcedure).AsList();
           List = this.con.Query<clsMaterialConsumptionItemDetailsVO>(GenericSP.GetMaterialConsumptionItemList, Param, commandType: CommandType.StoredProcedure).ToList();

            return List;
        }

        public UOMConversionVO GetUOMConcersionFactor(long BatchID, long ItemID, long FromUOMID, long ToUOMID)
        {
            UOMConversionVO uom = null;
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@BatchID", BatchID);
            Param.Add("@ItemID", ItemID);
            Param.Add("@FromUOMID", FromUOMID);
            Param.Add("@ToUOMID", ToUOMID);
            uom = con.QueryFirstOrDefault<UOMConversionVO>(GenericSP.GetUOMConversionFactor, Param, commandType: CommandType.StoredProcedure);
            return uom;
        }
    }
}
