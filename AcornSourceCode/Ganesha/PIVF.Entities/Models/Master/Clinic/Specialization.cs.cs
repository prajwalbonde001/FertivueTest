using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIVF.Entities.Models.Master.Clinic
{
    [Table("M_Specialization")]
    public partial class Specialization : Entity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int SID { get; set; }
        public string SCode { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public Int32? CreatedUnitID { get; set; }
        public Int32? UpdatedUnitID { get; set; }
        public Int32? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public Int32? UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool? IsGenerateToken { get; set; }

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
        public virtual ICollection<SubSpecialization> SubSpecializationDetails { get; set; }
    }
}
