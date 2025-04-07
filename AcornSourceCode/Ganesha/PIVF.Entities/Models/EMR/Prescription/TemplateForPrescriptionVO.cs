using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.Prescription
{
    public class TemplateForPrescriptionVO
    {
        public long ID { get; set; }
        public long UnitID { get; set; }
        public long UserID { get; set; }
        public string TemplateName { get; set; }
        public bool Status { get; set; }
        public List<DrugVO> DrugList = new List<DrugVO>();
        public List<DrugVO> FavDrugList = new List<DrugVO>();
        public bool IsChecked { get;set;}
        //public long CreatedUnitID
        //public long UpdatedUnitID
        //public long AddedBy
        //public long AddedOn
        //public long AddedDateTime
        //public long UpdatedBy
        //public long UpdatedOn
        //public long UpdatedDateTime
        //public long AddedWindowsLoginName
        //public long UpdatedWindowsLoginName
        //public long Synchronized
    }
}
