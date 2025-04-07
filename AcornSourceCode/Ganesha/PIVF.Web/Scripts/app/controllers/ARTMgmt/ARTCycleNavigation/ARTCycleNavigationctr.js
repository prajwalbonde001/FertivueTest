'use strict';
angular.module('PIVF').controller('ARTCycleNavigationCtr', function ($scope, $rootScope, $http, srvCommon, Common, $location, AlertMessage) {
    //rohini for visit check
        $rootScope.isAction = false;
        $rootScope.hideWhenQueue = true;
        $scope.Navigate = function (path) {       
        
            $location.path('/' + path + '/');
                   
    }
   
});

