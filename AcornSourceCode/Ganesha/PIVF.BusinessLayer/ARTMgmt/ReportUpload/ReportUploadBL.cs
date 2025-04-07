using PIVF.Entities.Models.ARTMgmt.ReportUpload;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.ReportUpload
{
    public interface ReportUploadBL
    {
        int UploadReport(ReportUploadVO obj);
        int MarkImportant(ReportUploadVO obj);
        int DeleteReport(ReportUploadVO obj);
        List<ReportUploadVO> GetReportList(int idx, DateTime? FD, DateTime? TD, int Cat, string NM);
        tmpReport ViewReport(ReportUploadVO obj);
        List<tmpService> fillCatwiseServiceList(int CatID);
        List<tmpService> fillPathoServiceList(int catID, int GenderID);

    }

    public class tmpReport
    {
        public byte[] Report { get; set; }
        public string FileName { get; set; }
        public string strReport { get; set; }
        public string IMGPathReport { get; set; }
        public bool IsFromDatabase {get; set; }

}

    public class tmpService
    {
        public int ServiceID { get; set; }
        public string Service { get; set; }
        public int CatID { get; set; }
    }
}
