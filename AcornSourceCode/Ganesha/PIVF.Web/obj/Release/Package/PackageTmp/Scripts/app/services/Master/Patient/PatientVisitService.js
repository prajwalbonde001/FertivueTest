PIVF.service('PatientVisitService', function ($http, API) {

    this.GetPatientDetails = function (Criteria, IsAppSearch, RegUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'PatientVisit/GetPatientDetails',
            { params: { Criteria: Criteria, IsAppSearch: IsAppSearch, RegUnitID: RegUnitID } })
        .error(function () {
        });
        return Response;
    }

    this.GetDDVisitTypeList = function () {
        var Response = $http.get(API.APIurl + 'PatientVisit/GetDDVisitTypeList')
        .error(function () {
        });
        return Response;
    }

    this.GetDDCabinList = function () {

        var Response = $http.get(API.APIurl + 'PatientVisit/GetDDCabinList')
        .error(function () {
        });
        return Response;
    }

    this.GetDoctorList = function () {

        var Response = $http.get(API.APIurl + 'PatientVisit/GetDoctorList')
        .error(function () {
        });
        return Response;
    }

    this.GetPayersDD = function () {

        var Response = $http.get(API.APIurl + 'PatientVisit/GetPayersDD')
        .error(function () {
        });
        return Response;
    }

    this.LoadRelationList = function (Gender) {

        var response = $http.get(API.APIurl + 'PatientVisit/LoadRelationList', { params: { Gender: Gender } }).error(function () {
        }).error(function () {
        });
        return response;
    };

    this.GetPatientCatBySrcID = function (CatL1ID) {

        var response = $http.get(API.APIurl + 'PatientVisit/GetPatientCatBySrcID', { params: { CatL1ID: CatL1ID } }).error(function () {
        }).error(function () {
        });
        return response;
    };

    this.GetAssCompany = function (CompID) {

        var response = $http.get(API.APIurl + 'PatientVisit/GetAssCompany', { params: { CompID: CompID } }).error(function () {
        }).error(function () {
        });
        return response;
    };

    this.GetTariffByAssCompany = function (CompAssID) {

        var response = $http.get(API.APIurl + 'PatientVisit/GetTariffByAssCompany', { params: { CompAssID: CompAssID } }).error(function () {
        }).error(function () {
        });
        return response;
    };

    this.GetVisits = function GetVisits(RegID, RegUnitID, PageIndex) {

        var response = $http.get(API.APIurl + 'PatientVisit/GetVisits',
            { params: { RegID: RegID, RegUnitID: RegUnitID, PageIndex: PageIndex } }).error(function () {
            }).error(function () {
            });
        return response;
    };

    this.GetSponsers = function GetSponsers(RegID, PageIndex) {

        var response = $http.get(API.APIurl + 'PatientVisit/GetSponsers',
            { params: { RegID: RegID, PageIndex: PageIndex } }).error(function () {
            }).error(function () {
            });
        return response;
    };

    //this.SaveVisit = function (PatientData) {
    //        var Response = $http({
    //            url: API.APIurl + 'PatientVisit/SaveVisit',
    //        data: PatientData,
    //        method: 'post'
    //        }).error(function () {
    //            //window.location = '/Error/CustomError';
    //        });
    //    return Response;
    //};

    this.SaveVisit = function SaveVisit(PatientData, OldDataValue) {
        var response = $http({
            url: API.APIurl + 'PatientVisit/SaveVisit',
            data: PatientData,
            method: 'post'
        //}).success(function () {
        //    var response = $http({
        //        url: API.APIurl + 'PatientVisit/VisitAudit',
        //        data: OldDataValue,
        //        method: 'post'
        //    }).error(function () {

        //   });
        }).error(function () {
        });
        return response;
    };

    //Added by Nayan Kamble on 19/11/2019  Start
    this.SaveExternalDoc = function (ObjData, OldDataValue) {
        var response = $http({
            url: API.APIurl + 'PatientVisit/SaveExternalDoc',
            data: ObjData,
            method: 'post'
        }).error(function () {
        });
        return response;
    };
    // Added by Nayan Kamble on 19/11/2019  END


    this.GetTokenNo = function (CabinID) {

        var response = $http.get(API.APIurl + 'PatientVisit/GetTokenNo', { params: { CabinID: CabinID } })
           .error(function () {
           });
        return response;
    };

});