using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation;
using Dapper;
using System.Data;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.Entities.Models.Master.IVF;
using System.Transactions;

namespace PIVF.DataAccessLayer.ARTMgmt.Cryo_Preservation
{
    public class EmbryoVitrificationDAL : EmbryoVitrificationBAL
    {
        private Database dbServer = null;
        IDbConnection Con;
        public EmbryoVitrificationDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        public IEnumerable<FreezeEmbryoVO> GetFreezeEmbryo(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID, DbType.Int64);
                Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                Param.Add("@TherapyID", PlanTherapyID, DbType.Int64);
                Param.Add("@TherapyUnitID", PlanTherapyUnitID, DbType.Int64);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                return this.Con.Query<FreezeEmbryoVO>(GenericSP.GetFreezeEmbryo, Param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
        public FreezeEmbryoVO FillMaster()
        {
            FreezeEmbryoVO Obj = new FreezeEmbryoVO();
            Obj.Tank = new List<CommanEntity>();
            Obj.Canister = new List<CommanEntity>();
            Obj.GobletColor = new List<CommanEntity>();
            Obj.GobletSize = new List<CommanEntity>();
            Obj.Cryolock = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            Obj.Embryologist = new List<CommanEntity>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillEmbryoVitrificationMasters, commandType: CommandType.StoredProcedure);
            Obj.Tank = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Canister = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.GobletColor = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.GobletSize = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.CryolockColour = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.VisotubeColour = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.ListMediaUsed = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Cryolock = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Embryologist = QueryMultiple.Read<CommanEntity>().ToList();
            return Obj;
        }
        public long Save(List<FreezeEmbryoVO> EmbryoData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (FreezeEmbryoVO item in EmbryoData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@ID", item.ID, DbType.Int64);
                        Param.Add("@UnitID", item.UnitID, DbType.Int64);
                        Param.Add("@VitrivicationID", item.VitrivicationID, DbType.Int64);
                        Param.Add("@VitrificationUnitID", item.VitrificationUnitID, DbType.Int64);
                        Param.Add("@EmbNumber", item.EmbNumber, DbType.Int64);
                        Param.Add("@EmbSerialNumber", item.EmbSerialNumber, DbType.Int64);
                        Param.Add("@VitriDate", item.VitriDate, DbType.DateTime);
                        Param.Add("@VitriTime", item.VitriTime, DbType.DateTime);
                        Param.Add("@TankID", item.TankID, DbType.Int32);
                        Param.Add("@ConistorID", item.ConistorID, DbType.Int32);
                        Param.Add("@GobletColor", item.GlobletColorID, DbType.Int32);
                        Param.Add("@GobletSize", item.GlobletSizeID, DbType.Int32);
                        Param.Add("@CryolockID", item.CryolockID, DbType.Int32);
                        Param.Add("@CryolockColourID", item.CryolockColourID, DbType.Int32);
                        Param.Add("@VisotubeColourID", item.VisotubeColourID, DbType.Int32);
                        Param.Add("@ExpiryDate", item.ExpiryDate, DbType.DateTime);
                        Param.Add("@ExpiryTime", item.ExpiryTime, DbType.DateTime);
                        Param.Add("@EmbryologistID", item.EmbryologistID, DbType.Int32);
                        Param.Add("@WitnessID", item.WitnessID, DbType.Int32);
                        Param.Add("@Remarks", item.Remarks, DbType.String);
                        Param.Add("@IsFinalized", item.IsFinalized, DbType.Boolean);

                        Param.Add("@MediaID", item.MediaID, DbType.Int32);
                        Param.Add("@LotNo", item.LotNo, DbType.String);
                        Param.Add("@MediaExpiryDate", item.MediaExpiryDate, DbType.DateTime);
                        Param.Add("@FreezingNo", item.FreezingNo, DbType.String);
                        this.Con.Execute(GenericSP.UpdateFreezeEmbryo, Param, commandType: CommandType.StoredProcedure);
                    }
                    transactionScope.Complete();
                    return 1;
                }
            }
            catch (Exception Ex)
            {
                return 0;
            }
        }
        public long GetFlagISAllEmbryoFreeze(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID,int IsFromEmbryology)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID, DbType.Int64);
                Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                Param.Add("@TherapyID", TherapyID, DbType.Int64);
                Param.Add("@TherapyUnitID", TherapyUnitID, DbType.Int64);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                Param.Add("@IsFromEmbryology", IsFromEmbryology, DbType.Int32);
                return this.Con.Query<long>(GenericSP.ISAllEmbryoFreeze, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public int CheckDuplicateFreezingNo(string Item)
        {
            int Status = 0;
            var Param1 = new DynamicParameters();
            Param1.Add("@IsEmbryo",true);
            Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param1.Add("@FreezingNo", Item);
            Param1.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
            Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.Con.Query<int>(GenericSP.CheckDuplicateFreezingNo, Param1, commandType: CommandType.StoredProcedure);
            Status = Param1.Get<Int32>("@ResultStatus");
            return Status;
        }
    }
}
