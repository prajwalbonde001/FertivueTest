PIVF.service('FinancialKPIsSrv', function ($http, API) {

/*---------------------------------------------------------------------------------------------------------------------------*/
this.getPatientCountList = function (FromDate, ToDate, UnitId) {
         debugger;
        var Response = $http.get(API.APIurl + 'FinancialKPIsAPI/getPatientCountList', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId } }).error(function () {
         });
        return Response;
    };   
/*---------------------------------------------------------------------------------------------------------------------------*/
this.getPaymentModeWiseCollection = function (FromDate, ToDate, UnitId) {
         debugger;
        var Response = $http.get(API.APIurl + 'FinancialKPIsAPI/getPaymentModeWiseCollection', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId } }).error(function () {
            });
        return Response;
    };
/*---------------------------------------------------------------------------------------------------------------------------*/
this.getTodaysCollection = function (FromDate, ToDate, UnitId) {
         debugger;
        var Response = $http.get(API.APIurl + 'FinancialKPIsAPI/getTodaysCollection', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId } }).error(function () {
            });
        return Response;
    };
/*---------------------------------------------------------------------------------------------------------------------------*/
this.getServiceOutStanding = function (FromDate, ToDate, UnitId) {
         debugger;
        var Response = $http.get(API.APIurl + 'FinancialKPIsAPI/getServiceOutStanding', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId } }).error(function () {
            });
        return Response;
    };
/*---------------------------------------------------------------------------------------------------------------------------*/
this.getPharmacyOutStanding = function (FromDate, ToDate, UnitId) {
         debugger;
        var Response = $http.get(API.APIurl + 'FinancialKPIsAPI/getPharmacyOutStanding', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId } }).error(function () {
            });
        return Response;
    };
/*---------------------------------------------------------------------------------------------------------------------------*/
this.getSpecialityWiseRevenue = function (FromDate, ToDate, UnitId) {
         debugger;
        var Response = $http.get(API.APIurl + 'FinancialKPIsAPI/getSpecialityWiseRevenue', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId } }).error(function () {
            });
        return Response;
    };
/*---------------------------------------------------------------------------------------------------------------------------*/
});