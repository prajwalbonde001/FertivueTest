PIVF.service('AppointmentService', function ($http, API , $uibModal) {

    //GET Methods Of Patient Appointment Events By Ikram on 24/02/2017

    this.GetData = function (enteredDate, DOCID, DeptID, UnitID) {
        var Response = $http.get(API.url + 'GetDoctorAppointment', { params: { enteredDate: enteredDate, DOCID: DOCID, DeptID: DeptID, UnitID: UnitID } }).error(function () {
        });
        debugger;
        return Response;
    };

    this.GetCityAndClinicNames = function (status) {
        var Response = $http.get(API.url + 'GetCityAndClinicNames', { params: { status: status } }).error(function () {
        });
        return Response;
    };

    this.GetAppointmentStatus = function () {
        debugger;
        var Response = $http.get(API.url + 'GetAppointmentStatus').error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetPatientVisitList = function (status) {
        var Response = $http.get(API.url + 'GetPatientVisitList', { params: { status: status } }).error(function () {
        });
        return Response;
    };

    this.GetSearchItemData = function (searchItem) {
        debugger;
        var Response = $http.get(API.url + 'GetSearchItemData', { params: { searchItem: searchItem } }).error(function () {
        });
        return Response;
    }

    this.DeleteCurrentEvent = function (title, startsAt, endsAt, status, ReasonForCancellation,serverTimeZone) {
        var Response = $http.get(API.url + 'DeleteCurrentEvent', { params: { title: title, startsAt: startsAt, endsAt: endsAt, status: status, ReasonForCancellation: ReasonForCancellation, serverTimeZone :serverTimeZone } }).error(function () {
        });
        return Response;
    }

    this.EditCurrentEvent = function (editedPatientFirstName, editedPatientMiddleName, editedPatientLastName, startsAt, endsAt, newStartTime, newEndTime, doctorFirstName, doctorMiddleName, doctorLastName, departmentId, genderId, visitId, mobileConId, mobileNo, remarks, mrNo,serverTimeZone) {
        var Response = $http.get(API.url + 'EditCurrentEvent', { params: { editedPatientFirstName: editedPatientFirstName, editedPatientMiddleName: editedPatientMiddleName, editedPatientLastName: editedPatientLastName, startsAt: startsAt, endsAt: endsAt, newStartTime: newStartTime, newEndTime: newEndTime, doctorFirstName: doctorFirstName, doctorMiddleName: doctorMiddleName, doctorLastName: doctorLastName, departmentId: departmentId, genderId: genderId, visitId: visitId, mobileConId: mobileConId, mobileNo: mobileNo, remarks: remarks, mrNo: mrNo, timedifference : timedifference,serverTimeZone:serverTimeZone } }).error(function () {
        });
        return Response;
    }

    this.AddNewAppointment = function (startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName, docStartTime, docEndTime, patientFirstName, patientMiddleName, patientLastName, departmentId, patientGenderId, patientselectedCountry, patientMobileNumber, patientVisitId, remarks, selectedMRNo, DOB, AppointmenUnitName, RegID, RegUnitID,serverTimeZone) {
       
         console.log(">>>>>>>>>>>>>>>>>> DOB" , DOB , patientselectedCountry )

         var Response = $http.get(API.url + 'AddNewAppointment', { params: { startDate: startDate, endDate: endDate, doctorFirstName: doctorFirstName, doctorMiddleName: doctorMiddleName, doctorLastName: doctorLastName, docStartTime: docStartTime, docEndTime: docEndTime, patientFirstName: patientFirstName, patientMiddleName: patientMiddleName, patientLastName: patientLastName, departmentId: departmentId, patientGenderId: patientGenderId, patientselectedCountry: patientselectedCountry, patientMobileNumber: patientMobileNumber, patientVisitId: patientVisitId, remarks: remarks, selectedMRNo: selectedMRNo, DOB: DOB, AppointmenUnitName: AppointmenUnitName, RegID: RegID, RegUnitID: RegUnitID, serverTimeZone:serverTimeZone } }).error(function () {
        });
        return Response;
    }

    this.GetAvailableAppointmentSlots = function (startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName) {
        debugger;
        var Response = $http.get(API.url + 'GetAvailableAppointmentSlots', { params: { startDate: startDate, endDate: endDate, doctorFirstName: doctorFirstName, doctorMiddleName: doctorMiddleName, doctorLastName: doctorLastName } }).error(function () {
        });
        return Response;
    }


    this.GetAvailableAppointmentSlotsModified = function (AppInputList) {
        debugger;
      
        //var Response = $http.post(API.APIurl + 'Schedule/GetAvailableAppointmentSlotsModified', AppInputList).error(function () {
        //}).error(function () {
        //});
        //return Response;
       
        var Response = $http({
            url: API.APIurl + 'RegistrationAPI/GetAvailableAppointmentSlotsModified',
            data: AppInputList,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    }


    this.RescheduleCurrentEvent = function (selectedSlotStartTime, selectedSlotEndTime, patientFirstName, patientLastName, patientMobileNumber, isRescheduleCall, remark, DOCID, DeptID, APPID, UnitID, AppReasonID,serverTimeZone) {
        debugger;
        var Response = $http.get(API.url + 'RescheduleAppointment', { params: { selectedSlotStartTime: selectedSlotStartTime, selectedSlotEndTime: selectedSlotEndTime, patientFirstName: patientFirstName, patientLastName: patientLastName, patientMobileNumber: patientMobileNumber, isRescheduleCall: isRescheduleCall, remark: remark, DOCID: DOCID, DeptID: DeptID, APPID: APPID, RescheduleUnitID: UnitID, AppReasonID: AppReasonID, serverTimeZone:serverTimeZone } }).error(function () {
        });
        return Response;
    }

    this.LoadAllAppointments = function (Filter) {

        var Response = $http.get(API.url + 'LoadAllAppointments').error(function () {
        }).error(function () {
        });
        return Response;
    };

    this.SearchAppointments = function (AppDate, Name, DeptID, DoctID, MRNo, MobileNo, SRegID, AppTypeID, AppStatusID, FromDate, ToDate, PageIndex) {
        var Response = $http.get(API.url + 'SearchAppointments', {
            params: {
                AppDate: AppDate, Name: Name, DeptID: DeptID, DoctID: DoctID,
                MRNo: MRNo, MobileNo: MobileNo, SRegID: SRegID, AppTypeID: AppTypeID,
                AppStatusID: AppStatusID, FromDate: FromDate, ToDate: ToDate, PageIndex: PageIndex
            }
        }).error(function () {
        });
        return Response;
    };

    this.GetSpecialRegistrationMasterList = function (Filter, IsSelect) {
        var Response = $http.get(API.url + 'GetSpecialRegistrationMasterList', { params: { Filter: Filter, IsSelect: IsSelect, '$select': 'SRegID,Description' } }).error(function () {
        }).error(function () {
        });
        return Response;
    };

    this.GetPatientGenderList = function () {
        debugger;
        var Response = $http.get(API.url + 'GetGenderList', { params: { IsListing: false, '$select': 'GenderId,GenderDescription' } }).error(function () {
        });
        return Response;
    };





/*--------------------------------------------------------------------------------*/


    this.openAppointmentPopUp = function () {

        return $uibModal.open({
            templateUrl: 'addNewAppointmentPopUp',
            controller: 'NewAppointmentController',
            size: '',
            windowClass: 'custom-xl-modal',
        }).result.then(
            function (result) {
                return result;
            },
            function () {
                console.log('Modal dismissed.');
            }
        );
    };


});