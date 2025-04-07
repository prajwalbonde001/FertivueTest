'use strict';
angular.module('PIVF').controller("MaterialConsumptionListController", ['$rootScope', '$scope', 'localStorageService', 'MaterialConsumptionListSrv', 'PatientVisitService','CounterSaleSrv', 'StoreService', 'Common', 'usSpinnerService', 'srvCommon', 'AlertMessage', '$filter', '$location' ,'swalMessages', //'localStorageService'
function ($rootScope, $scope, localStorageService,MaterialConsumptionListSrv ,PatientVisitService ,CounterSaleSrv, StoreService, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location,swalMessages) {
//Declarations
debugger;
$scope.PatientData = {};
$scope.MaterialConsumptionInfo={};
$scope.StoreList = [];
$scope.PatientData.UnitID = localStorageService.get("UserInfo").UnitID;
$scope.MaterialConsumptionInfo.UnitID = 0;
$scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
$scope.format = $scope.formats[0];
$scope.altInputFormats = ['M!/d!/yyyy'];
$scope.MaterialConsumptionList = {};
$scope.ConsupmtionList={};
$scope.selectedRow = null;



//For date Popups
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




     $scope.FromToDateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End

     $scope.dateOptionsDOB = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End

   /***********************************************************************************************************************/
   var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
   

/***********************************************************************************************************************/
//To load dropdown data when page loaded
$scope.loadData = function loadData() {
    debugger;
     var UserInfo = localStorageService.get("UserInfo");
     $scope.MaterialConsumptionInfo.UnitID = UserInfo.UnitID;
   
     $scope.MaterialConsumptionInfo.FromDate = new Date();
     $scope.MaterialConsumptionInfo.ToDate = new Date();
      $scope.GetStoreList();
      $rootScope.IsFromPatientConsuptionList = true;
    }
    /***********************************************************************************************************************/
     // initialize our variable to null
  $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
     $scope.selectedRow = index;
  }

//For Store Dropdown 
 $scope.GetStoreList = function GetStoreList() {
        debugger;
        var searchPara = {};
        searchPara = {
            StoreType: 0, SearchExp: "", IsPagingEnable: false, Pgindx: 0, ClinicId: $scope.MaterialConsumptionInfo.UnitID
        };
        //var searchPara = "";
        var Promise = StoreService.GetStoreList(searchPara);
        Promise.then(function (Response) {
            debugger;
            $scope.StoreList = Response.data;
            $scope.MaterialConsumptionInfo.StoreID=0;
          
         
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };

/***********************************************************************************************************************/
$scope.SearchData = function (MaterialConsumptionInfo) {
        debugger;
         //if($scope.IsValidate())
           // {
            if ($scope.MaterialConsumptionInfo.StoreID != 0)
        {           
            if ($scope.frmMaterialConsumptionList.StoreID.$valid)
            {
        debugger;
        var Consumption = [];
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(MaterialConsumptionInfo.FromDate)) { MaterialConsumptionInfo.FromDate = null; }
        if (angular.isUndefined(MaterialConsumptionInfo.ToDate)) { MaterialConsumptionInfo.ToDate = null; }       
        
        if ((MaterialConsumptionInfo.ToDate != null && MaterialConsumptionInfo.FromDate == null) || (MaterialConsumptionInfo.ToDate == null && MaterialConsumptionInfo.FromDate != null)) {
            AlertMessage.info(objResource.msgTitle, objResource.msgSelVisFrmDtAndVisToDt);
        }
        else {
            if (MaterialConsumptionInfo.FromDate <= MaterialConsumptionInfo.ToDate) {
                 //Bill.push($filter('date')(PatientBill.FromDate, 'shortDate'));
                //Bill.push($filter('date')(PatientBill.ToDate, 'shortDate'));
                var FromDate = new Date(MaterialConsumptionInfo.FromDate).toISOString();
                var ToDate = new Date(MaterialConsumptionInfo.ToDate).toISOString();
                //Bill.push(PatientBill.FromDate);
                //Bill.push(PatientBill.ToDate);

                Consumption.push(FromDate);
                Consumption.push(ToDate);
                Consumption.push($scope.MaterialConsumptionInfo.StoreID.toString());//.toString()
                //Bill.push($scope.PatientData.PatID.toString());
                //Bill.push($scope.PatientData.PatUnitID.toString());
                Consumption.push(null);
                Consumption.push(null);   //3
                
                //Bill.push($scope.CurrentPage - 1);   ///
                var responseData = MaterialConsumptionListSrv.GetMaterialConsupmtionList(Consumption,$scope.CurrentPage - 1,true);
                responseData.then(function (Response) {
                    usSpinnerService.spin('GridSpinner');
                    if (Response.data.length > 0) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = Response.data[0].TotalCount; //
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        $scope.totalitems = 0;
                    }
                    $scope.MaterialConsumptionList = Response.data;

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
            else
            {
                $scope.frmMaterialConsumptionList.StoreID.$dirty = true;
               
            }
        } else {
            $scope.frmMaterialConsumptionList.StoreID.$dirty = true;
            
               }
       // }
    }
    /***********************************************************************************************************************/
$scope.PageChange = function PageChange() {
    debugger;

    if ($rootScope.IsFromPatientConsuptionList) {
        $scope.SearchData($scope.MaterialConsumptionInfo);
    }
    //else {
    //    $scope.GetMaterialConsupmtionList($scope.BillingList);
    //}

};
/***********************************************************************************************************************/
$scope.GetMaterialConsumptionItemList = function GetMaterialConsumptionItemList(MaterialConsumptionList) {
  debugger;
  //$scope.MaterialConsumptionList[index];
 var MaterialConsumptionID = $scope.MaterialConsumptionList[$scope.selectedRow].MaterialConsumptionID;
 var MaterialConsumptionUnitID = $scope.MaterialConsumptionList[$scope.selectedRow].MaterialConsumptionUnitID;
  $scope.selectedRow;
  var responseData = MaterialConsumptionListSrv.GetMaterialConsumptionItemList(MaterialConsumptionID, MaterialConsumptionUnitID);
        responseData.then(function (Response) { 
        $scope.ItemDetails = Response.data;
        $scope.itemdetailgrd=true;
       
        }, function (error) {
           
        });
        //$scope.CounterSaleInfo.SelectedItem = null;
  }


/***********************************************************************************************************************/
 $scope.cancelView = function () {
           Common.clearID();
           //$rootScope.IsAppointment = false;
           //$rootScope.APPID = null;
           $location.path('/MaterialConsumptionList/');
       }
/*************************************************************************************************************/
 $scope.IsValidate = function () {
        debugger;
         $scope.isValid = true;
         if  ($scope.MaterialConsumptionInfo.StoreID == 0)
                          {
                          $scope.style = "border-color:red";
                        $scope.isValid = false;
                         angular.element(StoreId).focus();
                          AlertMessage.warning("PalashIVF", "Please Select The Store");
                            
                               return false;
                          }
                            if ($scope.isValid==true) {
                $scope.isValid=false;
                return true;
                
            }
            }

 /*************************************************************************************************************/
  $scope.PrintBill = function PrintBill(index) {
        debugger;
       
            
        var a = encodeURIComponent('M=' + $scope.MaterialConsumptionList[index].MaterialConsumptionID + '&MU=' + $scope.MaterialConsumptionList[index].MaterialConsumptionUnitID  );
            window.open('/Reports/InventoryPharmacy/MaterialConsumptionReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }

 /*************************************************************************************************************/


}]);   