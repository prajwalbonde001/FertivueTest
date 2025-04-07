﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Entities.Models.Dashboard
{
    public class MalePatientDashBoardVO
    {
        public DateTime? LatestSemenAnalysisDate { get; set; }
        public string Diagnosis { get; set; }
        public string SpermConcentration { get; set; }
        public string Interpretation { get; set; }
        public string IsThaw { get; set; }
        public string TotalMotility { get; set; }
        public string Name { get; set; }
        public string MRNo { get; set; }
        public string DNAFragIndex { get; set; }

        public string BloodGroup { get; set; }

        public string MorphologyNormal { get; set; }


    }
}
