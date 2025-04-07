using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.Consent.ConsentAction;
using PIVF.Entities.Models.Consent.ConsentAction;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Threading.Tasks;
using PIVF.BusinessLayer.ARTMgmt.ReportUpload;

namespace PIVF.DataAccessLayer.Consent.ConsentAction
{
    public class ConsentActionDAL: ConsentActionBL
    {
        private Database dbServer = null;
        IDbConnection con;

        public ConsentActionDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<CommanEntity> GetConsentList(long ARTTypeID, long ARTSubTypeID)
        {
            List<CommanEntity> _list = new List<CommanEntity>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ARTTypeID", ARTTypeID);
                Param.Add("@ARTSubTypeID", ARTSubTypeID);
                Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                Param.Add("@PatientCategoryID", GenericSP.SelectedCouple.FemalePatient.PatientCategoryID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);                
                _list = con.Query<CommanEntity>(GenericSP.GetConsentList, Param, commandType: CommandType.StoredProcedure).ToList();               
            }
            catch (Exception e)
            {
                _list = null;
            }
            return _list;
        }
        public ConsentDetailsVO GetConsentDetails(long UnitID, long ID, long ConsentID)
        {
            ConsentDetailsVO  _Obj = new ConsentDetailsVO();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                Param.Add("@UnitID", UnitID);
                Param.Add("@ConsentID", ConsentID);
                _Obj = con.Query<ConsentDetailsVO>(GenericSP.GetConsentDetailsByID, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception e)
            {
                _Obj = null;
            }
            return _Obj;
        }
        public int SaveConsent(ConsentDetailsVO _objConsentDetailsVO)
        {
            int ResultStatus = 0;      
            long ID;
            try
            {
                //using (var TransactionScope = new TransactionScope())
                //{
                    var Param = new DynamicParameters();
                    if (_objConsentDetailsVO.ID > 0)
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
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@SelectedUnitID", _objConsentDetailsVO.SelectedUnitID);
                    Param.Add("@ConsentID", _objConsentDetailsVO.ConsentID);
                    Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    Param.Add("@FormDesc", _objConsentDetailsVO.FormDesc);
                    Param.Add("@HTMLDesc", _objConsentDetailsVO.HTMLDesc);
                    Param.Add("@ModelDesc", _objConsentDetailsVO.ModelDesc);
                    Param.Add("@SchemaDesc", _objConsentDetailsVO.SchemaDesc);
                    //Param.Add("@IsFileUploaded", _objConsentDetailsVO.IsFileUploaded);
                    Param.Add("@Status", _objConsentDetailsVO.Status);                   
                    Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                    Param.Add("@ID", _objConsentDetailsVO.ID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                    con.Query(GenericSP.AddConsentActionDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    ResultStatus = Param.Get<Int16>("@ResultStatus");
                    ID = Param.Get<long>("@ID");
                   
                    //TransactionScope.Complete();
                //}
            }
            catch (Exception E)
            {
                ResultStatus = 0;
            }
           
            return ResultStatus;
        }

        public List<ConsentDetailsVO> GetConsenGrid()
        {
            List<ConsentDetailsVO> _List = new List<ConsentDetailsVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                _List = con.Query<ConsentDetailsVO>(GenericSP.GetConsentGrid, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {
                _List = null;
            }
            return _List;
        }
        public int SaveUpdateFile(List<ConsentDetailsVO> _objConsentDetailsVO)
        {
            int ResultStatus = 0;
            try
            {
                foreach (var item in _objConsentDetailsVO)
                {
                    if(item.IsFileUploaded ==true)
                    {
                        var Param = new DynamicParameters();
                        Param.Add("@ID", item.ID);
                        Param.Add("@UnitID", item.UnitID);
                        Param.Add("@IsFileUploaded", item.IsFileUploaded);
                        Param.Add("@FileName", item.FileName);
                        if (!string.IsNullOrEmpty(Convert.ToString(item.FileStr)))
                        {
                            item.File = System.Text.Encoding.UTF8.GetBytes(item.FileStr);
                            Param.Add("@File", item.File);
                        }
                        Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                        Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                        Param.Add("@UpdatedOn", Environment.MachineName);
                        Param.Add("@UpdatedWindowsLoginName", Environment.UserName);

                        Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                        con.Query(GenericSP.UpdateConsentFileDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        ResultStatus = Param.Get<Int16>("@ResultStatus");
                    }
                }                
            }
            catch(Exception e)  {

            }
            return ResultStatus;
        }
        public tmpReport ViewReport(long ID, long UnitID)
        {
            string Report = "";
            tmpReport tmpobj = new tmpReport();
            var Param = new DynamicParameters();
            Param.Add("@ID", ID);
            Param.Add("@UnitID", UnitID);
            tmpobj = this.con.Query<tmpReport>(GenericSP.ViewConsentReport, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            if (!string.IsNullOrEmpty(Convert.ToString(tmpobj.Report)))
            {
                tmpobj.strReport = System.Text.Encoding.UTF8.GetString(tmpobj.Report);
            }
            return tmpobj;
        }
    }
}
