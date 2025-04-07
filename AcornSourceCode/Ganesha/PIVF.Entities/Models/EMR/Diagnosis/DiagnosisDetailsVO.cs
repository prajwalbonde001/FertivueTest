using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.Diagnosis
{
    public class DiagnosisDetailsVO
    {
        public long ID {get;set;}
        public long UnitID  {get;set;}
        public DateTime TDate {get;set;}
        public string Code    {get;set;}
        public string AddedByUserName {get;set;}
        public string Diagnosis   {get;set;}
        public string DiagnosisType {get;set;}
        public string Reason { get; set; }
        public int TotalRows { get; set; }
    }
}
