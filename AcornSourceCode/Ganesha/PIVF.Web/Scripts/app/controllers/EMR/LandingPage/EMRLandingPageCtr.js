angular.module('PIVF').controller('EMRLandingPageCtr', function ($rootScope, $uibModal,$scope, EMRLandingPageSrv, Common, AlertMessage, srvCommon, $location, usSpinnerService) {
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    $scope.selPatGenID=selectPatient.GenderID;
    //disable icon by rohini
    $rootScope.IsCycleActive = false;
    $rootScope.isAction = true;
    $rootScope.CoupleDetails.FemalePatient.CycleCode = '';
    $rootScope.CoupleDetails.FemalePatient.ARTType = '';
    $rootScope.CoupleDetails.FemalePatient.ARTSubType = '';
    $rootScope.hideWhenQueue = false;
    $scope.GenderID=selectPatient.GenderID;
    $rootScope.CycleDetails = null;
$scope.CurrentPage = 1;     // Current active page
$scope.ItemsPerPage = 3;    // Number of rows per page
$scope.maxSize = 5;         // Max number of pagination buttons to display
$scope.VisitListOriginal = []; 



    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();

        console.warn(">>>>>>>>>> objResource" , objResource)
    }



    // Default active tab
    $scope.activeTab = "summary";
     $scope.myTabNAme =   objResource.lblvRecentVisit;               // "Recent Visit";

    // Function to set active tab
    $scope.setActiveTab = function(tabName) {

        if(tabName == "summary"){
                $scope.myTabNAme =   objResource.lblvRecentVisit;  // "Recent Visit";
        }
        else{
               $scope.myTabNAme =  objResource.lblvAllVisits;   // "All Visits";
        }

        $scope.activeTab = tabName;
        console.log(">>>>>>>>>>>>>>>>>>> " , $scope.activeTab , $rootScope.CoupleDetails , selectPatient.GenderID , $scope.GenderID , Common.getSelectedPatient().GenderID)

         if(Common.getSelectedPatient().GenderID == $rootScope.CoupleDetails.FemalePatient.GenderID  ){   
         console.log(">>>>>>>>>>>> pATIENT dETAILS >>>>>>> " , $rootScope.CoupleDetails.FemalePatient )
            $scope.GetPatientVisitSummaryModel($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
             $scope.GetCaseSummaryHistory($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
             $scope.GetInvestigationHistory($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
              $scope.GetPatientPrescriptionHistory($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
               $scope.GetHistorySummary($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
     $scope.GetVisitList('FemaleDashboard',false)
 }
        else{          
         console.log(">>>>>>>>>>>> pATIENT dETAILS >>>>>>> " , $rootScope.CoupleDetails.MalePatient );
      
         $scope.GetPatientVisitSummaryModel($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
            $scope.GetCaseSummaryHistory($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
            $scope.GetInvestigationHistory($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
            $scope.GetPatientPrescriptionHistory($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
            $scope.GetHistorySummary($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
         $scope.GetVisitList('MaleHistory',true)
       
       }
    };


    $scope.GetPatientVisitSummaryModel = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
      usSpinnerService.spin('GridSpinner');
    var response = EMRLandingPageSrv.GetPatientVisitSummaryModel(PatientID , VisitUnitID , VisitID , PatientUnitID);
     response.then(function (res) {
             
            $rootScope.headerDetails = res.data[0]
           console.log(">>>>>>>>>> headerDetails >>>>>>>>> " , res.data[0] );

          usSpinnerService.stop('GridSpinner');
     })
    
};


  $scope.GetCaseSummaryHistory = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
      usSpinnerService.spin('GridSpinner');
    var response = EMRLandingPageSrv.GetCaseSummaryHistory(PatientID , VisitUnitID , VisitID , PatientUnitID);
     response.then(function (res) {
             
            $rootScope.CaseSummaryHistory = res.data
           console.log(">>>>>>>>>> CaseSummaryHistory >>>>>>>>> " , res.data[0] );

          usSpinnerService.stop('GridSpinner');
     })
    
};


$scope.validItems = function(item) {
    return item.Value && item.Value.trim() !== "N/A";
};



$scope.GetInvestigationHistory = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
      usSpinnerService.spin('GridSpinner');
    var response = EMRLandingPageSrv.GetInvestigationHistory(PatientID , VisitUnitID , VisitID , PatientUnitID);
     response.then(function (res) {
             
            $rootScope.InvestigationHistory = res.data
           console.log(">>>>>>>>>> InvestigationHistory >>>>>>>>> " , res.data[0] );

          usSpinnerService.stop('GridSpinner');
     })
    
};


$scope.GetPatientPrescriptionHistory = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
      usSpinnerService.spin('GridSpinner');
    var response = EMRLandingPageSrv.GetPatientPrescriptionHistory(PatientID , VisitUnitID , VisitID , PatientUnitID);
     response.then(function (res) {
             
            $rootScope.PatientPrescriptionHistory = res.data
           console.log(">>>>>>>>>> PatientPrescriptionHistory >>>>>>>>> " , res.data[0] );

          usSpinnerService.stop('GridSpinner');
     })
    
};



$scope.GetHistorySummary = function (PatientID  , VisitUnitID , VisitID , PatientUnitID ){
      usSpinnerService.spin('GridSpinner');
    var response = EMRLandingPageSrv.GetHistorySummary(PatientID , VisitUnitID , VisitID , PatientUnitID);
     response.then(function (res) {
            $rootScope.GetHistorySummaryDetails = res.data

          usSpinnerService.stop('GridSpinner');
     })
    
};

    $scope.GetEMRLandingPageData = function () {
        debugger;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>> $scope.selectPatient ", $scope.selectPatient, selectPatient , $rootScope.selectedPatientCopy)

        if(!$scope.selectPatient){
             $scope.selectPatient =  $rootScope.selectedPatientCopy;
        }



        $rootScope.CoupleDetails.FemalePatient.CycleCode = '';
        $rootScope.CoupleDetails.FemalePatient.ARTType = '';
        $rootScope.CoupleDetails.FemalePatient.ARTSubType = '';
        var response = Common.BindMaleFemaleCoupleDetails(selectPatient.UnitID, selectPatient.ID,selectPatient.GenderID);
        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                console.log(resp.data);
                if (selectPatient.GenderID == 2) {
                    if (resp.data.FemalePatient)
                    {
                            if (resp.data.FemalePatient.Allergies != "" && resp.data.FemalePatient.Allergies != null) {
                            $rootScope.Allergies = resp.data.FemalePatient.Allergies;
                        
                            $rootScope.Allergies = $rootScope.Allergies.trim();
                            if ($rootScope.Allergies[0] == ',') {
                                $rootScope.Allergies = $rootScope.Allergies.substr(1);
                            }
                            if ($rootScope.Allergies[$rootScope.Allergies.length - 1] == ',') {

                                $rootScope.Allergies = $rootScope.Allergies.substring(0,$rootScope.Allergies.length - 1);
                            }
                        
                        }
                        else {
                            $rootScope.Allergies = '';
                        }
                }
                    //if (resp.data.FemalePatient.AllergiesFood != "" && resp.data.FemalePatient.AllergiesFood != null) {
                    //    $rootScope.Allergies += ', ' + resp.data.FemalePatient.AllergiesFood;
                    //}
                    //if (resp.data.FemalePatient.AllergiesOthers != "" && resp.data.FemalePatient.AllergiesOthers != null) {
                    //    $rootScope.Allergies += ', ' + resp.data.FemalePatient.AllergiesOthers;
                    //}

                }
                if (selectPatient.GenderID == 1) {
                    if (resp.data.MalePatient) {
                        if (resp.data.MalePatient.Allergies != "" && resp.data.MalePatient.Allergies != null)
                            $rootScope.Allergies = resp.data.MalePatient.Allergies;
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
        if (selectPatient.ID === undefined)
            selectPatient = JSON.parse(sessionStorage.getItem('selectedPatient'));
        if (selectPatient.GenderID == 1) $rootScope.FormName = 'EMR Dashboard';
        else if (selectPatient.GenderID == 2) $rootScope.FormName = 'EMR Dashboard';
        debugger;
        usSpinnerService.spin('GridSpinner');
        var Promise = EMRLandingPageSrv.GetEMRLandingPageData(selectPatient.ID, selectPatient.UnitID);
        Promise.then(function (resp) {
           // $rootScope.Allergies = '';
            $scope.isFollowupPatient = resp.data.IsFollowupPatient;
            $scope.PrescriptionList = resp.data.lstPrescription;
            $scope.DiagnosisList = resp.data.lstDiagnosis;
            $scope.InvestigationList = resp.data.lstInvestigation;
            $scope.lstHistory = resp.data.lstHistory;
          //  $rootScope.Allergies = resp.data.Allergy;
           
           /* if ($rootScope.Allergies!=null) {
                for (var i = $rootScope.Allergies.length; i >0; i--) {
                    if($rootScope.Allergies[i]==',' && $rootScope.Allergies[i-1]==','){

                        $rootScope.Allergies = $rootScope.Allergies.slice(0, i) + $rootScope.Allergies.slice(i + 1);
                       
                   }
                }
                $rootScope.Allergies = $rootScope.Allergies.slice(0, -1)
               // console.log($rootScope.Allergies.length)
            }*/
            debugger;
            //if (resp.data.lstCC.length > 0)
            //    resp.data.lstCC.forEach(function (x) { x.FCDate = new Date(x.FCDate); })

           
            $scope.lstCC = resp.data.lstCC;
            if ($scope.selectPatient === undefined) {
                Common.SetPatientContext(selectPatient);
                $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                if (selectPatient.GenderID === 2) {
                    var vdetails = JSON.parse(sessionStorage.getItem('femaleVisitDetails'));
                    if (vdetails) {
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = vdetails.visitid;
                        $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = vdetails.visitunitid;
                    }
                } else {
                    var vdetails = JSON.parse(sessionStorage.getItem('maleVisitDetails'));
                    if (vdetails) {
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = vdetails.visitid;
                        $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = vdetails.visitunitid;
                    }
                }

                debugger

                console.warn("$rootScope.CoupleDetails" , $rootScope.CoupleDetails , $scope.selectPatient )

                usSpinnerService.stop('GridSpinner');

            } else {
                usSpinnerService.stop('GridSpinner');
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
        })




        if(Common.getSelectedPatient().GenderID == $rootScope.CoupleDetails.FemalePatient.GenderID  ){   
         console.log(">>>>>>>>>>>> pATIENT dETAILS 11111111111>>>>>>> " , $rootScope.CoupleDetails.FemalePatient )
             $scope.GetPatientVisitSummaryModel($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
             $scope.GetCaseSummaryHistory($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
             $scope.GetInvestigationHistory($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
              $scope.GetPatientPrescriptionHistory($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
               $scope.GetHistorySummary($rootScope.CoupleDetails.FemalePatient.FemalePatientID , $rootScope.CoupleDetails.FemalePatient.VisitUnitID , $rootScope.CoupleDetails.FemalePatient.VisitID , $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID )
        }
        else{          
         console.log(">>>>>>>>>>>> pATIENT dETAILS 1111111111111111>>>>>>> " , $rootScope.CoupleDetails.MalePatient );
            $scope.GetPatientVisitSummaryModel($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
            $scope.GetCaseSummaryHistory($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
            $scope.GetInvestigationHistory($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
            $scope.GetPatientPrescriptionHistory($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)
            $scope.GetHistorySummary($rootScope.CoupleDetails.MalePatient.MaleId ,$rootScope.CoupleDetails.MalePatient.VisitUnitID ,$rootScope.CoupleDetails.MalePatient.VisitID , $rootScope.CoupleDetails.MalePatient.MAleUnitID)

}











    }
    $scope.Redirect = function (path) {

        var obj = {};
        if (path == 'Investigation') {
            obj.InvIsFromDashboard = true;
            obj.ProIsFromDashboard = false;
        }
        else if (path == 'Procedures') {
            obj.InvIsFromDashboard = false;
            obj.ProIsFromDashboard = true;
            path = 'Investigation';
        }
        else if (path == 'Complaint') {
            if (selectPatient.GenderID == 2) {
                path = 'FemaleComplaints';
            }
            else if (selectPatient.GenderID == 1) {
                path = 'MaleComplaints';
            }
        }
        else if (path == 'History') {
            if (selectPatient.GenderID == 2) {
                path = 'FemaleHistory';
            }
            else if (selectPatient.GenderID == 1) {
                path = 'MaleHistory';
            }
        }
        $rootScope.FormName = path; 
        Common.setObj(obj);
        $location.path('/' + path + '/');
    }
    $scope.Navigate = function Navigate(GenderID, Str, Title, ModuleId) {
        debugger;
         var obj = { };
            if (Str == 'Investigation') {
            obj.InvIsFromDashboard = true;
             obj.ProIsFromDashboard = false;
            }
             else if (Str == 'Procedures') {
            obj.InvIsFromDashboard = false;
            obj.ProIsFromDashboard = true;
            Str = 'Investigation';
            }
            else if (Str == 'Complaint') {
            if (selectPatient.GenderID == 2)
                Str = 'FemaleComplaints';
           else if (selectPatient.GenderID == 1) 
                Str = 'MaleComplaints';
    
        }
         else if (Str == 'History') {
            if (selectPatient.GenderID == 2) 
                Str = 'FemaleHistory';
            else if (selectPatient.GenderID == 1) 
                Str = 'MaleHistory';
            
        }
        if (GenderID==1) {
            var cc ="Male ";
            Title=cc.concat(Title)

        }
        else if (GenderID == 2) {
            var cc = "Female ";
            Title=cc.concat(Title)
    }
        Common.clearID();
       // GenderID=selectPatient.GenderID;
        Common.setID(ModuleId);
        $rootScope.IsCycleActive = false;
        Common.clearString();
        Common.setString(Title);
        Common.SetTherapyDetails(0, 0, 0, 0);//clear therapy by rohini
        $rootScope.CoupleDetails.FemalePatient.TherapyUnitID = 0; //clear therapy  by rohini
        $rootScope.CoupleDetails.FemalePatient.TherapyID = 0;//clear therapy by rohini
        $rootScope.hideWhenQueue = false;
        $rootScope.Breadcrum.length = 0;
        $rootScope.CycleDetails = null;
        $rootScope.FormName = null;
        $rootScope.FormName = Title;
        $scope.IsEmrPrint = true;// for print cation show
        if (Title == 'Male Investigations' || Title == 'Female Investigations ')
            $rootScope.FormName = 'Investigations';
        //   angular.element(lblFormName).text(Title);
        ////Code Added By manohar to check Single Patient in Banks.
        if (Str == "SpermBank" || Str == "OocyteBank" || Str == "EmbryoBank") {
           // PatientInfo.IsSinglePatient = true;
            $rootScope.IsSinglePatient = true;
        }
        else {
           // PatientInfo.IsSinglePatient = false;
            $rootScope.IsSinglePatient = false;
            $rootScope.Allergies = '';
        }
        $rootScope.OrderList = 0;
        if (GenderID == 1) {
            $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = true;
            angular.element(document.querySelector("#menu--slide-left2")).removeClass("active-sm");
            if (!angular.equals($rootScope.CoupleDetails.MalePatient.Selectedvisit, {}) && $rootScope.CoupleDetails.MalePatient.Selectedvisit != null) {
                if ($rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID != undefined && $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID != undefined) {
                    //Already select patient in serach box
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
                            debugger;
                            Common.clearTempID();
                            Common.setTempID(ModuleId);
                            Common.clearString();
                            Common.setString(Title);
                            $location.path(Str);
                        }
                    });
                }
            }
            else {
                //patient not selected in serach box
                $scope.selectPatient = {};
                $scope.selectPatient.ID = $rootScope.CoupleDetails.MalePatient.MaleId;
                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.MalePatient.MaleMRNO;
                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.MalePatient.GenderID;
                $scope.selectPatient.PatietCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;
                debugger;
                Common.clearTempID();
                Common.setTempID(ModuleId);
                Common.clearString();
                Common.setString(Title);
                $scope.NevigateVisitPopUP($scope.selectPatient, Str);
            }
        }
        else if (GenderID == 2) {
            $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
            $rootScope.IsMaleActive = false;
            angular.element(document.querySelector("#menu--slide-left")).removeClass("active-sm");
            if (!angular.equals($rootScope.CoupleDetails.FemalePatient.Selectedvisit, {}) && $rootScope.CoupleDetails.FemalePatient.Selectedvisit != null) {
                if ($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID != undefined && $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID != undefined) {
                    var response = Common.SetSelectedFemalePatient($rootScope.CoupleDetails.FemalePatient);
                    response.then(function (resp) {
                        if (resp.status == 200) {
                            debugger;
                            $scope.selectPatient = {};
                            $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                            $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                            $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                            $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                            $scope.selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID;
                            $scope.selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID;
                            $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                            Common.setSelectedPatient($scope.selectPatient);
                            $location.path(Str);
                        }
                    });
                }
            }
            else {
                //patient not selected in serach box
                debugger;
                $scope.selectPatient = {};
                $scope.selectPatient.ID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
                $scope.selectPatient.UnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                $scope.selectPatient.MRNo = $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO;
                $scope.selectPatient.GenderID = $rootScope.CoupleDetails.FemalePatient.GenderID;
                $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;
                $scope.NevigateVisitPopUP($scope.selectPatient, Str);
            }
        }

        var url = $location.absUrl();
        if (url != undefined && url != null) {
            url = url.split('/');
            url = url[url.length - 1];
            if (url == Str) {
                $route.reload();
            }
        }
    }

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
                        debugger;
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
                                $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate = data.Date;
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
                                        $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                            var url = $location.absUrl();
                                            if (url != undefined && url != null) {
                                                url = url.split('/');
                                                url = url[url.length - 1];
                                                if (url == Redirectto) {
                                                    $route.reload();
                                                }
                                                else $location.path(Redirectto);
                                            }
                                        });
                                        //  $location.path(Redirectto);
                                    }
                                });
                            }
                            else {
                                //for male
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = data.VisitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = data.VisitUnitID;
                                $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate = data.Date;
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
                                        $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate;
                                        $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                        Common.setSelectedPatient($scope.selectPatient);
                                        //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                        Common.setSelectedCouple($rootScope.CoupleDetails);
                                        $rootScope.CoupleDetails = Common.getSelectedCouple();
                                        //  $location.path(Redirectto);
                                        Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                            var url = $location.absUrl();
                                            if (url != undefined && url != null) {
                                                url = url.split('/');
                                                url = url[url.length - 1];
                                                if (url == Redirectto) {
                                                    $route.reload();
                                                }
                                                else $location.path(Redirectto);
                                            }


                                        });
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
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate = resp.data[0].Date
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
                                    $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitDate;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.FemalePatient.PatientCategoryID;

                                    Common.setSelectedPatient($scope.selectPatient);
                                    //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($rootScope.CoupleDetails);
                                    $rootScope.CoupleDetails = Common.getSelectedCouple();
                                    //   $location.path(Redirectto);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                        $location.path(Redirectto);
                                    })
                                }
                            });
                        }
                        else {
                            //for male
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate = resp.data[0].Date
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
                                    $scope.selectPatient.VisitDate = $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitDate;
                                    $scope.selectPatient.PatientCategoryID = $rootScope.CoupleDetails.MalePatient.PatientCategoryID;

                                    Common.setSelectedPatient($scope.selectPatient);
                                    //   Common.SetSelectedPatientInAPI($scope.selectPatient);
                                    Common.setSelectedCouple($rootScope.CoupleDetails);
                                    $rootScope.CoupleDetails = Common.getSelectedCouple();
                                    //   $location.path(Redirectto);
                                    Common.SetSelectedPatientInAPI($scope.selectPatient).then(function () {
                                        $location.path(Redirectto);
                                    })
                                }
                            });
                        }
                    }
                }
                else {
                    //alert("There is no active visit");
                    debugger;
                    //Common.setSelectedPatient($scope.SelectedPatient);
                    Common.setSelectedPatient(Patient);
                    Common.setSelectedCouple($rootScope.CoupleDetails);
                    $location.path(Redirectto);
                }
            });
        }
    }
    $scope.RedirectNew = function (path)
    {
        $rootScope.FormName = path;
        $scope.obj = {};
        $scope.obj.IsNewPrescription = 11;
        Common.setObj($scope.obj);
        $location.path('/' + path + '/');
    }


 /*Changes For details by Tejas*/
      $scope.ViewHistory = function (PatientID, PatientUnitID, VisitID, VisitUnitID, IsMale) {
        debugger;

        if (IsMale) {
        debugger
            var a = encodeURIComponent('U=' + PatientUnitID + '&VU=' + VisitUnitID + '&V=' + VisitID + '&P=' + PatientID + '&M=' + IsMale);
        }
        else {
        debugger
            var a = encodeURIComponent('U=' + PatientUnitID + '&VU=' + VisitUnitID + '&V=' + VisitID + '&P=' + PatientID + '&M=' + IsMale);
        }

        $scope.reportURL = '/Reports/EMR/Summary/SummaryWF.aspx?' + encodeURIComponent(a), '_blank'; // in new tab  
        ReportFrame2.src = $scope.reportURL;

        window.open($scope.reportURL , '_blank');
    }
    $scope.PageChange = function () {
    // Calculate the start and end indices for the current page
    var startIndex = ($scope.CurrentPage - 1) * $scope.ItemsPerPage;
    var endIndex = startIndex + $scope.ItemsPerPage;
    $scope.VisitListOriginal = $scope.VisitList
    // Slice VisitList to get rows for the current page
    $scope.PagedVisitList = $scope.VisitListOriginal.slice(startIndex, endIndex);
};

