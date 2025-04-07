using DataBaseConfiguration;
using NLog;
using PIVF.BusinessLayer.CounterSale;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Models.CounterSale;
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
using System.Web.Script.Serialization;
using PIVF.Entities.Models.Master.Inventory;
using PIVF.Entities.Models.Inventory;
using System.Data;
using PIVF.Entities.Models.Patient;
using PIVF.DataAccessLayer.Patient;
using PIVF.Entities.Models.Billing;

namespace PIVF.Web.Api.CounterSale
{
    public class CounterSaleAPIController : ApiController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        CounterSaleBAL srv;

        public object ObjCurrentUser { get; private set; }

        public CounterSaleAPIController(CounterSaleBAL _srv)
        {

            srv = _srv;
        }


        [ResponseType(typeof(List<ItemMasterVO>))]
        [HttpGet]
        public List<ItemMasterVO> GetItemListofStore(long StoreID)
        {
            List<ItemMasterVO> List = new List<ItemMasterVO>();
            try
            {
                List = srv.GetItemListofStore(StoreID);
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


        [ResponseType(typeof(List<ItemStockVO>))]
        [HttpGet]
        public List<ItemStockVO> GetItemBatchwiseStock(long ItemID, long UnitID, long StoreID)
        {

            List<ItemStockVO> List = new List<ItemStockVO>();
            try
            {
                List = srv.GetItemBatchwiseStock(ItemID, UnitID, StoreID);
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

        [ResponseType(typeof(List<ItemMasterVO>))]
        [HttpGet]
        public ItemMasterVO GetItemDetailsByID(long ItemID, long StoreID)
        {

            ItemMasterVO ObjItemMasterVO = new ItemMasterVO();
            try
            {
                ObjItemMasterVO = srv.GetItemDetailsByID(ItemID, StoreID);
                return ObjItemMasterVO;
            }
            catch (SqlException ex)
            {
                ObjItemMasterVO = null;
                return ObjItemMasterVO;
            }
            catch (Exception ex)
            {
                ObjItemMasterVO = null;
                return ObjItemMasterVO;

            }
        }


        [ResponseType(typeof(List<clsConversionsVO>))]
        [HttpGet]
        public clsConversionsVO GetItemUOMConversionsByID(long ItemId)
        {
            clsConversionsVO objConversion = new clsConversionsVO();
            //List<clsConversionsVO> List = new List<clsConversionsVO>();
            try
            {
                objConversion = srv.GetItemUOMConversionsByID(ItemId);
                return objConversion;
            }
            catch (SqlException ex)
            {
                objConversion = null;
                return objConversion;
            }
            catch (Exception ex)
            {
                objConversion = null;
                return objConversion;

            }
        }


        [HttpPost]
        public IHttpActionResult SaveCounterSaleBill([FromBody] BillVO objBill)
        {
            try
            {
                logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
             HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
             ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);

                var Response = srv.SaveCounterSaleBill(objBill);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }


        [ResponseType(typeof(PatientVisit))]
        [HttpGet]

        //public IHttpActionResult GetPatientDetails(string Criteria, bool IsAppSearch)//Commented by AniketK on 28Nov2019
        public IHttpActionResult GetPatientDetails(string Criteria, bool IsAppSearch, int RegUnitID)
        {
            logger.Info("Controller Name:" + this.ControllerContext.RouteData.Values["controller"] + ",Action:" +
            HttpContext.Current.Request.HttpMethod + ",Method:" + this.ControllerContext.RouteData.Values["action"] +
            ",User:{0},UnitID:{1}", GenericSP.CurrentUser.LoginName, GenericSP.CurrentUser.UnitID);
            try
            {
                //var Response = PatVisitSer.GetPatientDetails(Criteria, IsAppSearch);
                var Response = srv.GetPatientDetails(Criteria, IsAppSearch, RegUnitID);
                return Ok(Response);
            }
            catch (Exception ex)
            {
                logger.Error(this.ControllerContext.RouteData.Values["controller"] + "/"
               + this.ControllerContext.RouteData.Values["action"] + ",Message{0},StackTrace:{1}",
               ex.Message, ex.StackTrace);
                throw ex;
            }
        }


    }
}