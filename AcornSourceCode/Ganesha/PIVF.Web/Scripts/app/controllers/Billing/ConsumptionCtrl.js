
'use strict';
angular.module('PIVF').controller('ConsumptionCtrl', function ($rootScope, $scope, ConsumptionService, $location, AlertMessage, srvCommon, Common, swalMessages, $filter, usSpinnerService, localStorageService, PatientAdvanceSrv,$uibModal) {     // , PatientVisitService
    debugger;
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $rootScope.FormName = 'Billing';
    $scope.BillDetails = {};
    //$scope.BillDetails.lsttempAdvanceList = [];
    $scope.BillingList = {};
    $scope.BillList = {};
    $scope.Advancepatient = {};
    $scope.PatientBill = {};
    $scope.PatientBill.SelectedOption = 1;
     $scope.UnitofMeasure = {};
           $scope.itemname = {}; 
    // $scope.Payment = {};
    $scope.CashMode = false;
    $scope.btnSaveUpdate = "Save";
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.IsDisableRow = false;
    $scope.disableClickNewBill = false;
    $scope.Math = window.Math;
    $scope.open1 = function () {
    debugger;
        $scope.popup1.opened = true;
    };
$scope.BalanceAdvanceAmount = [];

 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;


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


    $scope.FromToDateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 110),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End
    $scope.patientList = []; 

    $scope.selectedpatientList = [];

    $scope.openLabDtPickr = function ($event, i) {    //
    debugger;
        $event.preventDefault();
        $event.stopPropagation();
        i.dtpickropened = true;
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
    };  //for configure date-picker
    // Date pickr End



  $scope.fetchCheckedInPatients = function (searchText) {
  debugger
    if (!searchText) {
        $scope.patientList = []; // Clear the list if search text is empty
        return;
    }

   

    // Call the service method to fetch the data
    var responseData = ConsumptionService.GetCheckedInPatientsList(searchText);
    responseData.then(function (response) {
    debugger
        $scope.patientList = response.data; // Bind the response to patientList
$scope.Advancepatient = angular.copy(response.data);
//console.log($scope.Advancepatient)
        
    }, function (error) {
        AlertMessage.warning(objResource.msgTitle, 'Error fetching patients: ' + (error.message || 'Unknown error')); // Show error message
        
        
    });
};


  $scope.fetchUOM = function (patient) {
  debugger
    //if (!searchText) {
    //    $scope.patientList = []; // Clear the list if search text is empty
    //    return;
    //}

   

    // Call the service method to fetch the data
    var responseData = ConsumptionService.GetUnitOfMeasure(patient.ItemID);
    responseData.then(function (response) {
    debugger
        $scope.UnitofMeasure = response.data; // Bind the response to patientList
//$scope.Advancepatient = angular.copy(response.data);
//console.log($scope.Advancepatient)
        
    }, function (error) {
        AlertMessage.warning(objResource.msgTitle, 'Error fetching patients: ' + (error.message || 'Unknown error')); // Show error message
        
        
    });
};
  $scope.fillClinicList = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
  
            $scope.clinicList = Response.data;
            //$scope.PatientData.UnitID = 0;
             $scope.PatientBill.ClinicID = localStorageService.get("UserInfo").UnitID;
            
            
        }, function (error) {
        });
    }


  $scope.fillClinicListNew = function () {
      debugger;
      var ResponseData = ConsumptionService.GetStoreMasterList();
      ResponseData.then(function (Response) {
          debugger;
         
          $scope.storelist = Response.data;
          //$scope.PatientData.UnitID = 0;
  
          $scope.Advancepatient = []
            usSpinnerService.stop('GridSpinner');

      }, function (error) {
      });
  }


  $scope.GetPatientListClinicWise = function (PatientData) {
        debugger;
        if ($scope.PatientData.UnitID == $scope.PatientData.UnitID) {
            $scope.PatientData.UnitID = $scope.PatientData.UnitID;
            $scope.selectedPatientFromPatient = '';
            $scope.IsDisableSearch = true; //Added by AniketK on 28Nov2019
            $scope.GetPatientDetailsFromPatient(false);
        }
    }


$scope.onSelectPatient = function(patient) {
    debugger;

    //if (!patient || !patient.PatientID) {
    //    console.error("Invalid patient object passed to onSelectPatient");
    //    return;
    //}

    //// Find the index of the selected patient in patientList
    //const selectedIndex = $scope.patientList.findIndex(p => p.PatientID === patient.PatientID);

    //if (selectedIndex !== -1) {
    //debugger
    //    // If the patient is found, fetch PatientID and UnitId from the matching row
    //    const selectedPatient = $scope.patientList[selectedIndex];
         
    //    $scope.GetPatientDetails(selectedPatient.PatientID, selectedPatient.UnitId);
     
        
    //    // Navigate to NewBilling path
       
    //} else {
    //    // Handle case when patient is not found
    //    console.error("Selected patient not found in patient list.");
    //}


    this.LoadData2(patient);
};


$scope.onSelectItem = function (patient) {
    debugger;
    $scope.BatchCode = [];
    usSpinnerService.spin('GridSpinner');
    
    if (!patient) {
        $scope.BatchCode = [];
        usSpinnerService.stop('GridSpinner');
        return;
    }

    var Response = ConsumptionService.GetBatchCodeForPharmacy(patient.ID);
    Response.then(function (Response) {
        debugger;
        if (Response.data && Response.data.length > 0) {
            // Filter out empty or invalid entries
            $scope.BatchCode = Response.data.filter(function (batch) {
                return batch.BatchCode && batch.BatchCode.trim() !== ""; // Ensure BatchCode is not empty or whitespace
            });

            if ($scope.BatchCode.length > 0) {
                usSpinnerService.stop('GridSpinner');
            } else {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.warning(objResource.msgTitle, 'No valid Batch code available for the selected item');
            }
        } else {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.warning(objResource.msgTitle, 'No Available Batch code against selected item'); // Show error message
        }
    }, function (error) {
        usSpinnerService.stop('GridSpinner');
        AlertMessage.error(objResource.msgTitle, 'Error fetching batch codes: ' + (error.message || 'Unknown error')); // Show error message
    });
};

