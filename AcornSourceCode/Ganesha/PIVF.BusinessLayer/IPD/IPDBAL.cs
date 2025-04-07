using PIVF.Entities.Models.IPD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.IPD
{
    public interface IPDBAL
    {
        long SaveNewAdmission(IPDVO obj);
        List<GetMasterList> GetClassMasterList();
        List<GetMasterList> GetWardMasterList();
        List<GetMasterList> GetBedMasterList(long ClassID, long WardID);
        long AddUpdateClassMaster(AddIPDMaster obj);
        long AddUpdateWardMaster(AddIPDMaster obj);
        long AddUpdateBedMaster(AddIPDMaster obj);
        List<GetMasterList> GetAdmissionTypeMasterList();
        List<IPDPatientList> GetIPDPatientList(DateTime? FromDate, DateTime? ToDate, long? DoctorID, long? ClassID, long? WardID, bool? IsCurrentAdmitted, string FirstName = null, string LastName = null, string MRNo = null, string OldRegID = null);
        int CancelAdmission(long AdmissionID, string CancelReason);
        int DeleteMasterForIPD(long ID, string Master = null);
        List<GetMasterList> GetDischargeTypeMasterList();
        List<GetMasterList> GetDischargeDestinationMasterList();
        AdmissionDetails GetAdmissionDetailsForDischarge(long? AdmissionID, string MRNo = null);
    }
}
