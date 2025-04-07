//using PIVF.Gemino.Repository.Pattern.Ef6;
using Repository.Pattern.Ef6;
using System;
using System.ComponentModel.DataAnnotations;

//namespace PIVF.Gemino.Entities.Models.Master.Clinic
namespace PIVF.Entities.Models.Master.Clinic
{
    public class Staff : Entity
    {
        [Key]
        #region M_DoctorMater Fields
        public int StaffID { get; set; }
        public bool Status { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string GenderCode { get; set; }
        public string Qualification { get; set; }
        public string Experience { get; set; }
        public string Gender { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string Clinic { get; set; }
        public int ClinicID { get; set; }

        #endregion

        #region General Fields
        public string EmailId { get; set; }
        public DateTime? DOB { get; set; }
        public int? MaritalStatusId { get; set; }
        public byte[] Photo { get; set; }
        public string PhotoString { get; set; }
        public int AgeYr { get; set; }
        public int AgeMnth { get; set; }
        public int AgeDay { get; set; }
        public int DegID { get; set; }
        public int DeptID { get; set; }
        public int MobCountryCode { get; set; }
        public String Mobno { get; set; }
        public String AltMobno { get; set; }
        public int AltMobCountryCode { get; set; }
        public string StdCode { get; set; }
        public string LandLineNo { get; set; }
        public string AltStdCode { get; set; }
        public string AltLandLineNo { get; set; }

        #region Common Properties
        public int? CreatedUnitID { get; set; }
        public int? UpdatedUnitID { get; set; }
        public int? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }

        private bool _Synchronized = false;
        public bool Synchronized
        {
            get
            {
                return _Synchronized;
            }
            set
            {
                _Synchronized = value;
            }
        }

        public int TotalRecords { get; set; }

        #endregion
        #endregion

        #region Address Detail
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Street { get; set; }
        public string LandMark { get; set; }
        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public string Area { get; set; }
        public string Pincode { get; set; }
        public string AltAddressLine1 { get; set; }
        public string AltAddressLine2 { get; set; }
        public string AltStreet { get; set; }
        public string AltLandMark { get; set; }
        public int AltCountryID { get; set; }
        public int AltStateID { get; set; }
        public int AltCityID { get; set; }
        public string AltArea { get; set; }
        public string AltPincode { get; set; }
        #endregion
    }
}
