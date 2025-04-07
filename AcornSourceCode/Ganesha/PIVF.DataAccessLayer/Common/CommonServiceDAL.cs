using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using PIVF.Entities.Models.Master.IVF;
using PIVF.Entities.Models.Patient;
using PIVF.Entities.Models.Dashboard;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Donor;
using PIVF.Entities.Models.Billing;

namespace PIVF.DataAccessLayer.Common
{
   public class CommonServiceDAL : CommonServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public CommonServiceDAL()
        {

            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<CommanEntity> GetMasterList(string tblNm, string id, string desc)
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", id);
            Param.Add("@ASID", "ID");
            Param.Add("@Description", desc);
            Param.Add("@ASDescription", "Description");
            Param.Add("@tblName", tblNm);
            return this.con.Query<CommanEntity>(GenericSP.GetMasterList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<clsPatientVO> GetPatientList(long UnitID, long PatientCategory)
        {
            List<clsPatientVO> List = new List<clsPatientVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID",GenericSP.CurrentUser.UnitID);
                Param.Add("@PatientCategory", PatientCategory);
                Param.Add("@TotalRows", 0, DbType.Int32, direction: ParameterDirection.Output);
                List = this.con.Query<clsPatientVO>(GenericSP.GetPatientList, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                List = null;
            }
            return List;
        }


        public List<clsPatientVO> GetPatientListforLab()
        {
            List<clsPatientVO> List = new List<clsPatientVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@Action", "GetPatientListforLab");
                //  Param.Add("@SearchExp","");
                return this.con.Query<clsPatientVO>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {
                List = null;
            }
            return List;

           
            
        }


        public List<clsPatientVO> GetPartnerList(long UnitID, long PatientCategory,int GenderId)
        {
            List<clsPatientVO> List = new List<clsPatientVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@PatientCategroyId", PatientCategory);
                Param.Add("@GenderId", GenderId);
                Param.Add("@TotalRows", 0, DbType.Int32, direction: ParameterDirection.Output);
                List = this.con.Query<clsPatientVO>(GenericSP.GetPartnerList, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                List = null;
            }
            return List;
        }
        public clsCoupleVO GetCoupleDetails(long UnitID, long ID)
        {
            clsCoupleVO Obj = new clsCoupleVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientUnitID", UnitID);
                Param.Add("@PatientID", ID);
                Param.Add("@IsAllCoupleDetails", 0);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetCoupleDetails, Param, commandType: CommandType.StoredProcedure);
                Obj = QueryMultiple.Read<clsCoupleVO>().FirstOrDefault();                
                Obj.FemalePatient = QueryMultiple.Read<FemalePatientVO>().Single();
                Obj.MalePatient = QueryMultiple.Read<MalePatientVO>().Single();
                if (Obj.FemalePatient != null && Obj.FemalePatient.FemalePhoto != null)
                {
                    string base64Photo = Convert.ToBase64String(Obj.FemalePatient.FemalePhoto);
                    Obj.FemalePatient.FemalePhotoStr = "data:image/jpeg;base64," + base64Photo;
                }
                else
                {
                    Obj.FemalePatient.FemalePhotoStr = null; // Or set a default image path
                }

            }
            catch (Exception ex)
            {
                Obj = null;
            }
            return Obj;
        }
        public clsCoupleVO BindMaleFemaleCoupleDetails(long UnitID, long ID, int GenderID)
        {
            clsCoupleVO Obj = new clsCoupleVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientUnitID", UnitID);
                Param.Add("@PatientID", ID);
                Param.Add("@GenderID", GenderID);
               // Param.Add("@IsAllCoupleDetails", 0);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetCoupleMFDetails, Param, commandType: CommandType.StoredProcedure);
                Obj = QueryMultiple.Read<clsCoupleVO>().FirstOrDefault();
                //if(QueryMultiple.Read<FemalePatientVO>().Single() != null)
                if(Obj != null)
                {
                    if (GenderID == 1)
                    {
                        Obj.MalePatient = QueryMultiple.Read<MalePatientVO>().Single();
                        Obj.FemalePatient = null;
                        if (Obj.MalePatient.Allergies == null || Obj.MalePatient.Allergies == "0")
                        {
                            Obj.MalePatient.Allergies = "";
                        }
                        Obj.MalePatient.Allergies = Obj.MalePatient.Allergies.Trim();
                        if (Obj.MalePatient.Allergies != null && Obj.MalePatient.Allergies != "")
                        {

                            if (Obj.MalePatient.Allergies[0] == ',')
                            {
                                Obj.MalePatient.Allergies = Obj.MalePatient.Allergies.Substring(1);
                            }
                            if (Obj.MalePatient.Allergies.Length > 0) { 
                                if (Obj.MalePatient.Allergies[Obj.MalePatient.Allergies.Length - 1] == ',')
                                {

                                Obj.MalePatient.Allergies = Obj.MalePatient.Allergies.Remove(Obj.MalePatient.Allergies.Length - 1);
                                }
                        }
                        }
                        if(Obj.MalePatient.Allergies == "0")
                        {
                            Obj.MalePatient.Allergies = "";
                        }
                      
                    }
                    else if (GenderID == 2)
                    {
                        Obj.FemalePatient = QueryMultiple.Read<FemalePatientVO>().Single();
                        Obj.MalePatient = null;
                        if (Obj.FemalePatient.Allergies == null || Obj.FemalePatient.Allergies == "0")
                        {
                            Obj.FemalePatient.Allergies = "";
                        }
                        Obj.FemalePatient.Allergies = Obj.FemalePatient.Allergies.Trim();
                        if (Obj.FemalePatient.Allergies != null && Obj.FemalePatient.Allergies != "")
                        {

                            if (Obj.FemalePatient.Allergies[0] == ',')
                            {
                                Obj.FemalePatient.Allergies = Obj.FemalePatient.Allergies.Substring(1);
                            }
                            if (Obj.FemalePatient.Allergies.Length > 0)
                            { 
                                if (Obj.FemalePatient.Allergies[Obj.FemalePatient.Allergies.Length - 1] == ',')
                                {

                                    Obj.FemalePatient.Allergies = Obj.FemalePatient.Allergies.Remove(Obj.FemalePatient.Allergies.Length - 1);
                                }
                         }
                        }
                        if(Obj.FemalePatient.Allergies == " 0")// don't remove space--ashish
                        {
                            Obj.FemalePatient.Allergies = "";
                        }
                    }
                }
                else
                {
                    Obj.FemalePatient = null;
                    Obj.MalePatient = null;
                }
               
               
                //if(QueryMultiple.Read<MalePatientVO>().Single() != null)
                 
            }
            catch (Exception ex)
            {
                Obj = null;
            }
         

