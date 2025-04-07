using PIVF.Entities.Models.ARTMgmt.OPU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.OPU
{
    public interface OPUBAL
    {
        int SaveOPU(OPUVO objOPU);
        TriggrData GetTriggerData();
        OPUVO GetOPUData();
        bool IsStimulationFinalize();
        int IsOPUFinalize();
    }
}
