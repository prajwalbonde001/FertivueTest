'use strict';
angular.module('PIVF').controller('NewRegistrationController' , function ($rootScope, $scope,$http,API,$location,$timeout,$uibModal, NewRegistrationService, AlertMessage, srvCommon, Common, swalMessages, $filter, localStorageService, usSpinnerService,authService, PatientVisitService) {
      debugger
    var FormID;
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
     $scope.DesignEMRVO = {};
      
      $rootScope.CoupleDetails = {};
    $rootScope.CoupleDetails.FemalePatient = {};
    $rootScope.CoupleDetails.MalePatient = {};
    $scope.PatientCategory = 0;
    $rootScope.IsFemale = 0;
    $rootScope.IsMale = 0;
   // $scope.selPatGenID = selectPatient.GenderID;
   //$scope.GenderID = selectPatient.GenderID;
   $scope.DesignEMRVO = {};
    $scope.form = [];
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    $scope.schema = {
        "type": "object",
        "title": "",
        "properties": {},
        "required": [],
        "format": "object"
    };
    
 
    var fileuploadtags = {
        "add": "Open file browser",
        "preview": "Preview Upload",
        "filename": "File Name",
        "progress": "Progress Status",
        "upload": "Upload",
        "dragorclick": "Drag and drop your file here or click here"
    };
    var fileuploadimg = {
        "title": "Image (Label coming from form definition)",
        "type": "array",
        "format": "singlefile",
        "x-schema-form": {
            "type": "array"
        },
        "pattern": {
            "mimeType": "image/*",
            "validationMessage": "Incorrect file type: "
        },
        "maxSize": {
            "maximum": "2MB",
            "validationMessage": "Allowed file size exceeded: ",
            "validationMessage2": "Current file size: "
        },
        "maxItems": {
            "validationMessage": "More files were uploaded than allowed."
        },
        "minItems": {
            "validationMessage": "You must upload at least one file"
        }
    }
    $scope.model = {};
    $scope.TemplateDetailList = [];
    //for sorting grid data
    $scope.SortColumn1 = "UpdatedDateTime";
    // $scope.reverseSort1 = true;  //alresdy added for comment sujata coross clinic
       $scope.reverseSort1 = false;    // new  added for comment sujata coross clinic
    $scope.SortData1 = function (column) {
        // $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;// alresdy added for comment sujata coross clinic
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : true; // new  added for comment sujata coross clinic

        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-up' : 'arrow-down';
        else $scope.sortClass1 = '';
    }
    $rootScope.FormName = Common.getString();
   $scope.model = {};
    $scope.btnSaveUpdatetext = 'Save';
    $scope.maxSize = 5;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.APPID = null;
    var objResource = {}; //Added by swatih for localization on 13/7/2020
    $scope.patient = {};
    $scope.partner = {};
    $scope.NewInfo = {};
    $scope.CurrentPage = 1;
    $scope.DocList = {};
   
    $scope.DocListForBarCode = {};
    $scope.BarCodeDoctorID = 0;

    $scope.patient.objAddress = {};
    $scope.partner.objAddress = {};
    $scope.patient.objAddress.CountryID = '';
    $scope.partner.objAddress.CountryID = '';
    $scope.patient.objAddress.StateID = '';
    $scope.partner.objAddress.StateID = '';
    $scope.patient.objAddress.CityID = '';
    $scope.partner.objAddress.CityID = '';
    $scope.NewInfo.ReferredDoctorID = '';
    $scope.patient.ReferredDoctorID = '';
    $scope.NewRefInfo = {};
    $scope.NewRefInfo.ReferredDoctorID = '';
    $scope.NewRegistration = {};
    $scope.txtIdProofNo = '';
    $scope.NewRegistration.lstPatient = [];
    $scope.NewRegistration.lstAddress = [];
    $scope.SponserList = [];
    $scope.patient.RegistrationType = '';
    $scope.patient.SourceOfReferenceID = '';
    $scope.NewRefInfo.SourceOfReferenceID = '';
    $scope.partner.IdentityID = '';
    $scope.patient.IdentityID = '';
    $scope.patient.IdentityNumber = '';
    $scope.partner.IdentityNumber = '';
    $scope.patient.MobileNo = '';
    $scope.partner.MobileNo = '';
    $scope.patient.Email = '';
    $scope.partner.Email = '';
    $scope.country = '';
    $scope.partnrcountry = '';
    $scope.objAddress = {};
    $scope.genderflag = true;
    $scope.IsFromDOB = false;

    $scope.showMessage = false;
   
            
    //Added by swatih for localization on 13/7/2020
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Added by swatih for localization on 13/7/2020
    //$scope.RegType = 1;//Commented by AniketK on 13Nov2019
    $scope.open1 = function () {
        debugger;
    //$scope.IsFromPatientDOB = false;
    $scope.popup1.opened = true;

    };
    $scope.open2 = function () {
    $scope.popup2.opened = true;

    };
    $scope.popup1 = {
        opened: false
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
       $scope.newPatient = function () {
           srvCommon.aciveTab('liMPatient');
           $location.path('/New_Registration/');
       }

       $scope.fillIdPrppfTypeList = function () {
           var ResponseData = Common.getMasterList('M_IDProofMaster', 'IDProofID', 'Description');
           ResponseData.then(function (Response) {
               if (!$scope.isPatientSearch)
                   Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               else
                   Response.data.splice(0, 0, { ID: 0, Description: "Id Proof Type" });
               $scope.IdPrppfTypeList = Response.data;
               $scope.NewInfo.IdentityID = 0;
               $scope.patient.IdentityID = 0;
               $scope.partner.IdentityID = 0;
           }, function (error) {
           });
       }

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
               var responseData = NewRegistrationService.InsertUpdateBankDetails(objBankDetails);
               responseData.then(function (Response) {
                   //debugger;
                   if (Response.data == 1) {
                       //AlertMessage.success('PalashIVF', 'Bank Details Added successfully.');//Commented by swatih for localization on 13/7/2020
                       AlertMessage.success(objResource.msgTitle, objResource.msgBankDetailsAddedsuccessfully);//Modified by swatih for localization on 13/7/2020

                   } else if (Response.data == 2) {
                       //AlertMessage.success('PalashIVF', 'Bank Details Updated successfully.');//Commented by swatih for localization on 13/7/2020
                       AlertMessage.success(objResource.msgTitle, objResource.msgBankDetailsUpdatedsuccessfully);//Modified by swatih for localization on 13/7/2020

                   }
                   angular.element(bankInfo).modal('hide');
               }, function (error) {
                   //AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization on 13/7/2020
                   AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization on 13/7/2020
               });
           } else {

               $scope.NewfrmRegistration.BranchName.$dirty = true;
               $scope.NewfrmRegistration.IFSCCode.$dirty = true;
               $scope.NewfrmRegistration.AccountNo.$dirty = true;
               $scope.NewfrmRegistration.CustName.$dirty = true;
           }

       };

       function validateBankDetails() {
           var isValid = true;
           if (angular.isUndefined($scope.BankData.BankID) || $scope.BankData.BankID == 0) {
               isValid = false;
               // AlertMessage.warning('PalashIVF', 'Select Bank name.');//Commented by swatih for localization on 13/7/2020
               AlertMessage.warning(objResource.msgTitle, objResource.msgSelectBankname);//Modified by swatih for localization on 13/7/2020
               return isValid;
           }
           if (angular.isUndefined($scope.BankData.BranchName) || $scope.BankData.BranchName == '') {
               isValid = false;
               //AlertMessage.warning('PalashIVF', 'Enter Branch name.');//Commented by swatih for localization on 13/7/2020
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

       $scope.fillClinicList = function () {

           //$scope.regTypeList.push({ ID: 0, Description: 'Registration Type' });
           //$scope.regTypeList.push({ ID: 1, Description: 'Couple' });
           //$scope.regTypeList.push({ ID: 2, Description: 'Individual' });
           //$scope.regTypeList.push({ ID: 3, Description: 'Donor' });
           //$scope.regTypeList.push({ ID: 4, Description: 'Surrogate' });
           //$scope.Info.regTypeID = 0;
           var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
           ResponseData.then(function (Response) {
               debugger;
               Response.data.splice(0, 0, { ID: 0, Description: "Clinic" });
               $scope.clinicList = Response.data;
             $scope.NewInfo.UnitID = localStorageService.get("UserInfo").UnitID;
           }, function (error) {
           });
       }

       $scope.getRegistrationTypeList1 = function () {
           debugger;
           var ResponseData = Common.getMasterList('M_PatientCategoryMaster', 'ID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Patient Category" });
               $scope.RegistrationTypeList1 = Response.data;
               $scope.NewInfo.regTypeID = 0;              
           }, function (error) {
           });
       }
      
       $scope.fillMarryStatusList = function () {
           var ResponseData = Common.getMasterList('M_Maritalstatus', 'MSID', 'MSDescription');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.MarryStatusList = Response.data;
               $scope.patient.MaritalStatusID = 0;
               $scope.partner.MaritalStatusID = 0;
           }, function (error) {
           });
       }
       $scope.fillBloodGrpList = function () {
           var ResponseData = Common.getMasterList('M_BloodGroupMaster', 'BloodID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.BloodGrpList = Response.data;
               $scope.patient.BloodGroupID = 0;
               $scope.partner.BloodGroupID = 0;
           }, function (error) {
           });
       }
       $scope.fillNationalityList = function () {
           var ResponseData = Common.getMasterList('M_NationalityMaster', 'NationlityID', 'NationlityDescription');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.NationalityList = Response.data;
               $scope.patient.NationalityID = 0;
               $scope.partner.NationalityID = 0;
           }, function (error) {
           });
       }
       $scope.fillEthnicityList = function () {
           var ResponseData = Common.getMasterList('M_Ethnicity', 'ID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.EthnicityList = Response.data;
               $scope.patient.EthnicityID = 0;
               $scope.partner.EthnicityID = 0;
           }, function (error) {
           });
       }
       $scope.fillReligionList = function () {
           var ResponseData = Common.getMasterList('M_Religion', 'ID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.ReligionList = Response.data;
               $scope.patient.ReligionID = 0;
               $scope.partner.ReligionID = 0;
           }, function (error) {
           });
       }
       $scope.fillEducationList = function () {
           var ResponseData = Common.getMasterList('M_EducationDetailsMaster', 'EDUID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.EducationList = Response.data;
               $scope.patient.EducationID = 0;
               $scope.partner.EducationID = 0;
           }, function (error) {
           });
       }

       $scope.fillOccupationList = function () {
debugger
           var ResponseData = Common.getMasterList('M_OccupationMaster', 'OccupID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.OccupationList = Response.data;
               $scope.patient.OccupationId = 0;
               $scope.partner.OccupationId = 0;
           }, function (error) {
           });
       }
       $scope.getCountryList = function () {
           debugger;
           var ResponseData = Common.GetCountryList();
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { CountryID: 0, CountryName: "Select" });
               $rootScope.CountryList = Response.data;
               if ($rootScope.IsAppointment == true)
                   $scope.SelectedCountrySetForAppointment($rootScope.MobCountryCodeID)
               $scope.patient.objAddress.CountryID = 0;
               $scope.partner.objAddress.CountryID = 0;
               $scope.objAddress.CountryID = 0;
               $scope.StateList = []; $scope.partnrStateList = []; $scope.otherStateList = [];
               $scope.CityList = []; $scope.partnrCityList = []; $scope.otherCityList = [];
               $scope.StateList.splice(0, 0, { StateID: 0, StateName: "Select" });
               $scope.CityList.splice(0, 0, { CityID: 0, CityName: "Select" });
               $scope.partnrStateList.splice(0, 0, { StateID: 0, StateName: "Select" });
               $scope.partnrCityList.splice(0, 0, { CityID: 0, CityName: "Select" });
               $scope.otherStateList.splice(0, 0, { StateID: 0, StateName: "Select" });
               $scope.otherCityList.splice(0, 0, { CityID: 0, CityName: "Select" });

               $scope.patient.objAddress.StateID = 0;
               $scope.partner.objAddress.StateID = 0;
               $scope.objAddress.StateID = 0;
               $scope.patient.objAddress.CityID = 0;
               $scope.partner.objAddress.CityID = 0;
               $scope.objAddress.CityID = 0;

           }, function (error) {
           });
       }

       $scope.cancelView = function () {
           Common.clearID();
           $rootScope.IsAppointment = false;
           $rootScope.APPID = null;
           srvCommon.aciveTab('liMPatient');
           $location.path('/PatientList/');
       }

       $scope.newPatient = function () {
           debugger;
           srvCommon.aciveTab('liMPatient');
           $location.path('/New_Registration/');
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
                       $scope.patient.objAddress.StateID = 0;
                       $scope.patient.objAddress.CityID = 0;
                       $scope.partner.objAddress.StateID = 0;
                       $scope.partner.objAddress.CityID = 0;
                   }

               }
               else if (from == 'partner') {
                   $scope.partnrStateList = angular.copy(Response.data);
                   $scope.partnrCityList.length = 0;
                   $scope.partnrCityList.splice(0, 0, { CityID: 0, CityName: "Select" });
                   $scope.partner.objAddress.StateID = 0;
                   $scope.partner.objAddress.CityID = 0;
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
                   $scope.patient.objAddress.CityID = 0;
                   $scope.partner.objAddress.CityID = 0;

               }
               else if (from == 'partner') {
                   $scope.partnrCityList = angular.copy(Response.data);
                   $scope.partner.objAddress.CityID = 0;
               }
               else if (from == 'other') {
                   $scope.otherCityList = angular.copy(Response.data);
                   if ($scope.objAddress.CityID == 0 && !$scope.isView)
                       $scope.objAddress.CityID = 0;
               }
           }, function (error) {
           });
       }

       //$scope.getSourceOfrefList = function (StateID) {
       //    var ResponseData = Common.getMasterList('M_ReferralTypeMaster', 'RFTYPEID', 'Description');
       //    ResponseData.then(function (Response) {
       //        if (!$scope.isPatientSearch)
       //            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
       //        else Response.data.splice(0, 0, { ID: 0, Description: "Source Of Reference" });
       //        $scope.SourceOfrefList = Response.data;
       //        $scope.patient.SourceOfReferenceID = 0;
       //        $scope.Info.SourceOfReferenceID = 0;
       //    }, function (error) {
       //    });
       //}

       $scope.getCampList = function () {
           var ResponseData = Common.getMasterList('M_CampMaster', 'ID', 'Name');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.CampList = Response.data;
               $scope.patient.CampID = 0;
           }, function (error) {
           });
       }

       $scope.geAgencyList = function () {
           var ResponseData = Common.getMasterList('M_AgencyMaster', 'ID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.AgencyList = Response.data;
               $scope.patient.AgencyID = 0;
           }, function (error) {
           });
       }

       $scope.geAgentList = function () {
           var ResponseData = Common.getMasterList('M_AgentMaster', 'ID', 'Name');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.AgentList = Response.data;
               $scope.patient.AgentID = 0;
           }, function (error) {
           });
       }

       $scope.getGenderList = function () {
           debugger;
           var ResponseData = Common.getMasterList('M_GenderMaster', 'GenderId', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.GenderList = Response.data;
               $scope.patient.GenderID = 2;
               $scope.partner.GenderID = 1;              
           }, function (error) {
           });
       }
       $scope.getRegistrationTypeList = function () {
           debugger;
           var ResponseData = Common.getMasterList('M_PatientCategoryMaster', 'ID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
               $scope.RegistrationTypeList = Response.data;
               //if ($rootScope.IsAppointment == true)
                   //$scope.patient.RegistrationType = 11;
               //else
                   $scope.patient.RegistrationType = 7;
               if ($scope.patient.RegistrationType == 7) {
                   $scope.patient.GenderID = 2;
                   $scope.partner.GenderID = 1;
               }              
           }, function (error) {
           });
       }

       $scope.ClearRegistrationFormData = function () {
           debugger;
           $scope.patient.IsReferredPatient = '';
           $scope.patient.SourceOfReferenceID = 0;
           $scope.patient.CampID = 0;
           $scope.patient.ReferredDoctorID = 0;
           $scope.patient.ReferralRemark = '';

           $scope.patient.FirstName = '';
           $scope.patient.MiddleName = '';
           $scope.patient.LastName = '';
           $scope.patient.FamilyName = '';
           //$scope.patient.GenderID = '';
           $scope.patient.DateOfBirth = '';
           $scope.patient.Age = '';
           $scope.country = '';
           $scope.patient.MobileNo = '';
           $scope.patient.IdentityID = 0;
           $scope.patient.IdentityNumber = '';

           $scope.partner.FirstName = '';
           $scope.partner.MiddleName = '';
           $scope.partner.LastName = '';
           //$scope.partner.GenderID = '';
           $scope.partner.DateOfBirth = '';
           $scope.partner.Age = '';
           $scope.partnrcountry = '';
           $scope.partner.MobileNo = '';
           $scope.partner.IdentityID = 0;
           $scope.partner.IdentityNumber = '';

           $scope.patient.Email = '';
           $scope.patient.MaritalStatusID = 0;
           $scope.patient.BloodGroupID = 0;
           $scope.patient.NationalityID = 0;
           $scope.patient.EthnicityID = 0;
           $scope.patient.ReligionID = 0;
           $scope.patient.EducationID = 0;
           $scope.patient.OccupationId = 0;

           $scope.patient.MarriedSince = '';
           $scope.patient.ExistingChildren = '';

           $scope.patient.objAddress.AddressLine1 = '';
           $scope.patient.objAddress.AddressLine2 = '';
           $scope.patient.objAddress.Street = '';
           $scope.patient.objAddress.Landmark = '';
           $scope.patient.objAddress.CountryID = 0;
           $scope.patient.objAddress.StateID = 0;
           $scope.patient.objAddress.CityID = 0;
           $scope.patient.objAddress.Area = 0;
           $scope.patient.objAddress.pincode = 0;
           $scope.patient.objAddress.LandLineNoCode = 0;
           $scope.patient.objAddress.LandLineNo = '';

           $scope.partner.Email = '';
           $scope.partner.MaritalStatusID = 0;
           $scope.partner.BloodGroupID = 0;
           $scope.partner.NationalityID = 0;
           $scope.partner.EthnicityID = 0;
           $scope.partner.ReligionID = 0;
           $scope.partner.EducationID = 0;
           $scope.partner.OccupationId = 0;

           $scope.partner.objAddress.AddressLine1 = '';
           $scope.partner.objAddress.AddressLine2 = '';
           $scope.partner.objAddress.Street = '';
           $scope.partner.objAddress.Landmark = '';
           $scope.partner.objAddress.CountryID = 0;
           $scope.partner.objAddress.StateID = 0;
           $scope.partner.objAddress.CityID = 0;
           $scope.partner.objAddress.Area = 0;
           $scope.partner.objAddress.pincode = '';
           $scope.partner.objAddress.LandLineNoCode = '';
           $scope.partner.objAddress.LandLineNo = '';

           $scope.objAddress.AddressLine1 = '';
           $scope.objAddress.AddressLine2 = '';
           $scope.objAddress.Street = '';
           $scope.objAddress.Landmark = '';
           $scope.objAddress.CountryID = 0;
           $scope.objAddress.StateID = 0;
           $scope.objAddress.CityID = 0;
           $scope.objAddress.Area = '';
           $scope.objAddress.Pincode = '';
           $scope.objAddress.LandLineNoCode = '';
           $scope.objAddress.LandLineNo = '';
       }

    $scope.genderSelectOnRegType = function (patient) {
        debugger;
        if ($scope.patient.RegistrationType == 7 || $scope.patient.RegistrationType == 0) {
            clearAddressPopUp();
            //$scope.ClearRegistrationFormData();
            $scope.patient.GenderID = 2;
            $scope.partner.GenderID = 1;
            $scope.genderflag = true;
            if ($rootScope.IsAppointment == true && $scope.partner.FirstName != undefined && $scope.partner.LastName != undefined) {
                $scope.patient.FirstName = "";
                $scope.patient.LastName = "";
                $scope.patient.FamilyName = "";
                $scope.patient.MobileNo = "";
                $scope.patient.DateOfBirth = "";
                $scope.patient.Age = "";
                $scope.country = "";
            }
        }
        else if ($scope.patient.RegistrationType == 10) {
            clearAddressPopUp();
            //$scope.ClearRegistrationFormData();              
            $scope.patient.GenderID = 2;
            $scope.genderflag = true;
            if ($rootScope.IsAppointment == true && $scope.partner.FirstName != undefined && $scope.partner.LastName != undefined) {
                $scope.patient.FirstName = "";
                $scope.patient.LastName = "";
                $scope.patient.FamilyName = "";
                $scope.patient.MobileNo = "";
                $scope.patient.DateOfBirth = "";
                $scope.patient.Age = "";
                $scope.country = "";
                //$scope.patient.APPID = $scope.ExceptCoupleAPPID;
            }
        }
        else if ($scope.patient.RegistrationType == 8 || $scope.patient.RegistrationType == 14 || $scope.patient.RegistrationType == 15) {
               clearAddressPopUp();
               //$scope.ClearRegistrationFormData();
               $scope.patient.GenderID = 2;
               $scope.genderflag = true;
               if ($rootScope.IsAppointment == true && $scope.partner.FirstName != undefined && $scope.partner.LastName != undefined) {
                   $scope.patient.FirstName = "";
                   $scope.patient.LastName = "";
                   $scope.patient.FamilyName = "";
                   $scope.patient.MobileNo = "";
                   $scope.patient.DateOfBirth = "";
                   $scope.patient.Age = "";
                   $scope.country = "";
                   //$scope.patient.APPID = $scope.ExceptCoupleAPPID;
               }
           }
        else if ($scope.patient.RegistrationType == 9 || $scope.patient.RegistrationType == 16) {
               clearAddressPopUp();
               //$scope.ClearRegistrationFormData();
               $scope.patient.GenderID = 1;
               $scope.genderflag = true;
               if ($rootScope.IsAppointment == true && $scope.partner.FirstName != undefined && $scope.partner.LastName != undefined) {
                   $scope.patient.FirstName = $scope.partner.FirstName;
                   $scope.patient.LastName = $scope.partner.LastName;
                   $scope.patient.MobileNo = $scope.partner.MobileNo;
                   $scope.patient.DateOfBirth = $scope.partner.DateOfBirth;
                   //$scope.patient.APPID = $scope.ExceptCoupleAPPID;
                   //$scope.patient.GenderID = $scope.partner.GenderID;
               }
           }
           else {
               $scope.patient.GenderID = 0;
               $scope.partner.GenderID = 0;
               $scope.genderflag = false;
               if ($rootScope.IsAppointment == true && $scope.partner.FirstName != undefined && $scope.partner.LastName != undefined) {
                   $scope.patient.FirstName = $scope.partner.FirstName;
                   $scope.patient.LastName = $scope.partner.LastName;
                   $scope.patient.MobileNo = $scope.partner.MobileNo;
                   $scope.patient.DateOfBirth = $scope.partner.DateOfBirth;
                   $scope.patient.GenderID = $scope.partner.GenderID;
                   //$scope.patient.APPID = $scope.ExceptCoupleAPPID;
               }
           }
       }
       
       $scope.getSpecializationList = function () {
           var ResponseData = Common.getMasterList('M_Specialization', 'SID', 'Description');
           ResponseData.then(function (Response) {
               Response.data.splice(0, 0, { SID: 0, Description: "Select" });
               $scope.SpecializationList = Response.data;
               $scope.patient.SpecID = 0;
           }, function (error) {
           });
       }

       function validateEmail(email) {
           var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           return re.test(String(email).toLowerCase());
       }

       $scope.validateIDProof = function (id) {
           debugger;
           if (id == 1) {   // Pan Card / NRIC
               //$scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               $scope.patient.IdentityNumber = "";
               //$scope.Partner.IdentityNumber = "";//commented by sujata
               $scope.Multivalidation = 'PanCardValidation';
               //angular.element(txtIdProofNo).attr('maxlength', 10);   //Commented on 10Mar2021 for Victory client request
               angular.element(txtIdProofNo).attr('maxlength', 20);     //Modified on 10Mar2021 for Victory client request
               
               //if (angular.element('#txtPartnrIdNO').length > 0)
               //    angular.element(txtPartnrIdNO).attr('maxlength', 10);   //Commented on 10Mar2021 for Victory client request

               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 20);     //Modified on 10Mar2021 for Victory client request
           }
           else if (id == 2) {  // PASSPORT
               $scope.patient.IdentityNumber = ""; //commented by sujata
               // $scope.Partner.IdentityNumber = "";
               $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               //angular.element(txtIdProofNo).attr('maxlength', 9);   //Commented on 10Mar2021 for Victory client request
               angular.element(txtIdProofNo).attr('maxlength', 20);    //Modified on 10Mar2021 for Victory client request
               
               //if (angular.element('#txtPartnrIdNO').length > 0)
               //    angular.element(txtPartnrIdNO).attr('maxlength', 9);   //Commented on 10Mar2021 for Victory client request

               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 20);    //Modified on 10Mar2021 for Victory client request
           }
           else if (id == 3) {
               $scope.patient.IdentityNumber = "";
               //$scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'NumericArrowBkSpDelSpDCFSlash';
               angular.element(txtIdProofNo).attr('maxlength', 12);
               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 12);
           }
           else if (id == 4) {
               $scope.patient.IdentityNumber = "";
               //$scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               angular.element(txtIdProofNo).attr('maxlength', 16);
               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 16);
           }
           else if (id == 5) {
               $scope.patient.IdentityNumber = "";
               //$scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               angular.element(txtIdProofNo).attr('maxlength', 10);
               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 10);
           }
           else if (id == 6) {
               $scope.patient.IdentityNumber = "";
               //$scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               angular.element(txtIdProofNo).attr('maxlength', 12);
               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 12);
           }
           else {
               $scope.Patient.IdentityNumber = "";
               //$scope.partner.IdentityNumber = "";
               angular.element(txtIdProofNo).attr('maxlength', 0);
               angular.element(txtPartnrIdNO).attr('maxlength', 0);
           }
       }

       $scope.validateIDProofMale = function (id) {
           debugger;   
           if (id == 1) {   // Pan Card / NRIC
               //$scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               // $scope.Patient.IdentityNumber = "";
               $scope.partner.IdentityNumber = "";//commented by sujata
               $scope.Multivalidation = 'PanCardValidation';
               //angular.element(txtIdProofNo).attr('maxlength', 10);   //Commented on 10Mar2021 for Victory client request
               angular.element(txtIdProofNo).attr('maxlength', 20);     //Modified on 10Mar2021 for Victory client request

               //if (angular.element('#txtPartnrIdNO').length > 0)
               //    angular.element(txtPartnrIdNO).attr('maxlength', 10);   //Commented on 10Mar2021 for Victory client request

               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 20);     //Modified on 10Mar2021 for Victory client request
           }
           else if (id == 2) {  // PASSPORT
               // $scope.Patient.IdentityNumber = ""; //commented by sujata
               $scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               //angular.element(txtIdProofNo).attr('maxlength', 9);   //Commented on 10Mar2021 for Victory client request
               angular.element(txtIdProofNo).attr('maxlength', 20);    //Modified on 10Mar2021 for Victory client request

               //if (angular.element('#txtPartnrIdNO').length > 0)
               //    angular.element(txtPartnrIdNO).attr('maxlength', 9);   //Commented on 10Mar2021 for Victory client request

               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 20);    //Modified on 10Mar2021 for Victory client request
           }
           else if (id == 3) {
               //$scope.patient.IdentityNumber = "";
               $scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'NumericArrowBkSpDelSpDCFSlash';
               angular.element(txtIdProofNo).attr('maxlength', 12);
               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 12);
           }
           else if (id == 4) {
               //$scope.patient.IdentityNumber = "";
               $scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               angular.element(txtIdProofNo).attr('maxlength', 16);
               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 16);
           }
           else if (id == 5) {
               //$scope.patient.IdentityNumber = "";
               $scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               angular.element(txtIdProofNo).attr('maxlength', 10);
               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 10);
           }
           else if (id == 6) {
               //$scope.patient.IdentityNumber = "";
               $scope.partner.IdentityNumber = "";
               $scope.Multivalidation = 'AlphaNumericArrowBkSpDelSp';
               angular.element(txtIdProofNo).attr('maxlength', 12);
               if (angular.element('#txtPartnrIdNO').length > 0)
                   angular.element(txtPartnrIdNO).attr('maxlength', 12);
           }
           else {
               // $scope.Patient.IdentityNumber = "";
               $scope.partner.IdentityNumber = "";
               angular.element(txtIdProofNo).attr('maxlength', 0);
               angular.element(txtPartnrIdNO).attr('maxlength', 0);
           }
       }
    
       $scope.formLoad = function () {
           debugger;
          //$scope.GetPatientAdditional();
        
       
        if ($scope.isView) {
            $scope.getPatientByID();
            
        }
        //else {
        //    $scope.isView = false;
        //    $scope.min = new Date().setYear(new Date().getYear() - 99);
        //    $scope.max = new Date();
        //    $scope.getSpecializationList();
        //    $scope.geAgencyList();
        //    $scope.geAgentList();
        //    $scope.GetBDMList();
        //}
        
        $scope.fillIdPrppfTypeList();
        $scope.fillMarryStatusList();
        $scope.fillBloodGrpList();
        $scope.fillNationalityList();
        $scope.fillEthnicityList();
        $scope.fillReligionList();
        $scope.fillEducationList();
        $scope.fillOccupationList();
        $scope.getRegistrationTypeList();
        $scope.getGenderList();
        $scope.getCountryList();
        //$scope.getDoctorList();
        
        $scope.getSourceOfrefList();
        $scope.getCampList();
        $scope.DocList = [];
        $scope.DocList.splice(0, 0, { ID: 0, Description: "Select" });

        $scope.DocListForBarCode = [];
        $scope.DocListForBarCode.splice(0, 0, { ID: 0, Description: "Select" });
        $scope.BarCodeDoctorID = 0;
        $scope.getDoctorListBarcode();
        $scope.patient.ReferredDoctorID = 0;
        $scope.addFor = null;
        angular.element(txtIdProofNo).attr('maxlength', 0);
        if (angular.element('#txtPartnrIdNO').length > 0)
            angular.element(txtPartnrIdNO).attr('maxlength', 0);
        var obj = {};
        obj = Common.getObj();
        if (angular.isDefined(obj.FirstName)) {

            if (obj != null) {
                if (obj.GenderID == 2) {
                    $scope.patient.FirstName = obj.FirstName;
                    $scope.patient.LastName = obj.LastName;
                    $scope.partner.LastName = obj.LastName;
                    if (angular.isDefined(obj.DOB))
                        $scope.patient.DateOfBirth = new Date(obj.DOB);
                    $scope.patient.GenderID = obj.GenderID;
                    $rootScope.MobCountryCodeID = obj.MobileCountryCode;                    
                    $scope.patient.MobileNo = obj.MobileNo;
                    $scope.patient.APPID = obj.APPID;
                    //if ($rootScope.IsAppointment == true)
                    //$scope.country = obj.MobileCountryCode;
                }
                else {
                    $scope.partner.FirstName = obj.FirstName;
                    $scope.partner.LastName = obj.LastName;
                    $scope.patient.LastName = obj.LastName;
                    if (angular.isDefined(obj.DOB))
                        $scope.partner.DateOfBirth = new Date(obj.DOB);
                    $scope.partner.GenderID = obj.GenderID;
                    $rootScope.MobCountryCodeID = obj.MobileCountryCode;                   
                    $scope.partner.MobileNo = obj.MobileNo;
                    $scope.partner.APPID = obj.APPID;
                    //if ($rootScope.IsAppointment == true)
                    //    $scope.SelectedCountrySetForAppointmentForPartner($scope.partner.MobCountryCodeID, 3)
                    //if ($rootScope.IsAppointment == true)
                    //$scope.country = obj.MobileCountryCode;
                }
                $scope.IsNonRegPatientRedirect = obj.IsNonRegPatientRedirect;               
                //$scope.ExceptCoupleAPPID = obj.APPID;
                Common.clearObj(); //Added by AniketK on 06May2020
                $scope.CountryList = obj.CountryList;
                var con = $filter('filter')(obj.CountryList, { CountryID: obj.MobileCountryCode }, true);
                $scope.country = con[0].CountryCode;                
                if (angular.isDefined(obj.FirstName))
                    //$scope.RegType = 2; //Commmented and Modified by AniketK on 14Nov2019
                    $scope.patient.RegistrationType = 11;
                Common.clearObj();
                 
            }
        }
    }
    $scope.getSourceOfrefList = function () { //StateID
        debugger;
        var ResponseData = Common.getMasterList('M_ReferralTypeMaster', 'RFTYPEID', 'Description');
        ResponseData.then(function (Response) {
           // if (!$scope.isPatientSearch)    //commented
            Response.data.splice(0, 0, { ID: 0, Description: "Source Of Reference" });
            // else Response.data.splice(0, 0, { ID: 0, Description: "Source Of Reference" });     //commented
            $scope.SourceOfrefList = Response.data;
            $scope.patient.SourceOfReferenceID = 0;
            $scope.NewInfo.SourceOfReferenceID = 0;
            $scope.NewRefInfo.SourceOfReferenceID = 0;
        }, function (error) {
        });
    }

    $scope.updatePatientAddInfo = function () {
        debugger;
        if ($scope.NewAddInfo.IdentityID > 0 && (angular.isDefined($scope.NewAddInfo.IdentityNumber) && $scope.NewAddInfo.IdentityNumber != '')) {
            Common.setID($scope.patient.ID);
            var response = NewRegistrationService.updatePatientAddInfo($scope.NewAddInfo);
            response.then(function (resp) {
                if (resp.data == 1) {
                    //AlertMessage.success('PalashIVF', 'Patient data updated successfully');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgPatientdataupdatedsuccessfully);//Modified by swatih for localization on 13/7/2020
                    $scope.getPatientByID();
                    Common.clearID();
                }
                    //else AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization on 13/7/2020
                else AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization on 13/7/2020
                angular.element(NewAddInfo).modal('hide');
            }, function (error) {
            })
        }
        else {
            $scope.NewfrmRegistration.ddlIDProofType.$dirty = true;
            $scope.NewfrmRegistration.txtIdProofNo.$dirty = true;
            //AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);//Modified by swatih for localization on 13/7/2020
        }
    }

    $scope.getPatientRefInfo = function () {
        var response = NewRegistrationService.getPatientRefInfo($scope.patient.ID);
        response.then(function (resp) {
            if (resp.data != null) {
                if (resp.data.SourceOfReferenceID > 0)
                    $scope.getDoctorList(resp.data.SourceOfReferenceID);
                $scope.NewRefInfo = resp.data;
                $scope.NewRefInfo.ReferralRemark = $scope.patient.ReferralRemark;
                $scope.NewRefInfo.ReferredDoctorID = resp.data.ReferredDoctorID;
            }
        }, function (error) {
        })
    }
    
    $scope.getDoctorList = function (id) {
        debugger;
        var docType = false;
        if (id == 0) {
            $scope.DocList.length = 0;
            if (!$scope.isPatientSearch)
                $scope.DocList.splice(0, 0, { ID: 0, Description: "Select" });
            else $scope.DocList.splice(0, 0, { ID: 0, Description: "Referal Doctor" });
            $scope.patient.ReferredDoctorID = 0; $scope.NewRefInfo.ReferredDoctorID = 0; $scope.NewInfo.ReferredDoctorID = 0;
        }
       // else if (id == 1) docType = true; else if (id == 2) docType = false;
        if (id > 0) { 
            var updatedId=1;     
            var ResponseData = Common.getDoctorListForReg(updatedId);
            ResponseData.then(function (Response) {
                if (!$scope.isPatientSearch)
                    Response.data.splice(0, 0, { ID: 0, Description: "Select" });
                else Response.data.All.splice(0, 0, { ID: 0, Description: "Referal Doctor" });
                $scope.DocList = Response.data;
                $scope.patient.ReferredDoctorID = 0;
                $scope.NewInfo.ReferredDoctorID = 0;
            }, function (error) {
            });
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
        for (var key in $scope.patient.objAddress) {
            if ($scope.patient.objAddress.hasOwnProperty(key)) {
                if (typeof $scope.patient.objAddress[key] === 'string') {
                    $scope.patient.objAddress[key] = undefined;
                }
                else if (typeof $scope.patient.objAddress[key] === 'number') {
                    $scope.patient.objAddress[key] = 0;
                }
                else if (typeof $scope.patient.objAddress[key] === 'boolean') {
                    $scope.patient.objAddress[key] = false;
                }
            }
        }
        for (var key in $scope.partner.objAddress) {
            if ($scope.partner.objAddress.hasOwnProperty(key)) {
                if (typeof $scope.partner.objAddress[key] === 'string') {
                    $scope.partner.objAddress[key] = undefined;
                }
                else if (typeof $scope.partner.objAddress[key] === 'number') {
                    $scope.partner.objAddress[key] = 0;
                }
                else if ($scope.partner.objAddress[key] == 'boolean') {
                    $scope.partner.objAddress[key] = false;
                }
            }
        }

        for (var key in $scope.patient) {
            if ($scope.patient.hasOwnProperty(key)) {
                if (typeof $scope.patient[key] === 'string') {
                    $scope.patient[key] = undefined;
                }
                else if (typeof $scope.patient[key] === 'number') {
                    $scope.patient[key] = 0;
                }
                else if ($scope.patient[key] instanceof Date) {
                    $scope.patient[key] = null;
                }
            }
        }

        for (var key in $scope.partner) {
            if ($scope.partner.hasOwnProperty(key)) {
                if (typeof $scope.partner[key] === 'string') {
                    $scope.partner[key] = undefined;
                }
                else if (typeof $scope.partner[key] === 'number') {
                    $scope.partner[key] = 0;
                }
                else if ($scope.partner[key] instanceof Date) {
                    $scope.partner[key] = null;
                }
            }
        }
        $scope.patient.GenderID = 2;
        $scope.partner.GenderID = 1;
        $scope.patient.FamilyType = 2;
        $scope.NewRegistration.lstPatient.length = 0;
        $scope.NewRegistration.lstAddress.length = 0;
    }

    $scope.onePermantAddress = function () {
        debugger;
        if ($scope.patient.objAddress.IsPermenant && $scope.addFor == 'patient')
            $scope.objAddress.IsPermenant = false;
        else if ($scope.partner.objAddress.IsPermenant && $scope.addFor == 'partner')
            $scope.objAddress.IsPermenant = false;

        var idxPatient = $scope.NewRegistration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == true && x.IsPermenant == true });
        var idxPartnr = $scope.NewRegistration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == false && x.IsPermenant == true });
        if (idxPatient > -1)
            $scope.patient.objAddress.IsPermenant = false;
        if (idxPartnr > -1)
            $scope.partner.objAddress.IsPermenant = false;
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

    $scope.OnClickDOBEvent = function OnClickDOBEvent(patient) {
        debugger;
        $scope.$watch(patient.DateOfBirth);
    }

    //Begin::For Patient Update Added by AniketK on 13Dec2019
    $scope.$watch('NewInfo.DateOfBirth', function (newValue) {
        debugger;
        //$scope.IsFromPatientDOB = true;
        if (angular.isDate(newValue)) {
            if ($scope.isView)
                $scope.NewInfo.Age = parseInt((new Date() - newValue) / (1000 * 60 * 60 * 24 * 365.25));
            else
                $scope.NewInfo.Age = parseInt((new Date() - newValue) / (1000 * 60 * 60 * 24 * 365.25));
        }
        if ($scope.NewInfo.Age > 0 && $scope.NewInfo.DateOfBirth != null) {
            //angular.element(txtAge).prop('disabled', true); //Commented and Modified by AniketK on 12Dec2019
            angular.element(txtNewInfoPatientDate).prop('disabled', false);
            //if ($scope.IsFromPatientDOB == true) {
            //$scope.patient.DateOfBirth = $scope.patient.DateOfBirth;
            //}
        }
    });

    $scope.$watch('NewInfo.Age', function (newValue) {
        debugger;
        //$scope.IsFromPatientDOB = false;
        if (angular.isString(newValue)) {
            if ($scope.isView) {
                var birthDate = moment().subtract(newValue, 'years');
                $scope.NewInfo.DateOfBirth = birthDate.format("YYYY-MM-DD");
            }
            else {
                var birthDate = moment().subtract(newValue, 'years');
                $scope.NewInfo.DateOfBirth = birthDate.format("YYYY-MM-DD");
            }
        }
        if ($scope.NewInfo.Age > 0 && $scope.NewInfo.DateOfBirth != null) {
            angular.element(txtNewInfoPatientDate).prop('disabled', false);
            //if ($scope.IsFromPatientDOB == false)
            //angular.element(txtNewInfoPatientDate).prop('value', $scope.patient.DateOfBirth);
            $scope.birthDate = moment().subtract(newValue, 'years');
            $scope.NewInfo.DateOfBirth = birthDate.format("YYYY-MM-DD");
            angular.element(txtNewInfoPatientDate).prop('value', $scope.NewInfo.DateOfBirth);

        }
    });
    //End::For Patient Update Added by AniketK on 13Dec2019

    $scope.$watch('patient.DateOfBirth', function (newValue) {
        debugger;
      //$scope.IsFromPatientDOB = true;
        if (angular.isDate(newValue)) {
            if ($scope.isView)
                $scope.NewInfo.Age = parseInt((new Date() - newValue) / (1000 * 60 * 60 * 24 * 365.25));
            else
                $scope.patient.Age = parseInt((new Date() - newValue) / (1000 * 60 * 60 * 24 * 365.25));
        }
        if ($scope.patient.Age > 0 && $scope.patient.DateOfBirth != null) {
            //angular.element(txtAge).prop('disabled', true); //Commented and Modified by AniketK on 12Dec2019
            angular.element(txtAge).prop('disabled', false);
            //if ($scope.IsFromPatientDOB == true) {
                //$scope.patient.DateOfBirth = $scope.patient.DateOfBirth;
            //}
        }
    });

    //Begin:: Added by AniketK on 12Dec2019
    $scope.$watch('patient.Age', function (newValue) {
        debugger;       
        //$scope.IsFromPatientDOB = false;
        if (angular.isString(newValue)) {
            if ($scope.isView) {               
                var birthDate = moment().subtract(newValue, 'years');
                $scope.patient.DateOfBirth = birthDate.format("YYYY-MM-DD");
            }
            else {                
                var birthDate = moment().subtract(newValue, 'years');
                $scope.patient.DateOfBirth = birthDate.format("YYYY-MM-DD");
            }
        }
        if ($scope.patient.Age > 0 && $scope.patient.DateOfBirth != null) {
            angular.element(txtDate).prop('disabled', false);
            //if ($scope.IsFromPatientDOB == false)
            //angular.element(txtDate).prop('value', $scope.patient.DateOfBirth);
            $scope.birthDate = moment().subtract(newValue, 'years');
            $scope.patient.DateOfBirth = birthDate.format("YYYY-MM-DD");
            angular.element(txtDate).prop('value', $scope.patient.DateOfBirth);
           
        }
    });
    //End:: Added by AniketK on 12Dec2019

    $scope.$watch('partner.DateOfBirth', function (newValue) {
        if (angular.isDate(newValue))
            $scope.partner.Age = parseInt((new Date() - newValue) / (1000 * 60 * 60 * 24 * 365.25));
        if ($scope.partner.Age > 0 && $scope.partner.DateOfBirth != null)
            //angular.element(txtpartnrAge).prop('disabled', true); //Commented and Modified by AniketK on 12Dec2019
            angular.element(txtpartnrAge).prop('disabled', false);
    });

    //Begin:: Added by AniketK on 12Dec2019
    $scope.$watch('partner.Age', function (newValue) {
        debugger;       
        if (angular.isString(newValue)) {
            if ($scope.isView) {
                var birthDate = moment().subtract(newValue, 'years');
                $scope.partner.DateOfBirth = birthDate.format("YYYY-MM-DD");
            }
            else {
                var birthDate = moment().subtract(newValue, 'years');
                $scope.partner.DateOfBirth = birthDate.format("YYYY-MM-DD");
            }
        }
        if ($scope.partner.Age > 0 && $scope.partner.DateOfBirth != null) {
            angular.element(txtPartDate).prop('disabled', false);
            //if ($scope.IsFromPatientDOB == false)
            //angular.element(txtDate).prop('value', $scope.patient.DateOfBirth);
            $scope.birthDate = moment().subtract(newValue, 'years');
            $scope.partner.DateOfBirth = birthDate.format("YYYY-MM-DD");
            angular.element(txtPartDate).prop('value', $scope.partner.DateOfBirth);

        }
    });
    //End:: Added by AniketK on 12Dec2019

    $scope.clearDob = function (from) {
        debugger;
        if (from == 'partner') {
            angular.element(txtpartnrAge).prop('disabled', false);
            $scope.partner.DateOfBirth = null; $scope.partner.Age = null;
        }
        else if (from == 'patient') {
            if ($scope.isView) {
                $scope.NewInfo.DateOfBirth = null;
                $scope.NewInfo.Age = null;
            }
            else
                $scope.patient.DateOfBirth = null; $scope.patient.Age = null
            angular.element(txtAge).prop('disabled', false);
        }
    };

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

        //if ($scope.RegType == 1) { //Commented and Modified by AniketK on 13Nov2019
        if ($scope.patient.RegistrationType == 7) { //Couple

            if (patient.IdentityID == 0 || partner.IdentityID == 0) {
                isValid = false;
                $scope.IsIdentityID = false;
            }
            //else if (patient.Age < 18 || patient.Age > 60) {
            //    $scope.style = "border-color:red";
            //    isValid = false;
            //    $scope.IsValidLesserAge = false;
            //    //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.'); //Remove comment by sujata
            //}
            //else if (partner.Age < 21 || partner.Age > 60) {
            //    $scope.style = "border-color:red";
            //    isValid = false;
            //    $scope.IsValidGreaterAge = false;
            //    // AlertMessage.warning('PalashIVF', 'Partner age should be in range of 21-60.');   //Remove comment by sujata
            //}
            //if (!angular.isUndefined(patient.Email) && patient.Email != "") {
            //    if (!validateEmail(patient.Email)) {
            //        isValid = false;
            //        $scope.IsValidEmail = false;
            //    }
            //}
            //if (!angular.isUndefined(partner.Email) && partner.Email != "") {
            //    if (!validateEmail(partner.Email)) {
            //        isValid = false;
            //        $scope.IsValidEmail = false;
            //    }
            //}

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

            if ((angular.isUndefined($scope.patient.MobCountryCodeID)
                || angular.isUndefined($scope.patient.MobileNo))
                || (angular.isUndefined($scope.partner.MobCountryCodeID) //MobCountryCodeID
                || angular.isUndefined($scope.partner.MobileNo))) {
                isValid = false;
                $scope.IsValidCountryCode = false;
            }
            if ((!angular.isUndefined($scope.patient.MobCountryCodeID)
                && !angular.isUndefined($scope.patient.MobileNo))
                && (!angular.isUndefined($scope.partner.MobCountryCodeID)
                && !angular.isUndefined($scope.partner.MobileNo))) {
                //Need to check code is integer or not
                //Need to check string is equle to 10 digit or not
                $scope.PatientMbCode = parseInt($scope.country);
                if (((typeof $scope.patient.MobCountryCodeID) == "string")
                    //|| $scope.patient.MobileNo.length < 10
                    || (typeof $scope.PatientMbCode) != "number") {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }
                $scope.PartnerMbCode = parseInt($scope.partnrcountry);
                if (((typeof $scope.partner.MobCountryCodeID) == "string")
                    //|| $scope.partner.MobileNo.length < 10
                    || (typeof $scope.PartnerMbCode) != "number") {
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
      //else if ($scope.RegType == 2) {//Commented and Modified by AniketK on 13Nov2019
        else if ($scope.patient.RegistrationType == 11) { //Individual

            if (patient.IdentityID == 0) {
                //isValid = false;
                isValid = true;
                //$scope.IsIdentityID = false;
                $scope.IsIdentityID = true;
            }
            //else if (patient.GenderID == 2 && (patient.Age < 18 || patient.Age > 60)) {
            //    $scope.style = "border-color:red";
            //    isValid = false;
            //    $scope.IsValidLesserAge = false;
            //    // AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');
            //}
            //else if (patient.GenderID == 1 && (partner.Age < 21 || partner.Age > 60)) {
            //    $scope.style = "border-color:red";
            //    isValid = false;
            //    $scope.IsValidLesserAge = false;
            //    //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-60.');
            //}
            //if (!angular.isUndefined(patient.Email) && patient.Email != "") {
            //    if (!validateEmail(patient.Email)) {
            //        isValid = false;
            //        $scope.IsValidEmail = false;
            //    }
            //}

            /*-------START----------------- Undefined Check-----------------------*/
            if (angular.isUndefined(patient.Age)) {
                $scope.IsValidLesserAge = false;
                isValid = false;   //Added by Nayan Kamble
            }
            /*---------END--------------- Undefined Check-----------------------*/

            if ((angular.isUndefined($scope.patient.MobCountryCodeID)
                || angular.isUndefined($scope.patient.MobileNo))) {
                isValid = false;
                $scope.IsValidCountryCode = false;
            }
            if ((!angular.isUndefined($scope.patient.MobCountryCodeID)
                && !angular.isUndefined($scope.patient.MobileNo))) {
                //Need to check code is integer or not
                //Need to check string is equle to 10 digit or not
                //var PatientMbCode = parseInt($scope.country);
                //if (((typeof $scope.patient.MobCountryCodeID) == "string")
                //    || $scope.patient.MobileNo.length < 10
                //    || (typeof patientMbCode) != "number" || Number.isNaN(PatientMbCode)) {
                //    isValid = false;
                //    $scope.IsValidCountryCode = false;
                //}
                $scope.PatientMbCode = parseInt($scope.country);
                if (((typeof $scope.patient.MobCountryCodeID) == "string")
                    //|| $scope.patient.MobileNo.length < 10
                    || (typeof $scope.PatientMbCode) != "number") {
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
       //else if ($scope.RegType == 3) {//Commented and Modified by AniketK on 13Nov2019
        else if ($scope.patient.RegistrationType == 8 || $scope.patient.RegistrationType == 9) { //FemaleDonor-8 and MaleDonor-9
            if (patient.IdentityID == 0) {  //|| partner.IdentityID == 0 commented by sujata
                isValid = false;
                $scope.IsIdentityID = false;
            } 
            //else if (patient.GenderID == 2 && (patient.Age < 21 || patient.Age > 35)) {
            //    isValid = false;
            //    $scope.IsValidLesserAge = false;
            //    $scope.style = "border-color:red";
            //    //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');
            //}
            //else if (patient.GenderID == 1 && (patient.Age < 21 || patient.Age > 45)) {
            //    $scope.style = "border-color:red";
            //    isValid = false;
            //    $scope.IsValidLesserAge = false;
            //    //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
            //}
            //if (!angular.isUndefined(patient.Email)) {
            //    if (!validateEmail(patient.Email)) {
            //        isValid = false;
            //        $scope.IsValidEmail = false;
            //    }
            //}
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

            if ((angular.isUndefined($scope.patient.MobCountryCodeID)
                || angular.isUndefined($scope.patient.MobileNo))          // || (angular.isUndefined($scope.Partner.MobCountryCodeID)
                //|| angular.isUndefined($scope.Partner.MobileNo))  //commented bu sujata
               ) {
                isValid = false;
                $scope.IsValidCountryCode = false;
            }
            if ((!angular.isUndefined($scope.patient.MobCountryCodeID)
                && !angular.isUndefined($scope.patient.MobileNo))
               ) {                                     // && (!angular.isUndefined($scope.Partner.MobCountryCodeID)
                // && !angular.isUndefined($scope.Partner.MobileNo)) //commented bu sujata
                //Need to check code is integer or not
                //Need to check string is equle to 10 digit or not
                //var PatientMbCode = parseInt($scope.country);
                //if (((typeof $scope.patient.MobCountryCodeID) == "string")
                //    || $scope.patient.MobileNo.length < 10
                //    || (typeof PatientMbCode) != "number") {
                //    isValid = false;sujata
                //    $scope.IsValidCountryCode = false;
                //}

                $scope.PatientMbCode = parseInt($scope.country);
                if (((typeof $scope.patient.MobCountryCodeID) == "string")
                    //|| $scope.patient.MobileNo.length < 10
                    || (typeof $scope.PatientMbCode) != "number") {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }
                //var PartnerMbCode = parseInt($scope.partnrcountry);
                //if (((typeof $scope.Partner.MobCountryCodeID) == "string")
                //    || $scope.Partner.MobileNo.length < 10
                //    || (typeof PartnerMbCode) != "number") {
                //    isValid = false;
                //    $scope.IsValidCountryCode = false;
                //}   //commented by 
            }

            if (isValid) {
                $scope.style = null;
            }

            return isValid;

            //else $scope.style = null;
            //return isValid;
        }
       //else if ($scope.RegType == 4) {//Commented and Modified by AniketK on 13Nov2019
        else if ($scope.patient.RegistrationType == 10) {  //Surrogate
            if (patient.IdentityID == 0) {  //|| partner.IdentityID == 0  commented by sujata
                isValid = false;
                $scope.IsIdentityID = false;
            }
            else if (patient.GenderID == 2 && (patient.Age <= 22 || patient.Age >= 38)) {
                isValid = false;
                $scope.IsValidLesserAge = false;
                $scope.style = "border-color:red";
                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-37.');//Commented by swatih for localization 13/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinangeof2137);//Modified by swatih for localization 13/7/2020
            }
            //if (partner.Age < 18 || patient.Age > 60) {
            //    $scope.style = "border-color:red";
            //    isValid = false;
            //    $scope.IsValidGreaterAge = false;
            //    AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');
            //}
            //if (!angular.isUndefined(patient.Email)) {
            //    if (!validateEmail(patient.Email)) {
            //        isValid = false;
            //        $scope.IsValidEmail = false;
            //        AlertMessage.warning('PalashIVF', 'Please enter valid email id.');
            //    }
            //}
            //if (!angular.isUndefined(partner.Email)) {
            //    if (!validateEmail(partner.Email)) {
            //        isValid = false;
            //        $scope.IsValidEmail = false;
            //        AlertMessage.warning('PalashIVF', 'Please enter valid email id.');
            //    }
            //}

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

            if ((angular.isUndefined($scope.patient.MobCountryCodeID)
                || angular.isUndefined($scope.patient.MobileNo))
               ) {                               // || (angular.isUndefined($scope.Partner.MobCountryCodeID)
                // || angular.isUndefined($scope.Partner.MobileNo)) Commented by sujata
                isValid = false;
                $scope.IsValidCountryCode = false;
            }
            if ((!angular.isUndefined($scope.patient.MobCountryCodeID)
                && !angular.isUndefined($scope.patient.MobileNo))
                && (!angular.isUndefined($scope.partner.MobCountryCodeID)
                && !angular.isUndefined($scope.partner.MobileNo))) {
                //Need to check code is integer or not  1.$scope.country  2.$scope.partnrcountry
                //Need to check string is equle to 10 digit or not
                //var PatientMbCode = parseInt($scope.country);
                //if (((typeof $scope.patient.MobCountryCodeID) == "string")
                //    || $scope.patient.MobileNo.length < 10
                //    || (typeof patientMbCode) != "number") {
                //    isValid = false;
                //    $scope.IsValidCountryCode = false;
                //}
                $scope.PatientMbCode = parseInt($scope.country);
                if (((typeof $scope.patient.MobCountryCodeID) == "string")
                    //|| $scope.patient.MobileNo.length < 10
                    || (typeof $scope.PatientMbCode) != "number") {
                    isValid = false;
                    $scope.IsValidCountryCode = false;
                }

                //var PartnerMbCode = parseInt($scope.partnrcountry);
                //if (((typeof $scope.partner.MobCountryCodeID) == "string")
                //    || $scope.partner.MobileNo.length < 10
                //    || (typeof PartnerMbCode) != "number") {
                //    isValid = false;
                //    $scope.IsValidCountryCode = false;
                //}
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
    $scope.SelectedCountrySetForAppointment = function (country, isPatient) {
        debugger;      
        var CountryList = $rootScope.CountryList;      
            for (var i = 0 ; i <= CountryList.length; i++) {
                if (country == $scope.CountryList[i].CountryCode) {
                    $scope.patient.MobCountryCodeID = CountryList[i].CountryID;
                    $scope.country = CountryList[i].CountryCode;
                    $scope.partnrcountry = $scope.country;
                    $scope.partner.MobCountryCodeID = $scope.patient.MobCountryCodeID;
                    break;
            }
        }
    }

    $scope.SelectedCountry = function (country, isPatient) {
        debugger;
        if (isPatient == 1) {
            $scope.patient.MobCountryCodeID = country.CountryID;
            $scope.country = country.CountryCode;
            $scope.partner.MobCountryCodeID = country.CountryID;
            $scope.partnrcountry = country.CountryCode;
        }
        else if (isPatient == 3) {
            $scope.NewInfo.MobCountryCodeID = country.CountryID;
            $scope.country = country.CountryCode;
        }
        else {
            $scope.patient.MobCountryCodeID = country.CountryID;
            $scope.partner.MobCountryCodeID = country.CountryID;
            $scope.partnrcountry = country.CountryCode;
        }
    }

    $scope.SelectedSpouseCountry = function (partnrcountry, isPatient) {
        debugger;
        if (isPatient == 1) {
            $scope.patient.MobCountryCodeID = partnrcountry.CountryID;
            $scope.country = partnrcountry.CountryCode;
            $scope.partner.MobCountryCodeID = partnrcountry.CountryID;
            $scope.partnrcountry = partnrcountry.CountryCode;
        }
        else if (isPatient == 3) {
            $scope.NewInfo.MobCountryCodeID = partnrcountry.CountryID;
            $scope.country = partnrcountry.CountryCode;
        }
        else {
            $scope.patient.MobCountryCodeID = partnrcountry.CountryID;
            $scope.partner.MobCountryCodeID = partnrcountry.CountryID;
            $scope.partnrcountry = partnrcountry.CountryCode;
        }
    }

    $scope.dataURItoBlob = function dataURItoBlob(dataURI) {
        //debugger;
        if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
            $scope.strImage = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
        if (dataURI.indexOf('application/pdf') > 0)
            $scope.strImage = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
        return $scope.strImage;
    }

    $scope.dataURItoBlobPart = function dataURItoBlobPart(dataURI) {
        //debugger;
        if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
            $scope.strImagePart = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
        if (dataURI.indexOf('application/pdf') > 0)
            $scope.strImagePart = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
        return $scope.strImagePart;
    }

    $scope.dataURItoBlobPatientAttach = function dataURItoBlobPatientAttach(dataURI) {
        //debugger;
        if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
            $scope.strPatientAttach = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
        if (dataURI.indexOf('application/pdf') > 0)
            $scope.strPatientAttach = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
        return $scope.strPatientAttach;
    }

    $scope.dataURItoBlobPartPartnerAttach = function dataURItoBlobPartPartnerAttach(dataURI) {
        //debugger;
        if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
            $scope.strPartnerAttach = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
        if (dataURI.indexOf('application/pdf') > 0)
            $scope.strPartnerAttach = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
        return $scope.strPartnerAttach;
    }

    $scope.addOtherAddress = function (objAddress) {
        debugger;
        if ($scope.addFor == 'patient') {
            objAddress.IsOther = true;
            objAddress.IsPatient = true;            
            //$scope.patient.objOtherAddress = objAddress;
            $scope.patient.objOtherAddressForPatient = Object.assign({}, objAddress);
        }
        else if ($scope.addFor == 'partner') {
            objAddress.IsOther = true;
            objAddress.IsPatient = false;
            $scope.partner.objOtherAddressForPartner = Object.assign({}, objAddress);
        }
        var idxPatient = $scope.NewRegistration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == true && $scope.addFor == 'patient' });
        var idxPartnr = $scope.NewRegistration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == false && $scope.addFor == 'partner' });
        if (idxPatient > -1) {
            $scope.NewRegistration.lstAddress.splice(idxPatient, 1);
        }
        else if (idxPartnr > -1) {
            $scope.NewRegistration.lstAddress.splice(idxPartnr, 1);
        }
        if (objAddress.CountryID >= 0) {
            $scope.NewRegistration.lstAddress.push(angular.copy(objAddress));
            //var objAddress1 = [];
            //$scope.patient.objAddress1 = $scope.NewRegistration.lstAddress.push(angular.copy(objAddress));
            angular.element(Add1).modal('hide');
            $scope.addFor = null;
            clearAddressPopUp();
        }
        //else AlertMessage.info('PalashIVF', 'Fill address.');//Commented by swatih for localization on 13/7/2020
        else AlertMessage.info(objResource.msgTitle, objResource.msgFilladdress);//Modified by swatih for localization on 13/7/2020
    }

    $scope.saveUpdate = function (isCheckIn) {
        debugger; 
        $scope.patient.objOtherAddressForPatient = $scope.patient.objOtherAddressForPatient;
usSpinnerService.spin('GridSpinner');
        var patient = $scope.patient;
        var partner = $scope.partner;       
        if (($scope.patient.RegistrationType != 0 && $scope.patient.SourceOfReferenceID != 0 && $scope.patient.ReferredDoctorID!= 0 &&

            //$scope.patient.FirstName != undefined && $scope.patient.LastName != undefined && $scope.patient.Age != undefined &&   //Commented on 10Mar2021 for Victory client request
            $scope.patient.FirstName != undefined && $scope.patient.Age != undefined &&     //Modified on 10Mar2021 for Victory client request
            $scope.patient.IdentityID != 0 && $scope.patient.IdentityNumber != "" && $scope.country != "" &&
            $scope.patient.MobileNo != "" && $scope.patient.GenderID != 0) && // 

            //($scope.patient.RegistrationType != 7 || $scope.partner.FirstName != undefined && $scope.partner.LastName != undefined &&   //Commented on 10Mar2021 for Victory client request
            ($scope.patient.RegistrationType != 7 || $scope.partner.FirstName != undefined &&   //Modified on 10Mar2021 for Victory client request
            $scope.partner.Age != undefined && $scope.partner.IdentityID != 0 &&
            $scope.partner.IdentityNumber != "" && $scope.partner.GenderID != 0 &&
            $scope.partnrcountry != "" && $scope.partner.MobileNo != "")) { //&& $scope.patient.Age != undefined) {//Added by AniketK on 09July2019
             
            if (validateForm(patient, partner && $scope.NewfrmRegistration.$valid)) {  //&& $scope.frmRegistration.$valid
                //$scope.isReq = function (RegType) {
                //    //debugger;
                //    return ($scope.RegType != 2 || $scope.RegType != 3 || $scope.RegType != 4);  //   || $scope.RegType != 8 || $scope.RegType != 9
                //};
                //For Photo
                $scope.patient.strPhoto = $scope.patient.strPhoto;
                if ($scope.patient.strPhoto == undefined || $scope.patient.strPhoto == null) {
                    $scope.patient.strPhoto = '';
                }
                if ($scope.patient.strPhoto != undefined) {
                    $scope.dataURItoBlob($scope.patient.strPhoto);
                    $scope.patient.strPhoto = $scope.strImage;
                }

                $scope.partner.strPhoto = $scope.partner.strPhoto;
                if ($scope.partner.strPhoto == undefined || $scope.partner.strPhoto == null) {
                    $scope.partner.strPhoto = '';
                }
                if ($scope.partner.strPhoto != undefined) {
                    $scope.dataURItoBlobPart($scope.partner.strPhoto);
                    $scope.partner.strPhoto = $scope.strImagePart;
                }

                //For Attchament
                $scope.patient.strAttachment = $scope.patient.strAttachment;
                if ($scope.patient.strAttachment == undefined || $scope.patient.strAttachment == null) {
                    $scope.patient.strAttachment = '';
                }
                if ($scope.patient.strAttachment != undefined) {
                    $scope.dataURItoBlobPatientAttach($scope.patient.strAttachment);
                    $scope.patient.strAttachment = $scope.strPatientAttach;
                }

                $scope.partner.strAttachment = $scope.partner.strAttachment;
                if ($scope.partner.strAttachment == undefined || $scope.partner.strAttachment == null) {
                    $scope.partner.strAttachment = '';
                }
                if ($scope.partner.strAttachment != undefined) {
                    $scope.dataURItoBlobPartPartnerAttach($scope.partner.strAttachment);
                    $scope.partner.strAttachment = $scope.strPartnerAttach;
                }

                var NewRegistration = $scope.NewRegistration;
                patient.Ispatient = true;
                NewRegistration.lstPatient.length = 0;
                NewRegistration.lstAddress.length = 0;

                //if ($scope.RegType == 2) { //Commented and Modified by AniketK on 14Nov2019
                if ($scope.patient.RegistrationType == 11) {
                    patient.PatientCategoryID = 11;  //individual
                    patient.objAddress.IsPatient = true;
                    NewRegistration.lstPatient.push(patient);
                    if (patient.objAddress.CountryID >= 0) {
                        NewRegistration.lstAddress.push(patient.objAddress);
                        if ($scope.patient.objOtherAddressForPatient != undefined)
                            NewRegistration.lstAddress.push(patient.objOtherAddressForPatient);
                    }
                }

                //else if ($scope.RegType == 3) {       //Commented and Modified by AniketK on 14Nov2019            //Donor    // added sujata
                else if ($scope.patient.RegistrationType == 8 || $scope.patient.RegistrationType == 9 || $scope.patient.RegistrationType == 14 || $scope.patient.RegistrationType == 15 || $scope.patient.RegistrationType == 16) { //Male and Female Donor
                    //if (patient.GenderID == 1)
                    //    patient.PatientCategoryID = 9;
                    //else
                    //    patient.PatientCategoryID = 8;
                  
                    patient.PatientCategoryID = $scope.patient.RegistrationType

                    patient.objAddress.IsPatient = true;
                    NewRegistration.lstPatient.push(patient);
                    if (patient.objAddress.CountryID >= 0) {
                        NewRegistration.lstAddress.push(patient.objAddress);
                        if ($scope.patient.objOtherAddressForPatient != undefined)
                            NewRegistration.lstAddress.push(patient.objOtherAddressForPatient);
                    }
                }

                    //else if ($scope.RegType == 4) {//Commented and Modified by AniketK on 14Nov2019
                else if ($scope.patient.RegistrationType == 10) {
                    patient.PatientCategoryID = 10;  //Surrogacy    // added sujata
                    patient.objAddress.IsPatient = true;
                    NewRegistration.lstPatient.push(patient);
                    if (patient.objAddress.CountryID >= 0) {
                        NewRegistration.lstAddress.push(patient.objAddress);
                        if ($scope.patient.objOtherAddressForPatient != undefined)
                            NewRegistration.lstAddress.push(patient.objOtherAddressForPatient);
                    }
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
                    //if ($scope.RegType == 1) { //Commented and Modified by AniketK on 14Nov2019
                    if ($scope.patient.RegistrationType == 7) {
                        patient.PatientCategoryID = 7;  //couple
                        partner.PatientCategoryID = 7;
                    }
                        //else if ($scope.RegType == 3) { //Commented and Modified by AniketK on 14Nov2019
                    else if ($scope.patient.RegistrationType == 8 || $scope.patient.RegistrationType == 9) {
                        if (patient.GenderID == 2)
                            patient.PatientCategoryID = 8;  //female donor
                        else if (patient.GenderID == 1)
                            patient.PatientCategoryID = 9;   //male donor
                        partner.PatientCategoryID = 0;
                    }
                        //else if ($scope.RegType == 4) { //Commented and Modified by AniketK on 14Nov2019
                    else if ($scope.patient.RegistrationType == 10) {
                        patient.PatientCategoryID = 10;  //surogate
                        partner.PatientCategoryID = 0;
                    }
                    NewRegistration.lstPatient.push(patient);
                    NewRegistration.lstPatient.push(partner);
                    debugger;
                    if (patient.objAddress.CountryID >= 0) {
                        NewRegistration.lstAddress.push(patient.objAddress);
                        if ($scope.patient.objOtherAddressForPatient != undefined)
                            NewRegistration.lstAddress.push(patient.objOtherAddressForPatient);
                    }
                    if (partner.objAddress.CountryID >= 0) {
                        NewRegistration.lstAddress.push(partner.objAddress);
                        if ($scope.partner.objOtherAddressForPartner != undefined)
                            NewRegistration.lstAddress.push(partner.objOtherAddressForPartner);
                    }
                }
                //if ($rootScope.APPID != null) {
                //    debugger;
                //    var APPID = $rootScope.APPID;
                //    NewRegistration.lstPatient.push(APPID);
                //    //$scope.CountryList = $scope.CountryList;
                //    //$scope.SelectedCountry($scope.country,1);
                //}
                //else {
                //    var APPID = 0;
                //    NewRegistration.lstPatient.push(APPID);
                //}
                
                    var ResponseData = NewRegistrationService.saveUpdate($scope.NewRegistration);  // , OldDataValuepatient commented by sujata
                    ResponseData.then(function (Response) {
                        debugger;
                        var arr = Response.data.split('/');
                        if (arr[0] == 1)  {
                        debugger
                            if (isCheckIn) {
                            debugger
                                $rootScope.IsAppointment = false;
                                $rootScope.APPID = null;
                                //AlertMessage.success('PalashIVF', 'Patient registered successfully.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgPatientregisteredsuccessfully); //Modified by swatih for localization on 13/7/2020
                                $scope.ClearRegistrationFormData();
                                $rootScope.MarkVisitData = {};
                                $rootScope.MarkVisitData.IsLoadVisitData = true;
                                $rootScope.MarkVisitData.IsFromRegistration = true;
                                sessionStorage.setItem("MRN", JSON.stringify(arr[1]));
                                srvCommon.aciveTab('liQueue');   // set tab active
                                $location.path('/PatientVisit/');
                            }
                            else {
                            debugger
                                $scope.NewInfo.RegVisToDate = null;
                                $scope.NewInfo.RegVisFromDate = null;
                                $rootScope.IsAppointment = false;
                                $rootScope.APPID = null;
                                srvCommon.aciveTab('liMPatient');   // set tab active
                                $location.path('/PatientList/');
                                //AlertMessage.success('PalashIVF', 'Patient registered successfully.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgPatientregisteredsuccessfully);//Modified by swatih for localization on 13/7/2020
                                $scope.ClearRegistrationFormData();
                            }
                        }
                            //else if (Response.data == 2) { //Commented and Modified by AniketK on 10July2019
                        else if (arr[0] == 2) {
                            //AlertMessage.success('PalashIVF', 'Patient already registerd with these MRNo' + arr[1]);//Commented by swatih for localization on 13/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgPatientalreadyregisterdwiththeseMRNo + arr[1]);//Modified by swatih for localization on 13/7/2020
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
                        //AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');//Commented by swatih for localization on 13/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);//Modified by swatih for localization on 13/7/2020
                    } //else if (!$scope.IsIdentityID) {
                        //$scope.frmRegistration.txtIdProofNo.$dirty = true;
                        //AlertMessage.warning('PalashIVF', 'Please select Identity proof');}
                    else if (!$scope.IsValidLesserAge) {
                        //if ($scope.RegType == 2) {  //Commented and Modified by AniketK on 14Nov2019
                        if ($scope.patient.RegistrationType == 11) {
                            if ($scope.patient.GenderID == 1) {
                                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-60.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_60);//Modified by swatih for localization on 13/7/2020
                            } else if ($scope.patient.GenderID == 2) {
                                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof18_60);//Modified by swatih for localization on 13/7/2020
                            }
                            //} else if ($scope.RegType == 3) { //Commented and Modified by AniketK on 14Nov2019
                        } else if ($scope.patient.RegistrationType == 8 || $scope.patient.RegistrationType == 9) {
                            if ($scope.patient.GenderID == 1) {
                                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_45);//Modified by swatih for localization on 13/7/2020
                            } else if ($scope.patient.GenderID == 2) {
                                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_35);//Modified by swatih for localization on 13/7/2020
                            } else {
                                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_45);//Modified by swatih for localization on 13/7/2020
                            }
                        } else if ($scope.patient.RegistrationType == 10) {
                            //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');
                            //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-37.');//Commented by swatih for localization on 13/7/2020
                            AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_37);//Modified by swatih for localization on 13/7/2020
                        }
                    } else if (!$scope.IsValidGreaterAge) {
                        //if ($scope.RegType == 3) { //Commented and Modified by AniketK on 14Nov2019
                        if ($scope.patient.RegistrationType == 8 || $scope.patient.RegistrationType == 9) {
                            if ($scope.patient.GenderID == 1) {
                                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_45);//Modified by swatih for localization on 13/7/2020
                            } else if ($scope.patient.GenderID == 2) {
                                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_35);//Modified by swatih for localization on 13/7/2020
                            } else {
                                //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_45);//Modified by swatih for localization on 13/7/2020

                            }
                        } else {
                            //AlertMessage.warning('PalashIVF', 'Partner age should be in range of 21-60.');//Commented by swatih for localization on 13/7/2020
                            AlertMessage.warning(objResource.msgTitle, objResource.msgPartnerageshouldbeinrangeof21_60);//Modified by swatih for localization on 13/7/2020
                        }
                    } else if (!$scope.IsValidEmail) {
                        //AlertMessage.warning('PalashIVF', 'Please enter valid email id.');//Commented by swatih for localization on 13/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseentervalidemailid);//Modified by swatih for localization on 13/7/2020
                    } else if (!$scope.IsValidCountryCode) {
                       // AlertMessage.warning('PalashIVF', 'Please enter valid country code.');//Commented by swatih for localization on 13/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseentervalidcountrycode);//Modified by swatih for localization on 13/7/2020
                    } else if ($scope.IsSourceOfReference != undefined && !$scope.IsSourceOfReference) {       //!$scope.IsSourceOfReference   commented by Nayan Kamble
                        //AlertMessage.warning('PalashIVF', 'Please enter Source Of Reference.');//Commented by swatih for localization on 13/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseenterSourceOfReference);//Modified by swatih for localization on 13/7/2020
                    }
                    else if ($scope.IsFillExternalDoctor != undefined && !$scope.IsFillExternalDoctor) {       // Added by Nayan Kamble
                        //AlertMessage.warning('PalashIVF', 'Please fill External Doctor Details.');//Commented by swatih for localization on 13/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillExternalDoctorDetails);//Modified by swatih for localization on 13/7/2020
                    }
                    else {
                        //$scope.NewfrmRegistration.txtMRNo.$dirty = true;
                        $scope.NewfrmRegistration.txtAge.$dirty = true;
                        $scope.NewfrmRegistration.txtFirstName.$dirty = true;
                        $scope.NewfrmRegistration.txtLastName.$dirty = true;
                        //$scope.NewfrmRegistration.partnrDOB.$dirty = true;
                        $scope.NewfrmRegistration.txtMobCountryCode.$dirty = true;
                        $scope.NewfrmRegistration.txtMobNo.$dirty = true;
                        //$scope.frmRegistration.ddlIDProofType.$dirty = true;
                        //$scope.frmRegistration.txtIdProofNo.$dirty = true;
                        debugger;
                        //$scope.frmRegistration.ddlIDProofType.$dirty = true;
                        //$scope.style = "border-color:red";
                        //$scope.NewfrmRegistration.patientDOB.$valid = false;
                        //if ($scope.RegType != 2) {
                        //    $scope.frmRegistration.txtPartnrFirstName.$dirty = true;
                        //    $scope.frmRegistration.txtpartnrLastName.$dirty = true;
                        //    $scope.frmRegistration.patientDOB.$dirty = true;
                        //    $scope.frmRegistration.txtPartnrIDNo.$dirty = true;
                        //    //$scope.frmRegistration.txtpartnrMobConCode.$dirty = true;
                        //    //$scope.frmRegistration.txtpartnrMobNo.$dirty = true;
                        //    //$scope.frmRegistration.txtPartnrEmail.$dirty = true;
                        //}  //tempary commented
                        //AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');//Commented by swatih for localization on 13/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);//Modified by swatih for localization on 13/7/2020
                    }
                    //if ($scope.RegType == 3) { //Commented and Modified by AniketK on 14Nov2019
                    if ($scope.patient.RegistrationType == 8 || $scope.patient.RegistrationType == 9) {
                        $scope.NewfrmRegistration.txtPartnrFirstName.$dirty = false;
                        $scope.NewfrmRegistration.txtpartnrLastName.$dirty = false;
                        $scope.NewfrmRegistration.patientDOB.$dirty = true;
                        $scope.NewfrmRegistration.txtPartnrIDNo.$dirty = false;
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
                //$scope.NewfrmRegistration.txtMRNo.$dirty = true;
                //$scope.frmRegistration.ddlIDProofType.$dirty = true;
                //$scope.frmRegistration.txtIdProofNo.$dirty = true;
                $scope.NewfrmRegistration.txtAge.$dirty = true;
                $scope.NewfrmRegistration.txtpartnrAge.$dirty = true;
                $scope.NewfrmRegistration.txtFirstName.$dirty = true;
                $scope.NewfrmRegistration.txtPartnrFirstName.$dirty = true;
                $scope.NewfrmRegistration.txtLastName.$dirty = true;
                $scope.NewfrmRegistration.txtpartnrLastName.$dirty = true;
                $scope.NewfrmRegistration.txtMobCountryCode.$dirty = true;
                $scope.NewfrmRegistration.txtMobNo.$dirty = true;
                $scope.NewfrmRegistration.txtpartnrMobConCode.$dirty = true;
                $scope.NewfrmRegistration.txtpartnrMobNo.$dirty = true;
                $scope.NewfrmRegistration.txtRegistrationType.$dirty = true;
                $scope.NewfrmRegistration.txtSourceOfReferenceID.$dirty = true;
                $scope.NewfrmRegistration.ddlIDProofType.$dirty = true;
                $scope.NewfrmRegistration.txtIdProofNo.$dirty = true;
                $scope.NewfrmRegistration.ddlPartnrIdProofType.$dirty = true;            
                $scope.NewfrmRegistration.txtPartnrIdNO.$dirty = true;
                $scope.NewfrmRegistration.txtGender.$dirty = true;
                $scope.NewfrmRegistration.txtPartGender.$dirty = true;
                $scope.NewfrmRegistration.txtPartGender.$dirty = true;
                $scope.NewfrmRegistration.ddlDoc.$dirty = true;
                //AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');//Commented by swatih for localization on 13/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);//Modified by swatih for localization on 13/7/2020
                //AlertMessage.info('PalashIVF', 'Please Fill MRNo. field.');
            }
        }
        //$scope.chageRegType = function (patient) {
        //    // clearform();
        //    debugger;
        //    if ($scope.patient.RegistrationType == 7) {
        //        angular.element(lblPartnrFemaleGdr).show();
        //        angular.element(lblPatMaleGdr).show();
        //        angular.element(lblPatTransGdr).show();
        //        angular.element(lblPartnrTransGdr).show();

        //        //angular.element(lblPatMaleGdr).disabled=true;
        //    }
        //    else if ($scope.patient.RegistrationType == 11) {
        //        angular.element(lblPartnrFemaleGdr).show();
        //        angular.element(lblPatMaleGdr).show();
        //        angular.element(lblPartnrTransGdr).show();
        //        angular.element(lblPatTransGdr).show();
        //    }
        //    else if ($scope.patient.RegistrationType == 8 || $scope.patient.RegistrationType == 9) {
        //        angular.element(lblPartnrFemaleGdr).show();
        //        angular.element(lblPatMaleGdr).show();
        //        angular.element(lblPatTransGdr).hide();
        //        angular.element(lblPartnrTransGdr).hide();
        //        $scope.info = true;
        //        if ($scope.patient.GenderID == 1)
        //            $scope.partner.GenderID == 1;
        //        else if ($scope.patient.GenderID == 2)
        //            $scope.partner.GenderID == 2;

        //        //   angular.element(lblPatTransGdr)[0].style.display = 'none';
        //    }
        //    else if ($scope.patient.RegistrationType == 10) {
        //        angular.element(lblPartnrFemaleGdr).hide();
        //        angular.element(lblPatMaleGdr).hide();
        //        angular.element(lblPartnrTransGdr).hide();
        //        angular.element(lblPatTransGdr).hide();
        //    }
        //}

        $scope.showAddPopUp = function () {
            debugger;
            clearAddressPopUp();
            $scope.objAddress.IsPermenant = true;
            var idxPatient = $scope.NewRegistration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == true && $scope.addFor == 'patient' });
            var idxPartnr = $scope.NewRegistration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == false && $scope.addFor == 'partner' });
            if (idxPatient > -1) {
                $scope.objAddress = angular.copy($scope.NewRegistration.lstAddress[idxPatient]);
            }
            else if (idxPartnr > -1) {
                $scope.objAddress = angular.copy($scope.NewRegistration.lstAddress[idxPartnr]);
            }
            if ($scope.objAddress.CountryID > 0)
                $scope.GetStateList($scope.objAddress.CountryID, 'other');
            //if ($scope.objAddress.StateID > 0)
            //$scope.GetCityList($scope.objAddress.StateID, 'other');

            angular.element(Add1).modal('show');
        }
       
        $scope.showAddPopUpPartner = function () {
            debugger;
            clearAddressPopUp();
            $scope.objAddress.IsPermenant = true;
            var idxPatient = $scope.NewRegistration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == true && $scope.addFor == 'patient' });
            var idxPartnr = $scope.NewRegistration.lstAddress.findIndex(function (x) { return x.IsOther == true && x.IsPatient == false && $scope.addFor == 'partner' });
            if (idxPatient > -1) {
                $scope.objAddress = angular.copy($scope.NewRegistration.lstAddress[idxPatient]);
            }
            else if (idxPartnr > -1) {
                $scope.objAddress = angular.copy($scope.NewRegistration.lstAddress[idxPartnr]);
            }
            if ($scope.objAddress.CountryID > 0)
                $scope.GetStateList($scope.objAddress.CountryID, 'other');
            //if ($scope.objAddress.StateID > 0)
            //$scope.GetCityList($scope.objAddress.StateID, 'other');

            angular.element(Add1).modal('show');
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
                //AlertMessage.warning('PalashIVF', 'Enter first name.');//Commented by swatih for localization on 13/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgEntFirstName);//Modified by swatih for localization on 13/7/2020
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
                //AlertMessage.warning('PalashIVF', 'Enter mobile no.');//Commented by swatih for localization on 13/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgEntMobNo);//Modified by swatih for localization on 13/7/2020
                return isValid;
            }

            if (patient.PatientCategoryID == 7) {
                if ((patient.Age < 18 || patient.Age > 60) && patient.GenderID == 2) {
                    $scope.style = "border-color:red";
                    isValid = false;
                    //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 18-60.');//Commented  by swatih for localization on 13/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof18_60);//Modified by swatih for localization on 13/7/2020
                }
                else if (patient.GenderID == 1 && (patient.Age < 21 || patient.Age > 60)) {
                    $scope.style = "border-color:red";
                    isValid = false;
                    //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-60.');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPartnerageshouldbeinrangeof21_60);//Modified by swatih for localization on 13/7/2020
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
                    //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_35);//Modified by swatih for localization on 13/7/2020
                }
                else if (patient.GenderID == 1 && (patient.Age < 21 || patient.Age > 45)) {
                    $scope.style = "border-color:red";
                    isValid = false;
                    //AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-45.');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_45);//Modified by swatih for localization on 13/7/2020
                }
                else $scope.style = null;
                return isValid;
            }
            else if (patient.PatientCategoryID == 10) {
                if (patient.GenderID == 2 && (patient.Age < 21 || patient.Age > 35)) {
                    isValid = false;
                    $scope.style = "border-color:red";
                   // AlertMessage.warning('PalashIVF', 'Patient age should be in range of 21-35.');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPatientageshouldbeinrangeof21_35);//Modified by swatih for localization on 13/7/2020
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
            //  $scope.NewInfo.UnitID = 0;
            $scope.NewInfo.FirstName = '';
            $scope.NewInfo.regTypeID = 0;
        };
        
        $scope.ClearAdvSearch = function () {
            $scope.NewInfo.IdentityID = 0;
            $scope.NewInfo.SourceOfReferenceID = 0;
            $scope.NewInfo.IdentityNumber = '';
            $scope.NewInfo.ReferredDoctorID = 0;
            $scope.FromDate = null;
            $scope.ToDate = null;
            //$scope.NewInfo.RegVisFromDate = null;
            //$scope.NewInfo.RegVisToDate = null;
        }

        $scope.ViewAttach = function ViewAttach() {  // added by sujata
            debugger;
            if ($scope.content != null) {
                angular.element(modViewPhoto).modal('show');
            }
        }

        function checkDate() {
            debugger;
            //if (angular.isDate($scope.NewInfo.RegFromDate) && angular.isDate($scope.NewInfo.RegToDate)) {
            //    if (new Date($scope.NewInfo.RegFromDate) > new Date($scope.NewInfo.RegToDate)) {
            //        AlertMessage.warning('PalashIVF', 'Register From date should be greater than Register to date.')
            //        return false;
            //    }
            //    else return true;
            //}
            //else
            //$scope.FromDate = new Date();
            //$scope.ToDate = new Date();

            if (angular.isDate($scope.RegFromDate) && angular.isDate($scope.RegToDate)) {
                if (new Date($scope.RegFromDate) > new Date($scope.RegToDate)) {
                    //AlertMessage.warning('PalashIVF', 'From date should be greater than To date.')//Commented by swatih for localization on 13/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgFromdateshouldbegreaterthanTodate)//Modified by swatih for localization on 13/7/2020
                    return false;
                }
                else return true;
            }
            else return true;
        }
        
        $scope.getPatientList = function () {
            debugger;
            if (checkDate()) {
                usSpinnerService.spin('GridSpinner');
                if ($scope.NewInfo.regTypeID == 7) $scope.NewInfo.PatientCategoryID = 7;
                else if ($scope.NewInfo.regTypeID == 14) $scope.NewInfo.PatientCategoryID = 14;
                else if ($scope.NewInfo.regTypeID == 8) $scope.NewInfo.PatientCategoryID = 8;
                else if ($scope.NewInfo.regTypeID == 9) $scope.NewInfo.PatientCategoryID = 9;
                else if ($scope.NewInfo.regTypeID == 10) $scope.NewInfo.PatientCategoryID = 10;
                else $scope.NewInfo.PatientCategoryID = 0;
                if (angular.isUndefined($scope.NewInfo.IdentityNumber)) { $scope.NewInfo.IdentityNumber = ''; }
                if (angular.isUndefined($scope.NewInfo.FirstName)) { $scope.NewInfo.FirstName = ''; }
                if ($scope.isPostBack) {
                    //$scope.NewInfo.RegToDate = $filter('date')(new Date(), 'medium');
                    //$scope.NewInfo.RegFromDate = $filter('date')(new Date(), 'medium');
                    $scope.NewInfo.RegToDate = $filter('date')($scope.ToDate, 'medium');
                    $scope.NewInfo.RegFromDate = $filter('date')($scope.FromDate, 'medium');

                    //    if (!$scope.isView){
                    //    $scope.NewInfo.RegVisToDate = $filter('date')(new Date(), 'medium');
                    //    $scope.NewInfo.RegVisFromDate = $filter('date')(new Date(), 'medium');
                    //}
                }
                if ($scope.SearchBy == 1) {
                    $scope.NewInfo.RegToDate = $filter('date')($scope.ToDate, 'medium');
                    $scope.NewInfo.RegFromDate = $filter('date')($scope.FromDate, 'medium');
                    $scope.NewInfo.RegVisToDate = null; $scope.NewInfo.RegVisFromDate = null;               
                }
                if ($scope.SearchBy == 2) {
                    $scope.NewInfo.RegVisToDate = $filter('date')($scope.ToDate, 'medium');
                    $scope.NewInfo.RegVisFromDate = $filter('date')($scope.FromDate, 'medium');
                    $scope.NewInfo.RegFromDate = null; $scope.NewInfo.RegToDate = null;
              
                }

                $scope.NewInfo.PageNo = $scope.CurrentPage - 1;
                debugger;
                var response = NewRegistrationService.getPatientList($scope.NewInfo);
                response.then(function (resp) {
                    debugger;
                    $scope.patientList = resp.data;
                    if (resp.data.length > 0) {
                        $scope.TotalItems = resp.data[0].TotalItems;
                    }
                    else $scope.TotalItems = 0;
                    //if ($scope.isPostBack) {
                    //    $scope.NewInfo.RegToDate = null;
                    //    $scope.NewInfo.RegFromDate = null;
                    //    $scope.NewInfo.RegVisToDate = null;
                    //    $scope.NewInfo.RegVisFromDate = null;
                    //}
                    $scope.isPostBack = false;
                    usSpinnerService.stop('GridSpinner');
                    $scope.BankData = $scope.patientList;
                    //$scope.NewInfo.RegToDate = $scope.NewInfo.RegToDate!=null?new Date($scope.NewInfo.RegToDate):null;
                    //$scope.NewInfo.RegFromDate = $scope.NewInfo.RegFromDate != null ? new Date($scope.NewInfo.RegFromDate) : null;
                    //$scope.NewInfo.RegVisToDate =$scope.NewInfo.RegVisToDate!=null? new Date($scope.NewInfo.RegVisToDate):null;
                    //$scope.NewInfo.RegVisFromDate =$scope.NewInfo.RegVisFromDate!=null? new Date($scope.NewInfo.RegVisFromDate):null;
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                })
            }
        }

        $scope.updatePatientRefInfo = function () {
            debugger;
            if ($scope.NewRefInfo.SourceOfReferenceID > 0) {
                Common.setID($scope.patient.ID);            
                //Common.setID($scope.patient.SpouseInfo.ID);
                var response = NewRegistrationService.updatePatientRefInfo($scope.NewRefInfo);
                response.then(function (resp) {
                    if (resp.data == 1) {
                       // AlertMessage.success('PalashIVF', 'Patient data updated successfully');//Commented by swatih for localization 0n 13/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgPatientdataupdatedsuccessfully);//Modified by swatih for localization 13/7/2020
                        $scope.getPatientByID();
                        Common.clearID();
                    }
                    //else AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization 13/3/2020
                    else AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 13/3/2020
                    angular.element(NewRefInfo).modal('hide');
                }, function (error) {
                })
            }
        }

        $scope.getPatientAddress = function (isOthr) {
            debugger;
            $scope.addressForPatient = true;
            $scope.addressForPartner = false;
            if (isOthr == true)
                $scope.IsOther = isOthr;
            if (isOthr == false)
                $scope.IsOther = isOthr;
            var response = NewRegistrationService.getAddress($scope.patient.ID, isOthr);        
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

        $scope.getSpousePatientAddress = function (isOthr) {
            debugger;
            $scope.addressForPartner = true;
            $scope.addressForPatient = false;
            if (isOthr == true)
                $scope.IsOther = isOthr;
            if (isOthr == false)
                $scope.IsOther = isOthr;
            var response = NewRegistrationService.getAddress($scope.patient.SpouseInfo.ID, isOthr);
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

        $scope.closePatientAddress = function () {
            $scope.objAddress = {};
            angular.element(address).modal('hide');
        }

        $scope.updatePatientAddress = function () {
            debugger;
            if ($scope.addressForPatient == true) {
                Common.setID($scope.patient.ID);
                $scope.objAddress.patientID = $scope.patient.ID;
                $scope.objAddress.IsOther = $scope.IsOther;
            }
            if ($scope.addressForPartner == true) {
                Common.setID($scope.patient.SpouseInfo.ID);
                $scope.objAddress.patientID = $scope.patient.SpouseInfo.ID;
                $scope.objAddress.IsOther = $scope.IsOther;
            }
            var response = NewRegistrationService.updateAddress($scope.objAddress);
            response.then(function (resp) {
                if (resp.data == 1) {
                   // AlertMessage.success('PalashIVF', 'Patient data updated successfully');//Commented by swatih from localization on 13/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgPatientdataupdatedsuccessfully);//Modified by swatih for localization 13/7/2020
                    Common.setID($scope.patient.ID);
                    $scope.getPatientByID();
                    Common.clearID();
                    $scope.objAddress = {};
                }
                    // else AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih from localization on 13/7/2020
               else AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 13/7/2020
                angular.element(address).modal('hide');
            }, function (error) {
            })
        }

        //$scope.updateSpousePatientAddress = function () {
        //    debugger;
        //    Common.setID($scope.patient.SpouseInfo.ID);
        //    $scope.objAddress.patientID = $scope.patient.SpouseInfo.ID;
        //    var response = NewRegistrationService.updateAddress($scope.objAddress);
        //    response.then(function (resp) {
        //        if (resp.data == 1) {
        //            AlertMessage.success('PalashIVF', 'Patient data updated successfully');
        //            $scope.getPatientByID();
        //            Common.clearID();
        //            $scope.objAddress = {};
        //        }
        //        else AlertMessage.error('PalashIVF', 'Error occured.');
        //        angular.element(address).modal('hide');
        //    }, function (error) {
        //    })
        //}

        $scope.getPatientInfo = function () {
            debugger;  
            
                var response = NewRegistrationService.getPatientInfo($scope.patient.ID);
            response.then(function (resp) {
                if (resp.data != null) {
                    $scope.NewInfo = resp.data;
                    if (resp.data.DateOfBirth != null)
                        $scope.NewInfo.DateOfBirth = new Date(resp.data.DateOfBirth);
                    else
                    $scope.NewInfo.PatientID = $scope.patient.ID;
                    $scope.NewInfo.DateOfBirth = $scope.patient.DateOfBirth;
                    $scope.NewInfo.FirstName = $scope.patient.FirstName;
                    $scope.NewInfo.LastName = $scope.patient.LastName;
                    $scope.NewInfo.Age = $scope.patient.Age;
                    $scope.NewInfo.Email = $scope.patient.Email;
                    $scope.NewInfo.MobileNo = $scope.patient.MobileNo;
                    var con = $filter('filter')($scope.CountryList, { CountryID: resp.data.MobCountryCodeID }, true);
                    $scope.country = con[0].CountryCode;
                }
            }, function (error) {
            })
        }

        //Begin:: Added by AniketK on 02Dec2019
        $scope.getPatientSpouseInfo = function () {
            debugger;      
            var response = NewRegistrationService.getPatientSpouseInfo($scope.patient.SpouseInfo.ID);

            response.then(function (resp) {
                if (resp.data != null) {
                    $scope.NewInfo = resp.data;
                    if (resp.data.DateOfBirth != null)
                        $scope.NewInfo.DateOfBirth = new Date(resp.data.DateOfBirth);
                    else
                        $scope.NewInfo.DateOfBirth = null;
                    $scope.NewInfo.FirstName = $scope.patient.SpouseInfo.FirstName;
                    $scope.NewInfo.LastName = $scope.patient.SpouseInfo.LastName;
                    $scope.NewInfo.Age = $scope.patient.SpouseInfo.Age;
                    $scope.NewInfo.Email = $scope.patient.SpouseInfo.Email;
                    $scope.NewInfo.MobileNo = $scope.patient.SpouseInfo.MobileNo;
                    var con = $filter('filter')($scope.CountryList, { CountryID: resp.data.MobCountryCodeID }, true);
                    $scope.country = con[0].CountryCode;
                }
            }, function (error) {
            })
        }
        //End:: Added by AniketK on 02Dec2019

        $scope.updatePatientInfo = function () {
            debugger;
            if (validatePatientInfo($scope.NewInfo)) {
                Common.setID($scope.patient.ID);
                //audit trial
                var OldDataValuepatientEdit = [];
                for (var i = 0; i < $scope.NewfrmRegistration.modifiedModels.length; i++) {
                    if ($scope.NewfrmRegistration.modifiedModels[i].masterValue === undefined || $scope.NewfrmRegistration.modifiedModels[i].masterValue === null)
                        $scope.NewfrmRegistration.modifiedModels[i].masterValue = "";
                    var jmodel = {
                        field: $scope.NewfrmRegistration.modifiedModels[i].$name,
                        oldvalue: $scope.NewfrmRegistration.modifiedModels[i].masterValue.toString(),
                        newvalue: $scope.NewfrmRegistration.modifiedModels[i].$viewValue.toString(),
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


                var response = NewRegistrationService.updatePatientInfo($scope.NewInfo, OldDataValuepatientEdit);
                response.then(function (resp) {
                    if (resp.data == 1) {
                        //AlertMessage.success('PalashIVF', 'Patient data updated successfully');//Commented by swatih for localization on 13/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgPatientdataupdatedsuccessfully);//Modified by swatih for localization 13/7/2020
                        $scope.getPatientByID();
                        Common.clearID();
                        angular.element(NewInfo).modal('hide');
                    }
                   // else AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization on 13/7/2020
                  else AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 13/7/2020
                    angular.element(NewInfo).modal('hide');
                }, function (error) {
                })
            }
            else {
                //$scope.NewfrmRegistration.txtMRNo.$dirty = true;
                //$scope.NewfrmRegistration.txtIdProofNo.$dirty = true;
                $scope.NewfrmRegistration.txtAge.$dirty = true;
                $scope.NewfrmRegistration.txtFirstName.$dirty = true;
                $scope.NewfrmRegistration.txtLastName.$dirty = true;
                $scope.NewfrmRegistration.txtMobCountryCode.$dirty = true;
                $scope.NewfrmRegistration.txtMobNo.$dirty = true;
                //AlertMessage.warning('PalashIVF', 'Fill all mandatory fields.');//Commented by swatih for localization on 13/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields)//Modified by swatih for localization on 13/7/2020
            }
        }

        //check models
        $scope.getPatientAddInfo = function () {
            debugger;
            $scope.IsHideForPartner = false;
            var response = NewRegistrationService.getPatientAddInfo($scope.patient.ID);
            response.then(function (resp) {
                if (resp.data != null) {
                    $scope.NewAddInfo = resp.data;
                    $scope.NewAddInfo.IdentityNumber = $scope.patient.IdentityNumber;
                    $scope.NewAddInfo.FamilyType = $scope.patient.FamilyType;
                }
            }, function (error) {
            })
        }

        $scope.getPatientSpouseAddInfo = function () {
            debugger;
            $scope.IsHideForPartner = true;
            var response = NewRegistrationService.getPatientAddInfo($scope.patient.SpouseInfo.ID);
            response.then(function (resp) {
                if (resp.data != null) {
                    $scope.NewAddInfo = resp.data;
                    $scope.NewAddInfo.IdentityNumber = $scope.patient.SpouseInfo.IdentityNumber;
                    $scope.NewAddInfo.FamilyType = $scope.patient.SpouseInfo.FamilyType;
                }
            }, function (error) {
            })
        }

        $scope.viewPatient = function (id, UnitID) {
            debugger;
            $scope.SetIDs(id, UnitID);
            $location.path('/PatientView/');
        }

        $scope.SetIDs = function (id, UnitID)
        {
            Common.clearID();
            Common.setID(id);
            Common.clearUnitID();
            Common.setUnitID(UnitID);
        }

        $scope.OpenPersonalCharacteristicsModal = function (id, UnitID) {
            debugger;
            $scope.SetIDs(id, UnitID);
            $location.path('/PersonalCharacteristics/');
           
        }

        $scope.OpenPersonalInformationModal = function (id, UnitID,model) {
            debugger;
             sessionStorage.removeItem("SelectedPatient");
            if(model.Gender == "Male"){
                    model.GenderID = 1;
                }
                else{
                      model.GenderID = 2;
                }
               
              var model1 = {};
             
           
              model1 = { "ListPatientImages": [], "TemplateDetailList" : [], "ID": id, "UnitID": UnitID, "PatientName": model.PatientName, "GenderID": model.GenderID, "Gender": model.Gender, "MRNo": model.MRNo, "Email": null, "MobCountryCode": model.MobCountryCode ? model.MobCountryCode :0, "MobileNo": model.MobileNo, "PatientCategoryID": model.PatientCategoryID, "VisitID": 0, "VisitUnitID": 0, "VisitStatusID": 0, "Age": model.Age, "TotalCount": 0, "IsDonorUsed": model.IsDonorUsed, "Status": model.Status, "Date": model.Date, "VitriFicationID": 0, "VitriFicationUnitID": 0, "Isdisable": false, "IsSurrogateLinked": false, "IsDonorLinked": false, "MobCountryCodeID": 0, "ContactNo1": model.ContactNo1};
                model = model1;
      $scope.SelectedPatient = model;
      model.PatientID = id;
         $scope.SelectedPatient = angular.copy(model);   //selected patient details
          sessionStorage.setItem("SelectedPatient", JSON.stringify($scope.SelectedPatient));
         
          // sessionStorage.remove("SelectedPatient");
          
            $scope.SetIDs(id, UnitID);
             Common.SetSelectedPatientInAPI($scope.SelectedPatient);
            $location.path('/PatientAdditional/');
           
              
                    }
                
      

        $scope.CancelPatientPersonalCharacteristicsView = function()
        {
            $scope.ClearPersonalCharacteristicsData();
            $scope.cancelView();
        } 
        
        //Begin:: Added by AniketK on 13Dec2019 for Registration Report
        $scope.GetPatientDataForRegistrationPrint = function (id, UnitID) {
            debugger;
           
            Common.clearID();
            Common.setID(id);
            Common.clearUnitID();
            Common.setUnitID(UnitID);
            $scope.getPatientByIDForPrint();
        }

        $scope.viewPatientPartnerPrint = function () {
            debugger;                              
            if($scope.patient.PatientCategoryID == 7)
                var a = encodeURIComponent('PatientID=' + $scope.patient.ID + '&UnitID=' + $scope.patient.UnitID + '&PatientGenderID=' + $scope.patient.GenderID + '&PartnerGenderID=' + $scope.patient.SpouseInfo.GenderID + '&PatientCategoryID=' + $scope.patient.PatientCategoryID + '&PatientFileName=' + $scope.patient.FileName + '&PartnerFileName=' + $scope.patient.SpouseInfo.FileName + '&PartnerID=' + $scope.patient.SpouseInfo.ID);
            else
                var a = encodeURIComponent('PatientID=' + $scope.patient.ID + '&UnitID=' + $scope.patient.UnitID + '&PatientGenderID=' + $scope.patient.GenderID + '&PatientCategoryID=' + $scope.patient.PatientCategoryID + '&PatientFileName=' + $scope.patient.FileName);
            window.open('/Reports/NewRegistration/RegistrationReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            //}
        }
        //End:: Added by AniketK on 13Dec2019 for Registration Report

        $scope.ddlPatientSearch = function () {
            debugger;       
            //$scope.RegFromDate = new Date();
            //$scope.FromDate = new Date();
            $scope.isPostBack = true;
            $scope.max = new Date();
            $scope.NewInfo.UnitID = localStorageService.get("UserInfo").UnitID;
            $scope.NewInfo.ReferredDoctorID = 0;
            //$scope.RegToDate = new Date();
            //$scope.ToDate = new Date();
            //$scope.CurrentPage = 1;
            //$scope.Info.PageNo = 0;
            checkDate();
            $scope.getPatientList();
            //$scope.Info.RegFromDate = new Date();
            //$scope.Info.RegToDate = new Date();
            //$scope.Info.RegVisFromDate = new Date();
            //$scope.Info.RegVisToDate = new Date();
            $scope.getSourceOfrefList();
            $scope.fillIdPrppfTypeList();
            $scope.fillClinicList();
            $scope.getRegistrationTypeList1();
            $scope.DocList = [];
           $scope.DocList.splice(0, 0, { ID: 0, Description: "Doctor" });       
        }

        $scope.getPatientByIDForPrint = function () {
            debugger;
            usSpinnerService.spin('GridSpinner');
            var obj = {};
            //Common.setID($scope.patient.ID);
            obj.ID = Common.getID();
            var response = NewRegistrationService.getPatientByID(obj);
            response.then(function (resp) {
                if (resp.data != null) {
                    $scope.patient = resp.data;
                    $scope.viewPatientPartnerPrint();
                    if ($scope.patient.FamilyType == 1)     //Added by Nayan Kamble
                        $scope.FamilyType = 'Joint';
                    else
                        $scope.FamilyType = 'Nuclear';
                }
                usSpinnerService.stop('GridSpinner');
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            })
        }
       

        $scope.getPatientByID = function () {
            debugger;
             $scope.FemaleParentList.forEach(function (item) {
                
                    if (item.Title == "Patient Additional Information") {
                        FormID = item.ModuleId;
                   }
             });
            usSpinnerService.spin('GridSpinner');
            var obj = {};
           //Common.setID($scope.patient.ID);
            obj.ID = Common.getID();
           obj.FormId=FormID;
          // $scope.GetTemplateByFormID1(obj.FormID);
           // $scope.GetTemplateByFormID();
          
            var response = NewRegistrationService.getPatientByID(obj);
            response.then(function (resp) {
                if (resp.data != null) {
                    $scope.patient = resp.data;
                    if ($scope.patient.PatientCategoryID == 7)
                        $scope.SpouseTabVisible = true;
                    else
                        $scope.SpouseTabVisible = false;
                    if ($scope.patient.FamilyType == 1)     //Added by Nayan Kamble
                        $scope.FamilyType = 'Joint';
                    else
                        $scope.FamilyType = 'Nuclear';
                }
                usSpinnerService.stop('GridSpinner');
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
            
        }

    
        
        $scope.GetTemplateByFormID1 = function(){
      
       var ResponseData1 = NewRegistrationService.GetTemplateByFormID(FormID);
        ResponseData1.then(function (Response) {
       
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                debugger;
                if (Response.data.length > 1) { //Go cursor this scope when multiple visit
                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'modelID',
                        controller: 'modelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            ResponseData1: function () {
                                return Response.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) { // return here after cancel reason entered
                        if (!angular.equals({}, data)) {

                            //tempplate set
                            $scope.DesignEMRVO = data;
                            //FOR FIRST time added template which do not have scema and editor data
                            if (data.EditorSchema != null)
                                $scope.data = JSON.parse(data.EditorSchema);
                            else {

                                $scope.data = [{
                                    'id': 1,
                                    'title': $scope.DesignEMRVO.TempName,
                                    'description': '',
                                    'appliesTo': $scope.DesignEMRVO.GenderID,
                                    'templateType': $scope.DesignEMRVO.FormID,
                                    'depth': 0,
                                    'nodes': [
                                    {
                                        'id': 11,
                                        'title': 'Section1',
                                        'depth': 1,
                                        'nodes': [
                                        ]
                                    },
                                    ]
                                }];
                            }
                            $scope.schema = JSON.parse(data.SchemaDecription);
                            $scope.form = JSON.parse(data.FormDecription);
                            if (data.ModelDescription != null)
                                $scope.model = JSON.parse(data.ModelDescription);
                                $scope.showJson();
                            $scope.ListAllTemplateList(data.ID);
                        }
                    });
                }
                else {
                    //tempplate set
                    $scope.DesignEMRVO = Response.data[0];
                    //FOR FIRST time added template which do not have scema and editor data
                    if (Response.data[0] != null && Response.data[0] != undefined) {
                        if (Response.data[0].EditorSchema != undefined) {
                            if (Response.data[0].EditorSchema != null)
                                $scope.data = JSON.parse(Response.data[0].EditorSchema);
                            else {
                                $scope.data = [{
                                    'id': 1,
                                    'title': $scope.DesignEMRVO.TempName,
                                    'description': '',
                                    'appliesTo': $scope.DesignEMRVO.GenderID,
                                    'templateType': $scope.DesignEMRVO.FormID,
                                    'depth': 0,
                                    'nodes': [
                                    {
                                        'id': 11,
                                        'title': 'Section1',
                                        'depth': 1,
                                        'nodes': [
                                        ]
                                    },
                                    ]
                                }];
                            }

                        }
                        else {
                            $scope.data = [{
                                'id': 1,
                                'title': $scope.DesignEMRVO.TempName,
                                'description': '',
                                'appliesTo': $scope.DesignEMRVO.GenderID,
                                'templateType': $scope.DesignEMRVO.FormID,
                                'depth': 0,
                                'nodes': [
                                {
                                    'id': 11,
                                    'title': 'Section1',
                                    'depth': 1,
                                    'nodes': [
                                    ]
                                },
                                ]
                            }];
                        }
                        $scope.schema = JSON.parse(Response.data[0].SchemaDecription);
                        $scope.form = JSON.parse(Response.data[0].FormDecription);
                        if (Response.data[0].ModelDescription != null)
                            $scope.model = JSON.parse(Response.data[0].ModelDescription);
                           
                        $scope.showJson();
                        
                          $scope.ListAllTemplateList(Response.data[0].ID);
                        //$rootScope.FormName = $scope.DesignEMRVO.TempName;
                        //disale if not visit except laproscopy histroscopy HSG
                        if ($scope.DesignEMRVO.FormID != 1 && $scope.DesignEMRVO.FormID != 2 && $scope.DesignEMRVO.FormID != 4) {
                            if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined))
                            //if ($scope.DesignEMRVO.VisitID == selectPatient.VisitID && $scope.DesignEMRVO.VisitUnitID == selectPatient.VisitUnitID)

                                $scope.IsVisitMarked = true;
                            else
                                $scope.IsVisitMarked = false;
                        }                        
                    }
                    else {
                        $scope.IsVisitMarked = true;
                    }
                   
                }

            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });

                }
//ADD by dhanashri sharma

   
$scope.GetPatientInfo1 = function GetPatientInfo() {
        debugger; 
     
       $scope.CurrentUser = localStorageService.get("UserInfo");  //Added by AniketK on 17June2020        
      // $scope.SelectedPatient = Common.getSelectedPatient();
       $scope.SelectedPatient = JSON.parse(sessionStorage.getItem("SelectedPatient"));
       // $scope.SelectedCouple = Common.getSelectedCouple();
              
        Common.GetPatientInfo($scope.CurrentUser, $scope.SelectedPatient, $scope.SelectedCouple).then(function (response) {
      if(response.data == 1)
      {
      //$scope.GetTemplateByFormID1(FormID);
      }

         }, function (err) {
          })
         // Common.clearSelectedPatient();
             

        //Common.setSelectedPatient($scope.SelectedPatient);

    }

   


        $rootScope.$on("onSelect", function (model) {//Added by Divya For Patient Dashboard  on 11 april 2020
            debugger;
            var model = model.currentScope.Item;
            //model = "Hello";
            $scope.onSelect(model);
        });

        $scope.onSelect = function (model) {
            debugger;
          
            //Begin:: Added by AniketK on 07July2020 for Single Patient Selection for Video Consulation from Patient Search Tab.        
            var response = Common.GetActiveVisitByPatient(model.ID, model.UnitID, $scope.Sessionobj);

           
          
        //End:: Added by AniketK on 07July2020 for Single Patient Selection for Video Consulation from Patient Search Tab.
        if (model) {
            $scope.SelectedPatient = angular.copy(model);   //selected patient details
            sessionStorage.setItem("selectedPatient", JSON.stringify($scope.SelectedPatient));
        }
        else {
            $scope.SelectedPatient = JSON.parse(sessionStorage.getItem('selectedPatient'));
        }
       
        if ($scope.SelectedPatient.PatientCategoryID == 7) {
            $rootScope.IsFemale = 1;
            $rootScope.IsMale = 1;
            $scope.GetCoupleDetails(0);
            if ($scope.SelectedPatient.GenderID == 2) {
                $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
            }
            else {
                $rootScope.IsMaleActive = true;
                $rootScope.IsFemaleActive = false;
            }
        }
        else {
            if ($scope.SelectedPatient.GenderID == 2) {
                $rootScope.IsFemale = 1;
                $rootScope.IsFemaleActive = true;
                $rootScope.IsMaleActive = false;
            }
            else {
                $rootScope.IsMale = 1;
                $rootScope.IsMaleActive = true;
                $rootScope.IsFemaleActive = false;
            }
            $scope.GetDonorDetails();
        }
      
    };

     $scope.GetDonorDetails = function GetDonorDetails() {
        var response = Common.getSelectedPatient($scope.SelectedPatient);
        response.then(function (resp) {
         
                $scope.IsEmrPrint = true; //for print action
                Common.clearSelectedPatient();
                Common.clearSelectedCouple();
                Common.SetSelectedPatientInAPI($scope.SelectedPatient);
                if (resp.data.GenderID == 1) {
                    $rootScope.CoupleDetails.MalePatient.MalePhotoStr = resp.data.Photo;
                    $rootScope.CoupleDetails.MalePatient.MalePatientName = resp.data.PatientName;
                    $rootScope.CoupleDetails.MalePatient.MaleDOB = resp.data.DOB;
                    $rootScope.CoupleDetails.MalePatient.MaleMRNO = resp.data.MRNo;
                    $rootScope.CoupleDetails.MalePatient.MaleAgeInYr = resp.data.Age;
                    $rootScope.CoupleDetails.MalePatient.MaleHeight = resp.data.MaleHeight;
                    $rootScope.CoupleDetails.MalePatient.MaleWeight = resp.data.MaleWeight;
                    $rootScope.CoupleDetails.MalePatient.MaleBMI = resp.data.MaleBMI;
                    $rootScope.CoupleDetails.MalePatient.MaleId = resp.data.ID;
                    $rootScope.CoupleDetails.MalePatient.MAleUnitID = resp.data.UnitID;
                    $rootScope.CoupleDetails.MalePatient.MaleMRNO = resp.data.MRNo;
                    $rootScope.CoupleDetails.MalePatient.GenderID = resp.data.GenderID;
                    $rootScope.CoupleDetails.MalePatient.PatientCategoryID = resp.data.PatientCategoryID;
                    $rootScope.CoupleDetails.MalePatient.IsDonor = true;
                    $rootScope.CoupleDetails.MalePatient.IsDonorUsed = resp.data.IsDonorUsed;
                    $rootScope.IsFemale = 0;
                    $rootScope.IsMale = 1;
                    $rootScope.CoupleDetails.FemalePatient = {};
                    $scope.VisitPopUP($scope.SelectedPatient);
                }
                else if (resp.data.GenderID == 2) {
                    $rootScope.CoupleDetails.FemalePatient.FemalePhotoStr = resp.data.Photo;
                    $rootScope.CoupleDetails.FemalePatient.FemalePatientName = resp.data.PatientName;
                    $rootScope.CoupleDetails.FemalePatient.FemaleDOB = resp.data.DOB;
                    $rootScope.CoupleDetails.FemalePatient.FemaleMRNO = resp.data.MRNo;
                    $rootScope.CoupleDetails.FemalePatient.FemaleAgeInYr = resp.data.Age;
                    $rootScope.CoupleDetails.FemalePatient.FemaleHeight = resp.data.MaleHeight;
                    $rootScope.CoupleDetails.FemalePatient.FemaleWeight = resp.data.MaleWeight;
                    $rootScope.CoupleDetails.FemalePatient.FemaleBMI = resp.data.MaleBMI;
                    $rootScope.CoupleDetails.FemalePatient.FemalePatientID = resp.data.ID;
                    $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID = resp.data.UnitID;
                    $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO = resp.data.MRNo;
                    $rootScope.CoupleDetails.FemalePatient.PatientCategoryID = resp.data.PatientCategoryID;
                    $rootScope.CoupleDetails.FemalePatient.GenderID = resp.data.GenderID;
                    $rootScope.CoupleDetails.FemalePatient.CoupleCode = resp.data.CoupleCode;
                    $rootScope.CoupleDetails.FemalePatient.CoupleFemailID = resp.data.CoupleFemailID;
                    $rootScope.CoupleDetails.FemalePatient.CoupleFemailUnitID = resp.data.CoupleFemailUnitID;
                    $rootScope.CoupleDetails.FemalePatient.IsDonor = true;
                    $rootScope.CoupleDetails.FemalePatient.IsDonorUsed = resp.data.IsDonorUsed;
                    $rootScope.CoupleDetails.FemalePatient.IsCloseCycle = resp.data.IsCloseCycle;
                    $rootScope.IsMale = 0;
                    $rootScope.IsFemale = 1;
                    $rootScope.CoupleDetails.MalePatient = {};
                    $scope.VisitPopUP($scope.SelectedPatient);
                }

                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};

                Common.setSelectedPatient($scope.SelectedPatient);
                Common.setSelectedCouple($rootScope.CoupleDetails);
                //Common.SetTherapyDetails(0, 0, 0, 0);
            $scope.$scope.OpenPersonalInformationModal();

            
        });
    }
    

    
    //END  

     
        //$scope.GetPatientInfo = function GetPatientInfo() {
        //    //debugger;   
             
        //    $scope.CurrentUser = localStorageService.get("UserInfo");  //Added by AniketK on 17June2020        
        //    //$scope.SelectedPatient = Common.getSelectedPatient();
        //   $scope.SelectedPatient = JSON.parse(sessionStorage.getItem("SelectedPatient"));
        //    $scope.SelectedCouple = Common.getSelectedCouple();
              
        //    Common.GetPatientInfo($scope.CurrentUser, $scope.SelectedPatient, $scope.SelectedCouple).then(function (response) {
        //    }, function (err) {
        //    })
        //    Common.clearSelectedPatient();
             

        //      Common.setSelectedPatient($scope.SelectedPatient);
             
        //}
       
     $scope.GetCoupleDetails = function GetCoupleDetails(From) {
        debugger;
        var response = Common.GetCoupleDetails($scope.SelectedPatient);
        response.then(function (resp) {
            if (resp.data != null) {
                //NoOfVials + 1 //Commented by divya
                var NoOfVials = NoOfVials + 1 //Added by divya 
                $scope.IsEmrPrint = true; //for print action
                //for female 
                debugger
                resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies;
                if (resp.data.FemalePatient.Allergies == null || resp.data.FemalePatient.Allergies == '' || resp.data.FemalePatient.Allergies == undefined)
                    resp.data.FemalePatient.Allergies = '';
                if (resp.data.FemalePatient.Addictions == null || resp.data.FemalePatient.Addictions == undefined || resp.data.FemalePatient.Addictions == '') {
                    resp.data.FemalePatient.Addictions = '';
                }
                //if (resp.data.FemalePatient.AllergiesFood != '') {
                //    if (resp.data.FemalePatient.Allergies != '')
                //        resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies + ',' + resp.data.FemalePatient.AllergiesFood;
                //    else
                //        resp.data.FemalePatient.Allergies = resp.data.FemalePatient.AllergiesFood;
                //}
                //if (resp.data.FemalePatient.AllergiesOthers != '') {
                //    if (resp.data.FemalePatient.Allergies != '')
                //        resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies + ',' + resp.data.FemalePatient.AllergiesOthers;
                //    else
                //        resp.data.FemalePatient.Allergies = resp.data.FemalePatient.AllergiesOthers;
                //}
                if (resp.data.FemalePatient.IsAlcohol)
                    resp.data.FemalePatient.Addictions = 'Alcohol, ';
                if (resp.data.FemalePatient.IsTobacco)
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Tobacco, ';
                if (resp.data.FemalePatient.IsSmoking)
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Smoking, ';
                if (resp.data.FemalePatient.IsDrugAddiction)
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Drug, ';
                if (resp.data.FemalePatient.IsCaffeineAddiction)
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Caffeine';
                if (resp.data.FemalePatient.Addictions.slice(-2) == ', ')
                    resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions.slice(0, -2);
                if (resp.data.FemalePatient.Allergies.slice(1) == ',')
                    resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies.slice(1);
                // for Male
                debugger;
                resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies;
                if (resp.data.MalePatient.Allergies == null || resp.data.MalePatient.Allergies == '' || resp.data.MalePatient.Allergies == undefined)
                    resp.data.MalePatient.Allergies = '';

                if (resp.data.MalePatient.Addictions == null || resp.data.MalePatient.Addictions == undefined || resp.data.MalePatient.Addictions == '') {
                    resp.data.MalePatient.Addictions = '';
                }
                //if (resp.data.MalePatient.AllergiesFood != '') {
                //    if (resp.data.MalePatient.Allergies != '')
                //        resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies + ',' + resp.data.MalePatient.AllergiesFood;
                //    else
                //        resp.data.MalePatient.Allergies = resp.data.MalePatient.AllergiesFood;
                //}
                //if (resp.data.MalePatient.AllergiesOthers != '') {
                //    if (resp.data.MalePatient.Allergies != '')
                //        resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies + ',' + resp.data.MalePatient.AllergiesOthers;
                //    else
                //        resp.data.MalePatient.Allergies = resp.data.MalePatient.AllergiesOthers;
                //}
                if (resp.data.MalePatient.IsAlcohol)
                    resp.data.MalePatient.Addictions = 'Alcohol, ';
                if (resp.data.MalePatient.IsTobacco)
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Tobacco, ';
                if (resp.data.MalePatient.IsSmoking)
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Smoking, ';
                if (resp.data.MalePatient.IsDrugAddiction)
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Drug,';
                if (resp.data.MalePatient.IsCaffeineAddiction)
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Caffeine';
                if (resp.data.MalePatient.Addictions.slice(-2) == ', ')
                    resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions.slice(0, -2);
                if (resp.data.MalePatient.Allergies.slice(1) == ',')
                    resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies.slice(1);
                $rootScope.CoupleDetails = resp.data;
                console.log("in layout", $rootScope.CoupleDetails)
                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                Common.clearSelectedPatient();
                Common.clearSelectedCouple();

              Common.setSelectedPatient($scope.SelectedPatient);

              



                Common.setSelectedCouple($rootScope.CoupleDetails);
                // by default 
                $scope.VisitPopUP($scope.SelectedPatient);
                //Common.SetTherapyDetails(0, 0, 0, 0);
               
                $scope.GetDonorDetails();

            }
        });

    }
    //END


       $scope.BindMaleFemaleCoupleDetails = function BindMaleFemaleCoupleDetails(UnitID, ID, GenderID) {
        debugger;
        $rootScope.VisitTypeID = $rootScope.VisitTypeID;
        var response = Common.BindMaleFemaleCoupleDetails(UnitID, ID, GenderID);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.IsEmrPrint = true; //for print action               
                $scope.FemalePatient = resp.data.FemalePatient;
                debugger;
                $scope.MalePatient = resp.data.MalePatient;
                if ($scope.FemalePatient != null) {
                    //for female 
                    if ($scope.FemalePatient.Allergies == null || $scope.FemalePatient.Allergies == '' || $scope.FemalePatient.Allergies == undefined)
                        $scope.FemalePatient.Allergies = '';
                    if ($scope.FemalePatient.Addictions == null || $scope.FemalePatient.Addictions == undefined || $scope.FemalePatient.Addictions == '') {
                        $scope.FemalePatient.Addictions = '';
                    }
                    //if ($scope.FemalePatient.AllergiesFood != '') {
                    //    if ($scope.FemalePatient.Allergies != '')
                    //        $scope.FemalePatient.Allergies = $scope.FemalePatient.Allergies + ',' + $scope.FemalePatient.AllergiesFood;
                    //    else
                    //        $scope.FemalePatient.Allergies = $scope.FemalePatient.AllergiesFood;
                    //}
                    //if ($scope.FemalePatient.AllergiesOthers != '') {
                    //    if ($scope.FemalePatient.Allergies != '')
                    //        $scope.FemalePatient.Allergies = $scope.FemalePatient.Allergies + ',' + $scope.FemalePatient.AllergiesOthers;
                    //    else
                    //        $scope.FemalePatient.Allergies = $scope.FemalePatient.AllergiesOthers;
                    //}
                    debugger;
                    if ($scope.FemalePatient.IsAlcohol)
                        $scope.FemalePatient.Addictions = 'Alcohol, ';
                    if ($scope.FemalePatient.IsTobacco)
                        $scope.FemalePatient.Addictions = $scope.FemalePatient.Addictions + 'Tobacco, ';
                    if ($scope.FemalePatient.IsSmoking)
                        $scope.FemalePatient.Addictions = $scope.FemalePatient.Addictions + 'Smoking, ';
                    if ($scope.FemalePatient.IsDrugAddiction)
                        $scope.FemalePatient.Addictions = $scope.FemalePatient.Addictions + 'Drug, ';
                    if ($scope.FemalePatient.IsCaffeineAddiction)
                        $scope.FemalePatient.Addictions = $scope.FemalePatient.Addictions + 'Caffeine';
                    if ($scope.FemalePatient.Addictions.slice(-2) == ', ')
                        $scope.FemalePatient.Addictions = $scope.FemalePatient.Addictions.slice(0, -2);
                    if ($scope.FemalePatient.Allergies.slice(1) == ',')
                        $scope.FemalePatient.Allergies = $scope.FemalePatient.Allergies.slice(1);

                    $rootScope.CoupleDetails.FemalePatient.Allergies = $scope.FemalePatient.Allergies;
                    console.log("female 1", $rootScope.CoupleDetails.FemalePatient.Allergies)
                    $rootScope.CoupleDetails.FemalePatient.Addictions = $scope.FemalePatient.Addictions;
                    $rootScope.CoupleDetails.FemalePatient.FemaleBMI = $scope.FemalePatient.FemaleBMI;
                    $rootScope.CoupleDetails.FemalePatient.FemaleHeight = $scope.FemalePatient.FemaleHeight;
                    $rootScope.CoupleDetails.FemalePatient.FemaleDOB = $scope.FemalePatient.FemaleDOB;
                    $rootScope.CoupleDetails.FemalePatient.MaleAgeInYr = $scope.FemalePatient.MaleAgeInYr;
                    $rootScope.CoupleDetails.FemalePatient.FemaleWeight = $scope.FemalePatient.FemaleWeight;
                    $rootScope.CoupleDetails.FemalePatient.CycleCode = $scope.FemalePatient.CycleCode;
                    $rootScope.CoupleDetails.FemalePatient.ARTType = $scope.FemalePatient.ARTType;
                    $rootScope.CoupleDetails.FemalePatient.ARTSubType = $scope.FemalePatient.ARTSubType;
                    $rootScope.CoupleDetails.FemalePatient.LMP = $scope.FemalePatient.LMP;
                    if (angular.isDate(new Date($scope.FemalePatient.LMP)) && $scope.FemalePatient.LMP != null) {
                        var dt2 = new Date();
                        var dt1 = new Date($scope.FemalePatient.LMP);
                        $scope.CycleDay = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)) + 1;
                    }
                    else {
                        $scope.CycleDay = '';

                    }

                }
                else if ($scope.MalePatient != null) {
                    // for Male
                    debugger;
                    $scope.MalePatient.Allergies = $scope.MalePatient.Allergies;
                    if ($scope.MalePatient.Allergies == null || $scope.MalePatient.Allergies == '' || $scope.MalePatient.Allergies == undefined)
                        $scope.MalePatient.Allergies = '';
                    if ($scope.MalePatient.Addictions == null || $scope.MalePatient.Addictions == undefined || $scope.MalePatient.Addictions == '') {
                        $scope.MalePatient.Addictions = '';
                    }
                    //if ($scope.MalePatient.AllergiesFood != '') {
                    //    if ($scope.MalePatient.Allergies != '')
                    //        $scope.MalePatient.Allergies = $scope.MalePatient.Allergies + ',' + $scope.MalePatient.AllergiesFood;
                    //    else
                    //        $scope.MalePatient.Allergies = $scope.MalePatient.AllergiesFood;
                    //}
                    //if ($scope.MalePatient.AllergiesOthers != '') {
                    //    if ($scope.MalePatient.Allergies != '')
                    //        $scope.MalePatient.Allergies = $scope.MalePatient.Allergies + ',' + $scope.MalePatient.AllergiesOthers;
                    //    else
                    //        $scope.MalePatient.Allergies = $scope.MalePatient.AllergiesOthers;
                    //}
                    if ($scope.MalePatient.IsAlcohol)
                        $scope.MalePatient.Addictions = 'Alcohol, ';
                    if ($scope.MalePatient.IsTobacco)
                        $scope.MalePatient.Addictions = $scope.MalePatient.Addictions + 'Tobacco, ';
                    if ($scope.MalePatient.IsSmoking)
                        $scope.MalePatient.Addictions = $scope.MalePatient.Addictions + 'Smoking, ';
                    if ($scope.MalePatient.IsDrugAddiction)
                        $scope.MalePatient.Addictions = $scope.MalePatient.Addictions + 'Drug,';
                    if ($scope.MalePatient.IsCaffeineAddiction)
                        $scope.MalePatient.Addictions = $scope.MalePatient.Addictions + 'Caffeine';
                    if ($scope.MalePatient.Addictions.slice(-2) == ', ')
                        $scope.MalePatient.Addictions = $scope.MalePatient.Addictions.slice(0, -2);
                    if ($scope.MalePatient.Allergies.slice(1) == ',')
                        $scope.MalePatient.Allergies = $scope.MalePatient.Allergies.slice(1);

                    $rootScope.CoupleDetails.MalePatient.Allergies = $scope.MalePatient.Allergies;
                    $rootScope.CoupleDetails.MalePatient.Addictions = $scope.MalePatient.Addictions;
                    $rootScope.CoupleDetails.MalePatient.MaleBMI = $scope.MalePatient.MaleBMI;
                    $rootScope.CoupleDetails.MalePatient.MaleHeight = $scope.MalePatient.MaleHeight;
                    $rootScope.CoupleDetails.MalePatient.MaleDOB = $scope.MalePatient.MaleDOB;
                    $rootScope.CoupleDetails.MalePatient.MaleAgeInYr = $scope.MalePatient.MaleAgeInYr;
                    $rootScope.CoupleDetails.MalePatient.MaleWeight = $scope.MalePatient.MaleWeight;
                }
            }
        });
    }
  

    
        $scope.ListAllTemplateList = function (ID) {
        debugger;
        
          

        var ResponseData = NewRegistrationService.ListAllTemplateList(ID);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                
                $scope.TemplateDetailList = Response.data;
                if( Response.data.length>0)
                {
                        $scope.RedirectToSelf(Response.data[0].ID,Response.data[0].UnitID)
                }
                
                
            }
        }, function (error) {
           
            $scope.Error = error;
        });
      
          
    }
   
     $scope.SaveUpdateEMRTemplate = function () {
        
        $scope.$broadcast('schemaFormValidate');
        
        if ($scope.myForm.$valid) {
           
            $scope.DesignEMRVO1 = $scope.DesignEMRVO;
            $scope.DesignEMRVO.FormID = FormID;
            //$scope.DesignEMRVO.TID = Common.getID();
           // $scope.DesignEMRVO.ID = Common.getID();
            $scope.DesignEMRVO.ModelDescription = JSON.stringify($scope.model);
            var ResponseData = NewRegistrationService.SaveUpdateEMRTemplate($scope.DesignEMRVO);
            ResponseData.then(function (Response) {

                if (Response.data >= 1) {
                    AlertMessage.success("Saved Successfully");
                    $scope.btnSaveUpdatetext = 'Save';
                    //$scope.ClearForm();
                    $scope.PageInit();
                   
                }
            }, function (error) {
                $scope.Error = error;
              
            });
        }
    }
    
    $scope.Clear = function () {
        //clear all 
        $scope.DesignEMRVO = {};
        $scope.form = [];
        $scope.schema = {
            "type": "object",
            "title": "",
            "properties": {},
            "required": [],
            "format": "object"
        };
        var fileuploadtags = {
            "add": "Open file browser",
            "preview": "Preview Upload",
            "filename": "File Name",
            "progress": "Progress Status",
            "upload": "Upload",
            "dragorclick": "Drag and drop your file here or click here"
        };
        var fileuploadimg = {
            "title": "Image (Label coming from form definition)",
            "type": "array",
            "format": "singlefile",
            "x-schema-form": {
                "type": "array"
            },
            "pattern": {
                "mimeType": "image/*",
                "validationMessage": "Incorrect file type: "
            },
            "maxSize": {
                "maximum": "2MB",
                "validationMessage": "Allowed file size exceeded: ",
                "validationMessage2": "Current file size: "
            },
            "maxItems": {
                "validationMessage": "More files were uploaded than allowed."
            },
            "minItems": {
                "validationMessage": "You must upload at least one file"
            }
        }
        
        $scope.model = {};
        $scope.TemplateDetailList = [];
       // $scope.GetTemplateByFormID1(); // init mathods
    }
