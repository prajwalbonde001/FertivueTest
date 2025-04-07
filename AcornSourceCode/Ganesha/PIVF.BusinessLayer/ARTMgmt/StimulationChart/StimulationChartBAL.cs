using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.ARTMgmt.StimulationChart;

namespace PIVF.BusinessLayer.ARTMgmt.StimulationChart
{
    public interface StimulationChartBAL
    {
        StimulationChartVO GetStimulationChartDetails();
        List<StimulationChartVO> GetStimulationChartSizeDetails();
        int SaveUpdateStimulationChart(StimulationChartVO stimulationChart);
        int DeleteDrugWithReason(int drugID, int stimulationID, string reason);
        List<RiPsvDetails> GetRIPSV(DateTime date, string size);
        GraphData GetGraphData();
    }
}
