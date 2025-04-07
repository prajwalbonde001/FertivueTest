using Dapper;
using DataBaseConfiguration;
using PIVF.BusinessLayer.Clinic;
using PIVF.Entities.Models.Clinic;
using Repository.Pattern.Repositories;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Threading;

namespace PIVF.DataAccessLayer.Clinic
{
    public class ScheduleService : Service<Schedule>, IScheduleService 
    {
        private readonly IRepositoryAsync<Schedule> _repository;

        public ScheduleService(IRepositoryAsync<Schedule> repository) : base(repository)
        {
            _repository = repository;
        }


        public IQueryable<Schedule> ScheduleList()
        {
            DapperConnection con = new DapperConnection();
            try
            {
                return con.DapCon.Query<Schedule>(GenericSP.GetScheduleDescriptionList, commandType: CommandType.StoredProcedure).AsQueryable();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Schedule> GetSlotMaster()        ///Added by Nayan Kamble on 21/11/2019
        {
            DapperConnection con = new DapperConnection();
            try
            {
                return con.DapCon.Query<Schedule>(GenericSP.GetSlotMaster, commandType: CommandType.StoredProcedure).AsList(); 
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int32 AddDoctorScheduleMaster(Schedule objSche)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Int32 @SuccessStatus = 0;

            Param.Add("@DOCID", objSche.DOCID);
            Param.Add("@ScheduleUnitID", objSche.ScheduleUnitID);
            Param.Add("@StartTime", objSche.StartTime);
            Param.Add("@EndTime", objSche.EndTime);
            Param.Add("@Status", objSche.Status);
            Param.Add("@ScheduleType", objSche.ScheduleType);
            Param.Add("@DeptID", objSche.DeptID);
            Param.Add("@dayIDnew", objSche.DayID);
            Param.Add("@interval", objSche.Interval);
            //Param.Add("@ScheduleSlot", objSche.ScheduleSlot);    //Added by Nayan kamble on 19/11/2019
            Param.Add("@ScheduleSlot", objSche.SlotID);    //Added by Nayan kamble on 19/11/2019
            Param.Add("@CreatedUnitID", objSche.CreatedUnitID);
            Param.Add("@UpdatedUnitID", objSche.UpdatedUnitID);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID );    //objSche.AddedBy  commented and added by Nayan Kamble on 25/11/2019
            Param.Add("@AddedOn", Environment.MachineName);      //objSche.AddedOn   commented and added by Nayan Kamble on 25/11/2019
            Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime );          // objSche.AddedDateTime  commented and added by Nayan Kamble on 25/11/2019
            Param.Add("@AddedWindowsLoginName", objSche.AddedWindowsLoginName);
            Param.Add("@UpdatedBy", objSche.UpdatedBy);
            Param.Add("@UpdatedOn", objSche.UpdatedOn);
            Param.Add("@UpdatedDateTime", objSche.UpdatedDateTime);
            Param.Add("@UpdateWindowsLoginName", objSche.UpdateWindowsLoginName);
            Param.Add("@ScheduleStartDates", objSche.@ScheduleStartDates);
            Param.Add("@Synchronized", objSche.Synchronized);
            Param.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);


            con.DapCon.Execute(GenericSP.AddDoctorScheduleMaster, Param, commandType: CommandType.StoredProcedure);

            return SuccessStatus = Param.Get<Int32>("@SuccessStatus");



        }

        public Int32 UpdateDSStatusLanding(Schedule objSche)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Int32 @SuccessStatus = 0;

            Param.Add("@DOCID", objSche.DOCID);
            Param.Add("@ScheduleID", objSche.ScheduleID);
            Param.Add("@Status", objSche.Status);
            Param.Add("@ReasonForAD", objSche.ReasonForAD);
            Param.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            con.DapCon.Execute(GenericSP.UpdateDSStatusLanding, Param, commandType: CommandType.StoredProcedure);

            return SuccessStatus = Param.Get<Int32>("@SuccessStatus");



        }

        public Int32 UpdateDoctorSchedule(Schedule objSche)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Int32 @SuccessStatus = 0;

