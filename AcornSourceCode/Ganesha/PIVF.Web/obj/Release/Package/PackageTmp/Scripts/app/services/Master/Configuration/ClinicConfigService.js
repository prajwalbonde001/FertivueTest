PIVF.service('ClinicConfigService', function ($http, API) {

    this.getClinic = function () {

        var Response = $http.get(API.APIurl + 'UserRole/getClinic')
        return Response;
    }

    this.SaveClinic = function (ClinicList) {

        var Response = $http({
            url: API.APIurl + 'UserRole/SaveClinic',
            data: ClinicList,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
   
    
    


})