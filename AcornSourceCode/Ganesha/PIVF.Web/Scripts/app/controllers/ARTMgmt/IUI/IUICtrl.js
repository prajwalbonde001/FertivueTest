'use strict';

angular.module('PIVF').controller('IUICtr', function ($rootScope, $scope, $location, AlertMessage, swalMessages, Common, IUISrv, srvCommon, $filter, $uibModal, PageConfig) {
    $rootScope.FormName = 'IUI';
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.IUI = {};
    $scope.IUI.ListSemenThawing = [];
    $scope.IUI.ListSemenThawingDetails = [];
    $scope.IUIUpdate = {};
    //$scope.ViewBtnName = 'View';
    $scope.IUI.Abstinence = 0;
    $scope.IsFrozenSampleCollectedInhouse = true;//To enable Frozen Sample selection
    $scope.IsSergicalOptionSelected = true;
    $scope.IsDisableFresh = false;//To enable Fresh Sample selection 
    //for visit check  
    $scope.SelectedPatient = {};
    $scope.SelectedCouple = {};
    $scope.SelectedCouple.FemalePatient = {};
    $scope.SelectedCouple.MalePatient = {};
    $scope.MaleVisitID = 0;
    $scope.MaleVisitUnitID = 0;
    $scope.ArtTypeID = 0;
    $scope.ArtSubTypeID = 0;
    $scope.DonorList = [];
    $scope.SearchDonor = {};
    $scope.DonorCode = "";
    $rootScope.OrderList = 0;
    $rootScope.ForConsent = 0;
    $scope.AlreadyGet = false;
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    /* START for Resource */
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    /* Stop for Resource*/
    $scope.FreezSamplesLists = [];
    $scope.FreezSamplesDetailList = [];
    //
    $scope.IsSave = false;  //check if Finalized
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
    $scope.popupP = {
        openedP: false
    };
    $scope.openP = function ($event, item) {

        $event.preventDefault();
        $event.stopPropagation();
        item.openedP = true;
    };
    $scope.open = function ($event, Item) {
        $event.preventDefault();
        $event.stopPropagation();
        Item.opened = true;
    };
    //For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
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
    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }
    //$scope.SpermTypeList = function SpermTypeList() {
    //    var ResponseData = Common.getMasterList('M_SpermType', 'SpermTypeID', 'SpermDescription');
    //    ResponseData.then(function (Response) {
    //        // var tmpArr = [0, 6, 8, 10, 12, 13];
    //        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
    //        $scope.SpermTypeList = []
    //        //Response.data.splice(0, 0, { ID: 0, Description: "Select" });
    //        $scope.TempSpermTypeList = Response.data;//.filter(x=>tmpArr.includes(x.ID));
    //        if ($scope.TempSpermTypeList != null) {
    //            for (var count = 0; count < 3; count++) {
    //                $scope.SpermTypeList.push($scope.TempSpermTypeList[count]);
    //            }
    //        }
    //        if ($scope.IUI.SpermTypeID == undefined || $scope.IUI.SpermTypeID == 0) {
    //            $scope.IUI.SpermTypeID = 0;
    //        }
    //    }, function (error) {
    //    });
    //};
    //$scope.FillAbstinenceList = function FillAbstinenceList() {

    //    var ResponseData = Common.getMasterList('M_Abstinence', 'AbstID', 'Description');
    //    ResponseData.then(function (Response) {
    //        //      
    //        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
    //        $scope.AbstinenceList = Response.data;
    //        $scope.IUI.Abstinence = 0;
    //    }, function (error) {
    //    });
    //};
    if (angular.isDefined($scope.GetData) && !angular.equals({}, $scope.GetData)) {

        if (angular.isDefined($scope.GetData.TempName)) {
            $scope.GetTemplateByID();
            $scope.IsModify = 1;
            $scope.IsFormShow = 1;
        }
        else {
            $scope.IsFormShow = 0;
            $scope.IsSave = 1;
            $scope.IsModify = 0;
        }
    }   
    //Code to check Frozen Selected radio button
    $scope.ChangeFrozenSampleCollected = function ChangeFrozenSampleCollected() {
        debugger;
        if ($scope.IUI.FrozenSampleCollected == "0") {
            $scope.IsFrozenSampleCollectedInhouse = true;
            $scope.IUI.CryNo = null;
            for (var i = 0; i < $scope.IUI.ListSemenThawing.length; i++) {  // added sujata for IUI cycle 
                $scope.IUI.ListSemenThawing[i].IsThaw = false;

            }
            // $scope.IUI.ThawDate = null;
            // $scope.IUI.ThawTime = null;
        }
        else {
            $scope.IUI.CryNo = null;
            $scope.IsFrozenSampleCollectedInhouse = false;
            $scope.IUI.CryNo = null;

            for (var i = 0; i < $scope.IUI.ListSemenThawing.length; i++) {  // added sujata for IUI cycle 
                $scope.IUI.ListSemenThawing[i].IsThaw = false;
            }
            // $scope.IUI.ThawDate = null;
            // $scope.IUI.ThawTime = null;

        }
    }
    //Code to enable fresh or Frozen for sperm selection
    $scope.ChangeSpermType = function () {
        $scope.IsDisableTypeSpermDiv = true;
        $scope.IUI.MethodOfCollection = 0;
        $scope.IUI.MethodSurgicalSRetrievalID = 0;
        $scope.IUI.Abstinence = 0;
        if ($scope.IUI.SpermTypeID == 1) {
            debugger;
            $scope.IsDisableFresh = false;
            $scope.IsDisableTypeSpermDiv = false;
            debugger;
            if ($scope.MaleVisitID == 0 && $scope.MaleVisitUnitID == 0) {
                $scope.NevigateVisitForMalePopUP($scope.SelectedCouple.MalePatient.MaleId, $scope.SelectedCouple.MalePatient.MAleUnitID);
            }

            for (var i = 0; i < $scope.IUI.ListSemenThawing.length; i++)
            {
                $scope.IUI.Volume = '';
                $scope.IUI.VolumePost = ''
                $scope.IUI.SpermConcentration = '';
                $scope.IUI.SpermConcentrationPost = '';
                $scope.IUI.SpermCount = '';
                $scope.IUI.SpermCountPost = '';
                $scope.IUI.Motility = '';
                $scope.IUI.MotilityPost = '';
                $scope.IUI.GradeA = '';
                $scope.IUI.GradeAPost = '';
                $scope.IUI.GradeB = '';
                $scope.IUI.GradeBPost = ''
                $scope.IUI.GradeC = '';
                $scope.IUI.GradeCPost = '';
                $scope.IUI.WBC = '';
                $scope.IUI.PostWBCCell = ''
                $scope.IUI.PreWBCCell = '';
                $scope.IUI.PrePusCells = '';
                $scope.IUI.PostPusCells = '';
                $scope.IUI.PreRBCells = '';
                $scope.IUI.PostRBCells = '';
                $scope.IUI.PreEpithelialCells = '';
                $scope.IUI.PostEpithelialCells = '';

               
            }
            //Added by Nayan Kamble on 26/08/2019  START
            $scope.IUI.Volume = '';
            $scope.IUI.VolumePost = '';
            $scope.IUI.SpermConcentration = '';
            $scope.IUI.SpermConcentrationPost = '';
            $scope.IUI.SpermCount = '';
            $scope.IUI.SpermCountPost = '';
            $scope.IUI.Motility = '';
            $scope.IUI.MotilityPost = '';
            $scope.IUI.MotilityCnt = '';
            $scope.IUI.MotilityCntPost = '';
            $scope.IUI.GradeA = '';
            $scope.IUI.GradeAPost = '';
            $scope.IUI.GradeB = '';
            $scope.IUI.GradeBPost = '';
            $scope.IUI.GradeC = '';
            $scope.IUI.GradeCPost = '';
            $scope.IUI.PreWBCCell = '';
            $scope.IUI.PostWBCCell = '';
            $scope.IUI.PrePusCells = '';
            $scope.IUI.PostPusCells = '';
            $scope.IUI.PreRBCells = '';
            $scope.IUI.PostRBCells = '';
            $scope.IUI.PreEpithelialCells = '';
            $scope.IUI.PostEpithelialCells = '';
            //Added by Nayan Kamble on 26/08/2019  END

            $scope.IUI.IsFrozenSample = false;
        }
        else if ($scope.IUI.SpermTypeID == 2) {
            $scope.IsDisableFresh = true;
            $scope.IsDisableTypeSpermDiv = true;
            $scope.IUI.IsFrozenSample = true;


            for (var i = 0; i < $scope.IUI.ListSemenThawing.length; i++) {
                $scope.IUI.Volume = '';
                $scope.IUI.VolumePost=''
                $scope.IUI.SpermConcentration = '';
                $scope.IUI.SpermConcentrationPost = '';
                $scope.IUI.SpermCount = '';
                $scope.IUI.SpermCountPost = '';
                $scope.IUI.Motility = '';
                $scope.IUI.MotilityPost = '';
                $scope.IUI.GradeA = '';
                $scope.IUI.GradeAPost = '';
                $scope.IUI.GradeB = '';
                $scope.IUI.GradeBPost=''
                $scope.IUI.GradeC = '';
                $scope.IUI.GradeCPost = '';
                $scope.IUI.WBC = '';
                $scope.IUI.PostWBCCell=''
                $scope.IUI.PreWBCCell = '';
                $scope.IUI.PrePusCells = '';
                $scope.IUI.PostPusCells = '';
                $scope.IUI.PreRBCells = '';
                $scope.IUI.PostRBCells = '';
                $scope.IUI.PreEpithelialCells = '';
                $scope.IUI.PostEpithelialCells = '';

            }
            //Added by Nayan Kamble on 26/08/2019  START
            $scope.IUI.Volume = '';
            $scope.IUI.VolumePost = '';
            $scope.IUI.SpermConcentration = '';
            $scope.IUI.SpermConcentrationPost = '';
            $scope.IUI.SpermCount = '';
            $scope.IUI.SpermCountPost = '';
            $scope.IUI.Motility = '';
            $scope.IUI.MotilityPost = '';
            $scope.IUI.MotilityCnt = '';
            $scope.IUI.MotilityCntPost = '';
            $scope.IUI.GradeA = '';
            $scope.IUI.GradeAPost = '';
            $scope.IUI.GradeB = '';
            $scope.IUI.GradeBPost = '';
            $scope.IUI.GradeC = '';
            $scope.IUI.GradeCPost = '';
            $scope.IUI.PreWBCCell = '';
            $scope.IUI.PostWBCCell = '';
            $scope.IUI.PrePusCells = '';
            $scope.IUI.PostPusCells = '';
            $scope.IUI.PreRBCells = '';
            $scope.IUI.PostRBCells = '';
            $scope.IUI.PreEpithelialCells = '';
            $scope.IUI.PostEpithelialCells = '';
            //Added by Nayan Kamble on 26/08/2019  END
            
        }
        else {
            $scope.IsDisableFresh = false;
            $scope.IsDisableTypeSpermDiv = true;
            
        }
    };
    //$scope.GetEmbryologyDoctorsList = function GetEmbryologyDoctorsList() {
    //    var ResponseData = Common.GetEmbryologyDoctorsList();
    //    ResponseData.then(function (Response) {
    //        Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
    //        $scope.DocList = Response.data.EmbryologistAndrologist;
    //        $scope.IUI.CheckedByDoctorID = 0;
    //        $scope.IUI.WitnessByID = 0;
    //        $scope.IUI.InSeminatedByID = 0;
    //        if ($scope.FreezSamplesDetailList.WitnessedBy == undefined)
    //            $scope.FreezSamplesDetailList.WitnessedBy = 0;
    //        if ($scope.FreezSamplesDetailList.DoneBy == undefined)
    //            $scope.FreezSamplesDetailList.DoneBy = 0;
    //    }, function (error) {
    //    });
    //};
    ////get Semen preparation method list
    //$scope.GetIUIMethodList = function GetIUIMethodList() {
    //    var ResponseData = Common.getMasterList('M_IVF_MethodOfSpermPreparationMaster', 'IVFMOSPCode', 'Description');
    //    ResponseData.then(function (Response) {
    //        debugger;
    //        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
    //        $scope.IUIMethodList = Response.data;
    //        $scope.IUI.InSeminationMethodID = 0;
    //    }, function (error) {
    //    });
    //}
    //$scope.FetchMethodSurgicalSRetrieval = function FetchMethodSurgicalSRetrieval() {
    //    var ResponseData = Common.getMasterList('M_MethodSurgicalSRetrieval', 'MOSSRetrivalID', 'MOSSRetrivalDescription');
    //    ResponseData.then(function (Response) {
    //        Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
    //        $scope.MethodSurgicalSRetrievalList = Response.data;
    //        $scope.IUI.MethodSurgicalSRetrievalID = 0;
    //    }, function (error) {
    //        $scope.Error = error;
    //    });
    //}
    //$scope.GetListSemenCollection = function GetListSemenCollection() {
    //    var ResponseData = Common.getMasterList('M_MethodofSpermCollection', 'Code', 'Description');
    //    ResponseData.then(function (Response) {
    //        Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
    //        $scope.SemenCollectionList = Response.data;
    //        if ($scope.IUI.MethodOfCollection == 0 || $scope.IUI.MethodOfCollection == null || $scope.IUI.MethodOfCollection == undefined)
    //             $scope.IUI.MethodOfCollection = 0;
            
    //    }, function (error) {
    //        $scope.Error = error;
    //    });
    //}
    $scope.CheckSergicalSelected = function CheckSergicalSelected() {
        if ($scope.IUI.MethodOfCollection == 2) {
            $scope.IsSergicalOptionSelected = false
        }
        else {
            $scope.IsSergicalOptionSelected = true;
            $scope.IUI.MethodSurgicalSRetrievalID = 0;
        }
    }
    //Check Volume should less than 9
    $scope.CheckVolume = function CheckVolume() {
        if ($scope.IUI.Volume == 9) {
            $scope.IUI.Volume = '';
            AlertMessage.error('PalashIVF', 'Volume should be less than 9');
        }
    }
    // Calculation for Slow Progress Pres
    $scope.CalcSlowProg = function () {
        if ($scope.IUI.GradeA == undefined || $scope.IUI.GradeA == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            //if (parseInt($scope.OSlowProgressive) != parseInt($scope.IUI.SlowProgressive)) {
            $scope.IUI.SlowProgressive = parseInt($scope.IUI.GradeA) - parseInt($scope.IUI.RapidProgressive);
            if ($scope.IUI.SlowProgressive < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.IUI.SlowProgressive = $scope.OSlowProgressive;
                $scope.IUI.RapidProgressive = $scope.ORapidProgressive;
            }
            if (parseInt($scope.IUI.RapidProgressive))
                $scope.IsMandatory = true;
            else $scope.IsMandatory = false;
            //}
        }
    }
    // Calculation for Slow Progress Post
    $scope.CalcSlowProgPost = function () {
        if ($scope.IUI.GradeAPost == undefined || $scope.IUI.GradeAPost == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            $scope.IUI.SlowProgressivePost = parseInt($scope.IUI.GradeAPost) - parseInt($scope.IUI.RapidProgressivePost);
            if ($scope.IUI.SlowProgressivePost < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.IUI.SlowProgressivePost = $scope.OSlowProgressivePost;
                $scope.IUI.RapidProgressivePost = $scope.ORapidProgressivePost;
            }
            if (parseInt($scope.IUI.RapidProgressivePost))
                $scope.IsMandatoryPost = true;
            else $scope.IsMandatoryPost = false;
        }
    }
    //Calculate Progressive non progressive motility imotility
    $scope.CalculateMotilityAss = function CalculateMotilityAss() {
        if ((angular.isDefined($scope.IUI.GradeA) && $scope.IUI.GradeA != '') && (angular.isDefined($scope.IUI.GradeB) && $scope.IUI.GradeB != '')) {
            $scope.IUI.Motility = parseInt($scope.IUI.GradeA) + parseInt($scope.IUI.GradeB);
            $scope.IUI.MotilityCnt = parseFloat((((parseFloat($scope.IUI.SpermConcentration)) * (parseInt($scope.IUI.Motility))) / 300).toFixed(2));


            $scope.ChkImmotile();
            $scope.IUI.GradeC = 100 - (parseInt($scope.IUI.GradeA) + parseInt($scope.IUI.GradeB));
            if ($scope.IUI.GradeC < 0) {
                $scope.IUI.GradeA = $scope.OGradeA;
                $scope.IUI.GradeB = $scope.OGradeB;
                $scope.IUI.GradeC = $scope.OGradeC;
                $scope.IUI.MotilityCnt = null;

                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isDefined($scope.IUI.GradeA) && $scope.IUI.GradeA != '') && ($scope.IUI.GradeB == '' || angular.isUndefined($scope.IUI.GradeB)) && (angular.isDefined($scope.IUI.GradeC) && $scope.IUI.GradeC != '')) {
            $scope.IUI.GradeB = 100 - (parseInt($scope.IUI.GradeA) + parseInt($scope.IUI.GradeC));
            $scope.IUI.Motility = parseInt($scope.IUI.GradeA) + parseInt($scope.IUI.GradeB);
            $scope.IUI.MotilityCnt = parseFloat(((parseFloat($scope.IUI.SpermConcentration) * parseInt($scope.IUI.Motility)) / 300).toFixed(2));

            if ($scope.IUI.GradeB < 0) {
                $scope.IUI.GradeA = $scope.OGradeA;
                $scope.IUI.GradeB = $scope.OGradeB;
                $scope.IUI.GradeC = $scope.OGradeC;
                $scope.IUI.MotilityCnt = null;

                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isUndefined($scope.IUI.GradeA) || $scope.IUI.GradeA == '') && ($scope.IUI.GradeB != '' || angular.isDefined($scope.IUI.GradeB)) && (angular.isDefined($scope.IUI.GradeC) && $scope.IUI.GradeC != '')) {
            $scope.IUI.GradeA = 100 - (parseInt($scope.IUI.GradeB) + parseInt($scope.IUI.GradeC));
            $scope.IUI.Motility = parseInt($scope.IUI.GradeA) + parseInt($scope.IUI.GradeB);
            $scope.IUI.MotilityCnt = parseFloat(((parseFloat($scope.IUI.SpermConcentration) * parseInt($scope.IUI.Motility)) / 300).toFixed(2));

            if ($scope.IUI.GradeA < 0) {
                $scope.IUI.GradeA = $scope.OGradeA;
                $scope.IUI.GradeB = $scope.OGradeB;
                $scope.IUI.GradeC = $scope.OGradeC;
                $scope.IUI.MotilityCnt = null;

                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
    }
    //Calculate Progressive non progressive motility imotility Post
    $scope.CalculateMotilityAssPost = function CalculateMotilityAssPost() {
        if ((angular.isDefined($scope.IUI.GradeAPost) && $scope.IUI.GradeAPost != '') && (angular.isDefined($scope.IUI.GradeBPost) && $scope.IUI.GradeBPost != '')) {
            $scope.IUI.MotilityPost = parseInt($scope.IUI.GradeAPost) + parseInt($scope.IUI.GradeBPost);
            $scope.IUI.MotilityCntPost = parseFloat((((parseFloat($scope.IUI.SpermConcentrationPost)) * (parseInt($scope.IUI.MotilityPost))) / 300).toFixed(2));
           
            $scope.ChkImmotilePost();
            $scope.IUI.GradeCPost = 100 - (parseInt($scope.IUI.GradeAPost) + parseInt($scope.IUI.GradeBPost));
            if ($scope.IUI.GradeCPost < 0) {
                $scope.IUI.GradeAPost = $scope.OGradeAPost;
                $scope.IUI.GradeBPost = $scope.OGradeBPost;
                $scope.IUI.GradeCPost = $scope.OGradeCPost;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isDefined($scope.IUI.GradeAPost) && $scope.IUI.GradeAPost != '') && ($scope.IUI.GradeBPost == '' || angular.isUndefined($scope.IUI.GradeBPost)) && (angular.isDefined($scope.IUI.GradeCPost) && $scope.IUI.GradeCPost != '')) {
            $scope.IUI.GradeBPost = 100 - (parseInt($scope.IUI.GradeAPost) + parseInt($scope.IUI.GradeCPost));
            $scope.IUI.MotilityPost = parseInt($scope.IUI.GradeAPost) + parseInt($scope.IUI.GradeBPost);
            $scope.IUI.MotilityCntPost = parseFloat((((parseFloat($scope.IUI.SpermConcentrationPost)) * (parseInt($scope.IUI.MotilityPost))) / 300).toFixed(2));
            
            if ($scope.IUI.GradeBPost < 0) {
                $scope.IUI.GradeAPost = $scope.OGradeAPost;
                $scope.IUI.GradeBPost = $scope.OGradeBPost;
                $scope.IUI.GradeCPost = $scope.OGradeCPost;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isUndefined($scope.IUI.GradeAPost) || $scope.IUI.GradeAPost == '') && ($scope.IUI.GradeBPost != '' || angular.isDefined($scope.IUI.GradeBPost)) && (angular.isDefined($scope.IUI.GradeCPost) && $scope.IUI.GradeCPost != '')) {
            $scope.IUI.GradeAPost = 100 - (parseInt($scope.IUI.GradeBPost) + parseInt($scope.IUI.GradeCPost));
            $scope.IUI.MotilityPost = parseInt($scope.IUI.GradeAPost) + parseInt($scope.IUI.GradeBPost);
            $scope.IUI.MotilityCntPost = parseFloat((((parseFloat($scope.IUI.SpermConcentrationPost)) * (parseInt($scope.IUI.MotilityPost))) / 300).toFixed(2));
           
            if ($scope.IUI.GradeAPost < 0) {
                $scope.IUI.GradeAPost = $scope.OGradeAPost;
                $scope.IUI.GradeBPost = $scope.OGradeBPost;
                $scope.IUI.GradeCPost = $scope.OGradeCPost;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
    }
    // Immotile calculation for Post
    $scope.ChkImmotilePost = function () {
        if (parseInt($scope.IUI.GradeAPost) + parseInt($scope.IUI.GradeBPost) + parseInt($scope.IUI.GradeCPost) > 100)
            AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
    }
    $scope.ChkImmotile = function () {
        if (parseInt($scope.IUI.GradeA) + parseInt($scope.IUI.GradeB) + parseInt($scope.IUI.GradeC) > 100)
            AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
    }
    //Allow only one check box selection at time 
    $scope.updateSelection = function (position, entities) {
        angular.forEach(entities, function (subscription, index) {
            if (position != index)
                subscription.selected = false;
        });
    }
    $scope.UpdateLinkFinalize = function UpdateLinkFinalize() {
        debugger;
        //$scope.sNoArray = [];
        //$scope.cryoNoList = [];
        //angular.forEach($scope.ThowSamplesLists, function (item) {
        //    if (!!item.selected) {
        //        $scope.sNoArray.push(item.FormNo);
        //        $scope.cryoNoList.push(item.CryoNo);
        //    }
        //})
        //if ($scope.sNoArray.length == 0) {
        //    AlertMessage.info('PalashIVF', 'Please select atleast one item.');
        //    return;
        //}
        //else {
        //    $scope.ViewBtnName = $scope.sNoArray[0];
        //    $scope.IUI.CryNo = $scope.cryoNoList[0];
        //}

        //check if selected comes from only one frezing details
        debugger;
        var FreezID = 0;
        var IsFromSameFreezingDetail = false;
        $scope.ThawList = $filter('filter')($scope.ThowSamplesLists, function (d) { return d.IsThaw == true });
        debugger;
        for (var i = 0; i <= $scope.ThawList.length - 1; i++) {
            FreezID = $scope.ThawList[0].FreezingID;
            if (FreezID == $scope.ThawList[i].FreezingID) {
                IsFromSameFreezingDetail = true;
                if($scope.ThawList != null && $scope.ThawList != undefined)
                {
                    $scope.IUI.Volume = $scope.ThawList[i].Volume;
                    $scope.IUI.SpermConcentration = $scope.ThawList[i].SpermConcentration;
                    $scope.IUI.SpermCount = $scope.ThawList[i].SpermCount;
                    $scope.IUI.Motility = $scope.ThawList[i].Motility;
                    $scope.IUI.GradeA = $scope.ThawList[i].GradeA;
                    $scope.IUI.GradeB = $scope.ThawList[i].GradeB;
                    $scope.IUI.GradeC = $scope.ThawList[i].GradeC;
                    $scope.IUI.RapidProgressive = $scope.ThawList[i].RapidProgressive;
                    $scope.IUI.SlowProgressive = $scope.ThawList[i].SlowProgressive;
                    $scope.IUI.PreWBCCell = $scope.ThawList[i].WBC;
                    $scope.IUI.PrePusCells = $scope.ThawList[i].PusCells;
                    $scope.IUI.PreRBCells = $scope.ThawList[i].RBC;
                    $scope.IUI.PreEpithelialCells = $scope.ThawList[i].EpithelialCells;
                }
            }
            else {
                IsFromSameFreezingDetail = false;
                break;
            }
            
        }
        if (IsFromSameFreezingDetail == false) {
            AlertMessage.info("Select Sample From Same Freezing Details");            
        }
        else {
            angular.element(prePreparation).modal('hide');
        }
    }
    //Calculate rapid progeress
    $scope.CalcRapidProg = function () {
        if ($scope.IUI.GradeA == undefined || $scope.IUI.GradeA == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            if (parseInt($scope.ORapidProgressive) != parseInt($scope.IUI.RapidProgressive)) {
                $scope.IUI.RapidProgressive = parseInt($scope.IUI.GradeA) - parseInt($scope.IUI.SlowProgressive);
                if ($scope.IUI.RapidProgressive < 0) {
                    AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                    $scope.IUI.RapidProgressive = $scope.ORapidProgressive;
                    $scope.IUI.SlowProgressive = $scope.OSlowProgressive;
                }
                if (parseInt($scope.IUI.SlowProgressive))
                    $scope.IsMandatory = true;
                else $scope.IsMandatory = false;
            }
        }
    }
    //Calculate rapid progeress for Post
    $scope.CalcRapidProgPost = function () {
        if ($scope.IUI.GradeAPost == undefined || $scope.IUI.GradeAPost == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            if (parseInt($scope.ORapidProgressivePost) != parseInt($scope.IUI.RapidProgressivePost)) {
                $scope.IUI.RapidProgressivePost = parseInt($scope.IUI.GradeAPost) - parseInt($scope.IUI.SlowProgressivePost);
                if ($scope.IUI.RapidProgressivePost < 0) {
                    AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                    $scope.IUI.RapidProgressivePost = $scope.ORapidProgressivePost;
                    $scope.IUI.SlowProgressivePost = $scope.OSlowProgressivePost;
                }
                if (parseInt($scope.IUI.SlowProgressivePost))
                    $scope.IsMandatoryPost = true;
                else $scope.IsMandatoryPost = false;
            }
        }
    }
    //Get Semen Prepration List
    $scope.GetIUIarationList = function () {
        var ResponseData = IUISrv.GetIUIarationList();
        ResponseData.then(function (Response) {
            $scope.IUIList = Response.data;
        }, function (error) {
        });
    }

    //Changes by Tejas saxena for iui issue
   $scope.Load = function Load() {
    debugger;
    $scope.SelectedPatient = Common.getSelectedPatient();
    $scope.SelectedCouple = Common.getSelectedCouple();
    $scope.ArtTypeID = $scope.SelectedCouple.FemalePatient.ArtTypeID;
    $scope.ArtSubTypeID = $scope.SelectedCouple.FemalePatient.ArtSubTypeID;

    if ($scope.ArtSubTypeID == 2) {   // By DEFAULT FROZEN for IUI For visit Popup
        $scope.IUI.SpermTypeID = 2;
    }

    $scope.FillDropDowns().then(function() {
        $scope.GetIUIDetails(); // Ensure this is called after all dropdowns are loaded
    });
};


$scope.FillDropDowns = function FillDropDowns() {
    let promises = [
        $scope.SpermTypeList(),
        $scope.FillAbstinenceList(),
        $scope.GetEmbryologyDoctorsList(),
        $scope.GetIUIMethodList(),
        $scope.GetListSemenCollection(),
        $scope.FetchMethodSurgicalSRetrieval()
    ];

    return Promise.all(promises);  // Waits for all dropdowns to finish loading
};

// Updated SpermTypeList
$scope.SpermTypeList = function SpermTypeList() {
    return Common.getMasterList('M_SpermType', 'SpermTypeID', 'SpermDescription').then(function (Response) {
        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
        $scope.SpermTypeList = [];
        $scope.TempSpermTypeList = Response.data;
        
        if ($scope.TempSpermTypeList != null) {
            for (var count = 0; count < 3; count++) {
                $scope.SpermTypeList.push($scope.TempSpermTypeList[count]);
            }
        }

        if ($scope.IUI.SpermTypeID == undefined || $scope.IUI.SpermTypeID == 0) {
            $scope.IUI.SpermTypeID = 0;
        }
    });
};

// Updated FillAbstinenceList
$scope.FillAbstinenceList = function FillAbstinenceList() {
    return Common.getMasterList('M_Abstinence', 'AbstID', 'Description').then(function (Response) {
        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
        $scope.AbstinenceList = Response.data;
        $scope.IUI.Abstinence = 0;
    });
};

// Updated GetEmbryologyDoctorsList
$scope.GetEmbryologyDoctorsList = function GetEmbryologyDoctorsList() {
    return Common.GetEmbryologyDoctorsList().then(function (Response) {
        Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
        $scope.DocList = Response.data.EmbryologistAndrologist;
        $scope.IUI.CheckedByDoctorID = 0;
        $scope.IUI.WitnessByID = 0;
        $scope.IUI.InSeminatedByID = 0;
        $scope.FreezSamplesDetailList.WitnessedBy = $scope.FreezSamplesDetailList.WitnessedBy || 0;
        $scope.FreezSamplesDetailList.DoneBy = $scope.FreezSamplesDetailList.DoneBy || 0;
    });
};

// Updated GetIUIMethodList
$scope.GetIUIMethodList = function GetIUIMethodList() {
    return Common.getMasterList('M_IVF_MethodOfSpermPreparationMaster', 'IVFMOSPCode', 'Description').then(function (Response) {
        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
        $scope.IUIMethodList = Response.data;
        $scope.IUI.InSeminationMethodID = 0;
    });
};

// Updated FetchMethodSurgicalSRetrieval
$scope.FetchMethodSurgicalSRetrieval = function FetchMethodSurgicalSRetrieval() {
    return Common.getMasterList('M_MethodSurgicalSRetrieval', 'MOSSRetrivalID', 'MOSSRetrivalDescription').then(function (Response) {
        Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
        $scope.MethodSurgicalSRetrievalList = Response.data;
        $scope.IUI.MethodSurgicalSRetrievalID = 0;
    });
};

// Updated GetListSemenCollection
$scope.GetListSemenCollection = function GetListSemenCollection() {
    return Common.getMasterList('M_MethodofSpermCollection', 'Code', 'Description').then(function (Response) {
        Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
        $scope.SemenCollectionList = Response.data;
        $scope.IUI.MethodOfCollection = $scope.IUI.MethodOfCollection || 0;
    });
};

    //$scope.Load = function Load() {
    //    debugger;
    //    $scope.FillDropDowns();
    //    $scope.SelectedPatient = Common.getSelectedPatient();
    //    $scope.SelectedCouple = Common.getSelectedCouple();
    //    $scope.ArtTypeID = $scope.SelectedCouple.FemalePatient.ArtTypeID;
    //    $scope.ArtSubTypeID = $scope.SelectedCouple.FemalePatient.ArtSubTypeID;
    //    if ($scope.ArtSubTypeID == 2) {   //*by DEFAULT FROZEN for IUI For visit Popup
    //        $scope.IUI.SpermTypeID = 2;
    //    }
    //    $scope.GetIUIDetails();       
    //}
    //$scope.FillDropDowns = function FillDropDowns() {
    //    $scope.SpermTypeList();
    //    $scope.FillAbstinenceList();
    //    $scope.GetEmbryologyDoctorsList();
    //    $scope.GetIUIMethodList();
    //    $scope.GetListSemenCollection();
    //    $scope.FetchMethodSurgicalSRetrieval();
    //    //$scope.CheckIsIUIDonor();  //*Comented
    //}
    //for Pagging
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.PageChange = function PageChange() {
        $scope.GetDonorList();
    }
    ////
    //rohini for visit check  
    $scope.NevigateVisitForMalePopUP = function (ID, UnitID) {
        debugger;
        if (ID != undefined && ID != 0 && UnitID != undefined && UnitID != 0) {
            var response = Common.GetActiveVisitByPatient(ID, UnitID); //Get Visit list For selected patient
            response.then(function (resp) {
                if (resp.data.length > 1) { //Go cursor this scope when multiple visit
                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'visitmodel',
                        controller: 'visitmodelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'sm',
                        resolve: {
                            VisitInfo: function () {
                                return resp.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) { // return here after cancel reason entered
                        //Added by AniketK on 07July2020 for Video Consultation
                        var tempDate1 = new Date();
                        var date1 = tempDate1.getFullYear() * tempDate1.getMonth() * tempDate1.getDate();
                        var tempDate2 = new Date(data.Date);
                        var date2 = tempDate2.getFullYear() * tempDate2.getMonth() * tempDate2.getDate();
                        if (date1 == date2) {
                            $rootScope.VisitTypeID = data.VisitTypeID;
                        }
                        else {
                            $rootScope.VisitTypeID = 0;
                        }
                        if (!angular.equals({}, data)) {  //this scope is executed when particular one visit is selected                            
                            $scope.MaleVisitID = data.VisitID;
                            $scope.MaleVisitUnitID = data.VisitUnitID;
                        }
                    });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {
                    if (!angular.equals({}, resp.data)) {
                        $scope.MaleVisitID = resp.data[0].VisitID;
                        $scope.MaleVisitUnitID = resp.data[0].VisitUnitID;
                    }
                }
                else {
                    AlertMessage.info('PalashIVF', 'There is no active visit,Please Mark Visit For Partner In Case Of Fresh Sperm Type');
                    $scope.IsSave = true;
                }
            });
        }
    }
    ////
    $scope.ValidateIUI = function () {
        var IsValid = true;
        if ($scope.IUI.SpermTypeID == 1) {
            $scope.CurentDate = new Date();            
            if ($scope.IUI.CollectionDate != undefined && $scope.IUI.CollectionTime != undefined) {
                $scope.CollectionDate = new Date($scope.IUI.CollectionDate.getFullYear(), $scope.IUI.CollectionDate.getMonth(), $scope.IUI.CollectionDate.getDate(), $scope.IUI.CollectionTime.getHours(), $scope.IUI.CollectionTime.getMinutes(), 0);
                $scope.CollectionDate = new Date($scope.CollectionDate);
                if ($scope.IUI.ReceivingDate != undefined && $scope.IUI.ReceivingTime != undefined) {
                    $scope.ReceivingDate = new Date($scope.IUI.ReceivingDate.getFullYear(), $scope.IUI.ReceivingDate.getMonth(), $scope.IUI.ReceivingDate.getDate(), $scope.IUI.ReceivingTime.getHours(), $scope.IUI.ReceivingTime.getMinutes(), 0)
                    $scope.ReceivingDate = new Date($scope.ReceivingDate);
                }
                if ($scope.CollectionDate > $scope.ReceivingDate) {
                    AlertMessage.error('PalashIVF', 'Collection Date/Time should be less than or equal to Receiving Date/Time');
                    IsValid = false;
                }
                else if ($scope.CollectionDate > $scope.CurentDate) {
                    AlertMessage.error('PalashIVF', 'Collection Date/Time should be grater than current Date/Time');
                    IsValid = false;
                }
                else if ($scope.ReceivingDate > $scope.CurentDate && $scope.IsDisableTypeSpermDiv == false) {
                    AlertMessage.error('PalashIVF', 'Receiving Date/Time should be grater than current Date/Time');
                    IsValid = false;
                }
            }
            else {
                AlertMessage.error('PalashIVF', 'Enter Collection DateTime and Receiving DateTime');
            }
            if ($scope.IUI.MethodOfCollection == 0 && $scope.IUI.SpermTypeID == 1) {
                AlertMessage.error('PalashIVF', 'Please Select Method Of Collection');
                IsValid = false;
            }
            else if ($scope.IUI.SpermTypeID == 1 && $scope.MaleVisitID == 0 && $scope.MaleVisitUnitID == 0) {
                AlertMessage.error('PalashIVF', 'Please Select Male Visit In Case Of Fresh Sperm Type');
                IsValid = false;
            }
        }
        else if ($scope.IUI.SpermTypeID == 2) {
            if ($scope.IUI.CryNo == undefined || $scope.IUI.CryNo == null || $scope.IUI.CryNo == "") {
                AlertMessage.error('PalashIVF', 'Please Select Cryo Sample from Semen Details.');
                IsValid = false;
            }
        }
        else if ($scope.IUI.SpermTypeID == 0) {
            $scope.frmIUI.ddlTypeofSperm.$dirty = true;
            IsValid = false;
        }
        if ($scope.IUI.ListFreezThawSamples.length > 0 && $scope.IUI.IsFinalized == false) {
            AlertMessage.error('PalashIVF', 'You Have Linked Donor And samples. you can not save IUI without Finalize');
            IsValid = false;
        }
       
        return IsValid;
    }
    // Redirected to Thawing on link click
    //Get Semen Prepration List
    $scope.RedirectToThawing = function (formNo, action) {
        if (action == 'default') {
            var ResponseData = IUISrv.GetSemenThawingDetailFromIUIIDForTC(formNo, action);
            ResponseData.then(function (Response) {
                $scope.GetThawingDetailList = Response.data;
            }, function (error) {
            });
        }
        else if (action == 'Freezing') {
            var ResponseData = IUISrv.GetSemenThawingDetailFromIUIIDForTC(formNo, action);
            ResponseData.then(function (Response) {
                $scope.SemenFreezingList = Response.data;
            }, function (error) {
            });
        }
    };
    //Get Semen Prepration List
    $scope.GetIUIarationList = function () {
        var ResponseData = IUISrv.GetIUIarationList();
        ResponseData.then(function (Response) {
            $scope.IUIList = Response.data;
        }, function (error) {
        });
    }
    //rohini get saved data
    $scope.GetIUIDetails = function () {
        debugger;
        var ResponseData = IUISrv.GetIUIDetails();
        ResponseData.then(function (Response) {
            if (Response.data != null) {
                debugger;
                $scope.IUI = Response.data;
                $scope.ismeridian = true;
                $scope.maxTime = new Date();
                if ($scope.IUI.CollectionDate != undefined)
                    $scope.IUI.CollectionDate = new Date($scope.IUI.CollectionDate);
                else
                    $scope.IUI.CollectionDate = new Date();
                if ($scope.IUI.ThawDate != undefined)
                    $scope.IUI.ThawDate = new Date($scope.IUI.ThawDate);
                else
                    $scope.IUI.ThawDate = null;
                if ($scope.IUI.SprermFreezingDate != undefined)
                    $scope.IUI.SprermFreezingDate = new Date($scope.IUI.SprermFreezingDate);
                else
                    $scope.IUI.SprermFreezingDate = new Date();
                if ($scope.IUI.ReceivingDate != undefined)
                    $scope.IUI.ReceivingDate = new Date($scope.IUI.ReceivingDate);
                else
                    $scope.IUI.ReceivingDate = new Date();
                if ($scope.IUI.SprermFreezingTime != undefined)
                    $scope.IUI.SprermFreezingTime = new Date($scope.IUI.SprermFreezingTime);
                else
                    $scope.IUI.SprermFreezingTime = new Date();
                if ($scope.IUI.CollectionTime != undefined)
                    $scope.IUI.CollectionTime = new Date($scope.IUI.CollectionTime);
                else
                    $scope.IUI.CollectionTime = new Date();
                if ($scope.IUI.ReceivingTime != undefined)
                    $scope.IUI.ReceivingTime = new Date($scope.IUI.ReceivingTime);
                else
                    $scope.IUI.ReceivingTime = new Date();
                if ($scope.IUI.ThawTime != undefined)
                    $scope.IUI.ThawTime = new Date($scope.IUI.ThawTime);
                else
                    $scope.IUI.ThawTime = null;
                if ($scope.IUI.SprermFreezingTime != undefined)
                    $scope.IUI.SprermFreezingTime = new Date($scope.IUI.SprermFreezingTime);
                else
                    $scope.IUI.SprermFreezingTime = null;
                if ($scope.IUI.IsFinalized == true)
                    $scope.IsSave = true;
                $scope.MaleVisitUnitID = $scope.IUI.MaleVisitUnitID;
                $scope.MaleVisitID = $scope.IUI.MaleVisitID;
                $scope.IUI.GradeB = $scope.IUI.PreNonProgressive;
                $scope.IUI.GradeBPost = $scope.IUI.PostNonProgressive;
                $scope.IUI.GradeC = $scope.IUI.PreImmotile;
                $scope.IUI.GradeCPost = $scope.IUI.PostImmotile;
                $scope.IUI.GradeA = $scope.IUI.PreProgressive;
                $scope.IUI.GradeAPost = $scope.IUI.PostProgressive; 
                if ($scope.ArtTypeID == 2 && $scope.ArtSubTypeID == 6) {
                    $scope.IsDisableFresh = true;
                    $scope.IsDisableTypeSpermDiv = true;
                    $scope.IUI.IsFrozenSample = true;
                    $scope.IUI.SpermTypeID = 2;
                }
                if ($scope.IUI.SpermTypeID == null) {
                    $scope.IUI.SpermTypeID = 0;
                }
                if ($scope.IUI.ListSemenThawing != null) {
                    angular.forEach($scope.IUI.ListSemenThawing, function (Item1) {
                        Item1.IsFinalized1 = Item1.IsFinalized;
                        Item1.ThawingDate = new Date(Item1.ThawingDate);
                        Item1.ThawingTime = new Date(Item1.ThawingTime);
                        Item1.SpremFreezingTime = new Date(Item1.SpremFreezingTime);
                    });
                }
            }
            else {
                debugger;
                $scope.ismeridian = true;
                $scope.maxTime = new Date();
                $scope.IUI.SprermFreezingDate = new Date();
                $scope.IUI.SprermFreezingTime = new Date();
                $scope.IUI.CollectionDate = new Date();
                $scope.IUI.CollectionTime = new Date();
                $scope.IUI.ReceivingDate = new Date();
                $scope.IUI.ReceivingTime = new Date();
                $scope.IUI.ThawDate = new Date();
                $scope.IUI.ThawTime = new Date();
                $scope.IUI.SampleCollected = false;
                $scope.IUI.MaleVisitUnitID = 0;
                $scope.IUI.MaleVisitID = 0;
                $scope.IUI.SpermTypeID = 0;
                $scope.IsDisableFresh = false;
                $scope.IsDisableTypeSpermDiv = true;
                $scope.IUI.VisitID = 0;
                $scope.IUI.VisitUnitID = 0;
                if ($scope.ArtTypeID == 2 && $scope.ArtSubTypeID == 6) {
                    $scope.IsDisableFresh = true;
                    $scope.IsDisableTypeSpermDiv = true;
                    $scope.IUI.IsFrozenSample = true;
                }
            }
            if($scope.IUI.VisitID == 0 && $scope.IUI.VisitUnitID == 0){
                $scope.SetVisit();
             }
        }, function (error) {
        });

    }
    $scope.SetVisit = function () {
        //commented by rohini for showing 2 popup after selection of fresh sperm and ten male patient
        //for Visit if Female Patient Is Already selected no need to select again vist         
        if ($scope.SelectedPatient.GenderID == 2 && $scope.SelectedPatient.VisitID > 0 && $scope.SelectedPatient.VisitUnitID > 0) {
            $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID = $scope.SelectedPatient.VisitID;
            $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID = $scope.SelectedPatient.VisitUnitID;
            var response = Common.SetSelectedFemalePatient($scope.SelectedCouple.FemalePatient);
            response.then(function (resp) {
                if (resp.status == 200) {
                    $scope.selectPatient = {};
                    $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
                    $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
                    $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
                    $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
                    $scope.selectPatient.VisitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                    $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                    Common.setSelectedPatient($scope.selectPatient);
                    Common.setSelectedCouple($scope.SelectedCouple);
                    $scope.SelectedCouple = Common.getSelectedCouple();                    
                }
            });
        }
        else {
            $scope.NevigateVisitPopUP($scope.SelectedPatient);
        }
    }
    $scope.RemoveRow = function (Index) {
        if ($scope.IUI.ListSemenThawing.length < 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else {
            $scope.IUI.ListSemenThawing.splice(Index, 1);
        }
    };
    $scope.CheckIsIUIDonor = function () {
        var ResponseData = IUISrv.GetIUIDetails();
        ResponseData.then(function (Response) {
            if (Response.data != null) {
            }
        }, function (error) {
        });
    }
    $scope.SaveUpdate = function (IUI) {
        debugger;
        //frmIUI.ddlSemenCollection.$valid && IUI.MethodOfCollection == 0 && IUI.SpermTypeID == 1
        if ($scope.ValidateIUI() && $scope.frmIUI.txtVolume.$valid && $scope.frmIUI.txtVolumePost.$valid && $scope.frmIUI.txtSpermConce.$valid && $scope.frmIUI.txtSpermConcePost.$valid && 
            $scope.frmIUI.txtProgressive.$valid && $scope.frmIUI.txtProgressivePost.$valid && $scope.frmIUI.txtNonProgressive.$valid && $scope.frmIUI.txtNonProgressivePost.$valid && $scope.frmIUI.txtImmotile.$valid && $scope.frmIUI.txtImmotilePost.$valid && 
            $scope.IUI.CheckedByDoctorID != 0 && $scope.IUI.WitnessByID != 0 && $scope.frmIUI.ddlSemenCollection.$valid && $scope.frmIUI.ddlTypeofSperm.$valid && $scope.IUI.InSeminationMethodID != 0) {
            debugger;
            if ($scope.IUI.SpermTypeID == 1) {
                $scope.IsDisableFresh = false;
                $scope.IUI.ThawDate = null;
                $scope.IUI.ThawTime = null;
                IUI.CollectionDate = new Date(IUI.CollectionDate.getFullYear(), IUI.CollectionDate.getMonth(), IUI.CollectionDate.getDate(), IUI.CollectionTime.getHours(), IUI.CollectionTime.getMinutes(), 0);
                IUI.CollectionDate = new Date(IUI.CollectionDate);
                IUI.CollectionTime = new Date(IUI.CollectionTime);
                IUI.ReceivingDate = new Date(IUI.ReceivingDate.getFullYear(), IUI.ReceivingDate.getMonth(), IUI.ReceivingDate.getDate(), IUI.ReceivingTime.getHours(), IUI.ReceivingTime.getMinutes(), 0)
                IUI.ReceivingDate = new Date(IUI.ReceivingDate);
                IUI.ReceivingTime = new Date(IUI.ReceivingTime);
                IUI.MaleVisitID = $scope.MaleVisitID;
                IUI.MaleVisitUnitID = $scope.MaleVisitUnitID;
            }
            else {
                $scope.IsDisableFresh = true;
                $scope.IUI.CollectionDate = null;
                $scope.IUI.CollectionTime = null;
                $scope.IUI.TimeRecSampLab = null;
                $scope.IUI.ReceivingTime = null;
                IUI.ThawDate = new Date(IUI.ThawDate.getFullYear(), IUI.ThawDate.getMonth(), IUI.ThawDate.getDate(), IUI.ThawTime.getHours(), IUI.ThawTime.getMinutes(), 0)
                IUI.ThawDate = new Date(IUI.ThawDate);
                IUI.ThawTime = new Date(IUI.ThawTime);
                IUI.MaleVisitID = 0;
                IUI.MaleVisitUnitID = 0;
            }
            debugger;
            if ($scope.sNoArray != null)
                IUI.STNo = $scope.sNoArray[0];
            //IUI.SprermFreezingDate = new Date(IUI.SprermFreezingDate.getFullYear(), IUI.SprermFreezingDate.getMonth(), IUI.SprermFreezingDate.getDate(),IUI.SprermFreezingTime.getHours(), IUI.SprermFreezingTime.getMinutes(), 0);
            IUI.SprermFreezingDate = new Date(IUI.SprermFreezingDate);
            IUI.SprermFreezingTime = new Date(IUI.SprermFreezingTime);
            if ($scope.IUI.SpermTypeID == 1)
                IUI.CollecteAtCentre = true;
            else
                IUI.CollecteAtCentre = false;
            IUI.PreNonProgressive = IUI.GradeB;
            IUI.PostNonProgressive = IUI.GradeBPost;
            IUI.PreImmotile = IUI.GradeC;
            IUI.PostImmotile = IUI.GradeCPost;
            IUI.PreProgressive = IUI.GradeA;
            IUI.PostProgressive = IUI.GradeAPost;
            //set Visit
            IUI.IsDoner = false;
            //
            var Promise = IUISrv.SaveUpdate(IUI);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    AlertMessage.info('PalashIVF', 'Record Saved Successfully.');
                    $scope.IUI = {};
                    $scope.GetIUIDetails();
                }
                if (resp.data == 2) {
                    AlertMessage.info('PalashIVF', 'Record Updated Successfully.');
                    $scope.IUI = {};
                    $scope.GetIUIDetails();
                }
            }, function (error) {
            });
        }
        else {
            $scope.frmIUI.ddlTypeofSperm.$dirty = true;
            $scope.frmIUI.PrepDate.$dirty = true;           
            $scope.frmIUI.CollectionDate.$dirty = true;
            $scope.frmIUI.ReceivingDate.$dirty = true;
            $scope.frmIUI.CollectionTime.$dirty = true;
            $scope.frmIUI.ReceivingTime.$dirty = true;
            $scope.frmIUI.ddlSemenCollection.$dirty = true;
            $scope.frmIUI.ddlIUIMethod.$dirty = true;
            $scope.frmIUI.txtVolume.$dirty = true;
            $scope.frmIUI.txtVolumePost.$dirty = true;
            $scope.frmIUI.txtSpermConce.$dirty = true;
            $scope.frmIUI.txtSpermConcePost.$dirty = true;
            $scope.frmIUI.txtSpermConce.$dirty = true;
            $scope.frmIUI.txtProgressive.$dirty = true;
            $scope.frmIUI.txtProgressivePost.$dirty = true;
            $scope.frmIUI.txtNonProgressive.$dirty = true;
            $scope.frmIUI.txtNonProgressivePost.$dirty = true;
            $scope.frmIUI.txtImmotile.$dirty = true;
            $scope.frmIUI.txtImmotilePost.$dirty = true;
            $scope.frmIUI.ddlDoneby.$dirty = true;
            $scope.frmIUI.ddlWitnessedby.$dirty = true;
        }
    }
  
    //Get Semen Prepration List
    $scope.GetThowSmaples = function (IsFreezThaw) {
        debugger;
      
        if ($scope.AlreadyGet == false) {
            if ($scope.ArtSubTypeID == 2) {
                $scope.ID = $scope.SelectedCouple.MalePatient.MaleId;
                $scope.UnitID = $scope.SelectedCouple.MalePatient.MAleUnitID;
            }
            else if ($scope.ArtSubTypeID == 3) {
                debugger;
                $scope.ID = $scope.IUI.DonorID;
                $scope.UnitID = $scope.IUI.DonorUnitID;
            }
            if ($scope.ID != 0 && $scope.ID != undefined && $scope.UnitID != undefined && $scope.UnitID != 0) {
                var ResponseData = IUISrv.GetThowSmaples($scope.ID, $scope.UnitID, IsFreezThaw);
                ResponseData.then(function (Response) {
                    $scope.ThowSamplesLists = Response.data;
                    debugger;
                    $scope.ThowSamplesLists.every(function (x) {
                        $scope.IUI.ListSemenThawing.every(function (y) {
                            if (x.ThawID == y.ThawID)
                                x.IsThaw = true;
                        })
                        x.IsThaw = false;
                    })

                    $scope.AlreadyGet = true; //for do not call every time get sement details
                  
                }, function (error) {
                });
            }
            else {
                if ($scope.ArtSubTypeID == 3)
                    AlertMessage.error('PalashIVF', 'Please Select Donor.');
            }
        }

        else if ($scope.ArtSubTypeID == 3) {   // added sujata for trmpory chcek  for iui cycle for thaw sample
            debugger;
            $scope.ID = $scope.IUI.DonorID;
            $scope.UnitID = $scope.IUI.DonorUnitID;
        }
    }
    //FOR DONOR LIST   
    $scope.LoadDonorData = function LoadDonorData() {
        debugger;
        var ResponseData = IUISrv.LoadDonorData();
        ResponseData.then(function (Response) {
            $scope.DonorData = Response.data;
            $scope.allItems = $scope.DonorData;
            if ($scope.searchText == '' || $scope.searchText == undefined) {
                $scope.filteredList = $scope.allItems;
            }
            //angular.forEach($scope.filteredList, function (Item) {
            //    if (Item.ID == $scope.IUI.DonorID && Item.DonerCode == $scope.IUI.DonorCode) {
            //        Item.Synchronized = true;
            //    }
            //});
            debugger;
            if ($scope.IUI.IsDonorAsPartner == true) {
                angular.forEach($scope.filteredList, function (Item) {
                    if ($scope.IUI.IsDonorAsPartner == true) {
                        if (Item.ID == $scope.IUI.DonorID && Item.MRNo == $scope.IUI.DonorCode) {
                            Item.Synchronized = true;
                        }
                    }
                    else if (Item.ID == $scope.IUI.DonorID && Item.DonorCode == $scope.IUI.DonorCode) {
                        Item.Synchronized = true;
                    }
                });
            }

        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.search = function () {
        $scope.filteredList = _.filter($scope.allItems,
       function (item) {
           return searchUtil(item, $scope.searchText);
       });

        if ($scope.searchText == '') {
            $scope.filteredList = $scope.allItems;
        }
    }
    $scope.ChkDonor = function (Item) {
        angular.forEach($scope.DonorList, function (Item1) {
            Item1.Selected = false;
        });
        Item.Selected = true;
    }
    $scope.SetLinkedDonor = function SetLinkedDonor(Item) {
        debugger;
        //angular.forEach($scope.filteredList, function (Item) {
        if (Item.Synchronized == true) {
                debugger;
                if (Item.DonerCode != null && Item.DonerCode != undefined && Item.DonerCode != "") {
                    $scope.IUI.DonorID = Item.ID;
                    $scope.IUI.DonorUnitID = Item.UnitID;
                    $scope.IUI.DonorCode = null;
                    $scope.IUI.DonorCode = Item.DonerCode;
                    $scope.IUI.DonorName = Item.DonorName;
                    $scope.IUI.IsDonorAsPartner = false;
                    $scope.IUI.CryNo=null;
                    //$scope.IUI.MRNo = null;
                    //angular.element(btnCloseDonorPop).trigger('click');
                    angular.element(selectDonor).modal('hide');
                }
                else {
                    $scope.IUI.DonorID = Item.ID;
                    $scope.IUI.DonorUnitID = Item.UnitID;
                    $scope.IUI.DonorCode = null;
                    $scope.IUI.DonorName = Item.DonorName;

                    $scope.IUI.DonorCode = Item.MRNo;
                    $scope.IUI.IsDonorAsPartner = true;
                    $scope.IUI.CryNo=null;
                    //$scope.IUI.DonorCode = null;
                    //angular.element(btnCloseDonorPop).trigger('click');
                    angular.element(selectDonor).modal('hide');
                }
            }
        //});
    }
    $scope.GetDonorFrozenSamples = function () {
        debugger;
        var DonorID = $scope.IUI.DonorID;
        var DonorUnitID = $scope.IUI.DonorUnitID;
        if ($scope.IUI.IsDonorAsPartner == false) {
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
    }
    $scope.AddThowingDetails = function () {
        debugger;
        $scope.IUI.ListFreezThawSamples                                                        //  new Added  functionality sujata for thaw sample in iui cycle
        var ResponseData = IUISrv.SaveThowingDetails($scope.IUI.ListFreezThawSamples);
             ResponseData.then(function (Response) {
                 if (Response.data != null) {
                     debugger;
                     if(Response.data == 1 )
                     {
                         if ($scope.IUI.ListFreezThawSamples.length>0)
                         {
                             AlertMessage.info('PalashIVF', 'Thaw Sample Added Sucessfully');
                         }
                         $scope.IUI.ListFreezThawSamples = [];
                     }                   
                 }
             }, function (error) {
                 $scope.Error = error;
        });       
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
            AlertMessage.error("Please Select valid volume");
        }
    }
    $scope.chkFreezSample = function chkFreezSample(Item, Index) {
        debugger;
        var stringCryoNo = "";
        $scope.IUI.ListFreezThawSamples = []; //only one freeez sample
        //if (Item.IsLinkedFreez == true) {
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
            $scope.ItemDetails.DonorID = $scope.IUI.DonorID;
            $scope.ItemDetails.DonorUnitID = $scope.IUI.DonorUnitID;
            $scope.ItemDetails.ThawingDate = new Date();
            $scope.ItemDetails.ThawingTime = new Date();
            //$scope.ItemDetails.RemainingVolume = item.OriginalVolume - item.Volume;
            $scope.IUI.ListFreezThawSamples.push($scope.ItemDetails);
            $scope.ThowDate1 = $scope.ItemDetails.ThawingDate;
            $scope.ThowTime1 = $scope.ItemDetails.ThawingTime;
        //}
        //else {
        //    $scope.IUI.ListFreezThawSamples.splice(Index, 1);
        //}
        angular.forEach($scope.IUI.ListFreezThawSamples, function (item) {
            if (stringCryoNo == "") {
                stringCryoNo = item.CryoNo;
            }
            else {
                stringCryoNo = stringCryoNo + ',' + item.CryoNo;
            }
        })
        $scope.IUI.CryNo = stringCryoNo;
        $scope.IUI.ThawDate = new Date($scope.ThowDate1);
        $scope.IUI.ThawTime = new Date($scope.ThowTime1);       
        
    }

    $scope.chkThawSample = function (Item, Index) {
        
        debugger;
        $scope.IUI.ListSemenThawing = [];
        for (var i = 0; i < $scope.ThowSamplesLists.length; i++) {
            if (i != Index) {
                $scope.ThowSamplesLists[i].IsThaw = false;
            }
        }
        var stringCryoNo = "";

        debugger;
        var FreezID = 0;
        var IsFromSameFreezingDetail = false;
      //  $scope.ThawList = $filter('filter')($scope.ThowSamplesLists, function (d) { return d.IsThaw == true });
        debugger;
  
        for (var i = 0; i <= $scope.IUI.ListSemenThawing.length - 1; i++) {
            FreezID = Item.FreezingID;
            if (FreezID == $scope.IUI.ListSemenThawing[i].FreezingID) {
                IsFromSameFreezingDetail = true;
            }
            else {
                IsFromSameFreezingDetail = false;
                Item.IsThaw = false;
                break;
            }
        }
        if (IsFromSameFreezingDetail == false  && $scope.IUI.ListSemenThawing.length > 0) {
            AlertMessage.info("Select Sample From Same Freezing Details");
        }
        else {

            if (Item.IsThaw == true) {
                $scope.ThowDate1 = Item.ThawingDate;
                $scope.ThowTime1 = Item.ThawingTime;
                $scope.IUI.ListSemenThawing.push(Item);
            }
            else {
                var idx = -1;
                for (var i = 0; i < $scope.IUI.ListSemenThawing.length; ++i) {
                    if ($scope.IUI.ListSemenThawing[i].ThawID == Item.ThawID && $scope.IUI.ListSemenThawing[i].UnitID == Item.UnitID) {
                        idx = i;
                        break;
                    }
                }
                $scope.IUI.ListSemenThawing.splice(idx, 1);
            }
            angular.forEach($scope.IUI.ListSemenThawing, function (item) {
                if (stringCryoNo == "") {
                    stringCryoNo = item.CryoNo;
                }
                else {
                    stringCryoNo = stringCryoNo + ',' + item.CryoNo;
                }
            })
            $scope.IUI.CryNo = stringCryoNo;
            $scope.IUI.ThawDate = new Date($scope.ThowDate1);
            $scope.IUI.ThawTime = new Date($scope.ThowTime1);
        }
    }
    //rohini for visit check  
    $scope.NevigateVisitPopUP = function (Patient) {
        if (!angular.equals({}, Patient)) {
            var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
            response.then(function (resp) {
                if (resp.data.length > 1) { //Go cursor this scope when multiple visit
                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'visitmodel',
                        controller: 'visitmodelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'sm',
                        resolve: {
                            VisitInfo: function () {
                                return resp.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) { // return here after cancel reason entered
                        //Added by AniketK on 07July2020 for Video Consultation
                        var tempDate1 = new Date();
                        var date1 = tempDate1.getFullYear() * tempDate1.getMonth() * tempDate1.getDate();
                        var tempDate2 = new Date(data.Date);
                        var date2 = tempDate2.getFullYear() * tempDate2.getMonth() * tempDate2.getDate();
                        if (date1 == date2) {
                            $rootScope.VisitTypeID = data.VisitTypeID;
                        }
                        else {
                            $rootScope.VisitTypeID = 0;
                        }
                        if (!angular.equals({}, data)) {  //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                //for female                                 
                                $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedFemalePatient($scope.SelectedCouple.FemalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
                                        $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
                                        $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
                                        $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.setSelectedCouple($scope.SelectedCouple);
                                        $scope.GetIUIDetails();
                                    }
                                });
                            }
                            else {
                                //for male
                                $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedMalePatient($scope.SelectedCouple.MalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $scope.SelectedCouple.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $scope.SelectedCouple.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $scope.SelectedCouple.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $scope.SelectedCouple.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.setSelectedCouple($scope.SelectedCouple);
                                        $scope.SelectedCouple = Common.getSelectedCouple();
                                        $scope.GetIUIDetails();
                                    }
                                });
                            }
                        }
                    });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {

                    if (!angular.equals({}, resp.data)) {
                        if (Patient.GenderID == 2) { //for Female
                            $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedFemalePatient($scope.SelectedCouple.FemalePatient);
                            response.then(function (resp) {
                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
                                    $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
                                    $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
                                    $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.setSelectedCouple($scope.SelectedCouple);
                                    $scope.SelectedCouple = Common.getSelectedCouple();
                                    //$location.path(Redirectto);
                                    $scope.GetIUIDetails();
                                }
                            });
                        }
                        else { //for male
                            $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedMalePatient($scope.SelectedCouple.MalePatient);
                            response.then(function (resp) {
                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $scope.SelectedCouple.MalePatient.MaleId;
                                    $scope.selectPatient.UnitID = $scope.SelectedCouple.MalePatient.MAleUnitID;
                                    $scope.selectPatient.MRNo = $scope.SelectedCouple.MalePatient.MaleMRNO;
                                    $scope.selectPatient.GenderID = $scope.SelectedCouple.MalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.setSelectedCouple($scope.SelectedCouple);
                                    $scope.SelectedCouple = Common.getSelectedCouple();
                                    $scope.GetIUIDetails();
                                }
                            });
                        }
                    }
                }
                else {
                    AlertMessage.info('PalashIVF', 'Visit Not Marked For Female Patient,Please First Mark Vist.');
                    $scope.IsSave = true;
                }
            });
        }
    }
    $scope.CancelClick = function CancelClick() {
        $location.path("/CycleNav");
    }

    $scope.IUITime = function () {
        $scope.IUI.SprermFreezingTime = $scope.IUI.SprermFreezingDate;
    };

    $scope.PrintIUICycle = function () {
        var a = encodeURIComponent('P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID +
            '&Th=' + $scope.SelectedCouple.FemalePatient.TherapyID + '&THU=' + $scope.SelectedCouple.FemalePatient.TherapyUnitID);
        window.open('/Reports/ART/IUICycle/IUICycleWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }
});
PIVF.controller('visitmodelInfo', function ($scope, $uibModalInstance, VisitInfo, $timeout) {
    $scope.visitInformation = VisitInfo;
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.SelectPatient = function (Item) {
        $uibModalInstance.close(Item);
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