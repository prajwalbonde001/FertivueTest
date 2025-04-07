angular.module('PIVF').controller('SurgicalSpermRetrievalController', function ($scope,$timeout, $rootScope, $location, SurgicalSpermRetrievalService, Common, srvCommon, $uibModal, $window, AlertMessage, SemenAnalysisService, srvSemenFreez, usSpinnerService, $filter) {
    debugger;
    /*START : Global variables declarations section */
    $scope.SurgicalSpermRetrieval = {};
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.btnSaveUpdate = "Save";
    $scope.IndicationObstructiveList = [];
    $scope.SurgicalSpermRetrieval.ComplicationSelected = [];
    $scope.SurgicalSpermRetrieval.foo = [];
    $scope.SurgicalSpermRetrieval.foo.model = [];
    $scope.SurgicalSpermRetrieval.SSRImages = [];
    $scope.IndicationObstructiveList.splice(0, 0, { ID: 0, Description: 'Select' });
    $scope.SurgicalSpermRetrieval.IndicationObstructiveID = 0;
    $scope.maxTime = new Date();
    var date = new Date();
    $scope.selectedPatient = {};
    $scope.selectedPatient = Common.getSelectedPatient();
    $scope.SurgicalSpermRetrieval.SSRDate = new Date();
    $scope.SurgicalSpermRetrieval.SSRTime = date;
    $scope.SurgicalSpermRetrieval.minTime = date.setDate((new Date()).getDate() - 90);
    $scope.ismeridian = true;
    $scope.IsValidToInsert = true;
    $scope.IsValidRightSpermCount = false;
    $scope.IsValidLeftSpermCount = false;
    $scope.IsDisableIndication = true;
    usSpinnerService.spin('GridSpinner');
    /*END : Global variables declarations section */

    /*START : Visible*/
    $scope.LeftVisible = true;
    $scope.RightVisible = true;
    /*END : Visible*/
    var isRediectToSelf = false;
    /*START : Date */
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.SemenAnalysis = {};
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
    /*END : Date*/
    // for sorting  by rohini
    $scope.SortColumn1 = "SNo";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    /* START for Resource */
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    /*END of Resource*/

    /*START : Page setup*/
    $scope.SurgicalSpermRetrievalInitilization = function SurgicalSpermRetrievalInitilization() {
        debugger;
        
        $scope.FetchIndications();
        $scope.FetchSpecimenTypes();
        $scope.FetchMethodSurgicalSRetrieval();
        $scope.FetchComplication();
        $scope.FetchSites();
        $scope.FetchSurgeon();
        $scope.FetchAnesthetist();
        $scope.FetchAnesthesia();
        $scope.FetchEmbryologistList();
        $scope.SurgicalSpermRetrieval = {};
        $scope.SurgicalSpermRetrieval.SSRDate = new Date();
        $scope.SurgicalSpermRetrieval.SSRTime = new Date();
        if (($scope.selectedPatient.VisitID == 0 && $scope.selectedPatient.VisitUnitID == 0) || ($scope.selectedPatient.VisitID == undefined && $scope.selectedPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;
        //if (angular.isUndefined($scope.frmSSR.ddlIndication.$dirty))
        //    $scope.frmSSR.ddlIndication.$dirty = false;
        //if (angular.isUndefined($scope.frmSSR.ddlSpecimenType.$dirty))
        //    $scope.frmSSR.ddlSpecimenType.$dirty = false;
        //if (angular.isUndefined($scope.frmSSR.ddlMOfSSR.$dirty))
        //    $scope.frmSSR.ddlMOfSSR.$dirty = false;
        //if (angular.isUndefined($scope.frmSSR.ddlSurgeon.$dirty))
        //    $scope.frmSSR.ddlSurgeon.$dirty = false;
        //if (angular.isUndefined($scope.frmSSR.ddlAnesthetist.$dirty))
        //    $scope.frmSSR.ddlAnesthetist.$dirty = false;
        //if (angular.isUndefined($scope.frmSSR.ddlSite.$dirty))
        //    $scope.frmSSR.ddlSite.$dirty = false;
  
        $scope.btnSaveUpdate = "Save";
        $scope.RightVisible = true;
        $scope.LeftVisible = true;

    }
    /*END : Page setup*/

    /*START : Bind dropdowns*/
    $scope.FetchIndications = function FetchIndications() {

        var ResponseData = Common.getMasterList('M_SurgicalEIndication', 'SIndicationID', 'IndicationDescription');
        ResponseData.then(function (Response) {
            //
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
        //
        var ResponseData = Common.getMasterList('M_SpecimenType', 'SpecimenID', 'SpecimenDescription');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SpecimenTypeList = Response.data;
            if ($scope.SurgicalSpermRetrieval.SpecimenTypeID == undefined) {
                $scope.SurgicalSpermRetrieval.SpecimenTypeID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    //get Images of SSR
    $scope.GetSSRImagesBySNo = function GetSurgicalSpermRetrivalByPatientID(SNo) {
        debugger;
        var ResponseData = SurgicalSpermRetrievalService.GetSSRImagesBySNo(SNo);
        ResponseData.then(function (Response) {
            debugger;
            //$scope.SSRImageList = Response.data;
            $scope.SurgicalSpermRetrieval.foo = [];
            $scope.SurgicalSpermRetrieval.foo.model = [];
            $scope.SurgicalSpermRetrieval.foo.model = $scope.SSRImageList = Response.data;
            //$scope.SSRImageList = Response.data;
            //for (var Index = 0; Index < $scope.SSRImageList.length; Index++) {
            //    
            //    $scope.SurgicalSpermRetrieval.foo.model.push($scope.SSRImageList[Index])
            //}

        }, function (error) {
            $scope.Error = error;
        });

    }


    //Redirect to Sergical Sperm Retrival
    $scope.RedirectToSelf = function RedirectToSelf(Item) {
        debugger;
        isRediectToSelf = true;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = SemenAnalysisService.GetSurgicalSpermRetrivalByPatientID(Item.SNo);
        ResponseData.then(function (Response) {
            debugger;
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null)
                $scope.SurgicalSpermRetrieval = Response.data[0];
            debugger;
            $scope.SurgicalSpermRetrieval.SSRDate = new Date($filter('date')($scope.SurgicalSpermRetrieval.SSRDate, 'medium')); //new Date($scope.SurgicalSpermRetrieval.SSRDate);
            $scope.SurgicalSpermRetrieval.SSRTime = new Date($scope.SurgicalSpermRetrieval.SSRTime);
            $scope.IsFinalize = Response.data[0].IsFinalize;
            $scope.IndicationChanged();
            $scope.SiteChangedEvent();
            //Logic for show name in DDL
            debugger;
            angular.forEach($scope.ComplicationList, function (value, key) {
                value.ticked = false;
            });

            // $scope.ComplicationList = $scope.ComplicationListTemp; //used to make all unticked after Update
            if ($scope.SurgicalSpermRetrieval.ComplicationIDs != "") {
                var ComplicationArrayList = $scope.SurgicalSpermRetrieval.ComplicationIDs.split(',');
                debugger;
                for (var i = 0; i < ComplicationArrayList.length; i++) {
                    // Trim the excess whitespace.
                    $scope.ComplicationList[(ComplicationArrayList[i].replace(/^\s*/, "").replace(/\s*$/, "")) - 1].ticked = true;
                }
            }
            //Change Save Button Name
            $scope.btnSaveUpdate = "Update";
            $scope.SNo = Item.SNo;
            $scope.GetUserrights();
            $scope.GetSSRImagesBySNo(Item.SNo);

        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });

    };

    $scope.RedirectToLinkedForm = function (SNo) {

        if (SNo.indexOf('/SA/') > -1) {
            $scope.dataTarget = "#semenAnalysismodal";
            $scope.RedirectToSemenAnalysis(SNo);
        } else if (SNo.indexOf('/SF/') > -1) {
            $scope.dataTarget = "#semenFreezingmodal"
            $scope.RedirectToSemenFreez(SNo);
        }
    }
    $scope.RedirectToSemenAnalysis =function (SNo) {
        debugger;
        var ResponseData = SemenAnalysisService.GetSemenAnalysisList(SNo, 'GetSemenAnalysisBySNo');
        ResponseData.then(function (Response) {
            debugger;
            $scope.SemenAnalysisListBySNo = Response.data;
            $scope.SemenAnalysis.CollectionDate = $scope.SemenAnalysisListBySNo[0].CollectionDate;
            $scope.SemenAnalysis.ReceivingDate = $scope.SemenAnalysisListBySNo[0].ReceivingDate;
            $scope.SemenAnalysis.MCollectionDecription = $scope.SemenAnalysisListBySNo[0].MCollectionDecription;
            $scope.SemenAnalysis.MOSSRetrivalDescription = $scope.SemenAnalysisListBySNo[0].MOSSRetrivalDescription;
            $scope.SemenAnalysis.AbsDescription = $scope.SemenAnalysisListBySNo[0].AbsDescription;
            $scope.SemenAnalysis.Color = $scope.SemenAnalysisListBySNo[0].Color;
            $scope.SemenAnalysis.PH = $scope.SemenAnalysisListBySNo[0].PH;
            $scope.SemenAnalysis.LiquificationTime = $scope.SemenAnalysisListBySNo[0].LiquificationTime;
            $scope.SemenAnalysis.RangeViscosityID = $scope.SemenAnalysisListBySNo[0].RangeViscosityID;
            $scope.SemenAnalysis.Odour = $scope.SemenAnalysisListBySNo[0].Odour;
            $scope.SemenAnalysis.SpermCount = $scope.SemenAnalysisListBySNo[0].SpermCount;
            $scope.SemenAnalysis.TotalSpermCount = $scope.SemenAnalysisListBySNo[0].TotalSpermCount;
            $scope.SemenAnalysis.Motility = $scope.SemenAnalysisListBySNo[0].Motility;
            $scope.SemenAnalysis.SpermConcentration = $scope.SemenAnalysisListBySNo[0].SpermConcentration;
            $scope.SemenAnalysis.CytoplasmicDroplet = $scope.SemenAnalysisListBySNo[0].CytoplasmicDroplet;
            $scope.SemenAnalysis.SemenAIDescription = $scope.SemenAnalysisListBySNo[0].SemenAIDescription;
            $scope.SemenAnalysis.DoneByDocName = $scope.SemenAnalysisListBySNo[0].DoneByDocName;
            $scope.SemenAnalysis.WitnessByDocName = $scope.SemenAnalysisListBySNo[0].WitnessByDocName;
            $scope.SemenAnalysis.NonMotility = $scope.SemenAnalysisListBySNo[0].NonMotility;
            $scope.SemenAnalysis.TotalMotility = $scope.SemenAnalysisListBySNo[0].TotalMotility;
            $scope.SemenAnalysis.TailToTail = $scope.SemenAnalysisListBySNo[0].TailToTail;
            $scope.SemenAnalysis.HeadToTail = $scope.SemenAnalysisListBySNo[0].HeadToTail;
            $scope.SemenAnalysis.HeadToHead = $scope.SemenAnalysisListBySNo[0].HeadToHead;
            $scope.SemenAnalysis.SpermToOther = $scope.SemenAnalysisListBySNo[0].SpermToOther;
            $scope.SemenAnalysis.InterpretationsID = $scope.SemenAnalysisListBySNo[0].InterpretationsID;
            $scope.SemenAnalysis.Comment = $scope.SemenAnalysisListBySNo[0].Comment;
            $scope.SemenAnalysis.SampleCollection = $scope.SemenAnalysisListBySNo[0].SampleCollection;
            $scope.SemenAnalysis.Volume = $scope.SemenAnalysisListBySNo[0].Volume;
            $scope.SemenAnalysis.Appearance = $scope.SemenAnalysisListBySNo[0].Appearance;
            $scope.SemenAnalysis.NonProgressive = $scope.SemenAnalysisListBySNo[0].NonProgressive;
            $scope.SemenAnalysis.Progressive = $scope.SemenAnalysisListBySNo[0].Progressive;
            $scope.SemenAnalysis.SlowProgressive = $scope.SemenAnalysisListBySNo[0].SlowProgressive;
            $scope.SemenAnalysis.RapidProgressive = $scope.SemenAnalysisListBySNo[0].RapidProgressive;
            $scope.SemenAnalysis.Viability = $scope.SemenAnalysisListBySNo[0].Viability;
            $scope.SemenAnalysis.Small = $scope.SemenAnalysisListBySNo[0].Small;
            $scope.SemenAnalysis.Large = $scope.SemenAnalysisListBySNo[0].Large;
            $scope.SemenAnalysis.Tapered = $scope.SemenAnalysisListBySNo[0].Tapered;
            $scope.SemenAnalysis.Amorphous = $scope.SemenAnalysisListBySNo[0].Amorphous;
            $scope.SemenAnalysis.Vacuolated = $scope.SemenAnalysisListBySNo[0].Vacuolated;
            $scope.SemenAnalysis.Pyriform = $scope.SemenAnalysisListBySNo[0].Pyriform;
            $scope.SemenAnalysis.Bent = $scope.SemenAnalysisListBySNo[0].Bent;
            $scope.SemenAnalysis.Thin = $scope.SemenAnalysisListBySNo[0].Thin;
            $scope.SemenAnalysis.WBC = $scope.SemenAnalysisListBySNo[0].WBC;
            $scope.SemenAnalysis.PusCells = $scope.SemenAnalysisListBySNo[0].PusCells;
            $scope.SemenAnalysis.EpithelialCells = $scope.SemenAnalysisListBySNo[0].EpithelialCells;
            $scope.SemenAnalysis.Fructose = $scope.SemenAnalysisListBySNo[0].Fructose;
            $scope.SemenAnalysis.Remarks = $scope.SemenAnalysisListBySNo[0].Remarks;
            $scope.SemenAnalysis.WitnessedBy = $scope.SemenAnalysisListBySNo[0].WitnessedBy;
            $scope.SemenAnalysis.DoneBy = $scope.SemenAnalysisListBySNo[0].DoneBy;

        }, function (error) {
        });
    };

    $scope.RedirectToSemenFreez = function (FormNo) {

        $scope.GetSemenFreezListByFormNo(FormNo, "SpremFreezing", 0, 0);
        $scope.GetSemenFreezListByFormNo(FormNo, "SpremFreezingDetails", 0, 0);
    };

    // Get SemenFreez Data to Update
    $scope.GetSemenFreezListByFormNo = function (FormNo, Action, ID, UnitID) {
        debugger;
        if (Action == "SpremFreezing") {
            var ResponseData = srvSemenFreez.GetSemenFreezListByFormNo(FormNo, Action, ID, UnitID);
            ResponseData.then(function (Response) {
                debugger;
                $scope.SemenFreez = Response.data[0];
                $scope.SemenFreez.CollectionDate = new Date($scope.SemenFreez.CollectionDate);
                $scope.SemenFreez.ReceivingDate = new Date($scope.SemenFreez.ReceivingDate);
                $scope.SemenFreez.SpremFreezingDate = new Date($scope.SemenFreez.SpremFreezingDate);
                $scope.SemenFreez.CollectionTime = new Date($scope.SemenFreez.CollectionDate);
                $scope.SemenFreez.ReceivingTime = new Date($scope.SemenFreez.ReceivingDate);
                $scope.SemenFreez.SpremFreezingTime = new Date($scope.SemenFreez.SpremFreezingTime);
                $scope.IsUpdateFinalize = $scope.SemenFreez.IsFinalized;


            }, function (error) {
            });
        }
        else if (Action == "SpremFreezingDetails") {
            var ResponseData = srvSemenFreez.GetSemenFreezListByFormNo(FormNo, Action, ID, UnitID);
            ResponseData.then(function (Response) {

                //$scope.SpremFreezingDetailsList = Response.data;
                $scope.ListItem = Response.data;

                angular.forEach($scope.ListItem, function (item, index) {
                    item["ExpiryDate"] = new Date(item["ExpiryDate"]);
                })

                // $scope.AddRow();
            }, function (error) {
            });
        }

    };

    $scope.FetchMethodSurgicalSRetrieval = function FetchMethodSurgicalSRetrieval() {
        //
        var ResponseData = Common.getMasterList('M_MethodSurgicalSRetrieval', 'MOSSRetrivalID', 'MOSSRetrivalDescription');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.MethodSurgicalSRetrievalList = Response.data;
            if ($scope.SurgicalSpermRetrieval.MethodOfSurgicalSpermRetrivalID == undefined) {
                $scope.SurgicalSpermRetrieval.MethodOfSurgicalSpermRetrivalID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchComplication = function FetchComplication() {
        //
        var ResponseData = Common.getMasterList('M_SSRComplication', 'SSRComplicationId', 'SSRDescription');
        ResponseData.then(function (Response) {
            //
            //Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ComplicationList = Response.data;
            //if ($scope.SurgicalSpermRetrieval.ComplicationID == undefined) {
            //    $scope.SurgicalSpermRetrieval.ComplicationID = 0;
            //}
        }, function (error) {
            $scope.Error = error;
        });
    }

    // Get Table content Data
    $scope.GetSurgicalSpermRetrivalByPatientID = function GetSurgicalSpermRetrivalByPatientID() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = SurgicalSpermRetrievalService.GetSurgicalSpermRetrivalByPatientID();
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            $scope.SurgicalSpermRetrievalList = Response.data;
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        });

    };

    $scope.FetchSites = function FetchSites() {
        //
        var ResponseData = Common.getMasterList('M_Sites', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
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
        //
        var ResponseData = Common.GetEmbryologyDoctorsList();;
        ResponseData.then(function (Response) {
            //
            Response.data.Clinician.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SurgeonList = Response.data.Clinician;
            if ($scope.SurgicalSpermRetrieval.SurgonID == undefined) {
                $scope.SurgicalSpermRetrieval.SurgonID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchAnesthetist = function FetchAnesthetist() {

        var ResponseData = Common.GetEmbryologyDoctorsList();;
        ResponseData.then(function (Response) {

            Response.data.Clinician.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.AnesthetistList = Response.data.Clinician;
            if ($scope.SurgicalSpermRetrieval.AnesthetistID == undefined) {
                $scope.SurgicalSpermRetrieval.AnesthetistID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchAnesthesia = function FetchAnesthesia() {
        //
        var ResponseData = Common.getMasterList('M_Anesthesia', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //
            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.AnesthesiaList = Response.data;
            if ($scope.SurgicalSpermRetrieval.AnesthesiaID == undefined) {
                $scope.SurgicalSpermRetrieval.AnesthesiaID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.FetchEmbryologistList = function FetchEmbryologistList() {

        var ResponseData = Common.GetEmbryologyDoctorsList();
        ResponseData.then(function (Response) {

            Response.data.EmbryologistAndrologist.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.EmbryologistList = Response.data.EmbryologistAndrologist;
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
    /*END : Bind dropdowns*/

    /*START : Change events*/
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
                $scope.IsDisableIndication = false;
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
                $scope.IsDisableIndication = false;
            }, function (error) {
                $scope.Error = error;
            });
        } else {
            $scope.IndicationObstructiveList = [];
            $scope.IndicationObstructiveList.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.SurgicalSpermRetrieval.IndicationObstructiveID = 0;
            $scope.IsDisableIndication = true;
        }
    }

    $scope.SiteChangedEvent = function SiteChangedEvent() {
        debugger;
        if ($scope.SurgicalSpermRetrieval.SiteID == 1) {
            //Left
            $scope.LeftVisible = false;
            $scope.RightVisible = true;
            if (!isRediectToSelf) {
                $scope.SurgicalSpermRetrieval.RightSpermCount = null;
                $scope.SurgicalSpermRetrieval.RightMotility = null;
                $scope.SurgicalSpermRetrieval.RightRemark = null;
            }
        } else if ($scope.SurgicalSpermRetrieval.SiteID == 2) {
            //Right
            $scope.RightVisible = false;
            $scope.LeftVisible = true;
            if (!isRediectToSelf) {
                $scope.SurgicalSpermRetrieval.LeftSpermCount = null;
                $scope.SurgicalSpermRetrieval.LeftMotility = null;
                $scope.SurgicalSpermRetrieval.LeftRemark = null;
            }
        } else {
            //Both
            $scope.LeftVisible = true;
            $scope.RightVisible = true;
            if (!isRediectToSelf) {
                $scope.SurgicalSpermRetrieval.LeftSpermCount = null;
                $scope.SurgicalSpermRetrieval.LeftMotility = null;
                $scope.SurgicalSpermRetrieval.LeftRemark = null;
                $scope.SurgicalSpermRetrieval.RightSpermCount = null;
                $scope.SurgicalSpermRetrieval.RightMotility = null;
                $scope.SurgicalSpermRetrieval.RightRemark = null;
            }
        }
    }

    $scope.RightSpermCountChanged = function RightSpermCountChanged() {
        if ($scope.SurgicalSpermRetrieval.RightSpermCount == undefined || $scope.SurgicalSpermRetrieval.RightSpermCount == '') {
            $scope.IsValidRightSpermCount = true;
        } else {
            $scope.IsValidRightSpermCount = false;
        }
    }

    $scope.LeftSpermCountChanged = function LeftSpermCountChanged() {
        if ($scope.SurgicalSpermRetrieval.LeftSpermCount == undefined || $scope.SurgicalSpermRetrieval.LeftSpermCount == '') {
            $scope.IsValidLeftSpermCount = true;
        } else {
            $scope.IsValidLeftSpermCount = false;
        }
    }
    /*END : Change events*/

    /* START : Upload multiple files */
    $scope.name = 'World';
    $scope.files = [];
    $scope.upload = function () {

        alert($scope.files.length + " files selected ... Write your Upload Code");

    };
    /* END : Upload multiple files */

    /* START : Operations */
    $scope.InsertSurgicalSpermRetrival = function InsertSurgicalSpermRetrival() {
        debugger;
        if ($scope.SurgicalSpermRetrieval.SiteID == 3
            && $scope.SurgicalSpermRetrieval.RightSpermCount == undefined
            && $scope.SurgicalSpermRetrieval.LeftSpermCount == undefined) {
            $scope.IsValidRightSpermCount = true;
            $scope.IsValidLeftSpermCount = true;
            $scope.IsValidToInsert = false;
        } else if ($scope.SurgicalSpermRetrieval.SiteID == 2
            && $scope.SurgicalSpermRetrieval.LeftSpermCount == undefined) {
            $scope.IsValidLeftSpermCount = true;
            $scope.IsValidToInsert = false;
        } else if ($scope.SurgicalSpermRetrieval.SiteID == 1
            && $scope.SurgicalSpermRetrieval.RightSpermCount == undefined) {
            $scope.IsValidRightSpermCount = true;
            $scope.IsValidToInsert = false;
        } else {
            $scope.IsValidRightSpermCount = false;
            $scope.IsValidLeftSpermCount = false;
            $scope.IsValidToInsert = true;
        }
        //If Update Send SNo 
        debugger;
        if ($scope.btnSaveUpdate == "Update") {
            $scope.SurgicalSpermRetrieval.SNo = $scope.SNo;
            $scope.SurgicalSpermRetrieval.SSRDate = $filter('date')($scope.SurgicalSpermRetrieval.SSRDate, 'medium');
        }
        debugger;
        if ($scope.SurgicalSpermRetrieval.foo != undefined) {
            if ($scope.SurgicalSpermRetrieval.foo.model.length > 0) {
                if ($scope.SurgicalSpermRetrieval.SSRImages == null)
                    $scope.SurgicalSpermRetrieval.SSRImages = [];
                for (var Index = 0; Index < $scope.SurgicalSpermRetrieval.foo.model.length; Index++) {
                    $scope.SurgicalSpermRetrieval.SSRImages.push($scope.SurgicalSpermRetrieval.foo.model[Index])
                }
            }
        }
        if ($scope.IsValidToInsert && $scope.ValidateSurgicalSpermRetrival()) {  //&& $scope.frmSSR.$valid
            //Need to put insert logic here...
            usSpinnerService.spin('GridSpinner');
            var ResponseData = SurgicalSpermRetrievalService.InsertSurgicalSpermRetrival($scope.SurgicalSpermRetrieval);
            ResponseData.then(function (Response) {
                usSpinnerService.stop('GridSpinner');
                debugger;
                if (Response.data > 0) {
                    if ($scope.SurgicalSpermRetrieval.SNo == undefined || $scope.SurgicalSpermRetrieval.SNo == '')
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    else
                        AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    //Load Table Content
                    // $window.location.reload();                    
                    $scope.SurgicalSpermRetrievalInitilization();
                    $scope.GetSurgicalSpermRetrivalByPatientID();
                    //  $scope.FetchMethodSurgicalSRetrieval();
                    $scope.ResetSurgicalSpermRetrival();

                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                $scope.Error = error;
            });
        } else {
            $scope.frmSSR.ddlIndication.$dirty = true;
            $scope.frmSSR.ddlSpecimenType.$dirty = true;
            $scope.frmSSR.ddlMOfSSR.$dirty = true;
            $scope.frmSSR.ddlSurgeon.$dirty = true;
            $scope.frmSSR.ddlAnesthetist.$dirty = true;
            $scope.frmSSR.ddlAnesthesia.$dirty = true;
            $scope.frmSSR.ddlSite.$dirty = true;
        }
    }

    $scope.ResetSurgicalSpermRetrival = function ResetSurgicalSpermRetrival() {
        $scope.frmSSR.ddlIndication.$dirty = false;
        $scope.frmSSR.ddlSpecimenType.$dirty = false;
        $scope.frmSSR.ddlMOfSSR.$dirty = false;
        $scope.frmSSR.ddlSurgeon.$dirty = false;
        $scope.frmSSR.ddlAnesthesia.$dirty = false;
        $scope.frmSSR.ddlAnesthetist.$dirty = false;
        $scope.frmSSR.ddlSite.$dirty = false;
       
    }

    $scope.CancelSSR = function CancelSSR() {
        $location.path('/EMRLandingPage/');
    }
    /* END : Operations */

    $scope.ValidateSurgicalSpermRetrival = function () {
        debugger; 
        var IsValid = true;
        // 

        //if ($scope.SurgicalSpermRetrieval.AnesthetistID == $scope.SurgicalSpermRetrieval.EmbroylogistID && $scope.SurgicalSpermRetrieval.SurgonID == $scope.SurgicalSpermRetrieval.WitnessEmbroylogistID && $scope.SurgicalSpermRetrieval.EmbroylogistID == $scope.SurgicalSpermRetrieval.SurgonID) {
        //    IsValid = false;
        //    AlertMessage.info('PalashIVF', 'Surgeon, Anesthetist, Embryologist, Witness Embryologist should not be same');
        //}

        //if ($.inArray($scope.SurgicalSpermRetrieval.AnesthetistID, [$scope.SurgicalSpermRetrieval.EmbroylogistID, $scope.SurgicalSpermRetrieval.SurgonID, $scope.SurgicalSpermRetrieval.WitnessEmbroylogistID]) >= 0
        //    || $.inArray($scope.SurgicalSpermRetrieval.EmbroylogistID, [$scope.SurgicalSpermRetrieval.SurgonID, $scope.SurgicalSpermRetrieval.WitnessEmbroylogistID]) >= 0 
        //    || $.inArray($scope.SurgicalSpermRetrieval.SurgonID, [$scope.SurgicalSpermRetrieval.WitnessEmbroylogistID]) >= 0) {
        //    IsValid = false;
        //    AlertMessage.info('PalashIVF', 'Surgeon, Anesthetist, Embryologist, Witness Embryologist should not be same');
        //}

        if ($scope.SurgicalSpermRetrieval.SSRDate == undefined || $scope.SurgicalSpermRetrieval.SSRDate == '') {
            IsValid = false;
        }
        else {
            $scope.SurgicalSpermRetrieval.SSRDate = new Date($scope.SurgicalSpermRetrieval.SSRDate);
        }

        if ($scope.SurgicalSpermRetrieval.SSRTime == undefined || $scope.SurgicalSpermRetrieval.SSRTime == '') {
            IsValid = false;
        }
        if ($scope.SurgicalSpermRetrieval.IndicationID == undefined || $scope.SurgicalSpermRetrieval.IndicationID == 0) {
            IsValid = false;
        }
        if ($scope.SurgicalSpermRetrieval.SpecimenTypeID == undefined || $scope.SurgicalSpermRetrieval.SpecimenTypeID == 0) {
            IsValid = false;
        }
        if ($scope.SurgicalSpermRetrieval.MethodOfSurgicalSpermRetrivalID == undefined || $scope.SurgicalSpermRetrieval.MethodOfSurgicalSpermRetrivalID == 0) {
            IsValid = false;
        }
        if ($scope.SurgicalSpermRetrieval.SurgonID == undefined || $scope.SurgicalSpermRetrieval.SurgonID == 0) {
            IsValid = false;
        }
        if ($scope.SurgicalSpermRetrieval.AnesthetistID == undefined || $scope.SurgicalSpermRetrieval.AnesthetistID == 0) {
            IsValid = false;
        }
        if ($scope.SurgicalSpermRetrieval.AnesthesiaID == undefined || $scope.SurgicalSpermRetrieval.AnesthesiaID == 0) {
            IsValid = false;
        }
        if ($scope.SurgicalSpermRetrieval.SiteID == undefined || $scope.SurgicalSpermRetrieval.SiteID == 0) {
            IsValid = false;
        }

        return IsValid;
    }

    $scope.GetUserrights = function () {
        debugger;
        var lstUserRights = Common.getUserRights();
        // if ($scope.selectedPatient.GenderID == 1) {
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 319 && lstUserRights[z].Active)//Surgical Sperm Retrieval
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

        //by arz on 16012018
        if ($scope.IsFinalize || $scope.IsVisitMarked) {
            angular.element(btnSaveUpdate).prop('disabled', true);
        }


    }   // For User rights configuration




    //Default Call

    

    $scope.GetSurgicalSpermRetrivalByPatientID();

    $scope.ValidationMsg = function (Msg) {
        AlertMessage.error("PalashIVF", Msg);
    }

    $scope.SurgicalSpermRetrievalPrint = function (item) {
        debugger;
        var a = encodeURIComponent('PID=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PUID=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&VID=' + 0 + '&SRNo=' + item.SNo);
        window.open('/Reports/EMR/SurgicalSpermRetrievalPrint.aspx?' + encodeURIComponent(a), '_blank');
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
            disabled: '=',
            someCtrlFn: '&callbackFn'
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
                //var xhr = new XMLHttpRequest(),
                //    fd = new FormData(),
                //    progress = 0,
                //    uri = attr.uri || '/upload/upload';
                //xhr.open('POST', uri, true);
                //xhr.withCredentials = shareCredentials;
                //if (scope.headers) {
                //    scope.headers.forEach(function (item) {
                //        xhr.setRequestHeader(item.header, item.value);
                //    });
                //}
                //xhr.onreadystatechange = function () {
                //    scope.ngModel[index].status = {
                //        code: xhr.status,
                //        statusText: xhr.statusText,
                //        response: xhr.response
                //    };
                //    scope.$apply();
                //};
                //xhr.upload.addEventListener("progress", function (e) {
                //    progress = parseInt(e.loaded / e.total * 100);
                //    scope.ngModel[index].percent = progress;
                //    scope.$apply();
                //}, false);

                //fd.append(fileName, file);
                //xhr.send(fd);

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
                if (scope.ngModel.length <= 10) {
                    for (var i = 0; i < files.length && i < 10; i++) {
                        if (files[i].size <= 1000000) {
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
                    }
                }
                else {
                    scope.someCtrlFn({ arg1: "You have exceed Limit" });
                }
                scope.$apply();
            })
        }
    }
}]);
