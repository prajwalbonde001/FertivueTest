using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Lab
{
    public class clsPathPatientReportVO
    {
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long TestID { get; set; }
        public long CategoryID { get; set; }
        public long AgeInDays { get; set; }
        public long DetailID { get; set; }
        public long ServiceID { get; set; }
        public long PathPatientReportID { get; set; }
        public long PathPatientReportUnitID { get; set; }
        public long OrderID { get; set; }
        public long OrderUnitID { get; set; }
        public long OrderDetailsID { get; set; }
        public long OrderDetailsUnitID { get; set; }
        public string SampleNo { get; set; }
        public DateTime? SampleCollectionTime { get; set; }
        public long PathologistID1 { get; set; }
        public long RefDoctorID { get; set; }
        public string ReferredBy { get; set; }
        public string SourceURL { get; set; }
        public string Parameter { get; set; }
        public long ParameterID { get; set; }

        public string Unit { get; set; }
        public long  Report { get; set; }
        public long LowerPanicValue { get; set; }
        public long UpperPanicValue { get; set; }
        public long PreviousResultValue { get; set; }
        public string Notes { get; set; }
        public string Remarks { get; set; }
        public DateTime?Time { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime?AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public int UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public DateTime?  ResultAddedTime { get; set; }
        public string ResultComment { get; set; }
        public long DocAuthorizationID { get; set; }
        public long  OutServiceRate { get; set; }
        public bool IsFinalized { get; set; }
        public bool IsNumeric { get; set; }
        public string TestName { get; set; }

        public bool IsFirstLevel { get; set; }
        public bool IsSecondLevel { get; set; }
        public bool IsThirdLevel { get; set; }

        public bool IsDoctorAuthorization { get; set; }
        public bool IsAutoApproved { get; set; }

        public DateTime? ResultAddedDate { get; set; }
        public string ApproveBy { get; set; }
        public string VaryingReferences { get; set; }

    }
}
