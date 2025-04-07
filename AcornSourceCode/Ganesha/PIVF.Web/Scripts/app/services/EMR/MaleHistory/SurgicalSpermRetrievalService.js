PIVF.service('SurgicalSpermRetrievalService', function ($http, API) {
    this.getSurgeonList = function () {
        
        var Response = $http({
            url: API.APIurl + 'SurgicalSpermRetrieval/GetSurgeonList',
            method: 'get'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.getAnesthetist = function () {
        
        var Response = $http({
            url: API.APIurl + 'SurgicalSpermRetrieval/GetAnesthetist',
            method: 'get'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.InsertSurgicalSpermRetrival = function InsertSurgicalSpermRetrival(SurgicalSpermRetrieval) {
        
        var Response = $http({
            url: API.APIurl + 'SurgicalSpermRetrieval/InsertSurgicalSpermRetrival',
            data: SurgicalSpermRetrieval,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    }


    this.GetSurgicalSpermRetrivalByPatientID = function () {
        
        var Response = $http.get(API.APIurl + 'SurgicalSpermRetrieval/GetSurgicalSpermRetrivalByPatientID').error(function () {
        });
        return Response;
    };

    this.GetSSRImagesBySNo = function (SNo) {
        
        var Response = $http.get(API.APIurl + 'SurgicalSpermRetrieval/GetSSRImagesBySNo', { params: { SNo: SNo } }).error(function () {
        });
        return Response;
    };
});