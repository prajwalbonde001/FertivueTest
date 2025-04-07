using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Donor
{
    public class DonorVO
    {
        public long ID { get; set; }
        public long UnitID  { get; set; }
        public string DonorCode  { get; set; }
        public long HeightID  { get; set; }
        public long BuiltID  { get; set; }
        public long SkinColorID  { get; set; } 
        public long HairColorID  { get; set; }
        public long EyeColorID  { get; set; } 
        public long AgencyID  { get; set; }
        public long BloodGroupID  { get; set; }
        public DateTime RegiDate { get; set; }
        public string SkinColor { get; set; }
        public string HairColor { get; set; }
        public string BloodGroup { get; set; }
        public string EyeColor { get; set; }
        public string Height { get; set; }
        public string Built { get; set; }
        public string Agency { get; set; }
        public long AddedUserID { get; set; }
        public long CreatedUnitID   { get; set; }
        public long UpdatedUnitID { get; set; }
        public string AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime   { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn   { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName  { get; set; }
        public bool Synchronized    { get; set; }
        public int TotalRows { get; set; }
        public long EducationID { get; set; }
        
    }
}
