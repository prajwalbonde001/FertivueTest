'use strict';
angular.module('PIVF').controller("CounterSaleCtrl", ['$rootScope', '$scope', 'localStorageService', 'CounterSaleSrv', 'PatientVisitService','NewRegistrationService', 'StoreService', 'Common', 'usSpinnerService', 'srvCommon', 'AlertMessage', '$filter', '$location' ,'swalMessages', //'localStorageService'
function ($rootScope, $scope, localStorageService,CounterSaleSrv ,PatientVisitService ,NewRegistrationService, StoreService, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location,swalMessages) {

//Declarations
$scope.PatientData = {};
$scope.CounterSaleInfo={};
$scope.BillDetails = {};
$scope.PatientList = [];
$scope.PatientData.UnitID = localStorageService.get("UserInfo").UnitID;
$scope.IsDisabled= false;
$scope.CounterSaleInfo.StoreID = 0;
$scope.CounterSaleInfo.UnitID = 0;
$rootScope.FormName = 'Counter Sale';
$rootScope.isAction = true;
$rootScope.hideWhenQueue = true;
$scope.StoreList = [];
$scope.ItemSaleDetails = [];
$scope.ItemSaleDetailsList=[];
$scope.IsSellBySellingUnit = true;
$scope.NewRegistration = {};
$scope.NewRegistration.lstPatient = [];
$scope.objAddress = {};
$scope.PatientData.objAddress = {};
$scope.NewRegistration.lstAddress = [];
$scope.PatientData.objAddress.CountryID = '';
$scope.PatientData.objAddress.StateID = '';
$scope.PatientData.objAddress.CityID = '';
$scope.objAddress.IsPatient = true;
//$scope.PatientData.VisitDate = new Date();
//$scope.PatientData.VisitTime = new Date();
$scope.BillDetails.lstPatient = [];
$scope.BillDetails.lstAddress = [];
$scope.BillDetails.objPatientVisit=[];
$scope.BillDetails.objPatientRegistration = [];
$scope.BillDetails.objPatientRegistration.lstPatient=[];
$scope.lstPatientForSave = [];
$scope.lstSponserForSave = [];
$scope.BillDetails.SelectedOtherServiceList = [];
$scope.BillDetails.Payment = [];
$scope.BillDetails.OtherSrvPaymentModeList = [];
$scope.BillDetails.ItemSaleDetailsList=[];
$scope.BillDetails.ChargeList = [];
$scope.BillDetails.ChargeDetailsList = [];
$scope.BillDetails.objItemSalesVO=[];
$scope.objItemStockVO={};
$scope.BillDetails.objItemStockVO={};
$scope.isExisting=0;
$scope.CurrentPage1 = 1;

/***********************************************************************************************************************/
//To load dropdown data when page loaded
$scope.loadData = function loadData() {
    debugger;
 $scope.selectedPatientFromPatient = '';
 $scope.GetPatientDetailsFromPatient(false);
 $scope.fillGenderList();
 $scope.PatientData.DateOfBirth = null;
 $scope.GetDoctorList();
 $scope.GetCountryList();
 var UserInfo = localStorageService.get("UserInfo");
 $scope.CounterSaleInfo.UnitID = UserInfo.UnitID;
 $scope.GetStoreList();
 $scope.GetModeofPayment();
 $scope.GetBankDetails();
 $scope.GetItemUOMConversionsByID();
 $scope.PatientData.ReferredDoctorID=null;
 // $scope.PatientData.DOCID=null;
 $scope.disableIsFreezed = true;
 // $scope.disabledCheckbox();
 //$scope.getUOMList();
 
}
/***********************************************************************************************************************/
  // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

  //For Past date to till date
    $scope.dateOptionsDOB = {
        formatYear: 'yyyy',
        maxDate: new Date(), 
        minDate: new Date().setYear(new Date().getYear() - 110),
        startingDay: 1,
        showWeeks: false
    };

    $scope.open1 = function () {
    $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    //added by yogitak on 21jan 2021
     var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //$scope.disabledCheckbox = function disabledCheckbox() {
    //       $("#checkbox").disabled = true;
    //    }

     $scope.ShowPaymentData = false;
    $scope.disableFeeeze = false;
    $scope.disableSave = false;
   // $scope.disableIsFreezed = false;
   // For Future Dates
   $scope.dateOptionsDOB1 = {
       formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 300),
        minDate: new Date(),  
        startingDay: 1,
        showWeeks: false
    }; 

    $scope.openLabDtPickr = function ($event, item) {    //
        $event.preventDefault();
        $event.stopPropagation();
        item.dtpickropened = true;
    };

    //var objResource = {};
    //if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
    //    objResource = srvCommon.get();
    //}

/***********************************************************************************************************************/
//Binding patient data while searching
    $scope.BindData = function BindData() 
    {
   $scope.IsDisabled= true;
        debugger;
        $scope.selectedPatient = JSON.parse(sessionStorage.getItem("SavedPatientData"));
        if ($scope.selectedPatient != undefined)
        {
            sessionStorage.removeItem("SavedPatientData");
            $scope.IsPatientSelected = false; 
            $scope.PatientData.MRNo = $scope.selectedPatient.MRNo;
            $scope.PatientData.Prefix = $scope.selectedPatient.Prefix;
            $scope.PatientData.MiddleName = $scope.selectedPatient.MiddleName;
            if($scope.PatientData.MiddleName != "")
             {
            $scope.PatientData.PatientFullName = $scope.selectedPatient.PatientFullName;
            $rootScope.PatientFullName = $scope.PatientData.PatientFullName;
            var ExistingPatient = $rootScope.PatientFullName;
            var ExistingPatientName = ExistingPatient.split(" ");
            $scope.PatientData.FirstName = ExistingPatientName[2];
            $scope.PatientData.MiddleName = ExistingPatientName[3];
            $scope.PatientData.LastName = ExistingPatientName[4];
             }
             else{$scope.PatientData.PatientFullName = $scope.selectedPatient.PatientFullName;
            $rootScope.PatientFullName = $scope.PatientData.PatientFullName;
            var ExistingPatient = $rootScope.PatientFullName;
            var ExistingPatientName = ExistingPatient.split(" ");
            $scope.PatientData.FirstName = ExistingPatientName[2];
            $scope.PatientData.LastName = ExistingPatientName[3];
           // $scope.PatientData.LastName = ExistingPatientName[4];}
             }
            $scope.options = [{ 'GenderId': parseInt($scope.selectedPatient.GenderId), 'GenderDescription': $scope.selectedPatient.Gender }]
            $scope.PatientData.GenderId = $scope.options[0].GenderId;
            $scope.PatientData.GenderID = $scope.options[0].GenderDescription;
            var MobileNumber = $scope.selectedPatient.MobileNo;
            var MobileNo = MobileNumber.split(" ");
            $scope.PatientData.MobileCountryCode = MobileNo[0];
            $scope.PatientData.MobileNo = MobileNo[1];
            $scope.PatientData.DateOfBirth = new Date( $scope.selectedPatient.DateOfBirth);
            $scope.PatientData.Age = $scope.selectedPatient.Age;
            // $scope.PatientData.DOB1 = new Date($scope.selectedPatient.DOB1);
            $scope.PatientData.PhotoString = $scope.selectedPatient.PhotoString;
            $scope.PatientData.RegID = $scope.selectedPatient.RegID;
            $scope.PatientData.RegUnitID = $scope.selectedPatient.RegUnitID;
            $scope.PatientData.RegType = $scope.selectedPatient.RegType;
            $scope.PatientData.RegisteredCategory = $scope.selectedPatient.RegisteredCategory;
            $scope.PatientData.PreviousOutstanding = $scope.selectedPatient.PreviousOutstanding;
            $scope.PatientData.VisitUnitID = $scope.selectedPatient.VisitUnitId;
            $scope.PatientData.VisitID = $scope.selectedPatient.VisitID;
            $scope.selectedPatientFromPatient = '';
            
        }
        else
        {  
            AlertMessage.warning('PalashIVF', "Please select patient");
        }
    };

/***********************************************************************************************************************/
//Used for patient search
    $scope.GetPatientDetailsFromPatient = function GetPatientDetailsFromPatient(IsAppSearch)
    {
        debugger;
            $scope.selectedPatientFromPatient = "";
            $scope.RegUnitID = $scope.PatientData.UnitID
            $scope.PatientList = [];        
            var Promise = CounterSaleSrv.GetPatientDetails($scope.selectedPatientFromPatient, IsAppSearch,$scope.RegUnitID);
            Promise.then(function (Response)
            {           
            $scope.PatientList = Response.data.lstPatientAutoComplete;
            //$scope.BindData();
            if ($scope.PatientDataFromReg != undefined) {
                sessionStorage.setItem("SavedPatientData", JSON.stringify($scope.PatientList[0]));
                $scope.BindData();
            }
            }, 
             function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Message = "Error" + error.status;
        });
    };

/***********************************************************************************************************************/
//Binding selected patient on searching
    $scope.SelectedPatient = function SelectedPatient(selectedPatient)  //, IsAppSearch
    {
        debugger;
        sessionStorage.setItem("SavedPatientData", JSON.stringify(selectedPatient));
        if (selectedPatient.MRNo != "")
        {
            //if (IsAppSearch)
            //{
            //    localStorageService.set('UserInfo', { UnitID: 0 });
            //    $scope.selectedPatientFromPatient = null;
            //    $scope.selectedPatientFromApp = selectedPatient.MRNo;
            //    $scope.PatientData.RegID = selectedPatient.RegID;
            //    $scope.PatientData.RegUnitID = selectedPatient.RegUnitID;    
            //    $scope.PatientData.PatientAddress = selectedPatient.PatientAddress;
            //    $scope.PatientData.CommunicationAddress = selectedPatient.CommunicationAddress; 
            //    $scope.PatientData.FirstName = selectedPatient.FirstName;
            //    $scope.PatientData.MiddleName = selectedPatient.MiddleName;
            //    $scope.PatientData.LastName = selectedPatient.LastName;
            //    $scope.PatientData.MobileCountryCode = selectedPatient.MobileCountryCode;
            //    $scope.PatientData.MobileNo1 = selectedPatient.MobileNo1;
            //    $scope.PatientData.DOB = selectedPatient.DOB;
            //}
            //else
            //{
                $scope.selectedPatientFromPatient = selectedPatient.MRNo;
                $scope.PatientData.RegID = selectedPatient.RegID;
                $scope.PatientData.RegUnitID = selectedPatient.RegUnitID;
                $scope.PatientData.PatientAddress = selectedPatient.PatientAddress;
                $scope.PatientData.CommunicationAddress = selectedPatient.CommunicationAddress; 
                $scope.PatientData.FirstName = selectedPatient.FirstName;
                $scope.PatientData.MiddleName = selectedPatient.MiddleName;
                $scope.PatientData.LastName = selectedPatient.LastName;
                $scope.PatientData.MobileCountryCode = selectedPatient.MobileCountryCode;
                $scope.PatientData.MobileNo1 = selectedPatient.MobileNo1;
                $scope.PatientData.DateOfBirth = selectedPatient.DateOfBirth;
            //}
            selectedPatient.IsNonRegPatientRedirect = false;
        } 
        else 
        {
            //swalMessages.MessageBox("Palash IVF", "Do you want to Register Patient ?", "warning", function (isConfirmed)
            //{ 
            //    if (isConfirmed)
            //    {
            //        Common.clearObj();
            //        selectedPatient.IsNonRegPatientRedirect = true;
            //        Common.setObj(selectedPatient);
            //        $location.path('/Registration/');
            //    } 
            //    else 
            //    {
            //        $scope.IsPatientSelected = true;
            //    }
            //});
         }
    }

/***********************************************************************************************************************************************************/    
//All Dropdowns
$scope.fillGenderList = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_GenderMaster', 'GenderId', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.GenderList = Response.data;
            $scope.PatientData.GenderID = 0;
          }, function (error) {
        });
    }

