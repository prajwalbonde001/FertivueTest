'use strict';
angular.module('PIVF').controller('QualityControlCtrl', ['$rootScope', '$scope', 'QualityContolSrv', 'Common', 'AlertMessage', 'srvCommon', '$location', 'usSpinnerService', 'swalMessages', '$filter', function ($rootScope, $scope, QualityContolSrv, Common, AlertMessage, srvCommon, $location, usSpinnerService, swalMessages, $filter) {
    //=========================================================================================================================================================
    $scope.maxSize = 5;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;

    $scope.QualityControl = {};
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    //$scope.IsEdit = false;
    $scope.QualityControl.Date = new Date();
    $scope.QualityControl.Time = new Date();
  $rootScope.IsFemaleActive = false;
                $rootScope.IsMaleActive = false;
    $scope.ChangeQualityControlDate = function () {
        debugger;
        $scope.QualityControl.Date = $scope.QualityControl.Date;
    };

    //$scope.EditDeleteFlag = false;


    //Declaration
    debugger;
    $scope.btnSaveQualityControlText = 'Save';
    usSpinnerService.stop('GridSpinner');
    var objResource = {};
    //=========================================================================================================================================================

    //=========================================================================================================================================================
    //for paging
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.PageChange = function PageChange() {
        $scope.GetAllQualityControlData();
    }
    //=========================================================================================================================================================

    //=========================================================================================================================================================
    // To Read Resource 
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //=========================================================================================================================================================

    $scope.LoadData = function () {

        $scope.GetParameterList();

        //$scope.GetIncubatorList();
        //$scope.GetEquipmentList();
        //$scope.GetLiquidN2TankList();
        //$scope.GetInfectionControlList();

        //$scope.GetAllQualityControlData();
    }

    // Fill All Drop DownList 
    $scope.GetParameterList = function GetParameterList() {
        //
        var ResponseData = Common.getMasterList('M_ParameterMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            // Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ParameterList = Response.data;
            $scope.QualityControl.ParameterID = 0;

            //Make checkbox checked
            if ((!angular.isUndefined($scope.ParameterList) && $scope.ParameterList.length != 0)) { // && !angular.isUndefined($scope.FemaleComplaints) && !angular.isUndefined($scope.FemaleComplaints.PresentingComplaints))             
                //angular.forEach($scope.ParameterList.split(','), function (i, idx) {+
                angular.forEach($scope.ParameterList, function (i, idx) {
                    if (idx.ID == i)
                        $scope.ParameterList[idx].ticked = false;
                    //  $scope.PresentingComplaintsList[$scope.PresentingComplaintsList.findIndex(x=>x.ID == i)].ticked = true;
                });
            }

            $scope.GetIncubatorList();

        }, function (error) {
        });
    }

    $scope.GetIncubatorList = function GetIncubatorList() {
        debugger;
        //
        var ResponseData = Common.getMasterList('M_IncubatorMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            // Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.IncubatorList = Response.data;
            $scope.QualityControl.IncubatorID = 0;

            $scope.GetEquipmentList();
        }, function (error) {
        });
    }

    $scope.GetEquipmentList = function GetEquipmentList() {
        //
        var ResponseData = Common.getMasterList('M_EquipmentsMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            // Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.EquipmentList = Response.data;
            $scope.QualityControl.EquipmentsID = 0;

            $scope.GetLiquidN2TankList();

        }, function (error) {
        });
    }

    $scope.GetLiquidN2TankList = function GetLiquidN2TankList() {
        //
        var ResponseData = Common.getMasterList('M_LiquidN2TanksMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            //  Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.LiquidN2TankList = Response.data;
            $scope.QualityControl.LiquidN2TanksID = 0;

            $scope.GetInfectionControlList();
        }, function (error) {
        });
    }

    $scope.GetInfectionControlList = function GetInfectionControlList() {
        //
        var ResponseData = Common.getMasterList('M_InfectionControlMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            // Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.InfectionControlList = Response.data;
            $scope.QualityControl.InfectionControlID = 0;

            $scope.GetAllQualityControlData();
        }, function (error) {
        });
    }



    //=========================================================================================================================================================
    // Get All Quality Control Data
    $scope.GetAllQualityControlData = function () {
        //
        debugger;
        $scope.FormName = 'QualityControl';
        usSpinnerService.spin('GridSpinner');
        var ResponseData = QualityContolSrv.GetAllQualityControlList($scope.CurrentPage - 1);
        ResponseData.then(function (Response) {
            //usSpinnerService.stop('GridSpinner');
            debugger;


            $scope.PrevQualityControlList = Response.data;
            // new Date($filter('date')($scope.SimulationChart.StimulationStartDate, 'medium'));
            $scope.PrevQualityControlList.forEach(function (x, idx) {

                //Parameter 
                if (x.MParameterDecription != "" && x.MParameterDecription != null) {
                    var ptemp = [];
                    var ptemp1 = [];
                    ptemp = x.MParameterDecription.split(',');
                    for (var i = 0; i < ptemp.length; i++) {
                        angular.forEach($scope.ParameterList, function (item) {
                            // debugger;
                            if (parseInt(ptemp[i]) == item.ID) {
                                // item.ticked = true;
                                ptemp1.push(item.Description);
                            }
                        });
                    }

                    $scope.PrevQualityControlList[idx].PDecription = ptemp1.toString();
                }
                //$scope.PrevQualityControlList[idx].PDecription = ptemp1.toString();

                $scope.PrevQualityControlList[idx].ParameterSelected = [];

                angular.forEach(ptemp, function (i) {
                    var tempObj = {};
                    tempObj.ID = parseInt(i);
                    tempObj.ticked = true;
                    $scope.PrevQualityControlList[idx].ParameterSelected.push(tempObj);
                });

                //  $scope.PrevQualityControlList[idx].ParameterSelected = ptemp;
                console.log("tenp", $scope.PrevQualityControlList)
                //Incubator
                if (x.MIncubatorDecription != "" && x.MIncubatorDecription != null) {
                    var Intemp = [];
                    var Intemp1 = [];
                    Intemp = x.MIncubatorDecription.split(',');
                    for (var i = 0; i < Intemp.length; i++) {
                        angular.forEach($scope.IncubatorList, function (item) {
                            // debugger;
                            if (parseInt(Intemp[i]) == item.ID) {
                                // item.ticked = true;
                                Intemp1.push(item.Description);
                            }
                        });
                    }

                    $scope.PrevQualityControlList[idx].InDecription = Intemp1.toString();
                }
                //$scope.PrevQualityControlList[idx].InDecription = Intemp1.toString();

                $scope.PrevQualityControlList[idx].IncubatorSelected = [];

                angular.forEach(Intemp, function (i) {
                    var tempObj = {};
                    tempObj.ID = parseInt(i);
                    tempObj.ticked = true;
                    $scope.PrevQualityControlList[idx].IncubatorSelected.push(tempObj);
                });



                //Equipment
                if (x.MEquipmentsDecription != "" && x.MEquipmentsDecription != null) {
                    var Eqtemp = [];
                    var Eqtemp1 = [];
                    Eqtemp = x.MEquipmentsDecription.split(',');
                    for (var i = 0; i < Eqtemp.length; i++) {
                        angular.forEach($scope.EquipmentList, function (item) {
                            // debugger;
                            if (parseInt(Eqtemp[i]) == item.ID) {
                                // item.ticked = true;
                                Eqtemp1.push(item.Description);
                            }
                        });
                    }
                    $scope.PrevQualityControlList[idx].EqDecription = Eqtemp1.toString();
                }
                //$scope.PrevQualityControlList[idx].EqDecription = Eqtemp1.toString();

                $scope.PrevQualityControlList[idx].EquipmentSelected = [];

                angular.forEach(Eqtemp, function (i) {
                    var tempObj = {};
                    tempObj.ID = parseInt(i);
                    tempObj.ticked = true;
                    $scope.PrevQualityControlList[idx].EquipmentSelected.push(tempObj);
                });


                // LinqN2
                if (x.MLiquidN2TanksDecription != "" && x.MLiquidN2TanksDecription != null) {
                    var Litemp = [];
                    var Litemp1 = [];
                    Litemp = x.MLiquidN2TanksDecription.split(',');
                    for (var i = 0; i < Litemp.length; i++) {
                        angular.forEach($scope.LiquidN2TankList, function (item) {
                            //debugger;
                            if (parseInt(Litemp[i]) == item.ID) {
                                // item.ticked = true;
                                Litemp1.push(item.Description);
                            }
                        });
                    }
                    $scope.PrevQualityControlList[idx].LiDecription = Litemp1.toString();
                }
                //$scope.PrevQualityControlList[idx].LiDecription = Litemp1.toString();

                $scope.PrevQualityControlList[idx].LiquidN2TankSelected = [];

                angular.forEach(Litemp, function (i) {
                    var tempObj = {};
                    tempObj.ID = parseInt(i);
                    tempObj.ticked = true;
                    $scope.PrevQualityControlList[idx].LiquidN2TankSelected.push(tempObj);
                });



                //Infection Control
                if (x.MInfectionControlDecription != "" && x.MInfectionControlDecription != null) {
                    var Inftemp = [];
                    var Inftemp1 = [];
                    Inftemp = x.MInfectionControlDecription.split(',');
                    for (var i = 0; i < Inftemp.length; i++) {
                        angular.forEach($scope.InfectionControlList, function (item) {
                            //debugger;
                            if (parseInt(Inftemp[i]) == item.ID) {
                                // item.ticked = true;
                                Inftemp1.push(item.Description);
                            }
                        });
                    }
                    $scope.PrevQualityControlList[idx].InfectionControlDecription = Inftemp1.toString();
                }
                //$scope.PrevQualityControlList[idx].InfectionControlDecription = Inftemp1.toString();

                $scope.PrevQualityControlList[idx].InfectionControlSelected = [];

                angular.forEach(Inftemp, function (i) {
                    var tempObj = {};
                    tempObj.ID = parseInt(i);
                    tempObj.ticked = true;
                    $scope.PrevQualityControlList[idx].InfectionControlSelected.push(tempObj);
                });

                debugger;
                console.log("tenp", new Date($filter('date')(new Date(), 'dd-MMM-yyyy')));
                console.log("tenp", new Date($filter('date')(x.Date, 'dd-MMM-yyyy')));


                //if (new Date($filter('date')(x.Date, 'dd-MMM-yyyy')) == new Date($filter('date')(new Date(), 'dd-MMM-yyyy')))
                if (($filter('date')(x.Date, 'dd-MMM-yyyy')) == ($filter('date')(new Date(), 'dd-MMM-yyyy')))
                {
                    x.EditDeleteFlag = false;
                }
                else {

                    x.EditDeleteFlag = true;
                }

            })





            if ($scope.PrevQualityControlList.length > 0) {
                //$scope.TotalItems = $scope.PrevQualityControlList.TotalRows;
                $scope.TotalItems = $scope.PrevQualityControlList[0].TotalRows;
            }

            usSpinnerService.stop('GridSpinner');
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.success(objResource.msgTitle, objResource.msgError);
        });
    }
    //=========================================================================================================================================================
    // Validate Form Quality Control

    $scope.ValidateQualityControl = function () {
        var IsValid = true;
        debugger;
        if (angular.isUndefined($scope.QualityControl.Date) || $scope.QualityControl.Date == '' || $scope.QualityControl.Date == null) {
            AlertMessage.info('PalashIVF', 'Please Enter Mandatory Details');
            IsValid = false;
        }
        else if (angular.isUndefined($scope.QualityControl.Time) || $scope.QualityControl.Time == '' || $scope.QualityControl.Time == null) {
            AlertMessage.info('PalashIVF', 'Please Enter Mandatory Details');
            IsValid = false;
        }
        else if ($scope.QualityControl.ParameterSelected == 0) {
            AlertMessage.info('PalashIVF', 'Please Enter Mandatory Details');
            IsValid = false;
        }
        //else if ($scope.SemenAnalysis.WitnessedBy == $scope.SemenAnalysis.DoneBy) {
        //    AlertMessage.info('PalashIVF', 'Witnessed By and  Done By can not be same');
        //    IsValid = false;
        //}
        return IsValid;
    }

    //=========================================================================================================================================================

    //Save Employee Information
    $scope.Save = function (QualityControl) {
        //Check Empty Data
        debugger;
        //$scope.frmQualityControl.$valid &&
        if ($scope.frmQualityControl.$valid && $scope.ValidateQualityControl()) {
            if (!angular.equals({}, QualityControl)) {
                usSpinnerService.spin('GridSpinner');

                var ResponseData = QualityContolSrv.SaveQualityControl(QualityControl);
                ResponseData.then(function (Response) {
                    usSpinnerService.stop('GridSpinner');
                    debugger;
                    if (Response.data == 1) {
                        debugger;
                        $scope.GetAllQualityControlData();
                        $scope.Clear();
                        //angular.element(DeleteModel).modal('hide');
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    }
                    else if (Response.data == 2) {
                        $scope.GetAllQualityControlData();
                        $scope.Clear();
                        //angular.element(DeleteModel).modal('hide');
                        AlertMessage.success(objResource.msgTitle, "Record Updated Successfully.");
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    }

                    //$scope.btnSaveQualityControlText = 'Save';
                    //$scope.PaSelectNone();

                    //angular.forEach($scope.ParameterList, function (item) {
                    //    item.ticked = false;
                    //});

                    //angular.forEach($scope.IncubatorList, function (item) {
                    //    item.ticked = false;
                    //});

                    //angular.forEach($scope.EquipmentList, function (item) {
                    //    item.ticked = false;
                    //});

                    //angular.forEach($scope.LiquidN2TankList, function (item) {
                    //    item.ticked = false;
                    //});

                    //angular.forEach($scope.InfectionControlList, function (item) {
                    //    item.ticked = false;
                    //});

                    $scope.Reset();
                    $scope.QualityControl.Date = new Date();
                    $scope.QualityControl.Time = new Date();

                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });

            }
            else {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.error(objResource.msgTitle, "Please Enter Quality Control Details");
            }
        }
        else {
            //$scope.frmQualityControl.QualityControl.Date.$dirty = true;
            //$scope.frmQualityControl.QualityControl.Time.$dirty = true;
            //$scope.frmQualityControlQualityControl.ddlParameter.$dirty = true;

            $scope.frmQualityControl.txtDate.$dirty = true;
            $scope.frmQualityControl.txtTime.$dirty = true;
            $scope.frmQualityControl.ddlParameter.$dirty = true;
        }
    }
    //=========================================================================================================================================================


    $scope.Reset = function () {
        $scope.btnSaveQualityControlText = 'Save';
        $scope.PaSelectNone();

        angular.forEach($scope.ParameterList, function (item) {
            item.ticked = false;
        });

        angular.forEach($scope.IncubatorList, function (item) {
            item.ticked = false;
        });

        angular.forEach($scope.EquipmentList, function (item) {
            item.ticked = false;
        });

        angular.forEach($scope.LiquidN2TankList, function (item) {
            item.ticked = false;
        });

        angular.forEach($scope.InfectionControlList, function (item) {
            item.ticked = false;
        });
    };


    //Delete the selected row
    $scope.Delete = function (item) {
        debugger;
        swalMessages.MessageBox('PalashIVF', "Are You Sure You Want To Delete ?", "warning", function (isConfirmed) {
            if (isConfirmed) {
                debugger;
                var obj = {};
                obj.ID = item.ID;
                obj.UnitId = item.UnitId;

                //obj.EmployeeName = Item.EmployeeName;
                //obj.Salary = Item.Salary;
                //obj.Department = Item.Department;
                //obj.Designation = Item.Designation;

                var Promise = QualityContolSrv.DeleteRecord(obj);
                //var Promise = EmployeeSrv.DeleteRecord(Item);
                Promise.then(function (resp) {
                    if (resp.data == 1) {
                        $scope.GetAllQualityControlData();
                        $scope.Clear();
                        AlertMessage.success('PalashIVF', 'Record deleted successfully.');
                    }
                }, function (error) {
                })
            }
            else {
                return false;
            }
        });


    }
    //=========================================================================================================================================================
    //Clear All Text
    $scope.Clear = function () {
        $scope.QualityControl = {};
        //$scope.Vitals.Height = "";
    }
    //=========================================================================================================================================================

    //==============================================
    $scope.Cancel = function () {
        debugger;
        //$rootScope.FormName = "Queue";
        //$location.path("QueueMgt/QueueList");
        $scope.QualityControl = [];

        $scope.Reset();

        $scope.QualityControl.Date = new Date();
        $scope.QualityControl.Time = new Date();
    }

    //====================

    //=========================================================================================
    //Edit Qaulity Control
    $scope.Edit = function Edit(item) {
        debugger;
        $scope.prevQualityControl = angular.copy(item);
        $scope.QualityControl = angular.copy(item);
        $scope.QualityControl.Date = new Date($filter('date')($scope.QualityControl.Date, 'dd-MMM-yyyy'));

        $scope.btnSaveQualityControlText = 'Update';


        debugger;
        console.log($scope.ParameterList);

        //Parameter List Fill
        angular.forEach($scope.ParameterList, function (item) {
            $scope.QualityControl.ParameterSelected.forEach(function (x) {
                var Data = {};
                Data.ID = parseInt(x.ID);
                Data.ticked = x.ticked;

                $scope.PaClick(Data);

                if (item.ID == x.ID) {
                    item.ticked = true;
                }

            });
        });

        //Incubator List
        angular.forEach($scope.IncubatorList, function (item) {
            debugger;
            $scope.QualityControl.IncubatorSelected.forEach(function (x) {
                var Data = {};
                Data.ID = parseInt(x.ID);
                Data.ticked = x.ticked;

                $scope.IndClick(Data);

                if (item.ID == x.ID) {
                    item.ticked = true;
                }

            });
        });

        //Equipment List
        angular.forEach($scope.EquipmentList, function (item) {
            $scope.QualityControl.EquipmentSelected.forEach(function (x) {
                var Data = {};
                Data.ID = parseInt(x.ID);
                Data.ticked = x.ticked;

                $scope.EqClick(Data);

                if (item.ID == x.ID) {
                    item.ticked = true;
                }

            });
        });

        // Liquid N2 List
        angular.forEach($scope.LiquidN2TankList, function (item) {
            $scope.QualityControl.LiquidN2TankSelected.forEach(function (x) {
                var Data = {};
                Data.ID = parseInt(x.ID);
                Data.ticked = x.ticked;

                $scope.LiqClick(Data);

                if (item.ID == x.ID) {
                    item.ticked = true;
                }

            });
        });

        //Infection Control
        angular.forEach($scope.InfectionControlList, function (item) {
            $scope.QualityControl.InfectionControlSelected.forEach(function (x) {
                var Data = {};
                Data.ID = parseInt(x.ID);
                Data.ticked = x.ticked;

                $scope.InfClick(Data);

                if (item.ID == x.ID) {
                    item.ticked = true;
                }

            });
        });

        //$scope.IsEdit = false;

    }
    
    //=========================================================================================================================================================

    // ParameterList
    $scope.PaClick = function (data) {
         
        debugger;
        if (data.ticked) {
            console.log($scope.QualityControl.ParameterSelected);

            //if ($scope.IsEdit) {
            //    debugger;
            //    var editTemp = {};
            //    editTemp.ID = parseInt(data.ID);
            //    $scope.QualityControl.ParameterSelected.push(editTemp);
            //}

            //var obj = {};     //obj.ID = 0;    //obj.PreComID = data.ID;           //obj.PreComplaints = data.Description;
            //obj.Day = 0;     //obj.Month = 0;  //obj.Year = 0;                    //obj.OtherComplaints = "";
            //obj.Onset = 0;  //obj.ModID = 0;  //obj.IsOther = false;            //obj.lstOnset = angular.copy($scope.lstOnset);
            //obj.lstModality = angular.copy($scope.lstModality);                //obj.lstYear = angular.copy($scope.lstYear);
            //obj.lstMonth = angular.copy($scope.lstMonth);                  //obj.lstDay = angular.copy($scope.lstDay);
            //$scope.lstCompDetails.push(obj);

            $scope.QualityControl.ParameterSelected.forEach(function (x) {
                debugger;
                if (x.ID == 1) {
                    $scope.ShowInc = true;
                }
                if (x.ID == 2) {
                    $scope.ShowEqui = true;
                }
                if (x.ID == 3) {
                    $scope.ShowGas = true;

                    $scope.ShowGasCo2 = true;
                    $scope.ShowGasN2 = true;
                    $scope.ShowGasTrigas = true;
                }
                if (x.ID == 4) {
                    $scope.ShowArm = true;

                    $scope.ShowArmVoe = true;
                    $scope.ShowArmTemp = true;
                    $scope.ShowArmHumidity = true;
                }
                if (x.ID == 5) {
                    $scope.ShowLiq = true;
                }
                if (x.ID == 6) {
                    $scope.ShowRef = true;
                }
                if (x.ID == 7) {
                    $scope.ShowInfec = true;
                }

            })

        }
        else {

            if (data.ID == 1) {
                $scope.ShowInc = false;

                angular.forEach($scope.IncubatorList, function (item) {
                    item.ticked = false;

                    var Data = {};
                    Data.ID = parseInt(item.ID);
                    Data.ticked = item.ticked;

                    $scope.IndClick(Data);
                });

                

            }
            if (data.ID == 2) {
                $scope.ShowEqui = false;

                angular.forEach($scope.EquipmentList, function (item) {
                    item.ticked = false;

                    var Data = {};
                    Data.ID = parseInt(item.ID);
                    Data.ticked = item.ticked;


                    $scope.EqClick(data);

                });
            }
            if (data.ID == 3) {
                $scope.ShowGas = false;

                $scope.ShowGasCo2 = false;
                $scope.ShowGasN2 = false;
                $scope.ShowGasTrigas = false;

                $scope.QualityControl.GasCO2 = "";
                $scope.QualityControl.N2 = "";
                $scope.QualityControl.Trigas = "";

            }
            if (data.ID == 4) {
                $scope.ShowArm = false;

                $scope.ShowArmVoe = false;
                $scope.ShowArmTemp = false;
                $scope.ShowArmHumidity = false;

                $scope.QualityControl.Voe = "";
                $scope.QualityControl.AtmTemperature = "";
                $scope.QualityControl.AtmHumidity = "";
            }
            if (data.ID == 5) {
                $scope.ShowLiq = false;

                angular.forEach($scope.LiquidN2TankList, function (item) {
                    item.ticked = false;

                    var Data = {};
                    Data.ID = parseInt(item.ID);
                    Data.ticked = item.ticked;

                    $scope.LiqClick(Data);

                });
            }
            if (data.ID == 6) {
                $scope.ShowRef = false;

                $scope.QualityControl.RefrigTemperature = "";
            }
            if (data.ID == 7) {
                $scope.ShowInfec = false;

                angular.forEach($scope.InfectionControlList, function (item) {
                    item.ticked = false;

                    var Data = {};
                    Data.ID = parseInt(item.ID);
                    Data.ticked = item.ticked;

                    $scope.InfClick(Data);

                });

            }
        }

    }

    $scope.PaSelectAll = function () {
        $scope.ParameterList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowInc = true;
            }
            if (x.ID == 2) {
                $scope.ShowEqui = true;
            }
            if (x.ID == 3) {
                $scope.ShowGas = true;

                $scope.ShowGasCo2 = true;
                $scope.ShowGasN2 = true;
                $scope.ShowGasTrigas = true;
            }
            if (x.ID == 4) {
                $scope.ShowArm = true;

                $scope.ShowArmVoe = true;
                $scope.ShowArmTemp = true;
                $scope.ShowArmHumidity = true;
            }
            if (x.ID == 5) {
                $scope.ShowLiq = true;
            }
            if (x.ID == 6) {
                $scope.ShowRef = true;
            }
            if (x.ID == 7) {
                $scope.ShowInfec = true;
            }

        })
    }

    $scope.PaSelectNone = function () {
        //$scope.ParameterList.length = 0;
        $scope.ParameterList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowInc = false;

                $scope.ShowHeraTemp = false;
                $scope.ShowHeraCO2 = false;
                $scope.ShowHeraWater = false;

                $scope.ShowMINCTemp = false;
                $scope.ShowMINCClean = false;
                $scope.ShowMINCLevel = false;
            }
            if (x.ID == 2) {
                $scope.ShowEqui = false;

                $scope.ShowEquiLaminarTemp = false;
                $scope.ShowEquiHepaFi = false;
                $scope.ShowEquiPreFi = false;

                $scope.ShowEquiICSIStageTemp = false;

                $scope.ShowEquiTestTubeWarmerTemp = false;
            }
            if (x.ID == 3) {
                $scope.ShowGas = false;

                $scope.ShowGasCo2 = false;
                $scope.ShowGasN2 = false;
                $scope.ShowGasTrigas = false;

                $scope.QualityControl.GasCO2 = "";
                $scope.QualityControl.N2 = "";
                $scope.QualityControl.Trigas = "";
            }
            if (x.ID == 4) {
                $scope.ShowArm = false;

                $scope.ShowArmVoe = false;
                $scope.ShowArmTemp = false;
                $scope.ShowArmHumidity = false;

                $scope.QualityControl.Voe = "";
                $scope.QualityControl.AtmTemperature = "";
                $scope.QualityControl.AtmHumidity = "";
            }
            if (x.ID == 5) {
                $scope.ShowLiq = false;

                $scope.ShowLiqLevelTank1 = false;

                $scope.ShowLiqLevelTank2 = false;
            }
            if (x.ID == 6) {
                $scope.ShowRef = false;

                $scope.QualityControl.RefrigTemperature = "";
            }
            if (x.ID == 7) {
                $scope.ShowInfec = false;

                $scope.ShowInfecSwab1 = false;
                $scope.ShowInfecSwab2 = false;
                $scope.ShowInfecSwab3 = false;
            }

        })
    }

    //=========================================================================================================================================================

    //Incubator List
    $scope.IndClick = function (data) {
        debugger;
        if (data.ticked) {
            console.log($scope.QualityControl.IncubatorSelected);
            $scope.QualityControl.IncubatorSelected.forEach(function (x) {
                if (x.ID == 1) {
                    $scope.ShowHeraTemp = true;
                    $scope.ShowHeraCO2 = true;
                    $scope.ShowHeraWater = true;
                }
                if (x.ID == 2) {
                    $scope.ShowMINCTemp = true;
                    $scope.ShowMINCClean = true;
                    $scope.ShowMINCLevel = true;
                }
            })
        }
        else {

            if (data.ID == 1) {
                $scope.ShowHeraTemp = false;
                $scope.ShowHeraCO2 = false;
                $scope.ShowHeraWater = false;

                $scope.QualityControl.HeraTemperature = "";
                $scope.QualityControl.HeraCO2 = "";
                $scope.QualityControl.WaterLevel = "";

            }
            if (data.ID == 2) {
                $scope.ShowMINCTemp = false;
                $scope.ShowMINCClean = false;
                $scope.ShowMINCLevel = false;

                $scope.QualityControl.MINCTemperature = "";
                $scope.QualityControl.Cleaning = "";
                $scope.QualityControl.MINCLevel = "";

            }
        }
    }

    $scope.IndSelectAll = function () {
        $scope.IncubatorList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowHeraTemp = true;
                $scope.ShowHeraCO2 = true;
                $scope.ShowHeraWater = true;
            }
            if (x.ID == 2) {
                $scope.ShowMINCTemp = true;
                $scope.ShowMINCClean = true;
                $scope.ShowMINCLevel = true;
            }
        })
    }

    $scope.IndSelectNone = function () {
        $scope.IncubatorList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowHeraTemp = false;
                $scope.ShowHeraCO2 = false;
                $scope.ShowHeraWater = false;

                $scope.QualityControl.HeraTemperature = "";
                $scope.QualityControl.HeraCO2 = "";
                $scope.QualityControl.WaterLevel = "";
            }
            if (x.ID == 2) {
                $scope.ShowMINCTemp = false;
                $scope.ShowMINCClean = false;
                $scope.ShowMINCLevel = false;

                $scope.QualityControl.MINCTemperature = "";
                $scope.QualityControl.Cleaning = "";
                $scope.QualityControl.MINCLevel = "";
            }
        })
    }

    //=========================================================================================================================================================

    //EquipmentList 

    $scope.EqClick = function (data) {
        debugger;
        if (data.ticked) {
            console.log($scope.QualityControl.EquipmentSelected);
            $scope.QualityControl.EquipmentSelected.forEach(function (x) {
                if (x.ID == 1) {
                    $scope.ShowEquiLaminarTemp = true;
                    $scope.ShowEquiHepaFi = true;
                    $scope.ShowEquiPreFi = true;
                }
                if (x.ID == 2) {
                    $scope.ShowEquiICSIStageTemp = true;
                }
                if (x.ID == 3) {
                    $scope.ShowEquiTestTubeWarmerTemp = true;
                }
            })
        }
        else {

            if (data.ID == 1) {
                $scope.ShowEquiLaminarTemp = false;
                $scope.ShowEquiHepaFi = false;
                $scope.ShowEquiPreFi = false;

                $scop.QualityControl.LaminarTemperature="";
                $scop.QualityControl.HepaFilter="";
                $scop.QualityControl.Prefilter = "";
            }
            if (data.ID == 2) {
                $scope.ShowEquiICSIStageTemp = false;

                $scope.QualityControl.ICSIStageTemperature = "";
            }
            if (data.ID == 3) {
                $scope.ShowEquiTestTubeWarmerTemp = false;

                $scope.QualityControl.TestTubeWarmerTemperature = "";
            }
        }
    }

    $scope.EqSelectAll = function () {
        $scope.EquipmentList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowEquiLaminarTemp = true;
                $scope.ShowEquiHepaFi = true;
                $scope.ShowEquiPreFi = true;
            }
            if (x.ID == 2) {
                $scope.ShowEquiICSIStageTemp = true;
            }
            if (x.ID == 3) {
                $scope.ShowEquiTestTubeWarmerTemp = true;
            }
        })
    }

    $scope.EqSelectNone = function () {
        $scope.EquipmentList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowEquiLaminarTemp = false;
                $scope.ShowEquiHepaFi = false;
                $scope.ShowEquiPreFi = false;

                $scop.QualityControl.LaminarTemperature = "";
                $scop.QualityControl.HepaFilter = "";
                $scop.QualityControl.Prefilter = "";
            }
            if (x.ID == 2) {
                $scope.ShowEquiICSIStageTemp = false;

                $scope.QualityControl.ICSIStageTemperature = "";
            }
            if (x.ID == 3) {
                $scope.ShowEquiTestTubeWarmerTemp = false;

                $scope.QualityControl.TestTubeWarmerTemperature = "";
            }
        })
    }

    //=========================================================================================================================================================

    //Liquid N2 Tanks 

    $scope.LiqClick = function (data) {
        debugger;
        if (data.ticked) {
            console.log($scope.QualityControl.LiquidN2TankSelected);
            $scope.QualityControl.LiquidN2TankSelected.forEach(function (x) {
                if (x.ID == 1) {
                    $scope.ShowLiqLevelTank1 = true;
                }
                if (x.ID == 2) {
                    $scope.ShowLiqLevelTank2 = true;
                }
            })
        }
        else {

            if (data.ID == 1) {
                $scope.ShowLiqLevelTank1 = false;

                $scope.QualityControl.LevelTank1 = "";
            }
            if (data.ID == 2) {
                $scope.ShowLiqLevelTank2 = false;

                $scope.QualityControl.LevelTank2 = "";
            }
        }
    }

    $scope.LiqSelectAll = function () {
        $scope.LiquidN2TankList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowLiqLevelTank1 = true;
            }
            if (x.ID == 2) {
                $scope.ShowLiqLevelTank2 = true;
            }
        })
    }

    $scope.LiqSelectNone = function () {
        $scope.LiquidN2TankList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowLiqLevelTank1 = false;

                $scope.QualityControl.LevelTank1 = "";
            }
            if (x.ID == 2) {
                $scope.ShowLiqLevelTank2 = false;

                $scope.QualityControl.LevelTank2 = "";
            }
        })
    }

    //=========================================================================================================================================================

    //InfectionControlList 

    $scope.InfClick = function (data) {
        debugger;
        if (data.ticked) {
            console.log($scope.QualityControl.InfectionControlSelected);
            $scope.QualityControl.InfectionControlSelected.forEach(function (x) {
                if (x.ID == 1) {
                    $scope.ShowInfecSwab1 = true;
                }
                if (x.ID == 2) {
                    $scope.ShowInfecSwab2 = true;
                }
                if (x.ID == 3) {
                    $scope.ShowInfecSwab3 = true;
                }
            })
        }
        else {

            if (data.ID == 1) {
                $scope.ShowInfecSwab1 = false;
                $scope.QualityControl.Swab1 = "";
            }
            if (data.ID == 2) {
                $scope.ShowInfecSwab2 = false;
                $scope.QualityControl.Swab2 = "";
            }
            if (data.ID == 3) {
                $scope.ShowInfecSwab3 = false;
                $scope.QualityControl.Swab3 = "";
            }
        }
    }

    $scope.InfSelectAll = function () {
        $scope.InfectionControlList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowInfecSwab1 = true;
            }
            if (x.ID == 2) {
                $scope.ShowInfecSwab2 = true;
            }
            if (x.ID == 3) {
                $scope.ShowInfecSwab3 = true;
            }
        })
    }

    $scope.InfSelectNone = function () {
        $scope.EquipmentList.forEach(function (x) {
            if (x.ID == 1) {
                $scope.ShowInfecSwab1 = false;
                $scope.QualityControl.Swab1 = "";
            }
            if (x.ID == 2) {
                $scope.ShowInfecSwab2 = false;
                $scope.QualityControl.Swab2 = "";
            }
            if (x.ID == 3) {
                $scope.ShowInfecSwab3 = false;
                $scope.QualityControl.Swab3 = "";
            }
        })
    }

    //=========================================================================================================================================================


    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };



    $scope.open2 = function () {       //Added by Nayan Kamble on 15/10/2019
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };



    $scope.open3 = function () {       //Added by Nayan Kamble on 15/10/2019
        $scope.popup3.opened = true;
    };

    $scope.popup3 = {
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
     
    $scope.dateOptions1 = {    //Added by Nayan Kamble on 15/10/2019
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(),//.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
     
    $scope.dateOptions2 = {    //Added by Nayan Kamble on 15/10/2019
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(),//.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

}]);