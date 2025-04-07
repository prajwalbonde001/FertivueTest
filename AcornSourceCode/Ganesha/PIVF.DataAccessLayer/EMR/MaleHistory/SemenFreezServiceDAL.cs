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
using System.Transactions;

namespace PIVF.DataAccessLayer.EMR.MaleHistory
{
    public class SemenFreezServiceDAL : SemenFreezServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public SemenFreezServiceDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int SaveUpdate(SemenFreez objSemenFreez)
        {
            using (var TransactionScope = new TransactionScope())
            {
                int Status = 0;
                try
                {
                    var Param = new DynamicParameters();
                    if (objSemenFreez.ID > 0)
                        Param.Add("@ID", objSemenFreez.ID);
                    else
                        Param.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    if (GenericSP.SelectedPatient != null)
                        Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                    if (GenericSP.SelectedPatient != null)
                        Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                    Param.Add("@DonorUnitID", objSemenFreez.DonorUnitID);//rohini
                    Param.Add("@DonorID", objSemenFreez.DonorID);//rohiNi
                    Param.Add("@SpremFreezingDate", objSemenFreez.SpremFreezingDate);
                    Param.Add("@SpremFreezingTime", objSemenFreez.SpremFreezingTime);
                    Param.Add("@DoctorID", objSemenFreez.DoneBy);
                    Param.Add("@EmbryologistID", objSemenFreez.WitnessedBy);
                    Param.Add("@CollectionMethodID", objSemenFreez.CollectionMethod);
                    Param.Add("@ViscosityID", objSemenFreez.ViscosityID);
                    Param.Add("@Volume", objSemenFreez.Volume);
                    Param.Add("@TotalSpremCount", objSemenFreez.SpermCount);
                    Param.Add("@Motility", objSemenFreez.Motility);
                    Param.Add("@GradeA", objSemenFreez.GradeA);
                    Param.Add("@DonorID", objSemenFreez.DonorID);
                    Param.Add("@DonorUnitID", objSemenFreez.DonorUnitID);
                    Param.Add("@GradeB", objSemenFreez.GradeB);
                    Param.Add("@GradeC", objSemenFreez.GradeC);
                    Param.Add("@Comments", objSemenFreez.Comments);
                    Param.Add("@Media", objSemenFreez.Media);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    Param.Add("@SpermTypeID", objSemenFreez.SpermTypeID);
                    Param.Add("@SampleCode", objSemenFreez.SampleCode);
                    Param.Add("@SampleLinkID", objSemenFreez.SampleLinkID);
                    Param.Add("@CollectionDate", objSemenFreez.CollectionDate);
                    Param.Add("@CollectionTime", objSemenFreez.CollectionTime);
                    Param.Add("@ReceivingDate", objSemenFreez.ReceivingDate);
                    Param.Add("@ReceivingTime", objSemenFreez.ReceivingTime);
                    Param.Add("@AbstinenceID", objSemenFreez.AbstinenceID);
                    Param.Add("@SpermConcentration", objSemenFreez.SpermConcentration);
                    Param.Add("@SlowProgressive", objSemenFreez.SlowProgressive);
                    Param.Add("@RapidProgressive", objSemenFreez.RapidProgressive);
                    Param.Add("@NormalForms", objSemenFreez.NormalForms);
                    Param.Add("@AbnormalForms", objSemenFreez.AbnormalForms);
                    Param.Add("@WBC", objSemenFreez.WBC);
                    Param.Add("@RBC", objSemenFreez.RBC);
                    Param.Add("@PusCells", objSemenFreez.PusCells);
                    Param.Add("@EpithelialCells", objSemenFreez.EpithelialCells);
                    Param.Add("@NoOfVials", objSemenFreez.NoOfVials);
                    Param.Add("@IsFinalized", objSemenFreez.IsFinalized);
                    Param.Add("@SSRNo", objSemenFreez.SSRNo);//Added by Manohar
                    //Param.Add("@FormNo", objSemenFreez.FormNo);
                    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    this.con.Query<int>(GenericSP.AddUpdateSpremFreezing, Param, commandType: CommandType.StoredProcedure);
                    objSemenFreez.ID = Param.Get<Int64>("@ID");
                    Status = Param.Get<Int32>("@ResultStatus");
                    if (Status == 1 || Status == 2)
                    {                       
                        foreach (SemenFreezDetails item in objSemenFreez.lstFreezDetails)
                        {
                            var Param1 = new DynamicParameters();
                            if (item.ID > 0)
                                Param1.Add("@ID", item.ID);
                            else Param1.Add("@ID", 0);
                            Param1.Add("@Action", "SaveUpdateFreezDetail");
                            Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@SpremFreezingID", objSemenFreez.ID);
                            Param1.Add("@SpremFreezingUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@SpremNo", item.CryoNo);
                            Param1.Add("@ColorCodeID", item.GobletColorID);
                            Param1.Add("@StrawID", item.StrawId);
                            Param1.Add("@GlobletShapeID", item.GobletShapeId);
                            Param1.Add("@GlobletSizeID", item.GobletSizeId);
                            Param1.Add("@CaneID", item.CanID);
                            Param1.Add("@CanisterID", item.CanisterID);
                            Param1.Add("@TankID", item.TankId);
                            Param1.Add("@Comments", item.Remark);
                            Param1.Add("@IsThaw", item.IsThaw);
                            Param1.Add("@PlanTherapy", item.PlanTherapyID);
                            Param1.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID);
                            Param1.Add("@Volume", item.VolumeDetail);
                            Param1.Add("@ExpiryDate", item.ExpiryDate);
                            //Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            //Param1.Add("@AddedOn", Environment.MachineName);
                            //Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                            Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                            this.con.Query<int>(GenericSP.AddUpdateSpremFreezingDetails, Param1, commandType: CommandType.StoredProcedure);
                            Status = Param.Get<Int32>("@ResultStatus");
                        }

                    }
                    TransactionScope.Complete();
                }
                catch (Exception E)
                {
                    Status = 0;
                }
                return Status;
            }
        }

        public int GetMaxID()
        {
            var Param1 = new DynamicParameters();
            Param1.Add("@Action", "GetMaxID");
            Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param1.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
            Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<int>(GenericSP.AddUpdateSpremFreezingDetails, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public List<SemenFreez> GetSemenFreezList(long DonorID, long DonorUnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                if (GenericSP.SelectedPatient != null)
                    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@DonorID", DonorID);
                Param.Add("@DonorUnitID", DonorUnitID);

                return this.con.Query<SemenFreez>(GenericSP.GetSemenFreezList, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception e)
            {
                List<SemenFreez> _List = new List<SemenFreez>();
                return _List;
            }
        }

        public List<SemenFreez> GetSemenFreezListByFormNo(string FormNo, string Action, long ID, long UnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                if (GenericSP.SelectedPatient != null)
                {
                    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                    Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                }
                Param.Add("@FormNo", FormNo);
                Param.Add("@Action", Action);
                Param.Add("@ID", ID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                return this.con.Query<SemenFreez>(GenericSP.GetSemenFreezListByFormNo, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception e)
            {
                List<SemenFreez> _List = new List<SemenFreez>();
                return _List;
            }
        }

        public List<SemenFreezDetails> GetSemenFreezDetailListByFormNo(string FormNo, string Action, long ID, long UnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                if (GenericSP.SelectedPatient != null)
                {
                    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                    Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                }
                Param.Add("@FormNo", FormNo);
                Param.Add("@Action", Action);
                Param.Add("@ID", ID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                return this.con.Query<SemenFreezDetails>(GenericSP.GetSemenFreezListByFormNo, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception e)
            {
                List<SemenFreezDetails> _List = new List<SemenFreezDetails>();
                return _List;
            }
        }

        public List<SemenFreez> GetSpermBankList(int PageIndex, bool IsSinglePatient, int UnitID, int TankID, int CanisterID, int CanID, int StrawId, string NameCodeMRNo, bool IsShowDiscard, string StatusOption)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);

                if (TankID > 0)
                    Param.Add("@TankID", TankID);


                if (CanisterID > 0)
                    Param.Add("@CanisterID", CanisterID);


                if (CanID > 0)
                    Param.Add("@CanID", CanID);

                if (StrawId > 0)
                    Param.Add("@StrawId", StrawId);

                if (StatusOption != "Status")
                    Param.Add("@StatusOption", StatusOption);

                Param.Add("@NameCodeMRNo", NameCodeMRNo);
                Param.Add("@IsShowDiscard", IsShowDiscard);
                Param.Add("@PageIndex", PageIndex);
                if (IsSinglePatient)
                    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                else
                    Param.Add("@PatientID", null);


                return this.con.Query<SemenFreez>(GenericSP.GetSpermBankList, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception e)
            {
                List<SemenFreez> _List = new List<SemenFreez>();
                return _List;
            }
        }


        public int UpdateSemenFreezExpiryDates(List<SemenFreezDetails> SemenFreezList)
        {
            var Param = new DynamicParameters();
            int Status = 0;
            foreach (SemenFreezDetails objSemenFreezDetail in SemenFreezList)
            {
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@SpermNo", objSemenFreezDetail.CryoNo);
                Param.Add("@Action", objSemenFreezDetail.Action);
                Param.Add("@ExpiryDate", objSemenFreezDetail.ExpiryDate);
                Param.Add("@DoneBy", objSemenFreezDetail.DoneBy);
                Param.Add("@EmbryologistID", objSemenFreezDetail.EmbryologistID);
                Param.Add("@WitnessID", objSemenFreezDetail.WitnessID);
                Param.Add("@ReasonID", objSemenFreezDetail.ReasonID);
                Param.Add("@DiscardDate", objSemenFreezDetail.DiscardDate);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                Param.Add("@VitrificationID", objSemenFreezDetail.VitrificationDetailID);

                this.con.Query<int>(GenericSP.UpdateSemenFreezExpiryDates, Param, commandType: CommandType.StoredProcedure);
                Status = Param.Get<Int32>("@ResultStatus");
            }
            return Status;

        }

        public int CheckDuplicateCryoNo(string Item)
        {
            int Status = 0;
            var Param1 = new DynamicParameters();           
            Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param1.Add("@CryoNo", Item);
            Param1.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
            Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.CheckDuplicateCryoNo, Param1, commandType: CommandType.StoredProcedure);
            Status= Param1.Get<Int32>("@ResultStatus");
            return Status;
        }


    }
}
