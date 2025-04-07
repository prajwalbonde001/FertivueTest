using PIVF.Entities.Models.Master.Patient;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PIVF.BusinessLayer.Patient
{
    public interface RegistrationBAL
    {
        string SaveUpdate(RegistrationVO obj);
        List<PIVF.Entities.Models.Patient.Patient> getPatientList(PIVF.Entities.Models.Patient.Patient obj);
        PIVF.Entities.Models.Patient.Patient getPatientByID(int id);
        PIVF.Entities.Models.Patient.Info getPatientInfo(int id);
        PIVF.Entities.Models.Patient.AddInfo getPatientAddInfo(int id);
        PIVF.Entities.Models.Patient.RefInfo getPatientRefInfo(int id);
        int updatePatientInfo(Info obj);
        int updatePatientAddInfo(AddInfo obj);
        int updatePatientRefInfo(RefInfo obj);
        PIVF.Entities.Models.Patient.Address getPatientAddress(int id, bool? isOthr);
        int updatePatientAddress(Address obj);
        int updatePatientPhoto(string[] str);
        int updateAttachment(string[] str);
        int InsertUpdateBankDetails(PatientRegistration objPatientRegistration);
        PIVF.Entities.Models.Patient.BankInfo GetBankInformation(int id, int UnitID);
        List<AppoinmentInput> GetAvailableAppointmentSlotsModified(List<AppoinmentInput> input);
       
    }

    
}