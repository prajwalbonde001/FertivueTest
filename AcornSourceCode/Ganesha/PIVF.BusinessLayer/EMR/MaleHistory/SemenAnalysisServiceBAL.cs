using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.MaleHistory
{
    public interface SemenAnalysisServiceBAL
    {
        int SaveUpdate(SemenExamination objSemenFreez);
        int GetMaxID();
        List<SemenExamination> GetSemenAnalysisList(string SNo, string Action);
        List<SemenExamination> GetSALinkByPatientID( int MethodOfSurgicalSpermRetrivalID);
        int UpdateLinkFinalize(List<string> SemenExaminationList);
        List<SurgicalSpermRetrival> GetSurgicalSpermRetrivalByPatientID(string SANo);

    }
}