$scope.GetDoctorList = function GetDoctorList() {
        debugger;
        var ResponseData = Common.GetDoctorList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DoctorList = Response.data;
           }, function (error) {
        });
    }

$scope.GetModeofPayment = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_ModeOfPayment', 'PaymentID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.PaymentModeList = Response.data;           
            $scope.CounterSaleInfo.PaymentModeID = 0;
            
        }, function (error) {
        });
    }

$scope.GetBankDetails = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_BankMaster', 'BankID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.BankList = Response.data;           
            $scope.CounterSaleInfo.BankID = 0;
            
        }, function (error) {
        });
    }


/***********************************************************************************************************************************************************/    
//For Mobile Country Code
$scope.GetCountryList = function () {
        debugger;
        var ResponseData = Common.GetCountryList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { CountryID: 0, CountryName: "Country" });
            $scope.CountryList = Response.data;
            }, function (error) {
        });
    };

$scope.SelectedCountry = function (country)
    { 
    debugger;
     $scope.PatientData.MobCountryCodeID = country.CountryID;
    $scope.country = country.CountryCode;
     
    }

/***********************************************************************************************************************************************************/    
//Doctor Autocomplete Search Box
 $scope.getMatchingDoctor = function ($viewValue) {
        debugger;
        var matchingStuffs = [];
        for (var i = 0; i <  $scope.DoctorList.length; i++)
        {
            if (
                 $scope.DoctorList[i].Description.toLowerCase().indexOf($viewValue.toLowerCase()) != -1)
                 {
                 matchingStuffs.push( $scope.DoctorList[i]);
                 }
       }
        return matchingStuffs;
   }

 $scope.onSelect = function ($item, $model, $label) {
        debugger;
        $scope.SelectedDoctor = $model;
        //$scope.PatientData.SelectedDoctor = $item.ID;
        $scope.PatientData.ReferredDoctorID=$item.ID;
        // $scope.PatientData.DOCID=$item.ID;
    };

/**********************************************************************************************************************************************/
//For UOM Dropdown
//$scope.getUOMList = function () {
//           debugger;
//           var ResponseData = Common.getMasterList('M_UnitOfMeasure', 'ID', 'Description');
//           ResponseData.then(function (Response) {
//               Response.data.splice(0, 0, { ID: 0, Description: "Select" });
//               $scope.UOMList = Response.data;
//               $scope.CounterSaleInfo.BaseUOMID = 0;
//           }, function (error) {
//           });
//       }

