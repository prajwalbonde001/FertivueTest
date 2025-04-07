using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.EMR.FemaleHistory;
using PIVF.Entities.Models.EMR.FemaleHistory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.EMR.FemaleHistory
{
    public class FemaleComplaintsDAL : FemaleComplaintsBL
    {
        private Microsoft.Practices.EnterpriseLibrary.Data.Database dbServer = null;
        IDbConnection con;
        public FemaleComplaintsDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public List<FemaleComplaints> PreviousFollowUpNotes()
        {
            List<FemaleComplaints> lst = new List<FemaleComplaints>();
            List<ComplaintDetails> lstComp = new List<ComplaintDetails>();
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPreviousFollowUpDetails");
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID); 
            //return this.con.Query<FemaleComplaints>(GenericSP.GetPreviousFollowUpDetails, Param, commandType: CommandType.StoredProcedure).AsList();
            var multi = this.con.QueryMultiple(GenericSP.GetPreviousFollowUpDetails, Param, commandType: CommandType.StoredProcedure);
            lst = multi.Read<FemaleComplaints>().ToList();
            lstComp = multi.Read<ComplaintDetails>().ToList();
            foreach (FemaleComplaints i in lst)
            {
                i.lstCompDetails = new List<ComplaintDetails>();
                foreach (ComplaintDetails j in lstComp)
                {
                    if (i.FCID == j.CompID)
                    {
                        i.lstCompDetails.Add(j);
                    }
                }
            }
            return lst;
        }

        public DateTime? GetLatestLMP()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetLatestLMP");
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            return this.con.Query<DateTime?>(GenericSP.GetPreviousFollowUpDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public int InsertFemaleComplaints(FemaleComplaints obj)
        {
            int CID = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "InsertComplaints");
            Param.Add("@FCID", obj.FCID);
            Param.Add("@UnitID", obj.UnitID == null ? 0 : Convert.ToInt32(obj.UnitID));
            Param.Add("@FCPatientID", obj.FCPatientID == null ? 0 : Convert.ToInt32(obj.FCPatientID));
            Param.Add("@FCUserID", obj.FCUserID == null ? 0 : Convert.ToInt32(obj.FCUserID));
            Param.Add("@PresentingComplaintsIDs", obj.PresentingComplaintsSelected.Count() == 0 ? null : obj.PresentingComplaints = string.Join(",", obj.PresentingComplaintsSelected.Select(a => a.id)));
            Param.Add("@LMPDate", obj.LMPDate);
            Param.Add("@FollowUpNotes", obj.FollowUpNotes);
            Param.Add("@CaseSummary", obj.CaseSummary);
            Param.Add("@NFUpDate", obj.NFUpDate);
            Param.Add("@Reason", obj.Reason);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
            Param.Add("@OtherComplaints", obj.OtherComplaints);
            Param.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            Param.Add("@CID", dbType: DbType.Int32, direction: ParameterDirection.Output, value: int.MaxValue);
            try
            {
                con.Execute(GenericSP.InsertFemaleComplaints, Param, commandType: CommandType.StoredProcedure);
                string ResultStatus = Param.Get<string>("@ResultStatus");
                CID = obj.FCID > 0 ? obj.FCID : Param.Get<int>("@CID");
                if (Convert.ToInt32(ResultStatus) > 0)
                {
                    if (obj.FCID > 0)
                    {
                        var Para1 = new DynamicParameters();
                        Para1.Add("@Action", "DeleteComplaintDetails");
                        Para1.Add("@CompID", CID);
                        Para1.Add("@IsFemale", 1);
                        con.Execute(GenericSP.InsertFemaleComplaints, Para1, commandType: CommandType.StoredProcedure);
                    }
                    foreach (ComplaintDetails item in obj.lstCompDetails)
                    {
                        var Para = new DynamicParameters();
                        Para.Add("@Action", "InsertComplaintDetails");
                        Para.Add("@FCID", item.ID);
                        Para.Add("@CompID", CID);
                        Para.Add("@PreComID", item.PreComID);
                        Para.Add("@PreComplaint", item.PreComplaints.Replace("\r\n", ""));
                        Para.Add("@Day", item.Day);
                        Para.Add("@Month", item.Month);
                        Para.Add("@Year", item.Year);
                        Para.Add("@Onset", item.Onset);
                        Para.Add("@OtherComplaints", item.OtherComplaints);
                        Para.Add("@ModID", item.ModID);
                        Para.Add("@IsFemale", 1);
                        // Para.Add("@Day", item.CID);
                        //  Para.Add("@Day", item.CID);
                        con.Execute(GenericSP.InsertFemaleComplaints, Para, commandType: CommandType.StoredProcedure);
                    }
                }
                return Convert.ToInt32(ResultStatus);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public FemaleComplaints LoadSpecificFemaleComplaints()
        {
            FemaleComplaints obj = new FemaleComplaints();
            obj.lstCompDetails = new List<ComplaintDetails>();
            try
            {
                var param = new DynamicParameters();
                param.Add("@PatientID", GenericSP.SelectedPatient.ID);
               // param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID); //commented sujata cross clinic
                param.Add("@PatientUnitID", GenericSP.CurrentUser.UnitID); //added sujata cross clinic
                param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                var multi = this.con.QueryMultiple(GenericSP.GetSpecificFemaleComplaints, param, commandType: CommandType.StoredProcedure);
                obj = multi.Read<FemaleComplaints>().FirstOrDefault();
                if (obj != null)
                {
                    obj.lstCompDetails = multi.Read<ComplaintDetails>().ToList();
                }

                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
