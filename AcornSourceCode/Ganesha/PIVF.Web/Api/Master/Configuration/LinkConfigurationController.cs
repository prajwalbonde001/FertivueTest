using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace PIVF.Web.Api.Master.Configuration
{
    [Authorize]
    public class LinkConfigurationController : ApiController
    {
        
        [ResponseType(typeof(LinkConfiguration))]
        [HttpGet]
        public IHttpActionResult GetLinkConfiguration()
        {
            try
            {
                //web.config  based Configurations 
                LinkConfiguration config = new LinkConfiguration();
                config.IsLinkPartnerConfig = ConfigurationManager.AppSettings["LinkPartner"].ToString();
                config.IsMarkDonerConfig = ConfigurationManager.AppSettings["MarkDoner"].ToString();
                config.IsInvestigationMarkDoner = ConfigurationManager.AppSettings["LinkDonerInvestigation"].ToString();
                config.IsAuto = ConfigurationManager.AppSettings["RegMRNoAuto"].ToString(); //Added by AniketK on 08July2019
                config.IsManual = ConfigurationManager.AppSettings["RegMRNoManual"].ToString(); //Added by AniketK on 08July2019
                config.PACFlagSet = ConfigurationManager.AppSettings["PACFlag"].ToString();

                // var Response = _Converttodonor.ConvertToDonorPatient(PatientID, GenderID);
                return Ok(config);
            }
            
            catch (Exception ex)
            {
                return new NotFoundResult(Request);
            }
        }
    }

    public class LinkConfiguration
    {
        public string IsLinkPartnerConfig { get; set; }
        public string IsMarkDonerConfig { get; set; }
        public string IsInvestigationMarkDoner { get; set; }
        public string IsAuto { get; set; } //Added by AniketK on 08July2019
        public string IsManual { get; set; } //Added by AniketK on 08July2019

        public string PACFlagSet { get; set; } //Added by sujata on 08July2019
    }
   
}
