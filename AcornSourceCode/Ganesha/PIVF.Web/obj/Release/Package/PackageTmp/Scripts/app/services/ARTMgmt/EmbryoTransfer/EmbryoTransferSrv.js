PIVF.service('EmbryoTransferSrv', function ($http, API) {
    //==============================================================================================================================================================
    this.FillETMaster = function () {
        var Response = $http.get(API.APIurl + 'EmbryoTransferAPI/FillETMaster').error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.FillETGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'EmbryoTransferAPI/FillETGrid', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID}
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.SaveET = function (ETData) {
        var Response = $http({
            url: API.APIurl + 'EmbryoTransferAPI/SaveET',
            data: ETData,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };
    //==============================================================================================================================================================
});