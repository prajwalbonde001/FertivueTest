using PIVF.Entities.Models.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ItemStock
{
    public interface ItemStockBAL
    {
        int SaveItemStockVO(ItemStockVO obj);
    }
}
