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

namespace PIVF.Web.Reports.ART.ARTSummary
{
    public partial class NewArtSummary1 : System.Web.UI.Page
    {
        ReportDocument myDoc;
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if(Session["Currentuser"]!=null)
                {
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

                    myDoc.Load(Server.MapPath("NewArtSummary.rpt"));
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

                    myDoc.SetParameterValue("@Action", "StimulationChartDetails", "StimulationchartDetails");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "StimulationchartDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "StimulationchartDetails");

                    myDoc.SetParameterValue("@Action", "FollicularMonitoring", "FollicularMonitoring");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "FollicularMonitoring");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "FollicularMonitoring");

                    myDoc.SetParameterValue("@Action", "TriggerInformation", "TriggerInformation");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "TriggerInformation");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "TriggerInformation");

                    
                    myDoc.SetParameterValue("@Action", "OPUSummary", "OpuSummary");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "OpuSummary");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "OpuSummary");


                    myDoc.SetParameterValue("@Action", "EmbryologyDetails", "EmbryologyDetails");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "EmbryologyDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "EmbryologyDetails");
                    //added
                    myDoc.SetParameterValue("@Action", "LinkedRecipeints", "LinkedRecipeint");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "LinkedRecipeint");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "LinkedRecipeint");


                    myDoc.SetParameterValue("@Action", "EmbryoTransferDetails", "EmbryologyTransferDetails");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "EmbryologyTransferDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "EmbryologyTransferDetails");

                    myDoc.SetParameterValue("@Action", "EmbryoTransferDetails", "EmbryoSurrogateTransferDetails");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "EmbryoSurrogateTransferDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "EmbryoSurrogateTransferDetails");

                    myDoc.SetParameterValue("@Action", "EmbryoTransferDetailsImages", "EmbriyoImages");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "EmbriyoImages");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "EmbriyoImages");
                    
                    myDoc.SetParameterValue("@Action", "OocyteVitrification", "OocyteVetrification");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "OocyteVetrification");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "OocyteVetrification");
                    
                    myDoc.SetParameterValue("@Action", "OocyteThawing", "OoCyteThawing");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "OoCyteThawing");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "OoCyteThawing");


                    myDoc.SetParameterValue("@Action", "EmbryoVitrification", "EmbroyoVetrification");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "EmbroyoVetrification");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "EmbroyoVetrification");

                    myDoc.SetParameterValue("@Action", "EmbryoThawing", "EmbryoThawing");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "EmbryoThawing");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "EmbryoThawing");

                    myDoc.SetParameterValue("@Action", "Outcome", "OutCome");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "OutCome");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "OutCome");
                    // for doner cycle Outcome  Recipients
                    myDoc.SetParameterValue("@Action", "OutcomeRecipient", "OutcomeRecipient");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "OutcomeRecipient");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "OutcomeRecipient");
                    

                    //myDoc.SetParameterValue("@PatientID", PatientID, "PatientDetails");
                    //myDoc.SetParameterValue("@UnitID", PatientUnitID, "PatientDetails");
                    //myDoc.SetParameterValue("@TherapyID", TherapyID, "PatientDetails");
                    //myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "PatientDetails");
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