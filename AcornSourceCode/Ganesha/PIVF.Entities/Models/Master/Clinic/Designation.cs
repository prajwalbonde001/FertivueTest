//using PIVF.Gemino.Repository.Pattern.Ef6;
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//namespace PIVF.Gemino.Entities.Models.Master.Clinic
namespace PIVF.Entities.Models.Master.Clinic
{
    public class Designation : Entity
    {
        [Key]
        public int DegID { get; set; }
        public string DegCode { get; set; }
        public string Description { get; set; }
        public bool? IsBDM { get; set; }
        public bool? Status { get; set; }
        public int? CreatedUnitID { get; set; }
        public int? UpdatedUnitID { get; set; }
        public int? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
    }
}
