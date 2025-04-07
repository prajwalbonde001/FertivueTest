'use strict';
angular.module('PIVF').controller("PatientDashboardCtrl", function ($rootScope, $scope, localStorageService, PatientDashboardSrv, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location,  $uibModal) {


    $rootScope.FormName = 'Patient Dashboard';
    // $scope.Dashboard = {};
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    //$scope.PatientUnderStimulationList = [];
    usSpinnerService.spin('GridSpinner');
    $scope.tempL = [];
    $scope.tempD = [];
    $scope.colorArray = ["#35c2af", "#DF7D37", "#247ba0", "#89cbef", "#727272", "#008bba"];





    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();

        console.warn(">>>>>>>>>> objResource" , objResource)
    }






     $scope.selectedDayTab = "AllDays";

    $scope.selectedDashboardTab = 'PatientUnderStimulation';


    $scope.selectedDashboardTabShowOnDashboard = objResource.lblPatientUnderStimulation;

    $scope.selectedDashboardTabValue  = 0;












    $scope.changeSelectedTab = function (tab , Value ) {
      debugger
      if(tab == 'PatientUnderStimulation'){

         $scope.selectedDashboardTab = tab ; //'Patient Under Stimulation';
         
         $scope.selectedDashboardTabShowOnDashboard = objResource.lblPatientUnderStimulation;
        
         $scope.selectedDashboardTabValue  = Value;
         $scope.StimulationPatientListNew(); 
      }    
     else if(tab == 'Trigger'){

         $scope.selectedDashboardTab =  tab; //'Trigger/HCG given';

         $scope.selectedDashboardTabShowOnDashboard = objResource.lblTriggerHCGgiven;


         $scope.selectedDashboardTabValue  = Value;
         $scope.TriggerPatientListNew();
      }      
     else if(tab == 'EmbryologyDay'){

         $scope.selectedDashboardTab = tab; //'Embryology Day';

         $scope.selectedDashboardTabShowOnDashboard = objResource.lblEmbryologyDay;

         $scope.selectedDashboardTabValue  = Value;
         $scope.GetAllDayPatientListNew();
         $scope.showDayTab('AllDays');
      
      }
       else if(tab == 'PregnancyTest'){

         $scope.selectedDashboardTab = tab; //'Pregnancy Test';

         $scope.selectedDashboardTabShowOnDashboard = objResource.lblPregnancyTest;


         $scope.selectedDashboardTabValue  = Value;
         $scope.GetPregnancyTestPatientListNew(); 
       
      }
       else if(tab == 'PregnancyUltrasound'){

         $scope.selectedDashboardTab = tab; //'Pregnancy Ultrasound';

         $scope.selectedDashboardTabShowOnDashboard = objResource.lblvPregnancyUltrasound;

         $scope.selectedDashboardTabValue  = Value;
         $scope.GetPregnancyUltrasoundPatientListNew();
         
      }
       else if(tab == 'PregnancyOutcome'){

         $scope.selectedDashboardTab = tab; //'Pregnancy Outcome';

         $scope.selectedDashboardTabShowOnDashboard = objResource.lblvPregnancyOutcome;


         $scope.selectedDashboardTabValue  = Value;
         $scope.GetPregnancyOutcomePatientListNew();
      }
    

    };


    
    $scope.EditPatient = function EditPatient(Item) {
        debugger;
        $rootScope.Item = Item;
        var Item = $rootScope.Item
        $scope.$emit('onSelect', { model: Item });

    }




    
        $scope.showDayTab = function (tab) {

            if(tab == 'AllDays'){
               $scope.selectedDayTab = tab;

               $scope.GetAllDayPatientListNew();
            }
            else if(tab == 'Day0'){
               $scope.selectedDayTab = tab;

               $scope.GetDay0PatientListNew();
            }
             else if(tab == 'Day1'){
               $scope.selectedDayTab = tab;

               $scope.GetDay1PatientListNew();
            }
             else if(tab == 'Day2'){
               $scope.selectedDayTab = tab;

               $scope.GetDay2PatientListNew();
            }
             else if(tab == 'Day3'){
               $scope.selectedDayTab = tab;

               $scope.GetDay3PatientListNew();
            }
             else if(tab == 'Day4'){
               $scope.selectedDayTab = tab;

               $scope.GetDay4PatientListNew();
            }
             else if(tab == 'Day5'){
               $scope.selectedDayTab = tab;

               $scope.GetDay5PatientListNew();
            }
             else if(tab == 'Day6'){
               $scope.selectedDayTab = tab;

               $scope.GetDay6PatientListNew();
            }


        };
      
      

   /*------------------------------------------------DownLoad PDF-------------------------------------*/
  
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




 $scope.downloadReport = function () {

    const element = document.getElementById('content');

  // Hide the eye icon before generating the PDF
    element.classList.add('hide-in-pdf');


    // Temporarily replace the class name for custom-table-container with no-table-styles
    const tableContainer = document.querySelector('.custom-table-container');

    const tableContainer1 = document.querySelector('.embroDays-custom-table-container');

    if (tableContainer) {
        tableContainer.classList.remove('custom-table-container');
        tableContainer.classList.add('no-table-styles');
    }

    if (tableContainer1) {
        tableContainer1.classList.remove('embroDays-custom-table-container');
        tableContainer1.classList.add('no-table-styles');
    }

    const dynamicFilename = `${$scope.selectedDashboardTab || 'Patient'}_List.pdf`;

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

             setTimeout(() => {
                    if(tableContainer){
                     tableContainer.classList.remove('no-table-styles');
                     tableContainer.classList.add('custom-table-container');
                    }
                     

                   if(tableContainer1){
                     tableContainer1.classList.remove('no-table-styles');
                     tableContainer1.classList.add('embroDays-custom-table-container');
                    }
                     

                     element.classList.remove('hide-in-pdf'); // Show the eye icon again after saving the PDF
              }, 1000); // Delay of 2 seconds (2000 milliseconds)
            
        });
};





