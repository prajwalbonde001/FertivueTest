using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.MaleHistory
{
    public interface SemenPreparationBAL
    {
        int SaveUpdate(SemenPreparation objSemenFreez);
    }
}