            return Obj;
        }
        public DonorDetailsVO GetDonorDetails(long UnitID, long ID)
        {
            DonorDetailsVO Obj = new DonorDetailsVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);  //Added sujata sujaua
                //Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);  //commented  sujata cross clinic
                Obj = this.con.Query<DonorDetailsVO>(GenericSP.GetDonor, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Obj = null;
            }
            return Obj;
        }

        public DoctorList GetEmbryologyDoctorsList()
        {
            var Param = new DynamicParameters();
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            var doctorList = new DoctorList();
            var response= this.con.QueryMultiple(GenericSP.GetEmbryologyDoctorsList, Param, commandType: CommandType.StoredProcedure);
            doctorList.All = response.Read<CommanEntity>().ToList();
            doctorList.EmbryologistAndrologist = response.Read<CommanEntity>().ToList();
            doctorList.Embryologist=response.Read<CommanEntity>().ToList();
            doctorList.Andrologist=response.Read<CommanEntity>().ToList();
            doctorList.Clinician=response.Read<CommanEntity>().ToList();
            return doctorList;
        }

         public List<CommanEntity> GetDoctorsList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorList");
            
          //  Param.Add("@SearchExp","");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<ServiceMasterVO> GetServiceList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetServiceList");
            return this.con.Query<ServiceMasterVO>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        /*Added by AniketK on 10Oct2020*/
        public List<ServiceMasterVO> GetServiceTestList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetServiceTestList");
            return this.con.Query<ServiceMasterVO>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        /*Added by AniketK on 10Oct2020*/



        public List<CommanEntity> GetSampleCollectionLocList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "SampleCollectionLocList");
          //  Param.Add("@SearchExp","");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<CommanEntity> GetUltrasonographyTemplateList()
        {
            // Added on 17102019 for Staff Master merging
            //  Param.Add("@SearchExp","");
            return this.con.Query<CommanEntity>(GenericSP.GetUltrasonographyFormsList, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<CommanEntity> GetDepartmentList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDepartmentList");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);     // Added on 17102019 for Staff Master merging
            //  Param.Add("@SearchExp","");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<CommanEntity> GetSpeclRegTypeList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetSpeclRegTypeList");
            //  Param.Add("@SearchExp","");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public long CheckTodayVisit(long PatientID, long PatientUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID,DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus",0, DbType.Int64, direction: ParameterDirection.Output);
            this.con.Query<long>(GenericSP.CheckTodayVisit, Param, commandType: CommandType.StoredProcedure);
            long ResultStatus = Param.Get<Int64>("@ResultStatus");
            return ResultStatus;
        }
        public IEnumerable<VisitVO> GetActiveVisitByPatient(long PatientID, long PatientUnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            return this.con.Query<VisitVO>(GenericSP.GetActiveVisitByPatient, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<VisitVO> GetAllVisitByPatient(long PatientID, long PatientUnitID,int PageIndex)
        {
            List<VisitVO> _List = new List<VisitVO>();
            var Param = new DynamicParameters();
            Param.Add("@PatientID", PatientID, DbType.Int64);
            Param.Add("@PatientUnitID", PatientUnitID, DbType.Int64);
            Param.Add("@GenderID", GenericSP.SelectedPatient.GenderID, DbType.Int64);          
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@startRowIndex", PageIndex);
            Param.Add("@TotalRows", DbType.Int32, direction: ParameterDirection.Output);

            _List = this.con.Query<VisitVO>(GenericSP.GetAllVisitByPatient, Param, commandType: CommandType.StoredProcedure).ToList();

            if (_List.Count > 0)
                _List[0].TotalRows = Param.Get<Int32>("@TotalRows");
            return _List;
        }
        
        public List<CommanEntity> GetArtSubTypeList(int ArtTypeID, int patientCatID)
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", patientCatID);
            Param.Add("@SearchExp", ArtTypeID.ToString());
            Param.Add("@Action", "GetArtSubTypeList");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<clsPatientVO> GetPatientListByCatList(int patientCatID, int idx,string param)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientListByCatList");
            Param.Add("@ID", patientCatID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PageIndex", idx);
            Param.Add("@SearchExp", param);
            return this.con.Query<clsPatientVO>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<DonerDetailsVO> GetActiveDonerList(int patientCatID, int idx, string param)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetActiveDonerListForLinking");
            Param.Add("@ID", patientCatID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PageIndex", idx);
            Param.Add("@SearchExp", param);
            return this.con.Query<DonerDetailsVO>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public PageConfig GetcycleType(int ArtTypeID, int ArtSubTypeID)
        {
            var Param = new DynamicParameters();
            Param.Add("@ArtTypeID", ArtTypeID,DbType.Int32);
            Param.Add("@ArtSubTypeID", ArtSubTypeID, DbType.Int32);
            return this.con.Query<PageConfig>(GenericSP.GetcycleType, Param, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }
        public DashboardVO GetDashBoardData()
        {
            DashboardVO obj = new DashboardVO();
            obj.objFemale = new Entities.Models.Dashboard.FemalePatientDashBoardVO();
            obj.objMale = new Entities.Models.Dashboard.MalePatientDashBoardVO();
            var Param = new DynamicParameters();
            if (GenericSP.SelectedPatient.PatientCategoryID == 7 || GenericSP.SelectedCouple.MalePatient.PatientCategoryID==7 || GenericSP.SelectedCouple.FemalePatient.PatientCategoryID == 7)
            {
                Param.Add("@Action", "GetFemaleDashBoard");
                Param.Add("@FemaleID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                Param.Add("@MaleID", GenericSP.SelectedCouple.MalePatient.MaleId);
                //obj.objFemale = this.con.Query<FemalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure);
                obj.objFemale = QueryMultiple.Read<FemalePatientDashBoardVO>().FirstOrDefault();
                if (obj.objFemale == null)
                    obj.objFemale = new FemalePatientDashBoardVO();
                if (obj.objFemale != null)
                {
                    obj.objFemale.Diagnosis = QueryMultiple.Read<string>().FirstOrDefault();
                    
                }
                else
                {
                    obj.objFemale = new FemalePatientDashBoardVO();
                    obj.objFemale.Diagnosis = "";
                }
                if (obj.objFemale != null)
                {
                    obj.objFemale.MoleculeName = QueryMultiple.Read<string>().FirstOrDefault();

                }
                else
                {
                    obj.objFemale = new FemalePatientDashBoardVO();
                    obj.objFemale.MoleculeName = "";
                }

                if (obj.objFemale != null)
                    obj.objPathoDetails = QueryMultiple.Read<IVFDashPathoDetails>().FirstOrDefault();

                if (obj.objFemale != null)
                {
                    obj.objFemale.FemaleHistoryData = QueryMultiple.Read<FemaleHistory>().ToList();
                    if (obj.objFemale.FemaleHistoryData.Count == 1)
                    {
                        obj.objFemale.TrayingToConvinceMonths = obj.objFemale.FemaleHistoryData[0].TrayingToConvinceMonths;
                        obj.objFemale.TrayingToConvinceYears = obj.objFemale.FemaleHistoryData[0].TrayingToConvinceYears;
                        obj.objFemale.CycleDuration = obj.objFemale.FemaleHistoryData[0].CycleDuration;
                        obj.objFemale.MenstrualDays = obj.objFemale.FemaleHistoryData[0].MenstrualDays;
                        obj.objFemale.MenstrualRegularity = obj.objFemale.FemaleHistoryData[0].MenstrualRegularity;
                        obj.objFemale.FemaleInfertility = obj.objFemale.FemaleHistoryData[0].FemaleInfertility;
                        obj.objFemale.MaleInfertility = obj.objFemale.FemaleHistoryData[0].MaleInfertility;
                        obj.objFemale.InfertilityType = obj.objFemale.FemaleHistoryData[0].InfertilityType;
                    }

                }

                
                    obj.objFemale.RightOvaryCount = obj.objFemale.RightOvaryCount;
                    obj.objFemale.LeftOvaryCount = obj.objFemale.LeftOvaryCount;

                    obj.objFemale.LeftTube = obj.objFemale.LeftTube;
                    obj.objFemale.RightTube = obj.objFemale.RightTube;

                    obj.objFemale.Remark = obj.objFemale.Remark;

                    obj.objFemale.BloodGroup = obj.objFemale.BloodGroup;

                // if (obj.objFemale == null) obj.objFemale = new FemalePatientDashBoardVO();
                if (obj.objFemale.GetType().GetProperties().Any())
                {
                    Param.Add("@Action", "GetMaleDashBoard");
                    //obj.objMale = this.con.Query<MalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    var QueryMultiple1 = this.con.QueryMultiple(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure);
                    obj.objMale = QueryMultiple1.Read<MalePatientDashBoardVO>().FirstOrDefault();
                    if (obj.objMale != null)
                        obj.objMale.Diagnosis = QueryMultiple1.Read<string>().FirstOrDefault();
                    else
                    {
                        obj.objMale = new MalePatientDashBoardVO();
                        obj.objMale.Diagnosis = QueryMultiple1.Read<string>().FirstOrDefault();
                    }
                    obj.objMale.BloodGroup = obj.objMale.BloodGroup;
                }
                //if (obj.objMale == null) obj.objMale = new MalePatientDashBoardVO();
            }
            else
            {
                if (GenericSP.SelectedPatient.GenderID == 1)
                {
                    Param.Add("@Action", "GetMaleDashBoard");
                    Param.Add("@UnitID", GenericSP.SelectedPatient.UnitID);
                    Param.Add("@MaleID", GenericSP.SelectedPatient.ID);
                    //obj.objMale = this.con.Query<MalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    var QueryMultiple2 = this.con.QueryMultiple(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure);
                    obj.objMale = QueryMultiple2.Read<MalePatientDashBoardVO>().FirstOrDefault();
                    if (obj.objMale != null)
                        obj.objMale.Diagnosis = QueryMultiple2.Read<string>().FirstOrDefault();
                    else
                    {
                        obj.objMale = new MalePatientDashBoardVO();
                        obj.objMale.Diagnosis = "";
                    }

                    
                }
                else if (GenericSP.SelectedPatient.GenderID == 2)
                {
                    Param.Add("@Action", "GetFemaleDashBoard");
                    Param.Add("@UnitID", GenericSP.SelectedPatient.UnitID);
                    Param.Add("@FemaleID", GenericSP.SelectedPatient.ID);
                    //obj.objFemale = this.con.Query<FemalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    var QueryMultiple1 = this.con.QueryMultiple(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure);
                    obj.objFemale = QueryMultiple1.Read<FemalePatientDashBoardVO>().FirstOrDefault();
                    if (obj.objFemale == null)
                        obj.objFemale = new FemalePatientDashBoardVO();

                    if (obj.objFemale != null)
                        obj.objFemale.Diagnosis = QueryMultiple1.Read<string>().FirstOrDefault();
                    else
                    {
                        obj.objFemale = new FemalePatientDashBoardVO();
                        obj.objFemale.Diagnosis = "";
                    }
                    if (obj.objFemale != null)
                    {
                        obj.objFemale.MoleculeName = QueryMultiple1.Read<string>().FirstOrDefault();

                    }
                    else
                    {
                        obj.objFemale = new FemalePatientDashBoardVO();
                        obj.objFemale.MoleculeName = "";
                    }

                    if (obj.objFemale != null)
                        obj.objPathoDetails = QueryMultiple1.Read<IVFDashPathoDetails>().FirstOrDefault();
                    if (obj.objFemale != null)
                    {
                        obj.objFemale.FemaleHistoryData = QueryMultiple1.Read<FemaleHistory>().ToList();
                        if (obj.objFemale.FemaleHistoryData.Count == 1)
                        {
                            obj.objFemale.TrayingToConvinceMonths = obj.objFemale.FemaleHistoryData[0].TrayingToConvinceMonths;
                            obj.objFemale.TrayingToConvinceYears = obj.objFemale.FemaleHistoryData[0].TrayingToConvinceYears;
                            obj.objFemale.CycleDuration = obj.objFemale.FemaleHistoryData[0].CycleDuration;
                            obj.objFemale.MenstrualDays = obj.objFemale.FemaleHistoryData[0].MenstrualDays;
                            obj.objFemale.MenstrualRegularity = obj.objFemale.FemaleHistoryData[0].MenstrualRegularity;
                            obj.objFemale.FemaleInfertility = obj.objFemale.FemaleHistoryData[0].FemaleInfertility;
                            obj.objFemale.MaleInfertility = obj.objFemale.FemaleHistoryData[0].MaleInfertility;
                            obj.objFemale.InfertilityType = obj.objFemale.FemaleHistoryData[0].InfertilityType;
                        }

                    }
                }
                //if (obj.objFemale == null) obj.objFemale = new FemalePatientDashBoardVO();
                //if (obj.objMale == null) obj.objMale = new MalePatientDashBoardVO();
            }


                //obj.objFemale = this.con.Query<FemalePatientDashBoardVO>(GenericSP.GetDashboardInfo, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return obj;
        }
        public string GetGlobalData()
        {
            var Param1 = new DynamicParameters();
            Param1.Add("@Action", "GetGlobalData");
            Param1.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param1.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            string Allergy = con.Query<string>(GenericSP.GetEMRLandingPageData, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
            if (Allergy != null) {
                    int j = Allergy.Length - 1;
                    for (int i = Allergy.Length; i > 0; i--) {
                    if (Allergy[j] == ',' && Allergy[j - 1] == ',') {

                        Allergy = Allergy.Remove(j, 1);
                    }
                        j--;
                }
                    Allergy = Allergy.TrimEnd(',');

            }
      
            return Allergy;
        }

        public List<CommanEntity> GetBDMList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetBDMList");
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<Country> GetCountryList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCountryList");
            return this.con.Query<Country>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        //Begin:: Added by AniketK on 18OCT2019 for Registration
        public List<State> GetStateList(int countryID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetStateByCountryIDList");
            Param.Add("@ID", countryID);
            return this.con.Query<State>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<City> GetCityList(int stateID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCityByStateIDList");
            Param.Add("@ID", stateID);
            return this.con.Query<City>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        //End:: Added by AniketK on 18OCT2019 for Registration

        //Added by Aniket for PaymentMode validation
        public List<PaymentModeValidationVO> GetPaymentModeValidation()
        {
            List<PaymentModeValidationVO> _List = new List<PaymentModeValidationVO>();
            var Param = new DynamicParameters();
            //Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            _List = this.con.Query<PaymentModeValidationVO>(GenericSP.GetPaymentModeValidation, Param, commandType: CommandType.StoredProcedure).ToList();
            return _List;
        }

        // added sujata for schedule
        public List<CommanEntity> GetUnitListDoctorIDForSchedule(int DOCID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetUnitListDoctorIDForSchedule");
            Param.Add("@ID", DOCID);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<CommanEntity> GetDeptIDListDoctorIDAndUnitID(int DOCID, int UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDeptIDListDoctorIDAndUnitID");
            Param.Add("@ID", DOCID);
            Param.Add("@UnitID", UnitID);
           
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public List<CommanEntity> GetDoctorsList(bool docType)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorList");
            Param.Add("@ID", docType);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<CommanEntity> getDoctorListForReg(int id)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDoctorList");
            Param.Add("@ID", id);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        // ended sujata for schedule

        // added sujata for Appointment date 7/11/19
        public List<CommanEntity> GetDeptIDByUnitIDFOrAppointment(int UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetDeptIDByUnitIDFOrAppointment");
            Param.Add("@UnitID", UnitID);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        
        // eneded sujata for Appointment date 7/11/19
    }
}
