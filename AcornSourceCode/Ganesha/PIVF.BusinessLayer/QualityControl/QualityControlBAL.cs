using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.QualityControl;
using PIVF.Entities.Models.Patient;


namespace PIVF.BusinessLayer.QualityControl
{
 public interface QualityControlBAL
    {
        long SaveQualityControl(QualityControlVO Data);

        IEnumerable<QualityControlVO> GetQalityControl(int PageIndex);

        long DeleteQualityControlRecordRow(QualityControlVO Data);
    }
}
