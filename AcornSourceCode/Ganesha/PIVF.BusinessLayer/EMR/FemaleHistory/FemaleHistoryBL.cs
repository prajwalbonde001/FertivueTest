using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR;

namespace PIVF.BusinessLayer
{
    public interface FemaleHistoryBL
    {
        FemaleHistroy LoadSpecificFemaleHistory(int HID, int unitID,int Prev);
        int InsertFemaleHistory(FemaleHistroy obj);
        List<HistoryLIst> GetHistoryList();
    }

    public class HistoryLIst
    {
        public int HID { get; set; }
        public int UnitID { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public string CapturedBy { get; set; }
        public int VisitID { get; set; }
        public int VisitunitID { get; set; }
    }
}
