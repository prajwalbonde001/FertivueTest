using PIVF.BusinessLayer.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR.MaleHistory;
using PIVF.Entities.Models.Master.IVF;
using Dapper;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using DataBaseConfiguration;

namespace PIVF.DataAccessLayer.EMR.MaleHistory
{
    public class SurgicalSpermRetrievalServiceDAL : SurgicalSpermRetrievalServiceBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public SurgicalSpermRetrievalServiceDAL()
        {

            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<CommanEntity> GetSurgeonList()
        {
            var Param = new DynamicParameters();
            //Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            return this.con.Query<CommanEntity>(GenericSP.GetSurgeonList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<CommanEntity> GetAnesthetist()
        {
            var Param = new DynamicParameters();
            //Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            return this.con.Query<CommanEntity>(GenericSP.GetAnesthetistList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
        public int InsertSurgicalSpermRetrival(PIVF.Entities.Models.EMR.MaleHistory.SurgicalSpermRetrival obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@SNo", obj.SNo);
            Param.Add("@UnitID", obj.UnitID == null ? 0 : Convert.ToInt32(obj.UnitID));
            Param.Add("@SSRDate", Convert.ToDateTime(obj.SSRDate));
            Param.Add("@SSRTime", Convert.ToDateTime(obj.SSRTime));
            Param.Add("@IndicationID", obj.IndicationID == null ? 0 : Convert.ToInt32(obj.IndicationID));
            Param.Add("@IndicationObstructiveID", obj.IndicationObstructiveID == null ? 0 : Convert.ToInt32(obj.IndicationObstructiveID));
            Param.Add("@SpecimenTypeID", obj.SpecimenTypeID == null ? 0 : Convert.ToInt32(obj.SpecimenTypeID));
            Param.Add("@MofSSR", obj.MethodOfSurgicalSpermRetrivalID == null ? 0 : Convert.ToInt32(obj.MethodOfSurgicalSpermRetrivalID));
            Param.Add("@SurgonID", obj.SurgonID == null ? 0 : Convert.ToInt32(obj.SurgonID));
            Param.Add("@AnesthetistID", obj.AnesthetistID == null ? 0 : Convert.ToInt32(obj.AnesthetistID));
            Param.Add("@AnesthesiaID", obj.AnesthesiaID == null ? 0 : Convert.ToInt32(obj.AnesthesiaID));
            Param.Add("@EmbroylogistID", obj.EmbroylogistID == null ? 0 : Convert.ToInt32(obj.EmbroylogistID));
            Param.Add("@WitnessEmbroylogistID", obj.WitnessEmbroylogistID == null ? 0 : Convert.ToInt32(obj.WitnessEmbroylogistID));
            Param.Add("@SiteID", obj.SiteID == null ? 0 : Convert.ToInt32(obj.SiteID));

            Param.Add("@RightSpermCount", obj.RightSpermCount);
            Param.Add("@RightMotility", obj.RightMotility);
            Param.Add("@RightRemark", obj.RightRemark);
            Param.Add("@LeftSpermCount", obj.LeftSpermCount);
            Param.Add("@LeftMotility", obj.LeftMotility);
            Param.Add("@LeftRemark", obj.LeftRemark);
            if (obj.ComplicationIDs != "")
            {
                Param.Add("@ComplicationIDs", obj.ComplicationIDs = string.Join(",", obj.ComplicationSelected.Select(a => a.id)));
            }
            else
            {
                Param.Add("@ComplicationIDs", obj.ComplicationIDs);
            }
            Param.Add("@ComplicationRemark", obj.ComplicationRemark);
            Param.Add("@IsFinalize", obj.IsFinalize);
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@UserID", GenericSP.CurrentUser.UserID);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);

            /* Insert female history record*/
            try
            {
                con.Execute(GenericSP.InsertSurgicalSpermRetrival, Param, commandType: CommandType.StoredProcedure);
                string ResultStatus = Param.Get<string>("@ResultStatus");
                //After successfull insertion insert images
                if (obj.SSRImages != null)
                {
                    for (int Index = 0; Index < obj.SSRImages.Count; Index++)
                    {
                        //Insert images in database
                        var ParImg = new DynamicParameters();
                        ParImg.Add("@SPRID", Convert.ToInt32(ResultStatus));
                        ParImg.Add("@name", obj.SSRImages[Index].name);
                        ParImg.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.SSRImages[Index].preview));
                        con.Execute(GenericSP.InsertSurgicalSpermRetrivalImages, ParImg, commandType: CommandType.StoredProcedure);
                    }
                }
                return Convert.ToInt32(ResultStatus);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<SurgicalSpermRetrival> GetSurgicalSpermRetrivalByPatientID()
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@SNo", null);
            return this.con.Query<SurgicalSpermRetrival>(GenericSP.GetSurgicalSpermRetrivalByPatientID, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<model> GetSSRImagesBySNo( string SNo)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@SNo", SNo);
            return this.con.Query<model>(GenericSP.GetSSRImagesBySNo, Param, commandType: CommandType.StoredProcedure).AsList();
        }


    }
}
