'use strict';
angular.module('PIVF').controller("fertivueDashboardCtrl",  function ($rootScope, $scope, localStorageService, PatientDashboardSrv, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location , $uibModal) {


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

    $scope.fontColor = "#767676" // chart font color
    $scope.datalabelBgColor = '#e8e8e8';


    //$scope.openTablesPopup = function (row) {
    
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



      // Open the modal when needed
    $scope.openTablesPopup = function () {
        PatientDashboardSrv.openDateModal().then(function (result) {
            console.log('Modal closed with dates:', result.fromDate, result.toDate);
            // Additional logic after modal closure if needed

            $scope.functionToCallOnClose(result.fromDate, result.toDate)

        });
    };



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




    $scope.functionToCallOnClose = function(FromDate , ToDate ) {
          
          $scope.chartCustomFdate = formatDates(new Date(FromDate)) // for show
          $scope.chartCustomTdate = formatDates(new Date(ToDate)) // for show

        console.log("Modal closed with dates:--------------", $scope.chartCustomFdate , $scope.chartCustomTdate);

        $scope.mychartFromDate = formatDateForAPIcall(new Date(FromDate)) // for api call
        $scope.mychartToDate = formatDateForAPIcall(new Date(ToDate)) // for api call

    $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
    $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

        console.log("Modal closed with dates:--------------",   $scope.mychartFromDate ,  $scope.mychartToDate);

        $scope.changeRegi($scope.RegID); //registration chart
        $scope.GenerateVisitsChart(); //visit chart
        $scope.changeApp($scope.AppID); // Appointment Chart
        $scope.GetInvestigationData() //Investigation Chart
        $scope.changeBill($scope.BillID) // Billing chart
        $scope.GetRevenueData() ; //revenue Chart
    }




/*------------------------------------------------------*/

$scope.showTab = function (tab) {
    $scope.selectedTab = tab;
    $scope.chartCustomFdate = null // for show custom date
    $scope.chartCustomTdate = null // for show custom date

    $scope.mychartFromDate = null // for api call
    $scope.mychartToDate = null // for api call

    const today = new Date(); // Current date

    $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
    $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

    if (tab === 'day') {

        $scope.percentageAsPer = "day"

        // For 'day', log the current date
       

        $scope.mychartFromDate = formatDateForAPIcall(today)
        $scope.mychartToDate = formatDateForAPIcall(today)

    $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
    $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

         console.log("Current Date:", formatDateForAPIcall(today));


         const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

       
        $scope.lastToDate = formatDateForAPIcall(yesterday);

        $scope.lastFromDate = formatDateForAPIcall(yesterday);

        $scope.changeRegi($scope.RegID); //registration chart
        $scope.GenerateVisitsChart(); //visit chart
        $scope.changeApp($scope.AppID); // Appointment Chart
        $scope.GetInvestigationData() //Investigation Chart
        $scope.changeBill($scope.BillID) // Billing chart
        $scope.GetRevenueData() ; //revenue Chart
        $scope.GetAdminDashboardPercentageCounts() // for percentage calculation
    } 
    else if (tab === 'month') {
     $scope.percentageAsPer = "month"
        // For 'month', calculate previous month's same date and today's date
      // const fromDate = new Date(today);
      //  fromDate.setMonth(today.getMonth() - 1); // Previous month

      // Get the first day of the current month
       const fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
       const lastFromDate = new Date(today.getFullYear(), today.getMonth() - 1 , 1); // last month 1st day

       const sameDayLastMonth = new Date(today);
             sameDayLastMonth.setMonth(today.getMonth() - 1);  // same day of last month




        $scope.mychartFromDate = formatDateForAPIcall(fromDate)
        $scope.mychartToDate = formatDateForAPIcall(today)

    $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
    $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst


    
        //$scope.lastToDate = formatDateForAPIcall(fromDate);

         $scope.lastToDate = formatDateForAPIcall(sameDayLastMonth);

        $scope.lastFromDate = formatDateForAPIcall(lastFromDate);



        console.log("From Date (Previous Month):", $scope.mychartFromDate );
        console.log("To Date (Current Date):", $scope.mychartToDate );



        $scope.changeRegi($scope.RegID); //registration chart
        $scope.GenerateVisitsChart(); //visit chart
        $scope.changeApp($scope.AppID); // Appointment Chart
        $scope.GetInvestigationData() //Investigation Chart
        $scope.changeBill($scope.BillID) // Billing chart
        $scope.GetRevenueData() ; //revenue Chart

        $scope.GetAdminDashboardPercentageCounts() // for percentage calculation
    } 
    else if (tab === 'year') {
        $scope.percentageAsPer = "year"
        // For 'year', calculate previous year's same date and today's date

        //const fromDate = new Date(today);
       // fromDate.setFullYear(today.getFullYear() - 1); // Previous year

       // Get the first day of the current year
       const fromDate = new Date(today.getFullYear(), 0, 1); // Month is 0 (January) current yeartStart

       const lastFromDate = new Date(today.getFullYear() - 1 , 0, 1); // Month is 0 (January) last yeartStart

       const sameDayLastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());   // same day of last year
      

        $scope.mychartFromDate = formatDateForAPIcall(fromDate)
        $scope.mychartToDate = formatDateForAPIcall(today)


        //$scope.lastToDate = formatDateForAPIcall(fromDate);

        $scope.lastToDate = formatDateForAPIcall(sameDayLastYear);

        $scope.lastFromDate = formatDateForAPIcall(lastFromDate);


    $rootScope.patientListFromDate = $scope.mychartFromDate  //for PatientLIst
    $rootScope.patientListToDate = $scope.mychartToDate  //for PatientLIst

        console.log("From Date (Previous Year):", $scope.mychartFromDate );
        console.log("To Date (Current Date):", $scope.mychartToDate );

        $scope.changeRegi($scope.RegID); //registration chart
        $scope.GenerateVisitsChart(); //visit chart
        $scope.changeApp($scope.AppID); // Appointment Chart
        $scope.GetInvestigationData() //Investigation Chart
        $scope.changeBill($scope.BillID) // Billing chart
        $scope.GetRevenueData() ; //revenue Chart

        $scope.GetAdminDashboardPercentageCounts() // for percentage calculation
    }
    else{

      $scope.openTablesPopup();
    }


  




};





    /*--------------------------------------------------------Registration----------------------------------------------------------*/
/* $scope.registrationChartInstance = null;

$scope.registrationChart = function() {
    const chartElement = document.getElementById('registrationChart1');
    if (!chartElement) {
        console.error("Chart element not found!");
        return;
    }
    const ctx = chartElement.getContext('2d');

    // Destroy existing chart instance if it exists
    if ($scope.registrationChartInstance) {
        $scope.registrationChartInstance.destroy();
    }

    // Create a new horizontal bar chart
    $scope.registrationChartInstance = new Chart(ctx, {
        type: 'horizontalBar', // Change to horizontal bar chart
        data: {
            labels: $scope.regxValues || [],
            datasets: [{
                backgroundColor: $scope.registratinColorArray || [],
                hoverBackgroundColor: $scope.hoverColorArray || [], // Hover effect colors              
                data: $scope.regyValues || [],
                borderWidth: 0, // Removes the bar border
                borderSkipped: false, // Ensures all edges can be rounded
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Important to allow height adjustment
            title: {
                display: !!$scope.chartTitle,
                text: $scope.chartTitle || "", 
                fontColor: $scope.fontColor || '#000',
                fontSize: 16,
                fontStyle: 'bold'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: $scope.fontColor || '#000',
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                     gridLines: {
                display: true, // Show grid lines
                drawBorder: false, // Hide axis border
                color: "rgba(0, 0, 0, 0.1)", // Light gray grid lines
                lineWidth: 1, // Grid line thickness
                borderDash: [5, 5] // Creates dotted effect
            },
                    scaleLabel: {
                        display: !!$scope.regyTitle, // Y-axis title becomes X-axis in horizontal charts
                        labelString: $scope.regyTitle || "",
                        fontColor: $scope.fontColor || '#000',
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: $scope.fontColor || '#000',
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                    gridLines: {
                display: true, // Show grid lines
                drawBorder: false, // Hide axis border
                color: "rgba(0, 0, 0, 0.1)", // Light gray grid lines
                lineWidth: 1, // Grid line thickness
                borderDash: [5, 5] // Creates dotted effect
            },
                    scaleLabel: {
                        display: !!$scope.regxTitle, // X-axis title becomes Y-axis in horizontal charts
                        labelString: $scope.regxTitle || "",
                        fontColor: $scope.fontColor || '#000',
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }]
            },
            legend: { display: false },
              tooltips: {
                enabled: true // Tooltips still show on hover
            },
            plugins: {
                datalabels: {
                    display: false // Hides values on bars
                }
            }
        }
    });
}; */


$scope.registrationChart = function() {
    const chartElement = document.getElementById('registrationChart1');
    if (!chartElement) {
        console.error("Chart element not found!");
        return;
    }
    const ctx = chartElement.getContext('2d');

    // Destroy existing chart instance if it exists
    if ($scope.registrationChartInstance) {
        $scope.registrationChartInstance.destroy();
    }

    // Create a new horizontal bar chart
    $scope.registrationChartInstance = new Chart(ctx, {
        type: 'horizontalBar', 
        data: {
            labels: $scope.regxValues || [],
            datasets: [{
                backgroundColor: $scope.registratinColorArray || [],
                hoverBackgroundColor: $scope.hoverColorArray || [],            
                data: $scope.regyValues || [],
                borderWidth: 0, 
                borderSkipped: false, 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: !!$scope.chartTitle,
                text: $scope.chartTitle || "", 
                fontColor: $scope.fontColor || '#000',
                fontSize: 16,
                fontStyle: 'bold'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: $scope.fontColor || '#000',
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                    gridLines: {
                        display: true,
                        drawBorder: false,
                        color: "rgba(0, 0, 0, 0.1)",
                        lineWidth: 1,
                        borderDash: [5, 5]
                    },
                    scaleLabel: {
                        display: !!$scope.regyTitle,
                        labelString: $scope.regyTitle || "",
                        fontColor: $scope.fontColor || '#000',
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: $scope.fontColor || '#000',
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                    gridLines: {
                        display: true,
                        drawBorder: false,
                        color: "rgba(0, 0, 0, 0.1)",
                        lineWidth: 1,
                        borderDash: [5, 5]
                    },
                    scaleLabel: {
                        display: !!$scope.regxTitle,
                        labelString: $scope.regxTitle || "",
                        fontColor: $scope.fontColor || '#000',
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }]
            },
            legend: { display: false },
            tooltips: {
                enabled: true 
            },
            plugins: {
                datalabels: {
                    display: false
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    let clickedIndex = elements[0]._index;
                    // Get X and Y values
                    let xValue = $scope.regyValues[clickedIndex]; // X-axis value
                    let yValue = $scope.regxValues[clickedIndex]; // Y-axis label
                   
                    // Call function to log patient details
                    $scope.logPatientDetails(xValue , yValue );
                }
            }
        }
    });
};


// Function to log patient details
$scope.logPatientDetails = function(xValue , yValue ) {
    if (!xValue || !yValue ) {
        console.error("No patient details found!");
        return;
    }
    console.log("Clicked Patient Details:", xValue , yValue );

     $scope.showRegistrationPatientList(xValue , yValue );
};





$scope.changeRegi = function(ID) {
    $scope.RegID = ID;
    // Update data and titles based on the selected ID
    if ($scope.RegID == 1) {
        //$scope.regxValues = ["< 35", "35 - 37", "38 - 40", "41 - 42", "> 42"];
        //$scope.regyValues = [5500, 4900, 4400, 2400, 1500];
           $scope.registratinColorArray = ["#EFEFEF","#EFEFEF","#EFEFEF","#EFEFEF" , "#EFEFEF"];
            $scope.hoverColorArray = ["#BDE3ED","#BDE3ED","#BDE3ED","#BDE3ED" , "#BDE3ED"];
        $scope.regxTitle = "Age Group";
        $scope.regyTitle = "No. of Registrations"; // Y-axis title for Age Distribution
        $scope.GetAgeGroupData()
    } else {
        //$scope.regxValues = ["Daily", "Weekly", "Monthly", "Annually"];
        //$scope.regyValues = [70, 29, 54, 84];
        $scope.registratinColorArray = ["#EFEFEF","#EFEFEF","#EFEFEF","#EFEFEF"];
        $scope.hoverColorArray = ["#BDE3ED","#BDE3ED","#BDE3ED","#BDE3ED"];
        $scope.regxTitle = "Trends";
        $scope.regyTitle = "Number of Trends"; // Y-axis title for Trends
        $scope.GetTrandsData()
    }


};


$scope.changeSelectedChart = function(ID) {
    $scope.selectedChart = ID;

     if ($scope.selectedChart == 1) {
              $scope.GetInvestigationData() //Investigation Chart
    } else {
         $scope.GetRevenueData() ; //revenue Chart
    }

}





$scope.GetTrandsData = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate){
 usSpinnerService.spin('GridSpinner');
    var response = PatientDashboardSrv.GetRegistrationDashboardTrends( formatDateForAPIcall(new Date()),  formatDateForAPIcall(new Date()) );     // PatientDashboardSrv.GetRegistrationDashboardTrends( fromDate , toDate );
     response.then(function (res) {
 
            $scope.regxValues = res.data.BarChart ;
            $scope.regyValues = res.data.BarData[0].Data ;

            // Update the chart with new data and titles
           // $scope.registrationChart();

        if ($scope.registrationChartInstance) {
           $scope.registrationChartInstance.destroy();
        }

       setTimeout(() => { 
          $scope.registrationChart(); 
       }, 100);


            usSpinnerService.stop('GridSpinner');
     })
    
};

$scope.GetAgeGroupData = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate){
    usSpinnerService.spin('GridSpinner');
    var response = PatientDashboardSrv.GetRegistrationDashboardByAgeGroupCount( fromDate , toDate );
     response.then(function (res) {

          $scope.regxValues = res.data.BarChart;
          $scope.regyValues = res.data.BarData[0].Data;

          // Update the chart with new data and titles
          //$scope.registrationChart();


        if ($scope.registrationChartInstance) {
           $scope.registrationChartInstance.destroy();
        }

       setTimeout(() => { 
          $scope.registrationChart(); 
       }, 100);


          usSpinnerService.stop('GridSpinner');
    })

};












