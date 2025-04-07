using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.LinkPartner
{
    public class LinkPartnerVO
    {
        public int UnitId { get; set; }

        public int MalePatientUnitId { get; set; } //Added by AniketK on 13Jan2020
        public int FemalePatientUnitId { get; set; } //Added by AniketK on 13Jan2020
        public int PatientCategory { get; set; }
        public int MaleId { get; set; }
        public int FemaleId { get; set; }
        public int IsFemale { get; set; }

        public int VisitId { get; set; }
        public int VisitStatus { get; set; }


    }
}
