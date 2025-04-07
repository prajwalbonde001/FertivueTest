using PIVF.BusinessLayer.KPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.KPI;
using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;

namespace PIVF.DataAccessLayer.KPI
{
    public class ManagementDAL : ManagementBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        public ManagementDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<CumulativeCases> cumulativeCases(string FromDate, string ToDate)
        {
           
            List<CumulativeCases> ManagementData1 = new List<CumulativeCases>();

            var Param = new DynamicParameters();
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);


            ManagementData1 = this.con.Query<CumulativeCases>(GenericSP.ManagementCumulativeCases, Param, commandType: CommandType.StoredProcedure).ToList();

            return ManagementData1;
        }

        public ManagementData ClinicWise(string FromDate, string ToDate,int UnitID)
        {

            ManagementData ManagementData = new ManagementData();
         


            var Param = new DynamicParameters();
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);
            Param.Add("@UnitID", UnitID);


            var Query = this.con.QueryMultiple(GenericSP.ManagementClinicWise, Param, commandType: CommandType.StoredProcedure);
            ManagementData.SuccessRate = Query.Read<SuccessRate>().SingleOrDefault();
            ManagementData.ClinicWiseRate = Query.Read<ClinicWiseRate>().SingleOrDefault();
            return ManagementData;
        }

        public List<OverallSuccessRate> OverallSuccessRate(string FromDate, string ToDate)
        {

            List<OverallSuccessRate> ManagementData1 = new List<OverallSuccessRate>();

            var Param = new DynamicParameters();
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);


            ManagementData1 = this.con.Query<OverallSuccessRate>(GenericSP.ManagementOverallSuccessRate, Param, commandType: CommandType.StoredProcedure).ToList();

            return ManagementData1;
        }

        public DoctorWiseComparasion DoctorWise(string FromDate, string ToDate)
        {

            DoctorWiseComparasion DoctorWiseComparasion = new DoctorWiseComparasion();

            var Param = new DynamicParameters();
            Param.Add("@FromDate", FromDate);
            Param.Add("@ToDate", ToDate);


            var Query = this.con.QueryMultiple(GenericSP.ManagementDoctorWiseComparison, Param, commandType: CommandType.StoredProcedure);
            DoctorWiseComparasion.DoctorWise = Query.Read<DoctorWise>().AsList();
            DoctorWiseComparasion.DoctorDetails = Query.Read<DoctorDetails>().AsList();
         //   ManagementData1 = this.con.Query<DoctorWise>(GenericSP.ManagementDoctorWiseComparison, Param, commandType: CommandType.StoredProcedure).ToList();

            return DoctorWiseComparasion;
        }

        public int ManagementCumulativeCasePDF(List<CumulativeCases> Obj)
        {

           for(int i = 0; i < Obj.Count; i++)
            {
                var Param = new DynamicParameters();
                Param.Add("@Fresh", Obj[i].Fresh);
                Param.Add("@Frozen", Obj[i].Frozen);
                Param.Add("@Total", (Obj[i].Frozen+ Obj[i].Fresh));
                Param.Add("@ReportType", 1);
                Param.Add("@UnitID", Obj[i].UnitID);
                Param.Add("@Action", "Save");
                Param.Add("@I", i);

                con.Execute(GenericSP.ManagementCumulativeCasePDF, Param, commandType: CommandType.StoredProcedure);


            }




            return 1;
        }
        public int ManagementPDFImage(ImageObj Obj,int ReportType)
        {

            var Param = new DynamicParameters();
            byte[] aa = System.Convert.FromBase64String(Obj.Image);
            Param.Add("@Image", aa);
            Param.Add("@ReportType", ReportType);
            Param.Add("@Action", "Save");

            con.Execute(GenericSP.ManagementImageData, Param, commandType: CommandType.StoredProcedure);






            return 1;
        }
        public int ManagementPDFClinicWise(ManagementData Obj)
        {

            var Param = new DynamicParameters();
          
            Param.Add("@ImplantationRateFresh", Obj.ClinicWiseRate.ImplantationRateFresh);
            Param.Add("@ImplantationRateFrozen", Obj.ClinicWiseRate.ImplantationRateFrozen);
            Param.Add("@PregnacyRateFresh", Obj.ClinicWiseRate.PregnacyRateFresh);
            Param.Add("@PregnacyRateFrozen", Obj.ClinicWiseRate.PregnacyRateFrozen);
            Param.Add("@TotalFresh", Obj.ClinicWiseRate.TotalFresh);
            Param.Add("@TotalFrozen", Obj.ClinicWiseRate.TotalFrozen);

            Param.Add("@CleavageRate", Obj.SuccessRate.CleavageRate);
            Param.Add("@DegenerationRate", Obj.SuccessRate.DegenerationRate);
            Param.Add("@FertilizationRate", Obj.SuccessRate.FertilizationRate);
            Param.Add("@GoodGradeRate", Obj.SuccessRate.GoodGradeRate);
            Param.Add("@OOCYTERETRIEVALRate", Obj.SuccessRate.OOCYTERETRIEVALRate);


            Param.Add("@Action", "Save");
            con.Execute(GenericSP.ManagementPDFClinicWise, Param, commandType: CommandType.StoredProcedure);
            return 1;
        }

        public int ManagementPDFDoctorWise(List<DoctorWise> Obj)
        {

     
            for(var i = 0; i < Obj.Count; i++)
            {
                var Param = new DynamicParameters();
                Param.Add("@Name", Obj[i].Name);
                Param.Add("@Total", Obj[i].Total);
                Param.Add("@UnitID", Obj[i].UnitID);
                Param.Add("@Action", "Save");
                Param.Add("@I", i);
                con.Execute(GenericSP.ManagementPDFDoctorWise, Param, commandType: CommandType.StoredProcedure);

            }
 
           
            return 2;
        }
    }
}
