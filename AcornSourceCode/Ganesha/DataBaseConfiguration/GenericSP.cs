//using NLog;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
//using System.Web.Script.Serialization;

namespace DataBaseConfiguration
{
    public static class GenericSP
    {
        static string EDKey = string.Empty;
        //private static Logger logger = LogManager.GetCurrentClassLogger();

        public static int SessionTimeout
        {
            get { return System.Web.HttpContext.Current.Session.Timeout; }
        }

        //public static PIVF.Entities.Models.Master.Configuration.UserVO CurrentUserObj
        //{ get; set; }
      

        public static PIVF.Entities.Models.Master.Configuration.UserVO CurrentUser
        {
            get
            {
                return (PIVF.Entities.Models.Master.Configuration.UserVO)System.Web.HttpContext.Current.Session["CurrentUser"];

                //#region User Session Issue added on 14thJun2020
                //try
                //{
                //    System.Web.HttpContext.Current.Session.Timeout = 30;
                //    if (System.Web.HttpContext.Current.Session["CurrentUser"] == null)
                //    {
                //        string userinfoCookieString = System.Web.HttpContext.Current.Response.Cookies["UserInfoCookie"].Value;

                //        //logger.Info("1: CurrentUser:{0},CurrentSession:{1},Cookie:{2},CurrentUserobj{3}", GenericSP.CurrentUser, System.Web.HttpContext.Current.Session["CurrentUser"], userinfoCookieString, CurrentUserObj);
                //        logger.Info("1: CurrentSession:{0},Cookie:{1},CurrentUserobj{2}", System.Web.HttpContext.Current.Session["CurrentUser"], userinfoCookieString, CurrentUserObj);

                //        PIVF.Entities.Models.Master.Configuration.UserVO userObjectjson;

                //        if (!string.IsNullOrEmpty(userinfoCookieString))
                //            userObjectjson = new JavaScriptSerializer().Deserialize<PIVF.Entities.Models.Master.Configuration.UserVO>(userinfoCookieString);
                //        else
                //            userObjectjson = CurrentUserObj;

                //        return userObjectjson;
                //    }
                //    else
                //    {
                //        //logger.Info("2: CurrentUser:{0},CurrentSession:{1},Cookie:{2},CurrentUserobj{3}", GenericSP.CurrentUser, System.Web.HttpContext.Current.Session["CurrentUser"], System.Web.HttpContext.Current.Response.Cookies["UserInfoCookie"].Value,CurrentUserObj);
                //        return (PIVF.Entities.Models.Master.Configuration.UserVO)System.Web.HttpContext.Current.Session["CurrentUser"];
                //    }
                //    #endregion
                //}
                //catch (Exception ex)
                //{
                //    logger.Error("Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                //    return null;
                //}
            }
            set {
                System.Web.HttpContext.Current.Session["CurrentUser"] = value;               
            }
        }
        public static PIVF.Entities.Models.Patient.clsCoupleVO SelectedCouple
        {
            get { return (PIVF.Entities.Models.Patient.clsCoupleVO)System.Web.HttpContext.Current.Session["SelectedCouple"]; }
            set { System.Web.HttpContext.Current.Session["SelectedCouple"] = value; }
        }
        public static PIVF.Entities.Models.Patient.clsPatientVO SelectedPatient
        {
            get { return (PIVF.Entities.Models.Patient.clsPatientVO)System.Web.HttpContext.Current.Session["SelectedPatient"]; }
            set { System.Web.HttpContext.Current.Session["SelectedPatient"] = value; }
        }
        //public static PIVF.Entities.Models.Master.Configuration.UserVO CurrentUser { get; set; }
        //public static PIVF.Entities.Models.Patient.clsCoupleVO SelectedCouple { get; set; }
        //public static PIVF.Entities.Models.Patient.clsPatientVO SelectedPatient { get; set; }
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
        public const string EditCurrentEvent = "usp_EditCurrentEvent";
        public const string DeleteCurrentEvent = "usp_DeleteCurrentEvent";
        public const string GetList = "usp_GetList";
        public const string GetMasterList = "usp_GetMasterList";
        public const string InsertUpdateUser = "usp_User";
        public const string CheckUserLogin = "usp_CheckUserLogin";
        public const string GetUnitList = "usp_GetUnitList";
        public const string GetUserList = "usp_GetUserList";
        public const string GetStateList = "usp_GetStates";
        public const string GetCityList = "usp_GetCity";
        #region Ivf Dashboard
        public const string GetPatientList = "usp_GetPatientListForDashboard";
        public const string GetPartnerList = "usp_GetPartnerList";
        public const string GetRegistrationDashboardByTrendCount = "usp_GetRegistrationDashboardByTrendCount";
        public const string GetRegistrationDashboardByAgeGroupCount = "usp_GetRegistrationDashboardByAgeGroupCount";
        public const string GetAppointmentDashboardCount = "usp_GetAppointmentDashboardCount";
        public const string GetInvestigationDashboardCount = "usp_GetInvestigationDashboardCount";
        public const string GetBillingDashboardCount = "usp_GetBillingDashboardCount";
        public const string GetTotalRevenueDashboardServiceTypeCount = "usp_GetTotalRevenueDashboardServiceTypeCount";
        public const string GetCoupleDetails = "usp_GetCoupleDetails";
        public const string GetCoupleMFDetails = "usp_GetCoupleMFDetails";
        public const string GetDonor = "CIMS_GetDonor";
        public const string GetToDoListDashboardCount = "usp_GetToDoListDashboardCount";
        public const string GetFootFallDashboardCount = "usp_GetFootFallDashboardCount";
        #endregion
        public const string AddUpdateSpremFreezing = "usp_AddUpdateSpremFreezing";
        public const string AddUpdateSpremFreezingDetails = "usp_AddUpdateSpremFreezingDetails";
        public const string GetEmbryologyDoctorsList = "usp_IVF_GetEmbryologyDoctorsList";
        public const string GetDoctorsList = "usp_IVF_GetDoctorsList";
        public const string GetSpermFreezingDetailsForThawingForView = "usp_GetSpermFreezingDetailsForThawingForView";
        public const string AddUpdateSpremThawing = "usp_IVF_AddUpdateSpermThawing";
        public const string AddUpdateNewART = "usp_AddUpdateNewART";
        public const string AddUpdatePAC = "usp_AddUpdatePAC";
        public const string GetPAC = "usp_GetPAC";
        public const string GetARTCycleList = "usp_GetARTCycleList";
        public const string newCyclebtnFlag = "usp_getnewCyclebtnFlagt";
        public const string QueueList = "usp_GetPatientQueueList";
        public const string CloseVisit = "usp_CloseVisit";
        public const string AddUpdateSemenExamDetails = "usp_AddUpdateSemenExamDetails";
        public const string AddUpdateSemenWash = "usp_AddUpdateSemenWash";
        public const string GetSemenAnalysisList = "usp_GetSemenAnalysisList";
        public const string GetSemenPreparationList = "usp_GetSemenPreparationList";
        public const string GetSALinkByPatientID = "usp_GetSALinkByPatientID";
        public const string UpdateLinkFinalize = "usp_UpdateLinkFinalize";
        public const string GetSemenFreezList = "usp_GetSemenFreezList";
        public const string GetSemenProcessingForThowingTC = "usp_GetSemenProcessingForThowingTC";
        public const string GetSemenThawingDetailFromSemenPrepIDForTC = "usp_GetSemenThawingForTC";
        public const string GetSemenProcessingDetailFromSemenPrepIDForTC = "usp_GetSemenProcessingDetailFromSemenPrepIDForTC";
        public const string GetSemenFreezListByFormNo = "usp_GetSemenFreezListByFormNo";
        public const string GetSpermBankList = "usp_GetSpermBankList";
        public const string UpdateSemenFreezExpiryDates = "usp_UpdateSemenFreezExpiryDates";
        public const string Investigation = "usp_Investigation";
        public const string OPU = "usp_OPU";
        public const string UploadReport = "usp_UploadReport";
        public const string Outcome = "usp_Outcome";
        public const string InsertUpdateOocytrEmbryoVitrification = "usp_InsertUpdateOocytrEmbryoVitrification";
        #region User Role SP's
        public const string UserRoleOperations = "usp_UserRoleAllOperations";
        public const string GetMenu = "usp_GetMainMenu";
        public const string AddRole = "usp_AddUserRole";
        public const string UserRoleAlreadyExists = "usp_UserRoleAlreadyExists";
        public const string GetUserRoleRights = "usp_GetUserRoleRights";
        public const string GetEMRLandingPageData = "usp_GetEMRLandingPageData";

