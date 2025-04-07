'use strict';
// Commented & modified on 27thJul2021 to allow Tab wise access rights to user in ART Cycle
//PIVF.controller('LayOutController', ['$scope', 'API', 'PatientInfo', 'authService', 'srvCommon', '$window', '$routeParams', '$location', '$rootScope', 'LogInServ', 'Common', '$uibModal', '$route', 'localStorageService', 'AlertMessage', 'usSpinnerService', '$interval', '$q', function ($scope, API, PatientInfo, authService, srvCommon, $window, $routeParams, $location, $rootScope, LogInServ, Common, $uibModal, $route, localStorageService, AlertMessage, usSpinnerService, $interval, $q) {
PIVF.controller('LayOutController', ['$scope', 'API', 'PatientInfo', 'authService', 'srvCommon', '$window', '$routeParams', '$location', '$rootScope', 'LogInServ', 'Common', '$uibModal', '$route', 'localStorageService', 'AlertMessage', 'usSpinnerService', '$interval', '$q', '$filter','EMRTemplateSrv', 'DesignEMRSrv' , '$http'  , function ($scope, API, PatientInfo, authService, srvCommon, $window, $routeParams, $location, $rootScope, LogInServ, Common, $uibModal, $route, localStorageService, AlertMessage, usSpinnerService, $interval, $q, $filter, EMRTemplateSrv, DesignEMRSrv , $http) {
    //DATA Members Declaration
    $scope.TimeFlag = true;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    //$rootScope.IsAuto = true;
    $scope.IsDelete = false;
 $rootScope.IsFemale = 0;
            $rootScope.IsMale = 0;
    $rootScope.CoupleDetails = {};
    $rootScope.CoupleDetails.FemalePatient = {};
    $rootScope.CoupleDetails.MalePatient = {};
    $scope.PatientCategory = 0;
    $scope.UserUnitID = localStorageService.get("UserInfo").UnitID;
    $scope.disableClick = false; //Added by Nayan Kamble on 13/06/2019  
    console.log("userID ", $scope.UserUnitID);

    $rootScope.activeAction = Common.getString();

    var objResource = {};
    debugger;
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    
    $scope.SessionTime = localStorageService.get("UserInfo").SessionTimeOut;
    $scope.ExtendedTime = (new Date()).addMinutes($scope.SessionTime);

    var milisecondsDiff = $scope.ExtendedTime - new Date();   

    $scope.SessionExpiredIn = Math.floor(milisecondsDiff / (1000 * 60 * 60)).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + (Math.floor(milisecondsDiff / (1000 * 60)) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + (Math.floor(milisecondsDiff / 1000) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });

    $scope.callAtInterval = function () { 
        if ($scope.TimeFlag == false) {
            console.log("Session Expired In");

            var milisecondsDiff = $scope.ExtendedTime - new Date();

            console.log(milisecondsDiff);

            $scope.SessionExpiredIn = Math.floor(milisecondsDiff / (1000 * 60 * 60)).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + (Math.floor(milisecondsDiff / (1000 * 60)) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + (Math.floor(milisecondsDiff / 1000) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });

            console.log($scope.SessionExpiredIn);

            if ($scope.SessionExpiredIn == '00:00:00') {
                localStorageService.set('LogOut', true);
                $scope.logOut();
            }
            
        }
        else {
            $scope.TimeFlag = false;
        }       
    }

    $interval(function () { $scope.callAtInterval(); }, 1000);

    //$scope.UpdateSessionTimer = function UpdateSessionTimer() {
    //    debugger;
    //    $scope.TimeFlag = true;
    //    $scope.SessionTime = localStorageService.get("UserInfo").SessionTimeOut;
    //    $scope.ExtendedTime = (new Date()).addMinutes($scope.SessionTime);

    //    var milisecondsDiff = $scope.ExtendedTime - new Date();

    //    $scope.SessionExpiredIn = Math.floor(milisecondsDiff / (1000 * 60 * 60)).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + (Math.floor(milisecondsDiff / (1000 * 60)) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + (Math.floor(milisecondsDiff / 1000) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });
    //}   //  commented by sujata for session


    $scope.UpdateSessionTimer = function UpdateSessionTimer() {
        // debugger;
        $scope.TimeFlag = true;
        if (localStorageService.get("UserInfo") != null) {
            $scope.SessionTime = localStorageService.get("UserInfo").SessionTimeOut;
            $scope.ExtendedTime = (new Date()).addMinutes($scope.SessionTime);
        }
        else {
            $location.path('/Login');
            //$scope.SessionTime = localStorageService.get("UserInfo").SessionTimeOut;
            //$scope.ExtendedTime = (new Date()).addMinutes($scope.SessionTime);
        }
        var milisecondsDiff = $scope.ExtendedTime - new Date();
        $scope.SessionExpiredIn = Math.floor(milisecondsDiff / (1000 * 60 * 60)).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + (Math.floor(milisecondsDiff / (1000 * 60)) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + (Math.floor(milisecondsDiff / 1000) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });
    }

    $rootScope.OrderList = 0;   //By Umesh for order investigation and prescription
    $scope.width = '';
    // $scope.display = 'none';
    // var lstUserRights = [];
    $scope.logOut = function () {
        debugger;
        // usSpinnerService.spin('GridSpinner');
        authService.logOut();
        var response2 = authService.activetickets($scope.landFirstName, $scope.landFirstName, false, 1).then(function (response2) {
            localStorageService.remove('authorizationData');
            //   localStorageService.remove('UserInfo');     commented by Nayan Kamble on 04/12/2019
            $window.location.href = API.Baseurl;
            //if ($scope.TimeOut = true) {
            //    $scope.TimeOut = false;
            //    AlertMessage.info(objResource.msgTitle, objResource.msgSessionTimeout);
            //}
            //    usSpinnerService.stop('GridSpinner');
        },
        function (err) {
            //   usSpinnerService.stop('GridSpinner');
            $scope.Message = err.error_description;
        });
        //$window.location.href = ngAuthSettings.apiServiceBaseUri;


    }
    if (localStorageService.get("UserInfo"))
        debugger;
    authService.authentication.FullName = localStorageService.get("UserInfo").UserName;
    $scope.authentication = authService.authentication;
    if (!authService.authentication.IsLogOut) {
        var responseData = LogInServ.GetCurrentUser();
        responseData.then(function (Response) {
            $scope.PatientId = Response.value;
            if ($scope.PatientId == "" || $scope.PatientId == 0) {
                //
                $window.location.href = API.Baseurl;
            }
            else {
                //;
                //crumble.context = { thing: 'Home' };
                //crumble.update();
                //$rootScope.scrumble = crumble;
            }
        }, function (error) {
            alert("error" + error.status);
        });
    }

    $scope.GetUserRights = function () {
        authService.GetUserRoleRights().then(function (response) {
            Common.clearUserRights();
            Common.setUserRights(response.data);
            //       lstUserRights = response.data;
        },
       function (err) {
       });
    }
    //Added by Manohar
    $scope.CheckSinglePatient = function CheckSinglePatient(IsSinglePatient) {

        PatientInfo.IsSinglePatient = IsSinglePatient;
    }

    $scope.BindGrandParentList = function () {
        debugger;
        //by rohini for Patient List ON dashboard
        $scope.getpatientlist(7); //by default couple
       
        $scope.IsQueue = false;
        $scope.IsCycle = false;
        $scope.IsPatient = false;
        $scope.IsDonor = false;
        $scope.IsCryoBank = false;
        $scope.IsConfiguration = false;
        $scope.IsReport = false;
        $scope.IsLab = false;
       

       
        //  
        var Response = authService.BindGrandParentList();
        Response.then(function (resp) {
            $scope.GrandParentList = resp.data;
            if ($scope.GrandParentList.length > 0) {
                var Menus = [];
                //      Menus.push("Find Patient"); Menus.push("Appointment");
                angular.forEach($scope.GrandParentList, function (i) {

                    //if (Menus.indexOf(i.Title) > -1) {
                    //    i.Path = '#/' + i.Path;
                    //}

                    //else {
                    //    i.Path = '#/' + i.Path + '/' + i.MenuId + '/' + i.Title;
                    //}
                    if (i.Title == 'Configuration') {
                        $scope.IsConfiguration = true;
                        $scope.ConfigID = i.MenuId;
                    }
                    else if (i.Title == 'Patient EMR') {
                        $scope.IsPatient = true;
                        //   $scope.ConfigID = i.MenuId;
                    }
                    else if (i.Title == 'Queue Management') {
                        $scope.IsQueue = true;
                        $scope.QID = i.MenuId;
                    }
                    else if (i.Title == 'Cycles') {
                        $scope.IsCycle = true;
                        $scope.CycleID = i.MenuId;
                    }
                    else if (i.Title == 'Donor') {
                        $scope.IsDonor = true;
                        $scope.DonorID = i.MenuId;
                    }
                    else if (i.Title == 'Dashboard') { //added by Divya for Dashboard on 3 jan 2020
                        $scope.IsDashboard = true;
                        $scope.DashboardID = i.MenuId;
                    }
                    else if (i.Title == 'Cryo Bank') {
                        $scope.IsCryoBank = true;
                        $scope.CryoBankID = i.MenuId;
                    }
                    else if (i.Title == 'Patient') {

                        $scope.IsMPatient = true;
                    }
                    else if (i.Title == 'Registration') { //For Crossclinic added by AniketK on 03July2019

                        $scope.IsMPatient = true;
                    }
                    else if (i.Title == 'Appointment') {    //Added sujata for appointment 7/11/19

                        $scope.IsAppointment = true;
                    }
                    else if (i.Title == 'Billing') {    //Added sujata for appointment 7/11/19

                        $rootScope.IsBilling = true;
                    }
                    else if (i.Title == 'Lab') {    //Added sujata for  23 sep 2020

                        $rootScope.IsLab = true;
                    }
                    else if (i.Title == 'Quality Control') {    //Added by Aniket on 29July2020

                        $scope.IsQualityControl = true;
                    }
                    else if (i.Title == 'Reports') {    //Added by Aniket on 29July2020

                        $scope.IsReport = true;
                    }
                     else if (i.Title == 'Inventory') {    //Added by Aniket on 29July2020

                        $scope.IsInventory = true;
                    }
                    else if (i.Title == 'Counter Sale') {    //Added by divya on 31aug2020
                        $rootScope.IsInventory = true;
                    }
                    else if (i.Title == 'MaterialConsumption Entry') {    //Added by Yogitak on 17mar2021

                        $rootScope.IsInventory = true;
                    }
                    else if (i.Title == 'MaterialConsumption List') {    //Added by Yogitak on 5April2021

                        $rootScope.IsInventory = true;
                    }
                   
                });
            }
        });
    }
    $scope.FemaleParentList = [];
    $scope.MaleParentList = [];
    $scope.BindParentList = function (Id) {
        debugger;
        var Response = authService.BindParentList(Id);
        Response.then(function (resp) {
            debugger;
            if (Id == 0) {
                debugger;
                $scope.IsPatientList = false;
                $scope.IsRegistration = false;
                $scope.IsPatientVisit = false;
                $scope.IsNewRegistration = false;

                $scope.IsCalender = false;     // added sujata for Appointment date 7/11/19
                $scope.IsAppointmentList = false; // added sujata for Appointment date 7/11/19
                $scope.IsNewCalender = false;
                $rootScope.IsBilling = false;

                $rootScope.IsLab = false;    //Added sujata for  23 sep 2020
               // $scope.IsInventory = false;  //Added by divya on 31Aug2020
                
                $scope.IsCycleTab = false;  // Added on 27thJul2021 to allow Cycle Tab accesible or not to user

                //added by Divya for Dashboard on 3 jan 2020

                $scope.IsPatientDashboard = false;
                $scope.IsKPIs = false;
                $scope.IsMIS = false;
                $scope.IsFinancialKPIs = false;
                //$scope.IsLab = false;

                //$scope.IsTodaysPatient = false;    
                //$scope.IsClinical = false; 
                //$scope.IsEmbryo = false;
                //$scope.IsOutcomes = false;

                //End

                angular.forEach(resp.data, function (item) {
                    debugger;
                    if (item.Title == 'Patient Search') {
                        $scope.IsPatientList = true;
                    }
                    if (item.Title == 'New Patient') {
                        $scope.IsRegistration = true;
                    }
                    if (item.Title == 'New Visit') {
                        $scope.IsPatientVisit = true;
                    }
                    if (item.Title == 'New Patient Registration') {
                        debugger;
                        $scope.IsNewRegistration = true;
                    }
                    

                    /* Appointment */
                    if (item.Title == 'Calender') {          // added sujata for Appointment date 7/11/19
                        $scope.IsCalender = true;
                    }
                    if (item.Title == 'Appointment List') {
                        $scope.IsAppointmentList = true;
                    }
                    if (item.Title == 'NewAppointments') {          // added sujata for Appointment date 7/11/19
                        $scope.IsNewCalender = true;
                    }
                    
                    if (item.Title == 'LabTestList') {          // added sujata for lab 23 sep 2020
                        $rootScope.IsLab = true;
                    }

                    if (item.Title == 'NewLabEntery') {          // added sujata for lab 23 sep 2020
                        $rootScope.IsLab = true;
                    }
                    if (item.Title == 'NewBilling') {          // added sujata for Appointment date 7/11/19
                        $rootScope.IsBilling = true;
                    }
                    
                    if (item.Title == 'Add stock') {          // added sujata for Appointment date 7/11/19
                        $rootScope.IsInventory = true;
                    }
                    if (item.Title == 'Consumption List') {          // added sujata for Appointment date 7/11/19
                        $rootScope.IsInventory = true;
                    }
                    if (item.Title == 'Pharmacy sale') {          // added sujata for Appointment date 7/11/19
                        $rootScope.IsInventory = true;
                    }
                    if (item.Title == 'Sales return') {          // added sujata for Appointment date 7/11/19
                        $rootScope.IsInventory = true;
                    }
                    //if (item.Title == 'Counter Sale') {        //Added by divya on 31Aug2020
                    //    $scope.IsInventory = true;
                    //}
                    //if (item.Title == 'MaterialConsumption Entry') {        //Added by Yogitak on 17mar2021
                    //    $scope.IsInventory = true;
                    //}
                    //if (item.Title == 'MaterialConsumption List') {        //Added by Yogitak on 5april2021
                    //    $scope.IsInventory = true;
                    //}
                    //added by Divya for Dashboard on 3 jan 2020

                    if (item.Title == 'Patient Dashboard') {
                        $scope.IsPatientDashboard = true;
                    }

                    if (item.Title == 'Financial KPIs') {
                        $scope.IsFinancialKPIs = true;
                    }

                    if (item.Title == 'KPIs') { //Added by AniketK on 29July2020
                        $scope.IsKPIs = true;
                    }

                    if (item.Title == 'MIS') { //Added by AniketK on 29July2020
                        $scope.IsMIS = true;
                    }
                    
                    if (item.Title == 'Cycle Tab')   // Added on 27thJul2021 to allow Cycle Tab accesible or not to user
                    { 
                        $scope.IsCycleTab = true;
                    }

                    //if (item.Title == 'Todays Patient') {          
                    //    $scope.IsTodaysPatient = true;
                    //}
                    //if (item.Title == 'Clinical') {
                    //    $scope.IsClinical = true;
                    //}
                    //if (item.Title == 'Embryo') {         
                    //    $scope.IsEmbryo = true;
                    //}

                    //if (item.Title == 'Outcomes') {          
                    //    $scope.IsOutcomes = true;
                    //}

                    //End 

                  
                    //if (item.Title == 'Patient Search') {
                    //    $scope.IsPatientList = true;
                    //}
                    //if (item.Title == 'Patient Registration') {
                    //    $scope.IsRegistration = true;
                    //}
                    //if (item.Title == 'Patient Check-in') {
                    //    $scope.IsPatientVisit = true;
                    //}
                });

                $scope.MaleParentList.length = 0;
                
                $scope.FemaleParentList.length = 0;

                console.warn(">>>>>>>>>>>>>>>>>>>>>>> resp.data" , resp.data)

                angular.forEach(resp.data, function (item) {
                    var Menus = item.Title.split(' ');
                    if (Menus.indexOf('Female') > -1) {
                    debugger
                        Menus.splice(0, 1);
                        item.IconTitle = Menus.join(' ');
                    }
                    else if (Menus.indexOf('Male') > -1) {
                    debugger
                        Menus.splice(0, 1);
                        item.IconTitle = Menus.join(' ');
                    }
                    else {
                        item.IconTitle = item.Title;
                    }
                    if (item.MenuFor == 1) {
                    debugger
                        $scope.MaleParentList.push(item);
                    }
                    else if (item.MenuFor == 2) {
                    debugger
                        $scope.FemaleParentList.push(item);
                    }
                })
                //   $scope.ParentList = resp.data;

                
            }
            else $scope.FirstLvlParentList = resp.data;
        });

          console.warn(">>>>>>>>>>>>>>>>>>>>>>> $scope.FemaleParentList" , $scope.FemaleParentList)
    }

    $scope.BindChildList = function (parentid, Title) {
        var Response = authService.BindClildMenuList(parseInt(parentid));
        Response.then(function (resp) {
            $scope.DivTitle = Title;
            $scope.width = '100%';
            $scope.ChildList = resp.data;
        });
    }

    $scope.startNewRow = function (index, count) {
        return ((index) % count) === 0;
    };

    $scope.CloseChild = function (index) {
        $scope.width = '0%';
    };

    setInterval(function () {
        //debugger;
        $scope.UpdateTicket();
    }, 180000)

    $scope.GetPatientInfo = function GetPatientInfo() {
        //debugger;      
        $scope.CurrentUser = localStorageService.get("UserInfo");  //Added by AniketK on 17June2020        
        $scope.SelectedPatient = Common.getSelectedPatient();        
        $scope.SelectedCouple = Common.getSelectedCouple();

        Common.GetPatientInfo($scope.CurrentUser, $scope.SelectedPatient, $scope.SelectedCouple).then(function (response) {
        }, function (err) {            
        })
    }

    $scope.UpdateTicket = function UpdateTicket() {
        //debugger;
        $scope.GetPatientInfo();
        authService.UpdateTicket().then(function (response) {        
            // //;
            $scope.CheckUser();

        }, function (err) {
            ////;;
        })
    }

    $scope.CheckUser = function CheckUser() {
        // debugger;
        if (!authService.authentication.IsLogOut) {
            var responseData = LogInServ.GetCurrentUser();
            responseData.then(function (Response) {
                //;
                $scope.PatientId = Response.value;
                if ($scope.PatientId == "" || $scope.PatientId == 0) {
                    //;
                    $window.location.href = API.Baseurl;
                }
                else {
                    //;
                    //crumble.context = { thing: 'Home' };
                    //crumble.update();
                    //$rootScope.scrumble = crumble;
                }
            }, function (error) {
                alert("error" + error.status);
            });
        }
    }
    //$scope.PatientCategory = 7;
    $scope.getpatientlist = function getpatientlist(PatientCategory) {
        var UserInfo = localStorageService.get("UserInfo");
        debugger;
        var response = Common.getpatientlist(UserInfo.UnitID, PatientCategory); //added sujata cross clinic                                                                                                                                                                                                                                        

        //var response = Common.getpatientlist(2, PatientCategory); //commmented sujata

        response.then(function (resp) {
            debugger
            if (resp.data != null) {
            debugger
                $scope.PatientList = resp.data;
                $scope.BindParentList(0);
                debugger
                debugger;
                if (angular.element('#liPatient').length && angular.element('#liPatient').hasClass('active'))
                    angular.element('#liPatient').addClass('active');
                else {
                    if (angular.element('#liDashboard').length)
                        angular.element(liDashboard).addClass('active');
                }

            }
        });
    }

    $rootScope.$watch('dropdownwatcher', function (oldvalue, newvalue) {

        $scope.getpatientlist(7);
    });

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

    $rootScope.$on("onSelect", function (model) {//Added by Divya For Patient Dashboard  on 11 april 2020
        debugger;
        var model = model.currentScope.Item;
        //model = "Hello";
        $scope.onSelect(model);
    });

    $scope.onSelect = function (model) {
        debugger;
        $rootScope.Breadcrum.length = 0;
        $rootScope.hideWhenQueue = false;
        //Begin:: Added by AniketK on 07July2020 for Single Patient Selection for Video Consulation from Patient Search Tab.        
        var response = Common.GetActiveVisitByPatient(model.ID, model.UnitID, $scope.Sessionobj);

        response.then(function (resp) {
            var tempDate1 = new Date();
            var date1 = tempDate1.getFullYear() * tempDate1.getMonth() * tempDate1.getDate();
            var tempDate2 = new Date(resp.data[0].Date);
            var date2 = tempDate2.getFullYear() * tempDate2.getMonth() * tempDate2.getDate();
            if (date1 == date2) {
                $rootScope.VisitTypeID = resp.data[0].VisitTypeID;
            }
            else {
                $rootScope.VisitTypeID = 0;
            }
        });
        //End:: Added by AniketK on 07July2020 for Single Patient Selection for Video Consulation from Patient Search Tab.
        if (model) {
            $scope.SelectedPatient = angular.copy(model);   //selected patient details
            sessionStorage.setItem("selectedPatient", JSON.stringify($scope.SelectedPatient));
        }
        else {
            $scope.SelectedPatient = JSON.parse(sessionStorage.getItem("selectedPatient"));
        }
        angular.element('#liPatient').removeClass('open');
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

        angular.element(dropdown_menu)[0].style.display = "none";
    };
    //END
    //Get Couple Details 
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
                $scope.GetDashBoardData();

            }
        });

    }
    //END


    //Report Functionality
    $scope.PrintSummary = function (Item, IsMale) {
        debugger;
        if (IsMale) {
            var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PU=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&M=' + IsMale);
        }

        else {
            if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.VisitUnitID) || angular.isUndefined($rootScope.CoupleDetails.FemalePatient.VisitID)) {
                var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + 0 + '&V=' + 0 + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&M=' + IsMale);
            }
            else {
                var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + $rootScope.CoupleDetails.FemalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&M=' + IsMale);
            }

        }


        window.open('/Reports/EMR/Summary/SummaryWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }
    //Added by swatih start 17/7/2020
    $scope.CurrentPage = 1;
    $scope.GetVisitList = function (Item, IsMaleForVisit) {  //
        debugger;

        if (IsMaleForVisit == true) {
            $scope.PatientID = $rootScope.CoupleDetails.MalePatient.MaleId;
            $scope.PatientUnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
            $scope.IsMaleForVisit = true;
        }
        else {
            $scope.PatientID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
            $scope.PatientUnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
            $scope.IsMaleForVisit = false;
        }


        var response = Common.GetAllVisitByPatient($scope.PatientID, $scope.PatientUnitID, $scope.CurrentPage - 1); //Get Visit list For selected patient  //Get Visit list For selected patient //$scope.Sessionobj Added by divya for session on 18 march 2020
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.VisitList = resp.data;
                $scope.VisitList.PatientID = $scope.PatientID;
                $scope.VisitList.PatientUnitID = $scope.PatientUnitID;
                $scope.VisitList.IsMale = $scope.IsMaleForVisit;
                $scope.TotalItemsVisitList = $scope.VisitList[0].TotalRows;

                if ($scope.VisitList.length > 0)
                    $scope.ViewHistory($scope.VisitList.PatientID, $scope.VisitList.PatientUnitID, $scope.VisitList[0].VisitID, $scope.VisitList[0].VisitUnitID, $scope.VisitList.IsMale);


            }
        });
    }

    $scope.ViewHistory = function (PatientID, PatientUnitID, VisitID, VisitUnitID, IsMale) {
        debugger;

        if (IsMale) {
            var a = encodeURIComponent('U=' + PatientUnitID + '&VU=' + VisitUnitID + '&V=' + VisitID + '&P=' + PatientID + '&M=' + IsMale);
        }
        else {

            var a = encodeURIComponent('U=' + PatientUnitID + '&VU=' + VisitUnitID + '&V=' + VisitID + '&P=' + PatientID + '&M=' + IsMale);
        }

        $scope.reportURL = '/Reports/EMR/Summary/SummaryWF.aspx?' + encodeURIComponent(a), '_blank'; // in new tab  
        ReportFrame.src = $scope.reportURL;
    }
    //Added by swatih end 17/7/2020
    //End 
    //Bind Latest data to vitals
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
                console.log(">>>>>>>>>>>>>>>>>>>>>>> female flag before", $rootScope.IsFemale)
                    console.log(">>>>>>>>>>>>>>>>>>>>>>> male flag before", $rootScope.IsMale)
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

                    if( $rootScope.CoupleDetails.FemalePatient.FemaleBMI==null ||  $rootScope.CoupleDetails.FemalePatient.FemaleBMI==undefined ||  $rootScope.CoupleDetails.FemalePatient.FemaleBMI==0)
                    {
                        AlertMessage.error("FertiVue", "Height and Weight for this patient is not provided!");
                    }
                    if (angular.isDate(new Date($scope.FemalePatient.LMP)) && $scope.FemalePatient.LMP != null) {
                        var dt2 = new Date();
                        var dt1 = new Date($scope.FemalePatient.LMP);
                        $scope.CycleDay = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)) + 1;
                    }
                    else {
                        $scope.CycleDay = '';

                    }
                    console.log(">>>>>>>>>>>>>>>>>>>>>>> female flag after", $rootScope.IsFemale)
                    console.log(">>>>>>>>>>>>>>>>>>>>>>> male flag after", $rootScope.IsMale)
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
                    debugger;
                    if( $rootScope.CoupleDetails.MalePatient.MaleBMI==null ||  $rootScope.CoupleDetails.MalePatient.MaleBMI==undefined ||  $rootScope.CoupleDetails.MalePatient.MaleBMI==0)
                    {
                        AlertMessage.error("FertiVue", "Height and Weight for this patient is not provided!");
                    }
                    console.log(">>>>>>>>>>>>>>>>>>>>>>> female flag after", $rootScope.IsFemale)
                    console.log(">>>>>>>>>>>>>>>>>>>>>>> male flag after", $rootScope.IsMale)
                }
            }
        });
    }

    //=============================================================================================================================================================
    //Get The Latest Visit
    $scope.VisitPopUP = function (Patient) {
        debugger;
        if (!angular.equals({}, Patient)) {

            var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
            response.then(function (resp) {

                if (resp.data.length > 0) { //Go cursor this scope when multiple visit

                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'visitmodel',
                        controller: 'visitmodelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'lg',
                        resolve: {
                            VisitInfo: function () {
                                return resp.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) { // return here after cancel reason entered
                        debugger;
                        //Added by AniketK on 07July2020 for Video Consultation
                        var tempDate1 = new Date();
                        var date1 = tempDate1.getFullYear() * tempDate1.getMonth() * tempDate1.getDate();
                        var tempDate2 = new Date(data.Date);
                        var date2 = tempDate2.getFullYear() * tempDate2.getMonth() * tempDate2.getDate();
                        if (date1 == date2) {
                            $rootScope.VisitTypeID = data.VisitTypeID;
                        }
                        else {
                            $rootScope.VisitTypeID = 0;
                        }
                        if (!angular.equals({}, data)) {
                            debugger;
                            //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                debugger;
                                //for female
                                var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                                response.then(function (resp) {
                                    var vdetails = { "visitid": data.VisitID, "visitunitid": data.VisitUnitID };
                                    sessionStorage.setItem("femaleVisitDetails", JSON.stringify(vdetails));
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate = data.Date;
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                                    Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
  $rootScope.selectedPatientCopy = angular.copy($scope.selectPatient)   // vaibhav

                                })
                            }
                            else {
                                debugger
                                //for male
                                var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 1);
                                response.then(function (resp) {
                                    var vdetails = { "visitid": data.VisitID, "visitunitid": data.VisitUnitID };
                                    sessionStorage.setItem("maleVisitDetails", JSON.stringify(vdetails));
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate = data.Date;
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                                    Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
  $rootScope.selectedPatientCopy = angular.copy($scope.selectPatient)   // vaibhav


                                });
                            }
                            //      $location.path('/EMRLandingPage/');
                            //$location.path('/EMRLandingPage/');
                        }
                    });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {
                    debugger;
                    if (!angular.equals({}, resp.data)) {
                        debugger;
                        if (Patient.GenderID == 2) {
                            debugger;
                            //for female
                            var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, resp.data[0], 2);
                            response.then(function (resp1) {
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate = resp.data[0].Date;
                                $scope.selectPatient = {};
                                $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate;
                                $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                                Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                Common.setSelectedPatient($scope.selectPatient);
                                Common.SetSelectedPatientInAPI($scope.selectPatient);
                            })
                        }
                        else {
                        debugger
                            //for male
                            var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, resp.data[0], 1);
                            response.then(function (resp2) {
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate = resp.data[0].Date;
                                $scope.selectPatient = {};
                                $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate;
                                $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                                Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                Common.setSelectedPatient($scope.selectPatient);
                                Common.SetSelectedPatientInAPI($scope.selectPatient);
                            });
                        }
                    }
                }
                else {
                    if (Patient.GenderID == 2) {
                        Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                        Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, null, 2);
                    }
                    else if (Patient.GenderID == 1) {
                        Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                        Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, null, 1);
                    }
                    Common.setSelectedPatient($scope.SelectedPatient);
                    Common.setSelectedCouple($rootScope.CoupleDetails);
                    //alert("There is no active visit");
                }

                //   if (From == 0)
                $location.path('/EMRLandingPage/');
            });
        }
    }
    //=============================================================================================================================================================
    //Nevigate visitPopup
    $scope.NevigateVisitPopUP = function (Patient, Redirectto) {
        if (Redirectto == "FemaleHistory" || Redirectto == "MaleHistory") { //no popup for history
            if (!angular.equals({}, Patient)) {
                var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
                response.then(function (resp) {
                    if (resp.data.length >= 1) {

                        if (!angular.equals({}, resp.data)) {
                            if (Patient.GenderID == 2) {
                                //for female
                                //$rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                                //$rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                //$rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                //$rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate = resp.data[0].Date

                                for (var i = 0; i < resp.data.length; i++)  // commented by sujata for cross clinic add
                                {
                                    if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == resp.data[i].VisitID &&  $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID == resp.data[i].VisitUnitID)
                                    {
                                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[i].VisitID;
                                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[i].VisitUnitID;
                                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate = resp.data[i].Date
                                    }

                                }
                                
                                //Added  sujata for Queue history save
                                if (resp.data[0].visitID != 0 && resp.data[0].visitunitID != 0) {
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                }
                                //end  sujata for Queue history save



                                var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                response.then(function (resp) {

                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $rootScope.CoupleDetails = Common.getSelectedCouple();
                                        //   $location.path(Redirectto);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                            $location.path(Redirectto);
                                        })
                                    }
                                });
                            }
                            else {
                                //for male
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate = resp.data[0].Date
                                var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                response.then(function (resp) {

                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $rootScope.CoupleDetails = Common.getSelectedCouple();
                                        //   $location.path(Redirectto);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                            $location.path(Redirectto);
                                        })
                                    }
                                });
                            }
                        }
                    }
                    else {
                        Common.setSelectedPatient(Patient);
                        Common.setSelectedCouple($rootScope.CoupleDetails);
                        $location.path(Redirectto);
                    }
                });


            }
        }
        else {
            if (!angular.equals({}, Patient)) {
                var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
                response.then(function (resp) {
                    if (resp.data.length > 1) { //Go cursor this scope when multiple visit
                        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                            templateUrl: 'visitmodel',
                            controller: 'visitmodelInfo',
                            backdrop: false,
                            keyboard: false,
                            size: 'lg',
                            resolve: {
                                VisitInfo: function () {
                                    return resp.data;
                                }
                            }
                        });
                        modalInstance.result.then(function (data) { // return here after cancel reason entered
                            debugger;
                            //Added by AniketK on 07July2020 for Video Consultation
                            var tempDate1 = new Date();
                            var date1 = tempDate1.getFullYear() * tempDate1.getMonth() * tempDate1.getDate();
                            var tempDate2 = new Date(data.Date);
                            var date2 = tempDate2.getFullYear() * tempDate2.getMonth() * tempDate2.getDate();
                            if (date1 == date2) {
                                $rootScope.VisitTypeID = data.VisitTypeID;
                            }
                            else {
                                $rootScope.VisitTypeID = 0;
                            }
                            if (!angular.equals({}, data)) {  //this scope is executed when particular one visit is selected
                                if (Patient.GenderID == 2) {
                                    //for female
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate = data.Date;
                                    var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                    response.then(function (resp) {
                                        if (resp.status == 200) {

                                            $scope.selectPatient = {};
                                            $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                            $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                            $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                            $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                            $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                            $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                            $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate;
                                            $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                            Common.setSelectedPatient($scope.selectPatient);
                                            //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                            Common.setSelectedCouple($rootScope.CoupleDetails);
                                            Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                                var url = $location.absUrl();
                                                if (url != undefined && url != null) {
                                                    url = url.split('/');
                                                    url = url[url.length - 1];
                                                    if (url == Redirectto) {
                                                        $route.reload();
                                                    }
                                                    else $location.path(Redirectto);
                                                }
                                            });
                                            //  $location.path(Redirectto);
                                        }
                                    });
                                }
                                else {
                                    //for male
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate = data.Date;
                                    var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                    response.then(function (resp) {

                                        if (resp.status == 200) {
                                            $scope.selectPatient = {};
                                            $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                            $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                            $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                            $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                            $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                            $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                            $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate;
                                            $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                            Common.setSelectedPatient($scope.selectPatient);
                                            //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                            Common.setSelectedCouple($rootScope.CoupleDetails);
                                            $rootScope.CoupleDetails = Common.getSelectedCouple();
                                            //  $location.path(Redirectto);
                                            Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                                var url = $location.absUrl();
                                                if (url != undefined && url != null) {
                                                    url = url.split('/');
                                                    url = url[url.length - 1];
                                                    if (url == Redirectto) {
                                                        $route.reload();
                                                    }
                                                    else $location.path(Redirectto);
                                                }


                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else if (resp.data.length == 1)  //this scope is executed when only one active visit
                    {

                        if (!angular.equals({}, resp.data)) {
                            if (Patient.GenderID == 2) {
                                //for female
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate = resp.data[0].Date
                                var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                response.then(function (resp) {

                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $rootScope.CoupleDetails = Common.getSelectedCouple();
                                        //   $location.path(Redirectto);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                            $location.path(Redirectto);
                                        })
                                    }
                                });
                            }
                            else {
                                //for male
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate = resp.data[0].Date
                                var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                response.then(function (resp) {

                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $rootScope.CoupleDetails = Common.getSelectedCouple();
                                        //   $location.path(Redirectto);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                            $location.path(Redirectto);
                                        })
                                    }
                                });
                            }
                        }
                    }
                    else {
                        //alert("There is no active visit");
                        debugger;
                        //Common.setSelectedPatient($scope.SelectedPatient);
                        Common.setSelectedPatient(Patient);
                        Common.setSelectedCouple($rootScope.CoupleDetails);
                        $location.path(Redirectto);
                    }
                });
            }
        }
    }
    //=============================================================================================================================================================
    $scope.GetDonorDetails = function GetDonorDetails() {
    debugger
        var response = Common.GetDonorDetails($scope.SelectedPatient);
        response.then(function (resp) {
        debugger
            if (resp.data != null) {
            debugger
                $scope.IsEmrPrint = true; //for print action
                Common.clearSelectedPatient();
                Common.clearSelectedCouple();
                Common.SetSelectedPatientInAPI($scope.SelectedPatient);
                if (resp.data.GenderID == 1) {
                debugger
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
                debugger
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
                $scope.GetDashBoardData();

            }
        });
    }
    //=============================================================================================================================================================
    //by rohini to navigte and set selected respective patient on icon click ModuleId for emr template 
    $scope.Navigate = function Navigate(GenderID, Str, Title, ModuleId) {
        debugger;
        Common.clearID();
        Common.setID(ModuleId);
        $rootScope.IsCycleActive = false;
        Common.clearString();
        Common.setString(Title);

        $rootScope.activeAction = Title;

   $rootScope.selectedPatientGenderId = GenderID; // set for genderwise services in investigation
        if(ModuleId !== 10012){
            Common.SetTherapyDetails(0, 0, 0, 0);//clear therapy by rohini
            $rootScope.CoupleDetails.FemalePatient.TherapyUnitID = 0; //clear therapy  by rohini
            $rootScope.CoupleDetails.FemalePatient.TherapyID = 0;//clear therapy by rohini
            $rootScope.hideWhenQueue = false;
            $rootScope.Breadcrum.length = 0;
            $rootScope.CycleDetails = null;
            $rootScope.FormName = null;
            $rootScope.FormName = Title;
            $scope.IsEmrPrint = true;// for print cation show
        }
        if (Title == 'Male Investigations' || Title == 'Female Investigations ')
            $rootScope.FormName = 'Investigations';
        //   angular.element(lblFormName).text(Title);
        ////Code Added By manohar to check Single Patient in Banks.
        if (Str == "SpermBank" || Str == "OocyteBank" || Str == "EmbryoBank") {
            PatientInfo.IsSinglePatient = true;
            $rootScope.IsSinglePatient = true;
        }
        else {
            PatientInfo.IsSinglePatient = false;
            $rootScope.IsSinglePatient = false;
            $rootScope.Allergies = '';
        }
        $rootScope.OrderList = 0;
        if (GenderID == 1) {
            $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = true;
            debugger;
            angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");
            if (!angular.equals($rootScope.CoupleDetails.MalePatient.Selectedvisit, {}) && $rootScope.CoupleDetails.MalePatient.Selectedvisit != null && Str != "MaleHistory") {
                if ($rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID != undefined && $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID != undefined) {
                    //Already select patient in serach box
                    var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                    response.then(function (resp) {
                        if (resp.status == 200) {
                            $scope.selectPatient = {};
                            $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                            $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                            $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                            $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                            $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                            $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                            $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                            Common.setSelectedPatient($scope.selectPatient);
                            debugger;
                            Common.clearTempID();
                            Common.setTempID(ModuleId);
                            Common.clearString();
                            Common.setString(Title);
                            $location.path(Str);
                        }
                    });
                }
            }
            else {
                //patient not selected in serach box
                $scope.selectPatient = {};
                $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                $scope.selectPatient.PatietCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                debugger;
                Common.clearTempID();
                Common.setTempID(ModuleId);
                Common.clearString();
                Common.setString(Title);
                $scope.NevigateVisitPopUP($scope.selectPatient, Str);
            }
        }
        else if (GenderID == 2) {
            $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = false;
            debugger;
            angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm");
            if (!angular.equals($rootScope.CoupleDetails.FemalePatient.Selectedvisit, {}) && $rootScope.CoupleDetails.FemalePatient.Selectedvisit != null && Str != "FemaleHistory") {
                if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID != undefined && $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID != undefined) {
                    var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                    response.then(function (resp) {
                        if (resp.status == 200) {
                            debugger;
                            $scope.selectPatient = {};
                            $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                            $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                            $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                            $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                            $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                            $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                            $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                            Common.setSelectedPatient($scope.selectPatient);
                            $location.path(Str);
                        }
                    });
                }
            }
            else {
                //patient not selected in serach box
                debugger;
                $scope.selectPatient = {};
                $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                if(ModuleId !== 10012)
                    $scope.NevigateVisitPopUP($scope.selectPatient, Str);
                else
                {

                    $location.path(Str);
                    return;
                }
            }
        }
        //console.log($rootScope.CoupleDetails.FemalePatient);
        //console.log($rootScope.CoupleDetails.MalePatient);
        //console.log($rootScope.CoupleDetails);
        if (GenderID == 1) {
            if ($rootScope.CoupleDetails.MalePatient.Allergies != "" && $rootScope.CoupleDetails.MalePatient.Allergies != null)
                $rootScope.Allergies = $rootScope.CoupleDetails.MalePatient.Allergies;
            else {
                $rootScope.Allergies = '';
            }
            //if ($rootScope.CoupleDetails.MalePatient.AllergiesFood != "" && $rootScope.CoupleDetails.MalePatient.AllergiesFood != null) {
            //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesFood;
            //}
            //if ($rootScope.CoupleDetails.MalePatient.AllergiesOthers != "" && $rootScope.CoupleDetails.MalePatient.AllergiesOthers != null) {
            //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesOthers;
            //}

        }
        if (GenderID == 2) {
            if ($rootScope.CoupleDetails.FemalePatient.Allergies != "" && $rootScope.CoupleDetails.FemalePatient.Allergies != null)
                $rootScope.Allergies = $rootScope.CoupleDetails.FemalePatient.Allergies;
            else {
                $rootScope.Allergies = '';
            }
            //if ($rootScope.CoupleDetails.FemalePatient.AllergiesFood != "" && $rootScope.CoupleDetails.FemalePatient.AllergiesFood != null) {
            //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.FemalePatient.AllergiesFood;
            //}
            //if ($rootScope.CoupleDetails.FemalePatient.AllergiesOthers != "" && $rootScope.CoupleDetails.FemalePatient.AllergiesOthers != null) {
            //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.FemalePatient.AllergiesOthers;
            //}
        }

        /*Common.GetGlobalData().then(function (resp) {
            $rootScope.Allergies = resp.data;
        });*/
        var url = $location.absUrl();
        if (url != undefined && url != null) {
            url = url.split('/');
            url = url[url.length - 1];
            if (url == Str) {
                $route.reload();
            }
        }
    }

    $scope.NavigateToCycleTemp = function NavigateToCycleTemp(GenderID, Str, Title, ModuleId) {
        Common.setID(ModuleId);
        var modalInstance = $uibModal.open({ 
            templateUrl: 'CycleAdditionInfo',
            controller: 'EMRTemplateModalCtr',
            backdrop: false,
            keyboard: false,
            size: 'lg'
        });
    }

    $scope.ClosePopUp = function (Gender) {
    debugger
        var selectPatient = {};
$rootScope.selectedPatientGenderId = Gender; // set for genderwise services in investigation

        console.log(">>>>>>>>>>>>>>>>>>>>> selected Patient", selectPatient ,  $scope.selectPatient ,   $rootScope.CoupleDetails)
        if (Gender == 2) {
            /////
            debugger
            selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
            selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
            selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
            selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
            selectPatient.Gender = 'Female';
            selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
            if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit) {
                selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID
            }
            Common.setSelectedPatient(selectPatient);
            var response = Common.SetSelectedPatientInAPI(selectPatient);
            response.then(function (resp) {
                $scope.BindMaleFemaleCoupleDetails($rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID, $rootScope.CoupleDetails.FemalePatient.FemalePatientID, 2); //by rohini to get updated info
            });

            //.then(function () {
            //$scope.GetReportList();
            //$scope.btnText = 'Male Report';
            //})
            ////
            angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");//Male close
            $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = false;
            $rootScope.IsCycleActive = false;
    
            $location.path('/EMRLandingPage/');
         
            //   $rootScope.showFemalePopUp = !$rootScope.showFemalePopUp;
            if (angular.element(document.querySelector("#menu--slide-left")).hasClass("active-sm"))
                angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm")
            else angular.element(document.querySelector("#menu--slide-left")).addClass("active-sm")
                console.log(">>>>>>>>>>>>>>>>>>>>>>> female flag after", $rootScope.IsFemale)
                    console.log(">>>>>>>>>>>>>>>>>>>>>>> male flag after", $rootScope.IsMale)
        }
        if (Gender == 1) {
        debugger
            //////
            selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
            selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
            selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
            selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
            selectPatient.Gender = 'Male';
            selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.MalePatientName;
            if ($rootScope.CoupleDetails.MalePatient.Selectedvisit != null) {
                selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID
            }
            Common.setSelectedPatient(selectPatient);
            var response = Common.SetSelectedPatientInAPI(selectPatient);
            response.then(function (resp) {
                $scope.BindMaleFemaleCoupleDetails($rootScope.CoupleDetails.MalePatient.MAleUnitID, $rootScope.CoupleDetails.MalePatient.MaleId, 1); //by rohini to get updated info
            });

            //   $scope.BindMaleFemaleCoupleDetails(); //by rohini to get updated info
            //.then(function () {
            //    $scope.GetReportList();
            //    $scope.btnText = 'Female Report';
            //})
            //////
            angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm"); //Female close
            $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout		
            $rootScope.IsMaleActive = true;
            $rootScope.IsCycleActive = false;
             
            $location.path('/EMRLandingPage/');
          
            //  $rootScope.showMalePopUp = !$rootScope.showMalePopUp;
            if (angular.element(document.querySelector("#menu--slide-left2")).hasClass("active-sm"))
                angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm")
            else angular.element(document.querySelector("#menu--slide-left2")).addClass("active-sm")
                console.log(">>>>>>>>>>>>>>>>>>>>>>> female flag after", $rootScope.IsFemale)
                    console.log(">>>>>>>>>>>>>>>>>>>>>>> male flag after", $rootScope.IsMale)
        }
        if (Gender == 3) {
            debugger;
            $scope.IsEmrPrint = false; // for print cation hide
               $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = false;
            $rootScope.IsCycleActive = true;
            $scope.Breadcrum.length = 0;
            angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");//Male close
            angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm"); //Female close
            var response = Common.BindMaleFemaleCoupleDetails($rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID, $rootScope.CoupleDetails.FemalePatient.FemalePatientID, 2);
            response.then(function (resp) {
                debugger;
                if (resp.data != null) {
                    debugger;
                    if (resp.data.FemalePatient.Allergies != "" && resp.data.FemalePatient.Allergies != null)
                        $rootScope.Allergies = resp.data.FemalePatient.Allergies;
                    else {
                        $rootScope.Allergies = '';
                    }
                    //if (resp.data.FemalePatient.AllergiesFood != "" && resp.data.FemalePatient.AllergiesFood != null) {
                    //    $rootScope.Allergies += ', ' + resp.data.FemalePatient.AllergiesFood;
                    //}

                    //if (resp.data.FemalePatient.AllergiesOthers != "" && resp.data.FemalePatient.AllergiesOthers != null) {
                    //    $rootScope.Allergies += ', ' + resp.data.FemalePatient.AllergiesOthers;
                    //}
                  
                }

            });
        }






        console.log(">>>>>>>>>>>>>>>>>>>>> selected Patient", selectPatient )




        $scope.getSummaryData(selectPatient.ID, selectPatient.VisitUnitID ?? 0 , selectPatient.VisitID ?? 0 , selectPatient.UnitID )
        $scope.GetCaseSummaryHistoryData(selectPatient.ID, selectPatient.VisitUnitID ?? 0 , selectPatient.VisitID ?? 0 , selectPatient.UnitID )
        $scope.GetPatientPrescriptionHistoryData(selectPatient.ID, selectPatient.VisitUnitID ?? 0 , selectPatient.VisitID ?? 0 , selectPatient.UnitID )
        $scope.GetInvestigationHistoryData(selectPatient.ID, selectPatient.VisitUnitID ?? 0 , selectPatient.VisitID ?? 0 , selectPatient.UnitID )
        $scope.GetHistorySummaryData(selectPatient.ID, selectPatient.VisitUnitID ?? 0 , selectPatient.VisitID ?? 0 , selectPatient.UnitID )









    }


    $scope.GetPatientVisitSummaryModel = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetPatientVisitSummaryModel', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };



    $scope.getSummaryData = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
        usSpinnerService.spin('GridSpinner');
        var response = $scope.GetPatientVisitSummaryModel(PatientID , VisitUnitID , VisitID , PatientUnitID);
        response.then(function (res) {
             
            $rootScope.headerDetails = res.data[0]
            console.log(">>>>>>>>>>>>>>>>>>> " , res.data[0] );

            usSpinnerService.stop('GridSpinner');
        })
    
    };


    $scope.GetCaseSummaryHistory = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetCaseSummaryHistory', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };


    $scope.GetCaseSummaryHistoryData = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
        usSpinnerService.spin('GridSpinner');
        var response = $scope.GetCaseSummaryHistory(PatientID , VisitUnitID , VisitID , PatientUnitID);
        response.then(function (res) {
             
            $rootScope.CaseSummaryHistory = res.data[0]
            console.log(">>>>>>>>>>>>>>>>>>> " , res.data[0] );

            usSpinnerService.stop('GridSpinner');
        })
    
    };

    $scope.GetInvestigationHistory = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetInvestigationHistory', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };

    $scope.GetInvestigationHistoryData = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
        usSpinnerService.spin('GridSpinner');
        var response = $scope.GetInvestigationHistory(PatientID , VisitUnitID , VisitID , PatientUnitID);
        response.then(function (res) {
             
            $rootScope.InvestigationHistory = res.data
            console.log(">>>>>>>>>> InvestigationHistory >>>>>>>>> " , res.data[0] );

            usSpinnerService.stop('GridSpinner');
        })
    
    };


    $scope.GetPatientPrescriptionHistory = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetPatientPrescriptionHistory', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };


    $scope.GetPatientPrescriptionHistoryData = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
        usSpinnerService.spin('GridSpinner');
        var response = $scope.GetPatientPrescriptionHistory(PatientID , VisitUnitID , VisitID , PatientUnitID);
        response.then(function (res) {
             
            $rootScope.PatientPrescriptionHistory = res.data
            console.log(">>>>>>>>>> PatientPrescriptionHistory >>>>>>>>> " , res.data[0] );

            usSpinnerService.stop('GridSpinner');
        })
    
    };


    $scope.GetHistorySummary = function (PatientID, VisitUnitID , VisitID , PatientUnitID) {
        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetHistorySummary', {
            params: { PatientID: PatientID,  VisitUnitID : VisitUnitID , VisitID :  VisitID , PatientUnitID : PatientUnitID}
        }).error(function () {
        });
        return Response;
    };

    $scope.GetHistorySummaryData = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
        usSpinnerService.spin('GridSpinner');
        var response = $scope.GetHistorySummary(PatientID , VisitUnitID , VisitID , PatientUnitID);
        response.then(function (res) {
             
          $rootScope.GetHistorySummaryDetails = res.data
            console.log(">>>>>>>>>> GetHistorySummary >>>>>>>>> " , res.data[0] );

            usSpinnerService.stop('GridSpinner');
        })
    
    };



    $scope.OpenInvestigation = function (templateUrl) {
        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'InvestigationPopUp',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            //resolve: {
            //    Info: function () {
            //        return Info;
            //    }
            //}
        });
        modalInstance.result.then(function () {

        })
    }
    $scope.OpenPreScription = function (templateUrl) {

        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'PrescriptionPopUp',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            //resolve: {
            //    Info: function () {
            //        return Info;
            //    }
            //}
        });
        modalInstance.result.then(function () {

        })
    }
    $scope.OpenMedia = function (templateUrl) {

        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'MediaPopUp',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            //resolve: {
            //    Info: function () {
            //        return Info;
            //    }
            //}
        });
        modalInstance.result.then(function () {
        })
    }
    $scope.OpenConsent = function (templateUrl) {

        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'ConsentPopUp',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            //resolve: {
            //    Info: function () {
            //        return Info;
            //    }
            //}
        });
        modalInstance.result.then(function () {
        })
    }
    $scope.OpenPrint = function (templateUrl) {
        if (!angular.equals({}, $scope.selectPatient)) {

            var modalInstance = $uibModal.open({
                templateUrl: templateUrl,
                controller: 'PrintPopUp',
                backdrop: false,
                keyboard: false,
                size: 'lg',
                resolve: {
                    selectPatient: function () {
                        return $scope.selectPatient;
                    }
                }
            });
        }
        modalInstance.result.then(function () {
        });
    }
    $scope.GetDashBoardData = function () {
        debugger;
        var Mid = 0; var Fid = 0;

        //var selectPatient = {};
        //selectPatient = Common.getSelectedPatient();
        if (angular.isUndefined($scope.SelectedPatient)) {
            debugger;
            $scope.SelectedPatient = Common.getSelectedPatient();

            debugger;
        }
        var Promise = Common.GetDashBoardData();
        Promise.then(function (resp) {
            debugger;
            if (resp.data.objFemale.OutSide == ',') resp.data.objFemale.OutSide = '';
            if (resp.data.objFemale.Diagnosis == null) resp.data.objFemale.Diagnosis = '';
            if (resp.data.objFemale.TrayingToConvinceYears == null || resp.data.objFemale.TrayingToConvinceYears == 0) resp.data.objFemale.TrayingToConvinceYears = '';
            if (resp.data.objFemale.TrayingToConvinceMonths == null || resp.data.objFemale.TrayingToConvinceMonths == 0) resp.data.objFemale.TrayingToConvinceMonths = '';
            if (resp.data.objFemale.MenstrualDays == null || resp.data.objFemale.MenstrualDays == 0) resp.data.objFemale.MenstrualDays = '';
            if (resp.data.objFemale.CycleDuration == null || resp.data.objFemale.CycleDuration == 0) resp.data.objFemale.CycleDuration = '';
            if (resp.data.objFemale.InfertilityType == null || resp.data.objFemale.InfertilityType == 0) resp.data.objFemale.InfertilityType = '';
            if (resp.data.objFemale.MoleculeName == null) resp.data.objFemale.MoleculeName = '';

            if (resp.data.objFemale.RightOvaryCount == null) resp.data.objFemale.RightOvaryCount = '';
            if (resp.data.objFemale.LeftOvaryCount == null) resp.data.objFemale.LeftOvaryCount = '';

            if (resp.data.objFemale.LeftTube == null) resp.data.objFemale.LeftTube = '';
            if (resp.data.objFemale.RightTube == null) resp.data.objFemale.RightTube = '';

            if (resp.data.objFemale.Remark == null) resp.data.objFemale.Remark = '';

            if (resp.data.objFemale.BloodGroup == null) resp.data.objFemale.BloodGroup = '';

            $scope.FemaleDashboard = resp.data.objFemale;
            $scope.objPathoDetails = resp.data.objPathoDetails;
            $scope.MaleDashboard = resp.data.objMale;
            //$scope.SelectedPatient = {};
            //$scope.SelectedPatient = Common.getSelectedPatient();
            if ($scope.SelectedPatient.PatientCategoryID == 7) {
                $scope.FemaleDashboard.Name = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                $scope.FemaleDashboard.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                $scope.MaleDashboard.Name = $rootScope.CoupleDetails.MalePatient.MalePatientName;
                $scope.MaleDashboard.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
            }
            else {
                if ($scope.SelectedPatient.GenderID == 1) {
                    $scope.MaleDashboard.Name = $rootScope.CoupleDetails.MalePatient.MalePatientName;
                    $scope.MaleDashboard.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                }
                else {
                    $scope.FemaleDashboard.Name = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                    $scope.FemaleDashboard.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                }
            }
        }, function (error) {
            $scope.FemaleDashboard = {};
            $scope.MaleDashboard = {};
            if ($scope.SelectedPatient.PatientCategoryID == 7) {
                $scope.FemaleDashboard.Name = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                $scope.FemaleDashboard.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                $scope.MaleDashboard.Name = $rootScope.CoupleDetails.MalePatient.MalePatientName;
                $scope.MaleDashboard.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
            }
            else {
                if ($scope.SelectedPatient.GenderID == 1) {
                    $scope.MaleDashboard.Name = $rootScope.CoupleDetails.MalePatient.MalePatientName;
                    $scope.MaleDashboard.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                }
                else {
                    $scope.FemaleDashboard.Name = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                    $scope.FemaleDashboard.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                }
            }
        })
    }

    $scope.aciveTab = function (tab) {
        debugger;
        $scope.IsEmrPrint = false;
        debugger
        if (tab == 'liCryobank') {
            $rootScope.IsSinglePatient = false;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).addClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');

            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');

            angular.element(dropdown_menu)[0].style.display = "none";
        }
        else if (tab == 'liQueue') {
            $rootScope.IsFemale = 0;
            $rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).addClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }
        else if (tab == 'liCycles') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).addClass('active');
            if (angular.element('#liPatient'))
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }
        else if (tab == 'liPatient') {
            //angular.element(txtfullName).focus();
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).addClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }

            //Added sujata for appointment date 7/11/19
        else if (tab == 'liAppointment') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).addClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
                
        }

            //ended sujata for appointment date 7/11/19


        else if (tab == 'liDonor') {
            $rootScope.IsFemale = 0;
            $rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).addClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');

            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }
            //added by Divya for Dashboard on 3 jan 2020
        else if (tab == 'liDashboard') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient'))
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).addClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');


          

        }
            //Ended by Divya for Dashboard on 3 jan 2020

        else if (tab == 'liConfiguration') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).addClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
                
        }
        else if (tab == 'liMPatient') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).addClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
        }
        else if (tab == 'liKPI') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).addClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
        }
        else if (tab == 'liQCI') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).addClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }

        else if (tab == 'liBilling') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).addClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
        }

        else if (tab == 'liLab') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).addClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).addClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
           

        }
            //Added by divya on 31Aug2020
        else if (tab == 'liInventory') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).addClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');

        }
        //Ended by divya on 31Aug2020
        
    }

    $scope.openVideo = function () {
        debugger;
        window.open('https://whereby.com/gemino', 'pagename', 'resizeable=no,width=600,height=600,bottom=20px,left=1000px,top=200px,position=fixed').focus();
    }

    $scope.openDashboard = function () {
        //if (typeof $scope.SelectedPatient=="undefined") {
        //     $scope.SelectedPatient=Common.getSelectedPatient();
        //}

        $scope.GetDashBoardData(); // by rohini
        //debugger;
        //if ($scope.SelectedPatient.PatientCategoryID != 7) {
        //    var d = document.getElementById("menu--slide-right");
        //    d.className += " singleProfile  ";
        //}
        //else {
        //    var d = document.getElementById("menu--slide-right");
        //    d.className += " psntDash  ";
        //}


        if (angular.element(document.querySelector("#menu--slide-right")).hasClass("active-sm"))
            angular.element(document.querySelector("#menu--slide-right")).removeClass("active-sm")
        else angular.element(document.querySelector("#menu--slide-right")).addClass("active-sm")
    }

    $scope.closeAsideMenu = function () {
        angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");//Male close
        angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm"); //Female close
    }
}]);
PIVF.controller('visitmodelInfo', function ($scope, $uibModalInstance, VisitInfo,$rootScope) {
    debugger;
    $scope.visitInformation = VisitInfo;

    $scope.Cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.SelectPatient = function (Item) {
        debugger;
        //Begin:: Added by AniketK on 07July2020 for Single Patient Selection for Video Consulation from Patient Search Tab       
        var tempDate1 = new Date();
        var date1 = tempDate1.getFullYear() * tempDate1.getMonth() * tempDate1.getDate();
        var tempDate2 = new Date(Item.Date);
        var date2 = tempDate2.getFullYear() * tempDate2.getMonth() * tempDate2.getDate();
        if (date1 == date2) {
            $rootScope.VisitTypeID = Item.VisitTypeID;
        }
        else {
            $rootScope.VisitTypeID = 0;
        }
        //End:: Added by AniketK on 07July2020 for Single Patient Selection for Video Consulation from Patient Search Tab
        $uibModalInstance.close(Item);
    }
});
//added by rohini for print EMR
//DICOM List POPUP
PIVF.controller('DICOMListInfo', function ($scope, $uibModalInstance, VisitInfo,$rootScope) {
    debugger;
    $scope.dicomStudyList = VisitInfo;

    $scope.Cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.SelectPatient = function (Item) {
       
        $uibModalInstance.close(Item);
    }
});
PIVF.controller('PrintPopUp', function ($scope, $uibModalInstance, selectPatient, Common) {
    debugger;
    //for paging================================================================
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.GetData = function () {
        var response = Common.GetAllVisitByPatient(selectPatient.ID, selectPatient.UnitID, $scope.CurrentPage - 1); //Get Visit list For selected patient
        response.then(function (resp) {
            debugger;
            if (resp.data != null) {
                debugger;
                $scope.PatientVisitList = resp.data;
                $scope.TotalItemsVisitList = $scope.PatientVisitList[0].TotalRows;
            }
        });
    }
    $scope.GetData();
    $scope.PageChange = function PageChange() {
        $scope.GetData();
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.PrintHistory = function (Item) {
        debugger;
    }
    $scope.PrintPrescriptions = function (Item) {
        debugger;
        var a = encodeURIComponent('U=' + Item.UnitID + '&VU=' + Item.VisitUnitID + '&V=' + Item.VisitID + '&P=' + Item.PatientID + '&PU=' + Item.PatientUnitID);
        window.open('/Reports/EMR/PriscriptionWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }
    $scope.PrintPathology = function (Item) {
        debugger;
        var Cat = 1;
        var a = encodeURIComponent('U=' + Item.UnitID + '&VU=' + Item.VisitUnitID + '&V=' + Item.VisitID + '&P=' + Item.PatientID + '&PU=' + Item.PatientUnitID + '&Cat=' + Cat);
        window.open('/Reports/EMR/InvestigationSrvWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }
    $scope.PrintRadiology = function (Item) {
        debugger;
        var Cat = 2;
        var a = encodeURIComponent('U=' + Item.UnitID + '&VU=' + Item.VisitUnitID + '&V=' + Item.VisitID + '&P=' + Item.PatientID + '&PU=' + Item.PatientUnitID + '&Cat=' + Cat);
        window.open('/Reports/EMR/InvestigationSrvWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }
    $scope.PrintSummary = function (Item) {
        debugger;
    }
});
PIVF.controller('InvestigationPopUp', function ($rootScope, $scope, $uibModalInstance, InvestigationSrv, $filter, Common, AlertMessage, localStorageService) {
    // For investigation start
    $scope.SelectedServiceListLab = [];
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    $scope.SelectedServiceListRadiology = [];
    $scope.setFavList = [];
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.isDoctor = localStorageService.get("UserInfo").IsDoctor;   // commented by Nayan Kamble on 04/12/2019
    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120), //new Date(2016, 8, 01),
        minDate: new Date(),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker

    $scope.openLabDtPickr = function ($event, i) {
        $event.preventDefault();
        $event.stopPropagation();
        i.dtpickropened = true;
    };

    $scope.GetCatwiseServiceList = function (CatID) {
        var Promise = InvestigationSrv.GetCatwiseServiceList(CatID);
        Promise.then(function (resp) {
            $scope.ServiceList = resp.data;
        }, function (error) {
        })
    }

    $scope.SelectedService = function (selSer, ii) {
        if (ii = 1) {
            if ($scope.CatID == 1) {     //$scope.CatID == 1 is for investigation lab 
                $scope.SelectedServiceListLab.push({
                    ServiceID: selSer.Id,
                    ServiceCode: selSer.ServiceCode,
                    Service: selSer.Description,
                    PlannedDate: new Date(),        //     new Date(),    --Added by Nayan Kamble on 26/06/2019      '',
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            else if ($scope.CatID == 2) {
                $scope.SelectedServiceListRadiology.push({
                    ServiceID: selSer.Id,
                    ServiceCode: selSer.ServiceCode,
                    Service: selSer.Description,
                    PlannedDate: new Date(),        //     new Date(),    --Added by Nayan Kamble on 26/06/2019     '',
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            $scope.selSer.id = 0;
            $scope.selSer.ServiceCode = '';
            $scope.selSer.Description = '';
            $scope.selSer.ServiceCodeDesc = '';

        }
        if (ii = 2) {

        }


    }

    $scope.AddRow = function () {
        debugger;
        if ($scope.CatID == 1) {
            if ($scope.SelectedServiceListLab.length < 3) {
                $scope.SelectedServiceListLab.push({
                    ServiceID: 0,
                    ServiceCode: '',
                    Service: '',
                    PlannedDate: '',
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            else {
                // AlertMessage.info('Palash IVF', 'You can add only 3 new services.');//Commented by swatih for localization 29/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgYoucanaddonly3newservices);//Modified by swatih for localization 29/7/2020
            }
        }

        else if ($scope.CatID == 2) { // || $scope.CatID == 4
            if ($scope.SelectedServiceListLab.length < 3) {
                $scope.SelectedServiceListRadiology.push({
                    ServiceID: 0,
                    ServiceCode: '',
                    Service: '',
                    PlannedDate: '',
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            else {
                //AlertMessage.info('Palash IVF', 'You can add only 3 new services.'); //Commented by swatih for localization 29/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgYoucanaddonly3newservices);//Modified by swatih for localization 29/7/2020
            }
        }
    }

    $scope.SaveInvestigation = function () {
        debugger;
        var lstToSave = [];
        var tempLstToSave = [];
        console.log($scope.SelectedServiceListLab)
        lstToSave = lstToSave.concat($scope.SelectedServiceListLab, $scope.SelectedServiceListRadiology);
        console.log("before ", lstToSave)
        tempLstToSave = lstToSave.slice(0);
        //angular.forEach(tempLstToSave, function (item) {
        //    if (angular.isNumber(item.ID))
        //        lstToSave.splice(item, 1);
        //})              commented by Nayan Kamble on 17/12/2019
        console.log("after ", lstToSave)

        $scope.EmptyNameList = $filter('filter')(lstToSave, function (v) { return v.Service == '' || v.Service == undefined || v.Service == null });
        debugger;
        // angular.forEach(lstToSave, function (x) { x.PlannedDate = $filter('date')(x.PlannedDate, 'medium') });   commented by Nayan Kamble on 17/12/2019
        if ($scope.EmptyNameList.length > 0) {
            debugger;
            //AlertMessage.warning('Palash IVF', 'Enter Service Name.');//Commented by swatih for localization 29/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgEnterServiceName);//Modified by swatih for localization 29/7/2020
        }
        else if (lstToSave.length > 0) {
            debugger;
            var Promise = InvestigationSrv.SaveInvestigation(lstToSave);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    // AlertMessage.success('Palash IVF', 'Record saved successfully.'); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave); //Modified by swatih for localization 29/7/2020
                    ClearSaveInvestigation();
                    $scope.GetTodaysInvestigation($scope.CatID);
                }
                else if (resp.data == 3) {
                    // AlertMessage.success('Palash IVF', 'Record saved successfully.');            //  'Record already saved.');    commented by Nayan Kamble on 17/12/2019  //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave); //Modified by swatih for localization 29/7/2020
                    ClearSaveInvestigation();
                    $scope.GetTodaysInvestigation($scope.CatID);
                }
            }, function (error) {

            })
        }
        else {
            debugger;
            // AlertMessage.warning('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 29/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 29/7/2020
        }
        //if (lstToSave)   //Added by Nayan Kamble on 26/06/2019
        //{
        //$scope.style = "border-color:red";
        //    AlertMessage.info('Palash IVF', 'Please fill mandatory fields.');
        //}
    }

    function ClearSaveInvestigation() {
        angular.element(rdbLab).prop("checked", true);
        $scope.CatID = 1;
        $scope.GetCatwiseServiceList(1);
        $scope.SelectedServiceListLab.length = 0;
        $scope.SelectedServiceListRadiology.length = 0;
    }

    $scope.GetTodaysInvestigation = function (CatID) {

        $scope.IsVisitMark();
        var Promise = InvestigationSrv.GetTodaysInvestigation(CatID);
        Promise.then(function (resp) {

            resp.data.forEach(function (x) { x.PlannedDate = x.PlannedDate != null ? new Date(x.PlannedDate) : null });
            $scope.SelectedServiceListLab = $filter('filter')(resp.data, function (v) { return v.CategoryID == 1 });
            $scope.SelectedServiceListRadiology = $filter('filter')(resp.data, function (v) {
                return v.CategoryID == 2;
            });
        }, function (error) {
        })
    }

    $scope.DeleteService = function (item) {

        if (angular.isNumber(item.ID) && item.ID > 0) {
            Common.clearObj();
            Common.setObj(item);
            angular.element(reasonModel1).modal('show');
        }
        else {
            if (item.CategoryID == 1) {   //item.CategoryID == 1 is for lab && item.CategoryID == 3 for procedure
                //  $scope.SelectedServiceListLab.splice($scope.SelectedServiceListLab.findIndex(x=>x.Service == item.Service), 1)
                var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
                    if ($scope.SelectedServiceListLab[i].Service == item.Service) {
                        idx = i;
                        break;
                    }
                }
                $scope.SelectedServiceListLab.splice(idx, 1);
            }
            else if (item.CategoryID == 2) { //item.CategoryID == 2 is for  radiology && item.CategoryID == 4 for cycles
                //  $scope.SelectedServiceListRadiology.splice($scope.SelectedServiceListRadiology.findIndex(x=>x.Service == item.Service), 1)
                var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
                    if ($scope.SelectedServiceListRadiology[i].Service == item.Service) {
                        idx = i;
                        break;
                    }
                }
                $scope.SelectedServiceListRadiology.splice(idx, 1)
            }
        }
    }

    $scope.DeleteSavedService = function (deleteReason) {
        if (angular.isString(deleteReason)) {
            var obj = {};
            obj = Common.getObj();
            var Promise = InvestigationSrv.DeleteSavedService(obj.ID, obj.UnitID, deleteReason);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    //AlertMessage.success('Palash IVF', 'Record deleted successfully.'); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgRecorddeletedsuccessfully); //Modified by swatih for localization 29/7/2020
                    if (obj.CategoryID == 1) {
                        // $scope.SelectedServiceListLab.splice($scope.SelectedServiceListLab.findIndex(x=>x.ServiceID == obj.ServiceID), 1);
                        var idx = -1;
                        for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
                            if ($scope.SelectedServiceListLab[i].Service == obj.Service) {
                                idx = i;
                                break;
                            }
                        }
                        $scope.SelectedServiceListLab.splice(idx, 1);
                    }
                    else if (obj.CategoryID == 2) {
                        //  $scope.SelectedServiceListRadiology.splice($scope.SelectedServiceListRadiology.findIndex(x=>x.ServiceID == obj.ServiceID), 1);
                        var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                        for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
                            if ($scope.SelectedServiceListRadiology[i].Service == obj.Service) {
                                idx = i;
                                break;
                            }
                        }
                        $scope.SelectedServiceListRadiology.splice(idx, 1)
                    }

                    $scope.deleteReason = '';
                    angular.element(reasonModel1).modal('hide');
                    $scope.GetTodaysInvestigation($scope.CatID);
                }
            }, function (error) {
                //AlertMessage.error('Palash IVF', 'Error occured.'); //Commented by swatih for localization 29/7/2020
                AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 29/7/2020
            });
        }
        else {
            //$scope.frmInv.txtReason.$dirty = true;
            if ($scope.deleteReason == '')
                //AlertMessage.info('Palash IVF', 'Enter reason.'); //Commented by swatih for localization 29/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgPleaseEnterReason); //Modfified by swatih for localization 29/7/2020
        }
    }

    $scope.IsVisitMark = function () {
        //$scope.btnSaveDisabled = false;
        if (selectPatient.VisitID == 0) {
            //   if (angular.isUndefined($rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID == 0) {
            $scope.btnDisabled = true;
            $scope.Message = 'Mark visit to save Investigation.';
            // }
        }
    }

   

    $scope.ShowFavModal = function (item) {

        //  $scope.TemplateID = item.TemplateID;
        Common.clearObj();
        Common.setObj(item);
        angular.element(modFavourite).modal('show');
    }

    $scope.GetTemplateList = function () {

        var ResponseData = Common.getMasterList('M_Investigation_Template', 'ID', 'Template');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.TemplateList = Response.data;
            //if ($scope.TemplateID > 0) {
            //    $scope.templateType = 'Existing';
            //}
            //else {
            //    $scope.templateType = 'New';
            $scope.TemplateID = 0;
            //}
        }, function (error) {
        });
    }

    $scope.SaveFavourite = function () {
        //
        $scope.setFavList[0].Template = $scope.Template;
        if (!angular.isNumber($scope.TemplateID)) $scope.TemplateID = 0;
        $scope.setFavList[0].TemplateID = $scope.TemplateID;
        var Promise = InvestigationSrv.SaveFavourite($scope.setFavList);
        Promise.then(function (resp) {
            if (resp.data == 1) {
                //AlertMessage.success('Palash IVF', 'Record saved successfully.'); //Commented by swatih for localization 29/7/2020
                AlertMessage.success(objResource.msgTitle, objResource.msgSave); //Modified by swatih for localization 29/7/2020
                $scope.setFavList.length = 0;
                $scope.Template = '';
                $scope.TemplateID = 0;
            }
        }, function (error) {

        })
    }

    $scope.SetFavouriteUnsaved = function (Temp, Tid) {

        var item = Common.getObj();
        if (angular.isUndefined(Temp)) Temp = '';
        if (angular.isUndefined(Tid)) Tid = 0;
        if (angular.isNumber(item.ID) && item.ID > 0) {
            item.TemplateID = Tid;
            item.Template = Temp;
            var Promise = InvestigationSrv.SetFavouriteInvestigation(item);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    angular.element(modFavourite).modal('hide');
                    //AlertMessage.success('Palash IVF', 'Add to favourite successfully.'); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgAddtofavouritesuccessfully); //Modified by swatih for localization 29/7/2020

                }
                else if (resp.data == 3)
                    //AlertMessage.success('Palash IVF', 'Already set as favourite for this template.'); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgAlreadysetasfavouriteforthistemplate); //Modified by swatih for localization 29/7/2020

            }, function (error) {
            });


        }
        else {
            if (item.CategoryID == 1) {   //item.CategoryID == 1 is for lab && item.CategoryID == 3 for procedure
                //  var idx = $scope.SelectedServiceListLab.findIndex(x=>x.Service == item.Service);
                var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
                    if ($scope.SelectedServiceListLab[i].Service == item.Service) {
                        idx = i;
                        break;
                    }
                }
                $scope.SelectedServiceListLab[idx].Template = Temp;
                $scope.SelectedServiceListLab[idx].TemplateID = Tid;
            }
            else if (item.CategoryID == 2) { //item.CategoryID == 2 is for  radiology && item.CategoryID == 4 for cycles
                //var idx = $scope.SelectedServiceListRadiology.findIndex(x=>x.Service == item.Service);
                var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
                for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
                    if ($scope.SelectedServiceListRadiology[i].Service == item.Service) {
                        idx = i;
                        break;
                    }
                }
                //$scope.SelectedServiceListRadiology[idx].Template = Temp;
                //$scope.SelectedServiceListRadiology[idx].TemplateID = Tid;
            }
            angular.element(modFavourite).modal('hide');
        }
    }

    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }


    //Start Report 
    $scope.PrintCurrentInvestigation = function (Action) {
        debugger;
        if ($rootScope.IsFemaleActive)
            var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + $rootScope.CoupleDetails.FemalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&Act=' + Action);

        else
            var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PU=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&VU=' + $rootScope.CoupleDetails.MalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.MalePatient.VisitID + '&Act=' + Action);

        window.open('/Reports/EMR/RadiologyWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    //END Report
    // For investigation end   

});
PIVF.controller('PrescriptionPopUp', function ($rootScope, $scope, $uibModal, $uibModalInstance, PrescriptionSrv, $filter, srvCommon, Common, AlertMessage, localStorageService) {
    //======================================================= For prescription start=============================
    $scope.IsBrand = true;
    $scope.IsMolecule = false;
    $scope.isDoctor = localStorageService.get("UserInfo").IsDoctor;
    var UserInfo = localStorageService.get("UserInfo");
    var SourceFrom = $rootScope.FormName;
    var objResource = {};
    debugger;
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    var SelectedCouple = {};
    SelectedCouple = Common.getSelectedCouple();
    $scope.getMatchingBrand = function ($viewValue) {
        var matchingStuffs = [];

        for (var i = 0; i < $scope.DrugList.length; i++) {
            if (
              $scope.DrugList[i].Code.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.DrugList[i]);
            }
        }
        return matchingStuffs;
    }
    $scope.getMatchingMolecule = function ($viewValue) {
        var matchingStuffs = [];

        for (var i = 0; i < $scope.MoleculeList.length; i++) {
            if ($scope.MoleculeList[i].Description.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.MoleculeList[i]);
            }
        }
        return matchingStuffs;
    }
    $scope.PageSetup = function PageSetup() {
        $scope.GetDrugList();
        $scope.GetMoliculeList();
        $scope.FillDropDowns();
        $scope.GetTodaysPrecscription();
        $scope.GetTemplateAndItems();

    }
    $scope.GetDrugList = function GetDrugList() {
        var response = PrescriptionSrv.GetDrugList(UserInfo.UnitID);
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.DrugList = resp.data;
            }
        });
    }
    $scope.GetMoliculeList = function GetDrugList() {
        var ResponseData = Common.getMasterList('M_Molecule', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MoleculeList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillDropDowns = function () {
        var ResponseData = Common.getMasterList('M_Route', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.RouteList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        //var ResponseData = Common.getMasterList('M_Frequency', 'FrequencyID', 'FreqDescription');
        //ResponseData.then(function (Response) {
        //    Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
        //    $scope.FrequencyList = Response.data;
        //}, function (error) {
        //    $scope.Error = error;
        //});

        var ResponseData = PrescriptionSrv.FillFrequency();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.FrequencyList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });

        var ResponseData = Common.getMasterList('M_Instruction', 'InstructionID', 'InsDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.InstructionList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        //var ResponseData = Common.getMasterList('T_TemplateForPrescription', 'ID', 'TemplateName');
        //ResponseData.then(function (Response) {
        //    $scope.FavTemplateList = Response.data;
        //    //$scope.FavTemplateList.DrugList = [];
        //}, function (error) {
        //    $scope.Error = error;
        //});
        var ResponseData = Common.getMasterList('T_TemplateForPrescription', 'ID', 'TemplateName');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.TemplateList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_DrugSource', 'ID', 'Code');
        ResponseData.then(function (Response) {
            // Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DrugSourceList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });

    }
    $scope.GetTodaysPrecscription = function GetTodaysPrecscription() {

        var ResponseData = PrescriptionSrv.GetTodaysPrescriptionDetails();
        ResponseData.then(function (Response) {
            $scope.TodaysDrugs = Response.data;
            if ($scope.TodaysDrugs == null) {
                $scope.TodaysDrugs = {};
                $scope.TodaysDrugs.DrugList = [];
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.GetTemplateAndItems = function GetTemplateAndItems() {

        var response = PrescriptionSrv.GetTemplateAndItems();
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.FavTemplateList = resp.data;
            }
        });
    }
    $scope.OnChange = function OnChange(i) {
        if (i == 1) {
            $scope.IsBrand = 1;
            $scope.IsMolecule = 0;
            $scope.SelectedDrug = null;
            $scope.SelectedMolecule = null;
        }
        else if (i == 2) {
            $scope.IsMolecule = 1;
            $scope.IsBrand = 0;
            $scope.SelectedDrug = null;
            $scope.SelectedMolecule = null;
        }
    }
    $scope.onSelect1 = function ($item, $model, $label) {
        debugger;
        $scope.SelectedDrug = $model;
        if ($scope.IsBrand == true) {
            if ($scope.frmTdrugs.SelectedDrug.$valid) {
                var response = PrescriptionSrv.GetDrugDetailByItemID($scope.SelectedDrug.ID, UserInfo.UnitID);
                response.then(function (resp) {

                    if (resp.data != null) {

                        resp.data.AddedByName = UserInfo.UserName;
                        resp.data.Status = true;
                        if (resp.data.FrequencyID == undefined || resp.data.FrequencyID == null)
                            resp.data.FrequencyID = 0;
                        if (resp.data.RouteID == undefined || resp.data.RouteID == null)
                            resp.data.RouteID = 0;
                        if (resp.data.InstructionID == undefined || resp.data.InstructionID == null)
                            resp.data.InstructionID = 0;
                        if (SourceFrom == "Cycle Overview")
                            resp.data.DrugSourceId = 1;
                        else if (SourceFrom == "Stimulation")
                            resp.data.DrugSourceId = 2;
                        else if (SourceFrom == "Trigger")
                            resp.data.DrugSourceId = 3;
                        else if (SourceFrom == "Ovum Pick Up")
                            resp.data.DrugSourceId = 4;
                        else if (SourceFrom == "Embryo Transfer")
                            resp.data.DrugSourceId = 6;
                        else if (SourceFrom == "Outcome")
                            resp.data.DrugSourceId = 7;
                        else
                            resp.data.DrugSourceId = 0;
                        debugger;
                        $scope.TodaysDrugs.DrugList.push(resp.data);
                        $scope.frmTdrugs.SelectedDrug.$dirty = true;
                        $scope.SelectedDrug = null;
                        $scope.SelectedMolecule = null;
                    }
                });
            }
            else {
                $scope.frmTdrugs.SelectedDrug.$dirty = true;
            }
        }
        else {
            if ($scope.frmTdrugs.SelectedMolecule.$valid) {

                $scope.Molecule = $scope.SelectedMolecule;
                //for drug source set
                if (SourceFrom == "Cycle Overview")
                    $scope.DrugSourceId = 1;
                else if (SourceFrom == "Stimulation")
                    $scope.DrugSourceId = 2;
                else if (SourceFrom == "Trigger")
                    $scope.DrugSourceId = 3;
                else if (SourceFrom == "Ovum Pick Up")
                    $scope.DrugSourceId = 4;
                else if (SourceFrom == "Embryo Transfer")
                    $scope.DrugSourceId = 6;
                else if (SourceFrom == "Outcome")
                    $scope.DrugSourceId = 7;
                else
                    $scope.DrugSourceId = 0;

                $scope.Item = {
                    'Code': '', 'BrandName': '', 'ItemName': '', 'DrugID': 0, 'ID': 0, 'UOMID': 0, 'RouteID': 0, 'FrequencyID': 0, 'InstructionID': 0, 'DrugSourceId': $scope.DrugSourceId,
                    'MRP': 0, 'RouteName': '', 'AvailableStock': 0.0, 'UOM': '', 'Strength': '', 'IsABC': 0, 'StrengthUnitTypeID': 0, 'IsFNS': false, 'IsVED': false, 'IssueStatus': false,
                    'Days': '', 'Quantity': 0, 'Warning': '', 'ResultStatus': 0, 'Dose': '', 'Frequency': '', 'IsOther': 0, 'Reason': '',
                    'MoleculeID': $scope.Molecule.ID, 'MoleculeName': $scope.Molecule.Description, 'AddedByName': UserInfo.UserName, 'IsMolecule': true, Status: true
                }
                $scope.TodaysDrugs.DrugList.push($scope.Item);
            }
            else {
                $scope.frmTdrugs.SelectedMolecule.$dirty = true;
            }
            $scope.SelectedMolecule = null;
        }
    };
    $scope.AddDrug = function () {

        if ($scope.IsBrand == true) {
            if ($scope.frmTdrugs.SelectedDrug.$valid) {
                var response = PrescriptionSrv.GetDrugDetailByItemID($scope.SelectedDrug.ID, UserInfo.UnitID);
                response.then(function (resp) {

                    if (resp.data != null) {

                        resp.data.AddedByName = UserInfo.UserName;
                        resp.data.Status = true;
                        if (resp.data.FrequencyID == undefined || resp.data.FrequencyID == null)
                            resp.data.FrequencyID = 0;
                        if (resp.data.RouteID == undefined || resp.data.RouteID == null)
                            resp.data.RouteID = 0;
                        if (resp.data.InstructionID == undefined || resp.data.InstructionID == null)
                            resp.data.InstructionID = 0;
                        if (SourceFrom == "Cycle Overview")
                            resp.data.DrugSourceId = 1;
                        else if (SourceFrom == "Stimulation")
                            resp.data.DrugSourceId = 2;
                        else if (SourceFrom == "Trigger")
                            resp.data.DrugSourceId = 3;
                        else if (SourceFrom == "Ovum Pick Up")
                            resp.data.DrugSourceId = 4;
                        else if (SourceFrom == "Embryo Transfer")
                            resp.data.DrugSourceId = 6;
                        else if (SourceFrom == "Outcome")
                            resp.data.DrugSourceId = 7;
                        else
                            resp.data.DrugSourceId = 0;
                        debugger;
                        $scope.TodaysDrugs.DrugList.push(resp.data);
                        $scope.frmTdrugs.SelectedDrug.$dirty = true;
                        $scope.SelectedDrug = null;
                        $scope.SelectedMolecule = null;
                    }
                });
            }
            else {
                $scope.frmTdrugs.SelectedDrug.$dirty = true;
            }
        }
        else {
            if ($scope.frmTdrugs.SelectedMolecule.$valid) {

                $scope.Molecule = $scope.SelectedMolecule;
                //for drug source set
                if (SourceFrom == "Cycle Overview")
                    $scope.DrugSourceId = 1;
                else if (SourceFrom == "Stimulation")
                    $scope.DrugSourceId = 2;
                else if (SourceFrom == "Trigger")
                    $scope.DrugSourceId = 3;
                else if (SourceFrom == "Ovum Pick Up")
                    $scope.DrugSourceId = 4;
                else if (SourceFrom == "Embryo Transfer")
                    $scope.DrugSourceId = 6;
                else if (SourceFrom == "Outcome")
                    $scope.DrugSourceId = 7;
                else
                    $scope.DrugSourceId = 0;

                $scope.Item = {
                    'Code': '', 'BrandName': '', 'ItemName': $scope.Molecule.Description, 'DrugID': 0, 'ID': 0, 'UOMID': 0, 'RouteID': 0, 'FrequencyID': 0, 'InstructionID': 0, 'DrugSourceId': 0,
                    'MRP': 0, 'RouteName': '', 'AvailableStock': 0.0, 'UOM': '', 'Strength': '', 'IsABC': 0, 'StrengthUnitTypeID': 0, 'IsFNS': false, 'IsVED': false, 'IssueStatus': false,
                    'Days': '', 'Quantity': 0, 'Warning': '', 'ResultStatus': 0, 'Dose': '', 'Frequency': '', 'IsOther': 0, 'Reason': '',
                    'MoleculeID': $scope.Molecule.ID, 'MoleculeName': $scope.Molecule.Description, 'AddedByName': UserInfo.UserName, 'IsMolecule': true, Status: true
                }
                $scope.TodaysDrugs.DrugList.push($scope.Item);
            }
            else {
                $scope.frmTdrugs.SelectedMolecule.$dirty = true;
            }
            $scope.SelectedMolecule = null;
        }
    }
    $scope.AddOtherDrug = function () {
        $scope.disableClick = false; //Added by Nayan Kamble on 13/06/2019
        $scope.Item = {
            'Code': '', 'BrandName': '', 'ItemName': '', 'DrugID': 0, 'ID': 0, 'UOMID': 0, 'RouteID': 0, 'FrequencyID': 0, 'InstructionID': 0, 'DrugSourceId': 1,
            'MRP': 0, 'RouteName': '', 'AvailableStock': 0.0, 'UOM': '', 'Strength': '', 'IsABC': 0, 'StrengthUnitTypeID': 0, 'IsFNS': 0, 'IsVED': 0, 'IssueStatus': 0,
            'Days': '', 'Quantity': 0, 'Warning': '', 'ResultStatus': 0, 'Dose': '', 'Frequency': '', 'IsOther': 1, 'Reason': '',
            'MoleculeID': 0, 'MoleculeName': '', 'AddedByName': UserInfo.UserName, 'IsMolecule': 0, 'Status': true
        }
        $scope.TodaysDrugs.DrugList.push($scope.Item);
        debugger;
    }

    $scope.SetQuantityIfTopical = function (Item, Idx) {
        debugger;
        //RouteID==5 [Topical]
        if (Item.RouteID == 5) {
            angular.forEach($scope.TodaysDrugs.DrugList, function (item, index) {
                debugger;
                if (Idx == index) {
                    $scope.TodaysDrugs.DrugList[index].Quantity = 1;
                }
            })
        } else {
            $scope.CalQuantity(Item, Idx);
        }
    }

    $scope.RemoveAddDrugRow = function (Index, Item) {
        debugger;
        if (Item.ID >= 1) {

            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                templateUrl: 'DeleteTodaysmodel',
                controller: 'DeleteTodaysModelInfo',
                backdrop: false,
                keyboard: false,
                size: 'md',
                //resolve: {
                //    DeleteInfo: function () {
                //        return Item;
                //    }
                //}
            });
            modalInstance.result.then(function (data) { // return here after cancel reason entered
                if (!angular.equals({}, data)) {  //this scope is executed when save is click
                    Item.Comment = data.Comment;
                    Item.Status = false;
                    $scope.IsDelete = true;
                    $scope.SavePrescription();
                }
                else {
                    AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
                }
            });
        }
        else {
            $scope.TodaysDrugs.DrugList.splice(Index, 1);
        }
    };


    //Begin::Added by Nayan Kamble  on 13/06/2019
    $scope.ClearSavePrescription = function ClearSavePrescription() {
        $scope.disableClick = false;
    }
    $scope.SavePrescription = function SavePrescription() {
        debugger;
        $scope.disableClick = true; //Added by Nayan Kamble  on 13/06/2019
        //$scope.IsDelete = false;             commented by Nayan Kamble on 14/06/2019
        //if (validSavePrescription()) {
        //    var ResponseData = PrescriptionSrv.SavePrescription($scope.TodaysDrugs);
        //    ResponseData.then(function (Response) {

        //        if (Response.data != null) {
        //            if (Response.data > 0) {
        //                AlertMessage.success("Save Sucessfully");
        //                $scope.PageSetup();
        //            }
        //            else {
        //                AlertMessage.success("Error Occured While Processing");
        //            }
        //        }
        //    }, function (error) {
        //        $scope.Error = error;
        //    });

        //}

        //}
        //function validSavePrescription() {
        //    debugger;
        //for (var i = 0; i < $scope.TodaysDrugs.DrugList.length; i++) {
        //    if ($scope.TodaysDrugs.DrugList[i].ItemName == '' || $scope.TodaysDrugs.DrugList[i].ItemName == null) {
        //        AlertMessage.info('Palash IVF', 'Drug Name should not be empty');
        //        return false;
        //    }            
        //}
        //return true;



        if ($scope.TodaysDrugs.DrugList.length > 0) {
            $scope.ItemNameList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.IsOther == 1 && d.ItemName == "" });
            if ($scope.ItemNameList.length > 0) {
                angular.forEach($scope.ItemNameList, function (item) {
                    item.DirtyItemName = true;
                })
            }

            $scope.FrequencyListList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.FrequencyID === 0 });
            if ($scope.FrequencyListList.length > 0) {
                angular.forEach($scope.FrequencyListList, function (item) {
                    item.DirtyFrequencyID = true;
                    //AlertMessage.warning("PalashIVF", "Please fill mandatory fields");    //Commented by swatih for localization 29/7/2020     // Added by Nayan Kamble on 21/06/2019   
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillmandatoryfields); //Modified by swatih for localization 29/7/2020
                })
            }
            $scope.RoutevalidList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.RouteID === 0 });
            if ($scope.RoutevalidList.length > 0) {
                angular.forEach($scope.RoutevalidList, function (item) {
                    item.DirtyRouteID = true;
                })
            }

            //$scope.StrengthList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.IsOther == 1 && d.Strength == "" });
            //if ($scope.StrengthList.length > 0) {
            //    angular.forEach($scope.StrengthList, function (item) {
            //        item.DirtyStrength = true;
            //    })
            //}
            $scope.QuantityList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.Quantity == 0 });
            if ($scope.QuantityList.length > 0) {
                angular.forEach($scope.QuantityList, function (item) {
                    item.DirtyQuantity = true;
                })
            }
            // Added by Nayan Kamble on 21/06/2019  START
            $scope.DaysList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.Days == undefined || d.Days == 0 });          // d.Days == undefined ||    added by Nayan Kamble on 17/12/2019               
            if ($scope.DaysList.length > 0) {
                angular.forEach($scope.DaysList, function (item) {
                    item.DirtyDays = true;
                    //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillmandatoryfields); //Modified by swatih for localization 29/7/2020
                })
            }
            // Added by Nayan Kamble on 21/06/2019  END


            $scope.DuplicateList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.IsDuplicate == true });
            if ($scope.DuplicateList.length > 0) {
                angular.forEach($scope.DuplicateList, function (item) {
                    item.DirtyQuantity = true;
                })
            }
            if ($scope.DuplicateList.length != 0) {
                //AlertMessage.success("PalashIVF", "Please Check Duplicate Values"); //Commented by swatih for localization 29/7/2020
                AlertMessage.success(objResource.msgTitle, objResource.msgPleaseCheckDuplicateValues); //Modified by swatih for localization 29/7/2020
            }
            else if ($scope.FrequencyListList.length == 0 && $scope.RoutevalidList.length == 0 && $scope.QuantityList.length == 0 && $scope.ItemNameList.length == 0 && $scope.DaysList.length == 0) // && $scope.StrengthList.length == 0             //&& $scope.DaysList.length == 0  Added by Nayan Kamble on 21/06/2019
            {
                var ResponseData = PrescriptionSrv.SavePrescription($scope.TodaysDrugs);
                ResponseData.then(function (Response) {

                    if (Response.data != null) {
                        if (Response.data > 0) {
                            if ($scope.IsDelete == true) {
                                //AlertMessage.success("PalashIVF", "Record Deleted Sucessfully!"); //Commented by swatih for localization 29/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgRecorddeletedsuccessfully); //Modifed by swatih for localization 29/7/2020
                            }                            
                            else {

                                //$scope.TodaysDrugs.PrescriptionFollowUpDate = $filter('date')($scope.TodaysDrugs.PrescriptionFollowUpDate, 'medium');
                                ///AlertMessage.success("PalashIVF", "Record Saved Sucessfully!"); //Commented by swatih for localization 29/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgSave); //Modified by swatih for localization 29/7/2020
                                $scope.ClearSavePrescription();    //Added by Nayan Kamble on 13/06/2019
                            }
                            // AlertMessage.success("Save Sucessfully");
                            $scope.PageSetup();
                            $scope.IsDelete = false;            // Added by Nayan Kamble on 14/06/2019
                        }
                        else {
                            // AlertMessage.success("Error Occured While Processing"); //Commented by swatih for localization 29/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccuredWhileProcessing); //Modified by swatih for localization 29/7/2020
                        }
                        
                    }
                }, function (error) {
                    $scope.Error = error;
                });

            }
            
        }

        else {
            //AlertMessage.warning("PalashIVF", "Drug List is Empty"); //Commented by swatih for localization 29/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgDrugListisEmpty);//Modified by swatih for localization 29/7/2020
            $scope.ClearSavePrescription();    //Added by Nayan Kamble on 13/06/2019
        }
        
    }


    //}
    $scope.Cancel = function () {
        debugger;
        $uibModalInstance.dismiss('cancel');
    }
    $scope.PrintActionbuttionPrescriptions = function PrintActionbuttionPrescriptions() {
        debugger;
        $scope.Report = {};
        $scope.Report.UnitID = localStorageService.get("UserInfo").UnitID;
        if (selectPatient.GenderID == 1) {

            $scope.Report.VisitID = SelectedCouple.MalePatient.Selectedvisit.VisitID;
            $scope.Report.VisitUnitID = SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
            $scope.Report.PatientID = SelectedCouple.MalePatient.MaleId;
            $scope.Report.PatientUnitID = SelectedCouple.MalePatient.MAleUnitID;

        }
        else if (selectPatient.GenderID == 2) {
            $scope.Report.VisitID = SelectedCouple.FemalePatient.Selectedvisit.VisitID;
            $scope.Report.VisitUnitID = SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
            $scope.Report.PatientID = SelectedCouple.FemalePatient.FemalePatientID;
            $scope.Report.PatientUnitID = SelectedCouple.FemalePatient.FemalePatientUnitID;
        }


        if ($scope.TodaysDrugs.DrugList.length == 0) {
            debugger;
            // AlertMessage.error(objResource.msgTitle, "You can add first prescription "); //Commented by swatih for localization 29/7/2020
            AlertMessage.error(objResource.msgTitle, objResource.msgYoucanaddfirstprescription); //Modified by swatih for localization 29/7/2020
        }
        else {
            debugger;
            var a = encodeURIComponent('U=' + $scope.Report.UnitID + '&VU=' + $scope.Report.VisitUnitID + '&V=' + $scope.Report.VisitID + '&P=' + $scope.Report.PatientID + '&PU=' + $scope.Report.PatientUnitID);
            window.open('/Reports/EMR/PriscriptionWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
        }

    }

    $scope.CheckDuplicate = function (Item, Index) {
        $scope.disableClick = false; //Added by Nayan Kamble on 13/06/2019   
        if (Item.RouteID == 5) {
            Item.Quantity = 1;
        }
        $scope.RouteChkList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.RouteID != 0 || d.FrequencyID != 0 });
        if (Item.RouteID != 0 && Index != undefined) {
            angular.forEach($scope.RouteChkList, function (element, i) {
                if (element.ItemName == Item.ItemName && element.RouteID == Item.RouteID && element.FrequencyID == Item.FrequencyID && Index != i) {
                    element.IsDuplicate = true;
                }
                else
                    element.IsDuplicate = false;
            });
        }
    }
    $scope.CalQuantity = function (Items, Index) {
        debugger;
        $scope.disableClick = false; //Added by Nayan Kamble on 13/06/2019
        $scope.FreqQty = 0;
        angular.forEach($scope.FrequencyList, function (Item) {
            if (Items.FrequencyID == Item.ID) {
                $scope.FreqQty = Item.FreqQuantity;
            }
        });

        if (Items.Days >= 0 && Items.Days <= 365) {      //Added by Nayan Kamble
            Items.Quantity = $scope.FreqQty * Items.Days;
        }
        else {
            //AlertMessage.warning("PalashIVF", "Enter Days Between 1 to 365");  //Commented by swatih for localization 29/7/2020     //Added by Nayan Kamble
            AlertMessage.warning(objResource.msgTitle, objResource.msgEnterDaysBetween1to365); //Modified by swatih for localization 29/7/2020
            $scope.disableClick = false; //Added by Nayan Kamble on 17/12/2019
        }
        //Items.Quantity = $scope.FreqQty * Items.Days;   //Commented by Nayan Kamble
        $scope.CheckDuplicate(Items, Index);
    }

    // For prescription end
});
PIVF.controller('DeleteTodaysModelInfo', function ($scope, $uibModalInstance, AlertMessage) { //DeleteInfo,
    //$scope.DeleteInfo = DeleteInfo;
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.Delete = function (Item) {

        if ($scope.frmTodaysReason.Comment.$valid) {
            if (Item != undefined)
            { $uibModalInstance.close(Item); }
        }
            //else { AlertMessage.warning("Please Enter Reason"); } //Commented by swatih for localization 29/7/2020
        else { AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseEnterReason); } //Modified by swatih for localization 29/7/2020
    }
});
PIVF.controller('MediaPopUp', function ($rootScope, $scope, $uibModal, $uibModalInstance, MediaConsumptionSrv, $filter, Common, AlertMessage) {
    //======================================================= For Media start=============================
    var UserInfo = localStorageService.get("UserInfo");
    $scope.SearchData = {};
    $scope.SearchData.UnitID = 0;
    $scope.MediaConsumption = [];
    $scope.MediaDetails = [];
    $scope.Search = "";
    $scope.popup1 = {
        opened1: false
    };
    $scope.open1 = function ($event, item) {

        $event.preventDefault();
        $event.stopPropagation();
        item.opened1 = true;
    };
    $scope.PageSetup = function () {
        $scope.GetItemList();
        $scope.GetMediaList();
        $scope.FillDropDowns();
    }
    $scope.GetItemList = function () {
        var response = MediaConsumptionSrv.GetItemsByClinic($scope.SearchData.UnitID);
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.ItemList = resp.data;
            }
        });
    }
    $scope.GetMediaList = function () {
        var response = MediaConsumptionSrv.GetMediaList($scope.Search);
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.MediaDetails = resp.data;
                angular.forEach($scope.MediaDetails, function (Item) {
                    if (Item.Finalized) {
                        Item.RowDisable = true;
                    }
                });
            }
        });
    }
    $scope.FillDropDowns = function () {
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ClinicList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_MediaProcedure', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MediaProcedureList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_UnitOfMeasure', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.UOMList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.GetMatchingItems = function ($viewValue) {
        var matchingStuffs = [];

        for (var i = 0; i < $scope.ItemList.length; i++) {
            if (
              $scope.ItemList[i].Code.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.ItemList[i]);
            }
        }
        return matchingStuffs;
    }
    $scope.AddDrug = function () {

        $scope.ProcedureID = 0;
        if ($rootScope.FormName == "Semen Details")
            $scope.ProcedureID = 12;
        if ($rootScope.FormName == "Embrology")
            $scope.ProcedureID = 1;
        if ($rootScope.FormName == "Oocyte Vitrification")
            $scope.ProcedureID = 8;
        if ($rootScope.FormName == "Oocyte Thowing")
            $scope.ProcedureID = 10;
        if ($rootScope.FormName == "Embryo Vitrification")
            $scope.ProcedureID = 9;
        if ($rootScope.FormName == "Embryo Thowing")
            $scope.ProcedureID = 11;

        var ItemDetails = $scope.SelectedItem;
        $scope.Item = {
            'ID': 0, 'UnitID': 0, 'ItemID': ItemDetails.ID, 'ItemCode': ItemDetails.Code, 'ItemName': ItemDetails.ItemName, 'BatchID': 0,
            'BatchName': '', 'ExpiryDate': null, 'UsedQty': 0, 'UOMID': 0, 'ProcedureID': $scope.ProcedureID, 'Status': true, 'Finalized': false
        }
        $scope.MediaConsumption.push($scope.Item);
    }
    $scope.RemoveAddDrugRow = function (Index, Item) {
        $scope.MediaConsumption.splice(Index, 1);
    }
    $scope.RemoveAddDrugRow1 = function (Index, Item) {

        if (Item.ID >= 1) {

            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                templateUrl: 'DeleteTodaysmodel',
                controller: 'DeleteTodaysModelInfo',
                backdrop: false,
                keyboard: false,
                size: 'md',
                //resolve: {
                //    DeleteInfo: function () {
                //        return Item;
                //    }
                //}
            });
            modalInstance.result.then(function (data) { // return here after cancel reason entered
                if (!angular.equals({}, data)) {  //this scope is executed when save is click
                    Item.Reason = data.Comment;
                    Item.Status = false;
                    $scope.SaveFinalizedMedia();
                }
                else {
                    AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
                }
            });
        }
        else {
            $scope.MediaDetails.splice(Index, 1);
        }
    };
    $scope.SaveMedia = function () {

        var ResponseData = MediaConsumptionSrv.SaveMedia($scope.MediaConsumption);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                if (Response.data > 0) {
                    //AlertMessage.success("Save Sucessfully"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgSaveSucessfully);//Modified by swatih for localization 29/7/2020
                    $scope.MediaConsumption = [];
                    $scope.PageSetup();
                }
                else {
                    // AlertMessage.success("Error Occured While Processing"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccuredWhileProcessing);//Modifed by swatih for localization 29/7/2020
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.SaveFinalizedMedia = function () {

        var ResponseData = MediaConsumptionSrv.SaveFinalizedMedia($scope.MediaDetails);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                if (Response.data > 0) {
                    //AlertMessage.success("Save Sucessfully"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgSaveSucessfully); //Modifed by swatih for localization 29/7/2020
                    $scope.MediaDetails = [];
                    $scope.PageSetup();
                }
                else {
                    // AlertMessage.success("Error Occured While Processing"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccuredWhileProcessing); //Modified by swatih for localization 29/7/2020
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    // For prescription end
});
PIVF.controller('ConsentPopUp', function ($rootScope, $scope, $uibModal, $uibModalInstance, ConsentActionSrv, $filter, Common, AlertMessage, localStorageService) {
    //======================================================= For Media start=============================
    var UserInfo = localStorageService.get("UserInfo");
    $scope.ConsentDetails = {};
    $scope.ConsentList = {};
    $scope.Search = {};
    $scope.model = {};
    $scope.PageSetup = function () {
        $scope.GetConsenGrid();
        $scope.FillDropDowns();
    }
    $scope.GetConsenGrid = function () {
        debugger;
        var response = ConsentActionSrv.GetConsenGrid();
        response.then(function (resp) {

            if (resp.data != null) {

                $scope.ConsentGridList = resp.data;
            }
        });
    }
    $scope.FillDropDowns = function () {

        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ClinicList = Response.data;
            $scope.ConsentDetails.SelectedUnitID = 0
        }, function (error) {
            $scope.Error = error;
        });
        //fill Available Consent List
        $scope.SelectedPatient = Common.getSelectedPatient();
        $scope.SelectedCouple = Common.getSelectedCouple();
        $scope.ArtTypeID = $scope.SelectedCouple.FemalePatient.ArtTypeID;
        $scope.ArtSubTypeID = $scope.SelectedCouple.FemalePatient.ArtSubTypeID;
        var response = ConsentActionSrv.GetConsentList($scope.ArtTypeID, $scope.ArtSubTypeID);
        response.then(function (resp) {
            debugger;
            if (resp.data != null) {
                debugger;
                resp.data.splice(0, 0, { ID: 0, Description: 'Select' });
                $scope.ConsentList = resp.data;
                $scope.Search.ConsentID = 0;
            }
        });
    }
    $scope.AddConsent = function (ID, UnitID) {

        $scope.ConsentDetails.ConsentID = $scope.Search.ConsentID;
        if ($scope.ConsentDetails.ID == undefined)
            $scope.ConsentDetails.ID = 0;
        var response = ConsentActionSrv.GetConsentDetails(UnitID, ID, $scope.ConsentDetails.ConsentID);
        response.then(function (resp) {

            if (resp.data != null) {
                $scope.ConsentDetails = resp.data;
                $scope.ConsentDetails.SelectedUnitID = UserInfo.UnitID;
                $scope.form = null;
                $scope.form = JSON.parse($scope.ConsentDetails.FormDesc);
                $scope.schema = null;
                $scope.schema = JSON.stringify($scope.ConsentDetails.SchemaDesc);
                $scope.model = null;
                $scope.model = JSON.stringify($scope.ConsentDetails.ModelDesc);
                $scope.htmlForm = null;
                $scope.htmlForm = $scope.ConsentDetails.HTMLDesc;
            }
        })
    }
    $scope.ViewReport = function (item) {
        var obj = {};
        obj.ID = item.ID;
        obj.UnitID = item.UnitID;
        var Promise = ConsentActionSrv.ViewReport(obj.ID, obj.UnitID);
        Promise.then(function (resp) {
            debugger;
            $scope.extn = resp.data.strReport.substring(resp.data.strReport.indexOf(':') + 1, resp.data.strReport.indexOf('/'));
            $scope.FileName = resp.data.FileName;
            if ($scope.extn == 'image') {
                $scope.Image = null;
                $scope.Image = resp.data.strReport;
                $scope.content = '';
            }
            else {
                $scope.content = resp.data.strReport;
                $scope.Image = null;
                //window.open($scope.content);
            }
            angular.element(myModal_con).modal('show');
        }, function (error) {
        })
    }
    String.prototype.replaceAt = function (index, replacement) {

        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    $scope.SaveConsent = function () {
        debugger;
        $scope.UpdateForm();
        $scope.ConsentDetails.FormDesc = JSON.stringify($scope.form);
        $scope.ConsentDetails.SchemaDesc = JSON.stringify($scope.schema);
        $scope.ConsentDetails.HTMLDesc = $scope.htmlForm;
        $scope.ConsentDetails.ModelDesc = JSON.stringify($scope.model);
        var ResponseData = ConsentActionSrv.SaveConsent($scope.ConsentDetails);
        ResponseData.then(function (Response) {
            debugger;
            if (Response.data != null) {
                if (Response.data > 0) {
                    // AlertMessage.success("Save Sucessfully"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgSaveSucessfully);//Modified by swatih for localization 29/7/2020
                    $scope.PageSetup();
                    $uibModalInstance.dismiss('cancel');
                }
                else {
                    // AlertMessage.success("Error Occured While Processing"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccuredWhileProcessing); //Modified by swatih for localization 29/7/2020
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.SaveUpdateFile = function () {
        debugger;
        $scope.FileStr = $scope.myImage;
        var ResponseData = ConsentActionSrv.SaveUpdateFile($scope.ConsentGridList);
        ResponseData.then(function (Response) {
            debugger;
            if (Response.data != null) {
                if (Response.data > 0) {
                    //AlertMessage.success("Record Saved Sucessfully!"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgRecordSavedSucessfully); //Modified by swatih for localization 29/7/2020
                    $scope.PageSetup();

                }
                else {
                    //AlertMessage.success("Error Occured While Processing"); //Commented by swatih for localization 29/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccuredWhileProcessing); //Modified by swatih for localization 29/7/2020
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.OpenForm = function (templateUrl) {
        debugger;
        var modalInstance = $uibModal.open({
            templateUrl: templateUrl,
            controller: 'ShowForm',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            resolve: {

                htmlForm: function () {
                    return $scope.htmlForm;
                }
            }
        });
        modalInstance.result.then(function (data) {
            if (!angular.equals({}, data)) {
                debugger;
                Item.Reason = data;
            }
            else {
                AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
            }
        })
    }
    $scope.UpdateForm = function () {
        debugger;
        $scope.PatientDetails = {};
        $scope.PatientDetails.PName = '{{PName}}';
        $scope.PatientDetails.PAge = '{{PAge}}';
        $scope.PatientDetails.PAddr = '{{PAddr}}';
        $scope.PatientDetails.SName = '{{SName}}';
        $scope.PatientDetails.SAge = '{{SAge}}';
        $scope.PatientDetails.SAddr = '{{SAddr}}';
        $scope.PatientDetails.MDName = '{{MDName}}';
        $scope.PatientDetails.MDMrn = '{{MDMrn}}';
        $scope.PatientDetails.MDAddr = '{{MDAddr}}';
        $scope.PatientDetails.FDName = '{{FDName}}';
        $scope.PatientDetails.FDMrn = '{{FDMrn}}';
        $scope.PatientDetails.FDAddr = '{{FDAddr}}';
        $scope.PatientDetails.DocName = '{{DocName}}';
        $scope.PatientDetails.SurrName = '{{SurrName}}';
        $scope.PatientDetails.SurrAge = '{{SurrAge}}';
        $scope.PatientDetails.SurrAddr = '{{SurrAddr}}';
        $scope.PatientDetails.SurrSName = '{{SurrSName}}';
        $scope.PatientDetails.SurrSAge = '{{SurrSAge}}';
        $scope.PatientDetails.SurrSAddr = '{{SurrSAddr}}';

        var i = -1;
        var ch_ind = [];
        var tb_ind = [];
        var dt_ind = [];
        while ((i = $scope.htmlForm.indexOf("checkbox1", i + 1)) != -1) {
            ch_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("input1", i + 1)) != -1) {
            tb_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("datepicker1", i + 1)) != -1) {
            dt_ind.push(i);
        }
        for (var j = 0; j < ch_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(ch_ind[j] + 8, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < tb_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(tb_ind[j] + 5, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < dt_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(dt_ind[j] + 10, String.fromCharCode(49 + j));
        }
        $scope.schema = {
            "type": "object",
            "title": "Consent",
            "properties": {
                "template1": {
                    "type": "template",
                    "title": "Consent"
                }
            }
        };
        $scope.form = [
            {
                type: "template",
                name: "template1",
                template: $scope.htmlForm,
                doctorname: $scope.myname,
                checkbox1: false,
                checkbox2: false,
                checkbox3: false,
                checkbox4: false,
                checkbox5: false,
                checkbox6: false,
                checkbox7: false,
                checkbox8: false,
                checkbox9: false,
                checkbox10: false,
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: '',
                input7: '',
                input8: '',
                input9: '',
                input10: '',
                datepicker1: '',
                datepicker2: '',
                datepicker3: '',
                datepicker4: '',
                datepicker5: '',
                datepicker6: '',
                datepicker7: '',
                datepicker8: '',
                datepicker9: '',
                datepicker10: '',
                PName: $scope.PatientDetails.PName,
                PAge: $scope.PatientDetails.PAge,
                PAddr: $scope.PatientDetails.PAddr,
                SName: $scope.PatientDetails.SName,
                SAge: $scope.PatientDetails.SAge,
                SAddr: $scope.PatientDetails.SAddr,
                MDName: $scope.PatientDetails.MDName,
                MDMrn: $scope.PatientDetails.MDMrn,
                MDAddr: $scope.PatientDetails.MDAddr,
                FDName: $scope.PatientDetails.FDName,
                FDMrn: $scope.PatientDetails.FDMrn,
                FDAddr: $scope.PatientDetails.FDAddr,
                DocName: $scope.PatientDetails.DocName,
                SurrName: $scope.PatientDetails.SurrName,
                SurrAge: $scope.PatientDetails.SurrAge,
                SurrAddr: $scope.PatientDetails.SurrAddr,
                SurrSName: $scope.PatientDetails.SurrSName,
                SurrSAge: $scope.PatientDetails.SurrSAge,
                SurrSAddr: $scope.PatientDetails.SurrSAddr,
            },
        ];
    }
    $scope.handleFileSelect = function (evt) {
        debugger;
        //var file = evt.currentTarget.files[0];
        $scope.ID = parseInt(evt.id);
        var file = evt.files[0];
        var extn = file.name.split(".").pop().toLowerCase();
        var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
        var validExtension = false;
        $scope.filename = file.name;
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

                        if (angular.isDefined($scope.myImage) && $scope.myImage != '') {
                            angular.forEach($scope.ConsentGridList, function (Item) {
                                if (Item.ID == $scope.ID) {
                                    Item.FileStr = $scope.myImage;
                                    Item.FileName = $scope.filename;
                                    Item.IsFileUploaded = true;
                                    $scope.ID = 0;
                                }
                            });
                        }
                    });
                };
                reader.readAsDataURL(file);


            }
            else {
                // AlertMessage.info('PalashIVF', 'Attactment should be not greater than 2 MB.'); //Commented by swatih for localization 29/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAttactmentshouldbenotgreaterthan2MB);//Modified by swatih for localization 29/7/2020
            }
        }
        else {
            //AlertMessage.info('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.'); //Commented by swatih for localization 29/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgAttactmentshouldbeinpng_jpeg_pdf_format); //Modified by swatih for localization 29/7/2020
        }

    }
    $scope.SaveReport = function () {
        debugger;
        // window.win = open($scope.Image);
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', $scope.Image);
        downloadLink.attr('download', $scope.FileName);
        downloadLink.attr('target', '_self');
        angular.element(document.body).append(downloadLink);  //added to support firefox
        downloadLink[0].click();//call click function
        //  url.revokeObjectURL($scope.Image);//revoke the object from URL
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.Close = function () {
        angular.element(myModal_con).modal('hide');
    }

});
PIVF.controller('ShowForm', function ($rootScope, $scope, Common, htmlForm, $uibModalInstance, $filter, localStorageService) {
    debugger;
    var UserInfo = localStorageService.get("UserInfo");
    $scope.SelectedPatient = Common.getSelectedPatient();
    $scope.CoupleDetails = Common.getSelectedCouple();
    $scope.FPatient = $scope.CoupleDetails.FemalePatient;
    $scope.MPatient = $scope.CoupleDetails.MalePatient;
    $scope.PatientDetails = {};

    if ($scope.SelectedPatient.PatientCategoryID == 7)  //couple
    {
        //Female Patient Details
        if ($scope.FPatient.FemalePatientName != undefined || $scope.FPatient.FemalePatientName != "")
            $scope.PatientDetails.PName = $scope.FPatient.FemalePatientName;
        else
            $scope.PatientDetails.PName = '{{PName}}';
        if ($scope.FPatient.FemaleAgeInYr != null || $scope.FPatient.FemaleAgeInYr != 0)
            $scope.PatientDetails.PAge = $scope.FPatient.FemaleAgeInYr;
        else
            $scope.PatientDetails.PAge = '{{PAge}}';
        if ($scope.FPatient.FAddress != undefined || $scope.FPatient.FAddress != "")
            $scope.PatientDetails.PAddr = $scope.FPatient.FAddress;
        else
            $scope.PatientDetails.PAddr = '{{PAddr}}';
        //Male Patient Details
        if ($scope.MPatient.MalePatientName != undefined || $scope.MPatient.MalePatientName != "")
            $scope.PatientDetails.SName = $scope.MPatient.MalePatientName;
        else
            $scope.PatientDetails.SName = '{{SName}}';
        if ($scope.MPatient.MaleAgeInYr != null || $scope.MPatient.MaleAgeInYr != 0)
            $scope.PatientDetails.SAge = $scope.MPatient.MaleAgeInYr;
        else
            $scope.PatientDetails.SAge = '{{SAge}}';
        if ($scope.MPatient.MAddress != undefined || $scope.MPatient.MAddress != "")
            $scope.PatientDetails.SAddr = $scope.MPatient.MAddress;
        else
            $scope.PatientDetails.SAddr = '{{SAddr}}';
    }
    else {
        if ($scope.FPatient.IsDonor == true) {
            //For Female Donor 
            if ($scope.FPatient.FemalePatientName != undefined || $scope.FPatient.FemalePatientName != "")
                $scope.PatientDetails.FDName = $scope.FPatient.FemalePatientName;
            else
                $scope.PatientDetails.FDName = '{{FDName}}';
            if ($scope.FPatient.FemaleMRNO != null || $scope.FPatient.FemaleMRNO != 0)
                $scope.PatientDetails.FDMrn = $scope.FPatient.FemaleMRNO;
            else
                $scope.PatientDetails.FDMrn = '{{FDMrn}}';
            if ($scope.FPatient.FAddress != undefined || $scope.FPatient.FAddress != "")
                $scope.PatientDetails.FDAddr = $scope.FPatient.FAddress;
            else
                $scope.PatientDetails.FDAddr = '{{FDAddr}}';
        }
        else if ($scope.MPatient.IsDonor == true) {
            //For Male Donor 
            if ($scope.MPatient.MalePatientName != undefined || $scope.MPatient.MalePatientName != "")
                $scope.PatientDetails.MDName = $scope.MPatient.MalePatientName;
            else
                $scope.PatientDetails.MDName = '{{MDName}}';
            if ($scope.MPatient.MaleMRNO != null || $scope.MPatient.MaleMRNO != 0)
                $scope.PatientDetails.MDMrn = $scope.MPatient.MaleMRNO;
            else
                $scope.PatientDetails.MDMrn = '{{MDMrn}}';
            if ($scope.MPatient.MAddress != undefined || $scope.MPatient.MAddress != "")
                $scope.PatientDetails.MDAddr = $scope.MPatient.MAddress;
            else
                $scope.PatientDetails.MDAddr = '{{MDAddr}}';
        }
    }
    if (UserInfo.UserName != undefined)
        $scope.PatientDetails.DocName = UserInfo.UserName;
    else
        $scope.PatientDetails.DocName = '{{DocName}}';
    //Temp
    $scope.PatientDetails.SurrName = '{{SurrName}}';
    $scope.PatientDetails.SurrAge = '{{SurrAge}}';
    $scope.PatientDetails.SurrAddr = '{{SurrAddr}}';
    $scope.PatientDetails.SurrSName = '{{SurrSName}}';
    $scope.PatientDetails.SurrSAge = '{{SurrSAge}}';
    $scope.PatientDetails.SurrSAddr = '{{SurrSAddr}}';
    //
    $scope.htmlForm = htmlForm;
    $scope.updateForm = function () {

        var i = -1;
        var ch_ind = [];
        var tb_ind = [];
        var dt_ind = [];
        while ((i = $scope.htmlForm.indexOf("checkbox1", i + 1)) != -1) {
            ch_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("input1", i + 1)) != -1) {
            tb_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("datepicker1", i + 1)) != -1) {
            dt_ind.push(i);
        }
        for (var j = 0; j < ch_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(ch_ind[j] + 8, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < tb_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(tb_ind[j] + 5, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < dt_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(dt_ind[j] + 10, String.fromCharCode(49 + j));
        }
        $scope.schema = {
            "type": "object",
            "title": "Consent",
            "properties": {
                "template1": {
                    "type": "template",
                    "title": "Consent"
                }
            }
        };
        $scope.form = [
          {
              type: "template",
              name: "template1",
              template: $scope.htmlForm,
              doctorname: $scope.myname,
              checkbox1: false,
              checkbox2: false,
              checkbox3: false,
              checkbox4: false,
              checkbox5: false,
              checkbox6: false,
              checkbox7: false,
              checkbox8: false,
              checkbox9: false,
              checkbox10: false,
              input1: '',
              input2: '',
              input3: '',
              input4: '',
              input5: '',
              input6: '',
              input7: '',
              input8: '',
              input9: '',
              input10: '',
              datepicker1: '',
              datepicker2: '',
              datepicker3: '',
              datepicker4: '',
              datepicker5: '',
              datepicker6: '',
              datepicker7: '',
              datepicker8: '',
              datepicker9: '',
              datepicker10: '',
              //data: $scope.PatientDetails.data,
              PName: $scope.PatientDetails.PName,
              PAge: $scope.PatientDetails.PAge,
              PAddr: $scope.PatientDetails.PAddr,
              SName: $scope.PatientDetails.SName,
              SAge: $scope.PatientDetails.SAge,
              SAddr: $scope.PatientDetails.SAddr,
              MDName: $scope.PatientDetails.MDName,
              MDMrn: $scope.PatientDetails.MDMrn,
              MDAddr: $scope.PatientDetails.MDAddr,
              FDName: $scope.PatientDetails.FDName,
              FDMrn: $scope.PatientDetails.FDMrn,
              FDAddr: $scope.PatientDetails.FDAddr,
              DocName: $scope.PatientDetails.DocName,
              SurrName: $scope.PatientDetails.SurrName,
              SurrAge: $scope.PatientDetails.SurrAge,
              SurrAddr: $scope.PatientDetails.SurrAddr,
              SurrSName: $scope.PatientDetails.SurrSName,
              SurrSAge: $scope.PatientDetails.SurrSAge,
              SurrSAddr: $scope.PatientDetails.SurrSAddr,
          },
        ];
        console.log($scope.form);

    }
    $scope.showPDF = function () {

        html2canvas(document.getElementById('consentForm'), {
            dpi: 144,
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                console.log(data);
                var docDefinition = {
                    content: [{
                        image: data
                    }]
                };
                pdfMake.createPdf(docDefinition).open();
            }
        });
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
});
PIVF.controller('EMRTemplateModalCtr', function ($rootScope, $scope, EMRTemplateSrv, DesignEMRSrv , $location, Common, $uibModal,$uibModalInstance, AlertMessage, usSpinnerService) {

    // $rootScope.FormName = 'EMR Template';

    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    var FormID = Common.getTempID();
    var TempID = Common.getUltraTempID(); 
 
    
    Common.clearTempID();
    Common.clearUltraTempID();
    $scope.hideDICOM=(FormID===3)? false :true;
    $rootScope.FormName = Common.getString();
    Common.clearString();
    $scope.btnSaveUpdatetext = 'Save';  // Added by Nayan 

    //selected patient set 
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();    
    if(FormID == 10012)
    {
        selectPatient.VisitID = 0 
        selectPatient.VisitUnitID = 0
    }
    usSpinnerService.spin('GridSpinner');
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
    //for sorting grid data
    $scope.SortColumn1 = "TempDate";
    // $scope.reverseSort1 = true;  //alresdy added for comment sujata coross clinic
    $scope.reverseSort1 = false;    // new  added for comment sujata coross clinic
    
    $scope.openDICOMLink = function () {

        if($scope.DesignEMRVO.DICOMLink !==null || $scope.DesignEMRVO.DICOMLink !== undefined || $scope.DesignEMRVO.DICOMLink !=='' )
            window.open($scope.DesignEMRVO.DICOMLink);
    }

    $scope.ViewAllDICOM = function() {
        var response = DesignEMRSrv.GetAllDICOMStudies('FollicularScan'); //Get Visit list For selected patient
        response.then(function (resp) {

            if (resp.data.length > 0) { //Go cursor this scope when multiple visit

                var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                    templateUrl: 'DICOMList',
                    controller: 'DICOMListInfo',
                    backdrop: false,
                    keyboard: false,
                    size: 'md',
                    resolve: {
                        VisitInfo: function () {
                            return resp.data;
                        }
                    }
                });
                modalInstance.result.then(function (data) {
                    window.open(data.StudyLink)
                });
            }
            else{
                AlertMessage.info('FertiVue', 'No Study Found.');
            }
        });
    
    }
    $scope.activeMenu = ''; // Track the active menu item



    $scope.SortData1 = function (column) {
        // $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;// alresdy added for comment sujata coross clinic
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : true; // new  added for comment sujata coross clinic

        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    //BY ROHINI TO GET TEMPLATE BY ID

    $scope.GetTemplateByFormID = function GetTemplateByFormID() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData1 = DesignEMRSrv.GetTemplateByFormID(FormID, TempID, $scope.Sessionobj);
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
                            if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0 && FormID !== 10012) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined))
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

    $scope.ShowUploadedImages = function () {
        debugger;
        var ResponseData = DesignEMRSrv.ShowUploadedImages();
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                $scope.DesignEMRVO.ListPatientImages = [];
                $scope.DesignEMRVO.ListPatientImages = Response.data;
            }
        });
    }
    $scope.RemoveImg = function (Item) {
        var ResponseData = DesignEMRSrv.DeleteUploadedImages(Item);
        ResponseData.then(function (Response) {

            if (Response.data == 1) {
                $scope.ShowUploadedImages();
            }
            else {
                AlertMessage.error("Error Occured While Deleting.");
            }
        });
    }
    $scope.RedirectToSelf = function (ID, UnitID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DesignEMRSrv.GetTemplateData(ID, UnitID);
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
                //END
              
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.ListAllTemplateList = function (ID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DesignEMRSrv.ListAllCycleTemplateList(ID);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                usSpinnerService.stop('GridSpinner');
                $scope.TemplateDetailList = Response.data;
                $scope.RedirectToSelf( $scope.TemplateDetailList[0].ID, $scope.TemplateDetailList[0].UnitID);
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.SaveUpdateEMRTemplate = function () {
        $scope.$broadcast('schemaFormValidate');
        // Then we check if the form is valid
        if ($scope.myForm.$valid) {

            $scope.DesignEMRVO1 = $scope.DesignEMRVO;
            $scope.DesignEMRVO.FormID = FormID;
            $scope.DesignEMRVO.ModelDescription = JSON.stringify($scope.model);
            usSpinnerService.spin('GridSpinner');
            var ResponseData = DesignEMRSrv.SaveUpdateCycleTemplate($scope.DesignEMRVO);
            ResponseData.then(function (Response) {

                if (Response.data >= 1) {
                    AlertMessage.success("Saved Successfully");
                    //$scope.ClearForm();
                    $scope.PageInit();
                }
            }, function (error) {
                $scope.Error = error;
                usSpinnerService.stop('GridSpinner');
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
        $scope.GetTemplateByFormID(); // init mathods
    }
    $scope.CancelMain = function CancelMain() {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    }
    //$scope.PageInit = function () {
      
    //    $scope.GetTemplateByFormID();

    //}
    //$scope.PageInit();    -- added comment by sujata 




    //added by sujata for male examination
    $scope.PageInit = function () {
      
        //$scope.GetTemplateByFormID();
        debugger;
        var resp = DesignEMRSrv.GetSubtemplatesList(FormID)
        resp.then(function (resp) {

            debugger;
            if (resp.data.length != 0) {                                              //added by sujata for ultra obs
                $scope.IsSubTemplate = true;
                $scope.SubTemplateList = resp.data;

                $scope.GetTemplateByFormID();

                if ($scope.SubTemplateList.length > 0) {
                    FormID = 6;
                }
            }
            else {
                $scope.GetTemplateByFormID();
            }

        }, function (err) {
            debugger;
        })
    }
    $scope.PageInit();

    $scope.SetFormID = function SetFormID(formid) {
        debugger;
        FormID = formid;
        angular.forEach($scope.SubTemplateList, function (item) {
            if (item.ID !== 0 && item.ID == formid) {
                $scope.SelectedTemplate = item.Description
                $scope.GetTemplateByFormID();
            }

        })

        $scope.GetTemplateByFormID();
    }



    //Start Report 
    $scope.PrintSemenAnalysis = function PrintSemenAnalysis(Item) {
        debugger;
        //var a = encodeURIComponent('U=' + Item.SNo + '&SNo=' + Item.SNo + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);       
        //$scope.DesignEMRVO.FormID

        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&ID=' + Item.ID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&PU=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID +'&TemplateID=' + FormID);
        window.open('/Reports/EMR/TemplateReports/HystroscopyReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }

    //END Report
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }

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




