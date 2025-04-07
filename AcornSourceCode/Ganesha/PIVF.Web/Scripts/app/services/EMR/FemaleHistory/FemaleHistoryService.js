PIVF.service('FemaleHistoryService', function ($http, API) {

    this.SetAllControls = function (ID, UnitID,Prev) {
        
        var Response = $http.get(API.APIurl + 'FemaleHistory/LoadSpecificFemaleHistory', { params: { VID: ID, uID: UnitID,Prev:Prev } }).error(function () {
        });
        debugger;
        return Response;
        debugger;
    }

    this.InsertFemaleHistory = function (FemaleHistory) {
        
        var Response = $http({
            url: API.APIurl + '/FemaleHistory/InsertFemaleHistory',
            data: FemaleHistory,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.getHistoryList = function () {

        var Response = $http.get(API.APIurl + 'FemaleHistory/GetHistoryList').error(function () {
        });
        return Response;
    }
});