using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Inventory
{
    public class clsConversionsVO
    {
        public long ID { get; set; }
        public string Description { get; set; }
        public long ItemId { get; set; }
        public long FromUOMID { get; set; }
        public long ToUOMID { get; set; }
        public float ConversionFactor { get; set; }
        public float MainConversionFactor { get; set; } 
        public string FromUOM { get; set; }
        public string ToUOM { get; set; }
        public List<CommanEntity> UOMConvertList { get; set; }
        public List<clsConversionsVO> UOMConversionList { get; set; }
        
    }
}
