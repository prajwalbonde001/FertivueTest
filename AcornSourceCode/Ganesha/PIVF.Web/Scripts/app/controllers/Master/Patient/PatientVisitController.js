'use strict';
angular.module('PIVF').controller('PatientVisitController', function (swalMessages, $filter, $scope, $http, PatientVisitService, DoctorService, AlertMessage, srvCommon, $rootScope, localStorageService, Common, $location, usSpinnerService) {
    $scope.maxSize = 5;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $scope.CurrentPage1 = 1;
    $scope.CurrentPage2 = 1;
    $scope.PatientData = {};
    $scope.DoctorData = {};
    $scope.PayerData = {};
    $scope.BankData = {};
    var objResource = {};
    $scope.SponserList = [];
    $scope.lstPatientForSave = [];
    $scope.lstSponserForSave = [];
    $scope.PatientData.VisitDate = new Date();
    $scope.PatientData.VisitTime = new Date();
    $scope.IsHideSearch = false;
    $scope.PatientList = [];
    $rootScope.FormName = 'Patient Check-in';
    $scope.IsPatientSelected = true;
    $scope.PatientData.UnitID = localStorageService.get("UserInfo").UnitID;// Added by AniketK 0n 28Nov2019 for Patient Check-in
    $scope.IsDisableSearch = true; //Added by AniketK on 28Nov2019
    //$scope.RegUnitID = localStorageService.get("UserInfo").UnitID;
    $scope.disableClick = false; //Added by Nayan Kamble on 11/06/2019
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    //Used for localization & globalization
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }


    //Binding patient data while searching
    $scope.BindData = function BindData() {
        debugger;
       // $scope.IsPatientSelected = false;    commented by Nayan Kamble on 13/11/2019
        $scope.selectedPatient = JSON.parse(sessionStorage.getItem("SavedPatientData"));
        if ($scope.selectedPatient != undefined) {
            sessionStorage.removeItem("SavedPatientData");
             $scope.IsPatientSelected = false;   // Added by Nayan Kamble on 13/11/2019
            $scope.PatientData.MRNo = $scope.selectedPatient.MRNo;
            $scope.PatientData.Prefix = $scope.selectedPatient.Prefix;
            $scope.PatientData.PatientFullName = $scope.selectedPatient.PatientFullName;
                   
            $scope.PatientData.Gender = $scope.selectedPatient.Gender;
            $scope.PatientData.Age = $scope.selectedPatient.Age;
            $scope.PatientData.MStatus = $scope.selectedPatient.MStatus;
            $scope.PatientData.Email = $scope.selectedPatient.Email;
            $scope.PatientData.MobileNo = $scope.selectedPatient.MobileNo;
            $scope.PatientData.AltMobileno = $scope.selectedPatient.AltMobileno;
            $scope.PatientData.PhotoString = $scope.selectedPatient.PhotoString;
            $scope.PatientData.RegID = $scope.selectedPatient.RegID;
            $scope.PatientData.RegUnitID = $scope.selectedPatient.RegUnitID;
            $scope.PatientData.RegType = $scope.selectedPatient.RegType;
            $scope.PatientData.RegisteredCategory = $scope.selectedPatient.RegisteredCategory;
            $scope.PatientData.GenderId = $scope.selectedPatient.GenderId;
             $scope.PatientData.PatientName = $scope.selectedPatient.PatientFirstName + " " + $scope.selectedPatient.PatientLastName;   

            //Manohar
            $scope.BankData.BankID = $scope.selectedPatient.BankID;
            $scope.BankData.BranchName = $scope.selectedPatient.BranchName;
            $scope.BankData.CustName = $scope.selectedPatient.CustName;
            $scope.BankData.AccountNo = $scope.selectedPatient.AccountNo;
            $scope.BankData.IFSCCode = $scope.selectedPatient.IFSCCode;

            $scope.selectedPatientFromPatient = '';
            $scope.selectedPatientFromApp = '';
            $scope.GetVisits();
            $scope.GetSponsers();
        }
        else {    //Added by Nayan Kamble on 13/12/2019
            //AlertMessage.warning(objResource.msgTitle, "Please select patient");//Commented by swatih for localization on 13/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseselectpatient)//Modified by swatih for localization 13/7/2020
        }
    };

    //Used for patient search
    $scope.GetPatientDetailsFromPatient = function GetPatientDetailsFromPatient(IsAppSearch) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $scope.selectedPatientFromPatient = "";
        debugger;
        $scope.RegUnitID = $scope.PatientData.UnitID
        $scope.PatientList = [];        
        var Promise = PatientVisitService.GetPatientDetails($scope.selectedPatientFromPatient, IsAppSearch,$scope.RegUnitID);
        Promise.then(function (Response) {           
            $scope.PatientList = Response.data.lstPatientAutoComplete;
            $scope.IsDisableSearch = false; //Added by AniketK on 28Nov2019
            usSpinnerService.stop('GridSpinner');
            debugger;
            if ($scope.PatientDataFromReg != undefined) {
                sessionStorage.setItem("SavedPatientData", JSON.stringify($scope.PatientList[0]));
                $scope.BindData();
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Message = "Error" + error.status;
        });

    };

    //Used when called from Patient Registration page.
    var data;
    $scope.PatientDataFromReg = sessionStorage.getItem('VisitMRNo');
    if ($scope.PatientDataFromReg != undefined) {
        $scope.IsHideSearch = true;
        sessionStorage.removeItem('VisitMRNo');
        data = $scope.PatientDataFromReg.split(',');
        $scope.selectedPatientFromPatient = data[0];
        $scope.GetPatientDetailsFromPatient(false);
    }

    //$rootScope.$on("GetPatientDetailsFromApp", function (IsAppSearch) {//Added by AniketK For Appoitment on 08May2020
    //    debugger;
    //    var IsAppSearch = IsAppSearch;        
    //    $scope.GetPatientDetailsFromApp(IsAppSearch);
    //});

    //Used for appointment search
    $scope.GetPatientDetailsFromApp = function GetPatientDetailsFromApp(IsAppSearch) {
        debugger;
        $scope.selectedPatientFromPatient = null;
        $scope.PatientList = [];
        //var Promise = PatientVisitService.GetPatientDetails($scope.selectedPatientFromApp, IsAppSearch);
        var Promise = PatientVisitService.GetPatientDetails($scope.selectedPatientFromApp, IsAppSearch, $scope.RegUnitID);
        Promise.then(function (Response) {
            $scope.PatientList = Response.data.lstPatientAutoComplete;
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });

    };

    //Binding selected patient on searching
    $scope.SelectedPatient = function SelectedPatient(selectedPatient, IsAppSearch) {
        debugger;
        $scope.GetTokenNo(0);
        sessionStorage.setItem("SavedPatientData", JSON.stringify(selectedPatient));
        if (selectedPatient.MRNo != "") {
            if (IsAppSearch) {
                localStorageService.set('UserInfo', { UnitID: 0 });
                $scope.GetDDDepartmentList();
                $scope.GetDDVisitTypeList();
                $scope.selectedPatientFromPatient = null;
                $scope.selectedPatientFromApp = selectedPatient.MRNo;
                $scope.PatientData.RegID = selectedPatient.RegID;
                $scope.PatientData.RegUnitID = selectedPatient.RegUnitID;
                $scope.LoadRelationList(selectedPatient.Gender);
                $scope.PatientData.APPID = selectedPatient.APPID;
                $scope.PatientData.VTID = selectedPatient.VisitID;
                $scope.PatientData.DeptID = selectedPatient.DeptID;
                $scope.PatientData.DOCID = selectedPatient.DOCID;
                $scope.PatientData.PatientAddress = selectedPatient.PatientAddress;
                $scope.PatientData.CommunicationAddress = selectedPatient.CommunicationAddress;     //Added by Nayan Kamble on 26/11/2019
            }
            else {
                $scope.selectedPatientFromApp = null;
                $scope.selectedPatientFromPatient = selectedPatient.MRNo;
                $scope.PatientData.RegID = selectedPatient.RegID;
                $scope.PatientData.RegUnitID = selectedPatient.RegUnitID;
                $scope.LoadRelationList(selectedPatient.Gender);
                $scope.PatientData.PatientAddress = selectedPatient.PatientAddress;
                $scope.PatientData.CommunicationAddress = selectedPatient.CommunicationAddress;   //Added by Nayan Kamble on 26/11/2019
                $scope.PatientData.VTID = 0;
                $scope.PatientData.DeptID = 0;
                $scope.PatientData.DOCID = 0;
            }
            selectedPatient.IsNonRegPatientRedirect = false;
        } else {
            //swalMessages.MessageBox("Palash IVF", "Do you want to Register Patient ?", "warning", function (isConfirmed) { //Commented by swatih for localization on 13/7/2020
            swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoyouwanttoRegisterPatient, "warning", function (isConfirmed) {//Modified by swatih for localization on 13/7/2020
                if (isConfirmed) {
                    Common.clearObj();
                    selectedPatient.IsNonRegPatientRedirect = true;
                    Common.setObj(selectedPatient);
                    $location.path('/Registration/');
                } else {
                    $scope.IsPatientSelected = true;
                }
            });



        }
    }


    $scope.LoadRelationList = function LoadRelationList(Gender) {
        debugger;
        var ResponseData = PatientVisitService.LoadRelationList(Gender);
        ResponseData.then(function (Response) {
            $scope.RelationList = Response.data;
            if ($scope.PayerData.RelationId == undefined) {
                $scope.PayerData.RelationId = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    //Get Additional Information
    $scope.GetAdditioalInfo = function GetAdditioalInfo(item) {
        debugger;
        $scope.AddCabinDescription = item.CabinDescription;
        $scope.AddRefDocFullName = item.RefDocFullName;
        $scope.AddVisitNotes = item.VisitNotes;

    };

    //Get visit list of the patient
    $scope.GetVisits = function GetVisits() {
        debugger;
        var Promise = PatientVisitService.GetVisits($scope.selectedPatient.RegID, $scope.selectedPatient.RegUnitID, $scope.CurrentPage1 - 1);
        Promise.then(function (Response) {
            if (Response.data.lstPatientVisit.length > 0) {
                $scope.VisitList = Response.data.lstPatientVisit;
                $scope.VRowsCount = $scope.VisitList[0].VRowsCount;
            } else {
                $scope.VisitList = [];
                $scope.VRowsCount = 0;
            }

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });

    };

    //Get Sponsers list of the patient
    $scope.GetSponsers = function GetSponsers() {
        debugger;
        var Promise = PatientVisitService.GetSponsers($scope.selectedPatient.RegID, $scope.CurrentPage2 - 1);
        Promise.then(function (Response) {
            if (Response.data.ListSponser.length > 0) {
                $scope.SponserList = Response.data.ListSponser;
                $scope.SpRowsCount = $scope.SponserList[0].SpRowsCount;
            } else {
                $scope.SponserList = [];
                $scope.SpRowsCount = 0;
            }

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });

    };

    function validateBankDetails() {
        var isValid = true;
        if (angular.isUndefined($scope.BankData.BankID) || $scope.BankData.BankID == 0) {
            isValid = false;
            //AlertMessage.warning('PalashIVF', 'Select Bank name.');
            AlertMessage.warning(objResource.msgTitle, objResource.msgSelectBankname);
            return isValid;
        }
        if (angular.isUndefined($scope.BankData.BranchName) || $scope.BankData.BranchName == '') {
            isValid = false;
            // AlertMessage.warning('PalashIVF', 'Enter Branch name.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgEnterBranchname);//Modified by swatih for localization on 13/7/2020
            return isValid;
        }
        if (angular.isUndefined($scope.BankData.IFSCCode) || $scope.BankData.IFSCCode == '') {
            isValid = false;
            //AlertMessage.warning('PalashIVF', 'Enter IFSC code.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgEnterIFSCcode);//Modified by swatih for localization on 13/7/2020
            return isValid;
        }
        if (angular.isUndefined($scope.BankData.AccountNo) || $scope.BankData.AccountNo == '' || $scope.BankData.AccountNo == 0) {
            isValid = false;
            //AlertMessage.warning('PalashIVF', 'Enter AccountNo.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgEnterAccountNo);//Modified by swatih for localization on 13/7/2020
            return isValid;
        }

        if (angular.isUndefined($scope.BankData.CustName) || $scope.BankData.CustName == '') {
            isValid = false;
            //AlertMessage.warning('PalashIVF', 'Enter Customer name.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgEnterCustomername);//Modified by swatih for localization on 13/7/2020
            return isValid;
        }
        return isValid;
    };
    $scope.AddBankDetails = function AddBankDetails(BankData) {
        debugger;
        if (validateBankDetails()) {
            if (BankData.AccountType == 1)
                BankData.AccountType = true;
            else
                BankData.AccountType = false;
            if ($scope.frmAddPayer.$valid && $scope.BankData.BankID != 0 && $scope.BankData.BranchName != ''
                && $scope.BankData.CustName != '' && $scope.BankData.AccountNo != 0 && $scope.BankData.IFSCCode != '') {
                if (BankData != undefined) {
                    $scope.lstPatientForSave = [];
                    $scope.lstPatientForSave.push({
                        BankID: $scope.BankData.BankID,
                        BranchName: $scope.BankData.BranchName,
                        IFSCCode: $scope.BankData.IFSCCode,
                        AccountType: $scope.BankData.AccountType,
                        AccountNo: $scope.BankData.AccountNo,
                        CustName: $scope.BankData.CustName,

                    });
                    $scope.ClearAfterBankData();
                }
            }
        } else {

            $scope.frmAddBankDetail.BranchName.$dirty = true;
            $scope.frmAddBankDetail.IFSCCode.$dirty = true;
            $scope.frmAddBankDetail.AccountNo.$dirty = true;
            $scope.frmAddBankDetail.CustName.$dirty = true;
        }
    }
    //To add new sponser
    $scope.AddSponsers = function AddSponsers(PayerData) {
        debugger;
        if ($scope.frmAddPayer.$valid && $scope.PayerData.CatL1ID.CatL1ID != 0
            && $scope.PayerData.CatL2ID.CatL2ID != 0 && $scope.PayerData.TID.TID != 0) {
            if (PayerData != undefined) {
                var CatL2Description = PayerData.CatL2ID.CatL2Description;
                var CatL1Description = PayerData.CatL1ID.CatL1Description;
                var AssComp = PayerData.CompAssID.Description;
                var Comp = PayerData.CompID.Description;
                var Tariff = PayerData.TID.Description;
                var Relation = PayerData.RelationId.Description;

                var hasMatch = false;

                for (var index = 0; index < $scope.SponserList.length; ++index) {
                    var selected = $scope.SponserList[index];

                    if (selected.CatL2Description == CatL2Description &&
                       selected.CatL1Description == CatL1Description &&
                       selected.AssComp == AssComp &&
                       selected.Comp == Comp &&
                       selected.Tariff == Tariff
                    ) {
                        hasMatch = true;
                        AlertMessage.error(objResource.msgTitle, objResource.msgDuplicate);
                        break;
                    }
                }
                if (hasMatch == false) {
                    $scope.SponserList.push({
                        PatSponsorID: $scope.SponserList.length + 1,
                        CatL2Description: CatL2Description,
                        CatL1Description: CatL1Description,
                        AssComp: AssComp,
                        Comp: Comp,
                        Tariff: Tariff,
                        CreditLimit: PayerData.CreditLimit,
                        VFromDate: PayerData.VFromDate,
                        VToDate: PayerData.VToDate,
                        IsStaffDiscount: PayerData.IsStaffDiscount,
                        Relation: Relation,
                        Remark: PayerData.Remark,
                        NewlyAdded: true
                    });
                    $scope.lstSponserForSave.push({
                        PatSponsorID: $scope.lstSponserForSave.length + 1,
                        VisitID: 0, VisitUnitId: 0,
                        CatL1ID: PayerData.CatL1ID.CatL1ID,
                        CompID: PayerData.CompID.CompID,
                        CatL2ID: PayerData.CatL2ID.CatL2ID, CompAssID: PayerData.CompAssID.CompAssID,
                        CreditLimit: PayerData.CreditLimit, VFromDate: new Date(PayerData.VFromDate),
                        VToDate: new Date(PayerData.VToDate), TID: PayerData.TID.TID, IsStaffDiscount: PayerData.IsStaffDiscount,
                        RelationId: PayerData.RelationId.RelationId, Remark: PayerData.Remark,
                        SponserStatus: true,
                        NewlyAdded: true
                    });
                    $scope.ClearAfterAddPayer();
                }
                //$scope.SponserList.push({
                //    PatSponsorID:$scope.SponserList.length+1,
                //    CatL2Description: CatL2Description,
                //    CatL1Description: CatL1Description,
                //    AssComp: AssComp,
                //    Comp: Comp,
                //    Tariff: Tariff
                //});
                //$scope.lstSponserForSave.push({
                //    VisitID: 0, VisitUnitId: 0,
                //    CatL2ID: PayerData.CatL2ID.CatL2ID, CompAssID: PayerData.CompAssID.CompAssID,
                //    CreditLimit: PayerData.CreditLimit, VFromDate:new Date(PayerData.VFromDate),
                //    VToDate: new Date(PayerData.VToDate), TID: PayerData.TID.TID, IsStaffDiscount: PayerData.IsStaffDiscount,
                //    RelationId: PayerData.RelationId, Remark: PayerData.Remark,
                //    SponserStatus: true
                //});
            }
        }
        else {
            $scope.frmAddPayer.CatL1ID.$dirty = true;
            $scope.frmAddPayer.CatL2ID.$dirty = true;
            $scope.frmAddPayer.TID.$dirty = true;
        }

    };

    //To remove sponser from list
    $scope.RemoveSponser = function RemoveSponser(PayerData) {
        debugger;
        if (PayerData != undefined) {
            angular.forEach($scope.SponserList, function (item) {
                if (item.PatSponsorID == PayerData.PatSponsorID) {
                    var indx = $scope.SponserList.indexOf(item);
                    if (indx != undefined) {
                        if (PayerData.NewlyAdded != true) {
                            $scope.lstSponserForSave.push({
                                PatSponsorID: PayerData.PatSponsorID,
                                VisitID: PayerData.VisitID, VisitUnitId: PayerData.VisitUnitId,
                                CatL1ID: PayerData.CatL1ID.CatL1ID,
                                CompID: PayerData.CompID.CompID,
                                CatL2ID: PayerData.CatL2ID.CatL2ID, CompAssID: PayerData.CompAssID.CompAssID,
                                CreditLimit: PayerData.CreditLimit, VFromDate: new Date(PayerData.VFromDate),
                                VToDate: new Date(PayerData.VToDate), TID: PayerData.TID.TID, IsStaffDiscount: PayerData.IsStaffDiscount,
                                RelationId: PayerData.RelationId.RelationId, Remark: PayerData.Remark,
                                SponserStatus: true
                            });
                        }
                        else {
                            angular.forEach($scope.lstSponserForSave, function (item1) {
                                if (item1.PatSponsorID == PayerData.PatSponsorID) {
                                    var indxin = $scope.lstSponserForSave.indexOf(item1);
                                    $scope.lstSponserForSave.splice(indxin, 1);

                                }
                            });

                        }
                        $scope.SponserList.splice(indx, 1);
                    }
                }
            });

            if ($scope.lstSponserForSave.length > 0) {
                angular.forEach($scope.lstSponserForSave, function (item) {
                    if (item.PatSponsorID == PayerData.PatSponsorID) {
                        item.SponserStatus = false;
                    }
                });
            }

            //$scope.lstSponserForSave.push({
            //    VisitID: 0, VisitUnitId: 0,
            //    CatL2ID: PayerData.CatL2ID.CatL2ID, CompAssID: PayerData.CompAssID.CompAssID,
            //    CreditLimit: PayerData.CreditLimit, VFromDate: new Date(PayerData.VFromDate),
            //    VToDate: new Date(PayerData.VToDate), TID: PayerData.TID.TID, IsStaffDiscount: PayerData.IsStaffDiscount,
            //    RelationId: PayerData.RelationId, Remark: PayerData.Remark,
            //    SponserStatus: true
            //});
        }
    };

    //Used to fill gender dropdown.
    $scope.GetDDGenderList = function GetDDGenderList(IsListing) {
        var responseData = DoctorService.GetDDGenderList(IsListing);
        responseData.then(function (Response) {
            $scope.GenderList = Response.data.value;
            if ($scope.DoctorData.GenderId == undefined) {
                $scope.DoctorData.GenderId = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Used to fill Clinic List dropdown. //Added by AniketK on 28/11/2019
    $scope.fillClinicList = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Clinic" });
            $scope.clinicList = Response.data;
            //$scope.PatientData.UnitID = 0;
            $scope.PatientData.UnitID = localStorageService.get("UserInfo").UnitID;
            
        }, function (error) {
        });
    }
    //Added by AniketK on 28/11/2019
    $scope.GetPatientListClinicWise = function (PatientData) {
        debugger;
        if ($scope.PatientData.UnitID == $scope.PatientData.UnitID) {
            $scope.PatientData.UnitID = $scope.PatientData.UnitID;
            $scope.selectedPatientFromPatient = '';
            $scope.IsDisableSearch = true; //Added by AniketK on 28Nov2019
            $scope.GetPatientDetailsFromPatient(false);
        }
    }

    //Used to fill Specialization List dropdown.
    $scope.GetSpecializationList = function GetSpecializationList(IsListing) {
        var responseData = DoctorService.GetSpecializationList(IsListing);
        responseData.then(function (Response) {
            $scope.SpecializationList = Response.data.value;
            if ($scope.DoctorData.SID == undefined) {
                $scope.DoctorData.SID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Get country list 
    $scope.GetCountryCode1 = function GetCountryCode1() {
        $scope.CountryList1 = [];
        var Promise = DoctorService.GetCountryCode($scope.selectedCountry1, false);
        Promise.then(function (Response) {
            $scope.CountryList1 = Response.data.value;
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });

    };

    $scope.SelectedCountry1 = function (selectedCountry1) {
        debugger;
        $scope.selectedCountry1 = selectedCountry1.CountryCode;
        $scope.DoctorData.MobCountryId = selectedCountry1.CountryID;
    }

    //to validate mobile number
    $scope.ValidateMobNumber = function ValidateMobNumber(No) {
        var re = /^[789]\d{9}$/;
        $scope.result1 = re.test(No);
    }

    //to get visit type list for dropdown
    $scope.GetDDVisitTypeList = function GetDDVisitTypeList() {
        $scope.PatientData.Time = new Date().setHours(0, 0, 0, 0);
        //$scope.DocSche.EndTime = new Date().setHours(23, 0, 0, 999);
        var responseData = PatientVisitService.GetDDVisitTypeList();
        responseData.then(function (Response) {
            $scope.VisitTypeList = Response.data;
            if ($scope.PatientData.VTID == undefined) {
                $scope.PatientData.VTID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //to get visit type list for dropdown
    $scope.GetDDCabinList = function GetDDCabinList() {
        var responseData = PatientVisitService.GetDDCabinList();
        responseData.then(function (Response) {
            $scope.CabinList = Response.data;
            if ($scope.PatientData.CabinID == undefined) {
                $scope.PatientData.CabinID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //to get Department list for dropdown
    $scope.GetDDDepartmentList = function GetDDDepartmentList() {
        var responseData = DoctorService.GetDepartmentListForDoc(localStorageService.get("UserInfo").UnitID);
        responseData.then(function (Response) {
            if (Response.data.value.length > 0) {
                $scope.DepartmentList = Response.data.value;
                if ($scope.PatientData.DeptID == undefined) {
                    $scope.PatientData.DeptID = 0;
                }
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }

    //to get Internal Doctor list for dropdown
    $scope.GetInHouseDoctorList = function GetInHouseDoctorList() {
        debugger;
        var responseData = PatientVisitService.GetDoctorList();
        responseData.then(function (Response) {
            $scope.InHouseDoctorList = Response.data;
            if ($scope.PatientData.DOCID == undefined) {
                $scope.PatientData.DOCID = 0;
            }
        }, function (error) {
            AlertMessage.error('Error', error.status);
        });
    };

    //to get External Doctor list for dropdown
    $scope.GetReferralDoctorList = function GetReferralDoctorList() {
        debugger;
        var responseData = PatientVisitService.GetDoctorList();
        responseData.then(function (Response) {
            $scope.ReferralDoctorList = Response.data;
            if ($scope.PatientData.ReferredDoctorID == undefined) {
                $scope.PatientData.ReferredDoctorID = 0;
            }
        }, function (error) {
            AlertMessage.error('Error', error.status);
        });
    };

    //to bind data to dropdowns on add sponser popup
    $scope.GetPayersDD = function GetPayersDD() {
        debugger;
        //Make controls dirty clear
        $scope.frmAddPayer.CatL1ID.$dirty = false
        $scope.frmAddPayer.CatL2ID.$dirty = false;
        $scope.frmAddPayer.TID.$dirty = false;
        //Load DD values
        var promise = PatientVisitService.GetPayersDD();
        promise.then(function (Response) {
            $scope.CategoryList = Response.data.ListCategory;
            $scope.PayerData.CatL2ID = $scope.CategoryList[0];
            $scope.PatientSourceList = Response.data.ListPatientSource;
            $scope.PayerData.CatL1ID = $scope.PatientSourceList[0];
            $scope.CompanyList = Response.data.ListCompany;
            $scope.PayerData.CompID = $scope.CompanyList[0];
            $scope.AssCompanyList = Response.data.ListAssCompany;
            $scope.PayerData.CompAssID = $scope.AssCompanyList[0];
            $scope.TariffList = Response.data.ListTariff;
            $scope.PayerData.TID = $scope.TariffList[0];
            if ($scope.RelationList == undefined) {
                $scope.RelationList = [];
                $scope.RelationList.splice(0, 0, { ID: 0, Description: "Select" });
            }
            $scope.PayerData.RelationId = $scope.RelationList[0];

        }, function (error) {
            AlertMessage.error('Error', error.status);
        });
    };

    //to get patient category on patient source selection
    $scope.GetPatientCatBySrcID = function GetPatientCatBySrcID(CatL1ID) {
        debugger;
        if (CatL1ID > 0) {
            var Promise = PatientVisitService.GetPatientCatBySrcID(CatL1ID);
            Promise.then(function (Response) {
                $scope.CategoryList = Response.data.ListCategory;
                $scope.PayerData.CatL2ID = $scope.CategoryList[0];

            }, function (error) {
                $scope.Message = "Error" + error.status;
            });
        }

    }

    //to get associate company on company selection
    $scope.GetAssCompany = function GetAssCompany(CompID) {
        if (CompID > 0) {
            var Promise = PatientVisitService.GetAssCompany(CompID);
            Promise.then(function (Response) {
                $scope.AssCompanyList = Response.data.ListAssCompany;
                $scope.PayerData.CompAssID = $scope.AssCompanyList[0];

            }, function (error) {
                $scope.Message = "Error" + error.status;
            });
        }

    }

    //to get tariff by associate company 
    $scope.GetTariffByAssCompany = function GetTariffByAssCompany(CompAssID) {
        debugger;
        if (CompAssID > 0) {
            var Promise = PatientVisitService.GetTariffByAssCompany(CompAssID);
            Promise.then(function (Response) {
                $scope.TariffList = Response.data.ListTariff;
                $scope.PayerData.TID = $scope.TariffList[0];

            }, function (error) {
                $scope.Message = "Error" + error.status;
            });
        }

    }

    $scope.GetBankNamesList = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_BankMaster', 'BankID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.BankNamesList = Response.data;
            if ($scope.DoctorData.BankID == undefined)
                $scope.DoctorData.BankID = 0;

        }, function (error) {
            $scope.Error = error;
        });
    };


    //$scope.GetBranchNamesList = function () {
    //    debugger;
    //    var ResponseData = Common.getMasterList('M_BankBranchMaster', 'BankBranchID', 'Description');
    //    ResponseData.then(function (Response) {
    //        Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
    //        $scope.BranchNamesList = Response.data;
    //        if ($scope.DoctorData.BranchID == undefined)
    //            $scope.DoctorData.BranchID = 0;

    //    }, function (error) {
    //        $scope.Error = error;
    //    });
    //};

    //to load dropdown data when page loaded
    $scope.LoadData = function LoadData() {
        debugger;
        $scope.IsDisableSearch = true; //Added by AniketK on 28Nov2019
        $scope.selectedPatientFromPatient = '';
        $scope.GetPatientDetailsFromPatient(false);
       // $scope.GetDocListBYDept(0);

        $scope.fillClinicList(); //Added by AniketK on 28/11/2019        
        $scope.GetDDCabinList();
        $scope.GetReferralDoctorList();
        $scope.GetDDVisitTypeList();
        $scope.GetInHouseDoctorList();


        debugger;
        if (angular.isDefined($rootScope.MarkVisitData)) {
            if ($rootScope.MarkVisitData.IsLoadVisitData) {
                debugger;
                $scope.SelectedPatient($rootScope.MarkVisitData, false);
                if (angular.isDefined(sessionStorage["MRN"])) {  // if block DDED BY UMESH
                    $scope.selectedPatientFromPatient = JSON.parse(sessionStorage.getItem("MRN"));
                    sessionStorage.removeItem("MRN");
                }
                //var Promise = PatientVisitService.GetPatientDetails($scope.selectedPatientFromPatient, false);
                var Promise = PatientVisitService.GetPatientDetails($scope.selectedPatientFromPatient, false, $scope.RegUnitID);
                Promise.then(function (Response) {
                    $scope.PatientList = Response.data.lstPatientAutoComplete;
                    debugger;
                    sessionStorage.setItem("SavedPatientData", JSON.stringify($scope.PatientList[0]));
                    $scope.BindData();
                }, function (error) {
                    $scope.Message = "Error" + error.status;

                });

                if ($rootScope.MarkVisitData.IsFromRegistration) {
                    if (angular.isDefined(Common.getObj)) {
                        var obj = {};
                        obj = Common.getObj();
                        $scope.PatientData.VTID = obj.VisitID;
                        $scope.PatientData.DeptID = obj.DeptID;
                        $scope.PatientData.DOCID = obj.DOCID;
                        $scope.PatientData.APPID = obj.APPID;

                    }
                } else {
                    $scope.PatientData.VTID = $rootScope.MarkVisitData.VisitID;
                    $scope.PatientData.DeptID = $rootScope.MarkVisitData.DeptID;
                    $scope.PatientData.DOCID = $rootScope.MarkVisitData.DOCID;
                    $scope.PatientData.APPID = $rootScope.MarkVisitData.APPID;

                }
                if ($rootScope.IsAppointment == true) {
                    var UserInfo = null;
                    localStorageService.get('UserInfo', { UserInfo: UserInfo });
                }
                else
                    localStorageService.set('UserInfo', { UnitID: 0 });
                

                $rootScope.MarkVisitData.IsLoadVisitData = false
            }
            else {

            }
        }
        $scope.GetDDDepartmentList();
    }


    //To redirect Billing
    $scope.RedirectToBill = function RedirectToBill(PatientData) {
        $rootScope.BillLandingData = PatientData;
        $location.path('/BillLanding/');
    };

    $scope.ClearSaveVisit = function ClearSaveVisit() {    //Added by Nayan Kamble on 11/06/2019
        $scope.disableClick = false;
    }


    //to add visit in database
    $scope.SaveVisit = function SaveVisit(PatientData, IsRedirectToBillling) {
        debugger;
        $scope.disableClick = true;    //Added by Nayan Kamble on 11/06/2019
        var patientData = $scope.PatientData;   //Added by Nayan Kamble on 15/11/2019
        if ($scope.frmPatientVisit.$valid && $scope.PatientData.VTID != 0 && $scope.PatientData.DeptID != 0
            && $scope.PatientData.DOCID != 0 && $filter('date')(PatientData.VisitTime, 'hh') != '00') {
            if (false) {    /* Sponer is must requred validation  */ // removed validation as per mangesh sir discussion
                /*Warning message : Please add payer information*/
                //AlertMessage.warning(objResource.msgTitle, "Please add payer information");//Commented by swatih for localization on 13/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseaddpayerinformation);//Modified by swatih for localization on 13/7/2020
            } else {
                PatientData.VisitTime = $filter('date')(PatientData.VisitTime, 'medium');
                PatientData.lstSponserForSave = $scope.lstSponserForSave;
                PatientData.lstPatientForSave = $scope.lstPatientForSave;
                //PatientData.VisitDate = $filter('date')(PatientData.VisitDate, 'dd/MM/yyyy');

                if (CheckDuplicateVisit(patientData)) {     //Added by Nayan Kamble on 15/11/2019
                    debugger;
                
                var OldDataValue = [];
                for (var i = 0; i < $scope.frmPatientVisit.modifiedModels.length; i++) {
                    if ($scope.frmPatientVisit.modifiedModels[i].masterValue === undefined || $scope.frmPatientVisit.modifiedModels[i].masterValue === null)
                        $scope.frmPatientVisit.modifiedModels[i].masterValue = "";
                    if (typeof ($scope.frmPatientVisit.modifiedModels[i].$viewValue) != "string") {
                        var obj = $scope.frmPatientVisit.modifiedModels[i].$viewValue;
                        var newVal = obj[Object.keys(obj)[0]];
                        var jmodel = {
                            field: $scope.frmPatientVisit.modifiedModels[i].$name,
                            oldvalue: $scope.frmPatientVisit.modifiedModels[i].masterValue.toString(),
                            newvalue: newVal,
                            ID: i
                        };
                    }
                    else {
                        var jmodel = {
                            field: $scope.frmPatientVisit.modifiedModels[i].$name,
                            oldvalue: $scope.frmPatientVisit.modifiedModels[i].masterValue.toString(),
                            newvalue: $scope.frmPatientVisit.modifiedModels[i].$viewValue.toString(),
                            ID: i
                        };
                    }
                    OldDataValue.push(jmodel);
                }
                var Promise = PatientVisitService.SaveVisit(PatientData, OldDataValue);
                Promise.then(function (resp) {
                    if (resp.data.SuccessStatus == 1) {
                        if (resp.data.MRNo != null) {
                            AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                            $rootScope.IsAppointment = false;
                            $scope.IsPatientSelected = true;   // Added by Nayan Kamble on 13/11/2019
                            $scope.ClearSaveVisit();    //Added by Nayan Kamble on 11/06/2019
                        }
                        else {
                            //AlertMessage.warning('PalashIVF', 'Please select Patient.');//Commented by swatih for localization 13/7/2020
                            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseselectpatient);//Modified by swatih for localization
                        }


                        // AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                        if ($scope.PatientDataFromReg != undefined) {
                            if ($scope.PatientData.RegType != undefined && $scope.PatientData.RegType == 2 && $scope.PatientData.RegisteredCategory == 1) {
                                //swalMessages.MessageBox("Palash IVF", "Do You want to Mark Visit For Partner?", "warning", function (isConfirmed) { //Commented by swatih for localization on 13/7/2020
                                swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouwanttoMarkVisitForPartner, "warning", function (isConfirmed) { //Modified by swatih for localization on 13/7/2020
                                    if (isConfirmed) {
                                        debugger;
                                        if (data != undefined) {
                                            $scope.ClearAfterVisit();
                                            $scope.IsHideSearch = true;
                                            $scope.selectedPatientFromPatient = data[1];
                                            $scope.GetPatientDetailsFromPatient(false);
                                        }
                                    } else {

                                        $scope.ClearAfterVisit();
                                    }
                                });
                            }
                            else {
                                $scope.ClearAfterVisit();
                            }
                        }
                        else {
                            $scope.ClearAfterVisit();
                        }
                    }



                    if (IsRedirectToBillling)
                        $scope.RedirectToBill(PatientData);
                },
              function (error) {
                  AlertMessage.error(objResource.msgTitle, objResource.msgError);
              });

                }

            }

        }
        else {
            $scope.frmPatientVisit.VTID.$dirty = true;
            $scope.frmPatientVisit.DeptID.$dirty = true;
            $scope.frmPatientVisit.DOCID.$dirty = true;
            $scope.frmPatientVisit.CabinID.$dirty = true;
            // $scope.frmPatientVisit.Time.$dirty = true;
            //added sujata
                if ($scope.IsPatientSelected == true) {
                    //AlertMessage.error('PalashIVF', 'Please select patient .');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.error(objResource.msgTitle, objResource.msgPleaseselectpatient);//Modified by swatih for localization on 13/7/2020
                }
                else {
                    //AlertMessage.error('PalashIVF', 'Fill all mandatory fields.');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.error(objResource.msgTitle, objResource.msgFillallmandatoryfields);//Modified by swatih for localization on 13/7/2020
                }
            //ended sujata
            
            $scope.ClearSaveVisit();     //Added by Nayan Kamble on 11/06/2019
        }
       
    }

    function CheckDuplicateVisit(patientData) {    ////Added by Nayan Kamble on 15/11/2019
        debugger;
        var isValid = true;
        //if(patientData)
        for (var i=0; i < $scope.VisitList.length; i++) {
            if (patientData.DOCID == $scope.VisitList[i].DOCID && patientData.DeptID == $scope.VisitList[i].DeptID
                && $filter('date')(patientData.VisitDate, 'dd/MM/yyyy') == $filter('date')($scope.VisitList[i].VisitDate, 'dd/MM/yyyy')) {

                //AlertMessage.warning(objResource.msgTitle, 'Visit already marked under same department and doctor.');//Commented by swatih for localization on 13/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgVisitalreadymarkedundersamedepartmentanddoctor);//Modified by swatih for localization on 13/7/2020
                // $scope.ClearSaveVisit();  
                $scope.disableClick = false;
                isValid = false;
                return isValid;
            }
            // $scope.VisitList;
        }
        return isValid;
    }

    //to add doctor in database
    $scope.SaveDoctor = function SaveDoctor(DoctorData) {
        debugger;
        DoctorData.IsReferral = true;

        if ($scope.frmAddDoctor.$valid && DoctorData.SID != 0 && DoctorData.GenderId != 0) {
            var OldDataValue = [];

            //Added by Nayan Kamble on 19/11/2019  START
            for (var i = 0; i < $scope.frmAddDoctor.modifiedModels.length; i++) {
                if ($scope.frmAddDoctor.modifiedModels[i].masterValue === undefined || $scope.frmAddDoctor.modifiedModels[i].masterValue === null)
                    $scope.frmAddDoctor.modifiedModels[i].masterValue = "";
                var jmodel = {
                    field: $scope.frmAddDoctor.modifiedModels[i].$name,
                    oldvalue: $scope.frmAddDoctor.modifiedModels[i].masterValue.toString(),
                    newvalue: $scope.frmAddDoctor.modifiedModels[i].$viewValue.toString(),
                    ID: i
                };
                OldDataValue.push(jmodel);
            }

            //Added by Nayan Kamble on 19/11/2019  END


           // var Promise = DoctorService.Save(DoctorData, OldDataValue);      //DoctorService.Save    SaveExternalDoc
            var Promise = PatientVisitService.SaveExternalDoc(DoctorData, OldDataValue);    //Added by Nayan Kamble on 19/11/2019
            Promise.then(function (resp) {
                if (resp.data == 1) {       //.value
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $scope.ClearAfterDoctor();
                    $scope.GetReferralDoctorList();
                }
                if (resp.data == 5) {   //.value
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.ClearAfterDoctor();
                    $scope.GetReferralDoctorList();
                }
                if (resp.data == 2)    //.value
                    AlertMessage.error(objResource.msgTitle, objResource.msgDuplicate);
                if (resp.data == 3)   //.value
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                if (resp.data == 4) {   //.value
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.ClearAfterDoctor();
                }
                document.getElementById('btnClosePop').click();
            },
          function (error) {
              AlertMessage.error(objResource.msgTitle, objResource.msgError);
          });
        }
        else {
            $scope.frmAddDoctor.$invalid = true;
            $scope.frmAddDoctor.FirstName.$dirty = true;
            $scope.frmAddDoctor.LastName.$dirty = true;
            $scope.frmAddDoctor.GenderId.$dirty = true;
            $scope.frmAddDoctor.SID.$dirty = true;
            $scope.frmAddDoctor.Mobno.$dirty = true;
            $scope.frmAddDoctor.MobCountryCode.$dirty = true;
            if ($scope.frmAddDoctor.$error.pattern != undefined) {
                if ($scope.frmAddDoctor.$error.pattern[0].$name == "Mobno") {
                    AlertMessage.warning(objResource.msgTitle, objResource.lblValidMobNo);
                }
            }
            else {
                AlertMessage.warning(objResource.msgTitle, objResource.lblFillMandatoryFields);
            }
        }
    };

    //to clear popup data after doctor insertion
    $scope.ClearAfterDoctor = function ClearAfterDoctor() {
        $scope.DoctorData = {};
        $scope.selectedCountry1 = null;
        $scope.DoctorData.GenderId = 0;
        $scope.DoctorData.SID = 0;
        $scope.frmAddDoctor.$setPristine();
    }

    //to clear popup data after sponser insertion
    $scope.ClearAfterBankData = function ClearAfterBankData() {
        debugger;
        $scope.PayerData = {};
        document.getElementById('btnBankClosePop').click();
        //$scope.lstBankDetailForSave = [];

    };


    //to clear popup data after sponser insertion
    $scope.ClearAfterAddPayer = function ClearAfterAddPayer() {
        debugger;
        $scope.PayerData = {};
        $scope.PayerData.CatL2ID = $scope.CategoryList[0];
        $scope.PayerData.CatL1ID = $scope.PatientSourceList[0];
        $scope.PayerData.CompID = $scope.CompanyList[0];
        $scope.PayerData.CompAssID = $scope.AssCompanyList[0];
        $scope.PayerData.TID = $scope.TariffList[0];
        $scope.PayerData.RelationId = $scope.RelationList[0];
        document.getElementById('btnPlayerClosePop').click();
    }

    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.open1 = function () {
        $scope.popup1.opened1 = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.open2 = function () {
        $scope.popup2.opened2 = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.open3 = function () {
        $scope.popup3.opened3 = true;
    };

    $scope.popup3 = {
        opened: false
    };

    $scope.dateOptionsDOB = {
        //formatYear: 'yyyy',
        //maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date(),
    };

    //to get token number according to the cabin selected
    $scope.GetTokenNo = function GetTokenNo(CabinID) {
        debugger;
        //if (CabinID > 0) {
        var Promise = PatientVisitService.GetTokenNo(CabinID);
        Promise.then(function (Response) {
            $scope.PatientData.TokenNo = Response.data;
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
        //}
    }

    //clear page data after visit is saved
    $scope.ClearAfterVisit = function ClearAfterVisit() {
        $scope.IsHideSearch = false;
        $scope.PatientData = {};
        $scope.SponserList = [];
        $scope.lstSponserForSave = [];
        $scope.VisitList = [];
        $scope.selectedPatientFromPatient = null;
        $scope.selectedPatientFromApp = null;
        $scope.selectedPatientFromApp = null;
        $rootScope.IsAppointment = false;
        if ($scope.PatientData.VTID == undefined) {
            $scope.PatientData.VTID = 0;
        }
        if ($scope.PatientData.DeptID == undefined) {
            $scope.PatientData.DeptID = 0;
        }
        if ($scope.PatientData.DOCID == undefined) {
            $scope.PatientData.DOCID = 0;
        }
        if ($scope.PatientData.CabinID == undefined) {
            $scope.PatientData.CabinID = 0;
        }
        if ($scope.PatientData.ReferredDoctorID == undefined) {
            $scope.PatientData.ReferredDoctorID = 0;
        }
        $scope.PatientData.VisitDate = new Date();
        $scope.PatientData.VisitTime = new Date();
        $scope.frmPatientVisit.$setPristine();
        srvCommon.aciveTab('liQueue');   // set tab active
        $location.path('/Queue/');

    }
});

//Used for dropdowns which allows searching
PIVF.filter('propsFilter', function () {
    return function (items, props) {      
        var out = [];
        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

PIVF.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
