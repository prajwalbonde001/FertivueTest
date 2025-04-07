using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.BusinessLayer;
//using PIVF.ValueObjects.FemaleHistory;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.Entities.Models.EMR;

namespace PIVF.DataAccessLayer
{
    public class FemaleHistoryServiceDAL : FemaleHistoryBL
    {
        private Database dbServer = null;
        IDbConnection con;
        public FemaleHistoryServiceDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public int InsertFemaleHistory(FemaleHistroy obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "InsertFemaleHistroy");
            Param.Add("@FHID", obj.FHID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);

            Param.Add("@ConsanguinityID", obj.ConsanguinityID == null ? 0 : Convert.ToInt32(obj.ConsanguinityID));
            Param.Add("@AgeOfMenarchID", obj.AgeOfMenarchID == null ? 0 : Convert.ToInt32(obj.AgeOfMenarchID));
            Param.Add("@LMPDate", obj.LMPDate); //obj.LMPDate == null ? null :
            Param.Add("@AmmenID", obj.AmmenID == null ? 0 : Convert.ToInt32(obj.AmmenID));
            Param.Add("@AmmenorheaTypeID", obj.AmmenorheaTypeID == null ? 0 : Convert.ToInt32(obj.AmmenorheaTypeID));
            Param.Add("@WithdrawlBleedID", obj.WithdrawlBleedID == null ? 0 : Convert.ToInt32(obj.WithdrawlBleedID));
            Param.Add("@AmenorrheaRemarks", obj.AmenorrheaRemarks);
            Param.Add("@CycleDuration", obj.CycleDuration);
            Param.Add("@MenstrualDays", obj.MenstrualDays);
            Param.Add("@MenstrualRegularityID", obj.MenstrualRegularityID == null ? 0 : Convert.ToInt32(obj.MenstrualRegularityID));
            Param.Add("@BloodGroupID", obj.BloodGroupID == null ? 0 : Convert.ToInt32(obj.BloodGroupID));
            Param.Add("@MFlowID", obj.MFlowID == null ? 0 : Convert.ToInt32(obj.MFlowID));
            Param.Add("@MenstrualFlowRemark", obj.MenstrualFlowRemark);
            Param.Add("@InterBleedingRemark", obj.InterBleedingRemark);
            Param.Add("@DysmennorheaID", obj.DysmennorheaID == null ? 0 : Convert.ToInt32(obj.DysmennorheaID));
            Param.Add("@IntermBleedID", obj.IntermBleedID == null ? 0 : Convert.ToInt32(obj.IntermBleedID));
            Param.Add("@MenstrualRemarks", obj.MenstrualRemarks);
            Param.Add("@InRelationSinceYearsID", obj.InRelationSinceYearsID == null ? 0 : Convert.ToInt32(obj.InRelationSinceYearsID));
            Param.Add("@InRelationSinceMonthsID", obj.InRelationSinceMonthsID == null ? 0 : Convert.ToInt32(obj.InRelationSinceMonthsID));
            Param.Add("@TrayingToConvinceYearsID", obj.TrayingToConvinceYearsID == null ? 0 : Convert.ToInt32(obj.TrayingToConvinceYearsID));
            Param.Add("@TrayingToConvinceMonthsID", obj.TrayingToConvinceMonthsID == null ? 0 : Convert.ToInt32(obj.TrayingToConvinceMonthsID));
            Param.Add("@ContraID", obj.ContraID == null ? 0 : Convert.ToInt32(obj.ContraID));
            Param.Add("@MarriedLifeID", obj.MarriedLifeID == null ? 0 : Convert.ToInt32(obj.MarriedLifeID));
            Param.Add("@MarriedLifeRemark", obj.MarriedLifeRemark);
            Param.Add("@MethodOfContraception", obj.MethodOfContraception);
            Param.Add("@DurationYearsID", obj.DurationYearsID == null ? 0 : Convert.ToInt32(obj.DurationYearsID));
            Param.Add("@DurationMonthsID", obj.DurationMonthsID == null ? 0 : Convert.ToInt32(obj.DurationMonthsID));
            Param.Add("@InferTypeID", obj.InferTypeID == null ? 0 : Convert.ToInt32(obj.InferTypeID));
            Param.Add("@FemaleInfertilityID", obj.FemaleInfertilityID == null ? 0 : Convert.ToInt32(obj.FemaleInfertilityID));
            Param.Add("@MaleInfertilityID", obj.MaleInfertilityID == null ? 0 : Convert.ToInt32(obj.MaleInfertilityID));
            Param.Add("@FreqOIID", obj.FreqOIID == null ? 0 : Convert.ToInt32(obj.FreqOIID));
            Param.Add("@SexualDysFunctionID", obj.SexualDysFunctionID == null ? 0 : Convert.ToInt32(obj.SexualDysFunctionID));
            Param.Add("@SexualDysfunctionRemark", obj.SexualDysfunctionRemark);
            Param.Add("@DyspareuniaID", obj.DyspareuniaID == null ? 0 : Convert.ToInt32(obj.DyspareuniaID));
            Param.Add("@DyspareuniaRemark", obj.DyspareuniaRemark);
            Param.Add("@LubricationUsedID", obj.LubricationUsedID == null ? 0 : Convert.ToInt32(obj.LubricationUsedID));
            Param.Add("@STDID", obj.STDID == null ? 0 : Convert.ToInt32(obj.STDID));
            Param.Add("@LubricationUsedRemark", obj.LubricationUsedRemark);
            Param.Add("@SexualHistoryRemark", obj.SexualHistoryRemark);
            Param.Add("@ObstetricHistoryRemark", obj.ObstetricHistoryRemark);

