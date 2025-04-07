

'use strict';
angular.module('PIVF').controller("FinancialKPIsCtrl", ['$scope', '$rootScope','localStorageService', 'FinancialKPIsSrv', 'Common', 'usSpinnerService', 'srvCommon', 'AlertMessage', '$filter', '$location','$interval', function ($scope, $rootScope, localStorageService, FinancialKPIsSrv, Common, usSpinnerService, srvCommon, AlertMessage, $filter, $location, $interval) {
//,['ng-fusioncharts']
    $rootScope.FormName = 'Financial KPIs';
    $scope.UserUnitID = localStorageService.get("UserInfo").UnitID;
    $scope.FinancialKPI = {};
    $scope.tempL = [];
    $scope.tempD = [];
    $scope.showBarChart = false;
    $scope.showPieChart = true;
    //$scope.colorArray = ["yellow","#727272","#35c2af", "#DF7D37", "#247ba0", "#89cbef"];
    $scope.colorArray = ["#35c2af", "#DF7D37", "#247ba0", "#89cbef", "#727272", "#008bba"];
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
    $scope.loadData = function loadData(){
    debugger;
     var tempDate = new Date();
     tempDate.setFullYear(tempDate.getFullYear() - 1);
     tempDate.setMonth(tempDate.getMonth() + 1);
     $scope.FinancialKPI.fromDate = tempDate;
     $scope.FinancialKPI.toDate = new Date();
     $scope.FinancialKPI.clinicID = $scope.UserUnitID;
     $scope.FillReportType();
     $scope.FillChartType();
     $scope.FillClinic();
     $scope.getPatientCountList();
     $scope.getTodaysCollection();
     $scope.getPaymentModeWiseCollection();   
     $scope.getServiceOutStanding();
     $scope.getPharmacyOutStanding();
     $scope.getSpecialityWiseRevenue();
    }
    $scope.FillReportType = function () {
        $scope.ListReportType = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Patient Wise Count' }, { ID: 2, Description: 'Todays Collection' },
        { ID: 3, Description: 'Payment Mode Wise Collection' },{ ID: 4, Description: 'Service Outstanding' },
        { ID: 5, Description: 'Pharmacy Outstanding' }, { ID: 6, Description: 'Speciality wise Revenue' },
        { ID: 7, Description: 'User Wise Activity' }]
        $scope.FinancialKPI.reportType = 1
    }

    $scope.FillChartType = function () {
        $scope.ListChartType = [{ ID: 1, Description: 'Bar Chart' }, { ID: 2, Description: 'Pie Chart' }]      
        $scope.FinancialKPI.chartType = 2
    }
    $scope.ChangeChart = function () {
    debugger;
    if($scope.FinancialKPI.chartType == 1){
        $scope.showBarChart = true;
        $scope.showPieChart = false;
    }
    else if($scope.FinancialKPI.chartType == 2){
        $scope.showBarChart = false;
        $scope.showPieChart=true;
    }
        $scope.chartData();
    }
    $scope.FillClinic = function () {
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListClinic = Response.data;
            if ($scope.FinancialKPI.clinicID == undefined) {
                $scope.FinancialKPI.clinicID = $scope.UserUnitID;
            }
        }, function (error) {
            $scope.Error = error;
        });      
    }
    /*-------------------------------------------------------------------------------------------------------------------------------*/
