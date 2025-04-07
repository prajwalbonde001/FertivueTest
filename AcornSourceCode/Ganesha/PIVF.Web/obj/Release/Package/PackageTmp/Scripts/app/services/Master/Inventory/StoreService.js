PIVF.service('StoreService', function ($http,API) {

    this.GetStoreList = function (searchPara) {  //searchPara
        debugger;
        var Response = $http({
            url: API.APIurl + 'StoreAPI/GetStoreList',
            params: { searchPara: angular.toJson(searchPara) },   //
            method: 'GET'
        }).error(function () {
            //  window.location = '/Error/CustomError';
        });

        //var Response = $http.get(API.APIurl + 'StoreAPI/GetStoreList', { params: { searchPara: searchPara } }//,{ params: { searchPara: searchPara } }
        //    ).error(function () {
        //    });

        return Response;

       
    };

});