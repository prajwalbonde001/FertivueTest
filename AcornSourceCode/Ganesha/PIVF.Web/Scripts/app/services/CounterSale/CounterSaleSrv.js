PIVF.service('CounterSaleSrv', function ($http, API) {

 
     this.GetItemListofStore = function (StoreID) {
     debugger;
        var Response = $http.get(API.APIurl + 'CounterSaleAPI/GetItemListofStore', {
            params: { StoreID : StoreID}
        }).error(function () {
        });
        return Response;
    }

     this.GetItemBatchwiseStock = function (ItemID, UnitID,StoreID) {
        debugger;
        var Response = $http.get(API.APIurl + 'CounterSaleAPI/GetItemBatchwiseStock', {
            params: { ItemID: angular.toJson(ItemID), UnitID: angular.toJson(UnitID),
             StoreID: angular.toJson(StoreID)}
         
        }).error(function () {
            
        });
        return Response;
    }

     this.GetItemDetailsByID = function (ItemID,StoreID) {
        debugger;
        var Response = $http.get(API.APIurl + 'CounterSaleAPI/GetItemDetailsByID', {
            params: { ItemID: angular.toJson(ItemID),
             StoreID: angular.toJson(StoreID)}
         
        }).error(function () {
            
        });
        return Response;
    }


  this.GetItemUOMConversionsByID = function (ItemId) {
        debugger;
        var Response = $http.get(API.APIurl + 'CounterSaleAPI/GetItemUOMConversionsByID', {
            params: { ItemId: angular.toJson(ItemId)
            }
         
        }).error(function () {
            
        });
        return Response;
    }
    // this.GetItemDetailsByID = function () {
    //    debugger;
    //    var Response = $http.get(API.APIurl + 'CounterSaleAPI/GetItemDetailsByID').error(function () {
    //    });
    //    return Response;
    //}

     this.SaveCounterSaleBill = function SaveCounterSaleBill(objBill) {
        debugger;
        var response = $http({
            url: API.APIurl + 'CounterSaleAPI/SaveCounterSaleBill',
            data: objBill,
            method: 'post'
        }).error(function () {
        });
        return response;
    };

 this.GetPatientDetails = function (Criteria, IsAppSearch, RegUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'CounterSaleAPI/GetPatientDetails',
            { params: { Criteria: Criteria, IsAppSearch: IsAppSearch, RegUnitID: RegUnitID } })
        .error(function () {
        });
        return Response;
    }

});