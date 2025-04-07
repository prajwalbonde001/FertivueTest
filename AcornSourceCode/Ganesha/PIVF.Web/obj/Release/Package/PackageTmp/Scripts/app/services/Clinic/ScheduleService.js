PIVF.service('ScheduleService', function ($http, API) {

    this.GetScheduleList = function (flag) {
        debugger;
        var Response = $http.get(API.url + 'Schedule').error(function () {
            debugger;
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.UpdateSchedule = function (ObjData) {
        // debugger;
        var Response = $http({
            url: API.url + 'Schedule',
            data: ObjData,
            method: 'post'
        }).error(function () {
            //
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.UpdateDSStatusLanding = function (ObjData) {
        debugger;
        var Response = $http({
            url: API.url + 'UpdateDSStatusLanding',
            data: ObjData,
            method: 'put'
        }).error(function () {

        });
        return Response;
    };

    this.GetDoctorScheduleDates = function (DOCID) {
        debugger;
        var Response = $http.get(API.url + 'GetDoctorScheduleDates', {
            params: {
                DOCID: DOCID
            }
        }).error(function () {

        });
        return Response;
    };

    this.AddDoctorScheduleMaster = function (ObjData) {
        debugger;
        var Response = $http({
            url: API.url + 'AddDoctorScheduleMaster',
            data: ObjData,
            method: 'post'
        }).error(function () {
            //
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.UpdateDoctorSchedule = function (ObjData) {
        debugger;
        var Response = $http({
            url: API.url + 'UpdateDoctorSchedule',
            data: ObjData,
            method: 'put'
        }).error(function () {
            //
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.AddDoctorScheduleDetails = function (ObjData) {
        debugger;
        var Response = $http({
            url: API.url + 'AddDoctorScheduleDetails',
            data: ObjData,
            method: 'post'
        }).error(function () {
            //
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.AddScheduleDetail = function (ObjData) {
        debugger;
        var Response = $http({
            url: API.url + 'AddScheduleDetail',
            data: ObjData,
            method: 'post'
        }).error(function () {
            //
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

     //Added by Nayan Kamble on 21/11/2019   START
    this.GetSlotMaster = function () {
        debugger;
        var response = $http.get(API.url + 'GetSlotMaster'
            ).error(function () {
            });
        return response;
    };

    //END
   

});