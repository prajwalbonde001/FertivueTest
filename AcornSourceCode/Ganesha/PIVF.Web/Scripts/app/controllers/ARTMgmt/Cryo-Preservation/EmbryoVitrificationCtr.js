angular.module('PIVF').controller('EmbryoVitrificationCtr', function ($rootScope, $scope, $filter, $location, srvCommon, Common, AlertMessage, EmbryoVitrificationSrv, PageConfig, usSpinnerService) {
    //Variable Declaration =====================================================================================================================================
    $rootScope.FormName = "Embryo Vitrification";
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $rootScope.OrderList = 0;
    $rootScope.ForMedia = 1;
    $rootScope.ForConsent = 0;
    $scope.CoupleDetails = {};
    $scope.FillGrid = {};
    var objResource = {};
    $scope.MasterData = {};
    $scope.GetActiveEmbryo = {};
    $scope.DisableSaveBtn = false;
    usSpinnerService.spin('GridSpinner');
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    //=========================================================================================================================================================
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.popup1 = {
        opened1: false,
        opened2: false,
        opened3: false
    };
    $scope.open1 = function ($event, item) {
        $event.preventDefault();
        $event.stopPropagation();
        item.opened1 = true;
    };
    $scope.open2 = function ($event, item) {
        $event.preventDefault();
        $event.stopPropagation();
        item.opened2 = true;
    };
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120),
        minDate: new Date(), //new Date().setYear(new Date().getYear() - 100),//,
        startingDay: 1,
        showWeeks: false
    };

    //$scope.popup3 = {
    //    opened3: false
    //};

    $scope.open3 = function ($event, item) {  //for grid date event
        $event.preventDefault();
        $event.stopPropagation();
        item.opened3 = true;
    };

    $scope.MediaExpdateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120),
        minDate: new Date(),//new Date().setDate(new Date(Item.VitriDate).getDate()),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    /*END : Date*/
    $scope.ismeridian = true;
    //Assign To Couple Information =====================================================================================================================================

    $scope.CoupleDetails = Common.getSelectedCouple();
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Configure Page ================================================================================================================================
    $scope.PageSetup = function () {
    debugger
        usSpinnerService.spin('GridSpinner');
        if ($scope.CoupleDetails.FemalePatient != undefined && $scope.CoupleDetails.FemalePatient != null) {
        debugger
            if ($scope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
            debugger
                $scope.disableSaveBtn = true;
            }
            if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
            debugger
                $scope.disableSaveBtn = true;
            }
        }
        var ResponseData = EmbryoVitrificationSrv.GetFreezeEmbryo($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data.length != 0) {
                debugger;
                //Fill All Master
                var ResponseData = EmbryoVitrificationSrv.FillMaster();
                ResponseData.then(function (MasterResponse) {
                    $scope.FillGrid = Response.data;
                    $scope.MasterData = MasterResponse.data;
                    //Set status all ready freeze embryo 
                    angular.forEach($scope.FillGrid, function (item) {
                        if (item.IsFinalized) {
                            item.rowdisable = true;
                        }
                        else {
                            item.rowdisable = false;
                        }

                        if (item.MediaExpiryDate == null || angular.isUndefined(item.MediaExpiryDate))
                        {

                        }
                        else {
                            item.MediaExpiryDate=new Date(item.MediaExpiryDate);
                        }

                        if (item.VitriDate != null) {
                            item.VitriDate = new Date(item.VitriDate);
                        }
                        else
                        {
                            item.VitriDate = new Date();
                            $scope.mydate = new Date($filter('date')(item.VitriDate, 'dd-MMM-yyyy'));
                            var numberOfDaysToAdd = 12;
                            $scope.newdate = $scope.mydate.setMonth($scope.mydate.getMonth() + numberOfDaysToAdd);
                            item.ExpiryDate = $filter('date')($scope.newdate, 'dd-MMM-yyyy');
                            item.ExpiryDate = new Date(item.ExpiryDate);
                        }
                        if (item.VitriTime != null)
                        {
                            item.VitriTime = new Date(item.VitriTime);
                        }
                        else
                        {
                            item.VitriTime = new Date();
                        }
                        if (item.ExpiryDate != null) {
                            item.ExpiryDate = new Date(item.ExpiryDate);
                        }
                        if (item.ExpiryTime != null)
                        {
                            item.ExpiryTime = new Date(item.ExpiryTime);
                        }
                        else
                        {
                            item.ExpiryTime = new Date();
                            item.ExpdateOptions = {
                                formatYear: 'yyyy',
                                maxDate: new Date().setMonth(new Date().getMonth() + 120),
                                minDate: item.VitriDate,//new Date(),
                                startingDay: 1,
                                showWeeks: false
                            };
                        }
                        if (item.EmbDate != null) {
                            item.dateOptions = {
                                formatYear: 'yyyy',
                                maxDate: new Date().setMonth(new Date().getMonth() + 120),
                                minDate: new Date().setDate(new Date(item.EmbDate).getDate()),//new Date(),
                                startingDay: 1,
                                showWeeks: false
                            };
                        }
                    });
                    //Check If Already Freeze All Embryo then Disable Save Button
                    $scope.AllFreeze = $filter('filter')($scope.FillGrid, function (d) { return d.rowdisable === false }).length;
                    if (parseInt($scope.AllFreeze) == 0) {
                        $scope.DisableSaveBtn = true;
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
            }
            else {
                usSpinnerService.stop('GridSpinner');
                $scope.DisableSaveBtn = true;
                AlertMessage.error(objResource.msgTitle, "Atleast One Embryo Should be selected Cryo Plan");
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.DisableSaveBtn = true;
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
    //Save EmbryoFrezz Data ================================================================================================================================
    function isDate(value) {
        var flag = angular.isDate(value);
        return flag;
    }
    $scope.Save = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $scope.GetActiveEmbryo = $filter('filter')($scope.FillGrid, function (d) { return d.rowdisable === false });
        $scope.isvalid = false;
        if ($scope.GetActiveEmbryo != null) {
            if ($scope.CoupleDetails.FemalePatient.IsDonor == true) {
                //usSpinnerService.spin('GridSpinner');
                //var Response = EmbryoVitrificationSrv.GetFlagISAllEmbryoFreeze($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID, 0);
                //usSpinnerService.stop('GridSpinner');
                //Response.then(function (Response) {
                //    if (Response.data == 1) {
                        angular.forEach($scope.GetActiveEmbryo, function (item) {
                            if (item.IsFinalized) {
                                if (item.VitriDate == undefined || item.VitriDate == null) {
                                    item.VitriDateInvalid = true;
                                    $scope.isvalid = true;
                                }
                                if (item.VitriTime == undefined || item.VitriTime == null) {
                                    item.VitriTimeInvalid = true;
                                    $scope.isvalid = true;
                                }
                                if (item.TankID == 0 || item.TankID == null) {
                                    item.TankIDInvalid = true;
                                    $scope.isvalid = true;
                                }
                                if (item.EmbryologistID == 0 || item.EmbryologistID == null) {
                                    item.EmbryologistIDInvalid = true;
                                    $scope.isvalid = true;
                                }
                                if (item.WitnessID == 0 || item.WitnessID == null) {
                                    item.WitnessIDInvalid = true;
                                    $scope.isvalid = true;
                                }
                                if (item.FreezingNo == undefined || item.FreezingNo == "") {
                                    item.FreezingNoInvalid = true;
                                    $scope.isvalid = true;
                                }
                            }
                        });
                        if ($scope.isvalid == false) {
                            angular.forEach($scope.GetActiveEmbryo, function (item) {
                                item.VitriDate = $filter('date')(item.VitriDate, 'medium');
                                item.VitriTime = $filter('date')(item.VitriTime, 'medium');
                                item.ExpiryDate = $filter('date')(item.ExpiryDate, 'medium');
                                item.ExpiryTime = $filter('date')(item.ExpiryTime, 'medium');
                            });
                            var ResponseData = EmbryoVitrificationSrv.Save($scope.GetActiveEmbryo);
                            ResponseData.then(function (Response) {
                                if (Response.data == 1) {
                                    usSpinnerService.stop('GridSpinner');
                                    $scope.PageSetup();
                                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                                }
                                else {
                                    usSpinnerService.stop('GridSpinner');
                                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                                }
                            }, function (error) {
                                usSpinnerService.stop('GridSpinner');
                                AlertMessage.error(objResource.msgTitle, objResource.msgError);
                            });
                        }
                        else {
                            usSpinnerService.stop('GridSpinner');
                            AlertMessage.error(objResource.msgTitle, "Please Select Mandatory field");
                        }
                    //}
                    //else {
                    //    usSpinnerService.stop('GridSpinner');
                    //    AlertMessage.error(objResource.msgTitle, "Please First Finalize All Oocyte/Embryo");
                    //}
                //}, function (error) {
                //    usSpinnerService.stop('GridSpinner');
                //    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                //});
            }
            else {
                angular.forEach($scope.GetActiveEmbryo, function (item) {
                    if (item.IsFinalized) {
                        if (item.VitriDate == undefined || item.VitriDate == null) {
                            item.VitriDateInvalid = true;
                            $scope.isvalid = true;
                        }
                        if (item.VitriTime == undefined || item.VitriTime == null) {
                            item.VitriTimeInvalid = true;
                            $scope.isvalid = true;
                        }
                        if (item.TankID == 0 || item.TankID == null) {
                            item.TankIDInvalid = true;
                            $scope.isvalid = true;
                        }
                        if (item.EmbryologistID == 0 || item.EmbryologistID == null) {
                            item.EmbryologistIDInvalid = true;
                            $scope.isvalid = true;
                        }
                        if (item.WitnessID == 0 || item.WitnessID == null) {
                            item.WitnessIDInvalid = true;
                            $scope.isvalid = true;
                        }
                        if (item.FreezingNo == undefined || item.FreezingNo == "") {
                            item.FreezingNoInvalid = true;
                            $scope.isvalid = true;
                        }
                    }
                });
                if ($scope.isvalid == false) {
                    angular.forEach($scope.GetActiveEmbryo, function (item) {
                        item.VitriDate = $filter('date')(item.VitriDate, 'medium');
                        item.VitriTime = $filter('date')(item.VitriTime, 'medium');
                        item.ExpiryDate = $filter('date')(item.ExpiryDate, 'medium');
                        item.ExpiryTime = $filter('date')(item.ExpiryTime, 'medium');
                    });
                    var ResponseData = EmbryoVitrificationSrv.Save($scope.GetActiveEmbryo);
                    ResponseData.then(function (Response) {
                        if (Response.data == 1) {
                            usSpinnerService.stop('GridSpinner');
                            $scope.PageSetup();
                            AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                        }
                        else {
                            usSpinnerService.stop('GridSpinner');
                            AlertMessage.error(objResource.msgTitle, objResource.msgError);
                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    });
                }
                else {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, "Please Select Mandatory field");
                }
            }
        }
    }
    //Cancle Redirect To Cycle ================================================================================================================================
    $scope.Cancel = function () {
        $location.path('/ARTCycle/');
    }
    //Set Expire Date Next 1 Year  ================================================================================================================================
    $scope.SetExpireDate = function (Item) {
        debugger;
        if (Item != null) {
            $scope.mydate = new Date($filter('date')(Item.VitriDate, 'dd-MMM-yyyy'));
            var numberOfDaysToAdd = 12;
            $scope.newdate = $scope.mydate.setMonth($scope.mydate.getMonth() + numberOfDaysToAdd);
            Item.ExpiryDate = $filter('date')($scope.newdate, 'dd-MMM-yyyy');
            Item.ExpiryDate = new Date(Item.ExpiryDate);

            Item.ExpdateOptions = {
                formatYear: 'yyyy',
                maxDate: new Date().setMonth(new Date().getMonth() + 120),
                minDate: Item.VitriDate,//new Date().setDate(new Date(Item.VitriDate).getDate()),//new Date(),
                startingDay: 1,
                showWeeks: false
            };
        }

        if(Item.VitriDate < Item.dateOptions.minDate)
        {
            Item.VitriDateInvalid = true;
        }
        else
        {
            Item.VitriDateInvalid = false;
        }
    }
    //Menu Redirect================================================================================================================================================
    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }

    $scope.CheckDuplicateFreezingNo = function CheckDuplicateFreezingNo(idx, Item) {
        debugger;
        var ResponseData = EmbryoVitrificationSrv.CheckDuplicateFreezingNo(Item);
        ResponseData.then(function (Response) {
            if (Response.data == 1) {

                AlertMessage.info('PalashIVF', 'Freezing No is already present');

                for (var i = 0; i <= $scope.FillGrid.length - 1; i++) {
                    if (idx == i) {
                        $scope.FillGrid[i].FreezingNo = "";
                    }
                }
            }
        }, function (error) {
        });
    }
});

