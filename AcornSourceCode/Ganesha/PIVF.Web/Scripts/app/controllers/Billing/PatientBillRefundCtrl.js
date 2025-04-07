'use strict';
angular.module('PIVF').controller('PatientBillRefundCtr', function (swalMessages, $filter, $scope, $http, AlertMessage, srvCommon, $rootScope, localStorageService, Common, $location, usSpinnerService, $uibModal, PatientVisitService, PatientBillRefundSrv, BillingService) {
    var objResource = {};
    $scope.PatientData = {};
    $scope.PatientAdvanceRefundData = {};
     $scope.PatientAdvanceRefundData.lstPatientDataDetails = [];
    $scope.PatientAdvanceRefundData.lstPatientDataDetails = [];
    $scope.PatientAdvanceRefundData.lstPaymentModeDetails = [];
    $scope.PatientAdvanceRefundData.lstPatientBillDetails = [];
    $scope.selectedPatientFromApp = "";     
    $scope.IsAppSearch = false;
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.RegUnitID = localStorageService.get("UserInfo").UnitID;
    $rootScope.PatientDataDetails = null;
    $scope.IsDisable = false;
    $scope.PatientData.MRNo = false;
    $scope.selectedRow = 0;
    $scope.IsRefundAmount = false;
    $scope.IsFormSave = false;
    $rootScope.hideWhenQueue = true;
    $scope.ServicesList = {};
          $scope.reportData = [];
         $scope.PatientData.FromDate = new Date();
  $scope.PatientData.ToDate = new Date();
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
    //Used for localization & globalization
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    $scope.dateOptionsDOB = {
        //dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 300),
        minDate: new Date(),   //  .setYear(new Date().getYear() - 110),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End

    $scope.openLabDtPickr = function ($event, item) {    //
        $event.preventDefault();
        $event.stopPropagation();
        item.dtpickropened = true;
    };
     $scope.LoadDataInit = function LoadData() {
        debugger;
        //$scope.GetPaymentModeValidation();   
        $scope.fillClinicListNew();
        $scope.SearchDataInit();
     }



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
    /*===================================================================================================================*/
    //to load dropdown data when page loaded
    $scope.LoadData = function LoadData() {
        debugger;
        //$scope.GetPaymentModeValidation();
        $scope.GetModeofPayment();
        $scope.GetBankDetails();        
        $scope.GetPatientDetails();       
        $scope.fillClinicListNew();
    }
   /*===================================================================================================================*/
     
    //$scope.GetPaymentModeValidation = function GetPaymentModeValidation() {
    //    //debugger;
    //    usSpinnerService.spin('GridSpinner');
    //    var ResponseData = Common.GetPaymentModeValidation();
    //    ResponseData.then(function (Response) {
    //    usSpinnerService.stop('GridSpinner');
    //        if (Response.data != null) {                
    //            $scope.PaymentModeValidationList = Response.data;                
    //        }
    //    }, function (error) {
    //        usSpinnerService.stop('GridSpinner');
    //        AlertMessage.error(objResource.msgTitle, "Something went wrong.");
    //        $scope.Error = error;
    //    });
    //}
    /*===================================================================================================================*/
    $scope.GetModeofPayment = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_ModeOfPayment', 'PaymentID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });

             let index = Response.data.findIndex(item => item.Description == "Card");

if (index !== -1) {
    Response.data.splice(index, 1); // Remove 1 item at the found index
}
let index1 = Response.data.findIndex(item => item.Description == "UPI/Wallet");

if (index1 !== -1) {
    Response.data.splice(index1, 1); // Remove 1 item at the found index
}
            $scope.PaymentModeList = Response.data;
            //for(var i = 0; i<$scope.PaymentModeValidationList.length;i++){
            //    for(var j = 0; j<$scope.PaymentModeList.length;j++){
            //        if($scope.PaymentModeValidationList[i].PaymentID == $scope.PaymentModeList[j].ID 
            //                && ($scope.PaymentModeValidationList[i].PayModeApplicableID == 1 || $scope.PaymentModeValidationList[i].PayModeApplicableID == 4)){  //1 : Collection(Advance), 2: Refund,  3: Both,  4: None                            
            //            $scope.PaymentModeList.splice(j, 1); //Remove Advance Collection PayModeApplicableID
            //        }
            //    }
            //}
            $scope.PatientAdvanceRefundData.PaymentModeID = 0;
            
        }, function (error) {
        });
    }
    /*===================================================================================================================*/
    $scope.GetBankDetails = function () {
        //debugger;
        var ResponseData = Common.getMasterList('M_BankMaster', 'BankID', 'Description');
        ResponseData.then(function (Response) {
           //debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.BankList = Response.data;           
            $scope.PatientAdvanceRefundData.BankID = 0;
            
        }, function (error) {
        });
    }
    /*===================================================================================================================*/
    
    //Used for Patient Advance Refund search
    $scope.GetPatientDetails = function GetPatientDetails() {
        // debugger;        
        debugger
usSpinnerService.spin('GridSpinner');
       $scope.PatientList = [];        
        var Promise = PatientBillRefundSrv.GetPatientDetails(0,0);
        debugger
        Promise.then(function (Response) {
        debugger
            $scope.PatientList = Response.data;
usSpinnerService.stop('GridSpinner');
       }, function (error) {
           debugger
           AlertMessage.warning(objResource.msgTitle, error)
usSpinnerService.stop('GridSpinner');
        });
    };

    /*=======================================================================================================================*/

     $scope.fillClinicListNew = function () {
      debugger;
      var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
      ResponseData.then(function (Response) {
          debugger;
          Response.data.splice(0, 0, { ID: 0, Description: "Clinic" });
          $scope.clinicList = Response.data;
          //$scope.PatientData.UnitID = 0;
          $scope.PatientData.ClinicID = localStorageService.get("UserInfo").UnitID;
    

      }, function (error) {

      });
  }

    /*===================================================================================================================*/

    //Binding selected patient on searching
    $scope.SelectedPatient = function SelectedPatient(selectedPatient, IsAppSearch) {
        debugger;        
        sessionStorage.setItem("SavedPatientData", JSON.stringify(selectedPatient));
        $scope.PatientData = selectedPatient;
        if (selectedPatient.MRNo != "") {
            if (IsAppSearch) {
                localStorageService.set('UserInfo', { UnitID: 0 });               
                $scope.selectedPatientFromPatient = null;
                $scope.selectedPatientFromApp = selectedPatient.PatientMRNo;
                $scope.PatientData.RegID = selectedPatient.RegID;
                $scope.PatientData.RegUnitID = selectedPatient.RegUnitID;
                $scope.LoadRelationList(selectedPatient.Gender);
               // $scope.PatientData.APPID = selectedPatient.APPID;
                //$scope.PatientData.VTID = selectedPatient.VisitID;
                //$scope.PatientData.DeptID = selectedPatient.DeptID;
                //$scope.PatientData.DOCID = selectedPatient.DOCID;
                $scope.PatientData.PatientAddress = selectedPatient.PatientCommunicationAddress;
                $scope.PatientData.CommunicationAddress = selectedPatient.PatientCommunicationAddress; 
            }
            else {
                $scope.selectedPatientFromApp = null;
                $scope.selectedPatientFromPatient = selectedPatient.PatientMRNo;
                $scope.PatientData.RegID = selectedPatient.RegID;
                $scope.PatientData.RegUnitID = selectedPatient.RegUnitID;                
                $scope.PatientData.PatientAddress = selectedPatient.PatientCommunicationAddress;
                $scope.PatientData.CommunicationAddress = selectedPatient.PatientCommunicationAddress;               
            }
            selectedPatient.IsNonRegPatientRedirect = false;
        } else {            
            swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoyouwanttoRegisterPatient, "warning", function (isConfirmed) {
                if (isConfirmed) {
                    Common.clearObj();
                    selectedPatient.IsNonRegPatientRedirect = true;
                    Common.setObj(selectedPatient);
                    $location.path('/Registration/');
                } else {
                    $scope.IsPatientSelected = true;
                }
           });
        }
    }
    /*===================================================================================================================*/

    //Binding patient data while searching
    $scope.BindData = function BindData() {
        //debugger;      
        $scope.selectedPatient = JSON.parse(sessionStorage.getItem("SavedPatientData"));
        if ($scope.selectedPatient != undefined) {
            sessionStorage.removeItem("SavedPatientData");
            $scope.IsPatientSelected = false;  
            $scope.PatientData.MRNo = $scope.selectedPatient.MRNo;
            $scope.PatientData.Prefix = $scope.selectedPatient.Prefix;
            $scope.PatientData.PatientFullName = $scope.selectedPatient.PatientFullName;
            $scope.PatientData.Gender = $scope.selectedPatient.Gender;
            $scope.PatientData.Age = $scope.selectedPatient.Age;
            $scope.PatientData.MStatus = $scope.selectedPatient.MStatus;
            $scope.PatientData.Email = $scope.selectedPatient.Email;
            $scope.PatientData.MobileNo = $scope.selectedPatient.MobileNo;
            $scope.PatientData.AltMobileno = $scope.selectedPatient.AltMobileno;
            $scope.PatientData.PhotoString = $scope.selectedPatient.PhotoString;
            $scope.PatientData.RegID = $scope.selectedPatient.RegID;
            $scope.PatientData.RegUnitID = $scope.selectedPatient.RegUnitID;
            $scope.PatientData.RegType = $scope.selectedPatient.RegType;
            $scope.PatientData.RegisteredCategory = $scope.selectedPatient.RegisteredCategory;
            $scope.PatientData.GenderId = $scope.selectedPatient.GenderId;
            $rootScope.PatientDataDetails = $scope.PatientData;
            $scope.selectedPatientFromPatient = "";
            //
            //$timeout(function() {
            //  usSpinnerService.spin('GridSpinner');
            //}, 3000);
            $scope.FillBillList();
            //$scope.FillRefundList();
        }
        else {               
            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseselectpatient)
        }
    };
    $scope.OtherSrvPaymentModeList = [];
