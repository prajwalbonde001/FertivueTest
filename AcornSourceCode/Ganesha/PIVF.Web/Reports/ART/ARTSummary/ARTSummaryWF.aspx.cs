using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using CrystalDecisions.CrystalReports.Engine;
using System.IO;
using CrystalDecisions.Shared;
using CrystalDecisions.Web;
using System.Threading;



namespace PIVF.Web.Reports.ART.ARTSummary
{
    public partial class ARTSummaryWF : System.Web.UI.Page
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
                
                    myDoc.Load(Server.MapPath("ARTSummaryReport.rpt"));
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
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subRptPatientData_ART.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subRptPatientData_ART.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subRptCycleDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subRptCycleDetails.rpt");

                    myDoc.SetParameterValue("@Action", "StimulationChartDetails", "subrptStimulationChartDetails.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptStimulationChartDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptStimulationChartDetails.rpt");

                    myDoc.SetParameterValue("@Action", "EmbryoThawing", "subrptEmbryoThawing.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptEmbryoThawing.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptEmbryoThawing.rpt");

                    myDoc.SetParameterValue("@Action", "EmbryoTransferDetails", "subrptEmbryoTransferDetails.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptEmbryoTransferDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptEmbryoTransferDetails.rpt");

                    myDoc.SetParameterValue("@Action", "EmbryoVitrification", "subrptEmbryoVitrification.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptEmbryoVitrification.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptEmbryoVitrification.rpt");

                    myDoc.SetParameterValue("@Action", "FollicularMonitoring", "subrptFollicularMonitoring.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptFollicularMonitoring.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptFollicularMonitoring.rpt");

                    myDoc.SetParameterValue("@Action", "OocyteThawing", "subrptOocyteThawing.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptOocyteThawing.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptOocyteThawing.rpt");

                    myDoc.SetParameterValue("@Action", "OocyteVitrification", "subrptOocyteVitrification.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptOocyteVitrification.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptOocyteVitrification.rpt");

                    myDoc.SetParameterValue("@Action", "OPUSummary", "subrptOPUSummary.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptOPUSummary.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptOPUSummary.rpt");

                    myDoc.SetParameterValue("@Action", "EmbryologyDetails", "subrptEmbryologyDetails.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptEmbryologyDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptEmbryologyDetails.rpt");

                    myDoc.SetParameterValue("@Action", "Outcome", "subrptOutcomeDetails.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptOutcomeDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptOutcomeDetails.rpt");

                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.RefreshReport();
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
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