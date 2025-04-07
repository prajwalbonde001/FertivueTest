PIVF.service('srvSemenThawing', function ($http, API) {
    this.SaveUpdate = function (SemenThaw) {
        
        var Response = $http({
            url: API.APIurl + 'SemenThawing/SaveUpdate',
            data: SemenThaw,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetFreezDetails = function (Action) {
        // 
        var Response = $http.get(API.APIurl + 'SemenThawing/GetFreezDetails', { params: { Action: Action } }).error(function () {
        });
        return Response;
    };
    this.GetFreezDetailsAfterFinalize = function (Action,ID,UnitID) {
        // 
        var Response = $http.get(API.APIurl + 'SemenThawing/GetFreezDetailsAfterFinalize', { params: { Action: Action ,ID:ID,UnitID:UnitID} }).error(function () {
        });
        return Response;
    };
    //Get Semen freez detail max id
    this.GetSemenThawingForTC = function (SNO) {
        // 
        var Response = $http.get(API.APIurl + 'SemenThawing/GetSemenThawingForTC', { params: { SNO: SNO } }).error(function () {
        });
        return Response;
    };    //Get Semen freez detail max id

});