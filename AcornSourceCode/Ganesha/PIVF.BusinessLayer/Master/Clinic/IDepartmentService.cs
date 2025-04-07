using PIVF.Entities.Models.Master.Clinic;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Master.Clinic
{
    public interface IDepartmentService : IService<Department>
    {
        IEnumerable<Department> DepartmentSearchtext(string searchtext);
    }
}
