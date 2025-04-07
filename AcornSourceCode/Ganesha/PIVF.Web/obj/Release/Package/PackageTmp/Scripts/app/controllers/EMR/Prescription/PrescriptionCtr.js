
'use strict';
angular.module('PIVF').controller('PrescriptionCtr', function ($scope, $filter, $rootScope, $uibModal, localStorageService, PrescriptionSrv, AlertMessage, srvCommon, $uibModalStack, Common, $location, $linq, swalMessages, usSpinnerService, $timeout) {
    //Data MembersF
    $rootScope.FormName = 'Prescription';
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.DrugList = [];
    $scope.MoleculeList = [];
    $scope.PriCheckedList = [];
    $scope.FavCheckedList = [];
    $scope.BrandName = "";
    $scope.MoleculeName = "";
    $scope.IsBrand = 1; //for brand 
    $scope.IsMolecule = 0;
    $scope.TodaysDrugs = {};
    $scope.TodaysDrugs.PriFavGrugList = [];
    $scope.TodaysDrugs.DrugList = [];
    $scope.TodaysDrugs.PriDrugList = [];
    $scope.TodaysDrugs.FavDrugList = [];
    $scope.PrescriptionFollowUpDate;
    $scope.FavDrug = {};
    $scope.FavDrugList = [];
    $scope.FavTemplateList = [];
    $scope.FavItemList = [];
    $scope.FavDrug.TemplateID = 0;
    $scope.FavDrug.IsBrand = 1; //for brand 
    $scope.FavDrug.IsMolecule = 0;
    $scope.FavDrug.IsNewTemp = 1;
    $scope.FavDrug.IsExiTemp = 0;
    $scope.Flag = "in";
    usSpinnerService.spin('GridSpinner');
    $scope.IsFirstResponse = false;
    $scope.IsSecondResponse = false;
    $scope.IsThirdResponse = false;
    $scope.IsFourthResponse = false;
    $scope.IsDelete = false;
    $scope.isDoctor = localStorageService.get("UserInfo").IsDoctor;
    $scope.disableClick = false; //Added by Nayan Kamble on 13/06/2019  
    //selected patient set 
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    var SelectedCouple = {};
    SelectedCouple = Common.getSelectedCouple();
    //
    /*navigation btn text on selected patient*/
    if (selectPatient.GenderID == 1)
        $scope.btnText = 'Female Prescription';
    else if (selectPatient.GenderID == 2)
        $scope.btnText = 'Male Prescription';
    /*--*/
    var UserInfo = localStorageService.get("UserInfo");

    //// for sorting
    $scope.SortColumn = "ItemName";
    $scope.reverseSort = false;
    $scope.SortData = function (column) {

        $scope.reverseSort = ($scope.SortColumn == column) ? !$scope.reverseSort : false;
        $scope.SortColumn = column;
        if ($scope.SortColumn == column)
            $scope.sortClass = $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass = '';
    }
    //
    //to set msg
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }


    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.open1 = function () {
        debugger;
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };
    $scope.dateOptions = {
     
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date(),//.setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    

    //MembersFunctions
    $scope.PageSetup = function PageSetup(Value) {
        debugger;
        var Obj = Common.getObj();
        Common.clearObj();

        if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;
        if (Obj.IsNewPrescription == 11 && Value == 1) {
            //4 button click  ANIMATION
            $scope.TAnimation = "preBox1 transform1 transform-active";
            $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
            $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
            $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
        }
        else if (Value == 1) {
            //4 button click  ANIMATION
            $scope.TAnimation = "preBox1 transform1";
            $scope.PAnimation = "preBox2 transform2";
            $scope.SAnimation = "preBox3 transform3";
            $scope.FAnimation = "preBox4 transform4";
        }
        if (Value == 1) {
            $scope.FillDropDowns();
            $scope.GetDrugList();
            $scope.GetMoliculeList();
            $scope.GetTemplateList();
        }
        $scope.getAllergyMolecules();
        $scope.GetTodaysPrecscription();
     
       
        $scope.GetTemplateAndItems();
        $scope.GetTemplateList();
        $scope.GetUserrights();
        $timeout(function () {
            $scope.GetPreviousPrescriptionDetails();
        }, 1200);
    }


    $scope.GetAllResponse = function () {
        if ($scope.IsFirstResponse == true && $scope.IsSecondResponse == true && $scope.IsThirdResponse == true) {
            usSpinnerService.stop('GridSpinner');
        }
    };

    $scope.getAllergyMolecules = function () {
        debugger;
        var response = PrescriptionSrv.getAllergyMolecules();
        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $scope.allMolecule = [];
                $scope.allMolecule =resp.data.split(',');
            }
        });
    }

    $scope.GetDrugList = function GetDrugList() {
        var response = PrescriptionSrv.GetDrugList(UserInfo.UnitID);
        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $scope.DrugList = resp.data;
            }
        });
    }
    $scope.GetMoliculeList = function GetDrugList() {
        var ResponseData = Common.getMasterList('M_Molecule', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MoleculeList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FillDropDowns = function () {
        var ResponseData = Common.getMasterList('M_Route', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.RouteList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });

        var ResponseData = Common.getMasterList('M_Instruction', 'InstructionID', 'InsDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.InstructionList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
        $scope.FillFrequency();
    }
    $scope.FillFrequency = function () {
        debugger;
        var ResponseData = PrescriptionSrv.FillFrequency();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.FrequencyList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.GetTodaysPrecscription = function GetTodaysPrecscription() {
        debugger;

        $scope.IsFirstResponse = false;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = PrescriptionSrv.GetTodaysPrescriptionDetails();
        ResponseData.then(function (Response) {
            debugger;
            $scope.IsFirstResponse = true;
            $scope.GetAllResponse();
            $scope.TodaysDrugs = Response.data;
            if ($scope.TodaysDrugs == null) {
                $scope.TodaysDrugs = {};
                $scope.TodaysDrugs.DrugList = [];
            }

            // if (!angular.isUndefined(Response.data.PrescriptionFollowUpDate)) { // comment sujata for follow up date

            if( Response.data.PrescriptionFollowUpDate==null){
                // Response.data.PrescriptionFollowUpDate = new Date(Response.data.PrescriptionFollowUpDate);  // comment sujata for follow up date
                Response.data.PrescriptionFollowUpDate=new date();  // added sujata for follow up date
            }
            else {
                Response.data.PrescriptionFollowUpDate = new Date(Response.data.PrescriptionFollowUpDate);
            }
            
          
                           


        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.GetPreviousPrescriptionDetails = function () {
        debugger;
        $scope.IsSecondResponse = false;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = PrescriptionSrv.GetPreviousPrescriptionDetails();
        ResponseData.then(function (Response) {
            $scope.IsSecondResponse = true;
            $scope.GetAllResponse();
            $scope.TodaysDrugs.PriDrugList = Response.data;
        }, function (error) {
            $scope.Error = error;
        });
    }


    $scope.GetTemplateAndItems = function GetTemplateAndItems() {
        $scope.IsThirdResponse = false;
        usSpinnerService.spin('GridSpinner');
        var response = PrescriptionSrv.GetTemplateAndItems();
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.IsThirdResponse = true;
                $scope.GetAllResponse();
                $scope.FavTemplateList = resp.data;
                $scope.FavTemplateList.CollapseIn = "";
            }
        });
    }
    $scope.GetTemplateList = function () {
        //GetTemplateList
        var ResponseData = PrescriptionSrv.GetTemplateList();
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.TemplateList = Response.data;
            $scope.FavDrug.TemplateID = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.OnChange = function OnChange(i) {
        if (i == 1) {
            $scope.IsBrand = 1;
            $scope.IsMolecule = 0;
        }
        else if (i == 2) {
            $scope.IsMolecule = 1;
            $scope.IsBrand = 0;
        }
    }
    $scope.OnChangeFav = function OnChangeFav(i) {
        if (i == 1) {
            $scope.FavDrug.IsBrand = 1;
            $scope.FavDrug.IsMolecule = 0;
        }
        else if (i == 2) {
            $scope.FavDrug.IsMolecule = 1;
            $scope.FavDrug.IsBrand = 0;
        }
    }
    $scope.OnChangeTemp = function OnChangeTemp(i) {
        if (i == 1) {
            $scope.FavDrug.IsNewTemp = 1;
            $scope.FavDrug.IsExiTemp = 0;
            $scope.FavDrug.TemplateID = 0;
        }
        else if (i == 2) {
            $scope.FavDrug.IsNewTemp = 0;
            $scope.FavDrug.IsExiTemp = 1;
            $scope.FavDrug.TemplateID = 0;
        }
    }
    $scope.PriDrugChecked = function PriDrugChecked(Item) {

        if (Item.IsChecked == true) {
            $scope.PriCheckedList.push(Item);
        }
        else {
            for (var i = 0; i <= $scope.PriCheckedList.length - 1; i++) {
                if ($scope.PriCheckedList[i].ID == Item.ID)
                    $scope.PriCheckedList.splice(i, 1);
            }
            //  $scope.PriCheckedList.splice($scope.PriCheckedList.indexOf($scope.PriCheckedList.find(x=>x.ID == Item.ID)), 1);
        }
    }
    $scope.ItemTempChecked = function ItemTempChecked(Item2, List) {
        if (Item2.IsChecked == true) {
            $scope.FavCheckedList.push(Item2);
            $scope.ItemCheckedList = $filter('filter')(List, function (d) { return d.IsChecked == false });
            if ($scope.ItemCheckedList == 0) {
                for (var i = 0; i <= $scope.FavTemplateList.length - 1; i++) {
                    if ($scope.FavTemplateList[i].ID == Item2.TemplateID) {
                        $scope.FavTemplateList[i].IsChecked = true; break;
                    }
                }
            }
        }
        else {
            for (var i = 0; i <= $scope.FavCheckedList.length - 1; i++) {
                if ($scope.FavCheckedList[i].ID == Item2.ID)
                    $scope.FavCheckedList.splice(i, 1);
            }
            for (var i = 0; i <= $scope.FavTemplateList.length - 1; i++) {
                if ($scope.FavTemplateList[i].ID == Item2.TemplateID) {
                    $scope.FavTemplateList[i].IsChecked = false; break;
                }
            }
            //  $scope.FavCheckedList.splice($scope.FavCheckedList.indexOf($scope.FavCheckedList.find(x=>x.ID == Item2.ID)), 1);
        }
    }
    $scope.TempChecked = function TempChecked(Item1, Index) {
        debugger;
        if (Item1.IsChecked == true) {
            //$scope.FavCheckedList.push(Item);
            angular.forEach(Item1.FavDrugList, function (Item) {
                //Item.ID = 0;
                Item.IsChecked = true;
                $scope.FavCheckedList.push(Item);
            });
            // Item1.CollapseIn = " in";  //to expand when checked template 
            //   Item1.FavDrugList = Item1.FavDrugList;
        }
        else {
            angular.forEach(Item1.FavDrugList, function (Item, idx) {
                // Item.ID = 0;
                Item.IsChecked = false;
                for (var i = 0; i <= $scope.FavCheckedList.length - 1; i++) {
                    if ($scope.FavCheckedList[i].ID == Item.ID)
                        $scope.FavCheckedList.splice(i, 1);
                }
                // $scope.FavCheckedList.splice($scope.FavCheckedList.indexOf($scope.FavCheckedList.find(x=>x.ID == Item.ID)), 1);
            });
        }
    }
    $scope.CheckDuplicate = function (Item, Index) {
        debugger;
        $scope.disableClick = false; //Added by Nayan Kamble on 13/06/2019   
        if (Item.RouteID ==5)
        {
            Item.Quantity = 1;
        } 
        $scope.RouteChkList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.RouteID != 0 || d.FrequencyID != 0 });
        if (Item.RouteID != 0 && Index != undefined) {
            angular.forEach($scope.RouteChkList, function (element, i) {
                if (element.ItemName == Item.ItemName && element.RouteID == Item.RouteID && element.FrequencyID == Item.FrequencyID && Index != i) {
                    element.IsDuplicate = true;
                }
                else
                    element.IsDuplicate = false;
            });
        }
        $scope.CalQuantity(Item, Index);
    }
    $scope.CalQuantity = function (Items, Index) {
        debugger;
        $scope.disableClick = false; //Added by Nayan Kamble on 13/06/2019
        $scope.FreqQty = 0;
        angular.forEach($scope.FrequencyList, function (Item) {
            if (Items.FrequencyID == Item.ID) {
                $scope.FreqQty = Item.FreqQuantity;
            }
        });

        if (Items.Days >=0 && Items.Days <= 365 ) {      //Added by Nayan Kamble
            Items.Quantity = $scope.FreqQty * Items.Days;
        }
        else {
            //AlertMessage.warning("PalashIVF", "Enter Days Between 1 to 365");      //Added by Nayan Kamble //Commented by swatih for localization 15/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgEnterDaysBetween1to365);//Modified by swatih for localization 15/7/2020
            $scope.disableClick = false; //Added by Nayan Kamble on 17/12/2019
        }

        //Items.Quantity = $scope.FreqQty * Items.Days;   //Commented by Nayan Kamble
        $scope.CheckDuplicate(Items, Index);
    }
    $scope.AddPriToTodaysDrugs = function AddPriToTodaysDrugs() {
        debugger;
        if ($scope.PriCheckedList.length == 0) {
            //AlertMessage.success("PalashIVF", "Please Select Any Records");//Commented by swatih for localization 15/7/2020
            AlertMessage.success(objResource.msgTitle, objResource.msgPleaseSelectAnyRecords);//Modified by swatih for localization 15/7/2020
        }
        else {
            angular.forEach($scope.PriCheckedList, function (Item) {
                Item.ID = 0;
                Item.Status = true;
                $scope.TodaysDrugs.DrugList.push(Item);
            });

            $scope.PriCheckedList = [];
            angular.forEach($scope.TodaysDrugs.PriDrugList, function (Item) {
                if (Item.IsChecked == true)
                    Item.IsChecked = false;
            });

            $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
            $scope.TAnimation = "preBox1 transform1 transform-active";
            $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
            $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
            //AlertMessage.success("PalashIVF", "Added To Todays List");//Commented by swatih for localization 15/7/2020
            AlertMessage.success(objResource.msgTitle, objResource.lblAddedToTodaysList);//Modified by swatih for localization 15/7/2020
        }
     
    }
    $scope.AddFavToTodaysDrugs = function AddFavToTodaysDrugs() {
        debugger;
        if ($scope.FavCheckedList.length > 0) {
            var IsPresent = true;
            var drugName = '';
            if ($rootScope.Allergies == null) {
                $rootScope.Allergies = '';
            }
            angular.forEach($scope.FavCheckedList, function (Item) {
                debugger
                Item.Status = true;
                if ($rootScope.Allergies.includes(Item.ItemName) || $rootScope.Allergies.includes(Item.MoleculeName)) {
                    IsPresent = false;
                    if ($rootScope.Allergies.includes(Item.ItemName))
                        drugName = Item.ItemName;
                    else
                        drugName = Item.MoleculeName;
                   
                }
                //   $scope.TodaysDrugs.DrugList.push(Item);
            });
            if (IsPresent) {
                var IsArrergyPresent = true;
                var AllergyPresent='';
                for (var ii = 0; ii < $scope.MoleculeList.length; ii++) {

                    //for (var jj = 0; jj < $scope.FavCheckedList.length; jj++) {

                    //    if ($scope.FavCheckedList[jj].MoleculeName == $scope.MoleculeList[ii].Description) {
                    //        for (var k = 0; k < $scope.allMolecule.length; k++) {
                    //            if ($scope.MoleculeList[ii].ID == $scope.allMolecule[k]) {
                    //                IsArrergyPresent = false;
                    //                AllergyPresent = $scope.MoleculeList[ii].Description;
                    //                break;
                    //            }
                    //        }
                    
                    //    }
                    for (var jj = 0; jj < $scope.FavCheckedList.length; jj++) {

                        if ($scope.FavCheckedList[jj].MoleculeName == $scope.MoleculeList[ii].Description) {
                            if (!IsArrergyPresent) {
                                break;
                                
                                for (var k = 0; k < $scope.allMolecule.length; k++) {

                                    if ($scope.MoleculeList[ii].ID == $scope.allMolecule[k]) {
                                        IsArrergyPresent = false;
                                        AllergyPresent = $scope.MoleculeList[ii].Description;
                                        break;
                                    }

                                }
                            }
                        }


                        if (!IsArrergyPresent) {
                            break;
                        }
                    }
                    if (!IsArrergyPresent) {
                        break;
                    }

                }
                if (IsArrergyPresent) {
                    angular.forEach($scope.FavCheckedList, function (Item) {
                        Item.AddedByName = UserInfo.UserName;
                        Item.ID = 0;

                        $scope.TodaysDrugs.DrugList.push(Item);
                    });
                    $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
                    $scope.TAnimation = "preBox1 transform1 transform-active";
                    $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
                    $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
                    //AlertMessage.success("PalashIVF", "Added To Todays List");//Commented by swatih for localization 15/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.lblAddedToTodaysList);//Modified by swatih for localization 15/7/2020
                }
                else {
                    //AlertMessage.info('PalashIVF', 'Patient is allergies to "' + AllergyPresent + '",you can not prescribed.');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgPatientisallergiesto + AllergyPresent + objResource.msgyoucannotprescribed);//Modified by swatih for localization 15/7/2020
                }
            }
            else {
                //AlertMessage.info('PalashIVF', 'Patient is allergies to "' + drugName + '",you can not prescribed.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgPatientisallergiesto + drugName + objResource.msgyoucannotprescribed);//Modified by swatih for localization 15/7/2020
            }
        }
        else {
            //AlertMessage.success("PalashIVF", "Select At least one Drug");//Commented by swatih for localization 15/7/2020
            AlertMessage.success(objResource.msgTitle, objResource.msgSelectAtleastoneDrug);//Modified by swatih for localization 15/7/2020
        }
       
    }
    $scope.getMatchingBrand = function ($viewValue) {
        debugger;
        var matchingStuffs = [];

        for (var i = 0; i < $scope.DrugList.length; i++) {
            if (
              $scope.DrugList[i].Code.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.DrugList[i]);
            }
        }
        return matchingStuffs;
    }

    $scope.getMatchingFavouriteDrug = function ($viewValue) {       //Added by Nayan Kamble on 26/12/2019   for search functionality in Favourite Drug
        debugger;
        var matchingStuffs = [];

        for (var i = 0; i < $scope.FavTemplateList.length; i++) {
            if (
              $scope.FavTemplateList[i].TemplateName.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.FavTemplateList[i]);
            }
        }
        return matchingStuffs;
    }
    $scope.getMatchingMolecule = function ($viewValue) {
        var matchingStuffs = [];

        for (var i = 0; i < $scope.MoleculeList.length; i++) {
            if ($scope.MoleculeList[i].Description.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.MoleculeList[i]);
            }
        }
        return matchingStuffs;
    }
    //To get selected Patient details
    $scope.onSelect = function ($item, $model, $label) {
        debugger;
        if ($scope.allMolecule == undefined) { $scope.allMolecule = []; }
        var idx = $scope.allMolecule.indexOf($model.ID.toString());
        if ($scope.allMolecule.indexOf($model.ID.toString()) == -1) {
            $scope.SelectedDrug = $model;   //selected drugs details   
            $scope.AddDrug();
        }
        else {
            //AlertMessage.info('PalashIVF', 'Patient is allergies to "' + $label + '",you can not prescribed.');//Commented by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgPatientisallergiesto + $label + objResource.msgyoucannotprescribed);//Modified by swatih for localization 15/7/2020
            $model = null;
            $item = null;
            $scope.SelectedDrug = null;
        }
    };
    $scope.onSelect1 = function ($item, $model, $label) {
        debugger;
        $scope.SelectedDrug = $model;   //selected drugs details   
        $scope.AddFavDrug($scope.FavDrug);
    };


    $scope.onSelect2 = function ($item, $model, $label) {         //Added by Nayan Kamble on 26/12/2019   for search functionality in Favourite Drug
        debugger;
        $scope.SelectedFavouriteDrug = $model;   //selected drugs details   
        //$scope.AddFavDrug($scope.FavDrug);
    };





    $scope.AddDrug = function () {
        debugger;
        if ($scope.IsMolecule == 0) {
            if ($scope.frmTdrugs.SelectedDrug.$valid) {
                var response = PrescriptionSrv.GetDrugDetailByItemID($scope.SelectedDrug.ID, UserInfo.UnitID);
                response.then(function (resp) {

                    if (resp.data != null) {

                        resp.data.Status = true;
                        resp.data.DrugSource = "-";
                        resp.data.AddedByName = UserInfo.UserName;
                        if (resp.data.FrequencyID == undefined || resp.data.FrequencyID == null)
                            resp.data.FrequencyID = 0;
                        if (resp.data.RouteID == undefined || resp.data.RouteID == null)
                            resp.data.RouteID = 0;
                        if (resp.data.InstructionID == undefined || resp.data.InstructionID == null)
                            resp.data.InstructionID = 0;

                        $scope.TodaysDrugs.DrugList.push(resp.data);
                    }
                });
            }
            else {
                $scope.frmTdrugs.SelectedDrug.$dirty = true;
            }
            $scope.SelectedDrug = null;
            $scope.SelectedMolecule = null;
        }
        else {
            if ($scope.frmTdrugs.SelectedMolecule.$valid) {

                $scope.Molecule = $scope.SelectedMolecule;
                var response = PrescriptionSrv.CheckMoleculeIsAllergies($scope.SelectedMolecule.ID);
                response.then(function (resp) {
                    if (resp.data == 0) {
                        $scope.Item = {
                            'Code': '', 'BrandName': '', 'ItemName': '', 'DrugID': 0, 'ID': 0, 'UOMID': 0, 'RouteID': 0, 'FrequencyID': 0, 'InstructionID': 0, 'DrugSourceId': 0,
                            'MRP': 0, 'RouteName': '', 'AvailableStock': 0.0, 'UOM': '', 'Strength': '', 'IsABC': 0, 'StrengthUnitTypeID': 0, 'IsFNS': false, 'IsVED': false, 'IssueStatus': false,
                            'Days': '', 'Quantity': 0, 'Warning': '', 'ResultStatus': 0, 'Dose': '', 'Frequency': '', 'IsOther': 0, 'Reason': '',
                            'MoleculeID': $scope.Molecule.ID, 'MoleculeName': $scope.Molecule.Description, 'AddedByName': UserInfo.UserName, 'IsMolecule': true, Status: true
                        }
                        $scope.TodaysDrugs.DrugList.push($scope.Item);
                    }
                    else {
                        //AlertMessage.info("PalashIVF", 'Patient is allergies to "' + $scope.Molecule.Description + '",you can not prescribed.');//Commented by swatih for localization 15/7/2020
                        AlertMessage.info(objResource.msgTitle, objResource.msgPatientisallergiesto + $scope.Molecule.Description + objResource.msgyoucannotprescribed);//Modified by swatih for localization 15/7/2020
                        $scope.SelectedMolecule = null;
                    }
                });
            }
            else {
                $scope.frmTdrugs.SelectedMolecule.$dirty = true;
            }
            $scope.SelectedMolecule = null;
            $scope.SelectedDrug = null;
        }

    }
    $scope.AddOtherDrug = function () {
        debugger;
        $scope.disableClick = false; //Added by Nayan Kamble on 13/06/2019
        $scope.Item = {
            'Code': '', 'BrandName': '', 'ItemName': '', 'DrugID': 0, 'ID': 0, 'UOMID': 0, 'RouteID': 0, 'FrequencyID': 0, 'InstructionID': 0, 'DrugSourceId': 0,
            'MRP': 0, 'RouteName': '', 'AvailableStock': 0.0, 'UOM': '', 'Strength': '', 'IsABC': 0, 'StrengthUnitTypeID': 0, 'IsFNS': 0, 'IsVED': 0, 'IssueStatus': 0,
            'Days': '', 'Quantity': 0, 'Warning': '', 'ResultStatus': 0, 'Dose': '', 'Frequency': '', 'IsOther': 1, 'Reason': '',
            'MoleculeID': 0, 'MoleculeName': '', 'AddedByName': UserInfo.UserName, 'IsMolecule': 0, 'Status': true
        }
        $scope.TodaysDrugs.DrugList.push($scope.Item);
    }
    $scope.RemoveAddDrugRow = function (Index, Item) {
        debugger;
        if (Item.ID >= 1) {

            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                templateUrl: 'DeleteTodaysmodel',
                controller: 'DeleteTodaysModelInfo',
                backdrop: false,
                keyboard: false,
                size: 'md',
                //resolve: {
                //    DeleteInfo: function () {
                //        return Item;
                //    }
                //}
            });
            modalInstance.result.then(function (data) { // return here after cancel reason entered
                if (!angular.equals({}, data)) {  //this scope is executed when save is click
                    Item.Comment = data.Comment;
                    Item.Status = false;
                    $scope.IsDelete = true;
                    $scope.SavePrescription();
                }
                else {
                    AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
                }
            });
        }
        else {
            $scope.TodaysDrugs.DrugList.splice(Index, 1);
        }
    };
    $scope.RemoveFavDrugRow = function (Index) {

        if ($scope.FavDrugList.length < 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else {
            $scope.FavDrugList.splice(Index, 1);
        }
    };
    //add drug from previous to todays drug
    $scope.AddFavDrug = function AddFavDrug(FavDrug) {
debugger;
        //if (($scope.FavDrug.TemplateID == 0 && $scope.FavDrug.IsExiTemp != 0) || ($scope.FavDrug.TemplateName == null && $scope.FavDrug.IsExiTemp == 0)) {
        //    $scope.frmSSR.ddlIndication.$dirty = true;
        //} else {
        if ($scope.FavDrug.IsMolecule == 0) {

            if (($scope.frmSSR.txtTemplate.$valid || $scope.frmSSR.ddlIndication.$valid) && $scope.frmSSR.txtItemName.$valid) {
                var response = PrescriptionSrv.GetDrugDetailByItemID(FavDrug.SelectedDrug.ID, UserInfo.UnitID);
                response.then(function (resp) {

                    if (resp.data != null) {

                        resp.data.AddedByName = UserInfo.UserName;
                        resp.data.TemplateID = FavDrug.TemplateID;
                        resp.data.TemplateName = FavDrug.TemplateName;
                        resp.data.IsMolecule = FavDrug.IsMolecule;

                        if (resp.data.FrequencyID == undefined || resp.data.FrequencyID == null)
                            resp.data.FrequencyID = 0;
                        if (resp.data.RouteID == undefined || resp.data.RouteID == null)
                            resp.data.RouteID = 0;
                        if (resp.data.InstructionID == undefined || resp.data.InstructionID == null)
                            resp.data.InstructionID = 0;

                        $scope.FavDrugList.push(resp.data);

                    }
                });
            }
            else {
                $scope.frmSSR.txtTemplate.$dirty = true;
                $scope.frmSSR.ddlIndication.$dirty = true;
                $scope.frmSSR.txtItemName.$dirty = true;
            }
            $scope.FavDrug.SelectedDrug = null;
            $scope.FavDrug.SelectedMolecule = null;
        }
        else {

            if (($scope.frmSSR.txtTemplate.$valid || $scope.frmSSR.ddlIndication.$valid) && $scope.frmSSR.txtItemName1.$valid) {

                $scope.Molecule = FavDrug.SelectedMolecule;
                $scope.Item = {
                    'Code': '', 'BrandName': '', 'ItemName': '', 'DrugID': 0, 'ID': 0, 'UOMID': 0, 'RouteID': 0, 'FrequencyID': 0, 'InstructionID': 0, 'DrugSourceId': 0,
                    'MRP': 0, 'RouteName': '', 'AvailableStock': 0.0, 'UOM': '', 'Strength': '', 'IsABC': 0, 'StrengthUnitTypeID': 0, 'IsFNS': 0, 'IsVED': 0, 'IssueStatus': 0,
                    'Days': 0, 'Quantity': 0, 'Warning': '', 'ResultStatus': 0, 'Dose': '', 'Frequency': '', 'IsOther': 0, 'Reason': '',
                    'TemplateID': FavDrug.TemplateID, 'TemplateName': FavDrug.TemplateName, 'MoleculeID': $scope.Molecule.ID, 'MoleculeName': $scope.Molecule.Description, 'AddedByName': UserInfo.UserName, 'IsMolecule': true
                }
                $scope.FavDrugList.push($scope.Item);
            }
            else {
                $scope.frmSSR.txtTemplate.$dirty = true;
                $scope.frmSSR.ddlIndication.$dirty = true;
                $scope.frmSSR.txtItemName1.$dirty = true;
            }
            $scope.FavDrug.SelectedMolecule = null;
            $scope.FavDrug.SelectedDrug = null;
        }
        //}
    }
    //set favourite drug molecule under templates only
    $scope.SaveFavDrug = function () {
        debugger;
        if ($scope.TodaysDrugs == undefined) {
            $scope.TodaysDrugs = {};
            $scope.TodaysDrugs.FavDrugList = [];
            $scope.TodaysDrugs.FavDrugList = $scope.FavDrugList;
        }
             //commented  and modified
        //else {
        //    $scope.TodaysDrugs.FavDrugList = [];
        //    $scope.TodaysDrugs.FavDrugList = $scope.FavDrugList;
        //}
        else {
            $scope.TodaysDrugs.FavDrugList = [];
            $scope.TodaysDrugs.FavDrugList = $scope.FavDrugList;
            for (var i = 0; i < $scope.FavDrugList.length; i++) {
                //if ($scope.FavDrug.IsBrand == 1) {
                if ($scope.FavDrugList.length != 1) {
                    if ($scope.FavDrug.IsBrand == 1 && $scope.FavDrugList[i].BrandName == $scope.FavDrugList[i + 1].BrandName) {  //&& $scope.FavDrugList[i].FrequencyID==$scope.FavDrugList[i+1].FrequencyID
                        //AlertMessage.success("PalashIVF", "Please Check Duplicate Values");//Commented by swatih for localization 15/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgPleaseCheckDuplicateValues);//Modified by swatih for localization 15/7/2020
                    }
                    else if ($scope.FavDrug.IsBrand == 1) {
                        break;
                    }
                }
                //}
                //else {
                //    continue;
                //}
                //if ($scope.FavDrug.IsMolecule == 1) {
                if ($scope.FavDrugList.length != 1) {
                    if ($scope.FavDrug.IsMolecule == 1 && $scope.FavDrugList[i].MoleculeName == $scope.FavDrugList[i + 1].MoleculeName) {  //&& $scope.FavDrugList[i].FrequencyID==$scope.FavDrugList[i+1].FrequencyID
                        //AlertMessage.success("PalashIVF", "Please Check Duplicate Values");//Commented by swatih for localization 15/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgPleaseCheckDuplicateValues);//Modified by swatih for localization 15/7/2020
                    }
                    else if ($scope.FavDrug.IsMolecule == 1) {
                        break;
                    }
                }
                //}
                //else {
                //    continue;
                //}
            }
        }
    //End Commmented and modified



        $scope.TodaysDrugs.TemplateName = $scope.FavDrug.TemplateName;
        if ($scope.TodaysDrugs.TemplateName == undefined)
            $scope.TodaysDrugs.TemplateName = "";
        $scope.TodaysDrugs.TemplateID = $scope.FavDrug.TemplateID;
        if (($scope.TodaysDrugs.TemplateName != "" || $scope.TodaysDrugs.TemplateID != 0)) {
            var ResponseData = PrescriptionSrv.SaveFavDrug($scope.TodaysDrugs);
            ResponseData.then(function (Response) {

                if (Response.data != null) {
                    if (Response.data == 1) {
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                        $scope.GetTemplateAndItems();
                        $scope.GetTemplateList();
                        $scope.FavDrugList = [];
                        $scope.FavDrug.TemplateName = "";
                    }
                    else if (Response.data == 3) {
                        //AlertMessage.success("PalashIVF", "Template Name Alredy Exist");//Commented by swatih for localization 15/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgTemplateNameAlredyExist);//Modified by swatih for localization 15/7/2020
                    }
                    else {
                        //AlertMessage.success("PalashIVF", "Error Occured While Processing");//Commented by swatih for localization 15/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccuredWhileProcessing);//Modified by swatih for localization 15/7/2020
                        // $scope.PageSetup();
                    }
                }
            }, function (error) {
                $scope.Error = error;
            });
        }
        else {
            if ($scope.TodaysDrugs.FavDrugList.length > 0) {
                $scope.frmSSR.ddlIndication.$dirty = true;
                $scope.frmSSR.txtTemplate.$dirty = true;
                //AlertMessage.success("PalashIVF", "Please Enter/Select Template to Set Favourite Drug");//Commented by swatih for localization 15/7/2020
                AlertMessage.success(objResource.msgTitle, objResource.msgPleaseEnter_SelectTemplatetoSetFavouriteDrug);//Modified by swatih for localization 15/7/2020
            }
        }
    }


    //Begin::Added by Nayan Kamble  on 13/06/2019
    $scope.ClearSavePrescription = function ClearSavePrescription() {
        $scope.disableClick = false;
    }
    //save today prescription
    $scope.Save = function () {
        debugger;
        $scope.disableClick = true; //Added by Nayan Kamble  on 13/06/2019
        $scope.IsDelete = false;
        $scope.SavePrescription();
    }
    $scope.SavePrescription = function SavePrescription() {
        debugger;
   

        //for (var i = 0; i < $scope.TodaysDrugs.DrugList.length; i++) {
        //    if ($scope.IsDelete == false) {
        //        if ($scope.TodaysDrugs.DrugList[i].ItemName == $scope.TodaysDrugs.DrugList[i + 1].ItemName
        //            || $scope.TodaysDrugs.DrugList[i].BrandName == $scope.TodaysDrugs.DrugList[i + 1].BrandName
                   
        //    )

        //        {
        //            AlertMessage.info("Check Duplicate Record");
        //            $scope.IsDuplicate = true;
        //            break;
        //        }
        //        else {
        //            $scope.IsDuplicate = false;
        //        }
        //    }
        //    $scope.IsDuplicate = false;
        //}


        if ($scope.TodaysDrugs.DrugList.length > 0) {
            $scope.ItemNameList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.IsOther == 1 && d.ItemName == "" });
            if ($scope.ItemNameList.length > 0) {
                angular.forEach($scope.ItemNameList, function (item) {
                    item.DirtyItemName = true;
                })
            }

            $scope.FrequencyListList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.FrequencyID === 0 });
            if ($scope.FrequencyListList.length > 0) {
                angular.forEach($scope.FrequencyListList, function (item) {
                    item.DirtyFrequencyID = true;
                    // AlertMessage.warning("PalashIVF", "Please fill mandatory fields");      //Added by Nayan Kamble on 21/06/2019 //Commented by swatih for localization 15/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseFillMandatoryFields);//Modified by swatih for localization 15/7/2020
                })
            }
            $scope.RoutevalidList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.RouteID === 0 });
            if ($scope.RoutevalidList.length > 0) {
                angular.forEach($scope.RoutevalidList, function (item) {
                    item.DirtyRouteID = true;
                })
            }

            //$scope.StrengthList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.IsOther == 1 && d.Strength == "" });
            //if ($scope.StrengthList.length > 0) {
            //    angular.forEach($scope.StrengthList, function (item) {
            //        item.DirtyStrength = true;
            //    })
            //}

            // Added by Nayan Kamble on 21/06/2019  START
            $scope.DaysList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.Days == undefined || d.Days == 0 });          // d.Days == undefined ||    added by Nayan Kamble on 17/12/2019
            if ($scope.DaysList.length > 0) {  
              angular.forEach($scope.DaysList, function (item) {
                    item.DirtyDays = true;
                    //AlertMessage.warning("PalashIVF", "Please fill mandatory fields");//Commented by swatih for localization 15/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgPleasefillmandatoryfields);//Modified by swatih for localization 15/7/2020
                })
            }
            // Added by Nayan Kamble on 21/06/2019  END

            $scope.QuantityList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.Quantity == 0 });
            if ($scope.QuantityList.length > 0) {
                angular.forEach($scope.QuantityList, function (item) {
                    item.DirtyQuantity = true;
                })
            }
            $scope.DuplicateList = $filter('filter')($scope.TodaysDrugs.DrugList, function (d) { return d.IsDuplicate == true });
            if ($scope.DuplicateList.length > 0) {
                angular.forEach($scope.DuplicateList, function (item) {
                    item.DirtyQuantity = true;
                })
            }
            
            if ($scope.DuplicateList.length != 0) {
                //AlertMessage.success("PalashIVF", "Please Check Duplicate Values");//Commented by swatih for localization 15/7/2020
                AlertMessage.success(objResource.msgTitle, objResource.msgPleaseCheckDuplicateValues);//Modified by swatih for localization 15/7/2020
                $scope.disableClick = false;
            }

            else if ($scope.FrequencyListList.length == 0 && $scope.RoutevalidList.length == 0 && $scope.QuantityList.length == 0 && $scope.ItemNameList.length == 0 && $scope.DaysList.length == 0) // && $scope.StrengthList.length == 0                        // && $scope.DaysList.length == 0  added by Nayan Kamble on 21/06/2019
            {
               
                    var ResponseData = PrescriptionSrv.SavePrescription($scope.TodaysDrugs);
                    ResponseData.then(function (Response) {


                        if (Response.data != null) {
                            if (Response.data > 0) {
                                $scope.FavDrugList = [];
                                if ($scope.IsDelete == true) {
                                    //AlertMessage.success("PalashIVF", "Record Deleted Sucessfully!");//Commented by swatih for localization 15/7/2020
                                    AlertMessage.success(objResource.msgTitle, objResource.msgDelete);//Modified by swatih for localization 15/7/2020
                                }
                                else {

                                    //$scope.TodaysDrugs.PrescriptionFollowUpDate = $filter('date')($scope.TodaysDrugs.PrescriptionFollowUpDate, 'medium');
                                    //AlertMessage.success("PalashIVF", "Record Save Sucessfully!");//Commented by swatih for localization 15/7/2020
                                    AlertMessage.success(objResource.msgTitle, objResource.msgRecordSave);//Modified by swatih for localization 15/7/2020
                                    $scope.ClearSavePrescription();    //Added by Nayan Kamble on 13/06/2019
                                }
                                $scope.PageSetup(2);
                            }
                            else {
                                //AlertMessage.success("PalashIVF", "Please select follow up date");  // added by sujata
                                $scope.ClearSavePrescription();    //Added by Nayan Kamble on 21/06/2019
                            }

                        }
                    }, function (error) {
                        $scope.Error = error;
                    });
                }
            }
            
            else {
            //AlertMessage.warning("PalashIVF", "Drug List is Empty");
            AlertMessage.warning(objResource.msgTitle, objResource.msgUpdate);
                $scope.ClearSavePrescription();  // Added by Nayan Kamble on 13/06/2019 
            }
        }
    
     //delete fav grug
        // $scope.FavDrugToDelete = {};
        $scope.DeleteFavDrug = function DeleteFavDrug(Item) {
            //$scope.FavDrugToDelete = Item;
            var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                    templateUrl: 'DeleteFavmodel',
                    controller: 'DeleteFavModelInfo',
                backdrop: false,
                keyboard: false,
                size: 'md',
                //resolve: {
                //    DeleteInfo: function () {
                //        return Item;
                //    }
            //}
        });
        modalInstance.result.then(function (data) { // return here after cancel reason entered
            if (!angular.equals({
        }, data)) {  //this scope is executed when save is click
                Item.Comment = data.Comment;
                var ResponseData = PrescriptionSrv.DeleteFavDrug(Item);
                ResponseData.then(function (Response) {
                    if (Response.data != null) {
                        if (Response.data == 1) {
                            AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                            $scope.PageSetup(2);
                        }
                        else {
                            $scope.Error = error;
                    }
                }
                }, function (error) {
                    $scope.Error = error;
        });
        }
    });
    }
