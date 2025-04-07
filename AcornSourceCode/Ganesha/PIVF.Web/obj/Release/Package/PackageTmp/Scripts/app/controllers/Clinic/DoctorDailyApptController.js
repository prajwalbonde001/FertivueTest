'use strict';

angular.module('PIVF').controller('DoctorDailyApptController', function ($scope, DoctorService, QueueService, $rootScope, $location, ScheduleService, usSpinnerService, AlertMessage, Common, swalMessages, srvCommon, $filter) {
    //Variable Declaration For  =========================================================================             

    debugger;
    usSpinnerService.spin('GridSpinner');
    $scope.appointmentTypeList = ['Daily', 'Monthly', 'Weekly'];
    $scope.scheduleWeekTypeList = ['Select', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
    $scope.scheduleDaysList = ["Select", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    $scope.scheduleDaysBindList = [{ DayID: 0, day: "Monday" }, { DayID: 1, day: "Tuesday" }, { DayID: 2, day: "Wednesday" }, { DayID: 3, day: "Thursday" }, { DayID: 4, day: "Friday" }, { DayID: 5, day: "Saturday" }, { DayID: 6, day: "Sunday" }];
    $scope.scheduleShortDaysList = [null, 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    $scope.role = {};
    //Show AM and PM option
    $scope.ismeridian = false;
    $scope.timelist = ['Select', 15, 30, 60];
    $scope.SelectedCountry = null;
    $scope.isDoctorAvail = false;
    $scope.ClinicError = false;
    $scope.isDailyShow = true;
    $scope.format = 'dd-MMM-yyyy';
    $scope.Schedule = {};
    $scope.UpdateSchedule = {};
    $scope.RemoveSchedule = {};
    $scope.Schedule.StartDate = new Date();
    $scope.Schedule.EndDate = new Date();
    $scope.Schedule.Interval = $scope.timelist[1];
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;

    //Code Updated for auto set Start Date and End Date 
    $scope.getHoursForStartTime = function () {
        debugger;
        $scope.minHours = $scope.Schedule.StartDate.getMinutes();
        if ($scope.minHours >= 0 && $scope.minHours < 15)
            $scope.minHours = 0; //15
        else if ($scope.minHours >= 15 && $scope.minHours < 30)
            $scope.minHours = 0; //30
        else if ($scope.minHours >= 30 && $scope.minHours < 45)
            $scope.minHours = 0; //45
        else if ($scope.minHours >=45 && $scope.minHours < 59) {
            $scope.minHours = 0;
            $scope.Schedule.StartDate.setHours($scope.Schedule.StartDate.getHours() + 1);
        }


    }
    $scope.getHoursForStartTime();
    $scope.Schedule.StartTime = new Date (0,0,0);
//($scope.Schedule.StartDate.getFullYear(), $scope.Schedule.StartDate.getMonth(), $scope.Schedule.StartDate.getDay(), $scope.Schedule.StartDate.getHours(), $scope.minHours, 0, 0);
    $scope.Schedule.EndTime = new Date(0,15,0,0);
//($scope.Schedule.EndDate.getFullYear(), $scope.Schedule.EndDate.getMonth(), $scope.Schedule.EndDate.getDay(), $scope.Schedule.EndDate.getHours(), 15, 0, 0);
    $scope.Schedule.ScheduleUnitID = 0;
    $scope.currentDate = new Date();
    $scope.Schedule.SelectedWeek = 'Select';
    $scope.Schedule.Selectedday = 'Select';
    $scope.Schedule.IsScheduleCancel = false;
    $scope.isHideTable = false;
    $scope.isMoveFromLanding = false;
    $scope.IsHiddenEndTime = true;
    $scope.hstep = 1;
    $scope.mstep = 15;
   
    $scope.IsHiddenStartTime = true;
    $scope.UnitListError = false;
    $scope.ScheduleSlotListError = false;  //Added by Nayan Kamble on 19/11/2019
    $scope.InValidDoctor = false;   //Added by Nayan Kamble on 11/11/2019
    $scope.MorningError = false;   //Added by Nayan Kamble on 21/11/2019
    $scope.AfternoonError = false;   //Added by Nayan Kamble on 21/11/2019
    $scope.EveningError = false;   //Added by Nayan Kamble on 21/11/2019
    $scope.DayError = false;    //Added by Nayan Kamble on 21/11/2019
    $scope.StartDateError = false;
    $scope.DepartmentListError = false;
    $scope.DoctorNameListError = false;
    $scope.ScheduleDayError = false;
    $scope.ScheduleMonthError = false;
    $scope.ScheduleWeekError = false;
    $scope.ScheduleWeekDayError = false;
    $scope.IntervalListError = false;
    $scope.DaySelectionError = false;
    $scope.IsDisableDayTextbox = false;
    $scope.IsNewSearchLanding = false;
    $scope.DepartmentListByDocID = [{ DeptID: 0, Description: "Select" }];
    // $scope.FillScheduleSlot();    ///Added by Nayan Kamble on 19/11/2019
    $scope.Schedule.DeptID = 0;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    $scope.isAddRole = false;
    $scope.btnSaveTitle = objResource.btnSave;
    $scope.addDays = [];
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.open1 = function () {
        debugger;
        $scope.popup1.opened = true;
        if ((angular.isUndefined($scope.Schedule.StartDate)
         || ($scope.Schedule.StartDate == null)
         || ($scope.Schedule.StartDate == ""))) {
            $scope.StartDateError = true;
        } else {
            $scope.StartDateError = false;
        }


    };

    $scope.popup1 = {
        opened: false
    };

    $scope.open2 = function () {
        debugger;
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    //Start Date Picker
    $scope.startdateOption = {
        formatYear: 'yy',
        maxDate: new Date('2099, 12, 01'),
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    //End Date Picker
    $scope.enddateOption = {
        formatYear: 'yy',
        maxDate: new Date('2099, 12, 01'),
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };


    $scope.DoctorlandingPage = function NewDocSchedule() {
        $location.path('/DSchedule/');
        $rootScope.LandingSchedule.SearchText = false;

    };

    $scope.GetSpecificDoctor = function GetSpecificDoctor(DOCID) {

        var Promise = DoctorService.GetSpecificDoctor(DOCID);
        Promise.then(function (Response) {
            debugger;
            $scope.LandDocNameList = Response.data;
            $scope.Schedule.SearchDoctorName = $scope.LandDocNameList.FirstName;
            $scope.GetDoctDetailByNameSearch($scope.Schedule);
            $location.path('/DoctorDailyAppt/');
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Get Schedule List for Landing Page
    $scope.GetScheduleListLanding = function GetScheduleListLanding(Schedule) {
        debugger;
        var responseData = DoctorService.GetScheduleListLanding(Schedule);
        responseData.then(function (Response) {
            debugger;
            $scope.ScheduleListLanding = Response.data.value;
            $scope.counter = 0;

        }, function (error) {
            AlertMessage.error('Error', error.status);
        });
    }

    //$scope.$watch('Schedule.StartTime', function (newValue, oldValue) {           commented by Nayan Kamble on 05/12/2019
    //    debugger;
    //    if ($scope.Schedule.EndTime <= $scope.Schedule.StartTime) {
    //        $scope.Schedule.EndTime = new Date($scope.Schedule.StartTime.getTime() + $scope.mstep * 60000)
    //    }


    //    var hour = $scope.Schedule.StartTime.getHours() - ($scope.Schedule.StartTime.getHours() >= 12 ? 12 : 0),
    //        period = $scope.Schedule.StartTime.getHours() >= 12 ? 'PM' : 'AM';
    //    $scope.displayTime = hour + ':' + $scope.Schedule.StartTime.getMinutes() + ' ' + period;

    //})

    //$scope.$watch('Schedule.EndTime', function (newValue, oldValue) {
    //    debugger;
    //    if ($scope.Schedule.EndTime <= $scope.Schedule.StartTime) {
    //        $scope.Schedule.EndTime = new Date($scope.Schedule.StartTime.getTime() + $scope.mstep * 60000)
    //    }
    //    var hour = $scope.Schedule.EndTime.getHours() - ($scope.Schedule.EndTime.getHours() >= 12 ? 12 : 0),
    //        period = $scope.Schedule.EndTime.getHours() >= 12 ? 'PM' : 'AM';
    //    $scope.displayTime = hour + ':' + $scope.Schedule.EndTime.getMinutes() + ' ' + period
    //})

    $scope.ShowHideStartTime = function () {
        debugger;
        //If Div is hidden it will be visible and vice versa.
        $scope.IsHiddenStartTime = $scope.IsHiddenStartTime ? false : true;
    }

    $scope.ShowHideEndTime = function () {
        debugger;
        //If Div is hidden it will be visible and vice versa.
        $scope.IsHiddenEndTime = $scope.IsHiddenEndTime ? false : true;
    }

    //Show Hide Div Based on Drop Dawn Selection.
    $scope.changeAppointmentType = function () {
        debugger;
        $scope.isDailyShow = false;
        $scope.isMonthlyShow = false;
        $scope.isWeeklyShow = false;

        // Disable all Errors
        $scope.UnitListError = false;
        $scope.ScheduleSlotListError = false;   //Added by Nayan Kamble on 19/11/2019
        $scope.MorningError = false;   //Added by Nayan Kamble on 21/11/2019
        $scope.AfternoonError = false;   //Added by Nayan Kamble on 21/11/2019
        $scope.EveningError = false;   //Added by Nayan Kamble on 21/11/2019
        $scope.DayError = false;    //Added by Nayan Kamble on 21/11/2019
        $scope.DepartmentListError = false;
        $scope.StartDateError = false;
        $scope.DepartmentListError = false;
        $scope.DoctorNameListError = false;
        $scope.ScheduleDayError = false;
        $scope.ScheduleMonthError = false;
        $scope.ScheduleWeekError = false;
        $scope.ScheduleWeekDayError = false;
        $scope.IntervalListError = false;

        if ($scope.Appointment.Type == 'Daily') {
            $scope.isDailyShow = true;
        } else if ($scope.Appointment.Type == 'Weekly') {
            $scope.isWeeklyShow = true;
        } else if ($scope.Appointment.Type == 'Monthly') {
            $scope.isMonthlyShow = true;
        }

    }

    $scope.GetDoctDetailByNameSearch = function GetDoctDetailByNameSearch(doctorName) {
        debugger;

        var IsValidToSearchDoctorName = true;

        if (angular.isUndefined(doctorName) || doctorName == "") {
            $scope.DoctorNameListError = true;
            IsValidToSearchDoctorName = false;
            $scope.isHideTable = false;
        }
        else {
            $scope.DoctorNameListError = false;
            $scope.UnitListError = false;
            $scope.ScheduleSlotListError = false;    //Added by Nayan Kamble on 19/11/2019
            $scope.MorningError = false;   //Added by Nayan Kamble on 21/11/2019
            $scope.AfternoonError = false;   //Added by Nayan Kamble on 21/11/2019
            $scope.EveningError = false;   //Added by Nayan Kamble on 21/11/2019
            $scope.DayError = false;    //Added by Nayan Kamble on 21/11/2019
            $scope.DepartmentListError = false;
            $scope.StartDateError = false;
            $scope.DepartmentListError = false;
            $scope.doctorName = doctorName;
            $scope.isHideTable = true;
        }

        if (!IsValidToSearchDoctorName)
            return;
        debugger;
        $scope.GetDDUnitList(doctorName.DOCID);
        var responsedata = DoctorService.GetDoctDetailByName(doctorName.DOCID);
        responsedata.then(function (response) {
            debugger;
            $scope.doctorlist = response.data;
            console.log("$scope.doctorlist", $scope.doctorlist);
            $scope.isDoctorAvail = true;
            $scope.firstName = $scope.doctorlist.FirstName;
            $scope.registrationNumber = $scope.doctorlist.RegestrationNumber;
            $scope.emailId = $scope.doctorlist.EmailId;
            $scope.mobileNo = $scope.doctorlist.Mobno;
            $scope.Schedule.doctorID = $scope.doctorlist.DOCID;
            $scope.SpecializationDesc = $scope.doctorlist.SpecializationDesc;
            $scope.SubSpecializationDesc = $scope.doctorlist.SubSpecializationDesc
            $scope.Schedule.DeptID = $scope.doctorlist.DeptID;
            $scope.Photo = $scope.doctorlist.PhotoString;
            $scope.GenderId = $scope.doctorlist.GenderId;

            $scope.GetScheduleListByDoctorID($scope.Schedule.doctorID, $scope.currentDate);
            $scope.GetDepartmentsByID($scope.doctorlist.UnitID);

        }, function (error) {
            alert("error" + error.status);

        });
    };

    $scope.GetAllDoctorNames = function GetAllDoctorNames(doctorName) {
        debugger;
        var responsedata = DoctorService.GetAllDoctorNames(doctorName);
        responsedata.then(function (response) {
            debugger;
            $scope.doctorlistNames = response.data.value;

        }, function (error) {
            alert("error" + error.status);

        });
    };

    $scope.GetDayMaster = function GetDayMaster() {
        debugger;
        var responsedata = DoctorService.GetDayMaster();
        responsedata.then(function (response) {
            debugger;
            $scope.DayMasterList = response.data.value;

        }, function (error) {
            alert("error" + error.status);

        });
    };

    $scope.SelectedDoctorName = function (SelectedDoctorName) {
        debugger;
        $scope.SelectedDoctorName = SelectedDoctorName.FirstName;
        if (!angular.isUndefined($scope.SelectedDoctorName) && $scope.SelectedDoctorName != null) {
            $scope.selectedDoctorNameError = false;
        } else {
            $scope.selectedDoctorNameError = false;


        }
    }
    //$scope.GetClinicNameByScheduleID = function GetClinicNameByScheduleID(ScheduleID) {

    //    $scope.filterObj = $scope.UnitList.filter(function (e) {
    //        return e.UnitID == ScheduleID;
    //    });
    //    return $scope.filterObj[0].UnitName;

    //}

    //Get Department All Department List
    $scope.GetDDDepartmentList = function GetDDDepartmentList() {
        debugger;
        var responseData = DoctorService.GetDepartmentListForDoc(0);
        responseData.then(function (Response) {
            if (Response.data.value.length > 0) {
                $scope.DepartmentList = Response.data.value;

            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }

    //Added by Nayan Kamble on 19/11/2019

    //$scope.FillScheduleSlot = function () {
    //    debugger;
    //    var ResponseData = Common.getMasterList('M_SlotSchedule', 'ID', 'Description');
    //    ResponseData.then(function (Response) {
    //        Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
    //        $scope.ScheduleSlotList = Response.data;
    //        if ($scope.Schedule.ScheduleSlot == undefined)
    //            $scope.Schedule.ScheduleSlot = 0;

    //    }, function (error) {
    //        $scope.Error = error;
    //    });
    //};


    $scope.FillScheduleSlot = function FillScheduleSlot() {
        debugger;
        var responsedata = ScheduleService.GetSlotMaster();
        responsedata.then(function (response) {
            debugger;
            response.data.value.splice(0, 0, { SlotID: 0, SlotDescription: 'Select' });
            $scope.ScheduleSlotList = response.data.value;
            if ($scope.Schedule.SlotID == undefined)    //ScheduleSlot
                $scope.Schedule.SlotID = 0;      //ScheduleSlot

            for (var i = 0; i < $scope.ScheduleSlotList.length; i++) {
                if (i == 1) {
                    $scope.MorningSTime = $scope.ScheduleSlotList[1].SStartTime;
                    $scope.MorningETime = $scope.ScheduleSlotList[1].SEndTime;
                }
                else if(i == 2){
                    $scope.AfternoonSTime = $scope.ScheduleSlotList[2].SStartTime;
                    $scope.AfternoonETime = $scope.ScheduleSlotList[2].SEndTime;
                }
                else if(i == 3){
                $scope.EveningSTime = $scope.ScheduleSlotList[3].SStartTime;
                $scope.EveningETime = $scope.ScheduleSlotList[3].SEndTime;
                }
                else if(i == 4){
                    $scope.DaySTime = $scope.ScheduleSlotList[4].SStartTime;
                    $scope.DayETime = $scope.ScheduleSlotList[4].SEndTime;
                }
            }
        }, function (error) {
            alert("error" + error.status);

        });
    };


    //Added by Nayan Kamble on 19/11/2019



    //Get All Doctor List  for drop-dawn Doctor.
    $scope.GetDocList = function GetDocList() {
        debugger;
        var responseData = Common.GetDoctorList();
        responseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { DOCID: 0, FullName: objResource.lblDoctor })
            $scope.DocList = Response.data;
            $scope.Schedule.DOCID = 0;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Get Clinic Name with ID
    $scope.GetDDUnitList = function GetDDUnitList(DOCID) {
        debugger;
        //var responseData = DoctorService.GetDDUnitList(IsListing);
        //responseData.then(function (Response) {
        //    debugger;
        //    $scope.UnitList = Response.data.value;


        //    if ($scope.Schedule.UnitID == undefined) {
        //        $scope.Schedule.UnitID = 0;
        //    }

        //}, function (error) {
        //    AlertMessage.error('Error', error.status);
        //});

        var ResponseData = Common.GetUnitListDoctorIDForSchedule(DOCID);
        debugger
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { UnitID: 0, Description: "Select" });
            $scope.UnitList = Response.data;
            console.log(" $scope.UnitList", $scope.UnitList);
            if ($scope.Schedule.UnitID == undefined) {
                $scope.Schedule.UnitID = 0;
            }
        }, function (error) {
            AlertMessage.error('Error', error.status);
        });



    };

    //Clear all data after insert update
    $scope.Clear = function Clear() {
        debugger;
        $scope.btnSaveTitle = objResource.btnSave;
        $scope.Schedule.Interval = $scope.timelist[1];
        $scope.Schedule.ScheduleUnitID = 0;
        $scope.Schedule.DeptID = 0;
        $scope.Schedule.ScheduleSlot = 0;  //Added by Nayan Kamble on 19/11/2019
        $scope.Schedule.SlotID = 0;  //Added by Nayan Kamble on 19/11/2019
        $scope.Schedule.StartDate = new Date();
        $scope.addDays = [];
        $scope.Appointment.Type = 'Daily'
        $scope.checkAll();
        $scope.Schedule.EndDate = new Date();
        $scope.getHoursForStartTime();
        $scope.Schedule.StartTime = new Date(0,0,0);
//($scope.Schedule.StartDate.getFullYear(), $scope.Schedule.StartDate.getMonth(), $scope.Schedule.StartDate.getDay(), $scope.Schedule.StartDate.getHours(), $scope.minHours, 0, 0);
        $scope.Schedule.EndTime = new Date(0,15,0,0);
//($scope.Schedule.EndDate.getFullYear(), $scope.Schedule.EndDate.getMonth(), $scope.Schedule.EndDate.getDay(), $scope.Schedule.EndDate.getHours(), 15, 0, 0);

        //$scope.Schedule.StartTime = new Date($scope.Schedule.StartDate.getFullYear(), $scope.Schedule.StartDate.getMonth(), $scope.Schedule.StartDate.getDay(), 0, 0, 0, 0);
        //$scope.Schedule.EndTime = new Date($scope.Schedule.EndDate.getFullYear(), $scope.Schedule.EndDate.getMonth(), $scope.Schedule.EndDate.getDay(), 0, 15, 0, 0);


    };

    //Empty Data at first Time
    $scope.$on('inputModified.formChanged', function (event, modified, formCtrl) {
        debugger;
        if (!$scope.isAddRole) {
            $scope.frmDailySchedule.modifiedModels = [];
        }

    });


    $scope.checkAll = function () {
        angular.forEach($scope.DayMasterList, function (ScheduleDay) {
            ScheduleDay.id = false;
        });

    };

    $scope.GetDepartmentsByID = function GetDepartmentsByID(UnitID) {
        debugger;
        //var responseData = DoctorService.GetDepartmentsByID(doctorID);
        //responseData.then(function (Response) {
        //    debugger;
        //    $scope.DepartmentListByDocID = Response.data.value;

        //}, function (error) {
        //    AlertMessage.error('Error', error.status);
        //});

        var ResponseData = Common.GetDeptIDListDoctorIDAndUnitID($scope.Schedule.doctorID, UnitID);
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DepartmentListByDocID = Response.data;
            console.log("$scope.DepartmentListByDocID", $scope.DepartmentListByDocID);
            $scope.Schedule.DeptID = 0
            //if ($scope.Schedule.DeptID == undefined) {
            //    $scope.Schedule.DeptID = 0;
            //}
        }, function (error) {
            AlertMessage.error('Error', error.status);
        });




    };

    $scope.AddNewSchedule = function AddNewSchedule(Schedule) {
        debugger;
        var isValid = $scope.CheckIsValidDoctorSchedule($scope.Schedule);
       
        if (!isValid) {
              
            if ($scope.InValidDoctor) {
                //AlertMessage.warning('PalashIVF', 'Select doctor.');//Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectdoctor);//Modified by swatih for localization 28/7/2020
            }
            else if ($scope.UnitListError) {
                //AlertMessage.warning('PalashIVF', 'Select clinic.');//Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectclinic);//Modified by swatih for localization 28/7/2020
            }
            else if ($scope.DepartmentListError) {
                //AlertMessage.warning('PalashIVF', 'Select department.');//Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectdepartment);//Modified by swatih for localization 28/7/2020
            }
            else if ($scope.StartDateError) {
                // AlertMessage.warning('PalashIVF', 'Select start date.');//Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectstartdate);//Modified by swatih for localization 28/7/2020
            }
            else if ($scope.ScheduleSlotListError)  {        //Added by Nayan Kamble on 19/11/2019    
                // AlertMessage.warning('PalashIVF', 'Select schedulte slot.');//Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectschedulteslot);//Modified by swatih for localization 28/7/2020
            }
            else if($scope.MorningError){              //Added by Nayan Kamble on 19/11/2019  
                //AlertMessage.warning('PalashIVF', 'Select appropriate morning time.');//Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectappropriatemorningtime);//Modified by swatih for localization 28/7/2020
            }
            else if($scope.AfternoonError){                //Added by Nayan Kamble on 19/11/2019  
                // AlertMessage.warning('PalashIVF', 'Select appropriate afternoon time.');//Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectappropriateafternoontime);//Modified by swatih for localization 28/7/2020
                }
            else if($scope.EveningError){               //Added by Nayan Kamble on 19/11/2019  
                //AlertMessage.warning('PalashIVF', 'Select appropriate evening time.');//Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSelectappropriateeveningtime);//Modified by swatih for localization 28/7/2020
                }

            else
                //AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');    //Added by Nayan Kamble on 11/11/2019  //Commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);//Modified by swatih for localization 28/7/2020
            return;
        }
        

        //If End Date not selected add one year into end date
        if (angular.isUndefined(Schedule.EndDate)) {
            Schedule.EndDate = new Date();
            Schedule.EndDate.setYear(Schedule.EndDate.getFullYear() + 1)
        }

        $scope.Schedule.StartTime = new Date(Schedule.StartDate.getFullYear(), Schedule.StartDate.getMonth(), Schedule.StartDate.getDate(), Schedule.StartTime.getHours(), Schedule.StartTime.getMinutes(), 0, 0);
        $scope.Schedule.EndTime = new Date(Schedule.EndDate.getFullYear(), Schedule.EndDate.getMonth(), Schedule.EndDate.getDate(), Schedule.EndTime.getHours(), Schedule.EndTime.getMinutes(), 0, 0)
        $scope.Schedule.Status = true;
        $scope.ScheduleDayID = [];
        $scope.Schedule.ScheduleStartDates = [];
        $scope.Schedule.ScheduleMonth = [];
        $scope.ScheduledetailsMaster = {};
        $scope.DoctorScheduleDetailMaster = {};
        $scope.ScheduleDetails = {};
        //DayId Add Calculations
        $scope.startDate = $scope.Schedule.StartTime;
        $scope.endDate = $scope.Schedule.EndTime;

        //Check Valid Data or not
        if ($scope.Schedule.StartTime < new Date() || $scope.Schedule.EndTime < new Date()) {
            //AlertMessage.error("Palash IVF", "Shedule is lapsed.");//Commented by swatih for localization 28/7/2020
            AlertMessage.error(objResource.msgTitle, objResource.msgSheduleislapsed);//Modified by swatih for localization 28/7/2020
            return;
        }
        if ($scope.Appointment.Type == 'Daily') {
            debugger;
            for (var i = $scope.startDate; i <= $scope.endDate;) {
                debugger;
                $scope.ScheduleDayID.push(i.getDay() + 1);
                $scope.Schedule.ScheduleStartDates.push($scope.formatDate($scope.startDate));
                i.setTime(i.getTime() + 1000 * 60 * 60 * 24);
            }

        }
        else if ($scope.Appointment.Type == 'Weekly') {
            debugger;
            for (var i = $scope.startDate; i <= $scope.endDate;) {
                var a = i.getDay();
                if ($scope.addDays.indexOf(a) > -1) {
                    debugger;
                    $scope.ScheduleDayID.push(i.getDay() + 1);
                    $scope.Schedule.ScheduleStartDates.push($scope.formatDate($scope.startDate));
                }
                i.setTime(i.getTime() + 1000 * 60 * 60 * 24);
            }
        } else if ($scope.Appointment.Type == 'Monthly') {
            debugger;
            if ($scope.DayRadio == 1) {
                $scope.IsDisableDayTextbox = false;
                var total_months = ($scope.endDate.getFullYear() - $scope.startDate.getFullYear()) * 12 + ($scope.endDate.getMonth() - $scope.startDate.getMonth())

                for (var i = 0; i <= total_months; i++) {
                    $scope.currentDate = new Date($scope.startDate);
                    $scope.currentDate.setMonth($scope.startDate.getMonth() + i);
                    $scope.Schedule.ScheduleMonth.push(new Date($scope.currentDate));
                }

                $scope.GetAlternateMonthByDate();
            }
            else if ($scope.DayRadio == 2) {
                $scope.IsDisableDayTextbox = true;
                if ($scope.Schedule.SelectedWeek == 'First') {
                    $scope.week = 0;
                } else if ($scope.Schedule.SelectedWeek == 'Second') {
                    $scope.week = 1;
                }
                else if ($scope.Schedule.SelectedWeek == 'Third') {
                    $scope.week = 2;
                } else if ($scope.Schedule.SelectedWeek == 'Fourth') {
                    $scope.week = 3;
                } else if ($scope.Schedule.SelectedWeek == 'Fifth') {
                    $scope.week = 4;
                }

                if ($scope.Schedule.Selectedday == 'Sunday') {
                    $scope.day = 0;

                }
                else if ($scope.Schedule.Selectedday == 'Monday') {
                    $scope.day = 1;

                } else if ($scope.Schedule.Selectedday == 'Tuesday') {
                    $scope.day = 2;

                }
                else if ($scope.Schedule.Selectedday == 'Wednesday') {
                    $scope.day = 3;

                }
                else if ($scope.Schedule.Selectedday == 'Thursday') {
                    $scope.day = 4;

                } else if ($scope.Schedule.Selectedday == 'Friday') {
                    $scope.day = 5;

                }
                else if ($scope.Schedule.Selectedday == 'Saturday') {
                    $scope.day = 6;

                }

                var total_months = ($scope.endDate.getFullYear() - $scope.startDate.getFullYear()) * 12 + ($scope.endDate.getMonth() - $scope.startDate.getMonth())
                for (var i = 0; i <= total_months; i++) {
                    $scope.currentDate = new Date($scope.startDate);
                    $scope.currentDate.setMonth($scope.startDate.getMonth() + i);
                    $scope.Schedule.ScheduleMonth.push(new Date($scope.currentDate));
                }
                $scope.getMondays($scope.day, $scope.week);
            }

        }

        $scope.Schedule.StartTime = new Date(Schedule.StartDate.getFullYear(), Schedule.StartDate.getMonth(), Schedule.StartDate.getDate(), Schedule.StartTime.getHours(), Schedule.StartTime.getMinutes(), 0, 0);
        $scope.Schedule.EndTime = new Date(Schedule.EndDate.getFullYear(), Schedule.EndDate.getMonth(), Schedule.EndDate.getDate(), Schedule.EndTime.getHours(), Schedule.EndTime.getMinutes(), 0, 0)


        if ($scope.btnSaveTitle == objResource.btnSave) {
            $scope.GetDoctorScheduleDates($scope.Schedule);
            //$scope.AddDoctorScheduleMaster($scope.Schedule);
          
        }
        else {
            $scope.UpdateService($scope.Schedule, true);
            
        }
        
    };

    $scope.DisableRadioError = function DisableRadioError() {
        if ($scope.DayRadio == 1) {
            $scope.ScheduleWeekError = false;
            $scope.ScheduleWeekDayError = false;
            $scope.IsDisableDayTextbox = false;
        } else if ($scope.DayRadio == 2) {
            $scope.ScheduleDayError = false;
            $scope.ScheduleMonthError = false;
            $scope.IsDisableDayTextbox = true;

        }

    };

    $scope.CheckIsValidDoctorSchedule = function CheckIsValidDoctorSchedule(Schedule) {
        /* Check valid unitList*/
        debugger;
        var IsValidToMoveNext = true;

        if (angular.isUndefined(Schedule.doctorID) || Schedule.doctorID == 0) {     //Added by Nayan Kamble on 12/11/2019
            $scope.InValidDoctor = true;
            IsValidToMoveNext = false;
        }
        else {
            $scope.InValidDoctor = false;
        }


        if (angular.isUndefined($scope.Schedule.ScheduleUnitID) || $scope.Schedule.ScheduleUnitID == 0) {     // $scope.Schedule.ScheduleUnitID <= 0   commented & modified by Nayan Kamble on 11/11/2019
            $scope.UnitListError = true;
            IsValidToMoveNext = false;
        }
        else {
            $scope.UnitListError = false;
        }

       // if (angular.isUndefined($scope.Schedule.ScheduleSlot) || $scope.Schedule.ScheduleSlot == 0) {
        if (angular.isUndefined($scope.Schedule.SlotID) || $scope.Schedule.SlotID == 0) { // Added by Nayan Kamble on 19/11/2019
            $scope.ScheduleSlotListError = true;
            IsValidToMoveNext = false;
        }
        else {
            $scope.ScheduleSlotListError = false;
        }

        if ($scope.Schedule.SlotID == 1) {            //Morning          //Added by Nayan Kamble on 20/11/2019    ScheduleSlot
            var Starthour = $scope.Schedule.StartTime.getHours(),         //value from model
                  Endhour = $scope.Schedule.EndTime.getHours(),            //value from model
            SStarthour = $scope.Schedule.SlotStartTime.slice(11, 13),        //value from db
            SEndhour = $scope.Schedule.SlotEndTime.slice(11, 13);             //value from db
            if ($scope.Schedule.SlotStartTime != null || $scope.Schedule.SlotStartTime != undefined ||
               $scope.Schedule.SlotEndTime != null || $scope.Schedule.SlotEndTime != undefined) {
                //if (Starthour > 12 || Endhour > 12) {
                //if (!(SStarthour >= Starthour && SStarthour <= SEndhour) || !(SStarthour <= Endhour && Endhour <= SEndhour)) {     //0   12
                if (!(Starthour >= SStarthour && Starthour <= SEndhour) || !(Endhour >= SStarthour && Endhour <= SEndhour)) {
                    $scope.MorningError = true;
                    IsValidToMoveNext = false;
                }
            }
            else {
                $scope.MorningError = false;
            }
        }
        else {
            $scope.MorningError = false;
        }

        if ($scope.Schedule.SlotID == 2) {       //Afternoon     ScheduleSlot
            var Starthour = $scope.Schedule.StartTime.getHours(),                 //value from model
                  Endhour = $scope.Schedule.EndTime.getHours(),                    //value from model
            SStarthour = $scope.Schedule.SlotStartTime.slice(11, 13),                //value from db
                  SEndhour = $scope.Schedule.SlotEndTime.slice(11, 13);               //value from db

            if ($scope.Schedule.SlotStartTime != null || $scope.Schedule.SlotStartTime != undefined ||
              $scope.Schedule.SlotEndTime != null || $scope.Schedule.SlotEndTime != undefined) {
                //   if (Starthour < SStarthour || Starthour > SEndhour || Endhour < SStarthour || Endhour > SEndhour) {   //12    17
                //  if (!(SStarthour >= Starthour && SStarthour <= SEndhour) || !(SStarthour <= Endhour && Endhour <= SEndhour)) {
                if (!(Starthour >= SStarthour && Starthour <= SEndhour) || !(Endhour >= SStarthour && Endhour <= SEndhour)) {
                    $scope.AfternoonError = true;
                    IsValidToMoveNext = false;
                }
            }
            else {
                $scope.AfternoonError = false;
            }
        }
        else {
            $scope.AfternoonError = false;
        }

        if ($scope.Schedule.SlotID == 3) {        //Evening      ScheduleSlot
            var Starthour = $scope.Schedule.StartTime.getHours(),           //value from model
                  Endhour = $scope.Schedule.EndTime.getHours(),             //value from model
            SStarthour = $scope.Schedule.SlotStartTime.slice(11, 13),    //value from database
            SEndhour = $scope.Schedule.SlotEndTime.slice(11, 13);        //value from database
            if ($scope.Schedule.SlotStartTime != null || $scope.Schedule.SlotStartTime != undefined ||
              $scope.Schedule.SlotEndTime != null || $scope.Schedule.SlotEndTime != undefined) {
               // if (Starthour < SStarthour || Starthour > SEndhour || Endhour < SStarthour || Endhour > SEndhour) {    //17   23
               // if (SStarthour >= Starthour >= SEndhour || SEndhour >= Endhour >= SEndhour) {
                //if (!(SStarthour >= Starthour && SStarthour <= SEndhour) || !(SStarthour <= Endhour && Endhour <= SEndhour)) {
                if (!(Starthour >= SStarthour && Starthour <= SEndhour) || !(Endhour >= SStarthour && Endhour <= SEndhour)) {
                    $scope.EveningError = true;
                    IsValidToMoveNext = false;
                }
            }
            else {
                $scope.EveningError = false;
            }
        }
        if ($scope.Schedule.SlotID == 4) {        //Day      ScheduleSlot
            //var Starthour = $scope.Schedule.StartTime.getHours(),
            //      Endhour = $scope.Schedule.EndTime.getHours();
            //SStarthour = $scope.Schedule.SlotStartTime.getHours(),
            //  SEndhour = $scope.Schedule.SlotEndTime.getHours();
            //if ($scope.Schedule.SlotStartTime != null || $scope.Schedule.SlotStartTime != undefined ||
            //  $scope.Schedule.SlotEndTime != null || $scope.Schedule.SlotEndTime != undefined) {
            //    if (Starthour < SStarthour || Starthour > SEndhour || Endhour < SStarthour || Endhour > SEndhour) {    //0   23
            //        $scope.DayError = true;
            //        IsValidToMoveNext = false;
            //    }
            //}
            //else {
            //    $scope.DayError = false;
            //}
            $scope.DayError = false;
        }



        //else {
        //    $scope.DayError = false;
        //}
  //  }



            // $scope.Schedule.StartTime < $scope.Schedule.EndTime) {     // Added by Nayan Kamble on 20/11/2019
            //  $scope.MorningError = true; 
            // IsValidToMoveNext = false;
            // }
        //else {
        //    IsValidToMoveNext = false;
        //}

        if (angular.isUndefined($scope.Schedule.DeptID) || $scope.Schedule.DeptID == 'Select' || $scope.Schedule.DeptID == 0) {        //$scope.Schedule.DeptID <= 0    commented & modified by Nayan Kamble on 11/11/2019
            $scope.DepartmentListError = true;
        IsValidToMoveNext = false;
    }
    else {
            $scope.DepartmentListError = false;
        }
        debugger;
        //if (angular.isUndefined($scope.Schedule.Interval) || $scope.Schedule.Interval == 'Select') {

        //    $scope.IntervalListError = true;
        //    IsValidToMoveNext = false;
        //}
        //else {
        //    $scope.IntervalListError = false;

        //    var timeDiff = $scope.Schedule.EndTime.getTime() - $scope.Schedule.StartTime.getTime(); // This will give difference in milliseconds
        //    var resultInMinutes = Math.round(timeDiff / 60000);
        //    if (resultInMinutes < $scope.Schedule.Interval) {
        //        $scope.IntervalListError = true;
        //        IsValidToMoveNext = false;
        //        alert("Please select inteval less than or equall to Start and End Time");
        //    }
        //}

        if ((angular.isUndefined($scope.Schedule.StartDate)
          || ($scope.Schedule.StartDate == null)
          || ($scope.Schedule.StartDate == ""))) {
            $scope.StartDateError = true;
            IsValidToMoveNext = false;
        } else {
            $scope.StartDateError = false;
    }

    if ($scope.Appointment.Type == 'Monthly') {
            if ($scope.DayRadio == 1) {
                $scope.ScheduleWeekError = false;
                $scope.ScheduleWeekDayError = false;
                $scope.IsDisableDayTextbox = false;

                if (angular.isUndefined($scope.Schedule.Day) || $scope.Schedule.Day == 0) {
                    $scope.ScheduleDayError = true;
                    IsValidToMoveNext = false;
                }
                else {
                    $scope.ScheduleDayError = false;
            }

                if (angular.isUndefined($scope.Schedule.Month) || ($scope.Schedule.Month == 0)) {
                    $scope.ScheduleMonthError = true;
                    IsValidToMoveNext = false;
                }
                else {
                    $scope.ScheduleMonthError = false;
            }
            } else if ($scope.DayRadio == 2) {
                $scope.ScheduleDayError = false;
                $scope.ScheduleMonthError = false;
                $scope.IsDisableDayTextbox = true;

                if (angular.isUndefined($scope.Schedule.SelectedWeek) || $scope.Schedule.SelectedWeek == 'Select') {
                    $scope.ScheduleWeekError = true;
                    IsValidToMoveNext = false;
                }
                else {
                    $scope.ScheduleWeekError = false;
            }

                if (angular.isUndefined($scope.Schedule.Selectedday) || ($scope.Schedule.Selectedday == 'Select')) {
                    $scope.ScheduleWeekDayError = true;
                    IsValidToMoveNext = false;
                }
                else {
                    $scope.ScheduleWeekDayError = false;
            }

    }
    }


        if ($scope.Appointment.Type == 'Weekly') {

            if ($scope.addDays.length > 0)
                $scope.DaySelectionError = false;
            else
                $scope.DaySelectionError = true;
        }
        return IsValidToMoveNext;
    }

    $scope.HideErrorMessage = function (field, ScheduleUnitList) {
        debugger;
        $scope.isAddRole = true;
        if (field == 'UnitList') {
            if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList > 0) {
                debugger;
                $scope.UnitListError = false;
            } else {
                $scope.UnitListError = true;
    }
        }

        if (field == 'ScheduleSlotList') {    //Added by Nayan Kamble on 19/11/2019
            if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList > 0) {
                debugger;
                $scope.ScheduleSlotListError = false;
            } else {
                $scope.ScheduleSlotListError = true;
            }
            $scope.getSlotlist();
        } 



        if (field == 'DoctorDepartment') {
            debugger;
            if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList > 0) {
                debugger;
                $scope.DepartmentListError = false;
            } else {
                $scope.DepartmentListError = true;
    }
        }
        if (field == 'IntervalList') {
            if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList != 'Select') {
                debugger;
                $scope.IntervalListError = false;
            } else {
                $scope.IntervalListError = true;
    }
    }

    if (field == 'DoctorNameList') {
            if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList != "") {

                $scope.IntervalListError = false;
            } else {
                $scope.IntervalListError = true;
    }
    }

    if (field == 'StartDate') {
            if (!angular.isUndefined(ScheduleUnitList)) {
                debugger;
                $scope.StartDateError = false;
                $scope.enddateOption.minDate = ScheduleUnitList;

                $scope.Schedule.EndDate = ScheduleUnitList;
            } else {
                $scope.StartDateError = true;
    }
    }

    if ($scope.DayRadio == 1) {
            $scope.ScheduleWeekDayError = false;
            $scope.ScheduleWeekError = false;
            $scope.IsDisableDayTextbox = false;

            if (field == 'ScheduleDay') {
                if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList != "") {
                    debugger;
                    if (ScheduleUnitList > 31) {
                        alert("Please enter date between 1 to 31");
                        $scope.ScheduleDayError = true;
                        return;
                }
                    $scope.ScheduleDayError = false;
                } else {
                    $scope.ScheduleDayError = true;
            }
    }

            if (field == 'ScheduleMonth') {
                if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList != "") {
                    debugger;
                    if (ScheduleUnitList > 12) {
                        alert("Please enter month between 1 to 12");
                        $scope.ScheduleMonthError = true;
                        return;
                }

                    $scope.ScheduleMonthError = false;
                } else {
                    $scope.ScheduleMonthError = true;
            }
    }
        } else if ($scope.DayRadio == 2) {

            $scope.ScheduleMonthError = false;
            $scope.ScheduleDayError = false;
            $scope.IsDisableDayTextbox = true;

            if (field == 'ScheduleWeek') {
                if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList != 'Select') {
                    debugger;
                    $scope.ScheduleWeekError = false;
                } else {
                    $scope.ScheduleWeekError = true;
            }
        }

            if (field == 'ScheduleWeekDay') {
                if (!angular.isUndefined(ScheduleUnitList) && ScheduleUnitList != 'Select') {
                    debugger;
                    $scope.ScheduleWeekDayError = false;
                } else {
                    $scope.ScheduleWeekDayError = true;
            }
    }
    }
    }

    $scope.GetAlternateMonthByDate = function GetAlternateMonthByDate() {
        debugger;
        $scope.setDates =[];
        $scope.selectedDates =[];
        $scope.count = 0;
        $scope.month = parseInt($scope.Schedule.Month);
        $scope.day = parseInt($scope.Schedule.Day);

        for (var i = 0; i < $scope.Schedule.ScheduleMonth.length; i++) {
            var date = new Date($scope.Schedule.ScheduleMonth[i]);
            date.setDate($scope.day);
            $scope.setDates.push(new Date(date));
    }

    for (var i = 0; i < $scope.setDates.length; i++) {
            if ($scope.month == 1) {

                if (i % 2 == 0)
                    $scope.selectedDates.push($scope.setDates[i]);

            } else {
                $scope.count += $scope.month +1;
                if (i == 0)
                    $scope.selectedDates.push($scope.setDates[i]);

                if ($scope.count < $scope.setDates.length)
                    $scope.selectedDates.push($scope.setDates[$scope.count]);

    }
    }


        for (var count = 0; count < $scope.selectedDates.length; count++) {
            $scope.ScheduleDayID.push($scope.selectedDates[count].getDay() +1);
            $scope.Schedule.ScheduleStartDates.push($scope.formatDate($scope.selectedDates[count]));
    }


    };

    $scope.getMondays = function getMondays(day, week) {
        debugger

        $scope.currentDate = new Date() ;
        for (var i = 0; i < $scope.Schedule.ScheduleMonth.length; i++) {

            var d = new Date($scope.Schedule.ScheduleMonth[i]),
           month = d.getMonth(),
           mondays =[]
            d.setDate(day);

            // Get the first Monday in the month
            while (d.getDay() !== day) {
                d.setDate(d.getDate() +1);
        }

            // Get all the other Mondays in the month
            while(d.getMonth() === month) {
                mondays.push(new Date(d.getTime()));
                d.setDate(d.getDate() +7);
        }

            if (mondays[week]> $scope.currentDate) {
                if (week == 0) {
                    $scope.Schedule.ScheduleStartDates.push($scope.formatDate(mondays[week]));
                    $scope.ScheduleDayID.push($scope.day +1);
                } else if (week == 1) {
                    $scope.Schedule.ScheduleStartDates.push($scope.formatDate(mondays[week]))
                    $scope.ScheduleDayID.push($scope.day +1);
                } else if (week == 2) {
                    $scope.Schedule.ScheduleStartDates.push($scope.formatDate(mondays[week]))
                    $scope.ScheduleDayID.push($scope.day +1);
                } else if (week == 3) {
                    $scope.Schedule.ScheduleStartDates.push($scope.formatDate(mondays[week]));
                    $scope.ScheduleDayID.push($scope.day +1);
                }
                else if (week == 4) {
                    $scope.Schedule.ScheduleStartDates.push($scope.formatDate(mondays[week]));
                    $scope.ScheduleDayID.push($scope.day +1);
            }
    }
    }

    }

    $scope.formatDate = function formatDate(d) {
        var date = new Date(d);
        var mm = date.getMonth() +1;
        var dd = date.getDate();
        var yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' +dd
        }
        if (mm < 10) { mm = '0' +mm
        };
        return d = mm + '/' + dd + '/' +yyyy
    }

        //Code to Delete Schedule 

        $scope.DeleteDoctorSchedule = function (Schedule) {
            debugger;
           // if (confirm("Are you sure want to Cancel Schedule ?")) {    commented by Nayan Kamble on 12/11/2019
            swalMessages.MessageBox('PalashIVF', "Are you sure want to delete schedule ?", "warning", function (isConfirmed) {   // Added by Nayan Kamble on 12/11/2019
               if (isConfirmed) {               // Added by Nayan Kamble on 12/11/2019
                    $scope.RemoveSchedule.ScheduleID = Schedule.ScheduleID;
                    $scope.RemoveSchedule.DOCID = $scope.Schedule.doctorID;
                    $scope.RemoveSchedule.IsScheduleCancel = true;


                    var Promise = ScheduleService.UpdateDoctorSchedule($scope.RemoveSchedule);
                    Promise.then(function (resp) {
                        debugger;
                        if (resp.data.value == 1) {

                            $scope.GetScheduleListByDoctorID($scope.Schedule.doctorID, $scope.currentDate);
                            //   alert("Record Deleted Successfully !!!");

                        }
                        if (resp.data.value == 10) {
                            //AlertMessage.warning('PalashIVF', objResource.msgYouCannotDeleteSchedule);   //Modified by Nayan Kamble on 11/11/2019 //Commented by swatih for localization 28/7/2020
                            AlertMessage.warning(objResource.msgTitle, objResource.msgYouCannotDeleteSchedule);//Modified by swatih for localization 28/7/2020
                            // alert( objResource.msgYouCannotDeleteSchedule)     Commented by Nayan Kamble on 11/11/2019
                        }
                        if (resp.data.value == 3) {
                            alert(objResource.msgBadRequest)
                        }

                    },
                    function (error) {
                        alert(error.Message);
                    });
                }
                else {
                    return;
                }
           });
        };


        $scope.getSlotlist = function () {    //Added by Nayan kamble on 22/11/2019
            debugger;
            if ($scope.Schedule.SlotID == 1) {     //Added by Nayan Kamble on 20/11/2019
                $scope.Schedule.SStartTime = $scope.MorningSTime;
                $scope.Schedule.SEndTime = $scope.MorningETime;
                $scope.Schedule.SlotStartTime = $scope.Schedule.SStartTime;
                $scope.Schedule.SlotEndTime = $scope.Schedule.SEndTime;
            }
            if ($scope.Schedule.SlotID == 2) {  //Added by Nayan Kamble on 20/11/2019
                $scope.Schedule.SStartTime = $scope.AfternoonSTime;
                $scope.Schedule.SEndTime = $scope.AfternoonETime;
                $scope.Schedule.SlotStartTime = $scope.Schedule.SStartTime;
                $scope.Schedule.SlotEndTime = $scope.Schedule.SEndTime;
            }
            if ($scope.Schedule.SlotID == 3) {   //Added by Nayan Kamble on 20/11/2019
                $scope.Schedule.SStartTime = $scope.EveningSTime;
                $scope.Schedule.SEndTime = $scope.EveningETime;
                $scope.Schedule.SlotStartTime = $scope.Schedule.SStartTime;
                $scope.Schedule.SlotEndTime = $scope.Schedule.SEndTime;
            }
            if ($scope.Schedule.SlotID == 4) {    //Added by Nayan Kamble on 20/11/2019
                $scope.Schedule.SStartTime = $scope.DaySTime;
                $scope.Schedule.SEndTime = $scope.DayETime;
                $scope.Schedule.SlotStartTime =$scope. Schedule.SStartTime;
                $scope.Schedule.SlotEndTime = $scope.Schedule.SEndTime;
            }
        }
    $scope.UpdateDoctorSchedule = function (Schedule, Update) {
        debugger;
        $scope.isUpdateService = false;
        $scope.btnSaveTitle = objResource.btnUpdate;
        $scope.Schedule.DeptID = Schedule.DeptID;
        $scope.Schedule.ScheduleUnitID = Schedule.ScheduleUnitID;
        $scope.Appointment.Type = Schedule.ScheduleType;
        //$scope.Schedule.ScheduleSlot = Schedule.ScheduleSlot;   //Added by Nayan Kamble on 20/11/2019
        $scope.Schedule.SlotID = Schedule.SlotID;   //Added by Nayan Kamble on 20/11/2019

        if ($scope.Schedule.SlotID == 1) {     //Added by Nayan Kamble on 20/11/2019
            $scope.Schedule.SStartTime = $scope.MorningSTime;
            $scope.Schedule.SEndTime = $scope.MorningETime;
            $scope.Schedule.SlotStartTime = $scope.Schedule.SStartTime;
            $scope.Schedule.SlotEndTime = $scope.Schedule.SEndTime;
        }
        if ($scope.Schedule.SlotID == 2) {  //Added by Nayan Kamble on 20/11/2019
            $scope.Schedule.SStartTime = $scope.AfternoonSTime;
            $scope.Schedule.SEndTime = $scope.AfternoonETime;
            $scope.Schedule.SlotStartTime = $scope.Schedule.SStartTime;
            $scope.Schedule.SlotEndTime = $scope.Schedule.SEndTime;
        }
        if ($scope.Schedule.SlotID == 3) {   //Added by Nayan Kamble on 20/11/2019
            $scope.Schedule.SStartTime = $scope.EveningSTime;
            $scope.Schedule.SEndTime = $scope.EveningETime;
            $scope.Schedule.SlotStartTime = $scope.Schedule.SStartTime;
            $scope.Schedule.SlotEndTime = $scope.Schedule.SEndTime;
        }
        if ($scope.Schedule.SlotID == 4) {    //Added by Nayan Kamble on 20/11/2019
            $scope.Schedule.SStartTime = $scope.DaySTime;
            $scope.Schedule.SEndTime = $scope.DayETime;
            $scope.Schedule.SlotStartTime = $scope.Schedule.SStartTime;
            $scope.Schedule.SlotEndTime = $scope.Schedule.SEndTime;
        }
        $scope.getSlotlist();



        //Function called to change div based on Drop-dawn list
        $scope.changeAppointmentType();
        $scope.Schedule.StartTime = new Date(Schedule.StartTime);
        $scope.Schedule.EndTime = new Date(Schedule.EndTime);
        $scope.Schedule.Interval = $scope.timelist[1];
        $scope.Schedule.StartDate = new Date(Schedule.StartTime);
        $scope.Schedule.EndDate = new Date(Schedule.EndTime);
        $scope.Schedule.ScheduleType = $scope.Appointment.Type;
        $scope.Schedule.ScheduleID = Schedule.ScheduleID;
        $scope.Schedule.DOCID = Schedule.doctorID;



        if (!angular.isUndefined($scope.Schedule.ScheduleStartDates))
            $scope.Schedule.ScheduleStartDates = $scope.Schedule.ScheduleStartDates.toString();
else
            $scope.Schedule.ScheduleStartDates = "";

        $scope.UpdateService($scope.Schedule, $scope.isUpdateService);
    };

    $scope.UpdateService = function UpdateService(Schedule, isUpdateService) {
        debugger;

        $scope.UpdateSchedule.DeptID = Schedule.DeptID;
        $scope.UpdateSchedule.ScheduleUnitID = Schedule.ScheduleUnitID;
        $scope.Appointment.Type = Schedule.ScheduleType;
        //Function called to change div based on Drop-dawn list
        $scope.changeAppointmentType();
        $scope.UpdateSchedule.StartTime = new Date(Schedule.StartTime);
        $scope.UpdateSchedule.EndTime = new Date(Schedule.EndTime);
        $scope.UpdateSchedule.Interval = Schedule.Interval;
        $scope.UpdateSchedule.StartDate = new Date(Schedule.StartTime);
        $scope.UpdateSchedule.EndDate = new Date(Schedule.EndTime);
        $scope.UpdateSchedule.ScheduleType = $scope.Appointment.Type;
        $scope.UpdateSchedule.ScheduleID = Schedule.ScheduleID;
        $scope.UpdateSchedule.DOCID = Schedule.doctorID;
       // $scope.UpdateSchedule.ScheduleSlot = Schedule.ScheduleSlot;   //Added by Nayan Kamble on 19/11/2019
        $scope.UpdateSchedule.SlotID = Schedule.SlotID;   //Added by Nayan Kamble on 20/11/2019
        $scope.UpdateSchedule.Status = true;
        $scope.UpdateSchedule.ScheduleStartDates = $scope.Schedule.ScheduleStartDates.toString();

        if (!angular.isUndefined($scope.ScheduleDayID))
            $scope.UpdateSchedule.DayID = $scope.ScheduleDayID.toString();
        else
            $scope.Schedule.ScheduleStartDates = "";
        // $scope.UpdateSchedule.DayID = $scope.ScheduleDayID.toString();

        //Audit Update Schedule

        debugger;
        //$scope.frmComp.$setPristine();
        var OldDataValue =[];
        for (var i = 0; i < $scope.frmDailySchedule.modifiedModels.length; i++) {
            if ($scope.frmDailySchedule.modifiedModels[i].masterValue === undefined || $scope.frmDailySchedule.modifiedModels[i].masterValue === null)
                $scope.frmDailySchedule.modifiedModels[i].masterValue = "";

            var jmodel = {
                    field: $scope.frmDailySchedule.modifiedModels[i].$name,
                    oldvalue: $scope.frmDailySchedule.modifiedModels[i].masterValue.toString(),
                    newvalue: $scope.frmDailySchedule.modifiedModels[i].$viewValue.toString(),
                ID: i
        };
            OldDataValue.push(jmodel);
    }


        if (isUpdateService) {
            var Promise = ScheduleService.UpdateDoctorSchedule($scope.UpdateSchedule, OldDataValue);
            Promise.then(function (resp) {
                debugger;
                if (resp.data.value == 1) {
                    $scope.btnSaveTitle = objResource.btnSave;
                    $scope.Clear();
                    $scope.GetScheduleListByDoctorID($scope.Schedule.doctorID, $scope.currentDate);
                    $scope.frmDailySchedule.modifiedModels =[];
                    $scope.frmDailySchedule.$setPristine();
                    AlertMessage.info(objResource.msgTitle, objResource.msgUpdate);
                    //  alert("Record Added Successfully !!!");


            }
                if (resp.data.value == 3) {
                    alert(objResource.msgBadRequest)
            }

            },
            function (error) {
                alert(error.Message);
});
    }
    }

    $scope.GetDoctorScheduleDates = function GetDoctorScheduleDates(Schedule) {
        debugger;
        $scope.DoctorSchedule = {
        };
        $scope.DoctorSchedule.DOCID = Schedule.doctorID;
        $scope.DoctorSchedule.StartTime = Schedule.StartTime;
        $scope.DoctorSchedule.EndTime = Schedule.EndTime;
        $scope.DoctorSchedule.ScheduleSlot = Schedule.ScheduleSlot;   //Added by Nayan Kamble on 19/11/2019
        $scope.DoctorSchedule.SlotID = Schedule.SlotID;   //Added by Nayan Kamble on 19/11/2019


        //$scope.DoctorSchedule.ScheduleStartDates = $scope.Schedule.ScheduleStartDates.toString();

        //if ($scope.DoctorSchedule.ScheduleStartDates == "" || $scope.DoctorSchedule.ScheduleStartDates == null) {
        //    alert("Sorry, No Selected Day found please select Correct Day between Start Date and End Date");
        //    return;
        //}

        $scope.DoctorSchedule.ScheduleStartDates = $scope.Schedule.StartDate.toString();
        if ($scope.DoctorSchedule.StartTime == "" || $scope.DoctorSchedule.EndTime == null) {
           // AlertMessage.warning('PalashIVF', objResource.msgNoSelectedDayFound);       //Added by Nayan Kamble on 11/11/2019 //commented by swatih for localization 28/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgNoSelectedDayFound);//Modified by swatih for localization 28/7/2020
          //  alert(objResource.msgNoSelectedDayFound);   commented by Nayan Kamble on 11/11/2019
            return;
    }


        var responseData = ScheduleService.GetDoctorScheduleDates(Schedule.doctorID);
        responseData.then(function (Response) {
            debugger;
            $scope.ScheduleListByDateTime = Response.data.value;
            $scope.DateTimeMatch = false;
            var myDates = $scope.DoctorSchedule.ScheduleStartDates.split(",");

            loop1:
                for (var i = 0; i < $scope.ScheduleListByDateTime.length ; i++) {
                    loop2:
                        for (var count = 0; count < myDates.length; count++) {
                            debugger;
                            var sd = new Date(myDates[count].toString());
                            $scope.StartTime = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate(), Schedule.StartTime.getHours(), Schedule.StartTime.getMinutes(), 0, 0);
                            $scope.EndTime = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate(), $scope.DoctorSchedule.EndTime.getHours(), $scope.DoctorSchedule.EndTime.getMinutes(), 0, 0);

                            var startDate = new Date($scope.ScheduleListByDateTime[i].StartTime);
                            var endDate = new Date($scope.ScheduleListByDateTime[i].EndTime);


                            if (startDate.toString() == $scope.StartTime.toString() || endDate == $scope.EndTime.toString() || (startDate < $scope.StartTime && $scope.EndTime < endDate)
                                || ($scope.StartTime < endDate && endDate < $scope.EndTime) || ($scope.StartTime < startDate && startDate < $scope.EndTime)) {
                                $scope.DateTimeMatch = true;
                                break  loop1;

                            } else {
                                $scope.DateTimeMatch = false;
                        }
                }
        }
            if ($scope.DateTimeMatch) {
                //AlertMessage.warning('PalashIVF', objResource.msgScheduleIsAlreadyBooked);   //Added by Nayan Kamble on 11/11/2019 //commented by swatih for localization 28/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgScheduleIsAlreadyBooked);//Modified by swatih for localization 28/7/2020
                //alert( objResource.msgScheduleIsAlreadyBooked);    Commented by Nayan Kamble on 11/11/2019
            }
            else {
                $scope.AddDoctorScheduleMaster($scope.Schedule);
        }

}, function (error) {
            AlertMessage.error('Error', error.status);
    });

    };
    var count = 0;
    $scope.AddDoctorScheduleMaster = function AddDoctorScheduleMaster(Schedule) {
        if (count == 0) {
            count = 1;
            $scope.ScheduleDetails.DOCID = Schedule.doctorID;
            $scope.ScheduleDetails.DeptID = Schedule.DeptID;
            $scope.ScheduleDetails.ScheduleUnitID = Schedule.ScheduleUnitID;
            $scope.ScheduleDetails.Status = Schedule.Status;
            $scope.ScheduleDetails.Interval = Schedule.Interval;
            $scope.ScheduleDetails.StartTime = Schedule.StartTime;
            $scope.ScheduleDetails.EndTime = Schedule.EndTime;
            $scope.ScheduleDetails.ScheduleType = $scope.Appointment.Type;
            $scope.ScheduleDetails.DayID = $scope.ScheduleDayID.toString();
            //$scope.ScheduleDetails.ScheduleSlot = Schedule.ScheduleSlot;   //Added by Nayan kamble on 19/11/2019
            $scope.ScheduleDetails.SlotID = Schedule.SlotID;   //Added by Nayan kamble on 19/11/2019

            $scope.ScheduleDetails.ScheduleStartDates = $scope.Schedule.ScheduleStartDates.toString();
            debugger;
            usSpinnerService.spin('GridSpinner');
            var Promise = ScheduleService.AddDoctorScheduleMaster($scope.ScheduleDetails);

            Promise.then(function (resp) {
               
                debugger;
                if (resp.data.value == 1) {
                    //  $scope.GetDoctDetailByNameSearch($scope.doctorName);
                    $scope.Clear();
                    $scope.GetScheduleListByDoctorID($scope.Schedule.doctorID, $scope.currentDate);
                    AlertMessage.info(objResource.msgTitle, objResource.msgSave);   //objResource.msgRecordAddedSuccessfully
                    //alert("Record Added Successfully !!!");
            }


                if (resp.data.value == 3) {
                    alert(objResource.msgBadRequest)
            }

                if (resp.data.value == 5) {
                    //AlertMessage.warning('PalashIVF', objResource.msgScheduleIsAlreadyBooked);     //Modified by Nayan kamble on 11/11/2019 //commented by swatih for localization 28/7/2020
                    AlertMessage.warning('PalashIVF', objResource.msgScheduleIsAlreadyBooked);//Modified by swatih for localization 28/7/2020
                    // alert(objResource.msgScheduleIsAlreadyBooked);    Commented by Nayan kamble on 11/11/2019
            }

                count = 0;
            },
                function (error) {
                    alert(error.Message);
                     usSpinnerService.stop('GridSpinner');
    });

    }
    };


    $scope.AddScheduleDetail = function AddScheduleDetail(Schedule) {
        debugger;
        $scope.ScheduledetailsMaster.DocScheduleDetailID = $scope.CurrentScheduleId;
        $scope.ScheduledetailsMaster.Interval = $scope.timelist[1];
        $scope.ScheduledetailsMaster.StartTime = $scope.Schedule.StartTime;
        $scope.ScheduledetailsMaster.EndTime = $scope.Schedule.EndTime;

        for (var i = 0; i < $scope.ScheduleDayID.length; i++) {
            debugger;
            $scope.ScheduledetailsMaster.DayID = $scope.ScheduleDayID[i];
            var Promise = ScheduleService.AddScheduleDetail($scope.ScheduledetailsMaster);
        }
        Promise.then(function (resp) {
            debugger;
            if (resp.data.value == 1) {
                $scope.Clear();
                // alert("Record Added Successfully !!!");

                $scope.AddDoctorScheduledetailsMaster($scope.DoctorScheduleDetailMaster);
        }
            if (resp.data.value == 3) {
                alert("Bad Request")
        }


        },
            function (error) {
                alert(error.Message);
    });
    }

    $scope.AddDoctorScheduledetailsMaster = function AddDoctorScheduledetailsMaster(Schedule) {
        $scope.DoctorScheduleDetailMaster.ScheduleUnitID = $scope.Schedule.ScheduleUnitID;
        $scope.DoctorScheduleDetailMaster.StartTime = $scope.Schedule.StartTime;
        $scope.DoctorScheduleDetailMaster.EndTime = $scope.Schedule.EndTime;
        $scope.DoctorScheduleDetailMaster.ScheduleID = $scope.CurrentScheduleId;
        $scope.DoctorScheduleDetailMaster.ScheduleType = $scope.Appointment.Type;
        $scope.ScheduledetailsMaster.Interval = $scope.timelist[1];;

        var Promise = ScheduleService.AddDoctorScheduleDetails($scope.DoctorScheduleDetailMaster);
        Promise.then(function (resp) {
            debugger;
            if (resp.data.value == 1) {
                $scope.Clear();
                //   alert("Record Added Successfully !!!");
        }
            if (resp.data.value == 3) {
                alert(objResource.msgBadRequest)
        }

        },
            function (error) {
                alert(error.Message);
    });
    }

    $scope.fnChangeAssetType = function (selectedDay) {
        debugger;
        if (selectedDay.id)
            $scope.addDays.push(selectedDay.DayID -1);
        else
            $scope.addDays.pop(selectedDay.DayID -1);
    }

    $scope.GetShortDayList = function GetShortDayList(ScheduleList) {
        debugger;
        $scope.Dictionary = {
        };
        for (var i = 0; i < $scope.ScheduleList.length; i++) {
            debugger;
            if ($scope.ScheduleList[i].DaysByComma != null) {
                var myarray = $scope.ScheduleList[i].DaysByComma.split(',');
                //remove duplicate element from array
                myarray = myarray.filter(function (item, index, inputArray) {
                    return inputArray.indexOf(item) == index;
            });
                //Remove "" element from array
                myarray = myarray.filter(item => item !== "");
                myarray.sort();
                $scope.Dictionary[$scope.ScheduleList[i].DaysByComma]= ' ( ';
                for (var j = 0; j < myarray.length; j++) {
                    $scope.Dictionary[$scope.ScheduleList[i].DaysByComma]+= $scope.scheduleShortDaysList[myarray[j]]+ ' ';
                    if (j == 6)
                        break;
            }
                $scope.Dictionary[$scope.ScheduleList[i].DaysByComma]+= ') ';
        }

    }
    }

    $scope.GetScheduleListByDoctorID = function GetScheduleListByDoctorID(DoctorID, ScheduleDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = DoctorService.GetScheduleListByDoctorID(DoctorID, ScheduleDate);
        responseData.then(function (Response) {
            debugger;
            $scope.ScheduleList = Response.data.value;

            if ($scope.ScheduleList.length > 0) {
                $scope.isHideTable = true;
                $scope.GetShortDayList($scope.ScheduleList);
            }
            else {
                $scope.isHideTable = false;
        }

            if ($scope.Schedule.UnitID == undefined) {
                $scope.Schedule.UnitID = 0;
        }
            $scope.Clear();
            usSpinnerService.stop('GridSpinner');

}, function (error) {
            AlertMessage.error('Error', error.status);
            usSpinnerService.stop('GridSpinner');
    });


    };


        //Cancel Button click 

        $scope.CancelSchedule = function CancelSchedule() {
            debugger;
            $scope.Clear();
            $scope.changeAppointmentType();
            if (!angular.isUndefined($rootScope.LandingSchedule)) {
                debugger;
                //$scope.isMoveFromLanding = false;
            if (!angular.isUndefined($rootScope.LandingSchedule.SearchDoctorName))
                $scope.GetDoctDetailByNameSearch($rootScope.LandingSchedule);
            }
            else {
            $scope.GetDoctDetailByNameSearch(doctorName.SearchDoctorName);
    }

    };

        //Execure Default Functions
        //Hide Search box when redirect from Landing Page
        if (!angular.isUndefined($rootScope.LandingSchedule)) {
            debugger;
            if (!angular.isUndefined($rootScope.LandingSchedule.SearchDoctorName)) {
            $scope.isMoveFromLanding = true;
            $scope.GetDoctDetailByNameSearch($rootScope.LandingSchedule);
    }
    }

        //  $scope.GetDDUnitList(0);
        $scope.GetDayMaster();
        $scope.GetDDDepartmentList();
        $scope.GetDocList();
        $scope.FillScheduleSlot(); //Added by Nayan Kamble on 19/11/2019


});
