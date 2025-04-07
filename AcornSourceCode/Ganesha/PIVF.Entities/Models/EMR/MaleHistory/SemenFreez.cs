using System;
using System.Collections.Generic;

namespace PIVF.Entities.Models.EMR.MaleHistory
{
    public class SemenFreez
    {
        public long ID { get; set; }
        public long DetailID { get; set; }
        public long ThawID { get; set; }
        public long UnitID { get; set; }
        private bool _IsThaw;
        public bool IsThaw
        {
            get { return _IsThaw; }
            set
            {
                if (_IsThaw != value)
                {
                    _IsThaw = value;
                }
            }
        }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        //   public long DoctorID { get; set; }

        public string CycleCode { get; set; }
        public DateTime? ThawingDate { get; set; }
        public DateTime? VitrificationDate { get; set; }
        public DateTime? VitrificationTime { get; set; }
        public DateTime? SpremFreezingDate { get; set; }
        public DateTime? SpremFreezingTime { get; set; }
        public DateTime? CollectionDate { get; set; }
        public DateTime? CollectionTime { get; set; }
        public DateTime? ReceivingDate { get; set; }
        public DateTime? ReceivingTime { get; set; }
        public DateTime? ThawDate { get; set; }
        public DateTime? ThawingTime { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string MRNo { get; set; }
        public string PatientUnitName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string FirstName { get; set; }
        public string SpermDescription { get; set; }
        public string SPNo { get; set; }
        public string DoctorName { get; set; }
        public string WitnessName { get; set; }
        public string Clinician { get; set; }
        public string AbstinenceDescription { get; set; }
        public string IVDescription { get; set; }
        public bool Status { get; set; }
        public bool IsModify { get; set; }
        public long PlanTherapy { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public string CollectionProblem { get; set; }
        public long ViscosityID { get; set; }
        public long ProgressionID { get; set; }
        public string Progression { get; set; }
        public double AbnormalSperm { get; set; }
        public double RoundCell { get; set; }
        public long AgglutinationID { get; set; }
        public string Agglutination { get; set; }
        public bool IsEnabled { get; set; }
        private bool _SelectFreezed;
        public bool SelectFreezed
        {
            get { return _SelectFreezed; }
            set
            {
                if (value != _SelectFreezed)
                {
                    _SelectFreezed = value;
                }
            }
        }
        public long SpermTypeID { get; set; }
        public string SpermType { get; set; }
        public decimal GradeA { get; set; }
        public decimal GradeB { get; set; }
        public decimal GradeC { get; set; }
        public long CollectionMethod { get; set; }
        public string strCollectionMethod { get; set; }
        public double Volume { get; set; }
        public string Abstinence { get; set; }
        public int AbstinenceID { get; set; }
        public long SpermCount { get; set; }
        public double Motility { get; set; }
        public string ColorCode { get; set; }
        public string Comments { get; set; }
        public bool IsNewlyAdded { get; set; }
        public string DescriptionValue { get; set; }
        public long SampleLinkID { get; set; }
        public long SpermConcentration { get; set; }
        public long SlowProgressive { get; set; }
        public long RapidProgressive { get; set; }
        public long NormalForms { get; set; }
        public long AbnormalForms { get; set; }
        public string WBC { get; set; }
        public string RBC { get; set; }
        public string PusCells { get; set; }
        public string EpithelialCells { get; set; }
        public string SampleCode { get; set; }
        public int NoOfVials { get; set; }
        public int DoneBy { get; set; }
        public int WitnessedBy { get; set; }
        public bool IsFinalized { get; set; }
        public bool opened { get; set; }
        public string Straw { get; set; }
        public string Canister { get; set; }
        public string Cane { get; set; }
        public string Tank { get; set; }
        public string GobletSize { get; set; }
        public string GobletColor { get; set; }
        public string CryoNo { get; set; }
        public string FormNo { get; set; }
        public string SSRNo { get; set; }
        public bool IsLinkedFreez { get; set; }
        //added by rohini 
        public long DonorID { get; set; }
        public long DonorUnitID { get; set; }
        //added by Manohar
        public string CanisterDescription { get; set; }
        public string VialDescription { get; set; }
        public string TankDescription { get; set; }
        public string CaneDescription { get; set; }
        public string DonorDode { get; set; }
        public string PatientName { get; set; }
        public bool IsUsedByTheropy { get; set; }
        public long SpermFreezingDetailsID { get; set; }
        public long SpermFreezingDetailsUnitID { get; set; }
        public string CustomStatus { get; set; }
        public int TotalRecords { get; set; }
        public string Media { get; set; }
        public List<SemenFreezDetails> lstFreezDetails { get; set; }
    }

    public class SemenFreezDetails
    {
        public long ID { get; set; }
        public long CryoNoID { get; set; }
        public string CryoNo { get; set; }
        public long TankId { get; set; }
        public string Tank { get; set; }
        public long GobletShapeId { get; set; }
        public string GolbletShape { get; set; }
        public long GobletSizeId { get; set; }
        public string GobletSize { get; set; }
        public string GobletColor { get; set; }
        public long GobletColorID { get; set; }
        public long CanisterID { get; set; }
        public string Canister { get; set; }
        public long StrawId { get; set; }
        public string Straw { get; set; }
        public long CanID { get; set; }

        public string Cane { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public double VolumeDetail { get; set; }
        public string Remark { get; set; }
        public string Comments { get; set; }

        public bool IsThaw { get; set; }
        public bool IsTank { get; set; }
        public bool IsVolume { get; set; }
        public long PlanTherapyID { get; set; }
        public long PlanTherapyUnitID { get; set; }
        public string FormNo { get; set; }
        public string Action { get; set; }
        public bool IsDiscard { get; set; }
        public long VitrificationDetailID { get; set; }
        public long EmbryologistID { get; set; }
        public long DoneBy { get; set; }
        public long WitnessID { get; set; }
        public long ReasonID { get; set; }
        public DateTime? DiscardDate { get; set; }
        public DateTime? DiscardTime { get; set; }
    }
}
