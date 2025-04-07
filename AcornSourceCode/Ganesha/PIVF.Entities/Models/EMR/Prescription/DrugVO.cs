using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.EMR.Prescription
{
    public class DrugVO
    {
        public string Code { get; set; }
        public string BrandName { get; set; }
        public string ItemName { get; set; }
        public long? DrugID { get; set; }
        public long? MoleculeID { get; set; }
        public long ID { get; set; }
        public long UnitID { get; set; }        
        public long? UOMID { get; set; }
        public long? RouteID { get; set; }
        public long? FrequencyID { get; set; }
        public long? InstructionID { get; set; }
        public long? DrugSourceId { get; set; }
        public string DrugSource { get; set; }
        public float MRP { get; set; }
        public string RouteName { get; set; }
        public float AvailableStock { get; set; }
        public string UOM { get; set; }
        public string Strength { get; set; }
        public string MoleculeName { get; set; }
        public bool IsABC { get; set; }
        public long? StrengthUnitTypeID { get; set; }
        public bool IsFNS { get; set; }
        public bool IsVED { get; set; }
        public string AddedByName { get; set; }
        public string IssueStatus { get; set; }
        public int Days { get; set; }
        public float Quantity { get; set; }
        public string Warning { get; set; }

        public string Notes { get; set; }

        public string Comment { get; set; }
        
        public int ResultStatus { get; set; }
        public string Dose { get; set; }
        public string Frequency { get; set; }
        public bool IsOther { get; set; }
        public string Reason { get; set; }
        public bool IsMolecule {get;set;}
        public string Instruction { get; set; }
        public DateTime? Date { get; set; }
        public bool IsChecked { get; set; }
        public string TemplateName { get; set; }
        public long TemplateID { get; set; }
        public long UserID { get; set; }
        public bool Status { get; set; }

       

    }
}
