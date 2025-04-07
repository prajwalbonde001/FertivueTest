PIVF.service('StateService', function ($http, API) {
    //Code For GetData ;
    this.GetData = function () {
        //debugger;
        var Response = $http.get(API.url + 'State').error(function () {
            //debugger;
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    //Update Grid Data By Umesh
    this.Update = function (StateID, ObjData, StateObj) {
        //debugger;
        var Response = $http({
            //url: API.url + 'State(' + ID + ')',
            url: API.url + 'PutData(StateID=' + StateID + ',ChangedObject=' + '\'' + ObjData + '\'' + ')',
            data: StateObj,
            method: 'Put'
        }).error(function () {
            //debugger;
            //window.location = '/Error/CustomError';
        });
        return Response;
    };
    //Code For  Save Data
    this.Save = function (objData) {
        //debugger;
        var Response = $http({
            url: API.url + 'State',
            data: objData,
            method: 'post'
        }).error(function () {
            //debugger;
            //   window.location = '/Error/CustomError';
        });
        return Response;
    };
    //

});