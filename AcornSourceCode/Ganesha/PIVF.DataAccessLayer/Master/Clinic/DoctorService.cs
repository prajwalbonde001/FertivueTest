using Dapper;
using DataBaseConfiguration;
using PIVF.BusinessLayer.Master.Clinic;
using PIVF.Entities.Mapping.Clinic;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Models.Master.Patient;
using Repository.Pattern.Repositories;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.Master.Clinic
{
    public class DoctorService : Service<Doctor>, IDoctorService
    {
        private readonly IRepositoryAsync<Doctor> _repository;
        DapperConnection con = new DapperConnection();
        public DoctorService(IRepositoryAsync<Doctor> repository) : base(repository)
        {
            _repository = repository;
        }
        public IEnumerable<Doctor> DoctorBySearchtext(string searchtext)
        {
            throw new NotImplementedException();
        }
        public IQueryable<Doctor> GetDoctorsList(int PageIndex, string FirstName, string Mobno, int SID,
                                            int DoctorTypeID, int SuID, int CFID, int UnitID,
                                            string EmailId, string RegestrationNumber,
                                            string Education, string Experience, int GenderId, int BDMID,
                                            int DocCatID, bool PagingEnabled)
        {
            var Param = new DynamicParameters();
            Param.Add("@PageIndex", PageIndex);
            if (FirstName != "")
                Param.Add("@Name", FirstName);
            if (Mobno != "")
                Param.Add("@Mobno", Mobno);
            Param.Add("@SID", SID);
            Param.Add("@DoctorTypeID", DoctorTypeID);
            Param.Add("@SuID", SuID);
            Param.Add("@CFID", CFID);
            Param.Add("@UnitID", UnitID);
            Param.Add("@EmailId", EmailId);
            if (RegestrationNumber != "")
                Param.Add("@RegestrationNumber", RegestrationNumber);
            Param.Add("@Education", Education);
            Param.Add("@Experience", Experience);
            Param.Add("@GenderId", GenderId);
            Param.Add("@BDMID", BDMID);
            Param.Add("@DocCatID", DocCatID);
            Param.Add("@PagingEnabled", PagingEnabled);

            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<Doctor>(GenericSP.GetDocList, Param, commandType: CommandType.StoredProcedure).AsQueryable();
            }
        }
        public List<Gender> GetDDGenderList()
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", "GenderId");
            Param.Add("@ASID", "GenderId");
            Param.Add("@Description", "Description");
            Param.Add("@ASDescription", "GenderDescription");
            Param.Add("@tblName", "M_GenderMaster");
            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<Gender>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
            }
        }

        public List<Doctor> GetDocListByDeptID(int DeptID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorListByDeptID");
            Param.Add("@ID", DeptID);

            return this.con.DapCon.Query<Doctor>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<MaritalStatus> GetDDMaritalStatusList()
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", "MSID");
            Param.Add("@ASID", "MaritalStatusId");
            Param.Add("@Description", "MSDescription");
            Param.Add("@ASDescription", "MSDescription");
            Param.Add("@tblName", "M_Maritalstatus");
            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<MaritalStatus>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
        public List<DoctorType> GetDDDoctorTypeList()
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", "DocTypeID");
            Param.Add("@ASID", "DocTypeID");
            Param.Add("@Description", "DocTypeDescription");
            Param.Add("@ASDescription", "DocTypeDescription");
            Param.Add("@tblName", "M_DoctorTypeMaster");
            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<DoctorType>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
        public List<DoctorCategory> GetDDDoctorCategoryList()
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", "DocCatID");
            Param.Add("@ASID", "DocCatID");
            Param.Add("@Description", "Description");
            Param.Add("@ASDescription", "Description");
            Param.Add("@tblName", "M_DoctorCategoryMaster");
            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<DoctorCategory>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
        public List<Specialization> GetDDSpecializationList()
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", "SID");
            Param.Add("@ASID", "SID");
            Param.Add("@Description", "Description");
            Param.Add("@ASDescription", "Description");
            Param.Add("@tblName", "M_Specialization");
            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<Specialization>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
        public List<SubSpecialization> GetSubSpecBySID(int SID, bool IsListing)
        {
            var Param = new DynamicParameters();
            Param.Add("@SID", SID);
            Param.Add("@IsListing", IsListing);
            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<SubSpecialization>(GenericSP.GetSubSpecBySID, Param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
        public string CalculateAge(DateTime DOB)
        {
            string DateAge = null;
            if (DOB != null)
            {
                DateAge = ConvertDate(DOB, "YY") + "/" + ConvertDate(DOB, "MM") + "/" + ConvertDate(DOB, "DD");
            }
            return DateAge;
        }
        public string ConvertDate(object Datevalue, string parameter)
        {
            if (Datevalue != null)
            {
                try
                {
                    DateTime BirthDate = (DateTime)Datevalue;
                    TimeSpan difference = DateTime.Now.Subtract(BirthDate);

                    //return date.ToString(parameter.ToString());
                    // This is to convert the timespan to datetime object
                    DateTime age = DateTime.MinValue + difference;

                    // Min value is 01/01/0001
                    // Actual age is say 24 yrs, 9 months and 3 days represented as timespan
                    // Min Valye + actual age = 25 yrs , 10 months and 4 days.
                    // subtract our addition or 1 on all components to get the actual date.
                    string result = "";
                    switch (parameter.ToString().ToUpper())
                    {
                        case "YY":
                            result = (age.Year - 1).ToString();
                            break;
                        case "MM":
                            result = (age.Month - 1).ToString();
                            break;
                        case "DD":
                            int day = BirthDate.Day;
                            int curday = DateTime.Now.Day;
                            int dif = 0;
                            if (day > curday)
                                dif = (curday + 30) - day;
                            else
                                dif = curday - day;
                            result = dif.ToString();
                            //result = (age.Day - 1).ToString();
                            break;
                        default:
                            result = (age.Year - 1).ToString();
                            break;
                    }
                    return result;
                }
                catch (Exception ex)
                {
                    string err = ex.Message;
                    return string.Empty;
                }
            }
            else
                return string.Empty;
        }
        public List<Country> GetCountryCode(string Filter, bool Flag)
        {
            var Param = new DynamicParameters();
            if (string.IsNullOrEmpty(Filter))
            {
                Filter = "";
            }
            Param.Add("@Filter", Filter);
            Param.Add("@Flag", Flag);
            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<Country>(GenericSP.GetCountryList, Param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
        public List<DepartmentListForDoc> GetDepartmentListForDoc()
        {
            List<DepartmentListForDoc> lst = new List<DepartmentListForDoc>();
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            using (this.con.DapCon)
            {
                lst = this.con.DapCon.Query<DepartmentListForDoc>(GenericSP.GetDeptListForDoc, Param, commandType: CommandType.StoredProcedure).AsList();
                lst.Insert(0, new DepartmentListForDoc { DeptID = 0, Description = "Select" });
            }
            return lst;
        }
        public List<Classification> GetDDClassificationList()
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", "CFID");
            Param.Add("@ASID", "CFID");
            Param.Add("@Description", "Description");
            Param.Add("@ASDescription", "Description");
            Param.Add("@tblName", "M_Classification");
            using (this.con.DapCon)
            {
                return this.con.DapCon.Query<Classification>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
        public Int32 InsertUpdateDoctor(Doctor objDoc)
        {
            var Param = new DynamicParameters();
            Int32 ResultStatus = 0;
            if (objDoc.DOCID > 0)
            {
                if (objDoc.RowsCount == 0)
                {
                    Param.Add("@Mode", 2);
                }
                else
                {
                    Param.Add("@Mode", 3);
                }
            }
            else
            {
                Param.Add("@Mode", 1);
            }

            #region M_DoctorMaster Fields
            Param.Add("@DOCID", objDoc.DOCID);
            Param.Add("@SID", objDoc.SID);
            if (objDoc.SuID == 0)
            {
                Param.Add("@SuID", null);
            }
            else
            {
                Param.Add("@SuID", objDoc.SuID);
            }
            if (objDoc.DocCatID == 0)
            {
                Param.Add("@DocCatID", null);
            }
            else
            {
                Param.Add("@DocCatID", objDoc.DocCatID);
            }
            Param.Add("@FirstName", objDoc.FirstName);
            Param.Add("@MiddleName", objDoc.MiddleName);
            Param.Add("@LastName", objDoc.LastName);
            Param.Add("@GenderId", objDoc.GenderId);
            Param.Add("@Education", objDoc.Education);
            Param.Add("@Experience", objDoc.Experience);
            Param.Add("@RegestrationNumber", objDoc.RegestrationNumber);
            Param.Add("@Signature", objDoc.Signature == null ? new byte[] { } : objDoc.Signature);
            Param.Add("@DoctorTypeID", objDoc.DocTypeID);
            Param.Add("@IsReferral", objDoc.IsReferral);
            Param.Add("@BDMID", objDoc.BDMID);

            #endregion

            #region M_StaffDoctorMaster Fields
            Param.Add("@EmailId", objDoc.EmailId);
            Param.Add("@MaritalStatusId", objDoc.MaritalStatusId);
            Param.Add("@Photo", objDoc.Photo == null ? new byte[] { } : objDoc.Photo);

            Param.Add("@DOB", objDoc.DOB);
            Param.Add("@AgeYear", objDoc.AgeYear);
            Param.Add("@AgeMonth", objDoc.AgeMonth);
            Param.Add("@AgeDays", objDoc.AgeDays);
            Param.Add("@MobCountryId", objDoc.MobCountryId);
            Param.Add("@Mobno", objDoc.Mobno);
            Param.Add("@AltMobCountryId", objDoc.AltMobCountryId);
            Param.Add("@AltMobno", objDoc.AltMobno);

            if (objDoc.DOCID == 0)
            {
                //Param.Add("@CreatedUnitID", 1); //Commented and Modified by AniketK on 06Nov2019
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);

                //Param.Add("@AddedBy", 1); //Commented and Modified by AniketK on 06Nov2019
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);

                Param.Add("@AddedDateTime", DateTime.Now);
                Param.Add("@AddedUTCDateTime", DateTime.UtcNow);
                Param.Add("@AddedOn", Environment.MachineName);

                //Param.Add("@AddedWindowsLoginName", "Test"); //Commented and Modified by AniketK on 06Nov2019
                Param.Add("@AddedWindowsLoginName", GenericSP.CurrentUser.UserName);
            }
            //Param.Add("@UpdatedUnitID", 1); //Commented and Modified by AniketK on 06Nov2019
            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);

            //Param.Add("@UpdatedBy", 1); //Commented and Modified by AniketK on 06Nov2019
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);

            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedDateTime", DateTime.Now);
            Param.Add("@UpdatedUTCDateTime", DateTime.UtcNow);

            //Param.Add("@UpdateWindowsLoginName", "Test");  //Commented and Modified by AniketK on 06Nov2019
            Param.Add("@UpdateWindowsLoginName", GenericSP.CurrentUser.UserName);

            Param.Add("@Synchronized", objDoc.Synchronized);
            Param.Add("@Address1", objDoc.Address1);
            Param.Add("@Address2", objDoc.Address2);
            Param.Add("@CountryID", objDoc.CountryID);
            Param.Add("@StateID", objDoc.StateID);
            Param.Add("@CityID", objDoc.CityID);
            Param.Add("@Street", objDoc.Street);
            Param.Add("@LandMark", objDoc.LandMark);
            Param.Add("@PinCode", objDoc.PinCode);
            Param.Add("@Area", objDoc.Area);
            Param.Add("@StdCode", objDoc.StdCode);
            Param.Add("@LandLineNo", objDoc.LandLineNo);
            Param.Add("@AltAddress1", objDoc.AltAddress1);
            Param.Add("@AltAddress2", objDoc.AltAddress2);
            Param.Add("@AltCountryID", objDoc.AltCountryID);
            Param.Add("@AltStateID", objDoc.AltStateID);
            Param.Add("@AltCityID", objDoc.AltCityID);
            Param.Add("@AltStreet", objDoc.AltStreet);
            Param.Add("@AltLandMark", objDoc.AltLandMark);
            Param.Add("@AltPinCode", objDoc.AltPinCode);
            Param.Add("@AltArea", objDoc.AltArea);
            Param.Add("@AltStdCode", objDoc.AltStdCode);
            Param.Add("@AltLandLineNo", objDoc.AltLandLineNo);
            Param.Add("@Status", objDoc.Status);
            Param.Add("@ReasonForAD", objDoc.ReasonForAD);

            #endregion

            Param.Add("@SelectedDeparments", objDoc.SelectedDeparments);
            Param.Add("@SelectedUnits", objDoc.SelectedUnits);
            Param.Add("@SelectedClassifications", objDoc.SelectedClassifications);

            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            using (this.con.DapCon)
            {
                con.DapCon.Execute(GenericSP.InsertUpdateDoctor, Param, commandType: CommandType.StoredProcedure);
            }
            return ResultStatus = Param.Get<Int32>("@ResultStatus");
            // return this.con.DapCon.Query<Classification>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public Doctor GetSpecificDoctor(int DOCID)
        {
            var Param = new DynamicParameters();
            Param.Add("@DOCID", DOCID);

            Doctor objDoc = new Doctor();
            using (var multi = con.DapCon.QueryMultiple(GenericSP.GetSpecificDoctor, Param, null, null, CommandType.StoredProcedure))
            {
                objDoc = multi.Read<Doctor>().SingleOrDefault();
                objDoc.lstDept = multi.Read<int>().ToList();
                objDoc.lstClassification = multi.Read<int>().ToList();
                objDoc.lstUnit = multi.Read<int>().ToList();

            }
            return objDoc;
        }


        //Get Doctor Detail By Name
        public Doctor GetDoctDetailByName(int DOCID)
        {
            var Param = new DynamicParameters();
            Param.Add("@DOCID", DOCID);

            Doctor objDoc = new Doctor();
            using (var multi = con.DapCon.QueryMultiple(GenericSP.GetDoctDetailByName, Param, null, null, CommandType.StoredProcedure))
            {
                objDoc = multi.Read<Doctor>().SingleOrDefault();


            }
            return objDoc;
        }

        public List<Doctor> GetDayMaster()
        {
            return this.con.DapCon.Query<Doctor>(GenericSP.GetDayMaster, commandType: CommandType.StoredProcedure).AsList();


        }
            
            public List<Doctor> GetAllDoctorNames(string doctorName)
        {
            var Param = new DynamicParameters();
            Param.Add("@Filter", doctorName);

            return this.con.DapCon.Query<Doctor>(GenericSP.GetAllDoctorNames, Param, commandType: CommandType.StoredProcedure).AsList();

        }
        public List<Unit> GetDDUnitList()
        {
            return this.con.DapCon.Query<Unit>(GenericSP.GetUnitList, commandType: CommandType.StoredProcedure).AsList();
        }

        List<Unit> IDoctorService.GetDDUnitList()
        {
            return this.con.DapCon.Query<Unit>(GenericSP.GetUnitList, commandType: CommandType.StoredProcedure).AsList();
        }
    }
}
