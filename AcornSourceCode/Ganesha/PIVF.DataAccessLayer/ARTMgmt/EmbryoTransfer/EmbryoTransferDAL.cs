using PIVF.BusinessLayer.ARTMgmt.EmbryoTransfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.ARTMgmt.EmbryoTransfer;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.Entities.Models.Master.IVF;
using PIVF.Entities.Models.ARTMgmt.Embrology;
using System.Transactions;

namespace PIVF.DataAccessLayer.ARTMgmt.EmbryoTransfer
{
    public class EmbryoTransferDAL : EmbryoTransferBAL
    {
        private Database dbServer = null;
        IDbConnection Con;
        public EmbryoTransferDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        public EmbryoTransferVO FillMasters()
        {
            EmbryoTransferVO Obj = new EmbryoTransferVO();
            Obj.clinician = new List<CommanEntity>();
            Obj.Embryologist = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            Obj.Anesthetist = new List<CommanEntity>();
            Obj.Anesthesia = new List<CommanEntity>();
            Obj.EndometriumPattern = new List<CommanEntity>();
            Obj.Catheter = new List<CommanEntity>();
            Obj.LevelOfDifficulty = new List<CommanEntity>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillETMasters, commandType: CommandType.StoredProcedure);
            Obj.clinician = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Embryologist = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Anesthetist = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Anesthesia = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.EndometriumPattern = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Catheter = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.ETCancelReason = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.LevelOfDifficulty = QueryMultiple.Read<CommanEntity>().ToList();
            return Obj;
        }
        public EmbryoTransferVO FillETGrid(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID, DbType.Int64);
                Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                Param.Add("@TherapyID", PlanTherapyID, DbType.Int64);
                Param.Add("@TherapyUnitID", PlanTherapyUnitID, DbType.Int64);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                EmbryoTransferVO Details = new EmbryoTransferVO();
                var QuerMultiple = Con.QueryMultiple(GenericSP.FillETGrid, Param, commandType: CommandType.StoredProcedure);
                Details = QuerMultiple.Read<EmbryoTransferVO>().SingleOrDefault();
                if (Details != null)
                {
                    Details.ETGrid = new List<EmbryoDetailsVO>();
                    Details.ETGrid = QuerMultiple.Read<EmbryoDetailsVO>().ToList();
                    foreach (EmbryoDetailsVO item in Details.ETGrid)
                    {
                            item.Img = new Entities.Models.ARTMgmt.Embrology.OocytesImage();
                            item.Img.model = new List<model1>();
                            var DelImg = new DynamicParameters();
                            DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            DelImg.Add("@ETDetailsID", item.ID, DbType.Int64);
                            item.Img.model = Con.Query<model1>(GenericSP.GetETEmbryoImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                    }
                }
                return Details;
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
        public long SaveET(EmbryoTransferVO ETData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    var Param = new DynamicParameters();
                    Param.Add("@PatientID", ETData.PatientID, DbType.Int64);
                    Param.Add("@PatientUnitID", ETData.PatientUnitID, DbType.Int64);
                    Param.Add("@TherapyID", ETData.TherapyID, DbType.Int64);
                    Param.Add("@TherapyUnitID", ETData.TherapyUnitID, DbType.Int64);
                    Param.Add("@Date", ETData.Date, DbType.DateTime);
                    Param.Add("@Time", ETData.Time, DbType.DateTime);
                    Param.Add("@clinicianID", ETData.clinicianID, DbType.Int32); //ETData.clinicianID
                    Param.Add("@EmbryologistID", ETData.EmbryologistID, DbType.Int32);
                    Param.Add("@WitnessID", ETData.WitnessID, DbType.Int32);
                    Param.Add("@PerformedunderAnesthesia", ETData.PerformedunderAnesthesia, DbType.Boolean);
                    Param.Add("@AnesthetistID", ETData.AnesthetistID, DbType.Int32);
                    Param.Add("@AnesthesiaID", ETData.AnesthesiaID, DbType.Int32);
                    Param.Add("@EndometriumThickness", ETData.EndometriumThickness, DbType.String);
                    Param.Add("@EndometriumPatternID", ETData.EndometriumPatternID, DbType.Int32);
                    Param.Add("@CatheterID", ETData.CatheterID, DbType.Int32);
                    Param.Add("@DistanceFromfundus", ETData.DistanceFromfundus, DbType.String);
                    Param.Add("@LevelOfDifficultyID", ETData.LevelOfDifficultyID, DbType.Int32);
                    Param.Add("@Noofattempts", ETData.Noofattempts, DbType.Int32);
                    Param.Add("@Embryoresidue", ETData.Embryoresidue, DbType.Int32);
                    Param.Add("@UseofStylet", ETData.UseofStylet, DbType.Boolean);
                    Param.Add("@UseofTenaculum", ETData.UseofTenaculum, DbType.Boolean);
                    Param.Add("@Complications", ETData.Complications, DbType.String);
                    Param.Add("@Remarks", ETData.Remarks, DbType.String);
                    Param.Add("@PregnancyDate", ETData.PregnancyDate, DbType.DateTime);
                    Param.Add("@CancelCycleFlag", ETData.CancelCycleFlag, DbType.Boolean);
                    Param.Add("@CancelCycleRemark", ETData.CancelCycleRemark, DbType.Int32); //type change  string to int by mayur
                    Param.Add("@CloseCycle", ETData.CloseCycle, DbType.Boolean);
                    Param.Add("@Finalize", ETData.Finalize, DbType.Boolean);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                    this.Con.Execute(GenericSP.SaveET, Param, commandType: CommandType.StoredProcedure);
                    long ID = Param.Get<Int64>("@ID");
                    if (ID > 0)
                    {
                        //Insert Embryo Images 
                        if (ETData.ETGrid != null)
                        {
                            foreach (EmbryoDetailsVO item in ETData.ETGrid)
                            {
                                if (item.TransferToID != 0)              //Added by Nayan Kamble
                                {
                                    var Param4 = new DynamicParameters();
                                    Param4.Add("@ID", item.ID, DbType.Int64);

                                    Param4.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Param4.Add("@TransferToID", item.TransferToID);
                                    this.Con.Execute(GenericSP.SaveETD, Param4, commandType: CommandType.StoredProcedure);

                                }
                            }
                            foreach (EmbryoDetailsVO item in ETData.ETGrid)
                            {
                                if (item.Img != null)
                                {
                                    if (item.Img.model != null)
                                    {
                                        var Param3 = new DynamicParameters();
                                        Param3.Add("@ID", item.ID, DbType.Int64);
                                        Param3.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        this.Con.Execute(GenericSP.DeleteETImg, Param3, commandType: CommandType.StoredProcedure);

                                        if (item.Img.model.Count > 0)
                                        {
                                            foreach (model1 Mod in item.Img.model)
                                            {
                                                var Param2 = new DynamicParameters();
                                                Param2.Add("@ID", item.ID, DbType.Int64);
                                                Param2.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                                Mod.preview = Mod.preview.Replace(@"data:image/jpeg;base64,", "");
                                                Mod.preview = Mod.preview.Replace(@"data:image/png;base64,", "");
                                                Param2.Add("@Img", Convert.FromBase64String(Mod.preview), DbType.Binary);
                                                this.Con.Execute(GenericSP.SaveETImg, Param2, commandType: CommandType.StoredProcedure);
                                            }
                                        }
                                        //else
                                        //{
                                        //    var Param2 = new DynamicParameters();
                                        //    Param2.Add("@ID", item.ID, DbType.Int64);
                                        //    Param2.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        //    this.Con.Execute(GenericSP.SaveETImg, Param2, commandType: CommandType.StoredProcedure);
                                        //}
                                    }
                                }
                            }
                        }
                    }
                    transactionScope.Complete();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}