/*****************************************************************************************************************************/
    //$scope.OtherSrvPaymentModeList = [{ PaymentModeID: 0, PaymentAmount: parseInt(0), RefundAmount: parseInt(0), TransactionNo: undefined, 
    //    BankID: 0, PaymentDate: undefined, CashMode: true, DisableAmount : true, PaymentID: 0, Description: undefined, 
    //    IsNoRequired: false, NoMaxLength: 0, IsBankRequired: false, IsDateRequired: false, IsTransactionIDRequired: false, 
    //    TransactionIDMaxLength : 0, PayModeApplicableID: 0, IsNoRequiredValidation: false, IsBankRequiredValidation: false,
    //    IsDateRequiredValidation: false}];

/*****************************************************************************************************************************/
//$scope.$watch('PatientAdvanceRefundData.RefundAmount', function (newValue) {
//    debugger;
//    $scope.IsRefundAmount = false;
//  if(newValue != undefined){
//    if($scope.ServicesList.length>0){
//        for(var i = 0; i < $scope.ServicesList.length; i++){
//            if($scope.selectedRow == i && $scope.PatientAdvanceRefundData.RefundAmount <= $scope.ServicesList[i].TotalAmount){
//                $scope.OtherSrvPaymentModeList = [{ PaymentModeID: 0, PaymentAmount: parseInt($scope.PatientAdvanceRefundData.RefundAmount),
//                RefundAmount: parseInt($scope.PatientAdvanceRefundData.RefundAmount), TransactionNo: undefined, BankID: 0, PaymentDate: undefined,
//                CashMode: true, DisableAmount : true, PaymentID: 0, Description: undefined, IsNoRequired: false, NoMaxLength: 0,
//                IsBankRequired: false, IsDateRequired: false, IsTransactionIDRequired: false, TransactionIDMaxLength : 0,
//                PayModeApplicableID: 0, IsNoRequiredValidation: false, IsBankRequiredValidation: false, IsDateRequiredValidation: false}]; 
//          }
//            if($scope.selectedRow == i && $scope.PatientAdvanceRefundData.RefundAmount > ($scope.PatientAdvanceRefundData.TotalAdvance - $scope.PatientAdvanceRefundData.TotalRefund)){
//                AlertMessage.info(objResource.msgTitle, "Refund Amount Exceded.");
//                $scope.PatientAdvanceRefundData.RefundAmount = $scope.ServicesList[i].TotalAmount;
//                $scope.PatientAdvanceRefundData.RefundAmount = $scope.PatientAdvanceRefundData.TotalAdvance - $scope.PatientAdvanceRefundData.TotalRefund;
//                $scope.OtherSrvPaymentModeList = [{ PaymentModeID: 0, PaymentAmount: parseInt($scope.PatientAdvanceRefundData.RefundAmount),
//                RefundAmount: parseInt($scope.PatientAdvanceRefundData.RefundAmount), TransactionNo: undefined, BankID: 0, PaymentDate: undefined,
//                CashMode: true, DisableAmount : true, PaymentID: 0, Description: undefined, IsNoRequired: false, NoMaxLength: 0,
//                IsBankRequired: false, IsDateRequired: false, IsTransactionIDRequired: false, TransactionIDMaxLength : 0,
//                PayModeApplicableID: 0, IsNoRequiredValidation: false, IsBankRequiredValidation: false, IsDateRequiredValidation: false}]; 