            Param.Add("@HistoryOfRecurrentAbortionID", obj.HistoryOfRecurrentAbortionID == null ? 0 : Convert.ToInt32(obj.HistoryOfRecurrentAbortionID));
            Param.Add("@IsKaryotyping", obj.IsKaryotyping);
            Param.Add("@IndicationID", obj.IndicationID);
            Param.Add("@SampleTypeID", obj.SampleTypeID);
            Param.Add("@OHMethodology", obj.OHMethodology);
            Param.Add("@OHInterpretation", obj.OHInterpretation);
            Param.Add("@OHResultISCN", obj.OHResultISCN);
            Param.Add("@OHSampleID", obj.OHSampleID);
            Param.Add("@OHBandingMethod", obj.OHBandingMethod);
            Param.Add("@OHBandResolution", obj.OHBandResolution);
            Param.Add("@OHNoKaryotyped", obj.OHNoKaryotyped);
            Param.Add("@OHCellsAnalysed", obj.OHCellsAnalysed);
            Param.Add("@OHCellsCounted", obj.OHCellsCounted);

            //START : Medical History


            Param.Add("@IsCardiacDisease", obj.IsCardiacDisease);
            Param.Add("@CardiacDiseaseRemark", obj.CardiacDiseaseRemark);
            Param.Add("@IsDiabetes", obj.IsDiabetes);
            Param.Add("@DiabetesRemark", obj.DiabetesRemark);
            Param.Add("@IsHypertension", obj.IsHypertension);
            Param.Add("@HypertensionRemark", obj.HypertensionRemark);
            Param.Add("@IsThyroidDisorder", obj.IsThyroidDisorder);
            Param.Add("@ThyroidDisorderRemark", obj.ThyroidDisorderRemark);
            Param.Add("@IsTuberculosis", obj.IsTuberculosis);
            Param.Add("@TuberculosisRemark", obj.TuberculosisRemark);
            Param.Add("@IsPelvicInfection", obj.IsPelvicInfection);
            Param.Add("@PelvicInfectionRemark", obj.PelvicInfectionRemark);
            Param.Add("@IsBleedingDisorders", obj.IsBleedingDisorders);
            Param.Add("@BleedingDisordersRemark", obj.BleedingDisordersRemark);
            Param.Add("@IsMalignancy", obj.IsMalignancy);
            Param.Add("@MalignancyRemark", obj.MalignancyRemark);
            Param.Add("@IsOther", obj.IsOther);
            Param.Add("@OtherRemark", obj.OtherRemark);
            //mayur
            Param.Add("@CardiacDiseaseID", obj.CardiacDiseaseID);
            Param.Add("@CardiacDiseaseWhen", obj.CardiacDiseaseWhen);
            //
            //added by neena
            Param.Add("@CardSinceWhenMnth", obj.CardSinceWhenMnth);
            Param.Add("@CardSinceWhenYr", obj.CardSinceWhenYr);
            Param.Add("@MalignancySinceWhenMnth", obj.MalignancySinceWhenMnth);
            Param.Add("@MalignancySinceWhenYr", obj.MalignancySinceWhenYr);
            Param.Add("@TuberculosisSinceWhenMnth", obj.TuberculosisSinceWhenMnth);
            Param.Add("@TuberculosisSinceWhenYr", obj.TuberculosisSinceWhenYr);
            Param.Add("@PelvicInfectionSinceWhenMnth", obj.PelvicInfectionSinceWhenMnth);
            Param.Add("@PelvicInfectionSinceWhenYr", obj.PelvicInfectionSinceWhenYr);
            Param.Add("@BleedingDisordersSinceWhenMnth", obj.BleedingDisordersSinceWhenMnth);

            Param.Add("@CardiacDiseaseOnMedication", obj.CardiacDiseaseOnMedication);

            Param.Add("@DiabetesOnMedication", obj.DiabetesOnMedication);
            Param.Add("@ThyroidDisorderOnMedication", obj.ThyroidDisorderOnMedication);
            Param.Add("@MalignancyOnMedication", obj.MalignancyOnMedication);
            Param.Add("@TuberculosisOnMedication", obj.TuberculosisOnMedication);
            Param.Add("@PelvicInfectionOnMedication", obj.PelvicInfectionOnMedication);
            Param.Add("@BleedingDisordersOnMedication", obj.BleedingDisordersOnMedication);
            Param.Add("@EpilepsyOnMedication", obj.EpilepsyOnMedication);
            Param.Add("@HaemoglobinDeficiencyOnMedication", obj.HaemoglobinDeficiencyOnMedication);
            Param.Add("@MHOtherDiseaseOnMedication", obj.MHOtherDiseaseOnMedication);
            Param.Add("@RespiratoryOnMedication", obj.RespiratoryOnMedication);
            Param.Add("@SLEOnMedication", obj.SLEOnMedication);

            Param.Add("@MHOtherDisease", obj.MHOtherDisease);
            Param.Add("@MHOtherDiseaseWhenMnth", obj.MHOtherDiseaseWhenMnth);
            Param.Add("@MHOtherDiseaseWhenYr", obj.MHOtherDiseaseWhenYr);
            Param.Add("@MHOtherDiseaseRemark", obj.MHOtherDiseaseRemark);


            Param.Add("@RespiratorySinceWhenMnth", obj.RespiratorySinceWhenMnth);
            Param.Add("@RespiratorySinceWhenYr", obj.RespiratorySinceWhenYr);
            Param.Add("@RespiratoryID", obj.RespiratoryID);
            Param.Add("@RespiratoryRemark", obj.RespiratoryRemark);


            Param.Add("@SLESinceWhenMnth", obj.SLESinceWhenMnth);
            Param.Add("@SLESinceWhenYr", obj.SLESinceWhenYr);
            Param.Add("@SLEID", obj.SLEID);
            Param.Add("@SLERemark", obj.SLERemark);

