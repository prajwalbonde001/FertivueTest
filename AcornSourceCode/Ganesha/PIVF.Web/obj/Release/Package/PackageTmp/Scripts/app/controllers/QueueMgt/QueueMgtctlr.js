'use strict';

angular.module('PIVF').controller('QueueController', function ($rootScope, $scope, QueueService, $location, AlertMessage, srvCommon, Common, swalMessages, $uibModal, $filter, usSpinnerService) {
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $scope.Que = {};
    var objResource = {};
    $rootScope.CycleDetails = null;
    $rootScope.Allergies = null;
    $rootScope.FormName = 'Queue Management';
    $rootScope.ForPrint = 1;
    $rootScope.ForConsent = 0;
    $scope.PatientList = [];      
    $scope.LinkPatientList = [];
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }// for globalization

    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.LinkConfig = {};
    $scope.LinkConfig.IsLinkPartnerConfig = false;//web.config Linkpratner
    $scope.LinkConfig.IsMarkDonerConfig = false;//web.config MarkDonerConfig    
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
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

    $scope.dateOptionsDOB = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End

    $scope.PageChange = function PageChange() {
        $scope.GetQueueList($scope.Que, false);
    };

    $scope.LoadData = function Loaddata() {
        debugger;
        $rootScope.IsAppointment = false;
        $rootScope.APPID = '';
        //var VisitTypeID = $rootScope.VisitTypeID;//added by Divya For Dashboard on 11 april 2020
        //$scope.Que.VisitTypeID = VisitTypeID;//added by Divya For Dashboard on 11 april 2020

        $scope.LoadLinkConfiguartion();
        $scope.Que.VisitFromDate = new Date();
        $scope.Que.VisitToDate = new Date();
        $scope.Que.Date = new Date();
        $scope.GetDepartmentList();
        $scope.GetDocList();
        $scope.GetSpeclRegTypeList();
        $scope.GetQueueList($scope.Que, false);
    }   //for filling all ddls

    $scope.LoadLinkConfiguartion = function LoadLinkConfiguartion()
    {
        var Responce = Common.getLinkConfiguartions();
        Responce.then(function (responce) {
           // $scope.LinkConfig = responce.data;
            if (responce.data.IsLinkPartnerConfig === "true")
            {
                $scope.LinkConfig.IsLinkPartnerConfig = true;
            }
            if (responce.data.IsMarkDonerConfig === "true") {
                $scope.LinkConfig.IsMarkDonerConfig = true;
            }
            
            
        }, function (err) {
        })
    }

    $scope.VisitStatusList = [         // to fill Appt status ddl for search criteria
              { ID: 0, Type: objResource.lblVisitStatus },
              { ID: 1, Type: 'Started' },
              { ID: 2, Type: 'Consultation' },
              { ID: 3, Type: 'Billing' },
              { ID: 4, Type: 'Closed' }
            //  { ID: 5, Type: 'Reopen' },
    ];
    $scope.Que.VisitStatusID = 0;

    $scope.GetDepartmentList = function GetDepartmentList() {
        var Response = Common.GetDepartmentList();
        Response.then(function (resp) {
            resp.data.splice(0, 0, { ID: 0, Description: 'Department' })
            $scope.DeptList = resp.data;
            $scope.Que.DeptID = 0;
        })
    };

    $scope.GetDocList = function GetDocList() {
        var responseData = Common.GetDoctorList();
        responseData.then(function (Response) {
            Response.data.All.splice(0, 0, { ID: 0, Description: 'Doctor' })
            $scope.DocList = Response.data.All;
            $scope.Que.DocID = 0;
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    $scope.GetSpeclRegTypeList = function GetSpeclRegTypeList() {
        var responseData = Common.GetSpeclRegTypeList();
        responseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'RegistrationType' })
            $scope.SpeclRegTypeList = Response.data;
            $scope.Que.SpclRegID = 0;
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }

    $scope.GetQueueList = function GetQueueList(Que, exptoexcl) {
        $scope.high = null;
        debugger;
       // Que.VisitTypeID = 0; //Added by AniketK on 07July2020 for Video Consultation
        var Q = [];
        if (angular.isUndefined(Que.PatientName)) { Que.PatientName = ''; }
        if (angular.isUndefined(Que.DeptID)) { Que.DeptID = 0; }
        if (angular.isUndefined(Que.DocID)) { Que.DocID = 0; }
        if (angular.isUndefined(Que.SpclRegID)) { Que.SpclRegID = 0; }
        if (angular.isUndefined(Que.VisitStatusID)) { Que.VisitStatusID = 0; }
        if (angular.isUndefined(Que.MRN)) { Que.MRN = ''; }
        if (angular.isUndefined(Que.MobNo)) { Que.MobNo = ''; }
        if (angular.isUndefined(Que.TokenNo)) { Que.TokenNo = ''; }
        if (angular.isUndefined(Que.OPDNo)) { Que.OPDNo = ''; }
        if (angular.isUndefined(Que.Date)) { Que.Date = null; }
        if (angular.isUndefined(Que.VisitToDate)) { Que.VisitToDate = null; }
        if (angular.isUndefined(Que.VisitFromDate)) { Que.VisitFromDate = null; }
        if (angular.isUndefined(Que.VisitTypeID)) { Que.VisitTypeID = 0; }//added by Divya For Dashboard on 11 april 2020
        if ((Que.VisitToDate != null && Que.VisitFromDate == null) || (Que.VisitToDate == null && Que.VisitFromDate != null)) {
            AlertMessage.info(objResource.msgTitle, objResource.msgSelVisFrmDtAndVisToDt);
        } else {
            if (Que.VisitFromDate <= Que.VisitToDate) {
                Q.push($scope.CurrentPage - 1);
                Q.push(Que.DeptID.toString());
                Q.push(Que.DocID.toString());
                Q.push(Que.SpclRegID.toString());
                Q.push(Que.VisitStatusID.toString());
                Q.push(Que.PatientName.toString());
                Q.push(Que.MRN.toString());
                Q.push(Que.MobNo.toString());
                Q.push(Que.TokenNo.toString());
                Q.push(Que.OPDNo.toString());
                Q.push($filter('date')(Que.Date, 'shortDate'));
                Q.push($filter('date')(Que.VisitFromDate, 'shortDate'));
                Q.push($filter('date')(Que.VisitToDate, 'shortDate'));
                Q.push(Que.VisitTypeID.toString());//added by Divya For Dashboard on 11 april 2020

                if (exptoexcl) Q.push(false);
                else {
                    if ($scope.IsPostBack == true) {   //for set today's date when loading first time
                        Q[11] = $filter('date')(new Date(), 'shortDate');    //VisitFromDate
                        Q[12] = $filter('date')(new Date(), 'shortDate');    //VisitToDate
                    }
                    Q.push(false);       //Paging enabled
                }
                if ($scope.isClearAdvSearch == true && !angular.isDate($scope.Que.Date)) {
                    Q[10] = new Date();
                    $scope.Que.Date = new Date();
                }
                else if ($scope.isClearSearch == true && !angular.isDate($scope.Que.VisitFromDate)) {
                    $scope.Que.VisitFromDate = new Date();
                    $scope.Que.VisitToDate = new Date();
                    Q[11] = new Date();
                    Q[12] = new Date();
                }
                usSpinnerService.spin('GridSpinner');
                var responseData = QueueService.GetQueueList(Q);
                responseData.then(function (Response) {
                   
                    usSpinnerService.stop('GridSpinner');
                    if (exptoexcl == true) {
                        $scope.exportToExcel(Response);
                    }
                    else {
                        if (Response.data.length > 0) {
                            $scope.MarkSurrogate = Response.data[0].IsMarkSurrogate;   //Added by Nayan Kamble
                            $scope.TotalItems = Response.data[0].TotalCount;
                            angular.forEach(Response.data, function (i) {
                                if (i.ReferredDoctor == '- Select -') i.ReferredDoctor = '';
                                if (i.CurrentVisitStatus == 1)
                                    i.VisitStatus = 'Started';
                                else if (i.CurrentVisitStatus == 2)
                                    i.VisitStatus = 'Consultation';
                                else if (i.CurrentVisitStatus == 3)
                                    i.VisitStatus = 'Billing ';
                                else if (i.CurrentVisitStatus == 4) {
                                    i.VisitStatus = 'Closed  ';
                                    i.IsVisitClosed = true;
                                    i.IsVisitClosed1 = true;
                                }
                                i.IsVisitClosed = !i.Status;
                            })
                        }
                        else $scope.TotalItems = 0;
                        $scope.QueueList = Response.data;
                    }
                    $scope.IsPostBack = false;

                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                    //AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
            }
            else {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.warning(objResource.msgTitle, objResource.msgVisFrmDtGrtrThnVisToDt);
            }
        }
    };  //for landing page

    $scope.ShowAddInfo = function ShowAddInfo(Patient) {
        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: 'AddInfo',
            controller: 'ctrlAddInfo',
            backdrop: false,
            keyboard: false,
            size: 'md',
            resolve: {
                Patient: function () {
                    return Patient;
                }
            }
        });
        modalInstance.result.then(function () {     // return here after cancel reason entered
            var User = [];

        });
    }  //show patient additional info

    $scope.CloseVisit = function CloseVisit(Que) {
        if (Que.IsVisitClosed == true) {
            //swalMessages.MessageBox("Palash IVF", 'Do you want to close visit?', "info", function (isConfirmed) {//Commented by swatih for localization 28/7/2020
            swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoyouwanttoclosevisit, "info", function (isConfirmed) {//Modified by swatih for localization 28/7/2020
                if (isConfirmed) {
                    var responseData = QueueService.CloseVisit(Que.VisitID, Que.UnitId);
                    responseData.then(function (Response) {
                        if (Response.data == 1)
                            AlertMessage.success(objResource.msgTitle, objResource.msgVisClosed);
                        $scope.GetQueueList($scope.Que, false);
                    }, function (error) {
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    });
                }
                else {
                    Que.IsVisitClosed = !Que.IsVisitClosed;
                }
            });
        }
        else {
            Que.IsVisitClosed = !Que.IsVisitClosed;
            AlertMessage.info(objResource.msgTitle, objResource.msgVisAlrdyClosed);
        }
    };  //close visit

    $scope.high = 20;
    $scope.HighliteRow = function HighliteRow(idx) {
        $scope.high = idx;
    }

    $scope.exportToExcel = function (Response) { // ex: '#my-table'
        var filteredData = _.map(Response.data, function (data) {
            var users = {
                'Token No': data.TokenNo, 'OPD No': data.OPDNo, 'Cabin': data.Cabin, 'MRN': data.MRN, 'Patient Name': data.Prefix + ' ' + data.PatientName, 'Visit Type': data.VisitType, 'Department': data.Department, 'Doctor': data.Doctor, 'Remarks': data.Remarks, 'Visit Status': data.VisitStatus
            }
            return users;
        })
        alasql('SELECT * INTO XLSX("Queue.xlsx",{headers:true}) FROM ?', [filteredData]);
    }

    $scope.ClearSearch = function ClearSearch() {
        debugger;
        if ($scope.AdvPatientName != undefined && $scope.AdvPatientName != '')
            $scope.Que.PatientName = $scope.AdvPatientName;
        else
            $scope.Que.PatientName = '';
        $scope.isClearSearch = true;
        $scope.isClearAdvSearch = false;
        $scope.Que.Date = null;
        //$scope.Que.PatientName = '';
        $scope.Que.DeptID = 0;
        $scope.Que.DocID = 0;
        $scope.GetQueueList($scope.Que);
    };

    $scope.ClearAdvSearch = function ClearAdvSearch() {
        debugger;
        if ($scope.AdvPatientName != undefined && $scope.AdvPatientName != '')
            $scope.Que.PatientName = '';
        $scope.AdvPatientName = '';

        $scope.isClearAdvSearch = true;
        $scope.isClearSearch = false;
        $scope.Que.MRN = '';
        $scope.Que.MobNo = '';
        $scope.Que.VisitStatusID = 0;
        $scope.Que.SpclRegID = 0;
        $scope.Que.TokenNo = '';
        $scope.Que.OPDNo = '';
        $scope.Que.VisitFromDate = null;
        $scope.Que.VisitToDate = null;
        $scope.Que.VisitTypeID = '';//Added by divya  
        //  $scope.Que.Date = null;
        $scope.GetQueueList($scope.Que);

    }

    $scope.MRNoClick = function (item, link) {
        var SelectedPatient = {};
        debugger;
        $rootScope.DetailsForBilling = item;
        $rootScope.hideWhenQueue = false;
        //  var CoupleDetails = {};
        $rootScope.showFemalePopUp = false;
        $rootScope.showMalePopUp = false;
        $rootScope.IsFemale = 0;
        $rootScope.IsMale = 0;
        SelectedPatient.ID = item.PatientID;
        SelectedPatient.UnitID = item.PatientUnitID;  
       // SelectedPatient.UnitID = item.UnitId;
        SelectedPatient.GenderID = item.GenderId;
        SelectedPatient.PatientCategoryID = item.PatientCategoryID;
        SelectedPatient.MRNo = item.MRNo;
        SelectedPatient.PatientName = item.PatientName;
        SelectedPatient.VisitID = item.VisitID;
        SelectedPatient.VisitUnitID = item.UnitId;
        SelectedPatient.VisitStatusID = item.CurrentVisitStatus;

        //SelectedPatient.Date =  $filter('date')(item.Date, 'dd-MMM-yyyy');
        //$scope.TodayDate = $filter('date')(new Date, 'dd-MMM-yyyy');  //new Date();


        SelectedPatient.Date = item.Date.toString("MM.dd.yyyy");
        SelectedPatient.Date = new Date(SelectedPatient.Date);

        $scope.TodayDate = new Date().toString("MM.dd.yyyy");
        $scope.TodayDate = new Date($scope.TodayDate);

        //$scope.SemenAnalysis.CollectionDate = Date.parse($scope.SemenAnalysis.CollectionDate.toString("MM.dd.yyyy") + " " + $scope.SemenAnalysis.CollectionTime);
        //$scope.SemenAnalysis.CollectionDate = new Date($scope.SemenAnalysis.CollectionDate);


        //Added by AniketK on 07July2020 for Video Consultation
        var tempDate1 = new Date();
        var date1 = tempDate1.getFullYear() * tempDate1.getMonth() * tempDate1.getDate();
        var tempDate2 = new Date(item.Date);
        var date2 = tempDate2.getFullYear() * tempDate2.getMonth() * tempDate2.getDate();
        if (date1 == date2) {
            $rootScope.VisitTypeID = item.VisitTypeID;
        }
        else {
            $rootScope.VisitTypeID = 0;
        }

        if (item.PatientCategoryID == 7) {
        debugger
            var response = Common.GetCoupleDetails(SelectedPatient);
            response.then(function (resp) {
            debugger
                if (resp.data != null) {
                debugger
                    if (item.GenderId == 2) $rootScope.showFemalePopUp = false;
                    if (item.GenderId == 1) $rootScope.showMalePopUp = false;
                    $rootScope.IsFemale = 1;
                    $rootScope.IsMale = 1;
                    $rootScope.CoupleDetails = resp.data;
                    if (item.GenderId == 2) {
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = item.VisitID;
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = item.UnitId;
                        Common.AddvisitDetailIncoupleAPI(2, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID);
                    }
                    if (item.GenderId == 1) {
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = item.VisitID;
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = item.UnitId;
                        Common.AddvisitDetailIncoupleAPI(1, $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID, $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID);
                    }
                    Common.clearSelectedPatient();
                    Common.clearSelectedCouple();
                    Common.setSelectedPatient(SelectedPatient);
                                                      
                    $rootScope.selectedPatientCopy = angular.copy(SelectedPatient)   // vaibhav

                    Common.setSelectedCouple($rootScope.CoupleDetails);
                    if (SelectedPatient.GenderID == 2) {
                        $rootScope.IsFemaleActive = true;
                        $rootScope.IsMaleActive = false;
                        $rootScope.IsCycleActive = false;
                    }
                    else {
                        $rootScope.IsMaleActive = true;
                        $rootScope.IsFemaleActive = false;
                        $rootScope.IsCycleActive = false;
                    }
                    if (link == 'EMR') {
                    debugger
                        $location.path('/EMRLandingPage/');
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                        debugger
                    }
                    else if (link == 'Bill') {      //Added by Nayan Kamble on 31/12/2019
                    debugger
                        usSpinnerService.spin('GridSpinner');
                         $scope.aciveTab('liBilling');
                        $rootScope.IsFemale = 0;
                        $rootScope.IsMale = 0;
                        $rootScope.IsFromView = false;
                        $rootScope.hideWhenIndividual = false;
                        $rootScope.PatientBillDetails = SelectedPatient;  //Added by Nayan Kamble on 09/01/2020
                        //$location.path('/BillList/');
                       
                        if (SelectedPatient.Date < $scope.TodayDate) {
                        debugger
                            $rootScope.PatientBillDetails.IsFromLastVisit = true;
                            $location.path("/BillList");
                            usSpinnerService.stop('GridSpinner');
                        }
                        else {
                        debugger
                            $location.path('/NewBilling/')
                            usSpinnerService.stop('GridSpinner');
                        }
                            usSpinnerService.stop('GridSpinner');
                      
                    }
                    else {
                        $location.path('/ARTCycle/');
                        $rootScope.IsCycleActive = true;
                        $rootScope.IsFemaleActive = false;
                        $rootScope.IsMaleActive = false;
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                        debugger
                    }
                }
            })
        }
        else if (item.PatientCategoryID == 11 && link == 'Partner') {
            if (item.GenderId == 1) {
                $rootScope.CoupleDetails.MalePatient.MalePhotoStr = item.PhotoString;
                $rootScope.CoupleDetails.MalePatient.MalePatientName = item.PatientName;

                $rootScope.CoupleDetails.MalePatient.MaleMRNO = item.MRNo;
                $rootScope.CoupleDetails.MalePatient.MaleAgeInYr = item.Age;

                $rootScope.CoupleDetails.MalePatient.MaleId = item.PatientID;
                $rootScope.CoupleDetails.MalePatient.MAleUnitID = item.PatientUnitID;

                $rootScope.CoupleDetails.MalePatient.GenderID = 1;
                $rootScope.CoupleDetails.MalePatient.PatientCategoryID = 11;
                $rootScope.IsMale = 1;
                $rootScope.IsFemale = 0;

            }
            else if (item.GenderId == 2) {
                $rootScope.CoupleDetails.FemalePatient.FemalePhotoStr = item.PhotoString;
                $rootScope.CoupleDetails.FemalePatient.FemalePatientName = item.PatientName;

                $rootScope.CoupleDetails.FemalePatient.FemaleMRNO = item.MRNo;
                $rootScope.CoupleDetails.FemalePatient.FemaleAgeInYr = item.Age;

                $rootScope.CoupleDetails.FemalePatient.FemalePatientID = item.PatientID;
                $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID = item.PatientUnitID;

                $rootScope.CoupleDetails.FemalePatient.GenderID = 2;
                $rootScope.CoupleDetails.FemalePatient.PatientCategoryID = 11;
                $rootScope.IsMale = 0;
                $rootScope.IsFemale = 1;
            }

            /* Link partner popup*/
            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                templateUrl: 'LinkPartner',
                controller: 'ctrlLinkPartner',
                backdrop: false,
                keyboard: false,
                size: 'lg w95',
                resolve: {
                    LinkInfo: function () {
                        return $rootScope.CoupleDetails;
                    }
                }
            });
            modalInstance.result.then(function (data) { // return here after cancel reason entered
                if (!angular.equals({}, data)) {  //this scope is executed when save is click
                    debugger;
                }
                else {
                    AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
                }
            });

            $scope.LoadPartnerData();
            //if (link == 'Partner') {
            //    $rootScope.hideWhenQueue = true;
            //    $location.path('/LinkPartner/');
            //}

        }
         else if (item.PatientCategoryID == 11 && link == 'donor') {
         debugger
             console.log(item)
             $rootScope.hideWhenQueue = true;
             var response;
             //swalMessages.MessageBox('PalashIVF', "Are You Sure Want to Mark a Donor?", "warning", function (isConfirmed) { //commented by swatih for localization 28/7/2020
             swalMessages.MessageBox(objResource.msgTitle, objResource.msgAreYouSureWanttoMarkaDonor, "warning", function (isConfirmed) {//Modified by swatih for localization 28/7/2020
                       if (isConfirmed) {
                       debugger
                           var response = QueueService.linkDonor(item.PatientID, item.UnitId, item.GenderId, 'Donor');
                           response.then(function (resp) {
                               if (resp.data != null) {
                                   debugger;
                                   if (resp.data == 1) {
                                       debugger;
                                       //AlertMessage.info('PalashIVF', 'Patient Successfully Mark As a Donor');//Commented by swatih for localization 27/7/2020
                                       AlertMessage.info(objResource.msgTitle, objResource.msgPatientSuccessfullyMarkAsaDonor);//Modified by swatih for localization 27/7/2020

                                       $location.path('/Queue/');

                                   }
                                   else {

                                       // AlertMessage.warning('PalashIVF', 'Donor Not Mark Try Again');//Commented by swatih for localization 27/7/2020
                                       AlertMessage.warning(objResource.msgTitle, objResource.msgDonorNotMarkTryAgain);//Modified by swatih for localization 27/7/2020
                                   }
                               }
                           });
                       }
                       else {
                           $rootScope.hideWhenQueue = true;
                       }
                  });
    //           var message = "Are you sure ?";        
             
         }
         else if (item.PatientCategoryID == 11 && link == 'surrogate') {    //Added by Nayan Kamble
             debugger;

             console.log(item)
             $rootScope.hideWhenQueue = true;
             var response;
             //swalMessages.MessageBox('PalashIVF', "Are You Sure Want to Mark a Surrogate?", "warning", function (isConfirmed) { //Commented by swatih for localization 28/7/2020
             swalMessages.MessageBox(objResource.msgTitle, objResource.msgAreYouSureWanttoMarkaSurrogate, "warning", function (isConfirmed) {  //Modified by swatih for localization 28/7/2020
                 if (isConfirmed) {
                     var response = QueueService.linkDonor(item.PatientID, item.UnitId, item.GenderId, 'Surrogate');   
                     response.then(function (resp) {
                         if (resp.data != null) {
                             debugger;
                             if (resp.data == 1) {
                                 debugger;
                                 // AlertMessage.info('PalashIVF', 'Patient Successfully Mark As a Surrogate');//Commented by swatih for localization 27/7/2020
                                 AlertMessage.info(objResource.msgTitle, objResource.msgPatientSuccessfullyMarkAsaSurrogate);//Modified by swatih for localization 27/7/2020

                                 $location.path('/Queue/');

                             }
                             else {

                                 //AlertMessage.warning('PalashIVF', 'Donor Not Mark Try Again');//Commented by swatih for localization 27/7/2020
                                 AlertMessage.warning(objResource.msgTitle, objResource.msgDonorNotMarkTryAgain);//Modified by swatih for localization 27/7/2020
                             }
                         }
                     });
                 }
                 else {
                     $rootScope.hideWhenQueue = true;
                 }
             });
             //           var message = "Are you sure ?";

         }

         //else if ((item.PatientCategoryID == 8 || item.PatientCategoryID == 9 || item.PatientCategoryID == 10 || item.PatientCategoryID == 11)
         //    && link == 'Bill') {    ///Added by Nayan Kamble on 31/12/2019
         //    console.log(item)
         //    $rootScope.hideWhenQueue = true;
         //    $rootScope.hideWhenIndividual = true;
         //     $rootScope.PatientBillDetails = SelectedPatient;  //Added by Nayan Kamble on 09/01/2020
         //     $location.path('/NewBilling/');
        // }
        else {
            var response = Common.GetDonorDetails(SelectedPatient);
            response.then(function (resp) {
                if (resp.data != null) {

                    if (resp.data.GenderID == 1) {
                        $rootScope.showMalePopUp = false;
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

                        $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = item.VisitID;
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = item.UnitId;

                        var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, $rootScope.CoupleDetails.MalePatient.Selectedvisit, 1);
                        //Common.AddvisitDetailIncoupleAPI(1, $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID, $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID);
                        Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);   //by umesh to get cyclelist when donor is selected on Q
                        $rootScope.IsFemale = 0;
                        $rootScope.IsMale = 1;
                        $rootScope.CoupleDetails.FemalePatient = {};
                        $rootScope.IsMaleActive = true;
                        $rootScope.IsFemaleActive = false;
                        debugger
                    }
                    else if (resp.data.GenderID == 2) {
                        $rootScope.showFemalePopUp = false;
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
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = item.VisitID;
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = item.UnitId;
                        var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, $rootScope.CoupleDetails.FemalePatient.Selectedvisit, 2);
                        //   Common.AddvisitDetailIncoupleAPI(2, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID);
                        Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);   //by umesh to get cyclelist when donor is selected on Q
                        $rootScope.IsMale = 0;
                        $rootScope.IsFemale = 1;
                        $rootScope.CoupleDetails.MalePatient = {};
                        $rootScope.IsMaleActive = false;
                    }
                    $rootScope.CoupleDetails.CoupleRegNo = '';
                    //$rootScope.CoupleDetails = resp.data;
                    Common.clearSelectedPatient();
                    Common.clearSelectedCouple();
                    Common.setSelectedPatient(SelectedPatient);
                    Common.setSelectedCouple($rootScope.CoupleDetails);
                    if (link == 'EMR') {
                       // $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
                        $location.path('/EMRLandingPage/');
                    }
                    else if (link == 'ART') {
                        $location.path('/ARTCycle/');
                        $rootScope.IsCycleActive = true;
                    }
                    else if (link == 'Bill') {   //Added by Nayan Kamble on 31/12/2019                       
                        //$rootScope.PatientBillDetails = SelectedPatient;   //Added by Nayan Kamble on 09/01/2020
                        //$location.path('/BillList/');      //   /NewBilling/
                       
                        usSpinnerService.spin('GridSpinner');
                        console.log(item)
                        $rootScope.hideWhenQueue = true;
                        $rootScope.hideWhenIndividual = true;
                        $rootScope.PatientBillDetails = SelectedPatient;  //Added by Nayan Kamble on 09/01/2020
                        //$location.path('/NewBilling/');
                       // usSpinnerService.stop('GridSpinner');



                        if (SelectedPatient.Date < $scope.TodayDate) {
                            $rootScope.PatientBillDetails.IsFromLastVisit = true;
                            $location.path("/BillList");
                            usSpinnerService.stop('GridSpinner');
                        }
                        else {
                            $location.path('/NewBilling/')
                            usSpinnerService.stop('GridSpinner');
                        }

                    }

                }
            });
         }

       //$location.path('/LayOutController/'); //added sujata for cross clinic 
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
    //link partner start
    $scope.LoadPartnerData = function LoadPartnerData() {
        debugger;
        $rootScope.hideWhenQueue = true;
        console.log("Hello");
        var getpatientlistresponse;
        if ($rootScope.IsMale == 1) {
            getpatientlistresponse = Common.getPartnerlist($rootScope.CoupleDetails.MalePatient.MAleUnitID, 11, 2); // 11 couple 
        }
        else {
            getpatientlistresponse = Common.getPartnerlist($rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID, 11, 1); // 11 couple 
        }

        getpatientlistresponse.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $rootScope.LinkPatientList = resp.data;
          }

        })
    }

    $scope.SaveVisitRemark = function SaveVisitRemark (item,index)
    {
        debugger;
   
        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: 'VisitRemark',
            controller: 'AddVisitRemarkcntrl',
            backdrop: false,
            keyboard: false,
            size: 'sm',
            resolve: {
                VisitDetails: function () {
                    return item;
                }
            }
        });
        modalInstance.result.then(function (data) {

            debugger;// return here after cancel reason entered
            if (!angular.equals({}, data)) {  //this scope is executed when save is click
                debugger;
               // console.log(item, index);
                $scope.QueueList[index].Complaints = data;
            }
            else {
                AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
            }
        });

    }

});


