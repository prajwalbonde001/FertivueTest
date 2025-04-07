using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Configuration;
using System.IO;
using System.Threading;
using System.Web;

namespace PIVF.Web.Reports.History.Femle_History
{
    public partial class FemaleHistoryWF : System.Web.UI.Page
    {
        ReportDocument myDoc;
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Session["CurrentUser"] != null)
                {
                    //Decode Url  by rohini
                    string str = Request.QueryString.ToString();
                    string s = System.Uri.UnescapeDataString(str);
                    string DecodedURL = HttpUtility.UrlDecode(s);
                    var DecodedQuery = HttpUtility.ParseQueryString(DecodedURL);

                    //
                    string connectionString = (string)ConfigurationManager.ConnectionStrings["PIVFContext"].ConnectionString;
                    string dbUserName = ConfigurationManager.AppSettings["DBUserName"].ToString();
                    String dbUserPassword = ConfigurationManager.AppSettings["DBPassword"].ToString();
                    String dbServer = ConfigurationManager.AppSettings["DBServer"].ToString();
                    String dbName = ConfigurationManager.AppSettings["DBName"].ToString();
                    myDoc = new ReportDocument();
                    myDoc.PrintOptions.PaperOrientation = PaperOrientation.Portrait;
                    myDoc.PrintOptions.PaperSize = PaperSize.PaperA4;
                    myDoc.Load(Server.MapPath("FemaleHistory.rpt"));
                    long UnitID = 0;
                    long VisitUnitID = 0;
                    long VisitID = 0;
                    long PatientID = 0;

                    if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                    {
                        UnitID = Convert.ToInt64(DecodedQuery["U"]);
                    }
                    if (DecodedQuery["VU"] != null && DecodedQuery["VU"] != "0")
                    {
                        VisitUnitID = Convert.ToInt64(DecodedQuery["VU"]);
                    }
                    if (DecodedQuery["V"] != null && DecodedQuery["V"] != "0")
                    {
                        VisitID = Convert.ToInt64(DecodedQuery["V"]);
                    }
                    if (DecodedQuery["P"] != null && DecodedQuery["P"] != "0")
                    {
                        PatientID = Convert.ToInt64(DecodedQuery["P"]);
                    }

                    myDoc.SetParameterValue("@UnitID", UnitID, "UnitHeader.rpt");
                    myDoc.SetParameterValue("@PatientID", PatientID, "ReportHeader");
                    myDoc.SetParameterValue("@UnitID", UnitID, "ReportHeader");

                    myDoc.SetParameterValue("@UnitID", UnitID);
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID);
                    myDoc.SetParameterValue("@VisitID", VisitID);
                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@PatientUnitID", UnitID);



                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleHistory_ObstetricHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleHistory_ObstetricHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleHistory_ObstetricHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleHistory_ObstetricHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleHistory_ObstetricHistory");



                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleHistory_MedicalHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleHistory_MedicalHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleHistory_MedicalHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleHistory_MedicalHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleHistory_MedicalHistory");

                    myDoc.SetParameterValue("@UnitID", UnitID, "Sub_FemaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "Sub_FemaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "Sub_FemaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "Sub_FemaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "Sub_FemaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@IsMale", false, "Sub_FemaleHistory_FamilyHistory");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleHistory_SurgicalHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleHistory_SurgicalHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleHistory_SurgicalHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleHistory_SurgicalHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleHistory_SurgicalHistory");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleHistory_PreviousTreatmentHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleHistory_PreviousTreatmentHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleHistory_PreviousTreatmentHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleHistory_PreviousTreatmentHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleHistory_PreviousTreatmentHistory");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleReport_PastMedicationHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleReport_PastMedicationHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleReport_PastMedicationHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleReport_PastMedicationHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleReport_PastMedicationHistory");
                    myDoc.SetParameterValue("@IsMale", false, "SubFemaleReport_PastMedicationHistory");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleHistory_Allergies");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleHistory_Allergies");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleHistory_Allergies");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleHistory_Allergies");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleHistory_Allergies");


                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleHistory_Addictions");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleHistory_Addictions");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleHistory_Addictions");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleHistory_Addictions");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleHistory_Addictions");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleHistory_Vaccination");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleHistory_Vaccination");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleHistory_Vaccination");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleHistory_Vaccination");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleHistory_Vaccination");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubFemaleHistory_SocialHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubFemaleHistory_SocialHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubFemaleHistory_SocialHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubFemaleHistory_SocialHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubFemaleHistory_SocialHistory");


                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();
                    
                    Stream oStream;
                    byte[] byteArray = null;
                    oStream = myDoc.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                    byteArray = new byte[oStream.Length];
                    oStream.Read(byteArray, 0, Convert.ToInt32(oStream.Length - 1));

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = "application/pdf";
                    Response.BinaryWrite(byteArray);

                }
                else
                {

                    Response.Redirect("http://localhost:4000/", false);
                    Context.ApplicationInstance.CompleteRequest();
                }
            }
            catch (ThreadAbortException ex)
            {
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        protected void CrystalReportViewer1_Unload(object sender, EventArgs e)
        {
            try
            {
                if (myDoc != null)
                    myDoc.Dispose();
                CrystalReportViewer1.Dispose();
                GC.Collect();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}