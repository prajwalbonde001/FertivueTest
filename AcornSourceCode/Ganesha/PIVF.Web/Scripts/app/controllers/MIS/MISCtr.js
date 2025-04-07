'use strict';


angular.module('PIVF').controller('MISController', function ($scope, AlertMessage, Common, $rootScope, localStorageService) {

    $scope.MIS = {};
    $scope.MIS.fromDate = new Date();
    $scope.MIS.toDate = new Date();
    $scope.open1 = function () {

        $scope.month1.opened = true;
    }
    $scope.month1 = {
        opened: false
    };
    $scope.open2 = function () {

        $scope.month2.opened = true;
    }
    $scope.month2 = {
        opened: false
    };
    $scope.loadData = function () {
        debugger;
        $scope.FillReportType();
        $scope.FillClinic();
        $scope.FillMISDaysList();
    }
    $rootScope.hideWhenQueue = true;
    $rootScope.Allergies = "";
 $rootScope.IsFemaleActive = false;// to highlite selected patient icon on layout
                $rootScope.IsMaleActive = false;
/*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.MIS.PDF = "pdf";

    $scope.FillReportType = function () {
        //var ResponseData = Common.getMasterList('M_IVFGobletSize_Embrology', 'IVFGobletSizeID', 'Description');
        //ResponseData.then(function (Response) {

        //    Response.data.splice(0, 0, { ID: 0, Description: 'Goblet Size' });
        //    $scope.ListGobletSize = Response.data;
        //    if ($scope.EmbryoBankOocyte.GobletSizeId == undefined) {
        //        $scope.EmbryoBankOocyte.GobletSizeId = 0;
        //    }
        //}, function (error) {
        //    $scope.Error = error;
        //});

        $scope.ListReportType = [ { ID: 1, Description: 'OPU-Embrology Report' },
        { ID: 2, Description: 'Embryo Transfer Report' },
        { ID: 3, Description: 'Patient Activity Report' },
        { ID: 4, Description: 'Cycle Details Report' },
        { ID: 5, Description: 'Visit Details Report' },
        { ID: 6, Description: 'Investigation Details Report' },
        { ID: 7, Description: 'Prescription Details Report' },
        { ID: 8, Description: 'Doctor Advice Report' }]
        $scope.MIS.reportType =1
    }
    $scope.FillClinic = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_UnitMaster', 'UnitID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListClinic = Response.data;
            if ($scope.MIS.clinicID == undefined) {
                $scope.MIS.clinicID = localStorageService.get("UserInfo").UnitID;
            }
        }, function (error) {
            $scope.Error = error;
        });
      
        //$scope.ListClinic = [{ ID: 1, Description: 'SSS' }, { ID: 2, Description: 'BBB' }];
        //$scope.KPI.clinicID = 1

    }

    //Begin:: Added by AniketK on 13Aug2019 for Visit Details Report
    $scope.FillMISDaysList = function () {
        debugger;
        var ResponseData = Common.getMasterList('M_MISDays', 'ID', 'Description');
        ResponseData.then(function (Response) {

            Response.data.splice(0, 0, { ID: 0, Description: 'Select' });
            $scope.ListMISDay = Response.data;
            if ($scope.MIS.DayID == undefined) {
                $scope.MIS.DayID = 0;
            }
        }, function (error) {
            $scope.Error = error;
        });
              
    }
    //End:: Added by AniketK on 13Aug2019 for Visit Details Report
/*---------------------------------------------------------------------------------------------------------------------------------------------------*/
    $scope.GenerateMIS = function (MIS) {
        debugger;
        //if (ValidMIS()) { //Commented and Modified by AniketK on 13Aug2019 
        if ($scope.MIS.reportType == 5 || ValidMIS()) {
            //MIS report
            if ($scope.MIS.reportType == 1)
            {
                debugger;
                var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&ReportType=' + $scope.MIS.reportType + '&pdf=' + $scope.MIS.PDF);
                window.open('/Reports/MIS/PatientARTReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            }
            else if ($scope.MIS.reportType == 2) {
                debugger;
                var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&ReportType=' + $scope.MIS.reportType + '&pdf=' + $scope.MIS.PDF );
                window.open('/Reports/MIS/PatientARTReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab

            }
            else if ($scope.MIS.reportType == 3) {
                debugger;
                var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF );
                window.open('/Reports/MIS/PatientActivityReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            }
            //Added by AniketK on 19July2019 for Cycle Details Report
            else if ($scope.MIS.reportType == 4) {
                debugger;
                var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
                window.open('/Reports/MIS/CycleDetailsReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            }
           //Added by AniketK on 13August2019 for Visit Details Report
            else if ($scope.MIS.reportType == 5) {
                debugger;
                var a = encodeURIComponent('MISDayID=' + $scope.MIS.DayID + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF); //'FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + 
                window.open('/Reports/MIS/VisitDetailsReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            }
           //Added by AniketK on 13August2019 for Investigation Details Report
            else if ($scope.MIS.reportType == 6) {
                debugger;
                var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
                window.open('/Reports/MIS/InvestigationDetailsReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            }
            //Added by AniketK on 14August2019 for Prescription Details Report
            else if ($scope.MIS.reportType == 7) {
                debugger;
                var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
                window.open('/Reports/MIS/PrescriptionDetailsReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            }
                //Added by AniketK on 14August2019 for Procedure Cycle Advice Report
            else if ($scope.MIS.reportType == 8) {
                debugger;
                var a = encodeURIComponent('FromDate=' + $scope.MIS.fromDate + '&ToDate=' + $scope.MIS.toDate + '&UnitID=' + $scope.MIS.clinicID + '&pdf=' + $scope.MIS.PDF);
                window.open('/Reports/MIS/ProcedureCycleAdviceReport.aspx?' + encodeURIComponent(a), '_blank'); // in new tab
            }
        }
    }

/*---------------------------------------------------------------------------------------------------------------------------------------------------*/

    var ValidMIS = function () {
       
        if ($scope.MIS.fromDate == null || !$scope.MIS.hasOwnProperty('fromDate')) {
            AlertMessage.warning('PalashIVF', 'Select From Date');
            return false;
        }
        else if ($scope.MIS.toDate == null || !$scope.MIS.hasOwnProperty('toDate')) {
            AlertMessage.warning('PalashIVF', 'Select To Date');
            return false;
        }
        else if ($scope.MIS.fromDate > $scope.MIS.toDate) {
            AlertMessage.warning('PalashIVF', 'From Date Should be Less Then To Date');
            return false;
        }
        else if ($scope.MIS.clinicID==0) {
            AlertMessage.warning('PalashIVF', 'Select Clinic');
            return false;
        }
        return true;
    }
    //file end
});