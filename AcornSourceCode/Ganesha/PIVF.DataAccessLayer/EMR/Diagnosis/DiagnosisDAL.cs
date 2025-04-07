using Dapper;
using DataBaseConfiguration;
using PIVF.BusinessLayer.EMR.Diagnosis;
using PIVF.Entities.Models.EMR.Diagnosis;
using PIVF.Entities.Models.EMR.Dignosis;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.EMR.Diagnosis
{
    public class DiagnosisDAL : DiagnosisBL
    {
        DapperConnection Con = new DapperConnection();

        public int CheckIfDiagnosisAddedToPatient(List<DiagnosisVO> _OtherDiagnosisVO)
        {
            List<DiagnosisVO> _List = new List<DiagnosisVO>();
            int ResultStatus = 0;
            try
            {
                foreach (var item in _OtherDiagnosisVO)
                {
                    if (item.IsSelected == true)
                    {                        
                        var ParamD = new DynamicParameters();
                        ParamD.Add("@PatientId", GenericSP.SelectedPatient.ID);
                        ParamD.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);                        
                        ParamD.Add("@UnitID", GenericSP.CurrentUser.UnitID);                     
                        ParamD.Add("@IsOtherDiagnosis", item.IsOther);
                        ParamD.Add("@DiagnosisID", item.ID);
                        ParamD.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                        ParamD.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                        Con.DapCon.Query(GenericSP.CheckIfDiagnosisAddedToPatient, ParamD, commandType: CommandType.StoredProcedure);
                        ResultStatus = ParamD.Get<Int16>("@ResultStatus");
                    }
                }

            }
            catch (Exception E)
            {
                ResultStatus = 0;
            }
            return ResultStatus;

        }
        public long SavePatientDiagnosis(List<DiagnosisVO> _OtherDiagnosisVO)
        {
            List<DiagnosisVO> _List = new List<DiagnosisVO>();
            int ResultStatus = 0;
            try
            {
                foreach (var item in _OtherDiagnosisVO)
                {
                    if (item.IsSelected == true)
                    {
                        
                        var Param = new DynamicParameters();
                        Param.Add("@PatientId", GenericSP.SelectedPatient.ID);
                        Param.Add("@PatientUnitId", GenericSP.SelectedPatient.UnitID);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param.Add("@VisitId", GenericSP.SelectedPatient.VisitID);  //TEMP
                        Param.Add("@DiagnosisID", item.ID);
                        Param.Add("@DiagnosisTypeID", item.DiagnosisTypeID);
                        Param.Add("@IsOtherDiagnosis", item.IsOther);
                        Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param.Add("@AddedOn", Environment.MachineName);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName);
                        Param.Add("@AddedByUserName", GenericSP.CurrentUser.UserName);
                        Param.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output, size: 300);
                        Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                        Con.DapCon.Query(GenericSP.AddDiagnosisDeatails, Param, commandType: CommandType.StoredProcedure);
                        ResultStatus = Param.Get<Int16>("@ResultStatus");
                    }
                }

            }
            catch (Exception E)
            {
                ResultStatus = 0;
            }
            return ResultStatus;

        }
        public int SaveOtherDiagnosis(OtherDiagnosisVO _OtherDiagnosisVO)
        {
            //List<OtherDiagnosisVO> _List = new List<OtherDiagnosisVO>();
            int ResultStatus = 0;
            try
            {

                var Param = new DynamicParameters();

                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@Code", _OtherDiagnosisVO.Code);
                Param.Add("@Diagnosis", _OtherDiagnosisVO.Diagnosis);
                Param.Add("@IsFavourite", 0);
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param.Add("@AddedOn", Environment.MachineName);
                Param.Add("@AddedWindowsLoginName", Environment.UserName);
                Param.Add("@AddedByUserName", GenericSP.CurrentUser.UserName);
                Param.Add("@ID", dbType: DbType.Int64, direction: ParameterDirection.Output, size: 300);
                Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                Con.DapCon.Query(GenericSP.AddOtherDiagnosis, Param, commandType: CommandType.StoredProcedure);
                ResultStatus = Param.Get<Int16>("@ResultStatus");

            }
            catch (Exception E)
            {
                ResultStatus = 0;
            }
            return ResultStatus;

        }
        public int SetFavourite(DiagnosisVO _DiagnosisVO)
        {
            int ID = 0;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", _DiagnosisVO.UnitID);
                Param.Add("@ID", _DiagnosisVO.ID);
                Param.Add("@IsFavourite", _DiagnosisVO.IsFavourite);
                Param.Add("@IsOther", _DiagnosisVO.IsOther);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);
                Con.DapCon.Query(GenericSP.SetFavouriteDiagnosis, Param, commandType: CommandType.StoredProcedure);
                ID = Param.Get<Int32>("@ResultStatus");
            }
            catch (Exception E)
            {
                ID = 0;
            }
            return ID;

        }
        public int RemoveFavourite(long ID, long UnitID, bool IsOther, string Reason)
        {
            int ID1 = 0;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", UnitID);
                Param.Add("@ID", ID);
                Param.Add("@Reason", Reason);
                Param.Add("@IsOther", IsOther);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);
                Con.DapCon.Query(GenericSP.RemoveFavouriteDiagnosis, Param, commandType: CommandType.StoredProcedure);
                ID1 = Param.Get<Int32>("@ResultStatus");
            }
            catch (Exception E)
            {
                ID1 = 0;
            }
            return ID1;

        }


        public int DeletePatientDiagnosis(long ID, long UnitID, string Reason)
        {
            int ID1 = 0;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);
                Param.Add("@Reason", Reason);
                Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                Con.DapCon.Query(GenericSP.DeletePatientDiagnosis, Param, commandType: CommandType.StoredProcedure);
                ID1 = Param.Get<Int16>("@ResultStatus");
            }
            catch (Exception E)
            {
                ID1 = 0;
            }
            return ID1;

        }
        public long DeleteOtherDiagnosis(long ID, long UnitID, bool IsOther, string Reason)
        {
            long ID1 = 0;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", UnitID);
                Param.Add("@ID", ID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                Param.Add("@Reason", Reason);
                Param.Add("@IsOther", IsOther);
                Con.DapCon.Query(GenericSP.DeleteOtherDiagnosis, Param, commandType: CommandType.StoredProcedure);
                ID1 = Param.Get<Int64>("@ID");

            }
            catch (Exception E)
            {
                ID1 = 0;
            }
            return ID1;

        }

        public List<DiagnosisDetailsVO> GetPatientDiagnosis(int PageIndex)
        {
            List<DiagnosisDetailsVO> _List = new List<DiagnosisDetailsVO>();
            try
            {

                var Param = new DynamicParameters();
                Param.Add("@startRowIndex", PageIndex);
                Param.Add("@PatientId", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitId", GenericSP.SelectedPatient.UnitID);
                //Param.Add("@VisitId",GenericSP.SelectedPatient.VisitID); //temp
                Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);
                _List = Con.DapCon.Query<DiagnosisDetailsVO>(GenericSP.GetPatientDiagnosis, Param, commandType: CommandType.StoredProcedure).ToList();

                if (_List.Count > 0)
                    _List[0].TotalRows = Param.Get<Int32>("@TotalRows");
            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }
        public List<DiagnosisVO> FillDiagnosis(int PageIndex, string Diagnosis,int GenderID)
        {
            List<DiagnosisVO> _List = new List<DiagnosisVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@startRowIndex", PageIndex);
                Param.Add("@Diagnosis", Diagnosis);
                Param.Add("@GenderID", GenderID);
                Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);
                _List = Con.DapCon.Query<DiagnosisVO>(GenericSP.GetDiagnosis, Param, commandType: CommandType.StoredProcedure).ToList();

                if (_List.Count > 0)
                    _List[0].TotalRows = Param.Get<Int32>("@TotalRows");
            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }
        public List<OtherDiagnosisVO> FillOtherDiagnosis(int PageIndex, string Diagnosis)
        {
            List<OtherDiagnosisVO> _List = new List<OtherDiagnosisVO>();
            try
            {

                var Param = new DynamicParameters();
                Param.Add("@startRowIndex", PageIndex);
                Param.Add("@Diagnosis", Diagnosis);
                Param.Add("@LoggedInUserUnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);
                _List = Con.DapCon.Query<OtherDiagnosisVO>(GenericSP.GetOtherDiagnosis, Param, commandType: CommandType.StoredProcedure).ToList();

                if (_List.Count > 0)
                    _List[0].TotalRows = Param.Get<Int32>("@TotalRows");

            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }
        public List<DiagnosisVO> FillFavouriteDiagnosis(int PageIndex, string Diagnosis)
        {
            List<DiagnosisVO> _List = new List<DiagnosisVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@startRowIndex", PageIndex);
                Param.Add("@Diagnosis", Diagnosis);
                Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);
                _List = Con.DapCon.Query<DiagnosisVO>(GenericSP.GetFavouriteDiagnosis, Param, commandType: CommandType.StoredProcedure).ToList();

                if (_List.Count > 0)
                    _List[0].TotalRows = Param.Get<Int32>("@TotalRows");
            }
            catch (Exception E)
            {
                _List = null;
            }
            return _List;
        }

    }
}
