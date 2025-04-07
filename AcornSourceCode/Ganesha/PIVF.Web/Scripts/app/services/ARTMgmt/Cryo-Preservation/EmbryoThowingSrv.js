PIVF.service('EmbryoThowingSrv', function ($http, API) {
    //=========================================================================================================================================================
    this.GetFreezeEmbryo = function (PatientID, PatientUnitID, TherapyID, TherapyUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'EmbryoThowingAPI/GetFreezeEmbryo', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: TherapyID, TherapyUnitID: TherapyUnitID }
        }).error(function () {
        });
        return Response;
    }
    //=========================================================================================================================================================
    this.FillMaster = function () {
        var Response = $http.get(API.APIurl + 'EmbryoThowingAPI/FillMaster').error(function () {
        });
        return Response;
    }
    //=========================================================================================================================================================
    this.SaveThawing = function (ThawingData) {
        var Response = $http({
            url: API.APIurl + 'EmbryoThowingAPI/SaveThawing',
            data: ThawingData,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };
    //=========================================================================================================================================================
    this.GetThawingData = function (PatientID, PatientUnitID, TherapyID, TherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbryoThowingAPI/GetThawingData', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: TherapyID, TherapyUnitID: TherapyUnitID }
        }).error(function () {
        });
        return Response;
    }
    //=========================================================================================================================================================
});