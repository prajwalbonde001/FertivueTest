'use strict';
angular.module('PIVF').controller('DoctorController', function ($scope, $rootScope, $http, DoctorService, usSpinnerService, $window, $uibModal, StaffService, $location, srvCommon, AlertMessage, Common) {

    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.DoctorList = [];
    $scope.DoctorData = {};
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.items = {};
    $scope.DepartmentListForDoc = [];
    $scope.selectedDepts = [];
    $scope.selectedClassification = [];

    $scope.UnitDeptList = [];
    $scope.DisableGender = {};
    $scope.ButtonName = {};
    $scope.ButtonNameForPopUp = {};
    $scope.DocDOBError = false;
    var objResource = {};
    $scope.DisableDept = true;
    $scope.GenderError = false;
    $scope.DocTypeIDError = false;
    $scope.DocCatIDError = false;
    $scope.SIDError = false;
    $scope.SuIDError = false;
    $scope.MobCountryIdError = false;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;

    //For data binding when language changed.
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    $scope.dropdownSetting = {
        scrollable: true,
        scrollableHeight: '200px',
    }

    $scope.$on('inputModified.formChanged', function (event, modified, formCtrl) {

    });

    $scope.Events = {
        //onItemDeselect: function (item) {
        //  //  $scope.DeptIDToRemove.push(item.id);
        //    //angular.forEach($scope.UnitDeptList, function (item1) {
        //    //    if (item1.DeptID == item.id) {
        //    //        var idx = $scope.UnitDeptList.indexOf(item1);
        //    //        $scope.UnitDeptList.splice(idx, 1);
        //    //    }
        //    //});
        //}
    };

    //Used for paging.
    $scope.PageChange = function PageChange() {

        $scope.GetDoctorList($scope.DoctorData);
    }

    //Get BDM List
    $scope.GetBDMList = function () {
        var ResponseData = Common.GetBDMList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });

            $scope.BDMList = Response.data;
            console.log("BDM", $scope.BDMList)
            if ($scope.DoctorData.BDMID == undefined) {
                $scope.DoctorData.BDMID = 0;
            }

        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }


    //Used for landing page.
    $scope.GetDoctorList = function GetDoctorList(DoctorData) {
        debugger;
        console.log(DoctorData);
        usSpinnerService.spin('GridSpinner');
        $rootScope.FormName = 'Doctor';
        var responseData = DoctorService.GetData($scope.CurrentPage - 1, DoctorData, true);
        responseData.then(function (Response) {
            if (Response.data.value != null && Response.data.value.length > 0) {
                $scope.DoctorList = Response.data.value;
                $scope.TotalItems = $scope.DoctorList[0].RowsCount;
            } else {
                $scope.DoctorList = [];
                $scope.TotalItems = 0;
            }
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            // alert("error" + error.status);
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });

    };

    //Used to clear Advance Search fields
    $scope.ClearSearch = function ClearSearch() {
        //debugger;
        $scope.DoctorData.FirstName = '';
        $scope.DoctorData.SID = 0;
        $scope.DoctorData.Mobno = '';
        $scope.DoctorData.DoctorTypeID = 0;
    }

    //Used to clear Search fields
    $scope.ClearAdvanceSearch = function ClearAdvanceSearch() {
        //debugger;
        $scope.DoctorData.SuID = 0;
        $scope.DoctorData.CFID = 0;
        $scope.DoctorData.UnitID = 0;
        $scope.DoctorData.EmailId = '';
        $scope.DoctorData.RegestrationNumber = '';
        $scope.DoctorData.Education = '';
        $scope.DoctorData.Experience = '';
        $scope.DoctorData.GenderId = 0;
        $scope.DoctorData.DocCatID = 0;
    }

    //Used to redirect to Add Doctor page
    $scope.GoToAddDocotrPage = function GoToAddDocotrPage() {
        $scope.ButtonName = objResource.btnSave;
        $scope.ButtonNameForPopUp = objResource.lblAdd;
        $rootScope.FormName = 'New Doctor';
        $location.path('/AddDoctor/');

    };

    //Used to redirect to Listing page.
    $scope.GoToDocotrListPage = function GoToDocotrListPage() {
        $location.path('/Doctor/');

    };

    //Used to fill gender dropdown.
    $scope.GetDDGenderList = function GetDDGenderList(IsListing) {
        //debugger;
        var responseData = DoctorService.GetDDGenderList(IsListing);
        responseData.then(function (Response) {

            $scope.GenderList = Response.data.value;
            if ($scope.DoctorData.GenderId == undefined) {
                $scope.DoctorData.GenderId = 0;
                // $scope.DoctorData.GenderId = $scope.GenderList[0].GenderId;
            }

        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };



    //Used to fill Unit dropdown.
    $scope.GetDDUnitList = function GetDDUnitList(IsListing) {
        //debugger;
        var responseData = DoctorService.GetDDUnitList(IsListing);
        responseData.then(function (Response) {

            $scope.UnitList = Response.data.value;
            if ($scope.DoctorData.UnitID == undefined) {
                $scope.DoctorData.UnitID = 0;
            }
            else {
                $scope.GetDepartmentListForDoc($scope.DoctorData.UnitID);
            }


        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Used to fill Marital Staus dropdown.
    $scope.GetDDMaritalStatusList = function GetDDMaritalStatusList(IsListing) {

        var responseData = DoctorService.GetDDMaritalStatusList(IsListing);
        responseData.then(function (Response) {

            $scope.MaritalStatusList = Response.data.value;
            console.log("DD", $scope.MaritalStatusList)
            if ($scope.DoctorData.MaritalStatusId == undefined) {
                $scope.DoctorData.MaritalStatusId = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Used to fill State List dropdown.
    $scope.GetStateList1 = function GetStateList1(Filter, CountryID) {
        //debugger;
        var Promise = StaffService.GetStateList(Filter, CountryID);
        Promise.then(function (Response) {
            $scope.StateList1 = Response.data.value;
            //if ($scope.DoctorData.StateID == undefined) {
            //    $scope.DoctorData.StateID = 0;
            //    // $scope.DoctorData.CityID = 0;
            //}
            //else {               
            //    $scope.GetCityList1("", $scope.DoctorData.StateID);
            //}
            var CID = sessionStorage.getItem('CountryID' || 'null');
            if (angular.isDefined(CID)) {
                if (CID != CountryID) {
                    $scope.DoctorData.StateID = 0;
                    $scope.DoctorData.CityID = 0;
                }
                sessionStorage.removeItem('CountryID');
            }
            if (angular.isDefined(DocData) && DocData != null) {
                $scope.DoctorData.StateID = DocData.StateID;
                $scope.GetCityList1("", $scope.DoctorData.StateID);
            }
            else {
                $scope.DoctorData.StateID = 0;
                $scope.DoctorData.CityID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Used to fill State List dropdown.
    $scope.GetStateList2 = function GetStateList2(Filter, CountryID) {

        var Promise = StaffService.GetStateList(Filter, CountryID);
        Promise.then(function (Response) {
            $scope.StateList2 = Response.data.value;

            //if ($scope.DoctorData.AltStateID == undefined) {
            //    $scope.DoctorData.AltStateID = 0;
            //  //  $scope.DoctorData.AltCityID = 0;
            //}
            //else {
            //    $scope.GetCityList2("", $scope.DoctorData.AltStateID);
            //}          

            var ACID = sessionStorage.getItem('AltCountryID' || 'null');
            if (angular.isDefined(ACID)) {
                if (ACID != CountryID) {
                    $scope.DoctorData.AltStateID = 0;
                    $scope.DoctorData.AltCityID = 0;
                }
                sessionStorage.removeItem('AltCountryID');
            }
            if (angular.isDefined(DocData) && DocData != null) {
                $scope.DoctorData.AltStateID = DocData.AltStateID;
                $scope.GetCityList2("", $scope.DoctorData.AltStateID);
            }
            else {
                $scope.DoctorData.AltStateID = 0;
                $scope.DoctorData.AltCityID = 0;
            }


        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Used to fill City List dropdown.
    $scope.GetCityList1 = function GetCityList1(Filter, StateID) {

        var Promise = StaffService.GetCityList(Filter, StateID);
        Promise.then(function (Response) {

            $scope.CityList1 = Response.data.value;
            //if ($scope.DoctorData.CityID == undefined) {
            //    $scope.DoctorData.CityID = 0;
            //}
            if (angular.isDefined(DocData) && DocData != null) {
                $scope.DoctorData.CityID = DocData.CityID;
            }
            else {
                $scope.DoctorData.CityID = 0;
            }
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Used to fill City List dropdown.
    $scope.GetCityList2 = function GetCityList2(Filter, StateID) {

        var Promise = StaffService.GetCityList(Filter, StateID);
        Promise.then(function (Response) {

            $scope.CityList2 = Response.data.value;

            if (angular.isDefined(DocData) && DocData != null) {
                $scope.DoctorData.AltCityID = DocData.AltCityID;
            }
            else {
                $scope.DoctorData.AltCityID = 0;
            }

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Used to fill Doctor Type List dropdown.
    $scope.GetDoctorTypeList = function GetDoctorTypeList(IsListing) {

        var responseData = DoctorService.GetDoctorTypeList(IsListing);
        responseData.then(function (Response) {

            $scope.DoctorTypeList = Response.data.value;
            if ($scope.DoctorData.DocTypeID == undefined) {
                $scope.DoctorData.DocTypeID = 0;
            }

        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Used to fill Doctor Category List dropdown.
    $scope.GetDoctorCategoryList = function GetDoctorCategoryList(IsListing) {

        var responseData = DoctorService.GetDoctorCategoryList(IsListing);
        responseData.then(function (Response) {

            $scope.DoctorCategoryList = Response.data.value;
            if ($scope.DoctorData.DocCatID == undefined) {
                $scope.DoctorData.DocCatID = 0;
            }

        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Used to fill Specialization List dropdown.
    $scope.GetSpecializationList = function GetSpecializationList(IsListing) {
        //debugger;
        var responseData = DoctorService.GetSpecializationList(IsListing);
        responseData.then(function (Response) {

            $scope.SpecializationList = Response.data.value;
            if ($scope.DoctorData.SID == undefined) {
                $scope.DoctorData.SID = 0;
            }
            else {
                $scope.GetSubSpecBySID($scope.DoctorData.SID, IsListing);
            }

        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Binding data while Add & Update
    var DocData;
    $scope.LoadDD = function LoadDD(IsListing) {
        debugger;
        DocData = JSON.parse(sessionStorage.getItem('DocData' || 'null'));

        if (angular.isDefined(DocData) && DocData == null) {
            $scope.ButtonName = objResource.btnSave;
            $scope.ButtonNameForPopUp = objResource.lblAdd;
            $scope.GetDDUnitList(IsListing);
            $scope.GetDDGenderList(IsListing);
            $scope.GetDDMaritalStatusList(IsListing);
            $scope.GetDoctorTypeList(IsListing);
            $scope.GetDoctorCategoryList(IsListing);
            $scope.GetSpecializationList(IsListing);
            $scope.GetSubSpecBySID(0, IsListing);
            $scope.GetDDClassificationList();
            $scope.GetClassificationForListingPage();
            $scope.GetBDMList();
            $scope.GetCountryCode();
            $scope.GetStateList1("", 0);
            $scope.GetStateList2("", 0);
            $scope.GetCityList1("", 0);
            $scope.GetCityList2("", 0);
            $scope.DisableGender = false;
        }
        else {
            $scope.GetDDUnitList(IsListing);
            $scope.ButtonName = objResource.btnUpdate;
            $scope.ButtonNameForPopUp = objResource.btnUpdate;
            $scope.GetDDGenderList(IsListing);
            $scope.GetDDMaritalStatusList(IsListing);
            $scope.GetDoctorTypeList(IsListing);
            $scope.GetDoctorCategoryList(IsListing);
            $scope.GetSpecializationList(IsListing);
            $scope.GetDDClassificationList();
            $scope.GetClassificationForListingPage();
            $scope.GetCountryCode();
            $scope.DisableGender = true;
            $scope.DoctorData = DocData;
            $scope.selectedCountry1 = DocData.CountryName;
            $scope.selectedCountry2 = DocData.AltCountryName;
            if (DocData.DOB != null) {
                $scope.DoctorData.DOB = new Date(DocData.DOB);
            }
            $scope.selectedClassification = DocData.lstClassification;
            $scope.DoctorData.PhotoString = DocData.PhotoString;
            $scope.DoctorData.SignatureString = DocData.SignatureString;
            angular.forEach(DocData.lstUnit, function (item1) {
                $scope.GetDepartmentListForDoc(item1);

            });
            $scope.GetBDMList();
            sessionStorage.removeItem('DocData');
        }

    };

    //Used to fill SubSpecialization List dropdown.
    $scope.GetSubSpecBySID = function GetSubSpecBySID(SID, IsListing) {
        //debugger;
        var Promise = DoctorService.GetSubSpecBySID(SID, IsListing);
        Promise.then(function (Response) {
            //debugger;
            $scope.SubSpecializationList = Response.data.value;
            if ($scope.DoctorData.SuID == undefined) {
                $scope.DoctorData.SuID = 0;
            }

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Used for calculating Age.
    $scope.CalculateAge = function CalculateAge(DOB, keyEvent) {
        if (keyEvent != undefined) {
            if (keyEvent.which === 9)
            { }
            else {
                if (!angular.isUndefined(DOB) && DOB != null) {
                    $scope.DocDOBError = false;
                    var Promise = DoctorService.CalculateAge(DOB);
                    Promise.then(function (Response) {

                        $scope.Agearr = [];
                        $scope.Agearr = Response.data.value.split('/');
                        $scope.DoctorData.AgeYear = parseInt($scope.Agearr[0]);
                        $scope.DoctorData.AgeMonth = parseInt($scope.Agearr[1]);
                        $scope.DoctorData.AgeDays = parseInt($scope.Agearr[2]);

                    }, function (error) {
                        $scope.Message = "Error" + error.status;
                    });
                }
                else {
                    $scope.DoctorData.AgeYear = 0;
                    $scope.DoctorData.AgeMonth = 0;
                    $scope.DoctorData.AgeDays = 0;
                    $scope.DocDOBError = true;
                }
            }
        }
        else {
            if (!angular.isUndefined(DOB) && DOB != null) {
                $scope.DocDOBError = false;
                var Promise = DoctorService.CalculateAge(DOB);
                Promise.then(function (Response) {

                    $scope.Agearr = [];
                    $scope.Agearr = Response.data.value.split('/');
                    $scope.DoctorData.AgeYear = parseInt($scope.Agearr[0]);
                    $scope.DoctorData.AgeMonth = parseInt($scope.Agearr[1]);
                    $scope.DoctorData.AgeDays = parseInt($scope.Agearr[2]);

                }, function (error) {
                    $scope.Message = "Error" + error.status;
                });
            }
            else {
                $scope.DoctorData.AgeYear = 0;
                $scope.DoctorData.AgeMonth = 0;
                $scope.DoctorData.AgeDays = 0;
                $scope.DocDOBError = true;
            }
        }
    };

    //Used for binding country list dropdown.
    $scope.GetCountryCode = function GetCountryCode() {
        var Promise = DoctorService.GetCountryCode("", true);
        Promise.then(function (Response) {

            $scope.CountryListForDD = Response.data.value;
            if (angular.isDefined(DocData) && DocData != null) {
                $scope.DoctorData.CountryID = DocData.CountryID;
                $scope.DoctorData.AltCountryID = DocData.AltCountryID;

                sessionStorage.setItem('CountryID', DocData.CountryID);
                sessionStorage.setItem('AltCountryID', DocData.AltCountryID);

                $scope.GetStateList1("", $scope.DoctorData.CountryID);
                $scope.GetStateList2("", $scope.DoctorData.AltCountryID);
            }
            else {
                $scope.DoctorData.CountryID = 0;
                $scope.DoctorData.AltCountryID = 0;
            }

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Used for binding country code list.
    $scope.GetCountryCode1 = function GetCountryCode1() {
        debugger;
        $scope.CountryList1 = [];
        var Promise = DoctorService.GetCountryCode($scope.selectedCountry1, false);
        Promise.then(function (Response) {
            $scope.CountryList1 = Response.data.value;
            $scope.DoctorData.MobCountryId = 0
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Used for binding country code list.
    $scope.GetCountryCode2 = function GetCountryCode2() {
        $scope.CountryList2 = [];
        var Promise = DoctorService.GetCountryCode($scope.selectedCountry2, false);
        Promise.then(function (Response) {
            $scope.CountryList2 = Response.data.value;
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Bind selected country code
    $scope.SelectedCountry1 = function (selectedCountry1) {

        $scope.selectedCountry1 = selectedCountry1.CountryCode;
        $scope.DoctorData.MobCountryId = selectedCountry1.CountryID;
    }

    //Bind selected country code
    $scope.SelectedCountry2 = function (selectedCountry2) {

        $scope.selectedCountry2 = selectedCountry2.CountryCode;
        $scope.DoctorData.AltMobCountryId = selectedCountry2.CountryID;
    }

    //Used for populating classification list to assign classification
    $scope.GetDDClassificationList = function GetDDClassificationList() {
        //debugger;
        var responseData = DoctorService.GetDDClassificationList(0);
        responseData.then(function (Response) {

            $scope.ClassificationList = Response.data.value;

            if ($scope.DoctorData.lstClassification != undefined && $scope.DoctorData.lstClassification.length > 0) {

                angular.forEach($scope.DoctorData.lstClassification, function (item1) {

                    angular.forEach($scope.ClassificationList, function (item2) {

                        if (item1 == item2.CFID) {
                            item2.IsSelected = true;
                        }
                    })
                })
            }

        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Classification on listing page
    $scope.GetClassificationForListingPage = function GetClassificationForListingPage() {

        var responseData = DoctorService.GetDDClassificationList(1);
        responseData.then(function (Response) {
            $scope.ClassificationListingPage = Response.data.value;
            if ($scope.DoctorData.CFID == undefined) {
                $scope.DoctorData.CFID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Used for saving doctor data.
    $scope.SaveDoctor = function SaveDoctor(DoctorData, FromWhere) {
        debugger;
        if (DoctorData.ReasonForAD != null) {
            var dept = [];
            var unit = [];
            for (var i = 0; i < $scope.UnitDeptList.length; i++) {
                dept.push($scope.UnitDeptList[i].DeptID);
                unit.push($scope.UnitDeptList[i].UnitID);

            }
            DoctorData.SelectedDeparments = dept.join(',');
            DoctorData.SelectedUnits = unit.join(',');
            DoctorData.SelectedClassifications = $scope.selectedClassification.join(',');

            var OldDataValue = [];
            if (FromWhere == 'AddDoctor') {
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
            } else {
                for (var i = 0; i < $scope.frmDocList.modifiedModels.length; i++) {
                    if ($scope.frmDocList.modifiedModels[i].masterValue === undefined || $scope.frmDocList.modifiedModels[i].masterValue === null)
                        $scope.frmDocList.modifiedModels[i].masterValue = "";
                    var jmodel = {
                        field: $scope.frmDocList.modifiedModels[i].$name,
                        oldvalue: $scope.frmDocList.modifiedModels[i].masterValue.toString(),
                        newvalue: $scope.frmDocList.modifiedModels[i].$viewValue.toString(),
                        ID: i
                    };
                    OldDataValue.push(jmodel);
                }
            }
            var Promise = DoctorService.Save(DoctorData, OldDataValue);
            Promise.then(function (resp) {
                if (resp.data.value == 1) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $scope.Clear();
                    $scope.GoToDocotrListPage();
                }
                if (resp.data.value == 5) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.Clear();
                    $scope.GoToDocotrListPage();
                }
                if (resp.data.value == 2)
                    AlertMessage.error(objResource.msgTitle, objResource.msgDuplicate);
                if (resp.data.value == 3)
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                if (resp.data.value == 4) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.DoctorData = {};
                    $scope.GetDoctorList($scope.DoctorData);
                }

            },
          function (error) {
              AlertMessage.error(objResource.msgTitle, objResource.msgError);
          });
        }
      //else if ($scope.frmAddDoctor.$valid && $scope.DoctorData.MobCountryId != 0 && DoctorData.AgeYear != 0 && $scope.result1 != false && $scope.result != false && DoctorData.DocTypeID != 0 && DoctorData.SID != 0 && DoctorData.GenderId != 0 && DoctorData.DocCatID != 0 && DoctorData.SuID != 0) { //Commented and Modified by AniketK on 06Nov2019
        else if ($scope.DoctorData.FirstName != undefined && $scope.DoctorData.LastName != undefined && $scope.DoctorData.MobCountryId != 0 && DoctorData.AgeYear != 0 && $scope.result1 != false && $scope.result != false && DoctorData.DocTypeID != 0 && DoctorData.SID != 0 && DoctorData.GenderId != 0 && DoctorData.DocCatID != 0 && DoctorData.SuID != 0) {
            var dept = [];
            var unit = [];
            for (var i = 0; i < $scope.UnitDeptList.length; i++) {
                dept.push($scope.UnitDeptList[i].DeptID);
                unit.push($scope.UnitDeptList[i].UnitID);
            }
            DoctorData.SelectedDeparments = dept.join(',');
            DoctorData.SelectedClassifications = $scope.selectedClassification.join(',');
            DoctorData.SelectedUnits = unit.join(',');
            DoctorData.SelectedClassifications = $scope.selectedClassification.join(',');
            var OldDataValue = [];

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
            var Promise = DoctorService.Save(DoctorData, OldDataValue);
            Promise.then(function (resp) {
                if (resp.data.value == 1) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $scope.Clear();
                    $scope.GoToDocotrListPage();
                }
                if (resp.data.value == 5) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.Clear();
                    $scope.GoToDocotrListPage();
                }
                if (resp.data.value == 2)
                    AlertMessage.error(objResource.msgTitle, objResource.msgDuplicate);
                if (resp.data.value == 3)
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                if (resp.data.value == 4) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.DoctorData = {};
                    $scope.GetDoctorList($scope.DoctorData);
                }

            },
          function (error) {
              AlertMessage.error(objResource.msgTitle, objResource.msgError);
          });
        }
        else {
            $scope.frmAddDoctor.$invalid = true;
            $scope.frmAddDoctor.FirstName.$dirty = true;
            $scope.frmAddDoctor.LastName.$dirty = true;
            if ($scope.DoctorData.GenderId == 0) {
                $scope.GenderError = true;
            }
            if ($scope.DoctorData.DocTypeID == 0) {
                $scope.DocTypeIDError = true;
            }
            if ($scope.DoctorData.DocCatID == 0) {
                $scope.DocCatIDError = true;
            }
            if ($scope.DoctorData.SID == 0) {
                $scope.SIDError = true;
            }
            if ($scope.DoctorData.SuID == 0) {
                $scope.SuIDError = true;
            }
            if ($scope.DoctorData.MobCountryId == 0 || $scope.DoctorData.MobCountryId == undefined) {
                $scope.MobCountryIdError = true;
            }
            if (DoctorData.AgeYear == 0)
                DoctorData.AgeYear = "";
            $scope.frmAddDoctor.AgeYear.$dirty = true;
            $scope.frmAddDoctor.Mobno.$dirty = true;

            if ($scope.frmAddDoctor.$error.pattern != undefined) {
                if ($scope.frmAddDoctor.$error.pattern[0].$name == "AltMobno" || $scope.frmAddDoctor.$error.pattern[0].$name == "Mobno") {
                    AlertMessage.warning(objResource.msgTitle, objResource.lblValidMobNo);
                }
            }
            else if ($scope.result == false) {
                AlertMessage.warning(objResource.msgTitle, objResource.lblValidEmail);
            }
            else {
                AlertMessage.warning(objResource.msgTitle, objResource.lblFillMandatoryFields);
            }
        }
    };

    //to show browsed image to crop
    var handleFileSelect = function (evt) {

        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

    //to open popup for uploading signature
    $scope.UploadImageSignature = function () {
        var modalInstance = $uibModal.open({         // for open pop up for upload image 
            templateUrl: 'myModal6',
            controller: 'ctrlImage',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            },
            size: 'md',
        })
        modalInstance.result.then(function (items) {     // return here umploaded image

            $scope.DoctorData.SignatureString = items.myCroppedImage;

        })['finally'](function () {
            $scope.modalInstance = undefined  // <--- This fixes
        });;
    }

    //to open popup for uploading doctor photo
    $scope.UploadImageDoctor = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'myModal5',
            controller: 'ctrlImage',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            },
            size: 'md',
        })
        modalInstance.result.then(function (items) {

            $scope.DoctorData.PhotoString = items.myCroppedImage;

        })['finally'](function () {
            $scope.modalInstance = undefined  // <--- This fixes
        });;
    }

    //to open popup for reason for change on listing page
    $scope.ReasonForChange = function (index) {
        $scope.index = index;
        var modalInstance = $uibModal.open({
            templateUrl: 'ReasonModel',
            controller: 'ctrlImage',
            keyboard: false,
            backdrop: false,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            },
            size: 'md',
        })
        modalInstance.result.then(function (items) {     // return here umploaded image
            if (items == "") {
                //$scope.DoctorList[$scope.index].Status = !$scope.DoctorList[$scope.index].Status;
            }
            else {
                $scope.DoctorData = $scope.DoctorList[$scope.index];
                $scope.DoctorData.Status = !$scope.DoctorList[$scope.index].Status;
                $scope.DoctorData.ReasonForAD = items;
                $scope.SaveDoctor($scope.DoctorData, 'DeActivate');
            }

        })['finally'](function () {
            $scope.modalInstance = undefined  // <--- This fixes
        });;
    }

    $scope.CloseAssignClinicPopUp = function CloseAssignClinicPopUp() {
        debugger;
        angular.element(myModal1).modal('hide');
        //$scope.UnitDeptList = [];
    }

    $scope.UnitList=[]; //Added by AniketK on 08Jan2019
    ////Used for filling Department on unit selection on department popup.
    $scope.GetDepartmentListForDoc = function GetDepartmentListForDoc(UnitID) {
        debugger;
        $scope.DepartmentListForDoc = [];

        if (UnitID > 0) {
            $scope.DisableDept = false;
            $scope.DepartmentListForDoc = [];
            //$scope.selectedDepts = [];
            var responseData = DoctorService.GetDepartmentListForDoc(UnitID);
            responseData.then(function (Response) {
                debugger;
                console.log("aa ", Response.data);
                if (Response.data.value.length > 0) {
                    $scope.DepartmentListForDoc = [];
                    Response.data.value.splice(0, 1);
                    angular.forEach(Response.data.value, function (value, index) {
                        $scope.DepartmentListForDoc.push({ id: value.DeptID, label: value.Description });
                    });
                    if ($scope.DoctorData.lstDept != undefined && $scope.DoctorData.lstDept.length > 0) {
                        debugger;
                        angular.forEach($scope.UnitList, function (item1) {
                            if (UnitID == item1.UnitID) {
                                $scope.UnitName = item1.UnitName;
                                $scope.UnitIDforDept = item1.UnitID;
                            }
                        });
                     //angular.forEach($scope.DoctorData.lstDeptStatus, function (item3) {
                         //if (item3.Status == 1) {
                             angular.forEach($scope.DoctorData.lstDept, function (item1) {
                                 angular.forEach($scope.DepartmentListForDoc, function (item2) {
                                     if (item1 == item2.id) {
                                         var hasMatch = false;
                                         for (var index = 0; index < $scope.selectedDepts.length; ++index) {
                                             var animal = $scope.selectedDepts[index];

                                             for (var l = 0; l < $scope.UnitList.length; l++) {
                                                 if (animal.id == item1 && UnitID == animal.UnitID) {
                                                     hasMatch = true;
                                                     break;
                                                 }
                                             }
                                         }
                                         if (hasMatch == false) {
                                             $scope.selectedDepts.push({ id: item1, UnitID: $scope.UnitIDforDept });
                                             //for (var v = 0; v < $scope.UnitDeptList.length; v++) {
                                             //if ($scope.UnitIDforDept == $scope.UnitDeptList[v].UnitID && item1 == $scope.UnitDeptList[v].DeptID) {
                                             $scope.UnitDeptList.push({ UnitName: $scope.UnitName, Description: item2.label, DeptID: item1, UnitID: $scope.UnitIDforDept })
                                             //}
                                             //}
                                         }
                                     }
                                 })
                             })
                         //}
                      //})

                    }
                }
                else {
                    $scope.DepartmentListForDoc = [];
                }

            }, function (error) {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }
    };

    //////Used for filling Department on unit selection on department popup.
    //$scope.GetDepartmentListForDoc = function GetDepartmentListForDoc(UnitID) {
    //    debugger;
    //    $scope.DepartmentListForDoc = [];

    //    if (UnitID > 0) {
    //        $scope.DisableDept = false;
    //        $scope.DepartmentListForDoc = [];
    //        //$scope.selectedDepts = [];
    //        var responseData = DoctorService.GetDepartmentListForDoc(UnitID);
    //        responseData.then(function (Response) {
    //            debugger;
    //            console.log("aa ", Response.data);
    //            if (Response.data.value.length > 0) {
    //                $scope.DepartmentListForDoc = [];
    //                Response.data.value.splice(0, 1);
    //                angular.forEach(Response.data.value, function (value, index) {
    //                    $scope.DepartmentListForDoc.push({ id: value.DeptID, label: value.Description });
    //                });
    //                if ($scope.DoctorData.lstDept != undefined && $scope.DoctorData.lstDept.length > 0) {
    //                    debugger;
    //                    angular.forEach($scope.UnitList, function (item1) {
    //                        if (UnitID == item1.UnitID) {
    //                            $scope.UnitName = item1.UnitName;
    //                            $scope.UnitIDforDept = item1.UnitID;
    //                        }
    //                    });
    //                    angular.forEach($scope.DoctorData.lstDept, function (item1) {
    //                        angular.forEach($scope.DepartmentListForDoc, function (item2) {
    //                            if (item1 == item2.id) {
    //                                var hasMatch = false;
    //                                for (var index = 0; index < $scope.selectedDepts.length; ++index) {
    //                                    var animal = $scope.selectedDepts[index];

    //                                    if (animal.id == item1) {
    //                                        hasMatch = true;
    //                                        break;
    //                                    }
    //                                }
    //                                if (hasMatch == false) {
    //                                    $scope.selectedDepts.push({ id: item1, UnitID: $scope.UnitIDforDept });
    //                                    $scope.UnitDeptList.push({ UnitName: $scope.UnitName, Description: item2.label, DeptID: item1, UnitID: $scope.UnitIDforDept })
    //                                }
    //                            }
    //                        })
    //                    })

    //                }
    //            }
    //            else {
    //                $scope.DepartmentListForDoc = [];
    //            }

    //        }, function (error) {
    //            AlertMessage.error(objResource.msgTitle, objResource.msgError);
    //        });
    //    }
    //};


    //$scope.ListofUnit = [];
    ////Used for filling Department on unit selection on department popup.
    //$scope.GetDepartmentListForDoc = function GetDepartmentListForDoc(UnitID) {
    //    debugger;
    //    $scope.DepartmentListForDoc = [];

    //    $scope.ListofUnit.push({ UnitID: UnitID })

    //    if (UnitID > 0) {
    //        $scope.DisableDept = false;
    //        $scope.DepartmentListForDoc = [];
    //        //$scope.selectedDepts = [];
    //        var responseData = DoctorService.GetDepartmentListForDoc(UnitID);
    //        responseData.then(function (Response) {
    //            debugger;
    //            console.log("aa ", Response.data);
    //            if (Response.data.value.length > 0) {
    //                $scope.DepartmentListForDoc = [];
    //                Response.data.value.splice(0, 1);
    //                angular.forEach(Response.data.value, function (value, index) {
    //                    $scope.DepartmentListForDoc.push({ id: value.DeptID, label: value.Description });
    //                });
    //                if ($scope.DoctorData.lstDept != undefined && $scope.DoctorData.lstDept.length > 0) {
    //                    debugger;
    //                    for (var i = 0 ; i < $scope.ListofUnit.length; i++) { //Begin
    //                        //angular.forEach($scope.UnitList, function (item1) {
    //                        for (var j = 0 ; j < $scope.UnitList.length; j++) {
    //                            if ($scope.ListofUnit[i].UnitID == $scope.UnitList[j].UnitID) {
    //                                $scope.UnitName = $scope.UnitList[j].UnitName;
    //                                $scope.UnitIDforDept = $scope.UnitList[j].UnitID;
    //                            }
    //                           }
    //                            //});
    //                            angular.forEach($scope.DoctorData.lstDept, function (item1) {
    //                                angular.forEach($scope.DepartmentListForDoc, function (item2) {
    //                                    if (item1 == item2.id) {
    //                                        var hasMatch = false;
    //                                        for (var index = 0; index < $scope.selectedDepts.length; ++index) {
    //                                            var animal = $scope.selectedDepts[index];

    //                                            //if (animal.id == item1) {
    //                                            if (animal.id == item1 && $scope.ListofUnit[i].UnitID == $scope.UnitList[j].UnitID) {
    //                                                hasMatch = false;
    //                                                break;
    //                                            }
    //                                        }
    //                                        if (hasMatch == false) {
    //                                            $scope.selectedDepts.push({ id: item1, UnitID: $scope.UnitIDforDept });
    //                                            $scope.UnitDeptList.push({ UnitName: $scope.UnitName, Description: item2.label, DeptID: item1, UnitID: $scope.UnitIDforDept })
    //                                        }
    //                                    }
    //                                })
    //                            })

    //                        }
    //                    //}
    //                }//End
    //            } 
    //            else {
    //                $scope.DepartmentListForDoc = [];
    //            }

    //        }, function (error) {
    //            AlertMessage.error(objResource.msgTitle, objResource.msgError);
    //        });
    //    }
    //};

    //to populate selected department according to unit   
    $scope.UnitName = {};
    $scope.FormUnitDeptList = function FormUnitDeptList(UnitID, selectedDepts) {

        debugger;
        for (var i = 0; i < $scope.UnitDeptList.length; ++i) {
            for (var j = 0 ; j < $scope.selectedDepts.length; j++) {
                if ($scope.UnitDeptList[i].UnitID == $scope.selectedDepts[j].UnitID && $scope.UnitDeptList[i].DeptID != $scope.selectedDepts[j].id) {
                    $scope.UnitDeptList.splice(i, 1);
                    $scope.UnitDeptList = $scope.UnitDeptList;
                    i = -1;
                    j = -1;
                }
            }
            if ($scope.selectedDepts == 0 && UnitID == $scope.UnitDeptList[i].UnitID) {
                $scope.UnitDeptList.splice(i, 1);
                $scope.UnitDeptList = $scope.UnitDeptList;
                i--;
            }
        }
        if ($scope.UnitDeptList == 0) {

        }

        $scope.DepartmentListForDoc = $scope.DepartmentListForDoc;
        angular.forEach($scope.UnitList, function (item1) {
            if (UnitID == item1.UnitID) {
                $scope.UnitName = item1.UnitName;
                $scope.UnitIDforDept = item1.UnitID;
            }
        });
        //if (selectedDepts.length == 0)
           // $scope.UnitDeptList = [];

        //if ($scope.UnitDeptList.length > 0 && selectedDepts.length > 0)//&& $scope.UnitDeptList.length != selectedDepts.length
        if ($scope.UnitDeptList.length != selectedDepts.length)//Commmented and Modified by AniketK on 06Jan2019
        {
            $scope.UnitDeptListCopy = [];

            angular.forEach(selectedDepts, function (item1) {
                angular.forEach($scope.UnitDeptList, function (item2) {
                    if (item1.id == item2.DeptID && item1.UnitID == item2.UnitID) {
                        if ($scope.UnitDeptListCopy.length == 0)
                            $scope.UnitDeptListCopy.push(item2)
                        else {
                            angular.forEach($scope.UnitDeptListCopy, function (item3) {
                                if (item3.DeptID != item2.DeptID) {
                                    $scope.UnitDeptListCopy.push(item2)
                                }
                            })
                        }
                    }
                })
            })
            //angular.copy($scope.UnitDeptListCopy, $scope.UnitDeptList); //Commented and Modified by AniketK on 06Jan2019 for reference
            $scope.UnitDeptListCopy = $scope.UnitDeptList;


            //angular.copy($scope.UnitDeptList, $scope.UnitDeptListCopy);
            //angular.forEach(selectedDepts, function (item1) {
            //    angular.forEach($scope.UnitDeptList, function (item2) {
            //        if (item2.UnitName == $scope.UnitName) {
            //            if (item2.DeptID != item1.id && item2.UnitID == item1.UnitID) {
            //                var idx = $scope.UnitDeptListCopy.indexOf(item2);
            //                $scope.UnitDeptListCopy.splice(idx, 1);

            //            }
            //        }
            //    })
            //})
            //angular.copy($scope.UnitDeptListCopy, $scope.UnitDeptList);


            //angular.forEach(selectedDepts, function (item1) {
            //    angular.forEach($scope.UnitDeptList, function (item2) {
            //        if (item2.UnitName == $scope.UnitName) {
            //            if (item2.DeptID != item1.id) {
            //                var idx = $scope.UnitDeptList.indexOf(item2);
            //                $scope.UnitDeptList.splice(idx, 1);
            //            }
            //        }
            //    })
            //})
        }

        angular.forEach($scope.DepartmentListForDoc, function (item2) {
            angular.forEach(selectedDepts, function (item) {
                if (item2.id == item.id) {
                    var hasMatch = false;
                    for (var index = 0; index < $scope.UnitDeptList.length; ++index) {
                        var animal = $scope.UnitDeptList[index];
                        //if (animal.DeptID == item.id) { //Commented by AniketK on 07Jan2019
                        for (var k = 0; k < $scope.UnitDeptListCopy.length; k++) { //Added by AniketK on 07Jan2019
                            if (animal.DeptID == item.id && UnitID == $scope.UnitDeptListCopy[k].UnitID) {
                                hasMatch = true;
                                break;
                            }
                        }//Added by AniketK on 07Jan2019
                    }
                    if (hasMatch == false) {
                        debugger;
                        $scope.UnitDeptList.push({ UnitName: $scope.UnitName, Description: item2.label, DeptID: item.id, UnitID: $scope.UnitIDforDept })
                    }
                }
            })

        });

    };

    //to insert/delete data from classification list for saving
    var selectedClassification = '';
    $scope.toggleSelectionClassi = function toggleSelectionClassi(CFID) {

        var idx = $scope.selectedClassification.indexOf(CFID);

        if (idx > -1) {
            $scope.selectedClassification.splice(idx, 1);
        }
        else {
            $scope.selectedClassification.push(CFID);
        }
    }

    //to get data of specific doctor while edit
    $scope.GetSpecificDoctor = function GetSpecificDoctor(DOCID) {
        debugger;
        var IsListing = true;
        $scope.LoadDD(IsListing);
        $scope.DisableGender = true;
        var Promise = DoctorService.GetSpecificDoctor(DOCID);
        Promise.then(function (Response) {
            console.log('DocData', JSON.stringify(Response.data))
            sessionStorage.setItem('DocData', JSON.stringify(Response.data));
            sessionStorage.setItem('OldData', JSON.stringify(Response.data));//Get Specific oldData  Against Doctor

            $scope.GoToAddDocotrPage();
            $rootScope.FormName = 'View/Edit Doctor';

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

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

    $scope.dateOptionsDOB = {
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    //to clear DOB data
    $scope.ClearDOB = function () {
        $scope.DoctorData.AgeMonth = 0;
        $scope.DoctorData.AgeDays = 0;
        $scope.DoctorData.DOB = null;
    }

    //clear data after save & edit
    $scope.Clear = function Clear() {
        $scope.DoctorList = [];
        $scope.DoctorData = {};
        $scope.items = {};
        $scope.selectedDepts = [];
        $scope.selectedClassification = [];
        $scope.DepartmentListForDoc = [];
        $scope.UnitDeptList = [];

        if (sessionStorage['DocData'] != undefined) {
            sessionStorage.removeItem('DocData');
        }
        $scope.selectedCountry1 = null;
        $scope.selectedCountry2 = null;
        $scope.myImage = null;
        $scope.myCroppedImage = null;
        $scope.DisableGender = false;

        $scope.DoctorData.GenderId = 0;
        $scope.DoctorData.MaritalStatusId = 0;
        $scope.DoctorData.DocTypeID = 0;
        $scope.DoctorData.DocCatID = 0;
        $scope.DoctorData.SID = 0;
        $scope.DoctorData.SuID = 0;
        $scope.DoctorData.CountryID = 0;
        $scope.DoctorData.AltCountryID = 0;
        $scope.DoctorData.StateID = 0;
        $scope.DoctorData.AltStateID = 0;
        $scope.DoctorData.CityID = 0;
        $scope.DoctorData.AltCityID = 0;
        $scope.DoctorData.BDMID = 0;

        $scope.GetDDClassificationList();

        $scope.frmAddDoctor.$setPristine();


        // $scope.LoadDD
        //  $window.location.reload();

    };

    //to validate email address
    $scope.ValidateEmail = function ValidateEmail(email) {
        if (email == undefined || email == "") {
            $scope.result = true;
        }
        else {
            var re = /\S+@\S+\.\S+/;
            $scope.result = re.test(email);
        }
    }

    //to validate mobile number
    $scope.ValidateMobNumber = function ValidateMobNumber(No) {
        var re = /^\d{1,15}$/;
        $scope.result1 = re.test(No);
    }

    //to validate alt mobile number
    $scope.ValidateAltMobNumber = function ValidateAltMobNumber(No) {
        var re = /^\d{1,15}$/;
        $scope.result2 = re.test(No);
    }

    //to export data to excel
    $scope.exportToExcel = function exportToExcel(tableId, $event) {
        if ($event.srcElement.className == "glyphicon glyphicon-print") {
            var Promise = DoctorService.GetDataExport($scope.CurrentPage - 1, $scope.DoctorData, false);
            Promise.then(function (Response) {
                var filteredData = _.map(Response.data.value, function (data) {

                    var users = {
                        'Name': data.FullName,
                        'Specialization': data.SpecializationDesc,
                        'SubSpecialization': data.SubSpecializationDesc,
                        'Gender': data.GenderDesc,
                        'Doctor Type': data.DocTypeDescription,
                        'Doctor Category': data.DocCatDesc,
                        'Classification': data.Classification,
                    }
                    return users;
                });

                alasql('SELECT * INTO XLSX("DoctorList.xlsx",{headers:true}) FROM ?', [filteredData]);
            },
                function (error) {
                    $scope.Message = "Error" + error.status;
                });
        }
    }

    //to set conditions to enable & disable department dropdown on popup for save
    $scope.OnAddPopUpClick = function OnAddPopUpClick() {
        debugger;
        $scope.DisableDept = true;
        $scope.DoctorData.UnitID = 0;
        $scope.selectedDepts = []; //Added by AniketK on 12Nov2019
        $scope.GetDepartmentListForDoc(0);
    };

    //to set conditions to enable & disable department dropdown on popup for edit
    $scope.OnEditPopUpClick = function OnEditPopUpClick(UnitName) {
        debugger;
        $scope.selectedDepts = []; //Added by AniketK on 12Nov2019
        for (var i = 0; i < $scope.UnitDeptList.length; i++) {
            if (UnitName == $scope.UnitDeptList[i].UnitName) {
                //$scope.UnitDeptList[i] = 0;
                //const index = $scope.UnitDeptList.indexOf(i);
                //if (index > -1) {
                //    $scope.UnitDeptList.splice(index, 1);
                //    $scope.UnitDeptList = $scope.UnitDeptList;
                //}
                $scope.UnitDeptList.splice(i, 1);
                $scope.UnitDeptList = $scope.UnitDeptList;
                i = -1;
            }
        }
        var UID;
        angular.forEach($scope.UnitList, function (item1) {
            if (UnitName == item1.UnitName) {
                UID = item1.UnitID;
            }
        });
        if (angular.isDefined(UID)) {
            $scope.DoctorData.UnitID = UID;
            $scope.GetDepartmentListForDoc(UID);
        };
    }

    //to hide manual error message.
    $scope.HideErrorMessage = function (field, ID) {
        if (field == 'GenderId') {
            if (!angular.isUndefined(ID) && ID > 0) {
                $scope.GenderError = false;
            } else {
                $scope.GenderError = true;
            }
        }
        if (field == 'DocTypeID') {
            if (!angular.isUndefined(ID) && ID > 0) {
                $scope.DocTypeIDError = false;
            } else {
                $scope.DocTypeIDError = true;
            }
        }
        if (field == 'DocCatID') {
            if (!angular.isUndefined(ID) && ID > 0) {
                $scope.DocCatIDError = false;
            } else {
                $scope.DocCatIDError = true;
            }
        }
        if (field == 'SID') {
            if (!angular.isUndefined(ID) && ID > 0) {
                $scope.SIDError = false;
            } else {
                $scope.SIDError = true;
            }
        }
        if (field == 'SuID') {
            if (!angular.isUndefined(ID) && ID > 0) {
                $scope.SuIDError = false;
            } else {
                $scope.SuIDError = true;
            }
        }
        if (field == 'MobCountryCode') {
            if (!angular.isUndefined(ID)) {
                $scope.MobCountryIdError = false;
            } else {
                $scope.MobCountryIdError = true;
            }
        }
    }

});

//Used for image popups
angular.module('PIVF').controller('ctrlImage', function ($scope, $uibModalInstance, items) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.ShowGallery = {};
    $scope.ShowCapture = {};

    $scope.items = { myCroppedImage: '' };

    var _video = null,
   patData = null;

    $scope.patOpts = { x: 0, y: 0, w: 25, h: 25 };

    // Setup a channel to receive a video property
    // with a reference to the video element
    // See the HTML binding in main.html
    $scope.channel = {};

    $scope.webcamError = false;
    $scope.onError = function (err) {
        $scope.$apply(
            function () {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onSuccess = function () {
        // The video element contains the captured camera data
        _video = $scope.channel.video;
        $scope.$apply(function () {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
        });
    };

    $scope.onStream = function (stream) {
        // You could do something manually with the stream.
    };

    $scope.makeSnapshot = function () {
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            sendSnapshotToServer(patCanvas.toDataURL());

            patData = idata;
        }
    };

    /**
     * Redirect the browser to the URL given.
     * Used to download the image by passing a dataURL string
     */
    $scope.downloadSnapshot = function downloadSnapshot(dataURL) {
        window.location.href = dataURL;
    };

    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    /**
     * This function could be used to send the image data
     * to a backend server that expects base64 encoded images.
     *
     * In this example, we simply store it in the scope for display.
     */
    var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
        $scope.myImage = imgBase64;
    };


    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };

    $scope.init = function () {
        var file = angular.element(document.getElementById("fileInput"));
        file.on('change', handleFileSelect)
        $scope.ShowGallery = false;
        $scope.ShowCapture = false;
    }

    $scope.CancelOk = function (myImageCrop) {
        if ((!angular.isUndefined(myImageCrop) || myImageCrop != undefined) && myImageCrop != "") {
            $scope.items.myCroppedImage = myImageCrop;
            $uibModalInstance.close($scope.items);
        }
    };

    $scope.ClosePopUp = function ClosePopUp() {
        $uibModalInstance.close("");
    }

    $scope.HideShowDiv1 = function HideShowDiv1(ShowGallery) {
        if (ShowGallery == true) {
            $scope.ShowGallery = false;
        }
        else {
            $scope.ShowGallery = true;
            $scope.ShowCapture = false;
        }
    }

    $scope.HideShowDiv2 = function HideShowDiv2(ShowCapture) {
        if (ShowCapture == true) {
            $scope.ShowCapture = false;
        }
        else {
            $scope.ShowCapture = true;
            $scope.ShowGallery = false;
        }
    }

    $scope.ReasonOk = function (Reason) {
        $uibModalInstance.close(Reason);
    };
});

