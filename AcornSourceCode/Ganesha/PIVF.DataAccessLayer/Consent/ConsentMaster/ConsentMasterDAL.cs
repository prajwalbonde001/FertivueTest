using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.Consent.ConsentMaster;
using PIVF.Entities.Models.Consent.ConsentMaster;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace PIVF.DataAccessLayer.Consent.ConsentMaster
{
    public class ConsentMasterDAL: ConsentMasterBL
    {
        private Database dbServer = null;
        IDbConnection con;
        public ConsentMasterDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int SaveConsent(ConsentMasterVO _objConsentMasterVO)
        {
            int ResultStatus = 0;
            int ResultStatus1 = 0;
            int ResultStatus2 = 0;

            long ID;
            try
            {
                using (var TransactionScope = new TransactionScope())
                {
                    var Param = new DynamicParameters();
                    Param.Add("@Action", "SaveUpdateConsent");
                    if (_objConsentMasterVO.ID > 0)
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
                    Param.Add("@Code", _objConsentMasterVO.Code);
                    Param.Add("@Description", _objConsentMasterVO.Description);
                    Param.Add("@FormDesc", _objConsentMasterVO.FormDesc);
                    Param.Add("@HTMLDesc", _objConsentMasterVO.HTMLDesc);
                    Param.Add("@ModelDesc", _objConsentMasterVO.ModelDesc);
                    Param.Add("@SchemaDesc", _objConsentMasterVO.SchemaDesc);
                    Param.Add("@Status", _objConsentMasterVO.Status);
                    Param.Add("@Reason", _objConsentMasterVO.Reason);
                    Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                    Param.Add("@ID", _objConsentMasterVO.ID, dbType: DbType.Int64, direction: ParameterDirection.InputOutput, size: 300);
                    con.Query(GenericSP.AddConsentDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    ResultStatus1 = Param.Get<Int16>("@ResultStatus");
                    ID = Param.Get<long>("@ID");
                    if (ID>0 )
                    {
                        foreach (var item in _objConsentMasterVO.LinkDetails)
                        {
                            var Param1 = new DynamicParameters();
                            Param1.Add("@ConsentID", ID);
                            Param1.Add("@PatientCategoryID", item.PatientCategoryID);
                            Param1.Add("@ARTTypeID", item.ARTTypeID);
                            Param1.Add("@ARTSubTypeID", item.ARTSubTypeID);
                            Param1.Add("@Reason", item.Reason);                           
                            Param1.Add("@Status", item.Status);                        
                            Param1.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                            Param1.Add("@ID", item.ID, dbType: DbType.Int16, direction: ParameterDirection.InputOutput, size: 300);                           
                            con.Query(GenericSP.AddConsentLinkDetails, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                            ResultStatus2 = Param.Get<Int16>("@ResultStatus");
                        }
                    }                
                  TransactionScope.Complete();
                }
            }
            catch (Exception E)
            {
                ResultStatus = 0;
            }
            if (ResultStatus1 > 0 && ResultStatus2 > 0)
                ResultStatus = 1;
            else if (ResultStatus1 ==3 && ResultStatus2 == 0)
                ResultStatus = 3;
            return ResultStatus;
        }
        public List<ConsentMasterVO> GetConsentList(long ARTTypeID, long ARTSubTypeID, int CurrentPage,string Code)
        {
            List <ConsentMasterVO > _list= new List<ConsentMasterVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@ARTTypeID", ARTTypeID);
                Param.Add("@ARTSubTypeID", ARTSubTypeID);
                Param.Add("@Code", Code);                
                Param.Add("@PageIndex", CurrentPage);                          
                Param.Add("@TotalRows", dbType: DbType.Int64, direction: ParameterDirection.Output, size: 300);
                _list = con.Query<ConsentMasterVO>(GenericSP.GetConsentMasterList, Param, commandType: CommandType.StoredProcedure).ToList();
                if (_list.Count > 0)
                {
                    _list[0].TotalRows = Param.Get<long>("@TotalRows");
                }
                foreach (var item in _list)
                {
                    item.LinkDetails = new List<ConsentLinkDetailsVO>();
                    var Param1 = new DynamicParameters();
                    Param1.Add("@ConsentID", item.ID); 
                    item.LinkDetails = con.Query<ConsentLinkDetailsVO>(GenericSP.GetConsentLinkList, Param1, commandType: CommandType.StoredProcedure).ToList();                  
                }
            }
            catch (Exception e)
            {
                _list = null;
            }
            return _list;
        }
        public ConsentMasterVO GetConsentByID(long ID)
        {
            ConsentMasterVO Obj = new ConsentMasterVO();
            try
            {                               
                var Param = new DynamicParameters();
                Param.Add("@ID", ID);
                var Multiquery = con.QueryMultiple(GenericSP.GetConsentByID, Param, commandType: CommandType.StoredProcedure);
                Obj = Multiquery.Read<ConsentMasterVO>().Single();
                Obj.LinkDetails = Multiquery.Read<ConsentLinkDetailsVO>().ToList();

            }
            catch(Exception e)
            {
                Obj = new ConsentMasterVO();
            }
          
            return Obj;
        }
        public int ActivateDeactivateConsent(int ID, string reason)
        {
            int status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "UpdateStatus");
            Param.Add("@ID", ID);
            Param.Add("@Reason", reason);
            Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
            con.Query(GenericSP.AddConsentDetails, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            status = Param.Get<Int16>("@ResultStatus");
            return status;
        }
    }
}
