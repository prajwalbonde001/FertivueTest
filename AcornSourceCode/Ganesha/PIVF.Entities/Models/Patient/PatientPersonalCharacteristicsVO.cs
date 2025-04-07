using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Patient
{

    public class PatientPersonalCharacteristicsDetailsVO : PatientPersonalCharacteristicsVO
    {

    }

    public class PatientPersonalCharacteristicsVO
    {
        public long ID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long BuiltID { get; set; }
        public int SkinColorID { get; set; }
        public int HairColorID { get; set; }
        public int EyeColorID { get; set; }
        public string Remarks { get; set; }
        public string AddedBy { get; set; }
        public string UpdatedBy { get; set; }
    }

}