$scope.SetFavorite = function SetFavorite(Item) {

    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: 'SetFavmodel',
            controller: 'SetFavModelInfo',
        backdrop: false,
        keyboard: false,
        size: 'md',
        //resolve: {
        //    SetFavInfo: function () {
        //        return Item;
        //    }
    //}
        });
        modalInstance.result.then(function (data) { // return here after cancel reason entered
            if (!angular.equals({
        }, data)) {  //this scope is executed when save is click

                Item.TemplateID = data.TemplateID;
                Item.TemplateName = data.TemplateName;
                $scope.TempList =[];
                $scope.TempList[0]= Item;
                if ($scope.TodaysDrugs == undefined) {
                    $scope.TodaysDrugs = {
                };
                    $scope.TodaysDrugs.TemplateID = data.TemplateID;
                    $scope.TodaysDrugs.TemplateName = data.TemplateName;
                    $scope.TodaysDrugs.FavDrugList =[];
                    $scope.TodaysDrugs.FavDrugList = $scope.TempList;
                }
                else {
                    $scope.TodaysDrugs.FavDrugList =[];
                    $scope.TodaysDrugs.TemplateID = data.TemplateID;
                    $scope.TodaysDrugs.TemplateName = data.TemplateName;
                    $scope.TodaysDrugs.FavDrugList = $scope.TempList;
        }
                var ResponseData = PrescriptionSrv.SaveFavDrug($scope.TodaysDrugs);
                ResponseData.then(function (Response) {

                    if (Response.data != null) {
                        if (Response.data == 1) {
                            AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                            $scope.GetTemplateAndItems();
                            $scope.GetTemplateList();
                        }
                        else if (Response.data == 2) {
                           // AlertMessage.success("PalashIVF", "Already Added To Favourite List");//Commented by swatih for localization 15/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgAlreadyAddedToFavouriteList);//Modified by swatih for localization 15/7/2020
                        }
                        else {
                            //AlertMessage.success("PalashIVF", "Error Occured While Processing");//Commented by swatih for localization 15/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgErrorOccuredWhileProcessing);//Modified by swatih for localization 15/7/2020
                    }
                }
                }, function (error) {
                    $scope.Error = error;
        });
}
    });
    }
