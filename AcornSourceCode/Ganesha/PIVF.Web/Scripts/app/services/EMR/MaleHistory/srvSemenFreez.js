PIVF.service('srvSemenFreez', function ($http, API) {
    //this.GetUnitList = function () {
    //    // 
    //    var Response = $http.get(API.APIurl + 'UserAPI/GetUnitList').error(function () {
    //        //  window.location = '/Error/CustomError';
    //    });
    //    return Response;
    //};

    this.SaveUpdate = function (SemenFreez) {
        
        var Response = $http({
            url: API.APIurl + 'SemenFreez/SaveUpdate',
            data: SemenFreez,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.GetMaxID = function () {
        // 
        var Response = $http.get(API.APIurl + 'SemenFreez/GetMaxID').error(function () {
        });
        return Response;
    };    //Get Semen freez detail max id

    this.GetSemenFreezList = function (DonorID, DonorUnitID) {
        // 
        var Response = $http.get(API.APIurl + 'SemenFreez/GetSemenFreezList', { params: { DonorID: DonorID, DonorUnitID: DonorUnitID } }).error(function () {
        });
        return Response;
    };

    this.GetSemenFreezListByFormNo = function (FormNo, Action, ID, UnitID) {
        
        var Response = $http.get(API.APIurl + 'SemenFreez/GetSemenFreezListByFormNo', { params: { FormNo: FormNo, Action: Action, ID: ID, UnitID: UnitID } }).error(function () {
        });
        return Response;
    };

    this.GetSpermBankList = function (PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, CanID, StrawId, NameCodeMRNo, IsShowDiscard, StatusOption) {
        
        var Response = $http.get(API.APIurl + 'SemenFreez/GetSpermBankList', { params: { PageIndex: PageIndex, IsSinglePatient: IsSinglePatient, UnitID: UnitID, TankID: TankID, CanisterID: CanisterID, CanID: CanID, StrawId: StrawId, NameCodeMRNo: NameCodeMRNo, IsShowDiscard: IsShowDiscard, StatusOption: StatusOption } }).error(function () {
        });
        return Response;
    };


    this.UpdateSemenFreezExpiryDates = function (SemenFreez) {
        
        var Response = $http({
            url: API.APIurl + 'SemenFreez/UpdateSemenFreezExpiryDates',
            data: SemenFreez,
            method: 'put'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        return Response;
    };

    this.CheckDuplicateCryoNo = function (Item) {
        // 
        var Response = $http.get(API.APIurl + 'SemenFreez/CheckDuplicateCryoNo', { params: { Item: Item } }).error(function () {
        });
        return Response;
    };
});