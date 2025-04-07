'use strict';
angular.module('PIVF').controller('ConvertToDonorCtrl', function ($scope,$rootScope, AlertMessage, ConvertToDonorSrv, $filter, usSpinnerService) {
    $rootScope.FormName = 'Mark as Donor';
    $scope.CurrentPage = 1;
    $scope.maxSize = 5;
    $scope.PatientListDetails = {};
    $scope.PageSetup=function()
    {
        $scope.GetPatientList($scope.CurrentPage - 1,'');
    }
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    //Get EmbryoData default
    $scope.GetPatientList = function (PageIndex, NameCodeMRNo) {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = ConvertToDonorSrv.GetPatientList(PageIndex, NameCodeMRNo);
        ResponseData.then(function (Response) {
            debugger;
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                debugger;
                $scope.PatientDetails = Response.data;
                if ($scope.PatientDetails.length > 0) {
                    debugger;
                    $scope.TotalItems = $scope.PatientDetails[0].TotalRecords;
                }
                else {
                    $scope.TotalItems = 0;
                }
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.NormalSearch = function (NameCodeMRNo) {
        if (angular.isUndefined(NameCodeMRNo))
            NameCodeMRNo = '';
        usSpinnerService.spin('GridSpinner');
        $scope.GetPatientList($scope.CurrentPage - 1, NameCodeMRNo)
        usSpinnerService.stop('GridSpinner');
    };
    $scope.PageChange = function PageChange() {
        if (angular.isUndefined($scope.PatientListDetails.NameCodeMRNo))
            $scope.PatientListDetails.NameCodeMRNo = '';
        $scope.GetPatientList($scope.CurrentPage - 1, $scope.PatientListDetails.NameCodeMRNo);
    }
    $scope.convertToDonar=function(PatientData)
    {
        usSpinnerService.spin('GridSpinner');
        if(!angular.isUndefined(PatientData) && PatientData != null)
        {
            var ResponseData = ConvertToDonorSrv.ConvertToDonor(PatientData.PatientID, PatientData.GenderID);
            ResponseData.then(function (Response) {
                if(Response.data==1)
                {
                    usSpinnerService.stop('GridSpinner');
                    if (angular.isUndefined($scope.PatientListDetails.NameCodeMRNo))
                        $scope.PatientListDetails.NameCodeMRNo = '';
                    $scope.GetPatientList($scope.CurrentPage - 1, $scope.PatientListDetails.NameCodeMRNo);
                    AlertMessage.success('Palash IVF', 'Patient Successfully Convert as Donor');
                }
                else
                {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error('Palash IVF', 'Patient Cannot Convert as Donor');
                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                $scope.Error = error;
            });
        }
        else
        {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error('Palash IVF', 'Something Went Wrong..');
        }
    }
});