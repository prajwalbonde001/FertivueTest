using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models
{
    public class Tickets : Entity
    {
        [Key]
        public int sessionId { get; set; }
        public string userName { get; set; }
        public string ConnectionId { get; set; }
        public string LastUpdate { get; set; }
      //  public int UnitID { get; set; }

    }
}
