'use strict';
angular.module('PIVF').controller('PatientListCtrl', ['$rootScope', '$scope', '$window', 'localStorageService', 'PatientDashboardSrv', 'Common', 'usSpinnerService', 'srvCommon', 'AlertMessage', '$filter', '$location', 'localStorageService', function ($rootScope, $scope, $window , localStorageService, PatientDashboardSrv, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location) {


    //$rootScope.FormName = 'Patient Under Stimulation';
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    $scope.PatientUnderStimulationList = [];
    usSpinnerService.spin('GridSpinner');
     $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.FormLoad = function () {

        debugger;
        var btnId = $rootScope.btnId;
        var btnId1 = $rootScope.btnId1;
        var btnId2 = $rootScope.btnId2;
        var btnId3 = $rootScope.btnId3;
        var btnId4 = $rootScope.btnId4;
        var btnId5 = $rootScope.btnId5;
        var btnId6 = $rootScope.btnId6;
        var btnId7 = $rootScope.btnId7;
        var btnId8 = $rootScope.btnId8;
        var btnId9 = $rootScope.btnId9;
        var btnId10 = $rootScope.btnId10;
        var btnId11 = $rootScope.btnId11;
        var btnId12 = $rootScope.btnId12;
        var btnId13 = $rootScope.btnId13;
        var btnId14 = $rootScope.btnId14;
        var btnId15 = $rootScope.btnId15;
        var btnId16 = $rootScope.btnId16;
        var btnId17 = $rootScope.btnId17;

        var myBtn =   $rootScope.btnId18

        var fromDate  = $rootScope.patientListFromDate;
        var toDate = $rootScope.patientListToDate;

        $scope.listName = $rootScope.FormName;

        var Type = $rootScope.FormName ;


        if (btnId == "Stimulation") {
            $scope.StimulationPatientList(fromDate , toDate);

        }
        else if (btnId1 == "Trigger") {
            $scope.TriggerPatientList(fromDate , toDate);
        }
        else if (btnId2 == "Day0") {
            $scope.GetDay0PatientList(fromDate , toDate);

        }
        else if (btnId3 == "Day1") {
            $scope.GetDay1PatientList(fromDate , toDate);

        }
        else if (btnId4 == "Day2") {
            $scope.GetDay2PatientList(fromDate , toDate);

        }
        else if (btnId5 == "Day3") {
            $scope.GetDay3PatientList(fromDate , toDate);

        }
        else if (btnId6 == "Day4") {
            $scope.GetDay4PatientList(fromDate , toDate);

        }
        else if (btnId7 == "Day5") {
            $scope.GetDay5PatientList(fromDate , toDate);

        }
        else if (btnId8 == "Day6") {
            $scope.GetDay6PatientList(fromDate , toDate);

        }
        else if (btnId9 == "PregnancyTest") {
            $scope.GetPregnancyTestPatientList(fromDate , toDate);

        }
        else if (btnId10 == "PregnancyUltrasound") {
            $scope.GetPregnancyUltrasoundPatientList(fromDate , toDate);

        }
        else if (btnId11 == "PregnancyOutcome") {
            $scope.GetPregnancyOutcomePatientList(fromDate , toDate);

        }
        else if (btnId12 == "TotalEmbryo") {
            $scope.GetETPatientList(fromDate , toDate);

        }
        else if (btnId13 == "TotalTrigger") {
            $scope.GetTriggerPatientList(fromDate , toDate);

        }
        else if (btnId14 == "TotalOPU") {
            $scope.GetOPUPatientList(fromDate , toDate);

        }
       
        else if (btnId15 == "BHCG") {
            $scope.GetBHCGPatientList(fromDate , toDate);

        }
        else if (btnId16 == "USG") {
            $scope.GetUSGPatientList(fromDate , toDate);

        }
        else if (btnId17 == "RemainingOPUList") {
            $scope.GetRemainingOPUPatientList(fromDate , toDate);

        }
        else if (myBtn == 'footFall'){    
           $scope.GetFootFallPatientList(fromDate , toDate , Type);
        }
        else if (myBtn == 'todoList'){    
           $scope.GetToDoListDashboardPatientList(fromDate , toDate , Type);
        }
        else if (myBtn == "ageDistribution") {
            $scope.GetRegistrationDashboardByAgeGroupPatientList(fromDate , toDate);

        }
        else if (myBtn == "Trends") {
            $scope.GetRegistrationDashboardByTrendPatientList($rootScope.trandsDate , $rootScope.trandsDate , $rootScope.trandsType);

        }
        else if (myBtn == 'revenue'){    

           $scope.listName =  'Total revenue by ' + $rootScope.FormName;

           $scope.GetTotalRevenueDashboardServiceTypePatientList(fromDate , toDate , Type);
        }
        else if (myBtn == 'investigation'){    

           $scope.listName =  'Investigation by ' + $rootScope.FormName;

           $scope.GetInvestigationDashboardPatientLiast(fromDate , toDate , Type);
        }
        else if (myBtn == 'collectionBreakdown' || myBtn == 'chargesBreakdown' ){
           
           $scope.listName =  'Billing by ' + $rootScope.FormName + 'Breakdown';
           
           $scope.GetBillingDashboardPatientList(fromDate , toDate , Type);
        }
        else if (myBtn == 'Type' || myBtn == 'Department' ){
           
           $scope.listName =  'Appointment by ' + $rootScope.FormName;
           
           $scope.GetAppointmentDashboardPatientList(fromDate , toDate , Type);
        }
        else if (myBtn == "Visit") {
            $scope.GetVisitTypePatientList(fromDate , toDate);

        }
             
             $scope.GetUnitDetails();
    }


    /*---------------------------------------------------------------------------------------------------------------------------*/
   
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.CancelView = function () {
        //$location.path('/PatientDashboard/');
          $window.history.back(); // redirect to privious page
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.StimulationPatientList = function StimulationPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.StimulationPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.TriggerPatientList = function TriggerPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.TriggerPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetDay0PatientList = function GetDay0PatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay0PatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetDay1PatientList = function GetDay1PatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay1PatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetDay2PatientList = function GetDay2PatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay2PatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetDay3PatientList = function GetDay3PatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay3PatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetDay4PatientList = function GetDay4PatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay4PatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetDay5PatientList = function GetDay5PatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay5PatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetDay6PatientList = function GetDay6PatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay6PatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetPregnancyTestPatientList = function GetPregnancyTestPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyTestPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetPregnancyOutcomePatientList = function GetPregnancyOutcomePatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyOutcomePatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetPregnancyUltrasoundPatientList = function GetPregnancyUltrasoundPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyUltrasoundPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetETPatientList = function GetETPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetETPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetTriggerPatientList = function GetTriggerPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetTriggerPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetOPUPatientList = function GetOPUPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetOPUPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetBHCGPatientList = function GetBHCGPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetBHCGPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //fetching List of patient 
    $scope.GetUSGPatientList = function GetUSGPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetUSGPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    //fetching List of patient 
    $scope.GetRemainingOPUPatientList = function GetRemainingOPUPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetRemainingOPUPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

   /*-----------------------------------------------------------------------------------------------*/


      $scope.GetVisitTypePatientList = function GetVisitTypePatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetVisitTypePatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }


    /*-----------------------------------------------------------------------------------------------*/


      $scope.GetRegistrationDashboardByTrendPatientList = function GetRegistrationDashboardByTrendPatientList(fromDate , toDate , Type) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetRegistrationDashboardByTrendPatientList(fromDate , toDate , Type);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }



    /*----------------------------------------------------------------------------------------------------*/

      $scope.GetRegistrationDashboardByAgeGroupPatientList = function GetRegistrationDashboardByAgeGroupPatientList(fromDate , toDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetRegistrationDashboardByAgeGroupPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

    /*--------------------------------------------------------*/

      //fetching List of GetFootFallPatientList 
    $scope.GetFootFallPatientList = function GetFootFallPatientList(fromDate , toDate , Type) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetFootFallDashboardPatientList(fromDate , toDate , Type);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }

     /*--------------------------------------------------------*/

      //fetching List of GetToDoListDashboardPatientList 
    $scope.GetToDoListDashboardPatientList = function GetToDoListDashboardPatientList(fromDate , toDate , Type) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetToDoListDashboardPatientList(fromDate , toDate , Type);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }


      /*--------------------------------------------------------*/

      //fetching List of GetAppointmentDashboardPatientList 
    $scope.GetAppointmentDashboardPatientList = function GetAppointmentDashboardPatientList(fromDate , toDate , Type) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetAppointmentDashboardPatientList(fromDate , toDate , Type);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }


          /*--------------------------------------------------------*/

      //fetching List of GetBillingDashboardPatientList 
    $scope.GetBillingDashboardPatientList = function GetBillingDashboardPatientList(fromDate , toDate , Type) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetBillingDashboardPatientList(fromDate , toDate , Type);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }


              /*--------------------------------------------------------*/

      //fetching List of GetInvestigationDashboardPatientLiast 
    $scope.GetInvestigationDashboardPatientLiast = function GetInvestigationDashboardPatientLiast(fromDate , toDate , Type) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetInvestigationDashboardPatientLiast(fromDate , toDate , Type);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }



         /*--------------------------------------------------------*/

      //fetching List of GetTotalRevenueDashboardServiceTypePatientList 
    $scope.GetTotalRevenueDashboardServiceTypePatientList = function GetTotalRevenueDashboardServiceTypePatientList(fromDate , toDate , Type) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetTotalRevenueDashboardServiceTypePatientList(fromDate , toDate , Type);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientList = Response.data;

            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }



    /*---------------------------------------------------------------------------------------------------------------------------*/
    //Report Printing
    $scope.PrintPatient = function () {
        debugger;
        var a = encodeURIComponent('btn=' + $rootScope.btnId + '&btn1=' + $rootScope.btnId1 + '&btn2=' + $rootScope.btnId2
            + '&btn3=' + $rootScope.btnId3 + '&btn4=' + $rootScope.btnId4 + '&btn5=' + $rootScope.btnId5 +
            '&btn6=' + $rootScope.btnId6 + '&btn7=' + $rootScope.btnId7 + '&btn8=' + $rootScope.btnId8
            + '&btn9=' + $rootScope.btnId9 + '&btn10=' + $rootScope.btnId10 + '&btn11=' + $rootScope.btnId11
            + '&btn12=' + $rootScope.btnId12 + '&btn13=' + $rootScope.btnId13 + '&btn14=' + $rootScope.btnId14
            + '&btn15=' + $rootScope.btnId15 + '&btn16=' + $rootScope.btnId16 + '&btn17=' + $rootScope.btnId17);
        window.open('/Reports/PatientDashboard/PatientList.aspx?' + encodeURIComponent(a), '_blank');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.EditPatient = function EditPatient(Item) {
        debugger;
        $rootScope.Item = Item;
        var Item = $rootScope.Item
        $scope.$emit('onSelect', { model: Item });

    }



    /*---------------------------------------------------------------------------------------------------------------------------*/
  
    $scope.GetUnitDetails = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetUnitDetails();
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.clinicDetails = Response.data;
            console.log("----------------------unit details" , Response.data)

        
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }




    /*---------------------------------------------------------------------------------------------------------------------------------*/

    $scope.downloadReportwithPreview = function () {
    const element = document.getElementById('content');

    const tableContainer = document.querySelector('.custom-table-container');
    if (tableContainer) {
        tableContainer.classList.remove('custom-table-container');
        tableContainer.classList.add('no-table-styles');
    }

     // Hide the eye icon before generating the PDF
    element.classList.add('hide-in-pdf');

    const dynamicFilename = `${$scope.listName || 'Patient'}_List.pdf`;

    const options = {
        margin: [1.5, 0.20, 0.5, 0.35],
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'landscape',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    const clinicDetails = $scope.clinicDetails;

    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            const totalPages = pdf.internal.getNumberOfPages();
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(169, 169, 169);

            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);

                if (clinicDetails.Logo) {
                    pdf.addImage(clinicDetails.Logo, 'PNG', 0.5, 0.3, 2, 0.7);
                }

                pdf.setFontSize(12);
                pdf.text(clinicDetails.UnitName, pageWidth - 0.5, 0.5, { align: 'right' });

                pdf.setFontSize(10);
                pdf.text(clinicDetails.Address, pageWidth - 0.5, 0.7, { align: 'right' });
                pdf.text(`Contact: ${clinicDetails.MobileNo}`, pageWidth - 0.5, 0.9, { align: 'right' });
                pdf.text(`Email: ${clinicDetails.Email}`, pageWidth - 0.5, 1.1, { align: 'right' });

                const now = new Date();
                const formattedDateTime = now.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }).replace(',', '');

                pdf.text(`Print Date & Time: ${formattedDateTime}`, 0.5, pageHeight - 0.25);
                pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 0.5, pageHeight - 0.25, { align: 'right' });
            }

            // Convert the PDF to a Blob and open it in a new tab
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        })
        .finally(() => {
            if (tableContainer) {
                setTimeout(() => {
                    tableContainer.classList.remove('no-table-styles');
                    tableContainer.classList.add('custom-table-container');
                    element.classList.remove('hide-in-pdf'); // Show the eye icon again
                }, 2000);
            }
        });
};


