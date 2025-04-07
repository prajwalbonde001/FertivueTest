'use strict';
angular.module('PIVF').controller('ctrlLinkPartner', function ($rootScope, $scope,LinkPartnerSrv, $location, AlertMessage, srvCommon, Common, swalMessages, $uibModal, $filter, usSpinnerService) {
    $rootScope.hideWhenQueue = true;
    $rootScope.FormName = 'Link Partner';
    $scope.LoadData = function LoadData() {
        debugger;
        var getpatientlistresponse;
        if ($rootScope.IsMale == 1) {
            getpatientlistresponse = Common.getPartnerlist($rootScope.CoupleDetails.MalePatient.MAleUnitID,11,2); // 11 couple 
        }
        else {
            getpatientlistresponse = Common.getPartnerlist($rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID, 11,1); // 11 couple 
        }

        getpatientlistresponse.then(function (resp) {
            if (resp.data != null) {
                debugger;
                $scope.PatientList = resp.data;
                //$scope.PatientList = $filter('filter')($scope.PatientList, function (d) { return d.GenderID === 2; });
            }
        })
    }

    $scope.getMatchingPatient = function ($viewValue) {
        debugger;
        var matchingStuffs = [];
        for (var i = 0; i < $scope.PatientList.length; i++) {
            if (
              $scope.PatientList[i].PatientName.toLowerCase().indexOf($viewValue.toLowerCase()) != -1 ||
              $scope.PatientList[i].MRNo.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) {
                matchingStuffs.push($scope.PatientList[i]);
            }
        }
        return matchingStuffs;
    }
    $scope.onSelect = function (model) {
        debugger;

        if (model) {
            $scope.Partner.Select = false;
            $scope.Partner.Name = model.PatientName;
            $scope.Partner.MRNo = model.MRNo;
            $scope.Partner.GenderId = model.GenderID;
            $scope.Partner.Id = model.ID;
            $scope.Partner.UnitId = model.UnitID;
            $scope.Partner.VisitId = model.VisitID;
            $scope.Partner.VisitStatusID = model.VisitStatusID;


         console.log('model ',model);
        }
        else {
            
        }
       


    };
    $scope.linkPartner = function () {
        console.log("here");
        var linkPartnerObj = {};
        var response;
        if ($scope.Partner.GenderId == 1) {
            //male
            linkPartnerObj.UnitId = $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID;
            linkPartnerObj.MalePatientUnitId = $scope.Partner.UnitId; //Added by AniketK on 13Jan2020
            linkPartnerObj.PatientCategory=11;
            linkPartnerObj.MaleId = $scope.Partner.Id;
            linkPartnerObj.FemaleId = $rootScope.CoupleDetails.FemalePatient.FemalePatientID;
            linkPartnerObj.IsFemale = 1;
            linkPartnerObj.VisitId = $scope.Partner.VisitId;
            linkPartnerObj.VisitStatus = $scope.Partner.VisitStatusID;

            response = LinkPartnerSrv.linkPartner(linkPartnerObj);//unitid,patientcategroy,maleid,femaleid,isfemale,visitid,visitstatus

        }
        else if ($scope.Partner.GenderId == 2) {
            //female
            linkPartnerObj.UnitId = $rootScope.CoupleDetails.MalePatient.MAleUnitID;
            linkPartnerObj.FemalePatientUnitId = $scope.Partner.UnitId; //Added by AniketK on 13Jan2020
            linkPartnerObj.PatientCategory = 11;
            linkPartnerObj.MaleId = $rootScope.CoupleDetails.MalePatient.MaleId;
            linkPartnerObj.FemaleId = $scope.Partner.Id;
            linkPartnerObj.IsFemale = 0;
            linkPartnerObj.VisitId = $scope.Partner.VisitId;
            linkPartnerObj.VisitStatus = $scope.Partner.VisitStatusID;

            response=LinkPartnerSrv.linkPartner(linkPartnerObj);//unitid,patientcategroy,maleid,femaleid,isfemale,visitid,visitstatus
        }

        response.then(function (resp) {
            if (resp.data != null) {
                debugger;
                if (resp.data == 1) {
                    AlertMessage.info('PalashIVF', 'Partner Linked Successfully.');
                    $location.path('/Queue/');
                    
                }
                else {
                    AlertMessage.warning('PalashIVF', 'Partner Not Linked Try Again');
                }
                //$scope.PatientList = $filter('filter')($scope.PatientList, function (d) { return d.GenderID === 2; });
            }
        })

    }
    $scope.getpatientlist = function getpatientlist(PatientCategory) {
        var UserInfo = localStorageService.get("UserInfo");
        //var response = Common.getpatientlist(UserInfo.UnitID, $scope.PatientCategory);
        var response = Common.getpatientlist(2, PatientCategory);
        response.then(function (resp) {
            if (resp.data != null) {
                $scope.PatientList = resp.data;
                $scope.BindParentList(0);

            }
        });
    }


})