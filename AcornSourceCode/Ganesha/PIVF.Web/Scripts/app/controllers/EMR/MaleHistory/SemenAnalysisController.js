'use strict';

angular.module('PIVF').controller('SemenAnalysisController', function ($scope, $rootScope, $location, AlertMessage, swalMessages, Common, SemenAnalysisService, srvCommon, $filter, SurgicalSpermRetrievalService, usSpinnerService) {
    //  $scope.bigTotalItems = 0;\

    usSpinnerService.spin('GridSpinner');
    //SemenAnalysisInterpretationService : Service removed for testing
    //alert(" SemenAnalysisController Called")
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    /* START for Resource */
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    /*END of Resource*/
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
    $rootScope.FormName = 'Semen Analysis';
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.selectedPatient = {};
    $scope.selectedPatient = Common.getSelectedPatient();
    //$scope.txtVolBoldClass = "";
    $scope.ViewBtnName = 'View';
    $scope.btnSaveUpdate = "Save";
    $scope.SemenAnalysis = {
    };
    $scope.SemenAnalysisUpdate = {
    };
    $scope.SurgicalSpermRetrieval = {
    };
    $scope.IsViewBtnDisable = true;
    $scope.ListItem = [];
    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.IsDisableAbnormalForm = false;
    $scope.SurgicalSpermRetrieval.SSRDate = new Date();
    /*START : Visible*/
    $scope.LeftVisible = true;
    $scope.RightVisible = true;
    /*END : Visible*/
    $scope.CollecteAtCentre = true;
    $scope.SurgicalSpermRetrieval.foo = [];
    $scope.SurgicalSpermRetrieval.ComplicationIDByDesc = [];
    $scope.SurgicalSpermRetrieval.foo.model = [];
    $scope.SurgicalSpermRetrieval.ComplicationSelectedItems = [];
    $scope.SemenAnalysis.CollectionDate = new Date();
    $scope.SemenAnalysis.ReceivingDate = new Date();
    $scope.SemenAnalysis.ReceivingTime = new Date();
    $scope.SemenAnalysis.CollectionTime = new Date();
    $scope.SemenAnalysis.IVFSSEMENCode = 0;
    $scope.SemenAnalysis.AbstinenceID = 0;
    $scope.SemenAnalysis.DoneBy = 0;
    $scope.SemenAnalysis.WitnessedBy = 0;
    $scope.SemenAnalysis.ViscosityID = 0;
    $scope.SemenAnalysis.InterpretationsID = 0;
    $scope.SemenAnalysis.SemenCID = 0;
    $scope.SemenAnalysis.AppearanceID = 0;
    $scope.SemenAnalysis.MethodSurgicalSRetrievalID = 0;
    $scope.IsSergicalOptionSelected = true;
    $scope.IsPrograssiveEntered = true;
    $scope.SurgicalSpermRetrieval.foo.model.push($scope.TestClass);

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

    //Start Report 
    $scope.PrintSemenAnalysis = function PrintSemenAnalysis(Item) {
        debugger;
        //var a = encodeURIComponent('U=' + Item.SNo + '&SNo=' + Item.SNo + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&SNo=' + Item.SNo + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PU=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID);
        window.open('/Reports/EMR/SemenAnalysisWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    //END Report

    $scope.FillAbstinenceList = function FillAbstinenceList() {
        //  //
        var ResponseData = Common.getMasterList('M_Abstinence', 'AbstID', 'Description');
        ResponseData.then(function (Response) {
            //     //
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AbstinenceList = Response.data;
            $scope.SemenAnalysis.AbstinenceID = 0;
        }, function (error) {
        });
    };

    $scope.GetListSemenCollection = function GetListSemenCollection() {
        //
        var ResponseData = Common.getMasterList('M_MethodofSpermCollection', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SemenCollectionList = Response.data;
            $scope.SemenAnalysis.MethodOfCollection = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.ChangeTotalAbnormalValue = function ChangeTotalAbnormalValue(bool) {
        debugger;
        if (bool == true) {
            if ($scope.SemenAnalysis.SumTotalAbnormal > 100) {
                $scope.SemenAnalysis.SumTotalAbnormal = '';
                AlertMessage.info(objResource.msgTitle, 'Sum of Abnormal should be less than or equall to 100');
            }
            else {
                $scope.SemenAnalysis.SumTotalNormal = 100 - $scope.SemenAnalysis.SumTotalAbnormal;
            }
        }
        else {
            if ($scope.SemenAnalysis.SumTotalNormal > 100) {
                $scope.SemenAnalysis.SumTotalNormal = 0;
                AlertMessage.info(objResource.msgTitle, 'Normal should be less than or equall to 100');
            }
            else {
                $scope.SemenAnalysis.SumTotalAbnormal = 100 - $scope.SemenAnalysis.SumTotalNormal;
            }

        }
        //$scope.CalcTeratozoospermicIndex($scope.SemenAnalysis);
    }

    $scope.CalculateTotalConcentration = function CalculateTotalConcentration() {

        if (angular.isDefined($scope.SemenAnalysis.SpermConcentration) && angular.isDefined($scope.SemenAnalysis.Volume))
            $scope.SemenAnalysis.TotalSpermCount = $scope.SemenAnalysis.SpermConcentration * $scope.SemenAnalysis.Volume;

        if ($scope.SemenAnalysis.TotalSpermCount < 39)
            $scope.txtTotSBoldClass = "text-bold";
        else
            $scope.txtTotSBoldClass = "";


    }

    $scope.GetTotalMotilityCalculation = function GetTotalMotilityCalculation() {
        if (angular.isDefined($scope.SemenAnalysis.Progressive) && angular.isDefined($scope.SemenAnalysis.NonProgressive))
            $scope.SemenAnalysis.TotalMotility = parseInt($scope.SemenAnalysis.Progressive) + parseInt($scope.SemenAnalysis.NonProgressive);

    }

    $scope.FetchMethodSurgicalSRetrieval = function FetchMethodSurgicalSRetrieval() {
        ////
        var ResponseData = Common.getMasterList('M_MethodSurgicalSRetrieval', 'MOSSRetrivalID', 'MOSSRetrivalDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MethodSurgicalSRetrievalList = Response.data;
            if ($scope.SemenAnalysis.MethodSurgicalSRetrievalID == undefined) {

            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    //Start Surgical Page Initializatiopn
    $scope.SurgicalSpermRetrievalInitilization = function SurgicalSpermRetrievalInitilization() {
        $scope.FetchIndications();
        $scope.FetchSpecimenTypes();
        $scope.FetchMethodSurgicalSRetrieval();
        $scope.FetchComplication();
        $scope.FetchSites();
        $scope.FetchSurgeon();
        $scope.FetchAnesthetist();
        $scope.FetchAnesthesia();
        $scope.FetchEmbryologistList();
        //$scope.lstPrognosis = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: ' Poor Fertility' }, { ID: 2, Description: 'Reasonable Fertility' },
        //    { ID: 3, Description: 'Good Fertility' }
        //];
        $scope.lstPrognosis = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: ' Excellent' }, { ID: 2, Description: 'Good to fair' },
            { ID: 3, Description: 'Fair to poor' }, { ID: 4, Description: 'Very poor' }
        ];
        $scope.SemenAnalysis.PrognosisID = 0;

        $scope.PresentAbsentList = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Present' }, { ID: 2, Description: 'Absent' }];
        $scope.SemenAnalysis.RBCID = 0;
        $scope.SemenAnalysis.PusCellsID = 0;
    }
    //End Surgical Page Initializatiopn

    /*START :SurgicalSpermRetrival Bind dropdowns*/
    $scope.FetchIndications = function FetchIndications() {
        ////
        var ResponseData = Common.getMasterList('M_SurgicalEIndication', 'SIndicationID', 'IndicationDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.IndicationList = Response.data;
            if ($scope.SurgicalSpermRetrieval.IndicationID == undefined) {
                $scope.SurgicalSpermRetrieval.IndicationID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchSpecimenTypes = function FetchSpecimenTypes() {

        var ResponseData = Common.getMasterList('M_SpecimenType', 'SpecimenID', 'SpecimenDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SpecimenTypeList = Response.data;
            if ($scope.SurgicalSpermRetrieval.SpecimenTypeID == undefined) {
                $scope.SurgicalSpermRetrieval.SpecimenTypeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchMethodSurgicalSRetrieval = function FetchMethodSurgicalSRetrieval() {
        ////
        var ResponseData = Common.getMasterList('M_MethodSurgicalSRetrieval', 'MOSSRetrivalID', 'MOSSRetrivalDescription');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MethodSurgicalSRetrievalList = Response.data;
            if ($scope.SurgicalSpermRetrieval.MethodOfSurgicalSpermRetrivalID == undefined) {
                $scope.SurgicalSpermRetrieval.MethodOfSurgicalSpermRetrivalID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    //Used to bind description to Complication SSR Form
    $scope.FetchComplication = function FetchComplication() {

        var ResponseData = Common.getMasterList('M_SSRComplication', 'SSRComplicationId', 'SSRDescription');
        ResponseData.then(function (Response) {
            ////
            //Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ComplicationList = Response.data;



        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchSites = function FetchSites() {
        ////
        var ResponseData = Common.getMasterList('M_Sites', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            //Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SitesList = Response.data;
            if ($scope.SurgicalSpermRetrieval.SiteID == undefined) {
                $scope.SurgicalSpermRetrieval.SiteID = 3;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchSurgeon = function FetchSurgeon() {
        ////
        var ResponseData = SurgicalSpermRetrievalService.getSurgeonList();
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SurgeonList = Response.data;
            if ($scope.SurgicalSpermRetrieval.SurgonID == undefined) {
                $scope.SurgicalSpermRetrieval.SurgonID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchAnesthetist = function FetchAnesthetist() {
        //
        var ResponseData = SurgicalSpermRetrievalService.getAnesthetist();
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.AnesthetistList = Response.data;
            if ($scope.SurgicalSpermRetrieval.AnesthetistID == undefined) {
                $scope.SurgicalSpermRetrieval.AnesthetistID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchAnesthesia = function FetchAnesthesia() {
        ////
        var ResponseData = Common.getMasterList('M_Anesthesia', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.AnesthesiaList = Response.data;
            if ($scope.SurgicalSpermRetrieval.AnesthesiaID == undefined) {
                $scope.SurgicalSpermRetrieval.AnesthesiaID = 0;
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

    $scope.FetchEmbryologistList = function FetchEmbryologistList() {
        //
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.EmbryologistList = Response.data;
            if ($scope.SurgicalSpermRetrieval.EmbroylogistID == undefined) {
                $scope.SurgicalSpermRetrieval.EmbroylogistID = 0;
            }
            if ($scope.SurgicalSpermRetrieval.WitnessEmbroylogistID == undefined) {
                $scope.SurgicalSpermRetrieval.WitnessEmbroylogistID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    /*END :SurgicalSpermRetrival Bind dropdowns*/

    $scope.GetSemenColorList = function PhyExamColorList() {
        //
        var ResponseData = Common.getMasterList('M_SemenColorMaster', 'SemenCID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SemenColorList = Response.data;
            //    $scope.SemenAnalysis.GobletColorID = 0;
        }, function (error) {
        });
    }



    //Method for Get Data For Grid//
    $scope.SemenAnalysisData = function SemenAnalysisData() {
        //
        var responseData = Common.getMasterList('M_SemenAnalysisInterpretation', 'SemenAIID', 'SemenAIDescription');
        responseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.InterpretationList = Response.data;


        }, function (error) {
            ////;
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };


    $scope.CheckSergicalSelected = function CheckSergicalSelected() {
        //
        if ($scope.SemenAnalysis.MethodOfCollection == 2)
            $scope.IsSergicalOptionSelected = false
        else {
            $scope.SemenAnalysis.MethodSurgicalSRetrievalID = 0;
            $scope.IsSergicalOptionSelected = true;
        }
    }


    $scope.ChangeCollectionTime = function () {
        debugger;
        $scope.SemenAnalysis.CollectionTime = $scope.SemenAnalysis.CollectionDate;
    };

    $scope.ChangeReceivingTime = function () {
        debugger;
        $scope.SemenAnalysis.ReceivingTime = $scope.SemenAnalysis.ReceivingDate;
    };

    $scope.LoadData = function LoadData() {
        $scope.ismeridian = true;
        $scope.maxTime = new Date();
        // $scope.PhyExamColorList();
        $scope.SemenAnalysis.SpremFreezingTime = new Date();
       // $scope.SemenAnalysis.CollectionTime = new Date();
       // $scope.SemenAnalysis.ReceivingTime = new Date();
        $scope.SemenAnalysis.SpremFreezingDate = new Date();
        $scope.SemenAnalysis.CollectionDate = new Date();
        $scope.SemenAnalysis.ReceivingDate = new Date();
        $scope.SemenAnalysis.CollectionTime = $scope.SemenAnalysis.CollectionDate.toTimeString();
        
        $scope.SemenAnalysis.ReceivingTime = $scope.SemenAnalysis.ReceivingDate.toTimeString();

        $scope.GetListSemenCollection();
        $scope.GetAppearanceList();
        $scope.GetLiquefactionTimeList();
        $scope.GetOdourList();
        $scope.FillAbstinenceList();
        $scope.GetEmbryologyDoctorsList();
        $scope.FillViscosityList();
        $scope.SemenAnalysisData();
        $scope.GetSemenColorList();
        $scope.FetchMethodSurgicalSRetrieval();
        $scope.GetSemenAnalysisList('', 'default');
        $scope.SurgicalSpermRetrievalInitilization();
        $scope.GetUserrights();

        if (($scope.selectedPatient.VisitID == 0 && $scope.selectedPatient.VisitUnitID == 0) || ($scope.selectedPatient.VisitID == undefined && $scope.selectedPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = false;
        else
            $scope.IsVisitMarked = true;
        if (!$scope.IsVisitMarked)
            angular.element(btnSaveUpdate).prop('disabled', true);
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
        //debugger
        $scope.IsViewBtnDisable = true;
        angular.forEach($scope.GetSALinkByPatientIDList, function (item) {
            if (!!item.selected) $scope.sNoArray.push(item.SNo);
            $scope.IsViewBtnDisable = false;
        })


        if ($scope.sNoArray.length < 1) {
            AlertMessage.info(objResource.msgTitle, 'Please select atleast one item.');
            return;
        }
        else {
            $scope.ViewBtnName = $scope.sNoArray[0];
        }


    }
    $scope.RedirectToSelf = function (SNo, SSRNo) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = SemenAnalysisService.GetSemenAnalysisList(SNo, 'GetSemenAnalysisBySNo');
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            debugger;
            $scope.SemenAnalysis = Response.data[0];
            $scope.CalcTeratozoospermicIndex($scope.SemenAnalysis);
            $scope.SemenAnalysis.DoneBy = $scope.SemenAnalysis.DoctorID;
            $scope.SemenAnalysis.CollectionDate = new Date($scope.SemenAnalysis.CollectionDate);
            $scope.SemenAnalysis.ReceivingDate = new Date($scope.SemenAnalysis.ReceivingDate);
            //   $scope.SemenAnalysis.CollectionTime = new Date($scope.SemenAnalysis.CollectionDate);
            $scope.SemenAnalysis.CollectionTime = $scope.SemenAnalysis.CollectionDate.toTimeString();

            $scope.SemenAnalysis.ReceivingTime = $scope.SemenAnalysis.ReceivingDate.toTimeString();
            if ($scope.SemenAnalysis.SumTotalNormal == 0)
            {
                debugger;
                $scope.SemenAnalysis.SumTotalAbnormal = null;
                $scope.SemenAnalysis.SumTotalNormal = null;
            }
            $scope.WHORanges($scope.SemenAnalysis);
            //   $scope.IsUpdateFinalize = $scope.SemenAnalysis.IsFinalize;
            debugger;
            if ($scope.SemenAnalysis.IsFinalize == true || !$scope.IsVisitMarked)
                angular.element(btnSaveUpdate).prop('disabled', true);
            else {
                angular.element(btnSaveUpdate).prop('disabled', false);
                $scope.GetUserrights();
            }
          //  $scope.CalculateNormalAbnormal();
            $scope.CheckSergicalSelected();

            // $scope.ChangeSampleCollection();

            $scope.SemenAnalysis.Vacuolated = $scope.SemenAnalysis.Vacuolated;
            //Change Save Button Name
            $scope.btnSaveUpdate = "Update";
            $scope.SNo = SNo;
            //by rohini to set null to 0
            if (Response.data[0].PH == 0)
                $scope.SemenAnalysis.PH = null;

            if (!$scope.isNullOrUndefined(SSRNo)) {
                $scope.ViewBtnName = SSRNo;
                $scope.IsViewBtnDisable = false;
            }
            else {
                $scope.ViewBtnName = 'View';
                $scope.IsViewBtnDisable = true;
            }

            if ($scope.SemenAnalysis.RBC == 'Present') {
                $scope.IsRBCPresent = true;
            } else $scope.IsRBCPresent = false;
         
            //by mayur
            if ($scope.SemenAnalysis.CollecteAtCentre)
                $scope.SemenAnalysis.InHouseSample = "Inhouse"
            else
                $scope.SemenAnalysis.InHouseSample = "Outside"


        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });


    };

    $scope.isNullOrUndefined = function (value) {
        return (!value) && (value === null)
    }
    //Redirect to Sergical Sperm Retrival
    $scope.RedirectToRetrival = function RedirectToRetrival(SNo) {
        //
        var ResponseData = SemenAnalysisService.GetSurgicalSpermRetrivalByPatientID(SNo);
        ResponseData.then(function (Response) {

            $scope.SurgicalSpermRetrieval = Response.data[0];
            $scope.SurgicalSpermRetrieval.SSRDate = new Date($scope.SurgicalSpermRetrieval.SSRDate);
            $scope.SurgicalSpermRetrieval.SSRTime = $scope.SurgicalSpermRetrieval.SSRTime;

            $scope.IndicationChanged();
            $scope.SiteChangedEvent();
            //Logic for show name in DDL

            var ComplicationArrayList = $scope.SurgicalSpermRetrieval.ComplicationIDs.split(',');
            var ComplicationIDByDescTemp = [];
            for (var i = 0; i < ComplicationArrayList.length; i++) {
                // Trim the excess whitespace.
                ComplicationIDByDescTemp.push($scope.ComplicationList[(ComplicationArrayList[i].replace(/^\s*/, "").replace(/\s*$/, "")) - 1].Description);
                $scope.SurgicalSpermRetrieval.ComplicationIDByDesc = ComplicationIDByDescTemp.join();
            }


        }, function (error) {
        });

    };

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


    //SampleCollection Radio button Logic

    $scope.ChangeSampleCollection = function () {
        debugger;

        if ($scope.SemenAnalysis.InHouseSample == 'Inhouse')
            $scope.SemenAnalysis.CollecteAtCentre = true;
        else
            $scope.SemenAnalysis.CollecteAtCentre = false;
    };


    $scope.CalculateNormalAbnormal = function CalculateNormalAbnormal() {
        //$scope.SemenAnalysis.SumTotalNormal = 0;
        //$scope.SemenAnalysis.SumTotalAbnormal = 0;
        //$scope.Bent = (angular.isUndefined($scope.SemenAnalysis.Bent) || $scope.SemenAnalysis.Bent == '') ? 0 : parseInt($scope.SemenAnalysis.Bent);

        //$scope.Thin = (angular.isUndefined($scope.SemenAnalysis.Thin) || $scope.SemenAnalysis.Thin == '') ? 0 : parseInt($scope.SemenAnalysis.Thin);

        //$scope.Thick = (angular.isUndefined($scope.SemenAnalysis.Thick) || $scope.SemenAnalysis.Thick == '') ? 0 : parseInt($scope.SemenAnalysis.Thick);

        //$scope.AsymmetricalInsertion = (angular.isUndefined($scope.SemenAnalysis.AsymmetricalInsertion) || $scope.SemenAnalysis.AsymmetricalInsertion == '') ? 0 : parseInt($scope.SemenAnalysis.AsymmetricalInsertion);

        //// $scope.Vacuoles = (angular.isUndefined($scope.SemenAnalysis.Vacuoles) || $scope.SemenAnalysis.Vacuoles == '') ? 0 : parseInt($scope.SemenAnalysis.Vacuoles);

        //$scope.Small = (angular.isUndefined($scope.SemenAnalysis.Small) || $scope.SemenAnalysis.Small == '') ? 0 : parseInt($scope.SemenAnalysis.Small);

        //$scope.Large = (angular.isUndefined($scope.SemenAnalysis.Large) || $scope.SemenAnalysis.Large == '') ? 0 : parseInt($scope.SemenAnalysis.Large);

        //$scope.Tapered = (angular.isUndefined($scope.SemenAnalysis.Tapered) || $scope.SemenAnalysis.Tapered == '') ? 0 : parseInt($scope.SemenAnalysis.Tapered);

        //$scope.RoundHead = (angular.isUndefined($scope.SemenAnalysis.RoundHead) || $scope.SemenAnalysis.RoundHead == '') ? 0 : parseInt($scope.SemenAnalysis.RoundHead);

        //$scope.Amorphous = (angular.isUndefined($scope.SemenAnalysis.Amorphous) || $scope.SemenAnalysis.Amorphous == '') ? 0 : parseInt($scope.SemenAnalysis.Amorphous);

        //$scope.Vacuolated = (angular.isUndefined($scope.SemenAnalysis.Vacuolated) || $scope.SemenAnalysis.Vacuolated == '') ? 0 : parseInt($scope.SemenAnalysis.Vacuolated);

        //$scope.Pyriform = (angular.isUndefined($scope.SemenAnalysis.Pyriform) || $scope.SemenAnalysis.Pyriform == '') ? 0 : parseInt($scope.SemenAnalysis.Pyriform);

        //$scope.Short = (angular.isUndefined($scope.SemenAnalysis.Short) || $scope.SemenAnalysis.Short == '') ? 0 : parseInt($scope.SemenAnalysis.Short);

        //$scope.Coiled = (angular.isUndefined($scope.SemenAnalysis.Coiled) || $scope.SemenAnalysis.Coiled == '') ? 0 : parseInt($scope.SemenAnalysis.Coiled);

        //$scope.DoubleTail = (angular.isUndefined($scope.SemenAnalysis.DoubleTail) || $scope.SemenAnalysis.DoubleTail == '') ? 0 : parseInt($scope.SemenAnalysis.DoubleTail);

        //$scope.CytoplasmicDroplet = (angular.isUndefined($scope.SemenAnalysis.CytoplasmicDroplet) || $scope.SemenAnalysis.CytoplasmicDroplet == '') ? 0 : parseInt($scope.SemenAnalysis.CytoplasmicDroplet);


        //$scope.SemenAnalysis.SumTotalAbnormal = $scope.Bent + $scope.Thin + $scope.Thick + $scope.AsymmetricalInsertion //+ $scope.Vacuoles
        //  + $scope.Small + $scope.Large + $scope.Tapered + $scope.RoundHead + $scope.Amorphous
        //  + $scope.Vacuolated + $scope.Pyriform + $scope.Short + $scope.Coiled + $scope.DoubleTail
        //  + $scope.CytoplasmicDroplet;

        //if ($scope.SemenAnalysis.SumTotalAbnormal > 0)
        //    $scope.IsDisableAbnormalForm = true;
        //else
        //    $scope.IsDisableAbnormalForm = false;

        $scope.ChangeTotalAbnormalValue();
    }

    $scope.SpermTypeList = function SpermTypeList() {
        //  //
        var ResponseData = Common.getMasterList('M_SpermType', 'SpermTypeID', 'SpermDescription');
        ResponseData.then(function (Response) {
            //  //
            // var tmpArr = [0, 6, 8, 10, 12, 13];
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SpermTypeList = Response.data;//.filter(x=>tmpArr.includes(x.ID));
            $scope.SemenAnalysis.SpermTypeID = 0;
        }, function (error) {
        });
    };

    $scope.FillAbstinenceList = function FillAbstinenceList() {
        //  //
        var ResponseData = Common.getMasterList('M_Abstinence', 'AbstID', 'Description');
        ResponseData.then(function (Response) {
            //     //
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AbstinenceList = Response.data;
            $scope.SemenAnalysis.AbstinenceID = 0;
        }, function (error) {
        });
    };

    $scope.FillViscosityList = function FillViscosityList() {
        var ResponseData = Common.getMasterList('M_IVF_Viscosity', 'IVFViscosityID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ViscosityList = Response.data;
            $scope.SemenAnalysis.ViscosityID = 0;
        }, function (error) {
        });
    }

    $scope.FillSpillageList = function FillSpillageList() {
        var ResponseData = Common.getMasterList('M_IVF_Viscosity', 'IVFViscosityID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.SpillageList = Response.data;
            $scope.SemenAnalysis.SpillageID = 0;
        }, function (error) {
        });
    }

    $scope.FillTankList = function FillTankList() {
        var ResponseData = Common.getMasterList('M_IVFTankMaster_Andrology', 'IVFTANKID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.TankList = Response.data;
            //$scope.SemenAnalysis.TankId = 0;
        }, function (error) {
        });
    }

    $scope.FillCanisterList = function FillCanisterList() {
        var ResponseData = Common.getMasterList('M_IVFCanisterMaster_Andrology', 'IVFCANISTERID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.CanisterList = Response.data;
            //       $scope.SemenAnalysis.CanisterID = 0;
        }, function (error) {
        });
    };

    $scope.FillCanList = function FillCanList() {
        var ResponseData = Common.getMasterList('M_IVFCanMaster_Andrology', 'IVFCANID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.CanList = Response.data;
            //    $scope.SemenAnalysis.CanID = 0;
        }, function (error) {
        });
    };

    $scope.GobletColorList = function GobletColorList() {
        var ResponseData = Common.getMasterList('M_IVFGobletColor', 'IVFGCOLORID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.GobletColorList = Response.data;
            //    $scope.SemenAnalysis.GobletColorID = 0;
        }, function (error) {
        });
    }

    $scope.GetOdourList = function GetOdourList() {
        //
        var ResponseData = Common.getMasterList('M_odour', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.OdourColorList = Response.data;
            $scope.SemenAnalysis.OdourID = 0;
        }, function (error) {
        });
    }

    $scope.GetAppearanceList = function GetAppearanceList() {
        //
        var ResponseData = Common.getMasterList('M_Appearance', 'ID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AppearanceListList = Response.data;
            $scope.SemenAnalysis.GobletColorID = 0;
        }, function (error) {
        });
    }


    $scope.GetLiquefactionTimeList = function GetLiquefactionTimeList() {

        var ResponseData = Common.getMasterList('M_LiquefactionTime', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.LiquefactionTimeList = Response.data;
            $scope.SemenAnalysis.LiquificationTime = 0;
        }, function (error) {
        });
    };

    $scope.VialsList = function VialsList() {
        var ResponseData = Common.getMasterList('M_IVFStrawMaster', 'IVFStrawID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.VialsList = Response.data;
            //   $scope.SemenAnalysis.StrawId = 0;
        }, function (error) {
        });
    }

    $scope.GobletSizeList = function GobletSizeList() {
        var ResponseData = Common.getMasterList('M_IVFGobletSizeMaster', 'IVFGobletSizeID', 'Description');
        ResponseData.then(function (Response) {
            ////  
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.GobletSizeList = Response.data;
            //    $scope.SemenAnalysis.GobletSizeId = 0;
        }, function (error) {
        });
    }

    $scope.GetEmbryologyDoctorsList = function FillCanList() {
        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {
            ////  
            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.DocList = Response.data;
            //$scope.SemenAnalysis.DoneBy = 0;
            //$scope.SemenAnalysis.WitnessedBy = 0;
        }, function (error) {
        });
    };

    $scope.FillViscosityList = function FillViscosityList() {
        var ResponseData = Common.getMasterList('M_IVF_Viscosity', 'IVFViscosityID', 'Description');
        ResponseData.then(function (Response) {
            ////
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ViscosityList = Response.data;
            $scope.SemenAnalysis.ViscosityID = 0;
        }, function (error) {
        });
    }

    $scope.AddRow = function () {
        //  //
        //$scope.CryoID = parseInt($scope.CryoID) + 1;
        //var len = Math.ceil(Math.log($scope.CryoID + 1) / Math.LN10);
        //if (len == 1) $scope.CryoID = '000' + $scope.CryoID;
        //else if (len == 2) $scope.CryoID = '00' + $scope.CryoID;
        //else if (len == 3) $scope.CryoID = '0' + $scope.CryoID;
        if ($scope.ListItem.length < 10) {
            $scope.ListItem.push({
                CryoNo: "",// "GS/" + JSON.parse(sessionStorage.getItem('UserInfo')).UnitID + "/" + new Date().getFullYear() + "/CPS/" + $scope.CryoID,
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
        var ResponseData = srvSemenAnalysis.GetMaxID();
        ResponseData.then(function (Response) {
            //
            $scope.CryoID = Response.data;
            $scope.AddRow();
        }, function (error) {
        });
    }

    $scope.RemoveRow = function RemoveRow(idx) {
        //   //
        if ($scope.ListItem.length > 1) {
            $scope.ListItem.splice(idx, 1);
            $scope.SemenAnalysis.NoOfVials = $scope.SemenAnalysis.NoOfVials - 1
        }
    }
    $scope.ValidateSemenPrep = function () {
        debugger;
        var IsValid = true;
        
        $scope.SemenAnalysis.CollectionDate = Date.parse($scope.SemenAnalysis.CollectionDate.toString("MM.dd.yyyy") + " " + $scope.SemenAnalysis.CollectionTime);
        $scope.SemenAnalysis.CollectionDate = new Date($scope.SemenAnalysis.CollectionDate);
        $scope.SemenAnalysis.ReceivingDate = Date.parse($scope.SemenAnalysis.ReceivingDate.toString("MM.dd.yyyy") + " " + $scope.SemenAnalysis.ReceivingTime);
        $scope.SemenAnalysis.ReceivingDate = new Date($scope.SemenAnalysis.ReceivingDate);

        //$scope.SemenAnalysis.CollectionDate = new Date($scope.SemenAnalysis.CollectionDate.getFullYear(), $scope.SemenAnalysis.CollectionDate.getMonth(), $scope.SemenAnalysis.CollectionDate.getDate(),
        //   $scope.SemenAnalysis.CollectionTime.getHours(), $scope.SemenAnalysis.CollectionTime.getMinutes(), 0)
        //$scope.SemenAnalysis.ReceivingDate = new Date($scope.SemenAnalysis.ReceivingDate.getFullYear(), $scope.SemenAnalysis.ReceivingDate.getMonth(), $scope.SemenAnalysis.ReceivingDate.getDate(),
        //    $scope.SemenAnalysis.ReceivingTime.getHours(), $scope.SemenAnalysis.ReceivingTime.getMinutes(), 0)

        debugger;
        if (
            //$filter('date')($scope.SemenAnalysis.CollectionDate, 'shortDate') > $filter('date')($scope.SemenAnalysis.ReceivingDate, 'shortDate')) {    //commented by Nayan Kamble on 28/11/2019
            $scope.SemenAnalysis.CollectionDate > $scope.SemenAnalysis.ReceivingDate) {     //modified by Nayan Kamble on 28/11/2019
            AlertMessage.info(objResource.msgTitle, 'Collection date should be less than or equal to Receiving Date');
            IsValid = false;
        }

        else if (angular.isUndefined($scope.SemenAnalysis.CollectionTime) || $scope.SemenAnalysis.CollectionTime == '' || $scope.SemenAnalysis.CollectionTime == null) {
            AlertMessage.info(objResource.msgTitle, 'Select collection time');
            IsValid = false;
        }

        else if ($filter('date')($scope.SemenAnalysis.CollectionTime, 'h:mm a') > $filter('date')($scope.SemenAnalysis.ReceivingTime, 'h:mm a') && $filter('date')($scope.SemenAnalysis.CollectionDate, 'shortDate') == $filter('date')($scope.SemenAnalysis.ReceivingDate, 'shortDate')) {
            AlertMessage.info(objResource.msgTitle, 'Collection time should be equal to or less than receving Time');
            IsValid = false;
        }
        else if (angular.isUndefined($scope.SemenAnalysis.ReceivingTime) || $scope.SemenAnalysis.ReceivingTime == '' || $scope.SemenAnalysis.ReceivingTime == null) {
            AlertMessage.info(objResource.msgTitle, 'Select receiving time');
            IsValid = false;
        }
        else if ($scope.SemenAnalysis.MethodOfCollection == 0) {
            AlertMessage.info(objResource.msgTitle, 'Select Method of Semen Collection');
            IsValid = false;
        }
        else if($scope.SemenAnalysis.WitnessedBy == 0 || $scope.SemenAnalysis.DoneBy == 0){
            AlertMessage.info(objResource.msgTitle, 'Witnessed By and  Done By can not be Empty');
            IsValid = false;
        }
        else if ($scope.SemenAnalysis.WitnessedBy == $scope.SemenAnalysis.DoneBy) {
            AlertMessage.info(objResource.msgTitle, 'Witnessed By and  Done By can not be same');
            IsValid = false;
        }
        else if ($scope.SemenAnalysis.Volume == undefined) {
            AlertMessage.info(objResource.msgTitle, 'Enter Volume');
            IsValid = false;
        }
        else if ($scope.SemenAnalysis.SpermConcentration == undefined) {
            AlertMessage.info(objResource.msgTitle, 'Enter Sperm Concentration');
            IsValid = false;
        }
        else if ($scope.SemenAnalysis.GradeA == undefined) {
            AlertMessage.info(objResource.msgTitle, 'Enter Progressive');
            IsValid = false;
        }
        else if ($scope.SemenAnalysis.GradeB == undefined) {
            AlertMessage.info(objResource.msgTitle, 'Enter Non-Progressive');
            IsValid = false;
        }
        else if ($scope.SemenAnalysis.InterpretationsID == 0) {            //Added by Nayan Kamble 
            AlertMessage.info(objResource.msgTitle, 'Select Interpretation');
            IsValid = false;
        }
        
        //else if ($scope.SemenAnalysis.WitnessedBy == $scope.SemenAnalysis.DoneBy) {          //removed as per client req
        //    AlertMessage.info(objResource.msgTitle, 'Witnessed By and  Done By can not be same');
        //    IsValid = false;
        //}
        return IsValid;
    }
    $scope.SaveUpdate = function (SemenAnalysis) {
        debugger;
     
        if ($scope.ValidateSemenPrep()) {
            debugger;
            //  $scope.SemenAnalysisUpdate.ID = SemenAnalysis.ID;           
            if ($scope.sNoArray != null)
                SemenAnalysis.SSRNo = $scope.sNoArray[0];

            //If Update Send SNo 
            if ($scope.btnSaveUpdate == "Update")
                SemenAnalysis.SNo = $scope.SNo;

            //SemenAnalysis.CollectionDate = new Date(SemenAnalysis.CollectionDate.getFullYear(), SemenAnalysis.CollectionDate.getMonth(), SemenAnalysis.CollectionDate.getDate(),
            // SemenAnalysis.CollectionTime.getHours(), SemenAnalysis.CollectionTime.getMinutes(), 0)
            SemenAnalysis.CollectionDate = $filter('date')(SemenAnalysis.CollectionDate, 'medium')
            // SemenAnalysis.ReceivingDate = new Date(SemenAnalysis.ReceivingDate.getFullYear(), SemenAnalysis.ReceivingDate.getMonth(), SemenAnalysis.ReceivingDate.getDate(),
            //    SemenAnalysis.ReceivingTime.getHours(), SemenAnalysis.ReceivingTime.getMinutes(), 0)
            SemenAnalysis.ReceivingDate = $filter('date')(SemenAnalysis.ReceivingDate, 'medium')
            var Promise = SemenAnalysisService.SaveUpdate(SemenAnalysis);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    AlertMessage.info(objResource.msgTitle, 'Record saved successfully.');
                    $scope.SemenAnalysis = {};
                }
                else if (resp.data == 2) {
                    AlertMessage.info(objResource.msgTitle, 'Record updated successfully.');
                    $scope.SemenAnalysis = {};
                    $scope.btnSaveUpdate = "Save"
                }
                //Reload Table Content
                $scope.LoadData();
            }, function (error) {
            });
        }
        else {
            $scope.frmSemenAnalysis.SpermConcentration.$dirty = true;
            $scope.frmSemenAnalysis.txtProgressive.$dirty = true;
            $scope.frmSemenAnalysis.txtNonProgressive.$dirty = true;
            $scope.frmSemenAnalysis.txtImmotile.$dirty = true;
            $scope.frmSemenAnalysis.ddlDoneby.$dirty = true;
            $scope.frmSemenAnalysis.ddlWitnessedby.$dirty = true;
            $scope.frmSemenAnalysis.ddlInterpretation.$dirty = true;
            $scope.frmSemenAnalysis.ddlSemenCollection.$dirty = true;
            $scope.frmSemenAnalysis.Volume.$dirty = true;
        }
    }
    $scope.CalculateMotilityAss = function () {

        if ((angular.isDefined($scope.SemenAnalysis.GradeA) && $scope.SemenAnalysis.GradeA != '') && (angular.isDefined($scope.SemenAnalysis.GradeB) && $scope.SemenAnalysis.GradeB != '')) {
            //$scope.IsPrograssiveEntered = false; //enable when prograssive entered
            $scope.SemenAnalysis.Motility = parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB);
            $scope.ChkImmotile();
            $scope.SemenAnalysis.GradeC = 100 - (parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB));
            if ($scope.SemenAnalysis.GradeC < 0) {
                $scope.SemenAnalysis.GradeA = null;//$scope.OGradeA;
                //$scope.SemenAnalysis.GradeB = $scope.OGradeB;
                $scope.SemenAnalysis.GradeC = $scope.OGradeC;
                $scope.SemenAnalysis.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isDefined($scope.SemenAnalysis.GradeA) && $scope.SemenAnalysis.GradeA != '') && ($scope.SemenAnalysis.GradeB == '' || angular.isUndefined($scope.SemenAnalysis.GradeB)) && (angular.isDefined($scope.SemenAnalysis.GradeC) && $scope.SemenAnalysis.GradeC != '')) {
            $scope.SemenAnalysis.GradeB = 100 - (parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeC));
            $scope.SemenAnalysis.Motility = parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB);
            if ($scope.SemenAnalysis.GradeB < 0) {
                $scope.SemenAnalysis.GradeA = null;//$scope.OGradeA;
                // $scope.SemenAnalysis.GradeB = $scope.OGradeB;
                $scope.SemenAnalysis.GradeC = $scope.OGradeC;
                $scope.SemenAnalysis.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isUndefined($scope.SemenAnalysis.GradeA) || $scope.SemenAnalysis.GradeA == '') && ($scope.SemenAnalysis.GradeB != '' || angular.isDefined($scope.SemenAnalysis.GradeB)) && (angular.isDefined($scope.SemenAnalysis.GradeC) && $scope.SemenAnalysis.GradeC != '')) {
            $scope.SemenAnalysis.GradeA = 100 - (parseInt($scope.SemenAnalysis.GradeB) + parseInt($scope.SemenAnalysis.GradeC));
            $scope.SemenAnalysis.Motility = parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB);
            if ($scope.SemenAnalysis.GradeA < 0) {
                $scope.SemenAnalysis.GradeA = null;//$scope.OGradeA;
                // $scope.SemenAnalysis.GradeB = $scope.OGradeB;
                $scope.SemenAnalysis.GradeC = $scope.OGradeC;
                $scope.SemenAnalysis.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
    }
    $scope.CalculateMotilityAss1 = function () {

        if ((angular.isDefined($scope.SemenAnalysis.GradeA) && $scope.SemenAnalysis.GradeA != '') && (angular.isDefined($scope.SemenAnalysis.GradeB) && $scope.SemenAnalysis.GradeB != '')) {
            $scope.SemenAnalysis.Motility = parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB);
            $scope.ChkImmotile();
            $scope.SemenAnalysis.GradeC = 100 - (parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB));
            if ($scope.SemenAnalysis.GradeC < 0) {
                //$scope.SemenAnalysis.GradeA = $scope.OGradeA;
                $scope.SemenAnalysis.GradeB = null;//$scope.OGradeB;
                $scope.SemenAnalysis.GradeC = $scope.OGradeC;
                $scope.SemenAnalysis.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isDefined($scope.SemenAnalysis.GradeA) && $scope.SemenAnalysis.GradeA != '') && ($scope.SemenAnalysis.GradeB == '' || angular.isUndefined($scope.SemenAnalysis.GradeB)) && (angular.isDefined($scope.SemenAnalysis.GradeC) && $scope.SemenAnalysis.GradeC != '')) {
            $scope.SemenAnalysis.GradeB = 100 - (parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeC));
            $scope.SemenAnalysis.Motility = parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB);
            if ($scope.SemenAnalysis.GradeB < 0) {
                // $scope.SemenAnalysis.GradeA = $scope.OGradeA;
                $scope.SemenAnalysis.GradeB = null;//$scope.OGradeB;
                $scope.SemenAnalysis.GradeC = $scope.OGradeC;
                $scope.SemenAnalysis.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
        else if ((angular.isUndefined($scope.SemenAnalysis.GradeA) || $scope.SemenAnalysis.GradeA == '') && ($scope.SemenAnalysis.GradeB != '' || angular.isDefined($scope.SemenAnalysis.GradeB)) && (angular.isDefined($scope.SemenAnalysis.GradeC) && $scope.SemenAnalysis.GradeC != '')) {
            $scope.SemenAnalysis.GradeA = 100 - (parseInt($scope.SemenAnalysis.GradeB) + parseInt($scope.SemenAnalysis.GradeC));
            $scope.SemenAnalysis.Motility = parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB);
            if ($scope.SemenAnalysis.GradeA < 0) {
                //   $scope.SemenAnalysis.GradeA = $scope.OGradeA;
                $scope.SemenAnalysis.GradeB = $scope.OGradeB;
                $scope.SemenAnalysis.GradeC = $scope.OGradeC;
                $scope.SemenAnalysis.Motility = null;
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);
            }
        }
    }
    $scope.ChkImmotile = function () {
        //  //
        if (parseInt($scope.SemenAnalysis.GradeA) + parseInt($scope.SemenAnalysis.GradeB) + parseInt($scope.SemenAnalysis.GradeC) > 100)
            AlertMessage.info(objResource.msgTitle, objResource.msgErrorProgNonProgTitle);


    }

    //Check validation for Bold class to Progressive field
    $scope.ChkProgBoldValidation = function () {
        if ($scope.SemenAnalysis.GradeA < 32)
            $scope.txtProgBoldClass = "text-bold";
        else
            $scope.txtProgBoldClass = "";
    }
    //Check validation for Bold class to Progressive field
    $scope.ChkTotMotilityBoldValidation = function () {
        if ($scope.SemenAnalysis.Motility < 40)
            $scope.txtTotMotilityBoldClass = "text-bold";
        else
            $scope.txtTotMotilityBoldClass = "";
    }

    $scope.GetSemenAnalysisList = function (SNo, Action) {
        //
        if (Action == 'default') {
            usSpinnerService.spin('GridSpinner');
            var ResponseData = SemenAnalysisService.GetSemenAnalysisList(SNo, Action);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                $scope.SemenAnalysisList = Response.data;

            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });
        }
        else if (Action == 'GetSemenAnalysisBySNo') {
            usSpinnerService.spin('GridSpinner');
            var ResponseData = SemenAnalysisService.GetSemenAnalysisList(SNo, Action);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                $scope.SemenAnalysisListBySNo = Response.data;

            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            });

        }
    }

    $scope.GetSALinkByPatientID = function (MethodOfSurgicalSpermRetrivalID) {
        //
        var ResponseData = SemenAnalysisService.GetSALinkByPatientID(MethodOfSurgicalSpermRetrivalID);
        ResponseData.then(function (Response) {
            //
            $scope.GetSALinkByPatientIDList = Response.data;

        }, function (error) {
        });

    }

    $scope.CalcRapidProg = function () {
        //
        if ($scope.SemenAnalysis.GradeA == undefined || $scope.SemenAnalysis.GradeA == '') {
            AlertMessage.info(objResource.msgTitle, 'Select progressive first.');
        }
        else {
            // if (parseInt($scope.ORapidProgressive) != parseInt($scope.SemenAnalysis.RapidProgressive)) {
            $scope.SemenAnalysis.RapidProgressive = parseInt($scope.SemenAnalysis.GradeA) - parseInt($scope.SemenAnalysis.SlowProgressive);
            if ($scope.SemenAnalysis.RapidProgressive < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.SemenAnalysis.RapidProgressive = $scope.ORapidProgressive;
                $scope.SemenAnalysis.SlowProgressive = $scope.OSlowProgressive;
            }
            //if (parseInt($scope.SemenAnalysis.SlowProgressive))
            //    $scope.IsMandatory = true;
            //else $scope.IsMandatory = false;
            // }
        }
    }

    $scope.CalcSlowProg = function () {
        //
        if ($scope.SemenAnalysis.GradeA == undefined || $scope.SemenAnalysis.GradeA == '') {
            AlertMessage.info(objResource.msgTitle, 'Select progressive first.');
        }
        else {
            //if (parseInt($scope.OSlowProgressive) != parseInt($scope.SemenAnalysis.SlowProgressive)) {
            $scope.SemenAnalysis.SlowProgressive = parseInt($scope.SemenAnalysis.GradeA) - parseInt($scope.SemenAnalysis.RapidProgressive);
            if ($scope.SemenAnalysis.SlowProgressive < 0) {
                AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                $scope.SemenAnalysis.SlowProgressive = $scope.OSlowProgressive;
                $scope.SemenAnalysis.RapidProgressive = $scope.ORapidProgressive;
            }
            //if (parseInt($scope.SemenAnalysis.RapidProgressive))
            //    $scope.IsMandatory = true;
            //else $scope.IsMandatory = false;
            //}
        }
    }

    $scope.AdvTotProgMotility = function () {    // not in use
        if ($scope.SemenAnalysis.GradeA == undefined || $scope.SemenAnalysis.GradeA == '') {
            AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
        }
        else {
            if ($scope.OSlowProgressive != parseInt($scope.SemenAnalysis.SlowProgressive)) {
                //if ((angular.isDefined($scope.SemenAnalysis.RapidProgressive) || $scope.SemenAnalysis.RapidProgressive == '')) {
                if (isNaN($scope.SemenAnalysis.SlowProgressive)) $scope.SemenAnalysis.SlowProgressive = '';
                if (isNaN($scope.SemenAnalysis.RapidProgressive)) $scope.SemenAnalysis.RapidProgressive = '';
                $scope.SemenAnalysis.RapidProgressive = parseInt($scope.SemenAnalysis.GradeA) - parseInt($scope.SemenAnalysis.SlowProgressive);
                if ($scope.SemenAnalysis.RapidProgressive < 0) {
                    AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                    $scope.SemenAnalysis.RapidProgressive = '';
                } else {
                    $scope.ORapidProgressive = parseInt($scope.SemenAnalysis.RapidProgressive);
                    $scope.OSlowProgressive = parseInt($scope.SemenAnalysis.SlowProgressive);
                    if (parseInt($scope.SemenAnalysis.SlowProgressive))
                        $scope.IsMandatory = true;
                    else $scope.IsMandatory = false;
                }
                //  }
            }
            else if ($scope.ORapidProgressive != parseInt($scope.SemenAnalysis.RapidProgressive)) {
                //   if ((angular.isDefined($scope.SemenAnalysis.SlowProgressive) || $scope.SemenAnalysis.SlowProgressive == '')) {
                if (isNaN($scope.SemenAnalysis.SlowProgressive)) $scope.SemenAnalysis.SlowProgressive = '';
                if (isNaN($scope.SemenAnalysis.RapidProgressive)) $scope.SemenAnalysis.RapidProgressive = '';
                if ($scope.SemenAnalysis.RapidProgressive != '')
                    $scope.SemenAnalysis.SlowProgressive = parseInt($scope.SemenAnalysis.GradeA) - parseInt($scope.SemenAnalysis.RapidProgressive);
                if ($scope.SemenAnalysis.SlowProgressive < 0) {
                    AlertMessage.info(objResource.msgTitle, objResource.msgErrorRapidSlowProgressTitle);
                    $scope.SemenAnalysis.SlowProgressive = '';
                } else {
                    $scope.OSlowProgressive = parseInt($scope.SemenAnalysis.SlowProgressive);
                    $scope.ORapidProgressive = parseInt($scope.SemenAnalysis.RapidProgressive);
                    if (parseInt($scope.SemenAnalysis.RapidProgressive))
                        $scope.IsMandatory = true;
                    else $scope.IsMandatory = false;
                }
                //  }
            }
        }
    }

    $scope.ValidateSemenAnalysisDetail = function () {
        //  //
        angular.forEach($scope.ListItem, function (i) {
            //
            i.ExpiryDate = new Date(i.ExpiryDate);
            if (i.TankId == 0)
                i.IsTank = true;
            if (i.Volume == undefined || i.Volume == '')
                i.IsVolume = true;
        })
        $scope.IsValidSemenAnalysisDetail = true;
        //$scope.IsValidSemenAnalysisDetail = $scope.ListItem.some(x => x.TankId == 0 || (x.Volume == undefined || x.Volume == ''));

        for (var i = 0; i <= $scope.IsValidSemenAnalysisDetail.length - 1; i++) {
            if ($scope.IsValidSemenAnalysisDetail[i].TankId == 0 || ($scope.IsValidSemenAnalysisDetail[i].Volume == undefined || $scope.ListItem[i].Volume == '')) {
                $scope.IsValidSemenAnalysisDetail = false;
                break;
            }
        }
        if ($scope.IsValidSemenAnalysisDetail) {
            angular.forEach($scope.ListItem, function (j) {
                $scope.CryoID = parseInt($scope.CryoID) + 1;
                var len = Math.ceil(Math.log($scope.CryoID + 1) / Math.LN10);
                if (len == 1) $scope.CryoID = '000' + $scope.CryoID;
                else if (len == 2) $scope.CryoID = '00' + $scope.CryoID;
                else if (len == 3) $scope.CryoID = '0' + $scope.CryoID;
                j.CryoNo = "GS/" + localStorageService.get('UserInfo').UnitID + "/" + new Date().getFullYear() + "/CPS/" + $scope.CryoID;
            })
        }
    }

    $scope.checkSum = function () {
        if (parseFloat($scope.SemenAnalysis.Volume) < 1.5)
            $scope.txtVolBoldClass = "text-bold";
        else
            $scope.txtVolBoldClass = "";

    }

    $scope.CheckPHValue = function () {
        if (parseFloat($scope.SemenAnalysis.PH) < 7.2)
            $scope.txtPHBoldClass = "text-bold";
        else
            $scope.txtPHBoldClass = "";

    }

    $scope.CalculateViability = function () {
        if (parseFloat($scope.SemenAnalysis.Viability) < 58)
            $scope.txtViabilityBoldClass = "text-bold";
        else
            $scope.txtViabilityBoldClass = "";
    }

    $scope.valiadePH = function (val, eve) {
        debugger;
        var isDecimal = false;
        if (angular.isDefined(val)) {
            var count = val.split('.').length - 1;
            isDecimal = val.indexOf(".") == -1 ? false : true;
        }
        if (!isDecimal && angular.isDefined(val)) {
            if (val.length == 0) {
                if (val.length <= 1 && ([48, 49, 96, 97, 110, 190, 8].indexOf(eve.which) > -1)) {
                    return true;
                }
                else eve.preventDefault();
            }
            if (val.length <= 1 && val != '') {
                if (val.length <= 1 && ([48, 49, 50, 51, 52, 96, 97, 98, 99, 100, 110, 190, 8].indexOf(eve.which) > -1)) {
                    return true;
                }
                else eve.preventDefault();
            }
            else if (val.length == 2 && (eve.which == 110 || eve.which == 190 || eve.which == 8)) {
                if (parseInt(val) < 14 || eve.which == 8)
                    return true;
                else eve.preventDefault();
            }
            else eve.preventDefault();
        }
        else if (isDecimal) {
            var arr = [];
            arr = val.split('.');
            if (count > 0 && (eve.which == 110 || eve.which == 190)) {
                eve.preventDefault();
            }
            else if (eve.which == 8) { //bkspc
                return true;
            }
            else if (arr[1].length > 0) {
                eve.preventDefault();
            }
            else if (parseInt(arr[0]) < 14) {
            }
            else {
                eve.preventDefault();
            }
        }
    }

    $scope.GetUserrights = function () {
        debugger;
        var lstUserRights = Common.getUserRights();
        //  if ($scope.selectedPatient.GenderID == 1) {
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 315 && lstUserRights[z].Active)//Male History
            {
                $scope.objRgt = lstUserRights[z];
                break;
            }
        }
        // }
        if (!$scope.objRgt.IsCreate && $scope.btnSaveUpdate == "Save") {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }
        else if (!$scope.objRgt.IsUpdate && $scope.btnSaveUpdate == "Update") {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }
        else {
            angular.element(btnSaveUpdate).prop('disabled', false);
        }
    }

    $scope.Cancel = function () {
        $location.path('/EMRLandingPage/');
    }

    $scope.Timechanged = function (e) {
        debugger;
        if ($filter('date')($scope.SemenAnalysis.CollectionDate, 'dd/MM/yyyy') == $filter('date')(new Date(), 'dd/MM/yyyy')) {
            var pppppp = $filter('date')(new Date(), 'shortTime');
            if ($filter('date')($scope.SemenAnalysis.CollectionTime, 'shortTime') > $filter('date')(new Date(), 'shortTime')) {
                e.preventDefault();
            }
        }
    };

    $scope.CalcTeratozoospermicIndex = function (sa) {
        debugger;

        sa.TeratozoospermicIndex = (parseInt(sa.HeadDefects) + parseInt(sa.NeckMidpieceDefects) + parseInt(sa.TailDefects)) / parseInt(sa.SumTotalAbnormal);
        var numberFilter = $filter('number');
        sa.TeratozoospermicIndex = numberFilter(sa.TeratozoospermicIndex, 2);


        //var c = 0; var p = 0; var q = 0;
        //if (angular.isNumber(parseInt(sa.Small)) && angular.isDefined(sa.Small))
        //    c += parseInt(sa.Small);
        //if (angular.isNumber(parseInt(sa.Large)) && angular.isDefined(sa.Large))
        //    c = c + parseInt(sa.Large);
        //if (angular.isNumber(parseInt(sa.Tapered)) && angular.isDefined(sa.Tapered))
        //    c = c + parseInt(sa.Tapered);
        //if (angular.isNumber(parseInt(sa.RoundHead)) && angular.isDefined(sa.RoundHead))
        //    c = c + parseInt(sa.RoundHead);
        //if (angular.isNumber(parseInt(sa.Amorphous)) && angular.isDefined(sa.Amorphous))
        //    c = c + parseInt(sa.Amorphous);
        //if (angular.isNumber(parseInt(sa.Vacuolated)) && angular.isDefined(sa.Vacuolated))
        //    c = c + parseInt(sa.Vacuolated);
        //if (angular.isNumber(parseInt(sa.Pyriform)) && angular.isDefined(sa.Pyriform))
        //    c = c + parseInt(sa.Pyriform);

        //if (angular.isNumber(parseInt(sa.Bent)) && angular.isDefined(sa.Bent))
        //    p += parseInt(sa.Bent);
        //if (angular.isNumber(parseInt(sa.Thin)) && angular.isDefined(sa.Thin))
        //    p += parseInt(sa.Thin);
        //if (angular.isNumber(parseInt(sa.Thick)) && angular.isDefined(sa.Thick))
        //    p += parseInt(sa.Thick);
        //if (angular.isNumber(parseInt(sa.AsymmetricalInsertion)) && angular.isDefined(sa.AsymmetricalInsertion))
        //    p += parseInt(sa.AsymmetricalInsertion);
        //if (angular.isNumber(parseInt(sa.Vacuoles)) && angular.isDefined(sa.Vacuoles))
        //    p += parseInt(sa.Vacuoles);

        //if (angular.isNumber(parseInt(sa.Short)) && angular.isDefined(sa.Short))
        //    q += parseInt(sa.Short);
        //if (angular.isNumber(parseInt(sa.Coiled)) && angular.isDefined(sa.Coiled))
        //    q += parseInt(sa.Coiled);
        //if (angular.isNumber(parseInt(sa.DoubleTail)) && angular.isDefined(sa.DoubleTail))
        //    q += parseInt(sa.DoubleTail);
        //if (angular.isNumber(parseInt(sa.CytoplasmicDroplet)) && angular.isDefined(sa.CytoplasmicDroplet))
        //    q += parseInt(sa.CytoplasmicDroplet);


        //sa.TeratozoospermicIndex = (c + p + q) / parseInt(sa.SumTotalAbnormal).toFixed(2);
        //var numberFilter = $filter('number');
        //sa.TeratozoospermicIndex == numberFilter(sa.TeratozoospermicIndex, 2);

    }

    $scope.WHORanges = function (SemenAnalysis) {
        debugger;
        $scope.whoVolume = false; $scope.whoSpermCount = false; $scope.whoSpermConc = false; $scope.whoTotMotility = false; $scope.whoProgMotility = false;
        $scope.whoVitality = false; $scope.whoMorphology = false; $scope.whoPH = false; $scope.whoWBC = false;
        if (parseInt(SemenAnalysis.TotalSpermCount) < 40) $scope.whoSpermCount = true;
        else $scope.whoSpermCount = false;

        if ((parseFloat(SemenAnalysis.Volume) < 1.5) || parseFloat(SemenAnalysis.Volume) > 2) $scope.whoVolume = true;
        else $scope.whoVolume = false;

        if ((parseFloat(SemenAnalysis.SpermConcentration) < 20)) $scope.whoSpermConc = true;
        else $scope.whoSpermConc = false;

        if ((parseFloat(SemenAnalysis.Motility) < 40)) $scope.whoTotMotility = true;
        else $scope.whoTotMotility = false;

        if ((parseFloat(SemenAnalysis.Vitality) < 60)) $scope.whoVitality = true;
        else $scope.whoVitality = false;

        if ((parseFloat(SemenAnalysis.PH) < 7.2)) $scope.whoPH = true;
        else $scope.whoPH = false;

        if ((parseFloat(SemenAnalysis.GradeA) < 30)) $scope.whoProgMotility = true;
        else $scope.whoProgMotility = false;

        if (parseFloat(SemenAnalysis.WBC) > 1) $scope.whoWBC = true;
        else $scope.whoWBC = false;
    }
    $scope.calcPrognosis = function (Didx) {
        if (Didx > 50) {
            $scope.SemenAnalysis.PrognosisID = 4;
        }
        else if (Didx >= 15 && Didx <= 25) {
            $scope.SemenAnalysis.PrognosisID = 2;
        }
        else if (Didx > 25 && Didx <= 50) {
            $scope.SemenAnalysis.PrognosisID = 3;
        }
        else if (Didx < 15) {
            $scope.SemenAnalysis.PrognosisID = 1;
        }
        else $scope.SemenAnalysis.PrognosisID = 0;
    }

    //added by arz on 09012018
    $scope.SetInterpretationIDByCondition = function (SemenAnalysis) {
        debugger;
        if (((parseFloat(SemenAnalysis.Volume) > 1.5) && parseFloat(SemenAnalysis.Volume) < 2)
             && (parseInt(SemenAnalysis.TotalSpermCount) < 40)
             && (parseFloat(SemenAnalysis.SpermConcentration) < 20)
             && ((parseFloat(SemenAnalysis.Motility) < 40))
             && (parseFloat(SemenAnalysis.GradeA) < 30)
             && (parseFloat(SemenAnalysis.Vitality) < 60)
             && (SemenAnalysis.SumTotalAbnormal > 4)
             && (parseFloat(SemenAnalysis.PH) < 7.2)
             && (parseInt(SemenAnalysis.GradeC) > 60)) {
            $scope.SemenAnalysis.InterpretationsID = 1; //Normozoospermia
        }
        else if (parseFloat(SemenAnalysis.SpermConcentration) > 0 && parseFloat(SemenAnalysis.SpermConcentration) < 20) {
            $scope.SemenAnalysis.InterpretationsID = 2;  //Oligozoospermia
        }
        else if (parseInt(SemenAnalysis.GradeC) == 100) {
            $scope.SemenAnalysis.InterpretationsID = 3;  //Asthenozoospermia
        }
        else if (parseFloat(SemenAnalysis.SpermConcentration) == 0) {
            $scope.SemenAnalysis.InterpretationsID = 4;  //Azoospermia
        }
        else if ((SemenAnalysis.TotalSpermCount < 40) && (SemenAnalysis.GradeC > 60)) {
            $scope.SemenAnalysis.InterpretationsID = 5;  //Oligoasthenozoospermia  
        }
        else if ((SemenAnalysis.TotalSpermCount < 40) && (parseFloat(SemenAnalysis.Motility) < 40) && (SemenAnalysis.SumTotalAbnormal > 4)) {
            $scope.SemenAnalysis.InterpretationsID = 6;  //Oligoasthenoteratozoospermia
        }
        else if ((SemenAnalysis.SpermConcentration <= 3) && (SemenAnalysis.SumTotalNormal < 4)) {
            $scope.SemenAnalysis.InterpretationsID = 7;  //Oligoteratozoospermia
        }
        else if ((SemenAnalysis.Motility < 40) && (SemenAnalysis.SumTotalAbnormal > 4)) {
            $scope.SemenAnalysis.InterpretationsID = 19;  //Asthenoteratozoospermia
        }
        else if (SemenAnalysis.Vitality < 60) {
            $scope.SemenAnalysis.InterpretationsID = 20;  //Necrozoospermia
        }

    }

    $scope.onPusCellsChange = function onPusCellsChange(PusCellsID) {
        debugger;
        var PusCellsDesc = $.grep($scope.PresentAbsentList, function (PusCells) {
            return PusCells.ID == PusCellsID;
        })[0].Description;

        $scope.SemenAnalysis.PusCells = PusCellsDesc;
    }

    $scope.onRBCChange = function onRBCChange(RBCID) {
        debugger;
        var RBCDesc = $.grep($scope.PresentAbsentList, function (RBC) {
            return RBC.ID == RBCID;
        })[0].Description;
        $scope.SemenAnalysis.RBC = RBCDesc;
        if (RBCDesc == 'Present') {
            $scope.IsRBCPresent = true;
        } else { $scope.IsRBCPresent = false; }
    }
});

//PIVF.directive('allowDecimalNumbers', function () {
//    return {
//        restrict: 'A',
//        link: function (scope, elm, attrs, ctrl) {
//            elm.on('keydown', function (event) {
//                var $input = $(this);
//                var value = $input.val();
//                value = value.replace(/[^0-9\.]/g, '')
//                var findsDot = new RegExp(/\./g)
//                var containsDot = value.match(findsDot)
//                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
//                    event.preventDefault();
//                    return false;
//                }
//                $input.val(value);
//                if (event.which == 64 || event.which == 16) {
//                    // numbers  
//                    return false;
//                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
//                    // backspace, enter, escape, arrows  
//                    return true;
//                } else if (event.which >= 48 && event.which <= 57) {
//                    // numbers  
//                    return true;
//                } else if (event.which >= 96 && event.which <= 105) {
//                    // numpad number  
//                    return true;
//                } else if ([46, 110, 190].indexOf(event.which) > -1) {
//                    // dot and numpad dot  
//                    return true;
//                } else {
//                    event.preventDefault();
//                    return false;
//                }
//            });
//        }
//    }
//});
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

/*Added by divya on 30July2020*/ 

function isNumberKey(evt, obj) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

/*Ended by divya*/

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
                    status: {
                    },
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
                        status: {
                        },
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
