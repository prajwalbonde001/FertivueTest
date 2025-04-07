angular.module('PIVF').controller('StimulationChartController', function ($scope, $sce, $rootScope, $filter, $location, StimulationChartService, usSpinnerService, localStorageService, Common, srvCommon, $uibModal, $window, AlertMessage, swalMessages, PageConfig) {   //, usSpinnerService, crumble
    /* Global variable, array and list defination section */
    $scope.SimulationChart = {};
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.TempSimulationChart = {};
    $scope.SimulationChart.AddDrugList = [];
    $scope.EditDrugRowList = [];
    $scope.SCDrugList = [];  //Added by divya on 17aug2020
    $rootScope.ForConsent = 0;
    $rootScope.FormName = "Stimulation Chart"
    //$scope.SimulationChart.DoctorNameList = [];
    $scope.SimulationChart.TriggerDateDoseList = [];
    $scope.DaysList = [];
    $scope.ismeridian = true;
    $scope.editDrugNamePopupDDDisabled = false;
    $scope.editDrugDaysDisabled = false;
    $scope.editSpecificDateDisable = false;
    $scope.editDoseDisabled = false;
    $scope.IsValidToDisabelSave = false;
    $scope.DrugFirstCount = 0;
    $scope.DrugSecondCount = 0;
    $scope.DrugThirdCount = 0;
    $scope.TotalDrugCount = 0;
    $scope.RandomNo = 0;
    $rootScope.OrderList = 1;
    $scope.today = new Date();
    $scope.IsOpenModel = false;
    $scope.MakeReasonDisabled = true;
    $scope.isCollapsed = false;
    $scope.IsValideToDisplay = false;
    $scope.IsOICycle = false;  //Added By Nayan Kamble


    $scope.isFollicleSizeExpanded = true;

    $scope.isEndometriumExpanded = true;
    $scope.isConsultantPhysicianExpanded = true;
    







    var selectCouple = {};
    selectCouple = Common.getSelectedCouple();

    $scope.LoginInfo = localStorageService.get("UserInfo").LoginName;
  //  $scope.MonitoringSizeStaticMeasurement = [{ "Code": "<0.5" }, { "Code": "0.5" }, { "Code": "0.6" }, { "Code": "0.7" }, { "Code": "0.8" }, { "Code": "0.9" }, { "Code": "1" }, { "Code": "1.05" }, { "Code": "1.10" }, { "Code": "1.15" }, { "Code": "1.20" }, { "Code": "1.25" }, { "Code": "1.3" }, { "Code": "1.35" }, { "Code": "1.4" }, { "Code": "1.45" }, { "Code": "1.5" }, { "Code": "1.55" }, { "Code": "1.6" }, { "Code": "1.65" }, { "Code": "1.7" }, { "Code": "1.75" }, { "Code": "1.8" }, { "Code": "1.85" }, { "Code": "1.9" }, { "Code": "1.95" }, { "Code": "2" }, { "Code": "2.05" }, { "Code": "2.1" }, { "Code": "2.15" }, { "Code": "2.2" }, { "Code": "2.25" }, { "Code": "2.3" }, { "Code": ">2.3" }]; //, { "Code": "cyst" }
    $scope.MonitoringSizeStaticMeasurement = [{ "Code": "<2" }, { "Code": "2" }, { "Code": "3" }, { "Code": "4" }, { "Code": "5" }, { "Code": "6" }, { "Code": "7" }, { "Code": "8" }, { "Code": "9" }, { "Code": "10" }, { "Code": "11" }, { "Code": "12" }, { "Code": "13" }, { "Code": "14" }, { "Code": "15" }, { "Code": "16" }, { "Code": "17" }, { "Code": "18" }, { "Code": "19" }, { "Code": "20" }, { "Code": "21" }, { "Code": "22" }, { "Code": "23" }, { "Code": "24" }, { "Code": "25" }, { "Code": "26" }, { "Code": "27" }, { "Code": "28" }, { "Code": "29" }, { "Code": "30" }];//, { "Code": "2.25" }, { "Code": "2.3" }, { "Code": ">2.3" }]; //, { "Code": "cyst" }
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    $scope.CheckTriggerMandotryCycle = function CheckTriggerMandotryCycle()        
    {
        debugger;
        var tempValid = false;
        if (!angular.isUndefined(selectCouple.FemalePatient.ARTType))
        {
            //if (selectCouple.FemalePatient.ArtTypeID == 3 || selectCouple.FemalePatient.ArtTypeID == 4 || selectCouple.FemalePatient.ArtTypeID == 7 || selectCouple.FemalePatient.ArtTypeID == 8) {
            if (selectCouple.FemalePatient.ArtTypeID != 1) {
                tempValid = true;

            }
            $scope.IsValideToDisplay = true;
        }
        return tempValid;
    }
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.open1 = function () {
        $scope.dateOptions = {
            minDate: $scope.SimulationChart.SCLMP,
            maxDate: $scope.endDate,
            showWeeks: false,
        };
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        minDate: new Date(),
        maxDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.open2 = function () {
        ////
        var a = $scope.today;
        var b = $scope.endDate;
        if (a > b) {
            $scope.dateOptions2 = {
                minDate: new Date().setYear(new Date().getYear() - 100),
                maxDate: new Date().setYear(new Date().getYear() - 10),
                showWeeks: false
            };
        } else {
            $scope.dateOptions2 = {
                minDate: $scope.today,
                maxDate: $scope.endDate,
                showWeeks: false
            };
        }
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    //=================================================\
    $scope.open10 = function () {
        ////
        var a = $scope.today;
        var b = $scope.endDate;
        if (a > b) {
            $scope.dateOptions10 = {
                minDate: new Date().setYear(new Date().getYear() - 100),
                maxDate: new Date().setYear(new Date().getYear() - 10),
                showWeeks: false
            };
        } else {
            $scope.dateOptions10 = {
                minDate: $scope.today,
                maxDate: $scope.endDate,
                showWeeks: false
            };
        }
        $scope.popup10.opened = true;
    };

    $scope.popup10 = {
        opened: false
    };

    $scope.dateOptions10 = {
        formatYear: 'yyyy',
        minDate: new Date(),
        maxDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };
    //=================================================

    $scope.dateOptions2 = {
        formatYear: 'yyyy',
        minDate: new Date(),
        maxDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };

    $scope.popup3 = {
        opened: false
    };

    $scope.dateOptions3 = {
        formatYear: 'yyyy',
        minDate: new Date(),
        maxDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.open4 = function () {
        $scope.dateOptions4 = {
            minDate: $scope.SimulationChart.SCLMP,
            showWeeks: false
        };
        $scope.popup4.opened = true;
    };

    $scope.popup4 = {
        opened: false
    };

    $scope.dateOptions4 = {
        formatYear: 'yyyy',
        //minDate: new Date(),
        //maxDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };
    //commented by sujata
    //$scope.open5 = function () {
    //    debugger;
    //    if ($rootScope.ARTDateValidation) {
    //                $scope.dateOptions5 = {
    //                minDate: $scope.today,
    //                maxDate: $scope.endDate,
    //                showWeeks: false
    //            };
    //    }

    //        else{
    //         $scope.dateOptions5 = {
    //                     minDate: $scope.SimulationChart.SCLMP,
    //                     maxDate: $scope.endDate,
    //                     showWeeks : false
    //            };
    //    }
    //    $scope.popup5.opened = true;
    //};



    $scope.open5 = function ($event, SimulationChart) {
        debugger;
        $event.preventDefault();
        $event.stopPropagation();
        if ($rootScope.ARTDateValidation) {
            var a = $scope.today;
            var b = $scope.endDate;
            if (a > b) {
                $scope.dateOptions5 = {
                    minDate: $scope.today,
                    maxDate: $scope.endDate,
                    showWeeks: false

                };
            } else {
                $scope.dateOptions5 = {
                    minDate: $scope.SimulationChart.StimulationStartDate,
                    maxDate: $scope.endDate,
                    showWeeks: false
                };
            }
        }
        else {
            $scope.dateOptions5 = {
                minDate: $scope.SimulationChart.StimulationStartDate,
                maxDate: $scope.endDate,
                showWeeks: false
            };
        }
        SimulationChart.opened = true;
    };
    $scope.popup5 = {
        opened: false
    };

    $scope.dateOptions5 = {
        formatYear: 'yyyy',
        minDate: new Date(),
        maxDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };
    /*END : Date*/
    debugger;

    /* START for Resource */
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    /*END of Resource*/

    /* START : page initialization function */
    $scope.PageInitialization = function PageInitialization() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        debugger;
        
        //$scope.Cyclestatus();
        //First time loading functions call here...
        //usSpinnerService.spin('GridSpinner');
        $scope.SelectedCouple = Common.getSelectedCouple();
        if ($scope.SelectedCouple.FemalePatient.ArtTypeID == 1) {
                $scope.IsValideToDisplay = true;
        }

        if ($scope.SelectedCouple.FemalePatient.ArtTypeID == 2) {   //Added By Nayan Kamble
            $scope.IsOICycle = true;
        }

        if ($scope.SelectedCouple.FemalePatient.IsCancelCycle == true) {
            $scope.IsValidToDisabelSave = true;
        }
        if ($scope.SelectedCouple.FemalePatient.IsCloseCycle == false) {
            $scope.IsValidToDisabelSave = true;
        }
        debugger;
        if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit == null || angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
            $scope.selectPatient = {};
            $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
            $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
            $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
            $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;             
            if ($scope.SimulationChart.SCARTID == undefined || $scope.SimulationChart.SCARTID == 0) {
                $scope.SimulationChart.SCARTID = $rootScope.CoupleDetails.FemalePatient.ARTTypeID;
            }
            if ($scope.SimulationChart.SCARTSubID == undefined || $scope.SimulationChart.SCARTSubID == 0) {
                $scope.SimulationChart.SCARTID = $rootScope.CoupleDetails.FemalePatient.ArtSubTypeID;
            }
            $scope.NevigateVisitPopUP($scope.selectPatient);

        } else {
            //added by vikrant When C# Visit Not Assign 
            var response1 = Common.AddvisitDetailIncoupleAPI(2, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID, $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID);
            response1.then(function (resp) {
                $scope.GetARTTypeList();
                //$scope.GetARTSubTypeList(0);
                $scope.GetDoctorList();
                $scope.SetLandingPageControls();
                $scope.DrugList();
                $scope.TriggerList();
                $scope.GetFollicularScanSizeDetails();
                $scope.GetGraphData();
                $scope.GetDaysList('FromLoading');
               
            });
        }
        //usSpinnerService.stop('GridSpinner');
    }

    //$scope.Cyclestatus=function Cyclestatus()
    //{
    //    debugger;
    //    if ($scope.SimulationChart.IsCloseCycleOnCancellation == true)
    //    {
    //        $location.path('/CycleOverview/');
    //    }
    //}



    $scope.GetGraphData=function GetGraphData()
    {
        debugger;
        var responce = StimulationChartService.GetGraphData();
        responce.then(function (resp) {
            console.log('Data', resp.data);
            if (resp.data != null)
            {
                $scope.prepareGraphData(resp.data);
            }
            
        }, function (err) {
            console.log('Err', err);
        })
    }
    /* END : page initialization function */
    $scope.SetLandingPageControls = function SetLandingPageControls() {
        debugger;
        var ResponseData = StimulationChartService.SetLandingPageControls();
        ResponseData.then(function (Response) {
            debugger;
            $scope.SimulationChart = Response.data;
            //Temp array declaration
           // $scope.prepareGraphData($scope.SimulationChart.E2, $scope.SimulationChart.Progesterone, $scope.SimulationChart.FSH, $scope.SimulationChart.FolliScanDaysCheckList);
            $scope.TempSimulationChart = $scope.SimulationChart;
            $scope.SimulationChart.TempLatestDoctors = new Array();
            $scope.SimulationChart.TempE2 = new Array();
            $scope.SimulationChart.TempProgesterone = new Array();
            $scope.SimulationChart.TempFSH = new Array();
            $scope.SimulationChart.TempLH = new Array();
            $scope.SimulationChart.TempRemarksList = new Array();
            $scope.SimulationChart.TempFolliScanDaysCheckList = new Array();
            $scope.SimulationChart.TempEndometriumList = new Array();
            $scope.SimulationChart.TempDoctorNameList = new Array();
            $scope.SimulationChart.TempLatestDoctors = $scope.SimulationChart.LatestDoctors;
            $scope.SimulationChart.TempE2 = $scope.SimulationChart.E2;
            $scope.SimulationChart.TempProgesterone = $scope.SimulationChart.Progesterone;
            $scope.SimulationChart.TempFSH = $scope.SimulationChart.FSH;
            $scope.SimulationChart.TempLH = $scope.SimulationChart.LH;
            $scope.SimulationChart.TempRemarksList = $scope.SimulationChart.RemarksList;
            $scope.SimulationChart.TempFolliScanDaysCheckList = $scope.SimulationChart.FolliScanDaysCheckList;
            $scope.SimulationChart.TempEndometriumList = $scope.SimulationChart.EndometriumList;
            $scope.SimulationChart.TempDoctorNameList = $scope.SimulationChart.DoctorNameList;
            if (!angular.isUndefined($scope.SimulationChart)) {
                if ($scope.SimulationChart.StimulationStartDate != undefined) {
                    var LMPDate = $filter('date')($scope.SimulationChart.SCLMP, 'dd-MMM-yyyy');
                    var StartDate = $filter('date')($scope.SimulationChart.StimulationStartDate, 'dd-MMM-yyyy');
                    if (LMPDate != StartDate) {
                        $scope.SimulationChart.SimulationCycleStartDate = new Date($filter('date')($scope.SimulationChart.StimulationStartDate, 'medium'));
                    } else {
                        $scope.SimulationChart.SimulationCycleStartDate = new Date($filter('date')($scope.SimulationChart.SCLMP, 'medium'));
                    }
                } else {
                    $scope.SimulationChart.SimulationCycleStartDate = new Date($filter('date')($scope.SimulationChart.SCLMP, 'medium'));
                }
                if (!angular.isUndefined($scope.SimulationChart.OPUDate) && $scope.SimulationChart.OPUDate != '1970-01-01T00:00:00' && $scope.SimulationChart.OPUDate != null) {
                    $scope.SimulationChart.OPUDate = new Date($filter('date')($scope.SimulationChart.OPUDate, 'medium'));
                } else {
                    $scope.SimulationChart.OPUDate = undefined;
                }
            }
            //Call this method here because after LMP date date cycle creation validation will be correct
            $scope.Next15DaysGenerator('Loading');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.prepareGraphData = function prepareGraphData(data)
    {
        debugger;
       
        var lableX = [];
        var dataE2 = [];
        var dataFSH = [];
        var dataLH = [];
        var dataProgesterone = [];
        var HarmoneData = data.harmones;
        var FollicleDetails = data.follicleSizeDetails;
        var dataFollicles=[];
        angular.forEach(data.harmones, function (item) {
            debugger;
            lableX.push(new Date(item.Date));
            dataE2.push(item.E2);
            dataFSH.push(item.FSH);
            dataLH.push(item.LH);
            dataProgesterone.push(item.Progesterone);
        })
      
        //angular.forEach(E2, function (item) {
        //    item.Date = new Date(item.Date);
        //    if (!isDateInArray(item.Date, lableX)) {
        //        lableX.push(item.Date);
        //    }
            
        //})
        //angular.forEach(Progesterone, function (item) {
        //    item.Date = new Date(item.Date);
        //    if (!isDateInArray(item.Date, lableX)) {
        //        lableX.push(item.Date);
        //    }
        //})
        //angular.forEach(FSH, function (item) {
        //    item.Date = new Date(item.Date);
        //    if (!isDateInArray(item.Date, lableX)) {
        //        lableX.push(item.Date);
        //    }
        //})
        //angular.forEach(Scan, function (item) {
        //    item.Date = new Date(item.Date);
        //    if (!isDateInArray(item.Date, lableX)) {
        //        lableX.push(item.Date);
        //    }
        //})
        //function isDateInArray(needle, haystack) {
        //    for (var i = 0; i < haystack.length; i++) {
        //        if (needle.getTime() === haystack[i].getTime()) {
        //            return true;
        //        }
        //    }
        //    return false;
        //}
        ////console.log(lableX);
        ////console.log(E2);
        ////console.log(Progesterone);
        ////console.log(FSH);
        //var dataE2 = [];
        //var dataFSH = [];
        //var dataProgesterone = [];

        // dataE2 = GenerateData(E2);
        // dataFSH = GenerateData(FSH);
        // dataProgesterone = GenerateData(Progesterone);

         //console.log(dataE2, dataFSH, dataProgesterone);
        //function GenerateData(dataset)
        //{
        //    var tempdata = [];
        //    for (var i = 0; i < lableX.length; i++)
        //    {
        //        tempdata[i]=null;
        //        angular.forEach(dataset, function (item) {
        //            if (item.Date.getTime() === lableX[i].getTime())
        //            {
        //                tempdata[i] = item.Size;
                      
        //            }
        //        })

        //    }
        //    return tempdata
        //}

        //{
        //    Date: "2018-09-24T00:00:00+05:30"
        //    LeftFollicularNumber: null
        //    LeftSizeCount: 0
        //    RightFollicularNumber: "20"
        //    RightSizeCount: 1
        //    Side: "Right"
        //}

        angular.forEach(FollicleDetails, function (item) {

            if (item.Side == "Right")
            {
                var temp = { x: new Date(item.Date), y: parseInt(item.RightFollicularNumber), Size: item.RightSizeCount,Side:'right' };
                dataFollicles.push(temp);
            }
            if (item.Side == "Left") {
                var temp = { x: new Date(item.Date), y: parseInt(item.LeftFollicularNumber), Size: item.LeftSizeCount, Side: 'left' };
                dataFollicles.push(temp);
            }
          
            
        })
        
        var config = {
            type: 'line',
            data: {
                labels: lableX,
                datasets: [{
                    label: "E2",
                    borderColor: "rgba(75,192,192,1)",
                    data: dataE2,
                    yAxisID: "y-axis-2",
                    spanGaps: true
                }, {
                    label: "Progesterone",
                    yAxisID: "y-axis-1",
                    borderColor: "rgba(255,99,132,1)",
                    data: dataProgesterone,
                    spanGaps: true
                }, {
                    label: "FSH",
                    yAxisID: "y-axis-3",            
                    borderColor: "#f6c63e",
                    data: dataFSH,
                    spanGaps: true
                },
                {
                    label: "LH",
                    yAxisID: "y-axis-5",            
                    borderColor: "#e510da",
                    data: dataLH,
                    spanGaps: true
                },
                {
                    type: "scatter",
                    label: "Follicle Size",
                    yAxisID: "y-axis-4",
                    data: dataFollicles,
                    showLine: false
                }]
            },
            options: {
            
                    legend: {
                        display: true,
                        labels: {
                            fontColor: 'rgb(255, 99, 132)'
                        }
                    },
                    scales: {
                        ticks:{
                            source: 'labels'
                        },

                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                'millisecond': 'MMM DD',
                                'second': 'MMM DD',
                                'minute': 'MMM DD',
                                'hour': 'MMM DD',
                                'day': 'MMM DD',
                                'week': 'MMM DD',
                                'month': 'MMM DD',
                                'quarter': 'MMM DD',
                                'year': 'MMM DD',
                            }
                        }
                    }],
                    yAxes: [{
                    
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                        scaleLabel: {
                            display: true,
                            labelString: "Progesterone"
                        }
                    },{
                    display: true,
                    position: "left",
                    id: "y-axis-3",
                    scaleLabel: {
                        display: true,
                        labelString: "FSH"
                    }
                    },
                    {
                    display: true,
                    position: "left",
                    id: "y-axis-5",
                    scaleLabel: {
                        display: true,
                        labelString: "LH"
                    }
                    }, {
                      
                        display: true,
                        position: "left",
                        id: "y-axis-2",
                        scaleLabel: {
                            display: true,
                            labelString: "E2",
                        }

                      
                },
                    {

                        display: true,
                        position: "right",
                        id: "y-axis-4",
                        scaleLabel: {
                            display: true,
                            labelString: "Follicle Size",
                        }


                    }],
                },
                plugins: {
                    datalabels: {
                        padding:2,
                        align: function (value) {
                            debugger;
                            var temp = "center";
                            if (value.datasetIndex == 4 ) {
                                temp = value.dataset.data[value.dataIndex].Side;
                            }


                            return temp;
                        },
                        color: function(value) {
                            debugger;
                            var temp = "center";
                            if (value.datasetIndex == 4 ) {
                                temp = value.dataset.data[value.dataIndex].Side == 'left' ? 'red' : 'green';
                            }


                            return temp;
                          
                        },
                    
                        formatter: function (value, context) {
                            debugger;
                            var temp="";
                            if (context.datasetIndex == 4) {
                                //console.log(value);
                               // temp = value.Size;
                                for(var i=0;i<value.Size;i++)
                                {
                                    temp = temp + "X"
                                }
                            }
                            else {
                                temp = "";
                            }
                            return temp;
                        }
                    }
                }
            }
        };

        var ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, config);


    }
    /* START : Landing page functions */

    /* START : Open visit popup */
    $scope.NevigateVisitPopUP = function (Patient) {
        debugger;
        if (!angular.equals({}, Patient)) {
            var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
            response.then(function (resp) {
                if (resp.data.length > 1) { //Go cursor this scope when multiple visit
                    usSpinnerService.stop('GridSpinner');
                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'visitmodel',
                        controller: 'visitmodelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            VisitInfo: function () {
                                return resp.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) { // return here after cancel reason entered
                        debugger;
                        //Added by AniketK on 07July2020 for Video Consultation
                        var tempDate1 = new Date();
                        var date1 = tempDate1.getFullYear() * tempDate1.getMonth() * tempDate1.getDate();
                        var tempDate2 = new Date(data.Date);
                        var date2 = tempDate2.getFullYear() * tempDate2.getMonth() * tempDate2.getDate();
                        if (date1 == date2) {
                            $rootScope.VisitTypeID = data.VisitTypeID;
                        }
                        else {
                            $rootScope.VisitTypeID = 0;
                        }
                        if (!angular.equals({}, data)) {  //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                //for female
                                usSpinnerService.stop('GridSpinner');
                                var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                                response.then(function (resp) {
                                    $scope.SelectedCouple.FemalePatient.Selectedvisit = {};
                                    $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    var response = Common.SetSelectedFemalePatient($scope.SelectedCouple.FemalePatient);
                                    response.then(function (resp) {
                                        if (resp.status == 200) {
                                            $scope.selectPatient = {};
                                            $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
                                            $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
                                            $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
                                            $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
                                            $scope.selectPatient.VisitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                                            $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                                            Common.setSelectedPatient($scope.selectPatient);
                                            Common.setSelectedCouple($scope.SelectedCouple);

                                            // Enable Disable Add Stimulatin Drug Link
                                            if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
                                                $scope.IsValidToDisabelSave = true;
                                            }

                                            //My Controls loading functions
                                            $scope.GetARTTypeList();
                                            $scope.GetARTSubTypeList($scope.SimulationChart.SCARTID);
                                            $scope.GetDoctorList();
                                            $scope.SetLandingPageControls();
                                            $scope.DrugList();
                                            $scope.TriggerList();
                                            $scope.GetFollicularScanSizeDetails();
                                            $scope.GetDaysList('FromLoading');
                                        }
                                    });
                                });
                            }
                            else {
                                //for male
                                var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                                response.then(function (resp) {
                                    usSpinnerService.stop('GridSpinner');
                                    $scope.SelectedCouple.MalePatient.Selectedvisit = {};
                                    $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                    $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                    var response = Common.SetSelectedMalePatient($scope.SelectedCouple.MalePatient);
                                    response.then(function (resp) {
                                        if (resp.status == 200) {
                                            $scope.selectPatient = {};
                                            $scope.selectPatient.ID = $scope.SelectedCouple.MalePatient.MaleId;
                                            $scope.selectPatient.UnitID = $scope.SelectedCouple.MalePatient.MAleUnitID;
                                            $scope.selectPatient.MRNo = $scope.SelectedCouple.MalePatient.MaleMRNO;
                                            $scope.selectPatient.GenderID = $scope.SelectedCouple.MalePatient.GenderID;
                                            $scope.selectPatient.VisitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID;
                                            $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
                                            // Enable Disable Add Stimulatin Drug Link
                                            if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
                                                $scope.IsValidToDisabelSave = true;
                                            }

                                            Common.setSelectedPatient($scope.selectPatient);
                                            Common.setSelectedCouple($scope.SelectedCouple);
                                            $scope.SelectedCouple = Common.getSelectedCouple();
                                        }
                                    });
                                });
                            }
                        }
                    });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {
                 if (!angular.equals({}, resp.data)) {
                        if (Patient.GenderID == 2) {
                            debugger;
                            //for female
                            usSpinnerService.stop('GridSpinner');
                            //var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                            //response.then(function (resp) {
                            $scope.SelectedCouple.FemalePatient.Selectedvisit = {};
                            $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedFemalePatient($scope.SelectedCouple.FemalePatient);
                            response.then(function (resp) {
                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
                                    $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
                                    $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
                                    $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                                    // Enable Disable Add Stimulatin Drug Link
                                    if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
                                        $scope.IsValidToDisabelSave = true;
                                    }

                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($scope.SelectedCouple);
                                    $scope.SelectedCouple = Common.getSelectedCouple();
                                    var response1 = Common.AddvisitDetailIncoupleAPI(2, $scope.selectPatient.VisitID, $scope.selectPatient.VisitUnitID);
                                    response1.then(function (resp) {
                                        $scope.IsValidToDisabelSave = false;
                                        //added by vikrant 
                                        $scope.GetARTTypeList();
                                        $scope.GetDoctorList();
                                        $scope.SetLandingPageControls();
                                        $scope.DrugList();
                                        $scope.TriggerList();
                                        $scope.GetFollicularScanSizeDetails();
                                        $scope.GetDaysList('FromLoading');
                                    });
                                }
                            });
                            //});
                        }
                        else {
                            //for male
                            var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                            response.then(function (resp) {
                                usSpinnerService.stop('GridSpinner');
                                $scope.SelectedCouple.MalePatient.Selectedvisit = {};
                                $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                var response = Common.SetSelectedMalePatient($scope.SelectedCouple.MalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $scope.SelectedCouple.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $scope.SelectedCouple.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $scope.SelectedCouple.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $scope.SelectedCouple.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
                                        // Enable Disable Add Stimulatin Drug Link
                                        if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
                                            $scope.IsValidToDisabelSave = true;
                                        }
                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.setSelectedCouple($scope.SelectedCouple);
                                        $scope.SelectedCouple = Common.getSelectedCouple();
                                        // $location.path(Redirectto);
                                        //$scope.GetIUIDetails();
                                    }
                                });
                            });
                        }
                    }
                }


                   //  add Added sujata for cross clinic for stimulation chart close visit

                else if (resp.data.length == 0)  //this scope is executed when only close active visit
                {
                    if (!angular.equals({}, resp.data)) {
                        if (Patient.GenderID == 2) {
                            debugger;
                            //for female
                            usSpinnerService.stop('GridSpinner');
                            //var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                            //response.then(function (resp) {
                            $scope.SelectedCouple.FemalePatient.Selectedvisit = {};
                            $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID =0;
                            $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID =0;
                            var response = Common.SetSelectedFemalePatient($scope.SelectedCouple.FemalePatient);
                            response.then(function (resp) {
                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
                                    $scope.selectPatient.ID = $scope.SelectedCouple.FemalePatient.FemalePatientID;
                                    $scope.selectPatient.UnitID = $scope.SelectedCouple.FemalePatient.FemalePatientUnitID;
                                    $scope.selectPatient.MRNo = $scope.SelectedCouple.FemalePatient.FemalePatientMRNO;
                                    $scope.selectPatient.GenderID = $scope.SelectedCouple.FemalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                                    // Enable Disable Add Stimulatin Drug Link
                                    if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
                                        $scope.IsValidToDisabelSave = true;
                                    }

                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($scope.SelectedCouple);
                                    $scope.SelectedCouple = Common.getSelectedCouple();
                                    var response1 = Common.AddvisitDetailIncoupleAPI(2, $scope.selectPatient.VisitID, $scope.selectPatient.VisitUnitID);
                                    response1.then(function (resp) {
                                        $scope.IsValidToDisabelSave = false;
                                        //added by vikrant 
                                        $scope.GetARTTypeList();
                                        $scope.GetDoctorList();
                                        $scope.SetLandingPageControls();
                                        $scope.DrugList();
                                        $scope.TriggerList();
                                        $scope.GetFollicularScanSizeDetails();
                                        $scope.GetDaysList('FromLoading');
                                    });
                                }
                            });
                            //});
                        }
                        else {
                            //for male
                            var response = Common.PutSelectedvisitByPatient($rootScope.CoupleDetails, data, 2);
                            response.then(function (resp) {
                                usSpinnerService.stop('GridSpinner');
                                $scope.SelectedCouple.MalePatient.Selectedvisit = {};
                                $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                                var response = Common.SetSelectedMalePatient($scope.SelectedCouple.MalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
                                        $scope.selectPatient.ID = $scope.SelectedCouple.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $scope.SelectedCouple.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $scope.SelectedCouple.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $scope.SelectedCouple.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $scope.SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
                                        // Enable Disable Add Stimulatin Drug Link
                                        if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
                                            $scope.IsValidToDisabelSave = true;
                                        }
                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.setSelectedCouple($scope.SelectedCouple);
                                        $scope.SelectedCouple = Common.getSelectedCouple();
                                        // $location.path(Redirectto);
                                        //$scope.GetIUIDetails();
                                    }
                                });
                            });
                        }
                    }
                }
                      //End Added sujata for cross clinic for stimulation chart close visit




                else {
                    AlertMessage.info('PalashIVF', 'Visit Not Marked For Female Patient,Please First Mark Vist.');
                    $scope.IsSave = true;
                    usSpinnerService.stop('GridSpinner');
                }
            });
        }
    }
    /* END : Open visit popup */

    /* END : Landing page functions */

    /* START : All Dropdowns binding funtions */
    $scope.GetARTSubTypeList = function GetARTSubTypeList(ARTTypeID) {
        debugger;
        var id = angular.isUndefined(ARTTypeID) ? 0 : ARTTypeID;
        var ResponseData = Common.GetArtSubTypeList(id, selectCouple.FemalePatient.PatientCategoryID);
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ARTSubTypeList = Response.data;
            if (angular.isUndefined($scope.SimulationChart.SCARTSubID)) {
                $scope.SimulationChart.SCARTSubID = 0;
            }
            if (!angular.isUndefined($scope.TempSimulationChart.SCARTSubID)) {
                $scope.SimulationChart.SCARTSubID = $scope.TempSimulationChart.SCARTSubID;
            }
            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
   
    $scope.DrugList = function DrugList() {
        ////
        var ResponseData = Common.getMasterList('M_ItemMaster', 'ID', 'ItemName');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SCDrugList = Response.data;
            //if ($scope.SimulationChart.SCDrugID == undefined) {
            $scope.SimulationChart.SCDrugID = 0;
            //}
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    //Added by divya

    $scope.getMatchingBrand = function ($viewValue) {
        debugger;
        var matchingStuffs = [];

        for (var i = 0; i < $scope.SCDrugList.length; i++) {
            if (
              $scope.SCDrugList[i].Description.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.SCDrugList[i]);
            }
        }
        return matchingStuffs;
    }

  

    $scope.onSelect = function ($item, $model, $label) {
        debugger;
        
        $scope.KeepGoingOn = true;
        for (var i = 0; i < $scope.MultipleDrug.length; i++) {            
            debugger;
            if ($scope.MultipleDrug[i].SCDrugID == 0) {
                $scope.MultipleDrug.splice(i, 1);
                $scope.KeepGoingOn = false;
                var MultipleDrug1 =
                {
                    SCDrugID: $item.ID,
                    SCDrug: $item.Description,
                    DrugDate: undefined,
                    StimulationTime: undefined,
                    SCDays: undefined,
                    SCDose: undefined,
                    DaysList: undefined
                }

                $scope.MultipleDrug.push(MultipleDrug1);
            }
            //}
        }
        if ($scope.KeepGoingOn == true) {
            $scope.MultipleDrug = [
            {
                SCDrugID: $item.ID,
                SCDrug: $item.Description,
                DrugDate: undefined,
                StimulationTime: undefined,
                SCDays: undefined,
                SCDose: undefined,
                DaysList: undefined
            }
            ];
        }       
        $scope.MultipleDrug = $scope.MultipleDrug;
        if ($scope.KeepGoingOn == false) {
            for (var i = 0; i < $scope.MultipleDrug.length; i++) {
                for (var j = i + 1; j < $scope.MultipleDrug.length; j++) {
                    if ($scope.MultipleDrug[i].SCDrugID == $scope.MultipleDrug[j].SCDrugID) {
                        $scope.MultipleDrug.splice(j, 1);
                        AlertMessage.warning(objResource.msgTitle, "Drug already selected");
                    }
                }
            }
        }
}
    //Ended by divya



    $scope.TriggerList = function DrugList() {
        ////
        var ResponseData = Common.getMasterList('M_Trigger', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SCTriggerList = Response.data;
            //if ($scope.SimulationChart.SCDrugID == undefined) {
            $scope.SimulationChart.SCDrugID = 0;
            //}
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }

    $scope.GetARTTypeList = function GetARTTypeList() {
        ////
        var ResponseData = Common.getMasterList('M_ARTType', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SCARTTypeList = Response.data;
            if ($scope.SimulationChart.SCARTID == undefined) {
                $scope.SimulationChart.SCARTID = 0;
            }
            $scope.GetARTSubTypeList($scope.SimulationChart.SCARTID);
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }

    $scope.GetDaysList = function GetDaysList(IsFrom) {
        debugger;
        ////
        if (IsFrom == 'FromLoading') {
            $scope.DaysList.splice(0, 0, { ID: 0, Description: 'Select' });
            //if ($scope.SimulationChart.SCDays == undefined) {
            $scope.SimulationChart.SCDays = 0;
            //}
        } else {
            $scope.DaysList = [];
            $scope.DaysList.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SimulationChart.SCDays = 0;
            $scope.daysDiffCount = $scope.dayDiff($scope.SimulationChart.SimulationCycleStartDate, $scope.SimulationChart.DrugDate);
            for (var Index = 1; Index <= 35 - $scope.daysDiffCount; Index++) {
                $scope.DaysList.push({ ID: Index, Description: Index });
            }
        }
        usSpinnerService.stop('GridSpinner');
    }

    $scope.dayDiff = function (firstDate, secondDate) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        $scope.firstTime = new Date($filter('date')(firstDate, 'medium'))
        $scope.secondTime = new Date($filter('date')(secondDate, 'medium'))
        var diffDays = Math.round(Math.abs(($scope.firstTime.getTime() - $scope.secondTime.getTime()) / (oneDay)));
        return diffDays;
    }

    $scope.GetDoctorList = function GetDoctorList() {
        ////
        var ResponseData = Common.GetDoctorList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DoctorList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    /* END : All Dropdowns binding funtions */

    /* START : User defined functions to validation and cheking purpose*/
    $scope.Next15DaysGenerator = function (From) {
        ////
        if (From == 'FromControl' && $scope.CheckDateValidity($scope.SimulationChart.SimulationCycleStartDate)) {
            //Calculate 5 days difference between with LMP Date
            $scope.daysDiffCount = $scope.dayDiff($scope.SimulationChart.SimulationCycleStartDate, $scope.SimulationChart.SCLMP);
            var LmPDate = $filter('date')($scope.SimulationChart.SCLMP, 'dd-MMM-yyyy');
            var StSelectedDate = $filter('date')($scope.SimulationChart.SimulationCycleStartDate, 'dd-MMM-yyyy');

            $scope.IsValidToMove = $scope.ValidateBeforeNewCycleGeneration();
            if (($scope.daysDiffCount <= 5) && ($scope.IsValidToMove) && (StSelectedDate >= LmPDate)) {             //&& ($scope.IsValidToMove)
                $scope.currentDate = $scope.SimulationChart.SimulationCycleStartDate;
                $scope.startDate = $scope.SimulationChart.SimulationCycleStartDate; // Current moment
                $scope.endDate = new Date($scope.SimulationChart.SimulationCycleStartDate.getTime() + 34 * 24 * 60 * 60 * 1000); // Current moment + 15 days

                $scope.iDate = new Date($scope.currentDate); // Date object to be used as iterator
                $scope.futureDates = new Array();
                $scope.SimulationChart.LatestDoctors = new Array();
                $scope.SimulationChart.E2 = new Array();
                $scope.SimulationChart.Progesterone = new Array();
                $scope.SimulationChart.FSH = new Array();
                $scope.SimulationChart.LH = new Array();
                $scope.SimulationChart.RemarksList = new Array();
                $scope.SimulationChart.FolliScanDaysCheckList = new Array();
                $scope.SimulationChart.DoctorNameList = new Array();
                $scope.SimulationChart.EndometriumList = new Array();
                var i = 0;
                $scope.futureDates.push($scope.iDate.setDate($scope.iDate.getDate() - 0));
                $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.futureDates[i]), Name: undefined })
                $scope.SimulationChart.E2.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                $scope.SimulationChart.Progesterone.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                $scope.SimulationChart.FSH.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                $scope.SimulationChart.LH.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                $scope.SimulationChart.RemarksList.push({ Date: new Date($scope.futureDates[i]), Remark: undefined });
                $scope.SimulationChart.FolliScanDaysCheckList.push({ Date: new Date($scope.futureDates[i]), IsChecked: false });
                $scope.SimulationChart.DoctorNameList.push({ DrugAdminID: null, Inhouse: false, Outside: false, date: new Date($scope.futureDates[i]), DoctorName: undefined, IsChecked: false });
                $scope.SimulationChart.EndometriumList.push({ Date: new Date($scope.futureDates[i]), EndometriumThickness: undefined, EndometriumMorphology: undefined, cyst: undefined, Rcyst: undefined });
                while ($scope.iDate < $scope.endDate) {
                    i++;
                    $scope.futureDates.push($scope.iDate.setDate($scope.iDate.getDate() + 1)); // Switch to next d
                    $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.futureDates[i]), Name: undefined })
                    $scope.SimulationChart.E2.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                    $scope.SimulationChart.Progesterone.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                    $scope.SimulationChart.FSH.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                    $scope.SimulationChart.LH.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                    $scope.SimulationChart.RemarksList.push({ Date: new Date($scope.futureDates[i]), Remark: undefined });
                    $scope.SimulationChart.FolliScanDaysCheckList.push({ Date: new Date($scope.futureDates[i]), IsChecked: false });
                    $scope.SimulationChart.DoctorNameList.push({ DrugAdminID: null, Inhouse: false, Outside: false, date: new Date($scope.futureDates[i]), DoctorName: undefined, IsChecked: false });
                    $scope.SimulationChart.EndometriumList.push({ Date: new Date($scope.futureDates[i]), EndometriumThickness: undefined, EndometriumMorphology: undefined, cyst: undefined, Rcyst: undefined });
                }

                //set checkbox checked or unchecked by conditional
                $scope.MakeCheckboxCheckedOnDate();
                $scope.EditTimeSetControlValues();

            } else {
                usSpinnerService.stop('GridSpinner');
                //Already data set or you have selected more than 5 days date from LMP Date
                $scope.SimulationChart.SimulationCycleStartDate = $filter('date')($scope.futureDates[0], 'medium');
                AlertMessage.warning(objResource.msgTitle, "You can select date between 5 days from LMP Date to Cycle Date");
            }
        } else {
            $scope.currentDate = $scope.SimulationChart.SCLMP;
            $scope.startDate = $scope.SimulationChart.SCLMP; // Current moment
            $scope.TempTime = new Date($filter('date')($scope.SimulationChart.SCLMP, 'medium'))
            $scope.endDate = new Date($scope.TempTime.getTime() + 34 * 24 * 60 * 60 * 1000); // Current moment + 15 days
            $scope.SimulationChart.SimulationDate = new Date($filter('date')($scope.SimulationChart.SCLMP, 'dd-MMM-yyyy'));   // Set LMP Date
            $scope.dateOptions = {
                minDate: new Date($filter('date')($scope.SimulationChart.SCLMP, 'dd-MMM-yyyy')),
            };
            $scope.dateOptions3 = {
                minDate: new Date($filter('date')($scope.SimulationChart.SCLMP, 'dd-MMM-yyyy')),
            };
            $scope.dateOptions5 = {
                minDate: new Date($filter('date')($scope.SimulationChart.SCLMP, 'dd-MMM-yyyy')),
            };
            $scope.dateOptions = {
                maxDate: new Date($filter('date')($scope.endDate, 'dd-MMM-yyyy')),
            };
            $scope.dateOptions3 = {
                maxDate: new Date($filter('date')($scope.endDate, 'dd-MMM-yyyy')),
            };
            $scope.dateOptions5 = {
                maxDate: new Date($filter('date')($scope.endDate, 'dd-MMM-yyyy')),
            };

            $scope.iDate = new Date($scope.currentDate); // Date object to be used as iterator
            $scope.futureDates = new Array();
            $scope.SimulationChart.LatestDoctors = new Array();
            $scope.SimulationChart.E2 = new Array();
            $scope.SimulationChart.Progesterone = new Array();
            $scope.SimulationChart.FSH = new Array();
            $scope.SimulationChart.LH = new Array();
            $scope.SimulationChart.RemarksList = new Array();
            $scope.SimulationChart.FolliScanDaysCheckList = new Array();
            $scope.SimulationChart.DoctorNameList = new Array();
            $scope.SimulationChart.EndometriumList = new Array();
            var i = 0;
            $scope.futureDates.push($scope.iDate.setDate($scope.iDate.getDate() - 0));
            $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.futureDates[i]), Name: undefined })
            $scope.SimulationChart.E2.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
            $scope.SimulationChart.Progesterone.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
            $scope.SimulationChart.FSH.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
            $scope.SimulationChart.LH.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
            $scope.SimulationChart.RemarksList.push({ Date: new Date($scope.futureDates[i]), Remark: undefined });
            $scope.SimulationChart.FolliScanDaysCheckList.push({ Date: new Date($scope.futureDates[i]), IsChecked: false });
            $scope.SimulationChart.DoctorNameList.push({ DrugAdminID: null, Inhouse: false, Outside: false, date: new Date($scope.futureDates[i]), DoctorName: undefined, IsChecked: false });
            $scope.SimulationChart.EndometriumList.push({ Date: new Date($scope.futureDates[i]), EndometriumThickness: undefined, EndometriumMorphology: undefined, cyst: undefined, Rcyst: undefined });
            while ($scope.iDate < $scope.endDate) {
                i++;
                $scope.futureDates.push($scope.iDate.setDate($scope.iDate.getDate() + 1)); // Switch to next d
                $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.futureDates[i]), Name: undefined })
                $scope.SimulationChart.E2.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                $scope.SimulationChart.Progesterone.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                $scope.SimulationChart.FSH.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                $scope.SimulationChart.LH.push({ Date: new Date($scope.futureDates[i]), Size: undefined });
                $scope.SimulationChart.RemarksList.push({ Date: new Date($scope.futureDates[i]), Remark: undefined });
                $scope.SimulationChart.FolliScanDaysCheckList.push({ Date: new Date($scope.futureDates[i]), IsChecked: false });
                $scope.SimulationChart.DoctorNameList.push({ DrugAdminID: null, Inhouse: false, Outside: false, date: new Date($scope.futureDates[i]), DoctorName: undefined, IsChecked: false });
                $scope.SimulationChart.EndometriumList.push({ Date: new Date($scope.futureDates[i]), EndometriumThickness: undefined, EndometriumMorphology: undefined, cyst: undefined, Rcyst: undefined });
            }
        }

        //set checkbox checked or unchecked by conditional
        $scope.MakeCheckboxCheckedOnDate();
        $scope.EditTimeSetControlValues();
    }


    //Report Functionaloity
    $scope.PrintSummary = function () {
        debugger;
        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + $rootScope.CoupleDetails.FemalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
        window.open('/Reports/ART/Cycle/StimulationChartWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab  
    }
    //End Report Functionality


    $scope.EditTimeSetControlValues = function EditTimeSetControlValues() {
        debugger;
        //All fileds settings
        $scope.SimulationChart.AntralFollicleCount = $scope.TempSimulationChart.AntralFollicleCount;
        $scope.SimulationChart.OPUDate = $scope.TempSimulationChart.OPUDate;
        $scope.SimulationChart.IsCycleCancellation = $scope.TempSimulationChart.IsCycleCancellation;
        $scope.EnableDisableReason($scope.SimulationChart.IsCycleCancellation);
        $scope.SimulationChart.Reason = $scope.TempSimulationChart.Reason;
        $scope.SimulationChart.IsCloseCycleOnCancellation = $scope.TempSimulationChart.IsCloseCycleOnCancellation;
        $scope.GetARTSubTypeList($scope.TempSimulationChart.SCARTID);

        //if isFinalize
        if ($scope.TempSimulationChart.IsFinalize != undefined && $scope.TempSimulationChart.IsFinalize) {
            $scope.IsValidToDisabelSave = true;
        }
        //set stimulation date checked
        if ($scope.SimulationChart.TempFolliScanDaysCheckList != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempFolliScanDaysCheckList.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempFolliScanDaysCheckList[col].Date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.FolliScanDaysCheckList[row].IsChecked = true;
                    }
                }
            }
        }

        //set Endometriumn and thickness
        if ($scope.SimulationChart.TempEndometriumList != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempEndometriumList.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempEndometriumList[col].Date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        //$scope.SimulationChart.EndometriumList[row].Date = $scope.SimulationChart.TempEndometriumList[col].Date;
                        $scope.SimulationChart.EndometriumList[row].EndometriumThickness = $scope.SimulationChart.TempEndometriumList[col].EndometriumThickness;
                        $scope.SimulationChart.EndometriumList[row].EndometriumMorphology = $scope.SimulationChart.TempEndometriumList[col].EndometriumMorphology;
                        $scope.SimulationChart.EndometriumList[row].cyst = $scope.SimulationChart.TempEndometriumList[col].cyst;
                        $scope.SimulationChart.EndometriumList[row].Rcyst = $scope.SimulationChart.TempEndometriumList[col].Rcyst;
                    }
                }
            }
        }

        //set doctor name
        if ($scope.SimulationChart.TempDoctorNameList != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempDoctorNameList.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempDoctorNameList[col].date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.DoctorNameList[row].IsChecked = true;
                        $scope.SimulationChart.DoctorNameList[row].Inhouse = $scope.SimulationChart.TempDoctorNameList[col].Inhouse;
                        $scope.SimulationChart.DoctorNameList[row].Outside = $scope.SimulationChart.TempDoctorNameList[col].Outside;
                        $scope.SimulationChart.DoctorNameList[row].DoctorName = $scope.SimulationChart.TempDoctorNameList[col].DoctorName;

                    }
                }
            }
        }

        //E2
        if ($scope.SimulationChart.TempE2 != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempE2.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempE2[col].Date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.E2[row].Size = $scope.SimulationChart.TempE2[col].Size;
                    }
                }
            }
        }

        //Progesterone
        if ($scope.SimulationChart.TempProgesterone != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempProgesterone.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempProgesterone[col].Date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.Progesterone[row].Size = $scope.SimulationChart.TempProgesterone[col].Size;
                    }
                }
            }
        }

        //FSH
        if ($scope.SimulationChart.TempFSH != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempFSH.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempFSH[col].Date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.FSH[row].Size = $scope.SimulationChart.TempFSH[col].Size;
                    }
                }
            }
        }
        //LH
        if ($scope.SimulationChart.TempLH != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempLH.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempLH[col].Date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.LH[row].Size = $scope.SimulationChart.TempLH[col].Size;
                    }
                }
            }
        }
        //Remark setting
        if ($scope.SimulationChart.TempRemarksList != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempRemarksList.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempRemarksList[col].Date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.RemarksList[row].Remark = $scope.SimulationChart.TempRemarksList[col].Remark;
                    }
                }
            }
        }

        //Latest doctor / Physician
        if ($scope.SimulationChart.TempLatestDoctors != undefined) {
            for (var col = 0; col < $scope.SimulationChart.TempLatestDoctors.length; col++) {
                for (var row = 0; row < $scope.futureDates.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.TempLatestDoctors[col].date);
                    var secondDate = $filter('date')($scope.futureDates[row]);
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.LatestDoctors[row].Name = $scope.SimulationChart.TempLatestDoctors[col].Name;
                    }
                }
            }
        }

        //Calculate Total drug count
        $scope.fetchDrugCounts($scope.SimulationChart.AddDrugList);

        //Clear all arrays lastly
        $scope.TempSimulationChart = {};
        $scope.SimulationChart.TempLatestDoctors = new Array();
        $scope.SimulationChart.TempE2 = new Array();
        $scope.SimulationChart.TempProgesterone = new Array();
        $scope.SimulationChart.TempFSH = new Array();
        $scope.SimulationChart.TempLH = new Array();
        $scope.SimulationChart.TempRemarksList = new Array();
        $scope.SimulationChart.TempFolliScanDaysCheckList = new Array();
        $scope.SimulationChart.TempDoctorNameList = new Array();
        $scope.SimulationChart.TempEndometriumList = new Array();
    }

    $scope.MakeCheckboxCheckedOnDate = function MakeCheckboxCheckedOnDate() {
        ////
        if ($scope.FollicularSizeDeatilsList != undefined && $scope.SimulationChart.FolliScanDaysCheckList != undefined) {
            for (var col = 0; col < $scope.SimulationChart.FolliScanDaysCheckList.length; col++) {
                for (var row = 0; row < $scope.FollicularSizeDeatilsList.length; row++) {
                    var firstDate = $filter('date')($scope.SimulationChart.FolliScanDaysCheckList[col].Date, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.FollicularSizeDeatilsList[row].Date, 'dd-MMM-yyyy');
                    if (firstDate == secondDate) {
                        $scope.SimulationChart.FolliScanDaysCheckList[col].IsChecked = true;
                    }
                }
            }
        }
    }

    $scope.ValidateBeforeNewCycleGeneration = function () {
        var IsValidToProceed = true;
        ////

        for (var col = 0; col < 5; col++) {
            //check folliculal size present in next 5 days      $scope.futureDates.length
            angular.forEach($scope.FollicularSizeDeatilsList, function (item) {
                var firstDate = $filter('date')(item.Date, 'dd-MMM-yyyy');
                var secondDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                if (firstDate == secondDate) {
                    IsValidToProceed = false;
                }
            });
            //check E2, Progestrone, FSH, Stimulation Drugs,Trigger and Remarks
            if (IsValidToProceed) {
                angular.forEach($scope.SimulationChart.E2, function (item) {
                    var firstDate = $filter('date')(item.Date, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                    if ((firstDate == secondDate) && (item.Size != undefined)) {
                        IsValidToProceed = false;
                    }
                });
            }
            //Progesterone
            if (IsValidToProceed) {
                angular.forEach($scope.SimulationChart.Progesterone, function (item) {
                    var firstDate = $filter('date')(item.Date, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                    if ((firstDate == secondDate) && (item.Size != undefined)) {
                        IsValidToProceed = false;
                    }
                });
            }
            //FSH
            if (IsValidToProceed) {
                angular.forEach($scope.SimulationChart.FSH, function (item) {
                    var firstDate = $filter('date')(item.Date, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                    if ((firstDate == secondDate) && (item.Size != undefined)) {
                        IsValidToProceed = false;
                    }
                });
            }
            //LH
            if (IsValidToProceed) {
                angular.forEach($scope.SimulationChart.LH, function (item) {
                    var firstDate = $filter('date')(item.Date, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                    if ((firstDate == secondDate) && (item.Size != undefined)) {
                        IsValidToProceed = false;
                    }
                });
            }
            //Drug
            if (IsValidToProceed) {
                angular.forEach($scope.SimulationChart.AddDrugList, function (item) {
                    var firstDate = $filter('date')(item.DrugDate, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                    if (firstDate == secondDate) {
                        IsValidToProceed = false;
                    }
                });
            }
            //Trigger
            if (IsValidToProceed) {
                angular.forEach($scope.SimulationChart.TriggerDateDoseList, function (item) {
                    var firstDate = $filter('date')(item.TriggerDate, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                    if (firstDate == secondDate) {
                        IsValidToProceed = false;
                    }
                });
            }
            //Remarks
            if (IsValidToProceed) {
                angular.forEach($scope.SimulationChart.RemarksList, function (item) {
                    var firstDate = $filter('date')(item.TriggerDate, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                    if ((firstDate == secondDate) && (item.Remark != undefined)) {
                        IsValidToProceed = false;
                    }
                });
            }
            //No need to check Physcian and Drug Administration
        }

        return IsValidToProceed;
    }

    $scope.NextDrugDays = function () {
        ////
        $scope.currentDate = $scope.SimulationChart.DrugDate;
        $scope.startDate = $scope.SimulationChart.DrugDate; // Current moment
        $scope.DaysEndDate = new Date($scope.SimulationChart.DrugDate.getTime() + (parseInt($scope.SimulationChart.SCDays) - 1) * 24 * 60 * 60 * 1000); // Current moment + 15 days
        var i = 0;
        $scope.iDate = new Date($scope.currentDate); // Date object to be used as iterator
        $scope.NextDrugDates = new Array();
        $scope.NextDrugDates.push({ NextDate: new Date($scope.iDate.setDate($scope.iDate.getDate() - 0)), DateWiseDose: $scope.SimulationChart.SCDose, LoggedUserName: $scope.LoginInfo });
        //delete if date present then
        angular.forEach($scope.SimulationChart.LatestDoctors, function (item, index) {
            var docComp = $filter('date')($scope.NextDrugDates[i].NextDate, 'dd-MMM-yyyy');
            var docDate = $filter('date')(item.date, 'dd-MMM-yyyy');
            if (docDate == docComp) {
                $scope.SimulationChart.LatestDoctors.splice(index, 1);
            }
        });
        $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.NextDrugDates[i].NextDate), Name: $scope.LoginInfo });
        while ($scope.iDate < $scope.DaysEndDate) {
            i++;
            $scope.NextDrugDates.push({ NextDate: new Date($scope.iDate.setDate($scope.iDate.getDate() + 1)), DateWiseDose: $scope.SimulationChart.SCDose, LoggedUserName: $scope.LoginInfo }); // Switch to next d
            //delete if date present then
            angular.forEach($scope.SimulationChart.LatestDoctors, function (item, index) {
                var docComp = $filter('date')($scope.NextDrugDates[i].NextDate, 'dd-MMM-yyyy');
                var docDate = $filter('date')(item.date, 'dd-MMM-yyyy');
                if (docDate == docComp) {
                    $scope.SimulationChart.LatestDoctors.splice(index, 1);
                }
            });
            $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.NextDrugDates[i].NextDate), Name: $scope.LoginInfo });
        }
        return $scope.NextDrugDates;
    }

    $scope.CheckDateValidity = function (d) {
        ////
        var IsValid = false;
        if (Object.prototype.toString.call(d) === "[object Date]") {
            // it is a date
            if (isNaN(d.getTime())) {  // d.valueOf() could also work
                // date is not valid
                IsValid = false;
            }
            else {
                // date is valid
                IsValid = true;
            }
        }
        else {
            // not a date
            IsValid = false;
        }
        return IsValid;
    }

    $scope.GoToFollicularScan = function GoToFollicularScan() {
        $rootScope.FormName = 'Follicular Scan';
        $location.path('/FollicularScan/');
    }
    $scope.GoToCorpusScan = function GoToCorpusScan() {   //By Nayan Kamble
        debugger;
        $rootScope.FormName = 'Corpus Leteum Scan';
        $location.path('/CorpusLeteumScan/');

    }

    $scope.GetFollicularScanSizeDetails = function GetFollicularScanSizeDetails() {
        ////
        var ResponseData = StimulationChartService.GetStimulationChartSizeDetails();
        ResponseData.then(function (Response) {
            debugger;
            $scope.FollicularSizeDeatilsList = Response.data;
            //set checkbox checked by conditional
            $scope.MakeCheckboxCheckedOnDate();
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        })
    }

    $scope.SetCollapseExpandCSS = function () {
        //
        if (($scope.RandomNo % 2) == 0) {
            $scope.RandomNo++;
            $scope.IsOpenModel = true;
        } else {
            $scope.RandomNo++;
            $scope.IsOpenModel = false;
        }
    }

    $scope.EnableDisableReason = function (IsTrue) {
        if (IsTrue) {
            $scope.MakeReasonDisabled = false;
        } else {
            $scope.MakeReasonDisabled = true;
        }
    }

    $scope.EnableOrDisableFolliScanCheck = function (item) {
        //debugger;
        if ($rootScope.ARTDateValidation) {
            var todayDate = new Date($filter('date')($scope.today, 'dd-MMM-yyyy'));
            var checkDate = new Date($filter('date')(item.Date, 'dd-MMM-yyyy'));
            //console.log('No of times validate');
            return todayDate > checkDate ? true : false;
        }
        else {
            return false;
}
        //if (todayDate > checkDate) {
        //    return true;
        //} else {
        //    return false;
        //}
    }
    /* END : User defined functions to validation and cheking purpose*/

    /* START : Actions */
    $scope.AddDrug = function AddDrug() {
        debugger;
        if ($scope.SimulationChart.AddDrugList.length == 3) {
            //clear the popup selected values/set values
            $scope.ClearPopupValuesWithClose();
            AlertMessage.warning(objResource.msgTitle, "You can not add more than 3 drugs");
        } else {
            //validity check first otherwise make it red mark
            if (!$scope.frmSChartAddDrug.SCDrugID.$valid
                || !$scope.frmSChartAddDrug.DrugDate.$valid
                || !$scope.frmSChartAddDrug.StimulationTime.$valid
                || !$scope.frmSChartAddDrug.SCDays.$valid
                || !$scope.frmSChartAddDrug.SCDose.$valid
                || $scope.SimulationChart.SCDays == 0
                ) {
                $scope.frmSChartAddDrug.SCDrugID.$dirty = true;
                $scope.frmSChartAddDrug.DrugDate.$dirty = true;
                $scope.frmSChartAddDrug.StimulationTime.$dirty = true;
                $scope.frmSChartAddDrug.SCDays.$dirty = true;
                $scope.frmSChartAddDrug.SCDose.$dirty = true;
            } else {
                //This line for getting selected drug name from DD or select
                //   $scope.gradeC = $scope.SCDrugList.filter((subject) => subject.ID === $scope.SimulationChart.SCDrugID)[0]
                $scope.gradeC = $filter('filter')($scope.SCDrugList, { ID: $scope.SimulationChart.SCDrugID }, true);
                var result = $scope.checkIfNameExists($scope.SimulationChart.AddDrugList, $scope.gradeC[0].Description);
                if (result) {
                    AlertMessage.warning(objResource.msgTitle, "Drug already present in system");
                } else {
                    ////
                    $scope.AllDrugDates = [];
                    angular.forEach($scope.SimulationChart.AddDrugList, function (item) {
                        angular.forEach(item.DrugNextDates, function (item1) {
                            $scope.AllDrugDates.push(new Date(item1.NextDate));
                        });
                    });
                    $scope.DrugGreaterDate = Math.max.apply(null, $scope.AllDrugDates);
                    var stimulationDate = new Date($scope.DrugGreaterDate);

                    var triggerDate;
                    if (!angular.isUndefined($scope.SimulationChart.TriggerDateDoseList) && $scope.SimulationChart.TriggerDateDoseList.length != 0) {
                        triggerDate = new Date($scope.SimulationChart.TriggerDateDoseList[0].TriggerDate);
                    }
                    debugger;
                    var first = new Date($filter('date')(stimulationDate, 'dd-MMM-yyyy'));
                    var second = new Date($filter('date')(triggerDate, 'dd-MMM-yyyy'));
                    $scope.mydate = new Date($scope.SimulationChart.DrugDate);
                    var numberOfDaysToAdd = $scope.SimulationChart.SCDays;
                    if (numberOfDaysToAdd <= 1) {
                        $scope.third = $scope.mydate;
                    } else {
                        $scope.third = $scope.mydate.setDate($scope.mydate.getDate() + numberOfDaysToAdd);
                    }
                    var third = new Date($filter('date')($scope.third, 'dd-MMM-yyyy'));

                    //if trigger date present and drug not here then added drug date is greater than drug date do not allow to add drug
                    if (triggerDate == undefined || first == 'Invalid Date' || (first < second && third < second)) {
                        // Insert
                        //console.log('You can insert drug');
                        $scope.SimulationChart.AddDrugList.push({
                            DrugID: $scope.SimulationChart.SCDrugID,
                            DrugName: $scope.gradeC[0].Description,
                            DrugDate: $scope.SimulationChart.DrugDate,
                            DrugNextDates: $scope.NextDrugDays(),
                            DrugTime: $scope.SimulationChart.StimulationTime,
                            DrugDays: $scope.SimulationChart.SCDays,
                            DrugDose: $scope.SimulationChart.SCDose
                        });
                        //Calculate Total drug count
                        $scope.fetchDrugCounts($scope.SimulationChart.AddDrugList);
                        //clear the popup selected values/set values
                        $scope.ClearPopupValuesWithClose();
                    } else {
                        //In that date trigger is already present, hence you can not add drug on this date
                        //console.log('Trigger is already present, hence you can not add drug on this date')
                        AlertMessage.warning(objResource.msgTitle, "Trigger is already present, hence you can not add drug on this date");
                    }
                }
            }
        }
    }

    $scope.fetchDrugCounts = function (DrugList) {
        ////
        $scope.DrugFirstCount = 0;
        $scope.DrugSecondCount = 0;
        $scope.DrugThirdCount = 0;
        $scope.TotalDrugCount = 0;
        for (var col = 0; col < DrugList.length; col++) {
            for (var row = 0; row < DrugList[col].DrugNextDates.length; row++) {
                if (col == 0) {
                    //first drug count
                    $scope.DrugFirstCount += parseFloat(DrugList[col].DrugNextDates[row].DateWiseDose);
                    $scope.DrugFirstName = DrugList[col].DrugName;
                }
                if (col == 1) {
                    //first drug count
                    $scope.DrugSecondCount += parseFloat(DrugList[col].DrugNextDates[row].DateWiseDose);
                    $scope.DrugSecondName = DrugList[col].DrugName;
                }
                if (col == 2) {
                    //first drug count
                    $scope.DrugThirdCount += parseFloat(DrugList[col].DrugNextDates[row].DateWiseDose);
                    $scope.DrugThirdName = DrugList[col].DrugName;
                }
            }
        }
        //Total drug count
        $scope.TotalDrugCount = $scope.DrugFirstCount + $scope.DrugSecondCount + $scope.DrugThirdCount;
    }

    $scope.checkIfNameExists = function (arr, newName) {
        return arr.some(function (e) {
            return e.DrugName === newName;
        });
    }


    // commented sujata alredy added 1 trigger
    //$scope.AddTrigger = function AddTrigger() {
    //    ////
    //    debugger;
    //    if (!$scope.frmAddTrigger.SCDrugID.$valid
    //            || !$scope.frmAddTrigger.DrugDate.$valid
    //            || !$scope.frmAddTrigger.SimulationChartTime.$valid
    //            || !$scope.frmAddTrigger.SCDose.$valid) {
    //        $scope.frmAddTrigger.SCDrugID.$dirty = true;
    //        $scope.frmAddTrigger.DrugDate.$dirty = true;
    //        $scope.frmAddTrigger.SimulationChartTime.$dirty = true;
    //        $scope.frmAddTrigger.SCDose.$dirty = true;
    //    } else {
    //        //check stimulation drug is given or not
    //        if ($scope.SimulationChart.SCDrugID == 0) {
    //            $scope.frmAddTrigger.SCDrugID.$dirty = true;
    //        } else {
    //            //IF drug present then
    //            if ($scope.SimulationChart.AddDrugList.length > 0 && $scope.SimulationChart.TriggerDateDoseList.length <= 0) {
    //                //first chek it's date and trigger date
    //                //if trigger date is past than drug date or equle then

    //                $scope.AllDrugDates = [];
    //                angular.forEach($scope.SimulationChart.AddDrugList, function (item) {
    //                    angular.forEach(item.DrugNextDates, function (item1) {
    //                        //var momentDate = new Date(item1.NextDate);
    //                        $scope.AllDrugDates.push(new Date(item1.NextDate));
    //                    });
    //                });

    //                $scope.DrugGreaterDate = Math.max.apply(null, $scope.AllDrugDates);
    //                //$scope.kk = new Date(Math.max.apply(null, $scope.test.map(function (e) {
    //                //    return new Date(e);
    //                //})));

    //                var stimulationDate = new Date($scope.DrugGreaterDate);
    //                var triggerDate = $scope.SimulationChart.TriggerDate;

    //                if (stimulationDate <= triggerDate) {
    //                    $scope.SimulationChart.TriggerDateDoseList.push({ DrugID: $scope.SimulationChart.SCDrugID, TriggerDate: $scope.SimulationChart.TriggerDate, DrugTime: $scope.SimulationChart.SimulationChartTime, TriggerDose: $scope.SimulationChart.SCDose });
    //                    var IsDatePresent = false;
    //                    for (var colust = 0; colust < $scope.SimulationChart.LatestDoctors.length; colust++) {
    //                        var consultFristDate = $filter('date')($scope.SimulationChart.TriggerDate, 'dd-MMM-yyyy');
    //                        var consultSecondDate = $filter('date')($scope.SimulationChart.LatestDoctors[colust].date, 'dd-MMM-yyyy');
    //                        if (consultFristDate == consultSecondDate) {
    //                            IsDatePresent = true;
    //                        }
    //                    }
    //                    if (IsDatePresent == false) {
    //                        $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.SimulationChart.TriggerDate), Name: $scope.LoginInfo });
    //                    }
    //                } else {
    //                    AlertMessage.warning(objResource.msgTitle, "trigger date should be graeter than or equl to stimulation date.");
    //                }
    //                $scope.ClearPopupValuesWithClose();
    //            } else {
    //                //Else
    //                //Directly assign trigger on given date
    //                if ($scope.SimulationChart.TriggerDateDoseList.length > 0) {
    //                    AlertMessage.warning(objResource.msgTitle, "Trigger - HCG already set");
    //                } else {
    //                    for (var col = 0; col < $scope.futureDates.length; col++) {
    //                        var firstDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
    //                        var secondDate = $filter('date')($scope.SimulationChart.TriggerDate, 'dd-MMM-yyyy');
    //                        if (firstDate == secondDate) {
    //                            $scope.SimulationChart.TriggerDateDoseList.push({ DrugID: $scope.SimulationChart.SCDrugID, TriggerDate: $scope.SimulationChart.TriggerDate, DrugTime: $scope.SimulationChart.SimulationChartTime, TriggerDose: $scope.SimulationChart.SCDose });
    //                            var IsDatePresent = false;
    //                            for (var colust = 0; colust < $scope.SimulationChart.LatestDoctors.length; colust++) {
    //                                var consultFristDate = $filter('date')($scope.SimulationChart.TriggerDate, 'dd-MMM-yyyy');
    //                                var consultSecondDate = $filter('date')($scope.SimulationChart.LatestDoctors[colust].date, 'dd-MMM-yyyy');
    //                                if (consultFristDate == consultSecondDate) {
    //                                    IsDatePresent = true;
    //                                }
    //                            }
    //                            if (IsDatePresent == false) {
    //                                $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.SimulationChart.TriggerDate), Name: $scope.LoginInfo });
    //                            }
    //                            break;
    //                        }
    //                    }
    //                }
    //                $scope.ClearPopupValuesWithClose();
    //            }
    //        }
    //    }
    //}

    //$scope.ClearPopupValuesWithClose = function () {
    //    // Clear input fields after push
    //    $scope.SimulationChart.SCDrugID = 0;
    //    $scope.SimulationChart.DrugDate = "";
    //    $scope.SimulationChart.StimulationTime = "";
    //    $scope.SimulationChart.SCDays = 0;
    //    $scope.SimulationChart.SCDose = "";
    //    $scope.frmSChartAddDrug.SCDrugID.$dirty = false;
    //    $scope.frmSChartAddDrug.DrugDate.$dirty = false;
    //    $scope.frmSChartAddDrug.StimulationTime.$dirty = false;
    //    $scope.frmSChartAddDrug.SCDays.$dirty = false;
    //    $scope.frmSChartAddDrug.SCDose.$dirty = false;
    //    // Close the model popup
    //    //angular.element(btnClosePop).trigger('click');
    //    $('.modal').modal('hide');
    //    //console.log($scope.SimulationChart.AddDrugList);
    //}




    $scope.AddTrigger = function AddTrigger() {  // Added sujata multiple trigger
        debugger;

        //if ($scope.SimulationChart.VisitID == null && $scope.SimulationChart.VisitUnitID == null && $scope.SimulationChart.PatientID == null && $scope.SimulationChart.PatientUnitID == null) {
        //    $scope.SaveUpdateStimulationChart($scope.SimulationChart);
        //}
        
            for (var i = 0; i <= $scope.SimulationChart.TriggerDateDoseListData.length; i++) {
                if ($scope.SimulationChart.TriggerDateDoseListData[i].SCDrugID == 0 && $scope.SimulationChart.TriggerDateDoseListData[i].TriggerDate == undefined
                   && $scope.SimulationChart.TriggerDateDoseListData[i].SimulationChartTime == undefined && $scope.SimulationChart.TriggerDateDoseListData[i].SCDose == undefined) {
                    AlertMessage.error(objResource.msgTitle, "Please Fill Mandatory value");
                }
                else if ($scope.SimulationChart.TriggerDateDoseListData.length == 2 && i == 0) {
                    var firstDate = $filter('date')($scope.SimulationChart.TriggerDateDoseListData[i].TriggerDate, 'dd-MMM-yyyy');
                    var secondDate = $filter('date')($scope.SimulationChart.TriggerDateDoseListData[i + 1].TriggerDate, 'dd-MMM-yyyy');
                    var firstTime = $filter('date')($scope.SimulationChart.TriggerDateDoseListData[i].SimulationChartTime, 'hh:mm');
                    var secondTime = $filter('date')($scope.SimulationChart.TriggerDateDoseListData[i + 1].SimulationChartTime, 'hh:mm');

                    if (firstDate != secondDate) {
                        AlertMessage.error(objResource.msgTitle, "Trigger Date should be same");
                        //break;
                        return;
                    }
                    else if (firstTime != secondTime) {
                        AlertMessage.error(objResource.msgTitle, "Trigger Time should be same");
                        //break;
                        return;
                    }
                }
                else {
                    if ($scope.SimulationChart.AddDrugList.length == 0) {
                        AlertMessage.warning(objResource.msgTitle, "Add Stimulation drug first on stimulation chart before trigger...");
                        $scope.ClearPopupValuesWithClose();
                        return;
                    }

                    // if ($scope.SimulationChart.AddDrugList.length > 0 && $scope.SimulationChart.TriggerDateDoseList.length <= 0) {
                    if ($scope.SimulationChart.AddDrugList.length > 0 && $scope.SimulationChart.TriggerDateDoseList.length >= 0) {

                        //added sujata for tempaaorary check

                        debugger;
                        //first chek it's date and trigger date
                        //if trigger date is past than drug date or equle then
                        $scope.AllDrugDates = [];
                        angular.forEach($scope.SimulationChart.AddDrugList, function (item) {
                            angular.forEach(item.DrugNextDates, function (item1) {
                                $scope.AllDrugDates.push(new Date(item1.NextDate));
                            });

                        });
                        $scope.DrugGreaterDate = Math.max.apply(null, $scope.AllDrugDates);
                        var stimulationDate = new Date($scope.DrugGreaterDate);
                        for (var i = 0; i < $scope.SimulationChart.TriggerDateDoseListData.length; i++) {
                            var triggerDate = $scope.SimulationChart.TriggerDateDoseListData[i].TriggerDate;
                        }
                        $scope.ClearPopupValuesWithClose();
                    }
                    else {

                        //Else
                        //Directly assign trigger on given date
                        //if ($scope.SimulationChart.TriggerDateDoseList.length < 0) {
                        //    AlertMessage.warning(objResource.msgTitle, "Trigger - HCG already set");
                        //}

                        //else {
                        for (var col = 0; col < $scope.futureDates.length; col++) {
                            var firstDate = $filter('date')($scope.futureDates[col], 'dd-MMM-yyyy');
                            var secondDate = $filter('date')($scope.SimulationChart.TriggerDate, 'dd-MMM-yyyy');
                            if (firstDate == secondDate) {
                                $scope.SimulationChart.TriggerDateDoseList.push({
                                    DrugID: $scope.SimulationChart.SCDrugID, TriggerDate: $scope.SimulationChart.TriggerDate, DrugTime: $scope.SimulationChart.SimulationChartTime,
                                    TriggerDose: $scope.SimulationChart.SCDose, TriggerDrug: $scope.SimulationChart.NewTriggerDrug
                                }); //TriggerDrug: $scope.SimulationChart.NewTriggerDrug....TriggerDrug: $scope.SimulationChart.TriggerListArr 
                                break;
                            }
                        }
                        var stimulationDate = new Date($scope.DrugGreaterDate);
                        for (var i = 0; i < $scope.SimulationChart.TriggerDateDoseListData.length; i++) {
                            var triggerDate = $scope.SimulationChart.TriggerDateDoseListData[i].TriggerDate;
                        }

                        for (var i = 0; i < $scope.SimulationChart.TriggerDateDoseList.length; i++) {
                            if ($scope.SimulationChart.TriggerDateDoseList.length == 1 && i == 0) {
                                var firstDate = $filter('date')($scope.SimulationChart.TriggerDateDoseList[i].TriggerDate, 'dd-MMM-yyyy');
                                var secondDate = $filter('date')($scope.SimulationChart.TriggerDateDoseListData[i].TriggerDate, 'dd-MMM-yyyy');
                                var firstTime = $filter('date')($scope.SimulationChart.TriggerDateDoseList[i].SimulationChartTime, 'hh:mm');  //SimulationChartTime
                                var secondTime = $filter('date')($scope.SimulationChart.TriggerDateDoseListData[i].SimulationChartTime, 'hh:mm');

                                if (firstDate != secondDate) {
                                    AlertMessage.error(objResource.msgTitle, "Trigger Date  should be same");
                                    //break;
                                    return;
                                }
                                else if (firstTime != secondTime) {
                                    AlertMessage.error(objResource.msgTitle, "Trigger  Time should be same");
                                    //break;
                                    return;
                                }

                            }
                        }

                    }
                    if ($scope.SimulationChart.TriggerDateDoseList.length > 0) {     //Added by Nayan Kamble on 30/09/2019
                        if ($filter('date')($scope.SimulationChart.TriggerDateDoseList[0].TriggerDate, 'dd-MMM-yyyy') != $filter('date')($scope.SimulationChart.TriggerDateDoseListData[0].TriggerDate, 'dd-MMM-yyyy')) {
                            AlertMessage.error(objResource.msgTitle, "Trigger Date  should be same");
                            $scope.SimulationChart.TriggerDateDoseList[0].length = $scope.SimulationChart.TriggerDateDoseList[0].length - 1;
                        }
                        else if ($filter('date')($scope.SimulationChart.TriggerDateDoseList[0].DrugTime, 'hh:mm') != $filter('date')($scope.SimulationChart.TriggerDateDoseListData[0].SimulationChartTime, 'hh:mm')) {
                            AlertMessage.error(objResource.msgTitle, "Trigger time  should be same");
                            $scope.SimulationChart.TriggerDateDoseList[0].length = $scope.SimulationChart.TriggerDateDoseList[0].length - 1;
                        }

                    }
                    $scope.ClearPopupValuesWithClose();

                }

            }

            
            debugger;
            if (stimulationDate <= triggerDate) {

                // added sujata trigger 1 by 1 
                for (var i = 0; i <= $scope.SimulationChart.TriggerDateDoseList.length; i++) {

                    if ($scope.SimulationChart.TriggerDateDoseList.length == 1 && i == 0) {
                        var firstDate = $filter('date')($scope.SimulationChart.TriggerDateDoseList[i].TriggerDate, 'dd-MMM-yyyy');
                        var secondDate = $filter('date')($scope.SimulationChart.TriggerDateDoseListData[i].TriggerDate, 'dd-MMM-yyyy');
                        var firstTime = $filter('date')($scope.SimulationChart.TriggerDateDoseList[i].DrugTime, 'hh:mm');
                        var secondTime = $filter('date')($scope.SimulationChart.TriggerDateDoseListData[i].SimulationChartTime, 'hh:mm');

                        if (firstDate != secondDate) {
                            AlertMessage.error(objResource.msgTitle, "Trigger Date should be same");
                            //break;
                            return;
                        }
                        else if (firstTime != secondTime) {
                            AlertMessage.error(objResource.msgTitle, "Trigger Time should be same");
                            //break;
                            return;
                        }
                    }
                }

                // ended sujata trigger





                // $scope.SimulationChart.TriggerDateDoseList.push({ DrugID: $scope.SimulationChart.SCDrugID, TriggerDate: $scope.SimulationChart.TriggerDate, DrugTime: $scope.SimulationChart.SimulationChartTime, TriggerDose: $scope.SimulationChart.SCDose, TriggerDrug: $scope.SimulationChart.NewTriggerDrug }); //TriggerDrug: $scope.SimulationChart.NewTriggerDrug
                angular.forEach($scope.SimulationChart.TriggerDateDoseListData, function (item) {
                    var tempObj = [];
                    tempObj = $filter('filter')($scope.SCTriggerList, { ID: item.SCDrugID }, true)

                    item.TriggerDrug = tempObj[0].Description;
                    item.TriggerDose = item.SCDose;
                    item.DrugID = item.SCDrugID;
                    item.DrugTime = item.SimulationChartTime
                });
                $scope.SimulationChart.TriggerDateDoseList = $scope.SimulationChart.TriggerDateDoseList.concat($scope.SimulationChart.TriggerDateDoseListData);

                if ($scope.SimulationChart.VisitID == null && $scope.SimulationChart.VisitUnitID == null && $scope.SimulationChart.PatientID == null && $scope.SimulationChart.PatientUnitID == null) {
                    $scope.SaveUpdateStimulationChart($scope.SimulationChart);
                }



            }
            else {
                AlertMessage.warning(objResource.msgTitle, "trigger date should be graeter than stimulation date.");
            }



            //angular.forEach($scope.SimulationChart.TriggerDateDoseListData, function (item) {
            //    var tempObj = [];
            //    tempObj = $filter('filter')($scope.SCTriggerList, { ID: item.SCDrugID }, true)

            //    item.TriggerDrug = tempObj[0].Description;
            //    item.TriggerDose = item.SCDose;
            //    item.DrugID = item.SCDrugID;
            //    item.DrugTime = item.SimulationChartTime
            //});
            //$scope.SimulationChart.TriggerDateDoseList = $scope.SimulationChart.TriggerDateDoseList.concat($scope.SimulationChart.TriggerDateDoseListData);

            // $filter('filter')($scope.SCDrugList, { ID: $scope.SimulationChart.SCDrugID }, true);
        }
    




    $scope.ClearPopupValuesWithClose = function () {
        debugger;
        // Clear input fields after push

        //$scope.SimulationChart.SCDrugID = 0;
        //$scope.SimulationChart.DrugDate = "";
        //$scope.SimulationChart.StimulationTime = "";
        //$scope.SimulationChart.SCDays = 0;
        //$scope.SimulationChart.SCDose = "";

        $scope.frmSChartAddDrug.SCDrugID.$dirty = false;
        $scope.frmSChartAddDrug.DrugDate.$dirty = false;
        $scope.frmSChartAddDrug.StimulationTime.$dirty = false;
        $scope.frmSChartAddDrug.SCDays.$dirty = false;
        $scope.frmSChartAddDrug.SCDose.$dirty = false;



        // Close the model popup
        //angular.element(btnClosePop).trigger('click');
        $('.modal').modal('hide');
        //console.log($scope.SimulationChart.AddDrugList);
    }

    $scope.SetDefaultValues = function () {
        debugger;
        $scope.SimulationChart.SCDrugID = 0;
        $scope.SimulationChart.SCDays = 0;
        $scope.SimulationChart.SCDose = "";
    }

    
    $scope.SetDefaultValuesTrigger = function () {  // Added sujata multiple trigger
        debugger;
        $scope.SimulationChart.TriggerDateDoseList.SCDrugID = 0;
        $scope.SimulationChart.TriggerDateDoseList.TriggerDate = undefined;
        $scope.SimulationChart.TriggerDateDoseList.SimulationChartTime = undefined;
        $scope.SimulationChart.TriggerDateDoseList.SCDose = undefined;
        $scope.SimulationChart.TriggerDateDoseListData = [];
        $scope.AddNewTriggerDrugs();
    }

    $scope.CancelTrigger = function CancelTrigger()  // Added sujata multiple trigger
    {
        debugger;
        $scope.SimulationChart.TriggerDateDoseListData = [];
    }

    $scope.AddNewTriggerDrugs = function AddNewTriggerDrugs() { // Added sujata multiple trigger
        debugger;

        if (angular.isUndefined($scope.SimulationChart.TriggerDateDoseListData)) {
            $scope.SimulationChart.TriggerDateDoseListData = [];
        }

        if ($scope.SimulationChart.TriggerDateDoseListData.length < 2 && $scope.SimulationChart.TriggerDateDoseList.length < 2) {

            if ($scope.SimulationChart.TriggerDateDoseListData.length == 1 && $scope.SimulationChart.TriggerDateDoseList.length == 1) {
                AlertMessage.error('PalashIVF', 'You can not add more than 2 trigger drug');
            }
            else {
                var total = 10;
                total = (total - $scope.SimulationChart.TriggerDateDoseListData.length);
                if (total > 0) {
                    $scope.TriggerDateDoseListData1 = {};
                    $scope.TriggerDateDoseListData1.SCDrugID = 0;
                    $scope.TriggerDateDoseListData1.TriggerDate = undefined;
                    $scope.TriggerDateDoseListData1.SimulationChartTime = undefined;
                    $scope.TriggerDateDoseListData1.SCDose = undefined;

                    $scope.SimulationChart.TriggerDateDoseListData.push($scope.TriggerDateDoseListData1);

                }
                else {
                    AlertMessage.error('PalashIVF', 'You can not add more than 2 trigger drug');
                }
            }
        }

        else {
            AlertMessage.error('PalashIVF', 'You can not add more than 2 trigger drugs');
        }
        

    }


    $scope.RemoveTriggerDrug = function (index) {
        debugger;
        if ($scope.SimulationChart.TriggerDateDoseListData.length > 1) {
            $scope.SimulationChart.TriggerDateDoseListData.splice(index, 1);


        }
    }


    $scope.CheckDuplicateTriggerDrug = function (SimulationChart) {
        debugger;
        $scope.keepGoing = false;

        angular.forEach($scope.SimulationChart.TriggerDateDoseList, function (Mul) {
            if (Mul.SCDrugID == SimulationChart.SCDrugID) {
                $scope.keepGoing = true;
            }
        });


        //added sujata for 1 by 1 trigger add 26-12-2019
        if($scope.SimulationChart.TriggerDateDoseList.length==1)
        {
         if($scope.SimulationChart.TriggerDateDoseList[0].DrugID==SimulationChart.SCDrugID)
         {
             $scope.keepGoing = true;
         }
         else
         {
             $scope.keepGoing = false;
         }
        }
        //ended sujata for 1 by 1 trigger add 26-12-2019


        if ($scope.keepGoing == false) {
            $scope.GetList = $filter('filter')($scope.SimulationChart.TriggerDateDoseListData, function (d) { return d.SCDrugID == SimulationChart.SCDrugID; }).length;
            if ($scope.GetList > 1) {
                $scope.keepGoing = true;
            }
        }
        if ($scope.keepGoing == true) {
            AlertMessage.error(objResource.msgTitle, "Drug already present in system");
        }

    }







    $scope.SetDrugIndex = function SetDrugIndex(Index) {
        debugger;
        $scope.editDrugIndex = Index;
        //find drug name 
        for (var row = 0; row < $scope.SimulationChart.AddDrugList.length; row++) {
            //matching index location find the there is already drug set or not
            if (row == $scope.editDrugIndex) {
                //Push the date and all details in "AddDrugList"
                ////
              //  console.log("edit ", $scope.SimulationChart.AddDrugList);
                $scope.SimulationChart.SCDrugID = $scope.SimulationChart.AddDrugList[row].DrugID;
                $scope.SimulationChart.DrugDate = new Date($scope.SimulationChart.AddDrugList[row].DrugDate);
                $scope.SimulationChart.StimulationTime = $scope.SimulationChart.AddDrugList[row].DrugTime;

                $scope.DaysList = [];
                $scope.DaysList.splice(0, 0, { ID: 0, Description: 'Select' });
                $scope.SimulationChart.SCDays = 0;
                $scope.daysDiffCount = $scope.dayDiff($scope.SimulationChart.SimulationCycleStartDate, $scope.SimulationChart.DrugDate);
                for (var Index = 1; Index <= 35 - $scope.daysDiffCount; Index++) {
                    $scope.DaysList.push({ ID: Index, Description: Index });
                }

                $scope.SimulationChart.SCDose = $scope.SimulationChart.AddDrugList[row].DrugDose;
                $scope.SimulationChart.SCDays = $scope.SimulationChart.AddDrugList[row].DrugNextDates.length;  //DrugDays;

            }
        }
        //set drug name
        //disable popup drug name dropdown
        $scope.editDrugNamePopupDDDisabled = true;
    }

    $scope.EditRowWiseDrug = function EditRowWiseDrug(SimulationChart) {
        debugger;
        //Validity check first otherwise make it red mark
        if (!$scope.frmEditRowwiseDrug.SCDrugID.$valid
                || !$scope.frmEditRowwiseDrug.DrugDate.$valid
                || !$scope.frmEditRowwiseDrug.StimulationTime.$valid
                || !$scope.frmEditRowwiseDrug.SCDays.$valid
                || !$scope.frmEditRowwiseDrug.SCDose.$valid
                || $scope.SimulationChart.SCDays == 0
            ) {
            $scope.frmEditRowwiseDrug.SCDrugID.$dirty = true;
            $scope.frmEditRowwiseDrug.DrugDate.$dirty = true;
            $scope.frmEditRowwiseDrug.StimulationTime.$dirty = true;
            $scope.frmEditRowwiseDrug.SCDays.$dirty = true;
            $scope.frmEditRowwiseDrug.SCDose.$dirty = true;
        } else {

            $scope.EditDrugRowList = [];
            $scope.EditDrugRowList.push({
                DrugRowDates: $scope.NextDrugDays(),
            });
            //console.log("edit", $scope.EditDrugRowList)
            var len = $scope.EditDrugRowList[0].DrugRowDates.length - 1;
            var editMaxDate = new Date($scope.EditDrugRowList[0].DrugRowDates[len].NextDate);
            var isTriggerPresent = false;
            var triggerDate = null;
            debugger;
            if ($scope.SimulationChart.TriggerDateDoseList.length > 0) {
                isTriggerPresent = true;
                triggerDate = new Date($scope.SimulationChart.TriggerDateDoseList[0].TriggerDate)
            }

            if (editMaxDate > triggerDate && isTriggerPresent) {
                AlertMessage.warning("PalashIVF", "Trigger Date Should be Greater Then Stimulation Date")
            }
            else {
                $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].Remark = $scope.SimulationChart.Remark;
                $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugDate = $scope.SimulationChart.DrugDate;
                $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugTime = $scope.SimulationChart.StimulationTime;
                $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugDose = $scope.SimulationChart.SCDose;
                $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugDays = $scope.SimulationChart.SCDays;

                //Check if date is not matching then add that date and dose
                for (var i = 0; i < $scope.EditDrugRowList.length; i++) {
                    for (var j = 0; j < $scope.EditDrugRowList[i].DrugRowDates.length; j++) {
                        var firstEditDate = $filter('date')($scope.EditDrugRowList[i].DrugRowDates[j].NextDate, 'dd-MMM-yyyy');
                        angular.forEach($scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugNextDates, function (item, index) {
                            var secondDrugDate = $filter('date')(item.NextDate, 'dd-MMM-yyyy');
                            if (firstEditDate == secondDrugDate) {
                                //item.DateWiseDose = "";
                                $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugNextDates.splice(index, 1);
                            }
                        });
                        //delete if date present then
                        angular.forEach($scope.SimulationChart.LatestDoctors, function (item, index) {
                            var docComp = $filter('date')($scope.EditDrugRowList[i].DrugRowDates[j].NextDate, 'dd-MMM-yyyy');
                            var docDate = $filter('date')(item.date, 'dd-MMM-yyyy');
                            if (docDate == docComp) {
                                $scope.SimulationChart.LatestDoctors.splice(index, 1);
                            }
                        });

                        $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugNextDates.push({ NextDate: $scope.EditDrugRowList[i].DrugRowDates[j].NextDate, DateWiseDose: $scope.SimulationChart.SCDose, LoggedUserName: $scope.LoginInfo });
                        $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.EditDrugRowList[i].DrugRowDates[j].NextDate), Name: $scope.LoginInfo });
                    }
                }
                //Calculate Total drug count
                $scope.fetchDrugCounts($scope.SimulationChart.AddDrugList);
                //Clear edit time drug list dose and dates
                $scope.EditDrugRowList = [];
                //Clear index at the end of process
                $scope.ClearPopupValuesWithClose();
               // console.log("update ", $scope.SimulationChart.AddDrugList, $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugDays);
                //for (var i = 0; i < $scope.StimulationChart.AddDrugList.length; i++) {
                if ($scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugNextDates.length > $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugDays) {
                    var diffff = $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugNextDates.length - $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugDays;
                    $scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugNextDates.splice(0, diffff);
                  //  console.log($scope.SimulationChart.AddDrugList[$scope.editDrugIndex].DrugNextDates);
                    $scope.SimulationChart.LatestDoctors.splice(0, diffff);
                }
                // }
            }
        }
    }

    $scope.EditDrugAtIndexSpecific = function EditDrugAtIndexSpecific() {
        debugger;
        if (!$scope.frmEditSpecificDrug.SCDrugID.$valid
                || !$scope.frmEditSpecificDrug.DrugDate.$valid
                || !$scope.frmEditSpecificDrug.StimulationTime.$valid
                || !$scope.frmEditSpecificDrug.SCDays.$valid
                || !$scope.frmEditSpecificDrug.SCDose.$valid) {
            $scope.frmEditSpecificDrug.SCDrugID.$dirty = true;
            $scope.frmEditSpecificDrug.DrugDate.$dirty = true;
            $scope.frmEditSpecificDrug.StimulationTime.$dirty = true;
            $scope.frmEditSpecificDrug.SCDays.$dirty = true;
            $scope.frmEditSpecificDrug.SCDose.$dirty = true;

        } else {
            for (var col = 0; col < $scope.futureDates.length && col <= $scope.SimulationChart.DrugOuterIndex; col++) {
                for (var row = 0; row < $scope.SimulationChart.AddDrugList[col].DrugNextDates.length; row++) {
                    var DrugSetDate = $filter('date')($scope.SimulationChart.DrugInnerDate, 'dd-MMM-yyyy');
                    var DrugGetDate = $filter('date')($scope.SimulationChart.AddDrugList[col].DrugNextDates[row].NextDate, 'dd-MMM-yyyy');
                    if ((DrugSetDate == DrugGetDate) && ($scope.SimulationChart.DrugOuterIndex == col)) {
                        ////
                        $scope.SimulationChart.AddDrugList[col].DrugTime = $scope.SimulationChart.StimulationTime;
                        $scope.SimulationChart.AddDrugList[col].DrugNextDates[row].DateWiseDose = $scope.SimulationChart.SCDose;
                        $scope.SimulationChart.LatestDoctors[col].Name = $scope.LoginInfo;
                        //Clear index at the end of process
                        $scope.ClearPopupValuesWithClose();
                        break;
                    }
                }
            }
            //Calculate Total drug count
            $scope.fetchDrugCounts($scope.SimulationChart.AddDrugList);
        }
    }

    $scope.DeleteDrugAtIndexSpecific = function DeleteDrugAtIndexSpecific() {
        ////


        $scope.IsValidToDeleteDose = false;
        for (var col = 0; col < $scope.futureDates.length && col <= $scope.SimulationChart.DrugOuterIndex; col++) {
            for (var row = 0; row < $scope.SimulationChart.AddDrugList[col].DrugNextDates.length; row++) {
                var DrugSetDate = $filter('date')($scope.SimulationChart.DrugInnerDate, 'dd-MMM-yyyy');
                var DrugGetDate = $filter('date')($scope.SimulationChart.AddDrugList[col].DrugNextDates[row].NextDate, 'dd-MMM-yyyy');
                if ((DrugSetDate == DrugGetDate) && ($scope.SimulationChart.DrugOuterIndex == col) && ($scope.SimulationChart.AddDrugList[col].DrugNextDates.length != 1)) {
                    ////
                    $scope.SimulationChart.AddDrugList[col].DrugNextDates.splice(row, 1);
                    //$scope.SimulationChart.LatestDoctors.splice(col, 1);
                    $scope.IsValidToDeleteDose = true;
                    //Clear index at the end of process
                    $scope.ClearPopupValuesWithClose();
                    break;
                }
            }
        }
        $scope.DeletePhysciancnt = $filter('filter')($scope.SimulationChart.AddDrugList, function (d) { return $filter('date')(d.DrugDate, 'dd-MMM-yyyy') == $filter('date')($scope.SimulationChart.DrugInnerDate, 'dd-MMM-yyyy') }).length;
        if ($scope.DeletePhysciancnt == 0) {
            for (var i = 0; i < $scope.SimulationChart.LatestDoctors.length; i++) {
                if ($scope.SimulationChart.DrugInnerIndex == i) {
                    $scope.SimulationChart.LatestDoctors[i].Name = undefined;
                }
            }
        }

        if (!$scope.IsValidToDeleteDose) {
            //Message for one dose is remaining you can not delete dose
            AlertMessage.warning(objResource.msgTitle, "You can not delete dose, hence one dose is remaining");
        }
        //Calculate Total drug count
        $scope.fetchDrugCounts($scope.SimulationChart.AddDrugList);
    }

    $scope.setDrugItemToEdit = function (DrugOuterIndex, DrugInnerIndex, SelectedDate, drug) {
        debugger;
        $scope.editDoseDisabled = false;
        $scope.editDrugNamePopupDDDisabled = true;
        $scope.editDrugDaysDisabled = true;
        $scope.SimulationChart.DrugOuterIndex = DrugOuterIndex;
        $scope.SimulationChart.DrugInnerIndex = DrugInnerIndex;
        $scope.SimulationChart.DrugInnerDate = SelectedDate;
        $scope.SimulationChart.SCDrugID = drug.DrugID;
        $scope.SimulationChart.SCDays = 1;//drug.DrugDays;
        $scope.SimulationChart.StimulationTime = drug.DrugTime;
        for (var col = 0; col < $scope.futureDates.length && col <= $scope.SimulationChart.DrugOuterIndex; col++) {
            for (var row = 0; row < $scope.SimulationChart.AddDrugList[col].DrugNextDates.length; row++) {
                var DrugSetDate = $filter('date')($scope.SimulationChart.DrugInnerDate, 'dd-MMM-yyyy');
                var DrugGetDate = $filter('date')($scope.SimulationChart.AddDrugList[col].DrugNextDates[row].NextDate, 'dd-MMM-yyyy');
                if ((DrugSetDate == DrugGetDate) && (DrugOuterIndex == col)) {
                    ////
                    $scope.SimulationChart.SCDose = $scope.SimulationChart.AddDrugList[col].DrugNextDates[row].DateWiseDose;
                    $scope.SimulationChart.DrugDate = new Date($scope.SimulationChart.AddDrugList[col].DrugNextDates[row].NextDate);
                    //START : Days list fill
                    $scope.DaysList = [];
                    $scope.DaysList.splice(0, 0, { ID: 0, Description: 'Select' });
                    for (var Index = 1; Index <= 1; Index++) {
                        $scope.DaysList.push({ ID: Index, Description: Index });
                    }
                    //END : Days list fill

                    $scope.SimulationChart.SCDays = 1;
                    $scope.editSpecificDateDisable = true;
                    //Dose disable if entered date is greater than todays date
                    var tempdt = $filter('date')($scope.SimulationChart.DrugDate, 'dd-MMM-yyyy'); new Date();
                    var td = $filter('date')($scope.today, 'dd-MMM-yyyy'); new Date();
                    if (td > tempdt) {
                        $scope.editDoseDisabled = true;
                    } else {
                        $scope.editDoseDisabled = false;
                    }
                    break;
                }
            }
        }
       // console.log(drug);
    };

    $scope.SetIdToDeleteDrug = function SetIdToDeleteDrug(Item, Index) {
        debugger;
        $scope.DeleteDrugReason = ""; //Added by divya on 25Aug2020
        $scope.DeleteDrugDates = [];
        $scope.DrugDeleteIdx = Index;
        if (!angular.isUndefined(Item.ID) && !angular.isUndefined(Item.StimulationID)) {
            $scope.DeleteDrugID = Item.ID;
            $scope.DeleteDrugStimulationID = Item.StimulationID;
            $scope.DeleteDrugDates = Item.DrugNextDates;
            //console.log('call database')
        } else {
            $scope.DeleteDrugDates = Item.DrugNextDates;
           // console.log('Only remove drug item from list')
        }
    }

    $scope.ClearDelete = function () {
        $scope.DeleteDrugReason = "";
    }

    $scope.DeleteDrug = function () {
        debugger;
        if (angular.isUndefined($scope.DeleteDrugReason) || $scope.DeleteDrugReason=="") {
            AlertMessage.warning("PalashIVF", "Please enter reason for delete drug");
        } else {
            if (!angular.isUndefined($scope.DeleteDrugID) && !angular.isUndefined($scope.DeleteDrugStimulationID)) {
                //Admin name clear
                angular.forEach($scope.DeleteDrugDates, function (item2) {
                    var IsValid = false;
                    var MatchOnce = false;
                    var multiCount = 0;
                    var count = 0;
                    angular.forEach($scope.SimulationChart.AddDrugList, function (item) {
                        angular.forEach(item.DrugNextDates, function (item1) {
                            var firstDate = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var secondDate = $filter('date')(item1.NextDate, 'dd-MMM-yyyy');
                            if (firstDate == secondDate && !angular.isUndefined(item1.DateWiseDose)) {
                                count = count + 1;
                                if ($scope.SimulationChart.AddDrugList.length > 1) {
                                    MatchOnce = true;
                                    if (count > 2) {
                                        IsValid = true;
                                    }
                                } else {
                                    IsValid = true;
                                }
                            }

                            if (firstDate == secondDate) {
                                multiCount = multiCount + 1;
                            }
                        });
                    });
                    debugger
                    if ($scope.SimulationChart.AddDrugList.length > 0) { //&& MatchOnce && multiCount == 1
                        angular.forEach($scope.SimulationChart.DoctorNameList, function (item3, idx) {
                            var first = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var second = $filter('date')(item3.date, 'dd-MMM-yyyy');
                            if (first == second) {
                                //consultant physician clear
                                $scope.SimulationChart.LatestDoctors[idx].Name = undefined;
                                //drug admin clear
                                $scope.SimulationChart.DoctorNameList[idx].IsChecked = false;
                                $scope.SimulationChart.DoctorNameList[idx].DoctorName = undefined;
                            }
                        });
                        debugger;
                        angular.forEach($scope.SimulationChart.LatestDoctors, function (item3, idx) {
                            var first = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var second = $filter('date')(item3.date, 'dd-MMM-yyyy');
                            if (first == second) {
                                //consultant physician clear
                                $scope.SimulationChart.LatestDoctors[idx].Name = undefined;
                            }
                        });
                    } else if (IsValid) {
                        angular.forEach($scope.SimulationChart.DoctorNameList, function (item3, idx) {
                            var first = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var second = $filter('date')(item3.date, 'dd-MMM-yyyy');
                            if (first == second) {
                                //consultant physician clear
                                $scope.SimulationChart.LatestDoctors[idx].Name = undefined;
                                //drug admin clear
                                $scope.SimulationChart.DoctorNameList[idx].IsChecked = false;
                                $scope.SimulationChart.DoctorNameList[idx].DoctorName = undefined;
                            }
                        });
                        debugger;
                        angular.forEach($scope.SimulationChart.LatestDoctors, function (item3, idx) {
                            var first = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var second = $filter('date')(item3.date, 'dd-MMM-yyyy');
                            if (first == second) {
                                //consultant physician clear
                                $scope.SimulationChart.LatestDoctors[idx].Name = undefined;
                            }
                        });
                    }

                });

                $scope.SimulationChart.AddDrugList.splice($scope.DrugDeleteIdx, 1);
                $scope.fetchDrugCounts($scope.SimulationChart.AddDrugList);
                //call here database service
                //$scope.DeleteDrugWithReason();

                $scope.DrugDeleteIdx = undefined;
                $('.modal').modal('hide');
               // console.log('call database')
            } else {
                //Admin name clear
                angular.forEach($scope.DeleteDrugDates, function (item2) {
                    var IsValid = false;
                    var MatchOnce = false;
                    var multiCount = 0;
                    var count = 0;
                    angular.forEach($scope.SimulationChart.AddDrugList, function (item) {
                        angular.forEach(item.DrugNextDates, function (item1) {
                            var firstDate = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var secondDate = $filter('date')(item1.NextDate, 'dd-MMM-yyyy');
                            if (firstDate == secondDate && !angular.isUndefined(item1.DateWiseDose)) {
                                count = count + 1;
                                if ($scope.SimulationChart.AddDrugList.length > 1) {
                                    MatchOnce = true;
                                    if (count > 2) {
                                        IsValid = true;
                                    }
                                } else {
                                    IsValid = true;
                                }
                            }

                            if (firstDate == secondDate) {
                                multiCount = multiCount + 1;
                            }
                        });
                    });
                    debugger;
                    if ($scope.SimulationChart.AddDrugList.length > 0) { //&& MatchOnce && multiCount == 1
                        angular.forEach($scope.SimulationChart.DoctorNameList, function (item3, idx) {
                            var first = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var second = $filter('date')(item3.date, 'dd-MMM-yyyy');
                            if (first == second) {
                                //consultant physician clear
                                $scope.SimulationChart.LatestDoctors[idx].Name = undefined;
                                //drug admin clear
                                $scope.SimulationChart.DoctorNameList[idx].IsChecked = false;
                                $scope.SimulationChart.DoctorNameList[idx].DoctorName = undefined;
                            }
                        });
                        debugger;
                        angular.forEach($scope.SimulationChart.LatestDoctors, function (item3, idx) {
                            var first = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var second = $filter('date')(item3.date, 'dd-MMM-yyyy');
                            if (first == second) {
                                //consultant physician clear
                                $scope.SimulationChart.LatestDoctors[idx].Name = undefined;
                            }
                        });
                    } else if (IsValid) {
                        debugger;
                        angular.forEach($scope.SimulationChart.DoctorNameList, function (item3, idx) {
                            var first = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var second = $filter('date')(item3.date, 'dd-MMM-yyyy');
                            if (first == second) {
                                //consultant physician clear
                                $scope.SimulationChart.LatestDoctors[idx].Name = undefined;
                                //drug admin clear
                                $scope.SimulationChart.DoctorNameList[idx].IsChecked = false;
                                $scope.SimulationChart.DoctorNameList[idx].DoctorName = undefined;
                            }
                        });

                        angular.forEach($scope.SimulationChart.LatestDoctors, function (item3, idx) {
                            var first = $filter('date')(item2.NextDate, 'dd-MMM-yyyy');
                            var second = $filter('date')(item3.date, 'dd-MMM-yyyy');
                            if (first == second) {
                                //consultant physician clear
                                $scope.SimulationChart.LatestDoctors[idx].Name = undefined;
                            }
                        });
                    }

                });

                $scope.SimulationChart.AddDrugList.splice($scope.DrugDeleteIdx, 1);
                $scope.fetchDrugCounts($scope.SimulationChart.AddDrugList);
                $scope.DrugDeleteIdx = undefined;
                $('.modal').modal('hide');
            }
        }
    }

    $scope.DeleteDrugWithReason = function DeleteDrugWithReason() {

        var ResponseData = StimulationChartService.DeleteDrugWithReason($scope.DeleteDrugID, $scope.DeleteDrugStimulationID, $scope.DeleteDrugReason);
        ResponseData.then(function (Response) {
            $scope.DeleteDrugResponse = Response.data;
        }, function (error) {
            $scope.Error = error;
        })
    }

    $scope.DrugAdmin = function (Index, date, Inhouse, Outside) {
        $scope.DrugAdminSetInd = Index;
        $scope.DrugAdminSetDate = date;
        if (Inhouse == true) {
            $scope.InhouseOrOutside = 'Inhouse';
        }
        else {
            $scope.InhouseOrOutside = 'Outside';
        }
    }

    $scope.SetDoctorName = function (InhouseOrOutside) {
        debugger;
        //check stimulation is inhouse or outside
        if (InhouseOrOutside == "Inhouse") {
            //if inhouse
            //set doctor name to associated date
            $scope.IsValidToSetAdmin = false;
            for (var col = 0; col < $scope.SimulationChart.AddDrugList.length; col++) {
                for (var row = 0; row < $scope.SimulationChart.AddDrugList[col].DrugNextDates.length; row++) {
                    var DrugSetDate = $filter('date')($scope.DrugAdminSetDate, 'dd-MMM-yyyy');
                    var DrugGetDate = $filter('date')($scope.SimulationChart.AddDrugList[col].DrugNextDates[row].NextDate, 'dd-MMM-yyyy');
                    if (DrugSetDate == DrugGetDate) {
                        for (var idx = 0; idx < $scope.SimulationChart.DoctorNameList.length; idx++) {
                            var secondDate = $filter('date')($scope.SimulationChart.DoctorNameList[idx].date, 'dd-MMM-yyyy');
                            if (DrugSetDate == secondDate) {
                                $scope.SimulationChart.DoctorNameList[idx].DrugAdminID = $scope.SimulationChart.AddDrugList[col].DrugID;
                                $scope.SimulationChart.DoctorNameList[idx].Inhouse = true;
                                $scope.SimulationChart.DoctorNameList[idx].Outside = false;
                                $scope.SimulationChart.DoctorNameList[idx].DoctorName = $scope.LoginInfo;
                                $scope.SimulationChart.DoctorNameList[idx].IsChecked = true;
                                $scope.IsValidToSetAdmin = true;
                            }
                        }
                    } else {
                        //date not matching
                    }
                }
                //if (!$scope.IsValidToSetAdmin) {
                //    for (var i = 0; i < $scope.SimulationChart.DoctorNameList.length; i++) {
                //        if (i == $scope.DrugAdminSetInd) {
                //            $scope.SimulationChart.DoctorNameList[i].IsChecked = false;
                //        }
                //    }
                //    //AlertMessage.warning(objResource.msgTitle, "Drug is not present in this date");
                //}
            }

            //Give proper message is drug not present
            if (!$scope.IsValidToSetAdmin) {
                //for (var i = 0; i < $scope.SimulationChart.DoctorNameList.length; i++) {
                //    if (i == $scope.DrugAdminSetInd) {
                //        $scope.SimulationChart.DoctorNameList[i].IsChecked = false;
                //    }
                //}
                $scope.SimulationChart.DoctorNameList[$scope.DrugAdminSetInd].IsChecked = false;
                AlertMessage.warning(objResource.msgTitle, "Drug is not present in this date");
            }

            // Close the model popup
            $('.modal').modal('hide');
        } else {
            //else
            //set doctor name undefined
            for (var i = 0; i < $scope.SimulationChart.DoctorNameList.length; i++) {
                if (i == $scope.DrugAdminSetInd) {
                    $scope.SimulationChart.DoctorNameList[i].DrugAdminID = 0;
                    $scope.SimulationChart.DoctorNameList[i].Inhouse = false;
                    $scope.SimulationChart.DoctorNameList[i].Outside = true;
                    $scope.SimulationChart.DoctorNameList[i].DoctorName = undefined;
                    $scope.SimulationChart.DoctorNameList[i].IsChecked = true;
                }
            }
            // Close the model popup
            $('.modal').modal('hide');
        }
    }
    $scope.DrugAdministrationCancel = function () {
        if ($scope.DrugAdminSetInd != undefined && $scope.DrugAdminSetInd != null) {
            $scope.SimulationChart.DoctorNameList[$scope.DrugAdminSetInd].IsChecked = false;
        }
        // Close the model popup
        $('.modal').modal('hide');
    }

    $scope.SetDateFormatBeforeSaveOrUpdate = function () {
        debugger;
        if (!angular.isUndefined($scope.SimulationChart.OPUDate)) {
            $scope.SimulationChart.OPUDate = $filter('date')($scope.SimulationChart.OPUDate, 'medium');
        }

        //Follicular Scan check list
        if (!angular.isUndefined($scope.SimulationChart.FolliScanDaysCheckList)) {
            angular.forEach($scope.SimulationChart.FolliScanDaysCheckList, function (item) {
                item.Date = $filter('date')(item.Date, 'medium');
            });
        }

        //E2
        if (!angular.isUndefined($scope.SimulationChart.E2)) {
            angular.forEach($scope.SimulationChart.E2, function (item) {
                item.Date = $filter('date')(item.Date, 'medium');
            });
        }

        //Progesterone
        if (!angular.isUndefined($scope.SimulationChart.Progesterone)) {
            angular.forEach($scope.SimulationChart.Progesterone, function (item) {
                item.Date = $filter('date')(item.Date, 'medium');
            });
        }

        //FSH
        if (!angular.isUndefined($scope.SimulationChart.FSH)) {
            angular.forEach($scope.SimulationChart.FSH, function (item) {
                item.Date = $filter('date')(item.Date, 'medium');
            });
        }

        //LH
        if (!angular.isUndefined($scope.SimulationChart.LH)) {
            angular.forEach($scope.SimulationChart.LH, function (item) {
                item.Date = $filter('date')(item.Date, 'medium');
            });
        }

        //Remarks
        if (!angular.isUndefined($scope.SimulationChart.RemarksList)) {
            angular.forEach($scope.SimulationChart.RemarksList, function (item) {
                item.Date = $filter('date')(item.Date, 'medium');
            });
        }

        //Drug List
        if (!angular.isUndefined($scope.SimulationChart.AddDrugList)) {
            angular.forEach($scope.SimulationChart.AddDrugList, function (item) {
                angular.forEach(item.DrugNextDates, function (item1) {
                    item1.NextDate = $filter('date')(item1.NextDate, 'medium');
                });
            });
        }
        //Trigger
        if (!angular.isUndefined($scope.SimulationChart.TriggerDateDoseList)) {
            angular.forEach($scope.SimulationChart.TriggerDateDoseList, function (item) {
                item.TriggerDate = $filter('date')(item.TriggerDate, 'medium');
            });
        }
        //Consultant / Physician
        if (!angular.isUndefined($scope.SimulationChart.LatestDoctors)) {
            angular.forEach($scope.SimulationChart.LatestDoctors, function (item) {
                item.date = $filter('date')(item.date, 'medium');
            });
        }
        //Drug Administration
        if (!angular.isUndefined($scope.SimulationChart.DoctorNameList)) {
            angular.forEach($scope.SimulationChart.DoctorNameList, function (item) {
                item.date = $filter('date')(item.date, 'medium');
            });
        }
    }

    $scope.SaveUpdateStimulationChart = function SaveUpdateStimulationChart(StimulationChart) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        //var GoToSave = $scope.ValidateStimulationChart();
        //if (!GoToSave) {
        if (!$scope.ValidateStimulationChart()) {
            usSpinnerService.stop('GridSpinner');
           
        } else {
            $scope.SetDateFormatBeforeSaveOrUpdate();
            var ResponseData = StimulationChartService.SaveUpdateStimulationChart(StimulationChart);
            ResponseData.then(function (Response) {
                if (Response.data > 0 && Response.data == 1) {
                    $scope.PageInitialization();
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                }
                if (Response.data > 0 && Response.data == 2) {
                    $scope.PageInitialization();
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);    //msgUpdate 
                }
                usSpinnerService.stop('GridSpinner');
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                $scope.Error = error;
            });
        }
    }

    $scope.ValidateStimulationChart = function () {
        debugger;
        var CanWeProceed = true;
        //Assign artid and artsubid if undefined


        if ($scope.SimulationChart.IsCloseCycleOnCancellation && !$scope.SimulationChart.IsCycleCancellation) {
            AlertMessage.warning(objResource.msgTitle, "Please Cancel Cycle First ");
            return false;
        }

        if (!$scope.SimulationChart.IsCloseCycleOnCancellation && $scope.SimulationChart.IsCycleCancellation) {
            AlertMessage.warning(objResource.msgTitle, "Please close Cycle First ");
            return false;
        }   // added sujata



        //if ($scope.SimulationChart.IsCycleCancellation) {
        //    return true;
        //}
        if ($scope.SimulationChart.SCARTID == undefined || $scope.SimulationChart.SCARTID == 0) {
            $scope.SimulationChart.SCARTID = $rootScope.CoupleDetails.FemalePatient.ARTTypeID;
        }
        if ($scope.SimulationChart.SCARTSubID == undefined || $scope.SimulationChart.SCARTSubID == 0) {
            $scope.SimulationChart.SCARTSubID = $rootScope.CoupleDetails.FemalePatient.ArtSubTypeID;
        }

        if ($scope.SimulationChart.SCARTID == undefined || $scope.SimulationChart.SCARTID == 0) {
            CanWeProceed = false;
        }
        if ($scope.SimulationChart.SCARTSubID == undefined || $scope.SimulationChart.SCARTSubID == 0) {
            CanWeProceed = false;
        }
        /* As per Aarya suggestion i have remove parent mandatory and made IsFinalize base conditon */
        //if (angular.isUndefined($scope.SimulationChart.IsFinalize)) {


        if ($scope.SimulationChart.IsFinalize) {     
            if ($scope.SimulationChart.TriggerDateDoseList == undefined || $scope.SimulationChart.TriggerDateDoseList.length == 0) {
                CanWeProceed = false;
            }
            if ($scope.CheckTriggerMandotryCycle()) {
                debugger;
                CanWeProceed = true;
            }
  

        }
        if ($scope.SimulationChart.IsFinalize==true && $scope.SimulationChart.IsCloseCycleOnCancellation == true)
         {
                   $location.path('/ARTCycle/');
         }

        if (($scope.SimulationChart.IsCycleCancellation != undefined && $scope.SimulationChart.IsCycleCancellation) && ($scope.SimulationChart.Reason == undefined)) {
            CanWeProceed = false;
        }
        if (!CanWeProceed) {
            AlertMessage.warning(objResource.msgTitle, "Please fill all mandatory fields");
        }
        
             //}
        return CanWeProceed;

    }

    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }

    //Added By vikrant For Add Multiple Drug in one Go
    $scope.MultipleDrug = [
        {
            SCDrugID: 0,
            DrugDate: undefined,
            StimulationTime: undefined,
            SCDays: undefined,
            SCDose: undefined,
            DaysList: undefined
        }
    ];
    $scope.ExceedLimit = false;
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function ($event, item) {
        debugger;
        $event.preventDefault();
        $event.stopPropagation();
        if ($rootScope.ARTDateValidation){
            var a = $scope.today;
        var b = $scope.endDate;
        if (a > b) {
            $scope.dateOptions2 = {
                minDate: new Date().setYear(new Date().getYear() - 100),
                maxDate: new Date().setYear(new Date().getYear() - 10),
                showWeeks: false
            };
        } else {
            $scope.dateOptions2 = {
                minDate: $scope.today,
                maxDate: $scope.endDate,
                showWeeks: false
            };
        }
    }
    else{
             $scope.dateOptions2 = {
                     minDate: $scope.SimulationChart.SCLMP,
                     maxDate: $scope.endDate,
            showWeeks : false
            };
    }
        item.opened = true;
    };
    $scope.AddNewDrugs = function () {
        debugger;
        if ($scope.MultipleDrug != undefined && $scope.MultipleDrug != null) {
            if ($scope.SimulationChart.AddDrugList.length <= 2) {
                var total = 3;
                total = (total - $scope.SimulationChart.AddDrugList.length);
                total = (total - $scope.MultipleDrug.length);
                if (total > 0) {
                    $scope.DrugAdd = {};
                    $scope.DrugAdd.SCDrugID = 0;
                    $scope.DrugAdd.StimulationTime = undefined;
                    $scope.DrugAdd.SCDays = undefined;
                    $scope.DrugAdd.SCDose = undefined;
                    $scope.MultipleDrug.push($scope.DrugAdd);
                }
                else {
                    AlertMessage.error('PalashIVF', 'You can not add more than 3 drugs');
                }
            }
            else {
                AlertMessage.error('PalashIVF', 'You can not add more than 3 drugs');
            }
        }
    }
    $scope.AddDays = function (Item) {
        debugger;
        Item.DaysList = [];
        Item.DaysList.splice(0, 0, { ID: 0, Description: 'Select' });
        $scope.SimulationChart.SCDays = 0;
        $scope.daysDiffCount = $scope.dayDiff($scope.SimulationChart.SimulationCycleStartDate, Item.DrugDate);
        for (var Index = 1; Index <= 35 - $scope.daysDiffCount; Index++) {
            Item.DaysList.push({ ID: Index, Description: Index });
        }            
    }
    $scope.RemoveDrug = function (index) {
        debugger;
        if ($scope.MultipleDrug.length > 1) {
           // var index = $scope.MultipleDrug.indexOf(index);
            $scope.MultipleDrug.splice(index, 1);
        }
    }
    $scope.NewAddDrug = function () {

        debugger;
        //if ($scope.SimulationChart.VisitID == null && $scope.SimulationChart.VisitUnitID == null && $scope.SimulationChart.PatientID == null && $scope.SimulationChart.PatientUnitID == null) {
        //    $scope.SaveUpdateStimulationChart($scope.SimulationChart);
        //}   //added sujata for stimulation

        if ($scope.SimulationChart.AddDrugList.length == 10) {
            AlertMessage.warning(objResource.msgTitle, "You can not add more than 10 drugs");
            $scope.ExceedLimit = true;
        } else {
            $scope.chkDuplicate = false;
            if (checkTriggerDate()) {
                debugger;
                angular.forEach($scope.MultipleDrug, function (Item) {
                    debugger;
                    angular.forEach($scope.SimulationChart.AddDrugList, function (Mul) {
                        debugger;
                        if (Mul.DrugID == Item.SCDrugID) {
                            $scope.chkDuplicate = true;
                        }

                    });
                    if ($scope.chkDuplicate == false) {
                        debugger;
                        $scope.GetList = $filter('filter')($scope.MultipleDrug, function (d) { return d.SCDrugID == Item.SCDrugID; }).length;
                        if ($scope.GetList > 1) {
                            $scope.chkDuplicate = true;
                        }
                        debugger;
                    }
                });
                debugger;
                if (!$scope.chkDuplicate) {
                    debugger;
                    $scope.isvalid = false;
                    angular.forEach($scope.MultipleDrug, function (item) {
                        if (item.SCDrugID == 0 || item.SCDrugID == null) {
                            $scope.isvalid = true;
                            item.SCDrugIDInvalid = true;
                        }
                        if (item.StimulationTime == undefined || item.StimulationTime == null) {
                            $scope.isvalid = true;
                            item.TimeInvalid = true;
                        }
                        if (item.DrugDate == undefined || item.DrugDate == null) {
                            $scope.isvalid = true;
                            item.DateInvalid = true;
                        }
                        if (item.SCDays == 0 || item.SCDays == null) {
                            $scope.isvalid = true;
                            item.DaysInvalid = true;
                        }
                        if (item.SCDose == undefined || item.SCDose == null) {
                            $scope.isvalid = true;
                            item.DoseInvalid = true;
                        }
                    });

                    if (!$scope.isvalid) {
                        debugger;
                        angular.forEach($scope.MultipleDrug, function (Mul) {
                            $scope.gradeC = $filter('filter')($scope.SCDrugList, { ID: Mul.SCDrugID }, true);
                            $scope.AllDrugDates = [];
                            angular.forEach($scope.SimulationChart.AddDrugList, function (item) {
                                angular.forEach(item.DrugNextDates, function (item1) {
                                    $scope.AllDrugDates.push(new Date(item1.NextDate));
                                });
                            });
                            $scope.DrugGreaterDate = Math.max.apply(null, $scope.AllDrugDates);
                            var stimulationDate = new Date($scope.DrugGreaterDate);

                            var triggerDate;
                            if (!angular.isUndefined($scope.SimulationChart.TriggerDateDoseList) && $scope.SimulationChart.TriggerDateDoseList.length != 0) {
                                triggerDate = new Date($scope.SimulationChart.TriggerDateDoseList[0].TriggerDate);
                            }
                            //var first = new Date($filter('date')(stimulationDate, 'dd-MMM-yyyy'));
                            var first = new Date($filter('date')(Mul.DrugDate, 'dd-MMM-yyyy'));
                            var second = new Date($filter('date')(triggerDate, 'dd-MMM-yyyy'));

                            $scope.mydate = new Date(Mul.DrugDate);
                            var numberOfDaysToAdd = Mul.SCDays;
                            if (numberOfDaysToAdd <= 1) {
                                $scope.third = $scope.mydate;
                            } else {
                                $scope.third = $scope.mydate.setDate($scope.mydate.getDate() + numberOfDaysToAdd);
                            }
                            var third = new Date($filter('date')($scope.third, 'dd-MMM-yyyy'));

                            //if trigger date present and drug not here then added drug date is greater than drug date do not allow to add drug
                            if (triggerDate == undefined || first == 'Invalid Date' || (second >= first)) {   //(first < second && third < second)
                                // Insert
                                //console.log('You can insert drug');
                                debugger;
                                $scope.SimulationChart.AddDrugList.push({
                                    DrugID: Mul.SCDrugID,
                                    DrugName: $scope.gradeC[0].Description,
                                    DrugDate: Mul.DrugDate,
                                    DrugNextDates: $scope.NewNextDrugDays(Mul),
                                    DrugTime: Mul.StimulationTime,
                                    DrugDays: Mul.SCDays,
                                    DrugDose: Mul.SCDose
                                });
                                //Calculate Total drug count
                                $scope.fetchDrugCounts($scope.SimulationChart.AddDrugList);
                                //clear the popup selected values/set values
                                $scope.MultipleDrug = [
                                                        {
                                                            SCDrugID: 0,
                                                            DrugDate: undefined,
                                                            StimulationTime: undefined,
                                                            SCDays: undefined,
                                                            SCDose: undefined,
                                                            DaysList: undefined
                                                        }
                                ];
                                $('.modal').modal('hide');
                                //$scope.ClearPopupValuesWithClose();
                            } else {
                                //In that date trigger is already present, hence you can not add drug on this date
                                AlertMessage.warning(objResource.msgTitle, "Trigger is already present, hence you can not add drug on this date");
                            }
                        });

                        if ($scope.SimulationChart.VisitID == null && $scope.SimulationChart.VisitUnitID == null && $scope.SimulationChart.PatientID == null && $scope.SimulationChart.PatientUnitID == null) {
                            $scope.SaveUpdateStimulationChart($scope.SimulationChart);
                        }   //added sujata for stimulation
                    }
                    else {
                        AlertMessage.error(objResource.msgTitle, "Please Fill Mandatory value");
                    }
                }

                else {
                    debugger;
                    //isuue 6137 	Stumilation Chart-Showing validation even when same drugs are not present.
                    $scope.isvalid = false;
                    angular.forEach($scope.MultipleDrug, function (item) {
                        if (item.SCDrugID == 0 || item.SCDrugID == null) {
                            $scope.isvalid = true;
                            item.SCDrugIDInvalid = true;
                        }
                        if (item.StimulationTime == undefined || item.StimulationTime == null) {
                            $scope.isvalid = true;
                            item.TimeInvalid = true;
                        }
                        if (item.DrugDate == undefined || item.DrugDate == null) {
                            $scope.isvalid = true;
                            item.DateInvalid = true;
                        }
                        if (item.SCDays == 0 || item.SCDays == null) {
                            $scope.isvalid = true;
                            item.DaysInvalid = true;
                        }
                        if (item.SCDose == undefined || item.SCDose == null) {
                            $scope.isvalid = true;
                            item.DoseInvalid = true;
                        }
                    });
                    if ($scope.isvalid) {
                        AlertMessage.error(objResource.msgTitle, "Please Fill Mandatory value");
                    }
                    else {
                        debugger;
                        //1-8-2018 
                        //console.log("q ", $scope.MultipleDrug);
                        // console.log("qq ", $scope.SimulationChart.AddDrugList);
                        angular.forEach($scope.MultipleDrug, function (item, idx) {
                            angular.forEach($scope.SimulationChart.AddDrugList, function (item1, idx1) {
                                if (item1.DrugID == item.SCDrugID) {
                                    //  console.log('item ', item)
                                    //  console.log('item1 ', item1)

                                    var duplicateNextDayArray = [];
                                    for (var kk = 0; kk < item.SCDays; kk++) {
                                        var obj = {};
                                        obj.DateWiseDose = item.SCDose;
                                        obj.LoggedUserName = $scope.LoginInfo;
                                        obj.NextDate = new Date(item.DrugDate)
                                        obj.NextDate = new Date(obj.NextDate.setDate(obj.NextDate.getDate() + kk));
                                        duplicateNextDayArray.push(obj);

                                    }
                                    var item1NextDayLen = item1.DrugNextDates.length;
                                    for (var jj = 0; jj < duplicateNextDayArray.length; jj++) {
                                        var isnotpresent = true;
                                        var indexduplicate = 0;
                                        for (var ii = 0; ii < item1NextDayLen ; ii++) {
                                            //indexduplicate = ii;
                                           // console.log(duplicateNextDayArray[jj].NextDate, +item1.DrugNextDates[ii].NextDate)
                                            if (+new Date(duplicateNextDayArray[jj].NextDate) == +new Date(item1.DrugNextDates[ii].NextDate)) {
                                               // console.log('here');
                                                item1.DrugNextDates[ii].DateWiseDose = "";
                                                item1.DrugNextDates[ii].DateWiseDose = duplicateNextDayArray[jj].DateWiseDose;
                                                isnotpresent = false;
                                                break;

                                            }
                                        }
                                        if (isnotpresent) {
                                            debugger;
                                            //  console.log(item1.DrugNextDates, " ", item1.DrugNextDates.length," du ",indexduplicate);
                                            //   item1.DrugNextDates[item1.DrugNextDates.length + 1] = {};
                                            //  console.log("Obj ", duplicateNextDayArray[jj]);
                                            item1.DrugNextDates[item1.DrugNextDates.length] = duplicateNextDayArray[jj];

                                            //item1.DrugNextDates[item1.DrugNextDates.length + 1].NextDate = duplicateNextDayArray[indexduplicate].NextDate;
                                            //item1.DrugNextDates[item1.DrugNextDates.length + 1].DateWiseDose = duplicateNextDayArray[indexduplicate].DateWiseDose;
                                            //item1.DrugNextDates[item1.DrugNextDates.length + 1].LoggedUserName = duplicateNextDayArray[indexduplicate].LoggedUserName;

                                        }
                                    }

                                    //   console.log("duplicateNextDayArray ", duplicateNextDayArray)
                                }

                            });

                        });
                        //  console.log("q ", $scope.MultipleDrug);
                        // console.log("qq ", $scope.SimulationChart.AddDrugList);
                        if ($scope.MultipleDrug.length > 1) {
                            debugger;
                            $scope.MultipleDrug.splice(0, 1);
                          //  console.log($scope.MultipleDrug)
                            $scope.NewAddDrug();
                        }
                        else {
                            debugger;
                            $scope.MultipleDrug = [
                                                      {
                                                          SCDrugID: 0,
                                                          DrugDate: undefined,
                                                          StimulationTime: undefined,
                                                          SCDays: undefined,
                                                          SCDose: undefined,
                                                          DaysList: undefined
                                                      }
                            ];
                            $('.modal').modal('hide');
                        }

                        //AlertMessage.error(objResource.msgTitle, "Drug already present in system");

                    }

                }
                debugger;
            }
        }
    }
    checkTriggerDate = function () {
        if ($scope.SimulationChart.TriggerDateDoseList.length <= 0) {
            return true;
        }
        else {
            debugger;
           // console.log("else", $scope.SimulationChart.TriggerDateDoseList);
            //console.log("aa ", $scope.MultipleDrug);
            var triggerDate = new Date($scope.SimulationChart.TriggerDateDoseList[0].TriggerDate);
            var mulDate = null;
            angular.forEach($scope.MultipleDrug, function (item, index) {
                if (index == 0) {
                    mulDate = new Date(item.DrugDate);
                    mulDate.setDate(mulDate.getDate() + item.SCDays - 1);

                }
                else {
                    var tempDate = new Date(item.DrugDate);
                    tempDate.setDate(tempDate.getDate() + item.SCDays - 1);
                    if (tempDate > mulDate) {
                        mulDate = tempDate;
                    }
                }
            });
           // console.log(triggerDate)
          //  console.log(mulDate)
          //  console.log("else", $scope.SimulationChart.TriggerDateDoseList);
          //  console.log("aa ", $scope.MultipleDrug);
            if (triggerDate < mulDate) {
                AlertMessage.warning("PalashIVF", "Trigger Date Should be Grater Then Stimulation Drug Date");
                return false;
            }
            else {
                return true;
            }
        }
    }
    $scope.ClearDrugList = function (from) {
        debugger;
        if (from == 1) {  //add drug
            debugger;
            $scope.MultipleDrug = [
                                                     {
                                                         SCDrugID: 0,
                                                         DrugDate: undefined,
                                                         StimulationTime: undefined,
                                                         SCDays: undefined,
                                                         SCDose: undefined,
                                                         DaysList: undefined
                                                     }
            ];
        }
    }
    $scope.NewNextDrugDays = function (Mul) {
        debugger;
        $scope.currentDate = Mul.DrugDate;
        $scope.startDate = Mul.DrugDate; // Current moment
        $scope.DaysEndDate = new Date(Mul.DrugDate.getTime() + (parseInt(Mul.SCDays) - 1) * 24 * 60 * 60 * 1000); // Current moment + 15 days
        var i = 0;
        $scope.iDate = new Date($scope.currentDate); // Date object to be used as iterator
        $scope.NextDrugDates = new Array();
        $scope.NextDrugDates.push({ NextDate: new Date($scope.iDate.setDate($scope.iDate.getDate() - 0)), DateWiseDose: Mul.SCDose, LoggedUserName: $scope.LoginInfo });
        //delete if date present then
        angular.forEach($scope.SimulationChart.LatestDoctors, function (item, index) {
            var docComp = $filter('date')($scope.NextDrugDates[i].NextDate, 'dd-MMM-yyyy');
            var docDate = $filter('date')(item.date, 'dd-MMM-yyyy');
            if (docDate == docComp) {
                $scope.SimulationChart.LatestDoctors.splice(index, 1);
            }
        });
        $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.NextDrugDates[i].NextDate), Name: $scope.LoginInfo });
        while ($scope.iDate < $scope.DaysEndDate) {
            i++;
            $scope.NextDrugDates.push({ NextDate: new Date($scope.iDate.setDate($scope.iDate.getDate() + 1)), DateWiseDose: Mul.SCDose, LoggedUserName: $scope.LoginInfo }); // Switch to next d
            //delete if date present then
            angular.forEach($scope.SimulationChart.LatestDoctors, function (item, index) {
                var docComp = $filter('date')($scope.NextDrugDates[i].NextDate, 'dd-MMM-yyyy');
                var docDate = $filter('date')(item.date, 'dd-MMM-yyyy');
                if (docDate == docComp) {
                    $scope.SimulationChart.LatestDoctors.splice(index, 1);
                }
            });
            $scope.SimulationChart.LatestDoctors.push({ date: new Date($scope.NextDrugDates[i].NextDate), Name: $scope.LoginInfo });
        }
        return $scope.NextDrugDates;
    }
    $scope.CheckDuplicatDrug = function (Item) {
        debugger;
        $scope.keepGoing = false;
        angular.forEach($scope.SimulationChart.AddDrugList, function (Mul) {
            if (Mul.SCDrugID == Item.SCDrugID) {
                $scope.keepGoing = true;
            }
        });
        if ($scope.keepGoing == false) {
            debugger;
            $scope.GetList = $filter('filter')($scope.MultipleDrug, function (d) { return d.SCDrugID == Item.SCDrugID; }).length;
            if ($scope.GetList > 1) {
                $scope.keepGoing = true;
            }
        }
        if ($scope.keepGoing == true) {
            AlertMessage.error(objResource.msgTitle, "Drug already present in system");
        }
    }

    $scope.GetRiPsv=function GetRiPsv(date,item)
    {   
        if (parseInt(item.Code) > 15)
        {
            StimulationChartService.GetRIPSV(new Date(date), item.Code).then(function (result) {
                var s = "";
                angular.forEach(result.data, function (item) {
                   
                    s += '<tr><td>' + item.LeftDimensionLength + '</td><td>' + item.LeftRI + '</td><td>' + item.LeftPSV + '</td><td>' + item.RightDimensionBreadth + '</td><td>' + item.RightRI + '</td><td>' + item.RightPSV + '</td></tr>'


                })

                if (result.data.length) {

                    //$scope.html = '<div class="tbl_tooltip">'+ s +'</div>';
                    $scope.html = '<table class="table-bordered"><tbody><th>Left Follicle Size</th><th>Left RI</th><th>Left PSV</th><th>Right Follicle Size</th><th>Right RI</th><th>Right PSV</th>' + s + '</tbody></table>';
                    $scope.htmlPopover1 = $sce.trustAsHtml($scope.html);
                }
                else {
                    $scope.htmlPopover1 = $sce.trustAsHtml();
                }

                //  $scope.htmlPopover = "tooltip"



            }, function (responce) {
               // console.log(err);
            })
        }
        
      

    }

});  


