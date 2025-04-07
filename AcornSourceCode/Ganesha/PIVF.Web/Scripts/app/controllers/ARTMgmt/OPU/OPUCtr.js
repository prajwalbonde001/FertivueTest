'use strict';
angular.module('PIVF').controller('OPUCtr', function ($rootScope, $scope, OPUSrv, $location, AlertMessage, srvCommon, Common, swalMessages, $filter,
    PageConfig, $timeout, usSpinnerService, $uibModal) {
    $scope.maxSize = 5;
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.CurrentPage = 1;
    $scope.btnSaveDisabled = false;
    $scope.Message = '';
    var objResource = {};
    $scope.OPU = {};
    $rootScope.FormName = 'Ovum Pick Up';
    $rootScope.OrderList = 1;
    $rootScope.ForConsent = 0;
    $scope.CoupleDetails = {};
    var SelCouple = Common.getSelectedCouple();
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }// for globalization
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();

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

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    //$scope.dateOptionsDOB = {
    //    //  dateDisabled: disabled,
    //    formatYear: 'yyyy',
    //   // maxDate: new Date(), //new Date(2016, 8, 01),
    //    minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
    //    startingDay: 1,
    //    showWeeks: false
    //};  //for configure date-picker
    //$scope.dateOptionsStartDate= {       
    //    formatYear: 'yyyy',
    //   // maxDate: new Date(), //new Date(2016, 8, 01),
    //    minDate: $scope.minDate,//new Date(),
    //    startingDay: 1,
    //    showWeeks: false
    //}; 
    // Date pickr End
    $scope.CycleCancel = function () {
        if (!$scope.OPU.IsCycleCancel) {
            debugger;
        $scope.OPU.CancelReasonID = $scope.CancelReasonList[0].ID;
        $scope.OPU.Reason = "";
       // $scope.OPU.IsCycleCancel = true;
        }
        debugger;
        
    }
    $scope.init = function () {
        $scope.OPU.NeedlesUsed = $scope.i[0];
    };
    $scope.LoadData = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if ($rootScope.CoupleDetails.FemalePatient != undefined && $rootScope.CoupleDetails.FemalePatient != null) {
            debugger;

            $scope.CoupleDetails = $rootScope.CoupleDetails;
            if ($rootScope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                $scope.btnSaveDisabled = true;
            }
            if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
                $scope.btnSaveDisabled = true;
            }

            //if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == true) {

            //       var ResponseData = StimulationChartService.GetStimulationChartSizeDetails();
            //        ResponseData.then(function (Response) {
            //            debugger;
            //            $scope.FollicularSizeDeatilsList = Response.data;
                       
            //        }, function (error) {
            //            usSpinnerService.stop('GridSpinner');
            //            $scope.Error = error;
            //        })
                
            //}

            debugger;

            
        }


       
        $scope.FillNeedleTypeList();
        $scope.FillNeedleSubTypeList();
        $scope.GetDocList();
        $scope.FillAnesthetiaTypeList();
        $scope.FillCancelReason();
        $scope.FillLevelOfDifficultyList();
        $scope.ismeridian = true;
        //$scope.maxTime = new Date();
        $scope.OPU.StartTime = new Date();//.setHours(0, 0, 0, 0);
        $scope.OPU.EndTime = new Date();//new Date().setHours(0, 0, 0, 0);
        //  $scope.IsVisitMark();
        $scope.GetMedicalHistory();
        $scope.GetTriggerData();
        $scope.GetPacFlag();

       //  $scope.IsStimulationFinalize();

        debugger;
        //var datetime = new Date($scope.OPU.TriggerDate + ' ' + $scope.OPU.TriggerTime);
        //datetime.setHours(datetime + 36);
        //$scope.OPU.TriggerDate = datetime;

       
    }



    $scope.GetPacFlag = function ()
    {
    debugger;
        var Responce = Common.getLinkConfiguartions();
        Responce.then(function (responce) {
            // $scope.LinkConfig = responce.data;
            if (responce.data.PACFlagSet === "true") {
                $scope.PACFlagSet = true;
            }
            else
                $scope.PACFlagSet = false;   //Added by Nayan Kamble on 19/10/2019
            //console.log('Links Config', $scope.LinkConfig);
        }, function (err) {
        })
    }


    $scope.IsVisitMark = function () {

        if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
            $scope.btnSaveDisabled = true;
            $scope.Message = 'Mark visit to save OPU.';
            $scope.NevigateVisitPopUP();
        }
    }

    $scope.FillCancelReason = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_OPUCancelReason', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.CancelReasonList = Response.data;
            $scope.OPU.CancelReasonID = $scope.CancelReasonList[0].ID;
            debugger;
            //$scope.OPU.CancelReasonID = 0;
        }, function (error) {
        });
    }

    $scope.FillNeedleTypeList = function () {
        var ResponseData = Common.getMasterList('M_NeedleType', 'NeedleTypeID', 'NeedleDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.NeedleTypeList = Response.data;
            $scope.OPU.TypeOfNeedleID = 0;
        }, function (error) {
        });
    }

    $scope.FillNeedleSubTypeList = function () {
        var ResponseData = Common.getMasterList('M_NeedleSubType', 'IVFSRCNID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.NeedleSubTypeList = Response.data;
            $scope.OPU.NeedleSubTypeID = 0;
        }, function (error) {
        });
    }

    $scope.GetDocList = function GetDocList() {
        var responseData = Common.GetEmbryologyDoctorsList();
        responseData.then(function (Response) {
            Response.data.Clinician.splice(0, 0, { ID: 0, Description: 'Select' })
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: 'Select' })
            $scope.ClinicistList = Response.data.Clinician;
            $scope.EmbryologistAndrologist=Response.data.EmbryologistAndrologist;
            //$scope.AnesthetistList = Response.data;
            //$scope.EmbryologistList = Response.data;
            //$scope.WitnessEmbryologistList = Response.data;
            $scope.OPU.ClinicianID = 0;
            $scope.OPU.EmbryologistID = 0;
            $scope.OPU.WitEmbryologistID = 0;
            $scope.OPU.AnesthetistID = 0;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.FillAnesthetiaTypeList = function () {
        var ResponseData = Common.getMasterList('M_Anesthesia', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AnesthetiaTypeList = Response.data;
            $scope.OPU.AnesthetiaTypeID = 0;
            $timeout(function () {
                $scope.GetOPUData();
            }, 1000);
        }, function (error) {
        });
    }

    $scope.FillLevelOfDifficultyList = function () {
        var ResponseData = Common.getMasterList('M_LevelOfDifficulty_OPU', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DifficultyLevelList = Response.data;
            $scope.OPU.LevelOfDifficultyID = 0;
        }, function (error) {
        });
    }

    $scope.SaveUpdateOPU = function (OPU) {
        debugger;
        if ($scope.ValidateForm()) {

            //var msg = '';
            //var diff = parseFloat((OPU.StartTime - OPU.TriggerTime) / (1000 * 60 * 60));
            //var islessthan34hrs = diff < 34;
            //var isgrtrthan36hrs = diff > 36;
            //if (islessthan34hrs) msg = 'The difference between Trigger time and OPU start time is less than 34 hrs,Do you want to continue?';
            //if (isgrtrthan36hrs) msg = 'The difference between Trigger time and OPU start time is greater than 36 hrs,Do you want to continue?';
            //if (islessthan34hrs || isgrtrthan36hrs) {
            //    swalMessages.MessageBox(objResource.msgTitle, msg, "warning", function (isConfirmed) {
            //        if (isConfirmed) {
            //            $scope.FinalSaveUpdateOPU(OPU);
            //        } 
            //    });
            //}
            //else {
            if ($scope.OPU.IsCycleCancel && $scope.OPU.CancelReasonID == 0) {
                AlertMessage.warning(objResource.msgTitle, 'Cancel reason is not selected.');
            }

            if ($scope.OPU.IsCycleCancel && $scope.OPU.CloseCycleCancellation == undefined) {
                AlertMessage.warning(objResource.msgTitle, ' Close and cancel checkbox is not selected.');
            } //Added by sujata 

                //Added by Nayan Kamble on 24/06/2019     End
            else {
                $scope.FinalSaveUpdateOPU(OPU);
            }
            //Added by Nayan Kamble on 24/06/2019  START

            if ($scope.OPU.IsFinalize) {
                if ($scope.OPU.IsCycleCancel == true && $scope.OPU.CloseCycleCancellation == true) {
                    $rootScope.CoupleDetails.FemalePatient.IsCancelCycle = $scope.OPU.IsCycleCancel;
                    $rootScope.CoupleDetails.FemalePatient.IsCloseCycle = $scope.OPU.CloseCycleCancellation;
                }
            }  
            //}
        }
        else {
            $scope.frmOPU.ddlClinician.$dirty = true;;
            $scope.frmOPU.ddlEmbList.$dirty = true;;
            $scope.frmOPU.ddlAnesthetistList.$dirty = true;
            $scope.frmOPU.ddlAnesthetiaTypeList.$dirty = true;


            //$scope.frmOPU.dtStartDate.$dirty = true;
        }
    }

    $scope.FinalSaveUpdateOPU = function (OPU) {
        OPU.StartDate = $filter('date')(OPU.StartDate, 'medium');
        OPU.StartTime = $filter('date')(OPU.StartTime, 'medium');
        //OPU.EndDate = $filter('date')(OPU.EndDate, 'medium');
        OPU.EndTime = $filter('date')(OPU.EndTime, 'medium');
        OPU.TriggerDate = $filter('date')(OPU.TriggerDate, 'medium');
        OPU.TriggerTime = $filter('date')(OPU.TriggerTime, 'medium');
        debugger;
        console.log("hete ", OPU.NeedlesUsed);
        var Promise = OPUSrv.SaveUpdateOPU(OPU);
        Promise.then(function (resp) {
            debugger;
            if (resp.data == 1) {
                AlertMessage.success(objResource.msgTitle, 'Record saved successfully.');
                $scope.GetOPUData();
            }
            else if (resp.data == 2) {
                $scope.GetOPUData();
                AlertMessage.success(objResource.msgTitle, 'Record updated successfully.');
            }
        }, function (error) {
        });
    }

    $scope.ValidateForm = function () {
        debugger;
        $scope.OPU.TriggerTime = $scope.OPU.EndTime;
        var IsValid = true;
        if ($scope.OPU.CloseCycleCancellation && !$scope.OPU.IsCycleCancel) {
            AlertMessage.warning(objResource.msgTitle, "Please Cancel Cycle First ");
            return false;
        }
        if ($scope.OPU.IsCycleCancel) {
            return true;
        }
        if (angular.isUndefined($scope.OPU.StartDate) || $scope.OPU.StartDate == '') {
            AlertMessage.info(objResource.msgTitle, 'Fill all mandatory fields.');
            IsValid = false;
        }
            //else if (new Date($filter('date')($scope.OPU.StartDate, 'shortDate')) > new Date($filter('date')($scope.OPU.EndDate, 'shortDate'))) {
            //    AlertMessage.info(objResource.msgTitle, 'OPU end date should be greater than or equal to OPU start Date.');
            //    IsValid = false;
            //}
        else if (angular.isUndefined($scope.OPU.StartTime) || $scope.OPU.StartTime == '') {
            AlertMessage.info(objResource.msgTitle, 'Fill all mandatory fields.');
            IsValid = false;
        }
        else if (new Date($scope.OPU.StartTime) > new Date($scope.OPU.EndTime)) {
            AlertMessage.info(objResource.msgTitle, 'OPU End time should be equal to or greater than OPU Start time.');
            IsValid = false;
        }
        //added by mayur

        function areEqual() {
            var len = arguments.length;
            for (var i = 1; i < len; i++) {
                if (arguments[i] === null || arguments[i] !== arguments[i - 1])
                    return false;
            }
            return true;
        }
        if ($scope.OPU.ClinicianID == 0) {
            AlertMessage.info(objResource.msgTitle, 'Please Select Clinician');
            IsValid = false;
        }
        else if ($scope.OPU.EmbryologistID == 0) {
            AlertMessage.info(objResource.msgTitle, 'Please Select Embryologist');
            IsValid = false;
        }
        else if ($scope.OPU.AnesthetistID == 0) {
            AlertMessage.info(objResource.msgTitle, 'Please Select Anesthetist');
            IsValid = false;
        }

        else if (areEqual($scope.OPU.ClinicianID, $scope.OPU.EmbryologistID, $scope.OPU.WitEmbryologistID, $scope.OPU.AnesthetistID)) {
            AlertMessage.info(objResource.msgTitle, 'Clinician,Embryologist,Witness Embryologist,Anesthetist Canot be same...');
            IsValid = false;
        }
        else if (areEqual($scope.OPU.ClinicianID, $scope.OPU.EmbryologistID, $scope.OPU.WitEmbryologistID)) {
            AlertMessage.info(objResource.msgTitle, 'Clinician,Embryologist,Witness Embryologist Canot be same...');
            IsValid = false;
        }
        else if (areEqual($scope.OPU.ClinicianID, $scope.OPU.EmbryologistID, $scope.OPU.AnesthetistID)) {
            AlertMessage.info(objResource.msgTitle, 'Clinician,Embryologist,Anesthetist Canot be same...');
            IsValid = false;
        }
        else if (areEqual($scope.OPU.ClinicianID, $scope.OPU.WitEmbryologistID, $scope.OPU.AnesthetistID)) {
            AlertMessage.info(objResource.msgTitle, 'Clinician, Witness Embryologist,Anesthetist Canot be same...');
            IsValid = false;
        }
        else if (areEqual($scope.OPU.EmbryologistID, $scope.OPU.WitEmbryologistID, $scope.OPU.AnesthetistID)) {
            AlertMessage.info(objResource.msgTitle, 'Embryologist,Anesthetist,Witness Embryologist Canot be same...');
            IsValid = false;
        }
     
      else if (areEqual($scope.OPU.ClinicianID, $scope.OPU.EmbryologistID)) {
            AlertMessage.info(objResource.msgTitle, 'Clinician,Embryologist Canot be same...');
            IsValid = false;
      }
      else if (areEqual($scope.OPU.ClinicianID, $scope.OPU.AnesthetistID)) {
          AlertMessage.info(objResource.msgTitle, 'Clinician,Anesthetist Canot be same...');
          IsValid = false;
      }
      else  if (areEqual( $scope.OPU.EmbryologistID, $scope.OPU.WitEmbryologistID)) {
          AlertMessage.info(objResource.msgTitle, 'Embryologist,Witness Embryologist Canot be same...');
            IsValid = false;
      }
      else if (areEqual($scope.OPU.EmbryologistID, $scope.OPU.AnesthetistID)) {
          AlertMessage.info(objResource.msgTitle, 'Embryologist,Anesthetist Canot be same...');
          IsValid = false;
      }
      else if (areEqual($scope.OPU.ClinicianID, $scope.OPU.WitEmbryologistID)) {
          AlertMessage.info(objResource.msgTitle, 'Clinician,Witness Embryologist Canot be same...');
          IsValid = false;
      }

      else if (areEqual($scope.OPU.AnesthetistID, $scope.OPU.WitEmbryologistID)) {
          AlertMessage.info(objResource.msgTitle, 'Anesthetist,Witness Embryologist Canot be same...');
          IsValid = false;
      }
    
        /////////////////
     
        return IsValid;
    }

    $scope.Cancel = function (path) {
        $location.path('/CycleOverview/');
    }

    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }

    $scope.GetMedicalHistory = function () {
        var Promise = OPUSrv.GetMedicalHistory();
        Promise.then(function (resp) {
            if (resp.data != null) {
                if (resp.data.IsDiabetes)
                    $scope.MedicalHistory = 'Diabetes, ';
                if (resp.data.IsCardiacDisease)
                    $scope.MedicalHistory = $scope.MedicalHistory + 'Cardiac Disease, ';
                if (resp.data.IsHypertension)
                    $scope.MedicalHistory = $scope.MedicalHistory + 'Hypertension, ';
                if (resp.data.IsThyroidDisorder)
                    $scope.MedicalHistory = $scope.MedicalHistory + 'Thyroid Disorder, ';
                if (resp.data.IsTuberculosis)
                    $scope.MedicalHistory = $scope.MedicalHistory + 'Tuberculosis, ';
                if (resp.data.IsPelvicInfection)
                    $scope.MedicalHistory = $scope.MedicalHistory + 'Pelvic Infection, ';
                if (resp.data.IsBleedingDisorders)
                    $scope.MedicalHistory = $scope.MedicalHistory + 'Bleeding Disorders, ';
                if (resp.data.IsMalignancy)
                    $scope.MedicalHistory = $scope.MedicalHistory + 'Malignancy, ';
                if (resp.data.IsOther)
                    $scope.MedicalHistory = $scope.MedicalHistory + 'Others';
                if ($scope.MedicalHistory == null) $scope.MedicalHistory = '';
                if ($scope.MedicalHistory.trim().slice(-1) == ',')
                    $scope.MedicalHistory = $scope.MedicalHistory.trim().slice(0, -1);
            }
        }, function (error) {
        });
    }

    $scope.GetTriggerData = function () {
        var Promise = OPUSrv.GetTriggerData();
        Promise.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $scope.OPU.TriggerDate = resp.data.TriggerDate;
                $scope.OPU.TriggerTime = resp.data.TriggerTime;
                $scope.Dose = resp.data.Dose;
                $scope.CycleWarning = resp.data.CycleWarning;
                $scope.OPU.OptimumFolicleLeftOvry = resp.data.LeftFollicles;
                $scope.OPU.OptimumFolicleRightOvry = resp.data.RightFollicles;
                if (resp.data.OPUDate == null)
                    $scope.minDate = new Date(resp.data.LMP);
                else {
                    $scope.minDate = new Date(resp.data.OPUDate);
                    $scope.OPU.StartDate = new Date(resp.data.OPUDate);
                }

                if ($scope.OPU.TriggerDate != null && $scope.OPU.TriggerTime != null) {
                    debugger;
                    var TDate = new Date($scope.OPU.TriggerDate);
                    var TTime = new Date($scope.OPU.TriggerTime);

                    var OPUDate = new Date(TDate.getFullYear(), TDate.getMonth(), TDate.getDate(), TTime.getHours(), TTime.getMinutes(), 0, 0);

                    var hours = 36 * 60 * 60 * 1000; //Since 1hr = 60 mins, 1 min = 60 seconds, 1 second= 1000 milliseconds
                    //var startdate = new Date(schedule_entry.startjob_datetime);            
              
                    var CalculatedOpuDate = new Date(OPUDate).getTime() + hours;
                    $scope.OPU.StartDate = CalculatedOpuDate;
                    $scope.OPU.StartTime = CalculatedOpuDate;
                    debugger;
                }

                $scope.dateOptionsStartDate = {
                    //  dateDisabled: disabled,
                    formatYear: 'yyyy',
                    maxDate: new Date(), //new Date(2016, 8, 01),
                    minDate: $scope.minDate,//new Date(),
                    startingDay: 1,
                    showWeeks: false
                };  //for configure date-picker
                $scope.dateOptionsDOB = {
                    //  dateDisabled: disabled,
                    formatYear: 'yyyy',
                    // maxDate: new Date(), //new Date(2016, 8, 01),
                    minDate: $scope.minDate,//new Date().setYear(new Date().getYear() - 100),//new Date(),
                    startingDay: 1,
                    showWeeks: false
                };
            }
        }, function (error) {
        });
    }

    $scope.GetOPUData = function () {
        debugger;
        var Promise = OPUSrv.GetOPUData();
        Promise.then(function (resp) {
            if (resp.data != null) {
                debugger;
                var OriginalTriggerTime= new Date($scope.OPU.TriggerTime);
                $scope.OPU = resp.data;
                $scope.OPU.TriggerTime = OriginalTriggerTime;
                $scope.OPU.StartDate = new Date($scope.OPU.StartDate);
                $scope.OPU.StartTime = new Date($scope.OPU.StartTime);
                //$scope.OPU.EndDate = $scope.OPU.EndDate != null ? new Date($scope.OPU.EndDate) : null;
                $scope.OPU.EndTime = new Date($scope.OPU.EndTime);
                if (resp.data.IsFinalize)
                    $scope.btnSaveDisabled = true;
                usSpinnerService.stop('GridSpinner');
                debugger;
            }
            else {
                $scope.IsOPUFinalize();
                //$scope.IsStimulationFinalize();               
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
        usSpinnerService.stop('GridSpinner');
    }

    $scope.IsStimulationFinalize = function () {
        var Promise = OPUSrv.IsStimulationFinalize();
        Promise.then(function (resp) {
            debugger;
            if (!resp.data) {
                $scope.btnSaveDisabled = true;
                $scope.Message = 'Finalize stimulation to save OPU.';
            }            
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    $scope.IsOPUFinalize = function () {
        debugger;
        var Promise = OPUSrv.IsOPUFinalize();
        Promise.then(function (resp) {
            debugger;
            $scope.GetPacFlag();
            if ($scope.PACFlagSet == true) {
                if (!resp.data) {
                    $scope.btnSaveDisabled = true;
                    $scope.Message = 'PAC is not done.';
                }

                else {
                    $scope.IsStimulationFinalize();
                }
            }
            else
            {
                $scope.PACFlagSet = true;
                if ($rootScope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                    $scope.btnSaveDisabled = true;

                }
            
                //if ($rootScope.CoupleDetails.FemalePatient.IsCloseCycle == true) {
                //    $scope.btnSaveDisabled = true;
                        
                //}
                
                
                //else {
                //    $scope.btnSaveDisabled = false;
                //}
                ////$scope.Message = 'PAC is not done.';   commented by Nayan Kamble on 19/10/2019
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    $scope.NevigateVisitPopUP = function () {
        //    if (!angular.equals({}, Patient)) {
        var response = Common.GetActiveVisitByPatient($rootScope.CoupleDetails.FemalePatient.FemalePatientID, $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID); //Get Visit list For selected patient
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
                                    //  $location.path(Redirectto);
                                    $scope.btnSaveDisabled = false;
                                    $scope.Message = null;
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
                                    //  $location.path(Redirectto);
                                    $scope.btnSaveDisabled = false;
                                    $scope.Message = null;
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
                                //   $location.path(Redirectto);
                                $scope.btnSaveDisabled = false;
                                $scope.Message = null;
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
                                //  $location.path(Redirectto);
                                $scope.btnSaveDisabled = false;
                                $scope.Message = null;
                            }
                        });
                    }
                }
            }
            else {
                //alert("There is no active visit");
                //  $location.path(Redirectto);
            }
        });
        //   }

    }
    $scope.ChangeTimeAsDate = function (Value) {
        if (Value == 1)
            $scope.OPU.StartTime = $scope.OPU.StartDate;
        if (Value == 2)
            $scope.OPU.EndTime = $scope.OPU.EndDate;
    };

    $scope.PrintOPU = function (Item, Action) {
        var a = encodeURIComponent('P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&Th=' + SelCouple.FemalePatient.TherapyID + '&THU=' + SelCouple.FemalePatient.TherapyUnitID);
        window.open('/Reports/ART/OPUSummaryWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }
})