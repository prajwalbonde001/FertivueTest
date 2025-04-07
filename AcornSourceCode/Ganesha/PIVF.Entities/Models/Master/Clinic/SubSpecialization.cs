using Repository.Pattern.Ef6;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIVF.Entities.Models.Master.Clinic
{
    [Table("M_SubSpecialization")]
    public partial class SubSpecialization : Entity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Int32 SuID { get; set; }
        public string SubCode { get; set; }
        public Int32 SID { get; set; }

        public string Description { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public Nullable<DateTime> AddedDateTime { get; set; }
        public Nullable<DateTime> AddedUTCDateTime { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public Nullable<DateTime> UpdatedDateTime { get; set; }
        public Nullable<DateTime> UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public Nullable<bool> Synchronized { get; set; }

        [ForeignKey("SID")]
        public virtual Specialization Specialization { get; set; }
    }
}
