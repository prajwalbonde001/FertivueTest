using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification
{
    public class IVF_VitrificationVO
    {
        public List<IVF_VitrificationDetailsVO> ListVitriDetails { get; set; }
        #region Common Properties

        public Boolean Status { get; set; }

        public long CreatedUnitID { get; set; }

        public long? UpdatedUnitID { get; set; }

        public long? AddedBy { get; set; }

        public string AddedOn { get; set; }

        public DateTime? AddedDateTime { get; set; }

        public string AddedWindowsLoginName { get; set; }

        public long? UpdatedBy { get; set; }

        public string UpdatedOn { get; set; }

        public DateTime? UpdatedDateTime { get; set; }

        public string UpdatedWindowsLoginName { get; set; }

        public bool Synchronized { get; set; }
        public long VitrivicationID { get; set; }
        public long VitrificationUnitID { get; set; }
        public long EmbSerialNumber { get; set; }
        #endregion

        #region Properties       
        public long ID { get; set; }
        public long DonateCryoID { get; set; }
        public long UnitID { get; set; }

        public long PatientID { get; set; }

        public long PatientUnitID { get; set; }

        public long PlanTherapyID { get; set; }

        public long PlanTherapyUnitID { get; set; }

        public long DonorPatientID { get; set; }

        public long DonorPatientUnitID { get; set; }

        public DateTime? ReceivingDate { get; set; }

        public string VitrificationNo { get; set; }

        public string SerialOocyteNumberString { get; set; }

        public DateTime? DateTime { get; set; }

        public bool UsedByOtherCycle { get; set; }

        public long UsedTherapyID { get; set; }

        public long UsedTherapyUnitID { get; set; }

        public DateTime? PickUpDate { get; set; }

        public bool ConsentForm { get; set; }

        public bool IsFreezed { get; set; }

        public bool IsThawingDone { get; set; }

        public bool IsOnlyVitrification { get; set; }

        public bool IsCryoWOThaw { get; set; }

        public long EmbryologistID { get; set; }

        public long AssitantEmbryologistID { get; set; }

        public bool IsOnlyForEmbryoVitrification { get; set; }

        public bool SaveForSingleEntry { get; set; }

        public long SrcOoctyID { get; set; }

        public long SrcSemenID { get; set; }

        public string SrcOoctyCode { get; set; }

        public string SrcSemenCode { get; set; }

        public bool UsedOwnOocyte { get; set; }

        public bool IsRefeeze { get; set; }

        #endregion
    }
}
