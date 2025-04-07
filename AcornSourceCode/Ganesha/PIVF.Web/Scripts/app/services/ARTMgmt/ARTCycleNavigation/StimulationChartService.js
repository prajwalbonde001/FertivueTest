PIVF.service('StimulationChartService', function ($http, API) {

    this.SetLandingPageControls = function () {
        
        var Response = $http.get(API.APIurl + 'StimulationChart/SetLandingPageControls').error(function () {
        });
        return Response;
    }

    this.GetStimulationChartSizeDetails = function () {
        
        var Response = $http.get(API.APIurl + 'StimulationChart/GetStimulationChartSizeDetails').error(function () {
        });
        return Response;
    }

    this.SaveUpdateStimulationChart = function (StimulationChart) {
        debugger
        var Response = $http({
            url: API.APIurl + 'StimulationChart/SaveUpdateStimulationChart',
            data: StimulationChart,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    }

    this.DeleteDrugWithReason = function (DrugID, StimulationID, Reason) {
        
        var Response = $http.get(API.APIurl + 'StimulationChart/DeleteDrugWithReason', { params: { DrugID: DrugID, StimulationID: StimulationID, Reason: Reason } }).error(function () {
        });
        return Response;
    }

    this.GetRIPSV = function (Date, Size) {

        var Response = $http.get(API.APIurl + 'StimulationChart/GetRIPSV', { params: { Date: Date, Size: Size } }).error(function () {
        });
        return Response;
    }
    this.GetGraphData = function () {

        var Response = $http.get(API.APIurl + 'StimulationChart/GetGraphData').error(function () {
        });
        return Response;
    }
});