//      if( $scope.patient.GenderID == 2){
//         $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;

//}
//else
//{
//$scope.selectPatient.PatientID = SelectedCouple.MalePatient.MaleId;
//}
       

    //Get Couple details
          
   
        //$scope.viewAttachment = function () {
        //    debugger;
        //    $scope.content = '';
        //    //if ($scope.patient.strAttachment != null) {
        //    if ($scope.patient.AttachPatientPath1 != null) {
        //        //$scope.extn = $scope.patient.strAttachment.substring($scope.patient.strAttachment.indexOf(':') + 1, $scope.patient.strAttachment.indexOf('/'));
        //        // $scope.FileName = resp.data.FileName;
        //        if ($scope.extn == 'image') {
        //            $scope.Image = $scope.patient.AttachPatientPath1;
        //            $scope.content = '';
        //        }
        //        else {
        //            $scope.content = $scope.patient.AttachPatientPath1;
        //            //$scope.Image = null;
        //            //window.open($scope.content);
        //        }
        //        angular.element(modViewAttachment).modal('show');
        //    }
        //}

        $scope.viewAttachment = function () {
            debugger;
            $scope.content = '';
            //$scope.PatientID = '';
            var obj = {};
            //obj.PatientID = Common.getID();
            obj.PatientID = $scope.patient.ID;
            var response = NewRegistrationService.viewAttachment(obj);
            response.then(function (resp) {
                if (resp.data != null) {
                    //$scope.patient.AttachPatientPath1 = resp.data;
                    $scope.content = resp.data.AttachPatientPath1;
                    window.open($scope.content);
                    //var Image = resp.data.AttachPatientPath1;
                }           
            })
            //, function (error) {
            //    usSpinnerService.stop('GridSpinner');
            //})
            //angular.element(modViewAttachment).modal('show');      
        }
        $scope.viewSpouseAttachment = function () {
            debugger;
            $scope.content = '';
            //$scope.PatientID = '';
            var obj = {};
            obj.PatientID = $scope.patient.SpouseInfo.ID;
            var response = NewRegistrationService.viewAttachment(obj);
            response.then(function (resp) {
                if (resp.data != null) {
                    //$scope.patient.AttachPatientPath1 = resp.data;
                    $scope.content = resp.data.AttachPatientPath1;
                    window.open($scope.content);
                    //var Image = resp.data.AttachPatientPath1;
                }
            })
            //, function (error) {
            //    usSpinnerService.stop('GridSpinner');
            //})
            //angular.element(modViewSpouseAttachment).modal('show');
        }

        //$scope.viewAttachment = function () {
        //    debugger;
        //    if ($scope.patient.AttachPatientPath != null) {
        //        //$scope.extn = $scope.patient.strAttachment.substring($scope.patient.strAttachment.indexOf(':') + 1, $scope.patient.strAttachment.indexOf('/'));
        //        // $scope.FileName = resp.data.FileName;
        //        if ($scope.extn == 'image') {
        //            //$scope.Image = $scope.patient.strAttachment;
        //            $scope.Image = $scope.patient.AttachPatientPath;
        //            window.open($scope.Image);
        //            $scope.content = '';
        //        }
        //        else {
        //            $scope.content = $scope.patient.AttachPatientPath;
        //            window.open($scope.Image);
        //            //$scope.Image = null;
        //            //window.open($scope.content);
        //        }
        //        angular.element(modViewAttachment).modal('show');
        //    }
        //}

        //$scope.viewSpouseAttachment = function () {
        //    debugger;
        //    if ($scope.patient.SpouseInfo.strAttachment != null) {
        //        $scope.extn = $scope.patient.SpouseInfo.strAttachment.substring($scope.patient.SpouseInfo.strAttachment.indexOf(':') + 1, $scope.patient.SpouseInfo.strAttachment.indexOf('/'));
        //        // $scope.FileName = resp.data.FileName;
        //        if ($scope.extn == 'image') {
        //            $scope.Image = $scope.patient.SpouseInfo.strAttachment;
        //            $scope.content = '';
        //        }
        //        else {
        //            $scope.content = $scope.patient.SpouseInfo.strAttachment;
        //            $scope.Image = null;
        //            //window.open($scope.content);
        //        }
        //        angular.element(modViewAttachment).modal('show');
        //    }
        //}

        //$scope.viewSpouseAttachment = function () {
        //    debugger;
        //    $scope.content = '';
        //    if ($scope.patient.SpouseInfo.AttachPartnerPath1 != null) {
        //        //$scope.extn = $scope.patient.SpouseInfo.strAttachment.substring($scope.patient.SpouseInfo.strAttachment.indexOf(':') + 1, $scope.patient.SpouseInfo.strAttachment.indexOf('/'));
        //        // $scope.FileName = resp.data.FileName;
        //        if ($scope.extn == 'image') {
        //            $scope.Image = $scope.patient.SpouseInfo.AttachPartnerPath1;
        //            $scope.content = '';
        //        }
        //        else {
        //            $scope.content = $scope.patient.SpouseInfo.AttachPartnerPath1;
        //            //$scope.Image = null;                
        //            //window.open($scope.content);
        //        }
        //        angular.element(modViewSpouseAttachment).modal('show');
        //    }
        //}

        $scope.CloseviewAttachment = function () {
            debugger;
            //$scope.content = '';
            angular.element(modViewAttachment).modal('hide');
        }
        $scope.CloseviewSpouseAttachment = function () {
            debugger;
            angular.element(modViewSpouseAttachment).modal('hide');
        }

        $scope.GetBankInfo = function () {

            if (angular.isUndefined($scope.patient.ID))
                var PatientID = Common.getID();
            else
                var PatientID = $scope.patient.ID;

            if (angular.isUndefined($scope.patient.UnitID))
                var UnitID = Common.getUnitID();
            else
                var UnitID = $scope.patient.UnitID;

            var response = NewRegistrationService.GetBankInformation(PatientID, UnitID);
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

        //File Attachment
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
                    //AlertMessage.info('PalashIVF', 'Attactment should be not greater than 2 MB.');//Commented by swatih for localization on 13/3/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgAttactmentshouldbenotgreaterthan2MB);//Modified by swatih for localization on 13/7/2020
                }
            }
            else {
               // AlertMessage.info('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');//Commented by swatih for localization on 13/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAttactmentshouldbeinpng_jpeg_pdf_format);//Modified by swatih for localization on 13/7/2020
            }
        }
   
        $scope.addFor1 = function () {
            $scope.addFor1 = 'patient';
        }

        $scope.addFor2 = function () {
            $scope.addFor2 = 'partner';
        }

        $scope.dataURItoBlobEditPatientPhoto = function dataURItoBlobEditPatientPhoto(dataURI) {
            debugger;
            if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
                $scope.strImageEditPatient = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
            if (dataURI.indexOf('application/pdf') > 0)
                $scope.strImageEditPatient = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
            return $scope.strImageEditPatient;
        }

        $scope.dataURItoBlobEditPartnerPhoto = function dataURItoBlobEditPartnerPhoto(dataURI) {
            debugger;
            if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
                $scope.strImageEditPartner = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
            if (dataURI.indexOf('application/pdf') > 0)
                $scope.strImageEditPartner = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
            return $scope.strImageEditPartner;
        }

        $scope.dataURItoBlobEditPatientAttachment = function dataURItoBlobEditPatientAttachment(dataURI) {
            debugger;
            if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
                $scope.strAttachmentEditPatient = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
            if (dataURI.indexOf('application/pdf') > 0)
                $scope.strAttachmentEditPatient = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
            return $scope.strAttachmentEditPatient;
        }

        $scope.dataURItoBlobEditPartnerAttachment = function dataURItoBlobEditPartnerAttachment(dataURI) {
            debugger;
            if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
                $scope.strAttachmentEditPartner = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
            if (dataURI.indexOf('application/pdf') > 0)
                $scope.strAttachmentEditPartner = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
            return $scope.strAttachmentEditPartner;
        }

        $scope.captureImage = function () {
            debugger;
            if ($scope.myImage == null) {
                AlertMessage.error(objResource.msgTitle,objResource.msgPleaseselectfilebothfilesaresame);//Please select file /both files are same :: Modified by swatih for localization 13/7/2020
            }
            else {
                $scope.tempImage = $scope.myImage;
                if ((angular.isString($scope.myCroppedImage) && !$scope.isAttach) || (angular.isString($scope.myImage) && $scope.isAttach)) {                             
                    if ($scope.addForPatient == true) { //if ($scope.addFor == 'patient') {
                        debugger;
                        if (!$scope.isAttach) {
                            if (!$scope.isView) {
                                $scope.patient.strPhoto = $scope.myCroppedImage;
                                $scope.patient.FileName = $scope.filename;                                                      
                            }
                            else {
                                Common.setID($scope.patient.ID);
                                $scope.dataURItoBlobEditPatientPhoto($scope.myCroppedImage);
                                $scope.myCroppedImage = $scope.strImageEditPatient
                                var ResponseData = NewRegistrationService.updatePhoto($scope.patient.ID, $scope.patient.UnitID, $scope.myCroppedImage, $scope.filename, $scope.patient.GenderID);
                                ResponseData.then(function (Response) {
                                    if (Response.data == 1) {
                                        $scope.getPatientByID();
                                        Common.clearID();
                                        //AlertMessage.success('PalashIVF', 'Photo updated successfully.');//Commented by swatih for localization on 13/7/2020
                                       AlertMessage.success(objResource.msgTitle, objResource.msgUpdatephoto);//Modified by swatih for localization 13/7/2020
                                    }
                                    else
                                        //AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization on 13/7/2020
                                        AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 13/7/2020
                                    angular.element(modPhoto).modal('hide');
                                }, function (error) {
                                })
                            }
                        }
                        else {
                            if (!$scope.isView) {
                                $scope.patient.strAttachment = $scope.myImage;
                                $scope.patient.attFileName = $scope.filename;
                            }
                            else {
                                Common.setID($scope.patient.ID);
                                $scope.dataURItoBlobEditPatientAttachment($scope.myImage);
                                $scope.myImage = $scope.strAttachmentEditPatient;

                                var ResponseData = NewRegistrationService.updateAttachment($scope.patient.ID, $scope.patient.UnitID, $scope.myImage, $scope.filename,$scope.patient.GenderID);
                                ResponseData.then(function (Response) {
                                    if (Response.data == 1) {
                                        $scope.getPatientByID();
                                        Common.clearID();
                                        //AlertMessage.success('PalashIVF', 'Attachment updated successfully.');//Commented by swatih for localization on 13/7/2020
                                        AlertMessage.success(objResource.msgTitle, objResource.msgUpdateAttachement); //Modified by swatih for localization on 13/7/2020
                                    }
                                    else
                                        //AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization on 13/7/2020
                                        AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization on 13/7/2020
                                    angular.element(modAttachment).modal('hide');
                                }, function (error) {
                                })
                            }
                        }
                    }

                
                    else if ($scope.addForPartner == true) { //else if ($scope.addFor == 'partner') {
                        if (!$scope.isAttach) {
                            if (!$scope.isView) {
                                $scope.partner.strPhoto = $scope.myCroppedImage;                           
                                $scope.partner.FileName = $scope.filename;
                            }
                            else {                           
                                Common.setID($scope.patient.SpouseInfo.ID);
                                $scope.dataURItoBlobEditPartnerPhoto($scope.myCroppedImage);
                                $scope.myCroppedImage = $scope.strImageEditPartner;

                                var ResponseData = NewRegistrationService.updatePhoto($scope.patient.SpouseInfo.ID, $scope.patient.SpouseInfo.UnitID, $scope.myCroppedImage, $scope.filename, $scope.patient.SpouseInfo.GenderID);
                                ResponseData.then(function (Response) {
                                    if (Response.data == 1) {
                                        Common.setID($scope.patient.ID);
                                        $scope.getPatientByID();
                                        Common.clearID();
                                        //AlertMessage.success('PalashIVF', 'Photo updated successfully.');//Commented by swatih for localization on 13/7/2020                                  
                                        AlertMessage.success(objResource.msgTitle, objResource.msgUpdatephoto); //Modified by swatih for localization on 13/7/2020
                                    }
                                    else
                                        // AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization on 13/7/2020 
                                        AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization on 13/7/2020
                                    angular.element(modPhoto).modal('hide');
                                }, function (error) {
                                })
                            }
                        }
                        else {
                            if (!$scope.isView) {
                                $scope.partner.strAttachment = $scope.myImage;
                                $scope.partner.attFileName = $scope.filename;
                            }
                            else {
                                Common.setID($scope.patient.SpouseInfo.ID);
                                $scope.dataURItoBlobEditPartnerAttachment($scope.myImage);
                                $scope.myImage = $scope.strAttachmentEditPartner;

                                var ResponseData = NewRegistrationService.updateAttachment($scope.patient.SpouseInfo.ID, $scope.patient.SpouseInfo.UnitID, $scope.myImage, $scope.filename, $scope.patient.SpouseInfo.GenderID);
                                ResponseData.then(function (Response) {
                                    if (Response.data == 1) {
                                        Common.setID($scope.patient.ID);
                                        $scope.getPatientByID();
                                        Common.clearID();
                                        //AlertMessage.success('PalashIVF', 'Attachment updated successfully.'); //Commented by swatih for localization on 13/7/2020                                  
                                        AlertMessage.success(objResource.msgTitle, objResource.msgUpdateAttachement);//Modified by swatih for localization on 13/7/2020
                                    }
                                    else
                                        //AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization on 13/7/2020
                                        AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization on 13/7/2020
                                    angular.element(modAttachment).modal('hide');
                                }, function (error) {
                                })
                            }
                        }
                    }


                    //else if ($scope.addForPartner == true) { //else if ($scope.addFor == 'partner') {
                    //    if (!$scope.isAttach) {
                    //        $scope.partner.strPhoto = $scope.myCroppedImage;
                    //        $scope.partner.FileName = $scope.filename;
                    //    }
                    //    else {
                    //        $scope.partner.strAttachment = $scope.myImage;
                    //        $scope.partner.attFileName = $scope.filename;
                    //    }
                    //}

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
                        //AlertMessage.error(objResource.msgTitle, 'Please select File.');//Commented by swatih for localization on 13/7/2020
                        AlertMessage.error(objResource.msgTitle, objResource.msgPleaseselectFile);//Modified by swatih for localization on 13/7/2020
                    }
                    else if ($scope.tempCroppedImage == $scope.tempImage) {
                        //AlertMessage.error(objResource.msgTitle, "Both image are same,please select another image.");//Commented by swatih for localization on 13/7/2020
                        AlertMessage.error(objResource.msgTitle, objResource.msgBothimagearesamepleaseselectanotherimage);//Modified by swatih for localization on 13/7/2020
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

        $scope.closeDeletePhoto = function () {
            debugger;
            angular.element(modPhotoDelete).modal('hide');
        }

        $scope.RemovePhoto = function () {
            debugger;
            //if ($scope.addFor == 'patient') {
            if ($scope.addForPatient == true) {
                if (!$scope.isAttach) {
                    if (!$scope.isView) {
                        $scope.patient.strPhoto = $scope.myCroppedImage;
                        $scope.patient.FileName = $scope.filename;
                        //AlertMessage.success('PalashIVF', 'Photo deleted successfully.');
                    }
                        //}
                    else {
                        Common.setID($scope.patient.ID);
                        var ResponseData = NewRegistrationService.deletePhoto($scope.patient.ID, $scope.patient.UnitID);   //$scope.myCroppedImage, $scope.filename
                        ResponseData.then(function (Response) {
                            if (Response.data == 1) {
                                $scope.getPatientByID();
                                Common.clearID();
                                //AlertMessage.success('PalashIVF', 'Photo deleted successfully.');//Commented by swatih for localization 13/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgDeletephoto);//Modified by swatih for localization on 13/7/2020
                                AlertMessage.success();
                            }
                            else
                                //AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization 13/7/2020
                                AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 13/7/2020
                            angular.element(modPhoto).modal('hide');
                        }, function (error) {
                        })
                    }
                }

            }
                //else if ($scope.addFor == 'partner') {
            else if ($scope.addForPartner == true) {
                if (!$scope.isAttach) {
                    if (!$scope.isView) {
                        $scope.partner.strPhoto = $scope.myCroppedImage;
                        $scope.partner.FileName = $scope.filename;
                        // AlertMessage.success('PalashIVF', 'Photo deleted successfully.');
                    }

                    else {
                        Common.setID($scope.patient.SpouseInfo.ID);
                        var ResponseData = NewRegistrationService.deletePhoto($scope.patient.SpouseInfo.ID, $scope.patient.SpouseInfo.UnitID); //, $scope.myCroppedImage, $scope.filename
                        ResponseData.then(function (Response) {
                            if (Response.data == 1) {
                                $scope.getPatientByID();
                                Common.clearID();
                                //AlertMessage.success('PalashIVF', 'Photo deleted successfully.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgDeletephoto);//Modified by swatih for localization on 13/7/2020
                            }
                            else
                                //AlertMessage.error('PalashIVF', 'Error occured.');//Commented by swatih for localization on 13/7/2020
                                AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization on 13/7/2020
                            angular.element(modPhoto).modal('hide');
                        }, function (error) {
                        })
                    }
                }
            }            
            $scope.addFor = null;
            $scope.myCroppedImage = null;
            $scope.myImage = null;
            $scope.filename = null;
            angular.element(modPhotoDelete).modal('hide');
        }
    //Barcode Generation code Added by Bhagyshri Start

        /*--------------------------------------------------------------Bar Code Start-------------------------------------------------------------*/

        $scope.CreateBarcode = function (item) {
            debugger;
            $scope.BarCodeDoctorID = 0;
            $scope.SelectedPatientForBarcode = item;
           $scope.getDoctorListBarcode();
            //var MRNo = $scope.patientLst.MRNo;          
            //var PartnerMRN = $scope.patientLst.PartnerMRN;       
            //var PatientName = $scope.patientLst.PatientName;
            //var PartnerName = $scope.patientLst.PartnerName;
            //var PatientCountryCode = $scope.patientLst.MobileCountryCode;
            //var PatientMobileNo = $scope.patientLst.MobileNo;
            //var PatientDoctor = $scope.patientLst.PatientDoctor
             debugger;
            //patientList.MRNo;            
            //$scope.patientList();
        }
        //$scope.viewPatient = function (id, UnitID) {
        //    debugger;
        //    Common.clearID();
        //    Common.setID(id);
        //    Common.clearUnitID();
        //    Common.setUnitID(UnitID);
        //    $location.path('/PatientView/');
        //}
        $scope.printToCart = function (PatientprintSectionId) {
        var innerContents = document.getElementById(PatientprintSectionId).innerHTML;
        var popupWinindow = window.open('','_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
      }
        $scope.getDoctorListBarcode = function getDoctorListBarcode () {
            debugger;
            var ResponseData = Common.GetDoctorList();
            ResponseData.then(function (Response) {
                        //if (!$scope.isPatientSearch)
                          //Response.data.All.splice(0, 0, { ID: 0, Description: "Select" });
                        //else Response.data.splice(0, 0, { ID: 0, Description: "Referal Doctor" });
               // ResponseData.data.splice(0, 0, { ID: 0, Description: "Select" });
                $scope.DocListForBarCode = Response.data.All;
                $scope.BarCodeDoctorID = $scope.BarCodeDoctorID;
                $scope.BarCodeDoctorNameID = 0;
                
                $scope.BarCodeDoctorName = ResponseData;            
                //var DoctorForBarcode = $filter('filter')($scope.getDoctorListBarcode, { BarCodeDoctorID: $scope.BarCodeDoctorNameID }, true)[0].text            
                //var chkDoc = $filter('filter')($scope.DocList, { attachfilename: $scope.DocumentList.AttachFile.name }, true)[0].text
                //var con = $filter('filter')(obj.CountryList, { CountryID: obj.MobileCountryCode }, true);
                //$scope.country = con[0].CountryCode;
            },
            function (error) {
             });           
        }

        $scope.DisplayBarcodeOnChange = function DisplayBarcodeOnChange(item) {
            debugger;
            //var PartnerMRN = $scope.patientLst.PartnerMRN;
            //$scope.BarCodeDoctorID = item.description;
            for (var i = 0; i < $scope.DocListForBarCode.length; i++) {
                if ($scope.DocListForBarCode[i].ID == $scope.BarCodeDoctorID) {
                    $scope.BarCodeDoctorIDdesc = $scope.DocListForBarCode[i].Description;
                }
            }
        }
    /*----------------------------------------------------------Bar Code End-----------------------------------------------------------------*/   
    //Barcode Generation code Added by Bhagyshri End

    //Fill dropdowns for Eye Color, Hair Color, Skin Color and Built
        $scope.FillDropDowns = function()
        {
            $scope.FillEyeColorList();
        }

        $scope.FillEyeColorList = function () {
            var ResponseData = Common.getMasterList('M_EyeColor', 'IVFECOLORID', 'Description');
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: 'Select Eye Color' });
                $scope.EyeColorList = Response.data;
                $scope.frmPersonalCharacteristics.EyeColorID = 0;
                $scope.FillHairColorList();
            }, function (error) {
                $scope.Error = error;
            });
            
        }
        
        $scope.FillSkinColorList = function () {
            
            var ResponseData = Common.getMasterList('M_SkinColor', 'IVFSCOLORID', 'Description');
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: 'Select Skin Color' });
                $scope.SkinColorList = Response.data;
                $scope.frmPersonalCharacteristics.SkinColorID = 0;
                $scope.FillBuiltList();
            }, function (error) {
                $scope.Error = error;
            });
            
        }

        $scope.FillHairColorList = function () {
            var ResponseData = Common.getMasterList('M_HairColor', 'IVFHCOLORID', 'Description');
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: 'Select Hair Color' });
                $scope.HairColorList = Response.data;
                $scope.frmPersonalCharacteristics.HairColorID = 0;
                $scope.FillSkinColorList();
            }, function (error) {
                $scope.Error = error;
            });
            

        }

        $scope.FillBuiltList = function () {
            var ResponseData = Common.getMasterList('M_BuiltMaster', 'ID', 'Description');
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: 'Select Built' });
                $scope.BuiltList = Response.data;
                $scope.frmPersonalCharacteristics.BuiltID = 0;
                $scope.GetPersonalCharacteristics();
               
            }, function (error) {
                $scope.Error = error;
            });
        }


        $scope.ClearPersonalCharacteristicsData = function () {
            debugger;
            $scope.frmPersonalCharacteristics.ID = 0;
            $scope.frmPersonalCharacteristics.BuiltID=null;
            $scope.frmPersonalCharacteristics.SkinColorID = null;
            $scope.frmPersonalCharacteristics.HairColorID = null;
            $scope.frmPersonalCharacteristics.EyeColorID = null;
            $scope.frmPersonalCharacteristics.Remarks = null;
            $scope.showMessage = false;
        }
       
       $scope.GetPersonalCharacteristics = function()
       {
          
           usSpinnerService.spin('GridSpinner');
           var data = {
               PatientID :Common.getID(),
               PatientUnitID:Common.getUnitID(),
           }
           var ResponseData = NewRegistrationService.GetPersonalCharacteristics(data);
           ResponseData.then(function (Response) {
               usSpinnerService.stop('GridSpinner');
               if (Response.data != null) {
                   SetPersonalCharacteristicsData(Response.data)
               }
           }, function (error) {
               usSpinnerService.stop('GridSpinner');
               $scope.Error = error;
           });
       }

      
       
        $scope.GetPatientAdditional = function()
       {
          
           usSpinnerService.spin('GridSpinner');
           var data = {
               PatientID :Common.getID(),
               PatientUnitID:Common.getUnitID(),
           }
           var ResponseData = NewRegistrationService.GetPatientAdditional(data);
           ResponseData.then(function (Response) {
               usSpinnerService.stop('GridSpinner');
               if (Response.data != null) {
                   SetPatientAdditional(Response.data)
               }
           }, function (error) {
               usSpinnerService.stop('GridSpinner');
               $scope.Error = error;
           });
       }
      
        function SetPatientAdditional(patientData1)
       {
          $scope.selectPatient.PatientID=  Common.getID();
           $scope.selectPatient.PatientUnitID = Common.getUnitID();
       }

       function SetPersonalCharacteristicsData(patientData)
       {
           $scope.frmPersonalCharacteristics.ID = patientData.ID;
           $scope.frmPersonalCharacteristics.BuiltID = patientData.BuiltID;
           $scope.frmPersonalCharacteristics.SkinColorID = patientData.SkinColorID;
           $scope.frmPersonalCharacteristics.HairColorID = patientData.HairColorID;
           $scope.frmPersonalCharacteristics.EyeColorID = patientData.EyeColorID;
           $scope.frmPersonalCharacteristics.Remarks = patientData.Remarks;
       }
       
       $scope.SavePersonalCharacteristics = function()
       {
           debugger;
           usSpinnerService.spin('GridSpinner');
           if ($scope.frmPersonalCharacteristics.BuiltID == 0 && 
           $scope.frmPersonalCharacteristics.SkinColorID == 0 && 
           $scope.frmPersonalCharacteristics.HairColorID == 0 &&
           $scope.frmPersonalCharacteristics.EyeColorID == 0 &&
           !$scope.frmPersonalCharacteristics.Remarks)
           {
               $scope.showMessage = true;
               AlertMessage.warning("Please select atleast one value from personal characteristics or enter remarks");
               return;
           }
           var data = {
               Id: $scope.frmPersonalCharacteristics.ID,
               PatientID: Common.getID(),
               PatientUnitID: Common.getUnitID(),
               BuiltID: $scope.frmPersonalCharacteristics.BuiltID,
               SkinColorID: $scope.frmPersonalCharacteristics.SkinColorID,
               HairColorID: $scope.frmPersonalCharacteristics.HairColorID,
               EyeColorID: $scope.frmPersonalCharacteristics.EyeColorID,
               Remarks: $scope.frmPersonalCharacteristics.Remarks
           }
           var ResponseData = NewRegistrationService.SavePersonalCharacteristics(data);
           ResponseData.then(function (Response) {
               usSpinnerService.stop('GridSpinner');
               if (Response.data != null) {
                   if (Response.data == 1) {
                       AlertMessage.success("Personal Characteristics Saved Successfully.");
                       $scope.CancelPatientPersonalCharacteristicsView();
                       srvCommon.aciveTab('liMPatient');
                       $location.path('/PatientList/');
                   }
                   else
                   {
                       AlertMessage.error("Error Occured While Saving Personal Characteristics");
                       return;
                   }
               }
           }, function (error) {
               usSpinnerService.stop('GridSpinner');
               $scope.Error = error;
           });
       }

    
   
       
 $scope.PageInit = function () {
     
        debugger;
        
         
        //var resp = NewRegistrationService.GetSubtemplatesList(FormID)
        //resp.then(function (resp) {

        //    debugger;
        //    if (resp.data.length != 0) {                                              //added by sujata for ultra obs
        //        $scope.IsSubTemplate = true;
        //        $scope.SubTemplateList = resp.data;

        //        $scope.getPatientByID();

        //        if ($scope.SubTemplateList.length > 0) {
        //            FormID = 6;
        //        }
        //    }
        //    else {
                $scope.getPatientByID();
        //    }

        //}, function (err) {
        //    debugger;
        //})
    }
 $scope.PageInit();

 //$scope.SetFormID = function SetFormID(formid) {
 //       debugger;
 //       FormID = formid;
 //       angular.forEach($scope.$patient.PatientAdditionalInformationTemplate, function (item) {
 //           if (item.ID !== 0 && item.ID == formid) {
 //               $scope.SelectedTemplate = item.Description
 //               $scope.getPatientByID();
 //           }

 //       })
       

 //       $scope.getPatientByID();

 //   }
