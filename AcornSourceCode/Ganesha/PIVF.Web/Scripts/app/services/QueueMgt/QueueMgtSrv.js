PIVF.service('QueueService', function ($http, API) {

    this.GetQueueList = function (Que) {
        var Response = $http.post(API.APIurl + 'QueueMgt/GetQueueList', Que).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetSpeclRegTypeList = function () {
        //   
        var Response = $http.get(API.APIurl + 'QueueMgt/GetSpeclRegTypeList').error(function () {
            // window.location = '/Error/CustomError';
        });
        return Response;
    }

    this.CloseVisit = function (vid, UnitId) {
        //   
        var Response = $http.get(API.APIurl + 'QueueMgt/CloseVisit', { params: { vid: vid, UnitId: UnitId } }).error(function () {
            // window.location = '/Error/CustomError';
        });
        return Response;
    };
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
    this.linkDonor = function (patientId, UnitId, g, Action)
    {
        debugger;
        var Response = $http({
            url: API.APIurl + 'LinkPartner/linkDonor',
            params: { patientId: patientId, UnitId: UnitId, GenderId: g, Action: Action },
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    }
    this.SaveVisitRemark = function (remark, VisitID, UnitID)
    {
        var Response = $http({
            url: API.APIurl + 'QueueMgt/SaveVisitRemark',
            params: { Remark: remark, VisitID: VisitID, UnitID: UnitID },
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    }

})