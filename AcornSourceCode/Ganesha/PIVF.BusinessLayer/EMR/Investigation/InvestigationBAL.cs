using PIVF.Entities.Models.EMR.Investigation;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.EMR.Investigation
{
    public interface InvestigationBAL
    {
        List<PIVF.Entities.Models.Master.IVF.ServiceMasterVO> GetCatwiseServiceList(int CatID, int? GenderID);
        int SaveInvestigation(DataTable dt);
        List<InvestigationVo> GetPreviousInvestigation(int idx,int CatID, string para);
        List<InvestigationVo> GetTodaysInvestigation(int CatID);
        int DeleteSavedService(int ID,int UnitID, string reason);
        int SetFavouriteInvestigation(InvestigationVo obj);
        int UploadReport(InvestigationVo obj);
        PIVF.BusinessLayer.ARTMgmt.ReportUpload.tmpReport ViewReport(int InvID, int UnitID);
        int LinkDonor(int [] IDs);
        int SaveFavourite(DataTable dt);
        TemplateVo GetFavouriteList(int idx, string param);
        //List<ArtsubType> GetArtsubTypeList(int CatID);
    }
}
