using PIVF.BusinessLayer.ARTMgmt.ReportUpload;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.ARTMgmt.ReportUpload;
using Dapper;
using DataBaseConfiguration;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Net;
using System.Drawing;
using System.IO;
using System.Web;
//using System.Web.UI;
//using System.Web.UI.Webcontrols;
using static System.Net.Mime.MediaTypeNames;

using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Web.Mvc;
using System.Configuration;

namespace PIVF.DataAccessLayer.ARTMgmt.ReportUpload
{
    public class ReportUploadDAL : ReportUploadBL
    {
        private Database dbServer = null;
        IDbConnection con;
        public ReportUploadDAL()
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public int UploadReport(ReportUploadVO obj)
        {
            //int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "UploadReport");
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@ReportCatID", obj.ReportCatID);
            Param.Add("@ReportDate", obj.ReportDate);
            Param.Add("@IsFromDatabase", obj.IsFromDatabase);
            if (obj.IsFromDatabase == true)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(obj.strReport)))
                {

                    obj.Report = System.Text.Encoding.UTF8.GetBytes(obj.strReport);
                    Param.Add("@Data", obj.Report);
                }
                //else      //commented sujata for image file system
                //{
                //    Param.Add("@Data", SqlDbType.VarBinary, null);
                //}
            }
            else
            {

                Param.Add("@Data", SqlDbType.NVarChar, null);
            }
           
            Param.Add("@Name", obj.Name);
            Param.Add("@ServiceID", obj.ServiceID);
            Param.Add("@FileName",obj.FileName);
            Param.Add("@IMGPathReport", obj.IMGPathReport);
            Param.Add("@IsFinalize", obj.IsFinalize);
            Param.Add("@Remark", obj.Remark);
            Param.Add("@ResValue", obj.ResValue);
            Param.Add("@AddedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@ImageID", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.UploadReport, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            obj.ImageID = Param.Get<Int32>("@ImageID");
            
           
            return Param.Get<Int32>("@ResultStatus");
            
        }

        public int MarkImportant(ReportUploadVO obj)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "MarkImportant");
            Param.Add("@ID",obj.ID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@IsImportant", obj.IsImportant);
            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.UploadReport, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Status = Param.Get<Int32>("@ResultStatus");
        }

        public int DeleteReport(ReportUploadVO obj)
        {
            int Status = 0;
            var Param = new DynamicParameters();
            Param.Add("@Action", "DeleteReport");
            Param.Add("@ID", obj.ID);
            Param.Add("@ImageID", obj.ID);   // added sujata for delete 
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.UploadReport, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Status = Param.Get<Int32>("@ResultStatus");
        }

        public List<ReportUploadVO> GetReportList(int idx, DateTime? FD, DateTime? TD, int Cat, string NM)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetReportList");
            Param.Add("@PatientID", GenericSP.SelectedPatient.ID);
            Param.Add("@PatientUnitID", GenericSP.SelectedPatient.UnitID);
            Param.Add("@PageIndex", idx);
            Param.Add("@FromDate", FD);
            Param.Add("@ToDate", TD);
            Param.Add("@ReportCatID", Cat);
            Param.Add("@Name", NM);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@ImageID", dbType: DbType.Int32, direction: ParameterDirection.Output);

            return this.con.Query<ReportUploadVO>(GenericSP.UploadReport, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        public tmpReport ViewReport(ReportUploadVO obj)
        {
            string Report = "";
            tmpReport tmpobj = new tmpReport();
            var Param = new DynamicParameters();
            Param.Add("@Action", "ViewReport");
            Param.Add("@ID", obj.ID);
            Param.Add("@UnitID", obj.UnitID);
            Param.Add("@IMGPathReport", obj.IMGPathReport);
            Param.Add("@IsFromDatabase", obj.IsFromDatabase);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@ImageID", dbType: DbType.Int32, direction: ParameterDirection.Output);

            tmpobj = this.con.Query<tmpReport>(GenericSP.UploadReport, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            tmpobj.IMGPathReport = obj.IMGPathReport;
           

            Param.Add("@IMGPathReport", tmpobj.IMGPathReport);
            if (tmpobj.IsFromDatabase == true)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(tmpobj.Report)))
                {
                    tmpobj.strReport = System.Text.Encoding.UTF8.GetString(tmpobj.Report);
                    tmpobj.IsFromDatabase = true;
                }
            }

            return tmpobj;
            //return Report;
        }

        public List<tmpService> fillCatwiseServiceList(int catID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCatwiseServiceList");
            Param.Add("@CategoryID", catID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            //Param.Add("@ID", ImageID);
            Param.Add("@ImageID", dbType: DbType.Int32, direction: ParameterDirection.Output);

            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<tmpService>(GenericSP.UploadReport, Param, commandType: CommandType.StoredProcedure).ToList();
        }
        public List<tmpService> fillPathoServiceList(int catID,int GenderID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPathoServiceList");
            Param.Add("@CategoryID", catID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@GenderID", GenderID);
            //Param.Add("@ID", ImageID);
            Param.Add("@ImageID", dbType: DbType.Int32, direction: ParameterDirection.Output);

            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<tmpService>(GenericSP.UploadReport, Param, commandType: CommandType.StoredProcedure).ToList();
        }

        //public byte[] CompressImage(string PhotoString)
        //{
        //    string base64String;
        //    string  [] abc  = PhotoString.Split(',');
        //    //byte[] byteimage = System.Text.Encoding.UTF8.GetBytes(PhotoString);
        //    byte[] byteimage = System.Text.Encoding.UTF8.GetBytes(abc[1]);
        //    Stream ms = new MemoryStream();
        //    ms.Write(byteimage, 78, byteimage.Length - 78);
        //    System.Drawing.Image image = System.Drawing.Image.FromStream(ms);
        //    using (System.Drawing.Image thumbnail = image.GetThumbnailImage(150, 150, new System.Drawing.Image.GetThumbnailImageAbort(ThumbnailCallback), IntPtr.Zero))
        //    {
        //        using (MemoryStream memoryStream = new MemoryStream())
        //        {
        //            thumbnail.Save(memoryStream, ImageFormat.Png);
        //            byteimage = new Byte[memoryStream.Length];
        //            memoryStream.Position = 0;
        //            memoryStream.Read(byteimage, 0, (int)byteimage.Length);
        //            base64String = Convert.ToBase64String(byteimage, 0, byteimage.Length);
        //          //  updatedoctorimage.ImageUrl = "data:image/png;base64," + base64String;
        //        }
        //    }
        //    return byteimage;
        //}

        //public bool ThumbnailCallback()
        //{
        //    return false;
        //}


        //if (!string.IsNullOrEmpty(Convert.ToString(item.Photo)))
        //            {
        //                item.PhotoString = System.Text.Encoding.UTF8.GetString(item.Photo);
        //            }
    }
}


//http//www.c-sharpcorner.com/UploadFile/013102/save-and-read-pdf-file-using-sql-server-and-C-Sharp/
//http//www.aspdotnet-suresh.com/2011/05/how-to-resize-size-image-without-losing.html