$scope.FavDelete = function () {

    var ResponseData = PrescriptionSrv.DeleteFavDrug($scope.FavDrugToDelete);
    ResponseData.then(function (Response) {

        if (Response.data != null) {
                AlertMessage.success(objResource.msgTitle, objResource.msgSave);
            $scope.PageSetup(2);
            }
            }, function (error) {
        $scope.Error = error;
    });
    }
$scope.RefreshTTab = function RefreshTTab()  //todays tab
    {
        var obj2 = $linq.Enumerable().From($scope.FavDrugList)
            .Where("$.ID == 0")
            .Select("$")
        .ToArray()
    if (!angular.equals({ }, obj2) && obj2.length > 0) {
       // swalMessages.MessageBox('PalashIVF', "You Have Unsaved Changes On This Page, Do You Want To Discard The Changes ?", "warning", function (isConfirmed) {//Commented by swatih for localization 16/7/2020
        swalMessages.MessageBox(objResource.msgTitle, objResource.msgyouhaveunsavedchangesyouwantToDiscardTheChanges, "warning", function (isConfirmed) { //Modified by swatih for localization 16/7/2020
                if (isConfirmed) {

                    $scope.TAnimation = "preBox1 transform1 transform-active";
                    // $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
                    $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
                    $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
                    $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
                    $scope.FavDrugList =[];
                    $scope.FavDrug = {
                };
                    $scope.FavDrug.TemplateID = 0;
                    $scope.FavDrug.IsNewTemp = 1;
                    $scope.FavDrug.IsExiTemp = 0;
                    $scope.FavDrug.IsBrand = 1;
                    $scope.FavDrug.IsMolecule = 0
                }
                else {
                    //AlertMessage.success("Please Save Drgs Added To Set Fav List First");
        }
        });
        }
        else {
            $scope.TAnimation = "preBox1 transform1 transform-active";
            //$scope.TAnimation = "preBox1 transform1 boxIcoMenu";
            $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
            $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
            $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
        }
        if ($scope.PriCheckedList.length > 0) {
            $scope.PriCheckedList =[];
            $scope.GetPreviousPrescriptionDetails();
        }
        if ($scope.FavCheckedList.length > 0) {
            $scope.FavCheckedList =[];
            $scope.GetTemplateAndItems();
            $scope.GetTemplateList();
}
    //clear Controls       
    $scope.SelectedDrug = "";
    $scope.SelectedMolecule = "";
    $scope.IsBrand = 1; //for brand 
    $scope.IsMolecule = 0;
    $scope.frmTdrugs.SelectedMolecule.$dirty = false;
    $scope.frmTdrugs.SelectedDrug.$dirty = false;
    }
