using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.MaleHistory
{
   public  interface MaleHistoryServiceBAL
    {
        PIVF.Entities.Models.EMR.MaleHistory.MaleHistory SetAllControls(int VID, int uID, int Prev);
        int InsertMaleHistory(PIVF.Entities.Models.EMR.MaleHistory.MaleHistory obj);
        List<HistoryLIst> GetHistoryList();
    }
}
