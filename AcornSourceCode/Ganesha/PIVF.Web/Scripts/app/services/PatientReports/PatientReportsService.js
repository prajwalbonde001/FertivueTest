PIVF.service('PatientReportsService', function ($http, API , $uibModal, $rootScope) {

    /*------------------------yyyy-mm-dd---------------------------------------------------------------------------------------------------*/
    this.GetPatientAdvanceReport = function (UnitID , FromDate , ToDate ) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetPatientAdvanceReport',{
                params: { UnitID : UnitID   , FromDate: FromDate ,ToDate: ToDate }
            }).error(function () {
            });
        return Response;
    };


     this.GetServiceWiseBillingReport = function (UnitID , FromDate , ToDate ) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetServiceWiseBillingReport',{
                params: { UnitID : UnitID   , FromDate: FromDate ,ToDate: ToDate }
            }).error(function () {
            });
        return Response;
    };



     this.GetDailyOutstandingReport = function (UnitID , FromDate , ToDate ) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetDailyOutstandingReport',{
                params: { UnitID : UnitID   , FromDate: FromDate ,ToDate: ToDate }
            }).error(function () {
            });
        return Response;
    };




     this.GetDailyRevenueReport = function (UnitID , FromDate , ToDate ) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetDailyRevenueReport',{
                params: { UnitID : UnitID   , FromDate: FromDate ,ToDate: ToDate }
            }).error(function () {
            });
        return Response;
    };

     this.GetDiscountRegisterReport = function (UnitID , FromDate , ToDate ) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetDiscountRegisterReport',{
                params: { UnitID : UnitID   , FromDate: FromDate ,ToDate: ToDate }
            }).error(function () {
            });
        return Response;
    };


     this.GetDailyCollectionReport = function (UnitID ) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetDailyCollectionReport',{
                params: { UnitID : UnitID }
            }).error(function () {
            });
        return Response;
    };


     this.GetRefundReportReciept = function (UnitID , FromDate , ToDate ) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetRefundReportReciept',{
                params: { UnitID : UnitID   , FromDate: FromDate ,ToDate: ToDate }
            }).error(function () {
            });
        return Response;
    };

    
    this.GetDailyCollectionRpt = function (UnitID, FromDate, ToDate) {
         debugger;
         var Response = $http.get(API.APIurl + 'BillingAPI/GetDailyCollectionRpt', {
             params: { UnitID: UnitID, FromDate: FromDate, ToDate: ToDate }
         }).error(function () {
         });
         return Response;
     };

        
    this.GetUnitListByUserID = function (UserID) {
         debugger;
         var Response = $http.get(API.APIurl + 'BillingAPI/GetUnitListByUserID', {
             params: { UserID: UserID}
         }).error(function () {
         });
         return Response;
     };


      this.GetUnitDetailsByUnitID = function (UnitID) {
         debugger;
         var Response = $http.get(API.APIurl + 'BillingAPI/GetUnitDetailsByUnitID', {
             params: { UnitID: UnitID}
         }).error(function () {
         });
         return Response;
     };




           /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetUnitDetails = function () {

        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetUnitDetails').error(function () {
        });
        return Response;
    };

});