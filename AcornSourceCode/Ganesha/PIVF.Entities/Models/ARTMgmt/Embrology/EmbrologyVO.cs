using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Embrology
{
    public class EmbrologyVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public long OocyteNumber { get; set; }
        public long SerialOocyteNumber { get; set; }
        public bool Day0 { get; set; }
        public bool Day1 { get; set; }
        public bool Day2 { get; set; }
        public bool Day3 { get; set; }
        public bool Day4 { get; set; }
        public bool Day5 { get; set; }
        public bool Day6 { get; set; }
        public bool Day3Pgt { get; set; }
        public bool Day4Pgt { get; set; }
        public bool Day5Pgt { get; set; }
        public bool Day6Pgt { get; set; }
        public bool Day7Pgt { get; set; }
        public bool LabDay0Freezed { get; set; }
        public string Day0Plan { get; set; }
        public string Day1Plan { get; set; }
        public int Day1Fertilization { get; set; }
        public string Day1Grade { get; set; }    //Added by Nayan Kamble
        public string Day2CellStage { get; set; }
        public string Day2Grade { get; set; }
        public string Day3CellStage { get; set; }
        public string Day3Grade { get; set; }
        public string Day4CellStage { get; set; }
        public string Day4Grade { get; set; }
        public string DayFive { get; set; }
        public string DaySix { get; set; }
        public DayZeroForToolTip ZeroTooltip { get; set; }
        public Boolean IVM { get; set; }
        public int Fertilization { get; set; }
        public int Cleavage { get; set; }
        public Boolean Day1Finalize { get; set; }
        public int Day0PlanID { get; set; }
        public int Day1PlanID { get; set; }
        public int Day2PlanID { get; set; }
        public int Day3PlanID { get; set; }
        public int Day4PlanID { get; set; }
        public int Day5PlanID { get; set; }
        public int Day6PlanID { get; set; }
        public Boolean Day2Finalize { get; set; }
        public Boolean Day3Finalize { get; set; }
        public Boolean Day4Finalize { get; set; }
        public Boolean Day5Finalize { get; set; }
        public Boolean Day6Finalize { get; set; }
        public int Maturity { get; set; }
        public int Day5PGS { get; set; }
        public int Day6PGS { get; set; }
        public int Day3PGS { get; set; }
        public DateTime? Day5PGDPGSDate { get; set; }
        public DateTime? Day6PGDPGSDate { get; set; }
        public DateTime? Day3PGDPGSDate { get; set; }
        public DateTime? Day5PGDPGSTime { get; set; }
        public DateTime? Day6PGDPGSTime { get; set; }
        public DateTime? Day3PGDPGSTime { get; set; }
        public int Day5PGDPGSMethodID { get; set; }
        public int Day6PGDPGSMethodID { get; set; }
        public int Day3PGDPGSMethodID { get; set; }

        public Boolean IsFresh { get; set; }
        public long ExtendTherapyID { get; set; }
        public long ExtendTherapyUnitID { get; set; }
        public string CycleCode { get; set; }
        public string ExtendDay { get; set; }
        public string Day5PGDPGS { get; set; }
        public string Day6PGDPGS { get; set; }
        public string Day3PGDPGS { get; set; }
        public string MasFertilization { get; set; }
        public string MasCellStage { get; set; }
        public string MasNucleoli { get; set; }

        public string PolarBodyDay1Desc { get; set; }
        public string PNDesc { get; set; }
        public string PNSizeDesc { get; set; }
        public string NPBDesc { get; set; }
        public string CytoplasmicHaloDesc { get; set; }
        public string GradeDesc { get; set; }
        public string CleavageDesc { get; set; }
        public string Day2Symmetry { get; set; }
        public string Day2FragmentationDistribution { get; set; }
        public string Day2Nuclei { get; set; }
        public string Day2Plan { get; set; }
        public string Day2Fragmentation { get; set; }
        public string Day3Symmetry { get; set; }
        public string Day3FragmentationDistribution { get; set; }
        public string Day3Nuclei { get; set; }
        public string Day3Plan { get; set; }
        public string Day3Fragmentation { get; set; }
        public string Day4Symmetry { get; set; }
        public string Day4FragmentationDistribution { get; set; }
        public string Day4Nuclei { get; set; }
        public string Day4Plan { get; set; }
        public string Day4Fragmentation { get; set; }
        public string Day5FragmentationDistribution { get; set; }
        public string Day5Plan { get; set; }
        public string Day5Grade { get; set; }
        public string Day6FragmentationDistribution { get; set; }
        public string Day6Plan { get; set; }
        public string Day6Grade { get; set; }
        public string Day5Blastocyst { get; set; }
        public string Day5ICM { get; set; }
        public string Day5TPD { get; set; }
        public string Day6Blastocyst { get; set; }
        public string Day6ICM { get; set; }
        public string Day6TPD { get; set; }
        public bool IsFET { get; set; }
        public bool Donor { get; set; }
        public bool Fresh { get; set; }
        public bool DonorEmb { get; set; }


    }
    public class StimulationForEmbro
    {
        public DateTime? DrugDate { get; set; }
        public DateTime? DrugTime { get; set; }
        public string DrugName { get; set; }
        public string DrugDose { get; set; }
    }

    public class DayWiseInfoForBiopsy
    {
        public string Embryo { get; set; }
        public string Grade { get; set; }
        public string PN { get; set; }
        public string Day { get; set; }
        public string Plans { get; set; }
        public string accession_number { get; set; }
        public string biopsy_id { get; set; }
        public string Stage { get; set; }
        public long SerialOocyteNumber { get; set; }
        public long FemalePatientID { get; set; }
        public long FemalePatientUnitID { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
    }

    public class EmbryoData
    {
        public long ID { get; set; }
        public long? UnitID { get; set; }
        public long? SerialOocyteNumber { get; set; }
        public long? OocyteNumber { get; set; }
        public long? FemalePatientID { get; set; }
        public long? FemalePatientUnitID { get; set; }
        public long? PlanTherapyID { get; set; }
        public long? PlanTherapyUnitID { get; set; }
        public int? Day { get; set; }
        public long? DayID { get; set; }
        public int? EmbryoNo { get; set; }
        public string Monosomy { get; set; } = null;
        public string Trisomy { get; set; } = null;

    }

    public class PGTUserAuth
    {
        public string AccessToken { get; set; }
        public long UserID { get; set; }
        public string AuthorizationCode { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int ResultStatus { get; set; }
        public string AuthUrl { get; set; }
    }

    public class PGTUserAuthAdd
    {
        public long ID { get; set; }
        public long? UnitID { get; set; }
        public string AccessToken { get; set; }
        public long UserID { get; set; }
        public string AuthorizationCode { get; set; }
        public long? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public object RefreshToken { get; set; }
    }

    public class TokenResponse
    {
        [Newtonsoft.Json.JsonProperty("access_token")]
        public string AccessToken { get; set; }
        public object CurlCommand { get; set; }
        public object Error { get; set; }
        public object ErrorDescription { get; set; }
        [Newtonsoft.Json.JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }
        public HttpStatusCode HttpStatusCode { get; set; }
        public object JsonRequest { get; set; }
        [Newtonsoft.Json.JsonProperty("refresh_token")]
        public object RefreshToken { get; set; }
        [Newtonsoft.Json.JsonProperty("token_type")]
        public string TokenType { get; set; }
    }
    public class PGTUserAuthRequest
    {
        public string AccessToken { get; set; }
        public string FemalePatientMRNO { get; set; }
        public DateTime FemaleDOB { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TransferType { get; set; }
        public DateTime BiopsyDate { get; set; }
        public long UserID { get; set; }
        public long EmbryologistID { get; set; }
        public long WitnessID { get; set; }
        public string Phone { get; set; }
        public string SexAssignedAtBirth { get; set; }
        public string DonorType { get; set; }
        public string Karyotype { get; set; }
        public string PatientNotification { get; set; }
        public string MRN { get; set; }
        public string ReturnedMRN { get; set; }
        public Partner Partner { get; set; }
        public string Billing { get; set; }
        public string StateID { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public DateTime EstimatedRetrievalDate { get; set; }
        public string InternationalPatient { get; set; }
        public string RequisiteType { get; set; }
        public string SampleType { get; set; }
        public string FinancingOption { get; set; }
        public int DoctorID { get; set; }
        public int TestIDs { get; set; }

        // ✅ Add missing Sample property
        public List<Sample> Sample { get; set; }

        public bool AllowPNStatus { get; set; }
        public bool AllowTubedSample { get; set; }
    }

    // ✅ Define the Sample class with all required properties
    public class Sample
    {
        public string AccessionNumber { get; set; }
        public string EmbrioId { get; set; }
        public int NumberCells { get; set; }
        public string BiopsyType { get; set; }
        public string PerformedBy { get; set; }
        public DateTime BiopsyDate { get; set; }
        public string EmbryoGrade { get; set; }
        public string TubingBy { get; set; }
        public string WitnessBy { get; set; }
        public DateTime BiopsyRetrievalDate { get; set; }
        public string PnStatus { get; set; }
        public string Culture { get; set; }
    }

    public class Partner
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime? DOB { get; set; }
        public string Karyotype { get; set; }
        public string SexAssignedAtBirth { get; set; }
    }


    public class BarcodeResponse
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("data")]
        public List<string> Data { get; set; }
    }

    public class PGTRequisiteInfo
    {
        public long? ID { get; set; }  // Primary Key
        public int UnitID { get; set; }
        public long? UserID { get; set; }
        public string RequisiteId { get; set; }
        public bool Status { get; set; }
        public long? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDatetime { get; set; }
        public long? UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDatetime { get; set; }
        public string MRN { get; set; }
        public long? PatientId { get; set; }
        public long? PatientUnitId { get; set; }
        public long? TherapyId { get; set; }
        public long? TherapyUnitId { get; set; }
        public string BiopsyAccessionId { get; set; }
    }

    public class PGTBiopsyDetails
    {
        public long ID { get; set; }
        public int UnitID { get; set; }
        public string PgtRequisiteId { get; set; }
        public string BiopsyId { get; set; }
        public string BiopsyAccessionId { get; set; }
        public bool Status { get; set; }
        public string EmbryoId { get; set; }
        public string accessionNumber { get; set; }
    }

    public class PGTBiopsySampleDetails
    {
        public string day { get; set; }

        public long ID { get; set; }
        public int UnitID { get; set; }
        public string PgtRequisiteId { get; set; }
        public string BiopsyId { get; set; }
        public string BiopsyAccessionId { get; set; }
        public bool Status { get; set; }
        public string EmbryoId { get; set; }
        public string accessionNumber { get; set; }
    }
    public class PGTRequisiteDetails
    {
        public string MRNO { get; set; }
        public string RequisiteID { get; set; }
        public long UserID { get; set; }
    }

    public class PGTRequisiteBiopsyDetails
    {
        public long UserID { get; set; }
        public string RequisiteID { get; set; }
        public string MRNO { get; set; }
        public long PatientId { get; set; }
        public long PatientUnitId { get; set; }
        public long TherapyId { get; set; }
        public long TherapyUnitId { get; set; }
        public string BiopsyAccessionID { get; set; }
        public string BiopsyID { get; set; }
        public string EmbryoID { get; set; }
        public string AccessionNumber { get; set; }
    }
}
