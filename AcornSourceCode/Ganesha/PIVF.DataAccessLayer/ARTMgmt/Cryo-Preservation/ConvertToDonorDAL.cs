using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification;
using Dapper;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using DataBaseConfiguration;
using PIVF.Entities.Models.Master.Configuration;

namespace PIVF.DataAccessLayer.ARTMgmt.Cryo_Preservation
{
    public class ConvertToDonorDAL : IConvertToDonorBAL
    {
        private Database dbServer = null;
        IDbConnection Con;
        //Main EmbroGrid start 
        public ConvertToDonorDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            Con = dbServer.CreateConnection();
        }
        public IEnumerable<PatientListVo> GetPatientList(int PageIndex, string NameCodeMRNo)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PageIndex", PageIndex, DbType.Int32);
                Param.Add("@NameCodeMRNo", NameCodeMRNo, DbType.String);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int32);
                return this.Con.Query<PatientListVo>(GenericSP.GetPatientListForDonor, Param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public long ConvertToDonorPatient(long PatientID, int GenderID)
        {
            try
            {
                var Param = new DynamicParameters();
                Param.Add("@PatientID", PatientID, DbType.Int64);
                Param.Add("@GenderID", GenderID, DbType.Int32);
                Param.Add("@UnitID", GenericSP.CurrentUser.UnitID, DbType.Int32);
                return this.Con.Query<long>(GenericSP.convertDonor, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}
