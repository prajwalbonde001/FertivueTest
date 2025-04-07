using PIVF.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Clinic;
//using PIVF.Gemino.Service.Pattern;
using Service.Pattern;
using System.Collections.Generic;

//namespace PIVF.Gemino.BusinessLayer.Master.Clinic
namespace PIVF.BusinessLayer.Master.Clinic
{
    public interface IStateService : IService<State>
    {
        IEnumerable<State> StateBySearchtext(string searchtext);
    }
}