PIVF.controller('ctrlLinkPartner', function ($rootScope, $scope, $uibModalInstance, QueueService, $location, AlertMessage, srvCommon, Common, swalMessages, $uibModal, $filter, usSpinnerService) {
    debugger;
    $rootScope.hideWhenQueue = true;
    $rootScope.FormName = 'Link Partner';
    $scope.Partner = '';
    $scope.getLinkMatchingPatient = function ($viewValue) {
        debugger;
        var matchingStuffs = [];
        for (var i = 0; i < $rootScope.LinkPatientList.length; i++) {
            if ($rootScope.LinkPatientList[i].PatientName.toLowerCase() != null && $rootScope.LinkPatientList[i].MRNo.toLowerCase()!= null) // commented by sujata search functionality for link partner
            {
                if (
              $rootScope.LinkPatientList[i].PatientName.toLowerCase().indexOf($viewValue.toLowerCase()) != -1 ||
              $rootScope.LinkPatientList[i].MRNo.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {
                    matchingStuffs.push($rootScope.LinkPatientList[i]);
                }
            }
        }
        return matchingStuffs;
    }
    $scope.onLinkSelect = function (model) {
        debugger;

        if (model) {
            $scope.Partner.Select = false;
            $scope.Partner.Name = model.PatientName;
            $scope.Partner.MRNo = model.MRNo;
            $scope.Partner.GenderId = model.GenderID;
            $scope.Partner.Id = model.ID;
            $scope.Partner.UnitId = model.UnitID;
            $scope.Partner.VisitId = model.VisitID;
            $scope.Partner.VisitStatusID = model.VisitStatusID;
            $scope.Partner.Age = model.Age;


            console.log('model ', model);
        }
        else {

        }



    };
    $scope.CancleLinkPartner = function () {

        $scope.Partner.Select = true;
        $scope.Partner = '';
        $('#LinkPartner').modal('hide');

        debugger;



    }
    $scope.linkPartner = function () {
        console.log("here");
        var linkPartnerObj = {};
        var response;
        if ($scope.Partner.GenderId == undefined) {
            //AlertMessage.warning('PalashIVF', 'Please select Partner ');//Commented by swatih for localization 27/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseselectPartner);//Modified by swatih for localization 27/7/2020
        }
        else {
            if ($scope.Partner.GenderId == 1) {
                //male
                linkPartnerObj.UnitId = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                linkPartnerObj.MalePatientUnitId = $scope.Partner.UnitId; //Added by AniketK on 13Jan2020
                linkPartnerObj.PatientCategory = 11;
                linkPartnerObj.MaleId = $scope.Partner.Id;
                linkPartnerObj.FemaleId = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                linkPartnerObj.IsFemale = 1;
                linkPartnerObj.VisitId = $scope.Partner.VisitId;
                linkPartnerObj.VisitStatus = $scope.Partner.VisitStatusID;

                response = QueueService.linkPartner(linkPartnerObj);//unitid,patientcategroy,maleid,femaleid,isfemale,visitid,visitstatus

            }
            else if ($scope.Partner.GenderId == 2) {
                //female
                linkPartnerObj.UnitId = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                linkPartnerObj.FemalePatientUnitId = $scope.Partner.UnitId; //Added by AniketK on 13Jan2020
                linkPartnerObj.PatientCategory = 11;
                linkPartnerObj.MaleId = $rootScope.CoupleDetails.MalePatient.MaleId;
                linkPartnerObj.FemaleId = $scope.Partner.Id;
                linkPartnerObj.IsFemale = 0;
                linkPartnerObj.VisitId = $scope.Partner.VisitId;
                linkPartnerObj.VisitStatus = $scope.Partner.VisitStatusID;

                response = QueueService.linkPartner(linkPartnerObj);//unitid,patientcategroy,maleid,femaleid,isfemale,visitid,visitstatus
            }

            response.then(function (resp) {
                if (resp.data != null) {
                    debugger;
                    if (resp.data == 1) {
                        debugger;
                        $rootScope.dropdownwatcher = "PartnerLinked";
                        debugger;
                        //AlertMessage.info('PalashIVF', 'Partner Linked Successfully.');//Commented by swatih for localization 27/7/2020
                        AlertMessage.info(objResource.msgTitle, objResource.msgPartnerLinkedSuccessfully);//Modified by swatih for localization 27/7/2020
                        $uibModalInstance.dismiss('cancel');
                        $location.path('/Queue/');

                    }
                    else if (resp.data == -1) {
                        $uibModalInstance.dismiss('cancel');
                        //AlertMessage.warning('PalashIVF', 'Partner Not Linked Try Again');//Commented by swatih for localization 27/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgPartnerNotLinkedTryAgain);//Modified by swatih for localization 27/7/2020
                    }
                    else {
                        $uibModalInstance.dismiss('cancel');
                        //AlertMessage.warning('PalashIVF', 'Error Occured');//Commented by swatih for localization 27/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 27/7/2020
                    }
                }
            })

        }
    }
    //$scope.getpatientlist = function getpatientlist(PatientCategory) {
    //    var UserInfo = localStorageService.get("UserInfo");
    //    //var response = Common.getpatientlist(UserInfo.UnitID, $scope.PatientCategory);
    //    var response = Common.getpatientlist(2, PatientCategory);
    //    response.then(function (resp) {
    //        if (resp.data != null) {
    //            $scope.PatientList = resp.data;
    //            $scope.BindParentList(0);

    //        }
    //    });
    //}

    $scope.ResetLinkPartner = function ResetLinkPartner(Cancel) {
        debugger;
        //Dismiss PopUp
        if (Cancel == 'Cancel') {
            $uibModalInstance.dismiss('cancel');
        }
    }

})



PIVF.controller('ctrlAddInfo', function ($scope, $uibModalInstance, Patient, srvCommon) {
    $scope.Pat = Patient;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    $scope.ReasonCancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
PIVF.controller('AddVisitRemarkcntrl', function ($scope, $uibModalInstance,QueueService,VisitDetails,AlertMessage) {
    $scope.VisitRemark = VisitDetails.Complaints;
    $scope.ReasonCancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.SaveRemark = function SaveRemark(Remark )
    {
       // console.log(VisitDetails);
        debugger;
        QueueService.SaveVisitRemark(Remark, VisitDetails.VisitID ,VisitDetails.UnitId).then(function (resp) {
            if (resp.data == 0 || resp.data == 1)
            {
                
                // AlertMessage.success('PalashIVF', 'Remark Added Successfully..');//Commented by swatih for localization 27/7/2020
                AlertMessage.success(objResource.msgTitle, objResource.msgRemarkAddedSuccessfully);//Modified by swatih for localization 27/7/2020
                $uibModalInstance.close(Remark);
            }
            debugger;
        }, function (err) {
            debugger;
            $uibModalInstance.dismiss('cancel');
        })
    }

});

