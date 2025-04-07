using PIVF.BusinessLayer.EMR.Vitals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR.Vitals;
using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using PIVF.Entities.Models.Patient;

namespace PIVF.DataAccessLayer.EMR.Vitals
{
    public class VitalsDAL : VitalsBAL
    {
        private Database dbServer = null;
        IDbConnection Con;
        public VitalsDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        //Save vitals
        public long SaveVitals(VitalsVO Data)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", Data.ID, DbType.Int64);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID, DbType.Int64);
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID, DbType.Int64);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID, DbType.Int64);
                Param.Add("@DoctorID", Data.DoctorID, DbType.Int64);
                Param.Add("@Date", DateTime.Now, DbType.DateTime);
                Param.Add("@Time", DateTime.Now, DbType.DateTime);
                Param.Add("@Weight", Data.Weight, DbType.Double);
                Param.Add("@Height", Data.Height, DbType.Double);
                Param.Add("@BMI", Data.BMI, DbType.Double);
                Param.Add("@BPSystolic", Data.BPSystolic, DbType.Double);
                Param.Add("@BPDiastolic", Data.BPDiastolic, DbType.Double);
                Param.Add("@HR", Data.HR, DbType.Double);
                Param.Add("@Temperature", Data.Temperature, DbType.Double);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                Param.Add("@AddedOn", Environment.MachineName, DbType.String);
                Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                Param.Add("@ResultStatus", 0, DbType.Int64, direction: ParameterDirection.Output);
                this.Con.Execute(GenericSP.SaveVitals, Param, commandType: CommandType.StoredProcedure);
                long ResultStatus = Param.Get<Int64>("@ResultStatus");
                return ResultStatus;
            }
            catch (Exception EX)
            {
                return 0;
            }
        }
        //Get Previous Vitals 
        public IEnumerable<VitalsVO> GetVitals(long PatientID, long UnitID, int PageIndex)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", UnitID, DbType.Int64);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@PageIndex", PageIndex, DbType.Int64);
            Param.Add("@TotalRows", DbType.Int64, direction: ParameterDirection.Output);
            List<VitalsVO> GetList = new List<VitalsVO>();
            GetList = Con.Query<VitalsVO>(GenericSP.GetVitalsList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (GetList.Count > 0)
                GetList[0].TotalRows = Param.Get<Int32>("@TotalRows");
            return GetList;
        }
        //Delete the Vitals 
        public long DeleteVitalsWithReason(long ID, long UnitID, string Reason)
        {
            try
            { 
            var Param = new DynamicParameters();
            Param.Add("@ID", ID, DbType.Int64);
            Param.Add("@UnitID", UnitID, DbType.Int64);
            Param.Add("@Reason", Reason, DbType.String);
            Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
            Param.Add("@AddedOn", Environment.MachineName, DbType.String);
            Param.Add("@ResultStatus", 0, DbType.Int64, direction: ParameterDirection.Output);
            this.Con.Execute(GenericSP.DeleteVitalsByID, Param, commandType: CommandType.StoredProcedure);
            long ResultStatus = Param.Get<Int64>("@ResultStatus");
            return ResultStatus;
            }
            catch(Exception ex)
            {
                return 0;
            }
        }
    }
}
