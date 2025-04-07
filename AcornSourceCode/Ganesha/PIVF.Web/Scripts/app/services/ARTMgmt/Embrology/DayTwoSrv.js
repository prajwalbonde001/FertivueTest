PIVF.service('DayTwoSrv', function ($http, API) {
    //==============================================================================================================================================================
    this.fillDayTwoOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID, Day) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/fillDayTwoOocyteGrid', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID, Day: Day }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.FillDayTwoMaster = function (PatientID, PatientUnitID, TherapyID, TherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/FillDayTwoMaster',
            {
                params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: TherapyID, TherapyUnitID: TherapyUnitID }
            }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.SaveDay2Process = function (DayTwoData) {
        var Response = $http({
            url: API.APIurl + 'EmbrologyAPI/SaveDayTwoProcess',
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