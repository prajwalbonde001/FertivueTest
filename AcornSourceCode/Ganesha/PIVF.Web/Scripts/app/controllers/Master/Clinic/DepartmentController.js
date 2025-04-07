/// <reference path="../../../../AngularPackages/ui-grid.js" />

'use strict';

angular.module('PIVF').controller('DepartmentController', function ($scope, $rootScope, usSpinnerService, $location, DepartmentService, uiGridConstants, uiGridExporterService, uiGridExporterConstants, uiGridValidateService, AlertMessage, srvCommon, swalMessages) {
    //Variable Declaration For  =========================================================================             
    $scope.ErrorMsg = '';
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $scope.bigTotalItems = 0;
    $scope.export_row_type = "all";
    $scope.export_column_type = "all";
    $scope.msg = {};
    $scope.ItemList = {};
    $scope.ListItem = [];
    $scope.ItemAdd = false;
    $scope.BtnUpdate = true;
    $scope.DepartmentList = [];
    $scope.CheckEdited = false;
    $scope.OldvalueColl = [];
    var page = 0;
    var initialRowCount = 1;
    $scope.IsUpdated = false;
    var objResource = {};
    $rootScope.FormName = 'Department';
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }

    // Add Button added by Ikram on 17/11/2016 to add one row at a time.
    $scope.GetValue = function () {
        debugger;
        if (initialRowCount >= 5) {
            AlertMessage.info(objResource.msgTitle, objResource.msg5RowOnly);
        }
        else {

            $scope.ListItem.push({});
            initialRowCount = initialRowCount + 1;
        }
    }
    //Code For Pagination//
    $scope.PreviousePage = 0;
    $scope.PageChange = function () {
        debugger;
        if ($scope.CheckEdited == true) {
            if (page != 0) {
                if ($scope.DepartmentList.length > 0) {
                    swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouWantToContinueValidation, "warning", function (isConfirmed) {
                        if (isConfirmed) {
                            // Need to find workaround here for changed data to old data  ... This change suggested by Narottam at 6 March 2017 and functionality By Dnyaneshwar
                            $scope.PreviousePage = $scope.CurrentPage;
                            if ($scope.CurrentPage == 0) {
                                $scope.CurrentPage = page;
                            }
                            $scope.CheckEdited = false;
                            $scope.DepartmentList = [];
                            $scope.gridApi.pagination.seek($scope.CurrentPage);
                            $scope.gridApi.core.refresh();
                            $scope.GetDepartmentMasterData();
                        }
                        else {
                            // After clicking on No button there should not be any action   ... This change suggested by Narottam at 6 March 2017 and functionality By Dnyaneshwar
                            // Changed data should be as it is
                            $scope.gridOptions.totalItems = $scope.ItemList.length;
                            $scope.gridOptions.paginationPageSize = 10;
                            $scope.gridOptions.enablePaginationControls = false;
                            $scope.gridOptions.paginationCurrentPage = page;

                            if ($scope.PreviousePage == 0) {
                                $scope.PreviousePage = page;
                            }
                            $scope.gridApi.pagination.seek($scope.PreviousePage);
                            $scope.gridApi.core.refresh();
                            if ($scope.PreviousePage > $scope.CurrentPage) {
                                $scope.CurrentPage = $scope.PreviousePage;
                                $scope.PreviousePage = $scope.CurrentPage;
                            } else {
                                if ($scope.PreviousePage == 1) {
                                    $scope.CurrentPage = $scope.PreviousePage;
                                } else {
                                    $scope.PreviousePage = $scope.CurrentPage;
                                    $scope.CurrentPage = $scope.CurrentPage - 1;
                                }
                            }
                        }
                    });
                } else {
                    $scope.PreviousePage = $scope.CurrentPage;
                    $scope.gridApi.pagination.seek($scope.CurrentPage);
                    $scope.gridApi.core.refresh();
                }
            }
        }
        else {
            $scope.gridApi.pagination.seek($scope.CurrentPage);
        }

    }

    //Added BY Narottam Dated 18/10/16 for Code/Description Validation =====================================================
    var PHONE_REGEXP = /^[a-zA-Z0-9\s\-\:\/\_']*$/;
    //====================================================================================================================  
    //Added BY Rohinee To Get Grid Data =====================================================
    $scope.GetDepartmentMasterData = function GetDepartmentMasterData() {
        debugger;
        $scope.DepartmentParameter = {};
        debugger;
        var responseData = DepartmentService.GetData();
        responseData.then(function (Response) {
            debugger;
            //$scope.ParameterLabList = Response.data.value;
            $scope.gridOptions.data = Response.data.value;
            usSpinnerService.stop('GridSpinner');
            $scope.ItemList = Response.data.value;
            $scope.TotalItems = Response.data.value.length;
            $scope.ErrorMsg = Response.data.Resultstatus;

        }, function (error) {
            //debugger;
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };
    $scope.GetDepartmentMasterData();
    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };
    $scope.gridOptions = {
        enablePaginationControls: false,
        paginationPageSizes: [10, 25, 50], //[10,25, 50, 75],$scope.gridOptions.data.length / 10
        paginationPageSize: 10,
        pagelabel: objResource.lblRecordsPerPage,
        columnDefs: [
          //{ field: 'GenderID', enableCellEdit: true, width: 200, headerCellClass: $scope.highlightFilteredHeader },
          {
              field: 'DeptCode', enableCellEdit: true, displayName: objResource.Code,
              cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                  return "";
              }
          },
          {
              field: 'Description', enableCellEdit: true, displayName: objResource.Description,
              cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                  return "";
              }
          },
          {
              field: 'IsClinical', enableCellEdit: true, type: 'boolean', width: '10%', enableFiltering: false, displayName: objResource.lblIsClinical,
              cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                  return "";
              }
          },
          {
              field: 'Active', enableCellEdit: true, type: 'boolean', width: '10%', enableFiltering: false, displayName: objResource.Active,
              cellTemplate:
         '<div class="ui-grid-cell-contents"><img src="{{grid.getCellValue(row, col) ? \'../images/Active.png\' : \'../images/deactive.png\' }} " /></div>'
          }

        ],
        enableFiltering: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterCsvFilename: 'Department Report.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Palash IVF", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + objResource.lblOf + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true, margin: [250, 0, 20, 0] };//, textalign: "center"
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 300,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                // added By umesh
                colDef.cellClass = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    row.dirty = row.dirty || {}
                    if (rowEntity.DeptID === row.entity.DeptID && newValue !== oldValue) {
                        row.dirty[col.displayName] = true;
                    }
                    if (row.dirty[col.displayName])
                        return "CellEditNotifier";
                    return;
                };

                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                if (newValue != oldValue) {

                    //To save OLD value during AuditTrial
                    $scope.OldvalueColl.push('field' + '\,' + colDef.displayName + '\!' + 'oldvalue' + '\,' + oldValue + '\!' + 'newvalue' + '\,' + newValue);

                    if (colDef.type == 'number' || colDef.type == 'boolean') {
                        $scope.myVariableLength = 1;
                    } else {
                        $scope.myVariableLength = newValue.length;
                    }
                    if ($scope.myVariableLength > 0) {
                        //debugger;
                        if (colDef.field == 'DeptCode' && $scope.myVariableLength > 10) {
                            AlertMessage.info(objResource.msgTitle, objResource.msgMaxLimit10);
                            $scope.BtnUpdate = true;
                            rowEntity.BankCode = oldValue;
                        }
                        else if (colDef.field == 'Description' && $scope.myVariableLength > 50) {
                            AlertMessage.info(objResource.msgTitle, objResource.msgMaxLimit50);
                            $scope.BtnUpdate = true;
                            rowEntity.Description = oldValue;
                        }
                        else {
                            page = $scope.gridApi.pagination.getPage();
                            $scope.CheckEdited = true;
                            var isMatchRegex = PHONE_REGEXP.test(newValue);
                            if (isMatchRegex) {
                                //debugger;
                                //Added BY Rohinee For Insert Edited Data In List To Update LIst ON Update Click========================

                                $scope.DepartmentList.push(rowEntity.DeptID);
                                $scope.BtnUpdate = false;
                                //=======================================================================================
                            }
                            else {
                                AlertMessage.error(objResource.msgTitle, objResource.msgInvalidText);
                                $scope.BtnUpdate = true;
                            }
                        }
                    }
                    else {
                        AlertMessage.info(objResource.msgTitle, objResource.msgCodeDescReq);
                        $scope.BtnUpdate = true;
                    }
                }
                else {
                    $scope.CheckEdited = false;
                }
                //============================================================
            });
            //for page changed validation
            gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                debugger;
                if ($scope.CheckEdited == true) {
                    if (page != 0) {
                        $scope.gridOptions.totalItems = $scope.ItemList.length;
                        $scope.gridOptions.paginationPageSize = pageSize;
                        $scope.gridOptions.enablePaginationControls = false;
                        $scope.gridOptions.paginationCurrentPage = pageNumber;
                        //AlertMessage.info(objResource.msgTitle, objResource.msgGridUnsaveData);
                        //page = 0;
                    }
                }
                else {

                }
            });
        },
        gridMenuCustomItems: [
                {
                    icon: 'fa fa-file-excel-o', title: objResource.lblAllToCSV,
                    action: function ($event) {
                        //debugger;
                        var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                        $scope.gridApi.exporter.csvExport($scope.export_row_type, $scope.export_column_type, myElement);
                    },
                    order: 99
                },
                {
                    icon: 'fa fa-file-pdf-o', title: objResource.lblAllToPDF,
                    action: function ($event) {
                        //debugger;

                        var exportColumnHeaders = uiGridExporterService.getColumnHeaders(this.grid, uiGridExporterConstants.ALL);
                        var exportData = uiGridExporterService.getData(this.grid, uiGridExporterConstants.ALL, uiGridExporterConstants.ALL, true);
                        var docDefinition = uiGridExporterService.prepareAsPdf(this.grid, exportColumnHeaders, exportData);

                        if (uiGridExporterService.isIE() || navigator.appVersion.indexOf("Edge") !== -1) {
                            uiGridExporterService.downloadPDF(this.grid.options.exporterPdfFilename, docDefinition);
                        } else {
                            pdfMake.createPdf(docDefinition).download('Department Report.pdf');
                        }

                    },
                    order: 99
                },

        ],
        FilterText: objResource.lblClearFilter,
        ColumnText: objResource.lblColumn
    };
    $scope.gridOptions.enableCellEditOnFocus = true;
    $scope.gridOptions.enableHiding = true,

    //this function is used for hide the div
    $scope.Hide = function Hide() {
        initialRowCount = 1;
        $scope.Clear();
        $scope.showhide = false;
        $scope.showhide_NewButn = true;
    }

    //This function used to Hide div if description and Code not present
    $scope.HideDiv = function HideDiv() {
        debugger;
        if ($scope.ListItem[0].DeptCode != null && $scope.ListItem[0].Description != null) {
            swalMessages.MessageBox(objResource.msgTitle, objResource.msgCnfSave, "warning", function (isConfirmed) {
                if (isConfirmed) {
                    $scope.saveItemList();
                } else {
                    $scope.Hide();
                }
            });

        }
        else {
            $scope.Hide();
        }
    }

    //Code For add New Row with Code & Description 
    $scope.TableGenerateOnAdd = function (Rows) {
        debugger;
        if ($scope.CheckEdited) {
            // Need to find workaround here for changed data to old data  ... This change suggested by Narottam at 6 March 2017 and functionality By Sandeep N
            swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouWantToContinueValidation, "warning", function (isConfirmed) {
                if (isConfirmed) {
                    $scope.CheckEdited = false;
                    $scope.IsUpdated = false;
                    $scope.updateChanges(Rows);
                    $scope.GetDepartmentMasterData();

                }
                else {
                    //$scope.updateChanges(Rows);
                    //$scope.GetDepartmentMasterData();
                }
            });
        }
        else {
            $scope.updateChanges(Rows);
        }
    };


    //Code to show Row on addrow click
    $scope.updateChanges = function (Rows) {
        $scope.ItemAdd = true;
        $scope.showhide = true;
        $scope.showhide_NewButn = false;
        if (Rows != "" || Rows != null || typeof Rows != "undefined") {
            if ($scope.ListItem.length < 1) {
                debugger;
                for (var i = 1; i <= Rows; i++) {
                    $scope.ListItem.push({});
                }
            }
        }
        else {
            $scope.ListItem = [];
        }

    };


    //Code For Remove Row 
    $scope.RemoveRow = function (Index) {
        debugger;
        if (initialRowCount == 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else {
            $scope.ItemAdd = true;
            $scope.ListItem.splice(Index, 1);
            initialRowCount = initialRowCount - 1;
        }
    };

    //Code For Save Data
    $scope.saveItemList = function () {
        // Save Confirmation Button added by Ikram on 21/10/2016
        debugger;
        angular.forEach($scope.ListItem, function (T) {
            //Update Service Call By Narottam
            var Promise = DepartmentService.Save(T);
            Promise.then(function (resp) {
                if (resp.data.value == 1)
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
                if (resp.data.value == 2)
                    AlertMessage.info(objResource.msgTitle, objResource.msgDuplication_Description);
                if (resp.data.value == 3)
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                $scope.Hide();
            },
                function (error) {
                    $scope.Hide();
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                });
        })
    };


    //Code For Update data
    $scope.ItemArray = [];
    $scope.updateDepartment = function updateDepartment() {
        // Update Confirmation Button added by Ikram on 21/10/2016
        debugger;
        $scope.CheckEdited = false;
        $scope.ItemList.map(function (Dept) {
            angular.forEach($scope.DepartmentList, function (T) {
                if (Dept.DeptID == T) {
                    //debugger;
                    $scope.ItemArray.push(Dept);
                }
            })
        });

        //Update Service Call By Narottam
        angular.forEach($scope.ItemArray, function (T, index) {
            //debugger;
            var Promise = DepartmentService.Update(T.DeptID, $scope.OldvalueColl[index], T);
            Promise.then(function (resp) {
                //debugger;
                if (resp.data.value == 1)
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                $scope.OldvalueColl = [];
                if (resp.data.value == 2)
                    AlertMessage.info(objResource.msgTitle, objResource.msgDuplication_Description);
                if (resp.data.value == 3)
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
                if (!$scope.IsUpdated)
                    $scope.Hide();
            },
        function (error) {
            $scope.Hide();
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
        })
    };
    //===========================================================================================================

    //Added By Narottam to Clear Data =======================================================================================================
    $scope.Clear = function Clear() {
        $scope.ListItem = [];
        $scope.ItemArray = [];
        $scope.BtnUpdate = true;
        $scope.DepartmentList = [];
        $scope.IsUpdated = false;

        $scope.frnDept.$setPristine();
        $scope.GetDepartmentMasterData();
    };
    //=============================================================================================================
});