$scope.RefreshPTab = function RefreshPTab() { //previous tab      
    debugger;
    var obj1 = $linq.Enumerable().From($scope.TodaysDrugs.DrugList)
        .Where("$.ID == 0")
        .Select("$")
        .ToArray()
    var obj2 = $linq.Enumerable().From($scope.FavDrugList)
        .Where("$.ID == 0")
        .Select("$")
        .ToArray()
    if (!angular.equals({ }, obj1) && obj1.length > 0) {
        //swalMessages.MessageBox('PalashIVF', "You Have Unsaved Changes On This Page, Do You Want To Discard The Changes ?", "warning", function (isConfirmed) { //Commented by swatih for localization 16/7/2020
        swalMessages.MessageBox(objResource.msgTitle, objResource.msgyouhaveunsavedchangesyouwantToDiscardTheChanges, "warning", function (isConfirmed) { //Modified by swatih for localization 16/7/2020
            if (isConfirmed) {

                    $scope.PAnimation = "preBox2 transform2 transform-active";
                    $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
                    // $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
                    $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
                    $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
                    var obj1 = $linq.Enumerable().From($scope.TodaysDrugs.DrugList)
                       .Where("$.ID != 0")
                       .Select("$")
                       .ToArray()
                    $scope.TodaysDrugs.DrugList = obj1;
                }
                else {
                    // AlertMessage.success("Please Save Todays Prescription First");
        }
        });
        }
        else if (!angular.equals({ }, obj2) && obj2.length > 0) {
            //swalMessages.MessageBox('PalashIVF', "Do You Want To Discard the drugs added in Set Fav List", "warning", function (isConfirmed) {//Commented by swatih for localization 16/7/2020
            swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouWantToDisardthedrugsaddedinSetFavList, "warning", function (isConfirmed) {//Modified by swatih for localization 16/7/2020
                if (isConfirmed) {

                    $scope.TAnimation = "preBox1 transform1 transform-active";
                    // $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
                    $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
                    $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
                    $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
                    //var obj2 = $linq.Enumerable().From($scope.TodaysDrugs.DrugList)
                    //   .Where("$.ID != 0")
                    //   .Select("$")
                    //   .ToArray()

                    //clear Controls
                    $scope.FavDrugList =[];
                    $scope.FavDrug = {
                };
                    $scope.FavDrug.TemplateID = 0;
                    $scope.FavDrug.IsNewTemp = 1;
                    $scope.FavDrug.IsExiTemp = 0;
                    $scope.FavDrug.IsBrand = 1;
                    $scope.FavDrug.IsMolecule = 0
                }
                else {
                    //AlertMessage.success("Please Save Drgs Added To Set Fav List First");
            }
        });
        }
        else {
            $scope.PAnimation = "preBox2 transform2 transform-active";
            $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
            // $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
            $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
            $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
        }
        if ($scope.FavCheckedList.length > 0) {
            $scope.FavCheckedList =[];
            $scope.GetTemplateAndItems();
            $scope.GetTemplateList();
}
    //clear Controls
    $scope.search = "";
    $scope.GetPreviousPrescriptionDetails();
    }
