using PIVF.Entities.Models.Lab;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Lab
{
    
    public interface NewLabEnteryBAL
    {
        int SaveLabEntery(clsPathOrderBookingVO obj);

        List<clsPathPatientReportVO> GetPathoTestParameterList(int PatientID, int PatientUnitID, int ServiceID, int TestID, int CategoryID);


        List<clsPathOrderBookingDetailVO> getPatientList(clsPathOrderBookingDetailVO obj,int index);

        List<clsPathoTestParameterVO> HelpValuesesEntryList(int ParameterID);

        clsPathOrderBookingDetailVO GetLabEntryDetails(int OrderID, int DetailID, int OrderUnitID);


    }
}
