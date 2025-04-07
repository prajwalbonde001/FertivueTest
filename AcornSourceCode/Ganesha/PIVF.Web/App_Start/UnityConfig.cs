using System;
using Microsoft.Practices.Unity;
using PIVF.Entities.Models;
using Repository.Pattern.DataContext;
using Repository.Pattern.Ef6;
using Repository.Pattern.Repositories;
using Repository.Pattern.UnitOfWork;
using PIVF.Entities.Models.Master.IVF;
using PIVF.BusinessLayer;
using PIVF.DataAccessLayer;
using PIVF.BusinessLayer.EMR.MaleHistory;
using PIVF.DataAccessLayer.EMR.MaleHistory;
using PIVF.BusinessLayer.EMR.DesignEMR;
using PIVF.DataAccessLayer.EMR.DesignEMR;
using PIVF.BusinessLayer.Ticket;
using PIVF.DataAccessLayer.Ticket;
using PIVF.DataAccessLayer.EMR.Diagnosis;
using PIVF.BusinessLayer.EMR.Diagnosis;
using PIVF.BusinessLayer.EMR.FemaleHistory;
using PIVF.DataAccessLayer.EMR.FemaleHistory;
using PIVF.BusinessLayer.EMR.Vitals;
using PIVF.DataAccessLayer.EMR.Vitals;
using PIVF.BusinessLayer.EMR.Prescription;
using PIVF.DataAccessLayer.EMR.Prescription;
using PIVF.BusinessLayer.ARTMgmt.Embrology;
using PIVF.DataAccessLayer.ARTMgmt.Embrology;
using PIVF.BusinessLayer.ARTMgmt.IUI;
using PIVF.DataAccessLayer.ARTMgmt.IUI;
using PIVF.BusinessLayer.ARTMgmt.StimulationChart;
using PIVF.DataAccessLayer.ARTMgmt.StimulationChart;
using PIVF.DataAccessLayer.Donor;
using PIVF.BusinessLayer.Donor;
using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation;
using PIVF.DataAccessLayer.ARTMgmt.Cryo_Preservation;
using PIVF.BusinessLayer.ARTMgmt.EmbryoTransfer;
using PIVF.DataAccessLayer.ARTMgmt.EmbryoTransfer;
using PIVF.BusinessLayer.ARTMgmt.SemenDetails;
using PIVF.DataAccessLayer.ARTMgmt.SemenDetails;
using PIVF.BusinessLayer.ARTMgmt.MediaConsumption;
using PIVF.DataAccessLayer.ARTMgmt.MediaConsumption;
using PIVF.DataAccessLayer.Consent.ConsentMaster;
using PIVF.BusinessLayer.Consent.ConsentMaster;
using PIVF.BusinessLayer.Consent.ConsentAction;
using PIVF.DataAccessLayer.Consent.ConsentAction;
using PIVF.BusinessLayer.LinkPartner;
using PIVF.DataAccessLayer.LinkPartner;
using PIVF.DataAccessLayer.KPI;
using PIVF.BusinessLayer.KPI;
using PIVF.BusinessLayer.QualityControl;
using PIVF.DataAccessLayer.QualityControl;
using PIVF.BusinessLayer.Patient;
using PIVF.DataAccessLayer.Patient;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.BusinessLayer.Master.Clinic;
using PIVF.DataAccessLayer.Master.Clinic;
using PIVF.BusinessLayer.Clinic;
using PIVF.DataAccessLayer.Clinic;
using PIVF.Entities.Models.Clinic;
using PIVF.BusinessLayer.NewRegistration;  // Added bhagyashree for new reg
using PIVF.DataAccessLayer.NewRegistration; // Added bhagyashree for new reg
using PIVF.BusinessLayer.PatientDashboard;//Added by Divya on 3 jan 2020
using PIVF.DataAccessLayer.PatientDashboard;//Added by Divya on 3 jan 2020
using PIVF.BusinessLayer.Billing;
using PIVF.DataAccessLayer.Billing;
using PIVF.BusinessLayer.Lab;
using PIVF.DataAccessLayer.Lab;
using PIVF.BusinessLayer.FinancialKPIs;
using PIVF.DataAccessLayer.FinancialKPIs;
using PIVF.BusinessLayer.CounterSale; //Added by Divya on 4 Sep 2020
using PIVF.DataAccessLayer.CounterSale; //Added by Divya on 4 Sep 2020
using PIVF.BusinessLayer.ItemStock;
using PIVF.DataAccessLayer.ItemStock;
using PIVF.DataAccessLayer.MaterialConsumptionEntry;
using PIVF.BusinessLayer.MaterialConsumptionEntry;
using PIVF.BusinessLayer.MaterialConsumptionList;
using PIVF.DataAccessLayer.MaterialConsumptionList;
using PIVF.BusinessLayer.IPD;
using PIVF.DataAccessLayer.IPD;
//using PIVF.Entities.Models.Master.Inventory;
//using PIVF.BusinessLayer.Master.Inventory;
//using PIVF.DataAccessLayer.Master.Inventory;


