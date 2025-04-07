using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.MaleHistory
{
    public class SemenExamination
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public long VisitID { get; set; }
        public DateTime? CollectionDate { get; set; }
        public DateTime? ReceivingDate { get; set; }
        public DateTime? TimeRecSampLab { get; set; }
        public long MethodOfCollection { get; set; }
        public long MOSSRetrivalID { get; set; }
        public bool Complete { get; set; }
        public bool CollecteAtCentre { get; set; }
        public bool IsFinalize { get; set; }
        public long Color { get; set; }
        public double Quantity { get; set; }
        public double? PH { get; set; }
        public int LiquificationTime { get; set; }
        public long ViscosityID { get; set; }  
        public bool Odour { get; set; }
        public double SpermCount { get; set; }
        public double TotalSpermCount { get; set; }
        public double Motility { get; set; }
        public double NonMotility { get; set; }
        public double TotalMotility { get; set; }
        public double MotilityGradeI { get; set; }
        public double MotilityGradeII { get; set; }
        public double MotilityGradeIII { get; set; }
        public double MotilityGradeIV { get; set; }
        public double Amorphus { get; set; }
        public double NeckAppendages { get; set; }
        public double Pyriform { get; set; }
        public double Macrocefalic { get; set; }
        public double Microcefalic { get; set; }
        public double BrockenNeck { get; set; }
        public long? RoundHead { get; set; }
        public long DoubleHead { get; set; }
        public long Total { get; set; }
        public long MorphologicalAbnormilities { get; set; }
        public long NormalMorphology { get; set; }
        public string Comment { get; set; }
        public string SpecimenDescription { get; set; }
        public string SSRNo { get; set; }
        public string IndicationDescription { get; set; }
        public long AbstinenceID { get; set; }
        public long SemenCID { get; set; }
        public long AppearanceID { get; set; }
        public long Thick { get; set; }
        public long MethodSurgicalSRetrievalID { get; set; }
  
        public string AbsDescription { get; set; }
        public long OdourID { get; set; }
        //public long SpermConcentration { get; set; } //Commented and Modified by AniketK on 19Sept2019
        public double SpermConcentration { get; set; }
        public long Round { get; set; }
        public long DoctorID { get; set; }
        
        public string MOSSRetrivalDescription { get; set; }
        public long CytoplasmicDroplet { get; set; }
        public long Others { get; set; }
        public long MidPieceTotal { get; set; }
        public long Coiled { get; set; }
        public long ShortTail { get; set; }
        public long Short { get; set; }
        
        public long HairpinTail { get; set; }
        public long DoubleTail { get; set; }
        public long Double { get; set; }
        
        public long TailOthers { get; set; }
        public long TailTotal { get; set; }
        public int Vacuoles { get; set; }
        public string HeadToHead { get; set; }
        public string TailToTail { get; set; }
        public string HeadToTail { get; set; }
        public string MCollectionDecription { get; set; }
        public string SemenAIDescription { get; set; }

        public string Selected { get; set; }
        public string DoneByDocName { get; set; }
        public string WitnessByDocName { get; set; }
        public string SpermToOther { get; set; }

        public int PusCellsID { get; set; }
        public string PusCells { get; set; }
        public string RoundCells { get; set; }
        public string EpithelialCells { get; set; }
        public string Infections { get; set; }
        public string OtherFindings { get; set; }
        public long InterpretationsID { get; set; }
        public bool Status { get; set; }
        public long CreatedUnitID { get; set; }
        public long UpdatedUnitID { get; set; }
        public long AddedBy { get; set; }
        public string AddedOn { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public bool UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public long AddedWindowsLoginName { get; set; }
        public string UpdatedWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public int Abstinence { get; set; }
        public string SampleCollection { get; set; }
        public int DoneBy { get; set; }
        public int WitnessedBy { get; set; }
        public double? Volume { get; set; }
        public int Appearance { get; set; }
        public int NonProgressive { get; set; }

        public int GradeA { get; set; }

        public int GradeB { get; set; }
        public int GradeC { get; set; }
        public int Progressive { get; set; }
        public int? SlowProgressive { get; set; }
        public int? RapidProgressive { get; set; }
        public int? Viability { get; set; }
        public int? Small { get; set; }
        public int? Large { get; set; }
        public int? Tapered { get; set; }
        public int Amorphous { get; set; }
        public double Vacuolated { get; set; }
        public int Bent { get; set; }
        public int Thin { get; set; }

        public int RBCID { get; set; }
        public string RBC { get; set; }
        public long AsymmetricalInsertion { get; set; }   
        public string WBC { get; set; }
        public string Fructose { get; set; }
        public string Remarks { get; set; }
        public String SNo { get; set; }
        public bool IsFinalized { get; set; }
        public bool IsLinked { get; set; }
        public bool IsLinkedFreez { get; set; }
        public string Vitality { get; set; }
        public string DNAFragIndex { get; set; }
        public string TeratozoospermicIndex { get; set; }
        public int PrognosisID { get; set; }

        public int HeadDefects { get; set; }

        public int TailDefects { get; set; }

        public int NeckMidpieceDefects { get; set; }

        public int SumTotalNormal { get; set; }

        public int SumTotalAbnormal { get; set; }
    }
}
