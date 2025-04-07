using Dapper;
using DataBaseConfiguration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using PIVF.BusinessLayer.Patient;
using PIVF.Entities.Models.Master.Patient;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

using PIVF.Entities.Models.NewRegistration;
using PIVF.BusinessLayer.NewRegistration;
using PIVF.BusinessLayer.EMR.DesignEMR;

namespace PIVF.DataAccessLayer.NewRegistration
{
    public class NewRegistrationDAL : NewRegistrationBAL
    {
        private Database dbServer = null;
        IDbConnection con;
        DesignEMRServiceBAL ObjSrv;
        public NewRegistrationDAL(DesignEMRServiceBAL obj)
        {
            if (dbServer == null)
                dbServer = HMSConfigurationManager.GetDatabaseReference();
            con = dbServer.CreateConnection();
            ObjSrv = obj;
           
        }
        public string SaveUpdate(NewRegistrationVO obj)
        {
            int Status = 0;
            int Status1 = 0;
            string Mrn = "";
            long PatientID1 = 0;
            if (CheckExistingDocDuplicacy(obj.lstPatient[0].ExtDocFirstName, obj.lstPatient[0].ExtDocLastName, obj.lstPatient[0].MobileNo))
            {
                int pID = 0; int tmppid = 0;
                using (var transactionScope = new TransactionScope())
                {
                    foreach (var item in obj.lstPatient)
                    {
                        pID = 0;
                        var Param = new DynamicParameters();
                        Param.Add("@Action", "RegisterUpdatePatient");
                        Param.Add("@ID", item.ID);
                        Param.Add("@PatientID", tmppid);
                        Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                        //Param.Add("@APPID", item.APPID);
                        Param.Add("@PatientCategoryID", item.PatientCategoryID);
                        if (item.PatientCategoryID == 11)
                        {
                            Param.Add("@MRNo", item.MRNo);
                        }
                        Param.Add("@RegistrationDate", DateTime.Now);
                        Param.Add("@EthnicityID", item.EthnicityID);
                        //   Param.Add("@PrefixId", item.PrefixId);
                        Param.Add("@FirstName", item.FirstName);
                        Param.Add("@MiddleName", item.MiddleName);
                        Param.Add("@LastName", item.LastName);
                        Param.Add("@FamilyName", item.FamilyName);
                        Param.Add("@DateOfBirth", item.DateOfBirth);

                        Param.Add("@GenderID", item.GenderID);
                        Param.Add("@AgentID", item.AgentID);
                        Param.Add("@AgencyID", item.AgencyID);
                        Param.Add("@BloodGroupID", item.BloodGroupID);
                        Param.Add("@ReligionID", item.ReligionID);
                        Param.Add("@OccupationId", item.OccupationId);
                        Param.Add("@EducationID", item.EducationID);
                        Param.Add("@MaritalStatusID", item.MaritalStatusID);
                        Param.Add("@NationalityID", item.NationalityID);
                        Param.Add("@IdentityID", item.IdentityID);
                        Param.Add("@IdentityNumber", item.IdentityNumber);
                        Param.Add("@MobileCountryCode", item.MobCountryCodeID);
                        //Param.Add("@MobileNo", item.MobileNo);  //Commented and Modified by AniketK on 30August2019
                        Param.Add("@ContactNo1", item.MobileNo);
                        Param.Add("@Age", item.Age);
                        Param.Add("@Email", item.Email);
                        Param.Add("@MarriedSince", item.MarriedSince);
                        Param.Add("@ExistingChildren", item.ExistingChildren);
                        Param.Add("@FamilyType", item.FamilyType);
                        Param.Add("@IsReferredPatient", item.IsReferredPatient);
                        Param.Add("@SourceOfReferenceID", item.SourceOfReferenceID);
                        Param.Add("@CampID", item.CampID);
                        Param.Add("@BDMID", item.BDMID);
                        Param.Add("@ReferredDoctorID", item.ReferredDoctorID);
                        Param.Add("@ReferralRemark", item.ReferralRemark);
                        Param.Add("@IsSpecialReg", obj.lstPatient[0].IsSpecialReg);
                        Param.Add("@RegFrom", item.RegFrom);
                        Param.Add("@IsDonor", item.IsDonor);
                        Param.Add("@APPID", item.APPID);
                        Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                        Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                        Param.Add("@AddedOn", Environment.MachineName);
                        Param.Add("@AddedWindowsLoginName", Environment.UserName);

                        if (item.GenderID == 2)
                        {
                            if (!string.IsNullOrEmpty(Convert.ToString(item.strPhoto)))
                            {
                                item.Photo = System.Text.Encoding.UTF8.GetBytes(item.strPhoto);
                                obj.strPhoto1 = item.strPhoto;
                                Param.Add("@Photo", item.Photo);
                                //Param.Add("@attFileName", item.FileName);
                                Param.Add("@FileName", item.FileName); //""
                                string FileName = Param.Get<string>("@FileName");
                                obj.FileName1 = FileName;  // null
                            }
                        }
                        if (item.GenderID == 1)
                        {
                            if (!string.IsNullOrEmpty(Convert.ToString(item.strPhoto)))
                            {
                                item.Photo = System.Text.Encoding.UTF8.GetBytes(item.strPhoto);
                                obj.strPhotoPartner1 = item.strPhoto;
                                Param.Add("@Photo", item.Photo);
                                //Param.Add("@attFileName", item.FileName);
                                Param.Add("@FileName", item.FileName);
                                string FileName = Param.Get<string>("@FileName");
                                obj.FileNamePartner1 = FileName;
                            }
                        }

                        //   else Param.Add("@Photo", item.Photo);
                        //if (!string.IsNullOrEmpty(Convert.ToString(item.strAttachment)))
                        //{
                        //    item.Attachment = System.Text.Encoding.UTF8.GetBytes(item.strAttachment);
                        //    Param.Add("@Attachment", item.Attachment);
                        //    Param.Add("@attFileName", item.attFileName);
                        //}
                        if (item.GenderID == 2)
                        {
                            if (!string.IsNullOrEmpty(Convert.ToString(item.strAttachment)))
                            {
                                item.Attachment = System.Text.Encoding.UTF8.GetBytes(item.strAttachment);
                                obj.strAttachment1 = item.strAttachment;
                                Param.Add("@Attachment", item.Attachment);
                                Param.Add("@attFileName", item.attFileName);
                                string attFileName = Param.Get<string>("@attFileName");
                                obj.attFileName1 = attFileName;
                            }
                        }
                        if (item.GenderID == 1)
                        {
                            if (!string.IsNullOrEmpty(Convert.ToString(item.strAttachment)))
                            {
                                item.Attachment = System.Text.Encoding.UTF8.GetBytes(item.strAttachment);
                                obj.strAttachmentPartner1 = item.strAttachment;
                                Param.Add("@Attachment", item.Attachment);
                                Param.Add("@attFileName", item.attFileName);
                                string attFileName = Param.Get<string>("@attFileName");
                                obj.attFileNamePartner1 = attFileName;
                            }
                        }
                        else
                            //    Param.Add("@Attachment", item.Photo);
                            Param.Add("@ExtDocFirstName", item.ExtDocFirstName);
                        Param.Add("@ExtDocMiddleName", item.ExtDocMiddleName);
                        Param.Add("@ExtDocLastName", item.ExtDocLastName);
                        Param.Add("@SpecID", item.SpecID);
                        Param.Add("@ExtDocGenderID", item.ExtDocGenderID);
                        Param.Add("@ExtDocMobConCode", item.ExtDocMobConCode);
                        Param.Add("@ExtDocMobileNo", item.ExtDocMobileNo);
                        Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        Param.Add("@MRNoOut", direction: ParameterDirection.Output, size: 30);
                        Param.Add("@PatientID1", dbType: DbType.Int64, direction: ParameterDirection.Output);
                        Param.Add("@FileNameWeb", direction: ParameterDirection.Output, size: 50);
                        Param.Add("@FileNameWebatt", direction: ParameterDirection.Output, size: 50);
                        this.con.Query<string>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure,commandTimeout:3600).FirstOrDefault();
                        //pID = Param.Get<Int32>("@ResultStatus"); tmppid = pID; //Commented and Modified by AniketK on 09July2019
                        pID = Param.Get<Int32>("@ResultStatus");
                        if (item.Ispatient) 
                            Mrn = Param.Get<string>("@MRNoOut");
                            PatientID1 = Param.Get<dynamic>("@PatientID1");
                        string FileNameWeb = Param.Get<string>("@FileNameWeb");
                        string FileNameWebatt = Param.Get<string>("@FileNameWebatt");
                        if (item.GenderID == 2)
                        { 
                            obj.PatientID1 = PatientID1;
                            //long GenderID1 = Param.Get<long>("@GenderID");
                            obj.GenderID1 = item.GenderID;
                            if(FileNameWeb != null)
                                obj.FileName1 = FileNameWeb;
                            if (FileNameWebatt != null)
                                obj.attFileName1 = FileNameWebatt;
                        }
                        if (item.GenderID == 1)
                        {
                            obj.PartnerID1 = PatientID1;
                            //long GenderIDPart1 = Param.Get<long>("@GenderID");
                            obj.GenderIDPart1 = item.GenderID;
                            if (FileNameWeb != null)
                                obj.FileNamePartner1 = FileNameWeb;
                            if (FileNameWebatt != null)
                                obj.attFileNamePartner1 = FileNameWebatt;
                        }

                        if (pID > 0)
                        {

                            Status = pID; //Status = 1; //Commented and Modified by AniketK on 09July2019
                            foreach (NewAddress i in obj.lstAddress)
                            {
                                if (item.Ispatient && i.IsPatient)
                                {
                                    var Param1 = new DynamicParameters();
                                    Param1.Add("@Action", "SaveUpdateAddress");
                                    Param1.Add("@ID", i.ID);
                                    Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                                    //Param1.Add("@PatientID", pID);
                                    Param1.Add("@PatientID", PatientID1);
                                    Param1.Add("@IsPermenant", i.IsPermenant);
                                    Param1.Add("@IsCommunication", i.IsCommunication);
                                    Param1.Add("@IsOther", i.IsOther);
                                    Param1.Add("@AddressLine1", i.AddressLine1);
                                    Param1.Add("@AddressLine2", i.AddressLine2);
                                    Param1.Add("@Street", i.Street);
                                    Param1.Add("@LandMark", i.Landmark);
                                    Param1.Add("@CountryID", i.CountryID);
                                    Param1.Add("@StateID", i.StateID);
                                    Param1.Add("@CityID", i.CityID);
                                    Param1.Add("@Area", i.Area);
                                    Param1.Add("@Pincode", i.Pincode);
                                    Param1.Add("@LandLinecode", i.LandLineNoCode);
                                    Param1.Add("@LandLineNo", i.LandLineNo);
                                    Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                                    Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                                    Param1.Add("@AddedOn", Environment.MachineName);
                                    Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                                    Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                                    this.con.Query<int>(GenericSP.Registration, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                                    Status1 = Param1.Get<Int32>("@ResultStatus");
                                    Status = pID; //Added by AniketK on 09July2019
                                }
                                else if (!item.Ispatient && !i.IsPatient)
                                {
                                    var Param1 = new DynamicParameters();
                                    Param1.Add("@Action", "SaveUpdateAddress");
                                    Param1.Add("@ID", i.ID);
                                    Param1.Add("@UnitID", GenericSP.CurrentUser.UnitID);
                                    //Param1.Add("@PatientID", pID);
                                    Param1.Add("@PatientID", PatientID1);
                                    Param1.Add("@IsPermenant", i.IsPermenant);
                                    Param1.Add("@IsCommunication", i.IsCommunication);
                                    Param1.Add("@IsOther", i.IsOther);
                                    Param1.Add("@AddressLine1", i.AddressLine1);
                                    Param1.Add("@AddressLine2", i.AddressLine2);
                                    Param1.Add("@Street", i.Street);
                                    Param1.Add("@LandMark", i.Landmark);
                                    Param1.Add("@CountryID", i.CountryID);
                                    Param1.Add("@StateID", i.StateID);
                                    Param1.Add("@CityID", i.CityID);
                                    Param1.Add("@Area", i.Area);
                                    Param1.Add("@Pincode", i.Pincode);
                                    Param1.Add("@LandLinecode", i.LandLineNoCode);
                                    Param1.Add("@LandLineNo", i.LandLineNo);
                                    Param1.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
                                    Param1.Add("@AddedBy", GenericSP.CurrentUser.UserID);
                                    Param1.Add("@AddedOn", Environment.MachineName);
                                    Param1.Add("@AddedWindowsLoginName", Environment.UserName);
                                    Param1.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                                    this.con.Query<int>(GenericSP.Registration, Param1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                                    Status1 = Param1.Get<Int32>("@ResultStatus");
                                    Status = pID; //Added by AniketK on 09July2019
                                }
                            }
                        }
                    }

                    transactionScope.Complete();
                }
            }
            if (obj.IsFromCounterSale)
                 {
                return Status.ToString() + "/" + Mrn + "/" + PatientID1;
              }
            else { 
            return Status.ToString() + "/" + Mrn;
            }
        }

        public List<NewPatient> getPatientList(NewPatient obj)
        {
            try
            {
                var Param = new DynamicParameters();

                // Todo: Dhanashri: Remove comment before giving release
               Param.Add("@Action", "GetPatientList");
                Param.Add("@PageNo", obj.PageNo);
                Param.Add("@UnitID", obj.UnitID);
                Param.Add("@FirstName", obj.FirstName);
                Param.Add("@SourceOfReferenceID", obj.SourceOfReferenceID);
                Param.Add("@PatientCategoryID", obj.PatientCategoryID);
                Param.Add("@ReferredDoctorID", obj.ReferredDoctorID);
                Param.Add("@IdentityNumber", obj.IdentityNumber);
                Param.Add("@RegFromDate", obj.RegFromDate);
                Param.Add("@RegToDate", obj.RegToDate);
                Param.Add("@VisFromDate", obj.RegVisFromDate);
                Param.Add("@VisToDate", obj.RegVisToDate);
                Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
               
                // Todo: Dhanashri: Remove comment before giving release
                 return this.con.Query<PIVF.Entities.Models.NewRegistration.NewPatient>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure,commandTimeout:3600).ToList();

                // Todo: Dhanashri:comment before giving release
               //return this.con.Query<PIVF.Entities.Models.NewRegistration.NewPatient>("usp_GetPatientList", Param, commandType: CommandType.StoredProcedure, commandTimeout: 3600).ToList(); 

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        //public NewPatient getPatientByID(int id)
        public NewPatient getPatientByID(NewPatient obj)
        {
            var Param = new DynamicParameters();
            //NewPatient tmpobj = new NewPatient();
            //PIVF.Gemino.Entities.Models.Patient.Couple CoupleInfo = new Couple();

            List<PIVF.Entities.Models.NewRegistration.NewPatient> objList = new List<Entities.Models.NewRegistration.NewPatient>();
            Param.Add("@Action", "GetPatientByID");
            Param.Add("@PatientID", obj.ID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);           
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            objList = this.con.Query<PIVF.Entities.Models.NewRegistration.NewPatient>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure, commandTimeout: 8600).ToList();
            //obj = this.con.Query<PIVF.Gemino.Entities.Models.Patient.Patient>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            if (objList != null)
            {
                obj = objList.FirstOrDefault(x => x.ID == obj.ID);
                //obj.SpouseInfo = objList.FirstOrDefault(x => x.ID != id);
                obj.SpouseInfo = objList.FirstOrDefault(x => x.ID != obj.ID);
            }
            obj.PatientAdditionalInformationTemplate = ObjSrv.GetTemplateByFormID(obj.FormId,0);


            //if (!string.IsNullOrEmpty(Convert.ToString(obj.Photo)))
            //{
            //    obj.strPhoto = System.Text.Encoding.UTF8.GetString(obj.Photo);
            //}
            //if (!string.IsNullOrEmpty(Convert.ToString(obj.Attachment)))
            //{
            //    obj.strAttachment = System.Text.Encoding.UTF8.GetString(obj.Attachment);
            //}

            //if (!string.IsNullOrEmpty(Convert.ToString(obj.SpouseInfo.Photo)))       -- commented by Nayan Kamble
            //{
            //    obj.SpouseInfo.strPhoto = System.Text.Encoding.UTF8.GetString(obj.SpouseInfo.Photo);
            //}
            //if (!string.IsNullOrEmpty(Convert.ToString(obj.SpouseInfo.Attachment)))
            //{
            //    obj.SpouseInfo.strAttachment = System.Text.Encoding.UTF8.GetString(obj.SpouseInfo.Attachment);
            //}

            //Added by Nayan Kamble  Start
            //if (obj.SpouseInfo != null)              //Added by Nayan Kamble
            //{
            //if (!string.IsNullOrEmpty(Convert.ToString(obj.SpouseInfo.Photo)))
            //{
            //    obj.SpouseInfo.strPhoto = System.Text.Encoding.UTF8.GetString(obj.SpouseInfo.Photo);
            //}
            //    if (!string.IsNullOrEmpty(Convert.ToString(obj.SpouseInfo.Attachment)))
            //    {
            //        obj.SpouseInfo.strAttachment = System.Text.Encoding.UTF8.GetString(obj.SpouseInfo.Attachment);
            //    }
            //}
            //Added by Nayan Kamble End

            return obj;
        }
        public NewRefInfo getPatientRefInfo(int id)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientRefInfo");
            Param.Add("@PatientID", id);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<Entities.Models.NewRegistration.NewRefInfo>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public NewAddress getPatientAddress(int id, bool? isOthr)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientAddress");
            Param.Add("@PatientID", id);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@IsOther", isOthr);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.Entities.Models.NewRegistration.NewAddress>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public NewInfo getPatientInfo(int id)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientInfo");
            Param.Add("@PatientID", id);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.Entities.Models.NewRegistration.NewInfo>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public NewInfo getPatientSpouseInfo(int id)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientInfo");
            Param.Add("@PatientID", id);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.Entities.Models.NewRegistration.NewInfo>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public NewAddInfo getPatientAddInfo(int id)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetPatientAddInfo");
            Param.Add("@PatientID", id);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.Entities.Models.NewRegistration.NewAddInfo>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
        public NewBankInfo GetBankInformation(int id, int UnitID)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "GetBankInformation");
            Param.Add("@PatientID", id);
            Param.Add("@UnitID", UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            return this.con.Query<PIVF.Entities.Models.NewRegistration.NewBankInfo>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        }

