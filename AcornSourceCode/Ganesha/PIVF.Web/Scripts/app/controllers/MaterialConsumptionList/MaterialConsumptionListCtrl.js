'use strict';
angular.module('PIVF').controller("MaterialConsumptionListCtrl", ['$rootScope', '$scope', 'localStorageService', 'MaterialConsumptionListSrv', 'PatientVisitService','CounterSaleSrv', 'StoreService', 'Common', 'usSpinnerService', 'srvCommon', 'AlertMessage', '$filter', '$location' ,'swalMessages', //'localStorageService'
function ($rootScope, $scope, localStorageService,MaterialConsumptionListSrv ,PatientVisitService ,CounterSaleSrv, StoreService, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location,swalMessages) {
//Declarations
debugger;
$scope.PatientData = {};
$scope.MaterialConsumptionInfo={};
$scope.PatientData.UnitID = localStorageService.get("UserInfo").UnitID;
$scope.MaterialConsumptionInfo.UnitID = 0;
$scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
$scope.format = $scope.formats[0];
$scope.altInputFormats = ['M!/d!/yyyy'];


//For date Popups
   $scope.open1 = function () {
    debugger;
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

     $scope.open2 = function () {
    debugger;
        $scope.popup1.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };


     $scope.FromToDateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End

     $scope.dateOptionsDOB = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End


/***********************************************************************************************************************/
//To load dropdown data when page loaded
$scope.loadData = function loadData() {
    debugger;
     var UserInfo = localStorageService.get("UserInfo");
     $scope.MaterialConsumptionInfo.UnitID = UserInfo.UnitID;
    }
/***********************************************************************************************************************/




}]);   