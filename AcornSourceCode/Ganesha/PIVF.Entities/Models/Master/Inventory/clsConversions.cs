using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Inventory
{
    class clsConversions
    {
        List<clsConversionsVO> UOMConvertList = new List<clsConversionsVO>();
        public List<clsConversionsVO> UOMConvertLIst { get; set; }
        public float CalculatedCF { get; set; }
        public float CalculatedFromCF { get; set; }
        public float CalculatedToCF { get; set; }
        public float ConversionFactor { get; set; }
        public float BaseConversionFactor { get; set; }
        public float MRP { get; set; }
        public float Quantity { get; set; }
        public float BaseRate { get; set; }
        public float BaseMRP { get; set; }
        public float SingleQuantity { get; set; }
        public float MainMRP { get; set; }
        public float MainRate { get; set; }
        public float BaseQuantity { get; set; }





    }
}
