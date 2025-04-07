using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using DataBaseConfiguration;
using System;
using System.Configuration;
using System.IO;
using System.Threading;
using System.Web;

namespace PIVF.Web.Reports.PatientAdvanceRefund
{
    public partial class PatientAdvanceRefund : System.Web.UI.Page
    {
        ReportDocument myDoc;
        protected void Page_Load(object sender, EventArgs e)
        {

            try
            {
                if (Session["CurrentUser"] != null)
                {

                    string str = Request.QueryString.ToString();
                    string s = System.Uri.UnescapeDataString(str);
                    string DecodedURL = HttpUtility.UrlDecode(s);
                    var DecodedQuery = HttpUtility.ParseQueryString(DecodedURL);
                    string connectionString = (string)ConfigurationManager.ConnectionStrings["PIVFContext"].ConnectionString;
                    string dbUserName = ConfigurationManager.AppSettings["DBUserName"].ToString();
                    string dbUserPassword = ConfigurationManager.AppSettings["DBPassword"].ToString();
                    string dbServer = ConfigurationManager.AppSettings["DBServer"].ToString();
                    string dbName = ConfigurationManager.AppSettings["DBName"].ToString();
                    myDoc = new ReportDocument();
                    myDoc.Load(Server.MapPath("rpt_PatientAdvanceRefund.rpt"));
                    long PatientID = 0;
                    long PatientUnitID = 0;
                    long RefundID = 0;
                    long RefundUnitID = 0;
                    bool pdf = false;

                    if (DecodedQuery["RefundID"] != null)
                    {
                        RefundID = Convert.ToInt64(DecodedQuery["RefundID"]);
                    }
                    if (DecodedQuery["RefundUnitID"] != null)
                    {
                        RefundUnitID = Convert.ToInt64(DecodedQuery["RefundUnitID"]);
                    }
                    if (DecodedQuery["PatientID"] != null)
                    {
                        PatientID = Convert.ToInt64(DecodedQuery["PatientID"]);
                    }
                    if (DecodedQuery["PatientUnitID"] != null)
                    {
                        PatientUnitID = Convert.ToInt64(DecodedQuery["PatientUnitID"]);
                    }
                    if (DecodedQuery["pdf"] != null)
                    {
                        pdf = Convert.ToBoolean(DecodedQuery["pdf"]);
                    }

                    myDoc.SetParameterValue("@UnitID", GenericSP.CurrentUser.UnitID, "UnitHeader.rpt");
                    myDoc.SetParameterValue("@RefundID", RefundID);
                    myDoc.SetParameterValue("@RefundUnitID", RefundUnitID);
                    //myDoc.SetParameterValue("@PatientID", PatientID);
                    //myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
                    myDoc.SetParameterValue("@RefundID", RefundID, "rptPatietRefundTransactionSummary");
                    myDoc.SetParameterValue("@RefundUnitID", RefundUnitID, "rptPatietRefundTransactionSummary");

                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();
                   
                    if (pdf == true)
                    {
                        Stream stream = null;
                        MemoryStream oStream = new MemoryStream();
                        stream = myDoc.ExportToStream(ExportFormatType.ExcelWorkbook);
                        stream.CopyTo(oStream);                       
                        Response.Clear();
                        Response.Buffer = true;
                        Response.ContentType = "application/vnd.ms-excel";
                        Response.BinaryWrite(oStream.ToArray());                      
                        Response.End();
                    }
                    else
                    {
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