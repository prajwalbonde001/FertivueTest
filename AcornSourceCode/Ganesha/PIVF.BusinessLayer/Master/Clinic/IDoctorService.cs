using PIVF.Entities.Mapping.Clinic;
using PIVF.Entities.Models.Master.Clinic;
using PIVF.Entities.Models.Master.Configuration;
using PIVF.Entities.Models.Master.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using Service.Pattern;

namespace PIVF.BusinessLayer.Master.Clinic
{
    public interface IDoctorService : IService<Doctor>
    {
        IEnumerable<Doctor> DoctorBySearchtext(string searchtext);
        IQueryable<Doctor> GetDoctorsList(int PageIndex, string FirstName, string Mobno, int SID,
                                            int DoctorTypeID, int SuID, int CFID, int UnitID,
                                            string EmailId, string RegestrationNumber,
                                            string Education, string Experience, int GenderId, int BDMID,
                                            int DocCatID, bool PagingEnabled);
        List<Gender> GetDDGenderList();
        List<MaritalStatus> GetDDMaritalStatusList();
        List<DoctorType> GetDDDoctorTypeList();
        List<DoctorCategory> GetDDDoctorCategoryList();
        List<Specialization> GetDDSpecializationList();
        List<SubSpecialization> GetSubSpecBySID(int SID, bool IsListing);
        string CalculateAge(DateTime DOB);
        string ConvertDate(object Datevalue, string parameter);
        List<Country> GetCountryCode(string Filter, bool Flag);
        List<DepartmentListForDoc> GetDepartmentListForDoc();
        List<Classification> GetDDClassificationList();
        List<Unit> GetDDUnitList();
        List<Doctor> GetDayMaster();
        Int32 InsertUpdateDoctor(Doctor objDoc);
        Doctor GetSpecificDoctor(int DOCID);
        Doctor GetDoctDetailByName(int DOCID);
        List<Doctor> GetAllDoctorNames(string doctorName);
        List<Doctor> GetDocListByDeptID(int deptID);
    }
}
