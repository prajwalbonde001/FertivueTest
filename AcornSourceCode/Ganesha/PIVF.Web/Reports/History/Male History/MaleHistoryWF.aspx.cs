using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Configuration;
using System.IO;
using System.Threading;
using System.Web;

namespace PIVF.Web.Reports.History.Femle_History
{
    public partial class MaleHistoryWF : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("MaleHistory.rpt"));
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

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubMaleHistory_MedicalHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubMaleHistory_MedicalHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubMaleHistory_MedicalHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubMaleHistory_MedicalHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubMaleHistory_MedicalHistory");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubMaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubMaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubMaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubMaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubMaleHistory_FamilyHistory");
                    myDoc.SetParameterValue("@IsMale", true, "SubMaleHistory_FamilyHistory");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubMaleHistory_SocialHistory");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubMaleHistory_SocialHistory");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubMaleHistory_SocialHistory");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubMaleHistory_SocialHistory");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubMaleHistory_SocialHistory");


                    myDoc.SetParameterValue("@UnitID", UnitID, "SubMaleHistory_Addictions");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubMaleHistory_Addictions");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubMaleHistory_Addictions");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubMaleHistory_Addictions");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubMaleHistory_Addictions");


                    myDoc.SetParameterValue("@UnitID", UnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubMaleHistory_Surgical");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubMaleHistory_Surgical");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubMaleHistory_Surgical");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubMaleHistory_Surgical");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubMaleHistory_Surgical");

                    myDoc.SetParameterValue("@UnitID", UnitID, "SubMaleHistory_Allergies");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubMaleHistory_Allergies");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubMaleHistory_Allergies");
                    myDoc.SetParameterValue("@PatientID", PatientID, "SubMaleHistory_Allergies");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "SubMaleHistory_Allergies");

                    myDoc.SetParameterValue("@UnitID", UnitID, "PastMedicationHstry");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "PastMedicationHstry");
                    myDoc.SetParameterValue("@VisitID", VisitID, "PastMedicationHstry");
                    myDoc.SetParameterValue("@PatientID", PatientID, "PastMedicationHstry");
                    myDoc.SetParameterValue("@PatientUnitID", UnitID, "PastMedicationHstry");
                    myDoc.SetParameterValue("@IsMale", true, "PastMedicationHstry");

                    myDoc.SetParameterValue("@PatientID", PatientID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@UnitID", UnitID, "PatientCommon.rpt");
                    //myDoc.SetParameterValue("@VisitID", null, "PatientCommon.rpt");

                    myDoc.SetParameterValue("@UnitID", UnitID);
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID);
                    myDoc.SetParameterValue("@VisitID", VisitID);
                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@PatientUnitID", UnitID);

                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();

                    //MemoryStream oStream = new MemoryStream();
                    //oStream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.PortableDocFormat);
                    //MemoryStream mstream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.CrystalReport);
                    Stream oStream;
                    byte[] byteArray = null;
                    oStream = myDoc.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                    byteArray = new byte[oStream.Length];
                    oStream.Read(byteArray, 0, Convert.ToInt32(oStream.Length - 1));

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = "application/pdf";
                    Response.BinaryWrite(byteArray);
                    // Response.End();
                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    //MemoryStream oStream; // using System.IO
                    //oStream = (MemoryStream)
                    //myDoc.ExportToStream(
                    //CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                    //Response.Clear();
                    //Response.Buffer = true;
                    //Response.ContentType = "application/pdf";
                    //Response.BinaryWrite(oStream.ToArray());
                    //Response.End();

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