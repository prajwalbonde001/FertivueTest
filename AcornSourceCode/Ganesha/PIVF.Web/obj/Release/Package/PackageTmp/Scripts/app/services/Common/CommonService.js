PIVF.service('Common', function ($http, $rootScope, API, ObjectDiff) {
    var ID = 0;
    var TempID=0;
    var Str = '';
    var obj = {};
    var objSelectedPatient = {};
    var objSelectedCouple = {};
    var lstUserRights = [];
    var changedObjects = [];
    var Self = this;
    this.SetPatientContext = function (selectedPatient) {
        //debugger;
        if (selectedPatient.PatientCategoryID == 7) {
            $rootScope.IsFemale = 1;
            $rootScope.IsMale = 1;
            if (selectedPatient.GenderID == 2) {
                $rootScope.IsFemaleActive = true;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
            }
            else {
                $rootScope.IsMaleActive = true;
                $rootScope.IsFemaleActive = false;
            }
            var response = this.GetCoupleDetails(selectedPatient);
            response.then(function (resp) {

                if (resp.data != null) {
                    resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies
                    if (resp.data.FemalePatient.AllergiesFood != '')
                        resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies + ',' + resp.data.FemalePatient.AllergiesFood;
                    if (resp.data.FemalePatient.AllergiesOthers != '')
                        resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies + ',' + resp.data.FemalePatient.AllergiesOthers;
                    if (resp.data.FemalePatient.IsAlcohol)
                        resp.data.FemalePatient.Addictions = 'Alcohol, ';
                    if (resp.data.FemalePatient.IsTobacco)
                        resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Tobacco, ';
                    if (resp.data.FemalePatient.IsSmoking)
                        resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Smoking, ';
                    if (resp.data.FemalePatient.IsAddictionsOther)
                        resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions + 'Other';
                    if (resp.data.FemalePatient.Addictions == null) resp.data.FemalePatient.Addictions = '';
                    if (resp.data.FemalePatient.Addictions.slice(-2) == ', ')
                        resp.data.FemalePatient.Addictions = resp.data.FemalePatient.Addictions.slice(0, -2);
                    if (resp.data.FemalePatient.Allergies == null) resp.data.FemalePatient.Allergies = '';
                    if (resp.data.FemalePatient.Allergies.slice(1) == ',')
                        resp.data.FemalePatient.Allergies = resp.data.FemalePatient.Allergies.slice(1);
                    // for Male
                    if (resp.data.MalePatient.AllergiesFood != '')
                        resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies + ',' + resp.data.MalePatient.AllergiesFood;
                    if (resp.data.MalePatient.AllergiesOthers != '')
                        resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies + ',' + resp.data.MalePatient.AllergiesOthers;
                    if (resp.data.MalePatient.IsAlcohol)
                        resp.data.MalePatient.Addictions = 'Alcohol, ';
                    if (resp.data.MalePatient.IsTobacco)
                        resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Tobacco, ';
                    if (resp.data.MalePatient.IsSmoking)
                        resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Smoking, ';
                    if (resp.data.MalePatient.IsAddictionsOther)
                        resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions + 'Other';
                    if (resp.data.MalePatient.Addictions == null) resp.data.MalePatient.Addictions = '';
                    if (resp.data.MalePatient.Addictions.slice(-2) == ', ')
                        resp.data.MalePatient.Addictions = resp.data.MalePatient.Addictions.slice(0, -2);
                    if (resp.data.MalePatient.Allergies == null) resp.data.MalePatient.Allergies = '';
                    if (resp.data.MalePatient.Allergies.slice(1) == ',')
                        resp.data.MalePatient.Allergies = resp.data.MalePatient.Allergies.slice(1);

                    $rootScope.CoupleDetails = resp.data;

                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                    $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};
                    Self.clearSelectedPatient();
                    Self.clearSelectedCouple();
                    Self.setSelectedPatient(selectedPatient);
                    Self.setSelectedCouple($rootScope.CoupleDetails);
                }
            });

        }
        else {
            if (selectedPatient.GenderID == 2) {
                $rootScope.IsFemale = 1;
                $rootScope.IsFemaleActive = true;
                $rootScope.IsMaleActive = false;
            }
            else {
                $rootScope.IsMale = 1;
                $rootScope.IsMaleActive = true;
                $rootScope.IsFemaleActive = false;
            }
            var response = this.GetDonorDetails(selectedPatient);
            response.then(function (resp) {
                if (resp.data != null) {
                    Self.clearSelectedPatient();
                    Self.clearSelectedCouple();

                    Self.SetSelectedPatientInAPI(selectedPatient);
                    if (resp.data.GenderID == 1) {

                        $rootScope.CoupleDetails.MalePatient.MalePhotoStr = resp.data.PhotoString;
                        $rootScope.CoupleDetails.MalePatient.MalePatientName = resp.data.PatientName;
                        $rootScope.CoupleDetails.MalePatient.MaleDOB = resp.data.DOB;
                        $rootScope.CoupleDetails.MalePatient.MaleMRNO = resp.data.MRNo;
                        $rootScope.CoupleDetails.MalePatient.MaleAgeInYr = resp.data.Age;
                        $rootScope.CoupleDetails.MalePatient.MaleHeight = resp.data.MaleHeight;
                        $rootScope.CoupleDetails.MalePatient.MaleWeight = resp.data.MaleWeight;
                        $rootScope.CoupleDetails.MalePatient.MaleBMI = resp.data.MaleBMI;
                        $rootScope.CoupleDetails.MalePatient.MaleId = resp.data.ID;
                        $rootScope.CoupleDetails.MalePatient.MAleUnitID = resp.data.UnitID;
                        $rootScope.CoupleDetails.MalePatient.MaleMRNO = resp.data.MRNo;
                        $rootScope.CoupleDetails.MalePatient.GenderID = resp.data.GenderID;
                        $rootScope.CoupleDetails.MalePatient.PatientCategoryID = resp.data.PatientCategoryID;
                        $rootScope.CoupleDetails.MalePatient.IsDonor = true;
                        $rootScope.CoupleDetails.MalePatient.IsDonorUsed = resp.data.IsDonorUsed;
                        $rootScope.IsFemale = 0;
                        $rootScope.IsMale = 1;
                        $rootScope.CoupleDetails.FemalePatient = {};
                    }
                    else if (resp.data.GenderID == 2) {

                        $rootScope.CoupleDetails.FemalePatient.FemalePhotoStr = resp.data.PhotoString;
                        $rootScope.CoupleDetails.FemalePatient.FemalePatientName = resp.data.PatientName;
                        $rootScope.CoupleDetails.FemalePatient.FemaleDOB = resp.data.DOB;
                        $rootScope.CoupleDetails.FemalePatient.FemaleMRNO = resp.data.MRNo;
                        $rootScope.CoupleDetails.FemalePatient.FemaleAgeInYr = resp.data.Age;
                        $rootScope.CoupleDetails.FemalePatient.FemaleHeight = resp.data.MaleHeight;
                        $rootScope.CoupleDetails.FemalePatient.FemaleWeight = resp.data.MaleWeight;
                        $rootScope.CoupleDetails.FemalePatient.FemaleBMI = resp.data.MaleBMI;
                        $rootScope.CoupleDetails.FemalePatient.FemalePatientID = resp.data.ID;
                        $rootScope.CoupleDetails.FemalePatient.FemalePatientUnitID = resp.data.UnitID;
                        $rootScope.CoupleDetails.FemalePatient.FemalePatientMRNO = resp.data.MRNo;
                        $rootScope.CoupleDetails.FemalePatient.PatientCategoryID = resp.data.PatientCategoryID;
                        $rootScope.CoupleDetails.FemalePatient.GenderID = resp.data.GenderID;
                        $rootScope.CoupleDetails.FemalePatient.CoupleCode = resp.data.CoupleCode;
                        $rootScope.CoupleDetails.FemalePatient.CoupleFemailID = resp.data.CoupleFemailID;
                        $rootScope.CoupleDetails.FemalePatient.CoupleFemailUnitID = resp.data.CoupleFemailUnitID;
                        $rootScope.CoupleDetails.FemalePatient.IsDonor = true;
                        $rootScope.CoupleDetails.FemalePatient.IsDonorUsed = resp.data.IsDonorUsed;
                        $rootScope.IsMale = 0;
                        $rootScope.IsFemale = 1;
                        $rootScope.CoupleDetails.MalePatient = {};

                    }

                    $rootScope.CoupleDetails.FemalePatient.Selectedvisit = {};
                    $rootScope.CoupleDetails.MalePatient.Selectedvisit = {};

                    Self.setSelectedPatient(selectedPatient);
                    Self.setSelectedCouple($rootScope.CoupleDetails);

                }
            });
        }
    };
    
    this.setchangedObjects = function (oldobj, newobj) {
        var diff = ObjectDiff.diffOwnProperties(oldobj, newobj);
        Object.keys(diff.value).forEach(function (key) {
            if (diff.value[key].changed.indexOf("change") > -1) {
                if (diff.value[key].changed === "object change") {
                    Object.keys(diff.value[key].value).forEach(function (key1) {
                        if (diff.value[key].value[key1].changed.indexOf("change") > -1) {
                            if (diff.value[key].value[key1].changed === "object change") {
                                Object.keys(diff.value[key].value[key1].value).forEach(function (key2) {
                                    if (diff.value[key].value[key1].value[key2].changed.indexOf("change") > -1) {
                                        var dobj = { field: key2, oldvalue: diff.value[key].value[key1].value[key2].removed, newvalue: diff.value[key].value[key1].value[key2].added }
                                        changedObjects.push(dobj);
                                    }
                                });
                            } else {
                                var dobj = { field: key1, oldvalue: diff.value[key].value[key1].removed, newvalue: diff.value[key].value[key1].added }
                                changedObjects.push(dobj);
                            }
                        }
                    });
                }
                else {
                    var dobj = { field: key, oldvalue: diff.value[key].removed, newvalue: diff.value[key].added }
                    changedObjects.push(dobj);
                }
            }
        });
    };

    this.getchangedObjects = function () {
        return changedObjects;
    };

    this.clearchangedObjects = function () {
        changedObjects = [];
    };

    this.setID = function (id) {
        ID = id;
    };

    this.getID = function () {
        return ID;
    };

    this.clearID = function () {
        ID = 0;
    };
    
    this.setTempID = function (id) {
        ID = id;
    };



    this.getTempID = function () {
        return ID;
    };

    this.clearTempID = function () {
        ID = 0;
    };

     this.setUltraTempID = function (id) {
        TempID = id;
    };



    this.getUltraTempID = function () {
        return TempID;
    };

    this.clearUltraTempID = function () {
        TempID = 0;
    };

    this.setString = function (Str1) {
        Str = Str1;
    };

    this.getString = function () {
        return Str;
    };

    this.clearString = function () {
        Str = '';
    };

    this.setObj = function (tmpobj) {
        obj = tmpobj;
    };

    this.getObj = function () {
        return obj;
    };
    this.clearObj = function () {
        obj = {};
    };
    this.setUserRights = function (tmpobj) {
        lstUserRights = tmpobj;
    };

    this.getUserRights = function () {
        return lstUserRights;
    };
    this.clearUserRights = function () {
        lstUserRights = [];
    };
    Self.setSelectedPatient = function (tmpobj) {
        objSelectedPatient = tmpobj;
    };

    Self.getSelectedPatient = function () {
        if (objSelectedPatient === undefined) {
            objSelectedPatient = JSON.parse(sessionStorage.getItem('selectedPatient'));
            return objSelectedPatient;
        }
        else
            return objSelectedPatient;
    };
  
    Self.clearSelectedPatient = function () {
        objSelectedPatient = {};
    };
    Self.setSelectedCouple = function (tmpobj) {
        objSelectedCouple = tmpobj;
    };
    this.getSelectedCouple = function () {
        return objSelectedCouple;
    };
    this.clearSelectedCouple = function () {
        objSelectedCouple = {};
    };
    this.getMasterList = function (tblNm, id, desc) {
        //
        var Response = $http.get(API.APIurl + 'Common/GetMasterList', { params: { tblNm: tblNm, id: id, desc: desc } }).error(function () {
            //  window.location = '/Error/CustomError';
        });
        return Response;
    };
    //By Rohini For Ivf Dashboard Patient List   
    this.getpatientlist = function (UnitID, PatientCategory) {
        var Response = $http.get(API.APIurl + 'Common/GetPatientList', {
            params: { UnitID: angular.toJson(UnitID), PatientCategory: angular.toJson(PatientCategory) }
        }).error(function () {
        });
        return Response;
    }

    //added sujata
    this.GetPatientListforLab = function () {
        var Response = $http.get(API.APIurl + 'Common/GetPatientListforLab', {
            //params: { UnitID: angular.toJson(UnitID), PatientCategory: angular.toJson(PatientCategory) }
        }).error(function () {
        });
        return Response;
    }

    this.getPartnerlist = function (UnitID, PatientCategory, GenderId) {
        var Response = $http.get(API.APIurl + 'Common/GetPartnerList', {
            params: { UnitID: angular.toJson(UnitID), PatientCategory: angular.toJson(PatientCategory),GenderId:angular.toJson(GenderId) }
        }).error(function () {
        });
        return Response;
    }
    //End

    //By Rohini For Ivf Dashboard Patient List   
    this.GetCoupleDetails = function (SelectedPatient) {
        var Response = $http.get(API.APIurl + 'Common/GetCoupleDetails', {
            params: { SelectedPatient: angular.toJson(SelectedPatient) }
        }).error(function () {
        });
        return Response;
    }
    //by rohini to bind latest data
    this.BindMaleFemaleCoupleDetails = function (UnitID, ID, GenderID) {
        var Response = $http.get(API.APIurl + 'Common/BindMaleFemaleCoupleDetails', {
            params: { UnitID: UnitID, ID: ID, GenderID: GenderID }
        }).error(function () {
        });
        return Response;
    }
   //
    //By Rohini For Ivf Dashboard Patient List   
    this.GetDonorDetails = function (SelectedPatient) {
        var Response = $http.get(API.APIurl + 'Common/GetDonorDetails', {
            params: { SelectedPatient: angular.toJson(SelectedPatient) }
        }).error(function () {
        });
        return Response;
    }
    //By Rohini For Ivf Dashboard Patient List   
    this.SetSelectedMalePatient = function (SelectedPatient) {
        var Response = $http({
            url: API.APIurl + 'Common/SetSelectedMalePatient',
            data: SelectedPatient,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.SetSelectedFemalePatient = function (SelectedPatient) {
        //debugger;
        var Response = $http({
            url: API.APIurl + 'Common/SetSelectedFemalePatient',
            data: SelectedPatient,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.GetPatientInfo = function (CurrentUser, SelectedPatient, SelectedCouple) {
        //debugger;
        var Response = $http({
            url: API.APIurl + 'Common/GetPatientInfo',
            data: {
                CurrentUser: CurrentUser
                , SelectedPatient: SelectedPatient
                , SelectedCouple: SelectedCouple
            },
            method: 'post'
        }).error(function () {           
        });
        return Response;
    }

    this.GetEmbryologyDoctorsList = function (UnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetEmbryologyDoctorsList').error(function () {
        });
        return Response;
    }

    this.GetSampleCollectionLocList = function (UnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetSampleCollectionLocList').error(function () {
        });
        return Response;
    }

    this.GetServiceList = function (UnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetServiceList').error(function () {
        });
        return Response;
    }

    /*Added by AniketK on 10Oct2020*/
    this.GetServiceTestList = function (UnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetServiceTestList').error(function () {
        });
        return Response;
    }
    /*Added by AniketK on 10Oct2020*/

    //this.GetDoctorList = function () {
    //    var Response = $http.get(API.APIurl + 'Common/GetDoctorsList').error(function () {
    //    });
    //    return Response;
    //}

    this.GetDoctorList = function (id) {
        var Response = $http.get(API.APIurl + 'Common/GetDoctorsList').error(function () {
        });
        return Response;
    }

    this.getDoctorListForReg = function (id) {
        //debugger;
        var Response = $http.get(API.APIurl + 'Common/getDoctorListForReg',{ params: { id: id}}).error(function () {
            //params: { id: id}
        });
        return Response;
    }

    this.GetDepartmentList = function () {
        var Response = $http.get(API.APIurl + 'Common/GetDepartmentList').error(function () {
        });
        return Response;
    }

    this.GetSpeclRegTypeList = function () {
        var Response = $http.get(API.APIurl + 'Common/GetSpeclRegTypeList').error(function () {
        });
        return Response;
    }

    //check the today's Visit
    this.CheckTodayVisit = function (PatientID, PatientUnitID) {
        var Response = $http.get(API.APIurl + 'Common/CheckTodayVisit', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID }
        }).error(function () {
        });
        return Response;
    }

    this.GetUltrasonographyTemplateList = function ( ObjCurrentUser) {
        
        var Response = $http.get(API.APIurl + 'Common/GetUltrasonographyTemplateList', {
            params: {  ObjCurrentUser: ObjCurrentUser }

        }).error(function () {
        });
        return Response;
    }

    this.GetActiveVisitByPatient = function (PatientID, PatientUnitID) {
    debugger;
        var Response = $http.get(API.APIurl + 'Common/GetActiveVisitByPatient', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID }
        }).error(function () {
        });
        return Response;
    }
    //by rohini to get all visit for print 
    this.GetAllVisitByPatient = function (PatientID, PatientUnitID, PageIndex) {
        var Response = $http.get(API.APIurl + 'Common/GetAllVisitByPatient', {
            params: { PatientID: PatientID, PatientUnitID: PatientUnitID, PageIndex: PageIndex }
        }).error(function () {
        });
        return Response;
    }
    ////
    this.PutSelectedvisitByPatient = function (CoupleDetails, VisitInfo, gender) {
        var Response = $http({
            url: API.APIurl + 'Common/PutSelectedvisitByPatient',
            data: JSON.stringify({ CoupleDetails: CoupleDetails, VisitInfo: VisitInfo, gender: gender }),
            method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.SetTherapyDetails = function (TID, UID, TypeID, SubID) {
        var IDs = [];
        IDs.push(TID);
        IDs.push(UID);
        IDs.push(TypeID);
        IDs.push(SubID);
        var Response = $http({
            url: API.APIurl + 'Common/SetTherapyDetails',
            data: IDs,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };

    this.SetSelectedPatientInAPI = function (SelectedPatient) {
        var Response = $http({
            url: API.APIurl + 'Common/SetSelectedPatient',
            data: SelectedPatient,
            method: 'post'
        }).error(function () {
        });
        return Response;
    };
    this.AddvisitDetailIncoupleAPI = function (Gender, VisitID,VisitUnitID) {
        var Response = $http.get(API.APIurl + 'Common/AddvisitDetailIncoupleAPI', { params: { Gender: Gender, VisitID: VisitID, VisitUnitID: VisitUnitID } }).error(function () {
        });
        return Response;
    }
    

    this.GetArtSubTypeList = function (id, CatID) {
        var Response = $http.get(API.APIurl + 'Common/GetArtSubTypeList', { params: { ArtTypeID: id, patientCatID: CatID } }).error(function () {
        });
        return Response;
    }

    this.GetPatientListByCatList = function (idx,CatID,param) {
        var Response = $http.get(API.APIurl + 'Common/GetPatientListByCatList', { params: { idx:idx,ID: CatID, param:param } }).error(function () {
        });
        return Response;
    }
    // Added DonorLinking
    this.GetActiveDonerList = function (idx, CatID, param) {
        var Response = $http.get(API.APIurl + 'Common/GetActiveDonerList', { params: { idx: idx, ID: CatID, param: param } }).error(function () {
        });
        return Response;
    }
    this.GetDashBoardData = function () {
        var Response = $http.get(API.APIurl + 'Common/GetDashBoardData').error(function () {
        });
        return Response;
    }

    this.clearSession = function () {
        var Response = $http.post(API.APIurl + 'UserAPI/clearSession').error(function () {
        });
        return Response;
    }

    this.GetUpdatedEMRData = function () {

    }

    this.GetGlobalData = function () {
        var Response = $http.get(API.APIurl + 'Common/GetGlobalData').error(function () {
        });
        return Response;
    }

    this.GetBDMList = function (stateID) {
        //debugger;
        var Response = $http.get(API.APIurl + 'Common/GetBDMList').error(function () {
        });
        return Response;
    }

    this.GetCountryList = function () {
        var Response = $http.get(API.APIurl + 'Common/GetCountryList').error(function () {
        });
        return Response;
    }
    //Begin:: Added by AniketK on 18OCT2019 for Registration
    this.GetStateList = function (countryID) {
        var Response = $http.get(API.APIurl + 'Common/GetStateList', { params: { countryID: countryID } }).error(function () {
        });
        return Response;
    }

    this.GetCityList = function (stateID) {
        var Response = $http.get(API.APIurl + 'Common/GetCityList', { params: { stateID: stateID } }).error(function () {
        });
        return Response;
    }
    //End:: Added by AniketK on 18OCT2019 for Registration
    
    //Added by Aniket on 10Sept2020 for Payment Mode validation
    this.GetPaymentModeValidation = function () {
debugger
            var Response = $http.get(API.APIurl + 'Common/GetPaymentModeValidation').error(function () {
            });
            return Response;
        }
    this.getLinkConfiguartions = function () {

        var Response = $http.get(API.APIurl + 'LinkConfiguration/GetLinkConfiguration')
        return Response;
    }

    this.clearUnitID = function () {
        UnitID = 0;
    };

    this.setUnitID = function (unitid) {
        UnitID = unitid;
    };

    this.getUnitID = function () {
        return UnitID;
    };
    //added sujata 
    this.GetUnitListDoctorIDForSchedule = function (DOCID) {
        var Response = $http.get(API.APIurl + 'Common/GetUnitListDoctorIDForSchedule', { params: { DOCID: DOCID } }).error(function () {
        });
        return Response;
    }


   

        this.GetDoctorList = function () {
        //debugger;
        var Response = $http.get(API.APIurl + 'Common/GetDoctorsList').error(function () {
        });
        return Response;
    }

    this.GetDeptIDListDoctorIDAndUnitID = function (DOCID, UnitID) {
        var Response = $http.get(API.APIurl + 'Common/GetDeptIDListDoctorIDAndUnitID', { params: { DOCID: DOCID, UnitID: UnitID } }).error(function () {
        });
        return Response;
    }

    this.GetDeptIDByUnitIDFOrAppointment = function (UnitID) {
        //debugger;
        var Response = $http.get(API.APIurl + 'Common/GetDeptIDByUnitIDFOrAppointment', { params: { UnitID: UnitID } }).error(function () {
        });
        return Response;
    }
});