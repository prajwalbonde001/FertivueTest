
PIVF.service('OocyteThowSrv', function ($http, API) {

    this.GetVitrificationSummaryList = function () {
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/GetVitrificationSummaryList').error(function () {
            });
        return Response;
    };
    this.SaveOocyteThawing = function (lstOocyteThawing) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'CryoPreservationAPI/SaveOocyteThawing',
            data: lstOocyteThawing,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };
    this.SaveTransportDetails = function (lstOocyteTransport) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'CryoPreservationAPI/SaveTransportDetails',
            data: lstOocyteTransport,
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