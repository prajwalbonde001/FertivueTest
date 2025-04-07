PIVF.service('FemaleComplaintsService', function ($http, API) {

    this.SetAllControls = function () {
        
        var Response = $http.get(API.APIurl + 'FemaleComplaints/LoadSpecificFemaleComplaints').error(function () {
        });
        return Response;
    }

    this.PreviousFollowUpNotes = function () {
        // 
        var Response = $http.get(API.APIurl + 'FemaleComplaints/PreviousFollowUpNotes').error(function () {
        });
        return Response;
    };

    this.GetLatestLMP = function () {
        // 
        var Response = $http.get(API.APIurl + 'FemaleComplaints/GetLatestLMP').error(function () {
        });
        return Response;
    };

    this.SaveOrUpdateFemaleComplaints = function (FemaleComplaints) {
        
        var Response = $http({
            url: API.APIurl + 'FemaleComplaints/SaveOrUpdateFemaleComplaints',
            data: FemaleComplaints,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };
});