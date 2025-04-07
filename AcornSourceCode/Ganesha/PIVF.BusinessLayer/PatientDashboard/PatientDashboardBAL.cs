using PIVF.Entities.Models.FertivueDashboard;
using PIVF.Entities.Models.PatientDashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.PatientDashboard
{
    public interface PatientDashboardBAL
    {
        List<PatientDashboardClass> GetTriggerList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetETList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetOPUList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetPatientUnderStimulation(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetPatientTriggerCount(DateTime? FromDate, DateTime? ToDate);
        Trends GetRemainingOPUList(DateTime? FromDate, DateTime? ToDate);
        //List<PatientDashboardClass> GetRemainingOPUList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay0Patient(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay1Patient(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay2Patient(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay3Patient(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay4Patient(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay5Patient(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay6Patient(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetBHCGList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetUCGList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetPregnancyTestPatient(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetPregnancyUltrasound(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetPregnancyOutcome(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> StimulationPatientList(DateTime? FromDate, DateTime? ToDate);//long PatientID, long UnitID, long PatientUnitID
        List<PatientDashboardClass> TriggerPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientList> GetRemainingOPUPatientList(DateTime? FromDate, DateTime? ToDate);
        //List<PatientDashboardClass> GetRemainingOPUPatientList(DateTime? FromDate, DateTime? ToDate);

        List<PatientDashboardClass> GetDay0PatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay1PatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay2PatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay3PatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay4PatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay5PatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetDay6PatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetPregnancyTestPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetPregnancyUltrasoundPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetPregnancyOutcomePatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetETPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetTriggerPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetOPUPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetBHCGPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetUSGPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientDashboardClass> GetVisitTypeList(DateTime? FromDate, DateTime? ToDate);
        List<PatientList> GetVisitTypePatientList(DateTime? FromDate, DateTime? ToDate);


    }
}