angular.module('PIVF').filter('toSec', function ($filter) {
    return function (input) {
        var result = new Date(input).getTime();
        return result || '';
    };
});

angular.module('PIVF').directive('validDecimalNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean = negativeCheck[0] + '-' + negativeCheck[1];
                    if (negativeCheck[0].length > 0) {
                        clean = negativeCheck[0];
                    }

                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[0] = decimalCheck[0];
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0].slice(0, 4) + '.' + decimalCheck[1];
                }

                if (!angular.isUndefined(decimalCheck[0]) && angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[0] = decimalCheck[0].slice(0, 4);
                    clean = decimalCheck[0];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

angular.module('PIVF').directive('allowDecimalNumbersWithPrecisionAndScaleRestricted', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                debugger;
                var $input = $(this);
                var value = $input.val();
                var array = value.split('.');
                //console.log(array);
                value = value.replace(/[^0-9\.]/g, '')
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }

                // Dont allow more than 1 digit precision and more than 3 digit scale
                if (containsDot != null) {
                    //console.log(‘If block with dot precision’, array[0].length);
                    //console.log(‘If block with dot scale’, array[1].length);
                    if ([8, 13, 27, 25, 36, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows 
                        return true;
                    } else {
                        if (array[0].length > 5 || array[1].length > 1) {
                            event.preventDefault();
                            return false;
                        }
                    }
                } else {
                    //console.log(‘If block without dot’, array[0].length);
                    if ([8, 13, 27, 35, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows 
                        return true;
                    } else {
                        //console.log(‘First array length’, array[0].length);
                        if (!angular.isUndefined(array[0]) && array[0].length > 4) {
                            event.preventDefault();
                            return false;
                        }
                    }
                }

                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    // numbers 
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows 
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers 
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number 
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot 
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});