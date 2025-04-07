using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.EMR.Prescription;
using PIVF.Entities.Models.EMR.Prescription;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.EMR.Prescription
{
    public class PrescriptioncDAL : PrescriptionBL
    {
        private Database dbServer = null;
        IDbConnection con;
        public PrescriptioncDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<CommanEntity> GetDrugList(long UnitID)
        {
            List<CommanEntity> List = new List<CommanEntity>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", UnitID);
                List = this.con.Query<CommanEntity>(GenericSP.GetItemsForPrescription, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception E)
            {
                List = null;

            }
            return List;
        }
        //public List<DrugVO> GetItemByTemplate(long ID)
        //{
        //    List<DrugVO> List = new List<DrugVO>();
        //    try
        //    {
        //        var Param = new DynamicParameters();
        //        Param.Add("@ID", ID);
        //        Param.Add("@UserID", GenericSP.CurrentUser.UserID);
        //        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
        //        List = this.con.Query<DrugVO>(GenericSP.GetFavDrugsByTempID, Param, commandType: CommandType.StoredProcedure).ToList();
        //    }
        //    catch (Exception E)
        //    {
        //        List = null;

        //    }
        //    return List;
        //}
        public List<TemplateForPrescriptionVO> GetTemplateAndItems()
        {
         
            List<TemplateForPrescriptionVO> List = new List<TemplateForPrescriptionVO>();          
            try
            {
                var Param = new DynamicParameters();             
                Param.Add("@UserID", GenericSP.CurrentUser.UserID);               
                List = this.con.Query<TemplateForPrescriptionVO>(GenericSP.GetTemplatesForUsers, Param, commandType: CommandType.StoredProcedure).ToList();

                foreach (var item in List)
                {
                    var Param1 = new DynamicParameters();
                    Param1.Add("@ID", item.ID);
                    Param1.Add("@UserID", GenericSP.CurrentUser.UserID);
                    Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    item.FavDrugList = this.con.Query<DrugVO>(GenericSP.GetFavDrugsByTempID, Param1, commandType: CommandType.StoredProcedure).ToList();
                }               
            }
            catch (Exception E)
            {
                List = null;

            }
            return List;
        }
        public DrugVO GetDrugDetailByItemID(long ID, long UnitID)
        {
            DrugVO Obj = new DrugVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);

                Obj = this.con.Query<DrugVO>(GenericSP.GetDrugDetailsByID, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception E)
            {
                Obj = null;

            }
            return Obj;
        }
        public PrescriptionVO GetTodaysPrescriptionDetails()
        {
            PrescriptionVO Obj = new PrescriptionVO();
            Obj.DrugList = new List<DrugVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                //Param.Add("@PrescriptionFollowUpDate",PrescriptionVO.PrescriptionFollowUpDate);

                var QueryMultiple = this.con.QueryMultiple(GenericSP.GetTodaysPrescriptionDetails, Param, commandType: CommandType.StoredProcedure);              
                    Obj = QueryMultiple.Read<PrescriptionVO>().Single();             
                    Obj.DrugList = QueryMultiple.Read<DrugVO>().ToList();
            }
            catch (Exception E)
            {
                Obj = null;

            }
            return Obj;
        }
        public List<DrugVO> GetPreviousPrescriptionDetails()
        {
            List<DrugVO> List = new List<DrugVO>();           
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);

                List = this.con.Query<DrugVO>(GenericSP.GetPreviousPrescriptionDetails, Param, commandType: CommandType.StoredProcedure).ToList();
                return List;
            }
            catch (Exception E)
            {
                List = null;

            }
            return List;
        }
        public long SavePrescription(PrescriptionVO PrescriptionVO)
        {
            using (var transactionScope = new TransactionScope())
            {
                long ID = 0;
                try
                {
                    var Param = new DynamicParameters();
                    Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                    Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                    Param.Add("@DoctorID", PrescriptionVO.AddedBy);
                    Param.Add("@IsOPDIPD", 0);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.UserName);
                    Param.Add("@AddedWindowsLoginName", Environment.MachineName);
                    //Param.Add("@PrescriptionFollowUpDate", Convert.ToDateTime(PrescriptionVO.PrescriptionFollowUpDate));  //commentedd sujata
                    Param.Add("@PrescriptionID", PrescriptionVO.ID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                    
                    if (PrescriptionVO.PrescriptionFollowUpDate != null)
                    {
                        Param.Add("@PrescriptionFollowUpDate", Convert.ToDateTime(PrescriptionVO.PrescriptionFollowUpDate));
                    }
                    else
                    {
                        Param.Add("@PrescriptionFollowUpDate", PrescriptionVO.PrescriptionFollowUpDate);
                    }

                    con.Query(GenericSP.DeletePatientPrescriptionDetails, Param, commandType: CommandType.StoredProcedure);
                    ID = Param.Get<Int64>("@PrescriptionID");

                    if (ID > 0)
                    {
                        foreach (var item in PrescriptionVO.DrugList)
                        {
                            var Param1 = new DynamicParameters();
                            Param1.Add("@PrescriptionID", ID);
                            Param1.Add("@DrugID", item.DrugID);
                            Param1.Add("@Dose", item.Dose);
                            Param1.Add("@RouteID", item.RouteID);
                            Param1.Add("@FrequencyID", item.FrequencyID);
                            Param1.Add("@Quantity", item.Quantity);
                            Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                            Param1.Add("@ItemName", item.ItemName);
                            Param1.Add("@IsOther", item.IsOther);
                            Param1.Add("@Reason", item.Reason);
                            Param1.Add("@InstructionID", item.InstructionID);
                            Param1.Add("@Warning", item.Warning);
                            Param1.Add("@Notes", item.Notes);
                            Param1.Add("@AddedByName", item.AddedByName);
                            Param1.Add("@Days", item.Days);
                            Param1.Add("@UOM", item.UOM);                          
                            Param1.Add("@UOMID", item.UOMID);
                            Param1.Add("@ARTEnables", 0); //temp
                            Param1.Add("@DrugSourceId", item.DrugSourceId);
                            if (GenericSP.SelectedCouple.FemalePatient != null)
                            {
                                Param1.Add("@PlanTherapyId", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                                Param1.Add("@PlanTherapyUnitId", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                            }
                            else
                            {
                                Param1.Add("@PlanTherapyId", 0);
                                Param1.Add("@PlanTherapyUnitId", 0);
                            }
                                               
                            Param1.Add("@ID", item.ID);
                            Param1.Add("@MoleculeID", item.MoleculeID);
                            Param1.Add("@MoleculeName", item.MoleculeName);
                            Param1.Add("@IsMolecule", item.IsMolecule);
                            Param1.Add("@Strength", item.Strength);
                            // Param1.Add("@Status", item.Status); issue 7136 add privious to today prescription not show
                            Param1.Add("@Status", item.Status); //Param1.Add("@Status", 1);
                            Param1.Add("@Comment", item.Comment);
                            con.Query(GenericSP.AddPatientPrescriptionDetail, Param1, commandType: CommandType.StoredProcedure);
                            //ID = Param1.Get<Int64>("@ID");
                        }
                    }
                    transactionScope.Complete();
                }
                catch (Exception e)
                {
                    ID = 0;
                }
                return ID;                
            }

        }
        public List<CommanEntity> GetTemplateList()
        {
            List<CommanEntity> _List = new List<CommanEntity>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UserID", GenericSP.CurrentUser.UserID);
                
                _List = this.con.Query<CommanEntity>(GenericSP.GetTemplateForDropDown, Param, commandType: CommandType.StoredProcedure).ToList();
                return _List;
            }
            catch (Exception E)
            {
                _List = null;

            }
            return _List;
        }
        public List<FrequencyVO> FillFrequency()
        {
            List<FrequencyVO> _List = new List<FrequencyVO>();
            try
            {
                var Param = new DynamicParameters();
                _List = this.con.Query<FrequencyVO>(GenericSP.FillFrequency, Param, commandType: CommandType.StoredProcedure).ToList();
                return _List;
            }
            catch (Exception E)
            {
                _List = null;

            }
            return _List;
        }        
        public int SaveFavDrug(PrescriptionVO PrescriptionVO)
        {
            long tmpTemplateID = PrescriptionVO.TemplateID;
            int ID = 0;
            try
            { 
            foreach (var item in PrescriptionVO.FavDrugList)
            {
                    if (ID != 3)
                    {
                        var Param1 = new DynamicParameters();
                        Param1.Add("@DrugID", item.DrugID);
                        Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        Param1.Add("@UserID", GenericSP.CurrentUser.UserID);
                        Param1.Add("@TemplateID", PrescriptionVO.TemplateID > 0 ? PrescriptionVO.TemplateID : tmpTemplateID);
                        Param1.Add("@MoleculeID", item.MoleculeID);
                        Param1.Add("@DrougName", item.ItemName);
                        Param1.Add("@TemplateName", PrescriptionVO.TemplateName);
                        Param1.Add("@UOMID", item.UOMID);
                        Param1.Add("@UOM", item.UOM);
                        Param1.Add("@RouteID", item.RouteID);
                        Param1.Add("@FrequencyID", item.FrequencyID);
                        Param1.Add("@InstructionID", item.InstructionID);
                        Param1.Add("@Days", item.Days);
                        Param1.Add("@Quantity", item.Quantity);
                        Param1.Add("@Warning", item.Warning);
                        Param1.Add("@Strength", item.Strength);
                        Param1.Add("@AddedByName", GenericSP.CurrentUser.UserName);
                        Param1.Add("@ResultStatus", item.ResultStatus, dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                        Param1.Add("@tmpTemplateID", item.ResultStatus, dbType: DbType.Int64, direction: ParameterDirection.Output, size: 300);
                        con.Query(GenericSP.SetFavDrugsToUser, Param1, commandType: CommandType.StoredProcedure);
                        ID = Param1.Get<Int16>("@ResultStatus");
                        if(tmpTemplateID==0)
                        tmpTemplateID = Param1.Get<long>("@tmpTemplateID");
                    }
                    else break;
                }
            }
            catch (Exception e)
            {
                ID = 0;
            }
            return ID;
        }
        public int DeleteFavDrug(DrugVO DrugVO)
        {
            int ID = 0;
            try
            {                
                var Param1 = new DynamicParameters();
                Param1.Add("@ID", DrugVO.ID);                 
                Param1.Add("@UnitID", DrugVO.UnitID);
                Param1.Add("@Comment", DrugVO.Comment);
                Param1.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);

                con.Query(GenericSP.DeleteFavDrugs, Param1, commandType: CommandType.StoredProcedure);
                ID = Param1.Get<Int16>("@ResultStatus");               
            }
            catch (Exception e)
            {
                ID = 0;
            }
            return ID;
        }
        public long CheckMoleculeIsAllergies(long ID)
        {
            long Obj = 1;
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
                Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                
                Obj = this.con.Query<long>(GenericSP.CheckMoleculeIsAllergies, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception E)
            {
                Obj = 1;
            }
            return Obj;
        }
        public string getAllergyMolecules()
        {
                var Param1 = new DynamicParameters();
                Param1.Add("@Action", "getAllergyMolecules");
                Param1.Add("@ID", GenericSP.SelectedPatient.ID);
                Param1.Add("@UnitID", GenericSP.SelectedPatient.UnitID);
                return con.Query<string>(GenericSP.GetList, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
    }
}
