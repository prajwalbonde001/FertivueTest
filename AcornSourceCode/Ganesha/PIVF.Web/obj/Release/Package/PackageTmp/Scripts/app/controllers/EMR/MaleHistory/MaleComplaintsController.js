angular.module('PIVF').controller('MaleComplaintsController', function ($rootScope, $scope, $filter, $location, MaleComplaintsService, Common, srvCommon, $uibModal, $window, AlertMessage, usSpinnerService, $timeout) {

    /*START : Global variables declarations section */
    $scope.MaleComplaints = {};
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.MaleComplaints.PresentingComplaintsSelected = [];
    $scope.PreviousFollowUpNotesData = [];
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    $scope.maxTime = new Date();
    var date = new Date();
    $scope.MaleComplaints.SSRDate = new Date();
    usSpinnerService.spin('GridSpinner');
    /*END : Global variables declarations section */
    $rootScope.FormName = 'Complaints/FU'
    /*START : Visible*/
    $scope.LeftVisible = true;
    $scope.RightVisible = true;
    $scope.disableClick = false; //Added by AniketK on 31May2019
    /*END : Visible*/
    $scope.lstCompDetails = [];
    $scope.lstOthrCompDetails = [];
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

    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.dateOptions2 = {
        formatYear: 'yyyy',
        //maxDate: new Date().setYear(new Date().getYear() + 100), //new Date(2016, 8, 01),
        minDate: new Date(),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    /*END : Date*/

    /* START for Resource */
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    /*END of Resource*/

    /*START : Page setup*/
    $scope.MaleComplaintsInitilization = function MaleComplaintsInitilization() {
        $scope.FetchPresentingComplaints();
        $scope.fillModality();
        $scope.fillOnset()
        fillYear();
        fillMonth();
        fillDays();
        $scope.IsVisitMark();
        //  $scope.PreviousFollowUpNotes();
        $scope.GetUserrights();
    }
    /*END : Page setup*/
    $scope.SetAllControls = function SetAllControls() {
        var ResponseData = MaleComplaintsService.SetAllControls();
        ResponseData.then(function (Response) {
            $scope.MaleComplaints = Response.data;
            if (!angular.isUndefined($scope.MaleComplaints) && $scope.MaleComplaints != null) {
                if (!angular.isUndefined($scope.MaleComplaints.NFUpDate)) {
                    $scope.MaleComplaints.NFUpDate = $scope.MaleComplaints.NFUpDate != null ? new Date($filter('date')($scope.MaleComplaints.NFUpDate, 'dd-MMM-yyyy')) : null;
                }
            }
            if (!angular.isUndefined($scope.MaleComplaints) && $scope.MaleComplaints != null && !angular.isUndefined($scope.PresentingComplaintsList)) {

                if (!angular.isUndefined($scope.MaleComplaints.PresentingComplaints) && $scope.MaleComplaints.PresentingComplaints != null) {
                    angular.forEach($scope.MaleComplaints.PresentingComplaints.split(','), function (i) {
                        for (var j = 0; j <= $scope.PresentingComplaintsList.length - 1; j++) {
                            if ($scope.PresentingComplaintsList[j].ID == i) {
                                $scope.PresentingComplaintsList[j].ticked = true;
                                break;
                            }
                        }
                    });
                }
            }
            if ($scope.MaleComplaints != null && $scope.MaleComplaints != undefined) {
                $scope.MaleComplaints.lstCompDetails.forEach(function (x) {
                    x.lstOnset = angular.copy($scope.lstOnset);
                    x.lstModality = angular.copy($scope.lstModality);
                    x.lstYear = angular.copy($scope.lstYear);
                    x.lstMonth = angular.copy($scope.lstMonth);
                    x.lstDay = angular.copy($scope.lstDay);
                    if (x.PreComID > 0) {
                        $scope.lstCompDetails.push(x);
                    }
                    else $scope.lstOthrCompDetails.push(x);
                })
            }
        }, function (error) {
            $scope.Error = error;
        })
    }
    /*START : Load previous follow up Notes*/
    $scope.PreviousFollowUpNotes = function PreviousFollowUpNotes() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = MaleComplaintsService.PreviousFollowUpNotes();
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PreviousFollowUpNotesData = Response.data;
            $scope.PreviousFollowUpNotesData.forEach(function (y) {
                debugger;
                y.lstPreCompDetails = []; y.lstPreOthrCompDetails = [];
                y.lstCompDetails.forEach(function (x) {
                    if (x.PreComID > 0) {
                        y.lstPreCompDetails.push(x);
                    }
                    else y.lstPreOthrCompDetails.push(x);
                })

                //added by neena
                if (y.Reason.length > 0)
                    y.ReasonText = 'For';
                else
                    y.ReasonText = '';
                //
            })
        }, function (error) {
            $scope.Error = error;
            usSpinnerService.stop('GridSpinner');
        })
    }
    /*END : Load previous follow up Notes*/

    /*START : Bind dropdowns*/
    $scope.FetchPresentingComplaints = function FetchPresentingComplaints() {
        //
        var ResponseData = Common.getMasterList('M_M_ComaplaintConfig', 'ID', 'Description');
        ResponseData.then(function (Response) {

            $scope.PresentingComplaintsList = Response.data;
            $timeout(function () {
                $scope.SetAllControls();
            }, 1000);

            //Make checkbox checked
            //if (!angular.isUndefined($scope.PresentingComplaintsList) && !angular.isUndefined($scope.MaleComplaints) && $scope.MaleComplaints != null) {
            //    if ($scope.PresentingComplaintsList.length != 0 && !angular.isUndefined($scope.MaleComplaints.PresentingComplaints)) {
            //        angular.forEach($scope.MaleComplaints.PresentingComplaints.split(','), function (i, idx) {
            //            if (idx.ID == i)
            //                $scope.PresentingComplaintsList[idx].ticked = true;
            //            //  $scope.PresentingComplaintsList[$scope.PresentingComplaintsList.findIndex(x=>x.ID == i)].ticked = true;
            //        });
            //    }
            //}
        }, function (error) {
            $scope.Error = error;
        });
    }
    /*END : Bind dropdowns*/

    //Begin::Added by AniketK on 27Sept2019
    $scope.ClearSavePrescription = function ClearSavePrescription() {
        $scope.disableClick = false;
    }
    //End::Added by AniketK on 27Sept2019

    /*START : Operations */
    $scope.SaveOrUpdateMaleComplaints = function SaveOrUpdateMaleComplaints() {
        debugger;
        var IsSave = true;
        $scope.disableClick = true; //Added by AniketK on 27Sept2019

        if ($scope.MaleComplaints == null) {
            //AlertMessage.error("At list one data should be entered");//commented by swatih for localization 16/7/2020
            AlertMessage.error(objResource.msgAtlistonedatashouldbeentered)//Modified by swatih for localization 16/7/2020
            IsSave = false;
        }
        else {
            if ($scope.MaleComplaints.FollowUpNotes == undefined || $scope.MaleComplaints.FollowUpNotes == null || $scope.MaleComplaints.FollowUpNotes === '')
                $scope.MaleComplaints.FollowUpNotes = '';
            if ($scope.MaleComplaints.OtherComplaints == undefined || $scope.MaleComplaints.OtherComplaints == null || $scope.MaleComplaints.OtherComplaints === '')
                $scope.MaleComplaints.OtherComplaints = '';
            if ($scope.MaleComplaints.NFUpDate == undefined || $scope.MaleComplaints.NFUpDate == null)
                $scope.MaleComplaints.NFUpDate = null;
            if ($scope.MaleComplaints.Reason == undefined || $scope.MaleComplaints.Reason == null || $scope.MaleComplaints.Reason === '')
                $scope.MaleComplaints.Reason = '';

            if (($scope.MaleComplaints.PresentingComplaintsSelected == undefined || $scope.MaleComplaints.PresentingComplaintsSelected.length == 0) && $scope.MaleComplaints.FollowUpNotes == '' && $scope.MaleComplaints.OtherComplaints == '' && $scope.MaleComplaints.Reason == '') { //$scope.MaleComplaints.NFUpDate == null &&
                //AlertMessage.error("At list one data should be entered");//Commented by swatih for localization 16/7/2020
                AlertMessage.error(objResource.msgAtlistonedatashouldbeentered);//Modified by swatih for localization 16/7/2020
                IsSave = false;

            }
            else if ($scope.lstCompDetails.length > 0) {
                for (var i = 0; i < $scope.lstCompDetails.length; i++) {

                    //if ($scope.lstCompDetails[i].Onset == 0) {
                    //    IsSave = false;
                    //    AlertMessage.error("Onset is mandatory field");
                    //    break;
                    //}
                    //else if ($scope.lstCompDetails[i].ModID == 0) {
                    //    IsSave = false;
                    //    AlertMessage.error("Modality is mandatory field");
                    //    break;
                    //}
                    //else

                    //if ($scope.lstCompDetails[i].Day == 0 && $scope.lstCompDetails[i].Month == 0 &&
                    //$scope.lstCompDetails[i].Year == 0) {
                    //    IsSave = false;
                    //    AlertMessage.error("Duration is mandatory field");
                    //    break;
                    //}

                    //if($scope.lstCompDetails[i].Onset==0 ||$scope.lstCompDetails[i].Day==0 || $scope.lstCompDetails[i].Month==0 ||
                    //    $scope.lstCompDetails[i].Year == 0 || $scope.lstCompDetails[i].ModID == 0) {
                    //    IsSave = false;
                    //    AlertMessage.error("Onset, Duration, Modality are mandatory field");
                    //    break;
                    //}
                }
            }
        }

        if (IsSave) {
            $scope.MaleComplaints.NFUpDate = $filter('date')($scope.MaleComplaints.NFUpDate, 'medium');
            usSpinnerService.spin('GridSpinner');
            $scope.MaleComplaints.lstCompDetails = $scope.lstCompDetails.concat($scope.lstOthrCompDetails);
            var ResponseData = MaleComplaintsService.SaveOrUpdateMaleComplaints($scope.MaleComplaints);
            ResponseData.then(function (Response) {

                if (Response.data > 0 && Response.data == 1) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $scope.ClearSavePrescription(); //Added by AniketK on 27Sept2019
                }
                if (Response.data > 0 && Response.data == 2) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                }
                $scope.lstCompDetails.length = 0;
                $scope.lstOthrCompDetails.length = 0;
                $scope.MaleComplaintsInitilization();
                $scope.PreviousFollowUpNotes();
                Clear();
                //$location.path("/EMRLandingPage");
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                $scope.Error = error;
            });
        }
    }

    function Clear() {
        $scope.MaleComplaints.NFUpDate = null;
        $scope.MaleComplaints.FollowUpNotes = null;
        $scope.MaleComplaints.Reason = null;
        for (var j = 0; j <= $scope.PresentingComplaintsList.length - 1; j++) {
            $scope.PresentingComplaintsList[j].ticked = false;;
        }
    }
    /*END : Operations */

    /* START : Swith to page*/
    $scope.GotoMaleComplaints = function GotoMaleComplaints() {
        debugger;
        if (selectPatient.PatientCategoryID == 7) {
            if (selectPatient.GenderID == 1) {
                selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                selectPatient.Gender = 'Female';
                selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit != null) {
                    selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                    selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                }
                else {
                    selectPatient.VisitID = null;
                    selectPatient.VisitUnitID = null;
                }
                // selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID
                //  selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID
                selectPatient.PatientCategoryID = 7;
                Common.setSelectedPatient(selectPatient);
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                    $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
                    $rootScope.IsMaleActive = false;
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
                })
                $rootScope.FormName = 'Male Complaints/Follow Up'
                //if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                //    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                //}
                $location.path('/FemaleComplaints/');
            }
        }
    }

    $scope.MaleComplaintCancel = function MaleComplaintCancel() {
        $location.path("/EMRLandingPage");
    }

    $scope.IsVisitMark = function () {
        debugger;
        //if (selectPatient.GenderID == 1) {
        //    if (angular.isUndefined($rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID == 0) {
        //        angular.element(btnSaveComplaint).prop('disabled', true);
        //        $scope.NevigateVisitPopUP(selectPatient);
        //    }
        //    else {
        //        angular.element(btnSaveComplaint).prop('disabled', false);
        //    }
        //}
        //added by rohini
        if ((selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined) || (selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;
    }

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
                        if (!angular.equals({}, data)) {  //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                //for Male
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MalePatientID;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MalePatientUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MalePatientMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        angular.element(btnSaveComplaint).prop('disabled', false);

                                        //       $location.path(Redirectto);
                                    }
                                });
                            }
                            else {
                                //for male
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $rootScope.CoupleDetails = Common.getSelectedCouple();
                                        angular.element(btnSaveComplaint).prop('disabled', false);
                                        //        $location.path(Redirectto);
                                    }
                                });
                            }
                        }
                    });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {
                    if (!angular.equals({}, resp.data)) {
                        if (Patient.GenderID == 2) {
                            //for Male
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                            response.then(function (resp) {
                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MalePatientID;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MalePatientUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MalePatientMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($rootScope.CoupleDetails);
                                    $rootScope.CoupleDetails = Common.getSelectedCouple();
                                    angular.element(btnSaveComplaint).prop('disabled', false);
                                    //     $location.path(Redirectto);
                                }
                            });
                        }
                        else {
                            //for male
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                            response.then(function (resp) {
                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($rootScope.CoupleDetails);
                                    $rootScope.CoupleDetails = Common.getSelectedCouple();
                                    angular.element(btnSaveComplaint).prop('disabled', false);
                                    //       $location.path(Redirectto);
                                }
                            });
                        }
                    }
                }
                //else {
                //    //alert("There is no active visit");
                //    $location.path(Redirectto);
                //}
            });
        }
    }

    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
        if (selectPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 308 && lstUserRights[z].Active)//Male Complaints 
                {
                    $scope.objRgtCom = lstUserRights[z];
                    break;
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 308 && lstUserRights[z].Active)//Male Complaints 
                {
                    $scope.objRgtCom = lstUserRights[z];
                    break;
                }
            }
        }
        if (!$scope.objRgtCom.IsCreate) {
            angular.element(btnSaveComplaint).prop('disabled', true);

        }
        else if (!$scope.objRgtCom.IsUpdate && $scope.MaleComplaints.MCID > 0) {
            angular.element(btnSaveComplaint).prop('disabled', true);

        }
        else {
            angular.element(btnSaveComplaint).prop('disabled', false);

        }
    }

    // By Umesh for complaint details
    $scope.fillModality = function () {
        var ResponseData = Common.getMasterList('M_Modality', 'ID', 'Description');
        ResponseData.then(function (Response) {
            $scope.PreviousFollowUpNotes();
            $scope.lstModality = Response.data;
            $scope.lstModality.splice(0, 0, { ID: 0, Description: 'Select' });
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.fillOnset = function () {
        var ResponseData = Common.getMasterList('M_FemaleComplaintsOnset', 'ID', 'Description');
        ResponseData.then(function (Response) {
            $scope.lstOnset = Response.data;
            $scope.lstOnset.splice(0, 0, { ID: 0, Description: 'Select' });
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.fClick = function (data) {
        debugger;
        if (data.ticked) {
            var obj = {};
            obj.ID = 0;
            obj.PreComID = data.ID;
            obj.PreComplaints = data.Description;
            obj.Day = 0;
            obj.Month = 0;
            obj.Year = 0;
            obj.OtherComplaints = "";
            obj.Onset = 0;
            obj.ModID = 0;
            obj.IsOther = false;
            obj.lstOnset = angular.copy($scope.lstOnset);
            obj.lstModality = angular.copy($scope.lstModality);
            obj.lstYear = angular.copy($scope.lstYear);
            obj.lstMonth = angular.copy($scope.lstMonth);
            obj.lstDay = angular.copy($scope.lstDay);
            $scope.lstCompDetails.push(obj);
        }
        else $scope.lstCompDetails.splice($scope.lstCompDetails.findIndex(function (x) { return x.PreComID == data.ID; }), 1);     //x.ID     commented and modified by Nayan Kamble on 05/12/2019
    }

    $scope.fSelectAll = function () {
        $scope.PresentingComplaintsList.forEach(function (x) {
            $scope.fClick(x);
        })
    }

    $scope.fSelectNone = function () {
        $scope.lstCompDetails.length = 0;
    }

    $scope.AddRow = function () {
        var obj = {};
        obj.ID = 0;
        obj.PreComID = 0;
        obj.PreComplaints = '';
        obj.Day = 0;
        obj.Month = 0;
        obj.Year = 0;
        obj.OtherComplaints = "";
        obj.Onset = 0;
        obj.ModID = 0;
        obj.IsOther = true;
        obj.lstOnset = angular.copy($scope.Onset);
        obj.lstModality = angular.copy($scope.lstModality);
        obj.lstYear = angular.copy($scope.lstYear);
        obj.lstMonth = angular.copy($scope.lstMonth);
        obj.lstDay = angular.copy($scope.lstDay);
        $scope.lstOthrCompDetails.push(obj);
    }

    function fillYear() {
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Year' });
        for (var i = 1; i <= 15; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.lstYear = range;
    }
    function fillMonth() {
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Month' });
        for (var i = 1; i <= 11; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.lstMonth = range;
    }
    function fillDays() {
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Day' });
        for (var i = 1; i <= 31; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.lstDay = range;
    }

    $scope.DeleteCompDetail = function (i, idx) {
        if (i.PreComID > 0) {
            $scope.lstCompDetails.splice($scope.lstCompDetails.findIndex(function (x) { return x.PreComID == i.PreComID; }), 1);
            $scope.PresentingComplaintsList[$scope.PresentingComplaintsList.findIndex(function (x) { return x.ID == i.PreComID; })].ticked = false;
            $scope.MaleComplaints.PresentingComplaintsSelected.splice($scope.MaleComplaints.PresentingComplaintsSelected.findIndex(function (x) { return x.ID == i.PreComID; }), 1);
        }
        else {
            $scope.lstOthrCompDetails.splice(idx, 1);
        }
    }
});