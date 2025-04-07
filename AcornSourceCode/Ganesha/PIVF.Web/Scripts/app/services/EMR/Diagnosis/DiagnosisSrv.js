PIVF.service('DiagnosisSrv', function ($http, API) {
    this.SavePatientDiagnosis = function (Diagnosis) {
        
        var Response = $http({
            url: API.APIurl + 'DiagnosisAPI/SavePatientDiagnosis',
            data: Diagnosis,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.SaveOtherDiagnosis = function (OtherDiagnosis) {
        
        var Response = $http({
            url: API.APIurl + 'DiagnosisAPI/SaveOtherDiagnosis',
            data: OtherDiagnosis,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.CheckIfDiagnosisAddedToPatient = function (OtherDiagnosis) {
        
        var Response = $http({
            url: API.APIurl + 'DiagnosisAPI/CheckIfDiagnosisAddedToPatient',
            data: OtherDiagnosis,
            method: 'POST'
        }).error(function () {
        });
        return Response;
    };
    
    this.SetFavourite = function (Diagnosis) {
        
        var Response = $http({
            url: API.APIurl + 'DiagnosisAPI/SetFavourite',
            data: Diagnosis,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.RemoveFavourite = function (ID, UnitID, IsOther, Reason) {
        
        var Response = $http.get(API.APIurl + 'DiagnosisAPI/RemoveFavourite',
            {
                params: { ID: ID, UnitID: UnitID, IsOther: IsOther, Reason: Reason }

            }).error(function () {
            });
        return Response;
    };
    this.DeletePatientDiagnosis = function (ID, UnitID, Reason) {
        
        var Response = $http.get(API.APIurl + 'DiagnosisAPI/DeletePatientDiagnosis',
            {
                params: { ID: ID, UnitID: UnitID, Reason: Reason }

            }).error(function () {
            });
        return Response;
    };
    this.DeleteOtherDiagnosis = function (ID, UnitID, IsOther, Reason) {
        
        var Response = $http.get(API.APIurl + 'DiagnosisAPI/DeleteOtherDiagnosis',
            {
                params: { ID: ID, UnitID: UnitID, IsOther: IsOther, Reason: Reason }

            }).error(function () {
            });
        return Response;
    };
    this.GetPatientDiagnosis = function (PageIndex) {
        
        var Response = $http.get(API.APIurl + 'DiagnosisAPI/GetPatientDiagnosis',
            {
                params: { PageIndex: PageIndex }

            }).error(function () {
            });
        return Response;
    };
    this.FillDiagnosis = function (PageIndex, Diagnosis,GenderID) {
        
        var Response = $http.get(API.APIurl + 'DiagnosisAPI/FillDiagnosis',
            {
                params: { PageIndex: PageIndex, Diagnosis: Diagnosis, GenderID: GenderID }

            }).error(function () {
            });
        return Response;
    };
    this.FillFavouriteDiagnosis = function (PageIndex, Diagnosis) {
        
        var Response = $http.get(API.APIurl + 'DiagnosisAPI/FillFavouriteDiagnosis',
            {
                params: { PageIndex: PageIndex, Diagnosis: Diagnosis }

            }).error(function () {
            });
        return Response;
    };
    this.FillOtherDiagnosis = function (PageIndex, Diagnosis) {
        
        var Response = $http.get(API.APIurl + 'DiagnosisAPI/FillOtherDiagnosis',
            {
                params: { PageIndex: PageIndex, Diagnosis: Diagnosis}

            }).error(function () {
            });
        return Response;
    };
});