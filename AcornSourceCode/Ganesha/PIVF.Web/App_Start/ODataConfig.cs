using PIVF.Entities.Models.Master.IVF;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;
using Audit.SqlServer.Providers;
//using PIVF.Web.Models.DTO.Audit;
using PIVF.Entities.Models;
using System.Net.Http;
using PIVF.Entities.Models.EMR;
using PIVF.Entities.Mapping.Clinic;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Patient;
using PIVF.Entities.Models.Clinic;
using System.Collections.Generic;

namespace PIVF.Web

{
    public static class ODataConfig
    {
        public static void Register(HttpConfiguration config)

        {
            ODataModelBuilder builder = new ODataConventionModelBuilder();
            config.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
            builder.EntitySet<Tickets>("Tickets");
            var userNamefunction = builder.Function("GetActiveTickets");
            userNamefunction.Parameter<string>("UserName");
            userNamefunction.Parameter<string>("generatedToken");
            userNamefunction.Parameter<bool>("checkStatus");
            userNamefunction.Parameter<int>("flag");
            userNamefunction.ReturnsCollectionFromEntitySet<Tickets>("Tickets");
            builder.EntitySet<Tickets>(typeof(Tickets).Name);


            var CurrentPatientIDBuilder = builder.EntitySet<Tickets>("Tickets");
            var CurrentPatientIDfunction = builder.Function("GetCurrentUserPatientID");
            //   CurrentPatientIDfunction.ReturnsCollectionFromEntitySet<Tickets>("Tickets");
            CurrentPatientIDfunction.ReturnsCollection<int>();
            builder.EntitySet<Tickets>(typeof(Tickets).Name);
            
            var DoctorBuilder = builder.EntitySet<Tickets>("Tickets");
            var DoctorFunc = builder.Action("UpdateTicket");
            DoctorFunc.ReturnsCollection<int>();

            var GenderBuilder = builder.EntitySet<Gender>("Gender");
            var Genderfunction = builder.Function("GetDDGenderList");
            Genderfunction.Returns<Gender>();

            var SpecializationBuilder = builder.EntitySet<Specialization>("Specialization");
            var Specializationfunction = builder.Function("GetDDSpecializationList");
            Specializationfunction.Returns<Specialization>();

            var MaritalStatusBuilder = builder.EntitySet<MaritalStatus>("MaritalStatus");
            var MaritalStatusfunction = builder.Function("GetDDMaritalStatusList");
            MaritalStatusfunction.Returns<MaritalStatus>();

            var DoctorTypeBuilder = builder.EntitySet<DoctorType>("DoctorType");
            var DoctorTypefunction = builder.Function("GetDDDoctorTypeList");
            DoctorTypefunction.Returns<DoctorType>();

            var DoctorCategoryBuilder = builder.EntitySet<DoctorCategory>("DoctorCategory");
            var DoctorCategoryfunction = builder.Function("GetDDDoctorCategoryList");
            DoctorCategoryfunction.Returns<DoctorCategory>();

            var SubSpecializationBuilder = builder.EntitySet<SubSpecialization>("SubSpecialization");
            var SubSpecializationfunction = builder.Function("GetSubSpecBySID");
            SubSpecializationfunction.Returns<SubSpecialization>();

            var CalcAge = builder.Function("CalculateAge");
            CalcAge.Returns<int>();

            var CountryBuilder = builder.EntitySet<Country>("Country");
            var Countryfunction = builder.Function("GetCountryCode");
            Countryfunction.Returns<Country>();

            var DepartmentListForDocBuilder = builder.EntitySet<DepartmentListForDoc>("DepartmentListForDoc");
            var DepartmentListForDocfunction = builder.Function("GetDepartmentListForDoc");
            DepartmentListForDocfunction.Returns<DepartmentListForDoc>();

            var ClassificationBuilder = builder.EntitySet<Classification>("Classification");
            var Classificationfunction = builder.Function("GetDDClassificationList");
            Classificationfunction.Returns<Classification>();


            builder.EntitySet<AuditDTO>("AuditDTO");
            var DoctorAudit = builder.Action("DoctorAudit");
            DoctorAudit.CollectionParameter<AuditDTO>("AuditData");
            DoctorAudit.Returns<int>();
            builder.EntitySet<AuditDTO>(typeof(AuditDTO).Name);

            builder.EntitySet<Doctor>("Doctors");
            var Doctor = builder.Action("Post");
            Doctor.CollectionParameter<Doctor>("Data");
            Doctor.Returns<int>();
            builder.EntitySet<Doctor>(typeof(Doctor).Name);

            ////Begin:Added by AniketK on 07Oct2019
            builder.EntitySet<Department>("Departments");
            var Department = builder.Function("PutData");
            Department.Parameter<int>("DeptID");
            Department.Parameter<string>("ChangedObject");
            Department.ReturnsCollectionFromEntitySet<Department>("Departments");
            builder.EntitySet<Department>(typeof(Department).Name);
            ////End:Added by AniketK on 07Oct2019

            builder.EntitySet<Country>("Countries");
            var Countries = builder.Function("Put");
            Countries.Parameter<int>("CountryId");
            Countries.Parameter<string>("OldDataValue");
            Countries.ReturnsCollectionFromEntitySet<Country>("Countries");
            builder.EntitySet<Country>(typeof(Country).Name);

            builder.EntitySet<State>("States");
            var State = builder.Function("PutData");
            State.Parameter<int>("StateID");
            State.Parameter<string>("ChangedObject");
            State.ReturnsCollectionFromEntitySet<State>("States");
            builder.EntitySet<State>(typeof(State).Name);


            builder.EntitySet<City>("Citys");
            var City = builder.Function("PutData");
            City.Parameter<int>("CityID");
            City.Parameter<string>("ChangedObject");
            City.ReturnsCollectionFromEntitySet<City>("Citys");
            builder.EntitySet<City>(typeof(City).Name);



            var SpecDocBuilder = builder.EntitySet<Doctor>("Doctor");
            var SpecDocfunction = builder.Function("GetSpecificDoctor");
            SpecDocfunction.ReturnsCollectionFromEntitySet<Doctor>("Doctor");

            var DetailByNameBuilder = builder.EntitySet<Doctor>("Doctor");
            var DetailByNamefunction = builder.Function("GetDoctDetailByName");
            DetailByNamefunction.ReturnsCollectionFromEntitySet<Doctor>("Doctor");

            var GetAllDoctorNamesBuilder = builder.EntitySet<Doctor>("Doctor");
            var GetAllDoctorNamesfunction = builder.Function("GetAllDoctorNames");
            GetAllDoctorNamesfunction.ReturnsCollectionFromEntitySet<Doctor>("Doctor");

            var GetDayMasterBuilder = builder.EntitySet<Doctor>("Doctor");
            var GetDayMasterfunction = builder.Function("GetDayMaster");
            GetDayMasterfunction.ReturnsCollectionFromEntitySet<Doctor>("Doctor");

            var UnitBuilder = builder.EntitySet<Unit>("Unit");
            var Unitfunction = builder.Function("GetDDUnitList");
            Unitfunction.Returns<Unit>();

            #region Added on 10102019 for Clinic & Staff master merging

            builder.EntitySet<Designation>("Designations");
            var Designation = builder.Function("PutData");
            Designation.Parameter<int>("DegID");
            Designation.Parameter<string>("ChangedObject");
            Designation.ReturnsCollectionFromEntitySet<Designation>("Designations");
            builder.EntitySet<Designation>(typeof(Designation).Name);

            var DesignationBuilder = builder.EntitySet<Designation>("Designation");
            var Designationfunction = builder.Function("GetDesignationList");
            Designationfunction.Returns<Designation>();

            var GetDepartmentListBuilder = builder.EntitySet<Department>("GetDepartmentListForStaff");
            var GetDepartmentListForStaff = builder.Function("GetDepartmentListForStaff");  // By Umesh
            GetDepartmentListForStaff.Returns<Department>();

            builder.EntitySet<Staff>("Staff");
            var Staff = builder.Action("StaffPost");
            Staff.CollectionParameter<Staff>("Data");
            Staff.Returns<int>();
            builder.EntitySet<Staff>(typeof(Staff).Name);

            var StaffBuilder = builder.EntitySet<Staff>("Staff");
            var StaffByID = builder.Function("GetStaffByID");
            StaffByID.ReturnsCollectionFromEntitySet<Staff>("Staff");
            var ActiveDeactiveStaff = builder.Function("ActivateDeactivateStaff");
            ActiveDeactiveStaff.Returns<int>();

            //builder.EntitySet<State>("States");
            //var State = builder.Function("PutData");
            //State.Parameter<int>("StateID");
            //State.Parameter<string>("ChangedObject");
            //State.ReturnsCollectionFromEntitySet<State>("States");
            //builder.EntitySet<State>(typeof(State).Name);
            
            var StateBuilder = builder.EntitySet<State>("State");
            var Statefunction = builder.Function("GetStateList");
            Statefunction.Returns<State>();

            //builder.EntitySet<City>("Citys");
            //var City = builder.Function("PutData");
            //City.Parameter<int>("CityID");
            //City.Parameter<string>("ChangedObject");
            //City.ReturnsCollectionFromEntitySet<City>("Citys");
            //builder.EntitySet<City>(typeof(City).Name);

            var CityBuilder = builder.EntitySet<City>("City");
            var Cityfunction = builder.Function("GetCityList");
            Cityfunction.Returns<City>();

            #endregion


            // added sujata for appointment  date 7/11/ 19

            var AppointmentBuilder = builder.EntitySet<DoctorAppointments>("Appointment");
            var Appointmentfunction = builder.Function("GetDoctorAppointment");
            Appointmentfunction.Returns<DoctorAppointments>();


            var GetCityAndClinicNamesBuilder = builder.EntitySet<DoctorAppointments>("CityAndClinicNames");
            var GetCityAndClinicNamesfunction = builder.Function("GetCityAndClinicNames");
            GetCityAndClinicNamesfunction.Returns<IEnumerable<Unit>>();

            var GetGetAppointmentStatusBuilder = builder.EntitySet<DoctorAppointments>("GetAppointmentStatus");
            var GetAppointmentStatusfunction = builder.Function("GetAppointmentStatus");
            GetAppointmentStatusfunction.Returns<IEnumerable<DoctorAppointments>>();


            var DeleteEventBuilder = builder.EntitySet<DoctorAppointments>("DeleteEvent");
            var DeleteEventfunction = builder.Function("DeleteCurrentEvent");
            DeleteEventfunction.ReturnsCollectionFromEntitySet<DoctorAppointments>("DeleteEvent");


            var RescheduleEventBuilder = builder.EntitySet<DoctorAppointments>("RescheduleEvent");
            var RescheduleEventfunction = builder.Function("RescheduleAppointment");
            RescheduleEventfunction.ReturnsCollectionFromEntitySet<DoctorAppointments>("RescheduleEvent");


            var EditEventBuilder = builder.EntitySet<DoctorAppointments>("EditEventEvent");
            var EditEventfunction = builder.Function("EditCurrentEvent");
            EditEventfunction.ReturnsCollectionFromEntitySet<DoctorAppointments>("EditEvent");

            var GetAvailableAppointmentSlotsBuilder = builder.EntitySet<DoctorAppointments>("GetAvailableAppointmentSlotsEvent");
            var GetAvailableAppointmentSlotsfunction = builder.Function("GetAvailableAppointmentSlots");
            GetAvailableAppointmentSlotsfunction.ReturnsCollectionFromEntitySet<DoctorAppointments>("GetAvailableAppointmentSlotsEvent");


            var GetSearchItemDataBuilder = builder.EntitySet<DoctorAppointments>("SearchItemData");
            var GetSearchItemDatafunction = builder.Function("GetSearchItemData");
            GetSearchItemDatafunction.Returns<IEnumerable<DoctorAppointments>>();


            var PatientVisitLstBuilder = builder.EntitySet<Entities.Models.Master.Patient.VisitType>("PatientVisitLst");
            var PatientVisitLstfunction = builder.Function("GetPatientVisitList");
            PatientVisitLstfunction.ReturnsCollectionFromEntitySet<Entities.Models.Master.Patient.VisitType>("PatientVisitLst");

            var AddEventBuilder = builder.EntitySet<DoctorAppointments>("AddEvent");
            var AddEventfunction = builder.Function("AddNewAppointment");
            AddEventfunction.ReturnsCollectionFromEntitySet<DoctorAppointments>("AddEvent");

            var AppointmentsBuilder = builder.EntitySet<Entities.Models.Clinic.Appointments>("Appointments");
            var Appointmentsfunction = builder.Function("LoadAllAppointments");
            Appointmentsfunction.Returns<Entities.Models.Clinic.Appointments>();

            var SearchAppointmentsBuilder = builder.EntitySet<Entities.Models.Clinic.Appointments>("Appointments");
            var SearchAppointmentsfunction = builder.Function("SearchAppointments").Returns<Entities.Models.Clinic.Appointments>();

            var GetGenderListBuilder = builder.EntitySet<Gender>("GenderList");
            var GetGenderListfunction = builder.Function("GetGenderList");
            GetGenderListfunction.Returns<Gender>();
            
            var SpecialRegistrationMasterBuilder = builder.EntitySet<SpecialRegistrationMaster>("SpecialRegistrationMaster");
            var SpecialRegistrationMasterfunction = builder.Function("GetSpecialRegistrationMasterList");
            SpecialRegistrationMasterfunction.Returns<SpecialRegistrationMaster>();

           // var GetAvailableAppointmentSlotsModifiedBuilder = builder.EntitySet<Entities.Models.Clinic.Appointments>("AppoinmentInput");
           // var GetAvailableAppointmentSlotsModifiedfunction = builder.Function("GetAvailableAppointmentSlotsModified");
          //  GetAvailableAppointmentSlotsModifiedfunction.ReturnsCollectionFromEntitySet<Entities.Models.Clinic.Appointments>("AppoinmentInput");


            // Ended sujata for appointment  date 7/11/ 19


            //start  added sujata for Schedule

            var SpecScheduleBuilder = builder.EntitySet<Schedule>("Schedule");
            var SpecSchedulefunction = builder.Function("AddDoctorScheduleDetails");
            SpecSchedulefunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");


            var UnitByDocIDBuilder = builder.EntitySet<CommanEntity>("CommanEntity");
            var UnitByDocIDfunction = builder.Function("GetUnitListDoctorIDForSchedule");
            UnitByDocIDfunction.Returns<CommanEntity>();

            var DeptIDListDoctorIDAndUnitIDBuilder = builder.EntitySet<CommanEntity>("CommanEntity");
            var DeptIDListDoctorIDAndUnitIDfunction = builder.Function("GetDeptIDListDoctorIDAndUnitID");
            DeptIDListDoctorIDAndUnitIDfunction.Returns<CommanEntity>();

            var GetDeptIDByUnitIDFOrAppointmentBuilder = builder.EntitySet<CommanEntity>("CommanEntity");
            var GetDeptIDByUnitIDFOrAppointmentfunction = builder.Function("GetDeptIDListDoctorIDAndUnitID");
            GetDeptIDByUnitIDFOrAppointmentfunction.Returns<CommanEntity>();

            var SpeAddScheduleDetailBuilder = builder.EntitySet<Schedule>("Schedule");
            var SpecAddScheduleDetailfunction = builder.Function("AddScheduleDetail");
            SpecAddScheduleDetailfunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");

            var SpecAddDoctorScheduleBuilder = builder.EntitySet<Schedule>("Schedule");
            var SpecAddDoctorSchedulefunction = builder.Function("AddDoctorScheduleMaster");
            SpecAddDoctorSchedulefunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");

            var SpecUpdateDoctorScheduleBuilder = builder.EntitySet<Schedule>("Schedule");
            var SpecUpdateDoctorSchedulefunction = builder.Function("UpdateDoctorSchedule");
            SpecUpdateDoctorSchedulefunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");


            var SpecGetScheduleListByDoctorID = builder.EntitySet<Schedule>("Schedule");
            var SpecGetScheduleListByDoctorIDfunction = builder.Function("GetScheduleListByDoctorID");
            SpecGetScheduleListByDoctorIDfunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");




            var SpecGetScheduleListLanding = builder.EntitySet<Schedule>("Schedule");
            var SpecGetScheduleListLandingfunction = builder.Function("GetScheduleListLanding");
            SpecGetScheduleListLandingfunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");

            var SpecUpdateDSStatusLanding = builder.EntitySet<Schedule>("Schedule");
            var SpecUpdateDSStatusLandingfunction = builder.Function("UpdateDSStatusLanding");
            SpecUpdateDSStatusLandingfunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");

            var SpecGetDoctorScheduleDates = builder.EntitySet<Schedule>("Schedule");
            var SpecGetDoctorScheduleDatesfunction = builder.Function("GetDoctorScheduleDates");
            SpecGetDoctorScheduleDatesfunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");

            var SpecGetDepartmentsByID = builder.EntitySet<Schedule>("Schedule");
            var SpecGetDepartmentsByIDfunction = builder.Function("GetDepartmentsByID");
            SpecGetDepartmentsByIDfunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule");


            //Added by Nayan Kamble on 21/11/2019
            var SpecGetSlot = builder.EntitySet<Schedule>("Schedule");
            var SpecGetSlotfunction = builder.Function("GetSlotMaster");
            SpecGetSlotfunction.ReturnsCollectionFromEntitySet<Schedule>("Schedule"); 
            //END


            // end  sujata for Schedule



            var model = builder.GetEdmModel();
            config.MapODataServiceRoute(
                    routeName: "odata",
                    routePrefix: "odata",
                    model: model
                );

          
            config.EnsureInitialized();
            config.AddODataQueryFilter();
            
            //Added sql server configuratiomn for saving data in database//
            Audit.Core.Configuration.DataProvider = new SqlDataProvider()
            {
                ConnectionString =
                "data source=PISPL\\SQL2014;initial catalog=NORTHWND;User ID=sa;Password=Rational@10;",
                Schema = "dbo",
                TableName = "Event",
                IdColumnName = "EventId",
                JsonColumnName = "Data",
                LastUpdatedDateColumnName = "LastUpdatedDate",
                //OldDataValueColumnName= "OldDataValue"
            };           

        }
    }
}