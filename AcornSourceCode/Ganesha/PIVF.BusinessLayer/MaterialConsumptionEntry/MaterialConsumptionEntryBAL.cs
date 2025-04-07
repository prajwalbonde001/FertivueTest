using PIVF.Entities.Models.MaterialConsumption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.MaterialConsumptionEntry
{
    public interface MaterialConsumptionEntryBAL
    {
      int SaveConsumptionDetails(clsMaterialConsumptionVO objMaterialConsumption);
    }
}
