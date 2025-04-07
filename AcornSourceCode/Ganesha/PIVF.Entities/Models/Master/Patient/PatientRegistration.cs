using PIVF.Entities.Models.Master.Clinic;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Pattern.Ef6;

namespace PIVF.Entities.Models.Master.Patient
{
    public class PatientRegistration : Entity
    {
        /*Patient Information*/
        [Key]
        public Int32 RegID { get; set; }
        public Int32 RegUnitID { get; set; }
        public Nullable<Int32> PRegTypeID { get; set; }
        public Nullable<Int32> PatientSRegID { get; set; }
        public Nullable<Int32> PatientPRFIXID { get; set; }
        public string PatientPrefixName { get; set; }
        public string PatientFirstName { get; set; }
        public string PatientMiddleName { get; set; }
        public string PatientLastName { get; set; }
        public Nullable<Int32> PatientGenderId { get; set; }
        public Nullable<DateTime> PatientDOB { get; set; }
        public Nullable<Int32> PatientselectedCountryID { get; set; }
        public string PatientMobileNumber { get; set; }
        public Nullable<Int32> selectedPatientAlternateCountryID { get; set; }
        public string PatientAlternateMobileNumber { get; set; }
        public string PatientEmail { get; set; }

        /*Spouse information*/
        public Nullable<Int32> SpousePRFIXID { get; set; }
        public string SpousePrefixName { get; set; }
        public string SpouseFirstName { get; set; }
        public string SpouseMiddleName { get; set; }
        public string SpouseLastName { get; set; }
        public Nullable<Int32> SpouseGenderId { get; set; }
        public Nullable<DateTime> SpouseDOB { get; set; }
        public Nullable<Int32> selectedSpouseCountryID { get; set; }
        public string SpouseMobileNumber { get; set; }
        public Nullable<Int32> selectedSpouseAlternateCountryID { get; set; }
        public string SpouseAlternateMobileNumber { get; set; }
        public string SpouseEmail { get; set; }

        /* Patient step 2*/
        public byte[] PatientPhoto { get; set; }
        public string PhotoString { get; set; }
        public Nullable<Int32> PatientIdentityID { get; set; }
        public Nullable<Int32> PatientEDUID { get; set; }
        public Nullable<Int32> PatientMaritalStatusID { get; set; }
        public Nullable<DateTime> PatientMarriageAnnivDate { get; set; }
        public Nullable<Int32> PatientBloodGroupID { get; set; }
        public Nullable<Int32> PatientNationalityID { get; set; }
        public Nullable<Int32> PatientReligionID { get; set; }
        public string PatientIdentityNumber { get; set; }
        public byte[] PatientAttachProofPhoto { get; set; }
        public string PatientAttachProofPhotoString { get; set; }
        public Nullable<Int32> PatientOccupationId { get; set; }
        public string PatientCompanyName { get; set; }

        ///*Spouse information*/
        public byte[] SpousePhoto { get; set; }
        public string SpousePhotoString { get; set; }
        public Nullable<Int32> SpouseIdentityID { get; set; }
        public Nullable<Int32> SpouseEDUID { get; set; }
        public Nullable<Int32> SpouseMaritalStatusID { get; set; }
        public Nullable<DateTime> SpouseMarriageAnnivDate { get; set; }
        public Nullable<Int32> SpouseBloodGroupID { get; set; }
        public Nullable<Int32> SpouseNationalityID { get; set; }
        public Nullable<Int32> SpouseReligionID { get; set; }
        public string SpouseIdentityNumber { get; set; }
        public byte[] SpouseAttachProofPhoto { get; set; }
        public string SpouseAttachProofPhotoString { get; set; }
        public Nullable<Int32> SpouseOccupationId { get; set; }
        public string SpouseCompanyName { get; set; }

        ///*step 3*/
        public Nullable<Int32> RFTYPEID { get; set; }
        public Nullable<Int32> DOCID { get; set; }
        public string ReferralDetail { get; set; }
        public Nullable<Int32> InhouseDOCID { get; set; }
        public string ExternalFirstName { get; set; }
        public Nullable<Int32> ReferalGenderId { get; set; }
        public string ExternalMiddleName { get; set; }
        public Nullable<Int32> ExternalMobileCountryCodeID { get; set; }
        public string ExternalMobileNumber { get; set; }
        public string ExternalLastName { get; set; }
        public string ExternalCountryCode { get; set; }
        public string ExternalLandLineNo { get; set; }
        public Nullable<Int32> SID { get; set; }
        public string ExternalEducation { get; set; }