            Param.Add("@DOCID", objSche.DOCID);
            Param.Add("@ScheduleID", objSche.ScheduleID);
            Param.Add("@ScheduleUnitID", objSche.ScheduleUnitID);
            //Param.Add("@ScheduleSlot",objSche.ScheduleSlot);    //Added by Nayan kamble on 19/11/2019
            Param.Add("@ScheduleSlot", objSche.SlotID);    //Added by Nayan kamble on 19/11/2019
            Param.Add("@StartTime", objSche.StartTime);
            Param.Add("@EndTime", objSche.EndTime);
            Param.Add("@Status", objSche.Status);
            Param.Add("@ScheduleType", objSche.ScheduleType);
            Param.Add("@DeptID", objSche.DeptID);
            Param.Add("@IsScheduleCancel", objSche.IsScheduleCancel);
            Param.Add("@dayIDnew", objSche.DayID);
            Param.Add("@interval", objSche.Interval);
            Param.Add("@ScheduleStartDates", objSche.ScheduleStartDates);
            Param.Add("@CreatedUnitID", objSche.CreatedUnitID);
            Param.Add("@UpdatedUnitID", objSche.UpdatedUnitID);
            Param.Add("@AddedBy", objSche.AddedBy);
            Param.Add("@AddedOn", objSche.AddedOn);
            Param.Add("@AddedDateTime", objSche.AddedDateTime);
            Param.Add("@AddedWindowsLoginName", objSche.AddedWindowsLoginName);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID );    //objSche.UpdatedBy       commented and added by Nayan Kamble on 25/11/2019
            Param.Add("@UpdatedOn", Environment.MachineName);                       // objSche.UpdatedOn       commented and added by Nayan Kamble on 25/11/2019
            Param.Add("@UpdatedDateTime", DateTime.Now, DbType.DateTime);         //   objSche.UpdatedDateTime       commented and added by Nayan Kamble on 25/11/2019
            Param.Add("@UpdateWindowsLoginName", objSche.UpdateWindowsLoginName);
            Param.Add("@Synchronized", objSche.Synchronized);

            Param.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);


            con.DapCon.Execute(GenericSP.UpdateDoctorSchedule, Param, commandType: CommandType.StoredProcedure);

            return SuccessStatus = Param.Get<Int32>("@SuccessStatus");


        }

        public Int32 AddScheduleDetail(Schedule ObjSchedule)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Int32 @SuccessStatus = 0;

            Param.Add("@DocScheduleDetailID", ObjSchedule.DocScheduleDetailID);
            Param.Add("@DayID", ObjSchedule.DayID);
            Param.Add("@StartDateTime", ObjSchedule.StartTime);
            Param.Add("@EndDateTime", ObjSchedule.EndTime);

            Param.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

            con.DapCon.Execute(GenericSP.AddScheduleDetail, Param, commandType: CommandType.StoredProcedure);
            return SuccessStatus = Param.Get<Int32>("@SuccessStatus");


        }
        public Int32 AddDoctorScheduleDetails(Schedule objSche)
        {
            /*manohar*/
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Int32 @SuccessStatus = 0;
            Param.Add("@DOCID", objSche.DOCID);
            Param.Add("@ScheduleID", objSche.ScheduleID);
            Param.Add("@ScheduleUnitID", objSche.ScheduleUnitID);
            Param.Add("@StartTime", objSche.StartTime);
            Param.Add("@EndTime", objSche.EndTime);
            Param.Add("@Status", objSche.Status);
            Param.Add("@ScheduleType", objSche.ScheduleType);
            Param.Add("@DeptID", objSche.DeptID);
            Param.Add("@Status", objSche.Status);
            Param.Add("@dayIDnew", objSche.DayID);
            Param.Add("@interval", objSche.Interval);
            Param.Add("@CreatedUnitID", objSche.CreatedUnitID);
            Param.Add("@UpdatedUnitID", objSche.UpdatedUnitID);
            Param.Add("@AddedBy", objSche.AddedBy);
            Param.Add("@AddedOn", objSche.AddedOn);
            Param.Add("@AddedDateTime", objSche.AddedDateTime);
            Param.Add("@AddedWindowsLoginName", objSche.AddedWindowsLoginName);
            Param.Add("@UpdatedBy", objSche.UpdatedBy);
            Param.Add("@UpdatedOn", objSche.UpdatedOn);
            Param.Add("@UpdatedDateTime", objSche.UpdatedDateTime);
            Param.Add("@UpdateWindowsLoginName", objSche.UpdateWindowsLoginName);
            Param.Add("@Synchronized", objSche.Synchronized);



            Param.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);

            con.DapCon.Execute(GenericSP.AddDoctorScheduleDetails, Param, commandType: CommandType.StoredProcedure);
            return SuccessStatus = Param.Get<Int32>("@SuccessStatus");

        }
        public IQueryable<Schedule> GetScheduleListLanding(int PageIndex, DateTime ScheduleDate, int DOCID, int DeptId, int ScheduleUnitID, String ScheduleType)
        {
            try
            {
                DapperConnection con = new DapperConnection();
                var Param = new DynamicParameters();
                DateTime currentDateTime = new DateTime(ScheduleDate.Year, ScheduleDate.Month, ScheduleDate.Day, 0, 0, 0, 0);
                Param.Add("@ScheduleDate", currentDateTime);
                Param.Add("@PageIndex", PageIndex);

                if (DOCID < 1)
                    Param.Add("@DOCID", null);
                else
                    Param.Add("@DOCID", DOCID);

                if (DeptId < 1)
                    Param.Add("@DeptId", null);
                else
                    Param.Add("@DeptId", DeptId);

                if (ScheduleUnitID < 1)
                    Param.Add("@ScheduleUnitID", null);
                else
                    Param.Add("@ScheduleUnitID", ScheduleUnitID);

                // Param.Add("@ScheduleUnitID", ScheduleUnitID);

                if (ScheduleType == "ScheduleType")
                    Param.Add("@ScheduleType", null);
                else
                    Param.Add("@ScheduleType", ScheduleType);

                //Param.Add("@ScheduleType", ScheduleType);



                return con.DapCon.Query<Schedule>(GenericSP.GetScheduleListLanding, Param, commandType: CommandType.StoredProcedure).AsQueryable();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable<Schedule> GetScheduleListByDoctorID(int DoctorID, DateTime ScheduleDate)
        {
            try
            {
                DapperConnection con = new DapperConnection();
                var Param = new DynamicParameters();
                Param.Add("@DoctorID", DoctorID);
                ScheduleDate = new DateTime(ScheduleDate.Year, ScheduleDate.Month, ScheduleDate.Day, 0, 0, 0, 0);
                Param.Add("@ScheduleDate", ScheduleDate);

                return con.DapCon.Query<Schedule>(GenericSP.GetScheduleListByDoctorID, Param, commandType: CommandType.StoredProcedure).AsQueryable();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable<Schedule> GetDoctorScheduleDates(int DOCID)
        {
            try
            {
                DapperConnection con = new DapperConnection();
                var Param = new DynamicParameters();
                Param.Add("@DOCID", DOCID);

                return con.DapCon.Query<Schedule>(GenericSP.GetDoctorScheduleDates, Param, commandType: CommandType.StoredProcedure).AsQueryable();

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<Schedule> GetDepartmentsByID(int DOCID)
        {
            try
            {
                DapperConnection con = new DapperConnection();
                var Param = new DynamicParameters();
                Param.Add("@DOCID", DOCID);
                return con.DapCon.Query<Schedule>(GenericSP.GetDepartmentsByID, Param, commandType: CommandType.StoredProcedure).ToList<Schedule>();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int32 UpdateSchedule(Schedule objSche)
        {
            DapperConnection con = new DapperConnection();
            var Param = new DynamicParameters();
            Int32 ResultStatus = 0;

            Param.Add("@SCID", objSche.SCID);
            Param.Add("@FromTime", objSche.FromTime);
            //Param.Add("@FromTime",Convert.ToDateTime(objSche.FromTime).ToString("HH: mm:ss"));
            Param.Add("@ToTime", objSche.ToTime);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            con.DapCon.Execute(GenericSP.UpdateSchedule, Param, commandType: CommandType.StoredProcedure);
            return ResultStatus = Param.Get<Int32>("@ResultStatus");


        }

        DoctorAppointments IService<DoctorAppointments>.Find(params object[] keyValues)
        {
            throw new NotImplementedException();
        }

        IQueryable<DoctorAppointments> IService<DoctorAppointments>.SelectQuery(string query, params object[] parameters)
        {
            throw new NotImplementedException();
        }

        public void Insert(DoctorAppointments entity)
        {
            throw new NotImplementedException();
        }

        public void InsertRange(IEnumerable<DoctorAppointments> entities)
        {
            throw new NotImplementedException();
        }

        public void InsertOrUpdateGraph(DoctorAppointments entity)
        {
            throw new NotImplementedException();
        }

        public void InsertGraphRange(IEnumerable<DoctorAppointments> entities)
        {
            throw new NotImplementedException();
        }

        public void Update(DoctorAppointments entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(DoctorAppointments entity)
        {
            throw new NotImplementedException();
        }

        IQueryFluent<DoctorAppointments> IService<DoctorAppointments>.Query()
        {
            throw new NotImplementedException();
        }

        public IQueryFluent<DoctorAppointments> Query(IQueryObject<DoctorAppointments> queryObject)
        {
            throw new NotImplementedException();
        }

        public IQueryFluent<DoctorAppointments> Query(Expression<Func<DoctorAppointments, bool>> query)
        {
            throw new NotImplementedException();
        }

        Task<DoctorAppointments> IService<DoctorAppointments>.FindAsync(params object[] keyValues)
        {
            throw new NotImplementedException();
        }

        Task<DoctorAppointments> IService<DoctorAppointments>.FindAsync(CancellationToken cancellationToken, params object[] keyValues)
        {
            throw new NotImplementedException();
        }

        IQueryable<DoctorAppointments> IService<DoctorAppointments>.Queryable()
        {
            throw new NotImplementedException();
        }

        public void UpdateList(List<DoctorAppointments> entities)
        {
            throw new NotImplementedException();
        }

        public void InsertList(List<DoctorAppointments> entities)
        {
            throw new NotImplementedException();
        }

    }
}
