PIVF.service('ConvertToDonorSrv', function ($http, API) {
    this.GetPatientList = function (PageIndex ,NameCodeMRNo) {
        debugger;
        var Response = $http.get(API.APIurl + 'ConvertToDonorAPI/GetPatientList',
            {
                params: { PageIndex: PageIndex, NameCodeMRNo: NameCodeMRNo}

            }).error(function () {
            });
        return Response;
    };
    this.ConvertToDonor = function (PatientID, GenderID) {
        debugger;
        var Response = $http.get(API.APIurl + 'ConvertToDonorAPI/ConvertToDonorPatient',
            {
                params: { PatientID: PatientID, GenderID: GenderID }
            }).error(function () {
            });
        return Response;
    };
});