            //
            //
            Param.Add("@DiabetesID", obj.DiabetesID);
            Param.Add("@DiabetesSinceWhenMnth", obj.DiabetesSinceWhenMnth == null ? 0 : obj.DiabetesSinceWhenMnth);
            Param.Add("@DiabetesSinceWhenYr", obj.DiabetesSinceWhenYr == null ? 0 : obj.DiabetesSinceWhenYr);
            Param.Add("@ThyroidDisorderID", obj.ThyroidDisorderID);
            Param.Add("@ThyroidDisorderSinceWhenMnth", obj.ThyroidDisorderSinceWhenMnth == null ? 0 : obj.ThyroidDisorderSinceWhenMnth);
            Param.Add("@ThyroidDisorderSinceWhenYr", obj.ThyroidDisorderSinceWhenYr == null ? 0 : obj.ThyroidDisorderSinceWhenYr);
            Param.Add("@MalignancyID", obj.MalignancyID);
            Param.Add("@MalignancyWhen", obj.MalignancyWhen);
            Param.Add("@TuberculosisID", obj.TuberculosisID);
            Param.Add("@TuberculosisWhen", obj.TuberculosisWhen);
            Param.Add("@PelvicInfectionID", obj.PelvicInfectionID);
            Param.Add("@PelvicInfectionWhen", obj.PelvicInfectionWhen);
            Param.Add("@BleedingDisordersID", obj.BleedingDisordersID);
            Param.Add("@BleedingDisordersWhen", obj.BleedingDisordersWhen);
    
            Param.Add("@EpilepsyID", obj.EpilepsyID);
            Param.Add("@EpilepsySinceWhenMnth", obj.EpilepsySinceWhenMnth == null ? 0 : obj.EpilepsySinceWhenMnth);
            Param.Add("@EpilepsySinceWhenYr", obj.EpilepsySinceWhenYr == null ? 0 : obj.EpilepsySinceWhenYr);
            Param.Add("@EpilepsyRemark", obj.EpilepsyRemark);
            Param.Add("@HaemoglobinDeficiencyID", obj.HaemoglobinDeficiencyID);
            Param.Add("@HaemoglobinDeficiencyValue", obj.HaemoglobinDeficiencyValue);
            Param.Add("@HaemoglobinDeficiencyRemark", obj.HaemoglobinDeficiencyRemark);
            Param.Add("@IsATT", obj.IsATT);
            Param.Add("@IsChickenpox", obj.IsChickenpox);
            Param.Add("@IsHepatitisA", obj.IsHepatitisA);
            Param.Add("@IsHepatitisB", obj.IsHepatitisB);
            Param.Add("@IsInfluenza", obj.IsInfluenza);
            Param.Add("@IsMMR", obj.IsMMR);
            Param.Add("@IsPolio", obj.IsPolio);
            Param.Add("@IsTetanus", obj.IsTetanus);
            Param.Add("@IsCervicalCancer", obj.IsCervicalCancer);


            Param.Add("@ATTDate", obj.ATTDate);
            Param.Add("@ChickenpoxDate", obj.ChickenpoxDate);
            Param.Add("@HepatitisADate", obj.HepatitisADate);
            Param.Add("@HepatitisBDate", obj.HepatitisBDate);
            Param.Add("@InfluenzaDate", obj.@InfluenzaDate);
            Param.Add("@MMRDate", obj.MMRDate);
            Param.Add("@PolioDate", obj.PolioDate);
            Param.Add("@TetanusDate", obj.@TetanusDate);
            Param.Add("@CervicalCancerDate", obj.CervicalCancerDate);
            Param.Add("@vaccinationRemark", obj.vaccinationRemark); 
            Param.Add("@MedicationID", obj.MedicationID);
           

            //END : Medical History

            //START : Surgical History

            Param.Add("@isSurgicalHistory", obj.isSurgicalHistory);
            Param.Add("@IsPelvicSurgery", obj.IsPelvicSurgery);
            Param.Add("@PelvicSurgeryRemark", obj.PelvicSurgeryRemark);
            Param.Add("@PelvicSurgeryPhoto", obj.PelvicSurgeryPhoto == null ? new byte[] { } : obj.PelvicSurgeryPhoto);
            Param.Add("@IsLaparoscopy", obj.IsLaparoscopy);
            Param.Add("@LaparoscopyRemarks", obj.LaparoscopyRemarks);
            Param.Add("@LaparoscopyPhoto", obj.LaparoscopyPhoto == null ? new byte[] { } : obj.LaparoscopyPhoto);
            Param.Add("@IsHysteroscopy", obj.IsHysteroscopy);
            Param.Add("@HysteroscopyRemarks", obj.HysteroscopyRemarks);
            Param.Add("@HysteroscopyPhoto", obj.HysteroscopyPhoto == null ? new byte[] { } : obj.HysteroscopyPhoto);
            Param.Add("@IsSurgivalOther", obj.IsSurgivalOther);
            Param.Add("@SurgivalOtherRemarks", obj.SurgivalOtherRemarks);
            Param.Add("@SurgivalOtherPhoto", obj.SurgivalOtherPhoto == null ? new byte[] { } : obj.SurgivalOtherPhoto);
            //END : Surgical History

            //START : Allergies
            if (obj.DrugsNameSelected != null)
                Param.Add("@AllergiesDrugIds", obj.AllergiesDrugIds = string.Join(",", obj.DrugsNameSelected.Select(a => a.id)));
            Param.Add("@AllergiesFood", obj.AllergiesFood);
            Param.Add("@AllergiesOthers", obj.AllergiesOthers);
            //END : Allergies

            //START : Addictions
            Param.Add("@IsSmoking", obj.IsSmoking);
            Param.Add("@SmokingRemarks", obj.SmokingRemarks);
            Param.Add("@IsAlcohol", obj.IsAlcohol);
            Param.Add("@AlcoholRemark", obj.AlcoholRemark);
            Param.Add("@IsTobacco", obj.IsTobacco);
            Param.Add("@TobaccoRemark", obj.TobaccoRemark);
            Param.Add("@IsAddictionsOther", obj.IsAddictionsOther);
            Param.Add("@AddictionsOtherRemark", obj.AddictionsOtherRemark);
            Param.Add("@IsCaffeineAddiction", obj.IsCaffeineAddiction);
            Param.Add("@IsDrugAddiction", obj.IsDrugAddiction);
            //END : Addictions

