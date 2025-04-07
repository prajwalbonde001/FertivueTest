using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Master.IVF
{
    public class ServiceMasterVO
    {
     //   public string ServiceCode { get; set; }
        public string Category { get; set; }
        public int CategoryID { get; set; }
        public int Id { get; set; }
        public int TempID { get; set; }

        private string strServiceCode;
        public string ServiceCode
        {
            get { return strServiceCode; }
            set
            {
                if (value != strServiceCode)
                {
                    strServiceCode = value;
                }

            }
        }

        private string strDescription;
        public string Description
        {
            get { return strDescription; }
            set
            {
                if (value != strDescription)
                {
                    strDescription = value;
                }
            }
        }
        private string _ServiceCodeDesc;
        public string ServiceCodeDesc
        {

            get { return _ServiceCodeDesc = strServiceCode + " " + strDescription; }


            set
            {
                if (value != _ServiceCodeDesc)
                {
                    _ServiceCodeDesc = value;
                }
            }
        }
        public bool chkService { get; set;}
        public int IsPackage { get; set; }
        public int TestID { get; set; }
        public int ServiceID { get; set; }
        public string TestName { get; set; }
        public string IsMarkSurrogate { get; set; }     //Added by Nayan Kamble
        public decimal BaseServiceRate { get; set; }    //Added by Nayan Kamble on 09/01/2020
        public decimal TotalBillAmt { get; set; }   //Added by Nayan Kamble on 09/01/2020
        public decimal TotalPayableAmt { get; set; }  //Added by Nayan Kamble on 09/01/2020
        public decimal TotalConcessionAmt { get; set; }    //Added by Nayan Kamble on 09/01/2020
        public decimal PaidAmount { get; set; }  //Added by Nayan Kamble on 29/01/2020
        public decimal BillBalanceAmount { get; set; }          //Added by Nayan Kamble on 29/01/2020
        public int DoctorID { get; set; }     //Added by Nayan Kamble on 09/01/2020
        public decimal Quantity { get; set; }    //Added by Nayan Kamble on 12/02/2020
        public bool disableDelete { get; set; }   //Added by Nayan Kamble on 26/02/2020
        public bool IsNotFillBaseServiceRate { get; set; }     //Added by Nayan Kamble on 28/02/2020
        public decimal ConcessionPercentage { get; set; }   //Added by Nayan Kamble on 05/02/2020

        public bool RateEditable { get; set; }     //Added by Trupti Musale on 17/01/2025
        public decimal MinRate { get; set; }      //Added by Trupti Musale on 17/01/2025
        public decimal MaxRate { get; set; }     //Added by Trupti Musale on 17/01/2025
    }
}
