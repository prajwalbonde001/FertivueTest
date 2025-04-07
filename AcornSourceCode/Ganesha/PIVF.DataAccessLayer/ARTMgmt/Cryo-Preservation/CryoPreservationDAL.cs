using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using PIVF.Entities.Models.Patient;
using System.Transactions;

namespace PIVF.DataAccessLayer.ARTMgmt.Cryo_Preservation
{
    public class CryoPreservationDAL : CryoPreservationBL
    {
        private Database dbServer = null;
        IDbConnection Con;
        public CryoPreservationDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        public int SaveOocyteVitrification(List<IVF_VitrificationDetailsVO> IVF_VitrificationVO)
        {
            int ResultStatus = 0;
            try
            {
                foreach (IVF_VitrificationDetailsVO item in IVF_VitrificationVO)
                {
                    var Param = new DynamicParameters();
                    Param.Add("@ID", item.ID);
                    Param.Add("@UnitID", item.UnitID);
                    Param.Add("@EmbNumber", item.EmbNumber);
                    Param.Add("@EmbSerialNumber", item.EmbSerialNumber);
                    Param.Add("@VitriDate", item.VitriDate);
                    Param.Add("@VitriTime", item.VitriTime);
                    Param.Add("@ExpiryDate", item.ExpiryDate);
                    Param.Add("@ExpiryTime", item.ExpiryTime);
                    Param.Add("@TankId", item.TankId);
                    Param.Add("@ConistorID", item.ConistorID);
                    Param.Add("@GlobletColorID", item.GlobletColorID);
                    Param.Add("@GlobletSizeID", item.GlobletSizeID);
                    Param.Add("@CryolockID", item.CryolockID);
                    Param.Add("@EmbryologistID", item.EmbryologistID);
                    Param.Add("@Witness", item.Witness);
                    Param.Add("@Remarks", item.Remarks);
                    Param.Add("@IsFinalized", item.IsFinalized);
                    Param.Add("@MediaID",item.MediaID);
                    Param.Add("@LotNo",item.LotNo);
                    Param.Add("@MediaExpiryDate",item.MediaExpiryDate);
                    Param.Add("@FreezingNo",item.FreezingNo);
                    Param.Add("@ResultStatus", 0, DbType.Int32, ParameterDirection.Output);
                    Con.Execute(GenericSP.UpdateOocyteVitrification, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus = Param.Get<Int32>("@ResultStatus");

                }
                return ResultStatus;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public IVF_VitrificationVO GetVitriDetails(bool IsOnlyVitrification, bool IsForThawTab)
        {
            IVF_VitrificationVO Obj = new IVF_VitrificationVO();
            try
            {
                var Param = new DynamicParameters();
                if (GenericSP.SelectedCouple.FemalePatient != null)
                {
                    Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                    Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                    Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                }
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@IsOnlyVitrification", IsOnlyVitrification);
                Param.Add("@IsForThawTab", IsForThawTab);

                var MultiQuery = this.Con.QueryMultiple(GenericSP.GetVitrificationDetailsForOocytes, Param, commandType: CommandType.StoredProcedure);

                Obj = MultiQuery.Read<IVF_VitrificationVO>().FirstOrDefault();
                Obj.ListVitriDetails = MultiQuery.Read<IVF_VitrificationDetailsVO>().ToList();

            }
            catch (Exception E)
            {
                Obj = null;
            }
            return Obj;
        }

        public OocyteThawingVO GetVitrificationSummaryList()
        {
            var Param = new DynamicParameters();
            OocyteThawingVO obj = new OocyteThawingVO();
            obj.lstVitriSummary = new List<OocyteThawingVO>();
            obj.lstThaw = new List<OocyteThaw>();
            if (GenericSP.SelectedCouple.FemalePatient != null)
            {

                Param.Add("@Action", "GetOocyteVitrificationSummary");
                Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            }

            var MultiQuery = this.Con.QueryMultiple(GenericSP.OocyteThawing, Param, commandType: CommandType.StoredProcedure);
            obj.lstVitriSummary = MultiQuery.Read<OocyteThawingVO>().ToList();
            obj.lstThaw = MultiQuery.Read<OocyteThaw>().ToList();
            return obj;
        }

        public int SaveOocyteThawing(List<OocyteThawingVO> IVF_VitrificationVO)
        {
            int ResultStatus = 0;
            if (IVF_VitrificationVO != null)
            {

                //var Thaw = IVF_VitrificationVO.Where(x => x.ThawID > 0 && x.IsFinalize);
                //if (Thaw != null)
                //{
                //    List<OocyteThawingVO> storeItem = new List<OocyteThawingVO>();
                //    foreach (var item in Thaw)
                //    {
                //        storeItem.Add(item);
                //    }
                //    foreach(var item in storeItem)
                //    {
                //        IVF_VitrificationVO.Remove(item);
                //    }         
                //}
                foreach (OocyteThawingVO item in IVF_VitrificationVO)
                {
                    var Param = new DynamicParameters();
                    Param.Add("@Action", "SaveOocyteThawing");
                    Param.Add("@ID", item.ThawID);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@PostThawingPlan", item.PostThawPlanID);
                    Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                    Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                    Param.Add("@PlanTherapyID", item.PlanTherapyID);
                    Param.Add("@PlanTherapyUnitID", item.PlanTherapyUnitID);
                    Param.Add("@SelectedTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@SelectedTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    Param.Add("@SelectedCycleCode", GenericSP.SelectedCouple.FemalePatient.CycleCode);
                    Param.Add("@VitriID", item.VitriID);
                    Param.Add("@VitriDetailID", item.VitriDetailID);
                    Param.Add("@VitriDetailUnitID", item.VitriDetailUnitID);
                    Param.Add("@ThawingDate", item.VitriDate);
                    Param.Add("@IsFET", item.IsFET);
                    Param.Add("@ThawingTime", item.VitriTime);
                    Param.Add("@OocyteNo", item.OocyteNo);
                    Param.Add("@EmbSerialNumber", item.EmbSerialNumber);
                    Param.Add("@IsFinalize", item.IsFinalize);
                    Param.Add("@EmbryologistID", item.EmbryologistID);
                    Param.Add("@WitnessEmbID", item.WitEmbryologistID);
                    Param.Add("@Remarks", item.Remark);
                    Param.Add("@Donor", item.Donor);
                    Param.Add("@CellStageID", item.CellStageID);
                    Param.Add("@GradeID", item.GradeID);

                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    Param.Add("@ResultStatus", 0, DbType.Int32, ParameterDirection.Output);
                    Con.Execute(GenericSP.OocyteThawing, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus = Param.Get<Int32>("@ResultStatus");
                }
            }
            return ResultStatus;
        }

        //public IVF_VitrificationVO GetVitrificationDetailsOocyteBank(int PageIndex, bool IsSinglePatient, int UnitID, int TankID, int CanisterID, int ColorCodeID, int GobletSizeId, string NameCodeMRNo, bool IsShowDiscard, string StatusOption, string Action, int IsExpired)  // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        public IVF_VitrificationVO GetVitrificationDetailsOocyteBank(int PageIndex, bool IsSinglePatient, int UnitID, int TankID, int CanisterID, int ColorCodeID, int GobletSizeId, string NameCodeMRNo, bool IsShowDiscard, string StatusOption, string Action, int IsExpired, int NearExpiryDays)  // Modified on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        {
            IVF_VitrificationVO Obj = new IVF_VitrificationVO();
            try
            {
                var Param = new DynamicParameters();
                if (TankID > 0)
                    Param.Add("@TankID", TankID);
                if (CanisterID > 0)
                    Param.Add("@CanisterID", CanisterID);
                if (ColorCodeID > 0)
                    Param.Add("@ColorCodeID", ColorCodeID);
                if (GobletSizeId > 0)
                    Param.Add("@GobletSizeId", GobletSizeId);
                if (IsSinglePatient)
                    Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);

                if(NearExpiryDays > 0)  // Added on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
                    Param.Add("@NearExpiryDays", NearExpiryDays);

                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@NameCodeMRNo", NameCodeMRNo);
                Param.Add("@IsShowDiscard", IsShowDiscard);
                Param.Add("@PageIndex", PageIndex);
                Param.Add("@StatusOption", StatusOption);
                Param.Add("@Action", Action);
                Param.Add("@IsExpired", IsExpired);


                Obj.ListVitriDetails = this.Con.Query<IVF_VitrificationDetailsVO>(GenericSP.GetVitrificationDetailsOocyteBank, Param, commandType: CommandType.StoredProcedure).ToList();

            }
            catch (Exception E)
            {
                Obj = null;
            }
            return Obj;
        }

        public IVF_VitrificationVO GetVitrificationBankHistory(int UnitID, int VitrificationID, int VitrificationUnitID, int EmbNumber, int EmbSerialNumber, string Action)
        {
            IVF_VitrificationVO Obj = new IVF_VitrificationVO();
            try
            {
                var Param = new DynamicParameters();

                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@VitrificationID", VitrificationID);
                Param.Add("@VitrificationUnitID", VitrificationUnitID);
                Param.Add("@EmbNumber", EmbNumber);
                Param.Add("@EmbSerialNumber", EmbSerialNumber);
                Param.Add("@Action", Action);

                Obj.ListVitriDetails = this.Con.Query<IVF_VitrificationDetailsVO>(GenericSP.GetVitrificationBankHistory, Param, commandType: CommandType.StoredProcedure).ToList();

            }
            catch (Exception E)
            {
                Obj = null;
            }
            return Obj;
        }
        #region Added by Manohar for Transport functionality
        public int SaveTransportDetails(IVF_VitrificationDetailsVO obj)
        {

            var Param = new DynamicParameters();
            Param.Add("@PatientID", obj.PatientID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientUnitID", GenericSP.CurrentUser.UnitID);
            if (!string.IsNullOrEmpty(Convert.ToString(obj.strReport)) && (obj.IsConsent))
            {
                obj.Report = System.Text.Encoding.UTF8.GetBytes(obj.strReport);
            }
            if (!string.IsNullOrEmpty(obj.strReport))
                Param.Add("@Report", obj.Report);

            Param.Add("@IsConsent", obj.IsConsent);
            Param.Add("@TransportDate", obj.TransportDate);
            Param.Add("@TransportID", obj.TransportID);
            Param.Add("@TransportRemark", obj.TransportRemark);
            Param.Add("@TransportDescription", obj.TransportDescription);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.Con.Query<int>(GenericSP.UpdateFemaleBankTransfer, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<int>("@ResultStatus");
        }
        #endregion

        #region Added by manohar for Inward functionality
        public int InsertUpdateOocytrEmbryoVitrification(List<IVF_VitrificationDetailsVO> IVF_VitrificationVO)
        {
            int ResultStatus = 0;
            try
            {
                foreach (IVF_VitrificationDetailsVO item in IVF_VitrificationVO)
                {
                    var Param = new DynamicParameters();
                    Param.Add("@ID", item.ID);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    // Param.Add("@EmbNumber", item.EmbNumber);
                    // Param.Add("@EmbSerialNumber", item.EmbSerialNumber);

                    Param.Add("@PatientID", item.PatientID);
                    Param.Add("@PatientUnitID", item.PatientUnitID);

                    Param.Add("@VitriDate", item.VitriDate);
                    Param.Add("@VitriTime", item.VitriTime);
                    Param.Add("@Day1", item.TransferDayNo);
                    Param.Add("@ExpiryDate", item.ExpiryDate);
                    Param.Add("@ExpiryTime", item.ExpiryTime);
                    Param.Add("@TankId", item.TankId);
                    Param.Add("@Maturity", item.OocyteMaturityID);
                    Param.Add("@ConistorID", item.CanisterID);
                    Param.Add("@GlobletColorID", item.ColorCodeID);
                    Param.Add("@GlobletSizeID", item.GobletSizeId);
                    Param.Add("@CryolockID", item.CryolockID);
                    Param.Add("@IsFET", item.IsFET);
                    Param.Add("@EmbryologistID", item.EmbryologistID);
                    Param.Add("@Witness", item.Witness);
                    Param.Add("@CoupleID", item.CoupleID);
                    Param.Add("@IsFinalized", item.IsFinalized);
                    Param.Add("@IsFromOocytesBank", item.IsFromOocytesBank);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                    Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                    Param.Add("@ResultStatus", 0, DbType.Int32, ParameterDirection.Output);
                    Param.Add("@MediaID", item.MediaID);
                    Param.Add("@LotNo", item.LotNo);
                    Param.Add("@MediaExpiryDate", item.MediaExpiryDate);
                    Param.Add("@FreezingNo", item.FreezingNo);
                    Param.Add("@CellStageID", item.CellStageID);
                    Param.Add("@GradeID", item.GradeID);

                    Con.Execute(GenericSP.InsertUpdateOocytrEmbryoVitrification, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus = Param.Get<Int32>("@ResultStatus");

                }
                return ResultStatus;

            }
            catch (Exception e)
            {
                return 0;
            }



        }
        #endregion

        #region Added By Vikrant For Get Donor Oocyte 
        public List<clsPatientVO> GetDonorList()
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID, DbType.Int64);
            Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            return this.Con.Query<clsPatientVO>(GenericSP.GetDonorListForOocyteCryo, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<IVF_VitrificationDetailsVO> GetVitrificationDetails(long VitriFicationID, long VitriFicationUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@VitriFicationID", VitriFicationID, DbType.Int64);
            Param.Add("@VitriFicationUnitID", VitriFicationUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            return this.Con.Query<IVF_VitrificationDetailsVO>(GenericSP.GetVitrificationDetails, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public long TransferDonorOocytestoCouple(List<IVF_VitrificationDetailsVO> TransferData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (IVF_VitrificationDetailsVO Item in TransferData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@VitriFicationID", Item.ID, DbType.Int64);
                        Param.Add("@VitriFicationUnitID", Item.UnitID, DbType.Int64);
                        Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID, DbType.Int64);
                        Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                        Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        this.Con.Execute(GenericSP.SaveTransferData, Param, commandType: CommandType.StoredProcedure);
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
        public long DonateOocytefromBank(long VitrivicationID, long VitrificationUnitID, long VitrificationDetailID, string VitrificationNo, long TransferDonorID, long TransferDonorUnitID)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    var Param = new DynamicParameters();
                    Param.Add("@VitriFicationID", VitrivicationID, DbType.Int64);
                    Param.Add("@VitriFicationUnitID", VitrificationUnitID, DbType.Int64);
                    Param.Add("@VitrificationDetailID", VitrificationDetailID, DbType.Int64);
                    Param.Add("@TransferDonorID", TransferDonorID, DbType.Int64);
                    Param.Add("@TransferDonorUnitID", TransferDonorUnitID, DbType.Int64);
                    Param.Add("@VitrificationNo", VitrificationNo, DbType.String);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                    Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                    this.Con.Execute(GenericSP.DonateOocytefromBank, Param, commandType: CommandType.StoredProcedure);
                    transactionScope.Complete();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public long DonateEmbryofromBank(long VitrivicationID, long VitrificationUnitID, long VitrificationDetailID, string VitrificationNo, long TransferDonorID, long TransferDonorUnitID)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    var Param = new DynamicParameters();
                    Param.Add("@VitriFicationID", VitrivicationID, DbType.Int64);
                    Param.Add("@VitriFicationUnitID", VitrificationUnitID, DbType.Int64);
                    Param.Add("@VitrificationDetailID", VitrificationDetailID, DbType.Int64);
                    Param.Add("@TransferDonorID", TransferDonorID, DbType.Int64);
                    Param.Add("@TransferDonorUnitID", TransferDonorUnitID, DbType.Int64);
                    Param.Add("@VitrificationNo", VitrificationNo, DbType.String);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                    Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                    Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName, DbType.String);
                    this.Con.Execute(GenericSP.DonateEmbryofromBank, Param, commandType: CommandType.StoredProcedure);
                    transactionScope.Complete();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        #endregion

        public int CheckDuplicateFreezingNo(string Item,bool Flag)
        {
            int Status = 0;
            var Param1 = new DynamicParameters();
            Param1.Add("@IsEmbryo", Flag);
            Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param1.Add("@FreezingNo", Item);
            Param1.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
            Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.Con.Query<int>(GenericSP.CheckDuplicateFreezingNo, Param1, commandType: CommandType.StoredProcedure);
            Status = Param1.Get<Int32>("@ResultStatus");
            return Status;
        }

        public List<IVF_VitrificationDetailsVO> GetEmbriyoVitrificationDetails(long VitriFicationID, long VitriFicationUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@VitriFicationID", VitriFicationID, DbType.Int64);
            Param.Add("@VitriFicationUnitID", VitriFicationUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            return this.Con.Query<IVF_VitrificationDetailsVO>(GenericSP.GetEmbriyoVitrificationDetails, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public long TransferDonorEmbriyostoCouple(List<IVF_VitrificationDetailsVO> TransferData)
        {
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    foreach (IVF_VitrificationDetailsVO Item in TransferData)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@VitriFicationID", Item.ID, DbType.Int64);
                        Param.Add("@VitriFicationUnitID", Item.UnitID, DbType.Int64);
                        Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID, DbType.Int64);
                        Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                        Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                        this.Con.Execute(GenericSP.SaveTransferDataEmbriyo, Param, commandType: CommandType.StoredProcedure);
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
