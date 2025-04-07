using System;
using PIVF.Entities.Models.EMR.MaleHistory;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.BusinessLayer.EMR.MaleHistory;
using System.Linq;
using System.Collections.Generic;

namespace PIVF.DataAccessLayer.EMR.MaleHistory
{
    public class SemenAnalysisServiceDAL : SemenAnalysisServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public SemenAnalysisServiceDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int SaveUpdate(SemenExamination objSemenExam)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            if (objSemenExam.ID > 0)
                Param.Add("@ID", objSemenExam.ID);
            else
                Param.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output);
            Param.Add("@SNo", objSemenExam.SNo);
            Param.Add("@Action", "SaveUpdateSemenExamDetail");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);//objSemenFreez.PatientID
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);//objSemenFreez.PatientUnitID
            if (GenericSP.SelectedPatient.VisitID != 0)
            { 
                Param.Add("@visitID", GenericSP.SelectedPatient.VisitID);
            }
            Param.Add("@CollectionDate", objSemenExam.CollectionDate);
            Param.Add("@SSRNo", objSemenExam.SSRNo);
            Param.Add("@ReceivingDate", objSemenExam.ReceivingDate);
            Param.Add("@MethodOfCollection", objSemenExam.MethodOfCollection);
            Param.Add("@MOSSRetrivalID", objSemenExam.MOSSRetrivalID);
            Param.Add("@AbstinenceID", objSemenExam.AbstinenceID);
            Param.Add("@SemenCID", objSemenExam.SemenCID);
            Param.Add("@RoundHead", objSemenExam.RoundHead);
            Param.Add("@SpermConcentration", objSemenExam.SpermConcentration); //byte rohini
            
            //Param.Add("@Abstinence", objSemenExam.Abstinence);
            Param.Add("@Color", objSemenExam.Color);
            Param.Add("@PH", objSemenExam.PH);
            Param.Add("@LiquificationTime", objSemenExam.LiquificationTime);
            Param.Add("@ViscosityID", objSemenExam.ViscosityID);
            Param.Add("@OdourID", objSemenExam.OdourID);
            Param.Add("@Thick", objSemenExam.Thick);
            Param.Add("@Coiled", objSemenExam.Coiled);

            Param.Add("@RBCID", objSemenExam.RBCID);
            Param.Add("@RBC", objSemenExam.RBC);
            Param.Add("@MethodSurgicalSRetrievalID", objSemenExam.MethodSurgicalSRetrievalID);

            Param.Add("@Odour", objSemenExam.Odour);
            Param.Add("@SpermCount", objSemenExam.SpermCount);
            Param.Add("@TotalSpermCount", objSemenExam.TotalSpermCount);
            Param.Add("@Motility", objSemenExam.Motility);
            Param.Add("@NonMotility", objSemenExam.NonMotility);
            //Param.Add("@TotalMotility", objSemenExam.Motility);
            Param.Add("@TailToTail", objSemenExam.TailToTail);
            Param.Add("@HeadToTail", objSemenExam.HeadToTail);
            Param.Add("@HeadToHead", objSemenExam.HeadToHead);
            Param.Add("@SpermToOther", objSemenExam.SpermToOther);
            Param.Add("@InterpretationsID", objSemenExam.InterpretationsID);
            Param.Add("@Comment", objSemenExam.Comment);
            Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@SampleCollection", objSemenExam.SampleCollection);
            Param.Add("@Volume", objSemenExam.Volume);
            Param.Add("@Appearance", objSemenExam.Appearance);
            Param.Add("@AppearanceID", objSemenExam.AppearanceID);
            Param.Add("@IsFinalize", objSemenExam.IsFinalize);
            Param.Add("@NonProgressive", objSemenExam.GradeB);
            Param.Add("@Immotile", objSemenExam.GradeC);
            Param.Add("@AsymmetricalInsertion", objSemenExam.AsymmetricalInsertion);
            Param.Add("@Short", objSemenExam.Short);
            Param.Add("@DoubleTail", objSemenExam.DoubleTail);
            Param.Add("@CollecteAtCentre", objSemenExam.CollecteAtCentre);
            Param.Add("@Progressive", objSemenExam.GradeA);
            Param.Add("@SlowProgressive", objSemenExam.SlowProgressive);
            Param.Add("@RapidProgressive", objSemenExam.RapidProgressive);
            Param.Add("@Viability", objSemenExam.Viability);
            Param.Add("@Small", objSemenExam.Small);
            Param.Add("@Large", objSemenExam.Large);
            Param.Add("@Tapered", objSemenExam.Tapered);
          
            Param.Add("@Amorphous", objSemenExam.Amorphous);
            Param.Add("@Vacuolated", objSemenExam.Vacuolated);
            Param.Add("@Pyriform", objSemenExam.Pyriform);
            Param.Add("@Bent", objSemenExam.Bent);
            Param.Add("@Thin", objSemenExam.Thin);
            Param.Add("@WBC", objSemenExam.WBC);
            Param.Add("@WitnessedBy", objSemenExam.WitnessedBy);
            Param.Add("@DoctorID", objSemenExam.DoneBy);
            Param.Add("@CytoplasmicDroplet", objSemenExam.CytoplasmicDroplet);   //Added by Nayan Kamble 

            Param.Add("@PusCellsID", objSemenExam.PusCellsID);
            Param.Add("@PusCells", objSemenExam.PusCells);
            Param.Add("@EpithelialCells", objSemenExam.EpithelialCells);
            Param.Add("@Fructose", objSemenExam.Fructose);
            Param.Add("@Remarks", objSemenExam.Remarks);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@Vacuoles", objSemenExam.Vacuoles);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@Vitality", objSemenExam.Vitality);
            Param.Add("@DNAFragIndex", objSemenExam.DNAFragIndex);
            Param.Add("@TeratozoospermicIndex", objSemenExam.TeratozoospermicIndex);
            Param.Add("@PrognosisID", objSemenExam.PrognosisID);

            Param.Add("@HeadDefects",objSemenExam.HeadDefects);
            Param.Add("@NeckMidpieceDefects", objSemenExam.NeckMidpieceDefects);
            Param.Add("@TailDefects", objSemenExam.TailDefects);
            Param.Add("@SumTotalNormal", objSemenExam.SumTotalNormal);
            Param.Add("@SumTotalAbnormal", objSemenExam.SumTotalAbnormal);



            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.AddUpdateSemenExamDetails, Param, commandType: CommandType.StoredProcedure);

            objSemenExam.ID = Param.Get<Int64>("@ID");
            Status = Param.Get<Int32>("@ResultStatus");

            return Status;

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

        public List<SemenExamination> GetSemenAnalysisList(string SNo, string Action)
        {
            var Param = new DynamicParameters();
            Param.Add("@SNo", SNo);
            Param.Add("@Action", Action);
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);            
            return this.con.Query<SemenExamination>(GenericSP.GetSemenAnalysisList, Param, commandType: CommandType.StoredProcedure).AsList();
        }


        public List<SemenExamination> GetSALinkByPatientID(int MethodOfSurgicalSpermRetrivalID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);            

            if (MethodOfSurgicalSpermRetrivalID < 1)
                Param.Add("@MethodOfSurgicalSpermRetrivalID", null);
            else
                Param.Add("@MethodOfSurgicalSpermRetrivalID", MethodOfSurgicalSpermRetrivalID);

            return this.con.Query<SemenExamination>(GenericSP.GetSALinkByPatientID, Param, commandType: CommandType.StoredProcedure).AsList();
        }


        public int UpdateLinkFinalize(List<string> SemenExaminationSNoList)
        {
            int status = 0;
            foreach (string SNo in SemenExaminationSNoList)
            {
                var Param = new DynamicParameters();
                Param.Add("@SNo", SNo);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Query<int>(GenericSP.UpdateLinkFinalize, Param, commandType: CommandType.StoredProcedure);
                status = Param.Get<Int32>("@ResultStatus");
                if (status != 1)
                    break;
            }
            return status;
        }



        public List<SurgicalSpermRetrival> GetSurgicalSpermRetrivalByPatientID(string SNo)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@SNo", SNo);
            return this.con.Query<SurgicalSpermRetrival>(GenericSP.GetSurgicalSpermRetrivalByPatientID, Param, commandType: CommandType.StoredProcedure).AsList();
        }
    }
}
