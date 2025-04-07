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

namespace PIVF.Web.Reports.EMR.TemplateReports
{
    public partial class HystroscopyReport : System.Web.UI.Page
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
                    long TemplateID = 0;

                    if (DecodedQuery["TemplateID"] != null && DecodedQuery["TemplateID"] != "0")
                    {
                        TemplateID = Convert.ToInt64(DecodedQuery["TemplateID"]);
                    }


                    if (TemplateID == 2) // HystroscopyCR
                    {
                        myDoc.Load(Server.MapPath("HystroscopyCR.rpt"));
                    }
                    else if (TemplateID == 1) // Laproscopy
                    {
                        myDoc.Load(Server.MapPath("LaproscopyCR.rpt"));
                    }
                    else if (TemplateID == 5)    // Examination TemplateID == 3
                    {
                        myDoc.Load(Server.MapPath("FamaleExaminationCR.rpt"));
                    }
                    else if (TemplateID == 3)  // UtraSonography TemplateID = 4
                    {
                        myDoc.Load(Server.MapPath(" FamaleUltrasonographyCR.rpt"));
                    }
                    else if (TemplateID == 4) // HSG TemplateID = 5
                    {
                        myDoc.Load(Server.MapPath(" HsgCR.rpt")); 
                    }

                    else if (TemplateID == 6) // HystroscopyCR
                    {
                        myDoc.Load(Server.MapPath("MaleExaminationCR.rpt"));
                    }
                    else if (TemplateID == 8) // HystroscopyCR
                    {
                        myDoc.Load(Server.MapPath("PapSmearCR.rpt"));
                    }
                  
                    else if (TemplateID == 9) // HystroscopyCR  //9
                    {
                        myDoc.Load(Server.MapPath("AcupunctureFullCycle.rpt"));//
                    }
                    else if (TemplateID == 10) // HystroscopyCR
                    {
                        myDoc.Load(Server.MapPath("ENDOMETRIALBIOPSY.rpt"));//12
                    }

                    else if (TemplateID == 11) // HystroscopyCR
                    {
                        myDoc.Load(Server.MapPath("SonohysrogramReport.rpt"));
                    }
                    else if (TemplateID == 12) // HystroscopyCR
                    {
                        myDoc.Load(Server.MapPath("AcupuncturePerSession.rpt"));//12
                    }
                    else if (TemplateID == 13) // HystroscopyCR
                    {
                        myDoc.Load(Server.MapPath("HVSREPORT.rpt"));//12
                    }
                    else
                    {

                    }


                        long UnitID = 0;
                        long ID = 0;
                        //string SNo = String.Empty;
                        long PatientID = 0;
                        long PatientUnitID = 0;
                        if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                        {
                            UnitID = Convert.ToInt64(DecodedQuery["U"]);
                        }
                        if (DecodedQuery["ID"] != null && DecodedQuery["ID"] != "0")
                        {
                            ID = Convert.ToInt64(DecodedQuery["ID"]);
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

                        myDoc.SetParameterValue("@ID", ID);
                        myDoc.SetParameterValue("@UnitID", UnitID);

                        //myDoc.SetParameterValue("@PatientID", PatientID);
                        //myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
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
                   
                    //}
                    //else
                    //{
                    //    myDoc.Load(Server.MapPath("LaproscopyCR.rpt"));
                    //    long UnitID = 0;
                    //    long ID = 0;
                    //    //string SNo = String.Empty;
                    //    long PatientID = 0;
                    //    long PatientUnitID = 0;
                    //    if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                    //    {
                    //        UnitID = Convert.ToInt64(DecodedQuery["U"]);
                    //    }
                    //    if (DecodedQuery["ID"] != null && DecodedQuery["ID"] != "0")
                    //    {
                    //        ID = Convert.ToInt64(DecodedQuery["ID"]);
                    //    }
                    //    //if (DecodedQuery["V"] != null && DecodedQuery["V"] != "0")
                    //    //{
                    //    //    VisitID = Convert.ToInt64(DecodedQuery["V"]);
                    //    //}
                    //    if (DecodedQuery["P"] != null && DecodedQuery["P"] != "0")
                    //    {
                    //        PatientID = Convert.ToInt64(DecodedQuery["P"]);
                    //    }
                    //    if (DecodedQuery["PU"] != null && DecodedQuery["PU"] != "0")
                    //    {
                    //        PatientUnitID = Convert.ToInt64(DecodedQuery["PU"]);
                    //    }
                    //    myDoc.SetParameterValue("@UnitID", UnitID, "UnitHeader.rpt");

                    //    myDoc.SetParameterValue("@PatientID", PatientID, "PatientCommon.rpt");
                    //    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "PatientCommon.rpt");
                    //    myDoc.SetParameterValue("@VisitID", null, "PatientCommon.rpt");

                    //    myDoc.SetParameterValue("@ID", ID);
                    //    myDoc.SetParameterValue("@UnitID", UnitID);

                    //    //myDoc.SetParameterValue("@PatientID", PatientID);
                    //    //myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
                    //    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    //    CReportAuthentication.Impersonate(myDoc);
                    //    CrystalReportViewer1.ReportSource = myDoc;
                    //    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    //    CrystalReportViewer1.ReportSource = myDoc;
                    //    CrystalReportViewer1.DataBind();

                    //    //MemoryStream oStream = new MemoryStream();
                    //    //oStream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.PortableDocFormat);
                    //    //MemoryStream mstream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.CrystalReport);
                    //    Stream oStream = null;
                    //    byte[] byteArray = null;
                    //    oStream = myDoc.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                    //    byteArray = new byte[oStream.Length];
                    //    oStream.Read(byteArray, 0, Convert.ToInt32(oStream.Length - 1));

                    //    Response.Clear();
                    //    Response.Buffer = true;
                    //    Response.ContentType = "application/pdf";
                    //    Response.BinaryWrite(byteArray);
                    //    // Response.End();
                    //    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    //}

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