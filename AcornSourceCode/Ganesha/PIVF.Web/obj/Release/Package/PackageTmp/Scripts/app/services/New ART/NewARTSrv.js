PIVF.service('srvNewART', function ($http, API) {
    this.SaveUpdate = function (NewART) {
        
        var Response = $http({
            url: API.APIurl + 'NewART/SaveUpdate',
            data: NewART,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.SavePAC = function (PACDetails) {
        var Response = $http({
            url: API.APIurl + 'NewART/SavePAC',
            data: PACDetails,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.GetPAC = function (PACDetails) { 
        var Response = $http.get(API.APIurl + 'NewART/GetPAC', { params: { PatientID: PACDetails.PatientID, FemalePatientUnitID: PACDetails.FemalePatientUnitID, TherapyID: PACDetails.TherapyID, TherapyUnitID: PACDetails.TherapyUnitID } }).error(function () {
        });
        return Response;
    };

    this.newCyclebtnFlag = function () {
        // 
        var Response = $http.get(API.APIurl + 'NewART/newCyclebtnFlag').error(function () {
        });
        return Response;
    };
    this.GetARTCycleList = function () {
        // 
        var Response = $http.get(API.APIurl + 'NewART/GetARTCycleList').error(function () {
        });
        return Response;
    };

    this.GetLatestLMPDate = function () {
        // 
        var Response = $http.get(API.APIurl + 'NewART/GetLatestLMPDate').error(function () {
        });
        return Response;
    };

    this.GetMedicalHistory = function () {
        // 
        var Response = $http.get(API.APIurl + 'NewART/GetMedicalHistory').error(function () {
        });
        return Response;
    };

    this.GetCycleOverview = function (id,unitid) {
        // 
        var Response = $http.get(API.APIurl + 'NewART/GetCycleOverview',{params:{id:id,unitid:unitid}}).error(function () {
        });
        return Response;
    };

    this.GetDetails = function () {
        // 
        var Response = $http.get(API.APIurl + 'NewART/GetDetails').error(function () {
        });
        return Response;
    };

    this.ViewReport = function (id, unitid) {
        var Response = $http.get(API.APIurl + 'InvestigationAPI/ViewReport', { params: { InvID: id, UnitID: unitid } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.CloseCycle = function (id, unitid) {
        var Response = $http.get(API.APIurl + 'NewART/CloseCycle', { params: { ID: id, UnitID: unitid } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
    this.UpdatePAC = function (ID, UnitID, IsPAC) {
        
        var Response = $http.get(API.APIurl + 'NewART/UpdatePAC', { params: { ID: ID, UnitID: UnitID, IsPAC: IsPAC } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
   
});