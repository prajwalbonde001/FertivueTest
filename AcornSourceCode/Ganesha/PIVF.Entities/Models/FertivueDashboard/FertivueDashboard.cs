using System.Collections.Generic;


namespace PIVF.Entities.Models.FertivueDashboard
{
    public class Dashboardcount
    {
        public string Label { get; set; }
        public long Data { get; set; }
        public string Value { get; set; }
    }

    public class BarchartData
    {
        public string Dashboard { get; set; }
        public List<long> Data { get; set; }
    }

    public class Trends

    {
        public List<string> BarChart { get; set; }
        public List<BarchartData> BarData { get; set; }
        public List<string> Units { get; set; }
    }

    public class DashboardcountInvestigation
    {
        public int Count { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }
    }

    public class ChartData
    {
        public List<string> Labels { get; set; }
        public List<BarDataset> Datasets { get; set; }
    }

    public class BarDataset
    {
        public List<long> Data { get; set; }
        public string Label { get; set; }
        public string BackgroundColor { get; set; }
        public string BorderColor { get; set; }
        public int BarThickness { get; set; }
        public string HoverBackgroundColor { get; set; }
        public int BorderWidth { get; set; }
        public string HoverBorderColor { get; set; }
    }

    public class PatientList
    {
        public long SrNo { get; set; }
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long GenderID { get; set; }
        public string Gender { get; set; }
        public long PatientCategoryID { get; set; }
        public string PatientCategory { get; set; }
        public string PatientName { get; set; }
        public string MRNo { get; set; }
        public string Contact { get; set; }
        public string ContactNo1 { get; set; }
        public int PartnerID { get; set; }
        public int PartnerUnitID { get; set; }
        public int PartnerGenderID { get; set; }
        public string PartnerGender { get; set; }
        public int PartnerCategoryID { get; set; }
        public string PartnerCategory { get; set; }
        public string PartnerName { get; set; }
        public string PartnerMRNo { get; set; }
        public string PartnerContact { get; set; }
        public long CoupleID { get; set; }
        public long TotalCount { get; set; }
        public int Age { get; set; }

    }

    public class Datasetvo
    {
        public string Label { get; set; }
        public string Value { get; set; }
        public float Percentage { get; set; }
        public string Flag { get; set; }
    }


    public class BillingBarchartData
    {
        public string Dashboard { get; set; }
        public List<float> Data { get; set; }
    }

    public class BillingData

    {
        public List<string> BarChart { get; set; }
        public List<BillingBarchartData> BarData { get; set; }
        public List<string> Units { get; set; }
    }

    public class Billingcount
    {
        public string Label { get; set; }
        public float Data { get; set; }
        public string Value { get; set; }
    }

}