using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.IUI
{
    public class DonorListVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public string MRNo { get; set; }
        public string DonerCode { get; set; }
        public string DonorName { get; set; }
        public string AgencyName { get; set; }
        public bool Synchronized { get; set; }
    }
}
