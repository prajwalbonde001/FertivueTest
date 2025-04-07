PIVF.service('StaffService', function ($http, API) {

    this.StaffList = function (Index, N, DptID, mobno, EID, DegID, Qua, Exp, EmailID, MID, GId, PgEn) {
        if (angular.isUndefined(N)) { N = ''; }
        if (angular.isUndefined(mobno)) { mobno = ''; }
        if (angular.isUndefined(EID) || EID == "") { EID = 0; }
        if (angular.isUndefined(DptID)) { DptID = 0; }
        if (angular.isUndefined(DegID)) { DegID = 0; }
        if (angular.isUndefined(Qua)) { Qua = ''; }
        if (angular.isUndefined(Exp)) { Exp = ''; }
        if (angular.isUndefined(EmailID)) { EmailID = ''; }
        if (angular.isUndefined(MID)) { MID = 0; }
        if (angular.isUndefined(GId)) { GId = 0; }
        var Response = $http.get(API.url + 'Staff', { params: { Index: Index, N: N, DptID: DptID, mobno: mobno, EID: EID, DegID: DegID, Qua: Qua, Exp: Exp, EmailID: EmailID, MID: MID, GId: GId, PgEn: PgEn } }).error(function () {
            //
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetDesignationList = function (flag) {
        // debugger;
        var Response = $http.get(API.url + 'GetDesignationList', { params: { flag: flag } }).error(function () {
            debugger;
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetDepartmentListForStaff = function (UID, flag) {
        // debugger;
        var Response = $http.get(API.url + 'GetDepartmentListForStaff', { params: { UID: UID, flag: flag } }).error(function () {
            debugger;
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.Save = function (ObjData, OldDataValue) {
        debugger;
        var Data = [];
        if (angular.isUndefined(OldDataValue) || OldDataValue == null) {
            Data.push(ObjData);
        }
        else {
            Data.push(ObjData);
            Data.push(OldDataValue);
        }
        var Data = { Data };
        var Response = $http({
            //  url: API.url + 'Staff',
            url: API.url + 'StaffPost',
            data: Data,//To send OLD data To Api
            method: 'post'
        }).error(function () {
            //
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetStaffByID = function (StaffID) {

        var response = $http.get(API.url + 'GetStaffByID', { params: { StaffID: StaffID } }).error(function () {
        }).error(function () {
        });
        return response;
    };

    this.ActivateDeactivateStaff = function (id, st, re) {
        //  debugger;
        var Response = $http.get(API.url + 'ActivateDeactivateStaff', { params: { id: id, st: st, re: re } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    ////State List
    //this.GetStateList = function (Filter, CountryID) {
    //    debugger;
    //    if (angular.isUndefined(Filter)) { Filter = ''; }
    //    if (angular.isUndefined(CountryID) || CountryID == null) { CountryID = 0; }
    //    var Response = $http.get(API.url + 'GetStateList', { params: { Filter: Filter, CountryID: CountryID, '$select': 'StateID,StateName' } }).error(function () {
    //    }).error(function () {
    //        //window.location = '/Error/CustomError';
    //    });
    //    return Response;
    //};

    this.GetStateList = function (Filter, CountryID) {
        debugger;

        var Response = $http.get(API.url + 'GetStateList', { params: { Filter: Filter, CountryID: CountryID } }
            ).error(function () {
            });
        return Response;
    };

    //City List
    this.GetCityList = function (Filter, StateID) {
        if (angular.isUndefined(Filter)) { Filter = ''; }
        if (angular.isUndefined(StateID) || StateID == null) { StateID = 0; }
        var Response = $http.get(API.url + 'GetCityList', { params: { Filter: Filter, StateID: StateID, '$select': 'CityID,CityName' } }).error(function () {
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };
});