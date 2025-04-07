using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation
{
  public interface EmbryoVitrificationBAL
    {
        IEnumerable<FreezeEmbryoVO> GetFreezeEmbryo(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID);
        FreezeEmbryoVO FillMaster();
        long Save(List<FreezeEmbryoVO> EmbryoData);
        long GetFlagISAllEmbryoFreeze(long PatientID, long PatientUnitID, long TherapyID, long TherapyUnitID,int IsFromEmbryology);
        int CheckDuplicateFreezingNo(string Item);

    }
}
