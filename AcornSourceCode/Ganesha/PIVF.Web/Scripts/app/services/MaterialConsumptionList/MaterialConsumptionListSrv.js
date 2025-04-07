PIVF.service('MaterialConsumptionListSrv', function ($http, API) {
 this.GetMaterialConsupmtionList = function (ConsupmtionList, index, PgEn) {
        debugger;
        

        var Response = $http({
            url: API.APIurl + 'MaterialConsumptionListAPI/GetMaterialConsupmtionList',
            params: { index: index, PgEn: PgEn },     
            data: ConsupmtionList,
            method: 'post'
        }).error(function () {
           
        });
        return Response;
    };


 this.GetMaterialConsumptionItemList = function (MaterialConsumptionID, MaterialConsumptionUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'MaterialConsumptionListAPI/GetMaterialConsumptionItemList',
            { params: { MaterialConsumptionID: MaterialConsumptionID, MaterialConsumptionUnitID: MaterialConsumptionUnitID } })
        .error(function () {
        });
        return Response;
    }
   
});

