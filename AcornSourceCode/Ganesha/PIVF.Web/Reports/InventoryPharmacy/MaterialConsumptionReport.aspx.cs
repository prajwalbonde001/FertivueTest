using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CrystalDecisions.CrystalReports.Engine;
using System.Configuration;
using System.IO;
using System.Threading;


namespace PIVF.Web.Reports.InventoryPharmacy
{
    public partial class MaterialConsumptionReport : System.Web.UI.Page
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

                    myDoc.Load(Server.MapPath("MaterialConsumption.rpt"));
                    long MaterialConsumptionID = 0; // VisitUnitID 
                    long MaterialConsumptionUnitID = 0; // TherapyID
                    //long PatientID = 0;
                    //long PatientUnitID = 0;
                    //long BillID = 0;
                    //bool IsBilled = false;

                    if (DecodedQuery["M"] != null && DecodedQuery["M"] != "0")
                    {
                        MaterialConsumptionID = Convert.ToInt64(DecodedQuery["M"]);
                    }
                    if (DecodedQuery["MU"] != null && DecodedQuery["MU"] != "0")
                    {
                        MaterialConsumptionUnitID = Convert.ToInt64(DecodedQuery["MU"]);
                    }


                    


                    myDoc.SetParameterValue("@UnitID", MaterialConsumptionUnitID, "UnitHeader.rpt");
                    myDoc.SetParameterValue("@MaterialConsumptionID", MaterialConsumptionID);
                    myDoc.SetParameterValue("@MaterialConsumptionUnitID", MaterialConsumptionUnitID);

                    //myDoc.SetParameterValue("@Action", "TransactionSummary", "TransactionSummary");
                    //myDoc.SetParameterValue("@PatientID", PatientID, "TransactionSummary");
                    //myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "TransactionSummary");
                    //myDoc.SetParameterValue("@VisitID", VisitID, "TransactionSummary");
                    //myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "TransactionSummary");
                    //myDoc.SetParameterValue("@BillID", BillID, "TransactionSummary");

                    ///////////////////////// start//////////
                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer2.ReportSource = myDoc;
                    CrystalReportViewer2.RefreshReport();
                    CrystalReportViewer2.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer2.DataBind();


                    

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