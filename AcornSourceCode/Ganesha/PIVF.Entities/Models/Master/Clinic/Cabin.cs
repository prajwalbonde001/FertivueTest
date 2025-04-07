using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PIVF.Entities.Models.Master.Clinic
{
    public class Cabin : Entity
    {
        [Key]
        public int CabinID { get; set; }
        public string CabinCode { get; set; }
        public string CabinDescription { get; set; }
        public bool? Active { get; set; }
        public int? CreatedUnitID { get; set; }
        public int? UpdatedUnitID { get; set; }
        public int? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }

        private bool? _Synchronized = false;
        public bool? Synchronized
        {
            get
            {
                return _Synchronized;
            }
            set
            {
                _Synchronized = value;
            }
        }
    }
}
