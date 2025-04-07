using PIVF.Entities.Models.Master.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Master.Inventory
{
    public interface IStoreService
    {
        List<StoreMaster> GetStoreList(StoreMaster obj);
    }
}
