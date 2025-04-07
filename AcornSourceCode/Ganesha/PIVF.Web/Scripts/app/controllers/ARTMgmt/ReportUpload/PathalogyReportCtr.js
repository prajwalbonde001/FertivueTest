'use strict';
angular.module('PIVF').controller('PathalogyReportCtr', function ($scope, $uibModal, $rootScope, ReportUploadSrv, Common, srvCommon, $location, AlertMessage, $filter, swalMessages, usSpinnerService) {
    $scope.obj = {};
    $scope.obj.ReportDate=new Date();
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.RPT = {};
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
   
    var objResource = {}; //Added by swatih for localization on 13/7/2020
    //selected patient set 
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    //Added by swatih for localization on 13/7/2020
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Added by swatih for localization on 13/7/2020
    $scope.IsReportUploadDisabled = false; //Added by AniketK on 02Dec2019
    //
    $scope.MRNO = selectPatient.MRNo;
    $scope.PatientName = selectPatient.PatientName;
    //navigation btn text on selected patient
    if (selectPatient.GenderID == 1)
        $scope.btnText = 'Female Report';
    else if (selectPatient.GenderID == 2)
        $scope.btnText = 'Male Report';
    //
    $scope.GetInvestigation = function () {
      
            var response = ReportUploadSrv.fillPathoServiceList(1,selectPatient.GenderID);
            response.then(function (resp) {
                debugger;
                $scope.lstService = resp.data;
            }, function (err) {

            })
        
    }
    $scope.GetInvestigation();
     $scope.GetUOM = function () {
       // $scope.obj.ReportDate = new Date();
        var ResponseData = Common.getMasterList('M_PathoParameterUnits', 'PathoParameterUID', 'Description');
        ResponseData.then(function (Response) {
               
         
           // Response.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.UOMList=Response.data;
        }, function (error) {
        });
    }
    $scope.GetUOM();
    // Date pickr
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.open1 = function () {
        $scope.popup1.opened = true;
        $scope.IsReportUploadDisabled = false; //Added by AniketK on 02Dec2019
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };
    $scope.popup3 = {
        opened: false
    };
    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    // Date pickr End
    $scope.btnClick = function () {
        $scope.RPT.FromDate = '';
        $scope.RPT.ToDate = '';
        $scope.RPT.ReportCatID = 1;
        $scope.RPT.Name = '';
      //  if (selectPatient.PatientCategoryID == 7) {
            if (selectPatient.GenderID == 1) {
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
              //  selectPatient.VisitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID
               // selectPatient.VisitUnitID = $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID
                Common.setSelectedPatient(selectPatient);
                var response = Common.BindMaleFemaleCoupleDetails(selectPatient.UnitID, selectPatient.ID, selectPatient.GenderID);
                response.then(function (resp) {
                    if (resp.data != null) {
                        // debugger;
                        //console.log(resp.data);
                        $rootScope.Allergies = resp.data.FemalePatient.Allergies;
                        if ($rootScope.Allergies.includes('null')) {
                            $rootScope.Allergies = '';
                        }

                    }
                })
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                    $scope.GetReportList();
                    $scope.btnText = 'Male Report';
                })
                $rootScope.FormName = 'Female Report Upload'
                $scope.Str = 'UploadReport/';
                if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                }
                else
                    $location.path($scope.Str);
                $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
            }
            else if (selectPatient.GenderID == 2) {
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
          
                var response = Common.BindMaleFemaleCoupleDetails(selectPatient.UnitID, selectPatient.ID, selectPatient.GenderID);
                response.then(function (resp) {
                    if (resp.data != null) {
                        // debugger;
                        //console.log(resp.data);
                        $rootScope.Allergies = resp.data.MalePatient.Allergies;
                        if ($rootScope.Allergies.includes('null')) {
                            $rootScope.Allergies = '';
                        }

                    }
                })
                console.log("selectPatient",selectPatient)
                Common.setSelectedPatient(selectPatient);
                Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                    $scope.GetReportList();
                    $scope.btnText = 'Female Report';
                })
                $rootScope.FormName = 'Male Report Upload'
                $scope.Str = 'UploadReport/';
                if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                }
                else
                    $location.path($scope.Str);
                $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = true;
            }
        //}
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
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
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
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID = resp.data[0].VisitID;
                            $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitUnitID = resp.data[0].VisitUnitID;
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
   
    $scope.FillCatList = function () {
       // $scope.obj.ReportDate = new Date();
        var ResponseData = Common.getMasterList('M_ReportCategory', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //   Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.CatList = [];
            $scope.SearchCatList = [];
            angular.copy(Response.data, $scope.CatList);
            $scope.CatList.splice(0, 0, { ID: 0, Description: "Select" });
            angular.copy(Response.data, $scope.SearchCatList);
            $scope.SearchCatList.splice(0, 0, { ID: 0, Description: "Report Category" });
            $scope.obj.ReportCatID = 1;
            $scope.RPT.ReportCatID = 1;
        }, function (error) {
        });
    }
   
    $scope.handleFileSelect = function (evt) {
        debugger;
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
            $scope.filename = file.name;
        }
        else $scope.myImage = '';
        var maxSize = 20097152;  // 20mb
        var valid = (file.size) <= maxSize;
        //
        if (validExtension) {
            if (valid) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            }
            else {
                //AlertMessage.info('PalashIVF', 'Attactment should be not greater than 2 MB.');//Commented by swatih for localization on 13/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAttactmentshouldbenotgreaterthan20MB);//Modified by swatih for localization on 13/7/2020
            }
        }
        else {
            //AlertMessage.info('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgAttactmentshouldbeinpng_jpeg_pdf_format);//Modified by swatih for localization on 13/7/2020
        }
    }
    //var file = angular.element(document.getElementById("fileInput"));
    //file.on('change', handleFileSelect);    
    $scope.Save = function (obj) {
        debugger;
        $scope.IsReportUploadDisabled = true; //Added by AniketK on 02Dec2019
        if (Validate(obj)) {

           // if (angular.isDefined($scope.myImage) && $scope.myImage != '') {
                obj.ReportDate = $filter('date')(obj.ReportDate, 'medium');
               
                obj.strReport = $scope.myImage;
                obj.FileName = $scope.filename;

                if (obj.strReport == undefined)
                {
                    obj.strReport = '';
                }
                if(obj.UOM !== undefined && obj.UOM !== null && obj.UOM !== '')
                obj.ResValue = obj.ResValue +' ('+ obj.UOM +')';
                $scope.dataURItoBlob(obj.strReport);// added sujata for image save
                obj.strReport = null;            // added sujata for image save
                obj.strReport = $scope.strImage; // added sujata for image save
                var Promise = ReportUploadSrv.SaveUpdate(obj);
                Promise.then(function (resp) {
                    if (resp.data == 1) {
                        //AlertMessage.success('PalashIVF', 'Record saved successfully.');//Commented by Swatih for localization on 13/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);//Modified by swatih for localization on 13/7/2020
                        $scope.IsReportUploadDisabled = false; //Added by AniketK on 02Dec2019
                        $scope.GetReportList();
                        Clear();
                        $scope.filename = "";
                        $scope.myImage = '';
                    }
                }, function (error) {
                })
           // }
           // else AlertMessage.info('PalashIVF', 'Attach Report.')
        }
    }

    // added sujata for image save
    $scope.dataURItoBlob = function dataURItoBlob(dataURI) {
        debugger;
        if (dataURI.indexOf('image/jpeg') > 0 || dataURI.indexOf('image/png') > 0 || dataURI.indexOf('image/jpg') > 0)
            $scope.strImage = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");
        if (dataURI.indexOf('application/pdf') > 0)
            $scope.strImage = dataURI.replace(/^data:application\/[a-z]+;base64,/, "");
        return $scope.strImage;
    }


   


    $scope.MarkImportant = function (item) {
        debugger;
        var obj = {};
        obj.ID = item.ID;
        obj.UnitID = item.UnitID;
        obj.IsImportant = !item.IsImportant;
        item.IsImportant = obj.IsImportant;
        var Promise = ReportUploadSrv.MarkImportant(obj);
        Promise.then(function (resp) {
            if (resp.data == 1) {
                debugger;
                if (item.IsImportant == false)
                    //AlertMessage.success('PalashIVF', 'Important Mark Removed.');//Commented by swatih for localization on 13/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgImportantMarkRemoved);//Modified by swatih for localization 13/7/2020
                else
                    //AlertMessage.success('PalashIVF', 'Marked As Important.');//Commented by swatih for localization 13/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgMarkedAsImportant);//Modified by swatih for localization 13/7/2020
            }
                
        }, function (error) {
        })
    }
    $scope.DeleteReport = function (item) {
        debugger;
        //swalMessages.MessageBox('PalashIVF', 'Do you want to delete report?', "warning", function (isConfirmed) {//Commented by swatih for localization on 13/7/2020
        swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoyouwanttodeletereport, "warning", function (isConfirmed) { //Modified by swatih for localization on 13/7/2020
            if (isConfirmed) {
                var obj = {};
                obj.ID = item.ID;
                obj.UnitID = item.UnitID;
                var Promise = ReportUploadSrv.DeleteReport(obj);
                Promise.then(function (resp) {
                    debugger;
                    if (resp.data == 1) {
                        for (var i = 0; i <= $scope.ReportList.length - 1; i++) {
                            debugger;
                            if ($scope.ReportList[i].ID == item.ID) {
                                $scope.ReportList.splice(i, 1);
                            }
                        }
                        //   $scope.ReportList.splice($scope.ReportList.findIndex(x=>x.ID == item.ID), 1);
                       // AlertMessage.success('PalashIVF', 'Record deleted successfully.');//Commented by swatih for localization 13/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgRecorddeletedsuccessfully);//Modified by swatih for localization 13/7/2020
                    }
                }, function (error) {
                })
            }
        });
    }
     
  
    $scope.GetReportList = function () {
        if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;
        if (SelectDate()) {
            if (angular.isUndefined($scope.RPT.FromDate) || $scope.RPT.FromDate == null) $scope.RPT.FromDate = '';
            if (angular.isUndefined($scope.RPT.ToDate) || $scope.RPT.ToDate == null) $scope.RPT.ToDate = '';
            if (angular.isUndefined($scope.RPT.ReportCatID)) $scope.RPT.ReportCatID = 1;
            if (angular.isUndefined($scope.RPT.Name) || $scope.RPT.Name==null) $scope.RPT.Name = '';
            usSpinnerService.spin('GridSpinner');
            var Promise = ReportUploadSrv.GetReportList($scope.CurrentPage - 1, $filter('date')($scope.RPT.FromDate, 'shortDate'), $filter('date')($scope.RPT.ToDate, 'shortDate'),
                                                        $scope.RPT.ReportCatID, $scope.RPT.Name);
            Promise.then(function (resp) {
                usSpinnerService.stop('GridSpinner');
                $scope.GetUserrights();
                resp.data.forEach(function(item) 
                {
                    var resValue=item.ResValue.split(' (');
                    item.ResValue=resValue[0];
                    if(resValue[1] !== undefined && resValue[1] !== null && resValue[1] !== '')
                    item.UOM=resValue[1].split(')')[0];
               
                });
                $scope.ReportList = resp.data;
                if (resp.data.length > 0) {
                    $scope.TotalItems = $scope.ReportList[0].TotalCount;
                }
                
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
            })
        }
    }
    function SelectDate() {
        debugger;
        if (angular.isDate($scope.RPT.FromDate) && !angular.isDate($scope.RPT.ToDate)) {
           // AlertMessage.warning('PalashIVF', 'Select to date.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgSelecttodate);//Modified by swatih for localization on 13/7/2020
            return false;
        }
        else if (angular.isDate($scope.RPT.ToDate) && !angular.isDate($scope.RPT.FromDate)) {
            // AlertMessage.warning('PalashIVF', 'Select from date.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgSelectfromdate);//Modified by swatih for localization on 13/7/2020
            return false;
        }
        //else if ($filter('date')($scope.RPT.FromDate, 'shortDate') < $filter('date')($scope.RPT.ToDate, 'shortDate')) {
        //    AlertMessage.warning('PalashIVF', 'To date should be greater than from date.');
        //    return false;
        //}
        //else if (new Date($filter('date')($scope.RPT.FromDate, 'shortDate')) > new Date($filter('date')($scope.RPT.ToDate, 'shortDate'))) {
        //    AlertMessage.warning('PalashIVF', 'To date should be greater than from date.');
        //    return false;
        //}
        else return true;
    }
    $scope.PageChange = function PageChange() {
        $scope.GetReportList();
    }


    //$scope.ViewReport = function (item) {  //commented sujata  for file system
    //    debugger;
    //    var obj = {};
    //    obj.ID = item.ID;
    //    obj.UnitID = item.UnitID;
    //    var Promise = ReportUploadSrv.ViewReport(obj);
    //    Promise.then(function (resp) {

    //        $scope.extn = resp.data.strReport.substring(resp.data.strReport.indexOf(':') + 1, resp.data.strReport.indexOf('/'));
    //        $scope.FileName = resp.data.FileName;
    //        if ($scope.extn == 'image') {
    //            $scope.Image = resp.data.strReport;
    //            $scope.content = '';
    //        }
    //        else {
    //            $scope.content = resp.data.strReport;
    //            $scope.Image = null;
    //            //window.open($scope.content);
    //        }
    //        angular.element(myModal).modal('show');
    //    }, function (error) {
    //    })
    //}

      $scope.ViewReport = function (item) {    //added sujata  for file system
        debugger;
        var obj = {};
        obj.ID = item.ID;
        obj.UnitID = item.UnitID;
        obj.FileName = item.FileName;
        obj.IsFromDatabase=item.IsFromDatabase;
        var Promise = ReportUploadSrv.ViewReport(obj);
        Promise.then(function (resp) {

            if (resp.data.IsFromDatabase == false) {
                $scope.Image = resp.data.IMGPathReport;
                window.open($scope.Image);
            }

            else {
                $scope.extn = resp.data.strReport.substring(resp.data.strReport.indexOf(':') + 1, resp.data.strReport.indexOf('/'));
                $scope.FileName = resp.data.FileName;
                if ($scope.extn == 'image' || $scope.extn == '')
                {
                    $scope.Image = resp.data.strReport;
                    $scope.content = '';
                }
                else {
                    $scope.content = resp.data.strReport;
                    $scope.Image = null;
                    //window.open($scope.content);
                }
                angular.element(myModal).modal('show');

            }
        }, function (error) {
        })
    }
    function Validate(obj) {
        // 
        debugger;
        if (obj.ReportCatID == 0 || angular.isUndefined(obj.Name) || obj.Name == ''
            || obj.Name == null) {
            $scope.IsReportUploadDisabled = false; //Added by AniketK on 02Dec2019
           // AlertMessage.info('PalashIVF', 'Fill all mandatory fields.'); //Commented by swatih for localization on 13/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgFillallmandatoryfields);//Modified by swatih for localization on 13/7/2020
            $scope.frmReport.txtName.$dirty = true;
            $scope.frmReport.ddlCat.$dirty = true;
            //$scope.frmReport.ddlCat.$dirty = true;
            //$scope.frmReport.txtResultValue.$dirty = true;
            return false;
        }
        else if (obj.ReportDate == undefined || obj.ReportDate == '') {
            $scope.IsReportUploadDisabled = false; //Added by AniketK on 02Dec2019
            // AlertMessage.info('PalashIVF', 'Insert Report Date.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgInsertReportDate);//Modified by swatih for localization on 13/7/2020
            return false;
        }
        else if ((angular.isUndefined(obj.ResValue) || obj.ResValue == '')&& ($scope.filename=='' ||$scope.filename==null || angular.isUndefined($scope.filename))) {
            $scope.IsReportUploadDisabled = false; //Added by AniketK on 02Dec2019
            //AlertMessage.info('PalashIVF', 'Insert Result value or Attach report.');//Commented by swatih for localization on 13/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgInsertResultvalueorAttachreport);//Modified by swatih for localization on 13/7/2020
            return false;
        }
        else return true;
    }
    function Clear() {
        //$scope.obj.ReportDate = new Date();
        $scope.obj.ReportCatID = 1;
        $scope.obj.Name = '';
        $scope.obj.Remark = '';
        $scope.obj.ResValue = '';
        $scope.obj.UOM = '';
        $scope.obj.strReport = '';
        $scope.obj.IsFinalize = false;
        $scope.frmReport.$setPristine();
    }
    $scope.SortColumn = "Date";
    $scope.reverseSort = true;
    $scope.SortData = function (column) {
        $scope.reverseSort = ($scope.SortColumn == column) ? !$scope.reverseSort : false;
        $scope.SortColumn = column;
        if ($scope.SortColumn == column)
            $scope.sortClass = $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass = '';
    }
    $scope.Close = function () {
        angular.element(myModal).modal('hide');
    }
    $scope.SaveReport = function () {
        debugger;
        // window.win = open($scope.Image);
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', $scope.Image);
        downloadLink.attr('download', $scope.FileName);
        downloadLink.attr('target', '_self');
        angular.element(document.body).append(downloadLink);  //added to support firefox
        downloadLink[0].click();//call click function
       
        //  url.revokeObjectURL($scope.Image);//revoke the object from URL
    }
    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
        if (selectPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 313 && lstUserRights[z].Active)//Male Report Upload  
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 306 && lstUserRights[z].Active)//Female Report Upload 
                {
                    $scope.objRgt = lstUserRights[z];
                    break;
                }
            }
        }
        if (!$scope.objRgt.IsCreate) {
            angular.element(btnSaveReport).prop('disabled', true);

        }
        else {
            angular.element(btnSaveReport).prop('disabled', false);

        }
    }
    $scope.CancelMain = function CancelMain() {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    }

    

    $scope.checkReportDate = function (date) {
        debugger;
        //coomented by neena for client requirement date 6 june 2018
        //if ($filter('date')(date, 'dd-MMM-yyyy') > $filter('date')(new Date(), 'dd-MMM-yyyy')) {
        //    date = null;
        //    AlertMessage.info('PalashIVF', 'Report Date should not be greater than todays date.')
        //    $scope.obj.ReportDate = null;
        //}
    }
    $scope.SelectedService = function (obj) {
        debugger;
        $scope.obj.ServiceID = obj.ServiceID;
       
    };
})

PIVF.controller('visitmodelInfo', function ($scope, $uibModalInstance, VisitInfo) {
    debugger;
    $scope.visitInformation = VisitInfo;
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.SelectPatient = function (Item) {
        $uibModalInstance.close(Item);
    }
});


