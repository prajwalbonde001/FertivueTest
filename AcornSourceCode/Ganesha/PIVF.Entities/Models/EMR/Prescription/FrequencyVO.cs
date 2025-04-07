using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.Prescription
{
    public class FrequencyVO
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int FreqQuantity { get; set; }
        public bool? Active { get; set; }
    }
}
