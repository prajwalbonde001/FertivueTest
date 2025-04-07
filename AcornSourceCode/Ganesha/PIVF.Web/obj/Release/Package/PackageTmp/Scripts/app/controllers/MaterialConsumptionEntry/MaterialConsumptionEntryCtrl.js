'use strict';
angular.module('PIVF').controller("MaterialConsumptionEntryCtrl", ['$rootScope', '$scope', 'localStorageService', 'MaterialConsumptionEntrySrv', 'PatientVisitService','CounterSaleSrv', 'StoreService', 'Common', 'usSpinnerService', 'srvCommon', 'AlertMessage', '$filter', '$location' ,'swalMessages', //'localStorageService'
function ($rootScope, $scope, localStorageService,MaterialConsumptionEntrySrv ,PatientVisitService ,CounterSaleSrv, StoreService, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location,swalMessages) {

//Declarations
 $scope.PatientData = {};
$scope.MaterialConsumptionDetailInfo={};
$scope.MaterialConsumptionEntryInfo={};
$scope.objMaterialConsumption={};
$scope.StoreList = [];
$scope.PatientData.UnitID = localStorageService.get("UserInfo").UnitID;
$scope.MaterialConsumptionEntryInfo.StoreID = 0;
$scope.MaterialConsumptionEntryInfo.UnitID = 0;
$rootScope.FormName = 'MaterialConsumption Entry';
$scope.ItemSaleDetailsList=[];
$scope.ItemSaleDetails = [];
$scope.IsSellBySellingUnit = true;
$scope.objMaterialConsumption.ConsumptionItemDetailsList=[];


/***********************************************************************************************************************/
//To load dropdown data when page loaded
$scope.loadData = function loadData() {
    debugger;
    $scope.selectedPatientFromPatient = '';
    $scope.GetPatientDetailsFromPatient(false);
    var UserInfo = localStorageService.get("UserInfo");
     $scope.MaterialConsumptionEntryInfo.UnitID = UserInfo.UnitID;
     $scope.GetStoreList();
     $scope.GetItemUOMConversionsByID();

            }
     /******************************************************************************************************************/
     $scope.GetStoreList = function GetStoreList() {
        debugger;
        var searchPara = {};
        searchPara = {
            StoreType: 0, SearchExp: "", IsPagingEnable: false, Pgindx: 0, ClinicId: $scope.MaterialConsumptionEntryInfo.UnitID
        };
      
        var Promise = StoreService.GetStoreList(searchPara);
        Promise.then(function (Response) {
            debugger;
            $scope.StoreList = Response.data;
            $scope.MaterialConsumptionEntryInfo.StoreID=0;
          
         
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

 /******************************************************************************************************************/
 //Binding selected patient on searching
    $scope.SelectedPatient = function SelectedPatient(selectedPatient)  //, IsAppSearch
    {
        debugger;
        sessionStorage.setItem("SavedPatientData", JSON.stringify(selectedPatient));
        if (selectedPatient.MRNo != "")
        {
            
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

 /******************************************************************************************************************/

//Used for patient search
    $scope.GetPatientDetailsFromPatient = function GetPatientDetailsFromPatient(IsAppSearch)
    {
        debugger;
            $scope.selectedPatientFromPatient = "";
            $scope.RegUnitID = $scope.PatientData.UnitID
            $scope.PatientList = [];        
            var Promise = PatientVisitService.GetPatientDetails($scope.selectedPatientFromPatient, IsAppSearch,$scope.RegUnitID);
            Promise.then(function (Response)
            {     debugger;      
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

/***********************************************************************************************************************//***********************************************************************************************************************/
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
 $scope.HideControl = function HideControl() {
        debugger;
if($("#checkbox").is(":checked")){
$scope.search = true;
//$scope.PatientData.MRNo = true;
 $scope.MaterialConsumptionEntryInfo.IsAgainstPatient=true;
       }
       else
       {
       $scope.search = false;
     $scope.PatientData.MRNo = false;
    $scope.MaterialConsumptionEntryInfo.IsAgainstPatient=false;



       }
       }
 /******************************************************************************************************************/
 //For item Search 
 $scope.GetItemListofStore = function () {
        debugger;
         var StoreID = [];
         $scope.StoreID=$scope.MaterialConsumptionEntryInfo.StoreID;
         var responseData = CounterSaleSrv.GetItemListofStore($scope.StoreID);
        responseData.then(function (Response) { 
        debugger;
        $scope.ItemList = Response.data;
        }, function (error) {
           
        });
    }
/******************************************************************************************************************/
// For Item Match
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
/***********************************************************************************************************************/
$scope.ViewBatchmodal = function ViewBatchmodal($item, $model, $label) {  // added by Yogita
            debugger;
            $scope.SelectedItem = $model;
            $scope.GetItemBatchwiseStock($scope.MaterialConsumptionEntryInfo);
            angular.element(modbatchinfo).modal('show');
           // angular.element(MaterialConsumptionEntryInfo.Quantity).focus();
            angular.element(QuntityInput).focus();
        }
/***********************************************************************************************************************/
$scope.closebatchinformation = function closebatchinformation(){
        debugger;
         $("#itemsearch").click(function() {
          this.value = '';
          });
       angular.element(itemsearch).val= null;
       angular.element(modbatchinfo).modal('hide');
        
        angular.element(itemsearch).focus()
        angular.element(itemsearch).val="";

}

$(document).ready(function(){
    $("#modbatchinfo").on('shown.bs.modal', function(){
        $(this).find('#QuntityInput').focus();
    });
});

/***********************************************************************************************************************/

 //For Batch Binding
$scope.GetItemBatchwiseStock = function GetItemBatchwiseStock(MaterialConsumptionEntryInfo) {
  debugger;
  var responseData = CounterSaleSrv.GetItemBatchwiseStock(MaterialConsumptionEntryInfo.SelectedItem.ID, $scope.MaterialConsumptionEntryInfo.UnitID,MaterialConsumptionEntryInfo.StoreID);
        responseData.then(function (Response) { 
            $scope.BatchItemList = Response.data;
            $scope.GetItemDetailsByID(MaterialConsumptionEntryInfo);
            
        }, function (error) {
           
        });
    // $scope.CounterSaleInfo.SelectedItem = null;
}
/***********************************************************************************************************************/
$scope.AddItemsDetails=function(MaterialConsumptionEntryInfo)//, Ischeck
{
 debugger;

 for(var i = 0; i<$scope.BatchItemList.length;i++){
   // for(var i = 0; i<$scope.ItemDetails.length;i++){
        if($scope.MaterialConsumptionEntryInfo.StoreID == $scope.BatchItemList[i].StoreID && $scope.BatchItemList[i].ItemID == $scope.ItemDetails.ID){
            if (true) {//Ischeck ==
   
    $scope.objISDetails = {};

    //$scope.ItemSaleDetailsList.push({  //commented

       
       $scope.objISDetails.ItemName = $scope.BatchItemList[i].ItemName;//ItemMaster
       $scope.objISDetails.ItemId = $scope.BatchItemList[i].ItemID;
        $scope.objISDetails.BatchID = $scope.BatchItemList[i].BatchID;
        $scope.objISDetails.BatchCode = $scope.BatchItemList[i].BatchCode;
        $scope.objISDetails.ExpiryDate = $scope.BatchItemList[i].ExpiryDate;
        $scope.objISDetails.AvailableQuantity = $scope.BatchItemList[i].AvailableStock; // newly added
        $scope.objISDetails.UsedQty = $scope.BatchItemList[i].Quantity;
        $scope.objISDetails.PurchaseRate = $scope.BatchItemList[i].PurchaseRate;
         $scope.objISDetails.MainRate = $scope.BatchItemList[i].PurchaseRate;
        //$scope.objISDetails.MRP = $scope.BatchItemList[i].MRP;
        $scope.objISDetails.Amount = $scope.BatchItemList[i].UsedQty * $scope.BatchItemList[i].MRP;
        $scope.objISDetails.StockUOM = $scope.BatchItemList[i].StockUOM; // modified
        $scope.objISDetails.ConversionFactor = $scope.ItemDetails.STBCF/ $scope.ItemDetails.STBCF;
         $scope.objISDetails.BaseConversionFactor =  $scope.ItemDetails.STBCF;
           $scope.objISDetails.StockToBase =  $scope.ItemDetails.STBCF;
        //$scope.objISDetails.ConversionFactor = ($scope.ItemDetails.SellingCF / $scope.ItemDetails.StockingCF).toFixed(2);
        $scope.objISDetails.BaseUOM = $scope.ItemDetails.BaseUM; //
        $scope.objISDetails.Remark = $scope.MaterialConsumptionDetailInfo.Remark;
        $scope.objISDetails.StockingOty = $scope.BatchItemList[i].AvailableStock; // newly added
       
         $scope.objISDetails.SUOMID = $scope.ItemDetails.SUMID;
           $scope.objISDetails.SUOM = $scope.ItemDetails.SUM;
         $scope.objISDetails.BaseUOMID = $scope.ItemDetails.BaseUMID;
         $scope.objISDetails.MainMRP = $scope.BatchItemList[i].MRP; // modified
         $scope.objISDetails.MRP = $scope.BatchItemList[i].MRP;
        //$scope.objISDetails.UOMList = $scope.ItemDetails.UOMList;
          if($scope.IsSellBySellingUnit)
        {
             $scope.objISDetails.UOMList = $scope.ItemDetails.UOMList;
             
             $scope.objISDetails.ConversionFactor = ($scope.ItemDetails.SellingCF / $scope.ItemDetails.StockingCF).toFixed(2);
             $scope.objISDetails.BaseConversionFactor = $scope.ItemDetails.SellingCF;
             $scope.objISDetails.BaseQuantity =  $scope.BatchItemList[i].UsedQty * $scope.ItemDetails.SellingCF;
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

         $scope.objISDetails.StoreID = $scope.MaterialConsumptionDetailInfo.StoreID;
         $scope.objISDetails.SelectedUOMID = $scope.objISDetails.BaseUOMID;

        
        
    //}); //commented

    $scope.ItemSaleDetailsList.push($scope.objISDetails);
     debugger;
     //$scope.closebatchinformation();
    // $scope.CalTotalQuntity();
     debugger
      $scope.ItemSaleDetailsList[i].SelectedUOMID;
      $scope.CalculateConversionFactorCentral($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
      if($scope.ItemSaleDetailsList != undefined && $scope.ItemSaleDetailsList.length > 0)
      {     
    $scope.CalAmount($scope.ItemSaleDetailsList[$scope.ItemSaleDetailsList.length - 1],$scope.ItemSaleDetailsList.length - 1);
     }
     $scope.closebatchinformation();
    
    $("#itemsearch").click(function() {
    this.value = '';
       });
   }
   }
  // }
   }
 }
 /***********************************************************************************************************************/
 $scope.GetItemDetailsByID = function GetItemDetailsByID(MaterialConsumptionEntryInfo) {
  debugger;
  var responseData = CounterSaleSrv.GetItemDetailsByID(MaterialConsumptionEntryInfo.SelectedItem.ID,MaterialConsumptionEntryInfo.StoreID);
        responseData.then(function (Response) { 
        $scope.ItemDetails = Response.data;
        $scope.GetItemUOMConversionsByID(MaterialConsumptionEntryInfo);
        }, function (error) {
           
        });
   
          //$scope.CounterSaleInfo.SelectedItem = null;
  }
 /***********************************************************************************************************************/
  $scope.cancelView = function () {
           Common.clearID();
           //$rootScope.IsAppointment = false;
           //$rootScope.APPID = null;
           $location.path('/MaterialConsumptionEntry/');
       }
  /***********************************************************************************************************************/
   $scope.CalTotalQuntity = function(){
        debugger;
        var TotalQuntity = 0;
      angular.forEach($scope.ItemSaleDetailsList, function (i, index) {
          TotalQuntity += parseFloat( i.UsedQty);
          $scope.CalTotalAmount();
            
        })
       
       $scope.MaterialConsumptionEntryInfo.TotalQuntity = TotalQuntity;
       // $scope.BillDetails.objItemSalesVO.TaxAmount=TaxAmounttotal;
   }

    $scope.CalTotalAmount = function(){
        debugger;
        var TotalAmount = 0;
      angular.forEach($scope.ItemSaleDetailsList, function (i, index) {
          TotalAmount += parseFloat( i.Amount);
            
        })
       
       $scope.MaterialConsumptionEntryInfo.TotalAmount = TotalAmount;
      
    }



   //CalAmount
   /***********************************************************************************************************************/
   $scope.CalAmount= function CalAmount( ItemInfo,Indx)
{    debugger;
    if(ItemInfo.UsedQty > 0)
        {    
            $scope.ItemSaleDetailsList[Indx].Amount=ItemInfo.UsedQty * ItemInfo.PurchaseRate;
           
        }
     else
        {
          $scope.ItemSaleDetailsList[Indx].Amount=0;  
        }
        debugger;
    if($scope.ItemSaleDetailsList[Indx].Amount != undefined && $scope.ItemSaleDetailsList[Indx].Amount > 0)
       {  
        $scope.CalTotalQuntity();
       }

        }

  /***********************************************************************************************************************/
  $scope.SaveUpdate =  function SaveUpdate ()  {
        debugger;  
        //if ($scope.frmMaterialConsumptionEntry.$valid && $scope.MaterialConsumptionEntryInfo.StoreID != 0 )
        //{
             //$scope.objMaterialConsumption ={};
             //var objMaterialConsumption = $scope.objMaterialConsumption;
            if($scope.IsValidate())
            {
           $scope.objMaterialConsumption.StoreID = $scope.MaterialConsumptionEntryInfo.StoreID;
           $scope.objMaterialConsumption.PatientID =  $scope.PatientData.RegID;
           $scope.objMaterialConsumption.PatientUnitID = $scope.PatientData.RegUnitID ;
           $scope.objMaterialConsumption.IsAgainstPatient = $scope.MaterialConsumptionEntryInfo.IsAgainstPatient;
           $scope.objMaterialConsumption.TotalAmount = $scope.MaterialConsumptionEntryInfo.TotalAmount;
           $scope.objMaterialConsumption.TotalItems = $scope.MaterialConsumptionEntryInfo.TotalQuntity;
           $scope.objMaterialConsumption.PackageID = 0;
           $scope.objMaterialConsumption.TotalMRPAmount = 0;
          $scope.objMaterialConsumption.Opd_Ipd_External_Id =  $scope.PatientData.VisitID;
           $scope.objMaterialConsumption.Opd_Ipd_External_UnitId = $scope.PatientData.VisitUnitID;
           $scope.objMaterialConsumption.Opd_Ipd_External =0;
           $scope.objMaterialConsumption.IsAgainstPatientIndent =false;
           $scope.objMaterialConsumption.IsPackageConsumable =  false;
           $scope.objMaterialConsumption.LinkPatientID = 0;
            $scope.objMaterialConsumption.LinkPatientID =0;

          //$scope.objMaterialConsumption.IsAgainstPatient = true;

            $scope.objMaterialConsumption.Remark = $scope.MaterialConsumptionEntryInfo.Remarks2;
             $scope.objMaterialConsumption.ConsumptionItemDetailsList= $scope.ItemSaleDetailsList;

           var ResponseData = MaterialConsumptionEntrySrv.SaveConsumptionDetails($scope.objMaterialConsumption);  // , OldDataValuepatient commented by sujata
                    ResponseData.then(function (Response) {
                        debugger;

                           //$scope.BillList = Response.data;
                        if (Response.data == 1)  {
                           
                            AlertMessage.success('PalashIVF', 'Material Consumption  Save successfully.');
                             //if ($scope.BillDetails.IsFreezed) {
                              

                             //       $scope.IsTempBillID = true;
                             //      // $scope.TempBillID = resp.data;
                             //       $scope.PrintNewBill();
                             //   }
                            usSpinnerService.stop('GridSpinner');
                                $location.path("/Queue");
                             }
                    });
                    }
                 //}
                 //else

                 //{ 
                 //$scope.frmMaterialConsumptionEntry.StoreID.$dirty = true;
                 // AlertMessage.error('PalashIVF', 'Please fill all field successfully.');
                 //}
         
}
  
  /***********************************************************************************************************************/
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


  
           //objConversionVO.UOMConvertLIst=  $scope.ItemDetails.UOMList;
           objConversionVO.UOMConvertLIst=$scope.ItemDetails.UOMConversionList;

           objConversionVO.MainMRP = ItemSaleDetails.MainMRP;
           objConversionVO.MainRate = ItemSaleDetails.MainRate;
           objConversionVO.SingleQuantity = ItemSaleDetails.UsedQty;

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

                        objConversionVO.UsedQty = objConversionVO.SingleQuantity * objConversionVO.ConversionFactor;
                        objConversionVO.BaseQuantity = objConversionVO.SingleQuantity * objConversionVO.BaseConversionFactor;

                        objConversionVO.BaseRate = objConversionVO.MainRate;
                        objConversionVO.BaseMRP = objConversionVO.MainMRP;
                    }
                    else     // e.g. Tab to Strip  (Reverse flow 1 Tablet = How many Strip ? if CF = 10 then 1/10)
                    {
                        objConversionVO.MRP = objConversionVO.MainMRP * objConversionVO.CalculatedFromCF;
                        objConversionVO.Rate = objConversionVO.MainRate * objConversionVO.CalculatedFromCF;

                        objConversionVO.UsedQty = objConversionVO.SingleQuantity * objConversionVO.CalculatedCF;
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

                        objConversionVO.UsedQty = objConversionVO.SingleQuantity * objConversionVO.CalculatedCF;
                        objConversionVO.BaseQuantity = objConversionVO.SingleQuantity * objConversionVO.BaseConversionFactor;

                        objConversionVO.BaseRate = objConversionVO.MainRate;
                        objConversionVO.BaseMRP = objConversionVO.MainMRP;

                    }
                }

            //return objConversionVO;

            $scope.ItemSaleDetailsList[Indx].PurchaseRate = objConversionVO.Rate;
             $scope.ItemSaleDetailsList[Indx].MRP = objConversionVO.MRP;

             // Quantity = objConversionVO.Quantity;
            $scope.ItemSaleDetailsList[Indx].UsedQty = objConversionVO.SingleQuantity;
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
$scope.GetItemUOMConversionsByID = function GetItemUOMConversionsByID(MaterialConsumptionEntryInfo) {
  debugger;
  var responseData = CounterSaleSrv.GetItemUOMConversionsByID(MaterialConsumptionEntryInfo.SelectedItem.ID);
        responseData.then(function (Response) { 
        Response.data.UOMConvertList.splice(0, 0, {ID: 0, Description: "Select" });
        $scope.ItemDetails.UOMList = Response.data.UOMConvertList;
        $scope.ItemDetails.UOMConversionList = Response.data.UOMConversionList;
       // $scope.ItemDetails.BaseUOMID = 0;
         $scope.MaterialConsumptionEntryInfo.BaseUOMID = 0;
        }, function (error) {
           
        });
        $scope.MaterialConsumptionEntryInfo.SelectedItem = null;
  }

/*************************************************************************************************************/
 $scope.IsValidate = function () {
        debugger;
         $scope.isValid = true;
          //$scope.isValid1 = true;
        
         //if($scope.ItemSaleDetailsList.length > 0){
         //   //{ foreach (var item in ItemSaleDetailsList){
         //       for (let i = 0; i < $scope.ItemSaleDetailsList.length; i++) 
         //           {

                    if  ($scope.MaterialConsumptionEntryInfo.StoreID == 0)
                          {
                          $scope.style = "border-color:red";
                        $scope.isValid = false;
                         angular.element(StoreId).focus();
                          AlertMessage.warning("PalashIVF", "Please Select The Store");
                            
                               return false;
                          }

                          if($scope.MaterialConsumptionEntryInfo.Remarks2 == " " || $scope.MaterialConsumptionEntryInfo.Remarks2 == undefined)
                          {
                            $scope.isValid = false;
                             angular.element(txtRemark).focus();
                          AlertMessage.warning("PalashIVF", "Please Enter Remark");
                            
                               return false;
                            }

                    if($scope.ItemSaleDetailsList.length > 0){
            
                for (let i = 0; i < $scope.ItemSaleDetailsList.length; i++) 
                    {
                        if ($scope.ItemSaleDetailsList[i].UsedQty == 0)
                          {
                            $scope.isValid = false;
                          AlertMessage.warning("PalashIVF", " Used Quantity Can't Be Zero");
                             ClickedFlag = 0;
                            return false;
                           }
                          else 
                               {
                              if ($scope.ItemSaleDetailsList[i].SelectedUOMID == 0 || $scope.ItemSaleDetailsList[i].SelectedUOMID == null)
                                    {
                                     $scope.isValid = false;
                                    // $scope.style = "border-color:red";
                                    angular.element(ddlUOM).focus();
                                    AlertMessage.warning("PalashIVF","Please Select UOM For Item " + $scope.ItemSaleDetailsList[i].ItemName);


                                    return false;
                                    }
                               else  if ($scope.ItemSaleDetailsList[i].STBCF <= 0 ||$scope.ItemSaleDetailsList[i].ConversionFactor <= 0)
                                    {
                                 $scope.isValid = false;
                                   AlertMessage.warning("PalashIVF","Can Not Save, Please Assign Conversion Factor For Item " + "'" + $scope.ItemSaleDetailsList[i].ItemName + "'");
                             
                                 return false;
                                   }

                               }
                         }
                        }
                 else

                {    $scope.isValid = false;
                     AlertMessage.warning("PalashIVF", "Please Select Items");
                    //AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);
                    return false;
                }
             if ($scope.isValid==true) {
                $scope.isValid=false;
                return true;
                
            }
                            
                    //    }
                    //}

        }
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

   //$scope.SaveUpdate = SaveUpdate function () {
   //     debugger;  
   //     if(MaterialConsumptionEntryInfo.StoreID != 0)
   //     {
   //       }
   //       else
   //         {
   //          $scope.frmMaterialConsumptionEntry.txtStoreID.$dirty = true;

   //          }
 
   //}                 

 /***********************************************************************************************************************/
}]);   