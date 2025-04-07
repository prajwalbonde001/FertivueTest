angular.module('PIVF').controller('day1Ctrl', function ($scope, $sce, RootPGInfo, $uibModalInstance, EmbrologyMainSrv , DayOneSrv, $filter, $timeout, Common ,srvCommon, AlertMessage, $uibModal, PageConfig, localStorageService, usSpinnerService) {
    //Declare To the Local Variable
    //$scope.clickCount = 0;    //Added by Nayan Kamble
    $scope.CommonFiled = {};
    $scope.OocyteGridData = {};
    $scope.OocyteGrid = {};
    $scope.CoupleDetails = {};
    $scope.MasterData = {};
    $scope.ShowPreviousDays = true
    $scope.discardedOocytes = false;
    $scope.CryoOocytes = false;
    $scope.DonateOocytes = false;
    $scope.NumberOFOocytes = [];
    //Dashboard Count
    $scope.Fertilization = 0;
    $scope.NormalFertilization = 0;
    $scope.AbNormalFertilization = 0;
    $scope.Discarded = 0;
    $scope.Cryo = 0;
    $scope.Nucleoli = 0;
    $scope.Cleavage = 0;
    $scope.LinkPatientMaleList=[];
    $scope.LoginInfo = localStorageService.get("UserInfo").UserName;
    //Assign To Couple Information And Oocyte details
    $scope.CoupleDetails = RootPGInfo.CoupleDetails;
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function ($event, item) {
        $event.preventDefault();
        $event.stopPropagation();
        item.opened = true;
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };

    $scope.disableClickDay1 = false;          //Added by Nayan Kamble on 11/06/2019

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
    //Redirect Back To Embrology

    //$scope.GetCountOfClick = function () {     //Added by Nayan Kamble
    //    debugger;
    //    $scope.clickCount = $scope.clickCount + 1;
    //}

    $scope.ClearSaveDays = function ClearSaveDays() {    //Added by Nayan Kamble on 11/06/2019
        $scope.disableClickDay1 = false;
    }
    $scope.SaveDay1Process = function () {
        debugger;
        $scope.disableClickDay1 = true;       //Added by Nayan Kamble on 11/06/2019
        usSpinnerService.spin('GridSpinner');
       // console.log("count1 ", $scope.clickCount);
       // if ($scope.clickCount == 0) {
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
                    $scope.GetActiveOocytes = $filter('filter')($scope.OocyteGridData, function (d) { return (d.Day0PlanID === 3 || d.Day0PlanID === 4 || d.Day0PlanID === 5 || d.Day0PlanID === 11 || d.Day0PlanID === 12 || d.Day0PlanID === 13) && d.rowdisable === false });
                    $scope.isvalid = false;
                    debugger;
                    angular.forEach($scope.GetActiveOocytes, function (item) {
                        if (item.Finalize) {
                            if (item.CellStageID == 0 || item.CellStageID == null) {
                                $scope.isvalid = true;
                                item.CellStageIDInvalid = true;
                            }
                            if (item.FertilizationID == 0 || item.FertilizationID == null) {
                                $scope.isvalid = true;
                                item.FertilizationIDInvalid = true;
                            }
                            if (item.Date == undefined || item.Date == null) {
                                $scope.isvalid = true;
                                item.DateInvalid = true;
                            }
                            else {
                                item.Date = new Date($scope.CommonFiled.Date);
                            }
                            if (item.Time == undefined || item.Time == null) {
                                $scope.isvalid = true;
                                item.TimeInvalid = true;
                            }
                            if (item.PNID == null || item.PNID == 0 || item.PNID ==undefined) {
                                $scope.isvalid = true;
                                item.PNInvalid = true;
                            }
                            else {
                                item.Time = new Date($scope.CommonFiled.Time);
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
                                    $scope.isvalid = true;
                                    item.CoupleIDInvalid = true;
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
                        var ResponseData = DayOneSrv.SaveDay1Process($scope.GetActiveOocytes);
                        ResponseData.then(function (Response) {
                            if (Response.data == 1) {
                                usSpinnerService.stop('GridSpinner');
                                $scope.ClearSaveDays();     //Added by Nayan Kamble on 11/06/2019
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
                        $scope.ClearSaveDays();     //Added by Nayan Kamble on 11/06/2019
                    }
                    //}
                    //else {
                    //    usSpinnerService.stop('GridSpinner');
                    //    AlertMessage.error(objResource.msgTitle, "Create a Couple Cycle First..");
                    //}
                }
                else {
                    //Get only Ivf/icsi plan Oocytes
                    $scope.GetActiveOocytes = $filter('filter')($scope.OocyteGridData, function (d) { return (d.Day0PlanID === 3 || d.Day0PlanID === 4 || d.Day0PlanID === 5 || d.Day0PlanID === 11 || d.Day0PlanID === 12 || d.Day0PlanID === 13) && d.rowdisable === false });
                    $scope.isvalid = false;
                    angular.forEach($scope.GetActiveOocytes, function (item) {
                        if (item.Finalize) {
                            if (item.CellStageID == 0 || item.CellStageID == null) {
                                $scope.isvalid = true;
                                item.CellStageIDInvalid = true;
                            }
                            if (item.FertilizationID == 0 || item.FertilizationID == null) {
                                $scope.isvalid = true;
                                item.FertilizationIDInvalid = true;
                            }
                            if (item.Date == undefined || item.Date == null) {
                                $scope.isvalid = true;
                                item.DateInvalid = true;
                            }
                            else {
                                item.Date = new Date($scope.CommonFiled.Date);
                            }
                            if (item.Time == undefined || item.Time == null) {
                                $scope.isvalid = true;
                                item.TimeInvalid = true;
                            }
                            else {
                                item.Time = new Date($scope.CommonFiled.Time);
                            }
                            if (item.PNID == null || item.PNID == 0 || item.PNID ==undefined) {
                                
                                $scope.isvalid = true;
                                item.PNInvalid = true;
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
                        var ResponseData = DayOneSrv.SaveDay1Process($scope.GetActiveOocytes);
                        ResponseData.then(function (Response) {
                            if (Response.data == 1) {
                                usSpinnerService.stop('GridSpinner');
                                $scope.ClearSaveDays();     //Added by Nayan Kamble on 11/06/2019
                                $uibModalInstance.close(Response.data);
                            }
                        }, function (error) {
                            usSpinnerService.stop('GridSpinner');
                            AlertMessage.error(objResource.msgTitle, objResource.msgError);
                        });
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error(objResource.msgTitle, "Please Select mandatory Values");
                        $scope.ClearSaveDays();     //Added by Nayan Kamble on 11/06/2019
                    }
                }
            }
            else {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.error(objResource.msgTitle, "Please Select mandatory Values");
                $scope.ClearSaveDays();     //Added by Nayan Kamble on 11/06/2019
            }
        //}
    }

   //================================
    //$scope.PartnerSpermRetrivalForDonor=function()
    //{
    //    debugger;
    //    var ResponseData = DayOneSrv.LoadPartnerSpermiogramData(0,0);
    //    ResponseData.then(function (Response) {
    //        debugger;
    //        $scope.PartnerSpermiogramData = Response.data;
    //    }, function (error) {
    //        $scope.Error = error;
    //    });
        

    //}


    //Added sujata for cross clinc for donor spermigram start

    $scope.PartnerSpermRetrivalForDonor = function PartnerSpermRetrivalForDonor()
    {
        debugger;
        var ResponseData = DayOneSrv.fillDayWiseOocyteGrid($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID, 1);

        ResponseData.then(function (Response) {
                debugger;
                $scope.LinkPatientMaleList = Response.data[0].LinkPatientMaleList[0].SNo;//.SNo;//.replace(/(\r\n|\n|\r)/gm, "")//replace(/[\n]/g, '');//.replace(/\n/g, '<br>');
               // $scope.LinkPatientMaleList = ["Emil", "Tobias", "Linus"];
            }, function (error) {
                $scope.Error = error;
            });

        
    }

    //Added sujata for cross clinc for donor spermigram end


    //========================================================================================================================================================================
    //Fill Oocyte Grid
    $scope.GetOocyteForDayOne = function () {
      
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
       

        var ResponseData = EmbrologyMainSrv.fillDayWiseOocyteGrid($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID, 1);
        ResponseData.then(function (Response) {
            //Fill All Master
            var ResponseData = DayOneSrv.FillDayOneMaster($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
            ResponseData.then(function (MasterResponse) {
                $scope.MasterData = MasterResponse.data;
             
                console.log("master ",$scope.MasterData)
                $scope.OocyteGridData = Response.data;
                //Bind Selected Date 
                angular.forEach($scope.OocyteGridData, function (item) {
                    item.planMaster = angular.copy($scope.MasterData.Plan);
                    if (item.Finalize) {
                        item.rowdisable = true;
                        item.EmbryologistName = item.EmbryologistDesc;
                    }
                    else {
                        item.rowdisable = false;
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
                $scope.OocyteGrid = $filter('filter')($scope.OocyteGridData, function (d) { return d.Day0PlanID === 3 || d.Day0PlanID === 4 || d.Day0PlanID === 5 || d.Day0PlanID ===11 || d.Day0PlanID === 12 || d.Day0PlanID === 13; })
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
                else
                {
                    $scope.CommonFiled.Date = new Date();
                    $scope.CommonFiled.Time = new Date();
                }
                //DashBoard Count
                $scope.Fertilization = $filter('filter')($scope.OocyteGrid, function (d) { return d.FertilizationID !== 0 && d.FertilizationID !== null &&  d.FertilizationID !== 3 && d.Finalize === true;; }).length;
                $scope.NormalFertilization = $filter('filter')($scope.OocyteGrid, function (d) { return d.FertilizationID === 1 && d.Finalize === true;; }).length;
                $scope.AbNormalFertilization = $filter('filter')($scope.OocyteGrid, function (d) { return d.FertilizationID === 2 && d.Finalize === true;; }).length;
                $scope.Discarded = $filter('filter')($scope.OocyteGrid, function (d) { return d.PlanID === 1 && d.Finalize === true;; }).length;
                $scope.Cryo = $filter('filter')($scope.OocyteGrid, function (d) { return (d.PlanID === 2 || d.PlanID === 6) && d.Finalize === true;; }).length;
                $scope.Nucleoli = $filter('filter')($scope.OocyteGrid, function (d) { return d.NucleoliID !== 0 && d.Finalize === true;; }).length;
                $scope.Cleavage = $filter('filter')($scope.OocyteGrid, function (d) { return d.CleavageID !== 0 && d.Finalize === true;; }).length;
                //Get Only Oocytes to get ApplayTo Functionality
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
                    if (item.IsExtend == true && item.PlanID == 1) {
                        item.VioletColor = true;
                    }
                });
                //fill Oocytes In MultiCheck Box 
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
    //Show Previous Oocytes Of Day
    $scope.ShowOocytesWithVariousCritria = function (item) {
        if (item == 1) {
            //Discard
            if ($scope.discardedOocytes) {
                angular.forEach($filter('filter')($scope.OocyteGridData, function (d) { return d.Day0PlanID === 2; }), function (item) {
                    item.rowdisable = true;
                    $scope.OocyteGrid.push(item);
                }
                );
            }
            else {
                angular.forEach($filter('filter')($scope.OocyteGridData, function (d) { return d.Day0PlanID === 2; }), function (item) {
                    var index = $scope.OocyteGrid.indexOf(item);
                    $scope.OocyteGrid.splice(index, 1);
                }
                );
            }
        }
        else if (item == 2) {
            //Cryo
            if ($scope.CryoOocytes) {
                angular.forEach($filter('filter')($scope.OocyteGridData, function (d) { return d.Day0PlanID === 1; }), function (item) {
                    item.rowdisable = true;
                    $scope.OocyteGrid.push(item);
                }
                );
            }
            else {
                angular.forEach($filter('filter')($scope.OocyteGridData, function (d) { return d.Day0PlanID === 1; }), function (item) {
                    var index = $scope.OocyteGrid.indexOf(item);
                    $scope.OocyteGrid.splice(index, 1);
                }
                );
            }
        }
        else {
            //Donate
            if ($scope.DonateOocytes) {
                angular.forEach($filter('filter')($scope.OocyteGridData, function (d) { return d.Day0PlanID === 6; }), function (item) {
                    item.rowdisable = true;
                    $scope.OocyteGrid.push(item);
                }
                );
            }
            else {
                angular.forEach($filter('filter')($scope.OocyteGridData, function (d) { return d.Day0PlanID === 6; }), function (item) {
                    var index = $scope.OocyteGrid.indexOf(item);
                    $scope.OocyteGrid.splice(index, 1);
                }
                );
            }
        }
        //AS PER Discussion With DR Priyanka This is Not need Every Filtter
        //$scope.ShowPreviousDays = true;
    }
    
     //========================================================================================================================================================================
    $scope.ApplayToSelectValue = function (selectedOocyte,ApplayTo,index) {
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
        // by ashish
       $scope.SelectedOocytesToApplay = $filter('filter')($scope.OocyteGrid, function (d) { return d.OocyteNumber === selectedOocyte; });
        $scope.SelectedOocytesToApplay[0].IsFill = true;
        angular.forEach($filter('filter')($scope.OocyteGrid, function (d) { return d.OocyteNumber !== selectedOocyte; }), function (Oocytes1, index) {
            angular.forEach(ApplayTo, function (selectedocytes) {
                if (selectedocytes.ID == Oocytes1.OocyteNumber) {
                    //this are orignal Oocytes
                    $scope.OocyteNumber = Oocytes1.OocyteNumber;
                    $scope.SerialOocyteNumber = Oocytes1.SerialOocyteNumber;
                    $scope.DayOneID = Oocytes1.DayOneID;
                    //Copy Object respective object
                    angular.copy($scope.SelectedOocytesToApplay[0], Oocytes1);
                    Oocytes1.DummyOocyte = [];
                    Oocytes1.IsFill = false;
                    Oocytes1.ApplayTO = {};
                    Oocytes1.Img = {id: 0, model: Array(0)}; 
                    Oocytes1.OocyteNumber = $scope.OocyteNumber;
                    Oocytes1.SerialOocyteNumber = $scope.SerialOocyteNumber;
                    Oocytes1.DayOneID = $scope.DayOneID;
                    Oocytes1.DummyOocyte = angular.copy($filter('filter')($scope.NumberOFOocytes, function (d) { return d.ID !== selectedocytes.ID; })); //&& d.ID !== selectedOocyte
                }
            });
        });  // by ashish 
        /*//$scope.AllSelectedOocytes = [];
        //angular.forEach($filter('filter')(angular.copy($scope.OocyteGrid), function (d) { return d.IsFill === true; }), function (RootPart, index) {
        //    $scope.SelectedOocytes = {};
        //    $scope.SelectedOocytes.ID = RootPart.OocyteNumber;
        //    $scope.AllSelectedOocytes.push(angular.copy($scope.SelectedOocytes));
        //});
       // Validation Of selected Oocyte not Show on next row
        //angular.foreach(angular.copy($scope.selectedoocytestoapplay[0].applayto), function (notgetthisoocytes) {
        //    angular.foreach($filter('filter')($scope.oocytegrid, function (d) { return d.oocytenumber !== selectedoocyte; }), function (oocytes, index) {
        //        angular.foreach($filter('filter')(angular.copy(oocytes.dummyoocyte), function (d) { return d.id === notgetthisoocytes.id; }), function (item) {
        //            var getindex = angular.copy(oocytes.dummyoocyte.indexof(item));
        //            oocytes.dummyoocyte.splice(getindex, 1);
        //        });
        //    });
        //});*/
    }
    //========================================================================================================================================================================
    //$timeout(function () {
    //    $scope.ApplayToSelectAll = function (item) {
    //        $scope.test = [];
    //        $scope.test = $scope.aaa;
    //    }
    //}, 0);
    $scope.ApplayToSelectAll = function (item,index) {
        console.log(item, index);
        console.log($scope.OocyteGrid);
        for (var i = 0; i < $scope.OocyteGrid.length; i++) {
            if (index !== i) {
                if ($scope.OocyteGrid[i].Finalize == false) {
                    $scope.OocyteGrid[i].PolarBodyDay1ID = $scope.OocyteGrid[index].PolarBodyDay1ID;
                    $scope.OocyteGrid[i].PNID = $scope.OocyteGrid[index].PNID;
                    $scope.OocyteGrid[i].PNSizeID = $scope.OocyteGrid[index].PNSizeID;
                    $scope.OocyteGrid[i].NPBID = $scope.OocyteGrid[index].NPBID;
                    $scope.OocyteGrid[i].CytoplasmicHaloID = $scope.OocyteGrid[index].CytoplasmicHaloID;
                    $scope.OocyteGrid[i].NucleoliID = $scope.OocyteGrid[index].NucleoliID;
                    $scope.OocyteGrid[i].CleavageID = $scope.OocyteGrid[index].CleavageID;
                   
                    $scope.OocyteGrid[i].FertilizationID = $scope.OocyteGrid[index].FertilizationID;
                    $scope.OocyteGrid[i].GradeID = $scope.OocyteGrid[index].GradeID;
                    $scope.OocyteGrid[i].CellStageID = $scope.OocyteGrid[index].CellStageID;
                    $scope.OocyteGrid[i].PlanID = $scope.OocyteGrid[index].PlanID;
                    $scope.OocyteGrid[i].Remarks = $scope.OocyteGrid[index].Remarks;

                    $scope.OocyteGrid[i].Img.model = $scope.OocyteGrid[index].Img.model;
                    $scope.OocyteGrid[i].Finalize = $scope.OocyteGrid[index].Finalize;
                    // $scope.OocyteGrid[i].Remarks = $scope.OocyteGrid[index].Remarks;
                }

            }
        }
    }

    $scope.ApplayToDeSelectAll = function (index, ApplyTo) {

        console.log(index);
        console.log($scope.OocyteGrid);
        for (var i = 0; i < $scope.OocyteGrid.length; i++) {
            if (index !== i) {
                if ($scope.OocyteGrid[i].rowdisable == false) {
                    
                     $scope.OocyteGrid[i].PolarBodyDay1ID =0;
                    $scope.OocyteGrid[i].PNID = 0;
                    $scope.OocyteGrid[i].PNSizeID = 0;
                    $scope.OocyteGrid[i].NPBID = 0;
                    $scope.OocyteGrid[i].CytoplasmicHaloID = 0;
                    $scope.OocyteGrid[i].NucleoliID = 0;
                    $scope.OocyteGrid[i].CleavageID = 0;
                    $scope.OocyteGrid[i].FertilizationID=0;
                    $scope.OocyteGrid[i].GradeID = 0;
                    $scope.OocyteGrid[i].CellStageID = 0;
                    $scope.OocyteGrid[i].PlanID = 0;
                    $scope.OocyteGrid[i].Remarks = '';

                    $scope.OocyteGrid[i].Img.model =null;
                    $scope.OocyteGrid[i].Finalize =false;
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
    //                $scope.DayOneID = Oocytes1.DayOneID;
    //                //Copy Object respective object
    //                angular.copy($scope.SelectedOocytesToApplay[0], Oocytes1);
    //                Oocytes1.DummyOocyte = [];
    //                Oocytes1.IsFill = false;
    //                Oocytes1.ApplayTO = {};
    //                Oocytes1.Img = {};
    //                Oocytes1.OocyteNumber = $scope.OocyteNumber;
    //                Oocytes1.SerialOocyteNumber = $scope.SerialOocyteNumber;
    //                Oocytes1.DayOneID = $scope.DayOneID;
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
    ////========================================================================================================================================================================

    //$timeout(function () {
    //    $scope.ApplayToSelectAll = function (item) {
    //        $scope.test = [];
    //        $scope.test = $scope.aaa;
    //    }
    //}, 0);

    //========================================================================================================================================================================




    //Dismiss PopUp
    $scope.CancelDay = function () {
        $uibModalInstance.dismiss('cancel');
    }
    //========================================================================================================================================================================
    //Open ImgPopUp For Show Image Preview
    $scope.GetImg = {};
    $scope.PreviewImg = function (Imgcollection) {
        angular.element(myModal).modal('show');
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
        angular.element(myModal).modal('hide');
    }
    //Preview Img Cancel Click Process
    $scope.ImgPreviewCancel = function () {
        angular.element(myModal).modal('hide');
    }
    //Remove Images
    $scope.RemoveImg = function (index) {
        var index = $scope.GetImg.indexOf(index);
        $scope.GetImg.splice(index, 1);
    }
    //========================================================================================================================================================================
    $scope.ShowPatientPopupData = function ShowPatientPopupData(Item) {
       // console.log(Item)
        if (Item.IsFET == true) {
            Item.PlanName = '';
        }
        if (Item.ZeroTooltip != null) {
            debugger;
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
            $scope.html = '<div class="tbl_tooltip"><table><tr><td colspan="4"><b>' + Item.ZeroTooltip.CycleCode + '</b></td><td><b class="txtPlan">' + Item.PlanName + '</b></td></tr><tr><td><b>Date Time</b></td><td colspan="4">: ' + Item.ZeroTooltip.Date + '&nbsp;' + Item.ZeroTooltip.Time + '</td></tr><tr><td><b>OCD </b></td><td>: ' + Item.ZeroTooltip.OCD + '</td><td>&nbsp;</td><td><b>ECD </b></td><td>: ' + Item.ZeroTooltip.ECD + '</td></tr><tr><td><b>OCC </b></td><td>: ' + Item.ZeroTooltip.OCC + '</td><td>&nbsp;</td><td><b>ZP </b></td><td>: ' + Item.ZeroTooltip.ZP + '</td></tr><tr><td><b>PB </b></td><td>: ' + Item.ZeroTooltip.PB + '</td><td>&nbsp;</td><td><b>PVS </b></td><td>: ' + Item.ZeroTooltip.PVS + '</td></tr><tr><td><b>Cytoplasm </b></td><td>: ' + Item.ZeroTooltip.Cytoplasm + '</td><td>&nbsp;</td><td><b>Breakage </b></td><td>: ' + Item.ZeroTooltip.Breakage + '</td></tr><tr><td><b>Stage </b></td><td>: ' + Item.ZeroTooltip.MaturityDesc + '</td><td>&nbsp;</td><td><b>PB Location </b></td><td>: ' + Item.ZeroTooltip.PBLocationDesc + '</td></tr><tr><td><b>Location </b></td><td>: ' + Item.ZeroTooltip.LocationDesc + '</td><td>&nbsp;</td><td><b>IVM</b></td><td colspan="4"><input type="checkbox" ' + $scope.IVMFlag + '></td></tr><tr><td><b>Embryologist </b></td><td colspan="4">: ' + Item.ZeroTooltip.Embryologist + '</td></tr><tr><td><b>Witness </b></td><td colspan="4">: ' + Item.ZeroTooltip.Witness + '</td></tr></table></div>';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            $scope.htmlPopover1 = $sce.trustAsHtml($scope.html);
        }
        else {
            $scope.htmlPopover1 = $sce.trustAsHtml();
        }
    }
    //========================================================================================================================================================================
    $scope.DisableCryo = function (Data) {
        //Get The Page Visibility Config Data By Vikrant 
        $scope.configData = PageConfig.getObj();
        console.log('Data ', Data);
        debugger;
        if (Data.SameDay == true) {
            for (var i = Data.planMaster.length - 1; i >= 0; i--) {
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 1) { //Discard
                        Data.planMaster.splice(i, 1);
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 2) {//"Cryo"
                        Data.planMaster.splice(i, 1);
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 4) { //Transfer
                        if (!$scope.configData.Transfer) {
                            Data.planMaster.splice(i, 1);
                        }
                        else {
                            //if (!Data.DonateFromBank) {
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
                    if (Data.planMaster[i].ID == 5) { //Donate
                        if (!$scope.configData.Donate) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 6) { //"Cryo Donate"
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
                    if (Data.planMaster[i].ID == 1) {//Discard
                        if (!$scope.configData.Discard) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 2) {//"Cryo"
                        if (!$scope.configData.Cryo) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
                if (Data.planMaster[i] != undefined) {
                    if (Data.planMaster[i].ID == 4) { //Transfer
                        if (!$scope.configData.Transfer) {
                            Data.planMaster.splice(i, 1);
                        }
                        else {
                            //if (!Data.DonateFromBank) {
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
                    if (Data.planMaster[i].ID == 6) { //Cryo Donate
                        if (!$scope.configData.DonateCryo) {
                            Data.planMaster.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
    //========================================================================================================================================================================
    $scope.SelectPlan = function (item) {
        if (item.FertilizationID == 3) {
            item.PlanID = 1;
        }
        //else
        //{
        //    item.PlanID = 0;
        //}
    }
    $scope.ValidationMsg = function (Msg) {
        AlertMessage.error("PalashIVF", Msg);
    }

});
/* https://github.com/wender/angular-multiple-file-upload */
PIVF.directive('fileUpload1', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        template: '<div ng-transclude></div>',
        replace: true,
        transclude: true,
        scope: {
            headers: '=',
            ngModel: '=',
            disabled: '=',
            someCtrlFn: '&callbackFn'
        },
        require: 'ngModel',
        link: function (scope, el, attr) {
            var fileName,
                shareCredentials,
                withPreview,
                fileSelector,
                resize,
                maxWidth = 100,
                maxHeight = 100,
                sel;

            fileName = attr.name || 'userFile';
            shareCredentials = attr.credentials === 'true';
            withPreview = attr.preview === 'true';
            resize = attr.resize === 'true';
            maxWidth = angular.isDefined(attr.maxWidth) ? parseInt(attr.maxWidth) : false;
            maxHeight = angular.isDefined(attr.maxHeight) ? parseInt(attr.maxHeight) : false;
            fileSelector = angular.isDefined(attr.fileSelector) ? attr.fileSelector : false;

            el.append('<input style="display: none !important;" type="file" ' + (attr.multiple == 'true' ? 'multiple' : '') + ' accept="' + (attr.accept ? attr.accept : '') + '" name="' + fileName + '"/>');

            function Resize(file, index, type) {
                var canvas = document.createElement("canvas");
                var img = document.createElement("img");
                var reader = new FileReader();
                reader.onload = function (e) {
                    img.src = e.target.result;
                    draw();
                };
                reader.readAsDataURL(file);

                function b64toBlob(b64Data, contentType, sliceSize) {
                    contentType = contentType || '';
                    sliceSize = sliceSize || 512;

                    var byteCharacters = atob(b64Data);
                    var byteArrays = [];

                    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                        var slice = byteCharacters.slice(offset, offset + sliceSize);

                        var byteNumbers = new Array(slice.length);
                        for (var i = 0; i < slice.length; i++) {
                            byteNumbers[i] = slice.charCodeAt(i);
                        }

                        var byteArray = new Uint8Array(byteNumbers);

                        byteArrays.push(byteArray);
                    }

                    var blob = new Blob(byteArrays, { type: contentType });
                    return blob;
                }

                function draw() {
                    var width = img.width;
                    var height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    if (width > 0 && height > 0) {
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                        var b64 = canvas.toDataURL(type).split(',')[1];
                        file = b64toBlob(b64, type, 512);
                    }

                    uploadFile(file, index);
                }
            }

            function upload(fileProperties, index, file) {
                if (resize && maxWidth && maxHeight && (file.type.indexOf('image/') !== -1)) {
                    Resize(file, index, file.type);
                } else {
                    uploadFile(file, index);
                }
                return angular.extend(scope.ngModel[index], {
                    name: fileProperties.name,
                    size: fileProperties.size,
                    type: fileProperties.type,
                    status: {},
                    percent: 0,
                    preview: null
                });
            }

            function uploadFile(file, index) {
                //var xhr = new XMLHttpRequest(),
                //    fd = new FormData(),
                //    progress = 0,
                //    uri = attr.uri || '/upload/upload';
                //xhr.open('POST', uri, true);
                //xhr.withCredentials = shareCredentials;
                //if (scope.headers) {
                //    scope.headers.forEach(function (item) {
                //        xhr.setRequestHeader(item.header, item.value);
                //    });
                //}
                //xhr.onreadystatechange = function () {
                //    scope.ngModel[index].status = {
                //        code: xhr.status,
                //        statusText: xhr.statusText,
                //        response: xhr.response
                //    };
                //    scope.$apply();
                //};
                //xhr.upload.addEventListener("progress", function (e) {
                //    progress = parseInt(e.loaded / e.total * 100);
                //    scope.ngModel[index].percent = progress;
                //    scope.$apply();
                //}, false);

                //fd.append(fileName, file);
                //xhr.send(fd);

                if (!withPreview) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        scope.ngModel[index].preview = e.target.result;
                        scope.$apply();
                    };
                    reader.readAsDataURL(file);
                }
            }

            $timeout(function () {
                sel = fileSelector ? angular.element(el[0].querySelectorAll(fileSelector)[0]) : el;
                sel.bind('click', function () {
                    if (!scope.disabled) {
                        scope.$eval(el.find('input')[0].click());
                    }
                });
            });

            angular.element(el.find('input')[0]).bind('change', function (e) {
                var files = e.target.files;

                if (!angular.isDefined(scope.ngModel) || attr.multiple === 'true') {
                    if (scope.ngModel.length == 0) {
                        scope.ngModel = [];
                    }
                }
                var f;
                debugger;
                if (scope.ngModel.length <= 4) {
                    for (var i = 0; i < files.length && i <= 4; i++) {
                        if (files[i].size <= 1000000) {
                            f = {
                                name: files[i].name,
                                size: files[i].size,
                                type: files[i].type,
                                status: {},
                                percent: 0,
                                preview: null
                            };

                            scope.ngModel.push(f);
                            upload(f, scope.ngModel.length - 1, files[i]);
                        }
                    }
                }
                else {
                    scope.someCtrlFn({ arg1: "You have exceed Limit" });
                }

                scope.$apply();
            })
        }
    }
}]);
