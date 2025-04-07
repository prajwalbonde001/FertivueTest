using PIVF.Entities.Models.ARTMgmt.EmbryoTransfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.EmbryoTransfer
{
   public interface EmbryoTransferBAL
    {
        EmbryoTransferVO FillMasters();
        EmbryoTransferVO FillETGrid(long PatientID, long PatientUnitID, long PlanTherapyID, long PlanTherapyUnitID);
        long SaveET(EmbryoTransferVO ETData);
    }
}
