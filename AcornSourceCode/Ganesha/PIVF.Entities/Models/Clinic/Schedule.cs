using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Clinic
{
    public class Schedule : Entity 
    {
        [Key]
        public int SCID { get; set; }
        public string DoctorName { get; set; }
        public string Description { get; set; }
        public string Department { get; set; }
        public string AddedOn { get; set; }
        public string DaysByComma { get; set; }
        public string ScheduleStartDates { get; set; }
        public int CreatedUnitID { get; set; }
        public int UpdatedUnitID { get; set; }
        public int AddedBy { get; set; }
        public string AddedWindowsLoginName { get; set; }
        public int UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public string UpdateWindowsLoginName { get; set; }
        public bool Synchronized { get; set; }
        public bool @IsScheduleCancel { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
        public DateTime? AddedDateTime { get; set; }
        public DateTime? FromTime { get; set; }
        public DateTime? ToTime { get; set; }
        public int ScheduleID { get; set; }
        public int SlotID { get; set; }    //Added by Nayan Kamble on 19/11/2019 
        public string SlotDescription { get; set; }     //Added by Nayan Kamble on 19/11/2019 
       //public string ScheduleSlotdesc { get; set; }   //Added by Nayan Kamble on 19/11/2019   
        //public int ScheduleSlot { get; set; }     //Added by Nayan Kamble on 19/11/2019  
        public DateTime? SStartTime { get; set; }   //Added by Nayan Kamble on 19/11/2019   
        public DateTime? SEndTime { get; set; }   //Added by Nayan Kamble on 19/11/2019    
        public int DOCID { get; set; }
        public int DeptID { get; set; }
        public int ScheduleUnitID { get; set; }
        public string DayID { get; set; }
        public int DocScheduleDetailID { get; set; }  
        public string Day { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }   
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Interval { get; set; }
        public bool ApplyToAllDay { get; set; }
        public bool Status { get; set; }
        public string Type { get; set; }
        public string ReasonForAD { get; set; }

        public int UnitID { get; set; }
        public string ScheduleType { get; set; }
        public string SelectedWeek { get; set; }
        public string Selectedday { get; set; }
        public int TotalRecords { get; set; }
        public string ClinicName { get; set; }
    }

    

}
