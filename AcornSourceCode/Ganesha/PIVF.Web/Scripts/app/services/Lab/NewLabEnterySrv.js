PIVF.service('NewLabEnterySrv', function ($http, API) {

    this.GetPathoTestParameterList = function (PatientID, PatientUnitID, ServiceID, TestID, CategoryID) {
        debugger;
        var Response = $http.get(API.APIurl + 'NewLabEnteryAPI/GetPathoTestParameterList',
        {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, ServiceID: ServiceID, TestID: TestID, CategoryID: CategoryID }
        }).error(function () {
        });
        return Response;
    };

    this.GetLabEntryDetails = function ( OrderID,  DetailID,  OrderUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'NewLabEnteryAPI/GetLabEntryDetails',
        {
            params: { OrderID: OrderID, DetailID: DetailID, OrderUnitID: OrderUnitID }
        }
            ).error(function () {
        });
        return Response;
    };


    this.SaveLabEntery = function (NewLab) {

        var Response = $http({
            url: API.APIurl + '/NewLabEnteryAPI/SaveLabEntery',
            data: NewLab,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.getPatientList = function (NewLabList, index) {
        debugger;
        //        var Response = $http.post(API.APIurl + 'NewLabEnteryAPI/getPatientList', NewLabList).error(function () {
                
        //});
        //return Response;

        var Response = $http({
            url: API.APIurl + 'NewLabEnteryAPI/getPatientList',
            params: { index: index },      // After modified by Nayan Kamble on 04/02/2020   for session issue
            data: NewLabList,
            method: 'post'
        }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };



    //this.HelpValuesesEntryList = function (ParameterID) {
    //    var Response = $http.get(API.APIurl + 'NewLabEnteryAPI/HelpValuesesEntryList', ParameterID).error(function ()
    //    {
    //       // params: { parameterID: ParameterID}
    //        //  window.location = '/Error/CustomError';
    //    });
    //    return Response;
    //};


    this.HelpValuesesEntryList = function (ParameterID) {
        var Response = $http.get(API.APIurl + 'NewLabEnteryAPI/HelpValuesesEntryList', { params: { parameterID: ParameterID } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

});