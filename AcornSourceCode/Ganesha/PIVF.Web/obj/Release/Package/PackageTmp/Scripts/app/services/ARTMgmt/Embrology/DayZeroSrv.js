PIVF.service('DayZeroSrv', function ($http, API) {

    this.FillDayZeroOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/FillDayZeroOocyteGrid', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, TherapyID: PlanTherapyID, TherapyUnitID: PlanTherapyUnitID }
        }).error(function () {
        });
        return Response;
    }
    this.GetOocytesForDay0 = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID,Cyclecode) {
        
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/GetOocytesForDay0', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID, Cyclecode:Cyclecode }
        }).error(function () {
        });
        return Response;
    }   
    
    this.GetSemenDetails = function (SemenID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/GetSemenDetails', {
            params: { SemenID: SemenID}
        }).error(function () {
        });
        return Response;
    }
    this.GetDay0DetailsByID = function (ID, UnitID, PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/GetDay0DetailsByID', {
            params: { ID: ID, UnitID: UnitID, PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID }
            }).error(function () { 
        });
        return Response;
     }
    
    this.SaveDay0Process = function (DayOneData) {
        
        var Response = $http({
            url: API.APIurl + 'EmbrologyAPI/SaveDayZeroProcess',
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
    this.SaveDayZeroFinalizeProcess = function (DayZeroData) {
        console.log(DayZeroData);
        var Response = $http({
                url: API.APIurl + 'EmbrologyAPI/SaveDayZeroFinalizeProcess',
                data: DayZeroData,
                dataType: 'json',
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                }
        }).error(function () {
        });
        return Response;
    };

    //added by Vikrant To check Couple cycle Exist Or Not ?
    this.CheckLinkCouplecycleAvialbleOrNot = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/CheckLinkCouplecycleAvialbleOrNot', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID }
        }).error(function () {
        });
        return Response;
    }
    
})