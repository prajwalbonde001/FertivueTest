using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.MediaConsumption
{
    public class MediaItemVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public string Code { get; set; }       
        public string ItemName { get; set; }      
        public float MRP { get; set; }      
        public float AvailableStock { get; set; }
        public string UOM { get; set; }
        public long? UOMID { get; set; }
        public float Quantity { get; set; }   
        public string Status { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
