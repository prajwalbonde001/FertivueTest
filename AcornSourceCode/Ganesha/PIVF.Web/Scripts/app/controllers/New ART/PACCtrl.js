'use strict';
angular.module('PIVF').controller('PACCtrl', function ($rootScope, $scope, $uibModal, $uibModalInstance, Common, srvNewART, AlertMessage, srvCommon) {
    debugger;
    $scope.SaveBtn = false;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    var SelCouple = Common.getSelectedCouple();
    $scope.PACDetails = {};
    $scope.PACDetails.DateInvalid = false;
    $scope.PACDetails.TimeInvalid = false;
    // For Date-Picker
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
        //  dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(), //.setMonth(new Date().getMonth() + 12), //new Date(2016, 8, 01),
        minDate: new Date().setYear(new Date().getYear() - 100),//new Date(),
        startingDay: 1,
        showWeeks: false
    };
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.Save = function () {
        $scope.isvalid = false;
        if ($scope.PACDetails.PACDate == undefined || $scope.PACDetails.PACDate == null) {
            $scope.isvalid = true;
            $scope.PACDetails.DateInvalid = true;
        }
        if ($scope.PACDetails.Time == undefined || $scope.PACDetails.Time == null) {
            $scope.isvalid = true;
            $scope.PACDetails.TimeInvalid = true;
        }
        if ($scope.isvalid == false) {
            if (SelCouple != undefined && SelCouple != null) {
                $scope.PACDetails.PatientID = SelCouple.FemalePatient.FemalePatientID;
                $scope.PACDetails.FemalePatientUnitID = SelCouple.FemalePatient.FemalePatientUnitID;
                $scope.PACDetails.TherapyID = SelCouple.FemalePatient.TherapyID;
                $scope.PACDetails.TherapyUnitID = SelCouple.FemalePatient.TherapyUnitID;
                debugger;
                var Response = srvNewART.SavePAC($scope.PACDetails);
                debugger;
                Response.then(function (resp) {
                    debugger;
                    if (resp.data == 1) {
                        $uibModalInstance.close(resp.data);
                    }
                }, function (error) {
                    debugger;
                    AlertMessage.error('PalashIVF', 'Error occured.');
                })
            }
        }
        else {
            AlertMessage.error(objResource.msgTitle, "Please Select mandatory Values");
        }
    }
    $scope.GetPAC = function () {
       
        if (SelCouple != undefined && SelCouple != null) {
            $scope.PACDetails.PatientID = SelCouple.FemalePatient.FemalePatientID;
            $scope.PACDetails.FemalePatientUnitID = SelCouple.FemalePatient.FemalePatientUnitID;
            $scope.PACDetails.TherapyID = SelCouple.FemalePatient.TherapyID;
            $scope.PACDetails.TherapyUnitID = SelCouple.FemalePatient.TherapyUnitID;
            var Response = srvNewART.GetPAC($scope.PACDetails);
            Response.then(function (resp) {
                debugger;
                if ($scope.CoupleDetails.FemalePatient.IsCloseCycle) //cycle close 
                    $scope.SaveBtn = false;
                else
                    $scope.SaveBtn = true;
                if (resp.data != null) {
                  
                     debugger;
                    $scope.PACDetails = resp.data;
                    if (resp.data.PACDate != null) {
                        $scope.PACDetails.PACDate = new Date(resp.data.PACDate);
                    }
                    else {
                        resp.data.PACDate = new Date();
                    }
                }
            }, function (error) {
                debugger;
                AlertMessage.error('PalashIVF', 'Error occured.');
            })
        }
    }

    //========================================================================================================================================================================
    $scope.handleFileSelect = function (evt) {
        var file = evt.files[0];
        if (file.name != undefined) {
            var extn = file.name.split(".").pop().toLowerCase();
        }
        var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
        var validExtension = false;
        if (extensions.indexOf(extn) > -1) {
            validExtension = true;
            $scope.filename = file.name;
        }
        else
            //item.ConsentDOC = '';
            $scope.PACDetails.ConsentDOC = '';
        var maxSize = 2097152;  // 2mb
        var valid = (file.size) <= maxSize;
        if (validExtension) {
            if (valid) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        //item.ConsentDOC = evt.target.result;
                        $scope.PACDetails.ConsentDOC = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            }
            else {
                $scope.$apply(function ($scope) {
                    AlertMessage.error('PalashIVF', 'Attactment should be not greater than 2 MB.');
                });
            }
        }
        else {
            $scope.$apply(function ($scope) {
                AlertMessage.error('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');
            });
        }
    }

    //========================================================================================================================================================================
    $scope.ViewConsent = function () {
        debugger;
        $scope.extn = $scope.PACDetails.ConsentDOC.substring($scope.PACDetails.ConsentDOC.indexOf(':') + 1, $scope.PACDetails.ConsentDOC.indexOf('/'));
        if ($scope.extn == 'image') {
            $scope.Image = $scope.PACDetails.ConsentDOC;
            $scope.content = '';
        }
        else {
            $scope.content = $scope.PACDetails.ConsentDOC;
            $scope.Image = null;
        }

        debugger;
        $scope.PassInfor = {};
        $scope.PassInfor.extn = $scope.extn;
        $scope.PassInfor.Image = $scope.Image;
        $scope.PassInfor.content = $scope.content;

        var modalInstance = $uibModal.open({
            templateUrl: 'PACViewDetails',
            controller: 'PACViewCtrl',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            resolve: {
                RootPGInfo: function () {
                    return $scope.PassInfor;
                }
            }
        });
        modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
            debugger;
            if (!angular.equals({}, data)) {

            }
        });

        //angular.element(myModalImagePDF).modal('show');
    }

    //========================================================================================================================================================================
    $scope.handleFileSelectForReport = function (evt) {
        var file = evt.files[0];
        if (file.name != undefined) {
            var extn = file.name.split(".").pop().toLowerCase();
        }
        var extensions = ['png', 'pdf', 'jpeg', 'jpg'];
        var validExtension = false;
        if (extensions.indexOf(extn) > -1) {
            validExtension = true;
            $scope.Reportfilename = file.name;
        }
        else
            //item.ReportDOC = '';
            $scope.PACDetails.ReportDOC = '';
        var maxSize = 2097152;  // 2mb
        var valid = (file.size) <= maxSize;
        if (validExtension) {
            if (valid) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        // item.ReportDOC = evt.target.result;
                        $scope.PACDetails.ReportDOC = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            }
            else {
                $scope.$apply(function ($scope) {
                    AlertMessage.error('PalashIVF', 'Attactment should be not greater than 2 MB.');
                });
            }
        }
        else {
            $scope.$apply(function ($scope) {
                AlertMessage.error('PalashIVF', 'Attactment should be in png ,jpeg , pdf format.');
            });
        }
    }

    //========================================================================================================================================================================
    $scope.ViewReport = function () {
        debugger;
        $scope.extn = $scope.PACDetails.ReportDOC.substring($scope.PACDetails.ReportDOC.indexOf(':') + 1, $scope.PACDetails.ReportDOC.indexOf('/'));
        if ($scope.extn == 'image') {
            $scope.Image = $scope.PACDetails.ReportDOC;
            $scope.content = '';
        }
        else {
            $scope.content = $scope.PACDetails.ReportDOC;
            $scope.Image = null;
        }

        debugger;
        $scope.PassInfor = {};
        $scope.PassInfor.extn = $scope.extn;
        $scope.PassInfor.Image = $scope.Image;
        $scope.PassInfor.content = $scope.content;

        var modalInstance = $uibModal.open({
            templateUrl: 'PACViewDetails',
            controller: 'PACViewCtrl',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            resolve: {
                RootPGInfo: function () {
                    return $scope.PassInfor;
                }
            }
        });
        modalInstance.result.then(function (data) { //Work With delegate return object From PopUp Model
            debugger;
            if (!angular.equals({}, data)) {

            }
        });

       // angular.element(myModalImagePDF).modal('show');
    }

});