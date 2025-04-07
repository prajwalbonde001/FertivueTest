using PIVF.Entities.Models.EMR.FemaleHistory;
using PIVF.Entities.Models.Master.IVF;
using PIVF.Entities.Models.NewART;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.FemaleHistory
{
    public interface FollicularScanBAL
    {
        List<FollicularScan> LoadPreviousFollicularScanData();
        List<DICOMStudies> GetAllDICOMStudies(string RequestForm);
        int SaveOrUpdateFollicularScan(FollicularScan obj);
        FollicularScan GetSingleFollicularScan(int ID);
        List<CommanEntity> LoadCycleCodeList();
    }
}
