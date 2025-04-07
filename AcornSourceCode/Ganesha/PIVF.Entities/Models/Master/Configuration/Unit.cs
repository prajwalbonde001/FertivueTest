using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Clinic
{
    public class Unit
    {
        [Key]
        public int UnitID { get; set; }
        public string Code { get; set; }
        public string UnitName { get; set; }
    }

    public class UnitRoleID
    {
        public int UnitID { get; set; }
        public int RoleID { get; set; }
    }

    // Begin :: Commented on 10102019 as other class Staff is added at : PIVF.Entities.Models.Master.Clinic/Staff.cs for Staff master merging
    //public class Staff
    //{
    //    public int StaffID { get; set; }
    //    public int DocID { get; set; }
    //    public string FirstName { get; set; }
    //    public string LastName { get; set; }
    //    private string strFullName = "";
    //    public string FullName
    //    {
    //        get { return FullName = FirstName + " " + LastName; }
    //        set
    //        {
    //            if (value != strFullName)
    //            {
    //                strFullName = value;
    //            }
    //        }
    //    }
    //}
    // End :: Commented on 10102019 as other class Staff is added at : PIVF.Entities.Models.Master.Clinic/Staff.cs for Staff master merging
}
