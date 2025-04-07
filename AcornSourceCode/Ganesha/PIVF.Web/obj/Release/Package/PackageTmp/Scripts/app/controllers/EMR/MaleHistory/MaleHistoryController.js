angular.module('PIVF').controller('MaleHistoryController', function ($rootScope,$timeout, $scope,$filter, $location, MaleHistoryService, Common, srvCommon, $uibModal, $window, AlertMessage, localStorageService, PrescriptionSrv) { //, usSpinnerService, crumble

    /*START : Global variables declarations section */
    $rootScope.FormName = 'Male History';
    $rootScope.isAction = true;
    $scope.IsSaveUpdate = true;
    $rootScope.hideWhenQueue = false;
    $scope.MaleHistory = {};
    $rootScope.showPDF1 = 0;
    $scope.MaleHistory.PastMedicationHistoryItem = [];
    $scope.MaleHistory.FamilyHistoryItem = [];
    $scope.MaleHistory.DrugsNameSelected = [];
    $scope.MaleHistory.DiseaseRelationSelected = [];
    $scope.MaleHistory.DiabetesRelationSelected = [];
    $scope.MaleHistory.HypertensionRelationSelected = [];
    $scope.MaleHistory.ThyroidDisorderRelationSelected = [];
    $scope.MaleHistory.MalignancyRelationSelected = [];
    $scope.MaleHistory.OtherRelationSelected = [];
    $scope.MaleHistory.SurgicalHistoryItem = [];
    var selectPatient = {};
    $scope.SaveorUpdate = "Save";
    selectPatient = Common.getSelectedPatient();
    $scope.lstDrugAllergy = [];

    /*END : Global variables declarations section */

    /* START : Attributes for disabling controls */
    $scope.IsSPWPRemarkDisabled = true;
   $scope.MaleHistory.IsCovidVaccinationDone = 'Yes'
    $scope.IsFamilyCardiacDiseaseDisabled = true;
    $scope.IsFamilyDiabetesDisabled = true;
    $scope.IsFamilyHypertensionDisabled = true;
    $scope.IsFamilyThyroidDisorderDisabled = true;
    $scope.IsFamilyMalignancyDisabled = true;
    $scope.IsFamilyOtherDisabled = true;
    $scope.IsCaffeinatedBeveragesDisabled = true;
    $scope.IsExposureToHevyMetalsDisabled = true;
    $scope.IsExposureToRadiationDisabled = true;
    $scope.IsUrinationOnstrainingDisabled = true;
    $scope.IsDifficultyInVoidingDisabled = true;
    $scope.IsBurningsensationDisabled = true;
    $scope.IsUrgencyForUrinationDisabled = true;
    $scope.IsEjaculationORErectionDisabled = true;
    $scope.IsCardiacDiseaseDisabled = true;
    $scope.IsDiabetesDisabled = true;
    $scope.IsHypertensionDisabled = true;
    $scope.IsThyroidDisorderDisabled = true;
    $scope.IsTuberculosisDisabled = true;
    $scope.IsOrchitisDisabled = true;
    $scope.IsMumpsDisabled = true;
    $scope.IsOtherDisabled = true;
    $scope.IsSmokingDisabled = true;
    $scope.IsAlcoholDisabled = true;
    $scope.IsTobaccoDisabled = true;
    $scope.IsDrugAddictionTobaccoDisabled = true;
    $scope.IsCaffeineAddictionDisabled = true;
   
    $scope.IsAddictionsOtherDisabled = true;
    $scope.IsDrugNameValid = false;
    $scope.IsStatusValid = false;
    /* END : Attributes for disabling controls */

    //drug search

    $scope.FavDrug = {};
    $scope.FavDrug.IsBrand = 1; //for brand 
    $scope.FavDrug.IsMolecule = 0;
    $scope.BrandName = 1;
    $scope.MoleculeName = 0;

    //surgical history
    $scope.formats =['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.open6 = function ($event, popup6) {
        debugger;
        $event.preventDefault();
        $event.stopPropagation();
        popup6.opened = true;
        
    };
    $scope.openmonth1 = function () {

      
        $scope.month1.opened = true;
    }
    $scope.month1 = {
        opened: false
    };
    $scope.openmonth2 = function () {

        $scope.month2.opened = true;
    }
    $scope.month2 = {
        opened: false
    };
    $scope.openmonth3 = function () {

        $scope.month3.opened = true;
    }
    $scope.month3 = {
        opened: false
    };
    $scope.openmonth4 = function () {

        $scope.month4.opened = true;
    }
    $scope.month4 = {
        opened: false
    };
    $scope.openmonth5 = function () {

        $scope.month5.opened = true;
    }
    $scope.month5 = {
        opened: false
    };
    $scope.openmonth6 = function () {

        $scope.month6.opened = true;
    }
    $scope.month6 = {
        opened: false
    };
    
    $scope.popup1 = {
            opened: false
    };
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.openmonth13 = function () {
       
        $scope.month13.opened =true;
    }
    $scope.month13 = {
          opened: false
    };
     $scope.openmonth14 = function () {
       
        $scope.month14.opened =true;
    }
    $scope.month14 = {
          opened: false
    };

     $scope.openmonth15 = function () {
       
        $scope.month15.opened =true;
    }
    $scope.month15 = {
          opened: false
    };

     
     $scope.disableOption = function (flag) {
     if (flag == 13) {
           if ($scope.MaleHistory.IsCovidVaccinationDone == 'No' || $scope.MaleHistory.IsCovidVaccinationDone== '')
                $scope.flag13 = true;
            else
                $scope.flag13 =false;
                $scope.MaleHistory.CovidVaccinationDate2 = null;
                $scope.MaleHistory.CovidVaccinationDate1 = null;
                $scope.MaleHistory.CovidVaccinationDate3 = null;
        }
    }

    $scope.setPopupData = function setPopupData(i) {
     //   console.log($scope.MaleHistory.SurgicalHistoryItem[i].SHAttachment);
        $rootScope.fileData1 = '';
        $rootScope.showPDF1 = 0;
        var filename = $scope.MaleHistory.SurgicalHistoryItem[i].SHAttachment[0].name;
        var index = filename.lastIndexOf('.');
        var extn = [filename.slice(0, index), filename.slice(index + 1)];
        var ii = extn.length;
        extn = extn[ii - 1];
        if (extn == 'pdf') {
            $rootScope.showPDF1 = 1;
        }
        $rootScope.fileData1 = $scope.MaleHistory.SurgicalHistoryItem[i].SHAttachment[0].preview;
        
    }
    $scope.getHistoryList = function () {
        var promise = MaleHistoryService.getHistoryList();
        promise.then(function (resp) {
            console.log("193", resp)
            $scope.lstHistory = resp.data;
        }, function (error) {
        debugger
        })
    }
    $scope.viewHistory = function (HID, UnitID) {

        debugger;
        //if (!angular.isUndefined($scope.FemaleHistory.DrugsNameSelected) && $scope.FemaleHistory.DrugsNameSelected != null) {
        //    angular.forEach($scope.FemaleHistory.DrugsNameSelected, (function (x) {
        //        for (var j = 0; j <= $scope.DrugsNameList.length - 1; j++) {
        //            if ($scope.DrugsNameList[j].ID == x.ID) {
        //                $scope.DrugsNameList[j].ticked = false;
        //            }
        //        }
        //    }))
        //    //debugger;
        //    if (!angular.isUndefined($scope.FemaleHistory.DrugsNameSelected)) {
        //        $scope.FemaleHistory.DrugsNameSelected.length = 0;
        //    }
        //}
        $scope.SetAllControls(HID, UnitID, 0);
        angular.element(previousHistory).modal('hide');
    }

    $scope.OnChangeFav = function OnChangeFav(i) {
        if (i == 1) {
            $scope.FavDrug.IsBrand = 1;
            $scope.FavDrug.IsMolecule = 0;
            $scope.BrandName = 1;
            $scope.MoleculeName = 0;
        }
        else if (i == 2) {
            $scope.FavDrug.IsMolecule = 1;
            $scope.FavDrug.IsBrand = 0;
            $scope.BrandName = 0;
            $scope.MoleculeName = 1;
        }
    }
     $scope.allergyColumn = function (i, index) {
        if (i == 1) {
            $scope.lstDrugAllergy[index].IsDrugAllergy = false;
            $scope.lstDrugAllergy[index].IsOtherAlleygy = true;
            $scope.lstDrugAllergy[index].DrugName = 0;
        }
        else if (i == 0) {
            $scope.lstDrugAllergy[index].IsDrugAllergy = true;
            $scope.lstDrugAllergy[index].IsOtherAlleygy = true;
        }
        else {
            $scope.lstDrugAllergy[index].IsDrugAllergy = true;
            $scope.lstDrugAllergy[index].IsOtherAlleygy = false;
            $scope.lstDrugAllergy[index].DrugName = '';
        }
    }
    $scope.getMatchingBrand = function ($viewValue) {
        //debugger
        var matchingStuffs = [];

        for (var i = 0; i < $scope.DrugList.length; i++) {
            if (
              $scope.DrugList[i].Code.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {

                matchingStuffs.push($scope.DrugList[i]);
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
    $scope.onSelect1 = function ($item, $model, $label) {
        //debugger
        $scope.SelectedDrug = $model;   //selected drugs details  
        $scope.MaleHistory.PastMedicationHistoryItem.push({
            "DrugID": $scope.SelectedDrug.ID,
            "DrugeName": $scope.SelectedDrug.Description,
            "Dose": "",
            "TimePeriod": "",
            "CalenderID": 0,
            "Remark": "",
            "MedicationStatusID": 0,

        });
        //  $scope.IdDisableMyFlag = true;
        //  $scope.AddFavDrug($scope.FavDrug);
        $scope.FavDrug.SelectedDrug = undefined;
    };

    var UserInfo = localStorageService.get("UserInfo");
    /* START for Resource */
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    /*END of Resource*/

    //Start Report 
    $scope.PrintMaleHistory = function (Item) {
        debugger
        //$scope.visitID = $scope.selectPatient.VisitID;
        //$scope.VisitUnitID = $scope.selectPatient.VisitUnitID;
        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&VU=' + $scope.selectPatient.VisitUnitID + '&V=' + 0 + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId);
       // var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&VU=' + $rootScope.CoupleDetails.MalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.MalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId);
        window.open('/Reports/History/Male History/MaleHistoryWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    //END Report


    /*START : Page setup*/
    $scope.PageInitilization = function PageInitilization() {
        //usSpinnerService.spin('GridSpinner');
        
        
        //debugger
        $rootScope.FormName = 'History';
        if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;
      
      $scope.viewHistory();   //Added by Nayan Kamble on 24/12/2019

       // $scope.SetAllControls();
        $scope.FetchYearsList();
        $scope.FetchMonthsList();
        var response = Common.BindMaleFemaleCoupleDetails(selectPatient.UnitID, selectPatient.ID, selectPatient.GenderID);
        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                console.log(resp.data);
                if (selectPatient.GenderID == 2) {
                    if (resp.data.FemalePatient){
                        if (resp.data.FemalePatient.Allergies != "" && resp.data.FemalePatient.Allergies != null) {
                            $rootScope.Allergies = resp.data.FemalePatient.Allergies;

                        }
                        else {
                            $rootScope.Allergies = '';
                        }
                    //if (resp.data.FemalePatient.AllergiesFood != "" && resp.data.FemalePatient.AllergiesFood != null) {
                    //    $rootScope.Allergies += ', ' + resp.data.FemalePatient.AllergiesFood;
                    //}
                    //if (resp.data.FemalePatient.AllergiesOthers != "" && resp.data.FemalePatient.AllergiesOthers != null) {
                    //    $rootScope.Allergies += ', ' + resp.data.FemalePatient.AllergiesOthers;
                    //}
                }
                }
                if (selectPatient.GenderID == 1) {
                    if (resp.data.MalePatient) {
                        if (resp.data.MalePatient.Allergies != "" && resp.data.MalePatient.Allergies != null) {
                            $rootScope.Allergies = resp.data.MalePatient.Allergies;
                            //$rootScope.Allergies = $rootScope.Allergies.trim();
                            //if ($rootScope.Allergies[0] == ',') {
                            //        $rootScope.Allergies = $rootScope.Allergies.substr(1);
                            //    }
                            // if ($rootScope.Allergies[$rootScope.Allergies.length - 1] == ',') {

                            //    $rootScope.Allergies = $rootScope.Allergies.substring(0, $rootScope.Allergies.length - 1);
                            //    }
                        }
                        else {
                            $rootScope.Allergies = '';
                        }
                        //if (resp.data.MalePatient.AllergiesFood != "" && resp.data.MalePatient.AllergiesFood != null) {
                        //    $rootScope.Allergies += ', ' + resp.data.MalePatient.AllergiesFood;
                        //}
                        //if (resp.data.MalePatient.AllergiesOthers != "" && resp.data.MalePatient.AllergiesOthers != null) {
                        //    $rootScope.Allergies += ', ' + resp.data.MalePatient.AllergiesOthers;
                        //}

                    }
                }
            }
          


        });
        //console.log("Root ", $rootScope.CoupleDetails);

        $scope.FetchSuccessfullPreganancyWithPastPartner();
        $scope.FetchSexualDysFunctionList();
        $scope.FetchEjaculationORErectionList();
        $scope.FetchMarriedLife();
        $scope.FetchBloodGroupList();
        $scope.FetchCalenderList();
        $scope.FetchMedicationStatusList();
       $timeout(function () {
           //$scope.SetAllControls();
             $scope.SetAllControls(angular.isDefined(selectPatient.VisitID) ? selectPatient.VisitID : 0, angular.isDefined(selectPatient.VisitUnitID) ? selectPatient.VisitUnitID : 0,1);
        },2500)   //   1000)   commented by Nayan Kamble on 18/12/2019
        $scope.FetchDrugsList();
        $scope.FetchRelationList();
        $scope.FetchDiabetesRelationList();
        $scope.FetchHypertensionRelationList();
        $scope.FetchThyroidDisorderRelationList();
        $scope.FetchMalignancyRelationList();
        $scope.FetchOtherRelationList();
        $scope.FetchMoodList();
        $scope.FetchSleepList();
        $scope.FetchHeadacheORNauseaList();
        $scope.FetchPersonalityList();
        $scope.FetchOnMedication();
        $scope.FetchStressList();
        $scope.FetchExerciseList();
        $scope.FetchDietList();
        $scope.FetchCaffeinatedBeveragesList();
        $scope.GetUserrights();
        //medical history master
        $scope.FetchCardiacDiseaseList();
        $scope.FetchDiabetesList();
        $scope.FetchOrchitisList();
        $scope.FetchThyroidDisorderList();
        $scope.FetchMalignancyList();
        $scope.FetchTuberculosisList();
        $scope.FetchPelvicInfectionList();
        $scope.FetchBleedingDisordersList();
        $scope.FetchEpilepsyList();
        $scope.FetchRespiratoryDiseaseList();
        $scope.FetchSLEDiseaseList();
        $scope.FetchDurationYearsList();
        $scope.FetchDurationMonthsList();
        $scope.GetMoliculeList();
        $scope.GetDrugList();


        $scope.lstAddYesNo = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Yes' }, { ID: 2, Description: 'No' }];
        $scope.lstFreq = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Regular' }, { ID: 2, Description: 'occasional' }];
        $scope.latexlstYr = angular.copy($scope.DurationYearsList);
        $scope.latexlstMnth = angular.copy($scope.DurationMonthsList);

        //New Family History
        $scope.FetchTypeOfDiseaseList();
        $scope.FetchMaternalPaternalList();
        $scope.FetchRelationshipList();
        $scope.FetchLiveStatusList();
        //usSpinnerService.stop('GridSpinner');
        
    }
    /*END : Page setup*/

    /*START : Bind dropdowns*/
    $scope.AddAllergyHistoryRow = function () {
        obj = {};
       
        obj.DrugName = 0;
        obj.DrugID = 0;
        obj.AllegryID = 0;
        obj.currStatus = 0;
        obj.AlleSinceYr = 0;
        obj.AlleSinceMnth = 0;
        obj.DrugImpact = '';
        obj.SeverityID = 0;
        obj.SinceWhenYr = 0;
        obj.SinceWhenMnth = 0;
        obj.IsFood = false;
        obj.IsSkin = false;
        obj.IsSmoke = false;
        obj.IsLatex = false;
        obj.IsAllergy = false;
        obj.IsDrugAllergy = true;
        obj.IsOtherAlleygy = true;
        obj.lstYr = $scope.MainDurationYearsList;
        obj.lstMnth = $scope.DurationMonthsList;
        obj.typeofallergyid = 0;
        obj.typeofallergy = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Drug Allergy' }, { ID: 2, Description: 'Food Allergy' }, { ID: 3, Description: 'Skin Allergy' },
        { ID: 4, Description: 'Smoke Allergy' }, { ID: 5, Description: 'Latex Allergy' }, { ID: 6, Description: 'Dust Allergy' }];
        obj.lstYesNo = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Present' }, { ID: 2, Description: 'Absent' }];
        obj.lstSeverity = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Mild' }, { ID: 2, Description: 'Moderate' }, { ID: 3, Description: 'Severe' }];
        $scope.lstDrugAllergy.push(obj);
    }
   
    $scope.SetAllControls = function SetAllControls(VID, VUnitID, Prev) {   

        var ResponseData = MaleHistoryService.SetAllControls(VID, VUnitID, Prev);
        ResponseData.then(function (Response) {
            
            $scope.MaleHistory = Response.data;
            debugger;
            console.log("male ",$scope.MaleHistory)
            if ($scope.MaleHistory == null || $scope.MaleHistory == undefined) {
                console.log("male ", $scope.MaleHistory)
                $scope.MaleHistory = {};
                $scope.MaleHistory.PastMedicationHistoryItem = [];
                $scope.MaleHistory.FamilyHistoryItem = [];
                $scope.MaleHistory.SurgicalHistoryItem = [];
                $scope.MaleHistory.DrugsNameSelected = [];
                $scope.MaleHistory.DiseaseRelationSelected = [];
                $scope.MaleHistory.DiabetesRelationSelected = [];
                $scope.MaleHistory.HypertensionRelationSelected = [];
                $scope.MaleHistory.ThyroidDisorderRelationSelected = [];
                $scope.MaleHistory.MalignancyRelationSelected = [];
                $scope.MaleHistory.OtherRelationSelected = [];
               // $scope.AddPastMedicationHistoryRow();
                $scope.MaleHistory.PWCPMonthsID = 0;
                $scope.MaleHistory.PWCPYearsID = 0;
                $scope.MaleHistory.SPWPID = 0;
                $scope.MaleHistory.SexualDysFunctionID = 0;
                $scope.MaleHistory.MoodID = 0;
                $scope.MaleHistory.SleepID = 0;
                $scope.MaleHistory.HeadacheORNauseaID = 0;
                $scope.MaleHistory.PersonalityID = 0;
                $scope.MaleHistory.StressID = 0;
                $scope.MaleHistory.ExerciseID = 0;
                $scope.MaleHistory.DietID = 0;
                $scope.MaleHistory.EpilepsyID = 0;
                $scope.MaleHistory.RespiratoryID = 0;
                $scope.MaleHistory.SLEID = 0;
                $scope.MaleHistory.CaffeinatedBeveragesID = 0;
                $scope.MaleHistory.MHOtherDiseaseOnMedication = 0;
                $scope.MaleHistory.RespiratoryOnMedication = 0;
                $scope.MaleHistory.SLEOnMedication = 0;
                $scope.MaleHistory.MHOtherDiseaseWhenMnth = 0;
                $scope.MaleHistory.RespiratorySinceWhenMnth = 0;
                $scope.MaleHistory.SLESinceWhenMnth = 0;
                $scope.MaleHistory.MHOtherDiseaseWhenYr = 0;
                $scope.MaleHistory.RespiratorySinceWhenYr = 0;
                $scope.MaleHistory.SLESinceWhenYr = 0;
                
                $scope.MaleHistory.CardiacDiseaseID = 0;
                $scope.MaleHistory.DiabetesID = 0;
                $scope.MaleHistory.MarriedLifeID = 0;
                $scope.MaleHistory.BloodGroupID = 0;


                $scope.MaleHistory.DiabetesSinceWhenMnth = 0;
                $scope.MaleHistory.DiabetesSinceWhenYr = 0;
                $scope.MaleHistory.ThyroidDisorderID = 0;
                $scope.MaleHistory.ThyroidDisorderSinceWhenMnth = 0;
                $scope.MaleHistory.ThyroidDisorderSinceWhenYr = 0;

                $scope.MaleHistory.MalignancyID = 0;

                $scope.MaleHistory.TuberculosisID = 0;
                $scope.MaleHistory.PelvicInfectionID = 0;
                $scope.MaleHistory.BleedingDisordersID = 0;
                $scope.MaleHistory.EpilepsySinceWhenMnth = 0;
                $scope.MaleHistory.EpilepsySinceWhenYr = 0;
                $scope.MaleHistory.OrchitisID = 0;
                $scope.MaleHistory.CardiacDiseaseOnMedication = 0;
                $scope.MaleHistory.DiabetesOnMedication = 0;
                $scope.MaleHistory.ThyroidDisorderOnMedication = 0;
                $scope.MaleHistory.MalignancyOnMedication = 0;
                $scope.MaleHistory.TuberculosisOnMedication = 0;
                $scope.MaleHistory.EpilepsyOnMedication = 0;
                $scope.MaleHistory.PelvicInfectionOnMedication = 0;
                $scope.MaleHistory.BleedingDisordersOnMedication = 0;
                $scope.MaleHistory.OrchitisOnMedication = 0;
                $scope.SaveorUpdate = "Save";
                $scope.IsSaveUpdate = false;
                //New Family History
                $scope.AddFamilyHistoryRow();
            }
               if (!angular.isUndefined($scope.MaleHistory) && $scope.MaleHistory != null) {
            
                console.log('here');
                $scope.SPWPPChanged();
                $scope.SexualDysfunctionChanged();
                // $scope.MedicalHistoryChangedEvents('1', $scope.MaleHistory.IsCardiacDisease);
                //  $scope.MedicalHistoryChangedEvents('2', $scope.MaleHistory.IsDiabetes);
                //  $scope.MedicalHistoryChangedEvents('3', $scope.MaleHistory.IsHypertension);
                // $scope.MedicalHistoryChangedEvents('4', $scope.MaleHistory.IsThyroidDisorder);
                // $scope.MedicalHistoryChangedEvents('5', $scope.MaleHistory.IsTuberculosis);
                //// $scope.MedicalHistoryChangedEvents('6', $scope.MaleHistory.IsOrchitis);
                //   $scope.MedicalHistoryChangedEvents('7', $scope.MaleHistory.IsMumps);
                //  $scope.MedicalHistoryChangedEvents('8', $scope.MaleHistory.IsOther);
                //Family
                $scope.FamilyHistoryChangedEvents('1', $scope.MaleHistory.IsFamilyCardiacDisease);
                $scope.FamilyHistoryChangedEvents('2', $scope.MaleHistory.IsFamilyDiabetesOther);
                $scope.FamilyHistoryChangedEvents('3', $scope.MaleHistory.IsFamilyHypertension);
                $scope.FamilyHistoryChangedEvents('4', $scope.MaleHistory.IsFamilyThyroidDisorder);
                $scope.FamilyHistoryChangedEvents('5', $scope.MaleHistory.IsFamilyMalignancy);
                $scope.FamilyHistoryChangedEvents('6', $scope.MaleHistory.IsFamilyOther);
                //Addictions
                $scope.AddictionsHistoryChangedEvents('1', $scope.MaleHistory.IsSmoking);
                $scope.AddictionsHistoryChangedEvents('2', $scope.MaleHistory.IsAlcohol);
                $scope.AddictionsHistoryChangedEvents('3', $scope.MaleHistory.IsTobacco);

                $scope.AddictionsHistoryChangedEvents('5', $scope.MaleHistory.IsDrugAddiction);
                $scope.AddictionsHistoryChangedEvents('6', $scope.MaleHistory.IsCaffeineAddiction);


                $scope.AddictionsHistoryChangedEvents('4', $scope.MaleHistory.IsAddictionsOther);
                //Social
                $scope.CaffeinatedBeveragesChanged();
                $scope.SocialHistoryChangedEvents('1', $scope.MaleHistory.IsExposureToHevyMetals);
                $scope.SocialHistoryChangedEvents('2', $scope.MaleHistory.IsExposureToRadiation);
                $scope.SocialHistoryChangedEvents('3', $scope.MaleHistory.IsUrinationOnstraining);
                $scope.SocialHistoryChangedEvents('4', $scope.MaleHistory.IsDifficultyInVoiding);
                $scope.SocialHistoryChangedEvents('5', $scope.MaleHistory.IsBurningsensation);
                $scope.SocialHistoryChangedEvents('6', $scope.MaleHistory.IsUrgencyForUrination);
                $scope.SocialHistoryChangedEvents('7', $scope.MaleHistory.IsOccupationHazards);
                $scope.DiabeteslstYr = $scope.DurationYearsList;
                $scope.DiabeteslstMnth = $scope.DurationMonthsList;
                if (angular.isDefined($scope.MaleHistory.lstAllergyDetail)) {
                    if ($scope.MaleHistory.lstAllergyDetail.length > 0) {
                        $scope.MaleHistory.lstAllergyDetail.forEach(function (x) {
                            x.lstYr = $scope.MainDurationYearsList;
                            x.lstMnth = $scope.DurationMonthsList;
                            x.typeofallergy = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Drug Allergy' }, { ID: 2, Description: 'Food Allergy' }, { ID: 3, Description: 'Skin Allergy' },
                            { ID: 4, Description: 'Smoke Allergy' }, { ID: 5, Description: 'Latex Allergy' }, { ID: 6, Description: 'Dust Allergy' }];

                            x.lstYesNo = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Present' }, { ID: 2, Description: 'Absent' }];
                            x.lstSeverity = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Mild' }, { ID: 2, Description: 'Moderate' }, { ID: 3, Description: 'Severe' }];
                            x.isAllergy = true;
                            if (x.DrugName != null) {
                                x.IsAllergy = true;
                                var temp = parseInt(x.DrugName)
                                if (!isNaN(temp)) {
                                    x.DrugName = temp;
                                }
                            }
                        })
                    }
                }

                angular.forEach(  $scope.MaleHistory.SurgicalHistoryItem,function(item)
                {
                    if (angular.isDefined(item.SurguryDate) && $filter('date')(new Date(item.SurguryDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                        item.SurguryDate = new Date(item.SurguryDate);
                    } else {
                        item.SurguryDate = null;
                    }
                 })
             
                $scope.ThyroidDisorderlstMnth = $scope.DurationMonthsList;
                debugger;
                if (!angular.isUndefined($scope.MaleHistory.lstAllergyDetail))
                         $scope.lstDrugAllergy = $scope.MaleHistory.lstAllergyDetail;
                console.log($scope.lstDrugAllergy);
                $scope.ThyroidDisorderlstYr = $scope.DurationYearsList;
                $scope.EpilepsylstMnth = $scope.DurationMonthsList;
                $scope.MHOtherDiseaselstMnth = $scope.DurationMonthsList;
                $scope.RespiratorylstMnth = $scope.DurationMonthsList;
                $scope.SLElstMnth = $scope.DurationMonthsList;
                $scope.EpilepsylstYr = $scope.DurationYearsList;
                $scope.MHOtherDiseaselstYr = $scope.DurationYearsList;
                $scope.RespiratorylstYr = $scope.DurationYearsList;
                $scope.SLElstYr = $scope.DurationYearsList;
                //if ($scope.IsSaveUpdate) {
                //      $scope.SaveorUpdate = "Update";
                //}
                debugger;
                if (selectPatient.VisitID > $scope.MaleHistory.VisitID && Prev == 1) {
                    $scope.isTodayDate = false;
                    if ($scope.isTodayDate)
                        angular.element(btnSaveMaleHistory).prop('disabled', false);
                    // $scope.FemaleHistory.FHID =null;
                }
                else if (selectPatient.VisitID == $scope.MaleHistory.VisitID && Prev == 1) {
                    $scope.isTodayDate = true;
                }
                else if (Prev == 0) {
                    angular.element(btnSaveMaleHistory).prop('disabled', true);
                    $scope.isTodayDate = true;
                }

                if (angular.isDefined($scope.MaleHistory.CardiacDiseaseWhen) && $filter('date')(new Date($scope.MaleHistory.CardiacDiseaseWhen), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.MaleHistory.CardiacDiseaseWhen = new Date($scope.MaleHistory.CardiacDiseaseWhen);
                } else {
                    $scope.MaleHistory.CardiacDiseaseWhen = null;
                }
                
                if (angular.isDefined($scope.MaleHistory.TuberculosisWhen) && $filter('date')(new Date($scope.MaleHistory.TuberculosisWhen), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.MaleHistory.TuberculosisWhen = new Date($scope.MaleHistory.TuberculosisWhen);
                } else {
                    $scope.MaleHistory.TuberculosisWhen = null;
                }
                
                if (angular.isDefined($scope.MaleHistory.MalignancyWhen) && $filter('date')(new Date($scope.MaleHistory.MalignancyWhen), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.MaleHistory.MalignancyWhen = new Date($scope.MaleHistory.MalignancyWhen);
                } else {
                    $scope.MaleHistory.MalignancyWhen = null;
                }

                if (angular.isDefined($scope.MaleHistory.PelvicInfectionWhen) && $filter('date')(new Date($scope.MaleHistory.PelvicInfectionWhen), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.MaleHistory.PelvicInfectionWhen = new Date($scope.MaleHistory.PelvicInfectionWhen);
                } else {
                    $scope.MaleHistory.PelvicInfectionWhen = null;
                }

                if (angular.isDefined($scope.MaleHistory.BleedingDisordersWhen) && $filter('date')(new Date($scope.MaleHistory.BleedingDisordersWhen), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.MaleHistory.BleedingDisordersWhen = new Date($scope.MaleHistory.BleedingDisordersWhen);
                } else {
                    $scope.MaleHistory.BleedingDisordersWhen = null;
                }

                if (angular.isDefined($scope.MaleHistory.OrchitisWhen) && $filter('date')(new Date($scope.MaleHistory.OrchitisWhen), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.MaleHistory.OrchitisWhen = new Date($scope.MaleHistory.OrchitisWhen);
                } else {
                    $scope.MaleHistory.OrchitisWhen = null;
                }

                
                 
                
                if($scope.MaleHistory.IsCovidVaccinationDone)
                {
                        $scope.MaleHistory.IsCovidVaccinationDone = $scope.MaleHistory.IsCovidVaccinationDone;
                        if (angular.isDefined($scope.MaleHistory.CovidVaccinationDate1) && $filter('date')(new Date($scope.MaleHistory.CovidVaccinationDate1), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                        $scope.MaleHistory.CovidVaccinationDate1 = new Date($scope.MaleHistory.CovidVaccinationDate1);
                        } else {
                        $scope.MaleHistory.CovidVaccinationDate1 = null;
                    }

                 if (angular.isDefined($scope.MaleHistory.CovidVaccinationDate2) && $filter('date')(new Date($scope.MaleHistory.CovidVaccinationDate2), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.MaleHistory.CovidVaccinationDate2 = new Date($scope.MaleHistory.CovidVaccinationDate2);
                    } else {
                    $scope.MaleHistory.CovidVaccinationDate2 = null;
                }

                 if (angular.isDefined($scope.MaleHistory.CovidVaccinationDate3) && $filter('date')(new Date($scope.MaleHistory.CovidVaccinationDate3), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.MaleHistory.CovidVaccinationDate3 = new Date($scope.MaleHistory.CovidVaccinationDate3);
                    } else {
                    $scope.MaleHistory.CovidVaccinationDate3 = null;
                }
                        $scope.flag13 =true;
                }
                else
                {
                    $scope.MaleHistory.IsCovidVaccinationDone = "Yes";
                    $scope.MaleHistory.CovidVaccinationDate1 = null;
                    $scope.MaleHistory.CovidVaccinationDate2 = null;
                    $scope.MaleHistory.CovidVaccinationDate3 = null;
                    $scope.flag13 =false;
                }
                debugger;
                //if (!angular.isUndefined($scope.MaleHistory.AllergiesDrugIds) && !angular.isUndefined($scope.DrugsNameList)) {
                //    angular.forEach($scope.MaleHistory.AllergiesDrugIds.split(','), function (i) {
                //        for (var j = 0; j <= $scope.DrugsNameList.length - 1; j++) {
                //            if ($scope.DrugsNameList[j].ID == i) {
                //                $scope.DrugsNameList[j].ticked = true;
                //                break;
                //            }
                //        }
                //    });
                //}
            }

        }, function (error) {
            $scope.Error = error;
        })
    }      

    $scope.FetchYearsList = function FetchYearsList() {
        //
        //var year = new Date().getFullYear();
        //var range = [];
        //range.splice(0, 0, { ID: 0, Description: 'Select' });
        //for (var i = 1; i <= 26; i++) {
        //    if (i == 1) {
        //        range.splice(i, 0, { ID: i, Description: year });
        //    } else {
        //        var yearscal = year - (i - 1);
        //        range.splice(i, 0, { ID: i, Description: yearscal });
        //    }
        //}

        //$scope.PWCPYears = range;
        //if ($scope.MaleHistory.PWCPYearsID == undefined) {
        //    $scope.MaleHistory.PWCPYearsID = 0;
        // }
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 25; i++) {
            range.splice(i, 0, { ID: i, Description: i-1 });
        }
        $scope.PWCPYears = range;
        if ($scope.MaleHistory.PWCPYearsID == undefined) {
            $scope.MaleHistory.PWCPYearsID = 0;
        }
    }

    $scope.FetchMonthsList = function FetchMonthsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 12; i++) {
            range.splice(i, 0, { ID: i, Description: i - 1 });
        }

        $scope.PWCPMonthsList = range;
        if ($scope.MaleHistory.PWCPMonthsID == undefined) {
            $scope.MaleHistory.PWCPMonthsID = 0;
        }
    }
    $scope.FetchDurationYearsList = function FetchDurationYearsList() {

        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Year' });
        for (var i = 1; i <= 15; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.DurationYearsList = range;
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Year' });
        
          for (var i = 1; i <= 50; i++) {
            range.splice(i, 0, { ID: i, Description: i });
          }
          $scope.MainDurationYearsList = range;
        if ($scope.MaleHistory.DurationYearsID == undefined) {
            $scope.MaleHistory.DurationYearsID = 0;
        }

    }

    $scope.FetchDurationMonthsList = function FetchDurationMonthsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Month' });
        for (var i = 1; i <= 11; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.DurationMonthsList = range;
        if ($scope.MaleHistory.DurationMonthsID == undefined) {
            $scope.MaleHistory.DurationMonthsID = 0;
        }
    }

    /* Bind dropdowns using common service method */
    $scope.GetDrugList = function GetDrugList() {
        var response = PrescriptionSrv.GetDrugList(UserInfo.UnitID);
        response.then(function (resp) {
            if (resp.data != null) {
                //debugger
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
    $scope.FetchOnMedication = function FetchOnMedication() {
        var ResponseData = Common.getMasterList('M_OnMedication', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.OnMedicationList = Responce.data;
            if ($scope.MaleHistory.CardiacDiseaseOnMedication == undefined) {
                $scope.MaleHistory.CardiacDiseaseOnMedication = 0;
            }
            if ($scope.MaleHistory.DiabetesOnMedication == undefined) {
                $scope.MaleHistory.DiabetesOnMedication = 0;
            }
            if ($scope.MaleHistory.ThyroidDisorderOnMedication == undefined) {
                $scope.MaleHistory.ThyroidDisorderOnMedication = 0;
            }
            if ($scope.MaleHistory.MalignancyOnMedication == undefined) {
                $scope.MaleHistory.MalignancyOnMedication = 0;
            }
            if ($scope.MaleHistory.TuberculosisOnMedication == undefined) {
                $scope.MaleHistory.TuberculosisOnMedication = 0;
            }
            if ($scope.MaleHistory.PelvicInfectionOnMedication == undefined) {
                $scope.MaleHistory.PelvicInfectionOnMedication = 0;
            }
            if ($scope.MaleHistory.BleedingDisordersOnMedication == undefined) {
                $scope.MaleHistory.BleedingDisordersOnMedication = 0;
            }
            if ($scope.MaleHistory.EpilepsyOnMedication == undefined) {
                $scope.MaleHistory.EpilepsyOnMedication = 0;
            }
            if ($scope.MaleHistory.OrchitisOnMedication == undefined) {
                $scope.MaleHistory.OrchitisOnMedication = 0;
            }
            if ($scope.MaleHistory.MHOtherDiseaseOnMedication == undefined) {
                $scope.MaleHistory.MHOtherDiseaseOnMedication = 0;
            }
            if ($scope.MaleHistory.RespiratoryOnMedication == undefined) {
                $scope.MaleHistory.RespiratoryOnMedication = 0;
            }
            if ($scope.MaleHistory.SLEOnMedication == undefined) {
                $scope.MaleHistory.SLEOnMedication = 0;
            }


        }, function (err) {
            $scope.Error = error;
        })
    }

    $scope.FetchSuccessfullPreganancyWithPastPartner = function FetchSuccessfullPreganancyWithPastPartner() {
        //
        var ResponseData = Common.getMasterList('M_SuccessfulPregnanciesWithPastPartner', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SPWPList = Response.data;
            if ($scope.MaleHistory.SPWPID == undefined) {
                $scope.MaleHistory.SPWPID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchSexualDysFunctionList = function FetchSexualDysFunctionList() {
        //
        var ResponseData = Common.getMasterList('M_SexualDysfunction', 'SexDyID', 'SexDyDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SexualDysFunctionList = Response.data;
            if ($scope.MaleHistory.SexualDysFunctionID == undefined) {
                $scope.MaleHistory.SexualDysFunctionID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchEjaculationORErectionList = function FetchEjaculationORErectionList() {
        //
        var ResponseData = Common.getMasterList('M_EjaculationORErection', 'SexDyID', 'SexDyDescription');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.EjaculationORErectionList = Response.data;
            if ($scope.MaleHistory.EjaculationORErectionID == undefined) {
                $scope.MaleHistory.EjaculationORErectionID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMarriedLife = function FetchMarriedLife() {
        ////
        var ResponseData = Common.getMasterList('M_MarriedLife', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MarriedLifeList = Response.data;
            if ($scope.MaleHistory.MarriedLifeID == undefined) {
                $scope.MaleHistory.MarriedLifeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }



    $scope.FetchBloodGroupList = function FetchBloodGroupList() {
        ////
        var ResponseData = Common.getMasterList('M_BloodGroupMaster', 'BloodID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.BloodGroupList = Response.data;
            if ($scope.MaleHistory.BloodGroupID == undefined) {
                $scope.MaleHistory.BloodGroupID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchCalenderList = function FetchCalenderList() {
        //
        var ResponseData = Common.getMasterList('M_Calender', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.CalenderList = Response.data;
            if ($scope.MaleHistory.CalenderID == undefined) {
                $scope.MaleHistory.CalenderID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMedicationStatusList = function FetchMedicationStatusList() {
        //debugger
        var ResponseData = Common.getMasterList('M_MedicationStatus', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MedicationStatusList = Response.data;
            if ($scope.MaleHistory.MedicationStatusID == undefined) {
                $scope.MaleHistory.MedicationStatusID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchDrugsList = function FetchDrugsList() {
        debugger;
        var ResponseData = Common.getMasterList('M_Molecule', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            //$scope.DrugsList = Response.data;
            $scope.DrugsNameList = Response.data;
         

            //debugger
            //if (!angular.isUndefined($scope.MaleHistory.AllergiesDrugIds)) {
            //    angular.forEach($scope.MaleHistory.AllergiesDrugIds.split(','), function (i) {
            //        //$scope.DrugsNameList[$scope.DrugsNameList.findIndex(x=>x.ID == i)].ticked = true;

            //        for (var j = 0; j <= $scope.DrugsNameList.length - 1; j++) {
            //            if ($scope.DrugsNameList[j].ID == i) {
            //                $scope.DrugsNameList[j].ticked = true;
            //                break;
            //            }
            //        }
            //    });


            //}
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchRelationList = function FetchRelationList() {
        //
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {

            $scope.DiseaseRelationList = Response.data;
            if ($scope.MaleHistory.RelationID == undefined) {
                $scope.MaleHistory.RelationID = 0;
            }
            //Make checkbox checked
            if (!angular.isUndefined($scope.MaleHistory.FamilyCardiacDiseaseIds)) {
                angular.forEach($scope.MaleHistory.FamilyCardiacDiseaseIds.split(','), function (i) {
                    // $scope.DiseaseRelationList[$scope.DiseaseRelationList.findIndex(x=>x.ID == i)].ticked = true;
                    for (var j = 0; j <= $scope.DiseaseRelationList.length - 1; j++) {
                        if ($scope.DiseaseRelationList[j].ID == i) {
                            $scope.DiseaseRelationList[j].ticked = true;
                            break;
                        }
                    }
                });
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchDiabetesRelationList = function FetchDiabetesRelationList() {
        ////
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            ////
            $scope.DiabetesRelationList = Response.data;
            //Make checkbox checked
            if (!angular.isUndefined($scope.MaleHistory.FamilyCardiacDiseaseIds)) {
                angular.forEach($scope.MaleHistory.FamilyCardiacDiseaseIds.split(','), function (i) {

                    //$scope.DiabetesRelationList[$scope.DiabetesRelationList.findIndex(x=>x.ID == i)].ticked = true;
                    for (var j = 0; j <= $scope.DiabetesRelationList.length - 1; j++) {
                        if ($scope.DiabetesRelationList[j].ID == i) {
                            $scope.DiabetesRelationList[j].ticked = true;
                            break;
                        }
                    }
                });
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchHypertensionRelationList = function FetchHypertensionRelationList() {
        ////
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            ////
            $scope.HypertensionRelationList = Response.data;
            //Make checkbox checked
            if (!angular.isUndefined($scope.MaleHistory.FamilyHypertensionIds)) {
                angular.forEach($scope.MaleHistory.FamilyHypertensionIds.split(','), function (i) {

                    // $scope.HypertensionRelationList[$scope.HypertensionRelationList.findIndex(x=>x.ID == i)].ticked = true;
                    for (var j = 0; j <= $scope.HypertensionRelationList.length - 1; j++) {
                        if ($scope.HypertensionRelationList[j].ID == i) {
                            $scope.HypertensionRelationList[j].ticked = true;
                            break;
                        }
                    }
                });
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchThyroidDisorderRelationList = function FetchThyroidDisorderRelationList() {
        ////
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            ////
            $scope.ThyroidDisorderRelationList = Response.data;
            //Make checkbox checked
            if (!angular.isUndefined($scope.MaleHistory.FamilyThyroidDisorderIds)) {
                angular.forEach($scope.MaleHistory.FamilyThyroidDisorderIds.split(','), function (i) {

                    //$scope.ThyroidDisorderRelationList[$scope.ThyroidDisorderRelationList.findIndex(x=>x.ID == i)].ticked = true;
                    for (var j = 0; j <= $scope.ThyroidDisorderRelationList.length - 1; j++) {
                        if ($scope.ThyroidDisorderRelationList[j].ID == i) {
                            $scope.ThyroidDisorderRelationList[j].ticked = true;
                            break;
                        }
                    }

                });
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMalignancyRelationList = function FetchMalignancyRelationList() {
        ////
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            ////
            $scope.MalignancyRelationList = Response.data;
            //Make checkbox checked
            if (!angular.isUndefined($scope.MaleHistory.FamilyMalignancyIds)) {
                angular.forEach($scope.MaleHistory.FamilyMalignancyIds.split(','), function (i) {

                    //$scope.MalignancyRelationList[$scope.MalignancyRelationList.findIndex(x=>x.ID == i)].ticked = true;
                    for (var j = 0; j <= $scope.MalignancyRelationList.length - 1; j++) {
                        if ($scope.MalignancyRelationList[j].ID == i) {
                            $scope.MalignancyRelationList[j].ticked = true;
                            break;
                        }
                    }
                });
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchOtherRelationList = function FetchOtherRelationList() {
        ////
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            ////
            $scope.OtherRelationList = Response.data;
            //Make checkbox checked
            if (!angular.isUndefined($scope.MaleHistory.FamilyOtherRemarkIds)) {
                angular.forEach($scope.MaleHistory.FamilyOtherRemarkIds.split(','), function (i) {

                    //$scope.OtherRelationList[$scope.OtherRelationList.findIndex(x=>x.ID == i)].ticked = true;

                    for (var j = 0; j <= $scope.OtherRelationList.length - 1; j++) {
                        if ($scope.OtherRelationList[j].ID == i) {
                            $scope.OtherRelationList[j].ticked = true;
                            break;
                        }
                    }
                });
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMoodList = function FetchMoodList() {
        ////
        var ResponseData = Common.getMasterList('M_Mood', 'MoodID', 'MoodDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MoodList = Response.data;
            if ($scope.MaleHistory.MoodID == undefined) {
                $scope.MaleHistory.MoodID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchSleepList = function FetchSleepList() {
        ////
        var ResponseData = Common.getMasterList('M_Sleep', 'SleepID', 'SleepDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SleepList = Response.data;
            if ($scope.MaleHistory.SleepID == undefined) {
                $scope.MaleHistory.SleepID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchHeadacheORNauseaList = function FetchHeadacheORNauseaList() {
        ////
        var ResponseData = Common.getMasterList('M_HeadacheORNausea', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.HeadacheORNauseaList = Response.data;
            if ($scope.MaleHistory.HeadacheORNauseaID == undefined) {
                $scope.MaleHistory.HeadacheORNauseaID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchPersonalityList = function FetchPersonalityList() {
        ////
        var ResponseData = Common.getMasterList('M_Personality', 'PersonalityID', 'PersonalityDescription');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.PersonalityList = Response.data;
            if ($scope.MaleHistory.PersonalityID == undefined) {
                $scope.MaleHistory.PersonalityID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchStressList = function FetchStressList() {
        ////
        var ResponseData = Common.getMasterList('M_Stress', 'StressID', 'StressDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.StressList = Response.data;
            if ($scope.MaleHistory.StressID == undefined) {
                $scope.MaleHistory.StressID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchExerciseList = function FetchExerciseList() {
        ////
        var ResponseData = Common.getMasterList('M_Exercise', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ExerciseList = Response.data;
            if ($scope.MaleHistory.ExerciseID == undefined) {
                $scope.MaleHistory.ExerciseID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchDietList = function FetchDietList() {
        ////
        var ResponseData = Common.getMasterList('M_Diet', 'DietID', 'DietDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DietList = Response.data;
            if ($scope.MaleHistory.DietID == undefined) {
                $scope.MaleHistory.DietID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchCaffeinatedBeveragesList = function FetchCaffeinatedBeveragesList() {
        ////
        var ResponseData = Common.getMasterList('M_CaffeinatedBeverages', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.CaffeinatedBeveragesList = Response.data;
            if ($scope.MaleHistory.CaffeinatedBeveragesID == undefined) {
                $scope.MaleHistory.CaffeinatedBeveragesID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FetchCardiacDiseaseList = function FetchCardiacDiseaseList() {
        var ResponseData = Common.getMasterList('M_CardiacDisease', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.CardiacDiseaseList = Responce.data;
            if ($scope.MaleHistory.CardiacDiseaseID == undefined) {
                $scope.MaleHistory.CardiacDiseaseID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchDiabetesList = function FetchDiabetesList() {
        var ResponseData = Common.getMasterList('M_Diabetes', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DiabetesList = Responce.data;
            if ($scope.MaleHistory.DiabetesID == undefined) {
                $scope.MaleHistory.DiabetesID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchOrchitisList = function FetchOrchitisList() {
        var ResponseData = Common.getMasterList('M_Orchitis', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.OrchitisList = Responce.data;
            if ($scope.MaleHistory.OrchitisID == undefined) {
                $scope.MaleHistory.OrchitisID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchThyroidDisorderList = function FetchThyroidDisorderList() {
        var ResponseData = Common.getMasterList('M_ThyroidDisorder', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ThyroidDisorderList = Responce.data;
            if ($scope.MaleHistory.ThyroidDisorderID == undefined) {
                $scope.MaleHistory.ThyroidDisorderID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchMalignancyList = function FetchMalignancyList() {
        var ResponseData = Common.getMasterList('M_Malignancy', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MalignancyList = Responce.data;
            if ($scope.MaleHistory.MalignancyID == undefined) {
                $scope.MaleHistory.MalignancyID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchTuberculosisList = function FetchTuberculosisList() {
        var ResponseData = Common.getMasterList('M_Tuberculosis', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.TuberculosisList = Responce.data;
            if ($scope.MaleHistory.TuberculosisID == undefined) {
                $scope.MaleHistory.TuberculosisID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchPelvicInfectionList = function FetchPelvicInfectionList() {
        var ResponseData = Common.getMasterList('M_PelvicInfection', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.PelvicInfectionList = Responce.data;
            if ($scope.MaleHistory.PelvicInfectionID == undefined) {
                $scope.MaleHistory.PelvicInfectionID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchBleedingDisordersList = function FetchBleedingDisordersList() {
        var ResponseData = Common.getMasterList('M_BleedingDisorder', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            //debugger
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.BleedingDisordersList = Responce.data;
            if ($scope.MaleHistory.BleedingDisordersID == undefined) {
                //debugger
                $scope.MaleHistory.BleedingDisordersID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchEpilepsyList = function FetchEpilepsyList() {
        var ResponseData = Common.getMasterList('M_Epilepsy', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.EpilepsyList = Responce.data;
            if ($scope.MaleHistory.EpilepsyID == undefined) {
                $scope.MaleHistory.EpilepsyID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchRespiratoryDiseaseList = function FetchRespiratoryDiseaseList() {
        var ResponseData = Common.getMasterList('M_RespiratoryDisease', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.RespiratoryDiseaseList = Responce.data;
            if ($scope.MaleHistory.RespiratoryID == undefined) {
                $scope.MaleHistory.RespiratoryID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchSLEDiseaseList = function FetchSLEDiseaseList() {
        var ResponseData = Common.getMasterList('M_SLEDisease', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SLEDiseaseList = Responce.data;
            if ($scope.MaleHistory.SLEID == undefined) {
                $scope.MaleHistory.SLEID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }


    //New Family History
    $scope.FetchTypeOfDiseaseList = function FetchTypeOfDiseaseList() {
        //debugger
        var ResponseData = Common.getMasterList('M_TypeOfDisease', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.TypeOfDiseaseList = Response.data;
            if ($scope.MaleHistory.TypeOfDiseaseID == undefined) {
                $scope.MaleHistory.TypeOfDiseaseID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMaternalPaternalList = function FetchMaternalPaternalList() {
        //debugger
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MaternalPaternalList = Response.data;
            if ($scope.MaleHistory.MaternalPaternalID == undefined) {
                $scope.MaleHistory.MaternalPaternalID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchRelationshipList = function FetchRelationshipList() {
        //debugger
        var ResponseData = Common.getMasterList('M_FamilyMaster', 'FID', 'Fdetail');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.RelationshipList = Response.data;
            if ($scope.MaleHistory.RelationshipID == undefined) {
                $scope.MaleHistory.RelationshipID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchLiveStatusList = function FetchLiveStatusList() {
        //debugger
        var ResponseData = Common.getMasterList('M_AliveDeadStatusMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.LiveStatusList = Response.data;
            if ($scope.MaleHistory.LiveStatusID == undefined) {
                $scope.MaleHistory.LiveStatusID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    /*END : Bind dropdowns*/

    /*START : Row adding actions*/
    $scope.AddPastMedicationHistoryRow = function () {

        $scope.MaleHistory.PastMedicationHistoryItem.push({
            'DrugeName': "",
            'Dose': "",
            'TimePeriod': "",
            'CalenderID': 0,
            'Remark': "",
            'MedicationStatusID': 0

        });
    }

    //New Family History
    $scope.AddFamilyHistoryRow = function () {
        //debugger
        if ($scope.MaleHistory.FamilyHistoryItem == null) $scope.MaleHistory.FamilyHistoryItem = [];
        $scope.MaleHistory.FamilyHistoryItem.push({
            'TypeOfDiseaseID': 0,
            'TypeOfDisease': "",

            'MaternalPaternalID': 0,
            'MaternalPaternal': "",

            'RelationshipID': 0,
            'Relationship': "",

            'LiveStatusID': 0,
            'LiveStatus': "",

            'Remark': "",
        });
    }

    $scope.RemoveFamilyHistoryRow = function (Index) {
        //debugger
       // if ($scope.MaleHistory.FamilyHistoryItem.length <= 1) {
          //  AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
      //  }
       // else {
            $scope.MaleHistory.FamilyHistoryItem.splice(Index, 1);
      //  }
    };

    $scope.RemovePastMedicationHistoryRow = function (Index) {

      //  if ($scope.MaleHistory.PastMedicationHistoryItem.length <= 1) {
            //AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
       // }
        //else {
            $scope.MaleHistory.PastMedicationHistoryItem.splice(Index, 1);
        //}
    };
    $scope.RemoveAllergyHistoryRow = function (Index) {
        debugger;
        if ($scope.lstDrugAllergy.length <= 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else {
            $scope.lstDrugAllergy.splice(Index, 1);
            //After removing row make correct calculations
        }
    };
    /*END : Row adding actions*/

    /* START: Family History events chanegd with Enable and Disabled */
    $scope.SexualDysfunctionChanged = function SexualDysfunctionChanged() {
        if ($scope.MaleHistory.SexualDysFunctionID == 1) {
            $scope.IsEjaculationORErectionDisabled = false;
        } else {
            $scope.IsEjaculationORErectionDisabled = true;
            $scope.MaleHistory.EjaculationORErectionID = 0;
        }
    }

    /* Medical History events chanegd with Enable and Disabled */
    $scope.SPWPPChanged = function SPWPPChanged() {
        if ($scope.MaleHistory.SPWPID != undefined && $scope.MaleHistory.SPWPID == 1) {
            $scope.IsSPWPRemarkDisabled = false;
        } else {
            $scope.IsSPWPRemarkDisabled = true;
            $scope.MaleHistory.SPWPPRemark = null;
        }
    }

    $scope.MedicalHistoryChangedEvents = function (caseStr, IsTrue) {
        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsCardiacDiseaseDisabled = false;
                } else {
                    $scope.IsCardiacDiseaseDisabled = true;
                    $scope.MaleHistory.CardiacDiseaseRemark = null;
                }
                break;
            case '2':
                if (IsTrue) {
                    $scope.IsDiabetesDisabled = false;
                } else {
                    $scope.IsDiabetesDisabled = true;
                    $scope.MaleHistory.DiabetesRemark = null;
                }
                break;
            case '3':
                if (IsTrue) {
                    $scope.IsHypertensionDisabled = false;
                } else {
                    $scope.IsHypertensionDisabled = true;
                    $scope.MaleHistory.HypertensionRemark = null;
                }
                break;
            case '4':
                if (IsTrue) {
                    $scope.IsThyroidDisorderDisabled = false;
                } else {
                    $scope.IsThyroidDisorderDisabled = true;
                    $scope.MaleHistory.ThyroidDisorderRemark = null;
                }
                break;
            case '5':
                if (IsTrue) {
                    $scope.IsTuberculosisDisabled = false;
                } else {
                    $scope.IsTuberculosisDisabled = true;
                    $scope.MaleHistory.TuberculosisRemark = null;
                }
                break;
            case '6':
                if (IsTrue) {
                    $scope.IsOrchitisDisabled = false;
                } else {
                    $scope.IsOrchitisDisabled = true;
                    $scope.MaleHistory.OrchitisRemark = null;
                }
                break;
            case '7':
                if (IsTrue) {
                    $scope.IsMumpsDisabled = false;
                } else {
                    $scope.IsMumpsDisabled = true;
                    $scope.MaleHistory.MumpsRemark = null;
                }
                break;
            case '8':
                if (IsTrue) {
                    $scope.IsOtherDisabled = false;
                } else {
                    $scope.IsOtherDisabled = true;
                    $scope.MaleHistory.OtherRemark = null;
                }
                break;
            default:
        }
    };

    $scope.AddictionsHistoryChangedEvents = function (caseStr, IsTrue) {
        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsSmokingDisabled = false;
                } else {
                    $scope.IsSmokingDisabled = true;
                    $scope.MaleHistory.SmokingRemarks = null;
                    $scope.MaleHistory.SmokingcurrStatus = 0;
                    $scope.MaleHistory.SmokingSinceWhenMnth = 0;
                    $scope.MaleHistory.SmokingSinceWhenYr = 0;
                    $scope.MaleHistory.SmokingFrequencyID = 0;
                    $scope.MaleHistory.SmokingNoOfCig = null;
                }
                break;
            case '2':
                if (IsTrue) {
                    $scope.IsAlcoholDisabled = false;
                } else {
                    $scope.IsAlcoholDisabled = true;
                    $scope.MaleHistory.AlcoholRemark = null;
                    $scope.MaleHistory.AlcoholcurrStatus = 0;
                    $scope.MaleHistory.AlcoholSinceWhenMnth = 0;
                    $scope.MaleHistory.AlcoholSinceWhenYr = 0;
                    $scope.MaleHistory.AlcoholFrequencyID = 0;
                    $scope.MaleHistory.AlcoholQuantity = null;
                }
                break;
            case '3':
                if (IsTrue) {
                    $scope.IsTobaccoDisabled = false;
                } else {
                    $scope.IsTobaccoDisabled = true;
                    $scope.MaleHistory.TobaccoRemark = null;
                    $scope.MaleHistory.TobacocurrStatus = 0;
                    $scope.MaleHistory.TobacoSinceWhenMnth = 0;
                    $scope.MaleHistory.TobacoSinceWhenYr = 0;
                    $scope.MaleHistory.TobacoFrequencyID = 0;
                    $scope.MaleHistory.TobacoQuantity = null;
                }
                break;
            case '4':
                if (IsTrue) {
                    $scope.IsAddictionsOtherDisabled = false;
                } else {
                    $scope.IsAddictionsOtherDisabled = true;
                    $scope.MaleHistory.AddictionsOtherRemark = null;
                }
                break;


            case '5':
                if (IsTrue) {
                    $scope.IsDrugAddictionDisabled = false;
                } else {
                    $scope.IsDrugAddictionDisabled = true;
                    $scope.MaleHistory.DrugAddictionRemark = null;
                    $scope.MaleHistory.DrugAddictioncurrStatus = 0;
                    $scope.MaleHistory.DrugAddictionSinceWhenMnth = 0;
                    $scope.MaleHistory.DrugAddictionSinceWhenYr = 0;
                    $scope.MaleHistory.DrugAddictionFrequencyID = 0;
                    $scope.MaleHistory.DrugAddictionQuantity = null;
                }
                break;
                  case '6':
                if (IsTrue) {
                    $scope.IsCaffeineAddictionDisabled = false;
                } else {
                    $scope.IsCaffeineAddictionDisabled = true;
                    $scope.MaleHistory.CaffeineAddictionRemark = null;
                    $scope.MaleHistory.CaffeineAddictioncurrStatus = 0;
                    $scope.MaleHistory.CaffeineAddictionSinceWhenMnth = 0;
                    $scope.MaleHistory.CaffeineAddictionSinceWhenYr = 0;
                    $scope.MaleHistory.CaffeineAddictionFrequencyID = 0;
                    $scope.MaleHistory.CaffeineAddictionQuantity = null;
                }
                break;
            default:

        }
    };

    $scope.FamilyHistoryChangedEvents = function (caseStr, IsTrue) {
        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsFamilyCardiacDiseaseDisabled = false;
                } else {
                    $scope.IsFamilyCardiacDiseaseDisabled = true;
                    //rohini
                    $scope.MaleHistory.DiseaseRelationSelected = [];
                    if ($scope.DiseaseRelationList != null) {
                        for (var j = 0; j <= $scope.DiseaseRelationList.length - 1; j++) {
                            $scope.DiseaseRelationList[j].ticked = false;
                        }
                    }
                }
                break;
            case '2':
                if (IsTrue) {
                    $scope.IsFamilyDiabetesDisabled = false;
                } else {
                    $scope.IsFamilyDiabetesDisabled = true;
                    $scope.MaleHistory.DiabetesRelationSelected = [];
                    if ($scope.DiabetesRelationList != null) {
                        for (var j = 0; j <= $scope.DiabetesRelationList.length - 1; j++) {
                            $scope.DiabetesRelationList[j].ticked = false;
                        }
                    }
                }
                break;
            case '3':
                if (IsTrue) {
                    $scope.IsFamilyHypertensionDisabled = false;
                } else {
                    $scope.IsFamilyHypertensionDisabled = true;
                    $scope.MaleHistory.HypertensionRelationSelected = [];
                    if ($scope.HypertensionRelationList != null) {
                        for (var j = 0; j <= $scope.HypertensionRelationList.length - 1; j++) {
                            $scope.HypertensionRelationList[j].ticked = false;
                        }
                    }
                }
                break;
            case '4':
                if (IsTrue) {
                    $scope.IsFamilyThyroidDisorderDisabled = false;
                } else {
                    $scope.IsFamilyThyroidDisorderDisabled = true;
                    $scope.MaleHistory.ThyroidDisorderRelationSelected = [];
                    if ($scope.ThyroidDisorderRelationList != null) {
                        for (var j = 0; j <= $scope.ThyroidDisorderRelationList.length - 1; j++) {
                            $scope.ThyroidDisorderRelationList[j].ticked = false;
                        }
                    }
                }
                break;
            case '5':
                if (IsTrue) {
                    $scope.IsFamilyMalignancyDisabled = false;
                } else {
                    $scope.IsFamilyMalignancyDisabled = true;
                    $scope.MaleHistory.MalignancyRelationSelected = [];
                    if ($scope.MalignancyRelationList != null) {
                        for (var j = 0; j <= $scope.MalignancyRelationList.length - 1; j++) {
                            $scope.MalignancyRelationList[j].ticked = false;
                        }
                    }
                }
                break;
            case '6':
                if (IsTrue) {
                    $scope.IsFamilyOtherDisabled = false;
                } else {
                    $scope.IsFamilyOtherDisabled = true;
                    $scope.MaleHistory.IsFamilyOtherRemark = null;
                    $scope.MaleHistory.OtherRelationSelected = [];
                    if ($scope.OtherRelationList != null) {
                        for (var j = 0; j <= $scope.OtherRelationList.length - 1; j++) {
                            $scope.OtherRelationList[j].ticked = false;
                        }
                    }
                }
                break;
            default:
        }
    };

    $scope.CaffeinatedBeveragesChanged = function CaffeinatedBeveragesChanged() {
        if ($scope.MaleHistory.CaffeinatedBeveragesID == 1) {
            $scope.IsCaffeinatedBeveragesDisabled = false;
        } else {
            $scope.IsCaffeinatedBeveragesDisabled = true;
        }
    }

    $scope.SocialHistoryChangedEvents = function (caseStr, IsTrue) {

        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsExposureToHevyMetalsDisabled = false;
                } else {
                    $scope.IsExposureToHevyMetalsDisabled = true;
                    $scope.MaleHistory.ExposureToHevyMetalsRemark = null;
                }
                break;
            case '2':
                if (IsTrue) {
                    $scope.IsExposureToRadiationDisabled = false;
                } else {
                    $scope.IsExposureToRadiationDisabled = true;
                    $scope.MaleHistory.ExposureToRadiationRemark = null;
                }
                break;
            case '3':
                if (IsTrue) {
                    $scope.IsUrinationOnstrainingDisabled = false;
                } else {
                    $scope.IsUrinationOnstrainingDisabled = true;
                    $scope.MaleHistory.UrinationOnstrainingRemark = null;
                }
                break;
            case '4':
                if (IsTrue) {
                    $scope.IsDifficultyInVoidingDisabled = false;
                } else {
                    $scope.IsDifficultyInVoidingDisabled = true;
                    $scope.MaleHistory.DifficultyInVoidingRemark = null;
                }
                break;
            case '5':
                if (IsTrue) {
                    $scope.IsBurningsensationDisabled = false;
                } else {
                    $scope.IsBurningsensationDisabled = true;
                    $scope.MaleHistory.BurningsensationRemark = null;
                }
                break;
            case '6':
                if (IsTrue) {
                    $scope.IsUrgencyForUrinationDisabled = false;
                } else {
                    $scope.IsUrgencyForUrinationDisabled = true;
                    $scope.MaleHistory.UrgencyForUrinationRemark = null;
                }
                break;
           case '7':
                debugger
                if (IsTrue) {
                    $scope.IsOccupationHazards = false;
                } else {
                    $scope.IsOccupationHazardsDisabled = true;
                    $scope.MaleHistory.OccupationHazards = null;
                }
                break;
            default:

        }
    };
    /* END: Family History events chanegd with Enable and Disabled */

    /* START : Operations on male histroy form */
    $scope.InsertMaleHistory = function InsertMaleHistory(MaleHistory) {
        debugger;
        //if ($scope.MaleComplaints.PresentingComplaintsSelected.length == 0 && $scope.MaleComplaints.FollowUpNotes == '' && $scope.MaleComplaints.OtherComplaints == '' && $scope.MaleComplaints.NFUpDate == null && $scope.MaleComplaints.Reason == '' ) {
        //    //$scope.frmMaleComplaints.FollowUpNotes.$dirty = true;
        //    //$scope.frmMaleComplaints.NFUpDate.$dirty = true;
        //    //$scope.frmMaleComplaints.Reason.$dirty = true;
        //    AlertMessage.error("At list one data should be entered");

        //}
        //else {
        if (MaleHistory != undefined && $scope.Validate()) {
            $scope.MaleHistoryInsertionValidation(MaleHistory);
            
            debugger;
            for (var i = 0; i < $scope.lstDrugAllergy.length; i++) {
                
                if ($scope.lstDrugAllergy[i].typeofallergyid != 1) {
                    $scope.lstDrugAllergy[i].Food = $scope.lstDrugAllergy[i].DrugName;
                }
                else {
                    
                    var j = $scope.lstDrugAllergy[i].DrugName;
                    $scope.lstDrugAllergy[i].Food = $scope.DrugsNameList[j].Description;

                }
            }
            MaleHistory.lstAllergyDetail = $scope.lstDrugAllergy;
            if (!$scope.IsDrugNameValid || !$scope.IsStatusValid) {
               // AlertMessage.warning(objResource.msgTitle, 'Please fill all mandatory fields');
            } else {
                //if (!angular.isUndefined($scope.MaleHistory.CardiacDiseaseWhen)) {
                //    $scope.MaleHistory.CardiacDiseaseWhen = $filter('date')($scope.MaleHistory.CardiacDiseaseWhen, 'medium');
                //    //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
                //}
                //if (!angular.isUndefined($scope.MaleHistory.TuberculosisWhen)) {
                //    $scope.MaleHistory.TuberculosisWhen = $filter('date')($scope.MaleHistory.TuberculosisWhen, 'medium');
                //    //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
                //}
                //if (!angular.isUndefined($scope.MaleHistory.MalignancyWhen)) {
                //    $scope.MaleHistory.MalignancyWhen = $filter('date')($scope.MaleHistory.MalignancyWhen, 'medium');
                //    //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
                //}
                //if (!angular.isUndefined($scope.MaleHistory.PelvicInfectionWhen)) {
                //    $scope.MaleHistory.PelvicInfectionWhen = $filter('date')($scope.MaleHistory.PelvicInfectionWhen, 'medium');
                //    //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
                //}
                //if (!angular.isUndefined($scope.MaleHistory.BleedingDisordersWhen)) {
                //    $scope.MaleHistory.BleedingDisordersWhen = $filter('date')($scope.MaleHistory.BleedingDisordersWhen, 'medium');
                //    //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
                //}
                //if (!angular.isUndefined($scope.MaleHistory.OrchitisWhen)) {
                //    $scope.MaleHistory.OrchitisWhen = $filter('date')($scope.MaleHistory.OrchitisWhen, 'medium');
                //    //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
                //}
                debugger;
                if (selectPatient.VisitID > $scope.MaleHistory.VisitID) {

                    $scope.MaleHistory.MHID = null;
                    $scope.MaleHistory.VisitID = selectPatient.VisitID;
                    $scope.MaleHistory.lstAllergyDetail.forEach(function (x) {
                        x.AllergyID = 0;
                    });

                    $scope.MaleHistory.PastMedicationHistoryItem.forEach(function (x) {
                        x.PastMedicationID = 0;
                    });
                }

                 if($scope.MaleHistory.IsCovidVaccinationDone=='Yes')
                 {
                        if (!angular.isUndefined($scope.MaleHistory.CovidVaccinationDate1)) 
                        {
                        $scope.MaleHistory.CovidVaccinationDate1 = $filter('date')($scope.MaleHistory.CovidVaccinationDate1, 'medium');
                        }
                        if (!angular.isUndefined($scope.MaleHistory.CovidVaccinationDate2)) 
                        {
                             $scope.MaleHistory.CovidVaccinationDate2 = $filter('date')($scope.MaleHistory.CovidVaccinationDate2, 'medium');
                        }
                        if (!angular.isUndefined($scope.MaleHistory.CovidVaccinationDate3)) 
                        {
                        $scope.MaleHistory.CovidVaccinationDate3 = $filter('date')($scope.MaleHistory.CovidVaccinationDate3, 'medium');
                        }
                        $scope.MaleHistory.CovidVaccinationRemark = null;
                 }
                else
               {
                    $scope.MaleHistory.CovidVaccinationDate1 = null;
                    $scope.MaleHistory.CovidVaccinationDate2 = null;
                    $scope.MaleHistory.CovidVaccinationDate3 = null;
              }

                var ResponseData = MaleHistoryService.InsertMaleHistory(MaleHistory);
                ResponseData.then(function (Response) {

                    if (Response.data > 0) {
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                        $location.path('/MaleHistory/');
                       // $scope.getHistoryList();    // Added by Nayan Kamble on 18/12/2019
                        //$location.path("/EMRLandingPage");

                    }
                }, function (error) {
                    $scope.Error = error;
                });
            }
        }
        //  }

    }
    /* END   : Operations on male histroy form */

    /* START : View */
    $scope.GoToFemaleHistory = function GoToFemaleHistory() {
        $location.path('/FemaleHistory/');
    }

    /* Validations */
    $scope.MaleHistoryInsertionValidation = function MaleHistoryInsertionValidation(MaleHistory) {
        //debugger
        $scope.IsDrugNameValid = true;
        $scope.IsStatusValid = true;
        $scope.PMHistory = $filter('filter')($scope.MaleHistory.PastMedicationHistoryItem, function (d) { return (d.DrugeName != undefined && d.DrugeName != null && d.DrugeName != '') && d.MedicationStatusID == 0 });
        $scope.PMHistoryDrugeName = $filter('filter')($scope.MaleHistory.PastMedicationHistoryItem, function (d) { return (d.DrugeName == undefined || d.DrugeName == null || d.DrugeName == '') });
    if ($scope.PMHistory.length > 0) {
        //AlertMessage.info('Please select status if Druge Name selected in Past Medication History');//Commented by swatih for localization 16/7/2020
        AlertMessage.info(objResource.msgPleaseselectstatusifDrugeNameselectedinPastMedicationHistory);//Modified by swatih for localization 16/7/2020
            $scope.IsDrugNameValid = false;
            $scope.IsStatusValid = false;
        }
    else if ($scope.PMHistoryDrugeName.length > 0) {
        // AlertMessage.info('Druge Name should not be empty in Past Medication History row');//Commented by swatih for localization 16/7/2020
        AlertMessage.info(objResource.msgDrugeNameshouldnotbeemptyinPastMedicationHistoryrow);//Modified by swatih for localization 16/7/2020
            $scope.IsDrugNameValid = false;
            $scope.IsStatusValid = false;
    }
    else if (($scope.MaleHistory.CardiacDiseaseOnMedication == 1 || $scope.MaleHistory.DiabetesOnMedication == 1 || $scope.MaleHistory.ThyroidDisorderOnMedication == 1
        || $scope.MaleHistory.MalignancyOnMedication == 1 || $scope.MaleHistory.TuberculosisOnMedication == 1 || $scope.MaleHistory.TuberculosisOnMedication == 1
        || $scope.MaleHistory.BleedingDisordersOnMedication == 1 || $scope.MaleHistory.EpilepsyOnMedication == 1
        || $scope.MaleHistory.OrchitisOnMedication == 1 || $scope.MaleHistory.MHOtherDiseaseOnMedication == 1
        || $scope.MaleHistory.RespiratoryOnMedication == 1 || $scope.MaleHistory.SLEOnMedication == 1)&& $scope.MaleHistory.PastMedicationHistoryItem.length == 0)
        {
       
        //AlertMessage.info('Enter Medication for the captured Medical History');//Commented by swatih for localization 16/7/2020
        AlertMessage.info(objResource.msgEnterMedicationforthecapturedMedicalHistory);//Modified by swatih for localization 16/7/2020
            $scope.IsDrugNameValid = false;
            $scope.IsStatusValid = false;
        
        }
        
        //if ($scope.MaleHistory.PastMedicationHistoryItem != undefined) {
        //    if ($scope.MaleHistory.PastMedicationHistoryItem.length > 0) {
        //        for (var Index = 0; Index < $scope.MaleHistory.PastMedicationHistoryItem.length; Index++) {
        //            if ($scope.MaleHistory.PastMedicationHistoryItem[Index].DrugeName == undefined || $scope.MaleHistory.PastMedicationHistoryItem[Index].DrugeName == "") {
        //                $scope.IsDrugNameValid = false;
        //                $scope.frmMaleHistory.DrugeName.$dirty = true;
        //            }
        //            if ($scope.MaleHistory.PastMedicationHistoryItem[Index].MedicationStatusID == 0) {
        //                $scope.IsStatusValid = false;
        //                $scope.frmMaleHistory.MedicationStatusID.$dirty = true;
        //            }
        //        }
        //    }
        //    else {
        //        $scope.IsDrugNameValid = false;
        //        $scope.IsStatusValid = false;
        //        $scope.frmMaleHistory.DrugeName.$dirty = true;
        //        $scope.frmMaleHistory.MedicationStatusID.$dirty = true;
        //    }
        //}
        //else {
        //    $scope.IsDrugNameValid = false;
        //    $scope.IsStatusValid = false;
        //    $scope.frmMaleHistory.DrugeName.$dirty = true;
        //    $scope.frmMaleHistory.MedicationStatusID.$dirty = true;
        //}

    }
    $scope.Validate = function()
    {
        $scope.isPWCPDirty = false ;
        //if ($scope.MaleHistory.IsCovidVaccinationDone=='Yes' && !$scope.MaleHistory.CovidVaccinationDate1)
        //{
        //    AlertMessage.info('Please select Covid Vaccination Date 1');
        //    return false;
        //}
         //else if ($scope.MaleHistory.IsCovidVaccinationDone=='No' && !$scope.MaleHistory.CovidVaccinationRemark)
         //{
         //   AlertMessage.info('Please enter Covid Vaccination Remarks');
         //   return false;
         //}
          $scope.SHistory = $filter('filter')($scope.MaleHistory.SurgicalHistoryItem , function (d) { return d.TypeOfSurguryID == 0 || d.SurguryDate == undefined || d.SurguryDate == null || d.SurguryDate == '' || d.Remark == undefined || d.Remark == null || d.Remark == ''  });

          if ($scope.MaleHistory.PWCPYearsID == undefined || $scope.MaleHistory.PWCPYearsID == null || $scope.MaleHistory.PWCPYearsID == 0 || $scope.MaleHistory.PWCPMonthsID == undefined || $scope.MaleHistory.PWCPMonthsID == null || $scope.MaleHistory.PWCPMonthsID == 0)
          {
            $scope.isPWCPDirty = true ;
            AlertMessage.info('Please select Trying to achieve pregnancy with current partner since fields.');//Modified by swatih for localization 16/7/2020
            return false;
          }
          else if ($scope.MaleHistory.SexualDysFunctionID == 0 || $scope.MaleHistory.MarriedLifeID == 0 || $scope.MaleHistory.BloodGroupID == 0 )
          {
            AlertMessage.info('Please fill Mandatory Fields in Sexual History.');//Modified by swatih for localization 16/7/2020
            $scope.isSexualHistoryDirty=true;
            return false;
         }
          else if ($scope.MaleHistory.isPastFertilityMedication == undefined || $scope.MaleHistory.isPastFertilityMedication == null){
            
            AlertMessage.info('Please fill Past Mediacation History.');//Modified by swatih for localization 16/7/2020
            return false;
        }
         else if ($scope.MaleHistory.PastMedicationHistoryItem .length <1 && $scope.MaleHistory.isPastFertilityMedication ==1){
            
            AlertMessage.info('Please fill at least one  Past Mediacation History Item.');//Modified by swatih for localization 16/7/2020
            return false;
        }
         else if ($scope.MaleHistory.SleepID == 0 || $scope.MaleHistory.StressID == 0 || $scope.MaleHistory.ExerciseID == 0 )
          {
            AlertMessage.info('Please fill Mandatory Fields in Social History.');//Modified by swatih for localization 16/7/2020
            $scope.isSocialHistoryDirty=true;
            return false;
         }
        
         else if ($scope.MaleHistory.isSurgicalHistory == undefined || $scope.MaleHistory.isSurgicalHistory == null){
            
            AlertMessage.info('Please fill Surgical History.');//Modified by swatih for localization 16/7/2020
            return false;
        }
         else if ($scope.MaleHistory.SurgicalHistoryItem.length <1 &&  $scope.MaleHistory.isSurgicalHistory ==1)
         {            
            AlertMessage.info('Please fill at least one  Surgical History Item.');//Modified by swatih for localization 16/7/2020
            return false;
        }
         else if ($scope.SHistory.length >0){
            
            AlertMessage.info('Please fill Mandatory fields in  Surgical History Item.');//Modified by swatih for localization 16/7/2020
            return false;
        }
        else if($scope.MaleHistory.IsSmoking==null || $scope.MaleHistory.IsSmoking == undefined)
           {
                AlertMessage.info('Please Select Smoking.');//Modified by swatih for localization 16/7/2020
                return false;
           }

           else if($scope.MaleHistory.IsAlcohol==null || $scope.MaleHistory.IsAlcohol == undefined)
           {
                AlertMessage.info('Please Select Alcohol.');//Modified by swatih for localization 16/7/2020
                return false;
           }
           else if($scope.MaleHistory.IsTobacco==null || $scope.MaleHistory.IsTobacco == undefined)
           {
                AlertMessage.info('Please Select Tobacco.');//Modified by swatih for localization 16/7/2020
                return false;
           }
            return true;
        
    }
    $scope.MaleHistoryCancel = function MaleHistoryCancel() {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    }
    $scope.btnClick = function () {
        debugger
       // if (selectPatient.PatientCategoryID == 7) {
            if (selectPatient.GenderID == 1) {
                $rootScope.IsFemaleActive = true;
                $rootScope.IsMaleActive = false;
                selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                selectPatient.Gender = 'Female';
                selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit != null && !angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit)) {
                    selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID
                    selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID
                }
                else {
                    selectPatient.VisitID = null;
                    selectPatient.VisitUnitID = null;
                }
              
                Common.setSelectedPatient(selectPatient);
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {

                    $scope.btnText = 'Male History';
                })
                $rootScope.FormName = 'Female History'
                $scope.Str = '/FemaleHistory/';
                if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                }
                else
                    $location.path($scope.Str);

            }
            else if (selectPatient.GenderID == 2) {
                selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                selectPatient.Gender = 'Male';
                selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.MalePatientName;
                selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID
                Common.setSelectedPatient(selectPatient);
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {

                    $scope.btnText = 'Male History';
                })
                $rootScope.FormName = 'Female History'
                $scope.Str = '/FemaleHistory/';
                if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                }
                else
                    $location.path($scope.Str);
           // }
        }
    }
    //Nevigate visitPopup
    $scope.NevigateVisitPopUP = function (Patient, Redirectto) {
        if (!angular.equals({}, Patient)) {
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
                        if (!angular.equals({}, data)) {  //this scope is executed when particular one visit is selected
                            if (Patient.GenderID == 2) {
                                //for female
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                                response.then(function (resp) {
                                    if (resp.status == 200) {

                                        $scope.selectPatient = {};
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
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                                response.then(function (resp) {

                                    if (resp.status == 200) {
                                        $scope.selectPatient = {};
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

                    if (!angular.equals({}, resp.data)) {
                        if (Patient.GenderID == 2) {
                            //for female
                            if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit != null) {
                                 $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            }
                            else {
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            }
                           
                            var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                            response.then(function (resp) {

                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
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
                            if ($rootScope.CoupleDetails.MalePatient.Selectedvisit != null)
                            {
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;

                            }
                            else {
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            }
                      
                            var response = Common.SetSelectedMalePatient($rootScope.CoupleDetails.MalePatient);
                            response.then(function (resp) {

                                if (resp.status == 200) {
                                    $scope.selectPatient = {};
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
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 310 && lstUserRights[z].Active)//Male History
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 303 && lstUserRights[z].Active)//Female History
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
                }
            }
        }
        if (!$scope.objRgt.IsCreate && (angular.isUndefined($scope.MaleHistory.MHID) || $scope.MaleHistory.MHID == 0)) {
            angular.element(btnSaveMaleHistory).prop('disabled', true);
            angular.element(btnAddPastMedicationHistoryRow).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && $scope.MaleHistory.MHID > 0) {
            angular.element(btnSaveMaleHistory).prop('disabled', true);
            angular.element(btnAddPastMedicationHistoryRow).prop('disabled', true);
        }
        else {
            angular.element(btnSaveMaleHistory).prop('disabled', false);
            angular.element(btnAddPastMedicationHistoryRow).prop('disabled', false);
        }
    }
    $scope.AddSurgicalHistoryRow = function () {
        debugger;
        if ($scope.MaleHistory.SurgicalHistoryItem == null) $scope.MaleHistory.SurgicalHistoryItem = [];
        $scope.MaleHistory.SurgicalHistoryItem.push({
            'TypeOfSurguryID': 0,
            'SurguryDate':new Date(),
            'PerformedAtRemark':'',
            'FindingsRemark':'',
            'Remark': '',
            'SHAttachment':[]
           
        });
    }
    $scope.RemoveSurgicalHistoryRow = function (Index) {
        debugger;
       
        $scope.MaleHistory.SurgicalHistoryItem.splice(Index, 1);
        
    };

    $scope.TypeOfSurguryList = [{ID:0,Description:'Select'},{ID:1,Description:'Simple'},{ID:2,Description:'Complex'}]
});