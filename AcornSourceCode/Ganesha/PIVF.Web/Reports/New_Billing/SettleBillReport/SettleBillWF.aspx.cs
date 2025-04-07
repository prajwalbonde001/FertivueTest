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

namespace PIVF.Web.Reports.New_Billing.SettleBillReport
{
    public partial class SettleBillWF : System.Web.UI.Page
    {
        ReportDocument myDoc; 
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Session["Currentuser"] != null)
                {
                    string str = Request.QueryString.ToString();
                    string s = System.Uri.UnescapeDataString(str);
                    string DecodedURL = HttpUtility.UrlDecode(s);
                    var DecodedQuery = HttpUtility.ParseQueryString(DecodedURL);
                    string connectionString = (string)ConfigurationManager.ConnectionStrings["PIVFContext"].ConnectionString;
                    string dbUserName = ConfigurationManager.AppSettings["DBUserName"].ToString();
                    String dbUserPassword = ConfigurationManager.AppSettings["DBPassword"].ToString();
                    String dbServer = ConfigurationManager.AppSettings["DBServer"].ToString();
                    String dbName = ConfigurationManager.AppSettings["DBName"].ToString();
                    myDoc = new ReportDocument();

                    myDoc.Load(Server.MapPath("RPSettleBill.rpt"));
                   
                    long PatientID = 0;
                    long PatientUnitID = 0;
                    long BillID = 0;
                    long BillUnitID = 0;
                    long PaymentID = 0;


                    if (DecodedQuery["P"] != null && DecodedQuery["P"] != "0")
                    {
                        PatientID = Convert.ToInt64(DecodedQuery["P"]);
                    }
                    if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                    {
                        PatientUnitID = Convert.ToInt64(DecodedQuery["U"]);
                    }
                    if (DecodedQuery["BID"] != null && DecodedQuery["BID"] != "0")
                    {
                        BillID = Convert.ToInt64(DecodedQuery["BID"]);
                    }
                    if (DecodedQuery["BU"] != null && DecodedQuery["BU"] != "0")
                    {
                        BillUnitID = Convert.ToInt64(DecodedQuery["BU"]);
                    }

                    if (DecodedQuery["PAYID"] != null && DecodedQuery["PAYID"] != "0")
                    {
                        PaymentID = Convert.ToInt64(DecodedQuery["PAYID"]);
                    }

                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
                    myDoc.SetParameterValue("@BillID", BillID);
                    myDoc.SetParameterValue("@BillUnitID", BillUnitID);
                    myDoc.SetParameterValue("@PaymentID", PaymentID);

                    myDoc.SetParameterValue("@Action", "rptSettleBill", "rptSettleBill");
                    myDoc.SetParameterValue("@BillID", BillID, "rptSettleBill");
                    myDoc.SetParameterValue("@BillUnitID", BillUnitID, "rptSettleBill");
                    myDoc.SetParameterValue("@PatientID", PatientID, "rptSettleBill");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "rptSettleBill");
                    myDoc.SetParameterValue("@PaymentID", PaymentID, "rptSettleBill");





                    ///////////////////////// start//////////
                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer2.ReportSource = myDoc;
                    CrystalReportViewer2.RefreshReport();
                    CrystalReportViewer2.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer2.DataBind();



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
                CrystalReportViewer2.Dispose();
                GC.Collect();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }












    }
}
//http://localhost:5000/Reports/New_Billing/SettleBillReport/SettleBillWF.aspx.cs