using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.Donor;
using PIVF.Entities.Models.Donor;
using PIVF.Entities.Models.EMR.MaleHistory;
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

namespace PIVF.Web.Api.Donor
{
    [Authorize]
    public class DonorAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        DonorBL _DonorBL;
        public DonorAPIController(DonorBL Obj)
        {
            _DonorBL = Obj;

        }
        [ResponseType(typeof(List<DonorVO>))]
        [HttpGet]
        public IHttpActionResult FillDonorList(int PageIndex, string DonorCode,long AgencyID, long BloodGroupID, long EyeColorID, long HairColorID, long SkinColorID, long HeightID, long BuiltID, bool IsPageEnable)
        {
            try
            {
                var Response = _DonorBL.FillDonorList(PageIndex, DonorCode, AgencyID, BloodGroupID, EyeColorID, HairColorID, SkinColorID, HeightID, BuiltID, IsPageEnable);
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
        public IHttpActionResult SaveDonor(DonorVO Donor)
        {
            try
            {
                var Response = _DonorBL.SaveDonor(Donor);
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

        [HttpGet]                  //Added by Nayan Kamble
        public IHttpActionResult GetSemenFreezListByFormNo(String FormNo, string Action, long ID, long UnitID)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                dynamic Response = new List<SemenFreez>();    
                if (Action == "SpremFreezing" || Action == "SpremFreezingFromDonor")
                {
                    Response = _DonorBL.GetSemenFreezListByFormNo(FormNo, Action, ID, UnitID);
                }
                else
                {
                    Response = new List<SemenFreezDetails>();
                    Response = _DonorBL.GetSemenFreezDetailListByFormNo(FormNo, Action, ID, UnitID);

                }
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
