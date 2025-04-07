using PIVF.Entities.Models.QueueMgt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.QueueMgt
{
    public interface QueueMgtBAL
    {
        List<QueueVO> GetQueueList(string[] Que);
        int CloseVisit(int VID, int UnitId);
        int SaveVisitRemark(string Remark, int VisitID, int UnitID);
    }
}