$scope.downloadReport = function () {

    const element = document.getElementById('content');

    // Temporarily replace the class name for custom-table-container with no-table-styles
    const tableContainer = document.querySelector('.custom-table-container');
    if (tableContainer) {
        tableContainer.classList.remove('custom-table-container');
        tableContainer.classList.add('no-table-styles');
    }

    const dynamicFilename = `${$scope.listName || 'Patient'}_List.pdf`;

    const options = {
        filename: dynamicFilename,
        margin: [1.5, 0.20, 0.5, 0.35], // Increased top margin for header
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'landscape',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Clinic header details
    const clinicDetails = $scope.clinicDetails;

    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            const totalPages = pdf.internal.getNumberOfPages();
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Set font for header and footer
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(169, 169, 169); // Gray color for the header and footer

            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);

                // Add clinic logo (positioned top-left with custom size)
                if (clinicDetails.Logo) {
                    pdf.addImage(
                        clinicDetails.Logo,
                        'PNG',
                        0.5, // Left margin
                        0.3, // Top margin
                        2, // Width (you can adjust this value)
                        0.7 // Height (you can adjust this value)
                    );
                }

                // Add clinic name (right side, centered vertically)
                pdf.setFontSize(12);
                pdf.text(
                    clinicDetails.UnitName,
                    pageWidth - 0.5, // Right-aligned
                    0.5, // Centered vertically with logo
                    { align: 'right' }
                );

                // Add clinic address (right side)
                pdf.setFontSize(10);
                pdf.text(
                    clinicDetails.Address,
                    pageWidth - 0.5, // Right-aligned
                    0.7,
                    { align: 'right' }
                );

                // Add clinic contact (right side)
                pdf.text(
                    `Contact: ${clinicDetails.MobileNo}`,
                    pageWidth - 0.5, // Right-aligned
                    0.9,
                    { align: 'right' }
                );

                // Add clinic email (right side)
                pdf.text(
                    `Email: ${clinicDetails.Email}`,
                    pageWidth - 0.5, // Right-aligned
                    1.1,
                    { align: 'right' }
                );

                // Add footer: Print Date & Time
                const now = new Date();
                const formattedDateTime = now.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }).replace(',', '');

                pdf.text(
                    `Print Date & Time: ${formattedDateTime}`,
                    0.5,
                    pageHeight - 0.25
                );

                // Add footer: Page number
                pdf.text(
                    `Page ${i} of ${totalPages}`,
                    pageWidth - 0.5,
                    pageHeight - 0.25,
                    { align: 'right' }
                );
            }
        })
        .save()
        .finally(() => {
            // Restore the original class after the PDF is generated
            if (tableContainer) {
                //tableContainer.classList.remove('no-table-styles');
                //tableContainer.classList.add('custom-table-container');
                 setTimeout(() => {
                     tableContainer.classList.remove('no-table-styles');
                     tableContainer.classList.add('custom-table-container');
                     
                 }, 2000); // Delay of 2 seconds (2000 milliseconds)
            }
        });
};





}]);