PIVF.service('srvCommon', function ($http, API , $rootScope) {
    const val = 0;
    var objResource = {};

    this.getResources = function () {
        var Response = $http.get(API.APIurl + 'CommonAPI/FillResources').then(function (i) {
            objResource = i.data;
        },function (error) {
            //
        })
        return Response;
    };

    this.setval = function (val) {
        
        val = val;
    };

    this.getval = function () {
        
        return val;
    };

    this.get = function () {
        return objResource;
    };









 this.aciveTab = function (tab) {
        debugger;
      
        debugger
        if (tab == 'liCryobank') {
            $rootScope.IsSinglePatient = false;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).addClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');

            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');

            angular.element(dropdown_menu)[0].style.display = "none";
        }
        else if (tab == 'liQueue') {
            $rootScope.IsFemale = 0;
            $rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).addClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }
        else if (tab == 'liCycles') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).addClass('active');
            if (angular.element('#liPatient'))
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }
        else if (tab == 'liPatient') {
            //angular.element(txtfullName).focus();
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).addClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }

            //Added sujata for appointment date 7/11/19
        else if (tab == 'liAppointment') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).addClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
                
        }

            //ended sujata for appointment date 7/11/19


        else if (tab == 'liDonor') {
            $rootScope.IsFemale = 0;
            $rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).addClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');

            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }
            //added by Divya for Dashboard on 3 jan 2020
        else if (tab == 'liDashboard') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient'))
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).addClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');


          

        }
            //Ended by Divya for Dashboard on 3 jan 2020

        else if (tab == 'liConfiguration') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).addClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
                
        }
        else if (tab == 'liMPatient') {
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).addClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
        }
        else if (tab == 'liKPI') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).addClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
        }
        else if (tab == 'liQCI') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liQCI').length)
                angular.element(liQCI).addClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            
        }

        else if (tab == 'liBilling') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).addClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).removeClass('active');
        }

        else if (tab == 'liLab') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).addClass('active');
            if (angular.element('#liLab').length)
                angular.element(liLab).addClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).removeClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');
           

        }
            //Added by divya on 31Aug2020
        else if (tab == 'liInventory') {
            //$rootScope.IsFemale = 0;
            //$rootScope.IsMale = 0;
            if (angular.element('#liCryobank').length)
                angular.element(liCryobank).removeClass('active');
            if (angular.element('#liQueue').length)
                angular.element(liQueue).removeClass('active');
            if (angular.element('#liCycles').length)
                angular.element(liCycles).removeClass('active');
            if (angular.element('#liPatient').length)
                angular.element(liPatient).removeClass('active');
            if (angular.element('#liDonor').length)
                angular.element(liDonor).removeClass('active');
            if (angular.element('#liDashboard').length)
                angular.element(liDashboard).removeClass('active');
            if (angular.element('#liConfiguration').length)
                angular.element(liConfiguration).removeClass('active');
            if (angular.element('#liMPatient').length)
                angular.element(liMPatient).removeClass('active');
            if (angular.element('#liKPI').length)
                angular.element(liKPI).removeClass('active');
            if (angular.element('#liBilling').length)
                angular.element(liBilling).removeClass('active');
            if (angular.element('#liInventory').length)
                angular.element(liInventory).addClass('active');
            if (angular.element('#liAppointment').length)
                angular.element(liAppointment).removeClass('active');

        }
        //Ended by divya on 31Aug2020
        
    }
















});