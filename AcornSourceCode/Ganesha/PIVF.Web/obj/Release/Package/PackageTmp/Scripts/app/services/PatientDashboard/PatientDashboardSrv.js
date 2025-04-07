PIVF.service('PatientDashboardSrv', function ($http, API, $uibModal, $rootScope) {

    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetTriggerList = function (FromDate, ToDate) {
        debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetTriggerList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {
        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetOPUList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetOPUList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetETList = function (FromDate, ToDate) {
        //debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetETList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetPatientUnderStimulation = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetPatientUnderStimulation', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetPatientTriggerCount = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetPatientTriggerCount', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/

    this.GetRemainingOPUList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetRemainingOPUList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };



  /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetAllDayPatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetAllDayPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
            ).error(function () {

            });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay0Patient = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay0Patient', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
            ).error(function () {

            });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay1Patient = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay1Patient', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay2Patient = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay2Patient', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay3Patient = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay3Patient', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
            ).error(function () {

            });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay4Patient = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay4Patient', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay5Patient = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay5Patient', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay6Patient = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay6Patient', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
            ).error(function () {

            });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetBHCGList = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetBHCGList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetUCGList = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetUCGList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetPregnancyTestPatient = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetPregnancyTestPatient', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetPregnancyUltrasound = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetPregnancyUltrasound', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetPregnancyOutcome = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetPregnancyOutcome', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }
             ).error(function () {

             });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.StimulationPatientList = function (FromDate, ToDate) {
        //debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/StimulationPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.TriggerPatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/TriggerPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay0PatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay0PatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay1PatientList = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay1PatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay2PatientList = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay2PatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay3PatientList = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay3PatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay4PatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay4PatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay5PatientList = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay5PatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetDay6PatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetDay6PatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetPregnancyTestPatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetPregnancyTestPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetPregnancyUltrasoundPatientList = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetPregnancyUltrasoundPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetPregnancyOutcomePatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetPregnancyOutcomePatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetETPatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetETPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetTriggerPatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetTriggerPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetOPUPatientList = function (FromDate, ToDate) {
        // debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetOPUPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetBHCGPatientList = function (FromDate, ToDate) {
        //  debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetBHCGPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetUSGPatientList = function (FromDate, ToDate) {
        //debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetUSGPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };

    this.GetRemainingOPUPatientList = function (FromDate, ToDate) {
        //debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetRemainingOPUPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };



    /*---------------------------------------------------------------------------------------------*/

    this.GetFootFallDashboardPatientList = function (FromDate, ToDate, Type) {
        //debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetFootFallDashboardPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate, Type: Type }
        }).error(function () {

        });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------*/

    this.GetTotalRevenueDashboardServiceTypePatientList = function (FromDate, ToDate, Specialization) {
        //debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetTotalRevenueDashboardServiceTypePatientList', {
            params: { FromDate: FromDate, ToDate: ToDate, Specialization: Specialization }
        }).error(function () {

        });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------*/

    this.GetToDoListDashboardPatientList = function (FromDate, ToDate, Type) {
        //debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetToDoListDashboardPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate, Type: Type }
        }).error(function () {

        });
        return Response;
    };


    /*---------------------------------------------------------------------------------------------*/

    this.GetAppointmentDashboardPatientList = function (FromDate, ToDate, AppType) {
        //debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetAppointmentDashboardPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate, AppType: AppType }
        }).error(function () {

        });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------*/

    this.GetBillingDashboardPatientList = function (FromDate, ToDate, Breakdown) {
        //debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetBillingDashboardPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate, Breakdown: Breakdown }
        }).error(function () {

        });
        return Response;
    };


    /*---------------------------------------------------------------------------------------------*/

    this.GetInvestigationDashboardPatientLiast = function (FromDate, ToDate, Specialization) {
        //debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetInvestigationDashboardPatientLiast', {
            params: { FromDate: FromDate, ToDate: ToDate, Specialization: Specialization }
        }).error(function () {

        });
        return Response;
    };


    /*---------------------------------------------------------------------------------------------*/

    this.GetRegistrationDashboardByAgeGroupPatientList = function (FromDate, ToDate) {
        //debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetRegistrationDashboardByAgeGroupPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------*/

    this.GetRegistrationDashboardByTrendPatientList = function (FromDate, ToDate , Type) {
        //debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetRegistrationDashboardByTrendPatientList', {
            params: { FromDate: FromDate, ToDate: ToDate , Type : Type }
        }).error(function () {

        });
        return Response;
    };

     /*---------------------------------------------------------------------------------------------*/

    this.GetVisitTypePatientList = function (FromDate, ToDate) {
        //debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetVisitTypePatientList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };
       /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetUnitDetails = function () {

        debugger;
        var Response = $http.get(API.APIurl + 'BillingAPI/GetUnitDetails').error(function () {
        });
        return Response;
    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    this.GetVisitTypeList = function (FromDate, ToDate) {
        debugger;
        var Response = $http.get(API.APIurl + 'PatientDashboardAPI/GetVisitTypeList', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {

        });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetRegistrationDashboardTrends = function (FromDate, ToDate) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetRegistrationDashboardByTrendsCount', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {
        });
        return Response;
    };




    /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetRegistrationDashboardByAgeGroupCount = function (FromDate, ToDate) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetRegistrationDashboardByAgeGroupCount', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {
        });
        return Response;
    };







 this.GetAdminDashboardPercentageCounts = function (FromDate, ToDate , LastFromDate , LastToDate ) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetAdminDashboardPercentageCounts', {
            params: { FromDate: FromDate, ToDate: ToDate , LastFromDate : LastFromDate ,  LastToDate : LastToDate}
        }).error(function () {
        });
        return Response;
    };










    /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetAppointmentDashboardCount = function (FromDate, ToDate, Type) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetAppointmentDashboardCount', {
            params: { FromDate: FromDate, ToDate: ToDate, AppType: Type }
        }).error(function () {
        });
        return Response;
    };



    /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetInvestigationDashboardCount = function (FromDate, ToDate) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetInvestigationDashboardCount', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {
        });
        return Response;
    };


    /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetBillingDashboardCount = function (FromDate, ToDate, Breakdown) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetBillingDashboardCount', {
            params: { FromDate: FromDate, ToDate: ToDate, Breakdown: Breakdown }
        }).error(function () {
        });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetTotalRevenueDashboardServiceTypeCount = function (FromDate, ToDate) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetTotalRevenueDashboardServiceTypeCount', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {
        });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetToDoListDashboardCount = function (FromDate, ToDate) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetToDoListDashboardCount', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {
        });
        return Response;
    };

    /*---------------------------------------------------------------------------------------------------------------------------------------*/

    this.GetFootFallDashboardCount = function (FromDate, ToDate) {

        debugger;
        var Response = $http.get(API.APIurl + 'FertivueDashboard/GetFootFallDashboardCount', {
            params: { FromDate: FromDate, ToDate: ToDate }
        }).error(function () {
        });
        return Response;
    };



    /*---------------------------------------------------------------------------------------------------------------------------*/
    // New method for opening the Date Modal
    this.openDateModal = function () {
        return $uibModal.open({
            templateUrl: 'exampleModal', // Refers to the modal template ID
            controller: 'customModalCtrl', // Controller for the modal
            size: '', // Optional size of the modal
            windowClass: 'custom-xl-modal', // Optional custom class for styling
        }).result.then(
            function (result) {
                // Handle modal success
                $rootScope.chartCustomFromDate = result.fromDate;
                $rootScope.chartCustomToDate = result.toDate;
                return result;  // Return the selected dates
            },
            function () {
                // Handle modal dismissal
                console.log('Modal dismissed.');
            }
        );
    };





});