using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.LinkPartner;

namespace PIVF.BusinessLayer.LinkPartner
{
   public  interface LinkPartnerBAL
    {
        int linkPartner(LinkPartnerVO linkPartnerObj);
        int linkDonor(int PatientId,int UnitId,int GenderId, string Action);
    }
}
