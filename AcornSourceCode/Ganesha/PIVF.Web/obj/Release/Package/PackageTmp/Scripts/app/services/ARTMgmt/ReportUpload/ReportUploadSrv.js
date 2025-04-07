PIVF.service('ReportUploadSrv', function ($http, API) {

    this.SaveUpdate = function (obj) {
        var Response = $http.post(API.APIurl + 'ReportUploadAPI/UploadReport', obj).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.MarkImportant = function (obj) {
        var Response = $http.post(API.APIurl + 'ReportUploadAPI/MarkImportant', obj).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.DeleteReport = function (obj) {
        var Response = $http.post(API.APIurl + 'ReportUploadAPI/DeleteReport', obj).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetReportList = function (idx, FD, TD, Cat, NM) {
        var Response = $http.get(API.APIurl + 'ReportUploadAPI/GetReportList', { params: { Cat: Cat, NM: NM,idx: idx, FD: FD, TD: TD  } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.ViewReport = function (obj) {
    debugger;
        var Response = $http.post(API.APIurl + 'ReportUploadAPI/ViewReport', obj).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.fillCatwiseServiceList = function (CatID) {
        var Response = $http.get(API.APIurl + 'ReportUploadAPI/fillCatwiseServiceList', { params: { CatID: CatID } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
    this.fillPathoServiceList = function (CatID,GenderID) {
        var Response = $http.get(API.APIurl + 'ReportUploadAPI/fillPathoServiceList', { params: { CatID: CatID , GenderID:GenderID} }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

})