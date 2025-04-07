'use strict';
angular.module('PIVF').controller('PACViewCtrl', function ($rootScope, $scope, RootPGInfo, $uibModal, $uibModalInstance, Common, srvNewART, AlertMessage, srvCommon) {
    debugger;
    $scope.ViewData = {};
    $scope.ViewData.extn = RootPGInfo.extn;
    $scope.ViewData.content = RootPGInfo.content;
    $scope.ViewData.Image = RootPGInfo.Image;

    $scope.ViewClose = function ViewClose(Cancel) {
        $uibModalInstance.dismiss('cancel');
    }
});