PIVF.service('MaleComplaintsService', function ($http, API) {

    this.SetAllControls = function () {
        
        var Response = $http.get(API.APIurl + 'MaleComplaints/LoadSpecificMaleComplaints').error(function () {
        });
        return Response;
    }

    this.PreviousFollowUpNotes = function () {
        // 
        var Response = $http.get(API.APIurl + 'MaleComplaints/PreviousFollowUpNotes').error(function () {
        });
        return Response;
    };

    this.SaveOrUpdateMaleComplaints = function (MaleComplaints) {
        debugger
        var Response = $http({
            url: API.APIurl + 'MaleComplaints/SaveOrUpdateMaleComplaints',
            data: MaleComplaints,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };
});