/**********************************************************************************************************************************************/
//For Store Dropdown 
 $scope.GetStoreList = function GetStoreList() {
        debugger;
        var searchPara = {};
        searchPara = {
            StoreType: 0, SearchExp: "", IsPagingEnable: false, Pgindx: 0, ClinicId: $scope.CounterSaleInfo.UnitID
        };
        //var searchPara = "";
        var Promise = StoreService.GetStoreList(searchPara);
        Promise.then(function (Response) {
            debugger;
            $scope.StoreList = Response.data;
            $scope.CounterSaleInfo.StoreID=0;
          
         
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

 /******************************************************************************************************************/
 //For item Search 
 $scope.GetItemListofStore = function () {
        debugger;
         var StoreID = [];
         $scope.StoreID=$scope.CounterSaleInfo.StoreID;
         var responseData = CounterSaleSrv.GetItemListofStore($scope.StoreID);
        responseData.then(function (Response) { 
        $scope.ItemList = Response.data;
        }, function (error) {
           
        });
    }

 $scope.getMatchingItem = function ($viewValue) {
        debugger;
        var matchingStuffs = [];
        for (var i = 0; i <  $scope.ItemList.length; i++)
        {
            if (
                 $scope.ItemList[i].ItemName.toLowerCase().indexOf($viewValue.toLowerCase()) != -1)
                 {
                 matchingStuffs.push( $scope.ItemList[i]);
                 }
       }
        return matchingStuffs;
   }

//Commented as no use in code
//$scope.onSelect1 = function ($item, $model, $label) {
//        debugger;
//        $scope.SelectedItem = $model;
        
        
//        $scope.GetItemBatchwiseStock($scope.CounterSaleInfo);
        
//};



$scope.ViewBatchmodal = function ViewBatchmodal($item, $model, $label) {  // added by Yogita
            debugger;
            $scope.SelectedItem = $model;
            $scope.GetItemBatchwiseStock($scope.CounterSaleInfo);
            angular.element(modbatchinfo).modal('show');
            //angular.element(CounterSaleInfo.Quantity).focus();
            angular.element(QuntityInput).focus();
        }


$scope.closebatchinformation = function closebatchinformation(){
 //$scope.ItemDetails=[];
     //$scope.BatchItemList=[];
       angular.element(itemsearch).val="";
       angular.element(modbatchinfo).modal('hide');
        
        angular.element(itemsearch).focus()
}

$(document).ready(function(){
    $("#modbatchinfo").on('shown.bs.modal', function(){
        $(this).find('#QuntityInput').focus();
    });
});



$scope.Clearinformation = function Clearinformation(){
   $("#newinfo input").each(function() {
      this.value = "";
  })    
}


//$scope.ClearBillPayment = function ClearBillPayment(){
//   $("#BillPayment input").each(function() {
//      this.value = "";
//  })    
//}

//$scope.onSelect2 = function ($item, $model, $label) {
//        debugger;
//        $scope.SelectedItem = $model;
//          $scope.CalculateConversionFactorCentral($scope.ItemSaleDetailsList);
        
//       // $scope.GetItemBatchwiseStock($scope.CounterSaleInfo);
        
//};

/******************************************************************************************************************/
 //For Batch Binding
$scope.GetItemBatchwiseStock = function GetItemBatchwiseStock(CounterSaleInfo) {
  debugger;
  var responseData = CounterSaleSrv.GetItemBatchwiseStock(CounterSaleInfo.SelectedItem.ID, $scope.CounterSaleInfo.UnitID,CounterSaleInfo.StoreID);
        responseData.then(function (Response) { 
            $scope.BatchItemList = Response.data;
            $scope.GetItemDetailsByID(CounterSaleInfo);
            
        }, function (error) {
           
        });
    // $scope.CounterSaleInfo.SelectedItem = null;
}

$scope.GetItemDetailsByID = function GetItemDetailsByID(CounterSaleInfo) {
  debugger;
  var responseData = CounterSaleSrv.GetItemDetailsByID(CounterSaleInfo.SelectedItem.ID,CounterSaleInfo.StoreID);
        responseData.then(function (Response) { 
        $scope.ItemDetails = Response.data;
        $scope.GetItemUOMConversionsByID(CounterSaleInfo);
        }, function (error) {
           
        });
        //$scope.CounterSaleInfo.SelectedItem = null;
  }

/*************************************************************************************************************/
$scope.GetItemUOMConversionsByID = function GetItemUOMConversionsByID(CounterSaleInfo) {
  debugger;
  var responseData = CounterSaleSrv.GetItemUOMConversionsByID(CounterSaleInfo.SelectedItem.ID);
        responseData.then(function (Response) { 
        Response.data.UOMConvertList.splice(0, 0, {ID: 0, Description: "Select" });
        $scope.ItemDetails.UOMList = Response.data.UOMConvertList;
        $scope.ItemDetails.UOMConversionList = Response.data.UOMConversionList;
       // $scope.ItemDetails.BaseUOMID = 0;
         $scope.CounterSaleInfo.BaseUOMID = 0;
        }, function (error) {
           
        });
        $scope.CounterSaleInfo.SelectedItem = null;
  }

/*************************************************************************************************************/
$scope.CalculateConversionFactorCentral = function CalculateConversionFactorCentral(ItemSaleDetails,Indx) {
//CounterSaleInfo.FromUOMID,CounterSaleInfo.ToUOMID,CounterSaleInfo.BaseUOMID,
  debugger;
  var FromUOMID = ItemSaleDetails.SelectedUOMID;
  var ToUOMID = ItemSaleDetails.SUOMID;//SUOMID
 // var ToUOMID = ItemSaleDetails.ToUOMID;
  var BaseUOMID = ItemSaleDetails.BaseUOMID;

  var UOMConvertLIst;
  var objConversionVO = {};
  var objConversionFrom = {};
  var objConversionTo = {};

 // var CalculatedFromCF;
 // var CalculatedToCF;
 // var CalculatedCF;
 // var ConversionFactor;
 // var BaseConversionFactor;
 // var MRP;
 // var Quantity;
 // var BaseRate;
 // var BaseMRP;
 //// var SingleQuantity;
 // var MainMRP;
 // var MainRate;
 // var BaseQuantity;
  
           //objConversionVO.UOMConvertLIst=  $scope.ItemDetails.UOMList;
           objConversionVO.UOMConvertLIst=$scope.ItemDetails.UOMConversionList;

           objConversionVO.MainMRP = ItemSaleDetails.MainMRP;
           objConversionVO.MainRate = ItemSaleDetails.MainRate;
           objConversionVO.SingleQuantity = ItemSaleDetails.Quantity;

            //$scope.BaseUOMID = ItemSaleDetails.BaseUOMID;

            if (objConversionVO.UOMConvertLIst.length > 0)
                {
                    objConversionFrom = objConversionVO.UOMConvertLIst.find(z => z.FromUOMID === FromUOMID && z.ToUOMID === BaseUOMID);
                    objConversionTo = objConversionVO.UOMConvertLIst.find(z => z.FromUOMID === ToUOMID && z.ToUOMID === BaseUOMID);
                }

             if (objConversionFrom != undefined) //&& objConversionTo != null
                { 
                 // var ToUOMID;
                  // var FromUOMID;
                   //var BaseUOMID;
                    objConversionVO.CalculatedFromCF = objConversionFrom.ConversionFactor;

                    if (objConversionTo != undefined)
                        objConversionVO.CalculatedToCF = objConversionTo.ConversionFactor;
                    else if (ToUOMID === BaseUOMID)
                        objConversionVO.CalculatedToCF = 1;

                    objConversionVO.CalculatedCF = objConversionVO.CalculatedFromCF / objConversionVO.CalculatedToCF;

                    objConversionVO.ConversionFactor = objConversionVO.CalculatedCF;
                    objConversionVO.BaseConversionFactor = objConversionVO.CalculatedFromCF;
                }


                if (objConversionVO.CalculatedCF > 0 && FromUOMID != ToUOMID) // e.g. (Selected Transaction UOM) Box != Strip (Item Master Stock UOM) 
                { 
                    if (objConversionVO.CalculatedCF)   //if $.isNumeric(CalculatedCF)// (Number.isInteger(CalculatedCF))//e.g. Strip to Tab
                    {
                        objConversionVO.MRP = objConversionVO.MainMRP  * objConversionVO.CalculatedFromCF;
                        objConversionVO.Rate = objConversionVO.MainRate * objConversionVO.CalculatedFromCF;

                        objConversionVO.Quantity = objConversionVO.SingleQuantity * objConversionVO.ConversionFactor;
                        objConversionVO.BaseQuantity = objConversionVO.SingleQuantity * objConversionVO.BaseConversionFactor;

                        objConversionVO.BaseRate = objConversionVO.MainRate;
                        objConversionVO.BaseMRP = objConversionVO.MainMRP;
                    }
                    else     // e.g. Tab to Strip  (Reverse flow 1 Tablet = How many Strip ? if CF = 10 then 1/10)
                    {
                        objConversionVO.MRP = objConversionVO.MainMRP * objConversionVO.CalculatedFromCF;
                        objConversionVO.Rate = objConversionVO.MainRate * objConversionVO.CalculatedFromCF;

                        objConversionVO.Quantity = objConversionVO.SingleQuantity * objConversionVO.CalculatedCF;
                        objConversionVO.BaseQuantity = SingleQuantity * objConversionVO.CalculatedFromCF;

                        objConversionVO.BaseRate = objConversionVO.MainRate;
                        objConversionVO.BaseMRP = objConversionVO.MainMRP;
                    }
                }
                else if (objConversionVO.CalculatedCF > 0 && FromUOMID === ToUOMID)  // e.g. (Selected Transaction UOM) Strip == Strip (Item Master Stock UOM) 
                {
                    if (objConversionVO.UOMConvertLIst.length > 0)
                    {  
                        var objConversionFromSame = {};  
                        var objConversionToSame = {};
                        var CalculatedFromCFSame = 0;
                        var CalculatedToCFSame = 0;
                        //var CalculatedCF;
                       

                        objConversionFromSame = objConversionVO.UOMConvertLIst.find(z => z.FromUOMID === FromUOMID && z.ToUOMID === BaseUOMID);
                        objConversionToSame = objConversionVO.UOMConvertLIst.find(z => z.FromUOMID === ToUOMID && z.ToUOMID === BaseUOMID);
                      
                        CalculatedFromCFSame = objConversionFromSame.ConversionFactor;
                        CalculatedToCFSame = objConversionToSame.ConversionFactor;

                        objConversionVO.CalculatedCF = CalculatedFromCFSame / CalculatedToCFSame;

                        objConversionVO.ConversionFactor = objConversionVO.CalculatedCF;
                        objConversionVO.BaseConversionFactor = CalculatedFromCFSame;

                        objConversionVO.MRP = objConversionVO.MainMRP * CalculatedFromCFSame;
                        objConversionVO.Rate = objConversionVO.MainRate * CalculatedFromCFSame;

                        objConversionVO.Quantity = objConversionVO.SingleQuantity * objConversionVO.CalculatedCF;
                        objConversionVO.BaseQuantity = objConversionVO.SingleQuantity * objConversionVO.BaseConversionFactor;

                        objConversionVO.BaseRate = objConversionVO.MainRate;
                        objConversionVO.BaseMRP = objConversionVO.MainMRP;

                    }
                }

            //return objConversionVO;

            $scope.ItemSaleDetailsList[Indx].PurchaseRate = objConversionVO.Rate;
             $scope.ItemSaleDetailsList[Indx].MRP = objConversionVO.MRP;

             // Quantity = objConversionVO.Quantity;
            $scope.ItemSaleDetailsList[Indx].Quantity = objConversionVO.SingleQuantity;
            // TotalQuantity =Convert.ToDouble(objConversionVO.Quantity);
            $scope.ItemSaleDetailsList[Indx].BaseQuantity = objConversionVO.BaseQuantity;

            $scope.ItemSaleDetailsList[Indx].BaseRate = objConversionVO.BaseRate;
            $scope.ItemSaleDetailsList[Indx].BaseMRP = objConversionVO.BaseMRP;

            $scope.ItemSaleDetailsList[Indx].ConversionFactor = parseFloat(objConversionVO.ConversionFactor).toFixed(2);
            $scope.ItemSaleDetailsList[Indx].BaseConversionFactor = objConversionVO.BaseConversionFactor;

             if($scope.ItemSaleDetailsList != undefined && $scope.ItemSaleDetailsList.length > 0)
             {     
             //$scope.CalAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
             $scope.CalAmount($scope.ItemSaleDetailsList[Indx],Indx);
             }
        }
   /*************************************************************************************************************/                  
         
 /*************************************************************************************************************/
 //RemoveItem
 $scope.RemoveItem=function(Item){
   debugger;
       for(var k = 0; k<$scope.ItemSaleDetailsList.length; k++){
        if($scope.ItemSaleDetailsList[k].ItemId == Item.ItemId)
            $scope.ItemSaleDetailsList.splice(k, 1);
        }
 }
 /*************************************************************************************************************/

$scope.AddItemsDetails=function(CounterSaleInfo)//, Ischeck
{
 debugger;

 //$scope.BatchItemList = $scope.BatchItemList; //ItemStock//batch
 //if(Ischeck == false){
 //    for(var k = 0; k<$scope.BatchItemList.length; k++){
 //       if($scope.BatchItemList.StoreID == CounterSaleInfo.StoreID)
 //           $scope.BatchItemList.splice(k, 1);
 //       }
 //}
 
 

 for(var i = 0; i<$scope.BatchItemList.length;i++){
   // for(var i = 0; i<$scope.ItemDetails.length;i++){
        if($scope.CounterSaleInfo.StoreID == $scope.BatchItemList[i].StoreID && $scope.BatchItemList[i].ItemID == $scope.ItemDetails.ID){
            if (true) {//Ischeck ==
   
    $scope.objISDetails = {};

    //$scope.ItemSaleDetailsList.push({  //commented

        $scope.objISDetails.ItemCode = $scope.ItemDetails.ItemCode;//ItemMaster
        $scope.objISDetails.ItemId = $scope.BatchItemList[i].ItemID;
        $scope.objISDetails.ItemName= $scope.ItemDetails.ItemName;//ItemMaster
        $scope.objISDetails.Manufacture= $scope.ItemDetails.Manufacture;//ItemMaster
        $scope.objISDetails.PreganancyClass= $scope.ItemDetails.PreganancyClass;//ItemMaster
        $scope.objISDetails.BatchId = $scope.BatchItemList[i].BatchID;
        $scope.objISDetails.BatchCode = $scope.BatchItemList[i].BatchCode;
        $scope.objISDetails.ExpiryDate = $scope.BatchItemList[i].ExpiryDate;
        $scope.objISDetails.Quantity = $scope.BatchItemList[i].Quantity;
        $scope.objISDetails.InclusiveOfTax = $scope.ItemDetails.InclusiveOfTax;

         $scope.objISDetails.OriginalMRP = $scope.ItemDetails.OriginalMRP;
        $scope.objISDetails.AvailableQuantity = $scope.BatchItemList[i].AvailableStock; // newly added
        //StockingQuantity:parseFloat($scope.BatchItemList[i].AvailableStock).toFixed(2), //commented   //AvailableQuantity//($scope.BatchItemList[i].AvailableStock)
        $scope.objISDetails.PurchaseRate = $scope.BatchItemList[i].PurchaseRate;
        //ConcessionPercentage: $scope.ItemDetails.DiscountOnSale, //commented
        $scope.objISDetails.ConcessionPercentage = $scope.BatchItemList[i].DiscountOnSale; // newly added
       // ConcessionAmount:0, //commented
        $scope.objISDetails.ConcessionAmount = $scope.objISDetails.ConcessionAmount; // newly added
        $scope.objISDetails.Amount = $scope.BatchItemList[i].Quantity * $scope.BatchItemList[i].MRP;
        //VATPercent : $scope.BatchItemList[i].SVatPer, //commented
       

        //Tax1Percentage: $scope.BatchItemList[i].Tax1Percentage, //commented
        $scope.objISDetails.Tax1Percentage = $scope.BatchItemList[i].Tax1Percentage;  // modified  //SaleTax1Percentage; 
        //Tax1TaxType:$scope.ItemDetails.PurTax1TaxType, //commented
        $scope.objISDetails.Tax1TaxType = $scope.ItemDetails.SaleTax1TaxType; // newly added
        //Tax1ApplicableOn:$scope.ItemDetails.PurTax1ApplicableOn, //commented
        $scope.objISDetails.Tax1ApplicableOn = $scope.ItemDetails.SaleTax1ApplicableOn; // newly added

        //Tax2Percentage: $scope.BatchItemList[i].Tax2Percentage, //commented
        $scope.objISDetails.Tax2Percentage = $scope.BatchItemList[i].Tax2Percentage;  // modified  // SaleTax2Percentage;
        //Tax2TaxType:$scope.ItemDetails.PurTax2TaxType, //commented
        $scope.objISDetails.Tax2TaxType = $scope.ItemDetails.SaleTax2TaxType; // newly added
        //Tax2ApplicableOn:$scope.ItemDetails.PurTax2ApplicableOn, //commented
        $scope.objISDetails.Tax2ApplicableOn = $scope.ItemDetails.SaleTax2ApplicableOn; // newly added

        //Tax3Percentage: $scope.BatchItemList[i].Tax3Percentage, //commented
        $scope.objISDetails.Tax3Percentage = $scope.BatchItemList[i].Tax3Percentage;  // modified  //SaleTax3Percentage; 
        //Tax3TaxType:$scope.ItemDetails.PurTax3TaxType, //commented
        $scope.objISDetails.Tax3TaxType = $scope.ItemDetails.SaleTax3TaxType; // newly added
        //Tax3ApplicableOn:$scope.ItemDetails.PurTax3ApplicableOn, //commented
        $scope.objISDetails.Tax3ApplicableOn = $scope.ItemDetails.SaleTax3ApplicableOn; // newly added

        $scope.objISDetails.MRP = $scope.BatchItemList[i].MRP;
        $scope.objISDetails.OriginalMRP = $scope.BatchItemList[i].MRP; // newly added
        $scope.objISDetails.ItemVatType = $scope.BatchItemList[i].SItemVatType;
        $scope.objISDetails.PurchaseRate = $scope.BatchItemList[i].PurchaseRate; // newly added
        $scope.objISDetails.NetAmount =  $scope.objISDetails.NetAmount; // newly added

        //Shelfname: $scope.BatchItemList[i].Shelf, //commented
         $scope.objISDetails.Shelfname = $scope.ItemDetails.Shelf; // newly added
        //Containername: $scope.BatchItemList[i].Container, //commented
         $scope.objISDetails.Containername = $scope.ItemDetails.Container; // newly added
        //Rackname: $scope.BatchItemList[i].Rack, //commented
         $scope.objISDetails.Rackname = $scope.ItemDetails.Rack; // newly added

         $scope.objISDetails.AvailableStockInBase = $scope.BatchItemList[i].AvailableStockInBase;

        //StockUOM: $scope.BatchItemList[i].SUOM, //commented
         $scope.objISDetails.StockUOM = $scope.ItemDetails.SUM; // modified
        //PurchaseUOM: $scope.BatchItemList[i].PUOM, //commented
        $scope.objISDetails.PurchaseUOM = $scope.ItemDetails.PUM; // modified
        //PUOM: $scope.BatchItemList[i].PUOM, //commented
        $scope.objISDetails.PUOM = $scope.ItemDetails.PUM; // modified
        //MainPUOM: $scope.BatchItemList[i].PUOM, //commented
         $scope.objISDetails.MainPUOM = $scope.ItemDetails.PUM;// modified
        //SUOM: $scope.BatchItemList[i].SUOM, //commented
         $scope.objISDetails.SUOM = $scope.ItemDetails.SUM; // modified
        
        
         $scope.objISDetails.ConversionFactor = $scope.ItemDetails.ConversionFactor;
         $scope.objISDetails.PUOMID = $scope.ItemDetails.PUMID;       //PUMID  $scope.BatchItemList[i].PUM,       //
        //StockUOMID: $scope.ItemDetails.SUMID, //commented       //SUMID  $scope.BatchItemList[i].SUM, SUOMID      //
        $scope.objISDetails.SUOMID = $scope.ItemDetails.SUMID; // modified
        $scope.objISDetails.BaseUOMID = $scope.ItemDetails.BaseUMID; //
        $scope.objISDetails.BaseUOM = $scope.ItemDetails.BaseUM; //
        $scope.objISDetails.SellingUOMID = $scope.ItemDetails.SellingUMID; //
        $scope.objISDetails.SellingUOM = $scope.ItemDetails.SellingUM; //
        //MainMRP: $scope.BatchItemList[i].MRP / $scope.ItemDetails.StockingCF, //commented
        $scope.objISDetails.MainMRP = $scope.BatchItemList[i].MRP; // modified
        //MainRate: $scope.BatchItemList[i].PurchaseRate / $scope.ItemDetails.StockingCF, //commented
        $scope.objISDetails.MainRate = $scope.BatchItemList[i].PurchaseRate; // modified
        $scope.objISDetails.RegisteredPatientsDiscount = $scope.ItemDetails.RegisteredPatientsDiscount;
        
        //SGSTAmount: $scope.ItemSaleDetailsList[indx].SGSTAmount,
        
        //CGSTAmount:$scope.Tax2Amount,
        
        //IGSTAmount: $scope.Tax3Amount,
        
        if($scope.IsSellBySellingUnit)
        {
             $scope.objISDetails.UOMList = $scope.ItemDetails.UOMList;
             
             $scope.objISDetails.ConversionFactor = ($scope.ItemDetails.SellingCF / $scope.ItemDetails.StockingCF).toFixed(2);
             $scope.objISDetails.BaseConversionFactor = $scope.ItemDetails.SellingCF;
             $scope.objISDetails.BaseQuantity =  $scope.BatchItemList[i].Quantity * $scope.ItemDetails.SellingCF;
             $scope.objISDetails.MainRate = $scope.BatchItemList[i].PurchaseRate / $scope.ItemDetails.StockingCF; // newly added
             $scope.objISDetails.BaseRate = $scope.BatchItemList[i].PurchaseRate / $scope.ItemDetails.StockingCF;
            //PurchaseRate: ($scope.BatchItemList[i].PurchaseRate / $scope.ItemDetails.StockingCF) * $scope.ItemDetails.SellingCF, //commented
             $scope.objISDetails.PurchaseRate = $scope.objISDetails.BaseRate * $scope.ItemDetails.SellingCF; // modified
             $scope.objISDetails.MainMRP = $scope.BatchItemList[i].MRP / $scope.ItemDetails.StockingCF; // newly added
             $scope.objISDetails.BaseMRP = $scope.BatchItemList[i].MRP / $scope.ItemDetails.StockingCF;
            // MRP:( $scope.BatchItemList[i].MRP / $scope.ItemDetails[i].StockingCF) * $scope.ItemDetails[i].SellingCF, //commented
             $scope.objISDetails.MRP = $scope.objISDetails.BaseMRP * $scope.ItemDetails.SellingCF; // modified
             $scope.objISDetails.PendingQuantity = $scope.objISDetails.BaseQuantity;   // newly added by yogitak 10 FEb 2021
            
        }
        
        $scope.objISDetails.MaterialCStoreID = $scope.CounterSaleInfo.StoreID;
        $scope.objISDetails.ISForMaterialConsumption = 0;
         //$scope.objISDetails.ActualNetAmt = 0;
        //FromUOMID:$scope.ItemDetails.UOMConversionList[i].FromUOMID,
        //ToUOMID:$scope.ItemDetails.UOMConversionList[i].ToUOMID,
        
         $scope.objISDetails.TotalAmount = $scope.BatchItemList[i].Quantity * $scope.objISDetails.MRP;
         $scope.objISDetails.SelectedUOMID = $scope.objISDetails.BaseUOMID;
        // $scope.ItemSaleDetailsList.SelectedUOMID = $scope.ItemDetails.UOMList.Description;
    //}); //commented

    $scope.ItemSaleDetailsList.push($scope.objISDetails);
    
   // $scope.ItemSaleDetailsList.ActualNetAmt= $scope.ItemSaleDetailsList.NetAmount ;
    $scope.ItemSaleDetailsList[i].SelectedUOMID;
     $scope.CalculateConversionFactorCentral($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
    // $scope.ItemDetails=[];
    // $scope.BatchItemList=[];

   
    debugger;
   // $scope.GetItemUOMConversionsByID(CounterSaleInfo);
    if($scope.ItemSaleDetailsList != undefined && $scope.ItemSaleDetailsList.length > 0)
    {     $scope.CalAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.calConcessionAmt($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.CalSGSTAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.CalCGSTAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.CalIGSTAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.CalNetAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.calConcessionAmt($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
    }
    //angular.element(modbatchinfo).modal('hide');
    //angular.element(itemsearch).focus()
    $scope.closebatchinformation();
   }
   }
  // }
   }
 }
   /***************************************************************************************************************/
  //For Calulation ConcessionAmt
 $scope.calConcessionAmt=function calConcessionAmt(ItemInfo,Indx)
 {
 debugger;
               
                    if (ItemInfo.ConcessionPercentage> 0 && ItemInfo.ConcessionPercentage != undefined)
                       {
                    if (ItemInfo.Tax1TaxType == 2 || ItemInfo.Tax2TaxType == 2 || ItemInfo.Tax3TaxType == 2)
                    {
                       $scope.ItemSaleDetailsList[Indx].ConcessionAmount  = ((ItemInfo.MRP / ((ItemInfo.Tax1Percentage + ItemInfo.Tax2Percentage + 100)) * 100) * (ItemInfo.ConcessionPercentage / 100) * ItemInfo.Quantity).toFixed(2);
                        //$scope.ItemSaleDetailsList[indx].ConcessionAmount = 0;
                    }
                    else
                    {
                         $scope.ItemSaleDetailsList[Indx].ConcessionAmount  = ((ItemInfo.MRP / ((ItemInfo.Tax1Percentage + ItemInfo.Tax2Percentage + 100)) * 100) * (ItemInfo.ConcessionPercentage / 100) * ItemInfo.Quantity).toFixed(2);
                       
                    }
                }
                else
                {
                     $scope.ItemSaleDetailsList[Indx].ConcessionAmount = 0;
                     //$scope.ConcessionAmount = Math.Round($scope.ConcessionAmount, 2);
                     //return  $scope.ConcessionAmount;
                }
 }

  /***************************************************************************************************************/
  //For Calulation SGSTAmount
 $scope.CalSGSTAmount =function CalSGSTAmount(ItemInfo,Indx)
 { $scope.AbatedAmt=0;
 debugger;

 if (ItemInfo.Tax1Percentage > 0 || ItemInfo.Tax1Percentage == undefined)
                {
                    if (ItemInfo.Tax1TaxType == 2)
                    {
                        $scope.ItemSaleDetailsList[Indx].Tax1Amount = ((ItemInfo.Amount) * ItemInfo.Tax1Percentage / 100);
                    }
                    else
                    {
                        if (ItemInfo.ConcessionPercentage > 0 || ItemInfo.ConcessionPercentage == undefined)
                        {

                            //if (_PackageID == 0)   
                            //{
                                $scope.AbatedAmt = (ItemInfo.Quantity * ItemInfo.MRP)  / (ItemInfo.Tax1Percentage + ItemInfo.Tax2Percentage + 100) * 100;
                                return $scope.ItemSaleDetailsList[Indx].Tax1Amount = (($scope.AbatedAmt  - ItemInfo.ConcessionAmount) * (ItemInfo.Tax1Percentage  / 100)).toFixed(2);
                            //}
                            //else
                            //    return _SGSTAmount = 0;
                        }
                        else
                        {
                            $scope.AbatedAmt = (ItemInfo.Quantity * ItemInfo.MRP)  / (ItemInfo.Tax1Percentage + ItemInfo.Tax2Percentage + 100) * 100;
                                return $scope.ItemSaleDetailsList[Indx].Tax1Amount = (($scope.AbatedAmt  - ItemInfo.ConcessionAmount) * (ItemInfo.Tax1Percentage  / 100)).toFixed(2);
                        }
                   }
                }
                else
                {
                    return $scope.ItemSaleDetailsList[Indx].Tax1Amount  = 0;
                }
 }
  /***************************************************************************************************************/
  //For Calulation CGSTAmount
 $scope.CalCGSTAmount =function CalCGSTAmount(ItemInfo,Indx)
 {$scope.AbatedAmt=0;
 debugger;
 if (ItemInfo.Tax2Percentage > 0 || ItemInfo.Tax2Percentage == undefined)
                {
                    if (ItemInfo.Tax2TaxType == 2)
                    {
                        $scope.ItemSaleDetailsList[Indx].Tax2Amount = ((ItemInfo.Amount) * ItemInfo.Tax2Percentage / 100);
                    }
                    else
                    {
                        if (ItemInfo.ConcessionPercentage > 0 || ItemInfo.ConcessionPercentage == undefined)
                        {

                            //if (_PackageID == 0)   
                            //{
                                $scope.AbatedAmt = (ItemInfo.Quantity * ItemInfo.MRP)  / (ItemInfo.Tax1Percentage + ItemInfo.Tax2Percentage + 100) * 100;
                                return $scope.ItemSaleDetailsList[Indx].Tax2Amount = (($scope.AbatedAmt  - ItemInfo.ConcessionAmount) * (ItemInfo.Tax2Percentage  / 100)).toFixed(2);
                            //}
                            //else
                            //    return _SGSTAmount = 0;
                        }
                        else
                        {
                            $scope.AbatedAmt = (ItemInfo.Quantity * ItemInfo.MRP)  / (ItemInfo.Tax1Percentage + ItemInfo.Tax2Percentage + 100) * 100;
                                return $scope.ItemSaleDetailsList[Indx].Tax2Amount = (($scope.AbatedAmt  - ItemInfo.ConcessionAmount) * (ItemInfo.Tax2Percentage  / 100)).toFixed(2);
                        }
                    }
                }
                else
                {
                    return $scope.ItemSaleDetailsList[Indx].Tax2Amount  = 0;
                }
}
/***************************************************************************************************************/
 // for Calulation IGSTAmount
$scope.CalIGSTAmount =function CalIGSTAmount(ItemInfo,Indx)
 { 
 debugger;
  if (ItemInfo.Tax3Percentage > 0 || ItemInfo.Tax3Percentage == undefined)
                {
                    if (ItemInfo.Tax3TaxType == 2)
                    {
                       return $scope.ItemSaleDetailsList[Indx].Tax3Amount = ((ItemInfo.Amount) * ItemInfo.Tax3Percentage / 100);
                    }
                    else
                    {
                        if (ItemInfo.ConcessionPercentage > 0 || ItemInfo.ConcessionPercentage == undefined)
                        { 
                            return $scope.ItemSaleDetailsList[Indx].Tax3Amount = ((ItemInfo.MRP * ItemInfo.Quantity ) - ((((ItemInfo.MRP / (100 + (ItemInfo.Tax3Percentage))) * 100)) * ItemInfo.Quantity));
                        }
                        else
                        {
                            return $scope.ItemSaleDetailsList[Indx].Tax3Amount = ((ItemInfo.MRP * ItemInfo.Quantity) - ((((ItemInfo.MRP / (100 + (ItemInfo.Tax3Percentage))) * 100)) * ItemInfo.Quantity));
                        }
                    }
                }
                else
                {
                    return $scope.ItemSaleDetailsList[Indx].Tax3Amount  = 0;
                }
 }
   /***************************************************************************************************************/
  //For Calulation NetAmount

 
$scope.CalNetAmount= function CalNetAmount( ItemInfo,Indx)
 { 
    debugger;
    $scope.BP=0;
   $scope.DBP=0;
   $scope.GST =0;

//if (_ItemVatType == 2)
                //{
                 //   _NetAmount = _Amount - _ConcessionAmount + _VATAmount;
             //   }
                //else
               // {
                    if (ItemInfo.ConcessionPercentage > 0 )
                    {
                       

                        //double BP = 0;
                       //if (_PackageID == 0)
                            $scope.BP = parseFloat(((ItemInfo.MRP / (100 + (ItemInfo.Tax1Percentage + ItemInfo.Tax2Percentage)) * 100) * ItemInfo.Quantity )).toFixed(2);
                       // else
                         // $scope.BP= ((ItemInfo.MRP) *  ItemInfo.Quantity);
                        $scope.DBP =parseFloat(ItemInfo.ConcessionAmount);
                       // double VA = _VATAmount;
                       $scope.GST = parseFloat(ItemInfo.Tax1Amount) + parseFloat(ItemInfo.Tax2Amount);
                       $scope.ItemSaleDetailsList[Indx].NetAmount = ($scope.BP - $scope.DBP + $scope.GST).toFixed(2);
                        $scope.TotalAmt();
                    }
                    else
                    {

                        $scope.BP =(((ItemInfo.MRP / (100 + (ItemInfo.Tax1Percentage + ItemInfo.Tax2Percentage)) * 100) * ItemInfo.Quantity )).toFixed(2);
                        $scope.DBP = (ItemInfo.ConcessionAmount);
                        //$scope.DBP =  0;
                        //double VA = _VATAmount;
                        $scope.GST = parseFloat(ItemInfo.Tax1Amount) + parseFloat(ItemInfo.Tax2Amount);
                        $scope.ItemSaleDetailsList[Indx].NetAmount = ($scope.BP - $scope.DBP  + $scope.GST).toFixed(2);
                        $scope.TotalAmt();
                       
                    }
              // }
                if ($scope.ItemSaleDetailsList[Indx].NetAmount > 0)
                    return ($scope.ItemSaleDetailsList[Indx].NetAmount);
                    
                else
                    return $scope.ItemSaleDetailsList[Indx].NetAmount = 0;
                     
}
/***************************************************************************************************************/
$scope.CalAmount= function CalAmount( ItemInfo,Indx)
{    debugger;
    if(ItemInfo.Quantity > 0)
        {    
            $scope.ItemSaleDetailsList[Indx].Amount=ItemInfo.Quantity * ItemInfo.MRP;
            //if(ItemInfo.BaseQuantity > 0)
            //    {
            //        $scope.ItemSaleDetailsList[Indx].Amount=ItemInfo.BaseQuantity * ItemInfo.MRP;
            //    } 
            //else 
            //    {
            //        $scope.ItemSaleDetailsList[Indx].Amount=0;
            //    }
        }
     else
        {
          $scope.ItemSaleDetailsList[Indx].Amount=0;  
        }


 debugger;
    if($scope.ItemSaleDetailsList[Indx].Amount != undefined && $scope.ItemSaleDetailsList[Indx].Amount > 0)
    {  
        // $scope.CalculateConversionFactorCentral($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.calConcessionAmt($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.CalSGSTAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.CalCGSTAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.CalIGSTAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
        //$scope.CalNetAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
       
        $scope.calConcessionAmt($scope.ItemSaleDetailsList[Indx],Indx);
        $scope.CalSGSTAmount($scope.ItemSaleDetailsList[Indx],Indx);
        $scope.CalCGSTAmount($scope.ItemSaleDetailsList[Indx],Indx);
        $scope.CalIGSTAmount($scope.ItemSaleDetailsList[Indx],Indx);
        $scope.CalNetAmount($scope.ItemSaleDetailsList[Indx],Indx);
       
        }
      
     
        
}
/***************************************************************************************************************/
  $scope.ValidateBill = function () {
        debugger;
       
          $scope.isValid = true;
          //$scope.isValid1 = true;
        
         if($scope.ItemSaleDetailsList.length > 0){
            //{ foreach (var item in ItemSaleDetailsList){
                for (let i = 0; i < $scope.ItemSaleDetailsList.length; i++) 
                    {
                        if ($scope.ItemSaleDetailsList[i].Quantity == 0)
                        {
                            $scope.isValid = false;
                          AlertMessage.warning("PalashIVF", " Quantity In The List Can't Be Zero. Please Enter Quantity Greater Than Zero");
                             ClickedFlag = 0;
                            return false;
                        }
                        else{
                        
                                if ($scope.ItemSaleDetailsList[i].BaseQuantity >$scope.ItemSaleDetailsList[i].AvailableStockInBase)//item.Quantity > item.StockingQuantity
                                {
                                     $scope.isValid = false;
                                    AlertMessage.warning("PalashIVF","Available Quantity For " + $scope.ItemSaleDetailsList[i].ItemName + " Is " + $scope.ItemSaleDetailsList[i].StockingQuantity);


                                    return false;
                                 }
                                else if ($scope.ItemSaleDetailsList[i].SelectedUOMID == 0 || $scope.ItemSaleDetailsList[i].SelectedUOMID == null)
                                 {
                                     $scope.isValid = false;
                                    // $scope.style = "border-color:red";
                                    angular.element(ddlUOM).focus();
                                    AlertMessage.warning("PalashIVF","Please Select UOM For Item " + $scope.ItemSaleDetailsList[i].ItemName);


                                    return false;
                                 }
                            }
                    }
                }
            else
                {    $scope.isValid = false;
                     AlertMessage.warning("PalashIVF", "You can not save the Bill without Items");
                    //AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);
                    return false;
                }



           if(angular.element(TotalNetAmount).val() == ""  || angular.element(TotalNetAmount).val() == 0){
            $scope.isValid = false; 
            AlertMessage.warning( "PalashIVF", "You Can Not Save The Bill With Zero Amount");
               
            }
            $scope.isValid=ChkValidation();
            if ($scope.isValid==true) {
                $scope.isValid=false;
                return true;
                
            }
 }
 
/***************************************************************************************************************/
function ChkValidation(){
debugger;
    if(angular.element(ReferenceDoctor).val()==""){
        angular.element(ReferenceDoctor).focus();
        AlertMessage.warning( "PalashIVF", "Please first select Reference Doctor");
        return false;
        
    }
    else if($("#newradio").is(":checked")){
        if(angular.element(FirstName).val()==""){
            angular.element(FirstName).focus();
            AlertMessage.warning( "PalashIVF", "Please Enter First Name");
            return false;
        }
        else if (angular.element(age).val()=="" || angular.element(age).val()== 0 || angular.element(age).val()>120){
            angular.element(age).focus();
            AlertMessage.warning( "PalashIVF", "Age Required, Age Can Not Be Greater Than 121");
            return false;
        }
        else if ($scope.PatientData.GenderID == 0 ){
            angular.element(gender).focus();
            AlertMessage.warning( "PalashIVF", "Gender Is Required");
            return false;
        }
        else if (angular.element(mobilenumber).val()=="" || angular.element(mobilenumber).val().length<10){
            angular.element(mobilenumber).focus();
            AlertMessage.warning( "PalashIVF", "Please enter correct 10 digit mobile number");
            return false;
        }
        else{
        return true;
        }
        
    }
    else if($("#existingradio").is(":checked")){
        if($scope.PatientData.PatientFullName==undefined){
            angular.element(PatientSearchBox).focus();
            AlertMessage.warning( "PalashIVF", "Please first select existing patient");
            return false;
        }
        else{
        return true;
        }
    
    }
    

}
/***************************************************************************************************************/
$scope.IsExistingPatient = function IsExistingPatient() {
  debugger;
  var objPatientExist = {};
    $scope.isExisting = 0;
   objPatientExist.FirstName= angular.element(FirstName).val();
    objPatientExist.LastName= angular.element(LastName).val();
     objPatientExist.Gender= $scope.PatientData.GenderID;
     objPatientExist.DateOfBirth=  angular.element(txtDate1).val();
     objPatientExist.MobCountryCode= angular.element(MobileCountryCode).val();
     objPatientExist.MobileNo= angular.element(mobilenumber).val();

  var responseData = NewRegistrationService.CheckExistingPatientDuplicacy(objPatientExist);
        responseData.then(function (Response) { 
        debugger;
       // $scope.MobileDetails = Response.data;
       $scope.isExisting = Response.data;

        if (Response.data == 1) {
                  AlertMessage.warning( "PalashIVF", "Patient already exists, Are you sure you want to Continue ?");
                //return false;
             }
         else if (Response.data == 2){
                AlertMessage.warning( "PalashIVF", "Patient already exists, Are you sure you want to Continue ?");
                //return false;
             }
         else if (Response.data == 3){
                AlertMessage.warning( "PalashIVF", "Patient already exists, Are you sure you want to Continue ?");
                //return false;
             }
          else if (Response.data == 4){
                AlertMessage.warning( "PalashIVF", "Patient already exists, Are you sure you want to Continue ?");
                //return false;
             }
           else {
                 
                    if ($scope.isExisting == 0 )
                    {  $scope.FreezeBill(true);
                       // $scope.SavePatientRecord();
                       // AlertMessage.warning( "PalashIVF", "test");
                    }
            }     
         
        
             
       
        }, function (error) {
            AlertMessage.error('PalashIVF', 'Error occured.');
        });
        //$scope.CounterSaleInfo.SelectedItem = null;
  }
  /***************************/
   $scope.SaveCountersaleBill=function SaveCountersaleBill()
  {
    debugger;
    if ( $scope.ValidateBill())
    {      if($("#newradio").is(":checked"))
                {
          
            $scope.IsExistingPatient();
               }
            else

              { 
            $scope.FreezeBill(true);
              }
       
    }
  
  }
/***************************************************************************************************************/
$scope.SavePatientRecord = function SavePatientRecord () {   
   // debugger;
            
       //  if ( $scope.ValidateBill() && $scope.IsExistingPatient() ) { 
          $scope.PatientData.PatientCategoryID = 11;    // 11 : indivisual patient
          $scope.PatientData.RegFrom = 2; // 2 : Register from Counter Sale
         debugger; 
          var patient = $scope.PatientData;
          var BillDetails = $scope.BillDetails;
          BillDetails.lstPatient.length = 0;
          $scope.PatientData.Ispatient = true;
        
         BillDetails.objPatientRegistration ={};
         BillDetails.objPatientRegistration.lstPatient=[];
         BillDetails.objPatientRegistration.lstAddress=[];
        BillDetails.objPatientRegistration.lstPatient.push(patient);
        /*************************************/
        //$scope.selectedPatient == undefined && $scope.selectedPatient.VisitID
        if( $scope.PatientData.VisitID == 0 || $scope.PatientData.VisitID == undefined)
         {
            BillDetails.objPatientVisit ={};
            //$scope.BillDetails.objPatientVisit.lstSponserForSave = [];
            //$scope. BillDetails.objPatientVisit.lstPatientForSave = [];
         
            BillDetails.objPatientVisit.VTID= 7;     //$scope.PatientData.VTID=                 // 7 : Pharmacy Visits Type ID
            //BillDetails.objPatientVisit.DeptID=13;   //$scope.PatientData.DeptID=             //commented as its Pharmacy Visit
            //BillDetails.objPatientVisit.DOCID=$scope.PatientData.ReferredDoctorID;            //commented as its Pharmacy Visit
            BillDetails.objPatientVisit.ReferredDoctorID=$scope.PatientData.ReferredDoctorID;   //modified to maintain Referred Doctor against pharmacy visit
            BillDetails.objPatientVisit.VisitDate= new Date();
            BillDetails.objPatientVisit.VisitTime=new Date();
            //BillDetails.objPatientVisit.RegID=$scope.PatientData.RegID;
            //BillDetails.objPatientVisit.RegUnitID=$scope.PatientData.RegUnitID;
       
            BillDetails.objPatientVisit.lstSponserForSave = $scope.lstSponserForSave;
            BillDetails.objPatientVisit.lstPatientForSave = $scope.lstPatientForSave;
        }

          BillDetails.objItemSalesVO={};
          $scope.TotalAmt();
        $scope.BillDetails.objItemSalesVO.IsBilled=1;
       $scope.BillDetails.objItemSalesVO.ReferenceDoctorID=$scope.PatientData.ReferredDoctorID;
       $scope.BillDetails.objItemSalesVO.StoreID=$scope.CounterSaleInfo.StoreID;
       $scope.BillDetails.objItemSalesVO.Remarks=$scope.CounterSaleInfo.Remarks;
        $scope.BillDetails.objItemSalesVO.TotalAmount= $scope.BillDetails.TotalBillAmount;
        $scope.BillDetails.objItemSalesVO.NetAmount=$scope.BillDetails.NetBillAmount;
        $scope.BillDetails.objItemSalesVO.ConcessionAmount = $scope.BillDetails.TotalConcessionAmount;
        // $scope.BillDetails.objItemSalesVO.ConcessionPercentage = $scope.BillDetails.ConcessionPercentage;
     
       BillDetails.ItemSaleDetailsList={};
      $scope.BillDetails.ItemSaleDetailsList=$scope.ItemSaleDetailsList;
      //IsFreeze == 1;
      //           $scope.BillDetails.IsFreezed = IsFreeze;
      BillDetails.objItemStockVO={};
    $scope.BillDetails.objItemStockVO=$scope.objItemStockVO;
    $scope.BillDetails.objItemStockVO.PurchaseRate=0;
    $scope.BillDetails.objItemStockVO.MRP=0;
    $scope.BillDetails.objItemStockVO.TransactionTypeID = 7;
    $scope.BillDetails.objItemStockVO.OperationType =2;

     $scope.BillDetails.CompanyID= 1;
     $scope.BillDetails.PatientSourceID= 1;
     //$scope.BillDetails.CompanyID= 1;             //commented in review
     $scope.BillDetails.TariffID = 1;
     //$scope.BillDetails.PatientCategoryID = 11;   //commented in review
     $scope.BillDetails.PatientCategoryID = 1;      //modified in review
     $scope.BillDetails.VisitID = $scope.PatientData.VisitID;
     $scope.BillDetails.VisitUnitID =$scope.PatientData.VisitUnitID;

     //$scope.BillDetails.CalculatedNetBillAmount=$scope.BillDetails.NetBillAmount;
    // $scope.BillDetails.SelfAmount=$scope.BillDetails.NetBillAmount;
     $scope.BillDetails.NetBillAmount=Math.round($scope.BillDetails.NetBillAmount);
    // $scope.BillDetails.PurchaseRate=$scope.BillDetails.NetBillAmount;
     //$scope.BillDetails.SelfAmount=$scope.BillDetails.NetBillAmount;
     
    
      if($scope.ValidateBill1()){
       for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                            if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.BillDetails.NetBillAmount) {
                                $scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;
                            }
                            else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
                                // $scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount;
                                $scope.BillDetails.Payment.BillBalanceAmount = 0
                            }
                                //else AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                            else AlertMessage.info(objResource.msgTitle, objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020

                            $scope.BillDetails.Payment.push({
                                'BillAmount': $scope.BillDetails.NetBillAmount,
                                'BillBalanceAmount': $scope.BillDetails.NetBillAmount - $scope.Total                    //$scope.BillDetails.Payment.BillBalanceAmount
                            });
                            // $scope.IsSettleBill[i] = false;
                            $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.Payment[0].BillBalanceAmount;
                        }
                        if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
                            $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.NetBillAmount;
                            //$scope.IsSettleBill = true;
                        }

                        

            var ResponseData = CounterSaleSrv.SaveCounterSaleBill($scope.BillDetails);  // , OldDataValuepatient commented by sujata
                    ResponseData.then(function (Response) {
                        debugger;

                           $scope.BillList = Response.data;
                        if ($scope.BillList != undefined)  {
                           
                            AlertMessage.success('PalashIVF', 'Bill Save successfully.');
                             if ($scope.BillDetails.IsFreezed) {
                              

                                    $scope.IsTempBillID = true;
                                   // $scope.TempBillID = resp.data;
                                    $scope.PrintNewBill();
                                }
                            usSpinnerService.stop('GridSpinner');
                                $location.path("/Queue");//BillList
                             }
                    });

                 

                     }
                     // }
                      }
/***************************************************************************************************************/
$scope.$watch('PatientData.Age', function (newValue) {
        debugger;       
        //$scope.IsFromPatientDOB = false;
        if (angular.isString(newValue)) {
            if ($scope.isView) {               
                var birthDate = moment().subtract(newValue, 'years');
                $scope.PatientData.DateOfBirth = birthDate.format("YYYY-MM-DD");
            }
            else {                
                var birthDate = moment().subtract(newValue, 'years');
               $scope.PatientData.DateOfBirth = birthDate.format("YYYY-MM-DD");
            }
        }
        if ($scope.PatientData.Age > 0 && $scope.PatientData.DateOfBirth != null) {
            angular.element(txtDate1).prop('disabled', false);
            //if ($scope.IsFromPatientDOB == false)
            //angular.element(txtDate).prop('value', $scope.patient.DateOfBirth);
            $scope.birthDate = moment().subtract(newValue, 'years');
            $scope.PatientData.DateOfBirth = birthDate.format("YYYY-MM-DD");
            angular.element(txtDate1).prop('value', $scope.PatientData.DateOfBirth);
           
        }
    });
/***************************************************************************************************************/

 function isNumberKey(evt, obj) {
    debugger;
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
 }
    
    $scope.cancelView = function () {
           Common.clearID();
           //$rootScope.IsAppointment = false;
           //$rootScope.APPID = null;
           $location.path('/CounterSale/');
       }


// $scope.ItemDetails = $scope.ItemDetails; //ItemMaster
// for(var i = 0; i<$scope.ItemDetails.length;i++){
//  $scope.ItemSaleDetails.push({

//  ItemCode: $scope.ItemDetails[i].ItemCode,
//  ItemName: $scope.ItemDetails[i].ItemName,
//  Manufacture: $scope.ItemDetails[i].Manufacture,
//  PreganancyClass: $scope.ItemDetails[i].PreganancyClass,
//  InclusiveOfTax: $scope.ItemDetails[i].InclusiveOfTax,
//  ConcessionPercentage: $scope.ItemDetails[i].DiscountOnSale,
//  ConversionFactor: $scope.ItemDetails[i].ConversionFactor,
//  PUOMID: $scope.ItemDetails[i].PUM,//PUMID
//  SUOMID: $scope.ItemDetails[i].SUM,//SUMID
//  BaseUOMID: $scope.ItemDetails[i].BaseUMID,
//  BaseUOM: $scope.ItemDetails[i].BaseUM,
//  SellingUOMID: $scope.ItemDetails[i].SellingUMID,
//  SellingUOM: $scope.ItemDetails[i].SellingUM
  
//});
// }
// var ItemSaleDetails =  $scope.ItemSaleDetails;
//  var ItemSaleDetailsList =  $scope.ItemSaleDetailsList;
// // $scope.ItemSaleDetailsList= $scope.BillDetails.ItemSaleDetails;
//  $scope.MergeList(ItemSaleDetails,ItemSaleDetailsList);
//}
// $scope.MergeList = function(ItemSaleDetails,ItemSaleDetailsList){
// debugger;
//    return ItemSaleDetails.concat(ItemSaleDetailsList);
//    $scope.MergeList=$scope.MergeList;
//}
/******************************************************************************************************************/
// For payment mode
 //$scope.BillDetails.OtherSrvPaymentModeList = [
 //                    {
 //                        PaymentModeID: 0,
 //                        PaidAmount: parseInt(0),
 //                        Amount: parseInt(0),
 //                        TransactionNo: undefined,
 //                        BankID: 0,
 //                        PaymentDate: undefined,
 //                        CashMode: true,
 //                        DisableAmount: true
 //                    }
 // ];

//$scope.$watch('CounterSaleInfo.Amount', function (newValue) {
//      debugger;

//       $scope.BillDetails.OtherSrvPaymentModeList = [
//                          {
//                              PaymentModeID: 0,
//                              PaidAmount: parseInt($scope.CounterSaleInfo.Amount),
//                              Amount: parseInt($scope.CounterSaleInfo.Amount),
//                              TransactionNo: undefined,
//                              BankID: 0,
//                              PaymentDate: undefined,
//                              CashMode: true,
//                              DisableAmount: true
//                          }
//      ];

//  });

$scope.ChangeModeOfPayment = function (Index) {  //item
        debugger;        

            if ( $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 0) {    //Select
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].TransactionNo = '';
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentDate = '';
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = true;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = true;
            }

            else if ( $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 1) { //cash
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].TransactionNo = '';
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentDate = '';
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = true;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsBankIDNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsDateIDNotFill = false;
                $scope.IsPaymentModeID = false;
                $scope.IsAmountNotFill = false;
                $scope.IsNumberNotFill = false;
                $scope.IsBankIDNotFill = false;
                $scope.IsDateIDNotFill = false;
                $scope.disableClickNewBill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
            }
            else if ( $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 2) {   //Cheque
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].TransactionNo = '';
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentDate = '';
                angular.element(txtTransNo).attr('maxlength', 20);
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsBankIDNotFill = false;
                $scope.IsPaymentModeID = false;
                $scope.disableClickNewBill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
            }
            else if ( $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 4) {   //Card
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].TransactionNo = '';
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentDate = '';
                angular.element(txtTransNo).attr('maxlength', 20);
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsBankIDNotFill = false;
                $scope.IsPaymentModeID = false;
                $scope.disableClickNewBill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
            }
            else if ( $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 10) {   //Online
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].TransactionNo = '';
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentDate = '';
                angular.element(txtTransNo).attr('maxlength', 20);
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsBankIDNotFill = false;
                $scope.IsPaymentModeID = false;
                $scope.disableClickNewBill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
            }
            else {
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false; 
                }
    }
     