            //START : Family History
            Param.Add("@IsFamilyCardiacDisease", obj.IsFamilyCardiacDisease);
            if (obj.DiseaseRelationSelected != null)
                Param.Add("@FamilyCardiacDiseaseIds", obj.FamilyCardiacDiseaseIds = string.Join(",", obj.DiseaseRelationSelected.Select(a => a.id)));
            Param.Add("@IsFamilyDiabetesOther", obj.IsFamilyDiabetesOther);
            if (obj.DiabetesRelationSelected != null)
                Param.Add("@FamilyDiabetesOtherIds", obj.FamilyDiabetesOtherIds = string.Join(",", obj.DiabetesRelationSelected.Select(a => a.id)));
            Param.Add("@IsFamilyHypertension", obj.IsFamilyHypertension);
            if (obj.HypertensionRelationSelected != null)
                Param.Add("@FamilyHypertensionIds", obj.FamilyHypertensionIds = string.Join(",", obj.HypertensionRelationSelected.Select(a => a.id)));
            if (obj.ThyroidDisorderRelationSelected != null)
                Param.Add("@IsFamilyThyroidDisorder", obj.IsFamilyThyroidDisorder);
            if (obj.ThyroidDisorderRelationSelected != null)
                Param.Add("@FamilyThyroidDisorderIds", obj.FamilyThyroidDisorderIds = string.Join(",", obj.ThyroidDisorderRelationSelected.Select(a => a.id)));
            Param.Add("@IsFamilyMalignancy", obj.IsFamilyMalignancy);
            if (obj.MalignancyRelationSelected != null)
                Param.Add("@FamilyMalignancyIds", obj.FamilyMalignancyIds = string.Join(",", obj.MalignancyRelationSelected.Select(a => a.id)));
            Param.Add("@IsFamilyOther", obj.IsFamilyOther);
            Param.Add("@IsFamilyOtherRemark", obj.IsFamilyOtherRemark);
            if (obj.OtherRelationSelected != null)
                Param.Add("@FamilyOtherRemarkIds", obj.FamilyOtherRemarkIds = string.Join(",", obj.OtherRelationSelected.Select(a => a.id)));
            //END : Family History

