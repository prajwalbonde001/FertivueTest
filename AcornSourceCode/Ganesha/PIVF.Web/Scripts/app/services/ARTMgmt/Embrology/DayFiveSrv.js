PIVF.service('DayFiveSrv', function ($http, API) {
    //==============================================================================================================================================================
    this.fillDayFiveOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID, DonorID, DonorCycleCode, DonorUnitID, Day) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/fillDayFiveOocyteGrid', {
            params: {
                PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID,
                DonorID: DonorID, DonorCycleCode:DonorCycleCode,DonorUnitID:DonorUnitID,Day:Day }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.FillDayFiveMaster = function (PatientID, PatientUnitID, TherapyID, TherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/FillDayFiveMaster',
            {
                params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: TherapyID, TherapyUnitID: TherapyUnitID }
            }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.SaveDay5Process = function (DayFiveData) {
        var Response = $http({
            url: API.APIurl + 'EmbrologyAPI/SaveDayFiveProcess',
            data: DayFiveData,
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