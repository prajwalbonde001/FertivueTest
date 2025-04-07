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
    public class CountryService : Service<Country>, ICountryService
    {
        private readonly IRepositoryAsync<Country> _repository;

        public CountryService(IRepositoryAsync<Country> repository) : base(repository)
        {
            _repository = repository;
        }
        public IEnumerable<Country> CountryBySearchtext()
        {
            throw new NotImplementedException();
        }
    }
}
