using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PIVF.Web.Reports.KPI
{
    public partial class KPI1 : System.Web.UI.Page
    {
        ReportDocument myDoc;
        protected void Page_Load(object sender, EventArgs e)
        {
            string str = Request.QueryString.ToString();
            string s = System.Uri.UnescapeDataString(str);
            string DecodedURL = HttpUtility.UrlDecode(s);
            var DecodedQuery = HttpUtility.ParseQueryString(DecodedURL);
            // var DecodedQuery = HttpUtility.;
            string connectionString = (string)ConfigurationManager.ConnectionStrings["PIVFContext"].ConnectionString;
            string dbUserName = ConfigurationManager.AppSettings["DBUserName"].ToString();
            String dbUserPassword = ConfigurationManager.AppSettings["DBPassword"].ToString();
            String dbServer = ConfigurationManager.AppSettings["DBServer"].ToString();
            String dbName = ConfigurationManager.AppSettings["DBName"].ToString();
            myDoc = new ReportDocument();
            myDoc.Load(Server.MapPath("KPI.rpt"));
            int UnitID = 2;
            //byte[] Image = null;

            if (DecodedQuery["U"] != null && DecodedQuery["U"] != "0")
            {
                UnitID = Convert.ToInt16(DecodedQuery["U"]);
            }

            myDoc.SetParameterValue("@UnitID", UnitID, "UnitHeader.rpt");
            myDoc.SetParameterValue("@UnitID", UnitID);

            // myDoc.SetParameterValue("UnitID",UnitID);
            // myDoc.SetParameterValue("Image", Image);

            myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
            CReportAuthentication.Impersonate(myDoc);
            CrystalReportViewer1.ReportSource = myDoc;
            CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
            CrystalReportViewer1.ReportSource = myDoc;
            CrystalReportViewer1.DataBind();

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