        #endregion

        #region SignalR
        public const string GetActiveTickets = "usp_GetTicketsList";
        public const string CheckForDuplicatetickets = "usp_CheckForDuplicatetickets";
        public const string GetCurrentPatientID = "usp_GetCurrentUser";
        #endregion

        public const string InsertFemaleHistory = "usp_InsertFemaleHistory";
        public const string InsertMaleAllergyHistory = "usp_InsertMaleAllergyHistory";
        public const string InsertObstetricHistory = "usp_InsertObstetricHistory";
        public const string InsertPreviousTreatmentHistory = "usp_InsertPreviousTreatmentHistory";
        public const string InsertPastMedicationHistory = "usp_InsertPastMedicationHistory";
        public const string InsertInsertFamilyHistory = "usp_InsertFamilyHistory";
        public const string GetSinglePatientFemaleHistory = "usp_GetSinglePatientFemaleHistory";
        public const string GetMaleHistory = "usp_GetMaleHistory";
        public const string InsertMaleHistory = "usp_InsertMaleHistory";
        public const string GetSurgeonList = "usp_GetSurgeonList";
        public const string GetAnesthetistList = "usp_GetAnesthetistList";
        public const string GetSurgicalSpermRetrivalByPatientID = "usp_GetSurgicalSpermRetrivalByPatientID";
        public const string InsertSurgicalSpermRetrival = "usp_InsertSurgicalSpermRetrival";
        public const string InsertSurgicalSpermRetrivalImages = "usp_InsertSurgicalSpermRetrivalImages";
        public const string InsertFemaleComplaints = "usp_InsertFemaleComplaints";
        public const string GetSpecificMaleComplaints = "usp_GetSpecificMaleComplaints";
        public const string GetSpecificFemaleComplaints = "usp_GetSpecificFemaleComplaints";
        public const string GetPreviousFollowUpDetails = "usp_GetPreviousFollowUpDetails";
        public const string InsertMaleComplaints = "usp_InsertMaleComplaints";
        public const string GetMalePreviousFollowUpDetails = "usp_GetMalePreviousFollowUpDetails";
        public const string InsertFemaleHistoryImages = "usp_InsertFemaleHistoryImages";
        public const string GetPreviousFollicularScanData = "usp_GetPreviousFollicularScanData";
        public const string GetDICOMStudies = "GetDiCOMStudies";
        public const string GetSingleFollicularScan = "usp_GetSingleFollicularScan";
        public const string InsertFollicularScan = "usp_InsertFollicularScan";
        public const string InsertFollicularScanFromStimulation = "usp_InsertFollicularScanFromStimulation";
        public const string InsertFollicularScanSizeDetails = "usp_InsertFollicularScanSizeDetails";
        public const string InsertFollicularScanImages = "usp_InsertFollicularScanImages";
        public const string InsertCorpusLeteumScan = "usp_InsertCorpusLeteumScan";      //Added by Nayan Kamble
        public const string GetPreviousCorpusLeteumScanData = "usp_GetPreviousCorpusLeteumScanData";  //Added by Nayan Kamble
        public const string GetSingleCLScan = "usp_GetSingleCLScan";  //Added by Nayan Kamble
        public const string GetStimulationChartDetails = "usp_GetStimulationChartDetails";
        public const string GetStimulationChartSizeDetails = "usp_GetStimulationChartSizeDetails";
        public const string InsertStimulationChart = "usp_InsertStimulationChart";
        public const string InsertStimulationAddDrug = "usp_InsertStimulationAddDrug";
        public const string InsertStimulationAddDatewiseDose = "usp_InsertStimulationAddDatewiseDose";
        public const string InsertStimulationE2 = "usp_InsertStimulationE2";
        public const string InsertStimulationProgesterone = "usp_InsertStimulationProgesterone";
        public const string InsertStimulationFSH = "usp_InsertStimulationFSH";
        public const string InsertStimulationLH = "usp_InsertStimulationLH";
        public const string InsertStimulationTrigger = "usp_InsertStimulationTrigger";
        public const string InsertStimulationRemark = "usp_InsertStimulationrRemark";
        public const string InsertStimulationPhysician = "usp_InsertStimulationPhysician";
        public const string InsertStimulationDrugAdministration = "usp_InsertStimulationDrugAdministration";
        public const string GetAllPartnerSpermogram = "usp_GetAllPartnerSpermogram";

