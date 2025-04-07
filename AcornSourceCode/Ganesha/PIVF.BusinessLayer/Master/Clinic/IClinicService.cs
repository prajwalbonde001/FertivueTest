//using PIVF.Gemino.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Clinic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//namespace PIVF.Gemino.BusinessLayer.Master.Clinic
namespace PIVF.BusinessLayer.Master.Clinic
{
    public interface IClinicService
    {
        List<ClinicMaster> GetClinicListForLandingPage(ClinicMaster obj);
        int Modify(ClinicMaster obj);
        int ActivateDeactivateClinic(string[] Clinic);
        List<DepartmentList> GetDepartmentListForUnit(int UnitID);
    }
}
