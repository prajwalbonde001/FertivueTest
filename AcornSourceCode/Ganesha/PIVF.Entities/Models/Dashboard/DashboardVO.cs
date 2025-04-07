using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Dashboard
{
    public class DashboardVO
    {
        public FemalePatientDashBoardVO objFemale { get; set; }
        public MalePatientDashBoardVO objMale { get; set; }
        public IVFDashPathoDetails objPathoDetails { get; set; }

    }

    public class IVFDashPathoDetails
    {
        public int ID { get; set; }
        public int PatientID { get; set; }
        public int UnitID { get; set; }
        public string FSH { get; set; }
        public DateTime? FSHDate { get; set; }
        public string LH { get; set; }
        public DateTime? LHDate { get; set; }
        public string PRL { get; set; }
        public DateTime? PRLDate { get; set; }
        public string AMH { get; set; }
        public DateTime? AMHDate { get; set; }
        public string TSH { get; set; }
        public DateTime? TSHDate { get; set; }
        public string E2 { get; set; }
        public DateTime? E2Date { get; set; }
        public string BSL { get; set; }
        public DateTime? BSLDate { get; set; }
        public string Insulin { get; set; }
        public DateTime? InsulinDate { get; set; }
        public string GTT { get; set; }
        public DateTime? GTTDate { get; set; }
        public string PapSmear { get; set; }
        public string EndometrialCulture { get; set; }
        public string USG { get; set; }
        public string Laproscopy { get; set; }
        public string Hysteroscopy { get; set; }
        public string HSG { get; set; }

       
    }
}