            //START : Social History
            Param.Add("@MoodID", obj.MoodID == null ? 0 : Convert.ToInt32(obj.MoodID));
            Param.Add("@SleepID", obj.SleepID == null ? 0 : Convert.ToInt32(obj.SleepID));
            Param.Add("@HeadacheORNauseaID", obj.HeadacheORNauseaID == null ? 0 : Convert.ToInt32(obj.HeadacheORNauseaID));
            Param.Add("@PersonalityID", obj.PersonalityID == null ? 0 : Convert.ToInt32(obj.PersonalityID));
            Param.Add("@StressID", obj.StressID == null ? 0 : Convert.ToInt32(obj.StressID));
            Param.Add("@ExerciseID", obj.ExerciseID == null ? 0 : Convert.ToInt32(obj.ExerciseID));
            Param.Add("@FreqOfExerciseID", obj.FreqOfExerciseID == null ? 0 : Convert.ToInt32(obj.FreqOfExerciseID));
            Param.Add("@DietID", obj.DietID == null ? 0 : Convert.ToInt32(obj.DietID));
            Param.Add("@CaffeinatedBeveragesID", obj.CaffeinatedBeveragesID == null ? 0 : Convert.ToInt32(obj.CaffeinatedBeveragesID));
            Param.Add("@CaffeinatedBeveragesRemark", obj.CaffeinatedBeveragesRemark);
            Param.Add("@SocialRemark", obj.SocialRemark);
            Param.Add("@IsExposureToHevyMetals", obj.IsExposureToHevyMetals);
            Param.Add("@ExposureToHevyMetalsRemark", obj.ExposureToHevyMetalsRemark);
            Param.Add("@IsExposureToRadiation", obj.IsExposureToRadiation);
            Param.Add("@ExposureToRadiationRemark", obj.ExposureToRadiationRemark);
            Param.Add("@IsExposureToPesticides", obj.IsExposureToPesticides);
            Param.Add("@ExposureToPesticides", obj.ExposureToPesticides);
            Param.Add("@IsExposureToPollution", obj.IsExposureToPollution);
            Param.Add("@ExposureToPollution", obj.ExposureToPollution);
            Param.Add("@IsOccupationHazords", obj.IsOccupationHazords);
            Param.Add("@OccupationHazords", obj.OccupationHazords);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.UserName);
            Param.Add("@AddedDateTime", obj.AddedDateTime);
            Param.Add("@AddedWindowsName", Environment.MachineName);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@RegID", GenericSP.SelectedPatient.ID);
            Param.Add("@RegUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);

            Param.Add("@IsCovidVaccinationDone", obj.IsCovidVaccinationDone);
            Param.Add("@CovidVaccinationDate1", obj.IsCovidVaccinationDone=="Yes" && obj.CovidVaccinationDate1!=null ? obj.CovidVaccinationDate1 : (DateTime?)null);
            Param.Add("@CovidVaccinationDate2", obj.IsCovidVaccinationDone == "Yes" && obj.CovidVaccinationDate2 != null ? obj.CovidVaccinationDate2 : (DateTime?)null);
            Param.Add("@CovidVaccinationDate3", obj.IsCovidVaccinationDone == "Yes" && obj.CovidVaccinationDate3 != null ? obj.CovidVaccinationDate3 : (DateTime?)null);
            Param.Add("@CovidVaccinationRemark", obj.IsCovidVaccinationDone == "No"?obj.CovidVaccinationRemark: null);

            Param.Add("@IsRubbelaTestDone", obj.IsRubbelaTestDone);
            Param.Add("@RubbelaTestDate", obj.IsRubbelaTestDone? obj.RubbelaTestDate: (DateTime?) null);
            Param.Add("@IsSmearTestDone", obj.IsSmearTestDone);
            Param.Add("@SmearTestDate", obj.IsSmearTestDone? obj.SmearTestDate : (DateTime?)null);

            Param.Add("@isPrevFertilityTreatment", obj.isPrevFertilityTreatment);
            Param.Add("@isPrevFertilityTreatment", obj.isPrevFertilityTreatment);


            Param.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            Param.Add("@OperationStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            //END : Social History

            /* Insert female history record*/
            try
            {
                con.Execute(GenericSP.InsertFemaleHistory, Param, commandType: CommandType.StoredProcedure);
                string ResultStatus = Param.Get<string>("@ResultStatus");
                string OperationStatus = Param.Get<string>("@OperationStatus");
                if (Convert.ToInt32(ResultStatus) > 0)
                {
                    string Updatesql = "UPDATE T_ObstetricHistory SET Status=0 WHERE FHID=" + Convert.ToInt32(ResultStatus);
                    var affectedRows = con.Execute(Updatesql);



                    //START : Obstetric History
                    for (int Index = 0; Index < obj.ObstetricHistoryItem.Count; Index++)
                    {
                        var ParamObste = new DynamicParameters();
                        ParamObste.Add("@FHID", Convert.ToInt32(ResultStatus));
                        ParamObste.Add("@ObstetricHistoryID", obj.ObstetricHistoryItem[Index].ObstetricHistoryID);
                        ParamObste.Add("@Years", obj.ObstetricHistoryItem[Index].ObstetricYearsID);      // commented by Nayan Kamble  on 03/02/2020
                        //ParamObste.Add("@Years", obj.ObstetricHistoryItem[Index].Years);
                        ParamObste.Add("@GestationWeeksID", obj.ObstetricHistoryItem[Index].GestationWeeksID);
                        ParamObste.Add("@OutcomeID", obj.ObstetricHistoryItem[Index].OutcomeID);
                        ParamObste.Add("@DateOfAbortion", obj.ObstetricHistoryItem[Index].DateOfAbortion);
                        ParamObste.Add("@ChildSexID", obj.ObstetricHistoryItem[Index].ChildSexID);
                        ParamObste.Add("@DeliveryTypeID", obj.ObstetricHistoryItem[Index].DeliveryTypeID);
                        ParamObste.Add("@DeliveryID", obj.ObstetricHistoryItem[Index].DeliveryID);
                        ParamObste.Add("@TypeOfConceivingID", obj.ObstetricHistoryItem[Index].TypeOfConceivingID);
                        ParamObste.Add("@BirthWeight", obj.ObstetricHistoryItem[Index].BirthWeight);
                        ParamObste.Add("@ComplicationsID", obj.ObstetricHistoryItem[Index].ComplicationsID);
                        ParamObste.Add("@CongenitalAnamolyID", obj.ObstetricHistoryItem[Index].CongenitalAnamolyID);
                        ParamObste.Add("@CongenitalAnamolyRemark", obj.ObstetricHistoryItem[Index].CongenitalAnamolyRemark);
                        ParamObste.Add("@ComplicationsRemark", obj.ObstetricHistoryItem[Index].ComplicationsRemark);
                        //ParamObste.Add("@ComplicationDetails", ObstetricHistoryItem.ComplicationDetails);
                        ParamObste.Add("@ObstetricRemark", obj.ObstetricHistoryItem[Index].ObstetricRemark);
                        con.Execute(GenericSP.InsertObstetricHistory, ParamObste, commandType: CommandType.StoredProcedure);
                    }
                    //END : Obstetric History
                    var ParaDelete = new DynamicParameters();
                    ParaDelete.Add("@Action", "Delete");
                    ParaDelete.Add("@FHID", Convert.ToInt32(ResultStatus));
                    
                    con.Execute(GenericSP.InsertPreviousTreatmentHistory, ParaDelete, commandType: CommandType.StoredProcedure);
                    //START : Previous Treatment History
                    for (int Index = 0; Index < obj.PrevioustTreatmentHistoryItem.Count; Index++)
                    {
                        var ParamPreTreatHis = new DynamicParameters();
                        ParamPreTreatHis.Add("@Action", "Insert");
                        ParamPreTreatHis.Add("@FHID", Convert.ToInt32(ResultStatus));
                        ParamPreTreatHis.Add("@PreTreatmentID", obj.PrevioustTreatmentHistoryItem[Index].PreTreatmentID);
                        ParamPreTreatHis.Add("@ARTCycleID", obj.PrevioustTreatmentHistoryItem[Index].ARTCycleID);
                        ParamPreTreatHis.Add("@TreatmentYearsID", obj.PrevioustTreatmentHistoryItem[Index].TreatmentYearsID);
                        ParamPreTreatHis.Add("@TreatmentCountsID", obj.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID);
                        ParamPreTreatHis.Add("@DrugsID", obj.PrevioustTreatmentHistoryItem[Index].DrugsID);
                        ParamPreTreatHis.Add("@DrugName", obj.PrevioustTreatmentHistoryItem[Index].DrugName);
                        ParamPreTreatHis.Add("@OocytesRetrievedID", obj.PrevioustTreatmentHistoryItem[Index].OocytesRetrievedID);
                        ParamPreTreatHis.Add("@OocytesFertilizedID", obj.PrevioustTreatmentHistoryItem[Index].OocytesFertilizedID);
                        ParamPreTreatHis.Add("@OocytesCleavedID", obj.PrevioustTreatmentHistoryItem[Index].OocytesCleavedID);
                        ParamPreTreatHis.Add("@EmbryosTransferredID", obj.PrevioustTreatmentHistoryItem[Index].EmbryosTransferredID);
                        ParamPreTreatHis.Add("@EmbryosFrozenID", obj.PrevioustTreatmentHistoryItem[Index].EmbryosFrozenID);
                        ParamPreTreatHis.Add("@SuccessfulID", obj.PrevioustTreatmentHistoryItem[Index].SuccessfulID);
                        ParamPreTreatHis.Add("@EmbryosTransferredID1", obj.PrevioustTreatmentHistoryItem[Index].EmbryosTransferredID1);
                        ParamPreTreatHis.Add("@PreviousTreatmentHistoryRemark", obj.PrevioustTreatmentHistoryItem[Index].PreviousTreatmentHistoryRemark);
                        ParamPreTreatHis.Add("@PlaceOfTreatment", obj.PrevioustTreatmentHistoryItem[Index].PlaceOfTreatment);
                        con.Execute(GenericSP.InsertPreviousTreatmentHistory, ParamPreTreatHis, commandType: CommandType.StoredProcedure);
                    }
                    //END : Previous Treatment History
                    //Delete All History
                    var Para = new DynamicParameters();
                    Para.Add("@Action", "DeleteAllHistory");
                    Para.Add("@FHID", Convert.ToInt32(ResultStatus));
                    Para.Add("@MedicationStatusID", 0);
                    con.Execute(GenericSP.InsertPastMedicationHistory, Para, commandType: CommandType.StoredProcedure);
                    // End
                    //START : Past Medication History
                    for (int Index = 0; Index < obj.PastMedicationHistoryItem.Count; Index++)
                    {
                        PastMedicationHistory objPastMedHis = new PastMedicationHistory();
                        var ParamPastMedHis = new DynamicParameters();
                        ParamPastMedHis.Add("@Action", "SaveUpdateMedicationHistory");
                        ParamPastMedHis.Add("@FHID", Convert.ToInt32(ResultStatus));
                        ParamPastMedHis.Add("@MHID", Convert.ToInt32(0));
                        ParamPastMedHis.Add("@PastMedicationID", obj.PastMedicationHistoryItem[Index].PastMedicationID);
                        ParamPastMedHis.Add("@DrugeName", obj.PastMedicationHistoryItem[Index].DrugeName);
                        ParamPastMedHis.Add("@Dose", obj.PastMedicationHistoryItem[Index].Dose);
                        ParamPastMedHis.Add("@TimePeriod", obj.PastMedicationHistoryItem[Index].TimePeriod);
                        ParamPastMedHis.Add("@CalenderID", obj.PastMedicationHistoryItem[Index].CalenderID);
                        ParamPastMedHis.Add("@Remark", obj.PastMedicationHistoryItem[Index].Remark);
                        ParamPastMedHis.Add("@MedicationStatusID", obj.PastMedicationHistoryItem[Index].MedicationStatusID);
                        ParamPastMedHis.Add("@DrugID", obj.PastMedicationHistoryItem[Index].DrugID);
                        con.Execute(GenericSP.InsertPastMedicationHistory, ParamPastMedHis, commandType: CommandType.StoredProcedure);
                    }

                    //END : Past Medication History
                    #region ForFamilyHistory
                    var Para1 = new DynamicParameters();
                    Para1.Add("@Action", "DeleteAllFamilyHistory");
                    Para1.Add("@FHID", Convert.ToInt32(ResultStatus));
                    con.Execute(GenericSP.InsertInsertFamilyHistory, Para1, commandType: CommandType.StoredProcedure);

                    for (int Index = 0; Index < obj.FamilyHistoryItem.Count; Index++)
                    {
                       // PIVF.Entities.Models.EMR.MaleHistory.PastMedicationHistory objPastMedHis = new PIVF.Entities.Models.EMR.MaleHistory.PastMedicationHistory();
                        var ParamFamilyHistory = new DynamicParameters();
                        ParamFamilyHistory.Add("@Action", "SaveUpdateFamilyHistory");
                        ParamFamilyHistory.Add("@FHID", Convert.ToInt32(ResultStatus));
                        ParamFamilyHistory.Add("@MHID", Convert.ToInt32(0));
                        ParamFamilyHistory.Add("@TypeOfDiseaseID", obj.FamilyHistoryItem[Index].TypeOfDiseaseID);
                        ParamFamilyHistory.Add("@TypeOfDisease", obj.FamilyHistoryItem[Index].TypeOfDisease);

                        ParamFamilyHistory.Add("@MaternalPaternalID", obj.FamilyHistoryItem[Index].MaternalPaternalID);
                        ParamFamilyHistory.Add("@MaternalPaternal", obj.FamilyHistoryItem[Index].MaternalPaternal);

                        ParamFamilyHistory.Add("@RelationshipID", obj.FamilyHistoryItem[Index].RelationshipID);
                        ParamFamilyHistory.Add("@Relationship", obj.FamilyHistoryItem[Index].Relationship);

                        ParamFamilyHistory.Add("@LiveStatusID", obj.FamilyHistoryItem[Index].LiveStatusID);
                        ParamFamilyHistory.Add("@LiveStatus", obj.FamilyHistoryItem[Index].LiveStatus);

                        ParamFamilyHistory.Add("@Remark", obj.FamilyHistoryItem[Index].Remark);

                        con.Execute(GenericSP.InsertInsertFamilyHistory, ParamFamilyHistory, commandType: CommandType.StoredProcedure);
                    }
                    #endregion
                    //Pelvic Surgery Images insert
                    if (obj.PelvicSurgeryImages != null)
                    {
                        for (int Index = 0; Index < obj.PelvicSurgeryImages.Count; Index++)
                        {
                            //Insert images in database
                            var ParImg = new DynamicParameters();
                            ParImg.Add("@FHID", Convert.ToInt32(ResultStatus));
                            ParImg.Add("@name", obj.PelvicSurgeryImages[Index].name);
                            ParImg.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.PelvicSurgeryImages[Index].preview));
                            ParImg.Add("@ImageTypeID", 1);  // 1 Means - PelvicSurgeryImages
                            con.Execute(GenericSP.InsertFemaleHistoryImages, ParImg, commandType: CommandType.StoredProcedure);
                        }
                    }

                    if (obj.LaparoscopyImages != null)
                    {
                        for (int Index = 0; Index < obj.LaparoscopyImages.Count; Index++)
                        {
                            //Insert images in database
                            var ParImg = new DynamicParameters();
                            ParImg.Add("@FHID", Convert.ToInt32(ResultStatus));
                            ParImg.Add("@name", obj.LaparoscopyImages[Index].name);
                            ParImg.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.LaparoscopyImages[Index].preview));
                            ParImg.Add("@ImageTypeID", 2);  // 2 Means - LaparoscopyImages
                            con.Execute(GenericSP.InsertFemaleHistoryImages, ParImg, commandType: CommandType.StoredProcedure);
                        }
                    }

