using Repository.Pattern.Ef6;
using System;
using System.ComponentModel.DataAnnotations;

namespace PIVF.Entities.Models.Master.Billing
{
    public partial class TariffMaster : Entity
    {
        [Key]
        public int TID { get; set; }
        public int Pgindx { get; set; }
        public int TotalCount { get; set; }
        public bool IsPagingEnable { get; set; }
        public string TariffCode { get; set; }
        public string tariff { get; set; }
        public string Description { get; set; }
        public string Clinic { get; set; }
        public int UnitID { get; set; }
        public string SelectedServiceRates { get; set; }
        public string SelectedServicesIds { get; set; }
        public string SelectedClassIds { get; set; }
        public string SelectedUnit { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Active { get; set; }
        public bool ticked { get; set; }
        public Int32? CreatedUnitID { get; set; }
        public Int32? UpdatedUnitID { get; set; }
        public Int32? AddedBy { get; set; }
        public string AddedUserName { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public Int32? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
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

        public string TariffType { get; set; }

        #region <Servicinfo Get set Method>
        public string ServiceCode { get; set; }
        public string ServiceName { get; set; }
        public string SubSpecialization { get; set; }
        public string Specialization { get; set; }
        public float Rate { get; set; }
        public float NewRate { get; set; }
        public int SerID { get; set; }
        public string ClassDescription { get; set; }
        public int ClassID { get; set; }
        public int SuID { get; set; }
        public int SID { get; set; }
        #endregion
    }
}
