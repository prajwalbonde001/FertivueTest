'use strict';
angular.module('PIVF').controller("FinancialChartDisplayCtrl", ['$scope', '$rootScope', function ($scope, $rootScope) {

$scope.loadData = function loadData(){
debugger;
    $scope.getPatientChartData();
}
    
$scope.getPatientChartData = function(){
    debugger;
     var data1 = $rootScope.PatientCountList;
     var data = [
          {
              label: "NewRegistration",
              value: "71"
          },
          {
              label: "NewOPVisits",
              value: "20"
          },
          {
              label: "FollowUpVisits",
              value: "10"
          },
          {
              label: "NewAdmission",
              value: "5"
          }       
        ]

        var chart= {           
            caption: "Patient Wise Count",           
            theme: "fusion",
            pieSliceText: 'none',
            
        } 
    $scope.myDataSource = {
        chart, data        
    };
}

}]);