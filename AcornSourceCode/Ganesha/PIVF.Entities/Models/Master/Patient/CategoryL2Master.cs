using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Patient
{
    public class CategoryL2Master : Entity
    {
        [Key]
        public Int32 CatL2ID { get; set; }
        public int CatL1ID { get; set; }
        public string CatL2Code { get; set; }
        public string CatL2Description { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<DateTime> FromDate { get; set; }
        public Nullable<DateTime> ToDate { get; set; }
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
    }
}
