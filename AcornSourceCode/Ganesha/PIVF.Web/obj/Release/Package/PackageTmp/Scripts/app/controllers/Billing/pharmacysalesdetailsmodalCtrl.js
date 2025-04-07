'use strict';
angular.module('PIVF').controller('pharmacysalesdetailsmodalCtrl', function ($scope, $uibModalInstance,$location, PharmaDetails , BillingService, $http,AlertMessage , usSpinnerService) {
debugger

    $scope.PharmaDetails = PharmaDetails;




$scope.loadData = function(){
 
  $scope.GetBilledPatientItemListForPharmacy($scope.PharmaDetails.BillID);
 
}







$scope.GetBilledPatientItemListForPharmacy  = function (BillId) {

    usSpinnerService.spin('GridSpinner');
    var responseData = BillingService.GetBilledPatientItemListForPharmacy(BillId);
    responseData.then(function (response) {
    
        $scope.BillDetails = response.data;
              usSpinnerService.stop('GridSpinner');
    }, function (error) {
        AlertMessage.warning(objResource.msgTitle, 'Error fetching BillDetails : ' + (error.message || 'Unknown error')); // Show error message        
              usSpinnerService.stop('GridSpinner');
    });
};




    // Handle "Cancel" button click
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
