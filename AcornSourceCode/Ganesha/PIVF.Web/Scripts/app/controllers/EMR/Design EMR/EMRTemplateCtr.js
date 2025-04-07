
'use strict';
angular.module('PIVF').controller('EMRTemplateCtr', function ($rootScope, $scope, EMRTemplateSrv, DesignEMRSrv , $location, Common, $uibModal, AlertMessage, usSpinnerService) {

    // $rootScope.FormName = 'EMR Template';

    $rootScope.CycleDetails = null;
    debugger;
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    var FormID = Common.getTempID();
    var TempID = Common.getUltraTempID(); 
 
    
    Common.clearTempID();
    Common.clearUltraTempID();
    $scope.hideDICOM=(FormID===3)? false :true;
    $rootScope.FormName = Common.getString();
    Common.clearString();
    $scope.btnSaveUpdatetext = 'Save';  // Added by Nayan 

    //selected patient set 
    var selectPatient = {};
    selectPatient = Common.getSelectedPatient();    
    if(FormID == 10012)
    {
        selectPatient.VisitID = 0 
        selectPatient.VisitUnitID = 0
    }
    usSpinnerService.spin('GridSpinner');
    $scope.DesignEMRVO = {};
    $scope.form = [];
    $scope.schema = {
        "type": "object",
        "title": "",
        "properties": {},
        "required": [],
        "format": "object"
    };
    var fileuploadtags = {
        "add": "Open file browser",
        "preview": "Preview Upload",
        "filename": "File Name",
        "progress": "Progress Status",
        "upload": "Upload",
        "dragorclick": "Drag and drop your file here or click here"
    };
    var fileuploadimg = {
        "title": "Image (Label coming from form definition)",
        "type": "array",
        "format": "singlefile",
        "x-schema-form": {
            "type": "array"
        },
        "pattern": {
            "mimeType": "image/*",
            "validationMessage": "Incorrect file type: "
        },
        "maxSize": {
            "maximum": "2MB",
            "validationMessage": "Allowed file size exceeded: ",
            "validationMessage2": "Current file size: "
        },
        "maxItems": {
            "validationMessage": "More files were uploaded than allowed."
        },
        "minItems": {
            "validationMessage": "You must upload at least one file"
        }
    }
    $scope.model = {};
    $scope.TemplateDetailList = [];
    //for sorting grid data
    $scope.SortColumn1 = "TempDate";
    // $scope.reverseSort1 = true;  //alresdy added for comment sujata coross clinic
    $scope.reverseSort1 = false;    // new  added for comment sujata coross clinic
    
     $scope.openDICOMLink = function () {

       if($scope.DesignEMRVO.DICOMLink !==null || $scope.DesignEMRVO.DICOMLink !== undefined || $scope.DesignEMRVO.DICOMLink !=='' )
        window.open($scope.DesignEMRVO.DICOMLink);
    }

    $scope.ViewAllDICOM = function() {
         var response = DesignEMRSrv.GetAllDICOMStudies('FollicularScan'); //Get Visit list For selected patient
            response.then(function (resp) {

                if (resp.data.length > 0) { //Go cursor this scope when multiple visit

                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'DICOMList',
                        controller: 'DICOMListInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            VisitInfo: function () {
                                return resp.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) {
                     window.open(data.StudyLink)
                    });
                 }
                 else{
                     AlertMessage.info('Multiply IVF', 'No Study Found.');
                 }
            });
    
    }


    $scope.SortData1 = function (column) {
        // $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : false;// alresdy added for comment sujata coross clinic
        $scope.reverseSort1 = ($scope.SortColumn1 == column) ? !$scope.reverseSort1 : true; // new  added for comment sujata coross clinic

        $scope.SortColumn1 = column;
        if ($scope.SortColumn1 == column)
            $scope.sortClass1 = $scope.reverseSort1 ? 'arrow-down' : 'arrow-up';
        else $scope.sortClass1 = '';
    }
    //BY ROHINI TO GET TEMPLATE BY ID

    $scope.GetTemplateByFormID = function GetTemplateByFormID() {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData1 = DesignEMRSrv.GetTemplateByFormID(FormID, TempID, $scope.Sessionobj);
        ResponseData1.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {
                debugger;
                if (Response.data.length > 1) { //Go cursor this scope when multiple visit
                    var modalInstance = $uibModal.open({         // for open pop up for cancel reason
                        templateUrl: 'modelID',
                        controller: 'modelInfo',
                        backdrop: false,
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            ResponseData1: function () {
                                return Response.data;
                            }
                        }
                    });
                    modalInstance.result.then(function (data) { // return here after cancel reason entered
                        if (!angular.equals({}, data)) {

                            //tempplate set
                            $scope.DesignEMRVO = data;
                            //FOR FIRST time added template which do not have scema and editor data
                            if (data.EditorSchema != null)
                                $scope.data = JSON.parse(data.EditorSchema);
                            else {

                                $scope.data = [{
                                    'id': 1,
                                    'title': $scope.DesignEMRVO.TempName,
                                    'description': '',
                                    'appliesTo': $scope.DesignEMRVO.GenderID,
                                    'templateType': $scope.DesignEMRVO.FormID,
                                    'depth': 0,
                                    'nodes': [
                                    {
                                        'id': 11,
                                        'title': 'Section1',
                                        'depth': 1,
                                        'nodes': [
                                        ]
                                    },
                                    ]
                                }];
                            }
                            $scope.schema = JSON.parse(data.SchemaDecription);
                            $scope.form = JSON.parse(data.FormDecription);
                            console.warn(">>>>>>>>>>>>>>>>>>>>>>> $scope.schema " , $scope.schema );
                            console.warn(">>>>>>>>>>>>>>>>>>>>>>> $scope.form " , $scope.form);
                            debugger
                            if (data.ModelDescription != null)
                                $scope.model = JSON.parse(data.ModelDescription);
                                $scope.showJson();
                            $scope.ListAllTemplateList(data.ID);
                        }
                    });
                }
                else {
                    //tempplate set
                    $scope.DesignEMRVO = Response.data[0];
                    //FOR FIRST time added template which do not have scema and editor data
                    if (Response.data[0] != null && Response.data[0] != undefined) {
                        if (Response.data[0].EditorSchema != undefined) {
                            if (Response.data[0].EditorSchema != null)
                                $scope.data = JSON.parse(Response.data[0].EditorSchema);
                            else {
                                $scope.data = [{
                                    'id': 1,
                                    'title': $scope.DesignEMRVO.TempName,
                                    'description': '',
                                    'appliesTo': $scope.DesignEMRVO.GenderID,
                                    'templateType': $scope.DesignEMRVO.FormID,
                                    'depth': 0,
                                    'nodes': [
                                    {
                                        'id': 11,
                                        'title': 'Section1',
                                        'depth': 1,
                                        'nodes': [
                                        ]
                                    },
                                    ]
                                }];
                            }

                        }
                        else {
                            $scope.data = [{
                                'id': 1,
                                'title': $scope.DesignEMRVO.TempName,
                                'description': '',
                                'appliesTo': $scope.DesignEMRVO.GenderID,
                                'templateType': $scope.DesignEMRVO.FormID,
                                'depth': 0,
                                'nodes': [
                                {
                                    'id': 11,
                                    'title': 'Section1',
                                    'depth': 1,
                                    'nodes': [
                                    ]
                                },
                                ]
                            }];
                        }
                        $scope.schema = JSON.parse(Response.data[0].SchemaDecription);
                        $scope.form = JSON.parse(Response.data[0].FormDecription);
                        console.warn(">>>>>>>>>>>>>>>>>>>>>>> $scope.schema " , $scope.schema );
                        console.warn(">>>>>>>>>>>>>>>>>>>>>>> $scope.form " , $scope.form);
                        debugger
                        if (Response.data[0].ModelDescription != null)
                            $scope.model = JSON.parse(Response.data[0].ModelDescription);
                        $scope.showJson();
                        debugger
                        console.warn(">>>>>>>>>>>>>>>>>>>>>>> $scope.form " , $scope.form);
                        console.warn(">>>>>>>>>>>>>>>>>>>>>>> $scope.schema " , $scope.schema );
                        $scope.ListAllTemplateList(Response.data[0].ID);
                        //$rootScope.FormName = $scope.DesignEMRVO.TempName;
                        //disale if not visit except laproscopy histroscopy HSG
                        if ($scope.DesignEMRVO.FormID != 1 && $scope.DesignEMRVO.FormID != 2 && $scope.DesignEMRVO.FormID != 4) {
                            if ((selectPatient.VisitID == 0 && selectPatient.VisitUnitID == 0 && FormID !== 10012) || (selectPatient.VisitID == undefined && selectPatient.VisitUnitID == undefined))
                            //if ($scope.DesignEMRVO.VisitID == selectPatient.VisitID && $scope.DesignEMRVO.VisitUnitID == selectPatient.VisitUnitID)

                                $scope.IsVisitMarked = true;
                            else
                                $scope.IsVisitMarked = false;
                        }                        
                    }
                    else {
                        $scope.IsVisitMarked = true;
                    }
                   
                }

            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.updated=function updated(modelValue, form)
    {
        if (angular.isDefined(form.key))
        {
            if(form.key[0]==="c10401c" || form.key[0] ==="c10402c" || form.key[0]==="c10403c")
            {
              
                if( angular.isDefined($scope.model['c10401c']) && angular.isDefined($scope.model['c10402c']) && angular.isDefined($scope.model['c10403c']))
                {
               
                    var calulatedValue = $scope.model['c10401c'] * $scope.model['c10402c'] * $scope.model['c10403c'] * 0.523;
                    $scope.model['c10404c'] = calulatedValue.toFixed(2);
                }
                //Shall Auto calculate Approx.Volume in CC as  Length*Height*Width*0.523 
            }
            if (form.key[0] === "c10601c" || form.key[0] === "c10602c" || form.key[0] === "c10603c") {
                
                if (angular.isDefined($scope.model['c10601c']) && angular.isDefined($scope.model['c10602c']) && angular.isDefined($scope.model['c10603c'])) {
                    
                    var temp = $scope.model['c10601c'] * $scope.model['c10602c'] * $scope.model['c10603c'] * 0.523;
                    $scope.model['c10604c'] = temp.toFixed(2);
                }
                //Shall Auto calculate Approx.Volume in CC as  Length*Height*Width*0.523 
            }
            
        }
       

    }

    $scope.showJson = function () {
        $scope.IsFormShow = 1;//rohini
        $scope.IsSave = 1;//rohini;
        $scope.data = $scope.data;
        $scope.form = [];
        if ($scope.schema == null) {
            $scope.schema = {
                "type": "object",
                "title": "",
                "properties": {},
                "required": [],
                "format": "object"
            };
        }
        console.warn("?????????<>>>>>>>>>>>>>>>>>> $scope.data" , $scope.data );
        debugger
        $scope.data[0].nodes.forEach(function (node) {
            var insection = false;
            var sindex = 0;
            $scope.schema.title = node.title;
            var fieldset;
            if (!insection)
                fieldset = { type: 'fieldset', title: node.title, items: [] };
            //else
            //    $scope.form[sindex].items = [];
            var fileupload = null;
            node.nodes.forEach(function (innernode) {
                if (innernode.name) {
                    var propname = innernode.name.toLowerCase();
                    $scope.schema.properties[propname] = { title: '', type: '', pattern: '', description: '' };
                    $scope.schema.properties[propname].title = innernode.title;
                    if (innernode.fieldAttr)
                        $scope.schema.properties[propname].defaulval = innernode.fieldAttr.dtext;
                    if (innernode.isReq)
                        $scope.schema.required.push(propname);

                    if (innernode.fieldType && innernode.fieldType === 'Text') {
                        $scope.schema.properties[propname].type = 'string';
                        $scope.model[propname] = innernode.fieldAttr.dtext;
                        if (innernode.fieldAttr.isSingle === 1) {
                            if (innernode.row == 1) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-12", "condition": innernode.condition });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                            }
                            else {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                            }
                        }
                        else {
                            if (innernode.row == 1) {
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-12", "condition": innernode.condition });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-6",  "fieldHtmlClass": "customTemplateClass", "condition": innernode.condition });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-4", "condition": innernode.condition });
                            }
                            else {
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-3", "condition": innernode.condition });
                            }
                        }
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Boolean') {
                        $scope.schema.properties[propname].type = 'boolean'
                        if (innernode.fieldAttr.isRadio == 0) {
                            if (innernode.row == 1) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-12", "condition": innernode.condition });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                            }
                            else if (innernode.row == 4) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                            }
                        } else {
                            if (innernode.row == 1) {
                                fieldset.items.push({ 'key': propname, "condition": innernode.condition, 'type': 'radiobuttons', 'titleMap': [{ 'value': true, name: 'Yes' }, { 'value': false, name: 'No' }] });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ 'key': propname, "condition": innernode.condition, 'htmlClass': 'col-xs-6', 'type': 'radiobuttons', 'titleMap': [{ 'value': true, name: 'Yes' }, { 'value': false, name: 'No' }] });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ 'key': propname, "condition": innernode.condition, 'htmlClass': 'col-xs-4', 'type': 'radiobuttons', 'titleMap': [{ 'value': true, name: 'Yes' }, { 'value': false, name: 'No' }] });
                            }
                            else if (innernode.row == 4) {
                                fieldset.items.push({ 'key': propname, "condition": innernode.condition, 'htmlClass': 'col-xs-3', 'type': 'radiobuttons', 'titleMap': [{ 'value': true, name: 'Yes' }, { 'value': false, name: 'No' }] });
                            }

                        }
                        if (innernode.fieldAttr.dbool == 1)
                            $scope.model[propname] = true;
                        else
                            $scope.model[propname] = false;
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Decimal') {
                        $scope.schema.properties[propname].type = 'number';
                        $scope.schema.properties[propname].description = innernode.fieldAttr.unit;
                        $scope.schema.properties[propname].minimum = innernode.fieldAttr.mind;
                        $scope.schema.properties[propname].maximum = innernode.fieldAttr.maxd;
                        if (innernode.row == 1) {
                            fieldset.items.push({ 'key': propname, "htmlClass": "col-xs-12", onChange: "updated(modelValue,form)", "condition": innernode.condition });
                        }
                        else if (innernode.row == 2) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", onChange: "updated(modelValue,form)", "condition": innernode.condition });
                        }
                        else if (innernode.row == 3) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", onChange: "updated(modelValue,form)", "condition": innernode.condition });
                        }
                        else if (innernode.row == 4) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", onChange: "updated(modelValue,form)", "condition": innernode.condition });
                        }
                        $scope.model[propname] = Number(innernode.fieldAttr.ddecimal);

                    }
                    else if (innernode.fieldType && innernode.fieldType === 'File Upload') {

                        $scope.schema.properties[propname] = fileuploadimg;
                        $scope.schema.properties[propname].title = innernode.title;
                        fieldset.items.push({ 'key': propname, 'type': 'nwpFileUpload', 'endpoint': 'http://localhost:5000/api/DesignEMRFileUploadAPI/Add', 'i18n': fileuploadtags, "condition": innernode.condition });
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Date') {
                        $scope.schema.properties[propname].type = 'string'
                        $scope.schema.properties[propname].format = 'datepicker'
                        if (innernode.row == 1) {
                            fieldset.items.push({ "key": propname, "condition": innernode.condition });
                        }
                        else if (innernode.row == 2) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                        }
                        else if (innernode.row == 3) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                        }
                        else if (innernode.row == 4) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                        }
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Time Picker') {
                        $scope.schema.properties[propname].type = 'string'
                        $scope.schema.properties[propname].format = 'timepicker'
                        if (innernode.row == 1) {
                            fieldset.items.push({ "key": propname, "condition": innernode.condition });
                        }
                        else if (innernode.row == 2) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6", "condition": innernode.condition });
                        }
                        else if (innernode.row == 3) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "condition": innernode.condition });
                        }
                        else if (innernode.row == 4) {
                            fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "condition": innernode.condition });
                        }
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'Header') {
                        var htitle = "<h3>" + innernode.title + "</h3><hr/>"
                        fieldset.items.push({ "type": "help", "helpvalue": htitle, "condition": innernode.condition });
                    }
                    else if (innernode.fieldType && innernode.fieldType === 'List') {
                        if (innernode.fieldAttr.sfields) {
                            var slist = innernode.fieldAttr.sfields.split('\n');
                            if (innernode.fieldAttr.ismulti === '0') {
                                $scope.schema.properties[propname].type = 'string';
                                $scope.schema.properties[propname].enum = slist;
                                if (innernode.row == 1) {
                                    fieldset.items.push({ "key": propname, "htmlClass": "col-xs-12", "fieldHtmlClass": "customTemplateClassList", "condition": innernode.condition });
                                }
                                else if (innernode.row == 2) {
                                    fieldset.items.push({ "key": propname, "htmlClass": "col-xs-6",  "fieldHtmlClass": "customTemplateClassList", "condition": innernode.condition });
                                }
                                else if (innernode.row == 3) {
                                    fieldset.items.push({ "key": propname, "htmlClass": "col-xs-4", "fieldHtmlClass": "customTemplateClassList", "condition": innernode.condition });
                                }
                                else if (innernode.row == 4) {
                                    fieldset.items.push({ "key": propname, "htmlClass": "col-xs-3", "fieldHtmlClass": "customTemplateClassList", "condition": innernode.condition });
                                }
                            }
                            else {

                                $scope.schema.properties[propname].type = 'array';
                                $scope.schema.properties[propname].items = { type: "string" };
                                var ltitleMap = [];
                                slist.forEach(function (item) {
                                    ltitleMap.push({ value: item, name: item });
                                });
                                if (innernode.row == 1) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true } });
                                }
                                else if (innernode.row == 2) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true }, 'htmlClass': 'col-xs-6' });
                                }
                                else if (innernode.row == 3) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true }, 'htmlClass': 'col-xs-4' });
                                }
                                else if (innernode.row == 4) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true }, 'htmlClass': 'col-xs-3' });
                                }
                            }
                            $scope.model[propname] = innernode.fieldAttr.sdfield;
                        }
                    }
                }
            })
            $scope.form.push(fieldset);
        });
        //$scope.form.push({
        //    type: "submit",
        //    title: "Save"
        //});//to display forms Save button         
    };

    $scope.ShowUploadedImages = function () {
        debugger;
        var ResponseData = DesignEMRSrv.ShowUploadedImages();
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                $scope.DesignEMRVO.ListPatientImages = [];
                $scope.DesignEMRVO.ListPatientImages = Response.data;
            }
        });
    }
    $scope.RemoveImg = function (Item) {
        var ResponseData = DesignEMRSrv.DeleteUploadedImages(Item);
        ResponseData.then(function (Response) {

            if (Response.data == 1) {
                $scope.ShowUploadedImages();
            }
            else {
                AlertMessage.error("Error Occured While Deleting.");
            }
        });
    }
    $scope.RedirectToSelf = function (ID, UnitID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DesignEMRSrv.GetTemplateData(ID, UnitID);
        ResponseData.then(function (Response) {
            usSpinnerService.stop('GridSpinner');
            if (Response.data != null) {

                //tempplate set
                $scope.DesignEMRVO = Response.data;



               // if ($scope.DesignEMRVO.VisitID == Response.data.VisitID && $scope.DesignEMRVO.VisitUnitID == Response.data.VisitUnitID) {
                if ($scope.DesignEMRVO.VisitID == selectPatient.VisitID && $scope.DesignEMRVO.VisitUnitID == selectPatient.VisitUnitID) {

                $scope.IsVisitMarked = false;
                }
                else {
                    $scope.IsVisitMarked = true;
                }

                //FOR FIRST time added template which do not have scema and editor data
                if (Response.data.EditorSchema != null)
                    $scope.data = JSON.parse(Response.data.EditorSchema);
                else {

                    $scope.data = [{
                        'id': 1,
                        'title': $scope.DesignEMRVO.TempName,
                        'description': '',
                        'appliesTo': $scope.DesignEMRVO.GenderID,
                        'templateType': $scope.DesignEMRVO.FormID,
                        'depth': 0,
                        'nodes': [
                        {
                            'id': 11,
                            'title': 'Section1',
                            'depth': 1,
                            'nodes': [
                            ]
                        },
                        ]
                    }];
                }
                $scope.schema = JSON.parse(Response.data.SchemaDecription);
                $scope.form = JSON.parse(Response.data.FormDecription);
                if (Response.data.ModelDescription != null)
                    $scope.model = JSON.parse(Response.data.ModelDescription);
                //Added by Nayan Kamble START		              
                if ($scope.DesignEMRVO.TID > 0) {
                    $scope.btnSaveUpdatetext = 'Update';
                }
                //END
              
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.ListAllTemplateList = function (ID) {
        debugger;
        usSpinnerService.spin('GridSpinner');
        var ResponseData = DesignEMRSrv.ListAllTemplateList(ID);
        ResponseData.then(function (Response) {

            if (Response.data != null) {
                usSpinnerService.stop('GridSpinner');
                $scope.TemplateDetailList = Response.data;
            }
        }, function (error) {
            usSpinnerService.stop('GridSpinner');
            $scope.Error = error;
        });
    }
    $scope.SaveUpdateEMRTemplate = function () {
        $scope.$broadcast('schemaFormValidate');
        // Then we check if the form is valid
        if ($scope.myForm.$valid) {

            $scope.DesignEMRVO1 = $scope.DesignEMRVO;
            $scope.DesignEMRVO.FormID = FormID;
            $scope.DesignEMRVO.ModelDescription = JSON.stringify($scope.model);
            usSpinnerService.spin('GridSpinner');
            var ResponseData = DesignEMRSrv.SaveUpdateEMRTemplate($scope.DesignEMRVO);
            ResponseData.then(function (Response) {

                if (Response.data >= 1) {
                    AlertMessage.success("Saved Successfully");
                    //$scope.ClearForm();
                    $scope.PageInit();
                }
            }, function (error) {
                $scope.Error = error;
                usSpinnerService.stop('GridSpinner');
            });
        }
    }
    
    $scope.Clear = function () {
        //clear all 
        $scope.DesignEMRVO = {};
        $scope.form = [];
        $scope.schema = {
            "type": "object",
            "title": "",
            "properties": {},
            "required": [],
            "format": "object"
        };
        var fileuploadtags = {
            "add": "Open file browser",
            "preview": "Preview Upload",
            "filename": "File Name",
            "progress": "Progress Status",
            "upload": "Upload",
            "dragorclick": "Drag and drop your file here or click here"
        };
        var fileuploadimg = {
            "title": "Image (Label coming from form definition)",
            "type": "array",
            "format": "singlefile",
            "x-schema-form": {
                "type": "array"
            },
            "pattern": {
                "mimeType": "image/*",
                "validationMessage": "Incorrect file type: "
            },
            "maxSize": {
                "maximum": "2MB",
                "validationMessage": "Allowed file size exceeded: ",
                "validationMessage2": "Current file size: "
            },
            "maxItems": {
                "validationMessage": "More files were uploaded than allowed."
            },
            "minItems": {
                "validationMessage": "You must upload at least one file"
            }
        }
        $scope.model = {};
        $scope.TemplateDetailList = [];
        $scope.GetTemplateByFormID(); // init mathods
    }
    $scope.CancelMain = function CancelMain() {
        $rootScope.FormName = 'EMR Dashboard';
        $location.path("/EMRLandingPage");
    }
    //$scope.PageInit = function () {
      
    //    $scope.GetTemplateByFormID();

    //}
    //$scope.PageInit();    -- added comment by sujata 




  //added by sujata for male examination
    $scope.PageInit = function () {
      
        //$scope.GetTemplateByFormID();
        debugger;
        var resp = DesignEMRSrv.GetSubtemplatesList(FormID)
        resp.then(function (resp) {

            debugger;
            if (resp.data.length != 0) {                                              //added by sujata for ultra obs
                $scope.IsSubTemplate = true;
                $scope.SubTemplateList = resp.data;

                $scope.GetTemplateByFormID();

                if ($scope.SubTemplateList.length > 0) {
                    FormID = 6;
                }
            }
            else {
                $scope.GetTemplateByFormID();
            }

        }, function (err) {
            debugger;
        })
    }
    $scope.PageInit();

    $scope.SetFormID = function SetFormID(formid) {
        debugger;
        FormID = formid;
        angular.forEach($scope.SubTemplateList, function (item) {
            if (item.ID !== 0 && item.ID == formid) {
                $scope.SelectedTemplate = item.Description
                $scope.GetTemplateByFormID();
            }

        })

        $scope.GetTemplateByFormID();
    }



    //Start Report 
    $scope.PrintSemenAnalysis = function PrintSemenAnalysis(Item) {
        debugger;
        //var a = encodeURIComponent('U=' + Item.SNo + '&SNo=' + Item.SNo + '&V=' + $rootScope.CoupleDetails.FemalePatient.VisitID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID);       
        //$scope.DesignEMRVO.FormID

        var a = encodeURIComponent('U=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID + '&ID=' + Item.ID + '&P=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientID + '&PU=' + $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID +'&TemplateID=' + FormID);
        window.open('/Reports/EMR/TemplateReports/HystroscopyReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
    }

    //END Report
});

PIVF.controller('modelInfo', function ($scope, $uibModalInstance, ResponseData1, $timeout) {

    $scope.TemplateList = ResponseData1;
    $scope.Cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.SelectPatient = function (Item) {
        $timeout(function () {
            $uibModalInstance.close(Item);
        }, 1000);
    }
});


