PIVF.service('KPISrv', function ($http, API) {

    this.KPISelf = function (FromDate, ToDate, UnitId, AgeMin, AgeMax, Fresh) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPISelf', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId,AgeMin:AgeMin,AgeMax:AgeMax,Fresh:Fresh } }).error(function () {
        });
        return Response;
    };
    this.KPIDonor = function (FromDate, ToDate, UnitId, AgeMin, AgeMax,Fresh) {
     debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPIDonor', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax,Fresh:Fresh } }).error(function () {
        });
        return Response;
    };
    this.KPIImplantationRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax,Action,Fresh) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPIImplantationRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax, Action: Action, Fresh: Fresh } }).error(function () {
        });
        return Response;
    };
    this.KPIClinicalPregnancyRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPIClinicalPregnancyRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax } }).error(function () {
        });
        return Response;
    };
    this.KPICleavageRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPICleavageRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax } }).error(function () {
        });
        return Response;
    };
    this.KPILiveBirthRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax,Action,Fresh) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPILiveBirthRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax,Action:Action,Fresh:Fresh } }).error(function () {
        });
        return Response;
    };
    this.KPIBiochemicalPregnancyRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPIBiochemicalPregnancyRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax } }).error(function () {
        });
        return Response;
    };
    this.KPIOnGoingPregnancyRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPIOnGoingPregnancyRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax } }).error(function () {
        });
        return Response;
    };
    this.KPIFertilizationRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPIFertilizationRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax } }).error(function () {
        });
        return Response;
    };
    this.KPIGoodGradeRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPIGoodGradeRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax } }).error(function () {
        });
        return Response;
    };
    this.KPIIUIPregnancySucessRate = function (FromDate, ToDate, UnitId, AgeMin, AgeMax, Action) {
        debugger;
        var Response = $http.get(API.APIurl + 'KPI/KPIIUIPregnancySucessRate', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId, AgeMin: AgeMin, AgeMax: AgeMax, Action: Action } }).error(function () {
        });
        return Response;
    };
    this.KPIPDF = function (Obj) {
        debugger;
        //var Indata =  { Obj: Obj, Data: Data } 
        var Response = $http({
            url: API.APIurl + 'KPI/KPIPDF',
            data: Obj,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };
    


})