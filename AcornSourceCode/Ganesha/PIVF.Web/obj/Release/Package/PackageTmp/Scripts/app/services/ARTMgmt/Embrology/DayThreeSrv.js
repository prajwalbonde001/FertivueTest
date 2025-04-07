PIVF.service('DayThreeSrv', function ($http, API) {
    //==============================================================================================================================================================
    this.fillDayThreeOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID, DonorID, DonorCycleCode, DonorUnitID,Day) {
        debugger;
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/fillDayThreeOocyteGrid', {
            params: {
                PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID, DonorID: DonorID,
            DonorCycleCode:DonorCycleCode,DonorUnitID:DonorUnitID,Day:Day}
        }).error(function () {
        });
        debugger;
        return Response;
    }
   
    //==============================================================================================================================================================
    this.FillDayThreeMaster = function (PatientID, PatientUnitID, TherapyID, TherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/FillDayThreeMaster',
            {
                params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: TherapyID, TherapyUnitID: TherapyUnitID }
            }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.SaveDay3Process = function (DayTwoData) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'EmbrologyAPI/SaveDayThreeProcess',
            data: DayTwoData,
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