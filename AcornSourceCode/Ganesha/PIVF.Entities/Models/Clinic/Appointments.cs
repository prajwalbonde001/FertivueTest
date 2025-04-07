using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Clinic
{
    public class Appointments : Entity
    {
        [Key]
        public int APPID { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
        public string AppCancelReason { get; set; }
        public string Department { get; set; }
        public DateTime AppointmentDate { get; set; }
        public int AppointmentsTotalItems { get; set; }
        public string MRNo { get; set; }
        public string PatientName { get; set; }
        public string AppReason { get; set; }
        public int AppReasonID { get; set; } //added for rescheduling screen reason  issue
        public string AppStatus { get; set; }
        public int AppStatusID { get; set; }
        public string MobileNo { get; set; }
        public string Description { get; set; }
        public string DoctorName { get; set; }
        public int DOCID { get; set; }
        public int DeptID { get; set; }
        public int UnitID { get; set; }
        public string Remark { get; set; }
        public int GenderID { get; set; }
        public string MobileCountryCode { get; set; }
        public int MobileCountryID { get; set; }
        public int VisitID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string GenderDescription { get; set; }
        public string ApptUnit { get; set; }
        public string AppointmentReason { get; set; }
        public int Age { get; set; }
        public string PatientPhoto { get; set; }
        public byte[] Photo { get; set; }
        public int RescheduleAgainstApptID { get; set; }
        public string Username { get; set; }
        public DateTime AddedDateTime { get; set; }
        public Int32 RegID { get; set; }
        public Int32 RegUnitID { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public bool Iscancel { get; set; }
        public string AppTypeDescription { get; set; }
        public string AppointmentBy { get; set; }
        public int AppTypeId { get; set; }
        public int PatientCategoryID { get; set; }
        public int TotalRecords { get; set; }

    }

    //public class AppoinmentInput
    //{
    //    public string doctorFirstName { get; set; }
    //    public string doctorMiddleName { get; set; }
    //    public string doctorLastName { get; set; }
    //    public string timeslots { get; set; }
    //    public string startDate { get; set; }
    //    public string endDate { get; set; }
    //    public int status { get; set; }


    //}
}