//$scope.ViewKPI = function(){
//    debugger;
//    var tempDate = new Date();
//    tempDate.setFullYear(tempDate.getFullYear() - 1);
//    tempDate.setMonth(tempDate.getMonth() + 1);
//    $scope.FinancialKPI.fromDate = tempDate;
//    $scope.FinancialKPI.toDate = new Date();
//}
/*-------------------------------------------------------------------------------------------------------------------------------*/
$scope.GetKPIData = function(FinancialKPI){
    debugger;
    if($scope.FinancialKPI.reportType == 0){
         $scope.getPatientCountList();
         $scope.getTodaysCollection();
         $scope.getPaymentModeWiseCollection();   
         $scope.getServiceOutStanding();
         $scope.getPharmacyOutStanding();
         $scope.getSpecialityWiseRevenue();
    }
    else if($scope.FinancialKPI.reportType == 1)
        $scope.getPatientCountList();
    else if($scope.FinancialKPI.reportType == 2)
        $scope.getTodaysCollection();
    else if($scope.FinancialKPI.reportType == 3)
        $scope.getPaymentModeWiseCollection();
    else if($scope.FinancialKPI.reportType == 4)
        $scope.getServiceOutStanding();
    else if($scope.FinancialKPI.reportType == 5)
        $scope.getPharmacyOutStanding();
    else if($scope.FinancialKPI.reportType == 6)
        $scope.getSpecialityWiseRevenue();
}
/*-------------------------------------------------------------------------------------------------------------------------------*/
$scope.getPatientCountList = function () {
         debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = FinancialKPIsSrv.getPatientCountList($scope.FinancialKPI.fromDate, $scope.FinancialKPI.toDate, $scope.FinancialKPI.clinicID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PatientCountList = Response.data;
                                 
            $scope.FollowUpVisits = $scope.PatientCountList[0].value;
            $scope.NewAdmission = $scope.PatientCountList[1].value;
            $scope.NewOpVisits = $scope.PatientCountList[2].value;
            $scope.NewRegistration = $scope.PatientCountList[3].value;
            debugger;            
            $scope.tempL = [];
            $scope.tempD = [];
            $scope.tempS = [];
            $scope.tempT = [];
            $scope.ResponseData = [];
            $scope.ResponseData = Response.data;
            var SumCount = 0;
            for (var i = 0; i < $scope.ResponseData.length; i++) {
                SumCount = SumCount + $scope.ResponseData[i].value; 
                $scope.TotalSumCount = SumCount;
            }
            for (var i = 0; i < $scope.ResponseData.length; i++) {
                $scope.tempL[i] = $scope.ResponseData[i].label;
                
                if ($scope.tempT[i] = $scope.TotalSumCount == 0) {
                    $scope.tempD[i] = 0
                }
                else {
                    $scope.tempD[i] = (($scope.ResponseData[i].value / $scope.TotalSumCount) * 100).toFixed(2);                    
                }
                $scope.tempS[i] = $scope.ResponseData[i].value;
                
                $scope.tempT[i] = $scope.TotalSumCount;
            }
            $scope.chartData();
            //$scope.getPatientChartData();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
/*-------------------------------------------------------------------------------------------------------------------------------*/
$scope.getPaymentModeWiseCollection = function () {
         debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = FinancialKPIsSrv.getPaymentModeWiseCollection($scope.FinancialKPI.fromDate, $scope.FinancialKPI.toDate, $scope.FinancialKPI.clinicID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PaymentModeWiseList = Response.data;
                       
            $scope.Card = $scope.PaymentModeWiseList[0].value;
            $scope.Cash = $scope.PaymentModeWiseList[1].value;
            $scope.Cheque = $scope.PaymentModeWiseList[2].value;
            $scope.Online = $scope.PaymentModeWiseList[3].value;
            $scope.UPIWallet = $scope.PaymentModeWiseList[4].value;

            debugger;            
            $scope.tempL1 = [];
            $scope.tempD1 = [];
            $scope.tempS1 = [];
            $scope.tempT1 = [];
            $scope.ResponseData1 = [];
            $scope.ResponseData1 = Response.data;
            var SumCount1 = 0;
            for (var i = 0; i < $scope.ResponseData1.length; i++) {
                SumCount1 = SumCount1 + $scope.ResponseData1[i].value; 
                $scope.TotalSumCount1 = SumCount1;
            }
            for (var i = 0; i < $scope.ResponseData1.length; i++) {
                $scope.tempL1[i] = $scope.ResponseData1[i].label;
                
                if ($scope.tempT1[i] = $scope.TotalSumCount1 == 0) {
                    $scope.tempD1[i] = 0
                }
                else {
                    $scope.tempD1[i] = (($scope.ResponseData1[i].value / $scope.TotalSumCount1) * 100).toFixed(2);                    
                }
                $scope.tempS1[i] = $scope.ResponseData1[i].value;
                
                $scope.tempT1[i] = $scope.TotalSumCount1;
            }
            $scope.chartData1();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
/*-------------------------------------------------------------------------------------------------------------------------------*/
$scope.getTodaysCollection = function () {
         debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = FinancialKPIsSrv.getTodaysCollection($scope.FinancialKPI.fromDate, $scope.FinancialKPI.toDate, $scope.FinancialKPI.clinicID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.TodaysCollectionList = Response.data;
            
            $scope.AdvanceCollection = $scope.TodaysCollectionList[0].value;
            $scope.PharmacyCollection = $scope.TodaysCollectionList[1].value;
            $scope.Refunds = $scope.TodaysCollectionList[2].value;
            $scope.ServiceCollection = $scope.TodaysCollectionList[3].value;                                
            $scope.TotalCollection = $scope.TodaysCollectionList[4].value;

            debugger;            
            $scope.tempL2 = [];
            $scope.tempD2 = [];
            $scope.tempS2 = [];
            $scope.tempT2 = [];
            $scope.ResponseData2 = [];
            $scope.ResponseData2 = Response.data;
            var SumCount2 = 0;
            for (var i = 0; i < $scope.ResponseData2.length; i++) {
                SumCount2 = SumCount2 + $scope.ResponseData2[i].value; 
                $scope.TotalSumCount2 = SumCount2;
            }
            for (var i = 0; i < $scope.ResponseData2.length; i++) {
                $scope.tempL2[i] = $scope.ResponseData2[i].label;
                
                if ($scope.tempT2[i] = $scope.TotalSumCount2 == 0) {
                    $scope.tempD2[i] = 0
                }
                else {
                    $scope.tempD2[i] = (($scope.ResponseData2[i].value / $scope.TotalSumCount2) * 100).toFixed(2);                    
                }
                $scope.tempS2[i] = $scope.ResponseData2[i].value;
                
                $scope.tempT2[i] = $scope.TotalSumCount2;
            }
            $scope.chartData2();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
/*-------------------------------------------------------------------------------------------------------------------------------*/
$scope.getServiceOutStanding = function () {
         debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = FinancialKPIsSrv.getServiceOutStanding($scope.FinancialKPI.fromDate, $scope.FinancialKPI.toDate, $scope.FinancialKPI.clinicID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.ServiceOutStandingList = Response.data;
            
            $scope.SODays30 = $scope.ServiceOutStandingList[0].value;
            $scope.SODays60 = $scope.ServiceOutStandingList[1].value;
            $scope.SODays90 = $scope.ServiceOutStandingList[2].value;
            $scope.SOTodays = $scope.ServiceOutStandingList[3].value;

            debugger;            
            $scope.tempL3 = [];
            $scope.tempD3 = [];
            $scope.tempS3 = [];
            $scope.tempT3 = [];
            $scope.ResponseData3 = [];
            $scope.ResponseData3 = Response.data;
            var SumCount3 = 0;
            for (var i = 0; i < $scope.ResponseData3.length; i++) {
                SumCount3 = SumCount3 + $scope.ResponseData3[i].value; 
                $scope.TotalSumCount3 = SumCount3;
            }
            for (var i = 0; i < $scope.ResponseData3.length; i++) {
                $scope.tempL3[i] = $scope.ResponseData3[i].label;
                
                if ($scope.tempT3[i] = $scope.TotalSumCount3 == 0) {
                    $scope.tempD3[i] = 0
                }
                else {
                    $scope.tempD3[i] = (($scope.ResponseData3[i].value / $scope.TotalSumCount3) * 100).toFixed(2);                    
                }
                $scope.tempS3[i] = $scope.ResponseData3[i].value;
                
                $scope.tempT3[i] = $scope.TotalSumCount3;
            }
            $scope.chartData3();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
/*-------------------------------------------------------------------------------------------------------------------------------*/
$scope.getPharmacyOutStanding = function () {
         debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = FinancialKPIsSrv.getPharmacyOutStanding($scope.FinancialKPI.fromDate, $scope.FinancialKPI.toDate, $scope.FinancialKPI.clinicID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.PharmacyOutStandingList = Response.data;
                       
            $scope.POTodays = $scope.PharmacyOutStandingList[0].value;
            $scope.PODays30 = $scope.PharmacyOutStandingList[1].value;
            $scope.PODays60 = $scope.PharmacyOutStandingList[2].value;
            $scope.PODays90 = $scope.PharmacyOutStandingList[3].value;
            
            debugger;            
            $scope.tempL4 = [];
            $scope.tempD4 = [];
            $scope.tempS4 = [];
            $scope.tempT4 = [];
            $scope.ResponseData4 = [];
            $scope.ResponseData4 = Response.data;
            var SumCount4 = 0;
            for (var i = 0; i < $scope.ResponseData4.length; i++) {
                SumCount4 = SumCount4 + $scope.ResponseData4[i].value; 
                $scope.TotalSumCount4 = SumCount4;
            }
            for (var i = 0; i < $scope.ResponseData4.length; i++) {
                $scope.tempL4[i] = $scope.ResponseData4[i].label;
                
                if ($scope.tempT4[i] = $scope.TotalSumCount4 == 0) {
                    $scope.tempD4[i] = 0
                }
                else {
                    $scope.tempD4[i] = (($scope.ResponseData4[i].value / $scope.TotalSumCount4) * 100).toFixed(2);                    
                }
                $scope.tempS4[i] = $scope.ResponseData4[i].value;
                
                $scope.tempT4[i] = $scope.TotalSumCount4;
            }
            $scope.chartData4();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
/*-------------------------------------------------------------------------------------------------------------------------------*/
$scope.getSpecialityWiseRevenue = function () {
         debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = FinancialKPIsSrv.getSpecialityWiseRevenue($scope.FinancialKPI.fromDate, $scope.FinancialKPI.toDate, $scope.FinancialKPI.clinicID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.SpecialityWiseRevenueList = Response.data;
                       
            $scope.Consultation = $scope.SpecialityWiseRevenueList[0].value;
            $scope.ReproductiveMedicine = $scope.SpecialityWiseRevenueList[1].value;
            $scope.Pathalogy = $scope.SpecialityWiseRevenueList[2].value;
            $scope.Radiology = $scope.SpecialityWiseRevenueList[3].value;
            $scope.Others = $scope.SpecialityWiseRevenueList[3].value;

            debugger;            
            $scope.tempL5 = [];
            $scope.tempD5 = [];
            $scope.tempS5 = [];
            $scope.tempT5 = [];
            $scope.ResponseData5 = [];
            $scope.ResponseData5 = Response.data;
            var SumCount5 = 0;
            for (var i = 0; i < $scope.ResponseData5.length; i++) {
                SumCount5 = SumCount5 + $scope.ResponseData5[i].value; 
                $scope.TotalSumCount5 = SumCount5;
            }
            for (var i = 0; i < $scope.ResponseData5.length; i++) {
                $scope.tempL5[i] = $scope.ResponseData5[i].label;
                
                if ($scope.tempT5[i] = $scope.TotalSumCount5 == 0) {
                    $scope.tempD5[i] = 0
                }
                else {
                    $scope.tempD5[i] = (($scope.ResponseData5[i].value / $scope.TotalSumCount5) * 100).toFixed(2);                    
                }
                $scope.tempS5[i] = $scope.ResponseData5[i].value;
                
                $scope.tempT5[i] = $scope.TotalSumCount5;
            }
            $scope.chartData5();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
/*-------------------------------------------------------------------------------------------------------------------------------*/
//    $scope.getPatientChartData = function(){
//    debugger;
//    $location.path('/FinancialKPIs/');
//    //var data = $scope.PatientCountList; 
//    //$scope.PatientCountList;

//    //for (var i = 0; i < $scope.PatientCountList.length; i++) {
//    //        data.push({ label: $scope.PatientCountList[i].Description, value: $scope.PatientCountList[i].count });
//    //    }

     var data = [
          {
              label: "NewRegistration",
              value: "71"
          },
          {
              label: "NewOPVisits",
              value: "20"
          },
          {
              label: "FollowUpVisits",
              value: "10"
          },
          {
              label: "NewAdmission",
              value: "5"
          }       
        ]

        var chart= {           
            caption: "Patient Wise Count",           
            theme: "fusion",
            pieSliceText: 'none',
            
        } 
    $scope.myDataSource = {
        chart, data        
    };
//}
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.chartData = function () {
        debugger;
        $scope.options = {};
        $scope.data = [];
        $scope.labels = [];
        $scope.series = ['Series A'];
        $scope.labels = $scope.tempL;
        $scope.data = $scope.tempD;
        var options = {
            responsive: true,
            title: {
                display: true,
                position: "middle",
                //text: $scope.chartTitle,
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 8
                }
            }
        };
        //$scope.colours = ["rgba(224, 108, 112, 1)",
        //    "rgba(224, 108, 112, 1)",
        //    "rgba(224, 108, 112, 1)"]

        //var fillcolorbar = [];
        //for (var i = 0; i < $scope.data.length; i++) {
        //    fillcolorbar[i] = randomColorGenerator($scope.data.length, i);
        //}
        //console.log(fillcolorbar);
        //$scope.chartColor = [{
        //    backgroundColor: fillcolorbar,
        //    pointBackgroundColor: "rgba(255,0,0,0.6)",
        //    pointHoverBackgroundColor: "rgba(255,0,0,0.6)",

        //    pointBorderColor: '#fff',
        //    pointHoverBorderColor: "rgba(255,0,0,0.6)"
        //}]
        //console.log($scope.chartColor);
        $scope.options = options;
        //$scope.createPatientCountData();

    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.chartData1 = function () {
        debugger;
        $scope.options1 = {};
        $scope.data1 = [];
        $scope.labels1 = [];
        $scope.series1 = ['Series A'];
        $scope.labels1 = $scope.tempL1;
        $scope.data1 = $scope.tempD1;
        var options1 = {
            responsive: true,
            title: {
                display: true,
                position: "middle",
                //text: $scope.chartTitle,
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 8
                }
            }
        };
        
        $scope.options1 = options1;        
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
     $scope.chartData2 = function () {
        debugger;
        $scope.options2 = {};
        $scope.data2 = [];
        $scope.labels2 = [];
        $scope.series2 = ['Series A'];
        $scope.labels2 = $scope.tempL2;
        $scope.data2 = $scope.tempD2;
        var options2 = {
            responsive: true,
            title: {
                display: true,
                position: "middle",
                //text: $scope.chartTitle,
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 8
                }
            }
        };
        
        $scope.options2 = options2;        
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.chartData3 = function () {
        debugger;
        $scope.options3 = {};
        $scope.data3 = [];
        $scope.labels3 = [];
        $scope.series3 = ['Series A'];
        $scope.labels3 = $scope.tempL3;
        $scope.data3 = $scope.tempD3;
        var options3 = {
            responsive: true,
            title: {
                display: true,
                position: "middle",
                //text: $scope.chartTitle,
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 8
                }
            }
        };
       
        $scope.options3 = options3;        
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.chartData4 = function () {
        debugger;
        $scope.options4 = {};
        $scope.data4 = [];
        $scope.labels4 = [];
        $scope.series4 = ['Series A'];
        $scope.labels4 = $scope.tempL4;
        $scope.data4 = $scope.tempD4;
        var options4 = {
            responsive: true,
            title: {
                display: true,
                position: "middle",
                //text: $scope.chartTitle,
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 8
                }
            }
        };
       
        $scope.options4 = options4;        
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/
    $scope.chartData5 = function () {
        debugger;
        $scope.options5 = {};
        $scope.data5 = [];
        $scope.labels5 = [];
        $scope.series5 = ['Series A'];
        $scope.labels5 = $scope.tempL5;
        $scope.data5 = $scope.tempD5;
        var options5 = {
            responsive: true,
            title: {
                display: true,
                position: "middle",
                //text: $scope.chartTitle,
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 8
                }
            }
        };
       
        $scope.options5 = options5;        
    }
    /*---------------------------------------------------------------------------------------------------------------------------*/

    //var randomColorGenerator = function (length, pos) {
    //    debugger;
    //    var i = pos - 6 * Math.floor(pos / 6);
    //    return $scope.colorArray[i];

    //};
    /*---------------------------------------------------------------------------------------------------------------------------*/
    //$scope.createPatientCountData = function () {
    //    debugger;
    //    $scope.PatientCountData = [];
    //    for (var i = 0; i < $scope.labels.length; i++) {
    //        $scope.PatientCountData[i] = {
    //            labels: $scope.labels[i],
    //            data: $scope.tempD[i],
    //            Success: $scope.tempS[i],
    //            Total: $scope.tempT[i]

    //        }
    //    }
    //    console.log($scope.data)
    //}

    /*---------------------------------------------------------------------------------------------------------------------------*/
    
    //var data = [
    //      {
    //          label: "New Registration",
    //          value: "360080"
    //      },
    //      {
    //          label: "Follow-Up Visits",
    //          value: "230000"
    //      },
    //      {
    //          label: "New OP Visits",
    //          value: "186570"
    //      },
    //      {
    //          label: "New Admissions",
    //          value: "270000"
    //      }       
    //    ]
    //    var chart= {           
    //        caption: "Patient Wise Count",           
    //        theme: "fusion",
    //        pieSliceText: 'none',
            
    //    } 
    //    $scope.myDataSource = {
    //            chart, data       
    //          };
    

}]);