using Dapper;
using DataBaseConfiguration;
using PIVF.BusinessLayer.EMR.FemaleHistory;
using PIVF.Entities.Models.EMR.FemaleHistory;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.EMR.FemaleHistory
{
    public class CorpusLeteumScanDAL : CorpusLeteumScanBAL
    {
        private Microsoft.Practices.EnterpriseLibrary.Data.Database dbServer = null;
        IDbConnection con;
        public CorpusLeteumScanDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int SaveOrUpdateCLScan(CorpusLeteumScan obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", obj.ID);
            Param.Add("@UnitID", obj.UnitID == null ? 0 : Convert.ToInt32(obj.UnitID));
            Param.Add("@CLSPatientID", obj.CLSPatientID == null ? 0 : Convert.ToInt32(obj.CLSPatientID));
            Param.Add("@CLSUserID", obj.CLSUserID == null ? 0 : Convert.ToInt32(obj.CLSUserID));
            Param.Add("@TherapyId", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@CorpusLeteumScanDate", Convert.ToDateTime(obj.CorpusLeteumScanDate));
            Param.Add("@TVS1", obj.TVS1);
            Param.Add("@TVS2", obj.TVS2);
            Param.Add("@TVS3", obj.TVS3);
            Param.Add("@VCD", obj.VCD);
            Param.Add("@RIRight", obj.RIRight);
            Param.Add("@RILeft", obj.RILeft);
            Param.Add("@PIRight", obj.PIRight);
            Param.Add("@PILeft", obj.PILeft);
            Param.Add("@PSVRight", obj.PSVRight);
            Param.Add("@PSVLeft", obj.PSVLeft);
            Param.Add("@CorpusLeteumScanComment",obj.CorpusLeteumScanComment);
            Param.Add("@IsFinalize", obj.IsFinalize);
            Param.Add("@CycleDay", obj.CycleDay);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
            //Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
            //Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            //Param.Add("@AddedOn", Environment.MachineName);
            //Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@Cyclecode", obj.Cyclecode);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);     

             this.con.Query<int>(GenericSP.InsertCorpusLeteumScan, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

            return Param.Get<int>("@ResultStatus");
        }

        public List<CorpusLeteumScan> LoadPreviousCorpusLeteumScanData()
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
            return this.con.Query<CorpusLeteumScan>(GenericSP.GetPreviousCorpusLeteumScanData, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public CorpusLeteumScan GetSingleCLScan(int ID) 
        {
            CorpusLeteumScan obj = new CorpusLeteumScan();
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
            Param.Add("@ID", ID);
            var QueryMultiple = this.con.QueryMultiple(GenericSP.GetSingleCLScan, Param, commandType: CommandType.StoredProcedure);
            obj = QueryMultiple.Read<CorpusLeteumScan>().SingleOrDefault();//obj = QueryMultiple.Read<FollicularScan>().SingleOrDefault();
            //obj.ListItem = QueryMultiple.Read<SizeDetails>().ToList(); 
            //obj.FollicularDetails = new SurgivalOther();
            //obj.FollicularDetails.model = new List<model>();
            //obj.FollicularDetails.model = QueryMultiple.Read<model>().ToList();
            //obj.FollicularScanImages = new List<Entities.Models.EMR.model>();

             return obj;
        }

        public List<CommanEntity> LoadCycleCodeList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCycleCodeList");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }



    }
}
