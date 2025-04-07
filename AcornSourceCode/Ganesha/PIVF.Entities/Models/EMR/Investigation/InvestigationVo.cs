using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.Investigation
{
    public class InvestigationVo
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public int PatientID { get; set; }
        public int PatientUnitID { get; set; }
        public int GenderID { get; set; }
        public int VisitID { get; set; }
        public int VisitUnitID { get; set; }
        public int CategoryID { get; set; }   // 1.Laboratory 2.Radiology
        public string ServiceCode { get; set; }
        public string Service { get; set; }
        public int ServiceID { get; set; }
        public DateTime? PlannedDate { get; set; }
        public string Instruction { get; set; }
        public bool Status { get; set; }
        public int DoctorID { get; set; }
        public int AddedBy { get; set; }
        public DateTime? AddedDatetime { get; set; }
        public string AddedOn { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public int UpdatedUnitID { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public string UpdatedOn { get; set; }
        public string UpdatedWindowLoginName { get; set; }
        public bool dtpickropened { get; set; }
        public bool chkSelect { get; set; }
        public string DocName { get; set; }
        public string Category { get; set; }
        public string Template { get; set; }
        public int TemplateID { get; set; }
        public int TotalCount { get; set; }
        public byte[] Report { get; set; }
        public string strReport { get; set; }
        public int ArttypeID { get; set; }
        public int ArtSubTypeID { get; set; }

        public string ArttypeIDPre { get; set; }
        public string ArtSubTypeIDPre { get; set; }

        public int DonorID { get; set; }
        public int DonorUnitID { get; set; }
        public int SurrogateID { get; set; }   //Added by Nayan Kamble
        public int SurrogateUnitID { get; set; }    //Added by Nayan Kamble
        public string OrderFrom { get; set; }
        public int IsDonorCycle { get; set; }
        public List<PIVF.Entities.Models.Master.IVF.CommanEntity> lstArtSubType { get; set; }
        public bool IsSurrogateLinked { get; set; }    //Added by Nayan Kamble
        public bool IsDonorLinked { get; set; }    //Added by Nayan Kamble  
         
    }

    public class TemplateVo
    {
        public string Template { get; set; }
        public int TemplateID { get; set; }
        public List<PIVF.Entities.Models.Master.IVF.ServiceMasterVO> lstService { get; set; }
        public List<TemplateVo> lsttmp { get; set; }
        public bool chkTemplate { get; set; }
        public long TotalCount { get; set; }    //Added by Nayan Kamble on 26/11/2019  
    }

    //public class ArtsubType
    //{
    //    public string Description { get; set; }
    //    public int ID { get; set; }
    //    public int ArttypeID { get; set; }
    //}
}
