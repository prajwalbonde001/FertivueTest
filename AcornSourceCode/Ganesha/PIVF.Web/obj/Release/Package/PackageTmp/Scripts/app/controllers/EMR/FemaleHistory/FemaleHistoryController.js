angular.module('PIVF').controller('FemaleHistoryController', function ($rootScope,$timeout, $scope, $filter, $location, FemaleHistoryService, Common, srvCommon, $uibModal, $window, AlertMessage, FemaleComplaintsService, localStorageService, PrescriptionSrv, usSpinnerService) {   //, usSpinnerService, crumble
    /* Global variable declaration */
    $scope.FemaleHistory = {};
    $rootScope.FormName = 'Female History';
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.FemaleHistory.PelvicSurgery = [];
    $scope.FemaleHistory.PelvicSurgery.model = [];
    $scope.FemaleHistory.PelvicSurgeryImages = [];
    $scope.FemaleHistory.Laparoscopy = [];
    $scope.FemaleHistory.Laparoscopy.model = [];
    $scope.FemaleHistory.LaparoscopyImages = [];
    $scope.FemaleHistory.Hysteroscopy = [];
    $scope.FemaleHistory.Hysteroscopy.model = [];
    $scope.FemaleHistory.HysteroscopyImages = [];
    $scope.FemaleHistory.SurgivalOther = [];
    $scope.FemaleHistory.SurgivalOther.model = [];
    $scope.FemaleHistory.SurgivalOtherImages = [];
    $scope.OocyteCleavedList = [];
    $scope.Smoking = [];
    //disable option added by Ashish Sanap
    
    $scope.showPDF=0;
    $scope.EmbryosFrozenList = [];
    $scope.EmbryosTransferredList = [];
    $scope.OocytesFertilizedList = [];
    $scope.FemaleHistory.DrugsNameSelected = [];
    $scope.FemaleHistory.DiseaseRelationSelected = [];
    $scope.FemaleHistory.DiabetesRelationSelected = [];
    $scope.FemaleHistory.HypertensionRelationSelected = [];
    $scope.FemaleHistory.ThyroidDisorderRelationSelected = [];
    $scope.FemaleHistory.MalignancyRelationSelected = [];
    $scope.FemaleHistory.OtherRelationSelected = [];
    $scope.FemaleHistory.FamilyHistoryItem = [];

    /* Global variable for increment dynamic rows */
    $scope.FemaleHistory.ObstetricHistoryItem = [];
    $scope.FemaleHistory.PrevioustTreatmentHistoryItem = [];
    $scope.FemaleHistory.PastMedicationHistoryItem = [];
    $scope.FemaleHistory.SurgicalHistoryItem = [];

    //drug search

    $scope.FavDrug = {};
    $scope.FavDrug.IsBrand = 1; //for brand 
    $scope.FavDrug.IsMolecule = 0;
    $scope.BrandName = 1;
    $scope.MoleculeName = 0;

    $scope.disableOption = function (flag) {
        debugger;
        if (flag == 1) {
            if ($scope.FemaleHistory.CardiacDiseaseID == 0)
                $scope.flag1 =true;
            else
                $scope.flag1 =false;
        }
       else if (flag == 2) {
           if ($scope.FemaleHistory.DiabetesID == 0)
                $scope.flag2 =true;
            else
                $scope.flag2 =false;
        }
       else if (flag == 3) {
           if ($scope.FemaleHistory.ThyroidDisorderID == 0)
                $scope.flag3 = true;
            else
                $scope.flag3 = false;
        }

       else if (flag == 4) {
           if ($scope.FemaleHistory.MalignancyID == 0)
                $scope.flag4 =true;
            else
                $scope.flag4 =false;
       }
       else if (flag == 5) {
           if ($scope.FemaleHistory.TuberculosisID == 0)
                $scope.flag5 =true;
            else
                $scope.flag5 =false;
         }
        else if (flag == 6) {
            if ($scope.FemaleHistory.PelvicInfectionID == 0)
                $scope.flag6 =true;
            else
                $scope.flag6 =false;
        }
        else if (flag == 7) {
            if ($scope.FemaleHistory.BleedingDisordersID == 0)
                $scope.flag7 = true;
            else
                $scope.flag7 =false;
        }
        else if (flag == 8) {
            if ($scope.FemaleHistory.EpilepsyID == 0)
                $scope.flag8 =true;
            else
                $scope.flag8 =false;
        }
        else if (flag == 9) {
            if ($scope.FemaleHistory.HaemoglobinDeficiencyID == 0)
                $scope.flag9 = true;
            else
             $scope.flag9 =false;
        }
        else if (flag == 10) {
            if ($scope.FemaleHistory.RespiratoryID == 0)
                $scope.flag10 = true;
            else
                $scope.flag10 = false;
            }
        else if (flag == 11) {
            if ($scope.FemaleHistory.SLEID == 0)
                $scope.flag11 =true;
            else
                $scope.flag11 =false;
            }
       else if (flag == 12) {
           if ($scope.FemaleHistory.MHOtherDisease == '')
                $scope.flag12 = true;
            else
                $scope.flag12 =false;
        }

        else if (flag == 13) {
           if ($scope.FemaleHistory.IsCovidVaccinationDone == 'No' || $scope.FemaleHistory.IsCovidVaccinationDone== '')
                $scope.flag13 = true;
            else
                $scope.flag13 =false;
                $scope.FemaleHistory.CovidVaccinationDate2 = null;
                $scope.FemaleHistory.CovidVaccinationDate1 = null;
                $scope.FemaleHistory.CovidVaccinationDate3 = null;
        }
        
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
        debugger;
        $scope.SelectedDrug = $model;   //selected drugs details  
        $scope.FemaleHistory.PastMedicationHistoryItem.push({
            "DrugID": $scope.SelectedDrug.ID,
            "DrugeName": $scope.SelectedDrug.Description,
            "Dose": "",
            "TimePeriod": "",
            "CalenderID": 0,
            "Remark": "",
            "enbdsb": true,
            "MedicationStatusID": 0,

        });
        $scope.FavDrug.SelectedDrug = "";
        $scope.FavDrug.SelectedMolecule = "";
        //  $scope.IdDisableMyFlag = true;
        //  $scope.AddFavDrug($scope.FavDrug);
    };


    var UserInfo = localStorageService.get("UserInfo");

    var selectPatient = {};

    selectPatient = Common.getSelectedPatient();
    /* START for Resource */
    var objResource = {};

    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    /*END of Resource*/

    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.open1 = function () {
        $scope.popup1.opened = true;
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

    $scope.open2 = function ($event, Item) {
        $event.preventDefault();
        $event.stopPropagation();
        Item.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.dateOptions2 = {
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };
    $scope.openmonth1 = function () {
       
        $scope.month1.opened =true;
    }
    $scope.month1 = {
          opened: false
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

     $scope.openmonth16 = function () {
       
        $scope.month16.opened =true;
    }
    $scope.month16 = {
          opened: false
    };

      $scope.openmonth17 = function () {
       
        $scope.month17.opened =true;
    }
    $scope.month17 = {
          opened: false
    };

    $scope.openmonth2 = function () {
            
             $scope.month2.opened =true;
    }

    $scope.month2 = {
                 opened: false
    };


    $scope.openmonth3 = function () {
       
        $scope.month3.opened =true;
    }
    $scope.month3 = {
    opened: false
    };

    $scope.openmonth4 = function () {
       
        $scope.month4.opened =true;
        }

    $scope.month4 = {
    opened: false
    };

    $scope.openmonth5 = function () {

        $scope.month5.opened =true;
    }

    $scope.month5 = {
    opened: false
    };



    $scope.open4 = function () {
        $scope.popup4.opened = true;
    };

    $scope.open5 = function () {
        $scope.popup5.opened = true;
    };

    $scope.open6 = function () {
        $scope.popup6.opened = true;
    };

    $scope.open7 = function () {
        $scope.popup7.opened = true;
    };

    $scope.open8 = function () {
        $scope.popup8.opened = true;
    };

    $scope.open9 = function () {
        $scope.popup9.opened = true;
    };

    $scope.open10 = function () {
        $scope.popup10.opened = true;
    };
    $scope.open11 = function () {
        $scope.popup11.opened = true;
    };

    $scope.popup3 = {
        opened: false
    };
    $scope.popup4 = {
        opened: false
    };
    $scope.popup5 = {
        opened: false
    };
    $scope.popup6 = {
        opened: false
    };
    $scope.popup7 = {
        opened: false
    };
    $scope.popup8 = {
        opened: false
    };
    $scope.popup9 = {
        opened: false
    };
    $scope.popup10 = {
        opened: false
    };
    $scope.popup11 = {
        opened: false
    };

    $scope.dateOptions3 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions4 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions5 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions6 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false

    };
    $scope.dateOptions7 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),,
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions8 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions9 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions10 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.dateOptions11 = {
        formatYear: 'yyyy',
        maxDate: new Date(),//new Date(),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.setPopupData = function setPopupData(i) {
     debugger;
        console.log($scope.FemaleHistory.SurgicalHistoryItem[i].SHAttachment);
        $rootScope.fileData = '';
        $rootScope.showPDF = 0;
        var filename = $scope.FemaleHistory.SurgicalHistoryItem[i].SHAttachment[0].name;
        var index = filename.lastIndexOf('.');
        var extn = [filename.slice(0, index), filename.slice(index + 1)];
        var ii = extn.length;
        extn = extn[ii-1];
        if (extn == 'pdf') {
            $rootScope.showPDF = 1;
        }
        $rootScope.fileData = $scope.FemaleHistory.SurgicalHistoryItem[i].SHAttachment[0].preview;
      
}

    /*END : Date*/

    /* Date setting */
    //$scope.FemaleHistory.ATTDate = new Date();
    //$scope.FemaleHistory.HepatitisADate = new Date();
    //$scope.FemaleHistory.ChickenpoxDate = new Date();
    //$scope.FemaleHistory.HepatitisBDate = new Date();
    //$scope.FemaleHistory.InfluenzaDate = new Date();
    //$scope.FemaleHistory.MMRDate = new Date();
    //$scope.FemaleHistory.PolioDate = new Date();
    //$scope.FemaleHistory.TetanusDate = new Date();

    /* START : Attributes for disabling controls */
    $scope.IsAmenorrheaTypeDisabled = true;
    $scope.IsWithdrawlBleedDisabled = true;
    $scope.IsMedicationDisabled = true;
    $scope.IsMethodOfContraceptionEnabled = true;
    $scope.IsDurationEnable = true;           //Added by Nayan Kamble for Ridge on 20/06/2019
    $scope.IsYrEnable = true;                 //Added by Nayan Kamble for Ridge on 20/06/2019
    $scope.IsSexualDysfunctionRemarkEnabled = true;
    $scope.IsDyspareuniaDisabled = true;
    $scope.IsLubricationUsedDisabled = true;
    $scope.IsMenstrualFlowRemarkDisabled = true;
    $scope.IsCardiacDiseaseDisabled = true;
    $scope.IsDiabetesDisabled = true;
    $scope.IsHypertensionDisabled = true;
    $scope.IsThyroidDisorderDisabled = true;
    $scope.IsTuberculosisDisabled = true;
    $scope.IsPelvicInfectionDisabled = true;
    $scope.IsBleedingDisordersDisabled = true;
    $scope.IsMalignancyDisabled = true;
    $scope.IsOtherDisabled = true;
    $scope.IsPelvicSurgeryDisabled = true;
    $scope.IsPelvicSurgeryAttachDisabled = true;
    $scope.IsLaparoscopyDisabled = true;
    $scope.IsLaparoscopyAttachDisabled = true;
    $scope.IsIsHysteroscopyDisabled = true;
    $scope.IsIsHysteroscopyAttachDisabled = true;
    $scope.IsSurgivalOtherDisabled = true;
    $scope.IsSurgivalOtherAttachDisabled = true;
    $scope.IsSmokingDisabled = true;
    $scope.IsAlcoholDisabled = true;
    $scope.IsTobaccoDisabled = true;
    $scope.IsCaffeineAddictionDisabled = true;
    $scope.IsIsDrugAddictionDisabled = true;
    $scope.IsAddictionsOtherDisabled = true;
    $scope.IsFamilyCardiacDiseaseDisabled = true;
    $scope.IsFamilyDiabetesDisabled = true;
    $scope.IsFamilyHypertensionDisabled = true;
    $scope.IsFamilyThyroidDisorderDisabled = true;
    $scope.IsFamilyMalignancyDisabled = true;
    $scope.IsFamilyOtherDisabled = true;
    $scope.IsFreqOfExerciseDisabled = true;
    $scope.IsCaffeinatedBeveragesDisabled = true;
    $scope.IsExposureToHevyMetalsDisabled = true;
    $scope.IsExposureToRadiationDisabled = true;
    debugger
    $scope.IsATTDisabled = true;
    $scope.IsChickenpoxDisabled = true;
    $scope.IsHepatitisADisabled = true;
    $scope.IsHepatitisBDisabled = true;
    $scope.IsInfluenzaDisabled = true;
    $scope.IsMMRDisabled = true;
    $scope.IsPolioDisabled = true;
    $scope.IsTetanusDisabled = true;
    $scope.IsCervicalCancer = true;
    debugger


    $scope.IsPTHYearsDisabled = true;
    $scope.IsPTHCountDisabled = true;
    $scope.IsPTHDrugsDisabled = true;
    $scope.IsPTHOocytesRetrievedDisabled = true;
    $scope.IsPTHOocytesFertilizedDisabled = true;
    $scope.IsPTHEmbryosTransferredDisabled = true;
    $scope.IsPTHOocytesCleavedDisabled = true; //added by rohini
    $scope.IsPTHEmbryosFrozenDisabled = true;
    $scope.IsPTHSucessfulDisabled = true;
    $scope.IsPTHRemarksDisabled = true;
    /* END : Attributes for disabling controls */

    /* Set default values*/
    $scope.FemaleHistory.Gvalue = 0;
    $scope.FemaleHistory.Pvalue = 0;
    $scope.FemaleHistory.Lvalue = 0;
    $scope.FemaleHistory.Avalue = 0;
    $scope.FemaleHistory.Evalue = 0;

    /* Validation */
    $scope.IsGestationWeeksValid = false;
    $scope.IsOutcomeValid = false;
    $scope.IsDrugNameValid = false;
    $scope.IsStatusValid = false;

    $scope.PageSetUp = function PageSetUp() {
        usSpinnerService.spin('GridSpinner');
        console.log($rootScope.CoupleDetails)

       
        debugger;
        $rootScope.Allergies = $rootScope.CoupleDetails.FemalePatient.Allergies;
        if ($rootScope.Allergies != null) {
            if ($rootScope.Allergies.includes("null")) {
                $rootScope.Allergies = '';
            }
        }
        else {
            $rootScope.Allergies = '';
        }
        
        //added by rohini
        if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined)) {
            $scope.IsVisitMarked = false;
            // angular.element(btnSaveUpdateHistory).prop('disabled', false);
        }
        else {
            $scope.IsVisitMarked = true;
            //var ResponseData = FemaleHistoryService.SetAllControls(VID, VUnitID, Prev);

            $scope.viewHistory();
           
        }
        $rootScope.FormName = 'History'
        $scope.FetchCalenderList();
        $scope.FetchMedicationStatusList();
        $scope.FetchConsanguinityList();
        $scope.FetchAgeOfMenarchList();
        $scope.FetchAmmenorheaList();
        $scope.FetchTypeOfSurguryList();
        $scope.FetchAmmenorheaTypeList();
        $scope.FetchWithdrawlBleedList();
        $scope.FetchMedicationList();
        $scope.FetchMenstrualRegularityList();
        $scope.FetchBloodGroupList();
        $scope.FetchMenstrualFlowList();
        $scope.FetchDysmennorheaList();
        $scope.FetchIntermenstrualBleedingList();
        $scope.FetchMarriedLife();
        $scope.FetchContraceptionList();
        $scope.FetchMethodContraceptionList();
        $scope.FetchInfertilityTypeList();
        $scope.FetchFemaleInfertilityList();
        $scope.FetchMaleInfertilityList();
        $scope.FetchFreqOfIntercourseList();
        $scope.FetchSexualDysFunctionList();
        $scope.FetchDyspareuniaList();
        $scope.FetchLubricationUsedList();
        $scope.FetchSTDList();
        $scope.FetchYearsList();
        $scope.FetchGestationWeeksList();
        $scope.FetchOutcomeList();
        $scope.FetchDeliveryTypeList();
        $scope.FetchDeliveryList();
        $scope.FetchTypeOfConceiving();
        $scope.FetchComplicationsList();
        $scope.FetchCongenitalAnamolyList();
        $scope.FetchHistoryOfRecurrentAbortionList();
        $scope.FetchARTCycleList();
        $scope.FetchTreatmentYearsList();
        $scope.FetchTreatmentCountsList();
        $scope.FetchDrugsList();
        $scope.FetchOocytesRetrievedList();
        $scope.FetchPreviousDrugsList();
        $scope.FetchSuccessfulList();
        $scope.FetchMoodList();
        $scope.FetchSleepList();
        $scope.FetchHeadacheORNauseaList();
        $scope.FetchPersonalityList();
        $scope.FetchStressList();
        $scope.FetchExerciseList();
        $scope.FetchFreqOfExerciseList();
        $scope.FetchDietList();
        $scope.FetchCaffeinatedBeveragesList();
        $scope.FetchRelationList();
        $scope.FetchDiabetesRelationList();
        $scope.FetchHypertensionRelationList();
        $scope.FetchThyroidDisorderRelationList();
        $scope.FetchMalignancyRelationList();
        $scope.FetchOnMedication();
        $scope.FetchCardiacDiseaseList();
        $scope.FetchDiabetesList();
        $scope.FetchThyroidDisorderList();
        $scope.FetchMalignancyList();
        $scope.FetchTuberculosisList();
        $scope.FetchPelvicInfectionList();
        $scope.FetchBleedingDisordersList();
        $scope.FetchEpilepsyList();
        $scope.FetchRespiratoryDiseaseList();
        $scope.FetchSLEDiseaseList();
        $scope.FetchIndicationList();
        $scope.FetchSampleTypeList();
        $scope.FetchOHSampleList();

        $scope.FetchHaemoglobinDeficiencyList();

        $scope.FetchOtherRelationList();
        $scope.FetchInRelationSinceYearsList();
        $scope.FetchInRelationSinceMonthsList();
        $scope.FetchTrayingToConvinceYearsList();
        $scope.FetchTrayingToConvinceMonthsList();
        $scope.FetchDurationYearsList();
        $scope.FetchDurationMonthsList();
        $scope.GetMoliculeList();
        $scope.GetDrugList();

        $scope.FetchOocytesFertilizedList(0, 0, 'Load');
        $scope.FetchOocyteCleavedList(0, 0, 'Load');
        $scope.FetchEmbryosTransferredList(0, 0, 'Load');
        $scope.FetchEmbryosFrozenList(0, 0, 0, 'Load');
        $scope.GetUserrights();
        //modified Family History
        $scope.FetchTypeOfDiseaseList();
        $scope.FetchMaternalPaternalList();
        $scope.FetchRelationshipList();
        $scope.FetchLiveStatusList();
        //modified Family History ends here
       
         $timeout(function () {
             $scope.SetAllControls(angular.isDefined(selectPatient.VisitID) ? selectPatient.VisitID : 0, angular.isDefined(selectPatient.VisitUnitID) ? selectPatient.VisitUnitID : 0,1);

    }, 2500);

        usSpinnerService.stop('GridSpinner');
        

    }

    //Start Report 
    $scope.PrintFemaleHistory = function (Item) {
        debugger;
        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + selectPatient.VisitUnitID + '&V=' + 0 + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
        //var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + $rootScope.CoupleDetails.FemalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
        window.open('/Reports/History/Female History/FemaleHistoryWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    //END Report
    $scope.SetAllControls = function SetAllControls(VID, VUnitID,Prev) {   
        debugger;

        usSpinnerService.spin('GridSpinner');

        $scope.lstGender = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Male' }, { ID: 2, Description: 'Female' }];
        
        var ResponseData = FemaleHistoryService.SetAllControls(VID, VUnitID,Prev);
        debugger;
       
        ResponseData.then(function (Response) {
            
            $scope.FemaleHistory = Response.data;
            console.log('Resp ', $scope.FemaleHistory)
            debugger;
            if ($scope.FemaleHistory == null || $scope.FemaleHistory == undefined) {
                if ($scope.IsVisitMarked)
                    angular.element(btnSaveUpdateHistory).prop('disabled', false);
                else angular.element(btnSaveUpdateHistory).prop('disabled', true);

                //if ($scope.IsVisitMarked)
                //    angular.element(btnSaveUpdateHistory).prop('disabled', true);
                //else angular.element(btnSaveUpdateHistory).prop('disabled', false);

                $scope.FemaleHistory = {};
                if ($scope.isObjectEmpty($scope.FemaleHistory) == true) {
                   // $scope.GetLatestLMP(); // trmporary comment for sujata sepreatly add the Lmp date for history
                }

                $scope.FemaleHistory.AgeOfMenarchID = 0;
                $scope.FemaleHistory.InRelationSinceMonthsID = 0;
                $scope.FemaleHistory.TrayingToConvinceYearsID = 0;
                $scope.FemaleHistory.TrayingToConvinceMonthsID = 0;
                $scope.FemaleHistory.DurationYearsID = 0;
                $scope.FemaleHistory.DurationMonthsID = 0;
                $scope.FemaleHistory.Gvalue = 0;
                $scope.FemaleHistory.Pvalue = 0;
                $scope.FemaleHistory.Lvalue = 0;
                $scope.FemaleHistory.Avalue = 0;
                $scope.FemaleHistory.Evalue = 0;
                $scope.FemaleHistory.InRelationSinceYearsID = 0;
                $scope.FemaleHistory.PelvicSurgery = [];
                $scope.FemaleHistory.PelvicSurgery.model = [];
                $scope.FemaleHistory.PelvicSurgeryImages = [];
                $scope.FemaleHistory.Laparoscopy = [];
                $scope.FemaleHistory.Laparoscopy.model = [];
                $scope.FemaleHistory.LaparoscopyImages = [];
                $scope.FemaleHistory.Hysteroscopy = [];
                $scope.FemaleHistory.Hysteroscopy.model = [];
                $scope.FemaleHistory.HysteroscopyImages = [];
                $scope.FemaleHistory.SurgivalOther = [];
                $scope.FemaleHistory.SurgivalOther.model = [];
                $scope.FemaleHistory.SurgivalOtherImages = [];
                $scope.FemaleHistory.DrugsNameSelected = [];

                $scope.FemaleHistory.DiseaseRelationSelected = [];
                $scope.FemaleHistory.DiabetesRelationSelected = [];
                $scope.FemaleHistory.HypertensionRelationSelected = [];
                $scope.FemaleHistory.ThyroidDisorderRelationSelected = [];
                $scope.FemaleHistory.MalignancyRelationSelected = [];
                $scope.FemaleHistory.OtherRelationSelected = [];
                $scope.FemaleHistory.ObstetricHistoryItem = [];
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem = [];
                $scope.FemaleHistory.PastMedicationHistoryItem = [];
                $scope.FemaleHistory.SurgicalHistoryItem=[];

                $scope.FemaleHistory.FamilyHistoryItem = [];
                $scope.FemaleHistory.AmmenID = 0;
                $scope.FemaleHistory.AmmenorheaTypeID = 0;
                $scope.FemaleHistory.MenstrualRegularityID = 0;
                $scope.FemaleHistory.BloodGroupID = 0;
                $scope.FemaleHistory.MFlowID = 0;
                $scope.FemaleHistory.DysmennorheaID = 0;
                $scope.FemaleHistory.IntermBleedID = 0;
                $scope.FemaleHistory.ContraID = 0;
                $scope.FemaleHistory.MarriedLifeID = 0;
                $scope.FemaleHistory.InferTypeID = 0;
                $scope.FemaleHistory.FemaleInfertilityID = 0;
                $scope.FemaleHistory.MaleInfertilityID = 0;
                $scope.FemaleHistory.SexualDysFunctionID = 0;
                $scope.FemaleHistory.DyspareuniaID = 0;
                $scope.FemaleHistory.LubricationUsedID = 0;
                $scope.FemaleHistory.STDID = 0;
                $scope.FemaleHistory.CardiacDiseaseID = 0;
                $scope.flag1 =true;
                
                $scope.FemaleHistory.CardiacDiseaseOnMedication = 0;
                $scope.FemaleHistory.DiabetesOnMedication = 0;
                $scope.FemaleHistory.ThyroidDisorderOnMedication = 0;
                $scope.FemaleHistory.MalignancyOnMedication = 0;
                $scope.FemaleHistory.TuberculosisOnMedication = 0;
                $scope.FemaleHistory.PelvicInfectionOnMedication = 0;
                $scope.FemaleHistory.BleedingDisordersOnMedication = 0;
                $scope.FemaleHistory.EpilepsyOnMedication = 0;
                $scope.FemaleHistory.HaemoglobinDeficiencyOnMedication = 0;
                $scope.FemaleHistory.MHOtherDiseaseOnMedication = 0;
                $scope.FemaleHistory.RespiratoryOnMedication = 0;
                $scope.FemaleHistory.SLEOnMedication = 0;

                $scope.FemaleHistory.DiabetesID = 0;
                  $scope.flag2 =true;
                  $scope.FemaleHistory.ThyroidDisorderID = 0;
                $scope.flag3 = true;
                $scope.FemaleHistory.MalignancyID = 0;
                   $scope.flag4 =true;
                   $scope.FemaleHistory.TuberculosisID = 0;
                   $scope.flag5 = true;
                   $scope.FemaleHistory.PelvicInfectionID = 0;
                 $scope.flag6 =true;
                 $scope.FemaleHistory.BleedingDisordersID = 0;
                $scope.flag7 = true;
                $scope.FemaleHistory.EpilepsyID = 0;
                $scope.flag8 =true;
                $scope.FemaleHistory.RespiratoryID = 0;
                   $scope.flag10 = true;
                $scope.FemaleHistory.IndicationID = 0;
                $scope.FemaleHistory.SampleTypeID = 0;
                $scope.FemaleHistory.OHSampleID = 0;
                $scope.FemaleHistory.SLEID = 0;
                $scope.flag11 = true;
                   $scope.flag12 = true;
                $scope.FemaleHistory.HaemoglobinDeficiencyID = 0;
                  $scope.flag9 = true;
                $scope.FemaleHistory.FreqOIID = 0;

                $scope.FemaleHistory.DiabetesSinceWhenYr = 0;
                $scope.FemaleHistory.ThyroidDisorderSinceWhenYr = 0;
               
                $scope.FemaleHistory.DiabetesSinceWhenMnth = 0;
                $scope.FemaleHistory.ThyroidDisorderSinceWhenMnth = 0;
                $scope.FemaleHistory.EpilepsySinceWhenMnth = 0;
                $scope.FemaleHistory.EpilepsySinceWhenYr = 0;

                $scope.FemaleHistory.MHOtherDiseaseWhenMnth = 0;
                $scope.FemaleHistory.MHOtherDiseaseWhenYr = 0;

                $scope.FemaleHistory.CardSinceWhenMnth = null;
                $scope.FemaleHistory.MalignancySinceWhenMnth = null;
                $scope.FemaleHistory.TuberculosisSinceWhenMnth  = null;
                $scope.FemaleHistory.PelvicInfectionSinceWhenMnth   = null;
                $scope.FemaleHistory.BleedingDisordersSinceWhenMnth = null;
              

               // $scope.FemaleHistory.MalignancySinceWhenMnth = 0;
                $scope.FemaleHistory.MalignancySinceWhenYr = 0;
                
               // $scope.FemaleHistory.TuberculosisSinceWhenMnth = 0;
                $scope.FemaleHistory.TuberculosisSinceWhenYr = 0;
                
               // $scope.FemaleHistory.PelvicInfectionSinceWhenMnth = 0;
                $scope.FemaleHistory.PelvicInfectionSinceWhenYr = 0;
                
               // $scope.FemaleHistory.BleedingDisordersSinceWhenMnth = 0;
                $scope.FemaleHistory.BleedingDisordersSinceWhenYr = 0;
            }
            debugger;
            if ($scope.FemaleHistory.MHOtherDisease == '') {
                $scope.flag12 =true;
        }
            if (!angular.isUndefined($scope.FemaleHistory) && $scope.FemaleHistory != null) {
               /* commented by ashish for saving data against current selected visit
                if (angular.isDefined($scope.FemaleHistory.AddedDateTime)) {
                    if ($filter('date')(new Date($scope.FemaleHistory.AddedDateTime), 'dd-MMM-yyyy') == $filter('date')(new Date(), 'dd-MMM-yyyy')) {
                        $scope.isTodayDate = true;
                        if ($scope.isTodayDate)
                            angular.element(btnSaveUpdateHistory).prop('disabled', false);
                    }
                    else {
                        $scope.isTodayDate = false;
                        if (!$scope.isTodayDate)
                            angular.element(btnSaveUpdateHistory).prop('disabled', true);
                    }
                }*/
                debugger;
                if (selectPatient.VisitID > $scope.FemaleHistory.VisitID && Prev == 1) {
                    debugger;
                     $scope.isTodayDate = false;
                        if ($scope.isTodayDate)
                            //angular.element(btnSaveUpdateHistory).prop('disabled', false);   //cross clinic commented for queue to pateint go for sujata
                            angular.element(btnSaveUpdateHistory).prop('disabled', true);          //add cross clinic commented for queue to pateint go for sujata
                       // $scope.FemaleHistory.FHID =null;
                }
                else if(selectPatient.VisitID == $scope.FemaleHistory.VisitID && Prev==1){
                     $scope.isTodayDate = true;
                }
                else if (Prev == 0) {
                    angular.element(btnSaveUpdateHistory).prop('disabled', true);
                          $scope.isTodayDate = true;
                }




                //if ($rootScope.CoupleDetails.FemalePatient.Allergies != "" && $rootScope.CoupleDetails.FemalePatient.Allergies != null)
                //    $rootScope.Allergies = $rootScope.CoupleDetails.FemalePatient.Allergies;
                //else {
                //    $rootScope.Allergies = '';
                //}
                //if ($rootScope.Allergies != null)
                //{
                //    if ($rootScope.Allergies.includes("null")) {
                        
                //    }
                //}
                //else {
                //    $rootScope.Allergies = '';
                //}
               

                if (angular.isDefined($scope.FemaleHistory.LMPDate) && $filter('date')(new Date($scope.FemaleHistory.LMPDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
                    //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
                } else {
                    $scope.FemaleHistory.LMPDate = null;
                }
                if (angular.isDefined($scope.FemaleHistory.ChickenpoxDate) && $filter('date')(new Date($scope.FemaleHistory.ChickenpoxDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.ChickenpoxDate = new Date($scope.FemaleHistory.ChickenpoxDate);
                } else {
                    $scope.FemaleHistory.ChickenpoxDate = null;
                }

                if (angular.isDefined($scope.FemaleHistory.ATTDate) && $filter('date')(new Date($scope.FemaleHistory.ATTDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.ATTDate = new Date($scope.FemaleHistory.ATTDate);
                } else {
                    $scope.FemaleHistory.ATTDate = null;
                }
                if (angular.isDefined($scope.FemaleHistory.CardSinceWhenMnth) && $filter('date')(new Date($scope.FemaleHistory.CardSinceWhenMnth), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.CardSinceWhenMnth = new Date($scope.FemaleHistory.CardSinceWhenMnth);
                    } else {
                    $scope.FemaleHistory.CardSinceWhenMnth = null;
                }

                
                if (angular.isDefined($scope.FemaleHistory.SmearTestDate) && $filter('date')(new Date($scope.FemaleHistory.SmearTestDate), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.SmearTestDate = new Date($scope.FemaleHistory.SmearTestDate);
                    } else {
                    $scope.FemaleHistory.SmearTestDate = null;
                }

                if (angular.isDefined($scope.FemaleHistory.RubbelaTestDate) && $filter('date')(new Date($scope.FemaleHistory.RubbelaTestDate), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.RubbelaTestDate = new Date($scope.FemaleHistory.RubbelaTestDate);
                    } else {
                    $scope.FemaleHistory.RubbelaTestDate = null;
                }

                if($scope.FemaleHistory.IsCovidVaccinationDone)
                {
                    $scope.FemaleHistory.IsCovidVaccinationDone = $scope.FemaleHistory.IsCovidVaccinationDone;
                    if (angular.isDefined($scope.FemaleHistory.CovidVaccinationDate1) && $filter('date')(new Date($scope.FemaleHistory.CovidVaccinationDate1), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.CovidVaccinationDate1 = new Date($scope.FemaleHistory.CovidVaccinationDate1);
                    } else {
                    $scope.FemaleHistory.CovidVaccinationDate1 = null;
                }

                 if (angular.isDefined($scope.FemaleHistory.CovidVaccinationDate2) && $filter('date')(new Date($scope.FemaleHistory.CovidVaccinationDate2), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.CovidVaccinationDate2 = new Date($scope.FemaleHistory.CovidVaccinationDate2);
                    } else {
                    $scope.FemaleHistory.CovidVaccinationDate2 = null;
                }

                 if (angular.isDefined($scope.FemaleHistory.CovidVaccinationDate3) && $filter('date')(new Date($scope.FemaleHistory.CovidVaccinationDate3), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.CovidVaccinationDate3 = new Date($scope.FemaleHistory.CovidVaccinationDate3);
                    } else {
                    $scope.FemaleHistory.CovidVaccinationDate3 = null;
                    }
                    $scope.flag13 =true;
                }
                else
                {
                    $scope.FemaleHistory.IsCovidVaccinationDone = "Yes";
                    $scope.flag13 =false;
                    $scope.FemaleHistory.CovidVaccinationDate1 = null;
                    $scope.FemaleHistory.CovidVaccinationDate2 = null;
                    $scope.FemaleHistory.CovidVaccinationDate3 = null;
                }

                
                if (angular.isDefined($scope.FemaleHistory.MalignancySinceWhenMnth) && $filter('date')(new Date($scope.FemaleHistory.MalignancySinceWhenMnth), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.MalignancySinceWhenMnth = new Date($scope.FemaleHistory.MalignancySinceWhenMnth);
                    } else {
                    $scope.FemaleHistory.MalignancySinceWhenMnth = null;
                 }

                if (angular.isDefined($scope.FemaleHistory.TuberculosisSinceWhenMnth) && $filter('date')(new Date($scope.FemaleHistory.TuberculosisSinceWhenMnth), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.TuberculosisSinceWhenMnth = new Date($scope.FemaleHistory.TuberculosisSinceWhenMnth);
                 } else {
                    $scope.FemaleHistory.TuberculosisSinceWhenMnth = null;
            }

                if (angular.isDefined($scope.FemaleHistory.PelvicInfectionSinceWhenMnth) && $filter('date')(new Date($scope.FemaleHistory.PelvicInfectionSinceWhenMnth), 'dd-MMM-yyyy') != $filter('date') ('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.PelvicInfectionSinceWhenMnth = new Date($scope.FemaleHistory.PelvicInfectionSinceWhenMnth);
                 } else {
                    $scope.FemaleHistory.PelvicInfectionSinceWhenMnth = null;
                 }

                if (angular.isDefined($scope.FemaleHistory.BleedingDisordersSinceWhenMnth) && $filter('date')(new Date($scope.FemaleHistory.BleedingDisordersSinceWhenMnth), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.BleedingDisordersSinceWhenMnth = new Date($scope.FemaleHistory.BleedingDisordersSinceWhenMnth);
                 } else {
                    $scope.FemaleHistory.BleedingDisordersSinceWhenMnth = null;
                 }


                if (angular.isDefined($scope.FemaleHistory.HepatitisADate) && $filter('date')(new Date($scope.FemaleHistory.HepatitisADate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.HepatitisADate = new Date($scope.FemaleHistory.HepatitisADate);
                } else {
                    $scope.FemaleHistory.HepatitisADate = null;
                }
                if (angular.isDefined($scope.FemaleHistory.HepatitisBDate) && $filter('date')(new Date($scope.FemaleHistory.HepatitisBDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.HepatitisBDate = new Date($scope.FemaleHistory.HepatitisBDate);
                } else {
                    $scope.FemaleHistory.HepatitisBDate = null;
                }
                if (angular.isDefined($scope.FemaleHistory.InfluenzaDate) && $filter('date')(new Date($scope.FemaleHistory.InfluenzaDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.InfluenzaDate = new Date($scope.FemaleHistory.InfluenzaDate);
                } else {
                    $scope.FemaleHistory.InfluenzaDate = null;
                }
                if (angular.isDefined($scope.FemaleHistory.MMRDate) && $filter('date')(new Date($scope.FemaleHistory.MMRDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.MMRDate = new Date($scope.FemaleHistory.MMRDate);
                } else {
                    $scope.FemaleHistory.MMRDate = null;
                }
                if (angular.isDefined($scope.FemaleHistory.PolioDate) && $filter('date')(new Date($scope.FemaleHistory.PolioDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.PolioDate = new Date($scope.FemaleHistory.PolioDate);
                } else {
                    $scope.FemaleHistory.PolioDate = null;
                }
                if (angular.isDefined($scope.FemaleHistory.TetanusDate) && $filter('date')(new Date($scope.FemaleHistory.TetanusDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.TetanusDate = new Date($scope.FemaleHistory.TetanusDate);
                } else {
                    $scope.FemaleHistory.TetanusDate = null;
                }
                if (angular.isDefined($scope.FemaleHistory.CervicalCancerDate) && $filter('date')(new Date($scope.FemaleHistory.CervicalCancerDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                    $scope.FemaleHistory.CervicalCancerDate = new Date($scope.FemaleHistory.CervicalCancerDate);
                } else {
                    $scope.FemaleHistory.CervicalCancerDate = null;
                }
                
                angular.forEach($scope.FemaleHistory.SurgicalHistoryItem,function(item){
                    if (angular.isDefined(item.SurguryDate) && $filter('date')(new Date(item.SurguryDate), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy')) {
                        item.SurguryDate = new Date(item.SurguryDate);
                    } else {
                        item.SurguryDate = null;
                    }
                })

                if (!angular.isUndefined($scope.FemaleHistory.ObstetricHistoryItem) && $scope.FemaleHistory.ObstetricHistoryItem.length == 0) {
                    $scope.AddObstetricHistoryRow();
                }
                else {
                    angular.forEach($scope.FemaleHistory.ObstetricHistoryItem, function (x) {
                        x.DateOfAbortion = $filter('date')(new Date(x.DateOfAbortion), 'dd-MMM-yyyy') != $filter('date')('1970-01-01', 'dd-MMM-yyyy') ? new Date(x.DateOfAbortion) : null;
                    })
                }
                if (!angular.isUndefined($scope.FemaleHistory.PrevioustTreatmentHistoryItem) && $scope.FemaleHistory.PrevioustTreatmentHistoryItem.length == 0) {
                    $scope.AddPrevioustTreatmentHistoryRow();
                    debugger;
                } else {
                    angular.forEach($scope.FemaleHistory.PrevioustTreatmentHistoryItem, function (Item, Index) {
                        debugger;
                        if (!angular.isUndefined(Item.OocytesRetrievedID)) {
                            $scope.FetchOocytesFertilizedList(Item.OocytesRetrievedID, Index, 'Event');
                        }
                        if (!angular.isUndefined(Item.OocytesFertilizedID)) {
                            $scope.FetchOocyteCleavedList(Item.OocytesFertilizedID, Index, 'Event');
                        }
                        if (!angular.isUndefined(Item.OocytesCleavedID)) {
                            $scope.FetchEmbryosTransferredList(Item.OocytesCleavedID, Index, 'Event');
                            debugger;
                            $scope.FetchEmbryosFrozenList(Item.OocytesCleavedID, Item.EmbryosTransferredID, Index, 'Event');
                        }
                    });
                }
                if (!angular.isUndefined($scope.FemaleHistory.PastMedicationHistoryItem) && $scope.FemaleHistory.PastMedicationHistoryItem.length == 0) {
                    // $scope.AddPastMedicationHistoryRow();
                }

                //multiselect box setting
                if (!angular.isUndefined($scope.DiseaseRelationList) && !angular.isUndefined($scope.FemaleHistory.FamilyCardiacDiseaseIds)) {
                    angular.forEach($scope.FemaleHistory.FamilyCardiacDiseaseIds.split(','), function (i) {

                        //$scope.DiseaseRelationList[$scope.DiseaseRelationList.findIndex(x=>x.ID == i)].ticked = true;

                        for (var j = 0; j <= $scope.DiseaseRelationList.length - 1; j++) {
                            if ($scope.DiseaseRelationList[j].ID == i) {
                                $scope.DiseaseRelationList[j].ticked = true;
                                break;
                            }
                        }
                    });
                }
                if (!angular.isUndefined($scope.DiabetesRelationList) && !angular.isUndefined($scope.FemaleHistory.FamilyDiabetesOtherIds)) {
                    angular.forEach($scope.FemaleHistory.FamilyDiabetesOtherIds.split(','), function (i) {

                        // $scope.DiabetesRelationList[$scope.DiabetesRelationList.findIndex(x=>x.ID == i)].ticked = true;
                        for (var j = 0; j <= $scope.DiabetesRelationList.length - 1; j++) {
                            if ($scope.DiabetesRelationList[j].ID == i) {
                                $scope.DiabetesRelationList[j].ticked = true;
                                break;
                            }
                        }
                    });
                }
                if (!angular.isUndefined($scope.HypertensionRelationList) && !angular.isUndefined($scope.FemaleHistory.FamilyHypertensionIds)) {
                    angular.forEach($scope.FemaleHistory.FamilyHypertensionIds.split(','), function (i) {

                        //$scope.HypertensionRelationList[$scope.HypertensionRelationList.findIndex(x=>x.ID == i)].ticked = true;
                        for (var j = 0; j <= $scope.HypertensionRelationList.length - 1; j++) {
                            if ($scope.HypertensionRelationList[j].ID == i) {
                                $scope.HypertensionRelationList[j].ticked = true;
                                break;
                            }
                        }
                    });
                }
                if (!angular.isUndefined($scope.ThyroidDisorderRelationList) && !angular.isUndefined($scope.FemaleHistory.FamilyThyroidDisorderIds)) {
                    angular.forEach($scope.FemaleHistory.FamilyThyroidDisorderIds.split(','), function (i) {

                        // $scope.ThyroidDisorderRelationList[$scope.ThyroidDisorderRelationList.findIndex(x=>x.ID == i)].ticked = true;
                        for (var j = 0; j <= $scope.ThyroidDisorderRelationList.length - 1; j++) {
                            if ($scope.ThyroidDisorderRelationList[j].ID == i) {
                                $scope.ThyroidDisorderRelationList[j].ticked = true;
                                break;
                            }
                        }
                    });
                }
                if (!angular.isUndefined($scope.MalignancyRelationList) && !angular.isUndefined($scope.FemaleHistory.FamilyMalignancyIds)) {
                    angular.forEach($scope.FemaleHistory.FamilyMalignancyIds.split(','), function (i) {

                        //$scope.MalignancyRelationList[$scope.MalignancyRelationList.findIndex(x=>x.ID == i)].ticked = true;

                        for (var j = 0; j <= $scope.MalignancyRelationList.length - 1; j++) {
                            if ($scope.MalignancyRelationList[j].ID == i) {
                                $scope.MalignancyRelationList[j].ticked = true;
                                break;
                            }
                        }
                    });
                }
                if (!angular.isUndefined($scope.OtherRelationList) && !angular.isUndefined($scope.FemaleHistory.FamilyOtherRemarkIds)) {
                    angular.forEach($scope.FemaleHistory.FamilyOtherRemarkIds.split(','), function (i) {

                        //$scope.OtherRelationList[$scope.OtherRelationList.findIndex(x=>x.ID == i)].ticked = true;
                        for (var j = 0; j <= $scope.OtherRelationList.length - 1; j++) {
                            if ($scope.OtherRelationList[j].ID == i) {
                                $scope.OtherRelationList[j].ticked = true;
                                break;
                            }
                        }
                    });
                }
                if (!angular.isUndefined($scope.DrugsNameList) && !angular.isUndefined($scope.FemaleHistory.AllergiesDrugIds) && $scope.FemaleHistory.AllergiesDrugIds != null) {
                    angular.forEach($scope.FemaleHistory.AllergiesDrugIds.split(','), function (i) {

                        //$scope.DrugsNameList[$scope.DrugsNameList.findIndex(x=>x.ID == i)].ticked = true;
                        for (var j = 0; j <= $scope.DrugsNameList.length - 1; j++) {
                            if ($scope.DrugsNameList[j].ID == i) {
                                $scope.DrugsNameList[j].ticked = true;
                                break;
                            }
                        }
                    });
                }
               // $scope.FemaleHistory.CardSinceWhenMnth = "1909-02-01"

                $scope.ARTCycleChangeEvent();
                $scope.CalculateGvalue();
                $scope.CalculatePvalue();
                $scope.ChangedAmmenorheaEvent();
                $scope.MethodOfContraceptionEnabled();
                $scope.SexualDysfunctionChaned();
                $scope.DyspareuniaChanged();
                $scope.LubricationUsedChanged();
                $scope.MenstrualFlowChanged();
                $scope.FetchDurationYearsList();
                $scope.FetchDurationMonthsList();

                //$scope.MedicalHistoryChangedEvents('1', $scope.FemaleHistory.IsCardiacDisease);
                //  $scope.MedicalHistoryChangedEvents('2', $scope.FemaleHistory.IsDiabetes);
                //  $scope.MedicalHistoryChangedEvents('3', $scope.FemaleHistory.IsHypertension);
                //  $scope.MedicalHistoryChangedEvents('4', $scope.FemaleHistory.IsThyroidDisorder);
                //   $scope.MedicalHistoryChangedEvents('5', $scope.FemaleHistory.IsTuberculosis);
                //   $scope.MedicalHistoryChangedEvents('6', $scope.FemaleHistory.IsPelvicInfection);
                //   $scope.MedicalHistoryChangedEvents('7', $scope.FemaleHistory.IsBleedingDisorders);
                //    $scope.MedicalHistoryChangedEvents('8', $scope.FemaleHistory.IsMalignancy);
                //    $scope.MedicalHistoryChangedEvents('9', $scope.FemaleHistory.IsOther);
                //Family History
                $scope.SurgicalHistoryChangedEvents('1', $scope.FemaleHistory.IsPelvicSurgery);
                $scope.SurgicalHistoryChangedEvents('2', $scope.FemaleHistory.IsLaparoscopy);
                $scope.SurgicalHistoryChangedEvents('3', $scope.FemaleHistory.IsHysteroscopy);
                $scope.SurgicalHistoryChangedEvents('4', $scope.FemaleHistory.IsSurgivalOther);

                //Pelvic Surgery
                $scope.AddictionsHistoryChangedEvents('1', $scope.FemaleHistory.IsSmoking);
                $scope.AddictionsHistoryChangedEvents('2', $scope.FemaleHistory.IsAlcohol);
                $scope.AddictionsHistoryChangedEvents('3', $scope.FemaleHistory.IsTobacco);
                $scope.AddictionsHistoryChangedEvents('5', $scope.FemaleHistory.IsDrugAddiction);
                $scope.AddictionsHistoryChangedEvents('6', $scope.FemaleHistory.IsCaffeineAddiction);
                $scope.AddictionsHistoryChangedEvents('4', $scope.FemaleHistory.IsAddictionsOther);

                $scope.FamilyHistoryChangedEvents('1', $scope.FemaleHistory.IsFamilyCardiacDisease);
                $scope.FamilyHistoryChangedEvents('2', $scope.FemaleHistory.IsFamilyDiabetesOther);
                $scope.FamilyHistoryChangedEvents('3', $scope.FemaleHistory.IsFamilyHypertension);
                $scope.FamilyHistoryChangedEvents('4', $scope.FemaleHistory.IsFamilyThyroidDisorder);
                $scope.FamilyHistoryChangedEvents('5', $scope.FemaleHistory.IsFamilyMalignancy);
                $scope.FamilyHistoryChangedEvents('6', $scope.FemaleHistory.IsFamilyOther);
                //vaccination 
                $scope.FamilyHistoryVaccinationEvents('1', $scope.FemaleHistory.IsATT);
                $scope.FamilyHistoryVaccinationEvents('2', $scope.FemaleHistory.IsChickenpox);
                $scope.FamilyHistoryVaccinationEvents('3', $scope.FemaleHistory.IsHepatitisA);
                $scope.FamilyHistoryVaccinationEvents('4', $scope.FemaleHistory.IsHepatitisB);
                $scope.FamilyHistoryVaccinationEvents('5', $scope.FemaleHistory.IsInfluenza);
                $scope.FamilyHistoryVaccinationEvents('6', $scope.FemaleHistory.IsMMR);
                $scope.FamilyHistoryVaccinationEvents('7', $scope.FemaleHistory.IsPolio);
                $scope.FamilyHistoryVaccinationEvents('8', $scope.FemaleHistory.IsTetanus);
                $scope.FamilyHistoryVaccinationEvents('9', $scope.FemaleHistory.IsCervicalCancer);
                $scope.FamilyHistoryVaccinationEvents('16', $scope.FemaleHistory.IsRubbelaTestDone);
                $scope.FamilyHistoryVaccinationEvents('17', $scope.FemaleHistory.IsSmearTestDone);

                $scope.isRubellatestDisabled = true;
                $scope.isSmeartestDisabled = true;
                $scope.SocialExerciseChanged();
                $scope.CaffeinatedBeveragesChanged();
                $scope.ExposureToHevyMetalsChanged();
                $scope.ExposureToRadiationChanged();
                if (angular.isDefined($scope.FemaleHistory.lstAllergyDetail)) {
                    if ($scope.FemaleHistory.lstAllergyDetail.length > 0) {
                        $scope.FemaleHistory.lstAllergyDetail.forEach(function (x) {
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
                console.log($scope.FemaleHistory.lstAllergyDetail);

                $scope.foodlstYesNo = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Present' }, { ID: 2, Description: 'Absent' }];
                $scope.foodlstYr = $scope.MainDurationYearsList;
                $scope.foodlstMnth = $scope.DurationMonthsList;
                $scope.DiabeteslstYr = $scope.MainDurationYearsList;
                $scope.DiabeteslstMnth = $scope.DurationMonthsList;
                $scope.ThyroidDisorderlstMnth = $scope.DurationMonthsList;
                $scope.ThyroidDisorderlstYr = $scope.MainDurationYearsList;
                $scope.EpilepsylstMnth = $scope.DurationMonthsList;
                $scope.EpilepsylstYr = $scope.MainDurationYearsList;
                $scope.MHOtherDiseaselstMnth = $scope.DurationMonthsList;
                $scope.MHOtherDiseaselstYr = $scope.MainDurationYearsList;

                $scope.SLElstMnth = $scope.DurationMonthsList;
                $scope.RespiratorylstMnth = $scope.MainDurationYearsList;

                $scope.RespiratorylstYr = $scope.MainDurationYearsList;
                $scope.SLElstYr = $scope.MainDurationYearsList;

                //added by neena
                $scope.CardlstMnth = $scope.DurationMonthsList;
                $scope.CardlstYr = $scope.MainDurationYearsList;

                $scope.MalignancylstMnth = $scope.DurationMonthsList;
                $scope.MalignancylstYr = $scope.MainDurationYearsList;

                $scope.TuberculosislstMnth = $scope.DurationMonthsList;
                $scope.TuberculosislstYr = $scope.MainDurationYearsList;

                $scope.PelvicInfectionlstMnth = $scope.DurationMonthsList;
                $scope.PelvicInfectionlstYr = $scope.MainDurationYearsList;

                $scope.BleedingDisorderslstMnth = $scope.DurationMonthsList;
                $scope.BleedingDisorderslstYr = $scope.MainDurationYearsList;

                //

                $scope.foodlstSeverity = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Mild' }, { ID: 2, Description: 'Moderate' }, { ID: 3, Description: 'Severe' }];

              //  $scope.smokelstYesNo = angular.copy($scope.foodlstYesNo);
             //   $scope.skinlstYesNo = angular.copy($scope.foodlstYesNo);
                $scope.latexlstYesNo = angular.copy($scope.foodlstYesNo);

                $scope.smokelstYr = angular.copy($scope.MainDurationYearsList);
                $scope.skinlstYr = angular.copy($scope.MainDurationYearsList);
                $scope.latexlstYr = angular.copy($scope.MainDurationYearsList);

                $scope.lstAddYesNo = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Yes' }, { ID: 2, Description: 'No' }];

                $scope.smokelstMnth = angular.copy($scope.DurationMonthsList);
                $scope.skinlstMnth = angular.copy($scope.DurationMonthsList);
                $scope.latexlstMnth = angular.copy($scope.DurationMonthsList);

                $scope.smokelstSeverity = angular.copy($scope.foodlstSeverity);
                $scope.skinlstSeverity = angular.copy($scope.foodlstSeverity);
                $scope.latexlstSeverity = angular.copy($scope.foodlstSeverity);

                //$scope.foodAllergy = {};
                //$scope.skinAllergy = {};
                //$scope.smokeAllergy = {};
                //$scope.latexAllergy = {};
                //mayur
                $scope.Diabetes = {};
                $scope.ThyroidDisorder = {};
                $scope.Epilepsy = {};
                //mayur
                //$scope.foodAllergy.currStatus = 0;
                //$scope.skinAllergy.currStatus = 0;
                //$scope.smokeAllergy.currStatus = 0;
                //$scope.latexAllergy.currStatus = 0;

                //$scope.foodAllergy.AlleSinceYr = 0;
                //$scope.skinAllergy.AlleSinceYr = 0;
                //$scope.smokeAllergy.AlleSinceYr = 0;
                //$scope.latexAllergy.AlleSinceYr = 0;

                //$scope.foodAllergy.AlleSinceMnth = 0;
                //$scope.skinAllergy.AlleSinceMnth = 0;
                //$scope.smokeAllergy.AlleSinceMnth = 0;
                //$scope.latexAllergy.AlleSinceMnth = 0;

                //$scope.foodAllergy.SeverityID = 0;
                //$scope.skinAllergy.SeverityID = 0;
                //$scope.smokeAllergy.SeverityID = 0;
                //$scope.latexAllergy.SeverityID = 0;

                //$scope.foodAllergy.SinceWhenYr = 0;
                //$scope.skinAllergy.SinceWhenYr = 0;
                //$scope.smokeAllergy.SinceWhenYr = 0;
                //$scope.latexAllergy.SinceWhenYr = 0;

                //$scope.foodAllergy.SinceWhenMnth = 0;
                //$scope.skinAllergy.SinceWhenMnth = 0;
                //$scope.smokeAllergy.SinceWhenMnth = 0;
                //$scope.latexAllergy.SinceWhenMnth = 0;


                // for Addiction
                $scope.Smoking = {};
                $scope.Alcohol = {};
                $scope.Tobaco = {};
                $scope.DrugAddiction = {};
                $scope.CaffeineAddiction = {};
                $scope.lstFreq = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Regular' }, { ID: 2, Description: 'Irregular' }, { ID: 3, Description: 'occasional' }];
                $scope.lstAddCurrStatus = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Yes' }, { ID: 2, Description: 'No' }, { ID: 2, Description: 'Currently No' }];

                if (angular.isDefined($scope.FemaleHistory.lstAdictionDetail)) {
                    $scope.Smoking = $scope.FemaleHistory.lstAdictionDetail[0];
                    $scope.Alcohol = $scope.FemaleHistory.lstAdictionDetail[1];
                    $scope.Tobaco = $scope.FemaleHistory.lstAdictionDetail[2];
                    $scope.DrugAddiction = $scope.FemaleHistory.lstAdictionDetail[3];
                    $scope.CaffeineAddiction = $scope.FemaleHistory.lstAdictionDetail[4];
                }
                if (angular.isUndefined($scope.Smoking)) $scope.Smoking = {};
                if (angular.isUndefined($scope.Alcohol)) $scope.Alcohol = {};
                if (angular.isUndefined($scope.Tobaco)) $scope.Tobaco = {};
                if (angular.isUndefined($scope.CaffeineAddiction)) $scope.CaffeineAddiction = {};
                if (angular.isUndefined($scope.DrugAddiction)) $scope.DrugAddiction = {};

                if (angular.isUndefined($scope.Smoking.currStatus))
                    $scope.Smoking.currStatus = 0;
                if (angular.isUndefined($scope.Smoking.SinceWhenYr))
                    $scope.Smoking.SinceWhenYr = 0;
                if (angular.isUndefined($scope.Smoking.SinceWhenMnth))
                    $scope.Smoking.SinceWhenMnth = 0;

                if (angular.isUndefined($scope.Alcohol.currStatus))
                    $scope.Alcohol.currStatus = 0;
                if (angular.isUndefined($scope.Alcohol.SinceWhenYr))
                    $scope.Alcohol.SinceWhenYr = 0;
                if (angular.isUndefined($scope.Alcohol.FrequencyID))
                    $scope.Alcohol.FrequencyID = 0;
                if (angular.isUndefined($scope.Smoking.FrequencyID))
                    $scope.Smoking.FrequencyID = 0;
                if (angular.isUndefined($scope.Tobaco.FrequencyID))
                    $scope.Tobaco.FrequencyID = 0;
                if (angular.isUndefined($scope.DrugAddiction.FrequencyID))
                    $scope.DrugAddiction.FrequencyID = 0;
                if (angular.isUndefined($scope.CaffeineAddiction.FrequencyID))
                    $scope.CaffeineAddiction.FrequencyID = 0;


                if (angular.isUndefined($scope.Alcohol.SinceWhenMnth))
                    $scope.Alcohol.SinceWhenMnth = 0;

                if (angular.isUndefined($scope.Tobaco.currStatus))
                    $scope.Tobaco.currStatus = 0;
                if (angular.isUndefined($scope.Tobaco.SinceWhenYr))
                    $scope.Tobaco.SinceWhenYr = 0;
                if (angular.isUndefined($scope.Tobaco.SinceWhenMnth))
                    $scope.Tobaco.SinceWhenMnth = 0;
                if (angular.isUndefined($scope.DrugAddiction.currStatus))
                    $scope.DrugAddiction.currStatus = 0;
                if (angular.isUndefined($scope.DrugAddiction.SinceWhenYr))
                    $scope.DrugAddiction.SinceWhenYr = 0;
                if (angular.isUndefined($scope.DrugAddiction.SinceWhenMnth))
                    $scope.DrugAddiction.SinceWhenMnth = 0;
                if (angular.isUndefined($scope.CaffeineAddiction.currStatus))
                    $scope.CaffeineAddiction.currStatus = 0;
                if (angular.isUndefined($scope.CaffeineAddiction.SinceWhenYr))
                    $scope.CaffeineAddiction.SinceWhenYr = 0;
                if (angular.isUndefined($scope.CaffeineAddiction.SinceWhenMnth))
                    $scope.CaffeineAddiction.SinceWhenMnth = 0;

                
                //End
                debugger;
                //console.log("Idd ", $scope.FemaleHistory.InRelationSinceYearsID);
                $scope.UpdateTrayingToConvince($scope.FemaleHistory.InRelationSinceYearsID)
                if (angular.isDefined($scope.FemaleHistory.lstAllergyDetail)) {
                    $scope.lstDrugAllergy = $filter('filter')($scope.FemaleHistory.lstAllergyDetail, { IsAllergy: true }, true);
                //    console.log("After resp ", $scope.lstDrugAllergy);
                //    $scope.foodAllergy = $filter('filter')($scope.FemaleHistory.lstAllergyDetail, { IsFood: true }, true)[0];
                //    if (angular.isDefined($scope.foodAllergy))
                //        $scope.foodAllergy.Food = $scope.foodAllergy.Allergy;
                //    else {
                //        $scope.foodAllergy = {};
                //        $scope.foodAllergy.currStatus = 0;
                //        $scope.foodAllergy.SeverityID = 0;
                //        $scope.foodAllergy.SinceWhenYr = 0;
                //        $scope.foodAllergy.SinceWhenMnth = 0;
                //        $scope.foodAllergy.AlleSinceMnth = 0;
                //        $scope.foodAllergy.AlleSinceYr = 0;
                //    }
                //    $scope.skinAllergy = $filter('filter')($scope.FemaleHistory.lstAllergyDetail, { IsSkin: true }, true)[0];
                //    if (angular.isDefined($scope.skinAllergy))
                //        $scope.skinAllergy.Skin = $scope.skinAllergy.Allergy;
                //    else {
                //        $scope.skinAllergy = {};
                //        $scope.skinAllergy.currStatus = 0;
                //        $scope.skinAllergy.SeverityID = 0;
                //        $scope.skinAllergy.SinceWhenYr = 0;
                //        $scope.skinAllergy.SinceWhenMnth = 0;
                //        $scope.skinAllergy.AlleSinceMnth = 0;
                //        $scope.skinAllergy.AlleSinceYr = 0;
                //    }
                //    $scope.smokeAllergy = $filter('filter')($scope.FemaleHistory.lstAllergyDetail, { IsSmoke: true }, true)[0];
                //    if (angular.isDefined($scope.smokeAllergy))
                //        $scope.smokeAllergy.Smoke = $scope.smokeAllergy.Allergy;
                //    else {
                //        $scope.smokeAllergy = {};
                //        $scope.smokeAllergy.currStatus = 0;
                //        $scope.smokeAllergy.SeverityID = 0;
                //        $scope.smokeAllergy.SinceWhenYr = 0;
                //        $scope.smokeAllergy.SinceWhenMnth = 0;
                //        $scope.smokeAllergy.AlleSinceMnth = 0;
                //        $scope.smokeAllergy.AlleSinceYr = 0;
                //    }
                //    $scope.latexAllergy = $filter('filter')($scope.FemaleHistory.lstAllergyDetail, { IsLatex: true }, true)[0];
               }
                //if (angular.isDefined($scope.latexAllergy))
                //    $scope.latexAllergy.Latex = $scope.latexAllergy.Allergy;
                //else {
                //    $scope.latexAllergy = {};
                //    $scope.latexAllergy.currStatus = 0;
                //    $scope.latexAllergy.SeverityID = 0;
                //    $scope.latexAllergy.SinceWhenYr = 0;
                //    $scope.latexAllergy.SinceWhenMnth = 0;
                //    $scope.latexAllergy.AlleSinceMnth = 0;
                //    $scope.latexAllergy.AlleSinceYr = 0;
                //}
            }
            usSpinnerService.stop('GridSpinner');

        }, function (error) {
                
            $scope.Error = error;
            usSpinnerService.stop('GridSpinner');
            
     
        })
    }    
    //get latest lmp date in case of new form only
    $scope.isObjectEmpty = function (card) {
        return Object.keys(card).length === 0;
    }
    $scope.GetLatestLMP = function () {
        debugger;
        var ResponseData = FemaleComplaintsService.GetLatestLMP();
        ResponseData.then(function (Response) {
            $scope.FemaleHistory.LMPDate = Response.data != null ? new Date(Response.data) : null;
        }, function (error) {
            $scope.Error = error;
        })
    }
    //
    /* Bind dropdowns using common service method */
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
    $scope.FetchConsanguinityList = function FetchConsanguinityList() {
        ////
        var ResponseData = Common.getMasterList('M_Consanguinity', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ConsanguinityList = Response.data;
            if ($scope.FemaleHistory.ConsanguinityID == undefined) {
                $scope.FemaleHistory.ConsanguinityID = 0;
            }
        }, function (error) {
            ////
            $scope.Error = error;
        });
    }

    $scope.FetchAgeOfMenarchList = function FetchAgeOfMenarchList() {
        //
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 8; i <= 18; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.AgeOfMenarchList = range;
        if ($scope.FemaleHistory.AgeOfMenarchID == undefined) {
            $scope.FemaleHistory.AgeOfMenarchID = 0;
        }
    }

    $scope.FetchAmmenorheaList = function FetchAmmenorheaList() {
        ////
        var ResponseData = Common.getMasterList('M_Ammenorhea', 'AmmenID', 'AmmenDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AmmenorheaList = Response.data;
            if ($scope.FemaleHistory.AmmenID == undefined) {
                $scope.FemaleHistory.AmmenID = 0;
            }
        }, function (error) {
            ////
            $scope.Error = error;
        });
    }
    $scope.FetchTypeOfSurguryList = function FetchTypeOfSurguryList() {
        ////
        var ResponseData = Common.getMasterList('M_TypeofSurgery', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.TypeOfSurguryList = Response.data;
            //if ($scope.FemaleHistory.TypeOfSurguryID == undefined) {
            //    $scope.FemaleHistory.TypeOfSurguryID = 0;
            //}
        }, function (error) {
            ////
            $scope.Error = error;
        });
    }

    $scope.FetchAmmenorheaTypeList = function FetchAmmenorheaTypeList() {
        ////
        var ResponseData = Common.getMasterList('M_AmmenorheaType', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.AmmenorheaTypeList = Response.data;
            if ($scope.FemaleHistory.AmmenorheaTypeID == undefined) {
                $scope.FemaleHistory.AmmenorheaTypeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchWithdrawlBleedList = function FetchWithdrawlBleedList() {
        ////
        var ResponseData = Common.getMasterList('M_WithdrawlBleeding', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.WithdrawlBleedList = Response.data;
            if ($scope.FemaleHistory.WithdrawlBleedID == undefined) {
                $scope.FemaleHistory.WithdrawlBleedID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMedicationList = function FetchMedicationList() {
        debugger;
        var ResponseData = Common.getMasterList('M_MedicationMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MedicationList = Response.data;
            if ($scope.FemaleHistory.MedicationID == undefined) {
                $scope.FemaleHistory.MedicationID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMenstrualRegularityList = function FetchMenstrualRegularityList() {
        ////
        var ResponseData = Common.getMasterList('M_MenstralRegularity', 'MRegularityID', 'MRegularityDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MenstrualRegularityList = Response.data;
            if ($scope.FemaleHistory.MenstrualRegularityID == undefined) {
                $scope.FemaleHistory.MenstrualRegularityID = 0;
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
            if ($scope.FemaleHistory.BloodGroupID == undefined) {
                $scope.FemaleHistory.BloodGroupID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMenstrualFlowList = function FetchMenstrualFlowList() {
        ////
        var ResponseData = Common.getMasterList('M_MenstrualFlow', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MenstrualFlowList = Response.data;
            if ($scope.FemaleHistory.MFlowID == undefined) {
                $scope.FemaleHistory.MFlowID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchDysmennorheaList = function FetchDysmennorheaList() {
        ////
        var ResponseData = Common.getMasterList('M_Dysmennorhea', 'DysmennorheaID', 'DysmennorheaDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DysmennorheaList = Response.data;
            if ($scope.FemaleHistory.DysmennorheaID == undefined) {
                $scope.FemaleHistory.DysmennorheaID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchIntermenstrualBleedingList = function FetchIntermenstrualBleedingList() {
        ////
        var ResponseData = Common.getMasterList('M_IntermenstrualBleeding', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IntermenstrualBleedingList = Response.data;
            if ($scope.FemaleHistory.IntermBleedID == undefined) {
                $scope.FemaleHistory.IntermBleedID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchContraceptionList = function FetchContraceptionList() {
        ////
        var ResponseData = Common.getMasterList('M_Contraception', 'ContraID', 'ContraDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ContraceptionList = Response.data;
            if ($scope.FemaleHistory.ContraID == undefined) {
                $scope.FemaleHistory.ContraID = 0;
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
            if ($scope.FemaleHistory.MarriedLifeID == undefined) {
                $scope.FemaleHistory.MarriedLifeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMethodContraceptionList = function FetchMethodContraceptionList() {
        ////
        var ResponseData = Common.getMasterList('M_MethodContraception', 'MethodOfContraception', 'MethodContraDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MethodContraceptionList = Response.data;
            debugger;
            if ($scope.FemaleHistory.MethodOfContraception == undefined) {
                $scope.FemaleHistory.MethodOfContraception = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchInfertilityTypeList = function FetchInfertilityTypeList() {
        ////
        var ResponseData = Common.getMasterList('M_InfertilityType', 'InferTypeID', 'InferTypeDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.InfertilityTypeList = Response.data;
            if ($scope.FemaleHistory.InferTypeID == undefined) {
                $scope.FemaleHistory.InferTypeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchFemaleInfertilityList = function FetchFemaleInfertilityList() {
        ////
        var ResponseData = Common.getMasterList('M_FemaleInfertility', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.FemaleInfertilityList = Response.data;
            if ($scope.FemaleHistory.FemaleInfertilityID == undefined) {
                $scope.FemaleHistory.FemaleInfertilityID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMaleInfertilityList = function FetchMaleInfertilityList() {
        ////
        var ResponseData = Common.getMasterList('M_MaleInfertility', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MaleInfertilityList = Response.data;
            if ($scope.FemaleHistory.MaleInfertilityID == undefined) {
                $scope.FemaleHistory.MaleInfertilityID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchFreqOfIntercourseList = function FetchFreqOfIntercourseList() {
        ////
        var ResponseData = Common.getMasterList('M_FreqOfIntercourse', 'FreqOIID', 'FreqOIDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.FreqOfIntercourseList = Response.data;
            if ($scope.FemaleHistory.FreqOIID == undefined) {
                $scope.FemaleHistory.FreqOIID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchSexualDysFunctionList = function FetchSexualDysFunctionList() {
        ////
        var ResponseData = Common.getMasterList('M_SexualDysfunction', 'SexDyID', 'SexDyDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SexualDysFunctionList = Response.data;
            if ($scope.FemaleHistory.SexualDysFunctionID == undefined) {
                $scope.FemaleHistory.SexualDysFunctionID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchDyspareuniaList = function FetchDyspareuniaList() {
        ////
        var ResponseData = Common.getMasterList('M_Dyspareunia', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DyspareuniaList = Response.data;
            if ($scope.FemaleHistory.DyspareuniaID == undefined) {
                $scope.FemaleHistory.DyspareuniaID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchLubricationUsedList = function FetchLubricationUsedList() {
        ////
        var ResponseData = Common.getMasterList('M_LubricationUsed', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.LubricationUsedList = Response.data;
            if ($scope.FemaleHistory.LubricationUsedID == undefined) {
                $scope.FemaleHistory.LubricationUsedID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.FetchSTDList = function FetchSTDList() {
        ////
        var ResponseData = Common.getMasterList('M_STD', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.STDList = Response.data;
            if ($scope.FemaleHistory.STDID == undefined) {
                $scope.FemaleHistory.STDID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchYearsList = function FetchYearsList() {
        //
        debugger;
        var year = new Date().getFullYear();
        var range = [];     
        $scope.ObstetricYears = [];      //Added by Nayan Kamble on 06/01/2020
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        $scope.ObstetricYears.splice(0, 0, { ID: 0, Description: 'Select' });       //Added by Nayan Kamble on 06/01/2020

        //commented by Nayan Kamble on 06/01/2020  START
        //for (var i = 1; i <= 26; i++) {
        //    if (i == 1) {
        //        range.splice(i, 0, { ID: i, Description: year });
         
        //    } else {
        //        var yearscal = year - (i - 1);
        //        range.splice(i, 0, { ID: i, Description: yearscal });
            
               
        //    }
        //}
        //commented by Nayan Kamble on 06/01/2020  END

        //Added by Nayan Kamble on 06/01/2020  START
        for (var i=1, j = 1994; j <= year; j++) {
            range.splice(i, 0, { ID: j, Description: j });
            $scope.ObstetricYears.splice(i, 0, { ID: j, Description: j });
        }
        //Added by Nayan Kamble on 06/01/2020 END
    
        if ($scope.FemaleHistory.ObstetricYearsID == undefined) {
            $scope.FemaleHistory.ObstetricYearsID =0;
        }
    }

    

    $scope.FetchGestationWeeksList = function FetchGestationWeeksList() {
        ////
        var ResponseData = Common.getMasterList('M_GestationWeeks', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.GestationWeeksList = Response.data;
            if ($scope.FemaleHistory.GestationWeeksID == undefined) {
                $scope.FemaleHistory.GestationWeeksID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchOutcomeList = function FetchOutcomeList() {
        debugger;
        var ResponseData = Common.getMasterList('M_Outcome', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.OutcomeList = Response.data;
            if ($scope.FemaleHistory.OutcomeID == undefined) {
                $scope.FemaleHistory.OutcomeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchDeliveryTypeList = function FetchDeliveryTypeList() {
        ////
        var ResponseData = Common.getMasterList('M_DeliveryType', 'DeliveryTypeID', 'DeliveryTypeDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DeliveryTypeList = Response.data;
            if ($scope.FemaleHistory.DeliveryTypeID == undefined) {
                $scope.FemaleHistory.DeliveryTypeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchDeliveryList = function FetchDeliveryList() {
        ////
        var ResponseData = Common.getMasterList('M_Delivery', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DeliveryList = Response.data;
            if ($scope.FemaleHistory.DeliveryID == undefined) {
                $scope.FemaleHistory.DeliveryID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchTypeOfConceiving = function FetchTypeOfConceiving() {
        ////
        var ResponseData = Common.getMasterList('M_TypeOfConceiving', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.TypeOfConceivingList = Response.data;
            if ($scope.FemaleHistory.ObstetricHistoryItem.TypeOfConceivingID == undefined) {
                $scope.FemaleHistory.ObstetricHistoryItem.TypeOfConceivingID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchComplicationsList = function FetchComplicationsList() {
        ////
        var ResponseData = Common.getMasterList('M_Complications', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ComplicationsList = Response.data;
            if ($scope.FemaleHistory.ComplicationsID == undefined) {
                $scope.FemaleHistory.ComplicationsID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchCongenitalAnamolyList = function FetchCongenitalAnamolyList() {
        ////
        var ResponseData = Common.getMasterList('M_CongenitalAnamoly', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.CongenitalAnamolyList = Response.data;
            if ($scope.FemaleHistory.CongenitalAnamolyID == undefined) {
                $scope.FemaleHistory.CongenitalAnamolyID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchHistoryOfRecurrentAbortionList = function FetchHistoryOfRecurrentAbortionList() {
        ////
        var ResponseData = Common.getMasterList('M_HistoryOfRecurrentAbortion', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.HistoryOfRecurrentAbortionList = Response.data;
            if ($scope.FemaleHistory.HistoryOfRecurrentAbortionID == undefined) {
                $scope.FemaleHistory.HistoryOfRecurrentAbortionID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchARTCycleList = function FetchARTCycleList() {
        ////
        var ResponseData = Common.getMasterList('M_ARTCycle', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ARTCycleList = Response.data;
            if ($scope.FemaleHistory.ARTCycleID == undefined) {
                $scope.FemaleHistory.ARTCycleID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchTreatmentYearsList = function FetchTreatmentYearsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 26; i++) {
            if (i == 1) {
                range.splice(i, 0, { ID: i, Description: year });
            } else {
                var yearscal = year - (i - 1);
                range.splice(i, 0, { ID: i, Description: yearscal });
            }
        }
        $scope.TreatmentYears = range;
        if ($scope.FemaleHistory.TreatmentYearsID == undefined) {
            $scope.FemaleHistory.TreatmentYearsID = 0;
        }
    }

    $scope.FetchTreatmentCountsList = function FetchTreatmentCountsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 10; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.TreatmentCounts = range;
        if ($scope.FemaleHistory.TreatmentCountsID == undefined) {
            $scope.FemaleHistory.TreatmentCountsID = 0;
        }
    }

    $scope.FetchDrugsList = function FetchDrugsList() {
        ////
        var ResponseData = Common.getMasterList('M_Molecule', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DrugsNameList = Response.data;
            //$scope.DrugsNameList.splice(0, 1);
            //Make checkbox checked
            if (!angular.isUndefined($scope.FemaleHistory.AllergiesDrugIds)) {
                angular.forEach($scope.FemaleHistory.AllergiesDrugIds.split(','), function (i) {

                    //$scope.DrugsNameList[$scope.DrugsNameList.findIndex(x=>x.ID == i)].ticked = true;

                    for (var j = 0; j <= $scope.DrugsNameList.length - 1; j++) {
                        if ($scope.DrugsNameList[j].ID == i) {
                            $scope.DrugsNameList[j].ticked = true;
                            break;
                        }
                    }
                });
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchPreviousDrugsList = function FetchPreviousDrugsList() {
        ////
        var ResponseData = Common.getMasterList('M_Drugs', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.PreviousDrugsList = Response.data;
            if ($scope.FemaleHistory.DrugsID == undefined) {
                $scope.FemaleHistory.DrugsID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchOocytesRetrievedList = function FetchOocytesRetrievedList() {
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 30; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.OocytesRetrievedList = range;
    }

    $scope.FetchOocytesFertilizedList = function FetchOocytesFertilizedList(OocytesRetrievedID, idx, ActionFrom) {
        var range = [];
     
        debugger;
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        if (OocytesRetrievedID == 0 && ActionFrom != 'Load') {
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].OocytesFertilizedID = 0;
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].EmbryosTransferredID = 0;
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].EmbryosFrozenID = 0;
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].OocytesCleavedID = 0;
        } else {
            for (var i = 1; i <= OocytesRetrievedID; i++) {
                range.splice(i, 0, { ID: i, Description: i });
            }
            $scope.OocytesFertilizedList[idx] = range;
            debugger;
        }
    }
    $scope.FetchEmbryosTransferredList = function FetchEmbryosTransferredList(OocytesCleavedID, idx, ActionFrom) {
        var range = [];
         
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        if (OocytesCleavedID == 0 && ActionFrom != 'Load') {
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].EmbryosTransferredID = 0;
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].EmbryosFrozenID = 0;
        } else {
            for (var i = 1; i <= OocytesCleavedID; i++) {
                range.splice(i, 0, { ID: i, Description: i });
            }
            $scope.EmbryosTransferredList[idx] = range;
        }
    }
    $scope.FetchOocyteCleavedList = function FetchOocyteCleavedList(OocytesFertilizedID, idx, ActionFrom) {
        var range = [];
        
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        if (OocytesFertilizedID == 0 && ActionFrom != 'Load') {
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].EmbryosTransferredID = 0;
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].EmbryosFrozenID = 0;
        } else {
            for (var i = 1; i <= OocytesFertilizedID; i++) {
                range.splice(i, 0, { ID: i, Description: i });
            }
            $scope.OocyteCleavedList[idx] = range;
        }
    }

    $scope.FetchEmbryosFrozenList = function FetchEmbryosFrozenList(OocytesCleavedID, EmbryosTransferredID, idx, ActionFrom) {
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        debugger
        $scope.Value = OocytesCleavedID - EmbryosTransferredID;
        if ($scope.Value == 0 && ActionFrom == 'Load') {
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].EmbryosTransferredID = 0;
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem[idx].EmbryosFrozenID = 0;
        } else {
            for (var i = 1; i <= $scope.Value; i++) {
                range.splice(i, 0, { ID: i, Description: i });
            }
            $scope.EmbryosFrozenList[idx] = range;
        }
    }

    $scope.FetchSuccessfulList = function FetchSuccessfulList() {
        //
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 2; i++) {
            if (i == 1) {
                range.splice(i, 0, { ID: i, Description: 'Yes' });
            } else {
                range.splice(i, 0, { ID: i, Description: 'No' });
            }
        }
        $scope.SuccessfulList = range;
    }

    $scope.FetchMoodList = function FetchMoodList() {
        ////
        var ResponseData = Common.getMasterList('M_Mood', 'MoodID', 'MoodDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MoodList = Response.data;
            if ($scope.FemaleHistory.MoodID == undefined) {
                $scope.FemaleHistory.MoodID = 0;
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
            if ($scope.FemaleHistory.SleepID == undefined) {
                $scope.FemaleHistory.SleepID = 0;
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
            if ($scope.FemaleHistory.HeadacheORNauseaID == undefined) {
                $scope.FemaleHistory.HeadacheORNauseaID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchPersonalityList = function FetchPersonalityList() {
        ////
        var ResponseData = Common.getMasterList('M_Personality', 'PersonalityID', 'PersonalityDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.PersonalityList = Response.data;
            if ($scope.FemaleHistory.PersonalityID == undefined) {
                $scope.FemaleHistory.PersonalityID = 0;
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
            if ($scope.FemaleHistory.StressID == undefined) {
                $scope.FemaleHistory.StressID = 0;
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
            if ($scope.FemaleHistory.ExerciseID == undefined) {
                $scope.FemaleHistory.ExerciseID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchFreqOfExerciseList = function FetchFreqOfExerciseList() {
        ////
        var ResponseData = Common.getMasterList('M_FrequencyOfExercise', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.FreqOfExerciseList = Response.data;
            if ($scope.FemaleHistory.FreqOfExerciseID == undefined) {
                $scope.FemaleHistory.FreqOfExerciseID = 0;
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
            if ($scope.FemaleHistory.DietID == undefined) {
                $scope.FemaleHistory.DietID = 0;
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
            if ($scope.FemaleHistory.CaffeinatedBeveragesID == undefined) {
                $scope.FemaleHistory.CaffeinatedBeveragesID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchRelationList = function FetchRelationList() {
        ////
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            ////
            //Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DiseaseRelationList = Response.data;
            if ($scope.FemaleHistory.RelationID == undefined) {
                $scope.FemaleHistory.RelationID = 0;
            }
            //Make checkbox checked
            if (!angular.isUndefined($scope.FemaleHistory.FamilyCardiacDiseaseIds)) {
                angular.forEach($scope.FemaleHistory.FamilyCardiacDiseaseIds.split(','), function (i) {

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
            if (!angular.isUndefined($scope.FemaleHistory.FamilyDiabetesOtherIds)) {
                angular.forEach($scope.FemaleHistory.FamilyDiabetesOtherIds.split(','), function (i) {

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
            if (!angular.isUndefined($scope.FemaleHistory.FamilyHypertensionIds)) {
                angular.forEach($scope.FemaleHistory.FamilyHypertensionIds.split(','), function (i) {

                    //$scope.HypertensionRelationList[$scope.HypertensionRelationList.findIndex(x=>x.ID == i)].ticked = true;
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
            if (!angular.isUndefined($scope.FemaleHistory.FamilyThyroidDisorderIds)) {
                angular.forEach($scope.FemaleHistory.FamilyThyroidDisorderIds.split(','), function (i) {

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
            if (!angular.isUndefined($scope.FemaleHistory.FamilyMalignancyIds)) {
                angular.forEach($scope.FemaleHistory.FamilyMalignancyIds.split(','), function (i) {

                    // $scope.MalignancyRelationList[$scope.MalignancyRelationList.findIndex(x=>x.ID == i)].ticked = true;
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

    //added by mayur..........
    $scope.FetchCardiacDiseaseList = function FetchCardiacDiseaseList() {
        var ResponseData = Common.getMasterList('M_CardiacDisease', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.CardiacDiseaseList = Responce.data;
            if ($scope.FemaleHistory.CardiacDiseaseID == undefined) {
                $scope.FemaleHistory.CardiacDiseaseID = 0;
                $scope.flag1 = true;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchOnMedication = function FetchOnMedication() {
        var ResponseData = Common.getMasterList('M_OnMedication', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.OnMedicationList = Responce.data;
            if ($scope.FemaleHistory.CardiacDiseaseOnMedication == undefined) {
                $scope.FemaleHistory.CardiacDiseaseOnMedication = 0;
            }
            if ($scope.FemaleHistory.DiabetesOnMedication == undefined) {
                $scope.FemaleHistory.DiabetesOnMedication = 0;
            }
            if ($scope.FemaleHistory.ThyroidDisorderOnMedication == undefined) {
                $scope.FemaleHistory.ThyroidDisorderOnMedication = 0;
            }
            if ($scope.FemaleHistory.MalignancyOnMedication == undefined) {
                $scope.FemaleHistory.MalignancyOnMedication = 0;
            }
            if ($scope.FemaleHistory.TuberculosisOnMedication == undefined) {
                $scope.FemaleHistory.TuberculosisOnMedication = 0;
            }
            if ($scope.FemaleHistory.PelvicInfectionOnMedication == undefined) {
                $scope.FemaleHistory.PelvicInfectionOnMedication = 0;
            }
            if ($scope.FemaleHistory.BleedingDisordersOnMedication == undefined) {
                $scope.FemaleHistory.BleedingDisordersOnMedication = 0;
            }
            if ($scope.FemaleHistory.EpilepsyOnMedication == undefined) {
                $scope.FemaleHistory.EpilepsyOnMedication = 0;
            }
            if ($scope.FemaleHistory.HaemoglobinDeficiencyOnMedication == undefined) {
                $scope.FemaleHistory.HaemoglobinDeficiencyOnMedication = 0;
            }
            if ($scope.FemaleHistory.MHOtherDiseaseOnMedication == undefined) {
                $scope.FemaleHistory.MHOtherDiseaseOnMedication = 0;
            }
            if ($scope.FemaleHistory.RespiratoryOnMedication == undefined) {
                $scope.FemaleHistory.RespiratoryOnMedication = 0;
            }
            if ($scope.FemaleHistory.SLEOnMedication == undefined) {
                $scope.FemaleHistory.SLEOnMedication = 0;
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
            if ($scope.FemaleHistory.DiabetesID == undefined) {
                $scope.FemaleHistory.DiabetesID = 0;
                 $scope.flag2 =true;
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
            if ($scope.FemaleHistory.ThyroidDisorderID == undefined) {
                $scope.FemaleHistory.ThyroidDisorderID = 0;
                $scope.flag3 = true;
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
            if ($scope.FemaleHistory.MalignancyID == undefined) {
                $scope.FemaleHistory.MalignancyID = 0;
                   $scope.flag4 =true;
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
            if ($scope.FemaleHistory.TuberculosisID == undefined) {
                $scope.FemaleHistory.TuberculosisID = 0;
                 $scope.flag5 =true;
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
            if ($scope.FemaleHistory.PelvicInfectionID == undefined) {
                $scope.FemaleHistory.PelvicInfectionID = 0;
                 $scope.flag6 =true;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchBleedingDisordersList = function FetchBleedingDisordersList() {
        var ResponseData = Common.getMasterList('M_BleedingDisorder', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            debugger;
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.BleedingDisordersList = Responce.data;
            if ($scope.FemaleHistory.BleedingDisordersID == undefined) {
                debugger;
                $scope.FemaleHistory.BleedingDisordersID = 0;
                $scope.flag7 = true;
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
            if ($scope.FemaleHistory.EpilepsyID == undefined) {
                $scope.FemaleHistory.EpilepsyID = 0;
                $scope.flag8 =true;
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
            if ($scope.FemaleHistory.SLEID == undefined) {
                $scope.FemaleHistory.SLEID = 0;
                  $scope.flag11 =true;
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
            if ($scope.FemaleHistory.RespiratoryID == undefined) {
                $scope.FemaleHistory.RespiratoryID = 0;
                   $scope.flag10 = true;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchIndicationList = function FetchIndicationList() {
        var ResponseData = Common.getMasterList('M_RespiratoryDisease', 'ID', 'Description');//M_IndicationList

      ResponseData.then(function (Responce) {
          Responce.data.splice(0, 0, { ID: 0, Description: 'Select'
          });
          $scope.IndicationList = Responce.data;
          if ($scope.FemaleHistory.IndicationID == undefined) {
              $scope.FemaleHistory.IndicationID = 0;
              }
              }, function (err) {
          $scope.Error = error;
          })
    }
    $scope.FetchSampleTypeList = function FetchSampleTypeList() {
        var ResponseData = Common.getMasterList('M_RespiratoryDisease', 'ID', 'Description');//M_SampleTypeList

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SampleTypeList   = Responce.data;
            if ($scope.FemaleHistory.SampleTypeID == undefined) {
                $scope.FemaleHistory.SampleTypeID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }
    $scope.FetchOHSampleList = function FetchOHSampleList() {
        var ResponseData = Common.getMasterList('M_RespiratoryDisease', 'ID', 'Description');//M_OHSampleList

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.OHSampleList = Responce.data;
            if ($scope.FemaleHistory.OHSampleID == undefined) {
                $scope.FemaleHistory.OHSampleID = 0;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }

    $scope.FetchHaemoglobinDeficiencyList = function FetchHaemoglobinDeficiencyList() {
        var ResponseData = Common.getMasterList('M_HaemoglobinDeficiencyMaster', 'ID', 'Description');

        ResponseData.then(function (Responce) {
            Responce.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.HaemoglobinDeficiencyList = Responce.data;
            if ($scope.FemaleHistory.HaemoglobinDeficiencyID == undefined) {
                $scope.FemaleHistory.HaemoglobinDeficiencyID = 0;
                $scope.flag9 = true;
            }
        }, function (err) {
            $scope.Error = error;
        })
    }

    $scope.FetchOtherRelationList = function FetchOtherRelationList() {
        ////
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            ////
            $scope.OtherRelationList = Response.data;
            //Make checkbox checked
            if (!angular.isUndefined($scope.FemaleHistory.FamilyOtherRemarkIds)) {
                angular.forEach($scope.FemaleHistory.FamilyOtherRemarkIds.split(','), function (i) {

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

    $scope.FetchInRelationSinceYearsList = function FetchInRelationSinceYearsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 26; i++) {
            range.splice(i, 0, { ID: i, Description: i - 1 });
        }
        $scope.InRelationSinceYearsList = range;
        if ($scope.FemaleHistory.InRelationSinceYearsID == undefined) {
            $scope.FemaleHistory.InRelationSinceYearsID = 0;
        }
    }

    $scope.FetchInRelationSinceMonthsList = function FetchInRelationSinceMonthsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 12; i++) {
            range.splice(i, 0, { ID: i, Description: i - 1 });
        }
        $scope.InRelationSinceMonthsList = range;
        if ($scope.FemaleHistory.InRelationSinceMonthsID == undefined) {
            $scope.FemaleHistory.InRelationSinceMonthsID = 0;
        }
    }

    $scope.FetchTrayingToConvinceYearsList = function FetchTrayingToConvinceYearsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 26; i++) {
            range.splice(i, 0, { ID: i, Description: i - 1 });
        }
        $scope.TrayingToConvinceYearsList = range;
        if ($scope.FemaleHistory.TrayingToConvinceYearsID == undefined) {
            $scope.FemaleHistory.TrayingToConvinceYearsID = 0;
        }
    }

    $scope.FetchTrayingToConvinceMonthsList = function FetchTrayingToConvinceMonthsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 12; i++) {
            range.splice(i, 0, { ID: i, Description: i - 1 });
        }
        $scope.TrayingToConvinceMonthsList = range;
        if ($scope.FemaleHistory.TrayingToConvinceMonthsID == undefined) {
            $scope.FemaleHistory.TrayingToConvinceMonthsID = 0;
        }
    }
    $scope.UpdateTrayingToConvince = function (id) {
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= id; i++) {
            range.splice(i, 0, { ID: i, Description: i - 1 });
        }
        $scope.TrayingToConvinceYearsList = range;
        $scope.DurationYearsList = range;
        if ($scope.FemaleHistory.TrayingToConvinceYearsID == undefined) {
            $scope.FemaleHistory.TrayingToConvinceYearsID = 0;
        }
        if ($scope.FemaleHistory.DurationYearsID == undefined) {
            $scope.FemaleHistory.DurationYearsID = 0;
        }
        // alert(id);
        // $scope.TrayingToConvinceYearsList=$scope.TrayingToConvinceYearsList.splice(-id);

    }

    $scope.FetchDurationYearsList = function FetchDurationYearsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Year' });
        for (var i = 1; i <= 50; i++) {
            range.splice(i, 0, { ID: i, Description: i });
        }
        $scope.DurationYearsList = range;
        $scope.MainDurationYearsList = range;
        if ($scope.FemaleHistory.DurationYearsID == undefined) {
            $scope.FemaleHistory.DurationYearsID = 0;
        }
    }

    $scope.FetchDurationMonthsList = function FetchDurationMonthsList() {
        //
        var year = new Date().getFullYear();
        var range = [];
        range.splice(0, 0, { ID: 0, Description: 'Select' });
        for (var i = 1; i <= 12; i++) {
            range.splice(i, 0, { ID: i, Description: i - 1 });
        }
        $scope.DurationMonthsList = range;
        if ($scope.FemaleHistory.DurationMonthsID == undefined) {
            $scope.FemaleHistory.DurationMonthsID = 0;
        }
    }

    $scope.FetchCalenderList = function FetchCalenderList() {
        ////
        var ResponseData = Common.getMasterList('M_Calender', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.CalenderList = Response.data;
            if ($scope.FemaleHistory.CalenderID == undefined) {
                $scope.FemaleHistory.CalenderID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMedicationStatusList = function FetchMedicationStatusList() {
        ////
        var ResponseData = Common.getMasterList('M_MedicationStatus', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MedicationStatusList = Response.data;
            if ($scope.FemaleHistory.MedicationStatusID == undefined) {
                $scope.FemaleHistory.MedicationStatusID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    /* START : Row adding and Removing Events */
    $scope.AddObstetricHistoryRow = function () {

        $scope.FemaleHistory.ObstetricHistoryItem.push({
            'ObstetricHistoryID': 0,
            'ObstetricYearsID':0,
            'GestationWeeksID': 0,            
            'OutcomeID': 0,
            'ChildSexID': 0,
            'DateOfAbortion': null,
            'DeliveryTypeID': 0,
            'DeliveryID': 0,
            'TypeOfConceivingID': 0,
            'ComplicationsID': 0,
            'CongenitalAnamolyID': 0,
            'ComplicationDetails': "",
            'ObstetricRemark': "",
            'IsDeliveryTypeDisabled': true,
            'IsDateOfAbortionDisabled': true,
        });
    }

     $scope.ClearObstetricHistoryItem =function(index){
         $scope.FemaleHistory.ObstetricHistoryItem[index].ChildSexID=0;
         $scope.FemaleHistory.ObstetricHistoryItem[index].DateOfAbortion=null;
         $scope.FemaleHistory.ObstetricHistoryItem[index].DeliveryTypeID=0;
         $scope.FemaleHistory.ObstetricHistoryItem[index].DeliveryID=0;
         $scope.FemaleHistory.ObstetricHistoryItem[index].TypeOfConceivingID=0;
         $scope.FemaleHistory.ObstetricHistoryItem[index].ComplicationsID=0;
         $scope.FemaleHistory.ObstetricHistoryItem[index].CongenitalAnamolyID=0;
         $scope.FemaleHistory.ObstetricHistoryItem[index].CongenitalAnamolyRemark='';
         $scope.FemaleHistory.ObstetricHistoryItem[index].ComplicationDetails='';
         $scope.FemaleHistory.ObstetricHistoryItem[index].ObstetricRemark='';
         $scope.FemaleHistory.ObstetricHistoryItem[index].BirthWeight=undefined;
        //    'ObstetricHistoryID': 0,
        //    'ObstetricYearsID':0,
        //    'GestationWeeksID': 0,            
        //    'OutcomeID': 0,
        //    'ChildSexID': 0,
        //    'DateOfAbortion': null,
        //    'DeliveryTypeID': 0,
        //    'DeliveryID': 0,
        //    'TypeOfConceivingID': 0,
        //    'ComplicationsID': 0,
        //    'CongenitalAnamolyID': 0,
        //    'ComplicationDetails': "",
        //    'ObstetricRemark': "",
           
        //};
     }

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

    $scope.RemoveObstetricHistoryRow = function (Index) {
        debugger;
        if ($scope.FemaleHistory.ObstetricHistoryItem.length <= 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else {
            $scope.FemaleHistory.ObstetricHistoryItem.splice(Index, 1);
            //After removing row make correct calculations
            $scope.CalculatePvalue();
            $scope.CalculateGvalue();
        }
    };
    $scope.RemoveAllergyHistoryRow = function (Index) {
        debugger;
        if ($scope.lstDrugAllergy.length < 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else {
            $scope.lstDrugAllergy.splice(Index, 1);
            //After removing row make correct calculations
        }
    };

    $scope.AddPrevioustTreatmentHistoryRow = function () {

        $scope.FemaleHistory.PrevioustTreatmentHistoryItem.push({
            'PreTreatmentID': 0,
            'ARTCycleID': 0,
            'TreatmentYearsID': 0,
            'TreatmentCountsID': 0,
            'DrugsID': 0,
            'DrugName':"",
            'OocytesRetrievedID': 0,
            'OocytesFertilizedID': 0,
            'OocytesCleavedID': 0,
            'EmbryosTransferredID': 0,
            'EmbryosFrozenID': 0,
            'SuccessfulID': 0,
            'PreviousTreatmentHistoryRemark': "",
            'PlaceOfTreatment' : "",
            'IsPTHYearsDisabled': true,
            'IsPTHCountDisabled': true,
            'IsPTHDrugsDisabled': true,
            'IsPTHOocytesRetrievedDisabled': true,
            'IsPTHOocytesFertilizedDisabled': true,
            'IsPTHEmbryosTransferredDisabled': true,
            'IsPTHOocytesCleavedDisabled': true,
            'IsPTHEmbryosFrozenDisabled': true,
            'IsPTHSucessfulDisabled': true,
            'IsPTHRemarksDisabled': true
        });
    }

    $scope.RemovePrevioustTreatmentHistoryRow = function (Index) {

        debugger;
        if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem.length <= 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else {
            
            $scope.FemaleHistory.PrevioustTreatmentHistoryItem.splice(Index, 1);
        }
    };

    $scope.AddPastMedicationHistoryRow = function () {
        $scope.FemaleHistory.PastMedicationHistoryItem.push({
            'PastMedicationID': 0,
            'DrugID': 0,
            'DrugeName': "",
            'Dose': "",
            'TimePeriod': "",
            'CalenderID': 0,
            'Remark': "",
            'MedicationStatusID': 0,
            'enbdsb': false
        });
    }

    //modified family history grid
    $scope.FetchTypeOfDiseaseList = function FetchTypeOfDiseaseList() {
        debugger;
        var ResponseData = Common.getMasterList('M_TypeOfDisease', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.TypeOfDiseaseList = Response.data;
            if ($scope.FemaleHistory.TypeOfDiseaseID == undefined) {
                $scope.FemaleHistory.TypeOfDiseaseID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMaternalPaternalList = function FetchMaternalPaternalList() {
        debugger;
        
        var ResponseData = Common.getMasterList('M_RelationMaster', 'RelationID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MaternalPaternalList = Response.data;
            if ($scope.FemaleHistory.MaternalPaternalID == undefined) {
                $scope.FemaleHistory.MaternalPaternalID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchRelationshipList = function FetchRelationshipList() {
        debugger;
        var ResponseData = Common.getMasterList('M_FamilyMaster', 'FID', 'Fdetail');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.RelationshipList = Response.data;
            if ($scope.FemaleHistory.RelationshipID == undefined) {
                $scope.FemaleHistory.RelationshipID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchLiveStatusList = function FetchLiveStatusList() {
        debugger;
        var ResponseData = Common.getMasterList('M_AliveDeadStatusMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.LiveStatusList = Response.data;
            if ($scope.FemaleHistory.LiveStatusID == undefined) {
                $scope.FemaleHistory.LiveStatusID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.AddFamilyHistoryRow = function () {
        debugger;
        if ($scope.FemaleHistory.FamilyHistoryItem == null) $scope.FemaleHistory.FamilyHistoryItem = [];
        $scope.FemaleHistory.FamilyHistoryItem.push({
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
        debugger;
        // if ($scope.MaleHistory.FamilyHistoryItem.length <= 1) {
        //  AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        //  }
        // else {
        $scope.FemaleHistory.FamilyHistoryItem.splice(Index, 1);
        //  }
    };

    $scope.RemovePastMedicationHistoryRow = function (Index) {

        //if ($scope.FemaleHistory.PastMedicationHistoryItem.length <= 1) {
        //    AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        //}
        //else {
        $scope.FemaleHistory.PastMedicationHistoryItem.splice(Index, 1);
        //}
    };
    /* END : Row adding and Removing Events */

    /* START : Controls changed events */
    $scope.ARTCycleChangeEvent = function ARTCycleChangeEvent() {
        
        for (var Index = 0; Index < $scope.FemaleHistory.PrevioustTreatmentHistoryItem.length; Index++) {

            if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 1) {
                //OI + TI - Year, Count, Drugs, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesRetrievedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesFertilizedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosTransferredID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosFrozenID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesCleavedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = true; //rohini

            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 2) {
                //OI + IUI - Year, Count, Drugs, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesRetrievedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesFertilizedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosTransferredID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosFrozenID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesCleavedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = true; //rohini
            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 3) {
                //OI + IUI (D) - Year, Count, Drugs, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesRetrievedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesFertilizedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosTransferredID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosFrozenID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesCleavedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = true; //rohini
            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 4) {
                //IVF - Year, Drugs, Oocytes Retrieved, Oocytes Frozen, Embryos Transferred, Embryos Frozen, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID == undefined ? $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID = 0 : $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = false; //rohini
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 5) {
                //ICSI - Year, Drugs, Oocytes Retrieved, Oocytes Frozen, Embryos Transferred, Embryos Frozen, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID == undefined ? $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID = 0 : $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID;;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = false; //rohini
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 6) {
                //ICSI - Year, Drugs, Oocytes Retrieved, Oocytes Frozen, Embryos Transferred, Embryos Frozen, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID == undefined ? $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID = 0 : $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID;;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = false; //rohini
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 7) {
                //FET - Year, Drugs, Embryos Transferred, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID == undefined ? $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID = 0 : $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID;;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesRetrievedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosFrozenID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesCleavedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = true; //rohini
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 8) {
                //ICSI - Year, Drugs, Oocytes Retrieved, Oocytes Frozen, Embryos Transferred, Embryos Frozen, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID == undefined ? $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID = 0 : $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID;;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = false; //rohini
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 9) {
                //FET - Year, Drugs, Embryos Transferred, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID == undefined ? $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID = 0 : $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID;;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesRetrievedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesFertilizedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosFrozenID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesCleavedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = true; //rohini
            } else if ($scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].ARTCycleID == 10) {
                //ICSI - Year, Drugs, Oocytes Retrieved, Oocytes Frozen, Embryos Transferred, Embryos Frozen, Successful, Remarks
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID == undefined ? $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID = 0 : $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID;;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = false; //rohini
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = false;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = false;
            } else {
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHYearsDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentYearsID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHCountDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].TreatmentCountsID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHDrugsDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].DrugsID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesRetrievedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesRetrievedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesFertilizedDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesFertilizedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosTransferredDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosTransferredID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHEmbryosFrozenDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].EmbryosFrozenID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].OocytesCleavedID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHSucessfulDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].SuccessfulID = 0;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHRemarksDisabled = true;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].PreviousTreatmentHistoryRemark = null;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].PlaceOfTreatment = null;
                $scope.FemaleHistory.PrevioustTreatmentHistoryItem[Index].IsPTHOocytesCleavedDisabled = true; //rohini
            }
        }
    }

    $scope.CalculateGvalue = function CalculateGvalue() {
        debugger;
        $scope.FemaleHistory.Gvalue = 0;
        $scope.FemaleHistory.Lvalue = 0;
        $scope.FemaleHistory.Avalue = 0;
        $scope.FemaleHistory.Evalue = 0;

        //added by neena
        $scope.FemaleHistory.Pvalue = 0;
        //

        for (var Index = 0; Index < $scope.FemaleHistory.ObstetricHistoryItem.length; Index++) {
            //added by neena
            if ($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 1 || $scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 5) {
                $scope.FemaleHistory.Pvalue += 1;
            }
            //

            //The count of no. of rows added with Outcome
            if ($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID > 0) {
                $scope.FemaleHistory.Gvalue += 1;
            }
            //The count of no of rows with Outcome as 'Livebirth'
            if ($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 1) {
                $scope.FemaleHistory.Lvalue += 1;
                $scope.FemaleHistory.ObstetricHistoryItem[Index].IsDeliveryTypeDisabled = false;
            } else {
                //$scope.FemaleHistory.ObstetricHistoryItem[Index].DeliveryTypeID = 0;
                //$scope.FemaleHistory.ObstetricHistoryItem[Index].DeliveryID = 0;
                //$scope.FemaleHistory.ObstetricHistoryItem[Index].TypeOfConceivingID = 0;
                //$scope.FemaleHistory.ObstetricHistoryItem[Index].BirthWeight = undefined;
                //$scope.FemaleHistory.ObstetricHistoryItem[Index].ComplicationsID = 0;
                //$scope.FemaleHistory.ObstetricHistoryItem[Index].CongenitalAnamolyID = 0;
                $scope.FemaleHistory.ObstetricHistoryItem[Index].IsDeliveryTypeDisabled = true;
            }
            //The count of no of rows with Outcome as 'Abortion'
            if ($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 4) {
                $scope.FemaleHistory.Avalue += 1;
                //$scope.FemaleHistory.ObstetricHistoryItem[Index].DateOfAbortion = new Date();
            }

            //enable disable
            if ($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 3 || $scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 0 ||
                $scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 6) {
                $scope.FemaleHistory.ObstetricHistoryItem[Index].IsDateOfAbortionDisabled = true;
            } else {
                $scope.FemaleHistory.ObstetricHistoryItem[Index].IsDateOfAbortionDisabled = false;
            }

            //The count of no of rows with Outcome as 'Ectopic'
            if ($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 3) {
                $scope.FemaleHistory.Evalue += 1;
            }

            if ($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 1 || $scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 5) {
                debugger;
                if ($scope.FemaleHistory.ObstetricHistoryItem[Index].GestationWeeksID == 0) {
                    $scope.FemaleHistory.ObstetricHistoryItem[Index].DeliveryID = 0;
                }
                else if ($scope.FemaleHistory.ObstetricHistoryItem[Index].GestationWeeksID + 3 <= 35) {//34

                    $scope.FemaleHistory.ObstetricHistoryItem[Index].DeliveryID = 1;
                    $scope.FemaleHistory.ObstetricHistoryItem[Index].disabledDeliverID = true;
                }
                else if ($scope.FemaleHistory.ObstetricHistoryItem[Index].GestationWeeksID + 3 <= 42 && //36
                          $scope.FemaleHistory.ObstetricHistoryItem[Index].GestationWeeksID + 3 > 35) { //34

                    $scope.FemaleHistory.ObstetricHistoryItem[Index].DeliveryID = 2; //3
                    $scope.FemaleHistory.ObstetricHistoryItem[Index].disabledDeliverID = true;
                }
                else {

                    $scope.FemaleHistory.ObstetricHistoryItem[Index].DeliveryID = 3; //2
                    $scope.FemaleHistory.ObstetricHistoryItem[Index].disabledDeliverID = true;
                }

            }
        }

    }

    $scope.CalculatePvalue = function CalculatePvalue() {

        //The count of no of rows with Gestation weeks greater than 20
        //$scope.FemaleHistory.Pvalue = 0;
        //for (var Index = 0; Index < $scope.FemaleHistory.ObstetricHistoryItem.length; Index++) {
        //    if ($scope.FemaleHistory.ObstetricHistoryItem[Index].GestationWeeksID > 17) {
        //        $scope.FemaleHistory.Pvalue += 1;
        //    }
        //}
        $scope.CalculateGvalue();
    }

    $scope.ChangedAmmenorheaEvent = function ChangedAmmenorheaEvent() {
        if ($scope.FemaleHistory.AmmenID == 2) {
            $scope.IsAmenorrheaTypeDisabled = false;
            $scope.IsWithdrawlBleedDisabled = false;
        } else {
            $scope.IsAmenorrheaTypeDisabled = true;
            $scope.IsWithdrawlBleedDisabled = true;
            $scope.FemaleHistory.AmmenorheaTypeID = 0;
            $scope.FemaleHistory.WithdrawlBleedID = 0;
            $scope.FemaleHistory.MedicationID = 0;
        }
    }

    $scope.ChangedMedicationPeriodEvent = function ChangedMedicationPeriodEvent() {
        debugger;
        if ($scope.FemaleHistory.WithdrawlBleedID == 1) {
            $scope.IsMedicationDisabled = false;
        } else {
            $scope.IsMedicationDisabled = true;
            $scope.FemaleHistory.MedicationID = 0;

        }
    }


    $scope.MethodOfContraceptionEnabled = function MethodOfContraceptionEnabled() {
        debugger;
        if ($scope.FemaleHistory.ContraID == 1) {
            $scope.IsMethodOfContraceptionEnabled = false;
            $scope.IsDurationEnable = false;      //Added by Nayan Kamble 
            $scope.IsYrEnable = false;                        //Added by Nayan Kamble 
        } else {
            $scope.IsMethodOfContraceptionEnabled = true;
            $scope.IsDurationEnable = true;          //Added by Nayan Kamble 
            $scope.IsYrEnable = true;       //Added by Nayan Kamble 
            $scope.FemaleHistory.MethodOfContraception = 0;
        }
    }

    $scope.SexualDysfunctionChaned = function SexualDysfunctionChaned() {
        if ($scope.FemaleHistory.SexualDysFunctionID == 1) {
            $scope.IsSexualDysfunctionRemarkEnabled = false;
        } else {
            $scope.IsSexualDysfunctionRemarkEnabled = true;
            $scope.FemaleHistory.SexualDysfunctionRemark = null;
        }
    }

    $scope.DyspareuniaChanged = function DyspareuniaChanged() {
        if ($scope.FemaleHistory.DyspareuniaID == 1) {
            $scope.IsDyspareuniaDisabled = false;
        } else {
            $scope.IsDyspareuniaDisabled = true;
            $scope.FemaleHistory.DyspareuniaRemark = null;
        }
    }

    $scope.LubricationUsedChanged = function LubricationUsedChanged() {
        if ($scope.FemaleHistory.LubricationUsedID == 1) {
            $scope.IsLubricationUsedDisabled = false;
        } else {
            $scope.IsLubricationUsedDisabled = true;
            $scope.FemaleHistory.LubricationUsedRemark = null;
        }
    }

    $scope.MenstrualFlowChanged = function MenstrualFlowChanged() {
        if ($scope.FemaleHistory.MFlowID != 1 && $scope.FemaleHistory.MFlowID != 0) {
            $scope.IsMenstrualFlowRemarkDisabled = false;

        } else {
            $scope.IsMenstrualFlowRemarkDisabled = true;
            $scope.FemaleHistory.MenstrualFlowRemark = null;
        }
    }

    /* Medical History events chanegd with Enable and Disabled */
    $scope.MedicalHistoryChangedEvents = function (caseStr, IsTrue) {
        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsCardiacDiseaseDisabled = false;
                } else {
                    $scope.IsCardiacDiseaseDisabled = true;
                    $scope.FemaleHistory.CardiacDiseaseRemark = null;
                }
                break;
            case '2':
                if (IsTrue) {
                    $scope.IsDiabetesDisabled = false;
                } else {
                    $scope.IsDiabetesDisabled = true;
                    $scope.FemaleHistory.DiabetesRemark = null;
                }
                break;
            case '3':
                if (IsTrue) {
                    $scope.IsHypertensionDisabled = false;
                } else {
                    $scope.IsHypertensionDisabled = true;
                    $scope.FemaleHistory.HypertensionRemark = null;
                }
                break;
            case '4':
                if (IsTrue) {
                    $scope.IsThyroidDisorderDisabled = false;
                } else {
                    $scope.IsThyroidDisorderDisabled = true;
                    $scope.FemaleHistory.ThyroidDisorderRemark = null;
                }
                break;
            case '5':
                if (IsTrue) {
                    $scope.IsTuberculosisDisabled = false;
                } else {
                    $scope.IsTuberculosisDisabled = true;
                    $scope.FemaleHistory.TuberculosisRemark = null;
                }
                break;
            case '6':
                if (IsTrue) {
                    $scope.IsPelvicInfectionDisabled = false;
                } else {
                    $scope.IsPelvicInfectionDisabled = true;
                    $scope.FemaleHistory.PelvicInfectionRemark = null;
                }
                break;
            case '7':
                if (IsTrue) {
                    $scope.IsBleedingDisordersDisabled = false;
                } else {
                    $scope.IsBleedingDisordersDisabled = true;
                    $scope.FemaleHistory.BleedingDisordersRemark = null;
                }
                break;
            case '8':
                if (IsTrue) {
                    $scope.IsMalignancyDisabled = false;
                } else {
                    $scope.IsMalignancyDisabled = true;
                    $scope.FemaleHistory.MalignancyRemark = null;
                }
                break;
            case '9':
                if (IsTrue) {
                    $scope.IsOtherDisabled = false;
                } else {
                    $scope.IsOtherDisabled = true;
                    $scope.FemaleHistory.OtherRemark = null;
                }
                break;
            default:

        }
    };

    /* Surgical History events chanegd with Enable and Disabled*/
    $scope.SurgicalHistoryChangedEvents = function (caseStr, IsTrue) {
        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsPelvicSurgeryDisabled = false;
                    $scope.IsPelvicSurgeryAttachDisabled = false;
                } else {
                    $scope.IsPelvicSurgeryDisabled = true;
                    $scope.IsPelvicSurgeryAttachDisabled = true;
                    $scope.FemaleHistory.PelvicSurgeryRemark = null;
                }
                break;
            case '2':
                if (IsTrue) {
                    $scope.IsLaparoscopyDisabled = false;
                    $scope.IsLaparoscopyAttachDisabled = false;
                } else {
                    $scope.IsLaparoscopyDisabled = true;
                    $scope.IsLaparoscopyAttachDisabled = true;
                    $scope.FemaleHistory.LaparoscopyRemarks = null;
                }
                break;
            case '3':
                if (IsTrue) {
                    $scope.IsIsHysteroscopyDisabled = false;
                    $scope.IsIsHysteroscopyAttachDisabled = false;
                } else {
                    $scope.IsIsHysteroscopyDisabled = true;
                    $scope.IsIsHysteroscopyAttachDisabled = true;
                    $scope.FemaleHistory.HysteroscopyRemarks = null;
                }
                break;
            case '4':
                if (IsTrue) {
                    $scope.IsSurgivalOtherDisabled = false;
                    $scope.IsSurgivalOtherAttachDisabled = false;
                } else {
                    $scope.IsSurgivalOtherDisabled = true;
                    $scope.IsSurgivalOtherAttachDisabled = true;
                    $scope.FemaleHistory.SurgivalOtherRemarks = null;
                }
                break;
            default:
        }
    };

    /* Addictions History events chanegd with Enable and Disabled */
    $scope.AddictionsHistoryChangedEvents = function (caseStr, IsTrue) {
        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsSmokingDisabled = false;
                } else {
                    $scope.IsSmokingDisabled = true;
                    $scope.FemaleHistory.SmokingRemarks = null;
                    if (angular.isDefined($scope.Smoking)) {
                        $scope.Smoking.currStatus = 0;
                        $scope.Smoking.SinceWhenYr = 0;
                        $scope.Smoking.SinceWhenMnth = 0;
                        $scope.Smoking.NoOfCig = null;
                        $scope.Smoking.FrequencyID = 0;

                    }
                }
                break;
            case '2':
                if (IsTrue) {
                    $scope.IsAlcoholDisabled = false;
                } else {
                    $scope.IsAlcoholDisabled = true;
                    $scope.FemaleHistory.AlcoholRemark = null;
                    if (angular.isDefined($scope.Alcohol)) {
                        $scope.Alcohol.currStatus = 0;
                        $scope.Alcohol.SinceWhenYr = 0;
                        $scope.Alcohol.SinceWhenMnth = 0;
                        $scope.Alcohol.FrequencyID = 0;
                        $scope.Alcohol.Quantity = null;
                    }
                }
                break;
            case '3':
                if (IsTrue) {
                    $scope.IsTobaccoDisabled = false;
                } else {
                    $scope.IsTobaccoDisabled = true;
                    $scope.FemaleHistory.TobaccoRemark = null;
                    if (angular.isDefined($scope.Tobaco)) {
                        $scope.Tobaco.currStatus = 0;
                        $scope.Tobaco.SinceWhenYr = 0;
                        $scope.Tobaco.SinceWhenMnth = 0;
                        $scope.Tobaco.FrequencyID = 0;
                        $scope.Tobaco.NoOfTobacco = null;
                        $scope.Tobaco.Quantity = null;
                    }
                }
                break;
            case '4':
                if (IsTrue) {
                    $scope.IsAddictionsOtherDisabled = false;
                } else {
                    $scope.IsAddictionsOtherDisabled = true;
                    $scope.FemaleHistory.AddictionsOtherRemark = null;
                }
                break;
            case '5':
                if (IsTrue) {
                    $scope.IsDrugAddictionDisabled = false;
                } else {
                    $scope.IsDrugAddictionDisabled = true;
                 
                    if (angular.isDefined($scope.DrugAddiction)) {
                        $scope.DrugAddiction.currStatus = 0;
                        $scope.DrugAddiction.SinceWhenYr = 0;
                        $scope.DrugAddiction.SinceWhenMnth = 0;
                        $scope.DrugAddiction.FrequencyID = 0;
                        $scope.DrugAddiction.Quantity = null;
                    }
                }
                break;
            case '6':
                if (IsTrue) {
                    $scope.IsCaffeineAddictionDisabled = false;
                } else {
                    $scope.IsCaffeineAddictionDisabled = true;

                    if (angular.isDefined($scope.CaffeineAddiction)) {
                        $scope.CaffeineAddiction.currStatus = 0;
                        $scope.CaffeineAddiction.SinceWhenYr = 0;
                        $scope.CaffeineAddiction.SinceWhenMnth = 0;
                        $scope.CaffeineAddiction.FrequencyID = 0;
                        $scope.CaffeineAddiction.Quantity = null;
                    }
                }
                break;
            default:
        }
    };

    /*
    Vaccination change events enble disable
    */
    $scope.FamilyHistoryVaccinationEvents = function (caseStr, IsTrue) {
        debugger;
        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsATTDisabled = false;
                }
                else {
                    $scope.IsATTDisabled = true;
                    $scope.FemaleHistory.ATTDate = null;
                }
                break;
            case '2':
                if (IsTrue) {
                    $scope.IsChickenpoxDisabled = false;
                }
                else {
                    $scope.IsChickenpoxDisabled = true;
                    $scope.FemaleHistory.ChickenpoxDate = null;
                }
                break;
            case '3':
                if (IsTrue) {
                    $scope.IsHepatitisADisabled = false;
                }
                else {
                    $scope.IsHepatitisADisabled = true;
                    $scope.FemaleHistory.HepatitisADate = null;
                }
                break;

            case '4':
                if (IsTrue) {
                    $scope.IsHepatitisBDisabled = false;
                }
                else {
                    $scope.IsHepatitisBDisabled = true;
                    $scope.FemaleHistory.HepatitisBDate = null;
                }
                break;
            case '5':
                if (IsTrue) {
                    $scope.IsInfluenzaDisabled = false;
                }
                else {
                    $scope.IsInfluenzaDisabled = true;
                    $scope.FemaleHistory.InfluenzaDate = null;
                }
                break;
            case '6':
                if (IsTrue) {
                    $scope.IsMMRDisabled = false;
                }
                else {
                    $scope.IsMMRDisabled = true;
                    $scope.FemaleHistory.MMRDate = null;
                }
                break;
            case '7':
                if (IsTrue) {
                    $scope.IsPolioDisabled = false;
                }
                else {
                    $scope.IsPolioDisabled = true;
                    $scope.FemaleHistory.PolioDate = null;
                }
                break;
            case '8':
                if (IsTrue) {
                    $scope.IsTetanusDisabled = false;
                }
                else {
                    $scope.IsTetanusDisabled = true;
                    $scope.FemaleHistory.TetanusDate = null;
                }
                break;
            case '9':
                if (IsTrue) {
                    $scope.IsCervicalCancerDisabled = false;
                }
                else {
                    $scope.IsCervicalCancerDisabled = true;
                    $scope.FemaleHistory.CervicalCancerDate = null;
                }
                break;
                case '16':
                if (IsTrue) {
                    $scope.isRubellatestDisabled = false;
                }
                else {
                    $scope.isRubellatestDisabled = true;
                    $scope.FemaleHistory.RubbelaTestDate = null;
                }
                break;
                case '17':
                if (IsTrue) {
                    $scope.isSmeartestDisabled = false;
                }
                else {
                    $scope.isSmeartestDisabled = true;
                    $scope.FemaleHistory.SmearTestDate = null;
                }
                break;
        }
    }

    /* Family History events chanegd with Enable and Disabled */
    $scope.FamilyHistoryChangedEvents = function (caseStr, IsTrue) {
        switch (caseStr) {
            case '1':
                if (IsTrue) {
                    $scope.IsFamilyCardiacDiseaseDisabled = false;
                } else {
                    $scope.IsFamilyCardiacDiseaseDisabled = true;
                    $scope.FemaleHistory.DiseaseRelationSelected = [];
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
                    $scope.FemaleHistory.DiabetesRelationSelected = [];
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
                    $scope.FemaleHistory.HypertensionRelationSelected = [];
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
                    $scope.FemaleHistory.ThyroidDisorderRelationSelected = [];
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
                    $scope.FemaleHistory.MalignancyRelationSelected = [];
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
                    $scope.FemaleHistory.IsFamilyOtherRemark = null;
                    $scope.FemaleHistory.OtherRelationSelected = [];
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

    $scope.SocialExerciseChanged = function SocialExerciseChanged() {
        if ($scope.FemaleHistory.ExerciseID == 1) {
            $scope.IsFreqOfExerciseDisabled = false;
        } else {
            $scope.IsFreqOfExerciseDisabled = true;
            $scope.FemaleHistory.FreqOfExerciseID = 0;
        }
    }

    $scope.CaffeinatedBeveragesChanged = function CaffeinatedBeveragesChanged() {
        if ($scope.FemaleHistory.CaffeinatedBeveragesID == 1) {
            $scope.IsCaffeinatedBeveragesDisabled = false;
        } else {
            $scope.IsCaffeinatedBeveragesDisabled = true;
            $scope.FemaleHistory.CaffeinatedBeveragesRemark = null;
        }
    }

    $scope.ExposureToHevyMetalsChanged = function ExposureToHevyMetalsChanged() {
        if ($scope.FemaleHistory.IsExposureToHevyMetals == 1) {
            $scope.IsExposureToHevyMetalsDisabled = false;
        } else {
            $scope.IsExposureToHevyMetalsDisabled = true;
            $scope.FemaleHistory.ExposureToHevyMetalsRemark = null;
        }
    }

    $scope.ExposureToRadiationChanged = function ExposureToRadiationChanged() {
        if ($scope.FemaleHistory.IsExposureToRadiation == 1) {
            $scope.IsExposureToRadiationDisabled = false;
        } else {
            $scope.IsExposureToRadiationDisabled = true;
            $scope.FemaleHistory.ExposureToRadiationRemark = null;
        }
    }

    /* START : Upload multiple files */
    $scope.name = 'World';
    $scope.files = [];
    $scope.upload = function () {

        alert($scope.files.length + " files selected ... Write your Upload Code");

    };
    /* END : Upload multiple files */
    $scope.Validate = function () {
        //var IsValid = true;
        debugger;
     $scope.OHistory = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID != 0 && d.OutcomeID == 0 } );    
     $scope.OHistoryGW = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID != 0 && d.GestationWeeksID == 0 });    
     $scope.OHistoryCS = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID != 0 && d.ChildSexID == 0 && !([1,4,5].indexOf(d.OutcomeID)==-1) });    
     $scope.OHistoryDT = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID != 0 && d.DeliveryTypeID == 0 && !([1,5].indexOf(d.OutcomeID)==-1) });    
     $scope.OHistoryBW = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID != 0 && (d.BirthWeight == '' || d.BirthWeight == undefined) && !([1].indexOf(d.OutcomeID)==-1) });    
     $scope.OHistoryTC = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID != 0 && d.TypeOfConceivingID == 0  && !([1,3,4,5,6].indexOf(d.OutcomeID)==-1) });    
     $scope.OHistoryC = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID != 0 && d.ComplicationsID == 0 && !([1].indexOf(d.OutcomeID)==-1) });    
     $scope.OHistoryCA = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID != 0 && d.CongenitalAnamolyID == 0 && !([1].indexOf(d.OutcomeID)==-1) });    

        

        $scope.PTHistory = $filter('filter')($scope.FemaleHistory.PrevioustTreatmentHistoryItem, function (d) { return d.ARTCycleID != 0 && d.SuccessfulID == 0 });
        $scope.PMHistory = $filter('filter')($scope.FemaleHistory.PastMedicationHistoryItem, function (d) { return (d.DrugeName != undefined && d.DrugeName != null && d.DrugeName != '') && d.MedicationStatusID == 0 });
        $scope.PMHistoryDrugeName = $filter('filter')($scope.FemaleHistory.PastMedicationHistoryItem, function (d) { return (d.DrugeName == undefined || d.DrugeName == null || d.DrugeName == '') });
        $scope.PrevioustTreatmentHistoryList = $filter('filter')( $scope.FemaleHistory.PrevioustTreatmentHistoryItem, function (d) { return (d.ARTCycleID == undefined || d.ARTCycleID == null || d.ARTCycleID == 0) });
        $scope.AllergyValidList = $filter('filter')($scope.lstDrugAllergy, function (d) { return (d.typeofallergyid == 0 || (d.DrugName == 0 || d.DrugeName == '')) });

        $scope.SHistory = $filter('filter')($scope.FemaleHistory.SurgicalHistoryItem , function (d) { return d.TypeOfSurguryID == 0 || d.SurguryDate == undefined || d.SurguryDate == null || d.SurguryDate == '' || d.Remark == undefined || d.Remark == null || d.Remark == ''  });


        //added by neena
        debugger;
        $scope.OutcomeChildSex = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return (d.OutcomeID == 1 || d.OutcomeID == 4 || d.OutcomeID == 5) && d.ChildSexID == 0 });
        $scope.OutcomeAbortionDate = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) {
            return d.OutcomeID == 4 && d.DateOfAbortion == null
        });
        $scope.OutcomeAbortionDateGrater = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) {
            return d.DateOfAbortion > new Date() && d.DateOfAbortion!=null;
        });
        console.log('Date ', $scope.OutcomeAbortionDateGrater);
        $scope.CheckObstetricHistoryItem = [];
        if ($scope.FemaleHistory.ObstetricHistoryItem.length > 1) {
            $scope.CheckObstetricHistoryItem = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.ObstetricYearsID == 0 && d.GestationWeeksID == 0 && d.OutcomeID == 0 && d.DateOfAbortion == null && d.ChildSexID == 0 });   
           }

        //$scope.CheckGestationWeeks = $filter('filter')($scope.FemaleHistory.ObstetricHistoryItem, function (d) { return d.GestationWeeksID == 0 });
        //


        if (!$scope.FemaleHistory.LMPDate ) {
            AlertMessage.info('Please select LMP Date');//Modified by swatih for localization 16/7/2020
            $scope.invalidLMPDate=true;
            return false;
        }   
        if (!$scope.FemaleHistory.CycleDuration || $scope.FemaleHistory.CycleDuration==='' ) {
            AlertMessage.info('Please fill Cycle Duration');//Modified by swatih for localization 16/7/2020
            $scope.invalidCycleDuration=true;
            return false;
        }   
        if (!$scope.FemaleHistory.MenstrualDays || $scope.FemaleHistory.MenstrualDays==='' ) {
            AlertMessage.info('Please fill Menstrual Days');//Modified by swatih for localization 16/7/2020
            $scope.invalidMenstrualDays=true;
            return false;
        }
        if ($scope.FemaleHistory.BloodGroupID == undefined || $scope.FemaleHistory.BloodGroupID == null || $scope.FemaleHistory.BloodGroupID == 0 ) {
            AlertMessage.info('Select Blood Group');//Modified by swatih for localization 16/7/2020
            $scope.invalidBloodGroupID=true;
            return false;
        }
       
        if (!$scope.FemaleHistory.MenstrualRegularityID || $scope.FemaleHistory.MenstrualRegularityID===0 ) {
            $scope.invalidMenstrualRegularityID=true;
            AlertMessage.info('Please select Menstrual Regularity');//Modified by swatih for localization 16/7/2020
            return false;
        }   
         if (!$scope.FemaleHistory.MFlowID || $scope.FemaleHistory.MFlowID===0 ) {
            AlertMessage.info('Please select  Menstrual Flow');//Modified by swatih for localization 16/7/2020
            $scope.invalidMFlowIDs=true;
            return false;
        }
        if (!$scope.FemaleHistory.InRelationSinceYearsID || !$scope.FemaleHistory.InRelationSinceMonthsID ) {
            $scope.invalidInRelationSinceYearsID=true;
            AlertMessage.info('Please select In relationship since');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if (!$scope.FemaleHistory.TrayingToConvinceYearsID || !$scope.FemaleHistory.TrayingToConvinceMonthsID ) {
            $scope.invalidTrayingToConvinceYearsID=true;
            AlertMessage.info('Please select  Trying to conceive since');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if (!$scope.FemaleHistory.MarriedLifeID || $scope.FemaleHistory.MarriedLifeID===0 ) {
            $scope.invalidMarriedLifeID=true;
            AlertMessage.info('Please select  Married Life');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if (!$scope.FemaleHistory.InferTypeID || $scope.FemaleHistory.InferTypeID===0 ) {
            $scope.invalidInferTypeID=true;
            AlertMessage.info('Please select   Infertility Type');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if (!$scope.FemaleHistory.InferTypeID || $scope.FemaleHistory.InferTypeID===0 ) {
            $scope.invalidMenstrualDays=true;
            AlertMessage.info('Please select   Infertility Type');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if (!$scope.FemaleHistory.HistoryOfRecurrentAbortionID) {
            $scope.invalidHistoryOfRecurrentAbortionID=true;
            AlertMessage.info('Please select History Of Recurrent Abortion');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.FemaleHistory.isSurgicalHistory == undefined || $scope.FemaleHistory.isSurgicalHistory == null){
            
            AlertMessage.info('Please fill Surgical History.');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.FemaleHistory.isPrevFertilityTreatment == undefined || $scope.FemaleHistory.isPrevFertilityTreatment == null ){
            
            AlertMessage.info('Please fill Previous Treatment History.');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if($scope.FemaleHistory.isPrevFertilityTreatment=="1" &&   $scope.PrevioustTreatmentHistoryList.length>0)
        {
             AlertMessage.info('Please fill at least one  Previous Treatment History Item.');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.FemaleHistory.isPastFertilityMedication == undefined || $scope.FemaleHistory.isPastFertilityMedication == null){
            
            AlertMessage.info('Please fill Past Medication History.');//Modified by swatih for localization 16/7/2020
            return false;
        }
        if($scope.FemaleHistory.isPastFertilityMedication == 1 &&  $scope.FemaleHistory.PastMedicationHistoryItem.length==0)
        {
             AlertMessage.info('Please fill at least one  Past Medication History Item.');//Modified by swatih for localization 16/7/2020
            return false;
        }



      
        if ($scope.OHistory.length > 0) {
            //AlertMessage.info('Please select outcome if year selected in Obstetric History');//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgPleaseselectoutcomeifyearselectedinObstetricHistory);//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.OHistoryGW.length > 0) {
            //AlertMessage.info('Please select outcome if year selected in Obstetric History');//Commented by swatih for localization 16/7/2020
             AlertMessage.info("'Please select Mandatory Fields if year selected in Obstetric History");//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.OHistoryCS.length > 0) {
            //AlertMessage.info('Please select outcome if year selected in Obstetric History');//Commented by swatih for localization 16/7/2020
             AlertMessage.info("'Please select Mandatory Fields if year selected in Obstetric History");//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.OHistoryDT.length > 0) {
            //AlertMessage.info('Please select outcome if year selected in Obstetric History');//Commented by swatih for localization 16/7/2020
             AlertMessage.info("'Please select Mandatory Fields if year selected in Obstetric History");//Modified by swatih for localization 16/7/2020
            return false;
        }
         if ($scope.OHistoryTC.length > 0) {
            //AlertMessage.info('Please select outcome if year selected in Obstetric History');//Commented by swatih for localization 16/7/2020
            AlertMessage.info("'Please select Mandatory Fields if year selected in Obstetric History");//Modified by swatih for localization 16/7/2020
            return false;
        }
        // if ($scope.OHistoryBW.length > 0) {
        //    //AlertMessage.info('Please select outcome if year selected in Obstetric History');//Commented by swatih for localization 16/7/2020
        //     AlertMessage.info("'Please select Mandatory Fields if year selected in Obstetric History");//Modified by swatih for localization 16/7/2020
        //    return false;
        //}
         if ($scope.OHistoryC.length > 0) {
            //AlertMessage.info('Please select outcome if year selected in Obstetric History');//Commented by swatih for localization 16/7/2020
             AlertMessage.info("'Please select Mandatory Fields if year selected in Obstetric History");//Modified by swatih for localization 16/7/2020
            return false;
        }
         if ($scope.OHistoryCA.length > 0) {
            //AlertMessage.info('Please select outcome if year selected in Obstetric History');//Commented by swatih for localization 16/7/2020
             AlertMessage.info("'Please select Mandatory Fields if year selected in Obstetric History");//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.AllergyValidList.length>0) {
            // AlertMessage.info('Select Allergy Type and Allergy');//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgSelectAllergyTypeandAllergy);//Modified by swatih for localization 16/7/2020
                return false;
        }
        if ($scope.PTHistory.length > 0) {
            // AlertMessage.info('Please select successful status if ART Cycle selected in Previous Treatment History');//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgPleaseselectsuccessfulstatusifARTCycleselectedinPreviousTreatmentHistory);//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.PMHistory.length > 0) {
            // AlertMessage.info('Please select status if Druge Name selected in Past Medication History');//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgPleaseselectstatusifDrugeNameselectedinPastMedicationHistory);//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.PMHistoryDrugeName.length > 0) {
            //AlertMessage.info('Druge Name should not be empty in Past Medication History row');//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgDrugeNameshouldnotbeemptyinPastMedicationHistoryrow);//Modified by swatih for localization 16/7/2020
            return false;
        }
        if ($scope.OutcomeAbortionDateGrater.length > 0) {
             
            //AlertMessage.info('Date Should be Less Then Current Date');//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgDateShouldbeLessThenCurrentDate);//Modified by swatih for localization 16/7/2020
            return false;
        }
        //if ($scope.FemaleHistory.IsCovidVaccinationDone=='Yes' && !$scope.FemaleHistory.CovidVaccinationDate1)
        //{
        //    AlertMessage.info('Please select Covid Vaccination Date 1');
        //    return false;
        // }
        // if ($scope.FemaleHistory.IsCovidVaccinationDone=='No' && !$scope.FemaleHistory.CovidVaccinationRemark)
        //{
        //    AlertMessage.info('Please enter Covid Vaccination Remarks');
        //    return false;
        // }
            //added by neena                                 Removed As per client request .
        //if ($scope.OutcomeChildSex.length > 0) {  
        //    AlertMessage.info('Please select gender');
        //    return false;
        //}
        //if ($scope.OutcomeAbortionDate.length > 0) {
        //    // AlertMessage.info('Please select Date of Abortion');//Commented by swatih for localization 16/7/2020
        //    AlertMessage.info(objResource.msgPleaseselectDateofAbortion);//Modified by swatih for localization 16/7/2020
        //    return false;
        //}
        if ($scope.CheckObstetricHistoryItem != null && $scope.CheckObstetricHistoryItem.length > 0) {
            // AlertMessage.info('Please Enter Obstetric History Details');//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgPleaseEnterObstetricHistoryDetails);//Modified by swatih for localization 16/7/2020
            return false;
        }
            //if ($scope.CheckGestationWeeks.length > 0) {
            //    AlertMessage.info('Please select Gestation Weeks');
            //    return false;
            //}
            //
        if ($scope.FemaleHistory.InRelationSinceYearsID < $scope.FemaleHistory.TrayingToConvinceYearsID) {
            // AlertMessage.info('Trying to concieve since period should be less than In relationship since period');//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgTryingtoconcievesinceperiodshoudbelessthanInrelationshipsinceperiod);//Modified by swatih for localization 16/7/2020
            return false;
        }
      
       //if ($scope.FemaleHistory.InRelationSinceMonthsID < $scope.FemaleHistory.DurationMonthsID) {
       //     AlertMessage.info('Contraception use period should be less than In relationship since period');
       //     return false;
       // }
       
       if ($scope.FemaleHistory.CardiacDiseaseOnMedication == 1 || $scope.FemaleHistory.DiabetesOnMedication == 1 || $scope.FemaleHistory.ThyroidDisorderOnMedication == 1
            || $scope.FemaleHistory.MalignancyOnMedication == 1 || $scope.FemaleHistory.TuberculosisOnMedication == 1 || $scope.FemaleHistory.TuberculosisOnMedication == 1
            || $scope.FemaleHistory.BleedingDisordersOnMedication == 1 || $scope.FemaleHistory.EpilepsyOnMedication == 1
            || $scope.FemaleHistory.HaemoglobinDeficiencyOnMedication == 1 || $scope.FemaleHistory.MHOtherDiseaseOnMedication == 1
            || $scope.FemaleHistory.RespiratoryOnMedication == 1 || $scope.FemaleHistory.SLEOnMedication == 1)
        {
            if ($scope.FemaleHistory.PastMedicationHistoryItem.length == 0) {
                //AlertMessage.info('Enter Past Medication to capture Medical History');
                AlertMessage.info(objResource.msgEnterPastMedicationtocaptureMedicalHistory);
                return false;
            }
            if ($scope.FemaleHistory.InRelationSinceYearsID == $scope.FemaleHistory.TrayingToConvinceYearsID) {
                if ($scope.FemaleHistory.InRelationSinceMonthsID < $scope.FemaleHistory.TrayingToConvinceMonthsID) {
                   // AlertMessage.info('Trying to concieve since period should be less than In relationship since period');//Commented by swatih for localization 16/7/2020
                    AlertMessage.info(objResource.msgTryingtoconcievesinceperiodshoudbelessthanInrelationshipsinceperiod);//Modified by swatih for localization 16/7/2020
                    return false;
                }
                //else
                //    return true;

            }
            //else {
            //    return true;
            //}
       }
       if ($scope.FemaleHistory.InRelationSinceYearsID == $scope.FemaleHistory.TrayingToConvinceYearsID) {
           if ($scope.FemaleHistory.InRelationSinceMonthsID < $scope.FemaleHistory.TrayingToConvinceMonthsID) {
               //AlertMessage.info('Trying to concieve since period should be less than In relationship since period');//Commented by swatih for localization 16/7/2020
               AlertMessage.info(objResource.msgTryingtoconcievesinceperiodshoudbelessthanInrelationshipsinceperiod);//Modified by swatih for localization 16/7/2020
               return false;
           }
           //else
           //    return true;

       }
       if($scope.FemaleHistory.isSurgicalHistory==1)
       {
            if($scope.FemaleHistory.SurgicalHistoryItem.length == 0 && $scope.FemaleHistory.IsPelvicSurgery !== true && $scope.FemaleHistory.IsLaparoscopy !== true && $scope.FemaleHistory.IsHysteroscopy !== true && $scope.FemaleHistory.IsSurgivalOther !== true )
            {
                AlertMessage.info('Please fill at least one  Surgical History Item.');//Modified by swatih for localization 16/7/2020
                return false;
            }
            else 
            {
                if($scope.FemaleHistory.IsPelvicSurgery == true && ($scope.FemaleHistory.PelvicSurgeryRemark =="" || $scope.FemaleHistory.PelvicSurgeryRemark == null || $scope.FemaleHistory.PelvicSurgeryRemark ==undefined) )
                {
                     AlertMessage.info('Please fill Pelvic Surgery Remark.');
                    return false;
                }
                if( $scope.FemaleHistory.IsLaparoscopy == true && ($scope.FemaleHistory.LaparoscopyRemarks =="" || $scope.FemaleHistory.LaparoscopyRemarks == null || $scope.FemaleHistory.LaparoscopyRemarks ==undefined) )
                {
                     AlertMessage.info('Please fill Laparoscopy Remark.');
                    return false;
                }
                if( $scope.FemaleHistory.IsHysteroscopy == true && ($scope.FemaleHistory.HysteroscopyRemarks =="" || $scope.FemaleHistory.HysteroscopyRemarks == null || $scope.FemaleHistory.HysteroscopyRemarks ==undefined) )
                {
                     AlertMessage.info('Please fill Hysteroscopy Remark.');
                    return false;
                }
                if($scope.FemaleHistory.IsSurgivalOther == true && ($scope.FemaleHistory.SurgivalOtherRemarks =="" || $scope.FemaleHistory.SurgivalOtherRemarks == null || $scope.FemaleHistory.SurgivalOtherRemarks == undefined) )
                {
                     AlertMessage.info('Please fill  Surgery Other Remark.');
                    return false;
                }
                if ($scope.SHistory.length>0)
                {
                    AlertMessage.info('Please fill  Mandatory Fileds in Surgical History item.');
                    return false;
                }
                
            }
       }
       if($scope.FemaleHistory.SleepID == undefined || $scope.FemaleHistory.SleepID == null | $scope.FemaleHistory.SleepID == 0)
       {
                    AlertMessage.info('Please select  Sleep  in Social History.');
                    $scope.frmFemaleHistory.SleepID.$dirty=true;
                    return false;
       }
       if($scope.FemaleHistory.ExerciseID == undefined || $scope.FemaleHistory.ExerciseID == null || $scope.FemaleHistory.ExerciseID == 0)
       {
                    AlertMessage.info('Please select  Exercise  in Social History.');
                    $scope.frmFemaleHistory.ExerciseID.$dirty=true;
                    return false;
       }
       if(($scope.FemaleHistory.FreqOfExerciseID == undefined || $scope.FemaleHistory.FreqOfExerciseID == null || $scope.FemaleHistory.FreqOfExerciseID == 0) && $scope.FemaleHistory.ExerciseID==1)
       {
                    AlertMessage.info('Please select  Frequency Of Exercise  in Social History.');
                    $scope.frmFemaleHistory.FreqOfExerciseID.$dirty=true;
                    return false;
       }
        
           return true
        
    }
    /* Operations */
    $scope.InsertFemaleHistory = function InsertFemaleHistory(FemaleHistory) {
    
        debugger;
        if ($scope.Validate()) {
            $scope.FemaleHistory.PelvicSurgeryImages = [];
            $scope.FemaleHistory.LaparoscopyImages = [];
            $scope.FemaleHistory.HysteroscopyImages = [];
            $scope.FemaleHistory.SurgivalOtherImages = [];
            for (var Index = 0; Index < $scope.FemaleHistory.PelvicSurgery.model.length; Index++) {
                $scope.FemaleHistory.PelvicSurgeryImages.push($scope.FemaleHistory.PelvicSurgery.model[Index])
            }

            for (var Index = 0; Index < $scope.FemaleHistory.Laparoscopy.model.length; Index++) {
                $scope.FemaleHistory.LaparoscopyImages.push($scope.FemaleHistory.Laparoscopy.model[Index])
            }

            for (var Index = 0; Index < $scope.FemaleHistory.Hysteroscopy.model.length; Index++) {
                $scope.FemaleHistory.HysteroscopyImages.push($scope.FemaleHistory.Hysteroscopy.model[Index])
            }

            for (var Index = 0; Index < $scope.FemaleHistory.SurgivalOther.model.length; Index++) {
                $scope.FemaleHistory.SurgivalOtherImages.push($scope.FemaleHistory.SurgivalOther.model[Index])
            }

            //$scope.FemaleHistoryInsertionValidation(FemaleHistory);
            //if ($scope.IsGestationWeeksValid || $scope.IsOutcomeValid || $scope.IsDrugNameValid || $scope.IsStatusValid) {
            //    AlertMessage.warning(objResource.msgTitle, 'Please fill all mandatory fields');
            //} else {
            if (!angular.isUndefined($scope.FemaleHistory.LMPDate)) {
                $scope.FemaleHistory.LMPDate = $filter('date')($scope.FemaleHistory.LMPDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.ATTDate)) {
                $scope.FemaleHistory.ATTDate = $filter('date')($scope.FemaleHistory.ATTDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.CardSinceWhenMnth)) {
                $scope.FemaleHistory.CardSinceWhenMnth = $filter('date')($scope.FemaleHistory.CardSinceWhenMnth, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }

            if (!angular.isUndefined($scope.FemaleHistory.MalignancySinceWhenMnth)) {
                $scope.FemaleHistory.MalignancySinceWhenMnth = $filter('date')($scope.FemaleHistory.MalignancySinceWhenMnth, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }

            if (!angular.isUndefined($scope.FemaleHistory.TuberculosisSinceWhenMnth)) {
                $scope.FemaleHistory.TuberculosisSinceWhenMnth = $filter('date')($scope.FemaleHistory.TuberculosisSinceWhenMnth, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }

            if (!angular.isUndefined($scope.FemaleHistory.PelvicInfectionSinceWhenMnth)) {
                $scope.FemaleHistory.PelvicInfectionSinceWhenMnth = $filter('date')($scope.FemaleHistory.PelvicInfectionSinceWhenMnth, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }

            if (!angular.isUndefined($scope.FemaleHistory.BleedingDisordersSinceWhenMnth)) {
                $scope.FemaleHistory.BleedingDisordersSinceWhenMnth = $filter('date')($scope.FemaleHistory.BleedingDisordersSinceWhenMnth, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }


            if (!angular.isUndefined($scope.FemaleHistory.ChickenpoxDate)) {
                $scope.FemaleHistory.ChickenpoxDate = $filter('date')($scope.FemaleHistory.ChickenpoxDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.HepatitisADate)) {
                $scope.FemaleHistory.HepatitisADate = $filter('date')($scope.FemaleHistory.HepatitisADate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            } if (!angular.isUndefined($scope.FemaleHistory.HepatitisBDate)) {
                $scope.FemaleHistory.HepatitisBDate = $filter('date')($scope.FemaleHistory.HepatitisBDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.InfluenzaDate)) {
                $scope.FemaleHistory.InfluenzaDate = $filter('date')($scope.FemaleHistory.InfluenzaDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.MMRDate)) {
                $scope.FemaleHistory.MMRDate = $filter('date')($scope.FemaleHistory.MMRDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.InfluenzaDate)) {
                $scope.FemaleHistory.InfluenzaDate = $filter('date')($scope.FemaleHistory.InfluenzaDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.PolioDate)) {
                $scope.FemaleHistory.PolioDate = $filter('date')($scope.FemaleHistory.PolioDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.TetanusDate)) {
                $scope.FemaleHistory.TetanusDate = $filter('date')($scope.FemaleHistory.TetanusDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
            if (!angular.isUndefined($scope.FemaleHistory.CervicalCancerDate)) {
                $scope.FemaleHistory.CervicalCancerDate = $filter('date')($scope.FemaleHistory.CervicalCancerDate, 'medium');
                //$scope.FemaleHistory.LMPDate = new Date($scope.FemaleHistory.LMPDate);
            }
           

            if($scope.FemaleHistory.IsCovidVaccinationDone=='Yes')
            {
                if (!angular.isUndefined($scope.FemaleHistory.CovidVaccinationDate1)) {
                $scope.FemaleHistory.CovidVaccinationDate1 = $filter('date')($scope.FemaleHistory.CovidVaccinationDate1, 'medium');
                }
                if (!angular.isUndefined($scope.FemaleHistory.CovidVaccinationDate2)) {
                     $scope.FemaleHistory.CovidVaccinationDate2 = $filter('date')($scope.FemaleHistory.CovidVaccinationDate2, 'medium');
                }
                if (!angular.isUndefined($scope.FemaleHistory.CovidVaccinationDate3)) {
                $scope.FemaleHistory.CovidVaccinationDate3 = $filter('date')($scope.FemaleHistory.CovidVaccinationDate3, 'medium');
                }
                $scope.FemaleHistory.CovidVaccinationRemark = null;

            }
            else
            {
                $scope.FemaleHistory.CovidVaccinationDate1 = null;
                $scope.FemaleHistory.CovidVaccinationDate2 = null;
                $scope.FemaleHistory.CovidVaccinationDate3 = null;
            }
            if($scope.FemaleHistory.IsRubbelaTestDone)
            {
                if (!angular.isUndefined($scope.FemaleHistory.RubbelaTestDate)) {
                    $scope.FemaleHistory.RubbelaTestDate = $filter('date')($scope.FemaleHistory.RubbelaTestDate, 'medium');
                }
            }
            else
            {
                 $scope.FemaleHistory.RubbelaTestDate = null;
            }

            if($scope.FemaleHistory.IsSmearTestDone)
            {
                if (!angular.isUndefined($scope.FemaleHistory.IsSmearTestDone)) {
                    $scope.FemaleHistory.IsSmearTestDone = $filter('date')($scope.FemaleHistory.IsSmearTestDone, 'medium');
                }
            }
            else
            {
                $scope.FemaleHistory.IsSmearTestDone = null;
            }
            
            //For Allergy
            //if (angular.isDefined($scope.foodAllergy.Food) && $scope.foodAllergy.Food != null)
            //    $scope.foodAllergy.IsFood = true;
            //else $scope.foodAllergy.IsFood = false;
            //$scope.foodAllergy.IsSkin = false;
            //$scope.foodAllergy.IsSmoke = false;
            //$scope.foodAllergy.IsLatex = false;
            //$scope.foodAllergy.IsAllergy = false;

            //$scope.skinAllergy.IsFood = false;
            //if (angular.isDefined($scope.skinAllergy.Skin) && $scope.skinAllergy.Skin != null)
            //    $scope.skinAllergy.IsSkin = true;
            //else $scope.skinAllergy.IsSkin = false;
            //$scope.skinAllergy.IsSmoke = false;
            //$scope.skinAllergy.IsLatex = false;
            //$scope.skinAllergy.IsAllergy = false;

            //$scope.smokeAllergy.IsFood = false;
            //$scope.smokeAllergy.IsSkin = false;
            //if (angular.isDefined($scope.smokeAllergy.Smoke) && $scope.smokeAllergy.Smoke != null)
            //    $scope.smokeAllergy.IsSmoke = true;
            //else $scope.smokeAllergy.IsSmoke = false;
            //$scope.smokeAllergy.IsLatex = false;
            //$scope.smokeAllergy.IsAllergy = false;

            //$scope.latexAllergy.IsFood = false;
            //$scope.latexAllergy.IsSkin = false;
            //$scope.latexAllergy.IsSmoke = false;
            //if (angular.isDefined($scope.latexAllergy.Latex) && $scope.latexAllergy.Latex != null)
            //    $scope.latexAllergy.IsLatex = true;
            //else $scope.latexAllergy.IsLatex = false;
            //$scope.latexAllergy.IsAllergy = false;

            $scope.lstAllergyDetail = [];
            $scope.lstAllergyDetail = angular.copy($scope.lstDrugAllergy);
            // $scope.lstAllergyDetail.push($scope.foodAllergy);
            // $scope.lstAllergyDetail.push($scope.skinAllergy);
            // $scope.lstAllergyDetail.push($scope.smokeAllergy);
            //$scope.lstAllergyDetail.push($scope.latexAllergy);
            console.log("Before ", $scope.lstAllergyDetail)
            FemaleHistory.lstAllergyDetail = $scope.lstAllergyDetail;
            //For Allergy End
            $scope.FemaleHistory.ObstetricHistoryItem.forEach(function (x) {
                x.DateOfAbortion = angular.isDate(x.DateOfAbortion) ? $filter('date')(x.DateOfAbortion, 'medium') : null;
            });
            $scope.FemaleHistory.lstAdictionDetail = [];
            $scope.Smoking.IsSmoking = $scope.FemaleHistory.IsSmoking; $scope.Alcohol.IsAlcohol = $scope.FemaleHistory.IsAlcohol;
            $scope.Tobaco.IsTobaco = $scope.FemaleHistory.IsTobacco;
            $scope.DrugAddiction.IsDrugAddiction = $scope.FemaleHistory.IsDrugAddiction;
            $scope.CaffeineAddiction.IsCaffeineAddiction = $scope.FemaleHistory.IsCaffeineAddiction;
            $scope.FemaleHistory.lstAdictionDetail.push($scope.Smoking);
            $scope.FemaleHistory.lstAdictionDetail.push($scope.Alcohol);
            $scope.FemaleHistory.lstAdictionDetail.push($scope.Tobaco);
            $scope.FemaleHistory.lstAdictionDetail.push($scope.DrugAddiction);
            $scope.FemaleHistory.lstAdictionDetail.push($scope.CaffeineAddiction);
            //ashishss
            debugger;
            if (selectPatient.VisitID > $scope.FemaleHistory.VisitID) {
              
                $scope.FemaleHistory.FHID =null;
                $scope.FemaleHistory.VisitID = selectPatient.VisitID;
                $scope.FemaleHistory.lstAllergyDetail.forEach(function(x) {
                    x.AllergyID = 0;
                });
                $scope.FemaleHistory.ObstetricHistoryItem.forEach(function (x) {
                    x.ObstetricHistoryID = 0;
                });
                 $scope.FemaleHistory.lstAdictionDetail.forEach(function (x) {
                    x.ID = 0;
                 });
                 $scope.FemaleHistory.PrevioustTreatmentHistoryItem.forEach(function (x) {
                     x.PreTreatmentID = 0;
                 });
                 $scope.FemaleHistory.PastMedicationHistoryItem.forEach(function(x) {
                     x.PastMedicationID = 0;
            });
              
                
              
                
               
            
        }
            var ResponseData = FemaleHistoryService.InsertFemaleHistory(FemaleHistory);
            ResponseData.then(function (Response) {
                if (Response.data > 0 && Response.data == 1) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $location.path('/FemaleHistory/');
                    //$scope.SetAllControls();
            }
                if (Response.data > 0 && Response.data == 2) {
                    $location.path('/FemaleHistory/');
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    //  $scope.SetAllControls();
            }
                // $rootScope.FormName = 'Female Dashboard';
                //$location.path("/EMRLandingPage");
            }, function (error) {
                $scope.Error = error;
        });
            // }
        }

        //else
        //{
       
        //    AlertMessage.warning(objResource.msgTitle, objResource.msgFillallmandatoryfields);
        //    return;
        //}
    }

    $scope.CancelFemaleHistory = function CancelFemaleHistory() {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    }

    /* Validations */
    $scope.FemaleHistoryInsertionValidation = function FemaleHistoryInsertionValidation(FemaleHistory) {
        debugger;
        if ($scope.FemaleHistory.ObstetricHistoryItem.length > 0) {
            for (var Index = 0; Index < $scope.FemaleHistory.ObstetricHistoryItem.length; Index++) {
                if ($scope.FemaleHistory.ObstetricHistoryItem[Index].GestationWeeksID == 0) {
                    $scope.IsGestationWeeksValid = true;
                    $scope.frmFemaleHistory.ddlGestationWeeksID.$dirty = true;
                } else {
                    $scope.IsGestationWeeksValid = false;
                    $scope.frmFemaleHistory.ddlGestationWeeksID.$dirty = false;
                }
                if ($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID == 0) {
                    $scope.IsOutcomeValid = true;
                    $scope.frmFemaleHistory.ddlOutcomeID.$dirty = true;
                } else {
                    $scope.IsOutcomeValid = false;
                    $scope.frmFemaleHistory.ddlOutcomeID.$dirty = false;
                }
                 if ($scope.FemaleHistory.ObstetricHistoryItem[Index].ChildSexID == 0 && !([1,4,5].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1)) {
                    $scope.IsChildSexValid = true;
                    $scope.frmFemaleHistory.ddlChildSex.$dirty = true;
                    AlertMessage.info('Please select Gender if year selected in Obstetric History')
                } else {
                    $scope.IsChildSexValid = false;
                    $scope.frmFemaleHistory.ddlChildSex.$dirty = false;
                }
                  if ($scope.FemaleHistory.ObstetricHistoryItem[Index].DeliveryTypeID == 0 && !([1,2,5].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1)) {
                    $scope.IsDeliveryTypeIDValid  = true;
                    $scope.frmFemaleHistory.ddlDeliveryTypeID.$dirty = true;
                    AlertMessage.info('Please select Delivery Type if year selected in Obstetric History')
                } else {
                    $scope.IsDeliveryTypeIDValid  = false;
                    $scope.frmFemaleHistory.ddlDeliveryTypeID.$dirty = false;
                }
                  if ($scope.FemaleHistory.ObstetricHistoryItem[Index].DeliveryID == 0 && !([1,2,5].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1))  {
                    $scope.isDeliveryIDValid  = true;
                    $scope.frmFemaleHistory.ddlDeliveryID.$dirty = true;
                    AlertMessage.info('Please select Delivery if year selected in Obstetric History')
                } else {
                    $scope.isDeliveryIDValid  = false;
                    $scope.frmFemaleHistory.ddlDeliveryID.$dirty = false;
                }
                  if ($scope.FemaleHistory.ObstetricHistoryItem[Index].TypeOfConceivingID == 0 && !([1,2,5].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1)) {
                    $scope.IsTypeOfConceivingIDValid = true;
                    $scope.frmFemaleHistory.ddlTypeOfConceivingID.$dirty = true;
                    AlertMessage.info('Please select Type Of Conceiving if year selected in Obstetric History')
                } else {
                    $scope.IsTypeOfConceivingIDValid = false;
                    $scope.frmFemaleHistory.ddlTypeOfConceivingID.$dirty = false;
                }
                //if ($scope.FemaleHistory.ObstetricHistoryItem[Index].TypeOfConceivingID == 0 && [1,4,5].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1) {
                //    $scope.IsTypeOfConceivingIDValid = true;
                //    $scope.frmFemaleHistory.ddlTypeOfConceivingID.$dirty = true;
                //} else {
                //    $scope.IsTypeOfConceivingIDValid = false;
                //    $scope.frmFemaleHistory.ddlTypeOfConceivingID.$dirty = false;
                //}
                if (($scope.FemaleHistory.ObstetricHistoryItem[Index].BirthWeight == '' || !$scope.FemaleHistory.ObstetricHistoryItem[Index].BirthWeight ) && !([0,2,3,4,5,6].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1)) {
                    $scope.IsBirthWeightValid = true;
                    $scope.frmFemaleHistory.ddlBirthWeight.$dirty = true;
                    AlertMessage.info('Please select Birth Weight if year selected in Obstetric History')
                } else {
                    $scope.IsBirthWeightValid = false;
                    $scope.frmFemaleHistory.ddlBirthWeight.$dirty = false;
                }
                 if ($scope.FemaleHistory.ObstetricHistoryItem[Index].ComplicationsID == 0 && !([0,2,3,4,5,6].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1)) {
                    $scope.IsComplicationsIDValid = true;
                    $scope.frmFemaleHistory.ddlComplicationsID.$dirty = true;
                    AlertMessage.info('Please select Birth Weight if year selected in Obstetric History')
                } else {
                    $scope.IsComplicationsIDValid = false;
                    $scope.frmFemaleHistory.ddlComplicationsID.$dirty = false;
                }
                 if ($scope.FemaleHistory.ObstetricHistoryItem[Index].ddlContraceptionID == 0 && !([0,2,3,4,5,6].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1)) {
                    $scope.IsContraceptionIDValid = true;
                    $scope.frmFemaleHistory.ddlContraceptionID.$dirty = true;
                    AlertMessage.info('Please select Complications if year selected in Obstetric History')
                } else {
                    $scope.IsContraceptionIDValid = false;
                    $scope.frmFemaleHistory.ddlContraceptionID.$dirty = false;
                }
                 if ($scope.FemaleHistory.ObstetricHistoryItem[Index].CongenitalAnamolyID == 0 && [1].indexOf($scope.FemaleHistory.ObstetricHistoryItem[Index].OutcomeID)==-1) {
                    $scope.IsCongenitalAnamolyIDValid = true;
                    $scope.frmFemaleHistory.ddlCongenitalAnamolyID.$dirty = true;
                    AlertMessage.info('Please select Congenital Anamoly if year selected in Obstetric History')
                } else {
                    $scope.IsCongenitalAnamolyIDValid = false;
                    $scope.frmFemaleHistory.ddlCongenitalAnamolyID.$dirty = false;
                }
            }
        } else {
            $scope.IsGestationWeeksValid = true;
            $scope.IsOutcomeValid = true;
            $scope.frmFemaleHistory.ddlGestationWeeksID.$dirty = true;
            $scope.frmFemaleHistory.ddlOutcomeID.$dirty = true;
        }

        if ($scope.FemaleHistory.PastMedicationHistoryItem.length > 0) {
            for (var Index = 0; Index < $scope.FemaleHistory.PastMedicationHistoryItem.length; Index++) {
                if ($scope.FemaleHistory.PastMedicationHistoryItem[Index].DrugeName == undefined || $scope.FemaleHistory.PastMedicationHistoryItem[Index].DrugeName == "") {
                    $scope.IsDrugNameValid = true;
                    $scope.frmFemaleHistory.DrugeName.$dirty = true;
                } else {
                    $scope.IsDrugNameValid = false;
                    $scope.frmFemaleHistory.DrugeName.$dirty = false;
                }
                if ($scope.FemaleHistory.PastMedicationHistoryItem[Index].MedicationStatusID == 0) {
                    $scope.IsStatusValid = true;
                    $scope.frmFemaleHistory.MedicationStatusID.$dirty = true;
                } else {
                    $scope.IsStatusValid = false;
                    $scope.frmFemaleHistory.MedicationStatusID.$dirty = false;
                }
            }
        } else {
            $scope.IsDrugNameValid = true;
            $scope.IsStatusValid = true;
            $scope.frmFemaleHistory.DrugeName.$dirty = true;
            $scope.frmFemaleHistory.MedicationStatusID.$dirty = true;
        }

    }

    /* START : View */
    $scope.GoToMaleView = function GoToMaleView() {
        $rootScope.FormName = 'Male History';
        $location.path("/MaleHistory/");
    }
    $scope.btnClick = function () {

       // if (selectPatient.PatientCategoryID == 7) {
            if (selectPatient.GenderID == 1) {

                selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                selectPatient.Gender = 'Female';
                selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.FemalePatientName;
                selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID
                selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID
                Common.setSelectedPatient(selectPatient);
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {

                    $scope.btnText = 'Male History';
                })
                $rootScope.FormName = 'Female History'
                $scope.Str = 'MaleHistory/';
                if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                }
                else
                    $location.path($scope.Str);

            }
            else if (selectPatient.GenderID == 2) {

                $rootScope.IsFemaleActive = false;
                $rootScope.IsMaleActive = true;
                selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                selectPatient.Gender = 'Male';
                selectPatient.PatientName = $rootScope.CoupleDetails.FemalePatient.MalePatientName;
                if ($rootScope.CoupleDetails.MalePatient.Selectedvisit != null && !angular.isUndefined($rootScope.CoupleDetails.MalePatient.Selectedvisit)) {
                    selectPatient.VisitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID;
                    selectPatient.VisitUnitID = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID;
                }
                else {
                    selectPatient.VisitID = null;
                    selectPatient.VisitUnitID = null;
                }
        
                Common.setSelectedPatient(selectPatient);
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {

                    $scope.btnText = 'Female History';
                })
                $rootScope.FormName = 'Male History'
                $scope.Str = 'MaleHistory/';
                if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                }
                else
                    $location.path($scope.Str);


          //  }
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
                           
                            //$rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            //$rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
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
                            if ($rootScope.CoupleDetails.MalePatient.Selectedvisit != null) {
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;

                            }
                            else {
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            }
                            //$rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            //$rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
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
        debugger;
        var lstUserRights = Common.getUserRights();
        debugger;
        if (selectPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 313 && lstUserRights[z].Active)//Male History
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
        if (!$scope.objRgt.IsCreate && (angular.isUndefined($scope.FemaleHistory.FHID) || $scope.FemaleHistory.FHID == 0)) {
            angular.element(btnSaveUpdateHistory).prop('disabled', true);
            angular.element(btnAddObstetricHistoryRow).prop('disabled', true);
            angular.element(btnAddPrevioustTreatmentHistoryRow).prop('disabled', true);
            angular.element(btnAddPastMedicationHistoryRow).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && $scope.FemaleHistory.FHID > 0) {
            angular.element(btnSaveUpdateHistory).prop('disabled', true);
            angular.element(btnAddObstetricHistoryRow).prop('disabled', true);
            angular.element(btnAddPrevioustTreatmentHistoryRow).prop('disabled', true);
            angular.element(btnAddPastMedicationHistoryRow).prop('disabled', true);
        }
        else {
            angular.element(btnSaveUpdateHistory).prop('disabled', false);
            angular.element(btnAddObstetricHistoryRow).prop('disabled', false);
            angular.element(btnAddPrevioustTreatmentHistoryRow).prop('disabled', false);
            angular.element(btnAddPastMedicationHistoryRow).prop('disabled', false);
        }


    }

    $scope.SelectedDrugToolTip = "";
    $scope.lstDrugAllergy = [];
    $scope.fClick = function (i) {
        if (i.ticked) {
            var obj = {};
            obj.DrugName = i.Description;
            obj.DrugID = i.ID;
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
            obj.IsAllergy = true;
            obj.lstYr = $scope.MainDurationYearsList;
            obj.lstMnth = $scope.DurationMonthsList;
            obj.lstYesNo = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Present' }, { ID: 2, Description: 'Absent' }];
            obj.lstSeverity = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Mild' }, { ID: 2, Description: 'Moderate' }, { ID: 3, Description: 'Severe' }];
            $scope.lstDrugAllergy.push(obj);
        }
        else {
            var idx = $scope.lstDrugAllergy.findIndex(function (z) { return z.DrugName == i.Description });
            $scope.lstDrugAllergy.splice(idx, 1);
        }

        //added by neena
        if ($scope.lstDrugAllergy.length > 0) {
            debugger;
            $scope.SelectedDrugToolTip = "";
            for (var j = 0; j <= $scope.lstDrugAllergy.length - 1; j++) {
                if ($scope.SelectedDrugToolTip.length == 0)
                    $scope.SelectedDrugToolTip = $scope.lstDrugAllergy[j].DrugName;
                else
                    $scope.SelectedDrugToolTip = $scope.SelectedDrugToolTip + ',' + $scope.lstDrugAllergy[j].DrugName;
            }
        }
        else
            $scope.SelectedDrugToolTip = "";
        //
    }

    $scope.fSelectAll = function () {
        $scope.DrugsNameList.forEach(function (x) {
            $scope.fClick(x);
        })
    }
    $scope.fSelectNone = function () {
        $scope.lstDrugAllergy.length = 0;
        $scope.SelectedDrugToolTip = ""; //added by neena
    }

    $scope.getHistoryList = function () {
        debugger;
        var promise = FemaleHistoryService.getHistoryList();
        
        promise.then(function (resp) {
            console.log("4724", resp)   
            $scope.lstHistory = resp.data;
        }, function (error) {
        debugger
        })
    }

    $scope.viewHistory = function (HID, UnitID) {
      
        debugger;
        if (!angular.isUndefined($scope.FemaleHistory.DrugsNameSelected) && $scope.FemaleHistory.DrugsNameSelected != null) {
            angular.forEach($scope.FemaleHistory.DrugsNameSelected, (function (x) {
                for (var j = 0; j <= $scope.DrugsNameList.length - 1; j++) {
                    if ($scope.DrugsNameList[j].ID == x.ID) {
                        $scope.DrugsNameList[j].ticked = false;
                    }
                }
            }))
            //debugger;
            if (!angular.isUndefined($scope.FemaleHistory.DrugsNameSelected)) {
                $scope.FemaleHistory.DrugsNameSelected.length = 0;
            }
        }
        $scope.SetAllControls(HID, UnitID,0);
        angular.element(previousHistory).modal('hide');
    }

    $scope.checkDateofAbortion = function (date, idx) {
        debugger;

        var date1 = $scope.FemaleHistory.ObstetricHistoryItem[idx].ObstetricYearsID;  
      
        $scope.Savedyear = $filter('filter')($scope.ObstetricYears, function (d) { return (d.ID == date1) });
        //  $scope.Savedyear = $filter('date')($scope.ObstetricYears,'yyyy');
        var desc = $scope.Savedyear[0].Description;
        var abtYear = $filter('date')(date, 'yyyy');
        if (abtYear==null) {
            //AlertMessage.info('PalashIVF', 'Please select the date')//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgPleaseselectthedate);//Modified by swatih for localization 16/7/2020
            $scope.FemaleHistory.ObstetricHistoryItem[idx].DateOfAbortion = null;
        }
        else if (abtYear < desc) {
           // AlertMessage.info('PalashIVF', 'Date is less than selected year.')//Commented by swatih for localization 16/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgDateislessthanselectedyear);//Modified by swatih for localization 16/7/2020
            $scope.FemaleHistory.ObstetricHistoryItem[idx].DateOfAbortion = null;
        }
        //  else alert('less');

        ////var year = new Date().getFullYear();
        //if ($scope.Savedyear.Description < date){
        //    date = null;
        //    AlertMessage.info('PalashIVF', 'Date of Abortion should be less than todays date.')
        //    $scope.FemaleHistory.ObstetricHistoryItem[idx].DateOfAbortion = null;
        //}


        //if ($filter('date')(date, 'dd-MMM-yyyy') > $filter('date')(new Date(), 'dd-MMM-yyyy')) {
        //    date = null;
        //    AlertMessage.info('PalashIVF', 'Date of Abortion should be less than todays date.')
        //    $scope.FemaleHistory.ObstetricHistoryItem[idx].DateOfAbortion = null;
        //}
    }

    //$scope.DisableEnableAbortionDatePicker = function (OutcomeID) {
    //    debugger;
    //    $scope.AbortionValid = true;
    //    if (OutcomeID == 4) {
    //        $scope.AbortionValid = false;
    //    }
    //    return $scope.AbortionValid;
    //}


    $scope.ValidateValue = function (value) {
        debugger;
        $scope.isHaemoglobinDeficiencyValuValid = false;
        if (value != undefined && (value < 12 || value > 15.5)) {
            $scope.isHaemoglobinDeficiencyValuValid = true;
        }
    }


    $scope.AddSurgicalHistoryRow = function () {
        debugger;
        if ($scope.FemaleHistory.SurgicalHistoryItem == null) $scope.FemaleHistory.SurgicalHistoryItem = [];
        $scope.FemaleHistory.SurgicalHistoryItem.push({
            'TypeOfSurguryID': 0,
            'SurguryDate': new Date(),
            'PerformedAtRemark': '',
            'FindingsRemark': '',
            'Remark': '',
            'SHAttachment': []
            

        });
    }
    $scope.RemoveSurgicalHistoryRow = function (Index) {
        debugger;

        $scope.FemaleHistory.SurgicalHistoryItem.splice(Index, 1);

    };

   
    $scope.opensurgical = function ($event, popup6) {
        debugger;
        $event.preventDefault();
        $event.stopPropagation();
        popup6.opened = true;

    };
});

PIVF.directive('restrictTo', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var re = RegExp(attrs.restrictTo);
            var exclude = /Backspace|Enter|Tab|Delete|Del|ArrowUp|Up|ArrowDown|Down|ArrowLeft|Left|ArrowRight|Right/;

            element[0].addEventListener('keydown', function (event) {
                if (!exclude.test(event.key) && !re.test(event.key)) {
                    event.preventDefault();
                }
            });
        }
    }
});

PIVF.directive('allowDecimalNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                //
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
                    //console.log('If block with dot precision', array[0].length);
                    //console.log('If block with dot scale', array[1].length);
                    if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows  
                        return true;
                    } else {
                        if (array[0].length > 1 || array[1].length > 2) {
                            event.preventDefault();
                            return false;
                        }
                    }
                } else {
                    //console.log('If block without dot', array[0].length);
                    if ([8, 13, 27, 37, 38, 39, 40, 110,190].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows  
                        return true;
                    } else {
                        //console.log('First array length', array[0].length);
                        if (!angular.isUndefined(array[0]) && array[0].length > 0) {
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
//http://jsfiddle.net/9HgBY/
PIVF.directive('numberMask', function () {
    return function(scope, element, attrs) {
        var min = parseInt(attrs.min, 10) || 0,
            max = parseInt(attrs.max, 10) || 10,

            value = element.val();
 
        element.on('keyup', function (e) {

            
          
            if (!between(element.val(), min, max)) {
                
                element.val(value);
            } else {
                value = element.val();
            }
        });
            
        function between(n, min, max) {
  
            return n >= min && n <= max;
        }
    }
});

/* https://github.com/wender/angular-multiple-file-upload */
PIVF.directive('fileUpload1', ['$timeout', function ($timeout) {

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
                maxWidth,
                maxHeight,
                sel;

            fileName = attr.name || 'userFile';
            shareCredentials = attr.credentials === 'true';
            withPreview = attr.preview === 'true';
            resize = attr.resize === 'true';
            maxWidth = angular.isDefined(attr.maxWidth) ? parseInt(attr.maxWidth) : true;
            maxHeight = angular.isDefined(attr.maxHeight) ? parseInt(attr.maxHeight) : true;
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
                for (var i = 0; i < files.length && i < 10; i++) {
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