using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.QueueMgt;
using PIVF.Entities.Models.QueueMgt;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PIVF.DataAccessLayer.QueueMgt
{
    public class QueueMgtDAL: QueueMgtBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public QueueMgtDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }

        public List<QueueVO> GetQueueList(string[] Que )
        {
            var Param = new DynamicParameters();
            Param.Add("@IdColumnName", "ID");
            Param.Add("@DoctorID", 0);
            Param.Add("@PagingEnabled", 1);
            Param.Add("@startRowIndex", Que[0]);
            Param.Add("@CurrentVisitStatus", 0);
            Param.Add("@DepartmentID", Convert.ToInt32(Que[1]));
            Param.Add("@DoctorID", Convert.ToInt32(Que[2]));
            Param.Add("@SpecialRegID", Convert.ToInt32(Que[3]));
            Param.Add("@CurrentVisitStatus", Convert.ToInt32(Que[4]));
            Param.Add("@FirstName", Convert.ToString(Que[5])==""?null: Convert.ToString(Que[5]));
            Param.Add("@MRNo", Convert.ToString(Que[6]));
            Param.Add("@ContactNo1", Convert.ToString(Que[7]));
            Param.Add("@TokanNo", Convert.ToString(Que[8]));
            Param.Add("@OPDNo", Convert.ToString(Que[9]));
            Param.Add("@Date", Que[10]);
            Param.Add("@FromDate", Que[11]);
            Param.Add("@ToDate", Que[12]);
            Param.Add("@VisitTypeID", Que[13]);//added by Divya For Dashboard on 13 april 2020
           //   Param.Add("@PagingEnabled", Que[13]);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@TotalRows", dbType: DbType.Int32, direction: ParameterDirection.Output);
            List<QueueVO> lstQueue = new List<QueueVO>();
                lstQueue = this.con.Query<QueueVO>(GenericSP.QueueList, Param, commandType: CommandType.StoredProcedure).AsList();
            string value = ConfigurationManager.AppSettings["MarkSurrogate"].ToString();
            if (lstQueue != null && lstQueue.Count > 0)
            {
                foreach (QueueVO item in lstQueue)
                {
                    // item.LoginName = Security.DecryptString(item.LoginName);
                    if (!string.IsNullOrEmpty(Convert.ToString(item.Photo)))
                    {
                        item.PhotoString = System.Text.Encoding.UTF8.GetString(item.Photo);
                    }
                }
                lstQueue[0].TotalCount = Param.Get <Int32> ("@TotalRows");
                lstQueue[0].IsMarkSurrogate = value;
            }

            return lstQueue;
        }

        public int CloseVisit(int VID, int unitID)
        {
            int Status = 0;
            var Param = new DynamicParameters();
         //   Param.Add("@Action", "CloseVisit");
            //Param.Add("@CurrVisitStatus", 4);
            Param.Add("@VID", VID);
            Param.Add("@VisUnitID", unitID);
            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.CloseVisit, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Status = Param.Get<Int32>("@ResultStatus");
        }
        public  int SaveVisitRemark(string remark,int VisitID,int UnitID)
        {

            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Remark", remark);
            Param.Add("@VisitID", VisitID);
            Param.Add("@UnitID", UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.SaveVisitRemarkfromQueue, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            Status= Param.Get<Int32>("@ResultStatus");
            return Status;




        }
    }
}
