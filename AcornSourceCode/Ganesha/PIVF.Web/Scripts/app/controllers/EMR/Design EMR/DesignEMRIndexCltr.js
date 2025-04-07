
'use strict';

angular.module('PIVF').controller('DesignEMRIndexCltr', function ($rootScope, $scope, $uibModal, DesignEMRSrv,srvCommon, AlertMessage, DataFactory, $location, Common, usSpinnerService) {
    //for paging================================================================
    debugger;
    $rootScope.hideWhenQueue = true; // to hide selected patient side bar
    $rootScope.isAction = false;
    $rootScope.FormName = 'Template Designer';
    $rootScope.CycleDetails = null;
    $rootScope.ForPrint = 0;
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.FromDate = null;
    $scope.ToDate = null;
    $scope.TempName;
    $scope.SearchEMR = {};  
    $scope.SearchEMR.FormID = 0; 
    $scope.SearchEMR.TemplateName = '';
    $scope.SearchEMR.GenderID = 0;
    usSpinnerService.spin('GridSpinner');
    var objResource = {}; //Added by swatih for localization 27/7/2020
     //Added by swatih for localization 27/7/2020 start
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Added by swatih for localization 27/7/2020 end

    $scope.NewClick=function() 
    {
        
        $scope.FormList1 = [];
        $scope.FormList1.splice(0, 0, { ID: 0, Description: "Select" });
        $scope.NewEMR = {};
        $scope.NewEMR.GenderID = 0;
        $scope.NewEMR.FormID = 0;
    }
    $scope.PageChange = function PageChange() {
        $scope.GetTemplate();
    }
    $scope.PageInit = function()
    {
       // $scope.NewEMR = {};
        $scope.FillDropDowns();
        $scope.GetTemplate();       
    }
    //
    //Front End Grid
    $scope.GetTemplate = function GetTemplate() {
        
        //if (angular.isUndefined($scope.SearchEMR.TemplateName)) { $scope.SearchEMR.TemplateName = ' '; }
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DesignEMRSrv.GetTemplate($scope.SearchEMR.TemplateName, $scope.SearchEMR.GenderID, $scope.SearchEMR.FormID, $scope.CurrentPage-1);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                
                $scope.TemplateList = Response.data;
                if (Response.data.length > 0)
                    $scope.TotalItems = Response.data[0].TotalRows;                            
            }
        }, function (error) {
            $scope.Error = error;
        });
    }  
    $scope.FillDropDowns = function()
    {
        $scope.FillGender();
        $scope.FillGender1();
        $scope.FillFormType();        
    }
    $scope.FillGender = function () {
        var ResponseData = Common.getMasterList('M_GenderMaster', 'GenderId', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(2);
            Response.data.splice(0, 0, { ID: 0, Description: "Gender" });
            $scope.GenderList = Response.data;
            $scope.SearchEMR.GenderID = 0;
           // $scope.NewEMR.GenderID = 0;           
            
        }, function (error) {
        });
    };
    $scope.FillGender1 = function () {
        var ResponseData = Common.getMasterList('M_GenderMaster', 'GenderId', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(3);
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.GenderList1 = Response.data;
            //if(angular.isDefined($scope.NewEMR))
            //    $scope.NewEMR.GenderID = 0;
            //else {
            //    $scope.NewEMR = {};
            //    $scope.NewEMR.GenderID = 0;
            //}

            // $scope.NewEMR.GenderID = 0;           

        }, function (error) {
        });
    };
    $scope.FillFormType = function () {
        var ResponseData = Common.getMasterList('M_EMRForms', 'ID', 'FormDescription');
        ResponseData.then(function (Response) {             
            Response.data.splice(0, 0, { ID: 0, Description: "Form" });
            $scope.FormList = Response.data;
            $scope.SearchEMR.FormID = 0;
            // $scope.NewEMR.GenderID = 0;           

        }, function (error) {
        });
    };   
    $scope.FillFormType1 = function (GenderID) {
    debugger ; 
        var ResponseData = DesignEMRSrv.FillFormType(GenderID);
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.FormList1 = Response.data;         
           // $scope.NewEMR.FormID = 0;
        }, function (error) {
        });
    };
    $scope.NewForm= function ()    {

        //to show default template
        $scope.data = [{
            'id': 1,
            'title': 'Form1',
            'description': '',
            'appliesTo': '',
            'templateType': '',
            'depth': 0,
            'nodes': [
            {
                'id': 11,
                'title': 'Section1',
                'depth': 1,
                'nodes': [
                ]
            },
            ]
        }];
        DataFactory.setObj($scope.data);
       $location.path("/ViewDesignEMR");
    }
    $scope.SaveTemplate = function () {
        debugger;
         
         if ($scope.FrmNewTemplate.TempName.$valid)
         {
             usSpinnerService.spin('GridSpinner');
            var ResponseData = DesignEMRSrv.SaveTemplate($scope.NewEMR);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                if (Response.data != null) {
                    if (Response.data > 0) {
                        {
                            angular.element(newModal).modal('hide');  
                            $scope.PageInit();
                            //AlertMessage.success("Saved Successfully");//Commented by swatih for localization 27/7/2020
                            AlertMessage.success(objResource.msgTitle, ObjeResource.msgSavedSuccessfully);//Modified by swatih for localization 27/7/2020
                        }
                    }
                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                $scope.Error = error;
            });

         }
         else
         {
             $scope.FrmNewTemplate.TempName.$dirty = true;
         }
     }
     $scope.CancelClick = function()
     {
         $scope.NewEMR = {};
     }
     $scope.boxClose =  function()
     {
         $scope.ItemToBeDeleted = {};
         $scope.Reason = "";
         $scope.ItemToBeActive = {};
         $scope.ReasonDeactive = "";
         $scope.PageInit();
     }
     $scope.ItemToBeDeleted = {};
     $scope.DeleteTemplate1 = function (item)
     {
          
         $scope.ItemToBeDeleted = item;        
     }
     $scope.DeleteTemplate = function(Reason)
     {         
         if ($scope.FrmDeleteModel.Reason.$valid)
         {
             $scope.ItemToBeDeleted.Reason = Reason;
             usSpinnerService.spin('GridSpinner');
             var ResponseData = DesignEMRSrv.DeleteTemplate($scope.ItemToBeDeleted);
             ResponseData.then(function (Response) {
                 usSpinnerService.stop('GridSpinner');
                 if (Response.data != 0) {                     
                     angular.element(deleteModel).modal('hide');
                     $scope.ItemToBeDeleted = {};
                     //AlertMessage.success("Deleted Successfully"); //Commented by swatih for localization 27/7/2020
                     AlertMessage.success(objResource.msgTitle, ObjeResource.msgDeletedSuccessfully);//Modified by swatih for localization 27/7/2020
                     $scope.Reason = "";
                     $scope.GetTemplate();
                 }
             }, function (error) {
                 usSpinnerService.stop('GridSpinner');
                 $scope.Error = error;
             });
         }
         else
         {
             $scope.FrmDeleteModel.Reason.$dirty = true;
         }        
     }
    $scope.ItemToBeActive = {};
    $scope.ActiveDeactiveTemplate = function (item) {
        $scope.Flag = 0;
        if (item.Status == true)
        {
            $scope.Flag = 1;
        }
        if ($scope.Flag == 1)
        {
            item.Status = false;
        }
        else
        {
            item.Status = true;
        }
        $scope.ItemToBeActive = item;
        if(item.Status==true)    {
            // $scope.ItemToBeActive.ReasonDeactive = ReasonDeactive;
            usSpinnerService.spin('GridSpinner');
            var ResponseData = DesignEMRSrv.ActiveDeactiveSave($scope.ItemToBeActive);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                if (Response.data != null) {
                    if (Response.data == 1) {
                        //angular.element(newActiveModel).modal('hide');
                        $scope.ItemToBeActive = {};
                        //AlertMessage.success("Activated Successfully");//Commented by swatih for localization 27/7/2020
                        AlertMessage.success(objResource.msgTitle, ObjeResource.msgActivatedSuccessfully);//Modified by swatih for localization 27/7/2020
                        $scope.GetTemplate();
                    }
                    else if (Response.data == 2) {
                        //angular.element(newActiveModel).modal('hide');
                        $scope.ItemToBeActive = {};
                        //AlertMessage.success("Can not Activat Because Form Already Linked To Other Template");//Commented by swatih for localization 27/7/2020
                        AlertMessage.success(objResource.msgTitle, ObjeResource.msgCannotActivatBecauseFormAlreadyLinkedToOtherTemplate);//Modified by swatih for localization 27/7/2020
                         $scope.GetTemplate();   
                    }
                    else {
                        //AlertMessage.success("Error Occured While Pocessing");//Commented by swatih for localization 27/7/2020
                        AlertMessage.success(objResource.msgTitle, ObjeResource.msgErrorOccuredWhileProcessing);//Modified by swatih for localization 27/7/2020
                        usSpinnerService.stop('GridSpinner');
                    }

                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                $scope.Error = error;
            });
        }
        else {            
            //$scope.FavDrugToDelete = Item;
            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                templateUrl: 'DeleteFavmodel',
                controller: 'DeleteFavModelInfo',
                backdrop: false,
                keyboard: false,
                size: 'md',
                //resolve: {
                //    DeleteInfo: function () {
                //        return Item;
                //    }
                //}
            });
            modalInstance.result.then(function (data) { // return here after cancel reason entered
                debugger;
                if (!angular.equals({}, data)) {  //this scope is executed when save is click
                    if (data != '') {
                        $scope.ItemToBeActive.ReasonDeactive = data;
                        usSpinnerService.spin('GridSpinner');
                        var ResponseData = DesignEMRSrv.ActiveDeactiveSave($scope.ItemToBeActive);
                        usSpinnerService.stop('GridSpinner');
                        ResponseData.then(function (Response) {
                            if (Response.data != 0) {
                                // angular.element(newActiveModel).modal('hide');
                                $scope.ItemToBeActive = {};
                                $scope.ReasonDeactive = "";
                                //AlertMessage.success("Deactivated Successfully");//Commented by swatih for localization 27/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgDeactivatedSuccessfully);//Modified by swatih for localization 27/7/2020);
                                $scope.GetTemplate();
                            }
                        }, function (error) {
                            usSpinnerService.stop('GridSpinner');
                            $scope.Error = error;
                        });
                    }
                    else { //for page refresh 
                        $scope.GetTemplate();
                    }
                }
            });
        }        
    }
    $scope.test=function()
    {
        alert('first');
    }
    //$scope.ActiveDeactiveSave =function(ReasonDeactive)
    //{
    //    if (ReasonDeactive != null) {            
    //        $scope.ItemToBeActive.ReasonDeactive = ReasonDeactive;
    //        var ResponseData = DesignEMRSrv.ActiveDeactiveSave($scope.ItemToBeActive);
    //        ResponseData.then(function (Response) {
                
    //            if (Response.data != 0) {
                    
    //                angular.element(newActiveModel).modal('hide');
    //                $scope.ItemToBeActive = {};
    //                $scope.ReasonDeactive = "";
    //                AlertMessage.success("Deactivated Successfully");
    //                $scope.PageInit();
    //            }
    //        }, function (error) {
    //            $scope.Error = error;
    //        });
    //    }
    //    else {
    //        AlertMessage.success("Please Enter Reason");
    //    }       
    //}
    //View Click===============================================================
    $scope.EditData = function (data) {        
        //Common.setObj(data);
        DataFactory.setObj(data);
        $location.path("/ViewDesignEMR");
    }
    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
        //  if (selectPatient.GenderID == 1) {
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 104 && lstUserRights[z].Active)// Design template
            {
                $scope.objRgt = lstUserRights[z];
                break;
            }
        }
        //  }
        if (!$scope.objRgt.IsCreate) {
            angular.element(btnSave).prop('disabled', true);
        }
        else {
            angular.element(btnSave).prop('disabled', false);
        }
    }
});
PIVF.controller('DeleteFavModelInfo', function ($scope, $uibModalInstance, AlertMessage) { //DeleteInfo,
    //$scope.DeleteInfo = DeleteInfo;
    $scope.Cancel = function () {
        //$uibModalInstance.dismiss('cancel');
        $uibModalInstance.close('');
    }
    $scope.FavDelete = function (Comment) {
        //if ($scope.frmFavReason.Comment.$valid)
         
        if (Comment != undefined)
        { $uibModalInstance.close(Comment); }
        else
       // { AlertMessage.success("Please Enter Reason"); } //Commented by swatih for localization 27/7/2020
        { AlertMessage.success( objResource.msgTitle,objResource.msgPleaseEnterReason); }//Modified by swatih for localization 27/7/2020
    }
});