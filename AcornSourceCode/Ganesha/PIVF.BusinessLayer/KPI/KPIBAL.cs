using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.KPI;


namespace PIVF.BusinessLayer.KPI
{
   public interface KPIBAL
    {
       List<KPIVO> KPISelf(string fromDate,string toDate,int UnitiId, int AgeMin, int AgeMax,int Fresh);
        List<KPIVO> KPIDonor(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax, int Fresh);
        List<KPIVO> KPIImplantationRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax,string Action,int Fresh);
        List<KPIVO> KPIClinicalPregnancyRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax);
        List<KPIVO> KPICleavageRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax);
        List<KPIVO> KPILiveBirthRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax,string Action,int fresh);
        List<KPIVO> KPIBiochemicalPregnancyRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax);
        List<KPIVO> KPIOnGoingPregnancyRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax);
        List<KPIVO> KPIFertilizationRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax);
        List<KPIVO> KPIGoodGradeRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax);
        List<KPIVO> KPIIUIPregnancySucessRate(string fromDate, string toDate, int UnitiId, int AgeMin, int AgeMax, string Action);
        int KPIPDF(KPIPDFVO Obj);
    }
}
