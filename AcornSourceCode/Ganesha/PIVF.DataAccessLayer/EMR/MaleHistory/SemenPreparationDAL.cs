using System;
using PIVF.Entities.Models.EMR.MaleHistory;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.BusinessLayer.EMR.MaleHistory;
using System.Collections.Generic;
using System.Linq;

namespace PIVF.DataAccessLayer.EMR.MaleHistory
{
    public class SemenPreparationDAL : SemenPrepServiceBAL
    {

        private Database dbServer = null;
        IDbConnection con;
        public SemenPreparationDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int SaveUpdate(SemenPreparation objSemenPrep)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            if (objSemenPrep.ID > 0)
                Param.Add("@ID", objSemenPrep.ID);
            else
                Param.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);

            Param.Add("@LinkServer", null);
            Param.Add("@LinkServerAlias", null);
            Param.Add("@LinkServerDBName", null);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            //Param.Add("@PatientID", GenericSP.SelectedPatient.ID);//objSemenFreez.PatientID    //--Commented by Nayan Kamble on 03/10/2019  
            Param.Add("@PatientID", GenericSP.SelectedCouple.MalePatient.MaleId);      //Added by Nayan Kamble on 03/10/2019    for Motherhood
            // Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);//objSemenFreez.PatientUnitID         //--Commented by Nayan Kamble on 03/10/2019
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.MalePatient.MAleUnitID);               //Added by Nayan Kamble on 03/10/2019 for Motherhood
            Param.Add("@STNo", objSemenPrep.STNo);
            Param.Add("@SpermTypeID", objSemenPrep.SpermTypeID);
            Param.Add("@SampleCode", objSemenPrep.SampleCode);
            Param.Add("@CollectionDate", objSemenPrep.CollectionDate);
            Param.Add("@TimeRecSampLab", objSemenPrep.TimeRecSampLab);
            Param.Add("@MethodOfCollection", objSemenPrep.MethodOfCollection);
            Param.Add("@ThawDate", objSemenPrep.ThawDate);
            Param.Add("@IVFMOSPCode", objSemenPrep.IVFMOSPCode);
            Param.Add("@Abstinence", objSemenPrep.Abstinence);
            Param.Add("@IUIDate", objSemenPrep.IUIDate);
            Param.Add("@WitnessByID", objSemenPrep.WitnessByID);
            Param.Add("@InSeminationMethodID", objSemenPrep.InSeminationMethodID);
            Param.Add("@SampleID", objSemenPrep.SampleID);
            Param.Add("@DonorID", objSemenPrep.CheckedByDoctorID);
            Param.Add("@DonorUnitID", objSemenPrep.DonorID);
            Param.Add("@CollecteAtCentre", objSemenPrep.SampleCollected);
            Param.Add("@FrozenAtCentre", objSemenPrep.FrozenSampleCollected);
            Param.Add("@IsFrozenSample", objSemenPrep.IsFrozenSample);
            Param.Add("@Quantity", objSemenPrep.Quantity);
            Param.Add("@PreTotalSpermCount", objSemenPrep.SpermCount);
            Param.Add("@PreTotalMotility", objSemenPrep.Motility);
            Param.Add("@PostTotalMotility", objSemenPrep.MotilityPost);
            Param.Add("@PostSpermCount", 0);//Temp
            Param.Add("@PostTotalSpermCount", objSemenPrep.SpermCountPost);
            Param.Add("@PreRBCells", objSemenPrep.PreRBCells);
            Param.Add("@PrePusCells", objSemenPrep.PrePusCells);
            Param.Add("@PreWBCCell", objSemenPrep.PreWBCCell);
            Param.Add("@PreEpithelialCells", objSemenPrep.PreEpithelialCells);
            Param.Add("@PostPusCells", objSemenPrep.PostPusCells);
            Param.Add("@PostWBCCell", objSemenPrep.PostWBCCell);
            Param.Add("@PostEpithelialCells", objSemenPrep.PostEpithelialCells);
            Param.Add("@PostRBCells", objSemenPrep.PostRBCells);
            Param.Add("@GradientUsed", objSemenPrep.GradientUsed);
            Param.Add("@GradientMin", objSemenPrep.GradientMin);
            Param.Add("@CryNo", objSemenPrep.CryNo);
            Param.Add("@ContrifugedMin", objSemenPrep.ContrifugedMin);
            Param.Add("@ContrifugedRpm", objSemenPrep.ContrifugedRpm);
            Param.Add("@WashMediaRpm", objSemenPrep.WashMediaRpm);
            Param.Add("@WashMediaMin", objSemenPrep.WashMediaMin);
            Param.Add("@WMWashMediMl", objSemenPrep.WMWashMediMl);
            Param.Add("@WMWashMediaRpm", objSemenPrep.WMWashMediaRpm);
            Param.Add("@WMWashMediaMin", objSemenPrep.WMWashMediaMin);
            Param.Add("@Remark", objSemenPrep.Remark);
            Param.Add("@Remarks", objSemenPrep.Remarks);
            Param.Add("@PreVolume", objSemenPrep.Volume);
            Param.Add("@PostVolume", objSemenPrep.VolumePost);
            Param.Add("@PreSpermConcentration", objSemenPrep.SpermConcentration);
            Param.Add("@PostSpermConcentration", objSemenPrep.SpermConcentrationPost);
            Param.Add("@CheckedByDoctorID", objSemenPrep.CheckedByDoctorID);
            Param.Add("@Comment", objSemenPrep.Comment);
            Param.Add("@SampleLinkID", objSemenPrep.SampleLinkID);
            Param.Add("@Status", objSemenPrep.Status);
            Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            //Param.Add("@AddedDateTime", objSemenPrep.SprermFreezingDate); //TempDate 
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@Synchronized", objSemenPrep.Synchronized);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@Err", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            Param.Add("@PlanTherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@PlanTherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@ISFromIUI", false);
            Param.Add("@InSeminatedByID", objSemenPrep.InSeminatedByID);
            Param.Add("@SlowProgressivePost", objSemenPrep.SlowProgressivePost);
            Param.Add("@SlowProgressive", objSemenPrep.SlowProgressive);
            Param.Add("@WashMediMl", objSemenPrep.WashMediMl);
            Param.Add("@RapidProgressivePost", objSemenPrep.RapidProgressivePost);
            Param.Add("@RapidProgressive", objSemenPrep.RapidProgressive);
            Param.Add("@SwimUpMl", objSemenPrep.SwimUpMl);
            Param.Add("@SwimUpMin", objSemenPrep.SwimUpMin);
            Param.Add("@MethodSurgicalSRetrievalID", objSemenPrep.MethodSurgicalSRetrievalID);
            Param.Add("@ReceivingDate", objSemenPrep.ReceivingDate);            
            Param.Add("@IsFinalized", objSemenPrep.IsFinalized);
            Param.Add("@MaleVisitID", objSemenPrep.MaleVisitID);
            Param.Add("@MaleVisitUnitID", objSemenPrep.MaleVisitUnitID);
            Param.Add("@IsDoner", objSemenPrep.IsDoner);
            Param.Add("@PreNonProgressive", objSemenPrep.PreNonProgressive);
            Param.Add("@PostNonProgressive", objSemenPrep.PostNonProgressive);
            Param.Add("@PreImmotile", objSemenPrep.PreImmotile);
            Param.Add("@PostImmotile", objSemenPrep.PostImmotile);
            Param.Add("@PreProgressive", objSemenPrep.PreProgressive);
            Param.Add("@PostProgressive", objSemenPrep.PostProgressive);
           // Param.Add("@MotilityCntPost", objSemenPrep.MotilityCntPost);
            //Param.Add("@MotilityCnt", objSemenPrep.MotilityCnt);


            Param.Add("@NewIUIdate", objSemenPrep.SprermFreezingDate);      
            this.con.Query<int>(GenericSP.AddUpdateSemenWash, Param, commandType: CommandType.StoredProcedure);
            objSemenPrep.ID = Param.Get<Int64>("@ID");
            Status = Param.Get<Int32>("@ResultStatus");
            return Status;
        }

        public List<SemenPreparation> GetSemenPreparationList()
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@GetTableContent", 0);

            return this.con.Query<SemenPreparation>(GenericSP.GetSemenPreparationList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<SemenPreparation> GetSemenPreparationListForTC()
        {
            var Param = new DynamicParameters();

            //Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            //Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            if(GenericSP.SelectedCouple.MalePatient.MaleId != 0)
            {
                Param.Add("@PatientID", GenericSP.SelectedCouple.MalePatient.MaleId);
            }
            else
            {
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            }
            if (GenericSP.SelectedCouple.MalePatient.MAleUnitID != 0)
            {
                Param.Add("@PatientUnitID", GenericSP.SelectedCouple.MalePatient.MAleUnitID);
            }
            else
            {
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            }
            Param.Add("@GetTableContent", 1);
            return this.con.Query<SemenPreparation>(GenericSP.GetSemenPreparationList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public SemenPreparation GetSemenProcessingDetailFromSemenPrepIDForTC(string SNo)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@SNo", SNo);
            return this.con.Query<SemenPreparation>(GenericSP.GetSemenProcessingDetailFromSemenPrepIDForTC, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public List<SemenFreez> GetSemenThawingDetailFromSemenPrepIDForTC(string formNo, string action)
        {
            var Param = new DynamicParameters();
            if (GenericSP.SelectedPatient != null)            {
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);                
            }              
            Param.Add("@SpermNo", formNo);
            Param.Add("@Action", action);

            return this.con.Query<SemenFreez>(GenericSP.GetSemenThawingDetailFromSemenPrepIDForTC, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<SemenThawing> GetSemenThawingDetailFromSemenPrepIDForTC1(string formNo, string action)
        {
            var Param = new DynamicParameters();
            if (GenericSP.SelectedPatient != null)
            {
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            }
            Param.Add("@SpermNo", formNo);
            Param.Add("@Action", action);

            return this.con.Query<SemenThawing>(GenericSP.GetSemenThawingDetailFromSemenPrepIDForTC, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public SemenPreparation GetSPDetailsBySNo(string SNo)
        {
            SemenPreparation objSP = new SemenPreparation();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                Param.Add("@TherapyID", null);
                Param.Add("@TherapyUnitID", null);
                Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@SNo", SNo);

                objSP = this.con.Query<SemenPreparation>(GenericSP.GetIUIDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                objSP = new SemenPreparation();
            }
            return objSP;
        }
    }
}
