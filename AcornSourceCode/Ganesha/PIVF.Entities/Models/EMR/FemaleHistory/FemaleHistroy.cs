using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR
{
    public class FemaleHistroy
    {


        public string MHOtherDisease { get; set; }
        public string MHOtherDiseaseRemark { get; set; }
        public Nullable<Int32> MHOtherDiseaseWhenMnth { get; set; } = 0;
        public Nullable<Int32> MHOtherDiseaseWhenYr { get; set; } = 0;
        public Nullable<Int32> CardiacDiseaseOnMedication { get; set; } = 0;



        public Nullable<Int32> IndicationID { get; set; } = 0;
        public Nullable<Int32> SampleTypeID { get; set; } = 0;
        public Nullable<Int32> OHSampleID { get; set; } = 0;
        public string OHMethodology { get; set; }
        public string OHInterpretation { get; set; }
        public string OHResultISCN { get; set; }
        public string OHBandingMethod { get; set; }
        public string OHBandResolution { get; set; }
        public string OHNoKaryotyped { get; set; }
        public string OHCellsAnalysed { get; set; }
        public string OHCellsCounted { get; set; }
        public bool IsKaryotyping { get; set; }
        public int isSurgicalHistory { get; set; }
        public int isPrevFertilityTreatment { get; set; }
        public int isPastFertilityMedication { get; set; }

        public Nullable<Int32> DiabetesOnMedication { get; set; } = 0;
        public Nullable<Int32> ThyroidDisorderOnMedication { get; set; } = 0;
        public Nullable<Int32> MalignancyOnMedication { get; set; } = 0;

        public Nullable<Int32> TuberculosisOnMedication { get; set; } = 0;
        public Nullable<Int32> PelvicInfectionOnMedication { get; set; } = 0;
        public Nullable<Int32> BleedingDisordersOnMedication { get; set; } = 0;
        public Nullable<Int32> EpilepsyOnMedication { get; set; } = 0;
        public Nullable<Int32> HaemoglobinDeficiencyOnMedication { get; set; } = 0;
        public Nullable<Int32> MHOtherDiseaseOnMedication { get; set; } = 0;
        public Nullable<Int32> RespiratoryOnMedication { get; set; } = 0;
        public Nullable<Int32> SLEOnMedication { get; set; } = 0;

        public string RespiratoryRemark { get; set; }
        public Nullable<Int32> RespiratoryID { get; set; } = 0;
        public Nullable<Int32> RespiratorySinceWhenYr { get; set; } = 0;
        public Nullable<Int32> RespiratorySinceWhenMnth { get; set; } = 0;

        public string SLERemark { get; set; }
        public Nullable<Int32> SLEID { get; set; } = 0;
        public Nullable<Int32> SLESinceWhenYr { get; set; } = 0;
        public Nullable<Int32> SLESinceWhenMnth { get; set; } = 0;

        public Int32 FHID { get; set; }
        public Nullable<Int32> RegID { get; set; }
        public Nullable<Int32> RegUnitID { get; set; }
        public Nullable<Int32> VisitID { get; set; }
        public Nullable<Int32> VisitUnitId { get; set; }
        public string Menarche { get; set; }
        public Nullable<DateTime> LMPDate { get; set; }
        public string CycleDuration { get; set; }
        public string MenstrualDays { get; set; }
        public Nullable<Int32> MRegularityID { get; set; }
        public Nullable<Int32> MFlowID { get; set; }
        public Nullable<Int32> DysmennorheaID { get; set; } = 0;
        public Nullable<Int32> IntermBleedID { get; set; } = 0;
        public string HistoryOfRecurrentAbortionID { get; set; }
        public string ObstetricHistoryRemark { get; set; }
        public string IntermBleedDetail { get; set; }
        public Nullable<Int32> AmmenID { get; set; } = 0;
        public string AmmenorheaDetail { get; set; }
        public string RelationShipDuration { get; set; }
        public string TConvieveDuration { get; set; }
        public Nullable<Int32> ContraID { get; set; } = 0;
        public Nullable<Int32> MarriedLifeID { get; set; } = 0;
        public string MarriedLifeRemark { get; set; }
        public Nullable<Int32> FreqOIID { get; set; } = 0;
        public int MethodOfContraception { get; set; } = 0;
        public Nullable<Int32> InferTypeID { get; set; } = 0;
        public bool ISSexualDysfunction { get; set; }
        public string SexualDysDetail { get; set; }
        public bool ISDyspareunia { get; set; }
        public Nullable<Int32> Gravida { get; set; }
        public bool ISHistoryRAbortion { get; set; }
        public string Complications { get; set; }
        public bool IsPelvicSurgery { get; set; }
        public string PelvicSurgeryDetail { get; set; }
        public bool IsLaparoscopy { get; set; }
        public string LaparoscopyDetail { get; set; }
        public bool IsHysteroscopy { get; set; }
        public string HysteroscopyDetail { get; set; }
        public bool ISOtherSurgicalH { get; set; }
        public string OtherSurgicalHDetail { get; set; }
        public bool ISIUI { get; set; }
        public string IUIDetail { get; set; }
        public bool ISIVF { get; set; }
        public string IVFDetail { get; set; }
        public bool ISFET { get; set; }
        public string FETDetail { get; set; }
        public Nullable<Int32> CreatedUnitID { get; set; }
        public Nullable<Int32> UpdatedUnitID { get; set; }
        public Nullable<Int32> AddedBy { get; set; }
        public string AddedOn { get; set; }
        public Nullable<DateTime> AddedDateTime { get; set; }
        public Nullable<DateTime> AddedUTCDateTime { get; set; }
        public Nullable<Int32> UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public Nullable<DateTime> UpdatedDateTime { get; set; }
        public Nullable<DateTime> UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public string ConsanguinityID { get; set; }
        public Nullable<Int32> AgeOfMenarchID { get; set; } = 0;
        public Nullable<Int32> AmmenorheaTypeID { get; set; } = 0;
        public Nullable<Int32> WithdrawlBleedID { get; set; } = 0;
        public string AmenorrheaRemarks { get; set; }
        public Nullable<Int32> MenstrualRegularityID { get; set; } = 0;
        public Nullable<Int32> BloodGroupID { get; set; } = 0;
        public string MenstrualFlowRemark { get; set; }
        public string MenstrualRemarks { get; set; }
        public string InterBleedingRemark { get; set; }
        public Nullable<Int32> InRelationSinceYearsID { get; set; } = 0;
        public Nullable<Int32> InRelationSinceMonthsID { get; set; } = 0;
        public Nullable<Int32> TrayingToConvinceYearsID { get; set; } = 0;
        public Nullable<Int32> TrayingToConvinceMonthsID { get; set; } = 0;
        public Nullable<Int32> DurationYearsID { get; set; } = 0;
        public Nullable<Int32> DurationMonthsID { get; set; } = 0;
        public Nullable<Int32> FemaleInfertilityID { get; set; } = 0;
        public Nullable<Int32> MaleInfertilityID { get; set; } = 0;
        public Nullable<Int32> SexualDysFunctionID { get; set; } = 0;
        public string SexualDysfunctionRemark { get; set; }
        public Nullable<Int32> DyspareuniaID { get; set; } = 0;
        public string DyspareuniaRemark { get; set; }
        public Nullable<Int32> LubricationUsedID { get; set; } = 0;
        public Nullable<Int32> STDID { get; set; } = 0;
        public string LubricationUsedRemark { get; set; }
        public string SexualHistoryRemark { get; set; }
        public bool IsCardiacDisease { get; set; }
     //   public string CardiacDiseaseRemark { get; set; }
        public bool IsDiabetes { get; set; }
       // public string DiabetesRemark { get; set; }
        public string HypertensionRemark { get; set; }
        public bool IsThyroidDisorder { get; set; }
      //  public string ThyroidDisorderRemark { get; set; }
        public bool IsTuberculosis { get; set; }
    //    public string TuberculosisRemark { get; set; }
        public bool IsPelvicInfection { get; set; }
     //   public string PelvicInfectionRemark { get; set; }
        public bool IsBleedingDisorders { get; set; }
        //public string BleedingDisordersRemark { get; set; }
        public bool IsMalignancy { get; set; }
    //    public string MalignancyRemark { get; set; }
        public bool IsOther { get; set; }
        public string OtherRemark { get; set; }
        public string PelvicSurgeryRemark { get; set; }
        public byte[] PelvicSurgeryPhoto { get; set; }
        public string PelvicSurgeryPhotoString { get; set; }
        public string LaparoscopyRemarks { get; set; }
        public byte[] LaparoscopyPhoto { get; set; }
        public string LaparoscopyPhotoString { get; set; }
        public string HysteroscopyRemarks { get; set; }
        public byte[] HysteroscopyPhoto { get; set; }
        public string HysteroscopyPhotoString { get; set; }
        public bool IsSurgivalOther { get; set; }
        public string SurgivalOtherRemarks { get; set; }
        public byte[] SurgivalOtherPhoto { get; set; }
        public string SurgivalOtherPhotoString { get; set; }
        public string AllergiesDrugIds { get; set; }
        public string AllergiesFood { get; set; }
        public string AllergiesOthers { get; set; }
        public bool IsSmoking { get; set; }
        public string SmokingRemarks { get; set; }
        public bool IsAlcohol { get; set; }
        public string AlcoholRemark { get; set; }
        public bool IsTobacco { get; set; }
        public string TobaccoRemark { get; set; }
        public bool IsAddictionsOther { get; set; }
        public string AddictionsOtherRemark { get; set; }
        public bool IsCaffeineAddiction { get; set; }
        public bool IsDrugAddiction { get; set; }
        public bool IsFamilyCardiacDisease { get; set; }
        public string FamilyCardiacDiseaseIds { get; set; }
        public bool IsFamilyDiabetesOther { get; set; }
        public string FamilyDiabetesOtherIds { get; set; }
        public bool IsFamilyHypertension { get; set; }
        public string FamilyHypertensionIds { get; set; }
        public bool IsFamilyThyroidDisorder { get; set; }
        public string FamilyThyroidDisorderIds { get; set; }
        public bool IsFamilyMalignancy { get; set; }
        public string FamilyMalignancyIds { get; set; }
        public bool IsFamilyOther { get; set; }
        public string IsFamilyOtherRemark { get; set; }
        public string FamilyOtherRemarkIds { get; set; }
        public Nullable<Int32> MoodID { get; set; } = 0;
        public Nullable<Int32> SleepID { get; set; } = 0;
        public Nullable<Int32> HeadacheORNauseaID { get; set; } = 0;
        public Nullable<Int32> PersonalityID { get; set; } = 0;
        public Nullable<Int32> StressID { get; set; } = 0;
        public Nullable<Int32> ExerciseID { get; set; } = 0;
        public Nullable<Int32> FreqOfExerciseID { get; set; } = 0;
        public Nullable<Int32> DietID { get; set; } = 0;
        public Nullable<Int32> CaffeinatedBeveragesID { get; set; } = 0;
        public string CaffeinatedBeveragesRemark { get; set; }
        public string SocialRemark { get; set; }
        public bool IsExposureToHevyMetals { get; set; }
        public string ExposureToHevyMetalsRemark { get; set; }
        public bool IsExposureToRadiation { get; set; }
        public string ExposureToRadiationRemark { get; set; }
        public bool IsHypertension { get; set; }
        public bool IsExposureToPesticides { get; set; }
        public bool IsExposureToPollution { get; set; }
        public bool IsOccupationHazords { get; set; }
        public string ExposureToPesticides { get; set; }
        public string ExposureToPollution { get; set; }
        public string OccupationHazords { get; set; }
        public List<ObstetricHistory> ObstetricHistoryItem { get; set; }
        public List<PreviousTreatmentHistory> PrevioustTreatmentHistoryItem { get; set; }
        public List<PastMedicationHistory> PastMedicationHistoryItem { get; set; }
        public List<DrugName> DrugsNameSelected { get; set; }
        public List<DrugName> DiseaseRelationSelected { get; set; }
        public List<DrugName> DiabetesRelationSelected { get; set; }
        public List<DrugName> HypertensionRelationSelected { get; set; }
        public List<DrugName> ThyroidDisorderRelationSelected { get; set; }
        public List<DrugName> MalignancyRelationSelected { get; set; }
        public List<DrugName> OtherRelationSelected { get; set; }
        public PelvicSurgery PelvicSurgery { get; set; }
        public Laparoscopy Laparoscopy { get; set; }
        public Hysteroscopy Hysteroscopy { get; set; }
        public SurgivalOther SurgivalOther { get; set; }
        public List<model> PelvicSurgeryImages { get; set; }
        public List<model> LaparoscopyImages { get; set; }
        public List<model> HysteroscopyImages { get; set; }
        public List<model> SurgivalOtherImages { get; set; }
        public List<AllergyDetail> lstAllergyDetail { get; set; }
        public List<AdictionDetail> lstAdictionDetail { get; set; }
        //Medical history
        //start
        public List<FamilyHistory> FamilyHistoryItem { get; set; }

        public List<SurgicalHistory> SurgicalHistoryItem { get; set; }



        public Nullable<Int32> CardiacDiseaseID { get; set; } = 0;
        //public string CardiacDiseaseWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> CardiacDiseaseWhen { get; set; }   

        //added by neena
        // public Nullable<Int32> CardSinceWhenMnth { get; set; }
        public Nullable<DateTime> CardSinceWhenMnth { get; set; }
        public Nullable<Int32> CardSinceWhenYr { get; set; } 

        public Nullable<DateTime> MalignancySinceWhenMnth { get; set; } 
        public Nullable<Int32> MalignancySinceWhenYr { get; set; } 

        public Nullable<DateTime> TuberculosisSinceWhenMnth { get; set; }
        public Nullable<Int32> TuberculosisSinceWhenYr { get; set; } 

        public Nullable<DateTime> PelvicInfectionSinceWhenMnth { get; set; }
        public Nullable<Int32> PelvicInfectionSinceWhenYr { get; set; } 

        public Nullable<DateTime> BleedingDisordersSinceWhenMnth { get; set; } 
        public Nullable<Int32> BleedingDisordersSinceWhenYr { get; set; }

        //
        public string CardiacDiseaseRemark { get; set; }

        public Nullable<Int32> DiabetesID { get; set; } = 0;
    
        public string DiabetesRemark { get; set; }
        public Nullable<Int32> ThyroidDisorderID { get; set; } = 0;
      
        public string ThyroidDisorderRemark { get; set; }
        public Nullable<Int32> MalignancyID { get; set; } = 0;

        //public string MalignancyWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime>  MalignancyWhen { get; set; }
        public string MalignancyRemark { get; set; }

        public Nullable<Int32> TuberculosisID { get; set; } = 0;
        //public string TuberculosisWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> TuberculosisWhen { get; set; }
        public string TuberculosisRemark { get; set; }
        public Nullable<Int32> PelvicInfectionID { get; set; } = 0;
        //public string PelvicInfectionWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> PelvicInfectionWhen { get; set; }
        public string PelvicInfectionRemark { get; set; }
        public Nullable<Int32> BleedingDisordersID { get; set; } = 0;
        //public string BleedingDisordersWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> BleedingDisordersWhen { get; set; }
        public string BleedingDisordersRemark { get; set; }
        public Nullable<Int32> EpilepsyID { get; set; } = 0;
        public Nullable<Int32> EpilepsySinceWhenMnth { get; set; } 
        public Nullable<Int32> EpilepsySinceWhenYr { get; set; } 
        public Nullable<Int32> DiabetesSinceWhenMnth { get; set; }
        public Nullable<Int32> DiabetesSinceWhenYr { get; set; } 
        public Nullable<Int32> ThyroidDisorderSinceWhenMnth { get; set; }
        public Nullable<Int32> ThyroidDisorderSinceWhenYr { get; set; }
        public string EpilepsyRemark { get; set; }

        public Nullable<Int32> HaemoglobinDeficiencyID { get; set; } = 0;
        public double HaemoglobinDeficiencyValue { get; set; }
        public string HaemoglobinDeficiencyRemark { get; set; }

        public bool IsATT { get; set; }
        public bool IsChickenpox { get; set; }
        public bool IsHepatitisA { get; set; }
        public bool IsHepatitisB { get; set; }
        public bool IsInfluenza { get; set; }
        public bool IsMMR { get; set; }

        public bool IsPolio { get; set; }
        public bool IsTetanus { get; set; }
        public bool IsCervicalCancer { get; set; }


        public Nullable<DateTime> ATTDate { get; set; }
        public Nullable<DateTime> ChickenpoxDate { get; set; }
        public Nullable<DateTime> HepatitisADate { get; set; }
        public Nullable<DateTime> HepatitisBDate { get; set; }
        public Nullable<DateTime> InfluenzaDate { get; set; }
        public Nullable<DateTime> MMRDate { get; set; }
        public Nullable<DateTime> PolioDate { get; set; }
        public Nullable<DateTime> TetanusDate { get; set; }
        public Nullable<DateTime> CervicalCancerDate { get; set; }
        public string vaccinationRemark { get; set; }


        public string IsCovidVaccinationDone { get; set; }
        public DateTime ?CovidVaccinationDate1 { get; set; }
        public DateTime ?CovidVaccinationDate2 { get; set; }
        public DateTime ?CovidVaccinationDate3 { get; set; }
        public string CovidVaccinationRemark { get; set; }
        public bool IsRubbelaTestDone { get; set; }
        public DateTime RubbelaTestDate { get; set; }
        public bool IsSmearTestDone { get; set; }
        public DateTime SmearTestDate { get; set; }
        //end

        public Nullable<Int32> MedicationID { get; set; } = 0;

        private string _CapturedBy;
        public string CapturedBy
        {
            get
            {
                if (_CapturedBy != null)
                {
                    if (_CapturedBy.Contains("=="))
                    {
                        return DecryptString(_CapturedBy);
                    }
                    else
                    {
                        return _CapturedBy;
                    }
                }
                else
                {
                    return _CapturedBy;
                }
            }
            set
            {
                if (_CapturedBy != value)
                {
                    _CapturedBy = value;
                }
            }
        }
        public static string DecryptString(string Text)
        {
            string plaintext = "";
            if (!string.IsNullOrEmpty(Text))
            {
                Aes objAes = Create();
                byte[] cipherText = Convert.FromBase64String(Text);
                // Create an Aes object with the specified key and IV.
                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Padding = PaddingMode.PKCS7;
                    aesAlg.Key = objAes.Key;
                    aesAlg.IV = objAes.IV;
                    // Create a decrytor to perform the stream transform.
                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                    // Create the streams used for decryption.
                    using (MemoryStream msDecrypt = new MemoryStream(cipherText))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream and place them in a string.
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
            }
            return plaintext;
        }
        public static Aes Create()
        {
            Aes objAes = Aes.Create();
            //const int Iterations = 300;
            //var keyGenerator = new Rfc2898DeriveBytes(GenericSP.Key, new byte[] { 10, 20, 30, 40, 50, 60, 70, 80 }, Iterations);
            //byte[] Key = keyGenerator.GetBytes(32);
            //objAes.Key = Key;
            //objAes.IV = new byte[128 / 8];
            RijndaelManaged myAlg = new RijndaelManaged();
            byte[] salt = Encoding.ASCII.GetBytes(Key);
            Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(Key, salt);
            objAes.Key = key.GetBytes(myAlg.KeySize / 8);
            objAes.IV = key.GetBytes(myAlg.BlockSize / 8);
            return objAes;
        }
        static string EDKey = string.Empty;
        public static string Key
        {
            get
            {
                try
                {
                    EDKey = System.Configuration.ConfigurationManager.AppSettings["ED"].ToString();
                }
                catch (ConfigurationErrorsException ex)
                {
                    throw ex;
                }
                return EDKey;
            }
        }
    }

  
      
   
    public class ObstetricHistory
    {
        public Nullable<Int32> ObstetricHistoryID { get; set; }
        public Nullable<Int32> FHID { get; set; }
        public Nullable<Int32> Years { get; set; }
        public Nullable<Int32> ObstetricYearsID { get; set; }
        public Nullable<Int32> GestationWeeksID { get; set; }
        public Nullable<Int32> OutcomeID { get; set; }
        public Nullable<Int32> DeliveryTypeID { get; set; }
        public Nullable<Int32> DeliveryID { get; set; }
        public Nullable<Int32> TypeOfConceivingID { get; set; }
        // public Nullable<decimal> BirthWeight { get; set; }
        public float  BirthWeight { get; set; }
        public Nullable<Int32> ComplicationsID { get; set; }
        public Nullable<Int32> CongenitalAnamolyID { get; set; }
        public string ComplicationDetails { get; set; }
        public string ObstetricRemark { get; set; }
        //Added By Umesh
        public int ChildSexID { get; set; }
        public DateTime? DateOfAbortion { get; set; }
        //Added By Ashish
        public string CongenitalAnamolyRemark { get; set; }
        public string ComplicationsRemark { get; set; }
    }

    public class PreviousTreatmentHistory
    {
        public Nullable<Int32> PreTreatmentID { get; set; }
        public Nullable<Int32> FHID { get; set; }
        public Nullable<Int32> ARTCycleID { get; set; }
        public Nullable<Int32> TreatmentYearsID { get; set; }
        public Nullable<Int32> TreatmentCountsID { get; set; }
        public Nullable<Int32> DrugsID { get; set; }
        public Nullable<Int32> OocytesRetrievedID { get; set; }
        public Nullable<Int32> OocytesFertilizedID { get; set; }
        public Nullable<Int32> EmbryosTransferredID { get; set; }
        public string EmbryosTransferredID1 { get; set; }
        public Nullable<Int32> OocytesCleavedID { get; set; }
        public Nullable<Int32> EmbryosFrozenID { get; set; }
        public Nullable<Int32> SuccessfulID { get; set; }
        public string PreviousTreatmentHistoryRemark { get; set; }
        public string PlaceOfTreatment { get; set; }
        public string DrugName { get; set; }
    }

    public class PastMedicationHistory
    {
        public Nullable<Int32> PastMedicationID { get; set; }
        public Nullable<Int32> FHID { get; set; }
        public string DrugeName { get; set; }
        public string Dose { get; set; }
        public string TimePeriod { get; set; }
        public Nullable<Int32> CalenderID { get; set; }
        public string Remark { get; set; }
        public Nullable<Int32> MedicationStatusID { get; set; }
        public Nullable<Int32> MHID { get; set; }
        public Nullable<bool> IsFromFemaleHistory { get; set; }
        public Nullable<Int32> DrugID{ get; set; }
    }

    public class DrugName
    {
        public int id { get; set; }
    }
    public class DiseaseRelation
    {
        public int id { get; set; }
    }
    public class DiabetesRelation
    {
        public int id { get; set; }
    }
    public class HypertensionRelation
    {
        public int id { get; set; }
    }
    public class ThyroidDisorderRelation
    {
        public int id { get; set; }
    }
    public class MalignancyRelation
    {
        public int id { get; set; }
    }
    public class OtherRelation
    {
        public int id { get; set; }
    }
    public class PelvicSurgery
    {
        public int id { get; set; }
        public List<model> model { get; set; }
    }
    public class Laparoscopy
    {
        public int id { get; set; }
        public List<model> model { get; set; }
    }
    public class Hysteroscopy
    {
        public int id { get; set; }
        public List<model> model { get; set; }
    }
    public class SurgivalOther
    {
        public Nullable<int> id { get; set; }
        public List<model> model { get; set; }
    }
    public class model
    {
        public string name { get; set; }
        public Nullable<double> percent { get; set; }
        public string preview { get; set; }
        public Nullable<int> size { get; set; }
    }

    public class AllergyDetail
    {
        public int DrugID { get; set; }
        public string DrugName { get; set; }
        public int typeofallergyid { get; set; }
        public bool IsDrugAllergy { get; set; }
        public bool IsOtherAlleygy { get; set; }
           
        public int currStatus { get; set; }
        public int AlleSinceYr { get; set; }
        public int AlleSinceMnth { get; set; }
        public string DrugImpact { get; set; }
        public int SeverityID { get; set; }
        public int SinceWhenYr { get; set; }
        public int SinceWhenMnth { get; set; }
        public bool IsAllergy { get; set; }
        public int HID { get; set; }
        public int AllergyID { get; set; }
        public string Food { get; set; }
        public string Skin { get; set; }
        public string Smoke { get; set; }
        public string Latex { get; set; }
        public bool IsFood { get; set; }
        public bool IsSkin { get; set; }
        public bool IsSmoke { get; set; }
        public bool IsLatex { get; set; }
        public string Allergy { get; set; }
    }


    public class AdictionDetail
    {
        public int ID { get; set; }
        public string NoOfCig { get; set; }
        public int currStatus { get; set; }
        //public int SinceYr { get; set; }
        public int FrequencyID { get; set; }
        
        public int Quantity { get; set; }
        public int SinceWhenYr { get; set; }
        public int SinceWhenMnth { get; set; }
        //public bool IsAllergy { get; set; }
        public int HID { get; set; }
        //public int AllergyID { get; set; }
        //public string Food { get; set; }
        //public string Skin { get; set; }
        //public string Smoke { get; set; }
        //public string Latex { get; set; }
        public bool IsSmoking { get; set; }
        public bool IsAlcohol { get; set; }
        public bool IsTobaco { get; set; }
        public bool IsCaffeineAddiction { get; set; }
        public bool IsDrugAddiction { get; set; }
        


        //public bool IsLatex { get; set; }
        //public string Allergy { get; set; }
    }

    public class FamilyHistory
    {
        public int ID { get; set; }
        public Nullable<Int32> FHID { get; set; }
        public Nullable<Int32> MHID { get; set; }
        public Nullable<Int32> TypeOfDiseaseID { get; set; }
        public string TypeOfDisease { get; set; }

        public Nullable<Int32> MaternalPaternalID { get; set; }
        public string MaternalPaternal { get; set; }

        public Nullable<Int32> RelationshipID { get; set; }
        public string Relationship { get; set; }

        public Nullable<Int32> LiveStatusID { get; set; }
        public string LiveStatus { get; set; }

        public string Remark { get; set; }
        public bool IsFromFemaleHistory { get; set; }
        public bool Status { get; set; }
    }

    public class SurgicalHistory
    {
        public int TypeOfSurguryID { get; set; }
        public Nullable<DateTime> SurguryDate { get; set; }
        public string PerformedAtRemark { get; set; }
        public string FindingsRemark { get; set; }
        public string Remark { get; set; }
       public string SHAttachment1 { get; set; }
       // public string SHImage { get; set; }
        public List<model> SHAttachment { get; set; }
        public string SHAttachmentFileName { get; set; }
    }
}
