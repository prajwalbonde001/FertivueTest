using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Routing;
//using PIVF.Gemino.Repository.Pattern.UnitOfWork;
using Repository.Pattern.UnitOfWork;
using System.Web.OData.Routing;
using System.Web.OData;
using System.Web.OData.Query;
using System;
using System.Text;
using NLog;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using DataBaseConfiguration;


using System.Web.Http.Description;
using System.Web.Http.Results;
//using System.Web.Http.Description;
//using PIVF.Gemino.DataAccessLayer.Clinic;
//using PIVF.Gemino.Entities;
//using PIVF.Gemino.Entities.Models.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Configuration;
//using PIVF.Gemino.Entities.Mapping.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Patient;

using PIVF.DataAccessLayer.Clinic;
using PIVF.Entities;
using PIVF.Entities.Models.Clinic;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Mapping.Clinic;
using PIVF.Entities.Models.Master.Patient;
using PIVF.Entities.Models.Master.Clinic;
using System.Globalization;


//namespace PIVF.Gemino.Web.Api.Clinic
namespace PIVF.Web.Api.Clinic
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using PIVF.Gemino.Entities.Models.Clinic;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<DoctorAppointments>("DoctorAppointments");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */

    public class DoctorAppointmentsController : ODataController
    {

        private PIVFContext db = new PIVFContext();
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        private readonly DoctorAppointmentsService _doctorAppointmentsService;
        private readonly IUnitOfWorkAsync _unitOfWorkAsync;
        private static Logger logger = LogManager.GetCurrentClassLogger();

        string hoursBuilder, minutesBuilder;

        public DoctorAppointmentsController(IUnitOfWorkAsync unitOfWorkAsync, DoctorAppointmentsService doctorAppointmentsService)
        {
            _unitOfWorkAsync = unitOfWorkAsync;
            _doctorAppointmentsService = doctorAppointmentsService;
        }


        [HttpGet]
        [ODataRoute("GetDoctorAppointment")]
        public IEnumerable<DoctorAppointments> GetDoctorAppointment(string enteredDate, int DOCID, int DeptID, int UnitID)
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:GetDoctorAppointment,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

            try
            {
                IEnumerable<DoctorAppointments> lstDoc = _doctorAppointmentsService.GetAppointments(enteredDate, DOCID, DeptID, UnitID);

                List<DoctorAppointments> listLstDoc = new List<DoctorAppointments>();
                List<DoctorAppointments> listLstDocUpdated = new List<DoctorAppointments>();

                int enteredHour = 0;
                var currentTimeZone = TimeZoneInfo.Local.Id;
                if (currentTimeZone == "India Standard Time")///India
                {
                    enteredHour = int.Parse(enteredDate.Substring(8, 2));
                }
                else//UK
                {
                    enteredHour = (DateTime.Parse(enteredDate)).Day;
                }


                foreach (var item in lstDoc)
                {
                    DateTime patientAppStartTime = item.PatientAppStartTime;
                    DateTime patientAppEndTime = item.PatientAppEndTime;
                    int lstStartDay = patientAppStartTime.Day;
                    int lstEndDay = patientAppStartTime.Day;
                    if (lstStartDay > enteredHour || lstEndDay < enteredHour)
                    {
                        item.PatientAppEndTime = item.PatientAppStartTime;
                    }

                    if (!string.IsNullOrEmpty(Convert.ToString(item.Photo)))
                    {
                        item.DoctorPhoto = Convert.ToString(System.Text.Encoding.UTF8.GetString(item.Photo));
                    }

                    listLstDoc.Add(item);
                }

                // Make Events Invisible For Date Other Then Patient Selected Date
                //foreach (var item in lstDoc)
                //{
                //    DateTime patientAppStartTime = item.PatientAppStartTime;
                //    DateTime patientAppEndTime = item.PatientAppEndTime;
                //    int lstStartDay = patientAppStartTime.Day;
                //    int lstEndDay = patientAppStartTime.Day;
                //    if (lstStartDay > enteredHour || lstEndDay < enteredHour)
                //    {
                //        item.PatientAppEndTime = item.PatientAppStartTime;
                //    }
                //    listLstDoc.Add(item);
                //}
                lstDoc = listLstDoc.AsEnumerable();

                return lstDoc;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/GetDoctorAppointment Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }


        [HttpGet]
        [ODataRoute("GetCityAndClinicNames")]
        public IEnumerable<Unit> GetCityAndClinicNames()
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:GetCityAndClinicNames,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                IEnumerable<Unit> cityDoc = _doctorAppointmentsService.GetCityAndClinicNames();
                return cityDoc;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/GetCityAndClinicNames Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }



        [HttpGet]
        [ODataRoute("GetAppointmentStatus")]
        public IEnumerable<DoctorAppointments> GetAppointmentStatus()
        {
            try
            {

                logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetAppointmentStatus,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                IEnumerable<DoctorAppointments> apptList = _doctorAppointmentsService.GetAppointmentStatus();
                return apptList;
            }
            catch (SqlException ex)
            {
                logger.Error("DoctorAppointmentsController/GetAppointmentStatus Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }

        }

        [HttpGet]
        [ODataRoute("GetPatientVisitList")]
        public IEnumerable<Entities.Models.Master.Patient.VisitType> GetPatientVisitList()
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:GetPatientVisitList,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                IEnumerable<Entities.Models.Master.Patient.VisitType> patientVisitlst = _doctorAppointmentsService.GetPatientVisitList();
                return patientVisitlst;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/GetPatientVisitList Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }


        [HttpGet]
        [ODataRoute("GetSearchItemData")]
        public IEnumerable<DoctorAppointments> GetSearchItemData(string searchItem)
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:GetSearchItemData,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                IEnumerable<DoctorAppointments> patientSearchlst = _doctorAppointmentsService.GetSearchItemData(searchItem);
                return patientSearchlst;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/GetSearchItemData Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }

        [HttpGet]
        [ODataRoute("DeleteCurrentEvent")]
        public IEnumerable<DoctorAppointments> DeleteCurrentEvent(string title, string startsAt, string endsAt, int status, string ReasonForCancellation, int serverTimeZone)
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:DeleteCurrentEvent,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                changeTime(startsAt, serverTimeZone);
                //changeTimetoGMT(startsAt);   //India
                ////changeTimetoGMTNew2(startsAt);      //Nigeria (Androcare)
                ////changeTimetoGMTMalaysia3(startsAt);  //Malaysia (Victory)
                var startsAtBuilder = new StringBuilder(startsAt);
                startsAtBuilder.Remove(11, 2);
                startsAtBuilder.Insert(11, hoursBuilder);
                startsAtBuilder.Remove(14, 2);
                startsAtBuilder.Insert(14, minutesBuilder);
                startsAt = startsAtBuilder.ToString();

                changeTime(endsAt, serverTimeZone);
                //changeTimetoGMT(endsAt);          //India
                ////changeTimetoGMTNew2(endsAt);      //Nigeria (Androcare)
                ////changeTimetoGMTMalaysia3(endsAt);  //Malaysia (Victory)
                var endsAtBuilder = new StringBuilder(endsAt);
                endsAtBuilder.Remove(11, 2);
                endsAtBuilder.Insert(11, hoursBuilder);
                endsAtBuilder.Remove(14, 2);
                endsAtBuilder.Insert(14, minutesBuilder);
                endsAt = endsAtBuilder.ToString();

                IEnumerable<DoctorAppointments> cityDoc = _doctorAppointmentsService.DeleteCurrentEvent(title, startsAt, endsAt, status, ReasonForCancellation);
                return cityDoc;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/DeleteCurrentEvent Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }

        [HttpGet]
        [ODataRoute("RescheduleAppointment")]
        public IEnumerable<DoctorAppointments> RescheduleAppointment(string selectedSlotStartTime, string selectedSlotEndTime, string patientFirstName, string patientLastName, string patientMobileNumber, int isRescheduleCall, string remark, int DOCID, int DeptID, int APPID, int RescheduleUnitID, int AppReasonID, int serverTimeZone)
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:RescheduleAppointment,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                changeTime(selectedSlotStartTime, serverTimeZone);
                //changeTimetoGMT(selectedSlotStartTime);           //India
                ////changeTimetoGMTNew2(selectedSlotStartTime);       //Nigeria (Androcare)
                ////changeTimetoGMTMalaysia3(selectedSlotStartTime);    //Malaysia (Victory)
                var startsAtBuilder = new StringBuilder(selectedSlotStartTime);
                startsAtBuilder.Remove(11, 2);
                startsAtBuilder.Insert(11, hoursBuilder);
                startsAtBuilder.Remove(14, 2);
                startsAtBuilder.Insert(14, minutesBuilder);
                selectedSlotStartTime = startsAtBuilder.ToString();

                changeTime(selectedSlotEndTime, serverTimeZone);
                //changeTimetoGMT(selectedSlotEndTime);         //India
                ////changeTimetoGMTNew2(selectedSlotEndTime);     //Nigeria (Androcare)
                ////changeTimetoGMTMalaysia3(selectedSlotEndTime);  //Malaysia (Victory)
                var endsAtBuilder = new StringBuilder(selectedSlotEndTime);
                endsAtBuilder.Remove(11, 2);
                endsAtBuilder.Insert(11, hoursBuilder);
                endsAtBuilder.Remove(14, 2);
                endsAtBuilder.Insert(14, minutesBuilder);
                selectedSlotEndTime = endsAtBuilder.ToString();

                IEnumerable<DoctorAppointments> reschedulelst = _doctorAppointmentsService.RescheduleCurrentEvent(selectedSlotStartTime, selectedSlotEndTime, patientFirstName, patientLastName, patientMobileNumber, isRescheduleCall, remark, DOCID, DeptID, APPID, RescheduleUnitID, AppReasonID);
                return reschedulelst;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/RescheduleAppointment Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }

        [HttpGet]
        [ODataRoute("EditCurrentEvent")]
        public IEnumerable<int> EditCurrentEvent(string editedPatientFirstName, string editedPatientMiddleName, string editedPatientLastName, string startsAt, string endsAt, string newStartTime, string newEndTime, string doctorFirstName, string doctorMiddleName, string doctorLastName, string departmentId, int serverTimeZone)
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:EditCurrentEvent,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                changeTime(startsAt, serverTimeZone);
                //changeTimetoGMT(startsAt);
                var startsAtBuilder = new StringBuilder(startsAt);
                startsAtBuilder.Remove(11, 2);
                startsAtBuilder.Insert(11, hoursBuilder);
                startsAtBuilder.Remove(14, 2);
                startsAtBuilder.Insert(14, minutesBuilder);
                startsAt = startsAtBuilder.ToString();

                changeTime(endsAt, serverTimeZone);
                //changeTimetoGMT(endsAt);
                var endsAtBuilder = new StringBuilder(endsAt);
                endsAtBuilder.Remove(11, 2);
                endsAtBuilder.Insert(11, hoursBuilder);
                endsAtBuilder.Remove(14, 2);
                endsAtBuilder.Insert(14, minutesBuilder);
                endsAt = endsAtBuilder.ToString();

                changeTime(newStartTime, serverTimeZone);
                //changeTimetoGMT(newStartTime);
                var newStartTimeBuilder = new StringBuilder(newStartTime);
                newStartTimeBuilder.Remove(11, 2);
                newStartTimeBuilder.Insert(11, hoursBuilder);
                newStartTimeBuilder.Remove(14, 2);
                newStartTimeBuilder.Insert(14, minutesBuilder);
                newStartTime = newStartTimeBuilder.ToString();

                changeTime(newEndTime, serverTimeZone);
                //changeTimetoGMT(newEndTime);
                var newEndTimeBuilder = new StringBuilder(newEndTime);
                newEndTimeBuilder.Remove(11, 2);
                newEndTimeBuilder.Insert(11, hoursBuilder);
                newEndTimeBuilder.Remove(14, 2);
                newEndTimeBuilder.Insert(14, minutesBuilder);
                newEndTime = newEndTimeBuilder.ToString();

                IEnumerable<int> cityDoc = _doctorAppointmentsService.EditCurrentEvent(doctorFirstName, doctorMiddleName, doctorLastName, startsAt, endsAt, newStartTime, newEndTime, editedPatientFirstName, editedPatientMiddleName, editedPatientLastName, departmentId);
                return cityDoc;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/EditCurrentEvent Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }

        }

        [HttpGet]
        [ODataRoute("GetAvailableAppointmentSlots")]
        public IEnumerable<int> GetAvailableAppointmentSlots(string startDate, string endDate, string doctorFirstName, string doctorMiddleName, string doctorLastName)
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:GetAvailableAppointmentSlots,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                IEnumerable<int> availableAppointmentSlotsList = _doctorAppointmentsService.GetAvailableAppointmentSlots(startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName);
                return availableAppointmentSlotsList;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/GetAvailableAppointmentSlots Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }
        }

        [HttpGet]
        [ODataRoute("AddNewAppointment")]
        public IEnumerable<int> AddNewAppointment(string startDate, string endDate, string doctorFirstName, string doctorMiddleName, string doctorLastName, string docStartTime, string docEndTime, string patientFirstName, string patientMiddleName, string patientLastName, string departmentId, int patientGenderId, string patientselectedCountry, string patientMobileNumber, int patientVisitId, string remarks, string selectedMRNo, DateTime DOB, string AppointmenUnitName, int? RegID, int? RegUnitID, int serverTimeZone)
        {
            logger.Info("Controller Name:DoctorAppointmentsController,Action:HttpGet,Method:AddNewAppointment,User:{0},UnitID{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {

                //changeTimetoGMT(startDate);             //India
                changeTime(startDate, serverTimeZone);             //India
                ////changeTimetoGMTNew2(startDate);       //Nigeria (Androcare)
                ////changeTimetoGMTMalaysia3(startDate);    //Malaysia (Victory)
                var startDateBuilder = new StringBuilder(startDate);
                startDateBuilder.Remove(11, 2);
                startDateBuilder.Insert(11, hoursBuilder);
                startDateBuilder.Remove(14, 2);
                startDateBuilder.Insert(14, minutesBuilder);
                startDate = startDateBuilder.ToString();

                //changeTimetoGMT(endDate);           //India
                ////changeTimetoGMTNew2(endDate);       //Nigeria (Androcare)  
                ////changeTimetoGMTMalaysia3(endDate);    //Malaysia (Victory)
                changeTime(endDate, serverTimeZone);
                var endDateBuilder = new StringBuilder(endDate);
                endDateBuilder.Remove(11, 2);
                endDateBuilder.Insert(11, hoursBuilder);
                endDateBuilder.Remove(14, 2);
                endDateBuilder.Insert(14, minutesBuilder);
                endDate = endDateBuilder.ToString();

                IEnumerable<int> newAppointmentList = _doctorAppointmentsService.AddNewAppointment(startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName, docStartTime, docEndTime, patientFirstName, patientMiddleName, patientLastName, departmentId, patientGenderId, patientselectedCountry, patientMobileNumber, patientVisitId, remarks, selectedMRNo, DOB, AppointmenUnitName, RegID, RegUnitID);
                return newAppointmentList;
            }

            catch (DbUpdateConcurrencyException ex)
            {
                logger.Error("DoctorAppointmentsController/AddNewAppointment Message{0},StackTrace", ex.Message, ex.StackTrace);
                throw;
            }


        }

        // This Function Is Used for Formating Time in GMT
        private void changeTimetoGMT(string eventTime)      //India
        {
            int hours = int.Parse(eventTime.Substring(11, 2));
            int minutes = int.Parse(eventTime.Substring(14, 2));
            if (minutes > 30)
            {
                hours = hours + 1;
                var temp = minutes + 30;
                minutes = temp - 60;
            }
            else if (minutes == 30)
            {
                hours = hours + 1;
                minutes = 0;
            }
            else
            {
                minutes = minutes + 30;
            }

            hours = hours + 5;

            if (hours < 10)
            {
                hoursBuilder = "0" + hours;
            }
            else
            {
                hoursBuilder = hours.ToString();
            }
            if (minutes < 10)
            {
                minutesBuilder = "0" + minutes;
            }
            else
            {
                minutesBuilder = minutes.ToString();
            }
        }

        private void changeTime(string eventTime, int offset)      //India
        {
            try
            {
                DateTime eventDateTime = DateTime.Parse(eventTime);
                //DateTime eventDateTime = DateTime.ParseExact(eventTime, "o", CultureInfo.InvariantCulture);
                if (eventDateTime.Hour < 10)
                {
                    hoursBuilder = "0" + eventDateTime.Hour;
                }
                else
                {
                    hoursBuilder = eventDateTime.Hour.ToString();
                }
                if (eventDateTime.Minute < 10)
                {
                    minutesBuilder = "0" + eventDateTime.Minute;
                }
                else
                {
                    minutesBuilder = eventDateTime.Minute.ToString();
                }

            }

            catch (Exception ex)
            {

            }
            //int hours = int.Parse(eventTime.Substring(11, 2));
            //int minutes = int.Parse(eventTime.Substring(14, 2));
            //if (minutes > 30)
            //{
            //    hours = hours + 1;
            //    var temp = minutes + 30;
            //    minutes = temp - 60;
            //}
            //else if (minutes == 30)
            //{
            //    hours = hours + 1;
            //    minutes = 0;
            //}
            //else
            //{
            //    minutes = minutes + 30;
            //}

            //hours = hours + 5;

            //if (hours < 10)
            //{
            //    hoursBuilder = "0" + hours;
            //}
            //else
            //{
            //    hoursBuilder = hours.ToString();
            //}
            //if (minutes < 10)
            //{
            //    minutesBuilder = "0" + minutes;
            //}
            //else
            //{
            //    minutesBuilder = minutes.ToString();
            //}
        }

        private void changeTimetoGMTNew2(string eventTime)
        {
            int hours = int.Parse(eventTime.Substring(11, 2));
            int minutes = int.Parse(eventTime.Substring(14, 2));
            //if (minutes > 30)
            //{
            //    hours = hours + 1;
            //    var temp = minutes + 30;
            //    minutes = temp - 60;
            //}
            //else if (minutes == 30)
            //{
            //    hours = hours + 1;
            //    minutes = 0;
            //}
            //else
            //{
            //    minutes = minutes + 30;
            //}

            //hours = hours + 5;
            hours = hours + 1;

            if (hours < 10)
            {
                hoursBuilder = "0" + hours;
            }
            else
            {
                hoursBuilder = hours.ToString();
            }
            if (minutes < 10)
            {
                minutesBuilder = "0" + minutes;
            }
            else
            {
                minutesBuilder = minutes.ToString();
            }
        }

        private void changeTimetoGMTMalaysia3(string eventTime)     //Malaysia
        {
            int hours = int.Parse(eventTime.Substring(11, 2));
            int minutes = int.Parse(eventTime.Substring(14, 2));
            //if (minutes > 30)
            //{
            //    hours = hours + 1;
            //    var temp = minutes + 30;
            //    minutes = temp - 60;
            //}
            //else if (minutes == 30)
            //{
            //    hours = hours + 1;
            //    minutes = 0;
            //}
            //else
            //{
            //    minutes = minutes + 30;
            //}

            //hours = hours + 5;
            //hours = hours + 1;

            //if (hours <= 4)
            //{
            hours = hours + 8;
            //}
            //else
            //{
            //    hours = hours - 4;
            //}

            if (hours < 10)
            {
                hoursBuilder = "0" + hours;
            }
            else
            {
                hoursBuilder = hours.ToString();
            }
            if (minutes < 10)
            {
                minutesBuilder = "0" + minutes;
            }
            else
            {
                minutesBuilder = minutes.ToString();
            }
        }

        [HttpGet]
        [ODataRoute("LoadAllAppointments")]
        public List<Entities.Models.Clinic.Appointments> LoadAllAppointments()
        {
            logger.Info("PatientRegistrationController, Get UnitId={0}", GenericSP.CurrentUser.UnitID);
            List<Entities.Models.Clinic.Appointments> AppointmentsList = _doctorAppointmentsService.LoadAllAppointments();

            foreach (Entities.Models.Clinic.Appointments item in AppointmentsList)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(item.Photo)))
                {
                    item.PatientPhoto = Convert.ToString(System.Text.Encoding.UTF8.GetString(item.Photo));
                }

            }
            return AppointmentsList;
        }

        [HttpGet]
        [ODataRoute("SearchAppointments")]
        public List<Entities.Models.Clinic.Appointments> SearchAppointments(DateTime? AppDate, int? DeptID, int? DoctID, int? SRegID, int? AppTypeID, int? AppStatusID, DateTime? FromDate, DateTime? ToDate, int? PageIndex, string Name = null, string MRNo = null, string MobileNo = null)
        {
            logger.Info("PatientRegistrationController, Get UnitId={0}", GenericSP.CurrentUser.UnitID);
            List<Entities.Models.Clinic.Appointments> AppointmentsList = _doctorAppointmentsService.SearchAppointments(AppDate, DeptID, DoctID, SRegID, AppTypeID, AppStatusID, FromDate, ToDate, PageIndex, Name, MRNo, MobileNo);
            return AppointmentsList;
        }

        [HttpGet]
        [ODataRoute("GetSpecialRegistrationMasterList")]
        public List<SpecialRegistrationMaster> GetSpecialRegistrationMasterList(string Filter, bool IsSelect)
        {
            logger.Info("PatientRegistrationController, Get Filter={0} IsSelect={1}", Filter, IsSelect);
            List<SpecialRegistrationMaster> SpecialRegistrationList = _doctorAppointmentsService.GetSpecialRegistrationMasterList(Filter);
            if (IsSelect)
            {
                SpecialRegistrationList.Insert(0, new SpecialRegistrationMaster { SRegID = 0, Description = "Select" });
            }
            else
            {
                SpecialRegistrationList.Insert(0, new SpecialRegistrationMaster { SRegID = 0, Description = "Special Registration" });
            }
            return SpecialRegistrationList;
        }

        [HttpGet]
        [ODataRoute("GetGenderList")]
        public List<Gender> GetGenderList(bool IsListing)
        {
            List<Gender> GenderList = _doctorAppointmentsService.GetGenderList();
            GenderList.Insert(0, new Gender { GenderId = 0, GenderDescription = "Select" });
            return GenderList;
        }



        // [HttpPost]
        //[ODataRoute("GetAvailableAppointmentSlotsModified")]

        //// [ResponseType(typeof(List<AppoinmentInput>))]
        //// [HttpPost]
        // public IHttpActionResult GetAvailableAppointmentSlotsModified(List<AppoinmentInput> input)
        //  {
        //     try
        //     {
        //         //logger.Info("Controller Name:UserAPI,Action:HttpGet,Method:GetUnitList,User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
        //         var Response = _doctorAppointmentsService.GetAvailableAppointmentSlotsModified(input);
        //         return Ok(Response);
        //     }
        //     catch (SqlException ex)
        //     {
        //         // logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
        //         return new NotFoundResult(Request);
        //     }
        //     catch (Exception objException)
        //     {
        //         // logger.Error("UserAPI/GetUnitList Message{0},StackTrace:{1}", objException.Message, objException.StackTrace);
        //         return new NotFoundResult(Request);
        //     }
        // }
    }
}
