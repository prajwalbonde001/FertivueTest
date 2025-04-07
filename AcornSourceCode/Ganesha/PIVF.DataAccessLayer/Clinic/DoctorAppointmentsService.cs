using Dapper;
using DataBaseConfiguration;
//using PIVF.Gemino.BusinessLayer.Clinic;
//using PIVF.Gemino.Entities.Mapping.Clinic;
//using PIVF.Gemino.Entities.Models.Clinic;
//using PIVF.Gemino.Entities.Models.Master.Configuration;
//using PIVF.Gemino.Entities.Models.Master.Patient;
//using PIVF.Gemino.Repository.Pattern.Repositories;
//using PIVF.Gemino.Service.Pattern;


using PIVF.BusinessLayer.Clinic;
using PIVF.Entities.Mapping.Clinic;
using PIVF.Entities.Models.Clinic;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Models.Master.Patient;
//using PIVF.Repository.Pattern.Repositories;
using Repository.Pattern.Repositories;
//using PIVF.Service.Pattern;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//namespace PIVF.Gemino.DataAccessLayer.Clinic
namespace PIVF.DataAccessLayer.Clinic
{
    public class DoctorAppointmentsService : Service<DoctorAppointments>, IDoctorAppointmentsService
    {

        private readonly IRepositoryAsync<DoctorAppointments> _repository;

        public DoctorAppointmentsService(IRepositoryAsync<DoctorAppointments> repository) : base(repository)
        {
            _repository = repository;
        }

        public IEnumerable<DoctorAppointments> GetAppointmentStatus()
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetAppointmentStatus");
            return con.DapCon.Query<DoctorAppointments>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<DoctorAppointments> GetAppointments(string enteredDate, int DOCID, int DeptID, int UnitID)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            var currentTimeZone = TimeZoneInfo.Local.Id;
            if (currentTimeZone == "India Standard Time")///India
            {
                Param.Add("@enteredDate", enteredDate);
            }
            else//UK
            {
                var date = DateTime.Parse(enteredDate);
                string date1 = date.ToString("yyyy-MM-dd'T'hh:mm:sss");
                Param.Add("@enteredDate", date1);
            }


            if (DOCID > 0)
                Param.Add("@DOCID", DOCID);
            if (DeptID > 0)
                Param.Add("@DeptID", DeptID);
            if (UnitID > 0)
                Param.Add("@UnitID", UnitID);
            else if (UnitID == 0)
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);

