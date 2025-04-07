using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.IO;
using System.Threading;
using CrystalDecisions.CrystalReports.Engine;
using System.Globalization;
using CrystalDecisions.Shared;
using DataBaseConfiguration;

namespace PIVF.Web.Reports.PatientDashboard
{
    public partial class PatientList : System.Web.UI.Page
    {
        ReportDocument myDoc;

        public string GetStimulationPatientList { get; private set; }

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
                    string connectionString = ConfigurationManager.ConnectionStrings["PIVFContext"].ConnectionString;
                    string dbUserName = ConfigurationManager.AppSettings["DBUserName"].ToString();
                    string dbUserPassword = ConfigurationManager.AppSettings["DBPassword"].ToString();
                    string dbServer = ConfigurationManager.AppSettings["DBServer"].ToString();
                    string dbName = ConfigurationManager.AppSettings["DBName"].ToString();

                    myDoc = new ReportDocument();
                    
                    string pdf = "pdf", btn = null, btn1 = null, btn2 = null, btn3 = null, btn4 = null, btn5 = null
                    , btn6 = null, btn7 = null, btn8 = null, btn9 = null, btn10 = null, btn11 = null, btn12 = null,
                     btn13 = null, btn14 = null, btn15 = null, btn16 = null, btn17 = null;


                    myDoc.Load(Server.MapPath("PatientDashboardList.rpt"));


                    long UnitID = 0;  
                     if (DecodedQuery["pdf"] != null)
                     { 
                       pdf = Convert.ToString(DecodedQuery["pdf"]);
                     }
                    if (DecodedQuery["btn"] != null)
                    { 
                        btn = Convert.ToString(DecodedQuery["btn"]);
                    }
                    if (DecodedQuery["btn1"] != null)
                    { 
                        btn1 = Convert.ToString(DecodedQuery["btn1"]);
                    }
                    if(DecodedQuery["btn2"] != null)
                    {
                        btn2 = Convert.ToString(DecodedQuery["btn2"]);
                    }
                    if(DecodedQuery["btn3"] != null)
                    {
                        btn3 = Convert.ToString(DecodedQuery["btn3"]);
                    }
                    if(DecodedQuery["btn4"] != null)
                    {
                        btn4 = Convert.ToString(DecodedQuery["btn4"]);
                    }
                    if (DecodedQuery["btn5"] != null)
                    {
                        btn5 = Convert.ToString(DecodedQuery["btn5"]);
                    }
                    if (DecodedQuery["btn6"] != null)
                    {
                        btn6 = Convert.ToString(DecodedQuery["btn6"]);
                    }
                    if (DecodedQuery["btn7"] != null)
                    {
                        btn7 = Convert.ToString(DecodedQuery["btn7"]);
                    }
                    if (DecodedQuery["btn8"] != null)
                    {
                        btn8 = Convert.ToString(DecodedQuery["btn8"]);
                    }
                    if (DecodedQuery["btn9"] != null)
                    {
                        btn9 = Convert.ToString(DecodedQuery["btn9"]);
                    }
                    if (DecodedQuery["btn10"] != null)
                    {
                        btn10 = Convert.ToString(DecodedQuery["btn10"]);
                    }
                    if (DecodedQuery["btn11"] != null)
                    {
                        btn11 = Convert.ToString(DecodedQuery["btn11"]);
                    }
                   
                    if (DecodedQuery["btn12"] != null)
                    {
                        btn12 = Convert.ToString(DecodedQuery["btn12"]);
                    }
                    if (DecodedQuery["btn13"] != null)
                    {
                        btn13 = Convert.ToString(DecodedQuery["btn13"]);
                    }
                    if (DecodedQuery["btn14"] != null)
                    {
                        btn14 = Convert.ToString(DecodedQuery["btn14"]);
                    }
                    if (DecodedQuery["btn15"] != null)
                    {
                        btn15 = Convert.ToString(DecodedQuery["btn15"]);
                    }
                    if (DecodedQuery["btn16"] != null)
                    {
                        btn16 = Convert.ToString(DecodedQuery["btn16"]);
                    }
                    if (DecodedQuery["btn17"] != null)
                    {
                        btn17 = Convert.ToString(DecodedQuery["btn17"]);
                    }


                    /*----------------------------------------------------------------------------------------------------------------------------*/

                    if (btn == "Stimulation")
                    {
                        myDoc.SetParameterValue("@Action", "GetStimulationPatientList");
                    }
                    else if (btn1 == "Trigger")
                    {
                        myDoc.SetParameterValue("@Action", "TriggerPatientList");
                    }
                    else if (btn2 == "Day0")
                    {
                        myDoc.SetParameterValue("@Action", "GetDay0PatientList");
                    }
                    else if (btn3 == "Day1")
                    {
                        myDoc.SetParameterValue("@Action", "GetDay1PatientList");
                    }
                    else if (btn4 == "Day2")
                    {
                        myDoc.SetParameterValue("@Action", "GetDay2PatientList");
                    }
                    else if (btn5 == "Day3")
                    {
                        myDoc.SetParameterValue("@Action", "GetDay3PatientList");
                    }
                    else if (btn6 == "Day4")
                    {
                        myDoc.SetParameterValue("@Action", "GetDay4PatientList");
                    }
                    else if (btn7 == "Day5")
                    {
                        myDoc.SetParameterValue("@Action", "GetDay5PatientList");
                    }
                    else if (btn8 == "Day6")
                    {
                        myDoc.SetParameterValue("@Action", "GetDay6PatientList");
                    }
                    else if (btn9 == "PregnancyTest")
                    {
                        myDoc.SetParameterValue("@Action", "GetPregnancyTestPatientList");
                    }
                    else if (btn10 == "PregnancyUltrasound")
                    {
                        myDoc.SetParameterValue("@Action", "GetPregnancyUltrasoundPatientList");
                    }
                    else if (btn11 == "PregnancyOutcome")
                    {
                        myDoc.SetParameterValue("@Action", "GetPregnancyOutcomePatientList");
                    }
                    else if (btn12 == "TotalEmbryo")
                    {
                        myDoc.SetParameterValue("@Action", "GetETPatientList");
                    }
                    else if (btn13 == "TotalTrigger")
                    {
                        myDoc.SetParameterValue("@Action", "GetTriggerPatientList");
                    }
                    else if (btn14 == "TotalOPU")
                    {
                        myDoc.SetParameterValue("@Action", "GetOPUPatientList");
                    }
                    else if (btn15 == "BHCG")
                    {
                        myDoc.SetParameterValue("@Action", "GetBHCGPatientList");
                    }
                    else if (btn16 == "USG")
                    {
                        myDoc.SetParameterValue("@Action", "GetUSGPatientList");
                    }
                    else if (btn17 == "RemainingOPUList")
                    {
                        myDoc.SetParameterValue("@Action", "GetRemainingOPUPatientList");
                    }
                    

                    /*----------------------------------------------------------------------------------------------------------------------------*/
                    myDoc.SetParameterValue("@UnitID", UnitID, "UnitHeader.rpt");
                    myDoc.SetParameterValue("@UnitID", GenericSP.CurrentUser.UnitID);

                    
                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();

                    //MemoryStream oStream = new MemoryStream();
                    //oStream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.PortableDocFormat);
                    //MemoryStream mstream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.CrystalReport);
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