$scope.GetAdminDashboardPercentageCounts = function (fromDate = $scope.mychartFromDate , toDate = $scope.mychartToDate , lastFromDate = $scope.lastFromDate ,  lastToDate = $scope.lastToDate){
    usSpinnerService.spin('GridSpinner');
    var response = PatientDashboardSrv.GetAdminDashboardPercentageCounts( fromDate , toDate , lastFromDate , lastToDate );
     response.then(function (res) {

              console.log(">>>>>>>>>>>>>>>>>>> res" , res.data)

              $scope.GetAdminDashboardPercentageData = res.data;

          usSpinnerService.stop('GridSpinner');
    })

};























/*--------------------------------------------Investigation --------------------------------------------------------*/
$scope.investigationChartInstance = null;
$scope.investigationxTitle = "Investigations";
$scope.investigationyTitle = "No. of Patients";
//$scope.instiLabel = ['Routine Blood Test', 'Andrology', 'Radiology'];
//$scope.instiLabel1 = "Total";
//$scope.instiData1 =[100, 80, 90];
//$scope.instiLabel2 = "Billed";
//$scope.instiData2 = [70, 30, 40];
//$scope.instiLabel3 = "Completed";
//$scope.instiData3 = [50, 50, 20];
$scope.InvestigationChart = function() {
    const ctx = document.getElementById('investigationChart1').getContext('2d');

    if ($scope.investigationChartInstance) {
        $scope.investigationChartInstance.destroy();
    }

    // Define custom colors for each line
    const lineColors = ["#5895A6", "#7BB9CA", "#EB8629"];

    // Chart instance
    $scope.investigationChartInstance = new Chart(ctx, {
        type: 'line', // Changed from 'bar' to 'line'
        data: {
            labels: $scope.instiLabel,
            datasets: [
                {
                    label: $scope.instiLabel1,
                    data: $scope.instiData1,
                    borderColor: lineColors[0], // Line color
                    pointBackgroundColor: lineColors[0], // Point color
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3 // Slight curve for smooth lines
                },
                {
                    label: $scope.instiLabel2,
                    data: $scope.instiData2,
                    borderColor: lineColors[1],
                    pointBackgroundColor: lineColors[1],
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3
                },
                {
                    label: $scope.instiLabel3,
                    data: $scope.instiData3,
                    borderColor: lineColors[2],
                    pointBackgroundColor: lineColors[2],
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Important to allow height adjustment
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: $scope.fontColor,
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                     gridLines: {
                display: true, // Show grid lines
                drawBorder: false, // Hide axis border
                color: "rgba(0, 0, 0, 0.1)", // Light gray grid lines
                lineWidth: 1, // Grid line thickness
                borderDash: [5, 5] // Creates dotted effect
            },
                    scaleLabel: {
                        display: true,
                        labelString: $scope.investigationxTitle,
                        fontColor: $scope.fontColor,
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: $scope.fontColor,
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                    gridLines: {
                display: true, // Show grid lines
                drawBorder: false, // Hide axis border
                color: "rgba(0, 0, 0, 0.1)", // Light gray grid lines
                lineWidth: 1, // Grid line thickness
                borderDash: [5, 5] // Creates dotted effect
            },
                    scaleLabel: {
                        display: true,
                        labelString: $scope.investigationyTitle,
                        fontColor: $scope.fontColor,
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }]
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: $scope.fontColor,
                    fontSize: 14,
                    fontStyle: 'bold',
                    boxWidth: 15 // Adjust legend box size
                }
            },
            tooltips: {
                enabled: true
            },
            title: {
                display: false
            },
            plugins: {
                datalabels: {
                    display: false,
                    color: $scope.fontColor,
                    backgroundColor: $scope.datalabelBgColor,
                    borderRadius: 4,
                    padding: 4,
                    font: {
                        weight: 'bold'
                    }
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    const firstElement = elements[0];
                    const datasetIndex = firstElement._datasetIndex;
                    const dataIndex = firstElement._index;
                    const label = $scope.instiLabel[dataIndex];
                    const datasetLabel = $scope.investigationChartInstance.data.datasets[datasetIndex].label;
                    const value = $scope.investigationChartInstance.data.datasets[datasetIndex].data[dataIndex];
                    console.log(`Clicked on: ${label}, Dataset: ${datasetLabel}, Value: ${value}`);
                    
                    $scope.showInvestigationPatientList(label);
                }
            }
        }
    });
};






  $scope.showInvestigationPatientList = function (label) { 
          $rootScope.FormName = label;
          $rootScope.btnId18 = 'investigation';
          $location.path('/PatientDashboardList/');         
 }


