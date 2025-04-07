using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.MaleHistory
{
    public class MaleHistory
    {


        public Nullable<Int32> CardiacDiseaseOnMedication { get; set; } = 0;
        public Nullable<Int32> DiabetesOnMedication { get; set; } = 0;
        public Nullable<Int32> ThyroidDisorderOnMedication { get; set; } = 0;
        public Nullable<Int32> MHOtherDiseaseWhenMnth { get; set; } = 0;
        public Nullable<Int32> MalignancyOnMedication { get; set; } = 0;
        public Nullable<Int32> TuberculosisOnMedication { get; set; } = 0;
        public Nullable<Int32> PelvicInfectionOnMedication { get; set; } = 0;
        public Nullable<Int32> BleedingDisordersOnMedication { get; set; } = 0;
        public Nullable<Int32> EpilepsyOnMedication { get; set; } = 0;

        public Nullable<Int32> OrchitisOnMedication { get; set; } = 0;
        public Nullable<Int32> MHOtherDiseaseWhenYr { get; set; } = 0;
        public Nullable<Int32> RespiratorySinceWhenMnth { get; set; } = 0;
        public Nullable<Int32> RespiratoryID { get; set; } = 0;
        public Nullable<Int32> RespiratorySinceWhenYr { get; set; } = 0;
        public Nullable<Int32> SLESinceWhenMnth { get; set; } = 0;
        public string OccupationHazards { get; set; }
        public bool IsOccupationHazards { get; set; }



        public Nullable<Int32> SLEOnMedication { get; set; } = 0;
        public Nullable<Int32> MHOtherDiseaseOnMedication { get; set; } = 0;
        public Nullable<Int32> RespiratoryOnMedication { get; set; } = 0;
        public Nullable<Int32> SLESinceWhenYr { get; set; } = 0;
        public Nullable<Int32> SLEID { get; set; } = 0;
        public string MHOtherDisease { get; set; }
        public string SLERemark { get; set; }
        public string MHOtherDiseaseRemark { get; set; }
        public string RespiratoryRemark { get; set; }

        public Int32 MHID { get; set; }
        public Nullable<Int32> RegID { get; set; }
        public Nullable<Int32> RegUnitID { get; set; }
        public Nullable<Int32> VisitID { get; set; }
        public Nullable<Int32> VisitUnitId { get; set; }
        public string TFPWPartner { get; set; }
        public bool ISSPWPPartner { get; set; }
        public string SPWPPartnerDetail { get; set; }
        public bool ISSurgery { get; set; }
        public string SurgeryDetail { get; set; }
        public bool IsSexDy { get; set; }
        public Nullable<Int32> SexDyID { get; set; }
        public string SexDyDetail { get; set; }
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
        public Nullable<Int32> PWCPYearsID { get; set; }
        public Nullable<Int32> PWCPMonthsID { get; set; }
        public Nullable<Int32> SPWPID { get; set; }
        public string SexualHistoryRemark { get; set; }
        public Nullable<Int32> SexualDysFunctionID { get; set; }
        public Nullable<Int32> EjaculationORErectionID { get; set; }
        public Nullable<Int32> MarriedLifeID { get; set; }
        public Nullable<Int32> BloodGroupID { get; set; }
        public string MarriedLifeRemark { get; set; }
        public string SPWPPRemark { get; set; }
        public bool IsCardiacDisease { get; set; }       
        //   public string CardiacDiseaseRemark { get; set; }
        public bool IsDiabetes { get; set; }
        // public string DiabetesRemark { get; set; }
        public bool IsHypertension { get; set; }
        public string HypertensionRemark { get; set; }
        public bool IsThyroidDisorder { get; set; }
        //  public string ThyroidDisorderRemark { get; set; }
        public bool IsTuberculosis { get; set; }
        // public string TuberculosisRemark { get; set; }
        public bool IsOrchitis { get; set; }
        public string OrchitisRemark { get; set; }
        public bool IsMumps { get; set; }
        public string MumpsRemark { get; set; }
        public bool IsOther { get; set; }
        public string OtherRemark { get; set; }
        public string SurgicalHistoryRemark { get; set; }
        public string PTHistoryRemark { get; set; }
        public string AllergiesDrugIds { get; set; }
        public string AllergiesFood { get; set; }
        public string AllergiesOthers { get; set; }
        public Nullable<Boolean> IsSmoking { get; set; }
        public string SmokingRemarks { get; set; }
        public Nullable<Boolean> IsAlcohol { get; set; }
        public string AlcoholRemark { get; set; }
        public Nullable<Boolean> IsTobacco { get; set; }
        public string TobaccoRemark { get; set; }
        public Nullable<Boolean> IsAddictionsOther { get; set; }
        public string AddictionsOtherRemark { get; set; }

        public Nullable<Boolean> IsDrugAddiction { get; set; }
        public Nullable<Boolean> IsCaffeineAddiction { get; set; }





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
        public Nullable<Int32> MoodID { get; set; }
        public Nullable<Int32> SleepID { get; set; }
        public Nullable<Int32> HeadacheORNauseaID { get; set; }
        public Nullable<Int32> HistoryOfRecurrentAbortionID { get; set; }
        public Nullable<Int32> PersonalityID { get; set; }
        public Nullable<Int32> StressID { get; set; }
        public Nullable<Int32> ExerciseID { get; set; }
        public Nullable<Int32> DietID { get; set; }
        public Nullable<Int32> CaffeinatedBeveragesID { get; set; }
        public string CaffeinatedBeveragesRemark { get; set; }
        public bool IsExposureToHevyMetals { get; set; }
        public string ExposureToHevyMetalsRemark { get; set; }
        public bool IsExposureToRadiation { get; set; }
        public string ExposureToRadiationRemark { get; set; }
        public bool IsUrinationOnstraining { get; set; }
        public string UrinationOnstrainingRemark { get; set; }
        public bool IsDifficultyInVoiding { get; set; }
        public string DifficultyInVoidingRemark { get; set; }
        public bool IsBurningsensation { get; set; }
        public string BurningsensationRemark { get; set; }
        public bool IsUrgencyForUrination { get; set; }
        public string UrgencyForUrinationRemark { get; set; }
        public string SocialHistoryRemark { get; set; }
        public bool IsMaleFinalize { get; set; }
        public List<PastMedicationHistory> PastMedicationHistoryItem { get; set; }

        public List<FamilyHistory> FamilyHistoryItem { get; set; }
        public List<DrugName> DrugsNameSelected { get; set; }
        public List<DrugName> DiseaseRelationSelected { get; set; }
        public List<DrugName> DiabetesRelationSelected { get; set; }
        public List<DrugName> HypertensionRelationSelected { get; set; }
        public List<DrugName> ThyroidDisorderRelationSelected { get; set; }
        public List<DrugName> MalignancyRelationSelected { get; set; }
        public List<DrugName> OtherRelationSelected { get; set; }
        //Medical history
        //start
        public Nullable<Int32> CardiacDiseaseID { get; set; }
        //public string CardiacDiseaseWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> CardiacDiseaseWhen { get; set; } 
        public string CardiacDiseaseRemark { get; set; }

        public Nullable<Int32> DiabetesID { get; set; }

        public string DiabetesRemark { get; set; }
        public Nullable<Int32> ThyroidDisorderID { get; set; }

        public string ThyroidDisorderRemark { get; set; }
        public Nullable<Int32> MalignancyID { get; set; }

        //public string MalignancyWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> MalignancyWhen { get; set; } 
        public string MalignancyRemark { get; set; }

        public Nullable<Int32> TuberculosisID { get; set; }
        //public string TuberculosisWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> TuberculosisWhen { get; set; }
        public string TuberculosisRemark { get; set; }
        public Nullable<Int32> PelvicInfectionID { get; set; }
        //public string PelvicInfectionWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> PelvicInfectionWhen { get; set; }
        public string PelvicInfectionRemark { get; set; }
        public Nullable<Int32> BleedingDisordersID { get; set; }
        //public string BleedingDisordersWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> BleedingDisordersWhen { get; set; }
        public string BleedingDisordersRemark { get; set; }
        public Nullable<Int32> EpilepsyID { get; set; }
        public Nullable<Int32> EpilepsySinceWhenMnth { get; set; }
        public Nullable<Int32> EpilepsySinceWhenYr { get; set; }
        public Nullable<Int32> DiabetesSinceWhenMnth { get; set; }
        public Nullable<Int32> DiabetesSinceWhenYr { get; set; }
        public Nullable<Int32> ThyroidDisorderSinceWhenMnth { get; set; }
        public Nullable<Int32> ThyroidDisorderSinceWhenYr { get; set; }
        public string EpilepsyRemark { get; set; }
        public Nullable<Int32> OrchitisID { get; set; }
        //public string OrchitisWhen { get; set; } //Commented and Modified by AniketK on 23Sept2019
        public Nullable<DateTime> OrchitisWhen { get; set; }
        //bvbvnb
        public int SmokingcurrStatus { get; set; }
        public int SmokingSinceWhenMnth { get; set; }
        public int SmokingSinceWhenYr { get; set; }
        public int SmokingFrequencyID { get; set; }
        public string SmokingNoOfCig { get; set; }
        public int AlcoholcurrStatus { get; set; }
        public int AlcoholSinceWhenMnth { get; set; }
        public int AlcoholSinceWhenYr { get; set; }
        public int AlcoholFrequencyID { get; set; }
        public string AlcoholQuantity { get; set; }

        public int TobacocurrStatus { get; set; }
        public int TobacoSinceWhenMnth { get; set; }
        public int TobacoSinceWhenYr { get; set; }
        public int TobacoFrequencyID { get; set; }
        public string TobacoQuantity { get; set; }


        //added by mayur
        public int DrugAddictioncurrStatus { get; set; }
        public int DrugAddictionSinceWhenMnth { get; set; }
        public int DrugAddictionSinceWhenYr { get; set; }
        public int DrugAddictionFrequencyID { get; set; }
        public string DrugAddictionQuantity { get; set; }

        public int CaffeineAddictioncurrStatus { get; set; }
        public int CaffeineAddictionSinceWhenMnth { get; set; }
        public int CaffeineAddictionSinceWhenYr { get; set; }
        public int CaffeineAddictionFrequencyID { get; set; }
        public string CaffeineAddictionQuantity { get; set; }
        
        public string IsCovidVaccinationDone { get; set; }
        public DateTime ?CovidVaccinationDate1 { get; set; }
        public DateTime ?CovidVaccinationDate2 { get; set; }
        public DateTime ?CovidVaccinationDate3 { get; set; }
        public string CovidVaccinationRemark { get; set; }

        private string _CapturedBy;
        public List<AllergyDetail> lstAllergyDetail { get; set; }

        public int isSurgicalHistory { get; set; }
        public int isPastFertilityMedication { get; set; }

        public List<SurgicalHistory> SurgicalHistoryItem { get; set; }
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

    public class PastMedicationHistory
    {
        public int PastMedicationID { get; set; }
        public Nullable<Int32> FHID { get; set; }
        public string DrugeName { get; set; }
        public string Dose { get; set; }
        public string TimePeriod { get; set; }
        public Nullable<Int32> CalenderID { get; set; }
        public string Remark { get; set; }
        public Nullable<Int32> MedicationStatusID { get; set; }
        public Nullable<Int32> MHID { get; set; }
        public bool IsFromFemaleHistory { get; set; }
        public Nullable<Int32> DrugID { get; set; }
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
    public class model1
    {
        public string name { get; set; }
        public Nullable<double> percent { get; set; }
        public string preview { get; set; }
        public Nullable<int> size { get; set; }
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
        public List<model1> SHAttachment { get; set; }
        public string SHAttachmentFileName { get; set; }
    }



}
