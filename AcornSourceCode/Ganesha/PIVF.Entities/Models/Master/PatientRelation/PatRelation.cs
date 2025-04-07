using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Pattern.Ef6;
using System.ComponentModel.DataAnnotations;

namespace PIVF.Entities.Models.Master.PatientRelation
{
    public partial class PatRelation:Entity
    {
        [Key]
        public int RelationId { get; set; }
        public string RelationCode { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public Int32? CreatedUnitID { get; set; }
        public Int32? UpdatedUnitID { get; set; }
        public Int32? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public Int32? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        // public bool? Synchronized { get;  }


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
