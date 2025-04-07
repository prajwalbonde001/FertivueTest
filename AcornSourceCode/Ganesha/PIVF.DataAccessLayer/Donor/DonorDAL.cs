using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.Donor;
using PIVF.Entities.Models.Donor;
using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.Donor
{
    public class DonorDAL: DonorBL
    {
        private Database dbServer = null;
        IDbConnection con;
        public DonorDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<DonorVO> FillDonorList(int PageIndex, string DonorCode, long AgencyID, long BloodGroupID, long EyeColorID, long HairColorID, long SkinColorID, long HeightID, long BuiltID, bool IsPageEnable)
        {
            List<DonorVO> _List = new List<DonorVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@startRowIndex", PageIndex);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@DonorCode", DonorCode);
                Param.Add("@AgencyID", AgencyID);
                Param.Add("@BloodGroupID", BloodGroupID);
                Param.Add("@EyeColorID", EyeColorID);
                Param.Add("@HairColorID", HairColorID);
                Param.Add("@SkinColorID", SkinColorID);
                Param.Add("@HeightID", HeightID);
                Param.Add("@BuiltID", BuiltID);
                Param.Add("@PagingEnabled", IsPageEnable);
                Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);
                _List = this.con.Query<DonorVO>(GenericSP.GetDonorList, Param, commandType: CommandType.StoredProcedure).ToList();
             
                if (_List.Count > 0)
                    _List[0].TotalRows = Param.Get<Int32>("@TotalRows");
            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }
        public int SaveDonor(DonorVO Donor)
        {
            int ResultStatus = 0;
            var Param = new DynamicParameters();
            try
            {
                Param.Add("@ID", Donor.ID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@DonerCode", Donor.DonorCode);
                Param.Add("@HeightID", Donor.HeightID);
                Param.Add("@BuiltID", Donor.BuiltID);
                Param.Add("@SkinColorID", Donor.SkinColorID);
                Param.Add("@HairColorID", Donor.HairColorID);
                Param.Add("@EyeColorID", Donor.EyeColorID);
                Param.Add("@EducationID", Donor.EducationID);
                Param.Add("@AgencyID", Donor.AgencyID);
                Param.Add("@BloodGroupID", Donor.BloodGroupID);
                Param.Add("@AddedUserID", GenericSP.CurrentUser.UserID);
                Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@UpdatedOn", Environment.MachineName);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedWindowsLoginName", Environment.UserName);
                Param.Add("@UpdateWindowsLoginName", Environment.UserName);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserName);
                Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserName);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);
                con.Query(GenericSP.AddUpdateDonerRegistration, Param, commandType: CommandType.StoredProcedure);
                ResultStatus = Param.Get<Int32>("@ResultStatus");
            }
            catch (Exception E)
            {
                ResultStatus = 0;
            }
            return ResultStatus;
        }
        public List<SemenFreez> GetDonorFrozenSamples(long DonorID, long DonorUnitID)
        {
            List<SemenFreez> _List = new List<SemenFreez>();
            return _List;
        }


        //Added by Nayan Kamble
        public List<SemenFreez> GetSemenFreezListByFormNo(string FormNo, string Action, long ID, long UnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                //if (GenericSP.SelectedPatient != null)
                //{
                //    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                //    Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                //}
                Param.Add("@FormNo", FormNo);
                Param.Add("@Action", Action);
                Param.Add("@ID", ID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                return this.con.Query<SemenFreez>(GenericSP.GetSemenFreezListByFormNo, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception e)
            {
                List<SemenFreez> _List = new List<SemenFreez>();
                return _List;
            }
        }

        //Added by Nayan Kamble 
        public List<SemenFreezDetails> GetSemenFreezDetailListByFormNo(string FormNo, string Action, long ID, long UnitID)
        {
            try
            {
                var Param = new DynamicParameters();
                //if (GenericSP.SelectedPatient != null)
                //{
                //    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                //    Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                //}
                Param.Add("@FormNo", FormNo);
                Param.Add("@Action", Action);
                Param.Add("@ID", ID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                return this.con.Query<SemenFreezDetails>(GenericSP.GetSemenFreezListByFormNo, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception e)
            {
                List<SemenFreezDetails> _List = new List<SemenFreezDetails>();
                return _List;
            }
        }
















    }
}