$scope.GetInvestigationData = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate){
 usSpinnerService.spin('GridSpinner');
    var response = PatientDashboardSrv.GetInvestigationDashboardCount( fromDate , toDate );
     response.then(function (res) {
       
            const data = res.data
            $scope.instiLabel = data.Labels;
            $scope.instiLabel1 = data.Datasets[0].Label;
            $scope.instiData1 = data.Datasets[0].Data;
            $scope.instiLabel2 = data.Datasets[1].Label;
            $scope.instiData2 = data.Datasets[1].Data;
            $scope.instiLabel3 = data.Datasets[2].Label;
            $scope.instiData3 = data.Datasets[2].Data;
            
           // $scope.InvestigationChart();


           
        if ($scope.investigationChartInstance) {
           $scope.investigationChartInstance.destroy();
        }

       setTimeout(() => { 
          $scope.InvestigationChart(); 
       }, 100);






            usSpinnerService.stop('GridSpinner');
    })

};





/*--------------------------------- Revenue ------------------------------*/

$scope.revenueChartInstance = null;
$scope.revenuexTitle = "Revenue";
$scope.revenueyTitle = "Services";
//$scope.revenueData = [8, 10, 16, 4, 4, 4];
//$scope.revenueLabels = ['IVF', 'Andrology', 'OT', 'IUI', 'Consultation', 'Pharmacy'];
//$scope.revenueUnit = 'M';
$scope.RevenueChart = function() {
    const ctx = document.getElementById('revenueChart').getContext('2d');

    if ($scope.revenueChartInstance) {
        $scope.revenueChartInstance.destroy();
    }

    $scope.revenueChartInstance = new Chart(ctx, {
        type: 'line', // Changed to line chart
        data: {
            labels: $scope.revenueLabels,
            datasets: [{
                label: 'Revenue',
                data: $scope.revenueData,
                borderColor: "#5895A6", // Line color
             //   backgroundColor: "rgba(175, 175, 175, 0.2)", // Light fill color (optional)
                pointBackgroundColor: "#5895A6", // Point color
                borderWidth: 2, // Line thickness
                fill: false, // No fill under the line
                tension: 0.3 // Slight curve to the line
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Important to allow height adjustment
            plugins: {
                datalabels: {
                    display: false,
                    color: $scope.fontColor,
                    backgroundColor: $scope.datalabelBgColor,
                    borderRadius: 4,
                    padding: 4,
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value + $scope.revenueUnit;
                    },
                    align: 'top',
                    anchor: 'end'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: $scope.fontColor,
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                     gridLines: {
                display: true, // Show grid lines
                drawBorder: false, // Hide axis border
                color: "rgba(0, 0, 0, 0.1)", // Light gray grid lines
                lineWidth: 1, // Grid line thickness
                 borderDash: [5, 5] // Creates dotted effect
            },
                    scaleLabel: {
                        display: true,
                        labelString: $scope.revenuexTitle,
                        fontColor: $scope.fontColor,
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {
                            return value + $scope.revenueUnit;
                        },
                        fontColor: $scope.fontColor,
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                     gridLines: {
                display: true, // Show grid lines
                drawBorder: false, // Hide axis border
                color: "rgba(0, 0, 0, 0.1)", // Light gray grid lines
                lineWidth: 1, // Grid line thickness
                borderDash: [5, 5] // Creates dotted effect
            },
                    scaleLabel: {
                        display: true,
                        labelString: $scope.revenueyTitle,
                        fontColor: $scope.fontColor,
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }]
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: $scope.fontColor, // Set legend text color
                    fontSize: 14, // Set font size
                    fontStyle: 'bold' // Set font style
                }
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.yLabel + $scope.revenueUnit;
                    }
                }
            },
            title: {
                display: false
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    const firstElement = elements[0];
                    const label = $scope.revenueLabels[firstElement._index]; 
                    console.log('Clicked on label:', label);

                    $scope.showRervenuePatientList(label);
                }
            }
        }
    });
};




  $scope.showRervenuePatientList = function (label) { 
          $rootScope.FormName = label;
          $rootScope.btnId18 = 'revenue';
          $location.path('/PatientDashboardList/');         
 }



