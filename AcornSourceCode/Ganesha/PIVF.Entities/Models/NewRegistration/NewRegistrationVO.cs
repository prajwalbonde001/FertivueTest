using PIVF.Entities.Models.EMR.DesignEMR;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.NewRegistration

{
   public class NewRegistrationVO
    {
        public List<NewPatient> lstPatient { get; set; }
        public NewPatient Patient { get; set; }
        public long GenderID1 { get; set; }
        public long PatientID1 { get; set; }
        public long GenderIDPart1 { get; set; }
        public long PartnerID1 { get; set; }
        public string FileName1 { get; set; }
        public string FileNamePartner1 { get; set; }
        public string attFileName1 { get; set; }
        public string attFileNamePartner1 { get; set; }
        public string MRNo1 { get; set; }
        public string strPhoto1 { get; set; }
        public string strAttachment1 { get; set; }
        public string strPhotoPartner1 { get; set; }
        public string strAttachmentPartner1 { get; set; }
        public NewPatient Partner { get; set; }
        public List<NewAddress> lstAddress { get; set; }
        public string IMGPatientPath { get; set; }
        public string IMGPartnerPath { get; set; }
        public bool IsFromCounterSale { get; set; }
    }

    public class NewPatient
    {
        public string AttachPatientPath1 { get; set; }
        public string ImgPatientPath1 { get; set; }
        public string AttachPartnerPath1 { get; set; }
        public string ImgPartnerPath1 { get; set; }
        public bool Ispatient { get; set; }
        public int ID { get; set; }
        public int UnitID { get; set; }
        public int RegID { get; set; }
        public int RegUnitID { get; set; }
        public int PatientID { get; set; }
        public int PatientCategoryID { get; set; }      
        public string MRNo { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string RegType { get; set; }
        public string PatientName { get; set; }
        public string PartnerName { get; set; }
        public string PartnerMRN { get; set; }
        public string PartnerCountryCode { get; set; }
        public string PartnerMobileNo { get; set; }
        public string PartnerGender { get; set; }
        public bool IsSpecialReg { get; set; }
        public bool IsReferredPatient { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FamilyName { get; set; }
        public int GenderID { get; set; }
        public string GenderIDPIP { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int Age { get; set; }
        public int MobCountryCodeID { get; set; }
        public string MobCountryCode { get; set; }
        public string MobileNo { get; set; }
        public int IdentityID { get; set; }
        public string Identity { get; set; }
        public string IdentityNumber { get; set; }
        public string strPhoto { get; set; }
        public byte[] Photo { get; set; }
        public string strAttachment { get; set; }
        public byte[] Attachment { get; set; }
        public int PhotoStatus { get; set; }
        public string FileName { get; set; }
        public string attFileName { get; set; }
        public int MarriedSince { get; set; }
        public int ExistingChildren { get; set; }
        public Int16 FamilyType { get; set; }
        public string Email { get; set; }
        public int MaritalStatusID { get; set; }
        public string MaritalStatus { get; set; }
        public int BloodGroupID { get; set; }
        public string BloodGroup { get; set; }
        public int NationalityID { get; set; }
        public string Nationality { get; set; }
        public int EthnicityID { get; set; }
        public string Ethnicity { get; set; }
        public int ReligionID { get; set; }
        public string Religion { get; set; }
        public int EducationID { get; set; }
        public string Education { get; set; }
        public int OccupationId { get; set; }
        public string Occupation { get; set; }
        public int AgentID { get; set; }
        public int AgencyID { get; set; }
        public int RegFrom { get; set; }
        public bool IsDonor { get; set; }
        public bool IsDonorUsed { get; set; }
        public bool Status { get; set; }
        public int TotalItems { get; set; }
        public int PageNo { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        #region ReferalInfo
        public int SourceOfReferenceID { get; set; }
        public string SourceOfReference { get; set; }
        public int CampID { get; set; }
        public string Camp { get; set; }
        public int ReferredDoctorID { get; set; }
        public string ReferralRemark { get; set; }
        public string ExtDocFirstName { get; set; }
        public string ExtDocMiddleName { get; set; }
        public string ExtDocLastName { get; set; }
        public int ExtDocGenderID { get; set; }
        public int ExtDocMobConCode { get; set; }
        public string ExtDocMobileNo { get; set; }
        public int SpecID { get; set; }
        public int BDMID { get; set; }
        #endregion

        public DateTime? RegFromDate { get; set; }
        public DateTime? RegToDate { get; set; }
        public DateTime? RegVisFromDate { get; set; }
        public DateTime? RegVisToDate { get; set; }
        public Address objAddress { get; set; }

        //Bank Infromation
        public int BankID { get; set; }
        public string BranchName { get; set; }
        public string IFSCCode { get; set; }
        public bool AccoutType { get; set; }
        public Int64 AccountNo { get; set; }
        public string CustName { get; set; }
        public string BankName { get; set; }
        public int APPID { get; set; }

        public NewPatient SpouseInfo { get; set; }
        public List<DesignEMRVO> PatientAdditionalInformationTemplate { get; set; }
        public int FormId { get; set; }
    }
    public class NewAddress
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public int PatientID { get; set; }
        //  public int PartnrID { get; set; }
        public bool IsPatient { get; set; }
        public bool IsOther { get; set; }
        public bool IsPermenant { get; set; }
        public bool IsSecAddPermenant { get; set; }
        public bool IsCommunication { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Street { get; set; }
        public string Landmark { get; set; }
        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public string Area { get; set; }
        public string Pincode { get; set; }
        public string LandLineNoCode { get; set; }
        public string LandLineNo { get; set; }
    }
    public class NewRefInfo 
    {
        public int ID { get; set; }
        public bool IsReferredPatient { get; set; }
        public int SourceOfReferenceID { get; set; }
        public int CampID { get; set; }
        public int ReferredDoctorID { get; set; }
        public string ReferralRemark { get; set; }
        public NewRefInfo SpouseInfo { get; set; }
    }
    public class NewAddInfo
    {
        public int ID { get; set; }
        public int IdentityID { get; set; }
        public string IdentityNumber { get; set; }
        public int NationalityID { get; set; }
        public int EthnicityID { get; set; }
        public int ReligionID { get; set; }
        public int EducationID { get; set; }
        public int OccupationId { get; set; }
        public int MarriedSince { get; set; }
        public int ExistingChildren { get; set; }
        public Int16 FamilyType { get; set; }
    }
    public class NewInfo
    {
        public int ID { get; set; }
        public int PatientCategoryID { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int GenderID { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int Age { get; set; }
        public int MobCountryCodeID { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public int MaritalStatusID { get; set; }
        public int BloodGroupID { get; set; }
    }
    public class NewBankInfo
    {
        public int BankID { get; set; }
        public string BranchName { get; set; }
        public string IFSCCode { get; set; }
        public bool AccoutType { get; set; }
        public Int64 AccountNo { get; set; }
        public string CustName { get; set; }
        public string BankName { get; set; }


    }

    public class NewAppoinmentInput
    {
        public string doctorFirstName { get; set; }
        public string doctorMiddleName { get; set; }
        public string doctorLastName { get; set; }
        public string timeslots { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public int status { get; set; }


    }
}
