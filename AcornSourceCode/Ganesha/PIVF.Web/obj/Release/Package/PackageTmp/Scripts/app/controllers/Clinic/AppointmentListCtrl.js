
angular.module('PIVF').controller('AppointmentListCtrl', ['$scope',  '$uibModal', '$rootScope', 'AppointmentService', 'DoctorService', 'srvCommon', 'UserService', '$location', 'QueueService', 'Common', '$rootScope', 'AlertMessage', 'swalMessages', '$filter', 'usSpinnerService', 'localStorageService', function ($scope, $uibModal , $rootScope, AppointmentService, DoctorService, srvCommon, UserService, $location, QueueService, Common, $rootScope, AlertMessage, swalMessages, $filter, usSpinnerService, localStorageService ) {

    $scope.IsNormalSearch = false;
    $scope.IsNormalSearchPrint = true;
    //$scope.Appointment.DocID = 0;
    $scope.CurrentPage = 1;
    $scope.Appointment = {}  
    $scope.NewAppointment = {};
    $scope.doctorsAvailableSlotsList = [];
    $scope.rescheduleMessageAcknoledgement = "";
    $scope.isModalSearch = false;
    $scope.IsShowLoadButton = false;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $rootScope.FormName = 'Appointment List';
    $scope.Appointment.FromDate = new Date();
    $scope.Appointment.ToDate = new Date();
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    $rootScope.MarkVisitData = {};
    $scope.Appointment.AppointmentDate = new Date();
    $scope.popup1 = {
        opened: false
    };
    //usSpinnerService.spin('GridSpinner');
    $scope.open1 = function () {
        debugger;
        $scope.popup1.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.open2 = function () {
        debugger;
        $scope.popup2.opened = true;
    };

    $scope.popup3 = {
        opened: false
    };
    $scope.open3 = function () {
        debugger;
        $scope.popup3.opened = true;
    };


    $scope.popup4 = {
        opened: false
    };

    $scope.open4 = function () {
        debugger;
        $scope.popup4.opened = true;
    };


    $scope.popup5 = {
        opened: false
    };

    $scope.open5 = function () {
        debugger;
        $scope.popup5.opened = true;
    };

    //Appointment Date Picker
    $scope.appointmentdateOption = {
        formatYear: 'yy',
        maxDate: new Date('2099, 12, 01'),
        minDate: new Date('2000, 12, 01'), //Temp code for testing
        startingDay: 1,
        showWeeks: false
    };

    //Start Date Picker
    $scope.startdateOption = {
        formatYear: 'yy',
        maxDate: null,
        minDate: null, //Temp code for testing  
        startingDay: 1,
        showWeeks: false
    };

    //End Date Picker
    $scope.enddateOption = {
        formatYear: 'yy',
        maxDate: null,
        minDate: null, //Temp code for testing
        startingDay: 1,
        showWeeks: false
    };


    /*------------------------------------------------------------------------------------*/


    // Watch for changes in fromDate to update toDate's minDate
$scope.$watch('Appointment.FromDate', function (newValue) {
    if (newValue) {
        $scope.enddateOption.minDate = new Date(newValue); // Set minDate for toDate picker
    } else {
        $scope.enddateOption.minDate = null; // Reset minDate if fromDate is cleared
    }
});


// Watch for changes in toDate to update fromDate's maxDate
$scope.$watch('Appointment.ToDate', function (newValue) {
    if (newValue) {
        $scope.startdateOption.maxDate = new Date(newValue); // Set maxDate for fromDate picker
    } else {
        $scope.startdateOption.maxDate = null; // Reset maxDate if toDate is cleared
    }
});












    /*-------------------------------------------------------------------------------------------*/

    //New Appointment Registered patient pop up
    $scope.newAppointmentModaldateOption = {
        formatYear: 'yy',
        maxDate: new Date('2099, 12, 01'),
        minDate: new Date(), //Temp code for testing
        startingDay: 1,
        showWeeks: false
    };

    //New Appointment non Registered patient pop up
    $scope.newAppointmentNonRegModaldateOption = {
        formatYear: 'yy',
        maxDate: new Date('2099, 12, 01'),
        minDate: new Date(), //Temp code for testing
        startingDay: 1,
        showWeeks: false
    };

    //Countries for Registration Page

    $scope.getCountryList = function () {
        var ResponseData = Common.GetCountryList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { CountryID: 0, CountryName: "Select" });
            debugger;
            $scope.CountryList = Response.data;
        }, function (error) {
        });
    }

/*---------------------------------------------------Book Appointment FromList---------------------------------------------*/

    $scope.openAppointmentPopup = function () {
        AppointmentService.openAppointmentPopUp().then(function (result) {
            console.log('Modal Result:', result);
              if(result){
               //  $scope.LoadAllAppointments();
                if ($scope.IsNormalSearch)
                {
                    $scope.NormalSearch($scope.Appointment);
                }
                else {
                    $scope.AdvanceSearch($scope.Appointment);
                }
                 AlertMessage.success(objResource.msgTitle, objResource.msgAppointmentAddedSuccessfully);
             }
           
        });

    };



/*---------------------------------------------------------------------------------------------------------------------*/


    //To load appointment like Calender in appointment List

    $scope.GetAppointmentDetails = function GetAppointmentDetails(Appointment) {
        debugger;
        $scope.doctors = [];
        var startDate = new Date(1900, 01, 01);
        if (angular.isUndefined(Appointment.AppointmentDate) || Appointment.AppointmentDate == '')
            Appointment.AppointmentDate = startDate;

        if (angular.isUndefined(Appointment.UnitID) || Appointment.UnitID == "")
            var UnitID = 0
        else
            var UnitID = Appointment.UnitID;
        if (angular.isUndefined(Appointment.DeptID) || Appointment.DeptID == "")
            var DeptID = 0;
        else
            var DeptID = Appointment.DeptID;
        if (angular.isUndefined(Appointment.DOCID) || Appointment.DOCID == "")
            var DOCID = 0
        else
            var DOCID = Appointment.DOCID;

        var enteredDate = moment(Appointment.AppointmentDate).add(1, 'day').toDate();
        // vm.changedViewDate = moment(Appointment.AppointmentDate).format('DD MMM YYYY');

        $scope.searchedDateDayId = enteredDate.getDay();

        if ($scope.searchedDateDayId === 0) {
            $scope.searchedDateDayId = 7;
        }

        // var responseData = AppointmentService.GetData(enteredDate, DOCID, DeptID, UnitID);
        var responseData = AppointmentService.GetData(enteredDate, DOCID, DeptID, UnitID);
        responseData.then(function (Response) {
            debugger;
            $scope.AppointmentDetails = Response.data.value;

            angular.forEach($scope.AppointmentDetails, function (item) {
                var IsValid = false;
              
                if (new Date($filter('date')(item.AppointmentDate, 'dd-MMM-yyyy')).getTime() == new Date($filter('date')(new Date(), 'dd-MMM-yyyy')).getTime()) {
                    if (item.Iscancel) {
                        item.IsCheckIn = false;
                    } else {
                        item.IsCheckIn = true;
                    }
                }
                else {
                    item.IsCheckIn = false;

                }
                if (item.Iscancel)
                {
                    item.CheckIsLapased = true;
                }else {
                    
                    var Today = moment(new Date()).format('DD MMM, YYYY');
                    var Today = $filter('date')(new Date(), 'dd-MMM-yyyy');
                    var FromTime = $filter('date')(new Date(), 'HH:mm');
                    if (new Date(item.AppointmentDate).getTime() >= new Date().getTime()) {
                        debugger;
                        if ($filter('date')(item.AppointmentDate, 'dd-MMM-yyyy') == Today || new Date(item.AppointmentDate).getTime() >= new Date().getTime()) {
                            var now = new Date();
                            var d = new Date(item.FromTime);
                            if (now.getTime() < d.getTime()) {
                                IsValid = true;
                                item.CheckIsLapased = IsValid;
                            }
                        }
                    }
                }
           
                

                //  return IsValid;
            });
      
            angular.forEach($scope.AppointmentDetails, function (obj) {
                $scope.DayId = obj.DayID;
                $scope.DoctorInterval = obj.DoctorInterval;

                $scope.StartTime = obj.StartTime;
                $scope.EndTime = obj.EndTime;

                if ($scope.DayId == $scope.searchedDateDayId) {
                    flag = false;
                    $scope.startTimeVariable = obj.PatientAppStartTime;
                    $scope.endTimeVariable = obj.PatientAppEndTime;

                    $scope.appointmentStartYear = $scope.startTimeVariable.slice(0, 4);
                    $scope.appointmentStartMonth = $scope.startTimeVariable.slice(5, 7);
                    $scope.appointmentStartDate = $scope.startTimeVariable.slice(8, 10);
                    $scope.appointmentStartHour = $scope.startTimeVariable.slice(11, 13);
                    $scope.appointmentStartMinute = $scope.startTimeVariable.slice(14, 16);
                    $scope.appointmentStartSecond = $scope.startTimeVariable.slice(17, 19);

                    $scope.appointmentEndYear = $scope.endTimeVariable.slice(0, 4);
                    $scope.appointmentEndMonth = $scope.endTimeVariable.slice(5, 7);
                    $scope.appointmentEndDate = $scope.endTimeVariable.slice(8, 10);
                    $scope.appointmentEndHour = $scope.endTimeVariable.substring(11, 13);
                    $scope.appointmentEndMinute = $scope.endTimeVariable.substring(14, 16);
                    $scope.appointmentEndSecond = $scope.endTimeVariable.substring(17, 19);

                    for (var j = 0 ; j < $scope.doctors.length ; j++) {
                        var PatientFullName = obj.PatientFirstName + ' ' + obj.PatientMiddleName + ' ' + obj.PatientLastName;
                        var res = obj.PatientFirstName + ' ' + obj.PatientLastName;
                        if ($scope.doctors[j].FirstName === obj.FirstName && $scope.doctors[j].LastName === obj.LastName) {
                            flag = true;
                            $scope.doctors[j].events.push({
                                title: PatientFullName,
                                startsAt: moment().year($scope.appointmentStartYear).month($scope.appointmentStartMonth - 1).date($scope.appointmentStartDate).hour($scope.appointmentStartHour).minute($scope.appointmentStartMinute).second($scope.appointmentStartSecond).toDate(),
                                endsAt: moment().year($scope.appointmentEndYear).month($scope.appointmentEndMonth - 1).date($scope.appointmentEndDate).hour($scope.appointmentEndHour).minute($scope.appointmentEndMinute).second($scope.appointmentEndSecond).toDate(),
                                color: calendarConfig.colorTypes.important,
                                draggable: true,
                                resizable: true,
                                isCancelled: obj.IsCancelled,
                                //  actions: actions,
                                StartTime: obj.StartTime,
                                EndTime: obj.EndTime
                            });
                        }
                    }

                    if (!flag) {
                        var PatientFullName = obj.PatientFirstName + ' ' + obj.PatientMiddleName + ' ' + obj.PatientLastName;
                        $scope.doctors.push({
                            FirstName: obj.FirstName,
                            MiddleName: obj.MiddleName,
                            LastName: obj.LastName,
                            StartTime: obj.StartTime,
                            EndTime: obj.EndTime,
                            DoctorCategory: obj.DoctorCategory,
                            Specialization: obj.Specialization,
                            SubSpecialization: obj.SubSpecialization,
                            Department: obj.Department,
                            DepartmentId: obj.DepartmentId,
                            UnitName: obj.UnitName,
                            events: [{
                                title: PatientFullName,
                                startsAt: moment().year($scope.appointmentStartYear).month($scope.appointmentStartMonth - 1).date($scope.appointmentStartDate).hour($scope.appointmentStartHour).minute($scope.appointmentStartMinute).second($scope.appointmentStartSecond).toDate(),
                                endsAt: moment().year($scope.appointmentEndYear).month($scope.appointmentEndMonth - 1).date($scope.appointmentEndDate).hour($scope.appointmentEndHour).minute($scope.appointmentEndMinute).second($scope.appointmentEndSecond).toDate(),
                                color: calendarConfig.colorTypes.important,
                                draggable: true,
                                resizable: true,
                                isCancelled: obj.IsCancelled,
                                // actions: actions,
                                StartTime: obj.StartTime,
                                EndTime: obj.EndTime
                            }]
                        });
                    }
                }

            });

        }, function (error) {
            // AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Page Change Functionality
    $scope.pageChange = function PageChange() {
        debugger;
        if ($scope.IsNormalSearch)
                {
                    $scope.NormalSearch($scope.Appointment);
                }
                else {
                    $scope.AdvanceSearch($scope.Appointment);
                }

    }

    //To load all appointment on load controller
    $scope.LoadAllAppointments = function LoadAllAppointments() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = AppointmentService.LoadAllAppointments();
        responseData.then(function (Response) {
            debugger;
           
            if (Response.data.value.length > 0) {
                $scope.AppointmentDetails = Response.data.value;
                angular.forEach($scope.AppointmentDetails, function (item) {
                    var IsValid = false;
                    if (new Date($filter('date')(item.AppointmentDate, 'dd-MMM-yyyy')).getTime() == new Date($filter('date')(new Date(), 'dd-MMM-yyyy')).getTime()) {
                        if (item.Iscancel) {
                            item.IsCheckIn = false;
                        }
                        else if (item.AppTypeDescription == "Turned Up") {
                            item.IsCheckIn = false;
                        }
                        else {
                            item.IsCheckIn = true;
                        }
                    }
                    else {
                        item.IsCheckIn = false;

                    }
                    if (item.Iscancel) {
                        item.CheckIsLapased = true;
                    } else {

                        var Today = moment(new Date()).format('DD MMM, YYYY');
                        var Today = $filter('date')(new Date(), 'dd-MMM-yyyy');
                        var FromTime = $filter('date')(new Date(), 'HH:mm');
                        if (new Date(item.AppointmentDate).getTime() >= new Date().getTime()) {
                            debugger;
                            if ($filter('date')(item.AppointmentDate, 'dd-MMM-yyyy') == Today || new Date(item.AppointmentDate).getTime() >= new Date().getTime()) {
                                var now = new Date();
                                var d = new Date(item.FromTime);
                                if (now.getTime() < d.getTime()) {
                                    IsValid = true;
                                }
                            }
                        }
                    }

                    item.CheckIsLapased = IsValid;

                    //  return IsValid;
                });
                //if (Response.data.value.length = 9)
                //{
                //    $scope.AppointmentDetails
                //}
                $scope.AppointmentsTotalItems = Response.data.value[0].TotalRecords;
                 usSpinnerService.stop('GridSpinner');
            } else {
                $scope.AppointmentDetails = [];
                $scope.AppointmentsTotalItems = 0;
                usSpinnerService.stop('GridSpinner');
            }



        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Message = "Error" + error.status;
        });
    }

    $scope.GetNewAppointmentSlot = function GetNewAppointmentSlot(Appointment) {
        debugger;

        $scope.selectedDoctorFullName = $scope.NewAppointment.DoctorName;
        var DoctorFullName = $scope.NewAppointment.DoctorName.split(" ");


    };


    //Added By Ikram For Getting Available Slots of Doctor Appointment
    /*code needs to comment unused*/
    $scope.getAvailableSlots = function (startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName) {
        $scope.countOfAvailableSlotButton = 0;
        $scope.doctorsAvailableSlotsList = [];
        var GetAvailableSlotResponse = AppointmentService.GetAvailableAppointmentSlots(startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName);
        GetAvailableSlotResponse.then(function (AvailableSlotResponse) {
            debugger;
            if (AvailableSlotResponse.data.value == 3) {
                var availableStartSlotClicked = new Date(startDate);
                var availableEndSlotClicked = new Date(endDate);
                $scope.selectedAvailableSlot = $scope.formatAMPM(availableStartSlotClicked) + ' to ' + $scope.formatAMPM(availableEndSlotClicked);
                $scope.countOfAvailableSlotButton = $scope.countOfAvailableSlotButton + 1;

                debugger;
                var availableStartSlotClickedTime = availableStartSlotClicked.getTime();

                var todayDate = new Date();

                var todayTime = todayDate.getDate();

                $scope.updatedStartTime = startDate.toString().substring(11, 13);
                $scope.updatedStartMin = startDate.toString().substring(14, 16);

                debugger;

                // To Check Available Slot Is Not Of Past Date
                if (availableStartSlotClicked > todayDate) {
                    $scope.slotCount = $scope.slotCount + 1;
                    debugger;
                    $scope.doctorsAvailableSlotsList.push({
                        FirstName: doctorFirstName,
                        MiddleName: doctorMiddleName,
                        LastName: doctorLastName,
                        StartTime: startDate,
                        EndTime: endDate,
                        SelectedAvailableSlot: $scope.selectedAvailableSlot,
                        CountOfAvailableSlotButton: $scope.countOfAvailableSlotButton
                    });
                }
                else {
                    // $scope.rescheduleMessageAcknoledgement = "Appointment Slot Not Available For The Selected Date ,Please Select Future Dates";
                }
            }
            else if (AvailableSlotResponse.data.value == 2) {
                // AlertMessage("Appointment is not Available in this Time Slot" + startDate + "" + endDate);
            }

        }, function (error) {
        });
    };
//Appoinmnet Slot without for loop request updated.
    $scope.getAvailableSlotsModifiedd = function (AppInputList) {
        usSpinnerService.spin('GridSpinner');
        var GetAvailableSlotResponse = AppointmentService.GetAvailableAppointmentSlotsModified(AppInputList);
        GetAvailableSlotResponse.then(function (AvailableSlotResponse) {
            debugger;

            for (var i = 0; i < AvailableSlotResponse.data.length; i++) {


                if (AvailableSlotResponse.data[i].status == 3) {

                    var availableStartSlotClicked = new Date(AvailableSlotResponse.data[i].timeslots);
                    var availableEndSlotClicked = new Date(AvailableSlotResponse.data[i + 1].timeslots);
                    //  vm.selectedAvailableSlot = vm.formatAMPM(availableStartSlotClicked) + ' to ' + vm.formatAMPM(availableEndSlotClicked);
                    $scope.selectedAvailableSlot = $scope.formatAMPM(availableStartSlotClicked) + ' to ' +$scope.formatAMPM(availableEndSlotClicked);
                    $scope.countOfAvailableSlotButton = $scope.countOfAvailableSlotButton + 1;

                    debugger;
                    var availableStartSlotClickedTime = availableStartSlotClicked.getTime();

                    var todayDate = new Date();

                    var todayTime = todayDate.getDate();

                    $scope.updatedStartTime = AvailableSlotResponse.data[i].timeslots.toString().substring(11, 13);
                    $scope.updatedStartMin = AvailableSlotResponse.data[i].timeslots.toString().substring(14, 16);

                    debugger;

                    // To Check Available Slot Is Not Of Past Date
                    if (availableStartSlotClicked > todayDate) {
                        $scope.slotCount = $scope.slotCount + 1;
                        debugger;
                        $scope.doctorsAvailableSlotsList.push({
                            FirstName: AvailableSlotResponse.data[i].doctorFirstName,
                            MiddleName: AvailableSlotResponse.data[i].doctorMiddleName,
                            LastName: AvailableSlotResponse.data[i].doctorLastName,
                            StartTime: AvailableSlotResponse.data[i].timeslots,
                            EndTime: AvailableSlotResponse.data[i + 1].timeslots,
                            SelectedAvailableSlot: $scope.selectedAvailableSlot,
                            CountOfAvailableSlotButton: $scope.countOfAvailableSlotButton
                        });
                    }
                    else {
                        // $scope.rescheduleMessageAcknoledgement = "Appointment Slot Not Available For The Selected Date ,Please Select Future Dates";
                    }
                }
                else if (AvailableSlotResponse.data[i].status == 2) {
                    // alert("Appointment is not Available in this Time Slot" + startDate + "" + endDate);
                }
            }

            usSpinnerService.stop('GridSpinner');

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };

    //Added By Ikram For Providing Functionality On Date Change Within Reschedule Event
    $scope.onRescheduleTimeSet = function (ndate, Appointment) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $scope.displayOnce = false;
        $scope.timeSlotCountr = 0;
        $scope.doctorAvailablityCheckOnSelectedDate = false;
        $scope.doctorAvailablityCheck = false;
        $scope.doctorsAvailableSlotsList = [];
        $scope.rescheduleMessageAcknoledgement = "";

        $scope.rescheduleDate = moment(ndate).format('DD MMM, YYYY');
        $scope.rescheduleViewDate = ndate;

        var enteredDate = moment($scope.rescheduleViewDate).add(1, 'day').toDate();
        var searchedDate = new Date();
        searchedDate = $scope.rescheduleViewDate;
        $scope.rescheduleSearchedDateDayId = searchedDate.getDay();
        $scope.rescheduleSearchedDateDayId = $scope.rescheduleSearchedDateDayId + 1;

        if ($scope.rescheduleSearchedDateDayId === 0) {
            $scope.rescheduleSearchedDateDayId = 7;
        }

        $scope.dayOfRescheduleViewDate = enteredDate.toString().substring(8, 10);
        $scope.monthOfRescheduleViewDate = enteredDate.getMonth();
       // var tempdayOfRescheduleViewDate = $scope.dayOfRescheduleViewDate;
       // var tempmonthOfRescheduleViewDate = $scope.monthOfRescheduleViewDate;

        enteredDate = new Date(enteredDate.getFullYear(), enteredDate.getMonth(), enteredDate.getDate(), 0, 0, 0, 0);
        var rescheduleResponseData = AppointmentService.GetData(enteredDate, Appointment.DOCID, 0, 0);
        rescheduleResponseData.then(function (RescheduleResponse) {
            $scope.RescheduleAppointmentDetails = RescheduleResponse.data.value;

            if ($scope.RescheduleAppointmentDetails.length == 0) {
                usSpinnerService.stop('GridSpinner');
                $scope.rescheduleMessageAcknoledgement = objResource.msgNoDoctorAvailableOnThisDay;
            }
            else {
                angular.forEach($scope.RescheduleAppointmentDetails, function (obj) {

                    var originalDoctorFullName = $scope.selectedDoctorFullName.split(" ");
                    //Code to check Search on model popup
                    if ($scope.isModalSearch && !$scope.IsShowLoadButton) {
                        var originalDoctorFirstName = originalDoctorFullName[0];
                        var originalDoctorLastName = originalDoctorFullName[2];
                    } else if ($scope.isModalSearch && $scope.IsShowLoadButton) {
                        var originalDoctorFirstName = originalDoctorFullName[0];
                        var originalDoctorLastName = originalDoctorFullName[2];
                    } else {
                        var originalDoctorFirstName = originalDoctorFullName[0];
                        var originalDoctorLastName = originalDoctorFullName[2];
                    }
                    if (obj.FirstName == originalDoctorFirstName && obj.LastName == originalDoctorLastName) {
                        $scope.DayId = obj.DayID;
                        $scope.DoctorInterval = obj.DoctorInterval;

                        if ($scope.DayId == $scope.rescheduleSearchedDateDayId) {
                            $scope.doctorAvailablityCheckOnSelectedDate = true;
                        }
                    }
                });
                //added for distinct slot generation. start 
                function isDateInArray(needle, haystack) {
                    for (var i = 0; i < haystack.length; i++) {
                        if (new Date(needle).getTime() === new Date(haystack[i].StartTime).getTime()) {
                            return true;
                        }
                    }
                    return false;
                }


                var uniqueDates = [];
                for (var i = 0; i < $scope.RescheduleAppointmentDetails.length; i++) {
                    debugger;
                    if (!isDateInArray($scope.RescheduleAppointmentDetails[i].StartTime, uniqueDates)) {

                        uniqueDates.push($scope.RescheduleAppointmentDetails[i]);

                    }
                }
                //added for distinct slot generation. end


                $scope.isValueChanged = false;
                $scope.dayOfRescheduleViewDate = $scope.dayOfRescheduleViewDate - 1;
                $scope.monthOfRescheduleViewDate = $scope.monthOfRescheduleViewDate + 1;

               
                angular.forEach(uniqueDates, function (obj) {

                    var originalDoctorFullName = $scope.selectedDoctorFullName.split(" ");
                    //var originalDoctorFirstName = originalDoctorFullName[0];
                    //var originalDoctorLastName = originalDoctorFullName[2];


                    //Code to check Search on model popup
                    if ($scope.isModalSearch && !$scope.IsShowLoadButton) {
                        var originalDoctorFirstName = originalDoctorFullName[0];
                        var originalDoctorLastName = originalDoctorFullName[2];
                    } else if ($scope.isModalSearch && $scope.IsShowLoadButton) {
                        var originalDoctorFirstName = originalDoctorFullName[2];
                        var originalDoctorLastName = originalDoctorFullName[4];
                    } else {
                        var originalDoctorFirstName = originalDoctorFullName[0];
                        var originalDoctorLastName = originalDoctorFullName[2];
                    }


                    if (obj.FirstName == originalDoctorFirstName && obj.LastName == originalDoctorLastName) {
                        $scope.DayId = obj.DayID;
                        $scope.DoctorInterval = obj.DoctorInterval;

                        if ($scope.DayId == $scope.rescheduleSearchedDateDayId) {
                            if (parseInt($scope.dayOfRescheduleViewDate) < 10 && !$scope.isValueChanged) {
                                $scope.isValueChanged = true
                                $scope.dayOfRescheduleViewDate = '0' + $scope.dayOfRescheduleViewDate;
                                if (parseInt($scope.monthOfRescheduleViewDate) < 10)
                                    $scope.monthOfRescheduleViewDate = '0' + $scope.monthOfRescheduleViewDate;
                            }
                            var updatedStartDayTimeSlot = obj.StartTime.toString().substring(8, 10);
                            var updatedEndDayTimeSlot = obj.EndTime.toString().substring(8, 10);
                            var updatedStartMonthTimeSlot = obj.StartTime.toString().substring(5, 7);
                            var updatedEndMonthTimeSlot = obj.EndTime.toString().substring(5, 7);

                            var changedStartTimeSlot = obj.StartTime.toString().replace(updatedStartDayTimeSlot, $scope.dayOfRescheduleViewDate);
                            var changedEndTimeSlot = obj.EndTime.toString().replace(updatedEndDayTimeSlot, $scope.dayOfRescheduleViewDate);
                            debugger;
                            changedStartTimeSlot = changedStartTimeSlot.replace(updatedStartMonthTimeSlot, $scope.monthOfRescheduleViewDate);
                            changedEndTimeSlot = changedEndTimeSlot.replace(updatedEndMonthTimeSlot, $scope.monthOfRescheduleViewDate);

                            $scope.timeSlotTestCases = $scope.getTimeSlots(changedStartTimeSlot, changedEndTimeSlot);
                            console.log('StartTime/EndTime', obj.StartTime, obj.EndTime);
                            console.log('In Loop', changedStartTimeSlot, changedEndTimeSlot);
                            console.log('Generated Slot', $scope.timeSlotTestCases);
                            debugger;
                            var tempAppInput = [];
                            angular.forEach($scope.timeSlotTestCases, function (item) {
                                var temp = {};
                                temp.doctorFirstName = obj.FirstName,
                                temp.doctorMiddleName = obj.MiddleName,
                                temp.doctorLastName = obj.LastName,
                                temp.timeslots = item,
                                temp.startDate = '',
                                temp.endDate = '',
                                temp.status = ''
                                tempAppInput.push(temp);


                            });

                            $scope.getAvailableSlotsModifiedd(tempAppInput);
                            //$scope.timeSlotTestCases = $scope.getTimeSlots(changedStartTimeSlot, changedEndTimeSlot);
                            //// $scope.timeSlotCountr = 0;
                            //angular.forEach($scope.timeSlotTestCases, function (availableTimeSlotLst) {

                            //    $scope.getAvailableSlots($scope.timeSlotTestCases[$scope.timeSlotCountr], $scope.timeSlotTestCases[$scope.timeSlotCountr + 1], obj.FirstName, obj.MiddleName, obj.LastName);

                            //    $scope.timeSlotCountr = $scope.timeSlotCountr + 1;
                            //});

                        }
                    }
                    else if ($scope.displayOnce === false && $scope.doctorAvailablityCheckOnSelectedDate === false) {
                        $scope.displayOnce = true;
                        $scope.rescheduleMessageAcknoledgement = $scope.selectedDoctorFullName + objResource.msgDoctorNotAvailable;
                    }
                });
                usSpinnerService.stop('GridSpinner');
            }
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }


    //Added By Ikram For Getting Available Slots In Required Format
    $scope.getTimeSlots = function intervals(startString, endString) {
        debugger;
        var start = moment(startString, 'YYYY-MM-DD hh:mm:ss a');
        var end = moment(endString, 'YYYY-MM-DD hh:mm a');

        // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
        // note that 59 will round up to 60, and moment.js handles that correctly
        start.minutes(Math.ceil(start.minutes() / 15) * 15);

        var result = [];

        var current = moment(start);

        while (current <= end) {
            result.push(current.format('YYYY-MM-DD HH:mm:ss'));
            current.add(15, 'minutes');
        }

        return result;
    }
    //Added By Ikram For Validating Data Entered Within Reschedule View
    $scope.validateRescheduleAppointment = function () {
        if (NewAppointment.AppointmentDate == "") {
            $scope.rescheduleMessageAcknoledgement = objResource.msgRescheduleMsgAck;
        }
        else {
            alert(objResource.msgSelectTimeSlot);
        }
    }

    //Added By Ikram For Providing Reschedule Functionality
    $scope.rescheduleAppointment = function (DOCID, DeptID) {
        $scope.ScheduleDateTimeList = [];
        debugger;

        if ($scope.ScheduleTimeList.length > 1) {
            angular.forEach($scope.ScheduleTimeList, function (obj) {
                $scope.ScheduleDateTimeList.push(new Date(obj));
            });

            $scope.ScheduleDateTimeList.sort(function (a, b) {
                return a - b;
            });

            $scope.selectedSlotStartTime = $scope.ScheduleDateTimeList[0];
            $scope.selectedSlotEndTime = $scope.ScheduleDateTimeList[$scope.ScheduleDateTimeList.length - 1];
        }

        if ($scope.selectedSlotStartTime == undefined || $scope.selectedSlotEndTime == undefined) {
            $scope.validateRescheduleAppointment();
        }
        else {
            if ($scope.Remark == undefined) {
                $scope.Remark = "";
            }
            if (DOCID == undefined) {
                DOCID = 0;
            }

            if (DeptID == undefined) {
                DeptID = 0;
            }

            var RescheduleCurrentEventResponse = AppointmentService.RescheduleCurrentEvent($scope.selectedSlotStartTime, $scope.selectedSlotEndTime, $scope.NewAppointment.FirstName, $scope.NewAppointment.LastName, $scope.NewAppointment.MobileNo, 2, $scope.NewAppointment.Remark, DOCID, DeptID, $scope.NewAppointment.APPID, $scope.NewAppointment.UnitID, $scope.NewAppointment.AppReasonID);
            RescheduleCurrentEventResponse.then(function (RescheduleResponse) {
                // alert(objResource.msgRescheduleSuccess);
                AlertMessage.success(objResource.msgTitle, objResource.msgRescheduleSuccess);
                if ($scope.NewAppointment.MRNo == undefined)
                    angular.element(newAppointment).modal('hide');
                else
                    angular.element(rescheduleAppointment).modal('hide');

                //$scope.LoadAllAppointments();
                if ($scope.IsNormalSearch) {
                    $scope.NormalSearch($scope.Appointment);
                }
                else {
                    $scope.AdvanceSearch($scope.Appointment);
                }

                $scope.NewAppointment = {};


            }, function (error) {
            });

        }

    }


    //Added By Ikram For Getting Functionality Of OnClick Of Date Within Reschedule View
    $scope.AppointmentClick = function AppointmentClick(selectedStartTime, selectedEndTime, SelectedAvailableSlot, CountOfAvailableSlotButton) {
        debugger;
        var isButtonDblClick = false;
        // AlertMessage.success(objResource.msgTitle, objResource.msgSelectedAppointmentTime + SelectedAvailableSlot);
        $scope.selectedSlotStartTime = new Date(selectedStartTime);
        $scope.selectedSlotEndTime = new Date(selectedEndTime);
        var listLength = $scope.ScheduleTimeList.length;
        $scope.ScheduleDateTimeList = [];


        //Code to remove element on double click
        var countIndex = $scope.active.indexOf(CountOfAvailableSlotButton);
        if (countIndex > -1) {
            $scope.active.splice(countIndex, 1);
            var startIndex = $scope.ScheduleTimeList.indexOf(selectedStartTime);

            if (startIndex > -1) {
                $scope.ScheduleTimeList.splice(startIndex, 1);
            };

            var endIndex = $scope.ScheduleTimeList.indexOf(selectedEndTime);
            if (startIndex > -1) {
                $scope.ScheduleTimeList.splice(endIndex, 1);
            };

            isButtonDblClick = true;
        }


        //  $scope.active[CountOfAvailableSlotButton] = CountOfAvailableSlotButton;

        if (!isButtonDblClick) {
            if (listLength < 8) {
                if (listLength < 1) {
                    $scope.ScheduleTimeList.push(selectedStartTime, selectedEndTime);
                    $scope.active[CountOfAvailableSlotButton] = CountOfAvailableSlotButton;
                } else {

                    if ($scope.ScheduleTimeList[listLength - 1] == selectedStartTime || $scope.ScheduleTimeList[listLength - 2] == selectedEndTime) {
                        $scope.ScheduleTimeList.push(selectedStartTime, selectedEndTime);
                        $scope.active[CountOfAvailableSlotButton] = CountOfAvailableSlotButton;
                    } else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgPleaseSelectTimeSlot);
                    }
                }
            } else {

                AlertMessage.error(objResource.msgTitle, objResource.msgSelectOnlyOneHour);
            }
        }
        if ($scope.ScheduleTimeList.length > 1) {
            angular.forEach($scope.ScheduleTimeList, function (obj) {
                $scope.ScheduleDateTimeList.push(new Date(obj));
            });

            $scope.ScheduleDateTimeList.sort(function (a, b) {
                return a - b;
            });

            $scope.selectedTime = $scope.formatAMPM($scope.ScheduleDateTimeList[0]) + ' to ' + $scope.formatAMPM($scope.ScheduleDateTimeList[$scope.ScheduleDateTimeList.length - 1]);

        }


    }


    $scope.DisplayTimeOnModal = function () {


    };

    $scope.GetDepartmentByUnitID = function GetDepartmentByUnitID(CityAndClinicName) {
        if (!angular.isUndefined(CityAndClinicName) || CityAndClinicName != '') {
            //Code change by manohar Temp for testing
            //var responseData = Common.GetDeptIDByUnitIDFOrAppointment(CityAndClinicName);
            var responseData = DoctorService.GetDepartmentListForDoc(CityAndClinicName);
            debugger;
            responseData.then(function (Response) {
                if (Response.data.value.length > 0) {
                    debugger;
                    $scope.DepartmentList = Response.data.value;
                    $scope.DepartmentList.splice(0, 1);
                    // $scope.GetAppointmentDetails(true, false);
                }
            }, function (error) {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }

    };

    //Get All Doctor List  for drop-dawn Doctor.
    //$scope.GetDocList = function GetDocList() {
    //    debugger;
    //    var responseData = Common.GetDoctorList();
    //    responseData.then(function (Response) {
    //        if (Response.data.length > 0) {
    //            $scope.DoctorCategoryList = Response.data;
    //            //$scope.DoctorCategoryList.splice(0, 1);
    //            //$scope.Appointment.DOCID = 0;
    //        } else {
    //            $scope.DoctorCategoryList = {};
    //        }

    //    }, function (error) {
    //        AlertMessage.error(objResource.msgTitle, objResource.msgError);
    //    });
    //};

    $scope.GetDocList = function GetDocList() {
        var responseData = Common.GetDoctorList();
        responseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Doctor' })
            $scope.DocList = Response.data;
            $scope.Appointment.DOCID = 0;
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetDoctorListByDeptID = function GetDoctorListByDeptID(DeptID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if (DeptID == "")
        {
            DeptID = "0";
        }
        var responseData = UserService.GetDocListByDeptID(DeptID);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data.length) {
                $scope.DoctorCategoryList = Response.data;
                $scope.DOCID = 0;
                $scope.DocList = Response.data;
              
            }
            else {
                
                $scope.DoctorCategoryList = [];
                $scope.DOCID = 0;
                $scope.DocList = [];
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });

    };

    // Get special registration list details controller function
    $scope.GetSpecialRegistrationMasterList = function GetSpecialRegistrationMasterList(IsSelect) {

        var responseData = AppointmentService.GetSpecialRegistrationMasterList('', IsSelect);
        responseData.then(function (Response) {

            $scope.SpecialRegistrationList = Response.data.value;
            if ($scope.Appointment.PatientSRegID == undefined) {
                $scope.Appointment.PatientSRegID = 0;
            }
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //$scope.GetAppointmentStatus = function GetAppointmentStatus() {
    //    debugger;
    //    var responseData = AppointmentService.GetAppointmentStatus();
    //    debugger;
    //    responseData.then(function (Response) {
    //        if (Response.data.value.length > 0) {
    //            debugger;
    //            $scope.AppointmentStatusList = Response.data.value;
    //        }
    //    }, function (error) {
    //        // AlertMessage.error(objResource.msgTitle, objResource.msgError);
    //    });

    //};


    $scope.GetAppointmentStatus = function GetAppointmentStatus() {
        var ResponseData = Common.getMasterList('M_AppointmentStatus', 'AppStatusID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            $scope.AppointmentStatusList = Response.data;

        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.GetAppointmentTypes = function GetAppointmentTypes() {
        var ResponseData = Common.getMasterList('M_AppointmentType', 'AppTypeId', 'Description');
        debugger;
        ResponseData.then(function (Response) {
            $scope.AppointmentTypeList = Response.data;

        }, function (error) {
            $scope.Error = error;
        });
    }

    //Get Appointment Search method 

    $scope.GetSearchAppointmentDetails = function GetSearchAppointmentDetails(AppointmentDate, Name, DeptID, DoctID, MRNo, MobileNo, SRegID, AppTypeId, AppStatusID, FromDate, ToDate, PageIndex, IsNormalSearch) {
        debugger;
      usSpinnerService.spin('GridSpinner');

        var responseData = AppointmentService.SearchAppointments(AppointmentDate || "" , Name, DeptID, DoctID, MRNo, MobileNo, SRegID, AppTypeId, AppStatusID, FromDate || "", ToDate || "", PageIndex, IsNormalSearch);
        responseData.then(function (Response) {
            debugger;
            usSpinnerService.stop('GridSpinner');
            if (Response.data.value.length > 0) {
                $scope.AppointmentDetails = Response.data.value;
                angular.forEach($scope.AppointmentDetails, function (item) {
                    var IsValid = false;
                    if (new Date($filter('date')(item.AppointmentDate, 'dd-MMM-yyyy')).getTime() == new Date($filter('date')(new Date(), 'dd-MMM-yyyy')).getTime()) {
                        if (item.Iscancel) {
                            item.IsCheckIn = false;
                        } else {
                            item.IsCheckIn = true;
                        }
                    }
                    else {
                        item.IsCheckIn = false;

                    }
                    if (item.Iscancel) {
                        item.CheckIsLapased = true;
                    } else {

                        var Today = moment(new Date()).format('DD MMM, YYYY');
                        var Today = $filter('date')(new Date(), 'dd-MMM-yyyy');
                        var FromTime = $filter('date')(new Date(), 'HH:mm');
                        if (new Date(item.AppointmentDate).getTime() >= new Date().getTime()) {
                            debugger;
                            if ($filter('date')(item.AppointmentDate, 'dd-MMM-yyyy') == Today || new Date(item.AppointmentDate).getTime() >= new Date().getTime()) {
                                var now = new Date();
                                var d = new Date(item.FromTime);
                                if (now.getTime() < d.getTime()) {
                                    IsValid = true;
                                }
                            }
                        }
                    }

                    item.CheckIsLapased = IsValid;

                    //  return IsValid;
                });
                $scope.AppointmentsTotalItems = Response.data.value[0].TotalRecords;

            } else {
                $scope.AppointmentDetails = [];
                $scope.AppointmentsTotalItems = 0;
            }
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Message = "Error" + error.status;
        });
    };

    //Normal Search
    $scope.NormalSearch = function NormalSearch(Appointment) {
        debugger;

        $scope.IsNormalSearch = true;
        $scope.IsNormalSearchPrint = true;
        //  AppointmentSearch = Appointment;
        var startDate =  null ;    // new Date(1900, 01, 01);
        if (angular.isUndefined(Appointment.AppointmentDate) || Appointment.AppointmentDate == '')
            var AppointmentDate = startDate;
        else
            var AppointmentDate = Appointment.AppointmentDate;

        if (angular.isUndefined(Appointment.Name) || Appointment.Name == null) {
            var Name = '';
            $scope.Appointment.Name = '';
        }
        else {
            var Name = Appointment.Name;
            $scope.Appointment.Name = Appointment.Name;
        }
        if (angular.isUndefined(Appointment.DeptID) || Appointment.DeptID == '') {
            var DeptID = 0;
            $scope.Appointment.DepID = 0;
            $scope.Appointment.DOCID = 0;
        }
        else {
            var DeptID = Appointment.DeptID;
            $scope.Appointment.DeptID = Appointment.DeptID;
        }
        if (angular.isUndefined(Appointment.DOCID) || Appointment.DOCID == '') {
            var DOCID = 0;
            $scope.Appointment.DOCID = 0;
        }
        else {
            var DOCID = Appointment.DOCID;
            $scope.Appointment.DOCID = Appointment.DOCID;
        }

        //Default make all property zero
        var MRNo = '';
        var MobileNo = '';
        var SRegID = 0;
        var AppTypeId = 0;
        var AppStatusID = 0;
        var FromDate = startDate || "";
        var ToDate = startDate || "";

        $scope.GetSearchAppointmentDetails(AppointmentDate, Name, DeptID, DOCID, MRNo, MobileNo, SRegID, AppTypeId, AppStatusID, FromDate, ToDate, $scope.CurrentPage - 1, $scope.IsNormalSearch);


    };

    $scope.AdvanceSearch = function AdvanceSearch(Appointment) {
        debugger;
        $scope.IsNormalSearch = false;
        $scope.IsNormalSearchPrint = false;
        var startDate = null //new Date(1900, 01, 01);

        //Make null for Advance Search no need to check Normal Search Parameter
        var AppointmentDate = startDate || '';
        var Name = '';
        var DeptID = 0;
        var DOCID = 0;

        if (angular.isUndefined(Appointment.MRNo) || Appointment.MRNo == null)
            var MRNo = '';
        else
            var MRNo = Appointment.MRNo;

        if (angular.isUndefined(Appointment.MobileNo) || Appointment.MobileNo == null)
            var MobileNo = '';
        else
            var MobileNo = Appointment.MobileNo;

        if (angular.isUndefined(Appointment.SRegID) || Appointment.SRegID == '')
            var SRegID = 0;
        else
            var SRegID = Appointment.SRegID;

        if (angular.isUndefined(Appointment.AppTypeId) || Appointment.AppTypeId == '')
            var AppTypeId = 0;
        else
            var AppTypeId = Appointment.AppTypeId;

        if (angular.isUndefined(Appointment.AppStatusID) || Appointment.AppStatusID == '')
            var AppStatusID = 0;
        else
            var AppStatusID = Appointment.AppStatusID;

        if (angular.isUndefined(Appointment.FromDate) || Appointment.FromDate == '')
            var FromDate = startDate || '';
        else
            var FromDate = Appointment.FromDate;

        if (angular.isUndefined(Appointment.ToDate) || Appointment.ToDate == '')
            var ToDate = startDate || '';
        else
            var ToDate = Appointment.ToDate;

        $scope.GetSearchAppointmentDetails(AppointmentDate, Name, DeptID, DOCID, MRNo, MobileNo, SRegID, AppTypeId, AppStatusID, FromDate, ToDate, $scope.CurrentPage - 1, $scope.IsNormalSearch);
    };

    $scope.GetSelectedPatientInfo = function GetSelectedPatientInfo(Appointment) {
        debugger;
        $scope.SelectedPatientName = Appointment.PatientName;
        $scope.AppReason = Appointment.AppReason;
        $scope.PatientPhoto = Appointment.PatientPhoto;
        $scope.PatientMobileNumber = Appointment.MobileNo;
        $scope.AppointmentBy = Appointment.AppointmentBy;
        $scope.GenderID = Appointment.GenderID;
        $scope.AddedDateTime = Appointment.AddedDateTime;
        if (Appointment.AppStatusID == 1)
            $scope.CreatedFieldTxt = "Created By"
        else if (Appointment.AppStatusID == 2)
            $scope.CreatedFieldTxt = "Cancelled By"
        else
            $scope.CreatedFieldTxt = "Rescheduled By"

    };


    $scope.RedirectToCheckedInPage = function RedirectToCheckedInPage(Appointment) {
        debugger;
        if (Appointment.AppTypeId == 1) {
            AlertMessage.error(objResource.msgTitle,objResource.msgAppointmentAlreadyMarked); //Appointment has already marked :: Modified by swatih for localization on 13/7/2020
            return;
        } else {
            //check Register Patient or Not 
            $rootScope.MarkVisitData.IsLoadVisitData = false;
            if (angular.isDefined(Appointment.MRNo) && Appointment.MRNo != "") {
                $rootScope.MarkVisitData = Appointment;
                $rootScope.IsAppointment = true;
                $rootScope.MarkVisitData.IsLoadVisitData = true;
                srvCommon.aciveTab('liMPatient');   // set tab active
                $location.path('/PatientVisit/');

                
            }
            else {

                swalMessages.MessageBox(objResource.msgTitle, "Are you sure want to register?", "warning", function (isConfirmed) {
                    if (isConfirmed) {
                        Appointment.IsNonRegPatientRedirect = true;
                        Common.clearObj();
                        Appointment.CountryList = $scope.CountryList;
                        Common.setObj(Appointment);
                        //$location.path('/Registration/');
                        $rootScope.IsAppointment = true;
                        $rootScope.APPID = Appointment.APPID;
                        srvCommon.aciveTab('liMPatient');   // set tab active
                        $location.path('/New_Registration/');
                    }
                });

            }

        }

    };


    $scope.deleteAppointment = function (ReasonForCancellation) {
        debugger;

        if (ReasonForCancellation == undefined || ReasonForCancellation.trim() == "") {
            $scope.deleteMessageAcknoledgement = objResource.msgDeleteMessageAck;

        } 
        else {
            var timedifference = new Date().getTimezoneOffset();
            var DeleteCurrentEventResponse = AppointmentService.DeleteCurrentEvent($scope.NewAppointment.PatientName, $scope.NewAppointment.FromTime, $scope.NewAppointment.ToTime, 1, ReasonForCancellation , timedifference);
            DeleteCurrentEventResponse.then(function (DeleteResponse) {

                AlertMessage.success(objResource.msgTitle, objResource.msgDeleteSuccess);
                console.log('Deleted', ($scope.NewAppointment.PatientName));
                //  $scope.LoadAllAppointments();
                if ($scope.IsNormalSearch)
                {
                    $scope.NormalSearch($scope.Appointment);
                }
                else {
                    $scope.AdvanceSearch($scope.Appointment);
                }
                
                angular.element(cancelAppointment).modal('hide');
            }, function (error) {
            });
        }

    }


    $scope.GetDoctorName = function GetDoctorName(DOCID, IsShowLoadButton) {
        debugger;
        $scope.doctorsAvailableSlotsList = [];
        $scope.NewAppointment.DOCID = DOCID;
        $scope.IsShowLoadButton = IsShowLoadButton;
        var selectedIndex = $scope.DoctorCategoryList.map(function (obj) { return obj.ID; }).indexOf(parseInt(DOCID));
        $scope.selectedDoctorFullName = $scope.DoctorCategoryList[selectedIndex].DoctorName;
        $scope.selectedTime = "";

    };

    $scope.LoadAppointmentTimeSlot = function LoadAppointmentTimeSlot(IsRegisterPatient) {

        debugger;
        $scope.isModalSearch = true;
        if (IsRegisterPatient)
            var ScheduleDate = new Date($scope.NewAppointment.AppointmentRegDate);
        else
            var ScheduleDate = new Date($scope.NewAppointment.AppointmentNonRegDate);

        ScheduleDate.setHours(0, 0, 0, 0);
        //  $scope.GetNewAppointmentSlot($scope.NewAppointment);
        $scope.onRescheduleTimeSet(ScheduleDate, $scope.NewAppointment)

    };
    

    $scope.RedirectToCancel = function RedirectToCancel(Appointment) {
        debugger;
        $scope.selectedTime = $scope.formatAMPM(new Date(Appointment.FromTime)) + ' to ' + $scope.formatAMPM(new Date(Appointment.ToTime));
        $scope.selectedDate = moment(new Date(Appointment.AppointmentDate)).format('DD MMM YYYY');
        $scope.NewAppointment.DeptID = Appointment.DeptID;
        $scope.NewAppointment.UnitID = Appointment.UnitID;
        $scope.NewAppointment.DOCID = Appointment.DOCID;
        $scope.NewAppointment.PatientMobileNumber = Appointment.PatientMobileNumber;
        //$scope.NewAppointment.VisitID = Appointment.VisitID;
        $scope.NewAppointment.AppReasonID = Appointment.AppReasonID;
        $scope.NewAppointment.MobileCountryCode = Appointment.MobileCountryCode;
        $scope.NewAppointment.GenderID = Appointment.GenderID;
        $scope.NewAppointment.Remark = Appointment.Remark;
        $scope.NewAppointment.MobileNo = Appointment.MobileNo;
        $scope.NewAppointment.FirstName = Appointment.FirstName;
        $scope.NewAppointment.LastName = Appointment.LastName;
        $scope.NewAppointment.PatientName = Appointment.PatientName;
        $scope.NewAppointment.DoctorName = Appointment.DoctorName;
        $scope.NewAppointment.GenderDescription = Appointment.GenderDescription;
        $scope.NewAppointment.ApptUnit = Appointment.ApptUnit;
        $scope.NewAppointment.Department = Appointment.Department;
        $scope.NewAppointment.AppointmentReason = Appointment.AppointmentReason;
        $scope.NewAppointment.FromTime = new Date(Appointment.FromTime).toISOString();
        $scope.NewAppointment.ToTime = new Date(Appointment.ToTime).toISOString();
        $scope.NewAppointment.DOB = new Date(Appointment.DOB);
        $scope.NewAppointment.Iscancel = Appointment.Iscancel;
        $scope.RedirectTo = "";

        if ($scope.NewAppointment.Iscancel) {
            AlertMessage.error(objResource.msgTitle, objResource.msgAppointmentAlreadyCancelled);//Appointment already cancelled :: Modified by swatih for localization on 13/7/2020
            return;
        }

        if (angular.isDefined(Appointment.MRNo) && Appointment.MRNo != "") {

            if (new Date(Appointment.AppointmentDate) < new Date()) {
                AlertMessage.error(objResource.msgTitle, objResource.msgLapsedAppointmentCannotCancel);//You cannot cancel Lapsed Appointment :: Modified by swatih for localization on 13/7/2020
                return;
            }
            else {
                $scope.RedirectTo = "#cancelAppointment";

            }
        }
        else {
            if (new Date(Appointment.AppointmentDate) < new Date()) {
                AlertMessage.error(objResource.msgTitle,objResource.msgLapsedAppointmentCannotCancel);// You cannot cancel Lapsed Appointment :: Modified by swatih for localization on 13/7/2020
                return;
            }
            else {
                $scope.RedirectTo = "#cancelAppointment";

            }
        }

    };
    $scope.RedirectToNewAppointment = function RedirectToNewAppointment(Appointment) {
        debugger;
        if (Appointment.Iscancel)
            AlertMessage.error(objResource.msgTitle, objResource.msgAppointmentAlreadyCancelled);

        if (Appointment.RescheduleAgainstApptID >= 2)
            alert( objResource.msgAlreadyRescheduledApp + Appointment.RescheduleAgainstApptID + objResource.msgTimes);

        $scope.selectedTime = $scope.formatAMPM(new Date(Appointment.FromTime)) + objResource.lblTo + $scope.formatAMPM(new Date(Appointment.ToTime));
        $scope.selectedDate = moment(new Date(Appointment.AppointmentDate)).format('DD MMM YYYY');
        $scope.NewAppointment.DeptID = Appointment.DeptID;
        $scope.NewAppointment.UnitID = Appointment.UnitID;
        $scope.NewAppointment.DOCID = Appointment.DOCID;
        $scope.NewAppointment.PatientMobileNumber = Appointment.PatientMobileNumber;
        // $scope.NewAppointment.VisitID = Appointment.VisitID;
        $scope.NewAppointment.AppReasonID = Appointment.AppReasonID;
        $scope.NewAppointment.MobileCountryID = Appointment.MobileCountryCode;
        $scope.NewAppointment.GenderID = Appointment.GenderID;
        $scope.NewAppointment.Remark = Appointment.Remark;
        $scope.NewAppointment.MobileNo = Appointment.MobileNo;
        $scope.NewAppointment.FirstName = Appointment.FirstName;
        $scope.NewAppointment.LastName = Appointment.LastName;
        $scope.NewAppointment.PatientName = Appointment.PatientName;
        $scope.NewAppointment.DoctorName = Appointment.DoctorName;
        $scope.NewAppointment.GenderDescription = Appointment.GenderDescription;
        $scope.NewAppointment.ApptUnit = Appointment.ApptUnit;
        $scope.NewAppointment.Department = Appointment.Department;
        $scope.NewAppointment.AppointmentReason = Appointment.AppointmentReason;
        $scope.NewAppointment.FromTime = new Date(Appointment.FromTime).toISOString();
        $scope.NewAppointment.ToTime = new Date(Appointment.ToTime).toISOString();
        $scope.NewAppointment.DOB = new Date(Appointment.DOB);
        $scope.NewAppointment.Iscancel = Appointment.Iscancel;
        $scope.NewAppointment.APPID = Appointment.APPID;

        $scope.ScheduleTimeList = [];
        $scope.active = [];
        if (angular.isDefined(Appointment.MRNo) && Appointment.MRNo != "") {

            if (new Date(Appointment.AppointmentDate) < new Date()) {
                AlertMessage.error(objResource.msgTitle, objResource.msgLapsedAppointment);
                return;
            }
            else {
                $scope.RedirectTo = "#rescheduleAppointment";
                $scope.NewAppointment.MRNo = Appointment.MRNo;
                $scope.NewAppointment.AppointmentRegDate = new Date(Appointment.AppointmentDate);
                $scope.GetNewAppointmentSlot($scope.NewAppointment);
                $scope.onRescheduleTimeSet($scope.NewAppointment.AppointmentRegDate, $scope.NewAppointment)
            }
        }
        else {
            if (new Date(Appointment.AppointmentDate) < new Date()) {
                AlertMessage.error(objResource.msgTitle, objResource.msgLapsedAppointment);
                return;
            }
            else {
                $scope.RedirectTo = "#newAppointment";
                $scope.NewAppointment.AppointmentNonRegDate = new Date(Appointment.AppointmentDate);
                $scope.GetNewAppointmentSlot($scope.NewAppointment);
                $scope.onRescheduleTimeSet($scope.NewAppointment.AppointmentNonRegDate, $scope.NewAppointment)
            }
        }
        //Load Reason DDL
        var PatientVisitListResponse = AppointmentService.GetPatientVisitList();
        PatientVisitListResponse.then(function (AvailableVisitTypeResponse) {
            $scope.PatientVisitList = AvailableVisitTypeResponse.data.value;
            AvailableVisitTypeResponse.data.value.splice(0, 0, { VTID: 0, Description: 'Select' });
        }, function (error) {
        });

        var PatientGenderListResponse = AppointmentService.GetPatientGenderList();
        PatientGenderListResponse.then(function (GenderListResponse) {
            $scope.PatientGenderList = GenderListResponse.data.value;
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });

        var CityAndClinicNamesResponse = AppointmentService.GetCityAndClinicNames();
        CityAndClinicNamesResponse.then(function (CityAndClinicResponse) {
            $scope.CityAndClinicNameList = CityAndClinicResponse.data.value;
        }, function (error) {
        });
        $scope.GetDepartmentByUnitIDModel($scope.NewAppointment.UnitID);
        $scope.GetDoctorListByDeptIDOnModel($scope.NewAppointment.DeptID);
        $scope.Department = Appointment.Department;
        $scope.MRNo = Appointment.MRNo;


    };


    //Added By Manohar Which Will Display Time In Required Format
    $scope.formatAMPM = function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    $scope.LoadData = function () {
        debugger;
        //alert("Appointment Called");
        $scope.loadResourceFileData();
        $scope.GetAppointmentStatus();
        $scope.GetAppointmentTypes();
        $scope.GetDepartmentByUnitID(localStorageService.get("UserInfo").UnitID);
        //$scope.GetDoctorListByDeptID(0)
        $scope.GetDocList();
        $scope.GetDoctorListByDeptID(0)
        $scope.LoadAllAppointments();
        $scope.GetSpecialRegistrationMasterList(true);
        $scope.getCountryList();       

    };

    $scope.loadResourceFileData = function () {

        $scope.lblRemark = objResource.lblRemark;
        $scope.lblMobNo = objResource.lblMobNo;
        $scope.lblGender = objResource.lblGender;
        $scope.lblLastName = objResource.lblLastName;
        $scope.lblFirst = objResource.lblFirst;
        $scope.btnSearch = objResource.btnSearch;

        $scope.lblAppointmentReason = objResource.lblAppointmentReason;
        $scope.lblRefresh = objResource.lblRefresh;
        $scope.lblNewAppointment = objResource.lblNewAppointment;
        $scope.lblReasonForCancellation = objResource.lblReasonForCancellation;

        $scope.btnCancel = objResource.btnCancel;
        $scope.btnSave = objResource.btnSave;
        $scope.lblTime = objResource.lblTime;
        $scope.lblDate = objResource.lblDate;
        $scope.lblMRNO = objResource.lblMRNO;
        $scope.lblDoctor = objResource.lblDoctor;
        $scope.lblDepartment = objResource.lblDepartment;
        $scope.lblClinic = objResource.lblClinic;
    };    

    $scope.CheckIsLapased = function CheckIsLapased(item) {
        debugger;        
        var IsValid = false;
        var Today = moment(new Date()).format('DD MMM, YYYY');
        var Today = $filter('date')(new Date(), 'dd-MMM-yyyy');
        var FromTime = $filter('date')(new Date(), 'HH:mm');
        if (new Date(item.AppointmentDate).getTime() >= new Date().getTime())
        {
            debugger;
            if ($filter('date')(item.AppointmentDate, 'dd-MMM-yyyy') == Today || new Date(item.AppointmentDate).getTime() >= new Date().getTime()) {
                var now = new Date();
                var d = new Date(item.FromTime);
                if (now.getTime() < d.getTime()) {
                    IsValid = true;
                }
            }
        }
       
        
        return IsValid;
    }

    $scope.PrintAppointment = function PrintAppointment(Appointment,PDF) {
        debugger;
        if (angular.isUndefined(Appointment.DeptID) || Appointment.DeptID == '') {            
            var DeptID = 0;
        }
        else {
            var DeptID = Appointment.DeptID;
        }
        if (angular.isUndefined(Appointment.DOCID) || Appointment.DOCID == '') {            
            $scope.Appointment.DOCID = 0;
        }
        if (angular.isUndefined(Appointment.Name) || Appointment.Name == '') {            
            $scope.Appointment.Name = '';
        }
        var a = encodeURIComponent('FromDate=' + $scope.Appointment.FromDate + '&ToDate=' + $scope.Appointment.ToDate
                        + '&AppointmentDate=' + $scope.Appointment.AppointmentDate + '&DOCID=' + $scope.Appointment.DOCID
                        + '&DeptID=' + DeptID + '&Name=' + $scope.Appointment.Name
                        + '&IsNormalSearch=' + $scope.IsNormalSearchPrint + '&PDF=' + PDF);
        window.open('/Reports/Appointment/AppointmentListWF.aspx?' + encodeURIComponent(a), '_blank');
    }

    $scope.GetDoctorListByDeptIDOnModel = function GetDoctorListByDeptIDOnModel(DeptID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(DeptID) || DeptID == "")
            DeptID = 0;
        debugger;
        var responseData = UserService.GetDocListByDeptID(DeptID);
        responseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, DoctorName: objResource.lblDoctor });
            $scope.DoctorCategoryListModel = Response.data;
            usSpinnerService.stop('GridSpinner');

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            // AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });


    }
    $scope.GetDepartmentByUnitIDModel = function GetDepartmentByUnitIDModel(CityAndClinicName) {
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(CityAndClinicName) || CityAndClinicName == "")
            CityAndClinicName = 0;
        var responseData = DoctorService.GetDepartmentListForDoc(CityAndClinicName);
        debugger;
        responseData.then(function (Response) {
            debugger;
            Response.data.value.splice(0, 1);
            Response.data.value.splice(0, 0, { ID: 0,DeptID:0, Description: objResource.lblDepartment });
            if (Response.data.value.length > 0) {
                //$scope.NewAppointment.DeptID = 0;
                $scope.DepartmentListModel = Response.data.value;
            }
            
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            // AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });


    };

    
}]);