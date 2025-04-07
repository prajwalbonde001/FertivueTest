using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PIVF.Web.Reports.ART.IUICycle
{
    public partial class NewIUICycle : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("NewIUICycleReport.rpt"));
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
                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@UnitID", PatientUnitID);
                    myDoc.SetParameterValue("@TherapyID", TherapyID);
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID);
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "CycleDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "CycleDetails");

                    myDoc.SetParameterValue("@Action", "IUIStimulationChartDetails", "StimulationDetails");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "StimulationDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "StimulationDetails");

                    //myDoc.SetParameterValue("@Action", "IUIFollicularMonitoring", "FollicularMonitoring");
                    //myDoc.SetParameterValue("@TherapyID", TherapyID, "FollicularMonitoring");
                    //myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "FollicularMonitoring");



                    myDoc.SetParameterValue("@Action", "IUIFollicularMonitoring", "IUIFollicularScanDetails");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "IUIFollicularScanDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "IUIFollicularScanDetails");

                    myDoc.SetParameterValue("@Action", "CorpusLeteumScan", "CorpusLeteumScan");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "CorpusLeteumScan");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "CorpusLeteumScan");


                    myDoc.SetParameterValue("@Action", "TriggerInformation", "IUITriggerInformation");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "IUITriggerInformation");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "IUITriggerInformation");




                    myDoc.SetParameterValue("@Action", "IUISummary", "IUISummary");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "IUISummary");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "IUISummary");


                    myDoc.SetParameterValue("@Action", "IUISummary", "IUISummaryPartner");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "IUISummaryPartner");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "IUISummaryPartner");


                    myDoc.SetParameterValue("@Action", "PreparationAssessment", "PreparationAssesment");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "PreparationAssesment");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "PreparationAssesment");

                    myDoc.SetParameterValue("@Action", "IUIOutcome", "IUIOutcome");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "IUIOutcome");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "IUIOutcome");

                    //myDoc.SetParameterValue("@Action", "Outcome", "OutCome");
                    //myDoc.SetParameterValue("@TherapyID", TherapyID, "OutCome");
                    //myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "OutCome");



                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.RefreshReport();  //Added by Nayan Kamble
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    //CrystalReportViewer1.ReportSource = myDoc;    //Commented by Nayan Kamble
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

