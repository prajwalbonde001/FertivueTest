using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation
{
  public interface EmbryoThowingBAL
    {
        IEnumerable<EmbryoThowingVO> GetFreezeEmbryo(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID);
        EmbryoThowingVO FillMaster();
        long SaveThawing(List<EmbryoThowingVO> ThawingData);
        IEnumerable<EmbryoThowingVO> GetThawingData(long PatientID, long PatientUnitID,long TherapyID, long TherapyUnitID);
        
    }
}
