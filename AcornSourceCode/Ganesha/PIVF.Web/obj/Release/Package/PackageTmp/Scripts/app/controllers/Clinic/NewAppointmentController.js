'use strict';
angular.module('PIVF').controller('NewAppointmentController', ['$scope',  '$uibModalInstance'  ,'calendarConfig', 'AppointmentService', 'PatientVisitService', 'DoctorService', 'ngDialog', 'srvCommon', 'UserService', '$location', '$filter', 'AlertMessage', 'Common', '$rootScope', 'usSpinnerService', 'localStorageService',
function ($scope, $uibModalInstance  , calendarConfig, AppointmentService, PatientVisitService, DoctorService, ngDialog, srvCommon, UserService, $location, $filter, AlertMessage, Common, $rootScope, usSpinnerService, localStorageService) {
 
    var vm = this;
    var flag = false;
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.isCalenderClick = false;
    $scope.isCalenderIncrementClick = false;
    $scope.isCalenderDecrementClick = false;
    $scope.IsGenderDisable = false;
    $scope.IsLastNameDisable = false;
    $scope.IsFirstNameDisable = false;
    $scope.IsMobileNoDisable = false;
    $scope.IsCountryCodeDisable = false;
    $scope.PatientFirstNameError = false;
    $scope.PatientLastNameError = false;
    $scope.PatientMobileCountryCodeError = false;
    $scope.PatientMobileNumberError = false;
    $scope.PatientVisitIdError = false;
    $scope.isBlankField = false;
    $scope.timeSlotCountr = 0;

   $scope.newAppointmentDetailsFromList = {
    DOA: new Date(), // Default to today's date
    fromTime: new Date(new Date().getTime() + 5 * 60 * 1000), // 5 minutes from the current time
    toTime: new Date(new Date().getTime() + 35 * 60 * 1000), // 30 minutes after "From Time"    
   };


// Set the time to only show hour and minutes
$scope.formatTime = function(time) {
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time;
};

$scope.newAppointmentDetailsFromList.fromTime = $scope.formatTime($scope.newAppointmentDetailsFromList.fromTime);
$scope.newAppointmentDetailsFromList.toTime = $scope.formatTime($scope.newAppointmentDetailsFromList.toTime);

   $scope.timeValidationError = ""; // Error message for validation


 // $scope.validateTime = function () {
  //  if ($scope.newAppointmentDetailsFromList.fromTime >= $scope.newAppointmentDetailsFromList.toTime) {
  //      $scope.timeValidationError = "From Time cannot be greater than or equal to To Time.";
  //  } else {
        $scope.timeValidationError = ""; // Clear the error message when valid
 //   }
 // };


$scope.validateTime = function () {
    const currentTime = new Date();
    const currentDate = currentTime.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    const selectedDOA = $scope.newAppointmentDetailsFromList.DOA.toISOString().split('T')[0];

    // Check if the selected date is in the past (to prevent previous day bookings)
    if (selectedDOA < currentDate) {
        $scope.timeValidationError = "Appointments cannot be booked for previous days.";
        return;
    }

    // Check if From Time is in the past (only if the selected date is today)
    if (selectedDOA === currentDate && $scope.newAppointmentDetailsFromList.fromTime <= currentTime) {
        $scope.timeValidationError = "From Time cannot be in the past.";
        return;
    }

    // Ensure From Time is before To Time
    if ($scope.newAppointmentDetailsFromList.fromTime >= $scope.newAppointmentDetailsFromList.toTime) {
        $scope.timeValidationError = "From Time cannot be greater than or equal to To Time.";
        return;
    }

    // Clear the error message when all validations pass
    $scope.timeValidationError = "";
};



$scope.$watchGroup(
    ['newAppointmentDetailsFromList.fromTime', 'newAppointmentDetailsFromList.toTime' , 'newAppointmentDetailsFromList.DOA'],
    function () {
        $scope.validateTime();
    }
);



// Watch for changes in DOA
$scope.$watch('newAppointmentDetailsFromList.DOA', function (newDOA) {
  if (newDOA) {
    // Reset fromTime and toTime based on the new DOA
    const hours = $scope.newAppointmentDetailsFromList.fromTime.getHours();
    const minutes = $scope.newAppointmentDetailsFromList.fromTime.getMinutes();

    $scope.newAppointmentDetailsFromList.fromTime = new Date(newDOA);
    $scope.newAppointmentDetailsFromList.fromTime.setHours(hours, minutes, 0, 0);

    $scope.newAppointmentDetailsFromList.toTime = new Date(newDOA);
    $scope.newAppointmentDetailsFromList.toTime.setHours(hours + 0, minutes + 30, 0, 0); // 30 mins after fromTime
  }

   $scope.validateTime();
});







 $scope.validateNewAppointmentFields = function (FirstName, LastName, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, selectedMRNo, DOB, IsNewPatient , UnitID , DepartmentID , DoctorName) {
            debugger;
            $scope.message = "";

            $scope.isBlankField = false;
            if ($rootScope.IsNewPatientValidationHide == 1) {
                if (FirstName == "" || angular.isUndefined(FirstName)) {
                    $scope.message = objResource.msgEntFirstName;
                    $scope.PatientFirstNameError = true;
                    $scope.isBlankField = true;
                    return
                }
                else if (LastName == "" || angular.isUndefined(LastName)) {
                    $scope.message = objResource.msgEntLastName;
                    $scope.PatientLastNameError = true;
                    $scope.isBlankField = true;
                    return
                }
                
               else if (!UnitID && UnitID !== 0) {
                    $scope.message = objResource.msgSelClinic;
                    $scope.PatientUnitIDIdError = true;
                    $scope.isBlankField = true;
                return
               }


                else if (!DepartmentID && DepartmentID !== 0) {
                    $scope.message = objResource.msgSelDepartment ;
                    $scope.PatientDepartmentIdError = true;
                    $scope.isBlankField = true;
                  return
                }

                else if (!DoctorName && DoctorName !== 0) {
                    $scope.message =  objResource.msgSelDoctor;
                    $scope.PatientDoctorError = true;
                    $scope.isBlankField = true;
                    return
                }
                else if (PatientGenderId == 0) {
                    $scope.message = objResource.msgSelGender;
                    $scope.PatientGenderIdError = true;
                    $scope.isBlankField = true;
                     return
                }
                else if (PatientselectedCountry == "") {
                    $scope.message = objResource.msgSelCountryCode;
                    $scope.PatientMobileCountryCodeError = true;
                    $scope.isBlankField = true;
                   return
                }

                else if (PatientMobileNumber == "" || angular.isUndefined(PatientMobileNumber)) {
                    $scope.message = objResource.lblValidMobNo;
                    $scope.PatientMobileNumberError = true;
                    $scope.isBlankField = true;
                   return
                }
                else if (PatientVisitId === "" || PatientVisitId === 0) {
                    $scope.message = objResource.lblEnterAppointmentReason;
                    $scope.PatientVisitIdError = true;
                    $scope.isBlankField = true;
                    return
                }
                else if (DOB == "" || DOB == null) {
                    debugger;
                    if (IsNewPatient == 1) {
                        $scope.message = "Please entered DOB in valid format.";
                        $scope.PatientDOBError = true;
                        $scope.isBlankField = true;
                    }

                }
               
                //else if (IsNewPatient == 1 && DOB != $scope.formats[0]) {                   
                //    $scope.message = "Please entered DOB in valid format.";
                //    $scope.PatientDOBError = true;
                //    $scope.isBlankField = true;
                //}
            }
            else{

               if (!UnitID && UnitID !== 0) {
                    $scope.message = objResource.msgSelClinic;
                    $scope.PatientUnitIDIdError = true;
                    $scope.isBlankField = true;
                   return
               }


                else if (!DepartmentID && DepartmentID !== 0) {
                    $scope.message = objResource.msgSelDepartment ;
                    $scope.PatientDepartmentIdError = true;
                    $scope.isBlankField = true;
                     return
                }

                else if (!DoctorName && DoctorName !== 0) {
                    $scope.message =  objResource.msgSelDoctor;
                    $scope.PatientDoctorError = true;
                    $scope.isBlankField = true;
                    return
                }

                else if (FirstName == "" || angular.isUndefined(FirstName)) {
                    $scope.message =  objResource.msgPleaseselectpatient;
                    $scope.PatientFirstNameError = true;
                    $scope.isBlankField = true;
                  return
                }
             
                else if (PatientVisitId === "" || PatientVisitId === 0) {
                    $scope.message = objResource.lblEnterAppointmentReason;
                    $scope.PatientVisitIdError = true;
                    $scope.isBlankField = true;
                    return
                }

                 else{
                     $scope.isBlankField = false;
                     $scope.message = ""
                }

             
            }
               

   }





$scope.save = function(){
console.log(">>>>>>>>>>>>>>>>>>>>>>>> Save"   , $scope.PatientRegistration   ,  $scope.newAppointmentDetailsFromList  , $scope.RegisteredPatient, $scope.IsNewPatient );
 // usSpinnerService.spin('GridSpinner');
 $scope.combinedObject = {
  ...$scope.PatientRegistration,
  ...$scope.newAppointmentDetailsFromList,
  ...$scope.RegisteredPatient
  };


  $scope.combinedObject.timedifference = new Date().getTimezoneOffset();

  $scope.combinedObject.selectedMRNo =  $scope.selectedMRNo
  $scope.combinedObject.RegID = $rootScope.RegID
  $scope.combinedObject.RegUnitID = $rootScope.RegUnitID


  $scope.validateNewAppointmentFields( $scope.combinedObject.FirstName,  $scope.combinedObject.LastName, $scope.combinedObject.PatientGenderId, $scope.combinedObject.PatientselectedCountry, $scope.combinedObject.PatientMobileNumber, $scope.combinedObject.PatientVisitId, $scope.combinedObject.selectedMRNo,  $scope.combinedObject.DOB, $scope.IsNewPatient , $scope.combinedObject.UnitID , $scope.combinedObject.DepartmentID , $scope.combinedObject.DoctorName);


if(!$scope.isBlankField){

   $scope.GetDoctorAvailableTime($scope.combinedObject.fromTime , $scope.combinedObject.DOCID , $scope.combinedObject.DepartmentID , $scope.combinedObject.UnitID  )  ; // get doctor slot

}
   // $scope.validateNewAppointmentFields( $scope.combinedObject.FirstName,  $scope.combinedObject.LastName, $scope.combinedObject.PatientGenderId, $scope.combinedObject.PatientselectedCountry, $scope.combinedObject.PatientMobileNumber, $scope.combinedObject.PatientVisitId, $scope.combinedObject.selectedMRNo,  $scope.combinedObject.DOB, $scope.IsNewPatient , $scope.combinedObject.UnitID , $scope.combinedObject.DepartmentID , $scope.combinedObject.DoctorName);

   // $scope.combinedObject.doctorAvailableStartTime = $scope.DoctorAvailableTime[0].StartTime;
  //  $scope.combinedObject.doctorAvailableEndTime = $scope.DoctorAvailableTime[0].EndTime;




   //$scope.BookNewAppointment($scope.combinedObject);



}




$scope.BookNewAppointment = function(Data){

console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> Data " , Data)

   var AddNewAppointmentResponse = AppointmentService.AddNewAppointment(Data.fromTime, Data.toTime , Data.doctorFirstName, Data.doctorMiddleName || "", Data.doctorLastName, Data.doctorAvailableStartTime, Data.doctorAvailableEndTime, Data.FirstName , "" , Data.LastName , Data.DepartmentID , Data.PatientGenderId, Data.PatientselectedCountry || 0, Data.PatientMobileNumber, Data.PatientVisitId, Data.Remarks || "", Data.selectedMRNo, Data.DOB, Data.UnitName , Data.RegID, Data.RegUnitID, Data.timedifference);
   
      AddNewAppointmentResponse.then(function (AddResponse) {
                                 if (AddResponse.data.value == 1) {
                                        usSpinnerService.stop('GridSpinner');
                                                                   
                                 
                                       
                                    
                                       
                                        $scope.closeAppointmentPopUp();


                                        $rootScope.RegID = "";
                                        $rootScope.RegUnitID = "";
                                     
                                    }
                                    else {
                                        usSpinnerService.stop('GridSpinner');                                                                  
                                        AlertMessage.error(objResource.msgTitle, objResource.msgAlreadyBookedAppointment);                                    
                                    }

                                }, function (error) {
                                    usSpinnerService.stop('GridSpinner');
                                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                            });


}


















 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    $scope.active = 0;
    if (localStorageService.get("UserInfo")) { $scope.FilterUnitID = localStorageService.get("UserInfo").UnitID; }
    $scope.IsHideNewPatientDiv = false;
    $scope.cellCounterForDoctorAvailableSlotCSS = true;
    $scope.cellCounterForDoctorAvailableSlotCSS2 = false;
    $scope.cellCounterForDoctorAvailableSlotCSS3 = false;
    $scope.cellCounterForDoctorAvailableSlotCSS4 = false;
    $scope.todayDateValue = new Date();
    $scope.todayDateValue = $scope.todayDateValue.getDate();
    $scope.timeSlotTestCases = ''
    vm.doctors = [];
    $rootScope.IsNewPatientValidationHide = 1;
    vm.doctorsAvailableSlotsList = [];
    vm.calendarView = 'day';
    vm.selectedDoctorFullName = '';
    vm.selectedDepartmentId = ''
    vm.selectedDepartmentId = '';
    vm.selectedPatientMRNo = '';
    vm.selectedUnitName = '';
    vm.selectedTime = '';
    $scope.selectedMRNo = '';
    $scope.IsNewPatient = 1;
    $scope.RescheduleAppointment = {};
    vm.date = new Date();
    vm.date1 = new Date();
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    vm.todayDate = new Date();
    $scope.disableLink = 'disabledLink'
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.FormName = 'Appointment Calendar';
    $scope.dataLoaded = false;
    //Appointment Date

    $scope.dateOptionsDOB = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };





   $scope.dateOptionsDOA = {
        formatYear: 'yyyy',  
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };





    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };


    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };




    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };

    $scope.popup3 = {
        opened: false
    };


    $scope.dateOptionsReschedule = {
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    vm.viewDate = new Date();
    $scope.isTimeIncrement = false;
    $scope.isCalenderCall = false;
    $scope.doctorAvailablityCheckOnSelectedDate = false;
    $scope.doctorAvailablityCheck = false;
    $scope.startTimeVariable = '';
    $scope.endTimeVariable = '';
    $scope.displayOnce = false;


    $scope.PatientRegistration = {};
    $scope.RegisteredPatient = {};
    $scope.PatientDeletion = {};

    $scope.PatientDeletion.PatientGenderDescription = '';
    $scope.PatientDeletion.PatientMobileNumber = '';
    $scope.PatientDeletion.AppointmentReason = '';

    $scope.options = { GenderId: 0, GenderDescription: '' };
    $scope.options.GenderId = 0;
    $scope.options.GenderDescription = '';
    $scope.PatientRegistration.PatientGenderId = 0;
    $scope.RegisteredPatient.FirstName = '';
    $scope.RegisteredPatient.LastName = '';


    $scope.options = { PRFIXID: 0, Description: '' };
    $scope.options.PRFIXID = 0;
    $scope.options.Description = '';
    $scope.RegisteredPatient.PrefixID = 0;

    debugger;
    $scope.PatientselectedCountry = '';
    $scope.PatientRegistration.PatientMobileNumber = '';
    $scope.PatientGenderIdError = false;
    $scope.PatientDOBError = false;
    $scope.slotCount = 0;

    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    //Added By Ikram For Reset Button Functionality
    $scope.Reset = function () {
        $scope.IsGenderDisable = false;
        $scope.IsLastNameDisable = false;
        $scope.IsFirstNameDisable = false;
        $scope.IsMobileNoDisable = false;
        $scope.IsCountryCodeDisable = false;
        $scope.PatientSearchText = '';
        $scope.PatientRegistration.PatientGenderId = '';
        $scope.RegisteredPatient.FirstName = '';
        $scope.RegisteredPatient.LastName = '';
        debugger;
        $scope.PatientselectedCountry = '';
        $scope.PatientRegistration.PatientMobileNumber = '';
        $scope.PatientRegistration.PatientVisitId = '';
        $scope.selectedMRNo = '';
        $scope.Remarks = '';
    }

    //Added By Ikram For Cancel Button Functionality
    $scope.CancelClicked = function CancelClicked() {
        ngDialog.close();
    }


    $scope.closeAppointmentPopUp = function () {
         $uibModalInstance.close('Modal closed with result');
    }



   $scope.dismissAppointmentPopUp = function () {
        $uibModalInstance.dismiss('cancel');
    }














    //Normal Search functionality

    $scope.NormalSearch = function (Appointment) {
        // vm.PatientAppointmentOnChangeParam();
        vm.onTimeSet(vm.date, false);

    };

    //Added BY Ikram To Get Appointment Data 
    $scope.GetAppointmentDetails = function GetAppointmentDetails(isCalenderCall, isReschduleCall) {

        debugger;
        $scope.dataLoaded = false;
        if (angular.isUndefined($scope.UnitID) || $scope.UnitID == "")
            var UnitID = 0
        else
            var UnitID = $scope.UnitID;
        if (angular.isUndefined($scope.DeptID) || $scope.DeptID == "")
            var DeptID = 0;
        else
            var DeptID = $scope.DeptID;
        if (angular.isUndefined($scope.DOCID) || $scope.DOCID == "")
            var DOCID = 0
        else
            var DOCID = $scope.DOCID;



    if(Intl.DateTimeFormat().resolvedOptions().timeZone == "Asia/Calcutta" ) {
        if (isCalenderCall && isReschduleCall === false) {//For INDIA Time Zone
            var enteredDate = moment(vm.viewDate).add(1,'day').toDate();
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        }    
        else {
              var enteredDate = vm.viewDate;
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        }
       
    }else{// For UK Time Zone
        if (isCalenderCall && isReschduleCall === false) {
            var enteredDate = moment(vm.viewDate).add('day').toDate();
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        }
        else {
              var enteredDate = vm.viewDate;
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        }

    }
            

 

         //Uncomment 
         console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
        
       

        if (isReschduleCall) {
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
            //  vm.date = moment(vm.changedViewDate).format('DD MMM YYYY');
        }

        var searchedDate = new Date();
        searchedDate = vm.viewDate;
        $scope.searchedDateDayId = searchedDate.getDay();
       
       if (isCalenderCall && $scope.isCalenderClick === true) { 
            $scope.searchedDateDayId = $scope.searchedDateDayId +1;
        }
       if ($scope.searchedDateDayId === 0) {
           $scope.searchedDateDayId = 7
        }
        


        var responseData = AppointmentService.GetData(enteredDate, DOCID, DeptID, UnitID);
        responseData.then(function (Response) {
            debugger;
            usSpinnerService.spin('GridSpinner');
            $scope.AppointmentDetails = Response.data.value;
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
                    debugger;
                    for (var j = 0 ; j < vm.doctors.length ; j++) {
                        var PatientFullName = obj.PatientFirstName + ' ' + obj.PatientMiddleName + ' ' + obj.PatientLastName;
                        var res = obj.PatientFirstName + ' ' + obj.PatientLastName;
                        if (vm.doctors[j].FirstName === obj.FirstName && vm.doctors[j].LastName === obj.LastName) {

                            flag = true;
                            vm.doctors[j].events.push({
                                title: PatientFullName,
                                startsAt: moment().year($scope.appointmentStartYear).month($scope.appointmentStartMonth - 1).date($scope.appointmentStartDate).hour($scope.appointmentStartHour).minute($scope.appointmentStartMinute).second($scope.appointmentStartSecond).toDate(),
                                endsAt: moment().year($scope.appointmentEndYear).month($scope.appointmentEndMonth - 1).date($scope.appointmentEndDate).hour($scope.appointmentEndHour).minute($scope.appointmentEndMinute).second($scope.appointmentEndSecond).toDate(),
                                color: calendarConfig.colorTypes.important,
                                draggable: true,
                                resizable: true,
                                isCancelled: obj.IsCancelled,
                                actions: actions,
                                StartTime: obj.StartTime,
                                EndTime: obj.EndTime,
                                DoctorPhoto: obj.DoctorPhoto,
                                GenderId: obj.GenderId,

                            });
                            vm.doctors[j].Index = vm.doctors[j].events.length + 1
                        }
                    }

                    if (!flag) {
                        var PatientFullName = obj.PatientFirstName + ' ' + obj.PatientMiddleName + ' ' + obj.PatientLastName;
                        vm.doctors.push({
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
                            Index: 1,
                            DoctorPhoto: obj.DoctorPhoto,
                            GenderId: obj.GenderId,
                            events: [{
                                title: PatientFullName,
                                startsAt: moment().year($scope.appointmentStartYear).month($scope.appointmentStartMonth - 1).date($scope.appointmentStartDate).hour($scope.appointmentStartHour).minute($scope.appointmentStartMinute).second($scope.appointmentStartSecond).toDate(),
                                endsAt: moment().year($scope.appointmentEndYear).month($scope.appointmentEndMonth - 1).date($scope.appointmentEndDate).hour($scope.appointmentEndHour).minute($scope.appointmentEndMinute).second($scope.appointmentEndSecond).toDate(),
                                color: calendarConfig.colorTypes.important,
                                draggable: true,
                                resizable: true,
                                isCancelled: obj.IsCancelled,
                                actions: actions,
                                StartTime: obj.StartTime,
                                EndTime: obj.EndTime
                            }],

                        });
                    }
                }

            });
            //console.log(vm.doctors);
            debugger;
            if (vm.doctors.length > 4) {
                vm.nslides = 4;
                vm.btmd = 3;
            }
            else if (vm.doctors.length === 4) {
                vm.nslides = 4;
                vm.btmd = 3;
            }
            else if (vm.doctors.length === 3) {
                vm.nslides = 3;
                vm.btmd = 4;
            }
            else if (vm.doctors.length === 2) {
                vm.nslides = 2;
                vm.btmd = 6;
            }
            else if (vm.doctors.length === 1) {
                vm.nslides = 1;
                vm.btmd = 12;
            }

            for (var i = 0; i < vm.doctors.length; i++) {
                vm.doctors[i].events.forEach(function (event) {
                    if (event.isCancelled) {
                        debugger;
                        event.color = "#FFA07A";
                    }
                    else {
                        event.color = colorTypes[i];
                    }

                });
            }
            // $scope.ErrorMsg = Response.data.Resultstatus;
            usSpinnerService.stop('GridSpinner');
            $scope.dataLoaded = true;
            // $scope.$apply();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            // AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };


    //Change patient New and Existing
    $scope.ChangePatient = function () {
        debugger;
        $scope.RegisteredPatient.FirstName = '';
        $scope.RegisteredPatient.LastName = '';
        $scope.PatientRegistration.PatientMobileNumber = '';
        $scope.PatientselectedCountry = '';
        $scope.PatientRegistration.Remarks = '';
        $scope.PatientRegistration.DOB = '';
        $scope.PatientRegistration.PatientVisitId = 0;
        if ($scope.IsNewPatient == 1) {
            $scope.IsHideNewPatientDiv = false
            $scope.IsHideForExitsPatient = false;
            $rootScope.IsNewPatientValidationHide = 1;
            var selectedMRNo = null;
        }

        else if ($scope.IsNewPatient == 2) {
            $scope.IsHideForExitsPatient = true;
            $rootScope.IsNewPatientValidationHide = 2;
        }

    }

    $scope.GetDoctorName = function GetDoctorName(DOCID, FromWhere) {
        debugger;
        $scope.doctorsAvailableSlotsList = [];
        var selectedIndex = $scope.DoctorCategoryListForReschedule.map(function (obj) { return obj.ID; }).indexOf(parseInt(DOCID));
        vm.selectedDoctorFullName = $scope.DoctorCategoryListForReschedule[selectedIndex].DoctorName;
        if (FromWhere == 'FromControl') {
            $scope.selectedTime = undefined;
            $scope.LoadAppointmentTimeSlot();
        }
    };

    $scope.LoadAppointmentTimeSlot = function LoadAppointmentTimeSlot() {
        debugger;
        $scope.isCalenderClick = true;
        //  vm.selectedDoctorFullName = "";
        if (vm.selectedDoctorFullName === "") //  added as when clicking GetAppoinmnetslots button  doctor name gets empty.
        {
            var selectedIndex = $scope.DoctorCategoryListForReschedule.map(function (obj) { return obj.ID; }).indexOf(parseInt($scope.DOCID));
            vm.selectedDoctorFullName = $scope.DoctorCategoryListForReschedule[selectedIndex].DoctorName;
        }

        var ScheduleDate = new Date($scope.rescheduleDate);
        ScheduleDate.setHours(0, 0, 0, 0);
        $scope.onRescheduleTimeSet(ScheduleDate, null);
    };

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
    $scope.getAvailableSlotsModifiedd = function (AppInputList) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var GetAvailableSlotResponse = AppointmentService.GetAvailableAppointmentSlotsModified(AppInputList);
        GetAvailableSlotResponse.then(function (AvailableSlotResponse) {
            debugger;

            for (var i = 0; i < AvailableSlotResponse.data.length; i++) {


                if (AvailableSlotResponse.data[i].status == 3) {

                    var availableStartSlotClicked = new Date(AvailableSlotResponse.data[i].timeslots);
                    var availableEndSlotClicked = new Date(AvailableSlotResponse.data[i + 1].timeslots);
                    vm.selectedAvailableSlot = vm.formatAMPM(availableStartSlotClicked) + ' to ' + vm.formatAMPM(availableEndSlotClicked);
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
                            SelectedAvailableSlot: vm.selectedAvailableSlot,
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
    $scope.getAvailableSlots = function (startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var GetAvailableSlotResponse = AppointmentService.GetAvailableAppointmentSlotsModified(startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName);
        GetAvailableSlotResponse.then(function (AvailableSlotResponse) {
            debugger;
            if (AvailableSlotResponse.data.value == 3) {
                var availableStartSlotClicked = new Date(startDate);
                var availableEndSlotClicked = new Date(endDate);
                vm.selectedAvailableSlot = vm.formatAMPM(availableStartSlotClicked) + ' to ' + vm.formatAMPM(availableEndSlotClicked);
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
                        SelectedAvailableSlot: vm.selectedAvailableSlot,
                        CountOfAvailableSlotButton: $scope.countOfAvailableSlotButton
                    });
                }
                else {
                    // $scope.rescheduleMessageAcknoledgement = "Appointment Slot Not Available For The Selected Date ,Please Select Future Dates";
                }
            }
            else if (AvailableSlotResponse.data.value == 2) {
                // alert("Appointment is not Available in this Time Slot" + startDate + "" + endDate);
            }
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
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


    $scope.onRescheduleTimeSet = function (ndate, odate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $scope.displayOnce = false;
        $scope.timeSlotCountr = 0;
        $scope.doctorAvailablityCheckOnSelectedDate = false;
        $scope.doctorAvailablityCheck = false;
        $scope.doctorsAvailableSlotsList = [];
        $scope.rescheduleMessageAcknoledgement = "";
        $scope.timeSlotTestCases = ''

        vm.rescheduleDate = moment(ndate).format('DD MMM YYYY');
        vm.rescheduleViewDate = ndate;

        var enteredDate = moment(vm.rescheduleViewDate).add(1, 'day').toDate();
        var searchedDate = new Date();
        searchedDate = vm.rescheduleViewDate;
        $scope.rescheduleSearchedDateDayId = searchedDate.getDay();

        if ($scope.isCalenderClick === true) {
            $scope.rescheduleSearchedDateDayId = $scope.rescheduleSearchedDateDayId + 1;
        }
        if ($scope.rescheduleSearchedDateDayId === 0) {
            $scope.rescheduleSearchedDateDayId = 7;
        }

        $scope.dayOfRescheduleViewDate = enteredDate.toString().substring(8, 10);
        $scope.monthOfRescheduleViewDate = enteredDate.getMonth();

        var UnitID, DeptID, DOCID; /* Changed for load correct schedule details : DB */

        if (angular.isUndefined($scope.UnitID) || $scope.UnitID == "")
            UnitID = 0
        else
            UnitID = $scope.UnitID;
        if (angular.isUndefined($scope.DeptID) || $scope.DeptID == "")
            DeptID = 0;
        else
            DeptID = $scope.DeptID;
        if (angular.isUndefined($scope.DOCID) || $scope.DOCID == "")
            DOCID = 0
        else
            DOCID = $scope.DOCID;

        var rescheduleResponseData = AppointmentService.GetData(enteredDate, DOCID, DeptID, UnitID);
        rescheduleResponseData.then(function (RescheduleResponse) {
            usSpinnerService.stop('GridSpinner');
            $scope.RescheduleAppointmentDetails = RescheduleResponse.data.value;

            if ($scope.RescheduleAppointmentDetails.length == 0) {
                $scope.rescheduleMessageAcknoledgement = objResource.msgNoDoctorAvailableOnThisDay;
                AlertMessage.warning(objResource.msgTitle, $scope.rescheduleMessageAcknoledgement);
            }
            else {
                angular.forEach($scope.RescheduleAppointmentDetails, function (obj) {

                    var originalDoctorFullName = vm.selectedDoctorFullName.split(" ");
                    var originalDoctorFirstName = originalDoctorFullName[2];
                    var originalDoctorLastName = originalDoctorFullName[4];


                    if (obj.FirstName == originalDoctorFirstName && obj.LastName == originalDoctorLastName) {
                        $scope.DayId = obj.DayID;
                        $scope.DoctorInterval = obj.DoctorInterval;

                        if ($scope.DayId == $scope.rescheduleSearchedDateDayId) {
                            $scope.doctorAvailablityCheckOnSelectedDate = true;
                        }
                    }
                });

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


                //angular.forEach($scope.RescheduleAppointmentDetails, function (obj) {

                angular.forEach(uniqueDates, function (obj) {
                    debugger;
                    var originalDoctorFullName = vm.selectedDoctorFullName.split(" ");
                    var originalDoctorFirstName = originalDoctorFullName[0];
                    var originalDoctorLastName = originalDoctorFullName[1];
                    var tempdayOfRescheduleViewDate = $scope.dayOfRescheduleViewDate;
                    var tempmonthOfRescheduleViewDate = $scope.monthOfRescheduleViewDate;
                    if (obj.FirstName == originalDoctorFirstName && obj.LastName == originalDoctorLastName) {
                        $scope.DayId = obj.DayID;
                        $scope.DoctorInterval = obj.DoctorInterval;
                        // $scope.dayOfRescheduleViewDate1 = '';
                        // $scope.monthOfRescheduleViewDate1 = '';
                        if ($scope.DayId == $scope.rescheduleSearchedDateDayId) {

                            tempdayOfRescheduleViewDate = tempdayOfRescheduleViewDate - 1;
                            if (tempdayOfRescheduleViewDate == 0)
                                tempdayOfRescheduleViewDate = 1;

                            tempmonthOfRescheduleViewDate = tempmonthOfRescheduleViewDate + 1;
                            if (tempdayOfRescheduleViewDate < 10) {
                                tempdayOfRescheduleViewDate = '0' + tempdayOfRescheduleViewDate; //$scope.dayOfRescheduleViewDate1 = $scope.dayOfRescheduleViewDate;
                                if (parseInt(tempmonthOfRescheduleViewDate) < 10)
                                    tempmonthOfRescheduleViewDate = '0' + tempmonthOfRescheduleViewDate; //   $scope.monthOfRescheduleViewDate1 = '0' + $scope.monthOfRescheduleViewDate;
                            }
                            var updatedStartDayTimeSlot = obj.StartTime.toString().substring(8, 10);
                            var updatedEndDayTimeSlot = obj.EndTime.toString().substring(8, 10);
                            var updatedStartMonthTimeSlot = obj.StartTime.toString().substring(5, 7);
                            var updatedEndMonthTimeSlot = obj.EndTime.toString().substring(5, 7);

                            var changedStartTimeSlot = obj.StartTime.toString().replace(updatedStartDayTimeSlot, tempdayOfRescheduleViewDate);
                            var changedEndTimeSlot = obj.EndTime.toString().replace(updatedEndDayTimeSlot, tempdayOfRescheduleViewDate);

                            changedStartTimeSlot = changedStartTimeSlot.replace(updatedStartMonthTimeSlot, tempmonthOfRescheduleViewDate);
                            changedEndTimeSlot = changedEndTimeSlot.replace(updatedEndMonthTimeSlot, tempmonthOfRescheduleViewDate);

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
                            //angular.forEach($scope.timeSlotTestCases, function (availableTimeSlotLst) {

                            //    $scope.getAvailableSlots($scope.timeSlotTestCases[$scope.timeSlotCountr], $scope.timeSlotTestCases[$scope.timeSlotCountr + 1], obj.FirstName, obj.MiddleName, obj.LastName);

                            //    $scope.timeSlotCountr = $scope.timeSlotCountr + 1;
                            //});
                        }
                    }
                    else if ($scope.displayOnce === false && $scope.doctorAvailablityCheckOnSelectedDate === false) {
                        $scope.displayOnce = true;
                        $scope.rescheduleMessageAcknoledgement = vm.selectedDoctorFullName + ' ' + objResource.msgDoctorNotAvailable;
                        AlertMessage.warning(objResource.msgTitle, $scope.rescheduleMessageAcknoledgement);
                    }
                });
            }
        });
    }
    $scope.ClearSlots = function () {
        debugger;
        $scope.countOfAvailableSlotButton = 0;
        $scope.doctorsAvailableSlotsList = [];
    }
    //Added By Ikram For Adding Edit and Cancel Button Within Event View Of Calendar
    var actions = [
        {
            //Added By Ikram For Providing Functionality Of Edit Button Functionality
            label: '<i class=\'glyphicon glyphicon-pencil\' title=\'Reschedule\'></i>',
            onClick: function (args) {
                debugger;
                usSpinnerService.spin('GridSpinner');
                console.log('Edited', args.calendarEvent);
                debugger;
                var timedifference = new Date().getTimezoneOffset();
                var RescheduleCurrentEventResponse = AppointmentService.DeleteCurrentEvent(args.calendarEvent.title, args.calendarEvent.startsAt, args.calendarEvent.endsAt, 0, '',timedifference);
                RescheduleCurrentEventResponse.then(function (RescheduleResponse) {
                    vm.doctorsAvailableSlotsList = [];
                    $scope.RescheduleAppointment = {};
                    $scope.rescheduleMessageAcknoledgement = "";
                    var currentPatientDetailForDeletion = RescheduleResponse.data.value;
                    //$scope.Reschedule.rescheduleDate = '';
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
                    $scope.Reason = objResource.lblReason;

                    $scope.btnCancel = objResource.btnCancel;
                    $scope.btnSave = objResource.btnSave;
                    $scope.lblTime = objResource.lblTime;
                    $scope.lblDate = objResource.lblDate;
                    $scope.lblMRNO = objResource.lblMRNO;
                    $scope.lblDoctor = objResource.lblDoctor;
                    $scope.lblDepartment = objResource.lblDepartment;
                    $scope.lblClinic = objResource.lblClinic;
                    debugger;
                    if (args.calendarEvent.startsAt < new Date()) {
                        AlertMessage.error(objResource.msgTitle,objResource.msgLapsedAppointment);//Appointment time has Lapsed :: Modified by swatih for localization on 13/7/2020                        usSpinnerService.stop('GridSpinner');
                        return;
                    }


                    debugger;
                    if (currentPatientDetailForDeletion.length != 0) {
                        if (angular.isDefined(currentPatientDetailForDeletion[0].Department)) {
                            vm.selectedUnitName = currentPatientDetailForDeletion[0].Department;
                            vm.selectedDepartmentId = currentPatientDetailForDeletion[0].Department;
                        }
                    }




                    //DepartmentId
                    //DOCID
                    //unitID

                    vm.selectedDoctorFullName = currentPatientDetailForDeletion[0].DocFullName;
                    $scope.firstDateClicked = new Date(args.calendarEvent.startsAt);
                    $scope.lastDateClicked = new Date(args.calendarEvent.endsAt);
                    if (angular.isDefined($scope.firstDateClicked) && angular.isDefined($scope.lastDateClicked)) {
                        $scope.selectedTime = vm.formatAMPM($scope.firstDateClicked) + ' to ' + vm.formatAMPM($scope.lastDateClicked);
                    }
                    $scope.selectedPatientMRNo = currentPatientDetailForDeletion[0].MRNo;
                    $scope.FirstName = currentPatientDetailForDeletion[0].PatientFirstName;
                    $scope.LastName = currentPatientDetailForDeletion[0].PatientLastName;
                    $scope.PatientGenderDescription = currentPatientDetailForDeletion[0].GenderDescription;
                    $scope.PatientMobileNumber = currentPatientDetailForDeletion[0].PatientMobileNumber;
                    $scope.AppointmentReason = currentPatientDetailForDeletion[0].AppointmentReason;
                    $scope.GenderId = currentPatientDetailForDeletion[0].GenderId;
                    $scope.PatientMobileConId = '+' + currentPatientDetailForDeletion[0].PatientselectedCountryCode + ' ';
                    $scope.Age = currentPatientDetailForDeletion[0].Age + ' yrs /';
                    $scope.rescheduleDate = $scope.firstDateClicked;
                    $scope.rescheduleDate.setHours(0, 0, 0, 0);
                    debugger;
                    $scope.UnitID = currentPatientDetailForDeletion[0].UnitID;
                    $scope.DeptID = currentPatientDetailForDeletion[0].DepartmentId;
                    debugger;
                    vm.rescheduleDate = new Date();
                    $scope.DOCID = currentPatientDetailForDeletion[0].DOCID;
                    $scope.DOB = new Date(currentPatientDetailForDeletion[0].DOB);

                    $scope.PatientMobileConIdNonReg = currentPatientDetailForDeletion[0].PatientselectedCountryCode;
                    $scope.AppReasonID = currentPatientDetailForDeletion[0].AppReasonID; //currentPatientDetailForDeletion[0].VTID;
                    $scope.AppID = currentPatientDetailForDeletion[0].AppID;
                    //code change by manohar
                    $scope.ScheduleTimeList = [];
                    $scope.active = [];
                    //Function called to Get DoctorName
                    //vm.rescheduleDate = $scope.firstDateClicked;

                    $scope.onRescheduleTimeSet($scope.rescheduleDate, null);

                    /* Load Department based on Unit */
                    vm.GetDepartmentByUnitIDForReschedule($scope.UnitID, 'FromLoad');

                    //show hide  DIV  base on MRNO
                    if (currentPatientDetailForDeletion[0].MRNo != "" || currentPatientDetailForDeletion[0].MRNo != null)
                        $scope.IsRegisterPatient = true;
                    else
                        $scope.IsRegisterPatient = false;

                    if (currentPatientDetailForDeletion[0].IsCancelled) {
                        debugger;
                        AlertMessage.error(objResource.msgTitle, objResource.msgUpdateCancelledAppointment);

                    }
                    else {

                        $scope.initializeDeleteVariables = function () {
                            $scope.rescheduleMessageAcknoledgement = " ";
                        }

                        ngDialog.open({
                            template: 'RescheduleAppointment.html',
                            scope: $scope,
                            closeByDocument: false,
                            controller: function () {
                                $scope.countOfAvailableSlotButton = 0;
                                //Added By Ikram For Getting Available Slots of Doctor Appointment
                                vm.ClearSlots = function () {
                                    debugger;
                                    $scope.countOfAvailableSlotButton = 0;
                                    $scope.doctorsAvailableSlotsList = [];
                                }
                                vm.getAvailableSlotsModified = function (AppInputList) {
                                    debugger;
                                    usSpinnerService.spin('GridSpinner');
                                    var GetAvailableSlotResponse = AppointmentService.GetAvailableAppointmentSlotsModified(AppInputList);
                                    GetAvailableSlotResponse.then(function (AvailableSlotResponse) {
                                        usSpinnerService.stop('GridSpinner');

                                        for (var i = 0; i < AvailableSlotResponse.data.length; i++) {


                                            if (AvailableSlotResponse.data[i].status == 3) {

                                                var availableStartSlotClicked = new Date(AvailableSlotResponse.data[i].timeslots);
                                                var availableEndSlotClicked = new Date(AvailableSlotResponse.data[i + 1].timeslots);
                                                vm.selectedAvailableSlot = vm.formatAMPM(availableStartSlotClicked) + ' to ' + vm.formatAMPM(availableEndSlotClicked);
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
                                                        SelectedAvailableSlot: vm.selectedAvailableSlot,
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
                                vm.getAvailableSlots = function (startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName) {
                                    debugger;
                                    usSpinnerService.spin('GridSpinner');
                                    var GetAvailableSlotResponse = AppointmentService.GetAvailableAppointmentSlotsModified(startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName);
                                    GetAvailableSlotResponse.then(function (AvailableSlotResponse) {
                                        usSpinnerService.stop('GridSpinner');

                                        if (AvailableSlotResponse.data.value == 3) {
                                            var availableStartSlotClicked = new Date(startDate);
                                            var availableEndSlotClicked = new Date(endDate);
                                            vm.selectedAvailableSlot = vm.formatAMPM(availableStartSlotClicked) + ' to ' + vm.formatAMPM(availableEndSlotClicked);
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
                                                vm.doctorsAvailableSlotsList.push({
                                                    FirstName: doctorFirstName,
                                                    MiddleName: doctorMiddleName,
                                                    LastName: doctorLastName,
                                                    StartTime: startDate,
                                                    EndTime: endDate,
                                                    SelectedAvailableSlot: vm.selectedAvailableSlot,
                                                    CountOfAvailableSlotButton: $scope.countOfAvailableSlotButton
                                                });
                                            }
                                            else {
                                                // $scope.rescheduleMessageAcknoledgement = "Appointment Slot Not Available For The Selected Date ,Please Select Future Dates";
                                            }
                                        }
                                        else if (AvailableSlotResponse.data.value == 2) {
                                            // alert("Appointment is not Available in this Time Slot" + startDate + "" + endDate);
                                        }
                                        usSpinnerService.stop('GridSpinner');
                                    }, function (error) {
                                        usSpinnerService.stop('GridSpinner');
                                    });
                                };

                                //Added By Ikram For Getting Available Slots In Required Format
                                vm.getTimeSlots = function intervals(startString, endString) {
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
                                                    //alert("Please select time slot after or before time slot selected or within one hour");
                                                }
                                            }
                                        } else {
                                            AlertMessage.error(objResource.msgTitle, objResource.msgSelectOnlyOneHour);
                                            //alert("You can select only one hour time slot");
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

                                //Added By Ikram For Validating Data Entered Within Reschedule View
                                $scope.validateRescheduleAppointment = function () {
                                    if (vm.rescheduleDate == "") {
                                        //$scope.rescheduleMessageAcknoledgement = objResource.msgRescheduleMsgAck;
                                        usSpinnerService.stop('GridSpinner');
                                        AlertMessage.warning(objResource.msgTitle, objResource.msgRescheduleMsgAck);
                                    }
                                    else {
                                        usSpinnerService.stop('GridSpinner');
                                        AlertMessage.warning(objResource.msgTitle, objResource.msgSelectTimeSlot);
                                    }
                                }


                                //Added By Ikram For Providing Reschedule Functionality
                                $scope.rescheduleAppointment = function (DOCID, UnitID, DeptID, AppID, AppReasonID) {
                                    usSpinnerService.spin('GridSpinner');
                                    debugger;
                                    if (ValidateRescheduleFunctionality(DOCID, UnitID, DeptID, AppID, AppReasonID)) {
                                        debugger;
                                        $scope.ScheduleDateTimeList = [];

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
                                            debugger;
                                            var timedifference = new Date().getTimezoneOffset();
                                            var RescheduleCurrentEventResponse = AppointmentService.RescheduleCurrentEvent($scope.selectedSlotStartTime, $scope.selectedSlotEndTime, $scope.FirstName, $scope.LastName, $scope.PatientMobileNumber, 2, $scope.Remark, DOCID, DeptID, AppID, UnitID, AppReasonID,timedifference);
                                            RescheduleCurrentEventResponse.then(function (RescheduleResponse) {
                                                debugger;
                                                AlertMessage.success(objResource.msgTitle, objResource.msgRescheduleSuccess);
                                                vm.viewDate = $scope.firstDateClicked;
                                                ngDialog.close();
                                                flag = false;
                                                $scope.isCalenderClick = true;
                                                vm.doctors = [];
                                                $scope.AppointmentDetails = '';
                                                vm.init();
                                                //$scope.GetAppointmentDetails(true, true);
                                                usSpinnerService.stop('GridSpinner');

                                            }, function (error) {
                                                usSpinnerService.stop('GridSpinner');
                                            });

                                        }

                                    } else {
                                        usSpinnerService.stop('GridSpinner');
                                        AlertMessage.warning(objResource.msgTitle, objResource.msgSelectAllMandatoryFields);
                                    }
                                }

                                function ValidateRescheduleFunctionality(DOCID, UnitID, DeptID, AppID, AppReasonID) {
                                    debugger;
                                    var IsValid = true;

                                    if (angular.isUndefined($scope.rescheduleDate)) {
                                        IsValid = false; /* Check valid date or not as well*/
                                    } else if (angular.isUndefined($scope.UnitID) || $scope.UnitID == 0) {
                                        IsValid = false;
                                    } else if (angular.isUndefined(DeptID) || DeptID == 0) {
                                        IsValid = false;
                                    } else if (angular.isUndefined($scope.DOCID) || $scope.DOCID == 0) {
                                        IsValid = false;
                                    } else if (angular.isUndefined($scope.rescheduleDate) || $scope.rescheduleDate == "") {
                                        IsValid = false;
                                    } else if (angular.isUndefined(AppReasonID) || AppReasonID == 0) {
                                        IsValid = false;
                                    }

                                    return IsValid;
                                }

                                //Added By Ikram For Providing Functionality On Date Change Within Reschedule Event
                                vm.onRescheduleTimeSet = function (ndate, odate) {
                                    debugger;
                                    $scope.displayOnce = false;
                                    $scope.timeSlotCountr = 0;
                                    $scope.doctorAvailablityCheckOnSelectedDate = false;
                                    $scope.doctorAvailablityCheck = false;
                                    vm.doctorsAvailableSlotsList = [];
                                    $scope.rescheduleMessageAcknoledgement = "";
                                    vm.rescheduleDate = moment(ndate).format('DD MMM YYYY');
                                    vm.rescheduleViewDate = ndate;
                                    var enteredDate = moment(vm.rescheduleViewDate).add(1,'day').toDate();
                                    var searchedDate = new Date();
                                    searchedDate = vm.rescheduleViewDate;
                                    $scope.rescheduleSearchedDateDayId = searchedDate.getDay();

                                    if ($scope.isCalenderClick === true) {
                                        $scope.rescheduleSearchedDateDayId = $scope.rescheduleSearchedDateDayId + 1;
                                    }
                                    if ($scope.rescheduleSearchedDateDayId === 0) {
                                        $scope.rescheduleSearchedDateDayId = 7;
                                    }

                                    $scope.dayOfRescheduleViewDate = enteredDate.toString().substring(8, 10);
                                    $scope.monthOfRescheduleViewDate = enteredDate.getMonth();
                                    var tempdayOfRescheduleViewDate = $scope.dayOfRescheduleViewDate;
                                    var tempmonthOfRescheduleViewDate = $scope.monthOfRescheduleViewDate;

                                    var rescheduleResponseData = AppointmentService.GetData(enteredDate, 0, 0, 0);
                                    //var rescheduleResponseData = AppointmentService.GetData(enteredDate);
                                    rescheduleResponseData.then(function (RescheduleResponse) {
                                        $scope.RescheduleAppointmentDetails = RescheduleResponse.data.value;

                                        if ($scope.RescheduleAppointmentDetails.length == 0) {
                                            $scope.rescheduleMessageAcknoledgement = objResource.msgNoDoctorAvailableOnThisDay;
                                            AlertMessage.warning(objResource.msgTitle, $scope.rescheduleMessageAcknoledgement);
                                        }
                                        else {
                                            angular.forEach($scope.RescheduleAppointmentDetails, function (obj) {

                                                var originalDoctorFullName = vm.selectedDoctorFullName.split(" ");
                                                var originalDoctorFirstName = originalDoctorFullName[2];
                                                var originalDoctorLastName = originalDoctorFullName[4];


                                                if (obj.FirstName == originalDoctorFirstName && obj.LastName == originalDoctorLastName) {
                                                    $scope.DayId = obj.DayID;
                                                    $scope.DoctorInterval = obj.DoctorInterval;

                                                    if ($scope.DayId == $scope.rescheduleSearchedDateDayId) {
                                                        $scope.doctorAvailablityCheckOnSelectedDate = true;
                                                    }
                                                }
                                            });

                                            angular.forEach($scope.RescheduleAppointmentDetails, function (obj) {

                                                var originalDoctorFullName = vm.selectedDoctorFullName.split(" ");
                                                var originalDoctorFirstName = originalDoctorFullName[2];
                                                var originalDoctorLastName = originalDoctorFullName[4];


                                                if (obj.FirstName == originalDoctorFirstName && obj.LastName == originalDoctorLastName) {
                                                    $scope.DayId = obj.DayID;
                                                    $scope.DoctorInterval = obj.DoctorInterval;
                                                    // $scope.dayOfRescheduleViewDate1 = '';
                                                    // $scope.monthOfRescheduleViewDate1 = '';
                                                    if ($scope.DayId == $scope.rescheduleSearchedDateDayId) {
                                                        tempdayOfRescheduleViewDate = tempdayOfRescheduleViewDate - 1;
                                                        if (tempdayOfRescheduleViewDate == 0)
                                                            tempdayOfRescheduleViewDate = 1;
                                                        tempdayOfRescheduleViewDate = tempdayOfRescheduleViewDate + 1;
                                                        if (tempdayOfRescheduleViewDate < 10) {
                                                            tempdayOfRescheduleViewDate = '0' + tempdayOfRescheduleViewDate; //  $scope.dayOfRescheduleViewDate1 = '0' + $scope.dayOfRescheduleViewDate;
                                                            if (parseInt(tempmonthOfRescheduleViewDate) < 10)
                                                                tempmonthOfRescheduleViewDate = '0' + tempmonthOfRescheduleViewDate; //  $scope.dayOfRescheduleViewDate1 = '0' + $scope.dayOfRescheduleViewDate;
                                                        }
                                                        var updatedStartDayTimeSlot = obj.StartTime.toString().substring(8, 10);
                                                        var updatedEndDayTimeSlot = obj.EndTime.toString().substring(8, 10);
                                                        var updatedStartMonthTimeSlot = obj.StartTime.toString().substring(5, 7);
                                                        var updatedEndMonthTimeSlot = obj.EndTime.toString().substring(5, 7);

                                                        var changedStartTimeSlot = obj.StartTime.toString().replace(updatedStartDayTimeSlot, tempdayOfRescheduleViewDate);
                                                        var changedEndTimeSlot = obj.EndTime.toString().replace(updatedEndDayTimeSlot, tempdayOfRescheduleViewDate);

                                                        changedStartTimeSlot = changedStartTimeSlot.replace(updatedStartMonthTimeSlot, tempmonthOfRescheduleViewDate);
                                                        changedEndTimeSlot = changedEndTimeSlot.replace(updatedEndMonthTimeSlot, tempmonthOfRescheduleViewDate);

                                                        $scope.timeSlotTestCases = vm.getTimeSlots(changedStartTimeSlot, changedEndTimeSlot);
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

                                                        vm.getAvailableSlotsModified(tempAppInput);

                                                        //angular.forEach($scope.timeSlotTestCases, function (availableTimeSlotLst) {
                                                        //    vm.getAvailableSlots($scope.timeSlotTestCases[$scope.timeSlotCountr], $scope.timeSlotTestCases[$scope.timeSlotCountr +1], obj.FirstName, obj.MiddleName, obj.LastName);
                                                        //    $scope.timeSlotCountr = $scope.timeSlotCountr +1;
                                                        //});
                                                    }
                                                }
                                                else if ($scope.displayOnce === false && $scope.doctorAvailablityCheckOnSelectedDate === false) {
                                                    $scope.displayOnce = true;
                                                    $scope.rescheduleMessageAcknoledgement = vm.selectedDoctorFullName + objResource.msgDoctorNotAvailable;
                                                    AlertMessage.warning(objResource.msgTitle, $scope.rescheduleMessageAcknoledgement);
                                                }
                                            });
                                        }
                                    }, function (error) {
                                        usSpinnerService.stop('GridSpinner');
                                    });
                                }
                                usSpinnerService.stop('GridSpinner');
                            }
                        });
                    }
                    usSpinnerService.stop('GridSpinner');
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                });
            }
        },
        {
            //Added By Ikram For Providing Functionality Of Delete Button Functionality
            label: '<i class=\'glyphicon glyphicon-remove\' title=\'Cancel\'></i>',
            onClick: function (args) {

                usSpinnerService.spin('GridSpinner');
                var timedifference = new Date().getTimezoneOffset();
                var DeleteCurrentEventResponse = AppointmentService.DeleteCurrentEvent(args.calendarEvent.title, args.calendarEvent.startsAt, args.calendarEvent.endsAt, 0, '',timedifference);
                DeleteCurrentEventResponse.then(function (DeleteResponse) {
                    usSpinnerService.stop('GridSpinner');
                    var currentPatientDetailForDeletion = DeleteResponse.data.value;
                    $scope.lblRemark = objResource.lblRemark;
                    $scope.lblMobNo = objResource.lblMobNo;
                    $scope.lblGender = objResource.lblGender;
                    $scope.lblLastName = objResource.lblLastName;
                    $scope.lblFirst = objResource.lblFirst;
                    $scope.btnSearch = objResource.btnSearch;
                    $scope.deleteMessageAcknoledgement = "";

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
                    $scope.Reason = objResource.lblReason;
                    debugger;
                    if (angular.isDefined(currentPatientDetailForDeletion[0].Department)) {
                        vm.selectedUnitName = currentPatientDetailForDeletion[0].Department;
                        vm.selectedDepartmentId = currentPatientDetailForDeletion[0].Department;
                    }



                    vm.selectedDoctorFullName = currentPatientDetailForDeletion[0].DocFullName;
                    var firstDateClicked = new Date(args.calendarEvent.startsAt);
                    var lastDateClicked = new Date(args.calendarEvent.endsAt);
                    // $scope.selectedTime = $scope.formatAMPM(firstDateClicked + ' to ' + lastDateClicked);

                    if (firstDateClicked < new Date()) {
                        AlertMessage.error(objResource.msgTitle,objResource.msgLapsedAppointmentCannotCancel);//You cannot cancel Lapsed Appointment :: Modified by swatih for localization 0n 13/7/2020
                        return;
                    }

                    if (angular.isDefined(firstDateClicked) && angular.isDefined(lastDateClicked)) {
                        $scope.selectedTime = vm.formatAMPM(firstDateClicked) + ' to ' + vm.formatAMPM(lastDateClicked);
                    }
                    //vm.selectedTime = vm.formatAMPM(firstDateClicked) + ' to ' + vm.formatAMPM(lastDateClicked);
                    $scope.selectedPatientMRNo = currentPatientDetailForDeletion[0].MRNo;
                    $scope.FirstName = currentPatientDetailForDeletion[0].PatientFirstName;
                    $scope.LastName = currentPatientDetailForDeletion[0].PatientLastName;
                    $scope.PatientGenderDescription = currentPatientDetailForDeletion[0].GenderDescription;
                    $scope.PatientMobileNumber = currentPatientDetailForDeletion[0].PatientMobileNumber;
                    $scope.AppointmentReason = currentPatientDetailForDeletion[0].AppointmentReason;
                    $scope.GenderId = currentPatientDetailForDeletion[0].GenderId;
                    $scope.PatientMobileConId = '+' + currentPatientDetailForDeletion[0].PatientMobileConId + ' ';
                    $scope.Age = currentPatientDetailForDeletion[0].Age + ' yrs /';
                    $scope.DepartmentId = currentPatientDetailForDeletion[0].DepartmentId;
                    $scope.DOCID = currentPatientDetailForDeletion[0].DOCID;
                    $scope.DOB = new Date(currentPatientDetailForDeletion[0].DOB);
                    //  $scope.AppID = currentPatientDetailForDeletion[0].AppID;
                    $scope.PatientMobileConIdNonReg = currentPatientDetailForDeletion[0].PatientMobileConId;


                    //code change by manohar
                    $scope.ScheduleTimeList = [];
                    $scope.active = [];


                    //show hide  DIV  base on MRNO
                    if (currentPatientDetailForDeletion[0].MRNo != "" && currentPatientDetailForDeletion[0].MRNo != null)
                        $scope.IsRegisterPatient = true;
                    else
                        $scope.IsRegisterPatient = false;

                    if (currentPatientDetailForDeletion[0].IsCancelled) {
                        AlertMessage.error(objResource.msgTitle, objResource.msgUpdateCancelledAppointment);
                    }
                    else {

                        $scope.initializeDeleteVariables = function () {
                            $scope.deleteMessageAcknoledgement = "";
                        }


                        ngDialog.open({
                            template: 'DeleteAppointment.html',
                            scope: $scope,
                            closeByDocument: false,
                            controller: function () {

                                $scope.deleteAppointment = function (ReasonForCancellation) {
                                    debugger;
                                    if (ReasonForCancellation == undefined) {
                                        $scope.deleteMessageAcknoledgement = objResource.msgDeleteMessageAck;
                                    }
                                    else {
                                          var timedifference = new Date().getTimezoneOffset();
                                        var DeleteCurrentEventResponse = AppointmentService.DeleteCurrentEvent(args.calendarEvent.title, args.calendarEvent.startsAt, args.calendarEvent.endsAt, 1, ReasonForCancellation,timedifference);
                                        DeleteCurrentEventResponse.then(function (DeleteResponse) {
                                            vm.doctors = [];
                                            // alert(objResource.msgDeleteSuccess);
                                            AlertMessage.success(objResource.msgTitle, objResource.msgDeleteSuccess);
                                            $scope.GetAppointmentDetails(true, false);
                                            console.log('Deleted', args.calendarEvent);
                                            ngDialog.close();
                                        }, function (error) {
                                        });
                                    }

                                }

                            }
                        });
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                });
            }
        }];

    //Added By Ikram For Providing Colors to Calendar Events
    var colorTypes = [
        {
            primary: '#1e90ff',
            secondary: '#d1e8ff'
        },
        {
            primary: '#ad2121',
            secondary: '#fae3e3'
        },
        {
            primary: '#e3bc08',
            secondary: '#fdf1ba'
        },
        {
            primary: '#1b1b1b',
            secondary: '#c1c1c1'
        },
        {
            primary: '#800080',
            secondary: '#ffe6ff'
        },
        {
            primary: '#006400',
            secondary: '#caffca'
        }
    ];

    //Added By Ikram For Getting Country Code and Corresponding Contry Id
    $scope.SelectedCountry = function (selectedCountry) {
        debugger;
        $scope.selectedCountry = selectedCountry.CountryCode;
        $scope.PatientRegistration.PatientselectedCountryID = '+' + selectedCountry.CountryID;

        //For validation of error message
        if (!angular.isUndefined($scope.PatientRegistration.PatientselectedCountryID) && $scope.PatientRegistration.PatientselectedCountryID != null) {
            $scope.PatientMobileCountryCodeError = false;
        } else {
            $scope.PatientMobileCountryCodeError = false;
        }
    }

    //Added By Ikram For Getting Country List Based On Provided Country Id
    $scope.GetPatientCountryCode = function GetPatientCountryCode(selectedCountry) {
        debugger;
        if (selectedCountry == undefined) { selectedCountry = '' }
        usSpinnerService.spin('GridSpinner');
        var Promise = DoctorService.GetCountryCode(selectedCountry, false);
        Promise.then(function (Response) {
            $scope.CountryList = Response.data.value;
            //console.log($scope.CountryList);
            // vm.CountryList1 = Response.data.value;
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            $scope.Message = "Error" + error.status;
            usSpinnerService.stop('GridSpinner');
        });
    };

    //Added By Ikram For Getting Auto Dropdown List Based On Provided Name / MRN / Mobile Number
    $scope.GetSearchItemData = function GetSearchItemData(searchItem) {
        debugger;
        $scope.autoSearchList = [];
        if (searchItem.length >= 2) {
            var SearchItemDataResponse = AppointmentService.GetSearchItemData(searchItem);
            SearchItemDataResponse.then(function (SearchItemResponse) {
                $scope.autoSearchList = SearchItemResponse.data.value;
            }, function (error) {
                $scope.Message = "Error" + error.status;
            });
        }
    };


    $scope.changePrefixType = function () {
        // var ResponseData = Common.getMasterList('M_Preffixmaster', 'PRFIXID', 'Description');
        //ResponseData.then(function (Response) {
        debugger;
        //if (!$scope.isPatientSearch)
        //Response.data.splice(0, 0, {
        //  ID: 0, Description: "Select"
        //   });
        //else
        //    Response.data.splice(0, 0, {
        //        ID: 0, Description: "Prefix Type"
        //    });  
        //$scope.Patient.PrefixID = 0;
        //$scope.Partner.PrefixID = 0;

        debugger;
        var ResponseData = Common.getMasterList('M_Preffixmaster', 'PRFIXID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, {
                ID: 0, Description: "Select"
            });
            $scope.PrefixTypeList = Response.data;

        }, function (error) {
        });



    }



    //Added By Ikram For Filling The Details of Selected Patient In Corresponding Labels From Auto Dropdown List
    $scope.FillSelectedItems = function FillSelectedItems(obj) {
          console.log(obj);
        debugger;
        $scope.IsHideNewPatientDiv = true;
        $scope.PatientSearchText = obj.PatientFirstName + ' ' + obj.PatientMiddleName + ' ' + obj.PatientLastName;
        $scope.selectedMRNo = obj.MRNo;
        $rootScope.PatientFullName = obj.PatientFullName;
        var ExistingPatient = $rootScope.PatientFullName;
        var ExistingPatientName = ExistingPatient.split(" ");
      //  $scope.RegisteredPatient.FirstName = ExistingPatientName[1];
     //   $scope.RegisteredPatient.LastName = ExistingPatientName[3];

        $scope.RegisteredPatient.FirstName = obj.FirstName;
        $scope.RegisteredPatient.LastName = obj.LastName;


        //$scope.RegisteredPatient.FirstName = obj.PatientFirstName;
        //$scope.RegisteredPatient.LastName = obj.PatientLastName;
        $scope.options = [{ 'GenderId': parseInt(obj.GenderId), 'GenderDescription': obj.GenderDescription }]
        $scope.PatientRegistration.PatientGenderId = $scope.options[0].GenderId;
        $scope.PatientRegistration.PatientGenderDescription = $scope.options[0].GenderDescription;
        debugger;
        var MobileNumber = obj.MobileNo;
        var MobileNo = MobileNumber.split(" ");


       // $scope.PatientselectedCountry = MobileNo[0];
       // $scope.PatientRegistration.PatientMobileNumber = MobileNo[1];

        $scope.PatientselectedCountry = obj.MobileCountryCode;
        $scope.PatientRegistration.PatientMobileNumber = obj.Contact;
        $scope.PatientRegistration.PatientselectedCountry = $scope.PatientselectedCountry;

        $scope.PatientRegistration.DOB = obj.DOB;
        $rootScope.RegID = obj.RegID;
        $rootScope.RegUnitID = obj.RegUnitID;
        $scope.PatientRegistration.Age = obj.Age + ' yrs/ ' + obj.Gender;
        $scope.PatientSearchText = null;
        // $scope.PatientSearchText = '';
        //$scope.IsGenderDisable = true;
        //$scope.IsLastNameDisable = true;
        //$scope.IsFirstNameDisable = true;
        //$scope.IsMobileNoDisable = true;
        //$scope.IsCountryCodeDisable = true;
    };

    //Added By Ikram For Validation
    $scope.HideErrorMessage = function (field, patientPRFIXID) {
        if (field == 'PatientFirstName') {
            if (!angular.isUndefined(patientPRFIXID) && patientPRFIXID != null && patientPRFIXID != "") {
                $scope.PatientFirstNameError = false;
            } else {
                $scope.PatientFirstNameError = true;
            }
        }

        if (field == 'PatientLastName') {
            if (!angular.isUndefined(patientPRFIXID) && patientPRFIXID != null && patientPRFIXID != "") {
                $scope.PatientLastNameError = false;
            } else {
                $scope.PatientLastNameError = true;
            }
        }

        if (field == 'PatientGenderId') {
            if (angular.isUndefined($scope.PatientRegistration.PatientGenderId) || $scope.PatientRegistration.PatientGenderId == 0 || $scope.PatientRegistration.PatientGenderId == null) {
                $scope.PatientRegistration.PatientGenderIdError = true;
            }
            else {
                $scope.PatientRegistration.PatientGenderIdError = false;
            }

        }

        if (field == 'PatientMobileNumber') {
            if (!angular.isUndefined(patientPRFIXID) && patientPRFIXID != null && patientPRFIXID != "") {
                $scope.PatientMobileNumberError = false;
            } else {
                $scope.PatientMobileNumberError = true;
            }
        }

        if (field == 'PatientVisitId') {
            if (angular.isUndefined($scope.PatientRegistration.PatientVisitId) || $scope.PatientRegistration.PatientVisitId == 0 || $scope.PatientRegistration.PatientVisitId == null) {
                $scope.PatientRegistration.PatientVisitIdError = true;
            }
            else {
                $scope.PatientRegistration.PatientVisitIdError = false;
            }

        }
    }

    //Added By Ikram For OnClick Of Parent Date Selection of Main View
    vm.onTimeSet = function (ndate, odate) {
        debugger;

        if (moment(ndate).format('DD MMM YYYY') == moment(vm.todayDate).format('DD MMM YYYY'))
            $scope.disableLink = 'disabledLink';
        else
            $scope.disableLink = ''

        $scope.isCalenderClick = true;
        $scope.isTimeIncrement = true;
        $scope.isCalenderCall = true;
        vm.doctors = [];
        flag = false;
        vm.viewDate = ndate;
        vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        vm.date = new Date(moment(ndate).format('DD MMM YYYY'));
        if (odate !== null) {
            $scope.GetAppointmentDetails($scope.isCalenderCall, false);
        }

    }

    vm.PatientAppointmentOnChangeParam = function () {
        debugger;

        usSpinnerService.spin('GridSpinner');
        $scope.isCalenderClick = true;
        $scope.isTimeIncrement = true;
        $scope.isCalenderCall = true;
        vm.doctors = [];
        flag = false;
        //vm.viewDate = ndate;
        vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        // vm.date = moment(vm.viewDate).format('DD MMM YYYY');
        $scope.GetAppointmentDetails($scope.isCalenderCall, false);
    };


    //Added By Ikram For Next Button Click Functionality
    vm.onTimeIncrement = function () {
        usSpinnerService.spin('GridSpinner');
        debugger;
    if(Intl.DateTimeFormat().resolvedOptions().timeZone == "Asia/Calcutta" ){
        if ($scope.isTimeIncrement) {  // For INDIA Time Zone
            vm.viewDate = moment(vm.viewDate).add(1, 'day').toDate();
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
            $scope.isCalenderCall = false; 
        }
         
    }
    else{   // For UK Time Zone
        if ($scope.isTimeIncrement) {
            vm.viewDate = moment(vm.changedViewDate).add(1, 'day').toDate();
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        }
    }
       

        vm.doctors = [];
       //  flag = true;
       //vm.cellIsOpen = true;
        flag = false;
        vm.cellIsOpen = false;
        $scope.GetAppointmentDetails($scope.isCalenderCall, false);
    if(Intl.DateTimeFormat().resolvedOptions().timeZone == "Asia/Calcutta" ){
    // For INDIA Time Zone

        if ($scope.isTimeIncrement) {
            vm.viewDate = moment(vm.viewDate).subtract(1, 'day').toDate();
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        }
    }
        debugger;
        if (moment(vm.viewDate).format('DD MMM YYYY') == moment(vm.todayDate).format('DD MMM YYYY'))
            $scope.disableLink = 'disabledLink';
        else
            $scope.disableLink = ''
    }

    //Added By Ikram For Previous Button Click Functionality
    vm.onTimeDecrement = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
    if(Intl.DateTimeFormat().resolvedOptions().timeZone == "Asia/Calcutta" ){
        if ($scope.isTimeIncrement) {//For INDIA Time Zone
            vm.viewDate = moment(vm.viewDate).add(1, 'day').toDate();
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
            $scope.isCalenderCall = false;
        }

    }
    else {
    // For UK Time Zone
        if ($scope.isTimeIncrement) {
            vm.viewDate = moment(vm.changedViewDate).subtract(1, 'day').toDate();
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        }
    }
    
        vm.doctors = [];
       //  flag = true;
       //vm.cellIsOpen = true;
        flag = false;
        vm.cellIsOpen = false;
        $scope.GetAppointmentDetails($scope.isCalenderCall, false);
    if(Intl.DateTimeFormat().resolvedOptions().timeZone == "Asia/Calcutta" ){
    // For INDIA Time Zone
        if ($scope.isTimeIncrement) {
            vm.viewDate = moment(vm.viewDate).subtract(1, 'day').toDate();
            vm.changedViewDate = moment(vm.viewDate).format('DD MMM YYYY');
        }
    }
        debugger;
        if (moment(vm.viewDate).format('DD MMM YYYY') == moment(vm.todayDate).format('DD MMM YYYY'))
            $scope.disableLink = 'disabledLink';
        else
            $scope.disableLink = ''
    }

    //Added By Ikram For Filling Language Resource Data Within View Properties
    $scope.getResourceNameValue = function () {
        debugger;
        $scope.lblRemark = objResource.lblRemark;
        $scope.lblMobNo = objResource.lblMobNo;
        $scope.lblGender = objResource.lblGender;
        $scope.lblLastName = objResource.lblLastName;
        $scope.lblFirst = objResource.lblFirst;
        $scope.btnSearch = objResource.btnSearch;

        $rootScope.RegID = "";
        $rootScope.RegUnitID = "";

        $scope.lblAppointmentReason = objResource.lblAppointmentReason;
        $scope.lblRefresh = objResource.lblRefresh;
        $scope.lblNewAppointment = objResource.lblNewAppointment;
        debugger;
        $scope.btnCancel = objResource.btnCancel;
        $scope.btnSave = objResource.btnSave;
        $scope.lblTime = objResource.lblTime;
        $scope.lblDate = objResource.lblDate;
        $scope.lblMRNO = objResource.lblMRNO;
        $scope.lblDoctor = objResource.lblDoctor;
        $scope.lblDepartment = objResource.lblDepartment;
        $scope.lblClinic = objResource.lblClinic;
        $scope.GetPatientCountryCode('');
        $scope.GetPatientDetailsFromPatient(false);

        $scope.GetClinicDetails();

        $scope.fillGenderTypeList();
        $scope.changePrefixType();

        $scope.GetPatientVisitReasonList();
    }


$scope.GetPatientVisitReasonList = function () {

    var PatientVisitListResponse = AppointmentService.GetPatientVisitList();
        PatientVisitListResponse.then(function (AvailableVisitTypeResponse) {
            debugger;
            $scope.PatientVisitList = AvailableVisitTypeResponse.data.value;
            AvailableVisitTypeResponse.data.value.splice(0, 0, { VTID: 0, Description: 'Select' });

        }, function (error) {
        });

}






/*-------------------------------------------------------------------------------------------------------*/


    $scope.GetClinicDetails = function () {

            usSpinnerService.spin('GridSpinner');
 
    var CityAndClinicNamesResponse = AppointmentService.GetCityAndClinicNames();
        CityAndClinicNamesResponse.then(function (CityAndClinicResponse) {
  
            $scope.ClinicListForAppointment = CityAndClinicResponse.data.value;

             const selectedUnitID = localStorageService.get("UserInfo").UnitID ;

              if(selectedUnitID){
                    $scope.SelectedUnit = $scope.ClinicListForAppointment.find(unit => unit.UnitID === selectedUnitID );
                    

                     $scope.newAppointmentDetailsFromList.UnitID = $scope.SelectedUnit.UnitID;
                     $scope.newAppointmentDetailsFromList.UnitName  = $scope.SelectedUnit.UnitName;


                    $scope.GetDepartmentByUnitIDForAppointment($scope.newAppointmentDetailsFromList.UnitID);
               }
  
                 
           
                    
           usSpinnerService.stop('GridSpinner');          

        }, function (error) {
             usSpinnerService.stop('GridSpinner');
        });

   }

 // localStorageService.get("UserInfo").UnitID;

$scope.onChangeClinic = function (Unit){

      $scope.newAppointmentDetailsFromList.UnitID   = Unit.UnitID;
      $scope.newAppointmentDetailsFromList.UnitName   = Unit.UnitName;
    console.warn("-----------------------------------------", Unit ,$scope.newAppointmentDetailsFromList);


      $scope.newAppointmentDetailsFromList.DepartmentID   = 0 ;
      $scope.newAppointmentDetailsFromList.DepartmentName   = '';

      $scope.newAppointmentDetailsFromList.DOCID   = 0;
      $scope.newAppointmentDetailsFromList.DoctorName   = '';
      $scope.newAppointmentDetailsFromList.doctorFirstName   = '';
      $scope.newAppointmentDetailsFromList.doctorLastName   = '';
      $scope.DoctorListForAppointment = []
    $scope.GetDepartmentByUnitIDForAppointment(Unit.UnitID); // get DepartmentList As per clinic
}

$scope.onChangeDepartment = function (Department){

      $scope.newAppointmentDetailsFromList.DepartmentID   = Department.DeptID;
      $scope.newAppointmentDetailsFromList.DepartmentName   = Department.Description;
      console.warn("-----------------------------------------", Department ,$scope.newAppointmentDetailsFromList);

      $scope.newAppointmentDetailsFromList.DOCID   = 0;
      $scope.newAppointmentDetailsFromList.DoctorName   = '';
      $scope.newAppointmentDetailsFromList.doctorFirstName   = '';
      $scope.newAppointmentDetailsFromList.doctorLastName   = '';

      $scope.getDocLIstByDeptIDForAppointment(Department.DeptID);   // get Doctor List by DeptID
}



$scope.onDOAchange = function (){

      $scope.newAppointmentDetailsFromList.DepartmentID   = 0 ;
      $scope.newAppointmentDetailsFromList.DepartmentName   = '';

      $scope.newAppointmentDetailsFromList.DOCID   = 0;
      $scope.newAppointmentDetailsFromList.DoctorName   = '';
      $scope.newAppointmentDetailsFromList.doctorFirstName   = '';
      $scope.newAppointmentDetailsFromList.doctorLastName   = '';
      $scope.DoctorListForAppointment = []
      $scope.GetDepartmentByUnitIDForAppointment($scope.newAppointmentDetailsFromList.UnitID); // get DepartmentList As per clinic

}








$scope.onChangeDoctor = function (Doctor){

      $scope.newAppointmentDetailsFromList.DOCID   = Doctor.ID;
      $scope.newAppointmentDetailsFromList.DoctorName   = Doctor.DoctorName;

      $scope.newAppointmentDetailsFromList.doctorFirstName   = Doctor.FirstName;
      $scope.newAppointmentDetailsFromList.doctorLastName   = Doctor.LastName;




      console.warn("-----------------------------------------", Doctor ,$scope.newAppointmentDetailsFromList);
}



$scope.GetDoctorAvailableTime = function (enteredDate , DOCID , DeptID , UnitID) {
        usSpinnerService.spin('GridSpinner');
  
        var responseData = AppointmentService.GetData(enteredDate, DOCID, DeptID, UnitID);;
        responseData.then(function (Response) { 

               $scope.DoctorAvailableTime  = Response.data.value;
            
               $scope.combinedObject.doctorAvailableStartTime = $scope.DoctorAvailableTime[0].StartTime;
               $scope.combinedObject.doctorAvailableEndTime = $scope.DoctorAvailableTime[0].EndTime;


               $scope.BookNewAppointment($scope.combinedObject);

             console.warn(">>>>>>>>>>>>>>>>>>>>>>>>" , Response.data.value);
        
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');   
            AlertMessage.error(objResource.msgTitle, objResource.msgError);        
        });


};



$scope.GetDepartmentByUnitIDForAppointment = function (ID) {
        usSpinnerService.spin('GridSpinner');
  
        var responseData = DoctorService.GetDepartmentListForDoc(ID);
        responseData.then(function (Response) { 
  
            $scope.DepartmentListForAppointment = Response.data.value; 

             console.warn(">>>>>>>>>>>>>>>>>>>>>>>>" , $scope.DepartmentListForAppointment);
        
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');           
        });


};



$scope.getDocLIstByDeptIDForAppointment = function (DeptID){
      var responseData = UserService.GetDocListByDeptID(DeptID ,  $scope.newAppointmentDetailsFromList.DOA);
        responseData.then(function (Response) {
    
            $scope.DoctorListForAppointment = Response.data;
          
            usSpinnerService.stop('GridSpinner');

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            // AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
}


















/*------------------------------------------------------------------------------------------------------*/

    //Used for patient search for Appointment
    $scope.GetPatientDetailsFromPatient = function GetPatientDetailsFromPatient(IsAppSearch) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $scope.selectedPatientFromPatient = "";
        debugger;
        $scope.RegUnitID = localStorageService.get("UserInfo").UnitID;
        $scope.PatientList = [];
        var Promise = PatientVisitService.GetPatientDetails($scope.selectedPatientFromPatient, IsAppSearch, $scope.RegUnitID);
        Promise.then(function (Response) {
            $scope.PatientList = Response.data.lstPatientAutoComplete;
            $scope.IsDisableSearch = false; //Added by AniketK on 28Nov2019
            usSpinnerService.stop('GridSpinner');
            debugger;
            if ($scope.PatientDataFromReg != undefined) {
                sessionStorage.setItem("SavedPatientData", JSON.stringify($scope.PatientList[0]));
                $scope.BindData();
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Message = "Error" + error.status;
        });

    };

    ////Used for appointment search
    //$scope.GetPatientDetailsFromApp = function GetPatientDetailsFromApp(IsAppSearch) {
    //    debugger;
    //    $rootScope.IsAppSearch = IsAppSearch;
    //    var IsAppSearch = $rootScope.IsAppSearch
    //    $scope.$emit('GetPatientDetailsFromApp', { IsAppSearch: IsAppSearch });

    //}

    //Added By Ikram For Initialization Of Entities
    vm.init = function () {
        debugger;
        var CityAndClinicNamesResponse = AppointmentService.GetCityAndClinicNames();
        CityAndClinicNamesResponse.then(function (CityAndClinicResponse) {
            debugger;
            CityAndClinicResponse.data.value.splice(0, 0, { UnitID: 0, UnitName: objResource.lblClinic });
            $scope.CityAndClinicNameList = CityAndClinicResponse.data.value;
            if (true) {
                $scope.UnitID = $scope.FilterUnitID;
                /* Get filtered doctor schedules */
                //vm.PatientAppointmentOnChangeParam();
            }
            $scope.CityAndClinicNameListToReschedule = CityAndClinicResponse.data.value;
        }, function (error) {
        });
        var PatientVisitListResponse = AppointmentService.GetPatientVisitList();
        PatientVisitListResponse.then(function (AvailableVisitTypeResponse) {
            debugger;
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
        $scope.fillGenderTypeList();
        $scope.changePrefixType();  // added sujata  for appointment

        vm.GetDepartmentByUnitID(localStorageService.get("UserInfo").UnitID);
        vm.GetDoctorListByDeptID(0);
        vm.GetDepartmentByUnitIDForReschedule(0, 'FromLoad');
        vm.GetDoctorListByDeptIDForReschedule(0, 'FromLoad');
        var todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0)

        vm.onTimeSet(todayDate, null);


    }
  $scope.fillGenderTypeList = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_GenderMaster', 'GenderId', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, {
                ID: 0, Description: "Select"
            });
            $scope.GenderTypeList = Response.data;

        }, function (error) {
        });
    }

    vm.GetDoctorListByDeptID = function GetDoctorListByDeptID(DeptID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(DeptID) || DeptID == "") DeptID = 0;
        debugger;
        var responseData = UserService.GetDocListByDeptID(DeptID);
        responseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, DoctorName: objResource.lblDoctor });
            $scope.DoctorCategoryList = Response.data;
            if ($scope.DOCID == undefined || $scope.DOCID == "") {
                $scope.DOCID = 0;
            }
            usSpinnerService.stop('GridSpinner');

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            // AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });


    };


    vm.GetDoctorListByDeptIDForReschedule = function GetDoctorListByDeptIDForReschedule(DeptID, FromWhere) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = UserService.GetDocListByDeptID(DeptID);
        responseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, DoctorName: objResource.lblDoctor });
            $scope.DoctorCategoryListForReschedule = Response.data;
            if (angular.isUndefined($scope.DOCID)) {
                $scope.DOCID = $scope.DoctorCategoryListForReschedule[0].ID;
            }
            if ($scope.DoctorCategoryListForReschedule.length == 1) {
                $scope.DOCID = 0;
            }
            if (FromWhere == 'FromControl') {
                $scope.selectedTime = undefined;
                $scope.doctorsAvailableSlotsList = [];
                usSpinnerService.stop('GridSpinner');
            }
            //$scope.LoadAppointmentTimeSlot();
        }, function (error) {

        });

    };


    //$scope.GetRoleList = function GetRoleList() {
    //    var responseData = UserService.GetRoleList();
    //    responseData.then(function (Response) {
    //        //  debugger;
    //        if (angular.isDefined(sessionStorage['newpage'])) {
    //            Response.data.splice(0, 0, { RoleId: 0, Description: objResource.lblSelect });
    //            sessionStorage.removeItem('newpage');
    //        }
    //        else {
    //            $scope.UserTypeList = [
    //            { ID: 0, Type: objResource.lblUserType },
    //            {
    //                ID: 1, Type: 'Doctor'
    //            },
    //            {
    //                ID: 2, Type: 'Employee'
    //            },
    //            ];
    //            Response.data.splice(0, 0, { RoleId: 0, Description: objResource.lblRole });
    //        }
    //        $scope.RoleList = Response.data;
    //        $scope.User.Role = $scope.RoleList[0];
    //        $scope.UL.UsrRole = $scope.RoleList[0].RoleId;
    //    }, function (error) {
    //        AlertMessage.error(objResource.msgTitle, objResource.msgError);
    //    });
    //}

    vm.GetDepartmentByUnitID = function GetDepartmentByUnitID(CityAndClinicName) {
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(CityAndClinicName) || CityAndClinicName == "")
            CityAndClinicName = 0;
        var responseData = DoctorService.GetDepartmentListForDoc(CityAndClinicName);
        debugger;
        responseData.then(function (Response) {
            debugger;
            Response.data.value.splice(0, 1);
            Response.data.value.splice(0, 0, { ID: 0, Description: objResource.lblDepartment });
            if (Response.data.value.length > 0) {
                $scope.DepartmentList = Response.data.value;
            }
            if (true) {
                $scope.DeptID = 0;
            }
            if ($scope.FilterUnitID > 0) {

                vm.PatientAppointmentOnChangeParam();
            }
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            // AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });


    };


    vm.GetDepartmentByUnitIDForReschedule = function GetDepartmentByUnitIDForReschedule(CityAndClinicName, FromWhere) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(CityAndClinicName) || CityAndClinicName == "") { CityAndClinicName = 0; }
        //Code change by manohar Temp for testing
        var responseData = Common.GetDeptIDByUnitIDFOrAppointment(CityAndClinicName);
        //var responseData = DoctorService.GetDepartmentListForDoc(CityAndClinicName);
        debugger;
        responseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: objResource.lblDepartment });
            if (Response.data.length > 0) {
                $scope.DepartmentListForReschedule = Response.data;

                var IsDeptIDPresentCheck = $filter('filter')($scope.DepartmentListForReschedule, { ID: $scope.DeptID }, true);
                if (IsDeptIDPresentCheck == 0) {
                    $scope.DeptID = $scope.DepartmentListForReschedule[0].ID;
                }
            }
            if (Response.data.length == 1) {
                $scope.DeptID = $scope.DepartmentListForReschedule[0].ID;
                vm.GetDoctorListByDeptIDForReschedule($scope.DeptID, 'FromLoad');
            }
            if (FromWhere == 'FromControl') {
                $scope.selectedTime = undefined;
                $scope.doctorsAvailableSlotsList = [];
            }

            vm.GetDoctorListByDeptIDForReschedule($scope.DeptID, 'FromLoad');  // added sujata 

            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });

    };

    vm.cellIsOpen = true;

    vm.eventClicked = function (event) {
        console.log('Clicked', event);
    };

    vm.eventEdited = function (event) {
        console.log('Edited', event);
    };

    vm.eventDeleted = function (event) {
        debugger;
        var timedifference = new Date().getTimezoneOffset();
        var DeleteCurrentEventResponse = AppointmentService.DeleteCurrentEvent(event.title, event.startsAt, event.endsAt,timedifference);
        DeleteCurrentEventResponse.then(function (DeleteResponse) {
            $scope.GetAppointmentDetails(false, false);
            console.log('Deleted', event);
        }, function (error) {
        });
    };

    //Added By Ikram Which Will Get Triggered On Event Time Changes
    vm.eventTimesChanged = function (event, newStartTime, newEndTime, doctorFirstName, doctorMiddleName, doctorLastName, departmentId, doctorAvailableStartTime, doctorAvailableEndTime, events, Index) {
        debugger;
        $scope.updatedStartTime = newStartTime.toString().substring(16, 18);
        $scope.updatedStartMin = newStartTime.toString().substring(19, 21);
        $scope.updatedEndTime = newEndTime.toString().substring(16, 18);
        $scope.updatedEndMin = newEndTime.toString().substring(19, 21);
        var doctorAvailableStartHour = doctorAvailableStartTime.slice(11, 13);
        var doctorAvailableStartMin = doctorAvailableStartTime.slice(14, 16);
        var doctorAvailableEndHour = doctorAvailableEndTime.slice(11, 13);
        var doctorAvailableEndMin = doctorAvailableEndTime.slice(14, 16);
        var isValid = false;
        var index = Index;



        if (events.length > 0) {
            for (var count = 0; count < events.length; count++) {
                //var doctorAvailableStartHour = events[count].StartTime.slice(11, 13);
                //var doctorAvailableStartMin = events[count].EndTime.slice(14, 16);
                if (Date.parse(new Date(events[count].StartTime)) >= Date.parse(newStartTime) && Date.parse(new Date(events[count].EndTime)) >= Date.parse(newEndTime)) {
                    isValid = true;
                    break;
                } else {
                    isValid = false;

                }
            }
        }


        if (isValid) {
            var EditedPatientName = event.title;
            EditedPatientName = EditedPatientName.split(" ");
            var timedifference = new Date().getTimezoneOffset();
            var eventTimeChangeResponse = AppointmentService.EditCurrentEvent(EditedPatientName[0], EditedPatientName[1], EditedPatientName[2], event.startsAt, event.endsAt, newStartTime, newEndTime, doctorFirstName, doctorMiddleName, doctorLastName, departmentId,timedifference);
            eventTimeChangeResponse.then(function (EditResponse) {
                if (EditResponse.data.value == 1) {
                    vm.doctors = [];
                    console.log('Dropped or resized', event);
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdateAppointmentSuccess);
                    //alert(objResource.msgUpdateAppointmentSuccess);
                }
                else if (EditResponse.data.value == 2) {
                    vm.doctors = [];
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdateCancelledAppointment);
                }
                else {
                    vm.doctors = [];
                    AlertMessage.success(objResource.msgTitle, objResource.msgAlreadyBookedAppointment);
                }
                $scope.GetAppointmentDetails(true, false);
            }, function (error) {
            });

        }

    };

    vm.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    //Added By Ikram To Check Doctor Availability Hours
    vm.cellModifier = function (events, cell, startHour, endHour) {
        usSpinnerService.spin('GridSpinner');
        cell.cssClass = 'Doctor-NotDefined-Slots';
        var x = cell.date._i.toString();
        $scope.countr = x.substring(16, 18);
        $scope.minCountr = x.substring(19, 21);
        var y = endHour.slice(11, 13);
        var z = startHour.slice(11, 13);
        var startMin = startHour.slice(14, 16);
        var endMin = endHour.slice(14, 16);

        var allScheduleDates = events;

        //Check All doctor Schedule Manohar
        if (allScheduleDates.length > 0) {

            //debugger;
            for (var i = 0; i < allScheduleDates.length; i++) {
                var startTime = new Date(allScheduleDates[i].StartTime);
                var EndTime = new Date(allScheduleDates[i].EndTime);
                if (cell.date._i >= startTime && cell.date._i < EndTime) {
                    if (cell.date._i <= vm.todayDate) {
                        cell.cssClass = 'Doctor-NotAvailable-Slots';
                    }
                    else {

                        if ($scope.cellCounterForDoctorAvailableSlotCSS) {
                            $scope.cellCounterForDoctorAvailableSlotCSS = false;
                            $scope.cellCounterForDoctorAvailableSlotCSS2 = true;
                            cell.cssClass = 'Doctor-Available-Slots';
                            break;

                        }
                        else if ($scope.cellCounterForDoctorAvailableSlotCSS2) {
                            $scope.cellCounterForDoctorAvailableSlotCSS2 = false;
                            $scope.cellCounterForDoctorAvailableSlotCSS = true;
                            cell.cssClass = 'Doctor-Available-Slots2';
                            break;
                        }

                    }
                }
            }
        }
        usSpinnerService.stop('GridSpinner');
    };

    //Added By Ikram Which Will Get Triggered On Event Time Changes
    vm.timespanClicked = function (date, cell) {
        debugger;
        if (vm.calendarView === 'month') {
            if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        } else if (vm.calendarView === 'year') {
            if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        }
    };

    //Added By Ikram Which Will Display Time In Required Format
    vm.formatAMPM = function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    //Added By Ikram Which Will Get Triggered On Adding New Appointment
    vm.rangeSelected = function (events, startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName, departmentId, departmentName, unitName, doctorAvailableStartTime, doctorAvailableEndTime, AvailablePatientNameList) {
        debugger;
        $scope.message = "";
        vm.selectedDoctorFullName = 'Dr. ' + doctorFirstName + ' ' + doctorMiddleName + ' ' + doctorLastName;
        vm.selectedDepartmentId = departmentId;
        vm.selectedDepartmentId = departmentName;
        vm.selectedPatientMRNo = '';
        vm.selectedUnitName = unitName;

        $scope.updatedStartTime = startDate.toString().substring(16, 18);
        $scope.updatedStartMin = startDate.toString().substring(19, 21);
        $scope.updatedEndTime = endDate.toString().substring(16, 18);
        $scope.updatedEndMin = endDate.toString().substring(19, 21);
        var doctorAvailableStartHour = doctorAvailableStartTime.slice(11, 13);
        var doctorAvailableStartMin = doctorAvailableStartTime.slice(14, 16);
        var doctorAvailableEndHour = doctorAvailableEndTime.slice(11, 13);
        var doctorAvailableEndMin = doctorAvailableEndTime.slice(14, 16);


        //Code change by manohar for Temp DOB Parameter added to call function
        //  DOB = new Date();

        $scope.validateFields = function (PatientName, FirstName, LastName, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, DOB, IsNewPatient) {
            debugger;
            $scope.message = "";

            $scope.isBlankField = false;
            if ($rootScope.IsNewPatientValidationHide == 1) {
                if (FirstName == "" || angular.isUndefined(FirstName)) {
                    $scope.message = objResource.msgEntFirstName;
                    $scope.PatientFirstNameError = true;
                    $scope.isBlankField = true;
                }
                else if (LastName == "" || angular.isUndefined(LastName)) {
                    $scope.message = objResource.msgEntLastName;
                    $scope.PatientLastNameError = true;
                    $scope.isBlankField = true;
                }
                else if (PatientGenderId == 0) {
                    $scope.message = objResource.msgSelGender;
                    $scope.PatientGenderIdError = true;
                    $scope.isBlankField = true;
                }
                else if (PatientselectedCountry == "") {
                    $scope.message = objResource.msgSelCountryCode;
                    $scope.PatientMobileCountryCodeError = true;
                    $scope.isBlankField = true;

                }

                else if (PatientMobileNumber == "" || angular.isUndefined(PatientMobileNumber)) {
                    $scope.message = objResource.lblValidMobNo;
                    $scope.PatientMobileNumberError = true;
                    $scope.isBlankField = true;
                }
                else if (PatientVisitId === "" || PatientVisitId === 0) {
                    $scope.message = objResource.lblEnterAppointmentReason;
                    $scope.PatientVisitIdError = true;
                    $scope.isBlankField = true;
                }
                else if (DOB == "" || DOB == null) {
                    debugger;
                    if (IsNewPatient == 1) {
                        $scope.message = "Please entered DOB in valid format.";
                        $scope.PatientDOBError = true;
                        $scope.isBlankField = true;
                    }

                }
                //else if (IsNewPatient == 1 && DOB != $scope.formats[0]) {                   
                //    $scope.message = "Please entered DOB in valid format.";
                //    $scope.PatientDOBError = true;
                //    $scope.isBlankField = true;
                //}
            }
            else
                $scope.isBlankField = false;

        }

        var allScheduleDates = events;
        var Isvalid = false;
        if (allScheduleDates.length > 0) {
            var IsValid = false;
            for (var i = 0; i < allScheduleDates.length; i++) {
                var startTimeCal = new Date(allScheduleDates[i].StartTime);
                var EndTimeCal = new Date(allScheduleDates[i].EndTime);
                if (startDate >= startTimeCal && endDate <= EndTimeCal) {
                    Isvalid = true;
                    break;
                }
            }
            if (!Isvalid) {
                debugger;
                AlertMessage.error(objResource.msgTitle, objResource.inValidAppointmentSelected);
                vm.doctors = [];
                $scope.GetAppointmentDetails(true, false);
            }
            else {
                ngDialog.open({
                    template: 'AddNewAppointment.html',
                    scope: $scope,
                    closeByDocument: false,
                    controller: function ($scope) {
                        debugger;

                        $scope.NewAppStartDate = startDate.toString().substring(0, 15);
                        $scope.NewAppStartTime = startDate.toString().substring(16, 24);
                        var firstDateClicked = new Date(startDate);
                        $scope.NewAppEndDate = endDate.toString().substring(0, 15);
                        $scope.NewAppEndTime = endDate.toString().substring(16, 24);
                        var lastDateClicked = new Date(endDate);
                        vm.selectedTime = vm.formatAMPM(firstDateClicked) + ' to ' + vm.formatAMPM(lastDateClicked);
                        $scope.AvailablePatientNameList = AvailablePatientNameList
                        $scope.AppointmenUnitName = "Genome";
                        $scope.addNewAppointment = function (PatientName, FirstName, LastName, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, PatientGenderIdError, DOB, IsNewPatient, AppointmenUnitName) {
                            debugger;

                            console.error(PatientName, FirstName, LastName, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, PatientGenderIdError, DOB, IsNewPatient, AppointmenUnitName);

                            usSpinnerService.spin('GridSpinner');
                            if (Remarks === undefined) {
                                Remarks = "";
                            }
                            $scope.validateFields(PatientName, FirstName, LastName, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, DOB, IsNewPatient);
                            var tempFlag = false;
                            angular.forEach($scope.$$childHead.CountryList, function (item) {
                                if (item.CountryCode == PatientselectedCountry) {
                                    tempFlag = true;
                                }
                                else {
                                    tempFlag = true;
                                }
                            });
                            //if(!tempFlag)
                            //{
                            //    //$scope.message = objResource.msgSelCountryCode;
                            //    //$scope.PatientMobileCountryCodeError = true;
                            //    //$scope.isBlankField = true;
                            //}
                            //else {
                            //    $scope.PatientMobileCountryCodeError = false;
                            //    $scope.isBlankField = false;
                            //    $scope.message = '';
                            //}

                            if (!$scope.isBlankField && tempFlag) {

                                if (PatientName == undefined || PatientName == null) {
                                    PatientName = FirstName + ' ' + ' ' + LastName;
                                    PatientName = PatientName.split(" ");
                                }

                                //Code added to check patient DOB for new patient
                                if (IsNewPatient == 2)
                                    DOB = new Date('1995, 01, 01');


                                //DOB = $filter('date')(DOB, 'medium');
                                var timedifference = new Date().getTimezoneOffset();
                                var AddNewAppointmentResponse = AppointmentService.AddNewAppointment(startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName, doctorAvailableStartTime, doctorAvailableEndTime, PatientName[0], PatientName[1], PatientName[2], departmentId, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, DOB, AppointmenUnitName, $rootScope.RegID, $rootScope.RegUnitID, timedifference);
                                AddNewAppointmentResponse.then(function (AddResponse) {
                                    if (AddResponse.data.value == 1) {
                                        usSpinnerService.stop('GridSpinner');
                                        console.log('Added', doctorFirstName);
                                        vm.doctors = [];
                                        $scope.GetAppointmentDetails(true, false);
                                        ngDialog.close();
                                        AlertMessage.success(objResource.msgTitle, objResource.msgAppointmentAddedSuccessfully);//Modified by swatih for localization on 13/7/2020
                                       // AlertMessage.success(objResource.msgTitle, "Appointment Saved Successfully");//Commented by swatih for localization on 13/7/2020
                                        $rootScope.RegID = "";
                                        $rootScope.RegUnitID = "";
                                        // alert(objResource.insertAppointmentSuccess);
                                    }
                                    else {
                                        usSpinnerService.stop('GridSpinner');
                                        vm.doctors = [];
                                        $scope.GetAppointmentDetails(true, false);
                                        ngDialog.close();
                                        AlertMessage.error(objResource.msgTitle, objResource.msgAlreadyBookedAppointment);
                                        //alert(objResource.msgAlreadyBookedAppointment);
                                    }

                                }, function (error) {
                                    usSpinnerService.stop('GridSpinner');
                                });

                            }
                            else {
                                usSpinnerService.stop('GridSpinner');
                                if (PatientMobileNumber == "" && FirstName != "" && LastName != "" && PatientGenderId != 0 && PatientselectedCountry != "") {
                                    $scope.message = objResource.msgEnterMobileNumber;
                                }
                            }
                        }
                    }
                });
            }
        }
        else {
            if ($scope.updatedStartTime < doctorAvailableStartHour) {

                AlertMessage.success(objResource.msgTitle, objResource.inValidAppointmentSelected);
                vm.doctors = [];
                $scope.GetAppointmentDetails(true, false);
            }
            else if ($scope.updatedEndTime > doctorAvailableEndHour) {
                AlertMessage.success(objResource.msgTitle, objResource.inValidAppointmentSelected);
                vm.doctors = [];
                $scope.GetAppointmentDetails(true, false);
            }
            else if ($scope.updatedEndMin > doctorAvailableEndMin) {
                AlertMessage.success(objResource.msgTitle, objResource.inValidAppointmentSelected);
                vm.doctors = [];
                $scope.GetAppointmentDetails(true, false);
            }
            else {
                ngDialog.open({
                    template: 'AddNewAppointment.html',
                    scope: $scope,
                    closeByDocument: false,
                    controller: function ($scope) {
                        $scope.NewAppStartDate = startDate.toString().substring(0, 15);
                        $scope.NewAppStartTime = startDate.toString().substring(16, 24);
                        var firstDateClicked = new Date(startDate);
                        $scope.NewAppEndDate = endDate.toString().substring(0, 15);
                        $scope.NewAppEndTime = endDate.toString().substring(16, 24);
                        var lastDateClicked = new Date(endDate);
                        vm.selectedTime = vm.formatAMPM(firstDateClicked) + ' to ' + vm.formatAMPM(lastDateClicked);
                        $scope.AvailablePatientNameList = AvailablePatientNameList

                        $scope.addNewAppointment = function (PatientName, FirstName, LastName, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, PatientGenderIdError) {
                            debugger;

                            console.warn(PatientName, FirstName, LastName, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, PatientGenderIdError);


                            usSpinnerService.spin('GridSpinner');
                            if (Remarks === undefined) {
                                Remarks = "";
                            }

                            $scope.validateFields(PatientName, FirstName, LastName, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, IsNewPatient);

                            if (!$scope.isBlankField) {
                                if (PatientName === undefined || PatientName == null) {
                                    PatientName = FirstName + ' ' + ' ' + LastName;
                                }
                                if (IsNewPatient == 2)
                                    DOB = new Date('1900, 01, 01');



                                PatientName = PatientName.split(" ");
                                var timedifference = new Date().getTimezoneOffset();
                                var AddNewAppointmentResponse = AppointmentService.AddNewAppointment(startDate, endDate, doctorFirstName, doctorMiddleName, doctorLastName, doctorAvailableStartTime, doctorAvailableEndTime, PatientName[0], PatientName[1], PatientName[2], departmentId, PatientGenderId, PatientselectedCountry, PatientMobileNumber, PatientVisitId, Remarks, selectedMRNo, DOB, AppointmenUnitName,timedifference);
                                AddNewAppointmentResponse.then(function (AddResponse) {
                                    if (AddResponse.data.value == 1) {
                                        usSpinnerService.stop('GridSpinner');
                                        console.log('Added', doctorFirstName);
                                        vm.doctors = [];
                                        $scope.GetAppointmentDetails(true, false);
                                        ngDialog.close();
                                        AlertMessage.success(objResource.msgTitle, objResource.msgInsertAppointmentSuccess);
                                    }
                                    else {
                                        usSpinnerService.stop('GridSpinner');
                                        vm.doctors = [];
                                        $scope.GetAppointmentDetails(true, false);
                                        ngDialog.close();
                                        AlertMessage.success(objResource.msgTitle, objResource.msgAlreadyBookedAppointment);
                                    }
                                }, function (error) {
                                    usSpinnerService.stop('GridSpinner');
                                });
                            }
                            else {
                                usSpinnerService.stop('GridSpinner');
                                if (PatientMobileNumber == "" && FirstName != "" && LastName != "" && PatientGenderId != 0, PatientselectedCountry != "") {
                                    $scope.message = objResource.msgEnterMobileNumber;
                                }
                            }
                        }
                    }
                });
            }
        }

    };
}]);