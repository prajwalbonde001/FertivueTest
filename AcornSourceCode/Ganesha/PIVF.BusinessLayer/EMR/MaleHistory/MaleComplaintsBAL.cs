using PIVF.Entities.Models.EMR.MaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.MaleHistory
{
    public interface MaleComplaintsBAL
    {
        MaleComplaints LoadSpecificMaleComplaints();
        List<MaleComplaints> PreviousFollowUpNotes();
        int InsertMaleComplaints(MaleComplaints obj);
    }
}
