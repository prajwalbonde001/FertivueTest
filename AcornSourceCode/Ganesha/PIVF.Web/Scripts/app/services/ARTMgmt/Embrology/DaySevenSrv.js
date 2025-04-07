PIVF.service('DaySevenSrv', function ($http, API) {
    //==============================================================================================================================================================
    this.fillDaySixOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID, Day) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/fillDaySevenOocyteGrid', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID, Day: Day }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.FillDaySixMaster = function (PatientID, PatientUnitID, TherapyID, TherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/FillDaySevenMaster',
            {
                params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: TherapyID, TherapyUnitID: TherapyUnitID }
            }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.SaveDay6Process = function (DaySixData) {
        var Response = $http({
            url: API.APIurl + 'EmbrologyAPI/SaveDaySevenProcess',
            data: DaySixData,
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