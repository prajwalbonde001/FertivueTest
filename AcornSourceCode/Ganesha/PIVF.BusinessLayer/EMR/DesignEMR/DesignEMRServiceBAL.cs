using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR.DesignEMR;
using PIVF.Entities.Models.Master.IVF;

namespace PIVF.BusinessLayer.EMR.DesignEMR
{
     public interface  DesignEMRServiceBAL
     {
            long SaveTemplate(DesignEMRVO _objDesignEMRVO);
            List<DesignEMRVO> GetTemplate(string TemplateName,long GenderID,long FormID, int CurrentPage);
            DesignEMRVO GetTemplateByID(long ID);
            long DeleteTemplate(DesignEMRVO _objDesignEMRVO);
            int ActiveDeactiveSave(DesignEMRVO _objDesignEMRVO);
            List<DesignEMRVO> GetTemplateByFormID(long ID,  long TempID);
            long SaveUpdateEMRTemplate(DesignEMRVO _objDesignEMRVO); 
            long SaveUpdateCycleTemplate(DesignEMRVO _objDesignEMRVO); 
             List<DesignEMRVO> ListAllTemplateList(long ID);
             List<DesignEMRVO> ListAllCycleTemplateList(long ID);
        DesignEMRVO GetTemplateData(long ID, long UnitID);
            List<CommanEntity> FillFormType(long GenderID);
            List<CommanEntity> GetSubtemplatesList(long FormID); //Added by sujata  for Ultra obs
    }
}
