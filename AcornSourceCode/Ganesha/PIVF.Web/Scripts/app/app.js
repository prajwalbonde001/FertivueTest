'use strict';

var PIVF = angular.module('PIVF', ['ngRoute', 'ui.bootstrap'
, 'LocalStorageModule', 'ngImgCrop', 'ngFileUpload', 'angular-toasty'
, 'ng-sweet-alert', 'webcam', 'oc.lazyLoad', 'isteven-multi-select', //'isteven-multi-select'  Added by Sujata
, 'ngScrollbars', 'PIVF.designemr', 'services.breadcrumbs', 'angular-linq'
, 'anguFixedHeaderTable', 'textAngular', 'pdf', 'ngPrint', 'angularSpinner'
, 'ds.objectDiff', 'perfect_scrollbar', 'chart.js', 'moment-picker'
, 'ngComboDatePicker', 'ngInputModified','ng-fusioncharts'
,  'angularjs-dropdown-multiselect'//Added by Sujata
, 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.selection'//Begin::Added by AniketK for Department Master
, 'ui.grid.exporter', 'ui.grid.moveColumns', 'ui.grid.resizeColumns'
, 'ui.grid.pinning', 'ui.grid.importer', 'ui.grid.grouping', 'ui.grid.pagination'
, 'ui.grid.validate', 'ngDialog', 'mwl.calendar', 'ui.grid.saveState', 'ui.select', 'ngComboDatePicker',//End::Added by AniketK for Department Master
,'uiCropper'

]);
var Baseurl = 'http://localhost:5000/';
PIVF.constant('API', {
    url: Baseurl + 'odata/',
    APIurl: Baseurl + 'api/',
    Baseurl: Baseurl
}); 

PIVF.constant('PatientInfo', {
    IsSingle: false
});

