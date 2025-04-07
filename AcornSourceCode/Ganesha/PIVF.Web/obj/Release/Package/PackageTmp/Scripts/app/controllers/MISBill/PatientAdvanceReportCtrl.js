use strict';


angular.module('PIVF').controller('PatientAdvanceReportCtrl', function ($scope, AlertMessage , srvCommon , Common, $rootScope, localStorageService , PatientReportsService ) {

    $scope.MIS = {};
    $scope.MIS.fromDate = new Date();
    $scope.MIS.toDate = new Date();
    $scope.open1 = function () {
        $scope.month1.opened = true;
    }
    $scope.month1 = {
        opened: false
    };
    $scope.open2 = function () {

        $scope.month2.opened = true;
    }
    $scope.month2 = {
        opened: false
    };
        $scope.loadData = function () {
        $scope.FillClinic();      
    }
    $rootScope.hideWhenQueue = true;
    $rootScope.Allergies = "";

    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
 /*---------------------------------------------------------------------------------------------------------------------------------------------------*/


 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
 $scope.FillClinic = function () {
     debugger;
     var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
     ResponseData.then(function (Response) {

         Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
         $scope.ListClinic = Response.data;
         if ($scope.MIS.clinicID == undefined) {
             $scope.MIS.clinicID = localStorageService.get("UserInfo").UnitID;  //3;
         }
     }, function (error) {
         $scope.Error = error;
     });

 }





/*---------------------------------------------------------------*/


// Configuration for date-picker with dynamic minDate and maxDate
$scope.dateOptionsFrom = {
    formatYear: 'yyyy',
    startingDay: 1,
    showWeeks: false,
    minDate: null, // Dynamically updated based on toDate
    maxDate: null, // Dynamically updated based on toDate
    showButtonBar: false // Hides Today, Done, and Clear buttons
};

$scope.dateOptionsTo = {
    formatYear: 'yyyy',
    startingDay: 1,
    showWeeks: false,
    minDate: null, // Dynamically updated based on fromDate
    maxDate: null, // Dynamically updated based on fromDate
    showButtonBar: false // Hides Today, Done, and Clear buttons
};

// Watch for changes in fromDate to update toDate's minDate
$scope.$watch('MIS.fromDate', function (newValue) {
    if (newValue) {
        $scope.dateOptionsTo.minDate = new Date(newValue); // Set minDate for toDate picker
    } else {
        $scope.dateOptionsTo.minDate = null; // Reset minDate if fromDate is cleared
    }
});

// Watch for changes in toDate to update fromDate's maxDate
$scope.$watch('MIS.toDate', function (newValue) {
    if (newValue) {
        $scope.dateOptionsFrom.maxDate = new Date(newValue); // Set maxDate for fromDate picker
    } else {
        $scope.dateOptionsFrom.maxDate = null; // Reset maxDate if toDate is cleared
    }
});








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







$scope.GetReportData = function (UnitID , FromDate , ToDate){
    var response = PatientReportsService.GetPatientAdvanceReport(UnitID , FromDate , ToDate);
     response.then(function (res) {
          
           $scope.reportData = [];

           if(res.data.length == 0){
                AlertMessage.warning(objResource.msgTitle, 'Error fetching reports: ' + ('Records not found')); // Show error message
                return
           }
            
           $scope.reportData = res.data;
          // $scope.loadReportData()
        
          
    })

};


//$scope.loadReportData = function(reportDatas = $scope.reportData) {
//    const tableBody = document.querySelector('#data-table tbody');
//    tableBody.innerHTML = ''; // Clear existing table rows before appending new ones
//    reportDatas.forEach((data, index) => { // Use index to calculate srNo
       
//        const formattedDate = formatDates(new Date(data.Date)); // Format the date
//        const srNo = index + 1; // Calculate srNo dynamically
//        const row = document.createElement('tr');
       
//       row.innerHTML = `
//            <td>${srNo}</td> <!-- Use calculated srNo -->
//            <td>${formattedDate}</td> <!-- Use formatted date -->
//            <td>${data.PatientName}</td>
//            <td>${data.MRNo}</td>
//            <td>${data.UnitName}</td>
//            <td>${data.Total}</td>
//            <td>${data.Used}</td>
//            <td>${data.Refund}</td>
//            <td>${data.Balance}</td>
//            <td>${data.AdvanceAgainst}</td>
//        `;
//        tableBody.appendChild(row);
//    });
//};



 $scope.viewReport = function () {

      $scope.CustomFdate = formatDates(new Date($scope.MIS.fromDate)) // for show
      $scope.CustomTdate = formatDates(new Date($scope.MIS.toDate)) // for show


      $scope.CustomFromDate = formatDateForAPIcall(new Date($scope.MIS.fromDate)) // for api call
      $scope.CustomToDate = formatDateForAPIcall(new Date($scope.MIS.toDate)) // for api call
      $scope.CustomclinicID = $scope.MIS.clinicID

     $scope.GetReportData($scope.CustomclinicID , $scope.CustomFromDate , $scope.CustomToDate)

   console.log("?????????????????????????" , $scope.MIS)

}






$scope.downloadReport = function () {

    const element = document.getElementById('content');
    
    // Temporarily replace the class name for custom-table-container with no-table-styles
    const tableContainer = document.querySelector('.custom-table-container');
    
    if (tableContainer) {
        // Add the no-table-styles class and remove the custom-table-container class
        tableContainer.classList.remove('custom-table-container');
        tableContainer.classList.add('no-table-styles');
    }

    const options = {
        filename: 'Patient_Advance_Report.pdf',
        margin: [0.25, 0.20, 0.5, 0.35], // Reduced left margin to 0.25
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'landscape',
        },
        //pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Add custom footer
    html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            const totalPages = pdf.internal.getNumberOfPages();
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            // Set font and gray text color for the footer
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(169, 169, 169); // Gray color for the footer text

            // Get current date and time
            const now = new Date();
            const formattedDateTime = now.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }).replace(',', ''); // Format: DD-MMM-YYYY, HH:MM AM/PM

            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);

                // Add Print Date & Time at the left with gray color
                pdf.text(
                    `Print Date & Time: ${formattedDateTime}`,
                    0.5, // Left margin
                    pageHeight - 0.25 // Footer position
                );

                // Add page number at the right with gray color
                pdf.text(
                    `Page ${i} of ${totalPages}`,
                    pageWidth - 0.5, // Right margin
                    pageHeight - 0.25, // Footer position
                    { align: 'right' }
                );
            }
        })
        .save()
        .finally(() => {
            // Restore the original class after the PDF is generated
            if (tableContainer) {
                tableContainer.classList.remove('no-table-styles');
                tableContainer.classList.add('custom-table-container');
            }
        });
}



















})