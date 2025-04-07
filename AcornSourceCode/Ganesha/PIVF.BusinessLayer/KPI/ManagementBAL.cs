using PIVF.Entities.Models.KPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.KPI
{
    public interface ManagementBAL
    {
        List<CumulativeCases> cumulativeCases(string FromDate, string ToDate);
        DoctorWiseComparasion DoctorWise(string FromDate, string ToDate);

        List<OverallSuccessRate> OverallSuccessRate(string FromDate, string ToDate);
        ManagementData ClinicWise(string FromDate, string ToDate,int UnitID);

        int ManagementCumulativeCasePDF(List<CumulativeCases> Obj);
        int ManagementPDFImage(ImageObj url,int ReportType);
        int ManagementPDFClinicWise(ManagementData Obj);
        int ManagementPDFDoctorWise(List<DoctorWise> Obj);
    }
}
