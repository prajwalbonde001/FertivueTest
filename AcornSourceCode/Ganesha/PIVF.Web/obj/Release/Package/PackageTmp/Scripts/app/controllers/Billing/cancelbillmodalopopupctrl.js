'use strict';
angular.module('PIVF').controller('CancelModalController', function ($scope, $uibModalInstance,$location, selectedBill, BillingService,srvCommon, $http,AlertMessage,Common,PatientAdvanceRefundSrv) {
debugger
    $scope.selectedBill = selectedBill;
    $scope.cancellationRemark = '';
      var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    $scope.dtpickropened = false
$scope.PaymentDetails = {

    PaymentAmount: $scope.selectedBill ? $scope.selectedBill.PaidAmount : 0

};
    $scope.loadData = function(){
    $scope.GetModeOfPaymentNew()
    $scope.GetBankList()
    $scope.GetPatientDetails()
}
 $scope.popup1 = {
        opened: false
    };
    $scope.dateOptionsDOB = {
        //dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 300),
        minDate: new Date(),   //  .setYear(new Date().getYear() - 110),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End

    
    //Used for Patient Advance search
    $scope.GetPatientDetails = function GetPatientDetails() {
       debugger;        
        $scope.PatientList = [];        
        var Promise = PatientAdvanceRefundSrv.GetPatientDetailsForBillCancellation($scope.selectedBill.BillID);
        Promise.then(function (Promise) {
        debugger
            $scope.PatientList = Promise.data;
        }, function (error) {
           
        });
    };

    $scope.FromToDateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker

      $scope.openLabDtPickr = function ($event) {    //
    debugger;
        $event.preventDefault();
        $event.stopPropagation();
        $scope.dtpickropened = true;
    };

    //$scope.dateOptionsDOB1 = {
    //    //  dateDisabled: disabled,
    //    formatYear: 'yyyy',
    //    maxDate: new Date(), //new Date(2016, 8, 01),
    //    minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
    //    startingDay: 1,
    //    showWeeks: false
    //};  //for configure date-picker
    //// Date pickr End
    $scope.dateOptionsDOB1 = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
        startingDay: 1,
        showWeeks: false
    };


     $scope.open2 = function () {
    debugger;
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.open3 = function () {
    debugger;
        $scope.popup3.opened = true;
    };

    $scope.popup3 = {
        opened: false
    };
    
    $scope.open4 = function () {
    debugger;
        $scope.popup4.opened = true;
    };

    $scope.popup4 = {
        opened: false
    };
    $scope.open5 = function () {
    debugger;
        $scope.popup5.opened = true;
    };

    $scope.popup5 = {
        opened: false
    };
    // Handle "Okay" button click
    $scope.okay = function () {
    $scope.showValidation = false; // Reset validation flag
    // Validation for cancellation remark
    if ($scope.cancellationRemark.trim() === '') {
        AlertMessage.warning(objResource.msgTitle, 'Please provide a cancellation remark.');
        return;
    }

    // Validation for bill status and balance amount
    if ($scope.selectedBill.IsFreezed === false && $scope.selectedBill.BalanceAmountSelf === 0) {
        AlertMessage.warning(objResource.msgTitle, 'Cannot cancel an unsettled bill.');
        return;
    }
    const paymentMode = $scope.PaymentDetails.PaymentModeID;
    if (paymentMode == 2 || paymentMode == 4 || paymentMode == 10) { // Cheque, Card, Online
        if (
            !$scope.PaymentDetails.TransactionNo ||
            !$scope.PaymentDetails.BankID ||
            !$scope.PaymentDetails.PaymentDate ||
            !$scope.PaymentDetails.AccountName
        ) {
         $scope.showValidation = true; // Trigger field highlighting
            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields);
            return;
        }
    }
    // Construct the cancellation object
    let cancellationDetails = {
        BillID: $scope.selectedBill.BillID,
        PaymentAmount: $scope.selectedBill.PaidAmount, // Adjust as needed
        BillCancellationRemark: $scope.cancellationRemark,
        lstPatientDataDetails: $scope.PatientList, // Directly push patient details
        lstPaymentModeDetails: [[$scope.PaymentDetails]], // Push payment details as a nested list
       
    };
    console.log(cancellationDetails,'Cancelationdetails')
    // Call the API to cancel the bill
    BillingService.CancelBill(cancellationDetails)
        .then(function (response) {
            if (response.data === 1) {
                AlertMessage.success(objResource.msgTitle, 'Bill cancellation was successful.');
                $uibModalInstance.close({
                   refresh: true 
                });
               
            } else {
                AlertMessage.warning(objResource.msgTitle, 'Failed to cancel the bill. Please try again.');
            }
        })
        .catch(function (error) {
            console.error('Error while cancelling the bill:', error);
            AlertMessage.warning(objResource.msgTitle, 'An error occurred while cancelling the bill. Please try again later.');
        });
};

     $scope.GetModeOfPaymentNew = function GetDocList() {
       debugger;
        var ResponseData = Common.getMasterList('M_ModeOfPayment', 'PaymentID', 'Description');
        ResponseData.then(function (Response) {
        debugger
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
              let index1 = Response.data.findIndex(item => item.Description == "UPI/Wallet");

if (index1 !== -1) {
    Response.data.splice(index1, 1); // Remove 1 item at the found index
}
  let index2 = Response.data.findIndex(item => item.Description == "Card");

if (index2 !== -1) {
    Response.data.splice(index2, 1); // Remove 1 item at the found index
}
            $scope.PaymentModeList = Response.data;
            //Added by AniketK on 23Oct2020
            //for(var i = 0; i<$scope.PaymentModeValidationList.length;i++){
            //debugger
            //    for(var j = 0; j<$scope.PaymentModeList.length;j++){
            //        if($scope.PaymentModeValidationList[i].PaymentID == $scope.PaymentModeList[j].ID 
            //                && ($scope.PaymentModeValidationList[i].PayModeApplicableID == 4)){  //1 : Collection(Advance), 2: Refund,  3: Both,  4: None                            
            //            $scope.PaymentModeList.splice(j, 1); //Remove Advance Collection PayModeApplicableID
            //        }
            //    }
            //}
            ////End: Added by AniketK on 23Oct2020

            //if ($scope.BillDetails.PaymentModeID == undefined) {
            //    $scope.BillDetails.PaymentModeID = 0;
            //    $scope.CashMode = true;   //
            //}
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

     $scope.ChangeModeOfPayment = function () {  //item
        debugger;
         const paymentMode = $scope.PaymentDetails.PaymentModeID;
    // Reset all fields
        $scope.PaymentDetails.TransactionNo = '';
        $scope.PaymentDetails.BankID = 0;
        $scope.PaymentDetails.PaymentDate = '';
        $scope.PaymentDetails.CashMode = false;
        $scope.PaymentDetails.DisableAmount = false;
        $scope.PaymentDetails.IsNoRequired = false;
        $scope.PaymentDetails.IsNoAccRequired = false;
        $scope.PaymentDetails.IsBankRequired = false;
        $scope.PaymentDetails.IsDateRequired = false;

        if (paymentMode === 1) { // Cash
            $scope.PaymentDetails.DisableAmount = true; // Amount enabled
            $scope.PaymentDetails.IsNoRequired = false; // Transaction No disabled
            $scope.PaymentDetails.IsBankRequired = false; // Bank disabled
            $scope.PaymentDetails.IsDateRequired = false; // Date disabled
            $scope.PaymentDetails.CashMode = true;
        } else if (paymentMode === 2 || paymentMode === 4 || paymentMode === 10) { // Cheque, Card, Online
            $scope.PaymentDetails.DisableAmount = false; // Amount enabled
            $scope.PaymentDetails.IsNoRequired = true; // Transaction No enabled
            $scope.PaymentDetails.IsBankRequired = true; // Bank enabled
            $scope.PaymentDetails.IsNoAccRequired = true; // Bank enabled
            $scope.PaymentDetails.IsDateRequired = true; // Date enabled
            angular.element(txtTransNo).attr('maxlength', 20); // Set maxlength for Transaction No
        }
         else if (paymentMode === 12) { // Advance
            $scope.PaymentDetails.DisableAmount = false; // Amount disabled
            $scope.PaymentDetails.IsNoRequired = true; // Transaction No Enables
            $scope.PaymentDetails.IsBankRequired = false; // Bank disabled
            $scope.PaymentDetails.IsDateRequired = false; // Date disabled
            angular.element(txtTransNo).attr('maxlength', 20); // Set maxlength for Transaction No
        } 
        else {
            // Default case for other payment modes
            $scope.PaymentDetails.DisableAmount = false;
            $scope.PaymentDetails.IsNoRequired = false;
            $scope.PaymentDetails.IsBankRequired = false;
            $scope.PaymentDetails.IsDateRequired = false;
        }
    }
       $scope.GetBankList = function GetDocList() {
        //debugger;
        var ResponseData = Common.getMasterList('M_BankMaster', 'BankID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.BankList = Response.data;
            //if ($scope.BillDetails.BankID == undefined) {
            //    $scope.BillDetails.BankID = 0;
            //}   
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

    // Handle "Cancel" button click
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
