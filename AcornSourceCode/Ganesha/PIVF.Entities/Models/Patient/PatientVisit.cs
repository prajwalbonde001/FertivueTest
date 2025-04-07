using PIVF.Entities.Models.Master.Billing;
using PIVF.Entities.Models.Master.Patient;
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PIVF.Entities.Models.Patient
{

    public class PatientVisit
    {
        public Int32 RegID { get; set; }
        public Int32 RegUnitID { get; set; }
        public string PatientData { get; set; }
        public string MRNo { get; set; }
        public string Prefix { get; set; }
        public string PatientFullName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string MStatus { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string AltMobileno { get; set; }
        public byte[] Photo { get; set; }
        public string PhotoString { get; set; }
        public int VTID { get; set; }
        public int CabinID { get; set; }
        public int DeptID { get; set; }
        public int DOCID { get; set; }
        public int ReferredDoctorID { get; set; }
        public int VisitID { get; set; }
        public int VisitUnitId { get; set; }
        public DateTime VisitDate { get; set; }
        public DateTime VisitTime { get; set; }
        public string VisitType { get; set; }
        public string DeptName { get; set; }
        public string Clinic { get; set; }
        public string Remark { get; set; }

        private bool _VisitStatus = true;
        public bool VisitStatus
        {
            get { return _VisitStatus; }
            set { _VisitStatus = value; }
        }
        public string TokenNo { get; set; }
        public int CurrentVisitStatus { get; set; }
        public int VRowsCount { get; set; }

        public List<PatientVisit> lstPatientAutoComplete;

        public List<PatientVisit> lstPatientVisit;

        public List<CategoryL2Master> ListCategory { get; set; }

        public List<CategoryL1Master> ListPatientSource { get; set; }

        public List<Company> ListCompany { get; set; }

        public List<AssociateCompany> ListAssCompany { get; set; }

        public List<TariffMaster> ListTariff { get; set; }

        public List<PatientRelation> ListRelation { get; set; }

        public List<PatientSponser> ListSponser { get; set; }

        public List<PatientSponser> lstSponserForSave { get; set; }
        public List<PatientBankDetail> lstPatientForSave { get; set; }
        public string DocFullName { get; set; }
        public string RefDocFullName { get; set; }
        public float BalancePayment { get; set; }
        public int SuccessStatus { get; set; }
        public int RegType { get; set; }
        public int RegisteredCategory { get; set; }
        public Int32 GenderId { get; set; }
        public string PatientAddress { get; set; }
        public string CommunicationAddress { get; set; }     //Added by Nayan Kamble on 26/11/2019
        public int PatientID { get; set; }
        public int UnitID { get; set; }
        public int BankID { get; set; }
        public string BranchName { get; set; }
        public string IFSCCode { get; set; }
        public bool AccoutType { get; set; }
        public Int64 AccountNo { get; set; }
        public string CustName { get; set; }
        public bool Status { get; set; }
        public string CabinDescription { get; set; }
        public string VisitNotes { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PatientFirstName { get; set; }
        public string MiddleName { get; set; }
        public string PatientMiddleName { get; set; }
        public string PatientLastName { get; set; }
        public string MobileCountryCode { get; set; }
        public string Contact { get; set; }
        public DateTime? DOB { get; set; }
        public int GenderID { get; set; }
        public int APPID { get; set; }
        public bool IsNonRegPatientRedirect { get; set; }
        public int PreviousOutstanding { get; set; }   // -- added BY YogitaK on 20Jan2021::to show patient outstanding on Counter Sale
    }

    public class AssociateCompany
    {
        [Key]
        public int CompAssID { get; set; }
        public string CompAssCode { get; set; }
        public string Description { get; set; }
        public int CompID { get; set; }

    }


    public class PatientBankDetail
    {
        [Key]
        public int PatientID { get; set; }
        public int UnitID { get; set; }
        public int BankID { get; set; }
        public string BranchName { get; set; }
        public string IFSCCode { get; set; }
        public bool AccoutType { get; set; }
        public Int64 AccountNo { get; set; }
        public string CustName { get; set; }
        public bool Status { get; set; }

    }


    public partial class PatientRelation : Entity
    {
        [Key]
        public int RelationId { get; set; }
        public string RelationCode { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public Int32? CreatedUnitID { get; set; }
        public Int32? UpdatedUnitID { get; set; }
        public Int32? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public Int32? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        private bool? _Synchronized = false;

        public bool? Synchronized
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
    }
    public class PatientSponser
    {
        public int PatSponsorID { get; set; }
        public string CatL2Description { get; set; }
        public string CatL1Description { get; set; }
        public string AssComp { get; set; }
        public string Comp { get; set; }
        public string Tariff { get; set; }
        public int SpRowsCount { get; set; }
        public int VisitID { get; set; }
        public int VisitUnitId { get; set; }
        public int CatL1ID { get; set; }
        public int CatL2ID { get; set; }
        public int CompID { get; set; }
        public int CompAssID { get; set; }
        public float CreditLimit { get; set; }
        public DateTime? VFromDate { get; set; }
        public DateTime? VToDate { get; set; }
        public int TID { get; set; }
        public bool IsStaffDiscount { get; set; }
        public int RelationId { get; set; }
        public string Remark { get; set; }
        private bool _SponserStatus = true;
        public bool SponserStatus
        {
            get { return _SponserStatus; }
            set { _SponserStatus = value; }
        }
        public string Relation { get; set; }
    }
}
