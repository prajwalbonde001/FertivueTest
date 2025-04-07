PIVF.service('MediaConsumptionSrv', function ($http, API) {
  
    this.GetItemsByClinic = function (UnitID) {
        debugger
        var Response = $http.get(API.APIurl + 'MediaConsumptionAPI/GetItemsByClinic', { params: { UnitID: UnitID } }).error(function () {
        });
        return Response;
    }
    this.GetMediaList = function (Search) {
        debugger
        var Response = $http.get(API.APIurl + 'MediaConsumptionAPI/GetMediaList', { params: { Search: Search } }).error(function () {
        });
        return Response;
    }
    
    this.SaveMedia = function (ListMedia) {
        
        var Response = $http({
            url: API.APIurl + 'MediaConsumptionAPI/SaveMedia',
            data: ListMedia,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };
    this.SaveFinalizedMedia = function (ListMedia) {
        
        var Response = $http({
            url: API.APIurl + 'MediaConsumptionAPI/SaveFinalizedMedia',
            data: ListMedia,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };
});