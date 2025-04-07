using PIVF.Entities.Models.Master.Patient;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PIVF.Entities.Models.Master.Billing
{

    public class Company
    {
        [Key]
        public int CompID { get; set; }
        public int CAddressId { get; set; }
        public string CompCode { get; set; }
        public string Description { get; set; }
        public int CompTypeID { get; set; }
        public string CompType { get; set; }
        public int PatientCatID { get; set; }
        public int TID { get; set; }
        public string SelectedPatCat { get; set; }
        public string SelectedTariff { get; set; }
        public string ContactPerson { get; set; }
        public int CountryCodeID { get; set; }
        public string MobNo { get; set; }
        public int AltCountryCodeID { get; set; }
        public string AltMobNo { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string EmailId { get; set; }
        public string Street { get; set; }
        public string Landmark { get; set; }
        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public string Area { get; set; }
        public string CountryName { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }
        public string Pincode { get; set; }
        public string StdCode { get; set; }
        public string Landline { get; set; }
        public string AltStdCode { get; set; }
        public string AltLandline { get; set; }
        public bool Status { get; set; }
        public bool IsDefault { get; set; }
        public bool IsFromAddress { get; set; }
        public bool IsPagingEnable { get; set; }
        public int CreatedUnitID { get; set; }
        public int UpdatedUnitID { get; set; }
        public int AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? AddedUTCDateTime { get; set; }
        public int UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? UpdatedUTCDateTime { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public int Resultstatus { get; set; }
        public int Pgindx { get; set; }
        public int TotalCount { get; set; }
        public List<TariffMaster> lstTariff { get; set; }
        public List<CategoryL1Master> lstPatCat { get; set; }
    }

    public class CompanyType
    {
        public int CompTypeID { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }

    }
}
