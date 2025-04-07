using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.IPD;
using PIVF.Entities.Models.IPD;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.IPD
{
    public class IPDDAL : IPDBAL
    {
        private Database dbServer = null;
        IDbConnection con;

        public IPDDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }


        public long SaveNewAdmission(IPDVO obj)
        {
            long ID;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@Date", obj.Date);
                Param.Add("@Time", obj.Time);
                Param.Add("@PatientID", obj.PatientID);
                Param.Add("@PatientUnitID", obj.PatientUnitID);
                Param.Add("@AdmissionType", obj.AdmissionType);
                Param.Add("@IPDNO", obj.IPDNO);
                Param.Add("@DepartmentID", obj.DepartmentID);
                Param.Add("@DoctorID", obj.DoctorID);
                Param.Add("@ClassID", obj.ClassID);
                Param.Add("@WardID", obj.WardID);
                Param.Add("@BedID", obj.BedID);
                Param.Add("@IsCancel", obj.IsCancel);
                Param.Add("@IsDischarged", obj.IsDischarged);
                Param.Add("@Remark", obj.Remark);
                Param.Add("@Status", obj.Status);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedDateTime", DateTime.UtcNow);
                Param.Add("@ID", 0, DbType.Int64, ParameterDirection.Output);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Execute(GenericSP.AddUpdateClassMaster, Param, commandType: CommandType.StoredProcedure);
                ID = Param.Get<Int64>("@ID");
                long Result = Param.Get<Int64>("@ResultStatus");

                return ID;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public List<GetMasterList> GetClassMasterList()
        {
            List<GetMasterList> List = new List<GetMasterList>();
            List = this.con.Query<GetMasterList>(GenericSP.GetClassMasterList, commandType: CommandType.StoredProcedure).ToList();
            if (List != null && List.Count > 0)
            {
                List[0].TotalCount = List.Count;
            }
            return List;
        }

        public List<GetMasterList> GetWardMasterList()
        {
            List<GetMasterList> List = new List<GetMasterList>();
            List = this.con.Query<GetMasterList>(GenericSP.GetWardMasterList, commandType: CommandType.StoredProcedure).ToList();
            if (List != null && List.Count > 0)
            {
                List[0].TotalCount = List.Count;
            }
            return List;
        }

        public List<GetMasterList> GetBedMasterList(long ClassID, long WardID)
        {
            List<GetMasterList> List = new List<GetMasterList>();
            var Param = new DynamicParameters();
            Param.Add("@ClassID", ClassID);
            Param.Add("@WardID", WardID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            List = this.con.Query<GetMasterList>(GenericSP.GetBedMasterList, Param, commandType: CommandType.StoredProcedure).ToList();
            if (List != null && List.Count > 0)
            {
                List[0].TotalCount = List.Count;
            }
            return List;
        }

        public long AddUpdateClassMaster(AddIPDMaster obj)
        {
            long ID;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@Code", obj.Code);
                Param.Add("@Description", obj.Description);
                Param.Add("@Status", obj.Status);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedDateTime", DateTime.UtcNow);
                Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@UpdatedOn", Environment.MachineName);
                Param.Add("@UpdatedDateTime", DateTime.UtcNow);
                if (obj.ID > 0)
                {
                    Param.Add("@ClassID", obj.ID);
                }
                else
                {
                    Param.Add("@ClassID", 0, DbType.Int64, ParameterDirection.Output);
                }
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Execute(GenericSP.AddUpdateClassMaster, Param, commandType: CommandType.StoredProcedure);
                ID = Param.Get<Int64>("@ClassID");
                long Result = Param.Get<Int64>("@ResultStatus");

                return ID;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public long AddUpdateWardMaster(AddIPDMaster obj)
        {
            long ID;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@Code", obj.Code);
                Param.Add("@Description", obj.Description);
                Param.Add("@Status", obj.Status);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedDateTime", DateTime.UtcNow);
                Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@UpdatedOn", Environment.MachineName);
                Param.Add("@UpdatedDateTime", DateTime.UtcNow);
                if (obj.ID > 0)
                {
                    Param.Add("@WardID", obj.ID);
                }
                else
                {
                    Param.Add("@WardID", 0, DbType.Int64, ParameterDirection.Output);
                }
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Execute(GenericSP.AddUpdateWardMaster, Param, commandType: CommandType.StoredProcedure);
                ID = Param.Get<Int64>("@WardID");
                long Result = Param.Get<Int64>("@ResultStatus");

                return ID;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public long AddUpdateBedMaster(AddIPDMaster obj)
        {
            long ID;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@Code", obj.Code);
                Param.Add("@Description", obj.Description);
                Param.Add("@ClassId", obj.ClassID);
                Param.Add("@WardId", obj.WardID);
                Param.Add("@Status", obj.Status);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedDateTime", DateTime.UtcNow);
                Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@UpdatedOn", Environment.MachineName);
                Param.Add("@UpdatedDateTime", DateTime.UtcNow);
                if (obj.ID > 0)
                {
                    Param.Add("@BedID", obj.ID);
                }
                else
                {
                    Param.Add("@BedID", 0, DbType.Int64, ParameterDirection.Output);
                }
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Execute(GenericSP.AddUpdateBedMaster, Param, commandType: CommandType.StoredProcedure);
                ID = Param.Get<Int64>("@BedID");
                long Result = Param.Get<Int64>("@ResultStatus");

                return ID;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public List<GetMasterList> GetAdmissionTypeMasterList()
        {
            List<GetMasterList> List = new List<GetMasterList>();
            List = this.con.Query<GetMasterList>(GenericSP.GetAdmissionTypeMasterList, commandType: CommandType.StoredProcedure).ToList();

            return List;
        }

        public List<IPDPatientList> GetIPDPatientList(DateTime? FromDate, DateTime? ToDate, long? DoctorID, long? ClassID, long? WardID, bool? IsCurrentAdmitted, string FirstName = null, string LastName = null, string MRNo = null, string OldRegID = null)
        {
            List<IPDPatientList> List = new List<IPDPatientList>();
            var Param = new DynamicParameters();
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@DoctorID", DoctorID);
            Param.Add("@ClassID", ClassID);
            Param.Add("@WardID", WardID);
            Param.Add("@IsCurrentAdmitted", IsCurrentAdmitted);
            Param.Add("@FirstName", FirstName);
            Param.Add("@LastName", LastName);
            Param.Add("@MRNo", MRNo);
            Param.Add("@OldRegID", OldRegID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            List = this.con.Query<IPDPatientList>(GenericSP.GetIPDPatientList, Param, commandType: CommandType.StoredProcedure).ToList();

            if (List != null && List.Count > 0)
            {
                List[0].TotalCount = List.Count;
            }

            return List;
        }


        public int CancelAdmission(long AdmissionID, string CancelReason)
        {

            try
            {
                var Param = new DynamicParameters();
                Param.Add("@AdmissionID", AdmissionID);
                Param.Add("@CancelReason", CancelReason);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Execute(GenericSP.CancelAdmission, Param, commandType: CommandType.StoredProcedure);
                int Result = Param.Get<Int32>("@ResultStatus");

                return Result;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }


        public int DeleteMasterForIPD(long ID, string Master = null)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@Master", Master);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.con.Execute(GenericSP.DeleteMasterForIPD, Param, commandType: CommandType.StoredProcedure);
                int Result = Param.Get<Int32>("@ResultStatus");

                return Result;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public List<GetMasterList> GetDischargeTypeMasterList()
        {
            List<GetMasterList> List = new List<GetMasterList>();
            List = this.con.Query<GetMasterList>(GenericSP.GetDischargeTypeMasterList, commandType: CommandType.StoredProcedure).ToList();

            return List;
        }

        public List<GetMasterList> GetDischargeDestinationMasterList()
        {
            List<GetMasterList> List = new List<GetMasterList>();
            List = this.con.Query<GetMasterList>(GenericSP.GetDischargeDestinationMasterList, commandType: CommandType.StoredProcedure).ToList();

            return List;
        }

        public AdmissionDetails GetAdmissionDetailsForDischarge(long? AdmissionID, string MRNo = null)
        {

            AdmissionDetails res = new AdmissionDetails();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AdmissionID", AdmissionID);
            Param.Add("@MRNo", MRNo);
            res = con.QueryFirstOrDefault<AdmissionDetails>(GenericSP.GetAdmissionDetailsForDischarge, Param, commandType: CommandType.StoredProcedure);

            return res;
        }

    }
}

