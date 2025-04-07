angular.module('PIVF').controller('CoupleBankCtr', function ($scope, $rootScope, $filter, CryoPreservationSrv, AlertMessage, srvCommon, Common, srvSemenFreez, PatientInfo, usSpinnerService, localStorageService, SemenPrepService) {
    debugger;
    $rootScope.ForPrint = 0;
    $rootScope.FormName = "Couple Bank"
    $scope.CryoBankOocyte = {};
    $scope.RenewExpiryDatePatient = {};
    $scope.TodayDate = new Date();
    $scope.TodayDate.setHours(0, 0, 0, 0);
    $rootScope.Allergies = '';
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.ActionOocyte = 'GetOocyteBankDetails';
    $scope.ActionEmbryo = 'GetEmbryBankDetails';
    $scope.DateAfter15Days = new Date();
    $scope.DateAfter15Days = $scope.DateAfter15Days.addDays(45);
    $scope.DateAfter15Days.setHours(0, 0, 0, 0);
    $scope.RenewExpiryDatePatient.IsShowDiscard = false;
    $scope.AddSelectedPatientList = [];
    $scope.RenewExpiryDatePatient.RenewalDate = new Date();
    $scope.RenewExpiryDatePatient.ExpiryDate = new Date().addMonths(3);
    $scope.RenewExpiryDatePatient.RenewalTime = new Date();
    $scope.RenewExpiryDatePatient.ExpiryTime = new Date();
    usSpinnerService.spin('GridSpinner');
    $scope.PatientCategory = 7;
    $scope.CoupleDetails.FemalePatient = {};
    $scope.CoupleDetails.MalePatient = {};
    $scope.IsPatientNotExist = true;
    $rootScope.hideWhenQueue = true;
    $scope.RenewExpiryDatePatient.DiscardDate = new Date();
    $scope.RenewExpiryDatePatient.DiscardTime = new Date();

    //Check Is Single Patient 


    //Added by rohini for patient details if from EMR
    if ($rootScope.IsSinglePatient == false) {
        $rootScope.CycleDetails = null;
        $rootScope.isAction = false;
        $rootScope.IsFemaleActive = false;
        $rootScope.IsMaleActive = false;
        $rootScope.IsCycleActive = false;
    }

    $scope.LoadDefault = function () {
        $rootScope.IsSinglePatient = true;
        $scope.getpatientlist(7);


    };
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

    $scope.getMatchingPatient = function ($viewValue) {
        debugger;
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

    $scope.getpatientlist = function getpatientlist(PatientCategory) {
        var UserInfo = localStorageService.get("UserInfo");
        //var response = Common.getpatientlist(UserInfo.UnitID, $scope.PatientCategory);
        var response = Common.getpatientlist(2, PatientCategory);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.PatientList = resp.data;
                $scope.BindParentList(0);

            }
        });
    }

    $scope.GetSpermBankList = function (PageIndex, IsSinglePatient, TankID, UnitID, CanisterID, CanID, StrawId, NameCodeMRNo, IsShowDiscard, statusOption) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenFreez.GetSpermBankList(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, CanID, StrawId, NameCodeMRNo, IsShowDiscard, statusOption);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data.length > 0) {
                debugger;
                $scope.OocyteBankList = Response.data;
                $scope.TotalItems = $scope.OocyteBankList.length;
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

    //Get EmbryoData
    $scope.GetVitrificationDetailsEmbryoBank = function (PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0);    // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0, 0);   // Modified on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
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
    }

    //Get Oocyte Bank Data
    $scope.GetVitrificationDetailsOocyteBank = function (PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action) {
        usSpinnerService.spin('GridSpinner');
        debugger;
        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0);    // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0, 0);   // Modified on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
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

                //Load Sperm List Default
                $scope.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
                //Load Oocyte bank Data
                $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.ActionOocyte);
                //Load Embryo bank Data
                $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.ActionEmbryo);
            }
        });

    }
    //END

    //Add selected Elements 

    $scope.AddSelectedPatient = function (item) {
        //  $scope.SelectedItems = [];

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

    //Redirect To Renew model
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
        $scope.FillCanister();
        $scope.FillGobletColor();
        $scope.FillGobletSize();
        $scope.FillCryoLocks();
        $scope.GetEmbryologyDoctorsList();
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
        }, function (error) {
        });
    }
    $scope.FillTankList = function FillTankList() {

        var ResponseData = Common.getMasterList('M_IVFTankMaster_Embrology', 'IVFTANKID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: "Tank" });
            $scope.TankList = Response.data;
            $scope.CryoBankOocyte.TankId = 0;
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
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillCryoLocks = function () {
        var ResponseData = Common.getMasterList('M_IVF_CryoLocks_Embrology', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListCryoLocks = Response.data;
            if ($scope.CryoBankOocyte.CryoLockID == undefined) {
                $scope.CryoBankOocyte.CryoLockID = 0;
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
            if ($scope.CryoBankOocyte.EmbryologistID == undefined)
                $scope.CryoBankOocyte.EmbryologistID = 0;
            if ($scope.CryoBankOocyte.Witness == undefined)
                $scope.CryoBankOocyte.Witness = 0;
        }, function (error) {
        });
    };

    $scope.GetVitrificationDetailsOocyteBank = function (PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action) {
        usSpinnerService.spin('GridSpinner');
        debugger;
        //var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0);   // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
        var ResponseData = CryoPreservationSrv.GetVitrificationDetailsOocyteBank(PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, 0, 0);   // Modified on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
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


    //$scope.AddSelectedPatient = function (item) {
    //    //  $scope.SelectedItems = [];
    //    debugger;
    //    if ($scope.AddSelectedPatientList.length < 4 || item.selected == false) {

    //        if (item.selected)
    //            $scope.AddSelectedPatientList.push(item);
    //        else {

    //            for (var i = $scope.AddSelectedPatientList.length - 1; i >= 0; i--) {
    //                if ($scope.AddSelectedPatientList[i].CryoNo == item.CryoNo) {
    //                    $scope.AddSelectedPatientList.splice(i, 1);
    //                }

    //            }
    //        }
    //    }
    //    else {
    //        item.selected = false;
    //        AlertMessage.info('PalashIVF', 'Sorry you can select only 4 items');
    //    }




    //};

    $scope.AddSelectedPatient = function (item) {

        //  $scope.SelectedItems = [];
        debugger;
        if ($scope.AddSelectedPatientList.length < 1 || item.selected == false) {

            if (item.selected)
                $scope.AddSelectedPatientList.push(item);
            else {
                if (item.EmbNumber > 0)
                    for (var i = $scope.AddSelectedPatientList.length - 1; i >= 0; i--) {
                        if ($scope.AddSelectedPatientList[i].CryoNo == item.CryoNo) {
                            $scope.AddSelectedPatientList.splice(i, 1);
                        }
                    }
                else {
                    for (var i = $scope.AddSelectedPatientList.length - 1; i >= 0; i--) {
                        if ($scope.AddSelectedPatientList[i].VitrificationDetailID == item.VitrificationDetailID) {
                            $scope.AddSelectedPatientList.splice(i, 1);
                        }



                    }
                }
            }
        }
        else {
            item.selected = false;
            AlertMessage.info('PalashIVF', 'Sorry you can select only 1 item');
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
                //$scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);       // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
                $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.ActionOocyte);   // Modified on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
                //  $scope.GetSpermBankList(0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, '')
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };

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
                    if (i.EmbNumber > 0)
                        i.Action = 'UpdateDiscardFreez'
                    else
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

                    if (Response.data == 1) {
                        AlertMessage.success('Palash IVF', 'Record Updated successfully.');
                        $scope.AddSelectedPatientList = [];
                        //$scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);       // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
                        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.ActionOocyte);   // Modified on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
                        usSpinnerService.stop('GridSpinner');

                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                });

            }
            else {
                $scope.frmCoupleBank.ddlReason.$dirty = true;
                $scope.frmCoupleBank.ddlClinicianby.$dirty = true;
                $scope.frmCoupleBank.ddlDoneby.$dirty = true;
                $scope.frmCoupleBank.ddlWitnessedby.$dirty = true;
            }
        }
        else {
            AlertMessage.error('PalashIVF', 'Please select atleast one Oocyte');
        }
    };

    //Validate UI
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

    // Show  Discarded on checkbox click

    $scope.ShowDiscardChange = function (IsShowDiscard, Status) {

        if (Status == 'Status')
            Status = '';
        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', IsShowDiscard, Status, $scope.Action);
        //   $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage -1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, $scope.CryoBankOocyte.StatusID, $scope.Action);

    };

    //Get History for Embryo
    $scope.RedirectToHistoryEmb = function RedirectToHistoryEmb(item) {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = CryoPreservationSrv.GetVitrificationBankHistory(item.UnitID, item.VitrivicationID, item.VitrificationUnitID, item.EmbNumber, item.EmbSerialNumber, $scope.ActionEmbryo);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.lstOocyteHistory = Response.data;

        }, function (error) {
        });
    }

    //Get History for Cryo
    $scope.RedirectToHistoryCryo = function RedirectToHistoryCryo(item) {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = CryoPreservationSrv.GetVitrificationBankHistory(item.UnitID, item.VitrivicationID, item.VitrificationUnitID, item.EmbNumber, item.EmbSerialNumber, $scope.ActionOocyte);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.lstOocyteHistory = Response.data;

        }, function (error) {
        });


    }
    //Redirect To History for Sperm Bank

    $scope.RedirectToHistorySpermBank = function RedirectToHistorySpermBank(item) {

        var ResponseData = SemenPrepService.GetSemenThawingDetailFromSemenPrepIDForTC(item.FormNo, 'GetSpermBankHistoryBySpermNo');
        ResponseData.then(function (Response) {

            $scope.lstFreezingHistory = Response.data;
           // $scope.AddRow();
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

    $scope.CheckPatientIsFemale = function CheckPatientIsFemale() {
        $scope.RedirectToDFR = '#';
        debugger;
        if ($scope.AddSelectedPatientList.length > 0) {
            angular.forEach($scope.AddSelectedPatientList, function (item) {
                if (angular.isDefined(item.EmbNumber) && item.EmbNumber > 0)
                    $scope.RedirectToDFR = '#DFR';
                else
                    $scope.RedirectToDFR = '#';
            });
            if ($scope.RedirectToDFR == '#')
                AlertMessage.error('PalashIVF', 'Please select Female Patient');

        }
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
                        //$scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.Action);        // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
                        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', false, '', $scope.ActionOocyte);    // Modified on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
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

    $scope.donateOocyte = function () {
        $scope.SelectedPatient = {};
        if ($scope.AddSelectedPatientList != null && $scope.AddSelectedPatientList != undefined) {
            if ($scope.AddSelectedPatientList.length == 1) {
                if (angular.isDefined($scope.AddSelectedPatientList[0].EmbNumber) && $scope.AddSelectedPatientList[0].EmbNumber > 0)
                    angular.element(donate).modal('show');
                else
                    AlertMessage.error('PalashIVF', 'Please select Female Patient');
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

    $scope.FillReasonList = function FillReasonList() {
        debugger;
        var ResponseData = Common.getMasterList('M_BankReasonMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ReasonList = Response.data;
            $scope.RenewExpiryDatePatient.ReasonID = 0;
        }, function (error) {
        });
    }

    // Show  Discarded on checkbox click for Oocyte
    $scope.ShowDiscardChangeOocyte = function (IsShowDiscard, Status) {
        debugger;
        //if (Status == 'Status')   // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
        if (angular.isUndefined(Status) || Status == 'Status')  // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
            Status = '';
        //$scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', IsShowDiscard, Status, $scope.Action);        // Commented on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
        $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', IsShowDiscard, Status, $scope.ActionOocyte);    // Modified on 23rdMar2021 for Victory client request :: to search near expiry embryos/oocytes with duration
        //   $scope.GetVitrificationDetailsOocyteBank($scope.CurrentPage -1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', $scope.RenewExpiryDatePatient.IsShowDiscard, $scope.CryoBankOocyte.StatusID, $scope.Action);

    };

    // Show  Discarded on checkbox click Embryo

    $scope.ShowDiscardChangeEmbryo = function (IsShowDiscard, Status) {
        if (Status == 'Status')
            Status = '';
        $scope.GetVitrificationDetailsEmbryoBank($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', IsShowDiscard, Status, $scope.Action);

    };

    // Show  Discarded on checkbox click Sperm Bank

    $scope.ShowDiscardChangeSpermBank = function (IsShowDiscard, Status) {
        if (Status == 'Status')
            Status = '';
        $scope.CurrentPage = 1;
        $scope.GetSpermBankList($scope.CurrentPage - 1, $rootScope.IsSinglePatient, 0, 0, 0, 0, 0, '', IsShowDiscard, Status);
    };

});