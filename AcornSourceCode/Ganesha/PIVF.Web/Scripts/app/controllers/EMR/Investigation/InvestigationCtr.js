/// <reference path="InvestigationCtr.js" />
'use strict';
angular.module('PIVF').controller('InvestigationCtr', function ($scope, $rootScope, InvestigationSrv, Common, srvCommon, $location, AlertMessage, $filter, localStorageService, swalMessages, $uibModal, usSpinnerService) {
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $rootScope.FormName = 'Investigations';
    $rootScope.isAction = true;
    $scope.hideMain = false;
    $scope.checkDonor = false;
    $scope.isDoctor = localStorageService.get("UserInfo").IsDoctor;
    $rootScope.hideWhenQueue = false;
    $scope.SelectedServiceListLab = [];    // CategoryID=1
    $scope.SelectedServiceListRadiology = []; // CategoryID=2
    $scope.SelectedServiceListProcedure = [];    // CategoryID=3
    $scope.SelectedServiceListCycle = []; // CategoryID=4
    $scope.tmpLabList = [];
    $scope.tmpRadiologyList = [];
    $scope.setFavList = [];
    $scope.favouriteList = [];
    var selectPatient = {};
    var objResource = {};//Added by swatih for localization 15/7/2020
    //Added by swatih for localization on 13/7/2020
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //Added by swatih for localization on 13/7/2020
    var selectCouple = {};
    var tmpFavouriteList = [];
    var tmpFavouriteListToHold = [];
    var objDashboard = Common.getObj();
    $scope.SaveLinkCount = 0;
    $scope.SurrogateList = [];
    //  $scope.style = 'pointer-events: none;';
    $scope.btnDisabled = false;
    $scope.IsMarkSurrogate = false;   //Added by Nayan Kamble   
    $scope.IsMarkDonor = false;  //Added by Nayan Kamble    --
    debugger;
    var SelCouple = Common.getSelectedCouple();
    selectPatient = Common.getSelectedPatient();
    selectCouple = Common.getSelectedCouple();
    $scope.MRNO = selectPatient.MRNo;
    $scope.PatientName = selectPatient.PatientName;
    // Date pickr
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.IsFirstResponse = false;
    $scope.IsSecondResponse = false;
    $scope.IsThirdResponse = false;
    $scope.LinkConfig = {};
    $scope.LinkConfig.IsInvestigationMarkDoner = false;
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };
    //Sort Privious investigation data
    $scope.SortColumn1 = "AddedDatetime";
    $scope.reverseSort1 = true;
    $scope.SortData1 = function (column) {
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;
        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    $scope.SortColumn2 = "AddedDatetime";
    $scope.reverseSort2 = true;
    $scope.SortData2 = function (column) {
        $scope.reverseSort2 = ($scope.SortColumn2 == column) ? !$scope.reverseSort2 : false;
        $scope.SortColumn2 = column;
        if ($scope.SortColumn2 == column)
            $scope.sortClass2 = $scope.reverseSort2 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass2 = '';
    }
    $scope.SortColumn3 = "Category";
    $scope.reverseSort3 = true;
    $scope.SortData3 = function (column) {
        $scope.reverseSort3 = ($scope.SortColumn3 == column) ? !$scope.reverseSort3 : false;
        $scope.SortColumn3 = column;
        if ($scope.SortColumn3 == column)
            $scope.sortClass3 = $scope.reverseSort3 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass3 = '';
    }
    ////
    $scope.dateOptions = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120), //new Date(2016, 8, 01),
        minDate: new Date(),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    $scope.dateOptions1 = {
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120), //new Date(2016, 8, 01),
        minDate: new Date(),//new Date(),
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker

    $scope.SelectedType = 0;
    $scope.SelectedSubType = 0;// Used for getDonorList according to type,subtype

    $scope.openLabDtPickr = function ($event, i) {
        $event.preventDefault();
        $event.stopPropagation();
        i.dtpickropened = true;
    };

    $scope.LoadLinkConfiguartion = function LoadLinkConfiguartion() {
        var Responce = Common.getLinkConfiguartions();
        Responce.then(function (responce) {
            // $scope.LinkConfig = responce.data;
            if (responce.data.IsInvestigationMarkDoner === "true") {
                $scope.LinkConfig.IsInvestigationMarkDoner = true;
            }
            //console.log('Links Config', $scope.LinkConfig);
        }, function (err) {
        })
    }
    $scope.LoadLinkConfiguartion();
    /*Surrogate COde STart********************************************************************************************************************************************************/
    $scope.GetSurrogateList = function (SearchParam) {
        debugger;
        if (angular.isUndefined(SearchParam)) SearchParam = '';
        var ResponseData = Common.GetPatientListByCatList($scope.CurrentPage - 1, 10, SearchParam);// 10-Surrogate
        ResponseData.then(function (Response) {
            $scope.SurrogateList = Response.data;
            //Added by Nayan Kamble    --Start
            if (!angular.isUndefined($scope.SurrogatePackage)) {
                for (var iii = 0; iii < $scope.SurrogateList.length; iii++) {

                    if ($scope.SurrogateList[iii].ID == $scope.SurrogatePackage.SurrogateID && $scope.SurrogatePackage.SurrogateUnitID == $scope.SurrogateList[iii].UnitID) {
                        $scope.SurrogateList[iii].Status = true;
                    }

                }
            }
            //  Added by Nayan Kamble    --END

            //if (angular.isNumber($scope.Package.DonorID) && $scope.Package.DonorID > 0) {
            //    var idx = -1;
            //    for (var s = 0; s < $scope.DonorList.length; ++s) {
            //        if ($scope.DonorList[s].ID == $scope.Package.DonorID && $scope.DonorList[s].UnitID == $scope.Package.DonorUnitID) {
            //            idx = s;
            //            break;
            //        }
            //    }
            //    //  var idx = $scope.DonorList.findIndex(z=>z.ID == $scope.Package.DonorID && z.UnitID == $scope.Package.DonorUnitID);
            //    if (idx > -1)
            //        $scope.DonorList[idx].Status = true;
            //}
            console.log("LI ", $scope.SurrogateList)
            if (Response.data.length > 0)
                $scope.TotalDonors = Response.data[0].TotalCount;
            else $scope.TotalDonors = 0;
        }, function (error) {
        });
    }
    $scope.LinkSurrogate = function () {
        debugger;
        var chkTemp = 0;
        for (var s = 0; s < $scope.SurrogateList.length; ++s) {
            if ($scope.SurrogateList[s].Status == true) {
                chkTemp = 1;
                $scope.IsMarkSurrogate = true;    //Added by Nayan Kamble
                angular.element(modDonor).modal('hide');
            }
        }
        //Added by Nayan Kamble    --Start
        console.log("Index", $scope.SelectdCycleIndex);
        $scope.SelectedServiceListCycle[$scope.SelectdCycleIndex].SurrogateID = $scope.SurrogatePackage.SurrogateID;
        $scope.SelectedServiceListCycle[$scope.SelectdCycleIndex].SurrogateUnitID = $scope.SurrogatePackage.SurrogateUnitID;
        $scope.SurrogatePackage.IsSurrogateLinked = $scope.IsMarkSurrogate;         
        $scope.SelectedServiceListCycle[$scope.SelectdCycleIndex].IsSurrogateLinked = $scope.SurrogatePackage.IsSurrogateLinked;    

        //Added by Nayan Kamble    --End
        if (chkTemp == 0) {
            //AlertMessage.info('Palash IVF', 'Select Surrogate.');//Commented by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgSelectSurrogate);//Modified by swatih for localization 15/7/2020
        }
        //var idx = $scope.SelectedServiceListCycle.findIndex(function (z) { return z.ServiceID == donor.ServiceID });
        // $scope.SelectedServiceListCycle[idx].DonorID = donor.DonorID;
        // $scope.SelectedServiceListCycle[idx].DonorUnitID = donor.DonorUnitID;
    }
    $scope.clearData = function () {
        debugger;
        $scope.SurrogatePackage = [];
    }
    $scope.SelectSurrogate = function (i) {
        debugger;
        $scope.SurrogatePackage = {};
        $scope.SurrogateList.forEach(function (x) {
            if (x.ID != i.ID && x.Status == true) x.Status = false;
        })
        var idxSel = -1;
        for (var s = 0; s < $scope.SurrogateList.length; ++s) {
            if ($scope.SurrogateList[s].Status == true) {
                idxSel = s;
                break;
            }
        }
        if (idxSel != -1) {


            $scope.SurrogateList[idxSel].Status = false;
            //  $scope.DonorList[$scope.DonorList.findIndex(z=>z.Status == true)].Status = false;
            if (!i.IsDonorUsed) {
                var idx = -1;
                for (var s = 0; s < $scope.SurrogateList.length; ++s) {
                    if ($scope.SurrogateList[s].ID == i.ID) {
                        idx = s;
                        break;
                    }
                }
                //  var idx = $scope.DonorList.findIndex(z=>z.ID == i.ID);
                $scope.SurrogateList[idx].Status = true;
                $scope.SurrogatePackage.SurrogateID = $scope.SurrogateList[idx].ID;
                $scope.SurrogatePackage.SurrogateUnitID = $scope.SurrogateList[idx].UnitID;
                $scope.SurrogatePackage.Age = $scope.SurrogateList[idx].Age;
                $scope.SurrogatePackage.Date = new Date($scope.SurrogateList[idx].Date);
                $scope.SurrogatePackage.Count = new Date($scope.SurrogateList[idx].VisitID);
                $scope.SurrogatePackage.IsSurrogateUsed = $scope.SurrogateList[idx].IsDonorUsed;
                console.log($scope.SurrogatePackage.IsSurrogateUsed);
            }
            else {
                i.Status = false;
                //AlertMessage.info('Palash IVF', 'Surrogate already linked to other patient.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgSurrogatealreadylinkedtootherpatient);//Modified by swatih for localization 15/7/2020
            }
        }
        //  else {
        //       AlertMessage.info('Palash IVF', 'Select Donor.');
        // }

    }
        $scope.SetPackageSurrogate = function (index) {
            $scope.SelectdCycleIndex = index;
      //  }     commented by Nayan Kamble
    }
    /*Surrogate COde END********************************************************************************************************************************************************/

    $scope.handleFileSelect = function (evt) {
        //var file = evt.currentTarget.files[0];
        var file = evt.files[0];
        var extn = file.name.split(".").pop().toLowerCase();
        var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
        var validExtension = false;
        $scope.filename = file.name;
        extensions.forEach(function (x) {
            if (x === extn) {
                validExtension = true;
            }
        });
        var maxSize = 2097152;  // 2mb
        var valid = (file.size) <= maxSize;
        //
        if (validExtension) {
            if (valid) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        var i = $scope.InvfileUp;
                        var obj = { ID: i.ID, UnitID: i.UnitID, strReport: evt.target.result, DocName: $scope.filename };
                        var Promise = InvestigationSrv.UploadReport(obj);
                        Promise.then(function (resp) {
                            if (resp.data == 1)
                                //AlertMessage.info('PalashIVF', 'Report uploaded successfully.');//commented by swatih for localization 15/7/2020
                                AlertMessage.info(objResource.msgTitle, objResource.msgReportuploadedsuccessfully);//Modified by swatih for localization 15/7/2020
                        }, function (error) {
                        })
                    });
                };
                reader.readAsDataURL(file);
            }
            else {
                //AlertMessage.info('PalashIVF', 'Attactment should not be greater than 2 MB.');//commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgAttactmentshouldnotbegreaterthan2MB);//Modified by swatih for localization 15/7/2020
            }
        }
        else {
            //AlertMessage.info('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');//commented by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgAttactmentshouldbeinpng_jpeg_pdf_format);//Modified by swatih for localization 15/7/2020
        }
    }


    //Start Report 
    $scope.PrintCurrentInvestigation = function (Action) {
        debugger;
        if ($rootScope.IsFemaleActive)
            var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&VU=' + $rootScope.CoupleDetails.FemalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&Act=' + Action);

        else
            var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&P=' + $rootScope.CoupleDetails.MalePatient.MaleId + '&PU=' + $rootScope.CoupleDetails.MalePatient.MAleUnitID + '&VU=' + $rootScope.CoupleDetails.MalePatient.VisitUnitID + '&V=' + $rootScope.CoupleDetails.MalePatient.VisitID + '&Act=' + Action);

        window.open('/Reports/EMR/RadiologyWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab


    }
    //END Report

    $scope.lstUserRights = [];
    $scope.GetUserrights = function () {
        $scope.hideMain = false;
        var lstUserRights = Common.getUserRights();
        //  if (selectPatient.GenderID == 1) {
        //      for (var z = 0; z <= lstUserRights.length - 1; z++) {
        //          if (lstUserRights[z].MenuId == 311)//Male Investigations 
        //          {
        //               
        //              $scope.lstUserRights = $filter('filter')(lstUserRights, function (v) { return v.SubMenuID == lstUserRights[z].MenuId });
        //              break;
        //          }
        //      }
        //  }
        //  else if (selectPatient.GenderID == 2) {
        //      for (var z = 0; z <= lstUserRights.length - 1; z++) {
        //          if (lstUserRights[z].MenuId == 304)//Female Investigations 
        //          {
        //               
        //              $scope.lstUserRights = $filter('filter')(lstUserRights, function (v) { return v.SubMenuID == lstUserRights[z].MenuId });
        //              break;
        //          }
        //      }
        //  }
        //   
        //  $scope.objrgtFavList = $scope.lstUserRights[0];
        //  $scope.objrgtLabInv = $scope.lstUserRights[0];
        //  $scope.objrgtPro = $scope.lstUserRights[1];
        //  $scope.objrgtRadInv = $scope.lstUserRights[2];
        //  $scope.objrgtFav = $scope.lstUserRights[3];
        //  if (!$scope.objrgtLabInv.IsCreate && !$scope.objrgtRadInv.IsCreate) {
        //      angular.element(btnSaveInvestigation).prop('disabled', true);
        //  }
        //  else  {
        //      angular.element(btnSaveInvestigation).prop('disabled', false);
        //  }
        //  if (!$scope.objrgtFav.IsCreate) {
        //      angular.element(btnSaveFavourite).prop('disabled', true);
        //      angular.element(btnAddFavRow).prop('disabled', true);
        //      angular.element(btnAddPreviousFavourite).prop('disabled', true);
        //  }
        //  else {
        //      angular.element(btnAddFavRow).prop('disabled', false);
        //      angular.element(btnSaveFavourite).prop('disabled', false);
        //      angular.element(btnAddPreviousFavourite).prop('disabled', false);
        //  }
        debugger;
        if (selectPatient.GenderID == 1) {
            $scope.hideprocedure = true;
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 311 && lstUserRights[z].Active)//Male Investigations 
                {
                    $scope.objRgtInv = lstUserRights[z];
                    console.log("IsDate", $scope.objRgtInv)
                    break;
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            if ($rootScope.CoupleDetails.FemalePatient.PatientCategoryID == 11 || $rootScope.CoupleDetails.FemalePatient.PatientCategoryID == 10) {
                $scope.hideprocedure = true;
            }
            else
                $scope.hideprocedure = false;
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 304 && lstUserRights[z].Active)//Male Investigations 
                {
                    $scope.objRgtInv = lstUserRights[z];
                    break;
                }
            }
        }
        if (!$scope.objRgtInv.IsCreate) {
            angular.element(btnSaveInvestigation).prop('disabled', true);
            angular.element(btnAddPreInv).prop('disabled', true);
            angular.element(btnAddInvEmptyRow).prop('disabled', true);
            angular.element(btnAddProEmptyRow).prop('disabled', true);
            angular.element(btnAddPrePro).prop('disabled', true);
            angular.element(btnSaveProcedure).prop('disabled', true);
            // angular.element(btnAddFavRow).prop('disabled', true);
            angular.element(btnSaveFavourite).prop('disabled', true);
            angular.element(btnAddPreviousFavourite).prop('disabled', true);

        }
        else {
            angular.element(btnSaveInvestigation).prop('disabled', false);
            angular.element(btnAddPreInv).prop('disabled', false);
            angular.element(btnAddInvEmptyRow).prop('disabled', false);
            angular.element(btnAddProEmptyRow).prop('disabled', false);
            angular.element(btnSaveProcedure).prop('disabled', false);
            angular.element(btnAddPrePro).prop('disabled', false);
            //  angular.element(btnAddFavRow).prop('disabled', false);
            angular.element(btnSaveFavourite).prop('disabled', false);
            angular.element(btnAddPreviousFavourite).prop('disabled', false);

        }
        if (!$scope.isDoctor) {
            angular.element(btnSaveInvestigation).prop('disabled', true);
            angular.element(btnAddPreInv).prop('disabled', true);
            angular.element(btnAddInvEmptyRow).prop('disabled', true);
            angular.element(btnAddProEmptyRow).prop('disabled', true);
            angular.element(btnAddPrePro).prop('disabled', true);
            angular.element(btnSaveProcedure).prop('disabled', true);
            //       angular.element(btnAddFavRow).prop('disabled', true);
            angular.element(btnSaveFavourite).prop('disabled', true);
            angular.element(btnAddPreviousFavourite).prop('disabled', true);
        }
        if (!$scope.objRgtInv.IsDateValidation) {
            $scope.dateOptions1 = {
                //  dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: new Date().setMonth(new Date().getMonth() + 120), //new Date(2016, 8, 01),
                // minDate: new Date(),//new Date(),
                startingDay: 1,
                showWeeks: false
            };  //for configure date-picker
        }

    }

    $scope.InvfileUp = function (i) {
        $scope.InvfileUp = i;
    }

    $scope.ViewReport = function (ID, UnitID) {
        var Promise = InvestigationSrv.ViewReport(ID, UnitID);
        Promise.then(function (resp) {

            if (resp.data != null) {
                $scope.extn = resp.data.strReport.substring(resp.data.strReport.indexOf(':') + 1, resp.data.strReport.indexOf('/'));
                $scope.FileName = resp.data.FileName;
                if ($scope.extn == 'image') {
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

    $scope.Close = function () {
        angular.element(myModal).modal('hide');
    }

    $scope.Download = function () {

        var link = document.createElement("a");
        link.download = $scope.FileName;
        link.href = $scope.Image;
        link.click();
    }

    $scope.PageChange = function (CatID, SearchParam) {
        debugger;
        //  $scope.GetPreviousInvestigation(CatID, SearchParam);      //Commented by Nayan Kamble on 26/11/2019  just to check

        $scope.GetFavouriteList(SearchParam);    //Added by Nayan Kamble on 26/11/2019
    }

    $scope.GetAllResponse = function () {
        if ($scope.IsFirstResponse == true && $scope.IsSecondResponse == true && $scope.IsThirdResponse == true) {
            usSpinnerService.stop('GridSpinner');
        }
    };
    $scope.GetAllResponseSecond = function () {
        if ($scope.IsFirstResponse == true && $scope.IsSecondResponse == true) {
            usSpinnerService.stop('GridSpinner');
        }
    };
    $scope.GetCatwiseServiceList = function (CatID) {
        debugger;
        $scope.IsFirstResponse = false;
        usSpinnerService.spin('GridSpinner');
        var Promise = InvestigationSrv.GetCatwiseServiceList(CatID , $rootScope.selectedPatientGenderId );
        Promise.then(function (resp) {
            if(CatID==4){
            $scope.MarkSurrogate = resp.data[0].IsMarkSurrogate;     //Added by Nayan Kamble
            }
            $scope.IsFirstResponse = true;
            if (CatID == 0)
                $scope.GetAllResponseSecond();
            else
                $scope.GetAllResponse();

            $scope.ServiceList = resp.data;
        }, function (error) {
            $scope.IsFirstResponse = true;
            if (CatID == 0)
                $scope.GetAllResponseSecond();
            else
                $scope.GetAllResponse();
        })
    }

    $scope.SelectedService = function (selSer) {
        debugger;
        if (selSer.IsPackage == 3) $scope.CatID = 3;
        if (selSer.IsPackage == 4) $scope.CatID = 4
        if ($scope.CatID == 1) {     //$scope.CatID == 1 is for investigation lab 
            if (checkServiceDuplicacy($scope.SelectedServiceListLab, selSer)) {
                $scope.SelectedServiceListLab.push({
                    ServiceID: selSer.Id,
                    ServiceCode: selSer.ServiceCode,
                    Service: selSer.Description,
                    PlannedDate: new Date(),
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            //else AlertMessage.info('PalashIVF', 'Service already added.');//Commented by swatih for localization 15/7/2020
            else AlertMessage.info(objResource.msgTitle, objResource.msgServicealreadyadded);//Commented by swatih for localization 15/7/2020
        }
        else if ($scope.CatID == 2) {
            if (checkServiceDuplicacy($scope.SelectedServiceListRadiology, selSer)) {
                $scope.SelectedServiceListRadiology.push({
                    ServiceID: selSer.Id,
                    ServiceCode: selSer.ServiceCode,
                    Service: selSer.Description,
                    PlannedDate: new Date(),
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            //else AlertMessage.info('PalashIVF', 'Service already added.');//Commented by swatih for localization 15/7/2020
            else AlertMessage.info(objResource.msgTitle, objResource.msgServicealreadyadded);//Modified by swatih for localization 15/7/2020
        }
        if ($scope.CatID == 3) {     //$scope.CatID == 1 is for investigation lab &&  $scope.CatID=3 for procedure
            if (checkServiceDuplicacy($scope.SelectedServiceListProcedure, selSer)) {
                $scope.SelectedServiceListProcedure.push({
                    ServiceID: selSer.Id,
                    ServiceCode: selSer.ServiceCode,
                    Service: selSer.Description,
                    PlannedDate: '',
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            //else AlertMessage.info('PalashIVF', 'Service already added.');//Commented by swatih for localization 15/7/2020
            else AlertMessage.info(objResource.msgTitle, objResource.msgServicealreadyadded);//Modified by swatih for localization 15/7/2020
        }
        else if ($scope.CatID == 4 && !$scope.hideprocedure) {
            console.log("cat 4", $scope.SelectedServiceListCycle)
            if (SelCouple.FemalePatient.IsCloseCycle) { //Added sujata for close close issue

                //if (selectCouple.FemalePatient.IsCloseCycle)  //comment sujata for close close issue
               
                if ($scope.SelectedServiceListCycle.every(function (z) {
                    if (z.VisitID == $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID && z.VisitUnitID == $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID)
                    return false;
                else return true;
                })) {
                    $scope.ARTSubTypeList = [];
                    $scope.ARTSubTypeList.splice(0, 0, { ID: 0, Description: "Select" });
                    $scope.SelectedServiceListCycle.push({
                        ServiceID: selSer.Id,
                        ServiceCode: selSer.ServiceCode,
                        Service: selSer.Description,
                        PlannedDate: '',
                        Instruction: '',
                        CategoryID: $scope.CatID,
                        chkSelect: false,
                        ArttypeID: 0,
                        style: 'pointer-events: none;',
                        styleSurrogate: selSer.styleSurrogate,       //Added by Nayan Kamble
                        ArtSubTypeID: 0,
                        DonorID: 0,
                        DonorUnitID: 0,
                        OrderFrom: $rootScope.FormName,
                        SaveLinkCount: 0,
                        lstArtSubType: $scope.ARTSubTypeList
                    });
                }
                //else AlertMessage.info('Palash IVF', 'You can add only one cycle for same visit.');//Commented by swatih for localization 15/7/2020
                else AlertMessage.info(objResource.msgTitle, objResource.msgYoucanaddonlyonecycleforsamevisit);//Modified by swatih for localization 15/7/2020
            }
                //else AlertMessage.info('Palash IVF', 'Close existing cycle first.');//Commented by swatih for localization 15/7/2020
            else AlertMessage.info(objResource.msgTitle, objResource.nsgCloseexistingcyclefirst);//Modified by swatih for localization 15/7/2020
        }
        else if ($scope.CatID == 4 && $scope.hideprocedure) {
            //AlertMessage.info('Palash IVF', 'Cycle Can not be added to male Patient');//Modified by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgCycleCannotbeaddedtomalePatient);//Modified by swatih for localization 15/7/2020
        }
        //$scope.selSer.id = 0;
        //$scope.selSer.ServiceCode = '';
        //$scope.selSer.Description = '';
        //$scope.selSer.ServiceCodeDesc = '';
        $scope.selSer = null;
    }

    function checkServiceDuplicacy(lst, selSer) {
        debugger;
        var isValid = true;
        lst.forEach(function (x) {
            if (x.Service == selSer.Description)
                isValid = false;
        })
        return isValid;
    }

    $scope.AddRow = function () {

        if ($scope.CatID == 1) {
            if (checkNewServiceCount($scope.SelectedServiceListLab) < 3) {
                $scope.SelectedServiceListLab.push({
                    ServiceID: 0,
                    ServiceCode: '',
                    Service: '',
                    PlannedDate: new Date(),
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            else {
                //AlertMessage.info('Palash IVF', 'You can add only 3 new services.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgYoucanaddonly3newservices);//Modified by swatih for localization 15/7/2020
            }
        }
        if ($scope.CatID == 3) {
            if (checkNewServiceCount($scope.SelectedServiceListProcedure) < 3) {
                $scope.SelectedServiceListProcedure.push({
                    ServiceID: 0,
                    ServiceCode: '',
                    Service: '',
                    PlannedDate: new Date(),
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            else {
                //AlertMessage.info('Palash IVF', 'You can add only 3 new services.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgYoucanaddonly3newservices);//Modified by swatih for localization 15/7/2020
            }
        }
        else if ($scope.CatID == 2) { // || $scope.CatID == 4
            if ($scope.SelectedServiceListRadiology.length < 3) {
                $scope.SelectedServiceListRadiology.push({
                    ServiceID: 0,
                    ServiceCode: '',
                    Service: '',
                    PlannedDate: '',
                    Instruction: '',
                    CategoryID: $scope.CatID,
                    chkSelect: false,
                    ArttypeID: 0,
                    ArtSubTypeID: 0,
                    DonorID: 0,
                    DonorUnitID: 0,
                    OrderFrom: $rootScope.FormName
                });
            }
            else {
                //AlertMessage.info('Palash IVF', 'You can add only 3 new services.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgYoucanaddonly3newservices);//Modified by swatih for localization 15/7/2020
            }
        }
    }

    function checkNewServiceCount(lst) {
        var count = 0;
        lst.forEach(function (x) {
            if (x.ServiceCode == '')
                count = count + 1;
        })
        return count;
    }

    $scope.SaveInvestigation = function () {    
        debugger;
        console.log($scope.ARTTypeList)
        var lstToSave = [];
        for (var ii = 0; ii < $scope.SelectedServiceListCycle.length; ii++) {
            if (!($scope.SelectedServiceListCycle[ii].ArttypeID == 7 || $scope.SelectedServiceListCycle[ii].ArttypeID == 8)) {
                $scope.SelectedServiceListCycle[ii].DonorID = 0;
                $scope.SelectedServiceListCycle[ii].DonorUnitID = 0;

            }
            if ($scope.SelectedServiceListCycle[ii].SaveLinkCount == 0) {
                $scope.SelectedServiceListCycle[ii].DonorID = 0;
                $scope.SelectedServiceListCycle[ii].DonorUnitID = 0;
            }
            //Added by Nayan Kamble --Start
            if ($scope.SelectedServiceListCycle[ii].ArttypeID == 2) {
                $scope.SelectedServiceListCycle[ii].SurrogateID = 0;
                $scope.SelectedServiceListCycle[ii].SurrogateUnitID = 0;
            }
            //Added by Nayan Kamble --End
        }
        lstToSave = $scope.SelectedServiceListLab.concat($scope.SelectedServiceListRadiology, $scope.SelectedServiceListProcedure, $scope.SelectedServiceListCycle);
        //angular.forEach(lstToSave, function (item, idx) {
        //    if (angular.isDefined(item.ID)) {
        //        lstToSave.splice(idx, 1);
        //    }
        //})    commented by Nayan Kamble on 16/12/2019
        //  lstToSave.forEach(function (x) { x.PlannedDate = $filter('date')(x.PlannedDate, 'medium') });   commented by Nayan Kamble on 16/12/2019
        if (lstToSave.length > 0) {
            if (validateInvestigationInput()) {
                var Promise = InvestigationSrv.SaveInvestigation(lstToSave);
                Promise.then(function (resp) {
                    debugger;
                    if (resp.data == 1) {
                        //AlertMessage.success('Palash IVF', 'Record saved successfully.');//Commented by swatih for localization 15/7/2020
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);//Modified by swatih for localization 15/7/2020
                        ClearSaveInvestigation();
                        $scope.GetTodaysInvestigation($scope.CatID);
                    }

                    else if (resp.data == 3) {
                        //AlertMessage.info('Palash IVF', 'Record saved successfully.');    //'Record already saved.' //  modified by Nayan Kamble on 17/12/2019//Commented by swatih for localization 15/7/2020
                        AlertMessage.info(objResource.msgTitle, objResource.msgSave);//Modified by swatih for localization 15/7/2020
                        ClearSaveInvestigation();                       //Added by Nayan Kamble on 17/12/2019
                        $scope.GetTodaysInvestigation($scope.CatID);         //Added by Nayan Kamble on 17/12/2019
                    }

                }, function (error) {

                })
            }
        }
        else {
            //AlertMessage.info('Palash IVF', 'Add atleast 1 service.');//Commented by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgAddatleast1service);//Modified by swatih for localization 15/7/2020
        }
    }

    function validateInvestigationInput() {
        debugger;
        var isVisitSame = 0;
        if ($scope.SelectedServiceListCycle.some(function (z) {
        if (z.VisitID == $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID && z.VisitUnitID == $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitUnitID) {
             //AlertMessage.info('Palash IVF', 'You can add only one cycle for same visit.');//Commented by swatih for localization 15/7/2020
             AlertMessage.info(objResource.msgTitle, objResource.msgYoucanaddonlyonecycleforsamevisit);//Modified by swatih for localization 15/7/2020
            isVisitSame = 1
            return false;
        }
        }));
        if (isVisitSame == 1) {
            return false;
        }

        for (var i = 0; i < $scope.SelectedServiceListLab.length; i++) {
            if ($scope.SelectedServiceListLab[i].Service == '' || $scope.SelectedServiceListLab[i].Service == null) {
                //AlertMessage.info('Palash IVF', 'Service name should not be empty in Laboratory.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgServicenameshouldnotbeemptyinLaboratory);//Modified by swatih for localization 15/7/2020
                return false;
            }
        }

        if ($scope.CatID == 4)
        {
            for (var i = 0; i < $scope.SelectedServiceListCycle.length; i++) {
                if ($scope.SelectedServiceListCycle[i].ArttypeID == 0 || $scope.SelectedServiceListCycle[i].ArttypeID == null) {
                    //AlertMessage.info('Palash IVF', 'Please Select ART Type');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgPleaseSelectARTType);//Modified by swatih for localization 15/7/2020
                    return false;
                }
                if ($scope.SelectedServiceListCycle[i].ArtSubTypeID == 0 || $scope.SelectedServiceListCycle[i].ArtSubTypeID == null) {
                    // AlertMessage.info('Palash IVF', 'Please Selecyt ART SubType');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgPleaseSelecytARTSubType);//Modified by swatih for localization 15/7/2020
                    return false;
                }
                if ($scope.SelectedServiceListCycle[i].PlannedDate == '' || $scope.SelectedServiceListCycle[i].PlannedDate == null) {
                    //AlertMessage.info('Palash IVF', 'Date is Mandartory in Cycles');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgDateisMandartoryinCycles);//Modified by swatih for localization 15/7/2020
                    return false;
                }
            }
        }
        for (var i = 0; i < $scope.SelectedServiceListRadiology.length; i++) {
            if ($scope.SelectedServiceListRadiology[i].Service == '' || $scope.SelectedServiceListRadiology[i].Service == null) {
               // AlertMessage.info('Palash IVF', 'Service name should not be empty in Radiology.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgServicenameshouldnotbeemptyinRadiology);//Modified by swatih for localization 15/7/2020
                return false;
            }
        }
        for (var i = 0; i < $scope.SelectedServiceListProcedure.length; i++) {
            if ($scope.SelectedServiceListProcedure[i].Service == '' || $scope.SelectedServiceListProcedure[i].Service == null) {
                //AlertMessage.info('Palash IVF', 'Service name should not be empty in Procedures.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgServicenameshouldnotbeemptyinProcedures);//Modified by swatih for localization 15/7/2020
                return false;
            }
        }

       
        if ($scope.checkDonor == true) {
            //AlertMessage.info('Palash IVF', 'Please link the donor');//Commented by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgPleaselinkthedonor);//Modified by swatih for localization 15/7/2020
            return false;
        }

        return true;
    }

    function ClearSaveInvestigation() {
        //  angular.element(rdbLab).prop("checked", true);
        //  $scope.CatID = 1;
        //  $scope.GetCatwiseServiceList(1);
        $scope.SelectedServiceListLab.length = 0;
        $scope.SelectedServiceListRadiology.length = 0;
        $scope.SelectedServiceListProcedure.length = 0;
        $scope.SelectedServiceListRadiology.length = 0;
        tmpFavouriteList.length = 0;
        tmpFavouriteListToHold.length = 0;
    }

    $scope.GetPreviousInvestigation = function (CatID, SearchParam) {
        debugger;
        if (selectPatient.GenderID == 1) {
            if (CatID == 1 || CatID == 2)
                $scope.btnText = 'Female Investigation';
            else $scope.btnText = 'Female Procedure';
        }
        else if (selectPatient.GenderID == 2) {
            if (CatID == 1 || CatID == 2)
                $scope.btnText = 'Male Investigation';
            else $scope.btnText = 'Male Procedure';
        }
        if (angular.isUndefined(SearchParam) || SearchParam == null) SearchParam = '';
        $scope.IsThirdResponse = false;
        usSpinnerService.spin('GridSpinner');
        var Promise = InvestigationSrv.GetPreviousInvestigation($scope.CurrentPage - 1, CatID, SearchParam);
        Promise.then(function (resp) {
            $scope.IsThirdResponse = true;
            $scope.GetAllResponse();
            $scope.PreInvList = resp.data;
            if (resp.data.length > 0)
                $scope.TotalItems = resp.data[0].TotalCount;
            else $scope.TotalItems = 0;
        }, function (error) {
            $scope.IsThirdResponse = true;
            $scope.GetAllResponse();
        })
    }

    $scope.GetTodaysInvestigation = function (CatID) {
        debugger;
        $scope.IsVisitMark();
        if (selectPatient.GenderID == 1 || $rootScope.CoupleDetails.FemalePatient.PatientCategoryID == 11 || $rootScope.CoupleDetails.FemalePatient.PatientCategoryID == 10) {
            $scope.hideprocedure = true;
        }
        else if (selectPatient.GenderID == 2) {
            $scope.hideprocedure = false;
        }
        $scope.IsSecondResponse = false;
        usSpinnerService.spin('GridSpinner');
        var Promise = InvestigationSrv.GetTodaysInvestigation(CatID);
        $scope.IsSecondResponse = true;
        $scope.GetAllResponse();

        Promise.then(function (resp) {
            resp.data.forEach(function (x) {
                if (x.PlannedDate != null)
                    x.PlannedDate = new Date(x.PlannedDate)
            });
            $scope.SelectedServiceListLab = $filter('filter')(resp.data, function (v) { return v.CategoryID == 1 });
            $scope.SelectedServiceListProcedure = $filter('filter')(resp.data, function (v) { return v.CategoryID == 3 });
            $scope.SelectedServiceListRadiology = $filter('filter')(resp.data, function (v) {
                return v.CategoryID == 2;
            });
            $scope.SelectedServiceListCycle = $filter('filter')(resp.data, function (v) {
                if (v.CategoryID == 4)
                    $scope.GetArtSubTypeList(v);
                return v.CategoryID == 4;
            });

            if (tmpFavouriteList.length > 0) {
                debugger;// from favourite
                angular.forEach(tmpFavouriteList, function (item) {
                    if (item.CategoryID == 1) { $scope.SelectedServiceListLab.push(item); }
                    else if (item.CategoryID == 2) { $scope.SelectedServiceListRadiology.push(item); }
                    else if (item.CategoryID == 3) { $scope.SelectedServiceListProcedure.push(item); }
                    else if (item.CategoryID == 4) { $scope.SelectedServiceListCycle.push(item); }
                })
            }

        }, function (error) {
            $scope.IsSecondResponse = true;
            $scope.GetAllResponse();
        })
    }

    $scope.DeleteService = function (item) {
        debugger;
        //  added sujata  by sujata 

        if (tmpFavouriteList.length > 0) {  // for favourite uncheck  
            var idx = 0;
            for (var i = 0; i < tmpFavouriteList.length; ++i) {
                if (tmpFavouriteList[i].Service == item.Service && tmpFavouriteList[i].TemplateID == item.TemplateID) {
                    idx = i;
                    break;
                }
            }                              //  addedd sujata && tmpFavouriteList[i].TemplateID == item.TemplateID


            //     var idx=tmpFavouriteList.findIndex(z=>z.Service == item.Service && z.TemplateID==item.TemplateID);
            tmpFavouriteList.splice(idx, 1);
            var ind = 0;
            for (var i = 0; i < $scope.favouriteList.length; ++i) {
                if ($scope.favouriteList[i].TemplateID == item.TemplateID) {
                    ind = i;
                    break;
                }
            }
            //    var ind = $scope.favouriteList.findIndex(z=>z.TemplateID == item.TemplateID);
            var ind1 = 0;
            for (var i = 0; i < $scope.favouriteList[ind].lstService.length; ++i) {
                if ($scope.favouriteList[ind].lstService[i].Description == item.Service) {
                    ind1 = i;
                    break;
                }
            }
            $scope.favouriteList[ind].lstService[ind1].chkService = false;
            //  $scope.favouriteList[ind].lstService[$scope.favouriteList[ind].lstService.findIndex(y=>y.Description == item.Service)].chkService = false;
        }
        if (angular.isNumber(item.ID) && item.ID > 0) {
            debugger;
            if (item.CategoryID == 4 && item.IsDonorCycle == 1) {
                //AlertMessage.warning('Palash IVF', 'Donor Cycle Is Created So Can\'t Delete The Record ');//Commented by swatih for localization 15/7/2020
                AlertMessage.warning(objResource.msgTitle, objResource.msgDonorCycleIsCreatedSoCantDeleteTheRecord);//Modified by swatih for localization 15/7/2020
            }
            else {
                Common.clearObj();
                Common.setObj(item);
                angular.element(reasonModel).modal('show');
            }
        }
        else {
            if (item.CategoryID == 1) {
                var indLab = 0;
                for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
                    if ($scope.SelectedServiceListLab[i].Service == item.Service) {
                        indLab = i;
                        break;
                    }
                }
                $scope.SelectedServiceListLab.splice(indLab, 1)
                //    $scope.SelectedServiceListLab.splice($scope.SelectedServiceListLab.findIndex(x=>x.Service == item.Service), 1)
                var indtmpLab = 0;
                for (var i = 0; i < $scope.tmpLabList.length; ++i) {
                    if ($scope.tmpLabList[i].Service == item.Service) {
                        indtmpLab = i;
                        break;
                    }
                }
                $scope.tmpLabList.splice(indtmpLab, 1);
                //    $scope.tmpLabList.splice($scope.tmpLabList.findIndex(z=>z.Service == item.Service), 1);
            }
            else if (item.CategoryID == 3) {

                var indPro = 0;
                for (var i = 0; i < $scope.SelectedServiceListProcedure.length; ++i) {
                    if ($scope.SelectedServiceListProcedure[i].Service == item.Service) {
                        indPro = i;
                        break;
                    }
                }
                $scope.SelectedServiceListProcedure.splice(indPro, 1)
                //$scope.SelectedServiceListProcedure.splice($scope.SelectedServiceListProcedure.findIndex(x=>x.Service == item.Service), 1)
                var indtmpLab = 0;
                for (var i = 0; i < $scope.tmpLabList.length; ++i) {
                    if ($scope.tmpLabList[i].Service == item.Service) {
                        indtmpLab = i;
                        break;
                    }
                }
                $scope.tmpLabList.splice(indtmpLab, 1);
                //$scope.tmpLabList.splice($scope.tmpLabList.findIndex(z=>z.Service == item.Service), 1);
            }
            else if (item.CategoryID == 2) {
                var indtmpLab = 0;
                for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
                    if ($scope.SelectedServiceListRadiology[i].Service == item.Service) {
                        indtmpLab = i;
                        break;
                    }
                }
                $scope.SelectedServiceListRadiology.splice(indtmpLab, 1)
                //$scope.SelectedServiceListRadiology.splice($scope.SelectedServiceListRadiology.findIndex(x=>x.Service == item.Service), 1)
                var indtmpRad = 0;
                for (var i = 0; i < $scope.tmpRadiologyList.length; ++i) {
                    if ($scope.tmpRadiologyList[i].Service == item.Service) {
                        indtmpRad = i;
                        break;
                    }
                }
                $scope.tmpRadiologyList.splice(indtmpRad, 1);
                //$scope.tmpRadiologyList.splice($scope.tmpRadiologyList.findIndex(z=>z.Service == item.Service), 1);
            }
            else if (item.CategoryID == 4) {
                var indCy = 0;
                debugger;
                for (var i = 0; i < $scope.SelectedServiceListCycle.length; ++i) {
                    if ($scope.SelectedServiceListCycle[i].Service == item.Service) {
                        indCy = i;
                        break;
                    }
                }
                $scope.SelectedServiceListCycle.splice(indCy, 1)
                //$scope.SelectedServiceListCycle.splice($scope.SelectedServiceListCycle.findIndex(x=>x.Service == item.Service), 1)
                var indtmpRad = 0;
                for (var i = 0; i < $scope.tmpRadiologyList.length; ++i) {
                    if ($scope.tmpRadiologyList[i].Service == item.Service) {
                        indtmpRad = i;
                        break;
                    }
                }
                $scope.tmpRadiologyList.splice(indtmpRad, 1);
                //$scope.tmpRadiologyList.splice($scope.tmpRadiologyList.findIndex(z=>z.Service == item.Service), 1);
            }
            var indPreInv = 0;
            for (var i = 0; i < $scope.PreInvList.length; ++i) {
                if ($scope.PreInvList[i].Service == item.Service && $scope.PreInvList[i].chkSelect == true) {
                    indPreInv = i;
                    break;
                }
            }
            if (indPreInv > 0)//$scope.PreInvList.findIndex(z=>z.Service == item.Service)>0
                $scope.PreInvList[indPreInv].chkSelect = false;
        }
    }
    $scope.CancelReason = function () {
        angular.element(reasonModel).modal('hide');
    }
    $scope.DeleteSavedService = function (deleteReason) {
        if (angular.isString(deleteReason)) {
            var obj = {};
            obj = Common.getObj();
            var Promise = InvestigationSrv.DeleteSavedService(obj.ID, obj.UnitID, deleteReason);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    debugger;
                    angular.element(reasonModel).modal('hide');
                    $scope.deleteReason = "";
                    if (obj.CategoryID == 1) {
                        var indLab = 0;
                        for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
                            if ($scope.SelectedServiceListLab[i].ServiceID == obj.ServiceID) {
                                indLab = i;
                                break;
                            }
                        }
                        $scope.SelectedServiceListLab.splice(indLab, 1);
                        //$scope.SelectedServiceListLab.splice($scope.SelectedServiceListLab.findIndex(x=>x.ServiceID == obj.ServiceID), 1);
                    }
                    else if (obj.CategoryID == 3) {
                        var indPro = 0;
                        for (var i = 0; i < $scope.SelectedServiceListProcedure.length; ++i) {
                            if ($scope.SelectedServiceListProcedure[i].ServiceID == obj.ServiceID) {
                                indPro = i;
                                break;
                            }
                        }
                        $scope.SelectedServiceListProcedure.splice(indPro, 1);
                        //$scope.SelectedServiceListProcedure.splice($scope.SelectedServiceListProcedure.findIndex(x=>x.ServiceID == obj.ServiceID), 1);
                    }
                    else if (obj.CategoryID == 2 || obj.CategoryID == 4) {
                        var ind = 0;
                        for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
                            if ($scope.SelectedServiceListRadiology[i].ServiceID == obj.ServiceID) {
                                ind = i;
                                break;
                            }
                        }
                        $scope.SelectedServiceListRadiology.splice(ind, 1);
                        //$scope.SelectedServiceListRadiology.splice($scope.SelectedServiceListRadiology.findIndex(x=>x.ServiceID == obj.ServiceID), 1);
                    }
                    else if (obj.CategoryID == 4) {
                        var ind = 0;
                        for (var i = 0; i < $scope.SelectedServiceListCycle.length; ++i) {
                            if ($scope.SelectedServiceListCycle[i].ServiceID == obj.ServiceID) {
                                ind = i;
                                break;
                            }
                        }
                        $scope.SelectedServiceListCycle.splice(ind, 1);
                        //$scope.SelectedServiceListCycle.splice($scope.SelectedServiceListCycle.findIndex(x=>x.ServiceID == obj.ServiceID), 1);
                    }
                    if (tmpFavouriteList.length > 0) { // for favourite uncheck
                        var inx = 0;
                        for (var i = 0; i < tmpFavouriteList.length; ++i) {
                            if (tmpFavouriteList[i].Service == obj.Service && tmpFavouriteList[i].TemplateID == obj.TemplateID) {
                                inx = i;
                                break;
                            }
                        }
                        //    var idx = tmpFavouriteList.findIndex(z=>z.Service == obj.Service && z.TemplateID == obj.TemplateID);
                        tmpFavouriteList.splice(inx, 1);
                        if ($scope.favouriteList.length > 0) { // for favourite uncheck
                            var inx = 0;
                            for (var i = 0; i < $scope.favouriteList.length; ++i) {
                                if ($scope.favouriteList[i].TemplateID == obj.TemplateID) {
                                    inx = i;
                                    break;
                                }
                            }
                            //   var ind = $scope.favouriteList.findIndex(z=>z.TemplateID == obj.TemplateID);
                            var idx = 0;
                            for (var i = 0; i < $scope.favouriteList[inx].lstService.length; ++i) {
                                if ($scope.favouriteList[inx].lstService[i].Description == obj.Service) {
                                    idx = i;
                                    break;
                                }
                            }
                            $scope.favouriteList[inx].lstService[idx].chkService = false;
                            //$scope.favouriteList[ind].lstService[$scope.favouriteList[ind].lstService.findIndex(y=>y.Description == obj.Service)].chkService = false;
                        }
                        $scope.deleteReason = '';
                        angular.element(reasonModel).modal('hide');
                    }
                    //AlertMessage.success('Palash IVF', 'Record deleted successfully.');
                    AlertMessage.success(objResource.msgTitle, objResource.msgRecorddeletedsuccessfully);
                    $scope.GetTodaysInvestigation(obj.CategoryID);
                    $scope.GetCatwiseServiceList(obj.CategoryID);
                }
                else if (resp.data == 2) {
                    $scope.deleteReason = '';
                    angular.element(reasonModel).modal('hide');
                    //AlertMessage.info('Palash IVF', 'Cycle is created against this package,You can not delete package.');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgCycleiscreatedagainstthispackageYoucannotdeletepackage);//Modified by swatih for localization 15/7/2020
                }
            }, function (error) {
                //AlertMessage.error('Palash IVF', 'Error occured.');//Commented by swatih for localization 15/7/2020
                AlertMessage.error(objResource.msgTitle, objResource.msgErrorOccured);//Modified by swatih for localization 15/7/2020
            });
            //  }
        }
        else {
            $scope.frmInv.txtReason.$dirty = true;
            //AlertMessage.warning('Palash IVF', 'Please Enter reason.');//Commentedby swatih for localization 15/7/2020
            AlertMessage.warning(objResource.msgTitle, objResource.msgPleaseEnterReason);//Modified by swatih for localization 15/7/2020
        }
    }

    $scope.Cancel = function () {
        $scope.hideMain = false;
        $scope.showProcedure = false;
        $scope.showInvestigation = false;
        $scope.showfavourite = false
        $scope.tmpRadiologyList.length = 0;
        $scope.tmpLabList.length = 0;
        $scope.SelectedServiceListLab.length = 0;
        $scope.SelectedServiceListRadiology.length = 0;
        $scope.SelectedServiceListProcedure.length = 0;
        $scope.SelectedServiceListCycle.length = 0;
        $scope.SearchParam = null;
        //$scope.Message = null;
    }

    $scope.ShowFavModal = function (item) {
        $scope.templateType = 'New';
        $scope.TemplateID = 0;
        $scope.Template = null;
        Common.clearObj();
        Common.setObj(item);
        angular.element(modFavourite).modal('show');
    }

    $scope.SetFavouriteUnsaved = function (Temp, Tid) {
        var item = Common.getObj();
        //if (angular.isUndefined(Temp)) Temp = '';
        //if (angular.isUndefined(Tid)) Tid = 0;
        //  if (angular.isNumber(item.ID) && item.ID > 0) {
        if (validateInvTemplate(Temp, Tid)) {
            item.TemplateID = Tid;
            item.Template = Temp;
            var Promise = InvestigationSrv.SetFavouriteInvestigation(item);
            Promise.then(function (resp) {
                if (resp.data == 1) {
                    $scope.Template = null;
                    angular.element(modFavourite).modal('hide');
                    //AlertMessage.success('Palash IVF', 'Add to favourite successfully.');//Commented by swatih for localization 15/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgAddtofavouritesuccessfully);//Modified by swatih for localization 15/7/2020
                }
                else if (resp.data == 3) {
                    $scope.Template = null;
                    //AlertMessage.info('Palash IVF', 'Already set as favourite for this template.');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgAlreadysetasfavouriteforthistemplate);//Modified by swatih for localization 15/7/2020
                }
                else if (resp.data == 4) {
                    //  $scope.Template = null;
                    //AlertMessage.info('Palash IVF', 'Template already exists.');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgTemplatealreadyexists);//Modified by swatih for localization 15/7/2020
                }
            }, function (error) {
            });
        }
            //else AlertMessage.info('Palash IVF', 'Define template first.');//Commented by swatih for localization 15/7/2020
        else AlertMessage.info(objResource.msgTitle, objResource.msgDefinetemplatefirst);//Modified by swatih for localization 15/7/2020


        //  }
        //else {
        //    if (item.CategoryID == 1) {
        //        var inx = 0;
        //        for (var i = 0; i < $scope.SelectedServiceListLab.length; ++i) {
        //            if ($scope.SelectedServiceListLab[i].Service == item.Service) {
        //                inx = i;
        //                break;
        //            }
        //        }
        //        //  var idx=$scope.SelectedServiceListLab.findIndex(x=>x.Service == item.Service);
        //        $scope.SelectedServiceListLab[inx].Template = Temp;
        //        $scope.SelectedServiceListLab[inx].TemplateID = Tid;
        //    }
        //    else if (item.CategoryID == 3) {
        //        var idx = 0;
        //        for (var i = 0; i < $scope.SelectedServiceListProcedure.length; ++i) {
        //            if ($scope.SelectedServiceListProcedure[i].Service == item.Service) {
        //                idx = i;
        //                break;
        //            }
        //        }
        //      //  var idx = $scope.SelectedServiceListProcedure.findIndex(x=>x.Service == item.Service);
        //        $scope.SelectedServiceListProcedure[idx].Template = Temp;
        //        $scope.SelectedServiceListProcedure[idx].TemplateID = Tid;
        //    }
        //    else if (item.CategoryID == 2 || item.CategoryID == 4) {
        //        var idx = 0;
        //        for (var i = 0; i < $scope.SelectedServiceListRadiology.length; ++i) {
        //            if ($scope.SelectedServiceListRadiology[i].Service == item.Service) {
        //                idx = i;
        //                break;
        //            }
        //        }
        //       // var idx = $scope.SelectedServiceListRadiology.findIndex(x=>x.Service == item.Service);
        //        $scope.SelectedServiceListRadiology[idx].Template = Temp;
        //        $scope.SelectedServiceListRadiology[idx].TemplateID = Tid;
        //    }
        //    else if (item.CategoryID == 4) {
        //        var idx = 0;
        //        for (var i = 0; i < $scope.SelectedServiceListCycle.length; ++i) {
        //            if ($scope.SelectedServiceListCycle[i].Service == item.Service) {
        //                idx = i;
        //                break;
        //            }
        //        }
        //     //   var idx = $scope.SelectedServiceListCycle.findIndex(x=>x.Service == item.Service);
        //        $scope.SelectedServiceListCycle[idx].Template = Temp;
        //        $scope.SelectedServiceListCycle[idx].TemplateID = Tid;
        //    }
        //    angular.element(modFavourite).modal('hide');
        //}
    }

    function validateInvTemplate(Temp, Tid) {
        if ($scope.templateType == 'New') {
            if (angular.isString(Temp) && Temp != '') {
                $scope.TemplateID = 0;
                return true
            }
            else return false;
        }
        else if ($scope.templateType == 'Existing') {
            if (Tid > 0)
                return true;
            else return false;
        }
    }

    $scope.SelectPrevInvestigation = function (item) {
        debugger;

        if (item.CategoryID == 1 || item.CategoryID == 3) {
            if (item.chkSelect) {

                if (item.PlannedDate == null) {
                    $scope.tmpLabList.push({
                        ServiceCode: item.ServiceCode, Service: item.Service, ServiceID: item.ServiceID, PlannedDate: null, Instruction: item.Instruction,
                        CategoryID: item.CategoryID, chkSelect: item.chkSelect, ArtSubTypeID: item.ArtSubTypeID, ArttypeID: item.ArttypeID
                    });
                }
                else {
                    $scope.tmpLabList.push({
                        ServiceCode: item.ServiceCode, Service: item.Service, ServiceID: item.ServiceID, PlannedDate: new Date(item.PlannedDate), Instruction: item.Instruction,
                        CategoryID: item.CategoryID, chkSelect: item.chkSelect, ArtSubTypeID: item.ArtSubTypeID, ArttypeID: item.ArttypeID
                    });
                }

            }
            else {
                var idx = 0;
                for (var i = 0; i < $scope.tmpLabList.length; ++i) {
                    if ($scope.tmpLabList[i].ServiceID == item.ServiceID) {
                        idx = i;
                        break;
                    }
                }
                $scope.tmpLabList.splice(idx, 1);
                //$scope.tmpLabList.splice($scope.tmpLabList.findIndex(z=>z.ServiceID == item.ServiceID), 1);
                item.chkSelect = false;
            }
        }

        else if (item.CategoryID == 2 || item.CategoryID == 4) {

            if (item.chkSelect) {
                if (item.PlannedDate == null) {
                    $scope.tmpRadiologyList.push({
                        ServiceCode: item.ServiceCode, Service: item.Service, ServiceID: item.ServiceID, PlannedDate: null, Instruction: item.Instruction,
                        CategoryID: item.CategoryID, chkSelect: item.chkSelect, ArtSubTypeID: item.ArtSubTypeID, ArttypeID: item.ArttypeID
                    });
                }
                else {
                    $scope.tmpRadiologyList.push({
                        ServiceCode: item.ServiceCode, Service: item.Service, ServiceID: item.ServiceID, PlannedDate: new Date(item.PlannedDate), Instruction: item.Instruction,
                        CategoryID: item.CategoryID, chkSelect: item.chkSelect, ArtSubTypeID: item.ArtSubTypeID, ArttypeID: item.ArttypeID
                    });
                }
            }
            else {
                var idx = 0;
                for (var i = 0; i < $scope.tmpRadiologyList.length; ++i) {
                    if ($scope.tmpRadiologyList[i].ServiceID == item.ServiceID) {
                        idx = i;
                        break;
                    }
                }
                $scope.tmpRadiologyList.splice(idx, 1);
                //$scope.tmpRadiologyList.splice($scope.tmpRadiologyList.findIndex(z=>z.ServiceID == item.ServiceID), 1);
                item.chkSelect = false;
            }
        }
    }

    $scope.AddPreInvestigation = function () {
        debugger;
        angular.forEach($scope.tmpLabList, function (i) {
            if (i.CategoryID == 1) {
                var idx = -1;
                for (var s = 0; s < $scope.SelectedServiceListLab.length; ++s) {
                    if ($scope.SelectedServiceListLab[s].ServiceID == i.ServiceID) {
                        idx = s;
                        break;
                    }
                }
                if (idx < 0)//$scope.SelectedServiceListLab.findIndex(w=>w.ServiceID == i.ServiceID) < 0
                {
                    $scope.SelectedServiceListLab.push(i);
                }
                else {
                    i.chkSelect = false;
                    //AlertMessage.info('Palash IVF', 'Service Already Added.');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgServicealreadyadded);//Modified by swatih for localization 15/7/2020
                }
            }

            else if (i.CategoryID == 3) {
                var idx = -1;
                for (var s = 0; s < $scope.SelectedServiceListProcedure.length; ++s) {
                    if ($scope.SelectedServiceListProcedure[s].ServiceID == i.ServiceID) {
                        idx = s;
                        break;
                    }
                }
                if (idx < 0)//$scope.SelectedServiceListProcedure.findIndex(w=>w.ServiceID == i.ServiceID)
                {
                    $scope.SelectedServiceListProcedure.push(i);
                }
                else {
                    i.chkSelect = false;
                    //AlertMessage.info('Palash IVF', 'Service Already Added.');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgServicealreadyadded);//Modified by swatih for localization 15/7/2020
                }
            }
        });
        angular.forEach($scope.tmpRadiologyList, function (j) {
            if (j.CategoryID == 2) {
                var idx = -1;
                for (var s = 0; s < $scope.SelectedServiceListRadiology.length; ++s) {
                    if ($scope.SelectedServiceListRadiology[s].ServiceID == j.ServiceID) {
                        idx = s;
                        break;
                    }
                }
                if (idx < 0) //$scope.SelectedServiceListRadiology.findIndex(x=>x.ServiceID == j.ServiceID)
                {
                    $scope.SelectedServiceListRadiology.push(j);
                }
                else {
                    j.chkSelect = false;
                    //AlertMessage.info('Palash IVF', 'Service Already Added.');//Commented by swatih for localization 15/7/2020
                    AlertMessage.info(objResource.msgTitle, objResource.msgServicealreadyadded);//Modified by swatih for localization 15/7/2020
                }
            }
            else if (j.CategoryID == 4) {
                var idx = -1;
                for (var s = 0; s < $scope.SelectedServiceListCycle.length; ++s) {
                    if ($scope.SelectedServiceListCycle[s].ServiceID == j.ServiceID) {
                        idx = s;
                        break;
                    }
                }
                if (idx < 0)//$scope.SelectedServiceListCycle.findIndex(x=>x.ServiceID == j.ServiceID)
                {
                    if (j.CategoryID == 4)
                        $scope.GetArtSubTypeList(j);
                    $scope.SelectedServiceListCycle.push(j);
                }
                //else { j.chkSelect = false; AlertMessage.info('Palash IVF', 'Service Already Added.'); }//Commented by swatih for localization 15/7/2020
                else { j.chkSelect = false; AlertMessage.info(objResource.msgTitle, objResource.msgServicealreadyadded); } //Modified by swatih for localization 15/7/2020
            }
        });
        if ($scope.tmpRadiologyList.length == 0 && $scope.tmpLabList.length == 0) {
            //AlertMessage.info("Please select atleast One to add");//Commented by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgPleaseselectatleastOnetoadd);//Modified by swatih for localization 15/7/2020
        }
    }


    $scope.IsVisitMark = function () {

        // $scope.btnSaveDisabled = false;
        if (selectPatient.GenderID == 1) {
            if (angular.isUndefined($rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.MalePatient.Selectedvisit.VisitID == 0) {
                //  $scope.btnDisabled = true;
                // $scope.Message = 'Mark visit to save Investigation.';
                angular.element(btnSaveInvestigation).prop('disabled', true);
                angular.element(btnSaveProcedure).prop('disabled', true);
                angular.element(btnSaveFavourite).prop('disabled', true);
            }
            else {
                //  $scope.Message = null;
                if ($scope.isDoctor) {
                    angular.element(btnSaveInvestigation).prop('disabled', false);
                    angular.element(btnSaveProcedure).prop('disabled', false);
                    angular.element(btnSaveFavourite).prop('disabled', false);
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            if (angular.isUndefined($rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID) || $rootScope.CoupleDetails.FemalePatient.Selectedvisit.VisitID == 0) {
                //  $scope.btnDisabled = true;
                //  $scope.Message = 'Mark visit to save Investigation.';
                angular.element(btnSaveInvestigation).prop('disabled', true);
                angular.element(btnSaveProcedure).prop('disabled', true);
                angular.element(btnSaveFavourite).prop('disabled', true);
            }
            else {
                //   $scope.Message = null;
                if ($scope.isDoctor) {
                    angular.element(btnSaveInvestigation).prop('disabled', false);
                    angular.element(btnSaveProcedure).prop('disabled', false);
                    angular.element(btnSaveFavourite).prop('disabled', false);
                }
            }
        }
    }

    // Cycle And Procedure Start

    $scope.GetArtTypeList = function () {
        var ResponseData = Common.getMasterList('M_ARTType', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            if ($rootScope.CoupleDetails.FemalePatient.PatientCategoryID == 7) {
                $scope.ARTTypeList = Response.data;
            }
            else {
                $scope.ARTTypeList = $filter('filter')(Response.data, { ID: 1 }, true);
                $scope.ARTTypeList.splice(0, 0, { ID: 0, Description: "Select" });
            }
        }, function (error) {
        });
    }

    $scope.GetArtSubTypeList = function (item) {
        debugger;
        if (item.ArttypeID == 7 || item.ArttypeID == 8) {
            item.style = 'null';
            $scope.checkDonor = true;
        }
        else {
            item.style = 'pointer-events: none;';
            $scope.checkDonor = false;
        }// to disable donor link
        var ResponseData = Common.GetArtSubTypeList(item.ArttypeID, selectCouple.FemalePatient.PatientCategoryID);
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            item.lstArtSubType = Response.data;
            //if (!$rootScope.CoupleDetails.FemalePatient.IsDonorUsed && $rootScope.CoupleDetails.FemalePatient.IsDonor) {
            //    item.lstArtSubType = $filter('filter')(item.lstArtSubType, { ID: 8 }, true);
            //    item.lstArtSubType.splice(0, 0, { ID: 0, Description: "Select" });
            //}
            debugger;
            if (angular.isDefined(item.ID)) {
                item.style = 'pointer-events: none;';
                item.styleSurrogate = 'pointer-events: none;';     //Added by Nayan Kamble
                $scope.checkDonor = true;
            }
            if (item.ArtSubTypeID == 0)
                item.ArtSubTypeID = 0;
            else item.ArtSubTypeID = item.ArtSubTypeID;
        }, function (error) {
        });
        if (item.ArttypeID == 2) {
            item.styleSurrogate = 'pointer-events: none;';    //Added by Nayan Kamble
        }
        else { 
            item.styleSurrogate = null;    //Added by Nayan Kamble
        }
    }

    $scope.GetDonorList = function (SearchParam, ArtType, SubType) {
        debugger;
        //console.log(ArtType, SubType);
        if (angular.isUndefined(SearchParam)) SearchParam = '';
        if ($scope.CurrentPage <= 0) {
            $scope.CurrentPage = 1;
        }
        var ResponseData = Common.GetActiveDonerList($scope.CurrentPage - 1, 8, SearchParam, ArtType, SubType);// 8-female donor
        ResponseData.then(function (Response) {
            $scope.DonorList = Response.data;
            if (angular.isNumber($scope.Package.DonorID) && $scope.Package.DonorID > 0) {
                var idx = -1;
                for (var s = 0; s < $scope.DonorList.length; ++s) {
                    if ($scope.DonorList[s].ID == $scope.Package.DonorID && $scope.DonorList[s].UnitID == $scope.Package.DonorUnitID) {
                        idx = s;
                        break;
                    }
                }
                //  var idx = $scope.DonorList.findIndex(z=>z.ID == $scope.Package.DonorID && z.UnitID == $scope.Package.DonorUnitID);
                if (idx > -1 && $scope.SaveLinkCount == 1)
                    $scope.DonorList[idx].Status = true;
            }
            if (Response.data.length > 0)
                $scope.TotalDonors = Response.data[0].TotalCount;
            else $scope.TotalDonors = 0;
        }, function (error) {
        });
    }

    $scope.SetPackage = function (item) {

        $scope.Package = item;
    }

    $scope.LinkDonor = function () {
        debugger;
        $scope.SaveLinkCount == 0;
        var donor = $scope.Package;
        if (donor.DonorID > 0) {
            var msg = '';
            if (angular.isDate(donor.Date))
                var diffDays = parseInt((new Date() - donor.Date) / (1000 * 60 * 60 * 24));
            if (donor.Age < 21) msg = 'Donor age is less than 21 yrs,Do you want to continue?';
            else if (donor.Age > 35) msg = 'Donor age is greater than 35 yrs,Do you want to continue?';
            else if (diffDays < 90) msg = 'The last donor linking is less than 3 months,Do you want to continue?';
            else if (donor.Count > 3) msg = 'Donor already linked 3 times,Do you want to continue?';
            if (msg != '') {
                //swal({ html: true, title: "Palash IVF", text: "<b>" + msg + "</b>", type: "info" });
                swalMessages.MessageBox("Palash IVF", msg, "info", function (isConfirmed) {
                    if (isConfirmed) {
                        if (angular.isNumber(donor.ID) && donor.ID > 0) {
                            var IDs = [];
                            IDs.push(donor.ID); IDs.push(donor.UnitID); IDs.push(donor.DonorID); IDs.push(donor.DonorUnitID);
                            var Promise = InvestigationSrv.LinkDonor(IDs);
                            Promise.then(function (resp) {
                                if (resp.data == 1) {
                                    angular.element(modDonor).modal('hide');
                                    $scope.SaveLinkCount = 1;
                                    $scope.checkDonor = false;
                                    //AlertMessage.success('Palash IVF', 'Donor linked successfully.');//Commented by swatih for localization 15/7/2020
                                    AlertMessage.success(objResource.msgTitle, objResource.msgDonorlinkedsuccessfully);//Modified by swatih for localization 15/7/2020
                                }
                            }, function (error) {
                            })
                        }
                        else {
                            angular.element(modDonor).modal('hide');
                            $scope.SaveLinkCount = 1;
                            var idx = $scope.SelectedServiceListCycle.findIndex(function (z) { return z.ServiceID == donor.ServiceID });
                            $scope.SelectedServiceListCycle[idx].DonorID = donor.DonorID;
                            $scope.SelectedServiceListCycle[idx].DonorUnitID = donor.DonorUnitID;
                            $scope.checkDonor = false;
                            $scope.SelectedServiceListCycle[idx].SaveLinkCount = 1;
                        }

                    } else {
                        var idx = 0;
                        for (var s = 0; s < $scope.DonorList.length; ++s) {
                            if ($scope.DonorList[s].Status == true) {
                                idx = s;
                                break;
                            }
                        }
                        $scope.DonorList[idx].Status = false;
                        //   $scope.DonorList[$scope.DonorList.findIndex(z=>z.Status == true)].Status = false;
                        $scope.Package.DonorID = 0;
                        $scope.Package.DonorUnitID = 0;
                    }
                });
            }
            else {
                if (angular.isNumber(donor.ID) && donor.ID > 0) {
                    var IDs = [];
                    IDs.push(donor.ID); IDs.push(donor.UnitID); IDs.push(donor.DonorID); IDs.push(donor.DonorUnitID);
                    var Promise = InvestigationSrv.LinkDonor(IDs);
                    Promise.then(function (resp) {
                        if (resp.data == 1) {
                            angular.element(modDonor).modal('hide');
                            $scope.SaveLinkCount = 1;
                            $scope.checkDonor = false;
                            //AlertMessage.success('Palash IVF', 'Donor linked successfully.');//Commented by swatih for localization 15/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgDonorlinkedsuccessfully);//Modified by swatih for localization 15/7/2020
                        }
                    }, function (error) {
                    })
                }
                else {
                    debugger;
                    angular.element(modDonor).modal('hide');
                    $scope.SaveLinkCount = 1;
                    var idx = $scope.SelectedServiceListCycle.findIndex(function (z) { return z.ServiceID == donor.ServiceID });
                    $scope.SelectedServiceListCycle[idx].DonorID = donor.DonorID;
                    $scope.SelectedServiceListCycle[idx].SaveLinkCount = 1;
                    $scope.SelectedServiceListCycle[idx].DonorUnitID = donor.DonorUnitID;
                    $scope.checkDonor = false;
                }
            }
        }
        //else AlertMessage.info('Palash IVF', 'Select Donor.');//Commented by swatih for localization 15/7/2020
        else AlertMessage.info(objResource.msgTitle, objResource.msgSelectDonor);//Modified by swatih for localization 15/7/2020
        $scope.CurrentPage = 0;
    }

    $scope.SelectDonor = function (i) {
        debugger;

        if (((parseInt(i.RemainingOcytes) > 0 || parseInt(i.RemainingEmbriyo) > 0 || parseInt(i.CrayoEmbriyo) > 0 || parseInt(i.CrayoOcyte) > 0) && parseInt(i.OcyteRetrived) > 0) || (parseInt(i.RemainingOcytes) == 0 && parseInt(i.RemainingEmbriyo) == 0 && parseInt(i.OcyteRetrived) == 0)) {


        }
        else {

            i.Status = false;
            //AlertMessage.info('Palash IVF', 'Check Remaining Embryo or Oocyte..');//Commented by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgCheckRemainingEmbryoorOocyte);//Modified by swatih for localization 15/7/2020
            return;
        }
        //if ($scope.SelectedSubType == 18 || $scope.SelectedSubType == 28)
        //{
        //    if(parseInt(i.CrayoOcyte)=0)
        //    {
        //        AlertMessage.info('Palash IVF', 'Crayo Oocyte not available of this Donor ..');
        //        return;
        //    }
        //}
        //if ($scope.SelectedSubType == 20 || $scope.SelectedSubType == 30) {
        //    if (parseInt(i.CrayoEmbriyo) = 0) {
        //        AlertMessage.info('Palash IVF', 'Crayo Embriyo not available of this Donor ..');
        //        return;
        //    }
        //}

        $scope.DonorList.forEach(function (x) { if (x.ID != i.ID && x.Status == true) x.Status = false; })
        var idxSel = -1;
        for (var s = 0; s < $scope.DonorList.length; ++s) {
            if ($scope.DonorList[s].Status == true) {
                idxSel = s;
                break;
            }
        }
        if (idxSel != -1) {
            $scope.DonorList[idxSel].Status = false;
        }
        //  $scope.DonorList[$scope.DonorList.findIndex(z=>z.Status == true)].Status = false;
        //if (!i.IsDonorUsed) {
        var idx = -1;
        for (var s = 0; s < $scope.DonorList.length; ++s) {
            if ($scope.DonorList[s].ID == i.ID) {
                idx = s;
                break;
            }
        }
        //  var idx = $scope.DonorList.findIndex(z=>z.ID == i.ID);
        $scope.DonorList[idx].Status = true;
        $scope.Package.DonorID = $scope.DonorList[idx].ID;
        $scope.Package.DonorUnitID = $scope.DonorList[idx].UnitID;
        $scope.Package.Age = $scope.DonorList[idx].Age;
        $scope.Package.Date = new Date($scope.DonorList[idx].Date);
        $scope.Package.Count = new Date($scope.DonorList[idx].VisitID);
        $scope.Package.IsDonorUsed = $scope.DonorList[idx].IsDonorUsed;
        //}
        //else {
        //    i.Status = false;
        //    AlertMessage.info('Palash IVF', 'Donor already linked to other patient.');
        //}
    }

    // Cycle And Procedure End
    // Favourite Start
    $scope.favSelectedService = function (selSer) {
        debugger;
        $scope.setFavList.push({
            ServiceID: selSer.Id,
            ServiceCode: selSer.ServiceCode,
            Service: selSer.Description,
            Category: selSer.Category,
            CategoryID: selSer.CategoryID
            
            
        });
        selSer.id = 0;
        selSer.ServiceCode = '';
        selSer.Description = '';
        selSer.ServiceCodeDesc = '';
        selSer.CategoryID = 0
        
    }

    $scope.DeleteFavourite = function (item, idx) {
        debugger;

        if (angular.isNumber(item.ID) && item.ID > 0) {
            Common.clearObj();
            Common.setObj(item);
            angular.element(reasonModel).modal('show');
        }
        else {
            $scope.setFavList.splice(idx, 1)
            var idx = 0;
            for (var s = 0; s < $scope.favouriteList.length; ++s) {
                if ($scope.favouriteList[s].TemplateID == item.TemplateID) {
                    idx = s;
                    break;
                }
            }
            //   var idx = $scope.favouriteList.findIndex(z=>z.TemplateID == item.TemplateID);
            if (idx >= 0) {
                $scope.favouriteList[idx].chkTemplate = false;
                var idxx = 0;
                for (var s = 0; s < tmpFavouriteList.length; ++s) {
                    if (tmpFavouriteList[s].Service == item.Service) {
                        idxx = s;
                        break;
                    }
                }
                tmpFavouriteList.splice(idxx, 1);
                //  tmpFavouriteList.splice(tmpFavouriteList.findIndex(z=>z.Service == item.Service), 1);
                var idxser = 0;
                for (var s = 0; s < $scope.favouriteList[idx].lstService.length; ++s) {
                    if ($scope.favouriteList[idx].lstService[s].Description == item.Service) {
                        idxser = s;
                        break;
                    }
                }
                $scope.favouriteList[idx].lstService[idxser].chkService = false;
                // $scope.favouriteList[idx].lstService[$scope.favouriteList[idx].lstService.findIndex(z=>z.Description == item.Service)].chkService = false;
            }
        }
    }

    $scope.ddlCategoryList = [{ CategoryID: 0, Category: 'Select' }, { CategoryID: 1, Category: 'Laboratory' }, { CategoryID: 2, Category: 'Radiology' }, { CategoryID: 3, Category: 'Procedure' },
                              { CategoryID: 4, Category: 'Cycle' }]
    $scope.AddFavEmptyRow = function () {
        $scope.setFavList.push({
            CategoryID: $scope.ddlCategoryList[0].CategoryID,
            ServiceID: 0,
            ServiceCode: '',
            Service: '',
            Category: '',

        });
    }

    $scope.SaveFavourite = function () {
        debugger;
        if ($scope.setFavList.length > 0) {
            if (validateTemplate()) {
                if (validateInput()) {
                    $scope.setFavList[0].Template = $scope.Template;
                    //    if (!angular.isNumber($scope.TemplateID)) $scope.TemplateID = 0;
                    $scope.setFavList[0].TemplateID = $scope.TemplateID;
                    var Promise = InvestigationSrv.SaveFavourite($scope.setFavList);
                    Promise.then(function (resp) {
                        if (resp.data == 1) {
                            $scope.GetFavouriteList('');
                            //AlertMessage.success('Palash IVF', 'Record saved successfully.');//Commented by swatih for localization 15/7/2020
                            AlertMessage.success(objResource.msgTitle, objResource.msgSave);//Modified by swatih for localization 15/7/2020
                            $scope.setFavList.length = 0;
                            $scope.Template = '';
                            $scope.TemplateID = 0;
                        }
                        if (resp.data == 4) {
                            //AlertMessage.info('Palash IVF', 'Template already exist please select existing template.');//Commented by swatih for localization 15/7/2020
                            AlertMessage.info(objResource.msgTitle, objResource.msgTemplatealreadyexistpleaseselectexistingtemplate);//Modified by swatih for localization 15/7/2020
                        }
                    }, function (error) {

                    })
                }

            }
            //else AlertMessage.info('Palash IVF', 'Define template.');//Commented by swatih for localization 15/7/2020
            else AlertMessage.info(objResource.msgTitle, objResource.msgDefinetemplate);//Modified by swatih for localization 15/7/2020
        }
        else {
            //AlertMessage.info('Palash IVF', 'Select atleast one service.');//Commented by swatih for localization 15/7/2020
            AlertMessage.info(objResource.msgTitle, objResource.msgSelectatleastoneservice);//Modified by swatih for localization 15/7/2020
            return false;
        }
    }

    function validateInput() {
        debugger;
        for (var i = 0; i < $scope.setFavList.length; i++) {
            if ($scope.setFavList[i].CategoryID == 0) {
                //AlertMessage.info('Palash IVF', 'Please Select Category.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgPleaseSelectCategory);//Modified by swatih for localization 15/7/2020
                return false
            }
            else if ($scope.setFavList[i].Service == '' || $scope.setFavList[i].Service == null) {
                //AlertMessage.info('Palash IVF', 'Please Enter Service Name.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.msgPleaseEnterServiceName);//Modified by swatih for localization 15/7/2020
                return false
            }
        }
        return true;
    }

    function validateTemplate() {
        if ($scope.FavType == 5) {
            if (angular.isString($scope.Template) && $scope.Template != '') {
                $scope.TemplateID = 0;
                return true
            }
            else return false;
        }
        else if ($scope.FavType == 6) {
            if ($scope.TemplateID > 0)
                return true;
            else return false;
        }
    }

    $scope.GetTemplateList = function () {
        var ResponseData = Common.getMasterList('M_Investigation_Template', 'ID', 'Template');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.TemplateList = Response.data;
            //if ($scope.TemplateID > 0) {
            //    $scope.templateType = 'Existing';
            //}
            //else {
            //    $scope.templateType = 'New';
            $scope.TemplateID = 0;
            //}
        }, function (error) {
        });
    }

    $scope.GetFavouriteList = function (param) {
        debugger;
        //if ($rootScope.Breadcrum[$rootScope.Breadcrum.length - 1].Title == 'Procedures')
        //    $rootScope.Breadcrum.pop();
        //$rootScope.Breadcrum.push({ Title: 'Favourite', Path: $location.path() });
        $scope.IsVisitMark();

        if (angular.isUndefined(param) || param == null) param = '';
        $scope.IsSecondResponse = false;
        usSpinnerService.spin('GridSpinner');
        var Promise = InvestigationSrv.GetFavouriteList($scope.CurrentPage - 1, param);
        Promise.then(function (resp) {
            debugger;

            if (resp.data.lsttmp != null && resp.data.lsttmp.length > 0) {
                $scope.TotalItems = resp.data.lsttmp[0].TotalCount;    //Added by Nayan Kamble on 26/11/2019
            }
            else {
                $scope.TotalItems = 0;
            }
            $scope.IsSecondResponse = true;
            $scope.GetAllResponseSecond();

            angular.forEach(resp.data.lsttmp, function (i) {
                debugger;
                i.lstService = $filter('filter')(resp.data.lstService, { TempID: i.TemplateID }, true);
                if (tmpFavouriteList.length > 0) {
                    i.lstService.forEach(function (ser) {
                        tmpFavouriteList.forEach(function (tmpSer) {
                            if ((ser.TempID == tmpSer.TemplateID) && ser.Description == tmpSer.Service) {
                                ser.chkService = true;
                            }
                        })
                    })
                    //angular.forEach(i.lstService, function (j) {
                    //    if (j.chkService == true && j.TempID == i.TemplateID)
                    //})
                    var tmpCheck = false;
                    for (var s = 0; s < i.lstService.length; ++s) {
                        if (i.lstService[s].chkService == true && i.lstService[s].TempID == i.TemplateID) {
                            tmpCheck = true;
                        }
                        else {
                            tmpCheck = false;
                            break;
                        }
                    }
                    if (tmpCheck) i.chkTemplate = true;
                    // if (i.lstService.every(x=>x.chkService == true && x.TempID == i.TemplateID)) i.chkTemplate = true;
                }
            })
            $scope.favouriteList = resp.data.lsttmp;
        }, function (error) {
            $scope.IsSecondResponse = true;
            $scope.GetAllResponseSecond();
        })
    }

    $scope.chkTemplate = function (temp) {
        debugger;
        if (temp.chkTemplate) {
            //$scope.CollapseIn = " in";
            temp.lstService.forEach(function (x) { x.chkService = true });
            angular.forEach(temp.lstService, function (item) {
                debugger;
                tmpFavouriteListToHold.push({
                    ServiceID: item.Id, Category: item.Category, CategoryID: item.CategoryID, ServiceCode: item.ServiceCode,
                    Service: item.Description, TemplateID: temp.TemplateID,PlannedDate:new Date() //Added by sujata for fav
                });
            });
        }
        else {
            //$scope.CollapseIn = 'in';
            temp.lstService.forEach(function (y) { y.chkService = false });
            angular.forEach(tmpFavouriteListToHold, function (item) {
                if (item.TemplateID == temp.TemplateID)
                    tmpFavouriteListToHold.splice(item);
            });
        }
    }

    $scope.fnchkService = function (temp, service) {
        debugger;
        var idx = 0;
        for (var s = 0; s < temp.lstService.length; ++s) {
            if (temp.lstService[s].Description == service.Description) {
                idx = s;
                break;
            }
        }
        // var idx = temp.lstService.findIndex(z=>z.Description == service.Description);
        if (service.chkService) {
            temp.lstService[idx].chkService = true;
            var idxx = -1;
            for (var s = 0; s < tmpFavouriteListToHold.length; ++s) {
                if (tmpFavouriteListToHold[s].Service == service.Description) {
                    idxx = s;
                    break;
                }
            }
            if (idxx == -1)//tmpFavouriteListToHold.findIndex(z=>z.Service == service.Description)
            {
                tmpFavouriteListToHold.push({
                    ServiceID: service.Id, Category: service.Category, CategoryID: service.CategoryID, ServiceCode: service.ServiceCode,
                    Service: service.Description, TemplateID: temp.TemplateID
                });
            }
            var chkTemplate = false;
            for (var s = 0; s < temp.lstService.length; ++s) {
                if (temp.lstService[s].chkService == true) {
                    chkTemplate = true;
                }
                else {
                    chkTemplate = false;
                    break;
                }
            }
            if (chkTemplate)//temp.lstService.every(x=>x.chkService == true)
            {
                temp.chkTemplate = true;
            }
        }
        else {
            temp.lstService[idx].chkService = false;
            var idxx = -1;
            for (var s = 0; s < tmpFavouriteListToHold.length; ++s) {
                if (tmpFavouriteListToHold[s].Service == service.Description) {
                    idxx = s;
                    break;
                }
            }
            tmpFavouriteListToHold.splice(idxx, 1);
            //tmpFavouriteListToHold.splice(tmpFavouriteListToHold.findIndex(z=>z.Service == service.Description), 1);
            var chkTemplate = false;
            for (var s = 0; s < temp.lstService.length; ++s) {
                if (temp.lstService[s].chkService == true) {
                    chkTemplate = true;
                }
                else {
                    chkTemplate = false;
                    break;
                }
            }
            if (!chkTemplate)//temp.lstService.some(x=>x.chkService == false)
            {
                temp.chkTemplate = false;
            }
        }


    }

    $scope.AddPreviousFavourite = function () {
        debugger;
        tmpFavouriteList = [];
        tmpFavouriteListToHold = [];
       
        //added by sujata for fav inv 23-may-2019
        angular.forEach($scope.favouriteList, function (item1) {
            angular.forEach(item1.lstService, function (item) {
                if (item.chkService === true) {
                    tmpFavouriteListToHold.push(item);
                }
            });
        });

       
       
           
        angular.forEach(tmpFavouriteListToHold, function (item) {
            tmpFavouriteList.push({
                ServiceID: item.ServiceID, Category: item.Category, CategoryID: item.CategoryID, ServiceCode: item.ServiceCode,
                Service: item.Description, TemplateID: item.TemplateID, PlannedDate: new Date() //added by sujata for fav
            });
        });
        if (tmpFavouriteList.some(function (z) {
if (z.CategoryID == 1 || z.CategoryID == 2) { $scope.CatID = z.CategoryID; return true; }
        })) {//z=>(z.CategoryID == 1 || z.CategoryID == 2)
            $scope.showInvestigation = true; $scope.showProcedure = false; $scope.showfavourite = false; $scope.hideMain = true;// $scope.CatID = 1;

           
            $scope.GetCatwiseServiceList(1); $scope.GetTodaysInvestigation($scope.CatID); $scope.GetPreviousInvestigation($scope.CatID, $scope.SearchParam);

        }
        else if (tmpFavouriteList.some(function (z) {
    if (z.CategoryID == 3 || z.CategoryID == 4) { $scope.CatID = z.CategoryID; return true; }
        })) {
            angular.forEach(tmpFavouriteList, function (item) {
                if (item.CategoryID == 4) {
                    $scope.CatID = 4;
                }
            });
            if ($scope.CatID == 4 && !selectCouple.FemalePatient.IsCloseCycle) {
                //AlertMessage.info('Palash IVF', 'Close existing cycle first.');//Commented by swatih for localization 15/7/2020
                AlertMessage.info(objResource.msgTitle, objResource.nsgCloseexistingcyclefirst);//Modified by swatih for localization 15/7/2020
            }
            else {
                $scope.showProcedure = true; $scope.showInvestigation = false; $scope.showfavourite = false; $scope.hideMain = true; $scope.GetCatwiseServiceList(3);
                $scope.GetArtTypeList(); $scope.GetTodaysInvestigation($scope.CatID); $scope.GetPreviousInvestigation($scope.CatID, $scope.SearchParam);

            }
        }
        tmpFavouriteListToHold.length = 0;
        // AlertMessage.success('Palash IVF', 'Selected favourites added successfully.');
    }

    // Favourite End
    //if (!angular.equals({}, objDashboard)) {//&& (!!obj.InvIsFromDashboard || !!obj.ProIsFromDashboard)
    //    FromDashboard();
    //}

    /*$scope.FromDashboard = function FromDashboard() {
        debugger;
        if (!angular.equals({}, objDashboard) && (!!objDashboard.InvIsFromDashboard || !!objDashboard.ProIsFromDashboard)) {
            if (objDashboard.InvIsFromDashboard == true) {
                $scope.showInvestigation = true; $scope.showProcedure = false; $scope.showfavourite = false; $scope.hideMain = true; $scope.CatID = 1;
                $scope.GetCatwiseServiceList(1); $scope.GetTodaysInvestigation($scope.CatID); $scope.GetPreviousInvestigation($scope.CatID, $scope.SearchParam);
            }
            else if (objDashboard.ProIsFromDashboard == true) {
                $scope.showProcedure = true; $scope.CatID = 3; $scope.showInvestigation = false; $scope.showfavourite = false; $scope.hideMain = true; $scope.GetCatwiseServiceList(3);
                $scope.GetArtTypeList(); $scope.GetTodaysInvestigation($scope.CatID); $scope.GetPreviousInvestigation($scope.CatID, $scope.SearchParam);
            }
            Common.clearObj();
        }
    }*/

    $scope.btnClick = function () {

        // if (selectPatient.PatientCategoryID == 7) {
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

            selectPatient.PatientCategoryID = 7;
            //   $scope.selectPatient.GenderID = selectPatient.GenderID;
            Common.setSelectedPatient(selectPatient);
            Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                if ($scope.CatID == 1 || $scope.CatID == 2) {
                    $scope.GetTodaysInvestigation($scope.CatID); $scope.GetPreviousInvestigation($scope.CatID, $scope.SearchParam);
                    $scope.btnText = 'Male Investigations';
                    $rootScope.FormName = 'Investigations'
                }
                else if ($scope.CatID == 3 || $scope.CatID == 4) {
                    $scope.GetTodaysInvestigation($scope.CatID); $scope.GetPreviousInvestigation($scope.CatID, $scope.SearchParam);
                    $scope.btnText = 'Male Procedure';
                    $rootScope.FormName = 'Investigations'
                }
                /* Common.GetGlobalData().then(function (resp) {
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
            })

            //   $scope.Str = 'UploadReport/';
            if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
            }
            //else
            //    $location.path($scope.Str);

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

            selectPatient.PatientCategoryID = 7;
            //    $scope.selectPatient.GenderID = selectPatient.GenderID;
            Common.setSelectedPatient(selectPatient);
            Common.SetSelectedPatientInAPI(selectPatient).then(function () {
                if ($scope.CatID == 1 || $scope.CatID == 2) {
                    $scope.GetTodaysInvestigation($scope.CatID); $scope.GetPreviousInvestigation($scope.CatID, $scope.SearchParam);
                    $scope.btnText = 'Female Investigations';
                    $rootScope.FormName = 'Investigations'
                }
                else if ($scope.CatID == 3 || $scope.CatID == 4) {
                    $scope.GetTodaysInvestigation($scope.CatID); $scope.GetPreviousInvestigation($scope.CatID, $scope.SearchParam);
                    $scope.btnText = 'Female Procedure';
                    $rootScope.FormName = 'Investigations'
                }
                //Common.GetGlobalData().then(function (resp) {
                //    $rootScope.Allergies = resp.data;

                //});
                if ($rootScope.CoupleDetails.MalePatient.Allergies != "" && $rootScope.CoupleDetails.MalePatient.Allergies != null)
                    $rootScope.Allergies = $rootScope.CoupleDetails.MalePatient.Allergies;
                else {
                    $rootScope.Allergies = '';
                }
                if ($rootScope.Allergies.includes('null')) {
                    $rootScope.Allergies = '';
                }
                //if ($rootScope.CoupleDetails.MalePatient.AllergiesFood != "" && $rootScope.CoupleDetails.MalePatient.AllergiesFood != null) {
                //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesFood;
                //}
                //if ($rootScope.CoupleDetails.MalePatient.AllergiesOthers != "" && $rootScope.CoupleDetails.MalePatient.AllergiesOthers != null) {
                //    $rootScope.Allergies += ', ' + $rootScope.CoupleDetails.MalePatient.AllergiesOthers;
                //}
            })

            // $scope.Str = 'UploadReport/';
            if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
            }
            //else
            //    $location.path($scope.Str);
        }
        // }
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
                                        angular.element(btnSaveInvestigation).prop('disabled', false);
                                        angular.element(btnSaveProcedure).prop('disabled', false);
                                        angular.element(btnSaveFavourite).prop('disabled', false);
                                        //       $location.path(Redirectto);
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
                                        angular.element(btnSaveInvestigation).prop('disabled', false);
                                        angular.element(btnSaveProcedure).prop('disabled', false);
                                        angular.element(btnSaveFavourite).prop('disabled', false);
                                        //        $location.path(Redirectto);
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
                                    angular.element(btnSaveInvestigation).prop('disabled', false);
                                    angular.element(btnSaveProcedure).prop('disabled', false);
                                    angular.element(btnSaveFavourite).prop('disabled', false);
                                    //     $location.path(Redirectto);
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
                                    angular.element(btnSaveInvestigation).prop('disabled', false);
                                    angular.element(btnSaveProcedure).prop('disabled', false);
                                    angular.element(btnSaveFavourite).prop('disabled', false);
                                    //       $location.path(Redirectto);
                                }
                            });
                        }
                    }
                }
                //else {
                //    //alert("There is no active visit");
                //    $location.path(Redirectto);
                //}
            });
        }
    }

    //$scope.ClickInvestigation = function (value) {
    //    debugger;
    //    if (value == 1) {
    //        $scope.CatID = 1;          
    //    }
    //    else if (value == 2) {
    //        $scope.CatID = 2;          
    //    }
    //    else if (value == 3) {
    //        $scope.CatID = 3;          
    //    }
    //    else if (value == 4) {
    //        $scope.CatID = 4;           
    //    }
    //}
});

//$scope.valid = function (inputField) {
//    
//        var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField);
//        return isValid;

//}