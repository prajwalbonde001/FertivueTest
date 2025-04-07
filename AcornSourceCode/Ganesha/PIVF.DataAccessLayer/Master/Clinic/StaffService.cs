using Dapper;
using DataBaseConfiguration;
using PIVF.BusinessLayer.Master.Clinic;
using PIVF.Entities.Models.Master.Clinic;
//using PIVF.Gemino.BusinessLayer.Master.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
//using PIVF.Gemino.BusinessLayer.Master.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Repository.Pattern.Repositories;
using Repository.Pattern.Repositories;
using Service.Pattern;
//using PIVF.Gemino.Service.Pattern;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//namespace PIVF.Gemino.DataAccessLayer.Master.Clinic
namespace PIVF.DataAccessLayer.Master.Clinic
{
    public class StaffService : Service<Staff>, IStaffService
    {
        private readonly IRepositoryAsync<Staff> _repository;
        DapperConnection con = new DapperConnection();
        public StaffService(IRepositoryAsync<Staff> repository) : base(repository)
        {
            _repository = repository;
        }
        public List<Designation> GeDesignationList()
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", "DegID");
            Param.Add("@ASID", "DegID");
            Param.Add("@Description", "Description");
            Param.Add("@ASDescription", "Description");
            Param.Add("@tblName", "M_DesignationMaster");
            return this.con.DapCon.Query<Designation>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<Department> GetDepartmentListForStaff(int UID)
        {
            var Param = new DynamicParameters();

            Param.Add("@UnitID", UID);

            return this.con.DapCon.Query<Department>(GenericSP.GetDeptListForDoc, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public IQueryable<Staff> GetStaffList(int index, string N, int DptID, string mobno, int EID, int DegID, string Qua, string Exp, string EmailID, int MID, int GId, bool PgEn)
        {
            var Param = new DynamicParameters();
            Param.Add("@PageIndex", index);
            if (N != "")
                Param.Add("@Name", N);
            Param.Add("@DeptID", DptID);
            if (mobno != "")
                Param.Add("@mobno", mobno);
            Param.Add("@EID", EID);
            Param.Add("@Exp", Exp);
            if (EmailID != "")
                Param.Add("@Email", EmailID);

            Param.Add("@DegID", DegID);
            Param.Add("@Qualification", Qua);
            Param.Add("@MarryStatusID", MID);
            Param.Add("@GenderID", GId);
            Param.Add("@StaffID", 0);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PagingEnabled", PgEn);
            return this.con.DapCon.Query<Staff>(GenericSP.GetStaffList, Param, commandType: CommandType.StoredProcedure).AsQueryable();
        }

        public int InsertUpdateStaff(Staff objStaff)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "SaveUpdateStaff");
            if (objStaff.StaffID > 0)
            {
                Param.Add("@Mode", 2);
            }
            else
            {
                Param.Add("@Mode", 1);
            }

            #region M_DoctorMaster Fields
            Param.Add("@StaffID", objStaff.StaffID);
            Param.Add("@FirstName", objStaff.FirstName);
            Param.Add("@MiddleName", objStaff.MiddleName);
            Param.Add("@LastName", objStaff.LastName);
            Param.Add("@GenderId", objStaff.GenderId);
            Param.Add("@Education", objStaff.Qualification);
            Param.Add("@Experience", objStaff.Experience);
            Param.Add("@DeptID", objStaff.DeptID);
            Param.Add("@DegID", objStaff.DegID);
            #endregion

            #region M_StaffDoctorMaster Fields
            Param.Add("@EmailId", objStaff.EmailId);
            Param.Add("@MaritalStatusId", objStaff.MaritalStatusId);
            //   Param.Add("@Photo", objStaff.Photo);//objDoc.Photo
            Param.Add("@Photo", objStaff.Photo == null ? new byte[] { } : objStaff.Photo);
            Param.Add("@DOB", objStaff.DOB);
            Param.Add("@AgeYear", objStaff.AgeYr);
            Param.Add("@AgeMonth", objStaff.AgeMnth);
            Param.Add("@AgeDays", objStaff.AgeDay);
            Param.Add("@MobCountryId", objStaff.MobCountryCode);
            Param.Add("@Mobno", objStaff.Mobno);
            Param.Add("@AltMobCountryId", objStaff.AltMobCountryCode);
            Param.Add("@AltMobno", objStaff.AltMobno);
            Param.Add("@Address1", objStaff.AddressLine1);
            Param.Add("@Address2", objStaff.AddressLine2);
            Param.Add("@CountryID", objStaff.CountryID);
            Param.Add("@StateID", objStaff.StateID);
            Param.Add("@CityID", objStaff.CityID);
            Param.Add("@Street", objStaff.Street);
            Param.Add("@LandMark", objStaff.LandMark);
            Param.Add("@PinCode", objStaff.Pincode);
            Param.Add("@Area", objStaff.Area);
            Param.Add("@StdCode", objStaff.StdCode);
            Param.Add("@LandLineNo", objStaff.LandLineNo);
            Param.Add("@AltAddress1", objStaff.AltAddressLine1);
            Param.Add("@AltAddress2", objStaff.AltAddressLine2);
            Param.Add("@AltCountryID", objStaff.AltCountryID);
            Param.Add("@AltStateID", objStaff.AltStateID);
            Param.Add("@AltCityID", objStaff.AltCityID);
            Param.Add("@AltStreet", objStaff.AltStreet);
            Param.Add("@AltLandMark", objStaff.AltLandMark);
            Param.Add("@AltPinCode", objStaff.AltPincode);
            Param.Add("@AltArea", objStaff.AltArea);
            Param.Add("@AltStdCode", objStaff.AltStdCode);
            Param.Add("@AltLandLineNo", objStaff.AltLandLineNo);
            if (objStaff.StaffID == 0)
            {
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedDateTime", DateTime.Now);
                Param.Add("@AddedUTCDateTime", DateTime.UtcNow);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedWindowsLoginName", Environment.UserName);
            }
            else
            {
                Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@UpdatedOn", Environment.MachineName);
                Param.Add("@UpdatedDateTime", DateTime.Now);
                Param.Add("@UpdatedUTCDateTime", DateTime.UtcNow);
                Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
            }
            Param.Add("@Synchronized", objStaff.Synchronized);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            #endregion
            con.DapCon.Execute(GenericSP.InsertUpdateStaff, Param, commandType: CommandType.StoredProcedure);
            Status = Param.Get<Int32>("@Result");
            return Status;
        }

