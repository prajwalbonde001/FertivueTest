'use strict';

angular.module('PIVF').controller('LabTestListCtr', function ($rootScope, $scope, $location,NewLabEnterySrv, AlertMessage, srvCommon, Common, swalMessages, $filter, usSpinnerService, localStorageService) {
    debugger;
    $rootScope.FormName = 'LabTestList';
    $scope.CurrentPage = 1;
    $rootScope.IsFromLabList= false;
    $rootScope.hideWhenQueue = true;
    //$scope.LabTestList = [];
    $scope.maxSize = 5;
    //$scope.CurrentPage = 1;
    //$scope.btnSaveUpdate = "Save";
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.LabTestList.ReportFromDate=new Date();
    $scope.LabTestList.ReportToDate=new Date();
    $scope.LabTestList.SampleCollectionLocation = 0;
    $scope.LabTestList.ServiceTest=0


    $scope.LoadData = function LoadData() {
        debugger;
      $scope.getPatientList();
        $scope.GetSampleCollectionLocList();
        $scope.GetServiceList();
        $scope.selectedtest();
        //$scope.btnSaveUpdate = "Update";
        
       
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

    $scope.dateOptions2 = {

        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions = {

        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    
    $scope.getMatchingPatient = function ($viewValue) {
        debugger;
        var matchingStuffs = [];
        for (var i = 0; i < $scope.PatientList.length; i++) {
            if (
              $scope.PatientList[i].PatientName.toLowerCase().indexOf($viewValue.toLowerCase()) != -1 ||
              $scope.PatientList[i].MRNo.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {
                matchingStuffs.push($scope.PatientList[i]);
            }
        }
        return matchingStuffs;
    }

    $scope.getpatientlist = function getpatientlist(PatientCategory) {
        debugger;
        var UserInfo = localStorageService.get("UserInfo");
        debugger;
        var response = Common.getpatientlist(UserInfo.UnitID, PatientCategory); //added sujata cross clinic        
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.PatientList = resp.data;
            }
        });
    }

    //Binding selected patient on searching
    $scope.SelectedLabPatient = function SelectedLabPatient(model) {
        debugger;

        if (model) {
            $scope.SelectedPatient = angular.copy(model);   //selected patient details
            sessionStorage.setItem("selectedPatient", JSON.stringify($scope.SelectedPatient));
        }
        else {
            $scope.SelectedPatient = JSON.parse(sessionStorage.getItem("selectedPatient"));
        }
       
        var response = Common.GetPatientListforLab();
        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $scope.PatientList1 = resp.data;
                

               for (var i = 0; i < $scope.PatientList1.length; i++) {
                   if ($scope.PatientList1[i].ID == model.ID)
                   {
                
                     $scope.LabTestList.PatientName = $scope.PatientList1[i].PatientName;
                     
                   }
               }
               $scope.getPatientList();
            }
        });

    }



    $scope.PageChange = function PageChange() {
        debugger;
        $scope.getPatientList();
    };


    $scope.getPatientList = function () {
        debugger;
            usSpinnerService.spin('GridSpinner');
            
            //if (angular.isUndefined($scope.LabTestList.FirstName)) { $scope.LabTestList.FirstName = ''; }
           
            $scope.LabTestList.ReportToDate = $filter('date')($scope.LabTestList.ReportToDate, 'medium');
            $scope.LabTestList.ReportFromDate = $filter('date')($scope.LabTestList.ReportFromDate, 'medium');
            $scope.LabTestList.FromDate = $scope.LabTestList.ReportFromDate;
            $scope.LabTestList.ToDate = $scope.LabTestList.ReportToDate;
            $scope.LabTestList.PatientName = $scope.LabTestList.PatientName;
            debugger;
            var response = NewLabEnterySrv.getPatientList($scope.LabTestList, $scope.CurrentPage - 1);
            response.then(function (resp) {
                debugger;
                $scope.patientList = resp.data;
                $scope.TestReportDetailsListnew = $scope.patientList;
              


                if (resp.data.length > 0)
                {
                    usSpinnerService.stop('GridSpinner');
                    //$scope.patientList.push($scope.CurrentPage - 1);

                    $scope.TestReportDetailsList = $scope.patientList;
                    $scope.TotalItems = resp.data[0].TotalCount;
                    

                }
                else {
                    $scope.TotalItems = 0;
                    usSpinnerService.stop('GridSpinner');
                }
               
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            })
        //}
    }



    $scope.PrintTestDetails = function PrintTestDetails(item) {
        debugger;
        var a = encodeURIComponent('UnitID=' + item.OrderUnitID +
            '&ID=' + item.OrderID +
            '&ISRferalDoctorSignature=' + 'false' +
            '&IsDuplicate=' + 'false' +
            '&BillNumber=' + item.BillNumber +
            '&SampleNo=' + item.SampleNo +
            '&TestID=' + item.TestID +
            '&EmpID=' + 0 +
            '&IsOutSource=' + 'false'
            );
        window.open('/Reports/Lab/PathologyResultEntryReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }


    $scope.ClearAdvSearch = function () {
       
        $scope.LabTestList.ReportToDate = null;
        $scope.LabTestList.ReportFromDate = null;
        $scope.FromDate = null;
        $scope.ToDate = null;
        $scope.LabTestList.SampleCollectionLocation = null;
        $scope.LabTestList.ServiceTest = null;
        $scope.TestReportDetailsListnew = [];
        $scope.LabTestList.PatientName = null;
        $scope.getPatientList();

    }


    
    $scope.GetServiceList =  function GetServiceList()
    {
         debugger;
         var ResponseData =  Common.GetServiceTestList();
         ResponseData.then(function (Response)
        {
           Response.data.splice(0, 0, { ID: 0, Description: "Select" });
           $scope.ServiceList = Response.data;
           
        }, function (error)
        {
           
        });
    }

    $scope.getMatchingLab = function ($viewValue) {
        debugger;
        var matchingStuffs = [];
        for (var i = 0; i < $scope.ServiceList.length; i++) {
            //if (
              //$scope.PatientList[i].PatientName.toLowerCase().indexOf($viewValue.toLowerCase()) != -1 ||
             // $scope.PatientList[i].MRNo.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {
               // matchingStuffs.push($scope.PatientList[i]);
            //}
            matchingStuffs.push($scope.ServiceList[i]);
        }
        return matchingStuffs;
    }


    $scope.selectedtest = function selectedtest() {
        debugger;
        var ResponseData = Common.GetServiceTestList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ServiceList = Response.data;

        }, function (error) {

        });
    }
    



    $scope.GetSampleCollectionLocList = function GetSampleCollectionLocList() {
        var ResponseData = Common.GetSampleCollectionLocList();
        ResponseData.then(function (Response)
        {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SampleLocList = Response.data;

        }, function (error) {
        });
    };



    $scope.NewTestReport = function NewTestReport()
    {
        debugger;
      
        $location.path('/NewLabEntery/');
    }



    $scope.ViewLab = function ViewLab (item) {
        debugger;
        $rootScope.IsFromLabList = true;
        $rootScope.lablistdata = item;

        var ResponseData = NewLabEnterySrv.GetLabEntryDetails(item.OrderID, item.OrderDetailsID,item.OrderUnitID);
        ResponseData.then(function (Response) 
        {
           
                $rootScope.LabTestdata = Response.data;
                $location.path('/NewLabEntery/');
            //AlertMessage.success(objResource.msgTitle, "Lab Details Saved Successfully");
       
        }, function (error) {
        });

        

        //$location.path('/NewLabEntery/');
        

    }


});