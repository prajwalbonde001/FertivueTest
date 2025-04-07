using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{
    public class PaymentModeValidationVO
    {
        public int PaymentID { get; set; }
        public string Description { get; set; }
        public bool IsNoRequired { get; set; }
        public int NoMaxLength { get; set; }
        public bool IsBankRequired { get; set; }
        public bool IsDateRequired { get; set; }
        public bool IsTransactionIDRequired { get; set; }
        public int TransactionIDMaxLength { get; set; }
        public int PayModeApplicableID { get; set; }
    }
}
