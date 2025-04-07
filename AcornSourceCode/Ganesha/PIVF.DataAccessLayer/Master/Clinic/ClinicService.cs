//using PIVF.Gemino.BusinessLayer.Master.Clinic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using PIVF.Gemino.Entities.Models.Master.Clinic;

using Dapper;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using DataBaseConfiguration;
using PIVF.BusinessLayer.Master.Clinic;
using PIVF.Entities.Models.Master.Clinic;

//namespace PIVF.Gemino.DataAccessLayer.Master.Clinic
namespace PIVF.DataAccessLayer.Master.Clinic
{
    public class ClinicService : IClinicService
    {
        private Database dbServer = null;
        IDbConnection Con;
        public ClinicService()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        public List<ClinicMaster> GetClinicListForLandingPage(ClinicMaster obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetUnitList");
            Param.Add("@Code", obj.Code);
            Param.Add("@Description", obj.Description);
            Param.Add("@PageIndex", obj.Pgindx);
            Param.Add("@UnitID", obj.UnitID);
            Param.Add("@PagingEnabled", obj.IsPagingEnable);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<ClinicMaster> tmpLst = new List<ClinicMaster>();

            var MultiQuery = this.Con.QueryMultiple(GenericSP.ClinicMaster, Param, commandType: CommandType.StoredProcedure);
            tmpLst = MultiQuery.Read<ClinicMaster>().ToList();

            // tmpLst = this.Con.DapCon.Query<ClinicMaster>(GenericSP.TariffMaster, Param, commandType: CommandType.StoredProcedure).AsList();
            if (tmpLst.Count > 0)
                tmpLst[0].TotalCount = Param.Get<int>("@TotalCount");
            return tmpLst;
        }

        public int Modify(ClinicMaster obj)
        {
            int Status = 0;
            var Param = new DynamicParameters();

            Param.Add("@Action", "ModifyClinic");
            Param.Add("@UnitID", obj.UnitID);
            Param.Add("@Code", obj.Code);
            Param.Add("@Description", obj.Description);
            Param.Add("@Status", obj.Status);
            Param.Add("@ResiSTDCode", obj.ResiSTDCode);
            Param.Add("@ContactNo", obj.ContactNo);
            Param.Add("@MobileCountryCode", obj.MobileCountryCode);
            Param.Add("@MobileNO", obj.MobileNO);
            Param.Add("@Email", obj.Email);
            Param.Add("@AddressLine1", obj.AddressLine1);
            Param.Add("@AddressLine2", obj.AddressLine2);
            Param.Add("@AddressLine3", obj.AddressLine3);
            Param.Add("@CountryID", obj.CountryID);
            Param.Add("@StateID", obj.StateID);
            Param.Add("@CityID", obj.CityID);
            Param.Add("@PinCode", obj.PinCode);
            Param.Add("@DatabaseName", obj.DatabaseName);
            Param.Add("@ClusterID", obj.ClusterID);
            Param.Add("@GSTNNo", obj.GSTNNo);
            Param.Add("@PharmacyLicenseNo", obj.PharmacyLicenseNo);
            Param.Add("@FaxNo", obj.FaxNo);
            Param.Add("@Area", obj.Area);
            Param.Add("@CINNo", obj.CINNo);
            Param.Add("@PanNo", obj.PanNo);
            Param.Add("@Reason", obj.Reason);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.Con.Query<string>(GenericSP.ClinicMaster, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            Status = Param.Get<Int32>("@ResultStatus");

            if (obj.DepartmentList.Count > 0)
            {
                var Param2 = new DynamicParameters();
                Param2.Add("@Action", "UpdateDepartmentUnit");
                Param2.Add("@UnitID", obj.UnitID);
                Param2.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                this.Con.Query<string>(GenericSP.ClinicMaster, Param2, commandType: CommandType.StoredProcedure);
                Status = Param2.Get<Int32>("@ResultStatus");


                foreach (var item in obj.DepartmentList)
                {
                    var Param1 = new DynamicParameters();
                    Param1.Add("@Action", "UpdateDepartmentForClinic");
                    Param1.Add("@UnitID", obj.UnitID);
                    Param1.Add("@DeptID", item.DeptID);
                    Param1.Add("@IsActive", Convert.ToBoolean(item.IsActive));

                    Param1.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param1.Add("@UpdatedBy", GenericSP.CurrentUser.UnitID);
                    Param1.Add("@UpdatedOn", Environment.MachineName);
                    Param1.Add("@UpdatedWindowsLoginName", Environment.UserName);
                    Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    this.Con.Query<string>(GenericSP.ClinicMaster, Param1, commandType: CommandType.StoredProcedure);
                    Status = Param1.Get<Int32>("@ResultStatus");
                }
            }
            return Status;
        }

        public int ActivateDeactivateClinic(string[] Clinic)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "ActivateDeactivateClinic");
            Param.Add("@UnitID", Convert.ToInt32(Clinic[0]));
            Param.Add("@Status", Convert.ToBoolean(Clinic[1]));
            Param.Add("@Reason", Clinic[2]);

            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.Con.Query<string>(GenericSP.ClinicMaster, Param, commandType: CommandType.StoredProcedure);
            return Status = Param.Get<Int32>("@ResultStatus");

            //this.con.DapCon.Query<int>(GenericSP.TariffMaster, Param, commandType: CommandType.StoredProcedure);

        }

        public List<DepartmentList> GetDepartmentListForUnit(int UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDepartmentUnitList");
            Param.Add("@UnitID", UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<DepartmentList> tmpLst = new List<DepartmentList>();

            var MultiQuery = this.Con.QueryMultiple(GenericSP.ClinicMaster, Param, commandType: CommandType.StoredProcedure);
            tmpLst = MultiQuery.Read<DepartmentList>().ToList();

            // tmpLst = this.Con.DapCon.Query<ClinicMaster>(GenericSP.TariffMaster, Param, commandType: CommandType.StoredProcedure).AsList();
            //if (tmpLst.Count > 0)
            //    tmpLst[0].TotalCount = Param.Get<int>("@TotalCount");
            return tmpLst;
        }
    }
}