PIVF.config(function ($routeProvider, $ocLazyLoadProvider, ScrollBarsProvider, $provide) {
    ScrollBarsProvider.defaults = {
        scrollButtons: {
            scrollAmount: 'auto',
            enable: true
        },
        scrollInertia: 900,
        axis: 'yx',
        theme: 'dark-3',
        setHeight: 180,
        autoHideScrollbar: false
    };
    function insertTextAtCursor(text) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(text));
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().html = text;
        }
    }


    var dropMenuTemplate = '<div class="dropdown insert-var-container">';
    dropMenuTemplate += '<button class="dropdown-toggle" data-toggle="dropdown" ng-mouseup="focusHack()">';
    dropMenuTemplate += 'Insert variable <span class="caret"></span>';
    dropMenuTemplate += '</button>';
    dropMenuTemplate += '<ul class="dropdown-menu">';
    dropMenuTemplate += '<li><a ng-click="InsertPName()">Patient Name</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertPAge()">Patient Age</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertPAddr()">Patient Address</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSName()">Spouse Name</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSAge()">Spouse Age</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSAddr()">Spouse Address</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertMDName()">Male Donor Name</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertMDMrn()">Male Donor MRN</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertMDAddr()">Male Donor Address</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertFDName()">Female Donor Name</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertFDMrn()">Female Donor MRN</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertFDAddr()">Female Donor Address</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertDocName()">Doctor Name</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSurrName()">Surrogate Name</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSurrAge()">Surrogate Age</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSurrAddr()">Surrogate Address</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSurrSName()">Surrogate Spouse Name</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSurrSAge()">Surrogate Spouse Age</a></li>';
    dropMenuTemplate += '<li><a ng-click="InsertSurrSAddr()">Surrogate Spouse Address</a></li>';

    dropMenuTemplate += '</ul>';
    dropMenuTemplate += '</div>';

    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) {
        // $delegate is the taOptions we are decorating
        // register the tool with textAngular
        taOptions.disableSanitizer = true;

        taRegisterTool('checkbox', {
            buttontext: 'Checkbox',
            action: function (deferred, restoreSelection) {
                //insertTextAtCursor('<todo>Replace text with title</todo><p></br></p>');
                this.$editor().wrapSelection('insertHtml', '<input type="checkbox" ng-model="form.checkbox1"></input> ');
            }
        });
        taRegisterTool('input', {
            buttontext: 'Input',
            action: function () {
                //insertTextAtCursor('<todo>Replace text with title</todo><p></br></p>');
                this.$editor().wrapSelection('insertHtml', '<input type="input" class="dynamicInputCtrlCSS" ng-model="form.input1"></input> ');
            }
        });
        taRegisterTool('datepicker', {
            buttontext: 'Date',
            action: function () {
                //insertTextAtCursor('<todo>Replace text with title</todo><p></br></p>');
                this.$editor().wrapSelection('insertHtml', '<input type="date" class="dynamicInputCtrlCSS" ng-model="form.datepicker1"></input> ');
            }
        });
        taRegisterTool('insertVariable', {
            display: dropMenuTemplate,
            disabled: function () {
                var self = this;
                this.isDisabled = function () {
                    return false;
                };
            },
            InsertPName: function () {
                insertTextAtCursor("{{form.PName}}")
            },
            InsertPAge: function () {
                insertTextAtCursor("{{form.PAge}}")
            },
            InsertPAddr: function () {
                insertTextAtCursor("{{form.PAddr}}")
            },
            InsertSName: function () {
                insertTextAtCursor("{{form.SName}}")
            },
            InsertSAge: function () {
                insertTextAtCursor("{{form.SAge}}")
            },
            InsertSAddr: function () {
                insertTextAtCursor("{{form.SAddr}}")
            },
            InsertMDName: function () {
                insertTextAtCursor("{{form.MDName}}")
            },
            InsertMDMrn: function () {
                insertTextAtCursor("{{form.MDMrn}}")
            },
            InsertMDAddr: function () {
                insertTextAtCursor("{{form.MDAddr}}")
            },
            InsertFDName: function () {
                insertTextAtCursor("{{form.FDName}}")
            },
            InsertFDMrn: function () {
                insertTextAtCursor("{{form.FDMrn}}")
            },
            InsertFDAddr: function () {
                insertTextAtCursor("{{form.FDAddr}}")
            },
            InsertDocName: function () {
                insertTextAtCursor("{{form.DocName}}")
            },
            InsertSurrName: function () {
                insertTextAtCursor("{{form.SurrName}}")
            },
            InsertSurrAge: function () {
                insertTextAtCursor("{{form.SurrAge}}")
            },
            InsertSurrAddr: function () {
                insertTextAtCursor("{{form.SurrAddr}}")
            },
            InsertSurrSName: function () {
                insertTextAtCursor("{{form.SurrSName}}")
            },
            InsertSurrSAge: function () {
                insertTextAtCursor("{{form.SurrSAge}}")
            },
            InsertSurrSAddr: function () {
                insertTextAtCursor("{{form.SurrSAddr}}")
            },
            action: function () {
            }
        });
        //taRegisterTool('data', {
        //    buttontext: 'data',
        //    action: function () {
        //        //insertTextAtCursor('<todo>Replace text with title</todo><p></br></p>');
        //        this.$editor().wrapSelection('insertHtml', '{{form.data}}');
        //    }
        //});       
        // add the button to the default toolbar definition
        taOptions.toolbar[3].push('checkbox');
        taOptions.toolbar[3].push('input');
        taOptions.toolbar[3].push('datepicker');
        taOptions.toolbar[3].push('insertVariable');
        //for Selected Patient Related Data At Time Of Transaction
        //taOptions.toolbar[3].push('data');
        return taOptions;
    }]);

    $routeProvider

     .when('/Login', {
         templateUrl: '/home/home',
         controller: 'homeController',
         resolve: {
             HomeController: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load({
                     name: 'homeController',
                     files: ['/Scripts/app/controllers/homeController.js']
                 });
             }]
         }
     })
        .when('/converttodonor', {
            templateUrl: '/ConvertToDonorMVC/Index',
            resolve: {
                HomeController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'ConvertToDonorCtrl',
                        files: ['/Scripts/app/controllers/Master/Configuration/ConvertToDonorCtrl.js',
                            '/Scripts/app/services/Master/Configuration/ConvertToDonorSrv.js']
                    });
                }]
            },
            Breadcrum: 'Mark as Donor'
        })
     .when('/DefaultPage', {
         templateUrl: '/Home/DefaultPage',
         controller: 'DefaultPageCtlr',
     })
        //.when('/Menu/:GrandpaId?/:Title',
        //{
        //    templateUrl: '/home/Menu',
        //    controller: 'LayOutController',
        //})
     //.when('/SemenAnalysis',
     //   {
     //       templateUrl: '/SemenAnalysisInterpretation/SemenAnalysisInterpretation',
     //       controller: 'SemenAnalysisInterpretationController',
     //   })
    .when('/UserRoleList', {
        templateUrl: '/UserRole/UserRoleList',
        resolve: {
            UserRoleController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'UserRoleController',
                    files: ['/Scripts/app/controllers/Master/Configuration/UserRoleController.js', '/Scripts/app/services/Master/Configuration/UserRoleService.js']
                });
            }]
        },
        Breadcrum: 'User Role'
    })
    .when('/AddUserRole', {
        templateUrl: '/UserRole/AddUserRole',
        resolve: {
            UserRoleController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'UserRoleController',
                    files: ['/Scripts/app/controllers/Master/Configuration/UserRoleController.js', '/Scripts/app/services/Master/Configuration/UserRoleService.js']
                });
            }],
            Breadcrum: function ($location, $route) {
                var urlParams = $location.search();
                if (urlParams.Edit)
                    $route.current.$$route.Breadcrum = 'Edit User Role';
                else $route.current.$$route.Breadcrum = 'Add User Role';
            }
        },
    })
    .when('/UserList', {
        templateUrl: '/User/UserList',
        controller: 'UserController',
        Breadcrum: 'Users'
    })
    .when('/AddUser/', {
        templateUrl: '/User/NewUser',
        controller: 'UserController',
        resolve: {
            Breadcrum: function ($location, $route) {
                var urlParams = $location.search();
                if (urlParams.Edit)
                    $route.current.$$route.Breadcrum = 'Edit User';
                else $route.current.$$route.Breadcrum = 'Add User';
            }
        }
    })
    .when('/clinicConfiguration', {
        templateUrl: '/UserRole/ClinicConfig',
        resolve: {
            FemaleHistoryController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ClinicConfigController',
                    files: ['/Scripts/app/controllers/Master/Configuration/ClinicConfigController.js', '/Scripts/app/services/Master/Configuration/ClinicConfigService.js']
                });
            }]
        },
        Breadcrum: 'Clinic'
    })

        // added on 04102019 for Clinic Master
        .when('/Clinic',
    {
        templateUrl: '/Clinic/Clinic',
        resolve: {
            ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ClinicController',
                    files: ['/Scripts/app/controllers/Master/Clinic/ClinicController.js'
                        , '/Scripts/app/services/Master/Clinic/ClinicService.js' ,
                    '/Scripts/app/services/Master/Clinic/StaffService.js',
                    '/Scripts/app/services/Clinic/DoctorService.js'
                    ]
                });
            }]
        },
        Breadcrum: 'Clinic'
    })

    // added on 07102019 for Clinic Master
    .when('/EditClinic',
    {
        templateUrl: '/Clinic/EditClinic',
        resolve: {
            ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ClinicController',
                    files: ['/Scripts/app/controllers/Master/Clinic/ClinicController.js'
                        , '/Scripts/app/services/Master/Clinic/ClinicService.js',
                    '/Scripts/app/services/Master/Clinic/StaffService.js', ]
                });
            }]
        },
        Breadcrum: 'Edit Clinic'
    })

        // added on 11102019 for Staff Master
        .when('/Staff',
    {
        templateUrl: '/Staff/StaffList',
        resolve: {
            ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'StaffController',
                    files: ['/Scripts/app/controllers/Master/Clinic/StaffController.js', '/Scripts/app/services/Master/Clinic/StaffService.js', '/Scripts/app/services/Clinic/DoctorService.js']
                });
            }]
        },
        Breadcrum: 'Staff'
    })
        // added on 11102019 for Staff Master
    .when('/NewStaff',
    {
        templateUrl: '/Staff/NewStaff',
        resolve: {
            ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'StaffController',
                    files: ['/Scripts/app/controllers/Master/Clinic/StaffController.js', '/Scripts/app/services/Master/Clinic/StaffService.js', '/Scripts/app/services/Clinic/DoctorService.js']
                });
            }]
        },
        Breadcrum: 'New Staff'
    })

    //Added by AniketK on 07OCt2019
    .when('/Dept',
    {
        templateUrl: '/Department/Index',
        resolve: {
            ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'DepartmentController',
                    files: ['/Scripts/app/controllers/Master/Clinic/DepartmentController.js', '/Scripts/app/services/Master/Clinic/DepartmentService.js']
                });
            }]
        },
        Breadcrum: 'Department'
    })

    .when('/FemaleHistory', {
        templateUrl: '/FemaleHistory/FemaleHistory',
        resolve: {
            FemaleHistoryController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'FemaleHistoryController',
                    files: ['/Scripts/app/controllers/EMR/FemaleHistory/FeMaleHistoryController.js?v=1.21', '/Scripts/app/services/EMR/FemaleHistory/FemaleHistoryService.js', '/Scripts/app/services/EMR/FemaleHistory/FemaleComplaintsService.js?v=1.00']
                });
            }]
        },
        Breadcrum: 'History'
    })
    .when('/MaleHistory', {
        templateUrl: '/MaleHistory/MaleHistory',
        resolve: {
            MaleHistoryController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'MaleHistoryController',
                    files: ['/Scripts/app/controllers/EMR/MaleHistory/MaleHistoryController.js?v=1.21', '/Scripts/app/services/EMR/MaleHistory/MaleHistoryService.js']
                });
            }]
        },
        Breadcrum: 'History'
    })
    .when('/SemenPreparation', {
        templateUrl: 'SemenPreparation/SemenPreparation',
        resolve: {
            SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenPrepController',
                    files: ['/Scripts/app/controllers/EMR/MaleHistory/SemenPrepController.js?v=2.07', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js']
                });
            }]
        },
        Breadcrum: 'Semen Preparation'
    })
    .when('/SemenAnalysis', {
        templateUrl: 'SemenAnalysis/SemenAnalysis',
        resolve: {
            SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenPrepController',
                    files: ['/Scripts/app/controllers/EMR/MaleHistory/SemenAnalysisController.js?v=1.01', '/Scripts/app/services/EMR/MaleHistory/SurgicalSpermRetrievalService.js', '/Scripts/app/services/EMR/MaleHistory/SemenAnalysisService.js']
                });
            }]
        },
        Breadcrum: 'Semen Analysis'
    })
      .when('/IPDClass', {
              templateUrl: '/UserRole/IPDClass',
              resolve: {
                  IPDCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {

                      return $ocLazyLoad.load({
                         name: 'WardCtr',
                         files: ['/Scripts/app/controllers/IPD/WardCtr.js','/Scripts/app/services/IPD/IPDService.js']
                     });
                  }]
              },
              Breadcrum: 'Class'
          })


         .when('/Ward', {
             templateUrl: '/UserRole/Ward',
             resolve: {
                 IPDCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {

                     return $ocLazyLoad.load({
                         name: 'WardCtr',
                         files: ['/Scripts/app/controllers/IPD/WardCtr.js','/Scripts/app/services/IPD/IPDService.js']
                     });
                 }]
             },
             Breadcrum: 'Ward'
         })
          .when('/Bed', {
             templateUrl: '/UserRole/Bed',
             resolve: {
                 IPDCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {

                    return $ocLazyLoad.load({
                         name: 'WardCtr',
                         files: ['/Scripts/app/controllers/IPD/WardCtr.js','/Scripts/app/services/IPD/IPDService.js']
                     });
                 }]
             },
             Breadcrum: 'IPD'
          })

         .when('/AdmissionList', {
             templateUrl: '/UserRole/AdmissionList',
             resolve: {
                 IPDCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {

                     return $ocLazyLoad.load({
                         name: 'WardCtr',
                         files: ['/Scripts/app/controllers/IPD/WardCtr.js',
                         '/Scripts/app/services/IPD/IPDService.js',
                         '/Scripts/app/services/Billing/BillingService.js',
                         '/Scripts/app/services/Common/CommonService.js',
                           '/Scripts/app/services/Clinic/DoctorService.js',
                            '/Scripts/app/services/Master/Configuration/UserService.js']
                     });
                 }]
             },
             Breadcrum: 'AdmissionList'
         })

         .when('/NewAdmission', {
             templateUrl: '/UserRole/NewAdmission',
             resolve: {
                 IPDCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {

                     return $ocLazyLoad.load({
                         name: 'WardCtr',
                         files: ['/Scripts/app/controllers/IPD/WardCtr.js',
                         '/Scripts/app/services/IPD/IPDService.js',
                         '/Scripts/app/services/Billing/BillingService.js' ,
                         '/Scripts/app/services/Common/CommonService.js',
                          '/Scripts/app/services/Clinic/DoctorService.js',
                          '/Scripts/app/services/Master/Configuration/UserService.js']
                     });
                 }]
             },
             Breadcrum: 'NewAdmission'
         })

    .when('/SpermBank/', {
        templateUrl: 'CryoBank/CryobankSperm',
        resolve: {
            SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenPrepController',
                    files: ['/Scripts/app/controllers/CryoBank/CryobankSpermCtr.js', '/Scripts/app/services/CryoBank/CryobankSpermSrv.js', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenThawing.js']
                });
            }]
        },
        Breadcrum: 'Sperm Bank'
    })
    .when('/OocyteBank', {
        templateUrl: 'CryoBank/CryoBankOocyte',
        resolve: {
            SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenPrepController',
                    files: ['/Scripts/app/controllers/CryoBank/CryoBankOocyteCtr.js', '/Scripts/app/services/CryoBank/CryoBankOocyteSrv.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/CryoPreservationSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/OocyteThowSrv.js']
                });
            }]
        },
        Breadcrum: 'Oocyte Bank'
    })
     .when('/CoupleBank', {
         templateUrl: 'CryoBank/CoupleBank',
         resolve: {
             SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load({
                     name: 'CoupleBankCtr',
                     files: ['/Scripts/app/controllers/CryoBank/CoupleBankCtr.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/CryoPreservationSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/OocyteThowSrv.js']
                 });
             }]
         },
         Breadcrum: 'Couple Bank'
     })
        .when('/CryoBankSpermSubmenu/', {
        templateUrl: 'CryoBank/CryoBankSpermSubmenu',
        resolve: {
            SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenPrepController',
                    files: ['/Scripts/app/controllers/CryoBank/CryobankSpermCtr.js','/Scripts/app/controllers/CryoBank/CryoBankSpermSubmenuCtr.js', '/Scripts/app/services/CryoBank/CryobankSpermSrv.js', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenThawing.js']
                });
            }]
        },
        Breadcrum: 'Sperm Bank'
    })
    .when('/CryoBankOocyteSubmenu', {
        templateUrl: 'CryoBank/CryoBankOocyteSubmenu',
        resolve: {
            SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenPrepController',
                    files: ['/Scripts/app/controllers/CryoBank/CryoBankOocyteCtr.js', '/Scripts/app/controllers/CryoBank/CryoBankOocyteSubmenuCtr.js','/Scripts/app/services/CryoBank/CryoBankOocyteSrv.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/CryoPreservationSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/OocyteThowSrv.js']
                });
            }]
        },
        Breadcrum: 'Oocyte Bank'
    })
     .when('/CoupleBankSubMenu', {
         templateUrl: 'CryoBank/CoupleBankSubMenu',
         resolve: {
             SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load({
                     name: 'CoupleBankCtr',
                     files: ['/Scripts/app/controllers/CryoBank/CoupleBankCtr.js', '/Scripts/app/controllers/CryoBank/CoupleBankSubmenuCtr.js','/Scripts/app/services/ARTMgmt/Cryo-Preservation/CryoPreservationSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/OocyteThowSrv.js']
                 });
             }]
         },
         Breadcrum: 'Couple Bank'
     })
     // added bhagyashri for new reg
         .when('/New_Registration', {

             templateUrl: 'NewRegistration/New_Registration',
             resolve: {

                 NewRegistrationCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     debugger;
                     return $ocLazyLoad.load({
                         name: 'NewRegistrationCtr',
                         files: ['/Scripts/app/controllers/NewRegistration/NewRegistrationController.js?v=3.08',
                       //'/Scripts/app/services/Patient/RegistartionService.js',
                         '/Scripts/app/services/NewRegistration/NewRegistrationService.js?v=1.00',
                         '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                         ]
                     });
                 }]
             },
             Breadcrum: 'New Registration'
         })
          // ended bhagyashri for new reg

    .when('/EmbryoBank', {
        templateUrl: 'CryoBank/EmbryoBank',
        resolve: {
            SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenPrepController',
                    files: ['/Scripts/app/controllers/CryoBank/EmbryoBankCtr.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/CryoPreservationSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/OocyteThowSrv.js']
                });
            }]
        },
        Breadcrum: 'Embryo Bank'
    })
      .when('/EmbryoBankSubmenu', {
        templateUrl: 'CryoBank/EmbryoBankSubmenu',
        resolve: {
            SemenPrepController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenPrepController',
                    files: ['/Scripts/app/controllers/CryoBank/EmbryoBankCtr.js', '/Scripts/app/controllers/CryoBank/EmbryoBankSubmenuCtr.js','/Scripts/app/services/ARTMgmt/Cryo-Preservation/CryoPreservationSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/OocyteThowSrv.js']
                });
            }]
        },
        Breadcrum: 'Embryo Bank'
    })
    .when('/SemenFreez', {
        templateUrl: 'SemenFreez/NewSemenFreez',
        resolve: {
            ctrlSemenFreez: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ctrlSemenFreez',
                    files: ['/Scripts/app/controllers/EMR/MaleHistory/ctrlSemenFreez.js?v=0.03', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js'
                    , '/Scripts/app/services/EMR/MaleHistory/SemenAnalysisService.js']
                });
            }]
        },
        Breadcrum: 'Semen Freezing'
    })
    .when('/SemenThawing', {
        templateUrl: 'SemenThawing/SemenThawing',
        resolve: {
            ctrlSemenThawing: ['$ocLazyLoad', '$injector', function ($ocLazyLoad, $injector) {
                return $ocLazyLoad.load({
                    name: 'ctrlSemenThawing',
                    files: ['/Scripts/app/controllers/EMR/MaleHistory/ctrlSemenThawing.js?v=1.01', '/Scripts/app/services/EMR/MaleHistory/srvSemenThawing.js', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js']
                });
            }],
        },
        Breadcrum: 'Semen Thaw'
    })
    .when('/SurgicalSpermRetrieval', {
        templateUrl: '/SurgicalSpermRetrieval/SurgicalSpermRetrieval',
        resolve: {
            SurgicalSpermRetrievalController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SurgicalSpermRetrievalController',
                    files: ['/Scripts/app/controllers/EMR/MaleHistory/SurgicalSpermRetrievalController.js?v=1.01', '/Scripts/app/services/EMR/MaleHistory/SurgicalSpermRetrievalService.js', '/Scripts/app/services/EMR/MaleHistory/SemenAnalysisService.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js']
                });
            }]
        },
        Breadcrum: 'Surgical Sperm Retrieval'
    })
    .when('/Diagnosis', {
        templateUrl: 'DiagnosisMVC/AddDignosis',
        resolve: {
            DiagnosisCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'DiagnosisCtr',
                    files: ['/Scripts/app/controllers/EMR/Diagnosis/DiagnosisCtr.js', '/Scripts/app/services/EMR/Diagnosis/DiagnosisSrv.js']
                });
            }]
        },
        Breadcrum: 'Diagnosis'
    })
    .when('/NewART', {
        templateUrl: 'NewART/NewART',
        resolve: {
            ctrlNewART: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ctrlNewART',
                    files: ['/Scripts/app/controllers/New ART/NewARTCtlr.js','/Scripts/app/controllers/EMR/Design EMR/EMRTemplateCtr.js?v=1.11', '/Scripts/app/services/New ART/NewARTSrv.js']
                });
            }]
        },
        Breadcrum: 'New Cycle'
    })
    .when('/Registration',
    {
        templateUrl: '/Registration/Registration',
        resolve: {
            ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'RegistrationCtr',
                    files: ['/Scripts/app/controllers/Patient/RegistrationController.js', '/Scripts/app/services/Patient/RegistartionService.js', '/Scripts/app/services/Master/Patient/PatientVisitService.js']
                });
            }]
        },
        Breadcrum: 'Registration'
    })
    
   // Commented by AniketK on 20Nov2019
   //.when('/PatientView',
   //{
   //    templateUrl: '/Registration/PatientViewUpdate',
   //    resolve: {
   //        ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
   //            return $ocLazyLoad.load({
   //                name: 'RegistrationCtr',
   //                files: ['/Scripts/app/controllers/Patient/RegistrationController.js', '/Scripts/app/services/Patient/RegistartionService.js', '/Scripts/app/services/Master/Patient/PatientVisitService.js']
   //            });
   //        }]
   //    },
   //    Breadcrum: 'Patient View'
   //})

   // Added by AniketK on 20Nov2019
   .when('/PatientView',
   {
       templateUrl: '/NewRegistration/NewPatientViewUpdate',
       resolve: {
           ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
               return $ocLazyLoad.load({
                   name: 'NewRegistrationCtr',
                   files: ['/Scripts/app/controllers/NewRegistration/NewRegistrationController.js?v=3.08',
                       '/Scripts/app/services/NewRegistration/NewRegistrationService.js?v=1.00',
                       '/Scripts/app/services/Master/Patient/PatientVisitService.js']
               });
           }]
       },
       Breadcrum: 'Patient View'
   })
   .when('/Appointment', {
               templateUrl: '/Appointment/Appointment',
               resolve: {
                   ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                       debugger;
                       
                       return $ocLazyLoad.load({
                           name: 'AppointmentController',
                           files: ['/Scripts/app/controllers/Clinic/AppointmentController.js'
                                 , '/Scripts/app/services/Clinic/AppointmentService.js'
                                 , '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                 , '/Scripts/app/services/Clinic/DoctorService.js'
                                 , '/Scripts/app/services/Master/Configuration/UserService.js'
                                 , '/Scripts/app/services/Clinic/ScheduleService.js'
                                 , "/Scripts/AngularPackages/ngDialog.min.js"
                                 , '/Scripts/AngularPackages/Slick/angular-slick/slick.js'
                                 , '/Scripts/AngularPackages/Slick/slick-carousel/slick.js'
                                 , '/Scripts/AngularPackages/Slick/slick-carousel/slick-theme.css'
                           ]
                       });
                   }]
               },
               Breadcrum: 'Appointment'
           })
   .when('/AppointmentList', {
       templateUrl: '/Appointment/AppointmentList',
       resolve: {
           ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
               debugger;
               return $ocLazyLoad.load({
                   name: 'AppointmentListCtrl',
                   files: ['/Scripts/app/controllers/Clinic/AppointmentListCtrl.js'
                        ,'/Scripts/app/controllers/Clinic/AppointmentController.js'
                        ,'/Scripts/app/controllers/Clinic/NewAppointmentController.js'
                       , '/Scripts/app/services/Clinic/AppointmentService.js'
                       , '/Scripts/app/services/Clinic/DoctorService.js'
                       , '/Scripts/app/services/Master/Configuration/UserService.js'
                       , '/Scripts/app/services/QueueMgt/QueueMgtSrv.js'
                          , '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                       , '/Scripts/app/services/Clinic/ScheduleService.js'

                   ]
               });
           }]
       },
       Breadcrum: 'Appointment List'
   })
       .when('/NewAppointments', {
             templateUrl: '/Appointment/NewAppointments',
             resolve: {
                 ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'AppointmentController',
                         files: ['/Scripts/app/controllers/Clinic/AppointmentController.js'
                               , '/Scripts/app/services/Clinic/AppointmentService.js'
                               , '/Scripts/app/services/Clinic/DoctorService.js',
                               , '/Scripts/app/services/Master/Configuration/UserService.js'
                               , '/Scripts/app/services/Clinic/ScheduleService.js'
                               , "/Scripts/AngularPackages/ngDialog.min.js"
                               , '/Scripts/AngularPackages/Slick/angular-slick/slick.js'
                               , '/Scripts/AngularPackages/Slick/slick-carousel/slick.js'
                               , '/Scripts/AngularPackages/Slick/slick-carousel/slick-theme.css'
                         ]
                     });
                 }]
             },
             Breadcrum: 'NewAppointments'
         })

    .when('/PersonalCharacteristics',
   {
       templateUrl: '/NewRegistration/PatientPersonalCharacteristics',
       resolve: {
           ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
               return $ocLazyLoad.load({
                   name: 'NewRegistrationCtr',
                   files: ['/Scripts/app/controllers/NewRegistration/NewRegistrationController.js?v=3.08',
                       '/Scripts/app/services/NewRegistration/NewRegistrationService.js?v=1.00',
                       '/Scripts/app/services/Master/Patient/PatientVisitService.js']
               });
           }]
       },
       Breadcrum: 'Personal Characteristics'
   })
