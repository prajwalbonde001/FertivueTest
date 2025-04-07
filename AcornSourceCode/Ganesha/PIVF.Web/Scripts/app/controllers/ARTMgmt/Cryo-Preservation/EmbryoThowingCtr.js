angular.module('PIVF').controller('EmbryoThowingCtr', function ($rootScope, $scope, $filter, $location, srvCommon, Common, AlertMessage, EmbryoThowingSrv, PageConfig, usSpinnerService, $uibModal) {
    //Variable Declaration =====================================================================================================================================
    $rootScope.FormName = "Embryo Thawing"
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $scope.CoupleDetails = {};
    $scope.FillVitriGrid = {};
    $scope.ThowingGrid = [];
    var objResource = {};
    $scope.MasterData = {};
    $scope.GetActiveEmbryo = {};
    $scope.DisableSaveBtn = false;
    $scope.isvalid = false;
    $rootScope.OrderList = 0;
    $rootScope.ForMedia = 1;
    $rootScope.ForConsent = 0;
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    //=========================================================================================================================================================
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.popup1 = {
        opened1: false
    };
    $scope.open1 = function ($event, item) {
        $event.preventDefault();
        $event.stopPropagation();
        item.opened1 = true;
    };
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    // for sorting    
    $scope.SortColumn1 = "CycleCode";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    /*END : Date*/
    $scope.ismeridian = true;
    //Assign To Couple Information =====================================================================================================================================
    $scope.CoupleDetails = Common.getSelectedCouple();
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Configure Page ===================================================================================================================================================
    $scope.PageSetup = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if ($scope.CoupleDetails.FemalePatient != undefined && $scope.CoupleDetails.FemalePatient != null) {
            if ($scope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                $scope.disableSaveBtn = true;
            }
            if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
                $scope.disableSaveBtn = true;
            }
        }
        var ResponseData = EmbryoThowingSrv.GetFreezeEmbryo($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
        ResponseData.then(function (Response) {
            debugger;
            $scope.FillVitriGrid = Response.data;
            console.log($scope.FillVitriGrid);
            //Fill All Master
            var ResponseData = EmbryoThowingSrv.FillMaster();
            ResponseData.then(function (MasterResponse) {
                $scope.MasterData = MasterResponse.data;
                //Get Already Fill Thowing Data Whoes Not Finalize
                var WithoutFreezeData = EmbryoThowingSrv.GetThawingData($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
                WithoutFreezeData.then(function (FreezeResponse) {
                    debugger;
                    $scope.ThowingGrid = FreezeResponse.data;
                    if ($scope.ThowingGrid != null) {
                        angular.forEach($scope.ThowingGrid, function (item) {
                            item.PlanMaster = $scope.MasterData.ThawingPlan;
                            if (item.ThowFinalize) {
                                item.rowdisable = true;
                            }
                            else {
                                item.rowdisable = false;
                            }
                            if (item.ThowDate != null) {
                                item.ThowDate = new Date(item.ThowDate);
                            }
                        });
                    }
                    usSpinnerService.stop('GridSpinner');
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
        $scope.getDoctorList();
    }
    //GetDoctorList
    $scope.getDoctorList = function(){
        var responseData = Common.GetEmbryologyDoctorsList();
        responseData.then(function (Response) {
             
            $scope.EmbryologistAndrologist=Response.data.EmbryologistAndrologist;
        });
    }
    
    //Save Thowing Data=================================================================================================================================================
    $scope.Save = function () {
        usSpinnerService.spin('GridSpinner');
        debugger;
        if ($scope.ThowingGrid != null && $scope.ThowingGrid != undefined) {
          //  $scope.ThowingGrid = $filter('filter')($scope.ThowingGrid, function (d) { return d.rowdisable === false });
            debugger;
            $scope.isvalid = false;
            angular.forEach($scope.ThowingGrid, function (item) {
                if (item.ThowFinalize != 0) {
                    if(item.ThawingPlanID == null || item.ThawingPlanID == 0)
                    {
                        $scope.isvalid = true;
                        item.ThawingPlanIDInvalid = true;
                    }
                    if(item.ThowDate == undefined || item.ThowDate == null)
                    {
                        $scope.isvalid = true;
                        item.ThowDateInvalid = true;
                    }
                    if(item.ThowTime == undefined  || item.ThowTime == null)
                    {
                        $scope.isvalid = true;
                        item.ThowTimeInvalid = true;
                    }
                    if(item.ThowEmbryologistID == 0 || item.ThowEmbryologistID == null)
                    {
                        $scope.isvalid = true;
                        item.ThowEmbryologistIDInvalid = true;
                    }
                }
            });
            if ($scope.isvalid == false) {
                angular.forEach($scope.ThowingGrid, function (item) {
                    item.ThowDate = $filter('date')(item.ThowDate, 'medium');
                    item.ThowTime = $filter('date')(item.ThowTime, 'medium');
                });
                var ResponseData = EmbryoThowingSrv.SaveThawing($scope.ThowingGrid);
                ResponseData.then(function (Response) {
                    if (Response.data == 1) {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                        $scope.PageSetup();
                    }
                }, function (error) {
                usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
            }
            else {
                usSpinnerService.stop('GridSpinner');
               // $scope.PageSetup();
                AlertMessage.error(objResource.msgTitle, "Please Select Mandatory field");
            }
        }
    }
    //Add To Thowing Grid================================================================================================================================================
    $scope.AddRow = function (Item) {
        if (Item != null) {
            if (Item.IsAddToThawing) {
                debugger;
                Item.PlanMaster = angular.copy($scope.MasterData.ThawingPlan);
                Item.rowdisable = false;
                $scope.ThowingGrid.push(Item);
            }
            else {
                var index = $scope.ThowingGrid.indexOf(Item);
                $scope.ThowingGrid.splice(index, 1);
            }
        }
    }
    //Menu Redirect================================================================================================================================================
    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }
    //=====================================================================================================================================================================
    $scope.PGDPGSInit = function (Item)
    {
        debugger;
        if (Item.PGDPGSDone)
        {
            var index = Item.PlanMaster.indexOf(4);
            Item.PlanMaster.splice(index, 1);
        }
    }
    // added by Mayur For Get Donar Embriyo
    $scope.GetDonarEmbriyo = function () {
        debugger;
        var modalInstance = $uibModal.open({ // for open pop up for Day 0
            templateUrl: 'getDonorEmbriyosmodal',
            controller: 'DonarOocyteCtrl',
            backdrop: false,
            keyboard: false,
            size: 'lg'
        });
        modalInstance.result.then(function (data) {
            debugger;       //Work With delegate return object From PopUp Model
            if (!angular.equals({}, data)) {
                //Check sucess stauts
                if (data == 1) {
                    $scope.VitrificationSummaryList = [];
                    $scope.PageSetup();
                    AlertMessage.success("PalashIVF", objResource.msgSave);
                }
                else {
                    AlertMessage.error("PalashIVF", objResource.msgError);
                }
            }
        });
    }
});