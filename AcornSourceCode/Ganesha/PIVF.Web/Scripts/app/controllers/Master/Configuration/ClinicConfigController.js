'use strict';
angular.module('PIVF').controller('ClinicConfigController', function ($rootScope, $scope, ClinicConfigService, $uibModal, srvCommon, $location, AlertMessage, Common, localStorageService, usSpinnerService) {
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    $scope.ClinicList = [];
    $rootScope.CycleDetails = null;
    $rootScope.Allergies = null;
    $rootScope.hideWhenQueue = true;
    $rootScope.ForPrint = 0;
    var objResource = {}; //Added by swatih for localization 24/7/2020
    //Added by swatih for localization 24/7/2020 start
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Added by swatih for localization 24/7/2020 end
    $rootScope.FormName = 'Clinic Configuration';
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    $scope.LoadData = function () {
        $scope.getClinic();
        debugger;
    }
    $scope.getClinic = function () {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = ClinicConfigService.getClinic();
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            debugger;
            if (Response.data != null && Response.data.length > 0) {
                $scope.ClinicList = Response.data;
             
              //  $scope.TotalItems = $scope.ClinicList[0].TotalItems;
            } else {

            }
        }, function (error) {
            // AlertMessage.warning('PalashIVF', 'Error Occured.');//Commented by swatih for localization 24/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 24/7/2020
            usSpinnerService.stop('GridSpinner');
        });
    }

    $scope.Save = function () {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = ClinicConfigService.SaveClinic($scope.ClinicList);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            debugger;
            if (Response.data=1) {
                //AlertMessage.success('PalashIVF', 'Record Save Successfully.');//Commented by swatih for localization 24/7/2020
                AlertMessage.success(objResource.msgTitle, objResource.msgRecordSaveSuccessfully);//Modified by swatih for localization 24/7/2020
                $scope.getClinic();
            } else {
                //AlertMessage.warning('PalashIVF', 'Something Went Wrong.');//Commented by swatih for localization 24/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgSomethingWentWrong);//Modified by swatih for localization 24/7/2020
            }
        }, function (error) {
            //AlertMessage.warning('PalashIVF', 'Error Occured.');//Commented by swatih for localization 24/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 24/7/2020
            usSpinnerService.stop('GridSpinner');
        });
    }

});