/******************************************************************************************************************/
 $scope.AddPaymentRow = function () { 
        debugger;
        $scope.sum = 0
        for (var i = 0; i <   $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
            $scope.sum = parseFloat($scope.sum) + parseFloat(  $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount);
        }
        for (var i = 0; i <  $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
     
            //if ($scope.sum < parseInt($scope.CounterSaleInfo.Amount)) {  
            if ($scope.sum < parseInt($scope.BillDetails.NetBillAmount)) {
            
                 $scope.BillDetails.OtherSrvPaymentModeList.push({
                                PaymentModeID: 0,
                                //PaidAmount: parseInt($scope.CounterSaleInfo.Amount - $scope.sum),
                                //Amount: parseInt($scope.CounterSaleInfo.Amount),
                                PaidAmount: parseInt($scope.BillDetails.NetBillAmount - $scope.sum),
                                Amount: parseInt($scope.BillDetails.NetBillAmount),
                                TransactionNo: undefined,
                                BankID: 0,
                                PaymentDate: undefined,
                                CashMode: true,
                                DisableAmount : true
                });
                break;

            }
             else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
                $scope.IsDisableRow = true;
                break;
            }
            else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount > $scope.BillDetails.NetBillAmount) {
                
                AlertMessage.info(objResource.msgTitle, objResource.msgAmountexceeded); 
                $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount = $scope.BillDetails.NetBillAmount;
            }
         }
     }
    
    /********************************************************************************************************************************/
     $scope.TotalAmt = function () {
        debugger;
        $scope.TotalBaseRate();
     
    }
     $scope.TotalBaseRate = function () {
        debugger;
        //console.log($scope.model[0].qty);
        var total = 0;
         var TaxAmounttotal=0;
        // $scope.disableClickNewBill = false;
        angular.forEach($scope.ItemSaleDetailsList, function (i, index) {
            if (i.NetAmount == '' ||  i.NetAmount == undefined)           //    i.BaseServiceRate == 0 ||
            {
               
                i.NetAmount = 0;
            }
            else if (i.NetAmount == 0) {
               
                i.NetAmount = 0;
            }
            else {
            total = 0;
            
           //total += (i.MRP * i.Quantity); //Commented in review
           total += (i.Amount);             //modified as Amount = MRP * Quantity
          TaxAmounttotal += ( parseFloat(i.Tax1Amount) +  parseFloat(i.Tax2Amount) +  parseFloat(i.Tax3Amount));
             
            i.IsNotFillBaseServiceRate = false;
            $scope.disableClickNewBill = false;
        }
        })
        console.log(total);
        $scope.BillDetails.TotalBillAmount = total;
        $scope.BillDetails.objItemSalesVO.TaxAmount=TaxAmounttotal;
       
        $scope.TotalConcession();

    }

     $scope.TotalConcession = function () {
        debugger;
        var total = 0;
         var TaxAmounttotal=0;
        angular.forEach($scope.ItemSaleDetailsList, function (i, index) {
            total += parseFloat(i.ConcessionAmount);      // i.ConcessionPercentage);
        })
        //console.log(total);
        $scope.BillDetails.TotalConcessionAmount = (total).toFixed(2);
        // $scope.BillDetails.objItemSalesVO.ConcessionAmount=(total).toFixed(2);
        $scope.TotalPayable();
    }
     $scope.TotalPayable = function () {
        debugger;
        var total = 0;
         //var TaxAmounttotal=0;
        angular.forEach($scope.ItemSaleDetailsList, function (i, index) {
            total += parseFloat(i.NetAmount);
        })
        //console.log(total);
         $scope.BillDetails.CalculatedNetBillAmount=total;
        $scope.BillDetails.SelfAmount=total;
        $scope.BillDetails.NetBillAmount = Math.round(total);  //.toFixed(2);
        //$scope.BillDetails.NetBillAmount = Math.round(total);
        $scope.CalTotalBillAmt();
        //$scope.Showpaidamount();
    }
    $scope.CalTotalBillAmt = function(){
        debugger;
        var total = 0;
        var TaxAmounttotal=0;
        angular.forEach($scope.ItemSaleDetailsList, function (i, index) {
          
           //total +=((i.MRP *i.Quantity)+i.SGSTAmount+i.CGSTAmount);
             total += (i.MRP * i.Quantity);
             TaxAmounttotal += ( parseFloat(i.Tax1Amount) +  parseFloat(i.Tax2Amount) +  parseFloat(i.Tax3Amount));
        })
        //console.log(total);
        $scope.BillDetails.TotalBillAmount = total;
        $scope.BillDetails.objItemSalesVO.TaxAmount=TaxAmounttotal;
   }
    /********************************************************************************************************************************/
    $scope.ValidateBill1 = function () {
        debugger;

        $scope.Total = 0;
        $scope.IsAmount = true;
        for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
            $scope.Total = parseFloat($scope.Total) + parseFloat($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount);
            if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID != 0) {
                if (!isNaN($scope.Total)) {
                    if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount > $scope.BillDetails.NetBillAmount) {
                        $scope.PaymentIndex = i;
                    }
                    if ($scope.Total > $scope.BillDetails.NetBillAmount) {
                        $scope.IsOutOfRange = true;
                        $scope.PaymentIndex = i;
                        $scope.IsExceed = true;
                        return false;
                    }
                    else {
                        $scope.IsOutOfRange = false;
                    }
                }
                else {
                    $scope.IsAmount = false;
                    return false;
                }
            }
            else {
                $scope.PaymentModeID = true;
            }
            //else {
            //    $scope.Total = parseFloat($scope.Total) + parseFloat($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount);
            //}
        }

        for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {     

            //$scope.BillDetails.OtherSrvPaymentModeList1 = $filter('filter')($scope.BillDetails.OtherSrvPaymentModeList, function (d) { return d.PaymentModeID == undefined || d.PaymentModeID == 0 });          // d.Days == undefined ||    added by Nayan Kamble on 17/12/2019

            var OtherSrvPaymentModeList1 = [];
             OtherSrvPaymentModeList1 = $filter('filter')($scope.BillDetails.OtherSrvPaymentModeList, function (d) { return d.PaymentModeID == undefined || d.PaymentModeID == 0 });          // d.Days == undefined ||    added by Nayan Kamble on 17/12/2019
            if (OtherSrvPaymentModeList1.length > 0) {
                angular.forEach(OtherSrvPaymentModeList1, function (item) {
                    item.IsPaymentModeID = true;
                    $scope.IsPaymentModeID = true;
                     AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                    //AlertMessage.warning(objResource.msgTitle.objResource.msgPleasefillmandatoryfields); //Modified by swatih for localization 22/7/2020
                })
                return false;
            }

            if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID == 0 ){            
            }
            //else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID != 1) {     // Cheque,Card,Online




            for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                //if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID != 1) {  //Commented and Modified by AniketK on 06Oct2020
                if ($scope.BillDetails.OtherSrvPaymentModeList[i].CashMode != true) {


                    var TempLst = [];
                    TempLst.push($scope.BillDetails.OtherSrvPaymentModeList[i]);



                    var Amount = [];
                    Amount = $filter('filter')(TempLst, function (d) { return d.PaidAmount == undefined || d.PaidAmount == '' });               //d.PaidAmount == 0 || 
                    //($scope.BillDetails.OtherSrvPaymentModeList, function (d) { return d.PaidAmount == undefined || d.PaidAmount == 0 || d.PaidAmount == '' });
                    if (Amount.length > 0) {
                        angular.forEach(Amount, function (item) {
                            item.IsAmountNotFill = true;
                            $scope.IsAmountNotFill = true;
                            AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                            //AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillmandatoryfields); //Modified by swatih for localization 22/7/2020
                        })
                        // return false;
                    }
                    var Number = [];
                    Number = $filter('filter')(TempLst, function (d) { return d.Number == undefined || d.Number == 0 || d.Number == '' });
                    //($scope.BillDetails.OtherSrvPaymentModeList, function (d) { return d.Number == undefined || d.Number == 0 || d.Number == '' });
                    if (Number.length > 0) {
                        angular.forEach(Number, function (item) {
                            item.IsNumberNotFill = true;
                            $scope.IsNumberNotFill = true;
                            AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                           // AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillmandatoryfields); //Modified by swatih for localization 22/7/2020
                        })
                        // return false;
                    }
                    var BankID = [];
                    BankID = $filter('filter')(TempLst, function (d) { return d.BankID == undefined || d.BankID == 0 });
                    //($scope.BillDetails.OtherSrvPaymentModeList, function (d) { return d.BankID == undefined || d.BankID == 0 });
                    if (BankID.length > 0) {
                        angular.forEach(BankID, function (item) {
                            item.IsBankIDNotFill = true;
                            $scope.IsBankIDNotFill = true;
                             AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                            //AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillmandatoryfields); //Modified by swatih for localization 22/7/2020

                        })
                        // return false;
                    }
                    var Date = [];
                    Date = $filter('filter')(TempLst, function (d) { return d.Date == undefined || d.Date == '' });
                    //($scope.BillDetails.OtherSrvPaymentModeList, function (d) { return d.Date == undefined || d.Date == '' });
                    if (Date.length > 0) {
                        angular.forEach(Date, function (item) {
                            item.IsDateIDNotFill = true;
                            $scope.IsDateIDNotFill = true;
                            AlertMessage.warning("PalashIVF", "Please fill mandatory fields");//Commented by swatih for localization 22/7/2020
                            //AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillmandatoryfields); //Modified by swatih for localization 22/7/2020
                        })
                        //return false;
                    }
                    //$scope.IsAmountNotFill = false;             
                    //$scope.IsNumberNotFill = false;              
                    //$scope.IsBankIDNotFill = false;               
                    //$scope.IsDateIDNotFill = false;
                    // }

                }   //bn



                else {
                    //$scope.BillDetails.OtherSrvPaymentModeList[i].IsAmountNotFill = false;                       
                    $scope.BillDetails.OtherSrvPaymentModeList[i].IsNumberNotFill = false;
                    $scope.BillDetails.OtherSrvPaymentModeList[i].IsBankIDNotFill = false;
                    $scope.BillDetails.OtherSrvPaymentModeList[i].IsDateIDNotFill = false;
                    if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount > $scope.BillDetails.NetBillAmount) {
                        $scope.IsExceed = true;
                        return false;
                    }
                    else {
                        $scope.IsExceed = false;

                }
                }
            }

            if (Amount == undefined || Number == undefined || BankID == undefined || Date == undefined) {
                return true;
            }
            else if (Amount.length > 0 || Number.length > 0 || BankID.length > 0 || Date.length > 0) {
                AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                //AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillmandatoryfields); //Modified by swatih for localization 22/7/2020
                return false;
            }
            
            else {
                return true;
            }


                    if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID == 1) {  //Cash      //Cash
                        // item.IsAmountNotFill = false;
                        $scope.IsAmountNotFill = false;
                        // //item.IsNumberNotFill = false;
                        $scope.IsNumberNotFill = false;
                        //// item.IsBankIDNotFill = false;
                        $scope.IsBankIDNotFill = false;
                        //// item.IsDateIDNotFill = false;
                        $scope.IsDateIDNotFill = false;
                        if ($scope.Total > $scope.BillDetails.NetBillAmount) {
                            $scope.IsExceed = true;
                            return false;
                        }
                    }





                     
            if ($scope.Total < $scope.BillDetails.NetBillAmount) {                // $scope.BillList[$scope.idx].BalanceAmountSelf

                $scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;                    // $scope.BillList[$scope.idx].BalanceAmountSelf - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;
                return true;
            }                
            else if ($scope.Total == $scope.BillDetails.NetBillAmount) {            //$scope.BillList[$scope.idx].BalanceAmountSelf

                //$scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount;
                $scope.BillDetails.Payment.BillBalanceAmount = 0;
                return true;
            }
            else {
                //AlertMessage.info('PalashIVF', 'Amount exceeded');
                $scope.IsExceed = true;
                return false;
            }


                }



    }
    /******************************************************************************************************************/
     //$scope.Showpaidamount = function Showpaidamount() {
     //   debugger;
     //                   $scope.BillDetails.OtherSrvPaymentModeList=[];
     //                   $scope.BillDetails.OtherSrvPaymentModeList.push({
     //                       'PaymentModeID': 0,
     //                       'PaymentDate': '',
     //                       'TransactionNo': '',
     //                       'BankID': 0,
     //                       'PaidAmount': $scope.BillDetails.NetBillAmount,    ///
     //                       'CashMode': true,    //false
     //                       //'DisableAmount':true 
     //                       'DisableAmount':false
     //                   });

     //               }
                  

     /********************************************************************************************************************************/
 //$scope.deletepayment = function (idx) {
 //       debugger;
 //       if ( $scope.billdetails.othersrvpaymentmodelist.length <= 1) {
 //           alertmessage.info(objresource.msgtitle, objresource.msgremoverow);
 //       }
 //       else { 
 //        $scope.billdetails.othersrvpaymentmodelist.splice(idx, 1);
       
 //    }
 //   }