        public const string GetAllMalePartnerSpermogram = "usp_MaleGetAllPartnerSpermogram";

        public const string GetPartnerSpermiogramDataByMRNo = "usp_GetPartnerSpermiogramDataByMRNo";
        public const string GetSemenDonorList = "usp_GetSemenDonorList";
        public const string GetSpermDonorList = "usp_GetSpermDonorList";
        public const string GetPartnerPreparationAssesmentData = "usp_GetPartnerPreparationAssesmentData";
        public const string OocyteThawing = "usp_OocyteThawing";
        public const string InsertSemenDetails = "usp_InsertSemenDetails";
        public const string GetSemenDetailsData = "usp_GetSemenDetailsData";
        public const string GetSSRImagesBySNo = "usp_GetSSRImagesBySNo";
        public const string GetDashboardInfo = "usp_GetDashboardInfo";
        public const string DeleteStimulationDrug = "usp_DeleteStimulationDrug";
        public const string DeleteStimulationDrugByID = "usp_DeleteStimulationDrugByID";
        public const string SelfPregnancySucessRateNew = "KPI_rpt_PregnancySucessRate_Self_Donor";
        public const string KPI_rpt_ImplantationRate = "KPI_rpt_ImplantationRate";
        public const string KPI_rpt_ClinicalPregnancyRate = "KPI_rpt_ClinicalPregnancyRate";
        public const string KPI_rpt_CleavageRate = "KPI_rpt_CleavageRate";
        public const string KPI_rpt_LiveBirthRate = "KPI_rpt_LiveBirthRate";
        public const string KPI_rpt_BiochemicalPregnancyRate = "KPI_rpt_BiochemicalPregnancyRate";
        public const string KPI_rpt_OnGoingPregnancyRate = "KPI_rpt_OnGoingPregnancyRate";
        public const string KPI_rpt_FertilizationRate = "KPI_rpt_FertilizationRate";
        public const string KPI_rpt_GoodGradeRate = "KPI_rpt_GoodGradeRate";
        public const string KPI_rpt_IUIPregnancySucessRate = "KPI_rpt_IUIPregnancySucessRate";
        public const string KPI_rpt_PDF = "KPI_rpt_PDF";

        public const string ClinicList = "usp_GetClinicList";

        public const string ManagementCumulativeCases = "Management_CumulativeCases";
        public const string ManagementOverallSuccessRate = "Management_OverallSuccessRate";
        public const string ManagementClinicWise = "Management_ClinicWise";
        public const string ManagementDoctorWiseComparison = "Management_DoctorWiseComparison";
        public const string ManagementCumulativeCasePDF = "Management_CumulativeCasePDF";
        public const string ManagementImageData = "Management_ImageDataRpt";
        public const string ManagementPDFClinicWise = "usp_Management_PDFClinicWise";
        public const string ManagementPDFDoctorWise = "Management_PDFDoctorWise";

        public const string Registration = "usp_Registration";
        public const string InsertUpdateBankDetails = "usp_InsertUpdateBankDetails";
        public const string PatientDuplicacy = "usp_PatientDuplicacy";

        public const string GetSubFormsList = "usp_GetSubFormsList";// added sujata

        // added sp's  for schedule 
        public const string GetScheduleDescriptionList = "usp_GetScheduleDescriptionList";
        public const string AddDoctorScheduleMaster = "usp_DoctorSchedule";
        public const string UpdateDSStatusLanding = "usp_UpdateDSStatusLanding";
        public const string UpdateDoctorSchedule = "usp_UpdateDoctorSchedule";
        public const string AddScheduleDetail = "usp_AddScheduleDetail";
        public const string AddDoctorScheduleDetails = "usp_AddDoctorScheduleDetails";
        public const string GetScheduleListLanding = "usp_GetScheduleListLanding";
        public const string GetScheduleListByDoctorID = "usp_GetScheduleListByDoctorID";
        public const string GetDoctorScheduleDates = "usp_GetDoctorScheduleDates";
        public const string GetDepartmentsByID = "usp_GetDepartmentsByID";
        public const string GetUltrasonographyFormsList = "usp_GetUltrasonographyFormsList";
        public const string UpdateSchedule = "usp_UpdateSchedule";
        // end sp's  for schedule 



        //Added by divya on 11 april 2020 for patient dashboard
        public const string usp_PatientDashboard = "usp_PatientDashboard";
        public const string usp_DashboardPatientList = "usp_DashboardPatientList";


        //for CounterSale
        public const string usp_GetItemsforAutocompleteSearch_New = "usp_GetItemsforAutocompleteSearch_New";
        public const string usp_GetItemBatchListForSearch = "usp_GetItemBatchListForSearch";
        public const string usp_GetItemDetailsByID = "usp_GetItemDetailsByID";
        public const string AddItemSales = "usp_AddItemSales";
        public const string AddItemSalesDetails = "usp_AddItemSalesDetails";
        public const string GetPatientForCounterSale = "usp_GetPatientForVisitCounterSale";

