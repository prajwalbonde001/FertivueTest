'use strict';

angular.module('PIVF').controller('StateController', function ($scope, $rootScope, usSpinnerService, $location, StateService, CountryService, uiGridExporterService, uiGridConstants, uiGridExporterConstants, uiGridValidateService, AlertMessage, srvCommon, swalMessages) {
    //Variable Declaration For  =========================================================================   
    //debugger;
    $scope.ErrorMsg = '';
    $rootScope.isAction = false;
    $rootScope.hideWhenQueue = true;
    $scope.bigTotalItems = 0;
    $scope.export_row_type = "all";
    $scope.export_column_type = "all";
    $scope.msg = {};
    $scope.ItemList = {};
    $scope.ListItem = [];
    $scope.gridOptions = { data: '' };
    $scope.ItemAdd = false;
    $scope.BtnUpdate = true;
    $scope.CountryDB = {}; //Added by Manohar to bind data County Dropdown List.  
    $scope.GetStateList = [];
    var CountryList = [];
    $scope.CheckEdited = false;
    $scope.OldvalueColl = [];
    var page = 0;
    var initialRowCount = 1;
    $scope.IsUpdated = false;
    var objResource = {};
    if (angular.isDefined(objResource) && angular.equals({}, objResource)) {
        objResource = srvCommon.get();
    }
    usSpinnerService.spin('GridSpinner');

    // Add Button added by Ikram on 17/11/2016 to add one row at a time.
    $scope.GetValue = function () {
        //   debugger;
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
                if ($scope.GetStateList.length > 0) {
                    swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouWantToContinueValidation, "warning", function (isConfirmed) {
                        if (isConfirmed) {
                            // Need to find workaround here for changed data to old data  ... This change suggested by Narottam at 6 March 2017 and functionality By Dnyaneshwar
                            $scope.PreviousePage = $scope.CurrentPage;
                            if ($scope.CurrentPage == 0) {
                                $scope.CurrentPage = page;
                            }
                            $scope.CheckEdited = false;
                            $scope.GetStateList = [];
                            $scope.gridApi.pagination.seek($scope.CurrentPage);
                            $scope.gridApi.core.refresh();
                            $scope.GetStateMasterData();
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

    //Added BY Umesh Dated 17/10/16 for Code/Description Validation =====================================================
    var PHONE_REGEXP = /^[a-zA-Z0-9\s\-\:\/\_']*$/;
    //====================================================================================================================  
    //Added BY Umesh Dated 17/10/16 To Get Grid Data =====================================================
    $scope.GetStateMasterData = function GetStateMasterData() {
        debugger;
        $scope.StateParameter = {};

        var responseData = StateService.GetData();
        responseData.then(function (Response) {
            debugger;
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
    // $scope.GetStateMasterData();

    $scope.GetCountryMasterData = function GetCountryMasterData() {
        //  debugger;
        $scope.CountryParameter = {};
        var responseData = CountryService.GetData();
        responseData.then(function (Response) {
            angular.forEach(Response.data.value, function (item) {
                if (item.Status == true) {
                    CountryList.push(item)
                }
            })

            angular.forEach(CountryList, function (i) {
                angular.forEach($scope.ItemList, function (j) {
                    //  debugger;
                    if (i.CountryID == j.CountryID) {
                        j.Country = i.CountryName;
                    }
                })
            })

            //    $scope.CountryList = Response.data.value;
            //    debugger;
            $scope.gridOptions.columnDefs[2].editDropdownOptionsArray = CountryList;
            $scope.CountryDB = CountryList;
        }, function (error) {
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
    };
    //   $scope.GetCountryMasterData();

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
        //gridMenu:{
        //},
        columnDefs: [
          //{ field: 'ID', enableCellEdit: true, width: 200, headerCellClass: $scope.highlightFilteredHeader },
          {
              field: 'StateCode', enableCellEdit: true, displayName: objResource.Code,
              cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                  return "";
              }
          },
          {
              field: 'StateName', enableCellEdit: true, displayName: objResource.Description,
              cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                  return "";
              }
          },
            {
                field: 'Country', displayName: objResource.lblCountry, width: '20%',
                enableCellEdit: true, editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownOptionsArray: [{ CountryID: 0, CountryName: 'Select' }],
                editDropdownIdLabel: 'CountryName',
                editDropdownValueLabel: 'CountryName',
                //   cellFilter: "griddropdown:this",
                enableFiltering: false,
                cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    return "";
                }
            },
          {
              field: 'Status', enableCellEdit: true, type: 'boolean', displayName: objResource.Active, width: '10%', enableFiltering: false,
              cellTemplate:
      '<div class="ui-grid-cell-contents"><img src="{{grid.getCellValue(row, col) ? \'../images/Active.png\' : \'../images/deactive.png\' }} " /></div>'
          }
        ],
        enableFiltering: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        exporterCsvFilename: 'State Report.csv',
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
                    if (rowEntity.StateID === row.entity.StateID && newValue !== oldValue) {
                        row.dirty[col.displayName] = true;
                    }
                    if (row.dirty[col.displayName])
                        return "CellEditNotifier";
                    return;
                };
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                if (newValue != oldValue) {
                    page = $scope.gridApi.pagination.getPage();

                    //To save OLD value during AuditTrial
                    $scope.OldvalueColl.push('field' + '\,' + colDef.displayName + '\!' + 'oldvalue' + '\,' + oldValue + '\!' + 'newvalue' + '\,' + newValue);

                    if (colDef.type == 'number' || colDef.type == 'boolean' || colDef.field == 'CountryID') {
                        $scope.myVariableLength = 1;
                    } else {
                        $scope.myVariableLength = newValue.length;
                    }
                    if ($scope.myVariableLength > 0) {
                        //debugger;
                        if (colDef.field == 'StateCode' && $scope.myVariableLength > 10) {
                            AlertMessage.info(objResource.msgTitle, objResource.msgMaxLimit10);
                            $scope.BtnUpdate = true;
                            rowEntity.StateCode = oldValue;

                        }
                        else if (colDef.field == 'StateName' && $scope.myVariableLength > 50) {
                            AlertMessage.info(objResource.msgTitle, objResource.msgMaxLimit50);
                            $scope.BtnUpdate = true;
                            rowEntity.StateName = oldValue;
                        }
                        else {
                            $scope.CheckEdited = true;
                            var isMatchRegex = PHONE_REGEXP.test(newValue);
                            if (isMatchRegex) {
                                //  debugger;
                                //Added BY Umesh Dated 17/10/16 For Insert Edited Data In List To Update LIst ON Update Click========================
                                //if (GetStateList.length > 0) {
                                //    var jj = GetStateList.indexOf(rowEntity.StateID);
                                //}
                                //else {
                                //    GetStateList.push(rowEntity.StateID);
                                //}
                                //if (jj == -1) {
                                //    GetStateList.push(rowEntity.StateID);
                                //}
                                $scope.GetStateList.push(rowEntity.StateID);
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
                        $scope.BtnUpdate = false;
                        AlertMessage.info(objResource.msgTitle, objResource.msgCodeDescReq);
                    }
                }
                else {
                    $scope.CheckEdited = false;
                }
                //============================================================
            });
            //for page changed validation
            gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                // debugger;
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
                            pdfMake.createPdf(docDefinition).download('State Master.pdf');
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
        debugger;
        initialRowCount = 1;
        $scope.Clear();
        $scope.showhide = false;
        $scope.showhide_NewButn = true;

    }

    //This function used to Hide div if description and Code not present
    $scope.HideDiv = function HideDiv() {
        //  debugger;
        var IsEmpty = false;
        angular.forEach($scope.ListItem, function (array) {
            if (angular.isUndefined(array.StateCode) || angular.isUndefined(array.StateName) || !array.hasOwnProperty("CountryID") ) {
                IsEmpty = true;
            }
        });
        if ($scope.ListItem[0].StateCode != null && $scope.ListItem[0].StateName != null) {
            swalMessages.MessageBox(objResource.msgTitle, objResource.msgCnfSave, "warning", function (isConfirmed) {
                if (isConfirmed) {
                    if (IsEmpty == false) {
                        $scope.saveItemList();
                    }
                    else {
                        AlertMessage.info(objResource.msgTitle, objResource.msgCodeDescReq);
                        $scope.Hide();
                    }
                } else {
                    $scope.Hide();
                }
            });

        }
        else {
            $scope.Hide();
        }
    }


    $scope.GetData = function () {
        debugger;
        $rootScope.FormName = 'State';
        var responseData = StateService.GetData();
        responseData.then(function (Response) {
            $scope.gridOptions.data = Response.data.value;
            usSpinnerService.stop('GridSpinner');
            $scope.ItemList = Response.data.value;
            $scope.TotalItems = Response.data.value.length;
            $scope.ErrorMsg = Response.data.Resultstatus;
            $scope.GetCountryMasterData();
        }, function (error) {
            //debugger;
            AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });

    }

    //Code For add New Row with Code & Description & Ask For Confirmation
    $scope.TableGenerateOnAdd = function (Rows) {
        debugger;
        if ($scope.CheckEdited) {
            // Need to find workaround here for changed data to old data  ... This change suggested by Narottam at 6 March 2017 and functionality By Sandeep N
            swalMessages.MessageBox(objResource.msgTitle, objResource.msgDoYouWantToContinueValidation, "warning", function (isConfirmed) {
                if (isConfirmed) {
                    $scope.CheckEdited = false;
                    $scope.IsUpdated = false;
                    $scope.updateChanges(Rows);
                    $scope.GetData();

                }
                else {
                    //$scope.updateChanges(Rows);
                    //$scope.GetData();
                }
            });
        }
        else {
            $scope.updateChanges(Rows);
        }
    };


    //Code to show Row on addrow click
    $scope.updateChanges = function (Rows) {
        debugger;
        $scope.ItemAdd = true;
        $scope.showhide = true;
        $scope.showhide_NewButn = false;
        if (Rows != "" || Rows != null || typeof Rows != "undefined") {
            if ($scope.ListItem.length < 1) {
                //   debugger;
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
        // debugger;
        if (initialRowCount == 1) {
            AlertMessage.info(objResource.msgTitle, objResource.msgRemoveRow);
        }
        else {
            $scope.ItemAdd = true;
            $scope.ListItem.splice(Index, 1);
            initialRowCount = initialRowCount - 1;
        }
    };


    //Added BY Umesh Dated 17/10/16 for Save State List=============================================================================================
    $scope.saveItemList = function () {
        // Save Confirmation Button added by Ikram on 21/10/2016
        //  debugger;
        var IsEmpty = false;
        angular.forEach($scope.ListItem, function (array) {
            if (angular.isUndefined(array.StateCode) || angular.isUndefined(array.StateName) || !array.hasOwnProperty("CountryID")) {
                IsEmpty = true;
            }
        });
        if(IsEmpty == false){
        angular.forEach($scope.ListItem, function (T) {
            var Promise = StateService.Save(T);
            Promise.then(function (resp) {
            //debugger;
                if (resp.data.value == 1)
                    AlertMessage.success(objResource.msgTitle, objResource.msgSave);
        else if (resp.data.value == 2)
                    AlertMessage.info(objResource.msgTitle, objResource.msgDuplication_Description);
        else if (resp.data.value == 3)
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);;
                $scope.Hide();
            //debugger;
            //  $scope.GetStateMasterData();
        },
                function (error) {
                    $scope.Hide();
                    AlertMessage.error(objResource.msgTitle, objResource.msgError);
        });
        })
            }
    else{
            AlertMessage.info(objResource.msgTitle, objResource.msgCodeDescReq);
    }

    };
    //===========================================================================================================
    //Added BY Umesh Dated 17/10/16 to Update Grid Edited State List=================================================================
    $scope.ItemArray = [];
    $scope.updateState = function () {
        // Update Confirmation Button added by Ikram on 21/10/2016
        //   debugger;
        $scope.CheckEdited = false;
        $scope.ItemList.map(function (person) {
            angular.forEach($scope.GetStateList, function (T) {
                if (person.StateID == T) {
                    // debugger;
                    angular.forEach(CountryList, function (i) {
                        if (i.CountryName == person.Country)
                            person.CountryID = i.CountryID;
                    })
                    delete person.Country;
                    $scope.ItemArray.push(person);
                }
            })
        });

        //Update Service Call By Rohinee H
        angular.forEach($scope.ItemArray, function (T, index) {
            //   debugger;
            var Promise = StateService.Update(T.StateID, $scope.OldvalueColl[index], T);
            Promise.then(function (resp) {
                //  debugger;
                if (resp.data.value == 1) {
                    AlertMessage.success(objResource.msgTitle, objResource.msgUpdate);
                    $scope.OldvalueColl = [];
                }
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
    //Added BY Umesh Dated 17/10/16 to Clear Data =======================================================================================================
    $scope.Clear = function Clear() {
        //  debugger;
        $scope.BtnUpdate = true;
        $scope.ListItem = [];
        $scope.IsUpdated = false;
        $scope.ItemArray = [];
        $scope.GetStateList = [];
        //$scope.frmform.$setPristine();
        //  $scope.GetStateMasterData();
        //   $scope.GetData();
        $location.path('/State/');
    };
    //=============================================================================================================
})
.filter('griddropdown', function () {
    return function (input, context) {
        //  debugger;
        var map = context.col.colDef.editDropdownOptionsArray;
        var idField = context.col.colDef.editDropdownIdLabel;
        var valueField = context.col.colDef.editDropdownValueLabel;
        context.col.colDef.exporterSuppressExport = true;
        var initial = context.row.entity[context.col.field];
        if (typeof map !== "undefined") {
            for (var i = 0; i < map.length; i++) {
                if (map[i][idField] == input) {
                    return map[i][valueField];
                }
            }
        } else if (initial) {
            return initial;
        }
        return input;
    };

})