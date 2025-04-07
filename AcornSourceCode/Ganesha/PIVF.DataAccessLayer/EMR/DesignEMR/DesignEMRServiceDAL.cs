using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.BusinessLayer.EMR.DesignEMR;
using PIVF.Entities.Models.EMR.DesignEMR;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;
using Dapper;
using PIVF.Entities.Models.Master.IVF;
using PIVF.Entities.Models.Patient;
using System.Transactions;

namespace PIVF.DataAccessLayer.EMR.DesignEMR
{
   public class DesignEMRServiceDAL : DesignEMRServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public DesignEMRServiceDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public long SaveTemplate(DesignEMRVO _objDesignEMRVO)
        {
            long ID = 0;
            try
            {
                var Param = new DynamicParameters();
                if (_objDesignEMRVO.ID > 0)
                {                   
                    Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                    Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@UpdatedOn", Environment.MachineName);
                    Param.Add("@UpdatedWindowsLoginName", Environment.UserName);    
                }
                else
                {                
                    Param.Add("@AddedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);
                }
                Param.Add("@TempName", _objDesignEMRVO.TempName);
                Param.Add("@GenderID", _objDesignEMRVO.GenderID);
                Param.Add("@FormID", _objDesignEMRVO.FormID);               
                Param.Add("@Status", _objDesignEMRVO.Status);
                Param.Add("@EditorSchema", _objDesignEMRVO.EditorSchema);
                Param.Add("@SchemaDecription", _objDesignEMRVO.SchemaDecription);
                Param.Add("@ModelDescription", _objDesignEMRVO.ModelDescription);
                Param.Add("@ID", _objDesignEMRVO.ID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                Param.Add("@FormDecription", _objDesignEMRVO.FormDecription);
                con.Query(GenericSP.AddEMRTemplate, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ID = Param.Get<long>("@ID");
            }
            catch (Exception E)
            {
                ID = 0;
            }
            return ID;
        }
        public long SaveUpdateEMRTemplate(DesignEMRVO _objDesignEMRVO)
        {
            long ID = 0;
            try
            {
                using (var TransactionScope = new TransactionScope())
                {
                    var Param = new DynamicParameters();
                    if (_objDesignEMRVO.TID > 0)
                    {
                        Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                        Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                        Param.Add("@UpdatedOn", Environment.MachineName);
                        Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
                    }
                    else
                    {
                        Param.Add("@AddedUnitID", GenericSP.CurrentUser.UnitID);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param.Add("@AddedOn", Environment.MachineName);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    }
                    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                    Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                    //Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    //Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                    Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@TemplateID", _objDesignEMRVO.ID);
                    Param.Add("@Status", _objDesignEMRVO.Status);
                    Param.Add("@ModelDescription", _objDesignEMRVO.ModelDescription);
                    Param.Add("@ID", _objDesignEMRVO.TID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                    con.Query(GenericSP.AddUpdateEMRTemplateDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    ID = Param.Get<long>("@ID");

                    foreach (var item in _objDesignEMRVO.ListPatientImages)
                    {
                        var Param1 = new DynamicParameters();
                        if (item.ID > 0)
                        {
                            Param1.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                            Param1.Add("@UpdatedOn", Environment.MachineName);
                            Param1.Add("@UpdatedWindowsLoginName", Environment.UserName);
                        }
                        else
                        {
                            Param1.Add("@AddedUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param1.Add("@AddedOn", Environment.MachineName);
                            Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                        }
                        Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@PatientID", GenericSP.SelectedPatient.ID);                       
                        Param1.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                        Param1.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                        Param1.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                        Param1.Add("@TemplateID", ID);
                        Param1.Add("@TemplateUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@Status", _objDesignEMRVO.Status);
                        Param1.Add("@Photo", item.Photo);
                        Param1.Add("@Name", item.Name);
                        Param1.Add("@ID", item.ID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                        con.Query(GenericSP.AddUpdateEMRTemplateImages, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    }                    
                    TransactionScope.Complete();
                }                    
            }
            catch (Exception e)
            {
                ID = 0;
            }
            return ID;
        }

        public long SaveUpdateCycleTemplate(DesignEMRVO _objDesignEMRVO)
        {
            long ID = 0;
            try
            {
                using (var TransactionScope = new TransactionScope())
                {
                    var Param = new DynamicParameters();
                    if (_objDesignEMRVO.TID > 0)
                    {
                        Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                        Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                        Param.Add("@UpdatedOn", Environment.MachineName);
                        Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
                    }
                    else
                    {
                        Param.Add("@AddedUnitID", GenericSP.CurrentUser.UnitID);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param.Add("@AddedOn", Environment.MachineName);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName);
                    }
                    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                    Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                    //Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    //Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    Param.Add("@VisitID", 0);
                    Param.Add("@VisitUnitID",0);
                    Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@TemplateID", _objDesignEMRVO.ID);
                    Param.Add("@Status", _objDesignEMRVO.Status);
                    Param.Add("@ModelDescription", _objDesignEMRVO.ModelDescription);
                    Param.Add("@ID", _objDesignEMRVO.TID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                    con.Query(GenericSP.AddUpdateEMRTemplateDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    ID = Param.Get<long>("@ID");

                    foreach (var item in _objDesignEMRVO.ListPatientImages)
                    {
                        var Param1 = new DynamicParameters();
                        if (item.ID > 0)
                        {
                            Param1.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                            Param1.Add("@UpdatedOn", Environment.MachineName);
                            Param1.Add("@UpdatedWindowsLoginName", Environment.UserName);
                        }
                        else
                        {
                            Param1.Add("@AddedUnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                            Param1.Add("@AddedOn", Environment.MachineName);
                            Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                        }
                        Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@PatientID", GenericSP.SelectedPatient.ID);
                        Param1.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                        Param1.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                        Param1.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                        Param1.Add("@TemplateID", ID);
                        Param1.Add("@TemplateUnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@Status", _objDesignEMRVO.Status);
                        Param1.Add("@Photo", item.Photo);
                        Param1.Add("@Name", item.Name);
                        Param1.Add("@ID", item.ID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                        con.Query(GenericSP.AddUpdateEMRTemplateImages, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    }
                    TransactionScope.Complete();
                }
            }
            catch (Exception e)
            {
                ID = 0;
            }
            return ID;
        }
        public List<DesignEMRVO> GetTemplate(string TemplateName, long GenderID, long FormID,int CurrentPage)
        {
            List<DesignEMRVO> List = new List<DesignEMRVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@GenderID", GenderID);
                Param.Add("@PageIndex", CurrentPage);
                Param.Add("@FormID", FormID);
                Param.Add("@TempName", TemplateName);               
                Param.Add("@TotalRows", dbType: DbType.Int64, direction: ParameterDirection.Output, size: 300);
                List = con.Query<DesignEMRVO>(GenericSP.GetTemplateList, Param, commandType: CommandType.StoredProcedure).ToList();
                if (List.Count > 0)
                {
                    List[0].TotalRows = Param.Get<long>("@TotalRows");
                }
            }
            catch (Exception e)
            {
                List = null;
            }
            return List;
        }
        public List<CommanEntity> FillFormType(long GenderID)
        {
            List<CommanEntity> List = new List<CommanEntity>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@GenderID", GenderID);                              
                List = con.Query<CommanEntity>(GenericSP.GetFormsList, Param, commandType: CommandType.StoredProcedure).ToList();               
            }
            catch (Exception e)
            {
                List = null;
            }
            return List;
        }
        public DesignEMRVO GetTemplateByID(long ID)
        {
            DesignEMRVO Obj = new DesignEMRVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Obj = con.Query<DesignEMRVO>(GenericSP.GetTemplateByID, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception e)
            {
                Obj = null;
            }
            return Obj;
        }
        public List<DesignEMRVO> GetTemplateByFormID(long ID,  long TempID)
       {
            List<DesignEMRVO> Obj = new List<DesignEMRVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@TempID", TempID);
                Obj = con.Query<DesignEMRVO>(GenericSP.GetTemplateByFormID, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {
                Obj = null;
            }
            return Obj;
        }
        public DesignEMRVO GetTemplateData(long ID, long UnitID)
        {
            DesignEMRVO Obj = new DesignEMRVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);
                //Obj = con.Query<DesignEMRVO>(GenericSP.GetTemplateData, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();                
                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetTemplateData, Param, commandType: CommandType.StoredProcedure);               
                Obj = QueryMultiple.Read<DesignEMRVO>().Single();              
                Obj.ListPatientImages = QueryMultiple.Read<clsPatientImagesVO>().ToList();
                GenericSP.SelectedPatient.ListPatientImages = Obj.ListPatientImages;

            }
            catch (Exception e)
            {
                Obj = null;
            }
            return Obj;
        }       
        public List<DesignEMRVO> ListAllTemplateList(long ID)
        {
            List<DesignEMRVO> Obj = new List<DesignEMRVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                Obj = con.Query<DesignEMRVO>(GenericSP.GetAllTemplateList, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {
                Obj = null;
            }
            return Obj;
        }

        public List<DesignEMRVO> ListAllCycleTemplateList(long ID)
        {
            List<DesignEMRVO> Obj = new List<DesignEMRVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                Param.Add("@IsCycle",true);
                Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);

                Obj = con.Query<DesignEMRVO>(GenericSP.GetAllTemplateList, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {
                Obj = null;
            }
            return Obj;
        }
        public long DeleteTemplate(DesignEMRVO _objDesignEMRVO)
        {
            long ID = 0;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", _objDesignEMRVO.ID);
                Param.Add("@Reason", _objDesignEMRVO.Reason);
                Param.Add("@SNO", _objDesignEMRVO.SNO);
                con.Query<DesignEMRVO>(GenericSP.DeleteEMRTemplate, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ID = Param.Get<long>("@ID");
            }
            catch (Exception e)
            {
                ID = 0;
            }
            return ID;
        }        
        public int ActiveDeactiveSave(DesignEMRVO _objDesignEMRVO)
        {
            int ResultStatus = 0;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", _objDesignEMRVO.ID);
                Param.Add("@ResultStatus",  dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);
                Param.Add("@ReasonDeactive", _objDesignEMRVO.ReasonDeactive);
                Param.Add("@SNO", _objDesignEMRVO.SNO);
                Param.Add("@FormID", _objDesignEMRVO.FormID);
                Param.Add("@Status", _objDesignEMRVO.Status);
                
                con.Query<DesignEMRVO>(GenericSP.DeactiveEMRTemplate, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResultStatus = Param.Get<Int32>("@ResultStatus");
            }
            catch (Exception e)
            {
                ResultStatus = 0;
            }
            return ResultStatus;
        }

        public List<CommanEntity> GetSubtemplatesList(long FormID)  // added by sujata
        {
            List<CommanEntity> List = new List<CommanEntity>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@FormID", FormID);
                List = con.Query<CommanEntity>(GenericSP.GetSubFormsList, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {
                List = null;
            }
            return List;
        }
    }
}