$scope.RefreshSTab = function RefreshSTab() {  //set fav tab

    //chjeck if added in todays list but not saved
    var obj1 = $linq.Enumerable().From($scope.TodaysDrugs.DrugList)
         .Where("$.ID == 0")
         .Select("$")
         .ToArray()
    if (!angular.equals({ }, obj1) && obj1.length > 0) {
        //swalMessages.MessageBox('PalashIVF', "You Have Unsaved Changes On This Page, Do You Want To Discard The Changes ?", "warning", function (isConfirmed) {//Commented by swatih for localization 16/7/2020
        swalMessages.MessageBox(objResource.msgTitle, objResource.msgyouhaveunsavedchangesyouwantToDiscardTheChanges, "warning", function (isConfirmed) { //Modified by swatih for localization 16/7/2020
        if (isConfirmed) {

                    $scope.SAnimation = "preBox3 transform3 transform-active";
                    $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
                    $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
                    //  $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
                    $scope.FAnimation = "preBox4 transform4 boxIcoMenu";

                    var obj1 = $linq.Enumerable().From($scope.TodaysDrugs.DrugList)
                       .Where("$.ID != 0")
                       .Select("$")
                       .ToArray()

                    $scope.TodaysDrugs.DrugList = obj1;

                }
                else {
                    //   AlertMessage.success("Please Save Todays Prescription First");
        }
         });
         }
         else {
             $scope.SAnimation = "preBox3 transform3 transform-active";
             $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
             $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
             //  $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
             $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
        }
        if ($scope.PriCheckedList.length > 0) {
            $scope.PriCheckedList =[];
            $scope.GetPreviousPrescriptionDetails();
        }
        if ($scope.FavCheckedList.length > 0) {
            $scope.FavCheckedList =[];
            $scope.GetTemplateAndItems();
            $scope.GetTemplateList();
}
    //clear      
    $scope.FavDrugList =[];
    $scope.FavDrug = { };
    $scope.FavDrug.TemplateID = 0;
    $scope.FavDrug.IsNewTemp = 1;
    $scope.FavDrug.IsBrand = 1;
    $scope.FavDrug.IsMolecule = 0
    $scope.FavDrug.IsExiTemp = 0;
    }
