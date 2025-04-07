PIVF.service('CorpusLeteumScanService', function ($http, API) {

    this.SaveOrUpdateCLScan = function (CorpusLeteumScan) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'CorpusLeteumScan/SaveOrUpdateCLScan',
            data: CorpusLeteumScan,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response; 
    }

    this.LoadPreviousCorpusLeteumScanData = function () {
        debugger;
        var Response = $http.get(API.APIurl + 'CorpusLeteumScan/LoadPreviousCorpusLeteumScanData').error(function () {
        });
        return Response;
    }

    this.GetSingleCLScan = function (ID) {
        debugger;
        var Response = $http.get(API.APIurl + 'CorpusLeteumScan/GetSingleCLScan', { params: { ID: ID } }).error(function () {
        });
        return Response;
    }

    this.LoadCycleCodeList = function () {
        debugger;
        var Response = $http.get(API.APIurl + 'CorpusLeteumScan/LoadCycleCodeList').error(function () {
        });
        return Response;
    }

});

