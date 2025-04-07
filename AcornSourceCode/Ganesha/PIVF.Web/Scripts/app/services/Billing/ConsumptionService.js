PIVF.service('ConsumptionService', function ($http, API) {
    this.GetServiceList = function () {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetServiceList').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
    //this.GetBillList = function (PatID, PatUnitID, VisitID, VisistUnitID) {
    //    debugger;
    //    var Response = $http.get(API.APIurl + 'BillingAPI/GetBillList', {
    //            params: { PatID: PatID, PatUnitID: PatUnitID, VisitID: VisitID, VisistUnitID: VisistUnitID }
    //        }).error(function () {
    //    });
    //    return Response;
    //};


    //this.GetBillList = function (BillingList) {
    //    debugger;
    //    var Response = $http.post(API.APIurl + 'BillingAPI/GetBillList', BillingList).error(function () {
    //        //  window.location = '/Error/CustomError';
    //    });
    //    return Response;
    //};     commented by Nayan Kamble on 13/02/2020
     
    this.GetMaterialConsupmtionList = function (BillingList, index, PgEn) {
        debugger;
        //var Response = $http.get(API.APIurl + 'BillingAPI/GetBillList',
        //    { params: {BillingList:BillingList, index: index, PgEn: PgEn } }
        //  //  BillingList


        //    ).error(function () {
        //    //  window.location = '/Error/CustomError';
        //});
        //return Response;
        

        var Response = $http({
            url: API.APIurl + 'MaterialConsumptionListAPI/GetMaterialConsupmtionList',
            params: { index: index, PgEn: PgEn },      // After modified by Nayan Kamble on 04/02/2020   for session issue
            data: BillingList,
            method: 'post'
        }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    //this.SaveBill = function (lstobj) {
    //    debugger;
    //    var Response = $http({
    //        url: API.APIurl + 'BillingAPI/SaveBill',
    //        data: lstobj,
    //        dataType: 'json',
    //        method: 'post',
    //        headers: {
    //            "Content-Type": "application/json"
    //        }
    //        }).error(function () {
    //            //window.location = '/Error/CustomError';
    //        });
    //    return Response;
    //};

   

    this.SaveBill = function (lstobj) {

        var Response = $http({
            url: API.APIurl + 'BillingAPI/SaveBill',
            data: lstobj,
            //dataType: 'json',
            method: 'post'
            //,headers: {
            //    "Content-Type": "application/json"
            //}
        }).error(function () {
        });
        return Response;
    };
    this.UpdateBill = function (lstobj) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'BillingAPI/UpdateBill',
            data: lstobj,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.UpdateChargeWhileSettle = function (lstobj) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'BillingAPI/AddUpdateChargeAndDetailsWhileSettle',
            data: lstobj,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetSavedBillList = function (BillID,BillUnitID,VisitID,VisitUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetSavedBillList', {
            params: { BillID: BillID, BillUnitID: BillUnitID,VisitID: VisitID, VisitUnitID: VisitUnitID }
        }).error(function () {
        });
        return Response;
    }
    

    this.DeleteService = function (BillID, BillUnitID, ServiceCode) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/DeleteService', {
            params: { BillID: BillID, BillUnitID: BillUnitID, ServiceCode: ServiceCode }
                //data: delSer,
           // method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.GetPatientDetails = function (PatID,PatUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetPatientDetails', {
            params: { PatID: PatID, PatUnitID: PatUnitID }
        }).error(function () {
        });
        return Response;

    }

    this.GetPaymentDetailsForSettleBill = function (BillID,BillUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetPaymentDetailsForSettleBill', {
            params: { BillID: BillID, BillUnitID: BillUnitID }
        }).error(function () {
        });
        return Response;
    }

    this.SaveUpdatePayment = function (lstobj) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'BillingAPI/SaveUpdatePayment',
            data: lstobj,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    
    this.GetChargeList = function (BillID, BillUnitID,VisitID,VisitUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetChargeList', {
            params: { BillID: BillID, BillUnitID: BillUnitID, VisitID: VisitID, VisitUnitID: VisitUnitID }
        }).error(function () {
        });
        return Response;
    }

    
    this.UpdateBillPaymentDetails = function (lstobj) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'BillingAPI/UpdateBillPaymentDetails',
            data: lstobj,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };




    
    this.GetReceiptList = function (BillID, UnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetReceiptList', {
            params: { BillID: BillID, UnitID: UnitID }
        }).error(function () {
        });
        return Response;
    }

     this.GetCheckedInPatientsList = function ( Search) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetCheckedInPatientsList', {
            params: { Search: Search }
        }).error(function () {
        });
        return Response;
    }

  /****************************************************************************************************************************/

    this.GetBalanceAdvanceAmount = function (UnitID, PatientID,PatientUnitID) {       
        var Response = $http.get(API.APIurl + 'PatientAdvanceAPI/GetAdvanceBalanceAmount',
        {
            params: {UnitID: UnitID, PatientID: PatientID,PatientUnitID:PatientUnitID}
        }).error(function () {
            });
        return Response;
    };
  this.CancelBill = function (lstobj) {

        var Response = $http({
            url: API.APIurl + 'BillingAPI/UpdateBillCancellationDetails',
            data: lstobj,
            //dataType: 'json',
            method: 'post'
            //,headers: {
            //    "Content-Type": "application/json"
            //}
        }).error(function () {
        });
        return Response;
    };
    this.GetUnitOfMeasure = function (ItemID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetUnitOfMeasure',{params: {ItemID:ItemID}}).error(function () {
        });
        return Response;
    }
    this.GetItemListForPharmacy = function (StoreID,Search) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetItemListForPharmacy',{params: {StoreID:StoreID,Search:Search}}).error(function () {
        });
        return Response;
    }

       this.GetBatchCodeForPharmacy = function (ItemID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetBatchCodeForPharmacy',{params: {ItemID:ItemID}}).error(function () {
        });
        return Response;
    }

     this.GetStoreMasterList = function () {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetStoreMasterList').error(function () {
        });
        return Response;
     }

      this.GetMaterialConsumptionItemList = function (MaterialConsumptionID,MaterialConsumptionUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'MaterialConsumptionListAPI/GetMaterialConsumptionItemList',{params: {MaterialConsumptionID:MaterialConsumptionID,MaterialConsumptionUnitID:MaterialConsumptionUnitID}}).error(function () {
        });
        return Response;
    }
     this.GetUOMConcersionFactor = function (BatchID,ItemID,FromUOMID,ToUOMID) {
        debugger;
        var Response = $http.get(API.APIurl + 'MaterialConsumptionListAPI/GetUOMConcersionFactor',{params: {BatchID:BatchID,ItemID:ItemID,FromUOMID:FromUOMID,ToUOMID:ToUOMID}}).error(function () {
        });
        return Response;
    }


    
    this.SaveConsumptionDetails = function (objMaterialConsumption) {
    debugger
        var Response = $http({
            url: API.APIurl + 'MaterialConsumptionEntryAPI/SaveConsumptionDetails',
            data: objMaterialConsumption,
            //dataType: 'json',
            method: 'post'
            //,headers: {
            //    "Content-Type": "application/json"
            //}
        }).error(function () {
        });
        return Response;
    };
});