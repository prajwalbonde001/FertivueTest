using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.Master.Patient;
using PIVF.Entities.Models.NewRegistration;
using PIVF.Entities.Models.Patient;


namespace PIVF.BusinessLayer.NewRegistration
{
    public interface NewRegistrationBAL
    {
        string SaveUpdate(NewRegistrationVO obj);
        List<NewPatient> getPatientList(NewPatient obj);
        //NewPatient getPatientByID(int id);
        NewPatient viewAttachment(NewPatient obj);
        NewPatient getPatientByID(NewPatient obj);
        NewInfo getPatientInfo(int id);
        NewInfo getPatientSpouseInfo(int id);
        NewAddInfo getPatientAddInfo(int id);
        NewRefInfo getPatientRefInfo(int id);
        int updatePatientInfo(NewInfo obj);
       // int updatePatientAddInfo(AddInfo obj);
        //int updatePatientRefInfo(RefInfo obj);
        NewAddress getPatientAddress(int id, bool? isOthr);
        int updatePatientAddInfo(NewAddInfo obj);
        int updatePatientRefInfo(NewRefInfo obj);
        int updatePatientAddress(NewAddress obj);
        int updatePatientPhoto(string[] str);
        int deletePatientPhoto(string[] str);
        int updateAttachment(string[] str);
        int InsertUpdateBankDetails(PatientRegistration objPatientRegistration);
        NewBankInfo GetBankInformation(int id, int UnitID);
        List<NewAppoinmentInput> GetAvailableAppointmentSlotsModified(List<NewAppoinmentInput> input);

        Int32 CheckExistingPatientDuplicacy(NewPatient obj);

        //object SaveUpdate(Entities.Models.NewRegistration.NewRegistrationVO obj);
        PIVF.Entities.Models.Patient.PatientPersonalCharacteristicsDetailsVO GetPatientPersonalCharacteristics(long patientID, long patientUnitID);
        int SavePatientPersonalCharacteristics(PatientPersonalCharacteristicsVO patientPersonalCharacteristicsVO);
    }
}