$scope.GetRevenueData = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate){
 usSpinnerService.spin('GridSpinner');
    var response = PatientDashboardSrv.GetTotalRevenueDashboardServiceTypeCount( fromDate , toDate );
     response.then(function (res) {
       $scope.revenueData = res.data.BarData[0].Data;
       $scope.revenueLabels = res.data.BarChart; 
       $scope.revenueUnit = res.data.Units[0];
       //$scope.RevenueChart();

        if ($scope.revenueChartInstance) {
           $scope.revenueChartInstance.destroy();
        }

       setTimeout(() => { 
          $scope.RevenueChart(); 
       }, 100);

       usSpinnerService.stop('GridSpinner');
    })

};


/*-------------------------appointment---------------------*/
$scope.appointmentChartInstance = null;

$scope.appointmentChart = function() {
    const ctx = document.getElementById('appointmentChart1').getContext('2d');

    // If a chart instance already exists, destroy it first
    if ($scope.appointmentChartInstance) {
        $scope.appointmentChartInstance.destroy();
    }

    $scope.appointmentChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: $scope.appointmentxData,
            datasets: [{
                backgroundColor: $scope.appointmentColourArray,
                data: $scope.appointmentyData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Important to allow height adjustment
            title: {
                display: true,
                text: "" // Optional: Add a dynamic title if needed
            },
            plugins: {
                datalabels: {
                    display: false,  // value on bar
                    color: $scope.fontColor || '#fff', // Set label font color
                    backgroundColor: $scope.datalabelBgColor , // Datalabel background color
                    borderRadius: 4, // Rounded corners
                    padding: 4, // Add padding around the datalabel
                    font: {
                        weight: 'bold',
                        size: 12 // Font size
                    },
                    formatter: function(value, context) {
                        const percentage = ((value / $scope.appointmentyData.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                        return `${percentage}%`; // Display percentage values
                    }
                }
            },
            cutoutPercentage: 50, // Inner cutout for the doughnut chart
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: $scope.fontColor, // Set legend text color
                    fontSize: 14, // Set font size
                    fontStyle: 'bold' // Set font style
                }
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem, data) {
                        const label = data.labels[tooltipItem.index];
                        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return `${label}: ${value}`; // Tooltip format
                    }
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    const firstElement = elements[0];
                    const index = firstElement._index; // Get the index of the clicked segment
                    const label = $scope.appointmentxData[index]; // Get the label of the clicked segment
                    const value = $scope.appointmentyData[index]; // Get the value of the clicked segment
                    console.log(`Clicked on: ${label}, Value: ${value}`);
                    $scope.showAppointmentPatientList(label); // Pass the label to the function
                }
            }
        }
    });
};







 $scope.showAppointmentPatientList = function () {

       if($scope.AppID == 1){       
          $rootScope.FormName = 'Type';
          $rootScope.btnId18 = 'Type';
          $location.path('/PatientDashboardList/'); 
       }
        else{

          $rootScope.FormName = 'Department';
          $rootScope.btnId18 = 'Department';
          $location.path('/PatientDashboardList/');
        
        }
     
  }


