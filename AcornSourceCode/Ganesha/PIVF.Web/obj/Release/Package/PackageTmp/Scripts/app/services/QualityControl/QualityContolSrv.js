PIVF.service('QualityContolSrv', function ($http,API) {
//=========================================================================================================================

//=========================================================================================================================
    this.SaveQualityControl = function (QualityControl) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'QualityControlAPI/SaveQualityControlData',
            data: QualityControl,
            method: 'post'
        }).error(function () {
        });
        return Response;
    }

//=========================================================================================================================


//=========================================================================================================================
    this.GetAllQualityControlList = function (PageIndex1) {
        debugger;
        var Response = $http.get(API.APIurl + 'QualityControlAPI/GetAllQualityControl', {
            params: { PageIndex: PageIndex1 }
        }).error(function () {
        });
        return Response;
    };
//=========================================================================================================================

    //=========================================================================================================================
    this.DeleteRecord = function (obj) {
        debugger;
        var Response = $http.post(API.APIurl + 'QualityControlAPI/DeleteQualityControlRecord', obj).error(function () {
        });
        return Response;
    };
    //=========================================================================================================================



});