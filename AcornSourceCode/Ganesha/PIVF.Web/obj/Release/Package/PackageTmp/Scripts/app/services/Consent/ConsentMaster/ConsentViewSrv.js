PIVF.service('ConsentViewSrv', function ($http, API) {
    
    this.SaveConsent = function (ConsentDetails) {
        
        var Response = $http({
            url: API.APIurl + 'ConsentMasterAPI/SaveConsent',
            data: ConsentDetails,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    //Get Data At View 
    this.GetConsentByID = function (ID) {
        
        var Response = $http.get(API.APIurl + 'ConsentMasterAPI/GetConsentByID', {
            params: {
                ID: angular.toJson(ID)               
            }
        }).error(function () {
        });
        return Response;
    }
});