        public Staff GetStaffByID(int StaffID)
        {
            var Param = new DynamicParameters();
            Param.Add("@StaffID", StaffID);

            return this.con.DapCon.Query<Staff>(GenericSP.GetStaffList, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public int ActivateDeactivateStaff(int id, bool st, string re)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "ActiveDeactiveStaff");
            Param.Add("@StaffID", id);
            Param.Add("@Status", st);
            Param.Add("@Reason", re);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.DapCon.Query<int>(GenericSP.InsertUpdateStaff, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<Int32>("@Result");
        }
        public List<State> GetStateList(string Filter, int CountryId)
        {
            var Param = new DynamicParameters();
            Param.Add("@Filter", Filter = string.IsNullOrEmpty(Filter) ? string.Empty : Filter);
            Param.Add("@CountryId", CountryId);
            con.DapCon.Execute(GenericSP.GetStateList, Param, commandType: CommandType.StoredProcedure);
            return this.con.DapCon.Query<State>(GenericSP.GetStateList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<City> GetCityList(string Filter, int StateID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Filter", Filter = string.IsNullOrEmpty(Filter) ? string.Empty : Filter);
            Param.Add("@StateID", StateID);
            con.DapCon.Execute(GenericSP.GetCityList, Param, commandType: CommandType.StoredProcedure);
            return this.con.DapCon.Query<City>(GenericSP.GetCityList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
    }
}
