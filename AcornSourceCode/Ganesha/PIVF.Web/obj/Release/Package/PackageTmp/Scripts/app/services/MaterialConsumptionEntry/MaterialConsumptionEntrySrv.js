PIVF.service('MaterialConsumptionEntrySrv', function ($http, API) {
   this.SaveConsumptionDetails = function SaveConsumptionDetails(objMaterialConsumption) {
        debugger;
        var response = $http({
            url: API.APIurl + 'MaterialConsumptionEntryAPI/SaveConsumptionDetails',
            data: objMaterialConsumption,
            method: 'post'
        })
         .error(function () {
        });
        return response;
    };
});

