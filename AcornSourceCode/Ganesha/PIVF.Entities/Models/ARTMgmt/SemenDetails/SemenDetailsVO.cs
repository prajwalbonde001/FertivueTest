using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;

namespace PIVF.Entities.Models.ARTMgmt.SemenDetails
{
    public class SemenDetailsVO
    {
        //public SemenDetailsVO()
        //{
        //    ListSemenThawing = new List<SemenThawing>();
        //}
        public Nullable<Int32> ID { get; set; }
        public Nullable<Int32> UnitID { get; set; }
        public string MRNo { get; set; }
        public string DonerCode { get; set; }
        public string DonorName { get; set; }
        public Nullable<float> PreVolume { get; set; }
        public Nullable<float> PostVolume { get; set; }
        public Nullable<Int32> PreSpermConcentration { get; set; }
        public Nullable<Int32> PostSpermConcentration { get; set; }
        public Nullable<float> PreSpermCount { get; set; }
        public Nullable<float> PostSpermCount { get; set; }
        public Nullable<float> PreMotility { get; set; }
        public Nullable<float> PostMotility { get; set; }
        public Nullable<Int32> PartnerSpermPreparationMethodID { get; set; }
        public Nullable<Int32> PartnerSpermPreparationMethodUnitID { get; set; }
        public string PartnerSpermPreparationMethod { get; set; }
        public Nullable<Int32> DonorSpermPreparationMethodID { get; set; }
        public Nullable<Int32> DonorSpermPreparationMethodUnitID { get; set; }
        public string DonorSpermPreparationMethod { get; set; }
        public Nullable<bool> IsFinalize { get; set; }
        public Nullable<Int32> CheckedByDoctorID { get; set; }

        //
        public string CryNo { get; set; }
        public string CycleCode { get; set; }
        public string DonorMethodOfSperm { get; set; }
        public Nullable<Int32> DonorMotilityPostWash { get; set; }
        public Nullable<Int32> DonorMotilityPreWash { get; set; }
        public Nullable<Int32> DonorSPPostWash { get; set; }
        public Nullable<Int32> DonorSPPreWash { get; set; }
        public Nullable<float> DonorTCSPostWash { get; set; }
        public Nullable<float> DonorTSCPreWash { get; set; }
        public Nullable<float> DonorVolumePostWash { get; set; }
        public Nullable<float> DonorVolumePreWash { get; set; }
        public string FinalDonorSpermioSRNo { get; set; }
        public Nullable<Int32> InSeminatedByID { get; set; }
        public Nullable<Int32> MotilityPostWash { get; set; }
        public Nullable<Int32> MotilityPreWash { get; set; }
        public Nullable<Int32> PartnerMethodOfSpermID { get; set; }
        public Nullable<Int32> DonorMethodOfSpermID { get; set; }

        public string typeofPartnerSperm { get; set; }

        public string PartnerMethodOfSperm { get; set; }
        public string SNo { get; set; }
        public Nullable<Int32> SPPostWash { get; set; }
        public Nullable<Int32> SPPreWash { get; set; }
        public Nullable<Int32> SourceOfSpermID { get; set; }       
        public Nullable<Int32> TherapyID { get; set; }
        public Nullable<Int32> TherapyUnitID { get; set; }
        public Nullable<Int32> PartnerSpermiogramID { get; set; }
        public Nullable<Int32> PartnerSpermiogramUnitID { get; set; }
        public Nullable<Int32> SelectedDonorID { get; set; }
        public Nullable<Int32> SelectedMRNoOrDonorUnitID { get; set; }
        public string SelectedMRNo { get; set; }
        public string SelectedDonorCode { get; set; }
        public Nullable<int> DonorAsPartnerSpermiogramID { get; set; }
        public Nullable<int> DonorAsPartnerSpermiogramUnitID { get; set; }
        public Nullable<bool> IsPrtnerAsDonor { get; set; }
        //
        public Nullable<float> TCSPostWash { get; set; }
        public Nullable<float> TCSPreWash { get; set; }
        public Nullable<Int32> SelectedMRNoOrDonorID { get; set; }
        public Nullable<DateTime> ThawDate { get; set; }
        public Nullable<DateTime> ThawTime { get; set; }
        public Nullable<float> VolumePostWash { get; set; }
        public Nullable<float> VolumePreWash { get; set; }
        public Nullable<Int32> WitnessByID { get; set; }
        public List<SemenThawing> ListFreezThawSamples = new List<SemenThawing>();
    }
    public class PartnerSperm
    {
        public Nullable<Int32> ID { get; set; }
        public Nullable<Int32> UnitID { get; set; }
        public string SNo { get; set; }
        public Nullable<DateTime> CollectionDate { get; set; }
        public string TypeOfSperm { get; set; }
        public string WitnessedBy { get; set; }
        public string DoneBy { get; set; }
        public bool IsSelected { get; set; }
    }


    public class MalePartnerSperm
    {
        public Nullable<Int32> ID { get; set; }
        public Nullable<Int32> UnitID { get; set; }
        public string SNo { get; set; }
        public Nullable<DateTime> CollectionDate { get; set; }
        public string TypeOfSperm { get; set; }
        public string WitnessedBy { get; set; }
        public string DoneBy { get; set; }
        public bool IsSelected { get; set; }
    }
}
