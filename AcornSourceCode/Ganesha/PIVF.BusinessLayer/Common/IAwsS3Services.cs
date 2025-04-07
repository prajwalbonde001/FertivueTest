using PIVF.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Common
{
    public interface IAwsS3Services
    {

        string UploadFile(string base64String, string fileName);
        string DownloadFile(string s3Key);
        string GetFileUrl(string s3Key);
        string ExtractBase64String(string dataUri);
        string DecodeBase64(string base64Encoded);
    }
}