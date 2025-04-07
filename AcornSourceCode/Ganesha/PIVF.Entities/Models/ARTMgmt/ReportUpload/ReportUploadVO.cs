using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.ReportUpload
{
    public class ReportUploadVO
    {
        public int ID { get; set; }
        public int ImageID {get; set; }
        public int UnitID { get; set; }
        public int PatientID { get; set; }
        public int PatientUnitID { get; set; }
        public int ReportCatID { get; set; }
        public DateTime ReportDate { get; set; }
        public string ReportCategeory { get; set; }
        public string Name { get; set; }
        public string Remark { get; set; }
        public bool IsFinalize { get; set; }
        public bool IsImportant { get; set; }
        public bool IsFromDatabase { get; set; }
        public byte[] Report { get; set; }
        public string strReport { get; set; }
        public int TotalCount { get; set; }
        public string FileName { get; set; }
        public string ResValue { get; set; }
        public DateTime AddedDatetime { get; set; }
        public Nullable<int> ServiceID { get; set; }
        public string IMGPathReport { get; set; }
        //public string ReportImgVirtualDir {get; set; }
        //public string ReportImgIP { get; set; }
        //public string ReportImgSavingLocation { get; set; }
        //public string UpdatedOn { get; set; }
        //public int UpdatedBy { get; set; }
        //public string UpdatedWindowsLoginName { get; set; }
        //public DateTime UpdatedDatetime { get; set; }
    }
}
