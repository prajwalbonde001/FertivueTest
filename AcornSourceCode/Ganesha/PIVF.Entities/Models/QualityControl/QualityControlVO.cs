using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PIVF.Entities.Models.QualityControl
{
    public class QualityControlVO
    {
        public long ID { get; set; }
        public long UnitId { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? Time { get; set; }
        public long ParameterID { get; set; }
        public string MParameterDecription { get; set; }
        public long IncubatorID { get; set; }
        public string MIncubatorDecription { get; set; }
        public string HeraTemperature { get; set; }
        public string HeraCO2 { get; set; }
        public string WaterLevel { get; set; }
        public string MINCTemperature { get; set; }
        public string Cleaning { get; set; }
        public string MINCLevel { get; set; }
        public long EquipmentsID { get; set; }
        public string MEquipmentsDecription { get; set; }
        public string LaminarTemperature { get; set; }
        public string HepaFilter { get; set; }
        public string Prefilter { get; set; }
        public string ICSIStageTemperature { get; set; }
        public string TestTubeWarmerTemperature { get; set; }
        public string GasCO2 { get; set; }
        public string N2 { get; set; }
        public string Trigas { get; set; }
        public string Voe { get; set; }
        public string AtmTemperature { get; set; }
        public string AtmHumidity { get; set; }
        public long LiquidN2TanksID { get; set; }
        public string MLiquidN2TanksDecription { get; set; }
        public string LevelTank1 { get; set; }
        public string LevelTank2 { get; set; }
        public string RefrigTemperature { get; set; }
        public long InfectionControlID { get; set; }
        public string MInfectionControlDecription { get; set; }
        public string Swab1 { get; set; }
        public string Swab2 { get; set; }
        public string Swab3 { get; set; }
        public bool Status { get; set; }
        public int TotalRows { get; set; }

        public List<clsParameter> ParameterSelected { get; set; }
        public List<clsIncubator> IncubatorSelected { get; set; }
        public List<clsEquipment> EquipmentSelected { get; set; }
        public List<clsLiquidN2Tank> LiquidN2TankSelected { get; set; }
        public List<clsInfectionControl> InfectionControlSelected { get; set; }


        public List<QualityControlVO> ListQualityControl = new List<QualityControlVO>();
    }

    public class clsParameter
    {
        public int id { get; set; }
    }

    public class clsIncubator
    {
        public int id { get; set; }
    }

    public class clsEquipment
    {
        public int id { get; set; }
    }

    public class clsLiquidN2Tank
    {
        public int id { get; set; }
    }


    public class clsInfectionControl
    {
        public int id { get; set; }
    }
}
