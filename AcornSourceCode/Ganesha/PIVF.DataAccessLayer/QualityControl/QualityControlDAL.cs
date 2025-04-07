using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.QualityControl;
using PIVF.Entities.Models.QualityControl;
using System.Data;

namespace PIVF.DataAccessLayer.QualityControl
{
    public class QualityControlDAL : QualityControlBAL
    {
        private Database dbServer = null;
        IDbConnection con;

        public QualityControlDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public long SaveQualityControl(QualityControlVO Data)
        {
            int ResultStatus = 0;
            var Param = new DynamicParameters();
            try
            {
                Param.Add("@ID", Data.ID, DbType.Int64);
                Param.Add("@UnitId", GenericSP.CurrentUser.UnitID, DbType.Int64);
                Param.Add("@Date", Data.Date, DbType.DateTime);
                Param.Add("@Time", Data.Time, DbType.Time);
                //Param.Add("@ParameterID", Data.ParameterID, DbType.Int64);
                //Param.Add("@IncubatorID", Data.IncubatorID, DbType.Int64);
                if (Data.ParameterSelected != null && Data.ParameterSelected.Count() > 0)
                {
                    Param.Add("@ParameterID", Data.MParameterDecription = string.Join(",", Data.ParameterSelected.Select(a => a.id)), DbType.String);
                }
                else
                {
                    Param.Add("@ParameterID", "", DbType.String);
                }
                if (Data.IncubatorSelected != null && Data.IncubatorSelected.Count() > 0)
                {
                    Param.Add("@IncubatorID", Data.MIncubatorDecription = string.Join(",", Data.IncubatorSelected.Select(a => a.id)), DbType.String);
                }
                else
                {
                    Param.Add("@IncubatorID", "", DbType.String);
                }

                Param.Add("@HeraTemperature", Data.HeraTemperature, DbType.String);
                Param.Add("@HeraCO2", Data.HeraCO2, DbType.String);
                Param.Add("@WaterLevel", Data.WaterLevel, DbType.String);
                Param.Add("@MINCTemperature", Data.MINCTemperature, DbType.String);
                Param.Add("@Cleaning", Data.Cleaning, DbType.String);
                Param.Add("@MINCLevel", Data.MINCLevel, DbType.String);
                //Param.Add("@EquipmentsID", Data.EquipmentsID, DbType.Int64);
                if (Data.EquipmentSelected != null && Data.EquipmentSelected.Count() > 0)
                {
                    Param.Add("@EquipmentsID", Data.MEquipmentsDecription = string.Join(",", Data.EquipmentSelected.Select(a => a.id)), DbType.String);
                }
                else
                {
                    Param.Add("@EquipmentsID", "", DbType.String);
                }

                Param.Add("@LaminarTemperature", Data.LaminarTemperature, DbType.String);
                Param.Add("@HepaFilter", Data.HepaFilter, DbType.String);
                Param.Add("@Prefilter", Data.Prefilter, DbType.String);
                Param.Add("@ICSIStageTemperature", Data.ICSIStageTemperature, DbType.String);
                Param.Add("@TestTubeWarmerTemperature", Data.TestTubeWarmerTemperature, DbType.String);
                Param.Add("@GasCO2", Data.GasCO2, DbType.String);
                Param.Add("@N2", Data.N2, DbType.String);
                Param.Add("@Trigas", Data.Trigas, DbType.String);
                Param.Add("@Voe", Data.Voe, DbType.String);
                Param.Add("@AtmTemperature", Data.AtmTemperature, DbType.String);
                Param.Add("@AtmHumidity", Data.AtmHumidity, DbType.String);

                //Param.Add("@LiquidN2TanksID", Data.LiquidN2TanksID, DbType.Int64);
                if (Data.LiquidN2TankSelected != null && Data.LiquidN2TankSelected.Count() > 0)
                {
                    Param.Add("@LiquidN2TanksID", Data.MLiquidN2TanksDecription = string.Join(",", Data.LiquidN2TankSelected.Select(a => a.id)), DbType.String);
                }
                else
                {
                    Param.Add("@LiquidN2TanksID", "", DbType.String);
                }

                Param.Add("@LevelTank1", Data.LevelTank1, DbType.String);
                Param.Add("@LevelTank2", Data.LevelTank2, DbType.String);
                Param.Add("@RefrigTemperature", Data.RefrigTemperature, DbType.String);

                //Param.Add("@InfectionControlID", Data.InfectionControlID, DbType.Int64);

                if (Data.InfectionControlSelected != null && Data.InfectionControlSelected.Count() > 0)
                {
                    Param.Add("@InfectionControlID", Data.MInfectionControlDecription = string.Join(",", Data.InfectionControlSelected.Select(a => a.id)), DbType.String);
                }
                else
                {
                    Param.Add("@InfectionControlID", "", DbType.String);
                }

                Param.Add("@Swab1", Data.Swab1, DbType.String);
                Param.Add("@Swab2", Data.Swab2, DbType.String);
                Param.Add("@Swab3", Data.Swab3, DbType.String);

                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                //Param.Add("@AddedBy", GenericSP.CurrentUser.UserName, DbType.String);                
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                //Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                con.Query(GenericSP.AddUpdateQualityControl, Param, commandType: CommandType.StoredProcedure);
                ResultStatus = Param.Get<Int32>("@ResultStatus");
            }
            catch (Exception Ex)
            {
                ResultStatus = 0;
                throw Ex;
            }
            return ResultStatus;
        }

        public IEnumerable<QualityControlVO> GetQalityControl(int PageIndex)
        {
            var Param = new DynamicParameters();

            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PageIndex", PageIndex, DbType.Int64);
            Param.Add("@TotalRows", DbType.Int64, direction: ParameterDirection.Output);
            List<QualityControlVO> GetList = new List<QualityControlVO>();
            GetList = con.Query<QualityControlVO>(GenericSP.GetQualityControlList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (GetList.Count > 0)
                GetList[0].TotalRows = Param.Get<Int32>("@TotalRows");
            return GetList;
        }

        //Delete the Vitals 
        public long DeleteQualityControlRecordRow(QualityControlVO Data)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", Data.ID, DbType.Int64);
                Param.Add("@UnitID", Data.UnitId, DbType.Int64);
                Param.Add("@ResultStatus", 0, DbType.Int64, direction: ParameterDirection.Output);
                this.con.Execute(GenericSP.DeleteQualityControlByID, Param, commandType: CommandType.StoredProcedure);
                long ResultStatus = Param.Get<Int64>("@ResultStatus");
                return ResultStatus;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}
