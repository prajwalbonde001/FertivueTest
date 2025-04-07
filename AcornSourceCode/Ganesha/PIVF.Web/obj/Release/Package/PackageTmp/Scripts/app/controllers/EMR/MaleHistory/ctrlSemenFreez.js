'use strict';

angular.module('PIVF').controller('ctrlSemenFreez', function ($rootScope, $scope, $location, AlertMessage, swalMessages, localStorageService, Common, srvCommon, srvSemenFreez, $filter, SemenAnalysisService, usSpinnerService) {
    //  $scope.bigTotalItems = 0;
    $rootScope.FormName = 'Semen Freezing';
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    var objResource = {};
    $scope.IsUpdateFinalize = false;
    $scope.ViewBtnName = 'View';
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    usSpinnerService.spin('GridSpinner');
    $scope.IsViewBtnDisable = true;
    $scope.SemenFreez = {};
    $scope.ListItem = [];

    $scope.selectedPatient = {};
    $scope.selectedPatient = Common.getSelectedPatient();
    // for sorting    
    $scope.SortColumn1 = "TDate";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.btnSaveUpdate = "Save";

    //Change by  Manohar 
    $scope.IsEnableDisableLinkBtn = true;
    $scope.SurgicalSpermRetrieval = {};
    /*START : Visible*/
    $scope.LeftVisible = true;
    $scope.RightVisible = true;
    /*END : Visible*/

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.open = function ($event, Item) {
        $event.preventDefault();
        $event.stopPropagation();
        Item.opened = true;
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

    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(),//.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.dateOptionExpDate = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date(),//new Date().setYear(new Date().getYear() - 100),
        startingDay: 1,
        showWeeks: false
    };
    //Code for Cancel button click to redirect
    $scope.CancelMain = function CancelMain() {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    };

    $scope.LoadData = function LoadData() {
        $scope.ismeridian = true;
        $scope.maxTime = new Date();
        $scope.SemenFreez.SpremFreezingTime = new Date();//.setHours(0, 0, 0, 0);
        $scope.SemenFreez.CollectionTime = new Date();//new Date().setHours(0, 0, 0, 0);
        $scope.SemenFreez.ReceivingTime = new Date();//.setHours(0, 0, 0, 0);
        $scope.SemenFreez.SpremFreezingDate = new Date();
        $scope.SemenFreez.CollectionDate = new Date();
        $scope.SemenFreez.ReceivingDate = new Date();

        $scope.GetSemenFreezList();
        $scope.SpermTypeList();
        $scope.FillAbstinenceList();
        $scope.FillViscosityList();
        $scope.VialsList();
        $scope.FillTankList();
        $scope.FillCanisterList();
        $scope.FillCanList();
        //$scope.GobletColorList();
        //$scope.GobletSizeList();
        $scope.GetEmbryologyDoctorsList();
        if ($scope.ListItem.length == 0)
            $scope.GetMaxID();


        $scope.disable = true;
        $scope.GetUserrights();
    }

    // Get SemenFreez Data to display on Table Content
    $scope.GetSemenFreezList = function () {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = srvSemenFreez.GetSemenFreezList(0, 0);
        ResponseData.then(function (Response) {

            usSpinnerService.stop('GridSpinner');
            $scope.SemenFreezList = Response.data;

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });
    }
    //Code to validate Time on Date Change
    $scope.ChangeFreezingTime = function () {

        $scope.SemenFreez.SpremFreezingTime = $scope.SemenFreez.SpremFreezingDate;
    };
    //Code to validate Time on Date Change
    $scope.ChangeCollectionTime = function () {
        $scope.SemenFreez.CollectionTime = $scope.SemenFreez.CollectionDate;
    };
    //Code to validate Time on Date Change
    $scope.ChangeReceivingTime = function () {
        $scope.SemenFreez.ReceivingTime = $scope.SemenFreez.ReceivingDate;
    };

    // Get SemenFreez Data to Update
    $scope.GetSemenFreezListByFormNo = function (FormNo, Action, ID, UnitID) {
        debugger;
        if (Action == "SpremFreezing") {
            usSpinnerService.spin('GridSpinner');
            var ResponseData = srvSemenFreez.GetSemenFreezListByFormNo(FormNo, Action, ID, UnitID);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                $scope.SemenFreez = Response.data[0];
                $scope.SemenFreez.CollectionDate = new Date(Response.data[0].CollectionDate);
                $scope.SemenFreez.ReceivingDate = new Date(Response.data[0].ReceivingDate);
                $scope.SemenFreez.SpremFreezingDate = new Date(Response.data[0].SpremFreezingDate);
                $scope.SemenFreez.CollectionTime = new Date(Response.data[0].CollectionTime);
                $scope.SemenFreez.ReceivingTime = new Date(Response.data[0].ReceivingTime);
                $scope.SemenFreez.SpremFreezingTime = new Date(Response.data[0].SpremFreezingTime);
                $scope.IsUpdateFinalize = $scope.SemenFreez.IsFinalized;

                //Change Save Button Name
                $scope.btnSaveUpdate = "Update";
                //$scope.FormNo = FormNo;
                $scope.GetUserrights();
                if (!$scope.isNullOrUndefined($scope.SemenFreez.SSRNo)) {
                    $scope.ViewBtnName = $scope.SemenFreez.SSRNo;
                    $scope.IsViewBtnDisable = false;
                }
                else {
                    $scope.ViewBtnName = 'View';
                    $scope.IsViewBtnDisable = true;
                }

            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }
        else if (Action == "SpremFreezingDetails") {
            usSpinnerService.spin('GridSpinner');
            var ResponseData = srvSemenFreez.GetSemenFreezListByFormNo(FormNo, Action, ID, UnitID);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                //$scope.SpremFreezingDetailsList = Response.data;
                $scope.ListItem = Response.data;
                angular.forEach($scope.ListItem, function (item, index) {
                    item["ExpiryDate"] = new Date(item["ExpiryDate"]);
                })

                // $scope.AddRow();
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }
    };

    $scope.isNullOrUndefined = function (value) {
        return (!value) && (value === null)
    }
    $scope.RedirectSelf = function RedirectSelf(FormNo, ID, UnitID) {
        debugger;
        $scope.GetSemenFreezListByFormNo(FormNo, "SpremFreezing", 0, UnitID);
        $scope.GetSemenFreezListByFormNo(FormNo, "SpremFreezingDetails", 0, UnitID);
    };

    //Get Selected sperm Data into Model 
    $scope.GetSALinkByPatientID = function (MethodOfSurgicalSpermRetrivalID) {
        //Code change to get 'M_MethodSurgicalSRetrieval' ID value which is -2  by M_SpermType ID 

        var ResponseData = SemenAnalysisService.GetSALinkByPatientID(MethodOfSurgicalSpermRetrivalID - 2);
        ResponseData.then(function (Response) {
            $scope.GetSALinkByPatientIDList = Response.data;
        }, function (error) {
        });
    }
    //Enable or Disable Link Button
    $scope.EnableDisableLinkBtn = function () {
        if ($scope.SemenFreez.SpermTypeID < 2)
            $scope.IsEnableDisableLinkBtn = true;
        else
            $scope.IsEnableDisableLinkBtn = false;
    }

    //Allow only one check box selection at time 
    $scope.updateSelection = function (position, entities) {
        angular.forEach(entities, function (subscription, index) {
            if (position != index)
                subscription.selected = false;
        });
    }

    $scope.UpdateLinkFinalize = function UpdateLinkFinalize(SemenAnalysis) {
        $scope.sNoArray = [];
        $scope.IsViewBtnDisable = true;
        //debugger
        angular.forEach($scope.GetSALinkByPatientIDList, function (item) {
            if (!!item.selected) $scope.sNoArray.push(item.SNo);
            $scope.IsViewBtnDisable = false;
        })

        if ($scope.sNoArray.length < 1) {
            AlertMessage.info('PalashIVF', 'Please select atleast one item.');
            return;
        } else {
            $scope.ViewBtnName = $scope.sNoArray[0];
        }
    }

    //Redirect to Sergical Sperm Retrival
    $scope.RedirectToRetrival = function RedirectToRetrival(SSRNo) {
        debugger;
        var ResponseData = SemenAnalysisService.GetSurgicalSpermRetrivalByPatientID(SSRNo);
        ResponseData.then(function (Response) {

            $scope.SurgicalSpermRetrieval = Response.data[0];
            $scope.SurgicalSpermRetrieval.SSRDate = new Date($scope.SurgicalSpermRetrieval.SSRDate);
            $scope.SurgicalSpermRetrieval.SSRTime = $scope.SurgicalSpermRetrieval.SSRTime;

            $scope.IndicationChanged();
            $scope.SiteChangedEvent();
            $scope.FetchComplication();
            //Logic for show name in DDL

            //var ComplicationArrayList = $scope.SurgicalSpermRetrieval.ComplicationIDs.split(',');
            //var ComplicationIDByDescTemp = [];
            //for (var i = 0; i < ComplicationArrayList.length; i++) {
            //    // Trim the excess whitespace.
            //    ComplicationIDByDescTemp.push($scope.ComplicationList[(ComplicationArrayList[i].replace(/^\s*/, "").replace(/\s*$/, "")) - 1].Description);
            //    $scope.SurgicalSpermRetrieval.ComplicationIDByDesc = ComplicationIDByDescTemp.join();
            //}
        }, function (error) {
        });
    };
    //Used to bind description to Complication SSR Form
    $scope.FetchComplication = function FetchComplication() {
        debugger;
        var ResponseData = Common.getMasterList('M_SSRComplication', 'SSRComplicationId', 'SSRDescription');
        ResponseData.then(function (Response) {
            ////
            //Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ComplicationList = Response.data;

            var ComplicationArrayList = $scope.SurgicalSpermRetrieval.ComplicationIDs.split(',');
            var ComplicationIDByDescTemp = [];
            for (var i = 0; i < ComplicationArrayList.length; i++) {
                // Trim the excess whitespace.
                ComplicationIDByDescTemp.push($scope.ComplicationList[(ComplicationArrayList[i].replace(/^\s*/, "").replace(/\s*$/, "")) - 1].Description);
                $scope.SurgicalSpermRetrieval.ComplicationIDByDesc = ComplicationIDByDescTemp.join();
            }

        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.IndicationChanged = function IndicationChanged() {
        if ($scope.SurgicalSpermRetrieval.IndicationID == 1) {
            //
            var ResponseData = Common.getMasterList('M_IndicationObstructive', 'ID', 'Description');
            ResponseData.then(function (Response) {
                //
                Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
                $scope.IndicationObstructiveList = Response.data;
                if ($scope.SurgicalSpermRetrieval.IndicationObstructiveID == undefined) {
                    $scope.SurgicalSpermRetrieval.IndicationObstructiveID = 0;
                }
            }, function (error) {
                $scope.Error = error;
            });
        } else if ($scope.SurgicalSpermRetrieval.IndicationID == 2) {
            //
            var ResponseData = Common.getMasterList('M_IndicationNonObstructive', 'ID', 'Description');
            ResponseData.then(function (Response) {
                //
                Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
                $scope.IndicationObstructiveList = Response.data;
                if ($scope.SurgicalSpermRetrieval.IndicationObstructiveID == undefined) {
                    $scope.SurgicalSpermRetrieval.IndicationObstructiveID = 0;
                }
            }, function (error) {
                $scope.Error = error;
            });
        } else {
            $scope.IndicationObstructiveList = [];
            $scope.IndicationObstructiveList.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SurgicalSpermRetrieval.IndicationObstructiveID = 0;
        }
    }
    $scope.SiteChangedEvent = function SiteChangedEvent() {

        if ($scope.SurgicalSpermRetrieval.SiteID == 1) {
            //Left
            $scope.LeftVisible = false;
            $scope.RightVisible = true;
        } else if ($scope.SurgicalSpermRetrieval.SiteID == 2) {
            //Right
            $scope.RightVisible = false;
            $scope.LeftVisible = true;
        } else {
            //Both
            $scope.LeftVisible = true;
            $scope.RightVisible = true;
        }
    }

    $scope.SpermTypeList = function SpermTypeList() {
        var ResponseData = Common.getMasterList('M_SpermType', 'SpermTypeID', 'SpermDescription');
        ResponseData.then(function (Response) {
            // var tmpArr = [0, 6, 8, 10, 12, 13];
            Response.data.splice(1, 1);
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SpermTypeList1 = Response.data;//.filter(x=>tmpArr.includes(x.ID));
            $scope.SemenFreez.SpermTypeID = 0;
        }, function (error) {
        });
    };

    $scope.FillAbstinenceList = function FillAbstinenceList() {
        //  
        var ResponseData = Common.getMasterList('M_Abstinence', 'AbstID', 'Description');
        ResponseData.then(function (Response) {
            //     
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AbstinenceList = Response.data;
            $scope.SemenFreez.AbstinenceID = 0;
        }, function (error) {
        });
    };

    $scope.FillViscosityList = function FillViscosityList() {
        var ResponseData = Common.getMasterList('M_IVF_Viscosity', 'IVFViscosityID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ViscosityList = Response.data;
            $scope.SemenFreez.ViscosityID = 0;
        }, function (error) {
        });
    }

    $scope.FillSpillageList = function FillSpillageList() {
        var ResponseData = Common.getMasterList('M_IVF_Viscosity', 'IVFViscosityID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SpillageList = Response.data;
            $scope.SemenFreez.SpillageID = 0;
        }, function (error) {
        });
    }

    $scope.FillTankList = function FillTankList() {
        var ResponseData = Common.getMasterList('M_IVFTankMaster_Andrology', 'IVFTANKID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.TankList = Response.data;
            //$scope.SemenFreez.TankId = 0;
        }, function (error) {
        });
    }

    $scope.FillCanisterList = function FillCanisterList() {
        var ResponseData = Common.getMasterList('M_IVFCanisterMaster_Andrology', 'IVFCANISTERID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.CanisterList = Response.data;
            //       $scope.SemenFreez.CanisterID = 0;
        }, function (error) {
        });
    };

    $scope.FillCanList = function FillCanList() {
        var ResponseData = Common.getMasterList('M_IVFCanMaster_Andrology', 'IVFCANID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.CanList = Response.data;
            //    $scope.SemenFreez.CanID = 0;
        }, function (error) {
        });
    };
    //Code Commented as per discussion to remove Goblet Color  column
    //$scope.GobletColorList = function GobletColorList() {
    //    var ResponseData = Common.getMasterList('M_IVFGobletColor', 'IVFGCOLORID', 'Description');
    //    ResponseData.then(function (Response) {
    //        //  
    //        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
    //        $scope.GobletColorList = Response.data;
    //        //    $scope.SemenFreez.GobletColorID = 0;
    //    }, function (error) {
    //    });
    //}

    $scope.VialsList = function VialsList() {
        var ResponseData = Common.getMasterList('M_IVFStrawMaster', 'IVFStrawID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.VialsList1 = Response.data;
            //   $scope.SemenFreez.StrawId = 0;
        }, function (error) {
        });
    }

    //Code Commented as per discussion to remove Goblet Size column
    //$scope.GobletSizeList = function GobletSizeList() {
    //    var ResponseData = Common.getMasterList('M_IVFGobletSizeMaster', 'IVFGobletSizeID', 'Description');
    //    ResponseData.then(function (Response) {
    //        //  
    //        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
    //        $scope.GobletSizeList = Response.data;
    //        //    $scope.SemenFreez.GobletSizeId = 0;
    //    }, function (error) {
    //    });
    //}

    $scope.GetEmbryologyDoctorsList = function FillCanList() {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //  
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
          
            $scope.DocList = Response.data;
            $scope.SemenFreez.DoneBy = 0;
            $scope.SemenFreez.WitnessedBy = 0;
        }, function (error) {
        });
    };

    $scope.AddRow = function () {
        //  
        //$scope.CryoID = parseInt($scope.CryoID) + 1;
        //var len = Math.ceil(Math.log($scope.CryoID + 1) / Math.LN10);
        //if (len == 1) $scope.CryoID = '000' + $scope.CryoID;
        //else if (len == 2) $scope.CryoID = '00' + $scope.CryoID;
        //else if (len == 3) $scope.CryoID = '0' + $scope.CryoID;
        if ($scope.ListItem.length < 10) {
            $scope.ListItem.push({
                CryoNo: "",// "GS/" + JSON.parse(localStorageService.getItem('UserInfo')).UnitID + "/" + new Date().getFullYear() + "/CPS/" + $scope.CryoID,
                TankId: 0,
                CanisterID: 0,
                CanID: 0,
                //GobletColorID: 0,
                //GobletSizeId: 0,
                StrawId: 0,
                Volume: "",
                ExpiryDate: new Date().setMonth(new Date().getMonth() + 3),
                Remark: ""
            });
        }
    }

    $scope.GetMaxID = function () {
        var ResponseData = srvSemenFreez.GetMaxID();
        ResponseData.then(function (Response) {

            $scope.CryoID = Response.data;
            $scope.AddRow();
        }, function (error) {
        });
    }

    $scope.RemoveRow = function RemoveRow(idx) {
        //   
        if ($scope.ListItem.length > 1) {
            $scope.ListItem.splice(idx, 1);
            $scope.SemenFreez.NoOfVials = $scope.SemenFreez.NoOfVials - 1
        }
        else {
            AlertMessage.info('PalashIVF', 'Atleast one Vial is mandatory.');
        }

    }

    $scope.CheckDuplicateCryoNo = function CheckDuplicateCryoNo(idx,Item) {
        debugger;
        var ResponseData = srvSemenFreez.CheckDuplicateCryoNo(Item);
        ResponseData.then(function (Response) {
            if (Response.data == 1) {

                AlertMessage.info('PalashIVF', 'Cryo No is already present');
                
                for (var i = 0; i <= $scope.ListItem.length - 1; i++) {
                    if (idx == i) {
                        $scope.ListItem[i].CryoNo = "";
                    }
                }               
            }
        }, function (error) {
        });
    }

    $scope.SaveUpdate = function (SemenFreez) {
        debugger;
        if ($scope.ValidateSemenFreez() && $scope.frmSemenFreez.$valid && $scope.IsValidSemenFreezDetail) {
            SemenFreez.CollectionDate = $filter('date')(SemenFreez.CollectionDate, 'medium');
            SemenFreez.ReceivingDate = $filter('date')(SemenFreez.ReceivingDate, 'medium');
            SemenFreez.SpremFreezingDate = $filter('date')(SemenFreez.SpremFreezingDate, 'medium');
            SemenFreez.CollectionTime = $filter('date')(SemenFreez.CollectionTime, 'medium');
            SemenFreez.ReceivingTime = $filter('date')(SemenFreez.ReceivingTime, 'medium');
            SemenFreez.SpremFreezingTime = $filter('date')(SemenFreez.SpremFreezingTime, 'medium');
            SemenFreez.lstFreezDetails = $scope.ListItem;
            if ($scope.sNoArray != null)
                SemenFreez.SSRNo = $scope.sNoArray[0];

            var Promise = srvSemenFreez.SaveUpdate(SemenFreez);
            Promise.then(function (resp) {
                // 
                if (resp.data == 1)
                    AlertMessage.info('PalashIVF', 'Record saved successfully.');
                else if (resp.data == 2)
                    AlertMessage.info('PalashIVF', 'Record updated successfully.');
                
                $scope.LoadData();
                ////Clear All Fields
                //    $scope.GetSemenFreezList();
                //    clearForm();
                //   $scope.SemenFreez = {};
                /////////////////////////////
            }, function (error) {
            });
        }
        else {
            $scope.frmSemenFreez.ddlTypeofSperm.$dirty = true;
            $scope.frmSemenFreez.txtCryoNo.$dirty = true;
            $scope.frmSemenFreez.txtVolume.$dirty = true;;
            $scope.frmSemenFreez.txtSpermConce.$dirty = true;
            $scope.frmSemenFreez.txtProgressive.$dirty = true;
            $scope.frmSemenFreez.txtNonProgressive.$dirty = true;
            $scope.frmSemenFreez.txtImmotile.$dirty = true;
            $scope.frmSemenFreez.ddlDoneby.$dirty = true;
            $scope.frmSemenFreez.ddlWitnessedby.$dirty = true;
            $scope.frmSemenFreez.txtFormNo.$dirty = true;
        }
    }

    $scope.CalculateMotilityAss = function () {

        if ((angular.isDefined($scope.SemenFreez.GradeA) && $scope.SemenFreez.GradeA != '') && (angular.isDefined($scope.SemenFreez.GradeB) && $scope.SemenFreez.GradeB != '')) {
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            $scope.ChkImmotile();
            $scope.SemenFreez.GradeC = 100 - (parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB));
            if ($scope.SemenFreez.GradeC < 0) {
                //  $scope.SemenFreez.GradeA = $scope.OGradeA;
                $scope.SemenFreez.GradeB = $scope.OGradeB;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isDefined($scope.SemenFreez.GradeA) && $scope.SemenFreez.GradeA != '') && ($scope.SemenFreez.GradeB == '' || angular.isUndefined($scope.SemenFreez.GradeB)) && (angular.isDefined($scope.SemenFreez.GradeC) && $scope.SemenFreez.GradeC != '')) {
            $scope.SemenFreez.GradeB = 100 - (parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeC));
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            if ($scope.SemenFreez.GradeB < 0) {
                //   $scope.SemenFreez.GradeA = $scope.OGradeA;
                $scope.SemenFreez.GradeB = $scope.OGradeB;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isUndefined($scope.SemenFreez.GradeA) || $scope.SemenFreez.GradeA == '') && ($scope.SemenFreez.GradeB != '' || angular.isDefined($scope.SemenFreez.GradeB)) && (angular.isDefined($scope.SemenFreez.GradeC) && $scope.SemenFreez.GradeC != '')) {
            $scope.SemenFreez.GradeA = 100 - (parseInt($scope.SemenFreez.GradeB) + parseInt($scope.SemenFreez.GradeC));
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            if ($scope.SemenFreez.GradeA < 0) {
                //   $scope.SemenFreez.GradeA = $scope.OGradeA;
                //    $scope.SemenFreez.GradeB = $scope.OGradeB;
                $scope.SemenFreez.GradeA = null;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        if (angular.isDefined($scope.SemenFreez.GradeA) && $scope.SemenFreez.GradeA != '')
            $scope.disable = false;
        else {
            $scope.IsMandatory = false;
            $scope.SemenFreez.SlowProgressive = null;
            $scope.SemenFreez.RapidProgressive = null;
            $scope.disable = true;
        }
    }

    $scope.ChkImmotile = function () {
        //  
        if (parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB) + parseInt($scope.SemenFreez.GradeC) > 100)
            AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
    }

    $scope.CalcRapidProg = function () {
        //   

        if ($scope.SemenFreez.GradeA == undefined || $scope.SemenFreez.GradeA == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            //  if (parseInt($scope.ORapidProgressive) != parseInt($scope.SemenFreez.RapidProgressive)) {
            $scope.SemenFreez.RapidProgressive = parseInt($scope.SemenFreez.GradeA) - parseInt($scope.SemenFreez.SlowProgressive);

            if ($scope.SemenFreez.RapidProgressive < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.SemenFreez.RapidProgressive = $scope.ORapidProgressive;
                $scope.SemenFreez.SlowProgressive = $scope.OSlowProgressive;
            }
            if (parseInt($scope.SemenFreez.SlowProgressive))
                $scope.IsMandatory = true;
            else $scope.IsMandatory = false;
            //  }
        }
    }

    $scope.CalcSlowProg = function () {

        if ($scope.SemenFreez.GradeA == undefined || $scope.SemenFreez.GradeA == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            //if (parseInt($scope.OSlowProgressive) != parseInt($scope.SemenFreez.SlowProgressive)) {

            $scope.SemenFreez.SlowProgressive = parseInt($scope.SemenFreez.GradeA) - parseInt($scope.SemenFreez.RapidProgressive);
            if ($scope.SemenFreez.SlowProgressive < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.SemenFreez.SlowProgressive = $scope.OSlowProgressive;
                $scope.SemenFreez.RapidProgressive = $scope.ORapidProgressive;
            }
            if (parseInt($scope.SemenFreez.RapidProgressive))
                $scope.IsMandatory = true;
            else $scope.IsMandatory = false;
            //}
        }
    }

    $scope.AdvTotProgMotility = function () {    // not in use
        if ($scope.SemenFreez.GradeA == undefined || $scope.SemenFreez.GradeA == '') {
            AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
        }
        else {
            if ($scope.OSlowProgressive != parseInt($scope.SemenFreez.SlowProgressive)) {
                //if ((angular.isDefined($scope.SemenFreez.RapidProgressive) || $scope.SemenFreez.RapidProgressive == '')) {
                if (isNaN($scope.SemenFreez.SlowProgressive)) $scope.SemenFreez.SlowProgressive = '';
                if (isNaN($scope.SemenFreez.RapidProgressive)) $scope.SemenFreez.RapidProgressive = '';
                $scope.SemenFreez.RapidProgressive = parseInt($scope.SemenFreez.GradeA) - parseInt($scope.SemenFreez.SlowProgressive);
                if ($scope.SemenFreez.RapidProgressive < 0) {
                    AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                    $scope.SemenFreez.RapidProgressive = '';
                } else {
                    $scope.ORapidProgressive = parseInt($scope.SemenFreez.RapidProgressive);
                    $scope.OSlowProgressive = parseInt($scope.SemenFreez.SlowProgressive);
                    if (parseInt($scope.SemenFreez.SlowProgressive))
                        $scope.IsMandatory = true;
                    else $scope.IsMandatory = false;
                }
                //  }
            }
            else if ($scope.ORapidProgressive != parseInt($scope.SemenFreez.RapidProgressive)) {
                //   if ((angular.isDefined($scope.SemenFreez.SlowProgressive) || $scope.SemenFreez.SlowProgressive == '')) {
                if (isNaN($scope.SemenFreez.SlowProgressive)) $scope.SemenFreez.SlowProgressive = '';
                if (isNaN($scope.SemenFreez.RapidProgressive)) $scope.SemenFreez.RapidProgressive = '';
                if ($scope.SemenFreez.RapidProgressive != '')
                    $scope.SemenFreez.SlowProgressive = parseInt($scope.SemenFreez.GradeA) - parseInt($scope.SemenFreez.RapidProgressive);
                if ($scope.SemenFreez.SlowProgressive < 0) {
                    AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                    $scope.SemenFreez.SlowProgressive = '';
                } else {
                    $scope.OSlowProgressive = parseInt($scope.SemenFreez.SlowProgressive);
                    $scope.ORapidProgressive = parseInt($scope.SemenFreez.RapidProgressive);
                    if (parseInt($scope.SemenFreez.RapidProgressive))
                        $scope.IsMandatory = true;
                    else $scope.IsMandatory = false;
                }
                //  }
            }
        }
    }
    //$scope.$watch('SemenFreez.SlowProgressive', function (newValue, oldValue) {
    //        
    //        $scope.SemenFreez.RapidProgressive = 100 - parseInt(newValue);
    //        if (parseInt(newValue))
    //            $scope.IsMandatory = true;
    //        else $scope.IsMandatory =false;
    //});
    //$scope.$watch('SemenFreez.RapidProgressive', function (newValue, oldValue) {
    //    
    //    $scope.SemenFreez.SlowProgressive = 100 - parseInt(newValue);
    //    if (parseInt(newValue))
    //        $scope.IsMandatory = true;
    //    else $scope.IsMandatory = false;
    //});


    ////Start Report 
    $scope.PrintSemenFreez = function PrintSemenFreez(Item) {
        debugger;
        //var a = encodeURIComponent('U=' + Item.SNo + '&SNo=' + Item.SNo + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&FrmNo=' + Item.FormNo + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PU=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID);
        // var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&FrmNo=' + Item.FormNo );

        window.open('/Reports/EMR/SemenFreez.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    //END Report


    $scope.ValidateSemenFreez = function () {
        debugger;
        var IsValid = true;

        // Begin : Added on 29Jul2021 to solve validation issue while save
        $scope.SemenFreez.CollectionDate = new Date($scope.SemenFreez.CollectionDate.getFullYear(), $scope.SemenFreez.CollectionDate.getMonth(), $scope.SemenFreez.CollectionDate.getDate(),
            $scope.SemenFreez.CollectionTime.getHours(), $scope.SemenFreez.CollectionTime.getMinutes(), 0);

        $scope.SemenFreez.SpremFreezingDate = new Date($scope.SemenFreez.SpremFreezingDate.getFullYear(), $scope.SemenFreez.SpremFreezingDate.getMonth(), $scope.SemenFreez.SpremFreezingDate.getDate(),
              $scope.SemenFreez.SpremFreezingTime.getHours(), $scope.SemenFreez.SpremFreezingTime.getMinutes(), 0);

        $scope.SemenFreez.ReceivingDate = new Date($scope.SemenFreez.ReceivingDate.getFullYear(), $scope.SemenFreez.ReceivingDate.getMonth(), $scope.SemenFreez.ReceivingDate.getDate(),
              $scope.SemenFreez.ReceivingTime.getHours(), $scope.SemenFreez.ReceivingTime.getMinutes(), 0);
        // End : Added on 29Jul2021 to solve validation issue while save

        //if ($Scope.SemenFreez.DoneBy == $scope.SemenFreez.WitnessedBy) {
        //    AlertMessage.info('PalashIVF', 'Done By and Witnessed By are should not be same');
        //    IsValid = false;
        //}
        //else
        if (new Date($filter('date')($scope.SemenFreez.CollectionDate, 'shortDate')) > new Date($filter('date')($scope.SemenFreez.SpremFreezingDate, 'shortDate'))) {
            AlertMessage.info('PalashIVF', 'Collection date should be less than or equal to Sprem Freezing Date');
            IsValid = false;
        }
        else if (angular.isUndefined($scope.SemenFreez.CollectionTime) || $scope.SemenFreez.CollectionTime == '') {
            AlertMessage.info('PalashIVF', 'Select collection time');
            IsValid = false;
        }
        else if ($filter('date')($scope.SemenFreez.CollectionTime, 'short') > $filter('date')($scope.SemenFreez.SpremFreezingTime, 'short') && new Date($filter('date')($scope.SemenFreez.CollectionDate, 'shortDate')) == new Date($filter('date')($scope.SemenFreez.SpremFreezingDate, 'shortDate'))) {
            AlertMessage.info('PalashIVF', 'Collection time should be equal to or less than Sprem Freezing Time');
            IsValid = false;
        }
        else if (angular.isUndefined($scope.SemenFreez.SpremFreezingTime) || $scope.SemenFreez.SpremFreezingTime == '') {
            AlertMessage.info('PalashIVF', 'Select sprem freezing time');
            IsValid = false;
        }
        else if (angular.isUndefined($scope.SemenFreez.ReceivingTime) || $scope.SemenFreez.ReceivingTime == '') {
            AlertMessage.info('PalashIVF', 'Select receiving time');
            IsValid = false;
        }
        else if (new Date($filter('date')($scope.SemenFreez.ReceivingDate, 'shortDate')) < new Date($filter('date')($scope.SemenFreez.CollectionDate, 'shortDate'))) {
            AlertMessage.info('PalashIVF', 'Receiving date should be greater than or equal to Collection Date');
            IsValid = false;
        }
        else if (new Date($filter('date')($scope.SemenFreez.ReceivingDate, 'shortDate')) > new Date($filter('date')($scope.SemenFreez.SpremFreezingDate, 'shortDate'))) {
            AlertMessage.info('PalashIVF', 'Receiving date should be less than Sprem freezing date');
            IsValid = false;
        }
        else if ($filter('date')($scope.SemenFreez.ReceivingTime, 'short') < $filter('date')($scope.SemenFreez.CollectionTime, 'short') && new Date($filter('date')($scope.SemenFreez.ReceivingTime, 'shortDate')) == new Date($filter('date')($scope.SemenFreez.CollectionTime, 'shortDate'))) {
            AlertMessage.info('PalashIVF', 'Receiving time should be greater than or equal to Collection time');
            IsValid = false;
        }
        else if ($filter('date')($scope.SemenFreez.ReceivingTime, 'short') > $filter('date')($scope.SemenFreez.SpremFreezingTime, 'short') && new Date($filter('date')($scope.SemenFreez.ReceivingTime, 'shortDate')) == new Date($filter('date')($scope.SemenFreez.SpremFreezingTime, 'shortDate'))) {
            AlertMessage.info('PalashIVF', 'Receiving time should be less than Sprem freezing time');
            IsValid = false;
        }
        else if ($scope.SemenFreez.SpermTypeID == 0 || $scope.SemenFreez.Volume == undefined || $scope.SemenFreez.SpermConcentration == undefined) { //Added by AniketK on 24Sept2019
            AlertMessage.info('PalashIVF', 'Please select Mandatory fields');
            IsValid = false;
        }
        else if($scope.SemenFreez.DoneBy == 0 || $scope.SemenFreez.WitnessedBy == 0){
            AlertMessage.info('PalashIVF', 'Witnessed By and  Done By can not be empty');
            IsValid = false;
        }
        else if ($scope.SemenFreez.DoneBy == $scope.SemenFreez.WitnessedBy) {
            AlertMessage.info('PalashIVF', 'Witnessed By and  Done By can not be same');
            IsValid = false;
        }

        $scope.ValidateSemenFreezDetail();
        return IsValid;
    }

    $scope.ValidateSemenFreezDetail = function () {
        angular.forEach($scope.ListItem, function (i) {

            i.ExpiryDate = new Date(i.ExpiryDate);
            if (i.TankId == 0)
                i.IsTank = true;
            if (i.VolumeDetail == undefined || i.VolumeDetail == '')
                i.IsVolume = true;
            if (i.CryoNo == undefined || i.CryoNo == '')
                i.IsCryoNo = true;
        })
        $scope.IsValidSemenFreezDetail = true;
        //   $scope.IsValidSemenFreezDetail = $scope.ListItem.some(x => x.TankId == 0 || (x.VolumeDetail == undefined || x.VolumeDetail == ''));
        for (var i = 0; i <= $scope.ListItem.length - 1; i++) {
            if ($scope.ListItem[i].TankId == 0 || ($scope.ListItem[i].VolumeDetail == undefined || $scope.ListItem[i].VolumeDetail == '')) {
                $scope.IsValidSemenFreezDetail = false;
                break;
            }
        }
        //commented by neena for manual cyro no 
        //if ($scope.IsValidSemenFreezDetail) {
        //    angular.forEach($scope.ListItem, function (j) {
        //        $scope.CryoID = parseInt($scope.CryoID) + 1;
        //        var len = Math.ceil(Math.log($scope.CryoID + 1) / Math.LN10);
        //        if (len == 1) $scope.CryoID = '000' + $scope.CryoID;
        //        else if (len == 2) $scope.CryoID = '00' + $scope.CryoID;
        //        else if (len == 3) $scope.CryoID = '0' + $scope.CryoID;
        //        j.CryoNo = "GS/" + localStorageService.get('UserInfo').UnitID + "/" + new Date().getFullYear() + "/CPS/" + $scope.CryoID;
        //    })
        //}
    }

    $scope.checkSum = function (Item) {
        var Sum = 0;
        angular.forEach($scope.ListItem, function (i) {
            Sum = parseFloat(Sum) + parseFloat(i.VolumeDetail);
        })
        if (Sum > parseFloat($scope.SemenFreez.Volume)) {
            AlertMessage.info('PalashIVF', 'The sum of the Line item volumes shall be equal to or less than the Volume in Pre Freezing details');
            Sum = Sum - parseFloat($scope.SemenFreez.Volume);
            Item.VolumeDetail = null;
        }
    }

    $scope.GetUserrights = function () {
        debugger;
        var lstUserRights = Common.getUserRights();
        //  if ($scope.selectedPatient.GenderID == 1) {
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 316 && lstUserRights[z].Active)//Semen Freezing
            {
                $scope.objRgt = lstUserRights[z];
                break;
            }
        }
        //   }
        if (!$scope.objRgt.IsCreate && $scope.btnSaveUpdate == "Save") {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && $scope.btnSaveUpdate == "Update") {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }
        else {
            angular.element(btnSaveUpdate).prop('disabled', false);
        }

        //by arz on 16012018
        if ($scope.IsUpdateFinalize || $scope.IsVisitMarked) {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }

        if (($scope.selectedPatient.VisitID == 0 && $scope.selectedPatient.VisitUnitID == 0) || ($scope.selectedPatient.VisitID == undefined && $scope.selectedPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;
    }

    function clearForm() {
        for (var key in $scope.SemenFreez) {
            if ($scope.SemenFreez.hasOwnProperty(key)) {
                if (typeof $scope.SemenFreez[key] === 'string') {
                    $scope.SemenFreez[key] = undefined;
                }
                else if (typeof $scope.SemenFreez[key] === 'number') {
                    $scope.SemenFreez[key] = 0;
                }
                else if ($scope.SemenFreez[key] instanceof Date) {
                    $scope.SemenFreez[key] = new Date();
                }
                else if ($scope.SemenFreez[key] == 'boolean') {
                    $scope.SemenFreez[key] = false;
                }
            }
        }
    }
});

PIVF.directive('allowDecimalNumbers', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elm, attrs, ngModel, ctrl) {
            elm.on('keydown', function (event) {
                //  
                var model = ngModel.$viewValue;
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9\.]/g, '')
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }

                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    // numbers  
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows     , 110
                    return true;
                } if (model == undefined || model == '') {
                    if (event.which >= 48 && event.which <= 57) {
                        // numbers  
                        return true;
                    } else if (event.which >= 96 && event.which <= 105) {
                        // numpad number  
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
                if (containsDot != null && model.length < 3) {
                    if (event.which >= 48 && event.which <= 57) {
                        // numbers  
                        return true;
                    } else if (event.which >= 96 && event.which <= 105) {
                        // numpad number  
                        return true;
                    }
                } else if ([46, 110, 190].indexOf(event.which) > -1 && (model != undefined || model != '') && parseInt(model) != 9) {
                    // dot and numpad dot  
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});   // for allow decimal nos upto 9.