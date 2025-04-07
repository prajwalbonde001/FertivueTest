angular.module('PIVF').controller('CryoBankOocyteCtr', function ($scope, $rootScope, $filter, CryoPreservationSrv, AlertMessage, srvCommon, Common, srvSemenFreez, PatientInfo, usSpinnerService, OocyteThowSrv) {
    debugger;

    $rootScope.ForPrint = 0;
    $rootScope.FormName = "Oocyte Bank"
    $scope.CryoBankOocyte = {};
    $scope.RenewExpiryDatePatient = {};
    $scope.TodayDate = new Date();
    $scope.TodayDate.setHours(0, 0, 0, 0);
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $rootScope.Allergies = '';
    $scope.Action = 'GetOocyteBankDetails';
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
    usSpinnerService.spin('GridSpinner');
    $scope.IsDisableConsentTextBox = true;
    $scope.RenewExpiryDatePatient.TransportDate = new Date();
    $scope.RenewExpiryDatePatient.TransportTime = new Date();
    $scope.NewCryoBankOocyte = {};
    $scope.NewCryoBankOocyte.VitriDate = new Date();
    $scope.NewCryoBankOocyte.VitriTime = new Date();
    $scope.NewCryoBankOocyte.ExpiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    $scope.NewCryoBankOocyte.ExpiryTime = new Date();
    $scope.NewCryoBankOocyte.lstBankVitrification = [];
    $scope.PatientCategory = 7;
  //  $rootScope.hideWhenQueue = true;

    $scope.popup3 = {
        opened3: false
    };

    $scope.open3 = function ($event, item) {  //for grid date event
        debugger;
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
    debugger;
    $rootScope.IsSinglePatient = PatientInfo.IsSinglePatient;  //Temp Code
    if (angular.isUndefined($rootScope.IsSinglePatient))
        $rootScope.IsSinglePatient = false;

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
        //get patient List
        debugger;
        var response = Common.getpatientlist(2, 7); // 7 couple 
        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $scope.PatientList = resp.data;
                $scope.PatientList = $filter('filter')($scope.PatientList, function (d) { return d.GenderID === 2; });
            }
        })

        $scope.ismeridian = true;
        $scope.FillTankList();
        $scope.CoupleDetails = {};
        $scope.FillCanister();
        $scope.FillGobletColor();
        $scope.FillGobletSize();
        $scope.FillCryoLocks();
        $scope.FillMedia();
        $scope.GetEmbryologyDoctorsList();
        $scope.FillMaturityList();
        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
        $scope.GetUnitIDList();

    }
    $scope.GetUnitIDList = function GetUnitIDList() {
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Clinic" });
            $scope.UnitIDList = Response.data;
            $scope.CryoBankOocyte.UnitID = 0;
            $scope.NewCryoBankOocyte.UnitID = 0;
        }, function (error) {
        });
    }
    $scope.FillTankList = function FillTankList() {

        var ResponseData = Common.getMasterList('M_IVFTankMaster_Embrology', 'IVFTANKID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: "Tank" });
            $scope.TankList = Response.data;
            $scope.CryoBankOocyte.TankId = 0;
            $scope.NewCryoBankOocyte.TankId = 0;


        }, function (error) {
        });
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
    $scope.FillCanister = function () {
        var ResponseData = Common.getMasterList('M_IVFCanisterMaster_Embrology', 'IVFCANISTERID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Canister' });
            $scope.ListCanister = Response.data;
            if ($scope.CryoBankOocyte.CanisterID == undefined) {
                $scope.CryoBankOocyte.CanisterID = 0;
                $scope.NewCryoBankOocyte.CanisterID = 0;

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
            if ($scope.CryoBankOocyte.ColorCodeID == undefined) {
                $scope.CryoBankOocyte.ColorCodeID = 0;
                $scope.NewCryoBankOocyte.ColorCodeID = 0;

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
            if ($scope.CryoBankOocyte.GobletSizeId == undefined) {
                $scope.CryoBankOocyte.GobletSizeId = 0;
                $scope.NewCryoBankOocyte.GobletSizeId = 0;

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

    $scope.FillCryoLocks = function () {
        var ResponseData = Common.getMasterList('M_IVF_CryoLocks_Embrology', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListCryoLocks = Response.data;
            if ($scope.NewCryoBankOocyte.CryoLockID == undefined) {
                $scope.CryoBankOocyte.CryoLockID = 0;
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
                $scope.CryoBankOocyte.MediaID = 0;
                $scope.NewCryoBankOocyte.MediaID = 0;

            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.GetEmbryologyDoctorsList = function () {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //   
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ListDoctor = Response.data;
            if ($scope.CryoBankOocyte.EmbryologistID == undefined) {
                $scope.CryoBankOocyte.EmbryologistID = 0;
                $scope.NewCryoBankOocyte.EmbryologistID = 0;
            }
            if ($scope.CryoBankOocyte.Witness == undefined) {
                $scope.CryoBankOocyte.Witness = 0;
                $scope.NewCryoBankOocyte.Witness = 0;

            }

        }, function (error) {
        });
    }

    //Begin::Added by AniketK on 23July2019 for Oocyte Bank Report
    $scope.pdf = false;
    $scope.PrintOocyteBankSummary = function PrintOocyteBankSummary() {
        debugger;
        var a = encodeURIComponent('pdf=' + $scope.pdf);//('U=' + item1.UnitID); //+ '&pdf=' + $scope.MIS.PDF);
        window.open('/Reports/OocyteBank/OocyteBankExpiryDetails.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }
    //End::Added by AniketK on 23July2019 for Oocyte Bank Report

    $scope.GetVitrificationDetailsOocyteBank = function (PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action) {
        usSpinnerService.spin('GridSpinner');
        debugger;
        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0);    // Commented on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0, 0);   // Modified on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
        ResponseData.then(function (Response) {
            if (Response.data != null) {
                debugger;
                $scope.VitriDetails = Response.data;
                usSpinnerService.stop('GridSpinner');
                if ($scope.VitriDetails.ListVitriDetails.length > 0) {
                   
                    $scope.TotalItems = $scope.VitriDetails.ListVitriDetails[0].TotalRecords;
                    angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {
                        debugger;
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
                        //if (item.ExpiryTime == null || item.ExpiryTime == undefined)
                        //    item.ExpiryTime = new Date();
                        //else
                        //    item.ExpiryTime = new Date(item.ExpiryTime);
                    });
                }
                else
                    $scope.TotalItems = 0;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }

    //Normal Search
    $scope.NormalSearch = function (UnitID, NameCodeMRNo) {
        debugger;
        if (angular.isUndefined(NameCodeMRNo))
            NameCodeMRNo = '';
        usSpinnerService.spin('GridSpinner');
        $scope.CurrentPage = 1;
        $scope.CryoBankOocyte.TankId = 0;
        $scope.CryoBankOocyte.CanisterID = 0;
        $scope.CryoBankOocyte.ColorCodeID = 0;
        $scope.CryoBankOocyte.GobletSizeId = 0;
        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, 0, 0, 0, 0, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, '', $scope.Action, 0);    // Commented on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, 0, 0, 0, 0, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, '', $scope.Action, 0, 0);   // Modified on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                usSpinnerService.stop('GridSpinner');
                $scope.VitriDetails = Response.data;
                if ($scope.VitriDetails.ListVitriDetails.length > 0) {
                    $scope.TotalItems = $scope.VitriDetails.ListVitriDetails.length;
                    angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {
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
                else
                    $scope.TotalItems = 0;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });

    };

    //Begin : Added on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
    $scope.CryoBankOocyte.NearExpiryDays = 0;
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
            $scope.CryoBankOocyte.NearExpiryDays = 0;
            $scope.ShowNearExpiryControl = false;
        }
    };
    //End : Added on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration

    //Advance Search
    //$scope.AdvanceSearch = function (UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, StatusOption) { // Commented on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
    $scope.AdvanceSearch = function (UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, StatusOption, NearExpiryDays) {   // Modified on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
        debugger;
        usSpinnerService.spin('GridSpinner');
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
        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, StatusOption, $scope.Action, $scope.IsExpired); // Commented on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, StatusOption, $scope.Action, $scope.IsExpired, NearExpiryDays);   // Modified on 22ndMar2021 for Victory client request :: to search near expiry oocytes with duration
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                $scope.VitriDetails = Response.data;
                debugger;
                if ($scope.VitriDetails.ListVitriDetails.length > 0) {
                    debugger;
                    $scope.TotalItems = $scope.VitriDetails.ListVitriDetails[0].TotalRecords;
                    angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {
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
                else
                    $scope.TotalItems = 0;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });

    };

    $scope.RedirectToRenewDateModel = function RedirectToRenewDateModel() {

        //Check Valid Patient 

        $scope.Redirect = "#";
        if ($scope.AddSelectedPatientList.length > 0) {

            if ($scope.IsValidPatient($scope.AddSelectedPatientList)) {

                $scope.Redirect = "#renew";
            } else {
                if (!$scope.IsValidPatient($scope.AddSelectedPatientList))
                    AlertMessage.info('PalashIVF', 'Please select Same Patient');
                else
                    AlertMessage.info('PalashIVF', 'Donor not allowed, Please select Oocyte');

                $scope.Redirect = "#";
            }

        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Oocyte');
        }

    };

    $scope.AddSelectedPatient = function (item) {
        //  $scope.SelectedItems = [];
        debugger;
        //if ($scope.AddSelectedPatientList.length < 4 || item.selected == false) { // Commented on 22ndMar2021 for Victory client request :: to allow selection for > 4 oocyte/embryo

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
        //else {    // Commented on 22ndMar2021 for Victory client request :: to allow selection for > 4 oocyte/embryo
        //    item.selected = false;
        //    AlertMessage.info('PalashIVF', 'Sorry you can select only 4 items');
        //}

    };

    //Begin : Added on 22ndMar2021 for Victory client request :: to select all items in grid
    $scope.SelectAllChecked = false;

    $scope.SelectAllItemsCheckBox = function(event)
    {
        debugger;
        $scope.AddSelectedPatientList = [];

        if ( event.target.checked ) 
        {
            $scope.SelectAllChecked = true; //angular.element('chkSelectAll').value;
            //alert('Select All Checked');
            angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {
                    item.selected = true;
                    $scope.AddSelectedPatientList.push(item);
                });
        }
        else
        {
            $scope.SelectAllChecked = false;
            //alert('Select All Un-Checked');
            angular.forEach($scope.VitriDetails.ListVitriDetails, function (item) {

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
    //End : Added on 22ndMar2021 for Victory client request :: to select all items in grid

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
            AlertMessage.error('PalashIVF', 'Please select atleast one Oocyte');
        }

        return IsValid;
    };

    //Update Expiry Date
    $scope.UpdateSemenFreezExpiryDates = function UpdateSemenFreezExpiryDates(ExpiryDate, ExpiryTime) {
    debugger;
        var UpdatedExpiryDate = new Date(ExpiryDate);
        var UpdatesExpiryTime = new Date(ExpiryTime);
        var ExpiryDate = new Date($scope.RenewExpiryDatePatient.ExpiryDate.getFullYear(), $scope.RenewExpiryDatePatient.ExpiryDate.getMonth(), $scope.RenewExpiryDatePatient.ExpiryDate.getDate(),
              //$scope.RenewExpiryDatePatient.ExpiryTime.getHours(), $scope.RenewExpiryDatePatient.ExpiryTime.getMinutes(), 0);
            UpdatesExpiryTime.getHours(), UpdatesExpiryTime.getMinutes(), 0);

        angular.forEach($scope.AddSelectedPatientList, function (i) {
            i.ExpiryDate = $filter('date')(ExpiryDate, 'medium');;
            i.Action = 'UpdateVitrificationExpiryDate'
        });
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenFreez.UpdateSemenFreezExpiryDates($scope.AddSelectedPatientList);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data == 1) {
                AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                angular.element(renew).modal('hide');
                $scope.AddSelectedPatientList = [];
                $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                //  $scope.GetSpermBankList(0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };

    //Start Redirect to Discard Window
    $scope.UpdateDiscardSpermBank = function UpdateDiscardSpermBank() {
        debugger;
        $scope.RedirectToDiscard = "#";
        if ($scope.AddSelectedPatientList.length > 0) {
            if ($scope.IsValidPatient($scope.AddSelectedPatientList)) {

                $scope.RedirectToDiscard = "#discardBank";
            } else {
                if (!$scope.IsValidPatient($scope.AddSelectedPatientList))
                    AlertMessage.info('PalashIVF', 'Please select Same Patient');
                else
                    AlertMessage.info('PalashIVF', 'Donor not allowed, Please select Oocyte');

                $scope.Redirect = "#";
            }
          
        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Oocyte No');
            $scope.RedirectToDiscard = "#";
        }


    };
    //End Redirect to Discard Window

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
        } else if (($scope.RenewExpiryDatePatient.WitnessID != 0 && $scope.RenewExpiryDatePatient.EmbryologistID != 0 ) && ($scope.RenewExpiryDatePatient.WitnessID == $scope.RenewExpiryDatePatient.EmbryologistID)) {
            AlertMessage.info('PalashIVF', 'Please select different Clinician,Embryologist,Witness fields ');
            IsValid = false;
        }
        else if (($scope.RenewExpiryDatePatient.DoneBy != 0 && $scope.RenewExpiryDatePatient.EmbryologistID != 0) && ($scope.RenewExpiryDatePatient.DoneBy == $scope.RenewExpiryDatePatient.EmbryologistID)) {
            AlertMessage.info('PalashIVF', 'Please select different Clinician,Embryologist,Witness fields ');
            IsValid = false;
        }
        else if (($scope.RenewExpiryDatePatient.DoneBy != 0 && $scope.RenewExpiryDatePatient.WitnessID != 0) && ($scope.RenewExpiryDatePatient.DoneBy == $scope.RenewExpiryDatePatient.WitnessID)) {
            AlertMessage.info('PalashIVF', 'Please select different Clinician,Embryologist,Witness');
            IsValid = false;
        }


        return IsValid;
    }

    $scope.ValidateInwardFlowIUI = function () {
        debugger;
        var IsValid = true;
        if ($scope.NewCryoBankOocyte.lstBankVitrification.length > 0) {
            for (var Index = 0; Index < $scope.NewCryoBankOocyte.lstBankVitrification.length; Index++) {
                if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].OocyteMaturityID == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].TankId == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].CanisterID == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].ColorCodeID == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                    IsValid = false;
                //} else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].GobletSizeId == 0) {
                //    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                //    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].MediaID == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].FreezingNo == undefined || $scope.NewCryoBankOocyte.lstBankVitrification[Index].FreezingNo == "") {
                    AlertMessage.info('PalashIVF', 'Please select all mandatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].MediaExpiryDate == undefined || $scope.NewCryoBankOocyte.lstBankVitrification[Index].MediaExpiryDate == null) {
                    AlertMessage.info('PalashIVF', 'Please select all mandatory fields');
                    IsValid = false;
                }
                else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].CryoLockID == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].EmbryologistID == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].Witness == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                    IsValid = false;
                } else if ($scope.NewCryoBankOocyte.NoOfSample == 0) {
                    AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
                    IsValid = false;
                }
                else if ($scope.NewCryoBankOocyte.lstBankVitrification[Index].EmbryologistID == $scope.NewCryoBankOocyte.lstBankVitrification[Index].Witness) 
                  {
                    AlertMessage.info('PalashIVF', 'EmbryologistID and  Witness can not be same');
                    IsValid = false;
                }
                }
        }
        return IsValid;
    }

    //Discard Oocyte Bank
    $scope.UpdateDiscardOocyteBank = function UpdateDiscardOocyteBank(CryoBank) {
        debugger;
        if ($scope.AddSelectedPatientList.length > 0) {

            if ($scope.ValidateIUI() && $scope.IsValidPatient($scope.AddSelectedPatientList)) {
                var DiscardDate = new Date(CryoBank.DiscardDate);
                var DiscardTime = new Date(CryoBank.DiscardTime);
                var DiscardDate = new Date(DiscardDate.getFullYear(), DiscardDate.getMonth(), DiscardDate.getDate(),
                      DiscardTime.getHours(), DiscardTime.getMinutes(), 0);

                angular.forEach($scope.AddSelectedPatientList, function (i) {
                    i.Action = 'UpdateDiscardOocyteBank'
                    i.DoneBy = CryoBank.DoneBy,
                    i.EmbryologistID = CryoBank.EmbryologistID,
                    i.WitnessID = CryoBank.WitnessID,
                    i.ReasonID = CryoBank.ReasonID,
                    i.DiscardDate = DiscardDate

                });
                usSpinnerService.spin('GridSpinner');
                var ResponseData = srvSemenFreez.UpdateSemenFreezExpiryDates($scope.AddSelectedPatientList);
                ResponseData.then(function (Response) {

                    if (Response.data == 1) {
                        AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                        $scope.AddSelectedPatientList = [];
                        $scope.Close();
                        $scope.LoadData();
                      //  $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                        usSpinnerService.stop('GridSpinner');
                        //  $scope.GetSpermBankList(0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                });

            }
            else {
                $scope.frmOocyteBank.ddlReason.$dirty = true;
                $scope.frmOocyteBank.ddlClinicianby.$dirty = true;
                $scope.frmOocyteBank.ddlDoneby.$dirty = true;
                $scope.frmOocyteBank.ddlWitnessedby.$dirty = true;
            }
        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Oocyte');
        }
    };

    // Show  Discarded on checkbox click

    $scope.ShowDiscardChange = function (IsShowDiscard, Status) {
    debugger;
        if (Status == 'Status')
            Status = '';
        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', IsShowDiscard, Status, $scope.Action);
        //   $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage -1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, $scope.CryoBankOocyte.StatusID, $scope.Action);

    };

    //Get History

    $scope.RedirectToHistory = function RedirectToHistory(item) {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = CryoPreservationSrv.GetVitrificationBankHistory(item.UnitID, item.VitrivicationID, item.VitrificationUnitID, item.EmbNumber, item.EmbSerialNumber, $scope.Action);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.lstOocyteHistory = Response.data;

        }, function (error) {
        });


    }
    $scope.SortColumn = "CryoNo";
    $scope.reverseSort = false;

    $scope.SortData = function (column) {
        $scope.reverseSort = ($scope.SortColumn == column) ? !$scope.reverseSort : false;
        $scope.SortColumn = column;
        if ($scope.SortColumn == column)
            $scope.sortClass = $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass = '';
    }

    //Page Change
    $scope.PageChange = function PageChange() {


        if (angular.isUndefined($scope.CryoBankOocyte.NameCodeMRNo))
            $scope.CryoBankOocyte.NameCodeMRNo = '';
        if (angular.isUndefined($scope.CryoBankOocyte.StatusID) || $scope.CryoBankOocyte.StatusID == 'Status')
            $scope.CryoBankOocyte.StatusID = '';
        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, $scope.CryoBankOocyte.UnitID, $scope.CryoBankOocyte.TankId, $scope.CryoBankOocyte.CanisterID, $scope.CryoBankOocyte.ColorCodeID, $scope.CryoBankOocyte.GobletSizeId, $scope.CryoBankOocyte.NameCodeMRNo, $scope.RenewExpiryDatePatient.IsShowDiscard, $scope.CryoBankOocyte.StatusID, $scope.Action);
    }

    $scope.Cancel = function () {
        angular.element(renew).modal('hide');
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
                    if (Response.data == 1) {
                        AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                        $scope.AddSelectedPatientList = [];
                        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                        usSpinnerService.stop('GridSpinner');
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                });
            }
        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Oocyte');
        }
    }

    //For Donate Functionality
    $scope.getMatchingPatient = function ($viewValue) {
        var matchingStuffs = [];
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
        debugger;
        if (model) {
            $scope.SelectedPatient = angular.copy(model);   //selected patient details
        }
    };

    $scope.donateOocyte = function () {
        $scope.SelectedPatient = {};
        if ($scope.AddSelectedPatientList != null && $scope.AddSelectedPatientList != undefined) {
            if ($scope.AddSelectedPatientList.length == 1) {
                angular.element(Transport).modal('show');
            }
            else {
                AlertMessage.error('Palash IVF', 'Please Select Only One Oocyte.');
            }
        }
    }

    $scope.SaveDonateOocyte = function () {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = CryoPreservationSrv.DonateOocytefromBank($scope.AddSelectedPatientList[0].VitrivicationID, $scope.AddSelectedPatientList[0].VitrificationUnitID, $scope.AddSelectedPatientList[0].VitrificationDetailID, $scope.AddSelectedPatientList[0].VitrificationNo, $scope.SelectedPatient.ID, $scope.SelectedPatient.UnitID);
        ResponseData.then(function (Response) {
            $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
            usSpinnerService.stop('GridSpinner');
            $scope.AddSelectedPatientList = [];
            angular.element(donate).modal('hide');
            AlertMessage.success('Palash IVF', 'Oocyte Donate Successfully..');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }

    $scope.CheckConsentIsOther = function CheckConsentIsOther(UnitID) {
        if (UnitID == 3)
            $scope.IsDisableConsentTextBox = false;
        else
            $scope.IsDisableConsentTextBox = true;
    };

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
                AlertMessage.info('PalashIVF', 'Attactment should be not greater than 2 MB.');
            }
        }
        else {
            AlertMessage.info('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');
        }
    }
    //Save Transport functionality
    $scope.SaveTransportDetails = function SaveTransportDetails(obj, AddSelectedPatientList) {
        debugger;

        obj.PatientID = AddSelectedPatientList[0].PatientID;
        obj.strReport = $scope.myImage;
        obj.FileName = $scope.filename;
        if ($scope.IsValidTransportUI()) {
            var Promise = OocyteThowSrv.SaveTransportDetails(obj);
            Promise.then(function (Response) {
                if (Response.data == 1) {
                    $scope.UpdateTransportStatus();

                    // AlertMessage.info('PalashIVF', 'Record saved successfully.');

                }
            }, function (error) {
                debugger;
            });
        } else {
            $scope.frmOocyteBank.TransportDate.$dirty = true;
            $scope.frmOocyteBank.TransportTime.$dirty = true;
            $scope.frmOocyteBank.ddlTransportedTo.$dirty = true;
            $scope.frmOocyteBank.ddlReason.$dirty = true;
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
                AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                $scope.AddSelectedPatientList = [];
                $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                usSpinnerService.stop('GridSpinner');
                angular.element(Transport).modal('hide');

            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };

    $scope.CheckConsentButton = function CheckConsentButton(IsConsent) {
        debugger;
        $scope.IsDisableButton = IsConsent;
    };
    $scope.IsValidTransportUI = function () {
        debugger;

        var IsValid = true;
        if (angular.isDefined($scope.RenewExpiryDatePatient.IsConsent)) {
            if ($scope.RenewExpiryDatePatient.IsConsent && (angular.isUndefined($scope.FileName)) || $scope.FileName == null) {
                AlertMessage.info('PalashIVF', 'Please select file');
                IsValid = false;
            }
        }
        else if ($scope.RenewExpiryDatePatient.TransportID == 0) {
            AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
            IsValid = false;

        } else if ($scope.RenewExpiryDatePatient.TransportID == 3 && $scope.RenewExpiryDatePatient.TransportDescription == null) {
            AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
            IsValid = false;
        } else if (angular.isUndefined($scope.RenewExpiryDatePatient.TransportDate)) {
            AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
            IsValid = false;
        }
        else if (angular.isUndefined($scope.RenewExpiryDatePatient.TransportTime)) {
            AlertMessage.info('PalashIVF', 'Please select all mandiatory fields');
            IsValid = false;
        }
        return IsValid;
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
            'MediaID': 0,
            'FreezingNo': '',
            'LotNo':'',         
            'EmbryologistID': 0,
            'Witness': 0,
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
            if ($scope.CoupleDetails.FemalePatient.FemalePatientMRNO != null) {
        angular.forEach(lstBankVitrification, function (item) {
            item.PatientID = $scope.CoupleDetails.FemalePatient.FemalePatientID;
            item.PatientUnitID = $scope.CoupleDetails.FemalePatient.FemalePatientUnitID;
            item.CoupleId = $scope.CoupleRegNo;
            item.VitriDate = NewCryoBankOocyte.VitriDate;
            item.VitriTime = NewCryoBankOocyte.VitriTime;
            item.ExpiryDate = NewCryoBankOocyte.ExpiryDate;
            item.ExpiryTime = NewCryoBankOocyte.ExpiryTime;
            item.IsFromOocytesBank = true;

            });
            if ($scope.ValidateInwardFlowIUI() && lstBankVitrification.length > 0) {
                debugger;
                var ResponseData = CryoPreservationSrv.InsertUpdateOocytrEmbryoVitrification(lstBankVitrification);
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    if (Response.data == 1) {
                        AlertMessage.success("PIVF", "Save Successfully");
                        angular.element(New).modal('hide');
                        // $scope.GetVitriDetails();
                  
                        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);
                  
                        $scope.Close()

                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error("PIVF", "Error Occured While Adding Details");
                });
            } else {
                if (lstBankVitrification.length > 0) {
                    $scope.frmOocyteBank.FreezingNo.$dirty = true;
                    $scope.frmOocyteBank.MediaExpiryDate.$dirty = true;
                    $scope.frmOocyteBank.ddleMaturityList.$dirty = true;
                    $scope.frmOocyteBank.ddlTankList.$dirty = true;
                    $scope.frmOocyteBank.ddlCanisterList.$dirty = true;
                    $scope.frmOocyteBank.ddlGobletColorList.$dirty = true;
                    $scope.frmOocyteBank.ddlGobletSizeList.$dirty = true;
                    $scope.frmOocyteBank.ddlCryoLocksList.$dirty = true;
                    $scope.frmOocyteBank.ddlListMediaUsed.$dirty = true;
                    $scope.frmOocyteBank.ddlDoneby.$dirty = true;
                    $scope.frmOocyteBank.ddlWitness.$dirty = true;

                } else {

                    AlertMessage.info('PalashIVF', 'Please select No of Samples Received');
                    $scope.frmOocyteBank.txtNoOfSample.$dirty = true;
                    IsValid = false;
                }
            }
        }
        else {
            AlertMessage.info('PalashIVF', 'Please select Patient');
            //  $scope.frmEmbryoBank.txtfullName.$dirty = true;
            IsValid = false;
        }
    }
    else{
            AlertMessage.info('PalashIVF', 'Please select Patient');
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
            debugger;
            if (resp.data != null) {
                debugger;
                $scope.IsPatientNotExist = false;                
                $scope.CoupleDetails.MalePatient = resp.data.MalePatient;
                $scope.CoupleDetails.FemalePatient = resp.data.FemalePatient;
                $scope.CoupleRegNo = resp.data.CoupleRegNo;
            }
        });
    }
    //END

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
        
       
        $scope.Clear();
       
    }

     //=========================================================================================================================================================
        //Clear All Text
    $scope.Clear = function () {
        debugger;
        angular.element(renew).modal('hide');
        angular.element(discardBank).modal('hide');
        $scope.NewCryoBankOocyte.NoOfSample = "";
        $scope.NewCryoBankOocyte.lstBankVitrification = [];
        $scope.RenewExpiryDatePatient.DiscardDate = new Date();
        $scope.RenewExpiryDatePatient.DiscardTime = new Date();
        $scope.RenewExpiryDatePatient.ReasonID = 0;
        $scope.RenewExpiryDatePatient.DoneBy = 0;
        $scope.RenewExpiryDatePatient.EmbryologistID = 0;
        $scope.RenewExpiryDatePatient.WitnessID = 0;
        }
    //=========================================================================================================================================================

    $scope.CheckDuplicateFreezingNo = function CheckDuplicateFreezingNo(idx, Item) {
        debugger;
        var ResponseData = CryoPreservationSrv.CheckDuplicateFreezingNo(Item,false);
        ResponseData.then(function (Response) {
            if (Response.data == 1) {

                AlertMessage.info('PalashIVF', 'Freezing No is already present');

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