using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Clinic
{
    [Table("M_Classification")]
    public partial class Classification : Entity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CFID { get; set; }
        public string CFCode { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public int? CreatedUnitID { get; set; }
        public int? UpdatedUnitID { get; set; }
        public int? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
    }
}
