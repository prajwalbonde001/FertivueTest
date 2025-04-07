angular.module('services.breadcrumbs', []);
angular.module('services.breadcrumbs').
factory('breadcrumbs', ['$rootScope', '$location', function ($rootScope, $location) {
    var breadcrumbs = [];
    var breadcrumbsService = {};
    breadcrumbsService.getAll = function () {
        return breadcrumbs;
    };
    breadcrumbsService.getFirst = function () {
        return breadcrumbs[0] || {};
    };
    breadcrumbsService.setBreadcrumbs = function (breadcrumb) {
        breadcrumbs = breadcrumb;
    };
    return breadcrumbsService;
}]);