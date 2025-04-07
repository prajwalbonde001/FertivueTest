using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.NewART
{
    public class ARTCycleVO
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public int PatientID { get; set; }
        public int PatientUnitID { get; set; }
        public int CoupleID { get; set; }
        public int CoupleUnitID { get; set; }
        public int SourceOfSpermID { get; set; }
        public string CycleCode { get; set; }
        public string ARTType { get; set; }
        public string ARTSubType { get; set; }
        public string Protocol { get; set; }
        public string SourceOfSperm { get; set; }
        public int DonorSpermCollMethodID { get; set; }
        public int PartnrSpermCollMethodID { get; set; }
        public string DonorSpCollMethod { get; set; }
        public string PartnrSpCollMethod { get; set; }
        public string Indication { get; set; }
        public string Donor { get; set; }
        public string DonorCode { get; set; }
        public string DonorCycleCode { get; set; }
        public string SurrogateMRno { get; set; }      //Added by Nayan Kamble          
        public DateTime LMP { get; set; }
        public bool Status { get; set; }
        public int ArtTypeID { get; set; }
        public int ArtSubTypeID { get; set; }
        public string Follicles { get; set; }
        public string Oocytes { get; set; }
        public string Fertilized { get; set; }
        public string Cryo { get; set; }
        public string FreshEmb { get; set; }
        public string FrozenEmb { get; set; }
        public bool IsOPUFinalize { get; set; }
        public DateTime? TransferDate { get; set; }
        public DateTime? PregConfDate { get; set; }
        public string PregType { get; set; }
        public string BHCG { get; set; }
        public string Cleaved { get; set; }
        public string OocyteCryo { get; set; }
        public string EmbCryo { get; set; }

        public Nullable<DateTime> OPUDate { get; set; }
        public bool IsCancel { get; set; }
        public Boolean NewcycleFlag { get; set; }
        public int Remainingembryo { get; set; }
        public string CancelCycleReason { get; set; }
        public int OcyteRetrived { get; set; }
        public int RemainingOcytes { get; set; }
        public int RemainingEmbriyo { get; set; }

    }
}
