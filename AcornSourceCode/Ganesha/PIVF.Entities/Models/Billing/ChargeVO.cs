using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Billing
{
   public class ChargeVO
    {
        [Key]
        public int ChargeID { get; set; }
        public int ChargeUnitID { get; set; }
        public long tempChargeID1 { get; set; }
        public long tempChargeUnitID1 { get; set; }        
        public int BillID { get; set; }
        public int BillUnitID { get; set; }
        public DateTime Date { get; set; }
        public int VisitID { get; set; }
        public int VisitUnitID { get; set; }
        public int AdmissionID { get; set; }
        public int AdmissionUnitID { get; set; }
        public int TariffID { get; set; }
        public int ServiceID { get; set; }
        public int ServiceCode { get; set; }   
        public string ServiceName { get; set; } 
        public int ClassID { get; set; }
        public int RefundID { get; set; }
        public decimal TotalRefundAmount { get; set; }
        public bool Status { get; set; }
        public bool IsPackageService { get; set; }
        public int PackageParentID { get; set; }
        public int DoctorID { get; set; }
        public string DoctorName { get; set; }
        public decimal Rate { get; set; }
        public float Quantity { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal ConcessionPercent { get; set; }
        public decimal ConcessionAmount { get; set; }
        public float ServiceTaxPercent { get; set; }
        public decimal ServiceTaxAmount { get; set; }
        public decimal NetAmount { get; set; }
        public decimal PatientAmount { get; set; }
        public decimal SponsorAmount { get; set; }
        public decimal TotalPaidPatientAmount { get; set; }
        public decimal TotalPaidSponsorAmount { get; set; }
        public decimal TotalPatientBalanceAmount { get; set; }
        public decimal TotalSponsorBalanceAmount { get; set; }
        public bool IsCancelled { get; set; }
        public int CancelledBy { get; set; }
        public DateTime CancelledDate { get; set; }
        public string CancellationRemark { get; set; }
        public bool IsBilled { get; set; }
        public bool IsAutoCharge { get; set; }
        public DateTime ConsumeDate { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
       // public bool Synchronized { get; set; }
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
        public decimal TotalServiceTaxAmount { get; set; }
        public bool IsUpdate { get; set; }
        public bool IsSameDate { get; set; }

    }
}
