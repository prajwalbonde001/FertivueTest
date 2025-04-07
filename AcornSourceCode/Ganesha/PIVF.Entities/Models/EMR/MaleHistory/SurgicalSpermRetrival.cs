using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.MaleHistory
{
    public class SurgicalSpermRetrival
    {
        public int SSRID { get; set; }
        public Nullable<Int32> UnitID { get; set; }
        public Nullable<DateTime> SSRDate { get; set; }
        public Nullable<DateTime> SSRTime { get; set; }
        public Nullable<Int32> IndicationID { get; set; }
        public Nullable<Int32> IndicationObstructiveID { get; set; }
        public Nullable<Int32> SpecimenTypeID { get; set; }
        public Nullable<Int32> MethodOfSurgicalSpermRetrivalID { get; set; }
        public Nullable<Int32> SurgonID { get; set; }
        public Nullable<Int32> AnesthetistID { get; set; }
        public Nullable<Int32> AnesthesiaID { get; set; }
        public Nullable<Int32> EmbroylogistID { get; set; }
        public Nullable<Int32> WitnessEmbroylogistID { get; set; }
        public Nullable<Int32> SiteID { get; set; }
        public string RightSpermCount { get; set; }
        public Nullable<Int32> RightMotility { get; set; }
        public string RightRemark { get; set; }
        public string LeftSpermCount { get; set; }
        public Nullable<Int32> LeftMotility { get; set; }
        public string LeftRemark { get; set; }
        public string ComplicationIDs { get; set; }
        public string ComplicationRemark { get; set; }
        public bool IsFinalize { get; set; }
        public string AnesthesiaDescription { get; set; }
        public string SANo { get; set; }   
        public string SiteDescription { get; set; }
        public string WitnessEmbroylogistDescription { get; set; }
        public string EmbroylogistDescription { get; set; }
        public string AnesthetistDescription { get; set; }
        public string SurgonDescription { get; set; }
        public string IndicationObstructiveDescription { get; set; }
        public string MOSSRetrivalDescription { get; set; }
        public string SpecimenDescription { get; set; }
        public string IndicationDescription { get; set; }
        public string SNo { get; set; }
        public List<Complication> ComplicationSelected { get; set; }
        public List<foo> foo { get; set; }
        public List<model> SSRImages { get; set; }

    }

    public class Complication
    {
        public int id { get; set; }
    }
    public class foo
    {
        public int id { get; set; }
        public List<model> model { get; set; }
    }
    public class model
    {
        public string name { get; set; }
        public double percent { get; set; }
        public string preview { get; set; }
        public int size { get; set; }
        public byte[] imageArray { get; set; }
    }
}
