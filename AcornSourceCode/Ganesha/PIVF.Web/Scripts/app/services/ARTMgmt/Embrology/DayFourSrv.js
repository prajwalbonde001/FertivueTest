PIVF.service('DayFourSrv', function ($http, API) {
    //==============================================================================================================================================================
    this.fillDayFourOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID, Day) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/fillDayFourOocyteGrid', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID, Day: Day }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.FillDayFourMaster = function (PatientID, PatientUnitID, TherapyID, TherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/FillDayFourMaster',
            {
                params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: TherapyID, TherapyUnitID: TherapyUnitID }
            }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.SaveDay4Process = function (DayFourData) {
        var Response = $http({
            url: API.APIurl + 'EmbrologyAPI/SaveDayFourProcess',
            data: DayFourData,
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