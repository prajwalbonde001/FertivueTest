'use strict';
angular.module('PIVF').controller('OutcomeCtr', function ($rootScope,$timeout,$scope, OutcomeSrv, $location, AlertMessage, srvCommon, Common, swalMessages, $filter, PageConfig) {
    debugger;
    $scope.maxSize = 5;
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.CurrentPage = 1;
    $scope.BHCGList = [];
    $scope.USGList = [];
    $scope.BirthdetailList = [];
    $scope.Outcome = {};
    $scope.IsBCHGEntered = false;
    $scope.Outcome.GeneticAnalysisReportImage = null;
    $scope.Outcome.GeneticAnalysisReportFileName = null;
    //$scope.disableSaveBtn = false;
    $scope.IsOutComeSaved = false;
    $scope.IsBirthDetailsHide = false;
    $scope.IsEmryoTransfered = true;
    $scope.TransferTo = false;   //Added by Nayan Kamble
    $scope.IsBCHGSelf = false;   //Added by Nayan Kamble
    $scope.IsBCHGSurrogate = false;  //Added by Nayan Kamble
    $scope.isSurrogate = false;   //Added by Nayan Kamble
    $scope.isSelf = false;   //Added by Nayan Kamble
    $scope.SurrogateUSG = false;  //Added by Nayan Kamble
    $scope.bothUSG = false;
    var objResource = {};
    var SelCouple = Common.getSelectedCouple();
    var EtDate;
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    $rootScope.FormName = 'Outcome';
    $rootScope.OrderList = 1;
    $rootScope.ForConsent = 0;
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }// for globalization

    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.dateOptionsDOB = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 120),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker

    $scope.open1 = function () {
        $scope.popup1.opened = true;
        if (!$rootScope.ARTDateValidation) {
            $scope.dateOptionsDOB = {
                formatYear: 'yyyy',
                maxDate: new Date().setMonth($scope.minDateBHCG.getMonth() + 120),
                minDate: $scope.minDateBHCG,//new Date(),
                startingDay: 1,
                showWeeks: false
            };
        }
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.open = function ($event, i) {
        $event.preventDefault();
        $event.stopPropagation();
        for (var ii = 0; ii < $scope.BHCGList.length; ii++) {
            $scope.BHCGList[ii].opened = false;
        }
        $scope.BHCGList[i].opened = true;
        if (!$rootScope.ARTDateValidation) {
            $scope.BHCGList[i].dateOptions = {
                formatYear: 'yyyy',
                maxDate: new Date().setMonth($scope.minDateBHCG.getMonth() + 120),
                minDate: $scope.minDateBHCG,//new Date(),
                startingDay: 1,
                showWeeks: false
            };
        }
    };

    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }

    $scope.GetOutcomeList = function () {
        var ResponseData = Common.getMasterList('M_PregOutcome', 'PregOutcomeID', 'PregOutcomeDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.OutcomeList = Response.data;
        }, function (error) {
        });
    }

    $scope.GetDeliveryList = function () {
        var ResponseData = Common.getMasterList('M_Delivery', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DeliveryList = Response.data;
            debugger;
            $scope.Outcome.DeliveryID = 0;
            debugger;
        }, function (error) {
        });
    }

    $scope.GetDeliveryTypeList = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_DeliveryType', 'DeliveryTypeID', 'DeliveryTypeDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DeliveryTypeList = Response.data;
            debugger;
            $scope.Outcome.DeliveryTypeID = 0;
            $timeout(function () {
               $scope.GetOutcomeDetails();
            }, 1300);
            
        }, function (error) {
        });
    }

    $scope.GetPusleList = function () {
        var ResponseData = Common.getMasterList('M_IVf_BirthPulse', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.PusleList = Response.data;
        }, function (error) {
        });
    }

    $scope.GetBirthActivityList = function () {
        var ResponseData = Common.getMasterList('M_IVf_BirthActivity', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.BirthActivityList = Response.data;
        }, function (error) {
        });
    }

    $scope.GetGrimaceList = function () {
        var ResponseData = Common.getMasterList('M_IVf_BirthGrimace', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.GrimaceList = Response.data;
        }, function (error) {
        });
    }

    $scope.GetSkinColorList = function () {
        var ResponseData = Common.getMasterList('M_IVf_BirthAppearance', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SkinColorList = Response.data;
        }, function (error) {
        });
    }

    $scope.GetRespirationList = function () {
        var ResponseData = Common.getMasterList('M_IVf_BirthRespiration', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.RespirationList = Response.data;
        }, function (error) {
        });
    }

    $scope.LoadData = function () {
        debugger;

        if (SelCouple.FemalePatient != undefined && SelCouple.FemalePatient != null) {
            if (SelCouple.FemalePatient.IsCancelCycle == true) {
                debugger;
                $scope.disableSaveBtn = true;
            }
            if (SelCouple.FemalePatient.IsCloseCycle == false) {
                debugger;
                $scope.disableSaveBtn = true;
                debugger;
                $scope.Outcome.IsCycleClose = !SelCouple.FemalePatient.IsCloseCycle;
            }
        }
        debugger;
        var BHCG = {};
        //$scope.GetOutcomeDetails();
        //---------------DB--------------------------------
        $scope.GridTitle = '';
        if (SelCouple.FemalePatient.ARTType=='OI') {
            $scope.GridTitle = 'UPT';
        } else {
            $scope.GridTitle = 'B HCG'
        }
        //---------------DB--------------------------------
        BHCG.BHCGTitle = $scope.GridTitle + ($scope.BHCGList.length + 1); BHCG.Result = ''; BHCG.HCGDate = new Date();
        BHCG.IsPositive = null;      //updated by sujata on 23/12/2019  //commented by Nayan Kamble on 29/11/2019   BHCG.IsPositive = 1;
        BHCG.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date().setMonth(new Date().getMonth() + 120),
            minDate: new Date().setDate(new Date().getDate()),//new Date(),
            startingDay: 1,
            showWeeks: false
        };
        BHCG.TransferToID = 0;   //Added by Nayan Kamble
        $scope.BHCGList.push(BHCG);
        $scope.GetDeliveryList();
        $scope.GetOutcomeList();
       
        $scope.GetPusleList();
        $scope.GetBirthActivityList();
        $scope.GetGrimaceList();
        $scope.GetSkinColorList();
        $scope.GetRespirationList();
        OutcomeSrv.GetETPregnancydate().then(function (resp) {
            if (resp.data != null) {
                $scope.minDateBHCG = new Date(resp.data);
               
                //debugger;
            }
            else {
                $scope.minDateBHCG = new Date();
            }
        });
        $scope.noOfsacsList = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 1 },
                               { ID: 2, Description: 2 }, { ID: 3, Description: 3 }, { ID: 4, Description: 4 }];
        //$scope.WeeksList = [];
        //$scope.WeeksList.push({ ID: 0, Description: 'Select' });
        //for (var i = 1; i <= 43; i++) {
        //    if (i < 43)
        //        $scope.WeeksList.push({ ID: i, Description: i.toString() });
        //    else
        //        $scope.WeeksList.push({ ID: i, Description: '>' + (i - 1).toString() });
        //}
          

        //$scope.Outcome.WeaksOfgestation = 0;
        $scope.Outcome.NoOfSacs = 0;
        //$scope.Outcome.WeaksOfgestation = 0;
        debugger;
        //$scope.Outcome.DateOfObservation = new date();
        if (SelCouple.FemalePatient != undefined && SelCouple.FemalePatient != null) {
            debugger;
            if (SelCouple.FemalePatient.ARTType != "OI") {
                OutcomeSrv.GetPregnancydate().then(function (resp) {// get pregnancydate and et date
                    debugger;
                    console.log("resp ", resp)
                    if (resp.data != null) {
                        debugger;
                        var dates = resp.data.split("/");
                        EtDate = dates[1];
                        $scope.BHCGList[0].HCGDate = (dates[0] != null) ? new Date(dates[0]) : '';
                       
                        if (EtDate != '' && EtDate != null) {
                            debugger;
                            $scope.IsEmryoTransfered = false;
                        }
                        else
                            $scope.IsEmryoTransfered = true;
                    }
                    else {
                        $scope.BHCGList[0].HCGDate = '';
                        $scope.IsEmryoTransfered = true;
                    }
                    $scope.GetDeliveryTypeList();
                    
                    debugger;
                }, function (error) {
                    $scope.BHCGList[0].HCGDate = '';
                })
            }
            else {
                $scope.IsEmryoTransfered = false;
                $scope.GetDeliveryTypeList();
            }
        }
        debugger;
        console.log("Outcome ",$scope.Outcome)
    }

    $scope.AddRow = function () {
        debugger;
        if ($scope.BHCGList.length < 4) {
            var BHCG = {};
            //---------------DB--------------------------------
            $scope.GridADTitle = '';
            if (SelCouple.FemalePatient.ARTType == 'OI') {
                $scope.GridADTitle = 'UPT';
            } else {
                $scope.GridADTitle = 'B HCG'
            }
            //---------------DB--------------------------------
            BHCG.BHCGTitle = $scope.GridADTitle + ($scope.BHCGList.length + 1); BHCG.Result = ''; BHCG.HCGDate = '';
            BHCG.IsPositive = null;    //updated by sujata on 23/12/2019  //commented by Nayan Kamble on 29/11/2019
            if ($scope.BHCGList[$scope.BHCGList.length - 1] != undefined) {
                BHCG.dateOptions = {
                    formatYear: 'yyyy',
                    maxDate: new Date(),
                    minDate: new Date(EtDate).setDate(new Date(EtDate).getDate() + 14),//new Date(),  //uncomment after 
                    startingDay: 1,
                    showWeeks: false
                };
            }
            else {

                //minimum date of B HCG grater than 14 days of 
                BHCG.dateOptions = {
                    formatYear: 'yyyy',
                    maxDate: new Date(),
                    minDate: new Date(EtDate).setDate(new Date(EtDate).getDate() + 14),//new Date(), //uncomment after 
                    startingDay: 1,
                    showWeeks: false
                };
            }
            //by ashish
            if (BHCG.HCGDate == "" && typeof $rootScope.SetOutcomePregnancyDate != "undefined") {
                BHCG.HCGDate = new Date($rootScope.SetOutcomePregnancyDate);
                BHCG.HCGDate.setDate(BHCG.HCGDate.getDate() + ($scope.BHCGList.length * 2));
            }
            else {
                //request to db

                OutcomeSrv.GetETPregnancydate().then(function (resp) {
                    if (resp.data != null) {
                        BHCG.HCGDate = new Date(resp.data);
                        BHCG.HCGDate.setDate(BHCG.HCGDate.getDate() + (($scope.BHCGList.length-1) * 2));
                        debugger;
                    }
                    else {

                    }
                });
            }
            //end ashish
            BHCG.TransferToID = 0;   //Added by Nayan Kamble
            $scope.BHCGList.push(BHCG);
            debugger;

        }
        else {
            AlertMessage.info('PalashIVF', 'You can add 4 rows only.');
        }
    }
    //  //by ashish
    $scope.updateWeaksOfgestation = function () {
        console.log($scope.Outcome.DeliveryID);
        $scope.WeeksList = [];
        $scope.WeeksList.push({ ID: 0, Description: 'Select' });
        if ($scope.Outcome.DeliveryID == 1) {
           for (var i = 1; i <= 33; i++) {
               
                    $scope.WeeksList.push({ ID: i, Description: i.toString() });
            }
        }
        else if ($scope.Outcome.DeliveryID == 2) {
            for (var i = 34; i <= 42; i++) {

                $scope.WeeksList.push({ ID: i, Description: i.toString() });
            }

        }
        else if($scope.Outcome.DeliveryID == 3)
        {   i=43

            $scope.WeeksList.push({ ID: i, Description: '>' + (i-1).toString() });
           
        }
        else {
           
            for (var i = 1; i <= 43; i++) {
                if (i < 43)
                    $scope.WeeksList.push({ ID: i, Description: i.toString() });
                else
                    $scope.WeeksList.push({ ID: i, Description: '>' + (i - 1).toString() });
            }
        }
        $scope.Outcome.WeaksOfgestation = 0;
    }


    $scope.openGeneticAnalysis=function(id)
    {
      debugger
      if(id ==1 || id == 3 )
      {
      $scope.IsBirthDetailsHide = true;
}
else{
$scope.IsBirthDetailsHide = false;
}
        if(id==5)
        {
            $scope.IsGenetaicAnalysis = false;
        }
        else
        {
            $scope.IsGenetaicAnalysis = true;
        }
    }
            //report upload read
    $scope.handleFileSelect = function (evt) {
        //var file = evt.currentTarget.files[0];
        var file = evt.files[0];
        var extn = file.name.split(".").pop().toLowerCase();
        var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
        var validExtension = false;
        //extensions.forEach(function(x){
        //    if (x === extn) {
        //        validExtension = true;
        //    }
        //});
        if (extensions.indexOf(extn) > -1) {
            validExtension = true;
            $scope.Outcome.GeneticAnalysisReportFileName = file.name;
            debugger;
        }
        else $scope.myImage = '';
        debugger;
        var maxSize = 2097152;  // 2mb
        var valid = (file.size) <= maxSize;
        //
        if (validExtension) {
            if (valid) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        $scope.Outcome.GeneticAnalysisReportImage = $scope.myImage;
                       // $scope.Outcome.GeneticAnalysisReportFileName = $scope.filename
                    });
                };
                reader.readAsDataURL(file);
                debugger;
            }
            else {
                AlertMessage.info('PalashIVF', 'Attactment should be not greater than 2 MB.');
            }
        }
       
        else {
           
            $scope.Outcome.GeneticAnalysisReportFileName = null;
            $scope.Outcome.GeneticAnalysisReportImage = null;
           
            AlertMessage.warning('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');
            debugger;
        }
        }

    $scope.ShowImage = function () {
            if ($scope.Outcome.GeneticAnalysisReportFileName != null) {
                if ($scope.Outcome.GeneticAnalysisReportFileName.includes(".pdf")) {
                    $scope.extn = "not image";
                    $scope.content = $scope.GetImage = $scope.Outcome.GeneticAnalysisReportImage;
                }
                else {
                    $scope.extn = "image";
                    $scope.GetImage = $scope.Outcome.GeneticAnalysisReportImage;
                }
              
                angular.element(myModal).modal('show');
                debugger;
            }
        }
    //end ashish

    $scope.DeleteRow = function (idx) {
        if ($scope.BHCGList.length > 1)
            $scope.BHCGList.splice(idx, 1);
    }

    $scope.AddUSGRow = function (NoOfSacs) {
        if ($scope.USGList.length == 0)
            for (var i = 1; i <= NoOfSacs; i++) {
                var USG = {};
                USG.SacTitle = 'Sac' + ($scope.USGList.length + 1); USG.IsFetalHeart = 0; USG.OutcomeID = 0; USG.USGRemark = '';
                $scope.USGList.push(USG);
            }
        else if ($scope.USGList.length > NoOfSacs) {
            swalMessages.MessageBox('PalashIVF', 'If data is unsaved,data will lost, do you want to continue?', "warning", function (isConfirmed) {
                if (isConfirmed) {
                    $scope.USGList.length = 0;
                    for (var i = 1; i <= NoOfSacs; i++) {
                        var USG = {};
                        USG.SacTitle = 'Sac' + ($scope.USGList.length + 1); USG.IsFetalHeart = 0; USG.OutcomeID = 0; USG.USGRemark = '';
                        $scope.USGList.push(USG);
                    }
                }
                else
                    $scope.Outcome.NoOfSacs = $scope.USGList.length;
            });
        }
        else if ($scope.USGList.length < NoOfSacs) {
            var len = 0;
            len = NoOfSacs - $scope.USGList.length;
            for (var i = 1; i <= len; i++) {
                var USG = {};
                USG.SacTitle = 'Sac' + ($scope.USGList.length + 1); USG.IsFetalHeart = 0; USG.OutcomeID = 0; USG.USGRemark = '';
                $scope.USGList.push(USG);
            }
        }
    }

    //$scope.ValidateNoOfSacs = function (e) {
    //    if (parseInt(e.key)>0 && parseInt(e.key) < 5) {
    //        $scope.USGList.length = 0;
    //        for (var i = 1; i <= parseInt(e.key) ; i++) {
    //            var USG = {};
    //            USG.SacTitle = 'Sac' + ($scope.USGList.length + 1); USG.IsFetalHeart = 0; USG.OutcomeID = 0; USG.DeliveryID = 0; USG.IsCongiAbnorm = 1;
    //            USG.USGRemark = '';
    //            $scope.USGList.push(USG);
    //        }
    //    }
    //    else if(e.key=='Backspace')
    //    {
    //        $scope.USGList.length = 0;
    //    }
    //    else {
    //        e.preventDefault();
    //    }
    //}

    //$scope.AddBirthdetailRow = function () {  
    //    var BirthdetailRow = {};
    //    BirthdetailRow.Child = 'Child' + ($scope.BirthdetailList.length + 1); BirthdetailRow.GrimaceID = 0; BirthdetailRow.ActivityID = 0; BirthdetailRow.IsCongiAbnorm = 1;
    //    BirthdetailRow.PulseID = 0; BirthdetailRow.AppearanceID = 0; BirthdetailRow.RespirationID = 1; BirthdetailRow.BirthWeight = ''; BirthdetailRow.Score = '';
    //    BirthdetailRow.Remark = '';
    //    $scope.BirthdetailList.push(BirthdetailRow);
    //}

    $scope.CalcScore = function (i, idx) {
        var Score = 0;
        if (i.ActivityID == 0)
            Score = Score + 0;
        else if (i.ActivityID == 1)
            Score = Score + 0;
        else if (i.ActivityID == 2)
            Score = Score + 1;
        else if (i.ActivityID == 3)
            Score = Score + 2;
        if (i.PulseID == 0)
            Score = Score + 0;
        else if (i.PulseID == 1)
            Score = Score + 0;
        else if (i.PulseID == 2)
            Score = Score + 1;
        else if (i.PulseID == 3)
            Score = Score + 2;
        if (i.GrimaceID == 0)
            Score = Score + 0;
        else if (i.GrimaceID == 1)
            Score = Score + 0;
        else if (i.GrimaceID == 2)
            Score = Score + 1;
        else if (i.GrimaceID == 3)
            Score = Score + 2;
        if (i.AppearanceID == 0)
            Score = Score + 0;
        else if (i.AppearanceID == 1)
            Score = Score + 0;
        else if (i.AppearanceID == 2)
            Score = Score + 1;
        else if (i.AppearanceID == 3)
            Score = Score + 2;
        if (i.RespirationID == 0)
            Score = Score + 0;
        else if (i.RespirationID == 1)
            Score = Score + 0;
        else if (i.RespirationID == 2)
            Score = Score + 1;
        else if (i.RespirationID == 3)
            Score = Score + 2;
        if (i.ActivityID > 0 && i.PulseID > 0 && i.GrimaceID > 0 && i.AppearanceID > 0 && i.RespirationID > 0) {
            if (Score >= 0 && Score <= 3)
                $scope.BirthdetailList[idx].Score = 'Severely Depressed';
            else if (Score >= 4 && Score <= 6)
                $scope.BirthdetailList[idx].Score = 'Moderately Depressed';
            else if (Score >= 7 && Score <= 10)
                $scope.BirthdetailList[idx].Score = 'Excellent Condition';
        }
        else $scope.BirthdetailList[idx].Score = '';
    }

    $scope.SaveOutcome = function (Outcome) {
        debugger;
       // Added by Nayan Kamble on 04/11/2019 START
        for (var idx = 0; idx < $scope.BHCGList.length; idx++) {

            $scope.Value = Outcome.lstBHCG[idx].IsPositive;
            if ($scope.Value != undefined) {
                if ($scope.Value == true) {
                    Outcome.lstBHCG[idx].IsPositive = 1;
                }

                else if (Outcome.lstBHCG[0].IsPositive == 0) {
                    Outcome.lstBHCG[0].IsPositive = null;
                }

               else if (Outcome.lstBHCG[0].IsPositive == null) {
                Outcome.lstBHCG[0].IsPositive = null;
            }
                else {
                    Outcome.lstBHCG[0].IsPositive = 2;//0
                }
            }
        }
        // Added by Nayan Kamble on 04/11/2019 END
        //if (!$scope.IsOutComeSaved) {
        //    if ($scope.ValidateOutcome()) {
        //        var noOfBirthdetailRows = 0;
        //        //$scope.BHCGList.every(x=>x.HCGDate = $filter('date')(x.HCGDate, 'medium'));
        //        Outcome.DateOfObservation = $filter('date')(Outcome.DateOfObservation, 'medium');
        //        Outcome.lstBHCG = $scope.BHCGList;
        //        Outcome.lstUSG = $scope.USGList;
        //        angular.forEach(Outcome.lstUSG, function (item) {
        //            if (item.OutcomeID == 1)
        //                noOfBirthdetailRows = noOfBirthdetailRows + 1;
        //        })
        //        //Outcome.lstBirthDetail = $scope.BirthdetailList;
        //        debugger;
        //        var Promise = OutcomeSrv.SaveOutcome(Outcome);
        //        Promise.then(function (Response) {
        //            if (Response.data > 0) {
        //                //Clear();
        //                debugger;
        //                $scope.IsOutComeSaved = true;
        //                for (var j = 1; j <= noOfBirthdetailRows; j++) {
        //                    var BirthdetailRow = {};
        //                    BirthdetailRow.Child = 'Child' + ($scope.BirthdetailList.length + 1); BirthdetailRow.GrimaceID = 0; BirthdetailRow.ActivityID = 0; BirthdetailRow.IsCongiAbnorm = 1;
        //                    BirthdetailRow.PulseID = 0; BirthdetailRow.AppearanceID = 0; BirthdetailRow.RespirationID = 0; BirthdetailRow.BirthWeight = ''; BirthdetailRow.Score = '';
        //                    BirthdetailRow.Remark = '';
        //                    $scope.BirthdetailList.push(BirthdetailRow);
        //                }
        //                Outcome.ID = Response.data;
        //                AlertMessage.info('PalashIVF', 'Record saved successfully.');
        //            }
        //        }, function (error) {
        //        });
        //    }
        //}
        //else if ($scope.IsOutComeSaved) {
        //    debugger;
        //    if ($scope.ValidateBirthDetail()) {
        //        Outcome.lstBHCG.length = 0;
        //        Outcome.lstUSG.length = 0;
        //        Outcome.lstBirthDetail = $scope.BirthdetailList;
        //        var Promise1 = OutcomeSrv.SaveBirthDetails(Outcome);
        //        Promise1.then(function (Response) {
        //            if (Response.data == 1) {
        //                //Clear();
        //                $scope.IsOutComeSaved = false;
        //                AlertMessage.info('PalashIVF', 'Record saved successfully.');
        //            }
        //        }, function (error) {
        //        });
        //    }
        //}
        debugger;
        if ($scope.IsEmryoTransfered == true) {
          
            if ($scope.Outcome.IsCycleClose == true) {
                $scope.BHCGList.forEach(function (x) {
                    x.HCGDate = $filter('date')(x.HCGDate, 'medium');
                    x.IsPositive = parseInt(x.IsPositive);
                });
                Outcome.DateOfObservation = $filter('date')(Outcome.DateOfObservation, 'medium');
               
               
                Outcome.lstBHCG = $scope.BHCGList;
                Outcome.lstUSG = $scope.USGList;
                Outcome.lstBirthDetail = $scope.BirthdetailList;
                var Promise = OutcomeSrv.SaveOutcome(Outcome);
                Promise.then(function (Response) {
                    debugger;
                    if (Response.data == 1) {
                        Clear();
                        AlertMessage.info('PalashIVF', 'Record saved successfully.');
                        $scope.LoadData();
                    }
                    if (Response.data == 2) {
                        Clear();
                        AlertMessage.info('PalashIVF', 'Record Updated successfully.');
                        $scope.LoadData();
                    }
                }, function (error) {
                });
            }
            else {
                AlertMessage.info('PalashIVF', 'If Embryo Transfer not done u can only close the cycle,Please Check Close Cycle');
            }
        }
        else if ($scope.ValidateOutcome()) {
            $scope.BHCGList.forEach(function (x) {
                x.HCGDate = $filter('date')(x.HCGDate, 'medium');
                x.IsPositive = parseInt(x.IsPositive);
            });
            Outcome.DateOfObservation = $filter('date')(Outcome.DateOfObservation, 'medium');
         
            Outcome.lstBHCG = $scope.BHCGList;
            Outcome.lstUSG = $scope.USGList;
            Outcome.lstBirthDetail = $scope.BirthdetailList;
            var Promise = OutcomeSrv.SaveOutcome(Outcome);
            debugger;
            Promise.then(function (Response) {
                debugger;
                if (Response.data == 1) {
                    Clear();
                    AlertMessage.info('PalashIVF', 'Record saved successfully.');
                    $scope.LoadData();
                }
                if (Response.data == 2) {
                    Clear();
                    AlertMessage.info('PalashIVF', 'Record Updated successfully.');
                    $scope.LoadData();
                }
            }, function (error) {
            });
        }
    }

    function Clear() {
        $scope.Outcome = {};
        $scope.BHCGList.length = 0;
        $scope.BirthdetailList.length = 0;
        $scope.USGList.length = 0;
    }

    $scope.ResultEnter = function () {   
       if ($scope.BHCGList[0].Result != '') {
            $scope.IsBCHGEntered = true;
        }
        else $scope.IsBCHGEntered = false;
    }

    $scope.StatusInUTPChange = function (IsMakeDateEnabled) {
        debugger;
        var IsAnyOneIsPositive = false;
        if (SelCouple.FemalePatient.ARTType == 'OI') {
            for (var idx = 0; idx < $scope.BHCGList.length; idx++) {
                if ($scope.BHCGList[idx].IsPositive == '1') {
                    IsAnyOneIsPositive = true;
                }
            }
            if (IsAnyOneIsPositive) {
                $scope.IsBCHGEntered = true;
            } else {
                $scope.IsBCHGEntered = false;
            }
        }
        if (IsMakeDateEnabled == 0) {    //Added by Nayan Kamble on 04/10/2019
            var IsAnyOneIsPositive = false;
        }
        else {
            var IsAnyOneIsPositive = true;
        }

        if (IsAnyOneIsPositive) {
            $scope.IsBCHGEntered = true;
        } else {
            $scope.IsBCHGEntered = false;
        }
    }
    //Added by Nayan Kamble
    $scope.USGChange = function (id, index) {
        debugger;
        //if (id == 1 && index>0) {
        //    $scope.IsBCHGSelf = true;
        //}
        //else if (id == 2 && index > 0) {
        //    $scope.IsBCHGSurrogate = true;
        //}
        //else if (id == 1 && index == 0) {
        //    $scope.IsBCHGSelf = true;
        //    $scope.IsBCHGSurrogate = false;
        //}
        //else if (id == 2 && index == 0) {
        //    $scope.IsBCHGSelf = false;
        //    $scope.IsBCHGSurrogate = true;
        //}
        var IsBCHGSelfI = 0;
        var IsBCHGSurrogateI = 0;
        angular.forEach($scope.BHCGList, function (item) {
            if (item.TransferToID == 1) {
                $scope.IsBCHGSelf = true;
                IsBCHGSelfI = 1

            }
            else if (item.TransferToID == 2) {
                $scope.IsBCHGSurrogate = true;
                IsBCHGSurrogateI = 1;
            }
        });
        if (IsBCHGSelfI == 0) {
            $scope.IsBCHGSelf = false;
        }
        if (IsBCHGSurrogateI == 0) {
            $scope.IsBCHGSurrogate = false;
        }
    }
    

    $scope.ValidateOutcome = function () {
        debugger;
        var IsValid = true;
        if ($filter('date')($scope.BHCGList[0].HCGDate, 'medium') < new Date(EtDate).setDate(new Date(EtDate).getDate() + 14)) {
            IsValid = false;
            AlertMessage.info('PalashIVF', 'B HCG date should be 14 days greater than Embryo Transfer date.');
        }
        if (BHCGDateValid()) {
            IsValid = false;
            AlertMessage.info('PalashIVF', 'B HCG date should be greater than previous B HCG date.');
        }

        //comment sujata for wrong validtion msg reflect        //if ($filter('date')($scope.Outcome.DateOfObservation, 'medium') < $filter('date')($scope.BHCGList[$scope.BHCGList.length - 1].HCGDate, 'medium')) {
        //    IsValid = false;
        //    AlertMessage.info('PalashIVF', 'Date Of Observation should be greater than last B HCG date entered.');
        //}

        //added sujata for wrong validtion msg reflect
        //if ($filter('date')($scope.Outcome.DateOfObservation, 'dd-MMM-yyyy') < $filter('date')($scope.BHCGList[$scope.BHCGList.length - 1].HCGDate, 'dd-MMM-yyyy')) {
        //    IsValid = false;
        //    AlertMessage.info('PalashIVF', 'Date Of Observation should be greater than last B HCG date entered.');
        //}

        if ($scope.Outcome.DateOfObservation < $scope.BHCGList[$scope.BHCGList.length - 1].HCGDate) {
            IsValid = false;
            AlertMessage.info('PalashIVF', 'Date Of Observation should be greater than last B HCG date entered.');
        }

        if (angular.isDate($scope.Outcome.DateOfObservation) && $scope.Outcome.NoOfSacs == 0) {
            IsValid = false;
            AlertMessage.info('PalashIVF', 'Select No of sacs.');
        }
        //IsValid = true;//before checkin remove

        return IsValid;
    }

    function BHCGDateValid() {
        debugger;
        if ($scope.BHCGList.length > 1) {
            for (var j = 0; j < $scope.BHCGList.length; j++) {

                if (j + 1 < $scope.BHCGList.length) {
                    if ($filter('date')($scope.BHCGList[j + 1].HCGDate, 'dd-MMM-yyyy') < $filter('date')($scope.BHCGList[j].HCGDate, 'dd-MMM-yyyy')) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    $scope.ValidateBirthDetail = function () {

        var IsValid = true;
        if (angular.isDate($scope.Outcome.DateOfObservation) && $scope.Outcome.NoOfSacs == 0) {
            IsValid = false;
            AlertMessage.info('PalashIVF', 'Select No of sacs.');
        }
        if ($scope.BirthdetailList.every(function (y) {

             if (y.BirthWeight == undefined || y.BirthWeight == '') {
            y.weightInvalid = true;
               return true;
        }
        else return false;
        })) {  //y=>y.BirthWeight == undefined || y.BirthWeight == ''
            IsValid = false;
            AlertMessage.info('PalashIVF', 'Enter birth weight.');
        }

        return IsValid;
    }

    $scope.valiadeResult = function (val, eve) {
        debugger;
        var isDecimal = false;
        if (angular.isDefined(val)) {
            var count = val.split('.').length - 1;
            isDecimal = val.indexOf(".") == -1 ? false : true;
        }
        if (!isDecimal && angular.isDefined(val)) {
            if (val.length < 4 && (eve.which >= 48 && eve.which <= 57)) {
            }
            else if (val.length <= 4 && (eve.which == 110 || eve.which == 190 || eve.which == 8 || eve.which == 46)) {
            }
            else eve.preventDefault();
        }
        else if (isDecimal) {
            if (count > 0 && (eve.which == 110 || eve.which == 190 || eve.which == 46)) {
                eve.preventDefault();
            }
            else {
                var aaaa = val.split('.');
                if (aaaa[1].length < 2 && (eve.which >= 48 && eve.which <= 57)) {

                }
                else
                    eve.preventDefault();
            }
        }
    }

    $scope.valiadeBirthWeight = function (val, eve) {

        var isDecimal = false;
        if (angular.isDefined(val)) {
            var count = val.split('.').length - 1;
            isDecimal = val.indexOf(".") == -1 ? false : true;
        }
        if (!isDecimal && angular.isDefined(val)) {
            if (val.length < 1 && (eve.which >= 48 && eve.which <= 57)) {
            }
            else if (val.length == 1 && (eve.which == 110 || eve.which == 190 || eve.which == 8 || eve.which == 46)) {
            }
            else eve.preventDefault();
        }
        else if (isDecimal) {
            if (count > 0 && (eve.which == 110 || eve.which == 190 || eve.which == 46)) {
                eve.preventDefault();
            }
            else {
                var aaaa = val.split('.');
                if (aaaa[1].length < 3 && (eve.which >= 48 && eve.which <= 57)) {

                }
                else
                    eve.preventDefault();
            }
        }
    }

    $scope.GetOutcomeDetails = function () {
        debugger;
        var Promise1 = OutcomeSrv.GetOutcomeDetails();
        Promise1.then(function (Response) {
            debugger;
             Clear();
            var noOfBirthdetailRows = 0;
            if (Response.data.lstBHCG.length > 0) {
                if (Response.data.lstBHCG[0].Result > 0)
                    $scope.IsOutComeSaved = true;
            }
            if (Response.data.IsCycleClose)
                angular.element(btnSave).prop('disabled', true);
            debugger;
            $scope.Outcome = Response.data;
            //Added by Nayan Kamble on 05/11/2019  START
            for (var idx = 0; idx < $scope.Outcome.lstBHCG.length; idx++) {
                if ($scope.Outcome.lstBHCG[idx].IsPositive == true) {   //Added
                    $scope.IsBCHGEntered = true;
                }

                else {
                    $scope.IsBCHGEntered = false;
                }

            }
            //Added by Nayan Kamble on 05/11/2019  END
            //Added by Nayan Kamble
            angular.forEach($scope.Outcome.lstSurrogate, function (item) {
                if (item.TransferToID == 2) {
                    $scope.TransferTo = true;
                    $scope.SurrogateMrno = item.SurrogateMrno;
                    $scope.SurrogateUnitID = item.SurrogateUnitID;
                    $scope.SurrogateID = item.SurrogateID;
                    $scope.isSurrogate = true;
                }
                else if (item.TransferToID == 1) {
                    $scope.isSelf = true;
                }
            });
            if ($scope.isSurrogate == true && $scope.isSelf == true) {
                //both list
                $scope.TransferToList = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Self' }, { ID: 2, Description: $scope.SurrogateMrno }];
                $scope.FirstUSG = "USG (Self)";
                $scope.SecondUSG = "USG (Surrogate)";
                $scope.bothUSG = true;

            }
            else if ($scope.isSurrogate == true) {
                $scope.TransferToList = [{ ID: 0, Description: 'Select' }, { ID: 2, Description: $scope.SurrogateMrno }];
                $scope.SecondUSG = "USG (Surrogate)";
                $scope.SurrogateUSG = true;

            }


            // to check check box if clycle closaed
            debugger;
            if (SelCouple.FemalePatient != undefined && SelCouple.FemalePatient != null) {
                if (SelCouple.FemalePatient.IsCancelCycle == true) {
                    debugger;
                    $scope.disableSaveBtn = true;
                }
                else if (Response.data.IsCycleClose == true) {
                    $scope.Outcome.IsCycleClose = true;
                    debugger;
                    $scope.disableSaveBtn = true;
                }
                else if (Response.data.IsCycleClose == false) {
                    $scope.Outcome.IsCycleClose = false;
                }
                else if (SelCouple.FemalePatient.IsCloseCycle == false) {
                    $scope.disableSaveBtn = true;
                    debugger;
                    $scope.Outcome.IsCycleClose = true; //!SelCouple.FemalePatient.IsCloseCycle;
                }
            }

            $scope.Outcome.DateOfObservation = ($scope.Outcome.DateOfObservation == null) ? null : new Date($scope.Outcome.DateOfObservation);
            $scope.BHCGList = $scope.Outcome.lstBHCG;
            //$scope.BHCGList.every(function (z) { z.HCGDate = new Date(z.HCGDate);})
            debugger;
            angular.forEach($scope.BHCGList, function (z) {
                z.HCGDate = (z.HCGDate == null) ? null : new Date(z.HCGDate);
            })
            $scope.USGList = $scope.Outcome.lstUSG;
            angular.forEach($scope.USGList, function (item) {
                if (item.OutcomeID == 1)
                    noOfBirthdetailRows = noOfBirthdetailRows + 1;
            })
            if ($scope.Outcome.lstBirthDetail.length > 0 && $scope.Outcome.lstBirthDetail[0].Child == '') {
                for (var j = 1; j <= noOfBirthdetailRows; j++) {
                    var BirthdetailRow = {};
                    BirthdetailRow.Child = 'Child' + ($scope.BirthdetailList.length + 1); BirthdetailRow.GrimaceID = 0; BirthdetailRow.ActivityID = 0; BirthdetailRow.IsCongiAbnorm = 1;
                    BirthdetailRow.PulseID = 0; BirthdetailRow.AppearanceID = 0; BirthdetailRow.RespirationID = 0; BirthdetailRow.BirthWeight = ''; BirthdetailRow.Score = '';
                    BirthdetailRow.Remark = '';
                    $scope.BirthdetailList.push(BirthdetailRow);
                }
            }
            else {
                if ($scope.Outcome.lstBirthDetail.length > noOfBirthdetailRows) {
                    var diffss = $scope.Outcome.lstBirthDetail.length - noOfBirthdetailRows;
                    $scope.Outcome.lstBirthDetail.splice($scope.Outcome.lstBirthDetail.length - diffss);

                }
                else if ($scope.Outcome.lstBirthDetail.length < noOfBirthdetailRows) {
                    var diffss = noOfBirthdetailRows - $scope.Outcome.lstBirthDetail.length;
                    for (var j = 1; j <= diffss; j++) {
                        var BirthdetailRow = {};
                        BirthdetailRow.Child = 'Child' + ($scope.Outcome.lstBirthDetail.length + 1); BirthdetailRow.GrimaceID = 0; BirthdetailRow.ActivityID = 0; BirthdetailRow.IsCongiAbnorm = 1;
                        BirthdetailRow.PulseID = 0; BirthdetailRow.AppearanceID = 0; BirthdetailRow.RespirationID = 0; BirthdetailRow.BirthWeight = ''; BirthdetailRow.Score = '';
                        BirthdetailRow.Remark = '';
                        BirthdetailRow.TransferToID = 0;   //Added by Nayan Kamble
                        $scope.Outcome.lstBirthDetail.push(BirthdetailRow);
                    }
                }
                $scope.BirthdetailList = $scope.Outcome.lstBirthDetail;
            }


            debugger;
            //by ashish
            $scope.WeeksList = [];
            $scope.WeeksList.push({ ID: 0, Description: 'Select' });
            if ($scope.Outcome.DeliveryID == 1) {
                for (var i = 1; i <= 33; i++) {

                    $scope.WeeksList.push({ ID: i, Description: i.toString() });
                }
            }
            else if ($scope.Outcome.DeliveryID == 2) {
                for (var i = 34; i <= 42; i++) {

                    $scope.WeeksList.push({ ID: i, Description: i.toString() });
                }

            }
            else if ($scope.Outcome.DeliveryID == 3) {
                i = 43

                $scope.WeeksList.push({ ID: i, Description: '>' + (i - 1).toString() });

            }
            else {

                for (var i = 1; i <= 43; i++) {
                    if (i < 43)
                        $scope.WeeksList.push({ ID: i, Description: i.toString() });
                    else
                        $scope.WeeksList.push({ ID: i, Description: '>' + (i - 1).toString() });
                }
            }

            debugger;
            console.log($scope.USGList);
            var found = false;
            for (var i = 0; i < $scope.USGList.length; i++) {
                if ($scope.USGList[i].OutcomeID == 5) {
                    found = true;
                    break;
                }

                  if($scope.USGList[i].OutcomeID ==1 || $scope.USGList[i].OutcomeID == 3 )
      {
      $scope.IsBirthDetailsHide = true;
}
else{
$scope.IsBirthDetailsHide = false;
}
            }
            if (found) {
                $scope.IsGenetaicAnalysis = false;
            }
            else {
                $scope.IsGenetaicAnalysis = true;
            }

            debugger;

            //end


            //rohini
            debugger;
            if (Response.data.lstBHCG.length == 0 && $scope.IsEmryoTransfered == false) {
                $scope.AddRow();
            }


        }, function (error) {
        });
    }

    //Added by Nayan Kamble
    $scope.UnLinkSurrogate = function () {

        swalMessages.MessageBox('PalashIVF', "Are You Sure Want to Unlink a Surrogate?", "warning", function (isConfirmed) {
            if (isConfirmed) {
                var Promise1 = OutcomeSrv.UnLinkSurrogate();
                Promise1.then(function (Response) {
                    if (Response.data == 1) {
                        AlertMessage.success("PalashIVF", "Surrogate Unlink Successfully.");
                    }
                    else if (Response.data == 2) {
                        AlertMessage.info("PalashIVF", "Surrogate Already Unlink");
                    }
                    else {
                        AlertMessage.error("PalashIVF", "Error Occurred");
                    }
                });
            }



        });



    }
    $scope.cancel = function () {
        $location.path('/EMRLandingPage/');
    }

    $scope.Close = function () {
        angular.element(myModal).modal('hide');
    }

    $scope.SaveReport = function () {
        debugger;
        // window.win = open($scope.Image);
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', $scope.Outcome.GeneticAnalysisReportImage);
        downloadLink.attr('download', $scope.Outcome.GeneticAnalysisReportFileName);
        downloadLink.attr('target', '_self');
        angular.element(document.body).append(downloadLink);  //added to support firefox
        downloadLink[0].click();//call click function

        //  url.revokeObjectURL($scope.Image);//revoke the object from URL
    }

})