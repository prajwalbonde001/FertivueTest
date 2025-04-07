using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PIVF.Web.Reports.New_Billing.MIS_Reports.DiscountRegisterReport
{
    public partial class DiscountRegisterReportWF : System.Web.UI.Page
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

                    myDoc.Load(Server.MapPath("DiscountRegisterReport.rpt"));


                    string pdf = "pdf";
                    long UnitID = 0;
                    DateTime? FromDate = null;
                    DateTime? ToDate = null;

                    if (DecodedQuery["FromDate"] != null && DecodedQuery["FromDate"] != "0")
                    {

                        // FromDate = Convert.ToDateTime(DecodedQuery["FromDate"]);
                        string d1 = DecodedQuery["FromDate"];

                        //var stringDate = "Mon Sep 09 2013 00:00:00 GMT+0530";
                        var stringDate = d1.Substring(0, 24) + " GMT+0530";
                        var dt = DateTime.ParseExact(stringDate, "ddd MMM dd yyyy HH:mm:ss 'GMT'zzz", System.Globalization.CultureInfo.InvariantCulture);
                        FromDate = Convert.ToDateTime(dt);
                    }
                    if (DecodedQuery["ToDate"] != null && DecodedQuery["ToDate"] != "0")
                    {
                        //ToDate = Convert.ToDateTime(DecodedQuery["ToDate"]);
                        string d1 = DecodedQuery["ToDate"];
                        //var stringDate = "Mon Sep 09 2013 00:00:00 GMT+0530";
                        var stringDate = d1.Substring(0, 24) + " GMT+0530";
                        var dt = DateTime.ParseExact(stringDate, "ddd MMM dd yyyy HH:mm:ss 'GMT'zzz", System.Globalization.CultureInfo.InvariantCulture);

                        ToDate = Convert.ToDateTime(dt);
                    }
                    if (DecodedQuery["UnitID"] != null && DecodedQuery["UnitID"] != "0")
                    {
                        UnitID = Convert.ToInt64(DecodedQuery["UnitID"]);
                    }
                    if (DecodedQuery["pdf"] != null)
                    {
                        pdf = Convert.ToString(DecodedQuery["pdf"]);
                    }


                    //myDoc.SetParameterValue("@UnitID", UnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@FromDate", FromDate);
                    myDoc.SetParameterValue("@ToDate", ToDate);
                    myDoc.SetParameterValue("@UnitID", UnitID);







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


                    //Stream oStream = null;
                    //byte[] byteArray = null;
                    //oStream = myDoc.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                    //byteArray = new byte[oStream.Length];
                    //oStream.Read(byteArray, 0, Convert.ToInt32(oStream.Length - 1));

                    //Response.Clear();
                    //Response.Buffer = true;
                    //Response.ContentType = "application/pdf";
                    //Response.BinaryWrite(byteArray);
                    //HttpContext.Current.ApplicationInstance.CompleteRequest();


                    if (pdf == "exel")
                    {
                        Stream stream = null;
                        MemoryStream oStream = new MemoryStream();
                        stream = myDoc.ExportToStream(ExportFormatType.ExcelWorkbook);
                        stream.CopyTo(oStream);
                        //MemoryStream oStream = new MemoryStream();
                        //oStream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.ExcelWorkbook);
                        Response.Clear();
                        Response.Buffer = true;
                        Response.ContentType = "application/vnd.ms-excel";
                        Response.BinaryWrite(oStream.ToArray());
                        //HttpContext.Current.ApplicationInstance.CompleteRequest();
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