//            }
//        }
//    }
//   }
//    });
/*****************************************************************************************************************************/

$scope.OnChangePaymentValidation = function(){
         debugger;
        for(var Index = 0; Index<$scope.OtherSrvPaymentModeList.length;Index++){
            $scope.OtherSrvPaymentModeList[Index].IsNoRequiredValidation = false;
            $scope.OtherSrvPaymentModeList[Index].IsBankRequiredValidation = false;
            $scope.OtherSrvPaymentModeList[Index].IsDateRequiredValidation = false;
        }
    }
/*****************************************************************************************************************************/
$scope.ChangeModeOfPayment = function (Index) {  //item
        debugger;
             const paymentMode = $scope.OtherSrvPaymentModeList[Index].PaymentModeID;
    // Reset all fields
    //$scope.OtherSrvPaymentModeList[Index].ChargeID = $scope.ServicesList[Index].ChargeID
    //$scope.OtherSrvPaymentModeList[Index].ChargeID = $scope.ServicesList[Index].ChargeID
        $scope.OtherSrvPaymentModeList[Index].TransactionNo = '';
        $scope.OtherSrvPaymentModeList[Index].BankID = 0;
        $scope.OtherSrvPaymentModeList[Index].PaymentDate = '';
        $scope.OtherSrvPaymentModeList[Index].CashMode = false;
        $scope.OtherSrvPaymentModeList[Index].DisableAmount = false;
        $scope.OtherSrvPaymentModeList[Index].IsNoRequired = false;
        $scope.OtherSrvPaymentModeList[Index].IsBankRequired = false;
        $scope.OtherSrvPaymentModeList[Index].IsDateRequired = false;

        if (paymentMode === 1) { // Cash
            $scope.OtherSrvPaymentModeList[Index].DisableAmount = true; // Amount enabled
            $scope.OtherSrvPaymentModeList[Index].IsNoRequired = false; // Transaction No disabled
            $scope.OtherSrvPaymentModeList[Index].IsBankRequired = false; // Bank disabled
            $scope.OtherSrvPaymentModeList[Index].IsDateRequired = false; // Date disabled
            $scope.OtherSrvPaymentModeList[Index].CashMode = true;
        } else if (paymentMode === 2 || paymentMode === 4 || paymentMode === 10) { // Cheque, Card, Online
            $scope.OtherSrvPaymentModeList[Index].DisableAmount = false; // Amount enabled
            $scope.OtherSrvPaymentModeList[Index].IsNoRequired = true; // Transaction No enabled
            $scope.OtherSrvPaymentModeList[Index].IsBankRequired = true; // Bank enabled
            $scope.OtherSrvPaymentModeList[Index].IsDateRequired = true; // Date enabled
            angular.element(txtTransNo).attr('maxlength', 20); // Set maxlength for Transaction No
        } else {
            // Default case for other payment modes
            $scope.OtherSrvPaymentModeList[Index].DisableAmount = false;
            $scope.OtherSrvPaymentModeList[Index].IsNoRequired = false;
            $scope.OtherSrvPaymentModeList[Index].IsBankRequired = false;
            $scope.OtherSrvPaymentModeList[Index].IsDateRequired = false;
        }
    }
