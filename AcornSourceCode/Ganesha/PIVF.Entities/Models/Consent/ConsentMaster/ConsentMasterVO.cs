using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Consent.ConsentMaster
{
    public class ConsentMasterVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; } //for Transaction
        public long TUnitID { get; set; } //for Transaction
        public string Code { get; set; }
        public string Description { get; set; }
        public string TDate { get; set; }
        public string FormDesc { get; set; }
        public string SchemaDesc { get; set; }
        public string HTMLDesc { get; set; }
        public string ModelDesc { get; set; }
        public string Reason { get; set; }       
        public bool Status { get; set; }
        public long TotalRows { get; set; }
        public int ResultStatus { get; set; }
        //common

        public int AddedBy { get; set; }
        public int AddedUnitID { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public int UpdatedBy { get; set; }
        public int UpdatedUnitID { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public List<ConsentLinkDetailsVO> LinkDetails = new List<ConsentLinkDetailsVO>();
    }
}
