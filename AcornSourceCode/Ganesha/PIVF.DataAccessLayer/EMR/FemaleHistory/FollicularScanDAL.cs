using PIVF.BusinessLayer.EMR.FemaleHistory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PIVF.Entities.Models.EMR.FemaleHistory;
using Dapper;
using System.Data;
using DataBaseConfiguration;
using PIVF.Entities.Models.EMR;
using PIVF.Entities.Models.Master.IVF;

namespace PIVF.DataAccessLayer.EMR.FemaleHistory
{
    public class FollicularScanDAL : FollicularScanBAL
    {
        private Microsoft.Practices.EnterpriseLibrary.Data.Database dbServer = null;
        IDbConnection con;
        public FollicularScanDAL()
        {
            //Create Instance of the database object and BaseSql object
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
        }
        public List<FollicularScan> LoadPreviousFollicularScanData()
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
            return this.con.Query<FollicularScan>(GenericSP.GetPreviousFollicularScanData, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<DICOMStudies> GetAllDICOMStudies(string RequestForm)
        {
            var Param = new DynamicParameters();
            Param.Add("@MRNo", GenericSP.SelectedCouple.FemalePatient.FemalePatientMRNO);
            Param.Add("@RequestingForm", RequestForm);
            return this.con.Query<DICOMStudies>(GenericSP.GetDICOMStudies, Param, commandType: CommandType.StoredProcedure).AsList();
        }

        public int SaveOrUpdateFollicularScan(FollicularScan obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@ID", obj.ID);
            Param.Add("@UnitID", obj.UnitID == null ? 0 : Convert.ToInt32(obj.UnitID));
            Param.Add("@FCPatientID", obj.FCPatientID == null ? 0 : Convert.ToInt32(obj.FCPatientID));
            Param.Add("@FCUserID", obj.FCUserID == null ? 0 : Convert.ToInt32(obj.FCUserID));
            Param.Add("@TherapyId", obj.TherapyId);
            // Param.Add("@TherapyUnitID", GenericSP.CurrentUser.UnitID); 
             Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@FollicularScanDate", Convert.ToDateTime(obj.FollicularScanDate));
            Param.Add("@FollicularScanTime", Convert.ToDateTime(obj.FollicularScanTime));
            Param.Add("@Cyclecode", obj.Cyclecode);
            Param.Add("@EndometriumThickness", obj.EndometriumThickness);
            Param.Add("@cyst", Convert.ToDouble(obj.Cyst));
            Param.Add("@Rcyst", Convert.ToDouble(obj.RCyst));
            Param.Add("@RI", obj.RI);
            Param.Add("@PSV", obj.PSV);
            Param.Add("@LeftAFC", obj.LeftAFC);
            Param.Add("@RightAFC", obj.RightAFC);

            Param.Add("@EndometriumMorphologyID", obj.EndometriumMorphologyID == null ? 0 : Convert.ToInt32(obj.EndometriumMorphologyID));
            Param.Add("@FollicularScanRemark", obj.FollicularScanRemark);
            Param.Add("@IsFinalize", obj.IsFinalize);
            Param.Add("@LMPDate", obj.LMPDate);
            Param.Add("@CycleDay", obj.CycleDay);
            Param.Add("@VisitID", GenericSP.SelectedPatient.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedPatient.VisitUnitID);
            Param.Add("@PhysicianID", GenericSP.CurrentUser.UserID);
            Param.Add("@ResultStatus", dbType: DbType.String, direction: ParameterDirection.Output, size: 300);
            try
            {
                string ResultStatus = string.Empty;
                if (obj.ID > 0)
                {
                    //Need to update follicular scan details with it's size and images
                    con.Execute(GenericSP.InsertFollicularScan, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus = Param.Get<string>("@ResultStatus");
                    if (obj.ListItem != null && obj.ListItem.Count > 0)
                    {
                        //first delete all the size details
                        con.Execute("delete from T_IVFDashboard_FollicularMonitoringSizeDetails where FollicularMonitoringId = @id", new { id = Convert.ToInt32(ResultStatus) });

                        for (int Index = 0; Index < obj.ListItem.Count; Index++)
                        {
                            //if ((obj.ListItem[Index].LeftOvaryDimensionLength > 0
                            //    && obj.ListItem[Index].LeftOvaryDimensionBreadth > 0)
                            //    || (obj.ListItem[Index].RightOvaryDimensionLength > 0
                            //    && obj.ListItem[Index].RightOvaryDimensionBreadth > 0))
                            if (obj.ListItem[Index].LeftOvaryDimensionAvg > 0
                                || obj.ListItem[Index].RightOvaryDimensionAvg > 0 || obj.ListItem[Index].LeftPSV > 0 || obj.ListItem[Index].RightPSV > 0 || obj.ListItem[Index].LeftRI > 0 || obj.ListItem[Index].LeftPSV > 0)
                            {
                                //Insert if any field is greater than zero value
                                var ParamImages = new DynamicParameters();
                                ParamImages.Add("@MonitoringID", Convert.ToInt32(ResultStatus));
                                ParamImages.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
                                ParamImages.Add("@LeftLength", obj.ListItem[Index].LeftOvaryDimensionAvg);//obj.ListItem[Index].LeftOvaryDimensionLength
                                ParamImages.Add("@LeftBreadth", obj.ListItem[Index].LeftOvaryDimensionAvg);//obj.ListItem[Index].LeftOvaryDimensionBreadth
                                //ParamImages.Add("@LeftAvg", Convert.ToDouble(OvaryTotal(obj.ListItem[Index].LeftOvaryDimensionLength, obj.ListItem[Index].LeftOvaryDimensionBreadth)));
                                ParamImages.Add("@LeftAvg", obj.ListItem[Index].LeftOvaryDimensionAvg);
                                ParamImages.Add("@RightLength", obj.ListItem[Index].RightOvaryDimensionAvg);//obj.ListItem[Index].RightOvaryDimensionLength
                                ParamImages.Add("@RightBreadth", obj.ListItem[Index].RightOvaryDimensionAvg); //obj.ListItem[Index].RightOvaryDimensionBreadth
                                //ParamImages.Add("@RightAvg", Convert.ToDouble(OvaryTotal(obj.ListItem[Index].RightOvaryDimensionLength, obj.ListItem[Index].RightOvaryDimensionBreadth)));
                                ParamImages.Add("@RightAvg", obj.ListItem[Index].RightOvaryDimensionAvg);
                                ParamImages.Add("@RightRI", obj.ListItem[Index].RightRI);
                                ParamImages.Add("@LeftRI", obj.ListItem[Index].LeftRI);
                                ParamImages.Add("@RightPSV", obj.ListItem[Index].RightPSV);
                                ParamImages.Add("@LeftPSV", obj.ListItem[Index].LeftPSV);
                                con.Execute(GenericSP.InsertFollicularScanSizeDetails, ParamImages, commandType: CommandType.StoredProcedure);
                            }
                        }
                    }
                    if (ResultStatus != null)
                    {
                        //before insertion delete already added images
                        con.Execute("delete from T_IVFDashyboard_FollicularMonitoringImages where MonitoringID = @id", new { id = Convert.ToInt32(ResultStatus) });
                    }
                    //Images
                    if (obj.FollicularScanImages != null && obj.FollicularScanImages.Count > 0)
                    {
                        for (int ImgIndex = 0; ImgIndex < obj.FollicularScanImages.Count; ImgIndex++)
                        {
                            //Insert images in database
                            var ParImg = new DynamicParameters();
                            ParImg.Add("@MonitoringID", Convert.ToInt32(ResultStatus));
                            ParImg.Add("@ImageName", obj.FollicularScanImages[ImgIndex].name);
                            ParImg.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.FollicularScanImages[ImgIndex].preview));
                            con.Execute(GenericSP.InsertFollicularScanImages, ParImg, commandType: CommandType.StoredProcedure);
                        }
                    }

                }
                else
                {
                    con.Execute(GenericSP.InsertFollicularScan, Param, commandType: CommandType.StoredProcedure);
                    ResultStatus = Param.Get<string>("@ResultStatus");
                    // Insert details after sucessfull master data insertion
                    if (Convert.ToInt32(ResultStatus) > 0)
                    {
                        for (int Index = 0; Index < obj.ListItem.Count; Index++)
                        {
                            //if ((obj.ListItem[Index].LeftOvaryDimensionLength > 0
                            //    && obj.ListItem[Index].LeftOvaryDimensionBreadth > 0)
                            //    || (obj.ListItem[Index].RightOvaryDimensionLength > 0
                            //    && obj.ListItem[Index].RightOvaryDimensionBreadth > 0))
                            if (obj.ListItem[Index].LeftOvaryDimensionAvg > 0
                               || obj.ListItem[Index].RightOvaryDimensionAvg > 0)
                            {
                                //Insert if any field is greater than zero value
                                var ParamImages = new DynamicParameters();
                                ParamImages.Add("@MonitoringID", Convert.ToInt32(ResultStatus));
                                ParamImages.Add("@UnitID", GenericSP.SelectedPatient.UnitID);
                                ParamImages.Add("@LeftLength", obj.ListItem[Index].LeftOvaryDimensionAvg);   //   obj.ListItem[Index].LeftOvaryDimensionLength);    //Commented by Nayan Kamble
                                ParamImages.Add("@LeftBreadth", obj.ListItem[Index].LeftOvaryDimensionAvg);   // obj.ListItem[Index].LeftOvaryDimensionBreadth);   //Commented by Nayan Kamble
                                //ParamImages.Add("@LeftAvg", Convert.ToDouble(OvaryTotal(obj.ListItem[Index].LeftOvaryDimensionLength, obj.ListItem[Index].LeftOvaryDimensionBreadth)));
                                ParamImages.Add("@LeftAvg", obj.ListItem[Index].LeftOvaryDimensionAvg);
                                ParamImages.Add("@RightLength", obj.ListItem[Index].RightOvaryDimensionAvg);  // obj.ListItem[Index].RightOvaryDimensionLength);   //Commented by Nayan Kamble
                                ParamImages.Add("@RightBreadth", obj.ListItem[Index].RightOvaryDimensionAvg);  // obj.ListItem[Index].RightOvaryDimensionBreadth);  //ommented by Nayan Kamble
                                //ParamImages.Add("@RightAvg", Convert.ToDouble(OvaryTotal(obj.ListItem[Index].RightOvaryDimensionLength, obj.ListItem[Index].RightOvaryDimensionBreadth)));
                                ParamImages.Add("@RightAvg", obj.ListItem[Index].RightOvaryDimensionAvg);
                                ParamImages.Add("@RightRI", obj.ListItem[Index].RightRI);
                                ParamImages.Add("@LeftRI", obj.ListItem[Index].LeftRI);
                                ParamImages.Add("@RightPSV", obj.ListItem[Index].RightPSV);
                                ParamImages.Add("@LeftPSV", obj.ListItem[Index].LeftPSV);
                                con.Execute(GenericSP.InsertFollicularScanSizeDetails, ParamImages, commandType: CommandType.StoredProcedure);
                            }
                        }

                        // Insert images if they present there
                        if (obj.FollicularScanImages != null)
                        {
                            for (int ImgIndex = 0; ImgIndex < obj.FollicularScanImages.Count; ImgIndex++)
                            {
                                //Insert images in database
                                var ParImg = new DynamicParameters();
                                ParImg.Add("@MonitoringID", Convert.ToInt32(ResultStatus));
                                ParImg.Add("@ImageName", obj.FollicularScanImages[ImgIndex].name);
                                ParImg.Add("@preview", System.Text.Encoding.UTF8.GetBytes(obj.FollicularScanImages[ImgIndex].preview));
                                con.Execute(GenericSP.InsertFollicularScanImages, ParImg, commandType: CommandType.StoredProcedure);
                            }
                        }
                    }
                }

                return Convert.ToInt32(ResultStatus);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public FollicularScan GetSingleFollicularScan(int ID)
        {
            FollicularScan obj = new FollicularScan();
            var Param = new DynamicParameters();
            Param.Add("@PatientID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@PatientUnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            Param.Add("@TherapyID", GenericSP.SelectedCouple.FemalePatient.TherapyID);
            Param.Add("@TherapyUnitID", GenericSP.SelectedCouple.FemalePatient.TherapyUnitID);
            Param.Add("@VisitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitID);
            Param.Add("@VisitUnitID", GenericSP.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID);
            Param.Add("@ID", ID);
            var QueryMultiple = this.con.QueryMultiple(GenericSP.GetSingleFollicularScan, Param, commandType: CommandType.StoredProcedure);
            obj = QueryMultiple.Read<FollicularScan>().SingleOrDefault();
            obj.ListItem = QueryMultiple.Read<SizeDetails>().ToList();
            obj.FollicularDetails = new SurgivalOther();
            obj.FollicularDetails.model = new List<model>();
            obj.FollicularDetails.model = QueryMultiple.Read<model>().ToList();
            obj.FollicularScanImages = new List<Entities.Models.EMR.model>();

            return obj;
        }
        public double OvaryTotal(Double? Length, Double? Breadth)
        {
            var total = ((Length + Breadth) / 2);
            double avg = (Convert.ToDouble(total) * 100) / 100;
            return round(avg, 0.05);
            //return (Math.Round(Convert.ToDouble(total) * 2) / 2);
        }

        public double round(double value, double step)
        {
            var inv = 1.0 / step;
            return Math.Round(value * inv) / inv;
        }

        public List<CommanEntity> LoadCycleCodeList()
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetCycleCodeList");
            Param.Add("@ID", GenericSP.SelectedCouple.FemalePatient.FemalePatientID);
            Param.Add("@UnitID", GenericSP.SelectedCouple.FemalePatient.FemalePatientUnitID);
            return this.con.Query<CommanEntity>(GenericSP.GetList, Param, commandType: CommandType.StoredProcedure).AsList();
        }
    }
}
