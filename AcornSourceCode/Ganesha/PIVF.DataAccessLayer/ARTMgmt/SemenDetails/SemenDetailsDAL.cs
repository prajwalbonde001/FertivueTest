using PIVF.BusinessLayer.ARTMgmt.SemenDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.ARTMgmt.SemenDetails;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.DataAccessLayer.Security;
using PIVF.Entities.Models.EMR.MaleHistory;
using PIVF.DataAccessLayer.EMR.MaleHistory;

namespace PIVF.DataAccessLayer.ARTMgmt.SemenDetails
{
    public class SemenDetailsDAL : SemenDetailsBAL
    {
        private Microsoft.Practices.EnterpriseLibrary.Data.Database dbServer = null;
        IDbConnection con;
        public SemenDetailsDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<PartnerSperm> LoadPartnerSpermiogramData(int PatientID,int PatientUnitID)
        {
            var Param = new DynamicParameters();
            if(PatientID == 0 && PatientUnitID == 0)            {
                Param.Add("@MaleId", GenericSP.SelectedCouple.MalePatient.MaleId);
                Param.Add("@MAleUnitID", GenericSP.SelectedCouple.MalePatient.MAleUnitID);
            }
            else            {
                Param.Add("@MaleId", PatientID);
                Param.Add("@MAleUnitID", PatientUnitID);
            }
            
            return this.con.Query<PartnerSperm>(GenericSP.GetAllPartnerSpermogram, Param, commandType: CommandType.StoredProcedure).ToList();
        }


        public List<MalePartnerSperm> LoadPartnerMaleSpermiogramData(int PatientID, int PatientUnitID)
        {
            var Param = new DynamicParameters();
            if (PatientID == 0 && PatientUnitID == 0)
            {
                Param.Add("@MaleId", GenericSP.SelectedCouple.MalePatient.MaleId);
                Param.Add("@MAleUnitID", GenericSP.SelectedCouple.MalePatient.MAleUnitID);
            }
            else
            {
                Param.Add("@MaleId", PatientID);
                Param.Add("@MAleUnitID", PatientUnitID);
            }

            return this.con.Query<MalePartnerSperm>(GenericSP.GetAllMalePartnerSpermogram, Param, commandType: CommandType.StoredProcedure).ToList();
        }