        public const string GetPatientAdvanceList = "usp_GetAdvanceList"; // Added By Chetan 11-12-2024
        public const string AddOrUpdateAdvance = "usp_AddOrUpdateAdvance"; // Added By Chetan 12-12-2024


        //End


        //Added by Trupti on 09/01/2025 for  AddItemStock   
        public const string AddItemStock = "usp_AddItemStock";

        //Added by Trupti on  09/01/2025  for  MaterialConsumptionEntry
        public const string AddMaterialConsumption = "usp_AddMaterialConsumption";
        public const string AddMaterialConsumptionItemDetail = "usp_AddMaterialConsumptionItemDetail";

        //Added by Trupti on  08/01/2025  for  MaterialConsumptionList
        public const string GetMaterialConsumption = "usp_GetMaterialConsumptionList";

        public const string GetMaterialConsumptionItemList = "usp_GetMaterialConsumptionItemDetailList";

        public const string GetStoreMasterList = "usp_GetStoreMasterList";

        #region FertivueDashboard 
        public const string GetRegistrationDashboardTrends = "usp_GetDashboardRegisteredPatientByTrend";
        #endregion

        #region Appointment 
        public const string GetAppointment = "usp_GetAppointments";
        public const string GetPatientVisitList = "usp_GetCityAndClinicNames";
        public const string GetCityAndClinicNames = "usp_GetCityAndClinicNames";
        public const string GetSearchItemData = "usp_GetSearchItemData";

        public const string GetAppointmentsList = "usp_GetAppointmentList";
        public const string GetGenderList = "usp_GetGenderList";
        public const string GetSpecialRegistrationMasterList = "usp_GetSpecialRegistrations";
        #endregion

        #region EMR by rohini
        public const string AddEMRTemplate = "USP_AddEMRTemplate";
        public const string LinkPartner = "usp_LinkPartner";
        public const string AddUpdateEMRTemplateDetails = "USP_AddUpdateEMRTemplateDetails"; //FOR TRANSACTION
        public const string AddUpdateEMRTemplateImages = "USP_AddUpdateEMRTemplateImages";
        public const string GetTemplateList = "usp_GetTemplateList";
        public const string GetTemplateByID = "USP_GetTemplateByID";
        public const string DeleteEMRTemplate = "USP_DeleteEMRTemplate";
        public const string DeactiveEMRTemplate = "USP_DeactiveEMRTemplate";
        public const string GetTemplateByFormID = "USP_GetTemplateByFormID";
        public const string GetAllTemplateList = "USP_GetAllTemplateList";
        public const string GetTemplateData = "USP_GetTemplateData";
        public const string GetFormsList = "usp_GetFormsList";
        #endregion
        #region Consent by rohini
        public const string AddConsentDetails = "USP_AddConsentDetails";
        public const string AddConsentLinkDetails = "USP_AddConsentLinkDetails";
        public const string GetConsentMasterList = "usp_GetConsentMasterList";
        public const string GetConsentLinkList = "USP_GetConsentLinkList";
        public const string GetConsentByID = "USP_GetConsentByID";
        //FOR TRANSACTION
        public const string GetConsentList = "GetConsentList";
        public const string GetConsentDetailsByID = "USP_GetConsentDetailsByID";
        public const string AddConsentActionDetails = "USP_AddConsentActionDetails";
        public const string GetConsentGrid = "USP_GetConsentGrid";
        public const string UpdateConsentFileDetails = "USP_UpdateConsentFileDetails";
        public const string ViewConsentReport = "usp_ViewConsentReport";
        #endregion

        #region Diagnosis by rohini
        public const string AddOtherDiagnosis = "USP_AddOtherDaignosis";
        public const string SetFavouriteDiagnosis = "USP_SetFavouriteDiagnosis";
        public const string RemoveFavouriteDiagnosis = "USP_RemoveFavouriteDaignosis";
        public const string GetFavouriteDiagnosis = "USP_GetFavouriteDiagnosis";
        public const string GetDiagnosis = "USP_GetDiagnosis";
        public const string GetOtherDiagnosis = "USP_GetOtherDiagnosis";
        public const string DeleteOtherDiagnosis = "USP_DeleteOtherDiagnosis";
        public const string AddDiagnosisDeatails = "USP_AddDiagnosisDeatails";
        public const string DeleteDiagnosisDeatails = "USP_DeleteDiagnosisDeatails";
        public const string GetPatientDiagnosis = "USP_GetPatientDiagnosis";
        public const string DeletePatientDiagnosis = "USP_DeletePatientDiagnosis";
        public const string CheckIfDiagnosisAddedToPatient = "USP_CheckIfDiagnosisAddedToPatient";
        #endregion
        #region Cryo Preservation By Rohinee
        //for oocyete Vitrification
        public const string GetVitrificationDetailsForOocytes = "IVFDashboard_GetVitrificationDetailsForOocytes";
        public const string UpdateOocyteVitrification = "USP_UpdateOocyteVitrification";
        public const string GetVitrificationDetailsOocyteBank = "usp_GetVitrificationDetailsOocyteBank";
        public const string GetVitrificationBankHistory = "usp_GetVitrificationBankHistory";
        public const string UpdateFemaleBankTransfer = "USP_UpdateFemaleBankTransfer";
        #endregion
        #region Prescription by rohini
        public const string GetItemsForPrescription = "USP_GetItemsForPrescription";
        public const string GetDrugDetailsByID = "USP_GetDrugDetailsByID";
        public const string GetFavDrugsByTempID = "USP_GetFavDrugsByTempID";
        public const string DeletePatientPrescriptionDetails = "USP_DeletePatientPrescriptionDetails";
        public const string AddPatientPrescriptionDetail = "USP_AddPatientPrescriptionDetail";
        public const string GetTodaysPrescriptionDetails = "USP_GetTodaysPrescriptionDetails";
        public const string GetPreviousPrescriptionDetails = "USP_GetPreviousPrescriptionDetails";
        public const string SetFavDrugsToUser = "USP_SetFavDrugsToUser";
        public const string DeleteFavDrugs = "USP_DeleteFavDrugs";
        public const string GetTemplatesForUsers = "USP_GetTemplatesForUsers";
        public const string GetMoleuleByID = "USP_GetMoleuleByID";
        public const string GetTemplateForDropDown = "USP_GetTemplateForDropDown";
        public const string FillFrequency = "USP_FillFrequency";
        public const string CheckMoleculeIsAllergies = "USP_CheckMoleculeIsAllergies";

