angular.module('PIVF.designemr', ['ngRoute', 'oc.lazyLoad', 'ui.tree', 'schemaForm', 'schemaForm-datepicker', 'schemaForm-datetimepicker', 'schemaForm-timepicker', 'mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'pascalprecht.translate', 'ui.select', 'mgcrea.ngStrap.select', 'angularSchemaFormBase64FileUpload', 'ngSchemaFormFile'])
.config(function ($routeProvider, $ocLazyLoadProvider, base64FileUploadConfigProvider, $translateProvider) {
    $translateProvider.translations('en', {
        'modules.upload.dndNotSupported': 'Drag n drop not surpported by your browser',
        'modules.attribute.fields.required.caption': 'Required',
        'modules.upload.descriptionSinglefile': 'Drop your file here',
        'modules.upload.descriptionMultifile': 'Drop your file(s) here',
        'buttons.add': 'Open file browser',
        'modules.upload.field.filename': 'Filename',
        'modules.upload.field.preview': 'Preview',
        'modules.upload.multiFileUpload': 'Multifile upload',
        'modules.upload.field.progress': 'Progress',
        'buttons.upload': 'Upload'
    });
    $translateProvider.preferredLanguage('en');
    base64FileUploadConfigProvider.setDropText('New');
    $routeProvider
         .when('/DesignEMR', {
             templateUrl: 'DesignEMR/Index',
             //controller: 'DesignEMRIndexCltr',
             //label: 'Design EMR',
             resolve: {
                 DesignEMRIndexCltr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'DesignEMRIndexCltr',
                         files: ['/Scripts/app/controllers/EMR/Design EMR/DesignEMRIndexCltr.js', '/Scripts/app/services/EMR/Design EMR/DesignEMRSrv.js']
                     });
                 }]

             },
         })
         .when('/ViewDesignEMR', {
             templateUrl: 'DesignEMR/ViewEMR',
             //controller: 'DesignEMRCltr',
             //label: 'Design EMR',
             resolve: {
                 DesignEMRCltr: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load({
                         name: 'DesignEMRCltr',
                         files: ['/Scripts/app/controllers/EMR/Design EMR/DesignEMRCltr.js', '/Scripts/app/services/EMR/Design EMR/DesignEMRSrv.js']
                     });
                 }]

             },
         })
});