using Dapper;
using DataBaseConfiguration;
using PIVF.Entities.Models.Master.Billing;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Patient;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.DataAccessLayer.Patient
{
    public class PatientVisitService
    {
        DapperConnection con = new DapperConnection();

        //public PatientVisit GetPatientDetails(string Criteria, bool IsAppSearch)//Commented by AniketK on 28Nov2019
        public PatientVisit GetPatientDetails(string Criteria, bool IsAppSearch, int RegUnitID)//Added by AniketK on 28Nov2019
        {
            var Param = new DynamicParameters();
            Param.Add("@criteria", Criteria);
            Param.Add("@IsAppSearch", IsAppSearch);
            //Param.Add("@RegUnitID", GenericSP.CurrentUser.UnitID); //Commented by AniketK on 28Nov2019
            Param.Add("@RegUnitID", RegUnitID);//Added by AniketK on 28Nov2019

            PatientVisit obj = new PatientVisit();
            obj.lstPatientAutoComplete = new List<PatientVisit>();

            using (this.con.DapCon)
            {
                obj.lstPatientAutoComplete = this.con.DapCon.Query<PatientVisit>(GenericSP.GetPatientVisit, Param, commandType: CommandType.StoredProcedure).AsList();
            }
            foreach (PatientVisit item in obj.lstPatientAutoComplete)
            {
                if (!string.IsNullOrEmpty(Convert.ToString(item.Photo)))
                    item.PhotoString = System.Text.Encoding.UTF8.GetString(item.Photo);
                else
                    item.PhotoString = string.Empty;

            }
            return obj;
        }

        public List<VisitType> GetDDVisitTypeList()
        {
            List<VisitType> lst = new List<VisitType>();
            var Param = new DynamicParameters();
            Param.Add("@ID", "VTID");
            Param.Add("@ASID", "VTID");
            Param.Add("@Description", "Description");
            Param.Add("@ASDescription", "Description");
            Param.Add("@tblName", "M_VisitTypeMaster");
            using (this.con.DapCon)
            {
                lst = this.con.DapCon.Query<VisitType>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
                lst.Insert(0, new VisitType { VTID = 0, Description = "Select" });
            }
            return lst;
        }

        public List<Cabin> GetDDCabinList()
        {
            List<Cabin> lst = new List<Cabin>();
            var Param = new DynamicParameters();
            Param.Add("@ID", "CabinID");
            Param.Add("@ASID", "CabinID");
            Param.Add("@Description", "CabinDescription");
            Param.Add("@ASDescription", "CabinDescription");
            Param.Add("@tblName", "M_CabinMaster");
            using (this.con.DapCon)
            {
                lst = this.con.DapCon.Query<Cabin>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
                lst.Insert(0, new Cabin { CabinID = 0, CabinDescription = "Select" });
            }
            return lst;
        }

        public List<Doctor> GetDoctorList()
        {
            List<Doctor> lst = new List<Doctor>();
            var Param = new DynamicParameters();

            using (this.con.DapCon)
            {
                lst = this.con.DapCon.Query<Doctor>(GenericSP.GetAllDoctorList, Param, commandType: CommandType.StoredProcedure).AsList();
                lst.Insert(0, new Doctor { DOCID = 0, FirstName = "Select" });
            }
            return lst;
        }

        public PatientVisit GetPayersDD()
        {
            try
            {
                #region Filling Maters
                PatientVisit objVisit = new PatientVisit();
                objVisit.ListCategory = new List<CategoryL2Master>();
                objVisit.ListPatientSource = new List<CategoryL1Master>();
                objVisit.ListCompany = new List<Company>();
                objVisit.ListAssCompany = new List<AssociateCompany>();
                objVisit.ListTariff = new List<TariffMaster>();
                //objVisit.ListRelation = new List<PatientRelation>();
                using (this.con.DapCon)
                {

                    #region Patient Category
                    var Param1 = new DynamicParameters();
                    Param1.Add("@ID", "CatL2ID");
                    Param1.Add("@ASID", "CatL2ID");
                    Param1.Add("@Description", "CatL2Description");
                    Param1.Add("@ASDescription", "CatL2Description");
                    Param1.Add("@tblName", "M_CategoryL2Master");
                    objVisit.ListCategory = this.con.DapCon.Query<CategoryL2Master>(GenericSP.GetDDLists, Param1, commandType: CommandType.StoredProcedure).AsList();
                    objVisit.ListCategory.Insert(0, new CategoryL2Master { CatL2ID = 0, CatL2Description = "Select" });
                    #endregion

                    #region Patient Source
                    var Param2 = new DynamicParameters();
                    Param2.Add("@ID", "CatL1ID");
                    Param2.Add("@ASID", "CatL1ID");
                    Param2.Add("@Description", "CatL1Description");
                    Param2.Add("@ASDescription", "CatL1Description");
                    Param2.Add("@tblName", "M_CategoryL1Master");
                    objVisit.ListPatientSource = this.con.DapCon.Query<CategoryL1Master>(GenericSP.GetDDLists, Param2, commandType: CommandType.StoredProcedure).AsList();
                    objVisit.ListPatientSource.Insert(0, new CategoryL1Master { CatL1ID = 0, CatL1Description = "Select" });

                    #endregion

                    #region Company
                    var Param3 = new DynamicParameters();
                    Param3.Add("@ID", "CompID");
                    Param3.Add("@ASID", "CompID");
                    Param3.Add("@Description", "Description");
                    Param3.Add("@ASDescription", "Description");
                    Param3.Add("@tblName", "M_CompanyMaster");
                    objVisit.ListCompany = this.con.DapCon.Query<Company>(GenericSP.GetDDLists, Param3, commandType: CommandType.StoredProcedure).AsList();
                    objVisit.ListCompany.Insert(0, new Company { CompID = 0, Description = "Select" });

                    #endregion

                    #region Associate Company
                    //var Param4 = new DynamicParameters();
                    //Param4.Add("@ID", "CompAssID");
                    //Param4.Add("@ASID", "CompAssID");
                    //Param4.Add("@Description", "Description");
                    //Param4.Add("@ASDescription", "Description");
                    //Param4.Add("@tblName", "M_CompanyAssociateMaster");
                    //objVisit.ListAssCompany = this.con.DapCon.Query<AssociateCompany>(GenericSP.GetDDLists, Param4, commandType: CommandType.StoredProcedure).AsList();
                    objVisit.ListAssCompany.Insert(0, new AssociateCompany { CompAssID = 0, Description = "Select" });

                    #endregion

                    #region Tariff
                    //var Param5 = new DynamicParameters();
                    //Param5.Add("@ID", "TID");
                    //Param5.Add("@ASID", "TID");
                    //Param5.Add("@Description", "Description");
                    //Param5.Add("@ASDescription", "Description");
                    //Param5.Add("@tblName", "M_TariffMaster");
                    //objVisit.ListTariff = this.con.DapCon.Query<TariffMaster>(GenericSP.GetDDLists, Param5, commandType: CommandType.StoredProcedure).AsList();
                    objVisit.ListTariff.Insert(0, new TariffMaster { TID = 0, Description = "Select" });

                    #endregion

                    #region Relation
                    //var Param6 = new DynamicParameters();
                    //Param6.Add("@ID", "RelationID");
                    //Param6.Add("@ASID", "RelationId");
                    //Param6.Add("@Description", "Description");
                    //Param6.Add("@ASDescription", "Description");
                    //Param6.Add("@tblName", "M_RelationMaster");
                    //objVisit.ListRelation = this.con.DapCon.Query<PatientRelation>(GenericSP.GetDDLists, Param6, commandType: CommandType.StoredProcedure).AsList();
                    //if (objVisit.ListRelation.Count == 0)
                    //{
                    //objVisit.ListRelation.Insert(0, new PatientRelation { RelationId = 0, Description = "Select" });
                    //}

                    #endregion

                }
                return objVisit;

                #endregion
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PatientVisit GetPatientCatBySrcID(int CatL1ID)
        {
            try
            {
                PatientVisit objRegBO = new PatientVisit();
                objRegBO.ListCategory = new List<CategoryL2Master>();

                var Param1 = new DynamicParameters();
                if (CatL1ID > 0)
                {
                    Param1.Add("@SrcId", CatL1ID);
                }
                else
                {
                    Param1.Add("@SrcId", 0);
                }
                objRegBO.ListCategory = this.con.DapCon.Query<CategoryL2Master>(GenericSP.GetPatientCatBySrcID, Param1, commandType: CommandType.StoredProcedure).AsList();
                if (objRegBO.ListCategory.Count == 0)
                {
                    Param1.Add("@SrcId", 0);
                    objRegBO.ListCategory = this.con.DapCon.Query<CategoryL2Master>(GenericSP.GetPatientCatBySrcID, Param1, commandType: CommandType.StoredProcedure).AsList();
                }
                objRegBO.ListCategory.Insert(0, new CategoryL2Master { CatL2ID = 0, CatL2Description = "Select" });


                return objRegBO;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<PatientRelation> LoadRelationList(string Gender)
        {
            try
            {
                var Param1 = new DynamicParameters();
                Param1.Add("@Gender", Gender);
                List<PatientRelation> result = this.con.DapCon.Query<PatientRelation>(GenericSP.GetPatientRelation, Param1, commandType: CommandType.StoredProcedure).AsList();
                result.Insert(0, new PatientRelation { RelationId = 0, Description = "Select" });
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PatientVisit GetAssCompany(int CompID)
        {
            try
            {
                PatientVisit objRegBO = new PatientVisit();
                objRegBO.ListAssCompany = new List<AssociateCompany>();

                var Param1 = new DynamicParameters();
                if (CompID > 0)
                {
                    Param1.Add("@CompId", CompID);
                }
                else
                {
                    Param1.Add("@CompId", 0);
                }
                objRegBO.ListAssCompany = this.con.DapCon.Query<AssociateCompany>(GenericSP.GetAssCompByCompID, Param1, commandType: CommandType.StoredProcedure).AsList();
                if (objRegBO.ListAssCompany.Count == 0)
                {
                    Param1.Add("@CompId", 0);
                    objRegBO.ListAssCompany = this.con.DapCon.Query<AssociateCompany>(GenericSP.GetAssCompByCompID, Param1, commandType: CommandType.StoredProcedure).AsList();
                }
                objRegBO.ListAssCompany.Insert(0, new AssociateCompany { CompAssID = 0, Description = "Select" });


                return objRegBO;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public PatientVisit GetTariffByAssCompany(int CompAssID)
        {
            try
            {
                PatientVisit objRegBO = new PatientVisit();
                objRegBO.ListTariff = new List<TariffMaster>();

                var Param1 = new DynamicParameters();
                if (CompAssID > 0)
                {
                    Param1.Add("@CompAssID", CompAssID);
                }
                else
                {
                    Param1.Add("@CompAssID", 0);
                }
                objRegBO.ListTariff = this.con.DapCon.Query<TariffMaster>(GenericSP.GetTariffByAssCompID, Param1, commandType: CommandType.StoredProcedure).AsList();
                if (objRegBO.ListTariff.Count == 0)
                {
                    Param1.Add("@CompAssID", 0);
                    objRegBO.ListTariff = this.con.DapCon.Query<TariffMaster>(GenericSP.GetTariffByAssCompID, Param1, commandType: CommandType.StoredProcedure).AsList();
                }
                objRegBO.ListTariff.Insert(0, new TariffMaster { TID = 0, Description = "Select" });


                return objRegBO;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public PatientVisit GetVisits(int RegID, int RegUnitID, int PageIndex)
        {
            try
            {
                PatientVisit objRegBO = new PatientVisit();
                objRegBO.lstPatientVisit = new List<PatientVisit>();

                var Param1 = new DynamicParameters();
                Param1.Add("@RegID", RegID);
                Param1.Add("@RegUnitID", RegUnitID);
                Param1.Add("@PageIndex", PageIndex);

                objRegBO.lstPatientVisit = this.con.DapCon.Query<PatientVisit>(GenericSP.GetVisitlist, Param1, commandType: CommandType.StoredProcedure).AsList();

                return objRegBO;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public PatientVisit GetSponsers(int RegID, int PageIndex)
        {
            try
            {
                PatientVisit objRegBO = new PatientVisit();
                objRegBO.ListSponser = new List<PatientSponser>();

                var Param1 = new DynamicParameters();
                Param1.Add("@RegID", RegID);
                Param1.Add("@PageIndex", PageIndex);

                objRegBO.ListSponser = this.con.DapCon.Query<PatientSponser>(GenericSP.GetSponserlist, Param1, commandType: CommandType.StoredProcedure).AsList();

                return objRegBO;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public PatientVisit SaveVisit(PatientVisit objVisit, DataTable dtPayer)
        {
            try
            {
                var Param1 = new DynamicParameters();

                #region Parameters
                Param1.Add("@VisitUnitId", GenericSP.CurrentUser.UnitID);
                Param1.Add("@VisitDate", objVisit.VisitDate);
                Param1.Add("@RegID", objVisit.RegID);
                Param1.Add("@RegUnitID", objVisit.RegUnitID);
                Param1.Add("@OPDNO", null);
                Param1.Add("@VTID", objVisit.VTID);
                Param1.Add("@DeptID", objVisit.DeptID);
                Param1.Add("@DOCID", objVisit.DOCID);
                Param1.Add("@CabinID", objVisit.CabinID);
                Param1.Add("@ReferredDoctorID", objVisit.ReferredDoctorID);
                Param1.Add("@VisitNotes", objVisit.Remark);
                Param1.Add("@VisitStatus", objVisit.VisitStatus);
                if (objVisit.CurrentVisitStatus > 0)
                    Param1.Add("@CurrentVisitStatus", objVisit.CurrentVisitStatus);
                else
                    Param1.Add("@CurrentVisitStatus", 1);
                Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                Param1.Add("@AddedOn", Environment.MachineName);
                Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                Param1.Add("@VisitTime", objVisit.VisitTime);
                Param1.Add("@TokenNo", objVisit.TokenNo);

                Param1.Add("@BankID", objVisit.BankID);
                Param1.Add("@BranchName", objVisit.BranchName);
                Param1.Add("@IFSCCode", objVisit.IFSCCode);
                Param1.Add("@AccoutType", objVisit.AccoutType);
                Param1.Add("@AccountNo", objVisit.AccountNo);
                Param1.Add("@CustName", objVisit.CustName);
                Param1.Add("@Status", objVisit.Status);
                Param1.Add("@APPID", objVisit.APPID);

                Param1.Add("@SponserDetails", dtPayer.AsTableValuedParameter());
                Param1.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                Param1.Add("@VID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                #endregion

                using (this.con.DapCon)

                {
                    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["PIVFContext"].ConnectionString);
                    con.Execute(GenericSP.AddVisit, Param1, commandType: CommandType.StoredProcedure);
                    //con.DapCon.Execute(GenericSP.AddVisit, Param1, commandType: CommandType.StoredProcedure);
                }
                  objVisit.SuccessStatus = Param1.Get<Int32>("@SuccessStatus");
                objVisit.VisitID = Param1.Get<Int32>("@VID");
                return objVisit;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public String GetTokenNo(int CabinID)
        {
            try
            {
                String TokenNo = "";

                var Param1 = new DynamicParameters();
                Param1.Add("@CabinID", CabinID);
                Param1.Add("@VisitUnitId", GenericSP.CurrentUser.UnitID);
                Param1.Add("@TokenNo", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);

                using (this.con.DapCon)
                {
                    con.DapCon.Execute(GenericSP.SetTokenNo, Param1, commandType: CommandType.StoredProcedure);
                }
                return TokenNo = Param1.Get<String>("@TokenNo");

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Added by Nayan Kamble on 19/11/2019  Start

        public Int32 SaveExternalDoc(Doctor objDoc)   /* Int32*/  
        {
            var Param = new DynamicParameters();
            Int32 ResultStatus = 0;
            if (objDoc.DOCID > 0)
            {
                if (objDoc.RowsCount == 0)
                {
                    Param.Add("@Mode", 2);
                }
                else
                {
                    Param.Add("@Mode", 3);
                }
            }
            else
            {
                Param.Add("@Mode", 1);
            }

            #region M_DoctorMaster Fields
            Param.Add("@DOCID", objDoc.DOCID);
            Param.Add("@SID", objDoc.SID);
            if (objDoc.SuID == 0)
            {
                Param.Add("@SuID", null);
            }
            else
            {
                Param.Add("@SuID", objDoc.SuID);
            }
            if (objDoc.DocCatID == 0)
            {
                Param.Add("@DocCatID", null);
            }
            else
            {
                Param.Add("@DocCatID", objDoc.DocCatID);
            }
            Param.Add("@FirstName", objDoc.FirstName);
            Param.Add("@MiddleName", objDoc.MiddleName);
            Param.Add("@LastName", objDoc.LastName);
            Param.Add("@GenderId", objDoc.GenderId);
            Param.Add("@Education", objDoc.Education);
            Param.Add("@Experience", objDoc.Experience);
            Param.Add("@RegestrationNumber", objDoc.RegestrationNumber);
            Param.Add("@Signature", objDoc.Signature == null ? new byte[] { } : objDoc.Signature);
            Param.Add("@DoctorTypeID", objDoc.DocTypeID);
            Param.Add("@IsReferral", objDoc.IsReferral);
            Param.Add("@BDMID", objDoc.BDMID);

            #endregion

            #region M_StaffDoctorMaster Fields
            Param.Add("@EmailId", objDoc.EmailId);
            Param.Add("@MaritalStatusId", objDoc.MaritalStatusId);
            Param.Add("@Photo", objDoc.Photo == null ? new byte[] { } : objDoc.Photo);

            Param.Add("@DOB", objDoc.DOB);
            Param.Add("@AgeYear", objDoc.AgeYear);
            Param.Add("@AgeMonth", objDoc.AgeMonth);
            Param.Add("@AgeDays", objDoc.AgeDays);
            Param.Add("@MobCountryId", objDoc.MobCountryId);
            Param.Add("@Mobno", objDoc.Mobno);
            Param.Add("@AltMobCountryId", objDoc.AltMobCountryId);
            Param.Add("@AltMobno", objDoc.AltMobno);

            if (objDoc.DOCID == 0)
            {
                //Param.Add("@CreatedUnitID", 1); //Commented and Modified by AniketK on 06Nov2019
                Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);

                //Param.Add("@AddedBy", 1); //Commented and Modified by AniketK on 06Nov2019
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);

                Param.Add("@AddedDateTime", DateTime.Now);
                Param.Add("@AddedUTCDateTime", DateTime.UtcNow);
                Param.Add("@AddedOn", Environment.MachineName);

                //Param.Add("@AddedWindowsLoginName", "Test"); //Commented and Modified by AniketK on 06Nov2019
                Param.Add("@AddedWindowsLoginName", Environment.UserName);
            }
            //Param.Add("@UpdatedUnitID", 1); //Commented and Modified by AniketK on 06Nov2019
            Param.Add("@UpdatedUnitID", GenericSP.CurrentUser.UnitID);

            //Param.Add("@UpdatedBy", 1); //Commented and Modified by AniketK on 06Nov2019
            Param.Add("@UpdatedBy", GenericSP.CurrentUser.UserID);

            Param.Add("@UpdatedOn", Environment.MachineName);
            Param.Add("@UpdatedDateTime", DateTime.Now);
            Param.Add("@UpdatedUTCDateTime", DateTime.UtcNow);

            //Param.Add("@UpdateWindowsLoginName", "Test");  //Commented and Modified by AniketK on 06Nov2019
            Param.Add("@UpdateWindowsLoginName", Environment.UserName);

            Param.Add("@Synchronized", objDoc.Synchronized);
            Param.Add("@Address1", objDoc.Address1);
            Param.Add("@Address2", objDoc.Address2);
            Param.Add("@CountryID", objDoc.CountryID);
            Param.Add("@StateID", objDoc.StateID);
            Param.Add("@CityID", objDoc.CityID);
            Param.Add("@Street", objDoc.Street);
            Param.Add("@LandMark", objDoc.LandMark);
            Param.Add("@PinCode", objDoc.PinCode);
            Param.Add("@Area", objDoc.Area);
            Param.Add("@StdCode", objDoc.StdCode);
            Param.Add("@LandLineNo", objDoc.LandLineNo);
            Param.Add("@AltAddress1", objDoc.AltAddress1);
            Param.Add("@AltAddress2", objDoc.AltAddress2);
            Param.Add("@AltCountryID", objDoc.AltCountryID);
            Param.Add("@AltStateID", objDoc.AltStateID);
            Param.Add("@AltCityID", objDoc.AltCityID);
            Param.Add("@AltStreet", objDoc.AltStreet);
            Param.Add("@AltLandMark", objDoc.AltLandMark);
            Param.Add("@AltPinCode", objDoc.AltPinCode);
            Param.Add("@AltArea", objDoc.AltArea);
            Param.Add("@AltStdCode", objDoc.AltStdCode);
            Param.Add("@AltLandLineNo", objDoc.AltLandLineNo);
            Param.Add("@Status", objDoc.Status);
            Param.Add("@ReasonForAD", objDoc.ReasonForAD);

            #endregion

            Param.Add("@SelectedDeparments", objDoc.SelectedDeparments);
            Param.Add("@SelectedUnits", objDoc.SelectedUnits);
            Param.Add("@SelectedClassifications", objDoc.SelectedClassifications);

            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            using (this.con.DapCon)
            {
                con.DapCon.Execute(GenericSP.InsertUpdateDoctor, Param, commandType: CommandType.StoredProcedure);
            }
            return ResultStatus = Param.Get<Int32>("@ResultStatus"); 
            // return this.con.DapCon.Query<Classification>(GenericSP.GetDDLists, Param, commandType: CommandType.StoredProcedure).AsList();
        }


        //Added by Nayan Kamble on 19/11/2019  END



    }
}
