angular.module('PIVF').controller('ReportViewCtr', function ($rootScope, Common,$scope, $location, ReportViewSrv, $sce) {

    debugger;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    $scope.Report = Common.getObj();        
    currentBlob = new Blob([$scope.Report], { type: 'application/pdf' });
    $scope.pdfUrl = URL.createObjectURL(currentBlob);
    Common.clearObj();

});
 