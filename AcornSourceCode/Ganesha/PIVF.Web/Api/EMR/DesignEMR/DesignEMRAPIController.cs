using NLog;
using PIVF.Entities.Models.EMR.DesignEMR;
//using PIVF.Service.EMR.DesignEMR;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using PIVF.BusinessLayer.EMR.DesignEMR;
using PIVF.Entities.Models.Master.IVF;
using PIVF.Entities.Models.Patient;
using DataBaseConfiguration;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System.Web;
using PIVF.Web.Api.FileUplaodExtension;

namespace PIVF.Web.Api.EMR.DesignEMR
{
    [Authorize]
    public class DesignEMRAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        DesignEMRServiceBAL ObjSrv;
        public DesignEMRAPIController(DesignEMRServiceBAL obj)
        {
            ObjSrv = obj;
        }    
        [ResponseType(typeof(long))]
        [HttpPost]
        public IHttpActionResult SaveTemplate(DesignEMRVO _objDesignEMRVO)  
        {
            try
            {
                var Response = ObjSrv.SaveTemplate(_objDesignEMRVO);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }


        [ResponseType(typeof(long))]
        [HttpPost]
        public IHttpActionResult SaveUpdateEMRTemplate(DesignEMRVO _objDesignEMRVO)
        {
            try
            {
                var Response = ObjSrv.SaveUpdateEMRTemplate(_objDesignEMRVO);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }

        public IHttpActionResult SaveUpdateCycleTemplate(DesignEMRVO _objDesignEMRVO)
        {
            try
            {
                var Response = ObjSrv.SaveUpdateCycleTemplate(_objDesignEMRVO);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }


        [ResponseType(typeof(List<DesignEMRVO>))]
        [HttpGet]
        public IHttpActionResult GetTemplate(string TemplateName, long GenderID, long FormID, int CurrentPage)
        {
            try
            {
                var Response = ObjSrv.GetTemplate(TemplateName, GenderID, FormID, CurrentPage);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(List<CommanEntity>))]
        [HttpGet]
        public IHttpActionResult FillFormType(long GenderID)
        {
            try
            {
                var Response = ObjSrv.FillFormType(GenderID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        
        [ResponseType(typeof(DesignEMRVO))]
        [HttpGet]
        public IHttpActionResult GetTemplateByID(long ID)
        {
            try
            {
                var Response = ObjSrv.GetTemplateByID(ID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(List<DesignEMRVO>))]
        [HttpGet]
        public IHttpActionResult ListAllTemplateList(long ID)
        {
            try
            {
                var Response = ObjSrv.ListAllTemplateList(ID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(List<DesignEMRVO>))]
        [HttpGet]
        public IHttpActionResult ListAllCycleTemplateList(long ID)
        {
            try
            {
                var Response = ObjSrv.ListAllCycleTemplateList(ID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(List<DesignEMRVO>))]
        [HttpGet]
        public IHttpActionResult GetTemplateByFormID(long ID, long TempID)
        {
            try
            {
                var Response = ObjSrv.GetTemplateByFormID(ID, TempID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        
        [ResponseType(typeof(DesignEMRVO))]
        [HttpGet]
        public IHttpActionResult GetTemplateData(long ID,long UnitID)
        {
            try
            {
                var Response = ObjSrv.GetTemplateData(ID, UnitID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(long))]
        [HttpPost]
        public IHttpActionResult DeleteTemplate(DesignEMRVO _objDesignEMRVO)
        {
            try
            {
                var Response = ObjSrv.DeleteTemplate(_objDesignEMRVO);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(int))]
        [HttpPost]
        public IHttpActionResult ActiveDeactiveSave(DesignEMRVO _objDesignEMRVO)
        {
            try
            {
                var Response = ObjSrv.ActiveDeactiveSave(_objDesignEMRVO);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }
        [ResponseType(typeof(List<clsPatientImagesVO>))]
        [HttpGet]
        public List<clsPatientImagesVO> ShowUploadedImages()
        {
            return GenericSP.SelectedPatient.ListPatientImages;
        }
        [ResponseType(typeof(int))]
        [HttpPost]
        public int DeleteUploadedImages(clsPatientImagesVO clsPatientPhotoVO)
        {
            try
            {
                foreach (clsPatientImagesVO item in GenericSP.SelectedPatient.ListPatientImages.ToList())
                {
                    if(item.Name == clsPatientPhotoVO.Name)
                    {
                        GenericSP.SelectedPatient.ListPatientImages.Remove(item);
                    }
                }
                return 1;
            }
            catch(Exception e)
            {
                return 0;
            }          
        }

        [ResponseType(typeof(List<CommanEntity>))]
        [HttpGet]
        public IHttpActionResult GetSubtemplatesList(long FormID)
        {
            try
            {
                var Response = ObjSrv.GetSubtemplatesList(FormID);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                return new NotFoundResult(Request);
            }
        }




    }
}