                    if (obj.HysteroscopyImages != null)
                    {
                        for (int Index = 0; Index < obj.HysteroscopyImages.Count; Index++)
                        {
                            //Insert images in database
                            var ParImg = new DynamicParameters();
                            ParImg.Add("@FHID", Convert.ToInt32(ResultStatus));
                            ParImg.Add("@name", obj.HysteroscopyImages[Index].name);
                            ParImg.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.HysteroscopyImages[Index].preview));
                            ParImg.Add("@ImageTypeID", 3);  // 3 Means - HysteroscopyImages
                            con.Execute(GenericSP.InsertFemaleHistoryImages, ParImg, commandType: CommandType.StoredProcedure);
                        }
                    }

                    if (obj.SurgivalOtherImages != null)
                    {
                        for (int Index = 0; Index < obj.SurgivalOtherImages.Count; Index++)
                        {
                            //Insert images in database
                            var ParImg = new DynamicParameters();
                            ParImg.Add("@FHID", Convert.ToInt32(ResultStatus));
                            ParImg.Add("@name", obj.SurgivalOtherImages[Index].name);
                            ParImg.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.SurgivalOtherImages[Index].preview));
                            ParImg.Add("@ImageTypeID", 4);  // 4 Means - SurgivalOtherImages
                            con.Execute(GenericSP.InsertFemaleHistoryImages, ParImg, commandType: CommandType.StoredProcedure);
                        }
                    }
                    //Allergies Details
                    string Updatesql1 = "UPDATE T_FemaleHistory_Allergy SET Status=0 WHERE FHID=" + Convert.ToInt32(ResultStatus);
                    var affectedRows1 = con.Execute(Updatesql1);
                    if (obj.lstAllergyDetail.Count > 0)
                    {
                        foreach (var item in obj.lstAllergyDetail)
                        {
                            var Param1 = new DynamicParameters();
                            Param1.Add("@Action", "InsertAllergiesDetail");
                            Param1.Add("@FHID", Convert.ToInt32(ResultStatus));
                            Param1.Add("@AllergyID", item.AllergyID);
                            Param1.Add("@DrugID", item.DrugID);
                            Param1.Add("@DrugName", item.DrugName);
                            Param1.Add("@currStatus", item.currStatus);
                            Param1.Add("@AlleSinceYr", item.AlleSinceYr);
                            Param1.Add("@AlleSinceMnth", item.AlleSinceMnth);
                            Param1.Add("@DrugImpact", item.DrugImpact);
                            Param1.Add("@SeverityID", item.SeverityID);
                            Param1.Add("@SinceWhenYr", item.SinceWhenYr);
                            Param1.Add("@SinceWhenMnth", item.SinceWhenMnth);
                            Param1.Add("@IsFood", item.IsFood);
                            Param1.Add("@IsSkin", item.IsSkin);
                            Param1.Add("@IsSmoke", item.IsSmoke);
                            Param1.Add("@IsLatex", item.IsLatex);
                            Param1.Add("@typeofallergyid", item.typeofallergyid);
                            Param1.Add("@IsDrugAllergy", item.IsDrugAllergy);
                            Param1.Add("@IsOtherAlleygy", item.IsOtherAlleygy);
                            Param1.Add("@IsAllergy", true);
                            Param1.Add("@IsFemale", true);
                            Param1.Add("@AddedDateTime", obj.AddedDateTime);
                            if (item.IsFood)
                                Param1.Add("@Allery", item.Food);
                            else if (item.IsSkin)
                                Param1.Add("@Allery", item.Skin);
                            else if (item.IsSmoke)
                                Param1.Add("@Allery", item.Smoke);
                            else if (item.IsLatex)
                                Param1.Add("@Allery", item.Latex);
                            else Param1.Add("@Allery", "");
                            con.Execute(GenericSP.InsertFemaleHistory, Param1, commandType: CommandType.StoredProcedure);
                        }

                    }
                    // End
                    //Adiction Details
                    if (obj.lstAdictionDetail.Count > 0)
                    {
                        foreach (var item in obj.lstAdictionDetail)
                        {
                            var Param1 = new DynamicParameters();
                            Param1.Add("@Action", "InsertAdictionDetail");
                            Param1.Add("@FHID", Convert.ToInt32(ResultStatus));
                            Param1.Add("@AllergyID", item.ID);
                            Param1.Add("@currStatus", item.currStatus);
                            Param1.Add("@FreqOIID", item.FrequencyID);
                            Param1.Add("@Allery", item.Quantity);
                            Param1.Add("@SmokingRemarks", item.NoOfCig);
                            Param1.Add("@SinceWhenYr", item.SinceWhenYr);
                            Param1.Add("@SinceWhenMnth", item.SinceWhenMnth);
                            Param1.Add("@IsAlcohol", item.IsAlcohol);
                            Param1.Add("@IsTobacco", item.IsTobaco);
                            Param1.Add("@IsSmoke", item.IsSmoking);
                            Param1.Add("@IsCaffeineAddiction", item.IsCaffeineAddiction);
                            Param1.Add("@IsDrugAddiction", item.IsDrugAddiction);
                            Param1.Add("@IsFemale", true);
                            Param1.Add("@AddedDateTime", obj.AddedDateTime);
                            con.Execute(GenericSP.InsertFemaleHistory, Param1, commandType: CommandType.StoredProcedure);
                        }

                    }
                    // End

                    //Surgical history

                    var Para2 = new DynamicParameters();
                    Para2.Add("@Action", "DeleteAllHistory");
                    Para2.Add("@FHID", Convert.ToInt32(ResultStatus));
                    try
                    {
                        con.Execute("usp_InsertSurgicalHistory", Para2, commandType: CommandType.StoredProcedure);
                    }
                    catch (Exception ex)
                    {

                    }

                    // End
                   
                    for (int Index = 0; Index < obj.SurgicalHistoryItem.Count; Index++)
                    {
                    //    PIVF.Entities.Models.EMR.FemaleHistory.SurgicalHistory objPastMedHis = new PIVF.Entities.Models.EMR.FemaleHistory.SurgicalHistory();
                        var ParamSurgiHistory = new DynamicParameters();
                        ParamSurgiHistory.Add("@Action", "SaveUpdateSurgicalHistory");
                        ParamSurgiHistory.Add("@FHID", Convert.ToInt32(ResultStatus));
                        ParamSurgiHistory.Add("@MHID", Convert.ToInt32(0));
                        ParamSurgiHistory.Add("@TypeofSurgeryID", obj.SurgicalHistoryItem[Index].TypeOfSurguryID);
                        ParamSurgiHistory.Add("@SurguryDate", obj.SurgicalHistoryItem[Index].SurguryDate);
                        ParamSurgiHistory.Add("@PerformedAtRemark", obj.SurgicalHistoryItem[Index].PerformedAtRemark);
                        ParamSurgiHistory.Add("@FindingsRemark", obj.SurgicalHistoryItem[Index].FindingsRemark);

                       ParamSurgiHistory.Add("@Remark", obj.SurgicalHistoryItem[Index].Remark);
                        if (obj.SurgicalHistoryItem[Index].SHAttachment.Count > 0)
                        {
                            ParamSurgiHistory.Add("@name", obj.SurgicalHistoryItem[Index].SHAttachment[0].name);
                            //  ParamSurgiHistory.Add("@preview",obj.SurgicalHistoryItem[Index].SHAttachment);
                            if (obj.SurgicalHistoryItem[Index].SHAttachment[0].preview !=null){
                                ParamSurgiHistory.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.SurgicalHistoryItem[Index].SHAttachment[0].preview));
                            }
                          
           
                        }
                     
                       // ParamSurgiHistory.Add("@name", obj.SurgicalHistoryItem[Index].SHAttachmentFileName);
                        try
                        {
                            con.Execute("usp_InsertSurgicalHistory", ParamSurgiHistory, commandType: CommandType.StoredProcedure);
                        }

                        catch (Exception ex)
                        {
                            throw ex;
                        }
                    }


                    //Surgical history end



                }
                return Convert.ToInt32(OperationStatus);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public FemaleHistroy LoadSpecificFemaleHistory(int ID, int unitID,int Prev)
        {
            FemaleHistroy obj = new FemaleHistroy();
            
            try
            {
                var param = new DynamicParameters();
                param.Add("@Action", "LoadSpecificFemaleHistory");
                param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                param.Add("@Prev", Prev);
                param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
              //  param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                param.Add("@VisitID", ID > 0 ? ID : GenericSP.SelectedPatient.VisitID);
               param.Add("@VisitUnitID", unitID > 0 ? unitID : GenericSP.SelectedPatient.VisitUnitID);
                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetSinglePatientFemaleHistory, param, commandType: CommandType.StoredProcedure);

                obj = QueryMultiple.Read<FemaleHistroy>().SingleOrDefault();
                if (obj != null)
                {
                   
                    obj.ObstetricHistoryItem = QueryMultiple.Read<ObstetricHistory>().ToList();
                    obj.PrevioustTreatmentHistoryItem = QueryMultiple.Read<PreviousTreatmentHistory>().ToList();
                    obj.PastMedicationHistoryItem = QueryMultiple.Read<PastMedicationHistory>().AsList();
                    obj.PelvicSurgery = new PelvicSurgery();
                    obj.PelvicSurgery.model = QueryMultiple.Read<model>().ToList();
                    obj.Laparoscopy = new Laparoscopy();
                    obj.Laparoscopy.model = QueryMultiple.Read<model>().ToList();
                    obj.Hysteroscopy = new Hysteroscopy();
                    obj.Hysteroscopy.model = QueryMultiple.Read<model>().ToList();
                    obj.SurgivalOther = new SurgivalOther();
                    obj.SurgivalOther.model = QueryMultiple.Read<model>().ToList();
                    obj.lstAllergyDetail = new List<AllergyDetail>();
                    obj.lstAllergyDetail = QueryMultiple.Read<AllergyDetail>().ToList();
                    obj.lstAdictionDetail = new List<AdictionDetail>();
                    obj.lstAdictionDetail = QueryMultiple.Read<AdictionDetail>().ToList();
                    obj.FamilyHistoryItem = QueryMultiple.Read<FamilyHistory>().AsList();
                    obj.SurgicalHistoryItem = new List<SurgicalHistory>();
                    obj.SurgicalHistoryItem= QueryMultiple.Read<SurgicalHistory>().AsList();

                 // obj.SurgicalHistoryItem = new List<SurgicalHistory>();
                  //  obj.SurgicalHistoryItem[1].SHAttachment = QueryMultiple.Read<model>().ToList();
                  for(int i=0;i< obj.SurgicalHistoryItem.Count; i++)
                    {
                        obj.SurgicalHistoryItem[i].SHAttachment = new List<model>();
                        model m = new model();
                        m.preview= obj.SurgicalHistoryItem[i].SHAttachment1;
                        m.name= obj.SurgicalHistoryItem[i].SHAttachmentFileName;
                        obj.SurgicalHistoryItem[i].SHAttachment.Add(m);
                        //obj.SurgicalHistoryItem[i].SHAttachment[0].preview = obj.SurgicalHistoryItem[i].SHAttachment1;
                        //obj.SurgicalHistoryItem[i].SHAttachment[0].name = obj.SurgicalHistoryItem[i].SHAttachmentFileName;
                    }

                }

                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<HistoryLIst> GetHistoryList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetHistoryList");
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            var lst = this.con.Query<HistoryLIst>(GenericSP.GetSinglePatientFemaleHistory, Param, commandType: CommandType.StoredProcedure).ToList();
            return lst;
        }
    }
}