$scope.restrictSpecialCharacters = function(event) {
    const charCode = event.which || event.keyCode;

    // Allow only numbers (0-9) and control keys (like Backspace, Delete, Tab)
    if ((charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 9) {
        event.preventDefault();
    }
};





$scope.validateQuantity = function (item) {
debugger
if (item.Quantity < 0) {
        AlertMessage.warning('Quantity cannot be negative.');
        item.Quantity = 0; // Reset to a valid value
    }


    if (item.Quantity > item.AvailableQuantity) {
    debugger
        AlertMessage.warning(objResource.msgTitle,
           
            `Quantity cannot exceed the available quantity : ${ item.AvailableQuantity }.`
        );
        item.Quantity = item.AvailableQuantity; // Reset to maximum allowed value
        
    }
    if(item.Quantity > 0){item.TotalMRP=(item.MRP * item.Quantity);
                item.Amount=(item.CostPrice * item.Quantity)}
     
};

$scope.onSelectbatch = function (patient){
debugger
$scope.fetchUOM(patient)
if(!patient){
debugger
 $scope.PatientBill.UOM = 0
  $scope.PatientBill.BatchId = 0
  $scope.PatientBill.ItemId = 0
 $scope.PatientBill.Quantity = 0
 $scope.PatientBill.MRP = 0
 $scope.PatientBill.CostPrice = 0
 $scope.PatientBill.AvailableQuantity = 0
 }
 else{
 debugger
  $scope.PatientBill.UOM = patient.UOMID
  $scope.PatientBill.BatchId = patient.BatchID
  $scope.PatientBill.ItemId = patient.ItemID
  $scope.PatientBill.Quantity = patient.AvailableQuantity
  $scope.PatientBill.AvailableQuantity= patient.AvailableQuantity
  $scope.PatientBill.MRP = patient.MRP
   $scope.PatientBill.CostPrice = patient.PurchaseRate
}
}
$scope.goToBillingPage = function() {
debugger
        $location.path('/Consumption/');
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
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    // $rootScope.IsFromView = false;
    $scope.ShowPaymentData = false;
    $scope.disableFeeeze = false;
    $scope.disableSave = false; 
    $rootScope.hideWhenQueue = true;
    // $scope.BillDetails.BillList = [];
    $scope.BillDetails.SelectedOtherServiceList = [];
    $scope.BillDetails.Payment = [];
    $scope.BillDetails.OtherSrvPaymentModeList = [];
    $scope.BillList.ConsumptionItemDetailsList = [];
    $scope.BillDetails.ChargeList = [];
    $scope.BillDetails.ChargeDetailsList = [];
    // $scope.BillDetails.DeletedServiceList = [];
    var DeletedServiceList = [];   //

    $scope.redirect = function (fromPage) {
        debugger;
        if (fromPage == 1) {

            $rootScope.IsFromView = false;
            //if ( $filter('date')($rootScope.PatientBillDetails.Date, 'dd-MMM-yyyy') < $filter('date')(new Date(), 'dd-MMM-yyyy')) {
            //    AlertMessage.warning('PalashIVF', "Today's Visit is not marked for the Patient");  
            //}
            $scope.TodayDate = new Date().toString("MM.dd.yyyy");
            $scope.TodayDate = new Date($scope.TodayDate);
            if ($rootScope.PatientBillDetails.Date < $scope.TodayDate) {
                //AlertMessage.warning('PalashIVF', "Today's Visit is not marked for the Patient");  //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgTodayVisitisnotmarkedforthePatient)//Modified by swatih for localization 22/7/2020
            }
            else {
                $location.path('/NewBilling/');
            }
                   
        }
        else if(fromPage==2){
            $location.path("/Queue");
        }
        else if (fromPage == 3) {
            $rootScope.IsFromView = false;
            $location.path("/BillList");
        }
    
    }  

    var PatientData = {};
    //var selectPatient = {};
    // selectPatient = Common.getSelectedPatient();
    //$scope.PatientData = selectPatient;
    if ($rootScope.DetailsForBilling != undefined) {
    $scope.PatientData = {};
    PatientData = $rootScope.DetailsForBilling;
    $scope.PatientData.DOCID = PatientData.DoctorID;
    $scope.PatientData.DOCName = PatientData.DoctorName;
    $scope.PatientData.PatID = PatientData.PatientID;
    $scope.PatientData.PatUnitID = PatientData.PatientUnitID;
    $scope.PatientData.VisitID = PatientData.VisitID;
    $scope.PatientData.VisitUnitID = PatientData.UnitId;
}
    $scope.GetPatientDetails = function GetPatientDetails(PatID, PatUnitID)
    {
        usSpinnerService.spin('GridSpinner');
        debugger;
        var responseData = ConsumptionService.GetPatientDetails(PatID, PatUnitID);
        responseData.then(function (Response) {
            $scope.PatientDetailsData = Response.data;
            $scope.PatientDetail = {};
            $scope.PatientDetail.PatientName = $scope.PatientDetailsData.PatientName;
            $scope.PatientDetail.PartnerName = $scope.PatientDetailsData.PartnerName;
            $scope.PatientDetail.PatientAge = $scope.PatientDetailsData.PatientAge;
            //$scope.PatientDetail.PartAge = $scope.PatientDetailsData.PartAge;
            $scope.PatientDetail.PatientMRNo = $scope.PatientDetailsData.PatientMRNo;
            $scope.PatientDetail.PartnerMRNo = $scope.PatientDetailsData.PartnerMRNo;

            // $scope.PatientDetail.PatientGender = $scope.PatientDetailsData.PatientGender;
            if ($scope.PatientDetailsData.PatientGender == 2) {
                $scope.PatientDetail.PatientGender = "Female";
                $scope.PatientDetail.PartnerGender = "Male";
            }
            else{
                $scope.PatientDetail.PatientGender = "Male";
                $scope.PatientDetail.PartnerGender = "Female";
            }
            // $scope.PatientDetail.PatientGender = $scope.PatientDetailsData[0].PatientGender;
            $scope.PatientDetail.PatientAge = $scope.PatientDetailsData.PatientAge;
            $scope.PatientDetail.PartnerAge = $scope.PatientDetailsData.PartAge; 
            $scope.PatientDetail.PatientAddress = $scope.PatientDetailsData.PatientCommunicationAddress;
            $scope.PatientDetail.PartnerAddress = $scope.PatientDetailsData.PartnerCommunicationAddress;
            $scope.PatientDetail.PatientMobileNo = $scope.PatientDetailsData.PatientMobileNo;
            $scope.PatientDetail.PartnerMobileNo = $scope.PatientDetailsData.PartnerMobileNo;

            $scope.PatientDetail.PreviousOutstanding = $scope.PatientDetailsData.PreviousOutstanding;



            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            //AlertMessage.info('PalashIVF', 'Error Occured.');
            usSpinnerService.stop('GridSpinner');
        })

    
    }
    //PatientData.PatientName;
    //PatientData.PartnerName;
    $scope.isLoadDataSuccessful = false; // Initialize as false
       $scope.LoadData2 = function (patient) {
  debugger
     var SelectedPatient = {};
     $scope.selectedpatientList = patient
       SelectedPatient.ID = patient.PatientID;
        SelectedPatient.UnitID = patient.PatientUnitID;  
       // SelectedPatient.UnitID = item.UnitId;
        SelectedPatient.GenderID = patient.GenderId;
        SelectedPatient.PatientCategoryID = patient.PatientCategoryID;
        SelectedPatient.MRNo = patient.MRNo;
        SelectedPatient.PatientName = patient.PatientName;
        SelectedPatient.VisitID = patient.VisitID;
        SelectedPatient.VisitUnitID = patient.UnitId;
       // SelectedPatient.VisitStatusID = patient.CurrentVisitStatus;
       SelectedPatient.DocId = patient.DocId;
      $rootScope.DocId = patient.DocId;
       $rootScope.PatientID = patient.PatientID;
        $rootScope.PatientUnitID = patient.PatientUnitID;
         $rootScope.UnitId = patient.UnitId;
         $rootScope.VisitID = patient.VisitID;
         $rootScope.VisitUnitID = patient.UnitId;
    //  $scope.Advancepatient.PatID = patient.PatientID;
    //$scope.Advancepatient.PatUnitID = patient.PatientUnitID;
    //$scope.Advancepatient.VisitID = patient.VisitIDs;
    //$scope.Advancepatient.VisitUnitID = patient.UnitId;

        //SelectedPatient.Date =  $filter('date')(item.Date, 'dd-MMM-yyyy');
        //$scope.TodayDate = $filter('date')(new Date, 'dd-MMM-yyyy');  //new Date();
           Common.setSelectedPatient(SelectedPatient);
           Common.setSelectedCouple($rootScope.CoupleDetails);

       // SelectedPatient.Date = patient.Date.toString("MM.dd.yyyy");
        SelectedPatient.Date = new Date(SelectedPatient.Date);
        usSpinnerService.spin('GridSpinner');

        //$scope.BillDetails.DeletedServiceList = [];
        var DeletedServiceList = [];
      if (!patient || !patient.PatientID) {
        console.error("Invalid patient object passed to onSelectPatient");
        return;
    }

    // Find the index of the selected patient in patientList
    const selectedIndex = $scope.patientList.findIndex(p => p.PatientID === patient.PatientID);

    if (selectedIndex !== -1) {
    debugger
        // If the patient is found, fetch PatientID and UnitId from the matching row
        const selectedPatient = $scope.patientList[selectedIndex];
       
        $scope.GetPatientDetails(selectedPatient.PatientID, selectedPatient.UnitId);   
        if ($rootScope.IsFromView)
        {
        debugger
            usSpinnerService.spin('GridSpinner');
            $scope.Services = 1;
            $scope.btnSaveUpdate = "Update";
            $scope.GetPaymentModeValidation();  //Added by AniketK on23Oct2020
            $scope.GetServiceList();
            $scope.GetDocList();
            $scope.GetModeOfPayment();
            $scope.GetBankList();
            $scope.FillAdvanceList();  //Added by AniketK on 29Sept2020
            var PatientBillData = {};
            $scope.PatientBillData = {};
            PatientBillData = $rootScope.ViewPatientBill;
            $scope.PatientBillData.BillID = PatientBillData.BillID;
            $scope.PatientBillData.BillUnitID = PatientBillData.BillUnitID;
            $scope.PatientBillData.ChargeID = PatientBillData.ChargeID;
            $scope.PatientBillData.ChargeUnitID = PatientBillData.ChargeUnitID;
            $scope.PatientBillData.PaidAmount = PatientBillData.PaidAmount;  //
            $scope.PatientBillData.VisitID = PatientBillData.VisitID;
            $scope.PatientBillData.VisitUnitID = PatientBillData.VisitUnitID;

            if (PatientBillData.IsFreezed) {
                $scope.disableFeeeze = true;
                //angular.foreach($scope.BillDetails.OtherSrvPaymentModeList,function(item){
                //    item.disableDelete = true;
                //})
            }
            else {
                $scope.disableFeeeze = false;
                $scope.disableDelete = false;
            }
            usSpinnerService.spin('GridSpinner');
            var Promise = ConsumptionService.GetSavedBillList($scope.PatientBillData.BillID, $scope.PatientBillData.BillUnitID, $scope.PatientBillData.VisitID, $scope.PatientBillData.VisitUnitID);
            Promise.then(function (resp) {
               
                $scope.FillServiceList = resp.data;
                if ($scope.FillServiceList.length > 0) {
                debugger
                    for (var i = 0; i < $scope.FillServiceList.length; i++) {
                    debugger
                        $scope.BillDetails.SelectedOtherServiceList.push({
                            ServiceCode: $scope.FillServiceList[i].ServiceCode,
                            Service: $scope.FillServiceList[i].Service,
                            Quantity: $scope.FillServiceList[i].Quantity,
                            BaseServiceRate: $scope.FillServiceList[i].Rate,
                            ConcessionPercentage: $scope.FillServiceList[i].ConcessionPercent,
                            ConcessionAmount: $scope.FillServiceList[i].ConcessionAmount,
                            NetAmount: $scope.FillServiceList[i].NetAmount,
                            DoctorID: $scope.FillServiceList[i].DoctorID,
                            disableDelete:false

                        })
                        //$scope.BillDetails.ChargeList.push({    //
                        //    ChargeID: $scope.FillServiceList[i].ChargeID,
                        //    ChargeUnitID: $scope.FillServiceList[i].ChargeUnitID,

                        //})
                        $scope.BillDetails.TotalBillAmount = $scope.FillServiceList[i].TotalBillAmount;
                        $scope.BillDetails.NetBillAmount = $scope.FillServiceList[i].NetBillAmount;
                        $scope.BillDetails.TotalConcessionAmount = $scope.FillServiceList[i].TotalConcessionAmount;
                        $scope.BillDetails.BillBalanceAmount = $scope.FillServiceList[i].BillBalanceAmount;
                        $scope.BillDetails.PaidAmount = $scope.FillServiceList[i].PaidAmount;
                        $scope.isLoadDataSuccessful = true;

                        $scope.BillDetails.IsFreezed = $scope.FillServiceList[i].IsFreezed;
                        if ($scope.BillDetails.IsFreezed) {
                            $scope.disableSave = true;
                            angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i) {
                                i.disableDelete = true;
                            })
                        }
                        else {
                            $scope.disableSave = false;

                            usSpinnerService.stop('GridSpinner');
                        }
                    }
                   
                    usSpinnerService.stop('GridSpinner');
                }
                // $rootScope.IsFromView = false;

            }, function (error) {
            $scope.isLoadDataSuccessful = false;
                usSpinnerService.stop('GridSpinner');
            })


        }
        else {        

            // $scope.selectedPatient = JSON.parse(sessionStorage.getItem("SavedPatientData"));
            //$scope.UID = localStorageService.get("UserInfo").UnitID;
            // $scope.patientCatID = localStorageService.get("UserInfo").RegID;
            var selectCouple = {};
            selectCouple = Common.getSelectedCouple();
            // var selectPatient = {};
            // selectPatient = Common.getSelectedPatient();

            //$scope.PatientName = $rootScope.PatientBillDetails.PatientName;
            //var SelectedPatient = [];
            //SelectedPatient = $rootScope.PatientBillDetails;
            $scope.PatientName = SelectedPatient.PatientName;
            $scope.Services = 1;
            // $scope.CatID = 5;
            $scope.GetServiceList();
            $scope.GetDocListNew();
            //$scope.GetPaymentModeValidation();
            $scope.GetModeOfPaymentNew();
            $scope.GetBankList();
            $scope.FillAdvanceListNew(SelectedPatient); //Added by AniketK on 29Sept2020

            
          $scope.$evalAsync(function () {
    debugger;
    $scope.isLoadDataSuccessful = true;

    // Use getElementById or querySelector to get the element
    var element = document.getElementById('billingContainer'); // Add an id to your div for easy selection

    if ($scope.isLoadDataSuccessful) {
        // Enable hover: Add 'hover-enabled' class and remove 'hover-disabled' class
        element.classList.add('hover-enabled');
        element.classList.remove('hover-disabled');
    } else {
        // Disable hover: Add 'hover-disabled' class and remove 'hover-enabled' class
        element.classList.add('hover-disabled');
        element.classList.remove('hover-enabled');
    }

});
    usSpinnerService.stop('GridSpinner');
console.log($scope.isLoadDataSuccessful)
        }
     
        
        // Navigate to NewBilling path
       
    } else {
        // Handle case when patient is not found
         usSpinnerService.spin('GridSpinner');
         $scope.isLoadDataSuccessful = false;
        console.error("Selected patient not found in patient list.");
    }
       
    }













    $scope.LoadData = function () {
  debugger
        usSpinnerService.spin('GridSpinner');
        //$scope.BillDetails.DeletedServiceList = [];
        var DeletedServiceList = [];
     
        $scope.GetPatientDetails($scope.PatientData.PatID, $scope.PatientData.PatUnitID);   
        if ($rootScope.IsFromView)
        {
        debugger
            usSpinnerService.spin('GridSpinner');
            $scope.Services = 1;
            $scope.btnSaveUpdate = "Update";
            $scope.GetPaymentModeValidation();  //Added by AniketK on23Oct2020
            $scope.GetServiceList();
            $scope.GetDocList();
            $scope.GetModeOfPayment();
            $scope.GetBankList();
          
            $scope.FillAdvanceList();  //Added by AniketK on 29Sept2020
            var PatientBillData = {};
            $scope.PatientBillData = {};
            PatientBillData = $rootScope.ViewPatientBill;
            $scope.PatientBillData.BillID = PatientBillData.BillID;
            $scope.PatientBillData.BillUnitID = PatientBillData.BillUnitID;
            $scope.PatientBillData.ChargeID = PatientBillData.ChargeID;
            $scope.PatientBillData.ChargeUnitID = PatientBillData.ChargeUnitID;
            $scope.PatientBillData.PaidAmount = PatientBillData.PaidAmount;  //
            $scope.PatientBillData.VisitID = PatientBillData.VisitID;
            $scope.PatientBillData.VisitUnitID = PatientBillData.VisitUnitID;

            if (PatientBillData.IsFreezed) {
                $scope.disableFeeeze = true;
                //angular.foreach($scope.BillDetails.OtherSrvPaymentModeList,function(item){
                //    item.disableDelete = true;
                //})
            }
            else {
                $scope.disableFeeeze = false;
                $scope.disableDelete = false;
            }
            usSpinnerService.spin('GridSpinner');
            var Promise = ConsumptionService.GetSavedBillList($scope.PatientBillData.BillID, $scope.PatientBillData.BillUnitID, $scope.PatientBillData.VisitID, $scope.PatientBillData.VisitUnitID);
            Promise.then(function (resp) {
               debugger
                $scope.FillServiceList = resp.data;
                if ($scope.FillServiceList.length > 0) {
                debugger
                    for (var i = 0; i < $scope.FillServiceList.length; i++) {
                        $scope.BillDetails.SelectedOtherServiceList.push({
                            ServiceCode: $scope.FillServiceList[i].ServiceCode,
                            Service: $scope.FillServiceList[i].Service,
                            Quantity: $scope.FillServiceList[i].Quantity,
                            BaseServiceRate: $scope.FillServiceList[i].Rate,
                            ConcessionPercentage: $scope.FillServiceList[i].ConcessionPercent,
                            ConcessionAmount: $scope.FillServiceList[i].ConcessionAmount,
                            NetAmount: $scope.FillServiceList[i].NetAmount,
                            DoctorID: $scope.FillServiceList[i].DoctorID,
                            disableDelete:false

                        })
                        //$scope.BillDetails.ChargeList.push({    //
                        //    ChargeID: $scope.FillServiceList[i].ChargeID,
                        //    ChargeUnitID: $scope.FillServiceList[i].ChargeUnitID,

                        //})
                        $scope.BillDetails.TotalBillAmount = $scope.FillServiceList[i].TotalBillAmount;
                        $scope.BillDetails.NetBillAmount = $scope.FillServiceList[i].NetBillAmount;
                        $scope.BillDetails.TotalConcessionAmount = $scope.FillServiceList[i].TotalConcessionAmount;
                        $scope.BillDetails.BillBalanceAmount = $scope.FillServiceList[i].BillBalanceAmount;
                        $scope.BillDetails.PaidAmount = $scope.FillServiceList[i].PaidAmount;


                        $scope.BillDetails.IsFreezed = $scope.FillServiceList[i].IsFreezed;
                        if ($scope.BillDetails.IsFreezed) {
                            $scope.disableSave = true;
                            angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i) {
                                i.disableDelete = true;
                            })
                        }
                        else {
                            $scope.disableSave = false;
                            usSpinnerService.stop('GridSpinner');
                        }
                    }
                   
                    usSpinnerService.stop('GridSpinner');
                }
                // $rootScope.IsFromView = false;
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            })


        }
        else {        

            // $scope.selectedPatient = JSON.parse(sessionStorage.getItem("SavedPatientData"));
            //$scope.UID = localStorageService.get("UserInfo").UnitID;
            // $scope.patientCatID = localStorageService.get("UserInfo").RegID;
            var selectCouple = {};
            selectCouple = Common.getSelectedCouple();
            // var selectPatient = {};
            // selectPatient = Common.getSelectedPatient();

            //$scope.PatientName = $rootScope.PatientBillDetails.PatientName;
            var SelectedPatient = [];
            SelectedPatient = $rootScope.PatientBillDetails;
            $scope.PatientName = SelectedPatient.PatientName;
            $scope.Services = 1;
            // $scope.CatID = 5;
            $scope.GetServiceList();
            $scope.GetDocList();
            $scope.GetModeOfPayment();
            $scope.GetBankList();
           
            $scope.FillAdvanceList(); //Added by AniketK on 29Sept2020
            usSpinnerService.stop('GridSpinner');
        }
    }
    /*****************************************************************************************************************/
    //Added by AniketK on 29Sept2020
    $scope.FillAdvanceList = function FillAdvanceList() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = PatientAdvanceSrv.FillAdvanceList($scope.PatientData.PatID, $scope.PatientData.PatUnitID);
        ResponseData.then(function (Response) {
        usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {                
                $scope.AdvanceList = Response.data;
                $scope.BillDetails.TotalBalanceAdvance = 0;
                for(var i = 0; i<$scope.AdvanceList.length; i++){                    
                    $scope.BillDetails.TotalBalanceAdvance = $scope.BillDetails.TotalBalanceAdvance + $scope.AdvanceList[i].Balance;                                        
                }
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


    $scope.FillAdvanceList = function FillAdvanceList() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = PatientAdvanceSrv.FillAdvanceList($scope.PatientData.PatID, $scope.PatientData.PatUnitID);
        ResponseData.then(function (Response) {
        usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {                
                $scope.AdvanceList = Response.data;
                $scope.BillDetails.TotalBalanceAdvance = 0;
                for(var i = 0; i<$scope.AdvanceList.length; i++){                    
                    $scope.BillDetails.TotalBalanceAdvance = $scope.BillDetails.TotalBalanceAdvance + $scope.AdvanceList[i].Balance;                                        
                }
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


    $scope.FillAdvanceListNew = function FillAdvanceList(patient) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = PatientAdvanceSrv.FillAdvanceList(patient.ID, patient.UnitID);
        ResponseData.then(function (Response) {
       
            if (Response.data != null) {                
                $scope.AdvanceList = Response.data;
                $scope.BillDetails.TotalBalanceAdvance = 0;
                 usSpinnerService.stop('GridSpinner');
                for(var i = 0; i<$scope.AdvanceList.length; i++){                    
                    $scope.BillDetails.TotalBalanceAdvance = $scope.BillDetails.TotalBalanceAdvance + $scope.AdvanceList[i].Balance;                                        
                }
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
   /*****************************************************************************************************************/
    //Added by AniketK on 01OCt2020
    $scope.CalculateBalanceAmount = function(item, $index) {
        debugger;
        var sum = 0;
        for (var j = 0; j < $scope.tempAdvanceList.length; j++) {                  
             sum = sum + $scope.tempAdvanceList[j].ConsumeAmount;              
        }                  
        $scope.TotalConsumedAmount = sum;
        for (var i = 0; i < $scope.tempAdvanceList.length; i++) {
            if ($index == i && $scope.TotalConsumedAmount <= $scope.BillDetails.NetBillAmount && item.ConsumeAmount <= $scope.tempAdvanceList[i].Balance) {
                $scope.tempAdvanceList[i] = {
                                            AdvanceAgainst: $scope.tempAdvanceList[i].AdvanceAgainst,
                                            AdvanceID: $scope.tempAdvanceList[i].AdvanceID,
                                            AdvanceUnitID: $scope.tempAdvanceList[i].AdvanceUnitID,
                                            Balance: $scope.tempAdvanceList[i].Balance,
                                            BalanceAmount: $scope.tempAdvanceList[i].Balance - item.ConsumeAmount,
                                            ConsumeAmount: item.ConsumeAmount,
                                            Date: $scope.tempAdvanceList[i].Date,
                                            Remarks: $scope.tempAdvanceList[i].Remarks,
                                            UnitName: $scope.tempAdvanceList[i].UnitName,
                                            check : false}
            }
          
            else if($index == i){
                    AlertMessage.info(objResource.msgTitle, "Amount Exceeded.");
                    $scope.tempAdvanceList[i] = {
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
            if($index == i){
                break;
            }
        }       
    }
    /*****************************************************************************************************************/
    //Added by AniketK on 01OCt 2020
    $scope.AddAdvanceAutoConsumed = function(item, $index) {
        debugger;
       if(item.ConsumeAmount != null && item.ConsumeAmount != 0){
        if(item.check == true){
            for(var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length;i++){
                    if($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID == 0){
                        $scope.BillDetails.OtherSrvPaymentModeList.splice(i, 1);
                     }
            }
            $scope.TotalConsumedAmount = 0;
            for (var i = 0; i < $scope.tempAdvanceList.length; i++) {            
                $scope.TotalConsumedAmount = $scope.TotalConsumedAmount + $scope.tempAdvanceList[i].ConsumeAmount;               
            }
            for (var i = 0; i < $scope.tempAdvanceList.length; i++) {
               if($index == i && item.ConsumeAmount <= item.Balance && $scope.TotalConsumedAmount <= $scope.BillDetails.NetBillAmount){
                    for(var k = 0; k<$scope.ModeOfPaymentList.length;k++){
                        if($scope.ModeOfPaymentList[k].Description == "Advance")
                            $scope.PaymentModeID = $scope.ModeOfPaymentList[k].ID;
                    }
                    $scope.BillDetails.OtherSrvPaymentModeList.push({BankID: 0,  
                                                                    index : $index,
                                                                    CashMode: true,
                                                                    Date: "",
                                                                    DisableAmount: true,
                                                                    IsAmountNotFill: false,
                                                                    IsBankIDNotFill: false,
                                                                    IsDateIDNotFill: false,
                                                                    IsNumberNotFill: false,
                                                                    IsPaymentModeID: false,
                                                                    Number: "",
                                                                    PaidAmount: item.ConsumeAmount,
                                                                    PaymentModeID: $scope.PaymentModeID,
                                                                    AdvanceID : item.AdvanceID,
                                                                    AdvanceUnitID : item.AdvanceUnitID});
                }
                else if ($index == i && $scope.TotalConsumedAmount >= $scope.BillDetails.NetBillAmount){
                    AlertMessage.info(objResource.msgTitle, "Amount Exceeded.");
                  for (var l = 0; l < $scope.tempAdvanceList.length; l++) { 
                   if($index == l){
                        $scope.tempAdvanceList[l] = {
                                                    AdvanceAgainst: $scope.tempAdvanceList[l].AdvanceAgainst,
                                                    AdvanceID: $scope.tempAdvanceList[l].AdvanceID,
                                                    AdvanceUnitID: $scope.tempAdvanceList[l].AdvanceUnitID,
                                                    Balance: $scope.tempAdvanceList[l].Balance,
                                                    BalanceAmount: $scope.tempAdvanceList[l].Balance,
                                                    ConsumeAmount: '',
                                                    Date: $scope.tempAdvanceList[l].Date,
                                                    Remarks: $scope.tempAdvanceList[l].Remarks,
                                                    UnitName: $scope.tempAdvanceList[l].UnitName,
                                                    check : false}
                    }
                }                    
              }
                                                                                       
                if($index == i){
                   break;
                }
            }

        }
        else{
            for(var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++){
                if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == item.ConsumeAmount) {
                    $scope.BillDetails.OtherSrvPaymentModeList.splice(i, 1);
                     
                }
            }
            if($scope.BillDetails.OtherSrvPaymentModeList.length == 0){
                           $scope.BillDetails.OtherSrvPaymentModeList.push({BankID: 0,                                                                      
                                                                    CashMode: true,
                                                                    Date: "",
                                                                    DisableAmount: false,
                                                                    IsAmountNotFill: false,
                                                                    IsBankIDNotFill: false,
                                                                    IsDateIDNotFill: false,
                                                                    IsNumberNotFill: false,
                                                                    IsPaymentModeID: false,
                                                                    Number: "",
                                                                    PaidAmount: $scope.BillDetails.NetBillAmount,
                                                                    PaymentModeID: 0 });
           }
        }
       }
      else{
        AlertMessage.warning(objResource.msgTitle, "Enter Consumed Amount.");
        for (var i = 0; i < $scope.tempAdvanceList.length; i++) {
                        if($index == i){
                            $scope.tempAdvanceList[i] = {
                                                        AdvanceAgainst: $scope.tempAdvanceList[i].AdvanceAgainst,
                                                        AdvanceID: $scope.tempAdvanceList[i].AdvanceID,
                                                        AdvanceUnitID: $scope.tempAdvanceList[i].AdvanceUnitID,
                                                        Balance: $scope.tempAdvanceList[i].Balance,
                                                        BalanceAmount: $scope.tempAdvanceList[i].Balance,
                                                        ConsumeAmount: 0,
                                                        Date: $scope.tempAdvanceList[i].Date,
                                                        Remarks: $scope.tempAdvanceList[i].Remarks,
                                                        UnitName: $scope.tempAdvanceList[i].UnitName,
                                                        check : false}
                           $scope.tempAdvanceList[i].IsConsumedAmountRequired = true;
                        }                       
                        if($index == i){
                            break;
                        }
                    }
      }
    }
    /*****************************************************************************************************************/
    $scope.GetServiceList = function () {
       // debugger;
        $scope.IsFirstResponse = false;
        usSpinnerService.spin('GridSpinner');
        var Promise = ConsumptionService.GetServiceList();
        Promise.then(function (resp) {
            //$scope.GetAllResponse();
            $scope.ServiceList = resp.data;
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            $scope.IsFirstResponse = true;
            usSpinnerService.stop('GridSpinner');
        })
    }
    $scope.ShowPrescribedPage = function (value) {
        debugger;
        if (value == 'PrescribedPage') {


        }

    }



    //if ($scope.BillingList.VisitFromDate <= $scope.BillingList.VisitToDate) {

    //}
    //else {
    //    usSpinnerService.stop('GridSpinner');
    //    AlertMessage.warning(objResource.msgTitle, objResource.msgVisFrmDtGrtrThnVisToDt);
    //}


    $scope.SelectedServiceNew = function (selSer) {
        debugger;
        selSer.DoctorID =   $rootScope.DocId ;
       // if (checkServiceDuplicacy($scope.BillDetails.SelectedOtherServiceList, selSer)) {    //Removed as per discussion 
            $scope.BillDetails.SelectedOtherServiceList.push({
                ServiceID: selSer.Id,
                ServiceCode: selSer.ServiceCode,
                Service: selSer.Description,
                Quantity: 1,
                PlannedDate: new Date(),
                Instruction: '',
                BaseServiceRate: selSer.BaseServiceRate,
                ConcessionPercentage: 0,
                ConcessionAmount: 0,
                NetAmount: selSer.BaseServiceRate,
                PaidAmount: 0,
                BillBalanceAmount:0,
                // CategoryID: $scope.CatID,
                //chkSelect: false,
                ArttypeID: 0,
                ArtSubTypeID: 0,
                DonorID: 0,
                DonorUnitID: 0,
                OrderFrom: $rootScope.FormName,
                DoctorID: selSer.DoctorID
            });
            $scope.BaseServiceRate = selSer.BaseServiceRate;
            // $scope.DOCID = selSer.DoctorID;
         
            $scope.GetDocListNew();
       // }
        //else AlertMessage.info('PalashIVF', 'Service already added.');
    }




    $scope.SelectedService = function (selSer) {
        debugger;
        selSer.DoctorID = $scope.PatientData.DOCID  ;
       // if (checkServiceDuplicacy($scope.BillDetails.SelectedOtherServiceList, selSer)) {    //Removed as per discussion 
            $scope.BillDetails.SelectedOtherServiceList.push({
                ServiceID: selSer.Id,
                ServiceCode: selSer.ServiceCode,
                Service: selSer.Description,
                Quantity: 1,
                PlannedDate: new Date(),
                Instruction: '',
                BaseServiceRate: selSer.BaseServiceRate,
                ConcessionPercentage: 0,
                ConcessionAmount: 0,
                NetAmount: selSer.BaseServiceRate,
                PaidAmount: 0,
                BillBalanceAmount:0,
                // CategoryID: $scope.CatID,
                //chkSelect: false,
                ArttypeID: 0,
                ArtSubTypeID: 0,
                DonorID: 0,
                DonorUnitID: 0,
                OrderFrom: $rootScope.FormName,
                DoctorID: selSer.DoctorID
            });
            $scope.BaseServiceRate = selSer.BaseServiceRate;
            // $scope.DOCID = selSer.DoctorID;
            $scope.GetDocList();
          
       // }
        //else AlertMessage.info('PalashIVF', 'Service already added.');
    }
    function checkServiceDuplicacy(lst, selSer) {
        debugger;
        var isValid = true;
        lst.forEach(function (x) {
            if (x.Service == selSer.Description)
                isValid = false;
        })
        return isValid;
    }
$scope.isPaymentModeVisible = false;



   /***************************************************************************************************************/
   //Added by AniketK on 07Oct2020
   $scope.calConcessionPercentage = function(ConcessionAmount, BaseServiceRate, $index){
        debugger;
        if (ConcessionAmount == "" || ConcessionAmount == undefined) {
            //
            // AlertMessage.warning("PalashIVF", "Input is not in a correct format."); //Commented by swatih for localization 22/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgInputisnotinacorrectformat); //Modified by swatih for localization 22/7/2020
            $scope.IsNotFillConcession = true;
            $scope.disableClickNewBill = true;
            $scope.BillDetails.SelectedOtherServiceList[$index].ConcessionPercentage = 0.00;
            $scope.BillDetails.SelectedOtherServiceList[$index].NetAmount = ($scope.BillDetails.SelectedOtherServiceList[$index].BaseServiceRate).toFixed(2);
                       
        }
        else if (parseFloat(ConcessionAmount) == 0)
        {
            $scope.IsNotFillConcession = false;
            $scope.disableClickNewBill = false;
            $scope.BillDetails.SelectedOtherServiceList[$index].ConcessionPercentage = 0.00;
            $scope.BillDetails.SelectedOtherServiceList[$index].ConcessionAmount = 0.00;
            $scope.BillDetails.SelectedOtherServiceList[$index].NetAmount = ($scope.BillDetails.SelectedOtherServiceList[$index].BaseServiceRate).toFixed(2);
        }
        else if(parseFloat(ConcessionAmount) > BaseServiceRate){
            AlertMessage.warning(objResource.msgTitle, "Amount Exceded");
            $scope.BillDetails.SelectedOtherServiceList[$index].ConcessionAmount = ($scope.BillDetails.SelectedOtherServiceList[$index].BaseServiceRate).toFixed(2);
        }
        else if(parseFloat(ConcessionAmount) <= BaseServiceRate){
            var ConcessionAmount = $scope.BillDetails.SelectedOtherServiceList[$index].ConcessionAmount
            $scope.BillDetails.SelectedOtherServiceList[$index].NetAmount = ($scope.BillDetails.SelectedOtherServiceList[$index].BaseServiceRate - parseFloat(ConcessionAmount)).toFixed(2);
            $scope.BillDetails.SelectedOtherServiceList[$index].ConcessionPercentage = (100 - (($scope.BillDetails.SelectedOtherServiceList[$index].BaseServiceRate - parseFloat(ConcessionAmount)) * 100) / $scope.BillDetails.SelectedOtherServiceList[$index].BaseServiceRate).toFixed(2);
            //$scope.BillDetails.SelectedOtherServiceList[$index].ConcessionPercentage = ConcessionPercentage.toFixed(2);
        }
    }
   /***************************************************************************************************************/

    $scope.calConcessionAmt = function calConcessionAmt(ConPercentage, BaseServiceRate,idx) {
        debugger;
        if (ConPercentage != 0 && (ConPercentage == '' || ConPercentage == undefined)) {
            //
            // AlertMessage.warning("PalashIVF", "Input is not in a correct format."); //Commented by swatih for localization 22/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgInputisnotinacorrectformat); //Modified by swatih for localization 22/7/2020
            $scope.IsNotFillConcession = true;
            $scope.disableClickNewBill = true;
            $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionAmount = 0.00;
            $scope.BillDetails.SelectedOtherServiceList[idx].NetAmount = ($scope.BillDetails.SelectedOtherServiceList[idx].BaseServiceRate).toFixed(2);           
        }

        else if (parseFloat(ConPercentage) == 0)
        {
            $scope.IsNotFillConcession = false;
            $scope.disableClickNewBill = false;
            $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionPercentage = 0.00;
            $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionAmount = 0.00;
            $scope.BillDetails.SelectedOtherServiceList[idx].NetAmount = ($scope.BillDetails.SelectedOtherServiceList[idx].BaseServiceRate).toFixed(2);
        }
        

            
        else if (parseFloat(ConPercentage) >= 100) {
            ConPercentage = 100;
            $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionPercentage = 100;
            for (var i = 0; i <= idx; i++) {
                if (i == idx) {
                    if ($scope.BillDetails.SelectedOtherServiceList[idx].ConcessionPercentage == '' || $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionPercentage == '0') {
                        $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionAmount = ($scope.BillDetails.SelectedOtherServiceList[idx].BaseServiceRate).toFixed(2);;
                        $scope.BillDetails.SelectedOtherServiceList[idx].NetAmount = ($scope.BillDetails.SelectedOtherServiceList[idx].BaseServiceRate).toFixed(2);;
                    }
                    if ($scope.BillDetails.SelectedOtherServiceList[idx].ConcessionPercentage = 100) {
                        $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionAmount = ($scope.BillDetails.SelectedOtherServiceList[idx].BaseServiceRate).toFixed(2);
                        $scope.BillDetails.SelectedOtherServiceList[idx].NetAmount = ($scope.BillDetails.SelectedOtherServiceList[idx].BaseServiceRate - $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionAmount).toFixed(2);  //Added by Nayan Kamble on 05/04/2020
                    }


                }
                $scope.IsNotFillConcession = false;
                $scope.disableClickNewBill = false;
            }
           // return ConPercentage;
        }

        else {
            for (var i = 0; i <= idx; i++) {
                if (i == idx) {
                  //  $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionPercentage = parseFloat(ConPercentage);
                    if ($scope.BillDetails.SelectedOtherServiceList[idx].ConcessionPercentage == '' || $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionPercentage == '0') {
                        $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionAmount = 0;
                        $scope.BillDetails.SelectedOtherServiceList[idx].NetAmount = $scope.BillDetails.SelectedOtherServiceList[idx].BaseServiceRate;
                    }
                    else {
                        $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionAmount = ((ConPercentage / 100) * BaseServiceRate).toFixed(2);                        
                        $scope.BillDetails.SelectedOtherServiceList[idx].NetAmount = ($scope.BillDetails.SelectedOtherServiceList[idx].BaseServiceRate - $scope.BillDetails.SelectedOtherServiceList[idx].ConcessionAmount).toFixed(2);;
                    }


                }
                $scope.IsNotFillConcession = false;
                $scope.disableClickNewBill = false;
            }


        }
        // $scope.ConcessionAmount = (ConPercentage / 100) * BaseServiceRate;
        //$scope.NetAmount = $scope.BaseServiceRate - $scope.ConcessionAmount;

    }


    $scope.TotalAmt = function () {
        debugger;
        $scope.TotalBaseRate();
        // $scope.TotalConcession();
        // $scope.TotalPreOutstanding();
           
    }
    $scope.TotalBaseRate = function () {
        debugger;
        //console.log($scope.model[0].qty);
        var total = 0;
         $scope.disableClickNewBill = false;
        angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i, index) {
            if (i.BaseServiceRate == '' ||  i.BaseServiceRate == undefined)           //    i.BaseServiceRate == 0 ||
            {
                i.IsNotFillBaseServiceRate = true;
                i.NetAmount = 0;
            }
            else if (i.BaseServiceRate == 0) {
                i.IsNotFillBaseServiceRate = false;
                i.NetAmount = 0;
            }
            else {
            total = 0;
            total += parseFloat(i.BaseServiceRate);
            if (i.ConcessionPercentage == 0) {
                i.NetAmount = total;
            }
            else {
                $scope.calConcessionAmt(i.ConcessionPercentage, i.BaseServiceRate, index);
                i.NetAmount = parseFloat( i.BaseServiceRate - i.ConcessionAmount);
            }
            i.IsNotFillBaseServiceRate = false;
            $scope.disableClickNewBill = false;
        }
        })
        console.log(total);
        $scope.BillDetails.TotalBillAmount = total;
        //if()
        $scope.TotalConcession();

    }
    $scope.TotalConcession = function () {
        debugger;
        var total = 0;
        angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i, index) {
            total += parseFloat(i.ConcessionAmount);      // i.ConcessionPercentage);
        })
        console.log(total);
        $scope.BillDetails.TotalConcessionAmount = total;
        $scope.TotalPayable();
    }
    $scope.TotalPayable = function () {
        debugger;
        var total = 0;
        angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i, index) {
            total += parseFloat(i.NetAmount);
        })
        console.log(total);
        $scope.BillDetails.NetBillAmount = total;
        //$scope.BillDetails.PaidAmount = $scope.BillDetails.NetBillAmount;
        $scope.CalTotalBillAmt();
    }
    $scope.CalTotalBillAmt = function(){
        debugger;
        var total = 0;
        angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i, index) {
            total += parseFloat(i.BaseServiceRate);
        })
        console.log(total);
        $scope.BillDetails.TotalBillAmount = total;
   }


    $scope.calBaseRate = function () {
        debugger;
    }

    $scope.ValidateBill = function () {
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
                    // AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                    AlertMessage.warning(objResource.msgTitle.objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
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
                            //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
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
                            //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
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
                            // AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020

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
                            //AlertMessage.warning("PalashIVF", "Please fill mandatory fields");//Commented by swatih for localization 22/7/2020
                            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
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
                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
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

    $scope.ChangeAdvanceExceedFlag = function (i){
    debugger
    if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount >= $scope.BillDetails.OtherSrvPaymentModeList[i].AdvanceBalance) {
    debugger
                $scope.BillDetails.OtherSrvPaymentModeList[i].IsAdvanceExceeded = false
            }
             else {
        $scope.BillDetails.OtherSrvPaymentModeList[i].IsAdvanceExceeded = true;
    }
}

     $scope.SaveBillNew = function () {   //
        debugger;
        $scope.IsAmount=true;
        $scope.disableClickNewBill = true;
        
        if ($scope.btnSaveUpdate == "Update") {          ///Update
            //    $rootScope.IsFromView = true;
            $scope.BillDetails.BillID = $scope.PatientBillData.BillID;
            $scope.BillDetails.BillUnitID = $scope.PatientBillData.BillUnitID;
            $scope.BillDetails.ChargeID = $scope.PatientBillData.ChargeID;
            $scope.BillDetails.ChargeUnitID = $scope.PatientBillData.ChargeUnitID;
            // $scope.BillDetails.ChargeDetailID = $scope.PatientBillData.ChargeDetailID;
            //$scope.BillDetails.ChargeDetailUnitID = $scope.PatientBillData.ChargeDetailUnitID;
              for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
            if ($scope.BillDetails.OtherSrvPaymentModeList[i].IsAdvanceExceeded === true) {
                AlertMessage.warning(objResource.msgTitle, "Can't save because advance amount is less than the amount to be paid.");
                $scope.disableClickNewBill = false; // Re-enable the button
                return; // Exit the function
            }
        }
            if ($scope.BillDetails.IsFreezed && $scope.ValidateBill() ) {        // != undefined
                if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                    $scope.disableClickNewBill = true;
                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeList.push({    
                            'ServiceID': $scope.BillDetails.SelectedOtherServiceList[i].ServiceCode,
                            'ServiceName': $scope.BillDetails.SelectedOtherServiceList[i].Service,   //
                            // 'ChargeID': $scope.FillServiceList[i].ChargeID,
                            'ChargeID': $scope.FillServiceList.length > i ? $scope.FillServiceList[i].ChargeID : 0,   //   ($scope.FillServiceList[i].ChargeID)>0?($scope.FillServiceList[i].ChargeID):0,
                            //'ChargeUnitID': $scope.FillServiceList[i].ChargeUnitID,
                            'ChargeUnitID': $scope.FillServiceList.length > i ? $scope.FillServiceList[i].ChargeUnitID : 0,
                            //'DoctorID': $scope.PatientData.DOCID,
                            //'DoctorName': $scope.PatientData.DOCName,
                            'DoctorID': $scope.BillDetails.SelectedOtherServiceList[i].DoctorID,

                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionPercent': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionPercentage,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'TotalPaidPatientAmount': 0,
                            'TotalPatientBalanceAmount': 0
                            //'Status': $scope.BillDetails.SelectedOtherServiceList[i].Status
                        })
                        //if ($scope.BillDetails.DeletedServiceList.length > 0) {
                        //    for (var i = 0; i < $scope.BillDetails.DeletedServiceList.length; i++) {
                        //        $scope.ServiceCode = $scope.BillDetails.DeletedServiceList.ServiceCode;

                        //        var responseData = ConsumptionService.DeleteService($scope.PatientBillData.BillID, $scope.PatientBillData.BillUnitID,$scope.ServiceCode);
                        //        responseData.then(function (Response) {
                        //            if (Response.data == 1) {
                        //                AlertMessage.success(objResource.msgTitle, 'Record Deleted Successfully.');  
                        //            }
                        //            else {
                        //                $scope.Error = error;
                        //            }
                        //        }, function (error) {
                        //            AlertMessage.info('PalashIVF', 'Error Occured.');
                        //             usSpinnerService.stop('GridSpinner');
                        //        })

                        //    }
                        //}
                    }
                    $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                    $scope.TotalAmt1 = 0;
                    if ($scope.Total != null)
                        $scope.TotalAmt1 = $scope.Total;

                    $scope.ConsumeAmt = 0;
                    angular.forEach($scope.BillDetails.ChargeList, function (item) {
                        if ($scope.TotalAmt1 > 0) {
                            $scope.ConsumeAmt = $scope.BillDetails.NetBillAmount;
                            if ($scope.TotalAmt1 >= $scope.ConsumeAmt) {
                                $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;

                            }
                            else {
                                $scope.ConsumeAmt = $scope.TotalAmt1;
                                $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                            }
                            //item.ServicePaidAmount = Math.round($scope.ConsumeAmt, 2); // modify on 26082018 for balance amount issue while pay the bill
                            //item.BalanceAmount = $scope.BillDetails.NetBillAmount - item.ServicePaidAmount;
                            //item.ChkID = true;
                            item.TotalPaidPatientAmount = Math.round($scope.ConsumeAmt, 2);
                            item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;

                        }
                        else {

                            // item.BalanceAmount = item.NetAmount;
                            item.TotalPatientBalanceAmount = item.NetAmount;
                        }

                    })

                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++){
                        $scope.BillDetails.ChargeDetailsList.push({
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount
                        })
                    }

                    for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                        if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.BillDetails.NetBillAmount) {
                            $scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;
                        }
                        else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
                            //$scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount;
                            $scope.BillDetails.Payment.BillBalanceAmount = 0;
                        }
                            //else AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                        else AlertMessage.info(objResource.msgTitle, objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020
                
                        $scope.BillDetails.Payment.push({
                            'BillAmount':$scope.BillDetails.NetBillAmount,
                            'BillBalanceAmount':$scope.BillDetails.NetBillAmount - $scope.Total             // $scope.BillDetails.Payment.BillBalanceAmount
                        });
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.Payment[0].BillBalanceAmount;
                        //$scope.IsSettleBill[i] = false;
                    }
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.NetBillAmount;
                        // $scope.IsSettleBill = true;
                    }
            

                    //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    //    $scope.BillDetails.OtherSrvPaymentModeList.push({
                    //        'Date': $scope.BillDetails.OtherSrvPaymentModeList[i].Date,
                    //        'PaymentModeID': $scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID,
                    //        'Number': $scope.BillDetails.OtherSrvPaymentModeList[i].Number,
                    //        'BankID': $scope.BillDetails.OtherSrvPaymentModeList[i].BankID,
                    //        'PaidAmount': $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount
                    //    })
                    //}
                    usSpinnerService.spin('GridSpinner');
                    var Promise = ConsumptionService.UpdateBill($scope.BillDetails);
                    Promise.then(function (resp) {
                        debugger;
                        if (resp.data == 2) {
                            usSpinnerService.stop('GridSpinner');
                            // AlertMessage.success('Palash IVF', 'Bill Updated successfully.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgBillUpdatedsuccessfully); //Modified by swatih for localization 22/7/2020
                            $scope.ClearSaveBill();
                            //$scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID);
                            if ($scope.BillDetails.IsFreezed) {
                                // $scope.PrintBill();
                                $scope.PrintNewBillforNewScreen();
                            }
                            usSpinnerService.stop('GridSpinner');
                            $location.path("/PatientBillList");

                        }
                        else {
                            // AlertMessage.success('Palash IVF', 'Error Occured.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objresource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 22/7/2020
                            usSpinnerService.stop('GridSpinner');
                            $scope.ClearSaveBill();
                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.ClearSaveBill();
                    })
                }

                    


                else {
                    //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                    $scope.ClearSaveBill();
                }
           // }   // close validate 

            }
            else if ($scope.IsPaymentModeID) {
                //AlertMessage.info('PalashIVF', 'Enter Payment Mode.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEnterPaymentMode); //Modified by swatih for localization 22/7/2020
            }
            else if (!$scope.IsAmount) {
                $scope.disableClickNewBill = false;
                //AlertMessage.info('PalashIVF', 'Enter the amount.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEntertheamount); //Modified by swatih for localization 22/7/2020
            }
            else if ($scope.IsAmountNotFill || $scope.IsNumberNotFill || $scope.IsBankIDNotFill || $scope.IsDateIDNotFill) {
                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
            }
            else if ($scope.IsExceed) {
                //AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020
                $scope.tempPaymentLst = [];
                for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 1) {
                        $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.NetBillAmount;
                    }
                    else {
                        if (i != $scope.PaymentIndex) {
                            $scope.tempPaymentLst.push($scope.BillDetails.OtherSrvPaymentModeList[i])

                        }
                    }
                }

                $scope.Total = 0;    //
                for (var i = 0; i < $scope.tempPaymentLst.length; i++) {
                    //$scope.SumOfPayment = parseFloat($scope.BillDetails.NetBillAmount - $scope.tempPaymentLst[i].PaidAmount);

                    $scope.Total = parseFloat($scope.Total) + parseFloat($scope.tempPaymentLst[i].PaidAmount);

                }
                $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.NetBillAmount - $scope.Total;
                // }
                $scope.disableClickNewBill = false;

            }
                //else if ($scope.IsNotFillConcession || $scope.IsNotFillBaseServiceRate) {
                //    AlertMessage.warning("PalashIVF", "Input is not in a correct format.");
                //}           

            else {

                for(var i = 0; i < $scope.BillDetails.SelectedOtherServiceList.length ; i++){              
                    if ($scope.BillDetails.SelectedOtherServiceList[i].IsNotFillBaseServiceRate)
                    {
                        //AlertMessage.warning("PalashIVF", "Input is not in a correct format."); //Commented by swatih for localization 22/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgInputisnotinacorrectformat); //Modified by swatih for localization 22/7/2020
                        $scope.IsProceedBill = false;
                        break;
                    }

                    $scope.IsProceedBill = true;
                    $scope.disableClickNewBill = false;


                }
               

                if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                    if ($scope.IsProceedBill) {
                        $scope.disableClickNewBill = true;
                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeList.push({
                            'ServiceID': $scope.BillDetails.SelectedOtherServiceList[i].ServiceCode,
                            'ServiceName': $scope.BillDetails.SelectedOtherServiceList[i].Service,   //
                            // 'ChargeID': $scope.FillServiceList[i].ChargeID,
                            'ChargeID': $scope.FillServiceList.length > i ? $scope.FillServiceList[i].ChargeID : 0,   //   ($scope.FillServiceList[i].ChargeID)>0?($scope.FillServiceList[i].ChargeID):0,
                            //'ChargeUnitID': $scope.FillServiceList[i].ChargeUnitID,
                            'ChargeUnitID': $scope.FillServiceList.length > i ? $scope.FillServiceList[i].ChargeUnitID : 0,
                            // 'DoctorID': $scope.PatientData.DOCID,
                            'DoctorID': $scope.BillDetails.SelectedOtherServiceList[i].DoctorID,
                            //'DoctorName': $scope.PatientData.DOCName,
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionPercent': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionPercentage,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount
                        })
                    }

                    //if ($scope.BillDetails.DeletedServiceList.length > 0) {
                    //    for (var i = 0; i < $scope.BillDetails.DeletedServiceList.length; i++) {
                    //        $scope.ServiceCode = $scope.BillDetails.DeletedServiceList[i].ServiceCode;        commented by Nayan on 03/02/2020



                            if (DeletedServiceList.length > 0) {
                                for (var i = 0; i < DeletedServiceList.length; i++) {
                                    $scope.ServiceCode = DeletedServiceList[i].ServiceCode;


                            var responseData = ConsumptionService.DeleteService($scope.PatientBillData.BillID, $scope.PatientBillData.BillUnitID, $scope.ServiceCode);
                            responseData.then(function (Response) {
                                if (Response.data == 1) {
                                    // AlertMessage.success(objResource.msgTitle, 'Record Deleted Successfully.');
                                    usSpinnerService.stop('GridSpinner');
                                    if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                                        angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i, index) {
                                            $scope.calConcessionAmt(i.ConcessionPercentage, i.BaseServiceRate, index);

                                        })
                                    }
                                    $scope.ClearSaveBill();
                                }
                                else {
                                    $scope.Error = error;
                                    usSpinnerService.stop('GridSpinner');
                                    $scope.ClearSaveBill();
                                }
                            }, function (error) {
                                //AlertMessage.info('PalashIVF', 'Error Occured.');
                                usSpinnerService.stop('GridSpinner');
                                $scope.ClearSaveBill();
                            })

                        }
                    }



                    //$scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                    //$scope.TotalAmt1 = 0;
                    //if ($scope.Total != null)
                    //    $scope.TotalAmt1 = $scope.Total;
                    //$scope.ConsumeAmt = 0;
                    //angular.forEach($scope.BillDetails.ChargeList, function (item) {
                    //    if ($scope.TotalAmt1 > 0) {
                    //        $scope.ConsumeAmt = $scope.BillDetails.NetBillAmount;
                    //        if ($scope.TotalAmt1 >= $scope.ConsumeAmt) {
                    //            $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                    //        }
                    //        else {
                    //            $scope.ConsumeAmt = $scope.TotalAmt1;
                    //            $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                    //        }
                    //        //item.ServicePaidAmount = Math.round($scope.ConsumeAmt, 2); // modify on 26082018 for balance amount issue while pay the bill
                    //        //item.BalanceAmount = $scope.BillDetails.NetBillAmount - item.ServicePaidAmount;
                    //        //item.ChkID = true;
                    //        item.TotalPaidPatientAmount = Math.round($scope.ConsumeAmt, 2);
                    //        item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;
                    //    }
                    //    else {
                    //        // item.BalanceAmount = item.NetAmount;
                    //        item.TotalPatientBalanceAmount = item.NetAmount;
                    //    }
                    //})

                    
                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeDetailsList.push({
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount
                        })
                    }

                    for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                        if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.BillDetails.NetBillAmount) {
                            $scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;
                        }
                        else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
                            //$scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount;
                            $scope.BillDetails.Payment.BillBalanceAmount = 0;
                        }
                            //else AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                        else AlertMessage.info(objResource.msgTitle.objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020

                        $scope.BillDetails.Payment.push({
                            'BillAmount': $scope.BillDetails.NetBillAmount,
                            'BillBalanceAmount': $scope.BillDetails.Payment.BillBalanceAmount
                        });
                        //$scope.IsSettleBill[i] = false;
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.Payment[0].BillBalanceAmount;
                    }
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.NetBillAmount;
                        // $scope.IsSettleBill = true;
                    }


                    //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    //    $scope.BillDetails.OtherSrvPaymentModeList.push({
                    //        'Date': $scope.BillDetails.OtherSrvPaymentModeList[i].Date,
                    //        'PaymentModeID': $scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID,
                    //        'Number': $scope.BillDetails.OtherSrvPaymentModeList[i].Number,
                    //        'BankID': $scope.BillDetails.OtherSrvPaymentModeList[i].BankID,
                    //        'PaidAmount': $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount
                    //    })
                    //}

                    var Promise = ConsumptionService.UpdateBill($scope.BillDetails);
                    Promise.then(function (resp) {
                        debugger;
                        if (resp.data == 2) {
                            usSpinnerService.stop('GridSpinner');
                            // AlertMessage.success('Palash IVF', 'Bill Updated successfully.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgBillUpdatedsuccessfully); //Modified by swatih for localization 22/7/2020
                            //$scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID);
                            if ($scope.BillDetails.IsFreezed) {
                                // $scope.PrintBill();
                                $scope.PrintNewBillforNewScreen();
                            }
                            usSpinnerService.stop('GridSpinner');
                            $location.path("/PatientBillList");
                            $scope.ClearSaveBill();

                        }
                        else {
                            //AlertMessage.success('Palash IVF', 'Error Occured.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 22/7/2020
                            usSpinnerService.stop('GridSpinner');
                            $scope.ClearSaveBill();
                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.ClearSaveBill();
                    })
                }
            }
                else {
                    //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                    AlertMessage.info(objResource.msgTitle, obResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                    usSpinnerService.stop('GridSpinner');
                    $scope.ClearSaveBill();
                }




            }

        }

            //}

            // }
        else {
            for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                if ($scope.BillDetails.OtherSrvPaymentModeList[i].IsAdvanceExceeded === true) {
                    AlertMessage.warning(objResource.msgTitle, "Can't save because advance amount is less than the amount to be paid.");
                    $scope.disableClickNewBill = false; // Re-enable the button
                    return; // Exit the function
                }//Save
                }
            if ($scope.BillDetails.IsFreezed != undefined && $scope.ValidateBill()) {
                //if ($scope.ValidateBill()) {
                $scope.disableClickNewBill = true;

                    if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                        for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                            $scope.BillDetails.ChargeList.push({
                                'ServiceID': $scope.BillDetails.SelectedOtherServiceList[i].ServiceCode,
                                'ServiceName': $scope.BillDetails.SelectedOtherServiceList[i].Service,   //
                                //'DoctorID': $scope.PatientData.DOCID,
                                'DoctorID': $scope.BillDetails.SelectedOtherServiceList[i].DoctorID,
                                //'DoctorName': $scope.PatientData.DOCName,
                                'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                                'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                                'ConcessionPercent': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionPercentage,
                                'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                                'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                                'TotalPaidPatientAmount': 0,
                                'TotalPatientBalanceAmount': 0
                            })
                        }
                        //     $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order


                        $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                        $scope.TotalAmt1 = 0;
                        if ($scope.Total != null)
                            $scope.TotalAmt1 = $scope.Total;

                        $scope.ConsumeAmt = 0;
                        angular.forEach($scope.BillDetails.ChargeList, function (item) {
                            if ($scope.TotalAmt1 > 0) {
                                $scope.ConsumeAmt = $scope.BillDetails.NetBillAmount;
                                if ($scope.TotalAmt1 >= $scope.ConsumeAmt) {
                                    $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;

                                }
                                else {
                                    $scope.ConsumeAmt = $scope.TotalAmt1;
                                    $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                                }
                                //item.ServicePaidAmount = Math.round($scope.ConsumeAmt, 2); // modify on 26082018 for balance amount issue while pay the bill
                                //item.BalanceAmount = $scope.BillDetails.NetBillAmount - item.ServicePaidAmount;
                                //item.ChkID = true;
                                item.TotalPaidPatientAmount = Math.round($scope.ConsumeAmt, 2);
                                item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;

                            }
                            else {

                                // item.BalanceAmount = item.NetAmount;
                                item.TotalPatientBalanceAmount = item.NetAmount;
                            }

                        })




                        for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                            $scope.BillDetails.ChargeDetailsList.push({
                                'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                                'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                                'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                                'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,

                                //'PatientPaidAmount': $scope.BillDetails.ChargeList[i].TotalPaidPatientAmount,
                                //'PatientBalanceAmount': $scope.BillDetails.ChargeList[i].TotalPatientBalanceAmount

                            })
                        }

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


                        //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                        //    $scope.BillDetails.OtherSrvPaymentModeList.push({
                        //        'Date': $scope.BillDetails.OtherSrvPaymentModeList[i].Date,
                        //        'PaymentModeID': $scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID,
                        //        'Number': $scope.BillDetails.OtherSrvPaymentModeList[i].Number,
                        //        'BankID': $scope.BillDetails.OtherSrvPaymentModeList[i].BankID,
                        //        'PaidAmount': $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount
                        //    })
                        //}
                        debugger;
                        ////Begin :: Added by AniketK on 06Oct2020
                        //for(var i = 0; i<$scope.BillDetails.lsttempAdvanceList.length;i++){
                        //    $scope.BillDetails.lsttempAdvanceList.splice(i, 1);
                        //}
                        //$scope.BillDetails.lsttempAdvanceList.push($scope.tempAdvanceList);
                        //End :: Added by AniketK on 06Oct2020
                        var Promise = ConsumptionService.SaveBill($scope.BillDetails);
                        Promise.then(function (resp) {
                            debugger;
                            // if (resp.data == 1) {
                            if (resp.data > 0) {

                                usSpinnerService.stop('GridSpinner');
                                //AlertMessage.success('Palash IVF', 'Bill saved successfully.'); //Commented by swatih for localization 22/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgBillsavedsuccessfully); //Modified by swatih for localization 22/7/2020

                                // $scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID); 
                                if ($scope.BillDetails.IsFreezed) {
                                    $scope.IsTempBillID = true;
                                    $scope.TempBillID = resp.data;
                                    $scope.PrintNewBillforNewScreen();
                                }
                                usSpinnerService.stop('GridSpinner');
                                $location.path("/PatientBillList");
                                $scope.ClearSaveBill();
                            }
                            else {
                                // AlertMessage.success('Palash IVF', 'Error Occured.'); //Commented by swatih for localization 22/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 22/7/2020
                                usSpinnerService.stop('GridSpinner');
                                $scope.ClearSaveBill();
                            }
                        }, function (error) {
                            usSpinnerService.stop('GridSpinner');
                            $scope.ClearSaveBill();
                        })
                    }
                    else {
                        //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                        AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                        usSpinnerService.stop('GridSpinner');
                        $scope.ClearSaveBill();
                    }
           
            }   ///
            else if ($scope.IsPaymentModeID ) {
                //AlertMessage.info('PalashIVF', 'Enter Payment Mode.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEnterPaymentMode); //Modified by swatih for localization 22/7/2020
                $scope.disableClickNewBill = false;
            }
            else if(!$scope.IsAmount){
                // AlertMessage.info('PalashIVF', 'Enter the Amount.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEntertheamount); //Modified by swatih for localization 22/7/2020
                $scope.disableClickNewBill = false;
            }
            else if ($scope.IsAmountNotFill || $scope.IsNumberNotFill || $scope.IsBankIDNotFill || $scope.IsDateIDNotFill) {
                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
                $scope.disableClickNewBill = false;
            }
            else if ($scope.IsExceed) {
                //AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020
                $scope.disableClickNewBill = false;
                $scope.tempPaymentLst = [];
                for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 1) {   
                        $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.NetBillAmount;
                    }
                    else {
                        if (i != $scope.PaymentIndex) {
                            $scope.tempPaymentLst.push($scope.BillDetails.OtherSrvPaymentModeList[i])               

                        }
                    }               
                }
                
                $scope.Total = 0;    //
                for (var i = 0; i < $scope.tempPaymentLst.length; i++) {
                    //$scope.SumOfPayment = parseFloat($scope.BillDetails.NetBillAmount - $scope.tempPaymentLst[i].PaidAmount);

                    $scope.Total = parseFloat($scope.Total) + parseFloat($scope.tempPaymentLst[i].PaidAmount);

                }
                $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.NetBillAmount - $scope.Total;
               // }
            
                $scope.disableClickNewBill = false;
            }
            else if ($scope.IsNotFillConcession || $scope.IsNotFillBaseServiceRate) {
                //AlertMessage.warning("PalashIVF", "Input is not in a correct format."); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle,objResource.msgInputisnotinacorrectformat); //Modified by swatih for localization 22/7/2020
            }
            else {

                for(var i = 0; i < $scope.BillDetails.SelectedOtherServiceList.length ; i++){
                    if ($scope.BillDetails.SelectedOtherServiceList[i].IsNotFillBaseServiceRate) {
                        //AlertMessage.warning("PalashIVF", "Input is not in a correct format."); //Commented by swatih for localization 22/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgInputisnotinacorrectformat); //Modified by swatih for localization 22/7/2020
                        $scope.IsProceedBill = false;
                        break;
                    }
                    $scope.IsProceedBill = true;
                    $scope.disableClickNewBill = false;
                }
                

              


                // gh g
                if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                    if ($scope.IsProceedBill) {
                        $scope.disableClickNewBill = true;
                    


                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeList.push({
                            'ServiceID': $scope.BillDetails.SelectedOtherServiceList[i].ServiceCode,
                            'ServiceName': $scope.BillDetails.SelectedOtherServiceList[i].Service,   //
                            //'DoctorID': $scope.PatientData.DOCID,
                            'DoctorID': $scope.BillDetails.SelectedOtherServiceList[i].DoctorID,
                           // 'DoctorName': $scope.PatientData.DOCName,
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionPercent': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionPercentage,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'TotalPaidPatientAmount': 0,
                            'TotalPatientBalanceAmount': 0
                        })
                    }
                    //     $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order


                    $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                    $scope.TotalAmt1 = 0;
                    if ($scope.Total != null)
                        $scope.TotalAmt1 = $scope.Total;

                    $scope.ConsumeAmt = 0;
                    angular.forEach($scope.BillDetails.ChargeList, function (item) {
                        if ($scope.TotalAmt1 > 0) {
                            $scope.ConsumeAmt = $scope.BillDetails.NetBillAmount;
                            if ($scope.TotalAmt1 >= $scope.ConsumeAmt) {
                                $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;

                            }
                            else {
                                $scope.ConsumeAmt = $scope.TotalAmt1;
                                $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                            }
                            //item.ServicePaidAmount = Math.round($scope.ConsumeAmt, 2); // modify on 26082018 for balance amount issue while pay the bill
                            //item.BalanceAmount = $scope.BillDetails.NetBillAmount - item.ServicePaidAmount;
                            //item.ChkID = true;
                            item.TotalPaidPatientAmount = Math.round($scope.ConsumeAmt, 2);
                            item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;

                        }
                        else {

                            // item.BalanceAmount = item.NetAmount;
                            item.TotalPatientBalanceAmount = item.NetAmount;
                        }

                    })




                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeDetailsList.push({
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,

                            //'PatientPaidAmount': $scope.BillDetails.ChargeList[i].TotalPaidPatientAmount,
                            //'PatientBalanceAmount': $scope.BillDetails.ChargeList[i].TotalPatientBalanceAmount

                        })
                    }

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
                            'BillBalanceAmount': $scope.BillDetails.Payment.BillBalanceAmount
                        });
                        // $scope.IsSettleBill[i] = false;
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.Payment[0].BillBalanceAmount;
                    }
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.NetBillAmount;
                        //$scope.IsSettleBill = true;
                    }


                    //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    //    $scope.BillDetails.OtherSrvPaymentModeList.push({
                    //        'Date': $scope.BillDetails.OtherSrvPaymentModeList[i].Date,
                    //        'PaymentModeID': $scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID,
                    //        'Number': $scope.BillDetails.OtherSrvPaymentModeList[i].Number,
                    //        'BankID': $scope.BillDetails.OtherSrvPaymentModeList[i].BankID,
                    //        'PaidAmount': $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount
                    //    })
                    //}

                    var Promise = ConsumptionService.SaveBill($scope.BillDetails);
                    Promise.then(function (resp) {
                        debugger;
                        //if (resp.data == 1) {
                            if (resp.data > 0) {
                            usSpinnerService.stop('GridSpinner');
                                //AlertMessage.success('Palash IVF', 'Bill saved successfully.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgBillsavedsuccessfully); //Modified by swatih for localization 22/7/2020

                            // $scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID); 
                            if ($scope.BillDetails.IsFreezed) {
                                $scope.PrintNewBillforNewScreen();
                            }
                            usSpinnerService.stop('GridSpinner');
                            $location.path("/PatientBillList");
                            $scope.ClearSaveBill();
                        }
                        else {
                                //AlertMessage.success('Palash IVF', 'Error Occured.'); //Commented by swatih for localization 22/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 22/7/2020
                            usSpinnerService.stop('GridSpinner');
                            $scope.ClearSaveBill();
                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.ClearSaveBill();
                    })
                }
            }
                else {
                    //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                    usSpinnerService.stop('GridSpinner');
                    $scope.ClearSaveBill();
                }



            }
            
            }
            
        //}
           // }
            //else {
            //    AlertMessage.info('Palash IVF', 'Add atleast 1 service.');
            //}
        }










    $scope.SaveBill = function () {   //
        debugger;
        $scope.IsAmount=true;
        $scope.disableClickNewBill = true;
        
        if ($scope.btnSaveUpdate == "Update") {          ///Update
            //    $rootScope.IsFromView = true;
            $scope.BillDetails.BillID = $scope.PatientBillData.BillID;
            $scope.BillDetails.BillUnitID = $scope.PatientBillData.BillUnitID;
            $scope.BillDetails.ChargeID = $scope.PatientBillData.ChargeID;
            $scope.BillDetails.ChargeUnitID = $scope.PatientBillData.ChargeUnitID;
            // $scope.BillDetails.ChargeDetailID = $scope.PatientBillData.ChargeDetailID;
            //$scope.BillDetails.ChargeDetailUnitID = $scope.PatientBillData.ChargeDetailUnitID;

            if ($scope.BillDetails.IsFreezed && $scope.ValidateBill() ) {        // != undefined
                if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                    $scope.disableClickNewBill = true;
                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeList.push({    
                            'ServiceID': $scope.BillDetails.SelectedOtherServiceList[i].ServiceCode,
                            'ServiceName': $scope.BillDetails.SelectedOtherServiceList[i].Service,   //
                            // 'ChargeID': $scope.FillServiceList[i].ChargeID,
                            'ChargeID': $scope.FillServiceList.length > i ? $scope.FillServiceList[i].ChargeID : 0,   //   ($scope.FillServiceList[i].ChargeID)>0?($scope.FillServiceList[i].ChargeID):0,
                            //'ChargeUnitID': $scope.FillServiceList[i].ChargeUnitID,
                            'ChargeUnitID': $scope.FillServiceList.length > i ? $scope.FillServiceList[i].ChargeUnitID : 0,
                            //'DoctorID': $scope.PatientData.DOCID,
                            //'DoctorName': $scope.PatientData.DOCName,
                            'DoctorID': $scope.BillDetails.SelectedOtherServiceList[i].DoctorID,

                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionPercent': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionPercentage,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'TotalPaidPatientAmount': 0,
                            'TotalPatientBalanceAmount': 0
                            //'Status': $scope.BillDetails.SelectedOtherServiceList[i].Status
                        })
                        //if ($scope.BillDetails.DeletedServiceList.length > 0) {
                        //    for (var i = 0; i < $scope.BillDetails.DeletedServiceList.length; i++) {
                        //        $scope.ServiceCode = $scope.BillDetails.DeletedServiceList.ServiceCode;

                        //        var responseData = ConsumptionService.DeleteService($scope.PatientBillData.BillID, $scope.PatientBillData.BillUnitID,$scope.ServiceCode);
                        //        responseData.then(function (Response) {
                        //            if (Response.data == 1) {
                        //                AlertMessage.success(objResource.msgTitle, 'Record Deleted Successfully.');  
                        //            }
                        //            else {
                        //                $scope.Error = error;
                        //            }
                        //        }, function (error) {
                        //            AlertMessage.info('PalashIVF', 'Error Occured.');
                        //             usSpinnerService.stop('GridSpinner');
                        //        })

                        //    }
                        //}
                    }
                    $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                    $scope.TotalAmt1 = 0;
                    if ($scope.Total != null)
                        $scope.TotalAmt1 = $scope.Total;

                    $scope.ConsumeAmt = 0;
                    angular.forEach($scope.BillDetails.ChargeList, function (item) {
                        if ($scope.TotalAmt1 > 0) {
                            $scope.ConsumeAmt = $scope.BillDetails.NetBillAmount;
                            if ($scope.TotalAmt1 >= $scope.ConsumeAmt) {
                                $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;

                            }
                            else {
                                $scope.ConsumeAmt = $scope.TotalAmt1;
                                $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                            }
                            //item.ServicePaidAmount = Math.round($scope.ConsumeAmt, 2); // modify on 26082018 for balance amount issue while pay the bill
                            //item.BalanceAmount = $scope.BillDetails.NetBillAmount - item.ServicePaidAmount;
                            //item.ChkID = true;
                            item.TotalPaidPatientAmount = Math.round($scope.ConsumeAmt, 2);
                            item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;

                        }
                        else {

                            // item.BalanceAmount = item.NetAmount;
                            item.TotalPatientBalanceAmount = item.NetAmount;
                        }

                    })

                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++){
                        $scope.BillDetails.ChargeDetailsList.push({
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount
                        })
                    }

                    for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                        if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.BillDetails.NetBillAmount) {
                            $scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;
                        }
                        else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
                            //$scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount;
                            $scope.BillDetails.Payment.BillBalanceAmount = 0;
                        }
                            //else AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                        else AlertMessage.info(objResource.msgTitle, objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020
                
                        $scope.BillDetails.Payment.push({
                            'BillAmount':$scope.BillDetails.NetBillAmount,
                            'BillBalanceAmount':$scope.BillDetails.NetBillAmount - $scope.Total             // $scope.BillDetails.Payment.BillBalanceAmount
                        });
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.Payment[0].BillBalanceAmount;
                        //$scope.IsSettleBill[i] = false;
                    }
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.NetBillAmount;
                        // $scope.IsSettleBill = true;
                    }
            

                    //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    //    $scope.BillDetails.OtherSrvPaymentModeList.push({
                    //        'Date': $scope.BillDetails.OtherSrvPaymentModeList[i].Date,
                    //        'PaymentModeID': $scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID,
                    //        'Number': $scope.BillDetails.OtherSrvPaymentModeList[i].Number,
                    //        'BankID': $scope.BillDetails.OtherSrvPaymentModeList[i].BankID,
                    //        'PaidAmount': $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount
                    //    })
                    //}
                    usSpinnerService.spin('GridSpinner');
                    var Promise = ConsumptionService.UpdateBill($scope.BillDetails);
                    Promise.then(function (resp) {
                        debugger;
                        if (resp.data == 2) {
                            usSpinnerService.stop('GridSpinner');
                            // AlertMessage.success('Palash IVF', 'Bill Updated successfully.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgBillUpdatedsuccessfully); //Modified by swatih for localization 22/7/2020
                            $scope.ClearSaveBill();
                            //$scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID);
                            if ($scope.BillDetails.IsFreezed) {
                                // $scope.PrintBill();
                                $scope.PrintNewBill();
                            }
                            usSpinnerService.stop('GridSpinner');
                            $location.path("/PatientBillList");

                        }
                        else {
                            // AlertMessage.success('Palash IVF', 'Error Occured.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objresource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 22/7/2020
                            usSpinnerService.stop('GridSpinner');
                            $scope.ClearSaveBill();
                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.ClearSaveBill();
                    })
                }

                    


                else {
                    //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                    $scope.ClearSaveBill();
                }
           // }   // close validate 

            }
            else if ($scope.IsPaymentModeID) {
                //AlertMessage.info('PalashIVF', 'Enter Payment Mode.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEnterPaymentMode); //Modified by swatih for localization 22/7/2020
            }
            else if (!$scope.IsAmount) {
                $scope.disableClickNewBill = false;
                //AlertMessage.info('PalashIVF', 'Enter the amount.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEntertheamount); //Modified by swatih for localization 22/7/2020
            }
            else if ($scope.IsAmountNotFill || $scope.IsNumberNotFill || $scope.IsBankIDNotFill || $scope.IsDateIDNotFill) {
                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
            }
            else if ($scope.IsExceed) {
                //AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020
                $scope.tempPaymentLst = [];
                for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 1) {
                        $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.NetBillAmount;
                    }
                    else {
                        if (i != $scope.PaymentIndex) {
                            $scope.tempPaymentLst.push($scope.BillDetails.OtherSrvPaymentModeList[i])

                        }
                    }
                }

                $scope.Total = 0;    //
                for (var i = 0; i < $scope.tempPaymentLst.length; i++) {
                    //$scope.SumOfPayment = parseFloat($scope.BillDetails.NetBillAmount - $scope.tempPaymentLst[i].PaidAmount);

                    $scope.Total = parseFloat($scope.Total) + parseFloat($scope.tempPaymentLst[i].PaidAmount);

                }
                $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.NetBillAmount - $scope.Total;
                // }
                $scope.disableClickNewBill = false;

            }
                //else if ($scope.IsNotFillConcession || $scope.IsNotFillBaseServiceRate) {
                //    AlertMessage.warning("PalashIVF", "Input is not in a correct format.");
                //}           

            else {

                for(var i = 0; i < $scope.BillDetails.SelectedOtherServiceList.length ; i++){              
                    if ($scope.BillDetails.SelectedOtherServiceList[i].IsNotFillBaseServiceRate)
                    {
                        //AlertMessage.warning("PalashIVF", "Input is not in a correct format."); //Commented by swatih for localization 22/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgInputisnotinacorrectformat); //Modified by swatih for localization 22/7/2020
                        $scope.IsProceedBill = false;
                        break;
                    }
                    $scope.IsProceedBill = true;
                    $scope.disableClickNewBill = false;


                }
               

                if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                    if ($scope.IsProceedBill) {
                        $scope.disableClickNewBill = true;
                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeList.push({
                            'ServiceID': $scope.BillDetails.SelectedOtherServiceList[i].ServiceCode,
                            'ServiceName': $scope.BillDetails.SelectedOtherServiceList[i].Service,   //
                            // 'ChargeID': $scope.FillServiceList[i].ChargeID,
                            'ChargeID': $scope.FillServiceList.length > i ? $scope.FillServiceList[i].ChargeID : 0,   //   ($scope.FillServiceList[i].ChargeID)>0?($scope.FillServiceList[i].ChargeID):0,
                            //'ChargeUnitID': $scope.FillServiceList[i].ChargeUnitID,
                            'ChargeUnitID': $scope.FillServiceList.length > i ? $scope.FillServiceList[i].ChargeUnitID : 0,
                            // 'DoctorID': $scope.PatientData.DOCID,
                            'DoctorID': $scope.BillDetails.SelectedOtherServiceList[i].DoctorID,
                            'DoctorName': $scope.PatientData.DOCName,
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionPercent': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionPercentage,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount
                        })
                    }

                    //if ($scope.BillDetails.DeletedServiceList.length > 0) {
                    //    for (var i = 0; i < $scope.BillDetails.DeletedServiceList.length; i++) {
                    //        $scope.ServiceCode = $scope.BillDetails.DeletedServiceList[i].ServiceCode;        commented by Nayan on 03/02/2020



                            if (DeletedServiceList.length > 0) {
                                for (var i = 0; i < DeletedServiceList.length; i++) {
                                    $scope.ServiceCode = DeletedServiceList[i].ServiceCode;


                            var responseData = ConsumptionService.DeleteService($scope.PatientBillData.BillID, $scope.PatientBillData.BillUnitID, $scope.ServiceCode);
                            responseData.then(function (Response) {
                                if (Response.data == 1) {
                                    // AlertMessage.success(objResource.msgTitle, 'Record Deleted Successfully.');
                                    usSpinnerService.stop('GridSpinner');
                                    if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                                        angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i, index) {
                                            $scope.calConcessionAmt(i.ConcessionPercentage, i.BaseServiceRate, index);

                                        })
                                    }
                                    $scope.ClearSaveBill();
                                }
                                else {
                                    $scope.Error = error;
                                    usSpinnerService.stop('GridSpinner');
                                    $scope.ClearSaveBill();
                                }
                            }, function (error) {
                                //AlertMessage.info('PalashIVF', 'Error Occured.');
                                usSpinnerService.stop('GridSpinner');
                                $scope.ClearSaveBill();
                            })

                        }
                    }



                    //$scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                    //$scope.TotalAmt1 = 0;
                    //if ($scope.Total != null)
                    //    $scope.TotalAmt1 = $scope.Total;
                    //$scope.ConsumeAmt = 0;
                    //angular.forEach($scope.BillDetails.ChargeList, function (item) {
                    //    if ($scope.TotalAmt1 > 0) {
                    //        $scope.ConsumeAmt = $scope.BillDetails.NetBillAmount;
                    //        if ($scope.TotalAmt1 >= $scope.ConsumeAmt) {
                    //            $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                    //        }
                    //        else {
                    //            $scope.ConsumeAmt = $scope.TotalAmt1;
                    //            $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                    //        }
                    //        //item.ServicePaidAmount = Math.round($scope.ConsumeAmt, 2); // modify on 26082018 for balance amount issue while pay the bill
                    //        //item.BalanceAmount = $scope.BillDetails.NetBillAmount - item.ServicePaidAmount;
                    //        //item.ChkID = true;
                    //        item.TotalPaidPatientAmount = Math.round($scope.ConsumeAmt, 2);
                    //        item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;
                    //    }
                    //    else {
                    //        // item.BalanceAmount = item.NetAmount;
                    //        item.TotalPatientBalanceAmount = item.NetAmount;
                    //    }
                    //})

                    
                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeDetailsList.push({
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount
                        })
                    }

                    for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                        if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.BillDetails.NetBillAmount) {
                            $scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;
                        }
                        else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
                            //$scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount;
                            $scope.BillDetails.Payment.BillBalanceAmount = 0;
                        }
                            //else AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                        else AlertMessage.info(objResource.msgTitle.objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020

                        $scope.BillDetails.Payment.push({
                            'BillAmount': $scope.BillDetails.NetBillAmount,
                            'BillBalanceAmount': $scope.BillDetails.Payment.BillBalanceAmount
                        });
                        //$scope.IsSettleBill[i] = false;
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.Payment[0].BillBalanceAmount;
                    }
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.NetBillAmount;
                        // $scope.IsSettleBill = true;
                    }


                    //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    //    $scope.BillDetails.OtherSrvPaymentModeList.push({
                    //        'Date': $scope.BillDetails.OtherSrvPaymentModeList[i].Date,
                    //        'PaymentModeID': $scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID,
                    //        'Number': $scope.BillDetails.OtherSrvPaymentModeList[i].Number,
                    //        'BankID': $scope.BillDetails.OtherSrvPaymentModeList[i].BankID,
                    //        'PaidAmount': $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount
                    //    })
                    //}

                    var Promise = ConsumptionService.UpdateBill($scope.BillDetails);
                    Promise.then(function (resp) {
                        debugger;
                        if (resp.data == 2) {
                            usSpinnerService.stop('GridSpinner');
                            // AlertMessage.success('Palash IVF', 'Bill Updated successfully.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgBillUpdatedsuccessfully); //Modified by swatih for localization 22/7/2020
                            //$scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID);
                            if ($scope.BillDetails.IsFreezed) {
                                // $scope.PrintBill();
                                $scope.PrintNewBill();
                            }
                            usSpinnerService.stop('GridSpinner');
                            $location.path("/PatientBillList");
                            $scope.ClearSaveBill();

                        }
                        else {
                            //AlertMessage.success('Palash IVF', 'Error Occured.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 22/7/2020
                            usSpinnerService.stop('GridSpinner');
                            $scope.ClearSaveBill();
                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.ClearSaveBill();
                    })
                }
            }
                else {
                    //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                    AlertMessage.info(objResource.msgTitle, obResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                    usSpinnerService.stop('GridSpinner');
                    $scope.ClearSaveBill();
                }




            }

        }

            //}

            // }
        else {                         //Save
            if ($scope.BillDetails.IsFreezed != undefined && $scope.ValidateBill()) {
                //if ($scope.ValidateBill()) {
                $scope.disableClickNewBill = true;

                    if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                        for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                            $scope.BillDetails.ChargeList.push({
                                'ServiceID': $scope.BillDetails.SelectedOtherServiceList[i].ServiceCode,
                                'ServiceName': $scope.BillDetails.SelectedOtherServiceList[i].Service,   //
                                //'DoctorID': $scope.PatientData.DOCID,
                                'DoctorID': $scope.BillDetails.SelectedOtherServiceList[i].DoctorID,
                                'DoctorName': $scope.PatientData.DOCName,
                                'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                                'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                                'ConcessionPercent': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionPercentage,
                                'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                                'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                                'TotalPaidPatientAmount': 0,
                                'TotalPatientBalanceAmount': 0
                            })
                        }
                        //     $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order


                        $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                        $scope.TotalAmt1 = 0;
                        if ($scope.Total != null)
                            $scope.TotalAmt1 = $scope.Total;

                        $scope.ConsumeAmt = 0;
                        angular.forEach($scope.BillDetails.ChargeList, function (item) {
                            if ($scope.TotalAmt1 > 0) {
                                $scope.ConsumeAmt = $scope.BillDetails.NetBillAmount;
                                if ($scope.TotalAmt1 >= $scope.ConsumeAmt) {
                                    $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;

                                }
                                else {
                                    $scope.ConsumeAmt = $scope.TotalAmt1;
                                    $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                                }
                                //item.ServicePaidAmount = Math.round($scope.ConsumeAmt, 2); // modify on 26082018 for balance amount issue while pay the bill
                                //item.BalanceAmount = $scope.BillDetails.NetBillAmount - item.ServicePaidAmount;
                                //item.ChkID = true;
                                item.TotalPaidPatientAmount = Math.round($scope.ConsumeAmt, 2);
                                item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;

                            }
                            else {

                                // item.BalanceAmount = item.NetAmount;
                                item.TotalPatientBalanceAmount = item.NetAmount;
                            }

                        })




                        for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                            $scope.BillDetails.ChargeDetailsList.push({
                                'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                                'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                                'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                                'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,

                                //'PatientPaidAmount': $scope.BillDetails.ChargeList[i].TotalPaidPatientAmount,
                                //'PatientBalanceAmount': $scope.BillDetails.ChargeList[i].TotalPatientBalanceAmount

                            })
                        }

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


                        //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                        //    $scope.BillDetails.OtherSrvPaymentModeList.push({
                        //        'Date': $scope.BillDetails.OtherSrvPaymentModeList[i].Date,
                        //        'PaymentModeID': $scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID,
                        //        'Number': $scope.BillDetails.OtherSrvPaymentModeList[i].Number,
                        //        'BankID': $scope.BillDetails.OtherSrvPaymentModeList[i].BankID,
                        //        'PaidAmount': $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount
                        //    })
                        //}
                        debugger;
                        ////Begin :: Added by AniketK on 06Oct2020
                        //for(var i = 0; i<$scope.BillDetails.lsttempAdvanceList.length;i++){
                        //    $scope.BillDetails.lsttempAdvanceList.splice(i, 1);
                        //}
                        //$scope.BillDetails.lsttempAdvanceList.push($scope.tempAdvanceList);
                        //End :: Added by AniketK on 06Oct2020
                        var Promise = ConsumptionService.SaveBill($scope.BillDetails);
                        Promise.then(function (resp) {
                            debugger;
                            // if (resp.data == 1) {
                            if (resp.data > 0) {

                                usSpinnerService.stop('GridSpinner');
                                //AlertMessage.success('Palash IVF', 'Bill saved successfully.'); //Commented by swatih for localization 22/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgBillsavedsuccessfully); //Modified by swatih for localization 22/7/2020

                                // $scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID); 
                                if ($scope.BillDetails.IsFreezed) {
                                    $scope.IsTempBillID = true;
                                    $scope.TempBillID = resp.data;
                                    $scope.PrintNewBill();
                                }
                                usSpinnerService.stop('GridSpinner');
                                $location.path("/PatientBillList");
                                $scope.ClearSaveBill();
                            }
                            else {
                                // AlertMessage.success('Palash IVF', 'Error Occured.'); //Commented by swatih for localization 22/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 22/7/2020
                                usSpinnerService.stop('GridSpinner');
                                $scope.ClearSaveBill();
                            }
                        }, function (error) {
                            usSpinnerService.stop('GridSpinner');
                            $scope.ClearSaveBill();
                        })
                    }
                    else {
                        //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                        AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                        usSpinnerService.stop('GridSpinner');
                        $scope.ClearSaveBill();
                    }
           
            }   ///
            else if ($scope.IsPaymentModeID ) {
                //AlertMessage.info('PalashIVF', 'Enter Payment Mode.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEnterPaymentMode); //Modified by swatih for localization 22/7/2020
                $scope.disableClickNewBill = false;
            }
            else if(!$scope.IsAmount){
                // AlertMessage.info('PalashIVF', 'Enter the Amount.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEntertheamount); //Modified by swatih for localization 22/7/2020
                $scope.disableClickNewBill = false;
            }
            else if ($scope.IsAmountNotFill || $scope.IsNumberNotFill || $scope.IsBankIDNotFill || $scope.IsDateIDNotFill) {
                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
                $scope.disableClickNewBill = false;
            }
            else if ($scope.IsExceed) {
                //AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020
                $scope.disableClickNewBill = false;
                $scope.tempPaymentLst = [];
                for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 1) {
                        $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.NetBillAmount;
                    }
                    else {
                        if (i != $scope.PaymentIndex) {
                            $scope.tempPaymentLst.push($scope.BillDetails.OtherSrvPaymentModeList[i])               

                        }
                    }               
                }
                
                $scope.Total = 0;    //
                for (var i = 0; i < $scope.tempPaymentLst.length; i++) {
                    //$scope.SumOfPayment = parseFloat($scope.BillDetails.NetBillAmount - $scope.tempPaymentLst[i].PaidAmount);

                    $scope.Total = parseFloat($scope.Total) + parseFloat($scope.tempPaymentLst[i].PaidAmount);

                }
                $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.NetBillAmount - $scope.Total;
               // }
            
                $scope.disableClickNewBill = false;
            }
            else if ($scope.IsNotFillConcession || $scope.IsNotFillBaseServiceRate) {
                //AlertMessage.warning("PalashIVF", "Input is not in a correct format."); //Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle,objResource.msgInputisnotinacorrectformat); //Modified by swatih for localization 22/7/2020
            }
            else {

                for(var i = 0; i < $scope.BillDetails.SelectedOtherServiceList.length ; i++){
                    if ($scope.BillDetails.SelectedOtherServiceList[i].IsNotFillBaseServiceRate) {
                        //AlertMessage.warning("PalashIVF", "Input is not in a correct format."); //Commented by swatih for localization 22/7/2020
                        AlertMessage.warning(objResource.msgTitle, objResource.msgInputisnotinacorrectformat); //Modified by swatih for localization 22/7/2020
                        $scope.IsProceedBill = false;
                        break;
                    }
                    $scope.IsProceedBill = true;
                    $scope.disableClickNewBill = false;
                }
                

              


                // gh g
                if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                    if ($scope.IsProceedBill) {
                        $scope.disableClickNewBill = true;
                    


                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeList.push({
                            'ServiceID': $scope.BillDetails.SelectedOtherServiceList[i].ServiceCode,
                            'ServiceName': $scope.BillDetails.SelectedOtherServiceList[i].Service,   //
                            //'DoctorID': $scope.PatientData.DOCID,
                            'DoctorID': $scope.BillDetails.SelectedOtherServiceList[i].DoctorID,
                            'DoctorName': $scope.PatientData.DOCName,
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionPercent': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionPercentage,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'TotalPaidPatientAmount': 0,
                            'TotalPatientBalanceAmount': 0
                        })
                    }
                    //     $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order


                    $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                    $scope.TotalAmt1 = 0;
                    if ($scope.Total != null)
                        $scope.TotalAmt1 = $scope.Total;

                    $scope.ConsumeAmt = 0;
                    angular.forEach($scope.BillDetails.ChargeList, function (item) {
                        if ($scope.TotalAmt1 > 0) {
                            $scope.ConsumeAmt = $scope.BillDetails.NetBillAmount;
                            if ($scope.TotalAmt1 >= $scope.ConsumeAmt) {
                                $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;

                            }
                            else {
                                $scope.ConsumeAmt = $scope.TotalAmt1;
                                $scope.TotalAmt1 = $scope.TotalAmt1 - $scope.ConsumeAmt;
                            }
                            //item.ServicePaidAmount = Math.round($scope.ConsumeAmt, 2); // modify on 26082018 for balance amount issue while pay the bill
                            //item.BalanceAmount = $scope.BillDetails.NetBillAmount - item.ServicePaidAmount;
                            //item.ChkID = true;
                            item.TotalPaidPatientAmount = Math.round($scope.ConsumeAmt, 2);
                            item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;

                        }
                        else {

                            // item.BalanceAmount = item.NetAmount;
                            item.TotalPatientBalanceAmount = item.NetAmount;
                        }

                    })




                    for (var i = 0 ; i < $scope.BillDetails.SelectedOtherServiceList.length; i++) {
                        $scope.BillDetails.ChargeDetailsList.push({
                            'Rate': $scope.BillDetails.SelectedOtherServiceList[i].BaseServiceRate,
                            'TotalAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,
                            'ConcessionAmount': $scope.BillDetails.SelectedOtherServiceList[i].ConcessionAmount,
                            'NetAmount': $scope.BillDetails.SelectedOtherServiceList[i].NetAmount,

                            //'PatientPaidAmount': $scope.BillDetails.ChargeList[i].TotalPaidPatientAmount,
                            //'PatientBalanceAmount': $scope.BillDetails.ChargeList[i].TotalPatientBalanceAmount

                        })
                    }

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
                            'BillBalanceAmount': $scope.BillDetails.Payment.BillBalanceAmount
                        });
                        // $scope.IsSettleBill[i] = false;
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.Payment[0].BillBalanceAmount;
                    }
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
                        $scope.BillDetails.BalanceAmountSelf = $scope.BillDetails.NetBillAmount;
                        //$scope.IsSettleBill = true;
                    }


                    //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    //    $scope.BillDetails.OtherSrvPaymentModeList.push({
                    //        'Date': $scope.BillDetails.OtherSrvPaymentModeList[i].Date,
                    //        'PaymentModeID': $scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID,
                    //        'Number': $scope.BillDetails.OtherSrvPaymentModeList[i].Number,
                    //        'BankID': $scope.BillDetails.OtherSrvPaymentModeList[i].BankID,
                    //        'PaidAmount': $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount
                    //    })
                    //}

                    var Promise = ConsumptionService.SaveBill($scope.BillDetails);
                    Promise.then(function (resp) {
                        debugger;
                        //if (resp.data == 1) {
                            if (resp.data > 0) {
                            usSpinnerService.stop('GridSpinner');
                                //AlertMessage.success('Palash IVF', 'Bill saved successfully.'); //Commented by swatih for localization 22/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgBillsavedsuccessfully); //Modified by swatih for localization 22/7/2020

                            // $scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID); 
                            if ($scope.BillDetails.IsFreezed) {
                                $scope.PrintNewBill();
                            }
                            usSpinnerService.stop('GridSpinner');
                            $location.path("/PatientBillList");
                            $scope.ClearSaveBill();
                        }
                        else {
                                //AlertMessage.success('Palash IVF', 'Error Occured.'); //Commented by swatih for localization 22/7/2020
                                AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccured); //Modified by swatih for localization 22/7/2020
                            usSpinnerService.stop('GridSpinner');
                            $scope.ClearSaveBill();
                        }
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.ClearSaveBill();
                    })
                }
            }
                else {
                    //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                    usSpinnerService.stop('GridSpinner');
                    $scope.ClearSaveBill();
                }



            }
            
            }
            
        //}
           // }
            //else {
            //    AlertMessage.info('Palash IVF', 'Add atleast 1 service.');
            //}
        }
        
  
    $scope.ClearSaveBill = function ClearSaveBill() {     //Added by Nayan Kamble on 12/06/2019
        $scope.disableClickNewBill = false;
    }

    //Start Report 
    $scope.PrintBill = function PrintBill(index) {
        debugger;
        //var a = encodeURIComponent('U=' + $scope.PatientData.PatUnitID + '&VU=' + $scope.PatientData.VisitUnitID +
        //    '&V=' + $scope.PatientData.VisitID + '&P=' + $scope.PatientData.PatID + '&BID=' + $scope.BillList[index].BillID );
        //    window.open('/Reports/New_Billing/NewBillingWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            
        var a = encodeURIComponent('U=' + $scope.BillList[index].PatientUnitID + '&VU=' + $scope.BillList[index].VisitUnitID +
               '&V=' + $scope.BillList[index].VisitID + '&P=' + $scope.BillList[index].PatientID + '&BID=' + $scope.BillList[index].BillID);
            window.open('/Reports/New_Billing/NewBillingWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    $scope.PrintNewBill = function PrintNewBill() {
        debugger;
        if ($scope.IsTempBillID) {
            var a = encodeURIComponent('U=' + $scope.PatientData.PatUnitID + '&VU=' + $scope.PatientData.VisitUnitID +
           '&V=' + $scope.PatientData.VisitID + '&P=' + $scope.PatientData.PatID + '&BID=' + $scope.TempBillID);
            window.open('/Reports/New_Billing/NewBillingWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab

        }
        else {
            var a = encodeURIComponent('U=' + $scope.PatientData.PatUnitID + '&VU=' + $scope.PatientData.VisitUnitID +
                '&V=' + $scope.PatientData.VisitID + '&P=' + $scope.PatientData.PatID + '&BID=' + $scope.PatientBillData.BillID);
            window.open('/Reports/New_Billing/NewBillingWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
        }

    }


    $scope.PrintNewBillforNewScreen = function PrintNewBill() {
        debugger;

        if ($scope.IsTempBillID) {
            var a = encodeURIComponent('U=' + $rootScope.PatientUnitID + '&VU=' + $rootScope.UnitId +
           '&V=' + $rootScope.VisitID + '&P=' + $rootScope.PatientID + '&BID=' + $scope.TempBillID);
            window.open('/Reports/New_Billing/NewBillingWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab

        }
        else {
        debugger
            var a = encodeURIComponent('U=' + $scope.PatientData.PatUnitID + '&VU=' + $scope.PatientData.VisitUnitID +
                '&V=' + $scope.PatientData.VisitID + '&P=' + $scope.PatientData.PatID + '&BID=' + $scope.PatientBillData.BillID);
            window.open('/Reports/New_Billing/NewBillingWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
        }
        }
    //}
    //END Report

    ////Start Report 
    //$scope.PrintBill = function () {
    //    debugger;
    //    $scope.PrintSaveBill($scope.PatientData.PatID, $scope.PatientData.PatUnitID, $scope.PatientData.VisitID, $scope.PatientData.VisitUnitID);
    //}

    //$scope.PrintSaveBill = function (PatID, PatUnitID, VisitID, VisitUnitID) {
    //    debugger;
    //    //var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + selectPatient.VisitUnitID + '&V=' + 0 + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
    //    ////var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + $rootScope.CoupleDetails.FemalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
    //    //window.open('/Reports/New_Billing/NewBillingWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    //    ////  Reports\New_Billing\NewBillingWF.aspx

    //    var a = encodeURIComponent('U=' + PatUnitID + '&VU=' + VisitUnitID + '&V=' + VisitID + '&P=' + PatID);
    //    //var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + $rootScope.CoupleDetails.FemalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
    //    window.open('/Reports/New_Billing/NewBillingWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    //    //  Reports\New_Billing\NewBillingWF.aspx


    //}
    ////END Report

    $scope.GetDocList = function GetDocList() {
        debugger;
        var responseData = Common.GetDoctorList();
        responseData.then(function (Response) {
        debugger
            //Response.data.splice(0, 0, { ID: $scope.PatientData.DOCID, Description: $scope.PatientData.DOCName })
            $scope.DocList = Response.data.All;
                   

        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }


       $scope.GetDocListNew = function GetDocList() {
        debugger;
        var responseData = Common.GetDoctorList();
        responseData.then(function (Response) {
        debugger
           // Response.data.splice(0, 0, { ID: $scope.PatientData.DOCID, Description: $scope.PatientData.DOCName })
            $scope.DocList = Response.data.All;
                   

        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    }
   
    $scope.LoadBillList = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $scope.BillingList.VisitFromDate = new Date();
        $scope.BillingList.VisitToDate = new Date();
        $scope.BillingList.DateFilter = 0;
        $scope.IsFromDate = true;
        $scope.IsToDate = true;
        $scope.GetBillList($scope.BillingList);
        $scope.PaymentUpdated = false;
        $rootScope.IsFromPatientBillList = false;
        usSpinnerService.stop('GridSpinner');



    }
    $scope.PageChange = function PageChange() {
        debugger;

        if ($rootScope.IsFromPatientBillList) {
            $scope.SearchData($scope.PatientBill);
        }
        else {
            $scope.GetBillList($scope.BillingList);
        }

    };

    $scope.GetBillList = function GetBillList(BillingList) {
        debugger;
        var Bill = [];
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(BillingList.VisitFromDate)) { BillingList.VisitFromDate = null; }
        if (angular.isUndefined(BillingList.VisitToDate)) { BillingList.VisitToDate = null; }
        if ((BillingList.VisitToDate != null && BillingList.VisitFromDate == null) || (BillingList.VisitToDate == null && BillingList.VisitFromDate != null)) {
            AlertMessage.info(objResource.msgTitle, objResource.msgSelVisFrmDtAndVisToDt);
        }
        else {
            if (BillingList.VisitFromDate <= BillingList.VisitToDate) {
                //BillingList.push($scope.CurrentPage - 1);                   

                //Bill.push($filter('date')(BillingList.VisitFromDate, 'shortDate'));
                //Bill.push($filter('date')(BillingList.VisitToDate, 'shortDate'));
                var FromDate = new Date(BillingList.VisitFromDate).toISOString();
                var ToDate = new Date(BillingList.VisitToDate).toISOString();
                //Bill.push(BillingList.VisitFromDate);
                //Bill.push(BillingList.VisitToDate);

                Bill.push(FromDate);
                Bill.push(ToDate)
                Bill.push($scope.PatientData.PatID.toString());
                Bill.push($scope.PatientData.PatUnitID.toString());
                Bill.push(null);
                Bill.push(null);
                Bill.push(null);
                Bill.push(null);
                Bill.push(null);
                Bill.push(null);
                Bill.push(null);
                Bill.push(null);
                Bill.push(null);


               // Bill.push($scope.CurrentPage - 1);
                var responseData = ConsumptionService.GetBillList(Bill, $scope.CurrentPage - 1, true);
                responseData.then(function (Response) {

                    if (Response.data.length > 0) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = Response.data[0].TotalCount; //
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = 0;
                    }
                    $scope.BillList = Response.data;                 
               
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


          

        //});
    }
    $scope.AddPaymentRow = function () {
        debugger;
        //if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
        //    $scope.BillDetails.OtherSrvPaymentModeList.push({
        //        'PaymentModeID': 0,
        //        'Date': '',
        //        'Number': '',
        //        'BankID': 0,
        //        'PaidAmount': $scope.BillDetails.NetBillAmount,
        //        'CashMode': false
        //    });
        //}
        
        //}
        // else{
        $scope.sum=0
        for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
            $scope.sum = parseFloat($scope.sum) + parseFloat($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount);
        }

        for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {


            // if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.NetBillAmountfromPouup) {           // $scope.BillDetails.NetBillAmount
            if ($scope.sum < $scope.BillDetails.BalanceAmountSelf ) {            ///// $scope.NetBillAmountfromPouup  modified by Nayan Kamble on 11/02/2020                      // $scope.BillDetails.NetBillAmount

                $scope.BillDetails.OtherSrvPaymentModeList.push({
                    'PaymentModeID': 0,
                    'Date': '',
                    'Number': '',
                    'BankID': 0,
                    'PaidAmount': $scope.BillDetails.BalanceAmountSelf - $scope.sum,            ////$scope.NetBillAmountfromPouup - $scope.sum ,    modified by Nayan Kamble on 11/02/2020    
                    'CashMode': true,
                    'DisableAmount' : true
                });
                break;

            }
            else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
                $scope.IsDisableRow = true;
                break;
            }
        }
        //}
    }
    /*******************************************************************************************************************/
    //Added by AniketK on 30Sept2020
    $scope.AdvanceAutoConsumed = function(){
        debugger;
        $scope.tempAdvanceList = [];
        for(var i = 0; i<$scope.AdvanceList.length; i++){                   
                    if($scope.BillDetails.NetBillAmount < $scope.AdvanceList[i].Balance){ //900 < 1000                        
                        $scope.tempAdvanceList[i] = {
                                              AdvanceID: $scope.AdvanceList[i].AdvanceID                                            
                                            , AdvanceUnitID: $scope.AdvanceList[i].AdvanceUnitID
                                            , AdvanceAgainst: $scope.AdvanceList[i].AdvanceAgainst
                                            , Balance: $scope.AdvanceList[i].Balance                                            
                                            , Date: $scope.AdvanceList[i].Date                                            
                                            , Remarks: $scope.AdvanceList[i].Remarks                                            
                                            , UnitName: $scope.AdvanceList[i].UnitName                                            
                                            , ConsumeAmount: $scope.BillDetails.NetBillAmount 
                                            , BalanceAmount: $scope.AdvanceList[i].Balance - $scope.BillDetails.NetBillAmount                                                                                       
                                         };                       
                    }
                    else{
                        $scope.tempAdvanceList[i] = {
                                              AdvanceID: $scope.AdvanceList[i].AdvanceID                                            
                                            , AdvanceUnitID: $scope.AdvanceList[i].AdvanceUnitID
                                            , AdvanceAgainst: $scope.AdvanceList[i].AdvanceAgainst
                                            , Balance: $scope.AdvanceList[i].Balance                                            
                                            , Date: $scope.AdvanceList[i].Date                                            
                                            , Remarks: $scope.AdvanceList[i].Remarks                                            
                                            , UnitName: $scope.AdvanceList[i].UnitName                                            
                                            , ConsumeAmount: $scope.AdvanceList[i].Balance 
                                            , BalanceAmount: 0                                                                                       
                                         };
                    }
                    break;                   
                }
                
                for(var j = 0; j<$scope.tempAdvanceList.length; j++){
                      for(var i = 0; i<$scope.AdvanceList.length; i++){                   
                        if(i != 0 && $scope.tempAdvanceList[j].ConsumeAmount == $scope.BillDetails.NetBillAmount){
                            $scope.tempAdvanceList.push({
                                              AdvanceID: $scope.AdvanceList[i].AdvanceID                                            
                                            , AdvanceUnitID: $scope.AdvanceList[i].AdvanceUnitID
                                            , AdvanceAgainst: $scope.AdvanceList[i].AdvanceAgainst
                                            , Balance: $scope.AdvanceList[i].Balance                                            
                                            , Date: $scope.AdvanceList[i].Date                                            
                                            , Remarks: $scope.AdvanceList[i].Remarks                                            
                                            , UnitName: $scope.AdvanceList[i].UnitName                                            
                                            , ConsumeAmount: '' 
                                            , BalanceAmount: $scope.AdvanceList[i].Balance                                                                                       
                                         });
                        }
                        else if(i != 0){
                            $scope.tempAdvanceList.push({
                                              AdvanceID: $scope.AdvanceList[i].AdvanceID                                            
                                            , AdvanceUnitID: $scope.AdvanceList[i].AdvanceUnitID
                                            , AdvanceAgainst: $scope.AdvanceList[i].AdvanceAgainst
                                            , Balance: $scope.AdvanceList[i].Balance                                            
                                            , Date: $scope.AdvanceList[i].Date                                            
                                            , Remarks: $scope.AdvanceList[i].Remarks                                            
                                            , UnitName: $scope.AdvanceList[i].UnitName                                            
                                            , ConsumeAmount: '' 
                                            , BalanceAmount: $scope.AdvanceList[i].Balance                                                                                       
                                         });
                        }
                    }
                    if($scope.tempAdvanceList.length == $scope.AdvanceList.length)
                        break;
                }
    }
    /*******************************************************************************************************************/

    $scope.FreezeBill = function FreezeBill(IsFreeze) {
        debugger;

        if (IsFreeze == 1) {
            if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouWantToFreezBill, "warning", function (isConfirmed) {
                    if (isConfirmed) {
                        $scope.ShowPaymentData = true;
                        $scope.disableFeeeze = true;
                        $scope.disableSave = true;
                        $scope.DisableRateAndCon = true;
                        $scope.BillDetails.IsFreezed = IsFreeze;
                      if($scope.AdvanceList != undefined){ //Added by AniketK on 30Sept2020
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

                        $scope.BillDetails.OtherSrvPaymentModeList.push({
                            'PaymentModeID': 0,
                            'Date': '',
                            'Number': '',
                            'BankID': 0,
                            'PaidAmount': $scope.BillDetails.NetBillAmount,    ///
                            'CashMode': true,    //false
                            //'DisableAmount':true //Commented and Modifed by AniketK on 23Oct2020
                            'DisableAmount':false
                        });

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
                //AlertMessage.info('Palash IVF', 'Add atleast 1 service.'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
                $scope.BillDetails.IsFreezed = false;
            }

        }
          
        else {
            $scope.BillDetails.IsFreeze = IsFreeze;
            $scope.ShowPaymentData = false;
        }
    }

    $scope.AddPaymentRowFromBill = function () {
        debugger;
        //if ($scope.BillDetails.OtherSrvPaymentModeList.length == 0) {
        //    $scope.BillDetails.OtherSrvPaymentModeList.push({
        //        'PaymentModeID': 0,
        //        'Date': '',
        //        'Number': '',
        //        'BankID': 0,
        //        'PaidAmount': $scope.BillDetails.NetBillAmount,
        //        'CashMode': false
        //    });
        //}

        //}
        // else{
        $scope.sum = 0
        for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
            $scope.sum = parseFloat($scope.sum) + parseFloat($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount);
        }

        for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
        debugger

            // if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.NetBillAmountfromPouup) {           // $scope.BillDetails.NetBillAmount
            if ($scope.sum < $scope.BillDetails.NetBillAmount) {           // 
            debugger
                $scope.BillDetails.OtherSrvPaymentModeList.push({
                    'PaymentModeID': 1,
                    'Date': '',
                    'Number': '',
                    'BankID': 0,
                    'PaidAmount': $scope.BillDetails.NetBillAmount - $scope.sum,   //$scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount          //$scope.BillDetails.NetBillAmount    //need to modify
                    'CashMode': true,
                    'DisableAmount': false,
                  
                'IsPaymentModeID' : false,
                'IsAmountNotFill' : false,
                'IsNumberNotFill' : false,
                'IsBankIDNotFill' : false,
              
                'disableClickNewBill' : false,
                 'isPaymentModeVisible' : false,
                 'IsAdvanceExceeded' : false
                });
                break;

            }
            else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
            debugger
                $scope.IsDisableRow = true;
                break;
            }
            else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount > $scope.BillDetails.NetBillAmount) {
                //AlertMessage.info('PalashIVF', 'Amount exceeded'); //Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAmountexceeded); //Modified by swatih for localization 22/7/2020
                $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount = $scope.BillDetails.NetBillAmount;
            }
        }
        //}
    }




        
     /*===================================================================================================================*/
     //Added by AniketK on 23Oct2020
    $scope.GetPaymentModeValidation = function GetPaymentModeValidation() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = Common.GetPaymentModeValidation();
        ResponseData.then(function (Response) {
        debugger
        usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
            debugger
                $scope.PaymentModeValidationList = Response.data;                
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, "Something went wrong.");
            $scope.Error = error;
        });
    }
    /*===================================================================================================================*/

    $scope.GetModeOfPayment = function GetDocList() {
       debugger;
        var ResponseData = Common.getMasterList('M_ModeOfPayment', 'PaymentID', 'Description');
        ResponseData.then(function (Response) {
        debugger
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ModeOfPaymentList = Response.data;
            //Added by AniketK on 23Oct2020
            for(var i = 0; i<$scope.PaymentModeValidationList.length;i++){
            debugger
                for(var j = 0; j<$scope.PaymentModeList.length;j++){
                    if($scope.PaymentModeValidationList[i].PaymentID == $scope.PaymentModeList[j].ID 
                            && ($scope.PaymentModeValidationList[i].PayModeApplicableID == 4)){  //1 : Collection(Advance), 2: Refund,  3: Both,  4: None                            
                        $scope.PaymentModeList.splice(j, 1); //Remove Advance Collection PayModeApplicableID
                    }
                }
            }
            //End: Added by AniketK on 23Oct2020

            if ($scope.BillDetails.PaymentModeID == undefined) {
                $scope.BillDetails.PaymentModeID = 0;
                $scope.CashMode = true;   //
            }
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };


      $scope.GetModeOfPaymentNew = function GetDocList() {
       debugger;
        var ResponseData = Common.getMasterList('M_ModeOfPayment', 'PaymentID', 'Description');
        ResponseData.then(function (Response) {
        debugger
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ModeOfPaymentList = Response.data;
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

    $scope.GetBankList = function GetDocList() {
        //debugger;
        var ResponseData = Common.getMasterList('M_BankMaster', 'BankID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.BankList = Response.data;
            if ($scope.BillDetails.BankID == undefined) {
                $scope.BillDetails.BankID = 0;
            }   
        }, function (error) {
            //AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };
    $scope.FetchBalanceAdvanceAmount = function(index){
debugger;
var responseData = ConsumptionService.GetBalanceAdvanceAmount($rootScope.UnitId,$rootScope.PatientID,$rootScope.PatientUnitID)
 responseData.then(function (response) {
    debugger
        $scope.BillDetails.OtherSrvPaymentModeList[index].AdvanceAmount = response.data.AdvanceAmount; // Bind the response to patientList
        $scope.BillDetails.OtherSrvPaymentModeList[index].AdvanceID = response.data.AdvanceID;
        $scope.BillDetails.OtherSrvPaymentModeList[index].AdvanceUsed = response.data.AdvanceUsed;
        $scope.BillDetails.OtherSrvPaymentModeList[index].AdvanceBalance = response.data.Balance;
     
      if (($scope.BillDetails.OtherSrvPaymentModeList[index].AdvanceBalance >= 0) && 
    ($scope.BillDetails.OtherSrvPaymentModeList[index].PaidAmount)) {
    debugger;
    if (parseFloat($scope.BillDetails.OtherSrvPaymentModeList[index].PaidAmount) > 
        parseFloat($scope.BillDetails.OtherSrvPaymentModeList[index].AdvanceBalance)) {
        debugger;
        $scope.BillDetails.OtherSrvPaymentModeList[index].IsAdvanceExceeded = true; // Flag to mark field in red
        AlertMessage.warning(objResource.msgTitle, "Advance Amount is less than Amount to be Paid!");
    } else {
        $scope.BillDetails.OtherSrvPaymentModeList[index].IsAdvanceExceeded = false; // Reset the flag
    }
}

        
    }, function (error) {
        AlertMessage.warning(objResource.msgTitle, 'Error fetching Advance: ' + (error.message || 'Unknown error')); // Show error message
        
        
    });

}

    $scope.ChangeModeOfPayment = function (Index) {  //item
        debugger;
        //for (var Index = 0; Index < $scope.BillDetails.OtherSrvPaymentModeList.length; Index++) {       /////
            //if (item == 1 || item == 0) {    //Cash
            //    $scope.CashMode = true;
            //}
            //else {
            //    $scope.CashMode = false;
            //}

            if ( $scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 0) {    //Select
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Number = '';
                $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Date = '';
                angular.element(txtRefNo).attr('maxlength', 20);
               $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsBankIDNotFill = false;
                $scope.IsPaymentModeID = false;
                $scope.disableClickNewBill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
                 $scope.isPaymentModeVisible = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAdvanceExceeded = false;
                      $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceAmount = 0; // Bind the response to patientList
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceID = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceUsed = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceBalance = 0;
            }

            else if ($scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 1) { //cash
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Number = '';
                $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Date = '';
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
$scope.isPaymentModeVisible = false;
$scope.BillDetails.OtherSrvPaymentModeList[Index].IsAdvanceExceeded = false;
     $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceAmount = 0; // Bind the response to patientList
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceID = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceUsed = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceBalance = 0;
            }
            else if ($scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 2) {   //Cheque
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Number = '';
                $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Date = '';
                angular.element(txtRefNo).attr('maxlength', 20);
               $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsBankIDNotFill = false;
                $scope.IsPaymentModeID = false;
                $scope.disableClickNewBill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
$scope.isPaymentModeVisible = false;
$scope.BillDetails.OtherSrvPaymentModeList[Index].IsAdvanceExceeded = false;
     $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceAmount = 0; // Bind the response to patientList
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceID = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceUsed = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceBalance = 0;
            }
            else if ($scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 4) {   //Card
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Number = '';
                $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Date = '';
                angular.element(txtRefNo).attr('maxlength', 20);
                $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsBankIDNotFill = false;
                $scope.IsPaymentModeID = false;
                $scope.disableClickNewBill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
$scope.isPaymentModeVisible = false;
$scope.BillDetails.OtherSrvPaymentModeList[Index].IsAdvanceExceeded = false;
     $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceAmount = 0; // Bind the response to patientList
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceID = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceUsed = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceBalance = 0;
            }
            else if ($scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 10) {   //Online
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Number = '';
                $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Date = '';
                angular.element(txtRefNo).attr('maxlength', 20);
               $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsBankIDNotFill = false;
                $scope.IsPaymentModeID = false;
                $scope.disableClickNewBill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
$scope.isPaymentModeVisible = false;
$scope.BillDetails.OtherSrvPaymentModeList[Index].IsAdvanceExceeded = false;
     $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceAmount = 0; // Bind the response to patientList
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceID = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceUsed = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceBalance = 0;
            }
            else if ($scope.BillDetails.OtherSrvPaymentModeList[Index].PaymentModeID == 12) {   //Advance
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Number = '';
                $scope.BillDetails.OtherSrvPaymentModeList[Index].BankID = 0;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].Date = '';
                angular.element(txtRefNo).attr('maxlength', 20);
               $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsPaymentModeID = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAmountNotFill = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsNumberNotFill = false;
               
                $scope.IsPaymentModeID = false;
                $scope.disableClickNewBill = false;
                 $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
$scope.isPaymentModeVisible = true;
                $scope.FetchBalanceAdvanceAmount(Index);
            }
            else {
                $scope.BillDetails.OtherSrvPaymentModeList[Index].CashMode = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].DisableAmount = false;
                $scope.isPaymentModeVisible = false;
                $scope.BillDetails.OtherSrvPaymentModeList[Index].IsAdvanceExceeded = false;
                     $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceAmount = 0; // Bind the response to patientList
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceID = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceUsed = 0;
        $scope.BillDetails.OtherSrvPaymentModeList[Index].AdvanceBalance = 0;
            }
       // }             ///////
       debugger
        // Custom Logic: Check if PaidAmount > AdvanceAmount
    


    }

    $scope.DeleteService = function (item,Index) {
        debugger;


        if ($rootScope.IsFromView)
        {

            var tmpSer = 0;
            for (var i = 0; i < $scope.BillDetails.SelectedOtherServiceList.length; ++i) {
                if ($scope.BillDetails.SelectedOtherServiceList[i].Service == item.Service) {
                    tmpSer = i;
                    break;
                }
            }
          
                //$scope.BillDetails.DeletedServiceList.push($scope.BillDetails.SelectedOtherServiceList[tmpSer])   //commented by Nayan on 03/02/2020

            DeletedServiceList.push($scope.BillDetails.SelectedOtherServiceList[tmpSer])
            $scope.BillDetails.SelectedOtherServiceList.splice(tmpSer, 1)

                
            //var responseData = ConsumptionService.DeleteService($scope.PatientBillData.BillID, $scope.PatientBillData.BillUnitID,item.ServiceCode);
            //responseData.then(function (Response) {
            //    if (Response.data == 1) {
            //        AlertMessage.success(objResource.msgTitle, 'Record Deleted Successfully.');  
            //    }
            //    else {
            //        $scope.Error = error;
            //    }
            //}, function (error) {
            //    //AlertMessage.info('PalashIVF', 'Error Occured.');
            //    // usSpinnerService.stop('GridSpinner');
            //})


            $scope.TotalBaseRate();
            $scope.TotalPayable();
            $scope.TotalConcession();
            if ($scope.BillDetails.SelectedOtherServiceList.length > 0) {
                angular.forEach($scope.BillDetails.SelectedOtherServiceList, function (i, index) {
                    $scope.calConcessionAmt(i.ConcessionPercentage, i.BaseServiceRate, index);

                })
            }
        }

        else {
            debugger;
            var tmpSer = 0;
            for (var i = 0; i < $scope.BillDetails.SelectedOtherServiceList.length; ++i) {
                if ($scope.BillDetails.SelectedOtherServiceList[i].Service == item.Service) {
                    tmpSer = i;
                    break;
                }
            }
            $scope.BillDetails.SelectedOtherServiceList.splice(tmpSer, 1)
            $scope.TotalBaseRate();
            $scope.TotalPayable();
            $scope.TotalConcession();

        }
    }
    //$scope.CalBalanceAmt = function (Amt) {  //1500
    //    debugger;
    //    $scope.tempAmt = Amt;
    //    $scope.BillDetails.BalanceAmt = $scope.BillDetails.NetBillAmount - $scope.tempAmt;
    //    if ($scope.BillDetails.BalanceAmt > 0)
    //    {
    //        $scope.BillDetails.OtherSrvPaymentModeList.push({
    //            'PaymentModeID': 0,
    //            'Date': '',
    //            'Number': '',
    //            'BankID': 0,
    //            'PaidAmount': $scope.BillDetails.BalanceAmt,
    //            'CashMode': false
    //        });
    //    }
    //}

    $scope.SavePayment = function(item){
        debugger;
        usSpinnerService.spin('GridSpinner');
        if ($scope.BillDetails.OtherSrvPaymentModeList.length > 0) {
            for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length;i++ ){
                $scope.BillDetails.OtherSrvPaymentModeList.push({
                    'PaymentModeID': item.PaymentModeID,
                    'Date': item.Date,
                    'Number': item.Number,
                    'BankID': item.BankID,
                    'PaidAmount': item.PaidAmount
                })
                $scope.BillDetails.Payment.push({
                    'BillAmount': $scope.BillDetails.NetBillAmount

                })
            }
                

            var Promise = ConsumptionService.SavePayment(BillDetails);
            Promise.then(function (resp) {
                debugger;
                if (resp.data == 1) {
                    usSpinnerService.stop('GridSpinner');
                    // AlertMessage.success('Palash IVF', 'Bill saved successfully.'); //Commented by swatih for localization 22/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgBillsavedsuccessfully); //Modified by swatih for localization 22/7/2020
                    $location.path("/BillList");
                }
            }, function (error) {
                 usSpinnerService.stop('GridSpinner');
            })



        }
        else {
            //AlertMessage.info('Palash IVF', 'Add atleast 1 Payment Mode.'); //Commented by swatih for localization 22/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service); //Modified by swatih for localization 22/7/2020
            usSpinnerService.stop('GridSpinner');
        }
    }

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
                            'Date': '',
                            'Number': '',
                            'BankID': 0,
                            'PaidAmount':$scope.BillDetails.NetBillAmount,      
                            'CashMode': true
                        });
            //End :: Added by AniketK on 05Oct2020
            $scope.BillDetails.IsFreeze = false;
            //$scope.ShowPaymentData = false; //Commented and Modified by AniketK on 05Oct2020
            $scope.ShowPaymentData = true;
            $scope.disableFeeeze = false;
            $scope.disableSave = false;
        }
    }
    }
      
    $scope.ViewBill = function (i) {
        debugger;

        if ($rootScope.PatientBillDetails.IsFromLastVisit) {
            $rootScope.HideWhenView = true;
            $rootScope.ViewPatientBill = i;
            $rootScope.IsFromView = true;
            $location.path("/NewBilling");
        }
        else {
            $rootScope.ViewPatientBill = i;
            $rootScope.IsFromView = true;
            $rootScope.HideWhenView = false;
            $location.path("/NewBilling");
        }

    }
    $scope.ShowPopUpForPayment = function (item,index) {        
        debugger;
        $scope.idx = index;
        //$scope.NewDate = $filter('date')(new Date(), 'medium');
        $scope.NewDate = $filter('date')(new Date(), 'dd-MMM-yyyy');
       // $scope.BillDate = $filter('date')(item.Date, 'medium');   //

        //$scope.NewDate = new Date();
        //$scope.BillDate = item.Date;   //
        $scope.BillDate = $filter('date')(item.Date, 'dd-MMM-yyyy');   //
        $scope.BillIDFromPopup = item.BillID;
        $scope.BillUnitIDFromPopup = item.BillUnitID;  //
        $scope.NetBillAmountfromPouup = item.NetBillAmount; //
        $scope.VisitDFromPopup = item.VisitID;
        $scope.VisitUnitIDFromPopup = item.VisitUnitID;
        $scope.BillDetails.IsFreezed = item.IsFreezed;
        $scope.BillDetails.BalanceAmountSelf = item.BalanceAmountSelf;

        swalMessages.MessageBox(objResource.msgTitle, objResource.msgYouWantToSettleBill, "warning", function (isConfirmed) {
            if (isConfirmed) {
                angular.element(Settle_Bill).modal('show');
                // $scope.idx = index;
                $scope.GetChargeList();   //
                $scope.GetPaymentDetailsForSettleBill(item.BillID, item.BillUnitID);                 
                $scope.GetModeOfPayment();
                $scope.GetBankList();
                $scope.AddPaymentRow();
                //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++)
                // {
                $scope.BillDetails.OtherSrvPaymentModeList.length = 0;
                    $scope.BillDetails.OtherSrvPaymentModeList.push({
                        'PaymentModeID': 0,
                        'Date': '',
                        'Number': '',
                        'BankID': 0,
                        'PaidAmount':$scope.BillDetails.BalanceAmountSelf,      //$scope.BillDetails.NetBillAmount,
                        'CashMode': true
                    });
                //}
              
            }
            else {
                angular.element(Settle_Bill).modal('hide');

            }
        })

    }
    $scope.GetPaymentDetailsForSettleBill = function (BillID,BillUnitID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = ConsumptionService.GetPaymentDetailsForSettleBill(BillID, BillUnitID);
        responseData.then(function (Response) {
            $scope.PaymentDetailsForSettleBill = Response.data;
            $scope.PaymentData = {};
            $scope.PaymentData.PatientName = $scope.PaymentDetailsForSettleBill.PatientName;
            $scope.PaymentData.MRNO = $scope.PaymentDetailsForSettleBill.PatientMRNo;
            $scope.PaymentData.NetBillAmount = $scope.PaymentDetailsForSettleBill.NetBillAmount;
            $scope.PaymentData.TotalBillAmount = $scope.PaymentDetailsForSettleBill.TotalBillAmount;
            $scope.PaymentData.BalanceAmountSelf = $scope.PaymentDetailsForSettleBill.BalanceAmountSelf;
            $scope.PaymentData.PaidAmount = $scope.PaymentDetailsForSettleBill.PaidAmount;
            $scope.PaymentData.BillNO = $scope.PaymentDetailsForSettleBill.BillNo;

            //for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++)
            //{
            //   // $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount = $scope.PaymentDetailsForSettleBill[i].NetBillAmount;
            //    $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount = $scope.PaymentDetailsForSettleBill.NetBillAmount;
            //}
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            //AlertMessage.info('PalashIVF', 'Error Occured.');
            usSpinnerService.stop('GridSpinner');
        })
    }

    $scope.Cancel = function () {
        debugger;      
        $scope.BillDetails.OtherSrvPaymentModeList.length = 0;

        angular.element(Settle_Bill).modal('hide');
        angular.element(Receipts).modal('hide');


    }

    $scope.GetChargeList = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = ConsumptionService.GetChargeList($scope.BillIDFromPopup, $scope.BillUnitIDFromPopup, $scope.VisitDFromPopup, $scope.VisitUnitIDFromPopup);
        responseData.then(function (Response) {
            $scope.BillDetails.ChargeList = Response.data;
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            //AlertMessage.info('PalashIVF', 'Error Occured.');
            usSpinnerService.stop('GridSpinner');
        })
    }   
       $scope.SaveBillWithoutPaymentNew = function () {
        debugger;
        $scope.BillDetails.OtherSrvPaymentModeList.length = 0;
        $scope.BillDetails.Payment.length = 0;
        $scope.IsExceed = false;        


        
        $scope.SaveBillNew();   //
    }

    $scope.SaveBillWithoutPayment = function () {
        debugger;
        $scope.BillDetails.OtherSrvPaymentModeList.length = 0;
        $scope.BillDetails.Payment.length = 0;
        $scope.IsExceed = false;        


        
        $scope.SaveBill();   //
    }
    $scope.Validate = function () {
        debugger;
        $scope.Total = 0     //
        for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
            $scope.Total = parseFloat($scope.Total) + parseFloat($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount);
       // }            //
        //////
            if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount > $scope.BillDetails.BalanceAmountSelf) {         // $scope.BillDetails.NetBillAmount
            $scope.PaymentIndex = i;
        }
            if ($scope.Total > $scope.BillDetails.BalanceAmountSelf) {      //$scope.BillDetails.NetBillAmount
            $scope.IsOutOfRange = true;
            $scope.PaymentIndex = i;
            $scope.IsExceed = true;
            return false;
        }
        else {
            $scope.IsOutOfRange = false;
        }
            }   //
        /////////////
        for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
            //  if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.BillDetails.NetBillAmount) {
            //$scope.BillDetails.Payment.BillBalanceAmount = $scope.BillDetails.NetBillAmount - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;
            //if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount < $scope.BillList[$scope.idx].BalanceAmountSelf) {

            
            var OtherSrvPaymentModeList1 = [];
            OtherSrvPaymentModeList1 = $filter('filter')($scope.BillDetails.OtherSrvPaymentModeList, function (d) { return d.PaymentModeID == undefined || d.PaymentModeID == 0 });          // d.Days == undefined ||    added by Nayan Kamble on 17/12/2019
            if (OtherSrvPaymentModeList1.length > 0) {
                angular.forEach(OtherSrvPaymentModeList1, function (item) {
                    item.IsPaymentModeID = true;
                    $scope.IsPaymentModeID = true;
                    // AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
                })
                return false;
            }

            if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID == 0) {
            }
            //  else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID != 1) {     // Cheque,Card,Online     //commented by Nayan just to check  04/02/2020

                //var Amount = [];                             //commented by Nayan just to check  04/02/2020
                //Amount = $filter('filter')($scope.BillDetails.OtherSrvPaymentModeList,
                //  function (d) { return d.PaidAmount == undefined || d.PaidAmount == 0 || d.PaidAmount == '' });
                //if (Amount.length > 0) {
                //    angular.forEach(Amount, function (item) {
                //        item.IsAmountNotFill = true;
                //        $scope.IsAmountNotFill = true;
                //        AlertMessage.warning("PalashIVF", "Please fill mandatory fields");
                //    })
                //    return false;
                //}
                //var Number = [];
                //Number = $filter('filter')($scope.BillDetails.OtherSrvPaymentModeList,
                //    function (d) { return d.Number == undefined || d.Number == 0 || d.Number == '' });
                //if (Number.length > 0) {
                //    angular.forEach(Number, function (item) {
                //        item.IsNumberNotFill = true;
                //        $scope.IsNumberNotFill = true;
                //        AlertMessage.warning("PalashIVF", "Please fill mandatory fields");
                //    })
                //    return false;
                //}
                //var BankID = [];
                //BankID = $filter('filter')($scope.BillDetails.OtherSrvPaymentModeList,
                //    function (d) { return d.BankID == undefined || d.BankID == 0 });
                //if (BankID.length > 0) {
                //    angular.forEach(BankID, function (item) {
                //        item.IsBankIDNotFill = true;
                //        $scope.IsBankIDNotFill = true;
                //        AlertMessage.warning("PalashIVF", "Please fill mandatory fields");
                //    })
                //    return false;
                //}
                //var Date = [];
                //Date = $filter('filter')($scope.BillDetails.OtherSrvPaymentModeList,
                //    function (d) { return d.Date == undefined || d.Date == '' });
                //if (Date.length > 0) {
                //    angular.forEach(Date, function (item) {
                //        item.IsDateIDNotFill = true;
                //        $scope.IsDateIDNotFill = true;
                //        AlertMessage.warning("PalashIVF", "Please fill mandatory fields");
                //    })
                //    return false;
                //}




                for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID != 1) {


                        var TempLst = [];
                        TempLst.push($scope.BillDetails.OtherSrvPaymentModeList[i]);
                        
                        var Amount = [];
                        Amount = $filter('filter')(TempLst, function (d) { return d.PaidAmount == undefined || d.PaidAmount == 0 || d.PaidAmount == '' });
//($scope.BillDetails.OtherSrvPaymentModeList, function (d) { return d.PaidAmount == undefined || d.PaidAmount == 0 || d.PaidAmount == '' });
                        if (Amount.length > 0) {
                            angular.forEach(Amount, function (item) {
                                item.IsAmountNotFill = true;
                                $scope.IsAmountNotFill = true;
                                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields"); //Commented by swatih for localization 22/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020

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
                                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields");//Commented by swatih for localization 22/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields);//Modified by swatih for localization 22/7/2020
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
                                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields");//Commented by swatih for localization 22/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields);//Modified by swatih for localization 22/7/2020
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
                                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields");//Commented by swatih for localization 22/7/2020
                                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields);//Modified by swatih for localization 22/7/2020
                            })
                            //   return false;
                        }

                    }
                    else {
                        //$scope.BillDetails.OtherSrvPaymentModeList[i].IsAmountNotFill = false;                       
                        $scope.BillDetails.OtherSrvPaymentModeList[i].IsNumberNotFill = false;                        
                        $scope.BillDetails.OtherSrvPaymentModeList[i].IsBankIDNotFill = false;                        
                        $scope.BillDetails.OtherSrvPaymentModeList[i].IsDateIDNotFill = false;
                       // if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount > $scope.BillDetails.NetBillAmount) {
                        if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount > $scope.BillDetails.BalanceAmountSelf)        //$scope.NetBillAmountfromPouup
                        {
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
                    //AlertMessage.warning("PalashIVF", "Please fill mandatory fields");//Commented by swatih for localization 22/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields); //Modified by swatih for localization 22/7/2020
                    return false;
                }
                 
                else { 
                    return true;
                }


               
            //}
                if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaymentModeID == 1) {  //Cash
                // item.IsAmountNotFill = false;
                $scope.IsAmountNotFill = false;
                // //item.IsNumberNotFill = false;
                $scope.IsNumberNotFill = false;
                //// item.IsBankIDNotFill = false;
                $scope.IsBankIDNotFill = false;
                //// item.IsDateIDNotFill = false;
                $scope.IsDateIDNotFill = false;
                    //if ($scope.Total > $scope.BillDetails.NetBillAmount) {
                if ($scope.Total > $scope.BillDetails.BalanceAmountSelf) {    /////
                    $scope.IsExceed = true;
                    return false;
                }
            }








            if ($scope.Total < $scope.BillList[$scope.idx].BalanceAmountSelf) {

                $scope.BillDetails.Payment.BillBalanceAmount = $scope.BillList[$scope.idx].BalanceAmountSelf - $scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount;
                return true;
            }
                // else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillDetails.NetBillAmount) {
                // else if ($scope.BillDetails.OtherSrvPaymentModeList[i].PaidAmount == $scope.BillList[$scope.idx].BalanceAmountSelf) {
            else if ($scope.Total == $scope.BillList[$scope.idx].BalanceAmountSelf) {

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

        $scope.SaveUpdatePayment = function (BillDetails) {
            debugger;            
            if ($scope.Validate()) {
                $scope.BillDetails.Payment.length = 0;
                $scope.BillDetails.Payment.push({
                    'BillID': $scope.BillList[$scope.idx].BillID,        // $scope.BillIDForSettle, 
                    'BillAmount': $scope.BillList[$scope.idx].NetBillAmount,            //$scope.BillDetails.NetBillAmount,
                    'BillBalanceAmount': $scope.BillList[$scope.idx].BalanceAmountSelf - $scope.Total                 //$scope.BillDetails.Payment.BillBalanceAmount    NetBillAmount
                });

                $scope.BillDetails.NetBillAmount = $scope.PaymentData.NetBillAmount;             //  $scope.BillDetails.Payment[0].BillAmount;
                $scope.BillDetails.BalanceAmountSelf = $scope.PaymentData.BalanceAmountSelf - $scope.Total;    // $scope.BillDetails.Payment[0].BillBalanceAmount;

                if ($scope.BillDate == $scope.NewDate) {
                    /* First Time without Concession only when Bill Date Is Same as Settlement Date   START */

                    $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order
                    $scope.TotalAmt2 = $scope.Total;        //pPayDetails.PaidAmount;
                    $scope.ConsumeAmt = 0;

                    angular.forEach($scope.BillDetails.ChargeList, function (item) {

                        item.IsUpdate = true;
                        item.IsSameDate = false;

                        $scope.BalAmt = item.NetAmount - item.TotalPaidPatientAmount;     //ServicePaidAmount;
                        $scope.PConsumeAmt = 0;
                        if ($scope.TotalAmt2 > 0 && $scope.BalAmt > 0) {
                            $scope.ConsumeAmt = $scope.BalAmt;
                            if ($scope.TotalAmt2 >= $scope.ConsumeAmt) {
                                $scope.TotalAmt2 = $scope.TotalAmt2 - $scope.ConsumeAmt;
                            }
                            else {
                                $scope.ConsumeAmt = $scope.TotalAmt2;
                                $scope.TotalAmt2 = $scope.TotalAmt2 - $scope.ConsumeAmt;
                            }
                            $scope.PConsumeAmt = $scope.ConsumeAmt;
                            //item.ServicePaidAmount = $scope.ConsumeAmt + item.ServicePaidAmount;
                            item.TotalPaidPatientAmount = $scope.ConsumeAmt + item.TotalPaidPatientAmount;

                            item.TotalPatientBalanceAmount = $scope.BalAmt - $scope.ConsumeAmt;

                            // item.TotalServicePaidAmount = item.TotalPaidPatientAmount;     //item.ServicePaidAmount;     //need to implement   item.TotalServicePaidAmount
                            // item.TotalConcession = item.Concession;   //
                            //item.TotalNetAmount = item.NetAmount;     //

                        }
                        else {
                            // item.TotalServicePaidAmount = item.TotalPaidPatientAmount;     //item.ServicePaidAmount;      //need to implement   item.TotalServicePaidAmount
                            //item.TotalConcession = item.Concession;     //
                            //item.TotalNetAmount = item.NetAmount;           //
                            item.TotalPatientBalanceAmount = item.NetAmount - item.TotalPaidPatientAmount;     //item.ServicePaidAmount;

                        }

                    })




                }    /* without Concession only when Bill Date Is Same as Settlement Date  END */
                else {
                    /*Without Concession Second Time Settlement   START  */

                    //$scope.BillDetails.Payment.length = 0;
                    //  $scope.BillDetails.OtherSrvPaymentModeList.length = 0;
                    $scope.BillDetails.ChargeDetailsList.length = 0;
                    // $scope.BillDetails.ChargeList.length = 0;

                    $scope.TotalAmt3 = $scope.Total;
                    $scope.ConsumeAmt = 0;
                    // $scope.ConAmt = pPayDetails.SettlementConcessionAmount;
                    $scope.BillDetails.ChargeList = $filter('orderBy')($scope.BillDetails.ChargeList, 'NetAmount', true);    //true for descending order and false for ascending order

                    angular.forEach($scope.BillDetails.ChargeList, function (item) {
                        /*Same Date*/

                        if ($scope.BillDate == $scope.NewDate) {
                            item.IsUpdate = true;
                            item.IsSameDate = true;

                            $scope.BalAmt = item.NetAmount - item.TotalPaidPatientAmount;               // SettleNetAmount     item.ServicePaidAmount;
                            // $scope.TotalServicePaidAmount = item.TotalPaidPatientAmount;     //item.ServicePaidAmount;    //need to implement   item.TotalServicePaidAmount

                            // $scope.TotalConcession = item.Concession;             //
                            $scope.TotalNetAmount = item.NetAmount;   //SettleNetAmount;

                            $scope.PConsumeAmt = 0;

                            if ($scope.BalAmt > 0) {
                                if ($scope.TotalAmt3 > 0 && $scope.BalAmt > 0) {

                                    $scope.ConsumeAmt = $scope.BalAmt;
                                    if ($scope.TotalAmt3 >= $scope.ConsumeAmt) {
                                        $scope.TotalAmt3 = $scope.TotalAmt3 - $scope.ConsumeAmt;

                                    }
                                    else {
                                        $scope.ConsumeAmt = $scope.TotalAmt3;
                                        $scope.TotalAmt3 = $scope.TotalAmt3 - $scope.ConsumeAmt;

                                    }
                                    //item.ServicePaidAmount = ConsumeAmt;
                                    item.TotalPaidPatientAmount = $scope.ConsumeAmt;
                                    $scope.PConsumeAmt = item.TotalPaidPatientAmount;  // ServicePaidAmount;
                                    item.TotalPatientBalanceAmount = $scope.BalAmt - item.TotalPaidPatientAmount;   //ServicePaidAmount;
                                    //  item.Concession = $scope.ConAmt;

                                    // item.TotalServicePaidAmount = $scope.TotalServicePaidAmount + item.TotalPaidPatientAmount;    //ServicePaidAmount;      //need to implement   item.TotalServicePaidAmount
                                    //  item.TotalConcession = $scope.TotalConcession + item.Concession;    //
                                    item.TotalNetAmount = item.NetAmount;     // SettleNetAmount;
                                    //item.TotalConcessionPercentage = 0;    //




                                }
                                else {

                                    item.TotalPatientBalanceAmount = $scope.BalAmt;
                                    //item.ServicePaidAmount = item.ServicePaidAmount;   //Previous 
                                    if ($scope.TotalAmt3 == 0)
                                        item.TotalPaidPatientAmount = 0;    // ServicePaidAmount = 0; //In Case When TotalAmt3 = 0 (i.e. all paidamount is consumed) && BalAmt > 0

                                    // item.Concession = item.Concession;   //
                                    //item.SettleNetAmount = item.SettleNetAmount;
                                    item.NetAmount = item.NetAmount;


                                    //Total Amount
                                    // item.TotalServicePaidAmount = $scope.TotalServicePaidAmount + item.TotalPaidPatientAmount;    //ServicePaidAmount;  // new code as item.TotalServicePaidAmount is not set          //need to implement   item.TotalServicePaidAmount
                                    // item.TotalConcession = $scope.TotalConcession + item.Concession;   //
                                    item.TotalNetAmount = item.TotalAmount - ($scope.TotalConcession + item.Concession);   // New For T_Chrge  Table 
                                }



                            }
                            else {
                                //item.SettleNetAmount = item.SettleNetAmount;
                                item.NetAmount = item.NetAmount;
                                item.TotalPaidPatientAmount = 0;    // ServicePaidAmount = 0;
                                item.TotalPatientBalanceAmount = 0;
                                //  item.Concession = 0;     //

                                //Total Amount
                                item.TotalNetAmount = $scope.TotalNetAmount;
                                //  item.TotalServicePaidAmount = $scope.TotalServicePaidAmount + item.TotalPaidPatientAmount;   //ServicePaidAmount;     //need to implement   item.TotalServicePaidAmount
                                //   item.TotalConcession = $scope.TotalConcession + item.Concession;   //

                            }


                        }
                            /*Different Date*/
                        else {
                            item.IsUpdate = false;
                            item.IsSameDate = false;

                            $scope.BalAmt = item.NetAmount - item.TotalPaidPatientAmount;    //SettleNetAmount
                            // $scope.TotalServicePaidAmount = item.TotalPaidPatientAmount;    //need to implement   item.TotalServicePaidAmount
                            // $scope.TotalConcession = item.Concession;   //
                            $scope.TotalNetAmount = item.NetAmount;   //   SettleNetAmount;
                            $scope.PConsumeAmt = 0;
                            if ($scope.BalAmt > 0) {
                                if ($scope.TotalAmt3 > 0 && $scope.BalAmt > 0) {
                                    $scope.ConsumeAmt = $scope.BalAmt;
                                    if ($scope.TotalAmt3 >= $scope.ConsumeAmt) {
                                        $scope.TotalAmt3 = $scope.TotalAmt3 - $scope.ConsumeAmt;
                                    }
                                    else {
                                        $scope.ConsumeAmt = $scope.TotalAmt3;
                                        $scope.TotalAmt3 = $scope.TotalAmt3 - $scope.ConsumeAmt;
                                    }
                                    item.TotalPaidPatientAmount = $scope.ConsumeAmt;
                                    $scope.PConsumeAmt = item.TotalPaidPatientAmount;
                                    item.TotalPatientBalanceAmount = $scope.BalAmt - item.TotalPaidPatientAmount;
                                    //Total Amount
                                    // item.TotalServicePaidAmount = $scope.TotalServicePaidAmount + item.TotalPaidPatientAmount;    //need to implement   item.TotalServicePaidAmount
                                    // item.TotalConcession = item.Concession;   //
                                    //  item.TotalNetAmount = item.TotalAmount - item.Concession;   //
                                    // item.Concession = 0;  //
                                }
                                else {
                                    item.TotalPatientBalanceAmount = $scope.BalAmt;
                                    //item.ServicePaidAmount = item.ServicePaidAmount;  //Previous 
                                    if ($scope.TotalAmt3 == 0)
                                        item.TotalPaidPatientAmount = 0; //In Case When TotalAmt3 = 0 (i.e. all paidamount is consumed) && BalAmt > 0 

                                    // item.Concession = $scope.ConAmt;
                                    //item.SettleNetAmount = item.SettleNetAmount;
                                    item.NetAmount = item.NetAmount;
                                    //Total Amount

                                    //item.TotalServicePaidAmount = item.ServicePaidAmount;   //Previous 
                                    //item.TotalServicePaidAmount = $scope.TotalServicePaidAmount + item.TotalPaidPatientAmount;    //need to implement   item.TotalServicePaidAmount

                                    // item.TotalConcession = $scope.TotalConcession + item.Concession;   //
                                    /// item.TotalNetAmount = item.TotalAmount - (TotalConcession + item.Concession);   ///
                                }
                            }

                            else {
                                //item.SettleNetAmount = item.SettleNetAmount;
                                item.NetAmount = item.NetAmount;
                                item.TotalPaidPatientAmount = 0;
                                item.TotalPatientBalanceAmount = 0;
                                //  item.Concession = 0;     //
                                //Total Amount
                                item.TotalNetAmount = $scope.TotalNetAmount;
                                // item.TotalServicePaidAmount = $scope.TotalServicePaidAmount + item.TotalPaidPatientAmount;    //need to implement   item.TotalServicePaidAmount
                                //  item.TotalConcession = $scope.TotalConcession + item.Concession;  //
                            }
                        }
                    })



                }    /* Without Concession Second Time Settlement    END*/

                $scope.BillDetails.BillID = $scope.BillIDFromPopup;
                $scope.BillDetails.BillUnitID = $scope.BillUnitIDFromPopup;

                $scope.UpdatePaymentPopup();
                $scope.UpdateBillPaymentDetails();

                //var Promise = ConsumptionService.UpdateChargeWhileSettle($scope.BillDetails);   //Update Charge Table  
                //Promise.then(function (resp) {
                //    debugger;
                //    if (resp.data == 1) {
                //        // $scope.UpdatePaymentPopup();
                //        //   usSpinnerService.stop('GridSpinner');   

                //        AlertMessage.success('Palash IVF', 'Payment saved successfully.');
                //                angular.element(Settle_Bill).modal('hide');
                //    }
                //    //$scope.UpdatePaymentPopup();
                //}, function (error) {

                //    // usSpinnerService.stop('GridSpinner');
                //})
                //}





                //}
                //else {
                //    $scope.UpdatePaymentPopup();
                //}


                //var responseData = ConsumptionService.SaveUpdatePayment($scope.BillDetails);
                //responseData.then(function (Response) {
                //    if (Response.data == 1) {
                //        AlertMessage.success('Palash IVF', 'Payment saved successfully.');
                //        angular.element(Settle_Bill).modal('hide');
                //        $scope.PrintSettleBill($scope.BillList[$scope.idx].PatientID, $scope.BillList[$scope.idx].PatientUnitID, $scope.BillList[$scope.idx].BillID, $scope.BillList[$scope.idx].BillUnitID);

                //        $scope.LoadBillList();
                //    }
                //    else {
                //        $scope.Error = error;
                //    }
                //}, function (error) {
                //    //AlertMessage.info('PalashIVF', 'Error Occured.');
                //    // usSpinnerService.stop('GridSpinner');
                //})

            }    //Close Validate

            else if ($scope.IsPaymentModeID) {
                //AlertMessage.info('PalashIVF', 'Enter Payment Mode.');//Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgEnterPaymentMode);//Modified by swatih for localization 22/7/2020
            }
            else if ($scope.IsAmountNotFill || $scope.IsNumberNotFill || $scope.IsBankIDNotFill || $scope.IsDateIDNotFill) {
                //AlertMessage.warning("PalashIVF", "Please fill mandatory fields");//Commented by swatih for localization 22/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields);//Modified by swatih for localization 22/7/2020
            }
            else if ($scope.IsExceed) {
                // AlertMessage.info('PalashIVF', 'Amount exceeded');//Commented by swatih for localization 22/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAmountexceeded);//Modified by swatih for localization 22/7/2020
                $scope.tempPaymentLst = [];
                for (var i = 0; i < $scope.BillDetails.OtherSrvPaymentModeList.length; i++) {
                    if ($scope.BillDetails.OtherSrvPaymentModeList.length == 1) {
                        $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.BalanceAmountSelf;   /////$scope.BillDetails.NetBillAmount;
                    }
                    else {
                        if (i != $scope.PaymentIndex) {
                            $scope.tempPaymentLst.push($scope.BillDetails.OtherSrvPaymentModeList[i])

                        }
                    }
                }

                $scope.Total = 0;    //
                for (var i = 0; i < $scope.tempPaymentLst.length; i++) {
                    //$scope.SumOfPayment = parseFloat($scope.BillDetails.NetBillAmount - $scope.tempPaymentLst[i].PaidAmount);

                    $scope.Total = parseFloat($scope.Total) + parseFloat($scope.tempPaymentLst[i].PaidAmount);

                }
                $scope.BillDetails.OtherSrvPaymentModeList[$scope.PaymentIndex].PaidAmount = $scope.BillDetails.BalanceAmountSelf - $scope.Total;                //////$scope.BillDetails.NetBillAmount - $scope.Total;
                // }

                $scope.disableClickNewBill = false;
            }
    }
   // }
    $scope.UpdatePaymentPopup = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = ConsumptionService.SaveUpdatePayment($scope.BillDetails);
        responseData.then(function (Response) {
            //  if (Response.data == 1) {
              if (Response.data >= 1) {
                  usSpinnerService.stop('GridSpinner');
                  $scope.PaymentID = Response.data;
                 // AlertMessage.success('Palash IVF', 'Payment saved successfully.');//Commented by swatih for localization 22/7/2020
                  AlertMessage.success(objResource.msgTitle, objResource.msgPaymentsavedsuccessfully)//Modified by swatih for localization 22/7/2020
                  $scope.PrintSettleBill($scope.BillList[$scope.idx].PatientID, $scope.BillList[$scope.idx].PatientUnitID, $scope.BillList[$scope.idx].BillID, $scope.BillList[$scope.idx].BillUnitID, $scope.PaymentID);
                //$scope.PaymentUpdated = true;
                //angular.element(Settle_Bill).modal('hide');
                //$scope.GetBillList($scope.BillingList);
               // $scope.PrintSettleBill($scope.BillList[$scope.idx].PatientID, $scope.BillList[$scope.idx].PatientUnitID, $scope.BillList[$scope.idx].BillID, $scope.BillList[$scope.idx].BillUnitID);

               // $scope.LoadBillList();   ///
            }
            else {
              //  $scope.Error = error;
                usSpinnerService.stop('GridSpinner');
            }
        }, function (error) {
            //AlertMessage.info('PalashIVF', 'Error Occured.');
            usSpinnerService.stop('GridSpinner');
        })
    }
    $scope.UpdateBillPaymentDetails = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var responseData = ConsumptionService.UpdateBillPaymentDetails($scope.BillDetails);
        responseData.then(function (Response) {
            if (Response.data == 1) {
                usSpinnerService.stop('GridSpinner');

                angular.element(Settle_Bill).modal('hide');

                 if( $rootScope.IsFromPatientBillList)
                {
                         $scope.SearchData($scope.PatientBill);
                }
            else {
                $scope.GetBillList($scope.BillingList);
            }
              //  $scope.PaymentID;   /////
               // $scope.PrintSettleBill($scope.BillList[$scope.idx].PatientID, $scope.BillList[$scope.idx].PatientUnitID, $scope.BillList[$scope.idx].BillID, $scope.BillList[$scope.idx].BillUnitID);
            }
            else {
                usSpinnerService.stop('GridSpinner');
               // $scope.Error = error;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        })
    }
   


    $scope.PrintSettleBill = function PrintSettleBill(PatID,PatUnitID,BillID,BillUnitID,PaymentID) {
        debugger;
        var a = encodeURIComponent('U=' + PatUnitID + '&P=' + PatID + '&BU=' + BillUnitID + '&BID=' + BillID + '&PAYID=' + PaymentID);
        window.open('/Reports/New_Billing/SettleBillReport/SettleBillWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
       
    }


    $scope.PrintReceiptBill = function (i) {   
        debugger;
        var a = encodeURIComponent('U=' + $scope.PatientUnitIDFromPopup + '&P=' + $scope.PatientIDFromPopup + '&BU=' + $scope.BillUnitIDFromPopup + '&BID=' + i.BillID + '&PAYID=' + i.PaymentID);
        window.open('/Reports/New_Billing/SettleBillReport/SettleBillWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    $scope.FilterDate = function FilterDate(no) {
        debugger;
        if (no == 1) {    
            $scope.IsFromDate = true;
            $scope.IsToDate = true;
            $scope.BillingList.VisitFromDate = new Date();
            $scope.BillingList.VisitToDate = new Date();
            $scope.GetBillList($scope.BillingList);
        }
        else if (no == 2) {               //Last 15 Days
            $scope.IsFromDate = true;
            $scope.IsToDate = true;
            $scope.BillingList.VisitFromDate = new Date().setDate(new Date().getDate() - 15);
            $scope.BillingList.VisitToDate = new Date();
            $scope.GetBillList($scope.BillingList);
        } 
        else if (no == 3) {                //Last 30 Days
            $scope.IsFromDate = true;
            $scope.IsToDate = true;
            $scope.BillingList.VisitFromDate = new Date().setDate(new Date().getDate() - 30);
            $scope.BillingList.VisitToDate = new Date();
            $scope.GetBillList($scope.BillingList);
        }
        else if (no == 4) {                           //Custom
            $scope.IsFromDate = false;
            $scope.IsToDate = false;
            $scope.BillingList.VisitFromDate = new Date();
            $scope.BillingList.VisitToDate = new Date();
            $scope.GetBillList($scope.BillingList);
        }
        else {                           //Todays
            $scope.IsFromDate = true;
            $scope.IsToDate = true;
            $scope.BillingList.VisitFromDate = new Date();
            $scope.BillingList.VisitToDate = new Date();
            $scope.GetBillList($scope.BillingList);
        }
    }

    $scope.EnableUpdateBtn = function () {
        debugger;
        $scope.disableClickNewBill = false;
    }

     $scope.fetchitemname = function (Search) {
  debugger
    if (!Search) {
        $scope.itemname = []; // Clear the list if search text is empty
        return;
    }

    var selectedStoreID = $scope.PatientBill.StoreID;
    if (!selectedStoreID) {
        AlertMessage.warning("Warning", "Please select a store before searching.");
        return;
    }

    // Call the service method to fetch the data
    var responseData = ConsumptionService.GetItemListForPharmacy(selectedStoreID,Search);
    responseData.then(function (response) {
    debugger
        $scope.itemname = response.data; // Bind the response to patientList
//$scope.Advancepatient = angular.copy(response.data);
//console.log($scope.Advancepatient)
        
    }, function (error) {
        AlertMessage.warning(objResource.msgTitle, 'Error fetching patients: ' + (error.message || 'Unknown error')); // Show error message
        
        
    });
};

    $scope.LoadPatientBillList = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        $scope.PatientBill.FromDate = new Date();
        $scope.PatientBill.ToDate = new Date();
        $scope.fillClinicList();
        $scope.PatientBill.BillStatus = 0;
        $scope.PatientBill.BillType = 0;
        $scope.PatientBill.BillFormat = 0;

        //$scope.GetBillStatus();
        // $scope.GetBillType();
        // $scope.GetPrintFormat();
      
       $scope.fillClinicListNew();
        $scope.SearchData($scope.PatientBill);
        $rootScope.IsFromPatientBillList = true;
        usSpinnerService.stop('GridSpinner');
    }

    $scope.SearchData = function (PatientBill) {
        debugger;

        debugger;
        var Bill = [];
        usSpinnerService.spin('GridSpinner');
        if (angular.isUndefined(PatientBill.FromDate)) { PatientBill.FromDate = null; }
        if (angular.isUndefined(PatientBill.ToDate)) { PatientBill.ToDate = null; }       
        if (angular.isUndefined(PatientBill.FirstName) || PatientBill.FirstName == '') { PatientBill.FirstName = null; }
        if (angular.isUndefined(PatientBill.MiddleName) || PatientBill.MiddleName == '') { PatientBill.MiddleName = null; }
        if (angular.isUndefined(PatientBill.LastName) || PatientBill.LastName == '') { PatientBill.LastName = null; }
        if (angular.isUndefined(PatientBill.MRNO) || PatientBill.MRNO =='') { PatientBill.MRNO = null; }
        if (angular.isUndefined(PatientBill.BillNO) || PatientBill.BillNO =='') { PatientBill.BillNO = null; }
        if (angular.isUndefined(PatientBill.OPDNO) || PatientBill.OPDNO =='') { PatientBill.OPDNO = null; }
        if (angular.isUndefined(PatientBill.BillStatus)) { PatientBill.BillStatus = 0; }
        if (angular.isUndefined(PatientBill.BillType)) { PatientBill.BillType = 0; }
        if (angular.isUndefined(PatientBill.PrintFormat)) { PatientBill.PrintFormat = 0; }
        if ((PatientBill.ToDate != null && PatientBill.FromDate == null) || (PatientBill.ToDate == null && PatientBill.FromDate != null)) {
            AlertMessage.info(objResource.msgTitle, objResource.msgSelVisFrmDtAndVisToDt);
        }
        else {
            if (PatientBill.FromDate <= PatientBill.ToDate) {
                 //Bill.push($filter('date')(PatientBill.FromDate, 'shortDate'));
                //Bill.push($filter('date')(PatientBill.ToDate, 'shortDate'));
                var FromDate = new Date(PatientBill.FromDate).toISOString();
                var ToDate = new Date(PatientBill.ToDate).toISOString();
                //Bill.push(PatientBill.FromDate);
                //Bill.push(PatientBill.ToDate);
                 Bill.push(PatientBill.StoreID);
                Bill.push(FromDate);
                Bill.push(ToDate);
                  Bill.push(PatientBill.FirstName);
                Bill.push(PatientBill.MiddleName);
                Bill.push(PatientBill.LastName);
                Bill.push(PatientBill.MRNO);
                Bill.push(PatientBill.BillNO);
                //Bill.push($scope.PatientData.PatID.toString());
                //Bill.push($scope.PatientData.PatUnitID.toString());
                //Bill.push(null);
                //Bill.push(null);   //3
              
                //Bill.push(PatientBill.MRNO);
                //Bill.push(PatientBill.BillNO);
                //Bill.push(PatientBill.OPDNO);
                //Bill.push(PatientBill.BillStatus.toString());
                //Bill.push(PatientBill.BillType.toString());
                //Bill.push(PatientBill.PrintFormat.toString());

                //Bill.push($scope.CurrentPage - 1);   ///
                var responseData = ConsumptionService.GetMaterialConsupmtionList(Bill, $scope.CurrentPage - 1, true);
                responseData.then(function (Response) {

                    if (Response.data.length > 0) {
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = Response.data[0].TotalCount; //
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        $scope.TotalItems = 0;
                    }
                    $scope.BillList = Response.data;

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

    $scope.GetReceiptList = function (BillID,BillUnitID) {
        debugger;
        var ResponseData = ConsumptionService.GetReceiptList(BillID,BillUnitID);
        ResponseData.then(function (Response) {
            debugger;          
            $scope.ReceiptList = Response.data;
            //$scope.PatientData.UnitID = 0;
           

        }, function (error) {
        });
    }
$scope.updateConversionFactorByIndex = function (item, index) {
debugger
    if (!item || !item.StockUOM) {
        AlertMessage.warning("Validation Error", "Please select a valid UOM.");
        return;
    }

    // Ensure required parameters are available
    const ItemID = item.ItemID || 0; // Replace with actual property if different
    const FromUOMID = item.BaseUOM || 0; // Base UOM ID
    const ToUOMID = item.StockUOM || 0; // Selected UOM
    const BatchID = item.BatchID || 0;
    // Call the API to fetch the conversion factor
    ConsumptionService.GetUOMConcersionFactor(BatchID,ItemID, FromUOMID, ToUOMID)
        .then(function (response) {
        debugger
            if (response.data) {
            debugger
                // Update the specific index in the BillList
                $scope.BillList.ConsumptionItemDetailsList[index].ConversionFactor = response.data.ConversionFactor || 0;
                $scope.BillList.ConsumptionItemDetailsList[index].CostPrice = response.data.CostPrice || 0;
                $scope.BillList.ConsumptionItemDetailsList[index].MRP = response.data.MRP || 0;
                $scope.BillList.ConsumptionItemDetailsList[index].TotalMRP=($scope.BillList.ConsumptionItemDetailsList[index].MRP * $scope.BillList.ConsumptionItemDetailsList[index].Quantity);
                $scope.BillList.ConsumptionItemDetailsList[index].Amount=($scope.BillList.ConsumptionItemDetailsList[index].CostPrice * $scope.BillList.ConsumptionItemDetailsList[index].Quantity)
            } else {
                AlertMessage.warning("Error", "No conversion factor found for the selected UOM.");
                $scope.BillList.ConsumptionItemDetailsList[index].ConversionFactor = 0; // Set to default if no data
            }
        })
        .catch(function (error) {
            AlertMessage.error("API Error", "Failed to fetch the conversion factor: " + (error.message || "Unknown error"));
            $scope.BillList.ConsumptionItemDetailsList[index].ConversionFactor = 0; // Handle error by setting default value
        });
};


    $scope.ShowReceiptPopUp = function (item,$index) {
        debugger;
        $scope.PatientIDFromPopup =item.PatientID
        $scope.PatientUnitIDFromPopup = item.PatientUnitID;
        $scope.BillIDFromPopup = item.BillID; 
        $scope.BillUnitIDFromPopup = item.BillUnitID;

        angular.element(Receipts).modal('show');
        $scope.GetPaymentDetailsForSettleBill(item.BillID, item.BillUnitID);
        $scope.GetReceiptList(item.BillID, item.BillUnitID);  // ReceiptList

    }
    $scope.SelectedBatches = [];
   $scope.addItem = function (){
debugger
    if (!$scope.Search || !$scope.SelectedBatch || !$scope.PatientBill.UOM || !$scope.PatientBill.Quantity) {
         AlertMessage.warning('Please fill all fields before adding.');
        return;
    }

     const isDuplicateBatch = $scope.BillList.ConsumptionItemDetailsList.some(item => item.BatchID === $scope.PatientBill.BatchId);

    if (isDuplicateBatch) {
        AlertMessage.warning('This batch has already been added.');
        return;
    }
    console.log('>>>>>>>>>>>>>>>>>>>> Selected Batch',$scope.SelectedBatch)
    console.log('>>>>>>>>>>>>>>>>>>>> Patient Bill',$scope.PatientBill)
    const newItem = {
        ItemName: $scope.Search.ItemName,
        SelectedBatch: $scope.SelectedBatch,
        Quantity: $scope.PatientBill.Quantity,
         AvailableQuantity: $scope.PatientBill.AvailableQuantity,
        BaseUOM:   $scope.PatientBill.UOM,
        CostPrice: $scope.PatientBill.CostPrice, // Default values; can be updated later
        MRP: $scope.PatientBill.MRP,
        ConversionFactor: 1,
        StockUOM:$scope.PatientBill.UOM,
        TotalMRP:($scope.PatientBill.MRP * $scope.PatientBill.Quantity),
        ItemID : $scope.PatientBill.ItemId,
        BatchID: $scope.PatientBill.BatchId,
        Amount:($scope.PatientBill.CostPrice * $scope.PatientBill.Quantity),
        BatchList: angular.copy($scope.BatchCode), // Copy batch list for dropdown
        StockUomlist: angular.copy($scope.UnitofMeasure),
        BaseUomlist: angular.copy($scope.UnitofMeasure)
    };
    console.log('>>>>>>>>>>>>>>>>>>>> Selected quantity',$scope.PatientBill.Quantity)
     $scope.SelectedBatches.push($scope.PatientBill.BatchId);
     console.log('>>>>>>>>>>> selected batches',$scope.SelectedBatches)
     

    $scope.BillList.ConsumptionItemDetailsList.push(newItem); // Add new item to bill list
    $scope.BillList.TotalAmount = newItem.Amount
       $scope.BillList.TotalMRPAmount = newItem.TotalMRP
};

$scope.removeItem = function (index) {
 const removedItem = $scope.BillList.ConsumptionItemDetailsList[index];
 const batchIndex = $scope.SelectedBatches.indexOf(removedItem.BatchID);
    if (batchIndex > -1) {
        $scope.SelectedBatches.splice(batchIndex, 1);
    }
    $scope.BillList.ConsumptionItemDetailsList.splice(index, 1); // Remove item from bill list
};

$scope.resetFields = function () {
$scope.PatientBill.StoreID = 0
    $scope.Search = '';
    $scope.SelectedBatch = null;
    $scope.PatientBill.UOM = null;
    $scope.PatientBill.Quantity = null;
};

     $scope.selectedBill = null;
      $scope.selectBill = function (bill) {
        if ($scope.selectedBill === bill) {
            // Unselect if the same row is clicked again
            $scope.selectedBill = null;
        } else {
            // Set the selected bill
            $scope.selectedBill = bill;
        }

        console.log('Selected bill:', $scope.selectedBill);
    };

    $scope.isBillSelected = function (billID) {
    return $scope.selectedBill && $scope.selectedBill.BillID === billID;
};
    $scope.openCancelModal = function (bill) {
    const modalInstance = $uibModal.open({
        templateUrl: 'consumptionitemmodalpopup',
        controller: 'ConsumptionModalController',
        size: '',
        windowClass: 'custom-xl-modal',
        resolve: {
            selectedBill: function () {
                return bill;
            }
        }
    });

    modalInstance.result.then(

        function (result) {

            if (result && result.refresh) {
                // Re-fetch the bill list without reloading the page
                const patientBill = {
                    FromDate: $scope.PatientBill.FromDate,
                    ToDate: $scope.PatientBill.ToDate,
                    FirstName: $scope.PatientBill.FirstName || null,
                    MiddleName: $scope.PatientBill.MiddleName || null,
                    LastName: $scope.PatientBill.LastName || null,
                    MRNO: $scope.PatientBill.MRNO || null,
                    BillNO: $scope.PatientBill.BillNO || null,
                    OPDNO: $scope.PatientBill.OPDNO || null,
                    BillStatus: $scope.PatientBill.BillStatus || 0,
                    BillType: $scope.PatientBill.BillType || 0,
                    PrintFormat: $scope.PatientBill.PrintFormat || 0,
                };
                console.log(patientBill)
                $scope.SearchData(patientBill);
            }
        },
        function () {
            console.log('Cancellation modal dismissed');
        }
    );
};


$scope.confirmAndSave = function () {
    // Show the confirmation popup
    swalMessages.MessageBox(
        objResource.msgTitle, 
        objResource.msgDoYouWantToFreezBill, 
        "warning", 
        function (isConfirmed) {
            if (isConfirmed) {
                // If the user confirms, call the API
                $scope.saveBillList();
            }
        }
    );
};

$scope.saveBillList = function () {
debugger
    if (!$scope.BillList.ConsumptionItemDetailsList || !$scope.BillList.ConsumptionItemDetailsList.length) {
        AlertMessage.warning(objResource.msgTitle, "No items to save.");
        return;
    }
    debugger
    $scope.objMaterialConsumption = {}
    console.log(">>>>>>>>>>>>>>>>>>>>>>>",$scope.BillList)
    
    $scope.objMaterialConsumption = {}
     $scope.objMaterialConsumption = angular.copy($scope.BillList)
     console.log(">>>>>>>>>>>>>>>>>>>>>>>",$scope.objMaterialConsumption)
    ConsumptionService.SaveConsumptionDetails($scope.BillList)
        .then(function (response) {
            if (response.data && response.data.success) {
                AlertMessage.success(objResource.msgTitle, "Bill list saved successfully.");
                // Optionally, reset the bill list or perform other actions
                $scope.BillList = {};
            } else {
                AlertMessage.error(objResource.msgTitle, "Failed to save the bill list.");
            }
        })
        .catch(function (error) {
            AlertMessage.error(objResource.msgTitle, "API error occurred while saving: " + (error.message || "Unknown error"));
        });
};


















});


//http://jsfiddle.net/9HgBY/
PIVF.directive('numberMask', function () {
    return function (scope, element, attrs) {
        var min = parseInt(attrs.min, 10) || 0,
            max = parseInt(attrs.max, 10) || 10,

            value = element.val();

        element.on('keyup', function (e) {



            if (!between(element.val(), min, max)) {

                element.val(value);
            } else {
                value = element.val();
            }
        });

        function between(n, min, max) {

            return n >= min && n <= max;
        }
    }
});

/*Added by AniketK on 09Oct2020*/ 

function isNumberKey(evt, obj) {

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

/*Ended by AniketK*/