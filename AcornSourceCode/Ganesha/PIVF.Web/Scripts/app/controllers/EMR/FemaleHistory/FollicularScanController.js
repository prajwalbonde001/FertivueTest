angular.module('PIVF').controller('FollicularScanController', function ($scope, $rootScope, $filter, $location, FollicularScanService, Common, srvCommon, $uibModal, $window, AlertMessage, swalMessages, usSpinnerService) {   //, usSpinnerService, crumble

    $scope.FollicularScan = {};
    $scope.PreviousFollicularScan = [];
    $scope.maxTime = new Date();
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    var date = new Date();
    var selectPatient = {};
    var objResource = {}; //Added by swatih for localization on 14/7/2020
    selectPatient = Common.getSelectedPatient();
    $scope.FollicularScan.FollicularScanDate = new Date();
    $scope.FollicularScan.FollicularScanTime = date;
    $scope.minTime = date.setDate((new Date()).getDate() - 90);
    $scope.ismeridian = true;
    $scope.FollicularScan.FollicularDetails = [];
    $scope.FollicularScan.FollicularDetails.model = [];
    $scope.FollicularScan.FollicularScanImages = [];
    //Added by swatih for localization on 13/7/2020
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Added by swatih for localization on 13/7/2020
    //therapy id
    //var SelCouple = Common.getSelectedCouple();
    //SelCouple.FemalePatient.TherapyID = item.ID;
    //SelCouple.FemalePatient.TherapyUnitID = item.UnitID;
    //"isDICOMdiasbled()" onclick="openDICOMLink()"
    
    $scope.ViewAllDICOM = function() {
         var response = FollicularScanService.GetAllDICOMStudies('FollicularScan'); //Get Visit list For selected patient
            response.then(function (resp) {

                if (resp.data.length > 0) { //Go cursor this scope when multiple visit

                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'DICOMList',
                        controller: 'DICOMListInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            VisitInfo: function () {
                                return resp.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) {
                     window.open(data.StudyLink)
                    });
                 }
                 else{
                     AlertMessage.info(objResource.msgTitle, 'No Study Found.');
                 }
            });
    
    }

    $scope.isDICOMdiasbled = function () {
       if($scope.FollicularScan.DICOMLink !==null || $scope.FollicularScan.DICOMLink !== undefined || $scope.FollicularScan.DICOMLink !=='' )
        return false;
       else 
        return true;
    }
    $scope.openDICOMLink = function () {

       if($scope.FollicularScan.DICOMLink !==null || $scope.FollicularScan.DICOMLink !== undefined || $scope.FollicularScan.DICOMLink !=='' )
        window.open($scope.FollicularScan.DICOMLink);
    }


    var initialRowCount = 1;
    $scope.FollicularScan.ListItem = [];
    // for sorting    
    $scope.SortColumn1 = "Cyclecode";
    $scope.reverseSort1 = true;

    //added #issue 	6139 Follicular scan-By default cyst not reflecting zero
    $scope.FollicularScan.Cyst = 0
    $scope.FollicularScan.RCyst=0

    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

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
    $scope.dateOptions2 = {
        formatYear: 'yyyy',
        maxDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };
    if ($rootScope.ARTDateValidation) {
        $scope.dateOptions = {
            formatYear: 'yyyy',
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
    }
else {
 $scope.dateOptions = {
    formatYear: 'yyyy',
    //minDate: new Date(),
        startingDay : 1,
        showWeeks: false
};
}
        /*END : Date*/

        /* START : Disable and Enable Controls */
        $scope.SelectedPatient = "";
        $scope.IsDisableSave = true;
        $scope.IsCycleCodeLblDisabled = true;
        $scope.IsDisableUpdate = false;
        /* END : Disable and Enable Controls */

        /* START for Resource */
        var objResource = {
        };
        if (angular.isDefined(objResource) && angular.equals({ }, objResource)) {
            objResource = srvCommon.get();
    }
        /*END of Resource*/

        // page initialization function
        $scope.PageInitialization = function PageInitialization() {
            usSpinnerService.spin('GridSpinner');

            debugger;
            $scope.SelectedCouple = Common.getSelectedCouple();
            if ($scope.SelectedCouple.FemalePatient.TherapyID != 0 && $scope.SelectedCouple.FemalePatient.TherapyID != null) {
                debugger;
            $scope.IsDisableUpdate = true;
        }
        if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
            $scope.selectPatient = {
        };
            $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
            $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
            $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
            $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
            $scope.NevigateVisitPopUP($scope.selectPatient);
        } else {
            //added by vikrant When C# Visit Not Assign 
            var response1 = Common.AddvisitDetailIncoupleAPI(2, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID);
            response1.then(function (resp) {
                $scope.LoadPreviousFollicularScanData();
                $scope.LoadFirst10Rows();
                $scope.LoadEndometriumMorphology();
                $scope.LoadCycleCodeList();
        });
        }
        usSpinnerService.stop('GridSpinner');
    }

    $scope.LoadPreviousFollicularScanData = function LoadPreviousFollicularScanData() {
    debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = FollicularScanService.LoadPreviousFollicularScanData();
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PreviousFollicularScan = Response.data;
            $scope.GetUserrights();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
    })
    }

        /* START : Open visit popup */
        $scope.NevigateVisitPopUP = function (Patient) {
            debugger;
            if (!angular.equals({ }, Patient)) {
            var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
            response.then(function (resp) {
                debugger;
                if (resp.data.length > 1) { //Go cursor this scope when multiple visit
                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                            templateUrl: 'visitmodel',
                            controller: 'visitmodelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'md',
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
                        if (!angular.equals({
                        }, data)) {  //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                //for female
                                var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                                response.then(function (resp) {
                                    $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    var response = Common.SetSelectedFemalePatient($scope.SelectedCouple.FemalePatient);
                                    response.then(function (resp) {
                                        if (resp.status == 200) {
                                            $scope.selectPatient = {
                                        };
                                            $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
                                            $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
                                            $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
                                            $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
                                            $scope.selectPatient.VisitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                                            $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                                            Common.setSelectedPatient($scope.selectPatient);
                                            Common.setSelectedCouple($scope.SelectedCouple);
                                            //My Controls loading functions
                                            $scope.GetARTTypeList();
                                            $scope.GetARTSubTypeList();
                                            $scope.GetDoctorList();
                                            $scope.SetLandingPageControls();
                                            $scope.DrugList();
                                            $scope.GetFollicularScanSizeDetails();
                                            $scope.GetDaysList('FromLoading');
                                    }
                                });
                            });
                            }
                            else {
                                //for male
                                var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                                response.then(function (resp) {
                                    $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    var response = Common.SetSelectedMalePatient($scope.SelectedCouple.MalePatient);
                                    response.then(function (resp) {
                                        if (resp.status == 200) {
                                            $scope.selectPatient = {
                                        };
                                            $scope.selectPatient.ID = $scope.SelectedCouple.MalePatient.MaleId;
                                            $scope.selectPatient.UnitID = $scope.SelectedCouple.MalePatient.MAleUnitID;
                                            $scope.selectPatient.MRNo = $scope.SelectedCouple.MalePatient.MaleMRNO;
                                            $scope.selectPatient.GenderID = $scope.SelectedCouple.MalePatient.GenderID;
                                            $scope.selectPatient.VisitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID;
                                            $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
                                            Common.setSelectedPatient($scope.selectPatient);
                                            Common.setSelectedCouple($scope.SelectedCouple);
                                            $scope.SelectedCouple = Common.getSelectedCouple();
                                    }
                                });
                            });
                        }
                    }
                });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {

                    if (!angular.equals({ }, resp.data)) {
                        if (Patient.GenderID == 2) {
                            //for female
                            var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                            response.then(function (resp) {
                                $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                var response = Common.SetSelectedFemalePatient($scope.SelectedCouple.FemalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {
                                    };
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
                        });
                        }
                        else {
                            //for male
                            var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                            response.then(function (resp) {
                                $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                var response = Common.SetSelectedMalePatient($scope.SelectedCouple.MalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {
                                    };
                                        $scope.selectPatient.ID = $scope.SelectedCouple.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $scope.SelectedCouple.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $scope.SelectedCouple.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $scope.SelectedCouple.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.setSelectedCouple($scope.SelectedCouple);
                                        $scope.SelectedCouple = Common.getSelectedCouple();
                                        // $location.path(Redirectto);
                                        $scope.GetIUIDetails();
                                }
                            });
                        });
                    }
                }
                }
                else {
                    usSpinnerService.stop('GridSpinner');
                    //AlertMessage.info('PalashIVF', 'Visit Not Marked For Female Patient,Please First Mark Vist.');//Commented by swatih for localization on 14/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgVisitNotMarkedForFemalePatientPleaseFirstMarkVist);//Modified by swatih for localization on 14/7/2020
                    $scope.IsSave = true;
                    $scope.IsDisableUpdate = true;
            }
            });
    }
    }
        /* END : Open visit popup */

        $scope.LoadFirst10Rows = function LoadFirst10Rows() {
            for (var i = 1; i <= 10; i++) {
            $scope.FollicularScan.ListItem.push({
        });
    }
    }

    $scope.LoadEndometriumMorphology = function LoadEndometriumMorphology() {

        var ResponseData = Common.getMasterList('M_EndometriumMorphology', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select'
        });
            $scope.EndometriumMorphologyList = Response.data;
            if ($scope.FollicularScan.EndometriumMorphologyID == undefined) {
                $scope.FollicularScan.EndometriumMorphologyID = 0;
        }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
    });
    }

    $scope.LoadCycleCodeList = function LoadCycleCodeList() {

        var ResponseData = FollicularScanService.LoadCycleCodeList();
        ResponseData.then(function (Response) {
            //
            $scope.CycleCodeList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
    });
    }

    $scope.onSelect = function ($item, $model, $label) {

        $scope.SelectedPatient = $model;
        $scope.FollicularScan.TherapyId = $scope.SelectedPatient.ID;
        $scope.FollicularScan.Cyclecode = $scope.SelectedPatient.Description;
    }

    $scope.getMatchingCycleCode = function ($viewValue) {
        var matchingStuffs =[];

        for (var i = 0; i < $scope.CycleCodeList.length; i++) {
            if (
              $scope.CycleCodeList[i].Description.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.CycleCodeList[i]);
}
    }
    return matchingStuffs;
    }
    $scope.LoadNext5Rows = function LoadNext5Rows() {
        if ($scope.FollicularScan.ListItem.length < 20) {
            for (var i = 1; i <= 5; i++) {
                $scope.FollicularScan.ListItem.push({
            });
    }
    } else {
            //AlertMessage.info(objResource.msgTitle, "you can not add more than 20 rows");//Commented by swatih for localization 14/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgyoucannotaddmorethan20rows);//Commented by swatih for localization 14/7/2020
    }
    }
    $scope.round = function (value, step) {
        step || (step = 1.0);
        var inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }
    $scope.LeftOvaryTotal = function LeftOvaryTotal(LeftOvaryDimensionLength, LeftOvaryDimensionBreadth) {
        var total = (parseFloat(LeftOvaryDimensionLength || 0) +parseFloat(LeftOvaryDimensionBreadth || 0)) / 2;
        var avg = (total * 100) / 100 || 0;
        return $scope.round(avg, 0.05);

        //var avg = (total * 100) / 100 || 0;
        //console.log(avg);
        //return (Math.round(avg * 2) / 2).toFixed(2);
    }

    $scope.RightOvaryTotal = function LeftOvaryTotal(RightOvaryDimensionLength, RightOvaryDimensionBreadth) {
        var total = (parseFloat(RightOvaryDimensionLength || 0) +parseFloat(RightOvaryDimensionBreadth || 0)) / 2;
        var avg = (total * 100) / 100 || 0;
        return $scope.round(avg, 0.05);
        //console.log(avg);
        //return (Math.round(avg * 2) / 2).toFixed(2);
    }


        /* START : Operations */
        $scope.SaveOrUpdateFollicularScan = function SaveOrUpdateFollicularScan() {
            debugger;
            usSpinnerService.spin('GridSpinner');
            if ($scope.FollicularScan.FollicularScanDate == undefined
                || $scope.FollicularScan.FollicularScanTime == undefined) {
            $scope.frmFScan.SSRDate.$invalid = true;
            $scope.frmFScan.FollicularScanTime.$invalid = true;
            usSpinnerService.stop('GridSpinner');
            //AlertMessage.warning(objResource.msgTitle, "Please fill all required fileds");//Commented by swatih for localization on 14/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillallrequiredfileds);//Modified by swatih for localization on 14/7/2020

            } else {
                // Store images
            if ($scope.FollicularScan.FollicularDetails.model != undefined) {
                for (var Index = 0; Index < $scope.FollicularScan.FollicularDetails.model.length; Index++) {
                    $scope.FollicularScan.FollicularScanImages.push($scope.FollicularScan.FollicularDetails.model[Index])
            }
            }
                //Insert folliular scan details in system.
                //console.log($scope.FollicularScan.ListItem);
            var arrayCount = $scope.FollicularScan.ListItem.length;
            var tempCount = 0;
            for (var index = 0; index < $scope.FollicularScan.ListItem.length; index++) {

                if (typeof $scope.FollicularScan.ListItem[index] === 'object') {
                    //if ($scope.FollicularScan.ListItem[index].LeftOvaryDimensionAvg == undefined         Commented by Nayan Kamble
                    //    && $scope.FollicularScan.ListItem[index].RightOvaryDimensionAvg == undefined) {    --   Commented by Nayan Kamble

                    //if ($scope.FollicularScan.ListItem[index].LeftOvaryDimensionLength == undefined
                    //    && $scope.FollicularScan.ListItem[index].LeftOvaryDimensionBreadth == undefined
                    //    && $scope.FollicularScan.ListItem[index].RightOvaryDimensionLength == undefined
                    //    && $scope.FollicularScan.ListItem[index].RightOvaryDimensionBreadth == undefined) {
                        tempCount = tempCount +1;
                        //console.log('empty');
                    } else {
                        //console.log('not Empty');
                }
                //}      --  Commented by Nayan Kamble
            }
            //if (arrayCount == tempCount) {
            //    usSpinnerService.stop('GridSpinner');
            //    AlertMessage.warning(objResource.msgTitle, "Please enter at least one dimension");  // removed validation as per discussion with mangesh sir
            //} else {

                if ($scope.FollicularScan.ID == undefined) {
                    debugger;
                    //Send data to insert follicular scan details
                    $scope.FollicularScan.FollicularScanDate = $filter('date') ($scope.FollicularScan.FollicularScanDate, 'medium');
                    $scope.FollicularScan.FollicularScanTime = $filter('date')($scope.FollicularScan.FollicularScanTime, 'medium');
                    $scope.FollicularScan.LMPDate = $filter('date')($scope.FollicularScan.LMPDate, 'medium');
                    var ResponeData = FollicularScanService.SaveOrUpdateFollicularScan($scope.FollicularScan);
                    ResponeData.then(function (Response) {
                        if (Response.data > 0) {
                            debugger;
                            // Record inserted successfully
                            if ($scope.SelectedCouple.FemalePatient.TherapyID == 0 || $scope.SelectedCouple.FemalePatient.TherapyID == undefined) {
                                $scope.FollicularScan = {
                            };
                                $scope.FollicularScan.ListItem =[];
                                var date = new Date();
                                $scope.FollicularScan.FollicularScanDate = new Date();
                                $scope.FollicularScan.FollicularScanTime = date;
                                $scope.FollicularScan.FollicularDetails =[];
                                $scope.FollicularScan.FollicularDetails.model =[];
                                $scope.FollicularScan.FollicularScanImages =[];
                                for (var i = 1; i <= 10; i++) {
                                    $scope.FollicularScan.ListItem.push({
                                });
                            }
                                $scope.LoadPreviousFollicularScanData();
                            }
                            else {
                                $scope.LoadPreviousFollicularScanData();
                        }
                            AlertMessage.success(objResource.msgTitle, objResource.msgSave);
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
                    $scope.FollicularScan.FollicularScanDate = $filter('date') ($scope.FollicularScan.FollicularScanDate, 'medium');
                    $scope.FollicularScan.FollicularScanTime = $filter('date')($scope.FollicularScan.FollicularScanTime, 'medium');
                    $scope.FollicularScan.LMPDate = $filter('date')($scope.FollicularScan.LMPDate, 'medium');
                    var ResponeData = FollicularScanService.SaveOrUpdateFollicularScan($scope.FollicularScan);
                    ResponeData.then(function (Response) {
                        if (Response.data > 0) {
                            debugger;
                            // Record inserted successfully
                            if ($scope.SelectedCouple.FemalePatient.TherapyID == 0 || $scope.SelectedCouple.FemalePatient.TherapyID == undefined) {
                                $scope.FollicularScan = {
                            };
                                $scope.FollicularScan.ListItem =[];
                                $scope.FollicularScan.FollicularScanDate = new Date();
                                $scope.FollicularScan.FollicularScanTime = date;
                                $scope.FollicularScan.FollicularDetails =[];
                                $scope.FollicularScan.FollicularDetails.model =[];
                                $scope.FollicularScan.FollicularScanImages =[];
                                for (var i = 1; i <= 10; i++) {
                                    $scope.FollicularScan.ListItem.push({
                                });
                            }
                                $scope.LoadPreviousFollicularScanData();
                            }
                            else {
                                $scope.LoadPreviousFollicularScanData();
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
    }

    $scope.EditFollicularScan = function EditFollicularScan(follicularScan) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if ($scope.PreviousFollicularScan != undefined && $scope.PreviousFollicularScan != null) {
            angular.forEach($scope.PreviousFollicularScan, function (item) {
                if (item.ID != follicularScan.ID) {
                    item.SelectRow = false;
            }
        });
    }
    if (!follicularScan.IsFinalize) {
            follicularScan.SelectRow = true;
    }

        follicularScan.TherapyDate = new Date($filter('date') (follicularScan.TherapyDate, "dd-MMM-yyyy"));
        //var CurrentDate = new Date($filter('date')(new Date(), "dd-MMM-yyyy"));
        // Removed above conditons on suggestions of Dr.Priyanka date 13 June 2017
        //if (follicularScan.TherapyDate >= CurrentDate) {
        if (!angular.isUndefined(follicularScan.TherapyDate)) {
            $scope.FollicularScan.FollicularScanDate = follicularScan.TherapyDate;
    }
    $scope.FollicularScan.Cyclecode = follicularScan.Cyclecode;
    $scope.GetSingleFollicularScan(follicularScan.ID);
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

    $scope.GoToStimulationChart = function GoToStimulationChart() {

        $rootScope.FormName = 'Stimulation Chart';
        $location.path('/StimulationChart/');
    }

    $scope.GetSingleFollicularScan = function GetSingleFollicularScan(ID) {
        debugger;
        var ResponseData = FollicularScanService.GetSingleFollicularScan(ID);
        ResponseData.then(function (Response) {
            $scope.FollicularScan = Response.data;
            debugger;
            if ($scope.FollicularScan.LMPDate != null && $scope.FollicularScan.LMPDate != "") {
                $scope.FollicularScan.LMPDate = new Date($filter('date')($scope.FollicularScan.LMPDate, 'medium'));
            }
            if ($scope.FollicularScan.FollicularScanTime == null || $scope.FollicularScan.FollicularScanTime == undefined) {
                var date = new Date();
                $scope.FollicularScan.FollicularScanTime = date;
        }

            if (!angular.isUndefined($scope.FollicularScan)) {
                if ($scope.FollicularScan.EndometriumMorphologyID == undefined) {
                    $scope.FollicularScan.EndometriumMorphologyID = 0;
            }
                if ($scope.FollicularScan.IsFinalize != undefined && $scope.FollicularScan.IsFinalize) {
                    debugger;
                    $scope.IsDisableUpdate = true;
            }
                /*Add dynamic table if there is no rows */
                if (!angular.isUndefined($scope.FollicularScan.ListItem) && $scope.FollicularScan.ListItem.length == 0) {
                    $scope.LoadFirst10Rows();
            }
                $scope.FollicularScan.FollicularScanDate = new Date($filter('date') ($scope.FollicularScan.FollicularScanDate, 'medium'));
                if (angular.isUndefined($scope.FollicularScan.FollicularScanDate)) {
                    $scope.FollicularScan.FollicularScanDate = new Date();
            }
        }
            if ($scope.FollicularScan.Cyst == "" || $scope.FollicularScan.Cyst == null) {

                $scope.FollicularScan.Cyst = 0;
        }
            if ($scope.FollicularScan.RCyst == "" || $scope.FollicularScan.RCyst == null) {

                $scope.FollicularScan.RCyst = 0;
            }
            

                $scope.SetCycleDay();
            
        }, function (error) {
            $scope.Error = error;
    });
    }

    $scope.Printfollicularscan = function () {  //Follicular Print
        debugger;
        var ThID = $rootScope.CoupleDetails.FemalePatient.TherapyID;
        var ThuID = $rootScope.CoupleDetails.FemalePatient.TherapyUnitID;

        var a = encodeURIComponent('P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID +
                   '&Th=' + ThID + '&THU=' + ThuID);// + '&Id=' +ID);//+ '&UN=' + localStorageService.get("UserInfo").UserName);
            window.open('/Reports/ART/Follicular/FollicularScanRecord.aspx?' + encodeURIComponent(a), '_blank');
          
       }


    //$scope.valiadeEndometriumThick = function (val, eve) {
    //    debugger;
    //    var isDecimal = false;
    //    if (angular.isDefined(val)) {
    //        var count = val.split('.').length -1;
    //        isDecimal = val.indexOf(".") == - 1 ? false: true;
    //}
    //if (!isDecimal && angular.isDefined(val)) {
    //        if (val.length < 2) {
    //            if (val.length <= 1 && ([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 190, 8].indexOf(eve.which) > -1)) {      //[48, 49, 50, 51, 52, 53, 96, 97, 98, 99, 100, 101, 110, 190, 8]
    //            }
    //            else eve.preventDefault();
    //        }
    //        else if (val.length == 2 && (eve.which == 110 || eve.which == 190 || eve.which == 8)) {
    //        }
    //        else eve.preventDefault();
    //}
    //    else if (isDecimal) {
    //        var arr =[];
    //        arr = val.split('.');
    //        if (count > 0 && (eve.which == 110 || eve.which == 190)) {
    //            eve.preventDefault();
    //        }
    //        else if (eve.which == 8) { //bkspc
    //        }
    //        else if (arr[1].length > 0) {
    //            eve.preventDefault();
    //        }
    //        else {
    //    }
    //}
    //}

    $scope.GetUserrights = function () {
        debugger;
        var lstUserRights = Common.getUserRights();
        if (selectPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length -1; z++) {
                if (lstUserRights[z].MenuId == 310 && lstUserRights[z].Active)//Male History
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
            }
        }
        }
        else if (selectPatient.GenderID == 2) {
            for (var z = 0; z <= lstUserRights.length -1; z++) {
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

    $scope.RemoveImg = function (index) {
        var index = $scope.FollicularScan.FollicularDetails.model.indexOf(index);
        $scope.FollicularScan.FollicularDetails.model.splice(index, 1);
    }
    $scope.ValidationMsg = function (Msg) {
        //AlertMessage.error("PalashIVF", Msg);//Commented by swatih for localization 14/7/2020
        AlertMessage.error(objResource.msgTitle, Msg);//Commented by swatih for localization 14/7/2020
    }

    $scope.SetCycleDay = function SetCycleDay()
    {
        debugger;
        if (angular.isDate(new Date($scope.FollicularScan.LMPDate)) && $scope.FollicularScan.LMPDate != null )
        {
            var dt2 = new Date($scope.FollicularScan.FollicularScanDate);
            var dt1 = new Date($scope.FollicularScan.LMPDate);
            $scope.FollicularScan.CycleDay = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))+1;
        }
        else {
            $scope.FollicularScan.CycleDay = "";
        }
        
   
        //return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
       
    }
      
});

PIVF.directive('restrictTo', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var re = RegExp(attrs.restrictTo);
            var exclude = /Backspace|Enter|Tab|Delete|Del|ArrowUp|Up|ArrowDown|Down|ArrowLeft|Left|ArrowRight|Right/;

            element[0].addEventListener('keydown', function (event) {
                if (!exclude.test(event.key) && !re.test(event.key)) {
                    event.preventDefault();
                }
            });
        }
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
                    if ([8, 9, 13, 27, 37, 38, 39, 40, 110,190].indexOf(event.which) > -1) {
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

PIVF.directive('allowDecimalNumbersOneAndTwo', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                debugger;
                var $input = $(this);
                var value = $input.val();
                var array = value.split('.');
                value = value.replace(/[^0-9\.]/g, '')
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 48, 49, 110, 190, 50, 51, 52, 53, 54, 55, 56, 57].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }
                // Dont allow more than 1 digit precision and more than 2 digit scale
                if (containsDot != null) {
                    //console.log('If block with dot precision', array[0].length);
                    //console.log('If block with dot scale', array[1].length);
                    if ([8, 9, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows  
                        return true;
                    } else {
                        //console.log(array[0].length);
                        if (array[0].length > 1 || array[1].length > 1) {
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
                        // array[0].length > 0 allow to precisions before dot
                        if ((!angular.isUndefined(array[0]) && array[0].length > 0) || ([52, 53, 54, 55, 56, 57, 100, 101, 102, 103, 104, 105].indexOf(event.which) > -1)) {//allow max value 4
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

/* https://github.com/wender/angular-multiple-file-upload */
PIVF.directive('fileUploadforfolicular', ['$timeout', function ($timeout) {
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
                maxWidth,
                maxHeight,
                sel;

            fileName = attr.name || 'userFile';
            shareCredentials = attr.credentials === 'true';
            withPreview = attr.preview === 'true';
            resize = attr.resize === 'true';
            maxWidth = angular.isDefined(attr.maxWidth) ? parseInt(attr.maxWidth) : true;
            maxHeight = angular.isDefined(attr.maxHeight) ? parseInt(attr.maxHeight) : true;
            fileSelector = angular.isDefined(attr.fileSelector) ? attr.fileSelector : false;

            el.append('<input style="display: none !important;" type="file" ' + (attr.multiple == 'true' ? 'multiple' : '') + ' accept="' + (attr.accept ? attr.accept : '') + '" name="' + fileName + '"/>');

            function Resize(file, index, type) {
                debugger;
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
                debugger;
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
                debugger;
                var files = e.target.files;
                if (!angular.isDefined(scope.ngModel) || attr.multiple === 'true') {
                    if (scope.ngModel.length == 0) {
                        scope.ngModel = [];
                    }
                }
                debugger;
                var f;
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

PIVF.directive('allowDecimalNumbersWith', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elm, attrs, ngModel, ctrl) {
            elm.on('keydown', function (event) {

                var model = ngModel.$viewValue;
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
                console.log(value);

                // Dont allow more than 2 digit precision and more than 1 digit scale
                if (containsDot != null) {
                    //console.log('If block with dot precision', array[0].length);
                    //console.log('If block with dot scale', array[1].length);
                    if ([8, 9, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows  
                        return true;
                    } else {
                        //console.log(array[0].length);
                        if (array[0].length > 2 || array[1].length > 0 || parseInt(model) > 25) {
                            event.preventDefault();
                            return false;
                        }
                    }
                } else {
                    //console.log('If block without dot', array[0].length);
                    if ([8, 9, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1 && parseInt(model) <= 25) {
                        // backspace, enter, escape, arrows  
                        return true;
                    } else {
                        if (parseInt(model) > 25) {
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
});   // for allow decimal nos upto 9.
PIVF.directive("limitToMax", function () {
    return {
        link: function (scope, element, attributes) {
            element.on("keydown keyup", function (e) {
                if (Number(element.val()) > Number(attributes.max) &&
                      e.keyCode != 46 // delete
                      &&
                      e.keyCode != 8 // backspace
                    ) {
                    e.preventDefault();
                    element.val(attributes.max);
                }
            });
        }
    };
});