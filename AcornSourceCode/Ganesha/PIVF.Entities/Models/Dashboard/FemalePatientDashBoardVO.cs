using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Dashboard
{
    public class FemalePatientDashBoardVO
    {
        public DateTime? LMPDate { get; set; }
        public string Diagnosis { get; set; }
        public string CurrentArtType { get; set; }
        public string Protocol { get; set; }
        public string InHouse { get; set; }
        public string TrayingToConvinceYears { get; set; }
        public string TrayingToConvinceMonths { get; set; }
        public string CycleDuration { get; set; }
        public string MenstrualDays { get; set; }

        public string MoleculeName { get; set; }
        public string MenstrualRegularity { get; set; }
        public string FemaleInfertility { get; set; }
        public string MaleInfertility { get; set; }
        public string InfertilityType { get; set; }
        public string OutSide { get; set; }
        public string DonorCode { get; set; }
        public string Indication { get; set; }
        public string CaseSummary { get; set; }
        public string Name { get; set; }
        public string MRNo { get; set; }
        public string RightOvaryCount { get; set; }
        public string LeftOvaryCount { get; set; } 
        public string LeftTube { get; set; }
        public string RightTube { get; set; }
        public string Remark { get; set; }

        public string BloodGroup { get; set; }

        public List<FemaleHistory> FemaleHistoryData = new List<FemaleHistory>();
    }

    public class FemaleHistory
    {
        public string TrayingToConvinceYears { get; set; }
        public string TrayingToConvinceMonths { get; set; }
        public string CycleDuration { get; set; }
        public string MenstrualDays { get; set; }
        public string MenstrualRegularity { get; set; }
        public string FemaleInfertility { get; set; }
        public string MaleInfertility { get; set; }
        public string InfertilityType { get; set; }
    }
}
