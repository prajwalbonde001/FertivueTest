//using PIVF.Gemino.Repository.Pattern.Ef6;
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Clinic
{
    public class DoctorAppointments : Entity 
    {
        [Key]
        public Int32 EventId { get; set; }
        public int AppID { get; set; }
        public string title { get; set; }
        public DateTime startsAt { get; set; }
        public DateTime endsAt { get; set; }
        public bool draggable { get; set; }
        public bool resizable { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string DocFullName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Department { get; set; }
        public int DepartmentId { get; set; }
        public string UnitName { get; set; }
        public string DoctorCategory { get; set; }
        public string Specialization { get; set; }
        public string SubSpecialization { get; set; }
        public int DoctorInterval { get; set; }
        public int DayID { get; set; }
        public int AppStatusID { get; set; }
        public string Description { get; set; }
        public string PatientFullName { get; set; }
        public string PatientFirstName { get; set; }
        public string PatientMiddleName { get; set; }
        public string PatientLastName { get; set; }
        public string AppointmentReason { get; set; }
        public int Age { get; set; }
        public int UnitID { get; set; }
        public int DOCID { get; set; }

        public DateTime PatientAppStartTime { get; set; }
        public DateTime PatientAppEndTime { get; set; }
        public DateTime PatientAppDate { get; set; }
        public DateTime DOB { get; set; }

        public bool IsRescheduled { get; set; }
        public bool IsCancelled { get; set; }
        public int RescheduleAgainstApptID { get; set; }

        public string GenderId { get; set; }
        public string GenderDescription { get; set; }
        public Nullable<Int32> PatientselectedCountryID { get; set; }
        public string PatientselectedCountryCode { get; set; }
        public string PatientMobileNumber { get; set; }
        public Nullable<Int32> selectedPatientAlternateCountryID { get; set; }
        public string PatientselectedAlternateCountryCode { get; set; }
        public string PatientAlternateMobileNumber { get; set; }
        public string MRNo { get; set; }
        public int PatientMobileConId { get; set; }
        public byte[] Photo { get; set; }
        public string DoctorPhoto { get; set; }
        public int AppReasonID { get; set; }
    }
   
}
