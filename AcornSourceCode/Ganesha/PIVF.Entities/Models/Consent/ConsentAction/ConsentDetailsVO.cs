using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Consent.ConsentAction
{
    public class ConsentDetailsVO
    {
        public long ID {get; set;}
        public long UnitID {get; set;}
        public DateTime? Date {get; set;}
	    public long TheropyID {get; set;}
	    public long TheropyUnitID  {get; set;}        
	    public long SelectedUnitID {get; set;}
        public string FormDesc {get; set;}
	    public string SchemaDesc {get; set;}
	    public string HTMLDesc {get; set;}
	    public string ModelDesc  {get; set;}
	    public bool IsFileUploaded { get; set; }
        public string FileStr { get; set; }
        public byte[] File { get; set; }
        public string FileName { get; set; }
        public bool Status { get; set; }
        public int AddedBy {get; set;}
	    public long AddedUnitID {get; set;}
	    public string AddedOn {get; set;}
	    public DateTime? AddedDateTime {get; set;}        
	    public DateTime? AddedUTCDateTime {get; set;}        
	    public string AddedWindowsLoginName {get; set;}
	    public int UpdatedBy  {get; set;}
	    public long UpdatedUnitID  {get; set;}
	    public DateTime? UpdatedDateTime  {get; set;}        
	    public DateTime? UpdatedUTCDateTime {get; set;}        
	    public string UpdateWindowsLoginName  {get; set;}
	    public bool Synchronized { get; set; }
        public bool bit { get; set; }
        public long ConsentID { get; set; }
        public string Consent { get; set; }
    }
}
