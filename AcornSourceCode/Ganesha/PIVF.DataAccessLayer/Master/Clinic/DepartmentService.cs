using PIVF.BusinessLayer.Master.Clinic;
using PIVF.Entities.Models.Master.Clinic;
using Repository.Pattern.Repositories;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.Master.Clinic
{
    public class DepartmentService : Service<Department>, IDepartmentService
    {

        private readonly IRepositoryAsync<Department> _repository;

        public DepartmentService(IRepositoryAsync<Department> repository) : base(repository)
        {
            _repository = repository;
        }

        public IEnumerable<Department> DepartmentSearchtext(string searchtext)
        {
            throw new NotImplementedException();
        }
    }
}
