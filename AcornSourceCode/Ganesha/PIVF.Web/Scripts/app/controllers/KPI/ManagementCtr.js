'use strict';

//http://jtblin.github.io/angular-chart.js/
angular.module('PIVF').controller('ManagementController', function ($scope, localStorageService,
    $location, $rootScope, ManagementSrv, usSpinnerService, AlertMessage, Common, $timeout, $http) {

    $scope.UserUnitID = localStorageService.get("UserInfo").UnitID;
    $rootScope.hideWhenQueue = true;
    $rootScope.Allergies = "";
    $scope.KPI = {};
    $scope.tempL = [];
    $scope.tempD = [];
    $rootScope.CycleDetails = '';
    $scope.colorArray = ["#35c2af", "#DF7D37", "#247ba0", "#89cbef", "#727272", "#008bba"];
    $scope.ListKPIData = [];
    $scope.finalData = [];
    $scope.DoctorWiseRate = {};
    $scope.ClinicWiseData = {};
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.AgeMin = 0;
    $scope.cumulativeCases = [];
    $rootScope.IsFemale = false;
    $rootScope.IsMale = false;
    $rootScope.FormName = "Management Report";
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $scope.AgeMax = 100;
    $scope.ResponseData = [];
    $scope.reportKPIType = 0;
    $scope.barPercentage = 0.5;
    $scope.setFlag = function () {
        //lable for show hide the forms
        $scope.IsTableTitle = false;
        $scope.IsFirstTable = false;
        $scope.IsSecondTable = false;
        $scope.hideChart = false;
        $scope.IsPrint = true;
        $scope.IsThirdTable = false;
    }
/*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    $scope.openmonth2 = function () {

        $scope.month2.opened = true;
    }
    $scope.month2 = {
        opened: false
    };
/*---------------------------------------------------------------------------------------------------------------------------------------------------*/

    $scope.openmonth1 = function () {

        $scope.month1.opened = true;
    }
    $scope.month1 = {
        opened: false
    };
/*---------------------------------------------------------------------------------------------------------------------------------------------------*/

    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.loadData = function () {
        usSpinnerService.spin('GridSpinner');
        $scope.setFlag();
        $scope.FillReportType();
        $scope.FillChartType();
        $scope.FillClinicianEmbryologist();
        $scope.FillClinic();
        $timeout(function ()
        { $scope.getDefaultKPI() }, 1200
            );
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.getDefaultKPI = function () {
        var tempDate = new Date();
        tempDate.setFullYear(tempDate.getFullYear() - 1);
        tempDate.setMonth(tempDate.getMonth() + 1);
        $scope.KPI.fromDate = tempDate;
        $scope.KPI.toDate = new Date();
        $scope.GenerateKPI();


    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.FillReportType = function () {
        var ResponseData = Common.getMasterList('M_ManagementReportLIST', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListReportType = Response.data;
            if ($scope.KPI.reportType == undefined) {
                $scope.KPI.reportType = 1;
            }
        }, function (error) {
            $scope.Error = error;
        });

    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.FillChartType = function () {
        $scope.ListChartType = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Bar Chart' }, { ID: 2, Description: 'Line Chart' }]
        $scope.KPI.chartType = 0;
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.FillClinicianEmbryologist = function () {
        $scope.ListClinicianEmbryologist = [{ ID: 1, Description: 'SSS' }, { ID: 2, Description: 'BBB' }]
        $scope.KPI.personID = 1
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.FillClinic = function () {
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {
            console.log(Response.data)
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListClinic = Response.data.filter(function (el) {
                return el.ID !== 1;
            });
         
            
            console.log($scope.ListClinic);
            if ($scope.KPI.clinicID == undefined) {
                if ($scope.UserUnitID == 1)
                {
                    $scope.KPI.clinicID = 2;
                }
                else
                $scope.KPI.clinicID = $scope.UserUnitID;
            }
        }, function (error) {
            $scope.Error = error;
        });

    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.ChangeChart = function () {
       // console.log($scope.hideChart)
        if ($scope.hideChart == true)
         $scope.chartData();
          
      
           
    }
    $scope.ChangeReport=function(){
        if ($scope.KPI.reportType == 2 || $scope.KPI.reportType == 4 || $scope.KPI.reportType == 6) {
            $scope.KPI.chartType = 1;
        }
        else {
            $scope.KPI.chartType = 0;
        }
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.GenerateKPI = function (KPI) {
        $scope.setFlag();
        console.log($scope.KPI.fromDate);
        usSpinnerService.spin('GridSpinner');
        if (ValidKPIRange()) {
            $scope.reportKPIType = $scope.KPI.reportType;
            if ($scope.KPI.reportType == 1) {
             usSpinnerService.spin('GridSpinner');
                
                
                var ResponseData = ManagementSrv.cumulativeCases($scope.KPI.fromDate, $scope.KPI.toDate)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    debugger;
                    $scope.Title = `Cumulative Cases: ${getMonthYear($scope.KPI.fromDate)} To ${getMonthYear($scope.KPI.toDate)}`;
                    var createData = [];
                    createData = Response.data;
                    $scope.IsTableTitle = true;
                    $scope.IsFirstTable = true;
                    $scope.IsPrint = false;
                 
                    var clinicNotHavingData = $scope.ListClinic.filter((item)=>{

                        var pass = true;
                        for (var i = 0; i < createData.length; i++) {
                           
                            if (createData[i].UnitID == item.ID) {
                                pass = false;
                                break;
                            }
                        }
                        return pass;
                    });
                    $scope.cumulativeCases = Response.data;
                    //console.log("clinic not having data ",clinicNotHavingData)
                    var j = $scope.cumulativeCases.length;
                    for (var i = 0; i < clinicNotHavingData.length; i++) {
                        if (clinicNotHavingData[i].ID == 0) {

                        }
                        else {
                            $scope.cumulativeCases[j] = {};
                         
                            $scope.cumulativeCases[j].Fresh = 0;
                            $scope.cumulativeCases[j].Frozen = 0;
                            $scope.cumulativeCases[j].UnitID = clinicNotHavingData[i].ID;
                            j++;
                           

                        }

                        
                    }
                    //console.log("1st ",$scope.cumulativeCases)


                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again');
                    usSpinnerService.stop('GridSpinner');
                });
         }

             else if ($scope.KPI.reportType == 2) {
             usSpinnerService.spin('GridSpinner');

             var ResponseData = ManagementSrv.cumulativeCases($scope.KPI.fromDate, $scope.KPI.toDate)
             ResponseData.then(function (Response) {
                 usSpinnerService.stop('GridSpinner');
                 $scope.Title = `No. of ART Cases: ${getMonthYear($scope.KPI.fromDate)} To ${getMonthYear($scope.KPI.toDate)}`;
                 var createData = [];
                 
                 createData = Response.data;
                 $scope.IsTableTitle = true;
                 $scope.IsFirstTable = true;
                 $scope.hideChart = true;
                 $scope.IsPrint = false;
                 var clinicNotHavingData = $scope.ListClinic.filter((item) => {
                     var pass = true;
                     for (var i = 0; i < createData.length; i++) {

                         if (createData[i].UnitID == item.ID) {
                             pass = false;
                             break;
                         }
                     }
                     return pass;
                 });

                 $scope.cumulativeCases = Response.data;
                 var j = $scope.cumulativeCases.length;
                 for (var i = 0; i < clinicNotHavingData.length; i++) {
                     if (clinicNotHavingData[i].ID == 0) {

                     }
                     else {
                         $scope.cumulativeCases[j] = {};

                         $scope.cumulativeCases[j].Fresh = 0;
                         $scope.cumulativeCases[j].Frozen = 0;
                         $scope.cumulativeCases[j].UnitID = clinicNotHavingData[i].ID;
                         j++;


                     }


                 }
                 $scope.tempL = [];
                 $scope.tempT = [];

                 angular.forEach($scope.cumulativeCases, function (item, i) {
                     $scope.tempL[i] = $scope.ListClinic[item.UnitID-1].Description;
                     $scope.tempT[i] = item.Fresh + item.Frozen;

                 });
                 $scope.chartData();
                 

             }, function (error) {
                 AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again');
                 $scope.IsPrint = true;
                 usSpinnerService.stop('GridSpinner');
             });
         }
            else if ($scope.KPI.reportType == 3) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = ManagementSrv.ClinicWise($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    console.log(Response.data)
                    $scope.ClinicWiseData = Response.data;
                    $scope.IsTableTitle = true;
                    $scope.IsSecondTable = true;
                    $scope.IsPrint = false;
                    $scope.Title = `${$scope.ListClinic[$scope.KPI.clinicID-1].Description} ${getMonthYear($scope.KPI.fromDate)} To ${getMonthYear($scope.KPI.toDate)}`;


                }, function (error) {
                    
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again');
                    usSpinnerService.stop('GridSpinner');
                });

            }

            else if ($scope.KPI.reportType == 4) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = ManagementSrv.OverallSuccessRate($scope.KPI.fromDate, $scope.KPI.toDate)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    $scope.Title = `Overall Success Rate: ${getMonthYear($scope.KPI.fromDate)} To ${getMonthYear($scope.KPI.toDate)}`;
                    var createData = [];
                    $scope.hideChart = true;
                    $scope.IsPrint = false;

                    createData = Response.data;
                    var clinicNotHavingData = $scope.ListClinic.filter((item) => {
                        var pass = true;
                        for (var i = 0; i < createData.length; i++) {

                            if (createData[i].UnitID == item.ID) {
                                pass = false;
                                break;
                            }
                        }
                        return pass;
                    });

                    $scope.cumulativeCases = Response.data;
                    var j = $scope.cumulativeCases.length;
                    for (var i = 0; i < clinicNotHavingData.length; i++) {
                        if (clinicNotHavingData[i].ID == 0) {

                        }
                        else {
                            $scope.cumulativeCases[j] = {};

                            $scope.cumulativeCases[j].Total = 0;
                         
                            $scope.cumulativeCases[j].UnitID = clinicNotHavingData[i].ID;
                            j++;


                        }


                    }
                    $scope.tempL = [];
                    $scope.tempT = [];

                    console.log("4 ", $scope.cumulativeCases);
                    angular.forEach($scope.cumulativeCases, function (item, i) {
                        $scope.tempL[i] = $scope.ListClinic[item.UnitID-1].Description;
                        $scope.tempT[i] = item.Total;

                    });
                    console.log("4 t", $scope.tempT);
                    $scope.chartData();


                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again');
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 5 || $scope.KPI.reportType == 6) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = ManagementSrv.DoctorWise($scope.KPI.fromDate, $scope.KPI.toDate)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    console.log(Response.data);
                    var DoctorDetails = {};
                    DoctorDetails = Response.data.DoctorDetails;

                    var DoctorWiseRate = [];
                    angular.forEach(DoctorDetails, (item) => {
                        var IsDoctorPresent=false;
                        angular.forEach(Response.data.DoctorWise, (item1) => {
                            if (item1.UserID == item.UserID) {
                                IsDoctorPresent = true;
                            }
      

                            
                        });
                        if (!IsDoctorPresent) {
                            var ObjDoctorWise = {};
                            ObjDoctorWise.Total = 0;
                            ObjDoctorWise.Name = item.Name;
                            ObjDoctorWise.UnitID = item.UnitID;
                            ObjDoctorWise.UserID = item.UserID;
                            DoctorWiseRate.push(ObjDoctorWise);
                        }
                    });
                    angular.forEach(DoctorWiseRate, (item) => {
                        var len = Response.data.DoctorWise.length;
                        Response.data.DoctorWise.splice(len + 1, 0, item);
                    });
           


                     if ($scope.KPI.reportType == 5)
                     {

                         $scope.Title = `Tabular Doctor Wise Comparison:  ${getMonthYear($scope.KPI.fromDate)} To ${getMonthYear($scope.KPI.toDate)}`;

                    $scope.IsTableTitle = true;
                    $scope.IsThirdTable = true;
                    $scope.IsPrint = false;
                    console.log(Response.data)
                    $scope.DoctorWiseRate = Response.data.DoctorWise;
                    }
                     else {
                         $scope.Title = `Graphical Doctor Wise Comparison:  ${getMonthYear($scope.KPI.fromDate)} To ${getMonthYear($scope.KPI.toDate)}`;
                        $scope.hideChart = true;
                        $scope.IsPrint = false;
                        $scope.tempL = [];
                        $scope.tempT = [];

                        $scope.DoctorWiseRate = Response.data.DoctorWise;
                        angular.forEach($scope.DoctorWiseRate, function (item, i) {
                            var tempArr = [];
                            tempArr[0] = item.Name;
                            tempArr[1] = $scope.ListClinic[item.UnitID-1].Description;
                            $scope.tempL.push(tempArr);
                            $scope.tempT[i] = item.Total;

                        });
                        console.log($scope.tempL);
                        $scope.chartData();
                    }


                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again');
                    $scope.IsPrint = true;
                    usSpinnerService.stop('GridSpinner');
                });
            }

            

          

        }
        else {
            usSpinnerService.stop('GridSpinner');
        }

    }
    /*-----------------------------------------------------------------------------------*/
    $scope.GenerateData = function () {
        console.log('Dataaa', $scope.ResponseData)

    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.chartData = function () {
        if ($scope.KPI.chartType == 0) {
            $scope.KPI.chartType == 1;
        }
        $scope.options = {};
        $scope.data = [];
        $scope.labels = [];
        if ($scope.KPI.chartType == 1 || $scope.KPI.chartType == 2) {
            if ($scope.tempL.length >= 5) {
                $scope.barPercentage = 0.5
            }
            else if ($scope.tempL.length == 1) {
                $scope.barPercentage = 0.1;
            }
            else if ($scope.tempL.length == 2) {
                $scope.barPercentage = 0.2;
            }
            else {
                $scope.barPercentage = 0.3
            }
            $scope.labels = $scope.tempL;
            $scope.series = [$scope.Title];
            $scope.data = [$scope.tempT];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
           // $scope.createListKPIData();
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            $scope.options = {
                scales: {
                    yAxes: [

                      {
                          id: 'y-axis-2',
                          type: 'linear',
                          display: false,
                          position: 'right'
                      },


                     {
                         ticks: {
                             beginAtZero: true,
                             steps: 10,
                             stepValue: 5,
                             max: 100,
                             fontFamily: 'Roboto',
                             fontSize: 14,
                             fontColor: '#000000'
                         }

                     }
                    ],
                    xAxes: [{
                        barPercentage: $scope.barPercentage,
                        ticks: {
                            autoSkip: false,
                            fontColor: "#000000"
                            
                        },
                        labelFontWeight: "bold"

                    }]
                }, title: {
                    display: true,
                    text: $scope.Title,
                    position: "top",
                    fontSize: 18,
                    fontColor: "#111"
                }
            };
            if ($scope.KPI.chartType == 2) {
                var borderColor = "#3e95cd"
                $scope.chartColor = [{
                    backgroundColor: fillcolorbar,
                    pointBackgroundColor: "rgba(255,0,0,0.6)",
                    pointHoverBackgroundColor: "rgba(255,0,0,0.6)",
                    fill: false,
                    borderColor: borderColor,
                    pointBorderColor: '#fff',
                    pointHoverBorderColor: "rgba(255,0,0,0.6)"
                }]
            }
            if ($scope.KPI.chartType == 1) {
                var fillcolorbar = [];
                for (var i = 0; i < $scope.data[0].length; i++) {
                    fillcolorbar[i] = randomColorGenerator($scope.data[0].length, i);
                }

                $scope.chartColor = [{
                    backgroundColor: fillcolorbar,
                    pointBackgroundColor: "rgba(255,0,0,0.6)",
                    pointHoverBackgroundColor: "rgba(255,0,0,0.6)",

                    pointBorderColor: '#fff',
                    pointHoverBorderColor: "rgba(255,0,0,0.6)"
                }]

            }




        }
        else if ($scope.KPI.chartType == 3) {




            var chart = new Chart('pie', {
                type: 'outlabeledPie',
                data: {
                    labels: $scope.tempL,
                    datasets: [{
                        backgroundColor: [
                            '#FF3784',
                            '#36A2EB',
                            '#4BC0C0',
                            '#F77825',
                            '#9966FF',
                            '#00A8C6',
                            '#379F7A',
                            '#CC2738',
                            '#8B628A',
                            '#8FBE00'
                        ],
                        data: $scope.tempT
                    }]
                },
                options: {
                    zoomOutPercentage: 20,
                    responsive: true,
                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            fontColor: "#333",
                            fontSize: 16
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                        position: "bottom",
                        labels: {
                            fontColor: "#333",
                            fontSize: 16
                        }
                    },
                        outlabels: {
                            text: '%p',
                            color: 'white',
                            stretch: 45,
                            font: {
                                resizable: true,
                                minSize: 12,
                                maxSize: 18
                            }
                        }
                    }
                }
            });
           

            //    $scope.labels = $scope.tempL;
            //    $scope.series = ['Series A'];
            //    $scope.data = $scope.tempT;
            //    var options = {
            //        responsive: true,
            //        title: {
            //            display: true,
            //            position: "top",
            //            text: $scope.Title,
            //            fontSize: 18,
            //            fontColor: "#111"
            //        },
            //        legend: {
            //            display: true,
            //            position: "bottom",
            //            labels: {
            //                fontColor: "#333",
            //                fontSize: 16
            //            }
            //        }
            //    };
            //    var fillcolorbar = [];
            //    for (var i = 0; i < $scope.data.length; i++) {
            //        fillcolorbar[i] = randomColorGenerator($scope.data.length, i);
            //    }
            //    console.log(fillcolorbar);
            //    $scope.chartColor = [{
            //        backgroundColor: fillcolorbar,
            //        pointBackgroundColor: "rgba(255,0,0,0.6)",
            //        pointHoverBackgroundColor: "rgba(255,0,0,0.6)",

            //        pointBorderColor: '#fff',
            //        pointHoverBorderColor: "rgba(255,0,0,0.6)"
            //    }]
            //    $scope.options = options;
            //   // $scope.createListKPIData();
            //}
        }
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    var randomColorGenerator = function (length, pos) {
        var i = pos - 6 * Math.floor(pos / 6);
        return $scope.colorArray[i];
        // return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
    };
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    var ValidKPIRange = function () {
        var dateF = new Date($scope.KPI.fromDate);
        var dateT = new Date($scope.KPI.toDate);
        $scope.KPI.fromDate = new Date(dateF.getFullYear(), dateF.getMonth(), 1);
        $scope.KPI.toDate = new Date(dateT.getFullYear(), dateT.getMonth() + 1, 0);

        var IsValid = true;
        if ($scope.KPI.AgeMin == null || !$scope.KPI.hasOwnProperty('AgeMin')) {
            $scope.AgeMin = 0;
        }
        else {
            $scope.AgeMin = $scope.KPI.AgeMin;
        }
        if ($scope.KPI.AgeMax == null || !$scope.KPI.hasOwnProperty('AgeMax')) {
            $scope.AgeMax = 100;
        }
        else {
            $scope.AgeMax = $scope.KPI.AgeMax;
        }
        if ($scope.KPI.fromDate == null || !$scope.KPI.hasOwnProperty('fromDate')) {
            AlertMessage.warning('PalashIVF', 'Select From Date');
            return false;
        }
        else if ($scope.KPI.toDate == null || !$scope.KPI.hasOwnProperty('toDate')) {
            AlertMessage.warning('PalashIVF', 'Select To Date');
            return false;
        }
        else if ($scope.KPI.fromDate > $scope.KPI.toDate) {
            AlertMessage.warning('PalashIVF', 'From Date Should be Less Then To Date');
            return false;
        }
        else if ($scope.KPI.clinicID == 0) {
            AlertMessage.warning('PalashIVF', 'Select Clinic');
            return false;
        }
        else if ($scope.KPI.reportType == 2 || $scope.KPI.reportType == 4 || $scope.KPI.reportType == 6) {
            if ($scope.KPI.chartType == 0) {
                   AlertMessage.warning('PalashIVF', 'Select Chart Type');
                return false;
            }
       
        }
        else if ($scope.AgeMin > $scope.AgeMax) {
            AlertMessage.warning('PalashIVF', 'Female Min Age Should be Less Then Max Age');
            return false;
        }
        else if (diff_years($scope.KPI.toDate, $scope.KPI.fromDate) > 1) {
            AlertMessage.warning('PalashIVF', 'Date range is greater then one year');
            return false;
        }

        return IsValid;
    }

    function diff_years(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        diff = diff / 365.25;

        return diff;

    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.createListKPIData = function () {
        $scope.ListKPIData = [];
        for (var i = 0; i < $scope.labels.length; i++) {
            $scope.ListKPIData[i] = {
                label: $scope.labels[i],
                data: $scope.tempD[i],
                Success: $scope.tempS[i],
                Total: $scope.tempT[i]
            }

            //$scope.ListKPIData[i].label = $scope.labels[i];
            // $scope.ListKPIData[i].data = $scope.data[i];

        }
        console.log($scope.data)
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.print = function () {

        if ($scope.KPI.reportType === 1) {

        console.log($scope.cumulativeCases)
        var ResponseData = ManagementSrv.ManagementPDF($scope.cumulativeCases,'CumulativeCase')
             ResponseData.then(function (Response) {
                 if (Response.data == 1) {
                     var a = encodeURIComponent('U=' + $scope.Title +'&T='+1);
                 //    var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + selectPatient.VisitUnitID + '&V=' + 0 + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);

                     window.open('/Reports/Management/CumulativeCase.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
                 }
             });
        }
      else if ($scope.KPI.reportType === 2) {
          var url = canvasToImage('#ffffff');
          url = url.substr(23);
          console.log(url);
          var myObj = {};
          myObj.Image = url;
            var ResponseData = ManagementSrv.ManagementPDF($scope.cumulativeCases, 'CumulativeCase')
            ResponseData.then(function (Response) {
                if (Response.data == 1) {
                    var ResponseDataImage = ManagementSrv.ManagementPDFImage(myObj, 2);
                    ResponseDataImage.then(function (Response1) {
                        if (Response1.data = 1) {
                            var a = encodeURIComponent('U=' + $scope.Title + '&T=' + 2);
                            window.open('/Reports/Management/CumulativeCase.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
                        }
                    });
               
                }
            });
      }
      else if ($scope.KPI.reportType === 4) {
          var url = canvasToImage('#ffffff');
          url = url.substr(23);
          console.log(url);
          var myObj = {};
          myObj.Image = url;
       
          var ResponseDataImage = ManagementSrv.ManagementPDFImage(myObj, $scope.KPI.reportType);
                  ResponseDataImage.then(function (Response1) {
                      if (Response1.data = 1) {
                          var a = encodeURIComponent('U=' + $scope.Title + '&T=' + $scope.KPI.reportType);
                          window.open('/Reports/Management/CumulativeCase.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
                      }
                  });

            
      }
      else if ($scope.KPI.reportType === 6) {
          var url = canvasToImage('#ffffff');
          url = url.substr(23);
          console.log(url);
          var myObj = {};
          myObj.Image = url;

          var ResponseDataImage = ManagementSrv.ManagementPDFImage(myObj, $scope.KPI.reportType);
          ResponseDataImage.then(function (Response1) {
              if (Response1.data = 1) {
                  var a = encodeURIComponent('U=' + $scope.Title + '&T=' + $scope.KPI.reportType);
                  window.open('/Reports/Management/CumulativeCase.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
              }
          });


      }
      else if ($scope.KPI.reportType === 3) {
          console.log($scope.ClinicWiseData)

          var ResponseDataImage = ManagementSrv.ManagementPDFClinicWise($scope.ClinicWiseData);
          ResponseDataImage.then(function (Response1) {
              if (Response1.data = 1) {
                  var a = encodeURIComponent('T=' + $scope.Title + '&U=' + $scope.KPI.clinicID);
                  window.open('/Reports/Management/ClinicWise.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
              }
          });


      }
       else if ($scope.KPI.reportType === 5) {
           console.log($scope.DoctorWiseRate)

           var ResponseDataImage = ManagementSrv.ManagementPDFDoctorWise($scope.DoctorWiseRate);
          ResponseDataImage.then(function (Response1) {
              if (Response1.data = 1) {
                  var a = encodeURIComponent('T=' + $scope.Title + '&U=' + $scope.KPI.clinicID);
                  window.open('/Reports/Management/DoctorWise.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
              }
          });


      }
       
        // var Obj = {};
       // if ($scope.KPI.reportType == 2 || $scope.KPI.reportType == 4 || $scope.KPI.reportType == 6) {
       //     var url = canvasToImage('#ffffff');
       //     url = url.substr(23);
       //     var Obj = {};
       //     Obj.Image = url;
       // }
       
       // Obj.FromDate = $scope.KPI.fromDate;
       // Obj.ToDate = $scope.KPI.toDate;
       //// Obj.AgeMin = $scope.AgeMin;
       //// Obj.AgeMax = $scope.AgeMax;
       // Obj.reportType = $scope.reportKPIType;
       // Obj.clinicID = $scope.KPI.clinicID;
       // Obj.KPIInsertData = $scope.ListKPIData;
       // debugger;
       // var ResponseData = KPISrv.KPIPDF(Obj)
       // ResponseData.then(function (Response) {
       //     if (Response.data == 1) {
       //         var a = encodeURIComponent('U=' + $scope.KPI.clinicID);
       //         window.open('/Reports/KPI/KPI.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
       //     }
       // });



    }

    function canvasToImage(backgroundColor) {
        var canvas
        if ($scope.KPI.chartType == 1)
            canvas = document.getElementById('bar');
        else if ($scope.KPI.chartType == 2)
            canvas = document.getElementById('line');
        else if ($scope.KPI.chartType == 3)
            canvas = document.getElementById('pie');

        var context = canvas.getContext('2d');

        canvas = context.canvas;
        //cache height and width        
        var w = canvas.width;
        var h = canvas.height;

        var data;

        //get the current ImageData for the canvas.
        data = context.getImageData(0, 0, w, h);

        //store the current globalCompositeOperation
        var compositeOperation = context.globalCompositeOperation;

        //set to draw behind current content
        context.globalCompositeOperation = "destination-over";

        //set background color
        context.fillStyle = backgroundColor;

        //draw background / rect on entire canvas
        context.fillRect(0, 0, w, h);

        //get the image data from the canvas
        var imageData = canvas.toDataURL("image/jpeg", 1.0);

        //clear the canvas
        context.clearRect(0, 0, w, h);

        //restore it with original / cached ImageData
        context.putImageData(data, 0, 0);
        // context.webkitImageSmoothingEnabled = false;
        //context.mozImageSmoothingEnabled = false;
        //context.imageSmoothingEnabled = false;
        //reset the globalCompositeOperation to what it was
        context.globalCompositeOperation = compositeOperation;

        //return the Base64 encoded data url string
        return imageData;
    }
    $scope.formatNumber = function (i) {
        return Math.round(i * 100) / 100;
    }

    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    function getMonthYear(a) {
    var a = new Date(a),
    locale = "en-us",
    month = a.toLocaleString(locale, { month: "long" });
        var year = a.getFullYear();
        return `${month}-${year}`;
        
    }
    //end of file
});