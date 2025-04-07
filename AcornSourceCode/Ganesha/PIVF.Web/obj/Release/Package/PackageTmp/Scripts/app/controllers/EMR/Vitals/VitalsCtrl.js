angular.module('PIVF').controller('VitalsCltr', ['$rootScope', '$scope', 'VitalsSrv', 'Common', 'AlertMessage', 'srvCommon', '$location', 'usSpinnerService', '$filter', function ($rootScope, $scope, VitalsSrv, Common, AlertMessage, srvCommon, $location, usSpinnerService, $filter) {
    //=========================================================================================================================================================
    //Declartion 
    $scope.Vitals = {};
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.GetSelectPatient = {};
    $scope.PreviousVitalsList = [];
    $scope.SelectDeletedRow = {};
    $scope.isBPSysValid = false;
    $scope.isBPDysValid = false;
    $scope.isHRValid = false;
    $scope.isTempValid = false;
    //$scope.IsValidVisit = true;
    var objResource = {};
    usSpinnerService.spin('GridSpinner');
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    /*navigation btn text on selected patient*/
    $scope.btnSaveVitalText = 'Save';
    if (selectPatient.GenderID == 1)
        $scope.btnText = 'Female Vitals';
    else if (selectPatient.GenderID == 2)
        $scope.btnText = 'Male Vitals';
    /*--*/
    //for sorting grid data
    $scope.SortColumn1 = "Date";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    ////
    //=========================================================================================================================================================
    //for paging
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.PageChange = function PageChange() {
        $scope.GetPatient();
    }
    //=========================================================================================================================================================
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //=========================================================================================================================================================
    //Save vitals
    $scope.Save = function (Vitals) {
        //Check Empty Data
        debugger;
        if (Vitals.Height == 0) delete Vitals.Height;
        if (!angular.equals({}, Vitals)) {
            //  if ($scope.ValidateForm(Vitals)) {
            usSpinnerService.spin('GridSpinner');
            //Common.setchangedObjects($scope.prevVitals, Vitals);
            //  console.log(Common.getchangedObjects());

            var ResponseData = VitalsSrv.SaveVitals(Vitals);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                if (Response.data == 1) {
                    $scope.GetPatient();
                    $scope.Clear();
                    angular.element(DeleteModel).modal('hide');

                    $scope.isBPSysValid = false;
                    $scope.isBPDysValid = false;
                    $scope.isHRValid = false;
                    $scope.isTempValid = false;

                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                }
                else if (Response.data == 2) {
                    $scope.GetPatient();
                    $scope.Clear();
                    angular.element(DeleteModel).modal('hide');

                    $scope.isBPSysValid = false;
                    $scope.isBPDysValid = false;
                    $scope.isHRValid = false;
                    $scope.isTempValid = false;

                    //AlertMessage.success(objResource.msgTitle, 'Record updated successfully.');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.success(objResource.msgTitle , objResource.msgUpdate); //Modified by swatih for localization on 13/7/2020
                }
                else {
                    //Error OccurredmsgError
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                }
                $scope.btnSaveVitalText = 'Save';
            }, function (error) {
                //Error OccurredmsgError
                usSpinnerService.stop('GridSpinner');
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
            //  }
        }
        else {
            debugger;
            usSpinnerService.stop('GridSpinner');
            //AlertMessage.error(objResource.msgTitle, "Please Enter Vitals");//Commented by swatih for localization on 13/7/2020
            AlertMessage.error(objResource.msgTitle, objResource.msgPleaseEnterVitals);//Modified by swatih for localization on 13/7/2020
        }
    }
    //=========================================================================================================================================================
    //Get Previous Patient List
    $scope.GetPatient = function () {
        $scope.GetSelectPatient = Common.getSelectedPatient();
        //$scope.Vitals.Height = 0 + "";
        $rootScope.FormName = 'Vitals';
        // $scope.IsVisitMark();
        if (!angular.equals({}, $scope.GetSelectPatient)) {
            //if ($scope.GetSelectPatient.VisitID == 0 && $scope.GetSelectPatient.VisitUnitID == 0) {
            //    $scope.IsValidVisit = true;
            //}
            //else {
            //    $scope.IsValidVisit = false;
            //}           
            usSpinnerService.spin('GridSpinner');
            var ResponseData = VitalsSrv.GetVitalsList($scope.GetSelectPatient, $scope.CurrentPage - 1);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                $scope.GetUserrights();
                $scope.PreviousVitalsList = Response.data;
                debugger;
                GenerateGraphData($scope.PreviousVitalsList);
                //check Visit is or not
                //var ResponseData1 = Common.CheckTodayVisit($scope.GetSelectPatient.ID, $scope.GetSelectPatient.UnitID);
                //ResponseData1.then(function (Response) {
                //    if (Response.data == 0) {
                //        $scope.IsValidVisit = false;
                //    }
                //    else {
                //        $scope.IsValidVisit = true;
                //    }
                //}, function (error) {
                //});
                if ($scope.PreviousVitalsList.length > 0) {
                    $scope.TotalItems = $scope.PreviousVitalsList[0].TotalRows;
                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.success(objResource.msgTitle, objResource.msgError);
            });
        }
        else {
            usSpinnerService.stop('GridSpinner');
            //AlertMessage.success(objResource.msgTitle, "Please Select Visit");//Commented by swatih for localization on 13/7/2020
            AlertMessage.success(objResource.msgTitle, objResource.msgPleaseSelectVisit);//Modified by swatih for localization on 13/7/2020
        }
    }
    function GenerateGraphData(list)
    {
        debugger;
        $scope.labels = [];
        $scope.colours = ['#72C02C', '#3498DB', '#717984', '#F1C40F', '#f20410', '#0b07f4', '#ed02c2'];
        $scope.options = {
            legend: {
               
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 80,
                    fontColor: 'red'
                    
                }
            },
            elements: {
                line: {
                    fill: false
                }
            }
        };
        $scope.series = ['Weight', 'Height', 'BMI', 'BP Systolic', 'BP Diastolic', 'HR', 'Temperature'];
        var Weight = [];
        var Height = [];
        var BMI = [];
        var BPSystolic = [];
        var BPDiastolic = [];
        var HR = [];
        var Temperature = [];
        $scope.data = [];
             
       
        angular.forEach(list, function (item) {
            $scope.labels.push($filter('date')(item.Date, 'dd-MMM-yy') + ' ' + $filter('date')(item.Time, 'hh:mm'));
            Weight.push(item.Weight);
            Height.push(item.Height);
            BMI.push(item.BMI);
            BPSystolic.push(item.BPSystolic);
            BPDiastolic.push(item.BPDiastolic);
            HR.push(item.HR);
            Temperature.push(item.Temperature);
        });
        $scope.data.push(Weight);
        $scope.data.push(Height);
        $scope.data.push(BMI);
        $scope.data.push(BPSystolic);
        $scope.data.push(BPDiastolic);
        $scope.data.push(HR);
        $scope.data.push(Temperature);
       

         //$filter('date')(x.VitriDate, 'medium');

    }
    //=========================================================================================================================================================
    //Navigate Male/Female
    $scope.btnClick = function () {
        //  if (selectPatient.PatientCategoryID == 7) {
        if (selectPatient.GenderID == 1) {
            $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = false;
            selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
            selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
            selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
            selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
            selectPatient.Gender = 'Female';
            selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
            if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit != null)
            {
                selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
            }
            else {
                selectPatient.VisitID = null;
                selectPatient.VisitUnitID = null;
            }
         
            Common.setSelectedPatient(selectPatient);
            Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                $scope.btnText = 'Female Vitals';
            })
            //   $rootScope.FormName = 'Female Vitals'
            $scope.Str = 'Vitals/';
            if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
            }
            else {
                $scope.GetSelectPatient = selectPatient;
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                   /* Common.GetGlobalData().then(function (resp) {
                        $rootScope.Allergies = resp.data;
                    });*/
                    if ($rootScope.CoupleDetails.FemalePatient.Allergies != "" && $rootScope.CoupleDetails.FemalePatient.Allergies != null)
                        $rootScope.Allergies = $rootScope.CoupleDetails.FemalePatient.Allergies;
                    else {
                        $rootScope.Allergies = '';
                    }
                    if ($rootScope.Allergies.includes('null')) {
                        $rootScope.Allergies = '';
                    }
                    //if ($rootScope.CoupleDetails.FemalePatient.AllergiesFood != "" && $rootScope.CoupleDetails.FemalePatient.AllergiesFood != null) {
                    //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.FemalePatient.AllergiesFood;
                    //}
                    //if ($rootScope.CoupleDetails.FemalePatient.AllergiesOthers != "" && $rootScope.CoupleDetails.FemalePatient.AllergiesOthers != null) {
                    //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.FemalePatient.AllergiesOthers;
                    //}
                    $location.path($scope.Str);
                })
            }
        }
        else if (selectPatient.GenderID == 2) {
            $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = true;
            selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
            selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
            selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
            selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
            selectPatient.Gender = 'Male';
            selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.MalePatientName;
            if ($rootScope.CoupleDetails.MalePatient.Selectedvisit != null) {
                selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
            }
            else {
                selectPatient.VisitID = null;
                selectPatient.VisitUnitID = null;
            }
           
            Common.setSelectedPatient(selectPatient);
            Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                $scope.btnText = 'Male Vitals';
            })
            //    $rootScope.FormName = 'Male Vitals'
            $scope.Str = 'Vitals/';
            if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
            }
            else {
                $scope.GetSelectPatient = selectPatient;
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                    /*Common.GetGlobalData().then(function (resp) {
                        $rootScope.Allergies = resp.data;
                    });*/
                    if ($rootScope.CoupleDetails.MalePatient.Allergies != "" && $rootScope.CoupleDetails.MalePatient.Allergies != null)
                        $rootScope.Allergies = $rootScope.CoupleDetails.MalePatient.Allergies;
                    else {
                        $rootScope.Allergies = '';
                    }
                    if ($rootScope.Allergies.includes('null')) {
                        $rootScope.Allergies = '';
                    }
                    //if ($rootScope.CoupleDetails.MalePatient.AllergiesFood != "" && $rootScope.CoupleDetails.MalePatient.AllergiesFood != null) {
                    //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesFood;
                    //}
                    //if ($rootScope.CoupleDetails.MalePatient.AllergiesOthers != "" && $rootScope.CoupleDetails.MalePatient.AllergiesOthers != null) {
                    //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesOthers;
                    //}
                    $location.path($scope.Str);
                })
            }
        }
        //  }
    }
    //=========================================================================================
    //Edit Vitals
    $scope.Edit = function (Item) {
        debugger;
        $scope.prevVitals = angular.copy(Item);
        $scope.Vitals = angular.copy(Item);
        $scope.Vitals.Height = Item.Height + "";
        if ($scope.Vitals.Weight == 0) $scope.Vitals.Weight = null;
        if ($scope.Vitals.BMI == 0) $scope.Vitals.BMI = null;
        if ($scope.Vitals.BPSystolic == 0) $scope.Vitals.BPSystolic = null;
        if ($scope.Vitals.BPDiastolic == 0) $scope.Vitals.BPDiastolic = null;
        if ($scope.Vitals.HR == 0) $scope.Vitals.HR = null;
        if ($scope.Vitals.Temperature == 0) $scope.Vitals.Temperature = null;
        $scope.btnSaveVitalText = 'Update';
        $scope.ValidateForm($scope.Vitals);
    }
    //=========================================================================================================================================================
    //Clear All Text
    $scope.Clear = function () {
        $scope.Vitals = {};
        //$scope.Vitals.Height = "";
    }
    //=========================================================================================================================================================
    //Deleted Reson
    $scope.SaveReason = function () {
        if (angular.isString($scope.SelectDeletedRow.Reason) && $scope.SelectDeletedRow.Reason.trim() != '') {
            usSpinnerService.spin('GridSpinner');
            var ResponseData = VitalsSrv.SaveReason($scope.SelectDeletedRow);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                if (Response.data == 1) {
                    //Reload Grid
                    $scope.GetPatient();
                    //Success Message
                    $scope.SelectDeletedRow.Reason = null;
                    //AlertMessage.success(objResource.msgTitle, "Record Deleted Successfully.");//Commented by swatih for localization on 13/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgRecorddeletedsuccessfully);//Modified by swatih for localization on 13/7/2020
                    angular.element(DeleteModel).modal('hide');
                }
                else {
                    //Error Occurred
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                }
            }, function (error) {
                //Error Occurred
                usSpinnerService.stop('GridSpinner');
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }
        else {
            //Error Occurred
            usSpinnerService.stop('GridSpinner');
            //AlertMessage.info(objResource.msgTitle, "Please Enter Reason");//Commeted by swatih for localization on 13/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgPleaseEnterReason);//Modified by swatih for localization on 13/7/2020
        }
    }
    //=========================================================================================================================================================
    //Delete the selected row
    $scope.Delete = function (Item) {
        $scope.showModal = true;
        $scope.SelectDeletedRow = Item;
    }
    //=========================================================================================================================================================
    $scope.CalculateBMI = function () {
        debugger;
        if (angular.isDefined($scope.Vitals.Height) && $scope.Vitals.Height != 0 && angular.isDefined($scope.Vitals.Weight))
            $scope.Vitals.BMI = ($scope.Vitals.Weight / Math.pow(($scope.Vitals.Height / 100), 2)).toFixed(2);
        else $scope.Vitals.BMI = undefined;
    //else $scope.Vitals.BMI = 0;
    }

    $scope.valiade = function (val, eve) {
        debugger;
        var isDecimal = false;
        if (angular.isDefined(val)) {
            var count = val.split('.').length - 1;
            isDecimal = val.indexOf(".") == -1 ? false : true;
        }
        if (!isDecimal && angular.isDefined(val)) {
            if (val.length < 3) {
            }
            else if (val.length == 3 && (eve.which == 110 || eve.which == 190 || eve.which == 8)) {
            }
            else eve.preventDefault();
        }
        else if (isDecimal) {
            var arr = [];
            arr = val.split('.');
            if (count > 0 && (eve.which == 110 || eve.which == 190)) {
                eve.preventDefault();
            }
            else if (eve.which == 8) { //bkspc
            }
            else if (arr[1].length > 0) {
                eve.preventDefault();
            }
            else {
            }
        }
    }

    $scope.ValidateForm = function (Vitals) {
        debugger;
        if (Vitals.Weight != null && (Vitals.Weight < 30 || Vitals.Weight > 200)) {
            //AlertMessage.info(objResource.msgTitle, 'Weight should be in range of 30-200.');
            //return false;
        }
        else
            if (Vitals.BPSystolic != null && (Vitals.BPSystolic < 90 || Vitals.BPSystolic > 120)) {
            //AlertMessage.info(objResource.msgTitle, 'BP Systolic should be in range of 90-120.');
            //return false;
            $scope.isBPSysValid = true;
        }
        else $scope.isBPSysValid = false;
        if (Vitals.BPDiastolic != null && (Vitals.BPDiastolic < 60 || Vitals.BPDiastolic > 80)) {
            //AlertMessage.info(objResource.msgTitle, 'BP Diastolic should be in range of 60-80.');
            //return false;
            $scope.isBPDysValid = true;
        }
        else $scope.isBPDysValid = false;
        if (Vitals.HR != null && (Vitals.HR < 60 || Vitals.HR > 100)) {
            //AlertMessage.info(objResource.msgTitle, 'HR should be in range of 60-100.');
            //return false;
            $scope.isHRValid = true;
        }
        else $scope.isHRValid = false;
        //if (Vitals.Temperature != null && (Vitals.Temperature < 97.8 || Vitals.Temperature > 99)) {   //Commented on 11Mar2021 for Victory client request
        if (Vitals.Temperature != null && (Vitals.Temperature < 36.1 || Vitals.Temperature > 37.2)) {   //Modified on 11Mar2021 for Victory client request
            //AlertMessage.info(objResource.msgTitle, 'Temperature should be in range of 97.8-99.');
            //return false;
            $scope.isTempValid = true;

        }
        else $scope.isTempValid = false;
        //  else return true;
    }

    $scope.IsVisitMark = function () {
        //if (selectPatient.GenderID == 1) {
        //    if (angular.isUndefined($rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID == 0) {
        //        angular.element(btnSaveVital).prop('disabled', true);
        //    }
        //    else {
        //        angular.element(btnSaveVital).prop('disabled', false);
        //    }
        //}
        //else if (selectPatient.GenderID == 2) {
        //    if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
        //        angular.element(btnSaveVital).prop('disabled', true);
        //    }
        //    else {
        //        angular.element(btnSaveVital).prop('disabled', false);
        //    }
        //}
        //added by rohini
        if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined)) {
            // angular.element(btnSaveVital).prop('disabled', true);
            $scope.IsVisitMarked = true;
        }
        else {
            // angular.element(btnSaveVital).prop('disabled', false);
            $scope.IsVisitMarked = false;
        }

    }

    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
        if (selectPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 314 && lstUserRights[z].Active)//Male vitaLS 
                {
                    $scope.objRgtVit = lstUserRights[z];
                    break;
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 307 && lstUserRights[z].Active)//Female VITALS 
                {
                    $scope.objRgtVit = lstUserRights[z];
                    break;
                }
            }
        }
        if (!$scope.objRgtVit.IsCreate) {
            angular.element(btnSaveVital).prop('disabled', true);

        }
        else if (!$scope.objRgtVit.IsUpdate) {
            angular.element(btnSaveVital).prop('disabled', true);

        }
        else {
            angular.element(btnSaveVital).prop('disabled', false);

        }
        $scope.IsVisitMark();
    }

    $scope.Cancel = function () {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    }
}]);