$scope.RefreshFTab = function RefreshFTab() { //fav tab

    //chjeck if added in todays list but not saved
    var obj1 = $linq.Enumerable().From($scope.TodaysDrugs.DrugList)
         .Where("$.ID == 0")
         .Select("$")
         .ToArray()
    var obj2 = $linq.Enumerable().From($scope.FavDrugList)
       .Where("$.ID == 0")
       .Select("$")
       .ToArray()
    if (!angular.equals({ }, obj1) && obj1.length > 0) {
        //swalMessages.MessageBox('PalashIVF', "You Have Unsaved Changes On This Page, Do You Want To Discard The Changes ?", "warning", function (isConfirmed) { //Commented by swatih for localization 16/7/2020
        swalMessages.MessageBox(objResource.msgTitle, objResource.msgyouhaveunsavedchangesyouwantToDiscardTheChanges, "warning", function (isConfirmed) { //Modified by swatih for localization 16/7/2020
                if (isConfirmed) { 

                    $scope.FAnimation = "preBox4 transform4 transform-active";
                    $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
                    $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
                    $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
                    // $scope.FAnimation = "preBox4 transform4 boxIcoMenu";

                    var obj1 = $linq.Enumerable().From($scope.TodaysDrugs.DrugList)
                       .Where("$.ID != 0")
                       .Select("$")
                       .ToArray()
                    $scope.TodaysDrugs.DrugList = obj1;

                }
                else {
                    // AlertMessage.success("Please Save Todays Prescription First");
        }
       });
       }
       else if (!angular.equals({ }, obj2) && obj2.length > 0) {
           //swalMessages.MessageBox('PalashIVF', "Do You Want To Discard the drugs added in Set Fav List", "warning", function (isConfirmed) { //Commented by swatih for localization 16/7/2020
           swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouWantToDisardthedrugsaddedinSetFavList, "warning", function (isConfirmed) { //Modified by swatih for localization 16/72020
                if (isConfirmed) {

                    $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
                    // $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
                    $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
                    $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
                    $scope.FAnimation = "preBox4 transform4 transform-active";

                    //clear Controls
                    $scope.FavDrugList =[];
                    $scope.FavDrug = {
                };
                    $scope.FavDrug.TemplateID = 0;
                    $scope.FavDrug.IsNewTemp = 1;
                    $scope.FavDrug.IsExiTemp = 0;
                    $scope.FavDrug.IsBrand = 1;
                    $scope.FavDrug.IsMolecule = 0
                }
                else {
                    // AlertMessage.success("Please Save Drgs Added To Set Fav List First");
           }
       });
       }
       else {
           $scope.FAnimation = "preBox4 transform4 transform-active";
           $scope.TAnimation = "preBox1 transform1 boxIcoMenu";
           $scope.PAnimation = "preBox2 transform2 boxIcoMenu";
           $scope.SAnimation = "preBox3 transform3 boxIcoMenu";
    // $scope.FAnimation = "preBox4 transform4 boxIcoMenu";
        }
        if ($scope.PriCheckedList.length > 0) {
            $scope.PriCheckedList =[];
            $scope.GetPreviousPrescriptionDetails();
}
    //clear      
    $scope.SearchTemplate = "";
    }
