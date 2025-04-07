angular.module('PIVF').controller('ConsentViewCtr', function ($scope, $rootScope, AlertMessage, srvCommon, DataFactory, $uibModal, $location, Common, ConsentViewSrv) {
    $rootScope.CycleDetails = null;
    $rootScope.Allergies = null;
    $rootScope.IsFemaleActive = false;
    $rootScope.IsMaleActive = false;
    $rootScope.IsCycleActive = false;
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $scope.model = {};
    $scope.ConsentDetails = {};
    $scope.ConsentDetails.LinkDetails = [];
    var objResource = {};
    $scope.GetData = {};
    $scope.GetData = DataFactory.getObj(); //ROHINI TO GET VIEW TEMPLATE DATA
    //to set msg
    if (angular.isDefined(objResource) && angular.equals(    { }, objResource)) {
        objResource = srvCommon.get();
    }                     
    
    $scope.PageSetup = function () {      
        $scope.GetARTTypeList();
        $scope.GetPatientCategoryList();
        //To GET Template ID When View Grid Data
        if (angular.isDefined($scope.GetData) && !angular.equals({}, $scope.GetData)) {            
            if ($scope.GetData.ID > 0) {
                $scope.GetConsentByID();
                DataFactory.clearObj();
            }
        }
        $scope.GetUserrights();
    }
    $scope.GetConsentByID = function()
    {           
        var ResponseData = ConsentViewSrv.GetConsentByID($scope.GetData.ID);
        ResponseData.then(function (Response) {
            
            if (Response.data != null) {
                $scope.ConsentDetails = Response.data;
                $scope.form = JSON.parse($scope.ConsentDetails.FormDesc);
                $scope.schema = JSON.stringify($scope.ConsentDetails.SchemaDesc);
                //$scope.htmlForm = JSON.stringify($scope.ConsentDetails.HTMLDesc);
                $scope.model = JSON.stringify($scope.ConsentDetails.ModelDesc);
                $scope.htmlForm = $scope.ConsentDetails.HTMLDesc;
             }
           }, function (error) {
         $scope.Error = error;
        });
    }
    $scope.AddLink = function () {
        debugger;

        if ($scope.ArtType.ID > 0 && $scope.ArtSubType.ID > 0)
        {
            if ($scope.ConsentDetails.LinkDetails.length > 0) {
                $scope.IsDuplicate = false;
               // angular.forEach($scope.ConsentDetails.LinkDetails, function (Item) {
                for(i=0;i<$scope.ConsentDetails.LinkDetails.length;i++) {
                    if ($scope.ConsentDetails.LinkDetails[i].PatientCategoryID == $scope.PatientCategory.ID && $scope.ConsentDetails.LinkDetails[i].ARTSubTypeID == $scope.ArtSubType.ID && $scope.ConsentDetails.LinkDetails[i].ARTTypeID == $scope.ArtType.ID) {
                        //AlertMessage.info("Check Duplicate Record");//commented by swatih for localization 24/7/2020
                        AlertMessage.info(objResource.msgTitle, objResource.msgCheckDuplicateRecord);//Modified by swatih for localization 24/7/2020
                        $scope.IsDuplicate = true;
                        break;
                    }
                    else {
                        $scope.IsDuplicate = false;
                    }
                }          
                if ($scope.IsDuplicate == false) {
                    $scope.Item = { 'ID': 0, 'PatientCategoryID': $scope.PatientCategory.ID, 'ARTTypeID': $scope.ArtType.ID, 'ARTSubTypeID': $scope.ArtSubType.ID, 'PCategoryDesc': $scope.PatientCategory.Description, 'ARTTypeDesc': $scope.ArtType.Description, 'ARTSubTypeDesc': $scope.ArtSubType.Description, 'Status': true }
                    $scope.ConsentDetails.LinkDetails.push($scope.Item);
                    $scope.PatientCategory = $scope.PatientCategoryList[0];
                    $scope.ArtType = $scope.ARTTypeList[0];
                    $scope.ARTSubTypeList = [];
                    $scope.ARTSubTypeList.splice(0, 0, { ID: 0, Description: "Select" });
                    $scope.ArtSubType = $scope.ARTSubTypeList[0];
                }
               
            }
            else {
                $scope.Item = { 'ID': 0, 'PatientCategoryID': $scope.PatientCategory.ID, 'ARTTypeID': $scope.ArtType.ID, 'ARTSubTypeID': $scope.ArtSubType.ID, 'PCategoryDesc': $scope.PatientCategory.Description, 'ARTTypeDesc': $scope.ArtType.Description, 'ARTSubTypeDesc': $scope.ArtSubType.Description, 'Status': true }
                $scope.ConsentDetails.LinkDetails.push($scope.Item);
                $scope.PatientCategory = $scope.PatientCategoryList[0];
                $scope.ArtType = $scope.ARTTypeList[0];
                $scope.ARTSubTypeList = [];
                $scope.ARTSubTypeList.splice(0, 0, { ID: 0, Description: "Select" });
                $scope.ArtSubType = $scope.ARTSubTypeList[0];
            }
        }
        else
        {
            $scope.frmLink.ddlARTType.$dirty = true;
            $scope.frmLink.ddlSubType.$dirty = true
            $scope.frmLink.ddlPCategory.$dirty = true;            
            $scope.ARTSubTypeList = [];
            $scope.ARTSubTypeList.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ArtSubType = $scope.ARTSubTypeList[0];
        }      
    }
    $scope.RemoveAddDrugRow = function (Index) {                
            $scope.ConsentDetails.LinkDetails.splice(Index, 1);     
    };
    $scope.ArtType = {};
    $scope.ArtSubType = {};

    $scope.GetPatientCategoryList = function GetPatientCategoryList() {
        var ResponseData = Common.getMasterList('M_PatientCategoryMaster', 'ID', 'Description');
        ResponseData.then(function (Response) {
            debugger;
            Response.data.splice(0, 0, { ID: 0, Description: "Patient Category" });
            $scope.PatientCategoryList = [];
            $scope.PatientCategoryList = Response.data;           
         

            $scope.PatientCategory = $scope.PatientCategoryList[0];
        }, function (error) {
        });
    };

    $scope.GetARTTypeList = function GetARTTypeList() {
        var ResponseData = Common.getMasterList('M_ARTType', 'ID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "ART Type" });
            $scope.ARTTypeList = Response.data;
            $scope.ARTSubTypeList = [];
            $scope.ARTSubTypeList.splice(0, 0, { ID: 0, Description: "ART Sub Type" });

            $scope.ArtType = $scope.ARTTypeList[0];
            $scope.ArtSubType = $scope.ARTSubTypeList[0];
        }, function (error) {
        });
    };

    $scope.GetArtSubTypeList = function (ArtType) {
        if (ArtType.ID != 0 && $scope.PatientCategory.ID != 0) {
            var ResponseData = Common.GetArtSubTypeList(ArtType.ID, $scope.PatientCategory.ID);
            ResponseData.then(function (Response) {
                debugger;
                Response.data.splice(0, 0, { ID: 0, Description: "ART Sub Type" });
                $scope.ARTSubTypeList = Response.data;
                $scope.ArtSubType = $scope.ARTSubTypeList[0];
            }, function (error) {
            });
        }
        else   {
            $scope.ARTSubTypeList = [];
            $scope.ARTSubTypeList.splice(0, 0, { ID: 0, Description: "ART Sub Type" });           
            $scope.ArtSubType = $scope.ARTSubTypeList[0];

        }
    }

    String.prototype.replaceAt = function (index, replacement) {        
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    $scope.OpenForm = function (templateUrl) {
        
        var modalInstance = $uibModal.open({         // for open pop up for cancel reason
            templateUrl: templateUrl,
            controller: 'ShowForm',
            backdrop: false,
            keyboard: false,
            size: 'lg',
            resolve: {
                htmlForm: function () {
                    return $scope.htmlForm;
                }
            }
        });
        modalInstance.result.then(function (data) {
            debugger
            if (!angular.equals({}, data)) { 
                Item.Reason = data;              
            }
            else {
                AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
            }
        })
    } 
    $scope.submitForm = function (form, model) {
        
        $scope.$broadcast('schemaFormValidate');
        console.log(form);
        console.log(model);
    }
    $scope.SaveForm = function()
    {
        debugger;
        if ($scope.frmLink.txtCode.$valid && $scope.frmLink.txtDescription.$valid)
        {
            $scope.UpdateForm();
            $scope.ConsentDetails = $scope.ConsentDetails;
            $scope.ConsentDetails.FormDesc = JSON.stringify($scope.form);
            $scope.ConsentDetails.SchemaDesc = JSON.stringify($scope.schema);
            //$scope.ConsentDetails.HTMLDesc = JSON.stringify($scope.htmlForm);
            $scope.ConsentDetails.HTMLDesc = $scope.htmlForm;
            $scope.ConsentDetails.ModelDesc = JSON.stringify($scope.model);

            var ResponseData = ConsentViewSrv.SaveConsent($scope.ConsentDetails);
            ResponseData.then(function (Response) {
                debugger;
                if (Response.data ==3) {
                    //AlertMessage.warning("PalashIVF", "Duplicate Code.");//Commented by swatih for localization 24/7/2020
                    AlertMessage.warning(objResource.msgTitle, objResource.msgDuplicateCode);//Modified by swatih for localization 24/7/2020
                    //$scope.GetConsentByID();
                    $location.path("/ConsentMaster/");

                }
                else if (Response.data >= 1) {
                    //AlertMessage.success("Data Saved Successfully");//Commented by swatih for localization 24/7/2020
                    AlertMessage.success(objResource.msgTitle, objResource.msgDataSavedSuccessfully);//Modified by swatih for localization 24/7/2020
                    //$scope.GetConsentByID();
                    $location.path("/ConsentMaster/");

                }
            }, function (error) {
                $scope.Error = error;
            });
        }
        else {
            $scope.frmLink.txtCode.$dirty = true;
            $scope.frmLink.txtDescription.$dirty = true;
        }     
    }
    $scope.UpdateForm = function () {
        $scope.PatientDetails = {};
        $scope.PatientDetails.PName = '{{PName}}';
        $scope.PatientDetails.PAge = '{{PAge}}';
        $scope.PatientDetails.PAddr = '{{PAddr}}';
        $scope.PatientDetails.SName = '{{SName}}';
        $scope.PatientDetails.SAge = '{{SAge}}';
        $scope.PatientDetails.SAddr = '{{SAddr}}';
        $scope.PatientDetails.MDName = '{{MDName}}';
        $scope.PatientDetails.MDMrn = '{{MDMrn}}';
        $scope.PatientDetails.MDAddr = '{{MDAddr}}';
        $scope.PatientDetails.FDName = '{{FDName}}';
        $scope.PatientDetails.FDMrn = '{{FDMrn}}';
        $scope.PatientDetails.FDAddr = '{{FDAddr}}';
        $scope.PatientDetails.DocName = '{{DocName}}';
        $scope.PatientDetails.SurrName = '{{SurrName}}';
        $scope.PatientDetails.SurrAge = '{{SurrAge}}';
        $scope.PatientDetails.SurrAddr = '{{SurrAddr}}';
        $scope.PatientDetails.SurrSName = '{{SurrSName}}';
        $scope.PatientDetails.SurrSAge = '{{SurrSAge}}';
        $scope.PatientDetails.SurrSAddr = '{{SurrSAddr}}';
        
        var i = -1;
        var ch_ind = [];
        var tb_ind = [];
        var dt_ind = [];
        while ((i = $scope.htmlForm.indexOf("checkbox1", i + 1)) != -1) {
            ch_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("input1", i + 1)) != -1) {
            tb_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("datepicker1", i + 1)) != -1) {
            dt_ind.push(i);
        }
        for (var j = 0; j < ch_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(ch_ind[j] + 8, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < tb_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(tb_ind[j] + 5, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < dt_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(dt_ind[j] + 10, String.fromCharCode(49 + j));
        }
        $scope.schema = {
            "type": "object",
            "title": "Consent",
            "properties": {
                "template1": {
                    "type": "template",
                    "title": "Consent"
                }
            }
        };
        $scope.form = [
            {
                type: "template",
                name: "template1",
                template: $scope.htmlForm,
                doctorname: $scope.myname,
                checkbox1: false,
                checkbox2: false,
                checkbox3: false,
                checkbox4: false,
                checkbox5: false,
                checkbox6: false,
                checkbox7: false,
                checkbox8: false,
                checkbox9: false,
                checkbox10: false,
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: '',
                input7: '',
                input8: '',
                input9: '',
                input10: '',
                datepicker1: '',
                datepicker2: '',
                datepicker3: '',
                datepicker4: '',
                datepicker5: '',
                datepicker6: '',
                datepicker7: '',
                datepicker8: '',
                datepicker9: '',
                datepicker10: '',
                PName: $scope.PatientDetails.PName,
                PAge: $scope.PatientDetails.PAge,
                PAddr: $scope.PatientDetails.PAddr,
                SName: $scope.PatientDetails.SName,
                SAge: $scope.PatientDetails.SAge,
                SAddr: $scope.PatientDetails.SAddr,
                MDName: $scope.PatientDetails.MDName,
                MDMrn: $scope.PatientDetails.MDMrn,
                MDAddr: $scope.PatientDetails.MDAddr,
                FDName: $scope.PatientDetails.FDName,
                FDMrn: $scope.PatientDetails.FDMrn,
                FDAddr: $scope.PatientDetails.FDAddr,
                DocName: $scope.PatientDetails.DocName,
                SurrName: $scope.PatientDetails.SurrName,
                SurrAge: $scope.PatientDetails.SurrAge,
                SurrAddr: $scope.PatientDetails.SurrAddr,
                SurrSName: $scope.PatientDetails.SurrSName,
                SurrSAge: $scope.PatientDetails.SurrSAge,
                SurrSAddr: $scope.PatientDetails.SurrSAddr,
            },
        ];
    }
    $scope.showPDF = function () {
        debugger;
        $scope.UpdateForm();
        html2canvas(document.getElementById('consentForm'), {
            dpi: 144,
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                console.log(data);
                var docDefinition = {
                    content: [{
                        image: data
                    }]
                };
                pdfMake.createPdf(docDefinition).open();
            }
        });
    }
    //$scope.Cancel = function () {
    //    $uibModalInstance.dismiss('cancel');
    //}
    $scope.Cancel = function()
    {
        DataFactory.clearObj();
        $location.path("/ConsentMaster/");
    }

    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
        for (var z = 0; z <= lstUserRights.length - 1; z++) {
            if (lstUserRights[z].MenuId == 105 && lstUserRights[z].Active)// Consent
            {
                $scope.objRgt = lstUserRights[z];
                break;
            }
        }
        //    if (!$scope.objRgt.IsCreate ) {
        //        angular.element(btnSave).prop('disabled', true);
        //}
        if (!$scope.objRgt.IsUpdate) {
            angular.element(btnSave).prop('disabled', true);
        }
        else {
            angular.element(btnSave).prop('disabled', false);
        }
    }
});
PIVF.controller('ShowForm', function ($rootScope, $scope, htmlForm, $uibModalInstance, $filter) {
    $scope.PatientDetails = {};
    //$scope.PatientDetails.data = "Rohini";
    $scope.PatientDetails.PName = '{{PName}}';
    $scope.PatientDetails.PAge = '{{PAge}}';
    $scope.PatientDetails.PAddr = '{{PAddr}}';
    $scope.PatientDetails.SName = '{{SName}}';
    $scope.PatientDetails.SAge = '{{SAge}}';
    $scope.PatientDetails.SAddr = '{{SAddr}}';
    $scope.PatientDetails.MDName = '{{MDName}}';
    $scope.PatientDetails.MDMrn = '{{MDMrn}}';
    $scope.PatientDetails.MDAddr = '{{MDAddr}}';
    $scope.PatientDetails.FDName = '{{FDName}}';
    $scope.PatientDetails.FDMrn = '{{FDMrn}}';
    $scope.PatientDetails.FDAddr = '{{FDAddr}}';
    $scope.PatientDetails.DocName = '{{DocName}}';
    $scope.PatientDetails.SurrName = '{{SurrName}}';
    $scope.PatientDetails.SurrAge = '{{SurrAge}}';
    $scope.PatientDetails.SurrAddr = '{{SurrAddr}}';
    $scope.PatientDetails.SurrSName = '{{SurrSName}}';
    $scope.PatientDetails.SurrSAge = '{{SurrSAge}}';
    $scope.PatientDetails.SurrSAddr = '{{SurrSAddr}}';

    $scope.htmlForm = htmlForm;
    $scope.updateForm = function () {
        
        var i = -1;
        var ch_ind = [];
        var tb_ind = [];
        var dt_ind = [];
        while ((i = $scope.htmlForm.indexOf("checkbox1", i + 1)) != -1) {
            ch_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("input1", i + 1)) != -1) {
            tb_ind.push(i);
        }
        i = -1;
        while ((i = $scope.htmlForm.indexOf("datepicker1", i + 1)) != -1) {
            dt_ind.push(i);
        }        
        for (var j = 0; j < ch_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(ch_ind[j] + 8, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < tb_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(tb_ind[j] + 5, String.fromCharCode(49 + j));
        }
        for (var j = 0; j < dt_ind.length; j++) {
            if (j === 0) continue;
            $scope.htmlForm = $scope.htmlForm.replaceAt(dt_ind[j] + 10, String.fromCharCode(49 + j));
        }
        $scope.schema = {
            "type": "object",
            "title": "Consent",
            "properties": {
                "template1": {
                    "type": "template",
                    "title": "Consent"
                }
            }
        };
        $scope.form = [
          {
              type: "template",
              name: "template1",
              template: $scope.htmlForm,
              doctorname: $scope.myname,
              checkbox1: false,
              checkbox2: false,
              checkbox3: false,
              checkbox4: false,
              checkbox5: false,
              checkbox6: false,
              checkbox7: false,
              checkbox8: false,
              checkbox9: false,
              checkbox10: false,
              input1: '',
              input2: '',
              input3: '',
              input4: '',
              input5: '',
              input6: '',
              input7: '',
              input8: '',
              input9: '',
              input10: '',
              datepicker1: '',
              datepicker2: '',
              datepicker3: '',
              datepicker4: '',
              datepicker5: '',
              datepicker6: '',
              datepicker7: '',
              datepicker8: '',
              datepicker9: '',
              datepicker10: '',
             //data: $scope.PatientDetails.data,
              PName: $scope.PatientDetails.PName,
              PAge: $scope.PatientDetails.PAge,
              PAddr: $scope.PatientDetails.PAddr,
              SName: $scope.PatientDetails.SName,
              SAge: $scope.PatientDetails.SAge,
              SAddr: $scope.PatientDetails.SAddr,
              MDName: $scope.PatientDetails.MDName,
              MDMrn: $scope.PatientDetails.MDMrn,
              MDAddr: $scope.PatientDetails.MDAddr,
              FDName: $scope.PatientDetails.FDName,
              FDMrn: $scope.PatientDetails.FDMrn,
              FDAddr: $scope.PatientDetails.FDAddr,
              DocName: $scope.PatientDetails.DocName,
              SurrName: $scope.PatientDetails.SurrName,
              SurrAge: $scope.PatientDetails.SurrAge,
              SurrAddr: $scope.PatientDetails.SurrAddr,
              SurrSName: $scope.PatientDetails.SurrSName,
              SurrSAge: $scope.PatientDetails.SurrSAge,
              SurrSAddr: $scope.PatientDetails.SurrSAddr,            
          },
        ];
        console.log($scope.form);

    }
    $scope.showPDF = function () {
        
        html2canvas(document.getElementById('consentForm'), {
            dpi: 144,
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                console.log(data);
                var docDefinition = {
                    content: [{
                        image: data
                    }]
                };
                pdfMake.createPdf(docDefinition).open();
            }
        });
    }
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
});
