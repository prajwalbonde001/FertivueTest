angular.module('PIVF').controller('ctrlSemenThawing', function ($scope, $rootScope, $location, AlertMessage, swalMessages, Common, srvCommon, srvSemenThawing, $filter, SemenPrepService, usSpinnerService) {
    //  $scope.bigTotalItems = 0;

    $scope.maxSize = 5;
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.CurrentPage = 1;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    var TemplstFreezDetails = [];
    $scope.SemenFreez = {};
    $scope.SemenProc = {};
    $scope.SemenThaw = {};
    $scope.btnSaveUpdate = "Save";
    $scope.selectedPatient = {};
    $scope.selectedPatient = Common.getSelectedPatient();

    $scope.SemenThawDoct = {};
    $scope.ThowingList = [];
    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.FirstResponse = false;
    $scope.SecondResponse = false;
    $scope.FirstResponseByID = false;
    $scope.SecondResponseByID = false;

    $scope.open = function ($event, SemenThaw) {
        $event.preventDefault();
        $event.stopPropagation();
        SemenThaw.opened = true;
    };
    // for sorting by rohini
    $scope.SortColumn1 = "FormNo";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    //Code for Cancel button click to redirect
    $scope.CancelMain = function CancelMain() {
        $location.path("/EMRLandingPage");
    }

    $scope.ChangeSpermType = function () {
        if ($scope.SemenProc.SpermTypeID == 1) {
            $scope.IsDisableTypeSpermDiv = false;
        }
        else if ($scope.SemenProc.SpermTypeID == 2) {
            $scope.IsDisableTypeSpermDiv = true;
        }
    };

    $scope.RedirectToSemenPreparation = function (SNo) {
        var ResponseData = SemenPrepService.GetSemenProcessingDetailFromSemenPrepIDForTC(SNo);
        ResponseData.then(function (Response) {
            if (Response.data != null) {
                $scope.SemenProc = Response.data;
                $scope.SemenProc.SprermFreezingDate = new Date($scope.SemenProc.SprermFreezingDate);
                $scope.SemenProc.SprermFreezingTime = new Date($scope.SemenProc.SprermFreezingDate);
                $scope.SemenProc.CollectionDate = new Date($scope.SemenProc.CollectionDate);
                $scope.SemenProc.CollectionTime = new Date($scope.SemenProc.CollectionDate);
                $scope.SemenProc.TimeRecSampLab = new Date($scope.SemenProc.TimeRecSampLab);
                $scope.SemenProc.ReceivingTime = new Date($scope.SemenProc.TimeRecSampLab);
                $scope.SemenProc.ThawDate = new Date($scope.SemenProc.ThawDate);
                $scope.SemenProc.ThawTime = new Date($scope.SemenProc.ThawDate);
                $scope.ChangeSpermType();
                if ($scope.SemenProc.CollecteAtCentre == false)
                    $scope.SampleCollectedAt = 'Inhouse'
                else
                    $scope.SampleCollectedAt = 'Outside'
                if ($scope.SemenProc.FrozenAtCentre == false)
                    $scope.SampleFrozenAtCentre = 'Inhouse'
                else
                    $scope.SampleFrozenAtCentre = 'Outside'
               
            }
            else {
                $scope.ismeridian = true;
                $scope.maxTime = new Date();
                $scope.SemenProc.SprermFreezingDate = new Date();
                $scope.SemenProc.SprermFreezingTime = new Date();
                $scope.SemenProc.CollectionDate = new Date();
                $scope.SemenProc.CollectionTime = new Date();
                $scope.SemenProc.ReceivingDate = new Date();
                $scope.SemenProc.ReceivingTime = new Date();
                $scope.SemenProc.ThawDate = new Date();
                $scope.SemenProc.ThawTime = new Date();
                $scope.SemenProc.SampleCollected = false;
                $scope.SemenProc.MaleVisitUnitID = 0;
                $scope.SemenProc.MaleVisitID = 0;
                $scope.IsDisableFresh = false;
                $scope.IsDisableTypeSpermDiv = true;
            }
        }, function (error) {
        });
    };

    //Get Semen Prepration List for Update
    $scope.RedirectToSelf = function (formNo, action) {
        debugger;
        $scope.isDefaultCalled = false;
       // $scope.lstFreezDetails = [];
        //angular.forEach(TemplstFreezDetails, function (item, index) {
        //    item["IsModify"] = false;
        //    $scope.lstFreezDetails.push(item);
        //})

        if (action == 'default') {
            usSpinnerService.spin('GridSpinner');
            var ResponseData = SemenPrepService.GetSemenThawingDetailFromSemenPrepIDForTC(formNo, action);
            ResponseData.then(function (Response) {
               debugger
                $scope.FirstResponseByID = true;
                $scope.GetAllResponseByID();
                //  $scope.ThowingList = [];
                $scope.ThowingList = Response.data;
                $scope.IsFinalize = $scope.ThowingList[0].IsFinalized;
                $scope.IsFinalize1 = $scope.ThowingList[0].IsFinalized;
                angular.forEach($scope.ThowingList, function (item, index) {
                    item["ThawingDate"] = new Date(item["ThawingDate"]);
                    $scope.SemenThawDoct.DoneBy = item["DoneBy"];
                    $scope.SemenThawDoct.WitnessedBy = item["WitnessedBy"];
                })


                //by rohini
                debugger;
                if ($scope.ThowingList[0].IsFinalized == true) {
                    var Resc = srvSemenThawing.GetFreezDetailsAfterFinalize('FreezDataAfterFinalize', $scope.ThowingList[0].FreezDetailID, $scope.ThowingList[0].FreezDetailUnitID);
                    Resc.then(function (Response) {
                        debugger;
                        if (Response.data != null) {
                            $scope.lstFreezDetails = Response.data;
                            angular.forEach($scope.lstFreezDetails, function (item) {
                                item.IsModify = true;
                            })
                           
                        }
                    });
                }

                

            }, function (error) {
                $scope.FirstResponseByID = true;
                $scope.GetAllResponseByID();
            });
        }
        else if (action == 'Freezing') {
            usSpinnerService.spin('GridSpinner');
            var ResponseData = SemenPrepService.GetSemenThawingDetailFromSemenPrepIDForTC(formNo, action);
            ResponseData.then(function (Response) {
                debugger;
                $scope.SecondResponseByID = true;
                $scope.GetAllResponseByID();
                $scope.SemenFreezingList = Response.data;
                //angular.forEach($scope.SemenFreezingList, function (item, index) {
                //    item["IsModify"] = true
                //    $scope.lstFreezDetails.push(item);
                //})
            }, function (error) {
                $scope.SecondResponseByID = true;
                $scope.GetAllResponseByID();
            });
        }

        
        //Change Save Button Name
        $scope.btnSaveUpdate = "Update";
        $scope.SNo = formNo;
        $scope.GetUserrights();
    };

    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(),//.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.GetAllResponseByID = function () {

        if ($scope.FirstResponseByID == true && $scope.SecondResponseByID == true) {
            usSpinnerService.stop('GridSpinner');
        }
    };
    $scope.GetAllResponseDefault = function () {
        if ($scope.FirstResponse == true && $scope.SecondResponse == true) {
            usSpinnerService.stop('GridSpinner');
        }
    };
    $scope.Loaddata = function () {
        $scope.ismeridian = true;
        $scope.maxTime = new Date();
        $scope.GetEmbryologyDoctorsList();
        $scope.GetFreezDetails('default');
        $scope.SemenThawingListForTC();
        $scope.GetUserrights();
        //$scope.RedirectToSemenPreparation('GS/02/2017/SP/0006');
    }  // fill all ddl's

    $scope.GetEmbryologyDoctorsList = function FillCanList() {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
           Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data;
            $scope.SemenThawDoct.DoneBy = 0;
            $scope.SemenThawDoct.WitnessedBy = 0;
        }, function (error) {
        });
    };

    $scope.GetFreezDetails = function GetFreezDetails(action) {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenThawing.GetFreezDetails(action);
        ResponseData.then(function (Response) {
            $scope.FirstResponse = true;
            $scope.GetAllResponseDefault();
            $scope.lstFreezDetails = Response.data;
            TemplstFreezDetails = Response.data;
        }, function (error) {
            $scope.FirstResponse = true;
            $scope.GetAllResponseDefault();
        });
    }

    //Get Semen Thawing List for TC 
    $scope.SemenThawingListForTC = function () {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenThawing.GetFreezDetails('GetThawingForTC');
        ResponseData.then(function (Response) {
            $scope.SecondResponse = true;
            $scope.GetAllResponseDefault();
            $scope.SemenPrepList = Response.data;
        }, function (error) {
            $scope.SecondResponse = true;
            $scope.GetAllResponseDefault();
        });
    }

    $scope.AddRow = function (item) {

        if (item.IsModify) {
            var thaw = {};
            //thaw.FreezDetailID = item.DetailID; thaw.CryoNo = item.CryoNo; thaw.ThawingDate = new Date(); thaw.ThawingTime = new Date(); thaw.Volume = item.Volume;
            //thaw.SpermConcentration = item.SpermConcentration; thaw.SpermCount = item.SpermCount; thaw.GradeA = item.GradeA; thaw.GradeB = item.GradeB;
            //thaw.GradeC = item.GradeC; thaw.Motility = item.Motility; thaw.DoneBy = 0; thaw.WitnessedBy = 0; thaw.Comments = item.Comments;
            //thaw.SpremFreezingDate = item.SpremFreezingDate; thaw.SpremFreezingTime = item.SpremFreezingTime;
            //$scope.ThowingList.push(thaw); thaw.UnitID = item.UnitID;
            thaw.FreezDetailID = item.DetailID; thaw.CryoNo = item.CryoNo; thaw.ThawingDate = new Date(); thaw.ThawingTime = new Date(); thaw.Volume = item.Volume;
            thaw.SpermConcentration = item.SpermConcentration; thaw.SpermCount = item.SpermCount; thaw.GradeA = item.GradeA; thaw.GradeB = item.GradeB;
            thaw.GradeC = item.GradeC; thaw.Motility = item.Motility; thaw.DoneBy = 0; thaw.WitnessedBy = 0; thaw.Comments = item.Comments;
            thaw.SpremFreezingDate = item.SpremFreezingDate; thaw.SpremFreezingTime = item.SpremFreezingTime;thaw.UnitID = item.UnitID; thaw.OriginalVolume = item.Volume; thaw.FormNo = item.FormNo;
            $scope.ThowingList.push(thaw);
        }
        else {
            for (var i = 0; i <= $scope.ThowingList.length; i++) {
                if ($scope.ThowingList[i].FreezDetailID == item.DetailID) {
                    $scope.ThowingList.splice(i, 1);
                    break;
                }
            }
            //   $scope.ThowingList.splice($scope.ThowingList.indexOf($scope.ThowingList.find(x=>x.FreezDetailID == item.DetailID)), 1);
        }

        $scope.ThowingList.sort(function (u1, u2) {
            //  
            return u1.FreezDetailID - u2.FreezDetailID;
        });
    }//Add empty row

    $scope.SaveUpdate = function () {
        debugger;
        if ($scope.Validate()) {
            //$scope.ThowingList.every(x=>x.ThawingTime = $filter('date')(x.ThawingTime, 'medium'));
            //$scope.ThowingList.every(x=>x.DoneBy = $scope.SemenThawDoct.DoneBy);
            //$scope.ThowingList.every(x=>x.WitnessedBy = $scope.SemenThawDoct.WitnessedBy);
            debugger;
            angular.forEach($scope.ThowingList, function (item) {
                item.RemainingVolume = item.OriginalVolume - item.Volume;
                item.ThawingTime = $filter('date')(item.ThawingTime, 'medium');
                item.DoneBy = $scope.SemenThawDoct.DoneBy;
                item.WitnessedBy = $scope.SemenThawDoct.WitnessedBy
            });

            var Promise = srvSemenThawing.SaveUpdate($scope.ThowingList);
            Promise.then(function (Response) {

                if (Response.data == 1) {
                    AlertMessage.info('PalashIVF', 'Record saved successfully.');
                    $scope.ThowingList.length = 0;
                    $scope.Loaddata();                      
                }
                if (Response.data == 2) {
                    AlertMessage.info('PalashIVF', 'Record updated successfully.');
                    $scope.ThowingList.length = 0;
                    $scope.Loaddata();
                }
            }, function (error) {
            });
        }
        else {
            $scope.frmSemenThaw.ddlDoneby.$dirty = true;
            $scope.frmSemenThaw.ddlWitnessedby.$dirty = true;
        }
    }
     
    ////Start Report                     Added by Nayan Kamble
    $scope.PrintSemenThaw = function PrintSemenThaw(Item) {
        debugger;
        //var a = encodeURIComponent('U=' + Item.SNo + '&SNo=' + Item.SNo + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&FrmNo=' + Item.FormNo + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PU=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID);
        // var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&FrmNo=' + Item.FormNo );

        window.open('/Reports/EMR/SemenThawWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    //END Report

    $scope.Validate = function () {
        debugger;
        var IsValid = true;
        if ($scope.ThowingList.length > 0) {
            angular.forEach($scope.ThowingList, function (item) {
                if ($scope.IsFinalize) item.IsFinalized = true;
                else item.IsFinalized = false;
                item.DateInvalid = false;
                item.TimeInvalid = false;
                item.Invalid = false;
                //item.ThawingDate.setTime(Date.parse($filter('date')(item.ThawingTime, 'medium')));
                //item.ThawingTime.setTime(Date.parse($filter('date')(item.ThawingTime, 'medium')));// new Date(item.ThawingTime);
                //item.ThawingDate = $filter('date')(item.ThawingDate, 'medium');
                //item.ThawingTime = $filter('date')(item.ThawingTime, 'medium');

                if (angular.isUndefined(item.Volume) || item.Volume == '') {
                    AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                    IsValid = false;
                    item.Invalid = true;
                }

                //Begin : Commented on 04Aug2021 to solve issue while save
                //if (angular.isUndefined(item.SpermConcentration) || item.SpermConcentration == '') {
                //    AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                //    IsValid = false;
                //    item.Invalid = true;
                //}
                //if (angular.isUndefined(item.GradeA) || item.GradeA == '') {
                //    AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                //    IsValid = false;
                //    item.Invalid = true;
                //}
                //if (angular.isUndefined(item.GradeB) || item.GradeB == '') {
                //    AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                //    IsValid = false;
                //    item.Invalid = true;
                //}
                //if (angular.isUndefined(item.GradeC) || item.GradeC == '') {
                //    AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                //    IsValid = false;
                //    item.Invalid = true;
                //}
                //End : Commented on 04Aug2021 to solve issue while save

                if (new Date($filter('date')(item.ThawingDate, 'shortDate')) < new Date($filter('date')(item.SpremFreezingDate, 'shortDate'))) {
                    AlertMessage.info('PalashIVF', 'Thawing date should be greater than or equal to sprem freezing date.');
                    IsValid = false;
                    item.DateInvalid = true;
                }
                //if (item.DoneBy == 0) {
                //    AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                //    IsValid = false;
                //    //  item.Invalid = true;
                //}
                //if (item.WitnessedBy == 0) {
                //    AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                //    IsValid = false;
                //    //  item.Invalid = true;
                //}
                
                if ($filter('date')(item.ThawingTime, 'short') < $filter('date')(item.SpremFreezingTime, 'short') && new Date($filter('date')(item.ThawingDate, 'shortDate')) == new Date($filter('date')(item.SpremFreezingDate, 'shortDate'))) {
                    AlertMessage.info('PalashIVF', 'Thawing time should be equal to or greater than sprem freezing time.');
                    IsValid = false;
                    item.TimeInvalid = true;
                }
            });

            if ($scope.SemenThawDoct.DoneBy == 0) {
                AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                IsValid = false;
                //  item.Invalid = true;
            }
            if ($scope.SemenThawDoct.WitnessedBy == 0) {
                AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                IsValid = false;
                //  item.Invalid = true;
            }

            if ($scope.SemenThawDoct.DoneBy == $scope.SemenThawDoct.WitnessedBy)
            {
                AlertMessage.info('PalashIVF', 'Done By and Witnessed By both should not be same');
                IsValid = false;
            }

            //    IsValid = $scope.ThowingList.some(x => x.TimeInvalid == true || (x.DateInvalid == true || x.Invalid == true || $scope.SemenThawDoct.WitnessedBy == 0 || $scope.SemenThawDoct.DoneBy == 0));
            for (var i = 0; i <= $scope.ThowingList.length - 1; i++) {
                if ($scope.ThowingList[i].TimeInvalid == true || ($scope.ThowingList[i].DateInvalid == true || $scope.ThowingList[i].Invalid == true || $scope.SemenThawDoct.WitnessedBy == 0 || $scope.SemenThawDoct.DoneBy == 0)) {
                    IsValid = false;
                    break;
                }
            }
            return IsValid;
        }
        else {
            AlertMessage.info('PalashIVF', 'Select atleast 1 record.');
            IsValid = false;
            return IsValid;
        }

    }  //validate form before save/update

    $scope.OnProgressive = function (SemenThaw) {

        var tmpSemenThaw = {};
        tmpSemenThaw = angular.copy(SemenThaw);
        if ((angular.isDefined(SemenThaw.GradeB) && SemenThaw.GradeB != '')) {
            SemenThaw.Motility = parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeB);
            SemenThaw.GradeC = 100 - (parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeB));
            if (SemenThaw.GradeC < 0) {
                SemenThaw.Motility = tmpSemenThaw.Motility;
                SemenThaw.GradeA = SemenThaw.OGradeA;
                //  SemenThaw.GradeB = tmpSemenThaw.GradeB;
                SemenThaw.GradeC = tmpSemenThaw.GradeC;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
            }
        }
        else if ((angular.isDefined(SemenThaw.GradeC) && SemenThaw.GradeC != '')) {
            SemenThaw.GradeB = 100 - (parseInt($scope.SemenFreez.GradeA) + parseInt(SemenThaw.GradeC));
            if (SemenThaw.GradeB > 0)
                SemenThaw.Motility = parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeB);
            if (SemenThaw.GradeB < 0) {
                SemenThaw.Motility = tmpSemenThaw.Motility;
                SemenThaw.GradeA = SemenThaw.OGradeA;
                SemenThaw.GradeB = tmpSemenThaw.GradeB;
                //    SemenThaw.GradeC = tmpSemenThaw.GradeC;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
            }
        }
    }  //calculate grades

    $scope.OnNonProgressive = function (SemenThaw) {
        var tmpSemenThaw = {};
        tmpSemenThaw = angular.copy(SemenThaw);
        if ((angular.isDefined(SemenThaw.GradeA) && SemenThaw.GradeA != '')) {
            SemenThaw.Motility = parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeB);
            SemenThaw.GradeC = 100 - (parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeB));
            if (SemenThaw.GradeC < 0) {
                SemenThaw.Motility = tmpSemenThaw.Motility;
                //    SemenThaw.GradeA = tmpSemenThaw.GradeA;
                SemenThaw.GradeB = SemenThaw.OGradeB;
                SemenThaw.GradeC = tmpSemenThaw.GradeC;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
            }
        }
        else if ((angular.isDefined(SemenThaw.GradeC) && SemenThaw.GradeC != '')) {
            SemenThaw.GradeA = 100 - (parseInt(SemenThaw.GradeB) + parseInt(SemenThaw.GradeC));
            if (SemenThaw.GradeA > 0)
                SemenThaw.Motility = parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeB);
            if (SemenThaw.GradeA < 0) {
                SemenThaw.Motility = tmpSemenThaw.Motility;
                SemenThaw.GradeA = tmpSemenThaw.GradeA;
                SemenThaw.GradeB = SemenThaw.OGradeB;
                //     SemenThaw.GradeC = tmpSemenThaw.GradeC;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100')
            }
        }
    }  //calculate grades

    $scope.OnImmotile = function (SemenThaw) {
        var tmpSemenThaw = {};
        tmpSemenThaw = angular.copy(SemenThaw);
        if ((angular.isDefined(SemenThaw.GradeA) && SemenThaw.GradeA != '')) {
            SemenThaw.GradeB = 100 - (parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeC));
            if (SemenThaw.GradeB > 0)
                SemenThaw.Motility = parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeB);
            if (SemenThaw.GradeB < 0) {
                //   SemenThaw.GradeA = tmpSemenThaw.GradeA;
                SemenThaw.GradeB = tmpSemenThaw.GradeB;
                SemenThaw.GradeC = SemenThaw.OGradeC;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
            }
        }
        else if ((angular.isDefined(SemenThaw.GradeB) && SemenThaw.GradeB != '')) {
            SemenThaw.GradeA = 100 - (parseInt(SemenThaw.GradeB) + parseInt(SemenThaw.GradeC));
            if (SemenThaw.GradeA > 0)
                SemenThaw.Motility = parseInt(SemenThaw.GradeA) + parseInt(SemenThaw.GradeB);
            if (SemenThaw.GradeA < 0) {
                SemenThaw.GradeA = tmpSemenThaw.GradeA;
                //   SemenThaw.GradeB = tmpSemenThaw.GradeB;
                SemenThaw.GradeC = SemenThaw.OGradeC;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100')
            }
        }
    }  //calculate grades

    $scope.SortColumn = "CryoNo";
    $scope.reverseSort = false;
    $scope.SortData = function (column) {
        $scope.reverseSort = ($scope.SortColumn == column) ? !$scope.reverseSort : false;
        $scope.SortColumn = column;
        if ($scope.SortColumn == column)
            $scope.sortClass = $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass = '';
    }

    $scope.GetUserrights = function () {
        debugger;
        var lstUserRights = Common.getUserRights();
    //    if ($scope.selectedPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 317 && lstUserRights[z].Active)//Semen Thawing
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
                }
            }
    //    }
        if (!$scope.objRgt.IsCreate && $scope.btnSaveUpdate == "Save") {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && $scope.btnSaveUpdate == "Update") {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }
        else {
            angular.element(btnSaveUpdate).prop('disabled', false);
        }

        //Enable and disabled save button on date 15012018 by arz
        debugger;
        if ($scope.IsFinalize1 || $scope.IsVisitMarked) {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }

        if (($scope.selectedPatient.VisitID == 0 && $scope.selectedPatient.VisitUnitID == 0) || ($scope.selectedPatient.VisitID == undefined && $scope.selectedPatient.VisitUnitID == undefined)) {
            debugger;
            $scope.IsVisitMarked = true;
        }
        else {
            debugger;
            $scope.IsVisitMarked = false;
        }
    }  // For User rights configuration

    //$scope.getSortClass = function (column) {
    // //   
    //    if ($scope.SortColumn == column) {
    //        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
    //    }
    //    return '';

    //}

    $scope.CheckVolumeLess = function (Item) {
        debugger;
        if (Item.OriginalVolume < Item.Volume ) {
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