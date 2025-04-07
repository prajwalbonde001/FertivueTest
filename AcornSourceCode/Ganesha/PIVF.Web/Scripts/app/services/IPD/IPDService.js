PIVF.service('IPDService', function ($http, API) {

    // Fetch Service List
    this.GetServiceList = function () {
        return $http.get(API.APIurl + 'IPD/GetWardMasterList')
            .catch(function (error) {
                console.error("Error fetching Ward Master List:", error);
                throw error; // Re-throw error for proper handling
            });
    };

    // Fetch IPD Class List
    this.GetClassList = function () {
        return $http.get(API.APIurl + 'IPD/GetClassMasterList')
            .catch(function (error) {
                console.error("Error fetching Class Master List:", error);
                throw error;
            });
    };

    // Fetch Bed Master List with optional parameters (ClassID, WardID)
    this.GetBedList = function (ClassID, WardID) {
        return $http.get(API.APIurl + 'IPD/GetBedMasterList', {
            params: { ClassID: ClassID, WardID: WardID } // Ensure params are passed correctly
        }).catch(function (error) {
            console.error("Error fetching Bed Master List:", error);
            throw error;
        });
    };

    // ADD Update Ward Data By Prajwal Bonde
     this.AddUpdateWardMaster = function (wardData) {
        return $http.post(API.APIurl + 'IPD/AddUpdateWardMaster', wardData)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.error("Error adding/updating ward master:", error);
                throw error;
            });
    };

    this.AddUpdateClassMaster = function (ClassData) {
        return $http.post(API.APIurl + 'IPD/AddUpdateClassMaster', ClassData)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.error("Error adding/updating ward master:", error);
                throw error;
            });
    };

     this.AddUpdateBedMaster = function (BedData) {
        return $http.post(API.APIurl + 'IPD/AddUpdateBedMaster', BedData)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.error("Error adding/updating ward master:", error);
                throw error;
            });
    };

     this.AddAdmission = function (AdmissionData) {
            return $http.post(API.APIurl + 'IPD/SaveNewAdmission', AdmissionData)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.error("Error adding admission data:", error);
                    throw error;
                });
        };



});
