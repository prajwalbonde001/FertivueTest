using PIVF.BusinessLayer.EMR.Investigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.Master.IVF;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.Entities.Models.EMR.Investigation;
using System.Configuration;

namespace PIVF.DataAccessLayer.EMR.Investigation
{
    public class InvestigationDAL : InvestigationBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public InvestigationDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<ServiceMasterVO> GetCatwiseServiceList(int CatID, int? GenderID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCatwiseServiceList");
            Param.Add("@CategoryID", CatID);
            Param.Add("@GenderID", GenderID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            //      Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);             
            List<ServiceMasterVO> lstSrvMaster = new List<ServiceMasterVO>();
            lstSrvMaster = this.con.Query<ServiceMasterVO>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).ToList();
            string value = ConfigurationManager.AppSettings["LinkSurrogateInvestigation"].ToString();
            foreach (ServiceMasterVO item in lstSrvMaster)
            {
                lstSrvMaster[0].IsMarkSurrogate = value;
            }
            return lstSrvMaster;

        }
        public int SaveInvestigation(DataTable dt)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "SaveInvestigation");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
            Param.Add("@DoctorID", GenericSP.CurrentUser.UserID);
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            //Param.Add("@IsMarkSurrogate", GenericSP.SelectedPatient.IsMarkSurrogate);
           // Param.Add("@IsMarkDonor", GenericSP.SelectedPatient.IsMarkDonor);
            if (GenericSP.SelectedCouple.FemalePatient.TherapyID >0)
            {
                Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                Param.Add("@GenderID", GenericSP.SelectedCouple.FemalePatient.GenderID);
            }
            else
            {
                Param.Add("@TherapyID", 0);
                Param.Add("@TherapyUnitID", 0);
                Param.Add("@GenderID", GenericSP.SelectedPatient.GenderID);
            }
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@Investigation", dt.AsTableValuedParameter());
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<int>("@ResultStatus");
        }

        public List<InvestigationVo> GetPreviousInvestigation(int idx,int CatID, string para)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPreviousInvestigation");
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@DoctorID", GenericSP.CurrentUser.UserID);
            Param.Add("@PageIndex", idx);
            Param.Add("@CategoryID", CatID);
            Param.Add("@ResultName", para);
            //      Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<InvestigationVo>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<InvestigationVo> GetTodaysInvestigation(int CatID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetTodaysInvestigation");
            //if (GenericSP.SelectedCouple.FemalePatient != null && GenericSP.SelectedCouple.FemalePatient.TherapyID > 0)
            //{
            //    Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            //    Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            //}
            //else
            //{
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
        //  }
            Param.Add("@DoctorID", GenericSP.CurrentUser.UserID);
            Param.Add("@CategoryID", CatID);
            //      Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<InvestigationVo>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public int DeleteSavedService(int ID, int UnitID, string reason)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "DeleteSavedService");
            Param.Add("@ID", ID);
            Param.Add("@UnitID", UnitID);
            Param.Add("@Reason", reason);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<int>("@ResultStatus");
        }

        public int SetFavouriteInvestigation(InvestigationVo obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "SaveSingleFavourite");
            Param.Add("@ServiceID", obj.ServiceID);
            Param.Add("@ServiceCode", obj.ServiceCode);
            Param.Add("@Service", obj.Service);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@CategoryID", obj.CategoryID);
            Param.Add("@Template", obj.Template);
            Param.Add("@TemplateID", obj.TemplateID);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<int>("@ResultStatus");
        }

        public int UploadReport(InvestigationVo obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "UploadReport");
            Param.Add("@InvestigationID", obj.ID);
            Param.Add("@UnitID", obj.UnitID);
            if (!string.IsNullOrEmpty(Convert.ToString(obj.strReport)))
            {
                obj.Report = System.Text.Encoding.UTF8.GetBytes(obj.strReport);
            }
            Param.Add("@Report", obj.Report);
            Param.Add("@ResultName", obj.DocName);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<int>("@ResultStatus");
        }

        public PIVF.BusinessLayer.ARTMgmt.ReportUpload.tmpReport ViewReport(int InvID, int UnitID)
        {
            PIVF.BusinessLayer.ARTMgmt.ReportUpload.tmpReport tmpobj = new PIVF.BusinessLayer.ARTMgmt.ReportUpload.tmpReport();
            var Param = new DynamicParameters();
            Param.Add("@Action", "ViewReport");
            Param.Add("@InvestigationID", InvID);
            Param.Add("@UnitID", UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            tmpobj = this.con.Query<PIVF.BusinessLayer.ARTMgmt.ReportUpload.tmpReport>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            if (tmpobj != null)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(tmpobj.Report)))
                {
                    tmpobj.strReport = System.Text.Encoding.UTF8.GetString(tmpobj.Report);
                }
            }
            return tmpobj;
        }

        public int LinkDonor(int [] IDs)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "LinkDonor");
            Param.Add("@InvestigationID", IDs[0]);
            Param.Add("@UnitID", IDs[1]);
            Param.Add("@PatientID", IDs[2]);  //donorid
            Param.Add("@PatientUnitID", IDs[3]); //donorunitid
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<int>("@ResultStatus");
        }

        public int SaveFavourite(DataTable dt)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "SaveFavourite");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@Favourite", dt.AsTableValuedParameter());
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<int>("@ResultStatus");
        }

        public TemplateVo GetFavouriteList(int idx, string param)
        {
            TemplateVo objtmp = new TemplateVo();
            objtmp.lsttmp = new List<TemplateVo>();
            objtmp.lstService = new List<ServiceMasterVO>();
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetfavouriteList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@DoctorID", GenericSP.CurrentUser.UserID);
            Param.Add("@PageIndex", idx);
            Param.Add("@ResultName", param);
            var multi=this.con.QueryMultiple(GenericSP.Investigation, Param, commandType: CommandType.StoredProcedure);
            objtmp.lsttmp = multi.Read<TemplateVo>().ToList();
            objtmp.lstService = multi.Read<ServiceMasterVO>().ToList();
            return objtmp;
        }

        //public List<ArtsubType> GetArtsubTypeList(int CatID)
        //{
        //    var Param = new DynamicParameters();
        //    Param.Add("@Action", "GetAllArtSubTypeList");
        //    Param.Add("@ID", CatID);
        //  //  Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
        //    //      Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //    return this.con.Query<ArtsubType>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        //}
    }
}
