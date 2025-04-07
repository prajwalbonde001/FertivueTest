'use strict';

angular.module('PIVF').controller('NewLabEntryCtr', function ($rootScope, $scope, $location, AlertMessage, Common, srvCommon, $uibModal, swalMessages, $filter, usSpinnerService, localStorageService, $interval, $route, NewLabEnterySrv) {

    debugger;
    var objResource = {};
   
    $rootScope.FormName = 'NewLabEntery';
    $rootScope.hideWhenQueue = true;
    $scope.NewLab.IsLab = false
    $scope.selectedPatientFromPatient = '';
    $scope.NewLab.ReportDate;
    $scope.NewLab.SampleCollectionDate;
    $scope.NewLab.DoneBy = 0;
    $scope.NewLab.AuthorizedBy = 0;
    $scope.NewLab.SampleCollectionLocation = 0;
    $scope.NewLab.SampleNo;
    $scope.btnSaveUpdate = "save";
    //selected patient set 
    //Used for localization & globalization
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.open1 = function () {
        debugger;
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function () {
        debugger;
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.dateOptions2 = {

        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date(),//.setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions = {

        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date(),//.setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.LoadData = function LoadData() {
        debugger;
        //$scope.GetEmbryologyDoctorsList();
        if ($rootScope.IsFromLabList == true) {
            $scope.btnSaveUpdate = "Update";
            $scope.GetEmbryologyDoctorsList();
            $rootScope.LabTestdata;
           // $scope.PathoTestParamList = $rootScope.LabTestdata;
            // $scope.NewLab.PathoOrderDetailsList = $rootScope.LabTestdata;
            $scope.PathoTestParamList = [];
            $scope.NewLab.PathoOrderDetailsList = [];
            $scope.PathoTestParamList.push($rootScope.LabTestdata);
            $scope.NewLab.PathoOrderDetailsList.push($rootScope.LabTestdata);
            //$scope.PathoOrderDetailsList.push($rootScope.LabTestdata);

            $scope.PatientList;
            $scope.item = $scope.PatientList.find(item => item.MRNo === $rootScope.lablistdata.MRNo);

            $scope.NewLab.PatientName = $scope.item.PatientName;
            $scope.NewLab.Mrno = $scope.item.MRNo;     
            $scope.NewLab.Gender=$scope.item.Gender;
            $scope.NewLab.MobilecountryCode = $scope.item.MobCountryCodeID;
            $scope.NewLab.MobileNo = $scope.item.ContactNo1;
            $scope.NewLab.Age = $scope.item.Age;
            $scope.NewLab.SampleNo = $rootScope.lablistdata.SampleNo;
            $scope.NewLab.SampleCollectionDate = $rootScope.lablistdata.SampleCollectedDateTime;
            $scope.NewLab.SampleCollectionLocation = $rootScope.lablistdata.CollectionID;

            $scope.NewLab.AuthorizedBy = $rootScope.LabTestdata.AuthorizedBy;
            $scope.NewLab.DoneBy = $rootScope.LabTestdata.DoneBy;

            //$scope.PathoTestParamList.TestName = $rootScope.LabTestdata.TestName;
            //$scope.PathoTestParamList.Parameter = $rootScope.LabTestdata.Parameter;
            //$scope.PathoTestParamList.ResulatValue == $rootScope.LabTestdata.ResulatValue;
            //$scope.PathoTestParamList.VaryingReferences = $rootScope.LabTestdata.VaryingReferences;
           

            //$scope.PathoTestParamList.push ($rootScope.LabTestdata.TestName);
            //$scope.PathoTestParamList.push ($rootScope.LabTestdata.Parameter);
            //$scope.PathoTestParamList.push ($rootScope.LabTestdata.ResulatValue);
            //$scope.PathoTestParamList.push ($rootScope.LabTestdata.VaryingReferences);
            //$rootScope.IsFromLabList =false;

        }
      
        $scope.NewLab.ReportDate = new Date();
        $scope.NewLab.SampleCollectionDate = new Date();
        $scope.GetEmbryologyDoctorsList();
        $scope.GetSampleCollectionLocList();
        $scope.GetServiceList();
        $scope.getpatientlist();
    }


    $scope.PatientCategory = 0;
    $scope.getpatientlist = function getpatientlist(PatientCategory) {
        debugger;
        var UserInfo = localStorageService.get("UserInfo");
        debugger;
        var response = Common.getpatientlist(UserInfo.UnitID, PatientCategory); //added sujata cross clinic        
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.PatientList = resp.data;
            }
        });
    }


    //Binding selected patient on searching
    $scope.SelectedLabPatient = function SelectedLabPatient(model) {
        debugger;

        if (model) {
            $scope.SelectedPatient = angular.copy(model);   //selected patient details
            sessionStorage.setItem("selectedPatient", JSON.stringify($scope.SelectedPatient));
        }
        else {
            $scope.SelectedPatient = JSON.parse(sessionStorage.getItem("selectedPatient"));
        }
        //$scope.NevigateVisitPopUP(model.ID, model.UnitID);
        var response = Common.GetPatientListforLab();
        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $scope.PatientList1 = resp.data;
                for (var i = 0; i < $scope.PatientList1.length; i++) {
                    if ($scope.PatientList1[i].ID == model.ID) {
                        $scope.NewLab.PatientID = model.ID;
                        $scope.NewLab.PatientUnitID = model.UnitID;
                        $scope.NewLab.Mrno = $scope.PatientList1[i].MRNo;
                        $scope.NewLab.PatientName = $scope.PatientList1[i].PatientName;
                        $scope.NewLab.Gender = $scope.PatientList1[i].Gender;
                        $scope.NewLab.Age = $scope.PatientList1[i].Age;
                        $scope.NewLab.MobilecountryCode = $scope.PatientList1[i].MobCountryCode;
                        $scope.NewLab.MobileNo = $scope.PatientList1[i].MobileNo;
                        $scope.NewLab.Email = $scope.PatientList1[i].Email;
                        $scope.NewLab.GenderID = $scope.PatientList1[i].GenderID;
                        $scope.NewLab.IsLab = true;

                        if ($scope.NewLab.IsLab == true) {
                            $scope.disableLab = true;
                        }
                        else {
                            $scope.disableLab = false;

                        }
                    }


                }
            }
        });

    }

    $scope.GetPathoTestParameterList = function GetPathoTestParameterList() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = NewLabEnterySrv.GetPathoTestParameterList($scope.NewLab.PatientID, $scope.NewLab.PatientUnitID, $scope.ServiceID, $scope.TestID, $scope.CategoryID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                //$scope.PathoTestParamList = Response.data;
                //$scope.PathoTestParamList.push(Response.data);

                //angular.forEach(Response.data, function (itemData)
                //{
                //   $scope.PathoTestParamList.push(itemData);
                //})

               

                $scope.GridList = [];
                $scope.GridList = Response.data;
                debugger;

                if ($scope.PathoTestParamList == undefined) {
                    $scope.PathoTestParamList = [];
                }


                for (var i = 0; i < $scope.GridList.length; i++)
                {
                    if ($scope.GridList[i].IsNumeric==true)
                    {
                        $scope.GridList[i].IsNumeric = false;
                    }
                    else {
                        $scope.GridList[i].IsNumeric = true;
                    }
                    $scope.PathoTestParamList.push($scope.GridList[i]);
                }
                    debugger;
                    //$scope.PathoOrderDetailsList = $scope.PathoTestParamList;

                    $scope.PathoOrderdetails = [];
                    $scope.PathoOrderdetails = $scope.PathoTestParamList;

                    angular.forEach($scope.PathoOrderdetails, function (item) {
                        debugger;
                        $scope.PathoOrderNewList = [];
                        $scope.PathoOrderNewList.push(item);
                        for (var i = 0; i < $scope.PathoOrderNewList.length; i++) {
                            if ($scope.PathoOrderNewList[i].TestID == item.TestID && $scope.PathoOrderNewList[i].ServiceID == item.ServiceID) {
                                $scope.PathoOrderDetailsList = [];
                                $scope.PathoOrderDetailsList.push(item);
                                break;
                            }
                            break;
                        }

                    })
                //}
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, "Something went wrong.");
            $scope.Error = error;
        });
    }

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


    $scope.GetEmbryologyDoctorsList = function FillCanList() {
        debugger;
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            ////  
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data;

        }, function (error) {
        });
    };

    $scope.GetSampleCollectionLocList = function GetSampleCollectionLocList() {
        var ResponseData = Common.GetSampleCollectionLocList();
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SampleLocList = Response.data;

        }, function (error) {
        });
    };

    $scope.GetServiceList = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var Promise = Common.GetServiceTestList();
        Promise.then(function (resp) {
            //$scope.GetAllResponse();
            $scope.ServiceList = resp.data;
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }



    $scope.SelectedService = function (selSer) {
        debugger;
        $scope.ServiceID = selSer.ServiceID;
        $scope.TestID = selSer.TestID;
        $scope.CategoryID = $scope.NewLab.GenderID; //selSer.CategoryID;
        $scope.TestName = selSer.TestName;
        $scope.GetPathoTestParameterList();
    }


    $scope.SaveLabEntery = function SaveLabEntery(NewLab) {
        debugger;

        //if ($scope.btnSaveUpdate = "Update")+


        
        
        //}
        //else
        //{

            $scope.NewLab.PathoTestListDetails = $scope.PathoTestParamList;
            $scope.NewLab.PathoOrderDetailsList = $scope.PathoOrderDetailsList;


            for (var i = 0; i < $scope.NewLab.PathoOrderDetailsList.length; i++) {
                $scope.NewLab.PathoOrderDetailsList[i].ApproveByUserID = $scope.NewLab.DoneBy;
                $scope.NewLab.PathoOrderDetailsList[i].ResultEntryUserID = $scope.NewLab.AuthorizedBy;
                $scope.NewLab.PathoOrderDetailsList[i].SampleCollectionLocationID = $scope.NewLab.SampleCollectionLocation;
                $scope.NewLab.PathoOrderDetailsList[i].ResultEntryDate = $scope.NewLab.ReportDate;
                $scope.NewLab.PathoOrderDetailsList[i].SampleCollectedDateTime = $scope.NewLab.SampleCollectionDate;
                $scope.NewLab.PathoOrderDetailsList[i].SampleNo = $scope.NewLab.SampleNo;
                //$scope.NewLab.PathoOrderDetailsList[i].ApproveByUserID = $scope.NewLab.DoneBy;

            }


            angular.forEach($scope.NewLab.PathoOrderDetailsList, function (item) {
                $scope.NewLab.PathoTestList = [];
                $scope.NewLab.PathoTestList.push(item);
            });
            var ResponseData = NewLabEnterySrv.SaveLabEntery(NewLab);
            ResponseData.then(function (resp) {
                debugger;
                if (resp.data == 1) {
                    AlertMessage.success(objResource.msgTitle, "Lab Details Saved Successfully");
                    $location.path("/LabTestList");
                }

                if (resp.data == 2) {
                    AlertMessage.success(objResource.msgTitle, "Lab Details update Successfully");
                    $location.path("/LabTestList");
                }
                usSpinnerService.stop('GridSpinner');
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.error(objResource.msgTitle, "Something went wrong.");
            });
        //}
    };

    //ParameterID
    $scope.GetTestList = function GetTestList(item) {
        debugger;
        $scope.ParameterID = item.ParameterID;
        var ResponseData = NewLabEnterySrv.HelpValuesesEntryList($scope.ParameterID);
        ResponseData.then(function (resp) {
            debugger;
            if (resp.data.length > 0) {
                $scope.TestEntryValueTest = resp.data;
                //AlertMessage.success(objResource.msgTitle, "Lab Details Saved Successfully");
            }
        });

    }

    $scope.Selecttest = function Selecttest(item) {
        debugger;
        for (var s = 0; s < $scope.TestEntryValueTest.length; s++) {
            if (//$scope.TestEntryValueTest[s].TestID == $scope.PathoTestParamList[i].TestID && 
                     item.IsDefault == true && $scope.TestEntryValueTest[s].HelpValue == item.HelpValue)
            {
                $scope.TestEntryValueTest[s].IsDefault = item.IsDefault;
            }
            else
            {
                $scope.TestEntryValueTest[s].IsDefault = false;
            }
        }

        //if (i.IsDefault = true) {
        //    $scope.IsDefault = true;
        //}
        //else {

        //    i.IsDefault = false;
           // AlertMessage.info('Palash IVF', 'select parameter..');//Commented by swatih for localization 15/7/2020
            return;
        //}
    }


    $scope.SaveTestParametervalues = function SaveTestParametervalues() {
        debugger;
        var chkTemp = 0;
        for (var s = 0; s < $scope.TestEntryValueTest.length; s++) {
            if ($scope.TestEntryValueTest[s].IsDefault == true) {
                for (var i = 0; i < $scope.PathoTestParamList.length; i++) {
                    if (//$scope.TestEntryValueTest[s].TestID == $scope.PathoTestParamList[i].TestID &&
                        $scope.TestEntryValueTest[s].ParameterID == $scope.PathoTestParamList[i].ParameterID) {
                        //$scope.GetPathoTestParameterList();
                        $scope.PathoTestParamList[i].HelpValue = $scope.TestEntryValueTest[s].HelpValue;
                        //$scope.PathoTestParamList[i].status = $scope.TestEntryValueTest[s].IsDefault;
                        $scope.PathoTestParamList[i].ResultValue = $scope.TestEntryValueTest[s].HelpValue;
                       
                        $scope.IsDefault = true;    //Added by Nayan Kamble
                        //angular.element(modTest).modal('hide');
                    }  // inner if
                } // inner for
                chkTemp = 1;
                angular.element(modTest).modal('hide');
               
                break;
                //angular.element(modTest).modal('hide');
                
            } //outer if
            //break;
        } //outer for
        

        if (chkTemp == 0) {
            AlertMessage.info('Palash IVF', 'Select test parameter.');//Commented by swatih for localization 15/7/2020

        }
    }

    $scope.ValueDetails = function ValueDetails() {
        debugger;
        angular.element(modTest).modal('hide');
        $location.path("/NewLabEntery");
    }

    $scope.CancelNewLab = function CancelNewLab() {
        $location.path("/Queue");
    }



});