using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.KPI
{
    public class KPIVO
    {
        public string Labels { get; set; }
        public int Data { get; set; }
        public int Total { get; set; }
        public int Success { get; set; }
      
       
    }
    public class KPITotalVO
    {
        public Nullable<Int32> Success { get; set; }
        public Nullable<Int32> Total { get; set; }
        public Nullable<Int32> data { get; set; }
        public string label { get; set; }
    }
    public class KPIPDFVO
    {
        public string Image { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string reportType { get; set; }
        public int AgeMin { get; set; }
        public int AgeMax { get; set; }
        public int clinicID { get; set; }
        public List<KPITotalVO> KPIInsertData { get; set; }

    }
    public class ManagementData
    {
        public ClinicWiseRate ClinicWiseRate { get; set; }
        public SuccessRate SuccessRate { get; set; }

    }
    public class DoctorWiseComparasion
    {

        public List<DoctorWise> DoctorWise { get; set; }
        public List<DoctorDetails> DoctorDetails { get; set; }

    }
    public class DoctorDetails
    {
        public string Name { get; set; }
        public int UnitID { get; set; }
        public int UserID { get; set; }
    }

    public class CumulativeCases
    {
        public int Fresh { get; set; }
        public int Frozen { get; set; }
        public int UnitID { get; set; }

    }
    public class ImageObj
    {
        public string Image { get; set; }

    }

    public class DoctorWise
    {
        public double Total { get; set; }
        public string Name { get; set; }
        public int UnitID { get; set; }
        public int UserID { get; set; }

    }
    public class OverallSuccessRate
    {
        public double Total { get; set; }
      
        public int UnitID { get; set; }

    }
    public class ClinicWiseRate
    {
        public double PregnacyRateFresh { get; set; }
        public double PregnacyRateFrozen { get; set; }
        public double ImplantationRateFresh { get; set; }
        public double ImplantationRateFrozen { get; set; }
        public int TotalFresh { get; set; }
        public int TotalFrozen { get; set; }

    }
    public class SuccessRate
    {
        public double FertilizationRate { get; set; }
        public double CleavageRate { get; set; }
        public double GoodGradeRate { get; set; }
        public double DegenerationRate { get; set; }
        public double OOCYTERETRIEVALRate { get; set; }

        


    }

}