        ///*Contact Information*/
        ///Mailing
        public Nullable<Int32> AddForID { get; set; }
        public string SelectedAddressTypes { get; set; }
        public string MalingAddressLine1 { get; set; }
        public string MalingAddressLine2 { get; set; }
        public string MailingStreet { get; set; }
        public string MailingLandMark { get; set; }
        public Nullable<Int32> MailingCountryID { get; set; }
        public Nullable<Int32> MailingStateID { get; set; }
        public Nullable<Int32> MailingCityID { get; set; }
        public string MailingArea { get; set; }
        public string MailingPincode { get; set; }
        public string selectedMailingCountry { get; set; }
        public string MailingLandLineNo { get; set; }
        /// <summary>
        /// Permanent address
        /// </summary>
        public Nullable<Int32> PermanentAddForID { get; set; }
        public string SelectedPermanentAddressTypes { get; set; }
        public string PermanentAddressLine1 { get; set; }
        public string PermanentAddressLine2 { get; set; }
        public string PermanentStreet { get; set; }
        public string PermanentLandMark { get; set; }
        public Nullable<Int32> PermanentCountryID { get; set; }
        public Nullable<Int32> PermanentStateID { get; set; }
        public Nullable<Int32> PermanentCityID { get; set; }
        public string PermanentArea { get; set; }
        public string PermanentPincode { get; set; }
        public string selectedPermanentCountry { get; set; }
        public string PermanentLandLineNo { get; set; }
        /// <summary>
        /// Alternate address
        /// </summary>
        public Nullable<Int32> AlternateAddForID { get; set; }
        public string SelectedAlternateAddressTypes { get; set; }
        public string AlternateAddressLine1 { get; set; }
        public string AlternateAddressLine2 { get; set; }
        public string AlternateStreet { get; set; }
        public string AlternateLandMark { get; set; }
        public Nullable<Int32> AlternateCountryID { get; set; }
        public Nullable<Int32> AlternateStateID { get; set; }
        public Nullable<Int32> AlternateCityID { get; set; }
        public string AlternateArea { get; set; }
        public string AlternatePincode { get; set; }
        public string selectedAlternateCountry { get; set; }
        public string AlternateLandLineNo { get; set; }


        //Spouse or partner address variables
        ///Spouse Mailing
        public Nullable<Int32> SpouseAddForID { get; set; }
        public string SpouseSelectedAddressTypes { get; set; }
        public string SpouseMalingAddressLine1 { get; set; }
        public string SpouseMalingAddressLine2 { get; set; }
        public string SpouseMailingStreet { get; set; }
        public string SpouseMailingLandMark { get; set; }
        public Nullable<Int32> SpouseMailingCountryID { get; set; }
        public Nullable<Int32> SpouseMailingStateID { get; set; }
        public Nullable<Int32> SpouseMailingCityID { get; set; }
        public string SpouseMailingArea { get; set; }
        public string SpouseMailingPincode { get; set; }
        public string SpouseselectedMailingCountry { get; set; }
        public string SpouseMailingLandLineNo { get; set; }
        /// <summary>
        /// Spouse Permanent address
        /// </summary>
        public Nullable<Int32> SpousePermanentAddForID { get; set; }
        public string SpouseSelectedPermanentAddressTypes { get; set; }
        public string SpousePermanentAddressLine1 { get; set; }
        public string SpousePermanentAddressLine2 { get; set; }
        public string SpousePermanentStreet { get; set; }
        public string SpousePermanentLandMark { get; set; }
        public Nullable<Int32> SpousePermanentCountryID { get; set; }
        public Nullable<Int32> SpousePermanentStateID { get; set; }
        public Nullable<Int32> SpousePermanentCityID { get; set; }
        public string SpousePermanentArea { get; set; }
        public string SpousePermanentPincode { get; set; }
        public string SpouseselectedPermanentCountry { get; set; }
        public string SpousePermanentLandLineNo { get; set; }
        /// <summary>
        /// Spouse Alternate address
        /// </summary>
        public Nullable<Int32> SpouseAlternateAddForID { get; set; }
        public string SpouseSelectedAlternateAddressTypes { get; set; }
        public string SpouseAlternateAddressLine1 { get; set; }
        public string SpouseAlternateAddressLine2 { get; set; }
        public string SpouseAlternateStreet { get; set; }
        public string SpouseAlternateLandMark { get; set; }
        public Nullable<Int32> SpouseAlternateCountryID { get; set; }
        public Nullable<Int32> SpouseAlternateStateID { get; set; }
        public Nullable<Int32> SpouseAlternateCityID { get; set; }
        public string SpouseAlternateArea { get; set; }
        public string SpouseAlternatePincode { get; set; }
        public string SpouseselectedAlternateCountry { get; set; }
        public string SpouseAlternateLandLineNo { get; set; }
        /* End of spouse address variables declarations*/

