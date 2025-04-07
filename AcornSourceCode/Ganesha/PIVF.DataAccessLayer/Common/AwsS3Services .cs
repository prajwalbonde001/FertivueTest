using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using PIVF.BusinessLayer.Common;
using PIVF.Entities.Models;
using System;
using System.Configuration;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace PIVF.DataAccessLayer.Common
{
    public class AwsS3Services : IAwsS3Services
    {
        private static readonly string _accessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
        private static readonly string _secretKey = ConfigurationManager.AppSettings["AWSSecretKey"];
        private static readonly string _bucketName = ConfigurationManager.AppSettings["AWSBucketName"];
        private static readonly string _folderName = ConfigurationManager.AppSettings["AWSFolderName"];
        private static readonly RegionEndpoint _region = RegionEndpoint.APSouth1; // Change based on your region
        //private static readonly string _region = "ap-south-1"; // Change based on your region
        private static IAmazonS3 CreateS3Client()
        {
            return new AmazonS3Client(_accessKey, _secretKey, _region);
        }

        /// <summary>
        /// Upload a file to S3
        /// </summary>
        public string UploadFile(string base64String, string fileName)
        {
            try
            {
                byte[] fileBytes = Convert.FromBase64String(base64String);
                using (MemoryStream ms = new MemoryStream(fileBytes))
                {
                    using (var client = CreateS3Client())
                    {
                        var fileTransferUtility = new TransferUtility(client);
                        string s3Key = "uploads/" + _folderName + "/" + fileName; // Define S3 object key

                        string mimeType = MimeMapping.GetMimeMapping(fileName);

                        var uploadRequest = new TransferUtilityUploadRequest
                        {
                            InputStream = ms,
                            BucketName = _bucketName,
                            Key = s3Key,
                            ContentType = mimeType // Adjust content type as needed
                        };

                        fileTransferUtility.Upload(uploadRequest);
                        return s3Key;
                        //return $"File uploaded successfully. S3 Key: {s3Key}";
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Upload failed: {ex.Message}";
            }
        }


        /// <summary>
        /// Download a file from S3
        /// </summary>
        public string DownloadFile(string s3Key)
        {
            try
            {
                using (var client = CreateS3Client())
                {
                    var request = new GetObjectRequest
                    {
                        BucketName = _bucketName,
                        Key = s3Key
                    };

                    using (var response = client.GetObject(request))
                    using (var memoryStream = new MemoryStream())
                    {
                        response.ResponseStream.CopyTo(memoryStream);
                        byte[] fileBytes = memoryStream.ToArray();
                        string base64String = Convert.ToBase64String(fileBytes);
                        return base64String; // Returning Base64 encoded file
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Download failed: {ex.Message}";
            }
        }


        /// <summary>
        /// Get S3 file URL for viewing
        /// </summary>
        public string GetFileUrl(string s3Key)
        {
            try
            {
                // Ensure AWS4-HMAC-SHA256 is used by configuring AmazonS3Client explicitly
                var s3Config = new AmazonS3Config
                {
                    RegionEndpoint = _region,
                    SignatureVersion = "4", // Ensure AWS4-HMAC-SHA256 is used
                    ForcePathStyle = true, // Required for certain S3-compatible services
                    UseHttp = false // Force HTTPS for security
                };

                // Use BasicAWSCredentials with the correct keys
                var s3Client = new AmazonS3Client(new BasicAWSCredentials(_accessKey, _secretKey), s3Config);

                var request = new GetPreSignedUrlRequest
                {
                    BucketName = _bucketName,
                    Key = s3Key,
                    Expires = DateTime.UtcNow.AddHours(1), // URL valid for 1 hour
                    Protocol = Protocol.HTTPS // Enforce HTTPS
                };

                // Generate pre-signed URL with AWS4-HMAC-SHA256
                string url = s3Client.GetPreSignedURL(request);
                return url;
            }
            catch (Exception ex)
            {
                return $"Error generating URL: {ex.Message}";
            }
        }


        public string ExtractBase64String(string dataUri)
        {
            // Regular expression to extract the Base64 part
            var match = Regex.Match(dataUri, @"data:image\/[a-zA-Z]+;base64,(.*)");
            return match.Success ? match.Groups[1].Value : null;
        }

        public string DecodeBase64(string base64Encoded)
        {
            if (string.IsNullOrEmpty(base64Encoded))
                throw new ArgumentException("Input string cannot be null or empty.");

            byte[] decodedBytes = Convert.FromBase64String(base64Encoded);
            string base64 = Convert.ToBase64String(decodedBytes);
            return base64;
        }
    }
}
