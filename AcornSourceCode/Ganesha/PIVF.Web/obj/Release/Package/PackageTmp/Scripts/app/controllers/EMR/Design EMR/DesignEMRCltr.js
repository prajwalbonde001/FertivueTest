'use strict';
angular.module('PIVF.designemr').controller('DesignEMRCltr', ['$rootScope', '$scope', '$uibModal', 'DesignEMRSrv', 'AlertMessage', 'srvCommon', 'DataFactory', '$location', 'Common', 'swalMessages', function ($rootScope, $scope, $uibModal, DesignEMRSrv, AlertMessage, srvCommon, DataFactory, $location, Common, swalMessages) {    
    //Data Member 
    $rootScope.FormName = 'Template Designer';
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $rootScope.CycleDetails = null;
    $scope.DesignEMRVO = {}; //rohini
    $scope.IsSave = 0;
    $scope.IsModify = 0;
    $scope.IsFormShow = 0;
    $scope.treeChanged = false;
    $scope.nodeRemoved = false;
    $scope.animationsEnabled = true;
    //$scope.CurrentDate = new Date();   //Added by Nayan Kamble
    //// For Date-Picker     Added by Nayan Kamble
    //$scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    //$scope.format = $scope.formats[0];
    //$scope.altInputFormats = ['M!/d!/yyyy'];

    var objResource = {};
    $scope.GetData = {};
    $scope.GetData = DataFactory.getObj(); //ROHINI TO GET VIEW TEMPLATE DATA
    //to set msg
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    $scope.tmplType = [];
    $scope.form = [];
    $scope.form1 = [];
    $scope.schema = {
        "type": "object",
        "title": "",
        "properties": {},
        "required": [],
        "format": "object"
    };
    $scope.model = {};    
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
    $scope.Newform = false;
    $scope.formwithmodel = function () {
        $scope.Newform = true;
        $scope.schema1 = {};     
        $scope.model1 = {};
        $scope.schema1 = $scope.schema;      
        $scope.model1=$scope.model;
    }
    $scope.$watch('model', function (value) {
        if (value) {
            $scope.prettyModel = JSON.stringify(value, undefined, 2);
           // console.log($scope.model);
        }
    }, true);
    $scope.$watch('treeChanged', function (value) {
         
        if (value) {
             
            $scope.showJson();
            $scope.treeChanged = false;
        }
    }, true);
    $scope.$watch('nodeRemoved', function (value) {
         
        if (value) {
             
            $scope.showJson();
            $scope.nodeRemoved = false;
        }
    }, false);
    $scope.updated = function (modelValue, form) {
         
        //newly commented by rohini
        //if (modelValue === undefined) {
        //    console.log('set');
        //    $scope.$broadcast('schemaForm.error.' + form.key[0], 'exceedsThreeDecimals', true);
        //    return;
        //}       
        //var valid = ((modelValue != '') && /^\d*\.?\d{1,3}$/.test(modelValue));
        //if (!valid) {
        //    console.log('unset');
        //    $scope.$broadcast('schemaForm.error.' + form.key[0], 'exceedsThreeDecimals', 'Cannot exceed beyond 3 decimals');
        //}
        //else {
        //    console.log('set');
        //    $scope.$broadcast('schemaForm.error.' + form.key[0], 'exceedsThreeDecimals', true);
        //}
        //console.log(form.key[0]);
    }
    $scope.showJson = function () {
        debugger;
        $scope.IsFormShow = 1;//rohini
        $scope.IsSave = 1;//rohini;
        $scope.data = $scope.data;
        $scope.form = [];
        $scope.form1 = [];
        if ($scope.schema == null)
        {
            $scope.schema = {
                "type": "object",
                "title": "",
                "properties": {},
                "required": [],
                "format": "object"
            };
        }    
        $scope.data[0].nodes.forEach(function (node) {
            var insection = false;
            var sindex = 0;
            $scope.schema.title =node.title;
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
                    else {
                        $scope.schema.required = [];                   
                    }                      

                    if (innernode.fieldType && innernode.fieldType === 'Text') {
                        $scope.schema.properties[propname].type = 'string';
                        $scope.model[propname] = innernode.fieldAttr.dtext;
                        if (innernode.fieldAttr.isSingle == 1) {
                            if (innernode.row == 1) {
                                fieldset.items.push({ "key": propname, "htmlClass": "col-xs-12", "condition": innernode.condition });
                            }
                            else if (innernode.row == 2) {
                                fieldset.items.push({ "key": propname,"htmlClass": "col-xs-6", "condition": innernode.condition });
                            }
                            else if (innernode.row == 3) {
                                fieldset.items.push({ "key": propname,"htmlClass": "col-xs-4", "condition": innernode.condition });
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
                                fieldset.items.push({ "key": propname, "type": "textarea", "htmlClass": "col-xs-6", "condition": innernode.condition });
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

                        fieldset.items.push({ 'key': propname, 'type': 'nwpFileUpload', 'endpoint': 'http://localhost:5000/api/DesignEMRFileUploadAPI/Add?ID=1', 'i18n': fileuploadtags, "condition": innernode.condition });
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
                        var htitle = "<h4>" + innernode.title + "</h4>"
                        fieldset.items.push({ "type": "help", "helpvalue": htitle, "condition": innernode.condition });
                    }//<hr/>
                    else if (innernode.fieldType && innernode.fieldType === 'List') {
                        if (innernode.fieldAttr.sfields) {
                            var slist = innernode.fieldAttr.sfields.split('\n');
                            if (innernode.fieldAttr.ismulti === '0') {
                                $scope.schema.properties[propname].type = 'string';
                                $scope.schema.properties[propname].enum = slist;
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
                            }
                            else {
                                $scope.schema.properties[propname].type = 'array';
                                $scope.schema.properties[propname].items = { type: "string" };
                                var ltitleMap = [];
                                slist.forEach(function (item) {
                                    ltitleMap.push({ value: item, name: item });
                                });
                                if (innernode.row == 1) {
                                    fieldset.items.push({ key: propname, "condition": innernode.condition, placeholder: 'Select', type: 'strapselect', titleMap: ltitleMap, options: { multiple: true }, 'htmlClass': 'col-xs-12' });
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
            $scope.form1.push(fieldset);

        });
        //$scope.form.push({
        //    type: "submit",
        //    title: "Save"
        //});//to display forms Save button          
    };    
    $scope.fieldType = [];      
    $scope.tmplOptions = [];
    $scope.FormEdit = {};  
    $scope.toggle = function (scope) {
        scope.toggle();
    };
    $scope.setRelation = function (node) {      
        $scope.sourceSections = [];
        var sindex = parseInt(node.id.toString().charAt(1)) - 1;
        debugger;
        $scope.data[0].nodes.forEach(function (section, ind) {
            if (ind <= sindex) {
                $scope.sourceSections.push({ name: section.title, nodes: [] });
                section.nodes.forEach(function (item) {
                    var sdfields = [];
                    debugger;
                    //if (item.fieldType != 'Header') {  // add id we want to customize source and target lsit of items
                        if (item.fieldAttr && item.fieldAttr.sfields && item.fieldAttr.sfields !== '') {
                            item.fieldAttr.sfields.split('\n').forEach(function (item) {
                                sdfields.push({ 'name': item });
                            });
                        }
                        if (item.id < node.id) {
                            if (item.fieldAttr && item.fieldAttr.ismulti && item.fieldAttr.ismulti === '0')
                                $scope.sourceSections[ind].nodes.push({ name: item.title, type: item.fieldType, aname: item.name, sfields: sdfields });
                            else
                                $scope.sourceSections[ind].nodes.push({ name: item.title, type: item.fieldType, aname: item.name, sfields: sdfields, ismulti: 1 });
                        }
                    //}                    
                });
            }
        });

        //console.log(node);
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: false,
            keyboard: false,
            templateUrl: 'setRelation.html',
            controller: 'ModalRelationCtrl',
            controllerAs: '$ctrl',
            resolve: {
                data: function () {
                    return $scope.data;
                },
                node: function () {
                    return node;
                },
                sourceSections: function () {
                    return $scope.sourceSections;
                }
            }            
        })

        modalInstance.result.then(function () {
             
            //console.log(JSON.stringify($scope.data));
            $scope.showJson();
           }, function () {
        });
    }
    $scope.remove = function (scope) {
         
        scope.remove();
         
       $scope.showJson();
    };
    $scope.newSubItem = function (scope) {
        debugger;
        var nodeData = scope.$modelValue;
        var ititle;
        var max;
        var maxId;
        var ItemLength;
        if (nodeData.depth === 0)
            ititle = 'Section' + (nodeData.nodes.length + 1);
        if (nodeData.depth === 1) {
            if (nodeData.nodes.length != 0) {
                ItemLength = Math.max.apply(Math, nodeData.nodes.map(function (item) { return item.maxId; }));
                ItemLength = ItemLength + 1;
            }
            else
            {
                ItemLength = 1;
            }
            ititle = 'Item' + ItemLength;//(nodeData.nodes.length + 1);
        }
        if (nodeData.depth === 1) {
            debugger;
            if (nodeData.nodes.length != 0) {
                maxId = Math.max.apply(Math, nodeData.nodes.map(function (item) { return item.maxId; }));
                maxId = maxId + 1;

                max = Math.max.apply(Math, nodeData.nodes.map(function (item) { return item.id; }));
                max = max + 1;
            }
            else
            {
                maxId=1;
                max=nodeData.id * 100 + nodeData.nodes.length + 1;
            }
            nodeData.nodes.push({
                maxId:maxId,
                depth: nodeData.depth + 1,
                id:max,
                title: ititle,
                nodes: []
            });
        }
        else {
            nodeData.nodes.push({
                depth: nodeData.depth + 1,
                id: nodeData.id * 100 + nodeData.nodes.length + 1,
                title: ititle,
                name: '',
                condition: '',
                isReq: 0,
                row: '',
                //isToolTip: 0,
                //ttDesc: '',
                fieldType: [],
                fieldAttr: {
                    isSingle: 1,
                    dtext: '',
                    isRadio: 0,
                    dbool: 0,
                    unit: '',
                    ddecimal: '',
                    mind: '',
                    maxd: '',
                    ismulti: 0,
                    sfields: '',
                    sdfield: ''
                },
                nodes: []
            });
        }
    };  
    //form edit click
    $scope.nClick = function (node) {
         
        $scope.data1 = $scope.data
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: false,
            keyboard: false,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',            
            controllerAs: '$ctrl',
            resolve: {           
                node: function () {
                    return node;
                },
                tmplType: function () {
                    return $scope.tmplType;
                },
                tmplOptions: function () {
                    return $scope.tmplOptions;
                },
                fieldType: function () {
                    return $scope.fieldType;
                },
                appliesTo: function () {
                    return node.appliesTo;
                },
                templateType: function () {
                    return node.templateType;
                },
                title: function(){
                    return node.title;
                },
            }
        });

        modalInstance.result.then(function (node) {
             
           // console.log(JSON.stringify(node));
            $scope.DesignEMRVO.TempName = node.title;
            $scope.DesignEMRVO.FormID = node.templateType;
            $scope.DesignEMRVO.GenderID = node.appliesTo;

            //to generate auto unique name for controllers by rohini
            //value =   + 1
             
            $scope.JForm = $scope.form;
             
            $scope.showJson();
        }, function () {
        });
        
    }   
    $scope.treeOptions = {     
        beforeDrop: function (e) {           
            var sourceValue = e.source.nodeScope.$modelValue.depth,
            destValue = e.dest.nodesScope.node ? e.dest.nodesScope.node.depth : undefined, modalInstance;
            if (destValue === undefined)
                return false;
            if (destValue === 0)
                return false;
            // display modal if the node is being dropped into a smaller container
            if (sourceValue === 2 && destValue === 1 || sourceValue === 1 && destValue === 0) {
                $scope.treeChanged = true;
                return true;
            }
            else
                return false;
        },
        removed: function (node) {
             
            $scope.nodeRemoved = true;
            //if (node.$modelValue.depth == 1) {
            //    swalMessages.MessageBox('PalashIVF', "Are You Sure YouWantTo Remove Section ?", "warning", function (isConfirmed) {
            //        if (isConfirmed) {
            //           // $scope.nodeRemoved = true;                        
            //        }
            //        else {
            //           // $scope.nodeRemoved = false;
            //        }
            //    });              
            //}
            //else {
            //   // $scope.nodeRemoved = true;
            //}           
        }
    };
    $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
    };  
    $scope.collapseAll = function () {
        $scope.$broadcast('angular-ui-tree:collapse-all');
    };
    $scope.expandAll = function () {
        $scope.$broadcast('angular-ui-tree:expand-all');
    };
    $scope.data =[{
        'id': 1,
        'title': 'Form1',
        'description': '',
        'appliesTo': '',
        'templateType': '',
        'depth': 0,
        'nodes': [{
              'id': 11,
              'title': 'Section1',
              'depth': 1,
              'nodes': [
              ]
        }]
    }];
    //--BY ROHINI TO GET TEMPLATE BY ID
    $scope.GetTemplateByID = function GetTemplateByID()
    {
           
        var ResponseData = DesignEMRSrv.GetTemplateByID($scope.GetData.ID);
        ResponseData.then(function (Response) {
            
            if (Response.data != null) {
                $scope.DesignEMRVO = Response.data;
                //FOR FIRST time added template which do not have scema and editor data
                if (Response.data.EditorSchema != null)                
                    $scope.data = JSON.parse(Response.data.EditorSchema);               
                else
                {
                    
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
                
                $scope.GetData = {};
                 
                $scope.showJson(); // rohini recently add
            }
        }, function (error) {
            $scope.Error = error;
        });  
    }
    ////
    //To GET Template ID When View Grid Data
    if (angular.isDefined($scope.GetData) && !angular.equals({}, $scope.GetData)) {
        
        if (angular.isDefined($scope.GetData.TempName) && $scope.GetData.ID > 0)
        {
            $scope.GetTemplateByID();
            $scope.IsModify = 1;
            $scope.IsFormShow = 1;
        }
        //else {
        //    $scope.IsFormShow = 0;
        //    $scope.IsSave = 1;
        //    $scope.IsModify = 0;       
        //}
    }
    //BY ROHNI TO save template
    $scope.SaveTemplate = function () {
         debugger;  
        // $scope.DesignEMRVO.TempName = //$scope.DesignEMRVO.TempName;
        $scope.DesignEMRVO.EditorSchema = null;
        $scope.DesignEMRVO.EditorSchema = JSON.stringify($scope.data);
        $scope.DesignEMRVO.SchemaDecription = null;
        $scope.DesignEMRVO.SchemaDecription = JSON.stringify($scope.schema);
        $scope.DesignEMRVO.FormDecription = null;
        $scope.DesignEMRVO.FormDecription = JSON.stringify($scope.Jform);
        $scope.DesignEMRVO.ModelDescription = null;
        $scope.DesignEMRVO.ModelDescription = JSON.stringify($scope.model); 
        if ($scope.data != null)
        {
            $scope.DesignEMRVO.TempName = $scope.data[0].title;
            $scope.DesignEMRVO.FormID = $scope.data[0].templateType;
            $scope.DesignEMRVO.GenderID = $scope.data[0].appliesTo;
        }        

        var ResponseData = DesignEMRSrv.SaveTemplate($scope.DesignEMRVO);
        ResponseData.then(function (Response) {
            
            if (Response.data >= 1) {
                AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                $scope.ClearForm();
                $location.path('/DesignEMR');         
            }
        }, function (error) {
            $scope.Error = error;
        });
    
    }
    //BY ROHNI TO Modify template
    $scope.ModifyTemplate = function ModifyTemplate()
    {
        debugger;
        $scope.DesignEMRVO.TempName = //$scope.DesignEMRVO.TempName;
        $scope.DesignEMRVO.EditorSchema = null;
        $scope.DesignEMRVO.EditorSchema = JSON.stringify($scope.data);
        $scope.DesignEMRVO.SchemaDecription = null;
        $scope.DesignEMRVO.SchemaDecription = JSON.stringify($scope.schema);
        $scope.DesignEMRVO.ModelDescription = null;
        $scope.DesignEMRVO.ModelDescription = JSON.stringify($scope.model);        
        //to avoid Converting circular structure to JSON
        $scope.DesignEMRVO.FormDecription = null;

        console.log("??????????? >>>>>>>>>>>>> $scope.form" , $scope.form);
        debugger
        var cache = [];        
        $scope.DesignEMRVO.FormDecription = JSON.stringify($scope.form, function (key,value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {// Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = null; // Enable garbage collection
              
        var a = $scope.DesignEMRVO.length;
        if ($scope.data != null) {
            $scope.DesignEMRVO.TempName = $scope.data[0].title;
            $scope.DesignEMRVO.FormID = $scope.data[0].templateType;
            $scope.DesignEMRVO.GenderID = $scope.data[0].appliesTo;
        }

        console.log("??????????? >>>>>>>>>>>>> $scope.DesignEMRVO" , $scope.DesignEMRVO);
        debugger

        var ResponseData = DesignEMRSrv.SaveTemplate($scope.DesignEMRVO);
        ResponseData.then(function (Response) {
            
            if (Response.data >= 1) {
                AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                $scope.ClearForm();
                $location.path('/DesignEMR');
            }
        }, function (error) {
            $scope.Error = error;
        });
    }
    ////end
    //BY ROHNI Clear Data
    $scope.ClearForm = function ClearForm()
    {
          
        $scope.DesignEMRVO = {}; //rohini
        $scope.IsSave = 0;
        $scope.IsModify = 0;
        $scope.IsFormShow = 0;  
        DataFactory.setObj(null);
    }
    ////END
    // BY ROHNIBack To Main Page
    $scope.BackToIndex = function BackToIndex()
    {
        $scope.ClearForm();
        $location.path('/DesignEMR');
    }
    ////END   
    $scope.PageSetup = function () {
        debugger;
        $scope.FillFormType();
        $scope.FillGender();
         
        $scope.showJson();
        $scope.GetUserrights();
    }    
    $scope.FillFormType = function () {
        var ResponseData = Common.getMasterList('M_EMRFieldsTypes', 'ID', 'FieldDescription');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.fieldType = Response.data;
           
        }, function (error) {
        });
    };
    $scope.FillGender = function () {
        var ResponseData = Common.getMasterList('M_GenderMaster', 'GenderId', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.tmplOptions = Response.data;           
            $scope.FormEdit.GenderID= 0;
        }, function (error) {
        });
    };
    $scope.GetUserrights = function () {
        var lstUserRights = Common.getUserRights();
            for (var z = 0; z <= lstUserRights.length - 1; z++) {
                if (lstUserRights[z].MenuId == 104 && lstUserRights[z].Active)// Design template
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
    }]);
angular.module('PIVF.designemr').controller('ModalInstanceCtrl', function ($uibModalInstance, Common, DesignEMRSrv, node, tmplType, tmplOptions, fieldType, AlertMessage, appliesTo, templateType,title) {
    debugger;
        var $ctrl = this;
        $ctrl.IsDisableForm = true;
        $ctrl.node = node;
        $ctrl.FormEdit = {};
        $ctrl.FormEdit.GenderID = 0;
        $ctrl.FormEdit.FormID = 0;
        $ctrl.tmplType = tmplType;
        $ctrl.tmplOptions = tmplOptions;
        $ctrl.fieldType = fieldType;
        $ctrl.node.templateType = node.templateType;
        $ctrl.node.appliesTo = node.appliesTo;
        if ($ctrl.node.templateType != undefined)    {
            if($ctrl.node.templateType > 0)  {
                    var ResponseData = Common.getMasterList('M_EMRForms', 'ID', 'FormDescription');
                    ResponseData.then(function (Response) {
                        
                        Response.data.splice(0, 0, { ID: 0, Description: "Select" });
                        $ctrl.tmplType = Response.data;
                        $ctrl.node.templateType = node.templateType;
                        $ctrl.IsDisableForm = true;
                    }, function (error) {
                    });
            }
        }
        $ctrl.fieldType.forEach(function (value, key) {
            if ($ctrl.node.fieldType != undefined) {
                if ($ctrl.node.fieldType.length != 0)
                if ($ctrl.node.fieldType && value['name'] === $ctrl.node.fieldType)
                    value['ticked'] = true;
                else
                    value['ticked'] = false;
            }
        });
        $ctrl.tmplType = [];
        $ctrl.tmplType.splice(0, 0, { ID: 0, Description: "Select" });
        $ctrl.FillForm = function (GenderID) {
            $ctrl.IsDisableForm = false;
            
            var ResponseData = DesignEMRSrv.FillFormType(GenderID);
            ResponseData.then(function (Response) {
                Response.data.splice(0, 0, { ID: 0, Description: "Select" });
                $ctrl.tmplType = Response.data;
                $ctrl.node.templateType = 0;
            }, function (error) {
            });
        };
       //defualt set 
        if ($ctrl.node.fieldType === undefined)
            $ctrl.node.fieldType = "Select";
        if ($ctrl.node.row === undefined)
            $ctrl.node.row = 1;
        if ($ctrl.node.fieldAttr === undefined) {
            $ctrl.node.fieldAttr = {};
            if ($ctrl.node.fieldAttr.isSingle === undefined)
                $ctrl.node.fieldAttr.isSingle = 1;
            if($ctrl.node.fieldAttr.ismulti === undefined)
                $ctrl.node.fieldAttr.ismulti = '0';
            if ($ctrl.node.fieldAttr.isRadio === undefined)
                $ctrl.node.fieldAttr.isRadio = 0;
            if ($ctrl.node.fieldAttr.dbool === undefined)
                $ctrl.node.fieldAttr.dbool = 1;
        }
        if ($ctrl.node.fieldAttr != undefined) {         
            if ($ctrl.node.fieldAttr.isSingle === undefined)
                $ctrl.node.fieldAttr.isSingle = 1;
            if ($ctrl.node.fieldAttr.ismulti === undefined)
                $ctrl.node.fieldAttr.ismulti = '0';
            if ($ctrl.node.fieldAttr.isRadio === undefined)
                $ctrl.node.fieldAttr.isRadio = 0;
            if ($ctrl.node.fieldAttr.dbool === undefined)
                $ctrl.node.fieldAttr.dbool = 1;
        }        
        $ctrl.ok = function () {            
            debugger;
            var propname = "C" + $ctrl.node.id + "C";
            $ctrl.node.name = propname.toLowerCase();
            if ($ctrl.node.depth == 0) {
                if ($ctrl.node.title == undefined) 
                    AlertMessage.info('PalashIVF', 'Enter Form Name.');                
                else if($ctrl.node.title.length <= 0)
                    AlertMessage.info('PalashIVF', 'Enter Valid Form Name.');
                else 
                    $uibModalInstance.close($ctrl.node);
            }
            else if ($ctrl.node.depth == 1 )   //for section
            {
                $uibModalInstance.close($ctrl.node);
            }
            else
            { 
                if ($ctrl.node.fieldType != "Select") {
                    debugger;
                    if ($ctrl.node.title == undefined)  {
                        $ctrl.node.title = " ";                       
                    }
                    if ($ctrl.node.fieldType == "Decimal") {
                        if ($ctrl.node.fieldAttr.mind != undefined && $ctrl.node.fieldAttr.maxd != undefined) {
                            $uibModalInstance.close($ctrl.node);
                        }
                        else {
                            AlertMessage.info('PalashIVF', 'Please Enter Minimum Maximum Value');
                        }                        
                    }
                    else if ($ctrl.sdfield == undefined && $ctrl.node.fieldType != "List")   {
                        $uibModalInstance.close($ctrl.node);
                    }
                    else if ($ctrl.sdfield == undefined  && $ctrl.node.fieldType == "List" && $ctrl.node.fieldAttr.ismulti == 0)  {
                       //$ctrl.setdefault();
                        //AlertMessage.info('PalashIVF', 'Please Click Set Default and set default Value');                       
                        if ($ctrl.node.fieldType == "List")
                            $ctrl.setdefault();
                        $ctrl.node.fieldAttr.sdfield = "";
                        $uibModalInstance.close($ctrl.node);                          
                    }
                    else if ($ctrl.sdfield == undefined && $ctrl.node.fieldType == "List" && $ctrl.node.fieldAttr.ismulti == 1) {
                        if ($ctrl.sdfield != undefined) {
                            if ($ctrl.sdfield.length != 0) {
                                if ($ctrl.node.fieldType == "List")
                                    $ctrl.setdefault();
                                $ctrl.node.fieldAttr.sdfield = $ctrl.sdfield[0].name;
                                $uibModalInstance.close($ctrl.node);
                            }
                            else
                                AlertMessage.info('PalashIVF', 'Please Set Default Value First.');
                        }
                        else
                            $uibModalInstance.close($ctrl.node);
                    }
                    else if ($ctrl.sdfield.length == 0) {
                        //$ctrl.setdefault();
                        //AlertMessage.info('PalashIVF', 'Please Click Set Default and set default Value');                       
                        if ($ctrl.node.fieldType == "List")
                            $ctrl.setdefault();
                        $ctrl.node.fieldAttr.sdfield = "";
                        $uibModalInstance.close($ctrl.node);
                    }
                    else  {
                        if ($ctrl.sdfield != undefined)
                        {
                            if ($ctrl.sdfield.length != 0) {
                                if ($ctrl.node.fieldType == "List")
                                    $ctrl.setdefault();
                                $ctrl.node.fieldAttr.sdfield = $ctrl.sdfield[0].name;
                                $uibModalInstance.close($ctrl.node);
                            }
                            else
                                AlertMessage.info('PalashIVF', 'Please Set Default Value First.');
                        }
                        else
                            $uibModalInstance.close($ctrl.node);
                    }                                     
                }
                else {
                    debugger;
                    $ctrl.frmItemDetails.fieldType.$invalid = true;
                    $ctrl.frmItemDetails.fieldType.$dirty = true;
                    //in case filed is not selected and title also not selected
                    if ($ctrl.node.fieldType == "Select") {
                        if ($ctrl.node.title == undefined) {
                            $ctrl.node.title = " ";                           
                        }

                    }
                    AlertMessage.info('PalashIVF', 'Select Field Type First.');
                }
            }
            
        };
        $ctrl.setdefault = function () {
            
            if(!angular.equals($ctrl.node.fieldAttr,{}) && ($ctrl.node.fieldAttr.sfields !== '' && $ctrl.node.fieldAttr.sfields !== undefined))
            {
                 
                $ctrl.sdfields = [];
                $ctrl.node.fieldAttr.sfields.split('\n').forEach(function (item) {
                    $ctrl.sdfields.push({ 'name': item });
                });
            }
        };
        $ctrl.cancel = function () {                         
            $ctrl.node.appliesTo = appliesTo;
            $ctrl.node.templateType = templateType;
            $ctrl.node.title = title;
            $uibModalInstance.dismiss('cancel');
        };
    });
angular.module('PIVF.designemr').controller('ModalRelationCtrl', function ($uibModalInstance, data, node, sourceSections) {
    
        var $ctrl = this;
        $ctrl.data = data;
        $ctrl.node = node;
        $ctrl.sourceSections = sourceSections;
        $ctrl.isEdit = true;
        

        $ctrl.numChoices = [
            { name: 'Equal To' },
            { name: 'Not Equal To' },
            { name: 'Greater Than' },
            { name: 'Greater Than Equal To' },
            { name: 'Less Than' },
            { name: 'Less Than Equal To' }
        ]

        $ctrl.dropdownChoices = [
            { name: 'Equal To' },
            { name: 'Not Equal To' }
        ]
        
        if (node.ssection && node.ssection.length > 0) {
            $ctrl.isEdit = false;
        }

        $ctrl.deleteRelation = function () {
            
            $ctrl.node["ssection"] = [];
            $ctrl.node["sitem"] = [];
            $ctrl.node["schoice"] = [];
            $ctrl.node["sfield"] = [];
            $ctrl.node["rvalue"] = "";
            $ctrl.node["btype"] = "";
            $ctrl.isEdit = true;
        }

        $ctrl.editRelation = function () {
            
            $ctrl.selSource = [];
            $ctrl.selItem = [];
            $ctrl.selChoice = [];
            $ctrl.sfield = [];
            $ctrl.isEdit = true;
            
             
            if (node.ssection && node.ssection.length > 0) {
                $ctrl.sourceSections.forEach(function (section) {
                    if (section.name === node.ssection[0].name) {
                        section.ticked = true;
                        $ctrl.selSource.push(node.ssection[0]);
                        section.nodes.forEach(function (item) {
                            if (item.name === node.sitem[0].name) {
                                item.ticked = true;
                                $ctrl.selItem.push(node.sitem[0]);
                                if (node.sitem && node.sitem[0].type === 'Decimal') {                                                                       
                                    $ctrl.numChoices.forEach(function (choice) {
                                        if (choice.name === node.schoice[0].name) {
                                            choice.ticked = true;
                                            $ctrl.selChoice.push(node.schoice[0]);
                                            $ctrl.rvalue = node.rvalue;
                                            //console.log(JSON.stringify($ctrl.selChoice));
                                            //console.log($ctrl.rvalue);
                                        }
                                    });

                                } else if (node.sitem && node.sitem[0].type === 'List') {
                                    $ctrl.dropdownChoices.forEach(function (choice) {
                                        if (choice.name === node.schoice[0].name) {
                                            choice.ticked = true;
                                            $ctrl.selChoice.push(node.schoice[0]);
                                            $ctrl.sfield.push(node.sfield[0]);
                                        }
                                    });
                                } else if (node.sitem && node.sitem[0].type === 'Boolean') {
                                    $ctrl.dropdownChoices.forEach(function (choice) {
                                        if (choice.name === node.schoice[0].name) {
                                            choice.ticked = true;
                                            $ctrl.selChoice.push(node.schoice[0]);
                                            $ctrl.btype = node.btype;
                                            //console.log(JSON.stringify($ctrl.selChoice));
                                            //console.log($ctrl.btype);
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        }
        

        $ctrl.add = function () {
             
            $ctrl.node["ssection"] = $ctrl.selSource;
            $ctrl.node["sitem"] = $ctrl.selItem;
            $ctrl.node["schoice"] = $ctrl.selChoice;
            $ctrl.node["sfield"] = $ctrl.sfield;
            $ctrl.node["rvalue"] = $ctrl.rvalue;
            $ctrl.node["btype"] = $ctrl.btype;

            if ($ctrl.selItem[0].type == 'Decimal') {
                 
                if ($ctrl.selChoice[0].name === 'Equal To') {
                    $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + ' == ' + $ctrl.rvalue ;
                }
                else if ($ctrl.selChoice[0].name === 'Not Equal To') {
                    $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + ' != ' + $ctrl.rvalue ;
                }
                else if ($ctrl.selChoice[0].name === 'Greater Than') {
                    $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + ' > ' + $ctrl.rvalue ;
                }
                else if ($ctrl.selChoice[0].name === 'Greater Than Equal To') {
                    $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + ' >= ' + $ctrl.rvalue ;
                }
                if ($ctrl.selChoice[0].name === 'Less Than') {
                    $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + ' < '+ $ctrl.rvalue ;
                }
                if ($ctrl.selChoice[0].name === 'Less Than Equal To') {
                    $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + ' <= ' + $ctrl.rvalue ;
                }
            } else if ($ctrl.selItem[0].type == 'List') {
                
                if ($ctrl.selChoice[0].name === 'Equal To') {
                    if ($ctrl.selItem[0].ismulti === 1)
                        $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + '.indexOf(\'' + '"' + $ctrl.sfield[0].name + '"' + '\') > -1';
                    else
                        $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + ' == ' + '"' +$ctrl.sfield[0].name + '"';
                } 
                else if ($ctrl.selChoice[0].name === 'Not Equal To') {
                    if ($ctrl.selItem[0].ismulti == 1)
                        $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + '.indexOf(\'' + '"' + $ctrl.sfield[0].name + '"' + '\') === -1';
                    else
                        $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname + ' != ' + '"' + $ctrl.sfield[0].name + '"';
                }
            } else if ($ctrl.selItem[0].type == 'Boolean') {
                
                if ($ctrl.selChoice[0].name === 'Equal To') {
                    if($ctrl.btype == '1')
                        $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname;
                    else
                        $ctrl.node['condition'] = '!model.' + $ctrl.selItem[0].aname;
                }
                else if ($ctrl.selChoice[0].name === 'Not Equal To') {
                    if ($ctrl.btype == '1')
                        $ctrl.node['condition'] = '!model.' + $ctrl.selItem[0].aname;
                    else
                        $ctrl.node['condition'] = 'model.' + $ctrl.selItem[0].aname;
                }
            }
             
            $uibModalInstance.close($ctrl.node);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });