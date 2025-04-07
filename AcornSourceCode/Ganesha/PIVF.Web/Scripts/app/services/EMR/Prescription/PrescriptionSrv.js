PIVF.service('PrescriptionSrv', function ($http, API) {

    //By Rohini For Item/Drugs  
    this.GetDrugList = function (UnitID) {
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/GetDrugList', {
            params: { UnitID: angular.toJson(UnitID)}
        }).error(function () {
        });
        return Response;
    }
    this.GetTemplateList = function () {
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/GetTemplateList').error(function () {
        });
        return Response;
    }
    this.FillFrequency = function () {
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/FillFrequency').error(function () {
        });
        return Response;
    }
    
    this.GetDrugDetailByItemID = function (ID, UnitID) {
        
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/GetDrugDetailByItemID', {
            params: { ID: angular.toJson(ID), UnitID: angular.toJson(UnitID) }
         
        }).error(function () {
            
        });
        return Response;
    }
    this.CheckIsFavMolecule = function (ID) {
        
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/CheckIsFavMolecule', {
            params: { ID: angular.toJson(ID) }

        }).error(function () {
            
        });
        return Response;
    }
    this.GetTodaysPrescriptionDetails = function () {
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/GetTodaysPrescriptionDetails').error(function () {
        });
        return Response;
    }
    this.GetPreviousPrescriptionDetails = function () {
        debugger;
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/GetPreviousPrescriptionDetails').error(function () {
        });
        return Response;
    }
    this.GetTemplateAndItems = function () {
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/GetTemplateAndItems').error(function () {
        });
        return Response;
    }
    this.SavePrescription = function (AddedDrugList) {
        debugger;
        
        var Response = $http({
            url: API.APIurl + 'PrescriptionAPI/SavePrescription',
            data: AddedDrugList,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.SaveFavDrug = function (AddedDrugList) {
        
        var Response = $http({
            url: API.APIurl + 'PrescriptionAPI/SaveFavDrug',
            data: AddedDrugList,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.DeleteFavDrug = function (FavDrug) {
        
        var Response = $http({
            url: API.APIurl + 'PrescriptionAPI/DeleteFavDrug',
            data: FavDrug,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    //Get Report
    this.GetReport = function (reportinfo) {
        var rdata = { "ReportInfo": reportinfo }
        var Response = $http({
            url: API.APIurl + 'PrescriptionAPI/ShowReport',
            //method: 'post',
            //data: rdata
            method: 'get',
            responseType:'arraybuffer'
        }).error(function () {
            
        });
        return Response;
    };
    this.CheckMoleculeIsAllergies = function (ID) {
        
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/CheckMoleculeIsAllergies', {
            params: { ID: angular.toJson(ID) }
        }).error(function () {
            
        });
        return Response;
    }
   
    //END

    this.getAllergyMolecules = function (UnitID) {
        var Response = $http.get(API.APIurl + 'PrescriptionAPI/getAllergyMolecules').error(function () {
        });
        return Response;
    }
});