//Added by Dhanashri sharma 22/12/2022
  
    .when('/PatientAdditional',
   {
       templateUrl: '/NewRegistration/PatientAdditionalInfromation',
      resolve: {
           ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
               return $ocLazyLoad.load({
                   name: 'NewRegistrationCtr',
                   files: ['/Scripts/app/controllers/NewRegistration/NewRegistrationController.js?v=3.08Fr',
                       '/Scripts/app/services/NewRegistration/NewRegistrationService.js?v=1.00',
                       '/Scripts/app/services/Master/Patient/PatientVisitService.js']
               });
           }]
       },
       Breadcrum: 'Personal Additonal Infromation'
   })
   //end
        //Commented by AniketK on 19Nov2019
        // .when('/PatientList',
        //{
        //    templateUrl: '/Registration/PatientList',
        //    resolve: {
        //        ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
        //            return $ocLazyLoad.load({
        //                name: 'RegistrationCtr',
        //                files: ['/Scripts/app/controllers/Patient/RegistrationController.js'
        //                    , '/Scripts/app/services/Patient/RegistartionService.js'
        //                    , '/Scripts/app/services/Master/Patient/PatientVisitService.js']
        //            });
        //        }]
        //    },
        //    Breadcrum: 'Patient List'
        //})

        //Added by AniketK on 19Nov2019
        .when('/PatientList',
        {
            templateUrl: '/NewRegistration/NewPatientList',
            resolve: {
                ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'NewRegistrationCtr',
                        files: ['/Scripts/app/controllers/NewRegistration/NewRegistrationController.js?v=3.08'
                            , '/Scripts/app/services/NewRegistration/NewRegistrationService.js?v=1.00'
                            , '/Scripts/app/services/Master/Patient/PatientVisitService.js']
                    });
                }]
            },
            Breadcrum: 'Patient List'
        })

 // added sujata for Appointment date 7/11/19

           


         // eneded sujata for Appointment date 7/11/19

//Begin:: Added by AniketK on 16Oct2019
    .when('/Doctor',
    {
        templateUrl: '/Doctor/DoctorList',
        resolve: {
            ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'DoctorController',
                    files: ['/Scripts/app/controllers/Clinic/DoctorController.js', '/Scripts/app/services/Master/Clinic/StaffService.js', '/Scripts/app/services/Clinic/DoctorService.js', "/Scripts/AngularPackages/angular-filter.min.js"]
                });
            }]
        },
        Breadcrum: 'Doctor'
    })
    .when('/AddDoctor',
    {
        templateUrl: '/Doctor/AddDoctor',
        resolve: {
            ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'DoctorController',
                    files: ['/Scripts/app/services/Master/Clinic/StaffService.js', '/Scripts/app/services/Clinic/DoctorService.js', "/Scripts/AngularPackages/angular-filter.min.js"]
                });
            }]
        },
        Breadcrum: 'Add Doctor'
    })
