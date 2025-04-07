using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.MaleHistory
{
    public class SemenThawing
    {
        public long? ThawID { get; set; }
        public long? FreezDetailID { get; set; }
        public long? FreezDetailUnitID { get; set; }
        public long? FreezingID { get; set; }
        public long? FreezingUnitID { get; set; }
        public long? UnitID { get; set; }
        private bool? _IsThaw;
        public bool? IsThaw
        {
            get { return _IsThaw; }
            set
            {
                if (_IsThaw != value)
                {
                    _IsThaw = value;
                }
            }
        }
        public long? PatientID { get; set; }
        public long? PatientUnitID { get; set; }
        //   public long DoctorID { get; set; }
        public string CryoNo { get; set; }
        public DateTime? ThawingDate { get; set; }
        public DateTime? ThawingTime { get; set; }
        public DateTime? SpremFreezingTime { get; set; }
        public bool? Status { get; set; }
        public long? PlanTherapy { get; set; }
        public long? PlanTherapyUnitID { get; set; }
        public long? SpermTypeID { get; set; }
        public string SpermType { get; set; }
        public decimal? GradeA { get; set; }
        public decimal? GradeB { get; set; }
        public decimal? GradeC { get; set; }
        public double? Volume { get; set; }
        public double? RemainingVolume { get; set; }
        public double? OriginalVolume { get; set; }
        public long? SpermCount { get; set; }
        public double? Motility { get; set; }
        public string Comments { get; set; }
        public long? SpermConcentration { get; set; }
        public long? SlowProgressive { get; set; }
        public long RapidProgressive { get; set; }
        public int? NoOfVials { get; set; }
        public int? DoneBy { get; set; }
        public int? CoupleID { get; set; }
        public int? WitnessedBy { get; set; }
        public bool? IsFinalized { get; set; }
        public bool? opened { get; set; }
        public bool? TimeInvalid { get; set; }
        public bool? DateInvalid { get; set; }
        public bool? Invalid { get; set; }
        public bool? IsLinked { get; set; }
        public string SPNo { get; set; }
        public string DoctorName { get; set; }
        public string WitnessName { get; set; }
        public string FormNo { get; set; }
        public long? DonorID { get; set; }
        public long? DonorUnitID { get; set; }
        public bool? IsFromThowing { get; set; }
        public string Cane { get; set; }
        public string Tank { get; set; }
        public string Canister { get; set; }
        public string Straw { get; set; }
        public string WBC { get; set; }
        public string RBC { get; set; }
        public string PusCells { get; set; }
        public string EpithelialCells { get; set; }
    }
}
