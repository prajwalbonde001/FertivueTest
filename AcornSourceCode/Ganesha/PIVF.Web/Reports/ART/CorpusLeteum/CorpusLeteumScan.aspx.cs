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

namespace PIVF.Web.Reports.ART.CorpusLeteum
{
    public partial class CorpusLeteumScan1 : System.Web.UI.Page
    {
        ReportDocument myDoc;
        protected void Page_Load(object sender, EventArgs e)
        {
            {
                try
                {
                    if (Session["Currentuser"] != null)
                    {
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

                        myDoc.Load(Server.MapPath("CorpusLeteumScan.rpt"));
                        //long VisitUnitID = 0;
                        //long VisitID = 0;
                        long TherapyUnitID = 0;
                        long TherapyID = 0;
                        long PatientID = 0;
                        long PatientUnitID = 0;
                        // long ID = 0;

                        if (DecodedQuery["P"] != null && DecodedQuery["P"] != "0")
                        {
                            PatientID = Convert.ToInt64(DecodedQuery["P"]);
                        }
                        if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
                        {
                            PatientUnitID = Convert.ToInt64(DecodedQuery["U"]);
                        }
                        if (DecodedQuery["Th"] != null && DecodedQuery["Th"] != "0")
                        {
                            TherapyID = Convert.ToInt64(DecodedQuery["Th"]);
                        }
                        if (DecodedQuery["THU"] != null && DecodedQuery["THU"] != "0")
                        {
                            TherapyUnitID = Convert.ToInt64(DecodedQuery["THU"]);
                        }
                        //if (DecodedQuery["Id"] != null && DecodedQuery["Id"] != "0")
                        //{
                        //    ID = Convert.ToInt64(DecodedQuery["Id"]);
                        //}

                        myDoc.SetParameterValue("@UnitID", PatientUnitID, "UnitHeader.rpt");
                        myDoc.SetParameterValue("@PatientID", PatientID);
                        myDoc.SetParameterValue("@PatientUnitID", PatientUnitID);
                        myDoc.SetParameterValue("@TherapyID", TherapyID);
                        myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID);

                        myDoc.SetParameterValue("@PatientID", PatientID, "PatientData");
                        myDoc.SetParameterValue("@UnitID", PatientUnitID, "PatientData");
                        myDoc.SetParameterValue("@TherapyID", TherapyID, "PatientData");
                        myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "PatientData");



                        myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                        CReportAuthentication.Impersonate(myDoc);
                        CrystalReportViewer1.ReportSource = myDoc;
                        CrystalReportViewer1.RefreshReport();
                        CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
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