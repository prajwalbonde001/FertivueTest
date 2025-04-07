PIVF.service('EmbrologyMainSrv', function ($http, API) {
    //==============================================================================================================================================================
    //Get OPUDetails Header Information 
    this.GetOPUData = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/GetOPUData', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    //Save Oocytes retrived Details
    this.SaveUpdateOcyte = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID, FolliclesAspirated, OocytesRetrieved, OocytesFinalizeStatus,Donor) {
        debugger;
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/SaveUpdateOcyte', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID, FolliclesAspirated: 0, OocytesRetrieved: OocytesRetrieved, OocytesFinalizeStatus: OocytesFinalizeStatus,Donor:Donor }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.fillDayOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/fillDayOocyteGrid', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================
    this.fillDayWiseOocyteGrid = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID,Day) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/fillDayWiseOocyteGrid', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID, Day: Day }
        }).error(function () {
        });
        return Response;
    }
    //==============================================================================================================================================================

    

    // this.GetPGTUserAuthInfo = function (UserID) {
    //    var Response = $http.get(API.APIurl + 'ProgenesisApi/GetPGTUserAuthInfo', {
    //        params: { UserID: UserID}
    //    }).error(function () {
    //    });
    //    return Response;
    //}


     this.GetPGTUserAuthInfo = function (requestData) {

        var Response = $http({
            url: API.APIurl + 'ProgenesisApi/GetPGTUserAuthInfo',
            data: requestData,
            //dataType: 'json',
            method: 'post'
            //,headers: {
            //    "Content-Type": "application/json"
            //}
        }).error(function () {
        });
        return Response;
    };
     this.GetPGTUserAuthInfoAccessToken = function (UserId) {
         var Response = $http.get(API.APIurl + 'ProgenesisApi/GetPGTUserAuthInfoAccessToken', {
             params: { UserId: UserId}
         }).error(function () {
         });
         return Response;
     }
     this.GetPGTEmbryolgist = function (accessToken) {
         var Response = $http.get(API.APIurl + 'ProgenesisApi/GetPGTEmbryolgist', {
             params: { accessToken: accessToken }
         }).error(function () {
         });
         return Response;
     }

        this.GetPGTClinicusers = function (accessToken) {
         var Response = $http.get(API.APIurl + 'ProgenesisApi/GetPGTClinicusers', {
             params: { accessToken: accessToken }
         }).error(function () {
         });
         return Response;
     }

      this.GetPGTPhysicians = function (accessToken) {
         var Response = $http.get(API.APIurl + 'ProgenesisApi/GetPGTPhysicians', {
             params: { accessToken: accessToken }
         }).error(function () {
         });
         return Response;
     }
    // this.GetPGTUserAuthInfoAccessToken = function (UserId) {

    //    var Response = $http({
    //        url: API.APIurl + 'ProgenesisApi/GetPGTUserAuthInfoAccessToken',
    //        data: UserId,
    //        //dataType: 'json',
    //        method: 'post'
    //        //,headers: {
    //        //    "Content-Type": "application/json"
    //        //}
    //    }).error(function () {
    //    });
    //    return Response;
    //};
    //==============================================================================================================================================================

     this.GetDayWiseInfoForBiopsy = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        var Response = $http.get(API.APIurl + 'EmbrologyAPI/GetDayWiseInfoForBiopsy', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID }
        }).error(function () {
        });
        return Response;
     }

     this.GetRequisiteforResult = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
         var Response = $http.get(API.APIurl + 'EmbrologyAPI/GetPGTRequisiteBiopsyDetails', {
             params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PlanTherapyID: PlanTherapyID, PlanTherapyUnitID: PlanTherapyUnitID }
         }).error(function () {
         });
         return Response;
     }
       this.ScheduleBiopsy = function (obj) {

        var Response = $http({
            url: API.APIurl + 'EmbrologyAPI/AddIVFDashboardBIOPSYDetails',
            data: obj,
            //dataType: 'json',
            method: 'post'
            //,headers: {
            //    "Content-Type": "application/json"
            //}
        }).error(function () {
        });
        return Response;
    };
});