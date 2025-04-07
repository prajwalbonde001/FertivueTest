PIVF.service('InvestigationSrv', function ($http, API) {

    this.SaveInvestigation = function (lstobj) {
        debugger;
        var Response = $http.post(API.APIurl + 'InvestigationAPI/SaveInvestigation', lstobj).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

 this.GetCatwiseServiceList = function (catID , GenderID ) {
        var Response = $http.get(API.APIurl + 'InvestigationAPI/GetCatwiseServiceList', { params: { catID: catID  , GenderID : GenderID} }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetPreviousInvestigation = function (idx, CatID, SearchParam) {
        var Response = $http.get(API.APIurl + 'InvestigationAPI/GetPreviousInvestigation', { params: { idx: idx, CatID: CatID, para: SearchParam } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetTodaysInvestigation = function (catID) {
        var Response = $http.get(API.APIurl + 'InvestigationAPI/GetTodaysInvestigation', { params: { CatID: catID } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.DeleteSavedService = function (ID, unitID, deleteReason) {
        var Response = $http.get(API.APIurl + 'InvestigationAPI/DeleteSavedService', { params: { ID: ID, UnitID: unitID, reason: deleteReason } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.SetFavouriteInvestigation = function (item) {
        var Response = $http.post(API.APIurl + 'InvestigationAPI/SetFavouriteInvestigation', item).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.UploadReport = function (obj) {
        var Response = $http.post(API.APIurl + 'InvestigationAPI/UploadReport', obj).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.ViewReport = function (id,unitid) {
        var Response = $http.get(API.APIurl + 'InvestigationAPI/ViewReport', {params:{InvID:id,UnitID:unitid}}).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.LinkDonor = function (obj) {
        var Response = $http.post(API.APIurl + 'InvestigationAPI/LinkDonor', obj).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.SaveFavourite = function (lstobj) {
        var Response = $http.post(API.APIurl + 'InvestigationAPI/SaveFavourite', lstobj).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetFavouriteList = function (idx,param) {
        var Response = $http.get(API.APIurl + 'InvestigationAPI/GetFavouriteList',{params:{idx:idx,param:param}}).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetArtsubTypeList = function (id) {
        var Response = $http.get(API.APIurl + 'InvestigationAPI/GetArtsubTypeList', { params: { id: id } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

});