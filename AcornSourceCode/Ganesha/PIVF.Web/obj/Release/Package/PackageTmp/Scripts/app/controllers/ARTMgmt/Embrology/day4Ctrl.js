angular.module('PIVF').controller('day4Ctrl', function ($sce, $scope, RootPGInfo, $uibModalInstance, DayFourSrv, $filter, $timeout, Common , srvCommon, AlertMessage, $uibModal, PageConfig, localStorageService, usSpinnerService) {
    $scope.CommonFiled = {};
    $scope.CoupleDetails = {};
    $scope.ShowPreviousDay = true;
    $scope.AllDays = true;
    $scope.LoginInfo = localStorageService.get("UserInfo").UserName;
    //Assign To Couple Information And Oocyte details
    $scope.CoupleDetails = RootPGInfo.CoupleDetails;
    $scope.OocyteGrid = {};
    $scope.OocyteGridData = {};
    $scope.NumberOFOocytes = [];
    $scope.ShowallOocytesEmbro = false;
    //Dashboard Count
    $scope.Discarded = 0;
    $scope.Cryo = 0;
    $scope.Transfer = 0;
    $scope.Unobserved = 0;
    $scope.disableClickDay4 = false;        //Added by Nayan Kamble on 11/06/2019
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function ($event, Item) {
        $event.preventDefault();
        $event.stopPropagation();
        Item.opened = true;
    };
    //Datepicker Set Date To Opu Start date
    if (RootPGInfo.OPUStartDate != undefined && RootPGInfo.OPUStartDate != null) {
        $scope.SetOPUStartDate = RootPGInfo.OPUStartDate;
    }
    else {
        $scope.SetOPUStartDate = new Date().setYear(new Date().getYear() - 100)
    }
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: $scope.SetOPUStartDate,//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    /*END : Date*/
    $scope.ismeridian = true;
    var objResource = {};
    //========================================================================================================================================================================
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //========================================================================================================================================================================
    //Close Popup
    $scope.CancelDay = function () {
        $uibModalInstance.dismiss('cancel');
    }
    //========================================================================================================================================================================
    //Fill Oocyte Grid
    $scope.GetOocyteForDayFour = function () {
        usSpinnerService.spin('GridSpinner');
        if ($scope.CoupleDetails.FemalePatient != undefined && $scope.CoupleDetails.FemalePatient != null) {
            if ($scope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                $scope.disableSaveBtn = true;
            }
            if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
                $scope.disableSaveBtn = true;
            }
        }
        var ResponseData = DayFourSrv.fillDayFourOocyteGrid($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
        ResponseData.then(function (Response) {
            //Fill All Master
            var ResponseData = DayFourSrv.FillDayFourMaster($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
            ResponseData.then(function (MasterResponse) {
                $scope.MasterData = MasterResponse.data;
                $scope.OocyteGridData = Response.data;

                var DonorCycleCodeId = null;
                if ($scope.CoupleDetails.FemalePatient.DonorCycleCode != "") {
                    var tempCycleCode = $scope.CoupleDetails.FemalePatient.DonorCycleCode.split("/");
                    DonorCycleCodeId = tempCycleCode[3];
                    debugger;
                }
                else {
                    DonorCycleCodeId = 0;
                    

                }

                angular.forEach($scope.OocyteGridData, function (item) {
                    if ((DonorCycleCodeId != 0 && item.AssistedHatching == true) || item.Finalize == true) {
                        item.DonorAssistedHatching = true;

                    }
                    else {
                        item.DonorAssistedHatching = false;
                    }
                });
                


                $scope.OocyteGrid = $filter('filter')($scope.OocyteGridData, function (d) { return d.activeOocytes === true });
                //Assign Date time For top values
                if ($scope.OocyteGrid.length > 0) {
                    if ($scope.OocyteGrid[0].Date != undefined && $scope.OocyteGrid[0].Time != undefined && $scope.OocyteGrid[0].Date != null && $scope.OocyteGrid[0].Time != null) {
                        $scope.CommonFiled.Date = new Date($scope.OocyteGrid[0].Date);
                        $scope.CommonFiled.Time = new Date($scope.OocyteGrid[0].Time);
                        if ($scope.OocyteGrid[0].IncubatorID != 0 && $scope.OocyteGrid[0].IncubatorID != null) {
                            $scope.CommonFiled.IncubatorID = $scope.OocyteGrid[0].IncubatorID;
                        }
                        if ($scope.OocyteGrid[0].WitnessID != 0 && $scope.OocyteGrid[0].WitnessID != null) {
                            $scope.CommonFiled.WitnessID = $scope.OocyteGrid[0].WitnessID;
                        }
                    }
                    else {
                        $scope.CommonFiled.Date = new Date();
                        $scope.CommonFiled.Time = new Date();
                    }
                }
                else {
                    $scope.CommonFiled.Date = new Date();
                    $scope.CommonFiled.Time = new Date();
                }

                //DashBoard Count
                $scope.Discarded = $filter('filter')($scope.OocyteGrid, function (d) { return d.PlanID === 1 && d.Finalize === true; }).length;
                $scope.Cryo = $filter('filter')($scope.OocyteGrid, function (d) { return (d.PlanID === 2 || d.PlanID === 6) && d.Finalize === true; }).length;
                $scope.Transfer = $filter('filter')($scope.OocyteGrid, function (d) { return d.PlanID === 4 && d.Finalize === true; }).length;
                $scope.Unobserved = $filter('filter')($scope.OocyteGrid, function (d) { return d.Finalize === false; }).length;
                //Bind Selected Date 
                angular.forEach($scope.OocyteGrid, function (item) {
                    item.planMaster = angular.copy($scope.MasterData.Plan);
                    if (item.Finalize || item.Finalize1) {
                        item.rowdisable = true;
                        item.EmbryologistName = item.EmbryologistDesc;
                    }
                    else {
                        if (!item.FreezeEmbryo) {
                            if (item.IsFromDonar) {
                                if (item.DonateDay <= 4) {
                                    item.rowdisable = false;
                                }
                                else {
                                    item.rowdisable = true;
                                }
                            }
                            else {
                                item.rowdisable = false;
                            }
                        }
                        else {
                            item.rowdisable = true;
                        }
                        item.EmbryologistName = $scope.LoginInfo;
                    }
                    if (item.Time != null) {
                        item.Time = new Date(item.Time);
                    }
                    if (item.Date != null) {
                        item.Date = new Date(item.Date);
                        return item;
                    }
                });
                // //Get Only Oocytes to get ApplayTo Functionality
                $scope.OocyteGrid.DummyOocyte = [];
                angular.forEach($scope.OocyteGrid, function (item, index) {
                    if (item.Finalize == false && item.rowdisable == false) {
                        $scope.CountOocytes = {};
                        $scope.CountOocytes.ID = item.OocyteNumber;
                        $scope.CountOocytes.Description = item.OocyteNumber;
                        $scope.NumberOFOocytes.push($scope.CountOocytes);
                    }
                    //select Default today's Date
                    if (item.Date == null) {
                        item.Date = new Date();
                    }
                    if (item.Time == null) {
                        item.Time = new Date();
                    }
                });
                // //fill Oocytes In MultiCheck Box 
                angular.forEach($scope.OocyteGrid, function (item, index) {
                    $scope.OocyteGrid[index].DummyOocyte = angular.copy($filter('filter')($scope.NumberOFOocytes, function (d) { return d.ID !== item.OocyteNumber; }));
                }
               );
                usSpinnerService.stop('GridSpinner');
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
    //========================================================================================================================================================================
    //Show All Oocytes And embryo
    $scope.Showall = function () {
        //Showall Oocytes And Embryo
        if ($scope.ShowallOocytesEmbro) {
            angular.forEach($filter('filter')($scope.OocyteGridData, function (d) { return d.activeOocytes === false; }), function (item) {
                item.rowdisable = true;
                $scope.OocyteGrid.push(item);
            }
            );
        }
        else {
            angular.forEach($filter('filter')($scope.OocyteGridData, function (d) { return d.activeOocytes === false; }), function (item) {
                var index = $scope.OocyteGrid.indexOf(item);
                $scope.OocyteGrid.splice(index, 1);
            }
            );
        }
    }
    //========================================================================================================================================================================

    $scope.ApplayToSelectValue = function (selectedOocyte, ApplayTo, index) {
        debugger;
        console.log(ApplayTo);
        /*if(ApplayTo.length!=0){
            for (var i = 0; i < ApplayTo.length; i++) {
                console.log($scope.OocyteGrid);
                console.log(ApplayTo);
            }
        }
        else{
            //none is select then 
            for (var i = 0; i < $scope.OocyteGrid.length; i++) {
                if (index !== i) {
                    if ($scope.OocyteGrid[i].Finalize == false) {
                        $scope.OocyteGrid[i].PNID =0;
                        $scope.OocyteGrid[i].FertilizationID=0;
                        $scope.OocyteGrid[i].GradeID = 0;
                        $scope.OocyteGrid[i].CellStageID = 0;
                        $scope.OocyteGrid[i].PlanID = 0;
                        $scope.OocyteGrid[i].Remarks = '';

                        $scope.OocyteGrid[i].Img.model =null;
                        $scope.OocyteGrid[i].Finalize =false;
                        // $scope.OocyteGrid[i].Remarks = $scope.OocyteGrid[index].Remarks;
                    }

                }
            }
        }*/
        //Copy To Row To selected Row
        $scope.SelectedOocytesToApplay = $filter('filter')($scope.OocyteGrid, function (d) { return d.OocyteNumber === selectedOocyte; });
        $scope.SelectedOocytesToApplay[0].IsFill = true;
        angular.forEach($filter('filter')($scope.OocyteGrid, function (d) { return d.OocyteNumber !== selectedOocyte; }), function (Oocytes1, index) {
            angular.forEach(ApplayTo, function (selectedocytes) {
                if (selectedocytes.ID == Oocytes1.OocyteNumber) {
                    //this are orignal Oocytes
                    $scope.OocyteNumber = Oocytes1.OocyteNumber;
                    $scope.SerialOocyteNumber = Oocytes1.SerialOocyteNumber;
                    $scope.DayFourID = Oocytes1.DayFourID;
                    $scope.Day0Plan = Oocytes1.Day0Plan;
                    $scope.Day1Fertilization = Oocytes1.Day1Fertilization;
                    $scope.Day1Plan = Oocytes1.Day1Plan;
                    $scope.daytwograde = Oocytes1.daytwograde;
                    $scope.daytwocellsatge = Oocytes1.daytwocellsatge;
                    $scope.daythreegrade = Oocytes1.daythreegrade;
                    $scope.daythreecellsatge = Oocytes1.daythreecellsatge;
                    //Copy Object respective object
                    angular.copy($scope.SelectedOocytesToApplay[0], Oocytes1);
                    Oocytes1.DummyOocyte = [];
                    Oocytes1.IsFill = false;
                    Oocytes1.ApplayTO = {};
                    Oocytes1.Img = {id: 0, model: Array(0)};
                    //Get Orignal VALUE AFTER COPY DATA
                    Oocytes1.OocyteNumber = $scope.OocyteNumber;
                    Oocytes1.SerialOocyteNumber = $scope.SerialOocyteNumber;
                    Oocytes1.DayFourID = $scope.DayFourID;
                    Oocytes1.Day0Plan = $scope.Day0Plan;
                    Oocytes1.Day1Fertilization = $scope.Day1Fertilization;
                    Oocytes1.Day1Plan = $scope.Day1Plan;
                    Oocytes1.daytwograde = $scope.daytwograde;
                    Oocytes1.daytwocellsatge = $scope.daytwocellsatge;
                    Oocytes1.daythreegrade = $scope.daythreegrade;
                    Oocytes1.daythreecellsatge = $scope.daythreecellsatge;
                    Oocytes1.DummyOocyte = angular.copy($filter('filter')($scope.NumberOFOocytes, function (d) { return d.ID !== selectedocytes.ID; })); //&& d.ID !== selectedOocyte
                }
            });
        });
        //$scope.AllSelectedOocytes = [];
        //angular.forEach($filter('filter')(angular.copy($scope.OocyteGrid), function (d) { return d.IsFill === true; }), function (RootPart, index) {
        //    $scope.SelectedOocytes = {};
        //    $scope.SelectedOocytes.ID = RootPart.OocyteNumber;
        //    $scope.AllSelectedOocytes.push(angular.copy($scope.SelectedOocytes));
        //});
        //Validation Of selected Oocyte not Show on next row
        //angular.foreach(angular.copy($scope.selectedoocytestoapplay[0].applayto), function (notgetthisoocytes) {
        //    angular.foreach($filter('filter')($scope.oocytegrid, function (d) { return d.oocytenumber !== selectedoocyte; }), function (oocytes, index) {
        //        angular.foreach($filter('filter')(angular.copy(oocytes.dummyoocyte), function (d) { return d.id === notgetthisoocytes.id; }), function (item) {
        //            var getindex = angular.copy(oocytes.dummyoocyte.indexof(item));
        //            oocytes.dummyoocyte.splice(getindex, 1);
        //        });
        //    });
        //});
    }
    $scope.ApplayToSelectAll = function (item, index) {
        console.log(item, index);
        console.log($scope.OocyteGrid);
        for (var i = 0; i < $scope.OocyteGrid.length; i++) {
            if (index !== i) {
                if ($scope.OocyteGrid[i].Finalize == false) {
                    //$scope.OocyteGrid[i].PNID = $scope.OocyteGrid[index].PNID;
                    //$scope.OocyteGrid[i].FertilizationID = $scope.OocyteGrid[index].FertilizationID;
                    $scope.OocyteGrid[i].CellStageID = $scope.OocyteGrid[index].CellStageID;
                    $scope.OocyteGrid[i].Fragmentation = $scope.OocyteGrid[index].Fragmentation;
                    $scope.OocyteGrid[i].GradeID = $scope.OocyteGrid[index].GradeID;
                    $scope.OocyteGrid[i].PlanID = $scope.OocyteGrid[index].PlanID;
                    $scope.OocyteGrid[i].AssistedHatching = $scope.OocyteGrid[index].AssistedHatching;
                    $scope.OocyteGrid[i].Remarks = $scope.OocyteGrid[index].Remarks;
                    $scope.OocyteGrid[i].Img.model = $scope.OocyteGrid[index].Img.model;
                    $scope.OocyteGrid[i].Finalize = $scope.OocyteGrid[index].Finalize;
                    // $scope.OocyteGrid[i].Remarks = $scope.OocyteGrid[index].Remarks;
                }

            }
        }
    }

    $scope.ApplayToDeSelectAll = function (index) {
        console.log(index);
        console.log($scope.OocyteGrid);
        for (var i = 0; i < $scope.OocyteGrid.length; i++) {
            if (index !== i) {
                if ($scope.OocyteGrid[i].rowdisable == false) {
                    //$scope.OocyteGrid[i].PNID = 0;
                    //$scope.OocyteGrid[i].FertilizationID = 0;
                    $scope.OocyteGrid[i].CellStageID = 0;
                     $scope.OocyteGrid[i].SymmetryID = 0;
                    $scope.OocyteGrid[i].Fragmentation = 0;
                    $scope.OocyteGrid[i].FragmentationDistributionID = 0;
                     $scope.OocyteGrid[i].NucleiID = 0;
                    $scope.OocyteGrid[i].GradeID = 0;
                    $scope.OocyteGrid[i].PlanID = 0;
                    $scope.OocyteGrid[i].AssistedHatching = 0;
                    $scope.OocyteGrid[i].Remarks = '';
                    $scope.OocyteGrid[i].Img.model = null;
                    $scope.OocyteGrid[i].Finalize = false;
                    // $scope.OocyteGrid[i].Remarks = $scope.OocyteGrid[index].Remarks;
                     $scope.OocyteGrid[i].DummyOocyte = angular.copy($filter('filter')($scope.NumberOFOocytes, function (d) { return d.ID !==    $scope.OocyteGrid[i].ID; }));
                }

            }
        }
    }

    //$scope.ApplayToSelectValue = function (selectedOocyte) {
    //    //Copy To Row To selected Row
    //    $scope.SelectedOocytesToApplay = $filter('filter')($scope.OocyteGrid, function (d) { return d.OocyteNumber === selectedOocyte; });
    //    $scope.SelectedOocytesToApplay[0].IsFill = true;
    //    angular.forEach($filter('filter')($scope.OocyteGrid, function (d) { return d.OocyteNumber !== selectedOocyte; }), function (Oocytes1, index) {
    //        angular.forEach($scope.SelectedOocytesToApplay[0].ApplayTO, function (selectedocytes) {
    //            if (selectedocytes.ID == Oocytes1.OocyteNumber) {
    //                //this are orignal Oocytes
    //                $scope.OocyteNumber = Oocytes1.OocyteNumber;
    //                $scope.SerialOocyteNumber = Oocytes1.SerialOocyteNumber;
    //                $scope.DayFourID = Oocytes1.DayFourID;
    //                $scope.Day0Plan = Oocytes1.Day0Plan;
    //                $scope.Day1Fertilization = Oocytes1.Day1Fertilization;
    //                $scope.Day1Plan = Oocytes1.Day1Plan;
    //                $scope.daytwograde = Oocytes1.daytwograde;
    //                $scope.daytwocellsatge = Oocytes1.daytwocellsatge;
    //                $scope.daythreegrade = Oocytes1.daythreegrade;
    //                $scope.daythreecellsatge = Oocytes1.daythreecellsatge;
    //                //Copy Object respective object
    //                angular.copy($scope.SelectedOocytesToApplay[0], Oocytes1);
    //                Oocytes1.DummyOocyte = [];
    //                Oocytes1.IsFill = false;
    //                Oocytes1.ApplayTO = {};
    //                Oocytes1.Img = {};
    //                //Get Orignal VALUE AFTER COPY DATA
    //                Oocytes1.OocyteNumber = $scope.OocyteNumber;
    //                Oocytes1.SerialOocyteNumber = $scope.SerialOocyteNumber;
    //                Oocytes1.DayFourID = $scope.DayFourID;
    //                Oocytes1.Day0Plan = $scope.Day0Plan;
    //                Oocytes1.Day1Fertilization = $scope.Day1Fertilization;
    //                Oocytes1.Day1Plan = $scope.Day1Plan;
    //                Oocytes1.daytwograde = $scope.daytwograde;
    //                Oocytes1.daytwocellsatge = $scope.daytwocellsatge;
    //                Oocytes1.daythreegrade = $scope.daythreegrade;
    //                Oocytes1.daythreecellsatge = $scope.daythreecellsatge;
    //                Oocytes1.DummyOocyte = angular.copy($filter('filter')($scope.NumberOFOocytes, function (d) { return d.ID !== selectedocytes.ID; })); //&& d.ID !== selectedOocyte
    //            }
    //        });
    //    });
    //    //$scope.AllSelectedOocytes = [];
    //    //angular.forEach($filter('filter')(angular.copy($scope.OocyteGrid), function (d) { return d.IsFill === true; }), function (RootPart, index) {
    //    //    $scope.SelectedOocytes = {};
    //    //    $scope.SelectedOocytes.ID = RootPart.OocyteNumber;
    //    //    $scope.AllSelectedOocytes.push(angular.copy($scope.SelectedOocytes));
    //    //});
    //    //Validation Of selected Oocyte not Show on next row
    //    //angular.foreach(angular.copy($scope.selectedoocytestoapplay[0].applayto), function (notgetthisoocytes) {
    //    //    angular.foreach($filter('filter')($scope.oocytegrid, function (d) { return d.oocytenumber !== selectedoocyte; }), function (oocytes, index) {
    //    //        angular.foreach($filter('filter')(angular.copy(oocytes.dummyoocyte), function (d) { return d.id === notgetthisoocytes.id; }), function (item) {
    //    //            var getindex = angular.copy(oocytes.dummyoocyte.indexof(item));
    //    //            oocytes.dummyoocyte.splice(getindex, 1);
    //    //        });
    //    //    });
    //    //});
    //}

    //========================================================================================================================================================================
    //Open ImgPopUp For Show Image Preview
    $scope.GetImg = {};
    $scope.PreviewImgDay4 = function (Imgcollection) {
        angular.element(myModalDay4).modal('show');
        if (Imgcollection.Img != null) {
            $scope.GetImg = Imgcollection.Img.model;
            angular.forEach($scope.GetImg, function (item) {
                item.rowdisable = Imgcollection.rowdisable;
            });
        }
        else {
            $scope.GetImg = {};
        }
    }
    //Preview Img Ok Click Process
    $scope.ImgPreviewOk = function () {
        angular.element(myModalDay4).modal('hide');
    }
    //Preview Img Cancel Click Process
    $scope.ImgPreviewCancel = function () {
        angular.element(myModalDay4).modal('hide');
    }
    //Remove Images
    $scope.RemoveImg = function (index) {
        var index = $scope.GetImg.indexOf(index);
        $scope.GetImg.splice(index, 1);
    }
    //========================================================================================================================================================================
    //Save Data day 4

    $scope.ClearSaveDays=function ClearSaveDays() {    //Added by Nayan Kamble on 11/06/2019
        $scope.disableClickDay4 = false;
    }

    $scope.SaveDay4Process = function () {
        $scope.disableClickDay4 = true;           //Added by Nayan Kamble on 11/06/2019
        usSpinnerService.spin('GridSpinner');
        $scope.isvalidTopVlaidation = false;
        if ($scope.CommonFiled.Date == undefined || $scope.CommonFiled.Date == null) {
            $scope.DateInvalid = true;
            $scope.isvalidTopVlaidation = true;
        }
        if ($scope.CommonFiled.Time == undefined || $scope.CommonFiled.Time == null) {
            $scope.TimeInvalid = true;
            $scope.isvalidTopVlaidation = true;
        }
        if ($scope.isvalidTopVlaidation == false) {
            if ($scope.CoupleDetails.FemalePatient.IsDonor) {
                //if ($scope.MasterData.DonarLinkCycleIsAvialble > 0) {
                    //Get only Ivf/icsi plan Oocytes
                    $scope.GetActiveOocytes = $filter('filter')($scope.OocyteGridData, function (d) { return d.activeOocytes === true && d.rowdisable === false });
                    $scope.isvalid = false;
                    angular.forEach($scope.GetActiveOocytes, function (item) {
                        if (item.Finalize) {
                            if (item.Time == undefined || item.Time == null) {
                                $scope.isvalid = true;
                                item.TimeInvalid = true;
                            }
                            else {
                                item.Time = new Date($scope.CommonFiled.Time);
                            }
                            if (item.CellStageID == 0 || item.CellStageID == null) {
                                $scope.isvalid = true;
                                item.CellStageIDInvalid = true;
                            }
                            if (item.GradeID == 0 || item.GradeID == null) {
                                $scope.isvalid = true;
                                item.GradeIDInvalid = true;
                            }
                            if (item.Date == undefined || item.Date == null) {
                                $scope.isvalid = true;
                                item.DateInvalid = true;
                            }
                            else {
                                item.Date = new Date($scope.CommonFiled.Date);
                            }
                            if ($scope.CommonFiled.IncubatorID != null && $scope.CommonFiled.IncubatorID != 0) {
                                item.IncubatorID = $scope.CommonFiled.IncubatorID;
                            }
                            if ($scope.CommonFiled.WitnessID != null && $scope.CommonFiled.WitnessID != 0) {
                                item.WitnessID = $scope.CommonFiled.WitnessID;
                            }
                            if (item.PlanID == 5 || item.PlanID == 6) {
                                if (angular.isDefined(item.CoupleID) && item.CoupleID > 0) {

                                }
                                else {
                                    item.CoupleIDInvalid = true;
                                    $scope.isvalid = true;
                                }
                            }
                            else {
                                item.CoupleID = 0;
                            }
                        }
                    });
                    if ($scope.isvalid == false) {
                        angular.forEach($scope.GetActiveOocytes, function (item) {
                            item.Date = $filter('date')(item.Date, 'medium');
                            item.Time = $filter('date')(item.Time, 'medium');
                        });
                        var ResponseData = DayFourSrv.SaveDay4Process($scope.GetActiveOocytes);
                        ResponseData.then(function (Response) {
                            if (Response.data == 1) {
                                $scope.ClearSaveDays();        //Added by Nayan Kamble on 11/06/2019      
                                $uibModalInstance.close(Response.data);
                            }
                            usSpinnerService.stop('GridSpinner');
                        }, function (error) {
                            usSpinnerService.stop('GridSpinner');
                            AlertMessage.error(objResource.msgTitle, objResource.msgError);
                        });
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error(objResource.msgTitle, "Please Select mandatory Values");
                        $scope.ClearSaveDays();    //Added by Nayan Kamble on 11/06/2019
                    }
                //}
                //else {
                //    usSpinnerService.stop('GridSpinner');
                //    AlertMessage.error(objResource.msgTitle, "Create a Couple Cycle First..");
                //}
            }
            else {
                //Get only Ivf/icsi plan Oocytes
                $scope.GetActiveOocytes = $filter('filter')($scope.OocyteGridData, function (d) { return d.activeOocytes === true && d.rowdisable === false });
                $scope.isvalid = false;
                angular.forEach($scope.GetActiveOocytes, function (item) {
                    if (item.Finalize) {
                        if (item.Time == undefined || item.Time == null) {
                            $scope.isvalid = true;
                            item.TimeInvalid = true;
                        }
                        else {
                            item.Time = new Date($scope.CommonFiled.Time);
                        }
                        if (item.CellStageID == 0 || item.CellStageID == null) {
                            $scope.isvalid = true;
                            item.CellStageIDInvalid = true;
                        }
                        if (item.GradeID == 0 || item.GradeID == null) {
                            $scope.isvalid = true;
                            item.GradeIDInvalid = true;
                        }
                        if (item.Date == undefined || item.Date == null) {
                            $scope.isvalid = true;
                            item.DateInvalid = true;
                        }
                        else {
                            item.Date = new Date($scope.CommonFiled.Date);
                        }
                        if ($scope.CommonFiled.IncubatorID != null && $scope.CommonFiled.IncubatorID != 0) {
                            item.IncubatorID = $scope.CommonFiled.IncubatorID;
                        }
                        if ($scope.CommonFiled.WitnessID != null && $scope.CommonFiled.WitnessID != 0) {
                            item.WitnessID = $scope.CommonFiled.WitnessID;
                        }
                    }
                });
                if ($scope.isvalid == false) {
                    angular.forEach($scope.GetActiveOocytes, function (item) {
                        item.Date = $filter('date')(item.Date, 'medium');
                        item.Time = $filter('date')(item.Time, 'medium');
                    });
                    var ResponseData = DayFourSrv.SaveDay4Process($scope.GetActiveOocytes);
                    ResponseData.then(function (Response) {
                        if (Response.data == 1) {
                            $scope.ClearSaveDays();   //Added by Nayan Kamble on 11/06/2019
                            $uibModalInstance.close(Response.data);
                        }
                        usSpinnerService.stop('GridSpinner');
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    });
                }
                else {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, "Please Select mandatory Values");
                    $scope.ClearSaveDays();    //Added by Nayan Kamble on 11/06/2019
                }
            }
        }
        else {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, "Please Select mandatory Values");
            $scope.ClearSaveDays();        //Added by Nayan Kamble on 11/06/2019
        }
    }
    //========================================================================================================================================================================
    $scope.DisableCryo = function (Data) {
        //Get The Page Visibility Config Data By Vikrant 
        $scope.configData = PageConfig.getObj();
        if (Data.SameDay == true) {
            for (var i = Data.planMaster.length - 1; i >= 0; i--) {
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 1) {
                        Data.planMaster.splice(i, 1);
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 2) {
                        Data.planMaster.splice(i, 1);
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 4) {
                        if (!$scope.configData.Transfer) {
                            Data.planMaster.splice(i, 1);
                        }
                        else {
                            //if (Data.IsExtend > 0) {
                            if ($scope.MasterData.ISDonarEmbET > 0) {
                                if (!Data.IsFromDonar) {
                                    Data.planMaster.splice(i, 1);
                                }
                            }
                            else if ($scope.MasterData.ISEmbET > 0) {
                                if (Data.IsFromDonar) {
                                    Data.planMaster.splice(i, 1);
                                }
                            }
                            //}
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 5) {
                        if (!$scope.configData.Donate) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 6) {
                        if (!$scope.configData.DonateCryo) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
            }
        }
        else {
            for (var i = Data.planMaster.length - 1; i >= 0; i--) {
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 1) {
                        if (!$scope.configData.Discard) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 2) {
                        if (!$scope.configData.Cryo) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 4) {
                        if (!$scope.configData.Transfer) {
                            Data.planMaster.splice(i, 1);
                        }
                        else {
                            if (Data.IsExtend > 0) {
                                if ($scope.MasterData.ISDonarEmbET > 0) {
                                    if (!Data.IsFromDonar) {
                                        Data.planMaster.splice(i, 1);
                                    }
                                }
                                else if ($scope.MasterData.ISEmbET > 0) {
                                    if (Data.IsFromDonar) {
                                        Data.planMaster.splice(i, 1);
                                    }
                                }
                            }
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 5) {
                        if (!$scope.configData.Donate) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 6) {
                        if (!$scope.configData.DonateCryo) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
    //========================================================================================================================================================================
    $scope.ShowPatientPopupData = function ShowPatientPopupData(Item) {
        if (Item.ZeroTooltip != null) {
            if (Item.ZeroTooltip.Date != undefined) {
                Item.ZeroTooltip.Date = $filter('date')(Item.ZeroTooltip.Date, 'dd-MMM-yyyy');
            }
            if (Item.ZeroTooltip.Time != undefined) {
                Item.ZeroTooltip.Time = $filter('date')(Item.ZeroTooltip.Time, 'HH:mm');
            }
            if (Item.ZeroTooltip.IVM) {
                $scope.IVMFlag = 'checked';
            }
            else {
                $scope.IVMFlag = '';
            }
            $scope.html = '<div class="tbl_tooltip"><table><tr><td colspan="4"><b>' + Item.ZeroTooltip.CycleCode + '</b></td><td><b class="txtPlan">' + Item.PlanName + '</b></td></tr><tr><td><b>Date Time</b></td><td colspan="4">: ' + Item.ZeroTooltip.Date + '&nbsp;' + Item.ZeroTooltip.Time + '</td></tr><tr><td><b>OCD </b></td><td>: ' + Item.ZeroTooltip.OCD + '</td><td>&nbsp;</td><td><b>ECD </b></td><td>: ' + Item.ZeroTooltip.ECD + '</td></tr><tr><td><b>OCC </b></td><td>: ' + Item.ZeroTooltip.OCC + '</td><td>&nbsp;</td><td><b>ZP </b></td><td>: ' + Item.ZeroTooltip.ZP + '</td></tr><tr><td><b>PB </b></td><td>: ' + Item.ZeroTooltip.PB + '</td><td>&nbsp;</td><td><b>PVS </b></td><td>: ' + Item.ZeroTooltip.PVS + '</td></tr><tr><td><b>Cytoplasm </b></td><td>: ' + Item.ZeroTooltip.Cytoplasm + '</td><td>&nbsp;</td><td><b>Breakage </b></td><td>: ' + Item.ZeroTooltip.Breakage + '</td></tr><tr><td><b>Stage </b></td><td>: ' + Item.ZeroTooltip.MaturityDesc + '</td><td>&nbsp;</td><td><b>PB Location </b></td><td>: ' + Item.ZeroTooltip.PBLocationDesc + '</td></tr><tr><td><b>Location </b></td><td>: ' + Item.ZeroTooltip.LocationDesc + '</td><td>&nbsp;</td><td><b>IVM</b></td><td colspan="4"><input type="checkbox"  ng-model="' + Item.ZeroTooltip.IVM + '" ng-disabled="true"></td></tr><tr><td><b>Embryologist </b></td><td colspan="4">: ' + Item.ZeroTooltip.Embryologist + '</td></tr><tr><td><b>Witness </b></td><td colspan="4">: ' + Item.ZeroTooltip.Witness + '</td></tr></table></div>';
            $scope.htmlPopover1 = $sce.trustAsHtml($scope.html);
        }
        else {
            $scope.htmlPopover1 = $sce.trustAsHtml();
        }
    }
    //========================================================================================================================================================================
    $scope.ValidationMsg = function (Msg) {
        AlertMessage.error("PalashIVF", Msg);
    }
});