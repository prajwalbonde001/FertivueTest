angular.module('PIVF.designemr').service('DesignEMRSrv', function ($http, API) {


     this.GetAllDICOMStudies = function (RequestForm) {
        
        var Response = $http.get(API.APIurl + 'FollicularScan/GetAllDICOMStudies',{ params: {  RequestForm: RequestForm } }).error(function () {
        });
        return Response;
    }

    //By For EMR Front Grid 
    this.GetTemplate = function (TemplateName, GenderID, FormID,CurrentPage) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/GetTemplate', {
            params: {               
                TemplateName: TemplateName,
                GenderID: GenderID,
                FormID: FormID,
                CurrentPage: CurrentPage
            }
        }).error(function () {
        });
        return Response;
    }
    this.FillFormType = function (GenderID) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/FillFormType', {
            params: {    GenderID: GenderID   }
        }).error(function () {
        });
        return Response;
    }
    //End
    //By Save 
    this.SaveTemplate = function (DesignEMRVO) {      
        
        
        var Response = $http({
            url: API.APIurl + 'DesignEMRAPI/SaveTemplate',
           // data: formdata,
            data: DesignEMRVO,
            method: 'post',
            //transformRequest: angular.identity,
            //headers: {
            //    'Content-Type': JSON
            //}
        }).error(function () {
        });
        return Response;
    };
    this.SaveUpdateEMRTemplate = function (DesignEMRVO) {
        
        var Response = $http({
            url: API.APIurl + 'DesignEMRAPI/SaveUpdateEMRTemplate',
            data: DesignEMRVO,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    
   this.SaveUpdateCycleTemplate = function (DesignEMRVO) {
        
        var Response = $http({
            url: API.APIurl + 'DesignEMRAPI/SaveUpdateCycleTemplate',
            data: DesignEMRVO,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    //End
    //Get Data At View 
    this.GetTemplateByID = function (ID) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/GetTemplateByID', {
            params: {
                ID: angular.toJson(ID)               
            }
        }).error(function () {
        });
        return Response;
    }
    //TO GET ALL TEMPLATE GRID
    this.ListAllTemplateList = function (ID) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/ListAllTemplateList', {
            params: {
                ID: angular.toJson(ID)
            }
        }).error(function () {
        });
        return Response;
    }
     this.ListAllCycleTemplateList = function (ID) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/ListAllCycleTemplateList', {
            params: {
                ID: angular.toJson(ID)
            }
        }).error(function () {
        });
        return Response;
    }
    
    this.GetTemplateByFormID = function (ID,TempID, ObjCurrentUser) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/GetTemplateByFormID', {
            params: {
                ID: angular.toJson(ID),
                TempID: angular.toJson(TempID),
                ObjCurrentUser: ObjCurrentUser //ObjCurrentUser Added by AniketK on 19March2020
            }
        }).error(function () {
        });
        return Response;
    }
    this.GetTemplateData = function (ID,UnitID) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/GetTemplateData', {
            params: { ID: ID, UnitID:UnitID  }
        }).error(function () {
        });
        return Response;
    }
    
    this.DeleteTemplate = function (DesignEMRVO) {
        
        var Response = $http({
            url: API.APIurl + 'DesignEMRAPI/DeleteTemplate',
            data: DesignEMRVO,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.ActiveDeactiveSave = function (DesignEMRVO) {
        
        var Response = $http({
            url: API.APIurl + 'DesignEMRAPI/ActiveDeactiveSave',
            data: DesignEMRVO,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.ShowUploadedImages = function () {
        // 
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/ShowUploadedImages').error(function () {
        });
        return Response;
    };
    this.DeleteUploadedImages = function (clsPatientPhotoVO) {
        
        var Response = $http({
            url: API.APIurl + 'DesignEMRAPI/DeleteUploadedImages',
            data: clsPatientPhotoVO,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.GetSubtemplatesList = function (FormID) {

        var Response = $http({
            url: API.APIurl + 'DesignEMRAPI/GetSubtemplatesList',
            params: { FormID: FormID },
            method: 'get'
        }).error(function () {
        });
        return Response;
    }
    
});