$scope.boxClose = function boxClose() {
    debugger;
    $location.path("/Prescription/");
    }
$scope.ReportContent = null;
        //Crystal Report Demo
        $scope.showreport = function () {
            debugger;

            $scope.Report = { };
            $scope.Report.UnitID = localStorageService.get("UserInfo").UnitID;
            if (selectPatient.GenderID == 1) {

                $scope.Report.VisitID = SelectedCouple.MalePatient.Selectedvisit.VisitID;
                $scope.Report.VisitUnitID = SelectedCouple.MalePatient.Selectedvisit.VisitUnitID;
                $scope.Report.PatientID = SelectedCouple.MalePatient.MaleId;
                $scope.Report.PatientUnitID = SelectedCouple.MalePatient.MAleUnitID;

            }
            else if (selectPatient.GenderID == 2) {
                $scope.Report.VisitID = SelectedCouple.FemalePatient.Selectedvisit.VisitID;
                $scope.Report.VisitUnitID = SelectedCouple.FemalePatient.Selectedvisit.VisitUnitID;
                $scope.Report.PatientID = SelectedCouple.FemalePatient.FemalePatientID;
                $scope.Report.PatientUnitID = SelectedCouple.FemalePatient.FemalePatientUnitID;
        }


        if ($scope.TodaysDrugs.DrugList.length == 0) {
            debugger;

            //AlertMessage.error(objResource.msgTitle, "You can add first prescription ");//Commented by swatih for localization 15/7/2020
            AlertMessage.error(objResource.msgTitle, objResource.msgYoucanaddfirstprescription);//Modified by swatih for localization 15/7/2020
        }
        else {

            //new add

            //Encrypt then send Parameters by rohini
            debugger;
            var a = encodeURIComponent('U=' + $scope.Report.UnitID + '&VU=' +$scope.Report.VisitUnitID + '&V=' +$scope.Report.VisitID + '&P=' +$scope.Report.PatientID + '&PU=' +$scope.Report.PatientUnitID);
            window.open('/Reports/EMR/PriscriptionWF.aspx?' +encodeURIComponent(a), '_blank'); // in new tab  
    }
    }
        //RDLC Report Demo
        $scope.showreport1 = function () {
            var jsonReport =[{
                ID: 1,
                ResourcePath: "PP.rdlc",
                DataSources: [{ ID: 1, Name: "EmplDataSet", Data: "PISPL\\SQL2014;Initial Catalog=NORTHWND"
            }],
                Parameters: [{ ID: 1, Name: "param1", Data: "value1"
            }],
                ReportDataSourceName: "DataSet1"
        }];

        var responseData = PrescriptionSrv.GetReport(jsonReport);
        responseData.then(function (Response) {
            $scope.ReportContent = Response.data;
            Common.setObj($scope.ReportContent);
            $location.path('ViewReport/');

            }, function (error) {

    });

    }
