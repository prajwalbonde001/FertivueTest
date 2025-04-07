'use strict';
angular.module('PIVF').controller('RegistrationController', function ($rootScope, $scope, $location, RegistartionService, AlertMessage, srvCommon, Common, swalMessages, $filter, localStorageService, usSpinnerService, PatientVisitService) {
    $scope.maxSize = 5;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $scope.CurrentPage = 1;
    $scope.Registration = {};
    $scope.Registration.lstPatient = [];
    $scope.Registration.lstAddress = [];
    $scope.Patient = {};
    $scope.Partner = {};
    $scope.Patient.objAddress = {};
    $scope.Partner.objAddress = {};
    $scope.objAddress = {};
    $scope.RegType = 0;
    $scope.info = true;
    $scope.addInfo = false;
    $scope.refInfo = false;
    $scope.Info = {};
    $scope.AddInfo = {};
    $scope.RefInfo = {};
    $scope.regTypeList = [];
    $scope.DoctorData = {};
    $scope.BankData = {};
    $scope.SponserList = [];
    $scope.IsValidEmail = true;
    $scope.IsValidCountryCode = true;
    $scope.IsValidGreaterAge = true;
    $scope.IsValidLesserAge = true;
    $scope.IsIdentityID = true;
    //Begin::Added by AniketK on 09July2019 for web.config based configuration
    $scope.LinkConfig = {};
    $scope.IsAuto = false;//web.config IsAuto
    $scope.IsManual = false;//web.config IsManual
    //End::Added by AniketK on 09July2019 for web.config based configuration
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    //if (angular.isUndefined($scope.isView)) $scope.isView = false;
    //  var addFor = '';


 
    var objResource = {}; // Added sujata
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }// for globalization

    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    if ($location.url().substr(1) === "Registration")
        $rootScope.FormName = 'Patient Registration';
    else if ($location.url().substr(1) === "PatientList")
        $rootScope.FormName = 'Patient Search';


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

    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };

    $scope.popup3 = {
        opened: false
    };

    $scope.open4 = function () {
        $scope.popup4.opened = true;
    };

    $scope.popup4 = {
        opened: false
    };

    $scope.dateOptionsDOB = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 120),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End

    $scope.PageChange = function () {

    }

    //Begin:: Added by AniketK on 09July2019 for web.config based configuration
    $scope.LoadLinkConfiguartion = function LoadLinkConfiguartion() {
        debugger;
        var Responce = Common.getLinkConfiguartions();
        Responce.then(function (responce) {
            // $scope.LinkConfig = responce.data;
            if (responce.data.IsAuto === "true") {
                $scope.IsAuto = true;
                $scope.RegType = 1;
            }
            if (responce.data.IsManual === "true") {
                $scope.IsManual = true;
                $scope.RegType = 2                
            }


        }, function (err) {
        })
    }
    $scope.LoadLinkConfiguartion();
    //End:: Added by AniketK on 09July2019 for web.config based configuration

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


    //Get Sponsor List  
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


    //Insert Update Bank Details

    $scope.AddBankDetails = function AddBankDetails(objBankDetails) {
        debugger;
        if (validateBankDetails()) {
            if (objBankDetails.AccoutType == 1)
                objBankDetails.AccoutType = true;
            else
                objBankDetails.AccoutType = false;
            objBankDetails.RegID = Common.getID();
            objBankDetails.RegUnitID = Common.getUnitID();
            var responseData = RegistartionService.InsertUpdateBankDetails(objBankDetails);
            responseData.then(function (Response) {
                //debugger;
                if (Response.data == 1) {
                    AlertMessage.success('PalashIVF', 'Bank Details Added successfully.');

                } else if (Response.data == 2) {
                    AlertMessage.success('PalashIVF', 'Bank Details Updated successfully.');

                }
                angular.element(bankInfo).modal('hide');
            }, function (error) {
                AlertMessage.error('PalashIVF', 'Error occured.');
            });
        } else {

            $scope.frmRegistration.BranchName.$dirty = true;
            $scope.frmRegistration.IFSCCode.$dirty = true;
            $scope.frmRegistration.AccountNo.$dirty = true;
            $scope.frmRegistration.CustName.$dirty = true;
        }

    };

    function validateBankDetails() {
        var isValid = true;
        if (angular.isUndefined($scope.BankData.BankID) || $scope.BankData.BankID == 0) {
            isValid = false;
            AlertMessage.warning('PalashIVF', 'Select Bank name.');
            return isValid;
        }
        if (angular.isUndefined($scope.BankData.BranchName) || $scope.BankData.BranchName == '') {
            isValid = false;
            AlertMessage.warning('PalashIVF', 'Enter Branch name.');
            return isValid;
        }
        if (angular.isUndefined($scope.BankData.IFSCCode) || $scope.BankData.IFSCCode == '') {
            isValid = false;
            AlertMessage.warning('PalashIVF', 'Enter IFSC code.');
            return isValid;
        }
        if (angular.isUndefined($scope.BankData.AccountNo) || $scope.BankData.AccountNo == '' || $scope.BankData.AccountNo == 0) {
            isValid = false;
            AlertMessage.warning('PalashIVF', 'Enter AccountNo.');
            return isValid;
        }

        if (angular.isUndefined($scope.BankData.CustName) || $scope.BankData.CustName == '') {
            isValid = false;
            AlertMessage.warning('PalashIVF', 'Enter Customer name.');
            return isValid;
        }
        return isValid;
    };

    $scope.fillClinicList = function () {

        $scope.regTypeList.push({ ID: 0, Description: 'Registration Type' });
        $scope.regTypeList.push({ ID: 1, Description: 'Couple' });
        $scope.regTypeList.push({ ID: 2, Description: 'Individual' });
        $scope.regTypeList.push({ ID: 3, Description: 'Donor' });
        $scope.regTypeList.push({ ID: 4, Description: 'Surrogate' });
        $scope.Info.regTypeID = 0;
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Clinic" });
            $scope.clinicList = Response.data;
            //   $scope.Info.UnitID = localStorageService.get("UserInfo").UnitID;
        }, function (error) {
        });
    }

    $scope.fillIdPrppfTypeList = function () {
        var ResponseData = Common.getMasterList('M_IDProofMaster', 'IDProofID', 'Description');
        ResponseData.then(function (Response) {
            if (!$scope.isPatientSearch)
                Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            else
                Response.data.splice(0, 0, { ID: 0, Description: "Id Proof Type" });
            $scope.IdPrppfTypeList = Response.data;
            $scope.Info.IdentityID = 0;
            $scope.Patient.IdentityID = 0;
            $scope.Partner.IdentityID = 0;
        }, function (error) {
        });
    }

    $scope.fillMarryStatusList = function () {
        var ResponseData = Common.getMasterList('M_Maritalstatus', 'MSID', 'MSDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.MarryStatusList = Response.data;
            $scope.Patient.MaritalStatusID = 0;
            $scope.Partner.MaritalStatusID = 0;
        }, function (error) {
        });
    }

    $scope.fillBloodGrpList = function () {
        var ResponseData = Common.getMasterList('M_BloodGroupMaster', 'BloodID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.BloodGrpList = Response.data;
            $scope.Patient.BloodGroupID = 0;
            $scope.Partner.BloodGroupID = 0;
        }, function (error) {
        });
    }

    $scope.fillNationalityList = function () {
        var ResponseData = Common.getMasterList('M_NationalityMaster', 'NationlityID', 'NationlityDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.NationalityList = Response.data;
            $scope.Patient.NationalityID = 0;
            $scope.Partner.NationalityID = 0;
        }, function (error) {
        });
    }

    $scope.fillEthnicityList = function () {
        var ResponseData = Common.getMasterList('M_Ethnicity', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.EthnicityList = Response.data;
            $scope.Patient.EthnicityID = 0;
            $scope.Partner.EthnicityID = 0;
        }, function (error) {
        });
    }

    $scope.fillReligionList = function () {
        var ResponseData = Common.getMasterList('M_Religion', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ReligionList = Response.data;
            $scope.Patient.ReligionID = 0;
            $scope.Partner.ReligionID = 0;
        }, function (error) {
        });
    }

    $scope.fillEducationList = function () {
        var ResponseData = Common.getMasterList('M_EducationDetailsMaster', 'EDUID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.EducationList = Response.data;
            $scope.Patient.EducationID = 0;
            $scope.Partner.EducationID = 0;
        }, function (error) {
        });
    }

    $scope.fillOccupationList = function () {
        var ResponseData = Common.getMasterList('M_OccupationMaster', 'OccupID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.OccupationList = Response.data;
            $scope.Patient.OccupationId = 0;
            $scope.Partner.OccupationId = 0;
        }, function (error) {
        });
    }

    $scope.getCountryList = function () {
        var ResponseData = Common.GetCountryList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { CountryID: 0, CountryName: "Select" });
            $scope.CountryList = Response.data;
            $scope.Patient.objAddress.CountryID = 0;
            $scope.Partner.objAddress.CountryID = 0;
            $scope.objAddress.CountryID = 0;
            $scope.StateList = []; $scope.partnrStateList = []; $scope.otherStateList = [];
            $scope.CityList = []; $scope.partnrCityList = []; $scope.otherCityList = [];
            $scope.StateList.splice(0, 0, { StateID: 0, StateName: "Select" });
            $scope.CityList.splice(0, 0, { CityID: 0, CityName: "Select" });
            $scope.partnrStateList.splice(0, 0, { StateID: 0, StateName: "Select" });
            $scope.partnrCityList.splice(0, 0, { CityID: 0, CityName: "Select" });
            $scope.otherStateList.splice(0, 0, { StateID: 0, StateName: "Select" });
            $scope.otherCityList.splice(0, 0, { CityID: 0, CityName: "Select" });

            $scope.Patient.objAddress.StateID = 0;
            $scope.Partner.objAddress.StateID = 0;
            $scope.objAddress.StateID = 0;
            $scope.Patient.objAddress.CityID = 0;
            $scope.Partner.objAddress.CityID = 0;
            $scope.objAddress.CityID = 0;

        }, function (error) {
        });
    }

    $scope.GetStateList = function (countryID, from) {
        var ResponseData = Common.GetStateList(countryID);
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { StateID: 0, StateName: "Select" });
            if (from == 'patient') {
                $scope.StateList = angular.copy(Response.data);
                $scope.partnrStateList = angular.copy(Response.data);
                if (Response.data.length == 1) {
                    $scope.CityList.length = 0;
                    $scope.partnrCityList.length = 0;
                    $scope.CityList.splice(0, 0, { CityID: 0, CityName: "Select" });
                    $scope.partnrCityList.splice(0, 0, { CityID: 0, CityName: "Select" });
                    $scope.Patient.objAddress.StateID = 0;
                    $scope.Patient.objAddress.CityID = 0;
                    $scope.Partner.objAddress.StateID = 0;
                    $scope.Partner.objAddress.CityID = 0;
                }

            }
            else if (from == 'partner') {
                $scope.partnrStateList = angular.copy(Response.data);
                $scope.partnrCityList.length = 0;
                $scope.partnrCityList.splice(0, 0, { CityID: 0, CityName: "Select" });
                $scope.Partner.objAddress.StateID = 0;
                $scope.Partner.objAddress.CityID = 0;
            }
            else if (from == 'other') {
                //$scope.otherCityList.length = 0;
                //$scope.otherCityList = [];
                $scope.otherStateList = angular.copy(Response.data);
                if ($scope.objAddress.StateID == 0 && !$scope.isView) {
                    $scope.otherCityList.splice(0, 0, { CityID: 0, CityName: "Select" });
                    $scope.objAddress.CityID = 0;
                    $scope.objAddress.StateID = 0;
                }
                else
                    $scope.GetCityList($scope.objAddress.StateID, 'other');
            }
        }, function (error) {
        });
    }

    $scope.GetCityList = function (StateID, from) {
        var ResponseData = Common.GetCityList(StateID);
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { CityID: 0, CityName: "Select" });
            if (from == 'patient') {
                $scope.CityList = angular.copy(Response.data);
                $scope.partnrCityList = angular.copy(Response.data);
                $scope.Patient.objAddress.CityID = 0;
                $scope.Partner.objAddress.CityID = 0;

            }
            else if (from == 'partner') {
                $scope.partnrCityList = angular.copy(Response.data);
                $scope.Partner.objAddress.CityID = 0;
            }
            else if (from == 'other') {
                $scope.otherCityList = angular.copy(Response.data);
                if ($scope.objAddress.CityID == 0 && !$scope.isView)
                    $scope.objAddress.CityID = 0;
            }
        }, function (error) {
        });
    }

    $scope.getSourceOfrefList = function (StateID) {
        var ResponseData = Common.getMasterList('M_ReferralTypeMaster', 'RFTYPEID', 'Description');
        ResponseData.then(function (Response) {
            if (!$scope.isPatientSearch)
                Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            else Response.data.splice(0, 0, { ID: 0, Description: "Source Of Reference" });
            $scope.SourceOfrefList = Response.data;
            $scope.Patient.SourceOfReferenceID = 0;
            $scope.Info.SourceOfReferenceID = 0;
        }, function (error) {
        });
    }

    $scope.getCampList = function () {
        var ResponseData = Common.getMasterList('M_CampMaster', 'ID', 'Name');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.CampList = Response.data;
            $scope.Patient.CampID = 0;
        }, function (error) {
        });
    }

    $scope.geAgencyList = function () {
        var ResponseData = Common.getMasterList('M_AgencyMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AgencyList = Response.data;
            $scope.Patient.AgencyID = 0;
        }, function (error) {
        });
    }

    $scope.geAgentList = function () {
        var ResponseData = Common.getMasterList('M_AgentMaster', 'ID', 'Name');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AgentList = Response.data;
            $scope.Patient.AgentID = 0;
        }, function (error) {
        });
    }

    $scope.getDoctorList = function (id) {
        var docType = false;
        if (id == 0) {
            $scope.DocList.length = 0;
            if (!$scope.isPatientSearch)
                $scope.DocList.splice(0, 0, { ID: 0, Description: "Select" });
            else $scope.DocList.splice(0, 0, { ID: 0, Description: "Referal Doctor" });
            $scope.Patient.ReferredDoctorID = 0; $scope.RefInfo.ReferredDoctorID = 0; $scope.Info.ReferredDoctorID = 0;
        }
        else if (id == 1) docType = true; else if (id == 2) docType = false;
        if (id > 0) {
            var ResponseData = Common.GetDoctorList(docType);
            ResponseData.then(function (Response) {
                if (!$scope.isPatientSearch)
                    Response.data.splice(0, 0, { ID: 0, Description: "Select" });
                else Response.data.splice(0, 0, { ID: 0, Description: "Referal Doctor" });
                $scope.DocList = Response.data;
                $scope.Patient.ReferredDoctorID = 0;
                $scope.Info.ReferredDoctorID = 0;
            }, function (error) {
            });
        }
    }

    $scope.getSpecializationList = function () {
        var ResponseData = Common.getMasterList('M_Specialization', 'SID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { SID: 0, Description: "Select" });
            $scope.SpecializationList = Response.data;
            $scope.Patient.SpecID = 0;
        }, function (error) {
        });
    }

    $scope.GetBDMList = function () {
        debugger;
        var ResponseData = Common.GetBDMList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.BDMList = Response.data;
            $scope.Patient.BDMID = 0;
        }, function (error) {
        });
    }

    $scope.newPatient = function () {
        $location.path('/New_Registration/');
    }

    $scope.formLoad = function () {
        if ($scope.isView) {
            $scope.getPatientByID();
        }
        else {
            $scope.isView = false;
            $scope.min = new Date().setYear(new Date().getYear() - 99);
            $scope.max = new Date();
            $scope.getSpecializationList();
            $scope.geAgencyList();
            $scope.geAgentList();
            $scope.GetBDMList();
        }
        $scope.fillIdPrppfTypeList();
        $scope.fillMarryStatusList();
        $scope.fillBloodGrpList();
        $scope.fillNationalityList();
        $scope.fillEthnicityList();
        $scope.fillReligionList();
        $scope.fillEducationList();
        $scope.fillOccupationList();
        $scope.getCountryList();
        $scope.getSourceOfrefList();
        $scope.getCampList();
        $scope.DocList = [];
        $scope.Patient.GenderID = 2
        $scope.DocList.splice(0, 0, { ID: 0, Description: "Select" });
        $scope.Patient.ReferredDoctorID = 0;
        angular.element(txtIdProofNo).attr('maxlength', 0);
        if (angular.element('#txtPartnrIdNO').length > 0)
            angular.element(txtPartnrIdNO).attr('maxlength', 0);
        var obj = {};
        obj = Common.getObj();
        if (angular.isDefined(obj.FirstName)) {
            if (obj != null) {
                $scope.Patient.FirstName = obj.FirstName;
                $scope.Patient.LastName = obj.LastName;
                if (angular.isDefined(obj.DOB))
                    $scope.Patient.DateOfBirth = new Date(obj.DOB);
                $scope.Patient.GenderID = obj.GenderID;
                $scope.CountryList = obj.CountryList;
                var con = $filter('filter')(obj.CountryList, { CountryID: obj.MobileCountryCode }, true);
                $scope.country = con[0].CountryCode;
                $scope.Patient.MobCountryCodeID = obj.MobileCountryCode;
                $scope.IsNonRegPatientRedirect = obj.IsNonRegPatientRedirect;
                $scope.Patient.MobileNo = obj.MobileNo;
                $scope.Patient.APPID = obj.APPID;
                if (angular.isDefined(obj.FirstName))
                    $scope.RegType = 2;
                Common.clearObj();

            }

        }
    }

    $scope.ddlPatientSearch = function () {
        debugger;
        $scope.ToDate = new Date();
        $scope.FromDate = new Date();
        $scope.isPostBack = true;
        $scope.max = new Date();
        $scope.Info.UnitID = localStorageService.get("UserInfo").UnitID;
        $scope.getPatientList();
        //$scope.Info.RegFromDate = new Date();
        //$scope.Info.RegToDate = new Date();
        //$scope.Info.RegVisFromDate = new Date();
        //$scope.Info.RegVisToDate = new Date();
        $scope.getSourceOfrefList();
        $scope.fillIdPrppfTypeList();
        $scope.fillClinicList();
        $scope.DocList = [];
        $scope.DocList.splice(0, 0, { ID: 0, Description: "Doctor" });
        $scope.Info.ReferredDoctorID = 0;
    }

    $scope.SelectedCountry = function (country, isPatient) {
        if (isPatient == 1) {
            $scope.Patient.MobCountryCodeID = country.CountryID;
            $scope.country = country.CountryCode;
        }
        else if (isPatient == 3) {
            $scope.Info.MobCountryCodeID = country.CountryID;
            $scope.country = country.CountryCode;
        }
        else {
            $scope.Partner.MobCountryCodeID = country.CountryID;
            $scope.partnrcountry = country.CountryCode;
        }
    }

    $scope.saveUpdate = function (isCheckIn) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var patient = $scope.Patient;
        var partner = $scope.Partner;       
        if (($scope.IsAuto==true || $scope.Patient.MRNo != undefined) && ($scope.Patient.FirstName != undefined && $scope.Patient.LastName != undefined
            && $scope.Patient.Age != undefined)) {//Added by AniketK on 09July2019

        if (validateForm(patient, partner)) {  //&& $scope.frmRegistration.$valid


                $scope.isReq = function (RegType) {
                    //debugger;
                    return ($scope.RegType != 2 || $scope.RegType != 3 || $scope.RegType != 4);  //   || $scope.RegType != 8 || $scope.RegType != 9
                };



                var registration = $scope.Registration;
                patient.Ispatient = true;
                registration.lstPatient.length = 0;
                registration.lstAddress.length = 0;



                if ($scope.RegType == 2) {
                    patient.PatientCategoryID = 11;  //individual
                    patient.objAddress.IsPatient = true;
                    registration.lstPatient.push(patient);
                    if (patient.objAddress.CountryID > 0)
                        registration.lstAddress.push(patient.objAddress);
                }

                else if ($scope.RegType == 3) {                   //Donor    // added sujata
                    if (patient.GenderID == 1)
                        patient.PatientCategoryID = 9;
                    else
                        patient.PatientCategoryID = 8;


                    patient.objAddress.IsPatient = true;
                    registration.lstPatient.push(patient);
                    if (patient.objAddress.CountryID > 0)
                        registration.lstAddress.push(patient.objAddress);
                }


                    //else if ($scope.RegType == 3) {
                    //    patient.PatientCategoryID = 9;  //  male Donor    // added sujata
                    //    patient.objAddress.IsPatient = true;
                    //    registration.lstPatient.push(patient);
                    //    if (patient.objAddress.CountryID > 0)
                    //        registration.lstAddress.push(patient.objAddress);
                    //}
                else if ($scope.RegType == 4) {
                    patient.PatientCategoryID = 10;  //Surrogacy    // added sujata
                    patient.objAddress.IsPatient = true;
                    registration.lstPatient.push(patient);
                    if (patient.objAddress.CountryID > 0)
                        registration.lstAddress.push(patient.objAddress);
                }



                else {
                    patient.DateOfBirth = $filter('date')(patient.DateOfBirth, 'medium');
                    partner.DateOfBirth = $filter('date')(partner.DateOfBirth, 'medium');
                    partner.Ispatient = false;
                    patient.objAddress.IsPatient = true;
                    partner.objAddress.IsPatient = false;
                    partner.FamilyType = patient.FamilyType;
                    //Added by Nayan Kamble  Start
                    partner.MarriedSince = patient.MarriedSince;
                    partner.ExistingChildren = patient.ExistingChildren;
                    partner.IsReferredPatient = patient.IsReferredPatient;
                    partner.SourceOfReferenceID = patient.SourceOfReferenceID;
                    partner.CampID = patient.CampID;
                    partner.ReferredDoctorID = patient.ReferredDoctorID;
                    partner.ReferralRemark = patient.ReferralRemark;
                    //Added by Nayan Kamble  End
                    if ($scope.RegType == 1) {
                        patient.PatientCategoryID = 7;  //couple
                        partner.PatientCategoryID = 7;
                    }
                    else if ($scope.RegType == 3) {
                        if (patient.GenderID == 2)
                            patient.PatientCategoryID = 8;  //female donor
                        else if (patient.GenderID == 1)
                            patient.PatientCategoryID = 9;   //male donor
                        partner.PatientCategoryID = 0;
                    }
                    else if ($scope.RegType == 4) {
                        patient.PatientCategoryID = 10;  //surogate
                        partner.PatientCategoryID = 0;
                    }

                    registration.lstPatient.push(patient);
                    registration.lstPatient.push(partner);
                    debugger;
                    if (patient.objAddress.CountryID > 0)
                        registration.lstAddress.push(patient.objAddress);
                    if (partner.objAddress.CountryID > 0)
                        registration.lstAddress.push(partner.objAddress);
                }

                //audit trial
                //var OldDataValuepatient = [];
                //for (var i = 0; i < $scope.frmRegistration.modifiedModels.length; i++) {
                //    if ($scope.frmRegistration.modifiedModels[i].masterValue === undefined || $scope.frmRegistration.modifiedModels[i].masterValue === null)
                //        $scope.frmRegistration.modifiedModels[i].masterValue = "";
                //    if (typeof ($scope.frmRegistration.modifiedModels[i].$viewValue) != "string") {
                //        var obj = $scope.frmRegistration.modifiedModels[i].$viewValue;
                //        var newVal = obj[Object.keys(obj)[0]];
                //        var jmodel = {
                //            field: $scope.frmRegistration.modifiedModels[i].$name,
                //            oldvalue: $scope.frmRegistration.modifiedModels[i].masterValue.toString(),
                //            newvalue: newVal,
                //            ID: i
                //        };
                //    }
                //    else {
                //        var jmodel = {
                //            field: $scope.frmRegistration.modifiedModels[i].$name,
                //            oldvalue: $scope.frmRegistration.modifiedModels[i].masterValue.toString(),
                //            newvalue: $scope.frmRegistration.modifiedModels[i].$viewValue.toString(),
                //            ID: i
                //        };
                //    }
                //    OldDataValuepatient.push(jmodel);
                //}
                // OldDataValuepatient commented by sujata

                var ResponseData = RegistartionService.saveUpdate($scope.Registration);  // , OldDataValuepatient commented by sujata
                ResponseData.then(function (Response) {
                    debugger;
                    var arr = Response.data.split('/');
                    if (arr[0] == 1) {
                        if (isCheckIn) {
                            AlertMessage.success('PalashIVF', 'Patient registered successfully.');
                            $rootScope.MarkVisitData = {};
                            $rootScope.MarkVisitData.IsLoadVisitData = true;
                            $rootScope.MarkVisitData.IsFromRegistration = true;
                            sessionStorage.setItem("MRN", JSON.stringify(arr[1]));
                            $location.path('/PatientVisit/');
                        }
                        else {
                            $scope.Info.RegVisToDate = null;
                            $scope.Info.RegVisFromDate = null;
                            $location.path('/PatientList/');
                            AlertMessage.success('PalashIVF', 'Patient registered successfully.');
                            clearform(); //Commented by AniketK on 10July2019
                        }
                    }
                        //else if (Response.data == 2) { //Commented and Modified by AniketK on 10July2019
                    else if (arr[0] == 2) {
                        AlertMessage.success('PalashIVF', 'Patient already registerd with these MRNo' + arr[1]);
                    }
                    //clearform(); //Commented by AniketK on 10July2019
                    usSpinnerService.stop('GridSpinner');
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else {
                debugger;
                if (!$scope.IsValidCountryCode
                   && !$scope.IsValidGreaterAge
                   && !$scope.IsValidLesserAge) {
                    AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                } //else if (!$scope.IsIdentityID) {
                    //$scope.frmRegistration.txtIdProofNo.$dirty = true;
                    //AlertMessage.warning('PalashIVF', 'Please select Identity proof');}
                 else if (!$scope.IsValidLesserAge) {
                    if ($scope.RegType == 2) {
                        if ($scope.Patient.GenderID == 1) {
                            AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-60.');
                        } else if ($scope.Patient.GenderID == 2) {
                            AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');
                        }
                    } else if ($scope.RegType == 3) {
                        if ($scope.Patient.GenderID == 1) {
                            AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
                        } else if ($scope.Patient.GenderID == 2) {
                            AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');
                        } else {
                            AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
                        }
                    } else {
                        AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');
                    }
                } else if (!$scope.IsValidGreaterAge) {
                    if ($scope.RegType == 3) {
                        if ($scope.Patient.GenderID == 1) {
                            AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
                        } else if ($scope.Patient.GenderID == 2) {
                            AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');
                        } else {
                            AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
                        }
                    } else {
                        AlertMessage.warning('PalashIVF', 'Partner age should be in range of 21-60.');
                    }
                } else if (!$scope.IsValidEmail) {
                    AlertMessage.warning('PalashIVF', 'Please enter valid email id.');
                } else if (!$scope.IsValidCountryCode) {
                    AlertMessage.warning('PalashIVF', 'Please enter valid country code.');
                } else if ($scope.IsSourceOfReference != undefined && !$scope.IsSourceOfReference) {       //!$scope.IsSourceOfReference   commented by Nayan Kamble
                    AlertMessage.warning('PalashIVF', 'Please enter Source Of Reference.');
                }
                else if ($scope.IsFillExternalDoctor != undefined && !$scope.IsFillExternalDoctor) {       // Added by Nayan Kamble
                    AlertMessage.warning('PalashIVF', 'Please fill External Doctor Details.');
                }
                else {

                }
                $scope.frmRegistration.txtMRNo.$dirty = true;
                $scope.frmRegistration.txtAge.$dirty = true;
                $scope.frmRegistration.txtFirstName.$dirty = true;
                $scope.frmRegistration.txtLastName.$dirty = true;
                $scope.frmRegistration.partnrDOB.$dirty = true;
                $scope.frmRegistration.txtMobCountryCode.$dirty = true;
                $scope.frmRegistration.txtMobNo.$dirty = true;
                //$scope.frmRegistration.ddlIDProofType.$dirty = true;
                //$scope.frmRegistration.txtIdProofNo.$dirty = true;
                debugger;
                //$scope.frmRegistration.ddlIDProofType.$dirty = true;
                //$scope.style = "border-color:red";
                $scope.frmRegistration.patientDOB.$valid = false;
                //if ($scope.RegType != 2) {
                //    $scope.frmRegistration.txtPartnrFirstName.$dirty = true;
                //    $scope.frmRegistration.txtpartnrLastName.$dirty = true;
                //    $scope.frmRegistration.patientDOB.$dirty = true;
                //    $scope.frmRegistration.txtPartnrIDNo.$dirty = true;
                //    //$scope.frmRegistration.txtpartnrMobConCode.$dirty = true;
                //    //$scope.frmRegistration.txtpartnrMobNo.$dirty = true;
                //    //$scope.frmRegistration.txtPartnrEmail.$dirty = true;
                //}  //tempary commented

                if ($scope.RegType == 3) {
                    $scope.frmRegistration.txtPartnrFirstName.$dirty = false;
                    $scope.frmRegistration.txtpartnrLastName.$dirty = false;
                    $scope.frmRegistration.patientDOB.$dirty = true;
                    $scope.frmRegistration.txtPartnrIDNo.$dirty = false;
                    //$scope.frmRegistration.txtpartnrMobConCode.$dirty = true;
                    //$scope.frmRegistration.txtpartnrMobNo.$dirty = true;
                    //$scope.frmRegistration.txtPartnrEmail.$dirty = true;
                }
                usSpinnerService.stop('GridSpinner');


                //AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
                //$scope.frmRegistration.txtFirstName.$dirty = true;
                //$scope.frmRegistration.txtLastName.$dirty = true;
                //$scope.frmRegistration.partnrDOB.$dirty = true;
                //$scope.frmRegistration.txtMobCountryCode.$dirty = true;
                //$scope.frmRegistration.txtMobNo.$dirty = true;
                //$scope.frmRegistration.ddlIDProofType.$dirty = true;
                //$scope.frmRegistration.txtIdProofNo.$dirty = true;
                //debugger;
                //$scope.frmRegistration.ddlIDProofType.$dirty = true;
                ////$scope.style = "border-color:red";
                //$scope.frmRegistration.patientDOB.$valid = false;
                //if ($scope.RegType != 2) {
                //    $scope.frmRegistration.txtPartnrFirstName.$dirty = true;
                //    $scope.frmRegistration.txtpartnrLastName.$dirty = true;
                //    $scope.frmRegistration.patientDOB.$dirty = true;
                //    $scope.frmRegistration.txtPartnrIDNo.$dirty = true;
                //    //$scope.frmRegistration.txtpartnrMobConCode.$dirty = true;
                //    //$scope.frmRegistration.txtpartnrMobNo.$dirty = true;
                //    //$scope.frmRegistration.txtPartnrEmail.$dirty = true;
                //}
                //usSpinnerService.stop('GridSpinner');
            }
        }
        else {
            $scope.frmRegistration.txtMRNo.$dirty = true;
            //$scope.frmRegistration.ddlIDProofType.$dirty = true;
            //$scope.frmRegistration.txtIdProofNo.$dirty = true;
            $scope.frmRegistration.txtAge.$dirty = true;
            $scope.frmRegistration.txtFirstName.$dirty = true;
            $scope.frmRegistration.txtLastName.$dirty = true;
            $scope.frmRegistration.txtMobCountryCode.$dirty = true;
            $scope.frmRegistration.txtMobNo.$dirty = true;
            AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
            //AlertMessage.info('PalashIVF', 'Please Fill MRNo. field.');
        }
    }

    $scope.showAddPopUp = function () {
        debugger;
        clearAddressPopUp();
        var idxPatient = $scope.Registration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == true && $scope.addFor == 'patient' });
        var idxPartnr = $scope.Registration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == false && $scope.addFor == 'partner' });
        if (idxPatient > -1) {
            $scope.objAddress = angular.copy($scope.Registration.lstAddress[idxPatient]);
        }
        else if (idxPartnr > -1) {
            $scope.objAddress = angular.copy($scope.Registration.lstAddress[idxPartnr]);
        }
        if ($scope.objAddress.CountryID > 0)
            $scope.GetStateList($scope.objAddress.CountryID, 'other');
        //if ($scope.objAddress.StateID > 0)
        //$scope.GetCityList($scope.objAddress.StateID, 'other');

        angular.element(Add1).modal('show');
    }

    $scope.addOtherAddress = function (objAdd) {
        debugger;
        if ($scope.addFor == 'patient') {
            objAdd.IsOther = true;
            objAdd.IsPatient = true;
        }
        else if ($scope.addFor == 'partner') {
            objAdd.IsOther = true;
            objAdd.IsPatient = false;
        }
        var idxPatient = $scope.Registration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == true && $scope.addFor == 'patient' });
        var idxPartnr = $scope.Registration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == false && $scope.addFor == 'partner' });
        if (idxPatient > -1) {
            $scope.Registration.lstAddress.splice(idxPatient, 1);
        }
        else if (idxPartnr > -1) {
            $scope.Registration.lstAddress.splice(idxPartnr, 1);
        }
        if (objAdd.CountryID > 0) {
            $scope.Registration.lstAddress.push(angular.copy(objAdd));
            angular.element(Add1).modal('hide');
            $scope.addFor = null;
            clearAddressPopUp();
        }
        else AlertMessage.info('PalashIVF', 'Fill address.');
    }

    $scope.chageRegType = function (regType) {
        // clearform();
        debugger;
        if (regType == 1) {
            angular.element(lblPartnrFemaleGdr).show();
            angular.element(lblPatMaleGdr).show();
            angular.element(lblPatTransGdr).show();
            angular.element(lblPartnrTransGdr).show();

            //angular.element(lblPatMaleGdr).disabled=true;
        }
        else if (regType == 2) {
            angular.element(lblPartnrFemaleGdr).show();
            angular.element(lblPatMaleGdr).show();
            angular.element(lblPartnrTransGdr).show();
            angular.element(lblPatTransGdr).show();
        }
        else if (regType == 3) {
            angular.element(lblPartnrFemaleGdr).show();
            angular.element(lblPatMaleGdr).show();
            angular.element(lblPatTransGdr).hide();
            angular.element(lblPartnrTransGdr).hide();
            $scope.info = true;
            if ($scope.Patient.GenderID == 1)
                $scope.Partner.GenderID == 1;
            else if ($scope.Patient.GenderID == 2)
                $scope.Partner.GenderID == 2;
           

            //   angular.element(lblPatTransGdr)[0].style.display = 'none';
        }
        else if (regType == 4) {
            angular.element(lblPartnrFemaleGdr).hide();
            angular.element(lblPatMaleGdr).hide();
            angular.element(lblPartnrTransGdr).hide();
            angular.element(lblPatTransGdr).hide();
        }
    }

    function clearAddressPopUp() {
        for (var key in $scope.objAddress) {
            if ($scope.objAddress.hasOwnProperty(key)) {
                if (typeof $scope.objAddress[key] === 'string') {
                    $scope.objAddress[key] = undefined;
                }
                else if (typeof $scope.objAddress[key] === 'number') {
                    $scope.objAddress[key] = 0;
                }
                else if (typeof $scope.objAddress[key] === 'boolean') {
                    $scope.objAddress[key] = false;
                }
            }
        }
    }

    function clearform() {
        debugger;       
        clearAddressPopUp();
        for (var key in $scope.Patient.objAddress) {
            if ($scope.Patient.objAddress.hasOwnProperty(key)) {
                if (typeof $scope.Patient.objAddress[key] === 'string') {
                    $scope.Patient.objAddress[key] = undefined;
                }
                else if (typeof $scope.Patient.objAddress[key] === 'number') {
                    $scope.Patient.objAddress[key] = 0;
                }
                else if (typeof $scope.Patient.objAddress[key] === 'boolean') {
                    $scope.Patient.objAddress[key] = false;
                }
            }
        }
        for (var key in $scope.Partner.objAddress) {
            if ($scope.Partner.objAddress.hasOwnProperty(key)) {
                if (typeof $scope.Partner.objAddress[key] === 'string') {
                    $scope.Partner.objAddress[key] = undefined;
                }
                else if (typeof $scope.Partner.objAddress[key] === 'number') {
                    $scope.Partner.objAddress[key] = 0;
                }
                else if ($scope.Partner.objAddress[key] == 'boolean') {
                    $scope.Partner.objAddress[key] = false;
                }
            }
        }

        for (var key in $scope.Patient) {
            if ($scope.Patient.hasOwnProperty(key)) {
                if (typeof $scope.Patient[key] === 'string') {
                    $scope.Patient[key] = undefined;
                }
                else if (typeof $scope.Patient[key] === 'number') {
                    $scope.Patient[key] = 0;
                }
                else if ($scope.Patient[key] instanceof Date) {
                    $scope.Patient[key] = null;
                }
            }
        }

        for (var key in $scope.Partner) {
            if ($scope.Partner.hasOwnProperty(key)) {
                if (typeof $scope.Partner[key] === 'string') {
                    $scope.Partner[key] = undefined;
                }
                else if (typeof $scope.Partner[key] === 'number') {
                    $scope.Partner[key] = 0;
                }
                else if ($scope.Partner[key] instanceof Date) {
                    $scope.Partner[key] = null;
                }
            }
        }
        $scope.Patient.GenderID = 2;
        $scope.Partner.GenderID = 1;
        $scope.Patient.FamilyType = 2;
        $scope.Registration.lstPatient.length = 0;
        $scope.Registration.lstAddress.length = 0;
    }

    $scope.onePermantAddress = function () {
        debugger;
        if ($scope.Patient.objAddress.IsPermenant && $scope.addFor == 'patient')
            $scope.objAddress.IsPermenant = false;
        else if ($scope.Partner.objAddress.IsPermenant && $scope.addFor == 'partner')
            $scope.objAddress.IsPermenant = false;

        var idxPatient = $scope.Registration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == true && x.IsPermenant == true });
        var idxPartnr = $scope.Registration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == false && x.IsPermenant == true });
        if (idxPatient > -1)
            $scope.Patient.objAddress.IsPermenant = false;
        if (idxPartnr > -1)
            $scope.Partner.objAddress.IsPermenant = false;
    }

    $scope.onePermantAddressUpdate = function () {
        debugger;
        if (!$scope.objAddress.IsSecAddPermenant && !$scope.objAddress.IsPermenant)
            $scope.objAddress.IsPermenant = false;
        else if (!$scope.objAddress.IsSecAddPermenant && $scope.objAddress.IsPermenant)
            $scope.objAddress.IsPermenant = true;
        else if ($scope.objAddress.IsSecAddPermenant && $scope.objAddress.IsPermenant)
            $scope.objAddress.IsPermenant = true;
        else if ($scope.objAddress.IsSecAddPermenant && !$scope.objAddress.IsPermenant)
            $scope.objAddress.IsPermenant = false;
    }

    $scope.$watch('Patient.DateOfBirth', function (newValue) {
        if (angular.isDate(newValue)) {
            if ($scope.isView)
                $scope.Info.Age = parseInt((new Date() - newValue) / (1000 * 60 * 60 * 24 * 365.25));
            else
                $scope.Patient.Age = parseInt((new Date() - newValue) / (1000 * 60 * 60 * 24 * 365.25));
        }
        if ($scope.Patient.Age > 0 && $scope.Patient.DateOfBirth != null)
            angular.element(txtAge).prop('disabled', true);
    });
    $scope.$watch('Partner.DateOfBirth', function (newValue) {
        if (angular.isDate(newValue))
            $scope.Partner.Age = parseInt((new Date() - newValue) / (1000 * 60 * 60 * 24 * 365.25));
        if ($scope.Partner.Age > 0 && $scope.Partner.DateOfBirth != null)
            angular.element(txtpartnrAge).prop('disabled', true);
    });

    $scope.clearDob = function (from) {
        debugger;
        if (from == 'partner') {
            angular.element(txtpartnrAge).prop('disabled', false);
            $scope.Partner.DateOfBirth = null; $scope.Partner.Age = null;
        }
        else if (from == 'patient') {
            if ($scope.isView) {
                $scope.Info.DateOfBirth = null;
                $scope.Info.Age = null;
            }
            else
                $scope.Patient.DateOfBirth = null; $scope.Patient.Age = null
            angular.element(txtAge).prop('disabled', false);
        }
    };

    //$scope.handleFileSelect = function (evt) {
    //    debugger;
    //    var file = evt.files[0];
    //    var extn = file.name.split(".").pop().toLowerCase();
    //    $scope.filename = file.name;
    //    var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
    //    var validExtension = false;
    //    $scope.filename = file.name;
    //    $scope.tempFileName = $scope.filename;    //Added by Nayan Kamble
    //    $scope.extn = extn;
    //    extensions.forEach(function (x) {
    //        if (x === extn) {
    //            validExtension = true;
    //        }
    //    });
    //    var maxSize = 2097152;  // 2mb
    //    var valid = (file.size) <= maxSize;
    //    //
    //    if (validExtension) {
    //        if (valid) {
    //            var reader = new FileReader();
    //            reader.onload = function (evt) {
    //                $scope.$apply(function ($scope) {
    //                    $scope.myImage = evt.target.result;
    //                });
                    
    //            };
    //            reader.readAsDataURL(file);
              
                
    //        }
    //        else {
    //            AlertMessage.info('PalashIVF', 'Attactment should be not greater than 2 MB.');
    //        }
    //    }
       
    //    else {
    //        AlertMessage.info('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');
    //    }
    //}






    $scope.handleFileSelect = function (evt) {
        debugger;
        var file = evt.files[0];
        var extn = file.name.split(".").pop().toLowerCase();
        $scope.filename = file.name;
        var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
        var validExtension = false;
        $scope.filename = file.name;
        $scope.extn = extn;
        extensions.forEach(function (x) {
            if (x === extn) {
                validExtension = true;
            }
        });
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




    //$scope.captureImage = function () {
    //    debugger;
    //    if ($scope.myImage == null) {       //Added by Nayan Kamble
    //        AlertMessage.error('PalashIVF', "Please select file /both files are same.");
    //    }
    //    else {
    //        $scope.tempImage = $scope.myImage;    //Added by Nayan Kamble
    //        if ((angular.isString($scope.myCroppedImage) && !$scope.isAttach) || (angular.isString($scope.myImage) && $scope.isAttach)) {
    //            if ($scope.addFor == 'patient') {
    //                if (!$scope.isAttach) {
    //                    if (!$scope.isView) {
    //                        $scope.Patient.strPhoto = $scope.myCroppedImage;
    //                        $scope.Patient.FileName = $scope.filename;
    //                    }
    //                    else {
    //                        Common.setID($scope.Patient.ID);
    //                        var ResponseData = RegistartionService.updatePhoto($scope.Patient.ID, $scope.Patient.UnitID, $scope.myCroppedImage, $scope.filename);
    //                        ResponseData.then(function (Response) {
    //                            if (Response.data == 1) {
    //                                $scope.getPatientByID();
    //                                Common.clearID();
    //                                AlertMessage.success('PalashIVF', 'Photo updated successfully.');
    //                            }
    //                            else AlertMessage.error('PalashIVF', 'Error occured.');
    //                            angular.element(modPhoto).modal('hide');
    //                        }, function (error) {
    //                        })
    //                    }
    //                }
    //                else {
    //                    if (!$scope.isView) {
    //                        $scope.Patient.strAttachment = $scope.myImage;
    //                        $scope.Patient.attFileName = $scope.filename;
    //                    }
    //                    else {
    //                        Common.setID($scope.Patient.ID);
    //                        var ResponseData = RegistartionService.updateAttachment($scope.Patient.ID, $scope.Patient.UnitID, $scope.myImage, $scope.filename);
    //                        ResponseData.then(function (Response) {
    //                            if (Response.data == 1) {
    //                                $scope.getPatientByID();
    //                                Common.clearID();
    //                                AlertMessage.success('PalashIVF', 'Attachment updated successfully.');
    //                            }
    //                            else AlertMessage.error('PalashIVF', 'Error occured.');
    //                            angular.element(modAttachment).modal('hide');
    //                        }, function (error) {
    //                        })
    //                    }
    //                }
    //            }
    //            else if ($scope.addFor == 'partner') {
    //                if (!$scope.isAttach) {
    //                    $scope.Partner.strPhoto = $scope.myCroppedImage;
    //                    $scope.Partner.FileName = $scope.filename;
    //                }
    //                else {
    //                    $scope.Partner.strAttachment = $scope.myImage;
    //                    $scope.Partner.attFileName = $scope.filename;
    //                }
    //            }
    //            $scope.addFor = null;
    //            $scope.myCroppedImage = null;
    //            $scope.myImage = null;
    //            $scope.filename = null;
    //            $scope.tempFileName = null;    //Added by Nayan Kamble
    //            if (!$scope.isAttach)
    //                angular.element(modPhoto).modal('hide');
    //            else angular.element(modAttachment).modal('hide');
    //        }
    //        else
    //            //AlertMessage.info('PalashIVF', 'Select or capture photo.');
    //        {     //Added by Nayan Kamble
    //            if ($scope.filename == null) {
    //                AlertMessage.error('PalashIVF', 'Please select File.');
    //            }
    //            else if ($scope.tempCroppedImage == $scope.tempImage) {
    //                AlertMessage.error('PalashIVF', "Both image are same,please select another image.");
    //            }
    //            else {
    //                if ($scope.tempCroppedImage == $scope.tempImage && $scope.tempFileName != null) {
    //                    AlertMessage.error('PalashIVF', 'Select or capture photo.');
    //                }
    //            }
    //        }
    //    }
    //}




    $scope.captureImage = function () {
        debugger;
        if ($scope.myImage == null) {
            AlertMessage.error(objResource.msgTitle, "Please select file /both files are same.");
        }
        else {
            $scope.tempImage = $scope.myImage;
            if ((angular.isString($scope.myCroppedImage) && !$scope.isAttach) || (angular.isString($scope.myImage) && $scope.isAttach)) {
                if ($scope.addFor == 'patient') {
                    debugger;
                    if (!$scope.isAttach) {
                        if (!$scope.isView) {
                            $scope.Patient.strPhoto = $scope.myCroppedImage;
                            $scope.Patient.FileName = $scope.filename;
                        }
                        else {
                            Common.setID($scope.Patient.ID);
                            var ResponseData = RegistartionService.updatePhoto($scope.Patient.ID, $scope.Patient.UnitID, $scope.myCroppedImage, $scope.filename);
                            ResponseData.then(function (Response) {
                                if (Response.data == 1) {
                                    $scope.getPatientByID();
                                    Common.clearID();
                                    //AlertMessage.success('PalashIVF', 'Photo updated successfully.');
                                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdatephoto);
                                }
                                else //AlertMessage.error('PalashIVF', 'Error occured.');
                                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                                angular.element(modPhoto).modal('hide');
                            }, function (error) {
                            })
                        }
                    }
                    else {
                        if (!$scope.isView) {
                            $scope.Patient.strAttachment = $scope.myImage;
                            $scope.Patient.attFileName = $scope.filename;
                        }
                        else {
                            Common.setID($scope.Patient.ID);
                            var ResponseData = RegistartionService.updateAttachment($scope.Patient.ID, $scope.Patient.UnitID, $scope.myImage, $scope.filename);
                            ResponseData.then(function (Response) {
                                if (Response.data == 1) {
                                    $scope.getPatientByID();
                                    Common.clearID();
                                    // AlertMessage.success('PalashIVF', 'Attachment updated successfully.');
                                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdateAttachement);
                                }
                                else //AlertMessage.error('PalashIVF', 'Error occured.');
                                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                                angular.element(modAttachment).modal('hide');
                            }, function (error) {
                            })
                        }
                    }
                }
                else if ($scope.addFor == 'partner') {
                    if (!$scope.isAttach) {
                        $scope.Partner.strPhoto = $scope.myCroppedImage;
                        $scope.Partner.FileName = $scope.filename;
                    }
                    else {
                        $scope.Partner.strAttachment = $scope.myImage;
                        $scope.Partner.attFileName = $scope.filename;
                    }
                }
                $scope.addFor = null;
                $scope.myCroppedImage = null;
                $scope.myImage = null;
                $scope.filename = null;
                $scope.tempFileName = null;
                if (!$scope.isAttach)
                    angular.element(modPhoto).modal('hide');
                else angular.element(modAttachment).modal('hide');

            }
            else {
                if ($scope.filename == null) {
                    AlertMessage.error(objResource.msgTitle, 'Please select File.');
                }
                else if ($scope.tempCroppedImage == $scope.tempImage) {
                    AlertMessage.error(objResource.msgTitle, "Both image are same,please select another image.");
                }
                else {
                    if ($scope.tempCroppedImage == $scope.tempImage && $scope.tempFileName != null) {
                        AlertMessage.error(objResource.msgTitle, objResource.lblCaptureAndChoose);
                    }
                }
            }
        }
    }







    $scope.patOpts = { x: 0, y: 0, w: 25, h: 25 };
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

    $scope.onError = function (err) {
        $scope.$apply(
            function () {
                $scope.webcamError = err;
            }
        );
    };

    //$scope.destroyWebcam = function () {      //added by sujata for webcam
    //    $scope.$broadcast('$destroy');
    //};

    //$scope.stopWebcam = function () {
    //    $scope.$broadcast('STOP_WEBCAM');
    //};

    var _video = null,
    patData = null;
    $scope.onSuccess = function () {
        //debugger;
        // The video element contains the captured camera data
        _video = $scope.channel.video;
        $scope.$apply(function () {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            //$scope.showDemos = true;
        });
    };

    var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
        $scope.myImage = imgBase64;
    };

    var getVideoData = function getVideoData(x, y, w, h) {
        //debugger;
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    $scope.closePhotoCapture = function () {
        debugger;
        $scope.addFor = null;
        $scope.myCroppedImage = null;
        $scope.myImage = null;
        angular.element(modPhoto).modal('hide');
    }

    $scope.closeAttachCapture = function () {
        debugger;
        $scope.addFor = null;
        $scope.myCroppedImage = null;
        $scope.myImage = null;
        angular.element(modAttachment).modal('hide');
    }

    $scope.getPatientList = function () {
        debugger;
        if (checkDate()) {
            usSpinnerService.spin('GridSpinner');
            if ($scope.Info.regTypeID == 1) $scope.Info.PatientCategoryID = 7;
            else if ($scope.Info.regTypeID == 2) $scope.Info.PatientCategoryID = 11;
            else if ($scope.Info.regTypeID == 3) $scope.Info.PatientCategoryID = 8;
            else if ($scope.Info.regTypeID == 4) $scope.Info.PatientCategoryID = 10;
            else $scope.Info.PatientCategoryID = 0;
            if (angular.isUndefined($scope.Info.IdentityNumber)) { $scope.Info.IdentityNumber = ''; }
            if (angular.isUndefined($scope.Info.FirstName)) { $scope.Info.FirstName = ''; }
            if ($scope.isPostBack) {
                $scope.Info.RegToDate = $filter('date')(new Date(), 'medium');
                $scope.Info.RegFromDate = $filter('date')(new Date(), 'medium');
                //    if (!$scope.isView){
                //    $scope.Info.RegVisToDate = $filter('date')(new Date(), 'medium');
                //    $scope.Info.RegVisFromDate = $filter('date')(new Date(), 'medium');
                //}
            }
            if ($scope.SearchBy == 1) {
                $scope.Info.RegToDate = $filter('date')($scope.ToDate, 'medium');
                $scope.Info.RegFromDate = $filter('date')($scope.FromDate, 'medium');
                $scope.Info.RegVisToDate = null; $scope.Info.RegVisFromDate = null;
            }
            if ($scope.SearchBy == 2) {
                $scope.Info.RegVisToDate = $filter('date')($scope.ToDate, 'medium');
                $scope.Info.RegVisFromDate = $filter('date')($scope.FromDate, 'medium');
                $scope.Info.RegFromDate = null; $scope.Info.RegToDate = null;
            }

            $scope.Info.PageNo = $scope.CurrentPage - 1;
            debugger;
            var response = RegistartionService.getPatientList($scope.Info);
            response.then(function (resp) {
                debugger;
                $scope.patientList = resp.data;
                if (resp.data.length > 0) {
                    $scope.TotalItems = resp.data[0].TotalItems;
                }
                else $scope.TotalItems = 0;
                //if ($scope.isPostBack) {
                //    $scope.Info.RegToDate = null;
                //    $scope.Info.RegFromDate = null;
                //    $scope.Info.RegVisToDate = null;
                //    $scope.Info.RegVisFromDate = null;
                //}
                $scope.isPostBack = false;
                usSpinnerService.stop('GridSpinner');
                $scope.BankData = $scope.patientList;
                //$scope.Info.RegToDate = $scope.Info.RegToDate!=null?new Date($scope.Info.RegToDate):null;
                //$scope.Info.RegFromDate = $scope.Info.RegFromDate != null ? new Date($scope.Info.RegFromDate) : null;
                //$scope.Info.RegVisToDate =$scope.Info.RegVisToDate!=null? new Date($scope.Info.RegVisToDate):null;
                //$scope.Info.RegVisFromDate =$scope.Info.RegVisFromDate!=null? new Date($scope.Info.RegVisFromDate):null;
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            })
        }
    }

    function checkDate() {
        //if (angular.isDate($scope.Info.RegFromDate) && angular.isDate($scope.Info.RegToDate)) {
        //    if (new Date($scope.Info.RegFromDate) > new Date($scope.Info.RegToDate)) {
        //        AlertMessage.warning('PalashIVF', 'Register From date should be greater than Register to date.')
        //        return false;
        //    }
        //    else return true;
        //}
        //else
        if (angular.isDate($scope.FromDate) && angular.isDate($scope.ToDate)) {
            if (new Date($scope.FromDate) > new Date($scope.ToDate)) {
                AlertMessage.warning('PalashIVF', 'From date should be greater than To date.')
                return false;
            }
            else return true;
        }
        else return true;
    }

    $scope.disableDate = function () {
        if (angular.isDate($scope.Info.RegFromDate) || angular.isDate($scope.Info.RegToDate)) {
            angular.element(txtVisFromDate).attr('disabled', true);
            angular.element(txtVisToDate).attr('disabled', true);
            angular.element(spnVisFromDate).css("pointer-events", "none");
            angular.element(spnVisToDate).css("pointer-events", "none");
            $scope.Info.RegVisFromDate = null;
            $scope.Info.RegVisToDate = null;
        }
        else {
            angular.element(txtVisFromDate).attr('disabled', false);
            angular.element(txtVisToDate).attr('disabled', false);
            angular.element(spnVisFromDate).css("pointer-events", "auto");
            angular.element(spnVisToDate).css("pointer-events", "auto");
        }
        if (angular.isDate($scope.Info.RegVisFromDate) || angular.isDate($scope.Info.RegVisToDate)) {
            angular.element(txtRegFromDate).attr('disabled', true);
            angular.element(txtRegToDate).attr('disabled', true);
            angular.element(spnRegFromDate).css("pointer-events", "none");
            angular.element(spnRegToDate).css("pointer-events", "none");
            $scope.Info.RegFromDate = null;
            $scope.Info.RegToDate = null;
        }
        else {
            angular.element(txtRegFromDate).attr('disabled', false);
            angular.element(txtRegToDate).attr('disabled', false);
            angular.element(spnRegFromDate).css("pointer-events", "auto");
            angular.element(spnRegToDate).css("pointer-events", "auto");
        }
    }

    $scope.viewPatient = function (id, UnitID) {
        debugger;
        Common.clearID();
        Common.setID(id);
        Common.clearUnitID();
        Common.setUnitID(UnitID);
        $location.path('/PatientView/');
    }

    $scope.getPatientByID = function () {
        usSpinnerService.spin('GridSpinner');
        var response = RegistartionService.getPatientByID(Common.getID());
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.Patient = resp.data;
                if ($scope.Patient.FamilyType == 1)     //Added by Nayan Kamble
                    $scope.FamilyType = 'Joint';
                else
                    $scope.FamilyType = 'Nuclear';
            }
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        })
    }

    $scope.cancelView = function () {
        Common.clearID();
        $location.path('/PatientList/');
    }

    $scope.GetBankInfo = function () {

        if (angular.isUndefined($scope.Patient.ID))
            var PatientID = Common.getID();
        else
            var PatientID = $scope.Patient.ID;


        if (angular.isUndefined($scope.Patient.UnitID))
            var UnitID = Common.getUnitID();
        else
            var UnitID = $scope.Patient.UnitID;

        var response = RegistartionService.GetBankInformation(PatientID, UnitID);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.BankData = resp.data;
            }
        }, function (error) {
        })


        //Get Sponsor List
        debugger;
        var Promise = PatientVisitService.GetSponsers(PatientID, 0);
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
    $scope.getPatientInfo = function () {
        debugger;
        var response = RegistartionService.getPatientInfo($scope.Patient.ID);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.Info = resp.data;
                if (resp.data.DateOfBirth != null)
                    $scope.Info.DateOfBirth = new Date(resp.data.DateOfBirth);
                else
                    $scope.Info.DateOfBirth = null;
                $scope.Info.FirstName = $scope.Patient.FirstName;
                $scope.Info.LastName = $scope.Patient.LastName;
                $scope.Info.Age = $scope.Patient.Age;
                $scope.Info.Email = $scope.Patient.Email;
                $scope.Info.MobileNo = $scope.Patient.MobileNo;
                var con = $filter('filter')($scope.CountryList, { CountryID: resp.data.MobCountryCodeID }, true);
                $scope.country = con[0].CountryCode;
            }
        }, function (error) {
        })
    }

    $scope.updatePatientInfo = function () {
        debugger;
        if (validatePatientInfo($scope.Info)) {
            Common.setID($scope.Patient.ID);
            //audit trial
            var OldDataValuepatientEdit = [];
            for (var i = 0; i < $scope.frmRegistration.modifiedModels.length; i++) {
                if ($scope.frmRegistration.modifiedModels[i].masterValue === undefined || $scope.frmRegistration.modifiedModels[i].masterValue === null)
                    $scope.frmRegistration.modifiedModels[i].masterValue = "";
                var jmodel = {
                    field: $scope.frmRegistration.modifiedModels[i].$name,
                    oldvalue: $scope.frmRegistration.modifiedModels[i].masterValue.toString(),
                    newvalue: $scope.frmRegistration.modifiedModels[i].$viewValue.toString(),
                    ID: i
                };
                OldDataValuepatientEdit.push(jmodel);
            }
            //



            //var OldDataValuepatientEdit = [];
            //for (var i = 0; i < $scope.frmRegistration.modifiedModels.length; i++) {
            //    if ($scope.frmRegistration.modifiedModels[i].masterValue === undefined || $scope.frmRegistration.modifiedModels[i].masterValue === null)
            //        $scope.frmRegistration.modifiedModels[i].masterValue = "";
            //    if (typeof ($scope.frmRegistration.modifiedModels[i].$viewValue) != "string") {
            //        var obj = $scope.frmRegistration.modifiedModels[i].$viewValue;
            //        var newVal = obj[Object.keys(obj)[0]];
            //        var jmodel = {
            //            field: $scope.frmRegistration.modifiedModels[i].$name,
            //            oldvalue: $scope.frmRegistration.modifiedModels[i].masterValue.toString(),
            //            newvalue: newVal,
            //            ID: i
            //        };
            //    }
            //    else {
            //        var jmodel = {
            //            field: $scope.frmRegistration.modifiedModels[i].$name,
            //            oldvalue: $scope.frmRegistration.modifiedModels[i].masterValue.toString(),
            //            newvalue: $scope.frmRegistration.modifiedModels[i].$viewValue.toString(),
            //            ID: i
            //        };
            //    }
            //    OldDataValuepatientEdit.push(jmodel);
            //}
            //


            var response = RegistartionService.updatePatientInfo($scope.Info, OldDataValuepatientEdit);
            response.then(function (resp) {
                if (resp.data == 1) {
                    AlertMessage.success('PalashIVF', 'Patient data updated successfully');
                    $scope.getPatientByID();
                    Common.clearID();
                }
                else AlertMessage.error('PalashIVF', 'Error occured.');
                angular.element(info).modal('hide');
            }, function (error) {
            })
        }
        else {
            //$scope.frmRegistration.txtMRNo.$dirty = true;
            //$scope.frmRegistration.txtIdProofNo.$dirty = true;
            $scope.frmRegistration.txtAge.$dirty = true;
            $scope.frmRegistration.txtFirstName.$dirty = true;
            $scope.frmRegistration.txtLastName.$dirty = true;
            $scope.frmRegistration.txtMobCountryCode.$dirty = true;
            $scope.frmRegistration.txtMobNo.$dirty = true;
            AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
        }
    }

    $scope.getPatientAddInfo = function () {
        var response = RegistartionService.getPatientAddInfo($scope.Patient.ID);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.AddInfo = resp.data;
                $scope.AddInfo.IdentityNumber = $scope.Patient.IdentityNumber;
                $scope.AddInfo.FamilyType = $scope.Patient.FamilyType;
            }
        }, function (error) {
        })
    }

    $scope.updatePatientAddInfo = function () {
        if ($scope.AddInfo.IdentityID > 0 && (angular.isDefined($scope.AddInfo.IdentityNumber) && $scope.AddInfo.IdentityNumber != '')) {
            Common.setID($scope.Patient.ID);
            var response = RegistartionService.updatePatientAddInfo($scope.AddInfo);
            response.then(function (resp) {
                if (resp.data == 1) {
                    AlertMessage.success('PalashIVF', 'Patient data updated successfully');
                    $scope.getPatientByID();
                    Common.clearID();
                }
                else AlertMessage.error('PalashIVF', 'Error occured.');
                angular.element(addInfo).modal('hide');
            }, function (error) {
            })
        }
        else {
            $scope.frmRegistration.ddlIDProofType.$dirty = true;
            $scope.frmRegistration.txtIdProofNo.$dirty = true;
            AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');
        }
    }

    $scope.getPatientRefInfo = function () {
        var response = RegistartionService.getPatientRefInfo($scope.Patient.ID);
        response.then(function (resp) {
            if (resp.data != null) {
                if (resp.data.SourceOfReferenceID > 0)
                    $scope.getDoctorList(resp.data.SourceOfReferenceID);
                $scope.RefInfo = resp.data;
                $scope.RefInfo.ReferralRemark = $scope.Patient.ReferralRemark;
                $scope.RefInfo.ReferredDoctorID = resp.data.ReferredDoctorID;
            }
        }, function (error) {
        })
    }

    $scope.updatePatientRefInfo = function () {
        if ($scope.RefInfo.SourceOfReferenceID > 0) {
            Common.setID($scope.Patient.ID);
            var response = RegistartionService.updatePatientRefInfo($scope.RefInfo);
            response.then(function (resp) {
                if (resp.data == 1) {
                    AlertMessage.success('PalashIVF', 'Patient data updated successfully');
                    $scope.getPatientByID();
                    Common.clearID();
                }
                else AlertMessage.error('PalashIVF', 'Error occured.');
                angular.element(refInfo).modal('hide');
            }, function (error) {
            })
        }
    }

    $scope.getPatientAddress = function (isOthr) {
        var response = RegistartionService.getAddress($scope.Patient.ID, isOthr);
        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $scope.objAddress = resp.data;
                $scope.GetStateList(resp.data.CountryID, 'other');
                //  $scope.GetCityList(resp.data.CityID, 'other');  
            }
        }, function (error) {
        })
    }

    $scope.updatePatientAddress = function () {
        Common.setID($scope.Patient.ID);
        $scope.objAddress.PatientID = $scope.Patient.ID;
        var response = RegistartionService.updateAddress($scope.objAddress);
        response.then(function (resp) {
            if (resp.data == 1) {
                AlertMessage.success('PalashIVF', 'Patient data updated successfully');
                $scope.getPatientByID();
                Common.clearID();
            }
            else AlertMessage.error('PalashIVF', 'Error occured.');
            angular.element(address).modal('hide');
        }, function (error) {
        })
    }

    $scope.viewAttachment = function () {
        debugger;
        if ($scope.Patient.strAttachment != null) {
            $scope.extn = $scope.Patient.strAttachment.substring($scope.Patient.strAttachment.indexOf(':') + 1, $scope.Patient.strAttachment.indexOf('/'));
            // $scope.FileName = resp.data.FileName;
            if ($scope.extn == 'image') {
                $scope.Image = $scope.Patient.strAttachment;
                $scope.content = '';
            }
            else {
                $scope.content = $scope.Patient.strAttachment;
                $scope.Image = null;
                //window.open($scope.content);
            }
            angular.element(modViewAttachment).modal('show');
        }
    }

    $scope.CloseviewAttachment = function () {
        angular.element(modViewAttachment).modal('hide');
    }

    $scope.ValidateEmail = function ValidateEmail(email, from) {
        debugger;
        if (email == undefined || email == "") {
            if (from == 'partnr')
                $scope.isPartnrEmailValid = true;
            else $scope.isEmailValid = true;
        }
        else {
            var re = /\S+@\S+\.\S+/;
            if (from == 'partnr') $scope.isPartnrEmailValid = re.test(email);
            else $scope.isEmailValid = re.test(email);
        }
    }

    function validateForm(patient, partner) {
        debugger;
        $scope.IsValidCountryCode = true;
        $scope.IsValidLesserAge = true;
        $scope.IsValidGreaterAge = true;
        $scope.IsValidEmail = true;

        $scope.style = "border-color:red";
        var isValid = true;
        $scope.isExtDocValid = true;
        if (angular.isUndefined(patient.ExtDocFirstName)) patient.ExtDocFirstName = '';
        if (angular.isUndefined(patient.ExtDocLastName)) patient.ExtDocLastName = '';
        if (angular.isUndefined(patient.ExtDocMobileNo)) patient.ExtDocMobileNo = '';
        //if ((patient.ExtDocFirstName != '' || patient.ExtDocLastName != '' || patient.ExtDocMobileNo != '') && (patient.ExtDocFirstName != '' ||
        //     patient.ExtDocLastName == '' || patient.ExtDocMobileNo == '')) {
        //    isValid = false;
        //    $scope.isExtDocValid = false;     ---Commented by Nayan Kamble

        // $scope.frmRegistration.ddlSpecialization.$dirty = true;
        // }

        if ((patient.SourceOfReferenceID == 1 && patient.ReferredDoctorID == 0) && (patient.ExtDocFirstName == '' || patient.ExtDocLastName == '' || patient.ExtDocGenderID == undefined || patient.SpecID == 0)) {
            isValid = false;
            $scope.IsFillExternalDoctor = false;
        }               //Added by Nayan Kamble

        if (patient.IsReferredPatient == true && patient.SourceOfReferenceID == 0) {
            isValid = false;
            $scope.IsSourceOfReference = false;
        }

        if ($scope.RegType == 1) {
            if (patient.IdentityID == 0 || partner.IdentityID == 0) {
                isValid = false;
                $scope.IsIdentityID = false;
            }
            else if (patient.Age < 18 || patient.Age > 60) {
                $scope.style = "border-color:red";
                isValid = false;
                $scope.IsValidLesserAge = false;
                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.'); //Remove comment by sujata
            }
            else if (partner.Age < 21 || partner.Age > 60) {
                $scope.style = "border-color:red";
                isValid = false;
                $scope.IsValidGreaterAge = false;
                // AlertMessage.warning('PalashIVF', 'Partner age should be in range of 21-60.');   //Remove comment by sujata
            }
            if (!angular.isUndefined(patient.Email) && patient.Email != "") {
                if (!validateEmail(patient.Email)) {
                    isValid = false;
                    $scope.IsValidEmail = false;
                }
            }
            if (!angular.isUndefined(partner.Email) && partner.Email != "") {
                if (!validateEmail(partner.Email)) {
                    isValid = false;
                    $scope.IsValidEmail = false;
                }
            }

            /*-------START----------------- Undefined Check-----------------------*/
            if (angular.isUndefined(patient.Age)) {
                $scope.IsValidLesserAge = false;
                isValid = false;     //Added by Nayan Kamble
            }
            //if (angular.isUndefined(partner.Age)) {
            //    $scope.IsValidGreaterAge = false;
            //    isValid = false;     //Added by Nayan Kamble
            //}
            /*---------END--------------- Undefined Check-----------------------*/

            if ((angular.isUndefined($scope.Patient.MobCountryCodeID)
                || angular.isUndefined($scope.Patient.MobileNo))
                || (angular.isUndefined($scope.Partner.MobCountryCodeID)
                || angular.isUndefined($scope.Partner.MobileNo))) {
                isValid = false;
                $scope.IsValidCountryCode = false;
            }
            if ((!angular.isUndefined($scope.Patient.MobCountryCodeID)
                && !angular.isUndefined($scope.Patient.MobileNo))
                && (!angular.isUndefined($scope.Partner.MobCountryCodeID)
                && !angular.isUndefined($scope.Partner.MobileNo))) {
                //Need to check code is integer or not
                //Need to check string is equle to 10 digit or not
                var PatientMbCode = parseInt($scope.country);
                if (((typeof $scope.Patient.MobCountryCodeID) == "string")
                    || $scope.Patient.MobileNo.length < 10
                    || (typeof PatientMbCode) != "number") {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }
                var PartnerMbCode = parseInt($scope.partnrcountry);
                if (((typeof $scope.Partner.MobCountryCodeID) == "string")
                    || $scope.Partner.MobileNo.length < 10
                    || (typeof PartnerMbCode) != "number") {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }
            }

            if (isValid) {
                $scope.style = null;
            }

            return isValid;
            //else $scope.style = null;
            //return isValid;
        }
        else if ($scope.RegType == 2) {
            if (patient.IdentityID == 0) {
                //isValid = false;
                isValid = true;
                //$scope.IsIdentityID = false;
                $scope.IsIdentityID = true;
            } else if (patient.GenderID == 2 && (patient.Age < 18 || patient.Age > 60)) {
                $scope.style = "border-color:red";
                isValid = false;
                $scope.IsValidLesserAge = false;
                // AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');
            }
            else if (patient.GenderID == 1 && (partner.Age < 21 || partner.Age > 60)) {
                $scope.style = "border-color:red";
                isValid = false;
                $scope.IsValidLesserAge = false;
                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-60.');
            }
            if (!angular.isUndefined(patient.Email) && patient.Email != "") {
                if (!validateEmail(patient.Email)) {
                    isValid = false;
                    $scope.IsValidEmail = false;
                }
            }

            /*-------START----------------- Undefined Check-----------------------*/
            if (angular.isUndefined(patient.Age)) {
                $scope.IsValidLesserAge = false;
                isValid = false;   //Added by Nayan Kamble
            }
            /*---------END--------------- Undefined Check-----------------------*/

            if ((angular.isUndefined($scope.Patient.MobCountryCodeID)
                || angular.isUndefined($scope.Patient.MobileNo))) {
                isValid = false;
                $scope.IsValidCountryCode = false;
            }
            if ((!angular.isUndefined($scope.Patient.MobCountryCodeID)
                && !angular.isUndefined($scope.Patient.MobileNo))) {
                //Need to check code is integer or not
                //Need to check string is equle to 10 digit or not
                var PatientMbCode = parseInt($scope.country);
                if (((typeof $scope.Patient.MobCountryCodeID) == "string")
                    || $scope.Patient.MobileNo.length < 10
                    || (typeof PatientMbCode) != "number" || Number.isNaN(PatientMbCode)) {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }
            }

            if (isValid) {
                $scope.style = null;
            }

            return isValid;
            //else $scope.style = null;
            //return isValid;
        }
        else if ($scope.RegType == 3) {
            if (patient.IdentityID == 0 ) {  //|| partner.IdentityID == 0 commented by sujata
                isValid = false;
                $scope.IsIdentityID = false;
            } else if (patient.GenderID == 2 && (patient.Age < 21 || patient.Age > 35)) {
                isValid = false;
                $scope.IsValidLesserAge = false;
                $scope.style = "border-color:red";
                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');
            }
            else if (patient.GenderID == 1 && (patient.Age < 21 || patient.Age > 45)) {
                $scope.style = "border-color:red";
                isValid = false;
                $scope.IsValidLesserAge = false;
                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
            }
            if (!angular.isUndefined(patient.Email)) {
                if (!validateEmail(patient.Email)) {
                    isValid = false;
                    $scope.IsValidEmail = false;
                }
            }
            //if (!angular.isUndefined(partner.Email)) {
            //    if (!validateEmail(partner.Email)) {
            //        isValid = false;
            //        $scope.IsValidEmail = false;
            //    }
            //}  //commented by sujata 
            if (partner.Age < 18) {    //  || partner.Age > 60 commented by sujata 
                $scope.style = "border-color:red";
                isValid = false;
                $scope.IsValidGreaterAge = false;
                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
            }
            /*-------START----------------- Undefined Check-----------------------*/
            if (angular.isUndefined(patient.Age)) {
                $scope.IsValidLesserAge = false;
                isValid = false;   //Added by Nayan Kamble
            }
            //if (angular.isUndefined(partner.Age)) {
            //    $scope.IsValidGreaterAge = false;
            //    isValid = false;   //Added by Nayan Kamble
            //} //comented by sujata
            /*---------END--------------- Undefined Check-----------------------*/

            if ((angular.isUndefined($scope.Patient.MobCountryCodeID)
                || angular.isUndefined($scope.Patient.MobileNo))          // || (angular.isUndefined($scope.Partner.MobCountryCodeID)
                                                                           //|| angular.isUndefined($scope.Partner.MobileNo))  //commented bu sujata
               ) {
                isValid = false;
                $scope.IsValidCountryCode = false;
            }
            if ((!angular.isUndefined($scope.Patient.MobCountryCodeID)
                && !angular.isUndefined($scope.Patient.MobileNo))
               ) {                                     // && (!angular.isUndefined($scope.Partner.MobCountryCodeID)
                                                        // && !angular.isUndefined($scope.Partner.MobileNo)) //commented bu sujata
                //Need to check code is integer or not
                //Need to check string is equle to 10 digit or not
                var PatientMbCode = parseInt($scope.country);
                if (((typeof $scope.Patient.MobCountryCodeID) == "string")
                    || $scope.Patient.MobileNo.length < 10
                    || (typeof PatientMbCode) != "number") {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }
                //var PartnerMbCode = parseInt($scope.partnrcountry);
                //if (((typeof $scope.Partner.MobCountryCodeID) == "string")
                //    || $scope.Partner.MobileNo.length < 10
                //    || (typeof PartnerMbCode) != "number") {
                //    isValid = false;
                //    $scope.IsValidCountryCode = false;
                //}   //commented by sujata
            }

            if (isValid) {
                $scope.style = null;
            }

            return isValid;

            //else $scope.style = null;
            //return isValid;
        }
        else if ($scope.RegType == 4) {
            if (patient.IdentityID == 0 ) {  //|| partner.IdentityID == 0  commented by sujata
                isValid = false;
                $scope.IsIdentityID = false;
            } else if (patient.GenderID == 2 && (patient.Age < 21 || patient.Age > 35)) {
                isValid = false;
                $scope.IsValidLesserAge = false;
                $scope.style = "border-color:red";
                AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');
            }
            if (partner.Age < 18 || patient.Age > 60) {
                $scope.style = "border-color:red";
                isValid = false;
                $scope.IsValidGreaterAge = false;
                AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
            }
            if (!angular.isUndefined(patient.Email)) {
                if (!validateEmail(patient.Email)) {
                    isValid = false;
                    $scope.IsValidEmail = false;
                    AlertMessage.warning('PalashIVF', 'Please enter valid email id.');
                }
            }
            if (!angular.isUndefined(partner.Email)) {
                if (!validateEmail(partner.Email)) {
                    isValid = false;
                    $scope.IsValidEmail = false;
                    AlertMessage.warning('PalashIVF', 'Please enter valid email id.');
                }
            }

            /*-------START----------------- Undefined Check-----------------------*/
            if (angular.isUndefined(patient.Age)) {
                $scope.IsValidLesserAge = false;
                isValid = false;   //Added by Nayan Kamble
            }
            //if (angular.isUndefined(partner.Age)) {
            //    $scope.IsValidGreaterAge = false;
            //    isValid = false;   //Added by Nayan Kamble     
            //}    //commented by sujata
            /*---------END--------------- Undefined Check-----------------------*/

            if ((angular.isUndefined($scope.Patient.MobCountryCodeID)
                || angular.isUndefined($scope.Patient.MobileNo))
               ) {                               // || (angular.isUndefined($scope.Partner.MobCountryCodeID)
                                                // || angular.isUndefined($scope.Partner.MobileNo)) Commented by sujata
                isValid = false;
                $scope.IsValidCountryCode = false;
            }
            if ((!angular.isUndefined($scope.Patient.MobCountryCodeID)
                && !angular.isUndefined($scope.Patient.MobileNo))
                && (!angular.isUndefined($scope.Partner.MobCountryCodeID)
                && !angular.isUndefined($scope.Partner.MobileNo))) {
                //Need to check code is integer or not  1.$scope.country  2.$scope.partnrcountry
                //Need to check string is equle to 10 digit or not
                var PatientMbCode = parseInt($scope.country);
                if (((typeof $scope.Patient.MobCountryCodeID) == "string")
                    || $scope.Patient.MobileNo.length < 10
                    || (typeof PatientMbCode) != "number") {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }
                var PartnerMbCode = parseInt($scope.partnrcountry);
                if (((typeof $scope.Partner.MobCountryCodeID) == "string")
                    || $scope.Partner.MobileNo.length < 10
                    || (typeof PartnerMbCode) != "number") {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }
            }

            if (isValid) {
                $scope.style = null;
            }

            return isValid;
            //else $scope.style = null;
            //return isValid;
        }
        return isValid;



    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $scope.validateIDProof = function (id) {
        debugger;
        if (id == 1) {
            //$scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
            $scope.Patient.IdentityNumber = "";
            //$scope.Partner.IdentityNumber = "";//commented by sujata
            $scope.Multivalidation = 'PanCardValidation';
            angular.element(txtIdProofNo).attr('maxlength', 10);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 10);
        }
        else if (id == 2) {
            $scope.Patient.IdentityNumber = ""; //commented by sujata
            // $scope.Partner.IdentityNumber = "";
            $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
            angular.element(txtIdProofNo).attr('maxlength', 9);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 9);
        }
        else if (id == 3) {
            $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";
            $scope.Multivalidation = 'NumericArrowBkSpDelSpDCFSlash';
            angular.element(txtIdProofNo).attr('maxlength', 12);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 12);
        }
        else if (id == 4) {
            $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";
            $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
            angular.element(txtIdProofNo).attr('maxlength', 16);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 16);
        }
        else if (id == 5) {
            $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";
            $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
            angular.element(txtIdProofNo).attr('maxlength', 30);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 30);
        }
        else {
            // $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";
            angular.element(txtIdProofNo).attr('maxlength', 0);
            angular.element(txtPartnrIdNO).attr('maxlength', 0);
        }
    }



    $scope.validateIDProofMale = function (id) {
        debugger;
        if (id == 1) {
            //$scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
            // $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";//commented by sujata
            $scope.Multivalidation = 'PanCardValidation';
            angular.element(txtIdProofNo).attr('maxlength', 10);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 10);
        }
        else if (id == 2) {
            // $scope.Patient.IdentityNumber = ""; //commented by sujata
            $scope.Partner.IdentityNumber = "";
            $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
            angular.element(txtIdProofNo).attr('maxlength', 9);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 9);
        }
        else if (id == 3) {
            $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";
            $scope.Multivalidation = 'NumericArrowBkSpDelSpDCFSlash';
            angular.element(txtIdProofNo).attr('maxlength', 12);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 12);
        }
        else if (id == 4) {
            $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";
            $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
            angular.element(txtIdProofNo).attr('maxlength', 16);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 16);
        }
        else if (id == 5) {
            $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";
            $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
            angular.element(txtIdProofNo).attr('maxlength', 30);
            if (angular.element('#txtPartnrIdNO').length > 0)
                angular.element(txtPartnrIdNO).attr('maxlength', 30);
        }
        else {
            // $scope.Patient.IdentityNumber = "";
            $scope.Partner.IdentityNumber = "";
            angular.element(txtIdProofNo).attr('maxlength', 0);
            angular.element(txtPartnrIdNO).attr('maxlength', 0);
        }
    }

    function validatePatientInfo(patient) {
        debugger;
        var isValid = true;
        //if (angular.isUndefined(patient.MRNo) || patient.MRNo == '') { //Added by AniketK on 08July2019 for MRNo
        //    isValid = false;
        //    AlertMessage.warning('PalashIVF', 'Enter MRNo.');
        //    return isValid;
        //}
        if (angular.isUndefined(patient.FirstName) || patient.FirstName == '') {
            isValid = false;
            AlertMessage.warning('PalashIVF', 'Enter first name.');
            return isValid;
        }
        //Begin::Commented by AniketK on 30August2019
        //if (angular.isUndefined(patient.LastName) || patient.LastName == '') {
        //    isValid = false;
        //    AlertMessage.warning('PalashIVF', 'Enter last name.');
        //    return isValid;
        //}
        //if (angular.isUndefined($scope.country) || $scope.country == '') {
        //    isValid = false;
        //    AlertMessage.warning('PalashIVF', 'Enter mobile country code.');
        //    return isValid;
        //}
        //End::Commented by AniketK on 30August2019
        if (angular.isUndefined(patient.MobileNo) || patient.MobileNo == '' || patient.MobileNo.length < 10) {
            isValid = false;
            AlertMessage.warning('PalashIVF', 'Enter mobile no.');
            return isValid;
        }

        if (patient.PatientCategoryID == 7) {
            if ((patient.Age < 18 || patient.Age > 60) && patient.GenderID == 2) {
                $scope.style = "border-color:red";
                isValid = false;
                AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');
            }
            else if (patient.GenderID == 1 && (patient.Age < 21 || patient.Age > 60)) {
                $scope.style = "border-color:red";
                isValid = false;
                AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-60.');
            }
            else $scope.style = null;
            return isValid;
        }
         //Commented by AniketK on 30July2019
        //else if (patient.PatientCategoryID == 11) {
        //    if (patient.GenderID == 2 && (patient.Age < 18 || patient.Age > 60)) {
        //        $scope.style = "border-color:red";
        //        isValid = false;
        //        AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');
        //    }            
        //    else if (patient.GenderID == 1 && (partner.Age < 21 || partner.Age > 60)) {           
        //        $scope.style = "border-color:red";
        //        isValid = false;
        //        AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-60.');
        //    }
        //    else $scope.style = null;
        //    return isValid;
        //}
        else if (patient.PatientCategoryID == 8 || patient.PatientCategoryID == 9) {
            if (patient.GenderID == 2 && (patient.Age < 21 || patient.Age > 35)) {
                isValid = false;
                $scope.style = "border-color:red";
                AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');
            }
            else if (patient.GenderID == 1 && (patient.Age < 21 || patient.Age > 45)) {
                $scope.style = "border-color:red";
                isValid = false;
                AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
            }
            else $scope.style = null;
            return isValid;
        }
        else if (patient.PatientCategoryID == 10) {
            if (patient.GenderID == 2 && (patient.Age < 21 || patient.Age > 35)) {
                isValid = false;
                $scope.style = "border-color:red";
                AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');
            }
            else $scope.style = null;
            return isValid;
        }
        //Commented by AniketK on 30August2019
        //else if (patient.Age == 0 || patient.Age == '') {
        //    debugger;
        //    isValid = false;
        //    $scope.style = "border-color:red";
        //    AlertMessage.warning('PalashIVF', 'Enter age.');
        //    return isValid;
        //}
        return isValid;
    }






    $scope.ClearSearch = function () {
        //  $scope.Info.UnitID = 0;
        $scope.Info.FirstName = '';
        $scope.Info.regTypeID = 0;
    };

    $scope.ClearAdvSearch = function () {
        $scope.Info.IdentityID = 0;
        $scope.Info.SourceOfReferenceID = 0;
        $scope.Info.IdentityNumber = '';
        $scope.Info.ReferredDoctorID = 0;
        $scope.FromDate = null;
        $scope.ToDate = null;
        //$scope.Info.RegVisFromDate = null;
        //$scope.Info.RegVisToDate = null;
    }

    $scope.FormChange = function FormChange(ReferredPatient) {      //Added by Nayan Kamble
        debugger;
        if (!ReferredPatient) {
            $scope.info = true;
            $scope.refInfo = false;
            $scope.addInfo = false;

        }
        else {
            $scope.refInfo = true;
            $scope.info = false;
            $scope.addInfo = false;
        }
    }

    $scope.ViewAttach = function ViewAttach() {  // added by sujata
        debugger;
        if ($scope.content != null) {
            angular.element(modViewPhoto).modal('show');
        }
    }

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


//PIVF.directive("fileread", [function () {
//    return {
//        scope: {
//            fileread: "="
//        },
//        link: function (scope, element, attributes) {
//            element.bind("change", function (changeEvent) {
//                var reader = new FileReader();
//                reader.onload = function (loadEvent) {
//                    scope.$apply(function () {
//                        scope.fileread = loadEvent.target.result;
//                    });
//                }
//                reader.readAsDataURL(changeEvent.target.files[0]);
//            });
//        }
//    }
//}]);


//<input type="file" fileread="vm.uploadme" />