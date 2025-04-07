using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Configuration
{
   public class PatientListVo
    {
        public long PatientID { get; set; }
        public string MRNO { get; set; }
        public string PatientName { get; set; }
        public long TotalRecords { get; set; }
        public int GenderID { get; set; }
    }
}
