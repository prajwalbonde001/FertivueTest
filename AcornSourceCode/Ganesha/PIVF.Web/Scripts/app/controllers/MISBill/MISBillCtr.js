'use strict';


angular.module('PIVF').controller('MISBillController', function ($scope, AlertMessage, Common, $rootScope, localStorageService , PatientDashboardSrv , usSpinnerService ) {

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
        $scope.FillReportType();
        $scope.FillClinic();
        $scope.FillMISDaysList();
        $scope.GetUnitDetails();
    }
    $rootScope.hideWhenQueue = true;
    $rootScope.Allergies = "";
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;





/*--------------------------------------------------------------------------------------------------*/



$scope.reportData   =  [
    {
      "InvoiceNo": "JFC-24-07-O-0159",
      "InvoiceDate": "06-Jul-2024",
      "RefundReceiptNo": "6-JFC-2024-7-REF-0002",
      "RefundDate": "06-Jul-2024",
      "PatientName": "Purnima",
      "ServiceName": "IUI",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "8,500.00",
      "Discount": "0.00",
      "NetAmount": "8,500.00",
      "RefundRemark": "Wrong Billing",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Cash",
      "NetRefund": "8,500.00",
      "CenterName": "Jananam Fertility Centre"
    },
    {
      "InvoiceNo": "JFC-24-07-O-0403",
      "InvoiceDate": "18-Jul-2024",
      "RefundReceiptNo": "6-JFC-2024-7-REF-0003",
      "RefundDate": "18-Jul-2024",
      "PatientName": "Priyanka",
      "ServiceName": "FET SCAN",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "1,700.00",
      "Discount": "0.00",
      "NetAmount": "1,700.00",
      "RefundRemark": "Double Billing",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "1,700.00",
      "CenterName": "Janamam Fertility Centre"
    },
    {
      "InvoiceNo": "JFC-23-08-O-0500",
      "InvoiceDate": "23-Aug-2023",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0001",
      "RefundDate": "06-Aug-2024",
      "PatientName": "Janani S",
      "ServiceName": "IVF Package 1",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "149,900.00",
      "Discount": "0.00",
      "NetAmount": "149,900.00",
      "RefundRemark": "Wrong Billing",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Cheque",
      "NetRefund": "149,900.00",
      "CenterName": "Janamam Fertility Centre"
    },
    {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
    {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"

    },  {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
      {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
        {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },    {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
        {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    },
        {
      "InvoiceNo": "JFC-24-08-O-0453",
      "InvoiceDate": "14-Aug-2024",
      "RefundReceiptNo": "6-JFC-2024-8-REF-0002",
      "RefundDate": "17-Aug-2024",
      "PatientName": "Vivek Veeran",
      "ServiceName": "Sperm Freezing",
      "Doctor": "Vani Malarvizhi Sundarapandian",
      "GrossAmount": "2,600.00",
      "Discount": "0.00",
      "NetAmount": "2,600.00",
      "RefundRemark": "Test Not Done",
      "RefundedBy": "Anju S",
      "RefundApprovedBy": "",
      "ModeOfPaymentDetails": "Advance",
      "NetRefund": "2,600.00",
      "CenterName": "Janamam Fertility Centre"
    }
  ]






  $scope.getTotalGrossAmount = function() {
    return $scope.reportData.reduce((sum, data) => sum + parseFloat(data.GrossAmount.replace(/,/g, '')), 0).toFixed(2);
};

$scope.getTotalDiscount = function() {
    return $scope.reportData.reduce((sum, data) => sum + parseFloat(data.Discount.replace(/,/g, '')), 0).toFixed(2);
};

$scope.getTotalNetAmount = function() {
    return $scope.reportData.reduce((sum, data) => sum + parseFloat(data.NetAmount.replace(/,/g, '')), 0).toFixed(2);
};

$scope.getTotalNetRefund = function() {
    return $scope.reportData.reduce((sum, data) => sum + parseFloat(data.NetRefund.replace(/,/g, '')), 0).toFixed(2);
};


$scope.ChangeReport = function(selectedReportId) {
    console.log("Selected Report ID:", selectedReportId);

    // Find the selected item from ListReportType
    const selectedItem = $scope.ListReportType.find(item => item.ID === selectedReportId);
    
    if (selectedItem) {
        console.log("Selected Report:", selectedItem.Description);
          $scope.MIS.selectedReport = selectedItem.Description;
    } else {
        console.log("No matching report found.");
    }
};



$scope.downloadReport = function () {
    const element = document.getElementById('content');

    // Temporarily remove styles for table container
    const tableContainer = document.querySelector('.custom-table-container');
    if (tableContainer) {
        tableContainer.classList.remove('custom-table-container');
        tableContainer.classList.add('no-table-styles');
    }

    // Temporarily remove the sticky footer styles
    const tableFooter = document.querySelector('.unique-table-class tfoot');
    let originalFooterStyle = '';
    if (tableFooter) {
        originalFooterStyle = tableFooter.style.cssText; // Save original styles
        tableFooter.style.position = 'static';
        tableFooter.style.backgroundColor = 'transparent';
    }

    const dynamicFilename = `${$scope.MIS.selectedReport}.pdf`;

    const options = {
        filename: dynamicFilename,
        margin: [0.50, 0.25, 0.50, 0.25], // Increased top & bottom margins
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2 // Higher scale for better quality        
        },
        jsPDF: {
            unit: 'in',
            format: [25, 8], // Custom format for larger pages
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
            pdf.setTextColor(169, 169, 169); // Gray color for the footer

            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);

                // 🟢 Add header ONLY on the FIRST page
                if (i === 1) {
                    if (clinicDetails.Logo) {
                        pdf.addImage(
                            clinicDetails.Logo,
                            'PNG',
                            0.5, // Left margin
                            0.3, // Top margin
                            2, // Width
                            0.7 // Height
                        );
                    }

                    pdf.setFontSize(12);
                    pdf.text(
                        clinicDetails.UnitName,
                        pageWidth - 0.5, // Right-aligned
                        0.5,
                        { align: 'right' }
                    );

                    pdf.setFontSize(10);
                    pdf.text(
                        clinicDetails.Address,
                        pageWidth - 0.5, // Right-aligned
                        0.7,
                        { align: 'right' }
                    );

                    pdf.text(
                        `Contact: ${clinicDetails.MobileNo}`,
                        pageWidth - 0.5, // Right-aligned
                        0.9,
                        { align: 'right' }
                    );

                    pdf.text(
                        `Email: ${clinicDetails.Email}`,
                        pageWidth - 0.5, // Right-aligned
                        1.1,
                        { align: 'right' }
                    );
                }

                // 🟢 Add footer on EVERY page
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
                tableContainer.classList.remove('no-table-styles');
                tableContainer.classList.add('custom-table-container');
            }

            // Restore the original footer styles
            if (tableFooter) {
                tableFooter.style.cssText = originalFooterStyle;
            }
        });
};






$scope.viewReportOnNextTabAndDownload = function () {
    const element = document.getElementById('content');

    // Temporarily remove styles for table container
    const tableContainer = document.querySelector('.custom-table-container');
    if (tableContainer) {
        tableContainer.classList.remove('custom-table-container');
        tableContainer.classList.add('no-table-styles');
    }

    // Temporarily remove the sticky footer styles
    const tableFooter = document.querySelector('.unique-table-class tfoot');
    let originalFooterStyle = '';
    if (tableFooter) {
        originalFooterStyle = tableFooter.style.cssText; // Save original styles
        tableFooter.style.position = 'static';
        tableFooter.style.backgroundColor = 'transparent';
    }

    const dynamicFilename = `${$scope.MIS.selectedReport}.pdf`;

    const options = {
        margin: [0.50, 0.25, 0.50, 0.25], // Increased top & bottom margins
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: [25, 8], orientation: 'landscape' },
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
            pdf.setTextColor(169, 169, 169); // Gray color for footer

            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);

                // Add header on first page
                if (i === 1) {
                    if (clinicDetails.Logo) {
                        pdf.addImage(clinicDetails.Logo, 'PNG', 0.5, 0.3, 2, 0.7);
                    }
                    pdf.setFontSize(12);
                    pdf.text(clinicDetails.UnitName, pageWidth - 0.5, 0.5, { align: 'right' });

                    pdf.setFontSize(10);
                    pdf.text(clinicDetails.Address, pageWidth - 0.5, 0.7, { align: 'right' });
                    pdf.text(`Contact: ${clinicDetails.MobileNo}`, pageWidth - 0.5, 0.9, { align: 'right' });
                    pdf.text(`Email: ${clinicDetails.Email}`, pageWidth - 0.5, 1.1, { align: 'right' });
                }

                // Add footer on every page
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

            // Convert PDF to Blob and open in a new tab
            const blob = pdf.output('blob');
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank'); // Open the PDF in a new tab
        })
        .finally(() => {
            // Restore the original class after the PDF is generated
            if (tableContainer) {
                tableContainer.classList.remove('no-table-styles');
                tableContainer.classList.add('custom-table-container');
            }

            // Restore the original footer styles
            if (tableFooter) {
                tableFooter.style.cssText = originalFooterStyle;
            }
        });
};











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








 /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
 $scope.MIS.PDF = "pdf";

 $scope.FillReportType = function () {
     //var ResponseData = Common.getMasterList('M_IVFGobletSize_Embrology', 'IVFGobletSizeID', 'Description');
     //ResponseData.then(function (Response) {

     //    Response.data.splice(0, 0, { ID: 0, Description: 'Goblet Size' });
     //    $scope.ListGobletSize = Response.data;
     //    if ($scope.EmbryoBankOocyte.GobletSizeId == undefined) {
     //        $scope.EmbryoBankOocyte.GobletSizeId = 0;
     //    }
     //}, function (error) {
     //    $scope.Error = error;
     //});

     $scope.ListReportType = [{ ID: 1, Description: 'Daily Collection Report' },
     { ID: 2, Description: 'Discount Register Report' },
     { ID: 3, Description: 'Daily Outstanding Report' },
     { ID: 4, Description: 'Service Wise Bill Report' }
   ]
     $scope.MIS.reportType = 1

     $scope.MIS.selectedReport = 'Daily Collection Report';
 }

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

     //$scope.ListClinic = [{ ID: 1, Description: 'SSS' }, { ID: 2, Description: 'BBB' }];
     //$scope.KPI.clinicID = 1

 }
    //Begin:: Added by AniketK on 13Aug2019 for Visit Details Report
 $scope.FillMISDaysList = function () {
     debugger;
     var ResponseData = Common.getMasterList('M_MISDays', 'ID', 'Description');
     ResponseData.then(function (Response) {

         Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
         $scope.ListMISDay = Response.data;
         if ($scope.MIS.DayID == undefined) {
             $scope.MIS.DayID = 0;
         }
     }, function (error) {
         $scope.Error = error;
     });

 }
    //End:: Added by AniketK on 13Aug2019 for Visit Details Report
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
 $scope.GenerateMIS = function (MIS) {
     debugger;
     //if (ValidMIS()) { //Commented and Modified by AniketK on 13Aug2019 
     if (ValidMIS()) {                             // $scope.MIS.reportType == 5 ||     //commented by Nayan Kamble on 19/02/2020
         //MIS report
         if ($scope.MIS.reportType == 1) {               //Daily Collection Report
             debugger;
             var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);            //+ '&ReportType=' + $scope.MIS.reportType +
             window.open('/Reports/New_Billing/MIS Reports/DailyCollection/DailyCollectionReportWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
             

         }
         else if ($scope.MIS.reportType == 2) {    //   Discount Register Report       incomplete SP 
             debugger;
             var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&ReportType=' + $scope.MIS.reportType + '&pdf=' + $scope.MIS.PDF);
             window.open('/Reports/New_Billing/MIS Reports/DiscountRegisterReport/DiscountRegisterReportWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab

         }
         else if ($scope.MIS.reportType == 3) {          //Outstanding Report 
             debugger;
             var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
             window.open('/Reports/New_Billing/MIS Reports/OutstandingReport/OutstandingReportWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
         }
             //Added by AniketK on 19July2019 for Cycle Details Report
         else if ($scope.MIS.reportType == 4) {   //ServiceWiseBillReportWF
             debugger;
             var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
             window.open('/Reports/New_Billing/MIS Reports/ServiceWiseBillReport/ServiceWiseBillReportWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
         }
             //Added by AniketK on 13August2019 for Visit Details Report
         //else if ($scope.MIS.reportType == 5) {
         //    debugger;
         //    var a = encodeURIComponent('MISDayID=' + $scope.MIS.DayID + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF); //'FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + 
         //    window.open('/Reports/MIS/VisitDetailsReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
         //}
         //    //Added by AniketK on 13August2019 for Investigation Details Report
         //else if ($scope.MIS.reportType == 6) {
         //    debugger;
         //    var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
         //    window.open('/Reports/MIS/InvestigationDetailsReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
         //}
         //    //Added by AniketK on 14August2019 for Prescription Details Report
         //else if ($scope.MIS.reportType == 7) {
         //    debugger;
         //    var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
         //    window.open('/Reports/MIS/PrescriptionDetailsReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
         //}
         //    //Added by AniketK on 14August2019 for Procedure Cycle Advice Report
         //else if ($scope.MIS.reportType == 8) {
         //    debugger;
         //    var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
         //    window.open('/Reports/MIS/ProcedureCycleAdviceReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
         //}
     }
 }

    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/

 var ValidMIS = function () {

     if ($scope.MIS.fromDate == null || !$scope.MIS.hasOwnProperty('fromDate')) {
         AlertMessage.warning('PalashIVF', 'Select From Date');
         return false;
     }
     else if ($scope.MIS.toDate == null || !$scope.MIS.hasOwnProperty('toDate')) {
         AlertMessage.warning('PalashIVF', 'Select To Date');
         return false;
     }
     else if ($scope.MIS.fromDate > $scope.MIS.toDate) {
         AlertMessage.warning('PalashIVF', 'From Date Should be Less Then To Date');
         return false;
     }
     else if ($scope.MIS.clinicID == 0) {
         AlertMessage.warning('PalashIVF', 'Select Clinic');
         return false;
     }
     return true;
 }
    //file end


})