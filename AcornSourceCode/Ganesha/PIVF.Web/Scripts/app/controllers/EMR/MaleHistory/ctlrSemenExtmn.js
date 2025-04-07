PIVF.controller('ctlrSemenExtmn', function ($scope, $rootScope, $location, common, srvCommon, AlertMessage, srvSemenExtmn) {
    $rootScope.isAction = true;
    $rootScope.hideWhenQueue = false;
    $scope.SemenExtmn = {};
    $scope.PageSetup = function PageSetup()
    {
        //fill Drop Downs
        $scope.FillAbstinence();
    }
    /* Bind dropdowns using common service method */
    $scope.FillAbstinence = function FillAbstinence() {       
        var ResponseData = Common.getMasterList('M_Abstinence', 'AbstID', 'Description');
        ResponseData.then(function (Response) {         
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ListAbstinence = Response.data;
            if ($scope.SemenExtmn.AbstID == undefined)
                    $scope.SemenExtmn.AbstID = 0;            
        }, function (error) {          
            $scope.Error = error;
        });
    }
    $scope.PlannedSpermCollection = function PlannedSpermCollection() {
        var ResponseData = Common.getMasterList('M_IVFPlannedSpermCollection', 'IVFPSCID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ListPlannedSpermCollection = Response.data;
            if ($scope.SemenExtmn.IVFPSCID == undefined)
                $scope.SemenExtmn.IVFPSCID = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.SemenColorMaster = function SemenColorMaster() {
        var ResponseData = Common.getMasterList('M_SemenColorMaster', 'SemenCID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ListSemenColorMaster = Response.data;
            if ($scope.SemenExtmn.SemenCID == undefined)
                $scope.SemenExtmn.SemenCID = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }
    $scope.ViscousRange = function ViscousRange() {
        var ResponseData = Common.getMasterList('M_ViscousRange', 'ViscousRangeID', 'Description');
        ResponseData.then(function (Response) {
            Response.data.splice(0, 0, { ID: 0, Description: "Select" });
            $scope.ListViscousRange = Response.data;
            if ($scope.SemenExtmn.ViscousRangeID == undefined)
                $scope.SemenExtmn.ViscousRangeID = 0;
        }, function (error) {
            $scope.Error = error;
        });
    }


})