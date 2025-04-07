using PIVF.BusinessLayer.Master.Clinic;
using PIVF.Entities.Models.Master.Clinic;
//using PIVF.Gemino.BusinessLayer.Master.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Repository.Pattern.Repositories;
using Repository.Pattern.Repositories;
//using PIVF.Gemino.Service.Pattern;
using Service.Pattern;
using System;
using System.Collections.Generic;

//namespace PIVF.Gemino.DataAccessLayer.Master.Clinic
namespace PIVF.DataAccessLayer.Master.Clinic
{
    public class StateService : Service<State>, IStateService
    {
        private readonly IRepositoryAsync<State> _repository;

        public StateService(IRepositoryAsync<State> repository) : base(repository)
        {
            _repository = repository;
        }
        public IEnumerable<State> StateBySearchtext(string searchtext)
        {
            throw new NotImplementedException();
        }
    }
}
