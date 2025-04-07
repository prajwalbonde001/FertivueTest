angular.module('PIVF').controller('OocyteVitrificationCtr', function ($rootScope, $scope, $filter, $location, CryoPreservationSrv, AlertMessage, srvCommon, Common, PageConfig, EmbryoVitrificationSrv, usSpinnerService, localStorageService) {
    //Data Member Declarations
    $rootScope.FormName = "Oocyte Vitrification";
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $scope.VitriDetails = {};
    $scope.VitriDetails.ListVitriDetails = [];
    $scope.ListTank = [];
    $scope.ListCanister = [];
    $scope.ListGobletColor = [];
    $scope.ListGobletSize = [];
    $scope.ListCryoLocks = [];
    $scope.ListMediaUsed = [];
    $rootScope.OrderList = 0;
    $rootScope.ForMedia = 1;
    $rootScope.ForConsent = 0;
    $scope.CoupleDetails = {};
    $scope.CoupleDetails = Common.getSelectedCouple();
    usSpinnerService.spin('GridSpinner');
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    // For Date-Picker in grid
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
    $scope.popup2 = {
        opened: false
    };
    $scope.open2 = function ($event, item) {  //for grid date event
        $event.preventDefault();
        $event.stopPropagation();
        item.opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120), //new Date(2016, 8, 01),
        minDate: new Date(),//new Date().setYear(new Date().getYear() - 100),//,
        startingDay: 1,
        showWeeks: false
    };

    $scope.popup3 = {
        opened3: false
    };

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

 
    //Member Funtions
    $scope.PageSetup = function PageSetup() {
        if ($scope.CoupleDetails.FemalePatient != undefined && $scope.CoupleDetails.FemalePatient != null) {
            if ($scope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                $scope.disableSaveBtn = true;
            }
            if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
                $scope.disableSaveBtn = true;
            }
        }
        $scope.FillTank();
        $scope.FillCanister();
        $scope.FillGobletColor();
        $scope.FillGobletSize();
        $scope.FillMediaUsed();
        $scope.FillCryoLocks();
        $scope.GetVitriDetails();
        $scope.GetEmbryologyDoctorsList();
    }
    $scope.FillTank = function () {
        var ResponseData = Common.getMasterList('M_IVFTankMaster_Embrology', 'IVFTANKID', 'Description');
        ResponseData.then(function (Response) {
            
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListTank = Response.data;
            if ($scope.VitriDetails.ListVitriDetails.TankId == undefined) {
                $scope.VitriDetails.ListVitriDetails.TankId = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillCanister = function () {
        var ResponseData = Common.getMasterList('M_IVFCanisterMaster_Embrology', 'IVFCANISTERID', 'Description');
        ResponseData.then(function (Response) {
            
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListCanister = Response.data;
            if ($scope.VitriDetails.ListVitriDetails.CanId == undefined) {
                $scope.VitriDetails.ListVitriDetails.CanId = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillGobletColor = function () {
        var ResponseData = Common.getMasterList('M_IVFGobletColor_Embrology', 'IVFGCOLORID', 'Description');
        ResponseData.then(function (Response) {
            
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListGobletColor = Response.data;
            if ($scope.VitriDetails.ListVitriDetails.ColorCodeID == undefined) {
                $scope.VitriDetails.ListVitriDetails.ColorCodeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillGobletSize = function () {
        var ResponseData = Common.getMasterList('M_IVFGobletSize_Embrology', 'IVFGobletSizeID', 'Description');
        ResponseData.then(function (Response) {
            
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListGobletSize = Response.data;
            if ($scope.VitriDetails.ListVitriDetails.GobletSizeId == undefined) {
                $scope.VitriDetails.ListVitriDetails.GobletSizeId = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FillMediaUsed = function () {
        var ResponseData = Common.getMasterList('M_IVF_Media', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListMediaUsed = Response.data;
            if ($scope.VitriDetails.ListVitriDetails.MediaID == undefined) {
                $scope.VitriDetails.ListVitriDetails.MediaID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }


    $scope.FillCryoLocks = function () {
        var ResponseData = Common.getMasterList('M_IVF_CryoLocks_Embrology', 'ID', 'Description');
        ResponseData.then(function (Response) {
            
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListCryoLocks = Response.data;
            if ($scope.VitriDetails.ListVitriDetails.CryoLockID == undefined) {
                $scope.VitriDetails.ListVitriDetails.CryoLockID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.GetEmbryologyDoctorsList = function () {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //   
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ListDoctor = Response.data.EmbryologistAndrologist;
            if ($scope.VitriDetails.EmbryologistID == undefined)
                $scope.VitriDetails.EmbryologistID = 0;
            if ($scope.VitriDetails.Witness == undefined)
                $scope.VitriDetails.Witness = 0;
        }, function (error) {
        });
    };
    $scope.GetVitriDetails = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = CryoPreservationSrv.GetVitriDetails(true, false);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            debugger;
            if (Response.data != null) {
                $scope.VitriDetails = Response.data;
                if ($scope.VitriDetails.ListVitriDetails.length > 0)
                {
                    
                    angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {
                        if (item.VitriDate == null || item.VitriDate == undefined)
                            item.VitriDate = new Date();
                        else
                            item.VitriDate = new Date(item.VitriDate);

                        if (item.VitriTime == null || item.VitriTime == undefined)
                            item.VitriTime = new Date();
                        else
                            item.VitriTime = new Date(item.VitriTime);

                        if (item.ExpiryDate == null || item.ExpiryDate == undefined)
                        {
                            $scope.ExpiryDate1 = new Date(item.VitriDate);
                            item.ExpiryDate = $scope.ExpiryDate1.add({ years: 0, months: 0, days: 365 });
                        }        
                        else
                        {
                            //$scope.ExpiryDate1 = new Date(item.VitriDate);
                            //item.ExpiryDate = $scope.ExpiryDate1.add({ years: 0, months: 0, days: 365 });
                            item.ExpiryDate = new Date(item.ExpiryDate);
                        }                                      

                        if (item.ExpiryTime == null || item.ExpiryTime == undefined)
                            item.ExpiryTime = new Date();
                        else
                            item.ExpiryTime = new Date(item.ExpiryTime);
                        if (item.IsFinalized) {
                            item.rowdisable = true;
                        }
                        else {
                            item.rowdisable = false;
                        }

                        if (item.MediaExpiryDate == null || item.ExpiryTime == undefined)
                        {

                        }
                        else {
                            item.MediaExpiryDate = new Date(item.MediaExpiryDate);
                        }

                        item.ExpdateOptions = {
                            formatYear: 'yyyy',
                            maxDate: new Date().setMonth(new Date().getMonth() + 120),
                            minDate: item.VitriDate,//new Date().setDate(new Date(Item.VitriDate).getDate()),//new Date(),
                            startingDay: 1,
                            showWeeks: false
                        };
                        //for validation required
                        item.TankIdDirty = false;
                        item.DirtyVitriTime = false;
                        item.DirtyVitriDate = false;
                        item.DirtyExpiryDate = false;
                        item.DirtyExpiryTime = false;
                    });
                }
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }

    $scope.octeyteFrezingValidation=function()
    {
        var isvalid = true;
        angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {
        //    console.log("item", item)
            if (item.IsFinalized && !item.rowdisable) {
                if (item.EmbryologistID == 0) {
                    $scope.frmOocyteVitri.ddlCryoLock1.$dirty = true;
                    AlertMessage.error("PIVF", "Please Select  Embryologist ");
                    isvalid = false;
                }
            if (item.Witness == 0) {
                $scope.frmOocyteVitri.ddlCryoLock.$dirty = true;
                AlertMessage.error("PIVF", "Please Select  Witness ");
                isvalid = false;
            }
            if (item.EmbryologistID == item.Witness) {

                $scope.frmOocyteVitri.ddlCryoLock1.$dirty = true;
                $scope.frmOocyteVitri.ddlCryoLock.$dirty = true;
                AlertMessage.error("PIVF", "Please Select different Embryologist and Witness ");
                isvalid = false;
            }
            if (item.EmbryologistID ==0 && item.Witness==0) {

                $scope.frmOocyteVitri.ddlCryoLock1.$dirty = true;
                $scope.frmOocyteVitri.ddlCryoLock.$dirty = true;
                AlertMessage.error("PIVF", "Please Select Embryologist and Witness ");
                isvalid = false;
            }
            if (item.FreezingNo == undefined && item.FreezingNo == "") {
                debugger;
                $scope.frmOocyteVitri.ddlCryoLock1.$dirty = true;
                $scope.frmOocyteVitri.ddlCryoLock.$dirty = true;               
                AlertMessage.error("PIVF", "Please Select Freezing No ");
                isvalid = false;
            }

    }
        });
        return isvalid;
    }

    $scope.Save = function()
    {
      
        debugger;
        console.log($scope.octeyteFrezingValidation());
        
        console.log($scope.VitriDetails.ListVitriDetails);
        debugger;
        if ($scope.octeyteFrezingValidation())
       {
        if ($scope.CoupleDetails.FemalePatient.IsDonor == true && $scope.CoupleDetails.FemalePatient.ArtSubTypeID != 8) {
            //usSpinnerService.spin('GridSpinner');
            //var Response = EmbryoVitrificationSrv.GetFlagISAllEmbryoFreeze($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID, 0);
            //Response.then(function (Response) {
            //    usSpinnerService.stop('GridSpinner');
                //debugger;
                //if (Response.data == 1) {
                    $scope.TankValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && d.TankId == 0 });
                    $scope.DateValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && (d.VitriDate === null || d.VitriDate === undefined) });
                    $scope.TimeValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && (d.VitriTime === null || d.VitriTime === undefined) });
                    $scope.ExDateValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && (d.ExpiryDate === null || d.ExpiryDate === undefined) });
                    $scope.ExTimeValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && (d.ExpiryTime === null || d.ExpiryTime === undefined) });

                    if ($scope.TankValidList.length > 0) {
                        angular.forEach($scope.TankValidList, function (item) {
                            item.TankIdDirty = true;
                        })
                    }
                    if ($scope.DateValidList.length > 0) {
                        angular.forEach($scope.DateValidList, function (item) {
                            item.DirtyVitriDate = true;
                        })
                    }
                    if ($scope.TimeValidList.length > 0) {
                        angular.forEach($scope.TimeValidList, function (item) {
                            item.DirtyVitriTime = true;
                        })
                    }
                    if ($scope.ExDateValidList.length > 0) {
                        angular.forEach($scope.ExDateValidList, function (item) {
                            item.DirtyExpiryDate = true;
                        })
                    }
                    if ($scope.ExTimeValidList.length > 0) {
                        angular.forEach($scope.ExTimeValidList, function (item) {
                            item.DirtyExpiryTime = true;
                        })
                    }
                    if ($scope.TankValidList == 0 && $scope.DateValidList == 0 && $scope.TimeValidList == 0 && $scope.ExDateValidList == 0 && $scope.ExTimeValidList == 0) {
                        usSpinnerService.spin('GridSpinner');
                        angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {
                            item.VitriDate = $filter('date')(item.VitriDate, 'medium');
                            item.VitriTime = $filter('date')(item.VitriTime, 'medium');
                            item.ExpiryDate = $filter('date')(item.ExpiryDate, 'medium');
                            item.ExpiryTime = $filter('date')(item.ExpiryTime, 'medium');
                        });
                        debugger;
                        console.log("ddd ",$scope.VitriDetails);
                        debugger;
                        var ResponseData = CryoPreservationSrv.SaveOocyteVitrification($scope.VitriDetails.ListVitriDetails);
                        debugger
                        ResponseData.then(function (Response) {
                            usSpinnerService.stop('GridSpinner');
                            if (Response.data == 1) {
                                AlertMessage.success("PIVF", "Record Saved Successfully!");
                                $scope.GetVitriDetails();
                            }
                        }, function (error) {
                            usSpinnerService.stop('GridSpinner');
                            AlertMessage.error("PIVF", "Error Occured While Adding Details");
                        });
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error("PIVF", "Please Select All Required Fileds For Finalized Oocytes");
                    }
                //}
                //else {
                //    usSpinnerService.stop('GridSpinner');
                //    AlertMessage.error("PIVF", "Please First Finalize All Oocyte/Embryo");
                //}
            //}, function (error) {
            //    usSpinnerService.stop('GridSpinner');
            //    AlertMessage.error("PIVF", "Error Occured While Processing");
            //});
        }
        else {
            $scope.TankValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && d.TankId == 0 });
            $scope.DateValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && (d.VitriDate === null || d.VitriDate === undefined) });
            $scope.TimeValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && (d.VitriTime === null || d.VitriTime === undefined) });
            $scope.ExDateValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && (d.ExpiryDate === null || d.ExpiryDate === undefined) });
            $scope.ExTimeValidList = $filter('filter')($scope.VitriDetails.ListVitriDetails, function (d) { return d.IsFinalized === true && (d.ExpiryTime === null || d.ExpiryTime === undefined) });

            if ($scope.TankValidList.length > 0) {
                angular.forEach($scope.TankValidList, function (item) {
                    item.TankIdDirty = true;
                })
            }
            if ($scope.DateValidList.length > 0) {
                angular.forEach($scope.DateValidList, function (item) {
                    item.DirtyVitriDate = true;
                })
            }
            if ($scope.TimeValidList.length > 0) {
                angular.forEach($scope.TimeValidList, function (item) {
                    item.DirtyVitriTime = true;
                })
            }
            if ($scope.ExDateValidList.length > 0) {
                angular.forEach($scope.ExDateValidList, function (item) {
                    item.DirtyExpiryDate = true;
                })
            }
            if ($scope.ExTimeValidList.length > 0) {
                angular.forEach($scope.ExTimeValidList, function (item) {
                    item.DirtyExpiryTime = true;
                })
            }
            if ($scope.TankValidList == 0 && $scope.DateValidList == 0 && $scope.TimeValidList == 0 && $scope.ExDateValidList == 0 && $scope.ExTimeValidList == 0) {
                usSpinnerService.spin('GridSpinner');
                angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {
                    item.VitriDate = $filter('date')(item.VitriDate, 'medium');
                    item.VitriTime = $filter('date')(item.VitriTime, 'medium');
                    item.ExpiryDate = $filter('date')(item.ExpiryDate, 'medium');
                    item.ExpiryTime = $filter('date')(item.ExpiryTime, 'medium');
                });
                var ResponseData = CryoPreservationSrv.SaveOocyteVitrification($scope.VitriDetails.ListVitriDetails);
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    if (Response.data == 1) {
                        AlertMessage.success("PIVF", "Record Saved Successfully!");
                        $scope.GetVitriDetails();
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error("PIVF", "Error Occured While Adding Details");
                });
            }
            else {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.error("PIVF", "Please Select All Required Fileds For Finalized Oocytes");
            }
        }
        } 
        

    }
    //Menu Redirect
    $scope.Navigate = function (path) {
        
        $location.path('/' + path + '/');
    }
    $scope.SetExpireDate = function (Item) {
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
    }

    $scope.CheckDuplicateFreezingNo = function CheckDuplicateFreezingNo(idx, Item) {
        debugger;
        var ResponseData = CryoPreservationSrv.CheckDuplicateFreezingNo(Item,false);
        ResponseData.then(function (Response) {
            if (Response.data == 1) {

                AlertMessage.info('PalashIVF', 'Freezing No is already present');

                for (var i = 0; i <= $scope.VitriDetails.ListVitriDetails.length - 1; i++) {
                    if (idx == i) {
                        $scope.VitriDetails.ListVitriDetails[i].FreezingNo = "";
                    }
                }
            }
        }, function (error) {
        });
    }

    //$scope.PrintOocytrFreezingCycle = function () {
    //    var a = encodeURIComponent('P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&Th=' + $scope.CoupleDetails.FemalePatient.TherapyID +
    //        '&THU=' + $scope.CoupleDetails.FemalePatient.TherapyUnitID + '&UN=' + localStorageService.get("UserInfo").UserName);
    //    window.open('/Reports/ART/OocyteFreezingCycle/OocyteFreezingCycleReportWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    //}
});