/******************************************************************************************************************/
$scope.DeletePayment = function (idx) {
        debugger;

        //Begin :: Added by AniketK on 05Oct2020
     if($scope.tempAdvanceList != undefined){
       if($scope.tempAdvanceList.length > 0){
        for(var i = 0; i<$scope.BillDetails.OtherSrvPaymentModeList.length; i++){
            for(var j = 0; j<$scope.tempAdvanceList.length;j++){
                if(idx == j && $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.tempAdvanceList[j].ConsumeAmount){
                    $scope.tempAdvanceList[j] = {
                                                        AdvanceAgainst: $scope.tempAdvanceList[i].AdvanceAgainst,
                                                        AdvanceID: $scope.tempAdvanceList[i].AdvanceID,
                                                        AdvanceUnitID: $scope.tempAdvanceList[i].AdvanceUnitID,
                                                        Balance: $scope.tempAdvanceList[i].Balance,
                                                        BalanceAmount: $scope.tempAdvanceList[i].Balance,
                                                        ConsumeAmount: '',
                                                        Date: $scope.tempAdvanceList[i].Date,
                                                        Remarks: $scope.tempAdvanceList[i].Remarks,
                                                        UnitName: $scope.tempAdvanceList[i].UnitName,
                                                        check : false}
                }
            }
        }
      }
    }
       //End :: Added by AniketK on 05Oct2020
        //if ($scope.BillDetails.OtherSrvPaymentModeList.length <= 1) { //Commented and Modified by AniketK on 05Oct2020
        if ($scope.BillDetails.OtherSrvPaymentModeList.length <= 0) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else { 
        $scope.BillDetails.OtherSrvPaymentModeList.splice(idx, 1);
            if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
            //Begin :: Added by AniketK on 05Oct2020
                $scope.BillDetails.OtherSrvPaymentModeList.push({
                            'PaymentModeID': 0,
                            'PaymentDate': '',
                            'TransactionNo': '',
                            'BankID': 0,
                            'PaidAmount':Math.round($scope.BillDetails.NetBillAmount),      
                            'CashMode': true
                        });
            //End :: Added by AniketK on 05Oct2020
            $scope.BillDetails.IsFreeze = false;
            //$scope.ShowPaymentData = false; //
            $scope.ShowPaymentData = true;
            $scope.disableFeeeze = false;
            $scope.disableSave = false;
        }
    }
    }
      
