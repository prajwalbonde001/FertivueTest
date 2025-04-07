using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.UserBL
{
   public interface UserServiceBAL
    {
        List<Unit> GetUnitList();
        List<Unit> GetUnitListLogNameWise(string logName);
        List<Menu> GetGrandParentList();
        List<Menu> GetParentList(int parentid);
        List<Menu> GetClildMenuList(int parentid);
        List<UnitRoleID> GetRoleListUserwise(int UserID);
        int DeleteUnit(int ID, int UnitID);    //Added by Nayan Kamble on 29/11/2019
        List<UserRole> GetRoleList();
        List<UserVO> GetUserList(int index, string Name, string LogName, int UsrType, int UsrRole, bool PgEn);
        UserVO GetUserByID(int id);
        int ActivateDeactivateUser(string[] user);
        int LockUnlockUser(string[] user);
        int LoginNameExists(string logName, int UID);
        List<CommanEntity> GetDocList();
        List<CommanEntity> GetStaffList();
        int SaveUpdateUser(UserVO objUser, DataTable dt);
        List<Menu> GetUserRoleRights();
        void clearSession();

        List<Doctor> GetDocListByDeptID(int ID, DateTime? AppDate); //Added sujata for appointment 8/11/19
    }
}
