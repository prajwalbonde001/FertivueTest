'use strict';

angular.module('PIVF').controller('StaffController', function ($scope, DoctorService, StaffService, $uibModal, usSpinnerService, $location, AlertMessage, srvCommon, swalMessages, $rootScope, Common) {
    $scope.maxSize = 5;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $scope.CurrentPage = 1;
    $scope.Staff = {};
    $scope.SL = {};
    $scope.myImage = '';
    $scope.Staff.MobCountryCode = 0;
    $scope.myCroppedImage = '';
    $scope.items = {};
    var objStaff = {};
    $scope.StaffDOBError = false;
    $scope.result1 = true;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    debugger;
    if ($rootScope.IsEdit == false)
        $rootScope.FormName = 'Staff';
    if ($rootScope.IsEdit == true)
        $rootScope.IsEdit = false;

    $scope.PageChange = function PageChange() {
        $scope.StaffList = [];
        $scope.GetStaffList($scope.SL.Name, $scope.SL.DeptID, $scope.SL.MobNo, $scope.SL.EID, $scope.SL.DegID, $scope.SL.Qua, $scope.SL.Exp, $scope.SL.EmailID, $scope.SL.MID, $scope.SL.GId);
    }

    $scope.NewStaffPge = function NewStaffPge() {
        $scope.btnText = objResource.btnSave;
        $rootScope.IsEdit = true;
        $rootScope.FormName = 'New Staff';
        // var url = "http://" + $window.location.host + "/Staff/NewStaff";
        // $window.location.href = url;
        $location.path('/NewStaff/');
    };

    $scope.OnEditStaffPage = function OnEditStaffPage(Staff) {
        debugger;
        $rootScope.IsEdit = true;
        $rootScope.FormName = 'View/Edit Staff';
        $scope.GetStaffByID(Staff.StaffID)
        //$location.path('/NewStaff/');
    };

    //Begin:: Added by AniketK on 29Jan2020
    $scope.$watch('Staff.AgeYr', function (newValue) {
        debugger;
        //$scope.IsFromPatientDOB = false;
        if (angular.isString(newValue)) {
            if ($scope.isView) {
                var birthDate = moment().subtract(newValue, 'years');
                $scope.Staff.DOB = birthDate.format("YYYY-MM-DD");
            }
            else {
                var birthDate = moment().subtract(newValue, 'years');
                $scope.Staff.DOB = birthDate.format("YYYY-MM-DD");
            }
        }
        if ($scope.Staff.AgeYr > 0 && $scope.Staff.AgeYr != null) {
            angular.element(StaffDOB).prop('disabled', false);
            //if ($scope.IsFromPatientDOB == false)
            //angular.element(StaffDOB).prop('value', $scope.Staff.DOB);
            $scope.birthDate = moment().subtract(newValue, 'years');
            $scope.Staff.DOB = birthDate.format("YYYY-MM-DD");
            angular.element(StaffDOB).prop('value', $scope.Staff.DOB);

        }
    });
    //End:: Added by AniketK on 29Jan2020

    $scope.LoadData = function () {
          debugger;
        objStaff = JSON.parse(sessionStorage.getItem('EditStaff'));
        if (angular.isDefined(objStaff) && objStaff == null) {
            $scope.GetCountryCodeList();
            $scope.GetStateList1("", 0);
            $scope.GetCityList1("", 0);
            $scope.GetStateList2("", 0);
            $scope.GetCityList2("", 0);
            $scope.GetDesignationList(false);
            //$scope.GetDepartmentListForStaff(0, false);
            $scope.GetDepartmentList();
            $scope.GetGenderList(false);
            $scope.GetMarryStatusList(false);
            $scope.btnText = objResource.btnSave;
        }

        else {

            $scope.Staff = objStaff;
            //console.log("$scope.Staff ", $scope.Staff);
            //  if (objStaff.DOB == null) { objStaff.DOB = new Date(null); }
            if (objStaff.DOB != null) {
                $scope.Staff.DOB = new Date(objStaff.DOB);
            }
            $scope.GetCountryCodeList();
            $scope.GetDesignationList(false);
            //$scope.GetDepartmentListForStaff(0, false);
            $scope.GetDepartmentList();
            $scope.GetGenderList(false);
            $scope.GetMarryStatusList(false);
            $scope.GetCountryCode1();
            $scope.GetCountryCode2();
            //   $scope.Staff.DOB = new Date(objStaff.DOB);
            $scope.btnText = objResource.btnUpdate;
            sessionStorage.removeItem('EditStaff');
        }

    };

    $scope.GetDesignationList = function GetDesignationList(flag) {
        debugger;
        var Promise = StaffService.GetDesignationList(flag);
        Promise.then(function (Response) {
            $scope.DegList = Response.data.value;
            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.DegID = objStaff.DegID;
                $scope.SL.DegID = 0;
            } else {
                $scope.Staff.DegID = $scope.DegList[0].DegID;
                $scope.SL.DegID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetGenderList = function GetGenderList(flag) {
        DoctorService.GetDDGenderList(flag).then(function (result) {
            $scope.GenderList = result.data.value;
            //debugger;
            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.GenderId = objStaff.GenderId;
                $scope.SL.GId = 0;
            } else {
                $scope.Staff.GenderId = $scope.GenderList[0].GenderId;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetMarryStatusList = function GetMarryStatusList(flag) {
        DoctorService.GetDDMaritalStatusList(flag).then(function (response) {
            $scope.MaritalStatusList = response.data.value;
            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.MaritalStatusId = objStaff.MaritalStatusId;
                $scope.SL.MID = 0;
            } else {
                $scope.Staff.MaritalStatusId = 0;
            }

        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetCountryCodeList = function GetCountryCodeList() {
        DoctorService.GetCountryCode('', true).then(function (value1) {
            //    debugger;
            $scope.CountryCodeList = value1.data.value;
            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.CountryID = objStaff.CountryID;
                $scope.Staff.AltCountryID = objStaff.AltCountryID;

                sessionStorage.setItem('CountryID', objStaff.CountryID);
                sessionStorage.setItem('AltCountryID', objStaff.AltCountryID);

                $scope.GetStateList1("", objStaff.CountryID);
                $scope.GetStateList2("", objStaff.AltCountryID);

                angular.forEach($scope.CountryCodeList, function (item) {
                    // debugger;
                    if (item.CountryCode == objStaff.MobCountryCode && objStaff.MobCountryCode != 0) {
                        $scope.selectedCountry1 = item;
                        $scope.SelectedCountry1($scope.selectedCountry1);

                    }
                    if (item.CountryCode == objStaff.AltMobCountryCode && objStaff.AltMobCountryCode != 0) {
                        //    debugger;
                        $scope.selectedCountry2 = item;
                        $scope.SelectedCountry2($scope.selectedCountry2);
                    }
                })

            }
            else {
                $scope.Staff.CountryID = 0;
                $scope.Staff.AltCountryID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetStaffList = function GetStaffList(N, DptID, mobno, EID, DegID, Qua, Exp, EmailID, MID, GId) {
        //   debugger;
        usSpinnerService.spin('GridSpinner');
        var Promise = StaffService.StaffList($scope.CurrentPage - 1, N, DptID, mobno, EID, DegID, Qua, Exp, EmailID, MID, GId, true);
        Promise.then(function (Response) {
            //debugger;

            if (Response.data.value != null && Response.data.value.length > 0) {
                $scope.StaffList = Response.data.value;
                $scope.TotalRecords = $scope.StaffList[0].TotalRecords;
                $scope.TotalItems = $scope.StaffList[0].TotalRecords;
            }
            else {
                $scope.StaffList = [];
                $scope.TotalRecords = 0;
                $scope.TotalItems = 0;
            }
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetStaffByID = function GetStaffByID(StaffID) {
        debugger;
        var Promise = StaffService.GetStaffByID(StaffID);
        Promise.then(function (Response) {
            //debugger;
            if (Response.data != null) {
                console.log(JSON.stringify(Response.data));
                sessionStorage.setItem('EditStaff', JSON.stringify(Response.data))
                sessionStorage.setItem('OldData', JSON.stringify(Response.data));//Get Specific oldData  Against Staff
                $location.path('/NewStaff/');

            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };


    $scope.GetDepartmentList = function GetDepartmentList() {
        debugger;
        var Response = Common.GetDepartmentList();
        Response.then(function (resp) {
            resp.data.splice(0, 0, { ID: 0, Description: 'Department' })
            $scope.DepartmentList = resp.data;
            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.DeptID = objStaff.DeptID;;
            }
            else {
                $scope.Staff.DeptID = $scope.DepartmentList[0].ID;
                //  $scope.SearchStaffList.DeptID = 0;
            }
            $scope.SL.DeptID = 0;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };



    //$scope.GetDepartmentListForStaff = function GetDepartmentListForStaff(UID, flag) {
    //   debugger;
    //    var Promise = StaffService.GetDepartmentListForStaff(0, flag);
    //    Promise.then(function (Response) {
    //        $scope.DepartmentList = Response.data.value;
    //        if (angular.isDefined(objStaff) && objStaff != null) {
    //            $scope.Staff.DeptID = objStaff.DeptID;;
    //        }
    //        else {
    //            $scope.Staff.DeptID = $scope.DepartmentList[0].DeptID;
    //            //  $scope.SearchStaffList.DeptID = 0;
    //        }
    //        $scope.SL.DeptID = 0;
    //    }, function (error) {
    //        AlertMessage.error(objResource.msgTitle, objResource.msgError);
    //    });
    //};

    $scope.GetStateList1 = function GetStateList1(Filter, CountryID) {
        //debugger;
        var Promise = StaffService.GetStateList(Filter, CountryID);
        Promise.then(function (Response) {
            $scope.StateList1 = Response.data.value;
            var CID = sessionStorage.getItem('CountryID' || 'null');
            if (angular.isDefined(CID)) {
                if (CID != CountryID) {
                    $scope.Staff.StateID = 0;
                    $scope.Staff.CityID = 0;
                }
                sessionStorage.removeItem('CountryID');
            }
            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.StateID = objStaff.StateID;
                $scope.GetCityList1('', objStaff.StateID);
            }
            else {
                $scope.Staff.StateID = 0;
                $scope.Staff.CityID = 0;
            }




        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetStateList2 = function GetStateList2(Filter, CountryID) {
        //debugger;
        var Promise = StaffService.GetStateList(Filter, CountryID);
        Promise.then(function (Response) {
            $scope.StateList2 = Response.data.value;
            var ACID = sessionStorage.getItem('AltCountryID' || 'null');
            if (angular.isDefined(ACID)) {
                if (ACID != CountryID) {
                    $scope.Staff.AltStateID = 0;
                    $scope.Staff.AltCityID = 0;
                }
                sessionStorage.removeItem('AltCountryID');
            }
            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.AltStateID = objStaff.AltStateID;
                $scope.GetCityList2('', objStaff.AltStateID);
            }
            else {
                $scope.Staff.AltStateID = 0;
                $scope.Staff.AltCityID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetCityList1 = function GetCityList1(Filter, StateID) {
        //   //debugger;
        var Promise = StaffService.GetCityList(Filter, StateID);
        Promise.then(function (Response) {
            $scope.CityList1 = Response.data.value;
            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.CityID = objStaff.CityID;
            }
            else {
                $scope.Staff.CityID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetCityList2 = function GetCityList2(Filter, StateID) {
        //  //debugger;
        var Promise = StaffService.GetCityList(Filter, StateID);
        Promise.then(function (Response) {

            $scope.CityList2 = Response.data.value;

            if (angular.isDefined(objStaff) && objStaff != null) {
                $scope.Staff.AltCityID = objStaff.AltCityID;
            }
            else {
                $scope.Staff.AltCityID = 0;
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.CalculateAge = function CalculateAge(DOB, keyEvent) {
        //debugger;
        //if (!angular.isUndefined(DOB) && DOB != null) {
        //    $scope.StaffDOBError = false;
        //    var Promise = DoctorService.CalculateAge(DOB);
        //    Promise.then(function (Response) {
        //        //debugger;
        //        $scope.Agearr = [];
        //        $scope.Agearr = Response.data.value.split('/');
        //        $scope.Staff.AgeYr = parseInt($scope.Agearr[0]);
        //        $scope.Staff.AgeMnth = $scope.Agearr[1];
        //        $scope.Staff.AgeDay = $scope.Agearr[2];

        //    }, function (error) {
        //        AlertMessage.error(objResource.msgTitle, objResource.msgError);
        //    });
        //}
        //else {
        //    if (event.keyCode != 9 || event.which != 9)
        //        $scope.StaffDOBError = true;
        //    else
        //        $scope.StaffDOBError = false;
        //}
        if (keyEvent != undefined) {
            if (keyEvent.which === 9)
            { }
            else {
                if (!angular.isUndefined(DOB) && DOB != null) {
                    $scope.StaffDOBError = false;
                    var Promise = DoctorService.CalculateAge(DOB);
                    Promise.then(function (Response) {

                        $scope.Agearr = [];
                        $scope.Agearr = Response.data.value.split('/');
                        $scope.Staff.AgeYr = parseInt($scope.Agearr[0]);
                        $scope.Staff.AgeMnth = parseInt($scope.Agearr[1]);
                        $scope.Staff.AgeDay = parseInt($scope.Agearr[2]);

                    }, function (error) {
                        $scope.Message = "Error" + error.status;
                    });
                }
                else {
                    $scope.Staff.AgeYr = 0;
                    $scope.Staff.AgeMnth = 0;
                    $scope.Staff.AgeDay = 0;
                    $scope.StaffDOBError = true;
                }
            }
        }
        else {
            if (!angular.isUndefined(DOB) && DOB != null) {
                $scope.StaffDOBError = false;
                var Promise = DoctorService.CalculateAge(DOB);
                Promise.then(function (Response) {

                    $scope.Agearr = [];
                    $scope.Agearr = Response.data.value.split('/');
                    $scope.Staff.AgeYr = parseInt($scope.Agearr[0]);
                    $scope.Staff.AgeMnth = parseInt($scope.Agearr[1]);
                    $scope.Staff.AgeDay = parseInt($scope.Agearr[2]);

                }, function (error) {
                    $scope.Message = "Error" + error.status;
                });
            }
            else {
                $scope.Staff.AgeYr = 0;
                $scope.Staff.AgeMnth = 0;
                $scope.Staff.AgeDay = 0;
                $scope.StaffDOBError = true;
            }
        }
    };

    $scope.GetCountryCode1 = function GetCountryCode1() {
        //debugger;
        if (angular.isDefined($scope.selectedCountry1) && $scope.selectedCountry1.length >= 1) {
            $scope.CountryList1 = [];

            var Promise = DoctorService.GetCountryCode($scope.selectedCountry1, false);
            Promise.then(function (Response) {
                //debugger;

                $scope.CountryList1 = Response.data.value;
                // $scope.DoctorData.ID = 0;
            }, function (error) {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }
    };

    $scope.GetCountryCode2 = function GetCountryCode2() {
        debugger;
        if (angular.isDefined($scope.selectedCountry2) && $scope.selectedCountry2.length > 1) {

            $scope.CountryList2 = [];
            var Promise = DoctorService.GetCountryCode($scope.selectedCountry2, false);
            Promise.then(function (Response) {
                //debugger;
                $scope.CountryList2 = Response.data.value;
                // $scope.DoctorData.ID = 0;
            }, function (error) {
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }
    };

    $scope.SelectedCountry1 = function (selectedCountry1) {
        //debugger;
        console.log("selectedCountry1", selectedCountry1)

        console.log("$scope.CountryList1 ", $scope.CountryList1);
        $scope.selectedCountry1 = selectedCountry1.CountryCode;
        $scope.Staff.MobCountryCode = $scope.selectedCountry1;
    }

    $scope.SelectedCountry2 = function (selectedCountry2) {
        debugger;
        $scope.selectedCountry2 = selectedCountry2.CountryCode;
        $scope.Staff.AltMobCountryCode = selectedCountry2.CountryCode;
    }

    //to show browsed image to crop
    var handleFileSelect = function (evt) {
        //debugger;
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
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    var count=0
    $scope.SaveStaff = function SaveStaff(Staff) {
        debugger;
        //var msg = '';
        //if (Staff.StaffID > 0)
        //    msg = objResource.msgCnfUpdate;
        //else msg = objResource.msgCnfSave;
        //swalMessages.MessageBox(objResource.msgTitle, msg, "warning", function (isConfirmed) {
        //    if (isConfirmed) {
        
        //if (count == 0) { //Commented and modified by AniketK on 08Nov2019
        //if ((count == 0 || count == 1) && $scope.frmNewStaff.$valid && $scope.result1 && $scope.Staff.AgeYr != 0 && $scope.Staff.GenderId != 0 && $scope.Staff.DegID != 0 && $scope.Staff.DeptID != 0 && !$scope.frmNewStaff.txtMobNo.$error.pattern && $scope.Staff.MobCountryCode != 0) {
        if ((count == 0 || count == 1) && $scope.Staff.FirstName != undefined && $scope.Staff.LastName != undefined && $scope.Staff.GenderId != 0 && $scope.Staff.AgeYr != undefined && $scope.Staff.DegID != 0 && $scope.Staff.DeptID != 0 && $scope.Staff.MobCountryCode != 0 && $scope.Staff.Mobno != undefined) {
            count = 1;
            //if ($scope.frmNewStaff.$valid && $scope.result1 && $scope.Staff.AgeYr != 0 && $scope.Staff.GenderId != 0 && $scope.Staff.DegID != 0 && $scope.Staff.DeptID != 0 && !$scope.frmNewStaff.txtMobNo.$error.pattern && $scope.Staff.MobCountryCode != 0) {
            if ($scope.Staff.FirstName != undefined && $scope.Staff.LastName != undefined && $scope.Staff.GenderId != 0 && $scope.Staff.AgeYr != undefined && $scope.Staff.DegID != 0 && $scope.Staff.DeptID != 0 && $scope.Staff.MobCountryCode != 0 && $scope.Staff.Mobno != undefined) {
                var OldDataValue = JSON.parse(sessionStorage.getItem('OldData'));//To send OLD Data To Service

                Staff.DOB = new Date(Staff.DOB);
                //  Staff.DOB = $filter('date')(new Date(Staff.DOB), 'shortDate');
                var Promise = StaffService.Save(Staff, OldDataValue);
                //if ($scope.frmNewStaff.$valid && $scope.result1 && $scope.Staff.AgeYr!=0 && $scope.Staff.GenderId != 0 && $scope.Staff.DegID != 0 && $scope.Staff.DeptID != 0 && !$scope.frmNewStaff.txtMobNo.$error.pattern) {
                //    var Promise = StaffService.Save(Staff);
                Promise.then(function (resp) {
                    //debugger;
                    if (resp.data.value == 1) {
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                        $scope.Clear();
                        $location.path('/Staff/');
                    }
                    else if (resp.data.value == 3) {
                        AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                        $scope.Clear();
                        $location.path('/Staff/');
                    }
                    else if (resp.data.value == 2) {
                        AlertMessage.error(objResource.msgTitle, objResource.msgDuplicate);
                        //   $scope.Clear();
                    }
                    else if (resp.data.value == 0) {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                        $scope.Clear();
                    }

                    count = 0;

                },

                function (error) {
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
            }
        }
        else
        {
            //  debugger;
            $scope.frmNewStaff.FirstName.$dirty = true;
            $scope.frmNewStaff.txtLN.$dirty = true;
            $scope.frmNewStaff.ddlGender.$dirty = true;
            if ($scope.Staff.AgeYr == 0)
                $scope.Staff.AgeYr = '';
            $scope.frmNewStaff.txtYr.$dirty = true;
            if ($scope.Staff.MobCountryCode == 0) {
                $scope.selectedCountry1 = '';
            }
            $scope.frmNewStaff.MobCountryCode.$dirty = true;
            $scope.frmNewStaff.ddlDept.$dirty = true;
            $scope.frmNewStaff.ddlDeg.$dirty = true;
            //     $scope.result = false;
            $scope.frmNewStaff.txtMobNo.$invalid = true;
            $scope.frmNewStaff.txtMobNo.$dirty = true;
            if ($scope.frmNewStaff.$error.pattern != undefined) {
                if ($scope.frmNewStaff.$error.pattern[0].$name == "txtMobNo" || $scope.frmNewStaff.$error.pattern[0].$name == "AltMobNo") {
                    AlertMessage.warning(objResource.msgTitle, objResource.lblValidMobNo);
                }
            }
            else if ($scope.result1 == false) {
                AlertMessage.warning(objResource.msgTitle, objResource.lblValidEmail);
            }
            else {
                AlertMessage.warning(objResource.msgTitle, objResource.lblFillMandatoryFields);
            }


        }
            //    } else {
        
        //    }
        //});
    };

    //to show browsed image to crop
    $scope.handleFileSelect = function (evt) {
        debugger;
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    //   angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
    $scope.uploadFile = function () {
        var filename = event.target.files[0].name;
        console.log("file", event.target.files[0]);
        alert('file was selected: ' + filename);
    };
    $scope.UploadImageStaff = function () {
        //debugger;
        var modalInstance = $uibModal.open({         // for open pop up for upload image 
            //template: '<div ng-init="init()"><div>Select an image file : <input type="file" id="fileInput" name="fileInput" /></div><div class="cropArea"><img-crop image="myImage" result-image="myCroppedImage" result-image-format="image/jpeg"></img-crop></div><div><img ng-src="{{myCroppedImage}}" /></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="CancelOk(myCroppedImage)">OK</button><button class="btn btn-warning" type="button" ng-click="ClosePopUp();">Cancel</button> </div>',
            templateUrl: 'tmpDocPhoto',
            controller: 'ctrUploadImage',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            },
            size: 'md',
        })
        modalInstance.result.then(function (items) {     // return here umploaded image
            //debugger;
            $scope.Staff.PhotoString = items.myCroppedImage;

        })['finally'](function () {
            $scope.modalInstance = undefined  // <--- This fixes
        });;
    }

    $scope.Clear = function () {
        //debugger;
        $scope.Staff = {};
        $scope.myImage = '';
        $scope.myCroppedImage = '';
        $scope.items = {};
        $scope.Staff.CountryID = 0;
        $scope.Staff.AltCountryID = 0;
        $scope.Staff.DegID = 0;
        $scope.Staff.DeptID = 0;
        $scope.Staff.MaritalStatusId = 0;
        $scope.Staff.GenderId = 0;
        $scope.Staff.StateID = 0;
        $scope.Staff.CityID = 0;
        $scope.Staff.AltStateID = 0;
        $scope.Staff.AltCityID = 0;
        $scope.frmNewStaff.$setPristine();
    }

    $scope.BackToStaffList = function () {
        //var url = "http://" + $window.location.host + "/Staff/StaffList";
        //$window.location.href = url;
        // $window.location.href = '/Staff/StaffList';
        $location.path('/Staff/');
    }

    $scope.ValidateEmail = function ValidateEmail(email) {
        //debugger;
        if (email == undefined || email == "") {
            $scope.result1 = true;
        }
        else {
            var re = /\S+@\S+\.\S+/;
            $scope.result1 = re.test(email);
        }
    }

    $scope.ValidateMobNumber = function ValidateMobNumber(No) {
        // debugger;
        var re = /^\d{1,15}$/;
        $scope.result = re.test(No);
    }

    $scope.ValidateAltMobNumber = function ValidateAltMobNumber(No) {
        // debugger;
        var re = /^\d{1,15}$/;
        $scope.Altresult = re.test(No);
    }

    $scope.ClearSearch = function ClearSearch() {
        $scope.SL.Name = '';
        $scope.SL.DeptID = 0;
        $scope.SL.MobNo = '';
        $scope.SL.EID = '';
    }

    $scope.ClearAdvanceSearch = function ClearAdvanceSearch() {
        $scope.SL.Qua = '';
        $scope.SL.DegID = 0;
        $scope.SL.Exp = '';
        $scope.SL.EmailID = '';
        $scope.SL.MID = 0;
        $scope.SL.GId = 0;
    }

    $scope.ActivateDeactivateStaff = function ActivateDeactivateUser(staff) {
       debugger;
        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: 'modReason',
            controller: 'ctrlPopUp',
            backdrop: false,
            keyboard: false,
            size: 'sm',
            resolve: {
                objUser: function () {
                    return staff;
                }
            }
        });
        modalInstance.result.then(function (reason, userback) {     // return here after cancel reason entered
            var responseData = StaffService.ActivateDeactivateStaff(staff.StaffID, !staff.Status, reason);
            responseData.then(function (Response) {
                debugger;
                if (Response.data.value == 1) {
                    staff.Status = !staff.Status;
                    AlertMessage.success(objResource.msgTitle, objResource.lblStaffActDeact);
                }
            }, function (error) {
                //  debugger;
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        });
    }
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var Promise = StaffService.StaffList($scope.CurrentPage - 1, $scope.SL.Name, $scope.SL.DeptID, $scope.SL.MobNo, $scope.SL.EID, $scope.SL.DegID, $scope.SL.Qua, $scope.SL.Exp, $scope.SL.EmailID, $scope.SL.MID, $scope.SL.GId, false);
        Promise.then(function (Response) {
            //  debugger;
            var filteredData = _.map(Response.data.value, function (data) {

                var users = {
                    'Name': data.FirstName + ' ' + data.LastName, 'Gender': data.Gender, 'Designation': data.Designation, 'Department': data.Department, 'Registration Date': data.RegistrationDate, 'Clinic': data.Clinic, 'Active': data.Status
                }
                return users;
            });

            alasql('SELECT * INTO XLSX("Staff.xlsx",{headers:true}) FROM ?', [filteredData]);

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });


        //var exportHref = Excel.tableToExcel(tableId, 'PatientRegistrationData');
        //$timeout(function () { location.href = exportHref; }, 100); // trigger download
    }

    $scope.ClearDOB = function () {
        $scope.Staff.AgeMnth = 0;
        $scope.Staff.AgeDay = 0;
        $scope.Staff.DOB = '';
    }

});

PIVF.controller('ctrUploadImage', function ($scope, $uibModalInstance, items) {
    //debugger;
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.ShowGallery = false;
    $scope.ShowCapture = false;

    $scope.items = { myCroppedImage: '' };

    var _video = null,
    patData = null;
    debugger;
    $scope.patOpts = { x: 0, y: 0, w: 25, h: 25 };

    // Setup a channel to receive a video property
    // with a reference to the video element
    // See the HTML binding in main.html
    $scope.channel = {};

    $scope.webcamError = false;
    $scope.onError = function (err) {
        debugger;
        $scope.$apply(
            function () {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onSuccess = function () {
        //debugger;
        debugger;
        // The video element contains the captured camera data
        _video = $scope.channel.video;
        $scope.$apply(function () {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            //$scope.showDemos = true;
        });
    };

    $scope.onStream = function (stream) {
        debugger;
        // You could do something manually with the stream.
    };
    $scope.uploadFile = function () {
        debugger;
        var filename = event.target.files[0].name;

        console.log('file1 ', event.target.files);
        //  handleFileSelect(event);
        //  alert('file was selected: ' + filename);
    };
    $scope.makeSnapshot = function () {
        debugger;
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
        //debugger;
        window.location.href = dataURL;
    };

    var getVideoData = function getVideoData(x, y, w, h) {
        //debugger;
        debugger;
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
        debugger;
        $scope.myImage = imgBase64;
    };

    var handleFileSelect = function (evt) {
        //debugger;
        debugger;
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        //reader.onload = function (evt) {
        //    $scope.$apply(function ($scope) {
        //        $scope.myImage = evt.target.result;
        //    });
        //};
        reader.readAsDataURL(file);
    };
    $scope.imageIsLoaded = function (e) {
        debugger;
        $scope.$apply(function () {
            console.log("here");
            $scope.myImage = e.target.result;
            // $scope.myCroppedImage = "";
            console.log($scope.myImage);
        });
    }
    $scope.init = function () {
        debugger;
        var file = angular.element(document.getElementById("fileInput"));
        file.on('change', handleFileSelect)
        //$scope.ShowGallery = false;
        //$scope.ShowCapture = false;

    }

    $scope.CancelOk = function (myImageCrop) {
        //debugger;
        if ((!angular.isUndefined(myImageCrop) || myImageCrop != undefined) && myImageCrop != "") {
            $scope.items.myCroppedImage = myImageCrop;
            $uibModalInstance.close($scope.items);
        }

    };

    $scope.ClosePopUp = function ClosePopUp() {
        //debugger;
        $uibModalInstance.dismiss('cancel');
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
});

PIVF.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
        }
    };
});

PIVF.controller('ctrlPopUp', function ($scope, $uibModalInstance, StaffService, objUser, AlertMessage) {
    debugger;
    $scope.reason = $scope.reason;
    $scope.ReasonCancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.SaveReason = function SaveReason(Reason) {
        // console.log(VisitDetails);
        debugger;
        if (Reason != undefined) {
            StaffService.ActivateDeactivateStaff(objUser.StaffID, !objUser.Status, Reason).then(function (resp) {
                if (Reason != undefined) {
                    //AlertMessage.success('PalashIVF', 'Reason Added Successfully..');//Commented by swatih for localization 28/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgReasonAddedSuccessfully);//Modified by swatih for localization 28/7/2020
                    $uibModalInstance.close(Reason);
                }
                debugger;
            }, function (err) {
                debugger;
                $uibModalInstance.dismiss('cancel');
            })
        }
        else {
            // AlertMessage.warning('PalashIVF', 'Please Fill the Reason');//Commented by swatih for localization 28/7/2020
            AlertMessage.success(objResource.msgTitle, objResource.msgPleaseFilltheReason);//Modified by swatih for localization 28/7/2020
        }
    }

});