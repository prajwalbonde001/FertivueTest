using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.StimulationChart
{
    public class StimulationChartVO
    {
        public Int32 StimulationID { get; set; }
        public Nullable<Int32> PatientID { get; set; }
        public Nullable<Int32> PatientUnitID { get; set; }
        public Nullable<Int32> CoupleID { get; set; }
        public Nullable<Int32> CoupleUnitID { get; set; }
        public Nullable<Int32> VisitID { get; set; }
        public Nullable<Int32> VisitUnitID { get; set; }
        public Nullable<Int32> TherapyID { get; set; }
        public Nullable<Int32> TherapyUnitID { get; set; }
        public string Side { get; set; }
        public string CycleCode { get; set; }
        public Nullable<Int32> TotalDose { get; set; }
        public Nullable<DateTime> OPUDate { get; set; }
        public Nullable<DateTime> StimulationStartDate { get; set; }
        public Nullable<DateTime> SimulationCycleStartDate { get; set; }
        public Nullable<DateTime> StimulationEndDate { get; set; }
        public bool IsCycleCancellation { get; set; }
        public bool IsCloseCycleOnCancellation { get; set; }
        public string Reason { get; set; }
        public Nullable<Int32> LastUpdatedBy { get; set; }
        public Nullable<DateTime> LastUpdatedByDate { get; set; }
        public Nullable<Int32> FinalizedBy { get; set; }
        public Nullable<DateTime> FinalizedByDate { get; set; }
        public bool IsFinalize { get; set; }
        public bool Status { get; set; }
        public string MedicalHistory { get; set; }
        public string CycleWarnings { get; set; }
        public Nullable<DateTime> SCLMP { get; set; }
        public Nullable<Int32> SCARTID { get; set; }
        public string SCARTDescription { get; set; }
        public Nullable<Int32> SCARTSubID { get; set; }
        public string SCARTSubDescription { get; set; }
        public string SCProtocol { get; set; }
        public string SCSourceOfSperm { get; set; }
        public Nullable<Int32> AntralFollicleCount { get; set; }
        public Nullable<DateTime> Date { get; set; }
        public float LeftDimensionLength { get; set; }
        public float LeftDimensionBreadth { get; set; }
        public float LeftSize { get; set; }
        public float RightDimensionLength { get; set; }
        public float RightDimensionBreadth { get; set; }
        public float RightSIze { get; set; }
        public float EndometriumThickness { get; set; }
        public String EndometriumMorphology { get; set; }
        public int LeftSizeCount { get; set; }
        public int RightSizeCount { get; set; }
        public string LeftFollicularNumber { get; set; }
        public string RightFollicularNumber { get; set; }
        public string TherapyIndications { get; set; }
        public List<FolliScanDaysList> FolliScanDaysCheckList { get; set; }
        public List<Morphology> EndometriumList { get; set; }
        public List<StimulationE2> E2 { get; set; }
        public List<StimulationProgesterone> Progesterone { get; set; }
        public List<StimulationFSH> FSH { get; set; }
        public List<StimulationLH> LH { get; set; }
        public List<AddDrugList> AddDrugList { get; set; }
        public List<StimulationDoseTrigger> TriggerDateDoseList { get; set; }
        public List<StimulationRemark> RemarksList { get; set; }
        public List<StimulationPhysician> LatestDoctors { get; set; }
        public List<StimulationDrugAdmin> DoctorNameList { get; set; }
        public List<AddDrugList> TempAddDrugList { get; set; }
        public List<DrugNextDates> TempDrugNextDates { get; set; }
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
        private string _FinalizedUser;
        public string FinalizedUser
        {
            get
            {
                if (_FinalizedUser != null)
                {
                    if (_FinalizedUser.Contains("=="))
                    {
                        return DecryptString(_FinalizedUser);
                    }
                    else
                    {
                        return _FinalizedUser;
                    }
                }
                else
                {
                    return _FinalizedUser;
                }
            }
            set
            {
                if (_FinalizedUser != value)
                {
                    _FinalizedUser = value;
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

    public class StimulationE2
    {
        public Nullable<Int32> E2ID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public DateTime Date { get; set; }
        public Nullable<float> Size { get; set; }
    }
    public class StimulationProgesterone
    {
        public Nullable<Int32> ProgesteroneID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public DateTime Date { get; set; }
        public Nullable<float> Size { get; set; }
    }
    public class StimulationFSH
    {
        public Nullable<Int32> SDrugID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public DateTime Date { get; set; }
        public Nullable<float> Size { get; set; }
    }
    public class StimulationLH
    {
        public Nullable<Int32> LHID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public DateTime Date { get; set; }
        public Nullable<float> Size { get; set; }
    }
    public class AddDrugList
    {
        public Nullable<Int32> ID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<Int32> DrugID { get; set; }
        public string DrugName { get; set; }
        public Nullable<DateTime> DrugDate { get; set; }
        public List<DrugNextDates> DrugNextDates { get; set; }
        public Nullable<DateTime> DrugTime { get; set; }
        public Nullable<Int32> DrugDays { get; set; }
        public Nullable<decimal> DrugDose { get; set; }
    }
    public class DrugNextDates
    {
        public Nullable<Int32> ID { get; set; }
        public int AddDrugID { get; set; }
        public Nullable<DateTime> NextDate { get; set; }
        public Nullable<decimal> DateWiseDose { get; set; }
        public string LoggedUserName { get; set; }
    }
    public class StimulationDoseTrigger
    {
        public Nullable<Int32> TriggerID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<Int32> DrugID { get; set; }
        public Nullable<DateTime> TriggerDate { get; set; }
        public Nullable<DateTime> DrugTime { get; set; }
        public Nullable<Int32> Days { get; set; }
        public Nullable<decimal> TriggerDose { get; set; }
        public string TriggerDrug { get; set; }
    }
    public class StimulationRemark
    {
        public Nullable<Int32> RemarkID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public DateTime Date { get; set; }
        public string Remark { get; set; }

    }
    public class StimulationPhysician
    {
        public Nullable<Int32> PhyID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<DateTime> date { get; set; }
        public string DoctorName { get; set; }
        public string Name { get; set; }
        public Nullable<Int32> LoggedUserID { get; set; }

    }
    public class StimulationDrugAdmin
    {
        public Nullable<Int32> DrugAdminID { get; set; }
        public Nullable<Int32> StimulationID { get; set; }
        public Nullable<DateTime> date { get; set; }
        public bool Inhouse { get; set; }
        public bool Outside { get; set; }
        public string DoctorName { get; set; }
        public bool IsChecked { get; set; }
    }
    public class FolliScanDaysList
    {
        public Nullable<DateTime>  Date { get; set; }
        public bool IsChecked { get; set; }
    }
    public class Morphology
    {
        public Nullable<DateTime> Date { get; set; }
        public string EndometriumMorphology { get; set; }
        public string EndometriumThickness { get; set; }
        public Nullable<double> cyst { get; set; }
        public Nullable<double> Rcyst { get; set; }
    }
    public class RiPsvDetails
    {
        public decimal LeftRI { get; set; }
        public decimal LeftPSV { get; set; }
        public decimal RightRI { get; set; }
        public decimal RightPSV { get; set; }
        public decimal LeftDimensionLength { get; set; }
        public decimal RightDimensionBreadth { get; set; }
    }
    public class HarmonalData
    {
        public Nullable<DateTime> Date { get; set; }
        public Nullable<float> FSH { get; set; }
        public Nullable<float> E2 { get; set; }
        public Nullable<float> LH { get; set; }
        public Nullable<float> Progesterone { get; set; }
    }
    public class FollicleSizeDetials
    {
        public string Side { get; set; }
        public Nullable<DateTime> Date{ get; set; }
        public int LeftSizeCount { get; set; }
        public int RightSizeCount { get; set; }
        public string LeftFollicularNumber { get; set; }
        public string RightFollicularNumber { get; set; }
    }

    public class GraphData
    {
        public List<HarmonalData>  harmones { get; set; }
        public List<FollicleSizeDetials> follicleSizeDetails { get; set; }

    }
}
