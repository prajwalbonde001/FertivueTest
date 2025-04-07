using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.MaleHistory
{
    public interface SemenThawingBAL
    {
        int SaveUpdate(List<SemenThawing> lstSemenThaw);
        List<SemenFreez> GetFreezDetails(string action);
        List<SemenFreez> GetFreezDetailsAfterFinalize(string action,int ID,int UnitID);
        
    }
}