$scope.changeApp = function(ID) {
    $scope.AppID = ID;
    $scope.appointmentType = ""
    if ($scope.AppID == 1) {
        //$scope.appointmentxData = ["New", "Follow Up"];
        //$scope.appointmentyData = [30, 70];
        $scope.appointmentColourArray = ["#7BB9CA", "#BDE3ED", "#D8EDF4", "#EFEFEF" , "#DEDEDE" , "#B6B6B6"];
        $scope.appointmentType = "Type";

        $scope.GetAppointmentData()
    } 
    //else if ($scope.AppID == 2) {
    //    $scope.appointmentxData = ["Checked-In", "Attended", "Unattended"];
    //    $scope.appointmentyData = [30, 40, 30];
    //    $scope.appointmentColourArray = ["#FFD0C7", "#EF9685", "#AFAFAF"];
    //}
    else {
        $scope.appointmentType = "Department"
        //$scope.appointmentxData = ["OPD", "OT", "Ultrasound", "Blood Work", "Injection Room", "Semen Collection"];
        //$scope.appointmentyData = [10, 20, 30, 10, 20, 10];
        $scope.appointmentColourArray = ["#7BB9CA", "#BDE3ED", "#D8EDF4", "#EFEFEF" , "#DEDEDE" , "#B6B6B6"];

        $scope.GetAppointmentData()
    }

    // Update the chart
   // $scope.appointmentChart();

      if ($scope.appointmentChartInstance) {
           $scope.appointmentChartInstance.destroy();
      }

       setTimeout(() => { 
          $scope.appointmentChart(); 
       }, 100);

};




