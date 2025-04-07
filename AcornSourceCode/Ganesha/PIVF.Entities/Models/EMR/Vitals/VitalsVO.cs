using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.Vitals
{
    public class VitalsVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long VisitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long DoctorID { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public double Weight { get; set; }
        public double Height { get; set; }
        public double BMI { get; set; }
        public double BPSystolic { get; set; }
        public double BPDiastolic { get; set; }
        public double HR { get; set; }
        public double Temperature { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public DateTime UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public Boolean Status { get; set; }
        public long TotalRows { get; set; }

        private string _CapturedBy;
        public string CapturedBy
        {
            get
            {
                if (_CapturedBy != null)
                {
                    if (_CapturedBy.Contains("=="))
                    {
                        return DecryptString(_CapturedBy);
                    }
                    else
                    {
                        return _CapturedBy;
                    }
                }
                else
                {
                    return _CapturedBy;
                }
            }
            set
            {
                if (_CapturedBy != value)
                {
                    _CapturedBy = value;
                }
            }
        }
        public Boolean VisitStatus { get; set; }


        #region Added By vikrant To Show Decrypt String 
        public static string DecryptString(string Text)
        {
            string plaintext = "";
            if (!string.IsNullOrEmpty(Text))
            {
                Aes objAes = Create();
                byte[] cipherText = Convert.FromBase64String(Text);
                // Create an Aes object with the specified key and IV.
                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Padding = PaddingMode.PKCS7;
                    aesAlg.Key = objAes.Key;
                    aesAlg.IV = objAes.IV;
                    // Create a decrytor to perform the stream transform.
                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                    // Create the streams used for decryption.
                    using (MemoryStream msDecrypt = new MemoryStream(cipherText))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream and place them in a string.
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
            }
            return plaintext;
        }

        public static Aes Create()
        {
            Aes objAes = Aes.Create();
            //const int Iterations = 300;
            //var keyGenerator = new Rfc2898DeriveBytes(GenericSP.Key, new byte[] { 10, 20, 30, 40, 50, 60, 70, 80 }, Iterations);
            //byte[] Key = keyGenerator.GetBytes(32);
            //objAes.Key = Key;
            //objAes.IV = new byte[128 / 8];
            RijndaelManaged myAlg = new RijndaelManaged();
            byte[] salt = Encoding.ASCII.GetBytes(Key);
            Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(Key, salt);
            objAes.Key = key.GetBytes(myAlg.KeySize / 8);
            objAes.IV = key.GetBytes(myAlg.BlockSize / 8);
            return objAes;
        }

        static string EDKey = string.Empty;
        public static string Key
        {
            get
            {
                try
                {
                    EDKey = System.Configuration.ConfigurationManager.AppSettings["ED"].ToString();
                }
                catch (ConfigurationErrorsException ex)
                {
                    throw ex;
                }
                return EDKey;
            }
        }
        #endregion

    }
}
