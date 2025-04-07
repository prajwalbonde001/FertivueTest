using PIVF.Entities.Models.Billing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.Billing
{
    public interface IPatientAdvanceRefundBAL
    {
        int savePatientAdvanceRefund(PatientAdvanceRefundVO obj);
        List<PatientAdvanceRefundVO> FillRefundList(int PatientID, int PatientUnitID);

        List<RefundList> GetPatientRefundList(string[] RefundLists, int index, bool PgEn, out int totalCount); //Added by Chetan Pawar

        List<BillVO> GetPatientDetails(int PatID, int PatUnitID);
        List<BillVO> GetPatientDetailsForBillRefund(int PatID, int PatUnitID);
        List<BillVO> GetPatientDetailsForBillCancellation(long BillID);
        int AddOrUpdateRefundForBill(PatientBillRefundVO obj);

        List<BillDetails> GetBillAndServiceLIst(int? PatientID, int? PatientUnitID, int? BillID, int? BillUnitID);
    }
}
