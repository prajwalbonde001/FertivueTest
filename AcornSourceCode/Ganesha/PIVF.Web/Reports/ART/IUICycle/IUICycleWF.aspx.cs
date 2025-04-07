using System;
using System.Web;
using System.Configuration;
using CrystalDecisions.CrystalReports.Engine;
using System.IO;
using System.Threading;

namespace PIVF.Web.Reports.ART.IUICycle
{
    public partial class IUICycleWF : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("IUICycleReport.rpt"));
                    long TherapyUnitID = 0;
                    long TherapyID = 0;
                    long PatientID = 0;
                    long PatientUnitID = 0;
                    if (DecodedQuery["P"] != null && DecodedQuery["P"] != "0")
                    {
                        PatientID = Convert.ToInt64(DecodedQuery["P"]);
                    }
                    if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                    {
                        PatientUnitID = Convert.ToInt64(DecodedQuery["U"]);
                    }
                    if (DecodedQuery["TH"] != null && DecodedQuery["TH"] != "0")
                    {
                        TherapyID = Convert.ToInt64(DecodedQuery["TH"]);
                    }
                    if (DecodedQuery["THU"] != null && DecodedQuery["THU"] != "0")
                    {
                        TherapyUnitID = Convert.ToInt64(DecodedQuery["THU"]);
                    }

                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "UnitHeader.rpt");
                    myDoc.SetParameterValue("@PatientID", PatientID, "subRptPatientData_ART.rpt");
                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "subRptPatientData_ART.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subRptCycleDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subRptCycleDetails.rpt");

                    myDoc.SetParameterValue("@Action", "IUIStimulationChartDetails", "subrptIUIStimulationChartDetails.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptIUIStimulationChartDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptIUIStimulationChartDetails.rpt");

                    //myDoc.SetParameterValue("@Action", "IUIFollicularMonitoring", "subrptIUIFollicularMonitoring.rpt");
                    //myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptIUIFollicularMonitoring.rpt");
                    //myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptIUIFollicularMonitoring.rpt");



                    myDoc.SetParameterValue("@Action", "FollicularMonitoring", "IUIFollicularScanDetails");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "IUIFollicularScanDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "IUIFollicularScanDetails");

                    myDoc.SetParameterValue("@Action", "TriggerInformation", "IUITriggerInformation");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "IUITriggerInformation");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "IUITriggerInformation");

                    

                    myDoc.SetParameterValue("@Action", "IUIOutcome", "subrptIUIOutcome.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptIUIOutcome.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptIUIOutCome.rpt");

                    myDoc.SetParameterValue("@Action", "IUISummary", "subrptIUISummary.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptIUISummary.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptIUISummary.rpt");

                    myDoc.SetParameterValue("@Action", "IUISummary", "subrptIUISummary_Partner.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptIUISummary_Partner.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptIUISummary_Partner.rpt");

                    myDoc.SetParameterValue("@Action", "PreparationAssessment", "subrptPreparationAssessment.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptPreparationAssessment.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptPreparationAssessment.rpt");

                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();

                    //MemoryStream oStream = new MemoryStream();
                    //oStream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.PortableDocFormat);
                    //MemoryStream mstream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.CrystalReport);
                    Stream oStream = null;
                    byte[] byteArray = null;
                    oStream = myDoc.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                    byteArray = new byte[oStream.Length];
                    oStream.Read(byteArray, 0, Convert.ToInt32(oStream.Length - 1));

                    Response.Clear();
                    Response.Buffer = true;
                    Response.ContentType = "application/pdf";
                    Response.BinaryWrite(byteArray);
                    HttpContext.Current.ApplicationInstance.CompleteRequest();
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