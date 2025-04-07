using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.ARTMgmt.Cryo_Preservation
{
    [Authorize]
    public class CryoPreservationAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        CryoPreservationBL _CryoPreservationBL;
        public CryoPreservationAPIController(CryoPreservationBL Obj)
        {
            _CryoPreservationBL = Obj;
        }
       
        [HttpPost]
        [ResponseType(typeof(int))]
        public IHttpActionResult SaveOocyteVitrification(List<IVF_VitrificationDetailsVO> IVF_VitrificationVO)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.SaveOocyteVitrification(IVF_VitrificationVO));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }


        [HttpPost]
        [ResponseType(typeof(int))]
        public IHttpActionResult InsertUpdateOocytrEmbryoVitrification(List<IVF_VitrificationDetailsVO> IVF_VitrificationVO)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.InsertUpdateOocytrEmbryoVitrification(IVF_VitrificationVO));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }


        [ResponseType(typeof(IVF_VitrificationVO))]
        [HttpGet]
        public IHttpActionResult GetVitriDetails(bool IsOnlyVitrification, bool IsForThawTab)
        {
            try
            {
                var Response = _CryoPreservationBL.GetVitriDetails(IsOnlyVitrification,IsForThawTab);
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

        [ResponseType(typeof(List<OocyteThawingVO>))]
        [HttpGet]
        public IHttpActionResult GetVitrificationSummaryList()
        {
            try
            {
                var Response = _CryoPreservationBL.GetVitrificationSummaryList();
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

        [ResponseType(typeof(IVF_VitrificationVO))]
        [HttpGet]
        //public IHttpActionResult GetVitrificationDetailsOocyteBank(int PageIndex,bool IsSinglePatient, int UnitID, int TankID, int CanisterID, int ColorCodeID, int GobletSizeId, string NameCodeMRNo, bool IsShowDiscard, string StatusOption,string Action, int IsExpired)  // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        public IHttpActionResult GetVitrificationDetailsOocyteBank(int PageIndex, bool IsSinglePatient, int UnitID, int TankID, int CanisterID, int ColorCodeID, int GobletSizeId, string NameCodeMRNo, bool IsShowDiscard, string StatusOption, string Action, int IsExpired, int NearExpiryDays)  // Modified on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        {
            try
            {
                //var Response = _CryoPreservationBL.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID,  TankID,  CanisterID,  ColorCodeID,  GobletSizeId,  NameCodeMRNo,  IsShowDiscard, StatusOption, Action, IsExpired);            // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
                var Response = _CryoPreservationBL.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, IsExpired, NearExpiryDays);    // Modified on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
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

        [ResponseType(typeof(IVF_VitrificationVO))]
        [HttpGet]
        public IHttpActionResult GetVitrificationBankhistory(int UnitID, int VitrificationID, int VitrificationUnitID, int EmbNumber, int EmbSerialNumber,string Action)
        {
            try
            {
                var Response = _CryoPreservationBL.GetVitrificationBankHistory( UnitID, VitrificationID,VitrificationUnitID,EmbNumber,EmbSerialNumber,Action);
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


        [HttpPost]
        [ResponseType(typeof(int))]
        public IHttpActionResult SaveOocyteThawing(List<OocyteThawingVO> lstObj)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.SaveOocyteThawing(lstObj));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }



        [HttpPost]
        [ResponseType(typeof(int))]
        public IHttpActionResult SaveTransportDetails(IVF_VitrificationDetailsVO lstObj)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.SaveTransportDetails(lstObj));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        [HttpGet]
        [ResponseType(typeof(List<clsPatientVO>))]
        public IHttpActionResult GetDonorList()
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.GetDonorList());
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        [ResponseType(typeof(List<IVF_VitrificationDetailsVO>))]
        public IHttpActionResult GetVitrificationDetails(long VitriFicationID,long VitriFicationUnitID)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.GetVitrificationDetails(VitriFicationID, VitriFicationUnitID));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }
        [HttpGet]
        [ResponseType(typeof(List<IVF_VitrificationDetailsVO>))]
        public IHttpActionResult GetEmbriyoVitrificationDetails(long VitriFicationID, long VitriFicationUnitID)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.GetEmbriyoVitrificationDetails(VitriFicationID, VitriFicationUnitID));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpPost]
        [ResponseType(typeof(List<long>))]
        public IHttpActionResult TransferDonorOocytestoCouple(List<IVF_VitrificationDetailsVO> TransferList)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.TransferDonorOocytestoCouple(TransferList));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpPost]
        [ResponseType(typeof(List<long>))]
        public IHttpActionResult TransferDonorEmbriyostoCouple(List<IVF_VitrificationDetailsVO> TransferList)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.TransferDonorEmbriyostoCouple(TransferList));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        [ResponseType(typeof(List<long>))]
        public IHttpActionResult DonateOocytefromBank(long VitrivicationID, long VitrificationUnitID,long VitrificationDetailID,string VitrificationNo, long TransferDonorID,long TransferDonorUnitID)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.DonateOocytefromBank(VitrivicationID, VitrificationUnitID, VitrificationDetailID, VitrificationNo, TransferDonorID, TransferDonorUnitID));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [HttpGet]
        [ResponseType(typeof(List<long>))]
        public IHttpActionResult DonateEmbryofromBank(long VitrivicationID, long VitrificationUnitID, long VitrificationDetailID, string VitrificationNo, long TransferDonorID, long TransferDonorUnitID)
        {
            try
            {
                //Store The logs
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                            ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                return Ok(_CryoPreservationBL.DonateEmbryofromBank(VitrivicationID, VitrificationUnitID, VitrificationDetailID, VitrificationNo, TransferDonorID, TransferDonorUnitID));
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }

        [ResponseType(typeof(int))]
        [HttpGet]
        public IHttpActionResult CheckDuplicateFreezingNo(string Item,bool Flag)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = _CryoPreservationBL.CheckDuplicateFreezingNo(Item,Flag);
                return Ok(Response);
            }
            catch (SqlException ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/" + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}", ex.Message, ex.StackTrace);
                return new NotFoundResult(Request);
            }
        }        

    }
}
