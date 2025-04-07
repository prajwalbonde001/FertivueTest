using PIVF.Entities.Models.EMR.Prescription;
using PIVF.Entities.Models.Master.IVF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.Prescription
{
    public interface PrescriptionBL
    {
        List<CommanEntity> GetDrugList(long UnitID);
        //List<DrugVO> GetItemByTemplate(long ID);
        List<TemplateForPrescriptionVO> GetTemplateAndItems();
        DrugVO GetDrugDetailByItemID(long ID, long UnitID);
        PrescriptionVO GetTodaysPrescriptionDetails();
        List<DrugVO> GetPreviousPrescriptionDetails();
        long SavePrescription(PrescriptionVO PrescriptionVO);
        int SaveFavDrug(PrescriptionVO PrescriptionVO);
        int DeleteFavDrug(DrugVO DrugVO);
        List<CommanEntity> GetTemplateList();
        List<FrequencyVO> FillFrequency();
        long CheckMoleculeIsAllergies(long ID);
        string getAllergyMolecules();

    }
}
