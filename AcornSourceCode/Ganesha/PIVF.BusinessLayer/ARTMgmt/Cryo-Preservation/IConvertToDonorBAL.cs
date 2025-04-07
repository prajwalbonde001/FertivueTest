using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification;
using PIVF.Entities.Models.Master.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation
{
   public interface IConvertToDonorBAL
    {
        IEnumerable<PatientListVo> GetPatientList(int PageIndex, string NameCodeMRNo);
        long ConvertToDonorPatient(long PatientID, int GenderID);
    }
}
