PIVF.service('ConsentIndexSrv', function ($http, API) {
    //Get Data At View 
    this.GetConsentList = function (ARTTypeID, ARTSubTypeID, CurrentPage, Code) {
        
        var Response = $http.get(API.APIurl + 'ConsentMasterAPI/GetConsentList', {
            params: {               
                ARTTypeID: ARTTypeID,
                ARTSubTypeID: ARTSubTypeID,
                CurrentPage: CurrentPage,
                Code: Code
            }
        }).error(function () {
        });
        return Response;
    }

    this.ActivateDeactivateConsent = function (ID, reason) {

        var Response = $http.get(API.APIurl + 'ConsentMasterAPI/ActivateDeactivateConsent', {
            params: {
                ID: ID,
                reason: reason
            }
        }).error(function () {
        });
        return Response;
    }

});