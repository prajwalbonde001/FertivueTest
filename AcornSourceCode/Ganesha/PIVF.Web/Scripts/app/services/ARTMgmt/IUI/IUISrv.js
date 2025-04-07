
PIVF.service('IUISrv', function ($http, API) {

    this.SaveUpdate = function (objIUI) {
        
        var Response = $http({
            url: API.APIurl + 'IUIAPI/SaveUpdate',
            data: objIUI,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        debugger;
        if (objIUI.ListFreezThawSamples.length > 0 && objIUI.IsFinalized == true)
        {
            this.SaveThowingDetails(objIUI.ListFreezThawSamples);
        }       

        return Response;
    };

    this.GetIUIDetails = function () {
        
        var Response = $http.get(API.APIurl + 'IUIAPI/GetIUIDetails').error(function () {
        });
        return Response;
    };
    this.LoadDonorData = function () {

        var Response = $http.get(API.APIurl + 'IUIAPI/LoadDonorData').error(function () {
        });
        return Response;
    };
    this.GetSemenThawingDetailFromIUIIDForTC = function (FormNo, action) {
        // 
        var Response = $http.get(API.APIurl + 'SemenPrep/GetSemenThawingDetailFromIUIIDForTC', { params: { FormNo: FormNo, action: action } }).error(function () {
        });
        return Response;
    };
    this.GetSemenPreparationList = function () {
        // 
        var Response = $http.get(API.APIurl + 'SemenPrep/GetSemenPreparationList').error(function () {
        });
        return Response;
    };
    this.GetDonorFrozenSamples =function(DonorID, DonorUnitID)
    {
        debugger
        var Response = $http.get(API.APIurl + 'IUIAPI/GetDonorFrozenSamples', { params: { DonorID: DonorID, DonorUnitID: DonorUnitID } }).error(function () {
        });
        return Response;
    }
    this.GetThowSmaples = function (ID, UnitID, IsFreezThaw) {
        debugger
        var Response = $http.get(API.APIurl + 'IUIAPI/GetThowSmaples', { params: { ID: ID, UnitID: UnitID, IsFreezThaw: IsFreezThaw } }).error(function () {
        });
        return Response;
    }
    
    this.SaveThowingDetails = function SaveThowingDetails(ListThowingDetails) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'SemenThawing/SaveUpdate',
            data: ListThowingDetails,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });        
        return Response;
    };

});
