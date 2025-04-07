'use strict';

angular.module('PIVF').controller('DoctorScheduleLandingController', function ($scope, $rootScope, DoctorService, QueueService, $filter, $location, ScheduleService, usSpinnerService, $uibModal, AlertMessage, srvCommon, Common) {

    //Variable Declaration For  =========================================================================             
    usSpinnerService.spin('GridSpinner');
    $scope.ScheduleDate = new Date();
    $scope.Schedule = {};
    $scope.Schedule.counter = 0;
    $scope.countIndex = 0;
    $scope.Schedule = {};
    $scope.Schedule.DOCID = 0;
    $scope.Schedule.ScheduleUnitID = 0;
    $scope.DSSchedule = {};
    $scope.DSSchedule.FromTime = new Date();
    $scope.DSSchedule.DOCID = 0;
    $scope.DSSchedule.ScheduleUnitID = 0;
    $scope.DSSchedule.ScheduleType = "";
    $scope.DSSchedule.DeptID = 0;
    $scope.DSSchedule.ScheduleDate = new Date();
    $scope.scheduleCurrentPage = 1;
    $rootScope.LandingSchedule = {};
    $rootScope.LandingSchedule.SearchText = false;
    $scope.scheduleShortDaysList = [null, 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    var objResource = {};
    $scope.RemoveSchedule = {};
    $scope.isHideTable = false;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.FormName = 'Doctor Schedule';

    $scope.Schedule.DeptID = $scope.DSSchedule.DeptID;
    debugger;
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    $scope.NewDocSchedule = function NewDocSchedule() {
        debugger;
        $location.path('/DoctorDailyAppt/');
        $rootScope.LandingSchedule.SearchText = false;
        $rootScope.FormName = 'New Schedule';

    }

    $scope.UpdateDoctorScheduleLanding = function UpdateDoctorScheduleLanding(DoctorID) {
        debugger;
        $scope.GetSpecificDoctor(DoctorID);
        $rootScope.FormName = 'View/Edit Schedule';
    }

    $scope.ChangeStatusLandPage = function (Schedule) {
        debugger;
        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: 'modReason',
            controller: 'ctrlPopUp',
            backdrop: false,
            keyboard: false,
            size: 'sm',
            resolve: {
                objUser: function () {
                    return Schedule;
                }
            }
        });

        modalInstance.result.then(function (reason, userback) {     // return here after cancel reason entered
            debugger;
            $scope.RemoveSchedule.ScheduleID = Schedule.ScheduleID;
            $scope.RemoveSchedule.DOCID = Schedule.DOCID;
            $scope.RemoveSchedule.ReasonForAD = reason;
            $scope.RemoveSchedule.Status = Schedule.Status == true ? false : true;
            var responseData = ScheduleService.UpdateDSStatusLanding($scope.RemoveSchedule);

            responseData.then(function (Response) {
                // debugger;
                if (Response.data.value == 1) {
                    Schedule.Status = !$scope.RemoveSchedule.Status;
                    AlertMessage.success(objResource.msgTitle, objResource.lblScheduleActiveDeactiveMessage);
                    $scope.GetScheduleListLanding($scope.scheduleCurrentPage - 1, $scope.DSSchedule.ScheduleDate, $scope.DSSchedule.DOCID, $scope.DSSchedule.ScheduleUnitID, $scope.DSSchedule.ScheduleType, $scope.DSSchedule.DeptID);
                }
            }, function (error) {
                //  debugger;
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        });

    };


    $scope.GetSpecificDoctor = function GetSpecificDoctor(DOCID) {

        var Promise = DoctorService.GetSpecificDoctor(DOCID);
        Promise.then(function (Response) {
            debugger;
            $scope.LandDocNameList = Response.data;
            $rootScope.LandingSchedule.SearchText = true;
            $rootScope.LandingSchedule.SearchDoctorName = $scope.LandDocNameList.FirstName;
            $rootScope.LandingSchedule.DOCID = $scope.LandDocNameList.DOCID;
            $location.path('/DoctorDailyAppt/');
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };


    $scope.SearchDShcedule = function SearchDShcedule(Schedule) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $scope.DSSchedule.DOCID = Schedule.DOCID;
        $scope.DSSchedule.ScheduleUnitID = Schedule.ScheduleUnitID;
        $scope.DSSchedule.ScheduleType = Schedule.Type;
        $scope.DSSchedule.DeptID = Schedule.DeptID;

        var responseData = DoctorService.GetScheduleListLanding($scope.scheduleCurrentPage - 1, $scope.DSSchedule.ScheduleDate, Schedule.DOCID, Schedule.ScheduleUnitID, Schedule.Type, Schedule.DeptID);
        responseData.then(function (Response) {
            debugger;
            usSpinnerService.stop('GridSpinner');
            $scope.ScheduleListLanding = Response.data.value;
            if (Response.data.value.length > 0)
            {
                $scope.scheduleTotalItems = $scope.ScheduleListLanding[0].TotalRecords;

            }
            else {
                $scope.scheduleTotalItems = 0;
            }
              


        }, function (error) {
            AlertMessage.error('Error', error.status);
            usSpinnerService.stop('GridSpinner');
        });

    };

    $scope.GetClinicNameByScheduleID = function GetClinicNameByScheduleID(ScheduleID) {

        $scope.filterObj = $scope.UnitList.filter(function (e) {
            return e.UnitID == ScheduleID;
        });
        return $scope.filterObj[0].UnitName;

    }

    //Get Schedule List for Landing Page
    $scope.GetScheduleListLanding = function GetScheduleListLanding(scheduleCurrentPage, ScheduleDate, FirstName, ScheduleUnitID, ScheduleType, DeptID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = DoctorService.GetScheduleListLanding(scheduleCurrentPage, ScheduleDate, FirstName, ScheduleUnitID, ScheduleType, DeptID);
        responseData.then(function (Response) {
            debugger;
            usSpinnerService.stop('GridSpinner');
            $scope.ScheduleListLanding = Response.data.value;
            if (Response.data.value.length > 0) {
                $scope.scheduleTotalItems = $scope.ScheduleListLanding[0].TotalRecords;
                $scope.GetShortDayList($scope.ScheduleListLanding);
            }
        }, function (error) {
            AlertMessage.error('Error', error.status);
            usSpinnerService.stop('GridSpinner');
        });
    }

    $scope.GetShortDayList = function GetShortDayList(ScheduleList) {
        debugger;
        $scope.Dictionary = {};
        for (var i = 0; i < ScheduleList.length; i++) {
            debugger;
            if (ScheduleList[i].DaysByComma != null) {
                var myarray = ScheduleList[i].DaysByComma.split(',');
                //remove duplicate element from array
                myarray = myarray.filter(function (item, index, inputArray) {
                    return inputArray.indexOf(item) == index;
                });
                //Remove "" element from array
                myarray = myarray.filter(item => item !== "");
                myarray.sort();
                $scope.Dictionary[ScheduleList[i].DaysByComma] = ' ( ';
                for (var j = 0; j < myarray.length; j++) {
                    $scope.Dictionary[ScheduleList[i].DaysByComma] += $scope.scheduleShortDaysList[myarray[j]] + ' ';
                    if (j == 6)
                        break;
                }
                $scope.Dictionary[ScheduleList[i].DaysByComma] += ') ';
            }

        }
    }
    //Get Clinic Name with ID
    $scope.GetDDUnitList = function GetDDUnitList(IsListing) {
        debugger;
        var responseData = DoctorService.GetDDUnitList(IsListing);
        responseData.then(function (Response) {
            debugger;
            $scope.UnitList = Response.data.value;


            //if ($scope.Schedule.UnitID == undefined) {
            //    $scope.Schedule.UnitID = 0;
            //}

        }, function (error) {
            AlertMessage.error('Error', error.status);
        });

    };
    //Get Department list for drop-dawn Department.

    $scope.GetDDDepartmentList = function GetDDDepartmentList(UnitID) {
        var responseData = DoctorService.GetDepartmentListForDoc(UnitID);
        debugger;
        responseData.then(function (Response) {
            if (Response.data.value.length > 0) {
                $scope.DepartmentList = Response.data.value;
                Response.data.value.splice(0, 1, { DeptID: 0, Description: 'Department' })

            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }


    //Pagination

    $scope.pageChange = function PageChange() {
        debugger;
        $scope.GetScheduleListLanding($scope.scheduleCurrentPage - 1, $scope.DSSchedule.ScheduleDate, $scope.DSSchedule.DOCID, $scope.DSSchedule.ScheduleUnitID, $scope.DSSchedule.ScheduleType, $scope.DSSchedule.DeptID);

    }


    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        //  var Promise = StaffService.StaffList($scope.CurrentPage - 1, $scope.SL.Name, $scope.SL.DeptID, $scope.SL.MobNo, $scope.SL.EID, $scope.SL.DegID, $scope.SL.Qua, $scope.SL.Exp, $scope.SL.EmailID, $scope.SL.MID, $scope.SL.GId, false);

        var Promise = DoctorService.GetScheduleListLanding($scope.scheduleCurrentPage - 1, $scope.DSSchedule.ScheduleDate, $scope.DSSchedule.DOCID, $scope.DSSchedule.ScheduleUnitID, $scope.DSSchedule.ScheduleType, $scope.DSSchedule.DeptID);

        Promise.then(function (Response) {
            //  debugger;
            var filteredData = _.map(Response.data.value, function (data) {

                var users = {
                    'Doctor Name': data.DoctorName, 'Clinic': $scope.GetClinicNameByScheduleID(data.ScheduleUnitID), 'Department': data.Department, 'Schedule': data.ScheduleType + ' ' + $filter('date')(new Date(data.StartTime), 'hh:mm a') + ' To ' + $filter('date')(new Date(data.EndTime), 'hh:mm a'), 'Date': $filter('date')(new Date(data.StartTime), "dd-MMM-yyyy") + ' To ' + $filter('date')(new Date(data.EndTime), "dd-MMM-yyyy"), 'Status': data.Status
                }
                return users;
            });

            alasql('SELECT * INTO XLSX("DoctorSchedules.xlsx",{headers:true}) FROM ?', [filteredData]);

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });



    }

    //Get All Doctor List  for drop-dawn Doctor.
    $scope.GetDocList = function GetDocList() {
        debugger;
        var responseData = Common.GetDoctorList();
        responseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: objResource.lblDoctor })
            $scope.DocList = Response.data;
            $scope.Schedule.DOCID = 0;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetScheduleListByDoctorID = function GetScheduleListByDoctorID(DoctorID, ScheduleDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = DoctorService.GetScheduleListByDoctorID(DoctorID, ScheduleDate);
        responseData.then(function (Response) {
            debugger;
            $scope.ScheduleList = Response.data.value;
            usSpinnerService.stop('GridSpinner');
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

        }, function (error) {
            AlertMessage.error('Error', error.status);
            usSpinnerService.stop('GridSpinner');
        });


    };


    //Execute functions when controller load
    $scope.GetScheduleListLanding($scope.scheduleCurrentPage - 1, $scope.DSSchedule.ScheduleDate, $scope.DSSchedule.DOCID, $scope.DSSchedule.ScheduleUnitID, $scope.DSSchedule.ScheduleType, $scope.DSSchedule.DeptID);
    $scope.GetDDUnitList(true);
    $scope.GetDDDepartmentList(0);
    $scope.GetDocList();
});

