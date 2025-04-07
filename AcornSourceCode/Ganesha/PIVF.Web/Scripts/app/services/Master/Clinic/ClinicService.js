PIVF.service('ClinicService', function ($http, API, $filter) {

    this.GetClinicListForLandingPage = function (searchPara) {
        var Response = $http({
            url: API.APIurl + 'Clinic/GetClinicListForLandingPage',
            params: { searchPara: angular.toJson(searchPara) },
            method: 'GET'
        }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
  
    this.Modify = function (ObjData, OldDataValue) {
        var ClinicAudit = { AuditData: OldDataValue };
        debugger;
        var Response = $http({
            url: API.APIurl + 'Clinic/Modify',
            data: ObjData,
            method: 'post'
        }).success(function () {
            var Response = $http({
                url: API.url + 'DoctorAudit',
                data: ClinicAudit,
                method: 'post'
            }).error(function () {

            });
        }).error(function () {
        });
        return Response;
    };

    this.ActivateDeactivateClinic = function (Clinic) {
        // debugger;
        var Response = $http.post(API.APIurl + 'Clinic/ActivateDeactivateClinic', Clinic).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetDepartmentListForUnit = function (UnitID) {

        var Response = $http.get(API.APIurl + 'Clinic/GetDepartmentListForUnit', { params: { UnitID: UnitID } }
            ).error(function () {
            });
        return Response;
    };
   
});