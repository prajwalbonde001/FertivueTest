using System;
using System.Collections.Generic;


namespace PIVF.Entities.Models.Master.IVF
{
    public class DoctorList
    {
        public List<CommanEntity> All { get; set;}
        public List<CommanEntity> EmbryologistAndrologist { get; set; }
        public List<CommanEntity> Embryologist{ get; set; }
        public List<CommanEntity> Andrologist{ get; set;}
        public List<CommanEntity> Clinician{ get; set;}
        //public List<CommanEntity> Clinician_Embryologist{ get; set;}
    }
}
