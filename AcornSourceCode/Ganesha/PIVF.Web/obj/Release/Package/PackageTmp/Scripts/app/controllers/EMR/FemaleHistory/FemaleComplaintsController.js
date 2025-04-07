angular.module('PIVF').controller('FemaleComplaintsController', function ($rootScope,$scope, $filter, $location, FemaleComplaintsService, Common, srvCommon, $uibModal, $window, AlertMessage,$timeout) {
     
    /*START : Global variables declarations section */
    $scope.FemaleComplaints = {};
    $scope.FemaleComplaints.PresentingComplaintsSelected = [];
    $scope.PreviousFollowUpNotesData = [];
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    $scope.maxTime = new Date();
    var date = new Date();
    $scope.FemaleComplaints.SSRDate = new Date();
    /*END : Global variables declarations section */
    $rootScope.FormName='Complaints/FU'
    /*START : Visible*/
    $scope.LeftVisible = true;
    $scope.RightVisible = true;
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
    $scope.FemaleComplaintsInitilization = function FemaleComplaintsInitilization() {
        $scope.FetchPresentingComplaints();
        $scope.fillModality();
        $scope.fillOnset();
        fillYear();
        fillMonth();
        fillDays();
        $scope.IsVisitMark();       
        $scope.PreviousFollowUpNotes();
        $scope.GetLatestLMP();
        $scope.GetUserrights();
    }
    /*END : Page setup*/

    $scope.SetAllControls = function SetAllControls() {
         
        var ResponseData = FemaleComplaintsService.SetAllControls();
        ResponseData.then(function (Response) {
            if (Response.data != null) {
              //  if ($filter('date')(Response.data.NFUpDate, 'dd-MMM-yyyy') >= $filter('date')(new Date(), 'dd-MMM-yyyy')) {   //to avoid binding on page load
                $scope.FemaleComplaints = Response.data;
                debugger;
                    if (!angular.isUndefined($scope.FemaleComplaints) && !angular.isUndefined($scope.FemaleComplaints.NFUpDate)) {
                        $scope.FemaleComplaints.NFUpDate =$scope.FemaleComplaints.NFUpDate!=null?new Date($scope.FemaleComplaints.NFUpDate):null;
                    }
                    if (!angular.isUndefined($scope.FemaleComplaints) && !angular.isUndefined($scope.FemaleComplaints.LMPDate)) {
                        $scope.FemaleComplaints.LMPDate =$scope.FemaleComplaints.LMPDate !=null? new Date($scope.FemaleComplaints.LMPDate):null;
                    }
                    if ((!angular.isUndefined($scope.PresentingComplaintsList) && $scope.PresentingComplaintsList.length != 0) && !angular.isUndefined($scope.FemaleComplaints) && !angular.isUndefined($scope.FemaleComplaints.PresentingComplaints)) {
                        angular.forEach($scope.FemaleComplaints.PresentingComplaints.split(','), function (i) {
                            // $scope.PresentingComplaintsList[$scope.PresentingComplaintsList.findIndex(x=>x.ID == i)].ticked = true;
                            for (var j = 0; j <= $scope.PresentingComplaintsList.length - 1; j++) {
                                if ($scope.PresentingComplaintsList[j].ID == i) {
                                    $scope.PresentingComplaintsList[j].ticked = true;
                                    break;
                                }
                            }
                        });
                    }

                    //$scope.lstCompDetails = $filter('filter')($scope.FemaleComplaints.lstCompDetails, function (x) { return x.PreComID>0}, true);
                    //$scope.lstOthrCompDetails = $filter('filter')($scope.FemaleComplaints.lstCompDetails, { PreComID: 0 }, true);
                    $scope.FemaleComplaints.lstCompDetails.forEach(function (x) {
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
             //   }
            }
        }, function (error) {
            $scope.Error = error;
        })
    }
    /*START : Load previous follow up Notes*/
    $scope.PreviousFollowUpNotes = function PreviousFollowUpNotes() {
        var ResponseData = FemaleComplaintsService.PreviousFollowUpNotes();
        ResponseData.then(function (Response) {
            $scope.PreviousFollowUpNotesData = Response.data;
            debugger;
            $scope.PreviousFollowUpNotesData.forEach(function (y) {
                debugger;
                y.lstPreCompDetails = []; y.lstPreOthrCompDetails = [];
                y.lstCompDetails.forEach(function (x) {
                    if (x.PreComID > 0) {
                        y.lstPreCompDetails.push(x);
                    }
                    else y.lstPreOthrCompDetails.push(x);
                })
            })
        }, function (error) {
            $scope.Error = error;
        })
    }
    $scope.GetLatestLMP = function() {
        var ResponseData = FemaleComplaintsService.GetLatestLMP();
        ResponseData.then(function (Response) {
            $scope.FemaleComplaints.LMPDate =Response.data!=null? new Date(Response.data):null;
        }, function (error) {
            $scope.Error = error;
        })
    }
    /*END : Load previous follow up Notes*/

    /*START : Bind dropdowns*/
    $scope.FetchPresentingComplaints = function FetchPresentingComplaints() {
        debugger;
        var ResponseData = Common.getMasterList('M_F_ComaplaintConfig', 'ID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            $scope.PresentingComplaintsList = Response.data;
            $timeout(function () {
                $scope.SetAllControls();
            }, 1000);
            
            //Make checkbox checked
            if ((!angular.isUndefined($scope.PresentingComplaintsList) && $scope.PresentingComplaintsList.length != 0) && !angular.isUndefined($scope.FemaleComplaints) && !angular.isUndefined($scope.FemaleComplaints.PresentingComplaints)) {
                angular.forEach($scope.FemaleComplaints.PresentingComplaints.split(','), function (i,idx) {
                    if (idx.ID == i)
                        $scope.PresentingComplaintsList[idx].ticked = true;
                  //  $scope.PresentingComplaintsList[$scope.PresentingComplaintsList.findIndex(x=>x.ID == i)].ticked = true;
                });
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    /*END : Bind dropdowns*/

    /*START : Operations */
    $scope.SaveOrUpdateFemaleComplaints = function SaveOrUpdateFemaleComplaints() {
        debugger;
        var IsSave = true;
        //if (!$scope.frmFemaleComplaints.LMPDate.$valid
        //    || !$scope.frmFemaleComplaints.FollowUpNotes.$valid
        //    || !$scope.frmFemaleComplaints.NFUpDate.$valid
        //    || !$scope.frmFemaleComplaints.Reason.$valid) {
        //    $scope.frmFemaleComplaints.LMPDate.$dirty = true;
        //    $scope.frmFemaleComplaints.FollowUpNotes.$dirty = true;
        //    $scope.frmFemaleComplaints.NFUpDate.$dirty = true;
        //    $scope.frmFemaleComplaints.Reason.$dirty = true;
        //if ($scope.FemaleComplaints.CaseSummary == undefined || $scope.FemaleComplaints.CaseSummary == null || $scope.FemaleComplaints.CaseSummary === '')
        //    $scope.FemaleComplaints.CaseSummary = '';
        //if ($scope.FemaleComplaints.FollowUpNotes == undefined || $scope.FemaleComplaints.FollowUpNotes == null || $scope.FemaleComplaints.FollowUpNotes === '')
        //    $scope.FemaleComplaints.FollowUpNotes = '';
        //if ($scope.FemaleComplaints.OtherComplaints == undefined || $scope.FemaleComplaints.OtherComplaints == null || $scope.FemaleComplaints.OtherComplaints === '')
        //    $scope.FemaleComplaints.OtherComplaints = '';
        //
        //if ($scope.FemaleComplaints.Reason == undefined || $scope.FemaleComplaints.Reason == null || $scope.FemaleComplaints.Reason === '')
        //    $scope.FemaleComplaints.Reason = '';
       
        if ($scope.FemaleComplaints.LMPDate == undefined || $scope.FemaleComplaints.LMPDate == null){
             $scope.frmFemaleComplaints.LMPDate.$dirty=true;
             AlertMessage.error('Fill mandatory fields');
              IsSave = false;
        }
        if ($scope.FemaleComplaints.NFUpDate == undefined || $scope.FemaleComplaints.NFUpDate == null){
            $scope.frmFemaleComplaints.NFUpDate.$dirty = true;
            AlertMessage.error('Fill mandatory fields');
              IsSave = false;
        }
        if ($scope.FemaleComplaints.PresentingComplaintsSelected==null || $scope.FemaleComplaints.PresentingComplaintsSelected==undefined) {
            $scope.FemaleComplaints.PresentingComplaintsSelected = [];
        }

        if ($scope.FemaleComplaints.PresentingComplaintsSelected.length == 0 ) {
            //$scope.frmMaleComplaints.FollowUpNotes.$dirty = true;
            //$scope.frmMaleComplaints.NFUpDate.$dirty = true;
            //$scope.frmMaleComplaints.Reason.$dirty = true;
           // AlertMessage.error("Atleast one data should be entered");//Commented by swatih for localization 16/7/2020
            AlertMessage.error(objResource.msgAtlistonedatashouldbeentered);//Modified by swatih for localization 16/7/2020
            IsSave = false;

        }
        else if ($scope.lstCompDetails.length > 0) {
            for (var i = 0; i < $scope.lstCompDetails.length; i++) {
                //if ($scope.lstCompDetails[i].Onset == 0)
                //{
                //    IsSave = false;
                //    AlertMessage.error("Onset is mandatory field");
                //    break;
                //}
                //else if($scope.lstCompDetails[i].ModID == 0)
                //{
                //    IsSave = false;
                //    AlertMessage.error("Modality is mandatory field");
                //    break;
                //}
                //else
                    //if ($scope.lstCompDetails[i].Day == 0 && $scope.lstCompDetails[i].Month == 0 &&
                    //$scope.lstCompDetails[i].Year == 0){
                    //IsSave = false;
                    //AlertMessage.error("Duration is mandatory field");
                    //break;
                    //}
                //|| $scope.lstCompDetails[i].Day == 0 || $scope.lstCompDetails[i].Month == 0 ||
                //    $scope.lstCompDetails[i].Year == 0 || $scope.lstCompDetails[i].ModID == 0) {
                //    IsSave = false;
                //    AlertMessage.error("Onset, Duration, Modality are mandatory field");
                //    break;
                //}

                //if ($scope.lstCompDetails[i].PreComplaints == $scope.lstCompDetails[i].PreComplaints)
                //    {
                //        IsSave = false;
                //        AlertMessage.error("Complaints is diff field");
                       
                //    }
            }
        }

        if (IsSave) {
            $scope.FemaleComplaints.NFUpDate = $filter('date')($scope.FemaleComplaints.NFUpDate, 'medium');
            $scope.FemaleComplaints.LMPDate = $filter('date')($scope.FemaleComplaints.LMPDate, 'medium');
            $scope.FemaleComplaints.lstCompDetails = [];
            debugger;
            $scope.FemaleComplaints.lstCompDetails = $scope.lstCompDetails.concat($scope.lstOthrCompDetails);
            var ResponseData = FemaleComplaintsService.SaveOrUpdateFemaleComplaints($scope.FemaleComplaints);
            ResponseData.then(function (Response) {
                  
                if (Response.data > 0 && Response.data == 1) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                }
                if (Response.data > 0 && Response.data == 2) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                }
                $scope.lstCompDetails.length = 0;
                $scope.lstOthrCompDetails.length = 0;
                $scope.FemaleComplaintsInitilization();
                //$location.path("/EMRLandingPage");
            }, function (error) {
                $scope.Error = error;
            });
        }
    }
    /*END : Operations */

    /* START : Swith to page*/
    $scope.GotoMaleComplaints = function GotoMaleComplaints() {
        debugger;
      //  if (selectPatient.PatientCategoryID == 7) {
         if (selectPatient.GenderID == 2) {
                selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                selectPatient.Gender = 'Male';
                selectPatient.PatientName = $rootScope.CoupleDetails.MalePatient.MalePatientName;
                if ($rootScope.CoupleDetails.MalePatient.Selectedvisit != null) {
                    selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                    selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                }
                else {
                    selectPatient.VisitID = null;
                    selectPatient.VisitUnitID = null;
                }
                //selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID
               // selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID
                selectPatient.PatientCategoryID = 7;
                Common.setSelectedPatient(selectPatient);
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                    $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                    $rootScope.IsMaleActive = true;
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
                    //if ($rootScope.CoupleDetails.MalePatient.AllergiesOthers != "" && $rootScope.CoupleDetails.MalePatient.AllergiesOthers != null) {
                    //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesOthers;
                    //}

                })
                $rootScope.FormName = 'Male Complaints/Follow Up'
                //if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                //    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                //}
                $location.path('/MaleComplaints/');
            }
        //}
    }

    $scope.FemaleComplaintCancel = function FemaleComplaintCancel() {
        $location.path("/EMRLandingPage");
    }

    $scope.IsVisitMark = function () {
        
        // if (selectPatient.GenderID == 2) {
        //    if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
        //        angular.element(btnSaveComplaint).prop('disabled', true);
        //        $scope.NevigateVisitPopUP(selectPatient);
        //    }
        //    else {
        //        angular.element(btnSaveComplaint).prop('disabled', false);
        //    }
        //}     
        //added by rohini
        if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;
    }

    $scope.NevigateVisitPopUP = function (Patient, Redirectto) {
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
                                //for female
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        angular.element(btnSaveComplaint).prop('disabled', false);
                                        //$location.path(Redirectto);
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
                                        //$location.path(Redirectto);
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
                            //for female
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                            response.then(function (resp) {
                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
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
                if (lstUserRights[z].MenuId == 301 && lstUserRights[z].Active)//Male Complaints 
                {
                    $scope.objRgtCom = lstUserRights[z];
                    break;
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 301 && lstUserRights[z].Active)//Female Complaints 
                {
                    $scope.objRgtCom = lstUserRights[z];
                    break;
                }
            }
        }
        if (!$scope.objRgtCom.IsCreate) {
            angular.element(btnSaveComplaint).prop('disabled', true);
            
        }
          else  {
            angular.element(btnSaveComplaint).prop('disabled', false);

          }
    }

    // By Umesh for complaint details
    $scope.fillModality = function () {
        var ResponseData = Common.getMasterList('M_Modality', 'ID', 'Description');
        ResponseData.then(function (Response) {
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
            obj.Onset =0;
            obj.ModID = 0;
            obj.IsOther = false;
            obj.lstOnset = angular.copy($scope.lstOnset);
            obj.lstModality = angular.copy($scope.lstModality);
            obj.lstYear = angular.copy($scope.lstYear);
            obj.lstMonth = angular.copy($scope.lstMonth);
            obj.lstDay = angular.copy($scope.lstDay);
            $scope.lstCompDetails.push(obj);
        }
        else $scope.lstCompDetails.splice($scope.lstCompDetails.findIndex(function (x) { return x.PreComID == data.ID; }), 1);                  //  { return x.ID==data.ID;}      commented and modified by Nayan Kamble on 04/12/2019
    }

    $scope.fSelectAll = function () {
        $scope.PresentingComplaintsList.forEach(function (x) {
            $scope.fClick(x);
        })
    }
    $scope.fSelectNone = function () {
        $scope.lstCompDetails.length = 0;
    }
    $scope.fReset =function()
    {
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
                obj.lstOnset = angular.copy($scope.lstOnset);
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
        for (var i = 0; i <= 15; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.lstYear = range;
    }
    function fillMonth() {
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Month' });
        for (var i = 0; i <= 11; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.lstMonth = range;
    }
    function fillDays() {
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Day' });
        for (var i = 0; i <= 31; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.lstDay = range;
    }

    $scope.DeleteCompDetail = function (i, idx) {
        if (i.PreComID > 0) {
            $scope.lstCompDetails.splice($scope.lstCompDetails.findIndex(function (x) { return x.PreComID == i.PreComID; }), 1);
            $scope.PresentingComplaintsList[$scope.PresentingComplaintsList.findIndex(function (x) { return x.ID == i.PreComID; })].ticked = false;
            $scope.FemaleComplaints.PresentingComplaintsSelected.splice($scope.FemaleComplaints.PresentingComplaintsSelected.findIndex(function (x) { return x.ID == i.PreComID; }), 1);
        }
        else {
            $scope.lstOthrCompDetails.splice(idx, 1);
        }
    }

});