$scope.GetAppointmentData = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate , type = $scope.appointmentType ){
 usSpinnerService.spin('GridSpinner');
    var response = PatientDashboardSrv.GetAppointmentDashboardCount( fromDate , toDate , type );
     response.then(function (res) {

          $scope.appointmentxData = res.data.BarChart;
          $scope.appointmentyData = res.data.BarData[0].Data;

           console.log(">>>>>>>>>>>>>>>>>>>" ,res)
      
          // Update the chart
         // $scope.appointmentChart();


        if ($scope.appointmentChartInstance) {
           $scope.appointmentChartInstance.destroy();
        }

       setTimeout(() => { 
          $scope.appointmentChart(); 
       }, 100);




          usSpinnerService.stop('GridSpinner');
    })

};







/*-------------------------------------------visit -------------------------------------*/
$scope.visitChartInstance = null; // Instance to manage the chart

$scope.visitColourArray = ["#FFD0C7", "#FFF0EC", "#9B9B9B", "#E5E5E5"];

$scope.visitChart = function (data, label) {
    $scope.visitxData = label;
    $scope.visityData = data;

    const ctx = document.getElementById('visitChart1').getContext('2d');

    // Destroy existing chart instance if any
    if ($scope.visitChartInstance) {
        $scope.visitChartInstance.destroy();
    }

    // Create new chart instance
    $scope.visitChartInstance = new Chart(ctx, {
        type: 'radar', // Change to Radar Chart
        data: {
            labels: $scope.visitxData,
            datasets: [{
                label: 'Visits',
                backgroundColor: 'rgba(88, 149, 166, 0.14)', // Transparent fill color
                borderColor: '#5895A6', // Border color
                pointBackgroundColor: '#5895A6', // Data point color
                pointBorderColor: '#fff', // Border color for data points
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#5895A6',
                data: $scope.visityData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Important to allow height adjustment
            title: {
                display: true,
                text: "", // Optional: Dynamic title
                fontColor: $scope.fontColor, // Title font color
                fontSize: 16, // Title font size
                fontStyle: 'bold' // Title font style
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    fontColor: $scope.fontColor, // Legend text color
                    fontSize: 14, // Legend font size
                    fontStyle: 'bold' // Legend font style
                }
            },
            scale: {
                angleLines: {
                    display: true, // Show lines connecting center to outer labels
                    color: 'rgba(88, 149, 166, 0.14)' // Color of angle lines
                },
                gridLines: {
                    color: '#F1F0F3' // Color of grid lines
                },
                ticks: {
                    beginAtZero: true,
                    fontColor: $scope.fontColor, // Scale font color
                    fontSize: 12, // Scale font size
                    fontStyle: 'bold'
                }
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        const label = data.labels[tooltipItem.index];
                        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return `${label}: ${value}`; // Tooltip format
                    }
                }
            },
            plugins: {
                datalabels: {
                    display: false,
                    color: $scope.fontColor || '#fff', // Label text color
                    backgroundColor: $scope.datalabelBgColor, // Label background color
                    borderRadius: 4, // Rounded corners
                    padding: 4, // Padding for labels
                    font: {
                        weight: 'bold',
                        size: 12 // Font size
                    },
                    formatter: function (value, context) {
                        const total = $scope.visityData.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`; // Display percentage values
                    }
                }
            },
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    const firstElement = elements[0];
                    const index = firstElement._index; // Index of the clicked data point
                    const label = $scope.visitxData[index]; // X-axis label
                    const value = $scope.visityData[index]; // Data value
                    console.log(`Clicked on: ${label}, Value: ${value}`);

                    // Call a function to handle click action
                    $scope.handleVisitChartClick(label, value);
                }
            }
        }
    });
};



// Function to handle click events
$scope.handleVisitChartClick = function(label, value) {
    console.log(`Handling visit chart click: Label - ${label}, Value - ${value}`);

          $rootScope.FormName = 'Visit type';
          $rootScope.btnId18 = 'Visit';
          $location.path('/PatientDashboardList/');
          
};


/*------------------------------------billing------------------*/
$scope.billChartInstance = null;

$scope.billingChart = function () {
    const ctx = document.getElementById('billingChart1').getContext('2d');

    // Destroy existing chart instance if any
    if ($scope.billChartInstance) {
        $scope.billChartInstance.destroy();
    }

    // Create new chart instance
    $scope.billChartInstance = new Chart(ctx, {
        type: 'polarArea', // Change to Polar Area chart
        data: {
            labels: $scope.billxData,
            datasets: [{
                backgroundColor: $scope.billColourArray,
                data: $scope.billyData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Important to allow height adjustment
            title: {
                display: true,
                text: $scope.billingChartTitle || '', // Dynamic chart title
                fontColor: $scope.fontColor, // Title font color
                fontSize: 16, // Title font size
                fontStyle: 'bold' // Title font style
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: $scope.fontColor, // Legend text color
                    fontSize: 14, // Legend font size
                    fontStyle: 'bold' // Legend font style
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                    fontColor: $scope.fontColor, // Scale font color
                    fontSize: 12, // Scale font size
                    fontStyle: 'bold' // Scale font style
                },
                gridLines: {
                    color: '#F1F0F3' // Grid line color
                }
            },
            tooltips: {
                enabled: true,
                //backgroundColor: "#FFFFFF", // White background
                //titleFontColor: "#9E9E9E", // Black title text
                //bodyFontColor: "#232323", // Black text inside tooltip
                //borderColor: "#F1F0F3", // Gray border
                //borderWidth: 1,               
                //cornerRadius: 6, // Rounded corners for tooltip
                //xPadding: 10, // Extra padding inside tooltip
                //yPadding: 10,
                callbacks: {
                    label: function (tooltipItem, data) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const value = dataset.data[tooltipItem.index];
                        return `${data.labels[tooltipItem.index]}: ${value} ${$scope.billingUnit || 'lakh'}`; // Format tooltip with label and unit
                    }
                }
            },
            plugins: {
                datalabels: {
                    display: false,  // value on bar
                    formatter: function (value) {
                        const total = $scope.billyData.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage
                        return `${percentage}%`; // Display percentage in labels
                    },
                    color: $scope.fontColor || '#fff', // Set label text color
                    backgroundColor: $scope.datalabelBgColor, // Set label background color
                    borderRadius: 4, // Rounded corners
                    padding: 4, // Padding for labels
                    font: {
                        weight: 'bold',
                        size: 12 // Label font size
                    }
                }
            },
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    const firstElement = elements[0];
                    const index = firstElement._index; // Index of the clicked segment
                    const label = $scope.billxData[index]; // Label of the clicked segment
                    const value = $scope.billyData[index]; // Value of the clicked segment
                    console.log(`Clicked on: ${label}, Value: ${value} ${$scope.billingUnit || 'lakh'}`);
                    $scope.showBillingPatientList(label, value); // Pass label and value to the function
                }
            }
        }
    });
};








 $scope.showBillingPatientList = function () {

       if($scope.BillID == 1){       
          $rootScope.FormName = 'Collection';
          $rootScope.btnId18 = 'collectionBreakdown';
          $location.path('/PatientDashboardList/'); 
       }
        else{

          $rootScope.FormName = 'Charges';
          $rootScope.btnId18 = 'chargesBreakdown';
          $location.path('/PatientDashboardList/');
        
        }      
  }












$scope.changeBill = function (ID) {
    $scope.BillID = ID;

    if ($scope.BillID == 1) {
        //$scope.billxData = ["Cash", "Card", "Online", "Cheque", "Insurance"];
        //$scope.billyData = [26, 18, 38, 38, 26];
        $scope.billColourArray = ["#7BB9CA", "#BDE3ED", "#D8EDF4", "#EFEFEF", "#DEDEDE" , "#B6B6B6" ];
        $scope.billType = "Collection"
        $scope.GetBillingData()
    } else {
        //$scope.billxData = ["Unpaid", "Paid", "Billed", "Prospective Bills"];
        //$scope.billyData = [52, 22, 48, 48];
        $scope.billColourArray = ["#7BB9CA", "#BDE3ED", "#D8EDF4", "#EFEFEF" , "#DEDEDE" , "#B6B6B6"];
        $scope.billType = "Charges"
        $scope.GetBillingData()
    }

    // Update the chart
    //$scope.billingChart();
};


$scope.GetBillingData = function (fromDate =  $scope.mychartFromDate , toDate = $scope.mychartToDate , type = $scope.billType ){
 usSpinnerService.spin('GridSpinner');
    var response = PatientDashboardSrv.GetBillingDashboardCount( fromDate , toDate , type );
     response.then(function (res) {

          $scope.billxData = res.data.BarChart;
          $scope.billyData = res.data.BarData[0].Data;
          $scope.billingUnit = res.data.Units[0]
          
      
          // Update the chart
          //$scope.billingChart();

        if ($scope.billChartInstance) {
           $scope.billChartInstance.destroy();
        }

       setTimeout(() => { 
          $scope.billingChart(); 
       }, 100);


          usSpinnerService.stop('GridSpinner');
    })

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
        $scope.GetTriggerList();
        $scope.GetETList();
        $scope.GetOPUList();
        $scope.GetPatientUnderStimulation();
        $scope.GetPatientTriggerCount();
        $scope.GetRemainingOPUList();
        $scope.GetBHCGList();
        $scope.GetUCGList();
        $scope.GetDay0Patient();
        $scope.GetDay1Patient();
        $scope.GetDay2Patient();
        $scope.GetDay3Patient();
        $scope.GetDay4Patient();
        $scope.GetDay5Patient();
        $scope.GetDay6Patient();
        $scope.GetPregnancyTestPatient();
        $scope.GetPregnancyUltrasound();
        $scope.GetPregnancyOutcome();
        debugger;
        $scope.GetVisitTypeList();
        $scope.GenerateVisits();

        $scope.RegID = "1"
        $scope.AppID ="1"
        $scope.BillID = "1"
        $scope.selectedTab = 'year'; // Default tab

         $scope.selectedChart = "1"

         $scope.showTab($scope.selectedTab);



        //$scope.changeRegi($scope.RegID);

        //$scope.changeApp($scope.AppID);

        //$scope.changeBill($scope.BillID);

        //$scope.InvestigationChart();

        //$scope.RevenueChart();

        console.log(">>>>>>>>>>>>>>>>>>>>" , $scope.labels , $scope.data)


  


    }

 /*---------------------------------------------------------------------------------------------------------------------------*/

    $scope.GetTriggerList = function () { //Today's patient
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetTriggerList();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.TriggerList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetOPUList = function () {
        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetOPUList();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.OPUList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetETList = function () {
        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetETList();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.ETList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPatientUnderStimulation = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPatientUnderStimulation();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientUnderStimulation = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPatientTriggerCount = function () {

        //  debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPatientTriggerCount();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientTrigger = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
/*---------------------------------------------------------------------------------------------------------------------------*/

    $scope.GetRemainingOPUList = function () {
        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetRemainingOPUList();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.RemainingOPUList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay0Patient = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay0Patient();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day0Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay1Patient = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay1Patient();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day1Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay2Patient = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay2Patient();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day2Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay3Patient = function () {

        //  debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay3Patient();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day3Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay4Patient = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay4Patient();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day4Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay5Patient = function () {

        //   debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay5Patient();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day5Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetDay6Patient = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetDay6Patient();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.Day6Patient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetBHCGList = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetBHCGList();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.BHCGPatient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetUCGList = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetUCGList();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.HCGPatient = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyTestPatient = function () {

        // debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyTestPatient();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PregnancyTest = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyUltrasound = function () {

        //  debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyUltrasound();//($scope.PatientData);
        responseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PregnancyUltrasound = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetPregnancyOutcome = function () {
        //   debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = PatientDashboardSrv.GetPregnancyOutcome();//($scope.PatientData);
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
        $rootScope.FormName = 'Patient Under Stimulation';
        $rootScope.btnId12 = btnId12;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetTriggerPatientList = function (btnId13) {
        //  debugger;
        $rootScope.FormName = 'Todays Embryo Transfer';
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
        $rootScope.FormName = 'Todays BHCG';
        $rootScope.btnId15 = btnId15;
        $location.path('/PatientDashboardList/');
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.GetUSGPatientList = function (btnId16) {
        //  debugger;
        $rootScope.FormName = 'Todays USG';
        $rootScope.btnId16 = btnId16;
        $location.path('/PatientDashboardList/');
    }

     $scope.GetRemainingOPUPatientList = function (btnId17) {
        //  debugger;
        $rootScope.FormName = 'Total OPU';
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
    $scope.GenerateVisits = function (FromDate =  $scope.mychartFromDate || '' , ToDate = $scope.mychartToDate || '' ) {
        debugger;
        //usSpinnerService.spin('GridSpinner');
        var ResponseData = PatientDashboardSrv.GetVisitTypeList( FromDate , ToDate )
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

            console.log(">>>>>>>>>>>>>>>>>>" , Response)

       


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
        $scope.labels = $scope.temp;
        $scope.data =  $scope.tempD;
        var options = {
            responsive: true,
            maintainAspectRatio: false, // Important to allow height adjustment
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

        $scope.visitColourArray  = fillcolorbar

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
       
    }

/*-----------------------------------------------------------------------------------------------------------------------------------*/



  $scope.showRegistrationPatientList = function (xValue , yValue) {

           console.log(">>>>>>>>>>>>>>>>>>>>>> Trands ...." , xValue , yValue)

       if($scope.RegID == 1){       
          $rootScope.FormName = 'Registration by Age Distribution';
          $rootScope.btnId18 = 'ageDistribution';
          $location.path('/PatientDashboardList/'); 
       }
        else{

          $rootScope.FormName = 'Registration by Trends';
          $rootScope.btnId18 = 'Trends';
          $rootScope.trandsDate = formatDateForAPIcall(new Date());
          $rootScope.trandsType = yValue;
          $location.path('/PatientDashboardList/');
        
        }


      
  }




   /*------------------------------------------------------ for visit chart -----------------------------------------------------*/

        $scope.GenerateVisitsChart = function (FromDate =  $scope.mychartFromDate || '' , ToDate = $scope.mychartToDate || '' ) {
        debugger;
       
        var ResponseData = PatientDashboardSrv.GetVisitTypeList( FromDate , ToDate )
        ResponseData.then(function (Response) {
      

           

            const uniqueDescriptions = [];
            const patientCounts = [];

// Iterate through the data
Response.data.forEach(item => {
    if (!uniqueDescriptions.includes(item.Description)) {
        uniqueDescriptions.push(item.Description);
        patientCounts.push(item.PatientCount);
    }
});


                   
                      $scope.labels = uniqueDescriptions;
                       $scope.data = patientCounts ;


                        var fillcolorbar = [];
        for (var i = 0; i < $scope.data.length; i++) {
            fillcolorbar[i] = randomColorGenerator($scope.data.length, i);
        }
        console.log(fillcolorbar);

        $scope.visitColourArray  = fillcolorbar


         
          //$scope.visitChart($scope.data , $scope.labels );

        if ($scope.visitChartInstance) {
           $scope.visitChartInstance.destroy();
        }

       setTimeout(() => { 
         $scope.visitChart($scope.data , $scope.labels )
       }, 100);

        });
    }


});