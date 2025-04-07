'use strict';

angular.module('PIVF').controller('DonorCtr', function ($rootScope, $scope, DonorSrv, $location, AlertMessage, srvCommon, Common, swalMessages, srvSemenFreez, $filter, usSpinnerService, localStorageService) {
    $rootScope.FormName = 'Donor';
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    $rootScope.CycleDetails = null;
    $rootScope.Allergies = null;
    $rootScope.hideWhenQueue = true;
    $rootScope.ForPrint = 0;
    $scope.DonorCode = '';
    $scope.DonorList = [];
    $scope.Donor = {};
    $scope.SearchDonor = {};
    $scope.SearchDonor.DonorCode = '';
    usSpinnerService.spin('GridSpinner');
    //Common.clearSelectedPatient();
    //Common.clearSelectedCouple();
    
    //for paging================================================================
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.PageChange = function PageChange() {
    $scope.FillDonorList();
    }
    //
    // for sorting    
    $scope.SortColumn1 = "RegiDate";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    $scope.PageSetup = function PageSetup() {
        $scope.show = true;
        $scope.FillDonorList();
        $scope.FillDropDowns();
        $scope.GetUserrights();
    }
    $scope.PageSetup1 = function PageSetup1() {
        debugger;
        $scope.FillDropDowns();
        $scope.Donor = Common.getObj();
        Common.clearObj();
        $scope.GetUserrights();
        if ($scope.Donor.ID == undefined || $scope.Donor.ID == null || $scope.Donor.ID == 0) {
            $scope.Name = "Save";
        }
        else {
            $scope.Name = "Update";
        }
       
    }
    $scope.ClearSearch = function ()
     {
        debugger;
        //  $scope.show = true;
        $scope.SearchDonor = {};
        $scope.SearchDonor.SkinColorID = 0;
        $scope.SearchDonor.HairColorID = 0;
        $scope.SearchDonor.BloodGroupID = 0;
        $scope.SearchDonor.EyeColorID = 0;
        $scope.SearchDonor.HeightID = 0;
        $scope.SearchDonor.BuiltID = 0;
        $scope.SearchDonor.AgencyID = 0;
        $scope.FillDonorList();
    }
    $scope.ClearData1 = function () {
        debugger;
        //$scope.show = false;
        $scope.SearchDonor = {};
        $scope.SearchDonor.SkinColorID = 0;
        $scope.SearchDonor.HairColorID = 0;
        $scope.SearchDonor.BloodGroupID = 0;
        $scope.SearchDonor.EyeColorID = 0;
        $scope.SearchDonor.HeightID = 0;
        $scope.SearchDonor.BuiltID = 0;
        $scope.SearchDonor.AgencyID = 0;
        $scope.FillDonorList();
       
    }
    $scope.FillDropDowns = function () {
       
        var ResponseData = Common.getMasterList('M_SkinColor', 'IVFSCOLORID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select SkinColor' });
            $scope.SkinColorList = Response.data;
            if($scope.Donor.SkinColorID == undefined)
                $scope.Donor.SkinColorID = 0;
            $scope.SearchDonor.SkinColorID = 0;
         
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_HairColor', 'IVFHCOLORID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select HairColor' });
            $scope.HairColorList = Response.data;
            if($scope.Donor.HairColorID == undefined)
                $scope.Donor.HairColorID = 0;
            $scope.SearchDonor.HairColorID = 0;
            
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_BloodGroupMaster', 'BloodID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select BloodGroup' });
            $scope.BloodGroupList = Response.data;
            if( $scope.Donor.BloodGroupID == undefined)
                $scope.Donor.BloodGroupID = 0;
            $scope.SearchDonor.BloodGroupID = 0;
         
        }, function (error) {
            $scope.Error = error;
        });

        var ResponseData = Common.getMasterList('M_EyeColor', 'IVFECOLORID', 'Description');
        ResponseData.then(function (Response) {
            
            Response.data.splice(0, 0, { ID: 0, Description: 'Select EyeColor' });
            $scope.EyeColorList = Response.data;
            if ($scope.Donor.EyeColorID == undefined)
                $scope.Donor.EyeColorID = 0;
            $scope.SearchDonor.EyeColorID = 0;
          
        }, function (error) {
            $scope.Error = error;
        });
        //var ResponseData = Common.getMasterList('M_HeightMaster', 'ID', 'Description');
        //ResponseData.then(function (Response) {
        //    Response.data.splice(0, 0, { ID: 0, Description: 'Select Height' });
        //    $scope.HeightList = Response.data;
        //    if ($scope.Donor.HeightID == undefined)
        //        $scope.Donor.HeightID = 0;
        //    $scope.SearchDonor.HeightID = 0;
          
        //}, function (error) {
        //    $scope.Error = error;
        //});
        var ResponseData = Common.getMasterList('M_BuiltMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select Built' });
            $scope.BuiltList = Response.data;
            if ($scope.Donor.BuiltID == undefined)
                $scope.Donor.BuiltID = 0;
            $scope.SearchDonor.BuiltID = 0;
           
        }, function (error) {
            $scope.Error = error;
        });
        var ResponseData = Common.getMasterList('M_AgencyMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
             
            Response.data.splice(0, 0, { ID: 0, Description: 'Select Agency' });
            $scope.AgencyList = Response.data;
            if ($scope.Donor.AgencyID == undefined)
                $scope.Donor.AgencyID = 0;
            $scope.SearchDonor.AgencyID = 0;
           
        }, function (error) {
            $scope.Error = error;
        });

        var ResponseData = Common.getMasterList('M_EducationDetailsMaster', 'EDUID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.EducationList = Response.data;
            if ($scope.Donor.EducationID == undefined)
                $scope.Donor.EducationID = 0;
            $scope.SearchDonor.EducationID = 0;

        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillDonorList = function FillDonorList() {
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DonorSrv.FillDonorList($scope.CurrentPage - 1, $scope.SearchDonor,true);
        ResponseData.then(function (Response) {
            if (Response.data != null) {
                usSpinnerService.stop('GridSpinner');
                $scope.DonorList = Response.data;
                if (Response.data.length > 0)
                    $scope.TotalItems = Response.data[0].TotalRows;
                else
                    $scope.TotalItems = 0;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.AddDonor = function AddDonor()
       
    {
         debugger;
    
        $location.path('/AddDonor/').search({ Edit: false });
    }

    $scope.CancelClick = function CancelClick() {
        debugger;
        $location.path('/Donor/');
    }
    $scope.SaveDonor = function SaveDonor(Donor) {
        debugger;
        if ($scope.Donor.AgencyID != 0)
        {           
            if ($scope.frmDonorView.AgencyID.$valid && $scope.frmDonorView.Code.$valid)
            {
                usSpinnerService.spin('GridSpinner');
                var ResponseData = DonorSrv.SaveDonor(Donor);
                ResponseData.then(function (Response) {
                    debugger;
                    usSpinnerService.stop('GridSpinner');
                    if (Response.data != null) {
                        
                        if (Response.data == 1) {
                            AlertMessage.success("Donor Registered Successfully");
                            $location.path('/Donor/');
                        }
                        else if (Response.data == 2) {
                            AlertMessage.success("Donor Updated Successfully");
                            $location.path('/Donor/');
                        }
                        else if (Response.data == 3) {
                            AlertMessage.success("Duplicate Code And Agency");
                            //$location.path('/Donor/');
                        }
                        else if (Response.data == 0) {
                            AlertMessage.success("Error Ocured While Saving Data");
                        }
                        // $scope.DonorList = Response.data;
                    }
                }, function (error) {
                    usSpinnerService.stop('GridSpinner');
                    $scope.Error = error;
                });
            }
            else
            {
                $scope.frmDonorView.AgencyID.$dirty = true;
                $scope.frmDonorView.Code.$dirty = true;
            }
        } else {
            $scope.frmDonorView.AgencyID.$dirty = true;
            $scope.frmDonorView.Code.$dirty = true;
        }
        
        
    }
    $scope.ClearClick = function()
    {
        debugger;
        $scope.SemenFreez = {};
        $scope.ListItem = [];
        $scope.AddRow();
        $scope.SemenFreez.NoOfVials = 1;
        $scope.SemenFreez.AbstinenceID = 0;
        $scope.SemenFreez.DoneBy = 0;
        $scope.SemenFreez.WitnessedBy = 0;
        $scope.btnSaveUpdate = "Save";
    }
    $scope.EditDonor = function EditDonor(Donor) {
        debugger;
        Common.setObj(Donor);
        $location.path('/AddDonor/').search({ Edit: true });
    }
    $scope.NewSample = function NewSample(Donor) {
        debugger;
        Common.setObj(Donor);
        $location.path('/NewDonorSample/');
    }
    //New Sample===========================================================================================================
    
    // $scope.maxSize = 5;
    //  $scope.CurrentPage = 1;
    var objResource = {};
    $scope.ViewBtnName = 'View';
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    $scope.SemenFreez = {};
    $scope.ListItem = [];
    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.btnSaveUpdate = "Save";
    $scope.IsEnableDisableLinkBtn = true;
    $scope.SurgicalSpermRetrieval = {};
    /*START : Visible*/
    $scope.LeftVisible = true;
    $scope.RightVisible = true;
    $scope.DonorObj = {};
    $scope.open4 = function () {
        $scope.popup4.opened = true;
    };
    $scope.popup4 = {
        opened: false
    };
    $scope.open = function ($event, Item) {
        $event.preventDefault();
        $event.stopPropagation();
        Item.opened = true;
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
    $scope.LoadData = function LoadData() {
        $scope.DonorObj = Common.getObj();
        Common.clearObj();
        $scope.ismeridian = true;
        $scope.maxTime = new Date();
        $scope.SemenFreez.SpremFreezingTime = new Date();     
        $scope.SemenFreez.ReceivingTime = new Date();
        $scope.SemenFreez.SpremFreezingDate = new Date();      
        $scope.SemenFreez.ReceivingDate = new Date();       
        $scope.FillAbstinenceList();       
        $scope.VialsList();
        $scope.FillTankList();
        $scope.FillCanisterList();
        $scope.FillCanList();
        $scope.GobletColorList();
        $scope.GobletSizeList();
        $scope.GetEmbryologyDoctorsList();
        if ($scope.ListItem.length == 0)
            $scope.GetMaxID();
        $scope.GetSemenFreezList();
    }
    // Get SemenFreez Data to display on Table Content
    $scope.GetSemenFreezList = function () {
        
       
        if (!angular.equals({}, $scope.DonorObj))
        {
            debugger
            usSpinnerService.spin('GridSpinner');
            var ResponseData = srvSemenFreez.GetSemenFreezList($scope.DonorObj.ID, $scope.DonorObj.UnitID);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                $scope.SemenFreezList = Response.data;

            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }           
    }
    $scope.RedirectSelf = function RedirectSelf(FormNo,ID,UnitID) {
        
        $scope.GetSemenFreezListByFormNo(FormNo, "SpremFreezingFromDonor", ID, UnitID);
        // $scope.GetSemenFreezListByFormNo(FormNo, "SpremFreezingDetailsFromDonor", ID, UnitID); //by rohini
    };
    // Get SemenFreez Data to Update
    $scope.GetSemenFreezListByFormNo = function (FormNo, Action, ID, UnitID) {
        debugger;
        if (Action == "SpremFreezingFromDonor") {
            debugger;
            usSpinnerService.spin('GridSpinner');
            //  var ResponseData = srvSemenFreez.GetSemenFreezListByFormNo(FormNo, Action,ID, UnitID);   --commented by Nayan   just to check

            var ResponseData = DonorSrv.GetSemenFreezListByFormNo(FormNo, Action, ID, UnitID);
            ResponseData.then(function (Response) {
                debugger;
                usSpinnerService.stop('GridSpinner');
                $scope.SemenFreez = Response.data[0];
                debugger;
                if ($scope.SemenFreez.CollectionDate != undefined)
                    $scope.SemenFreez.CollectionDate = new Date($scope.SemenFreez.CollectionDate);
                if ($scope.SemenFreez.ReceivingDate != undefined)
                    $scope.SemenFreez.ReceivingDate = new Date($scope.SemenFreez.ReceivingDate);
                if ($scope.SemenFreez.SpremFreezingDate != undefined)
                    $scope.SemenFreez.SpremFreezingDate = new Date($scope.SemenFreez.SpremFreezingDate);
                if ($scope.SemenFreez.CollectionDate != undefined)
                    $scope.SemenFreez.CollectionTime = new Date($scope.SemenFreez.CollectionDate);
                if ($scope.SemenFreez.ReceivingTime != undefined)
                    $scope.SemenFreez.ReceivingTime = new Date($scope.SemenFreez.ReceivingTime);
                if ($scope.SemenFreez.SpremFreezingTime != undefined)
                    $scope.SemenFreez.SpremFreezingTime = new Date($scope.SemenFreez.SpremFreezingTime);

                $scope.IsUpdateFinalize = $scope.SemenFreez.IsFinalized;    
                //Change Save Button Name
                $scope.btnSaveUpdate = "Update";
                //$scope.FormNo = FormNo;
                if (!$scope.isNullOrUndefined($scope.SemenFreez.SSRNo)) {
                    $scope.ViewBtnName = $scope.SemenFreez.SSRNo;
                    $scope.IsViewBtnDisable = false;
                }
                else {
                    $scope.ViewBtnName = 'View';
                    $scope.IsViewBtnDisable = true;
                }
                if ($scope.SemenFreez.IsFinalized == true)
                    $scope.SemenFreez.IsDisableUpdate = true;
                else
                    $scope.SemenFreez.IsDisableUpdate = false;
                //by rohini
                $scope.GetSemenFreezListByFormNo(FormNo, "SpremFreezingDetailsFromDonor", ID, UnitID);
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }
        else if (Action == "SpremFreezingDetailsFromDonor") {
            debugger;
            usSpinnerService.spin('GridSpinner');
            //var ResponseData = srvSemenFreez.GetSemenFreezListByFormNo(FormNo, Action, ID, UnitID);  commented by Nayan Kamble
            var ResponseData = DonorSrv.GetSemenFreezListByFormNo(FormNo, Action, ID, UnitID);
            ResponseData.then(function (Response) {
                debugger;
                usSpinnerService.stop('GridSpinner');
                //$scope.SpremFreezingDetailsList = Response.data;
                $scope.ListItem = Response.data;
                angular.forEach($scope.ListItem, function (item, index) {
                    item["ExpiryDate"] = new Date(item["ExpiryDate"]);
                })               
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }
    };
    $scope.isNullOrUndefined = function (value) {
        return (!value) && (value === null)
    }
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
    $scope.VialsList = function VialsList() {
        var ResponseData = Common.getMasterList('M_IVFStrawMaster', 'IVFStrawID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.VialsList = Response.data;
            //   $scope.SemenFreez.StrawId = 0;
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

    $scope.GobletColorList = function GobletColorList() {
        var ResponseData = Common.getMasterList('M_IVFGobletColor', 'IVFGCOLORID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.GobletColorList = Response.data;
            //    $scope.SemenFreez.GobletColorID = 0;
        }, function (error) {
        });
    }
    $scope.GobletSizeList = function GobletSizeList() {
        var ResponseData = Common.getMasterList('M_IVFGobletSizeMaster', 'IVFGobletSizeID', 'Description');
        ResponseData.then(function (Response) {
            //  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.GobletSizeList = Response.data;
            //    $scope.SemenFreez.GobletSizeId = 0;
        }, function (error) {
        });
    }

    $scope.GetEmbryologyDoctorsList = function FillCanList() {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //  
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data.EmbryologistAndrologist;
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
                GobletColorID: 0,
                GobletSizeId: 0,
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
        debugger;
        if ($scope.ListItem.length > 1) {
            $scope.ListItem.splice(idx, 1);
            $scope.SemenFreez.NoOfVials = $scope.SemenFreez.NoOfVials - 1
        }
        else {
            AlertMessage.info("Row can not be deleted.");
        }
    }

    $scope.SaveUpdate = function (SemenFreez) {
        debugger;
        $scope.ValidateSemenFreezDetail();//by rohini
        $scope.checkSum();
        if ($scope.frmSemenFreez.$valid && $scope.IsValidSemenFreezDetail && $scope.SemenFreez.DoneBy != 0 && $scope.SemenFreez.WitnessedBy != 0)// $scope.ValidateSemenFreez() &&
        {
            
            SemenFreez.ReceivingDate = $filter('date')(SemenFreez.ReceivingDate, 'medium');
            if (SemenFreez.SpremFreezingDate == undefined)
                SemenFreez.SpremFreezingDate = new Date();
            else
                SemenFreez.SpremFreezingDate = $filter('date')(SemenFreez.SpremFreezingDate, 'medium');           
            SemenFreez.ReceivingTime = $filter('date')(SemenFreez.ReceivingTime, 'medium');
            SemenFreez.SpremFreezingTime = $filter('date')(SemenFreez.SpremFreezingTime, 'medium');
            SemenFreez.lstFreezDetails = $scope.ListItem;
            if ($scope.sNoArray != null)
                SemenFreez.SSRNo = $scope.sNoArray[0];
            SemenFreez.DonorID = $scope.DonorObj.ID;
            SemenFreez.DonorUnitID = $scope.DonorObj.UnitID;
            usSpinnerService.spin('GridSpinner');
            var Promise = srvSemenFreez.SaveUpdate(SemenFreez);
            Promise.then(function (resp) {
                usSpinnerService.stop('GridSpinner');
                if (resp.data == 1)
                {
                    AlertMessage.info('PalashIVF', 'Record saved successfully.');
                    $location.path('/Donor/');
                }                
                else if (resp.data == 2)
                {
                    AlertMessage.info('PalashIVF', 'Record updated successfully.');
                    $location.path('/Donor/');
                }            
                else if (resp.data == 0)
                    AlertMessage.info('PalashIVF', 'Error Occured While Adding Details');               
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }
        else {
            // $scope.frmSemenFreez.ddlTypeofSperm.$dirty = true;;
            $scope.frmSemenFreez.txtCryoNo.$dirty = true;
            $scope.frmSemenFreez.txtVolume.$dirty = true;
            $scope.frmSemenFreez.txtSpermConce.$dirty = true;
            $scope.frmSemenFreez.txtProgressive.$dirty = true;
            $scope.frmSemenFreez.txtNonProgressive.$dirty = true;
            $scope.frmSemenFreez.txtImmotile.$dirty = true;
            $scope.frmSemenFreez.ddlDoneby.$dirty = true;
            $scope.frmSemenFreez.ddlWitnessedby.$dirty = true;
        }
    }

    $scope.CheckDuplicateCryoNo = function CheckDuplicateCryoNo(idx, Item) {
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

    $scope.CalculateMotilityAss = function () {
        
        if ((angular.isDefined($scope.SemenFreez.GradeA) && $scope.SemenFreez.GradeA != '') && (angular.isDefined($scope.SemenFreez.GradeB) && $scope.SemenFreez.GradeB != '')) {
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            $scope.ChkImmotile();
            $scope.SemenFreez.GradeC = 100 - (parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB));
            if ($scope.SemenFreez.GradeC < 0) { 
                $scope.SemenFreez.GradeA = null;//$scope.OGradeA;
                //$scope.SemenFreez.GradeB = $scope.OGradeB;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
            }
        }
        else if ((angular.isDefined($scope.SemenFreez.GradeA) && $scope.SemenFreez.GradeA != '') && ($scope.SemenFreez.GradeB == '' || angular.isUndefined($scope.SemenFreez.GradeB)) && (angular.isDefined($scope.SemenFreez.GradeC) && $scope.SemenFreez.GradeC != '')) {
            $scope.SemenFreez.GradeB = 100 - (parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeC));
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            if ($scope.SemenFreez.GradeB < 0) {
                $scope.SemenFreez.GradeA = null;//$scope.OGradeA;
                // $scope.SemenFreez.GradeB = $scope.OGradeB;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
            }
        }
        else if ((angular.isUndefined($scope.SemenFreez.GradeA) || $scope.SemenFreez.GradeA == '') && ($scope.SemenFreez.GradeB != '' || angular.isDefined($scope.SemenFreez.GradeB)) && (angular.isDefined($scope.SemenFreez.GradeC) && $scope.SemenFreez.GradeC != '')) {
            $scope.SemenFreez.GradeA = 100 - (parseInt($scope.SemenFreez.GradeB) + parseInt($scope.SemenFreez.GradeC));
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            if ($scope.SemenFreez.GradeA < 0) {
                $scope.SemenFreez.GradeA = null;//$scope.OGradeA;
                // $scope.SemenFreez.GradeB = $scope.OGradeB;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100')
            }
        }
    }
    $scope.CalculateMotilityAss1 = function () {
        
        if ((angular.isDefined($scope.SemenFreez.GradeA) && $scope.SemenFreez.GradeA != '') && (angular.isDefined($scope.SemenFreez.GradeB) && $scope.SemenFreez.GradeB != '')) {
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            $scope.ChkImmotile();
            $scope.SemenFreez.GradeC = 100 - (parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB));
            if ($scope.SemenFreez.GradeC < 0) {
                //$scope.SemenFreez.GradeA = $scope.OGradeA;
                $scope.SemenFreez.GradeB = null;//$scope.OGradeB;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
            }
        }
        else if ((angular.isDefined($scope.SemenFreez.GradeA) && $scope.SemenFreez.GradeA != '') && ($scope.SemenFreez.GradeB == '' || angular.isUndefined($scope.SemenFreez.GradeB)) && (angular.isDefined($scope.SemenFreez.GradeC) && $scope.SemenFreez.GradeC != '')) {
            $scope.SemenFreez.GradeB = 100 - (parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeC));
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            if ($scope.SemenFreez.GradeB < 0) {
                // $scope.SemenFreez.GradeA = $scope.OGradeA;
                $scope.SemenFreez.GradeB = null;//$scope.OGradeB;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
            }
        }
        else if ((angular.isUndefined($scope.SemenFreez.GradeA) || $scope.SemenFreez.GradeA == '') && ($scope.SemenFreez.GradeB != '' || angular.isDefined($scope.SemenFreez.GradeB)) && (angular.isDefined($scope.SemenFreez.GradeC) && $scope.SemenFreez.GradeC != '')) {
            $scope.SemenFreez.GradeA = 100 - (parseInt($scope.SemenFreez.GradeB) + parseInt($scope.SemenFreez.GradeC));
            $scope.SemenFreez.Motility = parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB);
            if ($scope.SemenFreez.GradeA < 0) {
                //   $scope.SemenFreez.GradeA = $scope.OGradeA;
                $scope.SemenFreez.GradeB = $scope.OGradeB;
                $scope.SemenFreez.GradeC = $scope.OGradeC;
                $scope.SemenFreez.Motility = null;
                AlertMessage.info('PalashIVF', 'Percentage should be less than 100')
            }
        }
    }

    $scope.ChkImmotile = function () {
        //  
        if (parseInt($scope.SemenFreez.GradeA) + parseInt($scope.SemenFreez.GradeB) + parseInt($scope.SemenFreez.GradeC) > 100)
            AlertMessage.info('PalashIVF', 'Percentage should be less than 100');
    }

    $scope.CalcRapidProg = function () {
        debugger;
        if ($scope.SemenFreez.GradeA == undefined || $scope.SemenFreez.GradeA == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
            $scope.SemenFreez.SlowProgressive = 0;
        }
        else if ((parseInt($scope.SemenFreez.RapidProgressive) + parseInt($scope.SemenFreez.SlowProgressive)) > parseInt($scope.SemenFreez.GradeA)) {
            AlertMessage.info('PalashIVF', 'Sum of rapid and slow progressive should be equal to progressive');
            $scope.SemenFreez.SlowProgressive = 0;
        }
        else {
            // if (parseInt($scope.ORapidProgressive) != parseInt($scope.SemenFreez.RapidProgressive)) {
            $scope.SemenFreez.RapidProgressive = parseInt($scope.SemenFreez.GradeA) - parseInt($scope.SemenFreez.SlowProgressive);
            if ($scope.SemenFreez.RapidProgressive < 0) {
                AlertMessage.info('PalashIVF', 'Sum of rapid and slow progressive should be equal to progressive');
                $scope.SemenFreez.RapidProgressive = $scope.ORapidProgressive;
                $scope.SemenFreez.SlowProgressive = $scope.OSlowProgressive;
            }              
            if (parseInt($scope.SemenFreez.SlowProgressive))
                $scope.IsMandatory = true;
            else $scope.IsMandatory = false;
            //}
        }
    }

    $scope.CalcSlowProg = function () {
        debugger;
        if ($scope.SemenFreez.GradeA == undefined || $scope.SemenFreez.GradeA == '') {
            AlertMessage.info('PalashIVF', 'Select progressive first.');
            $scope.SemenFreez.RapidProgressive = 0;
        }
        else if ((parseInt($scope.SemenFreez.RapidProgressive) + parseInt($scope.SemenFreez.SlowProgressive)) > parseInt($scope.SemenFreez.GradeA)) {
            AlertMessage.info('PalashIVF', 'Sum of rapid and slow progressive should be equal to progressive');
            $scope.SemenFreez.RapidProgressive = 0;
        }
        else {
            //if (parseInt($scope.OSlowProgressive) != parseInt($scope.SemenFreez.SlowProgressive)) {
            $scope.SemenFreez.SlowProgressive = parseInt($scope.SemenFreez.GradeA) - parseInt($scope.SemenFreez.RapidProgressive);
            if ($scope.SemenFreez.SlowProgressive < 0) {
                AlertMessage.info('PalashIVF', 'Sum of rapid and slow progressive should be equal to progressive');
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
            AlertMessage.info('PalashIVF', 'Select progressive first.');
        }
        else {
            if ($scope.OSlowProgressive != parseInt($scope.SemenFreez.SlowProgressive)) {
                //if ((angular.isDefined($scope.SemenFreez.RapidProgressive) || $scope.SemenFreez.RapidProgressive == '')) {
                if (isNaN($scope.SemenFreez.SlowProgressive)) $scope.SemenFreez.SlowProgressive = '';
                if (isNaN($scope.SemenFreez.RapidProgressive)) $scope.SemenFreez.RapidProgressive = '';
                $scope.SemenFreez.RapidProgressive = parseInt($scope.SemenFreez.GradeA) - parseInt($scope.SemenFreez.SlowProgressive);
                if ($scope.SemenFreez.RapidProgressive < 0) {
                    AlertMessage.info('PalashIVF', 'Sum of rapid and slow progressive should be equal to progressive');
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
                    AlertMessage.info('PalashIVF', 'Sum of rapid and slow progressive should be equal to progressive');
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
    //commentedby rohini 
    //$scope.ValidateSemenFreez = function () {
    //    var IsValid = true;
    //    if ($filter('date')($scope.SemenFreez.CollectionDate, 'shortDate') > $filter('date')($scope.SemenFreez.SpremFreezingDate, 'shortDate')) {
    //        AlertMessage.info('PalashIVF', 'Collection date should be less than or equal to Sprem Freezing Date');
    //        IsValid = false;
    //    }
    //    else if (angular.isUndefined($scope.SemenFreez.CollectionTime) || $scope.SemenFreez.CollectionTime == '') {
    //        AlertMessage.info('PalashIVF', 'Select collection time');
    //        IsValid = false;
    //    }
    //    else if ($filter('date')($scope.SemenFreez.CollectionTime, 'short') > $filter('date')($scope.SemenFreez.SpremFreezingTime, 'short')) {
    //        AlertMessage.info('PalashIVF', 'Collection time should be equal to or less than Time');
    //        IsValid = false;
    //    }
    //    else if (angular.isUndefined($scope.SemenFreez.SpremFreezingTime) || $scope.SemenFreez.SpremFreezingTime == '') {
    //        AlertMessage.info('PalashIVF', 'Select sprem freezing time');
    //        IsValid = false;
    //    }
    //    else if (angular.isUndefined($scope.SemenFreez.ReceivingTime) || $scope.SemenFreez.ReceivingTime == '') {
    //        AlertMessage.info('PalashIVF', 'Select receiving time');
    //        IsValid = false;
    //    }
    //    else if ($filter('date')($scope.SemenFreez.ReceivingDate, 'shortDate') < $filter('date')($scope.SemenFreez.CollectionDate, 'shortDate')) {
    //        AlertMessage.info('PalashIVF', 'Receiving date should be greater than or equal to Collection Date');
    //        IsValid = false;
    //    }
    //    else if ($filter('date')($scope.SemenFreez.ReceivingDate, 'shortDate') > $filter('date')($scope.SemenFreez.SpremFreezingDate, 'shortDate')) {
    //        AlertMessage.info('PalashIVF', 'Receiving date should be less than Sprem freezing date');
    //        IsValid = false;
    //    }
    //    else if ($filter('date')($scope.SemenFreez.ReceivingTime, 'short') < $filter('date')($scope.SemenFreez.CollectionTime, 'short')) {
    //        AlertMessage.info('PalashIVF', 'Receiving time should be greater than or equal to Collection time');
    //        IsValid = false;
    //    }
    //    else if ($filter('date')($scope.SemenFreez.ReceivingTime, 'short') > $filter('date')($scope.SemenFreez.SpremFreezingTime, 'short')) {
    //        AlertMessage.info('PalashIVF', 'Receiving time should be less than Sprem freezing time');
    //        IsValid = false;
    //    }
    //    $scope.ValidateSemenFreezDetail();
    //    return IsValid;
    //}
    $scope.ValidateSemenFreezDetail = function () {
        //  
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
        for (var i = 0; i <= $scope.ListItem.length - 1; i++) {
            if ($scope.ListItem[i].TankId == 0 || ($scope.ListItem[i].VolumeDetail == undefined || $scope.ListItem[i].VolumeDetail == '')) {
                $scope.IsValidSemenFreezDetail = false;
                break;
            }
        }
        //   $scope.IsValidSemenFreezDetail = $scope.ListItem.some(x => x.TankId == 0 || (x.VolumeDetail == undefined || x.VolumeDetail == ''));
        //commented by neena for manual cryo no entry
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
        //
        //if ($scope.SemenFreez.GradeA != parseInt($scope.SemenFreez.SlowProgressive) + parseInt($scope.SemenFreez.RapidProgressive)) {
        //    //$scope.IsValidSemenFreezDetail = false;

        //   // AlertMessage.info("Please enter valid Slow Progressive & rapid Progressive ");
        //}
    }
    $scope.checkSum = function () {
        var Sum = 0;
        angular.forEach($scope.ListItem, function (i) {
            Sum = parseFloat(Sum) + parseFloat(i.VolumeDetail);
        })
        if (Sum > parseFloat($scope.SemenFreez.Volume)) {
            AlertMessage.info('PalashIVF', 'The sum of the Line item volumes shall be equal to or less than the Volume in Pre Freezing details');
            Sum = Sum - parseFloat($scope.SemenFreez.Volume);
            $scope.IsValidSemenFreezDetail = false;
        }
    }

    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
        //  if (selectPatient.GenderID == 1) {
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 601 && lstUserRights[z].Active)// Donor
            {
                $scope.objRgt = lstUserRights[z];
                break;
            }
        }
        //  }
        if (!$scope.objRgt.IsCreate && (!angular.isObject($scope.Donor) || angular.equals($scope.Donor, {}))) {
            angular.element(btnDonor).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && (angular.isObject($scope.Donor) && !angular.equals($scope.Donor, {}))) {
            angular.element(btnDonor).prop('disabled', true);
        }
        else {
            angular.element(btnDonor).prop('disabled', false);
        }
    }

    //Start Report     Added by Nayan Kamble
    $scope.PrintDonorSample = function PrintDonorSample(Item) {
        debugger;
        //var a = encodeURIComponent('U=' + Item.SNo + '&SNo=' + Item.SNo + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
       // var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&FrmNo=' + Item.SNo + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PU=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID);
        var a = encodeURIComponent('U=' + Item.UnitID + '&FrmNo=' + Item.FormNo + '&P=' + Item.DonorID + '&PU=' + Item.DonorUnitID);    

        window.open('/Reports/EMR/DonorSampleWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    //END Report

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
                debugger;
                if (event.which == 64 || event.which == 16) {
                    // numbers  
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40,9].indexOf(event.which) > -1) {
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
                } else if ([46, 110, 190,9].indexOf(event.which) > -1 && (model != undefined || model != '') && parseInt(model) != 9) {
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