'use strict';
angular.module('PIVF').controller('EmbrologyMainCtrl', function ($scope, $sce, EmbrologyMainSrv, $location, AlertMessage, Common, srvCommon, swalMessages, $filter, $rootScope, $uibModal, PageConfig, EmbryoVitrificationSrv, usSpinnerService,$http,API) {

    //Declaration part
    $scope.DonarNotFinalizeAllOocytes = true;
    $rootScope.FormName = "Embryology";
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $rootScope.ForMedia = 1;
    $rootScope.OrderList = 0;
    $rootScope.ForConsent = 0;
    $scope.OcyteRetriveBtn = false;
    $scope.CoupleDetails = {};
    $scope.OPUData = {};
    usSpinnerService.spin('GridSpinner');
    $scope.NumberOfOocyteArry = {};
    $scope.OocyteGrid = {};
    var objResource = {};
    $scope.ValidationFlag = false;
    $scope.ErrMsg = "";
    //Dashboard Count
    $scope.IVM = 0;
    $scope.Fertilization = 0;
    $scope.Cleavage = 0;
    $scope.Discarded = 0;
    $scope.GV = 0;
    $scope.M1 = 0;
    $scope.M2 = 0;
    $scope.CryoOocytes = 0;
    $scope.CryoEmbro = 0;
    $scope.Transfer = 0;
    $scope.OocyteDonate = 0;
    $scope.EmbroDonate = 0;
    $scope.OocyteCryoDonate = 0;
    $scope.EmbroCryoDonate = 0;
    $scope.biopsy = {};
    $scope.biopsyresult = {};
    $scope.PGD = 0;
    $scope.PGS = 0;
     $scope.PGT=0;
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };
    $scope.popup3 = {
        opened: false
    };
    $scope.open4 = function () {
        $scope.popup4.opened = true;
    };
    $scope.popup4 = {
        opened: false
    };
    $scope.open5 = function () {
        $scope.popup5.opened = true;
    };
    $scope.popup5 = {
        opened: false
    };
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    //========================================================================================================================================================================
    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }
    //========================================================================================================================================================================
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    //========================================================== Embryology changes in Embryo culture page by Tejas Saxena starts

    $scope.showPopup = false;
    $scope.activeTab = 'schedule';
    $scope.AllDays = false;
    $scope.ShowPreviousDay = false;
    $scope.ShowallOocytesEmbro = false;
    //$scope.openPopup = function () {
    //    debugger
    //    var modalInstance = $uibModal.open({
    //        templateUrl: 'showBiopsyPopup',
    //        controller: 'biospypopupctrl',
    //        backdrop: false,
    //        keyboard: false,
    //        size: 'custom-xl-modal'
    //    });
    //};


    $scope.PageSetuppgt = function () {
        $scope.GetDayWiseInfoForBiopsy();

        // Ensure GetPGTUserAuthInfoAccessToken completes before proceeding
        $scope.GetPGTUserAuthInfoAccessToken().then(function () {
            $scope.GetEmbryologists();
            $scope.GetIncubatorsList();
            $scope.initBiopsy();
            usSpinnerService.stop('GridSpinner');
        });
    };

    $scope.GetEmbryologyDoctorsList = function () {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //   
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data.EmbryologistAndrologist;
            if ($scope.biopsy.Witness == undefined)
            {
                $scope.biopsy.Witness = 0;
                $scope.biopsy.Embryologist = 0;
            }
                
        }, function (error) {
        });
    };
    $scope.GetIncubatorsList = function () {
        var ResponseData = Common.getMasterList('M_IVF_Incubator', 'IVFIncubatorID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IncubatorList = Response.data;
            if ($scope.biopsy.Incubator == undefined)
                $scope.biopsy.Incubator = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }
    //========================================================== Embryology changes in Embryo culture page by Tejas Saxena end


    //========================================================================================================================================================================
    $scope.PageSetup = function () {
        debugger;
        //Get The Couple Details
        $scope.CoupleDetails = $rootScope.CoupleDetails;
        //console.log("AA", $scope.CoupleDetails);
        if ($scope.CoupleDetails.FemalePatient != undefined && $scope.CoupleDetails.FemalePatient != null) {
            if ($scope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                $scope.OcyteRetriveBtn = true;
            }
            if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
                $scope.OcyteRetriveBtn = true;
            }
        }
        if ($scope.CoupleDetails.FemalePatient.TherapyID != 0 && $scope.CoupleDetails.FemalePatient.TherapyUnitID != 0) {
            //check Is Donar cycle
            if ($scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8) {
                ////Check Donar All Oocytes/Embro Finalize

                var Response = EmbryoVitrificationSrv.GetFlagISAllEmbryoFreeze($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID, 1);
                Response.then(function (Response) {
                    //if (Response.data == 1) {
                    //Load Embrology Main Grid
                    $scope.fillDayOocyteGrid();
                    //}
                    //else {
                    //    $scope.DonarNotFinalizeAllOocytes = false;
                    //    AlertMessage.error(objResource.msgTitle, "Donar Is Not Finalize All Oocyte/Embryo");
                    //    usSpinnerService.stop('GridSpinner');
                    //}
                }, function (error) {
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    usSpinnerService.stop('GridSpinner');
                });
            }
                //FET Cycle
            else if ($scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
                //Load Embrology Main Grid
                $scope.fillDayOocyteGrid();
            }
            else {
                //Get OPU Details
                var ResponseData = EmbrologyMainSrv.GetOPUData($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
                ResponseData.then(function (Response) {
                    $scope.OPUData = Response.data;
                    if ($scope.OPUData != null) {
                        if ($scope.OPUData.IsFinalize) {
                            //Get No Of Oocytes Retrived in DashBoard
                            //$scope.NumberOfOocyteArry.FolliclesAspirated = $scope.OPUData.FolliclesAspirated;
                            $scope.NumberOfOocyteArry.OocytesRetrieved = $scope.OPUData.OocytesRetrieved;
                            $scope.NumberOfOocyteArry.OocytesFinalizeStatus = $scope.OPUData.IsFinalizeOocytes

                            if ($scope.OPUData.IsFinalizeOocytes) {
                                $scope.OcyteRetriveBtn = true;
                                $scope.ValidationFlag = true;
                            }
                            else {
                                usSpinnerService.stop('GridSpinner');
                                $scope.ValidationFlag = false;
                                $scope.ErrMsg = "Please Finalize Oocytes First";
                            }
                        }
                        else {
                            usSpinnerService.stop('GridSpinner');
                            $scope.OcyteRetriveBtn = true;
                            $scope.ValidationFlag = false;
                            $scope.ErrMsg = "Please Finalize OPU";
                            AlertMessage.error(objResource.msgTitle, "Please Finalize OPU");
                        }
                        //Load Embrology Main Grid
                        $scope.fillDayOocyteGrid();
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        $scope.OcyteRetriveBtn = true;
                        $scope.ValidationFlag = false;
                        $scope.ErrMsg = "Please Fill the OPU First";
                        AlertMessage.error(objResource.msgTitle, "Please Fill the OPU First");
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    $location.path("/Home/");
                });
            }
        }
        else {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
            $location.path("/Home/");
        }
    }
    //========================================================================================================================================================================
    $scope.SaveUpdateOcyte = function () {
        debugger;
        //Check Validation
        if ((angular.isUndefined($scope.NumberOfOocyteArry.OocytesRetrieved)) || ($scope.NumberOfOocyteArry.OocytesRetrieved == "")) {  //angular.isUndefined($scope.NumberOfOocyteArry.FolliclesAspirated) || $scope.NumberOfOocyteArry.FolliclesAspirated == "" ||
            AlertMessage.error(objResource.msgTitle, "Please Enter OocytesRetrieved value");  //FolliclesAspirated
        }
        else {
            //If Couple Detils check have data present or not 
            if (angular.isUndefined($scope.CoupleDetails) && angular.equals({}, $scope.CoupleDetails)) {
                scope.CoupleDetails = $rootScope.CoupleDetails;
            }
            debugger;
            //If Couple details does not have data 
            if ($scope.CoupleDetails.FemalePatient.TherapyID != 0 && $scope.CoupleDetails.FemalePatient.TherapyUnitID != 0) {
                if (angular.isUndefined($scope.NumberOfOocyteArry.OocytesFinalizeStatus)) {
                    $scope.NumberOfOocyteArry.OocytesFinalizeStatus = false;
                }
                //if ($scope.NumberOfOocyteArry.FolliclesAspirated == null)
                //{
                //    $scope.NumberOfOocyteArry.FolliclesAspirated = 0;
                //}
                if ($scope.NumberOfOocyteArry.OocytesRetrieved == null) {
                    $scope.NumberOfOocyteArry.OocytesRetrieved = 0;
                }
                var Donor = 0;
                if ($scope.CoupleDetails.FemalePatient.PatientCategoryID != 7) {
                    Donor = 1
                }
                //Update OPU AND Save Oocytes details
                var ResponseData = EmbrologyMainSrv.SaveUpdateOcyte($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID, $scope.NumberOfOocyteArry.FolliclesAspirated, $scope.NumberOfOocyteArry.OocytesRetrieved, $scope.NumberOfOocyteArry.OocytesFinalizeStatus, Donor);
                ResponseData.then(function (Response) {
                    //Disable Save Btn
                    if ($scope.NumberOfOocyteArry.OocytesFinalizeStatus) {
                        $scope.OcyteRetriveBtn = true;
                        $scope.ValidationFlag = true;
                    }
                    AlertMessage.success("PalashIVF", "Record Saved successfully!");
                    //Load Embrology Main Grid
                    $scope.fillDayOocyteGrid();
                }, function (error) {
                    debugger;
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
            }
            else {
                debugger;
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
                $location.path("/home/");
            }
        }
    }
    //========================================================================================================================================================================
    //Fill Main 6 Days Grid
    $scope.fillDayOocyteGrid = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = EmbrologyMainSrv.fillDayOocyteGrid($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.OocyteGrid = Response.data;
            //DashBoard Count
            //  $scope.Fertilization = $filter('filter')($scope.OocyteGrid, function (d) { return d.Day1Fertilization !== 0 && d.Day1Fertilization !== null && d.Day1Finalize === true;; }).length;
            $scope.Fertilization = $filter('filter')($scope.OocyteGrid, function (d) { return d.Day1Fertilization !== 0 && d.Day1Fertilization !== null && d.Day1Fertilization !== 3 && d.Day1Finalize === true;; }).length;
            $scope.IVM = $filter('filter')($scope.OocyteGrid, function (d) { return d.IVM === true && d.LabDay0Freezed === true;; }).length;
            $scope.Cleavage = $filter('filter')($scope.OocyteGrid, function (d) { return d.Day1Finalize === true && d.Day1Plan == null; }).length;  //d.Cleavage !== 0 &&
            $scope.Discarded = ($filter('filter')($scope.OocyteGrid, function (d) { return d.Day0PlanID === 2 && d.LabDay0Freezed === true; }).length + $filter('filter')($scope.OocyteGrid, function (d) { return d.Day1PlanID === 1 && d.Day1Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day2PlanID === 1 && d.Day2Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day3PlanID === 1 && d.Day3Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day4PlanID === 1 && d.Day4Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day5PlanID === 1 && d.Day5Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day6PlanID === 1 && d.Day6Finalize === true;; }).length
                );
            $scope.GV = $filter('filter')($scope.OocyteGrid, function (d) { return d.Maturity === 1 && d.Day0Plan == 'ICSI' && d.LabDay0Freezed === true;; }).length;
            $scope.M1 = $filter('filter')($scope.OocyteGrid, function (d) { return d.Maturity === 2 && d.Day0Plan == 'ICSI' && d.LabDay0Freezed === true;; }).length;
            $scope.M2 = $filter('filter')($scope.OocyteGrid, function (d) { return d.Maturity === 3 && d.Day0Plan == 'ICSI' && d.LabDay0Freezed === true;; }).length;
            $scope.CryoOocytes = $filter('filter')($scope.OocyteGrid, function (d) { return d.Day0PlanID === 1 && d.LabDay0Freezed === true; }).length
            $scope.CryoEmbro = ($filter('filter')($scope.OocyteGrid, function (d) { return d.Day1PlanID === 2 && d.Day1Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day2PlanID === 2 && d.Day2Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day3PlanID === 2 && d.Day3Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day4PlanID === 2 && d.Day4Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day5PlanID === 2 && d.Day5Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day6PlanID === 2 && d.Day6Finalize === true;; }).length
                );
            $scope.Transfer = ($filter('filter')($scope.OocyteGrid, function (d) { return d.Day1PlanID === 4 && d.Day1Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day2PlanID === 4 && d.Day2Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day3PlanID === 4 && d.Day3Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day4PlanID === 4 && d.Day4Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day5PlanID === 4 && d.Day5Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day6PlanID === 4 && d.Day6Finalize === true;; }).length
                );
            $scope.OocyteDonate = $filter('filter')($scope.OocyteGrid, function (d) { return d.Day0PlanID === 6 && d.LabDay0Freezed === true; }).length;
            $scope.EmbroDonate = ($filter('filter')($scope.OocyteGrid, function (d) { return d.Day1PlanID === 5 && d.Day1Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day2PlanID === 5 && d.Day2Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day3PlanID === 5 && d.Day3Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day4PlanID === 5 && d.Day4Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day5PlanID === 5 && d.Day5Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day6PlanID === 5 && d.Day6Finalize === true;; }).length
                );
            $scope.OocyteCryoDonate = $filter('filter')($scope.OocyteGrid, function (d) { return d.Day0PlanID === 7 && d.LabDay0Freezed === true; }).length;
            $scope.EmbroCryoDonate = ($filter('filter')($scope.OocyteGrid, function (d) { return d.Day1PlanID === 6 && d.Day1Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day2PlanID === 6 && d.Day2Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day3PlanID === 6 && d.Day3Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day4PlanID === 6 && d.Day4Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day5PlanID === 6 && d.Day5Finalize === true;; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day6PlanID === 6 && d.Day6Finalize === true;; }).length
                );
            $scope.PGT = ($filter('filter')($scope.OocyteGrid, function (d) { return d.Day3Pgt === true;; }).length +
              $filter('filter')($scope.OocyteGrid, function (d) { return  d.Day4Pgt === true;; }).length +
              $filter('filter')($scope.OocyteGrid, function (d) { return  d.Day5Pgt === true;; }).length +
                 $filter('filter')($scope.OocyteGrid, function (d) { return  d.Day6Pgt === true;; }).length +
              $filter('filter')($scope.OocyteGrid, function (d) { return  d.Day7Pgt === true;; }).length
              );
            $scope.PGD = ($filter('filter')($scope.OocyteGrid, function (d) { return d.Day5PGS === 0 && d.Day5PGDPGSDate !== null && d.Day5PGDPGSTime !== null && d.Day5PGDPGSMethodID !== 0 && d.Day5Finalize === true; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day6PGS === 0 && d.Day6PGDPGSDate !== null && d.Day6PGDPGSTime !== null && d.Day6PGDPGSMethodID !== 0 && d.Day6Finalize === true; }).length
            + $filter('filter')($scope.OocyteGrid, function (d) { return d.Day3PGS === 0 && d.Day3PGDPGSDate !== null && d.Day3PGDPGSTime !== null && d.Day3PGDPGSMethodID !== 0 && d.Day3Finalize === true; }).length);

            $scope.PGS = ($filter('filter')($scope.OocyteGrid, function (d) { return d.Day5PGS === 1 && d.Day5PGDPGSDate !== null && d.Day5PGDPGSTime !== null && d.Day5PGDPGSMethodID !== 0 && d.Day5Finalize === true; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day6PGS === 1 && d.Day6PGDPGSDate !== null && d.Day6PGDPGSTime !== null && d.Day6PGDPGSMethodID !== 0 && d.Day6Finalize === true; }).length +
                $filter('filter')($scope.OocyteGrid, function (d) { return d.Day3PGS === 1 && d.Day3PGDPGSDate !== null && d.Day3PGDPGSTime !== null && d.Day3PGDPGSMethodID !== 0 && d.Day3Finalize === true; }).length);

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }
    //========================================================================================================================================================================
    //Zero Days Processing Functionality
    $scope.ZeroDay = function () {
        if ($scope.ValidationFlag || $scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
            //Pass The All detils To Day0Ctrl
            $scope.PassInfoToDayZero = {};
            $scope.PassInfoToDayZero.CoupleDetails = $scope.CoupleDetails;
            $scope.PassInfoToDayZero.OocyteGrid = $scope.OocyteGrid;
            $scope.PassInfoToDayZero.OPUStartDate = $scope.OPUData.StartDate;
            var modalInstance = $uibModal.open({ // for open pop up for Day 0
                templateUrl: 'day0',
                controller: 'day0Ctrl',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    RootPGInfo: function () {
                        return $scope.PassInfoToDayZero;
                    }
                }
            });
            modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model

                if (!angular.equals({}, data)) {
                    //Check sucess stauts
                    if (data == 1) {
                        $scope.fillDayOocyteGrid();
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }
                }
            });
        }
        else {
            AlertMessage.error(objResource.msgTitle, $scope.ErrMsg);
        }
    }
    //========================================================================================================================================================================
    //First Days Processing Functionality
    $scope.DayOne = function () {
        if ($scope.ValidationFlag || $scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
            $scope.PassInfoToDayZero = {};
            $scope.PassInfoToDayZero.CoupleDetails = $scope.CoupleDetails;
            $scope.PassInfoToDayZero.OPUStartDate = $scope.OPUData.StartDate;
            var modalInstance = $uibModal.open({ // for open pop up for Day 0
                templateUrl: 'day1',
                controller: 'day1Ctrl',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    RootPGInfo: function () {
                        return $scope.PassInfoToDayZero;
                    }
                }
            });
            modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
                if (!angular.equals({}, data)) {
                    //Check sucess stauts
                    if (data == 1) {
                        $scope.fillDayOocyteGrid();
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }
                }
            });
        }
        else {
            AlertMessage.error(objResource.msgTitle, $scope.ErrMsg);
        }
    }
    //========================================================================================================================================================================
    //second Days Processing Functionality
    $scope.DayTWO = function () {
        if ($scope.ValidationFlag || $scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
            $scope.PassInfoToDaySecond = {};
            $scope.PassInfoToDaySecond.CoupleDetails = $scope.CoupleDetails;
            $scope.PassInfoToDaySecond.OPUStartDate = $scope.OPUData.StartDate;
            var modalInstance = $uibModal.open({ // for open pop up for Day 0
                templateUrl: 'day2',
                controller: 'day2Ctrl',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    RootPGInfo: function () {
                        return $scope.PassInfoToDaySecond;
                    }
                }
            });
            modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
                if (!angular.equals({}, data)) {
                    //Check sucess stauts
                    if (data == 1) {
                        $scope.fillDayOocyteGrid();
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }
                }
            });
        }
        else {
            AlertMessage.error(objResource.msgTitle, $scope.ErrMsg);
        }
    }
    //========================================================================================================================================================================
    //Third Days Processing Functionality
    $scope.DayThree = function () {
        if ($scope.ValidationFlag || $scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
            $scope.PassInfoToDaySecond = {};
            $scope.PassInfoToDaySecond.CoupleDetails = $scope.CoupleDetails;
            $scope.PassInfoToDaySecond.OPUStartDate = $scope.OPUData.StartDate;
            var modalInstance = $uibModal.open({ // for open pop up for Day 0
                templateUrl: 'day3',
                controller: 'day3Ctrl',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    RootPGInfo: function () {
                        return $scope.PassInfoToDaySecond;
                    }
                }
            });
            modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
                if (!angular.equals({}, data)) {
                    //Check sucess stauts
                    if (data == 1) {
                        $scope.fillDayOocyteGrid();
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }
                }
            });
        }
        else {
            AlertMessage.error(objResource.msgTitle, $scope.ErrMsg);
        }
    }
    //========================================================================================================================================================================
    //Four Day Process
    $scope.DayFour = function () {
        if ($scope.ValidationFlag || $scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
            $scope.PassInfoToDaySecond = {};
            $scope.PassInfoToDaySecond.CoupleDetails = $scope.CoupleDetails;
            $scope.PassInfoToDaySecond.OPUStartDate = $scope.OPUData.StartDate;
            var modalInstance = $uibModal.open({ // for open pop up for Day 0
                templateUrl: 'day4',
                controller: 'day4Ctrl',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    RootPGInfo: function () {
                        return $scope.PassInfoToDaySecond;
                    }
                }
            });
            modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
                if (!angular.equals({}, data)) {
                    //Check sucess stauts
                    if (data == 1) {
                        $scope.fillDayOocyteGrid();
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }
                }
            });
        }
        else {
            AlertMessage.error(objResource.msgTitle, $scope.ErrMsg);
        }
    }
    //========================================================================================================================================================================
    //Day Five Process
    $scope.DayFive = function () {
        if ($scope.ValidationFlag || $scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
            $scope.PassInfoToDaySecond = {};
            $scope.PassInfoToDaySecond.CoupleDetails = $scope.CoupleDetails;
            $scope.PassInfoToDaySecond.OPUStartDate = $scope.OPUData.StartDate;
            var modalInstance = $uibModal.open({ // for open pop up for Day 0
                templateUrl: 'day5',
                controller: 'day5Ctrl',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    RootPGInfo: function () {
                        return $scope.PassInfoToDaySecond;
                    }
                }
            });
            modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
                if (!angular.equals({}, data)) {
                    //Check sucess stauts
                    if (data == 1) {
                        $scope.fillDayOocyteGrid();
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }
                }
            });
        }
        else {
            AlertMessage.error(objResource.msgTitle, $scope.ErrMsg);
        }
    }

    $scope.GetPGTUserAuthInfoAccessToken = function () {
        debugger;

        // Retrieve UserInfo from localStorage
        var userInfo = localStorage.getItem("ls.UserInfo");

        if (userInfo) {
            debugger;
            var parsedUserInfo = JSON.parse(userInfo); // Convert string to object
            var UserID = parsedUserInfo.UserID; // Extract UserID

            if (UserID) {
                debugger;

                // If the stored UserID matches the current UserID, no need to create a new entry
                var progenesisData = localStorage.getItem("Progenesis");
                var storedAuthInfo = progenesisData ? JSON.parse(progenesisData) : null;

                console.log("Updating Progenesis data...");

                // Call the API to get a new AccessToken and return the promise
                return EmbrologyMainSrv.GetPGTUserAuthInfoAccessToken(UserID).then(function (response) {
                    debugger;
                    if (response && response.data && response.data.ResultStatus == 0) {
                        // Prepare the PGTUserAuth object
                        var pgtUserAuth = {
                            AccessToken: response.data.AccessToken || "",
                            UserID: UserID,
                            AuthorizationCode: response.data.AuthorizationCode || "",
                            AddedBy: response.data.AddedBy || 0,
                            AddedOn: response.data.AddedOn || "",
                            AddedDateTime: response.data.AddedDateTime ? new Date(response.data.AddedDateTime) : new Date(),
                            ExpiryDate: response.data.ExpiryDate ? new Date(response.data.ExpiryDate) : new Date(),
                            ResultStatus: response.data.ResultStatus || 0,
                            AuthUrl: response.data.AuthUrl || ""
                        };

                        // Store/update the "Progenesis" object in localStorage
                        localStorage.setItem("Progenesis", JSON.stringify(pgtUserAuth));
                        console.log("Progenesis data updated successfully:", pgtUserAuth);
                    } else {
                        return $scope.GetPGTUserAuthInfo();
                    }
                });
            } else {
                console.error("UserID not found in UserInfo.");
                return Promise.reject("UserID not found in UserInfo.");
            }
        } else {
            console.error("UserInfo not found in localStorage.");
            return Promise.reject("UserInfo not found in localStorage.");
        }
    };

    $scope.GetEmbryologists = function () {
        debugger;

        var progenesisData = localStorage.getItem("Progenesis");
        var storedAuthInfo = progenesisData ? JSON.parse(progenesisData) : null;
        var currentDate = new Date(); // Current Date Object

        // Function to fetch new AccessToken if needed
        function fetchAccessToken(callback) {
            var userInfo = localStorage.getItem("ls.UserInfo");

            if (userInfo) {
                var parsedUserInfo = JSON.parse(userInfo);
                var UserID = parsedUserInfo.UserID;

                if (UserID) {
                    console.log("Fetching new AccessToken...");
                    EmbrologyMainSrv.GetPGTUserAuthInfoAccessToken(UserID).then(function (response) {
                        if (response && response.data) {
                            var pgtUserAuth = {
                                AccessToken: response.data.AccessToken || "",
                                UserID: UserID,
                                ExpiryDate: response.data.ExpiryDate ? new Date(response.data.ExpiryDate) : new Date(),
                            };

                            localStorage.setItem("Progenesis", JSON.stringify(pgtUserAuth));
                            console.log("Progenesis data updated:", pgtUserAuth);

                            callback(pgtUserAuth.AccessToken);
                        }
                    }).catch(function (error) {
                        console.error("Error fetching AccessToken:", error);
                    });
                } else {
                    console.error("UserID not found in UserInfo.");
                }
            } else {
                console.error("UserInfo not found in localStorage.");
            }
        }

        // Validate AccessToken & Expiry
        if (storedAuthInfo && storedAuthInfo.AccessToken && new Date(storedAuthInfo.ExpiryDate) >= currentDate) {
            console.log("Valid AccessToken found, proceeding with API call...");
            callEmbryologistsAPI(storedAuthInfo.AccessToken);
        } else {
            console.log("AccessToken missing or expired, fetching new one...");
            fetchAccessToken(callEmbryologistsAPI);
        }

        function callEmbryologistsAPI(accessToken) {
            debugger;

            if (!accessToken) {
                console.error("AccessToken is missing, cannot call API.");
                return;
            }

            // Call the backend API via GetPGTEmbryologist
            EmbrologyMainSrv.GetPGTEmbryolgist(accessToken).then(function (response) {
                debugger;
                let responseData;

                try {
                    // Parse response.data if it’s a string
                    responseData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
                } catch (error) {
                    console.error("Error parsing response data:", error);
                    return;
                }

                if (responseData && responseData.data) {
                    console.log("Embryologists API Response:", responseData);

                    let rawData = responseData.data;

                    if (Array.isArray(rawData) && rawData.length > 0) {
                        let rawObj = rawData[0]; // Extract first object from array

                        let formattedData = Object.keys(rawObj).map(key => ({
                            ID: key, // Store Key as ID
                            Description: rawObj[key] // Store Value as Description
                        }));

                        $scope.DocList = formattedData;
                    } else {
                        console.error("Invalid data format received:", rawData);
                        $scope.DocList = []; // Ensure it's an array
                    }
                }
            }).catch(function (error) {
                console.error("Error fetching Embryologists:", error);
            });
        }
    };

    $scope.GetClinicUsers = function () {
        debugger;

        var progenesisData = localStorage.getItem("Progenesis");
        var storedAuthInfo = progenesisData ? JSON.parse(progenesisData) : null;
        var currentDate = new Date(); // Current Date Object

        // Function to fetch new AccessToken if needed
        function fetchAccessToken(callback) {
            var userInfo = localStorage.getItem("ls.UserInfo");

            if (userInfo) {
                var parsedUserInfo = JSON.parse(userInfo);
                var UserID = parsedUserInfo.UserID;

                if (UserID) {
                    console.log("Fetching new AccessToken...");
                    EmbrologyMainSrv.GetPGTUserAuthInfoAccessToken(UserID).then(function (response) {
                        if (response && response.data) {
                            var pgtUserAuth = {
                                AccessToken: response.data.AccessToken || "",
                                UserID: UserID,
                                ExpiryDate: response.data.ExpiryDate ? new Date(response.data.ExpiryDate) : new Date(),
                            };

                            localStorage.setItem("Progenesis", JSON.stringify(pgtUserAuth));
                            console.log("Progenesis data updated:", pgtUserAuth);

                            callback(pgtUserAuth.AccessToken);
                        }
                    }).catch(function (error) {
                        console.error("Error fetching AccessToken:", error);
                    });
                } else {
                    console.error("UserID not found in UserInfo.");
                }
            } else {
                console.error("UserInfo not found in localStorage.");
            }
        }

        // Validate AccessToken & Expiry
        if (storedAuthInfo && storedAuthInfo.AccessToken && new Date(storedAuthInfo.ExpiryDate) >= currentDate) {
            console.log("Valid AccessToken found, proceeding with API call...");
            callEmbryologistsAPI(storedAuthInfo.AccessToken);
        } else {
            console.log("AccessToken missing or expired, fetching new one...");
            fetchAccessToken(callEmbryologistsAPI);
        }

        function callEmbryologistsAPI(accessToken) {
            debugger;

            if (!accessToken) {
                console.error("AccessToken is missing, cannot call API.");
                return;
            }

            // Call the backend API via GetPGTEmbryologist
            EmbrologyMainSrv.GetPGTClinicusers(accessToken).then(function (response) {
                debugger;
                let responseData;

                try {
                    // Parse response.data if it’s a string
                    responseData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
                } catch (error) {
                    console.error("Error parsing response data:", error);
                    return;
                }

                if (responseData && responseData.data) {
                    console.log("Embryologists API Response:", responseData);

                    let rawData = responseData.data;

                    if (Array.isArray(rawData) && rawData.length > 0) {
                        let rawObj = rawData[0]; // Extract first object from array

                        let formattedData = Object.keys(rawObj).map(key => ({
                            ID: key, // Store Key as ID
                            Description: rawObj[key] // Store Value as Description
                        }));

                        $scope.Clinicusers = formattedData;
                    } else {
                        console.error("Invalid data format received:", rawData);
                        $scope.Clinicusers = []; // Ensure it's an array
                    }
                }
            }).catch(function (error) {
                console.error("Error fetching Embryologists:", error);
            });
        }
    };

    $scope.GetPhysicians = function () {
        debugger;

        var progenesisData = localStorage.getItem("Progenesis");
        var storedAuthInfo = progenesisData ? JSON.parse(progenesisData) : null;
        var currentDate = new Date(); // Current Date Object

        // Function to fetch new AccessToken if needed
        function fetchAccessToken(callback) {
            var userInfo = localStorage.getItem("ls.UserInfo");

            if (userInfo) {
                var parsedUserInfo = JSON.parse(userInfo);
                var UserID = parsedUserInfo.UserID;

                if (UserID) {
                    console.log("Fetching new AccessToken...");
                    EmbrologyMainSrv.GetPGTUserAuthInfoAccessToken(UserID).then(function (response) {
                        if (response && response.data) {
                            var pgtUserAuth = {
                                AccessToken: response.data.AccessToken || "",
                                UserID: UserID,
                                ExpiryDate: response.data.ExpiryDate ? new Date(response.data.ExpiryDate) : new Date(),
                            };

                            localStorage.setItem("Progenesis", JSON.stringify(pgtUserAuth));
                            console.log("Progenesis data updated:", pgtUserAuth);

                            callback(pgtUserAuth.AccessToken);
                        }
                    }).catch(function (error) {
                        console.error("Error fetching AccessToken:", error);
                    });
                } else {
                    console.error("UserID not found in UserInfo.");
                }
            } else {
                console.error("UserInfo not found in localStorage.");
            }
        }

        // Validate AccessToken & Expiry
        if (storedAuthInfo && storedAuthInfo.AccessToken && new Date(storedAuthInfo.ExpiryDate) >= currentDate) {
            console.log("Valid AccessToken found, proceeding with API call...");
            callEmbryologistsAPI(storedAuthInfo.AccessToken);
        } else {
            console.log("AccessToken missing or expired, fetching new one...");
            fetchAccessToken(callEmbryologistsAPI);
        }

        function callEmbryologistsAPI(accessToken) {
            debugger;

            if (!accessToken) {
                console.error("AccessToken is missing, cannot call API.");
                return;
            }

            // Call the backend API via GetPGTEmbryologist
            EmbrologyMainSrv.GetPGTPhysicians(accessToken).then(function (response) {
                debugger;
                let responseData;

                try {
                    // Parse response.data if it’s a string
                    responseData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
                } catch (error) {
                    console.error("Error parsing response data:", error);
                    return;
                }

                if (responseData && responseData.data) {
                    console.log("Embryologists API Response:", responseData);

                    let rawData = responseData.data;

                    if (Array.isArray(rawData) && rawData.length > 0) {
                        let rawObj = rawData[0]; // Extract first object from array

                        let formattedData = Object.keys(rawObj).map(key => ({
                            ID: key, // Store Key as ID
                            Description: rawObj[key] // Store Value as Description
                        }));

                        $scope.Physicians = formattedData;
                    } else {
                        console.error("Invalid data format received:", rawData);
                        $scope.Physicians = []; // Ensure it's an array
                    }
                }
            }).catch(function (error) {
                console.error("Error fetching Embryologists:", error);
            });
        }
    };







    $scope.GetRequisiteDetails = function (PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID) {
        debugger;

        // Retrieve Progenesis data from localStorage
        var progenesisData = localStorage.getItem("Progenesis");
        var storedAuthInfo = progenesisData ? JSON.parse(progenesisData) : null;

        if (!storedAuthInfo || !storedAuthInfo.AccessToken) {
            console.error("Access token not found. Cannot proceed.");
            return;
        }
usSpinnerService.spin('GridSpinner');
        // Step 1: Fetch Requisite ID using the initial API
        $http.get(API.APIurl + 'EmbrologyAPI/GetPGTRequisiteBiopsyDetails', {
            params: {
                PatientID: PatientID,
                PatientUnitID: PatientUnitID,
                PlanTherapyID: PlanTherapyID,
                PlanTherapyUnitID: PlanTherapyUnitID
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0) {
                var requisiteId = response.data[0].RequisiteID;

                // Step 2: Call backend method to fetch requisite results
                callBackendForRequisiteResults(requisiteId, storedAuthInfo.AccessToken);
            } else {
                console.error("No Requisite ID found.");
            }
        }).catch(function (error) {
            console.error("Error fetching Requisite ID:", error);
        });

        // Backend method to fetch requisite results
        function callBackendForRequisiteResults(requisiteId, accessToken) {
        debugger
            $http.get(API.APIurl + 'EmbrologyAPI/GetRequisiteResults', {
            
                params: { RequisiteID: requisiteId, AccessToken: accessToken }
            }).then(function (response) {
            debugger
                // Error handling for "Report Not Created"
                if (response.data.error && response.data.error.requisite_id === "Report Not Created") {
                debugger
                    console.error("Report Not Created.");
                    $scope.testembryos = [];
                    $scope.reportNotCreated = true;
usSpinnerService.stop('GridSpinner');
                    return;
                }

               // Check if requisite data is valid 
const report = response.data.data?.report;
const requisites = report?.requisites;

if (!report || !requisites || requisites.length === 0) {
    console.error("No requisite results found.");
    $scope.testembryos = [];
    $scope.reportNotCreated = true;
usSpinnerService.stop('GridSpinner');
    return;
}
                //Check for gitignore
console.log("Requisite results fetched:", response.data);
$scope.reportNotCreated = false;

// Mapping embryos with proper formatting
const requisite = requisites[0];
const testDate = new Date(requisite.testDate);
const formattedDate = testDate.toLocaleDateString('en-GB');  // Format: DD/MM/YYYY
const formattedTime = testDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: HH:MM AM/PM
$scope.biopsyresult.date = formattedDate
$scope.biopsyresult.time = formattedTime
//$scope.biopsyresult.embryologist = result.embryologist || (requisite.physicianName || "N/A")
$scope.biopsyresult.witness = requisite.physicianName || "N/A"
$scope.testembryos = requisite.results.map(result => ({
    name: result.embryoId,
    test: requisite.tests.map(test => test.name).join(', '),
    stage: result.embryoId,
    biopsyDate: formattedDate,
 //   time: formattedTime,
    grade: result.embryoGrade || "N/A",
    day: result.biopsyType || "N/A",
    karyotype: result.karyotype || "N/A",
    result: result.status || "Pending",
    gender: result.gender || "Unknown",
    embryologist: result.embryologist || (requisite.physicianName || "N/A"),  // Default to physician if not available
  //  witness: requisite.physicianName || "N/A"
}));
$scope.biopsyresult.embryologist = $scope.testembryos.length > 0 ? $scope.testembryos[0].embryologist : "N/A";
usSpinnerService.stop('GridSpinner');
            }).catch(function (error) {
                console.error("Error fetching requisite results:", error);
                $scope.testembryos = [];
                $scope.reportNotCreated = true;
usSpinnerService.stop('GridSpinner');
            });
        }

    };

