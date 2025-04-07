'use strict';
angular.module('PIVF').controller('OocyteThowCtr', function ($rootScope, $scope, OocyteThowSrv, $location, AlertMessage, srvCommon, Common, swalMessages, $filter, PageConfig, $uibModal, usSpinnerService) {
    $rootScope.FormName = "Oocyte Thawing";
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    //$rootScope.OrderList = 2;
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.ThowingList = [];
    $scope.VitrificationSummaryList = [];
    var objResource = {};
    var SelCouple = Common.getSelectedCouple();
    $rootScope.OrderList = 0;
    $rootScope.ForMedia = 1;
    $rootScope.ForConsent = 0;
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }// for globalization

    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.dateOptionsDOB = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 120),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker

    $scope.open = function ($event, SemenThaw) {
        $event.preventDefault();
        $event.stopPropagation();
        SemenThaw.opened = true;
    };

    // Date pickr End

    $scope.GetVitrificationSummaryList = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if (SelCouple.FemalePatient != undefined && SelCouple.FemalePatient != null) {
            if (SelCouple.FemalePatient.IsCancelCycle == true) {
                $scope.disableSaveBtn = true;
            }
            if (SelCouple.FemalePatient.IsCloseCycle == false) {
                $scope.disableSaveBtn = true;
            }
        }
        var ResponseData = OocyteThowSrv.GetVitrificationSummaryList();
        ResponseData.then(function (Response) {
            angular.forEach(Response.data.lstVitriSummary, function (item) {
                if ($rootScope.CoupleDetails.SelectedTherapyCycleCode == item.CycleCode) {
                    if (item.CurrentStatus != 'Fresh' && $rootScope.CoupleDetails.SelectedTherapyCycleCode == item.CycleCode) {
                        //if (!item.IsthawDone)
                        //item.chkVitrification = true;
                        item.IsVitriDisable = true;
                    }
                    //   var idx=Response.data.lstThaw.findIndex(z=>z.VitriDetailID == item.VitriDetailID && z.VitriDetailUnitID == item.VitriDetailUnitID);
                    var idx = -1;
                    for (var i = 0; i < Response.data.lstThaw.length; ++i) {
                        if (Response.data.lstThaw[i].VitriDetailID == item.VitriDetailID && Response.data.lstThaw[i].VitriDetailUnitID == item.VitriDetailUnitID) {
                            idx = i;
                            break;
                        }
                    }
                    if (idx > -1) {
                        item.chkVitrification = true;
                        item.IsVitriDisable = true;
                    }
                    $scope.VitrificationSummaryList.push(item);
                }
                else if ($rootScope.CoupleDetails.SelectedTherapyCycleCode != item.CycleCode) {
                    if (item.CurrentStatus == 'Refreeze' && !item.IsFinalize) {
                        if (!item.IsthawDone) {
                            item.chkVitrification = false;
                            item.IsVitriDisable = false;
                        }
                        else {
                            item.chkVitrification = true;
                            item.IsVitriDisable = true;
                        }
                    }
                    else if (item.CurrentStatus == 'Fresh' && !item.IsFinalize) {
                        if (!item.IsthawDone) {
                            item.chkVitrification = false;
                            item.IsVitriDisable = false;
                        }
                        else {
                            item.chkVitrification = true;
                            item.IsVitriDisable = true;
                        }
                    }
                    else {
                        item.chkVitrification = true;
                        item.IsVitriDisable = true;
                    }
                    $scope.VitrificationSummaryList.push(item);
                }
            });
            angular.forEach(Response.data.lstThaw, function (item) {
                if (item.ThawID > 0 && $rootScope.CoupleDetails.SelectedTherapyCycleCode == item.CycleCode) {
                    item.VitriDate = new Date(item.ThawingDate);
                    item.VitriTime = new Date(item.ThawingTime);
                    if (item.IsFinalize && $rootScope.CoupleDetails.SelectedTherapyCycleCode == item.CycleCode) {
                        item.isDisable = true;
                    }
                    else {
                        item.isDisable = false;
                    }
                    $scope.ThowingList = Response.data.lstThaw;
                }
            });
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');

        });
    }

    $scope.GetDocList = function GetDocList() {
        var responseData = Common.GetDoctorList(false);
        responseData.then(function (Response) {
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: 'Select' })
            $scope.ClinicistList = Response.data.EmbryologistAndrologist;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetPostThawPlanList = function () {
        var ResponseData = Common.getMasterList('M_PostThawingPlan', 'PostThawID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ThawPlanList = Response.data;
        }, function (error) {
        });
    }

    $scope.CellStage = function () {
       // var responseData = Common.CellStage(false);
        var ResponseData = Common.getMasterList('M_CellStage', 'CellStageID', 'CellStageDescription');
        ResponseData.then(function (Response) {
              Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.CellStageList = Response.data;

        }, function (error) {
           // $scope.Error = error;
        });
    }

        $scope.Grade = function () {

            var ResponseData = Common.getMasterList('M_IVF_Grade', 'ID', 'Description');
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
                $scope.GradeList = Response.data;

            }, function (error) {
               // $scope.Error = error;
            });
        }



    $scope.AddRow = function (item) {
        console.log(item);
        if (item.chkVitrification) {
            var thaw = {};
            thaw.VitriID = item.VitriID; thaw.VitriUnitID = item.VitriUnitID; thaw.VitriDate = new Date(); thaw.VitriTime = new Date(); thaw.VitriDetailID = item.VitriDetailID;
            thaw.VitriDetailUnitID = item.VitriDetailUnitID; thaw.CycleCode = item.CycleCode; thaw.OocyteNo = item.OocyteNo; thaw.PlanTherapyUnitID = item.PlanTherapyUnitID;
            thaw.EmbryologistID = 0; thaw.WitEmbryologistID = 0; thaw.PostThawPlanID = 0; thaw.Remark = ''; thaw.IsFinalize = false; thaw.PlanTherapyID = item.PlanTherapyID;
            thaw.SelectedTherapyID = SelCouple.FemalePatient.TherapyID; thaw.SelectedTherapyUnitID = SelCouple.FemalePatient.TherapyUnitID; thaw.ThawID = 0
            thaw.SelectedCycleCode = $rootScope.CoupleDetails.SelectedTherapyCycleCode; thaw.EmbSerialNumber = item.EmbSerialNumber; thaw.isDisable = false;
            thaw.IsFET = item.IsFET;
            thaw.Donor = item.Donor;
            thaw.Fresh = 0;
            thaw.DonorEmb = 0;
            thaw.CellStageID = 0;
            thaw.GradeID = 0;
            $scope.ThowingList.push(thaw);
            //CoupleDetails.SelectedTherapyCycleCode
        }
        else {
            // $scope.ThowingList.splice($scope.ThowingList.findIndex(x=>(x.VitriDetailID == item.VitriDetailID && x.VitriDetailUnitID == item.VitriDetailUnitID)), 1);
            var idx = -1;
            for (var i = 0; i < $scope.ThowingList.length; ++i) {
                if ($scope.ThowingList[i].VitriDetailID == item.VitriDetailID && $scope.ThowingList[i].VitriDetailUnitID == item.VitriDetailUnitID) {
                    idx = i;
                    break;
                }
            }
            $scope.ThowingList.splice(idx, 1);
        }

        $scope.ThowingList.sort(function (u1, u2) {
            return u1.OocyteNo - u2.OocyteNo;
        });
    }

    $scope.SaveUpdate = function () {
        debugger;
        if ($scope.Validate()) {
            debugger;
            //$scope.ThowingList.every(x=>x.VitriDate = $filter('date')(x.VitriDate, 'medium'));
            //$scope.ThowingList.every(x=>x.VitriTime = $filter('date')(x.VitriTime, 'medium'));
            var TempThowingList = Object.create($scope.ThowingList);
          
            debugger;
            //  var TempThowingList = Object.create($scope.ThowingList);
            TempThowingList = $filter('filter')(TempThowingList, function (d) { return d.isDisable == false; })
            if (TempThowingList.length == 0) {
                // $scope.VitrificationSummaryList = [];
               // $scope.ThowingList = TempThowingList;
                // $scope.GetVitrificationSummaryList();
                AlertMessage.warning('PalashIVF', 'None Record is change.');
            }
            else {
                angular.forEach($scope.ThowingList, function (x) {
                    //
                    //if (item.ThawID > 0 && item.IsFinalize) {
                    //    $scope.ThowingList.splice($scope.ThowingList.findIndex(x=>(x.ThawID == item.ThawID && x.IsFinalize == item.IsFinalize)), 1);
                    //}
                    x.VitriDate = $filter('date')(x.VitriDate, 'medium');
                    x.VitriTime = $filter('date')(x.VitriTime, 'medium');
                });
                $scope.ThowingList = $filter('filter')($scope.ThowingList, function (d) { return d.isDisable == false; })
                var Promise = OocyteThowSrv.SaveOocyteThawing($scope.ThowingList);
            Promise.then(function (Response) {
                if (Response.data == 1) {
                    $scope.VitrificationSummaryList = [];
                    $scope.ThowingList = [];
                    $scope.GetVitrificationSummaryList();
                    AlertMessage.info('PalashIVF', 'Record saved successfully.');
                    //angular.forEach($scope.ThowingList, function (x) {
                    //    x.VitriDate = new Date(x.VitriDate);
                    //    if (x.IsFinalize == true)
                    //        x.isDisable = true;
                    //});
                    //$scope.ThowingList.every(function (x) {
                    //    x.VitriDate = new Date(x.VitriDate);
                    //    //x.VitriTime = new Date(x.ThawingTime);
                    //    if (x.IsFinalize == true)
                    //        x.isDisable = true;
                    //});
                }
            }, function (error) {
                debugger;
            });
        }
        }
    }

    $scope.Validate = function () {
        debugger;
        var IsValid = false;
        var IsValid1 = false;
        if ($scope.ThowingList.length > 0) {
           
            angular.forEach($scope.ThowingList, function (item, idx) {
                item.DateInvalid = false;
                item.TimeInvalid = false;
                item.Invalid = false;
                if (!angular.isDate(item.VitriDate)) {
                    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                    IsValid = false;
                    item.DateInvalid = true;
                }
                if (!angular.isDate(item.VitriTime)) {
                    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                    IsValid = false;
                    item.TimeInvalid = true;
                }
                if (item.PostThawPlanID == 0) {
                    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                    $scope.frmOocyteThaw['ddlPostPlan_' + idx].$dirty = true;
                    item.Invalid = true;
                }
                if (item.EmbryologistID == 0) {
                    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                    $scope.frmOocyteThaw['ddlEmbryologist_' + idx].$dirty = true;
                    item.Invalid = true;
                    IsValid1 = true;
                }
                if (item.WitEmbryologistID == 0) {
                    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                    $scope.frmOocyteThaw['ddlWitness_' + idx].$dirty = true;
                    item.Invalid = true;
                    IsValid1 = true;
                }
                //if (item.WitEmbryologistID == 0 && item.EmbryologistID == 0 ) {
                //    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                //    $scope.frmOocyteThaw['ddlWitness_' + idx].$dirty = true;
                //    $scope.frmOocyteThaw['ddlEmbryologist_' + idx].$dirty = true;
                //    item.Invalid = true;
                //    IsValid1 = true;
                //}
                if ((item.WitEmbryologistID == item.EmbryologistID) && (item.WitEmbryologistID != 0 && item.EmbryologistID!=0) ) {
                    AlertMessage.warning('PalashIVF', 'Please select different  Embryologist and WitnessEmbryologist');
                    $scope.frmOocyteThaw['ddlWitness_' + idx].$dirty = true;
                    $scope.frmOocyteThaw['ddlEmbryologist_' + idx].$dirty = true;
                    item.Invalid = true;
                    IsValid1 = true;
                   
                }
            });


            //     IsValid = $scope.ThowingList.some(x => x.TimeInvalid == true || (x.DateInvalid == true || x.Invalid == true ));
            angular.forEach($scope.ThowingList, function (x) {
                if (x.TimeInvalid == true || (x.DateInvalid == true || x.Invalid == true || IsValid1==true)){
                    IsValid = true;
                    debugger;
                }
                else IsValid = false;
            })
            debugger;
            return !IsValid;
        }
        else {
            AlertMessage.info('PalashIVF', 'Select atleast 1 record.');
            IsValid = false;
            return IsValid;
        }
    }

    $scope.SortColumn = "CycleCode";
    $scope.reverseSort = false;
    $scope.SortData = function (column) {
        $scope.reverseSort = ($scope.SortColumn == column) ? !$scope.reverseSort : false;
        $scope.SortColumn = column;
        if ($scope.SortColumn == column)
            $scope.sortClass = $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass = '';
    }
    //Menu Redirect
    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }
    // added by vikrant For Get Donar Oocytes
    $scope.GetDonarOocytes = function () {
        var modalInstance = $uibModal.open({ // for open pop up for Day 0
            templateUrl: 'getDonorOocytesmodal',
            controller: 'DonarOocyteCtrl',
            backdrop: false,
            keyboard: false,
            size: 'lg'
        });
        modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
            if (!angular.equals({}, data)) {
                //Check sucess stauts
                if (data == 1) {
                    $scope.VitrificationSummaryList = [];
                    $scope.GetVitrificationSummaryList();
                    AlertMessage.success("PalashIVF", objResource.msgSave);
                }
                else {
                    AlertMessage.error("PalashIVF", objResource.msgError);
                }
            }
        });
    }
})