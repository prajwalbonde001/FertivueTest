using PIVF.BusinessLayer.LinkPartner;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.LinkPartner;
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

namespace PIVF.DataAccessLayer.LinkPartner
{
  public  class LinkPartnerDAL : LinkPartnerBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public LinkPartnerDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int linkPartner(LinkPartnerVO linkPartnerObj)
        {
            var Param = new DynamicParameters();
            int Status = 0;
            //Param.Add("@UnitId", linkPartnerObj.UnitId); //Commented and Modified by AniketK on 17Feb2020
            Param.Add("@UnitId", GenericSP.CurrentUser.UnitID);

            //Begin::Added by AniketK on 13Jan2020
            if (linkPartnerObj.IsFemale == 1)
            {
                Param.Add("@MalePatientUnitId", linkPartnerObj.MalePatientUnitId);
                Param.Add("@FemalePatientUnitId", linkPartnerObj.UnitId);
            }

            else if (linkPartnerObj.IsFemale == 0)
            {
                Param.Add("@FemalePatientUnitId", linkPartnerObj.FemalePatientUnitId);
                Param.Add("@MalePatientUnitId", linkPartnerObj.UnitId);
            }
            //End::Added by AniketK on 13Jan2020

            Param.Add("@PatientCategeroy", linkPartnerObj.PatientCategory);
            Param.Add("@MaleId", linkPartnerObj.MaleId);
            Param.Add("@FemaleId", linkPartnerObj.FemaleId);
            Param.Add("@IsFemale", linkPartnerObj.IsFemale);
            Param.Add("@VisitId", linkPartnerObj.VisitId);
            Param.Add("@Action", "Partner");
            Param.Add("@VisitStatusID", linkPartnerObj.VisitStatus);
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            try
            {
                con.Query(GenericSP.LinkPartner, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return Status = Param.Get<Int32>("@Result");
            }
            catch(Exception ex)
            {
                return Status;
            }

           

            
        }
        public int linkDonor(int patientId,int UnitId,int GenderId, string Action)   //Added by Nayan Kamble
        {
            var Param = new DynamicParameters();
            int Status = 0;
            Param.Add("@UnitId", UnitId);
            Param.Add("@patientId", patientId);
            Param.Add("@GenderId", GenderId);
            Param.Add("@Action", Action);  // "Donor"   //Added by Nayan Kamble
            Param.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            try
            {
                con.Query(GenericSP.LinkPartner, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return Status = Param.Get<Int32>("@Result");
            }
            catch (Exception ex)
            {
                return Status;
            }




        }
    }
}
