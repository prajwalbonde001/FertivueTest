using PIVF.Entities.Models.Master.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.PatientDashboard
{
    public class PatientDashboardClass
    {

        //public int StimulationID { get; set; }
        //public int UnitID { get; set; }
        //public int ID { get; set; }
        //public int UnitID { get; set; }
        public long ID { get; set; }
        public long UnitID { get; set; }
        public int GenderID { get; set; }
        public string Gender { get; set; }
        //public int PatientID { get; set; }
        public int PatientUnitID { get; set; }
        //public int CoupleID { get; set; }
        public int ArtTypeID { get; set; }
        public int ArtSubTypeID { get; set; }
        public int Total { get; set; }
        public DateTime DrugDate { get; set; }
        public int TotalOPU { get; set; }
        public int TotalEmbryo { get; set; }
        public int RemainingOPU { get; set; }
        public int TotalTrigger { get; set; }
        public int Day0 { get; set; }
        public int Day1 { get; set; }
        public int Day2 { get; set; }
        public int Day3 { get; set; }
        public int Day4 { get; set; }
        public int Day5 { get; set; }
        public int Day6 { get; set; }
        public int BHCG { get; set; }
        public int USG { get; set; }
        public int PregnancyTest { get; set; }
        public int PregnancyUltrasound { get; set; }
        public int PregnancyOutcome { get; set; }
        public int TotalPatient { get; set; }
        public UserVO ObjCurrentUser { get; set; }
        //public string FirstName { get; set; }
        //public string MiddleName { get; set; }
        //public string LastName { get; set; }
        public int TotalRows { get; set; }
        public long TotalCount { get; set; }
        public long PatientID { get; set; }
        public long? CoupleID { get; set; }
        //public long PatientCategoryID { get; set; }
        //public long ID { get; set; }
        public string ContactNo1 { get; set; }
        public string MRNo { get; set; }

        private string strFirstName;
        public string FirstName
        {
            get { return strFirstName; }
            set
            {
                if (value != strFirstName)
                {
                    strFirstName = value;
                }

            }
        }

        private string strMiddleName;
        public string MiddleName
        {
            get { return strMiddleName; }
            set
            {
                if (value != strMiddleName)
                {
                    strMiddleName = value;
                }
            }
        }

        private string strLastName;
        public string LastName
        {
            get { return strLastName; }
            set
            {
                if (value != strLastName)
                {
                    strLastName = value;
                }
            }
        }
        private string _PatientName;
        public string PatientName
        {

            get { return _PatientName = strFirstName + " " + strMiddleName + " " + strLastName; }


            set
            {
                if (value != _PatientName)
                {
                    _PatientName = value;
                }
            }
        }
        public string PartnerName { get; set; }
        public int VisitTypeID { get; set; }
        public string Description { get; set; }
        public int PatientCount { get; set; }

        public long PatientCategoryID { get; set; }
        public string PatientCategory { get; set; }
        public string PartnerMRNo { get; set; }
        public int PartnerGenderID { get; set; }
        public string PartnerGender { get; set; }
        public int PartnerCategoryID { get; set; }
        public string PartnerCategory { get; set; }
        public int Age { get; set; }
        public string CycleCode { get; set; }
        public string LabDay { get; set; }

        //public long TotalCount { get; set; }
        //public string IdColumnName { get; set; }
        //public int startRowIndex { get; set; }
        //public long PagingEnabled { get; set; }
        //public int TotalRows {get; set;}
    }
}
