PIVF.service('SemenAnalysisService', function ($http, API) {

    this.SaveUpdate = function (SemenAnalysis) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'SemenAnalysis/SaveUpdate',
            data: SemenAnalysis,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetMaxID = function () {
        // 
        var Response = $http.get(API.APIurl + 'SemenAnalysis/GetMaxID').error(function () {
        });
        return Response;
    };    //Get Semen freez detail max id

    this.GetSemenAnalysisList = function (SNo, Action) {
        // 
        var Response = $http.get(API.APIurl + 'SemenAnalysis/GetSemenAnalysisList', { params: { SNo: SNo, Action: Action } }).error(function () {
        });
        return Response;
    };   

    this.GetSALinkByPatientID = function (MethodOfSurgicalSpermRetrivalID) {
        
        var Response = $http.get(API.APIurl + 'SemenAnalysis/GetSALinkByPatientID', { params: { MethodOfSurgicalSpermRetrivalID: MethodOfSurgicalSpermRetrivalID } }).error(function () {
        });
        return Response;
    };
    this.UpdateLinkFinalize = function (SemenAnalysis) {
        

        var Response = $http({
            url: API.APIurl + 'SemenAnalysis/UpdateLinkFinalize',
            data: SemenAnalysis,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
       
        return Response;
    };


    this.GetSurgicalSpermRetrivalByPatientID = function (SNo) {
        
        var Response = $http.get(API.APIurl + 'SemenAnalysis/GetSurgicalSpermRetrivalByPatientID', { params: { SNo: SNo } }).error(function () {
        });
        return Response;
    };

});