PIVF.service('DayOneSrv', function ($http, API) {
    //==============================================================================================================================================================
    this.FillDayOneMaster = function (PatientID, PatientUnitID, TherapyID, TherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/FillDayOneMaster',
        {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: TherapyID, TherapyUnitID: TherapyUnitID }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.SaveDay1Process = function (DayOneData) {
        var Response = $http({
            url: API.APIurl + 'EmbrologyAPI/SaveDayOneProcess',
            data: DayOneData,
            dataType: 'json',
            method: 'post',
            headers: {  
                "Content-Type": "application/json"
        }  
        }).error(function () {
        });
        return Response;
    };


    this.LoadPartnerMaleSpermiogramData = function (PatientID, PatientUnitID) {

        var Response = $http.get(API.APIurl + 'SemenDetails/LoadPartnerMaleSpermiogramData', { params: { PatientID: PatientID, PatientUnitID: PatientUnitID } }).error(function () {
        });
        return Response;
    }


    this.fillDayWiseOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID, Day) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/fillDayWiseOocyteGrid', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID, Day: Day }
        }).error(function () {
        });
        return Response;
    }

    this.LoadPartnerSpermiogramData = function (PatientID, PatientUnitID) {

        var Response = $http.get(API.APIurl + 'SemenDetails/LoadPartnerSpermiogramData', { params: { PatientID: PatientID, PatientUnitID: PatientUnitID } }).error(function () {
        });
        return Response;
    }
    //this.SaveDay1Process = function (DayOneData) {
    //    
    //    var Response = $http({
    //        url: API.APIurl + 'EmbrologyAPI/SaveDayOneProcess',
    //        method: 'post',
    //        headers: {
    //            'Content-Type': undefined,
    //            'Accept': 'application/json'
    //        },
    //        transformRequest: function (data) {
    //            var formData = new FormData();
    //            formData.append("model", angular.toJson(data.model));
    //            //formData.append("file", angular.toJson(data.files));
    //            return formData;
    //        },
    //        data: { model: DayOneData }
    //    }).error(function () {
    //    });
    //    return Response;
    //};
    //==============================================================================================================================================================
});