//End:: Added by AniketK on 16Oct2019

   .when('/PatientVisit', {
                templateUrl: '/PatientVisit/PatientVisit',
                resolve: {
                    UserRoleController: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'PatientVisitController',
                            files: ['/Scripts/app/controllers/Master/Patient/PatientVisitController.js'
                                , '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                , '/Scripts/app/services/Clinic/DoctorService.js']
                        });
                    }]
                },
                Breadcrum: 'Patient Visit'
            })
    .when('/Queue', {
        templateUrl: 'QueueMgt/QueueList',
        resolve: {
            QueueController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'QueueController',
                    files: ['/Scripts/app/controllers/QueueMgt/QueueMgtctlr.js?v=1.00', '/Scripts/app/services/QueueMgt/QueueMgtSrv.js']
                });
            }]
        },
        Breadcrum: 'Queue'
    })
    .when('/FemaleComplaints', {
        templateUrl: '/FemaleComplaints/FemaleComplaints',
        resolve: {
            FemaleComplaintsController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'FemaleComplaintsController',
                    files: ['/Scripts/app/controllers/EMR/FemaleHistory/FemaleComplaintsController.js?v=1.04', '/Scripts/app/services/EMR/FemaleHistory/FemaleComplaintsService.js?v=1.00']
                });
            }]
        },
        Breadcrum: 'Complaints/FU'
    })
    .when('/Prescription', {
        templateUrl: 'PrescriptionMVC/Index',
        resolve: {
            PrescriptionCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'PrescriptionCtr',
                    files: ['/Scripts/app/controllers/EMR/Prescription/PrescriptionCtr.js', '/Scripts/app/services/EMR/Prescription/PrescriptionSrv.js']
                });
            }]
        },
        Breadcrum: 'Prescription'
    })
    .when('/CryoVitrification', {
        templateUrl: 'CryoPreservationMVC/Index',
        resolve: {
            CryoPreservationCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'CryoPreservationCtr',
                    files: ['/Scripts/app/controllers/ARTMgmt/Cryo-Preservation/CryoPreservationCtr.js']
                });
            }]
        },
        Breadcrum: 'Cryo Vitrification'
    })
    .when('/OocyteVitrification', {
        templateUrl: 'CryoPreservationMVC/OocyteVitrification',
        resolve: {
            OocyteVitrificationCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'OocyteVitrificationCtr',
                    files: ['/Scripts/app/services/ARTMgmt/Cryo-Preservation/CryoPreservationSrv.js', '/Scripts/app/controllers/ARTMgmt/Cryo-Preservation/OocyteVitrificationCtr.js?v=1.01', '/Scripts/app/services/ARTMgmt/Cryo-Preservation/EmbryoVitrificationSrv.js']
                });
            }]
        },
        Breadcrum: 'Oocyte Vitrification'
    })
    .when('/EmbryoVitrification', {
        templateUrl: 'CryoPreservationMVC/EmbryoVitrification',
        resolve: {
            EmbryoVitrificationCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'EmbryoVitrificationCtr',
                    files: ['/Scripts/app/services/ARTMgmt/Cryo-Preservation/EmbryoVitrificationSrv.js', '/Scripts/app/controllers/ARTMgmt/Cryo-Preservation/EmbryoVitrificationCtr.js?v=1.01']
                });
            }]
        },
        Breadcrum: 'Embryo Vitrification'
    })
    .when('/EmbryoThowing', {
        templateUrl: 'CryoPreservationMVC/EmbryoThowing',
        resolve: {
            EmbryoThowingCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'EmbryoThowingCtr',
                    files: ['/Scripts/app/controllers/ARTMgmt/Cryo-Preservation/EmbryoThowingCtr.js?v=1.01',
                            '/Scripts/app/services/ARTMgmt/Cryo-Preservation/EmbryoThowingSrv.js',
                            '/Scripts/app/controllers/ARTMgmt/Cryo-Preservation/DonarOocyteCtrl.js',
                            '/Scripts/app/services/ARTMgmt/Cryo-Preservation/DonarOocyteSrv.js'
                    ]
                });
            }]
        },
        Breadcrum: 'Embryo Thaw'
    })
    .when('/OocyteThowing', {
        templateUrl: 'CryoPreservationMVC/OocyteThowing',
        resolve: {
            OocyteThowingCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'OocyteThowCtr',
                    files: ['/Scripts/app/services/ARTMgmt/Cryo-Preservation/OocyteThowSrv.js',
                            '/Scripts/app/controllers/ARTMgmt/Cryo-Preservation/OocyteThowingCtr.js?v=1.01',
                            '/Scripts/app/controllers/ARTMgmt/Cryo-Preservation/DonarOocyteCtrl.js',
                            '/Scripts/app/services/ARTMgmt/Cryo-Preservation/DonarOocyteSrv.js'
                    ]
                });
            }]
        },
        Breadcrum: 'Oocyte Thaw'
    })
    .when('/ARTCycle', {
        templateUrl: 'NewART/ARTCycle',
        resolve: {
            ctrlNewART: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ctrlNewART',
                    files: ['/Scripts/app/controllers/New ART/NewARTCtlr.js', '/Scripts/app/services/New ART/NewARTSrv.js']
                });
            }]
        },
        Breadcrum: 'Cycles'
    })
        .when('/LinkPartner', {

            templateUrl: 'LinkPartner/LinkPartner',
            resolve: {
                ctrlNewART: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'ctrlLinkPartner',
                        files: ['/Scripts/app/controllers/LinkPartner/LinkPartnerCtrl.js', '/Scripts/app/services/LinkPartner/LinkPartnerSrv.js']
                    });
                }]
            },
            Breadcrum: 'Link Partner'
        })
    .when('/MaleComplaints', {
        templateUrl: 'MaleComplaints/MaleComplaints',
        resolve: {
            MaleComplaintsController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'MaleComplaintsController',
                    files: ['/Scripts/app/controllers/EMR/MaleHistory/MaleComplaintsController.js', '/Scripts/app/services/EMR/MaleHistory/MaleComplaintsService.js']
                });
            }]
        },
        Breadcrum: 'Complaints/FU'
    })
    .when('/Vitals', {
        templateUrl: 'VitalsMVC/VitalsView',
        resolve: {
            VitalsCltr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'VitalsCltr',
                    files: ['/Scripts/app/controllers/EMR/Vitals/VitalsCtrl.js', '/Scripts/app/services/EMR/Vitals/VitalsSrv.js']
                });
            }]
        },
        Breadcrum: 'Vitals'
    })
    .when('/OPU', {
        templateUrl: 'OPUMVC/NewOPU',
        resolve: {
            QueueController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'QueueController',
                    files: ['/Scripts/app/controllers/ARTMgmt/OPU/OPUCtr.js?v=1.00', '/Scripts/app/services/ARTMgmt/OPU/OPUSrv.js']
                });
            }]
        },
        Breadcrum: 'Ovum Pick Up'
    })
    .when('/FollicularScan', {
        templateUrl: 'FollicularScan/FollicularScan',
        resolve: {
            QueueController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'FollicularScanController',
                    files: ['/Scripts/app/controllers/EMR/FemaleHistory/FollicularScanController.js?v=1.08', '/Scripts/app/services/EMR/FemaleHistory/FollicularScanService.js?v=1.02']
                });
            }]
        },
        Breadcrum: 'Follicular Scan'
    })
        //Added by Nayan Kamble
        .when('/CorpusLeteumScan', {
            templateUrl: 'CorpusLeteumScan/CorpusLeteumScan',
            resolve: {
                QueueController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'CorpusLeteumScanController',
                        files: ['/Scripts/app/controllers/EMR/FemaleHistory/CorpusLeteumScanController.js', '/Scripts/app/services/EMR/FemaleHistory/CorpusLeteumScanService.js']
                    });
                }]
            },
            Breadcrum: 'Corpus Leteum Scan'
        })
    .when('/CycleNav', {
        templateUrl: 'ARTCycleNavigationMVC/ARTCycleNavigation',
        resolve: {
            ARTCycleNavigationCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ARTCycleNavigationCtr',
                    files: ['/Scripts/app/controllers/ARTMgmt/ARTCycleNavigation/ARTCycleNavigationCtr.js', '/Scripts/app/services/ARTMgmt/ARTCycleNavigation/ARTCycleNavigationSrv.js']
                });
            }]
        }
    })
    .when('/UploadReport', {
        templateUrl: 'ReportUploadMVC/UploadReport',
        resolve: {
            QueueController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'QueueController',
                    files: ['/Scripts/app/controllers/ARTMgmt/ReportUpload/ReportUploadCtr.js', '/Scripts/app/services/ARTMgmt/ReportUpload/ReportUploadSrv.js?v=1.01']
                });
            }]
        },
        Breadcrum: 'Report upload'
    })
    .when('/PathalogyReport', {
        templateUrl: 'ReportUploadMVC/PathalogyReport',
        resolve: {
            PathalogyReportCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'PathalogyReportCtr',
                    files: ['/Scripts/app/controllers/ARTMgmt/ReportUpload/PathalogyReportCtr.js?v=1.13', '/Scripts/app/services/ARTMgmt/ReportUpload/ReportUploadSrv.js?v=1.01']
                });
            }]
        },
        Breadcrum: 'Pathalogy Report'
    })
    .when('/Embrology', {
        templateUrl: 'EmbrologyMVC/EmbrologyView',
        resolve: {
            Embrology: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'Embrology',
                    files: ['/Scripts/app/controllers/ARTMgmt/Embrology/EmbrologyMainCtrl.js',
                           '/Scripts/app/services/ARTMgmt/Embrology/EmbrologyMainSrv.js',
                      
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day0Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day1Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day2Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day3Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day4Ctrl.js?v=1.15',
                           '/Scripts/app/services/ARTMgmt/Embrology/DayOneSrv.js',      
                           '/Scripts/app/services/ARTMgmt/Embrology/DayTwoSrv.js',      
                           '/Scripts/app/services/ARTMgmt/Embrology/DayThreeSrv.js',    
                           '/Scripts/app/services/ARTMgmt/Embrology/DayZeroSrv.js',     
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day0Ctrl.js?v=1.15',
                           '/Scripts/app/services/ARTMgmt/Embrology/DayFourSrv.js',     
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day5Ctrl.js?v=1.15',
                           '/Scripts/app/services/ARTMgmt/Embrology/DayFiveSrv.js',     
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day6Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day7Ctrl.js?v=1.15',
                           '/Scripts/app/services/ARTMgmt/Embrology/DaySixSrv.js',
                           '/Scripts/app/services/ARTMgmt/Embrology/DaySevenSrv.js',
                           '/Scripts/app/services/ARTMgmt/Cryo-Preservation/EmbryoVitrificationSrv.js'
                    ]
                });
            }]
        },
        Breadcrum: 'Embryology'
    })
    .when('/PGT', {
        templateUrl: 'EmbrologyMVC/PGT',
        resolve: {
            Embrology: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'PGT',
                    files: ['/Scripts/app/controllers/ARTMgmt/Embrology/EmbrologyMainCtrl.js',
                           '/Scripts/app/services/ARTMgmt/Embrology/EmbrologyMainSrv.js',
                   
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day0Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day1Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day2Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day3Ctrl.js?v=1.15',
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day4Ctrl.js?v=1.15',
                           '/Scripts/app/services/ARTMgmt/Embrology/DayOneSrv.js',      
                           '/Scripts/app/services/ARTMgmt/Embrology/DayTwoSrv.js',      
                           '/Scripts/app/services/ARTMgmt/Embrology/DayThreeSrv.js',    
                           '/Scripts/app/services/ARTMgmt/Embrology/DayZeroSrv.js',     
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day0Ctrl.js?v=1.15',
                           '/Scripts/app/services/ARTMgmt/Embrology/DayFourSrv.js',     
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day5Ctrl.js?v=1.15',
                           '/Scripts/app/services/ARTMgmt/Embrology/DayFiveSrv.js',     
                           '/Scripts/app/controllers/ARTMgmt/Embrology/day6Ctrl.js?v=1.15',
                           '/Scripts/app/services/ARTMgmt/Embrology/DaySixSrv.js',
                           '/Scripts/app/services/ARTMgmt/Cryo-Preservation/EmbryoVitrificationSrv.js'
                    ]
                });
            }]
        },
        Breadcrum: 'PGT'
    })
    .when('/EmbryoTransfer', {
        templateUrl: 'EmbryoTransferMVC/Index',
        resolve: {
            EmbryoTransfer: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'EmbryoTransfer',
                    files: ['/Scripts/app/controllers/ARTMgmt/EmbryoTransfer/EmbryoTransferCtrl.js?v=1.03', '/Scripts/app/services/ARTMgmt/EmbryoTransfer/EmbryoTransferSrv.js']
                });
            }]
        },
        Breadcrum: 'Embryo Transfer'
    })
    .when('/DesignEMR', {
        templateUrl: 'DesignEMR/Index',
        resolve: {
            DesignEMR: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'DesignEMR',
                    files: ['/Scripts/app/controllers/EMR/Design EMR/DesignEMRIndexCltr.js', '/Scripts/app/services/EMR/Design EMR/DesignEMRSrv.js?v=1.06']
                });
            }]
        },
        Breadcrum: 'Design EMR'
    })
    .when('/IUI', {
        templateUrl: 'IUIMVC/Index',
        resolve: {
            IUIController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'IUIController',
                    files: ['/Scripts/app/controllers/ARTMgmt/IUI/IUICtrl.js?v=1.06', '/Scripts/app/services/ARTMgmt/IUI/IUISrv.js', '/Scripts/app/services/Donor/DonorSrv.js']
                });
            }]
        },
        Breadcrum: 'IUI'
    })
    .when('/StimulationChart', {
        templateUrl: 'ARTCycleNavigationMVC/StimulationChart',
        resolve: {
            ARTCycleNavigationCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ARTCycleNavigationCtr',
                    files: ['/Scripts/app/controllers/ARTMgmt/ARTCycleNavigation/StimulationChartController.js', '/Scripts/app/services/ARTMgmt/ARTCycleNavigation/StimulationChartService.js']
                });
            }]
        },
        Breadcrum: 'Stimulation Chart'
    })

     //Added by Divya For Dashboard On 03 jan 2020
       .when('/PatientDashboard',
        {
            templateUrl: 'DashboardMVC/PatientDashboard',
            resolve: {
                PatientDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'PatientDashboardCtrl',
                        files: ['/Scripts/app/controllers/PatientDashboard/PatientDashboardCtrl.js',
                        '/Scripts/app/controllers/PatientDashboard/customModalCtrl.js'
                            , '/Scripts/app/services/PatientDashboard/PatientDashboardSrv.js']
                    });
                }]
            },
            Breadcrum: 'Lab Dashboard'
        })

       .when('/PatientDashboardList',
        {
            templateUrl: 'DashboardMVC/PatientDashboardList',
            resolve: {
                PatientDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'PatientListCtrl',
                        files: ['/Scripts/app/controllers/PatientDashboard/PatientListCtrl.js'
                            , '/Scripts/app/services/PatientDashboard/PatientDashboardSrv.js']
                    });
                }]
            },
            Breadcrum: 'Due Patient List'
        })
         //Ended by Divya For Dashboard On 03 jan 2020
        .when('/FertivueDashboard',
        {
            templateUrl: 'DashboardMVC/fertivueDashboard',
            resolve: {
                PatientDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'fertivueDashboardCtrl',
                        files: ['/Scripts/app/controllers/PatientDashboard/fertivueDashboardCtrl.js',
                        '/Scripts/app/controllers/PatientDashboard/customModalCtrl.js'
                            , '/Scripts/app/services/PatientDashboard/PatientDashboardSrv.js']
                    });
                }]
            },
            Breadcrum: 'Admin Dashboard'
        })
      
      .when('/ClinicalDashboard',
        {
            templateUrl: 'DashboardMVC/clinicalDashboard',
            resolve: {
                PatientDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'clinicalDashboardCtrl',
                        files: ['/Scripts/app/controllers/PatientDashboard/clinicalDashboardCtrl.js',
                              '/Scripts/app/controllers/PatientDashboard/customModalCtrl.js'
                            , '/Scripts/app/services/PatientDashboard/PatientDashboardSrv.js']
                    });
                }]
            },
            Breadcrum: 'Clinical Dashboard'
        })
       .when('/FinancialKPIs',
        {
            templateUrl: 'FinancialKPIs/FinancialKPIs',
            resolve: {
                FinancialKPIsCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'FinancialKPIs',
                        files: ['/Scripts/app/controllers/FinancialKPIs/FinancialKPIsCtrl.js'
                              , '/Scripts/app/services/FinancialKPIs/FinancialKPIsSrv.js'
                        ]
                    });
                }]
            },
            Breadcrum: 'Financial KPIs'
        })

    .when('/Donor', {
        templateUrl: 'DonorMVC/IndexDonor',
        resolve: {
            DonorCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'DonorCtr',
                    files: ['/Scripts/app/controllers/Donor/DonorCtr.js?v=1.00', '/Scripts/app/services/Donor/DonorSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js']
                });
            }]
        },
        Breadcrum: 'Donor'
    })
     .when('/Kpis', {
         templateUrl: 'KPI/Index',
         resolve: {
             KPICtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load({
                     name: 'KPICtr',
                     files: ['/Scripts/app/controllers/KPI/KPICtr.js', '/Scripts/app/services/KPI/kpisrv.js']
                 });
             }]
         },
         Breadcrum: 'KPI'
     })
           .when('/Managementreport', {
               templateUrl: 'KPI/Management',
               resolve: {
                   KPICtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: 'KPICtr',
                           files: ['/Scripts/app/controllers/KPI/ManagementCtr.js', '/Scripts/app/services/KPI/Managementsrv.js']
                       });
                   }]
               },
               Breadcrum: 'Management Report'
           })
         .when('/Mis', {
             templateUrl: 'MIS/Index',
             resolve: {
                 KPICtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'MISCtr',
                         files: ['/Scripts/app/controllers/MIS/MISCtr.js',
                          '/Scripts/app/services/PatientDashboard/PatientDashboardSrv.js']
                     });
                 }]
             },
             Breadcrum: 'MIS'
         })
          .when('/PatientAdvanceReport', {
             templateUrl: 'MISBill/PatientAdvanceReport',
             resolve: {
                 PatientAdvanceReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'PatientAdvanceReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/PatientAdvanceReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'PatientAdvanceReport'
         })
          .when('/ServiceWiseBillingReport', {
             templateUrl: 'MISBill/ServiceWiseBillingReport',
             resolve: {
                 ServiceWiseBillingReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'ServiceWiseBillingReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/ServiceWiseBillingReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'ServiceWiseBillingReport'
         })
      .when('/RefundReport', {
             templateUrl: 'MISBill/RefundReport',
             resolve: {
                 RefundReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'RefundReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/RefundReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'RefundReport'
         })
          .when('/DailyOutstandingReport', {
             templateUrl: 'MISBill/DailyOutstandingReport',
             resolve: {
                 DailyOutstandingReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'DailyOutstandingReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/DailyOutstandingReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'DailyOutstandingReport'
         })
          .when('/DailyRevenueReport', {
             templateUrl: 'MISBill/DailyRevenueReport',
             resolve: {
                 DailyRevenueReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'DailyRevenueReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/DailyRevenueReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'DailyRevenueReport'
         })

           .when('/Addstock', {
             templateUrl: 'Billing/AddStock',
             resolve: {
                 DailyRevenueReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'DailyRevenueReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/DailyRevenueReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },   
             Breadcrum: 'Add Stock'
         })

           .when('/Consumption', {
             templateUrl: 'Billing/Consumption',
             resolve: {
                 ConsumptionCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'ConsumptionCtrl',
                         files: [
                         '/Scripts/app/controllers/Billing/ConsumptionCtrl.js',
                          '/Scripts/app/services/Billing/ConsumptionService.js'   ,
                          '/Scripts/app/controllers/Billing/ConsumptionModalController.js'
                                ,
 '/Scripts/app/services/Billing/BillingService.js'
                                ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                 ,'/Scripts/app/controllers/Billing/cancelbillmodalopopupctrl.js'
                                ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
                                 ,'/Scripts/app/services/Billing/PatientAdvanceRefundSrv.js'
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'New Consumption'
         })
  .when('/ConsumptionList', {
             templateUrl: 'Billing/ConsumptionList',
             resolve: {
                 ConsumptionCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'ConsumptionCtrl', 
                         files: [
                         '/Scripts/app/controllers/Billing/ConsumptionCtrl.js',
                          '/Scripts/app/services/Billing/ConsumptionService.js'   ,
 '/Scripts/app/services/Billing/BillingService.js',
  '/Scripts/app/controllers/Billing/ConsumptionModalController.js'
                                
                                ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                 ,'/Scripts/app/controllers/Billing/cancelbillmodalopopupctrl.js'
                                ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
                                 ,'/Scripts/app/services/Billing/PatientAdvanceRefundSrv.js'
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'Consumption List'
         })
              .when('/Pharmacysale', {
             templateUrl: 'Billing/PharmacySale',
             resolve: {
                 PharmacySalesCtrl : ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'PharmacySalesCtrl',
                         files: [                     
                             '/Scripts/app/controllers/Billing/PharmacySalesCtrl.js',
                              '/Scripts/app/controllers/Billing/pharmacysalesdetailsmodalCtrl.js',
                            '/Scripts/app/services/Billing/BillingService.js'
                             , '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                             ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
                             ]
                     });
                 }]
             },
             Breadcrum: 'Pharmacy Sale'
         })

          .when('/NewPharmacysale', {
             templateUrl: 'Billing/NewPharmacySale',
             resolve: {
                 PharmacySalesCtrl : ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'PharmacySalesCtrl',
                         files: [                     
                             '/Scripts/app/controllers/Billing/PharmacySalesCtrl.js',
                             '/Scripts/app/controllers/Billing/pharmacysalesdetailsmodalCtrl.js',
                            '/Scripts/app/services/Billing/BillingService.js'
                             , '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                             ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
                             ]
                     });
                 }]
             },
             Breadcrum: 'New Pharmacy Sale'
         })

           .when('/Salesreturn', {
             templateUrl: 'Billing/SalesReturn',
             resolve: {
                 DailyRevenueReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'DailyRevenueReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/DailyRevenueReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'Sales Return'
         })
             .when('/DiscountRegisterReport', {
             templateUrl: 'MISBill/DiscountRegisterReport',
             resolve: {
                 DiscountRegisterReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'DiscountRegisterReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/DiscountRegisterReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'DiscountRegisterReport'
         })
             .when('/DailyCollectionReport', {
             templateUrl: 'MISBill/DailyCollectionReport',
             resolve: {
                 DailyCollectionReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'DailyCollectionReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/DailyCollectionReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'DailyCollectionReport'
         })

            .when('/PatientSummaryReport', {
             templateUrl: 'MISBill/PatientSummaryReport',
             resolve: {
                 PatientSummaryReportCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'PatientSummaryReportCtrl',
                         files: [
                         '/Scripts/app/controllers/PatientReport/PatientSummaryReportCtrl.js',
                          '/Scripts/app/services/PatientReports/PatientReportsService.js'   
                             
                             ]
                     });
                 }]
             },
             Breadcrum: 'PatientSummaryReport'
         })

    .when('/AddDonor', {
        templateUrl: 'DonorMVC/ViewDonor',
        resolve: {
            DonorCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'DonorCtr',
                    files: ['/Scripts/app/controllers/Donor/DonorCtr.js?v=1.00', '/Scripts/app/services/Donor/DonorSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js']
                });
            }],
            Breadcrum: function ($location, $route) {

                var urlParams = $location.search();
                if (urlParams.Edit)
                    $route.current.$$route.Breadcrum = 'Edit Donor';
                else $route.current.$$route.Breadcrum = 'New Donor';
            }
        },
    })
    .when('/NewDonorSample', {
        templateUrl: 'DonorMVC/NewSample',
        resolve: {
            DonorCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'DonorCtr',
                    files: ['/Scripts/app/controllers/Donor/DonorCtr.js?v=1.00', '/Scripts/app/services/Donor/DonorSrv.js', '/Scripts/app/services/EMR/MaleHistory/srvSemenFreez.js']
                });
            }]
        },
        Breadcrum: 'Donor Sample'
    })
    .when('/EMRLandingPage', {
        templateUrl: 'EMRLandingPageMVC/EMRLandingPage',
        resolve: {
            EMRLandingPageCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'EMRLandingPageCtr',
                    files: ['/Scripts/app/controllers/EMR/LandingPage/EMRLandingPageCtr.js?v=1', '/Scripts/app/services/EMR/LandingPage/EMRLandingPageSrv.js']
                });
            }]
        },
        Breadcrum: 'EMR Dashboard'
    })
    // Begin:: Added by sujata on 16Oct2019
          .when('/DSchedule', {
       templateUrl: '/DoctorDailyAppt/DoctorScheduleLanding',
       resolve: {
           ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
               return $ocLazyLoad.load({
                   name: 'DoctorScheduleLandingController',
                   files: ["/Scripts/app/controllers/Clinic/DoctorDailyApptController.js"
                       , "/Scripts/app/controllers/Clinic/DoctorScheduleLandingController.js"
                       , '/Scripts/app/services/Clinic/DoctorService.js'
                       , '/Scripts/app/services/Master/Configuration/UserService.js'
                       , '/Scripts/app/services/Clinic/ScheduleService.js'
                       , '/Scripts/app/services/QueueMgt/QueueMgtSrv.js'
                   ]
               });
           }]
       },
       Breadcrum: 'DoctorScheduleLanding'

     })