        public int updatePatientRefInfo(NewRefInfo obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "UpdatePatientRefInfo");
            Param.Add("@PatientID", obj.ID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@SourceOfReferenceID", obj.SourceOfReferenceID);
            Param.Add("@ReferralRemark", obj.ReferralRemark);
            Param.Add("@ReferredDoctorID", obj.ReferredDoctorID);
            Param.Add("@CampID", obj.CampID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<Int32>("@ResultStatus");
        }

        public int updatePatientAddress(NewAddress obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "SaveUpdateAddress");
            Param.Add("@ID", obj.ID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@PatientID", obj.PatientID);
            Param.Add("@IsOther", obj.IsOther);
            Param.Add("@IsPermenant", obj.IsPermenant);
            Param.Add("@IsCommunication", obj.IsCommunication);
            Param.Add("@AddressLine1", obj.AddressLine1);
            Param.Add("@AddressLine2", obj.AddressLine2);
            Param.Add("@Street", obj.Street);
            Param.Add("@Landmark", obj.Landmark);
            Param.Add("@CityID", obj.CityID);
            Param.Add("@CountryID", obj.CountryID);
            Param.Add("@StateID", obj.StateID);
            Param.Add("@Area", obj.Area);
            Param.Add("@LandlineCode", obj.LandLineNoCode);
            Param.Add("@LandlineNo", obj.LandLineNo);
            Param.Add("@Pincode", obj.Pincode);
            Param.Add("@CreatedUnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@AddedBy", GenericSP.CurrentUser.UserID);
            Param.Add("@AddedOn", Environment.MachineName);
            Param.Add("@AddedWindowsLoginName", Environment.UserName);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<Int32>("@ResultStatus");
        }

        public int updatePatientInfo(NewInfo obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "UpdatePatientInfo");
            Param.Add("@PatientID", obj.ID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@FirstName", obj.FirstName);
            Param.Add("@MiddleName", obj.MiddleName);
            Param.Add("@LastName", obj.LastName);
            Param.Add("@Email", obj.Email);
            Param.Add("@GenderID", obj.GenderID);
            Param.Add("@DateOfBirth", obj.DateOfBirth);
            Param.Add("@Age", obj.Age);
            Param.Add("@MaritalStatusID", obj.MaritalStatusID);
            Param.Add("@BloodGroupID", obj.BloodGroupID);
            Param.Add("@MobileCountryCode", obj.MobCountryCodeID);
            //Param.Add("@MobileNo", obj.MobileNo); //Commented and Modified by AniketK on 29August2019
            Param.Add("@ContactNo1", obj.MobileNo);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<Int32>("@ResultStatus");
        }

        public int updatePatientAddInfo(NewAddInfo obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "UpdatePatientAddInfo");
            Param.Add("@PatientID", obj.ID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@IdentityID", obj.IdentityID);
            Param.Add("@IdentityNumber", obj.IdentityNumber);
            Param.Add("@NationalityID", obj.NationalityID);
            Param.Add("@EthnicityID", obj.EthnicityID);
            Param.Add("@ReligionID", obj.ReligionID);
            Param.Add("@EducationID", obj.EducationID);
            Param.Add("@OccupationId", obj.OccupationId);
            Param.Add("@MarriedSince", obj.MarriedSince);
            Param.Add("@ExistingChildren", obj.ExistingChildren);
            Param.Add("@FamilyType", obj.FamilyType);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<Int32>("@ResultStatus");
        }
        public int updatePatientPhoto(string[] str)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "UpdatePatientPhoto");
            Param.Add("@PatientID", Convert.ToInt32(str[0]));
            Param.Add("@UnitID", Convert.ToInt32(str[1]));
            string aaa = str[2];
            if (!string.IsNullOrEmpty(Convert.ToString(aaa)))
            {
                //Param.Add("@Photo", System.Text.Encoding.UTF8.GetBytes(aaa));
                str[2] = aaa;
            }
            //else
                //Param.Add("@Photo", null);
            Param.Add("@FileName", str[3]);
            string FileName = Param.Get<string>("@FileName");
            str[3] = FileName;

            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@FileNameWeb", direction: ParameterDirection.Output, size: 50);
            this.con.Query<int>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            string FileNameWeb = Param.Get<string>("@FileNameWeb");
            if (FileNameWeb != null)
                str[3] = FileNameWeb;
            return Param.Get<Int32>("@ResultStatus");
        }

        public int deletePatientPhoto(string[] str)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "DeletePatientPhoto");
            Param.Add("@PatientID", Convert.ToInt32(str[0]));
            Param.Add("@UnitID", Convert.ToInt32(str[1]));
            //string aaa = str[2];
            //if (!string.IsNullOrEmpty(Convert.ToString(aaa)))
            //{
            //    Param.Add("@Photo", System.Text.Encoding.UTF8.GetBytes(aaa));
            //}
            //else
            //    Param.Add("@Photo", null);
            //Param.Add("@FileName", str[3]);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Param.Get<Int32>("@ResultStatus");
        }

        public int updateAttachment(string[] str)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "UpdatePatientAttachment");
            Param.Add("@PatientID", Convert.ToInt32(str[0]));
            Param.Add("@UnitID", Convert.ToInt32(str[1]));
            string aaa = str[2];
            if (!string.IsNullOrEmpty(Convert.ToString(aaa)))
            {
                str[2] = aaa;
                //Param.Add("@Attachment", System.Text.Encoding.UTF8.GetBytes(aaa));
            }
            //else
                //Param.Add("@Photo", null);
            Param.Add("@attFileName", str[3]);
            string attFileName = Param.Get<string>("@attFileName");
            str[3] = attFileName;
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            Param.Add("@FileNameWebatt", direction: ParameterDirection.Output, size: 50);
            this.con.Query<int>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            string FileNameWebatt = Param.Get<string>("@FileNameWebatt");
            if (FileNameWebatt != null)
                str[3] = FileNameWebatt;
            return Param.Get<Int32>("@ResultStatus");
        }

        public NewPatient viewAttachment(NewPatient obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "viewAttachment");
            Param.Add("@PatientID", obj.PatientID);
            Param.Add("@UnitID", GenericSP.CurrentUser.UnitID);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            obj = this.con.Query<PIVF.Entities.Models.NewRegistration.NewPatient>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

            return obj;
        }
        public int InsertUpdateBankDetails(PatientRegistration obj)
        {
            var Param = new DynamicParameters();
            Param.Add("@PatientID", obj.RegID);
            Param.Add("@UnitID", obj.RegUnitID);
            Param.Add("@BankID", obj.BankID);
            Param.Add("@BranchName", obj.BranchName);
            Param.Add("@IFSCCode", obj.IFSCCode);
            Param.Add("@AccoutType", obj.AccoutType);
            Param.Add("@AccountNo", obj.AccountNo);
            Param.Add("@CustName", obj.CustName);
            Param.Add("@Status", true);
            Param.Add("@SuccessStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            int ResultStatus = 0;
            this.con.Query<PatientRegistration>(GenericSP.InsertUpdateBankDetails, Param, commandType: CommandType.StoredProcedure).AsQueryable();
            return ResultStatus = Param.Get<int>("@SuccessStatus");
        }

        //public PIVF.Entities.Models.Patient.BankInfo GetBankInformation(int id, int UnitID)
        //{
        //    var Param = new DynamicParameters();
        //    Param.Add("@Action", "GetBankInformation");
        //    Param.Add("@PatientID", id);
        //    Param.Add("@UnitID", UnitID);
        //    Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //    return this.con.Query<PIVF.Entities.Models.Patient.BankInfo>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //}
        private bool CheckExistingDocDuplicacy(string FN, string LN, string MobNo)
        {
            var Param = new DynamicParameters();
            Param.Add("@Action", "CheckExistingDocDuplicacy");
            Param.Add("@ExtDocFirstName", FN);
            Param.Add("@ExtDocLastName", LN);
            Param.Add("@ExtDocMobileNo", MobNo);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            this.con.Query<int>(GenericSP.Registration, Param, commandType: CommandType.StoredProcedure,commandTimeout:3600).FirstOrDefault();
            return Param.Get<Int32>("@ResultStatus") == 3 ? false : true;
        }

        public Int32 CheckExistingPatientDuplicacy(NewPatient obj)
        {
            var Param = new DynamicParameters();

            Param.Add("@FirstName", obj.FirstName);
            Param.Add("@LastName", obj.LastName);
            Param.Add("@Gender", obj.Gender);
            Param.Add("@DOB", obj.DateOfBirth);
            Param.Add("@MobileCountryCode", obj.MobCountryCode);
            Param.Add("@ContactNO1", obj.MobileNo);
            Param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
            int ResultStatus = 0;
            this.con.Query<NewPatient>(GenericSP.PatientDuplicacy, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            //obj = this.con.Query<int>(GenericSP.PatientDuplicacy, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return ResultStatus = Param.Get<int>("@ResultStatus");
        }

        public List<NewAppoinmentInput> GetAvailableAppointmentSlotsModified(List<NewAppoinmentInput> input)
        {

            for (int i = 0; i < input.Count - 1; i++)
            {
                if (input[i].doctorMiddleName == null)
                {
                    input[i].doctorMiddleName = "";
                }

                DapperConnection con = new DapperConnection();
                var Param = new DynamicParameters();
                Param.Add("@doctorFirstName", input[i].doctorFirstName);
                Param.Add("@doctorMiddleName", input[i].doctorMiddleName);
                Param.Add("@doctorLastName", input[i].doctorLastName);
                Param.Add("@departmentId", "");
                Param.Add("@startsAt", input[i].timeslots);
                Param.Add("@endsAt", input[i + 1].timeslots);
                Param.Add("@newStartsAt", "");
                Param.Add("@newEndsAt", "");
                Param.Add("@patientFirstName", "");
                Param.Add("@patientMiddleName", "");
                Param.Add("@patientLastName", "");
                Param.Add("@status", 2);
                Param.Add("@genderId", "");
                Param.Add("@mobileConId", "");
                Param.Add("@mobileNo", "");
                Param.Add("@visitId", "");
                Param.Add("@remarks", "");
                Param.Add("@mrNo", "");
                Param.Add("@AddedBy", GenericSP.CurrentUser.UserID, DbType.Int64);
                Param.Add("@AddedDateTime", DateTime.Now, DbType.DateTime);
                input[i].status = con.DapCon.Query<int>(GenericSP.EditCurrentEvent, Param, commandType: CommandType.StoredProcedure).FirstOrDefault();

            }
            return input;
        }
        #region PatientPersonalCharacteristics

        #region SavePatientPersonalCharacteristics
        public int SavePatientPersonalCharacteristics(PatientPersonalCharacteristicsVO patientPersonalCharacteristicsVO)
        {
            int ResultStatus = 0;
            DynamicParameters param = new DynamicParameters();
            try
            {
                param.Add("@ID", patientPersonalCharacteristicsVO.ID);
                param.Add("@BuiltID", patientPersonalCharacteristicsVO.BuiltID);
                param.Add("@PatientID", patientPersonalCharacteristicsVO.PatientID);
                param.Add("@PatientUnitID", patientPersonalCharacteristicsVO.PatientUnitID);
                param.Add("@SkinColorID", patientPersonalCharacteristicsVO.SkinColorID);
                param.Add("@HairColorID", patientPersonalCharacteristicsVO.HairColorID);
                param.Add("@EyeColorID", patientPersonalCharacteristicsVO.EyeColorID);
                param.Add("@Remarks", patientPersonalCharacteristicsVO.Remarks);
                param.Add("@AddedBy", patientPersonalCharacteristicsVO.ID == 0?GenericSP.CurrentUser.UserName:"");
                param.Add("@UpdatedBy", patientPersonalCharacteristicsVO.ID > 0 ? GenericSP.CurrentUser.UserName : "");
                param.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output, size: 300);
                con.Query(GenericSP.SavePersonalCharacteristics, param, commandType: CommandType.StoredProcedure);
                ResultStatus = param.Get<Int32>("@ResultStatus");
            }
            catch (Exception exception)
            {
                ResultStatus = 0;
            }
            return ResultStatus;
        }
        #endregion SavePatientPersonalCharacteristics

        #region GetPatientPersonalCharacteristics
        public PIVF.Entities.Models.Patient.PatientPersonalCharacteristicsDetailsVO GetPatientPersonalCharacteristics(long patientID, long patientUnitID)
        {
            DynamicParameters param = new DynamicParameters();
            PIVF.Entities.Models.Patient.PatientPersonalCharacteristicsDetailsVO patientPersonalCharacteristicsDetailsVO = new PIVF.Entities.Models.Patient.PatientPersonalCharacteristicsDetailsVO();
            param.Add("@PatientID", patientID);
            param.Add("@PatientUnitID", patientUnitID);
            patientPersonalCharacteristicsDetailsVO = this.con.Query<PIVF.Entities.Models.Patient.PatientPersonalCharacteristicsDetailsVO>(GenericSP.GetPersonalCharacteristics, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return patientPersonalCharacteristicsDetailsVO;
        }
        #endregion
        
        #endregion PatientPersonalCharacteristics
    }
}
