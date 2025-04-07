using PIVF.Entities.Models.EMR.MaleHistory;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.MaleHistory
{
   public interface SurgicalSpermRetrievalServiceBAL
    {
        List<CommanEntity> GetSurgeonList();
        List<CommanEntity> GetAnesthetist();
        int InsertSurgicalSpermRetrival(PIVF.Entities.Models.EMR.MaleHistory.SurgicalSpermRetrival obj);
        List<SurgicalSpermRetrival> GetSurgicalSpermRetrivalByPatientID();
        List<model> GetSSRImagesBySNo(string SNo);
    }
}