            return con.DapCon.Query<DoctorAppointments>(GenericSP.GetAppointment, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<Unit> GetCityAndClinicNames()
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@status", 0);
            return con.DapCon.Query<Unit>(GenericSP.GetCityAndClinicNames, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<Entities.Models.Master.Patient.VisitType> GetPatientVisitList()
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@status", 1);
            return con.DapCon.Query<Entities.Models.Master.Patient.VisitType>(GenericSP.GetPatientVisitList, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<DoctorAppointments> RescheduleCurrentEvent(string selectedSlotStartTime, string selectedSlotEndTime, string patientFirstName, string patientLastName, string patientMobileNumber, int isRescheduleCall, string remark, int DOCID, int DeptID, int APPID, int RescheduleUnitID, int AppReasonID)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@title", "");
            Param.Add("@startsAt", selectedSlotStartTime);
            Param.Add("@endsAt", selectedSlotEndTime);
            Param.Add("@status", isRescheduleCall);
            Param.Add("@ReasonForCancellation", "");
            Param.Add("@patientMobileNumber", patientMobileNumber);
            Param.Add("@patientFirstName", patientFirstName);
            Param.Add("@patientLastName", patientLastName);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
            Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
            Param.Add("@APPID", APPID, DbType.Int64);
            Param.Add("@AppReasonID", AppReasonID, DbType.Int64);
            Param.Add("@remark", remark);
            if (DOCID > 0)
                Param.Add("@DOCID", DOCID);

            if (DeptID > 0)
                Param.Add("@DeptID", DeptID);

            if (RescheduleUnitID > 0)
            {
                Param.Add("@RescheduleUnitID", RescheduleUnitID);
            }

            return con.DapCon.Query<DoctorAppointments>(GenericSP.DeleteCurrentEvent, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<DoctorAppointments> DeleteCurrentEvent(string title, string startsAt, string endsAt, int status, string ReasonForCancellation)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@title", title);
            Param.Add("@startsAt", startsAt);
            Param.Add("@endsAt", endsAt);
            Param.Add("@status", status);
            Param.Add("@ReasonForCancellation", ReasonForCancellation);
            Param.Add("@patientMobileNumber", "");
            Param.Add("@patientFirstName", "");
            Param.Add("@patientLastName", "");
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
            Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);


            return con.DapCon.Query<DoctorAppointments>(GenericSP.DeleteCurrentEvent, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<int> EditCurrentEvent(string doctorFirstName, string doctorMiddleName, string doctorLastName, string startsAt, string endsAt, string newStartTime, string newEndTime, string patientFirstName, string patientMiddleName, string patientLastName, string departmentId)
        {
            if (doctorMiddleName == null)
            {
                doctorMiddleName = "";
            }
            if (patientMiddleName == null)
            {
                patientMiddleName = "";
            }
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@doctorFirstName", doctorFirstName);
            Param.Add("@doctorMiddleName", doctorMiddleName);
            Param.Add("@doctorLastName", doctorLastName);
            Param.Add("@departmentId", departmentId);
            Param.Add("@startsAt", startsAt);
            Param.Add("@endsAt", endsAt);
            Param.Add("@newStartsAt", newStartTime);
            Param.Add("@newEndsAt", newEndTime);
            Param.Add("@patientFirstName", patientFirstName);
            Param.Add("@patientMiddleName", patientMiddleName);
            Param.Add("@patientLastName", patientLastName);
            Param.Add("@status", 0);
            Param.Add("@genderId", ' ');
            Param.Add("@mobileConId", ' ');
            Param.Add("@mobileNo", ' ');
            Param.Add("@visitId", ' ');
            Param.Add("@remarks", ' ');
            Param.Add("@mrNo", ' ');
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
            Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);

            return con.DapCon.Query<int>(GenericSP.EditCurrentEvent, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<int> AddNewAppointment(string startDate, string endDate, string doctorFirstName, string doctorMiddleName, string doctorLastName, string docStartTime, string docEndTime, string patientFirstName, string patientMiddleName, string patientLastName, string departmentId, int patientGenderId, string patientselectedCountry, string patientMobileNumber, int patientVisitId, string remarks, string selectedMRNo, DateTime DOB, string AppointmenUnitName, int? RegID, int? RegUnitID)
        {
            if (doctorMiddleName == null)
            {
                doctorMiddleName = "";
            }
            if (patientMiddleName == null)
            {
                patientMiddleName = "";
            }
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@doctorFirstName", doctorFirstName);
            Param.Add("@doctorMiddleName", doctorMiddleName);
            Param.Add("@doctorLastName", doctorLastName);
            Param.Add("@departmentId", departmentId);
            Param.Add("@startsAt", startDate);
            Param.Add("@endsAt", endDate);
            Param.Add("@newStartsAt", "");
            Param.Add("@newEndsAt", "");
            Param.Add("@patientFirstName", patientFirstName);
            Param.Add("@patientMiddleName", patientMiddleName);
            Param.Add("@patientLastName", patientLastName);
            Param.Add("@status", 1);
            Param.Add("@genderId", patientGenderId);
            Param.Add("@RegID1", RegID);
            Param.Add("@RegUnitID1", RegUnitID);
            Param.Add("@mobileConId", patientselectedCountry);
            Param.Add("@mobileNo", patientMobileNumber);
            Param.Add("@visitId", patientVisitId);
            Param.Add("@remarks", remarks);
            Param.Add("@mrNo", selectedMRNo);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
            Param.Add("@AppUnitID", GenericSP.CurrentUser.UnitID, DbType.Int64);
            Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
            DateTime? dt1;
            if (DOB.Year == 1900)
            {
                dt1 = null;
            }
            else
            {
                dt1 = DOB;
            }
            Param.Add("DOB", dt1);
            Param.Add("@AppointmenUnitName", AppointmenUnitName);

            return con.DapCon.Query<int>(GenericSP.EditCurrentEvent, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<int> GetAvailableAppointmentSlots(string startDate, string endDate, string doctorFirstName, string doctorMiddleName, string doctorLastName)
        {
            if (doctorMiddleName == null)
            {
                doctorMiddleName = "";
            }

            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@doctorFirstName", doctorFirstName);
            Param.Add("@doctorMiddleName", doctorMiddleName);
            Param.Add("@doctorLastName", doctorLastName);
            Param.Add("@departmentId", "");
            Param.Add("@startsAt", startDate);
            Param.Add("@endsAt", endDate);
            Param.Add("@newStartsAt", "");
            Param.Add("@newEndsAt", "");
            Param.Add("@patientFirstName", "");
            Param.Add("@patientMiddleName", "");
            Param.Add("@patientLastName", "");
            Param.Add("@status", 2);
            Param.Add("@genderId", "");
            Param.Add("@mobileConId", "");
            Param.Add("@mobileNo", "");
            Param.Add("@visitId", "");
            Param.Add("@remarks", "");
            Param.Add("@mrNo", "");
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
            Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);

            return con.DapCon.Query<int>(GenericSP.EditCurrentEvent, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }

        public IEnumerable<DoctorAppointments> GetSearchItemData(string searchItem)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@searchItem", searchItem);
            return con.DapCon.Query<DoctorAppointments>(GenericSP.GetSearchItemData, Param, commandType: CommandType.StoredProcedure).AsEnumerable();
        }
        public List<Entities.Models.Clinic.Appointments> LoadAllAppointments()
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@FromDate", null);
            Param.Add("@ToDate", null);
            Param.Add("@FirstName", null);
            Param.Add("@LastName", null);
            Param.Add("@DocID", null);
            Param.Add("@DeptID", null);
            Param.Add("@ApptStatus", null);
            Param.Add("@PageIndex", 0);
            Param.Add("@AppointmentDate", DateTime.Today);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            //con.DapCon.Execute(GenericSP.GetAppointmentsList, Param, commandType: CommandType.StoredProcedure);
            List<Entities.Models.Clinic.Appointments> list = new List<Entities.Models.Clinic.Appointments>();
            list = con.DapCon.Query<Entities.Models.Clinic.Appointments>(GenericSP.GetAppointmentsList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (list != null && list.Count > 0)
            {
                int canceledCount = list.Count(a => a.Iscancel == false); // Count only canceled records
                if (canceledCount > 0)
                {
                    list[0].TotalRecords = canceledCount;
                }
            }

            return list;
        }

        public List<Entities.Models.Clinic.Appointments> SearchAppointments(DateTime? AppDate, int? DeptID, int? DoctID, int? SRegID, int? AppTypeID, int? AppStatusID, DateTime? FromDate, DateTime? ToDate, int? PageIndex, string Name = null, string MRNo = null, string MobileNo = null)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();

            //DateTime? dt1;
            //if (AppDate.Year == 1900)
            //    dt1 = null;
            //else
            //    dt1 = AppDate;

            //Param.Add("@AppointmentDate", dt1);

            Param.Add("@AppointmentDate", AppDate);

            //DateTime? dt2;
            //if (FromDate.Year == 1900)
            //    dt2 = null;
            //else
            //    dt2 = FromDate;

            //Param.Add("@FromDate", dt2);

            Param.Add("@FromDate", FromDate);

            //DateTime? dt3;
            //if (ToDate.Year == 1900)
            //    dt3 = null;
            //else
            //    dt3 = ToDate;

            //Param.Add("@ToDate", dt3);

            Param.Add("@ToDate", ToDate);

            if (!string.IsNullOrEmpty(Name))
                Param.Add("@FirstName", Name);
            if (DoctID > 0)
                Param.Add("@DocID", DoctID);
            if (DeptID > 0)
                Param.Add("@DeptID", DeptID);
            if (AppStatusID > 0)
                Param.Add("@ApptStatus", AppStatusID);

            if (!string.IsNullOrEmpty(MRNo))
                Param.Add("@MRNo", MRNo);

            if (!string.IsNullOrEmpty(MobileNo))
                Param.Add("@MobileNo", MobileNo);

            if (SRegID > 0)
                Param.Add("@SRegID", SRegID);
            if (AppTypeID > 0)
                Param.Add("@AppTypeID", AppTypeID);

            Param.Add("@PageIndex", PageIndex);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            //con.DapCon.Execute(GenericSP.GetAppointmentsList, Param, commandType: CommandType.StoredProcedure);
            List<Entities.Models.Clinic.Appointments> list = new List<Entities.Models.Clinic.Appointments>();
            list = con.DapCon.Query<Entities.Models.Clinic.Appointments>(GenericSP.GetAppointmentsList, Param, commandType: CommandType.StoredProcedure).AsList();
            if (list != null && list.Count > 0)
            {
                int canceledCount = list.Count(a => a.Iscancel == false); // Count only canceled records
                if (canceledCount > 0)
                {
                    list[0].TotalRecords = canceledCount;
                }
            }

            return list;
        }

        public List<Gender> GetGenderList()
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            con.DapCon.Execute(GenericSP.GetGenderList, Param, commandType: CommandType.StoredProcedure);
            return con.DapCon.Query<Gender>(GenericSP.GetGenderList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<SpecialRegistrationMaster> GetSpecialRegistrationMasterList(string Filter)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Param.Add("@Filter", Filter = string.IsNullOrEmpty(Filter) ? string.Empty : Filter);
            con.DapCon.Execute(GenericSP.GetSpecialRegistrationMasterList, Param, commandType: CommandType.StoredProcedure);
            return con.DapCon.Query<SpecialRegistrationMaster>(GenericSP.GetSpecialRegistrationMasterList, Param, commandType: CommandType.StoredProcedure).AsList();
        }


        //public List<AppoinmentInput> GetAvailableAppointmentSlotsModified(List<AppoinmentInput> input)
        //{

        //    for (int i = 0; i < input.Count - 1; i++)
        //    {
        //        if (input[i].doctorMiddleName == null)
        //        {
        //            input[i].doctorMiddleName = "";
        //        }

        //        DapperConnection con = new DapperConnection();
        //        var Param = new DynamicParameters();
        //        Param.Add("@doctorFirstName", input[i].doctorFirstName);
        //        Param.Add("@doctorMiddleName", input[i].doctorMiddleName);
        //        Param.Add("@doctorLastName", input[i].doctorLastName);
        //        Param.Add("@departmentId", "");
        //        Param.Add("@startsAt", input[i].timeslots);
        //        Param.Add("@endsAt", input[i + 1].timeslots);
        //        Param.Add("@newStartsAt", "");
        //        Param.Add("@newEndsAt", "");
        //        Param.Add("@patientFirstName", "");
        //        Param.Add("@patientMiddleName", "");
        //        Param.Add("@patientLastName", "");
        //        Param.Add("@status", 2);
        //        Param.Add("@genderId", "");
        //        Param.Add("@mobileConId", "");
        //        Param.Add("@mobileNo", "");
        //        Param.Add("@visitId", "");
        //        Param.Add("@remarks", "");
        //        Param.Add("@mrNo", "");
        //        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
        //        Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
        //        input[i].status = con.DapCon.Query<int>(GenericSP.EditCurrentEvent, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

        //    }
        //    return input;
        //}


    }
}