$scope.btnClick = function () {

    //   if (selectPatient.PatientCategoryID == 7) {
    if (selectPatient.GenderID == 1) {
        $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
        $rootScope.IsMaleActive = false;
        selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
        selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
        selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
        selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
        selectPatient.Gender = 'Female';
        selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
        if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit != null) {
                selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
        }
        else {
                selectPatient.VisitID = null;
                selectPatient.VisitUnitID = null;
            }
            Common.setSelectedPatient(selectPatient);
            Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                /*Common.GetGlobalData().then(function (resp) {
                    $rootScope.Allergies = resp.data;
                });*/
                if ($rootScope.CoupleDetails.FemalePatient.Allergies != "" && $rootScope.CoupleDetails.FemalePatient.Allergies != null)
                    $rootScope.Allergies = $rootScope.CoupleDetails.FemalePatient.Allergies;
                else {
                    $rootScope.Allergies = '';
            }
                if ($rootScope.Allergies.includes('null')) {
                    $rootScope.Allergies = '';
            }
                //if ($rootScope.CoupleDetails.FemalePatient.AllergiesFood != "" && $rootScope.CoupleDetails.FemalePatient.AllergiesFood != null) {
                //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.FemalePatient.AllergiesFood;
                //}
                //if ($rootScope.CoupleDetails.FemalePatient.AllergiesOthers != "" && $rootScope.CoupleDetails.FemalePatient.AllergiesOthers != null) {
                //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.FemalePatient.AllergiesOthers;
                //}
                $scope.btnText = 'Male Prescription';
    })
    $rootScope.FormName = 'Female Prescription'
    $scope.Str = 'Prescription/';
    if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
    }
    else {
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                    $location.path($scope.Str);
    })
    }
    }
    else if (selectPatient.GenderID == 2) {
        $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
        $rootScope.IsMaleActive = true;
        selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
        selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
        selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
        selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
        selectPatient.Gender = 'Male';
        selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.MalePatientName;
        if ($rootScope.CoupleDetails.MalePatient.Selectedvisit != null) {
                selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
        }
        else {
                selectPatient.VisitID = null;
                selectPatient.VisitUnitID = null;
    }

            Common.setSelectedPatient(selectPatient);
            Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                /* Common.GetGlobalData().then(function (resp) {
                     $rootScope.Allergies = resp.data;
                 });*/

                if ($rootScope.CoupleDetails.MalePatient.Allergies != "" && $rootScope.CoupleDetails.MalePatient.Allergies != null)
                    $rootScope.Allergies = $rootScope.CoupleDetails.MalePatient.Allergies;
                else {
                    $rootScope.Allergies = '';
            }
                //if ($rootScope.CoupleDetails.MalePatient.AllergiesFood != "" && $rootScope.CoupleDetails.MalePatient.AllergiesFood != null) {
                //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesFood;
                //}
                //if ($rootScope.CoupleDetails.MalePatient.AllergiesOthers != "" && $rootScope.CoupleDetails.MalePatient.AllergiesOthers != null) {
                //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesOthers;
                //}
                if ($rootScope.Allergies.includes('null')) {
                    $rootScope.Allergies = '';
            }
                $scope.btnText = 'Female Prescription';
    })
    $rootScope.FormName = 'Male Prescription';
    $scope.Str = 'Prescription/';
    if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
    }
    else {
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                    $location.path($scope.Str);
    })
}
}
        //   }
    }
        //Nevigate visitPopup
        $scope.NevigateVisitPopUP = function (Patient, Redirectto) {
            if (!angular.equals({
        }, Patient)) {
            var response = Common.GetActiveVisitByPatient(Patient.ID, Patient.UnitID); //Get Visit list For selected patient
            response.then(function (resp) {
                if (resp.data.length > 1) { //Go cursor this scope when multiple visit
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
                        if (!angular.equals({
                        }, data)) {  //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                //for female
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {
                            };
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {

                                        $scope.selectPatient = {
                                    };
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $location.path(Redirectto);
                                }
                            });
                            }
                            else {
                                //for male
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {
                            };
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                response.then(function (resp) {

                                    if (resp.status == 200) {
                                        $scope.selectPatient = {
                                    };
                                        $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                        $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                        $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                        $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                        $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                        $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $rootScope.CoupleDetails = Common.getSelectedCouple();
                                        $location.path(Redirectto);
                                }
                            });
                        }
                    }
                });
                }
                else if (resp.data.length == 1)  //this scope is executed when only one active visit
                {

                    if (!angular.equals({
                    }, resp.data)) {
                        if (Patient.GenderID == 2) {
                            //for female
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                            response.then(function (resp) {

                                if (resp.status == 200) {
                                    $scope.selectPatient = {
                                };
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($rootScope.CoupleDetails);
                                    $rootScope.CoupleDetails = Common.getSelectedCouple();
                                    $location.path(Redirectto);
                            }
                        });
                        }
                        else {
                            //for male
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                            response.then(function (resp) {

                                if (resp.status == 200) {
                                    $scope.selectPatient = {
                                };
                                    $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                                    $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                                    $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                                    $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                                    $scope.selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                                    $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                    Common.setSelectedPatient($scope.selectPatient);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($rootScope.CoupleDetails);
                                    $rootScope.CoupleDetails = Common.getSelectedCouple();
                                    $location.path(Redirectto);
                            }
                        });
                    }
                }
                }
                else {
                    //alert("There is no active visit");
                    $location.path(Redirectto);
            }
        });
    }
    }

$scope.GetUserrights = function () {
    var lstUserRights = Common.getUserRights();
    if (selectPatient.GenderID == 1) {
        for (var z = 0; z <= lstUserRights.length -1; z++) {
                if (lstUserRights[z].MenuId == 312 && lstUserRights[z].Active)//Male Prescription 
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
    }
    }
    }
    else if (selectPatient.GenderID == 2) {
        for (var z = 0; z <= lstUserRights.length -1; z++) {
                if (lstUserRights[z].MenuId == 305 && lstUserRights[z].Active)//Female Prescription 
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
    }
}
        }
        if (!$scope.objRgt.IsCreate) {
            angular.element(btnSaveTodayPre).prop('disabled', true);
            angular.element(btnAddOtherDrug).prop('disabled', true);
            angular.element(btnAddPreDrugs).prop('disabled', true);
            angular.element(btnSaveFavDrug).prop('disabled', true);
            angular.element(btnAddFavToTodayDrug).prop('disabled', true);
        }
            //else if (!$scope.objRgt.IsUpdate) {
            //    angular.element(btnSaveVital).prop('disabled', true);

            //}
        else {
            angular.element(btnSaveTodayPre).prop('disabled', false);
            angular.element(btnAddOtherDrug).prop('disabled', false);
            angular.element(btnAddPreDrugs).prop('disabled', false);
            angular.element(btnSaveFavDrug).prop('disabled', false);
            angular.element(btnAddFavToTodayDrug).prop('disabled', false);
        }
    }
});
PIVF.controller('DeleteFavModelInfo', function ($scope, $uibModalInstance, AlertMessage) { //DeleteInfo,
    //$scope.DeleteInfo = DeleteInfo;
    $scope.boxClose = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.FavDelete = function (Item) {

        //if ($scope.frmFavReason.Comment.$valid)
        if (Item != undefined)
        { $uibModalInstance.close(Item); }
        else
        //{ AlertMessage.success("PalashIVF", "Please Enter Reason"); }//Commented by swatih for localization 15/7/2020
        { AlertMessage.success(objResource.msgTitle, objResource.msgPleaseEnterReason); }//Modified by swatih for localization 15/7/2020
    }
});
PIVF.controller('DeleteTodaysModelInfo', function ($scope, $uibModalInstance, AlertMessage) { //DeleteInfo,
    //$scope.DeleteInfo = DeleteInfo;
    $scope.boxClose = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.Delete = function (Item) {

        if ($scope.frmTodaysReason.Comment.$valid) {
            if (Item != undefined)
            { $uibModalInstance.close(Item); }
        }
        //else { AlertMessage.warning("PalashIVF", "Please Enter Reason"); }//Commented by swatih for localization 15/7/2020
        else { AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseEnterReason); }//Modified by swatih for localization 15/7/2020
    }
});
PIVF.controller('SetFavModelInfo', function ($scope, $uibModalInstance, AlertMessage, Common, PrescriptionSrv) {

    $scope.FavDrug = {};
    $scope.FavDrug.IsNewTemp = 1;
    $scope.FavDrug.IsExiTemp = 0;
    //$scope.SetFavInfo = SetFavInfo;

    $scope.OnChangeTemp = function OnChangeTemp(i) {
        if (i == 1) {
            $scope.FavDrug.IsNewTemp = 1;
            $scope.FavDrug.IsExiTemp = 0;
            $scope.FavDrug.TemplateID = 0;

        }
        else if (i == 2) {
            $scope.FavDrug.IsNewTemp = 0;
            $scope.FavDrug.IsExiTemp = 1;
            $scope.FavDrug.TemplateName = "";
        }
    }
    $scope.PageSetup = function () {
        $scope.GetTemplateList();
    }
    $scope.GetTemplateList = function () {
        //GetTemplateList
        var ResponseData = PrescriptionSrv.GetTemplateList();
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.TemplateList = Response.data;
            $scope.FavDrug.TemplateID = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.SetFavInfo = function (Item) {

        if ($scope.FavDrug.TemplateName == undefined) {
            $scope.FavDrug.TemplateName = "";
        }
        if ($scope.FavDrug.TemplateID == undefined) {
            $scope.FavDrug.TemplateID = 0;
        }
        if (($scope.FavDrug.TemplateID != 0 && $scope.FavDrug.IsExiTemp != 0) || ($scope.FavDrug.TemplateName != null && $scope.FavDrug.IsExiTemp == 0)) {
            $uibModalInstance.close(Item);
        }
        else {
            //AlertMessage.success("PalashIVF", "Please select Template");//Commented by swatih for localization 16/7/2020
            AlertMessage.success(objResource.msgTitle, objResource.msgPleaseselectTemplate);//Modified by swatih for localization 16/7/2020

        }
    }
    $scope.boxClose = function () {
        $uibModalInstance.dismiss('cancel');
    }
});
PIVF.controller('visitmodelInfo', function ($scope, $uibModalInstance, VisitInfo) {
    $scope.visitInformation = VisitInfo;
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.SelectPatient = function (Item) {
        $uibModalInstance.close(Item);
    }
});
