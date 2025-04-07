using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.MaleHistory
{
    public class SemenPreparation
    {

        public long ID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long VisitID { get; set; }
        public long InSeminationMethodID { get; set; }

        public DateTime? CollectionDate { get; set; }
        public DateTime? TimeRecSampLab { get; set; }
        public DateTime? ThawDate { get; set; }
        public DateTime? IUIDate { get; set; }
        public DateTime? SprermPrepDate { get; set; }

        

      public string MOSSRetrivalDescription { get; set; }
        public long MethodOfCollection { get; set; }
        public string MCDescription { get; set; }
        public long Abstinence { get; set; }
        public string AbstinenceDescription { get; set; }
        public long InSeminatedByID { get; set; }
        public long WitnessByID { get; set; }
        public long DonorID { get; set; }
        public bool ISFromIUI { get; set; }
        public bool CollecteAtCentre { get; set; }
        public bool IsFrozenSample { get; set; }
        public int Color { get; set; }
        public double Quantity { get; set; }
        public double PH { get; set; }
        public DateTime? LiquificationTime { get; set; }
        public bool Viscosity { get; set; }
        public bool Odour { get; set; }
        public int RangeViscosityID { get; set; }
        public double SpermCount { get; set; }
        public double SpermCountPost { get; set; }
        public double PreTotalSpermCount { get; set; }
        public double Motility { get; set; }
        public double MotilityPost { get; set; }
        public double PreNonMotility { get; set; }
        public double PreTotalMotility { get; set; }
        public double PreMotility { get; set; }

        public double MotilityCntPost { get; set; }
        public double MotilityCnt { get; set; }

        public double PreMotilityGradeI { get; set; }
        public double PreMotilityGradeII { get; set; }
        public double PreMotilityGradeIII { get; set; }
        public double PreMotilityGradeIV { get; set; }
        public double PreNormalMorphology { get; set; }
        public double PostSpermCount { get; set; }
        public double PostTotalSpermCount { get; set; }
        public double PostMotility { get; set; }
        public double PostNonMotility { get; set; }
        public double PostTotalMotility { get; set; }
        public double PostMotilityGradeI { get; set; }
        public double PostMotilityGradeII { get; set; }
        public double PostMotilityGradeIII { get; set; }
        public double PostMotilityGradeIV { get; set; }
        public double PostNormalMorphology { get; set; }
        public string FormNo { get; set; }
        public string STNo { get; set; }
        public string RoundCells { get; set; }
        public string PrePusCells { get; set; }
        public string PreRBCells { get; set; }
        public string PreWBCCell { get; set; }
        public string PreEpithelialCells { get; set; }
        public string OtherCells { get; set; }
        public int SampleCollected { get; set; }
        public int FrozenSampleCollected { get; set; }
        public string PostRBCells { get; set; }
        public string PostPusCells { get; set; }
        public string PostWBCCell { get; set; }
        public string PostEpithelialCells { get; set; }
        public string SampleID { get; set; }
        public int CheckedByDoctorID { get; set; }
        public int CommentID { get; set; }
        public bool Status { get; set; }
        public int CreatedUnitID { get; set; }
        public int UpdatedUnitID { get; set; }
        public int AddedBy { get; set; }
        public string AddedOn { get; set; }
        //public DateTime? AddedDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public int PlanTherapyID { get; set; }
        public int PlanTherapyUnitID { get; set; }
        public int BatchID { get; set; }

        public int SlowProgressive { get; set; }
        public int SlowProgressivePost { get; set; }
        public int RapidProgressive { get; set; }
        public int RapidProgressivePost { get; set; }

        public int BatchUnitID { get; set; }
        public string BatchCode { get; set; }
        public string Comment { get; set; }
        public double PreAmount { get; set; }
        public double PostAmount { get; set; }
        public double PreProgMotility { get; set; }
        public double PostProgMotility { get; set; }
        public double PreNormalForms { get; set; }
        public double PostNormalForms { get; set; }
        public DateTime? SprermFreezingDate { get; set; }
        public string InseminatedAmount { get; set; }
        public string MotileSperm { get; set; }
        public double PreNonProgressive { get; set; }
        public double PostNonProgressive { get; set; }
        public double PreNonMotile { get; set; }
        public double PostNonMotile { get; set; }
        public double PreMotileSpermCount { get; set; }
        public double PostMotileSpermCount { get; set; }
        public double TypeOfSpermID { get; set; }
        public string SampleCode { get; set; }
        public string SampleLinkID { get; set; }
        public double UsedPlanTherapyID { get; set; }
        public double UsedPlanTherapyUnitID { get; set; }
        public int SpermTypeID { get; set; }
        public int InSeminationLocationID { get; set; }
        public int PreVolume { get; set; }
        public int PreSpermConcentration { get; set; }
        //Custom Property declare as per UI
        public string GradientUsed { get; set; }
        public string GradientMin { get; set; }
        public string CryNo { get; set; }
        public int? ContrifugedMin { get; set; }
        public int? ContrifugedRpm { get; set; }
        //   public int ContrifugedMl { get; set; }
        public int? WashMediaRpm { get; set; }
        public int? WashMediaMin { get; set; }
        public decimal? WMWashMediMl { get; set; }
        public int? WWashMediaMin { get; set; }
        public int? WMWashMediaRpm { get; set; }
        public int? WMWashMediaMin { get; set; }
        public decimal? SwimUpMl { get; set; }
        public int? SwimUpMin { get; set; }
        public string  SpermNo { get; set; }
        public string Remarks { get; set; }
        public double Volume { get; set; }
        public double VolumePost { get; set; }
        public int SpermConcentration { get; set; }
        public int SpermConcentrationPost { get; set; }
        public int MethodSurgicalSRetrievalID { get; set; }
        public String SNo { get; set; }
        public bool IsFinalized { get; set; }
        public bool IsLinked { get; set; }
        public string SpermDescription { get; set; }
        public string MethodOfSpermPreparation { get; set; }
        public string DoneBy { get; set; }
        public string WitnessedBy { get; set; }
        public int IVFMOSPCode { get; set; }
        public int NoOfVials { get; set; }
        
        public string SPNo { get; set; }
        public string DoctorName { get; set; }
        public string WitnessName { get; set; }
        //rohini
        public int GradeA { get; set; }
        public int GradeAPost { get; set; }
        public int GradeB { get; set; }
        public int GradeBPost { get; set; }
        public int GradeC { get; set; }  //PreTotalMotility,PostTotalMotility
        public int GradeCPost { get; set; }
        public DateTime? ReceivingDate { get; set; }
        public DateTime? ReceivingTime { get; set; }
        public decimal? WashMediMl { get; set; }
        public string Remark { get; set; }
        public DateTime? CollectionTime { get; set; }
        public DateTime? ThawTime { get; set; }
        public DateTime? SprermFreezingTime { get; set; }
        public long MaleVisitID { get; set; }
        public long MaleVisitUnitID { get; set; }
        public bool IsDoner { get; set; }
        public double PreImmotile { get; set; }
        public double PostImmotile { get; set; }
        public double PreProgressive { get; set; }
        public double PostProgressive { get; set; }
    }
}