        #endregion
        #region IUI BY ROIHINI
        public const string GetIUIDetails = "usp_GetIUIDetails";
        public const string GetFreezSamplesForDonnor = "GetFreezSamplesForDonnor";
        public const string GetThowingDetails = "USP_GetThowingDetails";
        public const string GetDonorListForIUI = "GetDonorListForIUI";
        public const string GetThowSamplesForIUI = "USP_GetThowSamplesForIUI";
        public const string UpdateThowSmaples = "USP_UpdateThowSmaples";
        #endregion
        #region Media BY ROHINI
        public const string GetItemsForMedia = "USP_GetItemsForMedia";
        public const string AddMediaDetails = "USP_AddMediaDetails";
        public const string UpdateMediaDetails = "USP_UpdateMediaDetails";
        public const string GetMediaList = "USP_GetMediaList";
        #endregion
        #region Donor by rohini
        public const string GetDonorList = "USP_GetDonorList";
        public const string AddUpdateDonerRegistration = "USP_AddUpdateDonerRegistration";
       

        #endregion
        #region for Report by rohini
        public const string PatientPrescription = "RP_PatientPrescription";
        public const string RP_UnitDetails = "RP_UnitDetails";
        #endregion

        #region Added By Vikrant For Vitals
        public const string SaveVitals = "usp_SaveVitals";
        public const string GetVitalsList = "usp_GetVitalsList";
        public const string DeleteVitalsByID = "usp_DeleteVitalsByID";
        public const string CheckTodayVisit = "usp_CheckTodayVisit";
        public const string GetActiveVisitByPatient = "GetActiveVisitByPatient";
        public const string GetAllVisitByPatient = "GetAllVisitByPatient";
        #endregion

        #region added by vikrant For embrology
        public const string GetOPUDataForEmbrology = "usp_GetOPUDataForEmbrology";
        public const string SaveUpdateOcyte = "IVFDashBoard_AddUpdateOocyteNumber";
        public const string IVFDashBoard_AddDay0OocList = "IVFDashBoard_AddDay0OocList";
        public const string USP_IVFDashBoard_AddDay0OocListInGhaphicalRepresentationTable = "USP_IVFDashBoard_AddDay0OocListInGhaphicalRepresentationTable";
        public const string fillDayOocyteGrid = "USP_IVFDashBoard_GetGraphicalRepOocList";
        public const string fillDayWiseOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayWise";
        public const string FillDayOneMaster = "USP_IVFDashBoard_FillDayOneMaster";
        public const string SaveDayOne = "USP_IVFDashBoard_SaveUpdateDayOne";
        public const string SaveDaywiseImg = "USP_IVFDashBoard_SaveDaywiseImg";
        public const string DeleteBIOPSY = "USP_DeleteBIOPSY";
        public const string SaveDonarImgToCoupleAgains = "USP_SaveDonarImgToCoupleAgains";
        public const string SaveBIOPSY = "USP_SaveBIOPSY";
        public const string DeleteOocytesImg = "USP_IVFDashBoard_DeleteOocytesImg";
        public const string GetOocytesImg = "USP_IVFDashBoard_GetOocytesImg";
        public const string GetBIOPSYDetails = "USP_GetBIOPSYDetails";
        //For Day 2
        public const string fillDayTwoOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayTwo";
        public const string FillDayTwoMaster = "USP_IVFDashBoard_FillDayTwoMaster";
        public const string SaveDayTwo = "USP_IVFDashBoard_SaveUpdateDayTwo";
        //for Day 3
        public const string fillDayThreeOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayThree";
        public const string FillDayThreeMaster = "USP_IVFDashBoard_FillDayThreeMaster";
        public const string SaveDayThree = "USP_IVFDashBoard_SaveUpdateDayThree";
        //For Day 4
        public const string fillDayFourOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayFour";
        public const string FillDayFourMaster = "USP_IVFDashBoard_FillDayFourMaster";
        public const string SaveDayFour = "USP_IVFDashBoard_SaveUpdateDayFour";
        //For Day 5
        public const string fillDayFiveOocyteGrid = "USP_IVFDashBoard_GetOocytesForDayFive";
        public const string FillDayFiveMaster = "USP_IVFDashBoard_FillDayFiveMaster";
        public const string SaveDayFive = "USP_IVFDashBoard_SaveUpdateDayFive";
        //For Day 6
        public const string fillDaySixOocyteGrid = "USP_IVFDashBoard_GetOocytesForDaySix";
        public const string FillDaySixMaster = "USP_IVFDashBoard_FillDaySixMaster";
        public const string SaveDaySix = "USP_IVFDashBoard_SaveUpdateDaySix";

        //for day 0 by rohini
        public const string GetOocytesForDay0 = "USP_IVFDashBoard_GetOocytesForDay0";
        public const string SaveUpdateDayZero = "USP_IVFDashBoard_SaveUpdateDayZero";
        public const string GetOocytesGridForDay0 = "USP_IVFDashBoard_GetOocytesGridForDay0";
        public const string UpdateFinalizedDayZero = "USP_IVFDashBoard_UpdateFinalizedDayZero";
        public const string GetOocytDetailsByID = "USP_IVFDashBoard_GetOocytDetailsByID";
        public const string CheckLinkCouplecycleAvialbleOrNot = "USP_CheckLinkCouplecycleAvialbleOrNot";
        public const string GetSemenDetails = "USP_IVFDashBoard_GetSemenDetailsForDay0";
        #endregion

