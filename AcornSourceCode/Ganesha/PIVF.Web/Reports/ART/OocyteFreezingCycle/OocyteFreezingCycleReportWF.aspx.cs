using System;
using System.Web;
using System.Configuration;
using CrystalDecisions.CrystalReports.Engine;
using System.IO;
using System.Threading;


namespace PIVF.Web.Reports.ART.OocyteFreezingCycle
{
    public partial class OocyteFreezingCycleReportWF : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("OocyteFreezingCycleReport.rpt"));
                    long TherapyUnitID = 0;
                    long TherapyID = 0;
                    long PatientID = 0;
                    long PatientUnitID = 0;
                    string UN = "";
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
                    if (DecodedQuery["UN"] != null && DecodedQuery["UN"] != "0")
                    {
                        UN = Convert.ToString(DecodedQuery["UN"]);
                    }

                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "UnitHeader.rpt");
                    myDoc.SetParameterValue("@PatientID", PatientID, "subRptPatientData_ART.rpt");
                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "subRptPatientData_ART.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subRptPatientData_ART.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subRptPatientData_ART.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subRptCycleDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subRptCycleDetails.rpt");

                    myDoc.SetParameterValue("@Action", "OFStimulationChartDetails", "subrptOFStimulationChartDetails.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptOFStimulationChartDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptOFStimulationChartDetails.rpt");

                    //myDoc.SetParameterValue("@Action", "OFFollicularMonitoring", "subrptOFFollicularMonitoring.rpt");
                    //myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptOFFollicularMonitoring.rpt");
                    //myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptOFFollicularMonitoring.rpt");

                    myDoc.SetParameterValue("@Action", "OFFollicularMonitoring", "OocytefreezFollicularscan");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "OocytefreezFollicularscan");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "OocytefreezFollicularscan");


                    myDoc.SetParameterValue("@Action", "TriggerInformation", "OocytefreezTriggerInfo");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "OocytefreezTriggerInfo");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "OocytefreezTriggerInfo");

                    myDoc.SetParameterValue("@Action", "OFOPUSummary", "subrptOFOPUSummary.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptOFOPUSummary.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptOFOPUSummary.rpt");

                    myDoc.SetParameterValue("@Action", "OFEmbryology", "subrptOFEmbryology.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "subrptOFEmbryology.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "subrptOFEmbryology.rpt");
                    myDoc.SetParameterValue("@UserName", UN, "subrptOFEmbryology.rpt");

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