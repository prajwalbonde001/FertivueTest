'use strict';
angular.module('PIVF').controller('ClinicController', function ($scope, $location, usSpinnerService, StaffService, DoctorService, ClinicService, $uibModal, srvCommon, Common, swalMessages, AlertMessage, $filter, $rootScope, $timeout) {

    $scope.CurrentPage = 1;
    $scope.Clinic = {};
    var objResource = {};
    var obj = {};

    $scope.PageChange = function PageChange() {
        $scope.GetClinicListForLandingPage(true);
    }

    $scope.loadPage = function () {
        $rootScope.FormName = 'Clinic';
        $scope.GetClinicListForLandingPage(true);       
    }

    //For data binding when language changed.
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    $scope.GetClinicListForLandingPage = function (IsPagingEnable) {
        usSpinnerService.spin('GridSpinner');
        var searchPara = {};
        //  debugger;
        searchPara = {
            Pgindx: $scope.CurrentPage - 1, Code: $scope.Code, Description: $scope.Name, IsPagingEnable: true, UnitID: $scope.UnitID
        };
        var responseData = ClinicService.GetClinicListForLandingPage(searchPara);
        responseData.then(function (Response) {
            //  if (IsPagingEnable==1) {
            //    debugger;
            $scope.ClinicList = Response.data;
            if (Response.data.length > 0) $scope.TotalItems = Response.data[0].TotalCount;
            else $scope.TotalItems = 0;
            //  }
            //else if (IsPagingEnable == 2) {
            //    var filteredData = _.map(Response.data, function (data) {
            //        var users = {
            //            'Code': data.TariffCode, 'Description': data.Description, 'Active': data.Active
            //        }
            //        return users;
            //    });
            //    alasql('SELECT * INTO XLSX("Tariff List.xlsx",{headers:true}) FROM ?', [filteredData]);
            //}
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    };

    $scope.editClinic = function (i) {
        debugger;
        Common.setObj(i);
        $location.path('/EditClinic/');
    }

    //var ClinicData;

    $scope.GetSpecData = function GetSpecData(IsFromLandingPg) {
        debugger;
        //ClinicData = JSON.parse(sessionStorage.getItem('ClinicData' || 'null'));
        //if (angular.isDefined(ClinicData) && ClinicData == null) {
        //    $scope.GetCountryCode();
        //    $scope.GetStateList1("", 0);
        //    $scope.GetCityList1("", 0);
        //}
        //else {
        //    $scope.GetCountryCode();
        //    $scope.Clinic = ClinicData;
        //    //$scope.selectedCountry1 = ClinicData.CountryName;

        //    sessionStorage.removeItem('ClinicData');
        //}        
        $scope.GetCountryCode();
        $scope.isEdit = false;
        obj = Common.getObj();
        if (!angular.equals(obj, {})) {
            if (angular.isDefined(obj.Code)) {
                $rootScope.FormName = 'View/Edit Clinic';
                $scope.isEdit = true;
                $scope.Clinic = obj;
                $scope.GetDepartmentListForUnit($scope.Clinic.UnitID);
                $scope.selectedCountry1 = $scope.Clinic.CountryName;
                if ($scope.Clinic.CountryName == null) {    //Added by Nayan Kamble on 12/11/2019
                    $scope.selectedCountry1 = $scope.Clinic.CountryID;
                }                        
                //if (!obj.Active)
                //    angular.element(btnSave).prop('disabled', true);
                //else angular.element(btnSave).prop('disabled', false);
                //Common.clearObj();
            }
        }
        //var responseData = TariffService.GetSpecList(IsFromLandingPg);
        //responseData.then(function (Response) {
        //    $scope.SpecList = Response.data.value;
        //    //$scope.SpecList.splice(0,0,{SID : 0, Description: objResource.lblSubSpecialization})
        //    $scope.SpecID = 0;
        //    $scope.SubSpecList = [];
        //    $scope.SubSpecList.splice(0, 0, { SuID: 0, Description: objResource.lblSubSpecialization });
        //    $scope.SubSpecID = 0;
        //}, function (error) {
        //});
    }; //fill ddl

    //Used for binding country list dropdown.
    $scope.GetCountryCode = function GetCountryCode() {
        debugger;
        var Promise = DoctorService.GetCountryCode("", true);
        Promise.then(function (Response) {

            $scope.CountryListForDD = Response.data.value;

            $scope.Clinic.CountryID = obj.CountryID;

            $scope.GetStateList1("", $scope.Clinic.CountryID);

            //if (angular.isDefined(ClinicData) && ClinicData != null) {
            //    $scope.Clinic.CountryID = ClinicData.CountryID;
            //    //$scope.DoctorData.AltCountryID = DocData.AltCountryID;

            //    sessionStorage.setItem('CountryID', ClinicData.CountryID);
            //    //sessionStorage.setItem('AltCountryID', DocData.AltCountryID);

            //    $scope.GetStateList1("", $scope.Clinic.CountryID);
            //    // $scope.GetStateList2("", $scope.DoctorData.AltCountryID);
            //}
            //else {
            //    $scope.Clinic.CountryID = 0;
            //    // $scope.DoctorData.AltCountryID = 0;
            //}

        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Used to fill State List dropdown.
    $scope.GetStateList1 = function GetStateList1(Filter, CountryID) {
        debugger;
        var Promise = StaffService.GetStateList(Filter, CountryID);
        // var Promise = Common.GetStateList(Filter, CountryID);
        Promise.then(function (Response) {
            debugger;
            $scope.StateList1 = Response.data.value;
            $scope.Clinic.StateID = obj.StateID;
            $scope.GetCityList1("", $scope.Clinic.StateID);

            //if ($scope.DoctorData.StateID == undefined) {
            //    $scope.DoctorData.StateID = 0;
            //    // $scope.DoctorData.CityID = 0;
            //}
            //else {               
            //    $scope.GetCityList1("", $scope.DoctorData.StateID);
            //}
            //var CID = sessionStorage.getItem('CountryID' || 'null');
            //if (angular.isDefined(CID)) {
            //    if (CID != CountryID) {
            //        $scope.Clinic.StateID = 0;
            //        $scope.Clinic.CityID = 0;
            //    }
            //    sessionStorage.removeItem('CountryID');
            //}
            //if (angular.isDefined(ClinicData) && ClinicData != null) {
            //    $scope.Clinic.StateID = ClinicData.StateID;
            //    $scope.GetCityList1("", $scope.Clinic.StateID);
            //}
            //else {
            //    $scope.Clinic.StateID = 0;
            //    $scope.Clinic.CityID = 0;
            //}
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    //Used to fill City List dropdown.
    $scope.GetCityList1 = function GetCityList1(Filter, StateID) {
        debugger;

        var Promise = StaffService.GetCityList(Filter, StateID);
        Promise.then(function (Response) {
            debugger;
            $scope.CityList1 = Response.data.value;
            $scope.Clinic.CityID = obj.CityID;
            //if ($scope.DoctorData.CityID == undefined) {
            //    $scope.DoctorData.CityID = 0;
            //}
            //if (angular.isDefined(ClinicData) && ClinicData != null) {
            //    $scope.Clinic.CityID = cClinicData.CityID;
            //}
            //else {
            //    $scope.Clinic.CityID = 0;
            //}
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Used to redirect to Listing page.
    $scope.Cancel = function Cancel() {
        $location.path('/Clinic/');

    };

    //to open popup for reason for change on listing page
    $scope.showReasonModal = function ActivateDeactivateClinic(Clinic) {
        debugger;
        Common.clearObj();
        Common.setObj(Clinic);
        angular.element(reasonModel).modal('show');
    }

    $scope.ActivateDeactivateClinic = function ActivateDeactivateClinic() {
        debugger;
        var obj = {}; obj = Common.getObj();
        // $scope.Clinic = obj;

        var T = [];
        T.push(obj.UnitID.toString());
        T.push((!obj.Active).toString());
        T.push($scope.Reason);
        // T.push(obj.UnitID.toString());
        var responseData = ClinicService.ActivateDeactivateClinic(T);
        responseData.then(function (Response) {
            if (Response.status == 200) {
                obj.Active = !obj.Active;
                angular.element(reasonModel).modal('hide');
                Common.clearObj();
                $scope.Reason = null;
                AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
            }
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }  //activate deactivate Tariff with reason

    $scope.ValidMsg = function ValidMsg() {
        debugger;
        //AlertMessage.warning('PalashIVF', 'Fill mandatory field.');//Commented by swatih for localization 27/7/2020
        AlertMessage.warning(objResource.msgTitle, objResource.msgFillmandatoryfield);//Modified by swatih for localization 27/7/2020
    }



    //Used for saving doctor data.
    $scope.ModifyClinic = function ModifyClinic(Clinic) {
        debugger;
        if (Clinic.UnitID != null) {
            Clinic.DepartmentList = $scope.DepartmentList;
            var clinic = $scope.Clinic;
            if (validateForm(clinic)) {
                var OldDataValue = [];
                for (var i = 0; i < $scope.frmEditClinic.modifiedModels.length; i++) {
                    if ($scope.frmEditClinic.modifiedModels[i].masterValue === undefined || $scope.frmEditClinic.modifiedModels[i].masterValue === null)
                        $scope.frmEditClinic.modifiedModels[i].masterValue = "";
                    var jmodel = {
                        field: $scope.frmEditClinic.modifiedModels[i].$name,
                        oldvalue: $scope.frmEditClinic.modifiedModels[i].masterValue.toString(),
                        newvalue: $scope.frmEditClinic.modifiedModels[i].$viewValue.toString(),
                        ID: i
                    };
                    OldDataValue.push(jmodel);
                }

                var Promise = ClinicService.Modify(Clinic, OldDataValue);
                Promise.then(function (resp) {
                    if (resp.data == 1) {
                        AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                        $scope.Clear();
                        $scope.Cancel();
                    }

                    //if (resp.data.value == 3)
                    //    AlertMessage.error(objResource.msgTitle, objResource.msgError);

                },
              function (error) {
                  AlertMessage.error(objResource.msgTitle, objResource.msgError);
              });
            }
            else {
                if (!$scope.IsValidCode || !$scope.IsValidDescription ) {
                    //AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');//Commented by swatih for localization 27/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);//Modified by swatih for localization 27/7/2020
                }
                else if (!$scope.IsValidMobileNO) {
                    //AlertMessage.warning('PalashIVF', 'Enter mobile no.');//Commented by swatih for localization 27/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgEntMobNo);//Modified by swatih for localization 27/7/2020
                }
                else if (!$scope.IsValidContactNo) {
                    // AlertMessage.warning('PalashIVF', 'Enter contact no.');//Commented by swatih for localization 27/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgEntercontactno);//Modified by swatih for localization 27/7/2020
                }
                else if (!$scope.IsValidResiSTDCode || !$scope.IsValidselectedCountry1) {
                    //AlertMessage.warning('PalashIVF', 'Enter country code.');//Commented by swatih for localization 27/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgEntercountrycode);//Modified by swatih for localization 27/7/2020
                }
            }
        }
        else {
            $scope.frmEditClinic.$invalid = true;

            //if ($scope.DoctorData.GenderId == 0) {
            //    $scope.GenderError = true;
            //}
            //if ($scope.DoctorData.DocTypeID == 0) {
            //    $scope.DocTypeIDError = true;
            //}
            //if ($scope.DoctorData.DocCatID == 0) {
            //    $scope.DocCatIDError = true;
            //}
            //if ($scope.DoctorData.SID == 0) {
            //    $scope.SIDError = true;
            //}
            //if ($scope.DoctorData.SuID == 0) {
            //    $scope.SuIDError = true;
            //}
            //if ($scope.DoctorData.MobCountryId == 0 || $scope.DoctorData.MobCountryId == undefined) {
            //    $scope.MobCountryIdError = true;
            //}
            //if (DoctorData.AgeYear == 0)
            //    DoctorData.AgeYear = "";
            //$scope.frmAddDoctor.AgeYear.$dirty = true;
            //$scope.frmAddDoctor.Mobno.$dirty = true;

            //if ($scope.frmAddDoctor.$error.pattern != undefined) {
            //    if ($scope.frmAddDoctor.$error.pattern[0].$name == "AltMobno" || $scope.frmAddDoctor.$error.pattern[0].$name == "Mobno") {
            //        AlertMessage.warning(objResource.msgTitle, objResource.lblValidMobNo);
            //    }
            //}
            //else if ($scope.result == false) {
            //    AlertMessage.warning(objResource.msgTitle, objResource.lblValidEmail);
            //}
            //else {
            //    AlertMessage.warning(objResource.msgTitle, objResource.lblFillMandatoryFields);
            //}
        }
    };

      function validateForm(clinic) {    //Added by Nayan Kamble on 07/11/2019
        debugger;
        $scope.IsValidCode = true;
        $scope.IsValidDescription = true;
        $scope.IsValidContactNo = true;
        $scope.IsValidMobileNO = true;
        $scope.IsValidResiSTDCode = true;
        $scope.IsValidselectedCountry1 = true;
        var isValid = true;

        if (clinic.Code == '' || clinic.Code == undefined) {
            isValid = false;
            $scope.IsValidCode = false;
        }
        if (clinic.Description == '' || clinic.Description == undefined) {
            isValid = false;
            $scope.IsValidDescription = false;
        }
        if (clinic.ContactNo==undefined || clinic.ContactNo.length == 0) {
            isValid = false;
            $scope.IsValidContactNo = false;
        } 
        if (clinic.MobileNO == null || clinic.MobileNO.length == 0) {
            isValid = false;
            $scope.IsValidMobileNO = false;
        }
        if (clinic.ResiSTDCode == '' || clinic.ResiSTDCode ==undefined) {
            isValid = false;
            $scope.IsValidResiSTDCode = false;
        }
        if ($scope.selectedCountry1 == undefined || $scope.selectedCountry1 == ''){      //clinic.CountryName == '' || clinic.CountryName == undefined) {
            isValid = false;
            $scope.IsValidselectedCountry1 = false;
        }
        if (isValid) {
            $scope.style = null;
        }

        return isValid;

    }


    //clear data after save & edit
    $scope.Clear = function Clear() {

        $scope.Clinic = {};
        if (sessionStorage['ClinicData'] != undefined) {
            sessionStorage.removeItem('ClinicData');
        }

        $scope.Clinic.CountryID = 0;
        $scope.Clinic.StateID = 0;
        $scope.Clinic.CityID = 0;
        $scope.selectedCountry1 = null;
    };

    //Used for binding country code list.
    $scope.GetCountryCode1 = function GetCountryCode1() {
        debugger;
        $scope.CountryList1 = [];
        var Promise = DoctorService.GetCountryCode($scope.selectedCountry1, false);
        Promise.then(function (Response) {
            $scope.CountryList1 = Response.data.value;
            if (Response.data.value == 0) {     //Added by Nayan Kamble on 11/11/2019
               // $scope.Clinic.MobileCountryCode = $scope.selectedCountry1;
                // $scope.Clinic.CountryID = '';
                $scope.Clinic.CountryID = $scope.selectedCountry1;
                $scope.Clinic.CountryName = $scope.selectedCountry1;
            }
            else {
                $scope.Clinic.MobileCountryCode = 0
            }
        }, function (error) {
            $scope.Message = "Error" + error.status;
        });
    };

    //Bind selected country code
    $scope.SelectedCountry1 = function (selectedCountry1) {
        debugger;
        $scope.selectedCountry1 = selectedCountry1.CountryCode;
        $scope.Clinic.MobileCountryCode = selectedCountry1.CountryID;
    }
   
    $scope.DepartmentList = {};
    //Used for filling Department on unit selection on department popup.
    $scope.GetDepartmentListForUnit = function GetDepartmentListForUnit(UnitID) {
        debugger;
        //$scope.DepartmentListForDoc = [];

        var responseData = ClinicService.GetDepartmentListForUnit(UnitID);
        responseData.then(function (Response) {
            debugger;
            $scope.DepartmentList = Response.data;


            //if (Response.data.value.length > 0) {
            //    $scope.DepartmentListForDoc = [];
            //    Response.data.value.splice(0, 1);
            //    angular.forEach(Response.data.value, function (value, index) {
            //        $scope.DepartmentListForDoc.push({ id: value.DeptID, label: value.Description });
            //    });
                
            //}            

        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });

    };


});