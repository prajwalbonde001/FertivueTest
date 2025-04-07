PIVF.service('DoctorService', function ($http, API) {

    this.GetData = function (PageIndex, DoctorData, PagingEnabled) {

        if (angular.isUndefined(DoctorData.FirstName)) { DoctorData.FirstName = ''; }
        if (angular.isUndefined(DoctorData.Mobno)) { DoctorData.Mobno = ''; }
        if (angular.isUndefined(DoctorData.SID)) { DoctorData.SID = 0; }
        if (angular.isUndefined(DoctorData.DoctorTypeID)) { DoctorData.DoctorTypeID = 0; }
        if (angular.isUndefined(DoctorData.SuID)) { DoctorData.SuID = 0; }
        if (angular.isUndefined(DoctorData.CFID)) { DoctorData.CFID = 0; }
        if (angular.isUndefined(DoctorData.UnitID)) { DoctorData.UnitID = 0; }
        if (angular.isUndefined(DoctorData.EmailId)) { DoctorData.EmailId = ''; }
        if (angular.isUndefined(DoctorData.RegestrationNumber)) { DoctorData.RegestrationNumber = ''; }
        if (angular.isUndefined(DoctorData.Education)) { DoctorData.Education = ''; }
        if (angular.isUndefined(DoctorData.Experience)) { DoctorData.Experience = ''; }
        if (angular.isUndefined(DoctorData.BDMID)) { DoctorData.BDMID = 0; }
        if (angular.isUndefined(DoctorData.GenderId)) { DoctorData.GenderId = 0; }
        if (angular.isUndefined(DoctorData.DocCatID)) { DoctorData.DocCatID = 0; }


        var Response = $http.get(API.url + 'Doctor', {
            params: {
                PageIndex: PageIndex, FirstName: DoctorData.FirstName, Mobno: DoctorData.Mobno,
                SID: DoctorData.SID, DoctorTypeID: DoctorData.DoctorTypeID, SuID: DoctorData.SuID,
                CFID: DoctorData.CFID, UnitID: DoctorData.UnitID, EmailId: DoctorData.EmailId,
                RegestrationNumber: DoctorData.RegestrationNumber, Education: DoctorData.Education,
                Experience: DoctorData.Experience, GenderId: DoctorData.GenderId, BDMID: DoctorData.BDMID,
                DocCatID: DoctorData.DocCatID, PagingEnabled: PagingEnabled
            }
        }).error(function () {
        });
        debugger;
        return Response;
    };

    this.GetDataExport = function (PageIndex, DoctorData, PagingEnabled) {

        if (angular.isUndefined(DoctorData.FirstName)) { DoctorData.FirstName = ''; }
        if (angular.isUndefined(DoctorData.Mobno)) { DoctorData.Mobno = ''; }
        if (angular.isUndefined(DoctorData.SID)) { DoctorData.SID = 0; }
        if (angular.isUndefined(DoctorData.DoctorTypeID)) { DoctorData.DoctorTypeID = 0; }
        if (angular.isUndefined(DoctorData.SuID)) { DoctorData.SuID = 0; }
        if (angular.isUndefined(DoctorData.CFID)) { DoctorData.CFID = 0; }
        if (angular.isUndefined(DoctorData.UnitID)) { DoctorData.UnitID = 0; }
        if (angular.isUndefined(DoctorData.EmailId)) { DoctorData.EmailId = ''; }
        if (angular.isUndefined(DoctorData.RegestrationNumber)) { DoctorData.RegestrationNumber = ''; }
        if (angular.isUndefined(DoctorData.Education)) { DoctorData.Education = ''; }
        if (angular.isUndefined(DoctorData.Experience)) { DoctorData.Experience = ''; }
        if (angular.isUndefined(DoctorData.GenderId)) { DoctorData.GenderId = 0; }
        if (angular.isUndefined(DoctorData.DocCatID)) { DoctorData.DocCatID = 0; }


        var Response = $http.get(API.url + 'Doctor', {
            params: {
                PageIndex: PageIndex, FirstName: DoctorData.FirstName, Mobno: DoctorData.Mobno,
                SID: DoctorData.SID, DoctorTypeID: DoctorData.DoctorTypeID, SuID: DoctorData.SuID,
                CFID: DoctorData.CFID, UnitID: DoctorData.UnitID, EmailId: DoctorData.EmailId,
                RegestrationNumber: DoctorData.RegestrationNumber, Education: DoctorData.Education,
                Experience: DoctorData.Experience, GenderId: DoctorData.GenderId,
                DocCatID: DoctorData.DocCatID, PagingEnabled: PagingEnabled
            }
        }).error(function () {

        });
        debugger;
        return Response;
    };

    this.GetDDGenderList = function (IsListing) {
        //debugger;
        var Response = $http.get(API.url + 'GetDDGenderList', { params: { IsListing: IsListing } }
            ).error(function () {

            });
        return Response;
    };

    this.GetScheduleListByDoctorID = function (DoctorID, ScheduleDate) {
        debugger;
        var Response = $http.get(API.url + 'GetScheduleListByDoctorID', { params: { DoctorID: DoctorID, ScheduleDate: ScheduleDate } }
            ).error(function () {
            });
        return Response;
    };

    this.GetScheduleListLanding = function (PageIndex, ScheduleDate, DOCID, ScheduleUnitID, ScheduleType, DeptID) {

        var Response = $http.get(API.url + 'GetScheduleListLanding', {
            params: {
                PageIndex: PageIndex,
                ScheduleDate: ScheduleDate,
                DOCID: DOCID, DeptID: DeptID,
                ScheduleUnitID: ScheduleUnitID,
                ScheduleType: ScheduleType
            }
        }).error(function () {

        });
        return Response;
    };

    this.GetDepartmentsByID = function (DOCID) {
        var Response = $http.get(API.url + 'GetDepartmentsByID', { params: { DOCID: DOCID } }
            ).error(function () {

            });
        return Response;
    };

    this.GetDDMaritalStatusList = function (IsListing) {

        var Response = $http.get(API.url + 'GetDDMaritalStatusList', { params: { IsListing: IsListing } }
            ).error(function () {

            });
        return Response;
    };

    this.GetDoctorTypeList = function (IsListing) {

        var Response = $http.get(API.url + 'GetDDDoctorTypeList', { params: { IsListing: IsListing } }
            ).error(function () {
            });
        return Response;
    };

    this.GetDoctorCategoryList = function (IsListing) {

        var Response = $http.get(API.url + 'GetDDDoctorCategoryList', { params: { IsListing: IsListing } }
            ).error(function () {

            });
        return Response;
    };

    this.GetSpecializationList = function (IsListing) {

        var Response = $http.get(API.url + 'GetDDSpecializationList', { params: { IsListing: IsListing } }
            ).error(function () {

            });
        return Response;
    };

    this.GetSubSpecBySID = function (SID, IsListing) {

        var response = $http.get(API.url + 'GetSubSpecBySID', { params: { SID: SID, IsListing: IsListing } }
            ).error(function () {
            });
        return response;
    };

    this.CalculateAge = function (DOB) {

        var Response = $http.get(API.url + 'CalculateAge', { params: { DOB: DOB } }
            ).error(function () {
            });
        return Response;
    };

    this.GetCountryCode = function (Filter, Flag) {

        var Response = $http.get(API.url + 'GetCountryCode', { params: { Filter: Filter, Flag: Flag } }
            ).error(function () {
            });
        return Response;
    };

    this.GetDepartmentListForDoc = function (UnitID) {
        debugger;
        var Response = $http.get(API.url + 'GetDepartmentListForDoc', { params: { UnitID: UnitID } }
            ).error(function () {
            });
        return Response;
    };

    this.GetDDClassificationList = function (ConsiderSelect) {

        var Response = $http.get(API.url + 'GetDDClassificationList', { params: { ConsiderSelect: ConsiderSelect } }
            ).error(function () {

            });
        return Response;
    };

    //this.Save = function (ObjData) {
    //    debugger;      
    //    //if (ObjData.DOCID == undefined) {
    //        var Response = $http({
    //        url: API.url + 'Doctor/',
    //        data: ObjData,
    //        method: 'post'
    //        }).error(function () {
    //            //
    //            //window.location = '/Error/CustomError';
    //            });
    //    //}
    //    //else {
    //    //}
    //    return Response;
    //};

  
    this.Save = function (ObjData, OldDataValue) {
        debugger;
        var Data = [];
        if (angular.isUndefined(OldDataValue) || OldDataValue == null) {
            AuditData.push(ObjData);
        }
        else {
            Data.push(ObjData);
        }
        var Data = { Data };
        var DoctorAudit = { AuditData: OldDataValue };
        var Response = $http({
            url: API.url + 'Post',
            data: Data,//To send OLD data APi
            method: 'post'
        }).success(function () {
            var Response = $http({
                url: API.url + 'DoctorAudit',
                data: DoctorAudit,
                method: 'post'
            }).error(function () {

            });
        }).error(function () {
        });
        return Response;
    };

    this.GetSpecificDoctor = function (DOCID) {

        var response = $http.get(API.url + 'GetSpecificDoctor', { params: { DOCID: DOCID } }
            ).error(function () {
            });
        return response;
    };

    this.GetDoctDetailByName = function (doctorName) {
        var response = $http.get(API.url + 'GetDoctDetailByName', { params: { doctorName: doctorName } }
            ).error(function () {
            });
        return response;
    };

    this.GetAllDoctorNames = function (doctorName) {
        var response = $http.get(API.url + 'GetAllDoctorNames', { params: { doctorName: doctorName } }
            ).error(function () {
            });
        return response;
    };

    this.GetDayMaster = function () {
        var response = $http.get(API.url + 'GetDayMaster'
            ).error(function () {
            });
        return response;
    };

    this.GetDDUnitList = function (IsListing) {

        var Response = $http.get(API.url + 'GetDDUnitList', { params: { IsListing: IsListing } }
            ).error(function () {

            });
        return Response;
    };


});