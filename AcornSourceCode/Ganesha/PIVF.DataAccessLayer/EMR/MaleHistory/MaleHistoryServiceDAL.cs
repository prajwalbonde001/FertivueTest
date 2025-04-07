using PIVF.BusinessLayer.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR.MaleHistory;
using Dapper;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using PIVF.BusinessLayer;

namespace PIVF.DataAccessLayer.EMR.MaleHistory
{
    public class MaleHistoryServiceDAL : MaleHistoryServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;

        public MaleHistoryServiceDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int InsertMaleHistory(PIVF.Entities.Models.EMR.MaleHistory.MaleHistory obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@MHID", obj.MHID);
            Param.Add("@RegUnitID", obj.RegUnitID == null ? 0 : Convert.ToInt32(obj.RegUnitID));
            Param.Add("@ConsanguinityID", Convert.ToInt32(obj.ConsanguinityID));
            Param.Add("@PWCPYearsID", obj.PWCPYearsID == null ? 0 : Convert.ToInt32(obj.PWCPYearsID));
            Param.Add("@PWCPMonthsID", obj.PWCPMonthsID == null ? 0 : Convert.ToInt32(obj.PWCPMonthsID));
            Param.Add("@SPWPID", obj.SPWPID == null ? 0 : Convert.ToInt32(obj.SPWPID));
            Param.Add("@SPWPPRemark", obj.SPWPPRemark);
            Param.Add("@SexualDysFunctionID", obj.SexualDysFunctionID == null ? 0 : Convert.ToInt32(obj.SexualDysFunctionID));
            Param.Add("@EjaculationORErectionID", obj.EjaculationORErectionID == null ? 0 : Convert.ToInt32(obj.EjaculationORErectionID));
            Param.Add("@BloodGroupID", obj.BloodGroupID == null ? 0 : Convert.ToInt32(obj.BloodGroupID));
            Param.Add("@MarriedLifeID", obj.MarriedLifeID == null ? 0 : Convert.ToInt32(obj.MarriedLifeID));
            Param.Add("@MarriedLifeRemark", obj.MarriedLifeRemark);
            Param.Add("@SexualHistoryRemark", obj.SexualHistoryRemark);
            Param.Add("@isSurgicalHistory", obj.isSurgicalHistory);
            Param.Add("@isPastFertilityMedication", obj.isPastFertilityMedication);

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
            Param.Add("@IsOrchitis", obj.IsOrchitis);
            Param.Add("@OrchitisRemark", obj.OrchitisRemark);
            Param.Add("@IsMumps", obj.IsMumps);
            Param.Add("@MumpsRemark", obj.MumpsRemark);
            Param.Add("@IsOther", obj.IsOther);
            Param.Add("@OtherRemark", obj.OtherRemark);
            Param.Add("@IsOccupationHazards", obj.IsOccupationHazards);
            Param.Add("@OccupationHazards", obj.OccupationHazards);
            //END : Medical History
            //ashish

            Param.Add("@MHOtherDiseaseRemark", obj.MHOtherDiseaseRemark);
            Param.Add("@RespiratoryRemark", obj.RespiratoryRemark);
            Param.Add("@SLERemark", obj.SLERemark); 
            Param.Add("@MHOtherDisease", obj.MHOtherDisease);
            Param.Add("@MHOtherDiseaseWhenMnth", obj.MHOtherDiseaseWhenMnth);
            Param.Add("@MHOtherDiseaseWhenYr", obj.MHOtherDiseaseWhenYr);
            Param.Add("@RespiratorySinceWhenMnth", obj.RespiratorySinceWhenMnth);
            Param.Add("@RespiratorySinceWhenYr", obj.RespiratorySinceWhenYr);
            Param.Add("@SLESinceWhenMnth", obj.SLESinceWhenMnth);
            Param.Add("@RespiratoryID", obj.RespiratoryID);
            Param.Add("@SLESinceWhenYr", obj.SLESinceWhenYr);
            Param.Add("@SLEID", obj.SLEID);
            Param.Add("@SLEOnMedication", obj.SLEOnMedication);
            Param.Add("@MHOtherDiseaseOnMedication", obj.MHOtherDiseaseOnMedication);
            Param.Add("@RespiratoryOnMedication", obj.RespiratoryOnMedication);

            // modification Medical History start

            Param.Add("@CardiacDiseaseID", obj.CardiacDiseaseID);
            Param.Add("@CardiacDiseaseWhen", obj.CardiacDiseaseWhen);
            Param.Add("@DiabetesID", obj.DiabetesID);
            Param.Add("@DiabetesSinceWhenMnth", obj.DiabetesSinceWhenMnth == null ? 0 : obj.DiabetesSinceWhenMnth);
            Param.Add("@DiabetesSinceWhenYr", obj.DiabetesSinceWhenYr == null ? 0 : obj.DiabetesSinceWhenYr);
            Param.Add("@ThyroidDisorderID", obj.ThyroidDisorderID);
            Param.Add("@ThyroidDisorderSinceWhenMnth", obj.ThyroidDisorderSinceWhenMnth == null ? 0 : obj.ThyroidDisorderSinceWhenMnth);
            Param.Add("@ThyroidDisorderSinceWhenYr", obj.ThyroidDisorderSinceWhenYr == null ? 0 : obj.ThyroidDisorderSinceWhenYr);
            Param.Add("@MalignancyID", obj.MalignancyID);
            Param.Add("@MalignancyWhen", obj.MalignancyWhen);
            Param.Add("@MalignancyRemark", obj.MalignancyRemark);
            Param.Add("@TuberculosisID", obj.TuberculosisID);
            Param.Add("@TuberculosisWhen", obj.TuberculosisWhen);
            Param.Add("@PelvicInfectionID", obj.PelvicInfectionID);
            Param.Add("@PelvicInfectionWhen", obj.PelvicInfectionWhen);
            Param.Add("@PelvicInfectionRemark", obj.PelvicInfectionRemark);
            Param.Add("@BleedingDisordersID", obj.BleedingDisordersID);
            Param.Add("@BleedingDisordersWhen", obj.BleedingDisordersWhen);
            Param.Add("@BleedingDisordersRemark", obj.BleedingDisordersRemark);
            Param.Add("@EpilepsyID", obj.EpilepsyID);
            Param.Add("@EpilepsySinceWhenMnth", obj.EpilepsySinceWhenMnth == null ? 0 : obj.EpilepsySinceWhenMnth);
            Param.Add("@EpilepsySinceWhenYr", obj.EpilepsySinceWhenYr == null ? 0 : obj.EpilepsySinceWhenYr);
            Param.Add("@EpilepsyRemark", obj.EpilepsyRemark);
            Param.Add("@OrchitisID", obj.OrchitisID);
            Param.Add("@OrchitisWhen", obj.OrchitisWhen);
            Param.Add("@CardiacDiseaseOnMedication", obj.CardiacDiseaseOnMedication);
            Param.Add("@DiabetesOnMedication", obj.DiabetesOnMedication);
            Param.Add("@ThyroidDisorderOnMedication", obj.ThyroidDisorderOnMedication);
            Param.Add("@TuberculosisOnMedication", obj.TuberculosisOnMedication);
            Param.Add("@PelvicInfectionOnMedication", obj.PelvicInfectionOnMedication);
            Param.Add("@MalignancyOnMedication", obj.MalignancyOnMedication);
            Param.Add("@BleedingDisordersOnMedication", obj.BleedingDisordersOnMedication);
            Param.Add("@EpilepsyOnMedication", obj.EpilepsyOnMedication);
            Param.Add("@OrchitisOnMedication", obj.OrchitisOnMedication);
            //modification Medical History  end

            Param.Add("@SurgicalHistoryRemark", obj.SurgicalHistoryRemark);
            Param.Add("@PTHistoryRemark", obj.PTHistoryRemark);

          

            //START : Addictions
            Param.Add("@IsSmoking", obj.IsSmoking);
            Param.Add("@SmokingRemarks", obj.SmokingRemarks);
            Param.Add("@SmokingcurrStatus", obj.SmokingcurrStatus);
            Param.Add("@SmokingSinceWhenMnth", obj.SmokingSinceWhenMnth);
            Param.Add("@SmokingSinceWhenYr", obj.SmokingSinceWhenYr);
            Param.Add("@SmokingNoOfCig", obj.SmokingNoOfCig);
            Param.Add("@SmokingFrequencyID", obj.SmokingFrequencyID);
            Param.Add("@IsAlcohol", obj.IsAlcohol);
            Param.Add("@AlcoholcurrStatus", obj.AlcoholcurrStatus);
            Param.Add("@AlcoholSinceWhenMnth", obj.AlcoholSinceWhenMnth);
            Param.Add("@AlcoholSinceWhenYr", obj.AlcoholSinceWhenYr);
            Param.Add("@AlcoholQuantity", obj.AlcoholQuantity);
            Param.Add("@AlcoholFrequencyID", obj.AlcoholFrequencyID);
            Param.Add("@AlcoholRemark", obj.AlcoholRemark);
            Param.Add("@IsTobacco", obj.IsTobacco);
            Param.Add("@TobacocurrStatus", obj.TobacocurrStatus);
            Param.Add("@TobacoSinceWhenMnth", obj.TobacoSinceWhenMnth);
            Param.Add("@TobacoSinceWhenYr", obj.TobacoSinceWhenYr);
            Param.Add("@TobacoFrequencyID", obj.TobacoFrequencyID);
            Param.Add("@TobacoQuantity", obj.TobacoQuantity);
            Param.Add("@TobaccoRemark", obj.TobaccoRemark);
            //mayur 
            Param.Add("@IsDrugAddiction", obj.IsDrugAddiction);
            Param.Add("@DrugAddictioncurrStatus", obj.DrugAddictioncurrStatus);
            Param.Add("@DrugAddictionSinceWhenMnth", obj.DrugAddictionSinceWhenMnth);
            Param.Add("@DrugAddictionSinceWhenYr", obj.DrugAddictionSinceWhenYr);
            Param.Add("@DrugAddictionQuantity", obj.DrugAddictionQuantity);
            Param.Add("@DrugAddictionFrequencyID", obj.DrugAddictionFrequencyID);

            Param.Add("@IsCaffeineAddiction", obj.IsCaffeineAddiction);
            Param.Add("@CaffeineAddictioncurrStatus", obj.CaffeineAddictioncurrStatus);
            Param.Add("@CaffeineAddictionSinceWhenMnth", obj.CaffeineAddictionSinceWhenMnth);
            Param.Add("@CaffeineAddictionSinceWhenYr", obj.CaffeineAddictionSinceWhenYr);
            Param.Add("@CaffeineAddictionQuantity", obj.CaffeineAddictionQuantity);
            Param.Add("@CaffeineAddictionFrequencyID", obj.CaffeineAddictionFrequencyID);

            Param.Add("@IsAddictionsOther", obj.IsAddictionsOther);
            Param.Add("@AddictionsOtherRemark", obj.AddictionsOtherRemark);
  

        //START : Family History
            Param.Add("@IsFamilyCardiacDisease", obj.IsFamilyCardiacDisease);
            Param.Add("@FamilyCardiacDiseaseIds", obj.FamilyCardiacDiseaseIds = (obj.DiseaseRelationSelected == null ? null : string.Join(",", obj.DiseaseRelationSelected.Select(a => a.id))));
            Param.Add("@IsFamilyDiabetesOther", obj.IsFamilyDiabetesOther);
            Param.Add("@FamilyDiabetesOtherIds", obj.FamilyDiabetesOtherIds = (obj.DiabetesRelationSelected == null ? null : string.Join(",", obj.DiabetesRelationSelected.Select(a => a.id))));
            Param.Add("@IsFamilyHypertension", obj.IsFamilyHypertension);
            Param.Add("@FamilyHypertensionIds", obj.FamilyHypertensionIds = (obj.HypertensionRelationSelected == null ? null : string.Join(",", obj.HypertensionRelationSelected.Select(a => a.id))));
            Param.Add("@IsFamilyThyroidDisorder", obj.IsFamilyThyroidDisorder);
            Param.Add("@FamilyThyroidDisorderIds", obj.FamilyThyroidDisorderIds = (obj.ThyroidDisorderRelationSelected == null ? null : string.Join(",", obj.ThyroidDisorderRelationSelected.Select(a => a.id))));
            Param.Add("@IsFamilyMalignancy", obj.IsFamilyMalignancy);
            Param.Add("@FamilyMalignancyIds", obj.FamilyMalignancyIds = (obj.MalignancyRelationSelected == null ? null : string.Join(",", obj.MalignancyRelationSelected.Select(a => a.id))));
            Param.Add("@IsFamilyOther", obj.IsFamilyOther);
            Param.Add("@IsFamilyOtherRemark", obj.IsFamilyOtherRemark);
            Param.Add("@FamilyOtherRemarkIds", obj.FamilyOtherRemarkIds = (obj.OtherRelationSelected == null ? null : string.Join(",", obj.OtherRelationSelected.Select(a => a.id))));
            //END : Family History

            //START : Social History
            Param.Add("@MoodID", obj.MoodID == null ? 0 : Convert.ToInt32(obj.MoodID));
            Param.Add("@SleepID", obj.SleepID == null ? 0 : Convert.ToInt32(obj.SleepID));
            Param.Add("@HeadacheORNauseaID", obj.HeadacheORNauseaID == null ? 0 : Convert.ToInt32(obj.HeadacheORNauseaID));
            Param.Add("@PersonalityID", obj.PersonalityID == null ? 0 : Convert.ToInt32(obj.PersonalityID));
            Param.Add("@StressID", obj.StressID == null ? 0 : Convert.ToInt32(obj.StressID));
            Param.Add("@ExerciseID", obj.ExerciseID == null ? 0 : Convert.ToInt32(obj.ExerciseID));
            Param.Add("@DietID", obj.DietID == null ? 0 : Convert.ToInt32(obj.DietID));
            Param.Add("@CaffeinatedBeveragesID", obj.CaffeinatedBeveragesID == null ? 0 : Convert.ToInt32(obj.CaffeinatedBeveragesID));
            Param.Add("@CaffeinatedBeveragesRemark", obj.CaffeinatedBeveragesRemark);

            Param.Add("@IsExposureToHevyMetals", obj.IsExposureToHevyMetals);
            Param.Add("@ExposureToHevyMetalsRemark", obj.ExposureToHevyMetalsRemark);
            Param.Add("@IsExposureToRadiation", obj.IsExposureToRadiation);
            Param.Add("@ExposureToRadiationRemark", obj.ExposureToRadiationRemark);
            Param.Add("@IsUrinationOnstraining", obj.IsUrinationOnstraining);
            Param.Add("@UrinationOnstrainingRemark", obj.UrinationOnstrainingRemark);
            Param.Add("@IsDifficultyInVoiding", obj.IsDifficultyInVoiding);
            Param.Add("@DifficultyInVoidingRemark", obj.DifficultyInVoidingRemark);
            Param.Add("@IsBurningsensation", obj.IsBurningsensation);
            Param.Add("@BurningsensationRemark", obj.BurningsensationRemark);
            Param.Add("@IsUrgencyForUrination", obj.IsUrgencyForUrination);
            Param.Add("@UrgencyForUrinationRemark", obj.UrgencyForUrinationRemark);
            Param.Add("@SocialHistoryRemark", obj.SocialHistoryRemark);
            Param.Add("@IsMaleFinalize", obj.IsMaleFinalize);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);

