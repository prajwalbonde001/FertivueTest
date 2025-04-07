PIVF.service('CryoPreservationSrv', function ($http, API) {
    this.GetVitriDetails = function (IsOnlyVitrification,IsForThawTab) {
        
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/GetVitriDetails',
            {
                params: { IsOnlyVitrification: IsOnlyVitrification, IsForThawTab: IsForThawTab}

            }).error(function () {
            });
        return Response;
    };
    //this.GetVitrificationDetailsOocyteBank = function (PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, IsExpired) { // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
    this.GetVitrificationDetailsOocyteBank = function (PageIndex, IsSinglePatient, UnitID, TankID, CanisterID, ColorCodeID, GobletSizeId, NameCodeMRNo, IsShowDiscard, StatusOption, Action, IsExpired, NearExpiryDays) { // Modified on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        debugger;
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/GetVitrificationDetailsOocyteBank',
            {
                //params: { PageIndex: PageIndex, IsSinglePatient: IsSinglePatient, UnitID: UnitID, TankID: TankID, CanisterID: CanisterID, ColorCodeID: ColorCodeID, GobletSizeId: GobletSizeId, NameCodeMRNo: NameCodeMRNo, IsShowDiscard: IsShowDiscard, StatusOption: StatusOption, Action: Action, IsExpired: IsExpired }  // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
                params: { PageIndex: PageIndex, IsSinglePatient: IsSinglePatient, UnitID: UnitID, TankID: TankID, CanisterID: CanisterID, ColorCodeID: ColorCodeID, GobletSizeId: GobletSizeId, NameCodeMRNo: NameCodeMRNo, IsShowDiscard: IsShowDiscard, StatusOption: StatusOption, Action: Action, IsExpired: IsExpired, NearExpiryDays: NearExpiryDays }    // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
            }).error(function () {
            });
        return Response;
    };
    this.GetVitrificationBankHistory = function (UnitID,VitrificationID,VitrificationUnitID,EmbNumber,EmbSerialNumber,Action) {
        
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/GetVitrificationBankHistory',
            {
                params: { UnitID: UnitID, VitrificationID: VitrificationID, VitrificationUnitID: VitrificationUnitID, EmbNumber: EmbNumber, EmbSerialNumber: EmbSerialNumber,Action:Action}

            }).error(function () {
            });
        return Response;
    };
    this.SaveOocyteVitrification = function (ListVitriDetails) {
        
        var Response = $http({
            url: API.APIurl + 'CryoPreservationAPI/SaveOocyteVitrification',
            data: ListVitriDetails,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };
    this.DonateOocytefromBank = function (VitrivicationID, VitrificationUnitID, VitrificationDetailID, VitrificationNo, TransferDonorID, TransferDonorUnitID) {
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/DonateOocytefromBank',
            {
                params: { VitrivicationID: VitrivicationID, VitrificationUnitID: VitrificationUnitID, VitrificationDetailID: VitrificationDetailID, VitrificationNo: VitrificationNo, TransferDonorID: TransferDonorID, TransferDonorUnitID: TransferDonorUnitID }
            }).error(function () {
            });
        return Response;
    };
    this.DonateEmbryofromBank = function (VitrivicationID, VitrificationUnitID, VitrificationDetailID, VitrificationNo, TransferDonorID, TransferDonorUnitID) {
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/DonateEmbryofromBank',
            {
                params: { VitrivicationID: VitrivicationID, VitrificationUnitID: VitrificationUnitID, VitrificationDetailID: VitrificationDetailID, VitrificationNo: VitrificationNo, TransferDonorID: TransferDonorID, TransferDonorUnitID: TransferDonorUnitID }
            }).error(function () {
            });
        return Response;
    };

    this.InsertUpdateOocytrEmbryoVitrification = function (ListVitriDetails) {

        var Response = $http({
            url: API.APIurl + 'CryoPreservationAPI/InsertUpdateOocytrEmbryoVitrification',
            data: ListVitriDetails,
            dataType: 'json',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        }).error(function () {
        });
        return Response;
    };

    this.CheckDuplicateFreezingNo = function (Item,Flag) {
        // 
        var Response = $http.get(API.APIurl + 'CryoPreservationAPI/CheckDuplicateFreezingNo', { params: { Item: Item, Flag:Flag } }).error(function () {
        });
        return Response;
    };

    
    
});