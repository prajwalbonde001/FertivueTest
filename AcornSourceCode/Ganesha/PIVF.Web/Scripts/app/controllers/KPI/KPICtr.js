'use strict';

//http://jtblin.github.io/angular-chart.js/
angular.module('PIVF').controller('KPIController', function ($scope, localStorageService,
    $location, $rootScope, KPISrv, usSpinnerService, AlertMessage, Common, $timeout, $http) {

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
    $scope.AgeMin = 0;
    $rootScope.IsFemale=false;
    $rootScope.IsMale = false;
    $rootScope.FormName = "KPI"
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $scope.AgeMax = 100;
    $scope.ResponseData = [];
    $scope.reportKPIType = 0;
    $scope.DataPresent = false;
    $scope.barPercentage = 0.5
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
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.loadData = function () {
        usSpinnerService.spin('GridSpinner');
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
        //called API to get Default
        //$scope.chartTitle = 'Pregnancy Success Rate (Donor)';
        //$scope.tempL = ["JAn", "Feb", "Europe", "Latin America", "North America", "India"]
        //$scope.tempD = [40, 33, 67, 28, 58, 12];
        var tempDate = new Date();
        tempDate.setFullYear(tempDate.getFullYear() - 1);
        tempDate.setMonth(tempDate.getMonth() + 1);
        $scope.KPI.fromDate = tempDate;
        $scope.KPI.toDate = new Date();
        $scope.GenerateKPI($scope.KPI);
        //$scope.chartData();

    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.FillReportType = function () {
        var ResponseData = Common.getMasterList('M_KPILIST', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListReportType = Response.data;
            if ($scope.KPI.reportType == undefined) {
                $scope.KPI.reportType = 9;
            }
        }, function (error) {
            $scope.Error = error;
        });

        //$scope.ListReportType = [{ ID: 1, Description: 'Pregnancy Success Rate (Donor)' }, { ID: 2, Description: 'Pregnancy Success Rate (Self)' },
        //{ ID: 3, Description: 'Implantation Rate' }, { ID: 4, Description: 'Clinical Pregnancy Rate' }, { ID: 5, Description: 'Cleavage Rate' },
        //{ ID: 6, Description: 'Live Birth Rate' }, { ID: 7, Description: 'Biochemical Pregnancy Rate' },
        //{ ID: 8, Description: 'On Going Pregnancy Rate' }, { ID: 9, Description: 'Fertilization Rate' }
        //]
        //$scope.KPI.reportType = 2
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.FillChartType = function () {
        $scope.ListChartType = [{ ID: 1, Description: 'Bar Chart' }, { ID: 2, Description: 'Line Chart' }, { ID: 3, Description: 'Pie Chart' }]
        $scope.KPI.chartType = 1
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

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListClinic = Response.data;
            if ($scope.KPI.clinicID == undefined) {
                $scope.KPI.clinicID = $scope.UserUnitID;
            }
        }, function (error) {
            $scope.Error = error;
        });
        //$scope.ListClinic = [{ ID: 1, Description: 'SSS' }, { ID: 2, Description: 'BBB' }];
        //$scope.KPI.clinicID = 1

    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.ChangeReport = function () {
        //if ($scope.KPI.reportType == 1) {
        //    $scope.chartTitle = 'Pregnancy Success Rate (Donor)';
        //    tempL = ["JAn", "Feb", "Europe", "Latin America", "North America", "India"]
        //    tempD = [2478, 5267, 734, 784, 433, 232];
        //    $scope.chartData();
        //}
        //else if ($scope.KPI.reportType == 2) {
        //    $scope.chartTitle = 'Pregnancy Success Rate (Self)';
        //    usSpinnerService.spin('GridSpinner');
        //    var ResponseData = KPISrv.KPISelf($scope.KPI.fromDate, $scope.KPI.toDate, 2)
        //    ResponseData.then(function (Response) {
        //        usSpinnerService.stop('GridSpinner');
        //        if (Response.data.length > 0) {
        //            debugger;
        //            console.log(Response.data);
        //             tempL = [];
        //             tempD = [];
        //            for (var i = 0; i < Response.data.length; i++) {
        //                tempL[i] = Response.data[i].Labels;
        //                tempD[i] = Response.data[i].Data;
        //            }
        //            $scope.chartData();

        //        }
        //        else
        //            $scope.TotalItems = 0;
        //    }, function (error) {
        //        usSpinnerService.stop('GridSpinner');
        //    });

        //}
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.ChangeChart = function () {
    debugger;
        $scope.chartData();
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.GenerateKPI = function (KPI) {
        console.log(KPI);
        debugger;
       
        usSpinnerService.spin('GridSpinner');
        if (ValidKPIRange()) {
            $scope.reportKPIType = $scope.KPI.reportType;
            //Done
            if ($scope.KPI.reportType == 3) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPISelf($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 1)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        //console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                       
                        $scope.chartTitle = 'Pregnancy Success Rate (Self Fresh)';
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total)*100).toFixed(2);
                            }
                            
                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');

                    //}

                }, function (error) {
                    $scope.DataPresent = false;
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });

            }
            //Done
            else if ($scope.KPI.reportType == 4) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPISelf($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 0)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Pregnancy Success Rate (Self Frozen)';
                        $scope.chartData();

                    //}
                  //  else {
                  //      $scope.DataPresent = false;
                  //      AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                 //   }

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });

            }
            //Done
            else if ($scope.KPI.reportType == 1) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIDonor($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 1)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
              //      if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Pregnancy Success Rate (Donor Fresh)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            //Done
            else if ($scope.KPI.reportType == 2) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIDonor($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 0)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
               //     if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Pregnancy Success Rate (Donor Frozen)';
                        $scope.chartData();

                 //   }
                  //  else {
                    //    $scope.DataPresent = false;
                   //     AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                 //   }

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }

            else if ($scope.KPI.reportType == 5) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPICleavageRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                  //  if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Cleavage Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 6) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPILiveBirthRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
               //     if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Live Birth Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 7) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIBiochemicalPregnancyRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                 //   if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }

                        $scope.chartTitle = 'Biochemical Pregnancy Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 8) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIOnGoingPregnancyRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                  //  if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'On Going Pregnancy Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 9) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIFertilizationRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    //if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Fertilization Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 10) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIGoodGradeRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Good Grade Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 11) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIImplantationRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'self', 1)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Implantation Rate (Self Fresh)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 12) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIImplantationRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'self', 0)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Implantation Rate (Self Frozen)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 13) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIImplantationRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'donor', 1)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Implantation Rate (Donor Fresh)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 15) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIImplantationRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'donorembryo', 1)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                //    if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Implantation Rate (Fresh Embryo Donor)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 14) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIImplantationRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'donor', 0)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                  //  if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Implantation Rate (Donor Frozen)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 16) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIImplantationRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'donorembryo', 0)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    //if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Implantation Rate (Frozen Embryo Donor)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 17) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPILiveBirthRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'self', 1)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    //if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Live Birth Rate(Self Fresh)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 18) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPILiveBirthRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'self', 0)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Live Birth Rate(Self Frozen)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 19) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPILiveBirthRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'donor', 1)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Live Birth Rate(Donor Fresh)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 21) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPILiveBirthRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'donorembryo', 1)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Live Birth (Fresh Embryo Donor)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 20) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPILiveBirthRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'donor', 0)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                //    if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Live Birth Rate(Donor Frozen)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 22) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPILiveBirthRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'donorembryo', 0)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                   // if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Live Birth (Frozen Embryo Donor)';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 23) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIIUIPregnancySucessRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'IUIH')
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    //if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'IUI-H Pregnancy Sucess Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
            else if ($scope.KPI.reportType == 24) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIIUIPregnancySucessRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax, 'IUID')
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                  //  if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'IUI-D Pregnancy Sucess Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
                    usSpinnerService.stop('GridSpinner');
                });
            }
                // need to chnage 11
            else if ($scope.KPI.reportType == 11) {

                usSpinnerService.spin('GridSpinner');

                var ResponseData = KPISrv.KPIClinicalPregnancyRate($scope.KPI.fromDate, $scope.KPI.toDate, $scope.KPI.clinicID, $scope.AgeMin, $scope.AgeMax)
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                  //  if (Response.data.length > 0) {
                        debugger;
                        console.log(Response.data);
                        $scope.tempL = [];
                        $scope.tempD = [];
                        $scope.tempS = [];
                        $scope.tempT = [];
                        $scope.ResponseData = [];
                        $scope.ResponseData = Response.data;
                        $scope.GenerateData();
                        for (var i = 0; i < $scope.finalData.length; i++) {
                            $scope.tempL[i] = $scope.finalData[i].Labels;
                            if ($scope.tempT[i] = $scope.finalData[i].Total == 0) {
                                $scope.tempD[i] = 0
                            }
                            else {
                                $scope.tempD[i] = (($scope.finalData[i].Success / $scope.finalData[i].Total) * 100).toFixed(2);
                            }

                            $scope.tempS[i] = $scope.finalData[i].Success;
                            $scope.tempT[i] = $scope.finalData[i].Total;
                        }
                        $scope.chartTitle = 'Clinical Pregnancy Rate';
                        $scope.chartData();

                    //}
                    //else {
                    //    $scope.DataPresent = false;
                    //    AlertMessage.warning('PalashIVF', 'Data Not Found For Selected criteria');
                    //}

                }, function (error) {
                    AlertMessage.warning('PalashIVF', 'Something Went Wrong Try Again'); $scope.DataPresent = false;
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
    debugger;
        console.log('Dataaa', $scope.ResponseData)
        var fromDate = $scope.KPI.fromDate;
        if ($scope.ResponseData.length == 0) {
            $scope.ResponseData[0] = {};
            $scope.ResponseData[0].Labels = 1;
            $scope.ResponseData[0].Data = 1;
            $scope.ResponseData[0].Success = 1;
            $scope.ResponseData[0].Total = 1;
        }
        var toDate = $scope.KPI.toDate;
        var fromMonth = fromDate.getMonth();
        var fromYear = fromDate.getFullYear();
        var toMonth = toDate.getMonth();
        var toYear = toDate.getFullYear();
        var fromMonthYear = fromYear + "-" + fromMonth;
        var toMonthYear = toYear + "-" + toMonth;
        var monthyear = [];
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
        ];
        var monthYear = [];
        monthyear[0] = monthNames[fromMonth] + " " + fromYear
        for (var i = 0; i < 15; i++) {

            if (fromMonthYear == toMonthYear) {
                break;
            }


            fromMonthYear = fromYear + "-" + fromMonth;
           // console.log(i + " " + fromMonth + " " + fromMonthYear + " " + toMonthYear);
            monthyear[i] = monthNames[fromMonth] + " " + fromYear
            fromMonth++;
            if (fromMonth == 12) {
                fromYear++;
                fromMonth = 0;
            }


        }
        debugger;
        console.log(monthyear);
        $scope.finalData = [];
        for (var i = 0; i < monthyear.length; i++) {
            var myObj = {};
            for (var j = 0; j < $scope.ResponseData.length;j++)
            {
                debugger;
                if (monthyear[i] == $scope.ResponseData[j].Labels) {
                    myObj = $scope.ResponseData[j];
                    $scope.finalData[i] = {};
                    $scope.finalData[i].Labels = monthyear[i];
                    $scope.finalData[i].Data = $scope.ResponseData[j].Data;
                    $scope.finalData[i].Success = $scope.ResponseData[j].Success;
                    $scope.finalData[i].Total = $scope.ResponseData[j].Total;
                   // $scope.finalData[i].push(myObj);
                    break;
                }
                else {
                    $scope.finalData[i] = {};
                    $scope.finalData[i].Labels = monthyear[i];
                    $scope.finalData[i].Data = 0;
                    $scope.finalData[i].Success = 0;
                    $scope.finalData[i].Total = 0;
                    //$scope.finalData[i] = {};
                    //$scope.finalData[i].push(myObj);


                }
            }
            
        }
        console.log('final Data ', $scope.finalData);

    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.chartData = function () {
        debugger;
        $scope.options = {};
        $scope.DataPresent = true;
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
            $scope.series = [$scope.chartTitle];
            $scope.data = [$scope.tempD];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.createListKPIData();
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
                        barPercentage: $scope.barPercentage
                    }]
                }, title: {
                    display: true,
                    text: $scope.chartTitle,
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

            $scope.labels = $scope.tempL;
            $scope.series = ['Series A'];
            $scope.data = $scope.tempD;
            var options = {
                responsive: true,
                title: {
                    display: true,
                    position: "top",
                    text: $scope.chartTitle,
                    fontSize: 18,
                    fontColor: "#111"
                },
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        fontColor: "#333",
                        fontSize: 16
                    }
                }
            };
            var fillcolorbar = [];
            for (var i = 0; i < $scope.data.length; i++) {
                fillcolorbar[i] = randomColorGenerator($scope.data.length, i);
            }
            console.log(fillcolorbar);
            $scope.chartColor = [{
                backgroundColor: fillcolorbar,
                pointBackgroundColor: "rgba(255,0,0,0.6)",
                pointHoverBackgroundColor: "rgba(255,0,0,0.6)",

                pointBorderColor: '#fff',
                pointHoverBorderColor: "rgba(255,0,0,0.6)"
            }]
            console.log($scope.chartColor);
            $scope.options = options;
            $scope.createListKPIData();
        }
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    var randomColorGenerator = function (length, pos) {
    debugger;
        var i = pos - 6 * Math.floor(pos / 6);
        return $scope.colorArray[i];
        // return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
    };
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    var ValidKPIRange = function () {
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
        else if ($scope.AgeMin > $scope.AgeMax) {
            AlertMessage.warning('PalashIVF', 'Female Min Age Should be Less Then Max Age');
            return false;
        }
        else if (diff_years($scope.KPI.toDate, $scope.KPI.fromDate)>1) {
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
    debugger;
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

        var url = canvasToImage('#ffffff');
        url = url.substr(23);
        var Obj = {};
        Obj.Image = url;

        Obj.FromDate = $scope.KPI.fromDate;
        Obj.ToDate = $scope.KPI.toDate;
        Obj.AgeMin = $scope.AgeMin;
        Obj.AgeMax = $scope.AgeMax;
        Obj.reportType = $scope.reportKPIType;
        Obj.clinicID = $scope.KPI.clinicID;
        Obj.KPIInsertData = $scope.ListKPIData;
        debugger;
        var ResponseData = KPISrv.KPIPDF(Obj)
        ResponseData.then(function (Response) {
            if (Response.data == 1) {
                var a = encodeURIComponent('U=' + $scope.KPI.clinicID);
                window.open('/Reports/KPI/KPI.aspx?'+encodeURIComponent(a), '_blank'); // in new tab
            }
        });



    }

    function canvasToImage(backgroundColor) {
    debugger;
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
        var imageData = canvas.toDataURL("image/jpeg",1.0);

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
    //end of file
});