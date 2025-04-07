angular.module('PIVF').controller('SemenDetailsController', function ($scope, $rootScope, $filter, $location, SemenDetailsService, localStorageService, IUISrv, Common, srvCommon, $uibModal, $window, AlertMessage, swalMessages, PageConfig) {   //, usSpinnerService, crumble
    $rootScope.FormName = "Semen Details";
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $scope.SemenDetails = {};
    $scope.SemenDetails.ListFreezThawSamples = [];
    $scope.IsSourceOfSpermShow = true;
    $scope.PartnerSpermiogramData = [];
    $scope.PartnerSpermiogramDataByMRNo = [];
    $scope.FreezSamplesLists = [];
    $rootScope.ForMedia = 1;
    $rootScope.OrderList = 0;
    $rootScope.ForConsent = 0;
    $scope.ShowPartnerSpermiogram = false;
    $scope.ShowDonorSpermiogram = true;
    /*Disabled donor assessment fields */
    $scope.DonorVolumePreWashDisabled = false;
    $scope.DonorVolumePostWashDisabled = false;
    $scope.DonorSPPreWashDisabled = false;
    $scope.DonorSPPostWashDisabled = false;
    $scope.DonorTSCPreWashDisabled = false;
    $scope.DonorTCSPostWashDisabled = false;
    $scope.DonorMotilityPreWashDisabled = false;
    $scope.DonorMotilityPostWashDisabled = false;
    $scope.AlreadyGet = false;
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();

    $scope.ismeridian = true;
    // For Date-Picker
    //For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(),//.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.IsSave = false;  //check if Finalized
    $scope.popupP = {
        openedP: false
    };
    $scope.openP = function ($event, item) {

        $event.preventDefault();
        $event.stopPropagation();
        item.openedP = true;
    };

    /* START for Resource */
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    /*END of Resource*/

    $scope.PageInitilization = function PageInitilization() {
        if ($rootScope.CoupleDetails != undefined && $rootScope.CoupleDetails != null) {
            if ($rootScope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                $scope.IsSaveDisabled = true;
            }
            if ($rootScope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
                $scope.IsSaveDisabled = true;
            }
        }
        if (!angular.isUndefined(localStorageService.get('FromSemenPreparation')) && localStorageService.get('FromSemenPreparation')) {
            $scope.LoadSourceOfSpermData();
            //$scope.LoadPartnerSpermiogramData();
            $scope.LoadDonorData();
            $scope.GetEmbryologyDoctorsList();
            //$scope.LoadDonorSpermiogram("");
            $scope.SemenDetails = JSON.parse(localStorage.getItem("SemenDetailsPreseveData"));
            localStorageService.remove('FromSemenPreparation');
            localStorage.removeItem("SemenDetailsPreseveData");
            //localStorage.removeItem("SemenPreparationData");
        } else {
            $scope.LoadSourceOfSpermData();
            //$scope.LoadPartnerSpermiogramData();
            $scope.GetEmbryologyDoctorsList();
            $scope.LoadSpermPreparationMethodData();
            if (!angular.isUndefined($rootScope.CoupleDetails.FemalePatient.TherapyID) && !angular.isUndefined($rootScope.CoupleDetails.FemalePatient.TherapyUnitID) && !angular.isUndefined($rootScope.CoupleDetails.SelectedTherapyCycleCode)) {
                $scope.LoadAllSemenDetailsData($rootScope.CoupleDetails.FemalePatient.TherapyID, $rootScope.CoupleDetails.FemalePatient.TherapyUnitID, $rootScope.CoupleDetails.SelectedTherapyCycleCode);
            }

            //$scope.LoadDonorData();
            //$scope.LoadDonorSpermiogram("");
        }
    }

    $scope.LoadAllSemenDetailsData = function LoadAllSemenDetailsData(TherapyID, TherapyUnitID, SelectedTherapyCycleCode) {
        debugger;
        var ResponseData = SemenDetailsService.LoadAllSemenDetailsData(TherapyID, TherapyUnitID, SelectedTherapyCycleCode);
        ResponseData.then(function (Response) {
            debugger;
            $scope.SemenDetails = Response.data;
            if (!angular.isUndefined($scope.SemenDetails) && $scope.SemenDetails != null) {
                if ($scope.SemenDetails.IsFinalize) {
                    $scope.IsSaveDisabled = true;
                }

                if (!angular.isUndefined($scope.SemenDetails.SelectedMRNoOrDonorID) && !isNaN($scope.SemenDetails.SelectedMRNoOrDonorID) && $scope.SemenDetails.SelectedMRNoOrDonorID != null) {
                    $scope.SelectedDonorID = $scope.SemenDetails.SelectedMRNoOrDonorID;
                    $scope.SelectedDonorUnitID = $scope.SemenDetails.SelectedMRNoOrDonorUnitID;
                    $scope.LoadDonorSpermiogram($scope.SemenDetails.SelectedMRNoOrDonorID);
                    $scope.MRNoOrDonorCode = $scope.SemenDetails.SelectedDonorCode;
                    $scope.DisableEnabledControlsOfDonorCode();
                } else {
                    $scope.MRNoOrDonorCode = $scope.SemenDetails.SelectedMRNo;
                    $scope.DisableEnabledControlsOfMRNo();
                    if ($scope.SemenDetails.PartnerSpermPreparationMethodID == undefined) {
                        $scope.SemenDetails.PartnerSpermPreparationMethodID = 0;
                    }
                    if ($scope.SemenDetails.PartnerSpermPreparationMethodUnitID == undefined) {
                        $scope.SemenDetails.PartnerSpermPreparationMethodUnitID = 0;
                    }
                    if ($scope.SemenDetails.DonorSpermPreparationMethodID == undefined) {
                        $scope.SemenDetails.DonorSpermPreparationMethodID = 0;
                    }
                    if ($scope.SemenDetails.DonorSpermPreparationMethodUnitID == undefined) {
                        $scope.SemenDetails.DonorSpermPreparationMethodUnitID = 0;
                    }
                }
            } else {
                $scope.SemenDetails.PartnerSpermPreparationMethodID = 0;
                $scope.SemenDetails.DonorSpermPreparationMethodID = 0;
                $scope.SemenDetails.PartnerSpermPreparationMethodUnitID = 0;
                $scope.SemenDetails.DonorSpermPreparationMethodUnitID = 0;
            }
            $scope.SemenDetails.SourceOfSpermID = $rootScope.CoupleDetails.SelectedTherapySourceOfSpermID;
            $scope.SemenDetails.CycleCode = $rootScope.CoupleDetails.SelectedTherapyCycleCode;
            $scope.SemenDetails.PartnerMethodOfSperm = $rootScope.CoupleDetails.SelectedTherapyPartnrSpermCollMethod;
            $scope.SemenDetails.DonorMethodOfSperm = $rootScope.CoupleDetails.SelectedTherapyDonorSpermCollMethod;

            if ($scope.SemenDetails.IsPrtnerAsDonor == true) {
                $scope.ShowPartnerSpermiogram = false;
                $scope.ShowDonorSpermiogram = true;
                $scope.MRNoOrDonorCode = $scope.SemenDetails.SelectedDonorCode;
            }
            else {
                $scope.ShowPartnerSpermiogram = true;
                $scope.ShowDonorSpermiogram = false;
                $scope.MRNoOrDonorCode = $scope.SemenDetails.SelectedMRNo;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.LoadSourceOfSpermData = function LoadSourceOfSpermData() {

        var ResponseData = Common.getMasterList('M_SourceofSperm', 'SourceSpermID', 'SourceSpermDescription');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SourceOfSpermList = Response.data;
            if ($scope.SemenDetails.SourceOfSpermID == undefined) {
                $scope.SemenDetails.SourceOfSpermID = $rootScope.CoupleDetails.SelectedTherapySourceOfSpermID;
            }
            //Load Donor data typewise
            $scope.LoadDonorData($scope.SemenDetails.SourceOfSpermID);
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.LoadSpermPreparationMethodData = function LoadSpermPreparationMethodData() {

        var ResponseData = Common.getMasterList('M_IVF_MethodOfSpermPreparationMaster', 'IVFMOSPID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SpermPreparationMethodList = Response.data;
            if ($scope.SemenDetails.PartnerSpermPreparationMethodID == undefined) {
                $scope.SemenDetails.PartnerSpermPreparationMethodID = 0;
            }
            if ($scope.SemenDetails.PartnerSpermPreparationMethodUnitID == undefined) {
                $scope.SemenDetails.PartnerSpermPreparationMethodUnitID = 0;
            }
            if ($scope.SemenDetails.DonorSpermPreparationMethodID == undefined) {
                $scope.SemenDetails.DonorSpermPreparationMethodID = 0;
            }
            if ($scope.SemenDetails.DonorSpermPreparationMethodUnitID == undefined) {
                $scope.SemenDetails.DonorSpermPreparationMethodUnitID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    //$scope.LoadPartnerSpermiogramData = function LoadPartnerSpermiogramData() {
    //    debugger;
    //    var ResponseData = SemenDetailsService.LoadPartnerSpermiogramData();
    //    ResponseData.then(function (Response) {
    //        debugger;
    //        $scope.PartnerSpermiogramData = Response.data;
    //    }, function (error) {
    //        $scope.Error = error;
    //    });
    //}

    $scope.LoadDonorData = function LoadDonorData(SourceOfSpermID) {

        var ResponseData = SemenDetailsService.LoadDonorData(SourceOfSpermID);
        ResponseData.then(function (Response) {

            $scope.DonorData = Response.data;
            $scope.allItems = $scope.DonorData;
            if ($scope.searchText == '' || $scope.searchText == undefined) {
                $scope.filteredList = $scope.allItems;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.GetEmbryologyDoctorsList = function GetEmbryologyDoctorsList() {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data.EmbryologistAndrologist;
            $scope.SemenDetails.CheckedByDoctorID = 0;
            $scope.SemenDetails.WitnessByID = 0;
            $scope.SemenDetails.InSeminatedByID = 0;
        }, function (error) {
        });
    };

    $scope.LoadDonorSpermiogram = function (DonorCode) {

    }
    $scope.UpdateRemainingVolume = function (Item) {
        debugger;
        //angular.forEach($scope.FreezSamplesLists, function (item) {
        //    if (item.DetailID == Item.FreezDetailID && item.UnitID == Item.FreezDetailUnitID) {
        //        //Item.Volume = item.Volume;
        //        Item.RemainingVolume = item.Volume - Item.Volume;
        //    }
        //});
        if (Item.OriginalVolume < Item.Volume) {
            Item.Volume = Item.OriginalVolume;
            AlertMessage.info("Please Select valid volume");
        }
    }
    $scope.IsEnableAdd = true;
    $scope.chkFreezSample = function chkFreezSample(Item, Index) {
        debugger;
        $scope.IsEnableAdd = false;
        var stringCryoNo = "";
        $scope.SemenDetails.ListFreezThawSamples = []; //only one freeez sample
        $scope.ItemDetails = {};
        $scope.ItemDetails.FreezDetailID = Item.DetailID;
        $scope.ItemDetails.UnitID = Item.UnitID;
        $scope.ItemDetails.FreezDetailUnitID = Item.UnitID;
        $scope.ItemDetails.OriginalVolume = Item.Volume;
        $scope.ItemDetails.Volume = Item.Volume;
        $scope.ItemDetails.RemainingVolume = 0;
        $scope.ItemDetails.SpermConcentration = Item.SpermConcentration;
        $scope.ItemDetails.SpermCount = Item.SpermCount;
        $scope.ItemDetails.GradeA = Item.GradeA;
        $scope.ItemDetails.GradeB = Item.GradeB;
        $scope.ItemDetails.GradeC = Item.GradeC;
        $scope.ItemDetails.Motility = Item.Motility;
        $scope.ItemDetails.CryoNo = Item.CryoNo;
        $scope.ItemDetails.Tank = Item.Tank;
        $scope.ItemDetails.Canister = Item.Canister;
        $scope.ItemDetails.Cane = Item.Cane;
        $scope.ItemDetails.Straw = Item.Straw;
        $scope.ItemDetails.WitnessedBy = 0;
        $scope.ItemDetails.DoneBy = 0;
        $scope.ItemDetails.DonorID = $scope.SemenDetails.SelectedMRNoOrDonorID;
        $scope.ItemDetails.DonorUnitID = $scope.SemenDetails.SelectedMRNoOrDonorUnitID;
        $scope.ItemDetails.ThawingDate = new Date();
        $scope.ItemDetails.ThawingTime = new Date();
        $scope.SemenDetails.ListFreezThawSamples.push($scope.ItemDetails);
        $scope.ThowDate1 = $scope.ItemDetails.ThawingDate;
        $scope.ThowTime1 = $scope.ItemDetails.ThawingTime;

        angular.forEach($scope.SemenDetails.ListFreezThawSamples, function (item) {
            if (stringCryoNo == "") {
                stringCryoNo = item.CryoNo;
            }
            else {
                stringCryoNo = stringCryoNo + ',' + item.CryoNo;
            }
        })
        $scope.SemenDetails.CryNo = stringCryoNo;
        $scope.SemenDetails.ThawDate = new Date($scope.ThowDate1);
        $scope.SemenDetails.ThawTime = new Date($scope.ThowTime1);

    }

    $scope.FetchPartnerPreparationAssesment = function FetchPartnerPreparationAssesment(SelectedSNo, Value) {
        debugger;
        var ResponseData = SemenDetailsService.FetchPartnerPreparationAssesment(SelectedSNo);
        ResponseData.then(function (Response) {
            debugger;
            $scope.PartnerPreparationAssesmentData = Response.data;
            //set all partner preparation assessment data
            if (Value == 1) {
                $scope.SemenDetails.VolumePreWash = $scope.PartnerPreparationAssesmentData.PreVolume;
                $scope.SemenDetails.VolumePostWash = $scope.PartnerPreparationAssesmentData.PostVolume;
                $scope.SemenDetails.SPPreWash = $scope.PartnerPreparationAssesmentData.PreSpermConcentration;
                $scope.SemenDetails.SPPostWash = $scope.PartnerPreparationAssesmentData.PostSpermConcentration;
                $scope.SemenDetails.TCSPreWash = $scope.PartnerPreparationAssesmentData.PreSpermCount;
                $scope.SemenDetails.TCSPostWash = $scope.PartnerPreparationAssesmentData.PostSpermCount;
                $scope.SemenDetails.MotilityPreWash = $scope.PartnerPreparationAssesmentData.PreMotility;
                $scope.SemenDetails.MotilityPostWash = $scope.PartnerPreparationAssesmentData.PostMotility;
                $scope.SemenDetails.PartnerSpermPreparationMethodID = $scope.PartnerPreparationAssesmentData.PartnerSpermPreparationMethodID;
                $scope.SemenDetails.PartnerSpermPreparationMethodUnitID = $scope.PartnerPreparationAssesmentData.PartnerSpermPreparationMethodUnitID;
                $scope.SemenDetails.PartnerSpermPreparationMethod = $scope.PartnerPreparationAssesmentData.PartnerSpermPreparationMethod;
            }
            else if (Value == 2) {
                $scope.SemenDetails.DonorVolumePreWash = $scope.PartnerPreparationAssesmentData.PreVolume;
                $scope.SemenDetails.DonorVolumePostWash = $scope.PartnerPreparationAssesmentData.PostVolume;
                $scope.SemenDetails.DonorSPPreWash = $scope.PartnerPreparationAssesmentData.PreSpermConcentration;
                $scope.SemenDetails.DonorSPPostWash = $scope.PartnerPreparationAssesmentData.PostSpermConcentration;
                $scope.SemenDetails.DonorTSCPreWash = $scope.PartnerPreparationAssesmentData.PreSpermCount;
                $scope.SemenDetails.DonorTCSPostWash = $scope.PartnerPreparationAssesmentData.PostSpermCount;
                $scope.SemenDetails.DonorMotilityPreWash = $scope.PartnerPreparationAssesmentData.PreMotility;
                $scope.SemenDetails.DonorMotilityPostWash = $scope.PartnerPreparationAssesmentData.PostMotility;
                $scope.SemenDetails.DonorSpermPreparationMethodID = $scope.PartnerPreparationAssesmentData.PartnerSpermPreparationMethodID;
                $scope.SemenDetails.DonorSpermPreparationMethodUnitID = $scope.PartnerPreparationAssesmentData.PartnerSpermPreparationMethodUnitID;
                $scope.SemenDetails.DonorSpermPreparationMethod = $scope.PartnerPreparationAssesmentData.PartnerSpermPreparationMethod;
            }

        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchDonorPreparationAssesment = function FetchDonorPreparationAssesment(SelectedSNo) {

        var ResponseData = SemenDetailsService.FetchPartnerPreparationAssesment(SelectedSNo);
        ResponseData.then(function (Response) {

            $scope.DonorPreparationAssesmentData = Response.data;
            //set all partner preparation assessment data
            $scope.SemenDetails.DonorVolumePreWash = $scope.DonorPreparationAssesmentData.PreVolume;
            $scope.SemenDetails.DonorVolumePostWash = $scope.DonorPreparationAssesmentData.PostVolume;
            $scope.SemenDetails.DonorSPPreWash = $scope.DonorPreparationAssesmentData.PreSpermConcentration;
            $scope.SemenDetails.DonorSPPostWash = $scope.DonorPreparationAssesmentData.PostSpermConcentration;
            $scope.SemenDetails.DonorTSCPreWash = $scope.DonorPreparationAssesmentData.PreSpermCount;
            $scope.SemenDetails.DonorTCSPostWash = $scope.DonorPreparationAssesmentData.PostSpermCount;
            $scope.SemenDetails.DonorMotilityPreWash = $scope.DonorPreparationAssesmentData.PreMotility;
            $scope.SemenDetails.DonorMotilityPostWash = $scope.DonorPreparationAssesmentData.PostMotility;
            $scope.SemenDetails.DonorSpermPreparationMethodID = $scope.PartnerPreparationAssesmentData.DonorSpermPreparationMethodID;
            $scope.SemenDetails.DonorSpermPreparationMethodUnitID = $scope.PartnerPreparationAssesmentData.DonorSpermPreparationMethodUnitID;
            $scope.SemenDetails.DonorSpermPreparationMethod = $scope.PartnerPreparationAssesmentData.DonorSpermPreparationMethod;
        }, function (error) {
            $scope.Error = error;
        });
    }



    /* START : Change events */
    $scope.EventSourceOfSpermChanged = function () {

        if ($scope.SemenDetails.SourceOfSpermID == 3) {
            $scope.IsSourceOfSpermShow = true;
            console.log($rootScope.CoupleDetails.FemalePatient.CycleCode);
        } else {
            $scope.IsSourceOfSpermShow = false;
        }
    }

    $scope.GoToSemenPrepration = function () {

        var msg = 'If you travel to semen preparation page then you may loss entered data';
        swalMessages.MessageBox(objResource.msgTitle, msg, "warning", function (isConfirmed) {
            if (isConfirmed) {
                //localStorage.setItem("SemenDetailsPreseveData", JSON.stringify($scope.SemenDetails));
                //localStorageService.setItem('FromSemenDetails', true);
                $location.path("/SemenPreparation");
            }
        });
    }

    /* START : Operations */
    $scope.SavePartnerSpermiogram = function SavePartnerSpermiogram() {
        debugger;
        // $scope.SemenDetails.FinalDonorSpermioSRNo = $scope.SemenDetails.DonorSpermioSRNo;
        $scope.SemenDetails.SNo = $scope.SelectedSNo;
        $scope.SemenDetails.typeofPartnerSperm = $scope.SelectedTypeOfSperm;   //type of sperm #bug 6129
        if (!angular.isUndefined($scope.SelectedSNo)) {
            $scope.FetchPartnerPreparationAssesment($scope.SelectedSNo, 1);
        }
        //angular.element(btnClosePop).trigger('click');     
        angular.element(PartnerSpermiogram).modal('hide');
        // angular.element(PartnerPlusDonorSpermiogram).modal('hide');
    }
    $scope.SavePartnerSpermiogram1 = function SavePartnerSpermiogram1() { //donor as partener
        debugger;
        $scope.SemenDetails.FinalDonorSpermioSRNo = $scope.SemenDetails.DonorSpermioSRNo;
        // if (!angular.isUndefined($scope.SelectedSNo)) {    ----Commented by Nayan Kamble
        if (!angular.isUndefined($scope.SemenDetails.FinalDonorSpermioSRNo)) {    //Added by Nayan Kamble 
            $scope.FetchPartnerPreparationAssesment($scope.SemenDetails.FinalDonorSpermioSRNo, 2);
        }
        //angular.element(btnClosePop).trigger('click');     
        // angular.element(PartnerSpermiogram).modal('hide');
        angular.element(PartnerPlusDonorSpermiogram).modal('hide');
    }

    $scope.SaveORUpdateSemenDetails = function SaveORUpdateSemenDetails(SemenDetails) {
        debugger;
        console.log(SemenDetails);
        if (!$scope.ValidateBeforeSaveOperation()) {
            console.log('not valid data provided');
        }
        else if ($scope.SemenDetails.ListFreezThawSamples.length > 0 && ($scope.SemenDetails.IsFinalize == false || $scope.SemenDetails.IsFinalize == null)) {
            AlertMessage.info(objResource.msgTitle, 'You Have Linked Donor And samples. you can not save Semen Details without Finalize');
        }
        else {
            var ResponseData = SemenDetailsService.SaveORUpdateSemenDetails(SemenDetails);
            ResponseData.then(function (Response) {

                if (Response.data > 0 && Response.data == 1) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                }
                if (Response.data > 0 && Response.data == 2) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                }
                //$location.path("/ARTCycle");
            }, function (error) {
                $scope.Error = error;
            })
        }
    }

    $scope.ValidateBeforeSaveOperation = function () {
        debugger;
        var IsValid = true;
        if (!angular.isUndefined($scope.SemenDetails.SourceOfSpermID)) {
            if ($scope.SemenDetails.SourceOfSpermID == 0) {
                $scope.frmSemenDetails.SourceOfSpermID.$dirty = true;
                $scope.frmSemenDetails.SourceOfSpermID.$valid = false;
                IsValid = false;
            }
            else if ($scope.SemenDetails.SourceOfSpermID == 2 || $scope.SemenDetails.SourceOfSpermID == 3) {
                //check here of with donor
                if ($scope.SemenDetails.SelectedMRNoOrDonorID == 0 || $scope.SemenDetails.SelectedMRNoOrDonorID == null) {
                    AlertMessage.info('Please Select Donor');
                    IsValid = false;
                }
                if (!$scope.frmSemenDetails.SourceOfSpermID.$valid
            || !$scope.frmSemenDetails.DonorVolumePreWash.$valid
            || !$scope.frmSemenDetails.DonorVolumePostWash.$valid
            || !$scope.frmSemenDetails.DonorSPPreWash.$valid
            || !$scope.frmSemenDetails.DonorSPPostWash.$valid
            || !$scope.frmSemenDetails.DonorTSCPreWash.$valid
            || !$scope.frmSemenDetails.DonorTCSPostWash.$valid
            || !$scope.frmSemenDetails.DonorMotilityPreWash.$valid
            || !$scope.frmSemenDetails.DonorMotilityPostWash.$valid) {
                    debugger;
                    $scope.frmSemenDetails.SourceOfSpermID.$dirty = true;
                    $scope.frmSemenDetails.DonorVolumePreWash.$dirty = true;
                    $scope.frmSemenDetails.DonorVolumePostWash.$dirty = true;
                    $scope.frmSemenDetails.DonorSPPreWash.$dirty = true;
                    $scope.frmSemenDetails.DonorSPPostWash.$dirty = true;
                    $scope.frmSemenDetails.DonorTSCPreWash.$dirty = true;
                    $scope.frmSemenDetails.DonorTCSPostWash.$dirty = true;
                    $scope.frmSemenDetails.DonorMotilityPreWash.$dirty = true;
                    $scope.frmSemenDetails.DonorMotilityPostWash.$dirty = true;
                    IsValid = false;
                }
            }
            else if ($scope.SemenDetails.SourceOfSpermID == 1) {
                if ($scope.SemenDetails.PartnerSpermiogramID == 0 || $scope.SemenDetails.PartnerSpermiogramID == null) {
                    AlertMessage.info('Please Select Partner Spermiogram');
                    IsValid = false;
                }
            }
        } else {
            $scope.frmSemenDetails.SourceOfSpermID.$dirty = true;
            IsValid = false;
        }
        return IsValid;
    }

    //Set selected radio buttons SRNo
    $scope.IsSelectedSpermiogram = true;
    $scope.SetSRNo = function SetSRNo(item) {
        debugger;
        $scope.IsSelectedSpermiogram = false;
        $scope.SelectedSNo = item.SNo;
        $scope.SelectedTypeOfSperm = item.TypeOfSperm
        //$scope.SemenDetails.PartnerMethodOfSperm = item.TypeOfSperm
        $scope.SemenDetails.PartnerSpermiogramID = item.ID;
        $scope.SemenDetails.PartnerSpermiogramUnitID = item.UnitID;
    }
    $scope.IsSelectedSpermiogram1 = true;
    $scope.SetPartnerPlusDonorSRNo = function (item) {
        $scope.IsSelectedSpermiogram1 = false;
        $scope.SemenDetails.FinalDonorSpermioSRNo = undefined;
        $scope.SemenDetails.DonorSpermioSRNo = item.SNo;

        $scope.SemenDetails.DonorAsPartnerSpermiogramID = item.ID;
        $scope.SemenDetails.DonorAsPartnerSpermiogramUnitID = item.UnitID;
        //if (!angular.isUndefined($scope.SemenDetails.DonorSpermioSRNo) && $scope.SemenDetails.DonorSpermioSRNo == "") {
        //    $scope.FetchDonorPreparationAssesment($scope.SemenDetails.DonorSpermioSRNo);
        //}
    }
    $scope.SaveDonorSpermiogram = function SaveDonorSpermiogram() {

        $scope.SemenDetails.FinalDonorSpermioSRNo = $scope.SemenDetails.DonorSpermioSRNo;
        angular.element(btnClosePop).trigger('click');
    }

    $scope.SetDonorMRNoORDonorCode = function SetDonorMRNoORDonorCode() {
        debugger;
        if ($scope.SemenDetails.SelectedMRNo != '' && $scope.SemenDetails.SelectedMRNo != undefined) {
            $scope.SemenDetails.FinalDonorSpermioSRNo = undefined;
            $scope.MRNoOrDonorCode = $scope.SemenDetails.SelectedMRNo;
            $scope.DisableEnabledControlsOfMRNo();
            angular.element(btnCloseDonorPop).trigger('click');
        } else {
            // AlertMessage.info("Please Select Donor/Partner");
            $scope.MRNoOrDonorCode = $scope.SemenDetails.SelectedDonorCode;
            $scope.DisableEnabledControlsOfDonorCode();
            $scope.LoadDonorSpermiogram($scope.MRNoOrDonorCode);
            angular.element(btnCloseDonorPop).trigger('click');
        }
    }

    $scope.DisableEnabledControlsOfMRNo = function () {
        $scope.ShowPartnerSpermiogram = true;
        $scope.ShowDonorSpermiogram = false;
        $scope.DonorVolumePreWashDisabled = true;
        $scope.DonorVolumePostWashDisabled = true;
        $scope.DonorSPPreWashDisabled = true;
        $scope.DonorSPPostWashDisabled = true;
        $scope.DonorTSCPreWashDisabled = true;
        $scope.DonorTCSPostWashDisabled = true;
        $scope.DonorMotilityPreWashDisabled = true;
        $scope.DonorMotilityPostWashDisabled = true;
    }

    $scope.DisableEnabledControlsOfDonorCode = function () {
        $scope.ShowPartnerSpermiogram = false;
        $scope.ShowDonorSpermiogram = true;
        $scope.DonorVolumePreWashDisabled = false;
        $scope.DonorVolumePostWashDisabled = false;
        $scope.DonorSPPreWashDisabled = false;
        $scope.DonorSPPostWashDisabled = false;
        $scope.DonorTSCPreWashDisabled = false;
        $scope.DonorTCSPostWashDisabled = false;
        $scope.DonorMotilityPreWashDisabled = false;
        $scope.DonorMotilityPostWashDisabled = false;
    }

    $scope.ClearAllFields = function () {
        $location.path("/ARTCycle");
        //$scope.SemenDetails.SNo = undefined;
        //$scope.SemenDetails.PartnerSpermPreparationMethodID = 0;
        //$scope.SemenDetails.PartnerMethodOfSperm = undefined;
        //$scope.SemenDetails.VolumePreWash = undefined;
        //$scope.SemenDetails.VolumePostWash = undefined;
        //$scope.SemenDetails.SPPreWash = undefined;
        //$scope.SemenDetails.SPPostWash = undefined;
        //$scope.SemenDetails.TCSPreWash = undefined;
        //$scope.SemenDetails.TCSPostWash = undefined;
        //$scope.SemenDetails.MotilityPreWash = undefined;
        //$scope.SemenDetails.MotilityPostWash = undefined;
        //$scope.MRNoOrDonorCode = undefined;
        //$scope.SemenDetails.FinalDonorSpermioSRNo = undefined;
        //$scope.SemenDetails.DonorSpermPreparationMethodID = 0;
        //$scope.SemenDetails.DonorMethodOfSperm = undefined;
        //$scope.SemenDetails.DonorVolumePreWash = undefined;
        //$scope.SemenDetails.DonorVolumePostWash = undefined;
        //$scope.SemenDetails.DonorSPPreWash = undefined;
        //$scope.SemenDetails.DonorSPPostWash = undefined;
        //$scope.SemenDetails.DonorTSCPreWash = undefined;
        //$scope.SemenDetails.DonorTCSPostWash = undefined;
        //$scope.SemenDetails.DonorMotilityPreWash = undefined;
        //$scope.SemenDetails.DonorMotilityPostWash = undefined;
        //$scope.SemenDetails.IsFinalize = false;
    }
    /* END : Operations */

    /* START : Search functionality*/
    $scope.search = function () {

        $scope.filteredList = _.filter($scope.allItems,

       function (item) {
           return searchUtil(item, $scope.searchText);
       });

        if ($scope.searchText == '') {
            $scope.filteredList = $scope.allItems;
        }
    }

    /* Search Text in all 3 fields */
    function searchUtil(item, toSearch) {

        /* Search Text in all 3 fields */
        return (item.MRNo.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.DonerCode.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.DonorName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1) ? true : false;
    }
    /* END : Search functionality*/

    /* START : Calculation */
    $scope.CalculateTSCPrewash = function () {
        debugger;
        var DonorTSCPreWash = $scope.SemenDetails.DonorVolumePreWash * $scope.SemenDetails.DonorSPPreWash;
        $scope.SemenDetails.DonorTSCPreWash = parseInt(DonorTSCPreWash);
    }
    $scope.CalculateTSCPostwash = function () {

        var DonorTCSPostWash = $scope.SemenDetails.DonorVolumePostWash * $scope.SemenDetails.DonorSPPostWash;
        $scope.SemenDetails.DonorTCSPostWash = parseInt(DonorTCSPostWash);
    }
    /* END : Calculation */

    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }
    $scope.GetPartnerSpermiogram = function () {
        debugger;
        var ResponseData = SemenDetailsService.LoadPartnerSpermiogramData(0, 0);
        ResponseData.then(function (Response) {
            debugger;
            $scope.PartnerSpermiogramData = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.btnCloseDonorPop = true;
    $scope.SetMRNo = function SetMRNo(item) {
        debugger;
        $scope.btnCloseDonorPop = false;
        $scope.SemenDetails.SelectedMRNoOrDonorID = item.ID;
        $scope.SemenDetails.SelectedMRNoOrDonorUnitID = item.UnitID;

        if (!angular.isUndefined(item.MRNo) && item.MRNo != "") {
            $scope.SemenDetails.SelectedMRNo = item.MRNo;
            $scope.SemenDetails.IsPrtnerAsDonor = false;
        }

        if (angular.isUndefined(item.MRNo) || item.MRNo == "") {
            $scope.SemenDetails.SelectedMRNo = undefined;
            $scope.SemenDetails.SelectedDonorCode = item.DonerCode;
            $scope.SelectedDonorID = item.ID;
            $scope.SelectedDonorUnitID = item.UnitID;
            $scope.SemenDetails.IsPrtnerAsDonor = true;
        }
        else {
            $scope.SemenDetails.SelectedDonorCode = undefined;
            $scope.SelectedDonorID = undefined;
            $scope.SelectedDonorUnitID = undefined;
        }
    }
    $scope.GetDonorSpermiogram = function () {
        debugger;
        //var ResponseData = SemenDetailsService.GetPartnerSpermiogramDataByMRNo($scope.SemenDetails.SelectedMRNo);
        //ResponseData.then(function (Response) {

        //    $scope.PartnerSpermiogramDataByMRNo = Response.data;
        //}, function (error) {
        //    $scope.Error = error;
        //});
        var DonorID = $scope.SelectedDonorID;
        var DonorUnitID = $scope.SelectedDonorUnitID;
        if (DonorID != 0 && DonorUnitID != 0) {
            var ResponseData = IUISrv.GetDonorFrozenSamples(DonorID, DonorUnitID);
            ResponseData.then(function (Response) {
                if (Response.data != null) {

                    $scope.FreezSamplesLists = Response.data;
                    angular.forEach($scope.FreezSamplesLists, function (Item) {
                        Item.IsThaw1 = Item.IsThaw;
                    });
                }
            }, function (error) {
                $scope.Error = error;
            });
        }
    }
    $scope.GetDonorAsPartnerSpermiogram = function () {
        debugger;

        var ResponseData = SemenDetailsService.LoadPartnerSpermiogramData($scope.SemenDetails.SelectedMRNoOrDonorID, $scope.SemenDetails.SelectedMRNoOrDonorUnitID);
        ResponseData.then(function (Response) {
            debugger;
            $scope.PartnerSpermiogramDataByMRNo = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.AddThowingDetails = function () {
        debugger;
        if ($scope.SemenDetails.ListFreezThawSamples[0].Volume != 0 && $scope.SemenDetails.ListFreezThawSamples[0].Volume != "" && $scope.SemenDetails.ListFreezThawSamples[0].Volume != null) {
            $scope.SemenDetails.DonorVolumePreWash = $scope.SemenDetails.ListFreezThawSamples[0].Volume;
            //$scope.SemenDetails.DonorVolumePostWash = $scope.SemenDetails.ListFreezThawSamples[0].PostVolume;
            $scope.SemenDetails.DonorSPPreWash = $scope.SemenDetails.ListFreezThawSamples[0].SpermConcentration;
            //$scope.SemenDetails.DonorSPPostWash = $scope.SemenDetails.ListFreezThawSamples[0].PostSpermConcentration;
            $scope.SemenDetails.DonorTSCPreWash = $scope.SemenDetails.ListFreezThawSamples[0].SpermCount;
            //$scope.SemenDetails.DonorTCSPostWash = $scope.SemenDetails.ListFreezThawSamples[0].PostSpermCount;
            $scope.SemenDetails.DonorMotilityPreWash = $scope.SemenDetails.ListFreezThawSamples[0].Motility;
            // $scope.SemenDetails.DonorMotilityPostWash = $scope.SemenDetails.ListFreezThawSamples[0].PostMotility;
            //$scope.SemenDetails.DonorSpermPreparationMethodID = $scope.PartnerPreparationAssesmentData.DonorSpermPreparationMethodID;
            // $scope.SemenDetails.DonorSpermPreparationMethodUnitID = $scope.PartnerPreparationAssesmentData.DonorSpermPreparationMethodUnitID;
            // $scope.SemenDetails.DonorSpermPreparationMethod = $scope.PartnerPreparationAssesmentData.DonorSpermPreparationMethod;                        
            angular.element(DonorSpermiogram).modal('hide');
        }
        else {
            AlertMessage.info("Please Enter Volume");

        }

    }
    $scope.GetThowSmaples = function (IsFreezThaw) {
        debugger;
        if ($scope.AlreadyGet == false) {
            debugger;
            $scope.ID = $scope.SemenDetails.SelectedMRNoOrDonorID;
            $scope.UnitID = $scope.SemenDetails.SelectedMRNoOrDonorUnitID;

            if ($scope.ID != 0 && $scope.ID != undefined && $scope.UnitID != undefined && $scope.UnitID != 0) {
                var ResponseData = IUISrv.GetThowSmaples($scope.ID, $scope.UnitID, IsFreezThaw);
                ResponseData.then(function (Response) {
                    $scope.ThowSamplesLists = Response.data;
                    debugger;
                    //$scope.ThowSamplesLists.every(function (x) {
                    //    $scope.SemenDetails.ListSemenThawing.every(function (y) {
                    //        if (x.ThawID == y.ThawID)
                    //            x.IsThaw = true;
                    //    })
                    //})
                    $scope.AlreadyGet = true; //for do not call every time get sement details
                }, function (error) {
                });
            }
            else {
                if ($scope.ArtSubTypeID == 3)
                    AlertMessage.info(objResource.msgTitle, 'Please Select Donor.');
            }
        }
    }
    $scope.CheckVolumeLess = function (Item) {
        debugger;
        if (Item.OriginalVolume < Item.Volume) {
            Item.Volume = Item.OriginalVolume;
            AlertMessage.info("Please Select valid volume");
        }
    }
});

PIVF.directive('allowDecimalNumbers', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elm, attrs, ngModel, ctrl) {
            elm.on('keydown', function (event) {
                //  
                var model = ngModel.$viewValue;
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9\.]/g, '')
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }

                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    // numbers  
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows     , 110
                    return true;
                } if (model == undefined || model == '') {
                    if (event.which >= 48 && event.which <= 57) {
                        // numbers  
                        return true;
                    } else if (event.which >= 96 && event.which <= 105) {
                        // numpad number  
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
                if (containsDot != null && model.length < 3) {
                    if (event.which >= 48 && event.which <= 57) {
                        // numbers  
                        return true;
                    } else if (event.which >= 96 && event.which <= 105) {
                        // numpad number  
                        return true;
                    }
                } else if ([46, 110, 190].indexOf(event.which) > -1 && (model != undefined || model != '') && parseInt(model) != 9) {
                    // dot and numpad dot  
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});   // for allow decimal nos upto 9.