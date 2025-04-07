//using PIVF.Gemino.Entities.Mapping.Clinic;
//using PIVF.Gemino.Entities.Models.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Configuration;
//using PIVF.Gemino.Entities.Models.Master.Patient;
//using PIVF.Gemino.Service.Pattern;
using PIVF.Entities.Mapping.Clinic;
using PIVF.Entities.Models.Clinic;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Models.Master.Patient;
//using PIVF.Service.Pattern;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//namespace PIVF.Gemino.BusinessLayer.Clinic
namespace PIVF.BusinessLayer.Clinic
{
    public interface IDoctorAppointmentsService : IService<DoctorAppointments>
    {
        IEnumerable<DoctorAppointments> GetAppointments(string enteredDate, int DOCID, int DeptID, int UnitID);

        IEnumerable<Unit> GetCityAndClinicNames();

        IEnumerable<DoctorAppointments> DeleteCurrentEvent(string title, string startsAt, string endsAt, int status, string ReasonForCancellation);

        IEnumerable<DoctorAppointments> RescheduleCurrentEvent(string selectedSlotStartTime, string selectedSlotEndTime, string patientFirstName, string patientLastName, string patientMobileNumber, int isRescheduleCall, string remark, int DOCID, int DeptID, int APPID, int RescheduleUnitID,int AppReasonID);

        IEnumerable<int> EditCurrentEvent(string doctorFirstName, string doctorMiddleName, string doctorLastName, string startsAt, string endsAt, string newStartTime, string newEndTime, string patientFirstName, string patientMiddleName, string patientLastName, string departmentId);

        IEnumerable<int> AddNewAppointment(string startDate, string endDate, string doctorFirstName, string doctorMiddleName, string doctorLastName, string docStartTime, string docEndTime, string patientFirstName, string patientMiddleName, string patientLastName, string departmentId, int patientGenderId, string patientselectedCountry, string patientMobileNumber, int patientVisitId, string remarks, string selectedMRNo, DateTime DOB, string AppointmenUnitName, int? RegID, int? RegUnitID);

        IEnumerable<VisitType> GetPatientVisitList();

        IEnumerable<DoctorAppointments> GetSearchItemData(string searchItem);

        IEnumerable<int> GetAvailableAppointmentSlots(string startDate, string endDate, string doctorFirstName, string doctorMiddleName, string doctorLastName);

        IEnumerable<DoctorAppointments> GetAppointmentStatus();

        List<Entities.Models.Clinic.Appointments> LoadAllAppointments();
        List<Entities.Models.Clinic.Appointments> SearchAppointments(DateTime? AppDate, int? DeptID, int? DoctID, int? SRegID, int? AppTypeID, int? AppStatusID, DateTime? FromDate, DateTime? ToDate, int? PageIndex, string Name = null, string MRNo = null, string MobileNo = null);
        List<Gender> GetGenderList();
        List<SpecialRegistrationMaster> GetSpecialRegistrationMasterList(string Filter);

     
    }
}
