/// <reference path="EmbryoTransferCtrl.js" />
angular.module('PIVF').controller('EmbryoTransferCtrl', function ($rootScope, $scope, Common, srvCommon, EmbryoTransferSrv, AlertMessage, $filter, $location, PageConfig, usSpinnerService, localStorageService) {
    //Variable Declaration
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = false;
    $scope.MasterData = {};
    $scope.CoupleDetails = {};
    $scope.ET = {};
    $scope.ET.ETGrid = {};
    $scope.FreshTransfer = 0;
    $scope.FrozenTransfer = 0;
    $scope.LastTransferDate = null;
    $scope.IsFinalize = false;
    $rootScope.OrderList = 1;
    $rootScope.ForConsent = 0;
    $scope.transferTo = false;
    $rootScope.FormName = 'Embryo Transfer';
    debugger;
    $scope.LoginInfo = localStorageService.get("UserInfo").UserName;
    var objResource = {};
    //Get The Page Visibility Config Data By Vikrant 
    $scope.configData = PageConfig.getObj();
    //==============================================================================================================================================================
    //Assign To Couple Information And Oocyte details
    $scope.CoupleDetails = Common.getSelectedCouple();
    //to Read Resource File
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    //==============================================================================================================================================================
    // For Date-Picker
    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    debugger;
    $scope.open1 = function () {
        
        $scope.popup1.opened = true;
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

    //added by Mayur
    $scope.setAutoPregnancyDate = function (etdate)
    {
        var temp = new Date(etdate);
        temp.setDate(temp.getDate() + 14);
        $scope.ET.PregnancyDate = temp;
    }

    $scope.selectedreson=function(res)
    {
        alert(res);
    }

    $scope.dateOptionsDOB =
        {
        formatYear: 'yyyy',
        maxDate: new Date().setMonth(new Date().getMonth() + 120), //new Date(2016, 8, 01),
        minDate:new Date(), //new Date().setYear(new Date().getYear() - 120),//,
        startingDay: 1,
        showWeeks: false
    };  //for configure date-picker
    $scope.ismeridian = true;
    // Date pickr End
    //========================================================================================================================================================================
    $scope.Navigate = function (path) {
        $location.path('/' + path + '/');
    }


    $scope.FillAnesthetiaTypeList = function () {
        var ResponseData = Common.getMasterList('M_Anesthesia', 'ID', 'Description');
        ResponseData.then(function (Response) {
            //Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.AnesthetiaTypeList = Response.data;
            $scope.ET.AnesthetistID = 0;
          
        }, function (error) {
        });
    }
    //==============================================================================================================================================================
    $scope.PageSetup = function () {
        $scope.FillAnesthetiaTypeList();
        usSpinnerService.spin('GridSpinner');
        if ($scope.CoupleDetails.FemalePatient != undefined && $scope.CoupleDetails.FemalePatient != null) {
            if ($scope.CoupleDetails.FemalePatient.IsCancelCycle == true) {
                $scope.IsFinalize = true;
            }
            if ($scope.CoupleDetails.FemalePatient.IsCloseCycle == false) {
                $scope.IsFinalize = true;
            }
            debugger;
        }

        $scope.CancelCycle = function () {
            if (!$scope.ET.CancelCycleFlag) {
                $scope.ET.CancelCycleRemark = 0;
                $scope.frmET.Cnclcyclermrk.$dirty = false;
            }
        }

        //Fill All Master
        var ResponseData = EmbryoTransferSrv.FillETMaster();
        debugger;
        ResponseData.then(function (MasterResponse) {
            console.log(MasterResponse.data);
            debugger
            $scope.MasterData = MasterResponse.data;
            var ResponseData = EmbryoTransferSrv.FillETGrid($scope.CoupleDetails.FemalePatient.FemalePatientID, $scope.CoupleDetails.FemalePatient.FemalePatientUnitID, $scope.CoupleDetails.FemalePatient.TherapyID, $scope.CoupleDetails.FemalePatient.TherapyUnitID);
            ResponseData.then(function (MasterResponse) {
                debugger;
                $scope.ET = MasterResponse.data;
                if ($scope.ET != null) {
                    debugger;
                    if ($scope.ET.ETGrid != null) {                        
                            console.log($scope.ET.ETGrid)     //Added by Nayan Kamble
                            for (var ii = 0; ii < $scope.ET.ETGrid.length; ii++) {
                                if ($scope.ET.ETGrid[ii].SurrogateMrno != 0) {
                                    $scope.transferTo = true;
                                    $scope.SurrogateMrno = $scope.ET.ETGrid[ii].SurrogateMrno;
                                    $scope.TransferToList = [{ ID: 0, Description: 'Select' }, { ID: 1, Description: 'Self' }, { ID: 2, Description: $scope.SurrogateMrno }];

                                    break;
                                }
                            }  
                            if ($scope.ET.Date != null) {
                            $scope.ET.Date = new Date($scope.ET.Date);
                            //var temp = new Date($scope.ET.Date);
                            //temp.setDate(temp.getDate() + 14);
                            //$scope.ET.PregnancyDate = temp;
                          
                            debugger;
                        }
                        else {
                            $scope.ET.Date = new Date();
                            var temp = new Date($scope.ET.Date);
                            temp.setDate(temp.getDate() + 14);
                            $scope.ET.PregnancyDate = temp;
                            $rootScope.SetOutcomePregnancyDate = $scope.ET.PregnancyDate;
                            debugger;
                        }
                            if (!$rootScope.ARTDateValidation) {
                                debugger;
                            $scope.dateOptionsDOB = {
                                formatYear: 'yyyy',
                                maxDate: new Date().setMonth(new Date().getMonth() + 120), //new Date(2016, 8, 01),
                                minDate: $scope.ET.OPUDate,
                                startingDay: 1,
                                showWeeks: false
                            };
                        }
                        if ($scope.ET.Noofattempts != 0 && $scope.ET.Noofattempts != undefined) {
                            $scope.ET.Noofattempts = $scope.ET.Noofattempts + "";
                        }
                        else {
                            $scope.ET.Noofattempts = "";
                        }
                        if ($scope.ET.Embryoresidue != 0 && $scope.ET.Embryoresidue != undefined) {
                            $scope.ET.Embryoresidue = $scope.ET.Embryoresidue + "";
                        }
                        else {
                            $scope.ET.Embryoresidue = "";
                        }
                        if ($scope.ET.PregnancyDate != null) {
                            $scope.ET.PregnancyDate = new Date($scope.ET.PregnancyDate);
                            $rootScope.SetOutcomePregnancyDate = $scope.ET.PregnancyDate;
                        }
                        //else {
                        //    $scope.ET.PregnancyDate = new Date();
                        //}
                        if ($scope.ET.clinicianName != "") {
                            $scope.LoginInfo = $scope.ET.clinicianName;
                        }
                        $scope.FreshTransfer = $filter('filter')($scope.ET.ETGrid, function (d) { return d.ISfreshEmbro === 'Fresh'; }).length;
                        $scope.FrozenTransfer = $filter('filter')($scope.ET.ETGrid, function (d) { return d.ISfreshEmbro === 'Frozen'; }).length;
                        $scope.LastTransferDate = $scope.ET.ETGrid[$scope.ET.ETGrid.length - 1].Date;
                       
                        if ($scope.ET.Finalize) {
                            $scope.IsFinalize = true; //temp changed flag 
                        }
                        usSpinnerService.stop('GridSpinner');
                    }
                    else {
                        usSpinnerService.stop('GridSpinner');
                        $scope.IsFinalize = false;
                        AlertMessage.error(objResource.msgTitle, "Atleast One Embryo should be Transfer");
                    }
                }
                else {
                    usSpinnerService.stop('GridSpinner');
                    $scope.IsFinalize = true;
                    AlertMessage.error(objResource.msgTitle, "Atleast One Embryo should be Transfer");
                }
            }, function (error) {
                usSpinnerService.stop('GridSpinner');
                AlertMessage.error(objResource.msgTitle, objResource.msgError);
            });
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
        $scope.getDoctorList();
    }
    //Get DoctorList
     $scope.getDoctorList = function(){
        var responseData = Common.GetEmbryologyDoctorsList();
        responseData.then(function (Response) {
             
            $scope.Clinician = Response.data.Clinician;
            $scope.EmbryologistAndrologist=Response.data.EmbryologistAndrologist;
        });
    }
    //==============================================================================================================================================================
    //Open ImgPopUp For Show Image Preview
    $scope.GetImg = {};
    $scope.PreviewImg = function (Imgcollection) {
        debugger;
        angular.element(myModal).modal('show');
        if (Imgcollection.Img != null) {
            $scope.GetImg = Imgcollection.Img.model;
        }
        else {
            $scope.GetImg = {};
        }
    }
    //Preview Img Ok Click Process
    $scope.ImgPreviewOk = function () {
        angular.element(myModal).modal('hide');
    }
    //Preview Img Cancel Click Process
    $scope.ImgPreviewCancel = function () {
        angular.element(myModal).modal('hide');
    }
    //Remove Images
    $scope.RemoveImg = function (index) {
        var index = $scope.GetImg.indexOf(index);
        $scope.GetImg.splice(index, 1);
    }

    $scope.PrintEmbryoTransferReport = function () {
        debugger;
        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&Th=' + $scope.CoupleDetails.FemalePatient.TherapyID + '&THU=' + $scope.CoupleDetails.FemalePatient.TherapyUnitID +'&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);
        window.open('/Reports/ART/Cycle/EmbryoTransferWF.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }
    //==============================================================================================================================================================
    $scope.SaveET = function () {
        debugger;
        usSpinnerService.spin('GridSpinner');
      //  if ($scope.ET.ETGrid != null) {
            if ($scope.Validation()) {
                $scope.ET.PatientID = $scope.CoupleDetails.FemalePatient.FemalePatientID;
                $scope.ET.PatientUnitID = $scope.CoupleDetails.FemalePatient.FemalePatientUnitID;
                $scope.ET.TherapyID = $scope.CoupleDetails.FemalePatient.TherapyID;
                $scope.ET.TherapyUnitID = $scope.CoupleDetails.FemalePatient.TherapyUnitID;
                $scope.ET.Date = $filter('date')($scope.ET.Date, 'medium');
                $scope.ET.PregnancyDate = $filter('date')($scope.ET.PregnancyDate, 'medium');
                $scope.ET.Time = $filter('date')($scope.ET.Time, 'medium');
              
         

                    var ResponseData = EmbryoTransferSrv.SaveET($scope.ET);
                    ResponseData.then(function (MasterResponse) {
                        if (MasterResponse.data == 1) {
                            AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                            $scope.PageSetup();
                        }
                        usSpinnerService.stop('GridSpinner');
                    }, function (error) {
                        usSpinnerService.stop('GridSpinner');
                        AlertMessage.error(objResource.msgTitle, objResource.msgError);
                    });
                
            }
            else {
                usSpinnerService.stop('GridSpinner');
            }
        //}
    }
    //============ Mandatory Field Form Validation==================================================================================================================================================
    $scope.Validation = function () {
        var IsValid = true;
        debugger;
        if ($scope.ET.CloseCycle && !$scope.ET.CancelCycleFlag) {
            AlertMessage.warning(objResource.msgTitle, "Please Cancel Cycle First ");
            return false;
        }
        if ($scope.ET.CancelCycleFlag) {
            if ($scope.ET.CancelCycleRemark == 0) {
                AlertMessage.warning(objResource.msgTitle, "Please Select Cancel Reason ");
                return false;
            }
             else
            return true;
        }

        //var LTransferDate = $filter('date')($scope.LastTransferDate, 'dd-MMM-yyyy');
        //var TDate = $filter('date')($scope.ET.Date, 'dd-MMM-yyyy');
   
        // added sujata for 
        var LTransferDate = $filter('date')($scope.LastTransferDate, 'dd');
        var TDate = $filter('date')($scope.ET.Date, 'dd');

        var LTransferDateMon = $filter('date')($scope.LastTransferDate, 'MM');
        var TDateMon = $filter('date')($scope.ET.Date, 'MM');


        if (TDateMon < LTransferDateMon) {
            AlertMessage.error(objResource.msgTitle, "date should be greater than or equal to Last Embryo Transfer Date");
            $scope.frmET.ETDate.$dirty = true;
            IsValid = false;
        }
        else if (TDateMon == LTransferDateMon) {
            if (TDate < LTransferDate) {
                AlertMessage.error(objResource.msgTitle, "date should be greater than or equal to Last Embryo Transfer Date");
                $scope.frmET.ETDate.$dirty = true;
                IsValid = false;
            }
            if (TDate == LTransferDate) {
                $scope.frmET.ETDate.$dirty = false;
                IsValid = true;
            }
        }



        //if (TDate > LTransferDate || TDate == null)
        //{
        //    AlertMessage.error(objResource.msgTitle, "date should be greater than or equal to Last Embryo Transfer Date");
        //    $scope.frmET.ETDate.$dirty = true;
        //    IsValid = false;
        //}

        if ($scope.ET.Time == null || $scope.ET.Time == undefined) {
            AlertMessage.error(objResource.msgTitle, "Fill All Mandatory Fields.");
            $scope.frmET.ETtime.$dirty = true;
            IsValid = false;
        }
        if ($scope.ET.EmbryologistID == 0) {
            AlertMessage.error(objResource.msgTitle, "Fill All Mandatory Fields");
            $scope.frmET.EmbryologistID.$dirty = true;
            IsValid = false;
        }
        if ($scope.ET.WitnessID == 0) {
            AlertMessage.error(objResource.msgTitle, "Fill All Mandatory Fields");
            $scope.frmET.WitnessID.$dirty = true;
            IsValid = false;
        }
        //comment by vikrant as per excel sheet refrance shared by priyanka date 23/11/2017
        //if ($scope.ET.AnesthetistID == 0) {
        //    AlertMessage.error(objResource.msgTitle, "Fill All Mandatory Fields");
        //    $scope.frmET.AnesthetistID.$dirty = true;
        //    IsValid = false;
        //}
        //if ($scope.ET.AnesthesiaID == 0) {
        //    AlertMessage.error(objResource.msgTitle, "Fill All Mandatory Fields");
        //    $scope.frmET.AnesthesiaID.$dirty = true;
        //    IsValid = false;
        //}
        if ($scope.ET.DistanceFromfundus != null && $scope.ET.DistanceFromfundus > 3) {
            AlertMessage.error(objResource.msgTitle, "Distance From fundus should be Less Than 3.");
            $scope.frmET.DistanceFromfundus.$dirty = true;
            IsValid = false;
        }
        if ($scope.ET.EndometriumThickness != null && $scope.ET.EndometriumThickness > 26) {
            AlertMessage.error(objResource.msgTitle, "Endometrium Thickness should be Less Than 26.");
            $scope.frmET.EndometriumThickness.$dirty = true;
            IsValid = false;
        }

        if ($scope.ET.PregnancyDate != undefined && $scope.ET.PregnancyDate != null) {
            $scope.PregnacyDate1 = $filter('date')($scope.ET.PregnancyDate, 'dd-MMM-yyyy');
            $scope.mydate = new Date($filter('date')($scope.ET.Date, 'dd-MMM-yyyy'));
            var numberOfDaysToAdd = 12;
            $scope.newdate = $scope.mydate.setDate($scope.mydate.getDate() + numberOfDaysToAdd);
            $scope.TPDate = $filter('date')($scope.newdate, 'dd-MMM-yyyy');
            $scope.mydate1 = new Date($filter('date')($scope.ET.Date, 'dd-MMM-yyyy'));
            var numberOfDaysToAdd1 = 16;
            $scope.newdate1 = $scope.mydate1.setDate($scope.mydate1.getDate() + numberOfDaysToAdd1);
            $scope.TPDate1 = $filter('date')($scope.newdate1, 'dd-MMM-yyyy');
            if (new Date($filter('date')($scope.PregnacyDate1, 'shortDate')) < new Date($filter('date')($scope.TPDate, 'shortDate'))) {
                AlertMessage.error(objResource.msgTitle, "Pregnacy Date should be Greater Than 10 OR Less Than 16 Days To ET Date");
                $scope.frmET.dtPregnancyDate.$dirty = true;
                IsValid = false;
            }
            if (new Date($filter('date')($scope.PregnacyDate1, 'shortDate')) > new Date($filter('date')($scope.TPDate1, 'shortDate'))) {
                AlertMessage.error(objResource.msgTitle, "Pregnacy Date should be Greater Than 10 OR Less Than 16 Days To ET Date");
                $scope.frmET.dtPregnancyDate.$dirty = true;
                IsValid = false;
            }
            if ($scope.PregnacyDate1 == null) {
                AlertMessage.error(objResource.msgTitle, "Pregnacy Date should be Greater Than 10 OR Less Than 16 Days To ET Date");
                $scope.frmET.dtPregnancyDate.$dirty = true;
                IsValid = false;
            }
        }
//by mayur
        //if ($scope.ET.CancelCycleRemark == 0) {
        //    AlertMessage.error(objResource.msgTitle, "Fill All Mandatory Fields");
        //    $scope.frmET.Cnclcyclermrk.$dirty = true;
        //    IsValid = false;
        //}
        if (!$scope.ET.CancelCycleFlag) {
            $scope.ET.CancelCycleRemark = "";
        }   //Added by Nayan Kamble
        debugger;
        if ($scope.transferTo == true) {
            debugger;
            angular.forEach($scope.ET.ETGrid, function (item) {
                if (item.TransferToID == 0) {
                    AlertMessage.error(objResource.msgTitle, "Please Select Transfer To in Embryo Details");
                    $scope.frmET.TransferToID.$dirty = true;
                    IsValid = false;
                  
                }
            });        
        }
        return IsValid;
    }
    //=======================Endometrium Thickness Validation=======================================================================================================================================
    $scope.valiade = function (val, eve) {
        var isDecimal = false;
        if (angular.isDefined(val)) {
            if (val != null) {
                var count = val.split('.').length - 1;
                isDecimal = val.indexOf(".") == -1 ? false : true;
            }
        }
        if (!isDecimal && angular.isDefined(val)) {
            if (val != null) {
                if (val.length < 2) {
                }
                else if (val.length == 2 && (eve.which == 110 || eve.which == 190 || eve.which == 8)) {
                    if (parseInt(val) < 26 || eve.which == 8)
                        return true;
                    else eve.preventDefault();
                }
                else eve.preventDefault();
            }
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
            else if (parseInt(arr[0]) < 26) {
            }
            else {
                eve.preventDefault();
            }
        }
    }
    //===============Distance From fundus Validation===============================================================================================================================================
    $scope.valiadeForOneDigit = function (val, eve) {  
        if (angular.isUndefined(val)) val = '';
        var isDecimal = false;
        if (angular.isDefined(val)) {
            var count = val.split('.').length - 1;
            isDecimal = val.indexOf(".") == -1 ? false : true;
        }
        if (!isDecimal) {
            if (val.length <= 1) {                
                if (val.length < 1 && ([99, 8].indexOf(eve.which) > -1)) {

                }    
                else if (val.length < 1 && ([48, 49, 50, 51, 96, 97, 98, 99, 8].indexOf(eve.which) > -1)) {
                    
                }                            
                else if ([110, 190, 8].indexOf(eve.which) > -1) { }
                else eve.preventDefault();
            }
            else if (val.length == 1 && (eve.which == 110 || eve.which == 190 || eve.which == 8)) {
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
            }
            else if (arr[1].length > 1) {
                eve.preventDefault();
            }
            else {
            }
        }       
    }
    //==============================================================================================================================================================
    $scope.CancelET = function () {
        $location.path('/ARTCycle/');
    }
    //==============================================================================================================================================================
    $scope.valiadeEndometriumThick = function (val, eve) {
        debugger;
        var isDecimal = false;
        if (angular.isDefined(val)) {
            var count = val.split('.').length - 1;
            isDecimal = val.indexOf(".") == -1 ? false : true;
        }
        if (!isDecimal && angular.isDefined(val)) {
            if (val.length < 2) {
                if (val.length <= 1 && ([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 190, 8].indexOf(eve.which) > -1)) {
                }
                else eve.preventDefault();
            }
            else if (val.length == 2 && (eve.which == 110 || eve.which == 190 || eve.which == 8)) {
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
            }
            else if(eve.which == 127)
            {
                //delete
            }
            else if (arr[1].length > 0) {
                eve.preventDefault();
            }
            else {
            }
        }
    }

    $scope.ValidationMsg = function (Msg) {
        AlertMessage.error("PalashIVF", Msg);
    }

});
/* https://github.com/wender/angular-multiple-file-upload */
PIVF.directive('fileUploadfortransfer', ['$timeout', function ($timeout) {
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
                maxWidth = 100,
                maxHeight = 100,
                sel;

            fileName = attr.name || 'userFile';
            shareCredentials = attr.credentials === 'true';
            withPreview = attr.preview === 'true';
            resize = attr.resize === 'true';
            maxWidth = angular.isDefined(attr.maxWidth) ? parseInt(attr.maxWidth) : false;
            maxHeight = angular.isDefined(attr.maxHeight) ? parseInt(attr.maxHeight) : false;
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
                    if (scope.ngModel != undefined) {
                        if (scope.ngModel.length == 0) {
                            scope.ngModel = [];
                        }
                    }
                    //else {
                    //    scope.ngModel = [];
                    //}
                }
                var f;
                debugger;
                if (scope.ngModel.length <= 4) { //&& files.length <= 4
                    for (var i = 0; i < files.length && i <= 4; i++) {
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
                            upload(f, scope.ngModel.length - 1, files[i]);
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


PIVF.directive('allowDecimalNumbers', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, elm, attrs, ngModel, ctrl) {
            elm.on('keydown', function (event) {
                debugger;
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
                debugger;
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