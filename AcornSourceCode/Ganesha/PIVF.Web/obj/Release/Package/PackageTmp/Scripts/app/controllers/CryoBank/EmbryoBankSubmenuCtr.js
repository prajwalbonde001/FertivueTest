angular.module('PIVF').controller('EmbryoBankSubmenuCtr', function ($scope, $rootScope, $filter, CryoPreservationSrv, AlertMessage, srvCommon, Common, srvSemenFreez, PatientInfo, usSpinnerService, OocyteThowSrv) {

    $rootScope.ForPrint = 0;
    $rootScope.FormName = "Embryo Bank";
    $scope.EmbryoBankOocyte = {};
    $scope.RenewExpiryDatePatient = {};
    $scope.TodayDate = new Date();
    $scope.TodayDate.setHours(0, 0, 0, 0);
    $scope.reverseSort = false;
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.DateAfter15Days = new Date();
    $scope.DateAfter15Days = $scope.DateAfter15Days.addDays(45);
    $scope.DateAfter15Days.setHours(0, 0, 0, 0);
    $scope.RenewExpiryDatePatient.IsShowDiscard = false;
    $scope.AddSelectedPatientList = [];
    $scope.RenewExpiryDatePatient.RenewalDate = new Date();
    $scope.RenewExpiryDatePatient.ExpiryDate = new Date().addMonths(3);
    $scope.RenewExpiryDatePatient.RenewalTime = new Date();
    $scope.RenewExpiryDatePatient.ExpiryTime = new Date();
    $scope.RenewExpiryDatePatient.DiscardDate = new Date();
    $scope.RenewExpiryDatePatient.DiscardTime = new Date();
    $scope.RenewExpiryDatePatient.TransportDate = new Date();
    $scope.RenewExpiryDatePatient.TransportTime = new Date();
    $scope.IsDisableConsentTextBox = true;
    $scope.IsDisableButton = false;
    $scope.NewCryoBankOocyte = {};
    $scope.NewCryoBankOocyte.VitriDate = new Date();
    $scope.NewCryoBankOocyte.VitriTime = new Date();
    $scope.NewCryoBankOocyte.ExpiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    $scope.NewCryoBankOocyte.ExpiryTime = new Date();
    $scope.NewCryoBankOocyte.lstBankVitrification = [];
    $scope.PatientCategory = 7;
    //var ExportToExcel = false;
    //$rootScope.hideWhenQueue = true;
    $scope.Action = 'GetEmbryBankDetails';
    usSpinnerService.spin('GridSpinner');

    $scope.popup3 = {
        opened3: false
    };
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    $scope.open3 = function ($event, item) {  //for grid date event
        $event.preventDefault();
        $event.stopPropagation();
        item.opened3 = true;
    };

    $scope.MediaExpdateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120),
        minDate: new Date(),//new Date().setDate(new Date(Item.VitriDate).getDate()),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    //Check Is Single Patient 
    $rootScope.IsSinglePatient = PatientInfo.IsSinglePatient;  //Temp Code
    console.log('Embroy',$rootScope.IsSinglePatient);
    if (angular.isUndefined($rootScope.IsSinglePatient))
        $rootScope.IsSinglePatient = false;
    //if (!$rootScope.IsSinglePatient)
    //    $rootScope.hideWhenQueue = true;
    //else $rootScope.hideWhenQueue = false;

    //Added by rohini for patient details if from EMR
    if ($rootScope.IsSinglePatient == false) {
        $rootScope.CycleDetails = null;
        $rootScope.isAction = false;
        $rootScope.hideWhenQueue = true;
        $rootScope.IsFemaleActive = false;
        $rootScope.IsMaleActive = false;
        $rootScope.IsCycleActive = false;
    }


    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.dateDiscardOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.$watch('RenewExpiryDatePatient.RenewalDate', function (newValue, oldValue) {
        $scope.RenewExpiryDatePatient.ExpiryDate = new Date(newValue).addMonths(3);
    });

    $scope.ExpiryDateChange = function () {
        $scope.NewCryoBankOocyte.ExpiryDate = new Date(new Date($scope.NewCryoBankOocyte.VitriDate).setFullYear(new Date($scope.NewCryoBankOocyte.VitriDate).getFullYear() + 1));

}


    $scope.LoadData = function () {
        debugger;
        $rootScope.Allergies = '';
        $scope.ismeridian = true;
        $scope.CoupleDetails = {};
        $scope.FillTankList();
        $scope.FillCanister();
        $scope.FillGobletColor();
        $scope.FillGobletSize();
        $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
        $scope.GetUnitIDList();
        $scope.FillMaturityList();
        $scope.FillCryoLocks();
        $scope.FillMedia();
        $scope.FillDayList();
        $scope.GetEmbryologyDoctorsList();
        $scope.FillMaturityList();
        $scope.CellStageList();
        $scope.IVFGradeList();
    }
    $scope.FillMaturityList = function FillMaturityList() {
        var ResponseData = Common.getMasterList('M_OocyteMaturity', 'OocyteMaturityID', 'OocyteMaturityDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.MaturityList = Response.data;
            $scope.NewCryoBankOocyte.OocyteMaturityID = 0;

        }, function (error) {
        });
    }
    $scope.CellStageList = function CellStageList() {
        debugger;
       var ResponseData = Common.getMasterList('M_CellStage', 'CellStageID', 'CellStageDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.CellStageList = Response.data;
            $scope.NewCryoBankOocyte.CellStageID = 0;
            console.log($scope.CellStage);
        }, function (error) {
        });
        }
    $scope.IVFGradeList = function IVFGradeList() {
        debugger;
            var ResponseData = Common.getMasterList('M_IVF_Grade', 'ID', 'Description');
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: "Select" });
                $scope.IVFGradeList = Response.data;
                $scope.NewCryoBankOocyte.GradeID = 0;
                console.log($scope.IVFGradeList);
            }, function (error) {
            });
        }

    $scope.GetEmbryologyDoctorsList = function () {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //   
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data;
            if ($scope.NewCryoBankOocyte.EmbryologistID == undefined) {
                $scope.NewCryoBankOocyte.EmbryologistID = 0;
                $scope.NewCryoBankOocyte.EmbryologistID = 0;
            }
            if ($scope.NewCryoBankOocyte.Witness == undefined) {
                $scope.NewCryoBankOocyte.Witness = 0;
                $scope.NewCryoBankOocyte.Witness = 0;

            }

        }, function (error) {
        });
    };
    $scope.FillCryoLocks = function () {
        var ResponseData = Common.getMasterList('M_IVF_CryoLocks_Embrology', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListCryoLocks = Response.data;
            if ($scope.NewCryoBankOocyte.CryoLockID == undefined) {
                $scope.NewCryoBankOocyte.CryoLockID = 0;
                $scope.NewCryoBankOocyte.CryoLockID = 0;

            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FillMedia = function () {
        var ResponseData = Common.getMasterList('M_IVF_Media', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListMediaUsed = Response.data;
            if ($scope.NewCryoBankOocyte.MediaID == undefined) {
                $scope.NewCryoBankOocyte.MediaID = 0;
                $scope.NewCryoBankOocyte.MediaID = 0;

            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FillDayList = function () {
      //  var ResponseData = Common.getMasterList('M_IVF_CryoLocks_Embrology', 'ID', 'Description');
      //  ResponseData.then(function (Response) {
        debugger;
            //Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListDays = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Day0' }, { ID: 2, Description: 'Day1' }, { ID: 3, Description: 'Day2' },
                { ID: 4, Description: 'Day3' }, { ID: 5, Description: 'Day4' }, { ID: 6, Description: 'Day5' }, { ID: 7, Description: 'Day6' }]
            if ($scope.NewCryoBankOocyte.TransferDayNo  == undefined) {
                $scope.NewCryoBankOocyte.TransferDayNo  = 0;
               

            }
        
    }
    //$scope.GetEmbryologyDoctorsList = function () {
    //    var ResponseData = Common.GetEmbryologyDoctorsList();
    //    ResponseData.then(function (Response) {
    //        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
    //        $scope.DocList = Response.data;

    //    }, function (error) {
    //    });
    //};

    $scope.FillReasonList = function FillReasonList() {
        var ResponseData = Common.getMasterList('M_BankReasonMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ReasonList = Response.data;
            $scope.RenewExpiryDatePatient.ReasonID = 0;
        }, function (error) {
        });
    }

    $scope.GetUnitIDList = function GetUnitIDList() {
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Clinic" });
            $scope.UnitIDList = Response.data;
            $scope.EmbryoBankOocyte.UnitID = 0;
        }, function (error) {
        });
    }
    $scope.FillTankList = function FillTankList() {

        var ResponseData = Common.getMasterList('M_IVFTankMaster_Embrology', 'IVFTANKID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: "Tank" });
            $scope.TankList = Response.data;
            $scope.EmbryoBankOocyte.TankId = 0;
        }, function (error) {
        });
        $scope.EmbryoDetails = Response.data;
    }
    $scope.FillCanister = function () {
        var ResponseData = Common.getMasterList('M_IVFCanisterMaster_Embrology', 'IVFCANISTERID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Canister' });
            $scope.ListCanister = Response.data;
            if ($scope.EmbryoBankOocyte.CanisterID == undefined) {
                $scope.EmbryoBankOocyte.CanisterID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillGobletColor = function () {
        var ResponseData = Common.getMasterList('M_IVFGobletColor_Embrology', 'IVFGCOLORID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Goblet Color' });
            $scope.ListGobletColor = Response.data;
            if ($scope.EmbryoBankOocyte.ColorCodeID == undefined) {
                $scope.EmbryoBankOocyte.ColorCodeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillGobletSize = function () {
        var ResponseData = Common.getMasterList('M_IVFGobletSize_Embrology', 'IVFGobletSizeID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Goblet Size' });
            $scope.ListGobletSize = Response.data;
            if ($scope.EmbryoBankOocyte.GobletSizeId == undefined) {
                $scope.EmbryoBankOocyte.GobletSizeId = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillReasonList = function FillReasonList() {
        var ResponseData = Common.getMasterList('M_BankReasonMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ReasonList = Response.data;
            $scope.RenewExpiryDatePatient.ReasonID = 0;
            $scope.NewCryoBankOocyte.ReasonID = 0;
        }, function (error) {
        });
    }

    $scope.FillBankClinicList = function FillBankClinicList() {
        var ResponseData = Common.getMasterList('M_BankClinicMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.BankClinicList = Response.data;
            $scope.RenewExpiryDatePatient.TransportID = 0;
            $scope.NewCryoBankOocyte.TransportID = 0;

        }, function (error) {
        });
    }

    $scope.CheckConsentIsOther = function CheckConsentIsOther(UnitID) {
        if (UnitID == 3)
            $scope.IsDisableConsentTextBox = false;
        else
            $scope.IsDisableConsentTextBox = true;
    };

    $scope.CheckConsentButton = function CheckConsentButton(IsConsent) {
        debugger;
        $scope.IsDisableButton = IsConsent;
    };

    //Begin::Added by AniketK on 19July2019 for Embryo Bank Report
    $scope.pdf = false;
    $scope.PrintEmbryoBankSummary = function PrintEmbryoBankSummary() {
        debugger;      
        var a = encodeURIComponent('pdf=' + $scope.pdf);//('U=' + item1.UnitID); //+ '&pdf=' + $scope.MIS.PDF);
        window.open('/Reports/EmbryoBank/EmbryoBankExpiryDetails.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }
    //End::Added by AniketK on 19July2019 for Embryo Bank Report

    //Get EmbryoData default
    $scope.GetVitrificationDetailsEmbryoBank = function (PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0);    // Commented on 18thMar2021 for Victory client request :: to search near expiry embryos with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0, 0);   // Modified on 18thMar2021 for Victory client request :: to search near expiry embryos with duration
        ResponseData.then(function (Response) {
            debugger;
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                debugger;
                $scope.EmbryoDetails = Response.data;
                if ($scope.EmbryoDetails.ListVitriDetails.length > 0) {
                    debugger;
                    $scope.TotalItems = $scope.EmbryoDetails.ListVitriDetails[0].TotalRecords;
                    //$scope.TotalItems = $scope.EmbryoDetails.ListVitriDetails.length;
                    angular.forEach($scope.EmbryoDetails.ListVitriDetails, function (item) {
                        if (item.VitriDate == null || item.VitriDate == undefined)
                            item.VitriDate = new Date();
                        else
                            item.VitriDate = new Date(item.VitriDate);

                        if (item.VitriTime == null || item.VitriTime == undefined)
                            item.VitriTime = new Date();
                        else
                            item.VitriTime = new Date(item.VitriTime);

                        if (item.ExpiryDate == null || item.ExpiryDate == undefined) {
                            item.ExpiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
                        }
                        else {
                            item.ExpiryDate = new Date(item.ExpiryDate);

                        }

                        if (item.ExpiryTime == null || item.ExpiryTime == undefined)
                            item.ExpiryTime = new Date();
                        else
                            item.ExpiryTime = new Date(item.ExpiryTime);

                    });
                }
                else {
                    $scope.TotalItems = 0;
                }
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }

    $scope.IsValidPatient = function IsValidPatient(SelectedPatientList) {
        var IsValid = false;
        if (SelectedPatientList.length > 0) {
            var PatientID = SelectedPatientList[0].PatientID;
            $scope.RenewExpiryDatePatient.PatientName = SelectedPatientList[0].PatientName
            $scope.RenewExpiryDatePatient.MRNo = SelectedPatientList[0].MRNo
            var keepGoing = true;
            angular.forEach(SelectedPatientList, function (i) {
                if (keepGoing) {
                    if (PatientID === i.PatientID) {
                        IsValid = true;
                    } else {
                        IsValid = false;
                        keepGoing = false;
                    }
                }
            })
        } else {
            AlertMessage.error('FertiVue', 'Please select atleast one Embryo');
        }

        return IsValid;
    };

    //Update Expiry Date
    $scope.UpdateSemenFreezExpiryDates = function UpdateSemenFreezExpiryDates(ExpiryDate, ExpiryTime) {
        debugger;
        var UpdatedExpiryDate = new Date(ExpiryDate);
        var UpdatesExpiryTime = new Date(ExpiryTime);
        var ExpiryDate = new Date($scope.RenewExpiryDatePatient.ExpiryDate.getFullYear(), $scope.RenewExpiryDatePatient.ExpiryDate.getMonth(), $scope.RenewExpiryDatePatient.ExpiryDate.getDate(),
              $scope.RenewExpiryDatePatient.ExpiryTime.getHours(), $scope.RenewExpiryDatePatient.ExpiryTime.getMinutes(), 0);

        angular.forEach($scope.AddSelectedPatientList, function (i) {
            i.ExpiryDate = ExpiryDate;
            i.Action = 'UpdateVitrificationExpiryDate'
        });
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenFreez.UpdateSemenFreezExpiryDates($scope.AddSelectedPatientList);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data == 1) {
                debugger;
                $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                angular.element(renew).modal('hide');
                $scope.AddSelectedPatientList = [];

                //  $scope.GetSpermBankList(0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };


    //Start Redirect to Discard Window
    $scope.UpdateDiscardEmbryoBank = function UpdateDiscardEmbryoBank() {
        debugger;
        $scope.RedirectToDiscard = "#";
      
        if ($scope.AddSelectedPatientList.length > 0)
        {
            if( $scope.IsValidPatient($scope.AddSelectedPatientList)) {
                $scope.RedirectToDiscard = "#discardBank";
            }
            else{
                AlertMessage.error('FertiVue', 'Please select Same Patient Embryo');
                $scope.RedirectToDiscard = "#";
            }
        }
        
        
        else {
            AlertMessage.error('FertiVue', 'Please select atleast one Embryo');
            $scope.RedirectToDiscard = "#";
        }


    };
    //End Redirect to Discard Window

    $scope.ValidateIUI = function () {
        var IsValid = true;
        if ($scope.RenewExpiryDatePatient.ReasonID == 0) {
            AlertMessage.info('FertiVue', 'Please select all mandatory fields');
            IsValid = false;
        }
        else if ($scope.RenewExpiryDatePatient.DoneBy == 0) {
            AlertMessage.info('FertiVue', 'Please select all mandatory fields');
            IsValid = false;

        } else if ($scope.RenewExpiryDatePatient.EmbryologistID == 0) {
            AlertMessage.info('FertiVue', 'Please select all mandatory fields');
            IsValid = false;
        } else if ($scope.RenewExpiryDatePatient.WitnessID == 0) {
            AlertMessage.info('FertiVue', 'Please select all mandatory fields');
            IsValid = false;
        } else if (($scope.RenewExpiryDatePatient.WitnessID != 0 && $scope.RenewExpiryDatePatient.EmbryologistID != 0) && ($scope.RenewExpiryDatePatient.WitnessID == $scope.RenewExpiryDatePatient.EmbryologistID)) {
            AlertMessage.info('FertiVue', 'Please select different Clinician,Embryologist,Witness fields ');
            IsValid = false;
        }
        else if (($scope.RenewExpiryDatePatient.DoneBy != 0 && $scope.RenewExpiryDatePatient.EmbryologistID != 0) && ($scope.RenewExpiryDatePatient.DoneBy == $scope.RenewExpiryDatePatient.EmbryologistID)) {
            AlertMessage.info('FertiVue', 'Please select different Clinician,Embryologist,Witness fields ');
            IsValid = false;
        }
        else if (($scope.RenewExpiryDatePatient.DoneBy != 0 && $scope.RenewExpiryDatePatient.WitnessID != 0) && ($scope.RenewExpiryDatePatient.DoneBy == $scope.RenewExpiryDatePatient.WitnessID)) {
            AlertMessage.info('FertiVue', 'Please select different Clinician,Embryologist,Witness fields');
            IsValid = false;
        }
        return IsValid;
    }



    //Discard Oocyte Bank
    $scope.UpdateDiscardOocyteBank = function UpdateDiscardOocyteBank(CryoBank) {
        console.log($scope.AddSelectedPatientList)
        debugger;
        if ($scope.AddSelectedPatientList.length > 0) {

            if ($scope.ValidateIUI() && $scope.IsValidPatient($scope.AddSelectedPatientList)) {
                var DiscardDate = new Date(CryoBank.DiscardDate);
                var DiscardTime = new Date(CryoBank.DiscardTime);
                var DiscardDate = new Date(DiscardDate.getFullYear(), DiscardDate.getMonth(), DiscardDate.getDate(),
                      DiscardTime.getHours(), DiscardTime.getMinutes(), 0);
                angular.forEach($scope.AddSelectedPatientList, function (i) {
                    i.Action = 'UpdateDiscardOocyteBank',
                    i.DoneBy = CryoBank.DoneBy,
                    i.EmbryologistID = CryoBank.EmbryologistID,
                    i.WitnessID = CryoBank.WitnessID,
                    i.ReasonID = CryoBank.ReasonID,
                    i.DiscardDate = DiscardDate
                });
                usSpinnerService.spin('GridSpinner');
                var ResponseData = srvSemenFreez.UpdateSemenFreezExpiryDates($scope.AddSelectedPatientList);
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    if (Response.data == 1) {
                        AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                        $scope.Cancel();
                        $scope.AddSelectedPatientList = [];
                        $scope.LoadData();
                       
                        //  $scope.GetSpermBankList(0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                });

            } else {
                $scope.frmEmbryoBank.ddlReason.$dirty = true;
                $scope.frmEmbryoBank.ddlClinicianby.$dirty = true;
                $scope.frmEmbryoBank.ddlDoneby.$dirty = true;
                $scope.frmEmbryoBank.ddlWitnessedby.$dirty = true;
            }
        }
        else {
            AlertMessage.error('FertiVue', 'Please select atleast one Embryo');
        }
    };

    // Show  Discarded on checkbox click

    $scope.ShowDiscardChange = function (IsShowDiscard, Status) {
        debugger;
        if (Status == 'Status')
            Status = '';
        $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', IsShowDiscard, Status, $scope.Action);

    };

    $scope.RedirectToRenewDateModel = function RedirectToRenewDateModel() {
        debugger;
        //Check Valid Patient 
        $scope.Redirect = "#";
        if ($scope.AddSelectedPatientList.length > 0) {

            if ($scope.IsValidPatient($scope.AddSelectedPatientList)) {

                $scope.Redirect = "#renew";
            } else {
                if (!$scope.IsValidPatient($scope.AddSelectedPatientList))
                    AlertMessage.info('FertiVue', 'Please select Same Patient');
                else
                    AlertMessage.info('FertiVue', 'Donor not allowed, Please select Patient');

                $scope.Redirect = "#";
            }

        }
        else {
            AlertMessage.error('FertiVue', 'Please select atleast one Embryo');
        }

    };


    $scope.AddSelectedPatient = function (item,i) {
        //  $scope.SelectedItems = [];
       // console.log($scope.AddSelectedPatientList);
        debugger;
       // $scope.AddSelectedPatientList = [];
        
        //if ($scope.AddSelectedPatientList.length < 4 || item.selected == false) { // Commented on 16thMar2021 for Victory client request :: to allow selection for > 4 oocyte/embryo

            if (item.selected)
                $scope.AddSelectedPatientList.push(item);
            else {

                for (var i = $scope.AddSelectedPatientList.length - 1; i >= 0; i--) {
                    if ($scope.AddSelectedPatientList[i].VitrificationDetailID == item.VitrificationDetailID) {
                        $scope.AddSelectedPatientList.splice(i, 1);
                    }

                }
            }
        //}
        //else {    // Commented on 16thMar2021 for Victory client request :: to allow selection for > 4 oocyte/embryo
        //    item.selected = false;
        //    AlertMessage.info('FertiVue', 'Sorry you can select only 4 items');
        //}

    };

    //Begin : Added on 15thMar2021 for Victory client request :: to select all items in grid
    $scope.SelectAllChecked = false;

    $scope.SelectAllItemsCheckBox = function(event)
    {
        debugger;
        $scope.AddSelectedPatientList = [];

        if ( event.target.checked ) 
        {
            $scope.SelectAllChecked = true; //angular.element('chkSelectAll').value;
            //alert('Select All Checked');
            angular.forEach($scope.EmbryoDetails.ListVitriDetails, function (item) {
                    item.selected = true;
                    $scope.AddSelectedPatientList.push(item);
                });
        }
        else
        {
            $scope.SelectAllChecked = false;
            //alert('Select All Un-Checked');
            angular.forEach($scope.EmbryoDetails.ListVitriDetails, function (item) {

                    item.selected = false;

                    //for (var i = $scope.AddSelectedPatientList.length - 1; i >= 0; i--) 
                    //{
                    //    if ($scope.AddSelectedPatientList[i].VitrificationDetailID == item.VitrificationDetailID) 
                    //    {
                    //        $scope.AddSelectedPatientList.splice(i, 1);
                    //    }
                    //}
                });
        }
    };
    //End : Added on 15thMar2021 for Victory client request :: to select all items in grid

    //Normal Search

    $scope.NormalSearch = function (UnitID, NameCodeMRNo) {
        debugger;
        if (angular.isUndefined(NameCodeMRNo))
            NameCodeMRNo = '';
        usSpinnerService.spin('GridSpinner');
        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, 0, 0, 0, 0, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, '', $scope.Action, 0);    // Commented on 18thMar2021 for Victory client request :: to search near expiry embryos with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, 0, 0, 0, 0, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, '', $scope.Action, 0, 0);   // Modified on 18thMar2021 for Victory client request :: to search near expiry embryos with duration
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.EmbryoBankOocyte.NameCodeMRNo = "";
            if (Response.data != null) {
                $scope.EmbryoDetails = Response.data;
                if ($scope.EmbryoDetails.ListVitriDetails.length > 0) {
                    $scope.TotalItems = $scope.EmbryoDetails.ListVitriDetails.length;
                    angular.forEach($scope.EmbryoDetails.ListVitriDetails, function (item) {
                        if (item.VitriDate == null || item.VitriDate == undefined)
                            item.VitriDate = new Date();
                        else
                            item.VitriDate = new Date(item.VitriDate);

                        if (item.VitriTime == null || item.VitriTime == undefined)
                            item.VitriTime = new Date();
                        else
                            item.VitriTime = new Date(item.VitriTime);

                        if (item.ExpiryDate == null || item.ExpiryDate == undefined) {
                            item.ExpiryDate = new Date();
                        }
                        else {
                            item.ExpiryDate = new Date(item.ExpiryDate);

                        }

                        if (item.ExpiryTime == null || item.ExpiryTime == undefined)
                            item.ExpiryTime = new Date();
                        else
                            item.ExpiryTime = new Date(item.ExpiryTime);

                    });
                }
                else {
                    $scope.TotalItems = 0;
                }
            }
        }, function (error) {
            $scope.EmbryoBankOocyte.NameCodeMRNo = "";
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });

    };

    //Begin : Added on 16thMar2021 for Victory client request :: to search near expiry embryos with duration
    $scope.EmbryoBankOocyte.NearExpiryDays = 0;
    $scope.ShowNearExpiryControl = false;

    $scope.ShowNearExpiryDays = function(StatusID)
    {
        debugger;
        if ( StatusID == 'NearingExpiry' ) 
        {
            $scope.ShowNearExpiryControl = true;
            //alert('Select Near Expiry');
        }
        else
        {
            $scope.EmbryoBankOocyte.NearExpiryDays = 0;
            $scope.ShowNearExpiryControl = false;
        }
    };
    //End : Added on 16thMar2021 for Victory client request :: to search near expiry embryos with duration

    //Advance Search

    //$scope.AdvanceSearch = function (UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, StatusOption) { // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
    $scope.AdvanceSearch = function (UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, StatusOption, NearExpiryDays) {   // Modified on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        usSpinnerService.spin('GridSpinner');
        debugger;
        $scope.IsExpired = 0;
        if (StatusOption == 'Expired')
            $scope.IsExpired = 2;
        if (StatusOption == 'NearingExpiry')
            $scope.IsExpired = 1;
        if (angular.isUndefined(StatusOption) || StatusOption == 'Status' || StatusOption == 'Expired' || StatusOption == 'NearingExpiry')
            StatusOption = '';
        $scope.CurrentPage = 1;
        if (angular.isUndefined(NameCodeMRNo)) NameCodeMRNo = '';
        if (angular.isUndefined(StatusOption)) StatusOption = '';

        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, StatusOption, $scope.Action, $scope.IsExpired); // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, StatusOption, $scope.Action, $scope.IsExpired, NearExpiryDays);   // Modified on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                $scope.EmbryoDetails = Response.data;
                if ($scope.EmbryoDetails.ListVitriDetails.length > 0) {
                    $scope.TotalItems = $scope.EmbryoDetails.ListVitriDetails[0].TotalRecords;;
                    angular.forEach($scope.EmbryoDetails.ListVitriDetails, function (item) {
                        if (item.VitriDate == null || item.VitriDate == undefined)
                            item.VitriDate = new Date();
                        else
                            item.VitriDate = new Date(item.VitriDate);

                        if (item.VitriTime == null || item.VitriTime == undefined)
                            item.VitriTime = new Date();
                        else
                            item.VitriTime = new Date(item.VitriTime);

                        if (item.ExpiryDate == null || item.ExpiryDate == undefined) {
                            item.ExpiryDate = new Date();
                        }
                        else {
                            item.ExpiryDate = new Date(item.ExpiryDate);

                        }

                        if (item.ExpiryTime == null || item.ExpiryTime == undefined)
                            item.ExpiryTime = new Date();
                        else
                            item.ExpiryTime = new Date(item.ExpiryTime);


                    });
                }
                else {
                    $scope.TotalItems = 0;
                }
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });

    };

 $scope.RedirectToHistory = function RedirectToHistory(item) {
    debugger;
    $scope.item1 = item;
    usSpinnerService.spin('GridSpinner'); // Start the spinner
    CryoPreservationSrv.GetVitrificationBankHistory(
        item.UnitID,
        item.VitrivicationID,
        item.VitrificationUnitID,
        item.EmbNumber,
        item.EmbSerialNumber,
        $scope.Action
    ).then(
        function (Response) {
            usSpinnerService.stop('GridSpinner'); // Stop spinner on success
            $scope.lstOocyteHistory = Response.data; // Bind response to scope
        },
        function (error) {
            usSpinnerService.stop('GridSpinner'); // Stop spinner on error
            console.error('Error fetching history:', error);
            // Optional: Display a user-friendly error message
            AlertMessage.error('FertiVue', 'Error fetching history');
        }
    );
};



    $scope.SortData = function (column) {
        $scope.reverseSort = ($scope.SortColumn == column) ? !$scope.reverseSort : false;
        $scope.SortColumn = column;
        if ($scope.SortColumn == column)
            $scope.sortClass = $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass = '';
    }
    //Page Change

    $scope.PageChange = function PageChange() {
        debugger;
        if (angular.isUndefined($scope.EmbryoBankOocyte.NameCodeMRNo))
            $scope.EmbryoBankOocyte.NameCodeMRNo = '';
        if (angular.isUndefined($scope.EmbryoBankOocyte.StatusID) || $scope.EmbryoBankOocyte.StatusID == 'Status')
            $scope.EmbryoBankOocyte.StatusID = '';
        $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, $scope.EmbryoBankOocyte.UnitID, $scope.EmbryoBankOocyte.TankId, $scope.EmbryoBankOocyte.CanisterID, $scope.EmbryoBankOocyte.ColorCodeID, $scope.EmbryoBankOocyte.GobletSizeId, $scope.EmbryoBankOocyte.NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, $scope.EmbryoBankOocyte.StatusID, $scope.Action)
    }

    $scope.DFR = function () {
        debugger;
        if ($scope.AddSelectedPatientList.length > 0) {
            if ($scope.IsValidPatient($scope.AddSelectedPatientList)) {
                angular.forEach($scope.AddSelectedPatientList, function (i) {
                    i.Action = 'UpdateDFROocyteBank'
                });
                usSpinnerService.spin('GridSpinner');
                var ResponseData = srvSemenFreez.UpdateSemenFreezExpiryDates($scope.AddSelectedPatientList);
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    if (Response.data == 1) {
                        $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                        AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                        $scope.AddSelectedPatientList = [];
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                });
            }
        }
        else {
            AlertMessage.error('FertiVue', 'Please select atleast one Embryo');
        }
    }

    $scope.IsValidTransportUI = function () {
        debugger;

        var IsValid = true;
        if (angular.isDefined($scope.RenewExpiryDatePatient.IsConsent)) {
            if ($scope.RenewExpiryDatePatient.IsConsent && (angular.isUndefined($scope.filename)) || $scope.filename == null) {
                AlertMessage.info('FertiVue', 'Please select file');
                IsValid = false;
            }
        }
        else if ($scope.RenewExpiryDatePatient.TransportID == 0) {
            AlertMessage.info('FertiVue', 'Please select all mandatory fields');
            IsValid = false;

        } else if ($scope.RenewExpiryDatePatient.TransportID == 3 && $scope.RenewExpiryDatePatient.TransportDescription == null) {
            AlertMessage.info('FertiVue', 'Please select all mandatory fields');
            IsValid = false;
        } else if (angular.isUndefined($scope.RenewExpiryDatePatient.TransportDate)) {
            AlertMessage.info('FertiVue', 'Please select all mandatory fields');
            IsValid = false;
        }
        else if (angular.isUndefined($scope.RenewExpiryDatePatient.TransportTime)) {
            AlertMessage.info('FertiVue', 'Please select all mandatory fields');
            IsValid = false;
        }
        return IsValid;
    };

    //Save Transport functionality
    $scope.SaveTransportDetails = function SaveTransportDetails(obj, AddSelectedPatientList) {
        debugger;
        //if ($scope.Validate()) {
        obj.PatientID = AddSelectedPatientList[0].PatientID;
        obj.strReport = $scope.myImage;
        obj.FileName = $scope.filename;

        if ($scope.IsValidTransportUI()) {
            var Promise = OocyteThowSrv.SaveTransportDetails(obj);
            Promise.then(function (Response) {
                if (Response.data == 1) {
                    $scope.UpdateTransportStatus();
                }
            }, function (error) {
                debugger;
            });
        } else {

            $scope.frmEmbryoBank.TransportDate.$dirty = true;
            $scope.frmEmbryoBank.TransportTime.$dirty = true;
            $scope.frmEmbryoBank.ddlTransportedTo.$dirty = true;
            $scope.frmEmbryoBank.ddlReason.$dirty = true;
        }
    }

    //Donate Functionality By Vikrant 

    $scope.donateEmbryo = function () {
        debugger;
     
        $scope.SelectedPatient = {};
        if ($scope.AddSelectedPatientList != null && $scope.AddSelectedPatientList != undefined) {
            if ($scope.AddSelectedPatientList.length == 1) {
                $scope.RenewExpiryDatePatient.IsConsent = false;
                $scope.RenewExpiryDatePatient.Remark = '';
                $scope.RenewExpiryDatePatient.TransportID = 0;
                $scope.RenewExpiryDatePatient.TransportTime = new Date();
                $scope.RenewExpiryDatePatient.TransportDate = new Date();
                angular.element(Transport).modal('show');
            }
            else {
                AlertMessage.error('Palash IVF', 'Please Select Only One Embryo.');
            }
        }
    }

    $scope.getMatchingPatient = function ($viewValue) {
        debugger;
        var matchingStuffs = [];
        $scope.PatientList = $filter('filter')($scope.PatientList, function (d) {
            return d.GenderID === 2;
        });
        for (var i = 0; i < $scope.PatientList.length; i++) {
            if (
              $scope.PatientList[i].PatientName.toLowerCase().indexOf($viewValue.toLowerCase()) != -1 ||
              $scope.PatientList[i].MRNo.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {
                matchingStuffs.push($scope.PatientList[i]);
            }
        }
        return matchingStuffs;
    }

    $scope.onSelect = function (model) {
        if (model) {
            $scope.SelectedPatient = angular.copy(model);   //selected patient details
        }
    };

    $scope.SaveDonateEmbryo = function () {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = CryoPreservationSrv.DonateEmbryofromBank($scope.AddSelectedPatientList[0].VitrivicationID, $scope.AddSelectedPatientList[0].VitrificationUnitID, $scope.AddSelectedPatientList[0].VitrificationDetailID, $scope.AddSelectedPatientList[0].VitrificationNo, $scope.SelectedPatient.ID, $scope.SelectedPatient.UnitID);
        ResponseData.then(function (Response) {
            $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
            $scope.AddSelectedPatientList = [];
            usSpinnerService.stop('GridSpinner');
            angular.element(donate).modal('hide');
            AlertMessage.success('Palash IVF', 'Embryo Donate Successfully..');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }

    $scope.Cancel = function () {
        angular.element(renew).modal('hide');
        angular.element(discardBank).modal('hide');
        $scope.RenewExpiryDatePatient.DiscardDate = new Date();
        $scope.RenewExpiryDatePatient.DiscardTime = new Date();
        $scope.RenewExpiryDatePatient.ReasonID = 0;
        $scope.RenewExpiryDatePatient.DoneBy = 0;
        $scope.RenewExpiryDatePatient.EmbryologistID = 0;
        $scope.RenewExpiryDatePatient.WitnessID = 0;
        
    
        
    }

    //Handle file Select 
    $scope.handleFileSelect = function (evt) {
        debugger;

        //var file = evt.currentTarget.files[0];
        var file = evt.files[0];
        var extn = file.name.split(".").pop().toLowerCase();
        var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
        var validExtension = false;

        if (extensions.indexOf(extn) > -1) {
            validExtension = true;
            $scope.filename = file.name;
        }
        else $scope.myImage = '';
        var maxSize = 2097152;  // 2mb
        var valid = (file.size) <= maxSize;
        //
        if (validExtension) {
            if (valid) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            }
            else {
                AlertMessage.info('FertiVue', 'Attactment should be not greater than 2 MB.');
            }
        }
        else {
            AlertMessage.info('FertiVue', 'Attactment should be in png ,jpeg , pdf format.');
        }
    }


    $scope.UpdateTransportStatus = function () {
        debugger;
        angular.forEach($scope.AddSelectedPatientList, function (i) {
            i.Action = 'UpdateTransportStatusOocyteBank'
        });

        var ResponseData = srvSemenFreez.UpdateSemenFreezExpiryDates($scope.AddSelectedPatientList);
        ResponseData.then(function (Response) {

            if (Response.data == 1) {
                AlertMessage.success('Palash IVF', 'Embryo successfully Transported.');
                $scope.AddSelectedPatientList = [];
                $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                usSpinnerService.stop('GridSpinner');
                angular.element(Transport).modal('hide');

            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };


    //Adding Row Functionality
    $scope.AddRows = function AddRows(count) {
        debugger;
        $scope.NewCryoBankOocyte.lstBankVitrification = [];
        for (var i = 1; i <= count; i++) {
            $scope.AddNewVitrification(i);
        }
    };
    /* START : Row adding and Removing Events */
    $scope.AddNewVitrification = function AddNewVitrification(i) {
        $scope.NewCryoBankOocyte.lstBankVitrification.push({
            'OocyteMaturityID': 0,
            'TankId': 0,
            'CanisterID': 0,
            'ColorCodeID': 0,
            'GobletSizeId': 0,
            'CryoLockID': 0,
            'MediaID':0,
            'EmbryologistID': 0,
            'Witness': 0,
            'TransferDayNo': 0,
            'CellStageID': 0,
            'GradeID': 0,
            'NoOfSample': 0,
            'ExpiryDate': new Date().addMonths(3),
            'ExpiryTime': new Date().addMonths(3),
            'VitrificationDate': new Date(),
            'VitrificationTime': new Date(),
        });
    }
    $scope.isObjectEmpty = function (card) {
        return Object.keys(card).length === 0;
    }

    //Save Vitrification
    $scope.SaveVitrification = function SaveVitrification(lstBankVitrification, NewCryoBankOocyte) {
        debugger;
        if (!$scope.isObjectEmpty($scope.CoupleDetails)) {
            if ($scope.CoupleDetails.FemalePatient.FemalePatientMRNO!=null) {
                angular.forEach(lstBankVitrification, function (item) {
                    item.PatientID = $scope.CoupleDetails.FemalePatient.FemalePatientID;
                    item.PatientUnitID = $scope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                    item.CoupleId = $scope.CoupleRegNo;
                    item.VitriDate = NewCryoBankOocyte.VitriDate;
                    item.VitriTime = NewCryoBankOocyte.VitriTime;
                    item.ExpiryDate = NewCryoBankOocyte.ExpiryDate;
                    item.ExpiryTime = NewCryoBankOocyte.ExpiryTime;
                    item.IsFromOocytesBank = false;

                });
                if ($scope.ValidateInwardFlowIUI() && lstBankVitrification.length > 0) {
                    var ResponseData = CryoPreservationSrv.InsertUpdateOocytrEmbryoVitrification(lstBankVitrification);
                    ResponseData.then(function (Response) {
                        usSpinnerService.stop('GridSpinner');
                        if (Response.data == 1) {
                            AlertMessage.success("PIVF", "Save Successfully");
                            angular.element(New).modal('hide');
                            $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                            // $scope.GetVitriDetails();
                            $scope.Close();

                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error("PIVF", "Error Occured While Adding Details");
                    });
                } else {
                    if (lstBankVitrification.length > 0) {
                        $scope.frmEmbryoBank.FreezingNo.$dirty = true;
                        $scope.frmEmbryoBank.MediaExpiryDate.$dirty = true;
                        $scope.frmEmbryoBank.ddleMaturityList.$dirty = true;
                        $scope.frmEmbryoBank.ddlTankList.$dirty = true;
                        $scope.frmEmbryoBank.ddlCanisterList.$dirty = true;
                        $scope.frmEmbryoBank.ddlGobletColorList.$dirty = true;
                        $scope.frmEmbryoBank.ddlGobletSizeList.$dirty = true;
                        $scope.frmEmbryoBank.ddlCryoLocksList.$dirty = true;
                        $scope.frmEmbryoBank.ddlListMediaUsed.$dirty = true;
                        $scope.frmEmbryoBank.ddlDayList.$dirty = true;
                        $scope.frmEmbryoBank.ddlDoneby.$dirty = true;
                        $scope.frmEmbryoBank.ddlWitness.$dirty = true;
                    } else {

                        AlertMessage.info('FertiVue', 'Please select No of Samples Received');
                        //$scope.frmEmbryoBank.txtNoOfSample.$dirty = true;
                        IsValid = false;
                    }
                }
            }
            else {
                AlertMessage.info('FertiVue', 'Please select Patient');
              //  $scope.frmEmbryoBank.txtfullName.$dirty = true;
                IsValid = false;
            }
        }

        else {
            AlertMessage.info('FertiVue', 'Please select Patient');
           // $scope.frmEmbryoBank.txtfullName.$dirty = true;
            IsValid = false;
        }
    };

    //Search functionality for New Oocyte 

    $scope.onSelect = function (model) {
        debugger;

        if (model) {
            $scope.SelectedPatient = angular.copy(model);   //selected patient details
            sessionStorage.setItem("selectedPatient", JSON.stringify($scope.SelectedPatient));
        }
        else {
            $scope.SelectedPatient = JSON.parse(sessionStorage.getItem("selectedPatient"));
        }
        $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
        $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};

        Common.setSelectedPatient($scope.SelectedPatient);
        $scope.GetCoupleDetails($scope.SelectedPatient);


    };
    //Get Couple Details 
    $scope.GetCoupleDetails = function GetCoupleDetails(From) {
        debugger;
        var response = Common.GetCoupleDetails($scope.SelectedPatient);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.IsPatientNotExist = false;
                $scope.CoupleDetails.MalePatient = resp.data.MalePatient;
                $scope.CoupleDetails.FemalePatient = resp.data.FemalePatient;
                $scope.CoupleRegNo = resp.data.CoupleRegNo;
            }
        });

    }
    //END

    $scope.ValidateInwardFlowIUI = function () {

        var IsValid = true;
        if ($scope.NewCryoBankOocyte.lstBankVitrification.length > 0) {
            for (var Index = 0; Index < $scope.NewCryoBankOocyte.lstBankVitrification.length; Index++) {
                if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].OocyteMaturityID == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].TankId == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].CanisterID == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].ColorCodeID == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                //} else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].GobletSizeId == 0) {
                //    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                //    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].MediaID == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].FreezingNo == undefined || $scope.NewCryoBankOocyte.lstBankVitrification[Index].FreezingNo == "") {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].MediaExpiryDate == undefined || $scope.NewCryoBankOocyte.lstBankVitrification[Index].MediaExpiryDate == null) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                }
                else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].TransferDayNo == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                }
                else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].EmbryologistID == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].Witness == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.NoOfSample == 0) {
                    AlertMessage.info('FertiVue', 'Please select all mandatory fields');
                    IsValid = false;
                }
                else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].EmbryologistID == $scope.NewCryoBankOocyte.lstBankVitrification[Index].Witness) {
                    AlertMessage.info('FertiVue', 'Embryologist and  Witness can not be same');
                    IsValid = false;
                }
            }
        }
        return IsValid;
    }

    // Close 
    $scope.Close = function () {
        debugger;
        if (!angular.isUndefined($scope.CoupleDetails.MalePatient)) {
            $scope.CoupleDetails.MalePatient.MalePatientName = null;
            $scope.CoupleDetails.MalePatient.MaleMRNO = null;
        }
        if (!angular.isUndefined($scope.CoupleDetails.FemalePatient)) {
            $scope.CoupleDetails.FemalePatient.FemalePatientName = null;
            $scope.CoupleDetails.FemalePatient.FemalePatientMRNO = null;
        }
            //$scope.CoupleDetails.MalePatient.MalePatientName = undefined;
            //$scope.CoupleDetails.MalePatient.MaleMRNO = undefined;
            //$scope.CoupleDetails.FemalePatient.FemalePatientName = undefined;
            //$scope.CoupleDetails.FemalePatient.FemalePatientMRNO = undefined;
            $scope.NewCryoBankOocyte.NoOfSample = "";
            $scope.NewCryoBankOocyte.lstBankVitrification = [];
    }

    //END 

    $scope.CheckDuplicateFreezingNo = function CheckDuplicateFreezingNo(idx, Item) {
        debugger;
        var ResponseData = CryoPreservationSrv.CheckDuplicateFreezingNo(Item,true);
        ResponseData.then(function (Response) {
            if (Response.data == 1) {

                AlertMessage.info('FertiVue', 'Freezing No is already present');

                for (var i = 0; i <= $scope.NewCryoBankOocyte.lstBankVitrification.length - 1; i++) {
                    if (idx == i) {
                        $scope.NewCryoBankOocyte.lstBankVitrification[i].FreezingNo = "";
                    }
                }
            }
        }, function (error) {
        });
    }

});