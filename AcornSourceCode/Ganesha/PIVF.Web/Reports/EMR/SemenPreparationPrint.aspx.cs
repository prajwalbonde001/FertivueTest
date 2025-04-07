using System;
using System.IO;
using System.Threading;
using System.Web;
using CrystalDecisions.CrystalReports.Engine;
using System.Configuration;

namespace PIVF.Web.Reports.EMR
{
    public partial class SemenPreparationPrint : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("SemenProcessingReport.rpt"));

                    long PatientID = 0;
                    long PatientUnitID = 0;
                    long VisitID = 0;
                    string SRNo = string.Empty;

                    if (DecodedQuery["PID"] != null && DecodedQuery["PID"] != "0")
                    {
                        PatientID = Convert.ToInt64(DecodedQuery["PID"]);
                    }

                    if (DecodedQuery["PUID"] != null && DecodedQuery["PUID"] != "0")
                    {
                        PatientUnitID = Convert.ToInt64(DecodedQuery["PUID"]);
                    }

                    if (DecodedQuery["VID"] != null && DecodedQuery["VID"] != "0")
                    {
                        VisitID = Convert.ToInt64(DecodedQuery["VID"]);
                    }

                    if (DecodedQuery["SRNo"] != null && DecodedQuery["SRNo"] != "0")
                    {
                        SRNo = Convert.ToString(DecodedQuery["SRNo"]);
                    }

                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@VisitID", null, "PatientCommon.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
                    myDoc.SetParameterValue("@VisitID", VisitID);
                    myDoc.SetParameterValue("@SRNo", SRNo);


                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);

                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();

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
    }
}