$scope.downloadReportWithPreview = function () {
    const element = document.getElementById('content');

    // Hide the eye icon before generating the PDF
    element.classList.add('hide-in-pdf');

    // Temporarily replace the class name for custom-table-container with no-table-styles
    const tableContainer = document.querySelector('.custom-table-container');
    const tableContainer1 = document.querySelector('.embroDays-custom-table-container');

    if (tableContainer) {
        tableContainer.classList.remove('custom-table-container');
        tableContainer.classList.add('no-table-styles');
    }

    if (tableContainer1) {
        tableContainer1.classList.remove('embroDays-custom-table-container');
        tableContainer1.classList.add('no-table-styles');
    }

    const dynamicFilename = `${$scope.selectedDashboardTab || 'Patient'}_List.pdf`;

    const options = {
        margin: [1.5, 0.20, 0.5, 0.35],
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
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
                    day: '2-digit', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', hour12: true
                }).replace(',', '');

                pdf.text(`Print Date & Time: ${formattedDateTime}`, 0.5, pageHeight - 0.25);
                pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 0.5, pageHeight - 0.25, { align: 'right' });
            }

            // Convert PDF to Blob and open in new tab
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank'); // Open preview in new tab

        })
        .finally(() => {
            setTimeout(() => {
                if (tableContainer) {
                    tableContainer.classList.remove('no-table-styles');
                    tableContainer.classList.add('custom-table-container');
                }

                if (tableContainer1) {
                    tableContainer1.classList.remove('no-table-styles');
                    tableContainer1.classList.add('embroDays-custom-table-container');
                }

                element.classList.remove('hide-in-pdf'); // Show the eye icon again
            }, 1000);
        });
};




    /*------------------------------------------------------*/

          // Open the modal when needed
    $scope.openTablesPopup = function () {
        PatientDashboardSrv.openDateModal().then(function (result) {
            console.log('Modal closed with dates:', result.fromDate, result.toDate);
            // Additional logic after modal closure if needed
             $scope.functionToCallOnClose(result.fromDate, result.toDate)
        });
    };


    //    $scope.openTablesPopup = function (row) {
    
    //    var modalInstance = $uibModal.open({
    //        templateUrl: "exampleModal",
    //        controller: 'customModalCtrl',
    //        size: '',
    //        windowClass: 'custom-xl-modal',
    //        resolve: {
    //            row: function () {
    //                return row; // Pass the row object to the modal controller
    //            }
    //        }
    //    });


    //     // Handle modal close
    //    modalInstance.result.then(function (result) {
    //    console.log("result" , result)
    //       // Call the function when the modal is closed
    //       $scope.functionToCallOnClose(); // Replace with the actual function name
    //   })


    //};




