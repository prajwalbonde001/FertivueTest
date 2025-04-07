'use strict';

angular.module('PIVF').controller('CryobankSpermCtr', function ($scope, $rootScope, PatientInfo, $location, AlertMessage, swalMessages, Common, CryobankSpermSrv, srvCommon, $filter, srvSemenFreez, SemenPrepService, srvSemenThawing, usSpinnerService) {
    //Get Current Login Patient
    $rootScope.ForPrint = 0;
    $rootScope.FormName = "Sperm Bank"
    $scope.selectedPatient = {};
    $scope.selectedPatient = Common.getSelectedPatient();
    $scope.AddSelectedPatientList = [];
    $scope.ThowingList = [];
    $scope.OocyteBank = {};
    $scope.OocyteBankList = {};
    $rootScope.Allergies = '';
    $scope.RenewExpiryDatePatient = {};
    $scope.RenewExpiryDatePatient.statusOption = 'Status';
    $scope.SemenThawDoct = {};
    $scope.TodayDate = new Date();
    $scope.TodayDate.setHours(0, 0, 0, 0);
    $scope.reverseSort = false;
    $scope.maxSize = 3;
    $scope.CurrentPage = 1;
    $scope.DateAfter15Days = new Date();
    $scope.DateAfter15Days = $scope.DateAfter15Days.addDays(15);
    $scope.DateAfter15Days.setHours(0, 0, 0, 0);
    $scope.RenewExpiryDatePatient.RenewalDate = new Date();
    $scope.RenewExpiryDatePatient.ExpiryDate = new Date().addMonths(3);
    $scope.RenewExpiryDatePatient.RenewalTime = new Date();
    $scope.RenewExpiryDatePatient.ExpiryTime = new Date();
    $scope.RenewExpiryDatePatient.IsShowDiscard = false;
    $scope.RenewExpiryDatePatient.DiscardDate = new Date();
    $scope.RenewExpiryDatePatient.DiscardTime = new Date();
   // $rootScope.hideWhenQueue = true;
    usSpinnerService.spin('GridSpinner');

    //Check Is Single Patient 
    $rootScope.IsSinglePatient = PatientInfo.IsSinglePatient;  //Temp Code
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

    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateDiscardOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptionsThaw = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(),//.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.open = function ($event, SemenThaw) {
        $event.preventDefault();
        $event.stopPropagation();
        SemenThaw.opened = true;
    };

    $scope.$watch('RenewExpiryDatePatient.RenewalDate', function (newValue, oldValue) {
        $scope.RenewExpiryDatePatient.ExpiryDate = new Date(newValue).addMonths(3);
    });

    $scope.LoadData = function () {
        $scope.ismeridian = true;
        $scope.ThawMaxTime = new Date();
        $scope.maxTime = new Date().setMonth(new Date().getMonth() + 12);

        $scope.FillTankList();
        $scope.FillCanisterList();
        $scope.GetUnitIDList();
        $scope.VialsList();
        $scope.FillCanList();
        $scope.GetEmbryologyDoctorsList();
        //Laod Sperm List Default
        $scope.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
    };

    $scope.UpdateSemenFreezExpiryDates = function UpdateSemenFreezExpiryDates(ExpiryDate, ExpiryTime, RenewExpiryDatePatient) {
        if ((ExpiryDate != undefined || ExpiryDate != null) && (ExpiryTime != undefined || ExpiryTime != null)) {
            var UpdatedExpiryDate = new Date(ExpiryDate);
            var UpdatesExpiryTime = new Date(ExpiryTime);
            var ExpiryDate = new Date($scope.RenewExpiryDatePatient.ExpiryDate.getFullYear(), $scope.RenewExpiryDatePatient.ExpiryDate.getMonth(), $scope.RenewExpiryDatePatient.ExpiryDate.getDate(),
                  UpdatesExpiryTime.getHours(), UpdatesExpiryTime.getMinutes(), 0);

            angular.forEach($scope.AddSelectedPatientList, function (i) {
                i.ExpiryDate = $filter('date')(ExpiryDate, 'medium');
                i.Action = 'UpdateExpiryDate',
                i.WitnessID = RenewExpiryDatePatient.EmbryologistID,
                i.DoneBy = RenewExpiryDatePatient.Doneby,
                i.EmbryologistID = RenewExpiryDatePatient.EmbryologistID
            });

            usSpinnerService.spin('GridSpinner');
            var ResponseData = srvSemenFreez.UpdateSemenFreezExpiryDates($scope.AddSelectedPatientList);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                if (Response.data == 1) {
                    AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                    angular.element(renew).modal('hide');
                    $scope.AddSelectedPatientList = [];
                    $scope.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }
        else {
            frmCryoBank.ExpiryTime.$dirty = true;
            frmCryoBank.RenewalDate.$dirty = true;
            frmCryoBank.RenewalTime.$dirty = true;
            frmCryoBank.ExpiryDate.$dirty = true;
        }
    }

    $scope.PACClick = function (NewART) {
        swalMessages.MessageBox('PalashIVF', "Are You Sure You Want To Check/Uncheck ?", "warning", function (isConfirmed) {
            if (isConfirmed) {
                if (NewART.IsPAC == true)
                    NewART.IsPAC = false;
                else
                    NewART.IsPAC = true;

                var Response = srvNewART.UpdatePAC(NewART.ID, NewART.UnitID, NewART.IsPAC);
                Response.then(function (resp) {
                    if (resp.data == 1) {
                        $scope.GetCycleOverview();
                    }
                });
            }
            else {
                //AlertMessage.success("Please Save Drgs Added To Set Fav List First");
            }
        });

    }
    //  ART Cycle Code End



    $scope.FillTankList = function FillTankList() {
        var ResponseData = Common.getMasterList('M_IVFTankMaster_Andrology', 'IVFTANKID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Tank" });
            $scope.TankList = Response.data;
            $scope.OocyteBank.TankId = 0;
        }, function (error) {
        });
    }
    $scope.FillReasonList = function FillReasonList() {
        var ResponseData = Common.getMasterList('M_BankReasonMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ReasonList = Response.data;
            $scope.RenewExpiryDatePatient.ReasonID = 0;
        }, function (error) {
        });
    }

    $scope.FillCanisterList = function FillCanisterList() {
        var ResponseData = Common.getMasterList('M_IVFCanisterMaster_Andrology', 'IVFCANISTERID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Canister" });
            $scope.CanisterList = Response.data;
            $scope.OocyteBank.CanisterID = 0;
        }, function (error) {
        });
    };

    $scope.GetUnitIDList = function GetUnitIDList() {
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Clinic" });
            $scope.UnitIDList = Response.data;
            $scope.OocyteBank.UnitID = 0;
        }, function (error) {
        });
    }

    $scope.VialsList = function VialsList() {
        var ResponseData = Common.getMasterList('M_IVFStrawMaster', 'IVFStrawID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Vials" });
            $scope.VialsList = Response.data;
            $scope.OocyteBank.StrawId = 0;
        }, function (error) {
        });
    }

    $scope.FillCanList = function FillCanList() {
        var ResponseData = Common.getMasterList('M_IVFCanMaster_Andrology', 'IVFCANID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Cane" });
            $scope.CanList = Response.data;
            $scope.OocyteBank.CanID = 0;
        }, function (error) {
        });
    };

    $scope.GetEmbryologyDoctorsList = function GetEmbryologyDoctorsList() {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data;
            $scope.SemenThawDoct.DoneBy = 0;
            $scope.SemenThawDoct.WitnessedBy = 0;
        }, function (error) {
        });
    };

    //Begin::Added by AniketK on 19July2019 for Embryo Bank Report
    $scope.pdf = false; 
    $scope.PrintSpermBankSummary = function PrintSpermBankSummary() {
        debugger;
        var a = encodeURIComponent('pdf=' + $scope.pdf);//('U=' + item.UnitID); //+ '&pdf=' + $scope.MIS.PDF);
        window.open('/Reports/SpermBank/SpermBankExpiryDetails.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }
    //End::Added by AniketK on 19July2019 for Embryo Bank Report

    $scope.GetSpermBankList = function (PageIndex, IsSinglePatient, TankID, UnitID, CanisterID, CanID, StrawId, NameCodeMRNo, IsShowDiscard, statusOption) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenFreez.GetSpermBankList(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, CanID, StrawId, NameCodeMRNo, IsShowDiscard, statusOption);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data.length > 0) {
                $scope.OocyteBankList = Response.data;
                $scope.TotalItems = $scope.OocyteBankList[0].TotalRecords;
                $scope.ConvertToDate($scope.OocyteBankList);
            }
            else
                $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });

    }

    $scope.ConvertToDate = function ConvertToDate(OocyteBankList) {
        angular.forEach(OocyteBankList, function (i) {
            if (i.ExpiryDate != null && i.ExpiryDate != '' && !angular.isUndefined(i.ExpiryDate)) {
                i.ExpiryDate = new Date(i.ExpiryDate);
            }


        })
    };

    $scope.AddSelectedPatient = function (item) {
        debugger;
        if ($scope.AddSelectedPatientList.length < 4 || item.selected == false) {

            if (item.selected)
                $scope.AddSelectedPatientList.push(item);
            else {

                for (var i = $scope.AddSelectedPatientList.length - 1; i >= 0; i--) {
                    if ($scope.AddSelectedPatientList[i].CryoNo == item.CryoNo) {
                        $scope.AddSelectedPatientList.splice(i, 1);
                    }

                }
            }
        }
        else {
            item.selected = false;
            AlertMessage.info('PalashIVF', 'Sorry you can select only 4 items');
        }




    };

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
            AlertMessage.error('PalashIVF', 'Please select atleast one Sperm No');
        }

        return IsValid;
    };

    $scope.IsNotDonor = function IsNotDonor(SelectedPatientList) {
        var IsValid = false;
        var keepGoing = true;
        angular.forEach(SelectedPatientList, function (i) {
            if (keepGoing) {

                if (i.DonorDode == 0 || i.DonorDode == null) {
                    IsValid = true;
                } else {
                    IsValid = false;
                    keepGoing = false;
                }
            }
        })
        return IsValid;
    };

    $scope.RedirectToRenewDateModel = function RedirectToRenewDateModel() {

        //Check Valid Patient 

        $scope.Redirect = "#";
        if ($scope.AddSelectedPatientList.length > 0) {

            if ($scope.IsValidPatient($scope.AddSelectedPatientList) && $scope.IsNotDonor($scope.AddSelectedPatientList)) {

                $scope.Redirect = "#renew";
            } else {
                if (!$scope.IsValidPatient($scope.AddSelectedPatientList))
                    AlertMessage.info('PalashIVF', 'Please select Same Patient');
                else
                    AlertMessage.info('PalashIVF', 'Donor not allowed, Please select Patient');

                $scope.Redirect = "#";
            }

        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Sperm No');
        }

    };

    $scope.ValidateIUI = function () {
        var IsValid = true;
        if ($scope.RenewExpiryDatePatient.ReasonID == 0) {
            AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
            IsValid = false;
        }
        else if ($scope.RenewExpiryDatePatient.DoneBy == 0) {
            AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
            IsValid = false;

        } else if ($scope.RenewExpiryDatePatient.EmbryologistID == 0) {
            AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
            IsValid = false;
        } else if ($scope.RenewExpiryDatePatient.WitnessID == 0) {
            AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
            IsValid = false;
        }
        else if (($scope.RenewExpiryDatePatient.WitnessID != 0 && $scope.RenewExpiryDatePatient.EmbryologistID != 0) && ($scope.RenewExpiryDatePatient.WitnessID == $scope.RenewExpiryDatePatient.EmbryologistID)) {
            AlertMessage.info('PalashIVF', 'Please select different Clinician,Embryologist,Witness fields ');
            IsValid = false;
        }
        else if (($scope.RenewExpiryDatePatient.DoneBy != 0 && $scope.RenewExpiryDatePatient.EmbryologistID != 0) && ($scope.RenewExpiryDatePatient.DoneBy == $scope.RenewExpiryDatePatient.EmbryologistID)) {
            AlertMessage.info('PalashIVF', 'Please select different Clinician,Embryologist,Witness fields ');
            IsValid = false;
        }
        else if (($scope.RenewExpiryDatePatient.DoneBy != 0 && $scope.RenewExpiryDatePatient.WitnessID != 0) && ($scope.RenewExpiryDatePatient.DoneBy == $scope.RenewExpiryDatePatient.WitnessID)) {
            AlertMessage.info('PalashIVF', 'Please select different Clinician,Embryologist,Witness fields');
            IsValid = false;
        }
        return IsValid;
    }

    $scope.UpdateDiscardFreez = function UpdateDiscardFreez(Freez) {

        if ($scope.ValidateIUI() && $scope.IsValidPatient($scope.AddSelectedPatientList)) {
            var DiscardDate = new Date(Freez.DiscardDate);
            var DiscardTime = new Date(Freez.DiscardTime);
            var DiscardDate = new Date(DiscardDate.getFullYear(), DiscardDate.getMonth(), DiscardDate.getDate(),
                  DiscardTime.getHours(), DiscardTime.getMinutes(), 0);

            angular.forEach($scope.AddSelectedPatientList, function (i) {
                i.Action = 'UpdateDiscardFreez',
                i.DoneBy = Freez.DoneBy,
                i.EmbryologistID = Freez.EmbryologistID,
                i.WitnessID = Freez.WitnessID,
                i.ReasonID = Freez.ReasonID,
                i.DiscardDate = DiscardDate

            });
            usSpinnerService.spin('GridSpinner');
            var ResponseData = srvSemenFreez.UpdateSemenFreezExpiryDates($scope.AddSelectedPatientList);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                if (Response.data == 1) {
                    AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                    $scope.AddSelectedPatientList = [];
                    $scope.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });

        }
        else {
            $scope.frmCryoBank.ddlReason.$dirty = true;
            $scope.frmCryoBank.ddlClinicianby.$dirty = true;
            $scope.frmCryoBank.ddlDoneby.$dirty = true;
            $scope.frmCryoBank.ddlWitnessedby.$dirty = true;

        }
    };

    $scope.UpdateDiscardSpermBank = function UpdateDiscardSpermBank() {
        debugger;
        $scope.RedirectToDiscard = "#";
        if ($scope.AddSelectedPatientList.length > 0) {
            $scope.RedirectToDiscard = "#discardBank";
        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Sperm No');
            $scope.RedirectToDiscard = "#";
        }


    };

    //Code to redirect Discard Model

    $scope.RedirectToDiscardDateModel = function RedirectToDiscardDateModel() {

        //Check Valid Patient 

        $scope.Redirect = "#";
        if ($scope.AddSelectedPatientList.length > 0) {

            if ($scope.IsValidPatient($scope.AddSelectedPatientList) && $scope.IsNotDonor($scope.AddSelectedPatientList)) {
                $scope.Redirect = "#discardBank";
            } else {
                if (!$scope.IsValidPatient($scope.AddSelectedPatientList))
                    AlertMessage.info('PalashIVF', 'Please select Same Patient');
                else
                    AlertMessage.info('PalashIVF', 'Donor not allowed, Please select Patient');

                $scope.Redirect = "#";
            }

        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Sperm No');
        }

    };


    $scope.NormalSearch = function (UnitID, NameCodeMRNo) {
        debugger;
        $scope.OocyteBank.TankId = 0
        $scope.OocyteBank.CanisterID = 0
        $scope.OocyteBank.CanID = 0
        $scope.OocyteBank.StrawId = 0
        $scope.OocyteBank.StatusID = 0
        if (angular.isUndefined(NameCodeMRNo))
            NameCodeMRNo = '';
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenFreez.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, 0, 0, 0, 0, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, '');
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.OocyteBankList = Response.data;
            $scope.TotalItems = $scope.OocyteBankList[0].TotalRecords;
            $scope.ConvertToDate($scope.OocyteBankList);
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };

    $scope.AdvanceSearch = function (UnitID, TankID, CanisterID, CanID, StrawId, NameCodeMRNo, StatusOption) {
        if (angular.isUndefined(NameCodeMRNo))
            NameCodeMRNo = '';
        if (angular.isUndefined(StatusOption) || StatusOption == 'Status')
            StatusOption = '';
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenFreez.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, TankID, CanisterID, CanID, StrawId, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, StatusOption);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.OocyteBankList = Response.data;
            $scope.TotalItems = $scope.OocyteBankList.length;
            $scope.ConvertToDate($scope.OocyteBankList);
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };

    //Redirect to Thaw model
    $scope.RedirectToThawModel = function RedirectToThawModel() {

        //Check Valid Patient 

        $scope.RedirectToThaw = "#";
        if ($scope.AddSelectedPatientList.length > 0) {

            if ($scope.IsValidPatient($scope.AddSelectedPatientList) && $scope.IsNotDonor($scope.AddSelectedPatientList)) {
                $scope.CryoNoList = [];
                //if Valid find All Freez items

                angular.forEach($scope.AddSelectedPatientList, function (i) {
                    $scope.CryoNoList.push(i.CryoNo)

                });

                $scope.RedirectToThawing($scope.CryoNoList.join(','), 'FreezingForSpermBank');


                $scope.RedirectToThaw = "#thaw";
            } else {
                if (!$scope.IsValidPatient($scope.AddSelectedPatientList))
                    AlertMessage.info('PalashIVF', 'Please select Same Patient');
                else
                    AlertMessage.info('PalashIVF', 'Donor not allowed, Please select Patient');

                $scope.RedirectToThaw = "#";
            }

        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Sperm No');
        }

    };

    //Get Semen Prepration List

    $scope.RedirectToThawing = function (formNo, action) {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = SemenPrepService.GetSemenThawingDetailFromSemenPrepIDForTC(formNo, action);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.lstFreezDetails = Response.data;
            $scope.AddRow();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });




    };

    $scope.ShowDiscardChange = function (IsShowDiscard, Status) {
        if (Status == 'Status')
            Status = '';
        $scope.CurrentPage = 1;
        $scope.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', IsShowDiscard, Status);
    };

    //Add elrment into thaw to save Thaw Data

    $scope.AddRow = function () {

        $scope.ThowingList = [];
        angular.forEach($scope.lstFreezDetails, function (item) {
            var thaw = {};
            thaw.FreezDetailID = item.DetailID; thaw.CryoNo = item.CryoNo; thaw.ThawingDate = new Date(); thaw.ThawingTime = new Date(); thaw.Volume = item.Volume;
            thaw.SpermConcentration = item.SpermConcentration; thaw.SpermCount = item.SpermCount; thaw.GradeA = item.GradeA; thaw.GradeB = item.GradeB;
            thaw.GradeC = item.GradeC; thaw.Motility = item.Motility; thaw.DoneBy = 0; thaw.WitnessedBy = 0; thaw.Comments = item.Comments;
            thaw.SpremFreezingDate = item.SpremFreezingDate; thaw.SpremFreezingTime = item.SpremFreezingTime;
            $scope.ThowingList.push(thaw); thaw.UnitID = item.UnitID; thaw.OriginalVolume = item.Volume; thaw.FormNo = item.FormNo;

        });
    }

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
    }

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
    }

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
    }


    $scope.SaveUpdateSemenThaw = function () {

        if ($scope.Validate()) {

            $scope.ThowingList.every(function (x) { x.ThawingTime = $filter('date')(x.ThawingTime, 'medium') });

            $scope.ThowingList.every(function (x) { x.DoneBy = $scope.SemenThawDoct.DoneBy });
            $scope.ThowingList.every(function (x) { x.WitnessedBy = $scope.SemenThawDoct.WitnessedBy });

            //Logic to get Remaining Volume
            angular.forEach($scope.ThowingList, function (item) {
                item.RemainingVolume = item.OriginalVolume - item.Volume;
            });

            usSpinnerService.spin('GridSpinner');
            var Promise = srvSemenThawing.SaveUpdate($scope.ThowingList);
            Promise.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                if (Response.data == 1) {
                    AlertMessage.info('PalashIVF', 'Record saved successfully.');
                    angular.element(thaw).modal('hide');
                    //Laod Sperm List Default
                    $scope.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, $scope.RenewExpiryDatePatient.statusOption)

                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }
        else {
            $scope.frmCryoBank.ddlDoneby.$dirty = true;
            $scope.frmCryoBank.ddlWitnessedby.$dirty = true;
        }
    }

    //Validate Semen Thaw Data

    $scope.Validate = function () {
        var IsValid = true;
        angular.forEach($scope.ThowingList, function (item) {

            if ($scope.IsFinalize) item.IsFinalized = true;
            else item.IsFinalized = false;
            item.DateInvalid = false;
            item.TimeInvalid = false;
            item.Invalid = false;


            if (angular.isUndefined(item.Volume) || item.Volume == '') {
                AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                IsValid = false;
                item.Invalid = true;
            }
            if (angular.isUndefined(item.SpermConcentration) || item.SpermConcentration == '') {
                AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                IsValid = false;
                item.Invalid = true;
            }
            if (angular.isUndefined(item.GradeA) || item.GradeA == '') {
                AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                IsValid = false;
                item.Invalid = true;
            }
            if (angular.isUndefined(item.GradeB) || item.GradeB == '') {
                AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                IsValid = false;
                item.Invalid = true;
            }
            if (angular.isUndefined(item.GradeC) || item.GradeC == '') {
                AlertMessage.info('PalashIVF', 'Fill all mandatory fields.');
                IsValid = false;
                item.Invalid = true;
            }
            if ($filter('date')(item.ThawingDate, 'shortDate') < $filter('date')(item.SpremFreezingDate, 'shortDate')) {
                AlertMessage.info('PalashIVF', 'Thawing date should be less than or equal to sprem freezing date.');
                IsValid = false;
                item.DateInvalid = true;
            }

            if ($filter('date')(item.ThawingTime, 'short') < $filter('date')(item.SpremFreezingTime, 'short')) {
                AlertMessage.info('PalashIVF', 'Thawing time should be equal to or less than sprem freezing time.');
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
        for (var i = 0; $scope.ThowingList.length - 1; i++) {
            if (x.TimeInvalid == true || (x.DateInvalid == true || x.Invalid == true || $scope.SemenThawDoct.WitnessedBy == 0 || $scope.SemenThawDoct.DoneBy == 0)) {
                IsValid = false;
                break;
            }
        }
        //  IsValid = $scope.ThowingList.some(x => x.TimeInvalid == true || (x.DateInvalid == true || x.Invalid == true || $scope.SemenThawDoct.WitnessedBy == 0 || $scope.SemenThawDoct.DoneBy == 0));
        return IsValid;
    }
    //Redirect To History Model

    $scope.RedirectToHistory = function RedirectToHistory(item) {

        var ResponseData = SemenPrepService.GetSemenThawingDetailFromSemenPrepIDForTC(item.FormNo, 'GetSpermBankHistoryBySpermNo');
        ResponseData.then(function (Response) {

            $scope.lstFreezingHistory = Response.data;
            $scope.AddRow();
        }, function (error) {
        });


    }

    $scope.SortData = function (column) {
        $scope.reverseSort = ($scope.SortColumn == column) ? !$scope.reverseSort : false;
        $scope.SortColumn = column;
        if ($scope.SortColumn == column)
            $scope.sortClass = $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass = '';
    }

    $scope.PageChange = function PageChange() {
        debugger;
        if (angular.isUndefined($scope.OocyteBank.NameCodeMRNo))
            $scope.OocyteBank.NameCodeMRNo = '';
        if (angular.isUndefined($scope.OocyteBank.StatusID) || $scope.OocyteBank.StatusID == 'Status')
            $scope.OocyteBank.StatusID = '';
        $scope.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, $scope.OocyteBank.TankId, $scope.OocyteBank.UnitID, $scope.OocyteBank.CanisterID, $scope.OocyteBank.CanID, $scope.OocyteBank.StrawId, $scope.OocyteBank.NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, $scope.OocyteBank.StatusID);
    }

    $scope.Cancel = function () {
        angular.element(renew).modal('hide');
        angular.element(discardBank).modal('hide');
        
    }

});