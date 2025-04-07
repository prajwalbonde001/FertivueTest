using PIVF.Entities.Models.EMR.FemaleHistory;

using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.FemaleHistory
{
    public interface CorpusLeteumScanBAL
    {
        int SaveOrUpdateCLScan(CorpusLeteumScan obj);   
        List<CorpusLeteumScan> LoadPreviousCorpusLeteumScanData();
        CorpusLeteumScan GetSingleCLScan(int ID);
        List<CommanEntity> LoadCycleCodeList();
    }

  
}
