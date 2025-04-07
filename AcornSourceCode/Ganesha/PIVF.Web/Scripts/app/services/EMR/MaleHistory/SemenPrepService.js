
PIVF.service('SemenPrepService', function ($http, API) {
   
    this.SaveUpdate = function (SemenPrep) {
        
        var Response = $http({
            url: API.APIurl + 'SemenPrep/SaveUpdate',
            data: SemenPrep,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });

        debugger;
        if (SemenPrep.ListFreezThawSamples != undefined) {
            if (SemenPrep.ListFreezThawSamples.length > 0 && SemenPrep.IsFinalized == true) {
                this.SaveThowingDetails(objIUI.ListFreezThawSamples);
            }
        }
       
        return Response;
    };


    this.GetSemenPreparationList = function () {
        // 
        var Response = $http.get(API.APIurl + 'SemenPrep/GetSemenPreparationList').error(function () {
        });
        return Response;
    };

    this.GetSemenPreparationListForTC = function () {
        // 
        var Response = $http.get(API.APIurl + 'SemenPrep/GetSemenPreparationListForTC').error(function () {
        });
        return Response;
    };

    this.GetSemenThawingDetailFromSemenPrepIDForTC = function (FormNo, action) {
        // 
        var Response = $http.get(API.APIurl + 'SemenPrep/GetSemenThawingDetailFromSemenPrepIDForTC', { params: { FormNo: FormNo, action: action } }).error(function () {
        });
        return Response;
    };


    this.GetSemenProcessingDetailFromSemenPrepIDForTC = function (SNo) {
        // 
        var Response = $http.get(API.APIurl + 'SemenPrep/GetSemenProcessingDetailFromSemenPrepIDForTC', { params: { SNo: SNo } }).error(function () {
        });
        return Response;
    };
    this.GetSPDetailsBySNo = function (SNo) {
        // 
        var Response = $http.get(API.APIurl + 'SemenPrep/GetSPDetailsBySNo', { params: { SNo: SNo } }).error(function () {
        });
        return Response;
    };
});