$scope.updated=function updated(modelValue, form)
    {
        if (angular.isDefined(form.key))
        {
            if(form.key[0]==="c10401c" || form.key[0] ==="c10402c" || form.key[0]==="c10403c")
            {
              
                if( angular.isDefined($scope.model['c10401c']) && angular.isDefined($scope.model['c10402c']) && angular.isDefined($scope.model['c10403c']))
                {
               
                    var calulatedValue = $scope.model['c10401c'] * $scope.model['c10402c'] * $scope.model['c10403c'] * 0.523;
                    $scope.model['c10404c'] = calulatedValue.toFixed(2);
                }
                //Shall Auto calculate Approx.Volume in CC as  Length*Height*Width*0.523 
            }
            if (form.key[0] === "c10601c" || form.key[0] === "c10602c" || form.key[0] === "c10603c") {
                
                if (angular.isDefined($scope.model['c10601c']) && angular.isDefined($scope.model['c10602c']) && angular.isDefined($scope.model['c10603c'])) {
                    
                    var temp = $scope.model['c10601c'] * $scope.model['c10602c'] * $scope.model['c10603c'] * 0.523;
                    $scope.model['c10604c'] = temp.toFixed(2);
                }
                //Shall Auto calculate Approx.Volume in CC as  Length*Height*Width*0.523 
            }
            
        }
       

    }

 $scope.showJson = function () {
        $scope.IsFormShow = 1;//rohini
        $scope.IsSave = 1;//rohini;
        $scope.data = $scope.data;
        $scope.form = [];
        if ($scope.schema == null) {
            $scope.schema = {
                "type": "object",
                "title": "",
                "properties": {},
                "required": [],
                "format": "object"
            };
        }

        $scope.data[0].nodes.forEach(function (node) {
            var insection = false;
            var sindex = 0;
            $scope.schema.title = node.title;
            var fieldset;
            if (!insection)
                fieldset = { type: 'fieldset', title: node.title, items: [] };
            //else
            //    $scope.form[sindex].items = [];
            var fileupload = null;
            node.nodes.forEach(function (innernode) {
                if (innernode.name) {
                    var propname = innernode.name.toLowerCase();
                    $scope.schema.properties[propname] = { title: '', type: '', pattern: '', description: '' };
                    $scope.schema.properties[propname].title = innernode.title;
                    if (innernode.fieldAttr)
                        $scope.schema.properties[propname].defaulval = innernode.fieldAttr.dtext;
                    if (innernode.isReq)
                        $scope.schema.required.push(propname);

                    if (innernode.fieldType && innernode.fieldType === 'Text') {
                        $scope.schema.properties[propname].type = 'string';
                        $scope.model[propname] = innernode.fieldAttr.dtext;
                        if (innernode.fieldAttr.isSingle === 1) {
                            if (innernode.row == 1) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-12", "condition": innernode.condition });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                            }
                            else {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                            }
                        }
                        else {
                            if (innernode.row == 1) {
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-12", "condition": innernode.condition });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-6", "condition": innernode.condition });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-4", "condition": innernode.condition });
                            }
                            else {
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-3", "condition": innernode.condition });
                            }
                        }
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Boolean') {
                        $scope.schema.properties[propname].type = 'boolean'
                        if (innernode.fieldAttr.isRadio == 0) {
                            if (innernode.row == 1) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-12", "condition": innernode.condition });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                            }
                            else if (innernode.row == 4) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                            }
                        } else {
                            if (innernode.row == 1) {
                                fieldset.items.push({ 'key': propname, "condition": innernode.condition, 'type': 'radiobuttons', 'titleMap': [{ 'value': true, name: 'Yes' }, { 'value': false, name: 'No' }] });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ 'key': propname, "condition": innernode.condition, 'htmlClass': 'col-xs-6', 'type': 'radiobuttons', 'titleMap': [{ 'value': true, name: 'Yes' }, { 'value': false, name: 'No' }] });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ 'key': propname, "condition": innernode.condition, 'htmlClass': 'col-xs-4', 'type': 'radiobuttons', 'titleMap': [{ 'value': true, name: 'Yes' }, { 'value': false, name: 'No' }] });
                            }
                            else if (innernode.row == 4) {
                                fieldset.items.push({ 'key': propname, "condition": innernode.condition, 'htmlClass': 'col-xs-3', 'type': 'radiobuttons', 'titleMap': [{ 'value': true, name: 'Yes' }, { 'value': false, name: 'No' }] });
                            }

                        }
                        if (innernode.fieldAttr.dbool == 1)
                            $scope.model[propname] = true;
                        else
                            $scope.model[propname] = false;
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Decimal') {
                        $scope.schema.properties[propname].type = 'number';
                        $scope.schema.properties[propname].description = innernode.fieldAttr.unit;
                        $scope.schema.properties[propname].minimum = innernode.fieldAttr.mind;
                        $scope.schema.properties[propname].maximum = innernode.fieldAttr.maxd;
                        if (innernode.row == 1) {
                            fieldset.items.push({ 'key': propname, "htmlClass": "col-xs-12", onChange: "updated(modelValue,form)", "condition": innernode.condition });
                        }
                        else if (innernode.row == 2) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", onChange: "updated(modelValue,form)", "condition": innernode.condition });
                        }
                        else if (innernode.row == 3) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", onChange: "updated(modelValue,form)", "condition": innernode.condition });
                        }
                        else if (innernode.row == 4) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", onChange: "updated(modelValue,form)", "condition": innernode.condition });
                        }
                        $scope.model[propname] = Number(innernode.fieldAttr.ddecimal);

                    }
                    else if (innernode.fieldType && innernode.fieldType === 'File Upload') {

                        $scope.schema.properties[propname] = fileuploadimg;
                        $scope.schema.properties[propname].title = innernode.title;
                        fieldset.items.push({ 'key': propname, 'type': 'nwpFileUpload', 'endpoint': 'http://localhost:5000/api/DesignEMRFileUploadAPI/Add', 'i18n': fileuploadtags, "condition": innernode.condition });
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Date') {
                        $scope.schema.properties[propname].type = 'string'
                        $scope.schema.properties[propname].format = 'datepicker'
                        if (innernode.row == 1) {
                            fieldset.items.push({ "key": propname, "condition": innernode.condition });
                        }
                        else if (innernode.row == 2) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                        }
                        else if (innernode.row == 3) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                        }
                        else if (innernode.row == 4) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                        }
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Time Picker') {
                        $scope.schema.properties[propname].type = 'string'
                        $scope.schema.properties[propname].format = 'timepicker'
                        if (innernode.row == 1) {
                            fieldset.items.push({ "key": propname, "condition": innernode.condition });
                        }
                        else if (innernode.row == 2) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                        }
                        else if (innernode.row == 3) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                        }
                        else if (innernode.row == 4) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                        }
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Header') {
                        var htitle = "<h3>" + innernode.title + "</h3><hr/>"
                        fieldset.items.push({ "type": "help", "helpvalue": htitle, "condition": innernode.condition });
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'List') {
                        if (innernode.fieldAttr.sfields) {
                            var slist = innernode.fieldAttr.sfields.split('\n');
                            if (innernode.fieldAttr.ismulti === '0') {
                                $scope.schema.properties[propname].type = 'string';
                                $scope.schema.properties[propname].enum = slist;
                                if (innernode.row == 1) {
                                    fieldset.items.push({ "key": propname, "htmlClass": "col-xs-12", "condition": innernode.condition });
                                }
                                else if (innernode.row == 2) {
                                    fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                                }
                                else if (innernode.row == 3) {
                                    fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                                }
                                else if (innernode.row == 4) {
                                    fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                                }
                            }
                            else {

                                $scope.schema.properties[propname].type = 'array';
                                $scope.schema.properties[propname].items = { type: "string" };
                                var ltitleMap = [];
                                slist.forEach(function (item) {
                                    ltitleMap.push({ value: item, name: item });
                                });
                                if (innernode.row == 1) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true } });
                                }
                                else if (innernode.row == 2) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true }, 'htmlClass': 'col-xs-6' });
                                }
                                else if (innernode.row == 3) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true }, 'htmlClass': 'col-xs-4' });
                                }
                                else if (innernode.row == 4) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true }, 'htmlClass': 'col-xs-3' });
                                }
                            }
                            $scope.model[propname] = innernode.fieldAttr.sdfield;
                        }
                    }
                }
            })
            $scope.form.push(fieldset);
        });
        //$scope.form.push({
        //    type: "submit",
        //    title: "Save"
        //});//to display forms Save button         
    }; 


 

     


     $scope.RedirectToSelf = function (ID, UnitID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = NewRegistrationService.GetTemplateData(ID, UnitID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {

                //tempplate set
                $scope.DesignEMRVO = Response.data;



               // if ($scope.DesignEMRVO.VisitID == Response.data.VisitID && $scope.DesignEMRVO.VisitUnitID == Response.data.VisitUnitID) {
                if ($scope.DesignEMRVO.VisitID == selectPatient.VisitID && $scope.DesignEMRVO.VisitUnitID == selectPatient.VisitUnitID) {

                $scope.IsVisitMarked = false;
                }
                else {
                    $scope.IsVisitMarked = true;
                }

                //FOR FIRST time added template which do not have scema and editor data
                if (Response.data.EditorSchema != null)
                    $scope.data = JSON.parse(Response.data.EditorSchema);
                else {

                    $scope.data = [{
                        'id': 1,
                        'title': $scope.DesignEMRVO.TempName,
                        'description': '',
                        'appliesTo': $scope.DesignEMRVO.GenderID,
                        'templateType': $scope.DesignEMRVO.FormID,
                        'depth': 0,
                        'nodes': [
                        {
                            'id': 11,
                            'title': 'Section1',
                            'depth': 1,
                            'nodes': [
                            ]
                        },
                        ]
                    }];
                }
                $scope.schema = JSON.parse(Response.data.SchemaDecription);
                $scope.form = JSON.parse(Response.data.FormDecription);
                if (Response.data.ModelDescription != null)
                    $scope.model = JSON.parse(Response.data.ModelDescription);
                //Added by Nayan Kamble START		              
                if ($scope.DesignEMRVO.TID > 0) {
                    $scope.btnSaveUpdatetext = 'Update';
                }
                else {
                $scope.btnSaveUpdatetext = 'Save';
}
                //END
              
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
     }
  


 
    



//main end
 });


 
     

PIVF.directive('dropDisable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var handler = function (event) {
                event.preventDefault();
                return false;
            }
            element.on('dragenter', handler);
            element.on('dragover', handler);
            element.on('drop', handler);
        }
    };
});
 PIVF.controller('modelInfo', function ($scope, $uibModalInstance, ResponseData1, $timeout) {

    $scope.TemplateList = ResponseData1;
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.SelectPatient = function (Item) {
        $timeout(function () {
            $uibModalInstance.close(Item);
        }, 1000);
    }
});