namespace PIVF.Web
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    public class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);
            return container;
        });

        /// <summary>
        /// Gets the configured Unity container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion

        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>There is no need to register concrete types such as controllers or API controllers (unless you want to 
        /// change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.</remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
            // NOTE: To load from web.config uncomment the line below. Make sure to add a Microsoft.Practices.Unity.Configuration to the using statements.
            // container.LoadConfiguration();

            container
                .RegisterType<PIVF.BusinessLayer.ARTMgmt.Outcome.OutcomeBL, PIVF.DataAccessLayer.ARTMgmt.Outcome.OutcomeDAL>()
                .RegisterType<PIVF.BusinessLayer.EMR.Investigation.InvestigationBAL, PIVF.DataAccessLayer.EMR.Investigation.InvestigationDAL>()
                .RegisterType<PIVF.BusinessLayer.EMR.LandingPage.EMRLandingPageBAL, PIVF.DataAccessLayer.EMR.EMRLandingPageDAL.EMRLandingPageDAL>()
                .RegisterType<PIVF.BusinessLayer.ARTMgmt.ReportUpload.ReportUploadBL, PIVF.DataAccessLayer.ARTMgmt.ReportUpload.ReportUploadDAL>()
                .RegisterType<PIVF.BusinessLayer.ARTMgmt.OPU.OPUBAL, PIVF.DataAccessLayer.ARTMgmt.OPU.OPUDAL>()
                .RegisterType<PIVF.BusinessLayer.NewART.NewARTBAL, PIVF.DataAccessLayer.NewART.NewARTDAL>()
                .RegisterType<PIVF.BusinessLayer.QueueMgt.QueueMgtBAL, PIVF.DataAccessLayer.QueueMgt.QueueMgtDAL>()
                .RegisterType<VitalsBAL, VitalsDAL>()
                .RegisterType<PIVF.BusinessLayer.User.UserRoleServiceBAL, PIVF.DataAccessLayer.User.UserRoleServiceDAL>()
                .RegisterType<PIVF.BusinessLayer.UserBL.UserServiceBAL, PIVF.DataAccessLayer.UserDAL.UserServiceDAL>()
                .RegisterType<PIVF.BusinessLayer.Common.CommonServiceBAL, PIVF.DataAccessLayer.Common.CommonServiceDAL>()
                .RegisterType<PIVF.BusinessLayer.FertivueDashboard.FertivueDashboardBAL, PIVF.DataAccessLayer.FertivueDashboad.FertivueDashboardDAL>()

                .RegisterType<PIVF.BusinessLayer.Master.Inventory.IStoreService, PIVF.DataAccessLayer.Master.Inventory.StoreServiceDAL>()
                .RegisterType<PIVF.BusinessLayer.Common.IAwsS3Services, PIVF.DataAccessLayer.Common.AwsS3Services>()

                .RegisterType<SurgicalSpermRetrievalServiceBAL, SurgicalSpermRetrievalServiceDAL>()
                .RegisterType<SemenFreezServiceBAL, SemenFreezServiceDAL>()
                .RegisterType<MaleHistoryServiceBAL, MaleHistoryServiceDAL>()
                .RegisterType<MaleComplaintsBAL, MaleComplaintsDAL>()
                .RegisterType<DesignEMRServiceBAL, DesignEMRServiceDAL>()
                .RegisterType<SemenThawingBAL, SemenThawingDAL>()
                .RegisterType<FemaleHistoryBL, FemaleHistoryServiceDAL>()
                .RegisterType<FemaleComplaintsBL, FemaleComplaintsDAL>()
                .RegisterType<FollicularScanBAL, FollicularScanDAL>()
                .RegisterType<CorpusLeteumScanBAL, CorpusLeteumScanDAL>() //Added by Nayan Kamble
                .RegisterType<StimulationChartBAL, StimulationChartDAL>()
                .RegisterType<IDataContextAsync, PIVFContext>(new PerRequestLifetimeManager())
                .RegisterType<IUnitOfWorkAsync, UnitOfWork>(new PerRequestLifetimeManager())
                .RegisterType<IRepositoryAsync<CommanEntity>, Repository<CommanEntity>>()
                .RegisterType<IRepositoryAsync<Tickets>, Repository<Tickets>>()
                .RegisterType<DiagnosisBL, DiagnosisDAL>()//rohini
                .RegisterType<CryoPreservationBL, CryoPreservationDAL>()//rohini
                .RegisterType<PrescriptionBL, PrescriptioncDAL>()//rohini      
                .RegisterType<IUIBAL, IUIDAL>()//rohini      
                .RegisterType<DonorBL, DonorDAL>()//rohini      
                .RegisterType<MediaConsumptionBAL, MediaConsumptionDAL>()//rohini   
                .RegisterType<ConsentMasterBL, ConsentMasterDAL>()//rohini   
                .RegisterType<ConsentActionBL, ConsentActionDAL>()//rohini   
                .RegisterType<ITicketsService, TicketsService>()
                .RegisterType<SemenAnalysisServiceBAL, SemenAnalysisServiceDAL>()
                .RegisterType<SemenPrepServiceBAL, SemenPreparationDAL>()
                 .RegisterType<LinkPartnerBAL, LinkPartnerDAL>()

            #region Added By Vikrant For Embrology
                    .RegisterType<EmbrologyBAL, EmbrologyDAL>()
            #endregion
            #region Added By Vikrant For ET
                    .RegisterType<EmbryoTransferBAL, EmbryoTransferDAL>()
            #endregion
            #region Added by Vikrant For Embryo Vitrification
                    .RegisterType<EmbryoVitrificationBAL, EmbryoVitrificationDAL>()
            #endregion
            #region Added By Vikrant For Embryo Thowing
                    .RegisterType<EmbryoThowingBAL, EmbryoThowingDAL>()
            #endregion




                .RegisterType<SemenDetailsBAL, SemenDetailsDAL>()
                .RegisterType<IConvertToDonorBAL, ConvertToDonorDAL>()
                 .RegisterType<KPIBAL, KPIDAL>()
                  .RegisterType<ManagementBAL, ManagementDAL>()
                   .RegisterType<RegistrationBAL, RegistrationDAL>()
                   .RegisterType<IRepositoryAsync<Doctor>, Repository<Doctor>>()
                .RegisterType<IDoctorService, DoctorService>()
                .RegisterType<QualityControlBAL, QualityControlDAL>()
                  .RegisterType<IClinicService, ClinicService>()  // added on 07102019 for Clinic Master merging  commented by Nayan Kamble 
            .RegisterType<IRepositoryAsync<Staff>, Repository<Staff>>()
            .RegisterType<IStaffService, StaffService>()          // added on 09102019 for Staff Master merging
            .RegisterType<IRepositoryAsync<Country>, Repository<Country>>()
            .RegisterType<ICountryService, CountryService>()
            .RegisterType<IRepositoryAsync<Department>, Repository<Department>>()
            .RegisterType<IDepartmentService, DepartmentService>()
            .RegisterType<IRepositoryAsync<State>, Repository<State>>()
             .RegisterType<IStateService, StateService>()

             .RegisterType<IRepositoryAsync<Schedule>, Repository<Schedule>>()
              .RegisterType<IScheduleService, ScheduleService>()   // added sujata for schedule 
            .RegisterType<NewRegistrationBAL, NewRegistrationDAL>()// added bhagayashree for new registration 

            .RegisterType<PatientDashboardBAL, PatientDashboardDAL>()//Added by Divya for Patient Dashboard

            .RegisterType<FinancialKPIsBAL, FinancialKPIsDAL>()//Added by Aniket for FinancialKPIs

            .RegisterType<IPatientAdvanceBAL, PatientAdvanceDAL>()//Added by Aniket for Patient Advance

            .RegisterType<IPatientAdvanceRefundBAL, PatientAdvanceRefundDAL>()//Added by Aniket for Patient Advance Refund

            .RegisterType<CounterSaleBAL, CounterSaleDAL>() //Added by Divya for CounterSale on 4 Sep2020

            .RegisterType<IRepositoryAsync<DoctorAppointments>, Repository<DoctorAppointments>>()
            .RegisterType<IDoctorAppointmentsService, DoctorAppointmentsService>()
            .RegisterType<NewLabEnteryBAL, NewLabEnteryDAL>()
            .RegisterType<BillingBAL, BillingDAL>()

            .RegisterType<ItemStockBAL, ItemStockDAL>() //Added by Divya for CounterSale on 4 Sep2020
            .RegisterType<MaterialConsumptionEntryBAL, MaterialConsumptionEntryDAL>() //Added by Divya for CounterSale on 4 Sep2020
            .RegisterType<MaterialConsumptionListBAL, MaterialConsumptionListDAL>()
            .RegisterType<IPDBAL, IPDDAL>();


        }
    }
}
