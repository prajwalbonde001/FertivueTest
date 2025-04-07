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
    public interface ICountryService : IService<Country>
    {
        IEnumerable<Country> CountryBySearchtext();
    }
}
