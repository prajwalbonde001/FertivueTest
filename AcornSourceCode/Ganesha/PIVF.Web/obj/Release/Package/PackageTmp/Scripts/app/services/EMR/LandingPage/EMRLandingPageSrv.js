PIVF.service('EMRLandingPageSrv', function ($http, API , $rootScope) {

    this.GetEMRLandingPageData = function (PID, UID) {
        var Response = $http.get(API.APIurl + 'EMRLandingPageAPI/GetEMRLandingPageData', { params: { PID: PID, UID: UID } }).error(function () {
        });
        return Response;
    };



    this.GetPatientVisitSummaryModel = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetPatientVisitSummaryModel', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };


      this.GetCaseSummaryHistory = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetCaseSummaryHistory', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };

     this.GetInvestigationHistory = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetInvestigationHistory', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };

      this.GetPatientPrescriptionHistory = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetPatientPrescriptionHistory', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };


      this.GetHistorySummary = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetHistorySummary', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };

})