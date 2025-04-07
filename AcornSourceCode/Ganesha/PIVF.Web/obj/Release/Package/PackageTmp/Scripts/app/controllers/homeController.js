'use strict';

angular.module('PIVF').controller('homeController',
    function ($scope, localStorageService, $location) {
        $scope.checkURL = function () {
            if (localStorageService.get("UserInfo")) {
                $location.path('/FertivueDashboard');
            } else {
                $location.path('/Login');
            }
        };

    });