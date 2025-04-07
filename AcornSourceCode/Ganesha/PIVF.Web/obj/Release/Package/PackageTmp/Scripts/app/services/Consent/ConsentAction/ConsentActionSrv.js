PIVF.service('ConsentActionSrv', function ($http, API) {
     
    this.GetConsenGrid = function () {
        
        var Response = $http.get(API.APIurl + 'ConsentActionAPI/GetConsenGrid').error(function () {
        });
        return Response;
    }
    this.GetConsentList = function (ARTTypeID, ARTSubTypeID) {
        
        var Response = $http.get(API.APIurl + 'ConsentActionAPI/GetConsentList', {
            params: {
                ARTTypeID: ARTTypeID,
                ARTSubTypeID: ARTSubTypeID
            }
        }).error(function () {
        });
        return Response;
    }
    this.GetConsentDetails = function (UnitID,ID, ConsentID) {
        
        var Response = $http.get(API.APIurl + 'ConsentActionAPI/GetConsentDetails', {
            params: {
                UnitID:UnitID,
                ID: ID,
                ConsentID: ConsentID
            }
        }).error(function () {
        });
        return Response;
    }
    this.SaveConsent = function (ConsentDetails) {
        
        var Response = $http({
            url: API.APIurl + 'ConsentActionAPI/SaveConsent',
            data: ConsentDetails,
            method: 'post'
        }).error(function () {
        });
        return Response;
    }; 
    this.SaveUpdateFile = function (ConsentDetails) {
        
        var Response = $http({
            url: API.APIurl + 'ConsentActionAPI/SaveUpdateFile',
            data: ConsentDetails,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };   
    this.ViewReport = function (ID, UnitID) {
        
        var Response = $http.get(API.APIurl + 'ConsentActionAPI/ViewReport', {
            params: {                
                ID: ID,
                UnitID: UnitID
            }
        }).error(function () {
        });
        return Response;
    }
});