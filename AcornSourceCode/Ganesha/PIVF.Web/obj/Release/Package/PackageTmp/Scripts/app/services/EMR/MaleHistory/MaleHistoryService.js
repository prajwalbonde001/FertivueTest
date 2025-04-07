PIVF.service('MaleHistoryService', function ($http, API) {

    this.SetAllControls = function (ID, UnitID, Prev) {
        
        var Response = $http.get(API.APIurl + 'MaleHistory/SetAllControls', { params: { VID: ID, uID: UnitID, Prev: Prev } }).error(function () {
        });
        return Response;
    }

    this.InsertMaleHistory = function (MaleHistory) {
        
        var Response = $http({
            url: API.APIurl + 'MaleHistory/InsertMaleHistory',
            data: MaleHistory,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };
    this.getHistoryList = function () {

        var Response = $http.get(API.APIurl + 'MaleHistory/GetHistoryList').error(function () {
        });
        return Response;
    }
});