angular.module('PIVF').controller('DonarOocyteCtrl', function ($scope, $rootScope, $uibModalInstance, AlertMessage, DonarOocyteSrv, $filter, Common) {
    $scope.DonorList = {};
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $scope.VitrificationDetails = {};
    debugger;
    var SelCouple = Common.getSelectedCouple();
    if (SelCouple.FemalePatient != undefined && SelCouple.FemalePatient != null) {
        if (SelCouple.FemalePatient.IsCancelCycle == true) {
            $scope.disableSaveBtn = true;
        }
        if (SelCouple.FemalePatient.IsCloseCycle == false) {
            $scope.disableSaveBtn = true;
        }
    }

    $scope.Cancel=function()
    {
        $uibModalInstance.dismiss('cancel');
    }
    //Get Donar List ==================================================================================================================
    $scope.GetDonarList=function()
    {
        var ResponseData = DonarOocyteSrv.GetDonorList();
        ResponseData.then(function (Response) {
            $scope.DonorList = Response.data;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }
    //Get Donor oocyte vitrification details ========================================================================================================
    $scope.GetVitrificationDetails=function(DonarDetails)
    {
        var ResponseData = DonarOocyteSrv.GetVitrificationDetails(DonarDetails.VitriFicationID, DonarDetails.VitriFicationUnitID);
        ResponseData.then(function (Response) {
            $scope.VitrificationDetails = Response.data;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }
    //====================================================================================================================================
    //Get Donor Emb vitrification details ========================================================================================================
    $scope.GetEmbriyoVitrificationDetails = function (DonarDetails) {
        var ResponseData = DonarOocyteSrv.GetEmbriyoVitrificationDetails(DonarDetails.VitriFicationID, DonarDetails.VitriFicationUnitID);
        ResponseData.then(function (Response) {
            $scope.VitrificationDetails = Response.data;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }
    //====================================================================================================================================
    $scope.TransferDonorOocytestoCouple = function () //Transfer Oocyte 
    {
        $scope.selectedDonorOocytes = $filter('filter')($scope.VitrificationDetails, function (d) { return d.IsReceived === true });
        var ResponseData = DonarOocyteSrv.TransferDonorOocytestoCouple($scope.selectedDonorOocytes);
        ResponseData.then(function (Response) {
            if (Response.data == 1) {
                $uibModalInstance.close(Response.data);
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }
    $scope.TransferDonorEmbriyostoCouple = function () //Transfer Embriyo
    {
        $scope.selectedDonorEmbriyos = $filter('filter')($scope.VitrificationDetails, function (d) { return d.IsReceived === true });
        var ResponseData = DonarOocyteSrv.TransferDonorEmbriyostoCouple($scope.selectedDonorEmbriyos);
        ResponseData.then(function (Response) {
            if (Response.data == 1) {
                $uibModalInstance.close(Response.data);
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }
});