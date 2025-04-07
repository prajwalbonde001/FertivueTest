using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.NewART;
using PIVF.Entities.Models.EMR.Investigation;
using PIVF.Entities.Models.NewART;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.NewART
{
    public class NewARTDAL : NewARTBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public NewARTDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int SaveUpdate(NewARTVO item)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            if (item.ID == 0)
            {
                Param.Add("@Action", "AddNewART");
                Param.Add("@ID", item.ID);
                //  Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedWindowLoginName", Environment.UserName);
            }
            else
            {
                Param.Add("@Action", "UpdateCycle");
                Param.Add("@ID", item.ID);
                //    Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@UpdatedOn", Environment.MachineName);
                Param.Add("@UpdatedWindowLoginName", Environment.UserName);
            }
            Param.Add("@InvestigationID", item.InvID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientId", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@PatientUnitId", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@CoupleID", GenericSP.SelectedCouple.ID);
            Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.UnitID);
            Param.Add("@ArtTypeID", item.ArtTypeID);
            Param.Add("@ArtSubTypeID", item.ArtSubTypeID);
            Param.Add("@ProtocolID", item.ProtocolID);
            Param.Add("@SourceOfSpermID", item.SourceOfSpermID);
            Param.Add("@DonorSpermCollMethodID", item.DonorSpermCollMethodID);
            Param.Add("@PartnrSpermCollMethodID", item.PartnrSpermCollMethodID);
            Param.Add("@StimlnDrugID", item.StimlnDrugID);
            Param.Add("@LMP", item.LMP);
            Param.Add("@SelectedIndicationID", item.SelectedIndication);
            Param.Add("@SelectedDrugsID", item.SelectedDrugs);
            Param.Add("@CycleWarning", item.CycleWarning);
            Param.Add("@Remark", item.Remark);
            Param.Add("@DonorID", item.DonorID);
            Param.Add("@DonorUnitID", item.DonorUnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure);
            Status = Param.Get<Int32>("@ResultStatus");
            return Status;
        }
        public int SavePAC(PACDetails PACDetails)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@UserID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientID", PACDetails.PatientID);
            Param.Add("@PatientUnitID", PACDetails.FemalePatientUnitID);
            Param.Add("@TherapyID", PACDetails.TherapyID);
            Param.Add("@TherapyUnitID", PACDetails.TherapyUnitID);
            Param.Add("@PACDate", PACDetails.PACDate);
            Param.Add("@Time", PACDetails.Time);
            Param.Add("@Consent", PACDetails.Consent);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            if (PACDetails.ConsentDOC != null)
            {
                Param.Add("@ConsentDOC", System.Text.Encoding.UTF8.GetBytes(PACDetails.ConsentDOC));
            }
            if(PACDetails.ReportDOC!=null)
            {
               Param.Add("@ReportDOC", System.Text.Encoding.UTF8.GetBytes(PACDetails.ReportDOC));
            }
           
            this.con.Query<int>(GenericSP.AddUpdatePAC, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            Status = Param.Get<Int32>("@ResultStatus");
            return Status;
        }
        public int UpdatePAC(int ID, int UnitID, bool IsPAC)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "UpdatePAC");
            Param.Add("@ID", ID);
            Param.Add("@UnitID", UnitID);
            Param.Add("@IsPAC", IsPAC);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            Status = Param.Get<Int32>("@ResultStatus");
            return Status;
        }
        public List<ARTCycleVO> GetARTCycleList(long PatientID,  long UnitID, long PatientUnitID)   // Added sujats for cross clnic unitid maintain        
        {
            var Param = new DynamicParameters();
            //Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@PatientId", PatientID);
            Param.Add("@UnitID", UnitID); 
            Param.Add("@PatientUnitID", PatientUnitID);  // Added sujats for cross clnic unitid maintain
           
            return this.con.Query<ARTCycleVO>(GenericSP.GetARTCycleList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public long newCyclebtnFlag(long PatientID, long UnitID)
        {
            var Param = new DynamicParameters();
            //Param.Add("@UnitID", UnitID);   //commented sujata
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);  //added sujata
            Param.Add("@PatientId", PatientID);
            return this.con.Query<long>(GenericSP.newCyclebtnFlag, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public string GetLatestLMPDate()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetLatestLMPDate");
            Param.Add("@ID", 0);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<string>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public MedicalHistory GetMedicalHistory()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetMedicalHistory");
            Param.Add("@ID", 0);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<MedicalHistory>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public NewARTVO GetCycleOverview()

        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCycleOverview");
            Param.Add("@ID", 0);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            //List<NewARTVO> lstART = new List<NewARTVO>();           
            return this.con.Query<NewARTVO>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            //string value = ConfigurationManager.AppSettings["MarkSurrogate"].ToString();
            //foreach (NewARTVO item in lstART)
            //{
            //    lstART[0].IsMarkSurrogate = value;
            //}
            //return lstART;

        }
        public List<InvestigationVo> GetInvestigations()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetInvestigationAndProcedure");
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            //   Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<InvestigationVo>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PIVF.Entities.Models.EMR.Prescription.DrugVO> GetPrescription()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPrescription");
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@CoupleUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID); //@CoupleUnitID used for therapyunitid
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.Entities.Models.EMR.Prescription.DrugVO>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PIVF.BusinessLayer.NewART.BirthDetails> GetBirthDetails()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetBirthDetails");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            //  Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.BusinessLayer.NewART.BirthDetails>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public PIVF.BusinessLayer.NewART.StimulationDetails GetStimulationDetails()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetStimulationDetails");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            //  Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.BusinessLayer.NewART.StimulationDetails>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public PIVF.BusinessLayer.NewART.OPUDetails GetOPUDetails()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetOPUDetails");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            //  Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.BusinessLayer.NewART.OPUDetails>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public PIVF.BusinessLayer.NewART.TriggerDetails GetTriggerDetails()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetTriggerDetails");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            //  Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.BusinessLayer.NewART.TriggerDetails>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public List<PIVF.BusinessLayer.NewART.OutcomeDetails> GetOutcomeDetails()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetOutcomeDetails");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            //  Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.BusinessLayer.NewART.OutcomeDetails>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<PIVF.BusinessLayer.NewART.ETDetails> GetETDetails()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetEmbryoTransferDetails");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            //  Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.BusinessLayer.NewART.ETDetails>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public int CloseCycle(int ID, int UnitID)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "CloseCycle");
            Param.Add("@UnitID", UnitID);
            Param.Add("@ID", ID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.AddUpdateNewART, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            Status = Param.Get<Int32>("@ResultStatus");
            return Status;
        }
        public PACDetails GetPAC(long PatientID, long FemalePatientUnitID, long TherapyID, long TherapyUnitID)
        {
                
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID);
            Param.Add("@FemalePatientUnitID", FemalePatientUnitID);
            Param.Add("@TherapyID", TherapyID);
            Param.Add("@TherapyUnitID", TherapyUnitID);
            var PACDetails = this.con.Query<PACDetails>(GenericSP.GetPAC, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            if (PACDetails != null)
            {
                if (PACDetails.ConsentDOCByte != null)
                    PACDetails.ConsentDOC = System.Text.Encoding.UTF8.GetString(PACDetails.ConsentDOCByte);
                if (PACDetails.ReportDOCByte != null)
                    PACDetails.ReportDOC = System.Text.Encoding.UTF8.GetString(PACDetails.ReportDOCByte);
            }
            return PACDetails;
        }
    }
}
