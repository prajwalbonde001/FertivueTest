PIVF.service('OutcomeSrv', function ($http, API) {

    this.GetPregnancydate = function () {
        var Response = $http.get(API.APIurl + 'OutcomeAPI/GetPregnancydate').error(function (errr) {
            console.log(errr)
        });
        debugger;
        return Response;
    };

    this.SaveOutcome = function (obj) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'OutcomeAPI/SaveOutcome',
            data: obj,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };

    this.SaveBirthDetails = function (obj) {
        
        var Response = $http({
            url: API.APIurl + 'OutcomeAPI/SaveBirthDetails',
            data: obj,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };

    this.GetOutcomeDetails = function () {
        debugger;
        var Response = $http.get(API.APIurl + 'OutcomeAPI/GetOutcomeDetails').error(function () {
        });
        return Response;
    };

    this.GetETPregnancydate = function () {
        var Response = $http.get(API.APIurl + 'OutcomeAPI/GetETPregnancydate').error(function () {
        });
        return Response;
    }
    //Added by Nayan Kamble
    this.UnLinkSurrogate = function () {
        debugger;
        var Response = $http.get(API.APIurl + 'OutcomeAPI/UnLinkSurrogate').error(function () {
        });
        return Response;
    };
});