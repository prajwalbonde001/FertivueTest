PIVF.service('RegistartionService', function ($http, API) {

    //this.saveUpdate = function (patient) {
    //    var Response = $http.post(API.APIurl + 'RegistrationAPI/saveUpdate', patient).error(function () {
    //    });
    //    return Response;
    //};


    this.saveUpdate = function saveUpdate(patient, OldDataValuepatient) {
        debugger;
        var response = $http({
            url: API.APIurl + 'RegistrationAPI/saveUpdate',
            data: patient,
            method: 'post'
       // }).success(function () {
        //    var response = $http({
        //        url: API.APIurl + 'RegistrationAPI/PatientAudit',
        //        data: OldDataValuepatient,
        //        method: 'post'
        //    }).error(function () {

        //    });    //commented by  sujata
        }).error(function () {
        });
        return response;
    };
    

    //this.getPatientList = function (patient) {
    //    var Response = $http.get(API.APIurl + 'RegistrationAPI/getPatientList', {params:{obj:patient}}).error(function () {
    //    });
    //    return Response;
    //};

    this.getPatientList = function (patient) {
        // debugger;
        var Response = $http({
            url: API.APIurl + 'RegistrationAPI/getPatientList',
            params: { searchParams: angular.toJson(patient) },
            method: 'GET'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.getPatientByID = function (id) {
        var Response = $http.get(API.APIurl + 'RegistrationAPI/getPatientByID', { params: { id: id } }).error(function () {
        });
        return Response;
    };

    this.getPatientInfo = function (id) {
        var Response = $http.get(API.APIurl + 'RegistrationAPI/getPatientInfo', { params: { id: id } }).error(function () {
        });
        return Response;
    };

    //this.updatePatientInfo = function (obj) {
    //    var Response = $http.post(API.APIurl + 'RegistrationAPI/updatePatientInfo', obj).error(function () {
    //    });
    //    return Response;
    //};


    this.updatePatientInfo = function updatePatientInfo(obj, OldDataValuepatientEdit) {
        var response = $http({
            url: API.APIurl + 'RegistrationAPI/updatePatientInfo',
            data: obj,
            method: 'post'
        }).success(function () {
            var response = $http({
                url: API.APIurl + 'RegistrationAPI/PatientAudit',
                data: OldDataValuepatientEdit,
                method: 'post'
            }).error(function () {

            });
        }).error(function () {
        });
        return response;
    };


    this.getPatientAddInfo = function (id) {
        var Response = $http.get(API.APIurl + 'RegistrationAPI/getPatientAddInfo', { params: { id: id } }).error(function () {
        });
        return Response;
    };

    this.updatePatientAddInfo = function (obj) {
        var Response = $http.post(API.APIurl + 'RegistrationAPI/updatePatientAddInfo', obj).error(function () {
        });
        return Response;
    };

    this.getPatientRefInfo = function (id) {
        var Response = $http.get(API.APIurl + 'RegistrationAPI/getPatientRefInfo', { params: { id: id } }).error(function () {
        });
        return Response;
    };

    this.updatePatientRefInfo = function (obj) {
        var Response = $http.post(API.APIurl + 'RegistrationAPI/updatePatientRefInfo', obj).error(function () {
        });
        return Response;
    };

    this.getAddress = function (id, isOthr) {
        var Response = $http.get(API.APIurl + 'RegistrationAPI/getAddress', { params: { id: id, isOthr: isOthr } }).error(function () {
        });
        return Response;
    };

    this.updateAddress = function (obj) {
        var Response = $http.post(API.APIurl + 'RegistrationAPI/updateAddress', obj).error(function () {
        });
        return Response;
    };

    this.updatePhoto = function (id, unitid, photo, filename) {
        var data = [];
        data.push(id.toString()); data.push(unitid.toString()); data.push(photo); data.push(filename);
        var Response = $http.post(API.APIurl + 'RegistrationAPI/updatePhoto', data).error(function () {
        });
        return Response;
    };

    this.updateAttachment = function (id, unitid, photo, filename) {
        var data = [];
        data.push(id.toString()); data.push(unitid.toString()); data.push(photo); data.push(filename);
        var Response = $http.post(API.APIurl + 'RegistrationAPI/updateAttachment', data).error(function () {
        });
        return Response;
    };

    // Insert patient details service function
    this.InsertUpdateBankDetails = function (PatientRegistration) {
        //debugger;

        var Response = $http.post(API.APIurl + 'RegistrationAPI/InsertUpdateBankDetails', PatientRegistration).error(function () {
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
        var Response = $http.get(API.APIurl + 'RegistrationAPI/GetBankInformation', { params: { id: id, UnitID: UnitID } }).error(function () {
        });
        return Response;
    };


})