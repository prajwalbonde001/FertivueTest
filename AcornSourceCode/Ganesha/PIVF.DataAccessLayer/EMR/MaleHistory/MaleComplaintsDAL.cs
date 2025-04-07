using PIVF.BusinessLayer.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR.MaleHistory;
using Dapper;
using System.Data;
using DataBaseConfiguration;
using PIVF.Entities.Models.EMR.FemaleHistory;

namespace PIVF.DataAccessLayer.EMR.MaleHistory
{
    public class MaleComplaintsDAL : MaleComplaintsBAL
    {
        private Microsoft.Practices.EnterpriseLibrary.Data.Database dbServer = null;
        IDbConnection con;
        public MaleComplaintsDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int InsertMaleComplaints(MaleComplaints obj)
        {
            var Param = new DynamicParameters();
            int CID = 0;
            Param.Add("@Action", "InsertComplaints");
            Param.Add("@MCID", obj.MCID);
            Param.Add("@UnitID", obj.UnitID == null ? 0 : Convert.ToInt32(obj.UnitID));
            Param.Add("@MCPatientID", obj.MCPatientID == null ? 0 : Convert.ToInt32(obj.MCPatientID));
            Param.Add("@MCUserID", obj.MCUserID == null ? 0 : Convert.ToInt32(obj.MCUserID));
            Param.Add("@PresentingComplaintsIDs", obj.PresentingComplaints == null || obj.PresentingComplaints=="" ? null : obj.PresentingComplaints = string.Join(",", obj.PresentingComplaintsSelected.Select(a => a.id)));
            Param.Add("@FollowUpNotes", obj.FollowUpNotes);
            Param.Add("@NFUpDate", obj.NFUpDate);
            Param.Add("@Reason", obj.Reason);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
            Param.Add("@OtherComplaints", obj.OtherComplaints);
            Param.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            Param.Add("@CID", dbType: DbType.Int32, direction: ParameterDirection.Output, value: int.MaxValue);
            try
            {
                con.Execute(GenericSP.InsertMaleComplaints, Param, commandType: CommandType.StoredProcedure);
                string ResultStatus = Param.Get<string>("@ResultStatus");
                CID = obj.MCID > 0 ? obj.MCID : Param.Get<int>("@CID");
                if (Convert.ToInt32(ResultStatus) > 0)
                {
                    if (obj.MCID > 0)
                    {
                        var Para1 = new DynamicParameters();
                        Para1.Add("@Action", "DeleteComplaintDetails");
                        Para1.Add("@CompID", CID);
                        Para1.Add("@IsFemale", 0);
                        con.Execute(GenericSP.InsertMaleComplaints, Para1, commandType: CommandType.StoredProcedure);
                    }
                    foreach (ComplaintDetails item in obj.lstCompDetails)
                    {
                        var Para = new DynamicParameters();
                        Para.Add("@Action", "InsertComplaintDetails");
                        Para.Add("@MCID", item.ID);
                        Para.Add("@CompID", CID);
                        Para.Add("@PreComID", item.PreComID);
                        Para.Add("@PreComplaint", item.PreComplaints.Replace("\r\n", ""));
                        Para.Add("@Day", item.Day);
                        Para.Add("@Month", item.Month);
                        Para.Add("@Year", item.Year);
                        Para.Add("@Onset", item.Onset);
                        Para.Add("@OtherComplaints", item.OtherComplaints);
                        Para.Add("@ModID", item.ModID);
                        Para.Add("@IsFemale", 0);
                        // Para.Add("@Day", item.CID);
                        //  Para.Add("@Day", item.CID);
                        con.Execute(GenericSP.InsertMaleComplaints, Para, commandType: CommandType.StoredProcedure);
                    }
                }
                return Convert.ToInt32(ResultStatus);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<MaleComplaints> PreviousFollowUpNotes()
        {
            List<MaleComplaints> lst = new List<MaleComplaints>();
            List<ComplaintDetails> lstComp = new List<ComplaintDetails>();
            var Param = new DynamicParameters();
            //  Param.Add("@Action", "GetPreviousFollowUpDetails");
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            // return this.con.Query<MaleComplaints>(GenericSP.GetMalePreviousFollowUpDetails, Param, commandType: CommandType.StoredProcedure).AsList();
            var multi = this.con.QueryMultiple(GenericSP.GetMalePreviousFollowUpDetails, Param, commandType: CommandType.StoredProcedure);
            lst = multi.Read<MaleComplaints>().ToList();
            lstComp = multi.Read<ComplaintDetails>().ToList();
            foreach (MaleComplaints i in lst)
            {
                i.lstCompDetails = new List<ComplaintDetails>();
                foreach (ComplaintDetails j in lstComp)
                {
                    if (i.MCID == j.CompID)
                    {
                        i.lstCompDetails.Add(j);
                    }
                }
            }
            return lst;
        }

        public MaleComplaints LoadSpecificMaleComplaints()
        {
            MaleComplaints obj = new MaleComplaints();
            obj.lstCompDetails = new List<ComplaintDetails>();
            try
            {
                var param = new DynamicParameters();
                param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                // return this.con.Query<MaleComplaints>(GenericSP.GetSpecificMaleComplaints, param, commandType: CommandType.StoredProcedure).SingleOrDefault();
                var multi = this.con.QueryMultiple(GenericSP.GetSpecificMaleComplaints, param, commandType: CommandType.StoredProcedure);
                obj = multi.Read<MaleComplaints>().FirstOrDefault();
                if (obj != null)
                    obj.lstCompDetails = multi.Read<ComplaintDetails>().ToList();
                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
