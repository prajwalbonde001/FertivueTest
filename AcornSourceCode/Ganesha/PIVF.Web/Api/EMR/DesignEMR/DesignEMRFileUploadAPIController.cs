using DataBaseConfiguration;
using PIVF.DataAccessLayer.EMR.DesignEMR;
using PIVF.Entities.Models.EMR.DesignEMR;
using PIVF.Entities.Models.Patient;
using PIVF.Web.Api.FileUplaodExtension;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;


namespace PIVF.Web.Api.EMR.DesignEMR
{
    [Authorize]
    public class DesignEMRFileUploadAPIController : ApiController
    {
        //private readonly string workingFolder = @"C:\Uploads";//HttpRuntime.AppDomainAppPath + @"\Uploads";
        //[HttpGet]
        public async Task<IHttpActionResult> Add()
        {
            // Check if the request contains multipart/form-data.
            
            if (!Request.Content.IsMimeMultipartContent())
            {
                return StatusCode(HttpStatusCode.UnsupportedMediaType);
            }
            try
            { 
                var filesReadToProvider = await Request.Content.ReadAsMultipartAsync();
                clsPatientImagesVO Obj = new clsPatientImagesVO();


                foreach (var stream in filesReadToProvider.Contents)
                {                   
                    Obj.Photo = await stream.ReadAsByteArrayAsync();
                    if (!string.IsNullOrEmpty(Convert.ToString(Obj.Photo)))
                    {
                        Obj.Name = stream.Headers.ContentDisposition.FileName;
                        Obj.PhotoStr = System.Text.Encoding.UTF8.GetString(Obj.Photo);
                    }
                }
                //commented by rohini
                if (!Request.Content.IsMimeMultipartContent("form-data"))
                {
                    return BadRequest("Unsupported media type");
                }               
                GenericSP.SelectedPatient.ListPatientImages.Add(Obj);
                return Ok(new { Message = "Photos uploaded ok", Photos = Obj.Photo });
            }
            //try
            //{
            //    var provider = new CustomMultipartFormDataStreamProvider(workingFolder);
            //    //var provider = new MultipartFormDataStreamProvider("c:/uploads/");
            //    string Str = "";
            //    await Task.Run(async () => await Request.Content.ReadAsMultipartAsync(provider));

            //    var photos = new List<PhotoViewModel>();
               

            //    foreach (var file in provider.FileData)
            //    {
            //        var fileInfo = new FileInfo(file.LocalFileName);
            //        Str = fileInfo.Name;
            //        photos.Add(new PhotoViewModel
            //        {
            //            Name = fileInfo.Name,
            //            Created = fileInfo.CreationTime,
            //            Modified = fileInfo.LastWriteTime,
            //            Size = fileInfo.Length / 1024
            //        });
            //    }

            //    string workingFolder1 = @"C:\Uploads\" + Str;
            //    byte[] imageData = ReadFile(workingFolder1);

             //  return Ok(new { Message = "Photos uploaded ok", Photos = photos });
            //}
            catch (Exception ex)
            {
                return BadRequest(ex.GetBaseException().Message);
            }
        }
        byte[] ReadFile(string sPath)
        {
            //Initialize byte array with a null value initially.
            byte[] data = null;
            //Use FileInfo object to get file size.
            FileInfo fInfo = new FileInfo(sPath);
            long numBytes = fInfo.Length;
            //Open FileStream to read file
            FileStream fStream = new FileStream(sPath, FileMode.Open, FileAccess.Read);
            //Use BinaryReader to read file stream into byte array.
            BinaryReader br = new BinaryReader(fStream);          
            data = br.ReadBytes((int)numBytes);
            return data;
        }
       
    

    }
    }
