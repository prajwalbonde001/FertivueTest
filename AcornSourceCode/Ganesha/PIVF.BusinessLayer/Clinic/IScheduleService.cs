using PIVF.Entities.Models.Clinic;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Clinic
{
    public interface IScheduleService : IService<DoctorAppointments> 
    {
        IQueryable<Schedule> ScheduleList();
        Int32 UpdateSchedule(Schedule ObjSchedule);
        Int32 AddDoctorScheduleDetails(Schedule ObjSchedule);
        Int32 AddScheduleDetail(Schedule ObjSchedule);
        Int32 AddDoctorScheduleMaster(Schedule ObjSchedule);
        Int32 UpdateDoctorSchedule(Schedule ObjSchedule);
        Int32 UpdateDSStatusLanding(Schedule ObjSchedule);
        List<Schedule> GetDepartmentsByID(int DOCID);
        IQueryable<Schedule> GetScheduleListByDoctorID(int doctorID, DateTime scheduleDate);
        IQueryable<Schedule> GetScheduleListLanding(int PageIndex, DateTime ScheduleDate, int DOCID, int DeptId, int ScheduleUnitID, String ScheduleType);
        IQueryable<Schedule> GetDoctorScheduleDates(int DOCID);
        List<Schedule> GetSlotMaster();   //Added by Nayan Kamble on 21/11/2019    
    }
}
