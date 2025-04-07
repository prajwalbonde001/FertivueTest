using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.ARTMgmt.IUI;
using PIVF.Entities.Models.ARTMgmt.IUI;
using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace PIVF.DataAccessLayer.ARTMgmt.IUI
{
    public class IUIDAL : IUIBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public IUIDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int SaveUpdate(IUIVO objIUIVO)
        {
            using (var transactionScope = new TransactionScope())
            {
                int Status = 0;
                var Param = new DynamicParameters();
                try
                {
                    if (objIUIVO.ID > 0)
                        Param.Add("@ID", objIUIVO.ID);
                    else
                        Param.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
                    Param.Add("@LinkServer", null);
                    Param.Add("@LinkServerAlias", null);
                    Param.Add("@LinkServerDBName", null);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);//objIUIVO.PatientID
                    Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);//objIUIVO.PatientUnitID
                    Param.Add("@STNo", objIUIVO.STNo);
                    Param.Add("@SpermTypeID", objIUIVO.SpermTypeID);
                    Param.Add("@SampleCode", objIUIVO.SampleCode);
                    Param.Add("@CollectionDate", objIUIVO.CollectionDate);
                    Param.Add("@TimeRecSampLab", objIUIVO.TimeRecSampLab);
                    Param.Add("@MethodOfCollection", objIUIVO.MethodOfCollection);
                    Param.Add("@ThawDate", objIUIVO.ThawDate);
                    Param.Add("@IVFMOSPCode", objIUIVO.IVFMOSPCode);
                    Param.Add("@Abstinence", objIUIVO.Abstinence);
                    Param.Add("@IUIDate", objIUIVO.IUIDate);
                    Param.Add("@WitnessByID", objIUIVO.WitnessByID);
                    Param.Add("@InSeminationMethodID", objIUIVO.InSeminationMethodID);
                    Param.Add("@DonorUnitID", objIUIVO.DonorUnitID);
                    Param.Add("@SampleID", objIUIVO.SampleID);
                    Param.Add("@DonorID", objIUIVO.DonorID);
                    Param.Add("@CollecteAtCentre", objIUIVO.SampleCollected);
                    Param.Add("@FrozenAtCentre", objIUIVO.FrozenSampleCollected);
                    Param.Add("@IsFrozenSample", objIUIVO.IsFrozenSample);
                    Param.Add("@Quantity", objIUIVO.Quantity);
                    Param.Add("@PreTotalSpermCount", objIUIVO.SpermCount);
                    Param.Add("@PreTotalMotility", objIUIVO.Motility);

                    Param.Add("@MotilityCntPost", objIUIVO.MotilityCntPost == null || Double.IsNaN(Convert.ToDouble(objIUIVO.MotilityCntPost)) ? null : objIUIVO.MotilityCntPost);
                    Param.Add("@MotilityCnt", objIUIVO.MotilityCnt == null || Double.IsNaN(Convert.ToDouble(objIUIVO.MotilityCnt)) ? null : objIUIVO.MotilityCnt);

                    Param.Add("@PreRBCells", objIUIVO.PreRBCells);
                    Param.Add("@PrePusCells", objIUIVO.PrePusCells);
                    Param.Add("@PreWBCCell", objIUIVO.PreWBCCell);
                    Param.Add("@PreEpithelialCells", objIUIVO.PreEpithelialCells);
                    Param.Add("@PreVolume", objIUIVO.Volume);
                    //Param.Add("@PreSpermConcentration", objIUIVO.SpermConcentration);
                    Param.Add("@PostTotalMotility", objIUIVO.MotilityPost);
                    Param.Add("@PostSpermCount", 0);//Temp
                    Param.Add("@PostTotalSpermCount", objIUIVO.SpermCountPost);
                    Param.Add("@PostPusCells", objIUIVO.PostPusCells);
                    Param.Add("@PostWBCCell", objIUIVO.PostWBCCell);
                    Param.Add("@PostEpithelialCells", objIUIVO.PostEpithelialCells);
                    Param.Add("@PostRBCells", objIUIVO.PostRBCells);
                    //Param.Add("@PostVolume", objIUIVO.VolumePost);
                    //Param.Add("@PostSpermConcentration", objIUIVO.SpermConcentrationPost);
                    Param.Add("@GradientUsed", objIUIVO.GradientUsed);
                    Param.Add("@GradientMin", objIUIVO.GradientMin);
                    Param.Add("@CryNo", objIUIVO.CryNo);
                    Param.Add("@ContrifugedMin", objIUIVO.ContrifugedMin);
                    Param.Add("@ContrifugedRpm", objIUIVO.ContrifugedRpm);
                    Param.Add("@WashMediaRpm", objIUIVO.WashMediaRpm);
                    Param.Add("@WashMediaMin", objIUIVO.WashMediaMin);
                    Param.Add("@WMWashMediMl", objIUIVO.WMWashMediMl);
                    Param.Add("@WMWashMediaRpm", objIUIVO.WMWashMediaRpm);
                    Param.Add("@WMWashMediaMin", objIUIVO.WMWashMediaMin);
                    Param.Add("@Remark", objIUIVO.Remark);
                    Param.Add("@Remarks", objIUIVO.Remarks);
                    Param.Add("@PreVolume", objIUIVO.Volume);
                    Param.Add("@PostVolume", objIUIVO.VolumePost);
                    Param.Add("@PreSpermConcentration", objIUIVO.SpermConcentration);
                    Param.Add("@PostSpermConcentration", objIUIVO.SpermConcentrationPost);
                    Param.Add("@CheckedByDoctorID", objIUIVO.CheckedByDoctorID);
                    Param.Add("@Comment", objIUIVO.Comment);
                    Param.Add("@PostwashTMSC", objIUIVO.PostwashTMSC);
                    Param.Add("@SampleLinkID", objIUIVO.SampleLinkID);
                    Param.Add("@Status", objIUIVO.Status);
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.MachineName);
                 //   Param.Add("@AddedDateTime", new DateTime());
                    Param.Add("@NewIUIDate", objIUIVO.SprermFreezingDate); //TempDate 
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    Param.Add("@Synchronized", objIUIVO.Synchronized);
                    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    Param.Add("@Err", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
                    Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                    Param.Add("@ISFromIUI", true);
                    Param.Add("@InSeminatedByID", objIUIVO.InSeminatedByID);
                    Param.Add("@SlowProgressivePost", objIUIVO.SlowProgressivePost);
                    Param.Add("@SlowProgressive", objIUIVO.SlowProgressive);
                    Param.Add("@WashMediMl", objIUIVO.WashMediMl);
                    Param.Add("@RapidProgressivePost", objIUIVO.RapidProgressivePost);
                    Param.Add("@RapidProgressive", objIUIVO.RapidProgressive);
                    Param.Add("@SwimUpMl", objIUIVO.SwimUpMl);
                    Param.Add("@SwimUpMin", objIUIVO.SwimUpMin);
                    Param.Add("@MethodSurgicalSRetrievalID", objIUIVO.MethodSurgicalSRetrievalID);
                    Param.Add("@ReceivingDate", objIUIVO.ReceivingDate);
                    Param.Add("@IsFinalized", objIUIVO.IsFinalized);
                    Param.Add("@MaleVisitID", objIUIVO.MaleVisitID);
                    Param.Add("@MaleVisitUnitID", objIUIVO.MaleVisitUnitID);
                    Param.Add("@IsDoner", objIUIVO.IsDoner);
                    Param.Add("@PreNonProgressive", objIUIVO.PreNonProgressive);
                    Param.Add("@PostNonProgressive", objIUIVO.PostNonProgressive);
                    Param.Add("@PreImmotile", objIUIVO.PreImmotile);
                    Param.Add("@PostImmotile", objIUIVO.PostImmotile);
                    Param.Add("@PreProgressive", objIUIVO.PreProgressive);
                    Param.Add("@PostProgressive", objIUIVO.PostProgressive);
                    Param.Add("@IsDonorAsPartner", objIUIVO.IsDonorAsPartner);//rohini
                    Param.Add("@DonorCode", objIUIVO.DonorCode);  //rohini 
                    Param.Add("@TIMSI",objIUIVO.TIMSI);                  
                    this.con.Query<int>(GenericSP.AddUpdateSemenWash, Param, commandType: CommandType.StoredProcedure);
                    objIUIVO.ID = Param.Get<Int64>("@ID");
                    Status = Param.Get<Int32>("@ResultStatus");

                    if (objIUIVO.ListSemenThawing.Count > 0)
                    {
                        foreach (var item in objIUIVO.ListSemenThawing)
                        {
                            var Param1 = new DynamicParameters();
                            Param1.Add("@IsUpdateFreez", false);
                            Param1.Add("@ThawID", item.ThawID);  //do no comment
                            Param1.Add("@UnitID", item.UnitID);
                            if (objIUIVO.IsFinalized == true)
                                Param1.Add("@IsUsed", true);
                            else
                                Param1.Add("@IsUsed", false);

                            Param1.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                            Param1.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                            this.con.Query<int>(GenericSP.UpdateThowSmaples, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        }
                    }
                    //if (objIUIVO.ListFreezThawSamples.Count > 0)
                    //{
                    //    foreach (var item in objIUIVO.ListFreezThawSamples)
                    //    {
                    //        var Param1 = new DynamicParameters();
                    //        Param1.Add("@IsUpdateFreez", true);
                    //        Param1.Add("@FreezID", item.FreezDetailID);
                    //        Param1.Add("@FreezUnitID", item.FreezDetailUnitID);
                    //        Param1.Add("@UnitID", item.UnitID);                          
                    //        Param1.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    //        Param1.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    //        this.con.Query<int>(GenericSP.UpdateThowSmaples, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    //    }
                    //}
                    transactionScope.Complete();
                }
                catch (Exception e)
                {
                    Status = 0;
                }
                return Status;
            }
        }
        public IUIVO GetIUIDetails()
        {
            IUIVO oBJ = new IUIVO();
            try
            {
                var Param = new DynamicParameters();
                //Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                //Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                Param.Add("@PatientID", GenericSP.SelectedCouple.MalePatient.MaleId);
                Param.Add("@PatientUnitID", GenericSP.SelectedCouple.MalePatient.MAleUnitID);
                Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);

                oBJ = this.con.Query<IUIVO>(GenericSP.GetIUIDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (oBJ == null)
                {
                    oBJ = new IUIVO();
                }
                var Param1 = new DynamicParameters();
                Param1.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                Param1.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                Param1.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param1.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                oBJ.ListSemenThawing = this.con.Query<SemenThawing>(GenericSP.GetThowingDetails, Param1, commandType: CommandType.StoredProcedure).ToList();

            }
            catch (Exception e)
            {
                oBJ = new IUIVO();
            }
            return oBJ;
        }
        public List<DonorListVO> LoadDonorData()
        {
            List<DonorListVO> oBJ = new List<DonorListVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                oBJ = this.con.Query<DonorListVO>(GenericSP.GetDonorListForIUI, Param ,commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {
                oBJ = new List<DonorListVO>();
            }
            return oBJ;
        }
        public List<IUIVO> GetSemenThawingDetailFromIUIIDForTC(string formNo, string action)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@formNo", formNo);
            Param.Add("@Action", action);

            return this.con.Query<IUIVO>(GenericSP.GetSemenThawingDetailFromSemenPrepIDForTC, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        //public List<SemenFreez> GetDonorFrozenSamples(long DonorID, long DonorUnitID)
        //{
        //    var Param = new DynamicParameters();        
        //    Param.Add("@DonorID", DonorID);
        //    Param.Add("@DonorUnitID", DonorUnitID);
        //    Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
        //    Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
        //    return this.con.Query<SemenFreez>(GenericSP.GetFreezSamplesForDonnor, Param, commandType: CommandType.StoredProcedure).AsList();
        //}
        public List<SemenFreez> GetDonorFrozenSamples(long DonorID, long DonorUnitID)
        {
            var Param1 = new DynamicParameters();
            Param1.Add("@PatientID", DonorID);
            Param1.Add("@PatientUnitID", DonorUnitID);
            Param1.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param1.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param1.Add("@Action", "DonorFreezDetails");
            return this.con.Query<SemenFreez>(GenericSP.GetSpermFreezingDetailsForThawingForView, Param1, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<SemenThawing> GetThowSmaples(long ID, long UnitID, int IsFreezThaw)
        {
            List<SemenThawing> List = new List<SemenThawing>();
            try
            {
                if (IsFreezThaw == 0)
                {
                    var Param = new DynamicParameters();
                    Param.Add("@ID", ID);
                    Param.Add("@UnitID", UnitID);
                    Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    List = this.con.Query<SemenThawing>(GenericSP.GetThowSamplesForIUI, Param, commandType: CommandType.StoredProcedure).AsList();

                }
                else if (IsFreezThaw == 1)
                {
                    var Param = new DynamicParameters();
                    Param.Add("@DonorID", ID);
                    Param.Add("@DonorUnitID", UnitID);
                    Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    List = this.con.Query<SemenThawing>(GenericSP.GetFreezSamplesForDonnor, Param, commandType: CommandType.StoredProcedure).AsList();
                }
                return List;
            }
            catch (Exception E)
            {
                return List;
            }
        }
    }
}
