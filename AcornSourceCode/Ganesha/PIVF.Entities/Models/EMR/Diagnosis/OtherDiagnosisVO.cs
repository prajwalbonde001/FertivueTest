using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.Dignosis
{
    public class OtherDiagnosisVO
    {       
        public long ID   {get;set;}
        public long UnitID   {get;set;}
        public string Code   {get;set;}
        public string Diagnosis   {get;set;}
        public bool Status {get;set;}
        public bool IsFavourite   {get;set;}
        public long CreatedUnitID   {get;set;}
        public long UpdatedUnitID   {get;set;}
        public long AddedBy   {get;set;}
        public string AddedOn   {get;set;}
        public DateTime AddedDateTime   {get;set;}
        public long UpdatedBy   {get;set;}
        public string UpdatedOn   {get;set;}
        public DateTime UpdatedDateTime   {get;set;}
        public string AddedWindowsLoginName   {get;set;}
        public string UpdateWindowsLoginName   {get;set;}
        public bool Synchronized   {get;set;}
        public int TotalRows { get; set; }
        public bool IsOther { get; set; }
        public string AddedByUserName { get; set; }
        public long DiagnosisTypeID { get; set; }
        public bool IsSelected { get; set; }
        public string SearchColumns { get; set; }
    }
}