        public List<PartnerSperm> GetPartnerSpermiogramDataByMRNo(string MRNo)
        {
            var Param = new DynamicParameters();
            Param.Add("@MRNo", MRNo);
            return this.con.Query<PartnerSperm>(GenericSP.GetPartnerSpermiogramDataByMRNo, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<SemenDetailsVO> LoadDonorData(int SourceOfSpermID)
        {
            var Param = new DynamicParameters();
            Param.Add("@SourceOfSpermID", SourceOfSpermID);
            var Response= this.con.Query<SemenDetailsVO>(GenericSP.GetSemenDonorList, Param, commandType: CommandType.StoredProcedure).ToList();            
            return Response;
        }

        public List<SemenFreez> LoadDonorSpermiogram(string DonorCode)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@DonorCode", DonorCode);
            var Response = this.con.Query<SemenFreez>(GenericSP.GetSpermDonorList, Param, commandType: CommandType.StoredProcedure).ToList();
            return Response;
        }

        public SemenDetailsVO FetchPartnerPreparationAssesment(string SelectedSNo)
        {
            var Param = new DynamicParameters();
            Param.Add("@SelectedSNo", SelectedSNo);
            var Response = this.con.Query<SemenDetailsVO>(GenericSP.GetPartnerPreparationAssesmentData, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
            return Response;
        }

        public SemenDetailsVO LoadAllSemenDetailsData(int TherapyID, int TherapyUnitID, string SelectedTherapyCycleCode)
        {
            var Param = new DynamicParameters();
            Param.Add("@TherapyID", TherapyID);
            Param.Add("@TherapyUnitID", TherapyUnitID);
            Param.Add("@CycleCode", SelectedTherapyCycleCode);
            var Response = this.con.Query<SemenDetailsVO>(GenericSP.GetSemenDetailsData, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
            if (Response == null)
            {
                return new SemenDetailsVO();
            }
            else
            {
                return Response;
            }
        }


     

        public int SaveORUpdateSemenDetails(SemenDetailsVO obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", obj.ID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@CycleCode", obj.CycleCode);
            Param.Add("@SourceOfSpermID", obj.SourceOfSpermID);
            Param.Add("@SNo", obj.SNo);
            Param.Add("@IsPrtnerAsDonor", obj.IsPrtnerAsDonor);            
            Param.Add("@PartnerSpermiogramID", obj.PartnerSpermiogramID);
            Param.Add("@PartnerSpermiogramUnitID", obj.PartnerSpermiogramUnitID);
            Param.Add("@DonorAsPartnerSpermiogramID", obj.DonorAsPartnerSpermiogramID);
            Param.Add("@DonorAsPartnerSpermiogramUnitID", obj.DonorAsPartnerSpermiogramUnitID);
            Param.Add("@PartnerSpermPreparationMethodID", obj.PartnerSpermPreparationMethodID);
            Param.Add("@PartnerSpermPreparationMethodUnitID", obj.PartnerSpermPreparationMethodUnitID);
            Param.Add("@PartnerSpermPreparationMethod", obj.PartnerSpermPreparationMethod);
            Param.Add("@DonorSpermPreparationMethodID", obj.DonorSpermPreparationMethodID);
            Param.Add("@DonorSpermPreparationMethodUnitID", obj.DonorSpermPreparationMethodUnitID);
            Param.Add("@DonorSpermPreparationMethod", obj.DonorSpermPreparationMethod);
            Param.Add("@VolumePreWash", obj.VolumePreWash);
            Param.Add("@VolumePostWash", obj.VolumePostWash);
            Param.Add("@SPPreWash", obj.SPPreWash);
            Param.Add("@SPPostWash", obj.SPPostWash);
            Param.Add("@TCSPostWash", obj.TCSPostWash);
            Param.Add("@TCSPreWash", obj.TCSPreWash);
            Param.Add("@MotilityPreWash", obj.MotilityPreWash);
            Param.Add("@MotilityPostWash", obj.MotilityPostWash);
            Param.Add("@SelectedMRNoOrDonorID", obj.SelectedMRNoOrDonorID);
            Param.Add("@FinalDonorSpermioSRNo", obj.FinalDonorSpermioSRNo);
            Param.Add("@DonorMethodOfSperm", obj.DonorMethodOfSperm);
            Param.Add("@DonorVolumePreWash", obj.DonorVolumePreWash);
            Param.Add("@DonorVolumePostWash", obj.DonorVolumePostWash);
            Param.Add("@DonorSPPreWash", obj.DonorSPPreWash);
            Param.Add("@DonorSPPostWash", obj.DonorSPPostWash);
            Param.Add("@DonorTSCPreWash", obj.DonorTSCPreWash);
            Param.Add("@DonorTCSPostWash", obj.DonorTCSPostWash);
            Param.Add("@DonorMotilityPreWash", obj.DonorMotilityPreWash);
            Param.Add("@DonorMotilityPostWash", obj.DonorMotilityPostWash);            
            Param.Add("@SelectedMRNoOrDonorUnitID", obj.SelectedMRNoOrDonorUnitID);
            Param.Add("@SelectedMRNo", obj.SelectedMRNo);
            Param.Add("@SelectedDonorCode", obj.SelectedDonorCode);
            Param.Add("@IsFinalize", obj.IsFinalize);
            Param.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            try
            {
                con.Execute(GenericSP.InsertSemenDetails, Param, commandType: CommandType.StoredProcedure);
                string ResultStatus = Param.Get<string>("@ResultStatus");
                SemenThawingDAL OBJ = new SemenThawingDAL();
                OBJ.SaveUpdate(obj.ListFreezThawSamples);
                return Convert.ToInt32(ResultStatus);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
