using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.MaleHistory
{
    public interface SemenPrepServiceBAL
    {
        int SaveUpdate(SemenPreparation objSemenPrep);
        List<SemenPreparation> GetSemenPreparationList();
        List<SemenPreparation> GetSemenPreparationListForTC();
        List<SemenFreez> GetSemenThawingDetailFromSemenPrepIDForTC(string formNo,string action);
        List<SemenThawing> GetSemenThawingDetailFromSemenPrepIDForTC1(string formNo, string action);        
        SemenPreparation GetSemenProcessingDetailFromSemenPrepIDForTC(string SNo);
        SemenPreparation GetSPDetailsBySNo(string SNo);


    }
}
