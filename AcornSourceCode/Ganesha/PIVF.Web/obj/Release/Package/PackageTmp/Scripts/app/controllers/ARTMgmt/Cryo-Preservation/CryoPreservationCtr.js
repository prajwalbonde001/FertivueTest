'use strict';
angular.module('PIVF').controller('CryoPreservationCtr', function ($scope, $rootScope, $http, srvCommon, Common, $location, AlertMessage) {
    //rohini for visit check
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $rootScope.OrderList = 0;
    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }
});