// Function to format date as dd/mm/yyyy
function formatDate(date) {
    const day = ('0' + date.getDate()).slice(-2); // Ensure two digits for day
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure two digits for month
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


// Function to format date as yyyy-mm-dd
function formatDateForAPIcall(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure two digits for month
    const day = ('0' + date.getDate()).slice(-2); // Ensure two digits for day
    return `${year}-${month}-${day}`;
}


// Function to format date as dd-mmm-yyyy
function formatDates(date) {
    const day = ('0' + date.getDate()).slice(-2); // Ensure two digits for day
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()]; // Get abbreviated month name
    const year = date.getFullYear(); // Full year
    return `${day}-${month}-${year}`;
}



    $scope.functionToCallOnClose = function(FromDate , ToDate) {
          
          $scope.chartCustomFdate = formatDates(new Date(FromDate)) // for show
          $scope.chartCustomTdate = formatDates(new Date(ToDate)) // for show

        console.log("Modal closed with dates:--------------", $scope.chartCustomFdate , $scope.chartCustomTdate);

        $scope.mychartFromDate = formatDateForAPIcall(new Date(FromDate)) // for api call
        $scope.mychartToDate = formatDateForAPIcall(new Date(ToDate)) // for api call

        $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
        $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

        console.log("Modal closed with dates:--------------",   $scope.mychartFromDate ,  $scope.mychartToDate);
        $scope.dashHeading = $scope.chartCustomFdate + " - " + $scope.chartCustomTdate ;

        $scope.loadDashboard(); //load dashboard
    }



    /*-----------------------------------------------*/

    $scope.loadDashboard = function(){

        $scope.GetPatientUnderStimulation(); // Get PatientUnderStimulation Count
        $scope.GetPatientTriggerCount(); //  Get Trigger/HCG given
        $scope.GetRemainingOPUList(); // Get Pre OPU Day
        $scope.GetPregnancyTestPatient(); // get Pregnancy Test
        $scope.GetPregnancyUltrasound(); //get Pregnancy Ultrasound
        $scope.GetPregnancyOutcome(); //get Pregnancy Outcome

        /*------------Embrology Days --------------*/

        $scope.GetDay0Patient();
        $scope.GetDay1Patient();
        $scope.GetDay2Patient();
        $scope.GetDay3Patient();
        $scope.GetDay4Patient();
        $scope.GetDay5Patient();
        $scope.GetDay6Patient();

        /*-----------------------------------------------*/

        $scope.GetTriggerList();
        $scope.GetETList();
        $scope.GetOPUList();
        $scope.GetBHCGList();
        $scope.GetUCGList();

        /*----------------------------------------------------*/

        $scope.StimulationPatientListNew() // for PatientList under stimulation patient
        $scope.GetAllDayPatientListNew(); // for PatientList and embrology days count 
        console.warn("$scope.Day0Patient..............." , $scope.Day0Patient , $scope.Day1Patient)

}


    /*-----------------------------------------------------------------------------------*/


