'use strict';
angular.module('PIVF').controller('ctrlNewART', function ($rootScope, $scope, $location, AlertMessage, swalMessages, Common, srvCommon, srvNewART, $filter, PageConfig, usSpinnerService, $timeout, localStorageService, $uibModal) {
    //  $scope.bigTotalItems = 0;
    $scope.NewART = {};
    $rootScope.ForConsent = 0;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $scope.ArtbtnFlag = true;
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.IsOverview = false;
    var objResource = {};
    var selectCouple = {};
    var PrevCycleStatus = false;
    debugger;
    selectCouple = Common.getSelectedCouple();
    $rootScope.CycleDetails = null;
    $rootScope.FormName = 'New Cycle';
    //usSpinnerService.spin('GridSpinner');
    $scope.IsFirstResponse = false;
    $scope.IsSecondResponse = false;
    $scope.IsThirdResponse = false;
    $scope.IsFourthResponse = false;
    $scope.IsFifthResponse = false;
    $scope.IsSixthResponse = false;
    $scope.IsSeventhResponse = false;
    $scope.disableClickART = false;               //Added by Nayan Kamble on 12/06/2019
    $scope.DonorCycleCode = angular.isDefined(selectCouple.FemalePatient) ? selectCouple.FemalePatient.DonorCycleCode : null;
   // usSpinnerService.spin('GridSpinner');
    $scope.IsDonerCycleNeeded = false;
    //
    // for sorting by rohini
    $scope.SortColumn1 = "CycleCode";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    
    $scope.CycleIDs = {
        ID: 0,
        UnitID: 0
    };
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    debugger;
    $scope.MRNO = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
    $scope.PatientName = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
    if ($rootScope.CoupleDetails.FemalePatient.ArtTypeID == 1)//only for opu dispaly PAC
        $scope.IsDisplayPAC = true;
    else
        $scope.IsDisplayPAC = false;

    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.GetUserrights = function () {
        $scope.hideMain = false;
        debugger;
        var lstUserRights = Common.getUserRights();
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 403 && lstUserRights[z].Active)//Male Investigations 
            {
                  debugger;
                $rootScope.ARTDateValidation = lstUserRights[z].IsDateValidation;
                console.log("Root ",$rootScope.ARTDateValidation);
                break;
            }
        }
    }

    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.OpenNewART = function () {
        debugger;
        if ($scope.IsDonerCycleNeeded)
        {
            AlertMessage.info('PalashIVF', 'Create Donor Cycle First');
        }
        else {
            $location.path('/NewART/');
        }
      
    }

    $scope.Cancel = function () {
        $location.path('/ARTCycle/');
    }

    $scope.LoadData = function LoadData() {
        $scope.GetDonorSpermCollMethodList();
        $scope.GetSpermCollMethodList();
        //Get The Page Visibility Config Data By Vikrant 
        $scope.configData = PageConfig.getObj();
        $scope.GetARTTypeList();
        //$scope.ARTSubTypeList();
        $scope.GetIndicationList();
        $scope.GetSourceOfSpermList();
        //    $scope.GetStimlnDrugList();
        if (!$scope.IsOverview) {
            $scope.GetLatestLMPDate();
            $scope.GetMedicalHistory();
        }
        else {
            $rootScope.isAction = true;
        }
     //$scope.GetMedicalHistory();  // added by sujata
        $scope.GetProtocolList();
        $scope.ARTSubTypeList = [];
        $scope.ARTSubTypeList.splice(0, 0, { ID: 0, Description: "ART Subtype" });
        $scope.NewART.ArtSubTypeID = 0;
       
    }

    $scope.GetARTTypeList = function GetARTTypeList() {
        $scope.IsFirstResponse = false;
        var ResponseData = Common.getMasterList('M_ARTType', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ARTTypeList = Response.data;
            $scope.IsFirstResponse = true;
            $scope.GetAllResponse();
            //$scope.NewART.ArtTypeID = 0;
        }, function (error) {
            $scope.IsFirstResponse = true;
            $scope.GetAllResponse();
        });
    };

    $scope.GetArtSubTypeList = function () {
        $scope.ProtocolMandatory = false;
        $scope.hideSOfSperm = false;
        $scope.disableSOfSperm = false;
        $scope.SOfSpermMandatory = false;
        //  $scope.NewART.SourceOfSpermID = 0;
        if ($scope.NewART.ArtTypeID > 0) {
            var ResponseData = Common.GetArtSubTypeList($scope.NewART.ArtTypeID, selectCouple.FemalePatient.PatientCategoryID);
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: "ART Subtype" });
                $scope.ARTSubTypeList = Response.data;
                //if ($scope.NewART.ArtSubTypeID > 0 ) {
                //    $scope.NewART.ArtSubTypeID = $scope.NewART.ArtSubTypeID;
                //}
                //else
                //  $scope.NewART.ArtSubTypeID = 0;
            }, function (error) {
            });
        }
        else {
            $scope.ARTSubTypeList = [];
            $scope.ARTSubTypeList.splice(0, 0, { ID: 0, Description: "ART Subtype" });
            $scope.NewART.ArtSubTypeID = 0;
        }
    }

    $scope.GetProtocolList = function GetProtocolList() {
        $scope.IsThirdResponse = false;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = Common.getMasterList('M_Protocol', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ProtocolList = Response.data;
            if ($scope.NewART.ProtocolID == 0 || $scope.NewART.ProtocolID == null || $scope.NewART.ProtocolID == undefined)
                $scope.NewART.ProtocolID = 0;
            $scope.IsThirdResponse = true;
            $scope.GetAllResponse();
        }, function (error) {
            $scope.IsThirdResponse = true;
            $scope.GetAllResponse();
            usSpinnerService.stop('GridSpinner');
        });
    };

    $scope.GetIndicationList = function GetIndicationList() {
        $scope.IsFourthResponse = false;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = Common.getMasterList('M_Indication', 'IndicationID', 'IndicationDescription');
        ResponseData.then(function (Response) {
            //    Response.data.splice(0, 0, {ID: 0, Description: "Select"});
            $scope.IndicationList = Response.data;
            $scope.IsFourthResponse = true;
            $scope.GetAllResponse();
            debugger;
            $scope.GetStimlnDrugList();
            //$scope.NewART.IndicationID = 0;
        }, function (error) {
            $scope.IsFourthResponse = true;
            $scope.GetAllResponse();
            usSpinnerService.stop('GridSpinner');
        });
    };

    $scope.GetSpermCollMethodList = function GetSpermCollMethodList() {
        $scope.IsSecondResponse = false;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = Common.getMasterList('M_MethodofSpermCollection', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SpermCollMethodList = Response.data;
            if ($scope.NewART.PartnrSpermCollMethodID == 0 || $scope.NewART.PartnrSpermCollMethodID == null || $scope.NewART.PartnrSpermCollMethodID == undefined)
                $scope.NewART.PartnrSpermCollMethodID = 0;
            if ($scope.NewART.DonorSpermCollMethodID == 0 || $scope.NewART.DonorSpermCollMethodID == null || $scope.NewART.DonorSpermCollMethodID == undefined)
            {
                $scope.NewART.DonorSpermCollMethodID = 0;
            }
            $scope.IsSecondResponse = true;
            $scope.GetAllResponse();
        }, function (error) {
            $scope.IsSecondResponse = true;
            $scope.GetAllResponse();
            usSpinnerService.stop('GridSpinner');
        });
    };
    $scope.GetDonorSpermCollMethodList = function GetDonorSpermCollMethodList() {
        $scope.DonorSpermCollMethodList = [{ ID: 0, Description: "Select" }, { ID: 1, Description: "Cryo" }]
        if ($scope.NewART.DonorSpermCollMethodID == 0 || $scope.NewART.DonorSpermCollMethodID == null || $scope.NewART.DonorSpermCollMethodID == undefined) {
            $scope.NewART.DonorSpermCollMethodID = 0;
        }
    };

    $scope.Drpsetting=function()
    {
        if($scope.NewART.SourceOfSpermID == 2)
        {
            $scope.NewART.DonorSpermCollMethodID = 1;
            $scope.NewART.PartnrSpermCollMethodID = 6;
        }
        else if($scope.NewART.SourceOfSpermID == 3)
        {
            $scope.NewART.DonorSpermCollMethodID = 1;
            $scope.NewART.PartnrSpermCollMethodID = 0;
        }
        else
        {
            $scope.NewART.PartnrSpermCollMethodID = 0;
        }
    }

    $scope.GetSourceOfSpermList = function GetSourceOfSpermList() {
        $scope.IsFifthResponse = false;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = Common.getMasterList('M_SourceofSperm', 'SourceSpermID', 'SourceSpermDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SourceOfSpermList = Response.data;
            $scope.IsFifthResponse = true;
            $scope.GetAllResponse();
            debugger;
            if (!$scope.IsOverview && !$scope.NewART.SourceOfSpermID != 0) {
                $scope.NewART.SourceOfSpermID = 0;
            }
        }, function (error) {
            $scope.IsFifthResponse = true;
            $scope.GetAllResponse();
            usSpinnerService.stop('GridSpinner');
        });
    };

    $scope.GetStimlnDrugList = function GetStimlnDrugList() {
        debugger;
        var ResponseData = Common.getMasterList('M_Molecule', 'ID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            //Response.data.splice(0, 0, {ID: 0, Description: "Select"});
            $scope.StimlnDrugList = Response.data;
            if ($scope.IsOverview) {
                $rootScope.FormName = 'Cycle Overview';
                var Donor = '';
                if (selectCouple.FemalePatient.DonorCycleCode != '')
                    Donor = ', Donor Code : ' + selectCouple.FemalePatient.DonarCode + ', Cycle Code : ' + selectCouple.FemalePatient.DonorCycleCode;

                if (selectCouple.FemalePatient.SurrogateMRno == null) {   //Added by Nayan Kamble
                    selectCouple.FemalePatient.SurrogateMRno = '';
//                    var SurrogateMRno = '';
                }
                var SurrogateMRno = '';
                if (selectCouple.FemalePatient.SurrogateMRno != '' ) {   
                    if (selectCouple.FemalePatient.PatientCategoryID == 7)
                        SurrogateMRno = ', Surrogate MRNo : ' + selectCouple.FemalePatient.SurrogateMRno;
                }
                $rootScope.CycleDetails = selectCouple.FemalePatient.CycleCode + ', ' + selectCouple.FemalePatient.ARTType + '-' + selectCouple.FemalePatient.ARTSubType + '' + Donor + '' + SurrogateMRno;
                if ($rootScope.CycleDetails.slice(0,-1) === '-')
                    $rootScope.CycleDetails = $rootScope.CycleDetails.slice(0, -1);
                if ($rootScope.CycleDetails.trim().slice(0,-1) === ',')
                    $rootScope.CycleDetails = $rootScope.CycleDetails.trim().slice(0, -1);
                $scope.GetCycleOverview();

            }
        }, function (error) {
        });
    };

    $scope.ClearSaveART = function ClearSaveART() {     //Added by Nayan Kamble on 12/06/2019
        $scope.disableClickART = false;
    }

    $scope.SaveUpdate = function (NewART) {
        debugger;
        if (!$scope.IsOverview) {
            if (!$scope.IsOverview && !PrevCycleStatus) {
                if ($scope.ValidateNewART()) {
                    $scope.disableClickART = true;    //Added by Nayan Kamble on 12/06/2019
                    var SelectedIndication = [];
                    var SelectedDrugs = [];
                    if (angular.isDefined(NewART.SelectedIndication)) {
                        angular.forEach(NewART.SelectedIndication, function (i) {
                            SelectedIndication.push(i.ID);
                        });
                        NewART.SelectedIndication = SelectedIndication.join(',');
                    };
                    if (angular.isDefined(NewART.SelectedDrugs)) {
                        angular.forEach(NewART.SelectedDrugs, function (i) {
                            SelectedDrugs.push(i.ID);
                        });
                        NewART.SelectedDrugs = SelectedDrugs.join(',');
                    };
                    NewART.LMP = $filter('date')(NewART.LMP, 'medium');
                    usSpinnerService.spin('GridSpinner');
                    var Response = srvNewART.SaveUpdate(NewART);
                    Response.then(function (resp) {
                        debugger;
                        usSpinnerService.stop('GridSpinner');
                        if (resp.data == 1) {
                            $scope.IsDonerCycleNeeded = false;                          //Added by Nayan Kamble
                            AlertMessage.success('PalashIVF', 'Record saved successfully.');
                            $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
                            $scope.Cancel();
                        }
                        else if (resp.data == 2) {
                            PageConfig.setObj(NewART.ArtTypeID, NewART.ArtSubTypeID);
                            $scope.LoadData();
                            AlertMessage.success('PalashIVF', 'Record updated successfully.');
                            $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error('PalashIVF', 'Error occured.');
                        $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
                    })
                }
                else {
                    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                    $scope.frmNewART.ddlProtocol.$dirty = true;
                    $scope.frmNewART.ddlArttype.$dirty = true;
                    $scope.frmNewART.ddlSourceOfSperm.$dirty = true;
                    $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
                }
            }
            else AlertMessage.info('PalashIVF', 'You can not add new cycle close previous cycle first.');
        }
        else if ($scope.IsOverview) {
            $scope.disableClickART = true;    //Added by Nayan Kamble on 12/06/2019
            if ($scope.IsOverview && PrevCycleStatus) {       // PrevCycleStatus
            
                if ($scope.ValidateNewART()) {
                    var SelectedIndication = [];
                    var SelectedDrugs = [];
                    if (angular.isDefined(NewART.SelectedIndication)) {
                        angular.forEach(NewART.SelectedIndication, function (i) {
                            SelectedIndication.push(i.ID);
                        });
                        NewART.SelectedIndication = SelectedIndication.join(',');
                    };
                    if (angular.isDefined(NewART.SelectedDrugs)) {
                        angular.forEach(NewART.SelectedDrugs, function (i) {
                            SelectedDrugs.push(i.ID);
                        });
                        NewART.SelectedDrugs = SelectedDrugs.join(',');
                    };
                    NewART.LMP = $filter('date')(NewART.LMP, 'medium');
                    usSpinnerService.spin('GridSpinner');
                    var Response = srvNewART.SaveUpdate(NewART);
                    Response.then(function (resp) {
                        debugger;
                        if (resp.data == 1) {
                           // $scope.IsDonerCycleNeeded = false;                          //Added by Nayan Kamble                        
                            usSpinnerService.stop('GridSpinner');
                            AlertMessage.success('PalashIVF', 'Record saved successfully.');
                            $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
                            $scope.Cancel();
                        }
                        else if (resp.data == 2) {
                           // $scope.IsDonerCycleNeeded = false;                          //Added by Nayan Kamble  
                            PageConfig.setObj(NewART.ArtTypeID, NewART.ArtSubTypeID);
                            $scope.LoadData();
                            $scope.GetCycleOverview();
                            AlertMessage.success('PalashIVF', 'Record updated successfully.');
                            $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
                            $rootScope.CoupleDetails.SelectedTherapySourceOfSpermID = NewART.SourceOfSpermID; //by rohini to update sourche of sperm
                        }
                    }, function (error) {
                        AlertMessage.error('PalashIVF', 'Error occured.');
                        $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
                        usSpinnerService.stop('GridSpinner');
                    })
                }
                else {
                    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                    $scope.frmNewART.ddlProtocol.$dirty = true;
                    $scope.frmNewART.ddlArttype.$dirty = true;
                    $scope.frmNewART.ddlSourceOfSperm.$dirty = true;
                    $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
                }
            }
            else AlertMessage.info('PalashIVF', 'Cycle is closed,You can not update.');
            $scope.ClearSaveART();    //Added by Nayan Kamble on 12/06/2019
        }
    }

    $scope.ValidateNewART = function () {
        var IsValid = true;
        if (angular.isUndefined($scope.NewART.LMP) || $scope.NewART.LMP == '') {
            IsValid = false;
            $scope.errLMP = true;
        }
        if ($scope.NewART.ArtTypeID == 0 || $scope.NewART.ArtSubTypeID == 0) {
            IsValid = false;
        }
        if ($scope.NewART.ProtocolID == 0 && $scope.ProtocolMandatory) {
            IsValid = false;
        }
        //if ($scope.NewART.SourceOfSpermID == 0 && $scope.SOfSpermMandatory) {   //comented by Umesh as Excel given By Dr.Priyanka (Vikrant_ARTBugsByPriyanka)
        //    IsValid = false;
        //}
        //if ($scope.NewART.SourceOfSpermID == 3 && $scope.NewART.DonorSpermCollMethodID == 0) {
        //    IsValid = false;
        //    $scope.frmNewART.ddlDonorSpermCollMethod.$dirty = true;
        //}
        if (angular.isUndefined($scope.NewART.SelectedIndication) || $scope.NewART.SelectedIndication == '') {
            debugger;
            $scope.IsValidIndication = true;
            IsValid = false;
        }
        return IsValid;
    }

    $scope.GetLatestLMPDate = function () {
        $scope.IsSixthResponse = false;
        usSpinnerService.spin('GridSpinner');
        var Response = srvNewART.GetLatestLMPDate();
        Response.then(function (resp) {
            usSpinnerService.stop('GridSpinner');
            $scope.IsSixthResponse = true;
            $scope.GetAllResponse();
            if (resp.data != null)
                $scope.NewART.LMP = new Date(resp.data);
            else $scope.NewART.LMP = '';
        }, function (error) {
            $scope.IsSixthResponse = true;
            $scope.GetAllResponse();
            AlertMessage.info('PalashIVF', 'Error Occured.');
        })
    }

    $scope.GetMedicalHistory = function () {
        $scope.IsSeventhResponse = false;
        usSpinnerService.spin('GridSpinner');
        var Response = srvNewART.GetMedicalHistory();
        Response.then(function (resp) {
            if (resp.data != null) {
                $scope.NewART.MedicalHistory='';
                if (resp.data.IsDiabetes)
                    $scope.NewART.MedicalHistory = 'Diabetes, ';
                if (resp.data.IsCardiacDisease)
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory + 'Cardiac Disease, ';
                if (resp.data.IsHypertension)
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory + 'Hypertension, ';
                if (resp.data.IsThyroidDisorder)
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory + 'Thyroid Disorder, ';
                if (resp.data.IsTuberculosis)
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory + 'Tuberculosis, ';
                if (resp.data.IsPelvicInfection)
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory + 'Pelvic Infection, ';
                if (resp.data.IsBleedingDisorders)
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory + 'Bleeding Disorders, ';
                if (resp.data.IsMalignancy)
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory + 'Malignancy, ';
                if (resp.data.IsOther)
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory + 'Others';
                if ($scope.NewART.MedicalHistory == null) $scope.NewART.MedicalHistory = '';
                if ($scope.NewART.MedicalHistory.trim().slice(-1) == ',')
                    $scope.NewART.MedicalHistory = $scope.NewART.MedicalHistory.trim().slice(0, -1);
                if ($rootScope.FormName == 'New Cycle') {
                    $scope.NewART.ArtTypeID = resp.data.ArtTypeID;
                    $scope.GetArtSubTypeList();
                    $scope.NewART.ArtSubTypeID = resp.data.ArtSubTypeID;
                    $scope.NewART.InvID = resp.data.InvID;
                    debugger;
                    $scope.ShowHideControls($scope.NewART.ArtTypeID, $scope.NewART.ArtSubTypeID);
                    $scope.NewART.DonorID = resp.data.DonorID;
                    $scope.NewART.DonorUnitID = resp.data.DonorUnitID;

                }
                PrevCycleStatus = resp.data.PrevcycleStatus;
                $scope.IsSeventhResponse = true;
                $scope.GetAllResponse();
            }

            //var PrevCycleStatus = resp.data.PrevcycleStatus;
            //$scope.IsSeventhResponse = true;
            //$scope.GetAllResponse();

        }, function (error) {
            $scope.IsSeventhResponse = true;
            $scope.GetAllResponse();
            AlertMessage.info('PalashIVF', 'Error Occured.');
        })
    }

    $scope.GetAllResponse = function () {

        if (!$scope.IsOverview) {
            if ($scope.IsFirstResponse == true && $scope.IsSecondResponse == true
                && $scope.IsFourthResponse == true && $scope.IsFifthResponse == true && $scope.IsSixthResponse == true && $scope.IsSeventhResponse == true) {
                usSpinnerService.stop('GridSpinner');
            }
        } else {
            if ($scope.IsFirstResponse == true && $scope.IsSecondResponse == true
               && $scope.IsFourthResponse == true && $scope.IsFifthResponse == true) {
                usSpinnerService.stop('GridSpinner');
            }

        }
    };
    $scope.IsFinalizeSemen = false;
    $scope.GetCycleOverview = function () {
        debugger;
        var Promise = srvNewART.GetCycleOverview();
        Promise.then(function (resp) {
            debugger;
            $scope.NewART = {};
            $scope.NewART = resp.data;
            $scope.GetMedicalHistory();
            $scope.GetArtSubTypeList();
            $scope.NewART.LMP = new Date(resp.data.LMP);
            //by rohini to hide source of sperm after semen details finalized
            if (resp.data.IsFinalizeSemen == true) {
                $scope.IsFinalizeSemen = true;
            }
            else
                $scope.IsFinalizeSemen = false;
            debugger;
            $scope.ShowHideControls($scope.NewART.ArtTypeID, $scope.NewART.ArtSubTypeID);

            if (!$scope.NewART.Status)
                angular.element(btnSaveOverview).prop('disabled', true);
            if (resp.data.SelectedIndication != null && resp.data.SelectedIndication != '' && resp.data.SelectedIndication != undefined) {
                angular.forEach(resp.data.SelectedIndication.split(','), function (z) {
                    // $scope.IndicationList[$scope.IndicationList.findIndex(x=>x.ID == i)].ticked = true;
                    for (var i = 0; i < $scope.IndicationList.length; ++i) {
                        if ($scope.IndicationList[i].ID == z) {
                            $scope.IndicationList[i].ticked = true;
                            break;
                        }
                    }
                });
            }
            debugger;
            if (resp.data.SelectedDrugs != null && resp.data.SelectedDrugs != '' && resp.data.SelectedDrugs != undefined) {
                angular.forEach(resp.data.SelectedDrugs.split(','), function (j) {
                    // $scope.StimlnDrugList[$scope.StimlnDrugList.findIndex(x=>x.ID == j)].ticked = true;
                    for (var i = 0; i < $scope.StimlnDrugList.length; ++i) {
                        debugger;
                        if ($scope.StimlnDrugList[i].ID == j) {
                            $scope.StimlnDrugList[i].ticked = true;
                            break;
                        }
                    }
                })
            }
            debugger;
            //rohini
            if ($scope.NewART.IsPAC == true)
                $scope.PACClass = "ActiveIcon";
            else
                $scope.PACClass = "DeActiveIcon";
            $rootScope.ForConsent = 1; //after selection of cycle
            if (resp.data.ConsentStatus == 1)
                $scope.ConsentIcon = "greenColor glyphicon glyphicon-stop";
            else if (resp.data.ConsentStatus == 2)
                $scope.ConsentIcon = "yellowColor glyphicon glyphicon-stop";
            else if (resp.data.ConsentStatus == 3)
                $scope.ConsentIcon = "RedColor glyphicon glyphicon-stop";
            else if (resp.data.ConsentStatus == 4)
                $scope.IsConsent = 1;

            $timeout(function () {
                $scope.GetDetails();
            }, 2500);

        }, function (error) {
        })
    }

    $scope.GetDetails = function () {
        var Promise = srvNewART.GetDetails();
        Promise.then(function (resp) {
            debugger;
            $scope.lstInvestigation = resp.data.lstInvestigation;
            $scope.lstPrescription = resp.data.lstPrescription;
            $scope.lstBirthDetails = resp.data.lstBirthDetails;
            if (resp.data.lstBirthDetails.length > 0) {
                $scope.Pregnancy = $scope.lstBirthDetails[0].Pregnancy;
                $scope.WeaksOfgestation = $scope.lstBirthDetails[0].WeaksOfgestation;
                $scope.DeliveryType = $scope.lstBirthDetails[0].DeliveryType;
            }
            $scope.objStimulation = resp.data.objStimulation;
            $scope.objOPU = resp.data.objOPU;
            if ($scope.objOPU.IsFinalize == true)
                $scope.NewART.IsFinalize = true;
            $scope.objTrigger = resp.data.objTrigger;
            $scope.lstOutcome = resp.data.lstOutcome;
            $scope.lstETDetails = resp.data.lstETDetails;
            $scope.count = 0;
            $scope.BlastoCyctcount = 0;
            if ($scope.lstETDetails.length > 0) {
                $scope.ETFinalize = $scope.lstETDetails[0].Finalize;
                angular.forEach($scope.lstETDetails, function (i) {
                    if (['Day1', 'Day2', 'Day3', 'Day4'].indexOf(i.TransferDay) > -1) {
                        $scope.count = $scope.count + 1;
                        $scope.CellGrade = i.CellStage + '/' + i.Grade + ',';
                    }
                    else if (['Day5', 'Day6'].indexOf(i.TransferDay) > -1) {
                        $scope.BlastoCyctcount = $scope.BlastoCyctcount + 1;
                        $scope.BlastoCyctCellGrade = i.CellStage + '/' + i.Grade + ',';
                    }
                });
                if (angular.isUndefined($scope.CellGrade)) $scope.CellGrade = '';
                if ($scope.CellGrade.slice(-1) == ',')
                    $scope.CellGrade = $scope.CellGrade.slice(0, -1);
                if ($scope.BlastoCyctCellGrade != undefined && $scope.BlastoCyctCellGrade != null) {
                    if ($scope.BlastoCyctCellGrade.slice(-1) == ',')
                        $scope.BlastoCyctCellGrade = $scope.BlastoCyctCellGrade.slice(0, -1);
                }
                if ($scope.CellGrade.slice(-1) == '/')
                    $scope.CellGrade = $scope.CellGrade.slice(0, -1);
                if ($scope.BlastoCyctCellGrade != undefined && $scope.BlastoCyctCellGrade != null) {
                    if ($scope.BlastoCyctCellGrade.slice(-1) == '/')
                        $scope.BlastoCyctCellGrade = $scope.BlastoCyctCellGrade.slice(0, -1);
                }
            }
        }, function (error) {
        })
    }

    $scope.ShowHideControls = function (ID, SubID) {
        $scope.ProtocolMandatory = false;
        $scope.hideSOfSperm = false;
        $scope.disableSOfSperm = false;
        $scope.SOfSpermMandatory = false;
        debugger;
        //$scope.NewART.SourceOfSpermID = 0;
        if (ID == 2 && SubID == 1) {
            $scope.ProtocolMandatory = true;
            $scope.hideSOfSperm = true;
           // $scope.NewART.SourceOfSpermID = 0; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }
        else if (ID == 2 && SubID == 2) {
            $scope.ProtocolMandatory = true;
            $scope.disableSOfSperm = true;
           // $scope.NewART.SourceOfSpermID = 1; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }
        else if (ID == 2 && [3, 22].indexOf(SubID) > -1) {
            $scope.ProtocolMandatory = true;
            $scope.disableSOfSperm = true;
         //   $scope.NewART.SourceOfSpermID = 2; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }
        else if (ID == 1 && [21, 8, 31].indexOf(SubID) > -1) {  //, 10
            $scope.ProtocolMandatory = true;
            $scope.hideSOfSperm = true;
       //     $scope.NewART.SourceOfSpermID = 0; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }
        else if (ID == 1 && [4, 5, 6, 7, 9, 23, 24, 25].indexOf(SubID) > -1) {   //11, 12,
            $scope.ProtocolMandatory = true;
          //  $scope.SOfSpermMandatory = true;  //commented by sujata for cross clinic for mandatory
          
           
        }

        else if (ID == 1 && [10,11,12].indexOf(SubID) > -1) {          //added sujata for cross clinic
            $scope.ProtocolMandatory = true;
         
            $scope.hideSOfSperm = true;          
        //     $scope.NewART.SourceOfSpermID = 0; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }

        else if (ID == 4 && SubID == 13) {
            $scope.ProtocolMandatory = false;
            $scope.SOfSpermMandatory = true;
        }
        else if (ID == 3 && SubID == 14) {
            $scope.ProtocolMandatory = false;
            $scope.hideSOfSperm = true;
          //  $scope.NewART.SourceOfSpermID = 0; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }
        else if (ID == 7 && [15, 16, 17, 26, 27, 28].indexOf(SubID) > -1) {
            $scope.ProtocolMandatory = false;
            //$scope.hideSOfSperm = true;          // alllredy added commented by sua
            // $scope.NewART.SourceOfSpermID = 0;
            $scope.hideSOfSperm = false;      // as per mangesh sir discussion show source of sperm for couple 
          //  $scope.NewART.SourceOfSpermID =1; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }
        else if (ID == 7 && [18, 28].indexOf(SubID) > -1) {
            $scope.ProtocolMandatory = false;
            $scope.disableSOfSperm = true;
          //  $scope.NewART.SourceOfSpermID = 1; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }
        else if (ID == 8 && [19, 20, 29, 30].indexOf(SubID) > -1) {
            $scope.ProtocolMandatory = false;
            $scope.hideSOfSperm = true;
         //   $scope.NewART.SourceOfSpermID = 0; // as per mangesh sir discussion show source of sperm which is saved in backend - Tejas Saxena
        }
        if ($scope.IsFinalizeSemen == true)
            $scope.disableSOfSperm = true;

    }

    $scope.ViewReport = function (ID, UnitID) {
        var Promise = srvNewART.ViewReport(ID, UnitID);
        Promise.then(function (resp) {
            if (resp.data != null) {
                $scope.extn = resp.data.strReport.substring(resp.data.strReport.indexOf(':') + 1, resp.data.strReport.indexOf('/'));
                $scope.FileName = resp.data.FileName;
                if ($scope.extn == 'image') {
                    $scope.Image = resp.data.strReport;
                    $scope.content = '';
                }
                else {
                    $scope.content = resp.data.strReport;
                    $scope.Image = null;
                    //window.open($scope.content);
                }
                angular.element(myModal).modal('show');
            }
        }, function (error) {
        })
    }

    //  ART Cycle Code Start

    $scope.GetARTCycleList = function () {
        debugger;
        $rootScope.CycleDetails = null;
        $rootScope.IsFemaleActive = true;
        $rootScope.IsMaleActive = false;
        $rootScope.FormName = 'Cycle List';
        usSpinnerService.spin('GridSpinner');
        //New Cycle Flag check If Procedure not add then diasable added by vikrant
        var Response = srvNewART.newCyclebtnFlag();
        Response.then(function (resp1) {
            debugger;
            if(resp1.data == 0)
            {
                $scope.ArtbtnFlag = false;
            }
            else if (resp1.data == 2)
            {
                if($scope.IsDonerCycleNeeded)   // = true;     //
                AlertMessage.info('PalashIVF', 'Create Donor Cycle First');
                $scope.ArtbtnFlag = false;
            }
          
            else
            {
               // $scope.IsDonerCycleNeeded = false;   //Added by Nayan Kamble
                $scope.ArtbtnFlag = true;
            }
        }, function (error) {
            //AlertMessage.info('PalashIVF', 'Error Occured.');
            usSpinnerService.stop('GridSpinner');
        });

        var Response = srvNewART.GetARTCycleList();
        Response.then(function (resp) {
            usSpinnerService.stop('GridSpinner');
            $scope.ARTCycleList = resp.data;
            //if ($scope.ARTCycleList[0].Status)
            //    angular.element(btnNewCycle).prop('disabled', true);
            //else angular.element(btnNewCycle).prop('disabled', false);
        }, function (error) {
            //AlertMessage.info('PalashIVF', 'Error Occured.');
            usSpinnerService.stop('GridSpinner');
        })
    }

    $scope.CycleNavigate = function (item) {
        debugger;
        $rootScope.OrderList = 1;
        var SelCouple = Common.getSelectedCouple();
        SelCouple.FemalePatient.TherapyID = item.ID;
        SelCouple.FemalePatient.TherapyUnitID = item.UnitID;
        SelCouple.FemalePatient.ArtTypeID = item.ArtTypeID;
        SelCouple.FemalePatient.ArtSubTypeID = item.ArtSubTypeID;
        SelCouple.FemalePatient.ARTType = item.ARTType;
        SelCouple.FemalePatient.ARTSubType = item.ARTSubType;
        SelCouple.FemalePatient.DonarName = item.Donor;
        SelCouple.FemalePatient.DonarCode = item.DonorCode;
        SelCouple.FemalePatient.SurrogateMRno = item.SurrogateMRno;   //Added by Nayan Kamble
        SelCouple.FemalePatient.CycleCode = item.CycleCode;
        SelCouple.FemalePatient.DonorCycleCode = item.DonorCycleCode;
        SelCouple.FemalePatient.IsCancelCycle = item.IsCancel;
        SelCouple.FemalePatient.IsCloseCycle = item.Status;
        SelCouple.FemalePatient.LMP = item.LMP;
        //   $rootScope.CoupleDetails.MalePatient;
        $rootScope.CoupleDetails.SelectedTherapyCycleCode = item.CycleCode;
        $rootScope.CoupleDetails.SelectedTherapySourceOfSpermID = item.SourceOfSpermID;
        $rootScope.CoupleDetails.SelectedTherapyPartnrSpermCollMethod = item.PartnrSpCollMethod;
        $rootScope.CoupleDetails.LMP = item.LMP;
        $rootScope.CoupleDetails.SelectedTherapyDonorSpermCollMethod = (item.DonorSpCollMethod == undefined || item.DonorSpCollMethod == "" ? item.PartnrSpCollMethod : item.DonorSpCollMethod);
        Common.setSelectedCouple(SelCouple);
        debugger;
        Common.SetTherapyDetails(item.ID, item.UnitID, item.ArtTypeID, item.ArtSubTypeID);
        PageConfig.setObj(item.ArtTypeID, item.ArtSubTypeID);
        $location.path('/CycleOverview/');
    }

    $scope.fClick = function (data) {
        if ($scope.NewART.SelectedDrugs.length > 3) {
            AlertMessage.info('PalashIVF', 'You can select only three drugs.');
            $scope.NewART.SelectedDrugs.splice(3, 1);
            //   var idx = $scope.StimlnDrugList.findIndex(x=>x.ID == data.ID);
            //  $scope.StimlnDrugList[$scope.StimlnDrugList.findIndex(x=>x.ID == data.ID)].ticked = false;
            for (var i = 0; i < $scope.StimlnDrugList.length; ++i) {
                if ($scope.StimlnDrugList[i].ID == data.ID) {
                    $scope.StimlnDrugList[i].ticked = false;
                    break;
                }
            }
        }
    }

    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }

    $scope.CloseCycle = function () {
        var Response = srvNewART.CloseCycle($scope.CycleIDs.ID, $scope.CycleIDs.UnitID);
        Response.then(function (resp) {
            if (resp.data == 1) {
                angular.element(mdlCloseCycle).modal('hide');
                AlertMessage.success('PalashIVF', 'Cycle closed successfully.');
                $scope.ARTCycleList[$scope.ARTCycleList.findIndex(y=>y.ID == $scope.CycleIDs.ID && y.UnitID == $scope.CycleIDs.UnitID)].Status = false;
                if ($scope.ARTCycleList.every(function (z) {
                 if (z.Status == false)
                 return true;
                else return false;
                })) {
                    //angular.element(btnNewCycle).prop('disabled', false);
                    selectCouple.FemalePatient.IsCloseCycle = true;
                    Common.setSelectedCouple(selectCouple);
                }
               // $scope.ARTCycleList[$scope.ARTCycleList.findIndex(y=>y.ID == $scope.CycleIDs.ID && y.UnitID == $scope.CycleIDs.UnitID)].Status = false;
                //if ($scope.ARTCycleList.every(function (z) {
                //    return z.Status == false;
                //})) {
                //    debugger;
                //    selectCouple.FemalePatient.IsCloseCycle = true;
                //    Common.setSelectedCouple(selectCouple);
                //}
            }
            else if (resp.data == 2) {
                angular.element(mdlCloseCycle).modal('hide');
                AlertMessage.info('PalashIVF', 'Cycle already closed.');
            }
        }, function (error) {
            //AlertMessage.info('PalashIVF', 'Error Occured.');
        })
    }

    $scope.PACClick = function (NewART) {
        //swalMessages.MessageBox('PalashIVF', "Are You Sure You Want To Check/Uncheck ?", "warning", function (isConfirmed) {
        //    if (isConfirmed) {
        //        if (NewART.IsPAC == true)
        //            NewART.IsPAC = false;
        //        else
        //            NewART.IsPAC = true;
        //        var Response = srvNewART.UpdatePAC(NewART.ID, NewART.UnitID, NewART.IsPAC);
        //        Response.then(function (resp) {
        //            if (resp.data == 1) {
        //                $scope.GetCycleOverview();
        //            }
        //        });
        //    }
        //    else {
        //        //AlertMessage.success("Please Save Drgs Added To Set Fav List First");
        //    }
        //});
        debugger;
        var modalInstance = $uibModal.open({ 
            templateUrl: 'PACDetails',
            controller: 'PACCtrl',
            backdrop: false,
            keyboard: false,
            size: 'lg'
        });
        modalInstance.result.then(function (data) { 
            if (!angular.equals({}, data)) {
                //Check sucess stauts
                if (data == 1) {
                    $scope.PACClass = "ActiveIcon";
                    AlertMessage.success("PalashIVF", objResource.msgSave);
                }
                else {
                    AlertMessage.error("PalashIVF", objResource.msgError);
                }
            }
        });
    }
    //  ART Cycle Code End

    $scope.PrintSummary = function (ThID, ThuID, TID, STID) {
        debugger;
        var a = encodeURIComponent('P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID +
            '&Th=' + ThID + '&THU=' + ThuID + '&UN=' + localStorageService.get("UserInfo").UserName);
        if (TID == 1 && [21, 31].indexOf(STID) > -1) {  //Oocyte Freezing
          // window.open('/Reports/ART/OocyteFreezingCycle/OocyteFreezingCycleReportWF.aspx?' + encodeURIComponent(a), '_blank');
            window.open('/Reports/ART/OocyteFreezingCycle/NewOocyteFreezingCycle.aspx?' + encodeURIComponent(a), '_blank');
        }
        else if (TID == 3)
        {
       // ([3, 8].indexOf(TID) > -1 && [14,20,30].indexOf(STID) > -1) {  //FET
            //window.open('/Reports/ART/ARTSummary/FET/ARTSummaryWF_FET.aspx?' + encodeURIComponent(a), '_blank');
            window.open('/Reports/ART/ARTSummary/FET/NewARTSummaryFET.aspx?' + encodeURIComponent(a), '_blank');
        }
        else if (TID == 2) {
           // window.open('/Reports/ART/IUICycle/IUICycleWF.aspx?' + encodeURIComponent(a), '_blank');
            window.open('/Reports/ART/IUICycle/NewIUICycle.aspx?' + encodeURIComponent(a), '_blank');
        }
        else {
            //window.open('/Reports/ART/ARTSummary/ARTSummaryWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            window.open('/Reports/ART/ARTSummary/NewArtSummary.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
        }
    }
    $scope.PrintEmbryologySummary = function (ThID, ThuID, TID, STID) {
        debugger;
        var a = encodeURIComponent('P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID +
           '&Th=' + ThID + '&THU=' + ThuID + '&UN=' + localStorageService.get("UserInfo").UserName);
        //if (TID == 1 && [21, 31].indexOf(STID) > -1) {
            window.open('/Reports/ART/ARTSummary/Separate_Embryology_Report/EmbryologyReport.aspx?' + encodeURIComponent(a), '_blank');
       // }
    }
    
})

