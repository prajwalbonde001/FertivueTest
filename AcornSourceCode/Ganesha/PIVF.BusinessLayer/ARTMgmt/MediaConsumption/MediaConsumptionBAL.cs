using PIVF.Entities.Models.ARTMgmt.MediaConsumption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.MediaConsumption
{
    public interface MediaConsumptionBAL
    {
        List<MediaItemVO> GetItemsByClinic(long? UnitID);
        List<MediaConsumptionVO> GetMediaList(string Search);
        int SaveMedia(List<MediaConsumptionVO> ListMedia);
        int SaveFinalizedMedia(List<MediaConsumptionVO> ListMedia);
    }
}
