PIVF.service('DonarOocyteSrv', function ($http, API) {
    //==================================================================================================================================================
    this.GetDonorList = function () {
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/GetDonorList').error(function () {
        });
        return Response;
    }
    //==================================================================================================================================================
    //ocyte 
    this.GetVitrificationDetails = function (VitriFicationID, VitriFicationUnitID) {
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/GetVitrificationDetails',
            {
                params: { VitriFicationID: VitriFicationID, VitriFicationUnitID: VitriFicationUnitID}
            }).error(function () {
        });
        return Response;
    }
    //embriyo
    this.GetEmbriyoVitrificationDetails = function (VitriFicationID, VitriFicationUnitID) {
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/GetEmbriyoVitrificationDetails',
            {
                params: { VitriFicationID: VitriFicationID, VitriFicationUnitID: VitriFicationUnitID }
            }).error(function () {
            });
        return Response;
    }
    //==================================================================================================================================================
    //TransferDonorOocytestoCouple
    this.TransferDonorOocytestoCouple = function (DonorOocytes) {
        var Response = $http({
            url: API.APIurl + 'CryoPreservationAPI/TransferDonorOocytestoCouple',
            data: DonorOocytes,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };
    //TransferDonorEmbriyostoCouple
    this.TransferDonorEmbriyostoCouple = function (DonorEmbriyos) {
        var Response = $http({
            url: API.APIurl + 'CryoPreservationAPI/TransferDonorEmbriyostoCouple',
            data: DonorEmbriyos,
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