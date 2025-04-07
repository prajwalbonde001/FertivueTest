using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.Entities.Models.Master.IVF;
using System.Transactions;
namespace PIVF.DataAccessLayer.ARTMgmt.Cryo_Preservation
{
  public  class EmbryoThowingDAL : EmbryoThowingBAL
    {
        private Database dbServer = null;
        IDbConnection Con;
        public EmbryoThowingDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        public IEnumerable<EmbryoThowingVO> GetFreezeEmbryo(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID, DbType.Int64);
                Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                Param.Add("@TherapyID", TherapyID, DbType.Int64);
                Param.Add("@TherapyUnitID", TherapyUnitID, DbType.Int64);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                return this.Con.Query<EmbryoThowingVO>(GenericSP.GetFreezeEmbryoForThowing, Param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
        public EmbryoThowingVO FillMaster()
        {
            EmbryoThowingVO Obj = new EmbryoThowingVO();
            Obj.ThawingPlan = new List<CommanEntity>();
            Obj.ThowWitness = new List<CommanEntity>();
            Obj.ThowEmbryologist = new List<CommanEntity>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillEmbryoThowMasters, commandType: CommandType.StoredProcedure);
            Obj.ThawingPlan = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.ThowWitness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.ThowEmbryologist = QueryMultiple.Read<CommanEntity>().ToList();
            return Obj;
        }
        public long SaveThawing(List<EmbryoThowingVO> ThawingData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (EmbryoThowingVO item in ThawingData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@VetrificationID", item.ID, DbType.Int64);
                        Param.Add("@VetrificationDetilsUnitID", item.UnitID, DbType.Int64);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@OocyteNo", item.EmbNumber, DbType.Int64);
                        Param.Add("@SerialNo", item.EmbSerialNumber, DbType.Int64);
                        Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID, DbType.Int64);
                        Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID, DbType.Int64);
                        Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID , DbType.Int64);
                        Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID, DbType.Int64);
                        Param.Add("@ThowDate", item.ThowDate, DbType.DateTime);
                        Param.Add("@ThowTime", item.ThowTime, DbType.DateTime);
                        Param.Add("@ThawingPlanID", item.ThawingPlanID, DbType.Int32);
                        Param.Add("@EmbryologistID", item.ThowEmbryologistID, DbType.Int32);
                        Param.Add("@WitnessID", item.ThowWitnessID, DbType.Int32);
                        Param.Add("@Day", item.Day, DbType.String);
                        Param.Add("@Remarks", item.ThowRemark, DbType.String);
                        Param.Add("@IsFinalized", item.ThowFinalize, DbType.Boolean);
                        Param.Add("@IsFET", item.IsFET);
                        Param.Add("@OldPlanTherapyID", item.PlanTherapyID, DbType.Int64);
                        Param.Add("@OldPlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                        Param.Add("@CycleCode", item.CycleCode, DbType.String);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                        Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                        Param.Add("@Donor", item.Donor);
                        Param.Add("@cellstage", item.CellSatge);
                        Param.Add("@grade", item.Grade);
                        if (item.Donor == true)
                        {
                            Param.Add("@DonorEmb",1);
                        }
                        if (item.coupleId != 0)
                        {
                            Param.Add("@IsDonarOCEC", true, DbType.Boolean);
                            Param.Add("@coupleId", item.PatientID, DbType.Int64);
                            Param.Add("@CoupleUnitID", item.PatientUnitID, DbType.Int64);
                        }
                        this.Con.Execute(GenericSP.SaveThawEmbryo, Param, commandType: CommandType.StoredProcedure);
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
        public IEnumerable<EmbryoThowingVO> GetThawingData(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID, DbType.Int64);
                Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                Param.Add("@TherapyID", TherapyID, DbType.Int64);
                Param.Add("@TherapyUnitID", TherapyUnitID, DbType.Int64);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                return this.Con.Query<EmbryoThowingVO>(GenericSP.GetThawingData, Param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}