        #region Added By Vikrant For ET
        public const string FillETMasters = "usp_FillETMasters";
        public const string FillETGrid = "usp_FillETGrid";
        public const string SaveET = "usp_SaveET";
        public const string SaveETD = "usp_SaveETD";     //Added by Nayan Kamble
        public const string SaveETImg = "usp_SaveETImg";
        public const string GetETEmbryoImg = "usp_GetETEmbryoImg";
        public const string DeleteETImg = "usp_DeleteETImg";
        #endregion

        #region Added By Vikrant For Vitrification
        public const string GetFreezeEmbryo = "usp_GetFreezeEmbryo";
        public const string FillEmbryoVitrificationMasters = "usp_FillEmbryoVitrificationMasters";
        public const string UpdateFreezeEmbryo = "usp_UpdateFreezeEmbryo";
        public const string ISAllEmbryoFreeze = "usp_ISAllEmbryoFreeze";
        #endregion

        #region Added By Vikrant For EmbryoThowing
        public const string GetFreezeEmbryoForThowing = "usp_GetFreezeEmbryoForThowing";
        public const string FillEmbryoThowMasters = "usp_FillEmbryoThowMasters";
        public const string SaveThawEmbryo = "usp_SaveThawEmbryo";
        public const string GetThawingData = "usp_GetThawingData";

        #endregion

        #region Added By Vikrant For Page config Setting
        public const string GetcycleType = "usp_GetcycleType";
        #endregion

        #region Added By vikrant For GetDonorList For Oocyte/emb Thaw 
        public const string GetDonorListForOocyteCryo = "usp_GetDonorListForOocyteCryo";
        public const string GetVitrificationDetails = "usp_GetVitrificationDetails";
        public const string GetEmbriyoVitrificationDetails = "usp_GetVitrificationDetailsOfDonorEmbriyo";

        public const string SaveTransferData = "usp_SaveTransferData";
        public const string SaveTransferDataEmbriyo = "usp_SaveTransferDataForEmbriyo";
        public const string DonateOocytefromBank = "usp_DonateOocytefromBank";
        public const string DonateEmbryofromBank = "usp_DonateEmbryofromBank";
        #endregion

        public const string GetPatientListForDonor = "usp_ConvertToDonor";
        public const string convertDonor = "usp_usp_PatientConvertTODonor";
        public const string GetAdvanceBalanceAmount = "usp_GetAdvanceBalanceAmount"; // Added By Chetan 16-12-2024
        //lab sp
        public const string AddPathOrderBooking = "usp_AddPathOrderBooking";
        public const string AddPathOrderBookingDetail = "usp_AddPathOrderBookingDetail";
        public const string AddPathPatientReport = "usp_AddPathPatientReport";
        public const string AddPathPatientParameterDetails = "usp_AddPathPatientParameterDetails";
        public const string GetPathDetailListForResultEntry = "usp_GetPathDetailListForResultEntry";
        public const string GetHelpValuesFroResultEntry = "usp_GetHelpValuesFroResultEntry";
        public const string GetPathoResultEntry = "usp_GetPathoResultEntry";

        //end

        #region Added By CDS For Quality Control
        public const string GetQualityControlList = "USP_GetQualityControl";
        public const string AddUpdateQualityControl = "USP_AddUpdateQualityControl";
        public const string DeleteQualityControlByID = "usp_DeleteQualityControlByID";
        #endregion

        public const string CheckDuplicateCryoNo = "usp_CheckDuplicateCryoNo";
        public const string CheckDuplicateFreezingNo = "usp_CheckDuplicateFreezingNo";

        public const string GetPatientVisit = "usp_GetPatientForVisit";
        public const string GetDDLists = "usp_GetMasterList";
        public const string GetAllDoctorList = "usp_GetAllDoctorsList";
        public const string GetPatientCatBySrcID = "usp_GetPatientCatBySrcID";
        public const string GetPatientRelation = "usp_GetPatientRelation";
        public const string GetAssCompByCompID = "usp_GetAssCompByCompID";
        public const string GetTariffByAssCompID = "usp_GettariffByAssComp";
        public const string GetVisitlist = "usp_GetVisitlist";
        public const string GetSponserlist = "usp_GetSponserlist";
        public const string AddVisit = "usp_AddVisit";
        public const string SetTokenNo = "usp_SetTokenNo";

        public const string GetDocList = "usp_GetDoctorList";
        public const string GetSubSpecBySID = "usp_GetSpecializationBySID";
        public const string GetCountryList = "usp_GetCountryCode";
        public const string GetDeptListForDoc = "usp_GetDepartments";
        public const string InsertUpdateDoctor = "usp_InsertUpdateDoctor";
        public const string GetSpecificDoctor = "usp_GetSpecificDoctorByID";
        public const string GetDoctDetailByName = "usp_GetDoctorDetailsByName";
        public const string GetDayMaster = "usp_GetDayMaster";
        public const string GetSlotMaster = "usp_GetSlotMaster";    //Added by Nayan Kamble on 21/11/2019
        public const string GetAllDoctorNames = "usp_GetAllDoctorNames";
        public const string GetRIPSV = "usp_GetRIPSV";
        public const string GetGraphData = "GetGraphData";

        public const string SaveVisitRemarkfromQueue = "usp_QueSaveVisitRemark";

        #region added on 07102019 for Clinic Master merging
        public const string ClinicMaster = "usp_UnitMaster";
        #endregion

        #region added on 09102019 for Staff Master merging
        public const string GetStaffList = "usp_GetStaffList";
        public const string InsertUpdateStaff = "usp_InsertUpdateStaff";
        #endregion

