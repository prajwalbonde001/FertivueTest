PIVF.service('EmbryoVitrificationSrv', function ($http, API) {
    //=========================================================================================================================================================
    this.GetFreezeEmbryo = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbryoVitrificationAPI/GetFreezeEmbryo', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID }
        }).error(function () {
        });
        return Response;
    }
    //=========================================================================================================================================================
    this.FillMaster = function () {
        var Response = $http.get(API.APIurl + 'EmbryoVitrificationAPI/FillMaster').error(function () {
        });
        return Response;
    }
    //=========================================================================================================================================================
    this.Save = function (EmbryoData) {
        var Response = $http({
            url: API.APIurl + 'EmbryoVitrificationAPI/Save',
            data: EmbryoData,
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
    this.GetFlagISAllEmbryoFreeze = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID,IsFromEmbryology) {
        var Response = $http.get(API.APIurl + 'EmbryoVitrificationAPI/GetFlagISAllEmbryoFreeze', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: PlanTherapyID, TherapyUnitID: PlanTherapyUnitID, IsFromEmbryology: IsFromEmbryology }
        }).error(function () {
        });
        return Response;
    }
    //=========================================================================================================================================================

    this.CheckDuplicateFreezingNo = function (Item) {
        // 
        var Response = $http.get(API.APIurl + 'EmbryoVitrificationAPI/CheckDuplicateFreezingNo', { params: { Item: Item } }).error(function () {
        });
        return Response;
    };
});