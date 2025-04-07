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

namespace PIVF.Web.Reports.EMR
{
    public partial class RadiologyWF : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("RadiologyCR.rpt"));
                    long VisitUnitID = 0;
                    long VisitID = 0;
                    long PatientID = 0;
                    long PatientUnitID = 0;

                    string Action = string.Empty;
                    if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                    {
                        PatientUnitID = Convert.ToInt64(DecodedQuery["U"]);
                    }
                    if (DecodedQuery["VU"] != null && DecodedQuery["VU"] != "0" && DecodedQuery["VU"] !="undefined")
                    {
                        VisitUnitID = Convert.ToInt64(DecodedQuery["VU"]);
                    }
                    if (DecodedQuery["V"] != null && DecodedQuery["V"] != "0" && DecodedQuery["V"] != "undefined")
                    {
                        VisitID = Convert.ToInt64(DecodedQuery["V"]);
                    }
                    if (DecodedQuery["P"] != null && DecodedQuery["P"] != "0")
                    {
                        PatientID = Convert.ToInt64(DecodedQuery["P"]);
                    }
                    if (!string.IsNullOrEmpty(DecodedQuery["Act"]))
                    {
                        Action = DecodedQuery["Act"];
                    }
                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@VisitID", null, "PatientCommon.rpt");

                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID);
                    myDoc.SetParameterValue("@VisitID", VisitID);
                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
                    myDoc.SetParameterValue("@Action", Action);

                    //                   @PatientID INT,
                    //@PatientUnitID INT,
                    //@VisitID INT,
                    //@VisitUnitID INT,
                    //@Action NVARCHAR(50)



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