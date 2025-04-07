PIVF.service('SemenDetailsService', function ($http, API) {

    this.LoadPartnerSpermiogramData = function (PatientID, PatientUnitID) {
        
        var Response = $http.get(API.APIurl + 'SemenDetails/LoadPartnerSpermiogramData', { params: { PatientID: PatientID, PatientUnitID: PatientUnitID } }).error(function () {
        });
        return Response;
    }

    this.LoadPartnerMaleSpermiogramData = function (PatientID, PatientUnitID) {
        
        var Response = $http.get(API.APIurl + 'SemenDetails/LoadPartnerMaleSpermiogramData', { params: { PatientID: PatientID, PatientUnitID: PatientUnitID } }).error(function () {
        });
        return Response;
    }



    this.LoadDonorData = function (SourceOfSpermID) {
        
        var Response = $http.get(API.APIurl + 'SemenDetails/LoadDonorData', { params: { SourceOfSpermID: SourceOfSpermID } }).error(function () {
        });
        return Response;
    }

    this.LoadDonorSpermiogram = function (DonorCode) {
        
        var Response = $http.get(API.APIurl + 'SemenDetails/LoadDonorSpermiogram', { params: { DonorCode: DonorCode } }).error(function () {
        });
        return Response;
    }

    this.FetchPartnerPreparationAssesment = function (SelectedSNo) {
        
        var Response = $http.get(API.APIurl + 'SemenDetails/FetchPartnerPreparationAssesment', { params: { SelectedSNo: SelectedSNo } }).error(function () {
        });
        return Response;
    }

    this.GetPartnerSpermiogramDataByMRNo = function (MRNo) {
        
        var Response = $http.get(API.APIurl + 'SemenDetails/GetPartnerSpermiogramDataByMRNo', { params: { MRNo: MRNo } }).error(function () {
        });
        return Response;
    }

    this.LoadAllSemenDetailsData = function (TherapyID, TherapyUnitID, SelectedTherapyCycleCode) {
        
        var Response = $http.get(API.APIurl + 'SemenDetails/LoadAllSemenDetailsData', { params: { TherapyID: TherapyID, TherapyUnitID: TherapyUnitID, SelectedTherapyCycleCode: SelectedTherapyCycleCode } }).error(function () {
        });
        return Response;
    }

    this.SaveORUpdateSemenDetails = function (SemenDetails) {


        var Response = $http({
            url: API.APIurl + 'SemenDetails/SaveORUpdateSemenDetails',
            data: SemenDetails,
            method: 'post'
        }).error(function () {
            //window.location = '/Error/CustomError';
        });
        
        //debugger;
        //if (SemenDetails.ListFreezThawSamples.length > 0 && SemenDetails.IsFinalize == true) {
        //    this.SaveThowingDetails(SemenDetails.ListFreezThawSamples);
        //}
        return Response;
    }
   
    this.SaveThowingDetails = function SaveThowingDetails(ListThowingDetails) {
        debugger;
        var Response = $http({
            url: API.APIurl + 'SemenThawing/SaveUpdate',
            data: ListThowingDetails,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };
});