// End:: Added by sujata on 16Oct2019
  
    // Begin:: Added by sujata on 16Oct2019
     .when('/DoctorDailyAppt', {
       templateUrl: '/DoctorDailyAppt/DoctorDailyAppt',
       resolve: {
           ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
               return $ocLazyLoad.load({
                   name: 'DoctorDailyApptController',
                   files: ['/Scripts/app/controllers/Clinic/DoctorDailyApptController.js'
                       , '/Scripts/app/services/Clinic/DoctorService.js'
                       , '/Scripts/app/services/Master/Configuration/UserService.js'
                       , '/Scripts/app/services/Clinic/ScheduleService.js'
                       , '/Scripts/app/services/QueueMgt/QueueMgtSrv.js'
                   ]

               });
           }]
       },
       Breadcrum: 'DoctorDailyAppt'
   })

      // End:: Added by sujata on 16Oct2019


    .when('/CycleOverview', {
        templateUrl: 'NewART/CycleOverview',
        resolve: {
            ctrlNewART: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ctrlNewART',
                    files: ['/Scripts/app/controllers/New ART/NewARTCtlr.js',
                        '/Scripts/app/services/EMR/LandingPage/EMRLandingPageSrv.js',
                        '/Scripts/app/controllers/New ART/PACCtrl.js',
                        '/Scripts/app/controllers/New ART/PACViewCtrl.js','/Scripts/app/controllers/EMR/Design EMR/EMRTemplateCtr.js?v=1.11'
                    ]
                });
            }]
        },
        Breadcrum: 'Overview'
    })
    .when('/SemenDetails', {
        templateUrl: 'SemenDetails/SemenDetails',
        resolve: {
            ctrlNewART: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'SemenDetailsController',
                    files: ['/Scripts/app/controllers/ARTMgmt/SemenDetails/SemenDetailsController.js?v=1.01',
                        '/Scripts/app/services/ARTMgmt/SemenDetails/SemenDetailsService.js',
                        '/Scripts/app/services/ARTMgmt/IUI/IUISrv.js']
                });
            }]
        },
        Breadcrum: 'Semen Details'
    })
    .when('/Investigation', {
        templateUrl: 'InvestigationMVC/Investigation',
        resolve: {
            InvestigationCtr: ['$ocLazyLoad', '$injector', function ($ocLazyLoad, $injector) {
                return $ocLazyLoad.load({
                    name: 'InvestigationCtr',
                    files: ['/Scripts/app/controllers/EMR/Investigation/InvestigationCtr.js', '/Scripts/app/services/EMR/Investigation/InvestigationSrv.js', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js']
                });
            }],
        },
        Breadcrum: 'Investigation'
    })
   .when('/OrderCycle', {
       templateUrl: 'InvestigationMVC/OrderCycle',
               resolve: {
                   InvestigationCtr: ['$ocLazyLoad', '$injector', function ($ocLazyLoad, $injector) {
                       return $ocLazyLoad.load({
                           name: 'InvestigationCtr',
                           files: ['/Scripts/app/controllers/EMR/Investigation/InvestigationCtr.js', '/Scripts/app/services/EMR/Investigation/InvestigationSrv.js', '/Scripts/app/services/EMR/MaleHistory/SemenPrepService.js']
                       });
                   }],
               },
               Breadcrum: 'Investigation'
    })
    .when('/EmrTemplate', {
        templateUrl: 'EMRLandingPageMVC/EMRTemplateLandingPage',
        resolve: {
            EMRTemplateCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'EMRTemplateCtr',
                    files: ['/Scripts/app/controllers/EMR/Design EMR/EMRTemplateCtr.js?v=1.11', '/Scripts/app/services/EMR/Design EMR/EMRTemplateSrv.js', '/Scripts/app/services/EMR/Design EMR/DesignEMRSrv.js?v=1.06']
                });
            }]
        },
        Breadcrum: 'EMR Dashboard'
    })
    .when('/QualityControl', {
        templateUrl: 'QualityControlMVC/QualityControl',
        resolve: {
            QualityControlCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'QualityControlCtrl',
                    files: ['/Scripts/app/controllers/QualityControl/QualityControlCtrl.js', '/Scripts/app/services/QualityControl/QualityContolSrv.js']
                });
            }]
        },
        Breadcrum: 'QualityControl'
    })
    .when('/Outcome', {
        templateUrl: 'OutcomeMVC/Outcome',
        resolve: {
            OutcomeCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'OutcomeCtr',
                    files: ['/Scripts/app/controllers/ARTMgmt/Outcome/OutcomeCtr.js', '/Scripts/app/services/ARTMgmt/Outcome/OutcomeSrv.js']
                });
            }]
        },
        Breadcrum: 'Outcome'
    })
    .when('/ViewConsentMaster', {
        templateUrl: 'ConsentMasterMVC/ViewConcent',
        resolve: {
            ConsentViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ConsentViewCtr',
                    files: ['/Scripts/app/controllers/Consent/ConsentMaster/ConsentViewCtr.js?v=1', '/Scripts/app/services/Consent/ConsentMaster/ConsentViewSrv.js']
                });
            }]
        },
        Breadcrum: 'View Consent Master'
    })
    .when('/ConsentMaster', {
        templateUrl: 'ConsentMasterMVC/LandingPage',
        resolve: {
            ConsentIndexCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ConsentIndexCtr',
                    files: ['/Scripts/app/controllers/Consent/ConsentMaster/ConsentIndexCtr.js?v=1', '/Scripts/app/services/Consent/ConsentMaster/ConsentIndexSrv.js']
                });
            }]
        },
        Breadcrum: 'Consent'
    })
        //.when('/NewBilling', {
        //    templateUrl: 'Billing/NewBilling',
        //    resolve: {               
        //        BillingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        //            debugger;
        //        return $ocLazyLoad.load({
        //            name: 'BillingCtrl',
        //            files: ['/Scripts/app/controllers/Billing/BillingCtrl.js','/Scripts/app/services/Billing/BillingService.js']  // '/Scripts/app/services/Billing/BillingService.js'
        //        });
        //    }]
        //},
        //Breadcrum:'Billing'
        //})



          .when('/NewBilling', {
              templateUrl: 'Billing/NewBilling',
              resolve: {
                  BillingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                      debugger;
                      return $ocLazyLoad.load({
                          name: 'BillingCtrl',
                          files: ['/Scripts/app/controllers/Billing/BillingController.js',
                              '/Scripts/app/services/Billing/BillingService.js'
                               , '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
                          ]  // '/Scripts/app/services/Billing/BillingService.js'
                      });
                  }]
              },
              Breadcrum: 'Billing'
          })

        .when('/BillList', {                                     //Added by Nayan Kamble on 31/12/2019
            templateUrl: 'Billing/BillList',
            resolve: {
                BillingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    debugger;
                    return $ocLazyLoad.load({
                        name: 'BillingCtrl',
                        files: ['/Scripts/app/controllers/Billing/BillingController.js',
                            '/Scripts/app/services/Billing/BillingService.js'
                             , '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                             ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
                        ]  // '/Scripts/app/services/Billing/BillingService.js'
                    });
                }]
            },
            Breadcrum: 'Bill List'
        })


         .when('/PrescribedServices', {                                     //Added by Nayan Kamble on 31/12/2019
             templateUrl: 'Billing/PrescribedServices',
             resolve: {
                 BillingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     debugger;
                     return $ocLazyLoad.load({
                         name: 'BillingCtrl',
                         files: ['/Scripts/app/controllers/Billing/BillingController.js'
                                , '/Scripts/app/services/Billing/BillingService.js'
                                ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
                                ]  // '/Scripts/app/services/Billing/BillingService.js'
                     });
                 }]
             },
             Breadcrum: 'Prescribed Services'
         })

         //.when('/PatientBillList', {                                     //Added by Nayan Kamble on 27/02/2019
         //    templateUrl: 'Billing/PatientBillList',
         //    resolve: {
         //        BillingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
         //            debugger;
         //            return $ocLazyLoad.load({
         //                name: 'BillingCtrl',
         //                files: ['/Scripts/app/controllers/Billing/BillingController.js'
         //                , '/Scripts/app/services/Billing/BillingService.js'
         //                ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
         //                ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
         //                ]  // '/Scripts/app/services/Billing/BillingService.js'
         //            });
         //        }]
         //    }, 
         //    Breadcrum: 'Prescribed Services'
         //})

         .when('/PatientBillList', {                                     //Added by Nayan Kamble on 27/02/2019
             templateUrl: 'Billing/PatientBillList',
             resolve: {
                 BillingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     debugger;
                     return $ocLazyLoad.load({
                         name: 'BillingCtrl',
                         files: ['/Scripts/app/controllers/Billing/BillingController.js'
                                , '/Scripts/app/services/Billing/BillingService.js'
                                ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                 ,'/Scripts/app/controllers/Billing/cancelbillmodalopopupctrl.js'
                                ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js',
                                 ,'/Scripts/app/services/Billing/PatientAdvanceRefundSrv.js'
                        /// , '/Scripts/app/services/Billing/BillingService.js'
                         ]
                     });
                 }]
             },
             Breadcrum: 'Bill List'
         })
        .when('/PatientNewBilling', {      //Added by Nayan Kamble on 27/02/2019                         
             templateUrl: 'Billing/PatientNewBilling',
             resolve: {
                 BillingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     debugger;
                     return $ocLazyLoad.load({
                         name: 'BillingCtrl',
                         files: ['/Scripts/app/controllers/Billing/BillingController.js'
                                , '/Scripts/app/services/Billing/BillingService.js'
                                ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                               
                                ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js'
                        /// , '/Scripts/app/services/Billing/BillingService.js'
                         ]
                     });
                 }]
             },
             Breadcrum: 'New Bill'
         })
         .when('/MISBill', {
             templateUrl: 'MISBill/MISBILL',
             resolve: {
                 MISBillCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'MISBillCtr',
                         files: ['/Scripts/app/controllers/MISBill/MISBillCtr.js']
                     });
                 }]
             },
             Breadcrum: 'MISBill'
         })
          //Added by divya on 31Aug2020
          .when('/CounterSale',
        {
            templateUrl: 'CounterSale/CounterSale',
            resolve: {
                FinancialKPIsCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'CounterSaleCtrl',
                        files: ['/Scripts/app/controllers/CounterSale/CounterSaleCtrl.js'
                              , '/Scripts/app/services/CounterSale/CounterSaleSrv.js',
                              '/Scripts/app/services/Master/Patient/PatientVisitService.js',
                              '/Scripts/app/services/Master/Inventory/StoreService.js',
                              '/Scripts/app/services/NewRegistration/NewRegistrationService.js?v=1.00'
                        ]
                    });
                }]
            },
            Breadcrum: 'Counter Sale'
        })

         //Added by Yogitak on 17mrach2021
          .when('/MaterialConsumptionEntry',
        {
            templateUrl: 'MaterialConsumptionEntry/MaterialConsumptionEntry',
            resolve: {
                MaterialConsumptionEntryCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                debugger;
                    return $ocLazyLoad.load({
                        name: 'MaterialConsumptionEntryCtrl',
                        files: ['/Scripts/app/controllers/MaterialConsumptionEntry/MaterialConsumptionEntryCtrl.js'
                               , '/Scripts/app/services/MaterialConsumptionEntry/MaterialConsumptionEntrySrv.js',
                                // , '/Scripts/app/services/MaterialConsumptionEntry/MaterialConsumptionEntry.js',
                              '/Scripts/app/services/Master/Patient/PatientVisitService.js',
                              '/Scripts/app/services/Master/Inventory/StoreService.js',
                              '/Scripts/app/services/CounterSale/CounterSaleSrv.js'
                              
                             
                             // '/Scripts/app/services/NewRegistration/NewRegistrationService.js?v=1.00'
                                           ]
                              
                    
                    });
                }]
            },
            Breadcrum: 'MaterialConsumption Entry'
        })

 //Added by Yogitak on 5april2021
          .when('/MaterialConsumptionList',
        {
            templateUrl: 'MaterialConsumptionList/MaterialConsumptionList',
            resolve: {
                MaterialConsumptionListController: ['$ocLazyLoad', function ($ocLazyLoad) {
                debugger;
                    return $ocLazyLoad.load({
                        name: 'MaterialConsumptionListController',
                        files: ['/Scripts/app/controllers/MaterialConsumptionList/MaterialConsumptionListController.js'
                               , '/Scripts/app/services/MaterialConsumptionList/MaterialConsumptionListSrv.js',
                               
                              '/Scripts/app/services/Master/Patient/PatientVisitService.js',
                             '/Scripts/app/services/Master/Inventory/StoreService.js',
                             '/Scripts/app/services/CounterSale/CounterSaleSrv.js'
                              ,'/Scripts/app/services/Clinic/DoctorService.js'
                              
                             
                             // '/Scripts/app/services/NewRegistration/NewRegistrationService.js?v=1.00'
                                           ]
                              
                    
                    });
                }]
            },
            Breadcrum: 'MaterialConsumption List'
        })



          .when('/NewLabEntery', {
              templateUrl: 'Lab/NewLabEntery',
              resolve: {
                  NewLabEntryCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                      debugger;
                      return $ocLazyLoad.load({
                          name: 'NewLabEntryCtr',
                          files: ['/Scripts/app/controllers/Lab/NewLabEntryCtr.js',
                              '/Scripts/app/services/Lab/NewLabEnterySrv.js'
                              
                          ]  
                      });
                  }]
              },
              Breadcrum: 'Lab'
          })

        .when('/LabTestList', {                                     //Added by Nayan Kamble on 31/12/2019
            templateUrl: 'Lab/LabTestList',
            resolve: {
                BillingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    debugger;
                    return $ocLazyLoad.load({
                        name: 'LabTestListCtr',
                        files: ['/Scripts/app/controllers/Lab/LabTestListCtr.js',
                                '/Scripts/app/services/Lab/NewLabEnterySrv.js'
                            // , '/Scripts/app/services/Master/Patient/PatientVisitService.js'
                        ]  // '/Scripts/app/services/Billing/BillingService.js'
                    });
                }]
            },
            Breadcrum: 'LabTestList'
        })

        .when('/PatientAdvance', {
             templateUrl: 'PatientAdvance/Index',
             resolve: {
                 PatientAdvanceCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'PatientAdvanceCtr',
                         files: ['/Scripts/app/controllers/Billing/PatientAdvanceCtr.js',
                                 '/Scripts/app/services/Billing/PatientAdvanceSrv.js',
'/Scripts/app/services/Billing/BillingService.js',
                                 '/Scripts/app/services/Master/Patient/PatientVisitService.js']
                     });
                 }]
             },
             Breadcrum: 'Advance Lists'
        })

         .when('/NewAdvance', {
             templateUrl: 'PatientAdvance/NewAdvance',
             resolve: {
                 PatientAdvanceCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'PatientAdvanceCtr',
                         files: ['/Scripts/app/controllers/Billing/PatientAdvanceCtr.js',
                                 '/Scripts/app/services/Billing/PatientAdvanceSrv.js',
                                  '/Scripts/app/services/Billing/BillingService.js',
                                 '/Scripts/app/services/Master/Patient/PatientVisitService.js']
                     });
                 }]
             },
             Breadcrum: 'New Advance'
         })
         
         .when('/PatientAdvanceRefund', {
             templateUrl: 'PatientAdvanceRefund/Index',
             resolve: {
                 PatientAdvanceRefundCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'PatientAdvanceRefundCtr',
                         files: ['/Scripts/app/controllers/Billing/PatientAdvanceRefundCtr.js'
                                 ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                 ,'/Scripts/app/services/Billing/PatientAdvanceRefundSrv.js'
                                 ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js']                                                                
                     });
                 }]
             },
             Breadcrum: 'Patient Advance Refund'
         })

          .when('/PatientAdvanceRefundLists', {
             templateUrl: 'PatientAdvanceRefund/AdvanceRefundlist',
             resolve: {
                 PatientAdvanceRefundCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'PatientAdvanceRefundCtr',
                         files: ['/Scripts/app/controllers/Billing/PatientAdvanceRefundCtr.js'
                                 ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                 ,'/Scripts/app/services/Billing/PatientAdvanceRefundSrv.js'
                                 ,'/Scripts/app/services/Billing/PatientAdvanceSrv.js']                                                                
                     });
                 }]
             },
             Breadcrum: 'Patient Advance Refund Lists'
         })
               .when('/PatientBillRefundLists', {
             templateUrl: 'PatientAdvanceRefund/PatientBillRefundList',
             resolve: {
                 PatientBillRefundCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                 
                     return $ocLazyLoad.load({
                         name: 'PatientBillRefundCtr',
                         files: ['/Scripts/app/controllers/Billing/PatientBillRefundCtrl.js'
                                 ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                 ,'/Scripts/app/services/Billing/PatientBillRefundSrv.js'
                                 ,'/Scripts/app/services/Billing/BillingService.js']                                                                
                     });
                 }]
             },
             Breadcrum: 'Patient Bill Refund Lists'
         })
               .when('/PatientBillRefund', {
               
             templateUrl: 'PatientAdvanceRefund/NewPatientBillRefund',

             resolve: {
                 PatientBillRefundCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                 debugger;
                     return $ocLazyLoad.load({
                         name: 'PatientBillRefundCtr',
                         files: ['/Scripts/app/controllers/Billing/PatientBillRefundCtrl.js'
                                 ,'/Scripts/app/services/Master/Patient/PatientVisitService.js'
                                 ,'/Scripts/app/services/Billing/PatientBillRefundSrv.js'
                                 ,'/Scripts/app/services/Billing/BillingService.js']                                                                 
                     });
                 }]
             },
             Breadcrum: 'Patient Bill Refund'
         })

           .when('/ViewReport', {
            templateUrl: 'ReportView/ViewReport',
            resolve: {
                ReportViewCtr: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'ReportViewCtr',
                        files: ['/Scripts/app/controllers/Report/ReportViewCtr.js', '/Scripts/app/services/Report/ReportViewSrv.js']
                    });
                }]
            }
        })
        .otherwise(
        {
            redirectTo: '/Login'
        });

    $ocLazyLoadProvider.config({
        debug: true,
        events: true
    });
});

