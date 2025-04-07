using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.ARTMgmt.MediaConsumption;
using PIVF.Entities.Models.ARTMgmt.MediaConsumption;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.ARTMgmt.MediaConsumption
{
    public class MediaConsumptionDAL: MediaConsumptionBAL
    {
        private Database dbServer=null;
        IDbConnection Con;
        public MediaConsumptionDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        public List<MediaItemVO> GetItemsByClinic(long? UnitID)
        {
            List<MediaItemVO> list = new List<MediaItemVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@UnitID", UnitID);
                list = this.Con.Query<MediaItemVO>(GenericSP.GetItemsForMedia, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch(Exception E)
            {

            }
            return list;
        }
        public List<MediaConsumptionVO> GetMediaList(string Search)
        {
            List<MediaConsumptionVO> list = new List<MediaConsumptionVO>();
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@Search", Search);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                list = this.Con.Query<MediaConsumptionVO>(GenericSP.GetMediaList, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception e)
            {

            }
            return list;
        }
        
        public int SaveMedia(List<MediaConsumptionVO> ListMedia)
        {
            int ResultStatus = 0;
            try
            {
                foreach (var item in ListMedia)
                {
                    var Param = new DynamicParameters();                    
                    Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                    Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@AddedOn", Environment.MachineName);
                    Param.Add("@AddedWindowsLoginName", Environment.UserName);                   
                    Param.Add("@ID", item.ID);
                    Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);                    
                    Param.Add("@FemalePatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
                    Param.Add("@FemalePatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                    Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
                    Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
                    Param.Add("@ItemID", item.ItemID);
                    Param.Add("@BatchID", item.BatchID);
                    Param.Add("@BatchName", item.BatchName);
                    Param.Add("@UOMID", item.UOMID);
                    Param.Add("@ExpiryDate", item.ExpiryDate);
                    Param.Add("@UsedQty", item.UsedQty);
                    Param.Add("@ProcedureID", item.ProcedureID);
                    Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                    this.Con.Query<MediaItemVO>(GenericSP.AddMediaDetails, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus = Param.Get<Int16>("@ResultStatus");
                }

            }
            catch (Exception e)
            {
                ResultStatus = 0;
            }
            return ResultStatus;
        }


        public int SaveFinalizedMedia(List<MediaConsumptionVO> ListMedia)
        {
            int ResultStatus = 0;
            try
            {
                foreach (var item in ListMedia)
                {
                    var Param = new DynamicParameters();                  
                    Param.Add("@ID", item.ID);
                    Param.Add("@UnitID", item.UnitID);
                    Param.Add("@Finalized", item.Finalized);
                    Param.Add("@Reason", item.Reason);
                    Param.Add("@Status", item.Status);
                    Param.Add("@ResultStatus", dbType: DbType.Int16, direction: ParameterDirection.Output, size: 300);
                    Param.Add("@UpdatedUnitId", GenericSP.CurrentUser.UnitID);
                    Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
                    Param.Add("@UpdatedOn", Environment.MachineName);
                    Param.Add("@UpdatedWindowsLoginName", Environment.UserName);                

                    this.Con.Query<MediaItemVO>(GenericSP.UpdateMediaDetails, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus =Param.Get<Int16> ("@ResultStatus");
                }

            }
            catch (Exception e)
            {
                ResultStatus = 0;
            }
            return ResultStatus;
        }
    }
}