$scope.initBiopsy = function () {
    const currentDate = new Date();
    $scope.biopsy = {
        date: currentDate,  // Use JavaScript Date object directly
         time: new Date(currentDate.setSeconds(0, 0)) // Correctly formatted as 'HH:MM' // 'HH:MM' format
    };
};



// Call the function to initialize default values






    $scope.GetPGTUserAuthInfo = function () {
        debugger;

        // Retrieve UserInfo from localStorage
        var userInfo = localStorage.getItem("ls.UserInfo");

        if (userInfo) {
            debugger;
            var parsedUserInfo = JSON.parse(userInfo); // Convert string to object
            var UserID = parsedUserInfo.UserID; // Extract UserID

            if (UserID) {
                debugger;
                // Clone FemalePatient object to avoid modifying the original
                var requestData = angular.copy($rootScope.CoupleDetails.FemalePatient);

                // Add UserID, Embryologist, and Witness to the object
                requestData.UserID = UserID;
                requestData.EmbryologistID = $scope.biopsy.Embryologist || null; // Assign Embryologist
                requestData.WitnessID = $scope.biopsy.Witness || null; // Assign Witness
                requestData.BiopsyDate = $scope.biopsy.date || null;

                // Check if $scope.embryos exists and is an array before filtering
                var selectedEmbryos = Array.isArray($scope.embryos) ? $scope.embryos.filter(e => e.selected) : [];
                requestData.Sample = []; // Ensure it's an array to store multiple selected embryos

                if (selectedEmbryos.length > 0) {
                    debugger;
                    requestData.TransferType = selectedEmbryos.some(e => e.Plans.toLowerCase() === "cryo") ? "frozen" : "fresh";

                    requestData.Sample = selectedEmbryos.map(e => {
                        let dayNumber = parseInt(e.Day.replace(/\D/g, ''), 10) || 0; // Extracts only the numeric part

                        return {
                            BiopsyType: "day " + dayNumber,
                            EmbrioId: e.Embryo,
                            PerformedBy: requestData.EmbryologistID,
                            TubingBy: requestData.EmbryologistID,
                            WitnessBy: requestData.WitnessID,
                            NumberCells: parseInt(e.Stage, 10),
                            PnStatus: e.PN + "PN",
                            BiopsyDate: $scope.biopsy.date,
                            EmbryoGrade: dayNumber > 3 ? e.Grade : null
                        };
                    });
                } else {
                    requestData.TransferType = null;
                    requestData.Sample = []; // No embryos selected, keep it empty
                }

                console.log("Final Request Data:", requestData);
                usSpinnerService.spin('GridSpinner');
                // Call the API with the updated object
                EmbrologyMainSrv.GetPGTUserAuthInfo(requestData).then(function (response) {
                    debugger;
                 if (response && response.data.AuthUrl && response.data.ResultStatus == 2) {
    debugger;
    window.open(response.data.AuthUrl, '_blank', 'width=1200,height=800,noopener,noreferrer');
    var pgtUserAuth = {
        AccessToken: response.data.AccessToken || "",
        UserID: UserID,
        AuthorizationCode: response.data.AuthorizationCode || "",
        AddedBy: response.data.AddedBy || 0,
        AddedOn: response.data.AddedOn || "",
        AddedDateTime: response.data.AddedDateTime ? new Date(response.data.AddedDateTime) : new Date(),
        ExpiryDate: response.data.ExpiryDate ? new Date(response.data.ExpiryDate) : new Date(),
        ResultStatus: response.data.ResultStatus || 0,
        AuthUrl: response.data.AuthUrl || ""
    };
    localStorage.setItem("Progenesis", JSON.stringify(pgtUserAuth));
    console.log("Progenesis data updated successfully:", pgtUserAuth);
} else if (response && response.data.AccessToken && response.data.ResultStatus == 0) {
    // Set AccessToken before sending requestData
    requestData.AccessToken = response.data.AccessToken;

  $http.post(API.APIurl + 'ProgenesisApi/ValidatePatientWithProgenesis', requestData)
    .then(res => {
        debugger; // Pause here to inspect the response object
        console.log("Validate Patient Response (Raw):", res.data);

        let responseData = typeof res.data === "string" ? JSON.parse(res.data) : res.data;

        console.log("Parsed Response:", responseData);

        if (responseData && responseData.message === "success" && responseData.data && responseData.data.length > 0) {
        usSpinnerService.stop('GridSpinner');
            debugger; // Pause here to inspect successful data handling

            AlertMessage.success(objResource.msgTitle, "Biopsy Scheduled Successfully!");
            $scope.GetDayWiseInfoForBiopsy();
            // Handle additional successful validation logic if required
        } else {
        usSpinnerService.stop('GridSpinner');
            debugger; // Pause here to inspect failed validation
            AlertMessage.warning(objResource.msgTitle, objResource.msgError);
        }
    })
    .catch(err => {
        debugger; // Pause here to inspect errors
        console.error("Error during validation:", err);
        AlertMessage.warning(objResource.msgTitle, objResource.msgError);
    });


}
                });
            } else {
                console.error("UserID not found in UserInfo.");
                AlertMessage.warning(objResource.msgTitle,objResource.msgError)
            }
        } else {
            console.error("UserInfo not found in localStorage.");
            AlertMessage.warning(objResource.msgTitle,objResource.msgError)
        }
    };


    window.onload = function () {
        // Check if the URL has the query parameter 'closePopup=true'
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("closePopup") === "true") {
            window.close(); // Close the popup
        }
    };


    //$scope.GetOAuthRedirectUrl = function () {
    //    EmbrologyMainSrv.OAuthRedirect().then(function (response) {
    //        if (response && response.data.RedirectUrl) {
    //            $scope.redirectUrl = response.data.RedirectUrl; // Store the URL in a scope variable
    //        }
    //    });
    //};
    //=====================================================================PGT Changes by Tejas Saxena
    //   $scope.CancelDay = function () {
    //    $uibModalInstance.dismiss('cancel');
    //};
    $scope.embryos = {};
    $scope.activeTab = 'schedule';

    $scope.openPopup = function () {
        $scope.showPopup = true;
        //$scope.GetDayWiseInfoForBiopsy()
    };

    $scope.closePopup = function () {
        $scope.showPopup = false;
    };

    $scope.setTab = function (tab) {
        $scope.activeTab = tab;
    };
    $scope.fetchresultpgt = function (){
    debugger
        if (!$rootScope.CoupleDetails || !$rootScope.CoupleDetails.FemalePatient) {
            console.error("CoupleDetails or FemalePatient is undefined.");
            return;
        }

        var PatientID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
        var PatientUnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
        var PlanTherapyID = $rootScope.CoupleDetails.FemalePatient.TherapyID;
        var PlanTherapyUnitID = $rootScope.CoupleDetails.FemalePatient.TherapyUnitID;


        $scope.GetRequisiteDetails(PatientID,PatientUnitID,PlanTherapyID,PlanTherapyUnitID)
}



    $scope.GetDayWiseInfoForBiopsy = function () {
        debugger
        if (!$rootScope.CoupleDetails || !$rootScope.CoupleDetails.FemalePatient) {
            console.error("CoupleDetails or FemalePatient is undefined.");
            return;
        }
        usSpinnerService.spin('GridSpinner');
        var PatientID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
        var PatientUnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
        var PlanTherapyID = $rootScope.CoupleDetails.FemalePatient.TherapyID;
        var PlanTherapyUnitID = $rootScope.CoupleDetails.FemalePatient.TherapyUnitID;

        EmbrologyMainSrv.GetDayWiseInfoForBiopsy(PatientID, PatientUnitID, PlanTherapyID, PlanTherapyUnitID)

            .then(function (response) {
                debugger

                if (response.data) {
                    debugger
                    usSpinnerService.stop('GridSpinner');
                    $scope.embryos = response.data; // Assuming API returns a list of embryos
                }
            })
            .catch(function (error) {
            usSpinnerService.stop('GridSpinner');
                console.error("Error fetching biopsy data:", error);
            });
    };
    //$scope.biopsy = {
    //    date: '',
    //    time: '',
    //    incubator: '',
    //    witness: '',
    //    embryologist: 'Akshaya P',
    //    embryos: [
    //        { name: 'C1', grade: 2, day: 'Day 3', plan: 'Transfer', stage: 'Early Blastocyst', selected: false },
    //        { name: 'C2', grade: 2, day: 'Day 3', plan: 'Transfer', stage: 'Blastocyst', selected: false },
    //        { name: 'C3', grade: 2, day: 'Day 3', plan: 'Transfer', stage: 'Full Blastocyst', selected: false },
    //        { name: 'C4', grade: 2, day: 'Day 3', plan: 'Transfer', stage: 'Blastocyst', selected: false }
    //    ]
    //};
    $scope.ScheduleBiopsy = function () {
    debugger;
    // Create an array to store selected embryos data
    swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoyouwanttoschedulebiopsy, "warning", function (isConfirmed) {
        if (isConfirmed) {
            var biopsyData = [];
            let errorMessage = "";

            if (!$scope.biopsy) {
                AlertMessage.warning(objResource.msgTitle, "Biopsy details are missing.");
                return;
            }

            if (!$scope.biopsy.date) {
                errorMessage += "Please select a Date.\n";
            }

            if (!$scope.biopsy.time) {
                errorMessage += "Please select a Time.\n";
            }

            if (!$scope.biopsy.Incubator) {
                errorMessage += "Please select an Incubator.\n";
            }

            if (!$scope.biopsy.Witness) {
                errorMessage += "Please select a Witness.\n";
            }

            if (!$scope.biopsy.Embryologist) {
                errorMessage += "Please select an Embryologist.\n";
            }

            if (errorMessage) {
                AlertMessage.warning(objResource.msgTitle, errorMessage);
                return;
            }

            $scope.GetPGTUserAuthInfo();

            // Loop through all embryos and map selected data to EmbryoData
            angular.forEach($scope.embryos, function (embryo) {
                if (embryo.selected) {
                    var embryoData = {
                        EmbryoNo: embryo.Embryo,  // Corresponding field for EmbryoNo
                        Grade: embryo.Grade,      // Corresponding field for Grade
                        Day: embryo.Day,          // Corresponding field for Day
                        Plans: embryo.Plans,      // Corresponding field for Plans
                        Stage: embryo.Stage,      // Corresponding field for Stage
                        FemalePatientID: $scope.FemalePatientID,  // Assume you have this value
                        FemalePatientUnitID: $scope.FemalePatientUnitID, // Assume you have this value
                        PlanTherapyID: $scope.PlanTherapyID,  // Assume you have this value
                        PlanTherapyUnitID: $scope.PlanTherapyUnitID, // Assume you have this value
                        SerialOocyteNumber: embryo.SerialOocyteNumber  // Ensure SerialOocyteNumber is part of the model
                    };

                    // Push each selected embryo's data into the biopsyData array
                    biopsyData.push(embryoData);
                }
            });

            // Send the collected data to the API
            EmbrologyMainSrv.AddIVFDashboardBIOPSYDetails(biopsyData)
                .then(function (response) {
                    debugger;

                    if (response.data == 1) {
                        debugger;

                        AlertMessage.success('Biopsy Scheduled for ' + biopsyData.length + ' embryos.');
                        //$scope.CancelDay();
                    }
                })
                .catch(function (error) {
                    console.error("Error adding biopsy data:", error);
                });
        }
    });
};


    $scope.scheduleBiopsy = function () {
        var selectedEmbryos = $scope.embryos.filter(e => e.selected);
        if (selectedEmbryos.length === 0) {
            AlertMessage.warning('Select at least one embryo.');
            return;
        }
        $scope.ScheduleBiopsy()
      
    };
    //=================================PGt Changes end by Tejas Saxena



    //========================================================================================================================================================================
    //Day Six Process
    $scope.DaySix = function () {
        if ($scope.ValidationFlag || $scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
            $scope.PassInfoToDaySecond = {};
            $scope.PassInfoToDaySecond.CoupleDetails = $scope.CoupleDetails;
            $scope.PassInfoToDaySecond.OPUStartDate = $scope.OPUData.StartDate;
            var modalInstance = $uibModal.open({ // for open pop up for Day 0
                templateUrl: 'day6',
                controller: 'day6Ctrl',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    RootPGInfo: function () {
                        return $scope.PassInfoToDaySecond;
                    }
                }
            });
            modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
                if (!angular.equals({}, data)) {
                    //Check sucess stauts
                    if (data == 1) {
                        $scope.fillDayOocyteGrid();
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }
                }
            });
        }
        else {
            AlertMessage.error(objResource.msgTitle, $scope.ErrMsg);
        }
    }


    $scope.DaySeven = function () {
        if ($scope.ValidationFlag || $scope.CoupleDetails.FemalePatient.ArtTypeID == 7 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 8 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 3 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 4 || $scope.CoupleDetails.FemalePatient.ArtTypeID == 9) {
            $scope.PassInfoToDaySecond = {};
            $scope.PassInfoToDaySecond.CoupleDetails = $scope.CoupleDetails;
            $scope.PassInfoToDaySecond.OPUStartDate = $scope.OPUData.StartDate;
            var modalInstance = $uibModal.open({ // for open pop up for Day 0
                templateUrl: 'day7',
                controller: 'day7Ctrl',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    RootPGInfo: function () {
                        return $scope.PassInfoToDaySecond;
                    }
                }
            });
            modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
                if (!angular.equals({}, data)) {
                    //Check sucess stauts
                    if (data == 1) {
                        $scope.fillDayOocyteGrid();
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }
                }
            });
        }
        else {
            AlertMessage.error(objResource.msgTitle, $scope.ErrMsg);
        }
    }
    //========================================================================================================================================================================
    //$scope.ShowPatientPopupData = function ShowPatientPopupData(Item) {
    //    debugger;
    //    if (Item.IsFET == true) {
    //        Item.Day0Plan = '';
    //    }
    //    if (Item.ZeroTooltip != null) {
    //        Item.ZeroTooltip.Date = $filter('date')(Item.ZeroTooltip.Date, 'dd-MMM-yyyy');
    //        Item.ZeroTooltip.Time = $filter('date')(Item.ZeroTooltip.Time, 'HH:mm');
    //        if (Item.ZeroTooltip.IVM) {
    //            $scope.IVMFlag = 'checked';
    //        }
    //        else {
    //            $scope.IVMFlag = '';
    //        }
    //        $scope.html = '<div class="tbl_tooltip"><table><tr><td colspan="4"><b>' + Item.ZeroTooltip.CycleCode + '</b></td><td><b class="txtPlan">' + Item.Day0Plan + '</b></td></tr><tr><td><b>Date Time</b></td><td colspan="4">: ' + Item.ZeroTooltip.Date + '&nbsp;' + Item.ZeroTooltip.Time + '</td></tr><tr><td><b>OCD </b></td><td>: ' + Item.ZeroTooltip.OCD + '</td><td>&nbsp;</td><td><b>ECD </b></td><td>: ' + Item.ZeroTooltip.ECD + '</td></tr><tr><td><b>OCC </b></td><td>: ' + Item.ZeroTooltip.OCC + '</td><td>&nbsp;</td><td><b>ZP </b></td><td>: ' + Item.ZeroTooltip.ZP + '</td></tr><tr><td><b>PB </b></td><td>: ' + Item.ZeroTooltip.PB + '</td><td>&nbsp;</td><td><b>PVS </b></td><td>: ' + Item.ZeroTooltip.PVS + '</td></tr><tr><td><b>Cytoplasm </b></td><td>: ' + Item.ZeroTooltip.Cytoplasm + '</td><td>&nbsp;</td><td><b>Breakage </b></td><td>: ' + Item.ZeroTooltip.Breakage + '</td></tr><tr><td><b>Stage </b></td><td>: ' + Item.ZeroTooltip.MaturityDesc + '</td><td>&nbsp;</td><td><b>PB Location </b></td><td>: ' + Item.ZeroTooltip.PBLocationDesc + '</td></tr><tr><td><b>Location </b></td><td>: ' + Item.ZeroTooltip.LocationDesc + '</td><td>&nbsp;</td><td><b>IVM</b></td><td colspan="4"><input type="checkbox" ' + $scope.IVMFlag + ' /></td></tr><tr><td><b>Embryologist </b></td><td colspan="4">: ' + Item.ZeroTooltip.Embryologist + '</td></tr><tr><td><b>Witness </b></td><td colspan="4">: ' + Item.ZeroTooltip.Witness + '</td></tr></table></div>';
    //        $scope.htmlPopover1 = $sce.trustAsHtml($scope.html);
    //    }
    //    else
    //    {
    //        $scope.htmlPopover1 = $sce.trustAsHtml();
    //    }
    //}

    $scope.ShowPatientPopupData = function ShowPatientPopupData(Item, event) {
        debugger;
        if (Item.IsFET == true) {
            Item.Day0Plan = '';
        }
        if (Item.ZeroTooltip != null) {
            Item.ZeroTooltip.Date = $filter('date')(Item.ZeroTooltip.Date, 'dd-MMM-yyyy');
            Item.ZeroTooltip.Time = $filter('date')(Item.ZeroTooltip.Time, 'HH:mm');

            $scope.html = `
        <div class="tooltip-container">
            <div class="tooltip-content">
                <div class="tooltip-row">
                    <b style="color: rgba(98, 98, 98, 1);">Stage :</b> <span> ${Item.ZeroTooltip.MaturityDesc || 'N/A'}</span>
                </div>
                <div class="tooltip-row">
                    <b style="color: rgba(98, 98, 98, 1);">Fertilization :</b> <span>${Item.ZeroTooltip.FertilizationDesc || 'N/A'}</span>
                </div>
                <div class="tooltip-row">
                    <b style="color: rgba(98, 98, 98, 1);">Plan :</b> <span>${Item.Day0Plan || 'N/A'}</span>
                </div>
            </div>
        </div>
        `;
            $scope.htmlPopover1 = $sce.trustAsHtml($scope.html);
        } else {
            $scope.htmlPopover1 = $sce.trustAsHtml();
        }

        // Prevent closing if clicking inside the tooltip
        event.stopPropagation();
    };

    // Close popover if clicked outside
    angular.element(document).on('click', function (event) {
        var popoverElement = document.querySelector('[uib-popover-html="htmlPopover1"]');
        if (popoverElement && !popoverElement.contains(event.target)) {
            $scope.htmlPopover1 = $sce.trustAsHtml(); // Close popover
            $scope.$apply(); // Ensure AngularJS detects the change
        }
    });



    //========================================================================================================================================================================
});


