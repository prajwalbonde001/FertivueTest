angular.module('PIVF').controller('CorpusLeteumScanController', function ($scope, $rootScope, $filter, $location, CorpusLeteumScanService, Common, srvCommon, $uibModal, $window, AlertMessage, swalMessages, usSpinnerService) {   //, usSpinnerService, crumble
    $scope.CorpusLeteumScan = {};
    $scope.PreviousCorpusLeteumScan = [];
    $scope.CorpusLeteumScan.CorpusLeteumScanDate = new Date();
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];      
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.SortColumn1 = "Cyclecode";
    $scope.reverseSort1 = true;

    $scope.open1 = function () {
        debugger;
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };
    $scope.dateOptions = {
        //formatYear: 'yyyy',
        //minDate: new Date(),
        //startingDay: 1,
        //showWeeks: false

        formatYear: 'yyyy',
    maxDate: new Date(), //new Date(2016, 8, 01),
    minDate: new Date().setYear(new Date().getYear() + 120),//new Date(),
    startingDay: 1,
    showWeeks: false
    };

    /* START : Disable and Enable Controls */
    $scope.SelectedPatient = "";
    $scope.IsDisableSave = true;
    $scope.IsCycleCodeLblDisabled = true;
    $scope.IsDisableUpdate = false;
    /* END : Disable and Enable Controls */

    /* START for Resource */
    var objResource = {
    };
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    /*END of Resource*/

    $scope.GoToStimulationChart = function GoToStimulationChart() {
        debugger;
        $rootScope.FormName = 'Stimulation Chart';
        $location.path('/StimulationChart/');
}

    $scope.onSelect = function ($item, $model, $label) {

        $scope.SelectedPatient = $model;
        $scope.CorpusLeteumScan.TherapyId = $scope.SelectedPatient.ID;
        $scope.CorpusLeteumScan.Cyclecode = $scope.SelectedPatient.Description;
    }

    $scope.LoadCycleCodeList = function LoadCycleCodeList() {
        debugger;
        var ResponseData = CorpusLeteumScanService.LoadCycleCodeList();
        ResponseData.then(function (Response) {
            //
            $scope.CycleCodeList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }

    $scope.PageInitialization = function PageInitialization() {
        usSpinnerService.spin('GridSpinner');
        debugger;
        $scope.SelectedCouple = Common.getSelectedCouple();
        if ($scope.SelectedCouple.FemalePatient.TherapyID != 0 && $scope.SelectedCouple.FemalePatient.TherapyID != null) {
            debugger;
            $scope.CorpusLeteumScan.LMPDate = $scope.SelectedCouple.FemalePatient.LMP;
            //$scope.IsDisableUpdate = true;
        }
        if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
            $scope.selectPatient = {
            };
            $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
            $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
            $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
            $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
            $scope.selectPatient.LMPDate = $scope.SelectedCouple.FemalePatient.LMP;
        }
        else {
            //added by vikrant When C# Visit Not Assign 
            var response1 = Common.AddvisitDetailIncoupleAPI(2, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID);
            response1.then(function (resp) {
                $scope.LoadPreviousCorpusLeteumScanData();
                // $scope.LoadFirst10Rows();
                // $scope.LoadEndometriumMorphology();
                $scope.LoadCycleCodeList();
                $scope.SetCycleDay();                       
            });
        }
        usSpinnerService.stop('GridSpinner'); 
}
       
    //To calculate Day of Cycle
    $scope.SetCycleDay = function SetCycleDay() {
        debugger;
        //if (angular.isDate(new Date($scope.CorpusLeteumScan.CorpusLeteumScanDate)) && $scope.CorpusLeteumScan.CorpusLeteumScanDate != null) {
        var dt1 = new Date($rootScope.CoupleDetails.FemalePatient.LMP);      //$scope.CorpusLeteumScan.LMPDate     //($rootScope.SelectedCouple.FemalePatient.LMP);           //($scope.FollicularScan.FollicularScanDate);
            var dt2 = new Date($scope.CorpusLeteumScan.CorpusLeteumScanDate);      //($scope.FollicularScan.LMPDate);
            $scope.CorpusLeteumScan.CycleDay = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)) + 1;
      //  }
       // else {
          //  $scope.CorpusLeteumScan.CycleDay = "";
       // }
    }

    $scope.LoadPreviousCorpusLeteumScanData = function LoadPreviousCorpusLeteumScanData() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = CorpusLeteumScanService.LoadPreviousCorpusLeteumScanData();
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PreviousCorpusLeteumScan = Response.data;
            //$scope.GetUserrights();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        })

    }

    $scope.PrintCLScan = function () {  //Corpus Leteum Scan Print
        debugger;
        var ThID = $rootScope.CoupleDetails.FemalePatient.TherapyID;
        var ThuID = $rootScope.CoupleDetails.FemalePatient.TherapyUnitID;

        var a = encodeURIComponent('P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID +
                   '&Th=' + ThID + '&THU=' + ThuID);// + '&Id=' +ID);//+ '&UN=' + localStorageService.get("UserInfo").UserName);
          window.open('/Reports/ART/CorpusLeteum/CorpusLeteumScan.aspx?' + encodeURIComponent(a), '_blank');

    }

    $scope.GetUserrights = function () {
        debugger;
        var lstUserRights = Common.getUserRights();
        if (selectPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 310 && lstUserRights[z].Active)//Male History
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 323 && lstUserRights[z].Active)//FollicularScan
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
                }
            }
        }
        if ($scope.SelectedCouple.FemalePatient.TherapyID == 0 || $scope.SelectedCouple.FemalePatient.TherapyID == undefined) {
            if (!$scope.objRgt.IsCreate) {
                angular.element(btnSaveFollicularScan).prop('disabled', true);
            }
            else {
                angular.element(btnSaveFollicularScan).prop('disabled', false);
            }
        }
        else {
            debugger;
            $scope.IsDisableUpdate = true;
        }
    }

    $scope.SaveOrUpdateCLScan = function SaveOrUpdateCLScan() {
        debugger;
        usSpinnerService.spin('GridSpinner');

        if ($scope.CorpusLeteumScan.ID == undefined) {
            debugger;
            //Send data to insert follicular scan details
            $scope.CorpusLeteumScan.CorpusLeteumScanDate = $filter('date')($scope.CorpusLeteumScan.CorpusLeteumScanDate, 'medium');
            //$scope.FollicularScan.FollicularScanTime = $filter('date')($scope.FollicularScan.FollicularScanTime, 'medium');
            //$scope.FollicularScan.LMPDate = $filter('date')($scope.FollicularScan.LMPDate, 'medium');
            var ResponeData = CorpusLeteumScanService.SaveOrUpdateCLScan($scope.CorpusLeteumScan);
            ResponeData.then(function (Response) {
                if (Response.data> 0) {
                    debugger;
                    // Record inserted successfully
                    if ($scope.SelectedCouple.FemalePatient.TherapyID == 0 || $scope.SelectedCouple.FemalePatient.TherapyID == undefined) {
                        $scope.CorpusLeteumScan = {
                        };
                       // $scope.CorpusLeteumScan.ListItem =[];
                        var date = new Date();
                        $scope.CorpusLeteumScan.CorpusLeteumScanDate = new Date();
                        //$scope.CorpusLeteumScan.FollicularScanTime = date;
                        //$scope.FollicularScan.FollicularDetails =[];
                       // $scope.FollicularScan.FollicularDetails.model =[];
                        //$scope.FollicularScan.FollicularScanImages =[];
                        //for (var i = 1; i <= 10; i++) {
                        //    $scope.FollicularScan.ListItem.push({
                        //    });
                        //}
                        $scope.LoadPreviousCorpusLeteumScanData();
                    }
                    else {
                        $scope.LoadPreviousCorpusLeteumScanData();
                        $scope.ClearAfterSave();
                      // $scope.PageInitialization();    commented by Nayan Kamble on 06/11/2019
                        //$scope.LoadCycleCodeList();
                       // $scope.SetCycleDay();
                    }
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $scope.ClearAfterSave();
                    // $scope.PageInitialization();      commented by Nayan Kamble on 06/11/2019
                    //$scope.LoadCycleCodeList();
                   // $scope.SetCycleDay();
                    usSpinnerService.stop('GridSpinner');
                }
                usSpinnerService.stop('GridSpinner');
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                $scope.Error = error;
            })
        } else {
            debugger;
            //Need to delete all the size details of follicular and insert again with latest mesurements
            $scope.CorpusLeteumScan.CorpusLeteumScanDate = $filter('date')($scope.CorpusLeteumScan.CorpusLeteumScanDate, 'medium');
            //$scope.FollicularScan.FollicularScanTime = $filter('date')($scope.FollicularScan.FollicularScanTime, 'medium');
            //$scope.CorpusLeteumScan.LMPDate = $filter('date')($scope.CorpusLeteumScan.LMPDate, 'medium');
            var ResponeData = CorpusLeteumScanService.SaveOrUpdateCLScan($scope.CorpusLeteumScan);
            ResponeData.then(function (Response) {
                if (Response.data > 0) {
                    debugger;
                    // Record inserted successfully
                    if ($scope.SelectedCouple.FemalePatient.TherapyID == 0 || $scope.SelectedCouple.FemalePatient.TherapyID == undefined) {
                        $scope.CorpusLeteumScan = {
                        };
                        //$scope.FollicularScan.ListItem =[];
                        $scope.CorpusLeteumScan.CorpusLeteumScanDate = new Date();
                        //$scope.FollicularScan.FollicularScanTime = date;
                       // $scope.FollicularScan.FollicularDetails =[];
                        //$scope.FollicularScan.FollicularDetails.model =[];
                       // $scope.FollicularScan.FollicularScanImages =[];
                        //for (var i = 1; i <= 10; i++) {
                          //  $scope.FollicularScan.ListItem.push({
                          //  });
                        //}
                        $scope.LoadPreviousCorpusLeteumScanData();
                        $scope.ClearAfterSave();
                        //   $scope.PageInitialization();     commented by Nayan Kamble on 06/11/2019
                        //$scope.LoadCycleCodeList();
                        //$scope.SetCycleDay();
                    }
                    else {
                        $scope.LoadPreviousCorpusLeteumScanData();
                        //$scope.LoadCycleCodeList();
                        // $scope.SetCycleDay();
                        // $scope.PageInitialization();       commented by Nayan Kamble on 06/11/2019
                        $scope.ClearAfterSave();
                    }
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                }
                usSpinnerService.stop('GridSpinner');
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                $scope.Error = error;
            })
        }
        //}
    }

    $scope.ClearAfterSave= function ClearAfterSave(){

        $scope.CorpusLeteumScan = {};
        $scope.CorpusLeteumScan.CorpusLeteumScanDate = new Date();
        $scope.CorpusLeteumScan.TVS1 = "";
        $scope.CorpusLeteumScan.TVS2 = "";
        $scope.CorpusLeteumScan.TVS3 = "";
        $scope.CorpusLeteumScan.VCD = "";
        $scope.CorpusLeteumScan.RIRight = "";
        $scope.CorpusLeteumScan.RILeft = "";
        $scope.CorpusLeteumScan.PIRight = "";
        $scope.CorpusLeteumScan.PILeft = "";
        $scope.CorpusLeteumScan.PSVRight = "";
        $scope.CorpusLeteumScan.PSVLeft = "";
        $scope.CorpusLeteumScan.CorpusLeteumScanComment = "";
        $scope.CorpusLeteumScan.IsFinalize = null;
        $scope.IsCycleCodeLblDisabled = true;
        //$scope.SetCycleDay();

    }

    $scope.EditCorpusLeteumScan = function EditCorpusLeteumScan(corpusLeteumScan) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if ($scope.PreviousCorpusLeteumScan != undefined && $scope.PreviousCorpusLeteumScan != null) {
            angular.forEach($scope.PreviousCorpusLeteumScan, function (item) {
                if (item.ID != corpusLeteumScan.ID) {
                    item.SelectRow = false;
                }
            });
        }
        if (!corpusLeteumScan.IsFinalize) {
            corpusLeteumScan.SelectRow = true;
        }

        corpusLeteumScan.TherapyDate = new Date($filter('date')(corpusLeteumScan.TherapyDate, "dd-MMM-yyyy"));
        //var CurrentDate = new Date($filter('date')(new Date(), "dd-MMM-yyyy"));
        // Removed above conditons on suggestions of Dr.Priyanka date 13 June 2017
        //if (corpusLeteumScan.TherapyDate >= CurrentDate) {
        if (!angular.isUndefined(corpusLeteumScan.TherapyDate)) {
            $scope.CorpusLeteumScan.CorpusLeteumScanDate = corpusLeteumScan.TherapyDate;
        }
        $scope.CorpusLeteumScan.Cyclecode = corpusLeteumScan.Cyclecode;
        $scope.GetSingleCLScan(corpusLeteumScan.ID);
        $scope.IsDisableSave = false;
        if ($scope.SelectedCouple.FemalePatient.TherapyID == 0 || $scope.SelectedCouple.FemalePatient.TherapyID == undefined) {
            $scope.IsCycleCodeLblDisabled = true;
        }
        else {
            $scope.IsCycleCodeLblDisabled = false;
        }
        debugger;
        $scope.IsCycleCodeDisabled = true;
        $scope.IsDisableUpdate = false;
        //} else {
        //    $scope.IsDisableUpdate = true;
        //    $scope.IsDisableSave = false;
        //    $scope.IsCycleCodeLblDisabled = true;
        //    $scope.IsCycleCodeDisabled = false;
        //    AlertMessage.info('PalashIVF', 'You can not edit backdated entry');
        //}

        usSpinnerService.stop('GridSpinner');
        debugger;
    }

    $scope.GetSingleCLScan = function GetSingleCLScan(ID) {     //
        debugger;
        var ResponseData = CorpusLeteumScanService.GetSingleCLScan(ID);
        ResponseData.then(function (Response) {
            $scope.CorpusLeteumScan = Response.data;
            debugger;
            //if ($scope.CorpusLeteumScan.LMPDate != null && $scope.CorpusLeteumScan.LMPDate != "") {
            //    $scope.CorpusLeteumScan.LMPDate = new Date($filter('date')($scope.CorpusLeteumScan.LMPDate, 'medium'));
            //}
         // if (!angular.isUndefined($scope.CorpusLeteumScan)) {
                //if ($scope.CorpusLeteumScan.EndometriumMorphologyID == undefined) {
                //    $scope.CorpusLeteumScan.EndometriumMorphologyID = 0;
                //}
                if ($scope.CorpusLeteumScan.IsFinalize != undefined && $scope.CorpusLeteumScan.IsFinalize) {
                    debugger;
                    $scope.IsDisableUpdate = true;
                }
                ///*Add dynamic table if there is no rows */
                //if (!angular.isUndefined($scope.FollicularScan.ListItem) && $scope.FollicularScan.ListItem.length == 0) {
                //    $scope.LoadFirst10Rows();
                //}
                $scope.CorpusLeteumScan.CorpusLeteumScanDate = new Date($filter('date')($scope.CorpusLeteumScan.CorpusLeteumScanDate, 'medium'));
                if (angular.isUndefined($scope.CorpusLeteumScan.CorpusLeteumScanDate)) {
                    $scope.CorpusLeteumScan.CorpusLeteumScanDate = new Date();
                }
                $scope.SetCycleDay();     //uncommented by Nayan Kamble on 06/11/2019

        }, function (error) {
            $scope.Error = error;
        });
    }

});


PIVF.directive('allowDecimalNumbers', function () {
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
                //  console.log(value);
                // Dont allow more than 2 digit precision and more than 1 digit scale
                if (containsDot != null) {
                    //console.log('If block with dot precision', array[0].length);
                    //console.log('If block with dot scale', array[1].length);
                    if ([8, 9, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows  
                        return true;
                    } else {
                        console.log(array[0].length);
                        if (array[0].length > 2 || array[1].length > 1) {
                            event.preventDefault();
                            return false;
                        }
                    }
                } else {
                    //console.log('If block without dot', array[0].length);
                    if ([8, 9, 13, 27, 37, 38, 39, 40, 110, 190].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows  
                        return true;
                    } else {
                        //console.log(array[0]);
                        //console.log('First array length', array[0].length);
                        // array[0].length > 1 allow to precisions before dot
                        if (!angular.isUndefined(array[0]) && array[0].length > 1) {
                            event.preventDefault();
                            return false;
                        }
                    }
                }

                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    // numbers  
                    return false;
                } if ([8, 9, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
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