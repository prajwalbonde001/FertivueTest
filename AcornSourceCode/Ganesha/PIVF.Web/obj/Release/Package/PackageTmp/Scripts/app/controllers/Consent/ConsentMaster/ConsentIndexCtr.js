angular.module('PIVF').controller('ConsentIndexCtr', function ($scope, $sce, $rootScope, DataFactory, $location, srvCommon , Common, ConsentIndexSrv, usSpinnerService, AlertMessage) {
    $rootScope.hideWhenQueue = true; // to hide selected patient side bar
    $rootScope.CycleDetails = null;
    $rootScope.Allergies = null;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    $rootScope.ForPrint = 0;
    $rootScope.FormName = 'Consent';
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;   
    $scope.SearchConsent = {};
    var objResource = {}; //Added by swatih for localization 24/7/2020
    $scope.SearchConsent.ARTTypeID = 0;
    $scope.SearchConsent.ARTSubTypeID = 0;
    $scope.SearchConsent.Code = "";
    usSpinnerService.spin('GridSpinner');
    //Added by swatih for localization 24/7/2020 start
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Added by swatih for localization 24/7/2020 end
    $scope.PageChange = function PageChange() {
        $scope.GetConsentList();
    }
    $scope.NewPage = function()    {
    debugger;
        
        $location.path("/ViewConsentMaster/");
    }
    $scope.PageSetup =function()
    {
        $scope.GetConsentList();
        $scope.FillDropDowns();
        $scope.GetUserrights();
    }
    $scope.FillDropDowns = function () {
        var ResponseData = Common.getMasterList('M_ARTType', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "ART Type" });
            $scope.ArtTypeList = Response.data;            

        }, function (error) {
        });
        var ResponseData = Common.getMasterList('M_ARTSubType', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "ART Sub Type" });
            $scope.ArtSubtypeList = Response.data;

        }, function (error) {
        });
    };
    $scope.GetConsentList = function () {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = ConsentIndexSrv.GetConsentList($scope.SearchConsent.ARTTypeID, $scope.SearchConsent.ARTSubTypeID, $scope.CurrentPage - 1, $scope.SearchConsent.Code);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                
                $scope.ConsentList = Response.data;
                if (Response.data.length > 0)
                    $scope.TotalItems = Response.data[0].TotalRows;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
     });
    }
    //$scope.ShowPopupData = function ShowPopupData(Item) {
        
    //    if (Item.LinkDetails.length != 0) {
    //        $scope.html = '<div style=""><table style="color: #454545;font-size:14px;"><tr ng-repeat="item in '+ Item.LinkDetails +'"><td><b>{{item.ARTTypeDesc}}</b></td><td><b>{{item.ARTSubTypeDesc}}</b></td></tr></table></div>';
                           
    //        $scope.htmlPopover1 = $sce.trustAsHtml($scope.html);
    //    }
    //}
    //View Click===============================================================
    $scope.EditData = function (data) {
        
        //Common.setObj(data);
        DataFactory.clearObj();
        DataFactory.setObj(data);
        $location.path("/ViewConsentMaster/");
    }

    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 105 && lstUserRights[z].Active)// Consent
            {
                $scope.objRgt = lstUserRights[z];
                break;
            }
        }
            if (!$scope.objRgt.IsCreate ) {
                angular.element(btnNew).prop('disabled', true);
        }
        else {
                angular.element(btnNew).prop('disabled', false);
        }
    }

    $scope.openReasonPopUp = function (i) {
        Common.clearObj();
        Common.setObj(i);
        $scope.deleteReason=null;
        angular.element(reasonModel).modal('show');
    }

    $scope.ActivateDeactivateConsent = function () {
        debugger;
        if (angular.isString($scope.deleteReason) && $scope.deleteReason != '') {
            var consent = Common.getObj();
            var responseData = ConsentIndexSrv.ActivateDeactivateConsent(consent.ID, $scope.deleteReason);
            responseData.then(function (Response) {
                //  
                if (Response.status == 200) {
                    angular.element(reasonModel).modal('hide');
                    //AlertMessage.success('PalashIVF', "Status updated successfully.");//Commented by swatih for localization 24/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgStatusupdatedsuccessfully);//Modified by swatih for localization 24/7/2020
                    $scope.ConsentList[$scope.ConsentList.findIndex(function (x) { return x.ID == consent.ID; })].Status = 
                        !$scope.ConsentList[$scope.ConsentList.findIndex(function (x) { return x.ID == consent.ID; })].Status
                }
            }, function (error) {
                //  
                //AlertMessage.error('PalashIVF'.msgTitle, 'PalashIVF'.msgError);//Commented by swatih for localization 24/7/2020
                AlertMessage.success(objResource.msgTitle, objResource.msgError);//Modified by swatih for localization 24/7/2020
            });
        }
            //else AlertMessage.info('PalashIVF'.msgTitle, 'Enter reason.');//Commented by swatih for localization 24/7/2020
        else AlertMessage.info(objResource.msgTitle, objResource.msgEnterReason);//Modified by swatih for localization 24/7/2020
    }
});