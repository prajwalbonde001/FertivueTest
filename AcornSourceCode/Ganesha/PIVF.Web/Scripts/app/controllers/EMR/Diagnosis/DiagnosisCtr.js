
'use strict';
angular.module('PIVF').controller('DiagnosisCtr', function ($scope, $location, $rootScope, $uibModal, DiagnosisSrv, AlertMessage, srvCommon, $uibModalStack, Common, swalMessages, $filter, usSpinnerService,localStorageService) {

    //Data Members
    $rootScope.FormName = 'Diagnosis';
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    usSpinnerService.spin('GridSpinner');
    $scope.OtherDiagnosis = {};
    $scope.ListOtherDiagnosis = [];
    $scope.ListDiagnosis = [];
    $scope.ListFavouriteDiagnosis = [];
    $scope.ListPatientDiagnosis = [];
    $scope.DiagnosisType = [];
    $scope.Diagnosis = "";
    var objResource = {};
    $scope.PatientItemToBeRemove = {};
    $scope.ItemToBeRemove = {};
    $scope.FavItemToBeRemove = {};
    $scope.DeleteReason = "";
    $scope.Reason = "";
    $scope.PDataReason = "";
    $scope.ICDDetails = {};
    $scope.OtherDetails = {};
    $scope.FavouriteDetails = {};
    $scope.SelectedDiagnosis = [];
    $scope.FirstResponse = false;
    $scope.SecondResponse = false;
    $scope.isDefaultCalled = false;
    $scope.isDoctor = localStorageService.get("UserInfo").IsDoctor;
    //selected patient set 
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();
    //
    /*navigation btn text on selected patient*/
    if (selectPatient.GenderID == 1)
        $scope.btnText = 'Female Diagnosis';
    else if (selectPatient.GenderID == 2)
        $scope.btnText = 'Male Diagnosis';
    /*--*/
    //to set msg
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //for paging================================================================
    $scope.maxSize = 5;
    $scope.CurrentPage = 1;
    $scope.FevCurrentPage = 1;
    $scope.OtherCurrentPage = 1;
    $scope.PageChange = function PageChange(value) {
        if (value == 1) {
            $scope.FillDiagnosis();
        }
        else if (value == 3) {
            $scope.FillFavouriteDiagnosis();
        }
        else if (value == 2) {
            $scope.FillOtherDiagnosis();
        }
    }
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
    //MembersFunctions
    $scope.PageSetup = function PageSetup() {

        if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined))
            $scope.IsVisitMarked = true;
        else
            $scope.IsVisitMarked = false;
        $scope.FillDiagnosis();
        $scope.FillOtherDiagnosis();
        $scope.FillFavouriteDiagnosis();
        $scope.FillDiagnosisType();
        $scope.GetPatientDiagnosis();
        $scope.GetUserrights();
    }

    $scope.SavePatientDiagnosis = function (ListDiagnosis) {

        $scope.ListDiagnosis1 = $filter('filter')(ListDiagnosis, function (d) { return d.IsSelected == true });
        $scope.ListDiagnosisttype = $filter('filter')($scope.ListDiagnosis1, function (d) { return d.DiagnosisTypeID == 0 });
        if ($scope.ListDiagnosis1.length > 0) {
            debugger;
            if ($scope.ListDiagnosisttype == 0) {
                var IsSame = true;
                var ii = $scope.ListPatientDiagnosis.length - 1;
                for (ii; ii >= 0; ii--) {
                    var jj = $scope.ListDiagnosis1.length - 1;
                    for (jj; jj >= 0; jj--) {
                        if (($scope.ListPatientDiagnosis[ii].Code == $scope.ListDiagnosis1[jj].Code)&&
                          ($scope.ListPatientDiagnosis[ii].DiagnosisType == $scope.DiagnosisType[$scope.ListDiagnosis1[jj].DiagnosisTypeID].Description))
                      
                        {
                            IsSame = false;
                            break;
                        }
                    }
                    if (!IsSame) {
                        break;
                    }
                }
              
         if (IsSame) {
                    
                var ResponseData = DiagnosisSrv.CheckIfDiagnosisAddedToPatient($scope.ListDiagnosis1);
                ResponseData.then(function (Response) {
                    debugger;
                    if (Response.data != null) {
                        if (Response.data == 1) {
                            //swalMessages.MessageBox('PalashIVF', "Diagnosis Already Added To Patient ,Do You Want To Continue?", "warning", function (isConfirmed) { //Commented by swatih for localization on 14/7/2020
                            swalMessages.MessageBox(objResource.msgTitle, objResource.msgDiagnosisAlreadyAddedToPatientDoYouWantToContinue, "warning", function (isConfirmed) {//Modified by swatih for localization on 14/7/2020
                                if (isConfirmed) {
                                    $scope.Save(ListDiagnosis);
                                }
                            });
                            //added by neena
                            $scope.FillDiagnosis();
                            $scope.FillOtherDiagnosis();
                            //
                        }
                        else if (Response.data == 2) {
                           
                            //AlertMessage.success("Diagnosis Already Added");//Commented by swatih for localization on 14/7/2020
                            AlertMessage.success(objResource.msgDiagnosisAlreadyAdded);//Modified by swatih for localization on 14/7/2020
                           
                            //added by neena
                            $scope.FillDiagnosis();
                            $scope.FillOtherDiagnosis();
                            //
                        }
                        else if (Response.data == 0) {

                              $scope.Save(ListDiagnosis);
                            
                            //added by neena
                            $scope.FillDiagnosis();
                            $scope.FillOtherDiagnosis();
                            //
                        }
                        else if (Response.data == 3) {
                            //AlertMessage.success("Error Occured While Adding Details");//Commented by swatih for localization on 14/7/2020
                            AlertMessage.success(objResource.msgErrorOccuredWhileAddingDetails);//Modified by swatih for localization on 14/7/2020
                        }
                    }
                }, function (error) {
                    $scope.Error = error;
                });
                }
                else {
             //AlertMessage.warning("You have selected duplicate Diagnosis");//Commented by swatih for localization on 14/7/2020
             AlertMessage.warning(objResource.msgYouhaveselectedduplicateDiagnosis);//Modified by swatih for localization on 14/7/2020
                   
                }
            }
            else {
                // AlertMessage.success("Select Diagnosis Type For All Selected Diagnosis");//Commented by swatih for localization on 14/7/2020
                AlertMessage.success(objResource.msgSelectDiagnosisTypeForAllSelectedDiagnosis);//Modified by swatih for localization on 14/7/2020
            }
        }
        else {
            //AlertMessage.success("Select Atleast One Diagnosis To Save");//Commented by swatih for localization on 14/7/2020
            AlertMessage.success(objResource.msgSelectAtleastOneDiagnosisToSave);//Modified by swatih for localization on 14/7/2020
        }
    }
    $scope.Save = function Save(ListDiagnosis) {
        var ResponseData = DiagnosisSrv.SavePatientDiagnosis(ListDiagnosis);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                $scope.ListDiagnosis.forEach(function (x) { x.IsSelected = false; });
                $scope.ListOtherDiagnosis.forEach(function (x) { x.IsSelected = false; });
                $scope.ListFavouriteDiagnosis.forEach(function (x) { x.IsSelected = false; });
                $scope.GetPatientDiagnosis();
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.SaveOtherDiagnosis = function SaveOtherDiagnosis() {
        debugger;
        if ($scope.frmDiagnosis.Code.$valid && $scope.frmDiagnosis.Diagnosis.$valid) {
            var ResponseData = DiagnosisSrv.SaveOtherDiagnosis($scope.OtherDiagnosis);
            ResponseData.then(function (Response) {
                debugger;
                if (Response.data != null) {
                    if (Response.data == 1){
                        angular.element(myModal).modal('hide');
                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                        $scope.OtherDiagnosis = {};
                        // $scope.GetPatientDiagnosis();
                        $scope.FillOtherDiagnosis();
                    }
                    else if (Response.data == 2) {
                        //AlertMessage.success("Code already exists");//Commented by swatih for localization on 14/7/2020
                        AlertMessage.success(objResource.msgCodealreadyexists);//Modified by swatih for localization on 14/7/2020
                    }
                    else if (Response.data == 3) {
                        //AlertMessage.success("Description already exists");//Commented by swatih for localization on 14/7/2020
                        AlertMessage.success(objResource.msgDescriptionalreadyexists);//Modified by swatih for localization on 14/7/2020
                    }
                }
            }, function (error) {
                $scope.Error = error;
            });
        }
        else {
            $scope.frmDiagnosis.Code.$dirty = true;
            $scope.frmDiagnosis.Diagnosis.$dirty = true;
        }
    }
    $scope.SetFavourite = function SetFavourite(item, IsFav) {

        item.IsFavourite = IsFav;
        var ResponseData = DiagnosisSrv.SetFavourite(item)
        ResponseData.then(function (Response) {
            if (Response.data != null) {

                if (Response.data > 0) {
                    if (IsFav == 0)
                       // AlertMessage.success("Diagnosis is removed from the Favourite List");//Commented by swatih for localization on 14/7/2020
                        AlertMessage.success(objResource.msgDiagnosisisremovedfromtheFavouriteList);//Modified by swatih for localization on 14/7/2020
                    else if (IsFav == 1)
                        //AlertMessage.success("Diagnosis is added in the Favourite List");//Commented by swatih for localization on 14/7/2020
                        AlertMessage.success(objResource.msgDiagnosisisaddedintheFavouriteList);//Modified by swatih for localization on 14/7/2020
                }

                $scope.GetPatientDiagnosis();
            }
        }, function (error) { });
    }
    $scope.SetValue = function SetValue(item) {

        $scope.ItemToBeRemove = item;
        angular.element(DeleteOtherDiagnosis1).modal('show')
    }
    $scope.SetFavValue = function SetFavValue(item) {

        $scope.FavItemToBeRemove = item;
        angular.element(DeleteFavModel).modal('show')
    }
    $scope.SetPatientValue = function SetPatientValue(item) {
        $scope.PatientItemToBeRemove = item;
        angular.element(DeletePatient).modal('show')
    }
    $scope.TabChange = function TabChange(Value) {
        debugger;
        $scope.isDefaultCalled = false;
        if (Value == 1) {
            $scope.Diagnosis = "";
            $scope.FillDiagnosis();
        }
        else if (Value == 2) {
            $scope.search = {};
            $scope.search.SearchColumns = "";
            $scope.FillOtherDiagnosis();
        }
        else if (Value == 3) {
            $scope.search1 = {};
            $scope.search1.SearchColumns = "";
            $scope.FillFavouriteDiagnosis();
        }
    }
    $scope.AddNewOtherDiagnosis = function AddNewOtherDiagnosis()   //popup after new click 
    {
        angular.element(myModal).modal('show');
    }
    $scope.DeleteOtherDiagnosis = function DeleteOtherDiagnosis() {

        if ($scope.frmDiagnosis.DeleteReason.$valid) {
            if ($scope.ItemToBeRemove != null) {
                var ResponseData = DiagnosisSrv.DeleteOtherDiagnosis($scope.ItemToBeRemove.ID, $scope.ItemToBeRemove.UnitID, $scope.ItemToBeRemove.IsOther, $scope.DeleteReason)
                ResponseData.then(function (Response) {
                    if (Response.data != null) {
                        $scope.FillOtherDiagnosis();
                        angular.element(DeleteOtherDiagnosis1).modal('hide');
                        //AlertMessage.success("Diagnosis Deleted successfully");//Commented by swatih for localization on 14/7/2020
                        AlertMessage.success(objResource.msgDiagnosisDeletedsuccessfully);//Modified by swatih for localization on 14/7/2020
                        $scope.ItemToBeRemove = {};
                        $scope.DeleteReason = "";
                        $scope.GetPatientDiagnosis();
                    }
                }, function (error) { });
            }
        }
        else {
            $scope.frmDiagnosis.DeleteReason.$dirty = true;
        }
    }
    $scope.RemoveFavourite = function RemoveFavourite() {

        if ($scope.frmDiagnosis.Reason.$valid)
        {

            if ($scope.FavItemToBeRemove != null) {
                var ResponseData = DiagnosisSrv.RemoveFavourite($scope.FavItemToBeRemove.ID, $scope.FavItemToBeRemove.UnitID, $scope.FavItemToBeRemove.IsOther, $scope.Reason)
                ResponseData.then(function (Response) {
                    if (Response.data != null) {

                        angular.element(DeleteFavModel).modal('hide');
                        //AlertMessage.success("Favourite Diagnosis Deleted Successfuly");//Commented by swatih for localization on 14/7/2020
                        AlertMessage.success(objResource.msgFavouriteDiagnosisDeletedSuccessfuly);//Modified by swatih for localization on 14/7/2020
                        $scope.FavItemToBeRemove = {};
                        $scope.Reason = "";
                        $scope.FillFavouriteDiagnosis();
                    }
                }, function (error) { });
            }
        }
        else {
            $scope.frmDiagnosis.Reason.$dirty = true;
        }
    }
    $scope.CancelNewOther = function CancelNewOther() {
        $scope.OtherDiagnosis = {};
    }
    $scope.CancelDeleteOther = function CancelDeleteOther() {
        $scope.DeleteReason = "";
    }
    $scope.CancelFav = function CancelFav() {
        $scope.FavItemToBeRemove = {};
    }
    $scope.CancelPatient = function CancelPatient() {
        //added by neena
        debugger;
        $scope.PDataReason = "";
        //
        $scope.PatientItemToBeRemove = {};
    }
    $scope.GetAllResponse = function () {

        if ($scope.FirstResponse == true && $scope.SecondResponse == true && $scope.isDefaultCalled == true) {
            usSpinnerService.stop('GridSpinner');
        }
    };
    $scope.FillDiagnosis = function FillDiagnosis() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DiagnosisSrv.FillDiagnosis($scope.CurrentPage - 1, $scope.Diagnosis, selectPatient.GenderID); //added by neena for gender wise ordering of diagosis
        ResponseData.then(function (Response) {
            if ($scope.isDefaultCalled) {
                $scope.FirstResponse = true;
                $scope.GetAllResponse();
            } else {
                usSpinnerService.stop('GridSpinner');
            }
            //usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                debugger;
                $scope.ListDiagnosis = Response.data;
                if (Response.data.length > 0)
                    $scope.TotalItems = Response.data[0].TotalRows;
                else
                    $scope.TotalItems = 0;

                if ($scope.SelectedDiagnosis != null) {
                    angular.forEach($scope.SelectedDiagnosis, function (item1) {

                        angular.forEach($scope.ListDiagnosis, function (item2) {

                            if (item1.ID == item2.ID) {

                                var index = $scope.ListDiagnosis.indexOf(item2);
                                $scope.ListDiagnosis.splice(index, 1);

                                //$scope.ListDiagnosis.push(item1);
                                $scope.ListDiagnosis.splice(index, 0, item1);
                            }

                        });
                    });
                }
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.FillOtherDiagnosis = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        if (typeof $scope.search == "undefined") {
            $scope.search = {};
            $scope.search.SearchColumns = "";
        }
        var ResponseData = DiagnosisSrv.FillOtherDiagnosis($scope.OtherCurrentPage - 1, $scope.search.SearchColumns);
        ResponseData.then(function (Response) {
            
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                $scope.ListOtherDiagnosis = Response.data;
                if (Response.data.length > 0)
                    $scope.OtherTotalItems = Response.data[0].TotalRows;
                else
                    $scope.OtherTotalItems = 0;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.FillFavouriteDiagnosis = function () {
        debugger;
        if (typeof $scope.search1 == "undefined") {
            $scope.search1 = {};
            $scope.search1.SearchColumns = "";
        }
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DiagnosisSrv.FillFavouriteDiagnosis($scope.FevCurrentPage - 1, $scope.search1.SearchColumns);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                $scope.ListFavouriteDiagnosis = Response.data;
                if (Response.data.length > 0)
                    $scope.FevTotalItems = Response.data[0].TotalRows;
                else
                    $scope.FevTotalItems = 0;

            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.FillDiagnosisType = function () {
        var ResponseData = Common.getMasterList('M_DiagnosisTypeMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.DiagnosisType = Response.data;
            if ($scope.ICDDetails.DiagnosisTypeID == undefined) {
                $scope.ICDDetails.DiagnosisTypeID = 0;
            }
            if ($scope.OtherDetails.DiagnosisTypeID == undefined) {
                $scope.OtherDetails.DiagnosisTypeID = 0;
            }
            if ($scope.FavouriteDetails.DiagnosisTypeID == undefined) {
                $scope.FavouriteDetails.DiagnosisTypeID = 0;
            }

        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.GetPatientDiagnosis = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DiagnosisSrv.GetPatientDiagnosis(0); //$scope.CurrentPage - 1
        ResponseData.then(function (Response) {
            debugger;
            if ($scope.isDefaultCalled) {
                $scope.SecondResponse = true;
                $scope.GetAllResponse();
            } else {
                usSpinnerService.stop('GridSpinner');
            }
            if (Response.data != null) {
                $scope.ListPatientDiagnosis = Response.data;

                //if (Response.data.length > 0)
                //    $scope.TotalItems = Response.data[0].TotalRows;
                //else
                //    $scope.TotalItems = 0;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.DeletePatientDiagnosis = function DeletePatientDiagnosis() {

        if ($scope.frmDiagnosis.PDataReason.$valid) {
            if ($scope.PatientItemToBeRemove != null) {
                var ResponseData = DiagnosisSrv.DeletePatientDiagnosis($scope.PatientItemToBeRemove.ID, $scope.PatientItemToBeRemove.UnitID, $scope.PDataReason)
                ResponseData.then(function (Response) {
                    if (Response.data != null) {
                        if (Response.data == 1) {
                            angular.element(DeletePatient).modal('hide');
                            //AlertMessage.success("Record Deleted Successfully!");//Commented by swatih for localization on 14/7/2020
                            AlertMessage.success(objResource.msgRecorddeletedsuccessfully);//Modified by swatih for localization on 14/7/2020
                            $scope.PatientItemToBeRemove = {};
                            $scope.PDataReason = "";
                            $scope.GetPatientDiagnosis();
                        }
                        else if (Response.data == 2) {
                            angular.element(DeletePatient).modal('hide');
                            //AlertMessage.success("Diagnosis Can Be Deleted Of Active Visits Only");//Commented by swatih for localization on 14/7/2020
                            AlertMessage.success(objResource.msgDiagnosisCanBeDeletedOfActiveVisitsOnly);//Modified by swatih for localization on 14/7/2020
                            $scope.PatientItemToBeRemove = {};
                            $scope.PDataReason = "";
                        }
                        else if (Response.data == 0) {
                            angular.element(DeletePatient).modal('hide');
                            //AlertMessage.success("Error Occured While Deleteing Record");//Commented by swatih for localization on 14/7/2020
                            AlertMessage.success(objResource.msgErrorOccuredWhileDeleteingRecord);//Modified by swatih for localization on 14/7/2020
                            $scope.PatientItemToBeRemove = {};
                            $scope.PDataReason = "";
                        }

                    }
                }, function (error) { });
            }
        }
        else {
            $scope.frmDiagnosis.PDataReason.$dirty = true;
        }
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
                    $scope.btnText = 'Male Diagnosis';
                })
                if ($rootScope.CoupleDetails.FemalePatient.Allergies != "" && $rootScope.CoupleDetails.FemalePatient.Allergies != null) {
                        $rootScope.Allergies = $rootScope.CoupleDetails.FemalePatient.Allergies;

                }
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

                $rootScope.FormName = 'Female Diagnosis'
                $scope.Str = 'Diagnosis/';
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
                    /*  Common.GetGlobalData().then(function (resp) {
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
                    $scope.btnText = 'Female Diagnosis';
                })
                // $rootScope.Allergies = $rootScope.CoupleDetails.MalePatient.Allergies;
                $rootScope.FormName = 'Male Diagnosis'
                $scope.Str = 'Diagnosis/';
                if (selectPatient.VisitID == undefined || selectPatient.VisitID == 0) {
                    if ($scope.NevigateVisitPopUP(selectPatient, $scope.Str));
                }
                else
                    $location.path($scope.Str);
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
    $scope.GetUserrights = function () {

        var lstUserRights = Common.getUserRights();
        if (selectPatient.GenderID == 1) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 309 && lstUserRights[z].Active)//Male Diagnosis 
                {
                    $scope.objRgtDia = lstUserRights[z];
                    break;
                }
            }
        }
        else if (selectPatient.GenderID == 2) {
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 302 && lstUserRights[z].Active)//Female Diagnosis 
                {
                    $scope.objRgtDia = lstUserRights[z];
                    break;
                }
            }
        }
        if (!$scope.objRgtDia.IsCreate) {
            angular.element(btnSaveDiagnosis).prop('disabled', true);
            angular.element(btnSaveOthrDiagnosis).prop('disabled', true);
            angular.element(btnSaveFavDiagnosis).prop('disabled', true);
        }
            //else if (!$scope.objRgtDia.IsUpdate) {
            //    angular.element(btnSaveVital).prop('disabled', true);

            //}
        else {
            angular.element(btnSaveDiagnosis).prop('disabled', false);
            angular.element(btnSaveOthrDiagnosis).prop('disabled', false);
            angular.element(btnSaveFavDiagnosis).prop('disabled', false);
        }
    }
    $scope.SavePatientOtherDiagnosis = function () {

        var ResponseData = DiagnosisSrv.SavePatientDiagnosis($scope.ListOtherDiagnosis);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                if (Response.data == 1) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                    $scope.GetPatientDiagnosis();
                }
                else if (Response.data == 2) {
                    //AlertMessage.success("Already added under same Visit");//Commented by swatih for localization on 14/7/2020
                    AlertMessage.success(objResource.msgAlreadyaddedundersameVisit);//Modified by swatih for localization on 14/7/2020
                }
                else {
                    //AlertMessage.success("Error Occured While Adding Details");//Commented by swatih for localization on 14/7/2020
                    AlertMessage.success(objResource.msgErrorOccuredWhileAddingDetails);//Modified by swatih for localization on 14/7/2020
                }
            }
        }, function (error) {
            $scope.Error = error;
        });
    }

    $scope.SavePatientFavDiagnosis = function () {

        $scope.ListDiagnosis1 = $filter('filter')($scope.ListFavouriteDiagnosis, function (d) { return d.IsSelected == true });
        $scope.ListDiagnosisttype = $filter('filter')($scope.ListDiagnosis1, function (d) { return d.DiagnosisTypeID == 0 });

        if ($scope.ListDiagnosis1.length > 0) {
            if ($scope.ListDiagnosisttype == 0) {
                var IsSame = true;
                debugger;
                var ii = $scope.ListPatientDiagnosis.length - 1;
                for (ii; ii >= 0; ii--) {
                    var jj = $scope.ListDiagnosis1.length - 1;
                    for (jj; jj >= 0; jj--) {
                        if ($scope.ListPatientDiagnosis[ii].Code == $scope.ListDiagnosis1[jj].Code) {
                            IsSame = false;
                            break;
                        }
                    }
                    if (!IsSame) {
                        break;
                    }
                }
                if(IsSame){
                var ResponseData = DiagnosisSrv.CheckIfDiagnosisAddedToPatient($scope.ListDiagnosis1);
                ResponseData.then(function (Response) {
                    debugger;
                    if (Response.data != null) {
                        if (Response.data == 1 || Response.data == 0) {
                            var ResponseData = DiagnosisSrv.SavePatientDiagnosis($scope.ListDiagnosis1);
                            ResponseData.then(function (Response) {

                                if (Response.data != null) {
                                    if (Response.data == 1) {
                                        debugger;
                                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                                        $scope.GetPatientDiagnosis();
                                        $scope.FillFavouriteDiagnosis(); //added by neena
                                    }
                                    else if (Response.data == 2) {
                                        //AlertMessage.success("Already added under same Visit");//Commented by swatih for localization on 14/7/2020
                                        AlertMessage.success(objResource.msgAlreadyaddedundersameVisit);//Modified by swatih for localization on 14/7/2020
                                        $scope.FillFavouriteDiagnosis(); //added by neena
                                    }
                                    else {
                                        // AlertMessage.success("Error Occured While Adding Details");//Commented by swatih for localization on 14/7/2020
                                        AlertMessage.success(objResource.msgErrorOccuredWhileAddingDetails);//Modified by swatih for localization on 14/7/2020
                                    }
                                }
                            });

                        }
                        else if (Response.data == 2) {
                            //AlertMessage.success("Diagnosis Already Added");//Commented by swatih for localization on 14/7/2020
                            AlertMessage.success(objResource.msgDiagnosisAlreadyAdded);//Modified by swatih for localization on 14/7/2020
                            //added by neena
                            $scope.FillFavouriteDiagnosis(); //added by neena
                            //
                        }
                            //else if (Response.data == 0) {

                            //    $scope.Save(ListDiagnosis);
                            //    //added by neena
                            //    $scope.FillFavouriteDiagnosis(); //added by neena
                            //    //
                            //}
                        else if (Response.data == 3) {
                            //AlertMessage.success("Error Occured While Adding Details");//Commented by swatih for localization on 14/7/2020
                            AlertMessage.success(objResource.msgErrorOccuredWhileAddingDetails);//Modified by swatih for localization on 14/7/2020
                        }
                    }

                }, function (error) {
                    $scope.Error = error;
                });
            }
            else{
                    //AlertMessage.warning("You have selected duplicate Diagnosis");//Commented by swatih for localization on 14/7/2020
                    AlertMessage.warning(objResource.msgYouhaveselectedduplicateDiagnosis);//Modified by swatih for localization on 14/7/2020
            }
            }
            else {
                //AlertMessage.success("Select Diagnosis Type For All Selected Diagnosis");//Commented by swatih for localization on 14/7/2020
                AlertMessage.success(objResource.msgSelectDiagnosisTypeForAllSelectedDiagnosis);//Modified by swatih for localization on 14/7/2020
            }

        }
        else {
            //AlertMessage.success("Select Atlist One Diagnosis To Save");//Commented by swatih for localization on 14/7/2020
            AlertMessage.success(objResource.msgSelectAtlistOneDiagnosisToSave);//Commented by swatih for localization on 14/7/2020
        }
    }



    //$scope.SavePatientFavDiagnosis = function () {

    //    $scope.ListDiagnosis1 = $filter('filter')($scope.ListFavouriteDiagnosis, function (d) { return d.IsSelected == true });
    //    $scope.ListDiagnosisttype = $filter('filter')($scope.ListDiagnosis1, function (d) { return d.DiagnosisTypeID == 0 });
    //    if ($scope.ListDiagnosis1.length > 0) {
    //        if ($scope.ListDiagnosisttype == 0) {
    //            var ResponseData = DiagnosisSrv.SavePatientDiagnosis($scope.ListDiagnosis1);
    //            ResponseData.then(function (Response) {

    //                if (Response.data != null) {
    //                    if (Response.data == 1) {
    //                        debugger;
    //                        AlertMessage.success(objResource.msgTitle, objResource.msgSave);
    //                        $scope.GetPatientDiagnosis();
    //                        $scope.FillFavouriteDiagnosis(); //added by neena
    //                    }
    //                    else if (Response.data == 2) {
    //                        AlertMessage.success("Already added under same Visit");
    //                        $scope.FillFavouriteDiagnosis(); //added by neena
    //                    }
    //                    else {
    //                        AlertMessage.success("Error Occured While Adding Details");
    //                    }
    //                }
    //            }, function (error) {
    //                $scope.Error = error;
    //            });
    //        }
    //        else {
    //            AlertMessage.success("Select Diagnosis Type For All Selected Diagnosis");
    //        }

    //    }
    //    else {
    //        AlertMessage.success("Select Atlist One Diagnosis To Save");
    //    }
    //}


    $scope.Checked = function Checked(item, IsSelected) {

        if (IsSelected == true) {
            item.IsSelected = true;
            angular.forEach

        }
        else {
            item.IsSelected = false;
            $scope.SelectedDiagnosis.pop(item);
        }
    }

    $scope.CancelMain = function CancelMain() {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    }

    $scope.ICDdiagnosisChange = function (IsCheked) {
        if (IsCheked == true) {

        }
        else {

        }
    }
    //End    
});