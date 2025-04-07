using PIVF.BusinessLayer.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR.MaleHistory;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;

namespace PIVF.DataAccessLayer.EMR.MaleHistory
{
    public class SemenThawingDAL : SemenThawingBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public SemenThawingDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int SaveUpdate(List<SemenThawing> lstSemenThaw)
        {
            int Status = 0;
            int counter = -1;
            foreach (var item in lstSemenThaw)
            {

                counter++;
                var Param = new DynamicParameters();
                if (item.ThawID > 0)
                {
                    Param.Add("@ID", item.ThawID);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                }
                else
                {
                    Param.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
                    Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                    Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@UpdatedOn", Environment.MachineName);
                    Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
                }

                if (GenericSP.SelectedCouple != null && item.IsFromThowing != true)
                {
                    Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    if (GenericSP.SelectedCouple.FemalePatient.TherapyID > 0)
                        Param.Add("@IsUsed", true);
                    else
                        Param.Add("@IsUsed", false);
                }
                Param.Add("@DonorID", item.DonorID);
                Param.Add("@DonorUnitID", item.DonorUnitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                if (GenericSP.SelectedPatient != null)
                {
                    Param.Add("@PatientId", GenericSP.SelectedPatient.ID);//objSemenFreez.PatientID
                    Param.Add("@PatientUnitId", GenericSP.SelectedPatient.UnitID);//objSemenFreez.PatientUnitID                                     

                }
                Param.Add("@CoupleId", item.CoupleID);
                Param.Add("@LabPersonId", item.WitnessedBy);
                Param.Add("@DoneBy", item.DoneBy);
                Param.Add("@Counter", counter);
                //    Param.Add("@VitrificationID", item.DoneBy);
                Param.Add("@ThawingTime", item.ThawingTime);
                Param.Add("@RemainVolume", item.RemainingVolume);
                Param.Add("@ThawingDate", item.ThawingDate);
                Param.Add("@FormNoToUpdate", item.FormNo);

                Param.Add("@Volume", item.Volume);
                Param.Add("@SpermCount", item.SpermCount);
                Param.Add("@SpermConcentration", item.SpermConcentration);
                Param.Add("@Motility", item.Motility);
                Param.Add("@GradeA", item.GradeA);
                Param.Add("@GradeB", item.GradeB);
                Param.Add("@GradeC", item.GradeC);
                Param.Add("@Comments", item.Comments);
                Param.Add("@IsFreezed", item.IsFinalized);
                Param.Add("@SpermFreezingDetailsID", item.FreezDetailID);
                Param.Add("@SpermFreezingDetailsUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@FreezingID", item.FreezingID);
                Param.Add("@FreezingUnitID", item.FreezingUnitID);
                Param.Add("@Cane", item.Cane);
                Param.Add("@Canister", item.Canister);
                Param.Add("@Tank", item.Tank);
                Param.Add("@Straw", item.Straw);
                Param.Add("@SpermNo", item.CryoNo);

                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Query<int>(GenericSP.AddUpdateSpremThawing, Param, commandType: CommandType.StoredProcedure);
                Status = Param.Get<Int32>("@ResultStatus");
            }
            return Status;
        }

        public List<SemenFreez> GetFreezDetails(string action)
        {
            var Param1 = new DynamicParameters();
            //   Param1.Add("@Action", "GetMaxID");
            Param1.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param1.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param1.Add("@Action", action);

            //  Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<SemenFreez>(GenericSP.GetSpermFreezingDetailsForThawingForView, Param1, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<SemenFreez> GetFreezDetailsAfterFinalize(string action,int ID,int UnitID)  //by rohini
        {
            var Param1 = new DynamicParameters();
            //   Param1.Add("@Action", "GetMaxID");
            Param1.Add("@ID", ID);
            Param1.Add("@UnitID", UnitID);            
            Param1.Add("@Action", action);
            Param1.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param1.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            //  Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<SemenFreez>(GenericSP.GetSpermFreezingDetailsForThawingForView, Param1, commandType: CommandType.StoredProcedure).ToList();
        }


    }
}
