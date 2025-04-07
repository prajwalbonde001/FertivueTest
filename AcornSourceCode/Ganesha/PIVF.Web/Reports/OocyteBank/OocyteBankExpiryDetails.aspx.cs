using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using DataBaseConfiguration;

namespace PIVF.Web.Reports.OocyteBank
{
    public partial class OocyteBankExpiryDetails1 : System.Web.UI.Page
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
                    String dbUserPassword = ConfigurationManager.AppSettings["DBPassword"].ToString();
                    String dbServer = ConfigurationManager.AppSettings["DBServer"].ToString();
                    String dbName = ConfigurationManager.AppSettings["DBName"].ToString();
                    myDoc = new ReportDocument();
                    myDoc.Load(Server.MapPath("OocyteBankExpiryDetails.rpt"));
                                        
                    string NameCodeMRNo = null;
                    int IsShowDiscard = 0;
                    int IsExpired = 0;
                    bool ExportToExcel = false;
                    //string pdf = "pdf";
                    bool pdf = false;


                    if (DecodedQuery["pdf"] != null)
                    {
                        pdf = Convert.ToBoolean(DecodedQuery["pdf"]);
                    }

                    //if (DecodedQuery["ExportToExcel"] != null && DecodedQuery["ExportToExcel"] != "0")
                    //{
                    //    ExportToExcel = Convert.ToBoolean(DecodedQuery["ExportToExcel"]);
                    //}

                    //if (Request.QueryString["ExportToExcel"] != null && Request.QueryString["ExportToExcel"] != "0")
                    //{
                    //    ExportToExcel = Convert.ToBoolean(Request.QueryString["ExportToExcel"]);
                    //}


                    myDoc.SetParameterValue("@UnitID", GenericSP.CurrentUser.UnitID, "UnitHeader.rpt");
                    myDoc.SetParameterValue("@Action", "GetOocyteBankDetails");
                    myDoc.SetParameterValue("@UnitID", GenericSP.CurrentUser.UnitID);
                    myDoc.SetParameterValue("@NameCodeMRNo", NameCodeMRNo);
                    myDoc.SetParameterValue("@IsShowDiscard", IsShowDiscard);
                    myDoc.SetParameterValue("@IsExpired", IsExpired);

                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();

                    //if (ExportToExcel == true)
                    //if (pdf == "exel")
                    if (pdf == true)
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
                    ////MemoryStream oStream = new MemoryStream();
                    ////oStream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.PortableDocFormat);
                    ////MemoryStream mstream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.CrystalReport);
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