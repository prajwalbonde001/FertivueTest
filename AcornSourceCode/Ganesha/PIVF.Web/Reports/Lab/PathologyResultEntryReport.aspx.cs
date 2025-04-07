using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using DataBaseConfiguration;
using System;
using System.Configuration;
using System.IO;
using System.Threading;
using System.Web;

namespace PIVF.Web.Reports.Lab
{
    public partial class BSRPathologyResultEntryReport : System.Web.UI.Page
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
                    myDoc.Load(Server.MapPath("rptPathoResultEntry.rpt"));

                    string SelectedTestID = null;//SelectedTestID as ResultID
                    long UnitID = 0;
                    bool ISRferalDoctorSignature = false;
                    bool IsDuplicate = false;
                    string BillNumber = null;
                    long EmpID = 0;
                    string SampleNo = null;
                    string TestID = null;
                    bool IsOutSource = false;
                    bool pdf = false;

                    if (DecodedQuery["ID"] != null)
                    {
                        SelectedTestID = Convert.ToString(DecodedQuery["ID"]);
                    }
                    if (DecodedQuery["UnitID"] != null  && DecodedQuery["UnitID"] != "0")
                    {
                        UnitID = Convert.ToInt64(DecodedQuery["UnitID"] );
                    }
                    if (DecodedQuery["ISRferalDoctorSignature"] != null)
                    {
                        ISRferalDoctorSignature = Convert.ToBoolean(DecodedQuery["ISRferalDoctorSignature"]);
                    }
                    if (DecodedQuery["IsDuplicate"] != null)
                    {
                        IsDuplicate = Convert.ToBoolean(DecodedQuery["IsDuplicate"]);
                    }
                    if (DecodedQuery["BillNumber"] != null)
                    {
                        BillNumber = Convert.ToString(DecodedQuery["BillNumber"]);
                    }
                    if (DecodedQuery["SampleNo"] != null)
                    {
                        SampleNo = Convert.ToString(DecodedQuery["SampleNo"]);
                    }
                    if (DecodedQuery["TestID"] != null)
                    {
                        TestID = Convert.ToString(DecodedQuery["TestID"]);
                    }
                    if (DecodedQuery["EmpID"] != null)
                    {
                        EmpID = Convert.ToInt64(DecodedQuery["EmpID"]);
                    }
                    if (DecodedQuery["IsOutSource"] != null)
                    {
                        IsOutSource = Convert.ToBoolean(DecodedQuery["IsOutSource"]);
                    }

                    myDoc.SetParameterValue("@UnitID", GenericSP.CurrentUser.UnitID, "UnitHeader.rpt");
                    myDoc.SetParameterValue("@BillID", 0);
                    myDoc.SetParameterValue("@BillUnitID", 0);
                    myDoc.SetParameterValue("@OrderID", SelectedTestID);
                    myDoc.SetParameterValue("@OrderUnitID", UnitID);
                    myDoc.SetParameterValue("@ISRferalDoctorSignature", ISRferalDoctorSignature);
                    myDoc.SetParameterValue("@IsDuplicate", IsDuplicate);
                    myDoc.SetParameterValue("@BillNumber", BillNumber);
                    myDoc.SetParameterValue("@SampleNo", SampleNo);
                    myDoc.SetParameterValue("@TestID", TestID);
                    

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