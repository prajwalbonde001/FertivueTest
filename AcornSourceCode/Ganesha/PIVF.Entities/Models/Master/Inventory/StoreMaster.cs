using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.Inventory
{
    public class StoreMaster : Entity
    {
        [Key]
        public Int32 ID { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public Int32 ClinicId { get; set; }
        public Int32? CostCenterCodeID { get; set; }
        public bool? OpeningBalance { get; set; }
        public bool? Indent { get; set; }
        public bool? Issue { get; set; }
        public bool? ItemReturn { get; set; }
        public bool? GoodsReceivedNote { get; set; }
        public bool? GRNReturn { get; set; }
        public bool? ItemsSale { get; set; }
        public bool? ItemsSaleReturn { get; set; }
        public bool? ExpiryItemReturn { get; set; }
        public bool? ReceiveIssue { get; set; }
        public bool? ReceiveIssueReturn { get; set; }
        public Int32? ParentID { get; set; }
        public bool? status { get; set; }
        public bool? IsCentralStore { get; set; }
        public Int32? CreatedUnitID { get; set; }
        public Int32? UpdatedUnitID { get; set; }
        public Int32? AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public Int32? UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }

        private bool? _Synchronized = false;
        public bool? Synchronized
        {
            get
            {
                return _Synchronized;
            }
            set
            {
                _Synchronized = value;
            }
        }

        public bool? IsQuarantineStore { get; set; }
        public bool IsPagingEnable { get; set; }
        public int Pgindx { get; set; }
        public string SearchExp { get; set; }
        public Int32? StoreType { get; set; }
        public int TotalCount { get; set; }
    }
}
