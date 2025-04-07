using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using DataBaseConfiguration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PIVF.Web.Reports.Appointment
{
    public partial class AppointmentListWF : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("AppointmentDetails.rpt"));

                    string pdf = "pdf";
                    DateTime? AppointmentDate = null;
                    DateTime? FromDate = null;
                    DateTime? ToDate = null;
                    bool IsNormalSearch = false;
                    int DOCID = 0;
                    int DeptID = 0;
                    string Name = null;

                    if (DecodedQuery["AppointmentDate"] != null && DecodedQuery["AppointmentDate"] != "0")
                    {

                        // FromDate = Convert.ToDateTime(DecodedQuery["FromDate"]);
                        string d1 = DecodedQuery["AppointmentDate"];

                        //var stringDate = "Mon Sep 09 2013 00:00:00 GMT+0530";
                        var stringDate = d1.Substring(0, 24) + " GMT+0530";
                        var dt = DateTime.ParseExact(stringDate, "ddd MMM dd yyyy HH:mm:ss 'GMT'zzz", System.Globalization.CultureInfo.InvariantCulture);
                        AppointmentDate = Convert.ToDateTime(dt);
                    }

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

                    if (DecodedQuery["PDF"] != null)
                    {
                        pdf = Convert.ToString(DecodedQuery["PDF"]);
                    }

                    if (DecodedQuery["DOCID"] != null)
                    {
                        DOCID = Convert.ToInt32(DecodedQuery["DOCID"]);
                    }

                    if (DecodedQuery["DeptID"] != null)
                    {
                        DeptID = Convert.ToInt32(DecodedQuery["DeptID"]);
                    }

                    if (DecodedQuery["Name"] != null)
                    {
                        Name = Convert.ToString(DecodedQuery["Name"]);
                    }

                    if (DecodedQuery["IsNormalSearch"] != null)
                    {
                        IsNormalSearch = Convert.ToBoolean(DecodedQuery["IsNormalSearch"]);
                        if (IsNormalSearch == false) {
                            AppointmentDate = null;
                            DOCID = 0;
                            DeptID = 0;
                            Name = null;
                        }                      
                    }

                    myDoc.SetParameterValue("@UnitID", GenericSP.CurrentUser.UnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@AppointmentDate", AppointmentDate);
                    myDoc.SetParameterValue("@FromDate", FromDate);
                    myDoc.SetParameterValue("@ToDate", ToDate);
                    myDoc.SetParameterValue("@DOCID", DOCID);
                    myDoc.SetParameterValue("@DeptID", DeptID);
                    myDoc.SetParameterValue("@Name", Name);
                    myDoc.SetParameterValue("@UnitID", GenericSP.CurrentUser.UnitID);                    

                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();
                    
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