            Param.Add("@IsCovidVaccinationDone", obj.IsCovidVaccinationDone);
            Param.Add("@CovidVaccinationDate1", obj.IsCovidVaccinationDone == "Yes" && obj.CovidVaccinationDate1 != null ? obj.CovidVaccinationDate1 : (DateTime?)null);
            Param.Add("@CovidVaccinationDate2", obj.IsCovidVaccinationDone == "Yes" && obj.CovidVaccinationDate1 != null ? obj.CovidVaccinationDate2 : (DateTime?)null);
            Param.Add("@CovidVaccinationDate3", obj.IsCovidVaccinationDone == "Yes" && obj.CovidVaccinationDate1 != null ? obj.CovidVaccinationDate3 : (DateTime?)null);
            Param.Add("@CovidVaccinationRemark", obj.IsCovidVaccinationDone == "No" ? obj.CovidVaccinationRemark : null);


            Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedDateTime", DateTime.Now);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);

            Param.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            //END : Social History

            /* Insert female history record*/
            try
            {
                con.Execute(GenericSP.InsertMaleHistory, Param, commandType: CommandType.StoredProcedure);
                string ResultStatus = Param.Get<string>("@ResultStatus");
                if (Convert.ToInt32(ResultStatus) > 0)
                {
                    //Delete All History
                    var Para = new DynamicParameters();
                    Para.Add("@Action", "DeleteAllHistory");
                    Para.Add("@MHID", Convert.ToInt32(ResultStatus));
                    Para.Add("@MedicationStatusID", 0);
                    con.Execute(GenericSP.InsertPastMedicationHistory, Para, commandType: CommandType.StoredProcedure);
                    // End
                    //START : Past Medication History
                    for (int Index = 0; Index < obj.PastMedicationHistoryItem.Count; Index++)
                    {
                        PIVF.Entities.Models.EMR.MaleHistory.PastMedicationHistory objPastMedHis = new PIVF.Entities.Models.EMR.MaleHistory.PastMedicationHistory();
                        var ParamPastMedHis = new DynamicParameters();
                        ParamPastMedHis.Add("@Action", "SaveUpdateMedicationHistory");
                        ParamPastMedHis.Add("@FHID", Convert.ToInt32(0));
                        ParamPastMedHis.Add("@MHID", Convert.ToInt32(ResultStatus));
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



//Surgical history

                    var Para2 = new DynamicParameters();
                    Para2.Add("@Action", "DeleteAllHistory");
                    Para2.Add("@MHID", Convert.ToInt32(ResultStatus));
                  try
                    {
                        con.Execute("usp_InsertSurgicalHistory", Para2, commandType: CommandType.StoredProcedure);
                    }
                    catch(Exception ex)
                    {

                    }
                   
                    // End
                    //START : Past Medication History
                    for (int Index = 0; Index < obj.SurgicalHistoryItem.Count; Index++)
                    {
                        PIVF.Entities.Models.EMR.MaleHistory.SurgicalHistory objPastMedHis = new PIVF.Entities.Models.EMR.MaleHistory.SurgicalHistory();
                        var ParamSurgiHistory = new DynamicParameters();
                        ParamSurgiHistory.Add("@Action", "SaveUpdateSurgicalHistory");
                        ParamSurgiHistory.Add("@FHID", Convert.ToInt32(0));
                        ParamSurgiHistory.Add("@MHID", Convert.ToInt32(ResultStatus));
                        ParamSurgiHistory.Add("@TypeofSurgeryID", obj.SurgicalHistoryItem[Index].TypeOfSurguryID);
                        ParamSurgiHistory.Add("@SurguryDate", obj.SurgicalHistoryItem[Index].SurguryDate);
                        ParamSurgiHistory.Add("@PerformedAtRemark", obj.SurgicalHistoryItem[Index].PerformedAtRemark);
                        ParamSurgiHistory.Add("@FindingsRemark", obj.SurgicalHistoryItem[Index].FindingsRemark);
                        ParamSurgiHistory.Add("@Remark", obj.SurgicalHistoryItem[Index].Remark);
                        if (obj.SurgicalHistoryItem[Index].SHAttachment.Count > 0)
                        {
                            ParamSurgiHistory.Add("@name", obj.SurgicalHistoryItem[Index].SHAttachment[0].name);
                            //  ParamSurgiHistory.Add("@preview",obj.SurgicalHistoryItem[Index].SHAttachment);
                            if (obj.SurgicalHistoryItem[Index].SHAttachment[0].preview != null)
                            {
                                ParamSurgiHistory.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.SurgicalHistoryItem[Index].SHAttachment[0].preview));
                            }
                        }
                        try
                        {
                            con.Execute("usp_InsertSurgicalHistory", ParamSurgiHistory, commandType: CommandType.StoredProcedure);
                        }
                       
                        catch (Exception ex)
                        {

                        }
                    }


                    //Surgical history end




                    string Updatesql1 = "UPDATE T_MaleHistoryAllergy SET Status=0 WHERE MHID=" + Convert.ToInt32(ResultStatus);
                    var affectedRows1 = con.Execute(Updatesql1);

                    //END : Past Medication History
                    //START : Allergies
                    if (obj.lstAllergyDetail.Count > 0)
                    {
                        foreach (var item in obj.lstAllergyDetail)
                        {
                            var Param1 = new DynamicParameters();
                            Param1.Add("@Action", "InsertAllergiesDetail");
                            Param1.Add("@AllergyId", item.AllergyID);
                            Param1.Add("@MHID", Convert.ToInt32(ResultStatus));
                            Param1.Add("@VisitId", obj.VisitID);
                            Param1.Add("@VisitUnitId", obj.VisitUnitId);
                            Param1.Add("@DrugName", item.DrugName);
                            Param1.Add("@Food", item.Food);


                            Param1.Add("@currStatus", item.currStatus);
                            Param1.Add("@AlleSinceYr", item.AlleSinceYr);
                            Param1.Add("@AlleSinceMnth", item.AlleSinceMnth);
                            Param1.Add("@DrugImpact", item.DrugImpact);
                            Param1.Add("@SeverityID", item.SeverityID);
                            Param1.Add("@IsDrugAllergy", item.IsDrugAllergy);
                            Param1.Add("@IsOtherAllergy", item.IsOtherAlleygy);





                            Param1.Add("@typeofallergyid", item.typeofallergyid);


                            Param1.Add("@IsAllergy", true);
                            Param1.Add("@IsMale", true);
                            Param1.Add("@AddedDateTime", obj.AddedDateTime);

                            con.Execute(GenericSP.InsertMaleAllergyHistory, Param1, commandType: CommandType.StoredProcedure);
                        }

                    }
                    //END : Allergies


                    #region ForFamilyHistory
                    var Para1 = new DynamicParameters();
                    Para1.Add("@Action", "DeleteAllFamilyHistory");
                    Para1.Add("@MHID", Convert.ToInt32(ResultStatus));
                    con.Execute(GenericSP.InsertInsertFamilyHistory, Para1, commandType: CommandType.StoredProcedure);

                    for (int Index = 0; Index < obj.FamilyHistoryItem.Count; Index++)
                    {
                        PIVF.Entities.Models.EMR.MaleHistory.PastMedicationHistory objPastMedHis = new PIVF.Entities.Models.EMR.MaleHistory.PastMedicationHistory();
                        var ParamFamilyHistory = new DynamicParameters();
                        ParamFamilyHistory.Add("@Action", "SaveUpdateFamilyHistory");
                        ParamFamilyHistory.Add("@FHID", Convert.ToInt32(0));
                        ParamFamilyHistory.Add("@MHID", Convert.ToInt32(ResultStatus));
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


                }
                return Convert.ToInt32(ResultStatus);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Entities.Models.EMR.MaleHistory.MaleHistory SetAllControls(int VID, int uID, int Prev)
        {
            Entities.Models.EMR.MaleHistory.MaleHistory obj = new Entities.Models.EMR.MaleHistory.MaleHistory();
            try
            {
                var param = new DynamicParameters();
                param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                param.Add("@Action", "Single");
                param.Add("@Prev", Prev);
                param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                param.Add("@VisitID", VID > 0 ? VID : GenericSP.SelectedPatient.VisitID);
                param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetMaleHistory, param, commandType: CommandType.StoredProcedure);
                obj = QueryMultiple.Read<Entities.Models.EMR.MaleHistory.MaleHistory>().SingleOrDefault();
                if (obj != null)
                {
                    obj.PastMedicationHistoryItem = QueryMultiple.Read<Entities.Models.EMR.MaleHistory.PastMedicationHistory>().AsList();
                    obj.FamilyHistoryItem = QueryMultiple.Read<FamilyHistory>().AsList();
                    obj.lstAllergyDetail = QueryMultiple.Read<AllergyDetail>().AsList();
                    obj.SurgicalHistoryItem = new List<SurgicalHistory>();
                    obj.SurgicalHistoryItem = QueryMultiple.Read<SurgicalHistory>().AsList();
                    for (int i = 0; i < obj.SurgicalHistoryItem.Count; i++)
                    {
                        obj.SurgicalHistoryItem[i].SHAttachment = new List<model1>();
                        model1 m = new model1();
                        m.preview = obj.SurgicalHistoryItem[i].SHAttachment1;
                        m.name = obj.SurgicalHistoryItem[i].SHAttachmentFileName;
                        obj.SurgicalHistoryItem[i].SHAttachment.Add(m);
                        //obj.SurgicalHistoryItem[i].SHAttachment[0].preview = obj.SurgicalHistoryItem[i].SHAttachment1;
                        //obj.SurgicalHistoryItem[i].SHAttachment[0].name = obj.SurgicalHistoryItem[i].SHAttachmentFileName;
                    }
                }             
                //obj.DiseaseRelationSelected = obj.FamilyCardiacDiseaseIds.Split(',').Select(n => new DrugName { id = Convert.ToInt32(n), ticked = true }).ToList();
                //obj.DiabetesRelationSelected = obj.FamilyDiabetesOtherIds.Split(',').Select(n => new DrugName { id = Convert.ToInt32(n), ticked = true }).ToList();
                //obj.HypertensionRelationSelected = obj.FamilyHypertensionIds.Split(',').Select(n => new DrugName { id = Convert.ToInt32(n), ticked = true }).ToList();
                //obj.ThyroidDisorderRelationSelected = obj.FamilyThyroidDisorderIds.Split(',').Select(n => new DrugName { id = Convert.ToInt32(n), ticked = true }).ToList();
                //obj.MalignancyRelationSelected = obj.FamilyMalignancyIds.Split(',').Select(n => new DrugName { id = Convert.ToInt32(n), ticked = true }).ToList();
                //obj.OtherRelationSelected = obj.FamilyOtherRemarkIds.Split(',').Select(n => new DrugName { id = Convert.ToInt32(n), ticked = true }).ToList();
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
            var lst = this.con.Query<HistoryLIst>(GenericSP.GetMaleHistory, Param, commandType: CommandType.StoredProcedure).ToList();
            return lst;
        }
    }
}
