'use strict';
angular.module('PIVF').controller("customModalCtrl", function ($rootScope, $scope, localStorageService, PatientDashboardSrv, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location , $uibModalInstance ) {


$scope.FromDate = "";
$scope.ToDate = "";

$scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
$scope.format = $scope.formats[0];
$scope.altInputFormats = ['M!/d!/yyyy'];

// Configuration for date-picker with dynamic minDate and maxDate
$scope.FromDateOptions = {
    formatYear: 'yyyy',
    startingDay: 1,
    showWeeks: false,
    minDate: null, // Dynamically updated based on ToDate
    maxDate: null, // Dynamically updated based on ToDate
    showButtonBar: false // Hides Today, Done, and Clear buttons
};

$scope.ToDateOptions = {
    formatYear: 'yyyy',
    startingDay: 1,
    showWeeks: false,
    minDate: null, // Dynamically updated based on FromDate
    maxDate: null, // Dynamically updated based on FromDate
    showButtonBar: false // Hides Today, Done, and Clear buttons
};

// Watch for changes in FromDate to update ToDate's minDate
$scope.$watch('FromDate', function (newValue) {
    if (newValue) {
        $scope.ToDateOptions.minDate = new Date(newValue); // Set minDate for ToDate picker
    } else {
        $scope.ToDateOptions.minDate = null; // Reset minDate if FromDate is cleared
    }
});

// Watch for changes in ToDate to update FromDate's maxDate
$scope.$watch('ToDate', function (newValue) {
    if (newValue) {
        $scope.FromDateOptions.maxDate = new Date(newValue); // Set maxDate for FromDate picker
    } else {
        $scope.FromDateOptions.maxDate = null; // Reset maxDate if ToDate is cleared
    }
});


    // Close the modal and pass selected dates back to the calling component
    $scope.close = function () {
        if ($scope.FromDate && $scope.ToDate) {


            $rootScope.chartCustomFromDate = $scope.FromDate;
            $rootScope.chartCustomToDate = $scope.ToDate;


            $uibModalInstance.close({
                fromDate: $scope.FromDate,
                toDate: $scope.ToDate
            });



        } else {
            alert("Please select both From Date and To Date before closing the modal.");
        }
    };

    // Dismiss the modal
    $scope.dismiss = function () {
        $uibModalInstance.dismiss('cancel');
    };




  $scope.open4 = function () {
    debugger;
        $scope.popup4.opened = true;
    };

    $scope.popup4 = {
        opened: false
    };
    $scope.open5 = function () {
    debugger;
        $scope.popup5.opened = true;
    };

    $scope.popup5 = {
        opened: false
    };








})