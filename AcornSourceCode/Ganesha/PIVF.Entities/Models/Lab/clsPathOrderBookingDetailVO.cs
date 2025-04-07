using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Lab
{
     public class clsPathOrderBookingDetailVO
    {
       
        public long OrderDetailsID { get; set; }
        public long OrderDetailsUnitID { get; set; }
        public long OrderID { get; set; }
        public long OrderUnitID { get; set; }
        public DateTime? Date { get; set; }
        public string MachineName { get; set; }
        //public string PatientName { get; set; }
        public long MachineID { get; set; }
        public long TestID { get; set; }
        public long ChargeID { get; set; }
        public long ChargeUnitID { get; set; }
        public long TariffID { get; set; }
        public long ServiceID { get; set; }
        public double? TestCharges { get; set; }
        public bool IsEmergency { get; set; }
        public long PathologistID { get; set; }
        public string Specimen { get; set; }
        public string ClinicalNote { get; set; }
        public string SampleNo { get; set; }
        public bool FirstLevel { get; set; }
        public bool SecondLevel { get; set; }
        public bool ThirdLevel { get; set; }
        public bool FirstLevelID { get; set; }
        public bool SecondLevelID { get; set; }
        public bool ThirdLevelID { get; set; }
        public bool IsApproved { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsDelivered { get; set; }
        public bool IsPrinted { get; set; }
        public bool IsResultEntry { get; set; }
        public bool IsOutSourced { get; set; }
        public long ExtAgencyID { get; set; }
        public double? Quantity { get; set; }
         public bool IsSampleCollected { get; set; }
        public DateTime? SampleCollected { get; set; }
        public bool IsSampleDispatched { get; set; }
        public bool IsSampleReceived { get; set; }
        public bool IsFinalized { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
         public string UpdatedWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public DateTime? SampleCollectedDateTime { get; set; }
        public string SampleCollectionCenter { get; set; }
        public DateTime? SampleReceivedDateTime { get; set; }
        public DateTime? EmailDeliverdDateTime { get; set; }
        public DateTime? HandDeliverdDateTime { get; set; }
        public bool IsDeliverdthroughEmail { get; set; }
        public bool IsDirectDelivered { get; set; }
        public DateTime? SampleDispatchDateTime { get; set; }
           public long SampleAcceptRejectStatus { get; set; }
        public DateTime? SampleAcceptDateTime { get; set; }
        public DateTime? SampleRejectDateTime { get; set; }
        public String RejectionRemark { get; set; }
        public bool IsChangedAgency { get; set; }
        public String AgencyChangeReason { get; set; }
        public String AgencyAssignReason { get; set; }
        public bool IsDigitalSignatureRequired { get; set; }
        public long RefDoctorID { get; set; }
        public bool IsCheckedResults { get; set; }
        public long DoctorUserID { get; set; }
        public bool ThirdLevelCheckResult { get; set; }
        public String CheckResultValueMessage { get; set; }
        public String CheckResultValForSecLevel { get; set; }
        public String SampleCollectedBy { get; set; }
        public String SampleDispatchBy { get; set; }
        public String SampleReceiveBy { get; set; }
        public long sampleAcceptRejectBy { get; set; }
        public long ReportDeliveredBy { get; set; }
        public bool IsSendSMS { get; set; }
        public long FastingStatusID { get; set; }
         public String FastingStatusName { get; set; }
        public long CollectionID { get; set; }
        public String CollectionName { get; set; }
        public String CollectionCenter { get; set; }
        public String Gestation { get; set; }
        public long DispatchToID { get; set; }
        public String DispatchToName{ get; set; }
        public long AcceptedOrRejectedByID { get; set; }
        public String AcceptedOrRejectedByName { get; set; }
        public bool IsAccepted { get; set; }
        public bool IsRejected { get; set; }
        public bool IsSubOptimal { get; set; }
         public String Remark { get; set; }
        public bool IsResendForNewSample { get; set; }
         public long FastingStatusHrs { get; set; }
        public String BatchCode { get; set; }
        public DateTime? ResultDateTime { get; set; }
        public String ResultEntryBy { get; set; }
        public String ApproveBy { get; set; }
        public long ApproveByUserID { get; set; }
        public DateTime? ApproveDateTime { get; set; }
        public bool IsSampleGenerated { get; set; }
        public bool IsAutoApproved { get; set; }
        public bool IsServiceRefunded { get; set; }
        public long ResultEntryUserID { get; set; }
        public long AuthUserID { get; set; }
        public long DispatchUserID { get; set; }
        public long CollectedUserID { get; set; }
        public long SampleCollectionLocationID { get; set; }
        public DateTime? ResultEntryDate { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public bool SearchFromDispatch { get; set; }
        public bool SearchFromCollection { get; set; }
        public bool SearchFromReceive { get; set; }
        public bool SeacrhFromAcceptReject { get; set; }
        public bool SearchFromResult { get; set; }
        public bool SearchFromAutoriation { get; set; }
        public bool SearchFromUpload { get; set; }
        public long TestCategoryID { get; set; }

        public long AuthenticationLevel { get; set; }

        public bool CheckExtraCriteria { get; set; }
        public bool CheckSampleType { get; set; }
        public bool SampleType { get; set; }
        public bool CheckUploadStatus { get; set; }
        public bool IsUploaded { get; set; }
        public bool CheckDeliveryStatus { get; set; }
        public bool IsBilled { get; set; }
        public string DispatchBy { get; set; }
        public bool IsDelivered1 { get; set; }
        public long AgencyID { get; set; }
        public bool IsExternalPatient { get; set; }
        public bool IsClosedOrReported { get; set; }
        public long CatagoryID { get; set; }
        public long ServiceTest { get; set; }
        public long SampleCollectionLocation { get; set; }
       public long TotalRows { get; set; }
        public long TotalCount { get; set; }
        public string sortExpression { get; set; }
        public string PatientSearch { get; set; }
        public string TestName { get; set; }
        public string PatientName { get; set; }
        public string MRNo { get; set; }
        public long AuthorizedBy { get; set; }
        public long DoneBy { get; set; }
        // public string CollectionName { get; set; }
        //newly added
        public long SubTestID { get; set; }
        public string Parameter { get; set; }
        public string ParameterName { get; set; }
        public string ParameterUnit { get; set; }
        public string Unit { get; set; }
        public long PreviousResultValue { get; set; }
        public long CategoryID { get; set; }
        public string Category { get; set; }
        public string ResultValue { get; set; }
        public string DefaultValue { get; set; }
        public string NormalRange { get; set; }
        public string HelpValue { get; set; }
        public string VaryingReferences { get; set; }
        public double? HighReffValue { get; set; }
        public double? LowReffValue { get; set; }
        public double? UpperPanicValue { get; set; }
        public double? LowerPanicValue { get; set; }
    }
}
