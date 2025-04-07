using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.Billing;
using PIVF.Entities.Models.Billing;
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

namespace PIVF.Web.Api.Billing
{
    public class PatientAdvanceRefundAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        IPatientAdvanceRefundBAL srv;
        public PatientAdvanceRefundAPIController(IPatientAdvanceRefundBAL _srv)
        {
            srv = _srv;
        }

        [ResponseType(typeof(int))]
        [HttpPost]

        public IHttpActionResult savePatientAdvanceRefund(PatientAdvanceRefundVO obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.savePatientAdvanceRefund(obj);
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

        [ResponseType(typeof(List<PatientAdvanceRefundVO>))]
        [HttpGet]
        public IHttpActionResult FillRefundList(int PatientID, int PatientUnitID)
        {
            try
            {
                var Response = srv.FillRefundList(PatientID, PatientUnitID);
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


        // Added By Chetan 12-12-2024

        [ResponseType(typeof(RefundList))]
        [HttpPost]
        public IHttpActionResult GetPatientRefundList(string[] RefundLists, int index, bool PgEn)
        {
            try
            {
                // Initialize totalCount to store the count of records
                int totalCount = 0;

                // Log the request details
                logger.Info("Controller Name:RefundCtrl, Action:HttpGet, Method:GetPatientRefundList, User:{0}, UnitID:{1}",
                            GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);


                var response = srv.GetPatientRefundList(RefundLists, index, PgEn, out totalCount);

                // Create a response object with the list and the total count
                var result = new
                {
                    AdvanceList = response,
                    TotalCount = totalCount
                };

                // Return the result as a 200 OK response
                return Ok(result);
            }
            catch (SqlException ex)
            {
                // Log SQL exceptions
                logger.Error("RefundAPI/GetPatientRefundList Message:{0}, StackTrace:{1}", ex.Message, ex.StackTrace);
                // Return a NotFoundResult for SQL exceptions
                return new NotFoundResult(Request);
            }
            catch (Exception objException)
            {
                // Log generic exceptions
                logger.Error("RefundAPI/GetPatientRefundList Message:{0}, StackTrace:{1}", objException.Message, objException.StackTrace);
                // Return a NotFoundResult for general exceptions
                return new NotFoundResult(Request);
            }
        }

        //Added by Tejas Saxena on 20/12/2024
        [ResponseType(typeof(List<BillVO>))]
        [HttpGet]
        public IHttpActionResult GetPatientDetails(int PatID, int PatUnitID)
        {
            try
            {

                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                     ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetPatientDetails(PatID, PatUnitID);
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
        //Added by Tejas Saxena on 20/12/2024
        [ResponseType(typeof(List<BillVO>))]
        [HttpGet]
        public IHttpActionResult GetPatientDetailsForBillRefund(int PatID, int PatUnitID)
        {
            try
            {

                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                     ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetPatientDetailsForBillRefund(PatID, PatUnitID);
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


        [ResponseType(typeof(List<BillVO>))]
        [HttpGet]
        public IHttpActionResult GetPatientDetailsForBillCancellation(long BillID)
        {
            try
            {

                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                     ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.GetPatientDetailsForBillCancellation(BillID);
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
        // Added By Chetan 19-12-2024   Add Or Update Refund For == "Bill" (Refund Against Bill)

        [ResponseType(typeof(int))]
        [HttpPost]

        public IHttpActionResult AddOrUpdateRefundForBill(PatientBillRefundVO obj)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" + HttpContext.Current.Request.HttpMethod +
                 ",Method:" + this.ControllerContext.RouteData.Values["action"] + ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
                var Response = srv.AddOrUpdateRefundForBill(obj);
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

        // Added By Chetan 23-12-2024

        [ResponseType(typeof(List<BillDetails>))]
        [HttpGet]
        public IHttpActionResult GetBillAndServiceLIst(int? PatientID, int? PatientUnitID, int? BillID, int? BillUnitID)
        {
            try
            {
                var Response = srv.GetBillAndServiceLIst(PatientID, PatientUnitID, BillID, BillUnitID);
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

    }
}