        #region    added by Nayan Kamble on 09/01/2020
        //Billing
        public const string BillingService = "usp_GetBillingService";
        public const string SaveBill = "usp_SaveBill";
        public const string AddUpdatePaymentDetails = "usp_AddUpdatePaymentDetails";
        public const string AddUpdateBill = "usp_AddUpdateBill";
        public const string AddCharge = "usp_AddCharge";
        public const string AddChargeDetails = "usp_AddChargeDetails";
        public const string AddUpdatePayment = "usp_AddUpdatePayment";
        public const string GetBillListForSearch = "usp_GetBillListForSearchNew";
        public const string GetSavedBillList = "usp_GetSavedBillList";
        public const string UpdateBillCancellationDetails = "usp_UpdateBillCancellationDetails"; // Added By Chetan 26-12-2024
        public const string UpdateCharge = "usp_UpdateCharge";
        public const string UpdateChargeDetails = "usp_UpdateChargeDetails";
        public const string UpdateBill = "usp_UpdateBill";
        public const string DeleteService = "usp_DeleteBillService";
        public const string GetPatientDetails = "usp_GetPatientDetails";
        public const string GetPatientDetailsForBillCancellation = "usp_GetPatientDetailsForBillCancellation";
        public const string GetPaymentDetailsForSettleBill = "usp_GetPaymentDetailsForSettleBill";

        public const string UpdateChargeWhileSettle = "usp_UpdateChargeWhileSettle";
        public const string UpdateChargeDetailsWhileSettle = "usp_UpdateChargeDetailsWhileSettle";   //
        public const string InsertChargeDetailsWhileSettle = "usp_InsertChargeDetailsWhileSettle";

        public const string GetChargeList = "usp_GetCharges";
        public const string UpdateBillPaymentDetails = "usp_UpdateBillPaymentDetails";
        public const string GetReceiptList = "usp_GetReceiptList";
        public const string GetPathoTestParameterAndSubTestDetailsList = "usp_GetPathoTestParameterAndSubTestDetailsList";
        public const string GetCheckInPatientsList = "usp_GetCheckInPatientsList";   //Added by Trupti on 3-12-2024 For biiling
        public const string GetPatientAdvanceReport = "usp_GetPatientAdvanceReport"; // Added By Chetan 26-12-2024
        #endregion

        #region added on 01stJun2020 for Inventory
        public const string StoreMaster = "usp__StoreMaster";
        public const string GetItemConversionsList = "usp_GetItemConversionsListByItemID";
        #endregion

        #region added by Aniket on 11Aug2020 for FinancialKPIs
        public const string FinancialKPIsList = "usp_FinancialKPIsList";
        #endregion

        #region added by Aniket on 03Sept2020 for Patient Advance
        public const string PatientAdvance = "usp_AddAdvance";
        public const string GetAdvanceList = "usp_GetAdvance";
        #endregion

        #region added by Aniket on 23Sept2020 for Patient Advance Refund
        public const string PatientAdvanceRefund = "usp_AddRefund";
        public const string GetRefundList = "usp_GetRefund";
        public const string AddOrUpdateRefundForBill = "usp_AddOrUpdateRefundForBill"; // Added By Chetan 19-12-2024
        public const string AddOrUpdateRefund = "usp_AddOrUpdateRefund"; // Added By Chetan 17-12-2024

        public const string GetPatientRefundList = "usp_GetRefundList"; // Added By Chetan 18-12-2024

        public const string GetBillListForRefund = "usp_GetBillListForRefund"; // Added By Chetan 20-12-2024
        public const string GetBillListForService = "usp_GetBillListForService"; // Added By Chetan 20-12-2024
        #endregion
        public const string GetServiceWiseBillingReport = "usp_GetServiceWiseBillingReport"; // Added By Chetan 26-12-2024
        public const string GetDailyOutstandingReport = "usp_GetDailyOutstandingReport"; // Added By Chetan 26-12-2024
        public const string GetDiscountRegisterReport = "usp_GetDiscountRegisterReport"; // Added By Chetan 26-12-2024 
        public const string GetDailyCollectionReport = "usp_GetSummaryOfCollectionReport"; // Added By Chetan 26-12-2024 
        public const string GetUnitListByUserID = "usp_GetUnitListByUserID"; // Added By Chetan 03-02-2024
        public const string GetDailyRevenueReport = "usp_GetDailyRevenueReport"; // Added By Chetan 26-12-2024
        public const string GetRefundReportReciept = "usp_GetRefundReportReciept"; // Added By Chetan 26-12-2024
        //Added by Aniket on 15Sept2020 for Payment Mode Validation Through Database
        public const string GetPaymentModeValidation = "USP_FillPayMode_Validations";
        public const string GetRemainingOPUCount = "usp_GetRemainingOPUCount";
        public const string GetRemainingOPUPatientList = "usp_GetRemainingOPUPatientList";
        public const string GetPatientHistorySummary = "usp_GetPatientHistorySummary"; // Added By Chetan 31-12-2024
        public const string GetUnitDetails = "usp_GetUnitDetails"; // Added By Chetan 09-01-2024
        public const string GetRegistrationDashboardByTrendPatientList = "usp_GetRegistrationDashboardByTrendPatientList";
        public const string GetRegistrationDashboardByAgeGroupPatientList = "usp_GetRegistrationDashboardByAgeGroupPatientList";
        public const string GetAppointmentDashboardPatientList = "usp_GetAppointmentDashboardPatientList";
        public const string GetInvestigationDashboardPatientList = "usp_GetInvestigationDashboardPatientList";
        public const string GetBillingDashboardPatientList = "usp_GetBillingDashboardPatientList";
        public const string GetTotalRevenueDashboardServiceTypePatientList = "usp_GetTotalRevenueDashboardServiceTypePatientList";
        public const string GetToDoListDashboardPatientList = "usp_GetToDoListDashboardPatientList";
        public const string GetAdminDashboardPercentageCounts = "usp_GetAdminDashboardPercentageCounts";
        public const string GetFootFallDashboardPatientList = "usp_GetFootFallDashboardPatientList";
        public const string GetAdvanceReciept = "usp_GetAdvanceReciept"; // Added By Chetan 09-01-2024
        public const string GetAdvanceRefundReciept = "usp_GetAdvanceRefundReciept"; // Added By Chetan 09-01-2024
        public const string GetServiceCencellationReciept = "usp_GetServiceCencellationReciept"; // Added By Chetan 09-01-2024
        public const string GetUnitOfMeasure = "usp_GetUnitOfMeasure"; // Added By Chetan 06-01-2024
        public const string GetItemListForPharmacy = "usp_GetItemListForPharmacy"; // Added By Chetan 06-01-2024
        public const string GetBatchCodeForPharmacy = "usp_GetBatchCodeForPharmacy"; // Added By Chetan 10-01-2024
        public const string GetUOMConversionFactor = "usp_GetUOMConversionFactor";

