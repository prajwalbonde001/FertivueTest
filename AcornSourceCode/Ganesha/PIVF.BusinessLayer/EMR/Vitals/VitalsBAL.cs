using PIVF.Entities.Models.EMR.Vitals;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.Vitals
{
   public interface VitalsBAL
    {
        long SaveVitals(VitalsVO Data);
        IEnumerable<VitalsVO> GetVitals(long PatientID,long UnitID, int PageIndex);
        long DeleteVitalsWithReason(long ID, long UnitID, string Reason);
    }
}