PIVF.directive('replace', function () {
    //  
    return {
        require: 'ngModel',
        scope: {
            regex: '@replace',
            with: '@with'
        },
        link: function (scope, element, attrs, model) {
            model.$parsers.push(function (val) {
                if (!val) { return; }
                var regex = new RegExp(scope.regex);
                var replaced = val.replace(regex, scope.with);
                if (replaced !== val) {
                    model.$setViewValue(replaced);
                    model.$render();
                }
                return replaced;
            });
        }
    };
})

PIVF.directive('multiValidation', function () {
    return {
        restrict: 'A',
        require: "ngModel",
        replace: true,
        link: function (scope, elm, attrs, ngModel, ctrl) {

            elm.on('keydown', function (event) {
                //  
                var key = event.which || event.keyCode;
                var model = ngModel.$viewValue;
                if (attrs.multiValidation == 'AlphaNumericArrowBkSpDelSpDCFSlash') {
                    if (event.shiftKey || event.ctrlKey) {
                        event.preventDefault();
                        return false;
                    }
                    else if (key >= 65 && key <= 90) {
                        return true;
                    } else if (key >= 48 && key <= 57) {
                        return true;
                    } else if (key >= 97 && key <= 122) {
                        return true;
                    } else if ([8, 9, 13, 32, 46, 37, 38, 39, 40, 188, 189, 190, 191].indexOf(key) > -1) {
                        //   190-.,188-,,191-/
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                } else if (attrs.multiValidation == 'MRNoValidate') {
                    if (event.shiftKey || event.ctrlKey) {
                        event.preventDefault();
                        return false;
                    }
                    else if (key >= 65 && key <= 90) {
                        return true;
                    } else if (key >= 48 && key <= 57) {
                        return true;
                    } else if (key >= 97 && key <= 122) {
                        return true;
                    } else if ([8, 9, 13, 32, 46, 37, 38, 39, 40, 96, 173, 189].indexOf(key) > -1) {
                        //   189-/
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
                else if (attrs.multiValidation == 'NumericArrowBkSpDelSpDCFSlash') {
                    if (event.shiftKey || event.ctrlKey)//Deny Shift/Ctrl Keys
                    {
                        event.preventDefault();
                        return false;
                    }
                    else if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                        return true;
                    } else if ([8, 9, 13, 32, 46, 37, 38, 39, 40].indexOf(key) > -1) {

                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
                else if (attrs.multiValidation == 'NotZero') {
                    if (event.shiftKey || event.ctrlKey)//Deny Shift/Ctrl Keys
                    {
                        event.preventDefault();
                        return false;
                    }
                    else if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                        if (this.value.length == 0 && (key == 48 || key == 96))
                            event.preventDefault();
                        else return true;
                    } else if ([8, 9, 13, 32, 46, 37, 38, 39, 40].indexOf(key) > -1) {
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
                else if (attrs.multiValidation == 'AlphaArrowBkSpDelSpDCFSlash') {
                    if (event.shiftKey || event.ctrlKey)//Deny Shift/Ctrl Keys
                    {
                        event.preventDefault();
                        return false;
                    }
                    else if (key >= 65 && key <= 90) {
                        return true;
                    }
                        //else if (key >= 97 && key <= 122) {
                        //    return true;
                        //}
                    else if ([8, 9, 13, 32, 46, 37, 38, 39, 40].indexOf(key) > -1) {

                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
                else if (attrs.multiValidation == 'AlphabeticalWithLimitedSymbols') {
                    if (event.shiftKey || event.ctrlKey || key == 109)//Deny Shift/Ctrl Keys
                    {
                        event.preventDefault();
                        return false;
                    }
                    else if (key >= 65 && key <= 90) {
                        return true;
                    } else if (key >= 97 && key <= 122) {
                        return true;
                    } else if ([8, 9, 13, 32, 46, 37, 38, 39, 40, 188, 189, 190, 191].indexOf(key) > -1) {

                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }
                else if (attrs.multiValidation == 'MobNoStartWith') {
                    if (event.shiftKey || event.ctrlKey)//Deny Shift/Ctrl Keys
                    {
                        event.preventDefault();
                        return false;
                    }
                    else if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                        if (model == undefined || model == '') {
                            if ((key >= 55 && key <= 57) || (key >= 103 && key <= 105)) {
                                return true;
                            }


                            else {
                                event.preventDefault();
                            }
                        }
                        else { return true; }
                    } else if ([8, 9, 13, 32, 46, 37, 38, 39, 40].indexOf(key) > -1) {

                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                }

            });
        }
    }
});

PIVF.constant('ngAuthSettings', {
    apiServiceBaseUri: Baseurl,
    clientId: 'ngAuthApp'
});

PIVF.constant('resource', {
    data: {}
});

PIVF.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

PIVF.run(['$rootScope', 'authService', function ($rootScope, authService) {
    authService.fillAuthData();
    $rootScope.Breadcrum = [];
    $rootScope.Breadcrum.length = 0;
}]);

PIVF.run(['srvCommon', function (srvCommon) {
    srvCommon.getResources();
}]);

PIVF.config(['toastyConfigProvider', function (toastyConfigProvider) {
    toastyConfigProvider.setConfig({
        timeout: 5000,
        limit: 1,
        sound: false,
    });
}]);

PIVF.factory('AlertMessage', function (toasty) {
    return {
        success: function (Title, Text) {
            toasty.success({
                title: Title,
                msg: Text
                //sound: true,
                //shake: true,
            });
        },

        error: function (Title, Text) {
            toasty.error({
                title: Title,
                msg: Text
            });
        },

        warning: function (Title, Text) {
            toasty.warning({
                title: Title,
                msg: Text
            });
        },

        wait: function (Title, Text) {
            toasty.wait({
                title: Title,
                msg: Text
            });
        },

        info: function (Title, Text) {
            toasty.info({
                title: Title,
                msg: Text
            });
        },

        Default: function (Title, Text) {
            toasty({
                title: Title,
                msg: Text
            });
        },
    }
})

PIVF.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

PIVF.factory('swalMessages', function () {
    return {
        MessageBox: function (Title, Text, Type, callback) {
            swal({
                html: true,
                title: Title,
                text: "<b>" + Text + "</b>",
                type: Type,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: true,
                closeOnCancel: true,
                animation: false
            },
 function (isConfirm) {
     if (isConfirm) {
         callback(isConfirm);
     }
     else {
         callback(isConfirm);
     }
 }
            );
        }
    };
});


//this are For BreadCum Functionality
//PIVF.run(function ($rootScope, $location, breadcrumbs) {
//    $rootScope.$on('$routeChangeSuccess', function (event, current) {
//        var pathElements = $location.path().split('/'), result = [], i;
//        var breadcrumbPath = function (index) {
//            return '/' + (pathElements.slice(0, index + 1)).join('/');
//        };
//        pathElements.shift();
//        for (i = 0; i < pathElements.length; i++) {
//            result.push({ name: pathElements[i], path: breadcrumbPath(i) });
//        }
//        breadcrumbs.setBreadcrumbs(result);
//    });
//});

PIVF.run(['$rootScope', '$location', '$route', function ($rootScope, $location, $route) {
debugger
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
debugger

        //if ($rootScope.Breadcrum == undefined)
        //    $rootScope.Breadcrum = [];
        if (angular.isDefined($route.current.$$route))
            var Breadcrum = $route.current.$$route.Breadcrum;
        if (angular.isDefined(Breadcrum))
            ;
        if (['Donor', 'Design EMR', 'Queue', 'Users', 'User Role', 'Consent', 'EMR Dashboard', 'Clinic', 'Billing','Advance Lists','Lab'].indexOf(Breadcrum) > -1) {
            //    $rootScope.IsFemaleActive = false; $rootScope.IsCycleActive = false; $rootScope.IsMaleActive = false;
            $rootScope.Breadcrum.length = 0;
        }
        else if (['Outcome', 'Semen Details', 'Overview', 'IUI', 'Embryo Transfer', 'Stimulation Chart', 'Embryology', 'Ovum Pick Up', 'Bill List','LabTestList', 'Prescribed Services'].indexOf(Breadcrum) > -1) {
            $rootScope.Breadcrum.splice(1);
        }
        else if (['Oocyte Thaw', 'Embryo Thaw', 'Embryo Vitrification', 'Oocyte Vitrification'].indexOf(Breadcrum) > -1) {
            $rootScope.Breadcrum.splice(1);
            $rootScope.Breadcrum.push({ Title: 'Cryo Preservation', Path: $location.path() });
        }
        else if (['Embryo Bank', 'Oocyte Bank', 'Sperm Bank'].indexOf(Breadcrum) > -1 && !$rootScope.IsSinglePatient) {
            $rootScope.Breadcrum.length = 0;
            $rootScope.Breadcrum.push({ Title: 'Cryo Bank', Path: $location.path() });
        }
        else if (['KPI'].indexOf(Breadcrum) > -1) {
            $rootScope.Breadcrum.length = 0;
            $rootScope.Breadcrum.push({ Title: 'KPI', Path: $location.path() });
        }
        else if (['Management Report'].indexOf(Breadcrum) > -1) {
            $rootScope.Breadcrum.length = 0;
            $rootScope.Breadcrum.push({ Title: 'Management Report', Path: $location.path() });
        }
        var idx = -1; //$rootScope.Breadcrum.findIndex(z=>z.Title == Breadcrum);
        for (var i = 0; i < $rootScope.Breadcrum.length; ++i) {
            if ($rootScope.Breadcrum[i].Title == Breadcrum) {
                idx = i;
                break;
            }
        }
        if (idx > -1) {
            $rootScope.Breadcrum.splice(idx);
        }
        var count = ($rootScope.Breadcrum.join(',').match('/' + Breadcrum + '/g') || []).length;
        if (count == 0 && angular.isDefined(Breadcrum)) {
            if (angular.isDefined(current) && angular.isDefined(pre)) {
                if (current.Breadcrum != pre.Breadcrum)
                    $rootScope.Breadcrum.push({ Title: Breadcrum, Path: $location.path() });
            }
            else
                $rootScope.Breadcrum.push({ Title: Breadcrum, Path: $location.path() });
        }
    });
}]);
//========================================Only positive number without deciml by vikrant 28/7/2016==================================================================================================================================================
PIVF.directive('validNumberwithoutdeciml', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace(/[^0-9]+/g, '');
                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});
//========================================Only Number with two deciml and accept negative value by vikrant 28/7/2016================================================================================================================================
PIVF.directive('validNumberwithdecimal', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace(/[^0-9 . -]/g, '');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

//Fix Header
PIVF.directive('stRatio', function () {
    return {
        link: function (scope, element, attr) {
            var ratio = +(attr.stRatio);

            element.css('width', ratio + '%');

        }
    };
});







