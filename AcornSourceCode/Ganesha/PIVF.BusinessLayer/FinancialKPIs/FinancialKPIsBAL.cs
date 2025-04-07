using PIVF.Entities.Models.FinancialKPIs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.FinancialKPIs
{
    public interface FinancialKPIsBAL
    {
        List<FinancialKPIsVO> getPatientCountList(string FromDate, string ToDate, int UnitId);
        List<FinancialKPIsVO> getPaymentModeWiseCollection(string FromDate, string ToDate, int UnitId);
        List<FinancialKPIsVO> getTodaysCollection(string FromDate, string ToDate, int UnitId);
        List<FinancialKPIsVO> getServiceOutStanding(string FromDate, string ToDate, int UnitId);
        List<FinancialKPIsVO> getPharmacyOutStanding(string FromDate, string ToDate, int UnitId);
        List<FinancialKPIsVO> getSpecialityWiseRevenue(string FromDate, string ToDate, int UnitId);
    }
}
