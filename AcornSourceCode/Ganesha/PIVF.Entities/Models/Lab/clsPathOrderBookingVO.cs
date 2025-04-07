using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Lab
{
     public class clsPathOrderBookingVO
    {
        public long OrderID { get; set; }
        public long OrderUnitID { get; set; }
        public string OrderNo { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? Time { get; set; }
        public bool SampleType { get; set; }
        public long VisitID { get; set; }
        public long VisitUnitID { get; set; }
         public long PatientId { get; set; }
        public long PatientUnitID { get; set; }
        public long DoneBy { get; set; }
        public long AuthorizedBy { get; set; }

        //public string TestType { get; set; }
        public long Opd_Ipd_External { get; set; }
        public long AdmissionID { get; set; }
        public long AdmissionUnitID { get; set; }
        public long BillID { get; set; }
        public long BillUnitID { get; set; }
        public string BillNo { get; set; }
        public long DoctorID { get; set; }
        public bool IsApproved { get; set; }
        public bool IsDelivered { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsPrinted { get; set; }
        public bool IsOrderGenerated { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsResultEntry { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public string AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public string   AddedWindowsLoginName { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime?  UpdatedUTCDateTime { get; set; }
        public string  UpdatedWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public bool IsExternalPatient { get; set; }
        public long ReferredDoctorID { get; set; }
        public long PathPatientReportID { get; set; }

        // public List<BHCG> lstBHCG = new List<BHCG>();

        public List<clsPathOrderBookingDetailVO> PathoOrderDetailsList = new List<clsPathOrderBookingDetailVO>();
        public List<clsPathPatientReportVO> PathoTestList = new List<clsPathPatientReportVO>();
        public List<clsPathoTestParameterVO> PathoTestListDetails = new List<clsPathoTestParameterVO>();
    }
}
