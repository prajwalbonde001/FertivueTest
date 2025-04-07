using PIVF.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Service.Pattern;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//namespace PIVF.Gemino.BusinessLayer.Master.Clinic
namespace PIVF.BusinessLayer.Master.Clinic
{
    public interface IStaffService : IService<Staff>
    {
        IQueryable<Staff> GetStaffList(int index, string N, int DptID, string mobno, int EID, int DegID, string Qua, string Exp, string EmailID, int MID, int GId, bool PgEn);
        List<Designation> GeDesignationList();
        List<Department> GetDepartmentListForStaff(int UID);
        int InsertUpdateStaff(Staff objDoc);
        Staff GetStaffByID(int StaffID);
        int ActivateDeactivateStaff(int id, bool st, string re);
        List<State> GetStateList(string Filter, int CountryId);
        List<City> GetCityList(string Filter, int StateID);
    }
}