/******************************************************************************************************************/


  $scope.FreezeBill = function FreezeBill(IsFreeze) {
        debugger;

        if (IsFreeze == 1) {
            if ($scope.ItemSaleDetailsList.length > 0) {
                swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouWantToFreezBill, "warning", function (isConfirmed) {
                    if (isConfirmed) {
                        $scope.ShowPaymentData = true;
                        $scope.disableFeeeze = true;
                        $scope.disableSave = true;
                       // $scope.DisableRateAndCon = true;
                        $scope.BillDetails.IsFreezed = IsFreeze;
                      if($scope.AdvanceList != undefined){ 
                        if($scope.AdvanceList.length > 0){ 
                            $scope.AdvanceAutoConsumed();
                            $scope.IsAdvanceAvailable = true;
                        }
                        else{
                            $scope.IsAdvanceAvailable = false;
                        }
                      }
                     else{
                            $scope.IsAdvanceAvailable = false;
                     }
debugger;
                        $scope.BillDetails.OtherSrvPaymentModeList.push({
                            'PaymentModeID': 0,
                            'PaymentDate': '',
                            'TransactionNo': '',
                            'BankID': 0,
                            'PaidAmount':Math.round($scope.BillDetails.NetBillAmount),    ///
                            'CashMode': true,    //false

                            'DisableAmount':false
                        });
                        // $scope.SavePatientRecord();
                    }
                    else {
                        $scope.BillDetails.IsFreezed = false;
                        $scope.BillDetails.IsFreeze = false;
                        $scope.ShowPaymentData = false;
                        $scope.disableFeeeze = false;
                        $scope.disableSave = false;
                    }
                    //  $scope.BillDetails.PaidAmount = $scope.BillDetails.NetBillAmount;
                });

            }
            else {
                AlertMessage.info('Palash IVF', 'Add atleast 1 Medicine.'); //Commented by swatih for localization 22/7/2020
               // AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                $scope.BillDetails.IsFreezed = false;
            }

        }
          
        else {
        debugger;
            $scope.BillDetails.IsFreeze = IsFreeze;
            $scope.ShowPaymentData = false;
        }
    }


    /******************************************************************************************************************/
     $scope.PrintNewBill = function PrintNewBill() {
        debugger;
                               //var PatientID =  $scope.BillList.PatientID;
                               //var PatientUnitID = $scope.BillList.PatientUnitID;
                               //var VisitID = $scope.BillList.VisitID;
                               //var VisitUnitID = $scope.BillList.VisitUnitID;
                               //var BillID = $scope.BillList.objItemSalesVO.BillID;
                               
             if ($scope.IsTempBillID) {
                   var a = encodeURIComponent('U=' +$scope.BillList.PatientUnitID + '&VU=' + $scope.BillList.VisitUnitID +
             '&V=' +   $scope.BillList.VisitID + '&P=' + $scope.BillList.PatientID + '&BID=' + $scope.BillList.objItemSalesVO.BillID + '&IB=' + $scope.BillList.objItemSalesVO.IsBilled);
                window.open('/Reports/Inventory/CounterSaleWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
                 
                 
                    }
        //else {
         //var a = encodeURIComponent('U=' +$scope.BillList.PatientUnitID + '&VU=' + $scope.BillList.VisitUnitID +
         //       '&V=' +   $scope.BillList.VisitID + '&P=' + $scope.BillList.PatientID + '&BID=' + $scope.BillList.objItemSalesVO.BillID);
         //         window.open('/Reports/Inventory/CounterSaleWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
                 
        //}

    }

    

 }]);          


