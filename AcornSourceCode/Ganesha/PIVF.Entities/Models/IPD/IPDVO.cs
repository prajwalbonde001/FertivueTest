using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.IPD
{
    public class IPDVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long AdmissionType { get; set; }
        public string IPDNO { get; set; }
        public long DepartmentID { get; set; }
        public long DoctorID { get; set; }
        public long ClassID { get; set; }
        public long WardID { get; set; }
        public long BedID { get; set; }
        public bool IsCancel { get; set; }
        public bool IsDischarged { get; set; }
        public string Remark { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDateTime { get; set; }
    }

    public class GetMasterList
    {
        public long ID { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public long ClassID { get; set; }
        public string Class { get; set; }
        public long WardID { get; set; }
        public string Ward { get; set; }
        public bool Status { get; set; }
        public long TotalCount { get; set; }
    }

    public class AddIPDMaster
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public long ClassID { get; set; }
        public long WardID { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime AddedDateTime { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime UpdatedDateTime { get; set; }
    }


    public class IPDPatientList
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public string MRNo { get; set; }
        public string IPDNO { get; set; }
        public string PatientName { get; set; }
        public DateTime AdmissionDate { get; set; }
        public string DoctorName { get; set; }
        public string Class { get; set; }
        public string Ward { get; set; }
        public string Bed { get; set; }
        public bool IsDischarged { get; set; }
        public bool IsCancel { get; set; }
        public DateTime DischargeDate { get; set; }
        public float BalanceAdvance { get; set; }
        public string OldRegistrationNo { get; set; }
        public long TotalCount { get; set; }
    }

    public class AdmissionDetails
    {
        public long AdmissionID { get; set; }
        public long UnitID { get; set; }
        public string UnitName { get; set; }
        public string MRNo { get; set; }
        public long PatientID { get; set; }
        public string PatientName { get; set; }
        public string IPDNO { get; set; }
        public DateTime AdmissionDate { get; set; }
        public long DoctorID { get; set; }
        public string Doctor { get; set; }
        public long WardID { get; set; }
        public string Ward { get; set; }
        public long ClassID { get; set; }
        public string Class { get; set; }
        public long BedID { get; set; }
        public string Bed { get; set; }

    }
}