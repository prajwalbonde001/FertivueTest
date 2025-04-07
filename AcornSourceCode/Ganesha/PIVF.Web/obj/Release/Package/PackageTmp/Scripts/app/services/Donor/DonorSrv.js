PIVF.service('DonorSrv', function ($http, API) {
    this.FillDonorList = function (PageIndex, SearchDonor,IsPageEnable) {
        
        if (angular.isUndefined(SearchDonor.AgencyID)) { SearchDonor.AgencyID = 0; }
        if (angular.isUndefined(SearchDonor.DonorCode)) { SearchDonor.DonorCode = ' '; }
        if (angular.isUndefined(SearchDonor.BloodGroupID)) { SearchDonor.BloodGroupID = 0; }
        if (angular.isUndefined(SearchDonor.EyeColorID)) { SearchDonor.EyeColorID = 0; }
        if (angular.isUndefined(SearchDonor.HairColorID)) { SearchDonor.HairColorID = 0; }
        if (angular.isUndefined(SearchDonor.SkinColorID)) { SearchDonor.SkinColorID = 0; }
        if (angular.isUndefined(SearchDonor.HeightID)) { SearchDonor.HeightID = 0; }
        if (angular.isUndefined(SearchDonor.BuiltID)) { SearchDonor.BuiltID = 0; }
        var Response = $http.get(API.APIurl + 'DonorAPI/FillDonorList',
            {
                params: {
                    PageIndex: PageIndex, DonorCode: SearchDonor.DonorCode, AgencyID: SearchDonor.AgencyID
                    ,BloodGroupID:SearchDonor.BloodGroupID,EyeColorID:SearchDonor.EyeColorID,HairColorID:SearchDonor.HairColorID
                    , SkinColorID: SearchDonor.SkinColorID, HeightID: SearchDonor.HeightID, BuiltID: SearchDonor.BuiltID, IsPageEnable: IsPageEnable
                }

            }).error(function () {
            });
        return Response;
    };
    this.SaveDonor = function (Donor) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'DonorAPI/SaveDonor',
            data: Donor,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };


    this.GetSemenFreezListByFormNo = function (FormNo, Action, ID, UnitID) {   //Added by Nayan Kamble
        debugger; 
        var Response = $http.get(API.APIurl + 'DonorAPI/GetSemenFreezListByFormNo', { params: { FormNo: FormNo, Action: Action, ID: ID, UnitID: UnitID } }).error(function () {
        });
        return Response;
    };



})