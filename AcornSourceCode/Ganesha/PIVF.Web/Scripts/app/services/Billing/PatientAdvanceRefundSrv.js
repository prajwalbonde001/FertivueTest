PIVF.service('PatientAdvanceRefundSrv', function ($http, API) {
    debugger;
    /******************************************************************************************************/
    this.savePatientAdvanceRefund = function savePatientAdvanceRefund(PatientAdvanceRefundData) {
        debugger;
        var response = $http({
            url: API.APIurl + 'PatientAdvanceRefundAPI/savePatientAdvanceRefund',
            data: PatientAdvanceRefundData,
            method: 'post'
        }).error(function () {
        });
        return response;
    };
    /******************************************************************************************************/
    this.FillRefundList = function (PatientID, PatientUnitID) {       
        var Response = $http.get(API.APIurl + 'PatientAdvanceRefundAPI/FillRefundList',
        {
            params: {PatientID: PatientID, PatientUnitID: PatientUnitID}
        }).error(function () {
            });
        return Response;
    };
 /******************************************************************************************************/

/******************************************************************************************************New Api call for Refund list for new screen by Tejas Saxena*/
 this.GetRefundlist = function (RefundLists, index, PgEn) {
        debugger;
        //var Response = $http.get(API.APIurl + 'BillingAPI/GetBillList',
        //    { params: {BillingList:BillingList, index: index, PgEn: PgEn } }
        //  //  BillingList


        //    ).error(function () {
        //    //  window.location = '/Error/CustomError';
        //});
        //return Response;
        

        var Response = $http({
            url: API.APIurl + 'PatientAdvanceRefundAPI/GetPatientRefundList',
            params: { index: index, PgEn: PgEn },      // After modified by Nayan Kamble on 04/02/2020   for session issue
            data: RefundLists,
            method: 'post'
        }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
     this.GetPatientDetails = function (PatID,PatUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'PatientAdvanceRefundAPI/GetPatientDetails', {
            params: { PatID: PatID, PatUnitID: PatUnitID }
        }).error(function () {
        });
        return Response;

    }
    this.GetPatientDetailsForBillCancellation = function (BillID) {
        debugger;
        var Response = $http.get(API.APIurl + 'PatientAdvanceRefundAPI/GetPatientDetailsForBillCancellation', {
            params: { BillID:BillID }
        }).error(function () {
        });
        return Response;

    }
});