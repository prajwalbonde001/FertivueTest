using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Configuration;
using System.IO;
using System.Threading;
using System.Web;

namespace PIVF.Web.Reports.EMR.Summary
{
    public partial class SummaryWF : System.Web.UI.Page
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
                    //myDoc.Load(Server.MapPath("SummaryCR.rpt"));
                    myDoc.Load(Server.MapPath("SummaryCRNew.rpt"));
                    long VisitUnitID = 0;
                    long VisitID = 0;
                    long PatientID = 0;
                    long PatientUnitID = 0;
                    String ActMaleFemale = string.Empty;
                    if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                    {
                        PatientUnitID = Convert.ToInt64(DecodedQuery["U"]);
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
                   
                    if (Convert.ToBoolean(DecodedQuery["M"]))
                        ActMaleFemale = "Male";
                    else
                        ActMaleFemale = "Female";

                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
                    myDoc.SetParameterValue("@VisitID", VisitID);
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID);
                   
                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@VisitID", null, "PatientCommon.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "SubDiagnosisRpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "SubDiagnosisRpt");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubDiagnosisRpt");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubDiagnosisRpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "OPDComplainsRpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "OPDComplainsRpt");
                    myDoc.SetParameterValue("@VisitID", null, "OPDComplainsRpt");
                    myDoc.SetParameterValue("@Action", ActMaleFemale, "OPDComplainsRpt");
                    myDoc.SetParameterValue("@VisitUnitID", null, "OPDComplainsRpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "FollowUpNotesRpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "FollowUpNotesRpt");
                    myDoc.SetParameterValue("@VisitID", null, "FollowUpNotesRpt");
                    myDoc.SetParameterValue("@Action", ActMaleFemale, "FollowUpNotesRpt");
                    myDoc.SetParameterValue("@VisitUnitID", null, "FollowUpNotesRpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "InvestignProcedureSummarySubReport");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "InvestignProcedureSummarySubReport");
                    myDoc.SetParameterValue("@VisitID", VisitID, "InvestignProcedureSummarySubReport");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "InvestignProcedureSummarySubReport");

                    

                    myDoc.SetParameterValue("@PatientID", PatientID, "OPDSummary_VitalsRpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "OPDSummary_VitalsRpt");
                    myDoc.SetParameterValue("@VisitID", VisitID, "OPDSummary_VitalsRpt");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "OPDSummary_VitalsRpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "Sub_OPDSummaryPrescriptionDetails");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "Sub_OPDSummaryPrescriptionDetails");
                    myDoc.SetParameterValue("@VisitID", VisitID, "Sub_OPDSummaryPrescriptionDetails");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "Sub_OPDSummaryPrescriptionDetails");



                    //myDoc.SetParameterValue("@VisitID", VisitID);
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