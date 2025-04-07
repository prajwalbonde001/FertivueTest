PIVF.service('LinkPartnerSrv', function ($http, API) {

  

    this.linkPartner = function (UnitId, patientcategroy, maleid, femaleid, isfemale, visitid, visitstatus) {
        var Response = $http.get(API.APIurl + 'LinkPartner/linkPartner').error(function () {
        });
        return Response;
    }
    this.linkPartner = function (linkPartnerObj) {
        var Response = $http({
            url: API.APIurl + 'LinkPartner/linkPartner',
            data: linkPartnerObj,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    }
});