angular.module('PIVF').controller('day0Ctrl', function ($scope, RootPGInfo, $rootScope, $uibModalInstance, DayZeroSrv, Common, EmbrologyMainSrv, $timeout, $filter, AlertMessage, PageConfig, localStorageService) {

    //Declare To the Local Variable
    $scope.OocyteGrid = {};
    $scope.CoupleDetails = {};
    $scope.SemenDetailsList = [];
    $scope.Day0 = {};
    //Assign To Couple Information And Oocyte details
    $scope.OocyteGrid = RootPGInfo.OocyteGrid;
    $scope.CoupleDetails = RootPGInfo.CoupleDetails;
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.ApplyToDisable = true;
    $rootScope.disableClickDay0 = false; //Added by Nayan Kamble on 11/06/2019
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };
    $scope.popup3 = {
        opened: false
    };
    $scope.open4 = function () {
        $scope.popup4.opened = true;
    };
    $scope.popup4 = {
        opened: false
    };
    $scope.open5 = function () {
        $scope.popup5.opened = true;
    };
    $scope.popup5 = {
        opened: false
    };
    debugger;
    $scope.TypeCaseList = [
        {
            ID: 0,
            Description: 'Select'
        },
        {
            ID: 1,
            Description: 'IVF'
        },
        {
            ID: 2,
            Description: 'Denudation'
        }
    ];
    if ($rootScope.CoupleDetails.FemalePatient.ArtSubTypeID == 4) {
        $scope.TypeCaseList = [
       {
           ID: 0,
           Description: 'Select'
       },
       {
           ID: 1,
           Description: 'IVF'
       }
        ];

    } else if ($rootScope.CoupleDetails.FemalePatient.ArtSubTypeID == 10 || $rootScope.CoupleDetails.FemalePatient.ArtSubTypeID == 8 || $rootScope.CoupleDetails.FemalePatient.ArtSubTypeID == 5) {
        $scope.TypeCaseList = [
             {
                 ID: 0,
                 Description: 'Select'
             },
            {
                ID: 2,
                Description: 'Denudation'
            }
        ];
    }

    // for sorting by rohini 
    $scope.SortColumn1 = "SelectedDate";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    $scope.IsDisableNew = false;
    $scope.IsNewClick = false;
    //Datepicker Set Date To Opu Start date
    if (RootPGInfo.OPUStartDate != undefined && RootPGInfo.OPUStartDate != null) {
        $scope.SetOPUStartDate = RootPGInfo.OPUStartDate;
    }
    else {
        $scope.SetOPUStartDate = new Date().setYear(new Date().getYear() - 100)
    }
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: $scope.SetOPUStartDate,//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.Day0List = [];
    $scope.SelectedOocytes = [];
    $scope.SelectedOocytesAtEdit = {};
    $scope.UserName = "";
    $scope.Count = {};
    $scope.IsValidOocyte = false;
    /*END : Date*/
    $scope.ismeridian = true;
    //========================================================================================================================================================================
    $scope.NewPageSetup = function () {
        debugger;
        var UserInfo = localStorageService.get("UserInfo");
        $scope.UserName = UserInfo.UserName;
        if ($scope.CoupleDetails.FemalePatient != undefined && $scope.CoupleDetails.FemalePatient != null) {
            if ($scope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                $scope.DisableSave = true;
                $scope.IsDisableNew = true;
            }
            if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
                $scope.DisableSave = true;
                $scope.IsDisableNew = true;
            }
        }

        $scope.FillDropDowns();
        $scope.GetEmbryologyDoctorsList();
        $scope.GetOocytesForDay0();

        $timeout(function () {

            $scope.GetSemenDetails();
        }, 1000);
        $timeout(function () {
            $scope.GetOocyteGridForDayDay0();
        }, 1300);



    }
    $scope.GetEmbryologyDoctorsList = function () {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //   
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data.EmbryologistAndrologist;
            if ($scope.Day0.Witness == undefined)
            {
                $scope.Day0.Witness = 0;
                $scope.Day0.Embryologist = 0;
            }
                
        }, function (error) {
        });
    };
    $scope.FillDropDowns = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_IVF_Incubator', 'IVFIncubatorID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IncubatorList = Response.data;
            if ($scope.Day0.Incubator == undefined)
                $scope.Day0.Incubator = 0;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_SourceofSperm', 'SourceSpermID', 'SourceSpermDescription');
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SourceofSpermList = Response.data;
            debugger;
            $scope.SourceofSpermList = $scope.SourceofSpermList.slice(0, -1);     //Commented by Nayan Kamble  for Day 0
            $scope.TempSourceofSpermList = angular.copy($scope.SourceofSpermList);
            /*if ($scope.SourceOfSpermID == 1) {
                $scope.SourceofSpermList = $scope.SourceofSpermList[1];
                $scope.Day0.Semen = 1;
            }
            else if ($scope.SourceOfSpermID == 2) {
              
                $scope.SourceofSpermList = $scope.SourceofSpermList[2] ;
                $scope.Day0.Semen = 2;
            }*/
            if ($scope.Day0.Semen == undefined)
                $scope.Day0.Semen = 0;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_IVF_PlanMaster', 'IVFPlanID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFPlanList = Response.data;
            $scope.CopyData = angular.copy($scope.IVFPlanList);
            //Get The Page Visibility Config Data By Vikrant 
            $scope.configData = PageConfig.getObj();
            for (var i = $scope.CopyData.length - 1; i >= 0; i--) {
                debugger;
                if ($scope.IVFPlanList[i] != undefined) {
                    if ($scope.IVFPlanList[i].ID ==1 ) {//"Cryo"
                        if (!$scope.configData.Day0Cryo) {
                            $scope.IVFPlanList.splice(i, 1);
                        }
                    }
                }
                if ($scope.IVFPlanList[i] != undefined) {
                    if ($scope.IVFPlanList[i].ID ==2 ) { //"Discard"
                        if (!$scope.configData.Day0Discard) {
                            $scope.IVFPlanList.splice(i, 1);
                        }
                    }
                }
                if ($scope.IVFPlanList[i] != undefined) {
                    if ($scope.IVFPlanList[i].ID == 3) {  //IVF
                        if (!$scope.configData.Day0IVF) {
                            $scope.IVFPlanList.splice(i, 1);
                        }
                    }
                }
                if ($scope.IVFPlanList[i] != undefined) {
                    if ($scope.IVFPlanList[i].ID == 4) {//"ICSI"
                        if (!$scope.configData.Day0ICSI) {
                            $scope.IVFPlanList.splice(i, 1);
                        }
                    }
                }
                if ($scope.IVFPlanList[i] != undefined) {
                    if ($scope.IVFPlanList[i].ID == 5) {//"IMSI"
                        if (!$scope.configData.Day0IMSI) {
                            $scope.IVFPlanList.splice(i, 1);
                        }
                    }
                }
                if ($scope.IVFPlanList[i] != undefined) {
                    if ($scope.IVFPlanList[i].ID == 6) { //"Donate"
                        if (!$scope.configData.Day0Donate) {
                            $scope.IVFPlanList.splice(i, 1);
                        }
                    }
                }
                if ($scope.IVFPlanList[i] != undefined) {
                    if ($scope.IVFPlanList[i].ID == 7) { //Cryo Donate 
                        if (!$scope.configData.Day0DonateCryo) {
                            $scope.IVFPlanList.splice(i, 1);
                        }
                    }
                }
            }

            if ($scope.Day0.Plan == undefined)
                $scope.Day0.Plan = 0;
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_OocyteMaturity', 'OocyteMaturityID', 'OocyteMaturityDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.OocyteMaturityList = Response.data;
            if ($scope.Day0.Maturity == undefined)
                $scope.Day0.Maturity = 0;
            if ($scope.Day0.IVMMaturity == undefined)
                $scope.Day0.IVMMaturity = 0;
            if ($scope.Day0.IVMPreMaturity == undefined)
                $scope.Day0.IVMPreMaturity = 0;
            debugger;
        }, function (error) {
            $scope.Error = error;
        });

        var ResponseData = Common.getMasterList('M_IVF_Breakage', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFBreakageList = Response.data;
            if ($scope.Day0.Breakage == undefined)
                $scope.Day0.Breakage = 0;

        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_IVF_Cytoplasm', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFCytoplasmList = Response.data;
            if ($scope.Day0.Cytoplasm == undefined)
                $scope.Day0.Cytoplasm = 0;

        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_IVF_PVS', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFPVSList = Response.data;
            if ($scope.Day0.PVS == undefined)
                $scope.Day0.PVS = 0;

        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_IVF_PolarBody', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFPolarBodyList = Response.data;
            if ($scope.Day0.PB == undefined)
                $scope.Day0.PB = 0;

        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_IVF_ZonaPellucida', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFZonaPellucidaList = Response.data;
            if ($scope.Day0.ZP == undefined)
                $scope.Day0.ZP = 0;

        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_IVF_OCD', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFOCDList = Response.data;
            if ($scope.Day0.OCD == undefined)
                $scope.Day0.OCD = 0;

        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_IVF_ECD', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFECDList = Response.data;
            if ($scope.Day0.ECD == undefined)
                $scope.Day0.ECD = 0;

        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_IVF_OCC', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IVFOCCList = Response.data;
            if ($scope.Day0.OCC == undefined)
                $scope.Day0.OCC = 0;

        }, function (error) {
            $scope.Error = error;
        });
        //Added by Vikrant Add New DropDown Apollo Requirment
        var ResponseData = Common.getMasterList('M_SpermMorphology', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SpermMorphologyList = Response.data;
            if ($scope.Day0.SpermMorphology == undefined)
                $scope.Day0.SpermMorphology = 0;

        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_PBLocation', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.PBLocationList = Response.data;
            if ($scope.Day0.PBLocation == undefined)
                $scope.Day0.PBLocation = 0;

        }, function (error) {
            $scope.Error = error;
        });

        var ResponseData = Common.getMasterList('M_Location', 'LocationID', 'LocationDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.M_LocationList = Response.data;
            if ($scope.Day0.Location == undefined)
                $scope.Day0.Location = 0;

        }, function (error) {
            $scope.Error = error;
        });

        var ResponseData = Common.getMasterList('M_Attempts', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.AttemptsList = Response.data;
            if ($scope.Day0.Attempts == undefined)
                $scope.Day0.Attempts = 0;

        }, function (error) {
            $scope.Error = error;
        });
    }
    //for no of ocytes
    $scope.GetOocytesForDay0 = function GetOocytesForDay0() {
      //  console.log("cycle code ", $rootScope.CoupleDetails.SelectedTherapyCycleCode)
        var ResponseData = DayZeroSrv.GetOocytesForDay0($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID, $rootScope.CoupleDetails.SelectedTherapyCycleCode);
        ResponseData.then(function (Response) {
            if (Response != null) {
                $scope.DummyOocyte = Response.data;
                console.log('$scope.DummyOocyte', $scope.DummyOocyte);
                debugger;
                $scope.SourceOfSpermID = $scope.DummyOocyte[0].SourceOfSpermID;                
                 //if ($scope.SourceofSpermList != undefined && $scope.SourceofSpermList.length == 3) {
                 if ($scope.SourceofSpermList != undefined && $scope.TempSourceofSpermList.length == 3) {
                    if ($scope.SourceOfSpermID == 1) {
                        //$scope.SourceofSpermList = $scope.SourceofSpermList.slice(0, -1);  //commented  just to check
                        // $scope.SourceofSpermList = $scope.TempSourceofSpermList.slice(0, -1);  //commented  sujata already added

                        $scope.SourceofSpermList = $scope.TempSourceofSpermList.slice(2); //new added   sujata already added
                        $scope.Day0.Semen = 1;

                    }
                    else if ($scope.SourceOfSpermID == 2) {

                      //  $scope.SourceofSpermList = $scope.SourceofSpermList.splice(1, 1);      //commented by Nayan Kamble
                        // $scope.SourceofSpermList = $scope.SourceofSpermList.splice(1, 2);    //Added by Nayan Kamble     commented just to check
                        //$scope.SourceofSpermList =   commented just to check
                       // $scope.SourceofSpermList = $scope.SourceofSpermList.splice($scope.SourceofSpermList.indexOf("Partner"), 1);
                       // $scope.SourceofSpermList = $scope.SourceofSpermList.slice(0, 2);
                        // $scope.SourceofSpermList.filter(word => word != "Partner");
                       // $scope.remove("Partner");
                        //console.log($scope.SourceofSpermList);

                        //const index = $scope.SourceofSpermList.findIndex(SourceofSpermList => "Partner" === $scope.TempSourceofSpermList[1].Description);
                        //$scope.SourceofSpermList = $scope.SourceofSpermList.splice(index, 1);
                        //console.log($scope.index);
                       // $scope.SourceofSpermList = $scope.TempSourceofSpermList.slice(0, -1);

                        // var fruits = ["Select", "Partner", "Donar"];


                        //--commented sujata for donor semen allredey added 
                        //$scope.start_index = 1
                        //$scope.number_of_elements_to_remove = 1;
                        //$scope.removed_elements = $scope.TempSourceofSpermList.splice($scope.start_index, $scope.number_of_elements_to_remove);
                        //$scope.SourceofSpermList = $scope.TempSourceofSpermList.slice();

                        //--new  added  sujata for donor semen 

                        $scope.SourceofSpermList = $scope.TempSourceofSpermList.slice(1,-1);
                        $scope.Day0.Semen = 2;
                    }
                }
            }
            else {
                $scope.DummyOocyte = [];
            }
            if ($scope.DummyOocyte.length > 0) {
                $scope.IsDisableNew = false;
            }
            else {
                $scope.IsDisableNew = true;
            }
        })
    }

    $scope.remove = function (item) {
        debugger;
        var index = $scope.SourceofSpermList.indexOf(item);
        $scope.SourceofSpermList.splice(index, 1);
$scope
    }


    //Get Semen Spermiogram or thaw Sample no 
    $scope.GetSemenDetails = function () {
        debugger;
        var ResponseData = DayZeroSrv.GetSemenDetails(1);
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: 'Select', IsSemenPrepration: 0, IsPartner:2 });
            if (Response != null) {
                $scope.SemenDetailsList = Response.data;
                if ($scope.SemenDetailsList.length > 1) {
                     $scope.SemenDetailsListTemp = angular.copy($scope.SemenDetailsList);
                }
               
            }
            $scope.Day0.SemenDetail = $scope.SemenDetailsList[0];
        })
    }
    $scope.SemenChange = function () {
        debugger;
        if ($scope.SemenDetailsList.length > 1) {     //= added by Nayan Kamble  just to check 
            $scope.SemenDetailsList = angular.copy($scope.SemenDetailsListTemp);
                    if ($scope.Day0.Semen == 1) {
                        debugger
                //partner
                for (var ii = 0; ii < $scope.SemenDetailsList.length; ii++) {
                    if ($scope.SemenDetailsList[ii].IsPartner == 0) {
                        $scope.SemenDetailsList.splice(ii, 1);
                        $scope.Day0.SemenDetail = $scope.SemenDetailsList[0];
                    }
                }
            }
                    else if ($scope.Day0.Semen == 2) {
                        debugger
                for (var ii = 0; ii < $scope.SemenDetailsList.length; ii++) {
                    if ($scope.SemenDetailsList[ii].IsPartner == 1) {
                        $scope.SemenDetailsList.splice(ii, 1);
                        $scope.Day0.SemenDetail = $scope.SemenDetailsList[0];
                    }
                }
            }
            else {
                $scope.Day0.SemenDetail = $scope.SemenDetailsList[0];
            }
            $scope.Day0.SemenDetail = $scope.SemenDetailsList[0];
        }
    


    }
    //Fill Oocyte Grid
    $scope.GetOocyteGridForDayDay0 = function () {

        var ResponseData = DayZeroSrv.FillDayZeroOocyteGrid($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
        ResponseData.then(function (Response) {
            debugger;
            if (Response.data != null) {
                $scope.Day0List = Response.data;

                debugger;
                angular.forEach($scope.Day0List, function (item) {
                    //item.IVFCytoplasmList = $scope.IVFCytoplasmList;
                    if (item.Finalize) {
                        item.rowdisable = true;
                    }
                    else {
                        item.rowdisable = false;
                    }

                    debugger;
                    if (item.Plan == 1 || item.Plan == 4 || item.Plan == 5 || item.Plan == 11 || item.Plan == 12 || item.Plan == 13) {
                        item.MaturityDisabled = false;
                    }
                    else {
                        item.MaturityDisabled = true;
                    }

                    if (item.Plan == 4 || item.Plan == 5 || item.Plan == 11 || item.Plan == 12 || item.Plan == 13) {
                        item.DisabledAll = false;
                    }
                    else {
                        item.DisabledAll = true;
                    }
                });
                $scope.Count.IVM = $filter('filter')($scope.Day0List, function (d) { return d.IVM !== false }).length;
                $scope.Count.GV = $filter('filter')($scope.Day0List, function (d) { return d.Maturity === 1 }).length;
                $scope.Count.MI = $filter('filter')($scope.Day0List, function (d) { return d.Maturity === 2 }).length;
                $scope.Count.MII = $filter('filter')($scope.Day0List, function (d) { return d.Maturity === 3 }).length;
                $scope.Count.IVF = $filter('filter')($scope.Day0List, function (d) { return d.Plan === 3 }).length;
                $scope.Count.ICSI = $filter('filter')($scope.Day0List, function (d) { return d.Plan === 4 }).length;
                $scope.Count.Discard = $filter('filter')($scope.Day0List, function (d) { return d.Plan === 2 }).length;
                $scope.Count.Donate = $filter('filter')($scope.Day0List, function (d) { return d.Plan === 6 }).length;
                $scope.Count.CryoDonate = $filter('filter')($scope.Day0List, function (d) { return d.Plan === 7 }).length;


                //to display name of Embryologist, Witness and incubrator
                $scope.TotalCount = $scope.Day0List.length;
                if ($scope.TotalCount > 0) {
                    debugger;
                    var EmbryologistDesc = $scope.Day0List[0].EmbryologistDesc;
                    $scope.CountEmbryologist = $filter('filter')($scope.Day0List, function (d) { return d.EmbryologistDesc === EmbryologistDesc }).length;
                    if ($scope.TotalCount == $scope.CountEmbryologist)
                        $scope.Embryologist = EmbryologistDesc;
                    else
                        $scope.Embryologist = " ";

                    var WitnessDesc = $scope.Day0List[0].WitnessDesc;
                    $scope.CountWitnessDesc = $filter('filter')($scope.Day0List, function (d) { return d.WitnessDesc === WitnessDesc }).length;
                    if ($scope.TotalCount == $scope.CountWitnessDesc)
                        $scope.WitnessDesc = WitnessDesc;
                    else
                        $scope.WitnessDesc = " ";

                    var IncubatorDesc = $scope.Day0List[0].IncubatorDesc;
                    $scope.CountIncubatorDesc = $filter('filter')($scope.Day0List, function (d) { return d.IncubatorDesc === IncubatorDesc }).length;
                    if ($scope.TotalCount == $scope.CountIncubatorDesc)
                        $scope.IncubatorDesc = IncubatorDesc;
                    else
                        $scope.IncubatorDesc = " ";

                    var sorted = $scope.Day0List.sort(function (a, b) {
                        return new Date(a.SelectedDate).getTime() - new Date(b.SelectedDate).getTime()
                    });
                    var maxDate = sorted[sorted.length - 1];
                    $scope.DateTimeDay0 = maxDate.SelectedDate;
                    $scope.DateTimeDay0Time = maxDate.SelectedTime;




                    //var DateTimeDay0 = $scope.Day0List[0].SelectedDate;
                    //$scope.CountDateTimeDay0 = $filter('filter')($scope.Day0List, function (d) { return d.SelectedDate === DateTimeDay0 }).length;
                    //if ($scope.TotalCount == $scope.CountDateTimeDay0)
                    //    $scope.DateTimeDay0 = DateTimeDay0;
                    //else
                    //    $scope.DateTimeDay0 = " ";
                }
                //
            }
        }, function (error) {
            AlertMessage.error("Error Occured");
        });
    }
    //Redirect Back To Embrology  
    $scope.SaveDay0Process = function (Day0) {
        debugger;
        if ($scope.CoupleDetails.FemalePatient.IsDonor && $scope.CoupleDetails.FemalePatient.ArtSubTypeID != 8) {
            //var ResponseData = DayZeroSrv.CheckLinkCouplecycleAvialbleOrNot($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
            //ResponseData.then(function (Response) {
             //   if (Response.data > 0) {
                    //check Couple Cycle Create Or Not
                    if (!angular.equals({}, $scope.SelectedOocytesAtEdit)) //at time of edit
                    {
                        $scope.SelectedOocytes = [];
                        $scope.SelectedOocytes.push($scope.SelectedOocytesAtEdit);
                    }
                    if ($scope.SelectedOocytes.length != 0)  //temp not working
                    {
                        $scope.IsValidOocyte = false;
                        if ($scope.CheckValidation()) {
                            debugger;
                            angular.forEach($scope.SelectedOocytes, function (item) {
                                item.OocyteNumber = item.ID;
                                item.SerialOocuteNumber = item.UnitID;  //rohini
                                item.Breakage = Day0.Breakage;
                                item.Plan = Day0.Plan;
                                item.TypeCase = Day0.TypeCase;
                                item.IVM = Day0.IVM;
                                item.SelectedDate = new Date(Day0.SelectedDate);
                                item.SelectedTime = new Date(Day0.SelectedTime);
                                item.Maturity = Day0.Maturity;
                                item.OCD = Day0.OCD;
                                item.ECD = Day0.ECD;
                                item.OCC = Day0.OCC;
                                item.SpermMorphology = Day0.SpermMorphology;
                                item.PBLocation = Day0.PBLocation;
                                item.Location = Day0.Location;
                                item.Attempts = Day0.Attempts;
                                item.IVMDate = new Date(Day0.IVMDate);
                                item.IVMTime = new Date(Day0.IVMTime);
                                item.IVMMaturity = Day0.IVMMaturity;
                                item.IVMPreMaturity = Day0.IVMPreMaturity
                                item.PlanDate = new Date(Day0.PlanDate);
                                item.PlanTime = new Date(Day0.PlanTime);
                                item.PlanStartTime = new Date(Day0.PlanStartTime);
                                item.PlanEndTime = new Date(Day0.PlanEndTime);
                                item.PlanStartDate = new Date(Day0.PlanStartDate);
                                item.PlanEndDate = new Date(Day0.PlanEndDate);
                                item.ZP = Day0.ZP;
                                item.PB = Day0.PB;
                                item.PVS = Day0.PVS;
                                item.Cytoplasm = Day0.Cytoplasm;
                                item.Breakage = Day0.Breakage;
                                item.Semen = Day0.Semen;
                                item.Incubator = Day0.Incubator;
                                item.Remarks = Day0.Remarks;
                                item.Witness = Day0.Witness;
                                item.Embryologist = Day0.Embryologist;
                                item.Embryoscope = Day0.Embryoscope;
                                item.IsCommonIncubator = Day0.IsCommonIncubator;
                                item.SemenDetail = Day0.SemenDetail;
                            })
                            angular.forEach($scope.SelectedOocytes, function (item) {
                                item.SelectedDate = $filter('date')(item.SelectedDate, 'medium');
                                item.SelectedTime = $filter('date')(item.SelectedTime, 'medium');
                                item.IVMTime = $filter('date')(item.IVMTime, 'medium');
                                item.PlanTime = $filter('date')(item.PlanTime, 'medium');
                            });

                            var ResponseData = DayZeroSrv.SaveDay0Process($scope.SelectedOocytes);
                            debugger;
                            ResponseData.then(function (Response) {
                                if (Response.data == 1) {
                                    // $uibModalInstance.close(Response.data);
                                    $scope.IsNewClick = false;
                                    AlertMessage.success("PIVF", "Oocytes Details Saved Successfully");
                                    $scope.GetOocyteGridForDayDay0(); // for refresh grid 
                                }
                            }, function (error) {
                                AlertMessage.error("PIVF", "Error Ocurred While Adding Details");
                            });
                        }
                        else {  
                            $scope.FrmDay0New.SelectedDate.$dirty = true;
                            $scope.FrmDay0New.Time.$dirty = true;
                            // $scope.FrmDay0New.ddlMaturity.$dirty = true;
                            $scope.FrmDay0New.ddlcasePlan.$dirty = true;      //Added by Nayan Kamble 
                            $scope.FrmDay0New.ddlPlan.$dirty = true;
                            $scope.FrmDay0New.ddlWitness.$dirty = true;
                            $scope.FrmDay0New.ddlEmbryologist.$dirty = true;
                            $scope.FrmDay0New.IVMDate.$dirty = true;
                            $scope.FrmDay0New.IVMTime.$dirty = true;
                            $scope.FrmDay0New.IVMMaturity.$dirty = true;
                            $scope.FrmDay0New.IVMPreMaturity.$dirty = true;
                            $scope.FrmDay0New.PlanDate.$dirty = true;
                            $scope.FrmDay0New.PlanTime.$dirty = true;
                            $scope.FrmDay0New.PlanStartDate.$dirty = true;
                            $scope.FrmDay0New.PlanEndDate.$dirty = true;
                            $scope.FrmDay0New.PlanStartTime.$dirty = true;
                            $scope.FrmDay0New.PlanEndTime.$dirty = true;
                            $scope.FrmDay0New.ddlZP.$dirty = true;
                            $scope.FrmDay0New.ddlPB.$dirty = true;
                            $scope.FrmDay0New.ddlPVS.$dirty = true;
                            $scope.FrmDay0New.ddlCytoplasm.$dirty = true;
                            $scope.FrmDay0New.ddlBreakage.$dirty = true;
                            $scope.FrmDay0New.ddlSemen.$dirty = true;
                            //  $scope.FrmDay0New.ddlSemenDetail.$dirty = true;   //Added by Nayan Kamble    //commented by sujata for cross clinic
                            $scope.FrmDay0New.ddlIncubator.$dirty == true;
                            $scope.FrmDay0New.IVMMaturity1.$dirty = true;
                            //if ($scope.Day0.SemenDetail.ID == 0 && ($scope.Day0.Plan == 3 || $scope.Day0.Plan == 4 || $scope.Day0.Plan == 5) && $scope.Day0.TypeCase == 1) {    //Added by Nayan Kamble 
                            //    AlertMessage.error("PIVF", "Please enter Semen Code");
                            //}
                           // else   //commented by sujata for cross clinic
                            AlertMessage.error("PIVF", "Please Fill Required Fields");
                        }
                    }
                    else {
                        $scope.IsValidOocyte = true;
                        AlertMessage.error("PIVF", "Please Select Oocytes");
                    }
                //}
                //else {
                //    AlertMessage.error("PIVF", "Create a Couple Cycle First..");
                //}
            //}, function (error) {
            //    AlertMessage.error("PIVF", "Error Ocurred While Adding Details");
            //});
        }
        else {
            debugger;
            //check Couple Cycle Create Or Not
            if (!angular.equals({}, $scope.SelectedOocytesAtEdit)) //at time of edit
            {
                $scope.SelectedOocytes = [];
                $scope.SelectedOocytes.push($scope.SelectedOocytesAtEdit);
            }

            if ($scope.SelectedOocytes.length != 0)  //temp not working
            {
                $scope.IsValidOocyte = false;
                if ($scope.CheckValidation()) {
                    debugger;
                    angular.forEach($scope.SelectedOocytes, function (item) {
                        item.OocyteNumber = item.ID;
                        item.SerialOocuteNumber = item.UnitID// Day0.SerialOocuteNumber;
                        item.Breakage = Day0.Breakage;
                        item.Plan = Day0.Plan;
                        item.TypeCase = Day0.TypeCase;
                        item.IVM = Day0.IVM;
                        item.SelectedDate = new Date(Day0.SelectedDate);
                        item.SelectedTime = new Date(Day0.SelectedTime);
                        item.Maturity = Day0.Maturity;
                        item.OCD = Day0.OCD;
                        item.ECD = Day0.ECD;
                        item.OCC = Day0.OCC;
                        item.SpermMorphology = Day0.SpermMorphology;
                        item.PBLocation = Day0.PBLocation;
                        item.Location = Day0.Location;
                        item.Attempts = Day0.Attempts;
                        item.IVMDate = new Date(Day0.IVMDate);
                        item.IVMTime = new Date(Day0.IVMTime);
                        item.IVMMaturity = Day0.IVMMaturity;
                        item.IVMPreMaturity = Day0.IVMPreMaturity;
                        item.PlanDate = new Date(Day0.PlanDate);
                        item.PlanTime = new Date(Day0.PlanTime);
                        item.PlanStartTime = new Date(Day0.PlanStartTime);
                        item.PlanEndTime = new Date(Day0.PlanEndTime);
                        item.PlanStartDate = new Date(Day0.PlanStartDate);
                        item.PlanEndDate = new Date(Day0.PlanEndDate);
                        item.ZP = Day0.ZP;
                        item.PB = Day0.PB;
                        item.PVS = Day0.PVS;
                        item.Cytoplasm = Day0.Cytoplasm;
                        item.Breakage = Day0.Breakage;
                        item.Semen = Day0.Semen;
                        item.Incubator = Day0.Incubator;
                        item.Remarks = Day0.Remarks;
                        item.Witness = Day0.Witness;
                        item.Embryologist = Day0.Embryologist;
                        item.Embryoscope = Day0.Embryoscope;
                        item.IsCommonIncubator = Day0.IsCommonIncubator;
                        item.SemenDetail = Day0.SemenDetail;
                    })
                    angular.forEach($scope.SelectedOocytes, function (item) {
                        item.SelectedDate = $filter('date')(item.SelectedDate, 'medium');
                        item.SelectedTime = $filter('date')(item.SelectedTime, 'medium');
                        item.IVMTime = $filter('date')(item.IVMTime, 'medium');
                        item.PlanTime = $filter('date')(item.PlanTime, 'medium');
                    });
                    debugger;
                    var ResponseData = DayZeroSrv.SaveDay0Process($scope.SelectedOocytes);
                    ResponseData.then(function (Response) {
                        if (Response.data == 1) {
                            // $uibModalInstance.close(Response.data);
                            $scope.IsNewClick = false;
                            AlertMessage.success("PIVF", "Oocytes Details Saved Successfully");
                            $scope.GetOocyteGridForDayDay0(); // for refresh grid 
                        }
                    }, function (error) {
                        AlertMessage.error("PIVF", "Error Ocurred While Adding Details");
                    });
                }
                else {
                    $scope.FrmDay0New.SelectedDate.$dirty = true;
                    $scope.FrmDay0New.Time.$dirty = true;
                    // $scope.FrmDay0New.ddlMaturity.$dirty = true;
                    $scope.FrmDay0New.ddlcasePlan.$dirty = true;      //Added by Nayan Kamble 
                    $scope.FrmDay0New.ddlPlan.$dirty = true;
                    $scope.FrmDay0New.ddlWitness.$dirty = true;
                    $scope.FrmDay0New.ddlEmbryologist.$dirty = true;
                    $scope.FrmDay0New.IVMDate.$dirty = true;
                    $scope.FrmDay0New.IVMTime.$dirty = true;
                    $scope.FrmDay0New.IVMMaturity.$dirty = true;
                    $scope.FrmDay0New.IVMPreMaturity.$dirty = true;
                    $scope.FrmDay0New.PlanDate.$dirty = true;
                    $scope.FrmDay0New.PlanTime.$dirty = true;
                    $scope.FrmDay0New.PlanStartDate.$dirty = true;
                    $scope.FrmDay0New.PlanEndDate.$dirty = true;
                    $scope.FrmDay0New.PlanStartTime.$dirty = true;
                    $scope.FrmDay0New.PlanEndTime.$dirty = true;
                    $scope.FrmDay0New.ddlZP.$dirty = true;
                    $scope.FrmDay0New.ddlPB.$dirty = true;
                    $scope.FrmDay0New.ddlPVS.$dirty = true;
                    $scope.FrmDay0New.ddlCytoplasm.$dirty = true;
                    $scope.FrmDay0New.ddlBreakage.$dirty = true;
                    $scope.FrmDay0New.ddlSemen.$dirty = true;
                    // $scope.FrmDay0New.ddlSemenDetail.$dirty = true;   //Added by Nayan Kamble   //commented by sujata for cross clinic
                    $scope.FrmDay0New.ddlIncubator.$dirty == true;
                    $scope.FrmDay0New.IVMMaturity1.$dirty = true;
                    //if ($scope.Day0.SemenDetail.ID == 0 && ($scope.Day0.Plan == 3 || $scope.Day0.Plan == 4 || $scope.Day0.Plan == 5) && $scope.Day0.TypeCase == 1) {    //Added by Nayan Kamble 
                    //    AlertMessage.error("PIVF", "Please enter Semen Code");  //commented by sujata for cross clinic
                    //}
                    //else

                    AlertMessage.error("PIVF", "Please Fill Required Fields");
                }
            }
            else {
                $scope.IsValidOocyte = true;
                AlertMessage.error("PIVF", "Please Select Oocytes");
            }
        }
    }
    $scope.CheckValidation = function () {
        debugger;
        if (!$scope.FrmDay0New.SelectedDate.$valid)
            return IsValid = false;
        else if (!$scope.FrmDay0New.Time.$valid)
            return IsValid = false;
        //else if (($scope.Day0.Maturity == 0) && (($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5)))
            //    return IsValid = false;
        else if ($scope.Day0.TypeCase == 0)     //Added by Nayan Kamble 
            return IsValid = false;
        else if ($scope.Day0.Plan == 0)
            return IsValid = false;
        else if ($scope.Day0.Witness == 0)
            return IsValid = false;
        else if ($scope.Day0.Embryologist == 0)
            return IsValid = false;
        if (!$scope.FrmDay0New.IVMDate.$valid && $scope.Day0.IVM == true)
            return IsValid = false;
        else if (!$scope.FrmDay0New.IVMTime.$valid && $scope.Day0.IVM == true)
            return IsValid = false;
        else if (!$scope.Day0.IVMPreMaturity != 0 && $scope.Day0.IVM == true) {
            debugger;
            return IsValid = false;
        }
            //else if ($scope.Day0.Maturity == 0 && $scope.Day0.TypeCase==2) {
            //    debugger;
            //    return IsValid = false;
            //}


        else if (!$scope.FrmDay0New.PlanDate.$valid && $scope.Day0.Plan == 3)
            return IsValid = false;
        else if (!$scope.FrmDay0New.PlanTime.$valid && $scope.Day0.Plan == 3)
            return IsValid = false;
        else if (!$scope.FrmDay0New.PlanStartDate.$valid && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
            return IsValid = false;
        else if (!$scope.FrmDay0New.PlanEndDate.$valid && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
            return IsValid = false;
        else if (!$scope.FrmDay0New.PlanStartTime.$valid && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
            return IsValid = false;
        else if (!$scope.FrmDay0New.PlanEndTime.$valid && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
            return IsValid = false;
        //else if ($scope.Day0.ZP == 0 && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
        //    return IsValid = false;
        //else if ($scope.Day0.PB == 0 && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
        //    return IsValid = false;
        //else if ($scope.Day0.PVS == 0 && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
        //    return IsValid = false;
        //else if ($scope.Day0.Cytoplasm == 0 && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
        //    return IsValid = false;
        //else if ($scope.Day0.Breakage == 0 && ($scope.Day0.Plan == 4 || $scope.Day0.Plan == 5))
        //    return IsValid = false;


        //else if ($scope.Day0.Semen == 0 && ($scope.Day0.Plan == 3 || $scope.Day0.Plan == 4 || $scope.Day0.Plan == 5) && $scope.Day0.TypeCase == 1)
        //    return IsValid = false;
        //else if ($scope.Day0.SemenDetail.ID == 0 && ($scope.Day0.Plan == 3 || $scope.Day0.Plan == 4 || $scope.Day0.Plan == 5) && $scope.Day0.TypeCase == 1) {   //Added by Nayan Kamble 
        //    $scope.style = "border-color:red";
        //    return IsValid = false;           
            //}     //commented by sujata  for cross clinic

        else if ($scope.Day0.Incubator == 0 && $scope.Day0.IsCommonIncubator == true)
            return IsValid = false;
        else {
            debugger;
            return IsValid = true;
            $scope.style = null;
        }
    }

    function ClearSaveDays() {    //Added by Nayan Kamble on 11/06/2019
        $scope.disableClickDay0 = false;
    }
    $scope.SaveDayZeroFinalizeProcess = function (Day0) {
        debugger;
        $scope.disableClickDay0 = true;    //Added by Nayan Kamble on 11/06/2019
        $scope.Withoutplancnt = $filter('filter')($scope.Day0List, function (d) { return d.rowdisable === false && d.Finalize === true && d.Plan > 0 }).length;
         //var ChecklinkedRecipeint  = $filter('filter')($scope.Day0List, function (d) { return d.rowdisable === false && d.Finalize === true && (d.Plan > 0 && (d.Plan == 6 || d.Plan == 7)) }); //check donate and cryaodonate plan
        // var CountCoupleIDSelected = $filter('filter')($scope.ChecklinkedRecipeint, function (d) { return d.coupleID > 0 });
        var IsValidCupleID = false;
         if ($scope.Withoutplancnt > 0) {
             
             $scope.GetActiveOocytes = $filter('filter')($scope.Day0List, function (d) { return d.rowdisable === false && d.Plan != 0 });
             var tempDonateCryoDonate = $filter('filter')($scope.GetActiveOocytes, function (d) { return d.rowdisable === false && d.Plan != 0 && (d.Plan == 6 || d.Plan == 7) && d.Finalize === true });
             var selectedCouple = $filter('filter')($scope.GetActiveOocytes, function (d) { return d.rowdisable === false && d.Plan != 0 && (d.Plan == 6 || d.Plan == 7) && d.coupleID != 0 && d.Finalize === true});
             if (tempDonateCryoDonate.length == selectedCouple.length)
             {
                 var ResponseData = DayZeroSrv.SaveDayZeroFinalizeProcess($scope.GetActiveOocytes);
                 ResponseData.then(function (Response) {
                     if (Response.data == 1) {
                         $scope.successstatus = 1;
                         ClearSaveDays();     //Added by Nayan Kamble on 11/06/2019
                         $uibModalInstance.close($scope.successstatus);
                     }
                 }, function (error) {
                     AlertMessage.error("PIVF", "Something went Wrong");
                 });
             } else {
                 AlertMessage.error("PIVF", "Please link Recipient");
                 ClearSaveDays();     //Added by Nayan Kamble on 11/06/2019
             }
         }

        else {
             AlertMessage.error("PIVF", "Please Check Oocyte Plan or Finalize at least one oocyte. ");
             $scope.disableClickDay0 = false;
        }
    }
    //$scope.Commonchecked(IsCommonIncubator, Commondisable)
    //{
    //    
    //    if(IsCommonIncubator==false && Commondisable==true)
    //    {
    //        $scope.Day0.Commondisable = false;
    //    }
    //}
    ////Edit Details
    $scope.HideStyle = "";
    $scope.SelectedOocyete = [];
    $scope.EditDay0 = function (Item) {
        //Disable Apply To Control
        $scope.ApplyToDisable = false
        var ResponseData = DayZeroSrv.GetDay0DetailsByID(Item.Day0ID, Item.UnitID, $scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
        ResponseData.then(function (Response) {
            debugger;
            if (Response.data != null) {
                debugger;
                $scope.Day0 = Response.data;
                $scope.Day0.SelectedDate = new Date($scope.Day0.SelectedDate);
                $scope.Day0.SelectedTime = new Date($scope.Day0.SelectedTime);
                if ($scope.Day0.IVMDate != null) {
                    $scope.Day0.IVMDate = new Date($scope.Day0.IVMDate);
                }
                else {
                    $scope.Day0.IVMDate = new Date();
                }
                $scope.Day0.TypeCase = $scope.Day0.TypeCase;
                $scope.Day0.IVMTime = new Date($scope.Day0.IVMTime);
                $scope.Day0.PlanDate = new Date($scope.Day0.PlanDate);
                $scope.Day0.PlanTime = new Date($scope.Day0.PlanTime);
                $scope.Day0.PlanStartTime = new Date($scope.Day0.PlanStartTime);
                $scope.Day0.PlanEndTime = new Date($scope.Day0.PlanEndTime);
                $scope.Day0.PlanStartDate = new Date($scope.Day0.PlanStartDate);
                $scope.Day0.PlanEndDate = new Date($scope.Day0.PlanEndDate);
                $scope.IsNewClick = true;
                if ($scope.Day0.Finalize) {
                    $scope.Day0.rowdisable = true;
                    $scope.HideStyle = "pointer-events:none";
                }
                else {
                    $scope.Day0.rowdisable = false;
                    $scope.HideStyle = "null";
                }
                if ($scope.Day0.IsCommonIncubator) {
                    $scope.Day0.Commondisable = true;
                }
                else {
                    $scope.Day0.Commondisable = false;
                }

                //for by defualt selected oocyte no
                debugger;
                if ($scope.SourceofSpermList != undefined && $scope.SourceofSpermList.length == 3) {
                    debugger;
                    if ($scope.SourceOfSpermID == 1) {
                        $scope.SourceofSpermList = $scope.SourceofSpermList.slice(0, -1);
                        $scope.Day0.Semen = 1;
                    }
                    else if ($scope.SourceOfSpermID == 2) {

                        $scope.SourceofSpermList = $scope.SourceofSpermList.splice(1, 1);
                        $scope.Day0.Semen = 2;
                    }
                }
                $scope.SelectedOocytesAtEdit = {};
                $scope.SelectedOocytesAtEdit.ID = Response.data.OocyteNumber;
                $scope.SelectedOocytesAtEdit.UnitID = Response.data.SerialOocuteNumber;

                //remove selected oocyte from drop down
                if ($scope.DummyOocyte.length > 0) {
                    //angular.forEach($scope.DummyOocyte, function (item) {
                    //    if (item.ID == $scope.SelectedOocytesAtEdit.ID) {
                    //    }
                    //});
                    var idx = -1;
                    for (var i = 0; i <= $scope.DummyOocyte.length - 1; i++) {
                        if ($scope.DummyOocyte[i].ID == $scope.SelectedOocytesAtEdit.ID)
                            idx = i;
                        break;
                    }
                    //  $scope.DummyOocyte.splice($scope.DummyOocyte.indexOf($scope.DummyOocyte.find(x=>x.ID == $scope.SelectedOocytesAtEdit.ID)), 1);
                    $scope.DummyOocyte.splice(idx, 1);
                }
                debugger;
                if ($scope.Day0.PreprationIDOrThawID != 0 && $scope.Day0.IsPreprationID != 0) {
                    $scope.Detail = [];
                    $scope.Detail = $filter('filter')($scope.SemenDetailsList, function (d) { return d.ID == $scope.Day0.PreprationIDOrThawID && d.IsSemenPrepration == $scope.Day0.IsPreprationID });
                    $scope.Day0.SemenDetail = $scope.Detail[0];
                }

                //Select plan As per Type Of Case
                $scope.typeOfPlan();
            }
        });
    }
    //for img
    $scope.GetImg = {};
    $scope.PreviewImg = function (Imgcollection) {
        angular.element(Day0ImgPopPup).modal('show');
        if (Imgcollection.Img != null) {
            $scope.GetImg = Imgcollection.Img.model;
            angular.forEach($scope.GetImg, function (item) {
                item.rowdisable = Imgcollection.rowdisable;
            });
        }
        else {
            $scope.GetImg = {};
        }
    }
    //Preview Img Ok Click Process
    $scope.ImgPreviewOk = function () {
        angular.element(Day0ImgPopPup).modal('hide');
    }
    //Preview Img Cancel Click Process
    $scope.ImgPreviewCancel = function () {
        angular.element(Day0ImgPopPup).modal('hide');
    }
    //Remove Images
    $scope.RemoveImg = function (index) {
        var index = $scope.GetImg.indexOf(index);
        $scope.GetImg.splice(index, 1);
    }
    //new button
    $scope.NewClick = function () {
        debugger;
        $scope.ApplyToDisable = true;
        $scope.SelectedOocytesAtEdit = {};
        $scope.SelectedOocyete = [];
        $scope.IsNewClick = true;
        $scope.Day0.Commondisable = false;
        $scope.Day0 = {};
        $scope.Day0.Incubator = 0;
        $scope.Day0.Semen = 0;
        $scope.Day0.Plan = 0;
        $scope.Day0.Maturity = 0;
        $scope.Day0.PreMaturity = 0;
        $scope.Day0.IVMMaturity = 0;
        $scope.Day0.Breakage = 0;
        $scope.Day0.Cytoplasm = 0;
        $scope.Day0.PVS = 0;
        $scope.Day0.PB = 0;
        $scope.Day0.ZP = 0;
        $scope.Day0.OCD = 0;
        $scope.Day0.ECD = 0;
        $scope.Day0.OCC = 0;
        $scope.Day0.SpermMorphology = 0;
        $scope.Day0.PBLocation = 0;
        $scope.Day0.Location = 0;
        $scope.Day0.Attempts = 0;
        $scope.Day0.SelectedTime = new Date();
        $scope.Day0.IVMTime = new Date();
        $scope.Day0.PlanTime = new Date();
        $scope.Day0.PlanStartTime = new Date();
        $scope.Day0.PlanEndTime = new Date();
        $scope.Day0.Witness = 0;
        $scope.Day0.Embryologist = 0;
        $scope.Day0.rowdisable = false;
        $scope.Day0.SelectedDate = new Date();
        $scope.Day0.IVMDate = new Date();
        $scope.Day0.PlanDate = new Date();
        $scope.Day0.PlanStartDate = new Date();
        $scope.Day0.PlanEndDate = new Date();
        $scope.Day0.TypeCase = 0;
        $scope.HideStyle = "null";
        $scope.GetOocytesForDay0();
    }
    //cancel new 
    $scope.CancelNew = function () {
        $scope.SelectedOocytesAtEdit = {};
        $scope.SelectedOocyete = [];
        $scope.IsNewClick = false;
    }
    //Cancel day 0
    $scope.CancelDay0 = function () {
        $scope.SelectedOocytesAtEdit = {};
        $scope.SelectedOocyete = [];
        $uibModalInstance.dismiss('cancel');
    }
    //
    $scope.PlanChange = function () {
        debugger;
        $scope.Day0.PlanDate = new Date();
        $scope.Day0.SemenDetail = $scope.SemenDetailsList[0];
    }
    $scope.ValidationMsg = function (Msg) {
        AlertMessage.error("PalashIVF", Msg);
    }

    //Added By Vikrant For Apollo New custmization
    $scope.DenudationFlag = false;
    $scope.typeCase = false;
    $scope.typeOfPlan = function () {
        debugger;
        //select Default Plan
        $scope.FrmDay0New.ddlPlan.$dirty = false;
        if ($scope.Day0.Plan == undefined || $scope.Day0.Plan == null) {
            $scope.Day0.Plan = 0;
        }
        ////commented by neena
        //if ($scope.Day0.TypeCase == 2) {
        //    if ($scope.Day0.Maturity == undefined || $scope.Day0.Maturity == null) {
        //        $scope.Day0.Maturity = 0;
        //    }
        //    //$scope.DenudationFlag = true;

        //    $scope.CopyData = angular.copy($scope.IVFPlanList);
        //    //Get The Page Visibility Config Data By Vikrant 
        //    $scope.configData = PageConfig.getObj();
        //    for (var i = $scope.CopyData.length - 1; i >= 0; i--) {
        //        debugger;
        //        if ($scope.IVFPlanList[i] != undefined) {
        //            if ($scope.IVFPlanList[i] != undefined) {
        //                if ($scope.IVFPlanList[i].Description == "Donate") {
        //                    if (!$scope.configData.Day0Donate) {
        //                        $scope.IVFPlanList.splice(i, 1);
        //                    }
        //                }
        //            }
        //            if ($scope.IVFPlanList[i] != undefined) {
        //                if ($scope.IVFPlanList[i].Description == "Donate Cryo") {
        //                    if (!$scope.configData.Day0DonateCryo) {
        //                        $scope.IVFPlanList.splice(i, 1);
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    for (var i = $scope.IVFPlanList.length - 1; i >= 0; i--) {
        //        if ($scope.IVFPlanList[i] != undefined) {
        //            if ($scope.IVFPlanList[i].Description == "IVF") {
        //                $scope.IVFPlanList.splice(i, 1);
        //            }
        //        }
        //    }

        //}
        else {
            //Fill Plan Master
            var ResponseData = Common.getMasterList('M_IVF_PlanMaster', 'IVFPlanID', 'Description');
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
                $scope.IVFPlanList = Response.data;
                $scope.CopyData = angular.copy($scope.IVFPlanList);
                //Get The Page Visibility Config Data By Vikrant 
                $scope.configData = PageConfig.getObj();

                if ($scope.Day0.TypeCase == 2) {
                    if ($scope.Day0.Maturity == undefined || $scope.Day0.Maturity == null) {
                        $scope.Day0.Maturity = 0;
                    }
                    //$scope.DenudationFlag = true;

                    $scope.CopyData = angular.copy($scope.IVFPlanList);
                    //Get The Page Visibility Config Data By Vikrant 
                    $scope.configData = PageConfig.getObj();
                    for (var i = $scope.CopyData.length - 1; i >= 0; i--) {
                        debugger;
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 6) { //Donate
                                    if (!$scope.configData.Day0Donate) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 7) {//"Donate Cryo"
                                    if (!$scope.configData.Day0DonateCryo) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 1) {//"Cryo"
                                    if (!$scope.configData.Day0Cryo) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 3) {//IVF
                                    if (!$scope.configData.Day0IVF) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 4) {//ICSI
                                    if (!$scope.configData.Day0ICSI) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 5) {//IMSI
                                    if (!$scope.configData.Day0IMSI) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 11) {//ICSI/PICSI
                                    if (!$scope.configData.Day0ICSI) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 12) {//PICSI
                                    if (!$scope.configData.Day0ICSI) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }
                            if ($scope.IVFPlanList[i] != undefined) {
                                if ($scope.IVFPlanList[i].ID == 13) {//ICSI/IMSI
                                    if (!$scope.configData.Day0ICSI) {
                                        $scope.IVFPlanList.splice(i, 1);
                                    }
                                }
                            }


                        }
                    }
                    for (var i = $scope.IVFPlanList.length - 1; i >= 0; i--) {
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 3) {//"IVF"
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                    }
                }
                else
                {
                    for (var i = $scope.CopyData.length - 1; i >= 0; i--) {
                        debugger;
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 1) { //"Cryo"
                                if (!$scope.configData.Day0Cryo) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 2) {//Discard
                                if (!$scope.configData.Day0Discard) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 3) { //"IVF"
                                if (!$scope.configData.Day0IVF) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 11) {//"ICSI/PICSI"
                                if (!$scope.configData.Day0ICSI) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 5) {//IMSI
                                if (!$scope.configData.Day0IMSI) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 6) {
                                if (!$scope.configData.Day0Donate) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID ==7 ) {//"Donate Cryo"
                                if (!$scope.configData.Day0DonateCryo) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                    }
                    for (var i = $scope.IVFPlanList.length - 1; i >= 0; i--) {
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 1) { //"Cryo"
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 11) {//"ICSI/PICSI"
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 5) {//IMSI
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 12) { //"PICSI"
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                        //if ($scope.IVFPlanList[i] != undefined) {
                        //    if ($scope.IVFPlanList[i].ID ==7) {// "Donate Cryo"
                        //        $scope.IVFPlanList.splice(i, 1);
                        //    }
                        //}
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 5) {//IMSI
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 4) {//"ICSI"
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 13) {//"ICSI/IMSI"
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                    };
                }
              //  console.log($scope.CoupleDetails.FemalePatient);
                //if ($scope.CoupleDetails.FemalePatient.ArtSubTypeID == 8 &&
                //    $scope.CoupleDetails.FemalePatient.ArtTypeID == 1 && $scope.Day0.TypeCase == 2) {
                //    $scope.IVFPlanList.splice(-5, 5);
                //    console.log($scope.IVFPlanList);
                //}
            });
            $scope.DenudationFlag = false;
        }
    }
    $scope.Maturitysettings = function () {
        debugger;
        if ($scope.Day0.Maturity != 0) {
            if ($scope.Day0.Maturity == 1 || $scope.Day0.Maturity == 2) {
                //Fill Plan Master
                var ResponseData = Common.getMasterList('M_IVF_PlanMaster', 'IVFPlanID', 'Description');
                ResponseData.then(function (Response) {
                    Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
                    $scope.IVFPlanList = Response.data;
                    $scope.CopyData = angular.copy($scope.IVFPlanList);
                    //Get The Page Visibility Config Data By Vikrant 
                    $scope.configData = PageConfig.getObj();
                    for (var i = $scope.CopyData.length - 1; i >= 0; i--) {
                        debugger;
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 1) {
                                if (!$scope.configData.Day0Cryo) { //"Cryo"
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 2) { //Discard
                                if (!$scope.configData.Day0Discard) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 3) { //"IVF"
                                if (!$scope.configData.Day0IVF) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 4) {//"ICSI"
                                if (!$scope.configData.Day0ICSI) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 5) { //IMSI
                                if (!$scope.configData.Day0IMSI) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 6) {
                                if (!$scope.configData.Day0Donate) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].Description == 7) { //"Donate Cryo"
                                if (!$scope.configData.Day0DonateCryo) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                    }
                    $scope.Day0.Plan = 2;
                    $scope.DenudationFlag = true;
                });

                $scope.Day0.Plan = 2;
                $scope.DenudationFlag = true;

            }
            else {
                var ResponseData = Common.getMasterList('M_IVF_PlanMaster', 'IVFPlanID', 'Description');
                ResponseData.then(function (Response) {
                    Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
                    $scope.IVFPlanList = Response.data;
                    $scope.CopyData = angular.copy($scope.IVFPlanList);
                    //Get The Page Visibility Config Data By Vikrant 
                    $scope.configData = PageConfig.getObj();
                    for (var i = $scope.CopyData.length - 1; i >= 0; i--) {
                        debugger;
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 1) {//"Cryo"
                                if (!$scope.configData.Day0Cryo) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID ==2) {//"Discard"
                                if (!$scope.configData.Day0Discard) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 3) {// "IVF"
                                if (!$scope.configData.Day0IVF) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 11) {//"ICSI/PICSI"
                                if (!$scope.configData.Day0ICSI) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID ==5) { //IMSI
                                if (!$scope.configData.Day0IMSI) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 6) {
                                if (!$scope.configData.Day0Donate) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].Description == 7) {//"Donate Cryo"
                                if (!$scope.configData.Day0DonateCryo) {
                                    $scope.IVFPlanList.splice(i, 1);
                                }
                            }
                        }
                    }
                    for (var i = $scope.IVFPlanList.length - 1; i >= 0; i--) {
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 2) {//"Discard"
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 3) {// "IVF"
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                        if ($scope.IVFPlanList[i] != undefined) {
                            if ($scope.IVFPlanList[i].ID == 6) {
                                $scope.IVFPlanList.splice(i, 1);
                            }
                        }
                    };
                });

                $scope.Day0.Plan = 0;
                $scope.DenudationFlag = false;
            }
        }
        else {
            $scope.DenudationFlag = true;
        }
    }
});
/* https://github.com/wender/angular-multiple-file-upload */
PIVF.directive('fileUpload', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        template: '<div ng-transclude></div>',
        replace: true,
        transclude: true,
        scope: {
            headers: '=',
            ngModel: '=',
            disabled: '='
        },
        require: 'ngModel',
        link: function (scope, el, attr) {
            var fileName,
                shareCredentials,
                withPreview,
                fileSelector,
                resize,
                maxWidth = 100,
                maxHeight = 100,
                sel;

            fileName = attr.name || 'userFile';
            shareCredentials = attr.credentials === 'true';
            withPreview = attr.preview === 'true';
            resize = attr.resize === 'true';
            maxWidth = angular.isDefined(attr.maxWidth) ? parseInt(attr.maxWidth) : false;
            maxHeight = angular.isDefined(attr.maxHeight) ? parseInt(attr.maxHeight) : false;
            fileSelector = angular.isDefined(attr.fileSelector) ? attr.fileSelector : false;

            el.append('<input style="display: none !important;" type="file" ' + (attr.multiple == 'true' ? 'multiple' : '') + ' accept="' + (attr.accept ? attr.accept : '') + '" name="' + fileName + '"/>');

            function Resize(file, index, type) {
                var canvas = document.createElement("canvas");
                var img = document.createElement("img");
                var reader = new FileReader();
                reader.onload = function (e) {
                    img.src = e.target.result;
                    draw();
                };
                reader.readAsDataURL(file);

                function b64toBlob(b64Data, contentType, sliceSize) {
                    contentType = contentType || '';
                    sliceSize = sliceSize || 512;

                    var byteCharacters = atob(b64Data);
                    var byteArrays = [];

                    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                        var slice = byteCharacters.slice(offset, offset + sliceSize);

                        var byteNumbers = new Array(slice.length);
                        for (var i = 0; i < slice.length; i++) {
                            byteNumbers[i] = slice.charCodeAt(i);
                        }

                        var byteArray = new Uint8Array(byteNumbers);

                        byteArrays.push(byteArray);
                    }

                    var blob = new Blob(byteArrays, { type: contentType });
                    return blob;
                }

                function draw() {
                    var width = img.width;
                    var height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    if (width > 0 && height > 0) {
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                        var b64 = canvas.toDataURL(type).split(',')[1];
                        file = b64toBlob(b64, type, 512);
                    }

                    uploadFile(file, index);
                }
            }

            function upload(fileProperties, index, file) {
                if (resize && maxWidth && maxHeight && (file.type.indexOf('image/') !== -1)) {
                    Resize(file, index, file.type);
                } else {
                    uploadFile(file, index);
                }
                return angular.extend(scope.ngModel[index], {
                    name: fileProperties.name,
                    size: fileProperties.size,
                    type: fileProperties.type,
                    status: {},
                    percent: 0,
                    preview: null
                });
            }

            function uploadFile(file, index) {
                var xhr = new XMLHttpRequest(),
                    fd = new FormData(),
                    progress = 0,
                    uri = attr.uri || '/upload/upload';
                xhr.open('POST', uri, true);
                xhr.withCredentials = shareCredentials;
                if (scope.headers) {
                    scope.headers.forEach(function (item) {
                        xhr.setRequestHeader(item.header, item.value);
                    });
                }
                xhr.onreadystatechange = function () {
                    scope.ngModel[index].status = {
                        code: xhr.status,
                        statusText: xhr.statusText,
                        response: xhr.response
                    };
                    scope.$apply();
                };
                xhr.upload.addEventListener("progress", function (e) {
                    progress = parseInt(e.loaded / e.total * 100);
                    scope.ngModel[index].percent = progress;
                    scope.$apply();
                }, false);

                fd.append(fileName, file);
                xhr.send(fd);

                if (!withPreview) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        scope.ngModel[index].preview = e.target.result;
                        scope.$apply();
                    };
                    reader.readAsDataURL(file);
                }
            }

            $timeout(function () {
                sel = fileSelector ? angular.element(el[0].querySelectorAll(fileSelector)[0]) : el;
                sel.bind('click', function () {
                    if (!scope.disabled) {
                        scope.$eval(el.find('input')[0].click());
                    }
                });
            });

            angular.element(el.find('input')[0]).bind('change', function (e) {
                var files = e.target.files;
                if (!angular.isDefined(scope.ngModel) || attr.multiple === 'true') {
                    scope.ngModel = [];
                }
                var f;
                for (var i = 0; i < files.length && i <= 4; i++) {
                    f = {
                        name: files[i].name,
                        size: files[i].size,
                        type: files[i].type,
                        status: {},
                        percent: 0,
                        preview: null
                    };
                    scope.ngModel.push(f);
                    upload(f, i, files[i]);
                }
                scope.$apply();
            })
        }
    }
}]);