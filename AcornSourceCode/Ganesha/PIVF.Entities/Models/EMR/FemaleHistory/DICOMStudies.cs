using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.FemaleHistory
{
    public class DICOMStudies
    {
        public DateTime ScanDate { get; set; }
        public DateTime ScanTime {get;set;}
        public string Accession_Number {get;set;}
        public string Institution_Name {get;set;}
        public string Reason_for_the_Req_Proc {get;set;}
        public string Requesting_Physician {get;set;}
        public string StudyLink {get;set;}
    }
}
