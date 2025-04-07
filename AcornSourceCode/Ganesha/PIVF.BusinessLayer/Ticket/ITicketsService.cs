using PIVF.Entities.Models;
using Repository.Pattern.Repositories;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Ticket
{
  public interface ITicketsService : IService<Tickets>
    {
        int GetActiveTickets(string userName, string connectionId);
        int CheckForDuplicateTickets(string connectionId, string userName);
        int GetCurrentPatientID(string userName);
    }
}