/***************************************************************************************************************/
$scope.DeletePayment = function (idx) {
        debugger;
        if ($scope.OtherSrvPaymentModeList.length <= 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else { 
        $scope.OtherSrvPaymentModeList.splice(idx, 1);
     }
 }
/***************************************************************************************************************/
$scope.AddPaymentRowFromAdvance = function () {
        debugger;
        $scope.sum = 0
        for (var i = 0; i <  $scope.OtherSrvPaymentModeList.length; i++) {
            $scope.sum = parseFloat($scope.sum) + parseFloat( $scope.OtherSrvPaymentModeList[i].PaymentAmount);
        }
        for (var i = 0; i < $scope.OtherSrvPaymentModeList.length; i++) {
     
            if ($scope.sum < parseInt($scope.PatientAdvanceRefundData.RefundAmount)) {            

                $scope.OtherSrvPaymentModeList.push({
                  PaymentModeID: 0, PaymentAmount: parseInt($scope.PatientAdvanceRefundData.RefundAmount - $scope.sum),
                  RefundAmount: parseInt($scope.PatientAdvanceRefundData.RefundAmount), TransactionNo: undefined, BankID: 0, PaymentDate: undefined,
                  CashMode: true, DisableAmount : true, PaymentID: 0, Description: undefined, IsNoRequired: false, NoMaxLength: 0,
                  IsBankRequired: false, IsDateRequired: false, IsTransactionIDRequired: false, TransactionIDMaxLength : 0,
                  PayModeApplicableID: 0, IsNoRequiredValidation: false, IsBankRequiredValidation: false, IsDateRequiredValidation: false
                });
                break;

            }
         }
     }
/***************************************************************************************************************/
    $scope.FillBillList = function FillBillList() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = PatientBillRefundSrv.FillBillandServicesList($rootScope.PatientDataDetails.RegID, $rootScope.PatientDataDetails.RegUnitID,0,0);
        ResponseData.then(function (Response) {
        usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {                
                $scope.AdvanceList = Response.data;                
                //$scope.CalculateAdvance();
                if (Response.data.length > 0){
                    $scope.TotalItems = Response.data[0].TotalRows;     
                  }
                else {
                    $scope.TotalItems = 0;
                    AlertMessage.info(objResource.msgTitle, "No Patient Bill Available for Refund.");
                  }
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, "Something went wrong.");
            $scope.Error = error;
        });
    }



   $scope.FillServiceList = function FillServiceList(index) {
    debugger;
    usSpinnerService.spin('GridSpinner');
    // Ensure AdvanceList is valid before proceeding
    if (!$scope.AdvanceList || !$scope.AdvanceList[index]) {
        usSpinnerService.stop('GridSpinner');
        AlertMessage.error(objResource.msgTitle, "Invalid Bill Data.");
        return;
    }
    // Call the API with parameters from AdvanceList
    var ResponseData = PatientBillRefundSrv.FillBillandServicesList(
        $rootScope.PatientDataDetails.RegID,
        $rootScope.PatientDataDetails.RegUnitID,
        $scope.AdvanceList[index].BillID,
        $scope.AdvanceList[index].BillUnitID
    );
    ResponseData.then(
        function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                $scope.ServicesList = Response.data; // Store response data in ServicesList
                if (Response.data.length > 0) {
                    $scope.TotalItems = Response.data[0].TotalRows; // Update total items if data exists
                } else {
                    $scope.TotalItems = 0;
                    AlertMessage.info(objResource.msgTitle, "No Patient Services Available for Refund.");
                }
            }
        },
        function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, "Something went wrong.");
            $scope.Error = error;
        }
    );
};
/***************************************************************************************************************/
$scope.setClickedRow = function(item) {
debugger
    // Clear previous selections
    $scope.AdvanceList.forEach(function(row) {
        row.isSelected = false; // Reset isSelected for all items
    });

    // Mark the current item as selected
    $scope.AdvanceList[item].isSelected = true;
   // $scope.selectedItem = item; // Update the selected item reference
};



