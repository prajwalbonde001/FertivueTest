PIVF.service('VitalsSrv', function ($http, API) {
    //=========================================================================================================================
    this.SaveVitals = function (Vitals) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'VitalsAPI/SaveVitals',
            data: Vitals,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    //=========================================================================================================================
    this.GetVitalsList = function (PatientInfo, PageIndex) {
        var Response = $http.get(API.APIurl + 'VitalsAPI/GetVitals', {
            params: { PatientID: PatientInfo.ID, UnitID: PatientInfo.UnitID, PageIndex: PageIndex }
        }).error(function () {
        });
        return Response;
    }
    //=========================================================================================================================
    this.SaveReason = function (PatientInfo) {
        var Response = $http.get(API.APIurl + 'VitalsAPI/DeleteVitalsWithReason', {
            params: { ID: PatientInfo.ID, UnitID: PatientInfo.UnitID, Reason: PatientInfo.Reason }
        }).error(function () {
        });
        return Response;
    }
    //=========================================================================================================================
});