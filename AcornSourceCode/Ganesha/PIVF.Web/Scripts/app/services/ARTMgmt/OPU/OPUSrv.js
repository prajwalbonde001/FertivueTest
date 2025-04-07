PIVF.service('OPUSrv', function ($http, API) {

    this.SaveUpdateOPU = function (OPU) {
        var Response = $http.post(API.APIurl + 'OPUAPI/SaveUpdate', OPU).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetMedicalHistory = function () {
        // 
        var Response = $http.get(API.APIurl + 'NewART/GetMedicalHistory').error(function () {
        });
        return Response;
    };

    this.GetTriggerData = function () {
        var Response = $http.get(API.APIurl + 'OPUAPI/GetTriggerData').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetOPUData = function () {
        var Response = $http.get(API.APIurl + 'OPUAPI/GetOPUData').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.IsStimulationFinalize = function () {
        var Response = $http.get(API.APIurl + 'OPUAPI/IsStimulationFinalize').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.IsOPUFinalize = function () {
        var Response = $http.get(API.APIurl + 'OPUAPI/IsOPUFinalize').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
})