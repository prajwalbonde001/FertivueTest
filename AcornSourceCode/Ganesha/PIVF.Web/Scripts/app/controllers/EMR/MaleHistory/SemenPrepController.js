'use strict';

angular.module('PIVF').controller('SemenPrepController', function ($scope, $location,$route, $rootScope, AlertMessage, localStorageService, swalMessages, Common, SemenPrepService, srvCommon, $filter) {

    $rootScope.FormName = 'Semen Preparation';
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.SemenPrep = {};
    $scope.SemenPrepUpdate = {};

    /* START for Resource */
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    // for sorting    
    $scope.SortColumn1 = "SNo";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }

    /* Stop for Resource*/
    $scope.ViewBtnName = 'View';
    $scope.btnSaveUpdate = "Save";
    $scope.SemenPrep.Abstinence = 0;
    $scope.IsFrozenSampleCollectedInhouse = true;
    $scope.IsFrozenSample = false;
    $scope.IsSergicalOptionSelected = true;
    $scope.selectedPatient = {};
    $scope.selectedPatient = Common.getSelectedPatient();
    //To enable Fresh Sample selection 
    $scope.IsDisableFresh = false;
    $scope.IsFinalized = false;
    $scope.IsViewBtnDisable = true;
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.IsDisableTypeSpermDiv = true;
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

    $scope.open = function ($event, Item) {
        $event.preventDefault();
        $event.stopPropagation();
        Item.opened = true;
    };


    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(),//.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.dateOptionExpDate = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date(),//new Date().setYear(new Date().getYear() - 100),
        startingDay: 1,
        showWeeks: false
    };

    $scope.GetSpermTypeList = function GetSpermTypeList() {
        debugger;
        var ResponseData = Common.getMasterList('M_SpermType', 'SpermTypeID', 'SpermDescription');
        ResponseData.then(function (Response) {
            //  
            // var tmpArr = [0, 6, 8, 10, 12, 13];
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SpermTypeList = []
            $scope.TempSpermTypeList = Response.data;//.filter(x=>tmpArr.includes(x.ID));

            if ($scope.TempSpermTypeList != null) {
                for (var count = 0; count < 3; count++) {
                    $scope.SpermTypeList.push($scope.TempSpermTypeList[count]);
                }
            }
            $scope.SemenPrep.SpermTypeID = 0;
            $scope.ChangeSpermType();
        }, function (error) {
        });
    };

    $scope.CancelMain = function CancelMain() {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    }
    $scope.FillAbstinenceList = function FillAbstinenceList() {

        var ResponseData = Common.getMasterList('M_Abstinence', 'AbstID', 'Description');
        ResponseData.then(function (Response) {
            //     
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AbstinenceList = Response.data;
            $scope.SemenPrep.Abstinence = 0;
        }, function (error) {
        });
    };

    $scope.ChangeTimeAsDate = function (Value) {
        debugger;
        if (Value == 1)
            $scope.SemenPrep.SprermFreezingTime = $scope.SemenPrep.SprermFreezingDate;
        if (Value == 2)
            $scope.SemenPrep.CollectionTime = $scope.SemenPrep.CollectionDate;
        if (Value == 3)
            $scope.SemenPrep.ReceivingTime = $scope.SemenPrep.TimeRecSampLab;
    };

    //Code to check Frozen Selected radio button
    $scope.ChangeFrozenSampleCollected = function ChangeFrozenSampleCollected() {
        debugger;
        if ($scope.SemenPrep.FrozenSampleCollected == "0") {
            $scope.IsFrozenSampleCollectedInhouse = true;
            $scope.SemenPrep.CryNo = null;
        }
        else {
            $scope.SemenPrep.CryNo = null;
            $scope.IsFrozenSampleCollectedInhouse = false;
        }
    }

    //Code to enable fresh or Frozen for sperm selection

    $scope.ChangeSpermType = function () {
        debugger;
        $scope.IsDisableTypeSpermDiv = true;
        $scope.SemenPrep.MethodOfCollection = 0;
        $scope.SemenPrep.MethodSurgicalSRetrievalID = 0;
        $scope.SemenPrep.Abstinence = 0;

        if ($scope.SemenPrep.SpermTypeID == 1) {
            $scope.IsDisableFresh = false;
            $scope.IsDisableTypeSpermDiv = false;
            $scope.SemenPrep.FrozenSampleCollected = 0;
            $scope.IsFrozenSample = false;
        }
        else if ($scope.SemenPrep.SpermTypeID == 2) {
            $scope.IsDisableFresh = true;
            $scope.IsDisableTypeSpermDiv = false;
            $scope.SemenPrep.SampleCollected = 0;
            $scope.IsFrozenSample = true;
        }

    };


    //Code to hide Div/Show Div for update
    $scope.ChangeSpermTypeUpdate = function () {
        if ($scope.SemenPrep.SpermTypeID == 1) {
            $scope.IsDisableFresh = false;
            $scope.IsDisableTypeSpermDiv = false;
            $scope.IsFrozenSample = false;
        }
        else if ($scope.SemenPrep.SpermTypeID == 2) {
            $scope.IsDisableFresh = true;
            $scope.IsDisableTypeSpermDiv = false;
            $scope.IsFrozenSample = true;
        }
    };

    $scope.GetEmbryologyDoctorsList = function FillCanList() {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //  
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data;
            $scope.SemenPrep.CheckedByDoctorID = 0;
            $scope.SemenPrep.WitnessByID = 0;
        }, function (error) {
        });
    };

    //get Semen preparation method list
    $scope.GetSemenPrepMethodList = function GetSemenPrepMethodList() {

        var ResponseData = Common.getMasterList('M_IVF_MethodOfSpermPreparationMaster', 'IVFMOSPCode', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SemenPrepMethodList = Response.data;
            $scope.SemenPrep.IVFMOSPCode = 0;
        }, function (error) {
        });
    }



    $scope.FetchMethodSurgicalSRetrieval = function FetchMethodSurgicalSRetrieval() {
        //
        var ResponseData = Common.getMasterList('M_MethodSurgicalSRetrieval', 'MOSSRetrivalID', 'MOSSRetrivalDescription');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MethodSurgicalSRetrievalList = Response.data;
            $scope.SemenPrep.MethodSurgicalSRetrievalID = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }



    $scope.GetListSemenCollection = function GetListSemenCollection() {
        //
        var ResponseData = Common.getMasterList('M_MethodofSpermCollection', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SemenCollectionList = Response.data;
            $scope.SemenPrep.MethodOfCollection = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.CheckSergicalSelected = function CheckSergicalSelected() {

        if ($scope.SemenPrep.MethodOfCollection == 2)
            $scope.IsSergicalOptionSelected = false
        else
            $scope.IsSergicalOptionSelected = true;
    }

    //Check Volume should less than 9
    $scope.CheckVolume = function CheckVolume() {
        if ($scope.SemenPrep.Volume == 9) {
            $scope.SemenPrep.Volume = '';
            AlertMessage.info('PalashIVF', 'Volume should be less than 9');
        }
    }

    // Calculation for Slow Progress Pres
    $scope.CalcSlowProg = function () {

        if ($scope.SemenPrep.GradeA == undefined || $scope.SemenPrep.GradeA == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            //if (parseInt($scope.OSlowProgressive) != parseInt($scope.SemenPrep.SlowProgressive)) {
            $scope.SemenPrep.SlowProgressive = parseInt($scope.SemenPrep.GradeA) - parseInt($scope.SemenPrep.RapidProgressive);
            if ($scope.SemenPrep.SlowProgressive < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.SemenPrep.SlowProgressive = $scope.OSlowProgressive;
                $scope.SemenPrep.RapidProgressive = $scope.ORapidProgressive;
            }
            if (parseInt($scope.SemenPrep.RapidProgressive))
                $scope.IsMandatory = true;
            else $scope.IsMandatory = false;
            //}
        }
    }

    // Calcul;ation for Slow Progress Post

    $scope.CalcSlowProgPost = function () {

        if ($scope.SemenPrep.GradeAPost == undefined || $scope.SemenPrep.GradeAPost == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            //if (parseInt($scope.OSlowProgressive) != parseInt($scope.SemenPrep.SlowProgressive)) {
            $scope.SemenPrep.SlowProgressivePost = parseInt($scope.SemenPrep.GradeAPost) - parseInt($scope.SemenPrep.RapidProgressivePost);
            if ($scope.SemenPrep.SlowProgressivePost < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.SemenPrep.SlowProgressivePost = $scope.OSlowProgressivePost;
                $scope.SemenPrep.RapidProgressivePost = $scope.ORapidProgressivePost;
            }
            if (parseInt($scope.SemenPrep.RapidProgressivePost))
                $scope.IsMandatoryPost = true;
            else $scope.IsMandatoryPost = false;
            //}
        }
    }
    //Calculate Progressive non progressive motility imotility

    $scope.CalculateMotilityAss = function CalculateMotilityAss() {
        if ((angular.isDefined($scope.SemenPrep.GradeA) && $scope.SemenPrep.GradeA != '') && (angular.isDefined($scope.SemenPrep.GradeB) && $scope.SemenPrep.GradeB != '')) {
            $scope.SemenPrep.Motility = parseInt($scope.SemenPrep.GradeA) + parseInt($scope.SemenPrep.GradeB);
            $scope.SemenPrep.MotilityCnt = (((parseFloat($scope.SemenPrep.SpermConcentration)) * (parseInt($scope.SemenPrep.Motility))) / 300).toFixed(2);

            $scope.ChkImmotile();
            $scope.SemenPrep.GradeC = 100 - (parseInt($scope.SemenPrep.GradeA) + parseInt($scope.SemenPrep.GradeB));
            if ($scope.SemenPrep.GradeC < 0) {
                $scope.SemenPrep.GradeA = $scope.OGradeA;
                $scope.SemenPrep.GradeB = $scope.OGradeB;
                $scope.SemenPrep.GradeC = $scope.OGradeC;
                $scope.SemenPrep.Motility = null;
                $scope.SemenPrep.MotilityCnt = null;

                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isDefined($scope.SemenPrep.GradeA) && $scope.SemenPrep.GradeA != '') && ($scope.SemenPrep.GradeB == '' || angular.isUndefined($scope.SemenPrep.GradeB)) && (angular.isDefined($scope.SemenPrep.GradeC) && $scope.SemenPrep.GradeC != '')) {
            $scope.SemenPrep.GradeB = 100 - (parseInt($scope.SemenPrep.GradeA) + parseInt($scope.SemenPrep.GradeC));
            $scope.SemenPrep.Motility = parseInt($scope.SemenPrep.GradeA) + parseInt($scope.SemenPrep.GradeB);
            $scope.SemenPrep.MotilityCnt = ((parseFloat($scope.SemenPrep.SpermConcentration) * parseInt($scope.SemenPrep.Motility)) / 300).toFixed(2);

            if ($scope.SemenPrep.GradeB < 0) {
                $scope.SemenPrep.GradeA = $scope.OGradeA;
                $scope.SemenPrep.GradeB = $scope.OGradeB;
                $scope.SemenPrep.GradeC = $scope.OGradeC;
                $scope.SemenPrep.Motility = null;
                $scope.SemenPrep.MotilityCnt = null;

                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isUndefined($scope.SemenPrep.GradeA) || $scope.SemenPrep.GradeA == '') && ($scope.SemenPrep.GradeB != '' || angular.isDefined($scope.SemenPrep.GradeB)) && (angular.isDefined($scope.SemenPrep.GradeC) && $scope.SemenPrep.GradeC != '')) {
            $scope.SemenPrep.GradeA = 100 - (parseInt($scope.SemenPrep.GradeB) + parseInt($scope.SemenPrep.GradeC));
            $scope.SemenPrep.Motility = parseInt($scope.SemenPrep.GradeA) + parseInt($scope.SemenPrep.GradeB);
            $scope.SemenPrep.MotilityCnt = ((parseFloat($scope.SemenPrep.SpermConcentration) * parseInt($scope.SemenPrep.Motility)) / 300).toFixed(2);

            if ($scope.SemenPrep.GradeA < 0) {
                $scope.SemenPrep.GradeA = $scope.OGradeA;
                $scope.SemenPrep.GradeB = $scope.OGradeB;
                $scope.SemenPrep.GradeC = $scope.OGradeC;
                $scope.SemenPrep.Motility = null;
                $scope.SemenPrep.MotilityCnt = null;

                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
    }

    //Calculate Progressive non progressive motility imotility Post

    $scope.CalculateMotilityAssPost = function CalculateMotilityAssPost() {

        if ((angular.isDefined($scope.SemenPrep.GradeAPost) && $scope.SemenPrep.GradeAPost != '') && (angular.isDefined($scope.SemenPrep.GradeBPost) && $scope.SemenPrep.GradeBPost != '')) {
            $scope.SemenPrep.MotilityPost = parseInt($scope.SemenPrep.GradeAPost) + parseInt($scope.SemenPrep.GradeBPost);
            $scope.SemenPrep.MotilityCntPost = (((parseFloat($scope.SemenPrep.SpermConcentrationPost)) * (parseInt($scope.SemenPrep.MotilityPost))) / 300).toFixed(2);
           
            $scope.ChkImmotilePost();
            $scope.SemenPrep.GradeCPost = 100 - (parseInt($scope.SemenPrep.GradeAPost) + parseInt($scope.SemenPrep.GradeBPost));
            if ($scope.SemenPrep.GradeCPost < 0) {
                $scope.SemenPrep.GradeAPost = $scope.OGradeAPost;
                $scope.SemenPrep.GradeBPost = $scope.OGradeBPost;
                $scope.SemenPrep.GradeCPost = $scope.OGradeCPost;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isDefined($scope.SemenPrep.GradeAPost) && $scope.SemenPrep.GradeAPost != '') && ($scope.SemenPrep.GradeBPost == '' || angular.isUndefined($scope.SemenPrep.GradeBPost)) && (angular.isDefined($scope.SemenPrep.GradeCPost) && $scope.SemenPrep.GradeCPost != '')) {
            $scope.SemenPrep.GradeBPost = 100 - (parseInt($scope.SemenPrep.GradeAPost) + parseInt($scope.SemenPrep.GradeCPost));
            $scope.SemenPrep.MotilityPost = parseInt($scope.SemenPrep.GradeAPost) + parseInt($scope.SemenPrep.GradeBPost);
            $scope.SemenPrep.MotilityCntPost = (((parseFloat($scope.SemenPrep.SpermConcentrationPost)) * (parseInt($scope.SemenPrep.MotilityPost))) / 300).toFixed(2);

            if ($scope.SemenPrep.GradeBPost < 0) {
                $scope.SemenPrep.GradeAPost = $scope.OGradeAPost;
                $scope.SemenPrep.GradeBPost = $scope.OGradeBPost;
                $scope.SemenPrep.GradeCPost = $scope.OGradeCPost;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isUndefined($scope.SemenPrep.GradeAPost) || $scope.SemenPrep.GradeAPost == '') && ($scope.SemenPrep.GradeBPost != '' || angular.isDefined($scope.SemenPrep.GradeBPost)) && (angular.isDefined($scope.SemenPrep.GradeCPost) && $scope.SemenPrep.GradeCPost != '')) {
            $scope.SemenPrep.GradeAPost = 100 - (parseInt($scope.SemenPrep.GradeBPost) + parseInt($scope.SemenPrep.GradeCPost));
            $scope.SemenPrep.MotilityPost = parseInt($scope.SemenPrep.GradeAPost) + parseInt($scope.SemenPrep.GradeBPost);
            $scope.SemenPrep.MotilityCntPost = (((parseFloat($scope.SemenPrep.SpermConcentrationPost)) * (parseInt($scope.SemenPrep.MotilityPost))) / 300).toFixed(2);

            if ($scope.SemenPrep.GradeAPost < 0) {
                $scope.SemenPrep.GradeAPost = $scope.OGradeAPost;
                $scope.SemenPrep.GradeBPost = $scope.OGradeBPost;
                $scope.SemenPrep.GradeCPost = $scope.OGradeCPost;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
    }

    // Immotile calculation for Post
    $scope.ChkImmotilePost = function () {

        if (parseInt($scope.SemenPrep.GradeAPost) + parseInt($scope.SemenPrep.GradeBPost) + parseInt($scope.SemenPrep.GradeCPost) > 100)
            AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
    }

    $scope.ChkImmotile = function () {
        if (parseInt($scope.SemenPrep.GradeA) + parseInt($scope.SemenPrep.GradeB) + parseInt($scope.SemenPrep.GradeC) > 100)
            AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
    }

    //Allow only one check box selection at time 
    $scope.updateSelection = function (position, entities) {
        angular.forEach(entities, function (subscription, index) {
            if (position != index)
                subscription.selected = false;
        });
    }

    $scope.UpdateLinkFinalize = function UpdateLinkFinalize(SemenAnalysis) {

        $scope.sNoArray = [];
        $scope.cryoNoList = [];
        $scope.ThowDate = new Date();
        $scope.IsViewBtnDisable = true;
        //debugger
        angular.forEach($scope.SemenPrepList, function (item) {
            if (!!item.selected) {
                $scope.sNoArray.push(item.FormNo);
                $scope.cryoNoList.push(item.SpermNo);
                $scope.IsViewBtnDisable = false;
                $scope.ThowDate = item.ThawDate;
            }
        })
        debugger
        if ($scope.sNoArray.length < 1) {
            AlertMessage.info('PalashIVF', 'Please select atleast one item.');
            return;
        }
        else {
            $scope.ViewBtnName = $scope.sNoArray[0];
            $scope.SemenPrep.CryNo = $scope.cryoNoList[0];
            $scope.SemenPrep.ThawDate = new Date($scope.ThowDate);
            $scope.SemenPrep.ThawTime = new Date($scope.ThowDate);
        }
    }

    //Calculate rapid progeress
    $scope.CalcRapidProg = function () {
        //   
        if ($scope.SemenPrep.GradeA == undefined || $scope.SemenPrep.GradeA == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            //if (parseInt($scope.ORapidProgressive) != parseInt($scope.SemenPrep.RapidProgressive)) {
            $scope.SemenPrep.RapidProgressive = parseInt($scope.SemenPrep.GradeA) - parseInt($scope.SemenPrep.SlowProgressive);
            if ($scope.SemenPrep.RapidProgressive < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.SemenPrep.RapidProgressive = $scope.ORapidProgressive;
                $scope.SemenPrep.SlowProgressive = $scope.OSlowProgressive;
            }
            if (parseInt($scope.SemenPrep.SlowProgressive))
                $scope.IsMandatory = true;
            else $scope.IsMandatory = false;
            //  }
        }
    }

    //Calculate rapid progeress for Post

    $scope.CalcRapidProgPost = function () {
        //   
        if ($scope.SemenPrep.GradeAPost == undefined || $scope.SemenPrep.GradeAPost == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            //  if (parseInt($scope.ORapidProgressivePost) != parseInt($scope.SemenPrep.RapidProgressivePost)) {
            $scope.SemenPrep.RapidProgressivePost = parseInt($scope.SemenPrep.GradeAPost) - parseInt($scope.SemenPrep.SlowProgressivePost);
            if ($scope.SemenPrep.RapidProgressivePost < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.SemenPrep.RapidProgressivePost = $scope.ORapidProgressivePost;
                $scope.SemenPrep.SlowProgressivePost = $scope.OSlowProgressivePost;
            }
            if (parseInt($scope.SemenPrep.SlowProgressivePost))
                $scope.IsMandatoryPost = true;
            else $scope.IsMandatoryPost = false;
            // }
        }
    }

    //Get Semen Prepration List
    $scope.GetSemenPreparationList = function () {

        var ResponseData = SemenPrepService.GetSemenPreparationList();
        ResponseData.then(function (Response) {

            $scope.SemenPrepList = Response.data;

        }, function (error) {
        });

    }

    //Get Semen Prepration List
    $scope.GetSemenPreparationListForTC = function () {
        //
        var ResponseData = SemenPrepService.GetSemenPreparationListForTC();
        ResponseData.then(function (Response) {

            $scope.SemenPrepListTC = Response.data;

        }, function (error) {
        });

    }
    // Redirected to Thawing on link click

    //Get Semen Prepration List
    $scope.RedirectToThawing = function (formNo, action) {
        //

        if (action == 'default') {
            var ResponseData = SemenPrepService.GetSemenThawingDetailFromSemenPrepIDForTC(formNo, action);
            ResponseData.then(function (Response) {

                $scope.GetThawingDetailList = Response.data;

            }, function (error) {
            });
        }
        else if (action == 'Freezing') {
            var ResponseData = SemenPrepService.GetSemenThawingDetailFromSemenPrepIDForTC(formNo, action);
            ResponseData.then(function (Response) {

                $scope.SemenFreezingList = Response.data;

            }, function (error) {
            });

        }
    };

    // Redirect to Self  on SNo Click

    $scope.RedirectToSelf = function RedirectToSelf(SNo) {
        var ResponseData = SemenPrepService.GetSPDetailsBySNo(SNo);
        ResponseData.then(function (Response) {
            debugger;
            if (Response.data != null) {
                debugger;
                $scope.SemenPrep = Response.data;
                $scope.SemenPrep.SprermFreezingDate = new Date($scope.SemenPrep.SprermFreezingDate);
                $scope.SemenPrep.SprermFreezingTime = new Date($scope.SemenPrep.SprermFreezingDate);
                $scope.SemenPrep.CollectionDate = new Date($scope.SemenPrep.CollectionDate);
                $scope.SemenPrep.CollectionTime = new Date($scope.SemenPrep.CollectionDate);
                //$scope.SemenPrep.ReceivingDate = new Date($scope.SemenPrep.ReceivingDate);
                $scope.SemenPrep.TimeRecSampLab = new Date($scope.SemenPrep.TimeRecSampLab);
                $scope.SemenPrep.ReceivingTime = new Date($scope.SemenPrep.TimeRecSampLab);
                $scope.SemenPrep.ThawDate = new Date($scope.SemenPrep.ThawDate);
                $scope.SemenPrep.ThawTime = new Date($scope.SemenPrep.ThawDate);

                $scope.SemenPrep.GradeB = Response.data.PreNonProgressive;
                $scope.SemenPrep.GradeBPost = Response.data.PostNonProgressive;
                $scope.SemenPrep.GradeC = Response.data.PreImmotile;
                $scope.SemenPrep.GradeCPost = Response.data.PostImmotile;
                $scope.SemenPrep.GradeA = Response.data.PreProgressive;
                $scope.SemenPrep.GradeAPost = Response.data.PostProgressive;
                $scope.SemenPrep.Remarks = Response.data.Remarks

                $scope.SemenPrep.Remark = Response.data.Remark;


                $scope.ChangeSpermTypeUpdate();
                $scope.CheckSergicalSelected();
                $scope.IsFinalized = $scope.SemenPrep.IsFinalized;
                if (!$scope.isNullOrUndefined($scope.SemenPrep.STNo)) {
                    $scope.ViewBtnName = $scope.SemenPrep.STNo;
                    $scope.IsViewBtnDisable = false;
                }
                else {

                    $scope.ViewBtnName = 'View';
                    $scope.IsViewBtnDisable = true;
                }
                $scope.btnSaveUpdate = "Update";



                $scope.GetUserrights();

            }
            else {
                $scope.ismeridian = true;
                $scope.maxTime = new Date();
                $scope.SemenPrep.SprermFreezingDate = new Date();
                $scope.SemenPrep.SprermFreezingTime = new Date();
                $scope.SemenPrep.CollectionDate = new Date();
                $scope.SemenPrep.CollectionTime = new Date();
                $scope.SemenPrep.ReceivingDate = new Date();
                $scope.SemenPrep.ReceivingTime = new Date();
                //$scope.SemenPrep.ThawDate = new Date();
                // $scope.SemenPrep.ThawTime = new Date();
                $scope.SemenPrep.ThawDate = null;
                $scope.SemenPrep.ThawTime = null;
                $scope.SemenPrep.SampleCollected = false;
                $scope.SemenPrep.MaleVisitUnitID = 0;
                $scope.SemenPrep.MaleVisitID = 0;
                $scope.IsDisableFresh = false;
                $scope.IsDisableTypeSpermDiv = true;
            }
        }, function (error) {
        });

    };

    $scope.isNullOrUndefined = function (value) {
        return (!value) && (value === null)
    }

    $scope.Load = function Load() {
        $scope.ismeridian = true;
        $scope.maxTime = new Date();
        $scope.SemenPrep.CollectionDate = new Date();
        $scope.SemenPrep.TimeRecSampLab = new Date();
        $scope.SemenPrep.SprermFreezingDate = new Date();
        $scope.SemenPrep.ReceivingTime = new Date();
        $scope.SemenPrep.CollectionTime = new Date();
        $scope.SemenPrep.SprermFreezingTime = new Date();
        //$scope.SemenPrep.ThawDate = new Date();
        //$scope.SemenPrep.ThawTime = new Date();
        $scope.GetSpermTypeList();
        $scope.FillAbstinenceList();
        $scope.GetEmbryologyDoctorsList();
        $scope.GetSemenPrepMethodList();
        $scope.GetListSemenCollection();
        $scope.FetchMethodSurgicalSRetrieval();
        $scope.GetSemenPreparationListForTC();
        $scope.GetUserrights();
    }

    $scope.ValidateSemenPrep = function () {
        var IsValid = true;
        if (($scope.SemenPrep.WitnessByID == $scope.SemenPrep.CheckedByDoctorID) && ($scope.SemenPrep.WitnessByID != 0 || $scope.SemenPrep.CheckedByDoctorID != 0)) {
            AlertMessage.info('PalashIVF', 'Witnessed By and  Done By can not be same');
            IsValid = false;
        }
            //Code for dropdawn Date Time Validation
        else if ($scope.SemenPrep.SpermTypeID == 1) {
            $scope.SemenPrep.CollectionDate = new Date($scope.SemenPrep.CollectionDate.getFullYear(), $scope.SemenPrep.CollectionDate.getMonth(), $scope.SemenPrep.CollectionDate.getDate(),
            $scope.SemenPrep.CollectionTime.getHours(), $scope.SemenPrep.CollectionTime.getMinutes(), 0);

            $scope.SemenPrep.TimeRecSampLab = new Date($scope.SemenPrep.TimeRecSampLab.getFullYear(), $scope.SemenPrep.TimeRecSampLab.getMonth(), $scope.SemenPrep.TimeRecSampLab.getDate(),
              $scope.SemenPrep.ReceivingTime.getHours(), $scope.SemenPrep.ReceivingTime.getMinutes(), 0);

            debugger;
            if (
                // $filter('date')(new Date($scope.SemenPrep.CollectionDate, 'shortDate')) > $filter('date')(new Date($scope.SemenPrep.TimeRecSampLab, 'shortDate'))) {   commented by  Nayan Kamble on 28/11/2019
                $scope.SemenPrep.CollectionDate > $scope.SemenPrep.TimeRecSampLab) {        //modified by Nayan Kamble on 28/11/2019
                AlertMessage.info('PalashIVF', 'Collection date should be less than or equal to Receiving Date');
                IsValid = false;
            }
                //else if (angular.isUndefined($scope.SemenPrep.CollectionTime) || $scope.SemenPrep.CollectionTime == '' || $scope.SemenPrep.CollectionTime == null) {
                //    AlertMessage.info('PalashIVF', 'Select collection time');
                //    IsValid = false;
                //}
            else if ($filter('date')(new Date($scope.SemenPrep.CollectionTime, 'h:mm a')) > $filter('date')(new Date($scope.SemenPrep.ReceivingTime, 'h:mm a')) && $filter('date')(new Date($scope.SemenPrep.CollectionDate, 'shortDate')) == $filter('date')(new Date($scope.SemenPrep.TimeRecSampLab, 'shortDate'))) {
                AlertMessage.info('PalashIVF', 'Collection time should be equal to or less than receving Time');
                IsValid = false;
            }
            //Begin :: Added by AniketK on 05March2020
            else if ($scope.SemenPrep.SprermFreezingDate < $scope.SemenPrep.TimeRecSampLab) {
                AlertMessage.info('PalashIVF', 'Prepration date should be greater than or equal to Receiving Date');
                IsValid = false;
            }

            else if ($scope.SemenPrep.SprermFreezingDate < $scope.SemenPrep.ReceivingTime) {
                AlertMessage.info('PalashIVF', 'Prepration time should be greater than or equal to Receiving time');
                IsValid = false;
            }
           //End :: Added by AniketK on 05March2020

                //Code for dropdawn validation
            else if ($scope.SemenPrep.SampleCollected == "0" && $scope.SemenPrep.MethodOfCollection == 0 && $scope.SemenPrep.SpermTypeID == 1) {
                AlertMessage.info('PalashIVF', 'Please select Method Of Collection');
                IsValid = false;
            }
            else if ($scope.SemenPrep.CheckedByDoctorID == 0) {
                AlertMessage.info('PalashIVF', 'Please select Done By');
                IsValid = false;
            }
            else if ($scope.SemenPrep.WitnessByID == 0) {
                AlertMessage.info('PalashIVF', 'Please select Witnessed By');
                IsValid = false;
            }
                //Added by Nayan Kamble on 24/06/2019  START
            else if ($scope.SemenPrep.IVFMOSPCode == 0) {
                AlertMessage.warning('PalashIVF', 'Please fill mandatory fields.');
                IsValid = false;
            }
            else if ($scope.SemenPrep.Volume == undefined || $scope.SemenPrep.VolumePost == undefined ||
                $scope.SemenPrep.SpermConcentration == undefined || $scope.SemenPrep.SpermConcentrationPost == undefined ||
                $scope.SemenPrep.GradeA == undefined ||  $scope.SemenPrep.GradeAPost == undefined || 
                $scope.SemenPrep.GradeB == undefined ||  $scope.SemenPrep.GradeBPost == undefined || 
                $scope.SemenPrep.GradeC == undefined ||  $scope.SemenPrep.GradeCPost == undefined )
            {
                AlertMessage.warning('PalashIVF', 'Please fill mandatory fields.');
                IsValid = false;

            }
            //  END
        }
         //Commented and Modified by AniketK on 17Sept to remove validation for inhouse if Type of Sperm is Frozen
        //else if ($scope.SemenPrep.SpermTypeID == 2) {
        else if ($scope.SemenPrep.FrozenSampleCollected == 1 && $scope.SemenPrep.SpermTypeID == 2) {
            debugger;
            if (angular.isUndefined($scope.SemenPrep.ThawDate) || $scope.SemenPrep.ThawDate == '' || $scope.SemenPrep.ThawDate == null) {
                AlertMessage.info('PalashIVF', 'Thaw Date Can not be Empty');
                IsValid = false;
            }
            else if (angular.isUndefined($scope.SemenPrep.ThawTime) || $scope.SemenPrep.ThawTime == '' || $scope.SemenPrep.ThawTime == null) {
                AlertMessage.info('PalashIVF', 'Thaw Time Can not be Empty');
                IsValid = false;
            }

            else if ($scope.SemenPrep.CryNo == null || $scope.SemenPrep.CryNo == '' || $scope.SemenPrep.CryNo == undefined) {
                AlertMessage.info('PalashIVF', 'Cryo No Can Not Be Empty');
                IsValid = false;
            }
        }
      

       
        return IsValid;
    }

    $scope.SaveUpdate = function (SemenPrep) {
        debugger;
        if ($scope.ValidateSemenPrep() && $scope.frmSemenPrep.PrepDate.$valid && $scope.SemenPrep.SpermTypeID != 0 && $scope.frmSemenPrep.CollectionDate.$valid && $scope.frmSemenPrep.CollectionTime.$valid && $scope.frmSemenPrep.ReceivingDate.$valid && $scope.frmSemenPrep.ReceivingTime.$valid && $scope.frmSemenPrep.ddlSemenCollection.$valid && $scope.frmSemenPrep.ddlSemenPrepMethod.$valid && $scope.frmSemenPrep.txtVolume.$valid && $scope.frmSemenPrep.txtVolumePost.$valid && $scope.frmSemenPrep.txtSpermConce.$valid && $scope.frmSemenPrep.txtSpermConcePost.$valid && $scope.frmSemenPrep.txtProgressive.$valid && $scope.frmSemenPrep.txtProgressivePost.$valid && $scope.frmSemenPrep.txtNonProgressive.$valid && $scope.frmSemenPrep.txtNonProgressivePost.$valid && $scope.frmSemenPrep.txtImmotile.$valid && $scope.frmSemenPrep.txtImmotilePost.$valid && !$scope.SemenPrep.CheckedByDoctorID == 0 && !$scope.SemenPrep.WitnessByID == 0)// && $scope.frmSemenPrep.$valid) {
        {
            if ($scope.SemenPrep.SpermTypeID == 1) {
                $scope.IsDisableFresh = false;
                $scope.SemenPrep.ThawDate = null;
                $scope.SemenPrep.ThawTime = null;
                SemenPrep.CollectionDate = new Date(SemenPrep.CollectionDate.getFullYear(), SemenPrep.CollectionDate.getMonth(), SemenPrep.CollectionDate.getDate(),
               SemenPrep.CollectionTime.getHours(), SemenPrep.CollectionTime.getMinutes(), 0);

                SemenPrep.TimeRecSampLab = new Date(SemenPrep.TimeRecSampLab.getFullYear(), SemenPrep.TimeRecSampLab.getMonth(), SemenPrep.TimeRecSampLab.getDate(),
                    SemenPrep.ReceivingTime.getHours(), SemenPrep.ReceivingTime.getMinutes(), 0);
                //date Filter before save
                SemenPrep.CollectionDate = $filter('date')(SemenPrep.CollectionDate, 'medium');
                SemenPrep.TimeRecSampLab = $filter('date')(SemenPrep.TimeRecSampLab, 'medium');
            }
            //else { //Commented and Modified by AniketK on 17Sept to remove validation for inhouse if Type of Sperm is Frozen
            else if ($scope.SemenPrep.FrozenSampleCollected == 1 && $scope.SemenPrep.SpermTypeID == 2){
                $scope.IsDisableFresh = true;
                $scope.SemenPrep.CollectionDate = null;
                $scope.SemenPrep.CollectionTime = null;
                $scope.SemenPrep.TimeRecSampLab = null;
                $scope.SemenPrep.ReceivingTime = null;

                SemenPrep.ThawDate = new Date(SemenPrep.ThawDate.getFullYear(), SemenPrep.ThawDate.getMonth(), SemenPrep.ThawDate.getDate(),
                SemenPrep.ThawTime.getHours(), SemenPrep.ThawTime.getMinutes(), 0)

                SemenPrep.ThawDate = $filter('date')(SemenPrep.ThawDate, 'medium');
            }
            SemenPrep.SprermFreezingDate = new Date(SemenPrep.SprermFreezingDate.getFullYear(), SemenPrep.SprermFreezingDate.getMonth(), SemenPrep.SprermFreezingDate.getDate(),
               SemenPrep.SprermFreezingTime.getHours(), SemenPrep.SprermFreezingTime.getMinutes(), 0);
            SemenPrep.SprermFreezingDate = $filter('date')(SemenPrep.SprermFreezingDate, 'medium');

            SemenPrep.IsFrozenSample = $scope.IsFrozenSample;




            if ($scope.sNoArray != null)
                SemenPrep.STNo = $scope.sNoArray[0];

            SemenPrep.PreNonProgressive = SemenPrep.GradeB;
            SemenPrep.PostNonProgressive = SemenPrep.GradeBPost;
            SemenPrep.PreImmotile = SemenPrep.GradeC;
            SemenPrep.PostImmotile = SemenPrep.GradeCPost;
            SemenPrep.PreProgressive = SemenPrep.GradeA;
            SemenPrep.PostProgressive = SemenPrep.GradeAPost;

            var Promise = SemenPrepService.SaveUpdate(SemenPrep);
            Promise.then(function (resp) {
                if (resp.data == 1) {

                    AlertMessage.info('PalashIVF', 'Record saved successfully!');
                    $route.reload();
                    if (!angular.isUndefined(localStorageService.get('FromSemenDetails')) && localStorageService.get('FromSemenDetails')) {
                        localStorageService.set('FromSemenPreparation', true);
                        localStorage.set("SemenPreparationData", JSON.stringify(SemenPrep));
                        debugger;

                        localStorageService.remove('FromSemenDetails');
                        $location.path("SemenDetails/");

                    }
                    else{
                     $location.path("SemenPreparation")
                    }
                    $scope.SemenPrep = {};
                    $scope.SemenPrep.SpermTypeID = 0;
                    $scope.ViewBtnName = 'View';
                    $scope.IsViewBtnDisable = true;
                    $scope.Load();
                }
                else if (resp.data == 2) {
                    AlertMessage.info('PalashIVF', 'Record updated successfully.');
                    $scope.SemenPrep = {};
                    $scope.SemenPrep.SpermTypeID = 0;
                    $scope.ViewBtnName = 'View';
                    $scope.IsViewBtnDisable = true;
                    $scope.Load();
                }
            }, function (error) {
            });
        }
        else {
            $scope.frmSemenPrep.ddlTypeofSperm.$dirty = true;
            $scope.frmSemenPrep.PrepDate.$dirty = true;
            $scope.frmSemenPrep.ddlTypeofSperm.$dirty = true;
            $scope.frmSemenPrep.ddlSemenCollection.$dirty = true;
            $scope.frmSemenPrep.ddlSemenPrepMethod.$dirty = true;
            $scope.frmSemenPrep.txtVolume.$dirty = true;
            $scope.frmSemenPrep.txtVolumePost.$dirty = true;
            $scope.frmSemenPrep.txtSpermConce.$dirty = true;
            $scope.frmSemenPrep.txtSpermConcePost.$dirty = true;
            $scope.frmSemenPrep.txtSpermConce.$dirty = true;
            $scope.frmSemenPrep.txtProgressive.$dirty = true;
            $scope.frmSemenPrep.txtProgressivePost.$dirty = true;
            $scope.frmSemenPrep.txtNonProgressive.$dirty = true;
            $scope.frmSemenPrep.txtNonProgressivePost.$dirty = true;
            $scope.frmSemenPrep.txtImmotile.$dirty = true;
            $scope.frmSemenPrep.txtImmotilePost.$dirty = true;
            $scope.frmSemenPrep.ddlDoneby.$dirty = true;
            $scope.frmSemenPrep.ddlWitnessedby.$dirty = true;
        }
    }

    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
        //if ($scope.selectedPatient.GenderID == 1) {
        debugger;
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 318 && lstUserRights[z].Active)//Semen Processing
            {
                $scope.objRgt = lstUserRights[z];
                break;
            }
        }
        //}
        if (!$scope.objRgt.IsCreate && $scope.btnSaveUpdate == "Save") {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && $scope.btnSaveUpdate == "Update") {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }
        else {
            angular.element(btnSaveUpdate).prop('disabled', false);
        }
        debugger;
        if (($scope.selectedPatient.VisitID == 0 && $scope.selectedPatient.VisitUnitID == 0) || ($scope.selectedPatient.VisitID == undefined && $scope.selectedPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;

        //by arz on 30012018     
        if ($scope.IsVisitMarked || $scope.IsFinalized) {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }


    }

    $scope.SemenPreparationPrint = function (item) {
        debugger;
        var a = encodeURIComponent('PID=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PUID=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&VID=' + 0 + '&SRNo=' + item.SNo);
        window.open('/Reports/EMR/SemenPreparationPrint.aspx?' + encodeURIComponent(a), '_blank');
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

angular.module('PIVF').directive('allowDecimalNumbersWithPrecisionAndScaleRestricted', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                debugger;
                var $input = $(this);
                var value = $input.val();
                var array = value.split('.');
                //console.log(array);
                value = value.replace(/[^0-9\.]/g, '')
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }

                // Dont allow more than 1 digit precision and more than 3 digit scale
                if (containsDot != null) {
                    //console.log(‘If block with dot precision’, array[0].length);
                    //console.log(‘If block with dot scale’, array[1].length);
                    if ([8, 13, 27, 25, 36, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows 
                        return true;
                    } else {
                        if (array[0].length > 3 || array[1].length > 1) {
                            event.preventDefault();
                            return false;
                        }
                    }
                } else {
                    //console.log(‘If block without dot’, array[0].length);
                    if ([8, 13, 27, 35, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows 
                        return true;
                    } else {
                        //console.log(‘First array length’, array[0].length);
                        if (!angular.isUndefined(array[0]) && array[0].length > 2 && [46, 110,190].indexOf(event.which)==-1) {
                            event.preventDefault();
                            return false;
                        }
                    }
                }

                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    // numbers 
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows 
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers 
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number 
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot 
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});