$scope.showTab = function (tab) {
    $scope.selectedTab = tab;
    $scope.chartCustomFdate = null // for show custom date
    $scope.chartCustomTdate = null // for show custom date

    $scope.mychartFromDate = null // for api call
    $scope.mychartToDate = null // for api call

    $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
    $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

    const today = new Date(); // Current date

    if (tab === 'day') {
        // For 'day', log the current date
       

        $scope.mychartFromDate = formatDateForAPIcall(today)
        $scope.mychartToDate = formatDateForAPIcall(today)


        $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
        $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

        console.log("Current Date:", formatDateForAPIcall(today));

        $scope.dashHeading = "Todays";

        $scope.loadDashboard(); //load dashboard


    } 
    else if (tab === 'month') {
        // For 'month', calculate previous month's same date and today's date
       // const fromDate = new Date(today);
        //fromDate.setMonth(today.getMonth() - 1); // Previous month


       // Get the first day of the current month
       const fromDate = new Date(today.getFullYear(), today.getMonth(), 1);

        $scope.mychartFromDate = formatDateForAPIcall(fromDate)
        $scope.mychartToDate = formatDateForAPIcall(today)

        $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
        $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

        console.log("From Date (Previous Month):", $scope.mychartFromDate );
        console.log("To Date (Current Date):", $scope.mychartToDate );
        
        $scope.dashHeading = "Months";

        $scope.loadDashboard(); //load dashboard
    } 
    else if (tab === 'year') {
        // For 'year', calculate previous year's same date and today's date
       // const fromDate = new Date(today);
      //  fromDate.setFullYear(today.getFullYear() - 1); // Previous year

       // Get the first day of the current year
       const fromDate = new Date(today.getFullYear(), 0, 1); // Month is 0 (January)


        $scope.mychartFromDate = formatDateForAPIcall(fromDate)
        $scope.mychartToDate = formatDateForAPIcall(today)

        $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
        $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

        console.log("From Date (Previous Year):", $scope.mychartFromDate );
        console.log("To Date (Current Date):", $scope.mychartToDate );
         $scope.dashHeading = "Years";
        $scope.loadDashboard(); //load dashboard
    }
    else{

      $scope.openTablesPopup();
    }


  




};







    /*---------------------------------------------------------------------------------------------------------------------------*/

    $scope.onClickSlice = function (points, evt) {
        debugger;
        console.log(points);
    };


    $scope.FormLoad = function () {
        debugger;
        $rootScope.btnId = '';
        var btnId = '';
        $rootScope.btnId1 = '';
        var btnId1 = '';
        $rootScope.btnId2 = '';
        var btnId2 = '';
        $rootScope.btnId3 = '';
        var btnId3 = '';
        $rootScope.btnId4 = '';
        var btnId4 = '';
        $rootScope.btnId5 = '';
        var btnId5 = '';
        $rootScope.btnId6 = '';
        var btnId6 = '';
        $rootScope.btnId7 = '';
        var btnId7 = '';
        $rootScope.btnId8 = '';
        var btnId8 = '';
        $rootScope.btnId9 = '';
        var btnId9 = '';
        $rootScope.btnId10 = '';
        var btnId10 = '';
        $rootScope.btnId11 = '';
        var btnId11 = '';
        $rootScope.btnId12 = '';
        var btnId12 = '';
        $rootScope.btnId13 = '';
        var btnId13 = '';
        $rootScope.btnId14 = '';
        var btnId14 = '';
        $rootScope.btnId15 = '';
        var btnId15 = '';
        $rootScope.btnId16 = '';
        var btnId16 = '';
        $rootScope.btnId17 = '';
        var btnId17 = '';
        //$scope.GetTriggerList();
        //$scope.GetETList();
        //$scope.GetOPUList();
        //$scope.GetPatientUnderStimulation();
        //$scope.GetPatientTriggerCount();
        //$scope.GetRemainingOPUList();
        //$scope.GetBHCGList();
        //$scope.GetUCGList();
        //$scope.GetDay0Patient();
        //$scope.GetDay1Patient();
        //$scope.GetDay2Patient();
        //$scope.GetDay3Patient();
        //$scope.GetDay4Patient();
        //$scope.GetDay5Patient();
        //$scope.GetDay6Patient();
        //$scope.GetPregnancyTestPatient();
        //$scope.GetPregnancyUltrasound();
        //$scope.GetPregnancyOutcome();
        debugger;
        $scope.GetVisitTypeList();
        $scope.GenerateVisits();

        $scope.selectedTab = 'year'; // Default tab
        $scope.showTab($scope.selectedTab);
        $scope.GetUnitDetails(); // get clinic details
    }

 /*---------------------------------------------------------------------------------------------------------------------------*/

    $scope.GetTriggerList = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) { //Today's patient
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetTriggerList(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.TriggerList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetOPUList = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetOPUList(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.OPUList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetETList = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate) {
        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetETList(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.ETList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPatientUnderStimulation = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPatientUnderStimulation(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientUnderStimulation = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPatientTriggerCount = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        //  debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPatientTriggerCount(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientTrigger = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
/*---------------------------------------------------------------------------------------------------------------------------*/

    $scope.GetRemainingOPUList = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate) {
        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetRemainingOPUList(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.RemainingOPUList = Response.data;

            $scope.RemainingOPU = $scope.RemainingOPUList.BarData[0].Data[0];


            console.log("....................................R.............." , $scope.RemainingOPUList , $scope.RemainingOPUList.BarData[0].Data[0])

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay0Patient = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay0Patient(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day0Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay1Patient = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay1Patient(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day1Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay2Patient = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay2Patient(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day2Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay3Patient = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        //  debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay3Patient(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day3Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay4Patient = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay4Patient(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day4Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay5Patient = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        //   debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay5Patient(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day5Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay6Patient = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay6Patient(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day6Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetBHCGList = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetBHCGList(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.BHCGPatient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetUCGList = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetUCGList(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.HCGPatient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyTestPatient = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyTestPatient(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PregnancyTest = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyUltrasound = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {

        //  debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyUltrasound(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PregnancyUltrasound = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyOutcome = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
        //   debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyOutcome(fromDate , toDate);//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PregnancyOutcome = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.StimulationPatientList = function (btnId) {
        //  debugger;
        $rootScope.FormName = 'Patient Under Stimulation';
        $rootScope.btnId = btnId;
        $location.path('/PatientDashboardList/');
    }


    //fetching List of patientUnderStimulation 
    $scope.StimulationPatientListNew = function(fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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






        //fetching List of patient Trigger/HCG given
    $scope.TriggerPatientListNew = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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

    /*--------------------------Embrology Days PatientList-----------------------------*/


       //fetching List of GetAllDayPatientListNew 
    $scope.GetAllDayPatientListNew = function(fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetAllDayPatientList(fromDate , toDate);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if( $scope.selectedDashboardTab === 'EmbryologyDay'){
                $scope.PatientList = Response.data;
            }           
           $scope.GetAllDayPatientList = Response.data
            if (Response.data.length > 0) {
                $scope.TotalItems = Response.data[0].TotalCount;
            }
            else $scope.TotalItems = 0;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }



     //fetching List of patient Day 0
    $scope.GetDay0PatientListNew = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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
    //fetching List of patient Day1
    $scope.GetDay1PatientListNew = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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
    //fetching List of patient Day 2
    $scope.GetDay2PatientListNew = function(fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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
    //fetching List of patient Day 3
    $scope.GetDay3PatientListNew = function(fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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
    //fetching List of patient Day4
    $scope.GetDay4PatientListNew = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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
    //fetching List of patient Day 5
    $scope.GetDay5PatientListNew = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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
    //fetching List of patient Day6
    $scope.GetDay6PatientListNew = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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



    /*-------------------------------------------------------*/
       //fetching List of patient PregnancyTest
    $scope.GetPregnancyTestPatientListNew = function(fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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


     //fetching List of patient PregnancyUltrasound
    $scope.GetPregnancyUltrasoundPatientListNew = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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


    //fetching List of patient PregnancyOutcome
    $scope.GetPregnancyOutcomePatientListNew = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate) {
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
    $scope.TriggerPatientList = function (btnId1) {
        //  debugger;
        $rootScope.FormName = 'Trigger/HCG given';
        $rootScope.btnId1 = btnId1;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay0PatientList = function (btnId2) {
        // debugger;
        $rootScope.FormName = 'Day 0';
        $rootScope.btnId2 = btnId2;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay1PatientList = function (btnId3) {
        //debugger;
        $rootScope.FormName = 'Day 1';
        $rootScope.btnId3 = btnId3;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay2PatientList = function (btnId4) {
        //  debugger;
        $rootScope.FormName = 'Day 2';
        $rootScope.btnId4 = btnId4;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay3PatientList = function (btnId5) {
        //  debugger;
        $rootScope.FormName = 'Day 3';
        $rootScope.btnId5 = btnId5;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay4PatientList = function (btnId6) {
        //   debugger;
        $rootScope.FormName = 'Day 4';
        $rootScope.btnId6 = btnId6;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay5PatientList = function (btnId7) {
        //  debugger;
        $rootScope.FormName = 'Day 5';
        $rootScope.btnId7 = btnId7;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay6PatientList = function (btnId8) {
        //  debugger;
        $rootScope.FormName = 'Day 6';
        $rootScope.btnId8 = btnId8;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyTestPatientList = function (btnId9) {
        //  debugger;
        $rootScope.FormName = 'Pregnancy Test';
        $rootScope.btnId9 = btnId9;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyUltrasoundPatientList = function (btnId10) {
        // debugger;
        $rootScope.FormName = ' Pregnancy Ultrasound';
        $rootScope.btnId10 = btnId10;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyOutcomePatientList = function (btnId11) {
        //  debugger;
        $rootScope.FormName = 'Pregnancy Outcome';
        $rootScope.btnId11 = btnId11;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetETPatientList = function (btnId12) {
        // debugger;
        $rootScope.FormName = 'ET';
        $rootScope.btnId12 = btnId12;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetTriggerPatientList = function (btnId13) {
        //  debugger;
        $rootScope.FormName = 'Trigger';
        $rootScope.btnId13 = btnId13;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetOPUPatientList = function (btnId14) {
        //  debugger;
        $rootScope.FormName = 'OPU';
        $rootScope.btnId14 = btnId14;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetBHCGPatientList = function (btnId15) {
        // debugger;
        $rootScope.FormName = 'BHCG';
        $rootScope.btnId15 = btnId15;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetUSGPatientList = function (btnId16) {
        //  debugger;
        $rootScope.FormName = 'USG';
        $rootScope.btnId16 = btnId16;
        $location.path('/PatientDashboardList/');
    }

     $scope.GetRemainingOPUPatientList = function (btnId17) {
        //  debugger;
        $rootScope.FormName = 'Pre OPU Day';
        $rootScope.btnId17 = btnId17;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetVisitTypeList = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetVisitTypeList();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.VisitTypeList = Response.data;
            $scope.ResponseData = [];
            $scope.ResponseData = Response.data;
            var SumCount = 0;
            for (var i = 0; i < $scope.ResponseData.length; i++) {
                SumCount = SumCount + $scope.ResponseData[i].PatientCount;
                $scope.TotalSumCount = SumCount;
            }

            for (var i = 0; i < $scope.VisitTypeList.length ; i++) {
                if ($scope.VisitTypeList[i].VisitTypeID == 1) {
                    $scope.VisitTypeShow = true;
                }
                if ($scope.VisitTypeList[i].VisitTypeID == 2) {
                    $scope.VisitTypeShow = true;
                }
                if ($scope.VisitTypeList[i].VisitTypeID == 3) {
                    $scope.VisitTypeShow = true;
                }
                if ($scope.VisitTypeList[i].VisitTypeID == 4) {
                    $scope.VisitTypeShow = true;
                }
                if ($scope.VisitTypeList[i].VisitTypeID == 5) {
                    $scope.VisitTypeShow = true;
                }
                if ($scope.VisitTypeList[i].VisitTypeID == 6) {
                    $scope.VisitTypeShow = true;
                }
                if ($scope.VisitTypeList[i].VisitTypeID == 7) {
                    $scope.VisitTypeShow = true;
                }
                if ($scope.VisitTypeList[i].VisitTypeID == 9) {
                    $scope.VisitTypeShow = true;
                }
                if ($scope.VisitTypeList[i].VisitTypeID == 10) {
                    $scope.VisitTypeShow = true;
                }
            }

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/

    $scope.GetQueueList = function GetQueueList(Item1) {
        debugger;
        $rootScope.VisitTypeID = Item1.VisitTypeID
        $location.path('/QueueList/');

    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GenerateVisits = function () {
        debugger;
        //usSpinnerService.spin('GridSpinner');
        var ResponseData = PatientDashboardSrv.GetVisitTypeList()
        ResponseData.then(function (Response) {
            //usSpinnerService.stop('GridSpinner');
            debugger;
            $scope.tempL = [];
            $scope.tempD = [];
            $scope.tempS = [];
            $scope.tempT = [];
            $scope.ResponseData = [];
            $scope.ResponseData = Response.data;
            for (var i = 0; i < $scope.ResponseData.length; i++) {
                $scope.tempL[i] = $scope.ResponseData[i].Description;
                if ($scope.tempT[i] = $scope.TotalSumCount == 0) {
                    $scope.tempD[i] = 0
                }
                else {
                    $scope.tempD[i] = (($scope.ResponseData[i].PatientCount / $scope.TotalSumCount) * 100).toFixed(2);
                }
                $scope.tempS[i] = $scope.ResponseData[i].PatientCount;
                $scope.tempT[i] = $scope.TotalSumCount;
            }
            $scope.chartData();
        }, function (error) {
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.chartData = function () {
        debugger;
        $scope.options = {};
        $scope.data = [];
        $scope.labels = [];
        $scope.labels = $scope.tempL;
        $scope.data = $scope.tempD;
        var options = {
            responsive: true,
            title: {
                display: true,
                position: "middle",
                //text: $scope.chartTitle,
                fontSize: 10,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 10
                }
            }
        };
        var fillcolorbar = [];
        for (var i = 0; i < $scope.data.length; i++) {
            fillcolorbar[i] = randomColorGenerator($scope.data.length, i);
        }
        console.log(fillcolorbar);
        $scope.chartColor = [{
            backgroundColor: fillcolorbar,
            pointBackgroundColor: "rgba(255,0,0,0.6)",
            pointHoverBackgroundColor: "rgba(255,0,0,0.6)",

            pointBorderColor: '#fff',
            pointHoverBorderColor: "rgba(255,0,0,0.6)"
        }]
        $scope.options = options;
        $scope.createListVisitData();

    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    var randomColorGenerator = function (length, pos) {
        debugger;
        var i = pos - 6 * Math.floor(pos / 6);
        return $scope.colorArray[i];

    };
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.createListVisitData = function () {
        debugger;
        $scope.ListVisitData = [];
        for (var i = 0; i < $scope.labels.length; i++) {
            $scope.ListVisitData[i] = {
                labels: $scope.labels[i],
                data: $scope.tempD[i],

            }
        }
        console.log($scope.data)
    }



});