        public Nullable<Int32> SRegID { get; set; }
        public Nullable<Int32> AgeYear { get; set; }
        public Nullable<Int32> AgeMonth { get; set; }
        public Nullable<Int32> AgeDays { get; set; }
        public Nullable<Int32> SpouseAgeYear { get; set; }
        public Nullable<Int32> SpouseAgeMonth { get; set; }
        public Nullable<Int32> SpouseAgeDays { get; set; }
        public string MRNo { get; set; }
        public string PatientName { get; set; }
        public string PartnerName { get; set; }
        public string RegType { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public string age { get; set; }
        public string MobileNumber { get; set; }
        public string AltMobilenumber { get; set; }
        public string Maritalstatus { get; set; }
        public string SpecialRegistration { get; set; }
        public string RegisteredAt { get; set; }
        public int UnitID { get; set; }
        public long RowsCount { get; set; }
        public string FullName { get; set; }
        public string PatientCountryName { get; set; }
        public string PatientAltCountryName { get; set; }
        public string ExternalCountryName { get; set; }
        public int ResultStatus { get; set; }
        public int FromAge { get; set; }
        public int ToAge { get; set; }
        public Nullable<int> MotherRegID { get; set; }
        public Nullable<DateTime> RegistrationFromDate { get; set; }
        public Nullable<DateTime> RegistrationToDate { get; set; }
        public int RegisteredCategory { get; set; }
        public string CountryName { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }
        public string BloodGroupDescription { get; set; }
        public string IDProofDescription { get; set; }
        public string NationlityDescription { get; set; }
        public string ReligionDescription { get; set; }
        public string EducationDescription { get; set; }
        public string OccupdationDescription { get; set; }
        public string PrefixDescription { get; set; }
        public string SourceOfReferenceName { get; set; }
        public string SourceOfReferenceInternalName { get; set; }
        public string SourceOfReferenceExternalName { get; set; }
        public string InhouseDoctorName { get; set; }
        public string ExternalDoctorName { get; set; }
        public string PermanentCityName { get; set; }
        public string PermanentCountryName { get; set; }
        public string PermanentStateName { get; set; }
        public string SpouseCityName { get; set; }
        public string SpouseCountryName { get; set; }
        public string SpouseEducationDescription { get; set; }
        public string SpouseIDProofDescription { get; set; }
        public string SpouseMRNo { get; set; }
        public string SpouseNationlityDescription { get; set; }
        public string SpouseOccupdationDescription { get; set; }
        public string SpousePermanentCityName { get; set; }
        public string SpousePermanentCountryName { get; set; }
        public string SpousePermanentStateName { get; set; }
        public string SpousePrefixDescription { get; set; }
        public string SpouseReligionDescription { get; set; }
        public string SpouseStateName { get; set; }
        public string SpouseBloodGroupDescription { get; set; }
        public string PatientCountryCode { get; set; }
        public string PatientAlternateCountryCode { get; set; }
        public string SpouseCountryCode { get; set; }
        public string SpouseAlternateCountryCode { get; set; }
        public string AlternateCountryName { get; set; }
        public string AlternateStateName { get; set; }
        public string AlternateCityName { get; set; }
        public string SpouseAlternateCountryName { get; set; }
        public string SpouseAlternateStateName { get; set; }
        public string SpouseAlternateCityName { get; set; }
        public List<PatientRegistrationAddress> PatientRegistrationAddressList { get; set; }

        //Bank Infromation
        public int BankID { get; set; }
        public string BranchName { get; set; }
        public string IFSCCode { get; set; }
        public bool AccoutType { get; set; }
        public Int64 AccountNo { get; set; }
        public string CustName { get; set; }
        public bool Status { get; set; }
    }

    public class PatientRegistrationAddress
    {
        [Key]
        public int id { get; set; }
        public Nullable<Int32> AddForID { get; set; }
        public string SelectedAddressTypes { get; set; }
        public string MalingAddressLine1 { get; set; }
        public string MalingAddressLine2 { get; set; }
        public string MailingStreet { get; set; }
        public string MailingLandMark { get; set; }
        public Nullable<Int32> MailingCountryID { get; set; }
        public Nullable<Int32> MailingStateID { get; set; }
        public Nullable<Int32> MailingCityID { get; set; }
        public string MailingArea { get; set; }
        public string MailingPincode { get; set; }
        public Country selectedMailingCountry { get; set; }
        public string MailingLandLineNo { get; set; }
    }

