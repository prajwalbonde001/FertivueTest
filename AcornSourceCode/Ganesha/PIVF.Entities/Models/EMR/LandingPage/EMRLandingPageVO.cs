﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.LandingPage
{
    public class EMRLandingPageVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long VisitID { get; set; }
        public long PatientID { get; set; }
        public long PatientUnitID { get; set; }
        public bool IsFollowupPatient { get; set; }
        public string Allergy { get; set; }
        public List<EMRLandingPagePrescriptionVO> lstPrescription { get; set; }
        public List<EMRLandingDiagnosisVO> lstDiagnosis { get; set; }
        public List<EMRLandingInvestigationVO> lstInvestigation { get; set; }
        public List<EMRLandingCCVO> lstCC { get; set; }
        public List<EMRLandingHistory> lstHistory { get; set; }
        

    }

    public class EMRLandingPagePrescriptionVO
    {
        public string DrugName { get; set; }
        public string MoleculeName { get; set; }
        public string Frequency { get; set; }
        public DateTime? PrescriptionDate { get; set; }
        
    }

    public class EMRLandingDiagnosisVO
    {
        public string DiagnoName { get; set; }
        public string DiagnoCode { get; set; }
        public string DiagnoType { get; set; }
    }

    public class EMRLandingInvestigationVO
    {
        public string ServiceName { get; set; }
        public DateTime? InvDate { get; set; }
    }

    public class EMRLandingCCVO
    {
        public DateTime? FCDate { get; set; }
        public string CapturedBy { get; set; }
        public int ID { get; set; }
    }

    public class EMRLandingHistory
    {
        public DateTime? Date { get; set; }
        public string CapturedBy { get; set; }
        public int ID { get; set; }
    }
}