/*****************************************************************************************************************************/
$scope.CalculateAdvance = function CalculateAdvance() {
        debugger;
        $scope.PatientAdvanceRefundData.TotalAdvance = 0;
        $scope.PatientAdvanceRefundData.AdvancedConsumed = 0;
        $scope.PatientAdvanceRefundData.AdvanceAvailableRefund = 0;
        $scope.PatientAdvanceRefundData.TotalRefund = 0;
        $scope.PatientAdvanceRefundData.RefundAmount = '';
        $scope.PatientAdvanceRefundData.Remarks = '';
        for(var i = 0; i<$scope.AdvanceList.length;i++){
            $scope.PatientAdvanceRefundData.TotalAdvance = $scope.PatientAdvanceRefundData.TotalAdvance + $scope.AdvanceList[i].Total;
            $scope.PatientAdvanceRefundData.TotalRefund = $scope.PatientAdvanceRefundData.TotalRefund + $scope.AdvanceList[i].Refund;
            $scope.PatientAdvanceRefundData.AdvanceAvailableRefund =  $scope.PatientAdvanceRefundData.AdvanceAvailableRefund + $scope.AdvanceList[i].Balance;
            if($scope.selectedRow == i){           
            $scope.PatientAdvanceRefundData.AdvancedConsumed = $scope.PatientAdvanceRefundData.AdvancedConsumed + $scope.AdvanceList[i].Used;                     
            //$scope.PatientAdvanceRefundData.RefundAmount = $scope.PatientAdvanceRefundData.TotalRefund;
            if($scope.PatientAdvanceRefundData.AdvanceAvailableRefund == 0 && $scope.IsFormSave ==  false){
                AlertMessage.info(objResource.msgTitle, "No Patient Advance Available for Refund.");
                $scope.IsFormSave = false;
             }
            }
        }
}
/***************************************************************************************************************/
$scope.Validate = function(PatientAdvanceRefundData){
        debugger;
        if($scope.PatientAdvanceRefundData.AdvanceAvailableRefund == 0 && $scope.AdvanceList.length == 0){
            AlertMessage.info(objResource.msgTitle, "No Patient Advance Available for Refund.");
            return false;
        }
        else if($rootScope.PatientDataDetails == null){
            AlertMessage.info(objResource.msgTitle, "Please Select Patient");
            return false;
        }
        else if(PatientAdvanceRefundData.RefundAmount == 0){
            AlertMessage.info(objResource.msgTitle, "Enter Refund Amount");
            $scope.IsRefundAmount = true;            
            return false;
        }
        for(var i = 0; i < $scope.AdvanceList.length; i++){
            if($scope.selectedRow == i && $scope.PatientAdvanceRefundData.RefundAmount > $scope.AdvanceList[i].Balance){
                AlertMessage.warning(objResource.msgTitle, "Refund Amount should be less than or equal to BalanceAmount");
                $scope.PatientAdvanceRefundData.RefundAmount = $scope.AdvanceList[i].Balance;
                return false;
            }
        }
        
        for(var i = 0; i < $scope.OtherSrvPaymentModeList.length; i++){
            if($scope.OtherSrvPaymentModeList[i].PaymentModeID == 0){
                AlertMessage.warning(objResource.msgTitle, "Select Payment Mode");
                $scope.frmPatientAdvanceRefund.ddlPaymentMode.$dirty = true;
                return false;
            }
            else if($scope.OtherSrvPaymentModeList[i].PaymentAmount == undefined || 
            $scope.OtherSrvPaymentModeList[i].PaymentAmount == "0" || $scope.OtherSrvPaymentModeList[i].PaymentAmount == ""){
                AlertMessage.info(objResource.msgTitle, "Enter Payment Amount");
                $scope.frmPatientAdvanceRefund.txtPaymentAmount.$dirty = true;
                $scope.OtherSrvPaymentModeList[i].IsNoRequiredValidation = true;
                $scope.OtherSrvPaymentModeList[i].IsBankRequiredValidation = true;
                $scope.OtherSrvPaymentModeList[i].IsDateRequiredValidation = true;
                return false;
            }           
            else if($scope.OtherSrvPaymentModeList[i].IsNoRequired == true && ($scope.OtherSrvPaymentModeList[i].TransactionNo == undefined || 
                        $scope.OtherSrvPaymentModeList[i].TransactionNo == "")){
                    AlertMessage.info(objResource.msgTitle, "Enter Transaction No.");
                    $scope.OtherSrvPaymentModeList[i].IsNoRequiredValidation = true;
                    $scope.OtherSrvPaymentModeList[i].IsBankRequiredValidation = true;
                    $scope.OtherSrvPaymentModeList[i].IsDateRequiredValidation = true;
                    return false;
                }           
           else if($scope.OtherSrvPaymentModeList[i].IsBankRequired == true && ($scope.OtherSrvPaymentModeList[i].BankID == 0)){
                    AlertMessage.info(objResource.msgTitle, "Select Bank");
                    $scope.OtherSrvPaymentModeList[i].IsBankRequiredValidation = true;
                    $scope.OtherSrvPaymentModeList[i].IsNoRequiredValidation = false;
                    return false;
                }
           else if($scope.OtherSrvPaymentModeList[i].IsDateRequired == true && ($scope.OtherSrvPaymentModeList[i].PaymentDate == undefined || $scope.OtherSrvPaymentModeList[i].PaymentDate == "")){
                    AlertMessage.info(objResource.msgTitle, "Select Date");
                    $scope.OtherSrvPaymentModeList[i].IsDateRequiredValidation = true;
                    $scope.OtherSrvPaymentModeList[i].IsBankRequiredValidation = false;
                    return false;
                }
        }
        var sum = 0;
        for(var i = 0; i < $scope.OtherSrvPaymentModeList.length; i++){            
            sum = sum + parseInt($scope.OtherSrvPaymentModeList[i].PaymentAmount);
        }
        if(sum != PatientAdvanceRefundData.RefundAmount){
           AlertMessage.info(objResource.msgTitle, "Sum of Payment Amount should be equal to Advance Refund Amount.");
           return false;
        }
        return true;
}
/***************************************************************************************************************/
//Save Patient Advance Refund
    $scope.savePatientAdvanceRefund = function savePatientAdvance(PatientAdvanceRefundData){
        debugger;         
        if($scope.Validate(PatientAdvanceRefundData)){             
            swalMessages.MessageBox(objResource.msgTitle, "Are you sure you want to Save Refund Patient Bill?", "warning", function (isConfirmed) {
                if (isConfirmed) {
                    debugger;
                    usSpinnerService.spin('GridSpinner');
                    for(var i = 0; i<PatientAdvanceRefundData.lstPatientDataDetails.length;i++){
                        PatientAdvanceRefundData.lstPatientDataDetails.splice(i, 1);
                    }
                    for(var i = 0; i<PatientAdvanceRefundData.lstPaymentModeDetails.length;i++){
                        PatientAdvanceRefundData.lstPaymentModeDetails.splice(i, 1);
                    }
                    for(var i = 0; i<PatientAdvanceRefundData.lstPatientBillDetails.length;i++){
                        PatientAdvanceRefundData.lstPatientBillDetails.splice(i, 1);
                    }
                    PatientAdvanceRefundData.lstPatientDataDetails.push($rootScope.PatientDataDetails);
                    PatientAdvanceRefundData.lstPaymentModeDetails.push($scope.OtherSrvPaymentModeList);
                    $scope.AdvanceList.forEach(function (item) {
                        debugger
                        if (item.isSelected) {
                            debugger
                        PatientAdvanceRefundData.lstPatientBillDetails.push(item);
                    }
                });
                    var ResponseData = PatientBillRefundSrv.AddOrUpdateRefundForBill($scope.PatientAdvanceRefundData);
                    ResponseData.then(function (resp) {
                        debugger;                       
                        if (resp.data == 1)  {                           
                                AlertMessage.success(objResource.msgTitle, "Refund for Bill Saved Successfully");
                                $scope.IsFormSave = true;
                                $scope.FillBillList();
                                $scope.FillRefundList();
                                //$scope.PrintPatientAdvanceReceipt();
                                //$scope.Cancel();
                                $location.path('/PatientBillRefundLists/');
                         }                                                      
                        
                        usSpinnerService.stop('GridSpinner');
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error(objResource.msgTitle, "Something went wrong.");
                    });
                }
            });                     
        }       
    };
    /***************************************************************************************************************/
    $scope.FillRefundList = function FillRefundList() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = PatientBillRefundSrv.FillRefundList($rootScope.PatientDataDetails.RegID, $rootScope.PatientDataDetails.RegUnitID);
        ResponseData.then(function (Response) {
        usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {                
                $scope.RefundList = Response.data;
                if (Response.data.length > 0)
                    $scope.TotalItems = Response.data[0].TotalRows;
                else
                    $scope.TotalItems = 0;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, "Something went wrong.");
            $scope.Error = error;
        });
    }
    /***************************************************************************************************************/
    $scope.PrintPatientAdvanceRefundReceipt = function(item){
        debugger;
        $scope.PDF = false;
        var a = encodeURIComponent('RefundID=' + item.RefundID + '&RefundUnitID=' + item.RefundUnitID + 
                '&PatientID=' + item.PatientID + '&PatientUnitID=' + item.PatientUnitID + '&pdf=' + $scope.PDF);
        window.open('/Reports/PatientAdvanceRefund/PatientAdvanceRefund.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }
    /***************************************************************************************************************/
    $scope.Cancel = function(PatientAdvanceRefundData){
        debugger;                                         
        for(var i = 0; i<$scope.OtherSrvPaymentModeList.length;i++){
                       $scope.OtherSrvPaymentModeList.splice(i, 1);
         }
        $scope.OtherSrvPaymentModeList = [{ PaymentModeID: 0, PaymentAmount: parseInt(0), RefundAmount: parseInt(0), TransactionNo: undefined,
          BankID: 0, PaymentDate: undefined, CashMode: true, DisableAmount : true, PaymentID: 0, Description: undefined,
          IsNoRequired: false, NoMaxLength: 0, IsBankRequired: false, IsDateRequired: false, IsTransactionIDRequired: false,
          TransactionIDMaxLength : 0, PayModeApplicableID: 0, IsNoRequiredValidation: false, IsBankRequiredValidation: false,
          IsDateRequiredValidation: false}];
    }
    /***************************************************************************************************************/

    /*================================================================================================================New logic by Tejas Saxena for refund list*/
    

    $scope.SearchDataInit = function () {
        debugger;

        debugger;
        var Advance = [];
        usSpinnerService.spin('GridSpinner');
      
            debugger
                 //Bill.push($filter('date')(PatientBill.FromDate, 'shortDate'));
                //Bill.push($filter('date')(PatientBill.ToDate, 'shortDate'));
                var FromDate = new Date();
                var ToDate = new Date();
                //Bill.push(PatientBill.FromDate);
                //Bill.push(PatientBill.ToDate);

                Advance.push(FromDate);
                Advance.push(ToDate)
                //Bill.push($scope.PatientData.PatID.toString());
                //Bill.push($scope.PatientData.PatUnitID.toString());
                Advance.push(null);
                Advance.push(null);   //3
                Advance.push(null);
                Advance.push(null);
                Advance.push(null);
                Advance.push(null);
              //  Advance.push(null);
               Advance.push('Bill');

                //Bill.push($scope.CurrentPage - 1);   ///
                var responseData = PatientBillRefundSrv.GetRefundlist(Advance, $scope.CurrentPage - 1, true);
                responseData.then(function (Response) {
                debugger
                    if (Response.data.TotalCount > 0) {
                    debugger
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = Response.data.TotalCount; //
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = 0;
                    }
                    $scope.RefundList = Response.data.AdvanceList;
                    console.log("AdvanceList:", $scope.AdvanceList);

                }, function (error) {
                    //AlertMessage.info('PalashIVF', 'Error Occured.');
                    usSpinnerService.stop('GridSpinner');
                     AlertMessage.warning(objResource.msgTitle, objResource.msgVisFrmDtGrtrThnVisToDt);
                })
        }


    $scope.SearchData = function (PatientAdvanceData) {
        debugger;

        debugger;
        var Advance = [];
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(PatientAdvanceData.FromDate)) { PatientAdvanceData.FromDate = null; }
        if (angular.isUndefined(PatientAdvanceData.ToDate)) { PatientAdvanceData.ToDate = null; }       
        if (angular.isUndefined(PatientAdvanceData.FirstName) || PatientAdvanceData.FirstName == '') { PatientAdvanceData.FirstName = null; }
        if (angular.isUndefined(PatientAdvanceData.MiddleName) || PatientAdvanceData.MiddleName == '') { PatientAdvanceData.MiddleName = null; }
        if (angular.isUndefined(PatientAdvanceData.LastName) || PatientAdvanceData.LastName == '') { PatientAdvanceData.LastName = null; }
        if (angular.isUndefined(PatientAdvanceData.MRNO) || PatientAdvanceData.MRNO =='') { PatientAdvanceData.MRNO = null; }
        if (angular.isUndefined(PatientAdvanceData.ReceiptNo) || PatientAdvanceData.ReceiptNo =='') { PatientAdvanceData.ReceiptNo = null; }

        if ((PatientAdvanceData.ToDate != null && PatientAdvanceData.FromDate == null) || (PatientAdvanceData.ToDate == null && PatientAdvanceData.FromDate != null)) {
            debugger
            AlertMessage.info(objResource.msgTitle, objResource.msgSelVisFrmDtAndVisToDt);
        }
        else {
        debugger
            if (PatientAdvanceData.FromDate <= PatientAdvanceData.ToDate) {
            debugger
                 //Bill.push($filter('date')(PatientBill.FromDate, 'shortDate'));
                //Bill.push($filter('date')(PatientBill.ToDate, 'shortDate'));
                var FromDate = new Date(PatientAdvanceData.FromDate).toISOString();
                var ToDate = new Date(PatientAdvanceData.ToDate).toISOString();
                //Bill.push(PatientBill.FromDate);
                //Bill.push(PatientBill.ToDate);

                Advance.push(FromDate);
                Advance.push(ToDate)
                //Bill.push($scope.PatientData.PatID.toString());
                //Bill.push($scope.PatientData.PatUnitID.toString());
                Advance.push(null);
                Advance.push(null);   //3
                Advance.push(PatientAdvanceData.FirstName);
               // Advance.push(PatientAdvanceData.MiddleName);
                Advance.push(PatientAdvanceData.LastName);
                Advance.push(PatientAdvanceData.MRNO);
                Advance.push(PatientAdvanceData.ReceiptNo);
               Advance.push('Bill');

                //Bill.push($scope.CurrentPage - 1);   ///
                var responseData = PatientBillRefundSrv.GetRefundlist(Advance, $scope.CurrentPage - 1, true);
                responseData.then(function (Response) {
                debugger
                    if (Response.data.TotalCount > 0) {
                    debugger
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = Response.data.TotalCount; //
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = 0;
                    }
                  $scope.RefundList = Response.data.AdvanceList;

                }, function (error) {
                    //AlertMessage.info('PalashIVF', 'Error Occured.');
                    usSpinnerService.stop('GridSpinner');
                })
            }
            else {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.warning(objResource.msgTitle, objResource.msgVisFrmDtGrtrThnVisToDt);
            }
        }

    }


       $scope.goToRefundPage = function() {
debugger
        $location.path('/PatientBillRefund/');
    };

      $scope.PrintPatientRefundReceipt = function(item){
        debugger;
        $scope.PDF = false;
        var a = encodeURIComponent('RefundID=' + item.RefundID + '&RefundUnitID=' + item.RefundUnitID + 
                '&PatientID=' + item.PatientID + '&PatientUnitID=' + item.PatientUnitID + '&pdf=' + $scope.PDF);
        window.open('/Reports/PatientAdvanceRefund/PatientAdvanceRefund.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }


$scope.populateFormData = function (selectedItem,index) {
debugger

    if (selectedItem.isSelected) {
    debugger
        // Add data from the selected service to the refund amounts and payment mode


          

            // If no existing row found, add a new one
            $scope.OtherSrvPaymentModeList.push({
                PaymentModeID: 0, 
                PaymentAmount: parseInt(selectedItem.TotalAmount - selectedItem.TotalRefundAmount), // Refund amount for the service
                RefundAmount: parseInt(selectedItem.TotalAmount - selectedItem.TotalRefundAmount),
                TransactionNo: undefined,
                BankID: 0,
                PaymentDate: undefined,
                CashMode: true,
                DisableAmount: true,
                PaymentID: 0,
                ChargeID: selectedItem.ChargeID,
                Description: undefined,
                IsNoRequired: false,
                NoMaxLength: 0,
                IsBankRequired: false,
                IsDateRequired: false,
                IsTransactionIDRequired: false,
                TransactionIDMaxLength: 0,
                PayModeApplicableID: 0,
                IsNoRequiredValidation: false,
                IsBankRequiredValidation: false,
                IsDateRequiredValidation: false
            });
            $scope.PatientAdvanceRefundData.TotalAdvance = ($scope.PatientAdvanceRefundData.TotalAdvance || 0) + selectedItem.TotalAmount;
$scope.PatientAdvanceRefundData.TotalRefund = ($scope.PatientAdvanceRefundData.TotalRefund || 0) + selectedItem.TotalRefundAmount;
$scope.PatientAdvanceRefundData.RefundAmount = $scope.PatientAdvanceRefundData.TotalAdvance - $scope.PatientAdvanceRefundData.TotalRefund;
    } else {
        // Clear the corresponding service's data if it is unchecked
        $scope.PatientAdvanceRefundData.TotalAdvance -= selectedItem.TotalAmount;
        $scope.PatientAdvanceRefundData.TotalRefund -= selectedItem.TotalRefundAmount;
        $scope.PatientAdvanceRefundData.RefundAmount = $scope.PatientAdvanceRefundData.TotalAdvance - $scope.PatientAdvanceRefundData.TotalRefund;

        // Remove the payment mode row corresponding to this service based on ChargeID
        let existingRowIndexdelete = $scope.OtherSrvPaymentModeList.findIndex(item => item.ChargeID === selectedItem.ChargeID);
        if (existingRowIndexdelete !== -1) {
            $scope.OtherSrvPaymentModeList.splice(existingRowIndexdelete, 1);
        }
    }
};




$scope.downloadReport = function (item) {
    debugger;
    // First, call GetReportData and proceed only if successful
    $scope.GetReportData(item).then(function () {
        const element = document.getElementById('content');

        // Temporarily replace the class name for custom-table-container with no-table-styles
        const tableContainer = document.querySelector('.custom-table-container');
        
        if (tableContainer) {
            tableContainer.classList.remove('custom-table-container');
            tableContainer.classList.add('no-table-styles');
        }

        const options = {
            filename: 'Service_Refund_Receipt.pdf',
            margin: [0.5, 0.5, 0.5, 0.5],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
        unit: 'in',
        format: 'a4', // Use A4 paper size
        orientation: 'portrait', // Portrait orientation
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Add custom footer and generate the PDF
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
                 const clinicDetails = $scope.reportData[0];
                
                // Add clinic logo (if exists) to each page
                for (let i = 1; i <= totalPages; i++) {
                debugger
                    pdf.setPage(i);

                    // Add clinic logo (positioned top-left with custom size)
                    if (clinicDetails.Logo  && clinicDetails.IsUnitWithPrint) {
                    debugger
                        pdf.addImage(
                            clinicDetails.Logo,
                            'PNG',
                            0.7, // Left margin
                            0.3, // Top margin
                            1.5,   // Width (adjust this as needed)
                            1  // Height (adjust this as needed)
                        );
                    }
}
                //const now = new Date();
                //const formattedDateTime = now.toLocaleString('en-GB', {
                //    day: '2-digit',
                //    month: 'short',
                //    year: 'numeric',
                //    hour: '2-digit',
                //    minute: '2-digit',
                //    hour12: true,
                //}).replace(',', '');

                //for (let i = 1; i <= totalPages; i++) {
                //    pdf.setPage(i);
                //    pdf.text(`Print Date & Time: ${formattedDateTime}`, 0.5, pageHeight - 0.25);
                //    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 0.5, pageHeight - 0.25, { align: 'right' });
                //}
            })
            .save()
            .finally(() => {
                if (tableContainer) {
                    tableContainer.classList.remove('no-table-styles');
                    tableContainer.classList.add('custom-table-container');
                }
            });
    }).catch(function (error) {
        // Handle the case where GetReportData fails
        console.error("Error fetching report data", error);
        alert("Failed to fetch report data. Cannot download the report.");
    });
};

$scope.isFirstOccurrence = function (index, cancellationNo) {
    // Check if this is the first occurrence of the given CancellationNo
    for (let i = 0; i < index; i++) {
        if ($scope.reportData[i].CancellationNo === cancellationNo) {
            return false;
        }
    }
    return true;
};

$scope.countOccurrences = function (cancellationNo) {
    // Count how many times a given CancellationNo appears in the data
    return $scope.reportData.filter(item => item.CancellationNo === cancellationNo).length;
};


$scope.GetReportData = function (item) {
    return new Promise((resolve, reject) => {
        debugger;
        var response = PatientBillRefundSrv.PrintBillRefundReceipt(item.PatientID, item.PatientUnitID, item.RefundID);
        response.then(function (res) {
            debugger;
            if (res.data.length === 0) {
                AlertMessage.warning(objResource.msgTitle, 'Error fetching reports: ' + 'Records not found');
                reject(new Error('No records found')); // Reject the promise
                return;
            }

            $scope.reportData = res.data;
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> report data:", $scope.reportData);

            const paidAmountInWords = $scope.GetnumberToWords($scope.reportData[0].RefundAmount);
            $scope.reportData[0].PaidAmountInWords = paidAmountInWords;
            const now = new Date();
            $scope.reportData[0].PrintDateTime = now.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }).replace(',', '');

            resolve(); // Resolve the promise when data is successfully fetched
        }).catch(function (error) {
            AlertMessage.warning(objResource.msgTitle, 'Error fetching reports: ' + error.message);
            reject(error); // Reject the promise in case of error
        });
    });
};