    public class PatientRegTypeMaster
    {
        [Key]
        public int PRegTypeID { get; set; }
        public int PatientRegCode { get; set; }
        public string Description { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public Nullable<DateTime> AddedDateTime { get; set; }
        public Nullable<DateTime> AddedUTCDateTime { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public Nullable<DateTime> UpdatedDateTime { get; set; }
        public Nullable<DateTime> UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public Nullable<bool> Synchronized { get; set; }
    }

    public class IdentityProof
    {
        [Key]
        public Int32 IDProofID { get; set; }
        public string IDProofCode { get; set; }
        public string Description { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public Nullable<DateTime> AddedDateTime { get; set; }
        public Nullable<DateTime> AddedUTCDateTime { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public Nullable<DateTime> UpdatedDateTime { get; set; }
        public Nullable<DateTime> UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public Nullable<bool> Synchronized { get; set; } = true;
    }

    public class BloodGroup
    {
        [Key]
        public Int32 BloodID { get; set; }
        public string BloodCode { get; set; }
        public string Description { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public Nullable<DateTime> AddedDateTime { get; set; }
        public Nullable<DateTime> AddedUTCDateTime { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public Nullable<DateTime> UpdatedDateTime { get; set; }
        public Nullable<DateTime> UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public Nullable<bool> Synchronized { get; set; } = true;
    }

    public class SpecialRegistrationMaster
    {
        [Key]
        public Int32 SRegID { get; set; }
        public string SRegCode { get; set; }
        public string Description { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public Nullable<DateTime> AddedDateTime { get; set; }
        public Nullable<DateTime> AddedUTCDateTime { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public Nullable<DateTime> UpdatedDateTime { get; set; }
        public Nullable<DateTime> UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public Nullable<bool> Synchronized { get; set; } = true;
    }

    public class Religion
    {
        public int ID { get; set; }
        public String Description { get; set; }
        public bool Status { get; set; }
    }
    public class Occupation
    {
        [Key]
        public Int32 OccupID { get; set; }
        public string OccupCode { get; set; }
        public string Description { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public Nullable<DateTime> AddedDateTime { get; set; }
        public Nullable<DateTime> AddedUTCDateTime { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public Nullable<DateTime> UpdatedDateTime { get; set; }
        public Nullable<DateTime> UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public Nullable<bool> Synchronized { get; set; } = true;
    }

    public partial class Prefix : Entity
    {
        [Key]
        public int PRFIXID { get; set; }
        public string PRFIXCode { get; set; }
        public string Description { get; set; }
        public int? GenderId { get; set; }
        public bool Status { get; set; }
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
        public bool Synchronized { get; set; }
    }
    public class AddressFor
    {
        [Key]
        public int AddForID { get; set; }
        public string Description { get; set; }
    }
    public class AddressType
    {
        [Key]
        public int AddTypeID { get; set; }
        public string Description { get; set; }
    }
    public class Appointments : Entity
    {
        [Key]
        public int APPID { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
        public string AppCancelReason { get; set; }
        public string Department { get; set; }
        public DateTime AppointmentDate { get; set; }
        public int AppointmentsTotalItems { get; set; }
        public string MRNo { get; set; }
        public string PatientName { get; set; }
        public string AppReason { get; set; }
        public string AppStatus { get; set; }
        public int AppStatusID { get; set; }
        public string MobileNo { get; set; }
        public string Description { get; set; }
        public string DoctorName { get; set; }
        public int DOCID { get; set; }
        public int DeptID { get; set; }
        public int UnitID { get; set; }
        public string Remark { get; set; }
        public int GenderID { get; set; }
        public int MobileCountryCode { get; set; }
        public int MobileCountryID { get; set; }
        public int VisitID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string GenderDescription { get; set; }
        public string ApptUnit { get; set; }
        public string AppointmentReason { get; set; }
        public int Age { get; set; }
        public string PatientPhoto { get; set; }
        public byte[] Photo { get; set; }
        public int RescheduleAgainstApptID { get; set; }
        public string Username { get; set; }
        public DateTime AddedDateTime { get; set; }
        public Int32 RegID { get; set; }
        public Int32 RegUnitID { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public bool Iscancel { get; set; }
        public string AppTypeDescription { get; set; }
        public string AppointmentBy { get; set; }
        public int AppTypeId { get; set; }
        public int PatientCategoryID { get; set; }

    }
    public class MaritalStatus
    {
        [Key]
        public int MaritalStatusId { get; set; }
        public string MSCode { get; set; }
        public string MSDescription { get; set; }

    }
    public class DoctorType
    {
        [Key]
        public int DocTypeID { get; set; }
        public string DocTypeCode { get; set; }
        public string DocTypeDescription { get; set; }
    }
    public class DoctorCategory
    {
        [Key]
        public int DocCatID { get; set; }
        public string DocCatCode { get; set; }
        public string Description { get; set; }
    }
    public class DepartmentListForDoc
    {
        [Key]
        public int ID { get; set; }
        public int DeptID { get; set; }
        public string DeptCode { get; set; }
        public string Description { get; set; }
        public string UnitName { get; set; }
        public bool IsSelected { get; set; }
        public int UnitID { get; set; }

    }
    public class AuditDTO
    {
        public int ID { get; set; }
        public string field { get; set; }
        public string oldvalue { get; set; }
        public string newvalue { get; set; }
    }
}
