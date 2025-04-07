using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.NewART
{
    public class NewARTVO
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public int PatientID { get; set; }
        public int PatientUnitID { get; set; }
        public int CoupleID { get; set; }
        public int CoupleUnitID { get; set; }
        public int ArtTypeID { get; set; }
        public int ArtSubTypeID { get; set; }
        public int ProtocolID { get; set; }
        public int SourceOfSpermID { get; set; }
        public int DonorSpermCollMethodID { get; set; }
        public int PartnrSpermCollMethodID { get; set; }
        public int IndicationID { get; set; }
        public int StimlnDrugID { get; set; }
        public DateTime LMP { get; set; }
        public string CycleWarning { get; set; }
        public string Remark { get; set; }
        public string MedicalHistory { get; set; }
        public string SelectedIndication { get; set; }
        public string SelectedDrugs { get; set; }
        public int DonorID { get; set; }
        public int DonorUnitID { get; set; }
        public int InvID { get; set; }
        public int ConsentStatus { get; set; } //1 for complete,2for patieal,3 for pending
        public bool IsPAC { get; set; } //CHECK UNCHECK
        public bool Status { get; set; }
        public bool IsFinalizeSemen { get; set; }
        public string IsMarkSurrogate { get; set; }     //Added by Nayan Kamble
    }

    public class PACDetails
    {
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long FemalePatientUnitID { get; set; }
        public long TherapyID { get; set; }
        public long TherapyUnitID { get; set; }
        public DateTime PACDate { get; set; }
        public DateTime Time { get; set; }
        public Boolean Consent { get; set; }
        public string ConsentDOC { get; set; }
        public byte[] ConsentDOCByte { get; set; }
        public string ReportDOC { get; set; }
        public byte[] ReportDOCByte { get; set; }

    }
}
