PIVF.service('FollicularScanService', function ($http, API) {

    this.LoadPreviousFollicularScanData = function () {
        
        var Response = $http.get(API.APIurl + 'FollicularScan/LoadPreviousFollicularScanData').error(function () {
        });
        return Response;
    }


    this.GetAllDICOMStudies = function (RequestForm) {
        
        var Response = $http.get(API.APIurl + 'FollicularScan/GetAllDICOMStudies',{ params: {  RequestForm: RequestForm } }).error(function () {
        });
        return Response;
    }

    this.SaveOrUpdateFollicularScan = function (FollicularScan) {
        
        
        var Response = $http({
            url: API.APIurl + 'FollicularScan/SaveOrUpdateFollicularScan',
            data: FollicularScan,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    }

    this.GetSingleFollicularScan = function (ID) {
        
        var Response = $http.get(API.APIurl + 'FollicularScan/GetSingleFollicularScan', { params: { ID: ID } }).error(function () {
        });
        return Response;
    }

    this.LoadCycleCodeList = function () {
        
        var Response = $http.get(API.APIurl + 'FollicularScan/LoadCycleCodeList').error(function () {
        });
        return Response;
    }
});