using PIVF.Entities.Models.EMR.FemaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.FemaleHistory
{
    public interface FemaleComplaintsBL
    {
        FemaleComplaints LoadSpecificFemaleComplaints();
        List<FemaleComplaints> PreviousFollowUpNotes();
        int InsertFemaleComplaints(FemaleComplaints obj);
        DateTime? GetLatestLMP();
    }
}
