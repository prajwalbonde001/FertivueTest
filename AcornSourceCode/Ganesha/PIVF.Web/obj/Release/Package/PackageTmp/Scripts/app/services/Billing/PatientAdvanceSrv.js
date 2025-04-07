PIVF.service('PatientAdvanceSrv', function ($http, API) {
    debugger;
    /******************************************************************************************************/
    this.savePatientAdvance = function savePatientAdvance(PatientAdvanceData) {
        debugger;
        var response = $http({
            url: API.APIurl + 'PatientAdvanceAPI/AddOrUpdateAdvance',
            data: PatientAdvanceData,
            method: 'post'
        }).error(function () {
        });
        return response;
    };
    /******************************************************************************************************/
this.FillAdvanceList = function (PatientID, PatientUnitID) {       
        var Response = $http.get(API.APIurl + 'PatientAdvanceAPI/FillAdvanceList',
        {
            params: {PatientID: PatientID, PatientUnitID: PatientUnitID}
        }).error(function () {
            });
        return Response;
    };
 /******************************************************************************************************/



     this.GetAdvancelist = function (AdvanceLists, index, PgEn) {
        debugger;
        //var Response = $http.get(API.APIurl + 'BillingAPI/GetBillList',
        //    { params: {BillingList:BillingList, index: index, PgEn: PgEn } }
        //  //  BillingList


        //    ).error(function () {
        //    //  window.location = '/Error/CustomError';
        //});
        //return Response;
        

        var Response = $http({
            url: API.APIurl + 'PatientAdvanceAPI/GetAdvanceList',
            params: { index: index, PgEn: PgEn },      // After modified by Nayan Kamble on 04/02/2020   for session issue
            data: AdvanceLists,
            method: 'post'
        }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

this.PrintAdvanceReceipt = function (PatientID, PatientUnitID,AdvanceID) {       
        var Response = $http.get(API.APIurl + 'BillingAPI/GetAdvanceReciept',
        {
            params: {PatientID: PatientID, PatientUnitID: PatientUnitID,AdvanceID:AdvanceID}
        }).error(function () {
            });
        return Response;
    };
    this.PrintAdvanceRefundReceipt = function (PatientID, PatientUnitID,RefundID) {       
        var Response = $http.get(API.APIurl + 'BillingAPI/GetAdvanceRefundReciept',
        {
            params: {PatientID: PatientID, PatientUnitID: PatientUnitID,RefundID:RefundID}
        }).error(function () {
            });
        return Response;
    };
  

});