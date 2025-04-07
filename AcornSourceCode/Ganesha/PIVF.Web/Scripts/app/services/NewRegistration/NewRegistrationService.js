PIVF.service('NewRegistrationService', function ($http, API) {
    debugger;
   

    this.saveUpdate = function saveUpdate(patient) {
        debugger;
        var response = $http({
            url: API.APIurl + 'NewRegistrationAPI/saveUpdate',
            data: patient,
            method: 'post'
        }).error(function () {
        });
        return response;
    };

    this.getPatientList = function (patient) {
         debugger;
        var Response = $http({
            url: API.APIurl + 'NewRegistrationAPI/getPatientList',
            params: { searchParams: angular.toJson(patient) },
            method: 'GET'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

  this.CheckExistingPatientDuplicacy = function (obj) {
        debugger;
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/CheckExistingPatientDuplicacy', obj).error(function () {
        });
        return Response;
    };


  

    //this.getPatientByID = function (id) {
    //    var Response = $http.get(API.APIurl + 'NewRegistrationAPI/getPatientByID', { params: { id: id } }).error(function () {
    //    });
    //    return Response;
    //};MobileNo

    this.getPatientByID = function (obj) {
        debugger;
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/getPatientByID', obj).error(function () {
        });
        return Response;
    };

    this.getPatientInfo = function (id) {
        var Response = $http.get(API.APIurl + 'NewRegistrationAPI/getPatientInfo', { params: { id: id } }).error(function () {
        });
        return Response;
    };

    this.getPatientSpouseInfo = function (id) {
        debugger;
        var Response = $http.get(API.APIurl + 'NewRegistrationAPI/getPatientSpouseInfo', { params: { id: id } }).error(function () {
        });
        return Response;
    };

    this.updatePatientInfo = function updatePatientInfo(obj, OldDataValuepatientEdit) {
        var response = $http({
            url: API.APIurl + 'NewRegistrationAPI/updatePatientInfo',
            data: obj,
            method: 'post'
        }).success(function () {
            var response = $http({
                url: API.APIurl + 'NewRegistrationAPI/PatientAudit',
                data: OldDataValuepatientEdit,
                method: 'post'
            }).error(function () {

            });
        }).error(function () {
        });
        return response;
    };

    this.getPatientAddInfo = function (id) {
        var Response = $http.get(API.APIurl + 'NewRegistrationAPI/getPatientAddInfo', { params: { id: id } }).error(function () {
        });
        return Response;
    };

    this.updatePatientAddInfo = function (obj) {
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/updatePatientAddInfo', obj).error(function () {
        });
        return Response;
    };

    //this.getPatientRefInfo = function (id) {
    //    debugger;
    //    var Response = $http.get(API.APIurl + 'NewRegistrationAPI/getPatientRefInfo', { params: { id: id } }).error(function () {
    //    });
    //    return Response;                                                                                                                                                                                                                                                                                                                                                                                                          
    //};
    this.getPatientRefInfo = function (id) {
        var Response = $http.get(API.APIurl + 'NewRegistrationAPI/getPatientRefInfo', { params: { id: id } }).error(function () {
        });
        return Response;
    };

    this.updatePatientRefInfo = function (obj) {
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/updatePatientRefInfo', obj).error(function () {
        });
        return Response;
    };

    this.getAddress = function (id, isOthr) {
        var Response = $http.get(API.APIurl + 'NewRegistrationAPI/getAddress', { params: { id: id, isOthr: isOthr } }).error(function () {
        });
        return Response;
    };

    this.updateAddress = function (obj) {
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/updateAddress', obj).error(function () {
        });
        return Response;
    };

    this.updatePhoto = function (id, unitid, photo, filename,genderid) {
        var data = [];
        data.push(id.toString()); data.push(unitid.toString()); data.push(photo); data.push(filename); data.push(genderid.toString());
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/updatePhoto', data).error(function () {
        });
        return Response;
    };

    this.updateAttachment = function (id, unitid, photo, filename, genderid) {
        var data = [];
        data.push(id.toString()); data.push(unitid.toString()); data.push(photo); data.push(filename); data.push(genderid.toString());
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/updateAttachment', data).error(function () {
        });
        return Response;
    };

    this.viewAttachment = function (obj) {
        debugger;
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/viewAttachment', obj).error(function () {
        });
        return Response;
    };

    // Insert patient details service function
    this.InsertUpdateBankDetails = function (PatientRegistration) {
        //debugger;

        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/InsertUpdateBankDetails', PatientRegistration).error(function () {
        });
        return Response;
        //var Response = $http({
        //    url: API.url + 'RegistrationAPI/InsertUpdateBankDetails',
        //    data: PatientRegistration,
        //}).error(function () {

        //    //window.location = '/Error/CustomError';
        //});
        //return Response;
    };

    this.GetBankInformation = function (id, UnitID) {
        var Response = $http.get(API.APIurl + 'NewRegistrationAPI/GetBankInformation', { params: { id: id, UnitID: UnitID } }).error(function () {
        });
        return Response;
    };

    this.deletePhoto = function (id, unitid) {  //, photo, filename
        debugger;
        var data = [];
        data.push(id.toString()); data.push(unitid.toString()); //  data.push(photo); data.push(filename); 
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/deletePhoto', data).error(function () {
        });
        return Response;
    };

    this.SavePersonalCharacteristics = function (data) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'NewRegistrationAPI/SavePatientPersonalCharacteristics',
            data: data,
            method: 'post'
        }).error(function () {
        });
        return Response;
        
    };

    //this.GetPersonalCharacteristics = function (data) {
    //    debugger;
    //    var Response = $http({
    //        url: API.APIurl + 'NewRegistrationAPI/GetPatientPersonalCharacteristics',
    //        data: data,
    //        method: 'post'
    //    }).error(function () {
    //    });
    //    return Response;

    //};
 


    this.GetPersonalCharacteristics = function (data) {
        debugger;
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/GetPatientPersonalCharacteristics', data).error(function () {
        });
        return Response;
    };
    this.GetPatientAdditional = function (data) {
        debugger;
        var Response = $http.post(API.APIurl + 'NewRegistrationAPI/GetPatientPersonalCharacteristics', data).error(function () {
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
    this.GetTemplateData = function (ID,UnitID) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/GetTemplateData', {
            params: { ID: ID, UnitID:UnitID  }
        }).error(function () {
        });
        return Response;
    }
      this.ListAllTemplateList = function (ID) {
        
        var Response = $http.get(API.APIurl + 'DesignEMRAPI/ListAllTemplateList', {
            params: {
                ID: angular.toJson(ID)
            }
        }).error(function () {
        });
        return Response;
    }
    
    this.GetTemplateByFormID = function (ID) {
              

        var Response = $http.get(API.APIurl + 'DesignEMRAPI/GetTemplateByFormID', {
            params: {
                ID: angular.toJson(ID),
                TempID : 0,
            }
        }).error(function () {
        });
        return Response;
        } 

});