//$scope.GetReportData = function (item ){
//debugger
//    var response = PatientBillRefundSrv.PrintBillRefundReceipt(item.PatientID,item.PatientUnitID,item.RefundID );
//     response.then(function (res) {
//          debugger
     

//           if(res.data.length == 0){
//           debugger
//                AlertMessage.warning(objResource.msgTitle, 'Error fetching reports: ' + ('Records not found')); // Show error message
//                return
//           }
            
//           $scope.reportData = res.data;
//           console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> report data:",$scope.reportData)
//            const paidAmountInWords = $scope.GetnumberToWords($scope.reportData[0].NetAmount);
//          $scope.reportData[0].PaidAmountInWords = paidAmountInWords;
//            const now = new Date();
//    $scope.reportData[0].PrintDateTime = now.toLocaleString('en-GB', {
//        day: '2-digit',
//        month: 'short',
//        year: 'numeric',
//        hour: '2-digit',
//        minute: '2-digit',
//        hour12: true,
//    }).replace(',', '');
//           //$scope.loadReportData()
        
          
//    })

//};

$scope.GetnumberToWords = function (amount) {
    if (amount === null || amount === undefined || isNaN(amount)) return '';

    let inWords = 'Rupees ';
    let rmVal = 0;
    let amt = Math.round(amount); // Round off to the nearest integer
    let pAmt = 0;

    const toWords = (num) => {
        const belowTwenty = [
            'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
            'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
        ];
        const tens = [
            '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
        ];

        if (num < 20) return belowTwenty[num];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + belowTwenty[num % 10] : '');
        if (num < 1000) return belowTwenty[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + toWords(num % 100) : '');
        return '';
    };

    if (amt >= 10000000) { // Handle Crore
        rmVal = Math.floor(amt / 10000000);
        inWords += toWords(rmVal) + (rmVal > 1 ? ' Crores ' : ' Crore ');
        amt -= rmVal * 10000000;
    }

    if (amt >= 100000) { // Handle Lakh
        rmVal = Math.floor(amt / 100000);
        inWords += toWords(rmVal) + ' Lakh ';
        amt -= rmVal * 100000;
    }

    if (amt >= 1000) { // Handle Thousand
        rmVal = Math.floor(amt / 1000);
        inWords += toWords(rmVal) + ' Thousand ';
        amt -= rmVal * 1000;
    }

    if (amt >= 100) { // Handle Hundreds
        rmVal = Math.floor(amt / 100);
        inWords += toWords(rmVal) + ' Hundred ';
        amt -= rmVal * 100;
    }

    if (amt > 0) { // Handle remaining numbers
        inWords += toWords(amt) + ' ';
    }

    // Handle Paisa (decimal part)
    pAmt = Math.round((amount - Math.floor(amount)) * 100);
    if (pAmt > 0) {
        inWords += 'and ' + toWords(pAmt) + ' Paisa ';
    }

    return inWords.trim() + ' Only';
};
    });