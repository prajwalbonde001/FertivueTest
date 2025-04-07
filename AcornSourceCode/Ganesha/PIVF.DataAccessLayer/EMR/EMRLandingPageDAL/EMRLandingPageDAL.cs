using PIVF.BusinessLayer.EMR.LandingPage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR.LandingPage;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;

namespace PIVF.DataAccessLayer.EMR.EMRLandingPageDAL
{
    public class EMRLandingPageDAL : EMRLandingPageBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public EMRLandingPageDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public EMRLandingPageVO GetEMRLandingPageData(int PatientID, int UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "EMRDashboardData");
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
            var multi = con.QueryMultiple(GenericSP.GetEMRLandingPageData, Param, null, null, CommandType.StoredProcedure);
            EMRLandingPageVO obj = new EMRLandingPageVO();
            obj.IsFollowupPatient = multi.ReadFirstOrDefault<bool>();
            obj.lstPrescription = multi.Read<EMRLandingPagePrescriptionVO>().ToList();
            obj.lstDiagnosis = multi.Read<EMRLandingDiagnosisVO>().ToList();
            obj.lstInvestigation = multi.Read<EMRLandingInvestigationVO>().ToList();
            obj.lstCC = multi.Read<EMRLandingCCVO>().ToList();
            obj.lstHistory = multi.Read<EMRLandingHistory>().ToList();
            obj.Allergy = GetGlobalData();
            return obj;
        }

        public string GetGlobalData()
        {
            var Param1 = new DynamicParameters();
            Param1.Add("@Action", "GetGlobalData");
            Param1.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param1.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            string Allergy = con.Query<string>(GenericSP.GetEMRLandingPageData, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Allergy;
        }
    }
}
