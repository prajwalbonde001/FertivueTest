using PIVF.BusinessLayer.ARTMgmt.Embrology;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIVF.Entities.Models.ARTMgmt.OPU;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.Entities.Models.ARTMgmt.Embrology;
using PIVF.Entities.Models.Master.IVF;
using System.Transactions;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net.Http;
using System.Web.Script.Serialization;


using System.Text;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using PIVF.DataAccessLayer.Security;

namespace PIVF.DataAccessLayer.ARTMgmt.Embrology
{
    public class EmbrologyDAL : EmbrologyBAL
    {
        private Database dbServer = null;
        IDbConnection Con;
        private long _userID;
        //Main EmbroGrid start
        public EmbrologyDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        private static readonly NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();


        public OPUVO GetOPUData(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID, DbType.Int64);
                Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                Param.Add("@TherapyID", TherapyID, DbType.Int64);
                Param.Add("@TherapyUnitID", TherapyUnitID, DbType.Int64);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                OPUVO Data = new OPUVO();
                var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetOPUDataForEmbrology, Param, commandType: CommandType.StoredProcedure);
                Data = QueryMultiple.Read<OPUVO>().SingleOrDefault();
                if (Data != null)
                {
                    Data.StimulationInfo = new StimulationForEmbro();
                    Data.StimulationInfo = QueryMultiple.Read<StimulationForEmbro>().SingleOrDefault();
                }
                return Data;
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
        public long SaveUpdateOcyte(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, int FolliclesAspirated, long OocytesRetrieved, Boolean OocytesFinalizeStatus, int Donor)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID, DbType.Int64);
                Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
                Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
                Param.Add("@FolliclesAspirated", FolliclesAspirated, DbType.Int32);
                Param.Add("@OocytesRetrieved", OocytesRetrieved, DbType.Int64);
                Param.Add("@ResultStatus", 0, DbType.Int64, direction: ParameterDirection.Output);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                Param.Add("@OocytesFinalizeStatus", OocytesFinalizeStatus, DbType.Boolean);
                Con.Execute(GenericSP.SaveUpdateOcyte, Param, commandType: CommandType.StoredProcedure);
                long Result = Param.Get<long>("@ResultStatus");
                if (Result == 1)
                {
                    //Insert Data Into Lab Day 0 And Graphical representation Table
                    for (int i = 0; i < OocytesRetrieved; i++)
                    {
                        //Insert Into Lab 0 Day
                        var Param2 = new DynamicParameters();
                        Param2.Add("@PatientID", PatientID, DbType.Int64);
                        Param2.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                        Param2.Add("@PlanTherapyID", TherapyID, DbType.Int64);
                        Param2.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
                        Param2.Add("@OocyteNumber", i + 1, DbType.Int64);
                        Param2.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param2.Add("@OocyteDonorID", 0, DbType.Int64);
                        Param2.Add("@OocyteDonorUnitID", 0, DbType.Int64);
                        Param2.Add("@ID", 0, DbType.Int64);
                        Con.Execute(GenericSP.IVFDashBoard_AddDay0OocList, Param2, commandType: CommandType.StoredProcedure);
                        //Insert Into Graphical Representation TABLE
                        var Param3 = new DynamicParameters();
                        Param3.Add("@PatientID", PatientID, DbType.Int64);
                        Param3.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
                        Param3.Add("@PlanTherapyID", TherapyID, DbType.Int64);
                        Param3.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
                        Param3.Add("@Day0", true, DbType.Boolean);
                        Param3.Add("@OocyteNumber", i + 1, DbType.Int64);
                        Param3.Add("@Donor", Donor);
                        Param3.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param3.Add("@ID", 0, DbType.Int64);
                        Con.Execute(GenericSP.USP_IVFDashBoard_AddDay0OocListInGhaphicalRepresentationTable, Param3, commandType: CommandType.StoredProcedure);
                    }
                }
                return Result;
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
        public IEnumerable<EmbrologyVO> fillDayOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            List<EmbrologyVO> Oocytelist = new List<EmbrologyVO>();
            List<DayZeroForToolTip> DayZeroForToolTip = new List<DayZeroForToolTip>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.fillDayOocyteGrid, Param, commandType: CommandType.StoredProcedure);
            Oocytelist = QueryMultiple.Read<EmbrologyVO>().ToList();
            DayZeroForToolTip = QueryMultiple.Read<DayZeroForToolTip>().ToList();
            if (Oocytelist.ToList().Count > 0)
            {
                foreach (EmbrologyVO Item in Oocytelist)
                {
                    Item.ZeroTooltip = new Entities.Models.ARTMgmt.Embrology.DayZeroForToolTip();
                    Item.ZeroTooltip = DayZeroForToolTip.Where(p => p.OocyteNumber == Item.OocyteNumber && p.SerialOocuteNumber == Item.SerialOocyteNumber).SingleOrDefault();
                }
            }
            return Oocytelist;
        }
        //day one start
        public IEnumerable<DayOneVO> fillDayWiseOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, int day)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            Param.Add("@Day", day, DbType.Int32);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            List<DayOneVO> Oocytelist = new List<DayOneVO>();
            List<DayZeroForToolTip> DayZeroForToolTip = new List<DayZeroForToolTip>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.fillDayWiseOocyteGrid, Param, commandType: CommandType.StoredProcedure);
            Oocytelist = QueryMultiple.Read<DayOneVO>().ToList();
            DayZeroForToolTip = QueryMultiple.Read<DayZeroForToolTip>().ToList();
            List<LinkedPatientList> LinkedPatientList = QueryMultiple.Read<LinkedPatientList>().ToList();

            //added sujata for cross clinic check flow sperm
            List<LinkedPatientMaleList> LinkedPatientMaleList = QueryMultiple.Read<LinkedPatientMaleList>().ToList();

            foreach (DayOneVO Item in Oocytelist)
            {
                Item.LinkPatientList = LinkedPatientList;

                //added sujata for cross clinic check flow sperm
                Item.LinkPatientMaleList = LinkedPatientMaleList;

                Item.Img = new OocytesImage();
                Item.Img.model = new List<model1>();
                var DelImg = new DynamicParameters();
                DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                DelImg.Add("@PatientID", Item.PatientID, DbType.Int64);
                DelImg.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                DelImg.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                DelImg.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                DelImg.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                DelImg.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                DelImg.Add("@Day", 1, DbType.Int32);
                DelImg.Add("@DayID", Item.DayOneID, DbType.Int64);
                DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                Item.Img.model = Con.Query<model1>(GenericSP.GetOocytesImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                Item.ZeroTooltip = new Entities.Models.ARTMgmt.Embrology.DayZeroForToolTip();
                Item.ZeroTooltip = DayZeroForToolTip.Where(p => p.OocyteNumber == Item.OocyteNumber && p.SerialOocuteNumber == Item.SerialOocyteNumber).SingleOrDefault();
            }
            return Oocytelist;
        }
        public DayOneVO FillDayOneMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            DayOneVO Obj = new DayOneVO();
            Obj.CellStage = new List<CommanEntity>();
            Obj.Cleavage = new List<CommanEntity>();
            Obj.Fertilization = new List<CommanEntity>();
            Obj.Incubator = new List<CommanEntity>();
            Obj.Nucleoli = new List<CommanEntity>();
            Obj.Plan = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillDayOneMaster, Param, commandType: CommandType.StoredProcedure);
            Obj.Fertilization = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.CellStage = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Nucleoli = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Cleavage = QueryMultiple.Read<CommanEntity>().ToList();
            //added by neena
            Obj.PolarBodyDay1 = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.PN = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.PNSize = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.NPB = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.CytoplasmicHalo = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Grade = QueryMultiple.Read<CommanEntity>().ToList();
            //

            Obj.Plan = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Incubator = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.DonarLinkCycleIsAvialble = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISDonarEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            return Obj;
        }
        public long SaveDayOneProcess(List<DayOneVO> DayOneData)
        {
            using (var transactionScope = new TransactionScope())
            {
                foreach (DayOneVO item in DayOneData)
                {
                    var Param = new DynamicParameters();
                    Param.Add("@DayOneID", item.DayOneID, DbType.Int64);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Param.Add("@PatientID", item.PatientID, DbType.Int64);
                    Param.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                    Param.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                    Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                    Param.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                    Param.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                    Param.Add("@Date", item.Date, DbType.DateTime);
                    Param.Add("@Time", item.Time, DbType.DateTime);
                    Param.Add("@Fertilization", item.FertilizationID, DbType.Int32);
                    Param.Add("@CellStage", item.CellStageID, DbType.Int32);
                    Param.Add("@Nucleoli", item.NucleoliID, DbType.Int32);
                    Param.Add("@Cleavage", item.CleavageID, DbType.Int32);
                    //added by neena
                    Param.Add("@PolarBodyDay1ID", item.PolarBodyDay1ID, DbType.Int32);
                    Param.Add("@PNID", item.PNID, DbType.Int32);
                    Param.Add("@PNSizeID", item.PNSizeID, DbType.Int32);
                    Param.Add("@NPBID", item.NPBID, DbType.Int32);
                    Param.Add("@CytoplasmicHaloID", item.CytoplasmicHaloID, DbType.Int32);
                    Param.Add("@GradeID", item.GradeID, DbType.Int32);
                    //

                    Param.Add("@Plan", item.PlanID, DbType.Int32);
                    Param.Add("@Incubator", item.IncubatorID, DbType.Int32);
                    Param.Add("@Remarks", item.Remarks, DbType.String);
                    Param.Add("@Embryologist", GenericSP.CurrentUser.UserID, DbType.Int64);
                    Param.Add("@Witness", item.WitnessID, DbType.Int64);
                    Param.Add("@Finalize", item.Finalize, DbType.Boolean);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                    Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                    Param.Add("@IsExtend", item.IsExtend, DbType.Boolean);
                    Param.Add("@IsDonarEMb", item.IsFromDonar, DbType.Boolean);
                    Param.Add("@Donor", item.Donor);
                    if (item.Donor == true)
                    {
                        if (item.PlanID == 6 || item.PlanID == 5)
                        {
                            Param.Add("@DonorEmb", 1);
                        }
                        else
                        {
                            Param.Add("@DonorEmb", item.DonorEmb);
                        }
                    }
                    else
                    {
                        Param.Add("@DonorEmb", item.DonorEmb);
                    }
                    if (item.PlanID == 2 || item.PlanID == 6)
                    {
                        Param.Add("@Fresh", 0);
                    }
                    else
                    {
                        Param.Add("@Fresh", item.Fresh);
                    }


                    if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                    {
                        //Param.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                        //Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                        Param.Add("@CoupleID", item.CoupleID, DbType.Int64);
                        Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    }
                    Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                    this.Con.Execute(GenericSP.SaveDayOne, Param, commandType: CommandType.StoredProcedure);
                    long ID = Param.Get<Int64>("@ID");
                    //Insert Images OocytesWise
                    if (item.Img != null)
                    {
                        if (item.Img.model != null)
                        {
                            //Delete EXisting Images 
                            var DelImg = new DynamicParameters();
                            DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            DelImg.Add("@PatientID", item.PatientID, DbType.Int64);
                            DelImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                            DelImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                            DelImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                            DelImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                            DelImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                            DelImg.Add("@Day", 1, DbType.Int32);
                            DelImg.Add("@DayID", ID, DbType.Int64);
                            DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Con.Execute(GenericSP.DeleteOocytesImg, DelImg, commandType: CommandType.StoredProcedure);
                            foreach (model1 Imgitem in item.Img.model)
                            {
                                //Insert images in database
                                var ParImg = new DynamicParameters();
                                ParImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                ParImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                ParImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                ParImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                ParImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                ParImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                ParImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                ParImg.Add("@Day", 1, DbType.Int32);
                                ParImg.Add("@DayID", ID, DbType.Int64);
                                ParImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                Imgitem.preview = Imgitem.preview.Replace(@"data:image/jpeg;base64,", "");
                                Imgitem.preview = Imgitem.preview.Replace(@"data:image/png;base64,", "");
                                ParImg.Add("@Image", Convert.FromBase64String(Imgitem.preview), DbType.Binary);
                                ParImg.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                ParImg.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                                ParImg.Add("@AddedOn", Environment.MachineName, DbType.String);
                                ParImg.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                ParImg.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                                Con.Execute(GenericSP.SaveDaywiseImg, ParImg, commandType: CommandType.StoredProcedure);
                            }
                            //Insert Donar Image agins couple
                            if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                            {
                                if (item.PlanID == 5)
                                {
                                    var TransferImg = new DynamicParameters();
                                    TransferImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    TransferImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                    TransferImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    TransferImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    TransferImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    TransferImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    TransferImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    TransferImg.Add("@Day", 1, DbType.Int32);
                                    TransferImg.Add("@DayID", ID, DbType.Int64);
                                    TransferImg.Add("@CoupleID", item.CoupleID, DbType.Int64);
                                    TransferImg.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    //TransferImg.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                                    //TransferImg.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                                    Con.Execute(GenericSP.SaveDonarImgToCoupleAgains, TransferImg, commandType: CommandType.StoredProcedure);
                                }
                            }
                        }
                    }
                }
                transactionScope.Complete();
                return 1;
            }
        }
        //day two start
        public IEnumerable<DayTwoVO> fillDayTwoOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            List<DayTwoVO> Oocytelist = new List<DayTwoVO>();
            List<DayZeroForToolTip> DayZeroForToolTip = new List<DayZeroForToolTip>();

            var QueryMultiple = this.Con.QueryMultiple(GenericSP.fillDayTwoOocyteGrid, Param, commandType: CommandType.StoredProcedure);
            Oocytelist = QueryMultiple.Read<DayTwoVO>().ToList();
            DayZeroForToolTip = QueryMultiple.Read<DayZeroForToolTip>().ToList();
            List<LinkedPatientList> LinkedPatientList = QueryMultiple.Read<LinkedPatientList>().ToList();

            foreach (DayTwoVO Item in Oocytelist)
            {
                if (Item.ID != 0)
                {
                    Item.LinkPatientList = LinkedPatientList;
                    Item.Img = new OocytesImage();
                    Item.Img.model = new List<model1>();
                    var DelImg = new DynamicParameters();
                    DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    DelImg.Add("@PatientID", Item.PatientID, DbType.Int64);
                    DelImg.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                    DelImg.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                    DelImg.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                    DelImg.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                    DelImg.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                    DelImg.Add("@Day", 2, DbType.Int32);
                    DelImg.Add("@DayID", Item.DayTwoID, DbType.Int64);
                    DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Item.Img.model = Con.Query<model1>(GenericSP.GetOocytesImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                    Item.ZeroTooltip = new Entities.Models.ARTMgmt.Embrology.DayZeroForToolTip();
                    Item.ZeroTooltip = DayZeroForToolTip.Where(p => p.OocyteNumber == Item.OocyteNumber && p.SerialOocuteNumber == Item.SerialOocyteNumber).SingleOrDefault();
                }
            }
            return Oocytelist;
        }
        public DayTwoVO FillDayTwoMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            DayTwoVO Obj = new DayTwoVO();
            Obj.CellStage = new List<CommanEntity>();
            Obj.Incubator = new List<CommanEntity>();
            Obj.Plan = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            Obj.Grade = new List<CommanEntity>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillDayTwoMaster, Param, commandType: CommandType.StoredProcedure);
            Obj.CellStage = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Plan = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Incubator = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Symmetry = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationDistribution = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationList = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Nuclei = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Grade = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.DonarLinkCycleIsAvialble = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISDonarEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            return Obj;
        }
        public long SaveDayTwoProcess(List<DayTwoVO> DayTwoData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (DayTwoVO item in DayTwoData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@DayTwoID", item.DayTwoID, DbType.Int64);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@PatientID", item.PatientID, DbType.Int64);
                        Param.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                        Param.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                        Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                        Param.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                        Param.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                        Param.Add("@Date", item.Date, DbType.DateTime);
                        Param.Add("@Time", item.Time, DbType.DateTime);
                        Param.Add("@CellStage", item.CellStageID, DbType.Int32);
                        Param.Add("@GradeID", item.GradeID, DbType.Int32);
                        //added by neena
                        Param.Add("@SymmetryID", item.SymmetryID, DbType.Int32);
                        Param.Add("@FragmentationID", item.FragmentationID, DbType.Int32);
                        Param.Add("@FragmentationDistributionID", item.FragmentationDistributionID, DbType.Int32);
                        Param.Add("@NucleiID", item.NucleiID, DbType.Int32);
                        Param.Add("@Fragmentation", item.Fragmentation, DbType.String);
                        //

                        Param.Add("@Plan", item.PlanID, DbType.Int32);
                        Param.Add("@Incubator", item.IncubatorID, DbType.Int32);
                        Param.Add("@Remarks", item.Remarks, DbType.String);
                        Param.Add("@Embryologist", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@Witness", item.WitnessID, DbType.Int64);
                        Param.Add("@Finalize", item.Finalize, DbType.Boolean);
                        Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                        Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                        Param.Add("@IsExtend", item.IsExtend, DbType.Boolean);
                        Param.Add("@IsDonarEMb", item.IsFromDonar, DbType.Boolean);
                        Param.Add("@Donor", item.Donor);
                        if (item.Donor == true)
                        {
                            if (item.PlanID == 6 || item.PlanID == 5)
                            {
                                Param.Add("@DonorEmb", 1);
                            }
                            else
                            {
                                Param.Add("@DonorEmb", item.DonorEmb);
                            }
                        }
                        else
                        {
                            Param.Add("@DonorEmb", item.DonorEmb);
                        }
                        if (item.PlanID == 2 || item.PlanID == 6)
                        {
                            Param.Add("@Fresh", 0);
                        }
                        else
                        {
                            Param.Add("@Fresh", item.Fresh);
                        }
                        if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                        {
                            //Param.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                            //Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                            Param.Add("@CoupleID", item.CoupleID, DbType.Int64);
                            Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        }
                        Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                        this.Con.Execute(GenericSP.SaveDayTwo, Param, commandType: CommandType.StoredProcedure);
                        long ID = Param.Get<Int64>("@ID");
                        //Insert Images OocytesWise
                        if (item.Img != null)
                        {
                            if (item.Img.model != null)
                            {
                                //Delete EXisting Images 
                                var DelImg = new DynamicParameters();
                                DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                DelImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                DelImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                DelImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                DelImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                DelImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                DelImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                DelImg.Add("@Day", 2, DbType.Int32);
                                DelImg.Add("@DayID", ID, DbType.Int64);
                                DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                Con.Execute(GenericSP.DeleteOocytesImg, DelImg, commandType: CommandType.StoredProcedure);
                                foreach (model1 Imgitem in item.Img.model)
                                {
                                    //Insert images in database
                                    var ParImg = new DynamicParameters();
                                    ParImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                    ParImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    ParImg.Add("@Day", 2, DbType.Int32);
                                    ParImg.Add("@DayID", ID, DbType.Int64);
                                    ParImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/jpeg;base64,", "");
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/png;base64,", "");
                                    ParImg.Add("@Image", Convert.FromBase64String(Imgitem.preview), DbType.Binary);
                                    ParImg.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                                    ParImg.Add("@AddedOn", Environment.MachineName, DbType.String);
                                    ParImg.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                    ParImg.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                                    Con.Execute(GenericSP.SaveDaywiseImg, ParImg, commandType: CommandType.StoredProcedure);
                                }
                                //Insert Donar Image agins couple
                                if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                                {
                                    if (item.PlanID == 5)
                                    {
                                        var TransferImg = new DynamicParameters();
                                        TransferImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        TransferImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                        TransferImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                        TransferImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                        TransferImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                        TransferImg.Add("@Day", 2, DbType.Int32);
                                        TransferImg.Add("@DayID", ID, DbType.Int64);
                                        //TransferImg.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                                        //TransferImg.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                                        TransferImg.Add("@CoupleID", item.CoupleID, DbType.Int64);
                                        TransferImg.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        Con.Execute(GenericSP.SaveDonarImgToCoupleAgains, TransferImg, commandType: CommandType.StoredProcedure);
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
        //Day three start
        public DayThreeVO FillDayThreeMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            DayThreeVO Obj = new DayThreeVO();
            Obj.CellStage = new List<CommanEntity>();
            Obj.Cleavage = new List<CommanEntity>();    //Added by Nayan Kamble
            Obj.Incubator = new List<CommanEntity>();
            Obj.Plan = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            Obj.Grade = new List<CommanEntity>();
            Obj.PGDPGSMethod = new List<CommanEntity>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillDayThreeMaster, Param, commandType: CommandType.StoredProcedure);
            Obj.CellStage = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Plan = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Incubator = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Cleavage = QueryMultiple.Read<CommanEntity>().ToList();    //Added by Nayan Kamble
            Obj.Symmetry = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationDistribution = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationList = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Nuclei = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Grade = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.PGDPGSMethod = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.DonarLinkCycleIsAvialble = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISDonarEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISEmbET = QueryMultiple.Read<long>().SingleOrDefault();

            return Obj;
        }
        public IEnumerable<DayThreeVO> fillDayThreeOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, long DonorId, long DonorCycleCode, long DonorUnitId)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            List<DayThreeVO> Oocytelist = new List<DayThreeVO>();
            List<DayZeroForToolTip> DayZeroForToolTip = new List<DayZeroForToolTip>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.fillDayThreeOocyteGrid, Param, commandType: CommandType.StoredProcedure);
            Oocytelist = QueryMultiple.Read<DayThreeVO>().ToList();
            DayZeroForToolTip = QueryMultiple.Read<DayZeroForToolTip>().ToList();
            List<LinkedPatientList> LinkedPatientList = QueryMultiple.Read<LinkedPatientList>().ToList();
            foreach (DayThreeVO Item in Oocytelist)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(Item.PGDPGSbyte)))
                {
                    Item.PGDPGSDOC = System.Text.Encoding.UTF8.GetString(Item.PGDPGSbyte);
                }
                if (Item.ID != 0)
                {
                    Item.LinkPatientList = LinkedPatientList;
                    Item.Img = new OocytesImage();
                    Item.Img.model = new List<model1>();
                    var DelImg = new DynamicParameters();
                    DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    DelImg.Add("@PatientID", Item.PatientID, DbType.Int64);
                    DelImg.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                    DelImg.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                    DelImg.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                    DelImg.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                    DelImg.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                    DelImg.Add("@Day", 3, DbType.Int32);
                    DelImg.Add("@DayID", Item.DayThreeID, DbType.Int64);
                    DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Item.Img.model = Con.Query<model1>(GenericSP.GetOocytesImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                    Item.ZeroTooltip = new Entities.Models.ARTMgmt.Embrology.DayZeroForToolTip();
                    Item.ZeroTooltip = DayZeroForToolTip.Where(p => p.OocyteNumber == Item.OocyteNumber && p.SerialOocuteNumber == Item.SerialOocyteNumber).SingleOrDefault();
                    Item.BIOPSYDetails = new List<BIOPSY>();
                    //Item.BIOPSYStatus = new List<CheckBIOPSY>();
                    var GetBIOPSY = new DynamicParameters();
                    GetBIOPSY.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    GetBIOPSY.Add("@PatientID", Item.PatientID, DbType.Int64);
                    GetBIOPSY.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                    GetBIOPSY.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                    GetBIOPSY.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                    GetBIOPSY.Add("@DonorId", DonorId, DbType.Int64);

                    GetBIOPSY.Add("@DonorCycleCode", DonorCycleCode, DbType.Int64);
                    GetBIOPSY.Add("@DonorUnitId", DonorUnitId, DbType.Int64);
                    GetBIOPSY.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                    GetBIOPSY.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                    GetBIOPSY.Add("@Day", 3, DbType.Int32);
                    GetBIOPSY.Add("@DayID", Item.DayThreeID, DbType.Int64);
                    GetBIOPSY.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    GetBIOPSY.Add("@Result", 0, DbType.Int64, ParameterDirection.Output);
                    Item.BIOPSYDetails = Con.Query<BIOPSY>(GenericSP.GetBIOPSYDetails, GetBIOPSY, commandType: CommandType.StoredProcedure).ToList();
                    long ID = GetBIOPSY.Get<Int64>("@Result");

                    Item.BIOPSYStatus = ID;

                }

            }

            return Oocytelist;
        }



        public long SaveDayThreeProcess(List<DayThreeVO> DayThreeData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (DayThreeVO item in DayThreeData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@DayThreeID", item.DayThreeID, DbType.Int64);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@PatientID", item.PatientID, DbType.Int64);
                        Param.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                        Param.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                        Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                        Param.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                        Param.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                        Param.Add("@Date", item.Date, DbType.DateTime);
                        Param.Add("@Time", item.Time, DbType.DateTime);
                        Param.Add("@CellStage", item.CellStageID, DbType.Int32);
                        Param.Add("@GradeID", item.GradeID, DbType.Int32);
                        Param.Add("@CleavageID", item.CleavageID, DbType.Int32);   //Added by Nayan Kamble
                        //added by neena
                        Param.Add("@SymmetryID", item.SymmetryID, DbType.Int32);
                        Param.Add("@FragmentationID", item.FragmentationID, DbType.Int32);
                        Param.Add("@FragmentationDistributionID", item.FragmentationDistributionID, DbType.Int32);
                        Param.Add("@NucleiID", item.NucleiID, DbType.Int32);
                        Param.Add("@Fragmentation", item.Fragmentation, DbType.String);
                        //
                        Param.Add("@Plan", item.PlanID, DbType.Int32);
                        Param.Add("@AssistedHatching", item.AssistedHatching, DbType.Boolean);
                        Param.Add("@Incubator", item.IncubatorID, DbType.Int32);
                        Param.Add("@Remarks", item.Remarks, DbType.String);
                        Param.Add("@Embryologist", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@Witness", item.WitnessID, DbType.Int64);
                        Param.Add("@PGD", item.PGD, DbType.Int32);
                        Param.Add("@PGDPGSDate", item.PGDPGSDate, DbType.DateTime);
                        Param.Add("@PGDPGSTime", item.PGDPGSTime, DbType.DateTime);
                        Param.Add("@PGDPGSMethodID", item.PGDPGSMethodID, DbType.Int32);
                        if (item.PGDPGSDOC != null)
                        {
                            Param.Add("@PGDPGSDOC", System.Text.Encoding.UTF8.GetBytes(item.PGDPGSDOC));
                        }
                        Param.Add("@ResultID", item.ResultID, DbType.Int32);
                        if (item.BIOPSYDetails != null)
                        {
                            Param.Add("@ISBIOPSY", 1);
                        }
                        else
                        {
                            Param.Add("@ISBIOPSY", 0);
                        }
                        Param.Add("@Finalize", item.Finalize, DbType.Boolean);
                        Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                        Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                        Param.Add("@IsExtend", item.IsExtend, DbType.Boolean);
                        Param.Add("@IsDonarEMb", item.IsFromDonar, DbType.Boolean);
                        Param.Add("@Donor", item.Donor);
                        if (item.Donor == true)
                        {
                            if (item.PlanID == 6 || item.PlanID == 5)
                            {
                                Param.Add("@DonorEmb", 1);
                            }
                            else
                            {
                                Param.Add("@DonorEmb", item.DonorEmb);
                            }
                        }
                        else
                        {
                            Param.Add("@DonorEmb", item.DonorEmb);
                        }
                        if (item.PlanID == 2 || item.PlanID == 6)
                        {
                            Param.Add("@Fresh", 0);
                        }
                        else
                        {
                            Param.Add("@Fresh", item.Fresh);
                        }
                        if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                        {
                            //Param.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                            //Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                            Param.Add("@CoupleID", item.CoupleID, DbType.Int64);
                            Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        }
                        Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                        this.Con.Execute(GenericSP.SaveDayThree, Param, commandType: CommandType.StoredProcedure);
                        long ID = Param.Get<Int64>("@ID");
                        //Insert Images OocytesWise
                        if (item.Img != null)
                        {
                            if (item.Img.model != null)
                            {
                                //Delete EXisting Images 
                                var DelImg = new DynamicParameters();
                                DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                DelImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                DelImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                DelImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                DelImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                DelImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                DelImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                DelImg.Add("@Day", 3, DbType.Int32);
                                DelImg.Add("@DayID", ID, DbType.Int64);
                                DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                Con.Execute(GenericSP.DeleteOocytesImg, DelImg, commandType: CommandType.StoredProcedure);
                                foreach (model1 Imgitem in item.Img.model)
                                {
                                    //Insert images in database
                                    var ParImg = new DynamicParameters();
                                    ParImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                    ParImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    ParImg.Add("@Day", 3, DbType.Int32);
                                    ParImg.Add("@DayID", ID, DbType.Int64);
                                    ParImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/jpeg;base64,", "");
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/png;base64,", "");
                                    ParImg.Add("@Image", Convert.FromBase64String(Imgitem.preview), DbType.Binary);
                                    ParImg.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                                    ParImg.Add("@AddedOn", Environment.MachineName, DbType.String);
                                    ParImg.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                    ParImg.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                                    Con.Execute(GenericSP.SaveDaywiseImg, ParImg, commandType: CommandType.StoredProcedure);
                                }
                                //Insert Donar Image agins couple
                                if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                                {
                                    if (item.PlanID == 5)
                                    {
                                        var TransferImg = new DynamicParameters();
                                        TransferImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        TransferImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                        TransferImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                        TransferImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                        TransferImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                        TransferImg.Add("@Day", 3, DbType.Int32);
                                        TransferImg.Add("@DayID", ID, DbType.Int64);
                                        //TransferImg.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                                        //TransferImg.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                                        TransferImg.Add("@CoupleID", item.CoupleID, DbType.Int64);
                                        TransferImg.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        Con.Execute(GenericSP.SaveDonarImgToCoupleAgains, TransferImg, commandType: CommandType.StoredProcedure);
                                    }
                                }
                            }
                        }
                        if (item.BIOPSYDetails != null)
                        {
                            //Delete EXisting BIOPSY 
                            var DelBIOPSY = new DynamicParameters();
                            DelBIOPSY.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            DelBIOPSY.Add("@PatientID", item.PatientID, DbType.Int64);
                            DelBIOPSY.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                            DelBIOPSY.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                            DelBIOPSY.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                            DelBIOPSY.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                            DelBIOPSY.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                            DelBIOPSY.Add("@Day", 3, DbType.Int32);
                            DelBIOPSY.Add("@DayID", ID, DbType.Int64);
                            DelBIOPSY.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Con.Execute(GenericSP.DeleteBIOPSY, DelBIOPSY, commandType: CommandType.StoredProcedure);

                            foreach (BIOPSY BB in item.BIOPSYDetails)
                            {
                                if (BB.Monosomy != "" || BB.Trisomy != "")
                                {
                                    //Insert Biopsy in database
                                    var ParBIOPSY = new DynamicParameters();
                                    ParBIOPSY.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParBIOPSY.Add("@PatientID", item.PatientID, DbType.Int64);
                                    ParBIOPSY.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    ParBIOPSY.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParBIOPSY.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParBIOPSY.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParBIOPSY.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    ParBIOPSY.Add("@Day", 3, DbType.Int32);
                                    ParBIOPSY.Add("@DayID", ID, DbType.Int64);
                                    ParBIOPSY.Add("@EmbryoNo", BB.EmbryoNo, DbType.Int32);
                                    ParBIOPSY.Add("@Monosomy", BB.Monosomy, DbType.String);
                                    ParBIOPSY.Add("@Trisomy", BB.Trisomy, DbType.String);
                                    Con.Execute(GenericSP.SaveBIOPSY, ParBIOPSY, commandType: CommandType.StoredProcedure);
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
        //Day Four start
        public IEnumerable<DayFourVO> fillDayFourOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            List<DayFourVO> Oocytelist = new List<DayFourVO>();
            List<DayZeroForToolTip> DayZeroForToolTip = new List<DayZeroForToolTip>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.fillDayFourOocyteGrid, Param, commandType: CommandType.StoredProcedure);
            Oocytelist = QueryMultiple.Read<DayFourVO>().ToList();
            DayZeroForToolTip = QueryMultiple.Read<DayZeroForToolTip>().ToList();
            List<LinkedPatientList> LinkedPatientList = QueryMultiple.Read<LinkedPatientList>().ToList();
            foreach (DayFourVO Item in Oocytelist)
            {
                if (Item.ID != 0)
                {
                    Item.LinkPatientList = LinkedPatientList;
                    Item.Img = new OocytesImage();
                    Item.Img.model = new List<model1>();
                    var DelImg = new DynamicParameters();
                    DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    DelImg.Add("@PatientID", Item.PatientID, DbType.Int64);
                    DelImg.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                    DelImg.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                    DelImg.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                    DelImg.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                    DelImg.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                    DelImg.Add("@Day", 4, DbType.Int32);
                    DelImg.Add("@DayID", Item.DayFourID, DbType.Int64);
                    DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Item.Img.model = Con.Query<model1>(GenericSP.GetOocytesImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                    Item.ZeroTooltip = new Entities.Models.ARTMgmt.Embrology.DayZeroForToolTip();
                    Item.ZeroTooltip = DayZeroForToolTip.Where(p => p.OocyteNumber == Item.OocyteNumber && p.SerialOocuteNumber == Item.SerialOocyteNumber).SingleOrDefault();
                }
            }
            return Oocytelist;
        }
        public DayFourVO FillDayFourMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            DayFourVO Obj = new DayFourVO();
            Obj.CellStage = new List<CommanEntity>();
            Obj.Incubator = new List<CommanEntity>();
            Obj.Plan = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            Obj.Grade = new List<CommanEntity>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillDayFourMaster, Param, commandType: CommandType.StoredProcedure);
            Obj.CellStage = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Plan = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Incubator = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Symmetry = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationDistribution = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationList = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Nuclei = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Grade = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.DonarLinkCycleIsAvialble = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISDonarEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            return Obj;
        }
        public long SaveDayFourProcess(List<DayFourVO> DayFourData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (DayFourVO item in DayFourData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@DayFourID", item.DayFourID, DbType.Int64);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@PatientID", item.PatientID, DbType.Int64);
                        Param.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                        Param.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                        Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                        Param.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                        Param.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                        Param.Add("@Date", item.Date, DbType.DateTime);
                        Param.Add("@Time", item.Time, DbType.DateTime);
                        Param.Add("@CellStage", item.CellStageID, DbType.Int32);
                        Param.Add("@GradeID", item.GradeID, DbType.Int32);
                        //added by neena
                        Param.Add("@SymmetryID", item.SymmetryID, DbType.Int32);
                        Param.Add("@FragmentationID", item.FragmentationID, DbType.Int32);
                        Param.Add("@FragmentationDistributionID", item.FragmentationDistributionID, DbType.Int32);
                        Param.Add("@NucleiID", item.NucleiID, DbType.Int32);
                        Param.Add("@Fragmentation", item.Fragmentation, DbType.String);
                        //
                        Param.Add("@Plan", item.PlanID, DbType.Int32);
                        Param.Add("@AssistedHatching", item.AssistedHatching, DbType.Boolean);
                        Param.Add("@Incubator", item.IncubatorID, DbType.Int32);
                        Param.Add("@Remarks", item.Remarks, DbType.String);
                        Param.Add("@Embryologist", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@Witness", item.WitnessID, DbType.Int64);
                        Param.Add("@Finalize", item.Finalize, DbType.Boolean);
                        Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                        Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                        Param.Add("@IsExtend", item.IsExtend, DbType.Boolean);
                        Param.Add("@IsDonarEMb", item.IsFromDonar, DbType.Boolean);
                        Param.Add("@Donor", item.Donor);
                        if (item.Donor == true)
                        {
                            if (item.PlanID == 6 || item.PlanID == 5)
                            {
                                Param.Add("@DonorEmb", 1);
                            }
                            else
                            {
                                Param.Add("@DonorEmb", item.DonorEmb);
                            }
                        }
                        else
                        {
                            Param.Add("@DonorEmb", item.DonorEmb);
                        }
                        if (item.PlanID == 2 || item.PlanID == 6)
                        {
                            Param.Add("@Fresh", 0);
                        }
                        else
                        {
                            Param.Add("@Fresh", item.Fresh);
                        }
                        if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                        {
                            //Param.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                            //Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                            Param.Add("@CoupleID", item.CoupleID, DbType.Int64);
                            Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        }
                        Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                        this.Con.Execute(GenericSP.SaveDayFour, Param, commandType: CommandType.StoredProcedure);
                        long ID = Param.Get<Int64>("@ID");
                        //Insert Images OocytesWise
                        if (item.Img != null)
                        {
                            if (item.Img.model != null)
                            {
                                //Delete EXisting Images 
                                var DelImg = new DynamicParameters();
                                DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                DelImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                DelImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                DelImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                DelImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                DelImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                DelImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                DelImg.Add("@Day", 4, DbType.Int32);
                                DelImg.Add("@DayID", ID, DbType.Int64);
                                DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                Con.Execute(GenericSP.DeleteOocytesImg, DelImg, commandType: CommandType.StoredProcedure);
                                foreach (model1 Imgitem in item.Img.model)
                                {
                                    //Insert images in database
                                    var ParImg = new DynamicParameters();
                                    ParImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                    ParImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    ParImg.Add("@Day", 4, DbType.Int32);
                                    ParImg.Add("@DayID", ID, DbType.Int64);
                                    ParImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/jpeg;base64,", "");
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/png;base64,", "");
                                    ParImg.Add("@Image", Convert.FromBase64String(Imgitem.preview), DbType.Binary);
                                    ParImg.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                                    ParImg.Add("@AddedOn", Environment.MachineName, DbType.String);
                                    ParImg.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                    ParImg.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                                    Con.Execute(GenericSP.SaveDaywiseImg, ParImg, commandType: CommandType.StoredProcedure);
                                }
                                //Insert Donar Image agins couple
                                if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                                {
                                    if (item.PlanID == 5)
                                    {
                                        var TransferImg = new DynamicParameters();
                                        TransferImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        TransferImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                        TransferImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                        TransferImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                        TransferImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                        TransferImg.Add("@Day", 4, DbType.Int32);
                                        TransferImg.Add("@DayID", ID, DbType.Int64);
                                        //TransferImg.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                                        //TransferImg.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                                        Param.Add("@CoupleID", item.CoupleID, DbType.Int64);
                                        Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        Con.Execute(GenericSP.SaveDonarImgToCoupleAgains, TransferImg, commandType: CommandType.StoredProcedure);
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

        #region Day 0 
        public int SaveDayZeroProcess(List<DayZeroVO> DayZeroData)
        {
            int ResultStatus = 0;
            try
            {
                var Param = new DynamicParameters();
                foreach (var item in DayZeroData)
                {
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@FemalePatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                    Param.Add("@FemalePatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                    Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    Param.Add("@OocyteNumber", item.OocyteNumber);
                    Param.Add("@SerialOocuteNumber", item.SerialOocuteNumber);
                    Param.Add("@Plan", item.Plan);
                    Param.Add("@TypeCase", item.TypeCase);
                    Param.Add("@Breakage", item.Breakage);
                    Param.Add("@SelectedDate", item.SelectedDate);
                    Param.Add("@SelectedTime", item.SelectedTime);
                    Param.Add("@Embryologist", item.Embryologist);
                    Param.Add("@Witness", item.Witness);
                    Param.Add("@Maturity", item.Maturity);
                    Param.Add("@OCD", item.OCD);
                    Param.Add("@ECD", item.ECD);
                    Param.Add("@OCC", item.OCC);
                    Param.Add("@IVMDate", item.IVMDate);
                    Param.Add("@IVMTime", item.IVMTime);
                    Param.Add("@PlanDate", item.PlanDate);
                    Param.Add("@PlanTime", item.PlanTime);
                    Param.Add("@IVMMaturity", item.IVMMaturity);
                    Param.Add("@PreMaturity", item.IVMPreMaturity);
                    Param.Add("@PlanStartTime", item.PlanStartTime);
                    Param.Add("@PlanEndTime", item.PlanEndTime);
                    Param.Add("@PlanStartDate", item.PlanStartDate);
                    Param.Add("@PlanEndDate", item.PlanEndDate);
                    Param.Add("@Embryoscope", item.Embryoscope);
                    Param.Add("@ZP", item.ZP);
                    Param.Add("@PB", item.PB);
                    Param.Add("@PVS", item.PVS);
                    Param.Add("@Cytoplasm", item.Cytoplasm);
                    Param.Add("@SpermMorphology", item.SpermMorphology);
                    Param.Add("@PBLocation", item.PBLocation);
                    Param.Add("@Attempts", item.Attempts);
                    Param.Add("@Semen", item.Semen);
                    Param.Add("@Incubator", item.Incubator);
                    Param.Add("@Remarks", item.Remarks);
                    Param.Add("@IVM", item.IVM);
                    Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@UpdatedOn", Environment.MachineName);
                    Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@UpdatedDateTime", item.UpdatedDateTime);
                    Param.Add("@UpdatedWindowLoginName", Environment.UserName);
                    Param.Add("@IsCommonIncubator", item.IsCommonIncubator);
                    Param.Add("@PreprationIDOrThawID", item.SemenDetail.ID);
                    //Param.Add("@Donor", item.Donor);
                    //if(item.Plan==1 || item.Plan == 7)
                    //{
                    //    Param.Add("@Fresh", 0);
                    //}
                    //else
                    //{
                    //    Param.Add("@Fresh", item.Fresh);
                    //}
                    //Param.Add("@DonorEmb", 0);


                    Param.Add("@IsPreprationID", item.SemenDetail.IsSemenPrepration);
                    Param.Add("@ResultStatus", 0, DbType.Int32, ParameterDirection.Output);
                    this.Con.Execute(GenericSP.SaveUpdateDayZero, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus = Param.Get<Int32>("@ResultStatus");
                }
            }
            catch (Exception e)
            {
                ResultStatus = 0;
            }
            return ResultStatus;
        }
        public IEnumerable<DayZeroVO> FillDayZeroOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            List<DayZeroVO> Oocytelist = new List<DayZeroVO>();
            DayZeroVO Day0 = new DayZeroVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@PatientID", PatientID);
                Param.Add("@PatientUnitID", PatientUnitID);
                Param.Add("@PlanTherapyID", TherapyID);
                Param.Add("@PlanTherapyUnitID", TherapyUnitID);
                var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetOocytesGridForDay0, Param, commandType: CommandType.StoredProcedure);
                // Oocytelist = Con.Query<DayZeroVO>(GenericSP.GetOocytesGridForDay0, Param, commandType: CommandType.StoredProcedure).ToList();
                Oocytelist = QueryMultiple.Read<DayZeroVO>().ToList();
                Day0.LinkPatientList = QueryMultiple.Read<LinkedPatientList>().ToList();


                foreach (DayZeroVO Item in Oocytelist)
                {
                    Item.LinkPatientList = Day0.LinkPatientList;


                    if (Item.Day0ID != 0)
                    {
                        Item.Img = new OocytesImage();
                        Item.Img.model = new List<model1>();
                        var DelImg = new DynamicParameters();
                        DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        DelImg.Add("@PatientID", Item.FemalePatientID, DbType.Int64);
                        DelImg.Add("@PatientUnitID", Item.FemalePatientUnitID, DbType.Int64);
                        DelImg.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                        DelImg.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                        DelImg.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                        DelImg.Add("@SerialOocuteNumber", Item.SerialOocuteNumber, DbType.Int64);
                        DelImg.Add("@Day", 0, DbType.Int32);
                        DelImg.Add("@DayID", Item.Day0ID, DbType.Int64);
                        DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Item.Img.model = Con.Query<model1>(GenericSP.GetOocytesImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                    }
                }
            }
            catch (Exception e)
            {

            }
            return Oocytelist;
        }
        public IEnumerable<CommanEntity> GetOocytesForDay0(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, string CycleCode)
        {
            List<CommanEntity> Oocytelist = new List<CommanEntity>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@PatientID", PatientID);
                Param.Add("@PatientUnitID", PatientUnitID);
                Param.Add("@PlanTherapyID", TherapyID);
                Param.Add("@PlanTherapyUnitID", TherapyUnitID);
                Param.Add("@CycleCode", CycleCode);

                Oocytelist = Con.Query<CommanEntity>(GenericSP.GetOocytesForDay0, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {
                Oocytelist = new List<CommanEntity>();
            }
            return Oocytelist;
        }
        public List<SemenDetail> GetSemenDetails(int SemenID)
        {
            List<SemenDetail> Semenlist = new List<SemenDetail>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                Param.Add("@PatientID", GenericSP.SelectedCouple.MalePatient.MaleId);
                Param.Add("@PatientUnitID", GenericSP.SelectedCouple.MalePatient.MAleUnitID);
                Param.Add("@SemenID", SemenID);

                Semenlist = Con.Query<SemenDetail>(GenericSP.GetSemenDetails, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {
                Semenlist = new List<SemenDetail>();
            }
            return Semenlist;
        }
        public DayZeroVO GetDay0DetailsByID(long ID, long UnitID, long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID)
        {
            DayZeroVO Oocyte = new DayZeroVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);
                Param.Add("@PatientID", PatientID);
                Param.Add("@PatientUnitID", PatientUnitID);
                Param.Add("@PlanTherapyID", PlanTherapyID);
                Param.Add("@PlanTherapyUnitID", PlanTherapyUnitID);

                Oocyte = Con.Query<DayZeroVO>(GenericSP.GetOocytDetailsByID, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception e)
            {
                Oocyte = new DayZeroVO();
            }
            return Oocyte;
        }
        public int SaveDayZeroFinalizeProcess(List<DayZeroVO> DayZeroData)
        {
            int ResultStatus = 0;
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (DayZeroVO item in DayZeroData)
                    {
                        if (item.Finalize == true)
                        {
                            var Param = new DynamicParameters();
                            Param.Add("@ID", item.ID, DbType.Int64);
                            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Param.Add("@FemalePatientID", item.FemalePatientID, DbType.Int64);
                            Param.Add("@FemalePatientUnitID", item.FemalePatientUnitID, DbType.Int64);
                            Param.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                            Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                            Param.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                            Param.Add("@Plan", item.Plan, DbType.Int32);
                            // Param.Add("@Maturity", item.Maturity, DbType.Int32);
                            Param.Add("@SerialOocuteNumber", item.SerialOocuteNumber, DbType.Int64);
                            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                            Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                            Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);

                            Param.Add("@Breakage", item.Breakage);
                            Param.Add("@Maturity", item.Maturity);
                            Param.Add("@OCD", item.OCD);
                            Param.Add("@ECD", item.ECD);
                            Param.Add("@OCC", item.OCC);
                            Param.Add("@Embryoscope", item.Embryoscope);
                            Param.Add("@ZP", item.ZP);
                            Param.Add("@PB", item.PB);
                            Param.Add("@PVS", item.PVS);
                            Param.Add("@Cytoplasm", item.Cytoplasm);
                            Param.Add("@SpermMorphology", item.SpermMorphology);
                            Param.Add("@PBLocation", item.PBLocation);
                            Param.Add("@Location", item.Location);
                            Param.Add("@Attempts", item.Attempts);
                            Param.Add("@Donor", item.Donor);
                            if (item.Plan == 1 || item.Plan == 7)
                            {
                                Param.Add("@Fresh", 0);
                            }
                            else
                            {
                                Param.Add("@Fresh", item.Fresh);
                            }
                            Param.Add("@DonorEmb", 0);

                            if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                            {
                                Param.Add("@CoupleID", item.coupleID, DbType.Int64); //GenericSP.SelectedCouple.FemalePatient.CoupleFemailID
                                Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64); //GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID
                            }
                            Param.Add("@ResultStatus", 0, DbType.Int32, ParameterDirection.Output);
                            Con.Execute(GenericSP.UpdateFinalizedDayZero, Param, commandType: CommandType.StoredProcedure);
                            ResultStatus = Param.Get<Int32>("@ResultStatus");
                        }
                        if (item.Img != null)
                        {
                            if (item.Img.model.Count > 0)
                            {
                                //Delete EXisting Images 
                                var DelImg = new DynamicParameters();
                                DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                DelImg.Add("@PatientID", item.FemalePatientID, DbType.Int64);
                                DelImg.Add("@PatientUnitID", item.FemalePatientUnitID, DbType.Int64);
                                DelImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                DelImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                DelImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                DelImg.Add("@SerialOocuteNumber", item.SerialOocuteNumber, DbType.Int64);
                                DelImg.Add("@Day", 0, DbType.Int32);
                                DelImg.Add("@DayID", item.Day0ID, DbType.Int64);
                                DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                Con.Execute(GenericSP.DeleteOocytesImg, DelImg, commandType: CommandType.StoredProcedure);
                                foreach (model1 Imgitem in item.Img.model)
                                {
                                    //Insert images in database
                                    var ParImg = new DynamicParameters();
                                    ParImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@PatientID", item.FemalePatientID, DbType.Int64);
                                    ParImg.Add("@PatientUnitID", item.FemalePatientUnitID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParImg.Add("@SerialOocuteNumber", item.SerialOocuteNumber, DbType.Int64);
                                    ParImg.Add("@Day", 0, DbType.Int32);
                                    ParImg.Add("@DayID", item.Day0ID, DbType.Int64);
                                    ParImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/jpeg;base64,", "");
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/png;base64,", "");
                                    ParImg.Add("@Image", Convert.FromBase64String(Imgitem.preview), DbType.Binary);
                                    ParImg.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                                    ParImg.Add("@AddedOn", Environment.MachineName, DbType.String);
                                    ParImg.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                    ParImg.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                                    Con.Execute(GenericSP.SaveDaywiseImg, ParImg, commandType: CommandType.StoredProcedure);
                                }
                                //Insert Donar Image agins couple
                                if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                                {
                                    if (item.Plan == 6)
                                    {
                                        var TransferImg = new DynamicParameters();
                                        TransferImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        TransferImg.Add("@PatientID", item.FemalePatientID, DbType.Int64);
                                        TransferImg.Add("@PatientUnitID", item.FemalePatientUnitID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                        TransferImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                        TransferImg.Add("@SerialOocuteNumber", item.SerialOocuteNumber, DbType.Int64);
                                        TransferImg.Add("@Day", 0, DbType.Int32);
                                        TransferImg.Add("@CoupleID", item.coupleID, DbType.Int64);
                                        TransferImg.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        //TransferImg.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                                        //TransferImg.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                                        Con.Execute(GenericSP.SaveDonarImgToCoupleAgains, TransferImg, commandType: CommandType.StoredProcedure);
                                    }
                                }
                            }
                        }
                    }
                    transactionScope.Complete();
                    return 1;
                }
            }
            catch (Exception e)
            {
                return 0;
            }

        }
        #endregion

        //Day 5 Start
        public DayFiveVO FillDayFiveMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            DayFiveVO Obj = new DayFiveVO();
            Obj.BlastocystStage = new List<CommanEntity>();
            Obj.Incubator = new List<CommanEntity>();
            Obj.ICM = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            Obj.TPD = new List<CommanEntity>();
            Obj.Plan = new List<CommanEntity>();
            Obj.PGDPGSMethod = new List<CommanEntity>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillDayFiveMaster, Param, commandType: CommandType.StoredProcedure);
            Obj.BlastocystStage = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Incubator = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.ICM = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.TPD = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationDistribution = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Grade = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Plan = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.PGDPGSMethod = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.DonarLinkCycleIsAvialble = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISDonarEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            return Obj;
        }
        public long SaveDayFiveProcess(List<DayFiveVO> DayFiveData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (DayFiveVO item in DayFiveData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@DayFiveID", item.DayFiveID, DbType.Int64);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@PatientID", item.PatientID, DbType.Int64);
                        Param.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                        Param.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                        Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                        Param.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                        Param.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                        Param.Add("@Date", item.Date, DbType.DateTime);
                        Param.Add("@Time", item.Time, DbType.DateTime);
                        Param.Add("@BlastocystStageID", item.BlastocystStageID, DbType.Int32);
                        Param.Add("@PlanID", item.PlanID, DbType.Int32);
                        Param.Add("@ICMID", item.ICMID, DbType.Int32);
                        Param.Add("@TPDID", item.TPDID, DbType.Int32);
                        Param.Add("@AssistedHatching", item.AssistedHatching, DbType.Boolean);
                        Param.Add("@Incubator", item.IncubatorID, DbType.Int32);
                        Param.Add("@Remarks", item.Remarks, DbType.String);
                        //added by neena
                        Param.Add("@GradeID", item.GradeID, DbType.Int32);
                        Param.Add("@FragmentationDistributionID", item.FragmentationDistributionID, DbType.Int32);
                        //
                        if (item.BIOPSYDetails != null)
                        {
                            Param.Add("@ISBIOPSY", 1);
                        }
                        else
                        {
                            Param.Add("@ISBIOPSY", 0);
                        }
                        Param.Add("@Embryologist", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@Witness", item.WitnessID, DbType.Int64);
                        Param.Add("@PGD", item.PGD, DbType.Int32);
                        Param.Add("@PGDPGSDate", item.PGDPGSDate, DbType.DateTime);
                        Param.Add("@PGDPGSTime", item.PGDPGSTime, DbType.DateTime);
                        Param.Add("@PGDPGSMethodID", item.PGDPGSMethodID, DbType.Int32);
                        if (item.PGDPGSDOC != null)
                        {
                            Param.Add("@PGDPGSDOC", System.Text.Encoding.UTF8.GetBytes(item.PGDPGSDOC));
                        }
                        Param.Add("@ResultID", item.ResultID, DbType.Int32);
                        Param.Add("@Finalize", item.Finalize, DbType.Boolean);
                        Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                        Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                        Param.Add("@IsExtend", item.IsExtend, DbType.Boolean);
                        Param.Add("@IsDonarEMb", item.IsFromDonar, DbType.Boolean);
                        Param.Add("@Donor", item.Donor);
                        if (item.Donor == true)
                        {
                            if (item.PlanID == 6 || item.PlanID == 5)
                            {
                                Param.Add("@DonorEmb", 1);
                            }
                            else
                            {
                                Param.Add("@DonorEmb", item.DonorEmb);
                            }
                        }
                        else
                        {
                            Param.Add("@DonorEmb", item.DonorEmb);
                        }
                        if (item.PlanID == 2 || item.PlanID == 6)
                        {
                            Param.Add("@Fresh", 0);
                        }
                        else
                        {
                            Param.Add("@Fresh", item.Fresh);
                        }
                        if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                        {
                            //Param.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                            //Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                            Param.Add("@CoupleID", item.CoupleID, DbType.Int64);
                            Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        }
                        Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                        this.Con.Execute(GenericSP.SaveDayFive, Param, commandType: CommandType.StoredProcedure);
                        long ID = Param.Get<Int64>("@ID");
                        //Insert Images OocytesWise
                        if (item.Img != null)
                        {
                            if (item.Img.model != null)
                            {
                                //Delete EXisting Images 
                                var DelImg = new DynamicParameters();
                                DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                DelImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                DelImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                DelImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                DelImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                DelImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                DelImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                DelImg.Add("@Day", 5, DbType.Int32);
                                DelImg.Add("@DayID", ID, DbType.Int64);
                                DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                Con.Execute(GenericSP.DeleteOocytesImg, DelImg, commandType: CommandType.StoredProcedure);
                                foreach (model1 Imgitem in item.Img.model)
                                {
                                    //Insert images in database
                                    var ParImg = new DynamicParameters();
                                    ParImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                    ParImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    ParImg.Add("@Day", 5, DbType.Int32);
                                    ParImg.Add("@DayID", ID, DbType.Int64);
                                    ParImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/jpeg;base64,", "");
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/png;base64,", "");
                                    ParImg.Add("@Image", Convert.FromBase64String(Imgitem.preview), DbType.Binary);
                                    ParImg.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                                    ParImg.Add("@AddedOn", Environment.MachineName, DbType.String);
                                    ParImg.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                    ParImg.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                                    Con.Execute(GenericSP.SaveDaywiseImg, ParImg, commandType: CommandType.StoredProcedure);
                                }
                                //Insert Donar Image agins couple
                                if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                                {
                                    if (item.PlanID == 5)
                                    {
                                        var TransferImg = new DynamicParameters();
                                        TransferImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        TransferImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                        TransferImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                        TransferImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                        TransferImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                        TransferImg.Add("@Day", 5, DbType.Int32);
                                        TransferImg.Add("@DayID", ID, DbType.Int64);
                                        //TransferImg.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                                        //TransferImg.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                                        TransferImg.Add("@CoupleID", item.CoupleID, DbType.Int64);
                                        TransferImg.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        Con.Execute(GenericSP.SaveDonarImgToCoupleAgains, TransferImg, commandType: CommandType.StoredProcedure);
                                    }
                                }
                            }
                        }
                        if (item.BIOPSYDetails != null)
                        {
                            //Delete EXisting BIOPSY 
                            var DelBIOPSY = new DynamicParameters();
                            DelBIOPSY.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            DelBIOPSY.Add("@PatientID", item.PatientID, DbType.Int64);
                            DelBIOPSY.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                            DelBIOPSY.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                            DelBIOPSY.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                            DelBIOPSY.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                            DelBIOPSY.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                            DelBIOPSY.Add("@Day", 5, DbType.Int32);
                            DelBIOPSY.Add("@DayID", ID, DbType.Int64);
                            DelBIOPSY.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                            Con.Execute(GenericSP.DeleteBIOPSY, DelBIOPSY, commandType: CommandType.StoredProcedure);

                            foreach (BIOPSY BB in item.BIOPSYDetails)
                            {
                                if (BB.Monosomy != "" || BB.Trisomy != "")
                                {
                                    //Insert Biopsy in database
                                    var ParBIOPSY = new DynamicParameters();
                                    ParBIOPSY.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParBIOPSY.Add("@PatientID", item.PatientID, DbType.Int64);
                                    ParBIOPSY.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    ParBIOPSY.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParBIOPSY.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParBIOPSY.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParBIOPSY.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    ParBIOPSY.Add("@Day", 5, DbType.Int32);
                                    ParBIOPSY.Add("@DayID", ID, DbType.Int64);
                                    ParBIOPSY.Add("@EmbryoNo", BB.EmbryoNo, DbType.Int32);
                                    ParBIOPSY.Add("@Monosomy", BB.Monosomy, DbType.String);
                                    ParBIOPSY.Add("@Trisomy", BB.Trisomy, DbType.String);
                                    Con.Execute(GenericSP.SaveBIOPSY, ParBIOPSY, commandType: CommandType.StoredProcedure);
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
        public IEnumerable<DayFiveVO> fillDayFiveOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID, long DonorID, long DonorCycleCode, long DonorUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            List<DayFiveVO> Oocytelist = new List<DayFiveVO>();
            List<DayZeroForToolTip> DayZeroForToolTip = new List<DayZeroForToolTip>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.fillDayFiveOocyteGrid, Param, commandType: CommandType.StoredProcedure);
            Oocytelist = QueryMultiple.Read<DayFiveVO>().ToList();
            DayZeroForToolTip = QueryMultiple.Read<DayZeroForToolTip>().ToList();
            List<LinkedPatientList> LinkedPatientList = QueryMultiple.Read<LinkedPatientList>().ToList();
            foreach (DayFiveVO Item in Oocytelist)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(Item.PGDPGSbyte)))
                {
                    Item.PGDPGSDOC = System.Text.Encoding.UTF8.GetString(Item.PGDPGSbyte);
                }
                if (Item.ID != 0)
                {
                    Item.LinkPatientList = LinkedPatientList;
                    Item.Img = new OocytesImage();
                    Item.Img.model = new List<model1>();
                    var DelImg = new DynamicParameters();
                    DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    DelImg.Add("@PatientID", Item.PatientID, DbType.Int64);
                    DelImg.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                    DelImg.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                    DelImg.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                    DelImg.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                    DelImg.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                    DelImg.Add("@Day", 5, DbType.Int32);
                    DelImg.Add("@DayID", Item.DayFiveID, DbType.Int64);
                    DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Item.Img.model = Con.Query<model1>(GenericSP.GetOocytesImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                    Item.ZeroTooltip = new Entities.Models.ARTMgmt.Embrology.DayZeroForToolTip();
                    Item.ZeroTooltip = DayZeroForToolTip.Where(p => p.OocyteNumber == Item.OocyteNumber && p.SerialOocuteNumber == Item.SerialOocyteNumber).SingleOrDefault();

                    Item.BIOPSYDetails = new List<BIOPSY>();
                    var GetBIOPSY = new DynamicParameters();
                    GetBIOPSY.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    GetBIOPSY.Add("@PatientID", Item.PatientID, DbType.Int64);
                    GetBIOPSY.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                    GetBIOPSY.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                    GetBIOPSY.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                    GetBIOPSY.Add("@DonorId", DonorID, DbType.Int64);

                    GetBIOPSY.Add("@DonorCycleCode", DonorCycleCode, DbType.Int64);
                    GetBIOPSY.Add("@DonorUnitId", DonorUnitID, DbType.Int64);
                    GetBIOPSY.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                    GetBIOPSY.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                    GetBIOPSY.Add("@Day", 5, DbType.Int32);
                    GetBIOPSY.Add("@DayID", Item.DayFiveID, DbType.Int64);
                    GetBIOPSY.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    GetBIOPSY.Add("@Result", 0, DbType.Int64, ParameterDirection.Output);
                    Item.BIOPSYDetails = Con.Query<BIOPSY>(GenericSP.GetBIOPSYDetails, GetBIOPSY, commandType: CommandType.StoredProcedure).ToList();
                    long ID = GetBIOPSY.Get<Int64>("@Result");
                    Item.BIOPSYStatus = ID;

                }

            }
            return Oocytelist;
        }
        //Day 6 Start
        public DaySixVO FillDaySixMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            DaySixVO Obj = new DaySixVO();
            Obj.BlastocystStage = new List<CommanEntity>();
            Obj.Incubator = new List<CommanEntity>();
            Obj.ICM = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            Obj.TPD = new List<CommanEntity>();
            Obj.Plan = new List<CommanEntity>();
            Obj.PGDPGSMethod = new List<CommanEntity>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillDaySixMaster, Param, commandType: CommandType.StoredProcedure);
            Obj.BlastocystStage = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Incubator = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.ICM = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.TPD = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationDistribution = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Grade = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Plan = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.PGDPGSMethod = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.DonarLinkCycleIsAvialble = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISDonarEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            return Obj;
        }
        public IEnumerable<DaySixVO> fillDaySixOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            List<DaySixVO> Oocytelist = new List<DaySixVO>();
            List<DayZeroForToolTip> DayZeroForToolTip = new List<DayZeroForToolTip>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.fillDaySixOocyteGrid, Param, commandType: CommandType.StoredProcedure);
            Oocytelist = QueryMultiple.Read<DaySixVO>().ToList();
            DayZeroForToolTip = QueryMultiple.Read<DayZeroForToolTip>().ToList();
            List<LinkedPatientList> LinkedPatientList = QueryMultiple.Read<LinkedPatientList>().ToList();
            foreach (DaySixVO Item in Oocytelist)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(Item.PGDPGSbyte)))
                {
                    Item.PGDPGSDOC = System.Text.Encoding.UTF8.GetString(Item.PGDPGSbyte);
                }
                if (Item.ID != 0)
                {
                    Item.LinkPatientList = LinkedPatientList;
                    Item.Img = new OocytesImage();
                    Item.Img.model = new List<model1>();
                    var DelImg = new DynamicParameters();
                    DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    DelImg.Add("@PatientID", Item.PatientID, DbType.Int64);
                    DelImg.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                    DelImg.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                    DelImg.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                    DelImg.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                    DelImg.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                    DelImg.Add("@Day", 6, DbType.Int32);
                    DelImg.Add("@DayID", Item.DaySixID, DbType.Int64);
                    DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Item.Img.model = Con.Query<model1>(GenericSP.GetOocytesImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                    Item.ZeroTooltip = new Entities.Models.ARTMgmt.Embrology.DayZeroForToolTip();
                    Item.ZeroTooltip = DayZeroForToolTip.Where(p => p.OocyteNumber == Item.OocyteNumber && p.SerialOocuteNumber == Item.SerialOocyteNumber).SingleOrDefault();
                }
            }
            return Oocytelist;
        }
        public long SaveDaySixProcess(List<DaySixVO> DaySixData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (DaySixVO item in DaySixData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@DaySixID", item.DaySixID, DbType.Int64);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@PatientID", item.PatientID, DbType.Int64);
                        Param.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                        Param.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                        Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                        Param.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                        Param.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                        Param.Add("@Date", item.Date, DbType.DateTime);
                        Param.Add("@Time", item.Time, DbType.DateTime);
                        Param.Add("@BlastocystStageID", item.BlastocystStageID, DbType.Int32);
                        Param.Add("@PlanID", item.PlanID, DbType.Int32);
                        Param.Add("@ICMID", item.ICMID, DbType.Int32);
                        Param.Add("@TPDID", item.TPDID, DbType.Int32);
                        Param.Add("@AssistedHatching", item.AssistedHatching, DbType.Boolean);
                        Param.Add("@Incubator", item.IncubatorID, DbType.Int32);
                        Param.Add("@Remarks", item.Remarks, DbType.String);
                        //added by neena
                        Param.Add("@GradeID", item.GradeID, DbType.Int32);
                        Param.Add("@FragmentationDistributionID", item.FragmentationDistributionID, DbType.Int32);
                        //
                        Param.Add("@Embryologist", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@Witness", item.WitnessID, DbType.Int64);
                        Param.Add("@PGD", item.PGD, DbType.Int32);
                        Param.Add("@PGDPGSDate", item.PGDPGSDate, DbType.DateTime);
                        Param.Add("@PGDPGSTime", item.PGDPGSTime, DbType.DateTime);
                        Param.Add("@PGDPGSMethodID", item.PGDPGSMethodID, DbType.Int32);
                        if (item.PGDPGSDOC != null)
                        {
                            Param.Add("@PGDPGSDOC", System.Text.Encoding.UTF8.GetBytes(item.PGDPGSDOC));
                        }
                        Param.Add("@ResultID", item.ResultID, DbType.Int32);
                        Param.Add("@Finalize", item.Finalize, DbType.Boolean);
                        Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                        Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                        Param.Add("@IsExtend", item.IsExtend, DbType.Boolean);
                        Param.Add("@IsDonarEMb", item.IsFromDonar, DbType.Boolean);
                        Param.Add("@Donor", item.Donor);
                        if (item.Donor == true)
                        {
                            if (item.PlanID == 6 || item.PlanID == 5)
                            {
                                Param.Add("@DonorEmb", 1);
                            }
                            else
                            {
                                Param.Add("@DonorEmb", item.DonorEmb);
                            }
                        }
                        else
                        {
                            Param.Add("@DonorEmb", item.DonorEmb);
                        }
                        if (item.PlanID == 2 || item.PlanID == 6)
                        {
                            Param.Add("@Fresh", 0);
                        }
                        else
                        {
                            Param.Add("@Fresh", item.Fresh);
                        }
                        if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                        {
                            //Param.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                            //Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                            Param.Add("@CoupleID", item.CoupleID, DbType.Int64);
                            Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        }
                        Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                        this.Con.Execute(GenericSP.SaveDaySix, Param, commandType: CommandType.StoredProcedure);
                        long ID = Param.Get<Int64>("@ID");
                        //Insert Images OocytesWise
                        if (item.Img != null)
                        {
                            if (item.Img.model != null)
                            {
                                //Delete EXisting Images 
                                var DelImg = new DynamicParameters();
                                DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                DelImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                DelImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                DelImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                DelImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                DelImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                DelImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                DelImg.Add("@Day", 6, DbType.Int32);
                                DelImg.Add("@DayID", ID, DbType.Int64);
                                DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                Con.Execute(GenericSP.DeleteOocytesImg, DelImg, commandType: CommandType.StoredProcedure);
                                foreach (model1 Imgitem in item.Img.model)
                                {
                                    //Insert images in database
                                    var ParImg = new DynamicParameters();
                                    ParImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                    ParImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    ParImg.Add("@Day", 6, DbType.Int32);
                                    ParImg.Add("@DayID", ID, DbType.Int64);
                                    ParImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/jpeg;base64,", "");
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/png;base64,", "");
                                    ParImg.Add("@Image", Convert.FromBase64String(Imgitem.preview), DbType.Binary);
                                    ParImg.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                                    ParImg.Add("@AddedOn", Environment.MachineName, DbType.String);
                                    ParImg.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                    ParImg.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                                    Con.Execute(GenericSP.SaveDaywiseImg, ParImg, commandType: CommandType.StoredProcedure);
                                }
                                //Insert Donar Image agins couple
                                if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                                {
                                    if (item.PlanID == 5)
                                    {
                                        var TransferImg = new DynamicParameters();
                                        TransferImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        TransferImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                        TransferImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                        TransferImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                        TransferImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                        TransferImg.Add("@Day", 6, DbType.Int32);
                                        TransferImg.Add("@DayID", ID, DbType.Int64);
                                        //TransferImg.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                                        //TransferImg.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                                        TransferImg.Add("@CoupleID", item.CoupleID, DbType.Int64);
                                        TransferImg.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        Con.Execute(GenericSP.SaveDonarImgToCoupleAgains, TransferImg, commandType: CommandType.StoredProcedure);
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
        public long CheckLinkCouplecycleAvialbleOrNot(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", PlanTherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", PlanTherapyUnitID, DbType.Int64);
            return this.Con.Query<long>(GenericSP.CheckLinkCouplecycleAvialbleOrNot, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }
        public List<DayWiseInfoForBiopsy> GetDayWiseInfoForBiopsy(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID)
        {
            DayWiseInfoForBiopsy obj = new DayWiseInfoForBiopsy();
            var paramReceiptList = new DynamicParameters();

            paramReceiptList.Add("@PatientID", PatientID);
            paramReceiptList.Add("@PatientUnitID", PatientUnitID);
            paramReceiptList.Add("@PlanTherapyID", PlanTherapyID);
            paramReceiptList.Add("@PlanTherapyUnitID", PlanTherapyUnitID);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<DayWiseInfoForBiopsy>(GenericSP.GetDayWiseInfoForBiopsy, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public int AddIVFDashboardBIOPSYDetails(EmbryoData obj)
        {
            int resultStatus = 0;
            var param = new DynamicParameters();

            try
            {
                using (var transactionScope = new TransactionScope())
                {

                    param.Add("@ID", obj.ID);
                    param.Add("@UnitID", obj.UnitID);
                    param.Add("@SerialOocyteNumber", obj.SerialOocyteNumber);
                    param.Add("@OocyteNumber", obj.OocyteNumber);
                    param.Add("@FemalePatientID", obj.FemalePatientID);
                    param.Add("@FemalePatientUnitID", obj.FemalePatientUnitID);
                    param.Add("@PlanTherapyID", obj.PlanTherapyID);
                    param.Add("@PlanTherapyUnitID", obj.PlanTherapyUnitID);
                    param.Add("@Day", obj.Day);
                    param.Add("@DayID", obj.DayID);
                    param.Add("@EmbryoNo", obj.EmbryoNo);
                    param.Add("@Monosomy", obj.Monosomy);
                    param.Add("@Trisomy", obj.Trisomy);

                    param.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
                    param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    Con.Execute(GenericSP.AddIVFDashboardBIOPSYDetails, param, commandType: CommandType.StoredProcedure);

                    transactionScope.Complete();

                    resultStatus = param.Get<int>("@ResultStatus");
                }
            }
            catch (Exception ex)
            {
                resultStatus = 0;
            }

            return resultStatus;
        }

        public PGTUserAuth GetPGTUserAuthInfoAccesstoken(long UserId)
        {
            PGTUserAuth obj = new PGTUserAuth();
            var param = new DynamicParameters();

            param.Add("@UserID", UserId);
            param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            var queryMultiple = this.Con.QueryMultiple(GenericSP.GetPGTUserAuthInfo, param, commandType: CommandType.StoredProcedure);
            obj = queryMultiple.Read<PGTUserAuth>().SingleOrDefault();
            obj.AccessToken = SecurityDAL.DecryptString(obj.AccessToken);
            return obj;
        }


        public string GetPGTEmbryolgist(string accessToken)
        {
            try
            {
                if (string.IsNullOrEmpty(accessToken))
                    throw new ArgumentException("Access token is required.");

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var apiUrl = "https://dev.progenesis.com/api/v2/doctors";
                    HttpResponseMessage response = client.GetAsync(apiUrl).Result;  // .NET 4.5 doesn't support `await`

                    string responseContent = response.Content.ReadAsStringAsync().Result;

                    if (response.IsSuccessStatusCode)
                        return responseContent;
                    else
                        throw new Exception($"Error from API: {response.StatusCode} - {responseContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch embryologists: " + ex.Message);
            }
        }
        public string GetPGTClinicusers(string accessToken)
        {
            try
            {
                if (string.IsNullOrEmpty(accessToken))
                    throw new ArgumentException("Access token is required.");

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var apiUrl = "https://dev.progenesis.com/api/v2/clinic-users";
                    HttpResponseMessage response = client.GetAsync(apiUrl).Result;  // .NET 4.5 doesn't support `await`

                    string responseContent = response.Content.ReadAsStringAsync().Result;

                    if (response.IsSuccessStatusCode)
                        return responseContent;
                    else
                        throw new Exception($"Error from API: {response.StatusCode} - {responseContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch embryologists: " + ex.Message);
            }
        }
        public string GetPGTPhysicians(string accessToken)
        {
            try
            {
                if (string.IsNullOrEmpty(accessToken))
                    throw new ArgumentException("Access token is required.");

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var apiUrl = "https://dev.progenesis.com/api/v2/embryologists";
                    HttpResponseMessage response = client.GetAsync(apiUrl).Result;  // .NET 4.5 doesn't support `await`

                    string responseContent = response.Content.ReadAsStringAsync().Result;

                    if (response.IsSuccessStatusCode)
                        return responseContent;
                    else
                        throw new Exception($"Error from API: {response.StatusCode} - {responseContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to fetch embryologists: " + ex.Message);
            }
        }
        public PGTUserAuth GetPGTUserAuthInfo(PGTUserAuthRequest request)
        {
            PGTUserAuth obj = new PGTUserAuth();
            var param = new DynamicParameters();
            _userID = request.UserID;
            param.Add("@UserID", request.UserID);
            param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            var queryMultiple = this.Con.QueryMultiple(GenericSP.GetPGTUserAuthInfo, param, commandType: CommandType.StoredProcedure);
            obj = queryMultiple.Read<PGTUserAuth>().SingleOrDefault();
            GenericSP.CurrentUser.UserID = (int)request.UserID;
            //request.AccessToken = obj.AccessToken;

            request.AccessToken = SecurityDAL.DecryptString(obj.AccessToken);
            obj.AccessToken = SecurityDAL.DecryptString(obj.AccessToken);
            if (obj != null && obj.ResultStatus == 2)
            {
                var redirectObj = RedirectToProgenesis(request.UserID);
                //  var apiResponse = ValidatePatientWithProgenesis(request);
                obj.AuthUrl = redirectObj.AuthUrl; // Set Auth URL in the same response
            }
            else
            {
                // ✅ Call the API in the else part
                // var apiResponse = ValidatePatientWithProgenesis(request);
                //      GetDayWiseInfoForBiopsy(GenericSP.SelectedCouple.FemalePatient.FemalePatientID, GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID, GenericSP.SelectedCouple.FemalePatient.TherapyID, GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                // obj.AuthUrl = apiResponse; // Save response (if needed)
            }
            return obj;
        }
        private void FetchClinicSettings(PGTUserAuthRequest obj)
        {
            try
            {
                var apiUrl = "https://dev.progenesis.com/api/v2/clinic-settings";

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    // ✅ Set Authorization Header
                    if (!string.IsNullOrEmpty(obj.AccessToken))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", obj.AccessToken);
                    }

                    HttpResponseMessage response = client.GetAsync(apiUrl).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string responseString = response.Content.ReadAsStringAsync().Result;
                        var jsonResponse = JObject.Parse(responseString);

                        if (jsonResponse["data"] != null && jsonResponse["data"].Type == JTokenType.Array)
                        {
                            var clinicSettings = jsonResponse["data"].First;
                            if (clinicSettings != null)
                            {
                                // ✅ Extract `allow_pn_status` and `tubed`
                                obj.AllowPNStatus = clinicSettings["biopsy"]?["allow_pn_status"]?["value"]?.ToObject<bool>() ?? false;
                                obj.AllowTubedSample = clinicSettings["biopsy"]?["tubed"]?["value"]?.ToObject<bool>() ?? false;
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Error: {response.StatusCode} - {response.Content.ReadAsStringAsync().Result}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in FetchClinicSettings: {ex.Message}");
            }
        }

        public string ValidatePatientWithProgenesis(PGTUserAuthRequest obj)
        {
            try
            {
                // ✅ Fetch clinic settings before validation
                FetchClinicSettings(obj);
                var apiUrl = "https://dev.progenesis.com/api/v2/validate/patient";

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    // ✅ Set Authorization Header
                    if (!string.IsNullOrEmpty(obj.AccessToken))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", obj.AccessToken);
                    }

                    // ✅ Create Request Body (JSON)
                    var requestBody = new
                    {
                        email = string.IsNullOrEmpty(obj.Email) ? $"{obj.FemalePatientMRNO}@gmail.com" : obj.Email,
                        last_name = obj.LastName,
                        first_name = obj.FirstName,
                        date_of_birth = obj.FemaleDOB.ToString("MM-dd-yyyy")
                    };


                    string jsonRequest = JsonConvert.SerializeObject(requestBody);
                    var requestContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                    // ✅ Send POST Request
                    HttpResponseMessage response = client.PostAsync(apiUrl, requestContent).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string responseString = response.Content.ReadAsStringAsync().Result;
                        var validationResult = JsonConvert.DeserializeObject<JObject>(responseString);

                        if (validationResult["data"] != null && validationResult["data"].Type == JTokenType.Null)
                        {
                            Console.WriteLine("Validation returned null data. Calling SubmitPatientRequisitesAsync...");
                            var submitTask = SubmitPatientRequisitesAsync(obj);
                            submitTask.Wait();
                            return submitTask.Result;
                        }
                        else if (validationResult["data"] != null && validationResult["data"].Type == JTokenType.Array)
                        {
                            string mrn = validationResult["data"].First["patient"]?["mrn"]?.ToString();

                            if (!string.IsNullOrEmpty(mrn))
                            {
                                Console.WriteLine($"Patient found with MRN: {mrn}. Fetching PGT Requisite Details...");
                                obj.ReturnedMRN = mrn;

                                // ✅ Fetch PGT Requisite Details
                                var pgtRequisites = GetPGTRequisiteDetails();

                                if (pgtRequisites != null && pgtRequisites.Any(r => !string.IsNullOrEmpty(r.RequisiteID)))
                                {
                                    // ✅ Handle biopsy with available RequisiteId
                                    Console.WriteLine("Handling biopsy with RequisiteId...");
                                    foreach (var requisite in pgtRequisites.Where(r => !string.IsNullOrEmpty(r.RequisiteID)))
                                    {
                                        HandleBiopsyWithRequisiteId(requisite.RequisiteID, obj.AccessToken, obj);
                                    }
                                }
                                else
                                {
                                    // ✅ RequisiteId not available, call the API for biopsy
                                    Console.WriteLine("No valid RequisiteId found. Fetching biopsy from Progenesis API...");
                                    var requisitesTask = FetchRequisitesForPatient(obj);
                                    requisitesTask.Wait();
                                    return requisitesTask.Result;
                                }
                            }
                        }

                        return responseString;
                    }
                    else
                    {
                        string errorResponse = response.Content.ReadAsStringAsync().Result;
                        Console.WriteLine($"Error: {response.StatusCode} - {errorResponse}");
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in API Call: {ex.Message}");
                return null;
            }
        }
        public void HandleBiopsyWithRequisiteId(string id, string accessToken, dynamic obj)
        {
            try
            {
                var biopsyApiUrl = $"https://dev.progenesis.com/api/v2/requisites/{id}/re-biopsy";
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    if (!string.IsNullOrEmpty(accessToken))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    }

                    // ✅ Get Available Barcodes (Using .Result)
                    var selectedBarcode = GetBarcodesList(accessToken).Result; // ✅ Blocking call

                    // ✅ Building Biopsy Request Body
                    var biopsyRequestBody = new
                    {
                        barcode = selectedBarcode,
                        biopsy_date = (obj.BiopsyDate != null) ? obj.BiopsyDate.ToString("MM-dd-yyyy") : null,
                        performed_by = obj.EmbryologistID,
                        transfer_type = obj.TransferType,
                        samples = ConvertSampleList(obj.Sample, obj.AllowPNStatus, obj.AllowTubedSample),
                        test_results = (obj.RequisiteType == "banking") ? obj.TestResults : (int?)null
                    };



                    string jsonRequest = JsonConvert.SerializeObject(biopsyRequestBody);
                    var requestContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                    // ✅ Synchronous API Call (Using .Result)
                    HttpResponseMessage response = client.PostAsync(biopsyApiUrl, requestContent).Result;
                    string responseString = response.Content.ReadAsStringAsync().Result;

                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Biopsy Request Successful: {responseString}");

                        // ✅ Deserialize the response safely
                        var responseData = JsonConvert.DeserializeObject<dynamic>(responseString);

                        if (responseData?.data != null && responseData.data.Count > 0)
                        {
                            foreach (var item in responseData.data)
                            {
                                // ✅ Get the accession number from outside the sample
                                string accessionNumberOutside = item.accession_number?.ToString();
                                string biopsyId = item.biopsy_id?.ToString();

                                // ✅ Call AddPGTBiopsyDetails for outside accession number
                                if (!string.IsNullOrEmpty(accessionNumberOutside) && !string.IsNullOrEmpty(biopsyId))
                                {
                                    var biopsyDetails = new PGTBiopsyDetails
                                    {
                                        PgtRequisiteId = id,
                                        BiopsyId = biopsyId,
                                        accessionNumber = accessionNumberOutside,
                                        Status = true
                                    };

                                    AddPGTBiopsyDetails(biopsyDetails);
                                }

                                // ✅ Process samples inside obj.Sample
                                if (item.sample != null && item.sample.accession_number != null && obj.Sample != null)
                                {
                                    // Loop through each sample in obj.Sample to get EmbryoId in order
                                    for (int i = 0; i < item.sample.accession_number.Count; i++)
                                    {
                                        string innerAccessionNumber = item.sample.accession_number[i]?.ToString();
                                        string embryoId = i < obj.Sample.Count ? obj.Sample[i].EmbrioId : null; // Match index with EmbryoId
                                        string day = i < obj.Sample.Count ? obj.Sample[i].BiopsyType : null; // Match index with EmbryoId
                                        if (!string.IsNullOrEmpty(innerAccessionNumber) && !string.IsNullOrEmpty(embryoId))
                                        {
                                            var sampleDetails = new PGTBiopsySampleDetails
                                            {
                                                PgtRequisiteId = id,
                                                BiopsyId = biopsyId,
                                                accessionNumber = innerAccessionNumber,
                                                EmbryoId = embryoId,
                                                day = day,
                                                Status = true
                                            };

                                            AddPGTBiopsySampleDetails(sampleDetails);
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            Console.WriteLine("No data found in the biopsy response.");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Error in Biopsy Request: {response.StatusCode} - {responseString}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in Biopsy API Call: {ex.Message}");
            }
        }
        public async Task<string> FetchRequisitesForPatient(PGTUserAuthRequest obj)
        {
            try
            {
                // ✅ Fetch clinic settings before validation
                FetchClinicSettings(obj);
                var requisitesApiUrl = "https://dev.progenesis.com/api/v2/requisites/recurring";
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    // ✅ Set Authorization Header
                    if (!string.IsNullOrEmpty(obj.AccessToken))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", obj.AccessToken);
                    }

                    // ✅ Create Request Body
                    var requestBody = new
                    {
                        patient = new
                        {
                            last_name = obj.LastName,
                            mrn = obj.ReturnedMRN,
                            first_name = obj.FirstName,
                            date_of_birth = obj.FemaleDOB.ToString("MM-dd-yyyy"),
                            phone = obj.Phone,
                            has_email = !string.IsNullOrEmpty(obj.Email) ? 1 : 0,
                            email = obj.Email,
                            sex_assigned_at_birth = obj.SexAssignedAtBirth,
                            donor_type = new[] { "egg_donor" },
                            patient_notification = 0,
                            type = "patient"
                        },
                        partner = obj.Partner != null ? new
                        {
                            last_name = obj.Partner.LastName,
                            first_name = obj.Partner.FirstName,
                            date_of_birth = obj.Partner.DOB?.ToString("MM-dd-yyyy") ?? "01-01-0001",
                            type = "partner",
                            sex_assigned_at_birth = obj.Partner.SexAssignedAtBirth
                        } : null,
                        requisite = new
                        {
                            billing = obj.Billing ?? "bill clinic",
                            state_id = obj.StateID,
                            city = obj.City ?? "New York",
                            street = obj.Street ?? "123 Main Street",
                            zipcode = obj.ZipCode ?? "10001",
                            estimated_retrival_date = obj.EstimatedRetrievalDate.ToString("MM-dd-yyyy"),
                            international_patient = obj.InternationalPatient,
                            sample_type = obj.TransferType ?? "fresh",
                            type = obj.RequisiteType ?? "standard",
                            //financing_option = obj.FinancingOption ?? "None",
                            doctor_id = obj.EmbryologistID > 0 ? obj.EmbryologistID : 17742,
                            entered_by = obj.EmbryologistID,
                            test = new int[] { 1 }
                        }
                    };

                    string jsonRequest = JsonConvert.SerializeObject(requestBody);
                    var requestContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                    // ✅ Log request for debugging
                    Console.WriteLine("Sending Request: " + jsonRequest);

                    HttpResponseMessage response = client.PostAsync(requisitesApiUrl, requestContent).Result;

                    // ✅ Log response status
                    Console.WriteLine($"Received Response Status: {response.StatusCode}");

                    string responseString = response.Content.ReadAsStringAsync().Result; // ✅ Fix: Properly read response content

                    if (response.IsSuccessStatusCode)
                    {
                        var responseData = JsonConvert.DeserializeObject<dynamic>(responseString);
                        string requisiteId = responseData?.data[0]?.requisite_id;

                        if (!string.IsNullOrEmpty(requisiteId))
                        {
                            var requisiteInfo = new PGTRequisiteInfo
                            {
                                MRN = responseData?.data[0]?["mrn"]?.ToString(),
                                RequisiteId = requisiteId,
                                Status = true,
                                BiopsyAccessionId = responseData?.data[0]?["case_id"]?.ToString()
                            };

                            AddOrUpdatePGTRequisiteInfo(requisiteInfo);

                            SendBiopsyRequest(requisiteId, obj.AccessToken, obj);
                        }

                        return responseString;
                    }
                    else
                    {
                        Console.WriteLine($"Error calling Requisites API: {response.StatusCode} - {responseString}");
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in Requisites API Call: {ex.Message}");
                return null;
            }
        }


        public void SendBiopsyRequest(string requisiteId, string accessToken, dynamic obj)
        {
            try
            {
                var biopsyApiUrl = $"https://dev.progenesis.com/api/v2/requisites/{requisiteId}/biopsies";
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    if (!string.IsNullOrEmpty(accessToken))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    }

                    // ✅ Get Available Barcodes (Using .Result)
                    var selectedBarcode = GetBarcodesList(accessToken).Result; // Blocking call

                    // ✅ Building Biopsy Request Body
                    var biopsyRequestBody = new
                    {
                        biopsy = new
                        {
                            barcode = selectedBarcode,
                            biopsy_date = (obj.BiopsyDate != null) ? obj.BiopsyDate.ToString("MM-dd-yyyy") : null,
                            performed_by = obj.EmbryologistID,
                            witness_by = obj.WitnessID,
                            transfer_type = obj.TransferType,
                            sample = ConvertSampleList(obj.Sample, obj.AllowPNStatus, obj.AllowTubedSample)
                        }
                    };

                    string jsonRequest = JsonConvert.SerializeObject(biopsyRequestBody);
                    var requestContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                    // ✅ Synchronous API Call (Using .Result)
                    HttpResponseMessage response = client.PostAsync(biopsyApiUrl, requestContent).Result;
                    string responseString = response.Content.ReadAsStringAsync().Result;

                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Biopsy Request Successful: {responseString}");

                        // ✅ Deserialize the response safely
                        var responseData = JsonConvert.DeserializeObject<dynamic>(responseString);

                        if (responseData?.data != null && responseData.data.Count > 0)
                        {
                            foreach (var item in responseData.data)
                            {
                                // ✅ Get the accession number from outside the sample
                                string accessionNumberOutside = item.accession_number?.ToString();
                                string biopsyId = item.biopsy_id?.ToString();

                                // ✅ Call AddPGTBiopsyDetails for outside accession number
                                if (!string.IsNullOrEmpty(accessionNumberOutside) && !string.IsNullOrEmpty(biopsyId))
                                {
                                    var biopsyDetails = new PGTBiopsyDetails
                                    {
                                        PgtRequisiteId = requisiteId,
                                        BiopsyId = biopsyId,
                                        accessionNumber = accessionNumberOutside,
                                        Status = true
                                    };

                                    AddPGTBiopsyDetails(biopsyDetails);
                                }

                                // ✅ Process samples inside obj.Sample
                                if (item.sample != null && item.sample.accession_number != null && obj.Sample != null)
                                {
                                    // Loop through each sample in obj.Sample to get EmbryoId in order
                                    for (int i = 0; i < item.sample.accession_number.Count; i++)
                                    {
                                        string innerAccessionNumber = item.sample.accession_number[i]?.ToString();
                                        string embryoId = i < obj.Sample.Count ? obj.Sample[i].EmbrioId : null; // Match index with EmbryoId
                                        string day = i < obj.Sample.Count ? obj.Sample[i].BiopsyType : null; // Match index with EmbryoId
                                        if (!string.IsNullOrEmpty(innerAccessionNumber) && !string.IsNullOrEmpty(embryoId))
                                        {
                                            var sampleDetails = new PGTBiopsySampleDetails
                                            {
                                                PgtRequisiteId = requisiteId,
                                                BiopsyId = biopsyId,
                                                accessionNumber = innerAccessionNumber,
                                                EmbryoId = embryoId,
                                                day = day,
                                                Status = true
                                            };

                                            AddPGTBiopsySampleDetails(sampleDetails);
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            Console.WriteLine("No data found in the biopsy response.");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Error in Biopsy Request: {response.StatusCode} - {responseString}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in Biopsy API Call: {ex.Message}");
            }
        }



        // 🔹 Helper Function to Fetch Available Barcodes
        private Task<string> GetBarcodesList(string accessToken)
        {
            var barcodeApiUrl = "https://dev.progenesis.com/api/v2/barcodes";
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                if (!string.IsNullOrEmpty(accessToken))
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                }

                HttpResponseMessage response = client.GetAsync(barcodeApiUrl).Result;
                string responseString = response.Content.ReadAsStringAsync().Result;

                Console.WriteLine($"Raw API Response: {responseString}"); // ✅ Debugging step

                if (response.IsSuccessStatusCode)
                {
                    try
                    {
                        JObject jsonResponse = JObject.Parse(responseString); // ✅ Parse root JSON object
                        JArray dataArray = (JArray)jsonResponse["data"]; // ✅ Extract `data` array

                        if (dataArray.Count > 0)
                        {
                            JArray innerArray = (JArray)dataArray[0]; // ✅ Get first inner array
                            if (innerArray.Count > 0)
                            {
                                Random random = new Random();
                                int randomIndex = random.Next(0, innerArray.Count); // ✅ Get a random index
                                return Task.FromResult(innerArray[randomIndex].ToString()); // ✅ Return random barcode
                            }
                        }
                    }
                    catch (JsonReaderException jsonEx)
                    {
                        Console.WriteLine($"JSON Parsing Error: {jsonEx.Message}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Unexpected Error: {ex.Message}");
                    }
                }
                else
                {
                    Console.WriteLine($"Error fetching barcodes: {response.StatusCode} - {responseString}");
                }

                return Task.FromResult(string.Empty);
            }
        }







        // 🔹 Sample Conversion Helper Function
        private object[] ConvertSampleList(dynamic sampleList, bool allowPNStatus, bool allowTubing)
        {
            if (sampleList == null)
            {
                return new object[0]; // ✅ Fix: Compatible with older .NET versions
            }

            var samples = new List<object>();

            foreach (var sample in sampleList)
            {
                if (sample == null) continue; // Skip null samples

                samples.Add(new
                {
                    embrio_id = sample != null && sample.EmbrioId != null ? sample.EmbrioId : 0,
                    number_cells = sample != null && sample.NumberCells != null ? sample.NumberCells : 0,
                    biopsy_type = sample != null && sample.BiopsyType != null ? sample.BiopsyType : string.Empty,
                    performed_by = sample != null && sample.PerformedBy != null ? sample.PerformedBy : string.Empty,

                    // ✅ Fix for .NET 4.5: Explicit null check for DateTime?
                    biopsy_date = (sample != null && sample.BiopsyDate != null)
        ? sample.BiopsyDate.ToString("MM-dd-yyyy")
        : null,

                    embryo_grade = sample != null && sample.EmbryoGrade != null ? sample.EmbryoGrade : string.Empty,
                    witness_by = sample != null && sample.WitnessBy != null ? sample.WitnessBy : string.Empty,

                    // ✅ Handle `pn_status` based on `allowPNStatus`
                    pn_status = allowPNStatus ? (sample != null && sample.PnStatus != null ? sample.PnStatus : string.Empty) : null,

                    // ✅ Handle `tubing_by` based on `allowTubing`
                    tubing_by = allowTubing ? (sample != null && sample.TubingBy != null ? sample.TubingBy : string.Empty) : null
                });


            }

            return samples.ToArray();
        }







        private async Task SendRebiopsyRequest(string requisiteId, string accessToken, dynamic obj)
        {
            try
            {
                var rebiopsyApiUrl = $"https://dev.progenesis.com/api/v2/requisites/{requisiteId}/rebiopsy";

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    if (!string.IsNullOrEmpty(accessToken))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    }

                    // ✅ Building Rebiopsy Request Body
                    var rebiopsyRequestBody = new
                    {
                        barcode = obj.barcode,
                        biopsy_date = obj.biopsyDate,
                        performed_by = obj.performedBy,
                        transfer_type = obj.transferType,
                        test_results = obj.testResults,
                        samples = ConvertSampleListRe(obj.samples) // Fixed Sample Conversion
                    };

                    string jsonRequest = JsonConvert.SerializeObject(rebiopsyRequestBody);
                    var requestContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(rebiopsyApiUrl, requestContent);
                    string responseString = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Rebiopsy Request Successful: {responseString}");
                    }
                    else
                    {
                        Console.WriteLine($"Error in Rebiopsy Request: {response.StatusCode} - {responseString}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in Rebiopsy API Call: {ex.Message}");
            }
        }

        private object[] ConvertSampleListRe(dynamic sampleList)
        {
            var samples = new List<object>();

            foreach (var sample in sampleList)
            {
                samples.Add(new
                {
                    embrio_id = sample.embrioId,
                    number_cells = sample.numberCells,
                    performed_by = sample.performedBy,
                    biopsy_date = sample.biopsyDate,
                    embryo_grade = sample.embryoGrade,
                    tubing_by = sample.tubingBy,
                    witness_by = sample.witnessBy,
                    biopsy_retrieval_date = sample.biopsyRetrievalDate,
                    pn_status = sample.pnStatus,
                    culture = sample.culture
                });
            }

            return samples.ToArray();
        }

        private async Task UpdateBiopsyRequest(string requisiteId, string biopsyId, string accessToken, dynamic obj)
        {
            try
            {
                var updateBiopsyApiUrl = $"https://dev.progenesis.com/api/v2/requisites/{requisiteId}/biopsies/{biopsyId}/update";

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    if (!string.IsNullOrEmpty(accessToken))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    }

                    // ✅ Building Biopsy Update Request Body
                    var biopsyUpdateRequestBody = new
                    {
                        _method = "PUT",  // Required by API as PUT method
                        biopsy = new
                        {
                            barcode = obj.barcode,
                            estimated_retrival_date = obj.estimatedRetrievalDate,
                            biopsy_date = obj.biopsyDate,
                            performed_by = obj.performedBy,
                            transfer_type = obj.transferType,
                            sample = ConvertSampleListUpdate(obj.sample) // Fixed Sample Conversion
                        }
                    };

                    string jsonRequest = JsonConvert.SerializeObject(biopsyUpdateRequestBody);
                    var requestContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(updateBiopsyApiUrl, requestContent);
                    string responseString = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Biopsy Update Successful: {responseString}");
                    }
                    else
                    {
                        Console.WriteLine($"Error in Biopsy Update Request: {response.StatusCode} - {responseString}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in Biopsy Update API Call: {ex.Message}");
            }
        }

        private object[] ConvertSampleListUpdate(dynamic sampleList)
        {
            var samples = new List<object>();

            foreach (var sample in sampleList)
            {
                samples.Add(new
                {
                    embrio_id = sample.embrioId,
                    number_cells = sample.numberCells,
                    performed_by = sample.performedBy,
                    biopsy_date = sample.biopsyDate,
                    embryo_grade = sample.embryoGrade,
                    tubing_by = sample.tubingBy,
                    witness_by = sample.witnessBy,
                    biopsy_retrieval_date = sample.biopsyRetrievalDate,
                    pn_status = sample.pnStatus,
                    culture = sample.culture
                });
            }

            return samples.ToArray();
        }


        public async Task<string> SubmitPatientRequisitesAsync(PGTUserAuthRequest obj)
        {
            var apiUrl = "https://dev.progenesis.com/api/v2/requisites";

            if (string.IsNullOrEmpty(obj.AccessToken))
                throw new ArgumentException("Access token is required.");

            try
            {
                using (HttpClient client = new HttpClient { Timeout = TimeSpan.FromSeconds(10) }) // ⏳ Added Timeout
                {
                    // ✅ Set required headers
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", obj.AccessToken);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    // ✅ Handling nullable values properly
                    var requestBody = new
                    {
                        patient = new
                        {
                            last_name = obj.LastName,
                            first_name = obj.FirstName,
                            date_of_birth = obj.FemaleDOB.ToString("MM-dd-yyyy") ?? "01-01-0001",
                            phone = obj.Phone,
                            has_email = !string.IsNullOrEmpty(obj.Email) ? 1 : 0,
                            email = obj.Email,
                            sex_assigned_at_birth = obj.SexAssignedAtBirth,
                            donor_type = new[] { "egg_donor" }, // ✅ Updated to match "egg_donor" (as per your example)
                            patient_notification = 0,
                            type = "patient"
                        },
                        partner = obj.Partner != null ? new
                        {
                            last_name = obj.Partner.LastName,
                            first_name = obj.Partner.FirstName,
                            date_of_birth = obj.Partner?.DOB?.ToString("MM-dd-yyyy") ?? "01-01-0001",
                            type = "partner",
                            sex_assigned_at_birth = obj.Partner.SexAssignedAtBirth
                        } : null,
                        requisite = new
                        {
                            billing = obj.Billing ?? "bill clinic", // ✅ Ensure this matches valid options in your system
                            state_id = obj.StateID,
                            city = obj.City ?? "New York",
                            street = obj.Street ?? "123 Main Street",
                            zipcode = obj.ZipCode ?? "10001",
                            estimated_retrival_date = obj.EstimatedRetrievalDate.ToString("MM-dd-yyyy") ?? "01-01-0001",
                            international_patient = obj.InternationalPatient,
                            sample_type = obj.TransferType ?? "fresh", // ✅ Ensure "fresh" is valid in your system
                            type = obj.RequisiteType ?? "standard", // ✅ Ensure "banking" is valid in your system
                                                                   //financing_option = obj.FinancingOption ?? "None",
                            doctor_id = obj.EmbryologistID > 0 ? obj.EmbryologistID : 17742,
                            entered_by = obj.EmbryologistID,
                            test = new int[] { 1 } // ✅ Ensure these test IDs are valid
                        }
                    };

                    string jsonRequest = JsonConvert.SerializeObject(requestBody);
                    var requestContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                    // ✅ Log request for debugging
                    Console.WriteLine("Sending Request: " + jsonRequest);

                    HttpResponseMessage response = client.PostAsync(apiUrl, requestContent).Result;

                    // ✅ Log response status
                    Console.WriteLine($"Received Response Status: {response.StatusCode}");

                    string responseString = response.Content.ReadAsStringAsync().Result; // ✅ Fix: Properly read response content

                    if (response.IsSuccessStatusCode)
                    {
                        var responseData = JsonConvert.DeserializeObject<dynamic>(responseString);
                        string requisiteId = responseData?.data[0]?.requisite_id;

                        if (!string.IsNullOrEmpty(requisiteId))
                        {
                            var requisiteInfo = new PGTRequisiteInfo
                            {
                                MRN = responseData?.data[0]?["mrn"]?.ToString(),
                                RequisiteId = requisiteId,
                                Status = true,
                                BiopsyAccessionId = responseData?.data[0]?["case_id"]?.ToString()
                            };

                            AddOrUpdatePGTRequisiteInfo(requisiteInfo);

                            SendBiopsyRequest(requisiteId, obj.AccessToken, obj);
                        }

                        return responseString;
                    }
                    else
                    {
                        Console.WriteLine($"Error calling Requisites API: {response.StatusCode} - {responseString}");
                        return null;
                    }
                }
            }
            catch (TaskCanceledException)
            {
                return "API Request Timed Out.";
            }
            catch (HttpRequestException ex)
            {
                return $"API Request Failed: {ex.Message}";
            }
            catch (Exception ex)
            {
                return $"Unexpected Error: {ex.Message}";
            }
        }








        public PGTUserAuth RedirectToProgenesis(long UserID)
        {
            PGTUserAuth obj = new PGTUserAuth();

            long clientId = 19;  // Replace with actual client ID
            string redirectUri = "https://stage1.fertivue.com:8095/api/ProgenesisAPI/oauth/redirect";  // Must match registered redirect URI
            string scope = "";  // Define required scopes
            obj.UserID = UserID;
            string requestUrl = $"https://dev.progenesis.com/oauth/authorize?client_id={clientId}&redirect_uri={redirectUri}&response_type=code&scope={scope}";
            obj.AuthUrl = requestUrl;  // Assuming PGTUserAuth has a property called AuthUrls
            return obj;
        }

        //public async Task<ActionResult> OAuthCallback(string code)
        //{
        //    if (string.IsNullOrEmpty(code))
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Authorization code is missing.");

        //    }

        //    long clientId = 18;
        //    string clientSecret = "pjDBVcxehDhr7LRtBpk8y5zzaPFpVv6osFpo7XPv";
        //    string redirectUri = "https://stage1.fertivue.com:8095/api/ProgenesisAPI/oauth/callback";

        //    var tokenResponse = await GetAccessToken(code);

        //    if (tokenResponse != null && !string.IsNullOrEmpty(tokenResponse.AccessToken))
        //    {
        //        //SaveAccessTokenToDatabase(tokenResponse, UserID);
        //        // return Newtonsoft.Json.JsonResult(new { message = "Login successful", access_token = tokenResponse.AccessToken });
        //    }

        //    return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Authorization code is missing.");

        //}


        public async Task<TokenResponse> GetAccessToken(string code)
        {
            string clientId = "19";
            string clientSecret = "JcoduuEQsRbrQUAi5a3K939BGLWNdZK2iVK4mtnN";
            string redirectUri = "https://stage1.fertivue.com:8095/api/ProgenesisAPI/oauth/redirect";
            string tokenUrl = "https://dev.progenesis.com/oauth/token";

            int maxRetries = 5;
            int retryCount = 0;
            int delayMs = 5000; // 5 seconds

            logger.Info($"[GetAccessToken] Start - Authorization Code: {code}");

            // ** Save Authorization Code Logic **
            //try
            //{
            //    var authInfo = new PGTUserAuthAdd
            //    {
            //        AuthorizationCode = code,
            //        AccessToken = "",
            //        RefreshToken = "",
            //        ExpiryDate = DateTime.UtcNow.AddHours(1),
            //        ID = 0
            //    };

            //    int saveResult = AddPGTUserAuthInfo(authInfo);

            //    if (saveResult != 1)
            //    {
            //        logger.Error($"[GetAccessToken] Failed to save authorization code.");
            //        return new TokenResponse
            //        {
            //            Error = "auth_code_save_failed",
            //            ErrorDescription = "Failed to save authorization code.",
            //            JsonRequest = "",
            //            CurlCommand = ""
            //        };
            //    }
            //    else
            //    {
            //        logger.Info($"[GetAccessToken] Authorization code saved successfully.");
            //    }
            //}
            //catch (Exception ex)
            //{
            //    logger.Error($"[GetAccessToken] Failed to save authorization code: {ex.Message}");
            //    return new TokenResponse
            //    {
            //        Error = "auth_code_save_failed",
            //        ErrorDescription = "Failed to save authorization code.",
            //        JsonRequest = "",
            //        CurlCommand = ""
            //    };
            //}

            var requestData = new
            {
                grant_type = "authorization_code",
                client_id = clientId,
                client_secret = clientSecret,
                redirect_uri = redirectUri,
                code = code
            };

            var requestBody = new
            {
                grant_type = "authorization_code",
                client_id = clientId,
                client_secret = clientSecret,
                redirect_uri = redirectUri,
                code = code
            };

            // ✅ Serialize JSON (Escaping khatam)
            string jsonRequest = JsonConvert.SerializeObject(requestBody, Formatting.None);

            // ✅ Proper cURL Command
            string curlCommand = $"curl -X POST \"{tokenUrl}\" " +
                                 "-H \"Content-Type: application/json\" " +
                                 $"-d \"{jsonRequest}\"";


            logger.Info("[GetAccessToken] JSON Request: " + jsonRequest);
            logger.Info("[GetAccessToken] cURL Command: " + curlCommand);





            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                while (retryCount < maxRetries)
                {
                    try
                    {
                        logger.Info($"[GetAccessToken] Attempt {retryCount + 1}: Sending request...");

                        using (var requestContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json"))
                        {
                            HttpResponseMessage response = await client.PostAsync(tokenUrl, requestContent);
                            string jsonResponse = await response.Content.ReadAsStringAsync();

                            logger.Info($"[GetAccessToken] Response: {response.StatusCode} - {jsonResponse}");

                            if (response.IsSuccessStatusCode)
                            {
                                TokenResponse tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(jsonResponse);

                                if (tokenResponse != null && !string.IsNullOrEmpty(tokenResponse.AccessToken))
                                {
                                    logger.Info($"[GetAccessToken] Token received successfully. AccessToken: {tokenResponse.AccessToken}");

                                    // ** Save Access Token After Successful Retrieval **
                                    var authInfo = new PGTUserAuthAdd
                                    {
                                        AuthorizationCode = code,
                                        AccessToken = tokenResponse.AccessToken,
                                        RefreshToken = tokenResponse.RefreshToken,
                                        ExpiryDate = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn)
                                    };
                                    int updateResult = AddPGTUserAuthInfo(authInfo);
                                    if (updateResult != 1)
                                    {
                                        logger.Error($"[GetAccessToken] Failed to update access token.");
                                    }

                                    return tokenResponse;
                                }
                            }
                            else
                            {
                                var errorResponse = JsonConvert.DeserializeObject<TokenResponse>(jsonResponse) ?? new TokenResponse();
                                errorResponse.ErrorDescription = jsonResponse;
                                errorResponse.HttpStatusCode = response.StatusCode;
                                errorResponse.JsonRequest = jsonRequest;
                                errorResponse.CurlCommand = curlCommand;

                                logger.Error($"[GetAccessToken] OAuth error: {errorResponse.Error} - {errorResponse.ErrorDescription}");
                                return errorResponse;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.Error($"[GetAccessToken] Exception: {ex.Message}, StackTrace: {ex.StackTrace}");

                        return new TokenResponse
                        {
                            Error = "exception",
                            ErrorDescription = ex.Message,
                            JsonRequest = jsonRequest,
                            CurlCommand = curlCommand
                        };
                    }

                    retryCount++;
                    await Task.Delay(delayMs);
                }
            }

            return new TokenResponse
            {
                Error = "max_retries_exceeded",
                ErrorDescription = "Token retrieval failed after multiple retries.",
                JsonRequest = jsonRequest,
                CurlCommand = curlCommand
            };
        }

        public int AddOrUpdatePGTRequisiteInfo(PGTRequisiteInfo objs)
        {
            int resultStatus = 0;
            var param = new DynamicParameters();

            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    param.Add("@ID", objs.ID); // ID for Insert/Update
                    param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    param.Add("@UserID", GenericSP.CurrentUser.UserID);
                    param.Add("@Requisite_Id", objs.RequisiteId);
                    param.Add("@biopsy_accession_id", objs.BiopsyAccessionId);
                    param.Add("@Status", objs.Status);
                    param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    param.Add("@AddedOn", DateTime.UtcNow.Date);  // Fixing AddedOn value
                    param.Add("@AddedDatetime", DateTime.UtcNow);
                    param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    param.Add("@UpdatedOn", DateTime.UtcNow.Date);
                    param.Add("@UpdatedDatetime", DateTime.UtcNow);
                    param.Add("@mrn", objs.MRN);
                    param.Add("@PatientId", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                    param.Add("@PatientUnitid", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                    param.Add("@TherapyId", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    param.Add("@TherapyUnitId", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    Con.Execute(GenericSP.InsertOrUpdate_PGT_Requisite, param, commandType: CommandType.StoredProcedure);

                    transactionScope.Complete();

                    resultStatus = param.Get<int>("@ResultStatus");
                }
            }
            catch (Exception ex)
            {
                resultStatus = 0; // Handle exception gracefully
            }

            return resultStatus;
        }


        public int AddPGTBiopsyDetails(PGTBiopsyDetails obj)
        {
            int resultStatus = 0;
            var param = new DynamicParameters();

            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    param.Add("@ID", obj.ID);
                    param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    param.Add("@Pgt_Requisite_Id", obj.PgtRequisiteId);
                    param.Add("@biopsy_id", obj.BiopsyId);

                    param.Add("@Addedby", GenericSP.CurrentUser.UserID);
                    param.Add("@Updatedby", GenericSP.CurrentUser.UserID);
                    param.Add("@Status", obj.Status);
                    param.Add("@embryo_id", obj.EmbryoId);
                    param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    param.Add("@accession_number", obj.accessionNumber);
                    Con.Execute(GenericSP.InsertUpdatePGTBiopsyDetails, param, commandType: CommandType.StoredProcedure);

                    transactionScope.Complete();

                    resultStatus = param.Get<int>("@ResultStatus");
                }
            }
            catch (Exception ex)
            {
                resultStatus = 0;
            }

            return resultStatus;
        }


        public int AddPGTBiopsySampleDetails(PGTBiopsySampleDetails obj)
        {
            int resultStatus = 0;
            var param = new DynamicParameters();

            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    // Parameters for the stored procedure
                    param.Add("@UniId", GenericSP.CurrentUser.UnitID);
                    param.Add("@AccessionNumber", obj.accessionNumber);
                    param.Add("@BiopsyId", obj.BiopsyId);
                    param.Add("@day", obj.day);
                    param.Add("@PatientId", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                    param.Add("@PatientUnitId", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                    param.Add("@TherapyId", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    param.Add("@TherapyUnitId", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    param.Add("@EmbryoId", obj.EmbryoId);
                    param.Add("@AddedBy", GenericSP.CurrentUser.UserID);

                    // Execute the stored procedure
                    Con.Execute(GenericSP.InsertOrUpdatePGTSampleBiopsyDetails, param, commandType: CommandType.StoredProcedure);

                    // Commit the transaction if all goes well
                    transactionScope.Complete();

                    // If no exception, set result status to success (1)
                    resultStatus = 1;
                }
            }
            catch (Exception ex)
            {
                // Log the error if necessary
                resultStatus = 0;
            }

            return resultStatus;
        }




        public int AddPGTUserAuthInfo(PGTUserAuthAdd objs)
        {
            int resultStatus = 0;
            var param = new DynamicParameters();
            long storedUserID = GetStoredUserID();
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    param.Add("@ID", objs.ID, DbType.Int64, ParameterDirection.Output);
                    param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    param.Add("@AccessToken", SecurityDAL.EncryptString(objs.AccessToken));
                    param.Add("@UserID", GenericSP.CurrentUser.UserID);
                    param.Add("@AuthorizationCode", objs.AuthorizationCode);
                    param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    param.Add("@AddedOn", Environment.UserName);
                    param.Add("@AddedDateTime", DateTime.UtcNow);
                    param.Add("@ExpiryDate", objs.ExpiryDate);
                    param.Add("@RefreshToken", objs.RefreshToken);
                    param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    Con.Execute(GenericSP.AddPGTUserAuthInfo, param, commandType: CommandType.StoredProcedure);

                    transactionScope.Complete();

                    resultStatus = param.Get<int>("@ResultStatus");
                }
            }
            catch (Exception ex)
            {
                resultStatus = 0;
            }

            return resultStatus;
        }
        public long GetStoredUserID()
        {
            return _userID; // ✅ Fetch UserID anytime within this class
        }
        //Task<TokenResponse> EmbrologyBAL.GetAccessToken(string code)
        //{
        //    throw new NotImplementedException();
        //}

        //Day 7 Start
        public DaySevenVO FillDaySevenMaster(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            DaySevenVO Obj = new DaySevenVO();
            Obj.BlastocystStage = new List<CommanEntity>();
            Obj.Incubator = new List<CommanEntity>();
            Obj.ICM = new List<CommanEntity>();
            Obj.Witness = new List<CommanEntity>();
            Obj.TPD = new List<CommanEntity>();
            Obj.Plan = new List<CommanEntity>();
            Obj.PGDPGSMethod = new List<CommanEntity>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.FillDaySevenMaster, Param, commandType: CommandType.StoredProcedure);
            Obj.BlastocystStage = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Incubator = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.ICM = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Witness = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.TPD = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.FragmentationDistribution = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Grade = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.Plan = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.PGDPGSMethod = QueryMultiple.Read<CommanEntity>().ToList();
            Obj.DonarLinkCycleIsAvialble = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISDonarEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            Obj.ISEmbET = QueryMultiple.Read<long>().SingleOrDefault();
            return Obj;
        }

        public IEnumerable<DaySevenVO> fillDaySevenOocyteGrid(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@PlanTherapyID", TherapyID, DbType.Int64);
            Param.Add("@PlanTherapyUnitID", TherapyUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            List<DaySevenVO> Oocytelist = new List<DaySevenVO>();
            List<DayZeroForToolTip> DayZeroForToolTip = new List<DayZeroForToolTip>();
            var QueryMultiple = this.Con.QueryMultiple(GenericSP.fillDaySevenOocyteGrid, Param, commandType: CommandType.StoredProcedure);
            Oocytelist = QueryMultiple.Read<DaySevenVO>().ToList();
            DayZeroForToolTip = QueryMultiple.Read<DayZeroForToolTip>().ToList();
            List<LinkedPatientList> LinkedPatientList = QueryMultiple.Read<LinkedPatientList>().ToList();
            foreach (DaySevenVO Item in Oocytelist)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(Item.PGDPGSbyte)))
                {
                    Item.PGDPGSDOC = System.Text.Encoding.UTF8.GetString(Item.PGDPGSbyte);
                }
                if (Item.ID != 0)
                {
                    Item.LinkPatientList = LinkedPatientList;
                    Item.Img = new OocytesImage();
                    Item.Img.model = new List<model1>();
                    var DelImg = new DynamicParameters();
                    DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    DelImg.Add("@PatientID", Item.PatientID, DbType.Int64);
                    DelImg.Add("@PatientUnitID", Item.PatientUnitID, DbType.Int64);
                    DelImg.Add("@PlanTherapyID", Item.PlanTherapyID, DbType.Int64);
                    DelImg.Add("@PlanTherapyUnitID", Item.PlanTherapyUnitID, DbType.Int64);
                    DelImg.Add("@OocyteNumber", Item.OocyteNumber, DbType.Int64);
                    DelImg.Add("@SerialOocuteNumber", Item.SerialOocyteNumber, DbType.Int64);
                    DelImg.Add("@Day", 7, DbType.Int32);
                    DelImg.Add("@DayID", Item.DaySevenID, DbType.Int64);
                    DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Item.Img.model = Con.Query<model1>(GenericSP.GetOocytesImg, DelImg, commandType: CommandType.StoredProcedure).ToList();
                    Item.ZeroTooltip = new Entities.Models.ARTMgmt.Embrology.DayZeroForToolTip();
                    Item.ZeroTooltip = DayZeroForToolTip.Where(p => p.OocyteNumber == Item.OocyteNumber && p.SerialOocuteNumber == Item.SerialOocyteNumber).SingleOrDefault();
                }
            }
            return Oocytelist;
        }


        public long SaveDaySevenProcess(List<DaySevenVO> DaySevenData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (DaySevenVO item in DaySevenData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@DaySevenID", item.DaySevenID, DbType.Int64);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@PatientID", item.PatientID, DbType.Int64);
                        Param.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                        Param.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                        Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                        Param.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                        Param.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                        Param.Add("@Date", item.Date, DbType.DateTime);
                        Param.Add("@Time", item.Time, DbType.DateTime);
                        Param.Add("@BlastocystStageID", item.BlastocystStageID, DbType.Int32);
                        Param.Add("@PlanID", item.PlanID, DbType.Int32);
                        Param.Add("@ICMID", item.ICMID, DbType.Int32);
                        Param.Add("@TPDID", item.TPDID, DbType.Int32);
                        Param.Add("@AssistedHatching", item.AssistedHatching, DbType.Boolean);
                        Param.Add("@Incubator", item.IncubatorID, DbType.Int32);
                        Param.Add("@Remarks", item.Remarks, DbType.String);
                        //added by neena
                        Param.Add("@GradeID", item.GradeID, DbType.Int32);
                        Param.Add("@FragmentationDistributionID", item.FragmentationDistributionID, DbType.Int32);
                        //
                        Param.Add("@Embryologist", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@Witness", item.WitnessID, DbType.Int64);
                        Param.Add("@PGD", item.PGD, DbType.Int32);
                        Param.Add("@PGDPGSDate", item.PGDPGSDate, DbType.DateTime);
                        Param.Add("@PGDPGSTime", item.PGDPGSTime, DbType.DateTime);
                        Param.Add("@PGDPGSMethodID", item.PGDPGSMethodID, DbType.Int32);
                        if (item.PGDPGSDOC != null)
                        {
                            Param.Add("@PGDPGSDOC", System.Text.Encoding.UTF8.GetBytes(item.PGDPGSDOC));
                        }
                        Param.Add("@ResultID", item.ResultID, DbType.Int32);
                        Param.Add("@Finalize", item.Finalize, DbType.Boolean);
                        Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                        Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                        Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                        Param.Add("@IsExtend", item.IsExtend, DbType.Boolean);
                        Param.Add("@IsDonarEMb", item.IsFromDonar, DbType.Boolean);
                        Param.Add("@Donor", item.Donor);
                        if (item.Donor == true)
                        {
                            if (item.PlanID == 6 || item.PlanID == 5)
                            {
                                Param.Add("@DonorEmb", 1);
                            }
                            else
                            {
                                Param.Add("@DonorEmb", item.DonorEmb);
                            }
                        }
                        else
                        {
                            Param.Add("@DonorEmb", item.DonorEmb);
                        }
                        if (item.PlanID == 2 || item.PlanID == 6)
                        {
                            Param.Add("@Fresh", 0);
                        }
                        else
                        {
                            Param.Add("@Fresh", item.Fresh);
                        }
                        if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                        {
                            //Param.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                            //Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                            Param.Add("@CoupleID", item.CoupleID, DbType.Int64);
                            Param.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        }
                        Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                        this.Con.Execute(GenericSP.SaveDaySeven, Param, commandType: CommandType.StoredProcedure);
                        long ID = Param.Get<Int64>("@ID");
                        //Insert Images OocytesWise
                        if (item.Img != null)
                        {
                            if (item.Img.model != null)
                            {
                                //Delete EXisting Images 
                                var DelImg = new DynamicParameters();
                                DelImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                DelImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                DelImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                DelImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                DelImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                DelImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                DelImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                DelImg.Add("@Day", 7, DbType.Int32);
                                DelImg.Add("@DayID", ID, DbType.Int64);
                                DelImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                Con.Execute(GenericSP.DeleteOocytesImg, DelImg, commandType: CommandType.StoredProcedure);
                                foreach (model1 Imgitem in item.Img.model)
                                {
                                    //Insert images in database
                                    var ParImg = new DynamicParameters();
                                    ParImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                    ParImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                    ParImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                    ParImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                    ParImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                    ParImg.Add("@Day", 7, DbType.Int32);
                                    ParImg.Add("@DayID", ID, DbType.Int64);
                                    ParImg.Add("@DayUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/jpeg;base64,", "");
                                    Imgitem.preview = Imgitem.preview.Replace(@"data:image/png;base64,", "");
                                    ParImg.Add("@Image", Convert.FromBase64String(Imgitem.preview), DbType.Binary);
                                    ParImg.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                    ParImg.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                                    ParImg.Add("@AddedOn", Environment.MachineName, DbType.String);
                                    ParImg.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                                    ParImg.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                                    Con.Execute(GenericSP.SaveDaywiseImg, ParImg, commandType: CommandType.StoredProcedure);
                                }
                                //Insert Donar Image agins couple
                                if (GenericSP.SelectedCouple.FemalePatient.IsDonor)
                                {
                                    if (item.PlanID == 5)
                                    {
                                        var TransferImg = new DynamicParameters();
                                        TransferImg.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        TransferImg.Add("@PatientID", item.PatientID, DbType.Int64);
                                        TransferImg.Add("@PatientUnitID", item.PatientUnitID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyID", item.PlanTherapyID, DbType.Int64);
                                        TransferImg.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID, DbType.Int64);
                                        TransferImg.Add("@OocyteNumber", item.OocyteNumber, DbType.Int64);
                                        TransferImg.Add("@SerialOocuteNumber", item.SerialOocyteNumber, DbType.Int64);
                                        TransferImg.Add("@Day", 7, DbType.Int32);
                                        TransferImg.Add("@DayID", ID, DbType.Int64);
                                        //TransferImg.Add("@CoupleID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailID, DbType.Int64);
                                        //TransferImg.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.CoupleFemailUnitID, DbType.Int64);
                                        TransferImg.Add("@CoupleID", item.CoupleID, DbType.Int64);
                                        TransferImg.Add("@CoupleUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                                        Con.Execute(GenericSP.SaveDonarImgToCoupleAgains, TransferImg, commandType: CommandType.StoredProcedure);
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


        public List<PGTRequisiteDetails> GetPGTRequisiteDetails()
        {
            PGTRequisiteDetails obj = new PGTRequisiteDetails();
            var paramReceiptList = new DynamicParameters();

            paramReceiptList.Add("@PatientId", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            paramReceiptList.Add("@PatientUnitId", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            paramReceiptList.Add("@TherapyId", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            paramReceiptList.Add("@TherapyUnitId", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<PGTRequisiteDetails>(GenericSP.GetPGTRequisiteDetails, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<PGTRequisiteBiopsyDetails> GetPGTRequisiteBiopsyDetails(long PatientId, long PatientUnitId, long TherapyId, long TherapyUnitId)
        {
            PGTRequisiteBiopsyDetails obj = new PGTRequisiteBiopsyDetails();
            var paramReceiptList = new DynamicParameters();

            paramReceiptList.Add("@PatientId", PatientId);
            paramReceiptList.Add("@PatientUnitId", PatientUnitId);
            paramReceiptList.Add("@TherapyId", TherapyId);
            paramReceiptList.Add("@TherapyUnitId", TherapyUnitId);

            //var QueryMultiple = this.Con.QueryMultiple(GenericSP.GetReceiptList, paramReceiptList, commandType: CommandType.StoredProcedure); 
            //obj = QueryMultiple.Read<BillVO>().SingleOrDefault();

            //return obj;

            return this.Con.Query<PGTRequisiteBiopsyDetails>(GenericSP.GetPGTRequisiteBiopsyDetails, paramReceiptList, commandType: CommandType.StoredProcedure).ToList();
        }
    }
}
