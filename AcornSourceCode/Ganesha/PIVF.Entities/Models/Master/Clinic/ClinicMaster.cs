//using PIVF.Gemino.Repository.Pattern.Ef6;
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//namespace PIVF.Gemino.Entities.Models.Master.Clinic
namespace PIVF.Entities.Models.Master.Clinic
{
    public class ClinicMaster: Entity
    {
        [Key]
        public int UnitID { get; set; }
        public int Pgindx { get; set; }
        public int TotalCount { get; set; }
        public bool IsPagingEnable { get; set; }
        public string Code { get; set; }       
        public string Description { get; set; }       
        public bool? Active { get; set; }      
        public Int32? CreatedUnitID { get; set; }
        public Int32? UpdatedUnitID { get; set; }
        public Int32? AddedBy { get; set; }
        public string AddedUserName { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public Int32? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }

        private bool? _Synchronized = false;
        public bool? Synchronized
        {
            get
            {
                return _Synchronized;
            }
            set
            {
                _Synchronized = value;
            }
        }

        private bool _Status = true;
        public bool Status
        {
            get
            {
                return _Status;
            }
            set
            {
                _Status = value;
            }
        }
        public string ResiSTDCode { get; set; }
        public string ContactNo { get; set; }
        public int MobileCountryCode { get; set; }
        public string MobileNO { get; set; }
        public string Email { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }

        public string PinCode { get; set; }
        public string DatabaseName { get; set; }
        public int ClusterID { get; set; }

        public string GSTNNo { get; set; }
        public string PharmacyLicenseNo { get; set; }
        public string FaxNo { get; set; }
        public string CountryName { get; set; }
        public string Area { get; set; }
        public string CINNo { get; set; }
        public string PanNo { get; set; }
        public string Reason { get; set; }
        public List<DepartmentList> DepartmentList { get; set; }
    }

    public class DepartmentList: Entity
    {
        [Key]
        public int UnitID { get; set; }
        public int DeptID { get; set; }
        public string DeptCode { get; set; }
        public string Description { get; set; }
        public bool? IsClinical { get; set; }
        public bool? Active { get; set; }        
        public bool IsActive { get; set; }

    }
}
