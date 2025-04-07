using PIVF.Entities.Models.MaterialConsumption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.MaterialConsumptionList
{
    public interface MaterialConsumptionListBAL
    {
        List<clsMaterialConsumptionVO> GetMaterialConsupmtionList(string[] ConsupmtionList, int index, bool PgEn);
        List<clsMaterialConsumptionItemDetailsVO> GetMaterialConsumptionItemList(long MaterialConsumptionID, long MaterialConsumptionUnitID);
        UOMConversionVO GetUOMConcersionFactor(long BatchID, long ItemID, long FromUOMID, long ToUOMID);
    }
}
