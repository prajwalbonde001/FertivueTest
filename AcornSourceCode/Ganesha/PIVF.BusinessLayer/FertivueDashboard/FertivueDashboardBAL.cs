using PIVF.Entities.Models.FertivueDashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.FertivueDashboard
{
    public interface FertivueDashboardBAL
    {
        Trends GetRegistrationDashboardByTrendsCount(DateTime? FromDate, DateTime? ToDate);
        Trends GetRegistrationDashboardByAgeGroupCount(DateTime? FromDate, DateTime? ToDate);
        Trends GetAppointmentDashboardCount(DateTime? FromDate, DateTime? ToDate, string AppType = null);
        ChartData GetInvestigationDashboardCount(DateTime? FromDate, DateTime? ToDate);
        BillingData GetBillingDashboardCount(DateTime? FromDate, DateTime? ToDate, string Breakdown = null);
        BillingData GetTotalRevenueDashboardServiceTypeCount(DateTime? FromDate, DateTime? ToDate);
        Trends GetToDoListDashboardCount(DateTime? FromDate, DateTime? ToDate);
        Trends GetFootFallDashboardCount(DateTime? FromDate, DateTime? ToDate);
        List<PatientList> GetRegistrationDashboardByTrendPatientList(DateTime? FromDate, DateTime? ToDate, string Type = null);
        List<PatientList> GetRegistrationDashboardByAgeGroupPatientList(DateTime? FromDate, DateTime? ToDate);
        List<PatientList> GetAppointmentDashboardPatientList(DateTime? FromDate, DateTime? ToDate, string AppType = null);
        List<PatientList> GetInvestigationDashboardPatientLiast(DateTime? FromDate, DateTime? ToDate, string Specialization = null);
        List<PatientList> GetBillingDashboardPatientList(DateTime? FromDate, DateTime? ToDate, string Breakdown = null);
        List<PatientList> GetTotalRevenueDashboardServiceTypePatientList(DateTime? FromDate, DateTime? ToDate, string Specialization = null);
        List<PatientList> GetToDoListDashboardPatientList(DateTime? FromDate, DateTime? ToDate, string Type = null);
        List<PatientList> GetFootFallDashboardPatientList(DateTime? FromDate, DateTime? ToDate, string Type = null);
        List<Datasetvo> GetAdminDashboardPercentageCounts(DateTime? FromDate, DateTime? ToDate, DateTime? LastFromDate, DateTime? LastToDate);

    }
}