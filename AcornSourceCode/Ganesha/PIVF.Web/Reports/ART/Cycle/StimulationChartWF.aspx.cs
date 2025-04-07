using System;
using System.Web;
using System.Configuration;
using CrystalDecisions.CrystalReports.Engine;
using System.IO;
using System.Threading;
using DataBaseConfiguration;

namespace PIVF.Web.Reports.ART.Cycle
{
    public partial class StimulationChartWF : System.Web.UI.Page
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
                     myDoc.Load(Server.MapPath("StimulationChartDetailReport.rpt"));
                    //  long UnitID = 0;
                    long TherapyUnitID = 0;
                    long TherapyID = 0;
                    long PatientID = 0;
                    long PatientUnitID = 0;
                    long CopuleID;
                    long CopuleUnitID;
                    long VisitID;
                    long VisitUnitID;
                    int ArtSubTypeID;

                    PatientID = GenericSP.SelectedCouple.FemalePatient.FemalePatientID;
                    PatientUnitID = GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID;
                    TherapyID = GenericSP.SelectedCouple.FemalePatient.TherapyID;
                    TherapyUnitID = GenericSP.SelectedCouple.FemalePatient.TherapyUnitID;
                    CopuleID = GenericSP.SelectedCouple.FemalePatient.FemalePatientID;
                    CopuleUnitID = GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID;
                    VisitID = GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                    VisitUnitID = GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                    ArtSubTypeID = GenericSP.SelectedCouple.FemalePatient.ArtSubTypeID; 
                    
                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "UnitHeader.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "SubGetStimulationChartSizeDetails");
                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "SubGetStimulationChartSizeDetails");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "SubGetStimulationChartSizeDetails");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "SubGetStimulationChartSizeDetails");
                    myDoc.SetParameterValue("@CopuleID", CopuleID, "SubGetStimulationChartSizeDetails");
                    myDoc.SetParameterValue("@CopuleUnitID", CopuleUnitID, "SubGetStimulationChartSizeDetails");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubGetStimulationChartSizeDetails");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "SubGetStimulationChartSizeDetails");

                    myDoc.SetParameterValue("@PatientID", PatientID, "GetDrugDetailsStimulationChart");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "GetDrugDetailsStimulationChart");
                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "GetDrugDetailsStimulationChart");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "GetDrugDetailsStimulationChart");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "GetDrugDetailsStimulationChart");
                    myDoc.SetParameterValue("@VisitID", VisitID, "GetDrugDetailsStimulationChart");
                    myDoc.SetParameterValue("@VisitUnitID", VisitUnitID, "GetDrugDetailsStimulationChart");

                    myDoc.SetParameterValue("@PatientID", PatientID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@PatientUnitID", PatientUnitID, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@VisitID", null, "PatientCommon.rpt");
                    myDoc.SetParameterValue("@TherapyID", TherapyID, "SubRptTherapyDetails.rpt");
                    myDoc.SetParameterValue("@TherapyUnitID", TherapyUnitID, "SubRptTherapyDetails.rpt");

                    myDoc.SetParameterValue("@PatientID", PatientID, "SubGetDonorDetails");
                    myDoc.SetParameterValue("@UnitID", PatientUnitID, "SubGetDonorDetails");
                    myDoc.SetParameterValue("@VisitID", VisitID, "SubGetDonorDetails");
                    myDoc.SetParameterValue("@visitUnitID", VisitUnitID, "SubGetDonorDetails");
                    
                    myDoc.SetParameterValue("@PatientID", PatientID);
                    myDoc.SetParameterValue("@UnitID", PatientUnitID);
                    myDoc.SetParameterValue("@VisitID", ArtSubTypeID);

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