        public const string GetPrescribedItemListForPharmacy = "usp_GetPrescribedItemListForPharmacy"; // Added By Chetan 10-01-2024
        public const string GetBilledPatientListForPharmacy = "usp_GetBilledPatientListForPharmacy"; // Added By Chetan 14-01-2024
        public const string GetBilledPatientItemListForPharmacy = "usp_GetBilledPatientItemListForPharmacy"; // Added By Chetan 16-01-2024
        public const string GetConcessionReason = "usp_GetConcessionReason"; // Added By Chetan 06-01-2024

        public const string AddOrUpdateNewPatientForPharmacy = "usp_AddOrUpdateNewPatientForPharmacy"; // Added By Chetan 14-01-2024
        public const string AddOrUpdateVisitForPharmacy = "usp_AddOrUpdateVisitForPharmacy"; // Added By Chetan 14-01-2024
        public const string AddOrUpdateItemSale = "usp_AddOrUpdateItemSale"; // Added By Chetan 14-01-2024
        public const string AddOrUpdateItemSaleDetails = "usp_AddOrUpdateItemSaleDetails"; // Added By Chetan 14-01-2024
        public const string AddItemStockForPharmacy = "usp_AddItemStock"; // Added By Chetan 14-01-2024
        public const string GetDailyCollectionRpt = "usp_GetDailyCollectionRpt"; // Added By Chetan 30-01-2024
        public const string GetDayWiseInfoForBiopsy = "usp_GetDayWiseInfoForBiopsy"; // Added By Chetan 14-02-2024
        public const string AddIVFDashboardBIOPSYDetails = "usp_AddIVFDashboardBIOPSYDetails"; // Added By Chetan 17-02-2024
        public const string GetPGTUserAuthInfo = "usp_GetPGTUserAuthInfo"; // Added By Chetan 18-02-2024
        public const string AddPGTUserAuthInfo = "usp_AddPGTUserAuthInfo"; // Added By Chetan 18-02-2024                                                              //For Day 7 
        public const string fillDaySevenOocyteGrid = "USP_IVFDashBoard_GetOocytesForDaySeven"; // Added By Chetan 27-02-2025
        public const string FillDaySevenMaster = "USP_IVFDashBoard_FillDaySevenMaster"; // Added By Chetan 27-02-2025
        public const string SaveDaySeven = "USP_IVFDashBoard_SaveUpdateDaySeven";// Added By Chetan 28-02-2025
        public const string InsertOrUpdate_PGT_Requisite = "usp_InsertOrUpdate_PGT_Requisite"; // Added By tejas 12-03-2025       //For pgt 
        public const string InsertUpdatePGTBiopsyDetails = "usp_InsertUpdatePGTBiopsyDetails"; // Added By tejas 12-03-2025       //For pgt
        public const string InsertOrUpdatePGTSampleBiopsyDetails = "usp_InsertOrUpdatePGTSampleBiopsyDetails"; // Added By tejas 12-03-2025       //For pgt
        public const string GetPGTRequisiteDetails = "usp_GetPGTRequisiteDetails";// Added By Chetan 18-03-2025
        public const string GetPGTRequisiteBiopsyDetails = "usp_GetPGTRequisiteBiopsyDetails";// Added By Chetan 18-03-2025
        public const string GetServiceDetailForBill = "usp_GetServiceDetailForBill"; // Added By Chetan 04-02-2024





        //IPD  Added By Trupti
        public const string GetClassMasterList = "usp_GetClassMasterList";
        public const string GetWardMasterList = "usp_GetWardMasterList";
        public const string GetBedMasterList = "usp_GetBedMasterList";
        public const string AddUpdateClassMaster = "usp_AddUpdateClassMaster";
        public const string AddUpdateWardMaster = "usp_AddUpdateWardMaster";
        public const string AddUpdateBedMaster = "usp_AddUpdateBedMaster";
        public const string GetAdmissionTypeMasterList = "usp_GetAdmissionTypeMasterList";
        public const string GetIPDPatientList = "usp_GetIPDPatientList";
        public const string CancelAdmission = "usp_CancelAdmission";
        public const string DeleteMasterForIPD = "usp_DeleteMasterForIPD";
        public const string GetDischargeTypeMasterList = "usp_GetDischargeTypeMasterList";
        public const string GetDischargeDestinationMasterList = "usp_GetDischargeDestinationMasterList";
        public const string GetAdmissionDetailsForDischarge = "usp_GetAdmissionDetailsForDischarge";


        #region PatientPersonalCharacteristics
        public const string SavePersonalCharacteristics = "USP_AddUpdatePatientPersonalCharacteristics";
        public const string GetPersonalCharacteristics = "USP_GetPatientPersonalCharacteristics";
        #endregion
    }
    public class DapperConnection
    {
        private IDbConnection _db = new SqlConnection(ConfigurationManager.ConnectionStrings["PIVFContext"].ConnectionString);
        public IDbConnection DapCon
        {
            get
            {
                return _db;
            }
            set
            {
                _db = value;
            }
        }
    }
}

