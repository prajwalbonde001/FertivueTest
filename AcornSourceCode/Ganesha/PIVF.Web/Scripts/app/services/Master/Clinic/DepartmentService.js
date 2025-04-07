
PIVF.service('DepartmentService', function ($http, API) {
    debugger;
    this.GetData = function () {
        debugger;
        var Response = $http.get(API.url + 'Department').error(function () {
            //debugger;
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
    
    //Update Grid Data By Rohinee H
    this.Save = function (objData) {
        debugger;
        var Response = $http({
            url: API.url + 'Department',
            data: objData,
            method: 'post'
        }).error(function () {
            //debugger;
            //   window.location = '/Error/CustomError';
        });
        return Response;
    };
    //
  
    this.Update = function (DeptID, ObjData,DepartmentObj) {
        debugger;
        var Response = $http({
            // url: API.url + 'Department(' + DeptID + ')',
            url: API.url + 'PutData(DeptID=' + DeptID + ',ChangedObject=' + '\'' + ObjData + '\'' + ')',
            data: DepartmentObj,
            method: 'Put'
        }).error(function () {
            //debugger;
            //window.location = '/Error/CustomError';
        });
        return Response;
    };
    
});