using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Lab
{
   public  class clsPathoTestParameterVO
    {
        public long PPPDID { get; set; }
         public long PPPDUnitID { get; set; }
        public long OrderID { get; set; }
        public long OrderUnitID { get; set; }
        public long PathPatientReportID { get; set; }
        public long PathPatientReportUnitID { get; set; }
        public long TestID { get; set; }
        public long ParameterID { get; set; }
        public long CategoryID { get; set; }
        public string Category { get; set; }
        public long SubTestID { get; set; }
        public string ParameterName { get; set; }
        public string ParameterUnit { get; set; }
        public string ParameterPrintName { get; set; }
        public string ResultValue { get; set; }
        public string DefaultValue { get; set; }
        public string NormalRange { get; set; }
        public string HelpValue { get; set; }
        public string SuggetionNote { get; set; }
        public string FootNote { get; set; }
        public string SubTest { get; set; }
        public bool IsNumeric { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public string LoginName { get; set; }
        public double? HighReffValue { get; set; }
        public double? LowReffValue { get; set; }
        public double? UpperPanicValue { get; set; }
        public double? LowerPanicValue { get; set; }
        public string ReferenceRange { get; set; }
        public double? DeltaCheck { get; set; }
        public long ParameterDefaultValueId { get; set; }
        public string Parameter { get; set; }
        public string Unit { get; set; }
        public long PreviousResultValue { get; set; }
        public bool IsFirstLevel { get; set; }
        public bool IsSecondLevel { get; set; }
        public bool IsDefault { get; set; }

    }
}
