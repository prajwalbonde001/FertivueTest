using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Configuration
{
    public class UserRole
    {
        public int RoleId { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }

        private bool _Status = true;
        public bool Status
        {
            get { return _Status; }
            set { _Status = value; }
        }
        public int AddedBy { get; set; }
        public DateTime AddedDateTime { get; set; }
        public int UserID { get; set; }
        public string SelectedMenus { get; set; }
        public int TotalCount { get; set; }
        public long TotalItems { get; set; }
        public Menu objMenu { get; set; }
        public List<UserRole> lstRoles { get; set; }

        public List<Menu> lstMenuForSave { get; set; }

        public bool IsInsertToRoleMaster { get; set; }

        public int SuccessStatus { get; set; }
        //public List<Menu> objSubMenu { get; set; }
        //public List<Menu> objSubModule { get; set; }
        public string ReasonForAD { get; set; }


    }
    public class ClinicList
    {
        public string clinicName { get; set; }
        public bool IsDateValidation { get; set; }
        public int unitID { get; set; }
    }
}
