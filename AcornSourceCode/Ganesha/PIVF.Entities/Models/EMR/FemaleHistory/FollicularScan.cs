using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.FemaleHistory
{
    public class FollicularScan
    {
        public int ID { get; set; }
        public Nullable<Int32> UnitID { get; set; }
        public Nullable<Int32> FCPatientID { get; set; }
        public Nullable<Int32> FCUserID { get; set; }
        public Nullable<Int32> TherapyId { get; set; }
        public Nullable<Int32> TherapyUnitId { get; set; }
        public bool DisableEdit { get; set; }
        public string Cyclecode { get; set; }
        public Nullable<DateTime> TherapyDate { get; set; }
        public Nullable<DateTime> FollicularScanDate { get; set; }
        public Nullable<DateTime> FollicularScanTime { get; set; }
        public string CycleName { get; set; }
        public string ARTMain { get; set; }
        public string ARTSub { get; set; }
        //public string DoctorName { get; set; }
        public string EndometriumThickness { get; set; }
        public Nullable<double> Cyst { get; set; }
        public Nullable<double> RCyst { get; set; }

        public Nullable<Int32> EndometriumMorphologyID { get; set; }
        public Nullable<decimal> RI { get; set; }
        public Nullable<decimal> PSV { get; set; }
        public string FollicularScanRemark { get; set; }
        public Nullable<bool> IsFinalize { get; set; }
        public Nullable<DateTime> LMPDate { get; set; }
        public string CycleDay { get; set; }
        public Nullable<decimal> LeftAFC { get; set; }
        public Nullable<decimal> RightAFC { get; set; }
        public List<SizeDetails> ListItem { get; set; }
        public List<model> FollicularScanImages { get; set; }
        public SurgivalOther FollicularDetails { get; set; }
        public string DICOMLink { get; set; } 

        private string _DoctorName;
        public string DoctorName
        {
            get
            {
                if (_DoctorName != null)
                {
                    if (_DoctorName.Contains("=="))
                    {
                        return DecryptString(_DoctorName);
                    }
                    else
                    {
                        return _DoctorName;
                    }
                }
                else
                {
                    return _DoctorName;
                }
            }
            set
            {
                if (_DoctorName != value)
                {
                    _DoctorName = value;
                }
            }
        }
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
    }

    public class SizeDetails
    {
        public Nullable<double> LeftOvaryDimensionLength { get; set; }
        public Nullable<double> LeftOvaryDimensionBreadth { get; set; }
        public Nullable<double> LeftOvaryDimensionAvg { get; set; }
        public Nullable<double> RightOvaryDimensionLength { get; set; }
        public Nullable<double> RightOvaryDimensionBreadth { get; set; }
        public Nullable<double> RightOvaryDimensionAvg { get; set; }
        public Nullable<double> RightRI { get; set; }
        public Nullable<double> RightPSV { get; set; }
        public Nullable<double> LeftPSV { get; set; }
        public Nullable<double> LeftRI { get; set; }
    }
}
