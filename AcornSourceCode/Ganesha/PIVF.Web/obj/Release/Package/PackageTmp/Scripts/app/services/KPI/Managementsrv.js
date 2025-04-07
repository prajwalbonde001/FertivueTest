PIVF.service('ManagementSrv', function ($http, API) {

    this.ClinicWise = function (FromDate, ToDate, UnitId) {
        var Response = $http.get(API.APIurl + 'Management/ClinicWise', { params: { FromDate: FromDate, ToDate: ToDate, UnitId: UnitId } }).error(function () {
        });
        return Response;
    };
    this.cumulativeCases = function (FromDate, ToDate) {
        var Response = $http.get(API.APIurl + 'Management/cumulativeCases', { params: { FromDate: FromDate, ToDate: ToDate } }).error(function () {
        });
        return Response;
    };
    this.OverallSuccessRate = function (FromDate, ToDate) {
        var Response = $http.get(API.APIurl + 'Management/OverallSuccessRate', { params: { FromDate: FromDate, ToDate: ToDate } }).error(function () {
        });
        return Response;
    };

    this.DoctorWise = function (FromDate, ToDate) {
        var Response = $http.get(API.APIurl + 'Management/DoctorWise', { params: { FromDate: FromDate, ToDate: ToDate } }).error(function () {
        });
        return Response;
    };
    this.ManagementPDF = function (Obj, Action) {
        if (Action == 'CumulativeCase') {
            var Response = $http({
                url: API.APIurl + 'Management/ManagementCumulativeCasePDF',
                data: Obj,
                method: 'post'
            }).error(function () {
                
            });

            return Response;
        }
    
   
     
       
    };

    this.ManagementPDFImage = function (Obj, ReportType) {
        if (ReportType == 2)
        {
            var Response = $http({
                url: API.APIurl + 'Management/ManagementPDFImage',
                data: Obj,
                method: 'post'
            }).error(function () {

            });

            return Response;
        }
        else if (ReportType == 4) {
            var Response = $http({
                url: API.APIurl + 'Management/ManagementPDFImage4',
                data: Obj,
                method: 'post'
            }).error(function () {

            });

            return Response;
        }
        else if (ReportType == 6) {
            var Response = $http({
                url: API.APIurl + 'Management/ManagementPDFImage6',
                data: Obj,
                method: 'post'
            }).error(function () {

            });

            return Response;
        }
         
        
    };
    this.ManagementPDFClinicWise = function (Obj) {
      
            var Response = $http({
                url: API.APIurl + 'Management/ManagementPDFClinicWise',
                data: Obj,
                method: 'post'
            }).error(function () {

            });

            return Response;
    };
    this.ManagementPDFDoctorWise = function (Obj) {

        var Response = $http({
            url: API.APIurl + 'Management/ManagementPDFDoctorWise',
            data: Obj,
            method: 'post'
        }).error(function () {

        });

        return Response;
    };




})