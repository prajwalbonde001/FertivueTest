using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Configuration;
using System.IO;
using System.Threading;
using System.Web;
namespace PIVF.Web.Reports.EMR
{
    public partial class SemenFreez1 : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("SemenFreez.rpt"));
                    long UnitID = 0;
                    string FrmNo = String.Empty;
                    long PatientID = 0;
                    long PatientUnitID = 0;
                    if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                    {
                        UnitID = Convert.ToInt64(DecodedQuery["U"]);
                    }
                    if (DecodedQuery["FrmNo"] != null && DecodedQuery["FrmNo"] != "0")
                    {
                        FrmNo = DecodedQuery["FrmNo"];
                    }
                    //if (DecodedQuery["V"] != null && DecodedQuery["V"] != "0")
                    //{
                    //    VisitID = Convert.ToInt64(DecodedQuery["V"]);
                    //}
                    if (DecodedQuery["P"] != null && DecodedQuery["P"] != "0")
                    {
                        PatientID = Convert.ToInt64(DecodedQuery["P"]);
                    }
                    if (DecodedQuery["PU"] != null && DecodedQuery["PU"] != "0")
                    {
                        PatientUnitID = Convert.ToInt64(DecodedQuery["PU"]);
                    }
                    myDoc.SetParameterValue("@UnitID", UnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@VisitID", null, "PatientCommon.rpt");




                    myDoc.SetParameterValue("@FrmNo", FrmNo);
                    myDoc.SetParameterValue("@UnitID", UnitID);

                    myDoc.SetParameterValue("@FrmNo", FrmNo, "Cryodetails");
                    myDoc.SetParameterValue("@UnitID", UnitID, "Cryodetails");
                    //myDoc.SetParameterValue("@PatientID", PatientID);
                    //myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
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
                    // Response.End();
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