// Initialize the first page when VisitList is loaded
$scope.$watch('VisitList', function (newVal) {
    if (newVal && newVal.length > 0) {
        $scope.PageChange();  // Call PageChange to load the first page
    }
    });
    $scope.GetVisitList = function (Item, IsMaleForVisit) {  //
        debugger;
         $rootScope.IsDetailsTabClicked = true
        if (IsMaleForVisit == true) {
            $scope.PatientID = $rootScope.CoupleDetails.MalePatient.MaleId;
            $scope.PatientUnitID = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
            $scope.IsMaleForVisit = true;
        }
        else {
            $scope.PatientID = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
            $scope.PatientUnitID = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
            $scope.IsMaleForVisit = false;
        }


        var response = Common.GetAllVisitByPatient($scope.PatientID, $scope.PatientUnitID, $scope.CurrentPage - 1); //Get Visit list For selected patient  //Get Visit list For selected patient //$scope.Sessionobj Added by divya for session on 18 march 2020
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.VisitList = resp.data;
                $scope.VisitList.PatientID = $scope.PatientID;
                $scope.VisitList.PatientUnitID = $scope.PatientUnitID;
                $scope.VisitList.IsMale = $scope.IsMaleForVisit;
                $scope.TotalItemsVisitList = $scope.VisitList[0].TotalRows;
                $scope.numPages = Math.ceil($scope.VisitList.length / $scope.ItemsPerPage); // Total number of pages
                //if ($scope.VisitList.length > 0)
                 //   $scope.ViewHistory($scope.VisitList.PatientID, $scope.VisitList.PatientUnitID, $scope.VisitList[0].VisitID, $scope.VisitList[0].VisitUnitID, $scope.VisitList.IsMale);


            }
        });
  }

  

})