using DataBaseConfiguration;
using Microsoft.Reporting.WebForms;
using PIVF.BusinessLayer.EMR.Prescription;
using PIVF.Entities.Models.EMR.Prescription;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Formatters.Binary;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.EMR.Prescription
{
    [Authorize]
    public class PrescriptionAPIController : ApiController
    {
        PrescriptionBL _PrescriptionBL;
        public PrescriptionAPIController(PrescriptionBL Obj)
        {
            _PrescriptionBL = Obj;
        }
        [ResponseType(typeof(List<CommanEntity>))]
        [HttpGet]
        public List<CommanEntity> GetDrugList(long UnitID)
        {
            List<CommanEntity> List = new List<CommanEntity>();
            try
            {              
                List = _PrescriptionBL.GetDrugList(UnitID);
                return List;
            }
            catch (SqlException ex)
            {
                List = null;
                return List;
            }
            catch (Exception ex)
            {
                List = null;
                return List;
            }
        }
        [ResponseType(typeof(List<TemplateForPrescriptionVO>))]
        [HttpGet]
        public List<TemplateForPrescriptionVO> GetTemplateAndItems()
        {
            List<TemplateForPrescriptionVO> List = new List<TemplateForPrescriptionVO>();
            try
            {
                List = _PrescriptionBL.GetTemplateAndItems();
                return List;
            }
            catch (SqlException ex)
            {
                List = null;
                return List;
            }
            catch (Exception ex)
            {
                List = null;
                return List;
            }
        }        
        [ResponseType(typeof(DrugVO))]
        [HttpGet]
        public DrugVO GetDrugDetailByItemID(long ID, long UnitID)
        {
            DrugVO Obj = new DrugVO();
            try
            {
                Obj = _PrescriptionBL.GetDrugDetailByItemID(ID, UnitID);
                return Obj;
            }
            catch (SqlException ex)
            {
                Obj = null;
                return Obj;
            }
            catch (Exception ex)
            {
                Obj = null;
                return Obj;
            }
        }
        [ResponseType(typeof(PrescriptionVO))]
        [HttpGet]
        public PrescriptionVO GetTodaysPrescriptionDetails()
        {
            PrescriptionVO Obj = new PrescriptionVO();
            try
            {
                Obj = _PrescriptionBL.GetTodaysPrescriptionDetails();
                return Obj;
            }
            catch (SqlException ex)
            {
                Obj = null;
                return Obj;
            }
            catch (Exception ex)
            {
                Obj = null;
                return Obj;
            }
        }       
        [ResponseType(typeof(List<DrugVO>))]
        [HttpGet]
        public List<DrugVO> GetPreviousPrescriptionDetails()
        {
            List<DrugVO> List = new List<DrugVO>();
            try
            {
                List = _PrescriptionBL.GetPreviousPrescriptionDetails();
                return List;
            }
            catch (SqlException ex)
            {
                List = null;
                return List;
            }
            catch (Exception ex)
            {
                List = null;
                return List;
            }
        }
        [ResponseType(typeof(long))]
        [HttpPost]
        public long SavePrescription(PrescriptionVO PrescriptionVO)
        {
            long ID = 0;
            try
            {
                ID = _PrescriptionBL.SavePrescription(PrescriptionVO);
                return ID;
            }
            catch (SqlException ex)
            {
                ID = 0;
                return ID;
            }
            catch (Exception ex)
            {
                ID = 0;
                return ID;
            }
        }       
        [ResponseType(typeof(long))]
        [HttpPost]
        public int SaveFavDrug(PrescriptionVO PrescriptionVO)
        {
            int ID = 0;
            try
            {
                ID = _PrescriptionBL.SaveFavDrug(PrescriptionVO);
                return ID;
            }
            catch (SqlException ex)
            {
                ID = 0;
                return ID;
            }
            catch (Exception ex)
            {
                ID = 0;
                return ID;
            }
        }
        [ResponseType(typeof(long))]
        [HttpPost]
        public int DeleteFavDrug(DrugVO DrugVO)
        {
            int ID = 0;
            try
            {
                ID = _PrescriptionBL.DeleteFavDrug(DrugVO);
                return ID;
            }
            catch (SqlException ex)
            {
                ID = 0;
                return ID;
            }
            catch (Exception ex)
            {
                ID = 0;
                return ID;
            }
        }
        [ResponseType(typeof(List<CommanEntity>))]
        [HttpGet]
        public List<CommanEntity> GetTemplateList()
        {
            List<CommanEntity> List = new List<CommanEntity>();
            try
            {
                List = _PrescriptionBL.GetTemplateList();
                return List;
            }
            catch (SqlException ex)
            {
                List = null;
                return List;
            }
            catch (Exception ex)
            {
                List = null;
                return List;
            }

        }
        [ResponseType(typeof(List<CommanEntity>))]
        [HttpGet]
        public List<FrequencyVO> FillFrequency()
        {
            List<FrequencyVO> List = new List<FrequencyVO>();
            try
            {
                List = _PrescriptionBL.FillFrequency();
                return List;
            }
            catch (SqlException ex)
            {
                List = null;
                return List;
            }
            catch (Exception ex)
            {
                List = null;
                return List;
            }

        }
        
        [ResponseType(typeof(long))]
        [HttpGet]
        public long CheckMoleculeIsAllergies(long ID)
        {
            long Obj = 1;
            try
            {
                Obj = _PrescriptionBL.CheckMoleculeIsAllergies(ID);
                return Obj;
            }
            catch (SqlException ex)
            {
                Obj = 1;
                return Obj;
            }
            catch (Exception ex)
            {
                Obj = 1;
                return Obj;
            }
        }

        [Authorize]
        [HttpGet]            
        public HttpResponseMessage ShowReport()
        {
            byte[] bytes=null;
            try
            {           
                using (var reportViewer = new ReportViewer())
                {
                    reportViewer.ProcessingMode = ProcessingMode.Local;                  
                    reportViewer.LocalReport.ReportPath = "Reports\\EMR\\PP.rdlc";
                    string connn = @"Data Source = 192.168.1.5\SQL2014; Initial Catalog = Gunasheela; User id = sa; Password = Rational@10";
                    DataTable dtCustomers = new DataTable("Customers");

                    using (SqlConnection con = new SqlConnection(connn))
                    {
                        using (SqlCommand cmd = new SqlCommand(GenericSP.PatientPrescription, con))
                        {
                            con.Open();
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@UnitID", GenericSP.CurrentUser.UnitID);
                            cmd.Parameters.AddWithValue("@VisitID", GenericSP.SelectedPatient.VisitID);
                            cmd.Parameters.AddWithValue("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
                            cmd.Parameters.AddWithValue("@PatientID", GenericSP.SelectedPatient.ID);
                            cmd.Parameters.AddWithValue("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
                            
                            using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                            {
                                using (DataTable dt = new DataTable())
                                {
                                    sda.Fill(dt);
                                    reportViewer.Visible = true;
                                    reportViewer.LocalReport.ReportPath = "Reports\\EMR\\PP.rdlc";
                                    reportViewer.LocalReport.DataSources.Clear();
                                    reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", dt));
                                    reportViewer.LocalReport.SubreportProcessing +=   new SubreportProcessingEventHandler(SubreportProcessingEventHandler);
                                   
                                }
                            }                          
                        }
                    }           
                    Warning[] warnings;
                    string[] streamids;
                    string mimeType;
                    string encoding;
                    string extension;
                    string cdir = Directory.GetCurrentDirectory();
                    bytes = reportViewer.LocalReport.Render("Pdf", null, out mimeType, out encoding, out extension, out streamids, out warnings);
                                    
                }
                var cd = new System.Net.Mime.ContentDisposition
                {
                    FileName = string.Format("SampleReport.pdf"),
                    Inline = true,
                };    
            }
            catch (Exception e)   {
                return  new HttpResponseMessage(HttpStatusCode.NotFound);
            }  
                     
        
            var result = new HttpResponseMessage(HttpStatusCode.OK);
            Stream stream = new MemoryStream(bytes);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");

            return result;          
        }
        void SubreportProcessingEventHandler(object sender, SubreportProcessingEventArgs e)
        {
            byte[] bytes = null;
            try
            {
                using (var reportViewer = new ReportViewer())
                {
                    reportViewer.ProcessingMode = ProcessingMode.Local;
                    reportViewer.LocalReport.ReportPath = "Reports\\EMR\\UnitDetails.rdlc";
                    string connn = @"Data Source = 192.168.1.5\SQL2014; Initial Catalog = Gunasheela; User id = sa; Password = Rational@10";
                     DataTable dtCustomers = new DataTable("Patient");

                    using (SqlConnection con = new SqlConnection(connn))
                    {
                        using (SqlCommand cmd = new SqlCommand(GenericSP.RP_UnitDetails, con))
                        {
                            con.Open();
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@UnitID", GenericSP.CurrentUser.UnitID);                           

                            using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                            {
                                using (DataTable dt = new DataTable())
                                {                                  
                                    sda.Fill(dt);
                                    //DataRow row = dt.NewRow();                                     
                                    
                                    //object field = dt.Rows[0][6];
                                    //byte[] rs = (byte[])field;
                                   
                                    // string str = "";
                                    //if (!string.IsNullOrEmpty(Convert.ToString(rs)))
                                    //{
                                    //     str = System.Text.Encoding.UTF8.GetString(rs);
                                    //}
                                    //dt.Rows[0][6] = str;
                                    reportViewer.Visible = true;
                                    reportViewer.LocalReport.ReportPath = "Reports\\EMR\\UnitDetails.rdlc";
                                    reportViewer.LocalReport.DataSources.Clear();
                                   // reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet2", dt));
                                   // reportViewer.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(SubreportProcessingEventHandler);
                                    e.DataSources.Add(new ReportDataSource("DataSet2", dt));

                                }
                            }
                        }
                    }
                  
                }
            }
            catch(Exception e1)
            {

            }
        }

        [HttpGet]
        public string getAllergyMolecules()
        {
            string allMolecule = "";
            List<CommanEntity> List = new List<CommanEntity>();
            try
            {
                allMolecule = _PrescriptionBL.getAllergyMolecules();
            }
            catch (SqlException ex)
            {

            }
            catch (Exception ex)
            {

            }
            return allMolecule;
        }
    }
}
