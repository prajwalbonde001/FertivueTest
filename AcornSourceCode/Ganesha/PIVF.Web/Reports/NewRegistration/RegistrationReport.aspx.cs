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
using CrystalDecisions.Shared;
using DataBaseConfiguration;

namespace PIVF.Web.Reports.NewRegistration
{
    public partial class RegistrationReport1 : System.Web.UI.Page
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
                    long PatientID = 0;
                    long UnitID = 0;
                    int PatientGenderID = 0;
                    int PartnerGenderID = 0;
                    int PatientCategoryID = 0;
                    int PartnerID = 0;
                    string PatientFileName = null;
                    string PartnerFileName = null;
                    string IMGPatientPath1 = null;
                    string IMGPartnerPath1 = null;
                    //string pdf = "pdf";

                    if (DecodedQuery["PatientID"] != null && DecodedQuery["PatientID"] != "0")
                    {
                        PatientID = Convert.ToInt64(DecodedQuery["PatientID"]);
                    }

                    if (DecodedQuery["UnitID"] != null && DecodedQuery["UnitID"] != "0")
                    {
                        UnitID = Convert.ToInt64(DecodedQuery["UnitID"]);
                    }

                    if (DecodedQuery["PartnerID"] != null && DecodedQuery["PartnerID"] != "0")
                    {
                        PartnerID = Convert.ToInt32(DecodedQuery["PartnerID"]);
                    }

                    if (DecodedQuery["PatientGenderID"] != null && DecodedQuery["PatientGenderID"] != "0")
                    {
                        PatientGenderID = Convert.ToInt32(DecodedQuery["PatientGenderID"]);
                    }

                    if (DecodedQuery["PartnerGenderID"] != null && DecodedQuery["PartnerGenderID"] != "0")
                    {
                        PartnerGenderID = Convert.ToInt32(DecodedQuery["PartnerGenderID"]);
                    }

                    if (DecodedQuery["PatientCategoryID"] != null && DecodedQuery["PatientCategoryID"] != "0")
                    {
                        PatientCategoryID = Convert.ToInt32(DecodedQuery["PatientCategoryID"]);
                    }

                    if (DecodedQuery["PatientFileName"] != null && DecodedQuery["PatientFileName"] != "0")
                    {
                        PatientFileName = Convert.ToString(DecodedQuery["PatientFileName"]);
                    }

                    if (DecodedQuery["PartnerFileName"] != null && DecodedQuery["PartnerFileName"] != "0")
                    {
                        PartnerFileName = Convert.ToString(DecodedQuery["PartnerFileName"]);
                    }

                    //For Registration Photo
                    string NewRegistrationImgIP = ConfigurationManager.AppSettings["NewRegistrationImgIP"].ToString();
                    string NewRegistrationImgVirtualDir = ConfigurationManager.AppSettings["NewRegistrationImgVirtualDir"].ToString();
                    string NewRegistrationImgSavingLocation = ConfigurationManager.AppSettings["NewRegistrationImgSavingLocation"].ToString();

                    if (PatientFileName != "null")
                    {
                        if (PatientGenderID == 2 || PatientGenderID == 1)
                        {
                            IMGPatientPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationImgVirtualDir + "/" + PatientID + "_" + GenericSP.CurrentUser.UnitID + "_" + PatientFileName;
                            //Response.ImgPatientPath1 = IMGPatientPath1;                        
                        }
                    }

                    if (PartnerFileName != "null")
                    {
                        if (PartnerGenderID == 1 || PartnerGenderID == 2)
                        {
                            IMGPartnerPath1 = "http://" + NewRegistrationImgIP + "/" + NewRegistrationImgVirtualDir + "/" + PartnerID + "_" + GenericSP.CurrentUser.UnitID + "_" + PartnerFileName;
                            //Response.IMGPartnerPath1 = IMGPartnerPath1;                        
                        }
                    }

                    myDoc.Load(Server.MapPath("RegistrationReport.rpt"));
                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@UnitID", UnitID);

                    if (IMGPatientPath1 != null)
                    {
                        if (PatientGenderID == 2 || PatientGenderID == 1)
                        {
                            myDoc.SetParameterValue("@IMGPatientPath1", IMGPatientPath1);
                        }
                    }
                    else
                    {
                        myDoc.SetParameterValue("@IMGPatientPath1", null);
                    }

                    if (IMGPartnerPath1 != null)
                    {
                        if (PartnerGenderID == 1 || PartnerGenderID == 2)
                        {
                            myDoc.SetParameterValue("@IMGPartnerPath1", IMGPartnerPath1);
                        }
                    }
                    else
                    {
                        myDoc.SetParameterValue("@IMGPartnerPath1", null);
                    }


                    myDoc.SetDatabaseLogon(dbUserName, dbUserPassword, dbServer, dbName);
                    CReportAuthentication.Impersonate(myDoc);
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.ToolPanelView = CrystalDecisions.Web.ToolPanelViewType.None;
                    CrystalReportViewer1.ReportSource = myDoc;
                    CrystalReportViewer1.DataBind();

                    //MemoryStream oStream = new MemoryStream();
                    //oStream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.PortableDocFormat);
                    //MemoryStream mstream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.CrystalReport);

                    //if (pdf == "exel")
                    //{
                    //    Stream stream = null;
                    //    MemoryStream oStream = new MemoryStream();
                    //    stream = myDoc.ExportToStream(ExportFormatType.ExcelWorkbook);
                    //    stream.CopyTo(oStream);
                    //    //MemoryStream oStream = new MemoryStream();
                    //    //oStream = (MemoryStream)myDoc.ExportToStream(ExportFormatType.ExcelWorkbook);
                    //    Response.Clear();
                    //    Response.Buffer = true;
                    //    Response.ContentType = "application/vnd.ms-excel";
                    //    Response.BinaryWrite(oStream.ToArray());
                    //    //HttpContext.Current.ApplicationInstance.CompleteRequest();
                    //    Response.End();
                    //}
                    //else
                    //{
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
                    //}

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